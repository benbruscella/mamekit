// MAME's floppy drive, lowered from imagedev/floppy.cpp.
//
// A drive mechanism is a `floppy_image_device` subclass declared by the
// DECLARE_FLOPPY_IMAGE_DEVICE macro in floppy.h, so its class only exists
// after the preprocessor has run; the drive is compiled from that text. What
// a drive does -- spin, step, raise its index pulse, hand the controller the
// next flux transition from the track under the head -- is all source. What
// it does not do is open files: finding an image's format and reading its
// bytes is the image host's job (the C++ `call_load` asks the OS for a file),
// so those methods are dropped and the success path of `call_load` becomes a
// `mount_image` method the host calls with a floppy image already built.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { stripComments } from '../kg/parse.ts';
import { walkExpressions } from '../ir/walk.ts';
import { parseMameConstructors, parseMameSource } from './ast.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { addSourceConstructor, compileMameDevice, type GeneratedDeviceDefinition } from './device-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import type { MameHardwareDefinition } from './hardware.ts';
import { preprocessedDeviceTransform } from './preprocessed-device.ts';

const FLOPPY_SOURCE = 'src/devices/imagedev/floppy.cpp';
const FLOPPY_HEADER = 'src/devices/imagedev/floppy.h';

/**
 * Image-file plumbing a drive declares but the image host owns: format
 * registration and identification, reading and writing the file, creating a
 * blank one, and the filesystem catalogue. None of it is drive behaviour.
 */
const IMAGE_HOST_METHODS = new Set([
  'register_formats', 'identify', 'call_load', 'call_unload', 'call_create', 'init_fs',
  'commit_image', 'setup_write', 'get_formats', 'get_fs', 'get_load_format', 'set_formats',
  'default_fm_floppy_formats', 'default_mfm_floppy_formats', 'default_pc_floppy_formats',
  'get_software_list_loader', 'file_extensions', 'image_interface', 'image_type_name',
  'image_brief_type_name', 'is_readable', 'is_writeable', 'is_creatable', 'is_reset_on_load',
]);

const declaredDrives = new Map<string, Set<string>>();

/**
 * True when a device type is a drive mechanism: floppy.h declares its class
 * with DECLARE_FLOPPY_IMAGE_DEVICE, deriving it from floppy_image_device.
 */
