import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import { compileMameDevice, type GeneratedDeviceDefinition } from '../../mame/device-compiler.ts';
import { indexMameHardware, type MameHardwareDefinition } from '../../mame/hardware.ts';
import type { CapabilityArtifact, CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { NEOGEO_MAME_TYPES } from './definition.ts';

/**
 * The option tables a slot type is configured with, read from each machine's
 * own declaration of it: `NEOGEO_CTRL_EDGE_CONNECTOR(config, m_edge,
 * neogeo_arc_edge, "joy", false)` offers `neogeo_arc_edge`.
 */
function configuredTables(type: string, uses: CapabilityInput['entries'][number]['uses']): Set<string> {
  const tables = new Set<string>();
  for (const use of uses ?? []) {
    for (const statement of use.configuration ?? []) {
      const table = new RegExp(`\\b${type}\\s*\\(\\s*config\\s*,\\s*[^,]+,\\s*(\\w+)\\s*,`).exec(statement)?.[1];
      if (table) tables.add(table);
    }
  }
  return tables;
}

/** `void neogeo_cart(device_slot_interface &device) { ... }`, from the files beside the slot's own. */
function tableOptions(mameSource: string, slotSource: string, table: string): [string, string][] {
  const directory = join(mameSource, dirname(slotSource));
  for (const file of readdirSync(directory).filter(name => name.endsWith('.cpp'))) {
    const body = new RegExp(`void\\s+${table}\\s*\\(\\s*device_slot_interface\\s*&\\s*\\w+\\s*\\)\\s*\\{([\\s\\S]*?)\\n\\}`)
      .exec(readFileSync(join(directory, file), 'utf8'))?.[1];
    if (body) {
      return [...body.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)]
        .map(match => [match[1]!, match[2]!]);
    }
  }
  throw new Error(`MAME no longer declares the slot option table ${table} beside ${slotSource}`);
}

/** Every method of a slot or card is reached from a CPU access, so none falls back to the interpreter. */
function markHotMethods(device: GeneratedDeviceDefinition): void {
  device.hotMethods = device.methods.map(method => method.name);
}

export function extractNeogeo(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    NEOGEO_MAME_TYPES.includes(entry.type as typeof NEOGEO_MAME_TYPES[number]));
  if (!present.length) return undefined;
  const hardware = indexMameHardware(input.mameSource);
  const result: CapabilityExtraction = { executableTypes: [], executable: {}, artifacts: [], entryMethods: {}, entrySourceFiles: {} };
  const cardArtifacts = new Map<string, CapabilityArtifact[]>();
  for (const entry of present) {
    const source = entry.definition as MameHardwareDefinition | undefined;
    if (!source) continue;
    const device = compileMameDevice(input.mameSource, source, entry.type);
    if (device.summary.diagnostics) continue;
    const slotSource = readFileSync(join(input.mameSource, source.sourceFile), 'utf8');
    // `m_cart = dynamic_cast<device_neogeo_cart_interface *>(get_card_device());`
    const member = /\b(m_\w+)\s*=\s*(?:dynamic_cast\s*<[^>]+>\s*\(\s*)?get_card_device\s*\(\s*\)/.exec(slotSource)?.[1];
    if (!member) throw new Error(`MAME's ${entry.type} no longer names its card`);
    const slotKey = entry.type.toLowerCase();
    const cards: Record<string, string> = {};
    for (const table of configuredTables(entry.type, entry.uses)) {
      for (const [option, type] of tableOptions(input.mameSource, source.sourceFile, table)) {
        const key = type.toLowerCase();
        const module = `${slotKey}/${key}`;
        if (cards[option] && cards[option] !== module) {
          throw new Error(`${entry.type}: option "${option}" is ${cards[option]} in one table and ${module} in ${table}`);
        }
        if (!cardArtifacts.has(module)) {
          const definition = hardware.get(type);
          const card = definition ? compileMameDevice(input.mameSource, definition, type) : undefined;
          if (!card || card.summary.diagnostics) {
            cardArtifacts.set(module, []);
            continue;
          }
          markHotMethods(card);
          cardArtifacts.set(module, [
            { path: `devices/${module}.device.ir.json`, contents: JSON.stringify(card) },
            { path: `devices/${module}.ts`, contents: generatedDeviceExecutableSource(card, `${key}.device.ir.json`, '../../../core/generated-device.js') },
          ]);
        }
        if (cardArtifacts.get(module)!.length) cards[option] = module;
      }
    }
    device.slot = { member, options: {}, cards };
    markHotMethods(device);
    const stem = `devices/${slotKey}`;
    result.executableTypes.push(entry.type);
    result.executable[entry.type] = { kind: 'device', artifact: `${stem}.device.ir.json` };
    result.artifacts.push(
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${slotKey}.device.ir.json`) },
    );
    result.entrySourceFiles![entry.type] = device.sourceFiles;
    result.entryMethods![entry.type] = device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    }));
  }
  for (const artifacts of cardArtifacts.values()) result.artifacts.push(...artifacts);
  return result.executableTypes.length ? result : undefined;
}
