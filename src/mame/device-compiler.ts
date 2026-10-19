import { existsSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import { evalExpr, parseTextMacros } from '../kg/parse.ts';
import type { BoardSourceRef, GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import {
  parseMameAst,
  parseMameConstructors,
  splitMameArgs,
  type MameClass,
  type MameFunction,
} from './ast.ts';
import { normalizeMameExecutionSource } from './cpu-compiler.ts';
import { braceBody, initializerItems, objectMacros, stripCppComments } from './initializer.ts';
import { compileMameHandler } from './handler-ir.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';
import { DEFAULT_CONSTANTS } from '../ir/execute.ts';
import {
  collectFunctionMacros,
  collectDynamicMacros,
  expandDynamicMacros,
  collectBitAliasMacros,
  collectMemberAliasMacros,
  expandFunctionMacros,
  expandMemberAliasMacros,
  type FunctionMacro,
  type MemberAliasMacro,
} from './preprocessor.ts';
import { indexMameHardware, type MameHardwareDefinition } from './hardware.ts';
import { monomorphizeFunctionTemplate } from './function-template.ts';

/**
 * A cassette image format a cassette device mounts (lib/formats). A legacy
 * wave filler reports a sample count and fills 16-bit PCM at its own rate
 * (cbm_tap.cpp); a format with its own identify and load reads the file into
 * the host's cassette image itself (wavfile.cpp).
 */
export type CassetteImageFormat = { extension: string; definition: GeneratedDeviceDefinition; mountMethod: string } & (
  | { sizeMethod: string; fillMethod: string; sampleRate: number }
  | { identifyMethod: string; loadMethod: string });

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
    kind: 'shared' | 'owned' | 'growable';
    /** A growable vector's element type, when it is not an integer. */
    element?: string;
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
  /**
   * The aggregate initializer of a file-scope `static const struct` the
   * device points into, field by field (arrays nest as arrays).
   */
  initialValue?: Record<string, unknown>;
  /** Per-element initial fields of a static array of structs. */
  initialValues?: Record<string, unknown>[];
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
  valueType?: string;
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
  /** Absent for `timer_alloc(timer_expired_delegate())`: nothing calls back. */
  callback?: string;
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
  /**
   * The declared return type's width when it is narrower than an int, as
   * generatedFieldWidth spells it (negative when signed). C++ converts the
   * returned value to it: the 64H156's `uint8_t yb_r()` returns a ten-bit
   * shift register, and the 1541's VIA has to see its low byte.
   */
  returnWidth?: 8 | 16 | -8 | -16;
}

export interface GeneratedDeviceDefinition {
  schemaVersion: 1;
  type: string;
  className: string;
  hierarchy: string[];
  sourceFiles: string[];
  /**
   * MAME `device_rom_interface<AddrWidth>`: the device reads its own ROM
   * region (by default the one named by its tag) through `read_byte`.
   */
  romInterface?: { addressBits: number };
  /**
   * MAME `device_image_interface`: the device reads a file the host mounts,
   * through the interface's own calls (`length`, `fread`, `fseek`,
   * `is_filetype`), as the C64's quickload reads a .prg.
   */
  imageInterface?: true;
  constants: Record<string, number>;
  members: GeneratedDeviceMember[];
  callbacks: GeneratedDeviceCallback[];
  timers: GeneratedDeviceTimer[];
  methods: GeneratedDeviceMethod[];
  /** Source constructors for dynamically allocated helper objects. */
  allocations?: Record<string, GeneratedDeviceDefinition>;
  construct?: string;
  /**
   * Every struct type the device declares, keyed by type name.
   *
   * A `SOUND &` parameter names its type and nothing else, so this is what
   * lets an emitted `snd.frequency_counter = ...` narrow to the eleven-bit
   * field MAME declared rather than leaving that to a runtime accessor.
   */
  structs?: Record<string, GeneratedStructField[]>;
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
  /** A floppy drive's image formats (identify + load), as its connector registers them. */
  floppyFormats?: { name: string; extensions: string[]; definition: GeneratedDeviceDefinition }[];
  /** MAME's floppy_image track store, built for each mounted disk. */
  floppyImage?: GeneratedDeviceDefinition;
  imageFormats?: CassetteImageFormat[];
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
  | { kind: 'owner' }
  | { kind: 'sample-image'; region: string; sampleRate: number }
  | { kind: 'number'; value: number }
  | { kind: 'region'; name: string }
  // MAME's `memory_region *`: the bytes plus the size questions asked of them.
  | { kind: 'region-object'; name: string }
  // A pointer part-way into a region, as MAME writes `get_rom_base() + N`.
  | { kind: 'region-pointer'; name: string; offset: number }
  | { kind: 'region-length'; name: string }
  | { kind: 'region-pages'; name: string; bytes: number }
  | { kind: 'region-page-mask'; name: string; bytes: number }
  | { kind: 'memory'; name: string; bytes: number; onlyWhenRegionMissing?: string; region?: string; fill?: number }
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
  options: {
    /**
     * Rewrite a source file before it is read, for a device whose code only
     * exists after the C preprocessor has run (see preprocessed-device.ts).
     */
    transformSource?: (file: string, source: string) => string;
  } = {},
): GeneratedDeviceDefinition {
  const sourceFiles = localSourceFiles(mameSrc, definition.sourceFile);
  const sources = sourceFiles.map(file => {
    const source = readFileSync(join(mameSrc, file), 'utf8');
    return { file, source: options.transformSource ? options.transformSource(file, source) : source };
  });
  for (const library of formatLibrarySources(mameSrc, sources)) {
    sources.push(library);
    sourceFiles.push(library.file);
  }
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
    // C stdio ABI, supplied by the host rather than a MAME device header.
    { SEEK_SET: 0, SEEK_CUR: 1, SEEK_END: 2 },
    coreLineStates(mameSrc),
    coreAddressSpaces(mameSrc),
    // Comments out: an enum documented entry by entry (flopimg.h's variants)
    // otherwise parses to the wrong values for everything after a comment.
    ...sources.map(({ source }) => numericConstants(stripCppComments(source))),
    // A class-scoped constant belongs to its class, not to the file. MAME
    // declares `PAGE_ROM_SIZE` five times in one cartridge header -- 0x4000
    // for the paged MBCs, 0x2000 and 0x8000 for others -- and flattening them
    // left every board using whichever came last: an MBC1 banked in 32 KiB
    // steps and read the wrong half of its own ROM. Layered base-first, so a
    // derived class still overrides what it inherits.
    // Comments out, as for foreign classes: flopimg.h documents each opcode
    // of its track description language with a comma-bearing comment.
    ...hierarchy.map(className =>
      numericConstants(stripCppComments(classes.get(className)?.body ?? ''))),
  );
  Object.assign(constants, foreignClassConstants(mameSrc, sources, classes, constants));
  // Struct shapes for members whose type is one the device declares.
  const structFields = structDeclarations(sources, constants);
  const sourceTables = Object.assign(
    {},
    // Comments out first: the 1541 formats annotate their zone tables row by
    // row (`21, 21, ... //  1-17`), and kept in, every inlined value after the
    // first comment was the comment.
    ...sources.map(({ source }) => constantTables(stripCppComments(source))),
  );
  // Statement macros the device's own sources define. These have to be
  // substituted textually: their bodies read and assign the caller's locals,
  // which no call can do.
  const functionMacros = sources.flatMap(({ source }) => collectFunctionMacros(source));
  const stringMacros: Record<string, string> = Object.assign({},
    ...sources.map(({ source }) => parseTextMacros(stripCppComments(source)).strings));
  const liveParameters = new Set(ast.units.flatMap(unit => unit.functions)
    .filter(method => method.className && hierarchy.includes(method.className))
    .flatMap(method => splitMameArgs(method.parameters).map(parameterName))
    .filter(name => /^\w+$/.test(name)));
  const dynamicMacros = collectDynamicMacros(sources.map(({ source }) => source).join('\n'), liveParameters);
  // Template tables are often assembled through forwarding macros whose body
  // is another macro call rather than a statement yet. Keep this broader set
  // isolated from executable-body expansion: it exists only to discover the
  // concrete specializations selected by source.
  const templateDiscoveryMacros = sources.flatMap(({ source }) =>
    collectFunctionMacros(source, { includeForwarders: true }));
  // Object-like `#define`s that name a register inside the device's own state
  // (`#define CURLINE m_vid_regs[0x04]`). The name stands for nothing but the
  // subscript, so it has to become the subscript before lowering.
  const memberAliases = sources.flatMap(({ source }) => [...collectMemberAliasMacros(source), ...collectBitAliasMacros(source)]);
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
  // Every body, an overridden base's included: avgdvg_device_base allocates
  // the AVG's timers in the device_start avg_device overrides and chains to.
  const allMethodBodies: string[] = [];
  const replaceOrAppend = (method: MameFunction): void => {
    const specialized = specializeMethod(method, specialize);
    specialized.body = expandDynamicMacros(specialized.body, dynamicMacros);
    // Recorded even for an ignored method: `memory_space_config` is not
    // executable device behaviour, but it is where the space indices are said.
    methodBodies.set(specialized.name, specialized.body);
    allMethodBodies.push(specialized.body);
    if (ignoredMethods.has(specialized.name) || specialized.parameters.includes('...')) return;
    const signature = methodSignature(specialized.name, specialized.parameters);
    const existing = methods.findIndex(candidate =>
      methodSignature(candidate.name, candidate.parameters) === signature);
    const compiled = compileMethod(
      specialized, interruptCallbacks, sourceTables, functionMacros, memberAliases, stringMacros);
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
      for (const specialized of specializeFunctionTemplate(
        method, sources, templateDiscoveryMacros, constants,
      )) {
        replaceOrAppend(specialized);
      }
    }
    const declaration = classes.get(className);
    if (!declaration) continue;
    for (const method of inlineMethods(declaration)) {
      for (const specialized of specializeFunctionTemplate(
        method, sources, templateDiscoveryMacros, constants,
      )) {
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

  // A static helper of another device class, called by its qualified name:
  // the Battlezone AVG colours each beam with `vector_device::color111(7)`,
  // declared inline in vector.h. That header is reached through MAME's global
  // include path, so the family closure never parsed it and the call answered
  // zero -- a black beam. The class is found by the hardware index, and only
  // the called static method is lowered.
  const helperBodies = [...methodBodies.values()].join('\n');
  for (const call of new Set([...helperBodies.matchAll(/\b(\w+_device)::(\w+)\s*(?:<[^<>()]*>)?\s*\(/g)]
    .map(match => `${match[1]}::${match[2]}`))) {
    const [className, name] = call.split('::') as [string, string];
    if (hierarchy.includes(className) || methods.some(candidate => candidate.name === call)) continue;
    const owner = [...indexMameHardware(mameSrc).values()]
      .find(candidate => candidate.className === className);
    const header = owner?.sourceFile.replace(/\.cpp$/, '.h');
    if (!header || !existsSync(join(mameSrc, header))) continue;
    const declaration = parseMameAst([{ file: header, source: readFileSync(join(mameSrc, header), 'utf8') }])
      .units.flatMap(unit => unit.classes).find(candidate => candidate.name === className);
    const helper = declaration && inlineMethods(declaration).find(method => method.name === name);
    if (!helper || !new RegExp(`\\bstatic\\b[^;{}]*\\b${name}\\s*\\(`).test(declaration!.body)) continue;
    const compiled = compileMethod(helper, interruptCallbacks, sourceTables, functionMacros, memberAliases, stringMacros);
    methods.push({ ...compiled, name: call });
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
      const pushed = new RegExp(`\\b${member.name}\\s*\\.\\s*(?:push_back|emplace_back)\\s*\\(`)
        .test(sources.map(candidate => candidate.source).join('\n'));
      const memory = memoryContainer(member.valueType, member.name, constructorBindings, pushed);
      const finder = finderBinding(member.valueType, member.name, constructorBindings);
      const structType = structFields.has(member.valueType.replace(/\*$/, '').trim());
      return [{
        name: member.name,
        valueType: member.valueType,
        ...(bits ? { bits } : {}),
        ...(signed ? { signed } : {}),
        // An array of a struct the device declares is that many structs, not
        // that many zeros (the AVG's `vgvector m_vectbuf[MAXVECT]`).
        ...(allocated && !structType ? { values: allocated } : {}),
        ...(memory ? { memory } : {}),
        ...(finder ? { finder } : {}),
        ...(member.arrayLength || (allocated && structType)
          ? { arrayLength: member.arrayLength ?? allocated!.length }
          : {}),
        ...(member.arrayShape ? { arrayShape: member.arrayShape } : {}),
        ...(structFields.get(member.valueType.replace(/\*$/, '').trim())
          ? { fields: structFields.get(member.valueType.replace(/\*$/, '').trim()) }
          : {}),
      }];
    });
  });
  members.push(...staticStructConstants(sources, structFields, constants, members));
  const regionResources = Object.fromEntries(members.flatMap(member => {
    if (!/^(?:required|optional)_region_ptr<[^>]+>$/.test(member.valueType)) return [];
    const target = constructorBindings[member.name]?.at(-1) ?? '';
    const name = target === 'DEVICE_SELF' ? 'self' : unquoteToken(target);
    return name ? [[member.name, { kind: 'region' as const, name }]] : [];
  }));
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
  // Every timer a member holds, with or without a callback. The runtime
  // builds them all up front and binds each to its member, so the source's
  // own `m_x = timer_alloc(...)` is dropped from the method bodies (see
  // compileMethod). Handing them out in source order instead cross-wired
  // k051960: TMNT wires neither its FIRQ nor its NMI line, so the first
  // allocation to run was the callback-less sprite-DMA busy flag, which got
  // the FIRQ timer -- every sprite DMA then started a scanline chain MAME
  // never allocates, and the busy flag never cleared.
  //
  // Read from the device's own methods, not from every source file it pulls
  // in: the 64H156 includes floppy.h, whose `m_index_timer` is the drive's
  // and not the gate array's, while the gate array's own `t_gen` carries no
  // `m_` at all. A timer the scheduler allocates
  // (`machine().scheduler().timer_alloc(...)`) is a member timer too.
  // An `m_` name is a member by MAME's convention even where the declaration
  // is a list the member parser does not split (`emu_timer *m_vg_run_timer,
  // *m_vg_halt_timer;`); anything else must be a declared member.
  const timers = [...new Map(allMethodBodies.flatMap(body => [...body.matchAll(
    /(?<![\w.>])(\w+)\s*=\s*(?:machine\(\)\s*\.\s*scheduler\(\)\s*\.\s*)?timer_alloc\s*\(\s*(?:FUNC\(\s*\w+::(\w+)\s*\))?/g,
  )].filter(match => match[1]!.startsWith('m_') || memberOwners.has(match[1]!)).map(match => [match[1]!, {
    member: match[1]!,
    ...(match[2] ? { callback: match[2] } : {}),
  }] as const))).values()];
  const diagnostics = methods.reduce(
    (count, method) => count + method.program.diagnostics.length,
    0,
  );
  const source = sources.map(candidate => candidate.source).join('\n');
  const clockDivider = executionClockDivider(methodBodies.get('execute_cycles_to_clocks') ?? '');
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
  // C++ declares a default argument once, in the class; an out-of-class
  // definition repeats the parameters without it. The 64H156 calls
  // `live_run()` and `commit(tm)` against `live_run(const attotime &limit =
  // attotime::never)` and `commit(..., bool force = false)`, so the defaults
  // are taken from the declaration, or the omitted arguments are undefined.
  for (const method of methods) {
    const bare = method.name.split('::').at(-1)!;
    const own = splitMameArgs(method.parameters).map(parameter => parameter.trim()).filter(Boolean);
    if (!own.length || own.every(parameter => parameter.includes('='))) continue;
    for (const className of [...hierarchy].reverse()) {
      const body = stripCppComments(classes.get(className)?.body ?? '');
      const declared = [...body.matchAll(new RegExp(`\\b${bare}\\s*\\(([^;{}]*)\\)\\s*(?:const\\s*)?(?:noexcept\\s*)?(?:override\\s*)?(?:ATTR_\\w+\\s*)?;`, 'g'))]
        .map(match => splitMameArgs(match[1]!).map(parameter => parameter.trim()).filter(Boolean))
        .find(parameters => parameters.length === own.length && parameters.some(parameter => parameter.includes('=')));
      if (!declared) continue;
      method.parameters = own.map((parameter, index) => {
        const fallback = /=\s*([\s\S]+)$/.exec(declared[index]!)?.[1];
        return parameter.includes('=') || fallback === undefined ? parameter : `${parameter} = ${fallback.trim()}`;
      }).join(', ');
      break;
    }
  }
  // The return type, from the declaration in the class (an out-of-class
  // definition repeats it, but the AST keeps only the name and parameters).
  const RETURN_WIDTHS: Record<string, 8 | 16 | -8 | -16> = {
    u8: 8, uint8_t: 8, s8: -8, int8_t: -8, u16: 16, uint16_t: 16, s16: -16, int16_t: -16,
  };
  for (const method of methods) {
    const bare = method.name.split('::').at(-1)!;
    for (const className of [...hierarchy].reverse()) {
      const body = stripCppComments(classes.get(className)?.body ?? '');
      const declared = new RegExp(`(?:^|[;{}:])\\s*(?:(?:virtual|static|inline|constexpr)\\s+)*(\\w+)\\s+${bare}\\s*\\(`, 'm').exec(body);
      if (!declared) continue;
      const width = RETURN_WIDTHS[declared[1]!];
      if (width) method.returnWidth = width;
      break;
    }
  }
  const romInterfaceBits = hierarchy.map(className => {
    const declaration = classes.get(className);
    if (!declaration?.bases.includes('device_rom_interface')) return undefined;
    const width = declaration.baseTemplateArguments?.device_rom_interface?.[0];
    return width === undefined ? undefined : evalExpr(width, constants) ?? undefined;
  }).find(width => width !== undefined);
  const imageInterface = hierarchy.some(className => classes.get(className)?.bases.includes('device_image_interface'));
  const result: GeneratedDeviceDefinition = {
    schemaVersion: 1,
    type,
    className: definition.className,
    hierarchy,
    sourceFiles,
    ...(romInterfaceBits ? { romInterface: { addressBits: romInterfaceBits } } : {}),
    ...(imageInterface ? { imageInterface: true as const } : {}),
    constants,
    members,
    callbacks,
    timers,
    methods,
    // Every struct type the device declares, so an emitted field store can
    // narrow to the width the C++ declaration has. A `SOUND &` parameter names
    // its type and nothing else; without the table the emitter cannot tell
    // `snd.frequency_counter` from any other property.
    ...(structFields.size
      ? { structs: Object.fromEntries([...structFields].map(([name, fields]) => [name, fields])) }
      : {}),
    ...(Object.keys(delegates).length ? { delegates } : {}),
    ...(Object.keys(regionResources).length
      ? { resources: { members: regionResources } }
      : {}),
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
  const constructors = sources.flatMap(({ file, source }) => parseMameConstructors(file, source));
  const allocations: Record<string, GeneratedDeviceDefinition> = {};
  for (const method of methods) walkExpressions(method.program.operations, expression => {
    if (expression.kind !== 'call' || expression.callee.kind !== 'identifier' || !expression.callee.name.startsWith('new::')) return;
    const name = expression.callee.name.slice(5);
    if (allocations[name]) return;
    const qualified = classes.has(`${definition.className}::${name}`) ? `${definition.className}::${name}` : name;
    if (!classes.has(qualified) || compiling.has(qualified)) throw new Error(`cannot resolve allocated MAME class ${qualified}`);
    const child = compileMameDevice(mameSrc, { ...definition, className: qualified }, qualified, new Set([...compiling, qualified]));
    const constructor = constructors.find(candidate => candidate.className === qualified);
    if (!constructor) throw new Error(`missing source constructor for ${qualified}`);
    addSourceConstructor(child, constructor, true);
    allocations[name] = child;
    result.summary.diagnostics += child.summary.diagnostics;
  });
  if (Object.keys(allocations).length) result.allocations = allocations;
  lowerStructLocals(result);
  markFloatingNames(result);
  return result;
}

/**
 * C++ divides by the operands' declared types, and a member or parameter
 * declared `float`/`double` is floating wherever a method reads it -- as a
 * local already is (handler-ir's markFloatingLocals). The floppy drive's
 * `m_rev_time = attotime::from_double(60/m_rpm)` is 0.2 s; divided as two
 * integers it was 0, and the index pulse loop never left its first turn.
 */
function markFloatingNames(device: GeneratedDeviceDefinition): void {
  const floatingType = (valueType?: string) => /\b(?:float|double)\b/.test(valueType ?? '') && !/[*&[]/.test(valueType ?? '');
  const members = device.members.filter(member => floatingType(member.valueType)).map(member => member.name);
  for (const method of device.methods) {
    const names = new Set(members);
    for (const parameter of method.parameters.split(',')) {
      const declared = parameter.replace(/=.*$/, '').trim();
      const name = /(\w+)\s*$/.exec(declared)?.[1];
      if (!name || declared === 'void') continue;
      if (floatingType(declared.slice(0, -name.length))) names.add(name);
      else names.delete(name);
    }
    // A local of another type hides a member of the same name.
    walkOperations(method.program.operations, operation => {
      if (operation.op === 'declare' && !floatingType(operation.valueType)) names.delete(operation.name);
    });
    if (!names.size) continue;
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'identifier' && names.has(expression.name)) expression.floating = true;
    });
  }
}

