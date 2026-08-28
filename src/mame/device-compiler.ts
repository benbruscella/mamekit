import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import { evalExpr } from '../kg/parse.ts';
import type { BoardSourceRef, GeneratedHandlerProgram } from '../ir/board.ts';
import {
  parseMameAst,
  splitMameArgs,
  type MameClass,
  type MameFunction,
} from './ast.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { compileMameHandler } from './handler-ir.ts';
import type { MameHardwareDefinition } from './hardware.ts';

export interface GeneratedDeviceMember {
  name: string;
  valueType: string;
  bits?: 1 | 8 | 16 | 32;
  signed?: boolean;
  initial?: number;
  values?: unknown[];
  /**
   * MAME memory containers rather than scalar state. A `shared` member is a
   * required/optional_shared_ptr bound to a board memory share; an `owned`
   * member is a device-local vector sized by device_start.
   */
  memory?: {
    kind: 'shared' | 'owned';
    elementBytes: number;
    /** Share tag; DEVICE_SELF resolves to the device's own tag at runtime. */
    share?: 'self' | string;
  };
  /** Source-declared MAME finder resolved by the generic composition host. */
  finder?: {
    kind: 'input' | 'device';
    tag: string;
  };
  /**
   * Declared array bound, for a member whose C++ type is an object rather than
   * a number -- `bitmap_ind16 helper[2]`. Scalar arrays already arrive through
   * `values`/`memory`; this is what tells the host to make two of something.
   */
  arrayLength?: number;
}

export interface GeneratedDeviceCallback {
  signal: string;
  member: string;
  slots: number;
  initial?: number;
}

export interface GeneratedDeviceTimer {
  member: string;
  callback: string;
}

export interface GeneratedDeviceMethod {
  name: string;
  parameters: string;
  program: GeneratedHandlerProgram;
  source: BoardSourceRef;
  /**
   * Constants scoped to this method alone — a driver's template instantiation
   * (`videoram_w<Which>`) gives each expansion its own value, so they must not
   * merge into the shared scope. Resolved before the scope's constants,
   * matching the interpreter's per-handler binding order.
   */
  constants?: Record<string, number>;
}

export interface GeneratedDeviceDefinition {
  schemaVersion: 1;
  type: string;
  className: string;
  hierarchy: string[];
  sourceFiles: string[];
  constants: Record<string, number>;
  members: GeneratedDeviceMember[];
  callbacks: GeneratedDeviceCallback[];
  timers: GeneratedDeviceTimer[];
  methods: GeneratedDeviceMethod[];
  /** Source-derived runtime entry points that must use direct generated code. */
  hotMethods?: string[];
  /** A source-declared card slot with generated child-device definitions. */
  slot?: {
    member: string;
    default?: string;
    /** Runtime selector supplied by the machine host, e.g. "cart.mapper". */
    selector?: string;
    options: Record<string, GeneratedDeviceDefinition>;
  };
  /** Runtime resources and power-on calls derived by a capability compiler. */
  resources?: {
    members?: Record<string, GeneratedDeviceResource>;
    initialize?: {
      method: string;
      args?: GeneratedDeviceResource[];
    }[];
  };
  /** Dynamic address ranges installed by MAME machine_start. */
  bus?: {
    cpu?: string;
    ranges: {
      start: number;
      end: number;
      read?: string;
      write?: string;
      bank?: string;
    }[];
  };
  /** Cross-device address-space calls resolved by a composition role. */
  role?: string;
  links?: {
    call: string;
    targetRole: string;
    method?: string;
    ranges?: {
      start: number;
      end: number;
      target: 'self' | 'slot';
      method: string;
    }[];
  }[];
  /**
   * Machine-config setter -> device_delegate member it assigns.
   *
   * MAME spells a device delegate's configuration as an inline forwarding
   * setter (`set_pri_callback(...) { m_pri_cb.set(...); }`), so the driver's
   * FUNC() names the setter while the device's own code calls the member.
   * Composition needs both halves to connect the two.
   */
  delegates?: Record<string, string>;
  /** Ratio between the configured input clock and one execute_run cycle. */
  clockDivider?: number;
  /** Address width of the device's internal data space, when source-declared. */
  dataAddressBits?: number;
  /**
   * Address spaces the device declares for itself through
   * `device_memory_interface`. MAME's video-display processors keep their
   * display memory this way rather than on the CPU bus: the TMS9928A declares
   * `address_space_config("vram", ENDIANNESS_BIG, 8, 14, 0, ...)` and reaches
   * it as `space(AS_DATA)`.
   *
   * Only a space whose own address map is flat RAM across the whole range is
   * recorded. Anything else is a bus the runtime would have to decode, and a
   * device is left without its space rather than given a wrong one.
   */
  spaces?: {
    /** MAME address-space index, as `space(n)` is called with. */
    index: number;
    name: string;
    addressBits: number;
    dataBits: number;
    ram: true;
  }[];
  start?: string;
  reset?: string;
  summary: {
    methods: number;
    compiledMethods: number;
    diagnostics: number;
  };
}

export type GeneratedDeviceResource =
  | { kind: 'number'; value: number }
  | { kind: 'region'; name: string }
  | { kind: 'region-length'; name: string }
  | { kind: 'region-pages'; name: string; bytes: number }
  | { kind: 'region-page-mask'; name: string; bytes: number }
  | { kind: 'memory'; name: string; bytes: number; onlyWhenRegionMissing?: string }
  | { kind: 'missing-region-number'; name: string; missing: number; present: number }
  | { kind: 'config-map'; path: string; values: Record<string, number>; fallback?: number }
  | { kind: 'bank-array'; name: string; count: number };

/**
 * Compile a MAME device class and its MAME-defined base classes into the
 * hardware-neutral executable-device IR.
 */
