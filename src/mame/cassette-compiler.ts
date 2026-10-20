import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr, parseDefines } from '../kg/parse.ts';
import { parseMameSource } from './ast.ts';
import { normalizeMameExecutionSource, stripInactivePreprocessorBranches } from './cpu-compiler.ts';
import { compileMameDevice, lowerStructLocals, structDeclarations, type CassetteImageFormat, type GeneratedDeviceDefinition } from './device-compiler.ts';
import { indexMameHardware } from './hardware.ts';
import { compileMameHandler } from './handler-ir.ts';
import { stripCppComments } from './initializer.ts';

/** Compile MAME's TAP waveform decoder; the host only allocates PCM storage. */
export function compileCbmTapeFormat(mameSource: string): GeneratedDeviceDefinition {
  const file = 'src/lib/formats/cbm_tap.cpp';
  const source = stripInactivePreprocessorBranches(stripCppComments(readFileSync(join(mameSource, file), 'utf8')));
  const names = new Set(['tap_data_to_samplecount', 'toggle_wave_data', 'cbm_output_wave',
    'cbm_tap_do_work', 'cbm_tap_to_wav_size', 'cbm_tap_fill_wave']);
  const methods = parseMameSource(file, source).functions.filter(method => names.has(method.name))
    .map(method => ({ name: method.name, parameters: method.parameters,
      program: compileMameHandler(normalizeMameExecutionSource(method.body)),
      source: { file, line: method.span.line } }));
  if (methods.length !== names.size) throw new Error('MAME TAP waveform entry points changed');
  const members = [...source.matchAll(/static\s+(int16_t|int)\s+(\w+)\s*(?:=\s*(\d+))?\s*;/g)]
    .map(match => ({ name: match[2]!, valueType: match[1]!, bits: match[1] === 'int16_t' ? 16 as const : 32 as const,
      signed: true, initial: Number(match[3] ?? 0) }));
  return { schemaVersion: 1, type: 'CBM_TAP_FORMAT', className: 'cbm_tap_format',
    hierarchy: [], sourceFiles: [file], constants: parseDefines(source), members,
    callbacks: [], timers: [], methods, hotMethods: [...names],
    summary: { methods: methods.length, compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) } };
}

/**
 * The `enum` constants a format reads from cassimg.h: the waveform flags and
 * `cassette_image::error`. The host is little-endian, as is every target the
 * browser runs on, so `LSB_FIRST`'s branch is the one taken.
 */
function cassetteImageConstants(mameSource: string): Record<string, number> {
  const header = readFileSync(join(mameSource, 'src/lib/formats/cassimg.h'), 'utf8')
    .replace(/#ifdef\s+LSB_FIRST\b/g, '#if 1');
  const source = stripInactivePreprocessorBranches(stripCppComments(header));
  const constants: Record<string, number> = {};
  for (const block of source.matchAll(/\benum\b(?:\s+class\s+\w+|\s*:\s*\w+)?\s*\{([^}]*)\}/g)) {
    let next = 0;
    for (const entry of block[1]!.split(',').map(text => text.trim()).filter(Boolean)) {
      const [name, expression] = entry.split('=').map(text => text.trim());
      const value = expression === undefined ? next : evalExpr(expression, constants);
      if (!name || !/^\w+$/.test(name) || value === null) throw new Error(`cassimg.h enum entry "${entry}" is unresolved`);
      constants[name] = value;
      next = value + 1;
    }
  }
  return constants;
}

/**
 * MAME's WAV cassette format (lib/formats/wavfile.cpp): the RIFF walk, its
 * checks and the waveform flags it picks are compiled. The cassette_image it
 * reads and fills -- `image_read`, `image_size`, `read_samples` -- is the
 * host's sample store, as cassimg.cpp is for every format.
 */