/**
 * Give struct-typed locals their C++ meaning.
 *
 * A brace list in an array of structs initialises fields in declaration
 * order (`{ SECTOR_LOOP_START, 0, -1 }` is type, p1, p2), a local array of a
 * struct is that many structs rather than zeros (`desc_s sectors[40]`), and a
 * function-local `static` is initialised once and keeps its value: the 1541's
 * sector description is one static table that fix_end_gap edits in place for
 * every track, so a fresh copy per call would not be the track MAME writes.
 */
/**
 * Resolve overloads the argument count alone tells apart, at compile time.
 *
 * flopimg's bit writers come in pairs -- `bit_w(buffer, val, size = 1000)` and
 * `bit_w(buffer, val, size, offset)` -- and an overloaded name is resolved at
 * run time, call by call, which kept the innermost loop of every disk mount
 * interpreted. Where each overload's arity range (its required to its total
 * parameters) is disjoint from the others', each gets its own name and every
 * call is pointed at the one its argument count selects. Overloads a count
 * cannot separate are left for the runtime to choose between.
 */
function resolveArityOverloads(device: GeneratedDeviceDefinition): void {
  const groups = new Map<string, GeneratedDeviceMethod[]>();
  // A constructor is not an overload set a caller picks from: the device's
  // construction chain finds it by its class's name, and renaming the calls
  // a derived constructor makes to its base's (megaduck_flat_device's two)
  // left the Game Boy's flat cartridge never installing its ROM.
  const classes = new Set([device.className, ...device.hierarchy]);
  for (const method of device.methods) {
    if (method.name.includes('::') || classes.has(method.name)) continue;
    groups.set(method.name, [...groups.get(method.name) ?? [], method]);
  }
  const renamed = new Map<string, { min: number; max: number; name: string }[]>();
  for (const [name, overloads] of groups) {
    if (overloads.length < 2) continue;
    const ranges = overloads.map(method => {
      const parameters = method.parameters.trim() === 'void' ? []
        : splitMameArgs(method.parameters).map(parameter => parameter.trim()).filter(Boolean);
      return { method, min: parameters.filter(parameter => !parameter.includes('=')).length, max: parameters.length };
    });
    const disjoint = ranges.every((range, index) => ranges.every((other, otherIndex) =>
      index === otherIndex || range.max < other.min || other.max < range.min));
    if (!disjoint) continue;
    // Aliases, not renames: a bus or a host may still reach the overload set
    // by its own name, and the runtime keeps choosing for those callers.
    renamed.set(name, ranges.map(range => {
      const alias = `${name}__${range.max}`;
      device.methods.push({ ...range.method, name: alias });
      return { min: range.min, max: range.max, name: alias };
    }));
  }
  if (!renamed.size) return;
  for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier') return;
      const choices = renamed.get(expression.callee.name);
      const choice = choices?.find(candidate =>
        expression.args.length >= candidate.min && expression.args.length <= candidate.max);
      if (choice) (expression as { callee: GeneratedExpression }).callee = { kind: 'identifier', name: choice.name };
    });
  }
  if (device.hotMethods) {
    device.hotMethods = [...new Set(device.hotMethods.flatMap(name => [name, ...renamed.get(name)?.map(choice => choice.name) ?? []]))];
  }
}