export function compileMameDevice(
  mameSrc: string,
  definition: MameHardwareDefinition,
  type = definition.type,
): GeneratedDeviceDefinition {
  const sourceFiles = localSourceFiles(mameSrc, definition.sourceFile);
  const sources = sourceFiles.map(file => ({
    file,
    source: readFileSync(join(mameSrc, file), 'utf8'),
  }));
  const ast = parseMameAst(sources);
  const classes = new Map(
    ast.units.flatMap(unit => unit.classes).map(declaration => [declaration.name, declaration]),
  );
  const hierarchy = classHierarchy(definition.className, classes);
  const memberOwners = new Map<string, string[]>();
  for (const className of hierarchy) {
    const declaration = classes.get(className);
    if (!declaration) continue;
    for (const member of memberDeclarations(declaration)) {
      const owners = memberOwners.get(member.name) ?? [];
      owners.push(className);
      memberOwners.set(member.name, owners);
    }
  }
  const emittedMemberName = (owner: string, name: string): string => {
    const owners = memberOwners.get(name) ?? [];
    const ownerIndex = owners.indexOf(owner);
    if (ownerIndex <= 0) return name;
    return `${name}__${owner.replace(/\W+/g, '_')}`;
  };
  const resolvedMemberName = (className: string, name: string): string => {
    const classIndex = hierarchy.indexOf(className);
    const owner = (memberOwners.get(name) ?? [])
      .filter(candidate => hierarchy.indexOf(candidate) <= classIndex)
      .at(-1);
    return owner ? emittedMemberName(owner, name) : name;
  };
  // MAME instantiates some device families from a template base (the buffered
  // spriteram widths). Resolving the concrete arguments keeps the generated
  // device tied to the width the driver actually declares.
  const templateArguments = resolveTemplateArguments(definition.className, classes);
  const specialize = (className: string, text: string): string => {
    const substitutions = templateArguments.get(className);
    let specialized = text;
    for (const [parameter, argument] of Object.entries(substitutions ?? {})) {
      specialized = specialized.replace(new RegExp(`\\b${parameter}\\b`, 'g'), argument);
    }
    for (const name of memberOwners.keys()) {
      const resolved = resolvedMemberName(className, name);
      if (resolved !== name) {
        specialized = specialized.replace(new RegExp(`\\b${name}\\b`, 'g'), resolved);
      }
    }
    return specialized;
  };
  const constants = Object.assign(
    {},
    coreLineStates(mameSrc),
    coreAddressSpaces(mameSrc),
    ...sources.map(({ source }) => numericConstants(source)),
  );
  const sourceTables = Object.assign(
    {},
    ...sources.map(({ source }) => constantTables(source)),
  );
  const interruptCallbacks = sources.flatMap(({ source }) => [...source.matchAll(
    /\b(m_\w+)->set_input_line\s*\(\s*(INPUT_LINE_\w+)/g,
  )].map(match => ({
    member: match[1]!,
    line: match[2]!,
    signal: match[2] === 'INPUT_LINE_NMI'
      ? 'nmi'
      : match[2] === 'INPUT_LINE_RESET'
        ? 'reset'
        : 'irq',
  })));
  const ignoredMethods = new Set([
    'device_add_mconfig',
    'device_rom_region',
    'memory_space_config',
    'create_disassembler',
    // Browser persistence is a host concern. Device state and default bytes
    // remain source-derived, but MAME stream serialization is not executable
    // device behavior.
    'nvram_default',
    'nvram_read',
    'nvram_write',
  ]);
  const methods: GeneratedDeviceMethod[] = [];
  const methodOwners = new Map<string, string>();
  // Raw C++ bodies, kept beside the compiled programs for the few facts that
  // are read from the source text rather than from IR -- the address-space
  // declarations below are one.
  const methodBodies = new Map<string, string>();
  const replaceOrAppend = (method: MameFunction): void => {
    const specialized = specializeMethod(method, specialize);
    // Recorded even for an ignored method: `memory_space_config` is not
    // executable device behaviour, but it is where the space indices are said.
    methodBodies.set(specialized.name, specialized.body);
    if (ignoredMethods.has(specialized.name) || specialized.parameters.includes('...')) return;
    const signature = methodSignature(specialized.name, specialized.parameters);
    const existing = methods.findIndex(candidate =>
      methodSignature(candidate.name, candidate.parameters) === signature);
    const compiled = compileMethod(specialized, interruptCallbacks, sourceTables);
    // hierarchy is base-first: a derived virtual with the same signature
    // replaces its base implementation, while genuine overloads remain.
    // Keep a qualified alias for an overridden base because derived MAME
    // methods can explicitly call `base_class::method(...)`.
    if (existing >= 0) {
      const previous = methods[existing]!;
      const owner = methodOwners.get(signature);
      if (owner) {
        const qualified = `${owner}::${previous.name}`;
        if (!methods.some(candidate => candidate.name === qualified)) {
          methods.push({ ...previous, name: qualified });
        }
      }
      methods[existing] = compiled;
    } else {
      methods.push(compiled);
    }
    methodOwners.set(signature, specialized.className);
  };

  const sourceMethods = ast.units.flatMap(unit => unit.functions);
  for (const className of hierarchy) {
    for (const method of sourceMethods.filter(candidate => candidate.className === className)) {
      for (const specialized of specializeFunctionTemplate(method, sources)) {
        replaceOrAppend(specialized);
      }
    }
    const declaration = classes.get(className);
    if (!declaration) continue;
    for (const method of inlineMethods(declaration)) {
      for (const specialized of specializeFunctionTemplate(method, sources)) {
        replaceOrAppend(specialized);
      }
    }
  }

  const callbacks: GeneratedDeviceCallback[] = [];
  const allocatedArrays = allocatedMemberArrays(
    sources.map(source => source.source).join('\n'),
    constants,
  );
  const fixedArrays = fixedMemberArrays(
    [...classes.values()].map(declaration => declaration.body).join('\n'),
    constants,
  );
  const constructorBindings = memberConstructorBindings(
    sources.map(source => source.source).join('\n'),
  );
  const members: GeneratedDeviceMember[] = hierarchy.flatMap(className => {
    const declaration = classes.get(className);
    if (!declaration) return [];
    return memberDeclarations(declaration).map(member => ({
      ...member,
      name: emittedMemberName(className, member.name),
      valueType: specialize(className, member.valueType),
    })).flatMap(member => {
      if (member.valueType.startsWith('devcb_')) {
        callbacks.push({
          signal: member.name.replace(/^m_/, ''),
          member: member.name,
          slots: callbackSlots(member.valueType),
          initial: member.valueType.startsWith('devcb_read8') ? 0xff : 0,
        });
        return [];
      }
      const bits = integerBits(member.valueType);
      const signed = integerSigned(member.valueType);
      const allocated = allocatedArrays.get(member.name) ?? fixedArrays.get(member.name);
      const memory = memoryContainer(member.valueType, member.name, constructorBindings);
      const finder = finderBinding(member.valueType, member.name, constructorBindings);
      return [{
        name: member.name,
        valueType: member.valueType,
        ...(bits ? { bits } : {}),
        ...(signed ? { signed } : {}),
        ...(allocated ? { values: allocated } : {}),
        ...(memory ? { memory } : {}),
        ...(finder ? { finder } : {}),
        ...(member.arrayLength ? { arrayLength: member.arrayLength } : {}),
      }];
    });
  });
  for (const className of hierarchy) {
    const body = classes.get(className)?.body ?? '';
    for (const accessor of body.matchAll(
      /\bauto\s+(\w+)\s*\([^)]*\)\s*\{\s*return\s+(m_\w+)(?:\[[^\]]+\])?\.bind\s*\(\s*\)\s*;\s*\}/g,
    )) {
      const callback = callbacks.find(candidate => candidate.member === accessor[2]);
      if (callback) callback.signal = accessor[1]!;
    }
  }
  for (const callback of interruptCallbacks) {
    if (callbacks.some(candidate => candidate.signal === callback.signal)) continue;
    callbacks.push({
      signal: callback.signal,
      member: `m_${callback.signal}`,
      slots: 1,
      initial: 0,
    });
  }
  const constructorValues = constructorInitialValues(
    definition.className,
    sources.map(source => source.source).join('\n'),
    constants,
  );
  for (const member of members) {
    if (constructorValues[member.name] !== undefined) {
      member.initial = constructorValues[member.name];
    }
  }
  const timers = sources.flatMap(({ source }) => [...source.matchAll(
    /\b(m_\w+)\s*=\s*timer_alloc\s*\(\s*FUNC\(\s*\w+::(\w+)\s*\)/g,
  )].map(match => ({ member: match[1]!, callback: match[2]! })));
  const diagnostics = methods.reduce(
    (count, method) => count + method.program.diagnostics.length,
    0,
  );
  const source = sources.map(candidate => candidate.source).join('\n');
  const clockDivider = executionClockDivider(source);
  const dataAddressBits = executionDataAddressBits(definition.className, source, constants);
  const spaces = deviceAddressSpaces(definition.className, hierarchy, source, constants, methodBodies);
  // Bitmap entry points are necessarily frame/scanline hot paths. Methods
  // installed through FUNC(...) are hardware callbacks too: a child MCU can
  // invoke a tiny parent-port handler hundreds of thousands of times per
  // second. Selecting both shapes keeps source-derived execution direct
  // without naming any particular device family.
  const callbackMethods = new Set([...source.matchAll(
    /\bFUNC\s*\(\s*[A-Za-z_]\w*(?:::[A-Za-z_]\w*)*::([A-Za-z_]\w*)(?:\s*<\s*(\d+)\s*>)?\s*\)/g,
  )].map(match => match[2] === undefined ? match[1]! : `${match[1]}_${match[2]}`));
  const hotMethods = methods
    .filter(method =>
      !method.program.diagnostics.length &&
      (
        /\bbitmap_(?:rgb32|ind16)\s*&/.test(method.parameters) ||
        callbackMethods.has(method.name)
      ))
    .map(method => method.name);
  const delegates: Record<string, string> = {};
  for (const className of hierarchy) {
    for (const setter of (classes.get(className)?.body ?? '').matchAll(
      /\btemplate\s*<[^>]*>\s*void\s+(\w+)\s*\([^)]*\)\s*\{\s*(m_\w+)\s*\.set\s*\(/g,
    )) {
      delegates[setter[1]!] = resolvedMemberName(className, setter[2]!);
    }
  }
  return {
    schemaVersion: 1,
    type,
    className: definition.className,
    hierarchy,
    sourceFiles,
    constants,
    members,
    callbacks,
    timers,
    methods,
    ...(Object.keys(delegates).length ? { delegates } : {}),
    ...(hotMethods.length ? { hotMethods } : {}),
    ...(clockDivider ? { clockDivider } : {}),
    ...(dataAddressBits ? { dataAddressBits } : {}),
    ...(spaces.length ? { spaces } : {}),
    ...(methods.some(method => method.name === 'device_start') ? { start: 'device_start' } : {}),
    ...(methods.some(method => method.name === 'device_reset') ? { reset: 'device_reset' } : {}),
    summary: {
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics,
    },
  };
}

function methodSignature(name: string, parameters: string): string {
  return `${name}(${parameters.replace(/\s+/g, ' ').trim()})`;
}

export function mameDeviceRomSet(
  mameSrc: string,
  sourceFile: string,
  className: string,
): string | undefined {
  const source = readFileSync(join(mameSrc, sourceFile), 'utf8');
  const method = parseMameAst([{ file: sourceFile, source }]).units
    .flatMap(unit => unit.functions)
    .find(candidate =>
      candidate.className === className && candidate.name === 'device_rom_region');
  const scoped = method && /\bROM_NAME\s*\(\s*(\w+)\s*\)/.exec(method.body)?.[1];
  if (scoped) return scoped;
  const fallback = new RegExp(
    `${className}::device_rom_region[\\s\\S]*?ROM_NAME\\s*\\(\\s*(\\w+)\\s*\\)`,
  ).exec(source);
  return fallback?.[1];
}

/**
 * MAME's short name for a device, from
 * `DEFINE_DEVICE_TYPE(NAMCO_54XX, namco_54xx_device, "namco54", "Namco 54xx")`.
 *
 * This is the name MAME searches the rompath for, so a device that owns ROMs
 * loads them from `<shortname>.zip` — namco54.zip, not the parent game's set.
 * MAME commonised these device ROMs precisely so one copy serves every board
 * that uses the part, and MAMEKIT has to look in the same place.
 */
export function mameDeviceShortName(
  mameSrc: string,
  sourceFile: string,
  className: string,
): string | undefined {
  const source = readFileSync(join(mameSrc, sourceFile), 'utf8');
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = new RegExp(
    `DEFINE_DEVICE_TYPE\\s*\\(\\s*\\w+\\s*,\\s*${escaped}\\s*,\\s*"([^"]+)"`,
  ).exec(source);
  return match?.[1];
}

function executionClockDivider(source: string): number | undefined {
  const match = /execute_cycles_to_clocks\s*\([^)]*\)[^{]*\{[^}]*return\s*\([^;]*\*\s*(\d+)\s*\)/s
    .exec(source);
  const divider = Number(match?.[1]);
  return Number.isInteger(divider) && divider > 0 ? divider : undefined;
}

function executionDataAddressBits(
  className: string,
  source: string,
  constants: Record<string, number>,
): number | undefined {
  const escaped = className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const constructor = new RegExp(
    `${escaped}::${escaped}\\s*\\([^)]*\\)\\s*:\\s*` +
    `mb88_cpu_device\\s*\\(([^)]*)\\)`,
    's',
  ).exec(source);
  if (!constructor) return undefined;
  const args = splitMameArgs(constructor[1]!);
  const width = Number(evalExpr(args.at(-1) ?? '', constants));
  return Number.isInteger(width) && width > 0 && width <= 16 ? width : undefined;
}

function localSourceFiles(mameSrc: string, sourceFile: string): string[] {
  const files: string[] = [];
  const seen = new Set<string>();
  const visit = (absolute: string): void => {
    if (!existsSync(absolute)) return;
    const file = relative(mameSrc, absolute);
    if (seen.has(file)) return;
    seen.add(file);
    files.push(file);

    const source = readFileSync(absolute, 'utf8');
    // A .cpp commonly includes the declarations for every sibling option it
    // registers. Following those would compile an entire bus when only one
    // class was requested. Base-class dependencies are expressed by headers,
    // so only headers extend the family closure.
    if (extname(absolute) !== '.h') return;
    for (const match of source.matchAll(/^\s*#include\s+"([^"]+)"/gm)) {
      // Follow headers that are part of the same device family. Includes
      // resolved through MAME's global include paths (screen.h, emu.h, etc.)
      // describe host services, not another source-defined base class.
      const included = join(dirname(absolute), match[1]!);
      if (!existsSync(included)) continue;
      visit(included);
      if (extname(included) === '.h') {
        visit(join(dirname(included), `${basename(included, '.h')}.cpp`));
      }
    }
  };

  const absolute = join(mameSrc, sourceFile);
  visit(absolute);
  visit(join(dirname(absolute), `${basename(absolute, extname(absolute))}.h`));
  return files;
}

/**
 * Map each template class in the hierarchy to the arguments its derived class
 * supplies, e.g. buffered_spriteram_device -> { Type: 'uint8_t' }.
 */
function resolveTemplateArguments(
  className: string,
  classes: Map<string, MameClass>,
): Map<string, Record<string, string>> {
  const resolved = new Map<string, Record<string, string>>();
  const visited = new Set<string>();
  const visit = (name: string): void => {
    if (visited.has(name)) return;
    visited.add(name);
    const declaration = classes.get(name);
    if (!declaration) return;
    for (const base of declaration.bases) {
      const args = declaration.baseTemplateArguments?.[base];
      const parameters = classes.get(base)?.templateParameters;
      if (args?.length && parameters?.length) {
        resolved.set(base, Object.fromEntries(
          parameters.map((parameter, index) => [parameter, args[index] ?? parameter]),
        ));
      }
      visit(base);
    }
  };
  visit(className);
  return resolved;
}

function specializeMethod(
  method: MameFunction,
  specialize: (className: string, text: string) => string,
): MameFunction {
  const parameters = specialize(method.className, method.parameters);
  const body = specialize(method.className, method.body);
  if (parameters === method.parameters && body === method.body) return method;
  return { ...method, parameters, body };
}

/**
 * Materialize the numeric function-template instances explicitly referenced
 * by MAME's own source (most commonly `FUNC(device::read<0>)` callbacks).
 * Handler IR already normalizes numeric template calls to `read_0`, so using
 * the same name here lets configuration and executable device code meet at a
 * source-derived entry point.
 */
function specializeFunctionTemplate(
  method: MameFunction,
  sources: readonly { file: string; source: string }[],
): MameFunction[] {
  const parameters = method.templateParameters ?? [];
  if (!parameters.length) return [method];
  const className = method.className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const methodName = method.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(
    `\\b${className}::${methodName}\\s*<([^<>]+)>`,
    'g',
  );
  const instances = new Map<string, string[]>();
  for (const { source } of sources) {
    for (const match of source.matchAll(pattern)) {
      const args = splitMameArgs(match[1]!).map(argument => argument.trim());
      if (args.length !== parameters.length || !args.every(arg => /^\d+$/.test(arg))) continue;
      instances.set(args.join('_'), args);
    }
  }
  return [...instances].map(([suffix, args]) => {
    let body = method.body;
    let methodParameters = method.parameters;
    parameters.forEach((parameter, index) => {
      const replacement = args[index]!;
      const pattern = new RegExp(`\\b${parameter}\\b`, 'g');
      body = body.replace(pattern, replacement);
      methodParameters = methodParameters.replace(pattern, replacement);
    });
    return {
      ...method,
      name: `${method.name}_${suffix}`,
      parameters: methodParameters,
      body,
      templateParameters: undefined,
    };
  });
}

function classHierarchy(
  className: string,
  classes: Map<string, MameClass>,
): string[] {
  const result: string[] = [];
  const visited = new Set<string>();
  const visit = (name: string): void => {
    if (visited.has(name)) return;
    visited.add(name);
    const declaration = classes.get(name);
    for (const base of declaration?.bases ?? []) {
      const unqualified = base.split('::').at(-1)!;
      if (classes.has(unqualified)) visit(unqualified);
    }
    if (declaration) result.push(name);
  };
  visit(className);
  return result;
}

function compileMethod(
  method: MameFunction,
  interruptCallbacks: { member: string; line: string; signal: string }[] = [],
  sourceTables: Record<string, ConstantTable> = {},
): GeneratedDeviceMethod {
  let body = method.body.replace(
    /\bm_\w+\s*=\s*std::make_unique\s*<[^;]+;\s*/g,
    '',
  );
  for (const callback of interruptCallbacks) {
    body = body.replace(
      new RegExp(
        `${callback.member}->set_input_line\\s*\\(\\s*${callback.line}\\s*,\\s*` +
        '([^;]+)\\)',
        'g',
      ),
      `m_${callback.signal}($1)`,
    );
  }
  const subscript = '((?:[^\\[\\]]|\\[[^\\]]*\\])*)';
  for (const [name, table] of Object.entries(sourceTables)) {
    // A table this method declares itself is a local, and the execution-source
    // normalizer folds those together with their declaration. Substituting
    // here as well leaves `static const double TABLE(...) = {...}` behind.
    if (new RegExp(`\\bstatic\\s+(?:const|constexpr)[^;{]*\\b${name}\\s*\\[`).test(body)) {
      continue;
    }
    body = table.columns === undefined
      ? body.replace(
          new RegExp(`\\b${name}\\s*\\[${subscript}\\]`, 'g'),
          (_entry, index: string) => `TABLE(${index}, ${table.values.join(', ')})`,
        )
      : body.replace(
          new RegExp(`\\b${name}\\s*\\[${subscript}\\]\\s*\\[${subscript}\\]`, 'g'),
          (_entry, row: string, column: string) =>
            `TABLE((${row}) * ${table.columns} + (${column}), ${table.values.join(', ')})`,
        );
  }
  return {
    name: method.name,
    parameters: method.parameters,
    program: compileMameHandler(normalizeMameExecutionSource(body)),
    source: {
      file: method.span.file,
      line: method.span.line,
      column: method.span.column,
    },
  };
}

function inlineMethods(declaration: MameClass): MameFunction[] {
  const methods: MameFunction[] = [];
  const source = declaration.body;
  const masked = source.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, match =>
    match.replace(/[^\r\n]/g, ' '));
  // MAME declares pointer-returning accessors as `Type *buffer()`, so the
  // sigils sit against the method name rather than the return type.
  const pattern =
    /(?:^|\n)\s*(?:template\s*<[^>{}]+>\s*)?(?:[\w:<>,~*&]+\s+)+[*&]*\s*(\w+)\s*\(([^;{}]*)\)\s*(?:const\s*)?(?:(?:override|final|noexcept)\s*)*\{/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(masked)) !== null) {
    const braceStart = masked.indexOf('{', match.index + match[0].length - 1);
    const braceEnd = matchingBrace(masked, braceStart);
    if (braceEnd < 0) continue;
    const absoluteStart = declaration.bodySpan.start + match.index;
    const bodyStart = declaration.bodySpan.start + braceStart + 1;
    const bodyEnd = declaration.bodySpan.start + braceEnd;
    const line = declaration.bodySpan.line + source.slice(0, match.index).split('\n').length - 1;
    const bodyLine = declaration.bodySpan.line + source.slice(0, braceStart + 1).split('\n').length - 1;
    methods.push({
      kind: 'function',
      className: declaration.name,
      name: match[1]!,
      parameters: source.slice(
        masked.indexOf('(', match.index) + 1,
        matchingPair(masked, masked.indexOf('(', match.index), '(', ')'),
      ),
      body: source.slice(braceStart + 1, braceEnd),
      statements: [],
      span: {
        file: declaration.span.file,
        start: absoluteStart,
        end: declaration.bodySpan.start + braceEnd + 1,
        line,
        column: 1,
        endLine: line + source.slice(match.index, braceEnd + 1).split('\n').length - 1,
        endColumn: 1,
      },
      bodySpan: {
        file: declaration.span.file,
        start: bodyStart,
        end: bodyEnd,
        line: bodyLine,
        column: 1,
        endLine: bodyLine + source.slice(braceStart + 1, braceEnd).split('\n').length - 1,
        endColumn: 1,
      },
    });
    pattern.lastIndex = braceEnd + 1;
  }
  return methods;
}