export function compileWavTapeFormat(mameSource: string): GeneratedDeviceDefinition & { extension: string } {
  const file = 'src/lib/formats/wavfile.cpp';
  const source = stripInactivePreprocessorBranches(stripCppComments(readFileSync(join(mameSource, file), 'utf8')));
  const names = new Set(['wavfile_process', 'wavfile_identify', 'wavfile_load']);
  const methods = parseMameSource(file, source).functions.filter(method => names.has(method.name))
    .map(method => ({ name: method.name, parameters: method.parameters,
      program: compileMameHandler(normalizeMameExecutionSource(method.body)),
      source: { file, line: method.span.line } }));
  if (methods.length !== names.size) throw new Error('MAME WAV cassette entry points changed');
  // `static const char magic1[4] = { 'R', 'I', 'F', 'F' };` and its kin.
  const members = [...source.matchAll(/static\s+const\s+char\s+(\w+)\s*\[\s*(\d+)\s*\]\s*=\s*\{([^}]*)\}\s*;/g)]
    .map(match => ({ name: match[1]!, valueType: 'char', bits: 8 as const, arrayLength: Number(match[2]),
      values: [...match[3]!.matchAll(/'(.)'/g)].map(character => character[1]!.charCodeAt(0)) }));
  if (members.length < 4 || members.some(member => member.values.length !== member.arrayLength)) {
    throw new Error('MAME WAV chunk tags changed');
  }
  const extension = /cassette_image::Format\s+(?:cassette_image::)?wavfile_format\s*=\s*\{\s*"(\w+)"/.exec(source)?.[1];
  if (!extension) throw new Error('MAME WAV format registration changed');
  const constants = { ...cassetteImageConstants(mameSource), ...parseDefines(source) };
  // wavfile_load's `cassette_image::Options opts;` is a struct of its own.
  const headerFile = 'src/lib/formats/cassimg.h';
  const structs = Object.fromEntries(structDeclarations(
    [{ file: headerFile, source: readFileSync(join(mameSource, headerFile), 'utf8') }], constants));
  const format: GeneratedDeviceDefinition & { extension: string } = {
    schemaVersion: 1, type: 'WAV_TAPE_FORMAT', className: 'wavfile_format', extension,
    hierarchy: [], sourceFiles: [file, headerFile], constants, members, structs,
    callbacks: [], timers: [], methods, hotMethods: [],
    summary: { methods: 0, compiledMethods: 0, diagnostics: 0 } };
  lowerStructLocals(format);
  format.summary = { methods: methods.length, compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) };
  return format;
}

/** Source-owned Datassette card and cassette transport, with a PCM image host. */
/**
 * The image files a datassette reads here: MAME's CBM `.tap` and its `.wav`
 * (`imageFormats` below), the two formats the C64's cassette registers.
 */
export const DATASSETTE_IMAGE_EXTENSIONS: readonly string[] = ['tap', 'wav'];

/**
 * MAME's cassette transport (imagedev/cassette.cpp): the methods a machine
 * drives it through, plus `mount_image`, the successful-load branch of
 * `internal_load` that takes a mounted image from the host.
 */
export function compileCassetteDevice(mameSource: string): GeneratedDeviceDefinition {
  const hardware = indexMameHardware(mameSource);
  const cassette = compileMameDevice(mameSource, hardware.get('CASSETTE')!, 'CASSETTE');
  const live = new Set(['device_start', 'update', 'change_state', 'get_state', 'input', 'output',
    'get_length', 'get_position', 'is_stopped', 'is_playing', 'is_recording', 'motor_on',
    'set_motor', 'set_speaker', 'speaker_on', 'set_channel', 'set_speed', 'go_forward', 'go_reverse', 'seek']);
  cassette.methods = cassette.methods.filter(method => live.has(method.name));
  const file = 'src/devices/imagedev/cassette.cpp';
  const load = parseMameSource(file, readFileSync(join(mameSource, file), 'utf8')).functions
    .find(method => method.name === 'internal_load')!;
  const initialized = /if\s*\(err == cassette_image::error::SUCCESS\)\s*\{([\s\S]*?)return std::error_condition\(\)/.exec(load.body)?.[1];
  if (!initialized) throw new Error('MAME cassette image-load initialization changed');
  cassette.methods.push({ name: 'mount_image', parameters: 'image_handle *image',
    // Image allocation/file IO is a host ABI; all transport initialization is
    // the successful-load branch from MAME, including speed and direction.
    program: compileMameHandler(normalizeMameExecutionSource(`if (!image) return; m_cassette = image; ${initialized}`)),
    source: { file, line: load.span.line } });
  cassette.role = 'cassette';
  summarize(cassette);
  return cassette;
}

function summarize(device: GeneratedDeviceDefinition): void {
  device.summary = { methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) };
}

