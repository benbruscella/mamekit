import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import type { GeneratedTiaAudio } from '../../mame/tia-audio-compiler.ts';
import {
  compileTiaAudio,
  generatedTiaWorkletSource,
  TIA_AUDIO_TYPE,
} from '../../mame/tia-audio-compiler.ts';
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
  A2600_AUDIO_WORKLET_ARTIFACT,
  A2600_CART_SLOT_TAG,
  A2600_MAME_TYPES,
  a2600DeviceIrArtifact,
  a2600DeviceModuleArtifact,
} from './definition.ts';

/**
 * Slot methods that identify an image rather than run the bus.
 *
 * The console room has already produced the cartridge bytes and resolved which
 * PCB the dump is, from MAME's own software list by chip CRC, so MAME's file
 * plumbing and its byte-sniffing fallbacks are host concerns -- the same
 * boundary the NES and ColecoVision packages draw. Dropping them keeps the live
 * read/write path source-derived without dragging image_file, softlist lookup
 * and error strings into the browser.
 *
 * The `detect_mode*` heuristics are here for a second reason worth stating:
 * they declare their signature tables as `signatures[][5]`, an unsized
 * multi-dimensional array the handler parser does not yet read. They would be
 * dropped as host methods either way, so that limit costs nothing here -- but
 * it is a limit, not a decision, and a dump the software list does not know
 * therefore falls back to its size rather than to MAME's sniffing.
 */
const IMAGE_HOST_METHODS = new Set([
  'call_load',
  'call_unload',
  'identify_cart_type',
  'get_default_card_software',
  'is_reset_on_load',
  'image_interface',
  'file_extensions',
]);

const isImageHostMethod = (name: string): boolean =>
  IMAGE_HOST_METHODS.has(name) ||
  name.startsWith('detect_') ||
  name.includes('::detect_');

/**
 * Compile the Atari 2600's cartridge slot, its source-declared PCBs, the
 * control ports with their cards, and the TIA raster.
 *
 * Slot children stay inside the device definition, so the browser registers
 * exactly the devices the machine composes while the generic device runtime
 * instantiates whichever PCB the mounted cartridge selects.
 */
export function extractA2600(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    A2600_MAME_TYPES.includes(entry.type as (typeof A2600_MAME_TYPES)[number]));
  if (!present.length) return undefined;

  const definitions = indexMameHardware(input.mameSource);
  const compiled = new Map<string, GeneratedDeviceDefinition>();
  for (const entry of present) {
    if (entry.type === TIA_AUDIO_TYPE) {
      // The sound half is the one device here the generic compiler cannot
      // reach -- `class tia` sits in an anonymous namespace with every method
      // inline, which parseMameAst reads as no class at all -- so it has its
      // own extractor. What comes back is an ordinary device definition.
      compiled.set(entry.type, compileTiaAudio(input.mameSource));
      continue;
    }
    const definition = entry.definition as MameHardwareDefinition | undefined;
    if (!definition) continue;
    const device = compileMameDevice(input.mameSource, definition, entry.type);
    if (entry.type === 'VCS_CART_SLOT') {
      device.methods = device.methods.filter(method =>
        !method.program.diagnostics.length && !isImageHostMethod(method.name));
      device.summary.methods = device.methods.length;
      device.summary.compiledMethods = device.methods.length;
      device.summary.diagnostics = 0;
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_cart'),
        default: defaultCartridgeOption(input.mameSource),
        // The console room resolves which PCB a cartridge is from the software
        // list's own `slot` feature, the same way the ColecoVision room does.
        selector: 'cart.slot',
        options: cartridgeOptions(input.mameSource, definitions),
      };
      device.role = 'cartridge';
    } else if (entry.type === 'VCS_CONTROL_PORT') {
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_device'),
        default: controlPortDefault(input.mameSource),
        selector: 'controller',
        options: slotOptions(
          input.mameSource,
          definitions,
          join(input.mameSource, 'src/devices/bus/vcs_ctrl/ctrl.cpp'),
          'vcs_control_port_devices',
        ),
      };
      device.role = 'controller';
    }
    if (device.summary.diagnostics) continue;
    compiled.set(entry.type, device);
  }
  if (!compiled.size) return undefined;

  const artifacts: CapabilityArtifact[] = [];
  const executable: CapabilityExtraction['executable'] = {};
  const entryMethods: Record<string, readonly LoweredMethod[]> = {};
  const entrySourceFiles: Record<string, readonly string[]> = {};
  for (const [type, device] of compiled) {
    const ir = a2600DeviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: a2600DeviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', '')),
      },
      // The chip renders beside the CPU; this is only what plays the result.
      ...(type === TIA_AUDIO_TYPE
        ? [{
            path: A2600_AUDIO_WORKLET_ARTIFACT,
            contents: generatedTiaWorkletSource(device as GeneratedTiaAudio),
          }]
        : []),
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

function slotCardMember(
  mameSource: string,
  definition: MameHardwareDefinition,
  fallback: string,
): string {
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  return /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(source)?.[1] ?? fallback;
}

/**
 * The cards a slot-interface function declares, keyed by the option name the
 * software list uses.
 *
 * Read from MAME's own `option_add` list rather than restated, so a card added
 * upstream arrives with the MAME checkout. A card whose methods do not all
 * lower is left out rather than registered as hardware that would misread its
 * own ROM.
 */
function slotOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
  sourceFile: string,
  functionName: string,
): Record<string, GeneratedDeviceDefinition> {
  const source = readFileSync(sourceFile, 'utf8');
  const body = new RegExp(
    `void\\s+${functionName}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`,
  ).exec(source)?.[1];
  if (!body) throw new Error(`MAME no longer declares ${functionName}`);
  const options: Record<string, GeneratedDeviceDefinition> = {};
  for (const match of body.matchAll(
    /option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g,
  )) {
    const [, option, type] = match;
    const definition = definitions.get(type!);
    if (!definition) continue;
    const card = compileMameDevice(mameSource, definition, type!);
    if (card.summary.diagnostics) continue;
    options[option!] = card;
  }
  if (!Object.keys(options).length) {
    throw new Error(`no card lowered for ${functionName}`);
  }
  return options;
}

/**
 * The cartridge PCBs, each bound to the region the mounted cartridge occupies.
 *
 * `device_vcs_cart_interface::rom_alloc` gives every PCB the same two members
 * over one region it allocates from the slot's own tag. Reading the suffix from
 * MAME rather than restating it means a rename upstream fails loudly instead of
 * silently unbinding every cartridge.
 */
function cartridgeOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): Record<string, GeneratedDeviceDefinition> {
  const romRegion = cartRomRegion(mameSource);
  const options = slotOptions(
    mameSource,
    definitions,
    join(mameSource, 'src/mame/atari/a2600.cpp'),
    'a2600_cart',
  );
  const addon = cartAddonPointer(mameSource);
  for (const [option, card] of Object.entries(options)) {
    card.resources = {
      ...card.resources,
      members: {
        ...card.resources?.members,
        m_rom: { kind: 'region', name: romRegion },
        m_rom_size: { kind: 'region-length', name: romRegion },
      },
      // The slot hands a PCB with an add-on chip a pointer into its own ROM
      // before installing its handlers. Only the DPC cartridge overrides the
      // interface's empty default, so calling it on every card is what MAME
      // does; the base implementation is a no-op.
      ...(addon !== undefined && card.methods.some(method => method.name === 'setup_addon_ptr')
        ? {
            initialize: [{
              method: 'setup_addon_ptr',
              args: [{ kind: 'region-pointer' as const, name: romRegion, offset: addon }],
            }],
          }
        : {}),
    };
    void option;
  }
  return options;
}

/**
 * The region a cartridge PCB allocates for its ROM, spelled the way MAME does
 * in `device_vcs_cart_interface::rom_alloc`: the slot's tag with a fixed suffix.
 */
/**
 * Where a cartridge's add-on chip finds its own data, as MAME's slot says.
 *
 * `vcs_slot.cpp` passes `get_rom_base() + 0x2000` to the mounted PCB: for
 * Pitfall II that is the 2K of display data sitting after the 8K program.
 * Read rather than restated, so the DPC's graphics do not silently become
 * whatever happened to be at offset zero.
 */
function cartAddonPointer(mameSource: string): number | undefined {
  const source = readFileSync(
    join(mameSource, 'src/devices/bus/vcs/vcs_slot.cpp'),
    'utf8',
  );
  const offset = /setup_addon_ptr\s*\([^;]*get_rom_base\s*\(\s*\)\s*\+\s*(0x[0-9a-fA-F]+|\d+)/
    .exec(source)?.[1];
  return offset ? Number(offset) : undefined;
}

export function cartRomRegion(mameSource: string): string {
  const source = readFileSync(
    join(mameSource, 'src/devices/bus/vcs/vcs_slot.cpp'),
    'utf8',
  );
  const suffix = /region_alloc\s*\(\s*std::string\s*\(\s*tag\s*(?:\(\s*\))?\s*\)\s*\.append\s*\(\s*"([^"]+)"/
    .exec(source)?.[1];
  if (!suffix) throw new Error('MAME no longer names a VCS cartridge ROM region');
  return `${A2600_CART_SLOT_TAG}${suffix}`;
}

/**
 * The PCB a cartridge falls back to, named by MAME itself in `vcs_get_slot`'s
 * final return. Read rather than restated so a rename upstream fails loudly
 * instead of silently mounting every unknown dump on the wrong board.
 */
function defaultCartridgeOption(mameSource: string): string {
  const source = readFileSync(
    join(mameSource, 'src/devices/bus/vcs/vcs_slot.cpp'),
    'utf8',
  );
  const body = /static const char \*vcs_get_slot\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/
    .exec(source)?.[1];
  const fallback = body && [...body.matchAll(/return\s+"([^"]+)"/g)].at(-1)?.[1];
  if (!fallback) throw new Error('MAME no longer names a default VCS cartridge PCB');
  return fallback;
}

/**
 * The controller a control port powers up with.
 *
 * The driver picks it per port in its machine config -- `VCS_CONTROL_PORT(
 * config, m_joy1, vcs_control_port_devices, "joy")` -- so the default is read
 * from there rather than from the slot-interface list, which declares no
 * default of its own.
 */
function controlPortDefault(mameSource: string): string {
  const source = readFileSync(join(mameSource, 'src/mame/atari/a2600.cpp'), 'utf8');
  const option = /VCS_CONTROL_PORT\s*\([^;]*?vcs_control_port_devices\s*,\s*"([^"]+)"\s*\)/
    .exec(source)?.[1];
  if (!option) throw new Error('MAME no longer names a default VCS control-port device');
  return option;
}