function memberDeclarations(
  declaration: MameClass,
): { name: string; valueType: string; arrayLength?: number }[] {
  const members: { name: string; valueType: string; arrayLength?: number }[] = [];
  // C++ commonly groups scalar members (`int m_base, m_mask;`). Treat every
  // declarator as its own field before the single-declarator patterns below.
  for (const match of declaration.body.matchAll(
    /^\s*((?:const\s+)?[\w:]+(?:\s+const)?)\s+(m_\w+(?:\s*,\s*m_\w+)+)\s*;/gm,
  )) {
    const valueType = match[1]!.replace(/\s+/g, ' ').trim();
    for (const name of match[2]!.split(',').map(value => value.trim())) {
      if (!members.some(member => member.name === name)) {
        members.push({ valueType, name });
      }
    }
  }
  // MAME's convention is `m_name`, but it is a convention, not a rule: the TIA
  // declares its whole register file and both scanline bitmaps unprefixed
  // (`uint8_t VSYNC;`, `bitmap_ind16 helper[2];`), and requiring the prefix left
  // that device with two members and no state at all. The shape is what makes a
  // data member -- a type, a name, an optional array bound, a semicolon -- so
  // the name pattern is a name.
  const patterns = [
    // `struct player_gfx p0gfx;` -- an elaborated type specifier is still a
    // data member, and the TIA declares both its sprite state that way. Without
    // this they were not members at all, which left the whole scanline
    // compositor unemittable and every 2600 frame in the interpreter.
    /^\s*(?:struct|union|enum)\s+([\w:]+)\s+(\w+)\s*(?:\[([^\]]+)\])?\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+(?:\s+const)?(?:::\w+<\d+>)?)\s+(\w+)\s*(?:\[([^\]]+)\])?\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+<[^;\r\n]+>)\s+(\w+)\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+(?:<[^;\r\n]+>)?)\s*(\*)\s*(\w+)\s*(?:\[([^\]]+)\])?\s*;/gm,
  ];
  for (const pattern of patterns) {
    for (const match of declaration.body.matchAll(pattern)) {
      // The last pattern captures the `*` of a pointer declaration in group 2,
      // so the member's name is one group further along. Keeping the star is
      // not cosmetic: `uint8_t *m_vrom` recorded as plain `uint8_t` told the
      // emitter that `m_vrom != nullptr` was an integer comparison, and
      // `Number(<128 KB Uint8Array>)` stringifies the whole CHR ROM before
      // answering NaN. MMC3 asks that question on every CHR bank switch, and
      // Super Mario Bros. 3 ran at 9 fps because of it.
      // The pointer pattern captures the `*` in group 2, so its name and array
      // bound each sit one group further along.
      const pointer = match[2] === '*';
      const star = pointer ? match[2] : undefined;
      const name = (pointer ? match[3] : match[2])!;
      const bound = pointer ? match[4] : match[3];
      if (members.some(member => member.name === name)) continue;
      const arrayLength = bound ? Number(bound.trim()) : undefined;
      members.push({
        valueType: `${match[1]!.replace(/\s+/g, ' ').trim()}${star ?? ''}`,
        name,
        ...(Number.isInteger(arrayLength) && arrayLength! > 0 ? { arrayLength } : {}),
      });
    }
  }
  return members;
}