export function isFloppyDrive(mameSrc: string, definition: MameHardwareDefinition | undefined): boolean {
  if (!definition || definition.sourceFile !== FLOPPY_SOURCE) return false;
  let classes = declaredDrives.get(mameSrc);
  if (!classes) {
    const header = readFileSync(join(mameSrc, FLOPPY_HEADER), 'utf8');
    classes = new Set([...header.matchAll(/^\s*DECLARE_FLOPPY_IMAGE_DEVICE\(\s*\w+\s*,\s*(\w+)\s*,/gm)].map(match => match[1]!));
    declaredDrives.set(mameSrc, classes);
  }
  return classes.has(definition.className);
}

/** Compile one drive mechanism (ALPS_3255190X, ...) for the browser. */
export function compileFloppyDrive(
  mameSrc: string,
  definition: MameHardwareDefinition,
  type: string,
): GeneratedDeviceDefinition {
  const transformSource = preprocessedDeviceTransform(mameSrc, {
    entry: FLOPPY_SOURCE,
    allow: file => file === FLOPPY_HEADER,
    classes: [],
  });
  const drive = compileMameDevice(mameSrc, definition, type, new Set(), { transformSource });
  drive.methods = drive.methods.filter(method =>
    !IMAGE_HOST_METHODS.has(method.name.split('::').at(-1)!));
  // device_config_complete runs before the device starts, and it is where a
  // drive learns what it is: setup_characteristics() sets the form factor,
  // track count, sides and rpm. The format registration beside it is the
  // image host's, so that one call is left out.
  const configComplete = drive.methods.find(method => method.name === 'device_config_complete');
  if (configComplete) {
    configComplete.program = {
      ...configComplete.program,
      operations: configComplete.program.operations.filter(operation =>
        !(operation.op === 'call' && operation.expression.kind === 'call' &&
          operation.expression.callee.kind === 'identifier' &&
          operation.expression.callee.name === 'register_formats')),
    };
    drive.construct = 'device_config_complete';
  }
  // call_load's success path, after the host has identified the format and
  // built the image: from the point the image exists to the load callback.
  const source = readFileSync(join(mameSrc, FLOPPY_SOURCE), 'utf8');
  const load = parseMameSource(FLOPPY_SOURCE, source).functions
    .find(method => method.className === 'floppy_image_device' && method.name === 'call_load');
  const loaded = load && /(char const \*const wp = get_feature\("write_protected"\);[\s\S]*?)if \(!m_cur_load_cb\.isnull\(\)\)/.exec(load.body)?.[1];
  if (!load || loaded === undefined || !/\bbest_format\b/.test(loaded)) throw new Error('MAME floppy call_load success path changed');
  drive.methods.push({
    name: 'mount_image',
    parameters: 'floppy_image *image, const floppy_image_format_t *best_format',
    // From the list's `write_protected` feature to the write protect the
    // controller sees: a disk is writable unless its file is read-only or
    // its list says so (Bounty Bob Strikes Back will not load otherwise).
    // `m_output_format` is the format a dirty disk would be saved back in;
    // that save is call_unload's commit_image, which stays with the image
    // host, and MAMEKIT never writes a disk back: what the machine writes
    // lasts as long as the disk is in the drive.
    program: compileMameHandler(normalizeMameExecutionSource(`m_image = image; ${loaded}`)),
    source: { file: FLOPPY_SOURCE, line: load.span.line },
  });
  // call_unload, whole: the drive notices a disk leaving by its write-protect
  // sensor toggling as the sleeve passes. Only the image's ownership is the
  // host's -- `m_image.reset()` drops the drive's pointer to it.
  const unload = parseMameSource(FLOPPY_SOURCE, source).functions
    .find(method => method.className === 'floppy_image_device' && method.name === 'call_unload');
  if (!unload) throw new Error('MAME floppy call_unload is missing');
  drive.methods.push({
    name: 'unmount_image',
    parameters: '',
    program: compileMameHandler(normalizeMameExecutionSource(
      unload.body.replace(/\bm_image\.reset\(\s*\)\s*;/, 'm_image = nullptr;'))),
    source: { file: FLOPPY_SOURCE, line: unload.span.line },
  });
  drive.role = 'floppy';
  drive.summary = {
    methods: drive.methods.length,
    compiledMethods: drive.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: drive.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0),
  };
  return drive;
}

/** One image format a drive's connector registers, compiled for the host's loader. */
export interface FloppyFormatDefinition {
  /** The source's singleton name: FLOPPY_D64_FORMAT. */
  name: string;
  /** File extensions `extensions()` answers, lower case, most specific first. */
  extensions: string[];
  /** The format class, reduced to what `identify` and `load` reach. */
  definition: GeneratedDeviceDefinition;
}

/**
 * The formats a machine's floppy connectors register: a controller names its
 * registration function with `set_formats(cls::fn)`, and that function adds
 * each format with `fr.add(...)`. Read from the sources of the devices that
 * configure a connector; a filesystem (`fs::...`) is not an image format.
 */
export function connectorFloppyFormats(mameSrc: string, sourceFiles: readonly string[]): string[] {
  const formats: string[] = [];
  for (const file of new Set(sourceFiles)) {
    const source = stripComments(readFileSync(join(mameSrc, file), 'utf8'));
    for (const registration of source.matchAll(/\bset_formats\s*\(\s*(\w+)::(\w+)\s*\)/g)) {
      const body = new RegExp(`void\\s+${registration[1]}::${registration[2]}\\s*\\(\\s*format_registration\\s*&\\s*\\w+\\s*\\)\\s*\\{([^}]*)\\}`)
        .exec(source)?.[1] ?? '';
      for (const added of body.matchAll(/\.add\s*\(\s*(\w+)\s*\)/g)) {
        if (!formats.includes(added[1]!)) formats.push(added[1]!);
      }
    }
  }
  return formats;
}

/**
 * MAME's image IO (util::random_read) reports a file's size through a
 * reference: `if (io.length(size)) return false;`. The host's io answers the
 * size itself and cannot fail, so the call becomes the assignment it is for.
 */
function hostImageIo(source: string): string {
  return source.replace(/if\s*\(\s*io\.length\(\s*(\w+)\s*\)\s*\)\s*return\s+[^;]+;/g, '$1 = io.length();');
}

