import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  compileMameDevice,
  type GeneratedDeviceDefinition,
} from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
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
  COLECO_MAME_TYPES,
  colecoDeviceIrArtifact,
  colecoDeviceModuleArtifact,
} from './definition.ts';

/**
 * Slot methods that load an image rather than run the bus.
 *
 * The console room has already produced the cartridge bytes and chosen a card,
 * so MAME's file plumbing is a host concern. Dropping these keeps the live
 * read/write path source-derived without dragging image_file, softlist lookup
 * and error strings into the browser.
 */
const IMAGE_HOST_METHODS = new Set([
  'call_load',
  'call_unload',
  'get_default_card_software',
  'image_interface',
  'file_extensions',
  'is_reset_on_load',
]);

/**
 * Compile the ColecoVision cartridge slot, its source-declared cards, and the
 * expansion connector.
 *
 * The slot keeps its cards as children, so the browser registers exactly the
 * devices the machine composes while the generic device runtime instantiates
 * whichever PCB the mounted cartridge selects.
 */
export function extractColeco(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    COLECO_MAME_TYPES.includes(entry.type as (typeof COLECO_MAME_TYPES)[number]));
  if (!present.length) return undefined;

  const definitions = indexMameHardware(input.mameSource);
  const compiled = new Map<string, GeneratedDeviceDefinition>();
  for (const entry of present) {
    const definition = entry.definition as MameHardwareDefinition | undefined;
    if (!definition) continue;
    const device = compileMameDevice(input.mameSource, definition, entry.type);
    if (entry.type === 'COLECOVISION_CARTRIDGE_SLOT') {
      device.methods = device.methods.filter(method =>
        !method.program.diagnostics.length && !IMAGE_HOST_METHODS.has(method.name));
      device.summary.methods = device.methods.length;
      device.summary.compiledMethods = device.methods.length;
      device.summary.diagnostics = 0;
      device.slot = {
        member: slotCardMember(input.mameSource, definition, 'm_card'),
        default: 'standard',
        // The console room resolves which PCB a cartridge is, the same way the
        // NES room resolves a mapper.
        selector: 'cart.slot',
        options: cartridgeOptions(input.mameSource, definitions),
      };
      device.role = 'cartridge';
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
    const ir = colecoDeviceIrArtifact(type);
    artifacts.push(
      { path: ir, contents: JSON.stringify(device, null, 2) },
      {
        path: colecoDeviceModuleArtifact(type),
        contents: generatedDeviceExecutableSource(device, ir.replace('devices/', '')),
      },
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
 * The region a cartridge PCB allocates for its ROM, named by MAME itself in
 * `device_colecovision_cartridge_interface::rom_alloc`. Read rather than
 * restated so a rename upstream fails loudly instead of silently unbinding
 * every cartridge.
 */
function cartRomRegion(source: string): string {
  const name = /region_alloc\s*\(\s*"(:?[\w:]+)"/.exec(source)?.[1];
  if (!name) throw new Error('MAME no longer names a ColecoVision cartridge ROM region');
  return name.replace(/^:/, '');
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
 * The cartridge PCBs MAME declares for this slot, keyed by the option name the
 * software list uses. The list is read from `colecovision_cartridges` rather
 * than restated, so a card added upstream arrives with the MAME checkout.
 */
function cartridgeOptions(
  mameSource: string,
  definitions: Map<string, MameHardwareDefinition>,
): Record<string, GeneratedDeviceDefinition> {
  const source = readFileSync(
    join(mameSource, 'src/devices/bus/coleco/cartridge/exp.cpp'),
    'utf8',
  );
  const body = /void\s+colecovision_cartridges\s*\([^)]*\)\s*\{([\s\S]*?)\n\}/
    .exec(source)?.[1];
  if (!body) throw new Error('MAME no longer declares colecovision_cartridges');
  const romRegion = cartRomRegion(source);
  const options: Record<string, GeneratedDeviceDefinition> = {};
  for (const match of body.matchAll(
    /option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g,
  )) {
    const [, option, type] = match;
    const definition = definitions.get(type!);
    if (!definition) continue;
    const card = compileMameDevice(mameSource, definition, type!);
    // A card whose methods do not all lower is left out rather than registered
    // as a PCB that would misread its own ROM.
    if (card.summary.diagnostics) continue;
    // MAME's rom_alloc gives every PCB the same two members over the region it
    // allocates; the mounted cartridge is that region.
    card.resources = {
      ...card.resources,
      members: {
        ...card.resources?.members,
        m_rom: { kind: 'region', name: romRegion },
        m_rom_size: { kind: 'region-length', name: romRegion },
      },
    };
    options[option!] = card;
  }
  if (!Object.keys(options).length) {
    throw new Error('no ColecoVision cartridge PCB lowered');
  }
  return options;
}
