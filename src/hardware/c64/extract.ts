import { addSourceConstructor, compileMameDevice } from '../../mame/device-compiler.ts';
import { generatedDeviceExecutableSource } from '../../mame/device-codegen.ts';
import type { MameHardwareDefinition } from '../../mame/hardware.ts';
import type { CapabilityExtraction, CapabilityInput } from '../contract.ts';
import { C64_AUDIO_WORKLET_ARTIFACT, C64_MAME_TYPES } from './definition.ts';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseMameConstructors, parseMameSource } from '../../mame/ast.ts';
import { normalizeMameExecutionSource } from '../../mame/cpu-compiler.ts';
import { compileMameHandler } from '../../mame/handler-ir.ts';
import { compilePla } from '../../mame/pla-compiler.ts';
import { compileSid } from '../../mame/sid-compiler.ts';
import { generatedStreamWorkletSource } from '../../mame/stream-worklet.ts';
import { compileDatassetteOptions } from '../../mame/cassette-compiler.ts';
import { indexMameHardware } from '../../mame/hardware.ts';
import type { GeneratedDeviceDefinition } from '../../mame/device-compiler.ts';

/** MAME's own file for the C64 expansion port and the cards it accepts. */
const EXPANSION_FILE = 'src/devices/bus/c64/exp.cpp';

/** The slot-interface function the C64 driver hands C64_EXPANSION_SLOT. */
const EXPANSION_CARDS_FUNCTION = 'c64_expansion_cards';

/**
 * The cartridge lists the C64 driver declares for its expansion port, which
 * say which of the port's 75 cards a title can need: 54 do. The rest are
 * peripherals no list holds a title for (RAM expansions, MIDI interfaces).
 */
const CARTRIDGE_LISTS = ['hash/c64_cart.xml', 'hash/vic10.xml'];

/** MAME's CRT reader, whose table names the card each .crt hardware type needs. */
const CRT_FORMAT_FILE = 'src/lib/formats/cbm_crt.cpp';

/**
 * The cards the expansion port takes, by the option name a software list's
 * `slot` feature uses, read from MAME's own `c64_expansion_cards` so a card
 * added upstream arrives with the checkout. Only a card whose every method
 * lowers is registered: a half-compiled card would misread its own ROM.
 */
function expansionCards(mameSource: string, softwareDefault: string): Record<string, GeneratedDeviceDefinition> {
  const source = readFileSync(join(mameSource, EXPANSION_FILE), 'utf8');
  const body = new RegExp(`void\\s+${EXPANSION_CARDS_FUNCTION}\\s*\\([^)]*\\)\\s*\\{([\\s\\S]*?)\\n\\}`).exec(source)?.[1];
  if (!body) throw new Error(`MAME no longer declares ${EXPANSION_CARDS_FUNCTION}`);
  const used = new Set([softwareDefault]);
  for (const list of CARTRIDGE_LISTS) {
    const path = join(mameSource, list);
    if (!existsSync(path)) continue;
    for (const match of readFileSync(path, 'utf8').matchAll(/<feature\s+name="slot"\s+value="([^"]+)"/g)) used.add(match[1]!);
  }
  // And every card a .crt can ask for, by its header's hardware type.
  const crt = existsSync(join(mameSource, CRT_FORMAT_FILE)) ? readFileSync(join(mameSource, CRT_FORMAT_FILE), 'utf8') : '';
  const names = /CRT_C64_SLOT_NAMES\s*\[[^\]]*\]\s*=\s*\{([^}]*)\}/.exec(crt)?.[1] ?? '';
  for (const match of names.matchAll(/"([^"]+)"/g)) used.add(match[1]!);
  const hardware = indexMameHardware(mameSource);
  const cards: Record<string, GeneratedDeviceDefinition> = {};
  for (const match of body.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)) {
    const [, option, type] = match as unknown as [string, string, string];
    const definition = hardware.get(type);
    if (!used.has(option) || !definition) continue;
    const card = compileMameDevice(mameSource, definition, type);
    if (card.summary.diagnostics) continue;
    cards[option] = card;
  }
  if (!cards[softwareDefault]) throw new Error(`the C64 expansion port's ${softwareDefault} card did not lower`);
  return cards;
}

/** Every method of a device, its slot cards and their children is a codegen root. */
function markHotMethods(device: {
  methods: { name: string }[];
  hotMethods?: string[];
  slot?: { options: Record<string, unknown> };
  children?: { definition: unknown }[];
}): void {
  device.hotMethods = device.methods.map(method => method.name);
  for (const option of Object.values(device.slot?.options ?? {})) markHotMethods(option as typeof device);
  for (const child of device.children ?? []) markHotMethods(child.definition as typeof device);
}