/** Where a registered format (FLOPPY_D64_FORMAT) is defined: its class and file. */
function floppyFormatSource(mameSrc: string, name: string): { className: string; sourceFile: string } {
  const directory = join(mameSrc, 'src/lib/formats');
  for (const file of readdirSync(directory).filter(entry => entry.endsWith('.cpp'))) {
    const match = new RegExp(`^const\\s+(\\w+)\\s+${name}\\s*;`, 'm').exec(readFileSync(join(directory, file), 'utf8'));
    if (match) return { className: match[1]!, sourceFile: `src/lib/formats/${file}` };
  }
  throw new Error(`MAME floppy format ${name} is not defined in src/lib/formats`);
}

/** The file extensions a registered format's `extensions()` answers, lower case. */
export function floppyFormatExtensions(mameSrc: string, name: string): string[] {
  const found = floppyFormatSource(mameSrc, name);
  const source = readFileSync(join(mameSrc, found.sourceFile), 'utf8');
  const listed = new RegExp(`${found.className}::extensions\\(\\)[^{]*\\{\\s*return\\s+"([^"]*)"`).exec(source)?.[1];
  if (!listed) throw new Error(`MAME floppy format ${name} declares no extensions`);
  return listed.split(',').map(extension => extension.trim().toLowerCase()).filter(Boolean);
}

/** Compile one registered format (FLOPPY_D64_FORMAT) down to its load path. */
export function compileFloppyFormat(mameSrc: string, name: string): FloppyFormatDefinition {
  const found = floppyFormatSource(mameSrc, name);
  const format = compileMameDevice(mameSrc, {
    type: name, className: found.className, sourceFile: found.sourceFile, sourceLine: 1, sourceColumn: 1, macro: '',
  }, name, new Set(), { transformSource: (_file, source) => hostImageIo(source) });
  // What a load reaches: identify, load and everything they call.
  const byName = new Map(format.methods.map(method => [method.name, method]));
  const reached = new Set(['identify', 'load', 'extensions']);
  const queue = [...reached];
  while (queue.length) {
    const method = byName.get(queue.shift()!);
    if (!method) continue;
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call') return;
      const callee = expression.callee.kind === 'identifier' ? expression.callee.name
        : expression.callee.kind === 'member' && expression.callee.object.kind === 'identifier' &&
          expression.callee.object.name === 'this' ? expression.callee.property : undefined;
      if (callee && byName.has(callee) && !reached.has(callee)) { reached.add(callee); queue.push(callee); }
    });
  }
  // The format singleton is default-constructed: d64_format() points its
  // `formats` at the class's own table of disk geometries.
  const constructed = parseMameConstructors(found.sourceFile, readFileSync(join(mameSrc, found.sourceFile), 'utf8'))
    .find(candidate => candidate.className === found!.className && !candidate.parameters.trim());
  if (constructed) {
    addSourceConstructor(format, constructed, true);
    reached.add(format.construct!);
  }
  format.methods = format.methods.filter(method => reached.has(method.name));
  format.hotMethods = format.methods.map(method => method.name);
  format.summary = {
    methods: format.methods.length,
    compiledMethods: format.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: format.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0),
  };
  return { name, extensions: floppyFormatExtensions(mameSrc, name), definition: format };
}

/** MAME's floppy_image: the track store a format fills and a drive reads. */
export function compileFloppyImage(mameSrc: string): GeneratedDeviceDefinition {
  const image = compileMameDevice(mameSrc, {
    type: 'FLOPPY_IMAGE', className: 'floppy_image', sourceFile: 'src/lib/formats/flopimg.cpp',
    sourceLine: 1, sourceColumn: 1, macro: '',
  }, 'FLOPPY_IMAGE');
  const source = readFileSync(join(mameSrc, 'src/lib/formats/flopimg.cpp'), 'utf8');
  const constructor = parseMameConstructors('src/lib/formats/flopimg.cpp', source)
    .find(candidate => candidate.className === 'floppy_image');
  if (!constructor) throw new Error('MAME floppy_image constructor is missing');
  addSourceConstructor(image, constructor, true);
  image.hotMethods = image.methods.map(method => method.name);
  return image;
}
