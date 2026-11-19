import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { cartSlotFacts } from '../../mame/cart-slot.ts';
import {
  indexMameHardware,
  type MameHardwareDefinition,
} from '../../mame/hardware.ts';
import type {
  CapabilityArtifact,
  CapabilityExtraction,
  CapabilityInput,
  LoweredMethod,
} from '../contract.ts';
import {
  SNES_MAME_TYPES,
  snesDeviceIrArtifact,
  snesDeviceModuleArtifact,
} from './definition.ts';
import { streamWorkletArtifact } from '../speaker/extract.ts';

/** MAME's own file for the cartridge options the SNES slot accepts. */
const CARTRIDGE_OPTIONS_FILE = 'src/devices/bus/snes/snes_carts.cpp';

/** The slot-interface function the snes driver hands SNS_CART_SLOT. */
const CARTRIDGE_OPTIONS_FUNCTION = 'snes_cart';

/** MAME's own file for the control-port options. */
const CONTROLLER_OPTIONS_FILE = 'src/devices/bus/snes_ctrl/ctrl.cpp';

/** The slot-interface function the snes driver hands SNES_CONTROL_PORT. */
const CONTROLLER_OPTIONS_FUNCTION = 'snes_control_port_devices';

/** The console's own software list, which says which boards its carts use. */
const SOFTWARE_LIST_FILE = 'hash/snes.xml';

/** The sound chip, which renders in the stream mix. */
const SOUND_TYPE = 'S_DSP';

/**
 * Compile the Super Nintendo's PPU, its S-DSP, its control ports and its
 * cartridge slot, with the cards MAME declares for the slots.
 *
 * The slot is an image device: its own get_default_card_software picks the
 * board from the software part's `slot` feature (falling back to MAME's
 * "lorom"), and its call_load reads the part into it, as the NES slot does.
 */
export function extractSnes(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    SNES_MAME_TYPES.includes(entry.type as (typeof SNES_MAME_TYPES)[number]));
  if (!present.length) return undefined;

  const definitions = indexMameHardware(input.mameSource);
  const compiled = new Map<string, GeneratedDeviceDefinition>();
  for (const entry of present) {
    const definition = entry.definition as MameHardwareDefinition | undefined;
    if (!definition) continue;
    const device = compileMameDevice(input.mameSource, definition, entry.type);
    if (entry.type === 'SNES_CONTROL_PORT') {
      // The card each port holds is the machine's choice ("joypad" in
      // snes_console_state::snes), which the board hands the slot.
      device.slot = {
        member: slotCardMember(input.mameSource, definition),
        options: controllerOptions(input.mameSource, definitions),
      };
    } else if (entry.type === 'SNS_CART_SLOT') {
      dropUncompiledMethods(device, 'SNS_CART_SLOT');
      const cards = cartridgeOptions(input.mameSource, definitions);
      device.slot = {
        member: slotCardMember(input.mameSource, definition),
        ...(slotDefault(input.mameSource) ? { default: slotDefault(input.mameSource)! } : {}),
        options: cards.options,
        ...(Object.keys(cards.unsupported).length ? { unsupported: cards.unsupported } : {}),
      };
      device.role = 'cartridge';
    }
    if (device.summary.diagnostics) {
      console.warn(`  ! ${entry.type}: ${device.summary.diagnostics} diagnostics, not registered`);
      continue;
    }
    compiled.set(entry.type, device);
  }
  if (!compiled.size) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = snesDeviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: snesDeviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', '')),
      },
      ...(type === SOUND_TYPE ? [streamWorkletArtifact()] : []),
    );
    executable[type] = { kind: 'device', artifact: ir };
    entrySourceFiles[type] = device.sourceFiles;
    entryMethods[type] = device.methods.map(method => ({
      name: method.name,
      parameters: method.parameters,
      sourceFile: method.source.file,
      sourceLine: method.source.line,
      body: '',
      program: method.program,
    }));
  }
  return {
    executableTypes: [...compiled.keys()],
    executable,
    artifacts,
    entryMethods,
    entrySourceFiles,
  };
}

/**
 * Leave out the methods that do not lower, and say which: an image device's
 * host plumbing can fail without the bus it serves failing with it, but a
 * dropped method is never silent.
 */
function dropUncompiledMethods(device: GeneratedDeviceDefinition, label: string): void {
  const dropped = device.methods.filter(method => method.program.diagnostics.length);
  if (!dropped.length) return;
  console.warn(`  ! ${label}: ${dropped.map(method => method.name).join(', ')} did not lower`);
  device.methods = device.methods.filter(method => !method.program.diagnostics.length);
  device.summary.methods = device.methods.length;
  device.summary.compiledMethods = device.methods.length;
  device.summary.diagnostics = 0;
}

/**
 * The member a slot keeps its card in, from its own `m_x = ...
 * get_card_device()` (`m_cart = dynamic_cast<device_sns_cart_interface
 * *>(get_card_device())`, `m_device = get_card_device()`).
 */