export function lowerStructLocals(device: GeneratedDeviceDefinition): void {
  resolveArityOverloads(device);
  // `this->method(...)` on the device's own method is the same call as
  // `method(...)`, and only the plain form passes reference parameters by
  // reference: d64_format::load takes its track's size back through
  // `this->get_sector_desc(f, current_size, ...)`, and read as a member call
  // on an object the size never came back.
  // Only where it matters -- a method that takes a reference. A call without
  // one keeps its `this->` spelling, which is how a slot card's
  // `this->cart_rom_region()` reaches the region the host bound, not the
  // interface's own generic answer.
  const own = new Set(device.methods
    .filter(method => splitMameArgs(method.parameters).some(parameter => /&(?!&)/.test(parameter.replace(/=.*$/, ''))))
    .map(method => method.name));
  for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'member') return;
      const callee = expression.callee;
      if (callee.object.kind !== 'identifier' || callee.object.name !== 'this' || !own.has(callee.property)) return;
      (expression as { callee: GeneratedExpression }).callee = { kind: 'identifier', name: callee.property };
    });
  }
  const structs = device.structs ?? {};
  const fieldsOf = (valueType?: string): GeneratedStructField[] | undefined => {
    const leaf = valueType?.replace(/\bconst\b/g, '').replace(/[*&]/g, '').trim().split('::').at(-1);
    return leaf ? structs[leaf] : undefined;
  };
  const string = (value: string): GeneratedExpression => ({ kind: 'string', value });
  const structValue = (fields: GeneratedStructField[], values: GeneratedExpression[]): GeneratedExpression => ({
    kind: 'call',
    callee: { kind: 'identifier', name: 'STRUCT' },
    args: fields.flatMap((field, index) => [string(field.name), values[index] ?? { kind: 'number', value: 0 }]),
  });
  for (const method of device.methods) {
    // A scalar static is one storage for every call, so its uses name the
    // member itself; a local copy would take `counter++` and lose it.
    const scalarStatics = new Map<string, string>();
    const rewrite = (operations: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] => operations.flatMap((operation): GeneratedHandlerOperation[] => {
      for (const key of ['then', 'else', 'body'] as const) {
        const nested = (operation as Record<string, unknown>)[key];
        if (Array.isArray(nested)) (operation as Record<string, unknown>)[key] = rewrite(nested as GeneratedHandlerOperation[]);
      }
      if (operation.op === 'switch') {
        for (const entry of operation.cases) entry.body = rewrite(entry.body);
      }
      if (operation.op !== 'declare') return [operation];
      const fields = fieldsOf(operation.valueType);
      let value = operation.value;
      if (fields && value?.kind === 'call' && value.callee.kind === 'identifier') {
        if (value.callee.name === 'ARRAY') {
          value = { ...value, args: value.args.map(element =>
            element.kind === 'call' && element.callee.kind === 'identifier' && element.callee.name === 'AGGREGATE'
              ? structValue(fields, element.args) : element) };
        } else if (value.callee.name === 'ALLOC') {
          value = {
            kind: 'call',
            callee: { kind: 'identifier', name: 'STRUCT_ARRAY' },
            args: [value.args[0] ?? { kind: 'number', value: 0 }, ...fields.map(field => string(field.name))],
          };
        }
      }
      // A struct declared without an initializer is still a struct, all zero:
      // `cbm_crt_header header;` is then read into byte by byte. The device
      // runtime builds it from the declaration (STRUCT_OF), with each field's
      // width and each array field's length, which a name/value list cannot
      // carry.
      if (fields && !value && !operation.static) {
        const leaf = operation.valueType!.replace(/\bconst\b/g, '').replace(/[*&]/g, '').trim().split('::').at(-1)!;
        if (!/[*&]/.test(operation.valueType!)) {
          value = { kind: 'call', callee: { kind: 'identifier', name: 'STRUCT_OF' }, args: [string(leaf)] };
        }
      }
      const declared: GeneratedHandlerOperation = { ...operation, ...(value ? { value } : {}) };
      if (!operation.static || !value) {
        delete (declared as { static?: true }).static;
        return [declared];
      }
      const member = `__static_${method.name.replace(/\W+/g, '_')}_${operation.name}`;
      // A static table (`static const u8 dummy_table[] = {...}`) declares its
      // element type; the member holding it must not be narrowed to that, or
      // the Williams blitter's remap table became one byte.
      const aggregate = value.kind === 'call' && value.callee.kind === 'identifier' &&
        ['ARRAY', 'AGGREGATE', 'STRUCT', 'STRUCT_ARRAY', 'ALLOC'].includes(value.callee.name);
      if (!device.members.some(candidate => candidate.name === member)) {
        device.members.push({ name: member, valueType: aggregate ? 'auto' : operation.valueType ?? 'auto' });
        device.members.push({ name: `${member}__initialised`, valueType: 'bool' });
      }
      const storage: GeneratedExpression = { kind: 'identifier', name: member };
      // Initialised once, as C++ does on first pass -- not again whenever the
      // value happens to be zero.
      const initialised: GeneratedExpression = { kind: 'identifier', name: `${member}__initialised` };
      const initialise: GeneratedHandlerOperation = { op: 'if', condition: { kind: 'unary', operator: '!', operand: initialised },
        then: [
          { op: 'assign', target: storage, operator: '=', value },
          { op: 'assign', target: initialised, operator: '=', value: { kind: 'number', value: 1 } },
        ] };
      if (!aggregate) {
        scalarStatics.set(operation.name, member);
        return [initialise];
      }
      // A table is shared by reference, so a local naming it is the table.
      return [initialise, { op: 'declare', name: operation.name, value: storage }];
    });
    const operations = rewrite(method.program.operations);
    if (scalarStatics.size) {
      walkExpressions(operations, expression => {
        if (expression.kind === 'identifier' && scalarStatics.has(expression.name)) {
          (expression as { name: string }).name = scalarStatics.get(expression.name)!;
        }
      });
    }
    method.program = { ...method.program, operations };
  }
}