export function compileDatassetteOptions(mameSource: string): Record<string, GeneratedDeviceDefinition> {
  const hardware = indexMameHardware(mameSource);
  const cassette = compileCassetteDevice(mameSource);
  const format = compileCbmTapeFormat(mameSource);
  const { extension: wavExtension, ...wav } = compileWavTapeFormat(mameSource);
  cassette.imageFormats = [{ extension: DATASSETTE_IMAGE_EXTENSIONS[0]!, definition: format,
    sizeMethod: 'cbm_tap_to_wav_size', fillMethod: 'cbm_tap_fill_wave',
    mountMethod: 'mount_image', sampleRate: format.constants.CBM_WAV_FREQUENCY! },
  { extension: wavExtension, definition: wav, identifyMethod: 'wavfile_identify', loadMethod: 'wavfile_load',
    mountMethod: 'mount_image' }];
  if (cassette.imageFormats.map(entry => entry.extension).join() !== DATASSETTE_IMAGE_EXTENSIONS.join()) {
    throw new Error('the datassette image formats and their extensions disagree');
  }
  cassette.resources = { initialize: [{ method: 'mount_image', args: [{ kind: 'sample-image',
    region: 'cassette:pcm', sampleRate: compileCbmTapeFormat(mameSource).constants.CBM_WAV_FREQUENCY! }] }] };
  const cardFile = 'src/devices/bus/pet/c2n.cpp';
  const cardSource = readFileSync(join(mameSource, cardFile), 'utf8');
  const defaultExpression = /set_default_state\(([^)]+)\)/.exec(cardSource)?.[1];
  const defaultState = defaultExpression && evalExpr(defaultExpression, cassette.constants);
  if (typeof defaultState !== 'number') throw new Error('MAME cassette default state is unresolved');
  cassette.resources.members = { m_default_state: { kind: 'number', value: defaultState } };
  cassette.summary = { methods: cassette.methods.length,
    compiledMethods: cassette.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: cassette.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) };
  const slotFile = 'src/devices/bus/pet/cass.cpp';
  const slot = parseMameSource(slotFile, readFileSync(join(mameSource, slotFile), 'utf8')).functions
    .find(method => method.name === 'cbm_datassette_devices')!;
  return Object.fromEntries([...slot.body.matchAll(/option_add\("([^"]+)",\s*(\w+)\)/g)].map(match => {
    const card = compileMameDevice(mameSource, hardware.get(match[2]!)!, match[2]!);
    card.resources = { members: { m_slot: { kind: 'owner' } } };
    card.children = [{ member: 'm_cassette', type: 'CASSETTE', definition: cassette }];
    return [match[1]!, card];
  }));
}

/** Where MAME's legacy format helpers are declared: LOG_FORMATS lives here. */
const IMAGE_UTILITY_HEADER = 'src/lib/formats/imageutl.h';

/**
 * Statements that call a macro the preprocessor makes dead code:
 * `#define LOG_FORMATS(...) do { if (0) osd_printf_info(__VA_ARGS__); } while (false)`.
 * Left in, their arguments are still evaluated, against tables (TZX's
 * `archive_ident`) nothing else reads.
 */