function finderBinding(
  valueType: string,
  name: string,
  constructorBindings: Record<string, string[]>,
): GeneratedDeviceMember['finder'] {
  const kind = valueType === 'required_ioport' || valueType === 'optional_ioport'
    ? 'input'
    : /^(?:required|optional)_device(?:_array)?</.test(valueType)
      ? 'device'
      : undefined;
  if (!kind) return undefined;
  const target = constructorBindings[name]?.at(-1);
  const tag = target && unquoteToken(target);
  return { kind, tag: tag ?? '' };
}

/**
 * Classify a MAME memory container member. required/optional_shared_ptr aliases
 * a board memory share; std::vector is device-owned storage sized at start.
 */
function memoryContainer(
  valueType: string,
  name: string,
  constructorBindings: Record<string, string[]>,
): GeneratedDeviceMember['memory'] {
  const container = /^(?:required|optional)_shared_ptr<([\w:]+)>$/.exec(valueType) ??
    /^std::vector<([\w:]+)>$/.exec(valueType);
  if (!container) return undefined;
  const elementBytes = (integerBits(container[1]!) ?? 8) / 8;
  if (valueType.startsWith('std::vector')) return { kind: 'owned', elementBytes };
  // required_shared_ptr(*this, DEVICE_SELF) binds the device's own tag.
  const args = constructorBindings[name] ?? [];
  const target = args.at(-1) ?? '';
  return {
    kind: 'shared',
    elementBytes,
    share: target === 'DEVICE_SELF' ? 'self' : unquoteToken(target) ?? 'self',
  };
}