export function extractC64(input: CapabilityInput): CapabilityExtraction | undefined {
  const present = input.entries.filter(entry =>
    C64_MAME_TYPES.includes(entry.type as typeof C64_MAME_TYPES[number]));
  if (!present.length) return undefined;
  const result: CapabilityExtraction = { executableTypes: [], executable: {}, artifacts: [], entryMethods: {}, entrySourceFiles: {} };
  for (const entry of present) {
    const source = entry.definition as MameHardwareDefinition | undefined;
    if (!source) continue;
    const device = ['MOS6581', 'MOS8580'].includes(entry.type) ? compileSid(input.mameSource, source)
      : entry.type === 'PLS100' ? compilePla(input.mameSource, source)
      : compileMameDevice(input.mameSource, source, entry.type);
    if (entry.type === 'CBM_IEC') {
      const file = source.sourceFile;
      const constructor = parseMameConstructors(file, readFileSync(join(input.mameSource, file), 'utf8'))
        .find(candidate => candidate.className === source.className);
      if (!constructor) throw new Error('MAME IEC bus constructor missing');
      addSourceConstructor(device, constructor);
    }
    if (entry.type === 'PET_DATASSETTE_PORT') {
      device.slot = { member: 'm_cart', options: compileDatassetteOptions(input.mameSource) };
    }
    if (entry.type === 'C64_EXPANSION_SLOT') {
      // MAME picks the card before the machine starts, with the slot's own
      // get_default_card_software: a .crt's header names its hardware type,
      // a software-list title its `slot` feature, and anything else takes the
      // card software_get_default_slot is handed ("standard"). It is compiled
      // with the rest, and the device runtime calls it with the image in hand
      // (GeneratedDeviceOptions.image); the default it names also says which
      // card a title must at least find here.
      const chooser = device.methods.find(method => method.name === 'get_default_card_software');
      const source = readFileSync(join(input.mameSource, EXPANSION_FILE), 'utf8');
      const softwareDefault = /software_get_default_slot\s*\(\s*"([^"]+)"\s*\)/.exec(source)?.[1];
      const member = /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(source)?.[1];
      if (!chooser || !softwareDefault || !member) throw new Error('MAME no longer names the C64 expansion port\'s default card');
      device.slot = { member, options: expansionCards(input.mameSource, softwareDefault) };
      device.summary = {
        methods: device.methods.length,
        compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
        diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0),
      };
    }
    if (entry.type === 'RAM') {
      // Allocation and default-size option parsing lower to BoardIR storage.
      // Live accessors retain the source methods over that allocated pointer.
      const live = new Set(['pointer', 'pointer_u8', 'size', 'mask', 'read', 'write']);
      device.methods = device.methods.filter(method => live.has(method.name));
      delete device.start;
      delete device.reset;
      const header = 'src/devices/machine/ram.h';
      const pointer = parseMameSource(header, readFileSync(join(input.mameSource, header), 'utf8'))
        .functions.find(method => method.name === 'pointer' && method.templateParameters?.includes('T'));
      const accessor = device.methods.find(method => method.name === 'pointer');
      if (!pointer || !accessor) throw new Error('MAME RAM pointer template is missing');
      accessor.program = compileMameHandler(normalizeMameExecutionSource(pointer.body).replace(/\bT\b/g, 'uint8_t'));
      device.summary = {
        methods: device.methods.length,
        compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
        diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0),
      };
    }
    if (device.summary.diagnostics) continue;
    // These connector and memory accessors participate in every CPU/VIC bus
    // cycle. Include their small source methods as compilation entry points;
    // loop-shape detection alone misses e.g. RAM::pointer and GAME/EXROM.
    // The slot cards and their children count too: the datassette port's
    // cassette answers `update`/`input`/`motor_on` two thousand times a frame
    // while a tape loads, and left as non-roots those ran interpreted and cost
    // the machine a third of its frame rate.
    markHotMethods(device);
    // Loading an image runs once a mount, and the interpreter is the path
    // that hands its reference out-parameters over as l-values:
    // `load_software_region("roml", m_card->m_roml)` fills the card's ROM.
    // So does choosing the card, and MAME's CRT reader with both.
    if (entry.type === 'C64_EXPANSION_SLOT') {
      device.hotMethods = device.hotMethods!.filter(name =>
        name !== 'call_load' && name !== 'get_default_card_software' && !name.startsWith('cbm_crt_'));
    }
    const stem = `devices/${entry.type.toLowerCase()}`;
    result.executableTypes.push(entry.type);
    result.executable[entry.type] = { kind: 'device', artifact: `${stem}.device.ir.json` };
    result.artifacts.push(
      { path: `${stem}.device.ir.json`, contents: JSON.stringify(device, null, 2) },
      { path: `${stem}.ts`, contents: generatedDeviceExecutableSource(device, `${entry.type.toLowerCase()}.device.ir.json`) },
    );
    if (['MOS6581', 'MOS8580'].includes(entry.type)) result.artifacts.push({
      path: C64_AUDIO_WORKLET_ARTIFACT, contents: generatedStreamWorkletSource({
        kind: 'sid', sourceFiles: device.sourceFiles, methods: device.methods.map(method => method.name),
      }),
    });
    result.entrySourceFiles![entry.type] = device.sourceFiles;
    result.entryMethods![entry.type] = device.methods.map(method => ({
      name: method.name, parameters: method.parameters, sourceFile: method.source.file,
      sourceLine: method.source.line, body: '', program: method.program,
    }));
  }
  return result.executableTypes.length ? result : undefined;
}
