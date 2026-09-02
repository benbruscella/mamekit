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
import { walkExpressions } from '../ir/walk.ts';
import {
  collectFunctionMacros,
  collectMemberAliasMacros,
  expandFunctionMacros,
  expandMemberAliasMacros,
  type FunctionMacro,
  type MemberAliasMacro,
} from './preprocessor.ts';
import { indexMameHardware, type MameHardwareDefinition } from './hardware.ts';

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
  /** Every declarator bound of a multi-dimensional C array member. */
  arrayShape?: number[];
  /**
   * Fields of a member whose type is a struct the device declares.
   *
   * Without a shape the host leaves the member a number and every field access
   * reads nothing: the TIA hands both its sprite states to one shared draw
   * routine as `&p0gfx`, and a numeric stand-in drew no players or missiles at
   * all.
   */
  fields?: GeneratedStructField[];
}

/**
 * One field of a struct-shaped member.
 *
 * `fields` makes it recursive, because MAME nests: the Game Boy's PPU keeps
 * its per-line state in an anonymous struct that itself holds an array of
 * anonymous sprite structs.
 */
export interface GeneratedStructField {
  name: string;
  length?: number;
  bits?: 8 | 16 | 32;
  signed?: boolean;
  fields?: GeneratedStructField[];
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
    /**
     * How a mounted card installs itself into the CPU's address space.
     *
     * Two cartridge buses ask for this differently and MAME is the authority
     * on which: the Atari 2600's interface takes the space as an argument
     * (`install_memory_handlers(address_space *)`), while the Game Boy's
     * `load(message)` reaches for it through `cart_space()`. `space` names the
     * card's own accessor when it is not a parameter.
     */
    install?: { method: string; space?: string };
    options: Record<string, GeneratedDeviceDefinition>;
  };
  /** Runtime resources and power-on calls derived by a capability compiler. */
  resources?: {
    members?: Record<string, GeneratedDeviceResource>;
    /**
     * Host calls answering a resource, for hardware that reaches its own
     * storage through an accessor rather than a member. Every Game Boy
     * cartridge PCB asks its slot for `cart_rom_region()`.
     */
    calls?: Record<string, GeneratedDeviceResource>;
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
  /**
   * Devices this one instantiates in `device_add_mconfig`, by the member that
   * finds them. MAME builds a device out of other devices as readily as a
   * board does -- Pitfall II's cartridge is an F8 board plus an ATARI_DPC
   * coprocessor -- and a `required_device` member that resolves to nothing
   * makes every call through it silently answer zero.
   */
  children?: {
    member: string;
    type: string;
    definition: GeneratedDeviceDefinition;
  }[];
  summary: {
    methods: number;
    compiledMethods: number;
    diagnostics: number;
  };
}