function unquoteToken(value: string): string | undefined {
  return /^"([^"]*)"$/.exec(value.trim())?.[1];
}

/** Constructor member-initializer argument lists, e.g. m_x(*this, "tag"). */
function memberConstructorBindings(source: string): Record<string, string[]> {
  const bindings: Record<string, string[]> = {};
  for (const match of source.matchAll(/[,:]\s*(m_\w+)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
    bindings[match[1]!] ??= splitMameArgs(match[2]!).map(argument => argument.trim());
  }
  return bindings;
}

function callbackSlots(valueType: string): number {
  return Number(/::array<(\d+)>/.exec(valueType)?.[1] ?? 1);
}

function integerBits(valueType: string): 1 | 8 | 16 | 32 | undefined {
  const normalized = valueType.replace(/\bconst\b/g, '').trim();
  if (normalized === 'bool') return 1;
  if (['u8', 's8', 'uint8_t', 'int8_t', 'char'].includes(normalized)) return 8;
  if (['u16', 's16', 'uint16_t', 'int16_t'].includes(normalized)) return 16;
  if (['u32', 's32', 'uint32_t', 'int32_t', 'int', 'unsigned'].includes(normalized)) return 32;
  return undefined;
}

function integerSigned(valueType: string): boolean {
  const normalized = valueType.replace(/\bconst\b/g, '').trim();
  return ['s8', 'int8_t', 'char', 's16', 'int16_t', 's32', 'int32_t', 'int'].includes(normalized);
}

interface Constructor {
  className: string;
  parameters: string[];
  initializers: { name: string; args: string[] }[];
  body: string;
}

export function constructorInitialValues(
  concreteClass: string,
  source: string,
  constants: Record<string, number> = {},
): Record<string, number> {
  const constructors = new Map<string, Constructor[]>();
  const pattern = /\b(\w+)::\1\s*\(/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(source)) !== null) {
    const open = source.indexOf('(', match.index);
    const close = matchingPair(source, open, '(', ')');
    if (close < 0) continue;
    const brace = source.indexOf('{', close + 1);
    if (brace < 0) continue;
    const braceEnd = matchingBrace(source, brace);
    if (braceEnd < 0) continue;
    const between = source.slice(close + 1, brace).trim();
    const initializerSource = (between.startsWith(':') ? between.slice(1) : '')
      .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
    const constructor: Constructor = {
      className: match[1]!,
      parameters: splitMameArgs(source.slice(open + 1, close)).map(parameterName),
      initializers: splitMameArgs(initializerSource).flatMap(initializer => {
        const parsed = /^(\w+)\s*\(([\s\S]*)\)$/.exec(initializer.trim());
        return parsed ? [{ name: parsed[1]!, args: splitMameArgs(parsed[2]!) }] : [];
      }),
      body: source.slice(brace + 1, braceEnd),
    };
    const overloads = constructors.get(match[1]!) ?? [];
    overloads.push(constructor);
    constructors.set(match[1]!, overloads);
    pattern.lastIndex = brace + 1;
  }
  const result: Record<string, number> = {};
  const activeConstructors = new Set<string>();
  const visit = (className: string, values: number[] = []): void => {
    const overloads = constructors.get(className) ?? [];
    const constructor = overloads.find(candidate =>
      values.length > 0 && candidate.parameters.length === values.length) ??
      [...overloads].sort((left, right) =>
        left.parameters.length - right.parameters.length)[0];
    if (!constructor) return;
    const activeKey = `${className}/${constructor.parameters.length}`;
    if (activeConstructors.has(activeKey)) return;
    activeConstructors.add(activeKey);
    const env = Object.fromEntries(
      constructor.parameters.map((parameter, index) => [parameter, values[index] ?? 0]),
    );
    for (const initializer of constructor.initializers) {
      const args = initializer.args.map(arg =>
        constantValue(arg, { ...constants, ...env }) ?? 0);
      if (constructors.has(initializer.name)) visit(initializer.name, args);
      else if (initializer.name.startsWith('m_') && args.length === 1) {
        result[initializer.name] = args[0]!;
      }
    }
    for (const assignment of constructor.body.matchAll(/\b(m_\w+)\s*=\s*([^;]+);/g)) {
      const value = constantValue(assignment[2]!, { ...constants, ...env });
      if (value !== undefined && Number.isFinite(value)) result[assignment[1]!] = value;
    }
    activeConstructors.delete(activeKey);
  };
  visit(concreteClass);
  return result;
}

