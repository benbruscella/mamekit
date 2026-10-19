import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { evalExpr, parseDefines } from '../kg/parse.ts';
import { parseMameSource } from './ast.ts';
import { normalizeMameExecutionSource, stripInactivePreprocessorBranches } from './cpu-compiler.ts';
import { compileMameDevice, lowerStructLocals, structDeclarations, type GeneratedDeviceDefinition } from './device-compiler.ts';
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

export function compileDatassetteOptions(mameSource: string): Record<string, GeneratedDeviceDefinition> {
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