/** Lower a selected C++ constructor, including field initializers, to ordinary method IR. */
export function addSourceConstructor(
  device: GeneratedDeviceDefinition,
  constructor: ReturnType<typeof parseMameConstructors>[number],
  includeInitializers = false,
): void {
  let body = constructor.body;
  // device_t::interface(T *&) is an RTTI lookup with an output reference.
  // The host proxy exposes the same lookup by the source-declared type name.
  body = body.replace(/\b(\w+)->interface\s*\(\s*(m_\w+)\s*\)/g, (call, receiver: string, field: string) => {
    const type = device.members.find(member => member.name === field)?.valueType.replace(/\*$/, '').trim();
    return type ? `${field} = ${receiver}->interface("${type}")` : call;
  });
  if (includeInitializers) body = constructor.initializers
    .filter(initializer => device.members.some(member => member.name === initializer.name))
    .map(initializer => {
      if (initializer.args.length !== 1) throw new Error(`unsupported constructor initializer ${initializer.name}`);
      return `${initializer.name} = ${initializer.args[0]};`;
    }).join('\n') + '\n' + body;
  const method = compileMethod({ ...constructor, name: '__construct', body });
  device.methods.push(method);
  device.construct = method.name;
  device.summary = { methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0)
      + Object.values(device.allocations ?? {}).reduce((sum, child) => sum + child.summary.diagnostics, 0) };
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
  const match = /return\s*\(?\s*\w+\s*\*\s*(\d+)\s*\)?\s*;/s
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