function parameterName(parameter: string): string {
  return /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.trim())?.[1] ?? parameter.trim();
}

function constantValue(expression: string, env: Record<string, number>): number | undefined {
  const value = expression.trim();
  if (value === 'true') return 1;
  if (value === 'false' || value === 'nullptr') return 0;
  if (env[value] !== undefined) return env[value];
  if (/^0x[\da-f]+$/i.test(value)) return Number.parseInt(value, 16);
  if (/^-?\d+$/.test(value)) return Number(value);
  return evalExpr(value, env) ?? undefined;
}

/**
 * MAME's `line_state` enum, which every device that drives an interrupt line
 * refers to but no device header declares.
 *
 * `numericConstants` only sees a device's own sources, so `ASSERT_LINE` and
 * `CLEAR_LINE` resolved to nothing and the lowered program read them as zero.
 * A device could then only ever clear its line: venture's 6532 called
 * `m_irq_cb(ASSERT_LINE)` 866,442 times, every one of them a zero, so the
 * audio IRQ never rose, the sound CPU never ran its service routine and the
 * board was silent. Six generated devices refer to these, including pia6821
 * and the Namco 5x/6x family.
 *
 * Read from MAME rather than written here, so the values stay the source's.
 */
function coreLineStates(mameSrc: string): Record<string, number> {
  const header = join(mameSrc, 'src/emu/diexec.h');
  if (!existsSync(header)) return {};
  const body = /enum\s+line_state\s*\{([^}]*)\}/.exec(readFileSync(header, 'utf8'))?.[1];
  if (!body) return {};
  const states: Record<string, number> = {};
  let next = 0;
  for (const entry of body.split(',')) {
    const match = /^\s*(\w+)\s*(?:=\s*(-?\d+))?/.exec(entry.replace(/\/\/.*$/gm, ''));
    if (!match) continue;
    next = match[2] === undefined ? next : Number(match[2]);
    states[match[1]!] = next++;
  }
  return states;
}

