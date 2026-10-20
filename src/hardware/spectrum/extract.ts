import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice, type GeneratedDeviceDefinition } from '../../mame/device-compiler.ts';
import { indexMameHardware, type MameHardwareDefinition } from '../../mame/hardware.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { SPECTRUM_MAME_TYPES } from './definition.ts';

type SlotType = 'SPECTRUM_EXPANSION_SLOT' | 'DMA_SLOT';
const SLOT_TYPES: readonly string[] = ['SPECTRUM_EXPANSION_SLOT', 'DMA_SLOT'] satisfies SlotType[];

/**
 * The cards a machine plugs into each of a slot's option tables, by option
 * name, as MAME's machine configs spell them:
 * `SPECTRUM_EXPANSION_SLOT(config, m_exp, spectrum_expansion_devices, "kempjoy")`.
 */
function configuredDefaults(mameSource: string, type: string): Set<string> {
  let lines = '';
  try {
    lines = execFileSync('grep', ['-rhE', `\\b${type}\\s*\\(`, join(mameSource, 'src/mame')], { encoding: 'utf8' });
  } catch {
    // grep exits 1 when nothing matches: no machine names a default.
  }
  const defaults = new Set<string>();
  for (const match of lines.matchAll(new RegExp(`\\b${type}\\s*\\([^;]*?,\\s*\\w+\\s*,\\s*"(\\w+)"`, 'g'))) {
    defaults.add(match[1]!);
  }
  return defaults;
}

/**
 * A slot's cards, compiled from the option tables in its own source file. A
 * machine boots with its configured default, and a cartridge title with the
 * card whose own GENERIC_CARTSLOT takes it (the ZX Interface 2's
 * `spectrum_cart`), so those are the cards a generated machine can need. A
 * disk interface or a microdrive brings a controller of its own and stays out.
 * Only a card whose every method lowers is registered.
 */
function slotCards(mameSource: string, definition: MameHardwareDefinition): Record<string, GeneratedDeviceDefinition> {
  const source = readFileSync(join(mameSource, definition.sourceFile), 'utf8');
  const defaults = configuredDefaults(mameSource, definition.type);
  const hardware = indexMameHardware(mameSource);
  const cards: Record<string, GeneratedDeviceDefinition> = {};
  for (const table of source.matchAll(/void\s+\w+\s*\(\s*device_slot_interface\s*&\s*\w+\s*\)\s*\{([\s\S]*?)\n\}/g)) {
    for (const option of table[1]!.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)) {
      const [, name, type] = option as unknown as [string, string, string];
      if (cards[name]) continue;
      const card = hardware.get(type);
      if (!card) continue;
      const cartridge = /\bGENERIC_CARTSLOT\s*\(/.test(readFileSync(join(mameSource, card.sourceFile), 'utf8'));
      if (!defaults.has(name) && !cartridge) continue;
      const compiled = compileMameDevice(mameSource, card, type);
      if (compiled.summary.diagnostics) continue;
      cards[name] = compiled;
    }
  }
  return cards;
}

/** Every method of a device, its slot cards and their children is a codegen root. */
function markHotMethods(device: GeneratedDeviceDefinition): void {
  device.hotMethods = device.methods.map(method => method.name);
  for (const option of Object.values(device.slot?.options ?? {})) markHotMethods(option);
  for (const child of device.children ?? []) markHotMethods(child.definition);
}

export function extractSpectrum(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    SPECTRUM_MAME_TYPES.includes(entry.type as typeof SPECTRUM_MAME_TYPES[number]));
  if (!present.length) return undefined;
  const result: CapabilityExtraction = { executableTypes: [], executable: {}, artifacts: [], entryMethods: {}, entrySourceFiles: {} };
  for (const entry of present) {
    const source = entry.definition as MameHardwareDefinition | undefined;
    if (!source) continue;
    const device = compileMameDevice(input.mameSource, source, entry.type);
    if (SLOT_TYPES.includes(entry.type)) {
      // `m_card = get_card_device();` in the slot's device_start names the
      // member every call through the slot reaches its card by.
      const slotSource = readFileSync(join(input.mameSource, source.sourceFile), 'utf8');
      const member = /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(slotSource)?.[1];
      if (!member) throw new Error(`MAME's ${entry.type} no longer names its card`);
      device.slot = { member, options: slotCards(input.mameSource, source) };
    }
    if (device.summary.diagnostics) continue;
    // These are reached on every Z80 memory and I/O access, so none of them
    // may fall back to the interpreter.
    markHotMethods(device);
    const stem = `devices/${entry.type.toLowerCase()}`;
    result.executableTypes.push(entry.type);
    result.executable[entry.type] = { kind: 'device', artifact: `${stem}.device.ir.json` };
    result.artifacts.push(
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.device.ir.json`) },
    );
    result.entrySourceFiles![entry.type] = device.sourceFiles;
    result.entryMethods![entry.type] = device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    }));
  }
  return result.executableTypes.length ? result : undefined;
}