function stripDeadMacroCalls(source: string, headers: readonly string[]): string {
  const dead = headers.flatMap(header => [...header.matchAll(
    /#define\s+(\w+)\s*\([^)]*\)\s*do\s*\{\s*if\s*\(\s*0\s*\)[^\n]*\}\s*while\s*\(\s*(?:false|0)\s*\)/g,
  )].map(match => match[1]!));
  let result = source;
  for (const name of dead) {
    for (let at = result.search(new RegExp(`\\b${name}\\s*\\(`)); at >= 0; at = result.search(new RegExp(`\\b${name}\\s*\\(`))) {
      const open = result.indexOf('(', at);
      let depth = 0;
      let end = open;
      for (; end < result.length; end++) {
        const ch = result[end];
        if (ch === '"' || ch === "'") {
          for (end++; end < result.length && result[end] !== ch; end++) if (result[end] === '\\') end++;
        } else if (ch === '(') depth++;
        else if (ch === ')' && --depth === 0) break;
      }
      const semicolon = /^\s*;/.exec(result.slice(end + 1));
      result = `${result.slice(0, at)}${semicolon ? ';' : '0'}${result.slice(end + 1 + (semicolon ? semicolon[0].length : 0))}`;
    }
  }
  return result;
}

/** A `{ ... }` aggregate initializer's top-level entries. */
function initializerEntries(body: string): string[] {
  const entries: string[] = [];
  let depth = 0;
  let start = 0;
  for (let index = 0; index < body.length; index++) {
    const ch = body[index];
    if (ch === '"' || ch === "'") {
      for (index++; index < body.length && body[index] !== ch; index++) if (body[index] === '\\') index++;
    } else if (ch === '(' || ch === '{') depth++;
    else if (ch === ')' || ch === '}') depth--;
    else if (ch === ',' && depth === 0) {
      entries.push(body.slice(start, index).trim());
      start = index + 1;
    }
  }
  entries.push(body.slice(start).trim());
  return entries.filter(Boolean);
}

/**
 * File-scope state a legacy format keeps: TZX's `wave_data`, `block_count`,
 * `blocks` and `t_scale`, and its constant tables (`TZX_HEADER`).
 */
function formatFileMembers(source: string, constants: Record<string, number>): GeneratedDeviceDefinition['members'] {
  const members: GeneratedDeviceDefinition['members'] = [];
  const widths: Record<string, { bits: 8 | 16 | 32; signed: boolean }> = {
    int8_t: { bits: 8, signed: true }, uint8_t: { bits: 8, signed: false }, char: { bits: 8, signed: true },
    int16_t: { bits: 16, signed: true }, uint16_t: { bits: 16, signed: false },
    int: { bits: 32, signed: true }, int32_t: { bits: 32, signed: true }, uint32_t: { bits: 32, signed: false },
  };
  for (const match of source.matchAll(/^static\s+(?:const\s+)?(\w+)\s*(\*{0,2})\s*(\w+)\s*(\[\s*\w*\s*\])?\s*(?:=\s*([^;]+))?;/gm)) {
    const [, type, pointer, name, array, initializer] = match as unknown as [string, string, string, string, string | undefined, string | undefined];
    if (pointer) {
      members.push({ name, valueType: `${type}${pointer}`, initial: 0 });
      continue;
    }
    if (array) {
      const body = /^\{([\s\S]*)\}$/.exec(initializer?.trim() ?? '')?.[1];
      if (body === undefined) continue;
      const values = initializerEntries(body).map(entry => {
        const character = /^'(\\?.)'$/.exec(entry)?.[1];
        if (character) return character.length === 2 ? ({ n: 10, t: 9, r: 13, '0': 0 } as Record<string, number>)[character[1]!] ?? character.charCodeAt(1) : character.charCodeAt(0);
        return evalExpr(entry, constants);
      });
      if (values.some(value => value === null)) continue;
      const width = widths[type] ?? { bits: 32 as const, signed: true };
      members.push({ name, valueType: type, bits: width.bits, signed: width.signed, arrayLength: values.length, values: values as number[] });
      continue;
    }
    const width = widths[type];
    const value = initializer === undefined ? 0 : evalExpr(initializer.replace(/(\d)f\b/g, '$1'), constants);
    if (value === null) continue;
    members.push(width
      ? { name, valueType: type, bits: width.bits, signed: width.signed, initial: value }
      : { name, valueType: type, initial: value });
  }
  return members;
}