/**
 * MAME's address-space indices (`AS_PROGRAM`, `AS_DATA`, ...), read from the
 * emulator core rather than restated here. A device names them when it asks
 * for one of its own spaces: `space(AS_DATA)`.
 */
function coreAddressSpaces(mameSrc: string): Record<string, number> {
  const header = join(mameSrc, 'src/emu/emumem.h');
  if (!existsSync(header)) return {};
  const spaces: Record<string, number> = {};
  for (const match of readFileSync(header, 'utf8').matchAll(
    /^\s*constexpr\s+int\s+(AS_\w+)\s*=\s*(-?\d+)\s*;/gm,
  )) {
    spaces[match[1]!] = Number(match[2]);
  }
  return spaces;
}

function numericConstants(source: string): Record<string, number> {
  const expressions = new Map<string, string>();
  for (const match of source.matchAll(/^\s*#define\s+(\w+)\s+([^\r\n/]+)/gmi)) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  for (const match of source.matchAll(
    /\b(?:static\s+)?constexpr\s+(?:\w+\s+)+(\w+)\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  // Non-integral and pre-C++17 static class constants are commonly declared
  // in the header and defined in the implementation file. The unqualified
  // member name is what source-compiled methods reference.
  for (const match of source.matchAll(
    /\bconst\s+(?:\w+\s+)+\w+::(\w+)\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  for (const declaration of source.matchAll(/\benum(?:\s+\w+)?\s*\{([^{}]+)\}/g)) {
    let previous: string | undefined;
    for (const raw of splitMameArgs(declaration[1]!)) {
      const entry = raw.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '').trim();
      if (!entry) continue;
      const match = /^(\w+)(?:\s*=\s*([\s\S]+))?$/.exec(entry);
      if (!match) continue;
      const expression = match[2]?.trim() ?? (previous ? `${previous} + 1` : '0');
      expressions.set(match[1]!, expression);
      previous = match[1]!;
    }
  }
  const constants: Record<string, number> = {};
  for (let pass = 0; pass <= expressions.size; pass++) {
    for (const [name, expression] of expressions) {
      if (constants[name] !== undefined) continue;
      const substituted = expression.replace(
        /\b[A-Za-z_]\w*\b/g,
        token => constants[token] !== undefined ? String(constants[token]) : token,
      );
      const value = evalExpr(substituted, constants);
      if (value !== null && Number.isFinite(value)) constants[name] = value;
    }
  }
  return constants;
}

function allocatedMemberArrays(
  source: string,
  constants: Record<string, number>,
): Map<string, number[]> {
  const arrays = new Map<string, number[]>();
  for (const allocation of source.matchAll(
    /\b(m_\w+)\s*=\s*std::make_unique\s*<[^>]*\[\]>\s*\(([^)]+)\)\s*;/g,
  )) {
    const count = evalExpr(allocation[2]!.trim(), constants);
    if (count === null || !Number.isInteger(count) || count <= 0) continue;
    const fill = new RegExp(
      `std::fill_n\\s*\\(\\s*&${allocation[1]}\\[0\\]\\s*,\\s*` +
      `[^,]+,\\s*([^\\)]+)\\)`,
    ).exec(source);
    const initial = fill ? evalExpr(fill[1]!.trim(), constants) : 0;
    arrays.set(
      allocation[1]!,
      Array.from({ length: count }, () => initial ?? 0),
    );
  }
  return arrays;
}

function fixedMemberArrays(
  source: string,
  constants: Record<string, number>,
): Map<string, number[]> {
  const arrays = new Map<string, number[]>();
  for (const declaration of source.matchAll(
    /^\s*(?:const\s+)?[\w:]+\s*\*?\s*(m_\w+)\s*\[([^\]]+)\]\s*;/gm,
  )) {
    const count = evalExpr(declaration[2]!.trim(), constants);
    if (count === null || !Number.isInteger(count) || count <= 0) continue;
    arrays.set(declaration[1]!, Array.from({ length: count }, () => 0));
  }
  return arrays;
}

/**
 * File-scope `static const` lookup table, flattened row-major.
 *
 * `columns` is set for a two-dimensional declaration, which is how MAME
 * spells a chained-sprite tile order (tecmo_spr.cpp's `layout[8][8]`); the
 * substitution then folds `t[row][column]` into one flat index.
 */
interface ConstantTable {
  values: string[];
  columns?: number;
}

function constantTables(source: string): Record<string, ConstantTable> {
  const tables: Record<string, ConstantTable> = {};
  for (const match of source.matchAll(
    /\bstatic\s+const\s+\w+\s+(\w+)\s*\[\s*(\d+)\s*\]\s*\[\s*(\d+)\s*\]\s*=\s*\{([\s\S]*?)\}\s*;/g,
  )) {
    const columns = Number(match[3]);
    const values = [...match[4]!.matchAll(/\{([^{}]*)\}/g)]
      .flatMap(row => splitMameArgs(row[1]!).map(value => value.trim()).filter(Boolean));
    if (values.length !== Number(match[2]) * columns) continue;
    tables[match[1]!] = { values, columns };
  }
  for (const match of source.matchAll(
    /\bstatic\s+const\s+\w+\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]+)\}\s*;/g,
  )) {
    tables[match[1]!] = {
      values: splitMameArgs(match[2]!).map(value => value.trim()),
    };
  }
  return tables;
}