export type GeneratedDeviceResource =
  | { kind: 'number'; value: number }
  | { kind: 'region'; name: string }
  // MAME's `memory_region *`: the bytes plus the size questions asked of them.
  | { kind: 'region-object'; name: string }
  // A pointer part-way into a region, as MAME writes `get_rom_base() + N`.
  | { kind: 'region-pointer'; name: string; offset: number }
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
  /** Types already being compiled, so a device cycle cannot recurse forever. */
  compiling: ReadonlySet<string> = new Set(),
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
    // A class-scoped constant belongs to its class, not to the file. MAME
    // declares `PAGE_ROM_SIZE` five times in one cartridge header -- 0x4000
    // for the paged MBCs, 0x2000 and 0x8000 for others -- and flattening them
    // left every board using whichever came last: an MBC1 banked in 32 KiB
    // steps and read the wrong half of its own ROM. Layered base-first, so a
    // derived class still overrides what it inherits.
    ...hierarchy.map(className =>
      numericConstants(classes.get(className)?.body ?? '')),
  );
  // Struct shapes for members whose type is one the device declares.
  const structFields = structDeclarations(sources, constants);
  const sourceTables = Object.assign(
    {},
    ...sources.map(({ source }) => constantTables(source)),
  );
  // Statement macros the device's own sources define. These have to be
  // substituted textually: their bodies read and assign the caller's locals,
  // which no call can do.
  const functionMacros = sources.flatMap(({ source }) => collectFunctionMacros(source));
  // Object-like `#define`s that name a register inside the device's own state
  // (`#define CURLINE m_vid_regs[0x04]`). The name stands for nothing but the
  // subscript, so it has to become the subscript before lowering.
  const memberAliases = sources.flatMap(({ source }) => collectMemberAliasMacros(source));
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
  /**
   * `base_class::method(...)` as it appears inside a method *body*.
   *
   * Not in the source text at large, because that is also how MAME spells an
   * out-of-class definition -- counting those would give every device a
   * duplicate of half its methods.
   */
  const explicitBaseCalls = new Set(
    ast.units
      .flatMap(unit => unit.functions)
      .flatMap(fn => [...fn.body.matchAll(/\b(\w+::\w+)\s*(?:<[^<>()]*>)?\s*\(/g)])
      .map(match => match[1]!),
  );
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
    const compiled = compileMethod(
      specialized, interruptCallbacks, sourceTables, functionMacros, memberAliases);
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
      // A base method the source calls explicitly by name, where no derived
      // override made an alias for it above. An *overload* is the case that
      // needs this: `mbc5_device_base::install_memory(message)` forwards to
      // `rom_mbc_device_base::install_memory(message, 4, 9)`, and the two
      // differ in arity, so neither replaces the other and the qualified name
      // was never registered -- the forward reached nothing, and every MBC5
      // cartridge installed its bank-switch writes over no ROM at all.
      const qualified = `${specialized.className}::${specialized.name}`;
      if (
        explicitBaseCalls.has(qualified) &&
        !methods.some(candidate => candidate.name === qualified)
      ) {
        methods.push({ ...compiled, name: qualified });
      }
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

  // File-scope helpers the device's own methods call. They belong to no class,
  // so the hierarchy walk above never reaches them, and an unresolved call
  // answers zero rather than failing: `convert_output` in gb.cpp turns a
  // channel's signal into its output level, and without it the Game Boy
  // mixed four channels of silence however loud the game set the envelopes.
  // Only helpers something already collected actually calls -- a device source
  // shares a translation unit with its neighbours, and the rest are theirs.
  const collectedBodies = [...methodBodies.values()].join('\n');
  for (const helper of sourceMethods) {
    if (helper.className !== '') continue;
    if (methods.some(candidate => candidate.name === helper.name)) continue;
    if (!new RegExp(`\\b${helper.name}\\s*\\(`).test(collectedBodies)) continue;
    replaceOrAppend(helper);
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
        ...(member.arrayShape ? { arrayShape: member.arrayShape } : {}),
        ...(structFields.get(member.valueType.replace(/\*$/, '').trim())
          ? { fields: structFields.get(member.valueType.replace(/\*$/, '').trim()) }
          : {}),
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

  // Devices this one builds out of other devices. MAME writes them as
  // `TYPE(config, m_member)` inside device_add_mconfig -- a method that is not
  // executable behaviour, which is why it is ignored for lowering, but it is
  // where the device says what it is made of.
  const children: NonNullable<GeneratedDeviceDefinition['children']> = [];
  const mconfig = methodBodies.get('device_add_mconfig');
  if (mconfig) {
    const nested = new Set([...compiling, type]);
    const known = indexMameHardware(mameSrc);
    for (const match of mconfig.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\(\s*config\s*,\s*(m_\w+)/g)) {
      const [, childType, member] = match;
      if (!childType || !member || nested.has(childType)) continue;
      const childDefinition = known.get(childType);
      if (!childDefinition) continue;
      const child = compileMameDevice(mameSrc, childDefinition, childType, nested);
      if (child.summary.diagnostics) continue;
      children.push({ member, type: childType, definition: child });
    }
  }
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
  resolveInheritedBaseCalls(methods, hierarchy);
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
    ...(children.length ? { children } : {}),
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
    //
    // The one exception is `.ipp`, which in MAME means exactly "the inline
    // bodies of a base class". A device declared entirely inside a .cpp -- the
    // shape every Game Boy cartridge PCB uses -- reaches its bases only that
    // way, and without it an MBC compiled with none of the bank-switching it
    // inherits: a PCB that registers and does nothing.
    const family = ['.h', '.ipp'].includes(extname(absolute));
    for (const match of source.matchAll(/^\s*#include\s+"([^"]+)"/gm)) {
      if (!family && extname(match[1]!) !== '.ipp') continue;
      // Follow headers that are part of the same device family. Includes
      // resolved through MAME's global include paths (screen.h, emu.h, etc.)
      // describe host services, not another source-defined base class.
      //
      // `src/devices` is the one global root worth resolving, because MAME's
      // shared bus interfaces live there and a device really does inherit from
      // them: every Game Boy cartridge decodes its own ROM through
      // `device_generic_cart_interface::install_non_power_of_two`, included as
      // "bus/generic/slot.h" and reachable no other way.
      const included = [
        join(dirname(absolute), match[1]!),
        join(mameSrc, 'src/devices', match[1]!),
      ].find(candidate => existsSync(candidate));
      if (!included) continue;
      visit(included);
      // An .ipp carries the templates; the plain header beside it carries the
      // class declarations they belong to, and the .cpp the non-template
      // bodies. MAME splits a base class across all three.
      const stem = extname(included) === '.ipp'
        ? join(dirname(included), `${basename(included, '.ipp')}.h`)
        : included;
      if (extname(included) === '.ipp') visit(stem);
      if (extname(stem) === '.h') {
        visit(join(dirname(stem), `${basename(stem, '.h')}.cpp`));
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
  // A template with no fully numeric instantiation is still executable code,
  // and dropping it silently loses the method. What its type parameters mean
  // is nothing the untyped IR carries, so they become `auto`: `T(mask)` is a
  // conversion, and left as a call of an undeclared name it answered a
  // reference -- which is how every Game Boy MBC ended up with a bank mask
  // that was not a number, and never banked at all.
  if (!instances.size) {
    const typeParameters = numericTemplateArguments(method, sources);
    let body = method.body;
    let methodParameters = method.parameters;
    for (const parameter of parameters) {
      const supplied = typeParameters.get(parameter);
      const replacement = supplied ?? 'auto';
      const pattern = new RegExp(`\\b${parameter}\\b`, 'g');
      body = body.replace(pattern, replacement);
      methodParameters = methodParameters.replace(pattern, replacement);
    }
    return [{ ...method, parameters: methodParameters, body, templateParameters: undefined }];
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

/**
 * Numeric template arguments MAME's own call sites supply, by parameter name.
 *
 * A partial instantiation is the usual case for a helper written
 * `template <unsigned Shift, typename T>`: every caller writes `<0>` and lets
 * `T` be deduced. The constant is real behaviour -- it is the bus width the
 * decode shifts by -- while the type is not, so only the constant is bound.
 * A parameter more than one call site disagrees about is left unbound rather
 * than guessed at.
 */
function numericTemplateArguments(
  method: MameFunction,
  sources: readonly { file: string; source: string }[],
): Map<string, string> {
  const parameters = method.templateParameters ?? [];
  const methodName = method.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`\\b${methodName}\\s*<([^<>]+)>\\s*\\(`, 'g');
  const supplied = new Map<string, string>();
  const conflicting = new Set<string>();
  for (const { source } of sources) {
    for (const match of source.matchAll(pattern)) {
      const args = splitMameArgs(match[1]!).map(argument => argument.trim());
      args.forEach((argument, index) => {
        const parameter = parameters[index];
        if (!parameter || !/^\d+$/.test(argument)) return;
        const previous = supplied.get(parameter);
        if (previous !== undefined && previous !== argument) conflicting.add(parameter);
        supplied.set(parameter, argument);
      });
    }
  }
  for (const parameter of conflicting) supplied.delete(parameter);
  return supplied;
}

/**
 * Point an explicit base call at the class that actually defines the method.
 *
 * C++ resolves `mbc_ram_device_base<Base>::set_bank_rom_fine(x)` by looking
 * up the hierarchy from that class: `mbc_ram_device_base` declares no such
 * method, so the call lands on the base it inherits it from. Left unresolved
 * the call named a method that does not exist and answered nothing -- which
 * is how an MBC1 came out of reset with its high ROM window on page 0 and
 * every cartridge over 32 KiB read its first page twice.
 *
 * Only calls that resolve to nothing are rewritten, and only ever downwards
 * through the hierarchy, so an override is never bypassed.
 */
function resolveInheritedBaseCalls(
  methods: GeneratedDeviceMethod[],
  hierarchy: readonly string[],
): void {
  const defined = new Set(methods.map(method => method.name));
  const rewrites = new Map<string, string>();
  for (const method of methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier') return;
      const name = expression.callee.name;
      if (defined.has(name) || rewrites.has(name)) return;
      const [owner, called] = name.split('::');
      if (!owner || !called || name.split('::').length !== 2) return;
      const index = hierarchy.indexOf(owner);
      if (index < 0) return;
      for (let base = index - 1; base >= 0; base--) {
        const inherited = `${hierarchy[base]}::${called}`;
        if (defined.has(inherited)) {
          rewrites.set(name, inherited);
          return;
        }
      }
    });
  }
  if (!rewrites.size) return;
  for (const method of methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier') return;
      const target = rewrites.get(expression.callee.name);
      if (target) expression.callee = { kind: 'identifier', name: target };
    });
  }
}

function classHierarchy(
  className: string,
  classes: Map<string, MameClass>,
): string[] {
  const templateArguments = resolveTemplateArguments(className, classes);
  const result: string[] = [];
  const visited = new Set<string>();
  const visit = (name: string): void => {
    if (visited.has(name)) return;
    visited.add(name);
    const declaration = classes.get(name);
    for (const base of declaration?.bases ?? []) {
      // `class mbc_ram_device_base : public Base` inherits from whatever its
      // subclass instantiated it with. Stopping at the parameter name loses
      // the whole other half of the family: every Game Boy MBC gets its RAM
      // banking from the template and its ROM banking from the argument, and
      // one without the other is a cartridge that cannot reach its own code.
      const argument = templateArguments.get(name)?.[base];
      const unqualified = (argument ?? base).split('::').at(-1)!;
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
  functionMacros: readonly FunctionMacro[] = [],
  memberAliases: readonly MemberAliasMacro[] = [],
): GeneratedDeviceMethod {
  let body = expandMemberAliasMacros(
    expandFunctionMacros(method.body, functionMacros),
    memberAliases,
  ).replace(
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
    // The template header this method declares for itself. Without it the
    // specializer cannot tell a compile-time constant from a type, and the
    // same method arrives twice -- once substituted through the AST's own
    // inline pass and once raw through this one -- with the raw copy last and
    // therefore selected.
    const templateParameters = (/template\s*<([^<>]*)>/.exec(match[0])?.[1] ?? '')
      .split(',')
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1] ?? '')
      .filter(Boolean);
    methods.push({
      kind: 'function',
      className: declaration.name,
      name: match[1]!,
      ...(templateParameters.length ? { templateParameters } : {}),
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

export function memberDeclarations(
  declaration: MameClass,
): { name: string; valueType: string; arrayLength?: number; arrayShape?: number[] }[] {
  const members: {
    name: string; valueType: string; arrayLength?: number; arrayShape?: number[];
  }[] = [];
  // A member declared by an anonymous struct: `struct { bool on; ... }
  // m_snd_control;`. The block has no type name, so the member's own name is
  // the shape's key -- structDeclarations records it under the same one.
  for (const block of structBlocks(declaration.body)) {
    // Only an anonymous struct declares a member here; a named one is a type,
    // and its members are picked up by the ordinary patterns below.
    const name = block.declarator;
    if (!name || block.name !== name || members.some(member => member.name === name)) continue;
    members.push({ valueType: name, name });
  }
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
  // Every pattern admits an in-class initializer before the semicolon.
  // Modern MAME declares members `uint8_t m_gb_io[0x10]{};` and
  // `uint16_t m_divcount = 0;`, and requiring the semicolon to follow the
  // declarator directly meant the whole Game Boy driver state read as *no
  // members at all* -- so nothing recorded that TIMECNT is eight bits wide,
  // it counted past 255 forever, and the timer interrupt that drives the
  // console's music never fired.
  const patterns = [
    // `struct player_gfx p0gfx;` -- an elaborated type specifier is still a
    // data member, and the TIA declares both its sprite state that way. Without
    // this they were not members at all, which left the whole scanline
    // compositor unemittable and every 2600 frame in the interpreter.
    /^\s*(?:struct|union|enum)\s+([\w:]+)\s+(\w+)\s*(?:\[([^\]]+)\])?(?:\s*\[[^\]]+\])*(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+(?:\s+const)?(?:::\w+<\d+>)?)\s+(\w+)\s*(?:\[([^\]]+)\])?(?:\s*\[[^\]]+\])*(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+<[^;\r\n]+>)\s+(\w+)(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+(?:<[^;\r\n]+>)?)\s*(\*)\s*(\w+)\s*(?:\[([^\]]+)\])?(?:\s*\[[^\]]+\])*(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
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
      const valueType = `${match[1]!.replace(/\s+/g, ' ').trim()}${star ?? ''}`;
      // MAME's array creators carry their count as a template argument rather
      // than a declarator bound: `memory_bank_array_creator<2> m_bank_rom`.
      // Read as one object, `m_bank_rom[0]` indexed nothing -- and both of an
      // MBC's ROM windows lost the bank behind them.
      const templateCount = /_array_creator\s*<\s*(\d+)\s*>/.exec(valueType)?.[1];
      const arrayLength = bound
        ? Number(bound.trim())
        : templateCount ? Number(templateCount) : undefined;
      // `uint8_t m_wave_ram[2][0x10];` -- a C array member may have more than
      // one bound, and only the outermost is the declarator the runtime
      // allocates from. The inner extents have to travel with it or the second
      // subscript indexes a number: the Game Boy APU's wave channel read its
      // whole waveform out of nothing.
      const shape = [...match[0].matchAll(/\[([^\]]+)\]/g)]
        .map(extent => Number(evalExpr(extent[1]!.trim(), {}) ?? Number.NaN))
        .filter(extent => Number.isInteger(extent) && extent > 0);
      members.push({
        valueType,
        name,
        ...(Number.isInteger(arrayLength) && arrayLength! > 0 ? { arrayLength } : {}),
        ...(shape.length > 1 ? { arrayShape: shape } : {}),
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

export function integerBits(valueType: string): 1 | 8 | 16 | 32 | undefined {
  const normalized = valueType.replace(/\bconst\b/g, '').trim();
  if (normalized === 'bool') return 1;
  if (['u8', 's8', 'uint8_t', 'int8_t', 'char'].includes(normalized)) return 8;
  if (['u16', 's16', 'uint16_t', 'int16_t'].includes(normalized)) return 16;
  if (['u32', 's32', 'uint32_t', 'int32_t', 'int', 'unsigned'].includes(normalized)) return 32;
  return undefined;
}

export function integerSigned(valueType: string): boolean {
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
  // A pre-C++17 in-class constant is spelled `static const`, not `constexpr`.
  // MAME's Game Boy APU declares its frame-sequencer period that way, and
  // unresolved it made every `cycles / FRAME_CYCLES` in the sequencer
  // meaningless. `static` is required so a local `const int` inside a method
  // body is never hoisted into the device's shared scope.
  for (const match of source.matchAll(
    /\bstatic\s+const\s+(?:\w+\s+)+(\w+)\s*=\s*([^;]+);/g,
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
  // A class's static table is declared in the header and defined out of line,
  // qualified and without `static`: `const int gameboy_sound_device::
  // wave_duty_table[4] = {...}`. Methods reference the unqualified name, and
  // missing the definition left the Game Boy's square channels reading their
  // duty waveform out of nothing at all.
  for (const match of source.matchAll(
    /\bconst\s+(?:\w+\s+)+\w+::(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]+)\}\s*;/g,
  )) {
    tables[match[1]!] ??= {
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

/**
 * Every `struct Name { ... };` the device's own sources declare, as field lists.
 *
 * MAME gives a device's plain-old-data state its own struct as readily as it
 * gives it a scalar member, and the host needs the shape to build one. Only the
 * fields matter here: a name, and an array bound when the field is an array.
 */
function structDeclarations(
  sources: readonly { file: string; source: string }[],
  constants: Record<string, number>,
): Map<string, GeneratedStructField[]> {
  const structs = new Map<string, GeneratedStructField[]>();
  for (const { source } of sources) {
    // Named (`struct SOUND { ... };`) and anonymous (`struct { ... }
    // m_snd_control;`) alike. MAME uses the second form for a one-off block of
    // device state, and without a shape every field assignment into it failed:
    // the Game Boy's sound chip could not even start.
    for (const declaration of structBlocks(source)) {
      if (!declaration.name || structs.has(declaration.name)) continue;
      const fields = structFieldList(declaration.body, constants);
      if (fields.length) structs.set(declaration.name, fields);
    }
  }
  return structs;
}

/**
 * Every `struct [name] { ... } [name];` in a source file, brace-balanced.
 *
 * A regex over `[^{}]*` cannot see a struct that contains another one, and
 * MAME nests freely -- the Game Boy PPU's per-line state holds an array of
 * anonymous sprite structs -- so the block is matched by counting braces.
 */
function structBlocks(
  source: string,
): { name: string; body: string; declarator?: string }[] {
  const blocks: { name: string; body: string; declarator?: string }[] = [];
  const opener = /\bstruct\s+(\w+)?\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = opener.exec(source)) !== null) {
    const open = source.indexOf('{', match.index);
    const close = matchingBrace(source, open);
    if (close < 0) continue;
    // The name after the closing brace declares a member of this struct type;
    // `struct SOUND { ... };` declares none.
    const declarator = /^\s*(\w+)\s*(?:\[[^\]]*\])?\s*;/.exec(source.slice(close + 1))?.[1];
    blocks.push({
      name: match[1] ?? declarator ?? '',
      body: source.slice(open + 1, close),
      ...(declarator ? { declarator } : {}),
    });
    opener.lastIndex = close + 1;
  }
  return blocks;
}

/** The fields of one struct body, recursing into nested anonymous structs. */
function structFieldList(
  body: string,
  constants: Record<string, number>,
): GeneratedStructField[] {
  const fields: GeneratedStructField[] = [];
  const bound = (text: string | undefined): number | undefined => {
    if (text === undefined) return undefined;
    const value = evalExpr(text, constants) ?? undefined;
    return value !== undefined && value > 0 ? value : undefined;
  };
  let cursor = 0;
  while (cursor < body.length) {
    const nested = /\bstruct\s*\{/g;
    nested.lastIndex = cursor;
    const start = nested.exec(body);
    const scalars = start ? body.slice(cursor, start.index) : body.slice(cursor);
    for (const field of scalars.matchAll(
      /^\s*(?:const\s+)?([\w:]+)\s+(\w+)\s*(?:\[\s*([^\]]+)\s*\])?\s*;/gm,
    )) {
      // A struct field is as wide as its type, exactly like a plain member.
      // Dropping the width let a `uint8_t` counter reach -1 instead of
      // wrapping to 0xff, and the DPC's `if (low == 0xff)` carry never fired.
      const valueType = field[1]!;
      const bits: 8 | 16 | 32 = /64/.test(valueType) ? 32
        : /(?:^|[^\d])32/.test(valueType) || valueType === 'int' ? 32
          : /16/.test(valueType) ? 16
            : /8|bool|char/.test(valueType) ? 8
              : 32;
      const signed = /^(?:int|s)/.test(valueType) && !/^uint/.test(valueType);
      const length = bound(field[3]);
      fields.push({
        name: field[2]!,
        ...(length !== undefined ? { length } : {}),
        bits,
        ...(signed ? { signed } : {}),
      });
    }
    if (!start) break;
    const open = body.indexOf('{', start.index);
    const close = matchingBrace(body, open);
    if (close < 0) break;
    const declarator = /^\s*(\w+)\s*(?:\[\s*([^\]]+)\s*\])?\s*;/.exec(body.slice(close + 1));
    if (declarator) {
      const length = bound(declarator[2]);
      fields.push({
        name: declarator[1]!,
        ...(length !== undefined ? { length } : {}),
        fields: structFieldList(body.slice(open + 1, close), constants),
      });
    }
    cursor = close + 1 + (declarator?.[0].length ?? 0);
  }
  return fields;
}