function slotCardMember(mameSource: string, definition: MameHardwareDefinition): string {
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  const member = /\b(m_\w+)\s*=\s*(?:dynamic_cast\s*<[^>]*>\s*\(\s*)?get_card_device\s*\(\s*\)/.exec(source)?.[1];
  if (!member) throw new Error(`${definition.type} no longer keeps its card from get_card_device()`);
  return member;
}

/** The board `get_default_card_software` falls through to (`software_get_default_slot("lorom")`). */
function slotDefault(mameSource: string): string | undefined {
  return cartSlotFacts(mameSource, 'SNS_CART_SLOT', 'snsslot')?.defaultOption;
}

/** `device.option_add[_internal]("name", TYPE)` entries of one slot-interface function. */
function slotOptions(source: string, fn: string): { option: string; type: string }[] {
  const body = new RegExp(`void\\s+${fn}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`).exec(source)?.[1];
  if (!body) throw new Error(`MAME no longer declares ${fn}`);
  return [...body.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)]
    .map(match => ({ option: match[1]!, type: match[2]! }));
}

/**
 * The controllers MAME offers each port. Every one is compiled; one that does
 * not lower is left out, and the joypad (the driver's default) must lower.
 */
function controllerOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): Record<string, GeneratedDeviceDefinition> {
  const source = readFileSync(join(mameSource, CONTROLLER_OPTIONS_FILE), 'utf8');
  const options: Record<string, GeneratedDeviceDefinition> = {};
  for (const { option, type } of slotOptions(source, CONTROLLER_OPTIONS_FUNCTION)) {
    const definition = definitions.get(type);
    if (!definition) continue;
    const controller = compileMameDevice(mameSource, definition, type);
    if (controller.summary.diagnostics) {
      console.warn(`  ! SNES_CONTROL_PORT option ${option} (${type}): ${controller.summary.diagnostics} diagnostics, left out`);
      continue;
    }
    options[option] = controller;
  }
  if (!options.joypad) throw new Error('MAME SNES controller ports no longer offer a joypad that lowers');
  return options;
}

/**
 * The cartridge boards the SNES software list names, each compiled from MAME.
 * `snes_cart` declares 44 options; the list uses 32 of them, and LoROM and
 * HiROM alone are 3,523 of its 3,711 entries. A board that does not lower is
 * recorded as unsupported with its reason, so the shelf can say so.
 */
function cartridgeOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): { options: Record<string, GeneratedDeviceDefinition>; unsupported: Record<string, string> } {
  const source = readFileSync(join(mameSource, CARTRIDGE_OPTIONS_FILE), 'utf8');
  const used = softwareListBoards(mameSource);
  const options: Record<string, GeneratedDeviceDefinition> = {};
  const unsupported: Record<string, string> = {};
  for (const { option, type } of slotOptions(source, CARTRIDGE_OPTIONS_FUNCTION)) {
    if (!used.has(option)) continue;
    const definition = definitions.get(type);
    if (!definition) {
      unsupported[option] = `${type} has no MAME definition`;
      continue;
    }
    const card = compileMameDevice(mameSource, definition, type);
    if (card.summary.diagnostics) {
      const failing = card.methods.filter(method => method.program.diagnostics.length).map(method => method.name);
      unsupported[option] = `${type}: ${failing.slice(0, 6).join(', ')}${failing.length > 6 ? ', ...' : ''} did not lower`;
      continue;
    }
    options[option] = card;
  }
  if (!options.lorom || !options.hirom) {
    throw new Error(`the SNES LoROM and HiROM boards must lower (${JSON.stringify(unsupported)})`);
  }
  return { options, unsupported };
}

/**
 * The boards `snes_cart` declares that the software list uses, as
 * (option, device type) pairs: what the slot can be handed, and whose own
 * firmware sets a mounted card brings.
 */
export function snesCartOptions(mameSource: string): [string, string][] {
  const source = readFileSync(join(mameSource, CARTRIDGE_OPTIONS_FILE), 'utf8');
  const used = softwareListBoards(mameSource);
  return slotOptions(source, CARTRIDGE_OPTIONS_FUNCTION)
    .filter(({ option }) => used.has(option))
    .map(({ option, type }) => [option, type]);
}

/** The `slot` features hash/snes.xml names, plus MAME's own default board. */
function softwareListBoards(mameSource: string): Set<string> {
  const path = join(mameSource, SOFTWARE_LIST_FILE);
  if (!existsSync(path)) {
    throw new Error(`${SOFTWARE_LIST_FILE} is missing from the MAME checkout; the SNES boards are the ones its list names`);
  }
  const boards = new Set<string>(['lorom']);
  for (const match of readFileSync(path, 'utf8').matchAll(/<feature\s+name="slot"\s+value="([^"]+)"\s*\/?>/g)) {
    boards.add(match[1]!);
  }
  return boards;
}