function matchingBrace(source: string, open: number): number {
  return matchingPair(source, open, '{', '}');
}

function matchingPair(source: string, open: number, left: string, right: string): number {
  let depth = 0;
  for (let index = open; index < source.length; index++) {
    if (source[index] === left) depth++;
    else if (source[index] === right && --depth === 0) return index;
  }
  return -1;
}

/**
 * Address spaces the device declares for itself, when the space is plain RAM.
 *
 * The declaration is split across three places in MAME source: the
 * `address_space_config` member is constructed in the initializer list with
 * its width and its map, `memory_space_config()` says which space index it
 * answers for, and the named map says what is in it. A space is recorded only
 * when that map is a single `.ram()` covering the whole address range -- the
 * shape a display memory has. A device whose map decodes anything else gets no
 * space here, so the runtime reports it missing instead of backing a bus with
 * a flat buffer.
 */
function deviceAddressSpaces(
  className: string,
  hierarchy: readonly string[],
  source: string,
  constants: Record<string, number>,
  methodBodies: ReadonlyMap<string, string>,
): NonNullable<GeneratedDeviceDefinition['spaces']> {
  const spaces: NonNullable<GeneratedDeviceDefinition['spaces']> = [];
  const configs = new Map<string, { name: string; dataBits: number; addressBits: number; map: string }>();
  for (const owner of hierarchy) {
    const escaped = owner.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const match of source.matchAll(new RegExp(
      `(m_\\w*space_config\\w*)\\s*\\(\\s*"([^"]*)"\\s*,\\s*ENDIANNESS_\\w+\\s*,` +
      `\\s*([^,]+),\\s*([^,]+),\\s*([^,]+),\\s*address_map_constructor\\s*\\(\\s*FUNC\\s*\\(\\s*${escaped}::(\\w+)`,
      'g',
    ))) {
      const dataBits = evalExpr(match[3]!.trim(), constants);
      const addressBits = evalExpr(match[4]!.trim(), constants);
      if (!Number.isInteger(dataBits) || !Number.isInteger(addressBits)) continue;
      configs.set(match[1]!, {
        name: match[2]!,
        dataBits: Number(dataBits),
        addressBits: Number(addressBits),
        map: match[6]!,
      });
    }
  }
  if (!configs.size) return spaces;
  const vector = methodBodies.get('memory_space_config');
  if (vector === undefined) return spaces;
  for (const pair of vector.matchAll(
    /std::make_pair\s*\(\s*(\w+)\s*,\s*&\s*(m_\w+)\s*\)/g,
  )) {
    const index = Number(constants[pair[1]!]);
    const config = configs.get(pair[2]!);
    if (config === undefined || !Number.isInteger(index)) continue;
    const map = methodBodies.get(config.map);
    if (map === undefined) continue;
    // The whole range, as RAM, and nothing else -- `has_configured_map` guards
    // are MAME asking whether the owner supplied a map instead, which the
    // driver here does not.
    const statements = [...map.matchAll(/\bmap\s*\(([^)]*)\)\s*\.\s*(\w+)\s*\(\s*\)/g)];
    if (statements.length !== 1 || statements[0]![2] !== 'ram') continue;
    const [start, end] = splitMameArgs(statements[0]![1]!)
      .map(value => Number(evalExpr(value.trim(), constants)));
    if (start !== 0 || end !== (1 << config.addressBits) - 1) continue;
    spaces.push({
      index,
      name: config.name,
      addressBits: config.addressBits,
      dataBits: config.dataBits,
      ram: true,
    });
  }
  return spaces;
}