/**
 * A `cassette_image::LegacyWaveFiller` format, compiled: the file's own
 * functions reachable from the filler's `fill_wave` and `chunk_sample_calc`,
 * its file-scope state and its defines. The host runs MAME's
 * `legacy_construct` around them -- count, allocate, fill -- exactly as
 * cassimg.cpp does for the C64's `.tap` and the Spectrum's `.tzx`.
 */
function compileLegacyFiller(
  mameSource: string,
  file: string,
  fillerName: string,
): { definition: GeneratedDeviceDefinition; fill: string; size: string; sampleRate: number } {
  const raw = readFileSync(join(mameSource, file), 'utf8');
  const header = readFileSync(join(mameSource, IMAGE_UTILITY_HEADER), 'utf8');
  const source = stripDeadMacroCalls(stripInactivePreprocessorBranches(stripCppComments(raw)), [header]);
  const constants = parseDefines(source);
  const filler = new RegExp(`LegacyWaveFiller\\s+${fillerName}\\s*=\\s*\\{([^}]*)\\}`).exec(source)?.[1];
  if (!filler) throw new Error(`${file}: no LegacyWaveFiller ${fillerName}`);
  const [fill, , , size, frequency] = initializerEntries(filler);
  const sampleRate = evalExpr(frequency ?? '0', constants) || 11025;
  if (!fill || !size || size === 'nullptr') throw new Error(`${file}: ${fillerName} has no sample count`);
  const functions = parseMameSource(file, source).functions;
  const byName = new Map(functions.map(fn => [fn.name, fn]));
  const reached = new Set<string>();
  const pending = [fill, size];
  while (pending.length) {
    const name = pending.shift()!;
    const fn = byName.get(name);
    if (!fn || reached.has(name)) continue;
    reached.add(name);
    for (const call of fn.body.matchAll(/\b(\w+)\s*\(/g)) if (byName.has(call[1]!)) pending.push(call[1]!);
  }
  const methods = [...reached].map(name => {
    const method = byName.get(name)!;
    return { name, parameters: method.parameters,
      program: compileMameHandler(normalizeMameExecutionSource(method.body),
        method.returnType ? { returnType: method.returnType } : {}),
      source: { file, line: method.span.line } };
  });
  const definition: GeneratedDeviceDefinition = {
    schemaVersion: 1, type: `${fillerName.toUpperCase()}_FORMAT`, className: fillerName,
    hierarchy: [], sourceFiles: [file], constants, members: formatFileMembers(source, constants),
    callbacks: [], timers: [], methods, hotMethods: [...reached],
    summary: { methods: methods.length, compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics: methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0) },
  };
  return { definition, fill, size, sampleRate };
}

/**
 * The formats of a `CASSETTE_FORMATLIST` a machine hands its cassette with
 * `set_formats(...)`: the Spectrum's `tzx_cassette_formats` is the TZX and
 * TAP legacy fillers of tzx_cas.cpp. Every format answers for each extension
 * its `cassette_image::Format` names (`"tap,blk"`).
 */