/**
 * The image-format library a device reads its files with, when it calls into
 * one: `#include "formats/cbm_crt.h"` declares `cbm_crt_read_header`, and
 * src/lib/formats/cbm_crt.cpp defines it. The header and its source join the
 * device's own -- their structs, defines and tables with them -- only when a
 * function the header declares is called, so a device that merely names a
 * format class (every floppy connector) compiles exactly as it did.
 */
function formatLibrarySources(
  mameSrc: string,
  sources: readonly { file: string; source: string }[],
): { file: string; source: string }[] {
  const own = sources.map(({ source }) => stripCppComments(source)).join('\n');
  const libraries: { file: string; source: string }[] = [];
  const seen = new Set(sources.map(({ file }) => file));
  for (const match of own.matchAll(/^\s*#include\s+"formats\/(\w+)\.h"/gm)) {
    const header = `src/lib/formats/${match[1]}.h`;
    const implementation = `src/lib/formats/${match[1]}.cpp`;
    if (seen.has(implementation) || !existsSync(join(mameSrc, header)) || !existsSync(join(mameSrc, implementation))) continue;
    const declared = stripCppComments(readFileSync(join(mameSrc, header), 'utf8'));
    // File-scope declarations only: a format class's methods are its own.
    const outside = declared.replace(/\b(?:class|struct)\s+\w+[^;{]*\{(?:[^{}]|\{[^{}]*\})*\}\s*;/g, '');
    const names = [...outside.matchAll(/^[\w:<>*&\s]+?\b(\w+)\s*\([^;{}]*\)\s*;/gm)].map(name => name[1]!);
    if (!names.some(name => new RegExp(`\\b${name}\\s*\\(`).test(own))) continue;
    seen.add(implementation);
    for (const file of [header, implementation]) {
      libraries.push({ file, source: readFileSync(join(mameSrc, file), 'utf8') });
    }
  }
  return libraries;
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
      // `.hxx` is the same convention for data: the coefficient tables one
      // source includes into itself (vlm5030.cpp reads its LPC ladders from
      // tms5110r.hxx), never another device's declarations.
      if (!family && !['.ipp', '.hxx'].includes(extname(match[1]!))) continue;
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

/**
 * Drop `if constexpr (sizeof...(Pack) > 0) <statement>` for an empty pack.
 *
 * C++ discards the branch when the pack is empty; the handler IR has no
 * `constexpr` and no pack, so the text has to go before parsing.
 */
function stripEmptyPackRecursion(body: string): string {
  return body.replace(
    /\bif\s+constexpr\s*\(\s*sizeof\.\.\.\s*\([^)]*\)[^)]*\)\s*[^;{}]*;/g,
    '',
  );
}

function specializeFunctionTemplate(
  method: MameFunction,
  sources: readonly { file: string; source: string }[],
  functionMacros: readonly FunctionMacro[],
  constants: Record<string, number>,
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
    // A specialization may be named only after several layers of statement
    // macros. Midway's T-Unit tables are the canonical example: four calls in
    // device_start expand into hundreds of dma_draw<Bpp, XFlip, ...> entries.
    // Search the bounded preprocessor expansion so those source-selected
    // instances become ordinary generated methods instead of a platform
    // exception.
    const expanded = expandFunctionMacros(source, functionMacros);
    for (const match of expanded.matchAll(pattern)) {
      const supplied = splitMameArgs(match[1]!).map(argument => argument.trim());
      if (supplied.length !== parameters.length) continue;
      const args = supplied.map(argument => {
        const normalized = argument
          .replace(/\btrue\b/g, '1')
          .replace(/\bfalse\b/g, '0');
        return evalExpr(normalized, constants);
      });
      if (args.some(argument => argument === undefined || !Number.isInteger(argument))) continue;
      instances.set(args.join('_'), args.map(String));
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
    const marker = '__MAMEKIT_TEMPLATE_BODY__';
    // Every specialization the call sites name supplies only the non-pack
    // parameters, so any variadic pack is empty here and its `if constexpr`
    // recursion is dead code. Left in place it is a condition the handler
    // parser cannot read, and the whole method is dropped for a diagnostic --
    // which is how Sinistar's sound command reached no PIA at all.
    const source =
      `template <${parameters.map(parameter => `int ${parameter}`).join(', ')}>\n` +
      method.parameters + marker + stripEmptyPackRecursion(method.body);
    const [monomorphized] = monomorphizeFunctionTemplate(source, [{
      id: `${method.name}<${args.join(',')}>`,
      arguments: Object.fromEntries(parameters.map((parameter, index) => [
        parameter,
        Number(args[index]),
      ])),
    }]);
    const [methodParameters = '', body = ''] = monomorphized!.source.split(marker);
    return {
      ...method,
      name: `${method.name}_${suffix}`,
      parameters: methodParameters.trim(),
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

/**
 * An object-like macro that is one string literal is that literal wherever it
 * is used, as the preprocessor would have it: the IEC slot finds its bus as
 * `subdevice<cbm_iec_device>(CBM_IEC_TAG)`, which is "iec_bus". Left a name,
 * the lookup was handed an unresolved reference and found nothing. String
 * literals in the body are skipped.
 */
function expandStringMacros(body: string, macros: Readonly<Record<string, string>>): string {
  const names = Object.keys(macros).filter(name => /^\w+$/.test(name));
  if (!names.length) return body;
  const pattern = new RegExp(`"(?:[^"\\\\]|\\\\.)*"|\\b(${names.join('|')})\\b`, 'g');
  return body.replace(pattern, (match, name: string | undefined) =>
    name ? `"${macros[name]}"` : match);
}

function compileMethod(
  method: MameFunction,
  interruptCallbacks: { member: string; line: string; signal: string }[] = [],
  sourceTables: Record<string, ConstantTable> = {},
  functionMacros: readonly FunctionMacro[] = [],
  memberAliases: readonly MemberAliasMacro[] = [],
  stringMacros: Readonly<Record<string, string>> = {},
): GeneratedDeviceMethod {
  let body = expandMemberAliasMacros(
    expandFunctionMacros(method.body, functionMacros),
    memberAliases,
  ).replace(
    // The device's own allocations, which the runtime makes from the member's
    // declaration. Not another device's: the C64 expansion port gives its
    // card a ROM with `m_card->m_roml = std::make_unique<uint8_t[]>(size)`,
    // and stripping the right-hand side left a dangling `m_card->` behind.
    /(?<![\w.>])(?:this->)?m_\w+\s*=\s*std::make_unique\s*<[^;]+;\s*/g,
    '',
  ).replace(
    // The runtime builds every member timer and binds it to its member
    // before any method runs (see the timers list in compileMameDevice).
    /(?<![\w.>])\w+\s*=\s*(?:machine\(\)\s*\.\s*scheduler\(\)\s*\.\s*)?timer_alloc\s*\([^;]*\)\s*;\s*/g,
    '',
  );
  body = expandStringMacros(body, stringMacros);
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
    if (new RegExp(`\\bstatic\\s+[^;{]*\\b${name}\\s*\\[`).test(body)) {
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
  // A table's entries can be macros themselves (the CRT format's UNSUPPORTED).
  body = expandStringMacros(body, stringMacros);
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
  const masked = maskNestedClasses(source.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, match =>
    match.replace(/[^\r\n]/g, ' ')));
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
  declaration = { ...declaration, body: maskNestedClasses(declaration.body) };
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
  // The names need not carry `m_`: the 64H156 keeps its live and checkpoint
  // bit-engine states as `live_info cur_live, checkpoint_live;`.
  for (const match of declaration.body.matchAll(
    /^\s*((?:const\s+)?[\w:]+(?:\s+const)?)\s+([A-Za-z_]\w*(?:\s*\[[^\]]+\])?(?:\s*,\s*[A-Za-z_]\w*(?:\s*\[[^\]]+\])?)+)\s*;/gm,
  )) {
    const valueType = match[1]!.replace(/\s+/g, ' ').trim();
    if (/^(?:return|using|typedef|friend|case|goto|delete|throw)$/.test(valueType)) continue;
    for (const declarator of match[2]!.split(',').map(value => value.trim())) {
      const parsed = /^([A-Za-z_]\w*)(?:\s*\[([^\]]+)\])?$/.exec(declarator)!;
      const name = parsed[1]!;
      const arrayLength = parsed[2] === undefined ? undefined : arrayBound(parsed[2]);
      if (!members.some(member => member.name === name)) {
        members.push({ valueType, name,
          ...(arrayLength !== undefined && Number.isInteger(arrayLength) ? { arrayLength } : {}) });
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
    /^\s*((?:const\s+)?[\w:]+<[^;\r\n]+>(?:::\w+)*)\s+(\w+)(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    /^\s*((?:const\s+)?[\w:]+(?:<[^;\r\n]+>)?)\s*(\*)\s*(\w+)\s*(?:\[([^\]]+)\])?(?:\s*\[[^\]]+\])*(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    // A builtin spelled in more than one word -- VLM5030's
    // `unsigned int m_current_energy;` -- and a pointer to a struct the
    // source names with its elaborated specifier, `const struct
    // tms5100_coeffs *m_coeff;`. Neither shape matched above, so the members
    // did not exist and every store into them went nowhere.
    /^\s*((?:const\s+)?(?:(?:unsigned|signed|long|short)\s+)+(?:int|char|long|short)?)\s+(\w+)\s*(?:\[([^\]]+)\])?(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    /^\s*(?:const\s+)?(?:struct|union)\s+([\w:]+)\s*(\*)\s*(\w+)\s*(?:\[([^\]]+)\])?\s*;/gm,
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
        ? arrayBound(bound)
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

/**
 * A declarator's array bound, which MAME often writes as arithmetic: the
 * VIC-II's `m_border_color_sample[0x400 / 8]`. Read with `Number()` it was
 * NaN, so the member had no length and every store into it went through the
 * emitter's name-addressed slow path on each of the chip's cycles.
 */
function arrayBound(bound: string): number {
  return Number(evalExpr(bound.trim(), {}) ?? Number.NaN);
}

function maskNestedClasses(source: string): string {
  const pattern = /\bclass\s+\w+\s*(?::[^;{]+)?\{/g;
  let match: RegExpExecArray | null;
  let result = source;
  while ((match = pattern.exec(source))) {
    const brace = source.indexOf('{', match.index);
    const end = matchingBrace(source, brace);
    if (end < 0) continue;
    result = result.slice(0, match.index) + result.slice(match.index, end + 1).replace(/[^\r\n]/g, ' ') + result.slice(end + 1);
    pattern.lastIndex = end + 1;
  }
  return result;
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
  /** The source appends to it: a growable vector, not storage sized at start. */
  pushed = false,
): GeneratedDeviceMember['memory'] {
  // A vector of something other than integers -- floppy_image keeps its
  // tracks as `std::vector<std::vector<track_info>>` -- grows elements of its
  // own type: the host builds each from `element` when it is resized.
  const nested = /^std::vector<\s*(.+?)\s*>$/.exec(valueType);
  if (nested && integerBits(nested[1]!) === undefined) {
    return { kind: 'growable', elementBytes: 0, element: nested[1]!.replace(/\s+/g, ' ') };
  }
  const container = /^(?:required|optional)_shared_ptr<([\w:]+)>$/.exec(valueType) ??
    /^std::vector<([\w:]+)>$/.exec(valueType);
  if (!container) return undefined;
  const elementBytes = (integerBits(container[1]!) ?? 8) / 8;
  // A drive lists its media variants with `m_variants.push_back(...)`: a
  // typed array cannot grow, so a vector the source appends to is a plain
  // array; one it only sizes and indexes keeps its element width.
  if (valueType.startsWith('std::vector')) return pushed ? { kind: 'growable', elementBytes } : { kind: 'owned', elementBytes };
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
  const normalized = valueType.replace(/\bconst\b/g, '').trim().replace(/\s+/g, ' ');
  if (normalized === 'bool') return 1;
  if (['u8', 's8', 'uint8_t', 'int8_t', 'char', 'unsigned char', 'signed char'].includes(normalized)) return 8;
  if (['u16', 's16', 'uint16_t', 'int16_t', 'short', 'unsigned short'].includes(normalized)) return 16;
  if (['u32', 's32', 'uint32_t', 'int32_t', 'int', 'unsigned', 'unsigned int', 'signed int'].includes(normalized)) return 32;
  return undefined;
}

export function integerSigned(valueType: string): boolean {
  const normalized = valueType.replace(/\bconst\b/g, '').trim().replace(/\s+/g, ' ');
  return ['s8', 'int8_t', 'char', 'signed char', 's16', 'int16_t', 'short', 's32', 'int32_t', 'int', 'signed int']
    .includes(normalized);
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
export function coreAddressSpaces(mameSrc: string): Record<string, number> {
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

/**
 * Constants another class declares, which the device names with that class's
 * qualifier: MMC3's IRQ counter only runs on `scanline <
 * ppu2c0x_device::BOTTOM_VISIBLE_SCANLINE`, and the cartridge raises the IRQ on
 * `m6502_device::IRQ_LINE`. The device's source includes the header for them
 * but does not compile its class, so the header is read for that class's
 * constants alone. They keep their qualified name, the spelling the handler IR
 * looks them up by, so they cannot shadow one of the device's own.
 *
 * Unresolved, such a name evaluated to an unresolved reference: the comparison
 * was false on every scanline, no MMC3 game ever saw its scanline IRQ, and
 * nothing reported it.
 */
function foreignClassConstants(
  mameSrc: string,
  sources: readonly { file: string; source: string }[],
  classes: ReadonlyMap<string, unknown>,
  known: Record<string, number>,
): Record<string, number> {
  const wanted = new Map<string, Set<string>>();
  for (const { source } of sources) {
    for (const match of stripCppComments(source).matchAll(/\b(\w+)::([A-Z][A-Z0-9_]*)\b/g)) {
      const [, owner, name] = match as unknown as [string, string, string];
      // The runtime numbers CPU input lines its own way (NMI is -1, not
      // MAME's 64), and its table already answers those names.
      const qualified = `${owner}::${name}`;
      if (known[qualified] !== undefined || DEFAULT_CONSTANTS[qualified] !== undefined) continue;
      if (!wanted.has(owner)) wanted.set(owner, new Set());
      wanted.get(owner)!.add(name);
    }
  }
  const found: Record<string, number> = {};
  // A class the sources declare but the device does not derive from answers
  // from its own body: a format names `floppy_image::FF_525` and
  // flopimg.h is one of its own sources.
  for (const [owner, names] of wanted) {
    const declaration = classes.get(owner) as { body?: string } | undefined;
    if (!declaration?.body) continue;
    const values = numericConstants(stripCppComments(declaration.body), known);
    for (const name of names) {
      if (values[name] !== undefined) found[`${owner}::${name}`] = values[name]!;
    }
    wanted.delete(owner);
  }
  if (!wanted.size) return found;
  // Headers the device's sources include, and theirs in turn, a few levels
  // deep: a drive names its media's variants as `floppy_image::SSSD`, which
  // flopimg.h declares and floppy.cpp reaches only through a format header.
  const headers = new Set<string>();
  const includesOf = (file: string, source: string): string[] =>
    [...source.matchAll(/^\s*#include\s+"([^"]+\.h)"/gm)].flatMap(include => [
      join(mameSrc, dirname(file), include[1]!),
      join(mameSrc, 'src/devices', include[1]!),
      join(mameSrc, 'src/mame', include[1]!),
      // MAME's own include path carries src/lib too.
      join(mameSrc, 'src/lib', include[1]!),
    ].find(candidate => existsSync(candidate)) ?? []);
  // From the files as written: a preprocessed source has already dropped the
  // includes it did not follow.
  let frontier = sources.flatMap(({ file, source }) => includesOf(file,
    existsSync(join(mameSrc, file)) ? readFileSync(join(mameSrc, file), 'utf8') : source));
  for (let depth = 0; depth < 3 && frontier.length; depth++) {
    const next: string[] = [];
    for (const header of frontier) {
      if (headers.has(header)) continue;
      headers.add(header);
      next.push(...includesOf(relative(mameSrc, header), readFileSync(header, 'utf8')));
    }
    frontier = next;
  }
  for (const header of headers) {
    const unit = parseMameAst([{ file: relative(mameSrc, header), source: readFileSync(header, 'utf8') }]);
    for (const declaration of unit.units.flatMap(entry => entry.classes)) {
      const names = wanted.get(declaration.name);
      if (!names) continue;
      // Comments out first: flopimg.h annotates every variant with a quoted,
      // comma-bearing comment, and read with them every enumerator after the
      // first in a group went missing.
      const values = numericConstants(stripCppComments(declaration.body), known);
      for (const name of names) {
        if (values[name] !== undefined) found[`${declaration.name}::${name}`] = values[name]!;
      }
    }
  }
  return found;
}

function numericConstants(
  source: string,
  /** Constants already known, which the source's own values may be spelled in. */
  seed: Record<string, number> = {},
): Record<string, number> {
  const expressions = new Map<string, string>();
  // The value runs to the end of the line less any comment. Stopping at the
  // first `/` instead cut every dividing macro in half -- VLM5030's
  // `#define IP_SIZE_NORMAL (160/FR_SIZE)` read as `(160` -- and its speed
  // table then gave every frame zero samples.
  for (const match of source.matchAll(/^\s*#define\s+(\w+)\s+([^\r\n]+)/gmi)) {
    const value = match[2]!.replace(/\/\/.*$|\/\*.*?\*\//g, '').trim();
    if (value) expressions.set(match[1]!, value);
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
  // Both classic enums and scoped C++11 enums contribute executable values.
  // Scoped enumerators keep their `type::name` spelling in handler IR, so
  // retain that alias as well as the bare name used by initializer expressions.
  for (const declaration of source.matchAll(
    /\benum\s+(?:(class|struct)\s+)?(\w+)?(?:\s*:\s*[\w:]+)?\s*\{([^{}]+)\}/g,
  )) {
    const scoped = Boolean(declaration[1]);
    const enumName = declaration[2];
    let previous: string | undefined;
    for (const raw of splitMameArgs(declaration[3]!)) {
      const entry = raw.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '').trim();
      if (!entry) continue;
      const match = /^(\w+)(?:\s*=\s*([\s\S]+))?$/.exec(entry);
      if (!match) continue;
      const expression = match[2]?.trim() ?? (previous ? `${previous} + 1` : '0');
      expressions.set(match[1]!, expression);
      if (scoped && enumName) expressions.set(`${enumName}::${match[1]!}`, match[1]!);
      previous = match[1]!;
    }
  }
  const constants: Record<string, number> = { ...seed };
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
    /\bstatic\s+(?:const\s+)?\w+\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]+)\}\s*;/g,
  )) {
    if (!/^static\s+const\b/.test(match[0])) {
      const uses = source.replace(match[0], '');
      const name = match[1]!;
      if (new RegExp(`\\b${name}\\s*\\[[^\\]]+\\]\\s*(?:[+*/&|^-]?=|\\+\\+|--)`).test(uses) ||
          new RegExp(`(?:&|\\+\\+|--)\\s*${name}\\b`).test(uses) ||
          new RegExp(`\\b${name}\\b(?!\\s*\\[)`).test(uses)) continue;
    }
    tables[match[1]!] = {
      values: splitMameArgs(match[2]!).map(value => value.trim()),
    };
  }
  // A table of C strings: the CRT format's `static char const *const
  // CRT_C64_SLOT_NAMES[] = { "standard", UNSUPPORTED, "final3", ... }`, the
  // card each hardware type needs. Its entries keep their spelling; a macro
  // among them is expanded where the table is used.
  for (const match of source.matchAll(
    /\bstatic\s+(?:const\s+)?char\s+(?:const\s*)?\*\s*(?:const\s+)?(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]+)\}\s*;/g,
  )) {
    tables[match[1]!] ??= {
      values: splitMameArgs(match[2]!).map(value => value.trim()).filter(Boolean),
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
    const index = Number(evalExpr(pair[1]!, constants));
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
/**
 * File-scope `static const struct T name = { ... };` instances the device's
 * own source refers to, as constant members with their initializer applied.
 *
 * MAME keeps LPC coefficient sets this way: VLM5030 starts with
 * `m_coeff = &vlm5030_coeff;` and then reads `m_coeff->ktable[i][...]` for
 * every frame. Only a set the non-table sources mention is lifted, so the
 * dozen unrelated TI sets in the same header stay out of the device.
 */
function staticStructConstants(
  sources: readonly { file: string; source: string }[],
  structFields: Map<string, GeneratedStructField[]>,
  constants: Record<string, number>,
  existing: readonly GeneratedDeviceMember[],
): GeneratedDeviceMember[] {
  const code = sources.filter(({ file }) => !file.endsWith('.hxx'))
    .map(({ source }) => stripCppComments(source)).join('\n');
  const all = sources.map(({ source }) => stripCppComments(source)).join('\n');
  const macros = objectMacros(all);
  const expand = (text: string, depth = 0): string => depth > 8 ? text
    : text.replace(/\b[A-Z_][A-Z0-9_]*\b/g, name =>
      macros.has(name) && constants[name] === undefined ? expand(macros.get(name)!, depth + 1) : name);
  const lifted: GeneratedDeviceMember[] = [];
  for (const match of all.matchAll(/\bstatic\s+const\s+struct\s+(\w+)\s+(\w+)\s*=\s*\{/g)) {
    const [, type, name] = match;
    const fields = structFields.get(type!);
    if (!fields || !new RegExp(`\\b${name}\\b`).test(code)) continue;
    if (existing.some(member => member.name === name) || lifted.some(member => member.name === name)) continue;
    const body = expand(braceBody(all, match.index! + match[0].length - 1, name));
    const value = (item: string): unknown => item.startsWith('{')
      ? initializerItems(item.slice(1, -1)).map(value)
      : evalExpr(item, constants) ?? 0;
    // C lets an aggregate stop early; the fields it leaves out are zero, which
    // is what the struct's own shape already builds.
    const items = initializerItems(body);
    if (items.length > fields.length) continue;
    lifted.push({
      name: name!,
      valueType: type!,
      fields,
      initialValue: Object.fromEntries(items.map((item, index) => [fields[index]!.name, value(item)])),
    });
  }
  // A class's static array of structs, defined out of the class:
  // `const d64_format::format d64_format::file_formats[] = { {...}, {} };`.
  // Each element initialises its fields in order; a field it leaves out, and
  // the empty terminator, are zero.
  for (const match of all.matchAll(/(?:^|[;}\s])const\s+(?:struct\s+)?([\w:]+)\s+(?:\w+::)+(\w+)\s*\[\s*\w*\s*\]\s*=\s*\{/g)) {
    const [, type, name] = match;
    const fields = structFields.get(type!.split('::').at(-1)!);
    if (!fields || !new RegExp(`\\b${name}\\b`).test(code)) continue;
    if (existing.some(member => member.name === name) || lifted.some(member => member.name === name)) continue;
    const body = expand(braceBody(all, match.index! + match[0].length - 1, name));
    const elements = initializerItems(body).filter(item => item.startsWith('{'));
    const records = elements.map(element => {
      const items = initializerItems(element.slice(1, -1));
      return Object.fromEntries(fields.map((field, index) => [field.name,
        items[index] === undefined ? 0 : evalExpr(items[index]!, constants) ?? 0]));
    });
    lifted.push({ name: name!, valueType: type!, fields, arrayLength: records.length, initialValues: records });
  }
  return lifted;
}

export function structDeclarations(
  sources: readonly { file: string; source: string }[],
  constants: Record<string, number>,
): Map<string, GeneratedStructField[]> {
  const structs = new Map<string, GeneratedStructField[]>();
  for (const { source } of sources) {
    // Named (`struct SOUND { ... };`) and anonymous (`struct { ... }
    // m_snd_control;`) alike. MAME uses the second form for a one-off block of
    // device state, and without a shape every field assignment into it failed:
    // the Game Boy's sound chip could not even start.
    // Comments out first: flopimg.h annotates each field of a grouped
    // declaration (`int type, //!< An opcode`), and read with them the struct
    // lost every field after the first comment.
    for (const declaration of structBlocks(stripCppComments(source))) {
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
    for (const statement of scalars.matchAll(
      // A builtin may take several words (`unsigned short energytable[...]`)
      // and a table several bounds (`int ktable[MAX_K][MAX_SCALE]`); the LPC
      // coefficient struct uses both, and missing either dropped the field.
      // Several may share a line (`int x; int y;` in the AVG's vgvector), so a
      // field starts at a line or after the previous one's semicolon. Modern
      // MAME also initialises fields in the declaration and groups them --
      // the 64H156's `int state = 0, next_state = 0;` -- and a field the
      // pattern missed was simply absent from the struct. The type and the
      // name are apart by a space or a `*`: without that, `unsigned short
      // energytable[...]` backtracked into a field `e` of type `energytabl`.
      /(?:^|(?<=;))\s*(?:const\s+)?((?:(?:unsigned|signed|long|short)\s+)*[\w:]+(?:\s*<[^;{}()]*?>)?)(?:\s+|\s*(?=\*))((?:\*\s*)?[A-Za-z_]\w*\s*(?:\[[^\]]+\]\s*)*(?:=[^,;{}]*|\{[^{}]*\})?(?:\s*,\s*(?:\*\s*)?[A-Za-z_]\w*\s*(?:\[[^\]]+\]\s*)*(?:=[^,;{}]*|\{[^{}]*\})?)*)\s*;/gm,
    )) {
      const valueType = statement[1]!.replace(/\s+/g, ' ');
      if (/^(?:return|using|typedef|friend|enum|struct|class|union)$/.test(valueType)) continue;
      // A struct field is as wide as its type, exactly like a plain member.
      // Dropping the width let a `uint8_t` counter reach -1 instead of
      // wrapping to 0xff, and the DPC's `if (low == 0xff)` carry never fired.
      // Only an integral type has one: an attotime narrowed to 32 bits would
      // truncate every timestamp it held.
      const integral = /^(?:(?:unsigned|signed|long|short)\s*)*(?:u?int(?:8|16|32|64)?(?:_t)?|[us](?:8|16|32|64)|bool|char|short|long|unsigned|signed|offs_t|pen_t)$/
        .test(valueType);
      const bits: 8 | 16 | 32 = /64/.test(valueType) ? 32
        : /(?:^|[^\d])32/.test(valueType) || valueType === 'int' ? 32
          : /16|\bshort\b/.test(valueType) ? 16
            : /8|bool|char/.test(valueType) ? 8
              : 32;
      const signed = /^(?:int|s|short|char|long)/.test(valueType) && !/^(?:uint|unsigned)/.test(valueType);
      for (const declarator of splitMameArgs(statement[2]!)) {
        const field = /^(\*\s*)?([A-Za-z_]\w*)\s*(?:\[\s*([^\]]+)\s*\])?/.exec(declarator.trim());
        if (!field) continue;
        const length = bound(field[3]);
        // A pointer field (desc_s's `const uint8_t *data`) is an address, never
        // narrowed to its pointee's width.
        const pointer = Boolean(field[1]);
        fields.push({
          name: field[2]!,
          ...(length !== undefined ? { length } : {}),
          ...(integral && !pointer ? { bits, ...(signed ? { signed } : {}) } : { valueType: pointer ? `${valueType}*` : valueType }),
        });
      }
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