export function compileCassetteFormatList(mameSource: string, listName: string): CassetteImageFormat[] {
  const { file, entries } = cassetteFormatListEntries(mameSource, listName);
  const formats: CassetteImageFormat[] = [];
  for (const entry of entries) {
    if (entry.wav) {
      const { extension, ...wav } = compileWavTapeFormat(mameSource);
      formats.push({ extension, definition: wav, identifyMethod: 'wavfile_identify', loadMethod: 'wavfile_load', mountMethod: 'mount_image', list: listName });
      continue;
    }
    const compiled = compileLegacyFiller(mameSource, file, entry.filler!);
    for (const extension of entry.extensions) {
      formats.push({ extension, definition: compiled.definition, sizeMethod: compiled.size,
        fillMethod: compiled.fill, sampleRate: compiled.sampleRate, mountMethod: 'mount_image', list: listName });
    }
  }
  return formats;
}

/**
 * The extensions a `CASSETTE_FORMATLIST` reads here: the ones of its formats
 * this compiler builds (the legacy wave fillers and wavfile), so a shelf
 * offers only the images the deck can play.
 */
export function cassetteFormatListExtensions(mameSource: string, listName: string): string[] {
  return [...new Set(cassetteFormatListEntries(mameSource, listName).entries
    .flatMap(entry => entry.wav ? ['wav'] : entry.extensions))];
}

function cassetteFormatListEntries(mameSource: string, listName: string): {
  file: string;
  entries: { wav?: true; extensions: string[]; filler?: string }[];
} {
  const directory = 'src/lib/formats';
  const file = readdirSync(join(mameSource, directory))
    .filter(name => name.endsWith('.cpp'))
    .map(name => `${directory}/${name}`)
    .find(candidate => new RegExp(`CASSETTE_FORMATLIST_START\\s*\\(\\s*${listName}\\s*\\)`)
      .test(readFileSync(join(mameSource, candidate), 'utf8')));
  if (!file) throw new Error(`MAME declares no cassette format list ${listName}`);
  const source = stripCppComments(readFileSync(join(mameSource, file), 'utf8'));
  const list = new RegExp(`CASSETTE_FORMATLIST_START\\s*\\(\\s*${listName}\\s*\\)([\\s\\S]*?)CASSETTE_FORMATLIST_END`).exec(source)?.[1] ?? '';
  const entries: { wav?: true; extensions: string[]; filler?: string }[] = [];
  // The list macro opens every list with formats of its own:
  // `CASSETTE_FORMATLIST_START(name)` is `{ &cassette_image::wavfile_format,
  // &cassette_image::flacfile_format,` before the list's own entries.
  const header = readFileSync(join(mameSource, 'src/lib/formats/cassimg.h'), 'utf8');
  const opening = /#define\s+CASSETTE_FORMATLIST_START\s*\(\s*\w+\s*\)((?:[^\n]*\\\n)*[^\n]*)/.exec(header)?.[1] ?? '';
  const implicit = [...opening.matchAll(/&\s*(cassette_image::\w+)/g)].map(match => match[1]!);
  const named = [...list.matchAll(/CASSETTE_FORMAT\s*\(\s*([\w:]+)\s*\)/g)].map(match => match[1]!);
  for (const name of [...implicit, ...named]) {
    if (name === 'cassette_image::wavfile_format') {
      entries.push({ wav: true, extensions: ['wav'] });
      continue;
    }
    // FLAC has a reader of its own, not a wave filler; it is not compiled.
    if (name.startsWith('cassette_image::')) continue;
    const format = new RegExp(`cassette_image::Format\\s+${name}\\s*=\\s*\\{([^}]*)\\}`).exec(source)?.[1];
    const [extensions = '', identify = ''] = format ? initializerEntries(format) : [];
    const filler = new RegExp(`\\b${identify}\\s*\\([^)]*\\)\\s*\\{[^}]*legacy_identify\\s*\\([^,]*,\\s*&\\s*(\\w+)`).exec(source)?.[1];
    // A format with a reader of its own (FLAC) is not compiled yet; the list
    // keeps the ones that are.
    if (!filler) continue;
    entries.push({ filler, extensions: extensions.replace(/"/g, '').split(',').map(value => value.trim()).filter(Boolean) });
  }
  return { file, entries };
}
