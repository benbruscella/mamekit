import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { basename, dirname, extname, join, relative } from 'node:path';
import { evalExpr, expandConstexprCalls, parseAddressMaps, parseEnumConstants, parseConstexprFunctions, parseInputPorts, parseTextMacros, resolveLiteralConditionals, type InputPortsDef } from '../kg/parse.ts';
import type { BoardSourceRef, GeneratedExpression, GeneratedHandlerOperation, GeneratedHandlerProgram } from '../ir/board.ts';
import { HOST_INPUT_LINES } from '../ir/board.ts';
import {
  memberMacroParameters,
  parseMameAst,
  parseMameConstructors,
  splitMameArgs,
  type MameClass,
  type MameFunction,
} from './ast.ts';
import { normalizeMameExecutionSource } from './execution-source.ts';
import { braceBody, initializerItems, objectMacros, stripCppComments } from './initializer.ts';
import { isWideType, markWidePrecision } from './wide-precision.ts';
import { monomorphizeClassTemplate } from './function-template.ts';
import { compileMameHandler } from './handler-ir.ts';
import { walkExpressions, walkOperations } from '../ir/walk.ts';
import { cppDefaultArgument, DEFAULT_CONSTANTS, executeGeneratedProgram } from '../ir/execute.ts';
import {
  collectFunctionMacros,
  collectMemberCallMacros,
  collectDynamicMacros,
  referenceAccessorMacros,
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
import { renameShadowedLocals } from '../ir/scope.ts';
import { preprocessedDeviceTransform } from './preprocessed-device.ts';
import { CPreprocessor } from './c-preprocessor.ts';
import { generatedInclude } from './mame-build.ts';
import { lowerMemberPointerValues } from './member-pointers.ts';
import { integerType, rewriteTypeTemplateCalls, typeInstanceName, typePositions, type DeductionScope, type TypeTemplate } from './template-deduction.ts';

/**
 * A cassette image format a cassette device mounts (lib/formats). A legacy
 * wave filler reports a sample count and fills 16-bit PCM at its own rate
 * (cbm_tap.cpp); a format with its own identify and load reads the file into
 * the host's cassette image itself (wavfile.cpp).
 */
export type CassetteImageFormat = {
  extension: string;
  definition: GeneratedDeviceDefinition;
  mountMethod: string;
  /** The CASSETTE_FORMATLIST the format came from, when a machine picks one with set_formats. */
  list?: string;
} & (
  | { sizeMethod: string; fillMethod: string; sampleRate: number }
  | { identifyMethod: string; loadMethod: string });

export interface GeneratedDeviceMember {
  name: string;
  valueType: string;
  bits?: 1 | 8 | 16 | 32;
  signed?: boolean;
  initial?: number;
  /** A `const char *` member's string literal initializer. */
  initialText?: string;
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
    /** A `required_ioport_array`'s element tags: `m_joy(*this, "JOY%u", 1U)` is JOY1, JOY2. */
    tags?: string[];
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
  /**
   * A member held by value whose type is a class the device declares inside
   * itself -- the Z80 PIO's `pio_port m_port[2]` -- named by the allocation
   * that builds each one. Its methods and state are its own; left a number,
   * `m_port[i].data_write(data)` was a call on nothing, silently.
   */
  object?: string;
  /** The owner's constructor arguments for that object, as written: `*this`, `0x7f`. */
  objectArgs?: string[];
  /**
   * The object is built by the owner's own constructor (`m_fm(intf)` hands
   * it a constructor parameter), so it is not built before that runs.
   */
  objectConstructed?: boolean;
  /**
   * The member holds, refers or points to an object of this plain C++ class
   * (one built from its source constructor, not a device): ymfm's `m_regs`
   * (`opll_registers &`), `m_channel[i]`, `m_op[i]`. Emitted code calls its
   * methods directly.
   */
  objectType?: string;
  /**
   * Storage for an uninitialised C++ local kept from call to call
   * (lowerStructLocals): it carries nothing between calls, so a save state
   * does not hold it.
   */
  scratch?: boolean;
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
  /** 64 only lays out a union (the Z8002's `uint64_t Q[4]`); arithmetic stays at 32. */
  bits?: 1 | 8 | 16 | 32 | 64;
  signed?: boolean;
  fields?: GeneratedStructField[];
  /** A union: `fields` overlap, each laid out from the union's first byte. */
  union?: true;
  /** The value its declaration gives a scalar field: nes_defs.h's `u16 lfsr = 1;`. */
  initial?: number;
}

export interface GeneratedDeviceCallback {
  signal: string;
  member: string;
  slots: number;
  initial?: number;
  /** Accessors bound to one element of the array: `porta_r` is slot 0. */
  aliases?: { signal: string; slot: number }[];
}

export interface GeneratedDeviceTimer {
  member: string;
  /** Absent for `timer_alloc(timer_expired_delegate())`: nothing calls back. */
  callback?: string;
  /**
   * A member array of timers, one allocated per element in a loop: the FM
   * chips' `m_timer[tnum] = timer_alloc(FUNC(...), this)` over `m_timer[2]`.
   */
  count?: number;
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
  returnWidth?: 8 | 16 | 32 | -8 | -16 | -32;
}

export interface GeneratedDeviceStateEntry {
  index: number;
  name: string;
  mask?: number;
  import?: true;
  export?: true;
  read: string;
  write: string;
}

export interface GeneratedDeviceDefinition {
  schemaVersion: 1;
  /** MAME's own name for the device: DEFINE_DEVICE_TYPE's full name ("Commodore 1530 Datassette"). */
  description?: string;
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
   * The power-on value of each input port the device declares itself
   * (`device_input_ports`), by its tag: a cartridge's DIP switches exist only
   * once that cartridge is chosen, so the machine's own ports never name them.
   */
  inputDefaults?: Record<string, number>;
  /**
   * MAME `device_image_interface`: the device reads a file the host mounts,
   * through the interface's own calls (`length`, `fread`, `fseek`,
   * `is_filetype`), as the C64's quickload reads a .prg.
   */
  imageInterface?: true;
  constants: Record<string, number>;
  /**
   * MAME `device_state_interface`: the registers the core publishes with
   * `state_add(index, name, lvalue)` in device_start, read and written through
   * generated `__state_read_N`/`__state_write_N` methods over that lvalue.
   * `state_int`/`set_state_int` (a driver's protection read of `Z80_HL`, a
   * snapshot loader) go through them, with the core's own state_export before
   * a read and state_import after a write where `.callexport()` and
   * `.callimport()` say so.
   */
  stateEntries?: GeneratedDeviceStateEntry[];
  /**
   * A core that keeps its place between an instruction's cycles in an
   * `m_inst_substate` member (the 6502 family checks its icount before every
   * cycle), so the board brings device time up to where it stands when a
   * device asks the time mid-instruction (generated-board catchUpDeviceTime).
   */
  suspendsMidInstruction?: true;
  members: GeneratedDeviceMember[];
  callbacks: GeneratedDeviceCallback[];
  timers: GeneratedDeviceTimer[];
  methods: GeneratedDeviceMethod[];
  /** Source constructors for dynamically allocated helper objects. */
  allocations?: Record<string, GeneratedDeviceDefinition>;
  construct?: string;
  /** A constructor the configuration's argument reaches instead of the clock one (runtime GeneratedDeviceDefinition). */
  clockConstructor?: { method: string; clock: number };
  /**
   * Every struct type the device declares, keyed by type name.
   *
   * A `SOUND &` parameter names its type and nothing else, so this is what
   * lets an emitted `snd.frequency_counter = ...` narrow to the eleven-bit
   * field MAME declared rather than leaving that to a runtime accessor.
   */
  structs?: Record<string, GeneratedStructField[]>;
  /**
   * The inline methods a struct declares, by struct type: the AY-3-8910's
   * `tone_t::set_period(fine, coarse)`. Each runs with the struct value as its
   * members.
   */
  structMethods?: Record<string, { name: string; parameters: string; program: GeneratedHandlerProgram }[]>;
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
    /**
     * Cards shipped as modules of their own, loaded when a machine selects
     * one (option -> module path beside the slot's). A slot with hundreds of
     * boards cannot carry every one inline.
     */
    cards?: Record<string, string>;
    /** The interface every card inherits, kept once here (src/ir/card-interface.ts). */
    cardInterface?: { className: string; methods: GeneratedDeviceDefinition['methods'] };
    /** Options MAME declares whose card did not compile, and why. */
    unsupported?: Record<string, string>;
  };
  /** A card whose interface methods are its slot's `cardInterface`. */
  inheritsCardInterface?: boolean;
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
      /** Installed only while the slot holds one of these cards. */
      cards?: string[];
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
    ram?: true;
    /**
     * The address-map method that fills the space, for a space MAME maps
     * rather than backs with plain RAM: the 68705's ports, timer, RAM and
     * EPROM. The host runs it against a map builder, as MAME does.
     */
    map?: string;
    /**
     * A space with no map of its own, which the device fills itself at
     * start: `space(0).install_rom(...)` over a region (a YM2610's ADPCM).
     */
    installed?: true;
    /** Declared only when the owner configures a map for it (has_configured_map). */
    conditional?: true;
    /** The address_space_config's byte order (`ENDIANNESS_BIG`). */
    endianness?: 'big' | 'little';
    /**
     * Its address shift: -1 a word-addressed space (TMS320C1x), +3 a
     * bit-addressed one (TMS34010), 0 one address per byte.
     */
    addressShift?: number;
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
    /** Its tag below this device, as its finder names it (`vrc7snd`). */
    tag?: string;
    definition: GeneratedDeviceDefinition;
    /**
     * The child's device_delegates this device's own methods fill, by
     * delegate member: the ZX Interface 2 hands its GENERIC_CARTSLOT
     * `set_device_load(FUNC(spectrum_intf2_device::cart_load))`.
     */
    delegateTargets?: Record<string, string>;
    /** Child devcb signal -> this device's method it is `.set()` to. */
    callbackTargets?: Record<string, string>;
    /**
     * The option table a child slot's machine config names, compiled:
     * `GENERIC_CARTSLOT(config, m_cart, generic_plain_slot, ...)`.
     */
    slotOptions?: string;
    /**
     * The child's own clock, where its constructor gives one. A child added
     * with no clock at all is 0, as in MAME: only DERIVED_CLOCK takes the
     * owner's, and that is left out so the owner's is used.
     */
    clock?: number;
    /**
     * Where a sound child's outputs go, as its `add_route` calls say: the
     * output (-1 for ALL_OUTPUTS), the speaker, and MAME's gain.
     */
    routes?: { output: number; target: string; gain: number }[];
    /**
     * A `required_device_array` builds one child per element, each tagged
     * from the finder's format: the Z80 CTC's `m_channel(*this, "ch%u", 0U)`
     * is `ch0` to `ch3`. The member then holds the array.
     */
    tags?: string[];
    /**
     * What device_add_mconfig sets on each built child, by element: the
     * CTC numbers its channels with `m_channel[ch]->m_index = ch`, and a
     * channel's vector and zero-crossing output both depend on it.
     */
    configured?: Record<string, number>[];
  }[];
  /** Children its machine config builds that did not lower, so are not built. */
  omittedChildren?: { member: string; type: string; diagnostics: number }[];
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
  /** `required_region_ptr<T>`: the region, indexed in T's width (elementBytes, when wider than a byte). */
  | { kind: 'region'; name: string; elementBytes?: 2 | 4 }
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
 *
 * A few devices only make sense after the C preprocessor has run: Midway's
 * T-Unit video picks its pixel extractor with `#if defined(LSB_FIRST)` and
 * declares its methods through TMS34010 header macros, and the 6805's opcode
 * handlers are macro heads in the `6805ops.hxx` its core includes. Their
 * sources say so by including a file that is not a header. A device like that
 * which does not lower as written is compiled again through the preprocessor
 * (preprocessedSources), and the result kept when it lowers better. A device
 * that lowers as written is never preprocessed.
 */
export function compileMameDevice(
  mameSrc: string,
  definition: MameHardwareDefinition,
  type = definition.type,
  /** Types already being compiled, so a device cycle cannot recurse forever. */
  compiling: ReadonlySet<string> = new Set(),
  options: DeviceCompileOptions = {},
): GeneratedDeviceDefinition {
  const device = compileMameDeviceReading(mameSrc, definition, type, compiling, options);
  if (!options.transformSource) {
    resolveIntegerReferenceOverloads(device);
    attachLibraryFunctions(mameSrc, device);
    attachStateEntries(mameSrc, device);
    markDeviceWidePrecision(mameSrc, device);
    if (device.sourceFiles.some(file => /\.h$/.test(file) && existsSync(join(mameSrc, file)) &&
      /^\s*(?:int|u\d+|uint\d+_t)\s+(?:\w+\s*,\s*)*m_inst_substate\b/m.test(readFileSync(join(mameSrc, file), 'utf8')))) {
      device.suspendsMidInstruction = true;
    }
  }
  return device;
}

/**
 * MAME's own library inlines every device reaches through emu.h, read from
 * their headers: endianness.h's `template <typename T> constexpr T
 * BYTE4_XOR_BE(T a) { return a ^ NATIVE_ENDIAN_VALUE_LE_BE(3,0); }` and the
 * rest of its family, the host taken as little-endian, as MAME's LSB_FIRST
 * build is. The Z8002 indexes its register file with them (`RW(n)` is
 * `m_regs.W[BYTE4_XOR_BE(n)]`); unresolved, every register write was lost.
 */
// eminline.h's portable multiply and divide helpers too (`mulu_32x32`, which
// the TMS34010's MPYU uses): each sits under `#ifndef name`, the C version an
// asm one only replaces with the same result.
const LIBRARY_INLINE_HEADERS = ['src/lib/util/endianness.h', 'src/osd/osdcomm.h', 'src/osd/eminline.h'];
type LibraryInline = { parameters: string; body: string; file: string; line: number; returnType?: string };
const LIBRARY_INLINES = new Map<string, Map<string, LibraryInline>>();

function libraryInlines(mameSrc: string): Map<string, LibraryInline> {
  const cached = LIBRARY_INLINES.get(mameSrc);
  if (cached) return cached;
  const found = new Map<string, LibraryInline>();
  for (const file of LIBRARY_INLINE_HEADERS) {
    const path = join(mameSrc, file);
    if (!existsSync(path)) continue;
    const lines = readFileSync(path, 'utf8').split('\n');
    const endian = (body: string) => body.replace(/\bNATIVE_ENDIAN_VALUE_LE_BE\s*\(\s*([^,()]+)\s*,\s*([^,()]+)\s*\)/g, '($1)');
    // The host is little-endian, as MAME's LSB_FIRST build: osdcomm.h's
    // `#ifdef LSB_FIRST` branch holds `little_endianize_int32(x) { return x; }`,
    // its `#else` the byte swap. Lines in a branch the build leaves out are not read.
    const active: boolean[] = [];
    const skipping = () => active.some(on => !on);
    const kept: string[] = [];
    lines.forEach((line, index) => {
      const directive = /^\s*#\s*(ifdef|ifndef|if|else|elif|endif)\b\s*(\w*)/.exec(line);
      if (directive) {
        const [, kind, name] = directive;
        if (kind === 'ifdef' || kind === 'ifndef') active.push(name === 'LSB_FIRST' ? kind === 'ifdef' : true);
        else if (kind === 'if') active.push(true);
        else if (kind === 'else' && active.length) active[active.length - 1] = !active[active.length - 1];
        else if (kind === 'endif') active.pop();
        return;
      }
      if (skipping()) return;
      kept.push(line);
      const template = /^\s*template\s*<\s*typename\s+(\w+)\s*>\s*constexpr\s+\1\s+(\w+)\s*\(\s*\1\s+(\w+)\s*\)\s*\{\s*return\s+([^;]+);\s*\}/.exec(line);
      if (template) {
        found.set(template[2]!, { parameters: `int ${template[3]}`, body: `return ${endian(template[4]!)};`, file, line: index + 1 });
        return;
      }
      // A plain one, osdcomm.h's `constexpr uint16_t swapendian_int16(uint16_t
      // val) { return (val << 8) | (val >> 8); }`: its result is its return
      // type's, as C++ converts it.
      const plain = /^\s*constexpr\s+(u?int(?:8|16|32|64)_t)\s+(\w+)\s*\(\s*(u?int(?:8|16|32|64)_t)\s+(\w+)\s*\)\s*\{\s*return\s+([^;]+);\s*\}/.exec(line);
      if (plain) {
        found.set(plain[2]!, { parameters: `${plain[3]} ${plain[4]}`, body: `return (${plain[1]})(${endian(plain[5]!)});`, file, line: index + 1, returnType: plain[1] });
      }
    });
    // A function over several lines, eminline.h's
    // `constexpr uint64_t mulu_32x32(uint32_t a, uint32_t b)\n{\n\treturn ...;\n}`.
    const text = kept.join('\n');
    for (const match of text.matchAll(/^[ \t]*(?:inline\s+)?constexpr\s+(?:inline\s+)?(u?int(?:8|16|32|64)_t)\s+(\w+)\s*\(([^()]*)\)\s*\n\{([\s\S]*?)\n\}/gm)) {
      const [, returnType, name, parameters, body] = match;
      if (found.has(name!)) continue;
      const line = lines.findIndex(candidate => new RegExp(`\\b${name}\\s*\\(`).test(candidate)) + 1;
      // Its result is its return type's, as C++ converts it: mul_32x32's
      // product is a signed 64-bit value.
      const converted = endian(body!).replace(/\breturn\s+([^;]+);/g, `return (${returnType})($1);`);
      found.set(name!, { parameters: parameters!.trim(), body: converted, file, line, returnType });
    }
  }
  LIBRARY_INLINES.set(mameSrc, found);
  return found;
}

/** An integer type's width and signedness, for overload resolution; undefined for any other. */
function integerTypeKey(type: string | undefined): string | undefined {
  const t = type?.replace(/\b(?:const|volatile)\b/g, '').replace(/[&*]/g, '').trim();
  if (!t) return undefined;
  const map: Record<string, string> = {
    u8: 'u8', uint8_t: 'u8', 'unsigned char': 'u8', s8: 's8', int8_t: 's8', char: 's8',
    u16: 'u16', uint16_t: 'u16', 'unsigned short': 'u16', s16: 's16', int16_t: 's16', short: 's16',
    u32: 'u32', uint32_t: 'u32', offs_t: 'u32', unsigned: 'u32', 'unsigned int': 'u32',
    s32: 's32', int32_t: 's32', int: 's32', u64: 'u64', uint64_t: 'u64', s64: 's64', int64_t: 's64',
  };
  return map[t];
}

/**
 * Overloads of one name and arity told apart by an integer reference's width,
 * resolved at compile time by the argument's declared type, as C++ binds a
 * reference: the 68000's `set_16l(u32 &r, u16 v)` keeps r's high half and
 * `set_16l(u16 &r, u16 v)` replaces it. Left to the runtime, which takes the
 * last overload, every `set_16l(m_da[16], m_dbin)` cleared the high word and
 * the reset vector's stack pointer came out 0x1000 instead of 0xff1000.
 * Each overload gets its typed name; the plain name keeps the last one for
 * a caller whose argument's type is not known.
 */
function resolveIntegerReferenceOverloads(device: GeneratedDeviceDefinition): void {
  const declared = (parameters: string) => splitMameArgs(parameters).map(parameter => parameter.trim())
    .filter(parameter => parameter && parameter !== 'void');
  const groups = new Map<string, GeneratedDeviceMethod[]>();
  for (const method of device.methods) {
    const key = `${method.name}/${declared(method.parameters).length}`;
    groups.set(key, [...groups.get(key) ?? [], method]);
  }
  const memberTypes = new Map(device.members.map(member => [member.name, member.valueType]));
  const resolutions = new Map<string, { arity: number; position: number; byType: Map<string, string> }>();
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const lists = group.map(method => declared(method.parameters));
    const positions = lists[0]!.map((_unused, index) => index)
      .filter(index => new Set(lists.map(list => parameterBaseType(list[index] ?? ''))).size > 1);
    if (positions.length !== 1) continue;
    const position = positions[0]!;
    const keys = lists.map(list => /&/.test(list[position]!) ? integerTypeKey(parameterBaseType(list[position]!)) : undefined);
    if (keys.some(key => key === undefined) || new Set(keys).size !== keys.length) continue;
    const name = group[0]!.name;
    const byType = new Map<string, string>();
    group.forEach((method, index) => {
      const typed = typedOverloadName(name, method.parameters);
      byType.set(keys[index]!, typed);
      device.methods.push({ ...method, name: typed });
    });
    resolutions.set(name, { arity: lists[0]!.length, position, byType });
  }
  if (!resolutions.size) return;
  for (const method of device.methods) {
    const localTypes = new Map<string, string>();
    for (const parameter of declared(method.parameters)) localTypes.set(parameterName(parameter), parameterBaseType(parameter));
    walkOperations(method.program.operations, operation => {
      if (operation.op === 'declare' && operation.valueType) localTypes.set(operation.name, operation.valueType);
    });
    const typeOf = (expression: GeneratedExpression): string | undefined => {
      if (expression.kind === 'identifier') return localTypes.get(expression.name) ?? memberTypes.get(expression.name);
      if (expression.kind === 'index' && expression.object.kind === 'identifier') {
        const type = localTypes.get(expression.object.name) ?? memberTypes.get(expression.object.name);
        return type?.replace(/\s*\[[^\]]*\]/g, '').replace(/\*$/, '').trim();
      }
      if (expression.kind === 'cast') return expression.valueType;
      return undefined;
    };
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier') return;
      const resolution = resolutions.get(expression.callee.name);
      if (!resolution || expression.args.length !== resolution.arity) return;
      const key = integerTypeKey(typeOf(expression.args[resolution.position]!));
      const typed = key ? resolution.byType.get(key) : undefined;
      if (typed) (expression.callee as { name: string }).name = typed;
    });
  }
}

/**
 * C's 64-bit promotion over the device's programs (wide-precision.ts): its
 * 64-bit members, the library inlines and its own methods that return 64 bits.
 */
function markDeviceWidePrecision(mameSrc: string, device: GeneratedDeviceDefinition): void {
  const members = new Set(device.members.filter(member => isWideType(member.valueType)).map(member => member.name));
  const calls = new Set([...libraryInlines(mameSrc)].filter(([, inline]) => isWideType(inline.returnType)).map(([name]) => name));
  for (const file of device.sourceFiles) {
    const path = join(mameSrc, file);
    if (!existsSync(path)) continue;
    for (const match of stripCppComments(readFileSync(path, 'utf8')).matchAll(
      /(?:^|[\s;{}])(?:(?:static|inline|constexpr|virtual)\s+)*(?:std::)?(?:u?int64_t|u64|s64)\s+(?:\w+::)*(\w+)\s*\(/g)) {
      calls.add(match[1]!);
    }
  }
  const memberTypes = new Map(device.members.map(member => [member.name, member.valueType]));
  markWidePrecision(device.methods, { members, memberTypes, calls });
}

/** A library inline the device calls and does not define, added as one of its methods. */
function attachLibraryFunctions(mameSrc: string, device: GeneratedDeviceDefinition): void {
  const inlines = libraryInlines(mameSrc);
  if (!inlines.size) return;
  const defined = new Set(device.methods.map(method => method.name));
  const wanted = new Set<string>();
  for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'identifier' &&
          inlines.has(expression.callee.name) && !defined.has(expression.callee.name)) wanted.add(expression.callee.name);
    });
  }
  // An inline that calls another brings it too (little_endianize_int32's
  // big-endian branch is swapendian_int32).
  const pending = [...wanted];
  while (pending.length) {
    const name = pending.shift()!;
    if (defined.has(name)) continue;
    defined.add(name);
    const inline = inlines.get(name)!;
    const program = compileMameHandler(inline.body);
    device.methods.push({ name, parameters: inline.parameters, program, source: { file: inline.file, line: inline.line } });
    walkExpressions(program.operations, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'identifier' &&
          inlines.has(expression.callee.name) && !defined.has(expression.callee.name)) pending.push(expression.callee.name);
    });
  }
}

/** MAME's generic state indices (emu/distate.h): STATE_GENPC is -1. */
function distateIndices(mameSrc: string): Record<string, number> {
  const path = join(mameSrc, 'src/emu/distate.h');
  const indices: Record<string, number> = {};
  if (!existsSync(path)) return indices;
  for (const match of readFileSync(path, 'utf8').matchAll(/\b(STATE_\w+)\s*=\s*(-?\d+)/g)) {
    indices[match[1]!] = Number(match[2]);
  }
  return indices;
}

/**
 * The core's `state_add` table, read from its own lowered device_start (or
 * the init() it calls): the
 * index each register is published under, its name, `.mask(n)`, whether
 * `.callimport()`/`.callexport()` follow, and the lvalue it names, which
 * becomes a generated reader and writer. An entry over something that is no
 * lvalue (a lambda) is left out; nothing reads it as a register.
 */
function attachStateEntries(mameSrc: string, device: GeneratedDeviceDefinition): void {
  // device_start's own, or a helper it calls: the 6502 family registers its
  // table in init(), the Z8002 in register_debug_state().
  const registers = (method: GeneratedDeviceMethod) => {
    let found = false;
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'identifier' && /^state_add\b/.test(expression.callee.name)) found = true;
    });
    return found;
  };
  const starts = device.methods.filter(registers);
  if (!starts.length) return;
  const indices = { ...distateIndices(mameSrc), ...device.constants };
  const indexOf = (expression: GeneratedExpression): number | undefined => {
    if (expression.kind === 'number') return expression.value;
    if (expression.kind === 'identifier') return indices[expression.name.split('::').at(-1)!];
    if (expression.kind === 'unary' && expression.operator === '-') {
      const value = indexOf(expression.operand);
      return value === undefined ? undefined : -value;
    }
    if (expression.kind === 'binary' && expression.operator === '+') {
      const left = indexOf(expression.left), right = indexOf(expression.right);
      return left === undefined || right === undefined ? undefined : left + right;
    }
    return undefined;
  };
  const entries: GeneratedDeviceStateEntry[] = [];
  const done = new Set<GeneratedExpression>();
  for (const start of starts) {
    walkExpressions(start.program.operations, expression => {
      if (expression.kind !== 'call' || done.has(expression)) return;
      const flags: { name: string; args: GeneratedExpression[] }[] = [];
      let bottom: GeneratedExpression = expression;
      while (bottom.kind === 'call' && bottom.callee.kind === 'member') {
        flags.push({ name: bottom.callee.property, args: bottom.args });
        bottom = bottom.callee.object;
      }
      if (bottom.kind !== 'call' || bottom.callee.kind !== 'identifier' ||
          !/^state_add\b/.test(bottom.callee.name) || done.has(bottom)) return;
      done.add(bottom);
      const [indexExpression, nameExpression, target] = bottom.args;
      if (!indexExpression || !target || !['identifier', 'member', 'index'].includes(target.kind)) return;
      const index = indexOf(indexExpression);
      if (index === undefined) return;
      const position = entries.length;
      const mask = flags.find(flag => flag.name === 'mask')?.args[0];
      const entry: GeneratedDeviceStateEntry = {
        index,
        name: nameExpression?.kind === 'string' ? nameExpression.value : String(index),
        ...(mask?.kind === 'number' ? { mask: mask.value } : {}),
        ...(flags.some(flag => flag.name === 'callimport') ? { import: true as const } : {}),
        ...(flags.some(flag => flag.name === 'callexport') ? { export: true as const } : {}),
        read: `__state_read_${position}`,
        write: `__state_write_${position}`,
      };
      entries.push(entry);
      device.methods.push(
        { name: entry.read, parameters: '', source: start.source,
          program: { operations: [{ op: 'return', value: target }], diagnostics: [] } },
        { name: entry.write, parameters: 'u64 value', source: start.source,
          program: { operations: [{ op: 'assign', target, operator: '=', value: { kind: 'identifier', name: 'value' } }], diagnostics: [] } },
      );
    });
  }
  if (entries.length) device.stateEntries = entries;
}

function compileMameDeviceReading(
  mameSrc: string,
  definition: MameHardwareDefinition,
  type = definition.type,
  compiling: ReadonlySet<string> = new Set(),
  options: DeviceCompileOptions = {},
): GeneratedDeviceDefinition {
  const device = compileMameDeviceSource(mameSrc, definition, type, compiling, options);
  if (options.transformSource) return device;
  // A device whose classes a macro declares has none until the preprocessor
  // runs: DISCRETE's ~80 node classes are DISCRETE_CLASS_STEP_RESET(...) and
  // friends, and read as written it compiled with no node at all.
  const declaresClasses = macroDeclaresClasses(mameSrc, device.sourceFiles);
  // Or whose methods a macro heads: mcs48.cpp writes its 256 opcode handlers
  // `OPHANDLER( add_a_r0 ) { ... }`, `void mcs48_cpu_device::add_a_r0()`
  // once expanded, and as written defines none of them.
  const definesMethods = macroDefinesMethods(mameSrc, device.sourceFiles);
  const transformSource = preprocessedSources(mameSrc, device, definesMethods);
  // Or one whose code names a macro only another directory's header defines:
  // the Namco 54xx writes `NAMCO_54XX_0_DATA(base)`, which is discrete.h's
  // NODE_RELATIVE, a node number only once expanded.
  // Or calls one itself, which as written is a call naming no function:
  // Galaxian's sound board writes `m_discrete->write(NODE_RELATIVE(GAL_INP_BG_DAC,
  // offset), data)`.
  const foreignNames = transformSource?.foreignNames ?? new Set<string>();
  let callsForeign = false;
  for (const method of foreignNames.size ? device.methods : []) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'call' && expression.callee.kind === 'identifier' && foreignNames.has(expression.callee.name)) callsForeign = true;
    });
  }
  const callsForeignMacros = transformSource?.foreignMacros === true || callsForeign;
  // Or one whose source includes something that is not a header: an opcode
  // file (`6805ops.hxx`, `m6809.hxx`) is code meant to be read after the
  // preprocessor. As written, a 6805's handlers are macro heads that define
  // nothing, and once its member-pointer dispatch lowered, that compiled with
  // no diagnostic at all -- and no instructions.
  const readAfterPreprocessor = transformSource?.nonHeader === true;
  if (!device.summary.diagnostics && !declaresClasses && !callsForeignMacros && !readAfterPreprocessor && !definesMethods) return device;
  if (!transformSource) return device;
  const preprocessed = compileMameDeviceSource(mameSrc, definition, type, compiling, { ...options, transformSource });
  // Read after the preprocessor because of an include, it is taken when it
  // finds code the plain reading does not: a 6805's handlers are macro heads
  // until expanded (611 methods against 148).
  // And on a tie when that include defines macros: the plain reading of
  // z80.cpp never sees z80.inc's register macros (`PC`, `A`), compiles them as
  // bare names with no diagnostic, and ties on the method count. An include
  // that is data (nes_pcb.hxx) is no reason to leave the plain reading, which
  // keeps the NES slot's inline header methods.
  const findsMore = (readAfterPreprocessor && (preprocessed.methods.length > device.methods.length ||
      (transformSource?.nonHeaderMacros === true && preprocessed.methods.length === device.methods.length))) ||
    (definesMethods && preprocessed.methods.length > device.methods.length);
  if (!(preprocessed.summary.diagnostics < device.summary.diagnostics ||
    ((declaresClasses || callsForeignMacros || findsMore) && preprocessed.summary.diagnostics <= device.summary.diagnostics))) {
    // Kept as written although the preprocessor found more code: say so, with
    // what failed, rather than ship a device that silently lacks it (the V30's
    // opcode handlers are OP() heads that only the preprocessed reading has).
    if (preprocessed.methods.length > device.methods.length && preprocessed.summary.diagnostics) {
      const failing = preprocessed.methods.filter(method => method.program.diagnostics.length);
      console.warn(`  ! ${type}: the preprocessed reading finds ${preprocessed.methods.length} methods against ${device.methods.length} ` +
        `but ${preprocessed.summary.diagnostics} diagnostics, so it is not used: ` +
        failing.slice(0, 4).map(method => `${method.name} (${String(method.program.diagnostics[0]).slice(0, 120)})`).join('; '));
    }
    return device;
  }
  // The preprocessor consumed the #define lines its reading expanded, but they
  // are the source's constants still: the VLM5030's `IP_SIZE_NORMAL
  // (160/FR_SIZE)`, which its speed table and the board read by name.
  for (const [name, value] of Object.entries(device.constants)) preprocessed.constants[name] ??= value;
  return preprocessed;
}

/**
 * Each device type a source declares, as a number: MAME compares `type()`
 * against them (`chip_type == AY8914` in the AY-3-8910's register read), and
 * the device's own `type()` answers the number of its own name.
 */
export function deviceTypeToken(name: string): number {
  let hash = 0x811c9dc5;
  for (const char of name) hash = Math.imul(hash ^ char.charCodeAt(0), 0x01000193) >>> 0;
  return hash;
}

function deviceTypeTokens(sources: readonly { source: string }[]): Record<string, number> {
  return Object.fromEntries(sources.flatMap(({ source }) =>
    [...source.matchAll(/\bDECLARE_DEVICE_TYPE\s*\(\s*(\w+)\s*,/g)].map(match => [match[1]!, deviceTypeToken(match[1]!)])));
}

/** Whether a function-like macro in these files declares a class with a body. */
function macroDeclaresClasses(mameSrc: string, files: readonly string[]): boolean {
  return files.some(file => {
    const path = join(mameSrc, file);
    if (!existsSync(path)) return false;
    const text = stripCppComments(readFileSync(path, 'utf8')).replace(/\\\r?\n/g, ' ');
    return [...text.matchAll(/^\s*#\s*define\s+\w+\([^)]*\)([^\n]*)$/gm)]
      .some(match => /\bclass\s+[\w ()]+:?[^;{]*\{/.test(match[1]!));
  });
}

/** Whether a function-like macro in these files heads a member function: `void cls::_name()`. */
function macroDefinesMethods(mameSrc: string, files: readonly string[]): boolean {
  return files.some(file => {
    const path = join(mameSrc, file);
    if (!existsSync(path)) return false;
    const text = stripCppComments(readFileSync(path, 'utf8')).replace(/\\\r?\n/g, ' ');
    return [...text.matchAll(/^\s*#\s*define\s+\w+\(([^)]*)\)([^\n]*)$/gm)]
      .some(match => /^\s*[\w:<>*&\s]+\s+\w+::\w+\s*\([^)]*\)\s*(?:const\s*)?$/.test(match[2]!));
  });
}

/**
 * The preprocessor pass compileMameDevice retries a device with: every source
 * file that defines a class of the device's hierarchy is preprocessed, each
 * following the files of its own directory and any header elsewhere whose
 * function-like macros those files call (the T-Unit's methods are declared
 * with tms34010.h's `TMS340X0_SCANLINE_IND16_CB_MEMBER`). Undefined unless one
 * of those files includes something that is not a header, which is what says
 * the source is meant to be read after the preprocessor.
 */
function preprocessedSources(
  mameSrc: string,
  device: GeneratedDeviceDefinition,
  /** A macro heads its methods (macroDefinesMethods): read it preprocessed. */
  definesMethods = false,
): (((file: string, source: string) => string) & {
  foreignMacros?: boolean; foreignNames?: ReadonlySet<string>; nonHeader?: boolean; nonHeaderMacros?: boolean;
}) | undefined {
  const text = new Map<string, string>();
  const read = (file: string) => {
    if (!text.has(file)) text.set(file, existsSync(join(mameSrc, file)) ? readFileSync(join(mameSrc, file), 'utf8') : '');
    return text.get(file)!;
  };
  const includes = (file: string) => [...stripCppComments(read(file)).matchAll(/^\s*#\s*include\s+"([^"]+)"/gm)].map(match => match[1]!);
  const resolve = (path: string, from: string) =>
    [join(dirname(from), path), join('src/devices', path), join('src/mame', path)]
      .find(file => existsSync(join(mameSrc, file)));
  const hierarchy = device.hierarchy ?? [device.className];
  const entries = device.sourceFiles.filter(file =>
    file.endsWith('.cpp') && hierarchy.some(className => read(file).includes(`${className}::`)));
  const nonHeader = entries.some(entry => includes(entry).some(path => !path.endsWith('.h')));
  // A non-header that defines macros the entry itself is written in
  // (z80.inc's `#define PC m_pc.w`), as opposed to one that is data with
  // macros of its own (nes_unif.hxx's SPLIT_PRG): read as written, those uses
  // are bare names.
  // Or a header beside it that defines function-like macros it calls:
  // z8000cpu.h's `RW(n)`, which the Z8002 writes as `RW(dst) -= 2`.
  const nonHeaderMacros = entries.some(entry => includes(entry).some(path => {
    const file = resolve(path, entry);
    if (!file) return false;
    const own = stripCppComments(read(entry));
    const header = path.endsWith('.h');
    if (header && dirname(file) !== dirname(entry)) return false;
    return [...stripCppComments(read(file)).matchAll(header ? /^\s*#\s*define\s+(\w+)\(/gm : /^\s*#\s*define\s+(\w+)/gm)]
      .some(match => new RegExp(header ? `\\b${match[1]}\\s*\\(` : `\\b${match[1]}\\b`).test(own));
  }));
  let foreignMacros = false;
  const calledForeign = new Set<string>();
  const transforms = entries.map(entry => {
    const own = dirname(entry);
    const ownFiles = [entry];
    const elsewhere = new Set<string>();
    for (let index = 0; index < ownFiles.length; index++) {
      for (const path of includes(ownFiles[index]!)) {
        const file = resolve(path, ownFiles[index]!);
        if (!file) continue;
        if (dirname(file) === own) {
          if (!ownFiles.includes(file)) ownFiles.push(file);
        } else if (file.endsWith('.h')) {
          elsewhere.add(file);
        }
      }
    }
    const ownText = ownFiles.map(read).join('\n');
    const macroHeaders = new Set([...elsewhere].filter(header =>
      [...read(header).matchAll(/^\s*#\s*define\s+(\w+)\(/gm)].some(match =>
        new RegExp(`\\b${match[1]}\\s*\\(`).test(ownText))));
    // An own macro whose body calls one of those headers' macros only means
    // something preprocessed.
    const foreignNames = [...macroHeaders].flatMap(header =>
      [...read(header).matchAll(/^\s*#\s*define\s+(\w+)\(/gm)].map(match => match[1]!));
    if ([...stripCppComments(ownText).matchAll(/^\s*#\s*define\s+\w+\([^)]*\)([^\n]*)$/gm)]
      .some(match => foreignNames.some(name => new RegExp(`\\b${name}\\s*\\(`).test(match[1]!)))) foreignMacros = true;
    for (const name of foreignNames) calledForeign.add(name);
    return preprocessedDeviceTransform(mameSrc, {
      entry,
      allow: file => dirname(file) === own || macroHeaders.has(file),
      classes: hierarchy,
    });
  });
  if (!nonHeader && !foreignMacros && !calledForeign.size && !definesMethods) return undefined;
  const transform = (file: string, source: string) => transforms.reduce((current, step) => step(file, current), source);
  return Object.assign(transform, { foreignMacros, foreignNames: calledForeign, nonHeader, nonHeaderMacros });
}

interface DeviceCompileOptions {
  /**
   * Rewrite a source file before it is read, for a device whose code only
   * exists after the C preprocessor has run (see preprocessed-device.ts).
   */
  transformSource?: (file: string, source: string) => string;
  /**
   * A class the owner holds or allocates rather than a device: its source
   * constructor is lowered and run when it is built.
   */
  nestedClass?: boolean;
  /**
   * The machine-configuration statements the boards make on this device.
   * They name function-template instances its own source never does: only
   * the Exidy sound board writes `m_pit->set_clk<0>(SH8253_CLOCK)`.
   */
  configuration?: readonly string[];
  /**
   * Function-template instances the rest of each game names, unqualified
   * when called through this device's finder (`in_w<0>`), qualified
   * otherwise (`input_merger_device::in_set<0>`, any class's).
   */
  references?: readonly string[];
  /**
   * Driver files declaring classes the device builds from a table: the
   * DISCRETE_CUSTOMn nodes (`dkong_custom_mixer` in dkong_a.cpp). Only the
   * classes the device's own sources lack, and their methods, are read.
   */
  classSources?: readonly string[];
}

/**
 * The classes `file` declares that `known` lacks, with their out-of-line
 * methods, as source of their own. The driver is read through the device's
 * headers, which declare its node macros (DISCRETE_CLASS_STEP_RESET).
 */
const DRIVER_CLASS_SOURCES = new Map<string, string>();

function driverClassSource(mameSrc: string, file: string, deviceSourceFile: string, known: ReadonlySet<string>): string {
  // Each allocated class compiles with the same options, so the same driver
  // is asked for again and again.
  const key = `${mameSrc}\0${file}\0${deviceSourceFile}\0${known.size}`;
  const cached = DRIVER_CLASS_SOURCES.get(key);
  if (cached !== undefined) return cached;
  const source = driverClassSourceUncached(mameSrc, file, deviceSourceFile, known);
  DRIVER_CLASS_SOURCES.set(key, source);
  return source;
}

function driverClassSourceUncached(mameSrc: string, file: string, deviceSourceFile: string, known: ReadonlySet<string>): string {
  const own = dirname(deviceSourceFile);
  const driver = dirname(file);
  const header = join(mameSrc, deviceSourceFile.replace(/\.cpp$/, '.h'));
  const included = new Set(existsSync(header)
    ? [...readFileSync(header, 'utf8').matchAll(/^\s*#\s*include\s+"([^"]+)"/gm)].map(match => join('src/devices', match[1]!))
    : []);
  const preprocessor = new CPreprocessor({
    read: (path, from) => {
      for (const full of [join(dirname(from), path), join(mameSrc, 'src/devices', path), join(mameSrc, 'src/mame', path)]) {
        const candidate = relative(mameSrc, full);
        if (!existsSync(full) || !/\.(?:h|hxx|ipp)$/.test(candidate)) continue;
        if (dirname(candidate) !== own && dirname(candidate) !== driver && !included.has(candidate)) continue;
        return { path: full, source: readFileSync(full, 'utf8') };
      }
      return undefined;
    },
  });
  const text = preprocessor.run(join(mameSrc, file), readFileSync(join(mameSrc, file), 'utf8'))
    .replace(/\b(\w+)[ \t]+::[ \t]*(?=[A-Za-z_~])|\b(\w+)::[ \t]+(?=[A-Za-z_~])/g, (_all, left?: string, right?: string) => `${left ?? right}::`);
  const unit = parseMameAst([{ file, source: text }]);
  const classes = unit.units.flatMap(entry => entry.classes).filter(declaration => !known.has(declaration.name));
  const names = new Set(classes.map(declaration => declaration.name));
  return [
    ...classes.map(declaration => `class ${declaration.name}${declaration.bases.length ? ` : ${declaration.bases.map(base => `public ${base}`).join(', ')}` : ''}\n{${declaration.body}};`),
    ...unit.units.flatMap(entry => entry.functions).filter(method => names.has(method.className))
      .map(method => `${method.returnType ?? 'void'} ${method.className}::${method.name}(${method.parameters})\n{${method.body}}`),
  ].join('\n\n');
}

function compileMameDeviceSource(
  mameSrc: string,
  definition: MameHardwareDefinition,
  type: string,
  compiling: ReadonlySet<string>,
  options: DeviceCompileOptions,
): GeneratedDeviceDefinition {
  // A class template held by value is compiled once per instance: ymfm's
  // OPLL holds an `fm_engine_base<opll_registers>`, and every
  // `RegisterType` in the template's members and methods is that argument.
  const instance = /^([\w:]+)\s*<([\s\S]+)>$/.exec(definition.className);
  if (instance) definition = { ...definition, className: instance[1]! };
  const sourceFiles = localSourceFiles(mameSrc, definition.sourceFile);
  // A generator macro invoked in a header has its bodies in the header's own
  // source: DAC_GENERATOR's classes run dac.cpp's dac_device_base.
  const generatorSource = definition.macro && definition.sourceFile.endsWith('.h')
    ? definition.sourceFile.replace(/\.h$/, '.cpp')
    : undefined;
  if (generatorSource && existsSync(join(mameSrc, generatorSource))) {
    for (const file of localSourceFiles(mameSrc, generatorSource)) if (!sourceFiles.includes(file)) sourceFiles.push(file);
  }
  for (const file of buildUnitSiblings(mameSrc, definition.sourceFile, definition.className)) {
    if (!sourceFiles.includes(file)) sourceFiles.push(file);
  }
  // Defines carry from file to file in include order, as the preprocessor
  // sees them.
  const defines = new Map<string, string>();
  // Names the sources #undef and never #define: undefined everywhere, as the
  // preprocessor sees them once the header that undefines them is included.
  const texts = new Map(sourceFiles.map(file => [file, readFileSync(join(mameSrc, file), 'utf8')]));
  const undefined_ = new Set<string>();
  const definedAnywhere = new Set<string>();
  for (const text of texts.values()) {
    for (const match of text.matchAll(/^\s*#\s*undef\s+(\w+)/gm)) undefined_.add(match[1]!);
    for (const match of text.matchAll(/^\s*#\s*define\s+(\w+)/gm)) definedAnywhere.add(match[1]!);
  }
  for (const name of definedAnywhere) undefined_.delete(name);
  // A base that is a non-type class template, specialised by the class the
  // device derives: the TMS320C10 is `tms320c1x_device_base<12>`, its spaces,
  // its typed accessors and its opcode tables all spelled through HighBits.
  // Each file that declares the template is flattened to that one
  // specialisation (monomorphizeClassTemplate), so it reads as a class.
  // Only along the compiled class's own chain of bases: namco.h derives the
  // 3-voice WSG and the 8-voice Pole Position WSG from one template, and
  // taking the first derivation in the file gave POLEPOS_WSG three voices.
  const specialisations = new Map<string, Record<string, number>>();
  const allTexts = [...texts.values()].join('\n');
  const derivations = new Map<string, RegExpMatchArray>();
  for (const derived of allTexts.matchAll(/\bclass\s+(\w+)\s*(?:final\s*)?:\s*public\s+(\w+)\s*(?:<\s*([^<>]+?)\s*>)?/g)) {
    if (!derivations.has(derived[1]!)) derivations.set(derived[1]!, derived);
  }
  const chain: RegExpMatchArray[] = [];
  for (let name: string | undefined = definition.className.replace(/\s*<[\s\S]*$/, ''), seen = new Set<string>();
    name && derivations.has(name) && !seen.has(name); seen.add(name), name = derivations.get(name)![2]) {
    chain.push(derivations.get(name)!);
  }
  for (const link of chain) {
    if (link[3] === undefined) continue;
    const derived = [link[0], link[2], link[3]] as const;
    const base = derived[1]!;
    const declared = new RegExp(String.raw`template\s*<\s*((?:(?:int|bool|unsigned(?:\s+int)?|u(?:8|16|32)|s(?:8|16|32))\s+\w+\s*,?\s*)+)>\s*class\s+${base}\b`).exec(allTexts);
    if (!declared || specialisations.has(base)) continue;
    const parameters = [...declared[1]!.matchAll(/(\w+)\s*(?:,|$)/g)].map(match => match[1]!);
    const values = derived[2]!.split(',').map(value => Number(evalExpr(value.trim(), {})));
    if (values.length !== parameters.length || values.some(value => !Number.isInteger(value))) continue;
    specialisations.set(base, Object.fromEntries(parameters.map((parameter, index) => [parameter, values[index]!])));
  }
  if (specialisations.size) {
    for (const [file, text] of texts) {
      let flattened = text;
      for (const [base, values] of specialisations) {
        const parameters = Object.keys(values).join('|');
        if (new RegExp(String.raw`template\s*<[^<>]*\b(?:${parameters})\b[^<>]*>`).test(flattened)) {
          // With the class no longer a template, a dependent name needs no
          // `typename`: `typename memory_access<12, 1, -1, ...>::cache m_cache`.
          flattened = monomorphizeClassTemplate(flattened, base, values)
            .replace(/\btypename\s+(?=[\w:]+\s*<)/g, '');
        }
      }
      texts.set(file, flattened);
    }
  }
  const sources = sourceFiles.map(file => {
    // `#if 1 ... #else ... #endif` keeps the branch the preprocessor keeps:
    // the speaker's device_start builds its sinc kernel under `#if 1` and a
    // flat one under `#else`, and both used to run, the second winning.
    const source = resolveLiteralConditionals(
      spliceBodyIncludes(mameSrc, file, texts.get(file)!),
      defines,
      undefined_,
    );
    // A function returning a reference to an array, `u32 (&REG_SP_BASE())[7]
    // { return m_sp; }`, is read as one returning a pointer to its first
    // element, which every use indexes the same way. Unparsed, Musashi's
    // stack-pointer swap on every S-flag change wrote nowhere and read 0.
    const referenceArrays = source.replace(
      /\b((?:const\s+)?[\w:]+)\s*\(\s*&\s*(\w+)\s*\(([^()]*)\)\s*\)\s*\[[^\]]*\]\s*(?=(?:const\s*)?(?:noexcept\s*)?[{;])/g,
      '$1 *$2($3) ');
    return { file, source: options.transformSource ? options.transformSource(file, referenceArrays) : referenceArrays };
  });
  // A file-scope typedef of a scalar names that type through the whole
  // translation unit: nec.cpp's `typedef uint16_t WORD;` is what every
  // `(WORD)` cast in its instruction includes means.
  const scalarAliases = new Map<string, string>();
  for (const { source } of sources) {
    for (const alias of stripCppComments(source).matchAll(
      /^typedef\s+((?:unsigned\s+|signed\s+)?(?:u?int(?:8|16|32|64)_t|[us](?:8|16|32|64)|char|short|int|long))\s+(\w+)\s*;/gm,
    )) scalarAliases.set(alias[2]!, alias[1]!);
  }
  if (scalarAliases.size) {
    const alias = new RegExp(`\\b(?:${[...scalarAliases.keys()].join('|')})\\b`, 'g');
    for (const entry of sources) {
      entry.source = entry.source
        .replace(/^typedef\s+[\w\s]+?\s+(\w+)\s*;/gm, (whole, name: string) => scalarAliases.has(name) ? '' : whole)
        .replace(alias, name => scalarAliases.get(name)!);
    }
  }
  // A member-function pointer taken as a value is the method's name, which
  // CALL_METHOD dispatches by: the 6800's opcode tables are file-scope arrays
  // of `&m6800_cpu_device::aba`, handed to the constructor as `m_insn`. The
  // preprocessed reading (preprocessed-device.ts) lowers them the same way.
  if (!options.transformSource) {
    const declared = [...new Set(sources.flatMap(({ source }) =>
      [...source.matchAll(/\b(?:class|struct)\s+(\w+)\b/g)].map(match => match[1]!)))];
    if (declared.length) {
      // Only inside a file-scope table's initializer: in a body, `&cls::method`
      // builds a delegate (`vblank_state_delegate(&watchdog_timer_device::
      // watchdog_vblank, this)`), which is read as written.
      const evaluate = (argument: string) => {
        const value = evalExpr(argument, {});
        return typeof value === 'number' ? value : null;
      };
      for (const entry of sources) {
        if (!/&\s*\w+\s*::/.test(entry.source)) continue;
        // A table spelled through the file's own macro is read expanded, as
        // the preprocessor hands it over: mcs48.cpp's 256 opcode handlers
        // are `OP(add_a_r0)`, with `#define OP(_a) &mcs48_cpu_device::_a`.
        const spelled = [...entry.source.matchAll(/^[ \t]*#define[ \t]+(\w+)\(([^)]*)\)[ \t]+([^\r\n]*::[^\r\n]*)$/gm)]
          .map(([, name, parameters, body]) => ({
            call: new RegExp(`\\b${name}\\s*\\(([^()]*)\\)`, 'g'),
            parameters: parameters!.split(',').map(parameter => parameter.trim()),
            body: body!.trim(),
          }));
        const expand = (entries: string) => spelled.reduce((text, macro) => text.replace(macro.call, (_call, args: string) => {
          const values = splitMameArgs(args).map(value => value.trim());
          return macro.parameters.reduce((body, parameter, index) =>
            body.replace(new RegExp(`\\b${parameter}\\b`, 'g'), values[index] ?? ''), macro.body);
        }), entries);
        entry.source = entry.source.replace(
          /^((?:const\s+)?[\w:]+(?:\s*<[^;{}]*>)?\s+\w+::\w+\s*(?:\[[^\]]*\]\s*)*=\s*\{)([^{};]*(?:\{[^{}]*\}[^{};]*)*)(\}\s*;)/gm,
          // Comments out first: after mcs48.cpp's row label `// 00` the next
          // `&mcs48_cpu_device::ins_a_bus` follows a digit, which the lowering
          // reads as a bitwise AND.
          (_whole, head: string, entries: string, tail: string) =>
            head + lowerMemberPointerValues(expand(stripCppComments(entries)), declared, evaluate) + tail,
        );
      }
    }
  }
  for (const library of [
    ...formatLibrarySources(mameSrc, sources),
    ...helperLibrarySources(mameSrc, sources),
    ...frameworkInterfaceSources(mameSrc, sources),
  ]) {
    sources.push(library);
    sourceFiles.push(library.file);
  }
  // A class a macro declares exists only once that macro is expanded:
  // dac.h's DAC_GENERATOR(DAC_8BIT_R2R, dac_8bit_r2r_device, ...) is the whole
  // class, a constructor handing its bits, mapper and gain to the base.
  if (definition.macro && !parseMameAst(sources).units.some(unit =>
    unit.classes.some(declaration => declaration.name === definition.className))) {
    const header = sources.find(({ file }) => file === definition.sourceFile);
    // The generator as it stands where the header invokes it: the header
    // #undefs it at the end. Only this class is added; the header as written
    // keeps its bases and the #defines (DAC_INPUT_RANGE_LO) the code names.
    const generator = /^\s*(\w+)\s*\(/.exec(definition.macro)?.[1];
    if (header && generator) {
      const preprocessor = new CPreprocessor({ read: () => undefined });
      preprocessor.run(join(mameSrc, header.file),
        header.source.replace(new RegExp(`^\\s*#\\s*undef\\s+${generator}\\b.*$`, 'gm'), ''));
      sources.push({ file: header.file, source: preprocessor.expand(definition.macro) });
    }
  }
  if (options.classSources?.length && options.transformSource) {
    const known = new Set(parseMameAst(sources).units.flatMap(unit => unit.classes).map(declaration => declaration.name));
    for (const file of options.classSources) {
      if (!existsSync(join(mameSrc, file))) continue;
      const source = driverClassSource(mameSrc, file, definition.sourceFile, known);
      if (source) sources.push({ file, source });
    }
  }
  // A template instance named through an alias is that template: a call
  // qualified by the alias (atarimo's `sprite16_device_ind16::device_start()`)
  // is the template's method, so it is spelled that way before parsing.
  const joinedSource = sources.map(({ source }) => source).join('\n');
  const definedTemplates = new Set([...stripCppComments(joinedSource)
    .matchAll(/\btemplate\s*<[^;{}]*?>\s*(?:class|struct)\s+(\w+)/g)].map(match => match[1]!));
  const aliasTemplates = new Map([...templateAliases(joinedSource)]
    .filter(([, alias]) => definedTemplates.has(alias.template)));
  if (aliasTemplates.size) {
    for (const source of sources) {
      source.source = source.source.replace(/\b(\w+)\s*::\s*(?=~?\w)/g, (whole, alias: string) =>
        aliasTemplates.has(alias) ? `${aliasTemplates.get(alias)!.template}::` : whole);
    }
  }
  const ast = parseMameAst(sources);
  const classes = new Map(
    ast.units.flatMap(unit => unit.classes).map(declaration => [declaration.name, declaration]),
  );
  resolveTemplateAliasBases(classes, aliasTemplates);
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
  const instanceParameters = classes.get(definition.className)?.templateParameters;
  if (instance && instanceParameters?.length) {
    const args = splitMameArgs(instance[2]!).map(argument => argument.trim());
    templateArguments.set(definition.className, Object.fromEntries(
      instanceParameters.map((parameter, index) => [parameter, args[index] ?? parameter])));
  }
  // `timer_source(x)` converts to an enum the device declares: a value, not a
  // call. Left a call, it named no function and answered a reference object,
  // which no comparison against the enum's values ever matched.
  const enumTypes = [...new Set(sources.flatMap(({ source }) =>
    [...source.matchAll(/\benum\s+(?:class\s+|struct\s+)?(\w+)\s*(?::\s*[\w:]+\s*)?\{/g)].map(match => match[1]!)))];
  const enumCast = enumTypes.length
    ? new RegExp(`(?<![\\w.>])(?:\\w+::)*(?:${enumTypes.join('|')})\\s*\\(`, 'g')
    : undefined;
  const enumCStyleCast = enumTypes.length
    ? new RegExp(`(?<![\\w)\\]]\\s*)\\(\\s*(?:\\w+::)*(?:${enumTypes.join('|')})\\s*\\)(?=\\s*[\\w(])`, 'g')
    : undefined;
  // A smart pointer's `get()` is the storage it owns, which is all a member
  // holding one is here: the AY-3-8910 builds its mixer into
  // `m_vol3d_table.get()`, and as a call on the array it answered nothing,
  // so the table stayed empty and the Sunsoft 5B played silence.
  // A class declared inside the device reaches the device's own through its
  // back pointer: a slapstic state moves on with `m_sl->m_s_active.get()`.
  const enclosing = hierarchy.flatMap(className => className.split('::').slice(0, -1)
    .map((_scope, depth, scopes) => scopes.slice(0, depth + 1).join('::')));
  const smartPointers = [...new Set([...hierarchy, ...enclosing].flatMap(className => {
    const declaration = classes.get(className);
    return declaration ? memberDeclarations(declaration)
      .filter(member => /^std::(?:unique|shared)_ptr\s*</.test(member.valueType))
      .map(member => member.name) : [];
  }))];
  const smartGet = smartPointers.length
    ? new RegExp(`\\b(${smartPointers.join('|')})(\\s*\\[[^\\]]*\\])?\\s*\\.\\s*get\\s*\\(\\s*\\)`, 'g')
    : undefined;
  // A namespace the device's own sources open names nothing a qualifier
  // needs: ymfm declares every class, helper and enumerator inside
  // `namespace ymfm`, and the DS1001 holds its chip as `ymfm::ds1001`.
  const namespaces = [...new Set(sources.flatMap(({ source }) =>
    [...source.matchAll(/\bnamespace\s+(\w+)\s*\{/g)].map(match => match[1]!)))]
    .filter(name => !classes.has(name));
  const namespaceQualifier = namespaces.length
    ? new RegExp(`(?<![\\w:])(?:${namespaces.join('|')})::(?=\\w)`, 'g')
    : undefined;
  // Allocation names of the class-template instances the bodies build.
  const instanceNames = new Map<string, string>();
  // Type aliases, resolved once the constants they may need are known.
  let resolveTypes: ((className: string, text: string) => string) | undefined;
  const specialize = (className: string, text: string): string => {
    const substitutions = templateArguments.get(className);
    let specialized = enumCast ? text.replace(enumCast, '(') : text;
    // The C form names the enum in parentheses: the 8086's constructor fills
    // its ModRM table with `(BREGS)reg_name[i & 7]`, and `(name)` alone reads
    // as a value, so the whole statement failed to lower.
    if (enumCStyleCast) specialized = specialized.replace(enumCStyleCast, '');
    if (smartGet) specialized = specialized.replace(smartGet, '$1$2');
    for (const [parameter, argument] of Object.entries(substitutions ?? {})) {
      specialized = specialized.replace(new RegExp(`\\b${parameter}\\b`, 'g'), argument);
    }
    if (namespaceQualifier) specialized = specialized.replace(namespaceQualifier, '');
    // `typename` only tells a C++ parser that a dependent name is a type.
    specialized = specialized.replace(/\btypename\s+(?=[\w:])/g, '');
    // A MAME framework base named to pick its overload is the framework call
    // the host answers: `device_sound_interface::stream_alloc(...)`,
    // `device_t::clock()`. ymfm's wrapper spells both, beside an
    // `ymfm_interface` that declares no clock of its own.
    specialized = specialized.replace(/(?<![\w:])(?:device_t|device_\w+_interface)::(?=\w+\s*\()/g, prefix =>
      hierarchy.includes(prefix.slice(0, -2)) ? prefix : '');
    // `std::make_unique<T>(args)` builds a T as `new T(args)` does, and a
    // class template's instance is named as an allocation can be: ymfm's
    // engine builds `std::make_unique<fm_channel<RegisterType>>(*this, ...)`.
    // T may be declared inside a class of the hierarchy: the slapstic makes
    // each of its states as `std::make_unique<idle>(this, check, info)`, and
    // m6809_base_device its memory interface as `std::make_unique<mi_default>()`
    // -- left to a runtime that never made it, every 6809 read was of nothing.
    specialized = specialized.replace(
      /\b(?:std::make_unique\s*<\s*([\w:]+(?:\s*<[^<>;()]*>)?)\s*>|new\s+([\w:]+\s*<[^<>;()]*>))\s*\(/g,
      (text, made: string | undefined, allocated: string | undefined) => {
        const allocatedType = (made ?? allocated)!;
        const template = allocatedType.replace(/\s*<[\s\S]*>$/, '');
        if (!classes.has(template) && !classes.has(`${className}::${template}`)) return text;
        const name = templateInstanceName(allocatedType);
        if (name !== allocatedType) instanceNames.set(name, allocatedType);
        return `new ${name}(`;
      });
    if (resolveTypes) specialized = resolveTypes(className, specialized);
    // A data member named through a base, by the base or its alias: the
    // YM2610's `parent::m_chip.set_fidelity(SSG_FIDELITY)` is this device's
    // `m_chip`. Read as the identifier `ymfm_device_base::m_chip`, the chip
    // kept ymfm's maximum fidelity and ran its SSG at the wrong ratio.
    specialized = specialized.replace(/(?<![\w:])(\w+)::(m_\w+)\b(?!\s*\()/g, (whole, owner: string, member: string) =>
      hierarchy.includes(owner) || owner === 'parent' ? member : whole);
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
    // <numbers>, for an initializer read at compile time: flt_biquad's
    // constructor sets `m_q(std::numbers::sqrt2 / 2.0)`, which read as 0 gave
    // every biquad a Q of zero until its first setup, and NaN out of recalc.
    Object.fromEntries(Object.entries(DEFAULT_CONSTANTS).filter(([name]) => name.startsWith('std::numbers::'))),
    coreLineStates(mameSrc),
    coreAddressSpaces(mameSrc),
    coreEnumerators(mameSrc, sources),
    coreOsdDefines(mameSrc, sources),
    // Comments out: an enum documented entry by entry (flopimg.h's variants)
    // otherwise parses to the wrong values for everything after a comment.
    // Seeded with diexec.h's lines: z80.h numbers its own after them
    // (`Z80_INPUT_LINE_WAIT = INPUT_LINE_IRQ0 + 1`), and without the seed the
    // enum stopped there and BUSREQ answered to IRQ line 0.
    ...((helpers, lines) => sources.map(({ source }) => numericConstants(stripCppComments(source), lines, helpers)))(constexprHelpers(mameSrc, sources), coreLineStates(mameSrc)),
    deviceTypeTokens(sources),
  );
  // A class template's members name their argument's constants
  // (`RegisterType::OUTPUTS`), which are read as the instance spells them.
  const specializedSources = hierarchy.filter(className => templateArguments.has(className))
    .flatMap(className => sources.map(({ file, source }) => ({ file, source: specialize(className, source) })));
  Object.assign(constants, foreignClassConstants(mameSrc, [...sources, ...specializedSources], classes, constants));
  // A class-scoped constant belongs to its class, not to the file. MAME
  // declares `PAGE_ROM_SIZE` five times in one cartridge header -- 0x4000
  // for the paged MBCs, 0x2000 and 0x8000 for others -- and flattening them
  // left every board using whichever came last: an MBC1 banked in 32 KiB
  // steps and read the wrong half of its own ROM. Layered base-first, so a
  // derived class still overrides what it inherits, and read after the
  // foreign ones, so `CHANNELS = RegisterType::CHANNELS` is the instance's.
  // Comments out, as for foreign classes: flopimg.h documents each opcode
  // of its track description language with a comma-bearing comment.
  // Another class's constant, by the qualified name a class here uses, is
  // that instance's: a ymfm chip's `fm_engine::OUTPUTS` through its own
  // `using fm_engine = fm_engine_base<opn_registers>`, down to
  // opn_registers_base<false>'s `IsOpnA ? 2 : 1`. Left to evalExpr, a name no
  // table held fell back to its bare leaf, and another header's OUTPUTS
  // sized every ymfm output wrong.
  const instanceConstants = instanceConstantResolver(classes, namespaceAliasMap(sources), constants, namespaceQualifier);
  const hierarchyAliases = new Map<string, string>();
  for (const className of hierarchy) {
    const body = stripCppComments(specialize(className, classes.get(className)?.body ?? ''));
    for (const alias of body.matchAll(/\busing\s+(\w+)\s*=\s*([^;]+);/g)) hierarchyAliases.set(alias[1]!, alias[2]!.trim());
    const qualified = body.replace(/\b(\w+(?:<[^<>;]*>)?)::([A-Z]\w*)\b/g, (whole, owner: string, name: string) => {
      // A bare template name is the instance an alias here names: the alias
      // pass has already spelled `fm_engine::` as `fm_engine_base::`.
      const target = hierarchyAliases.get(owner) ?? [...hierarchyAliases.values()]
        .find(aliased => aliased.replace(/\s*<[\s\S]*>$/, '') === owner && aliased !== owner) ?? owner;
      if (hierarchy.includes(target)) return whole;
      const value = instanceConstants(target)?.[name];
      return value === undefined ? whole : String(value);
    });
    Object.assign(constants, numericConstants(qualified, constants));
  }
  // And by the qualified name a method body uses: the YM2203 clocks its
  // engine with `m_fm.clock(fm_engine::ALL_CHANNELS)`, which an alias pass
  // spells `fm_engine_base::ALL_CHANNELS`. evalExpr falls back to the bare
  // leaf for a name no table holds, so channel 0 was never clocked.
  {
    const namespaced = namespaceAliasMap(sources);
    const instanceOf = (owner: string): string | undefined => hierarchyAliases.get(owner) ?? namespaced.get(owner) ??
      [...hierarchyAliases.values()].find(aliased => aliased.replace(/\s*<[\s\S]*>$/, '') === owner && aliased !== owner);
    for (const { source } of sources) {
      for (const match of source.matchAll(/(?<![\w:])(\w+)::([A-Z][A-Z0-9_]*)\b/g)) {
        const key = `${match[1]}::${match[2]}`;
        if (constants[key] !== undefined || hierarchy.includes(match[1]!)) continue;
        const target = instanceOf(match[1]!);
        const value = target ? instanceConstants(target)?.[match[2]!] : undefined;
        if (value !== undefined) constants[key] = value;
      }
    }
  }
  // A define spelled in another file's constants resolves only once every
  // file's are known: m68705.h's `M6805_INT_TIMER (M6805_IRQ_LINE + 1)` names
  // an enumerator of m6805.h. Evaluated per file, it was dropped, and the
  // 68705's timer raised its interrupt on no line at all.
  const pendingDefines = new Map<string, string>();
  for (const { source } of sources) {
    for (const match of stripCppComments(source).matchAll(/^[ \t]*#define[ \t]+([A-Za-z_]\w*)[ \t]+([^\r\n]+)/gm)) {
      if (constants[match[1]!] === undefined) pendingDefines.set(match[1]!, match[2]!.trim());
    }
  }
  for (let resolved = true; resolved;) {
    resolved = false;
    for (const [name, expression] of pendingDefines) {
      const value = evalExpr(expression, constants);
      if (value === null || value === undefined || !Number.isFinite(value)) continue;
      constants[name] = value;
      pendingDefines.delete(name);
      resolved = true;
    }
  }
  // logmacro.h's own defaults: `#ifndef VERBOSE #define VERBOSE 0`, and
  // LOG_GENERAL as bit 0. A device that leaves VERBOSE commented out (the
  // usual state) guards its log lines with a name no file it parses defines,
  // so every method holding `if (VERBOSE & LOG_TIMER)` was declined by the
  // emitter: the 68705's timer `update`, which runs every instruction.
  // Read from the files as written: the preprocessor pass hands over source
  // whose #include and #define lines are already consumed.
  const written = sourceFiles.flatMap(file => {
    const path = join(mameSrc, file);
    return existsSync(path) ? [stripCppComments(readFileSync(path, 'utf8'))] : [];
  });
  const usesLogMacros = written.some(source => /^\s*#include\s+"logmacro\.h"/m.test(source));
  if (usesLogMacros) {
    const definesVerbose = written.some(source => /^\s*#define\s+VERBOSE\b/m.test(source));
    if (!definesVerbose) constants.VERBOSE ??= 0;
    constants.LOG_GENERAL ??= 1;
  }
  // Struct shapes for members whose type is one the device declares.
  const structFields = structDeclarations(sources, constants);
  // And for a framework struct it names, which only MAME's emu headers
  // declare: `static const gfx_layout spritelayout = { ... }` is digfx.h's.
  // Named as a type, that is: declaring something of it, or braced. A
  // local called `entry` is not digfx.h's struct of that name.
  const named = sources.map(({ source }) => stripCppComments(source)).join('\n');
  for (const [name, fields] of coreStructs(mameSrc)) {
    if (structFields.has(name)) continue;
    if (new RegExp(`\\b${name}\\s*(?:[*&]\\s*)*\\w+\\s*[;=,)[]|\\b${name}\\s*\\{`).test(named)) structFields.set(name, fields);
  }
  const structMethods = structMethodDeclarations(sources);

  // What a class names by alias, and the constants it sees, so a type
  // spelled through one resolves: the DS1001's `ChipClass::output_data` is
  // `ds1001::output_data`, which opll_base declares as
  // `fm_engine::output_data`, which is `fm_engine_base<opll_registers>`'s
  // `ymfm_output<OUTPUTS>` -- `ymfm_output<2>`. A struct template's instance
  // is a struct of its own (`ymfm_output__2`), sized and given methods with
  // its arguments.
  type ClassScope = { root: string; aliases: Map<string, string>; constants: Record<string, number> };
  const namespacedAliases = namespaceAliasMap(sources);
  const scopes = new Map<string, ClassScope | undefined>();
  const classScope = (instance: string): ClassScope | undefined => {
    const key = instance.replace(/\s+/g, '');
    if (scopes.has(key)) return scopes.get(key);
    scopes.set(key, undefined);
    const parsed = /^(\w+)(?:<([\s\S]*)>)?$/.exec(key);
    const root = parsed?.[1];
    const declaration = root ? classes.get(root) : undefined;
    if (!root || !declaration) return undefined;
    const substitutions = new Map(resolveTemplateArguments(root, classes));
    if (parsed![2] !== undefined && declaration.templateParameters?.length) {
      const args = splitMameArgs(parsed![2]).map(argument => argument.trim());
      substitutions.set(root, Object.fromEntries(
        declaration.templateParameters.map((parameter, index) => [parameter, args[index] ?? parameter])));
    }
    const scope: ClassScope = { root, aliases: new Map(), constants: { ...constants } };
    for (const className of classHierarchy(root, classes)) {
      let body = stripCppComments(classes.get(className)?.body ?? '');
      if (namespaceQualifier) body = body.replace(namespaceQualifier, '');
      for (const [parameter, argument] of Object.entries(substitutions.get(className) ?? {})) {
        body = body.replace(new RegExp(`\\b${parameter}\\b`, 'g'), argument);
      }
      // Aliases first: a constant may be spelled through one.
      for (const alias of body.matchAll(/\busing\s+(\w+)\s*=\s*([^;]+);/g)) scope.aliases.set(alias[1]!, alias[2]!.trim());
      // The older spelling: discrete_device's `typedef std::vector<...> node_list_t;`.
      for (const alias of body.matchAll(/\btypedef\s+([^;()]+?)\s*\b(\w+)\s*;/g)) scope.aliases.set(alias[2]!, alias[1]!.trim());
      // Another class's constant, by the qualified name this one uses. The
      // owner may be one of this scope's aliases: ym3526's
      // `OUTPUTS = fm_engine::OUTPUTS` is `fm_engine_base<opl_registers>`'s,
      // which is opl_registers_base<1>'s 1 -- read unresolved, the flat
      // table's 2 from another header stood in for it.
      const qualified = body.replace(/\b(\w+(?:<[^<>;]*>)?)::([A-Z]\w*)\b/g, (whole, owner: string, name: string) => {
        // Or a namespace's: fm_engine_base<opna_registers>'s `OUTPUTS =
        // RegisterType::OUTPUTS` is `opn_registers_base<true>`'s.
        const aliased = scope.aliases.get(owner) ?? namespacedAliases.get(owner);
        const target = aliased ? resolveType(scope, aliased) : owner;
        const value = target === root ? undefined : classScope(target)?.constants[name];
        return value === undefined ? whole : String(value);
      });
      scope.constants = numericConstants(qualified, scope.constants);
    }
    scopes.set(key, scope);
    return scope;
  };
  const structTemplate = (name: string) =>
    classes.get(name)?.templateParameters?.length ? structBlocks(stripCppComments(sources.map(({ source }) => source).join('\n')))
      .find(block => block.name === name) : undefined;
  const resolveType = (scope: ClassScope | undefined, type: string, depth = 0): string => {
    if (depth > 8) return type;
    // `alias::name`, the alias this scope's: opll_base's `fm_engine::output_data`.
    let resolved = scope ? type.replace(/(?<![\w:])(\w+)::(\w+)\b/g, (whole, alias: string, name: string) => {
      const target = scope.aliases.get(alias);
      return target ? `${resolveType(scope, target, depth + 1)}::${name}` : whole;
    }) : type;
    resolved = resolved.replace(/(?<![\w:])(\w+(?:<[^<>;]*>)?)::(\w+)\b/g, (whole, owner: string, name: string) => {
      const other = classScope(owner);
      const target = other?.aliases.get(name);
      return target ? resolveType(other, target, depth + 1) : whole;
    });
    if (scope) {
      resolved = resolved.replace(/(?<![\w:.>])(\w+)(?![\w:(])/g, (name: string) => {
        const target = scope.aliases.get(name);
        return target ? resolveType(scope, target, depth + 1) : name;
      });
    }
    // A template's numeric arguments are values: `ymfm_output<OUTPUTS>`.
    return resolved.replace(/\b(\w+)\s*<([^<>]+)>/g, (whole, name: string, args: string) => {
      if (!classes.has(name)) return whole;
      const values = splitMameArgs(args).map(argument => {
        const value = evalExpr(argument.trim(), scope?.constants ?? constants);
        return value === null || !Number.isFinite(value) ? argument.trim() : String(value);
      });
      const instance = `${name}<${values.join(', ')}>`;
      const block = structTemplate(name);
      if (!block || !values.every(value => /^\d+$/.test(value))) return instance;
      // A struct template's instance: its own fields and methods.
      const mangled = templateInstanceName(instance);
      if (!structFields.has(mangled)) {
        const parameters = classes.get(name)!.templateParameters!;
        const bound = Object.fromEntries(parameters.map((parameter, index) => [parameter, Number(values[index])]));
        structFields.set(mangled, structFieldList(block.body, { ...constants, ...bound }, mangled));
        let body = block.body;
        for (const [parameter, value] of Object.entries(bound)) body = body.replace(new RegExp(`\\b${parameter}\\b`, 'g'), String(value));
        const methods = structMethodsOf(body);
        if (methods.length) structMethods[mangled] = methods;
      }
      return mangled;
    });
  };
  const scopeOf = (className: string): ClassScope | undefined => {
    const parameters = classes.get(className)?.templateParameters;
    const args = templateArguments.get(className);
    return classScope(parameters?.length && args ? `${className}<${parameters.map(parameter => args[parameter] ?? parameter).join(',')}>` : className);
  };
  resolveTypes = (className: string, text: string): string => {
    const scope = scopeOf(className);
    if (!scope?.aliases.size && !/::/.test(text)) return text;
    // `alias::NAME`: a constant of the aliased class is its value, and an
    // alias of a base class (`using parent = ymfm_device_base<...>`) is that
    // base's name, as an explicit base call spells it.
    let resolved = text.replace(/(?<![\w:.>])(\w+)::(\w+)\b/g, (whole, alias: string, name: string) => {
      const target = scope?.aliases.get(alias);
      if (!target) return whole;
      const type = resolveType(scope, target);
      const owner = classScope(type);
      const value = owner?.constants[name];
      if (value !== undefined && /^[A-Z]/.test(name)) return String(value);
      // A type the aliased class names, in that class's own scope: the
      // YM2610's `fm_engine::output_data m_last_fm` is
      // fm_engine_base<opna_registers>'s ymfm_output<2>. Spelled as the bare
      // base and resolved with no scope, its OUTPUTS read as the chip's 3.
      if (owner?.aliases.has(name)) return resolveType(owner, owner.aliases.get(name)!);
      const base = type.replace(/\s*<[\s\S]*>$/, '');
      return `${hierarchy.includes(base) ? base : type}::${name}`;
    });
    // `Owner::alias`, Owner any class: the type it names.
    resolved = resolved.replace(/(?<![\w:])(\w+)::(\w+)\b(?!\s*\()/g, (whole, owner: string, name: string) => {
      if (!classScope(owner)?.aliases.has(name)) return whole;
      // A bare template name is the instance an alias of this class names:
      // the alias pass has already spelled `fm_engine::output_data` as
      // `fm_engine_base::output_data`. Resolved with no arguments, OUTPUTS
      // was the chip's 3, not fm_engine_base<opna_registers>'s 2.
      const instance = classes.get(owner)?.templateParameters?.length && scope
        ? [...scope.aliases.values()].map(aliased => resolveType(scope, aliased))
          .find(aliased => aliased !== owner && aliased.replace(/\s*<[\s\S]*>$/, '') === owner)
        : undefined;
      const other = instance ? classScope(instance) : undefined;
      return other?.aliases.has(name) ? resolveType(other, other.aliases.get(name)!) : resolveType(undefined, whole);
    });
    if (!scope?.aliases.size) return resolved;
    return resolved.replace(/(?<![\w:.>])(\w+)(?![\w:(])/g, (name: string) =>
      scope.aliases.has(name) ? resolveType(scope, name) : name);
  };
  const sourceTables: Record<string, ConstantTable> = Object.assign(
    {},
    // Comments out first: the 1541 formats annotate their zone tables row by
    // row (`21, 21, ... //  1-17`), and kept in, every inlined value after the
    // first comment was the comment.
    ...sources.map(({ source }) => constantTables(stripCppComments(source))),
  );
  // An entry can be a function-like macro the sources define: the TMS36xx's
  // tunes are notes, `C(3)`, each a frequency step once expanded.
  if (Object.values(sourceTables).some(table => table.values.some(value => /\w\s*\(/.test(value)))) {
    const tablePreprocessor = new CPreprocessor({ read: () => undefined });
    for (const { file, source } of sources) tablePreprocessor.run(join(mameSrc, file), source);
    for (const table of Object.values(sourceTables)) {
      table.values = table.values.map(value => /\w\s*\(/.test(value) ? tablePreprocessor.expand(value).trim() : value);
    }
  }
  // Statement macros the device's own sources define. These have to be
  // substituted textually: their bodies read and assign the caller's locals,
  // which no call can do.
  const functionMacros = [
    ...sources.flatMap(({ source }) => [...collectFunctionMacros(source), ...collectMemberCallMacros(source)]),
    ...coreFunctionMacros(mameSrc),
  ];
  const stringMacros: Record<string, string> = Object.assign({},
    ...sources.map(({ source }) => parseTextMacros(stripCppComments(source)).strings));
  const hierarchyFunctions = ast.units.flatMap(unit => unit.functions)
    .filter(method => method.className && hierarchy.includes(method.className));
  const liveParameters = new Set(hierarchyFunctions
    .flatMap(method => splitMameArgs(method.parameters).map(parameterName))
    .filter(name => /^\w+$/.test(name)));
  const dynamicMacros = collectDynamicMacros(
    sources.map(({ source }) => source).join('\n'),
    liveParameters,
    referenceAccessorMacros(hierarchyFunctions),
  );
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
  // A struct method that reads a table of the device's sources is compiled as
  // the device's own methods are, the table substituted: k053260.cpp's
  // KDSC_Voice::update_pan_volume reads `pan_mul[m_pan][0]`, which unread was
  // 0, so every voice played at volume 0.
  const tableNames = Object.keys(sourceTables);
  if (tableNames.length) {
    const reads = new RegExp(`\\b(?:${tableNames.map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*\\[`);
    for (const [struct, list] of Object.entries(structMethods)) {
      list.forEach((method, index) => {
        const body = STRUCT_METHOD_SOURCE.get(method.program);
        if (body === undefined || !reads.test(body)) return;
        const recompiled = compileMethod(
          { kind: 'function', className: '', name: method.name, parameters: method.parameters, body,
            span: { file: '', line: 0, column: 0 } } as unknown as MameFunction,
          [], sourceTables, functionMacros, memberAliases, stringMacros, struct,
        );
        if (!recompiled.program.diagnostics.length) list[index] = { ...method, program: recompiled.program };
      });
    }
  }
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
  // The device's own type templates (set_flags<T>), filled once the source
  // methods are known; each call names its instance (template-deduction.ts).
  const typeTemplates = new Map<string, TypeTemplate>();
  // Templates over values, whose calls name them with constants the parser
  // cannot fold: the Z80's `set_service_attention<SA_IRQ_ON, 1>()` is the
  // instance `set_service_attention_<value>_1` once SA_IRQ_ON is a number.
  const valueTemplates = new Set<string>();
  const typeTemplateSources = new Map<string, MameFunction[]>();
  const pendingTypeInstances: [string, string][] = [];
  let deductionScope: ((method: MameFunction) => DeductionScope) | undefined;
  const replaceOrAppend = (method: MameFunction): void => {
    const specialized = specializeMethod(method, specialize);
    specialized.body = expandDynamicMacros(expandLocalMacros(specialized.body), dynamicMacros);
    if (valueTemplates.size && !specialized.templateParameters?.length) {
      // The constants as the method's own class sees them: the Z80's SA_*
      // service bits are an enum inside z80_device.
      const scoped = hierarchy.reduce<Record<string, number>>((all, className) =>
        ({ ...all, ...(classScope(className)?.constants ?? {}) }), { ...constants });
      specialized.body = foldTemplateConstants(specialized.body, valueTemplates, scoped);
    }
    if (typeTemplates.size && deductionScope && !specialized.templateParameters?.length) {
      specialized.body = rewriteTypeTemplateCalls(specialized.body, typeTemplates, deductionScope(specialized),
        (name, type) => pendingTypeInstances.push([name, type]));
    }
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
      // Keyed by signature, not name: a base may declare `set_prg()` and
      // `set_prg(int, int)`, and the first's alias must not stand in for the
      // second -- VRC4 clones call `nes_konami_vrc4_device::set_prg(m_outer,
      // 0x1f)`, which reached the no-argument version.
      const qualified = `${specialized.className}::${specialized.name}`;
      const qualifiedSignature = methodSignature(qualified, specialized.parameters);
      if (
        explicitBaseCalls.has(qualified) &&
        !methods.some(candidate => methodSignature(candidate.name, candidate.parameters) === qualifiedSignature)
      ) {
        methods.push({ ...compiled, name: qualified });
      }
    }
    methodOwners.set(signature, specialized.className);
  };

  const sourceMethods = ast.units.flatMap(unit => unit.functions);
  // Type templates of the hierarchy: one type parameter, declared as the type
  // of some parameter, so a call deduces it.
  for (const className of hierarchy) {
    const candidates = [
      ...sourceMethods.filter(candidate => candidate.className === className),
      ...(classes.get(className) ? inlineMethods(classes.get(className)!) : []),
    ];
    for (const candidate of candidates) {
      const [parameter, ...more] = candidate.templateParameters ?? [];
      const positions = parameter && !more.length ? typePositions(candidate.parameters, parameter) : undefined;
      if (!positions) {
        if (parameter) valueTemplates.add(candidate.name);
        continue;
      }
      const entry = typeTemplates.get(candidate.name) ?? { name: candidate.name, parameter, positions: new Map() };
      const arity = candidate.parameters.split(',').filter(part => part.trim() && part.trim() !== 'void').length;
      entry.positions.set(arity, positions);
      typeTemplates.set(candidate.name, entry);
      typeTemplateSources.set(candidate.name, [...(typeTemplateSources.get(candidate.name) ?? []), candidate]);
    }
  }
  if (typeTemplates.size) {
    const memberTypes = new Map<string, string>();
    for (const className of hierarchy) {
      const declaration = classes.get(className);
      if (declaration) for (const member of memberDeclarations(declaration, constants)) memberTypes.set(member.name, member.valueType);
    }
    const returnTypes = new Map<string, string | undefined>();
    const returns = (name: string): string | undefined => {
      if (returnTypes.has(name)) return returnTypes.get(name);
      let found: string | undefined;
      for (const className of [...hierarchy].reverse()) {
        const body = stripCppComments(classes.get(className)?.body ?? '');
        const declared = new RegExp(`(?:^|[;{}:])\\s*(?:(?:virtual|static|inline|constexpr)\\s+)*((?:unsigned\\s+|signed\\s+)?[\\w:]+)\\s*&?\\s*${name}\\s*\\(`, 'm').exec(body);
        if (declared) { found = declared[1]; break; }
      }
      returnTypes.set(name, found);
      return found;
    };
    const known = (type: string) => integerType(type) !== undefined || /^PAIR(?:16)?$/.test(type) || structFields.has(type);
    deductionScope = method => {
      const locals = new Map<string, string>();
      for (const declared of `${method.parameters},${method.body}`.matchAll(
        /(?:^|[;{}(,])\s*(?:const\s+)?((?:unsigned\s+|signed\s+)?[A-Za-z_][\w:]*)\s*&?\s+(\w+)\s*(?=[=;,)\[{])/g)) {
        if (known(declared[1]!) && !locals.has(declared[2]!)) locals.set(declared[2]!, declared[1]!);
      }
      return {
        variable: name => locals.get(name) ?? memberTypes.get(name),
        fields: type => structFields.get(type),
        returns,
      };
    };
  }
  // A configuration statement calls the device through its finder; without
  // the receiver it names the instance as the device's own code would. A
  // qualified reference is this device's only when the class is one of its.
  const own = new Set(hierarchy);
  const instantiations = [
    ...(options.configuration ?? []).map(line => line.replace(/[\w\]\[]+\s*(?:->|\.)\s*/g, ' ')),
    ...(options.references ?? []).filter(name => {
      const qualifier = /^(\w+)::/.exec(name)?.[1];
      return qualifier === undefined || own.has(qualifier);
    }),
  ];
  const instantiating = instantiations.length
    ? [...sources, { file: '(machine configuration)', source: [...new Set(instantiations)].join(';\n') }]
    : sources;
  for (const className of hierarchy) {
    for (const method of sourceMethods.filter(candidate => candidate.className === className)) {
      for (const specialized of specializeFunctionTemplate(
        method, instantiating, templateDiscoveryMacros, constants,
      )) {
        replaceOrAppend(specialized);
      }
    }
    const declaration = classes.get(className);
    if (!declaration) continue;
    for (const method of inlineMethods(declaration)) {
      for (const specialized of specializeFunctionTemplate(
        method, instantiating, templateDiscoveryMacros, constants,
      )) {
        replaceOrAppend(specialized);
      }
    }
  }

  // The lambdas of the device's own address maps. A board installs such a
  // map in a window of its space (`.m(m_blitter, FUNC(williams_blitter_device::map))`),
  // and a `lw8(NAME([this](u8 data) { m_sstart = ... }))` entry is a handler
  // that writes the device's members, so it is one of the device's methods,
  // named as the graph names the range's handler.
  for (const map of parseAddressMaps(sources.map(({ source }) => stripCppComments(source)).join('\n'))) {
    if (!own.has(map.cls)) continue;
    const mapFunction = sourceMethods.find(candidate =>
      candidate.className === map.cls && candidate.name === map.name);
    if (!mapFunction) continue;
    for (const handler of map.ranges.flatMap(range => [range.read, range.write])) {
      if (handler?.inlineBody === undefined) continue;
      if (methods.some(candidate => candidate.name === handler.method)) continue;
      replaceOrAppend({
        ...mapFunction,
        name: handler.method,
        parameters: handler.inlineParameters ?? '',
        body: handler.inlineBody,
        statements: [],
        templateParameters: undefined,
      });
    }
  }

  // Template instances named only inside other specialised members, to a
  // fixed point: a handler specialised for `big = false` calls `rm<0>`, and
  // `rm<0>` itself calls `rdmem<0>`. The source spells none of them with a
  // number, so the pass above could not see them.
  const templateMethods = hierarchy.flatMap(className => [
    ...sourceMethods.filter(candidate => candidate.className === className),
    ...(classes.get(className) ? inlineMethods(classes.get(className)!) : []),
  ]).filter(method => method.templateParameters?.length);
  for (let added = true, round = 0; added && round < 16; round++) {
    added = false;
    const specialisedText = [{ file: '(specialised members)', source: [...methodBodies.values()].join('\n') }];
    for (const template of templateMethods) {
      for (const specialized of specializeFunctionTemplate(template, specialisedText, templateDiscoveryMacros, constants)) {
        if (specialized.name === template.name || methods.some(candidate => candidate.name === specialized.name)) continue;
        replaceOrAppend(specialized);
        added = true;
      }
    }
  }

  // Each type template's instances its calls named, T bound to the type:
  // `set_flags__T_uint16_t` is set_flags with `uint16_t` for T, its
  // `sizeof(T)` the width. An instance may name others in turn.
  const generatedTypeInstances = new Set<string>();
  while (pendingTypeInstances.length) {
    const [name, type] = pendingTypeInstances.shift()!;
    const instance = typeInstanceName(name, type);
    if (generatedTypeInstances.has(instance)) continue;
    generatedTypeInstances.add(instance);
    const parameter = typeTemplates.get(name)!.parameter;
    // `sizeof(T)` is the type's width, a constant once T is bound.
    const bytes = { uint8_t: 1, int8_t: 1, bool: 1, uint16_t: 2, int16_t: 2, uint64_t: 8, int64_t: 8 }[type] ?? 4;
    const bind = (text: string) => text.replace(new RegExp(`\\b${parameter}\\b`, 'g'), type)
      .replace(new RegExp(`\\bsizeof\\s*\\(\\s*${type}\\s*\\)`, 'g'), String(bytes));
    for (const template of typeTemplateSources.get(name) ?? []) {
      replaceOrAppend({ ...template, name: instance, parameters: bind(template.parameters), body: bind(template.body), templateParameters: undefined });
    }
  }
  // File-scope helpers the device's own methods call. They belong to no class,
  // so the hierarchy walk above never reaches them, and an unresolved call
  // answers zero rather than failing: `convert_output` in gb.cpp turns a
  // channel's signal into its output level, and without it the Game Boy
  // mixed four channels of silence however loud the game set the envelopes.
  // Only helpers something already collected actually calls -- a device source
  // shares a translation unit with its neighbours, and the rest are theirs.
  // To a fixed point: a helper calls helpers of its own -- the NES slot's
  // ines_mapr_setup looks its mapper up through nes_mapper_lookup -- and one
  // pass collected only the first level.
  // (Collected below, with the static methods of other classes.)

  const constructors = sources.flatMap(({ file, source }) => parseMameConstructors(file, source));
  // A helper class declared beside a device often defines its constructor
  // inline (`m6805_timer(m6805_base_device &parent) : m_parent(parent) ... {}`),
  // which the out-of-line parser above does not see.
  // A class template's constructor is the template's, whatever the instance.
  const constructorOf = (qualified: string) =>
    constructors.find(candidate => candidate.className === qualified.replace(/\s*<[\s\S]*>$/, '')) ??
    inlineConstructor(sources, qualified);
  // A static method of another class these sources declare, called by its
  // qualified name: ymfm's engine numbers its channels and operators with
  // `RegisterType::channel_offset(chnum)`, a static of the register class it
  // is instantiated over. Read from the constructors too, which are lowered
  // later but call it.
  const constructorText = options.nestedClass
    ? hierarchy.map(className => specialize(className, constructorOf(className)?.body ?? '')).join('\n')
    : '';
  // A class template's static function, named with its type argument where
  // a table points at it: each block of a DISCRETE sound table builds its
  // node through `&discrete_node_factory<C>::create`, which the machine
  // configuration hands the device as data (static-aggregate.ts). Each named
  // instance is the template's body with the argument in place of the
  // parameter, so its `std::make_unique<C>()` allocates that class.
  // The device's own: a class it allocates is compiled with the same options.
  for (const reference of new Set(options.nestedClass ? [] : options.references ?? [])) {
    const named = /^(\w+)<([\w:]+)>::(\w+)$/.exec(reference);
    const declaration = named ? classes.get(named[1]!) : undefined;
    const [parameter] = declaration?.templateParameters ?? [];
    if (!named || !declaration || !parameter || methods.some(candidate => candidate.name === reference)) continue;
    if (!new RegExp(`\\bstatic\\b[^;{}]*\\b${named[3]}\\s*\\(`).test(declaration.body)) continue;
    const helper = inlineMethods(declaration).find(method => method.name === named[3]);
    if (!helper) continue;
    const bind = (text: string) => text.replace(new RegExp(`\\b${parameter}\\b`, 'g'), named[2]!);
    replaceOrAppend({ ...helper, name: reference, className: '', body: bind(helper.body), parameters: bind(helper.parameters) });
  }
  // A free function handed to a constructor as a value (`dac_mapper_unsigned`
  // in DAC_GENERATOR's base call), which a function-pointer member then calls.
  const sourceText = sources.map(({ source }) => source).join('\n');
  // Or stored as one: segaic16's tilemap_init sets
  // `info->draw_layer = tilemap_16a_draw_layer;`, and tilemap_draw calls
  // `(*info->draw_layer)(...)` -- every System 16 background layer.
  const handedOn = new Set(sourceMethods.filter(helper => helper.className === '' &&
    new RegExp(`(?<=[(,]\\s*)${helper.name}(?=\\s*[,)])|(?<=[^=!<>]=\\s*)${helper.name}(?=\\s*;)`).test(sourceText)).map(helper => helper.name));
  // A struct's inline method calling a free function by its namespace
  // (`ymfm_output::roundtrip_fp()` runs `ymfm::roundtrip_fp(data[index])`)
  // names the function, not itself: the qualified spelling is the free
  // function's too. Unbound, every YM2151 sample came back as the call.
  const structText = sources.flatMap(({ source }) => structBlocks(stripCppComments(source)).map(block => block.body)).join('\n');
  for (const call of new Set([...structText.matchAll(/(?<![\w:])(\w+)::(\w+)\s*\(/g)]
    .filter(match => namespaces.includes(match[1]!)).map(match => `${match[1]}::${match[2]}`))) {
    const name = call.slice(call.indexOf('::') + 2);
    const helper = sourceMethods.find(method => method.className === '' && method.name === name);
    if (helper && !methods.some(candidate => candidate.name === call)) replaceOrAppend({ ...helper, name: call });
  }
  // Or unqualified: `ymfm_output::clamp16()` runs `clamp(data[index], -32768,
  // 32767)`, a free function of ymfm.h. Unbound, every YM2610 FM sample was
  // the call.
  for (const name of new Set([...structText.matchAll(/(?<![\w:.>])(\w+)\s*\(/g)].map(match => match[1]!))) {
    const helper = sourceMethods.find(method => method.className === '' && method.name === name);
    if (helper && !methods.some(candidate => candidate.name === name)) replaceOrAppend(helper);
  }
  const heldAliases = namespaceAliasMap(sources);
  const staticCalls = new Set<string>();
  for (let added = true; added;) {
    added = false;
    const called = [...methodBodies.values(), constructorText].join('\n');
    for (const helper of sourceMethods) {
      if (helper.className !== '') continue;
      if (methods.some(candidate => candidate.name === helper.name)) continue;
      if (!new RegExp(`\\b${helper.name}\\s*\\(`).test(called) && !handedOn.has(helper.name)) continue;
      replaceOrAppend(helper);
      added = true;
    }
    // Called, or handed on as a function: discrete.cpp queues its tasks with
    // `osd_work_item_queue(m_queue, discrete_task::task_callback, ...)`.
    const named = [
      ...called.matchAll(/(?<![\w:])(\w+)::(\w+)\s*\(/g),
      ...called.matchAll(/(?<=[(,]\s*)(\w+)::(\w+)(?=\s*[,)])/g),
    ];
    for (const call of new Set(named.map(match => `${match[1]}::${match[2]}`))) {
      const [className, name] = call.split('::') as [string, string];
      // Through a namespace alias of a template instance: the OPN engine's
      // `RegisterType::operator_offset(opnum)` is `opn_registers::...`, which
      // is opn_registers_base<false>'s, its body read with `IsOpnA` false.
      // Unlowered, every operator's register offset was the call itself.
      const alias = classes.has(className) ? undefined : /^(\w+)\s*<([\s\S]*)>$/.exec(heldAliases.get(className) ?? '');
      const root = alias?.[1] ?? className;
      const declaration = classes.get(root);
      if (!declaration || hierarchy.includes(root) || staticCalls.has(call)) continue;
      staticCalls.add(call);
      if (!new RegExp(`\\bstatic\\b[^;{}]*\\b${name}\\s*\\(`).test(declaration.body)) continue;
      const helper = inlineMethods(declaration).find(method => method.name === name) ??
        sourceMethods.find(method => method.className === root && method.name === name);
      if (!helper) continue;
      const args = alias ? splitMameArgs(alias[2]!).map(argument => argument.trim()) : [];
      const bound = (text: string): string => (declaration.templateParameters ?? []).reduce((result, parameter, index) =>
        args[index] === undefined ? result : result.replace(new RegExp(`\\b${parameter}\\b`, 'g'), args[index]!), text);
      replaceOrAppend(alias
        ? { ...helper, name: call, className: '', body: bound(helper.body), parameters: bound(helper.parameters) }
        : { ...helper, name: call, className: '' });
      added = true;
    }
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
  // A file can define several devices (joystick.cpp: neogeo_joystick_device
  // and neogeo_joy_ac_device both bind an `m_ss`), so the hierarchy's own
  // constructors name a member's finder before any other constructor does.
  const constructorBindings: Record<string, string[]> = {
    ...memberConstructorBindings(sources.map(source => source.source).join('\n')),
    ...Object.fromEntries(constructors
      .filter(candidate => hierarchy.includes(candidate.className))
      .reverse()
      .flatMap(candidate => candidate.initializers)
      .filter(initializer => /^m_\w+$/.test(initializer.name))
      .map(initializer => [initializer.name, initializer.args.map(argument => argument.trim())])),
  };
  // The device's own mutable file-scope state is its state too: the NEC core
  // keeps its ModRM decode table and parity table as `static struct {...}
  // Mod_RM;` and `static uint8_t parity_table[256];` beside the class, fills
  // them in device_start and reads them in every instruction. Not members,
  // every register field decoded as AW.
  // A header the sources include from their own directory counts as theirs:
  // the NEC's Mod_RM is declared in necmodrm.h, which nec.cpp includes.
  const ownIncludes = [...new Set(sources.flatMap(({ file, source }) =>
    [...source.matchAll(/^[ \t]*#\s*include\s+"([^"]+)"/gm)].map(found => join(dirname(file), found[1]!))))]
    .filter(file => !sources.some(source => source.file === file) && existsSync(join(mameSrc, file)));
  const fileStatics = [fileScopeStatics([...sources.map(source => source.source),
    ...ownIncludes.map(file => readFileSync(join(mameSrc, file), 'utf8'))]),
  libraryExterns(mameSrc, [...sources.map(source => source.source),
    ...ownIncludes.map(file => readFileSync(join(mameSrc, file), 'utf8'))])].filter(Boolean).join('\n');
  if (fileStatics) classes.set(FILE_STATICS, { name: FILE_STATICS, body: fileStatics, bases: [] } as unknown as MameClass);
  const members: GeneratedDeviceMember[] = [...hierarchy, ...(fileStatics ? [FILE_STATICS] : [])].flatMap(className => {
    const declaration = classes.get(className);
    if (!declaration) return [];
    // The class's constants size its arrays: the AY-3-8910's
    // `m_vol_table[NUM_CHANNELS][16]` was no array at all without them, and
    // every sample it rendered read volume zero.
    // A type named inside a class is that class's own before any other of
    // the name: atari_motion_objects_config's `entry m_link_entry` is its
    // nested `entry { uint16_t data[4]; }`, not emumem's handler `entry`,
    // and taking that one gave sprite_parameter::set a struct with no data.
    // Only where the bare name is ambiguous -- another struct of that name is
    // known -- since a class's own nested type is otherwise registered (and
    // its allocation compiled) under the bare name: qualifying
    // sprite_parameter cut its members off from their methods.
    const scoped = (type: string): string => {
      const bare = type.replace(/\*$/, '').trim();
      const own = structFields.get(`${className}::${bare}`);
      const other = structFields.get(bare);
      return !bare.includes('::') && own && other && JSON.stringify(own) !== JSON.stringify(other)
        ? type.replace(bare, `${className}::${bare}`)
        : type;
    };
    return memberDeclarations(declaration, constants).map(member => ({
      ...member,
      name: emittedMemberName(className, member.name),
      valueType: scoped(specialize(className, member.valueType)),
    })).flatMap(member => {
      if (member.valueType.startsWith('devcb_')) {
        callbacks.push({
          signal: member.name.replace(/^m_/, ''),
          member: member.name,
          slots: callbackSlots(member.valueType, constants),
          initial: member.valueType.startsWith('devcb_read8') ? 0xff : 0,
        });
        return [];
      }
      const bits = integerBits(member.valueType);
      const signed = integerSigned(member.valueType);
      // A fixed array's length is read from the whole source file, where
      // another class may declare an array of the same name: multigame.h's
      // `int m_latch, m_reset;` took a neighbour's `m_latch[2]`, and the 22 Games
      // multicart's latch became an array. Only a member declared with a
      // bound is one.
      const allocated = allocatedArrays.get(member.name) ??
        (member.arrayLength ? fixedArrays.get(member.name) : undefined);
      const allSource = sources.map(candidate => candidate.source).join('\n');
      // Or hands it to an object holding a `std::vector<T> &` that appends
      // through the reference: ymfm_saved_state(m_save_blob, true) writes the
      // DS1001's save blob with `m_buffer.push_back`.
      const pushed = new RegExp(`\\b${member.name}\\s*\\.\\s*(?:push_back|emplace_back)\\s*\\(`).test(allSource) ||
        (new RegExp(`[(,]\\s*${member.name}\\s*[,)]`).test(allSource) &&
          /std::vector<[^<>;]+>\s*&\s*(\w+)\s*;[\s\S]*/.test(allSource) &&
          [...allSource.matchAll(/std::vector<[^<>;]+>\s*&\s*(\w+)\s*;/g)].some(reference =>
            new RegExp(`\\b${reference[1]}\\s*\\.\\s*(?:push_back|emplace_back)\\s*\\(`).test(allSource)));
      const memory = memoryContainer(member.valueType, member.name, constructorBindings, pushed);
      const finder = finderBinding(member.valueType, member.name, constructorBindings, constants);
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
  members.push(...staticStructConstants(sources, structFields, constants, members, [...methodBodies.values()].join('\n')));
  // A static array of one of the device's own classes, defined out of line
  // and qualified by that class: `uint8_t const ds1001::s_default_instruments[]
  // = {...}`. It is that class's, not the file's -- ymfm defines one of the
  // same name for each of its four OPLL variants -- and a method may use it
  // whole, as a pointer (the DS1001's default patch set).
  for (const className of hierarchy) {
    for (const { source } of sources) {
      for (const match of stripCppComments(source).matchAll(new RegExp(
        String.raw`(?:^|[;}\s])(?:const\s+)?[\w:]+(?:\s+const)?\s+${className}::(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]*)\}\s*;`, 'g'))) {
        const values = splitMameArgs(match[2]!).map(value => value.trim()).filter(Boolean)
          .map(value => evalExpr(value, constants));
        if (!values.length || values.some(value => value === null || !Number.isFinite(value))) continue;
        const name = emittedMemberName(className, match[1]!);
        const existing = members.find(member => member.name === name);
        if (existing) Object.assign(existing, { values: values as number[], arrayLength: values.length });
        else members.push({ name, valueType: 'auto', values: values as number[], arrayLength: values.length });
      }
    }
  }
  // A class's non-const static storage, defined out of the class: okiadpcm.cpp's
  // `int oki_adpcm_state::s_diff_lookup[49*16];`, which compute_tables() fills
  // and clock() reads, and `bool oki_adpcm_state::s_tables_computed = false;`.
  // Never declared, both read as nothing: every OKI6295 voice decoded to 0
  // and the chip was silent.
  for (const className of hierarchy) {
    for (const { source } of sources) {
      for (const match of stripCppComments(source).matchAll(new RegExp(
        String.raw`(?:^|[;}])\s*((?:unsigned\s+|signed\s+)?[A-Za-z_][\w:]*)\s+${className}::(\w+)\s*(?:\[([^\]]+)\])?\s*(?:=\s*([^;{}()]+))?\s*;`, 'gm'))) {
        const [, valueType, field, bound, initial] = match;
        if (/^(?:const|constexpr|static|return)$/.test(valueType!)) continue;
        const name = emittedMemberName(className, field!);
        if (members.some(member => member.name === name)) continue;
        if (bound !== undefined) {
          const length = evalExpr(bound, constants);
          if (length === null || !Number.isInteger(length) || length <= 0 || length > 1 << 20) continue;
          members.push({ name, valueType: valueType!, arrayLength: length, values: new Array<number>(length).fill(0) });
        } else {
          const value = initial === undefined ? 0
            : /^\s*true\s*$/.test(initial) ? 1 : /^\s*false\s*$/.test(initial) ? 0 : evalExpr(initial, constants);
          if (value === null || !Number.isFinite(value)) continue;
          members.push({ name, valueType: valueType!, initial: value });
        }
      }
    }
  }
  const regionResources = Object.fromEntries(members.flatMap(member => {
    // `optional_memory_region m_region_rom(*this, "^maincpu")`: the region
    // itself, asked found(), bytes() and base() (a Neo Geo cartridge's ROMs).
    const object = /^(?:required|optional)_memory_region$/.test(member.valueType);
    if (!object && !/^(?:required|optional)_region_ptr<[^>]+>$/.test(member.valueType)) return [];
    const target = constructorBindings[member.name]?.at(-1) ?? '';
    const name = target === 'DEVICE_SELF' ? 'self' : unquoteToken(target);
    // A region pointer is indexed in its element type: segaic16's sprite
    // devices read `required_region_ptr<uint16_t>` a word at a time, and its
    // bytes() counts the whole region.
    const element = /_region_ptr<\s*([^>]+?)\s*>$/.exec(member.valueType)?.[1];
    const bits = element ? integerBits(element) : undefined;
    const elementBytes = bits === 16 ? 2 as const : bits === 32 ? 4 as const : undefined;
    return name ? [[member.name, object
      ? { kind: 'region-object' as const, name }
      : { kind: 'region' as const, name, ...(elementBytes ? { elementBytes } : {}) }]] : [];
  }));
  for (const className of hierarchy) {
    const body = classes.get(className)?.body ?? '';
    for (const accessor of body.matchAll(
      /\bauto\s+(\w+)\s*\([^)]*\)\s*\{\s*return\s+(m_\w+)(?:\[([^\]]+)\])?\.bind\s*\(\s*\)\s*;\s*\}/g,
    )) {
      const callback = callbacks.find(candidate => candidate.member === accessor[2]);
      if (!callback) continue;
      // One accessor per element of a devcb array (`porta_r()` binds
      // m_port_cb_r[0], `portb_r()` [1]) names that element; an accessor over
      // a template index (`portan_r<N>()`) names the whole array.
      const element = accessor[3] === undefined ? undefined : evalExpr(accessor[3].trim(), constants);
      if (element !== undefined && element !== null && Number.isInteger(element)) {
        (callback.aliases ??= []).push({ signal: accessor[1]!, slot: element });
      } else {
        callback.signal = accessor[1]!;
      }
    }
  }
  // An accessor that forwards to another names the same callback: ymopm.h's
  // `auto port_write_handler() { return io_write_handler(); }`, the name
  // System 16A wires the uPD7751's RESET and IRQ to. Unread, the YM2151's CT
  // port reached nothing and Shinobi never played a voice sample. With no
  // argument the target's default index applies (`int index = 0`).
  for (const className of hierarchy) {
    const body = classes.get(className)?.body ?? '';
    for (const forward of body.matchAll(/\bauto\s+(\w+)\s*\(\s*\)\s*\{\s*return\s+(\w+)\s*\(\s*([^()]*)\)\s*;\s*\}/g)) {
      const [, name, target, argument] = forward as unknown as [string, string, string, string];
      if (callbacks.some(candidate => candidate.signal === name || candidate.aliases?.some(alias => alias.signal === name))) continue;
      const direct = callbacks.find(candidate => candidate.signal === target);
      if (direct) {
        const slot = argument.trim() ? evalExpr(argument.trim(), constants) : 0;
        if (slot !== null && Number.isInteger(slot)) (direct.aliases ??= []).push({ signal: name, slot });
        continue;
      }
      for (const candidate of callbacks) {
        const alias = candidate.aliases?.find(entry => entry.signal === target);
        if (alias) { candidate.aliases!.push({ signal: name, slot: alias.slot }); break; }
      }
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
  const constructorStrings: Record<string, string> = {};
  const constructorPointers: Record<string, string> = {};
  const constructorBodies: { body: string; env: Record<string, number>; className: string }[] = [];
  const constructorChain: ConstructorChainValues = { structs: {}, spaceConfigs: {} };
  const constructorValues = constructorInitialValues(
    definition.className,
    sources.map(source => source.source).join('\n'),
    constants,
    constructorStrings,
    constructorPointers,
    constructorBodies,
    resolvedMemberName,
    constructorChain,
  );
  // A struct member the chain builds from a brace list: the 6805's m_params,
  // its opcode and cycle tables and its address width among the fields.
  for (const [name, value] of Object.entries(constructorChain.structs)) {
    const member = members.find(candidate => candidate.name === name);
    if (!member) continue;
    delete member.initial;
    delete member.values;
    member.fields = Object.keys(value).map(field => ({ name: field }));
    member.initialValue = value;
  }
  for (const member of members) {
    if (constructorValues[member.name] !== undefined) {
      member.initial = constructorValues[member.name];
    }
    if (constructorStrings[member.name] !== undefined) member.initialText = constructorStrings[member.name];
  }
  // A `const` pointer the constructor aims at a file-scope struct reads that
  // struct and nothing else, so it holds a copy of it: the AY-3-8910's mixer
  // tables are built from `m_par->res[...]`, and with the pointer left at 0
  // every level was zero -- the Sunsoft 5B played nothing.
  for (const member of members) {
    const target = constructorPointers[member.name];
    const table = target ? members.find(candidate => candidate.name === target) : undefined;
    if (!table?.fields || !table.initialValue || !/^const\b/.test(member.valueType)) continue;
    member.fields = table.fields;
    member.initialValue = structuredClone(table.initialValue);
    delete member.initial;
  }
  // A member the constructor chain hands a file-scope table: the 6800's
  // opcode handlers (method names, CALL_METHOD's) and cycle counts.
  for (const [name, values] of Object.entries(constructorChain.tables ?? {})) {
    const member = members.find(candidate => candidate.name === name);
    if (!member) continue;
    member.values = values;
    delete member.initial;
  }
  // A pointer member the constructor points at a file-scope table holds that
  // table: the speaker's `m_levels(default_levels)`, `{ 0.0, 1.0 }`.
  const tables = constructorTableValues(
    definition.className,
    sources.map(source => source.source).join('\n'),
    constants,
  );
  for (const member of members) {
    const table = tables[member.name];
    if (!table) continue;
    member.values = table;
    delete member.initial;
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
    /(?<![\w.>])(\w+)(\s*\[[^\]]*\])?\s*=\s*(?:machine\(\)\s*\.\s*scheduler\(\)\s*\.\s*)?timer_alloc\s*\(\s*(?:FUNC\(\s*\w+::(\w+)\s*\))?/g,
  )].filter(match => match[1]!.startsWith('m_') || memberOwners.has(match[1]!)).map(match => {
    // An element of a timer array names the array, and the array its count.
    const count = match[2] ? members.find(member => member.name === match[1])?.arrayLength : undefined;
    return [match[1]!, {
      member: match[1]!,
      ...(match[3] ? { callback: match[3] } : {}),
      ...(count ? { count } : {}),
    }] as const;
  }))).values()];
  const diagnostics = methods.reduce(
    (count, method) => count + method.program.diagnostics.length,
    0,
  );
  const source = sources.map(candidate => candidate.source).join('\n');
  const clockDivider = executionClockDivider(methodBodies.get('execute_cycles_to_clocks') ?? '');
  const inputDefaults = deviceInputDefaults(methodBodies.get('device_input_ports'), source);
  const dataAddressBits = executionDataAddressBits(definition.className, source, constants);
  const spaces = deviceAddressSpaces(definition.className, hierarchy, source, constants, methodBodies, constructorChain.spaceConfigs);
  // An address_space_config member is the configuration its initializer
  // gives, field by field, as code reads it back: the 68000's default CPU
  // space map places its autovectors at `make_bitmask<offs_t>(
  // m_cpu_space_config.m_addr_width) - 0xf`. As a bare number the width
  // was nothing, and the autovectors sat at negative addresses.
  for (const [name, config] of Object.entries(constructorChain.spaceConfigs)) {
    const member = members.find(candidate => candidate.name === name);
    if (!member || member.fields) continue;
    member.fields = [
      { name: 'm_data_width', bits: 8 }, { name: 'm_addr_width', bits: 8 },
      { name: 'm_addr_shift', bits: 8, signed: true }, { name: 'm_logaddr_width', bits: 8 },
      { name: 'm_page_shift', bits: 8 }, { name: 'm_endianness', bits: 8 },
    ];
    member.initialValue = {
      m_data_width: config.dataBits, m_addr_width: config.addressBits,
      m_addr_shift: config.addressShift ?? 0, m_logaddr_width: config.addressBits,
      m_page_shift: 0, m_endianness: config.endianness === 'big' ? 1 : 0,
    };
  }

  // Devices this one builds out of other devices. MAME writes them as
  // `TYPE(config, m_member)` inside device_add_mconfig -- a method that is not
  // executable behaviour, which is why it is ignored for lowering, but it is
  // where the device says what it is made of.
  const children: NonNullable<GeneratedDeviceDefinition['children']> = [];
  const omittedChildren: NonNullable<GeneratedDeviceDefinition['omittedChildren']> = [];
  const mconfig = methodBodies.get('device_add_mconfig');
  if (mconfig) {
    const nested = new Set([...compiling, type]);
    const known = indexMameHardware(mameSrc);
    // An element of a device array is added the same way, in a loop over the
    // array: `Z80CTC_CHANNEL(config, m_channel[ch])`.
    for (const match of mconfig.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\(\s*config\s*,\s*(m_\w+)(?:\s*\[[^\]]*\])?/g)) {
      const [, childType, member] = match;
      if (!childType || !member || nested.has(childType)) continue;
      if (children.some(existing => existing.member === member)) continue;
      const childDefinition = known.get(childType);
      if (!childDefinition) continue;
      const child = compileMameDevice(mameSrc, childDefinition, childType, nested);
      // A child that does not lower is left out of the device rather than
      // approximated -- and said so, here and in the definition: the VRC7's
      // DS1001 was dropped this way for years with nothing to show for it.
      if (child.summary.diagnostics) {
        omittedChildren.push({ member, type: childType, diagnostics: child.summary.diagnostics });
        console.warn(`  ! ${type}: child ${childType} (${member}) left out, ${child.summary.diagnostics} compiler diagnostics`);
        continue;
      }
      const delegateTargets: Record<string, string> = {};
      for (const setter of mconfig.matchAll(new RegExp(
        String.raw`\b${member}\s*->\s*(\w+)\s*\(\s*FUNC\s*\(\s*\w+::(\w+)\s*\)\s*\)`, 'g'))) {
        const delegate = child.delegates?.[setter[1]!];
        if (delegate) delegateTargets[delegate] = setter[2]!;
      }
      // Its devcbs this device binds to its own methods: the RP2A03's
      // `m_apu->irq().set(FUNC(rp2a03_device::apu_irq))` and
      // `m_apu->mem_read().set(FUNC(rp2a03_device::apu_read_mem))`.
      const callbackTargets: Record<string, string> = {};
      for (const setter of mconfig.matchAll(new RegExp(
        String.raw`\b${member}\s*->\s*(\w+)\s*\(\s*\)\s*\.\s*set\s*\(\s*FUNC\s*\(\s*\w+::(\w+)\s*\)\s*\)`, 'g'))) {
        if (child.callbacks.some(callback => callback.signal === setter[1])) callbackTargets[setter[1]!] = setter[2]!;
      }
      // `TYPE(config, m_member, options_function, ...)`: a slot's card table.
      const call = mconfig.slice(match.index + match[0].length);
      const slotOptions = /^\s*,\s*([a-z_]\w*)\s*[,)]/.exec(call)?.[1];
      // The rest of the constructor call, and what the statement chains on it:
      // `VRC6(config, m_vrc6snd, XTAL(21'477'272)/12).add_route(ALL_OUTPUTS,
      // "addon", 1.0)`. A clock that is not the owner's is the child's own
      // (VRC7's DS1001 runs at twice its card's), and a route is where a
      // sound child's stream is mixed, at MAME's own gain.
      let depth = 1;
      let close = 0;
      for (; close < call.length && depth > 0; close++) {
        if (call[close] === '(') depth++;
        else if (call[close] === ')') depth--;
      }
      const extra = splitMameArgs(call.slice(0, Math.max(0, close - 1)).replace(/^\s*,/, ''))
        .map(argument => argument.trim()).filter(Boolean);
      // No clock argument is clock 0 (device_t keeps what it was given);
      // DERIVED_CLOCK, or anything else that does not evaluate, takes the owner's.
      const childClock = slotOptions ? null : extra[0] ? evalExpr(extra[0], constants) : 0;
      const chained = call.slice(close, Math.max(close, call.indexOf(';', close)));
      const separate = [...mconfig.matchAll(new RegExp(String.raw`\b${member}\s*->\s*(add_route\s*\([^;]*)\s*;`, 'g'))]
        .map(route => `.${route[1]}`).join('');
      // A route into this device itself (`add_route(ALL_OUTPUTS, *this, 1.0)`)
      // makes it the child's mixer, as MAME's device_mixer_interface is: its
      // target is "*this".
      const routes = [...`${chained}${separate}`.matchAll(
        /\.add_route\s*\(\s*(\w+)\s*,\s*(?:"([^"]+)"|(\*\s*this))\s*,\s*([\d.]+)/g,
      )].map(route => ({ output: route[1] === 'ALL_OUTPUTS' ? -1 : Number(route[1]), target: route[2] ?? '*this', gain: Number(route[4]) }))
        .filter(route => Number.isFinite(route.output));
      const childSlot = slotOptions ? composeChildSlot(mameSrc, child, slotOptions, nested) : undefined;
      if (childSlot) child.slot = childSlot;
      // The child's tag, as its finder names it: `m_vrc7snd(*this, "vrc7snd")`.
      const childTag = unquoteToken(constructorBindings[member]?.at(-1) ?? '');
      const tags = deviceArrayTags(
        members.find(candidate => candidate.name === member)?.valueType ?? '',
        constructorBindings[member] ?? [],
        constants,
      );
      children.push({
        member, type: childType, definition: child,
        ...(childTag && !tags ? { tag: childTag } : {}),
        ...(childClock !== null && childClock >= 0 ? { clock: childClock } : {}),
        ...(routes.length ? { routes } : {}),
        ...(Object.keys(delegateTargets).length ? { delegateTargets } : {}),
        ...(Object.keys(callbackTargets).length ? { callbackTargets } : {}),
        ...(slotOptions && /\bget_card_device\s*\(/.test(child.sourceFiles.map(file => readFileSync(join(mameSrc, file), 'utf8')).join('\n'))
          ? { slotOptions } : {}),
        ...(tags ? { tags } : {}),
      });
    }
    // A child added by its tag rather than its finder, which a finder array
    // names by format: pit8253's `PIT_COUNTER(config, "counter0")` ...
    // `"counter2"` are its `m_counter(*this, "counter%u", 0U)`. Each array
    // is one child entry with the tags in order.
    const byTag = new Map<string, { member: string; index: number; count: number }>();
    for (const member of members) {
      const tags = deviceArrayTags(member.valueType ?? '', constructorBindings[member.name] ?? [], constants);
      tags?.forEach((tag, index) => byTag.set(tag, { member: member.name, index, count: tags.length }));
    }
    const tagged = new Map<string, { type: string; tags: string[] }>();
    for (const match of mconfig.matchAll(/\b([A-Z][A-Z0-9_]{2,})\s*\(\s*config\s*,\s*"([^"]+)"\s*\)/g)) {
      const owner = byTag.get(match[2]!);
      if (!owner || nested.has(match[1]!) || children.some(existing => existing.member === owner.member)) continue;
      const entry = tagged.get(owner.member) ?? { type: match[1]!, tags: new Array<string>(owner.count) };
      if (entry.type !== match[1]) continue;
      entry.tags[owner.index] = match[2]!;
      tagged.set(owner.member, entry);
    }
    for (const [member, { type: childType, tags }] of tagged) {
      if (tags.some(tag => tag === undefined)) continue;
      const childDefinition = known.get(childType);
      if (!childDefinition) continue;
      const child = compileMameDevice(mameSrc, childDefinition, childType, nested);
      if (child.summary.diagnostics) {
        omittedChildren.push({ member, type: childType, diagnostics: child.summary.diagnostics });
        console.warn(`  ! ${type}: child ${childType} (${member}) left out, ${child.summary.diagnostics} compiler diagnostics`);
        continue;
      }
      // No clock argument: the owner sets each one up in device_resolve_objects.
      children.push({ member, type: childType, definition: child, clock: 0, tags });
    }
    configureChildren(mconfig, children);
  }
  inlineReferenceCallees(methods);
  // Bitmap entry points are necessarily frame/scanline hot paths. Methods
  // installed through FUNC(...) are hardware callbacks too: a child MCU can
  // invoke a tiny parent-port handler hundreds of thousands of times per
  // second. Selecting both shapes keeps source-derived execution direct
  // without naming any particular device family.
  const callbackMethods = new Set([...source.matchAll(
    /\bFUNC\s*\(\s*[A-Za-z_]\w*(?:::[A-Za-z_]\w*)*::([A-Za-z_]\w*)(?:\s*<\s*(\d+)\s*>)?\s*\)/g,
  )].map(match => match[2] === undefined ? match[1]! : `${match[1]}_${match[2]}`));
  // A loop three deep is a bulk transform over a whole table or ROM:
  // neosprite_optimized_device::optimize_helper decodes all 16 MB of Metal
  // Slug's sprites, pixel by pixel, at every reset.
  const loopDepth = (operations: readonly GeneratedHandlerOperation[]): number => Math.max(0, ...operations.map(operation => {
    if (operation.op === 'for' || operation.op === 'while' || operation.op === 'do-while') return 1 + loopDepth(operation.body);
    if (operation.op === 'if') return Math.max(loopDepth(operation.then), loopDepth(operation.else ?? []));
    if (operation.op === 'switch') return Math.max(0, ...operation.cases.map(entry => loopDepth(entry.body)));
    if (operation.op === 'try') return Math.max(loopDepth(operation.body), ...operation.catches.map(entry => loopDepth(entry.body)));
    return 0;
  }));
  const hotMethods = methods
    .filter(method =>
      !method.program.diagnostics.length &&
      (
        /\bbitmap_(?:rgb32|ind16)\s*&/.test(method.parameters) ||
        callbackMethods.has(method.name) ||
        loopDepth(method.program.operations) >= 3
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
  // An int one too: the TIA's `int current_x()` computes in u64 from
  // total_cycles() and returns `3 * (...) - 68`, negative for the first 68
  // colour clocks, which only the conversion to int makes negative again.
  const RETURN_WIDTHS: Record<string, 8 | 16 | 32 | -8 | -16 | -32> = {
    u8: 8, uint8_t: 8, s8: -8, int8_t: -8, u16: 16, uint16_t: 16, s16: -16, int16_t: -16,
    u32: 32, uint32_t: 32, offs_t: 32, unsigned: 32, s32: -32, int32_t: -32, int: -32,
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
  // A method returning a reference is an lvalue: the 6809's
  // `uint8_t &regop8() { return *m_reg8; }` is assigned through, as
  // `regop8() = read_operand();`, and `uint16_t &ireg()` picks X, Y, U or S
  // in a switch. Its `name=` method stores into whatever each return names,
  // which a call-result assignment runs.
  const isLvalue = (expression: GeneratedExpression) =>
    ['identifier', 'member', 'index'].includes(expression.kind) ||
    (expression.kind === 'unary' && expression.operator === '*');
  const assigned = '__assigned';
  const storing = (operations: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] | undefined => {
    const mapped: GeneratedHandlerOperation[] = [];
    for (const operation of operations) {
      if (operation.op === 'return') {
        if (!operation.value || !isLvalue(operation.value)) return undefined;
        // And answers what it stored, as the assignment's value is.
        mapped.push({ op: 'assign', target: operation.value, operator: '=', value: { kind: 'identifier', name: assigned } },
          { op: 'return', value: operation.value });
      } else if (operation.op === 'if') {
        const then = storing(operation.then);
        const otherwise = operation.else ? storing(operation.else) : [];
        if (!then || !otherwise) return undefined;
        mapped.push({ ...operation, then, ...(operation.else ? { else: otherwise } : {}) });
      } else if (operation.op === 'switch') {
        const cases = operation.cases.map(entry => ({ ...entry, body: storing(entry.body) }));
        if (cases.some(entry => !entry.body)) return undefined;
        mapped.push({ ...operation, cases: cases as typeof operation.cases });
      } else if (operation.op === 'for' || operation.op === 'while' || operation.op === 'do-while') {
        return undefined;
      } else {
        mapped.push(operation);
      }
    }
    return mapped;
  };
  for (const method of [...methods]) {
    const bare = method.name.split('::').at(-1)!;
    if (!method.program.operations.length || method.program.diagnostics.length) continue;
    const returnsReference = [...hierarchy].reverse().some(className =>
      new RegExp(`(?:^|[;{}:])\\s*(?:(?:virtual|static|inline)\\s+)*(?!const\\b)[\\w:<>]+\\s*&\\s*${bare}\\s*\\(`, 'm')
        .test(stripCppComments(classes.get(className)?.body ?? '')));
    if (!returnsReference || methods.some(candidate => candidate.name === `${method.name}=`)) continue;
    const operations = storing(method.program.operations);
    if (!operations) continue;
    methods.push({
      ...method,
      name: `${method.name}=`,
      parameters: [method.parameters.trim(), `u32 ${assigned}`].filter(parameter => parameter && parameter !== 'void').join(', '),
      program: { operations, diagnostics: [] },
    });
  }
  const romInterfaceBits = hierarchy.map(className => {
    const declaration = classes.get(className);
    if (!declaration?.bases.includes('device_rom_interface')) return undefined;
    const width = declaration.baseTemplateArguments?.device_rom_interface?.[0];
    return width === undefined ? undefined : evalExpr(width, constants) ?? undefined;
  }).find(width => width !== undefined);
  // A static table a method names whole, not by index, is state the device
  // holds: the microcoded 68000's device_start points `m_handlers_f` at
  // s_handlers_df (every state's handler, by member-function pointer) and
  // execute_run dispatches through `m_handlers_f[m_inst_state]`. Unnamed as a
  // value, the pointer held nothing to index.
  {
    const bodies = hierarchyFunctions.map(method => method.body).join('\n');
    const known = new Set(members.map(member => member.name));
    const methodNames = new Set(methods.map(method => method.name.split('::').at(-1)!));
    for (const [qualified, table] of Object.entries(sourceTables)) {
      const name = qualified.split('::').at(-1)!;
      if (known.has(name)) continue;
      // A two-dimensional one counts when code takes a row of it:
      // `m_cyc_exception = m68ki_exception_cycle_table[0]`.
      const used = table.columns === undefined
        ? new RegExp(`(?<![\\w.>])${name}\\b(?!\\s*\\[)`).test(bodies)
        : new RegExp(`(?<![\\w.>])${name}\\s*\\[[^\\]]*\\](?!\\s*\\[)`).test(bodies);
      if (!used) continue;
      const values = table.values.map(entry => {
        const text = entry.trim();
        const pointed = /^&\s*(?:\w+::)*(\w+)$/.exec(text)?.[1] ?? /^"(\w+)"$/.exec(text)?.[1];
        if (pointed !== undefined && methodNames.has(pointed)) return pointed;
        if (text === 'nullptr') return '';
        return evalExpr(text, constants) ?? undefined;
      });
      if (values.some(value => value === undefined)) continue;
      const columns = table.columns;
      members.push({ name, valueType: 'table', values: columns === undefined ? values
        : Array.from({ length: Math.ceil(values.length / columns) }, (_, row) => values.slice(row * columns, (row + 1) * columns)) });
      known.add(name);
    }
  }
  runConstructorBodies(constructorBodies.map(({ body, env, className }) =>
    ({ body: specialize(className, body), env })), members, methods, constants);
  // An XTAL reaches a device as its frequency, so `set_clk<0>(const XTAL &)`
  // and `set_clk<0>(double)` take the same number, and of overloads with the
  // same arity the runtime selects the last. MAME's XTAL overload forwards
  // `xtal.dvalue()` to the arithmetic one, which would then select itself
  // again; it goes first, so the call lands where MAME's does.
  const arithmetic = new Set(methods.filter(method => !/\bXTAL\b/.test(method.parameters)).map(method => method.name));
  const xtalOverloads = new Set(methods.filter(method => /\bXTAL\b/.test(method.parameters) && arithmetic.has(method.name)));
  if (xtalOverloads.size) {
    methods.sort((left, right) => Number(xtalOverloads.has(right)) - Number(xtalOverloads.has(left)));
  }
  const imageInterface = hierarchy.some(className => classes.get(className)?.bases.includes('device_image_interface'));
  const result: GeneratedDeviceDefinition = {
    schemaVersion: 1,
    type,
    className: definition.className,
    ...(definition.description ? { description: definition.description } : {}),
    hierarchy,
    sourceFiles,
    ...(romInterfaceBits ? { romInterface: { addressBits: romInterfaceBits } } : {}),
    ...(inputDefaults ? { inputDefaults } : {}),
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
    ...(Object.keys(structMethods).length ? { structMethods } : {}),
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
    ...(omittedChildren.length ? { omittedChildren } : {}),
    summary: {
      methods: methods.length,
      compiledMethods: methods.filter(method => !method.program.diagnostics.length).length,
      diagnostics,
    },
  };
  // A device with a constructor that takes something other than a clock as
  // its last argument and delegates to the clock one: the configuration's
  // argument is that one's, as C++ overload resolution has an int literal
  // pick it. `SLAPSTIC(config, m_slapstic, 104)` is
  // `atari_slapstic_device(..., int chipnum) : atari_slapstic_device(..., u32(0)) { m_chipnum = chipnum; }`.
  if (!options.nestedClass) {
    const leaf = definition.className.split('::').at(-1)!;
    const body = classes.get(definition.className)?.body ?? '';
    const pattern = new RegExp(`\\b${leaf}\\s*\\(\\s*const\\s+machine_config\\s*&\\s*\\w+\\s*,\\s*const\\s+char\\s*\\*\\s*\\w+\\s*,\\s*device_t\\s*\\*\\s*\\w+\\s*,\\s*(\\w+)\\s+\\w+\\s*\\)\\s*:\\s*${leaf}\\s*\\(\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*\\w+\\s*,\\s*(?:u32|uint32_t)\\s*\\(\\s*(\\d+)\\s*\\)\\s*\\)`);
    const overload = pattern.exec(body);
    const method = result.methods.find(candidate => candidate.name === leaf &&
      splitMameArgs(candidate.parameters).length === 4 && candidate.parameters.includes(overload?.[1] ?? '\0'));
    if (overload && !/^(?:u32|uint32_t)$/.test(overload[1]!) && method) {
      result.clockConstructor = { method: method.name, clock: Number(overload[2]) };
    }
  }
  const allocations: Record<string, GeneratedDeviceDefinition> = {};
  const compileNestedClass = (name: string, qualified: string): GeneratedDeviceDefinition => {
    if (compiling.has(qualified)) throw new Error(`cannot resolve nested MAME class ${qualified}`);
    if (!constructorOf(qualified)) throw new Error(`missing source constructor for ${qualified}`);
    const child = compileMameDevice(mameSrc, { ...definition, className: qualified }, qualified,
      new Set([...compiling, qualified]), { ...options, nestedClass: true });
    allocations[name] = child;
    return child;
  };
  // A member held by value whose type is a class this device declares inside
  // itself is an object with methods and state of its own, built as an
  // allocation is: one per element of its array.
  // A plain data struct (the vector generator's `vgvector`) is already
  // shaped by its fields; only a class with a constructor of its own is an
  // object to build.
  //
  // The class may also be a helper declared beside the device rather than
  // inside it -- the 6805's `m6805_timer m_timer`, built `m_timer(*this)` --
  // so long as it is not a device (those are children, found by tag).
  // A namespace alias names the instance it stands for: ymfm's OPN engine
  // holds `RegisterType m_regs`, which is `opn_registers`, which is
  // `opn_registers_base<false>`. Unresolved, no register file was built and
  // every write the YM2203's FM took went nowhere.
  for (const member of result.members) {
    if (member.memory || member.finder || member.fields) continue;
    const valueType = !classes.has(member.valueType.replace(/\s*<[\s\S]*>$/, '')) && heldAliases.get(member.valueType)
      ? heldAliases.get(member.valueType)!
      : member.valueType;
    // Looked up in the class and then outward through the scopes enclosing
    // it, as C++ does: dual_sprite_parameter's `sprite_parameter m_lower` is
    // the `atari_motion_objects_device::sprite_parameter` declared beside it.
    // Missed, both halves were zero and no motion object found a code.
    const enclosing = (className: string): string[] => {
      const parts = className.split('::');
      return parts.map((_, depth) => parts.slice(0, parts.length - depth).join('::'));
    };
    const owner = [...hierarchy].reverse().flatMap(enclosing)
      .find(className => classes.has(`${className}::${valueType}`));
    const qualified = owner ? `${owner}::${valueType}` : valueType;
    const template = qualified.replace(/\s*<[\s\S]*>$/, '');
    if (!owner && (!classes.has(template) || hierarchy.includes(qualified) || /_device$/.test(template))) continue;
    if (!constructorOf(qualified)) continue;
    const allocation = templateInstanceName(valueType);
    if (!allocations[allocation]) compileNestedClass(allocation, qualified);
    member.object = allocation;
    // Built as the owner's constructor builds it: `m_timer(*this)`, which
    // may be written inside the class (`ymfm_device_base`'s `m_chip(*this)`).
    const owning = [
      ...constructors.filter(candidate => hierarchy.includes(candidate.className)),
      ...hierarchy.flatMap(className => inlineConstructor(sources, className) ?? []),
    ].find(candidate => candidate.initializers.some(initializer => initializer.name === member.name));
    const initializer = owning?.initializers.find(candidate => candidate.name === member.name);
    // An argument naming the owning constructor's own parameter is that
    // parameter's default, when the derived class's base call leaves it out:
    // sprite_device's `m_dirty(dirty_granularity)`, with
    // `int dirty_granularity = 3`, which atarimo's base call never passes.
    // As a member name it read zero, and the dirty grid was one cell a pixel.
    const parameterDefaults = new Map(splitMameArgs(owning?.parameters ?? '').flatMap(parameter => {
      const name = /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.trim())?.[1];
      const fallback = cppDefaultArgument(parameter);
      return name && fallback !== undefined ? [[name, String(fallback)] as const] : [];
    }));
    // An array of them built one brace list an element, every one alike:
    // k053260's `m_voice{ { *this }, { *this }, { *this }, { *this } }` is
    // four voices each built with `*this`.
    const elementArgs = initializer?.args.length && initializer.args.every(argument => /^\{[\s\S]*\}$/.test(argument.trim())) &&
      new Set(initializer.args.map(argument => argument.replace(/\s+/g, ''))).size === 1
      ? splitMameArgs(initializer.args[0]!.trim().slice(1, -1)).map(argument => argument.trim()).filter(Boolean)
      : undefined;
    const args = elementArgs ?? initializer?.args;
    if (args?.length) {
      member.objectArgs = args.map(argument => parameterDefaults.get(argument.trim()) ?? argument.trim());
    }
    if (Array.isArray(member.values) && member.values.length > 1) member.arrayLength ??= member.values.length;
    delete member.values;
    delete member.initial;
  }
  if (options.nestedClass) {
    let constructor = constructorOf(definition.className)!;
    // A default argument lives on the declaration in the class, not on the
    // out-of-line definition: ymfm's `ym2610(ymfm_interface &intf, uint8_t
    // channel_mask = 0x36)`. Built as `m_chip(*this)`, the mask was 0 and
    // every YM2610 FM channel was off.
    {
      const leaf = definition.className.replace(/\s*<[\s\S]*>$/, '').split('::').at(-1)!;
      const body = stripCppComments(classes.get(definition.className.replace(/\s*<[\s\S]*>$/, ''))?.body ?? '');
      const defined = splitMameArgs(constructor.parameters).map(parameter => parameter.trim()).filter(Boolean);
      for (const declaration of body.matchAll(new RegExp(`(?<![\\w~])${leaf}\\s*\\(([^;{}()]*(?:\\([^()]*\\)[^;{}()]*)*)\\)\\s*;`, 'g'))) {
        const declared = splitMameArgs(declaration[1]!).map(parameter => parameter.trim()).filter(Boolean);
        if (declared.length !== defined.length || !declared.some(parameter => parameter.includes('='))) continue;
        const merged = defined.map((parameter, index) =>
          !parameter.includes('=') && declared[index]!.includes('=') ? `${parameter} = ${declared[index]!.slice(declared[index]!.indexOf('=') + 1).trim()}` : parameter);
        constructor = { ...constructor, parameters: merged.join(', ') };
        break;
      }
    }
    // A reference member (`m6805_base_device &m_parent;`) declares like a
    // function to the member scan; its constructor initializer says it is
    // state, so it becomes a member the constructor can bind.
    for (const initializer of constructor.initializers) {
      if (!/^m_\w+$/.test(initializer.name) || result.members.some(member => member.name === initializer.name)) continue;
      const leaf = (name: string) => name.split('::').at(-1);
      if (!result.methods.some(method => leaf(method.name) === initializer.name)) continue;
      result.methods = result.methods.filter(method => leaf(method.name) !== initializer.name);
      result.members.push({ name: initializer.name, valueType: 'reference' });
    }
    addSourceConstructor(result, constructor, true, base => hierarchy.includes(base) ? constructorOf(base) : undefined,
      text => specialize(definition.className, text));
    methods.splice(0, methods.length, ...result.methods);
  }
  // A local object of a helper class declared beside the device
  // (`samples_iterator iter(*this);`), built as a `new` would build it. The
  // declaration parses as a functional cast, and answering its methods as
  // unresolved calls would load no sample.
  // With more than one argument it parses as a call of the type's name
  // (`checker check(m_start, m_end, ...)`, the slapstic's address predicates),
  // and the class may be declared inside the device.
  // The class of the hierarchy a nested type is declared in, the leaf first:
  // m6809_base_device's `mi_default` for a KONAMI-1, konami1_device's own
  // `mi_konami1` before it.
  const nestedClassOwner = (type: string): string | undefined =>
    hierarchy.find(className => classes.has(`${className}::${type}`));
  for (const method of methods) walkOperations(method.program.operations, operation => {
    if (operation.op !== 'declare' || !operation.value) return;
    const value = operation.value;
    const args = value.kind === 'cast' && operation.valueType === value.valueType ? [value.operand]
      : value.kind === 'call' && value.callee.kind === 'identifier' && value.callee.name === operation.valueType ? value.args
        : undefined;
    const type = operation.valueType;
    if (!args || !type) return;
    // lib/util/flac.h wraps libFLAC, which is no MAME source; the host answers it.
    if (type === 'flac_decoder') {
      operation.value = { kind: 'call', callee: { kind: 'identifier', name: type }, args };
      return;
    }
    const owner = nestedClassOwner(type);
    const nested = owner !== undefined;
    const qualified = nested ? `${owner}::${type}` : type;
    if (!nested && (!classes.has(type) || hierarchy.includes(type) || /_device$/.test(type))) return;
    if (!constructorOf(qualified)) return;
    // A struct is plain data unless it defines methods of its own out of
    // line, which makes it an object as a class is: the slapstic's checker.
    if (structFields.has(type) && !sourceMethods.some(helper => helper.className === qualified)) return;
    operation.value = { kind: 'call', callee: { kind: 'identifier', name: `new::${type}` }, args };
  });
  // Collected first and compiled after the walk: each nested class is a whole
  // compile of its own, and started from inside the walk's recursion, ymfm's
  // chain of engine, channel and operator classes ran the stack out.
  const allocatedTypes = new Set<string>();
  for (const method of methods) walkExpressions(method.program.operations, expression => {
    if (expression.kind !== 'call' || expression.callee.kind !== 'identifier' || !expression.callee.name.startsWith('new::')) return;
    allocatedTypes.add(expression.callee.name.slice(5));
  });
  for (const allocated of allocatedTypes) {
    if (allocations[allocated]) continue;
    const name = instanceNames.get(allocated) ?? allocated;
    const owner = nestedClassOwner(name);
    const qualified = owner !== undefined ? `${owner}::${name}` : name;
    if (instanceNames.has(allocated)) {
      compileNestedClass(allocated, qualified);
      continue;
    }
    if (!classes.has(qualified)) throw new Error(`cannot resolve allocated MAME class ${qualified}`);
    compileNestedClass(name, qualified);
  }
  // A struct with methods and a constructor of its own, so the methods run
  // emitted: discrete's transform node pushes and pops a `double_stack` for
  // every term of its expression, every sample. Its values stay plain structs
  // (STRUCT_OF); only its methods come from the allocation.
  // Only where this class's own methods declare or build one, or the class
  // holds one as a member, so each struct is compiled beside the code that
  // calls it: each slapstic state holds its address predicates as `test`
  // members and calls them on every access the processor makes, and its
  // checker builds them (`return test(mask, value);`).
  const ownBodies = [...methodBodies.values()].join('\n');
  const heldTypes = new Set(result.members.map(member => member.valueType.split('::').at(-1)));
  for (const type of Object.keys(structMethods)) {
    const qualified = classes.has(type) ? type
      : [...hierarchy, definition.className].flatMap(className => className.split('::').slice(0, -1)
        .map((_scope, depth, scopes) => `${scopes.slice(0, depth + 1).join('::')}::${type}`))
        .find(candidate => classes.has(candidate)) ?? type;
    if (allocations[type] || compiling.has(qualified) || !classes.has(qualified) || hierarchy.includes(qualified) || !constructorOf(qualified)) continue;
    if (!structMethods[type]!.some(method => method.name === '__construct')) continue;
    if (!new RegExp(`\\b${type}\\s+\\w+\\s*;|(?<![\\w.>:])${type}\\s*\\(`).test(ownBodies) && !heldTypes.has(type)) continue;
    compileNestedClass(type, qualified);
  }
  if (Object.keys(allocations).length) result.allocations = allocations;
  annotateMemberCallReferences(result, classes, sourceMethods, hierarchy, heldAliases);
  for (const member of result.members) {
    const held = member.valueType.replace(/\bconst\b/g, '')
      .replace(/^\s*std::(?:unique_ptr|shared_ptr|array)\s*<\s*([\s\S]+?)\s*(?:,\s*\d+\s*)?>\s*$/, '$1')
      .replace(/[*&]/g, '').trim().replace(/\s*<[\s\S]*>$/, '');
    if (member.fields || member.memory || member.finder || !classes.has(held) || hierarchy.includes(held)) continue;
    if (/_device$/.test(held) || structFields.has(held) || !constructorOf(held)) continue;
    member.objectType = held;
  }
  lowerStructLocals(result, sources, mameSrc);
  result.summary = {
    methods: result.methods.length,
    compiledMethods: result.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: result.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0)
      + Object.values(allocations).reduce((sum, child) => sum + child.summary.diagnostics, 0),
  };
  // C++ block scope: a local that shadows a parameter or an outer local gets a
  // name of its own (src/ir/scope.ts), before either executor reads the IR.
  for (const method of result.methods) {
    renameShadowedLocals(method.program.operations,
      splitMameArgs(method.parameters).filter(parameter => parameter.trim() && parameter.trim() !== 'void').map(parameterName));
  }
  const declaredFloating = (method: MameFunction) => /\b(?:float|double)\b/.test(method.returnType ?? method.inlineReturnType ?? '') &&
    !/[*&]/.test(method.returnType ?? method.inlineReturnType ?? '');
  const everyMethod = [...sourceMethods, ...[...classes.values()].flatMap(declaration => inlineMethods(declaration))];
  const ownFloating = new Set(everyMethod.filter(method => hierarchy.includes(method.className) && declaredFloating(method)).map(method => method.name));
  // Free functions too, rescap.h's `constexpr double RES_K(double res)` among
  // them: dkong's `RES_2_PARALLEL(RES_K(5), RES_K(10))` is 3333.33 ohms, and
  // divided as integers it was 3333.
  for (const { source } of sources) {
    for (const match of stripCppComments(source).matchAll(/^[ \t]*(?:(?:static|inline|constexpr)\s+)*(?:float|double)\s+(\w+)\s*\([^;{}()]*\)\s*(?:noexcept\s*)?\{/gm)) {
      ownFloating.add(match[1]!);
    }
  }
  // Another object's method only where no class declares the name otherwise.
  const otherwise = new Set(everyMethod.filter(method => !declaredFloating(method)).map(method => method.name));
  const other = new Set(everyMethod.filter(method => declaredFloating(method) && !otherwise.has(method.name)).map(method => method.name));
  markFloatingNames(result, { own: ownFloating, other });
  return result;
}


/**
 * Mark the arguments of a call on a held or referenced object that its class
 * takes by non-const reference (`references` on the call), so a caller --
 * emitted or interpreted -- passes storage the callee writes back to. The
 * receiver's class is the member's declared type: `m_regs` is an
 * `opll_registers &`, `m_channel[i]` a `std::unique_ptr<fm_channel<...>>`.
 */
/** A parameter's type with its name, default and qualifiers gone: `discrete_step_interface`. */
function parameterBaseType(parameter: string): string {
  const declared = parameter.replace(/=.*$/s, '').trim();
  const name = /(\w+)\s*(?:\[[^\]]*\])?$/.exec(declared)?.[1];
  const type = name && !/^(?:const|unsigned|signed)$/.test(name) && declared.slice(0, -name.length).trim()
    ? declared.slice(0, declared.lastIndexOf(name)) : declared;
  return type.replace(/\b(?:const|volatile)\b/g, '').replace(/[*&\s]+/g, ' ').trim();
}

/**
 * The name an overload chosen by its parameter types is emitted under. C++
 * tells `interface(discrete_step_interface *&)` from
 * `interface(discrete_input_interface *&)` by type; the IR names methods, so
 * overloads of one arity that differ only in type each get their own.
 */
function typedOverloadName(name: string, parameters: string): string {
  const types = splitMameArgs(parameters).map(parameter => parameter.trim()).filter(parameter => parameter && parameter !== 'void')
    .map(parameter => parameterBaseType(parameter).replace(/\W+/g, '_'));
  return `${name}__${types.join('__')}`;
}

/** Methods of one name and arity that differ in their parameters' types. */
function typedOverloads<T extends { name: string; parameters: string }>(methods: readonly T[]): Set<T> {
  const arity = (parameters: string) => splitMameArgs(parameters).filter(parameter => parameter.trim() && parameter.trim() !== 'void').length;
  const groups = new Map<string, T[]>();
  for (const method of methods) {
    const key = `${method.name}/${arity(method.parameters)}`;
    groups.set(key, [...groups.get(key) ?? [], method]);
  }
  // Only overloads told apart by the class a pointer points at. Others the
  // compiler already chooses between its own way: an XTAL setter before its
  // arithmetic twin (#203), a screen update's bitmap by which one is used.
  const pointers = (parameters: string) => splitMameArgs(parameters).map(parameter => parameter.trim())
    .filter(parameter => parameter && parameter !== 'void');
  const overloaded = new Set<T>();
  for (const group of groups.values()) {
    const signatures = new Set(group.map(method => typedOverloadName(method.name, method.parameters)));
    if (signatures.size < 2) continue;
    const lists = group.map(method => pointers(method.parameters));
    const differing = lists[0]!.map((_unused, index) => new Set(lists.map(list => list[index] ? parameterBaseType(list[index]!) : '')).size > 1);
    const byPointer = lists.every(list => list.every((parameter, index) => !differing[index] || /\*/.test(parameter)));
    if (byPointer) for (const method of group) overloaded.add(method);
  }
  return overloaded;
}

function annotateMemberCallReferences(
  device: GeneratedDeviceDefinition,
  classes: Map<string, MameClass>,
  sourceMethods: readonly MameFunction[],
  hierarchy: readonly string[],
  /** Namespace aliases: ymfm's `opn_registers` is `opn_registers_base<false>`. */
  namespaceAliases: ReadonlyMap<string, string> = new Map(),
): void {
  // What a value of the type is an object of. An element of a container is
  // one too, which is how a range-for over `std::vector<std::unique_ptr<
  // discrete_base_node>>` reaches each node.
  const classOf = (valueType: string, element = false): string | undefined => {
    let held = valueType.replace(/\bconst\b/g, '').trim();
    for (let previous = ''; previous !== held;) {
      previous = held;
      held = held.replace(/^\s*std::(?:unique_ptr|shared_ptr|array)\s*<\s*([\s\S]+?)\s*(?:,\s*\d+\s*)?>\s*$/, '$1');
      if (element) held = held.replace(/^\s*std::vector\s*<\s*([\s\S]+?)\s*>\s*$/, '$1');
    }
    held = held.replace(/[*&]/g, '').trim();
    // Through a namespace alias: the OPN engine's `opn_registers m_regs`,
    // whose `write(..., uint32_t &channel, uint32_t &opmask)` writes back.
    if (!classes.has(held.replace(/\s*<[\s\S]*>$/, '')) && namespaceAliases.has(held)) held = namespaceAliases.get(held)!;
    held = held.replace(/\s*<[\s\S]*>$/, '');
    return classes.has(held) && !hierarchy.includes(held) ? held : undefined;
  };
  const cache = new Map<string, number[] | undefined>();
  const positions = (className: string, method: string, arity: number): number[] | undefined => {
    const key = `${className}::${method}/${arity}`;
    if (cache.has(key)) return cache.get(key);
    let found: number[] | undefined;
    for (const owner of [...classHierarchy(className, classes)].reverse()) {
      const candidates = [...sourceMethods.filter(candidate => candidate.className === owner), ...inlineMethods(classes.get(owner)!)]
        .filter(candidate => candidate.name === method);
      for (const candidate of candidates) {
        const parameters = splitMameArgs(candidate.parameters).map(parameter => parameter.trim()).filter(Boolean);
        if (arity > parameters.length || arity < parameters.filter(parameter => !parameter.includes('=')).length) continue;
        // Only a reference the callee assigns needs storage to write back to;
        // a struct it only writes fields of (`output_data &output`) is the
        // object itself, and boxing it cost a closure per call.
        const references = parameters.flatMap((parameter, index) => {
          if (!/&(?!&)/.test(parameter.replace(/=.*$/, '')) || /\bconst\b/.test(parameter)) return [];
          const name = parameterName(parameter);
          return new RegExp(`(?<![\\w.>])${name}\\s*(?:[-+*/%&|^]|<<|>>)?=(?!=)|(?<![\\w.>])${name}\\s*(?:\\+\\+|--)|(?:\\+\\+|--)\\s*${name}\\b`)
            .test(stripCppComments(candidate.body)) ? [index] : [];
        });
        found = references.length ? references : undefined;
        break;
      }
      if (candidates.length) break;
    }
    cache.set(key, found);
    return found;
  };
  const members = new Map(device.members.map(member => [member.name, member.valueType]));
  const returnTypes = new Map(sourceMethods
    .filter(method => method.returnType && hierarchy.includes(method.className))
    .map(method => [method.name, method.returnType!]));
  // The overload of `method` on `className` the arguments' declared types pick.
  const typedOverload = (className: string, method: string, argumentTypes: readonly (string | undefined)[]) => {
    for (const owner of [...classHierarchy(className, classes)].reverse()) {
      const candidates = [...sourceMethods.filter(candidate => candidate.className === owner), ...inlineMethods(classes.get(owner)!)]
        .filter(candidate => candidate.name === method);
      if (!candidates.length) continue;
      if (typedOverloads(candidates).size < 2) return undefined;
      return candidates.find(candidate => {
        const parameters = splitMameArgs(candidate.parameters).map(parameter => parameter.trim()).filter(Boolean);
        return parameters.length === argumentTypes.length &&
          parameters.every((parameter, index) => parameterBaseType(parameter) === argumentTypes[index]);
      });
    }
    return undefined;
  };
  // The instance of a function template a call's argument types deduce: ymfm
  // calls `m_adpcm_a.output(m_last_fm, 0x3f)` on `template<int NumOutputs>
  // void output(ymfm_output<NumOutputs> &output, ...)`, and its instances are
  // emitted as output_1 and output_2. Called by the template's own name, the
  // YM2610 never mixed in a single ADPCM-A or ADPCM-B sample.
  const deducedInstance = (className: string, method: string, argumentTypes: readonly (string | undefined)[]): string | undefined => {
    for (const owner of [...classHierarchy(className, classes)].reverse()) {
      const candidates = [...sourceMethods.filter(candidate => candidate.className === owner), ...inlineMethods(classes.get(owner)!)]
        .filter(candidate => candidate.name === method);
      if (!candidates.length) continue;
      for (const candidate of candidates) {
        const templateParameters = (candidate as { templateParameters?: readonly string[] }).templateParameters ?? [];
        if (!templateParameters.length) continue;
        const bound: Record<string, string> = {};
        splitMameArgs(candidate.parameters).map(parameter => parameter.trim()).filter(Boolean).forEach((parameter, index) => {
          const declared = /^([\w:]+)\s*<\s*(\w+)\s*>$/.exec(parameterBaseType(parameter));
          const argument = argumentTypes[index]?.replace(/\s+/g, '');
          if (!declared || !argument || !templateParameters.includes(declared[2]!)) return;
          const template = declared[1]!.split('::').at(-1)!;
          const value = new RegExp(`^(?:\\w+::)*${template}(?:__|<)(\\d+)>?$`).exec(argument)?.[1];
          if (value !== undefined) bound[declared[2]!] = value;
        });
        if (templateParameters.every(parameter => bound[parameter] !== undefined)) {
          return `${method}_${templateParameters.map(parameter => bound[parameter]).join('_')}`;
        }
      }
      return undefined;
    }
    return undefined;
  };
  for (const method of device.methods) {
    // What each name is declared as here: a member, shadowed by a parameter
    // or local (`discrete_base_node &node = *m_node_list.back();`).
    const types = new Map(members);
    for (const parameter of splitMameArgs(method.parameters)) {
      const name = /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.trim())?.[1];
      if (name && parameter.trim() !== 'void') types.set(name, parameter.replace(/=.*$/s, '').trim().slice(0, -name.length));
    }
    walkOperations(method.program.operations, operation => {
      if (operation.op !== 'declare') return;
      // A range-for's sequence is the member it was declared from, and an
      // `auto` local is what initialises it: `auto *node =
      // discrete_find_node(offset)` is the `discrete_base_node *` that
      // method is declared to return.
      const untyped = !operation.valueType || /^auto\b/.test(operation.valueType);
      const value = operation.value;
      const from = !untyped ? undefined
        : value?.kind === 'identifier' ? types.get(value.name)
        : value?.kind === 'call' && value.callee.kind === 'identifier'
          ? returnTypes.get(value.callee.name.split('::').at(-1)!)
          : undefined;
      if (from) types.set(operation.name, from);
      else if (operation.valueType) types.set(operation.name, operation.valueType);
    });
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'member') return;
      const indexed = expression.callee.object.kind === 'index';
      const receiver = indexed ? (expression.callee.object as { object: GeneratedExpression }).object : expression.callee.object;
      if (receiver.kind !== 'identifier') return;
      const valueType = types.get(receiver.name);
      const className = valueType ? classOf(valueType, indexed) : undefined;
      if (!className) return;
      const argumentTypes = expression.args.map(argument => argument.kind === 'identifier' && types.has(argument.name)
        ? parameterBaseType(`${types.get(argument.name)} ${argument.name}`) : undefined);
      const instance = deducedInstance(className, expression.callee.property, argumentTypes);
      if (instance) (expression.callee as { property: string }).property = instance;
      const chosen = instance ? undefined : typedOverload(className, expression.callee.property, argumentTypes);
      if (chosen) {
        const parameters = splitMameArgs(chosen.parameters).map(parameter => parameter.trim()).filter(Boolean);
        const references = parameters.flatMap((parameter, index) => /&(?!&)/.test(parameter.replace(/=.*$/, '')) && !/\bconst\b/.test(parameter) ? [index] : []);
        (expression.callee as { property: string }).property = typedOverloadName(chosen.name, chosen.parameters);
        if (references.length) (expression as { references?: number[] }).references = references;
        return;
      }
      const references = positions(className, expression.callee.property, expression.args.length);
      if (references) (expression as { references?: number[] }).references = references;
    });
  }
}

/**
 * C++ divides by the operands' declared types, and a member or parameter
 * declared `float`/`double` is floating wherever a method reads it -- as a
 * local already is (handler-ir's markFloatingLocals). The floppy drive's
 * `m_rev_time = attotime::from_double(60/m_rpm)` is 0.2 s; divided as two
 * integers it was 0, and the index pulse loop never left its first turn.
 */
function markFloatingNames(
  device: GeneratedDeviceDefinition,
  /** Methods declared to return float or double: own, and any other class's. */
  floatingMethods: { own: ReadonlySet<string>; other: ReadonlySet<string> } = { own: new Set(), other: new Set() },
): void {
  const floatingType = (valueType?: string) => /\b(?:float|double)\b/.test(valueType ?? '') && !/[*&[]/.test(valueType ?? '');
  const members = device.members.filter(member => floatingType(member.valueType)).map(member => member.name);
  // A struct field declared float or double, by a name no struct declares
  // otherwise: DISCRETE's one-shot divides `info->r3 / (info->r3 + info->r4)`,
  // two whole-ohm resistors, and as integers that ratio was 0.
  const fieldTypes = new Map<string, Set<boolean>>();
  for (const fields of Object.values(device.structs ?? {})) {
    for (const field of fields) {
      if (field.fields || field.length) continue;
      const kinds = fieldTypes.get(field.name) ?? new Set<boolean>();
      kinds.add(floatingType(field.valueType));
      fieldTypes.set(field.name, kinds);
    }
  }
  const floatingFields = new Set([...fieldTypes].filter(([, kinds]) => kinds.size === 1 && kinds.has(true)).map(([name]) => name));
  if (floatingFields.size) for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'member' && floatingFields.has(expression.property)) (expression as { floating?: boolean }).floating = true;
    });
  }
  // A call answers what its method is declared to: `input(n) / input(m)` in
  // a DISCRETE node divides doubles, whatever values the inputs hold.
  if (floatingMethods.own.size || floatingMethods.other.size) for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call') return;
      const floating = expression.callee.kind === 'identifier'
        ? floatingMethods.own.has(expression.callee.name)
        : expression.callee.kind === 'member' && floatingMethods.other.has(expression.callee.property);
      if (floating) (expression as { floating?: boolean }).floating = true;
    });
  }
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
    // A qualified base call is an overload set too (`base::set_prg()` and
    // `base::set_prg(int, int)`); a qualified constructor is not.
    if (classes.has(method.name.split('::').pop()!)) continue;
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

/** A C++ scalar, which a reference parameter's address must keep as a slot. */
const SCALAR_PARAMETER_TYPE = /^(?:(?:const|unsigned|signed|long|short)\s+)*(?:u?int\d+_t|[us]\d+|int|char|bool|float|double|long|short|unsigned|size_t|offs_t)$/;

/**
 * The address of a reference to an object is that object: samples_device finds
 * its channel with `&stream == m_channel[channel].stream`, and a pointer to the
 * parameter's slot compares equal to nothing.
 */
function lowerObjectReferenceAddresses(device: GeneratedDeviceDefinition): void {
  for (const method of device.methods) {
    const objects = new Set(splitMameArgs(method.parameters).flatMap(parameter => {
      const match = /^\s*(.+?)\s*&\s*(\w+)\s*$/.exec(parameter.replace(/=.*$/, ''));
      return match && !SCALAR_PARAMETER_TYPE.test(match[1]!) ? [match[2]!] : [];
    }));
    if (!objects.size) continue;
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'binary' || !['==', '!='].includes(expression.operator)) return;
      for (const side of ['left', 'right'] as const) {
        const operand = expression[side];
        if (operand.kind === 'unary' && operand.operator === '&' && operand.operand.kind === 'identifier' && objects.has(operand.operand.name)) {
          expression[side] = operand.operand;
          expression.identity = true;
        }
      }
    });
  }
}

/** bitmap_t's bits per pixel, by class (bitmap.h). */
const BITMAP_CLASS_BPP: Record<string, number> = {
  bitmap_ind8: 8, bitmap_ind16: 16, bitmap_ind32: 32, bitmap_rgb32: 32, bitmap_ind64: 64,
};

/**
 * Overloads of one name and arity told apart only by the bitmap class a
 * reference takes: `k053247_sprites_draw(bitmap_ind16 &, ...)` and its
 * `bitmap_rgb32 &` twin. C++ picks by the argument's static type, which the
 * untyped IR does not carry -- and a template hands its deduced bitmap on as
 * `auto` -- so each overload gets its typed name and the plain name picks one
 * by the bitmap's own `bpp()`, the one fact of its class it keeps at run time.
 */
function dispatchBitmapOverloads(device: GeneratedDeviceDefinition): void {
  const declared = (parameters: string) => splitMameArgs(parameters)
    .map(parameter => parameter.trim())
    .filter(parameter => parameter && parameter !== 'void');
  const groups = new Map<string, GeneratedDeviceMethod[]>();
  for (const method of device.methods) {
    const key = `${method.name}/${declared(method.parameters).length}`;
    groups.set(key, [...groups.get(key) ?? [], method]);
  }
  for (const group of groups.values()) {
    if (group.length < 2) continue;
    const lists = group.map(method => declared(method.parameters));
    const differing = lists[0]!.map((_unused, index) =>
      new Set(lists.map(list => parameterBaseType(list[index] ?? ''))).size > 1);
    // The bitmap decides; any other difference is a scalar C++ converts
    // either way (`bool flipx` against `int flipx`).
    const isBitmap = (index: number) => lists.every(list =>
      /&/.test(list[index]!) && BITMAP_CLASS_BPP[parameterBaseType(list[index]!)] !== undefined);
    const positions = differing.flatMap((differs, index) => differs ? [index] : []);
    const bitmaps = positions.filter(isBitmap);
    if (bitmaps.length !== 1) continue;
    const position = bitmaps[0]!;
    if (positions.some(index => index !== position && lists.some(list => /[&*]/.test(list[index]!)))) continue;
    const bpps = lists.map(list => BITMAP_CLASS_BPP[parameterBaseType(list[position]!)]!);
    if (new Set(bpps).size !== bpps.length) continue;
    const name = group[0]!.name;
    const argumentNames = lists[0]!.map(parameterName);
    for (const method of group) method.name = typedOverloadName(name, method.parameters);
    const forward = (method: GeneratedDeviceMethod): GeneratedExpression => ({
      kind: 'call',
      callee: { kind: 'identifier', name: method.name },
      args: argumentNames.map(argument => ({ kind: 'identifier', name: argument })),
    });
    let operations: GeneratedHandlerOperation[] = [{ op: 'return', value: forward(group.at(-1)!) }];
    for (let index = group.length - 2; index >= 0; index--) {
      operations = [{
        op: 'if',
        condition: {
          kind: 'binary',
          operator: '==',
          left: {
            kind: 'call',
            callee: { kind: 'member', object: { kind: 'identifier', name: argumentNames[position]! }, property: 'bpp' },
            args: [],
          },
          right: { kind: 'number', value: bpps[index]! },
        },
        then: [{ op: 'return', value: forward(group[index]!) }],
        else: operations,
      }];
    }
    device.methods.push({
      name,
      parameters: group[0]!.parameters,
      source: group[0]!.source,
      program: { ...group[0]!.program, operations, diagnostics: [] },
    });
  }
}

export function lowerStructLocals(
  device: GeneratedDeviceDefinition,
  sources: readonly { source: string }[] = [],
  /** The MAME tree, for the core classes a braced temporary constructs. */
  mameSrc?: string,
): void {
  dispatchBitmapOverloads(device);
  // Overloads told apart by type, each under its own name (typedOverloadName);
  // a qualified alias (`discrete_base_node::interface`) is renamed with them.
  const leafOverloads = typedOverloads(device.methods.map(method => ({ ...method, name: method.name.split('::').at(-1)! })));
  const renamed = new Set([...leafOverloads].map(method => `${method.name}/${method.parameters}`));
  for (const method of device.methods) {
    const leaf = method.name.split('::').at(-1)!;
    if (!renamed.has(`${leaf}/${method.parameters}`)) continue;
    method.name = `${method.name.slice(0, method.name.length - leaf.length)}${typedOverloadName(leaf, method.parameters)}`;
  }
  resolveArityOverloads(device);
  lowerObjectReferenceAddresses(device);
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
  // A braced value for an array field is that array's elements, and one for
  // a struct field is that struct's.
  const structValue = (fields: GeneratedStructField[], values: GeneratedExpression[]): GeneratedExpression => ({
    kind: 'call',
    callee: { kind: 'identifier', name: 'STRUCT' },
    args: fields.flatMap((field, index) => {
      const value = values[index];
      const braced = value?.kind === 'call' && value.callee.kind === 'identifier' && value.callee.name === 'AGGREGATE';
      return [string(field.name), !braced ? value ?? { kind: 'number', value: 0 }
        : field.fields && !field.length ? structValue(field.fields, value.args)
        : { ...value, callee: { kind: 'identifier', name: 'ARRAY' } }];
    }),
  });
  // `std::atomic<T>` is a T on one thread: discrete_task locks itself with
  // `m_threadid.compare_exchange_strong(expected, threadid)` and steps its
  // buffers through `ptr.load()`/`ptr.store(v)`. Each becomes what it does
  // to the value, the exchange writing `expected` back when it fails.
  const atomics = new Set([
    ...device.members.filter(member => /^std::atomic\s*</.test(member.valueType)).map(member => member.name),
    ...Object.values(structs).flatMap(fields => fields.filter(field => /^std::atomic\s*</.test(field.valueType ?? '')).map(field => field.name)),
  ]);
  const atomicReceiver = (expression: GeneratedExpression) =>
    (expression.kind === 'identifier' && atomics.has(expression.name)) ||
    (expression.kind === 'member' && atomics.has(expression.property));
  if (atomics.size) for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'member' || !atomicReceiver(expression.callee.object)) return;
      const value = expression.callee.object;
      const [first, second] = expression.args;
      const property = expression.callee.property;
      if (property === 'load') {
        for (const key of ['callee', 'args']) delete (expression as Record<string, unknown>)[key];
        Object.assign(expression, structuredClone(value));
        return;
      } else if (property === 'store' && first) Object.assign(expression, { kind: 'assignment', target: value, operator: '=', value: first });
      else if (/^compare_exchange_(?:strong|weak)$/.test(property) && first && second) Object.assign(expression, {
        kind: 'conditional',
        condition: { kind: 'binary', operator: '==', left: value, right: first },
        whenTrue: { kind: 'binary', operator: '||', left: { kind: 'assignment', target: value, operator: '=', value: second }, right: { kind: 'number', value: 1 } },
        whenFalse: { kind: 'binary', operator: '&&', left: { kind: 'assignment', target: first, operator: '=', value }, right: { kind: 'number', value: 0 } },
      });
      else return;
      for (const key of ['callee', 'args']) delete (expression as Record<string, unknown>)[key];
    });
  }
  // The address of a reference to a class object is that object, which is
  // all a pointer to one is here: init_nodes indexes each node it builds with
  // `discrete_base_node &node = *m_node_list.back(); ... = &node;`.
  const builtin = /^(?:(?:unsigned|signed|long|short)\s*)*(?:u?int(?:8|16|32|64)?(?:_t)?|[us](?:8|16|32|64)|bool|char|short|long|unsigned|signed|float|double|offs_t|pen_t|auto|attotime)$/;
  for (const method of device.methods) {
    const objectReferences = new Set<string>();
    walkOperations(method.program.operations, operation => {
      if (operation.op !== 'declare' || !operation.valueType || !/&\s*$/.test(operation.valueType)) return;
      const base = operation.valueType.replace(/\bconst\b/g, '').replace(/&\s*$/, '').trim();
      if (!/[*&]/.test(base) && !builtin.test(base) && !structs[base]) objectReferences.add(operation.name);
    });
    if (!objectReferences.size) continue;
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'unary' || expression.operator !== '&' || expression.operand.kind !== 'identifier' ||
          !objectReferences.has(expression.operand.name)) return;
      const operand = expression.operand;
      for (const key of ['operator', 'operand']) delete (expression as Record<string, unknown>)[key];
      Object.assign(expression, operand);
    });
  }
  // A call through a struct's function-pointer field (`block.factory(*this,
  // block)`) calls the function the field names: the IR has no function
  // values, so a pointer is its name, and CALL_METHOD dispatches by it.
  const functionFields = new Set(Object.values(structs).flatMap(fields =>
    fields.filter(field => field.valueType === 'function*').map(field => field.name)));
  // And through a member whose type is a function-pointer alias:
  // `using dac_mapper_callback = sample_t (*)(u32 input, u8 bits);`.
  const functionTypes = new Set(sources.flatMap(({ source }) => [
    ...[...source.matchAll(/\busing\s+(\w+)\s*=\s*[^;=]*\(\s*\*\s*\)\s*\(/g)].map(match => match[1]!),
    ...[...source.matchAll(/\btypedef\s+[^;]*\(\s*\*\s*(\w+)\s*\)\s*\(/g)].map(match => match[1]!),
  ]));
  const functionMembers = new Set(device.members.filter(member =>
    functionTypes.has(member.valueType.replace(/\bconst\b/g, '').trim())).map(member => member.name));
  // A braced temporary (`input_buffer{ nullptr, pbuf, 0.0 }`) is that struct,
  // field by field. A type with no known shape is a gap, not a zero.
  for (const method of device.methods) {
    walkExpressions(method.program.operations, expression => {
      const throughMember = expression.kind === 'call' && expression.callee.kind === 'identifier' && functionMembers.has(expression.callee.name);
      if (expression.kind !== 'call' || (!throughMember && (expression.callee.kind !== 'member' || !functionFields.has(expression.callee.property)))) return;
      Object.assign(expression, {
        callee: { kind: 'identifier', name: 'CALL_METHOD' },
        args: [expression.callee, ...expression.args],
      });
    });
    // A delegate bound to one of the device's own methods and held in a
    // variable is that method, by name: segaic16's tilemap_init sets
    // `get_text_info = tilemap_get_info_delegate(*this, FUNC(...))` and hands
    // it to machine().tilemap().create. One passed straight to an install_*
    // call keeps the form that call already resolves (a Game Boy MBC's
    // `install_write_handler(..., emu::rw_delegate(*this, FUNC(...)))`).
    walkOperations(method.program.operations, operation => {
      const expression = operation.op === 'assign' || operation.op === 'declare' ? operation.value : undefined;
      if (expression?.kind !== 'call' || expression.callee.kind !== 'identifier' || !/_delegate$/.test(expression.callee.name)) return;
      const [owner, bound] = expression.args;
      const self = owner?.kind === 'identifier' ? owner.name === 'this'
        : owner?.kind === 'unary' && owner.operator === '*' && owner.operand.kind === 'identifier' && owner.operand.name === 'this';
      if (!self || bound?.kind !== 'call' || bound.callee.kind !== 'identifier' || bound.callee.name !== 'FUNC') return;
      const target = bound.args[0];
      const name = target?.kind === 'identifier' ? target.name.split('::').at(-1)! : '';
      if (!device.methods.some(candidate => candidate.name === name)) return;
      for (const key of Object.keys(expression)) delete (expression as Record<string, unknown>)[key];
      Object.assign(expression, string(name));
    });
    // Declared unbound (`tilemap_get_info_delegate get_text_info(*this);`), it
    // holds no method until one is assigned: a name, not a number.
    walkOperations(method.program.operations, operation => {
      if (operation.op !== 'declare' || !/_delegate$/.test(operation.valueType ?? '')) return;
      operation.valueType = 'auto';
      operation.value = string('');
    });
    // `T()` of a struct is that struct value-initialised, built from its
    // declaration as a struct local is (STRUCT_OF): Phoenix resets its
    // capacitors with `m_c24_state = c_state();`, and segaic16's
    // `*info = tilemap_info();` holds struct and array fields that a literal
    // of zeros left as numbers.
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier' || expression.args.length) return;
      const type = expression.callee.name;
      if (structs[type]) Object.assign(expression, { callee: { kind: 'identifier', name: 'STRUCT_OF' }, args: [string(type)] });
    });
    // With arguments it is built through the constructor of that arity
    // (structMethodsOf's `__construct_<arity>`): the slapstic's checker
    // answers each predicate as `return test(mask, value);`.
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier' || !expression.args.length) return;
      const type = expression.callee.name;
      if (!structs[type] || !device.structMethods?.[type]?.some(candidate => candidate.name === `__construct_${expression.args.length}`)) return;
      Object.assign(expression, { callee: { kind: 'identifier', name: 'STRUCT_OF' }, args: [string(type), ...expression.args] });
    });
    // A call on a struct value is its call operator (`__call`): each slapstic
    // state tests an address as `m_reset(addr)`, `m_bank[i](addr)`.
    const callable = new Set(Object.entries(device.structMethods ?? {})
      .filter(([, methods]) => methods.some(candidate => candidate.name === '__call')).map(([type]) => type));
    if (callable.size) {
      const typed = new Map<string, string>(device.members.map(member => [member.name, member.valueType]));
      for (const parameter of splitMameArgs(method.parameters)) {
        const name = parameterName(parameter);
        if (name) typed.set(name, parameterBaseType(parameter));
      }
      walkOperations(method.program.operations, operation => {
        if (operation.op === 'declare' && operation.valueType) typed.set(operation.name, operation.valueType);
      });
      const callableType = (expression: GeneratedExpression): boolean => {
        const root = expression.kind === 'index' ? expression.object : expression;
        if (root.kind !== 'identifier') return false;
        const leaf = typed.get(root.name)?.replace(/\bconst\b/g, '').replace(/[*&]/g, '').trim().split('::').at(-1);
        return leaf !== undefined && callable.has(leaf);
      };
      walkExpressions(method.program.operations, expression => {
        if (expression.kind !== 'call' || !callableType(expression.callee)) return;
        (expression as { callee: GeneratedExpression }).callee = { kind: 'member', object: expression.callee, property: '__call' };
      });
    }
    walkExpressions(method.program.operations, expression => {
      if (expression.kind !== 'call' || expression.callee.kind !== 'identifier' || expression.callee.name !== 'AGGREGATE_OF') return;
      const type = expression.args[0]?.kind === 'string' ? expression.args[0].value : '';
      const fields = fieldsOf(type);
      // A class with a constructor is list-initialised through it:
      // `rectangle {sx, 0, sy, 0}` is bitmap.h's rectangle(minx, maxx, miny, maxy).
      if (!fields && mameSrc && coreConstructorArities(mameSrc).get(type)?.has(expression.args.length - 1)) {
        Object.assign(expression, { callee: { kind: 'identifier', name: type }, args: expression.args.slice(1) });
        return;
      }
      if (!fields) {
        method.program.diagnostics.push(`braced temporary of unknown struct ${type}`);
        return;
      }
      Object.assign(expression, structValue(fields, expression.args.slice(1)));
    });
  }
  for (const method of device.methods) {
    // A scalar static is one storage for every call, so its uses name the
    // member itself; a local copy would take `counter++` and lose it.
    const scalarStatics = new Map<string, string>();
    // Locals that only ever hold the literal they are declared with, as a
    // `constexpr int MAX_SAMPLES = 256;` does: an array's length may be one.
    const assigned = new Set<string>();
    walkExpressions(method.program.operations, expression => {
      if (expression.kind === 'assignment' && expression.target.kind === 'identifier') assigned.add(expression.target.name);
    });
    walkOperations(method.program.operations, operation => {
      if (operation.op === 'assign' && operation.target.kind === 'identifier') assigned.add(operation.target.name);
    });
    const literals = new Map<string, number>();
    walkOperations(method.program.operations, operation => {
      if (operation.op === 'declare' && operation.value?.kind === 'number' && !assigned.has(operation.name)) {
        literals.set(operation.name, operation.value.value);
      }
    });
    const constantLength = (length: GeneratedExpression | undefined): number | undefined =>
      length?.kind === 'number' ? length.value
        : length?.kind === 'identifier' ? literals.get(length.name) : undefined;
    const rewrite = (operations: GeneratedHandlerOperation[]): GeneratedHandlerOperation[] => operations.flatMap((operation): GeneratedHandlerOperation[] => {
      for (const key of ['then', 'else', 'body'] as const) {
        const nested = (operation as Record<string, unknown>)[key];
        if (Array.isArray(nested)) (operation as Record<string, unknown>)[key] = rewrite(nested as GeneratedHandlerOperation[]);
      }
      if (operation.op === 'switch') {
        for (const entry of operation.cases) entry.body = rewrite(entry.body);
      }
      if (operation.op === 'try') {
        for (const entry of operation.catches) entry.body = rewrite(entry.body);
        if (operation.finally) operation.finally = rewrite(operation.finally);
      }
      if (operation.op !== 'declare') return [operation];
      const fields = fieldsOf(operation.valueType);
      let value = operation.value;
      if (fields && value?.kind === 'call' && value.callee.kind === 'identifier') {
        if (value.callee.name === 'ARRAY') {
          value = { ...value, args: value.args.map(element =>
            element.kind === 'call' && element.callee.kind === 'identifier' && element.callee.name === 'AGGREGATE'
              ? structValue(fields, element.args) : element) };
        } else if (value.callee.name === 'AGGREGATE' && !operation.valueType?.includes('[')) {
          value = structValue(fields, value.args);
        } else if (value.callee.name === 'ALLOC') {
          // Each element built from the declaration (STRUCT_ARRAY_OF), so an
          // array field is an array and the struct's methods come with it.
          const leaf = operation.valueType!.replace(/\bconst\b/g, '').replace(/[*&]/g, '').trim().split('::').at(-1)!;
          value = {
            kind: 'call',
            callee: { kind: 'identifier', name: 'STRUCT_ARRAY_OF' },
            args: [value.args[0] ?? { kind: 'number', value: 0 }, string(leaf)],
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
        // One whose type has a constructor sets itself up there, and every
        // other field is indeterminate in C++: one storage kept from call to
        // call, constructed again on each, is the same value without a new
        // struct every time (discrete's `double_stack stack;`, every sample).
        // Only one that never leaves the call: every use reads a field or
        // calls a method on it. One handed on (`emplace_back(std::move(buf))`)
        // must be a struct of its own each time.
        const escapes = (() => {
          let all = 0;
          let received = 0;
          walkExpressions(method.program.operations, expression => {
            if (expression.kind === 'identifier' && expression.name === operation.name) all++;
            if (expression.kind === 'member' && expression.object.kind === 'identifier' && expression.object.name === operation.name) received++;
          });
          return all !== received;
        })();
        if (!/[*&]/.test(operation.valueType!) && !escapes && device.structMethods?.[leaf]?.some(method => method.name === '__construct')) {
          const member = `__local_${method.name.replace(/\W+/g, '_')}_${operation.name}`;
          if (!device.members.some(candidate => candidate.name === member)) {
            device.members.push({ name: member, valueType: leaf, fields, scratch: true });
          }
          return [
            { op: 'declare', name: operation.name, ...(operation.valueType ? { valueType: operation.valueType } : {}), value: { kind: 'identifier', name: member } },
            { op: 'call', expression: { kind: 'call', callee: { kind: 'member', object: { kind: 'identifier', name: operation.name }, property: '__construct' }, args: [] } },
          ];
        }
        if (!/[*&]/.test(operation.valueType!)) {
          value = { kind: 'call', callee: { kind: 'identifier', name: 'STRUCT_OF' }, args: [string(leaf)] };
        }
      }
      const declared: GeneratedHandlerOperation = { ...operation, ...(value ? { value } : {}) };
      // An array of structs declared with no initializer holds indeterminate
      // values in C++ until written, so one storage kept from call to call is
      // a faithful one: ymfm renders into a local `output_data output[256]`
      // on every stream update, and building 256 structs each time was half
      // of an NES frame with a VRC7 in the slot. The storage is a member
      // built with the device, from the struct's own declaration (so it
      // carries its marker and methods from the start), and kept out of save
      // states: it holds nothing from one call to the next. Only a constant
      // length qualifies; any other array is built per call.
      const scratchLength = !operation.static && fields && value?.kind === 'call' && value.callee.kind === 'identifier' &&
        value.callee.name === 'STRUCT_ARRAY_OF' ? constantLength(value.args[0]) : undefined;
      if (scratchLength !== undefined) {
        const member = `__local_${method.name.replace(/\W+/g, '_')}_${operation.name}`;
        const leaf = operation.valueType!.replace(/\bconst\b/g, '').replace(/[*&]/g, '').trim().split('::').at(-1)!;
        if (!device.members.some(candidate => candidate.name === member)) {
          device.members.push({ name: member, valueType: leaf, fields, arrayLength: scratchLength, scratch: true });
        }
        return [{ op: 'declare', name: operation.name, value: { kind: 'identifier', name: member } }];
      }
      if (!operation.static || !value) {
        delete (declared as { static?: true }).static;
        return [declared];
      }
      const member = `__static_${method.name.replace(/\W+/g, '_')}_${operation.name}`;
      const storage: GeneratedExpression = { kind: 'identifier', name: member };
      // A static table (`static const u8 dummy_table[] = {...}`) declares its
      // element type; the member holding it must not be narrowed to that, or
      // the Williams blitter's remap table became one byte.
      const aggregate = value.kind === 'call' && value.callee.kind === 'identifier' &&
        ['ARRAY', 'AGGREGATE', 'STRUCT', 'STRUCT_ARRAY', 'STRUCT_ARRAY_OF', 'ALLOC'].includes(value.callee.name);
      if (!device.members.some(candidate => candidate.name === member)) {
        const structStatic = fields && value.kind === 'call' && value.callee.kind === 'identifier' && value.callee.name === 'STRUCT';
        const leaf = operation.valueType?.replace(/\bconst\b/g, '').replace(/[*&]/g, '').trim().split('::').at(-1);
        device.members.push(structStatic && leaf
          ? { name: member, valueType: leaf, fields }
          : { name: member, valueType: aggregate ? 'auto' : operation.valueType ?? 'auto' });
        device.members.push({ name: `${member}__initialised`, valueType: 'bool' });
      }
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

/**
 * What the constructors' bodies leave in the members, as their initial values.
 *
 * A device's constructor is not run on the board; its initializer list is read
 * as constants. The body is code, though: the AY-3-8910 sets its three
 * resistor loads with `m_res_load[0] = m_res_load[1] = m_res_load[2] = 1000;`
 * and calls `set_type(...)` for its envelope step and mask, and without them
 * every level it built was zero. Each body is interpreted here, base first,
 * against the members as the initializers left them and with the device's
 * own methods callable, and a scalar or array it changed keeps its new value.
 * A body that does not lower, or fails, changes nothing.
 */
function runConstructorBodies(
  bodies: readonly { body: string; env: Record<string, number> }[],
  members: GeneratedDeviceMember[],
  methods: readonly GeneratedDeviceMethod[],
  constants: Record<string, number>,
): void {
  const state: Record<string, unknown> = {};
  // A struct member is its fields' shape, arrays as arrays: the 8086's
  // constructor fills `m_Mod_RM.reg.w[i]`, its ModRM decode table.
  const shape = (fields: readonly GeneratedStructField[], seed: Record<string, unknown> = {}): Record<string, unknown> | undefined => {
    const value: Record<string, unknown> = {};
    for (const field of fields) {
      if (field.union || /^std::/.test(field.valueType ?? '')) return undefined;
      const seeded = seed[field.name];
      if (field.fields) {
        const one = (index?: number) => shape(field.fields!, ((index === undefined ? seeded : (seeded as unknown[] | undefined)?.[index]) ?? {}) as Record<string, unknown>);
        const built = field.length ? Array.from({ length: field.length }, (_, index) => one(index)) : one();
        if (Array.isArray(built) ? built.some(item => !item) : !built) return undefined;
        value[field.name] = built;
      } else if (field.length) {
        value[field.name] = Array.isArray(seeded) ? [...seeded] : new Array(field.length).fill(field.initial ?? 0);
      } else {
        value[field.name] = typeof seeded === 'number' ? seeded : field.initial ?? 0;
      }
    }
    return value;
  };
  const finiteLeaves = (value: unknown): boolean => typeof value === 'number' ? Number.isFinite(value)
    : Array.isArray(value) ? value.every(finiteLeaves)
    : typeof value === 'object' && value !== null && Object.values(value).every(finiteLeaves);
  for (const member of members) {
    if (member.fields) {
      if (member.arrayLength || member.memory || member.finder) continue;
      const value = shape(member.fields, member.initialValue);
      if (value) state[member.name] = value;
      continue;
    }
    if (member.memory || member.finder || member.valueType.startsWith('devcb_')) continue;
    if (member.values) state[member.name] = [...member.values];
    else if (member.arrayLength) state[member.name] = new Array(member.arrayLength).fill(0);
    else if (typeof member.initial === 'number' || member.initial === undefined) state[member.name] = member.initial ?? 0;
  }
  const before = new Map(Object.entries(state).map(([name, value]) => [name, JSON.stringify(value)]));
  const calls: Record<string, (...args: unknown[]) => unknown> = {};
  const bindings = { members: state, constants, calls } as never;
  for (const method of methods) {
    if (method.program.diagnostics.length) continue;
    const parameters = splitMameArgs(method.parameters).map(parameterName).filter(Boolean);
    calls[method.name] ??= (...args: unknown[]) => executeGeneratedProgram(method.program, bindings,
      Object.fromEntries(parameters.map((name, index) => [name, args[index] ?? 0]))).value;
  }
  for (const { body, env } of bodies) {
    if (!/\S/.test(body)) continue;
    const program = compileMameHandler(normalizeMameExecutionSource(body));
    if (program.diagnostics.length) continue;
    try {
      executeGeneratedProgram(program, bindings, { ...env });
    } catch {
      continue;
    }
  }
  for (const member of members) {
    if (!(member.name in state) || before.get(member.name) === JSON.stringify(state[member.name])) continue;
    const value = state[member.name];
    if (member.fields) {
      if (finiteLeaves(value)) member.initialValue = value as Record<string, unknown>;
    } else if (typeof value === 'number' && Number.isFinite(value)) member.initial = value;
    else if (Array.isArray(value) && value.every(item => typeof item === 'number' && Number.isFinite(item))) {
      member.values = value as number[];
    }
  }
}

/** The scope fileScopeStatics' declarations are read as members of. */
const FILE_STATICS = '__file_statics';

/**
 * Each uninitialised mutable `static` a source declares at file scope, as a
 * member declaration without the `static`. One that is initialised is a
 * table (sourceTables reads those), and a function is not state.
 */
function fileScopeStatics(sources: readonly string[]): string {
  const declarations: string[] = [];
  for (const raw of sources) {
    const text = stripCppComments(raw).replace(/^[ \t]*#.*$/gm, '');
    let depth = 0;
    let start = 0;
    // A braced struct is part of its declaration; any other block ends one.
    let braced = false;
    for (let index = 0; index < text.length; index++) {
      const character = text[index];
      if (character === '{') {
        if (depth === 0) braced = /^\s*static\s+(?:struct|union)\s*\w*\s*$/.test(text.slice(start, index));
        depth++;
      } else if (character === '}') {
        depth--;
        if (depth === 0 && !braced) start = index + 1;
      } else if (character === ';' && depth === 0) {
        const statement = text.slice(start, index + 1).trim();
        start = index + 1;
        const declared = /^static\s+(?!(?:const|constexpr|inline)\b)([\s\S]*;)$/.exec(statement);
        if (!declared) continue;
        // Parentheses or an initializer outside the struct's own braces.
        const outside = declared[1]!.replace(/\{[\s\S]*\}/, '{}');
        if (/[(=]/.test(outside)) continue;
        declarations.push(declared[1]!);
      }
    }
  }
  return declarations.join('\n');
}

/**
 * The mutable globals a third-party library the sources include declares
 * `extern`, as member declarations: Musashi's execute_run saves and restores
 * softfloat's `softfloat_roundingMode` around every run (an RAII
 * fpu_rounding_saver), and an unknown name kept the whole loop interpreted.
 * MAME shares them process-wide; every user saves and restores them around
 * its own work, so a copy per device holds the same values at every use.
 */
function libraryExterns(mameSrc: string, sources: readonly string[]): string {
  const declarations = new Set<string>();
  for (const source of sources) {
    for (const include of source.matchAll(/^[ \t]*#\s*include\s+"([^"]+)"/gm)) {
      const header = join(mameSrc, '3rdparty', include[1]!);
      if (!existsSync(header)) continue;
      for (const declared of stripCppComments(readFileSync(header, 'utf8')).matchAll(
        /^[ \t]*extern\s+(?:THREAD_LOCAL\s+)?((?:\w+\s+)*?\w+)\s+(\w+)\s*;/gm,
      )) declarations.add(`${declared[1]} ${declared[2]};`);
    }
  }
  return [...declarations].join('\n');
}

/** Lower a selected C++ constructor, including field initializers, to ordinary method IR. */
export function addSourceConstructor(
  device: GeneratedDeviceDefinition,
  constructor: ReturnType<typeof parseMameConstructors>[number],
  includeInitializers = false,
  /**
   * A base class's own constructor, so a derived initializer list can chain
   * to it: ymfm's `ds1001(intf, data) : opll_base(intf, data ?: defaults)`
   * builds the engine in `opll_base`'s.
   */
  baseConstructor: (className: string) => ReturnType<typeof parseMameConstructors>[number] | undefined = () => undefined,
  specialize: (text: string) => string = text => text,
): void {
  const lower = (source: ReturnType<typeof parseMameConstructors>[number], name: string): void => {
    let body = specialize(source.body);
    // device_t::interface(T *&) is an RTTI lookup with an output reference.
    // The host proxy exposes the same lookup by the source-declared type name.
    body = body.replace(/\b(\w+)->interface\s*\(\s*(m_\w+)\s*\)/g, (call, receiver: string, field: string) => {
      const type = device.members.find(member => member.name === field)?.valueType.replace(/\*$/, '').trim();
      return type ? `${field} = ${receiver}->interface("${type}")` : call;
    });
    if (includeInitializers) {
      // C++ builds the bases first, then the members, then runs the body.
      const bases: string[] = [];
      const fields: string[] = [];
      for (const initializer of source.initializers) {
        const args = initializer.args.map(argument => specialize(argument.trim()));
        const member = device.members.find(candidate => candidate.name === initializer.name);
        if (!member) {
          // A base is named as the derived class's scope sees it: a slapstic
          // state's `: state(sl)` is `atari_slapstic_device::state`.
          const named = initializer.name.replace(/\s*<[\s\S]*>$/, '');
          const base = device.hierarchy?.find(className => className === named || className.endsWith(`::${named}`)) ?? named;
          const chained = device.hierarchy?.includes(base) ? baseConstructor(base) : undefined;
          if (!chained) continue;
          lower(chained, `${base}::__construct`);
          bases.push(`${base}::__construct(${args.join(', ')});`);
        } else if (member.object && args.length) {
          // A held object built from the constructor's own arguments:
          // `m_fm(intf)`. It is built here, not before the owner exists.
          member.objectConstructed = true;
          fields.push(`${member.name} = new ${member.object}(${args.join(', ')});`);
        } else if (args.length === 1) {
          fields.push(`${member.name} = ${args[0]};`);
        } else if (args.length > 1 && (member.arrayLength || /^std::array\s*</.test(member.valueType))) {
          // A braced array initializer: `m_timer_running{0,0}`.
          fields.push(...args.map((argument, index) => `${member.name}[${index}] = ${argument};`));
        } else if (args.length && /^[A-Za-z_][\w:]*$/.test(member.valueType.trim())) {
          // A value of a class built from its constructor's arguments:
          // sprite.cpp's `m_rect_list_bounds(0, -1, 0, -1)`, a rectangle.
          fields.push(`${member.name} = ${member.valueType.trim()}(${args.join(', ')});`);
        } else if (args.length) {
          throw new Error(`unsupported constructor initializer ${initializer.name}`);
        }
      }
      body = [...bases, ...fields].join('\n') + '\n' + body;
    }
    const method = compileMethod({ ...source, name, body });
    device.methods = [...device.methods.filter(candidate => candidate.name !== name), method];
  };
  lower(constructor, '__construct');
  device.construct = '__construct';
  device.summary = { methods: device.methods.length,
    compiledMethods: device.methods.filter(method => !method.program.diagnostics.length).length,
    diagnostics: device.methods.reduce((sum, method) => sum + method.program.diagnostics.length, 0)
      + Object.values(device.allocations ?? {}).reduce((sum, child) => sum + child.summary.diagnostics, 0) };
}

/** An allocation's name for a class-template instance: `fm_channel<opll_registers>` is `fm_channel__opll_registers`. */
function templateInstanceName(type: string): string {
  return type.includes('<') ? type.replace(/\s+/g, '').replace(/</g, '__').replace(/>/g, '').replace(/\W/g, '_') : type;
}

function methodSignature(name: string, parameters: string): string {
  // `reset(void)` overrides `reset()`: every DISCRETE node defines its methods
  // through DISCRETE_RESET, which spells the empty list as `(void)`.
  const list = parameters.replace(/\s+/g, ' ').trim();
  if (list === 'void' || list === '') return `${name}()`;
  // Types only: an override may name its parameters differently, and is
  // still the override. ym2610_device_base's `ymfm_external_read(access_class
  // type, uint32_t offset)` replaces ym_generic_device's `(..., uint32_t
  // address)`; kept as an overload, the base answered first and every ADPCM
  // fetch read 0 -- Metal Slug's ADPCM was silent.
  const types = splitMameArgs(list).map(parameter => {
    const plain = parameter.replace(/=[\s\S]*$/, '').trim().replace(/\b\w+::/g, '');
    const named = /^(.*?[\w>*&\]])\s*\b([A-Za-z_]\w*)\s*((?:\[[^\]]*\])*)$/.exec(plain);
    return (named && !/^(?:const|unsigned|signed|long|short|int|char|bool|float|double|void|struct)$/.test(named[2]!) && named[1]!.trim()
      ? `${named[1]!.trim()}${named[3] ?? ''}`
      : plain).replace(/\s+/g, ' ');
  });
  return `${name}(${types.join(',')})`;
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

/**
 * What a device's own source says about it as a scheduler participant:
 * whether it has a device_execute_interface, and its execute_min_cycles(),
 * the instruction length MAME's scheduler measures its perfect interleave in
 * (diexec.cpp minimum_quantum). A class that does not override it has
 * diexec.cpp's. `minCycles` is absent when the override returns anything but
 * a number: the 6805's returns a member its variants set.
 */
export function mameExecuteFacts(
  mameSrc: string,
  type: string,
): { executes: boolean; minCycles?: number; clocksToCycles?: (clocks: number) => number } | undefined {
  const definition = indexMameHardware(mameSrc).get(type);
  if (!definition) return undefined;
  const className = /^([\w:]+)\s*</.exec(definition.className)?.[1] ?? definition.className;
  const files = [...localSourceFiles(mameSrc, definition.sourceFile), 'src/emu/diexec.cpp']
    .filter(file => existsSync(join(mameSrc, file)));
  const ast = parseMameAst(files.map(file => ({ file, source: readFileSync(join(mameSrc, file), 'utf8') })));
  const classes = new Map(ast.units.flatMap(unit => unit.classes).map(declaration => [declaration.name, declaration]));
  const hierarchy = classHierarchy(className, classes);
  const executes = hierarchy.some(name => (classes.get(name)?.bases ?? []).some(base =>
    ['device_execute_interface', 'cpu_device'].includes(base.split('::').at(-1)!.replace(/<.*$/, ''))));
  if (!executes) return { executes };
  const outOfLine = ast.units.flatMap(unit => unit.functions);
  const body = [...hierarchy].reverse().concat('device_execute_interface').map(name => {
    const declaration = classes.get(name);
    return (declaration ? inlineMethods(declaration) : []).concat(outOfLine.filter(fn => fn.className === name))
      .find(fn => fn.name === 'execute_min_cycles')?.body;
  }).find(found => found !== undefined);
  const minCycles = Number(/^\s*return\s+(\d+)\s*;\s*$/.exec(stripCppComments(body ?? ''))?.[1]);
  // device_execute_interface::clocks_to_cycles: the core's own
  // execute_clocks_to_cycles, run on the clock it is given -- the 6800
  // family's `(clocks + 4 - 1) / 4`, an MCS-48's `/ 15`. The most derived
  // definition wins (an i8080 answers `clocks` over the i8085's `/ 2`), and a
  // core that defines none counts its input clock (diexec.cpp).
  const clockMethod = [...hierarchy].reverse().concat('device_execute_interface').map(name => {
    const declaration = classes.get(name);
    return (declaration ? inlineMethods(declaration) : []).concat(outOfLine.filter(fn => fn.className === name))
      .find(fn => fn.name === 'execute_clocks_to_cycles');
  }).find(found => found !== undefined);
  let clocksToCycles: ((clocks: number) => number) | undefined;
  if (clockMethod) {
    const program = compileMameHandler(normalizeMameExecutionSource(clockMethod.body));
    const parameter = parameterName(splitMameArgs(clockMethod.parameters)[0] ?? 'clocks');
    if (!program.diagnostics.length) {
      // Members the constructor chain sets: the 6809's m_clock_divider, 4 on
      // an MC6809 and 1 on an MC6809E.
      const members = constructorInitialValues(className, files.map(file => readFileSync(join(mameSrc, file), 'utf8')).join('\n'));
      // An integer return type (u64), so the quotient is truncated.
      clocksToCycles = clocks => Math.floor(Number(executeGeneratedProgram(program, { members }, { [parameter]: clocks }).value) || 0);
    }
  }
  return {
    executes,
    ...(Number.isInteger(minCycles) && minCycles > 0 ? { minCycles } : {}),
    ...(clocksToCycles ? { clocksToCycles } : {}),
  };
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
/** The file-scope functions a header declares; a class's methods are its own. */
export function headerFunctionNames(header: string): string[] {
  const declared = stripCppComments(header);
  const outside = declared.replace(/\b(?:class|struct)\s+\w+[^;{]*\{(?:[^{}]|\{[^{}]*\})*\}\s*;/g, '');
  return [...outside.matchAll(/^[\w:<>*&\s]+?\b(\w+)\s*\([^;{}]*\)\s*;/gm)].map(name => name[1]!);
}

/**
 * src/emu interfaces that are logic of their own rather than a service the
 * host answers, compiled with any device that derives one. MAME's
 * device_rtc_interface keeps the calendar a clock chip counts in
 * (advance_seconds, convert_to_bcd); the uPD4990A calls it on every tick.
 * Interfaces the host provides -- sound streams, screens, memory spaces --
 * are never compiled this way.
 */
const FRAMEWORK_INTERFACES: Record<string, string> = {
  device_rtc_interface: 'src/emu/dirtc',
};

function frameworkInterfaceSources(
  mameSrc: string,
  sources: readonly { file: string; source: string }[],
): { file: string; source: string }[] {
  const own = sources.map(({ source }) => stripCppComments(source)).join('\n');
  return Object.entries(FRAMEWORK_INTERFACES).flatMap(([name, stem]) =>
    new RegExp(`\\bpublic\\s+${name}\\b`).test(own) && !sources.some(({ file }) => file === `${stem}.cpp`)
      ? [`${stem}.h`, `${stem}.cpp`].map(file => ({ file, source: readFileSync(join(mameSrc, file), 'utf8') }))
      : []);
}

/**
 * A helper library beside a device's own source: konami_helper.h, which
 * k053246_k053247_k055673.cpp includes, declares konami_decode_gfx, and
 * konami_helper.cpp defines it. Like a format library, the pair joins the
 * device only when a function the header declares is called.
 */
function helperLibrarySources(
  mameSrc: string,
  sources: readonly { file: string; source: string }[],
): { file: string; source: string }[] {
  const own = sources.map(({ source }) => stripCppComments(source)).join('\n');
  const libraries: { file: string; source: string }[] = [];
  const seen = new Set(sources.map(({ file }) => file));
  for (const { file, source } of sources) {
    for (const match of source.matchAll(/^\s*#include\s+"(\w+)\.h"/gm)) {
      const header = join(dirname(file), `${match[1]}.h`);
      const implementation = join(dirname(file), `${match[1]}.cpp`);
      if (seen.has(implementation) || !existsSync(join(mameSrc, header)) || !existsSync(join(mameSrc, implementation))) continue;
      const names = headerFunctionNames(readFileSync(join(mameSrc, header), 'utf8'));
      if (!names.some(name => new RegExp(`\\b${name}\\s*\\(`).test(own))) continue;
      seen.add(implementation);
      for (const library of [header, implementation]) {
        if (sources.some(entry => entry.file === library) || libraries.some(entry => entry.file === library)) continue;
        libraries.push({ file: library, source: readFileSync(join(mameSrc, library), 'utf8') });
      }
    }
  }
  return libraries;
}

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

/**
 * A child that is itself a slot, with the card table its owner's machine
 * config hands it: `GENERIC_CARTSLOT(config, m_cart, generic_plain_slot, ...)`
 * offers `generic_plain_slot`'s one card, GENERIC_ROM_PLAIN, and the slot's
 * own `m_cart = get_card_device();` names the member that reaches it. The
 * table lives beside the slot's source (bus/generic/carts.cpp). A slot whose
 * default is nullptr picks its card from the image, through
 * get_default_card_software, so no default is recorded.
 */
function composeChildSlot(
  mameSrc: string,
  child: GeneratedDeviceDefinition,
  table: string,
  nested: ReadonlySet<string>,
): GeneratedDeviceDefinition['slot'] | undefined {
  const own = child.sourceFiles.map(file => readFileSync(join(mameSrc, file), 'utf8')).join('\n');
  const member = /\b(m_\w+)\s*=\s*get_card_device\s*\(\s*\)/.exec(own)?.[1];
  if (!member) return undefined;
  const directory = join(mameSrc, dirname(child.sourceFiles[0]!));
  const known = indexMameHardware(mameSrc);
  for (const file of readdirSync(directory).filter(name => name.endsWith('.cpp'))) {
    const source = readFileSync(join(directory, file), 'utf8');
    const body = new RegExp(String.raw`device_slot_interface\s*&\s*${table}\s*\(\s*device_slot_interface\s*&\s*\w+\s*\)\s*\{([\s\S]*?)\n\}`).exec(source)?.[1];
    if (!body) continue;
    const options: Record<string, GeneratedDeviceDefinition> = {};
    for (const option of body.matchAll(/option_add(?:_internal)?\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*\)/g)) {
      const card = known.get(option[2]!);
      if (!card || nested.has(option[2]!)) continue;
      const compiled = compileMameDevice(mameSrc, card, option[2]!, new Set([...nested, child.type]));
      if (!compiled.summary.diagnostics) options[option[1]!] = compiled;
    }
    return Object.keys(options).length ? { member, options } : undefined;
  }
  return undefined;
}

/**
 * Where an `#include` resolves, as localSourceFiles follows it: beside the
 * including file, under src/devices, under 3rdparty, then MAME's GEN_DIR.
 */
function resolveMameInclude(mameSrc: string, includingAbsolute: string, include: string): string | undefined {
  return [
    join(dirname(includingAbsolute), include),
    join(mameSrc, 'src/devices', include),
    join(mameSrc, '3rdparty', include),
  ].find(candidate => existsSync(candidate)) ?? generatedInclude(mameSrc, include);
}

/**
 * An `#include` inside a function body is that file's text in that place, as
 * the C preprocessor has it. MAME's 6809 is written so:
 *
 *   void m6809_base_device::execute_one()
 *   {
 *     switch(pop_state())
 *     {
 *   #include "cpu/m6809/m6809.hxx"
 *     }
 *   }
 *
 * and read without the text the switch had no cases: the whole instruction
 * set dropped, with no diagnostic. An include at file level is a separate
 * source, which localSourceFiles already follows.
 */
function spliceBodyIncludes(mameSrc: string, file: string, source: string): string {
  if (!/^[ \t]*#[ \t]*include\b/m.test(source)) return source;
  const absolute = join(mameSrc, file);
  const lines = source.split('\n');
  let depth = 0;
  let blockComment = false;
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    const line = lines[lineIndex]!;
    const include = /^[ \t]*#[ \t]*include[ \t]+"([^"]+)"/.exec(line);
    if (include && depth > 0 && !blockComment) {
      const resolved = resolveMameInclude(mameSrc, absolute, include[1]!);
      if (!resolved) throw new Error(`${file}:${lineIndex + 1}: #include "${include[1]}" inside a function resolves nowhere`);
      lines[lineIndex] = spliceBodyIncludes(mameSrc, relative(mameSrc, resolved), readFileSync(resolved, 'utf8'));
      continue;
    }
    for (let index = 0; index < line.length; index++) {
      const character = line[index]!;
      if (blockComment) {
        if (character === '*' && line[index + 1] === '/') { blockComment = false; index++; }
      } else if (character === '/' && line[index + 1] === '/') {
        break;
      } else if (character === '/' && line[index + 1] === '*') {
        blockComment = true;
        index++;
      } else if (character === '"' || character === '\'') {
        for (index++; index < line.length && line[index] !== character; index++) {
          if (line[index] === '\\') index++;
        }
      } else if (character === '{') {
        depth++;
      } else if (character === '}') {
        depth--;
      }
    }
  }
  return lines.join('\n');
}

/** A same-directory header of out-of-line method definitions (`Class::name(...) {`), not declarations. */
function inlineBodiesHeader(from: string, include: string): boolean {
  if (extname(include) !== '.h' || include.includes('/')) return false;
  const path = join(dirname(from), include);
  if (!existsSync(path)) return false;
  const definitions = stripCppComments(readFileSync(path, 'utf8'))
    .match(/^[ \t]*(?:inline\s+)?[\w:<>*&\s]+?\b\w+::~?\w+\s*\([^;{}]*\)\s*(?:const\s*)?\{/gm);
  return (definitions?.length ?? 0) >= 3;
}

const BUILD_SCRIPTS = ['cpu.lua', 'sound.lua', 'video.lua', 'machine.lua', 'bus.lua'];
const BUILD_BLOCKS = new Map<string, string[][]>();

/**
 * The other build units MAME compiles a device's class from: a .cpp listed
 * in the same `files { }` block of scripts/src/*.lua as the device's source,
 * that includes the device's own header and defines methods of its class.
 * The microcoded 68000's instruction handlers are m68000gen.py's
 * m68000-sdf.cpp and its siblings, which no header names; without them the
 * class had its execute_run and none of the states it dispatches to.
 */
function buildUnitSiblings(mameSrc: string, sourceFile: string, className: string): string[] {
  let blocks = BUILD_BLOCKS.get(mameSrc);
  if (!blocks) {
    blocks = [];
    for (const script of BUILD_SCRIPTS) {
      const path = join(mameSrc, 'scripts/src', script);
      if (!existsSync(path)) continue;
      for (const block of readFileSync(path, 'utf8').matchAll(/\bfiles\s*\{([^}]*)\}/g)) {
        blocks.push([...block[1]!.matchAll(/MAME_DIR\s*\.\.\s*"([^"]+)"/g)].map(found => found[1]!));
      }
    }
    BUILD_BLOCKS.set(mameSrc, blocks);
  }
  const block = blocks.find(files => files.includes(sourceFile));
  if (!block) return [];
  const header = `${basename(sourceFile, extname(sourceFile))}.h`;
  const bare = className.split('::').at(-1)!;
  // A method, or a static member defined there: m68000-decode.cpp holds only
  // `m68000_device::s_packed_decode_table[]`.
  const definesMethod = new RegExp(`^[^\\n;{}]*\\b${bare}::~?\\w+\\s*[(\\[=]`, 'm');
  return block.filter(file => file !== sourceFile && file.endsWith('.cpp') &&
    dirname(file) === dirname(sourceFile) && existsSync(join(mameSrc, file)) && (() => {
      const text = readFileSync(join(mameSrc, file), 'utf8');
      return new RegExp(`^\\s*#\\s*include\\s+"${header.replace(/\./g, '\\.')}"`, 'm').test(text) && definesMethod.test(text);
    })());
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
      // So is a header beside the .cpp that holds out-of-line method bodies
      // rather than declarations: i86.cpp's `#include "i86inline.h"`, 89
      // `i8086_common_cpu_device::` bodies (CLK, PUSH, fetch_word, the flag
      // ops) every instruction calls. A sibling that only declares a class
      // is not followed.
      if (!family && !['.ipp', '.hxx'].includes(extname(match[1]!)) && !inlineBodiesHeader(absolute, match[1]!)) continue;
      // Follow headers that are part of the same device family. Includes
      // resolved through MAME's global include paths (screen.h, emu.h, etc.)
      // describe host services, not another source-defined base class.
      //
      // `src/devices` is the one global root worth resolving, because MAME's
      // shared bus interfaces live there and a device really does inherit from
      // them: every Game Boy cartridge decodes its own ROM through
      // `device_generic_cart_interface::install_non_power_of_two`, included as
      // "bus/generic/slot.h" and reachable no other way.
      //
      // `3rdparty` is the other: MAME's FM chips are wrappers over the bundled
      // ymfm library (`#include "ymfm/src/ymfm_opl.h"`), and the chip a
      // DS1001 holds as `m_chip` is declared nowhere else.
      //
      // Last, GEN_DIR: what MAME's build generates rather than the tree
      // holding it -- the 6809's `#include "cpu/m6809/m6809.hxx"`, which
      // m6809make.py writes from m6809.lst (mame-build.ts).
      const included = resolveMameInclude(mameSrc, absolute, match[1]!);
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
/** Namespace-scope aliases (`using opl_registers = opl_registers_base<1>;`), at column 0. */
function namespaceAliasMap(sources: readonly { source: string }[]): Map<string, string> {
  const aliases = new Map<string, string>();
  for (const { source } of sources) {
    for (const alias of stripCppComments(source).matchAll(/^using\s+(\w+)\s*=\s*([^;]+);/gm)) {
      aliases.set(alias[1]!, alias[2]!.trim());
    }
  }
  return aliases;
}

/**
 * The constants of a class instance (`fm_engine_base<opl_registers>`), with
 * its template arguments in place and every qualified name it uses resolved
 * the same way, through its own aliases and the namespace's. Memoized; a
 * cycle answers undefined.
 */
function instanceConstantResolver(
  classes: Map<string, MameClass>,
  namespaceAliases: ReadonlyMap<string, string>,
  seed: Record<string, number>,
  namespaceQualifier?: RegExp,
): (instance: string) => Record<string, number> | undefined {
  const memo = new Map<string, Record<string, number> | undefined>();
  const resolve = (instance: string): Record<string, number> | undefined => {
    const key = (namespaceQualifier ? instance.replace(namespaceQualifier, '') : instance).replace(/\s+/g, '');
    if (memo.has(key)) return memo.get(key);
    memo.set(key, undefined);
    const parsed = /^(\w+)(?:<([\s\S]*)>)?$/.exec(key);
    if (!parsed) return undefined;
    const root = parsed[1]!;
    const declaration = classes.get(root);
    if (!declaration) {
      const alias = namespaceAliases.get(root);
      const values = alias && parsed[2] === undefined ? resolve(alias) : undefined;
      memo.set(key, values);
      return values;
    }
    const substitutions = new Map(resolveTemplateArguments(root, classes));
    if (parsed[2] !== undefined && declaration.templateParameters?.length) {
      const args = splitMameArgs(parsed[2]).map(argument => argument.trim());
      substitutions.set(root, Object.fromEntries(
        declaration.templateParameters.map((parameter, index) => [parameter, args[index] ?? parameter])));
    }
    const aliases = new Map<string, string>();
    let values = seed;
    for (const className of classHierarchy(root, classes)) {
      let body = stripCppComments(classes.get(className)?.body ?? '');
      if (namespaceQualifier) body = body.replace(namespaceQualifier, '');
      for (const [parameter, argument] of Object.entries(substitutions.get(className) ?? {})) {
        body = body.replace(new RegExp(`\\b${parameter}\\b`, 'g'), argument);
      }
      for (const alias of body.matchAll(/\busing\s+(\w+)\s*=\s*([^;]+);/g)) aliases.set(alias[1]!, alias[2]!.trim());
      const qualified = body.replace(/\b(\w+(?:<[^<>;]*>)?)::([A-Z]\w*)\b/g, (whole, owner: string, name: string) => {
        const target = aliases.get(owner) ?? [...aliases.values()]
          .find(aliased => aliased.replace(/\s*<[\s\S]*>$/, '') === owner && aliased !== owner) ?? owner;
        if (target === root) return whole;
        const value = resolve(target)?.[name];
        return value === undefined ? whole : String(value);
      });
      values = numericConstants(qualified, values);
    }
    memo.set(key, values);
    return values;
  };
  return resolve;
}

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
    // A template base forwarding its own parameter (`ymfm_ssg_device_base<
    // ChipClass> : ymfm_device_base<ChipClass>`) passes on what it was bound
    // to: the YM2203's `ymfm::ym2203`, not the word `ChipClass`.
    const own = resolved.get(name) ?? {};
    const bound = (argument: string): string => argument.replace(/\b[A-Za-z_]\w*\b/g, word =>
      Object.hasOwn(own, word) ? own[word]! : word);
    for (const base of declaration.bases) {
      const args = declaration.baseTemplateArguments?.[base];
      const parameters = classes.get(base)?.templateParameters;
      if (args?.length && parameters?.length) {
        resolved.set(base, Object.fromEntries(
          parameters.map((parameter, index) => [parameter, args[index] !== undefined ? bound(args[index]!) : parameter]),
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

/**
 * A type parameter's pixel size, from the bitmap it arrives as. Left to
 * deduction, `template <class BitmapClass>` is `auto` to the untyped IR, and
 * `sizeof(typename BitmapClass::pixel_t)` named nothing; the instance C++
 * would deduce is the one the `BitmapClass &bitmap` argument is, so the size
 * is that bitmap's `bpp()` in bytes.
 */
function bindDependentPixelSize(method: MameFunction, typeParameters: readonly string[]): MameFunction {
  let body = method.body;
  for (const parameter of typeParameters) {
    const argument = splitMameArgs(method.parameters)
      .map(declared => new RegExp(`^\\s*(?:const\\s+)?${parameter}\\s*[&*]\\s*(\\w+)\\s*$`).exec(declared)?.[1])
      .find(Boolean);
    if (!argument) continue;
    body = body.replace(
      new RegExp(`\\bsizeof\\s*\\(\\s*(?:typename\\s+)?${parameter}\\s*::\\s*pixel_t\\s*\\)`, 'g'),
      `(${argument}.bpp() >> 3)`,
    );
  }
  return body === method.body ? method : { ...method, body };
}

/**
 * Calls to value templates with every argument a constant the device knows,
 * spelled with the numbers (`f<SA_IRQ_ON, 1>(` as `f<4, 1>(`), so the handler
 * parser names the instance as the compiler generated it.
 */
function foldTemplateConstants(body: string, names: ReadonlySet<string>, constants: Record<string, number>): string {
  const pattern = new RegExp(`(?<![\\w.>:])(${[...names].map(name => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*<([^<>()]+)>\\s*\\(`, 'g');
  return body.replace(pattern, (whole, name: string, args: string) => {
    const values = splitMameArgs(args).map(argument => {
      const text = argument.trim().replace(/\btrue\b/g, '1').replace(/\bfalse\b/g, '0');
      return evalExpr(text, constants);
    });
    return values.every(value => typeof value === 'number' && Number.isInteger(value))
      ? `${name}<${values.join(', ')}>(` : whole;
  });
}

function specializeFunctionTemplate(
  template: MameFunction,
  sources: readonly { file: string; source: string }[],
  functionMacros: readonly FunctionMacro[],
  constants: Record<string, number>,
): MameFunction[] {
  const parameters = template.templateParameters ?? [];
  if (!parameters.length) return [template];
  const method = bindDependentPixelSize(template, parameters);
  const className = method.className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const methodName = method.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // A derived class's qualifier names an inherited template too: the
  // 68705P's map installs `m68705p_device::eprom_r<0x0080>`, a template
  // m68705_device defines.
  // And an unqualified call from another member names it too, once that
  // member's own template arguments are numbers: the 6805's handlers call
  // `immbyte<big>(t)`, which is `immbyte<0>(t)` in the `big = false` handler.
  void className;
  const pattern = new RegExp(
    `(?:\\b\\w+::|(?<![\\w.>:]))${methodName}\\s*<([^<>]+)>`,
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
      // A call may supply only the leading arguments and let C++ deduce the
      // rest: `immbyte<0>(t)` for `template <bool big, typename T>`. The
      // numbers it gives are the instance; the deduced rest stay open.
      if (!supplied.length || supplied.length > parameters.length) continue;
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
    // Parameters the call left to deduction are types to the untyped IR.
    const bound = parameters.slice(0, args.length);
    let methodSource = method.parameters + marker + stripEmptyPackRecursion(method.body);
    for (const open of parameters.slice(args.length)) {
      methodSource = methodSource.replace(new RegExp(`\\b${open}\\b`, 'g'), 'auto');
    }
    const source = `template <${bound.map(parameter => `int ${parameter}`).join(', ')}>\n` + methodSource;
    const [monomorphized] = monomorphizeFunctionTemplate(source, [{
      id: `${method.name}<${args.join(',')}>`,
      arguments: Object.fromEntries(bound.map((parameter, index) => [
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

/**
 * A base class named through an alias of a template instance is that
 * template, with those arguments: atarimo derives from
 * `sprite16_device_ind16`, sprite.h's
 * `typedef sprite_device<uint16_t, bitmap_ind16> sprite16_device_ind16;`.
 * Unresolved, the hierarchy stopped at the alias and the motion-object device
 * had no draw_async, bitmap() or spriteram() -- it never drew a sprite.
 */
/** `typedef T<args> Name;` and `using Name = T<args>;`, by alias name. */
function templateAliases(source: string): Map<string, { template: string; args: string[] }> {
  const aliases = new Map<string, { template: string; args: string[] }>();
  const text = stripCppComments(source);
  for (const match of text.matchAll(/\btypedef\s+([\w:]+)\s*<([^;<>]*(?:<[^;<>]*>[^;<>]*)*)>\s*(\w+)\s*;/g)) {
    aliases.set(match[3]!, { template: match[1]!.split('::').at(-1)!, args: splitMameArgs(match[2]!).map(arg => arg.trim()) });
  }
  for (const match of text.matchAll(/\busing\s+(\w+)\s*=\s*([\w:]+)\s*<([^;<>]*(?:<[^;<>]*>[^;<>]*)*)>\s*;/g)) {
    aliases.set(match[1]!, { template: match[2]!.split('::').at(-1)!, args: splitMameArgs(match[3]!).map(arg => arg.trim()) });
  }
  return aliases;
}

function resolveTemplateAliasBases(
  classes: Map<string, MameClass>,
  aliases: Map<string, { template: string; args: string[] }>,
): void {
  if (!aliases.size) return;
  for (const [name, declaration] of classes) {
    const bases = declaration.bases.map(base => {
      const alias = aliases.get(base.split('::').at(-1)!);
      return alias && !classes.has(base) && classes.get(alias.template)?.templateParameters?.length ? alias : undefined;
    });
    if (!bases.some(Boolean)) continue;
    classes.set(name, {
      ...declaration,
      bases: declaration.bases.map((base, index) => bases[index]?.template ?? base),
      baseTemplateArguments: {
        ...declaration.baseTemplateArguments,
        ...Object.fromEntries(bases.flatMap(alias => alias ? [[alias.template, alias.args]] : [])),
      },
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
      if (classes.has(unqualified)) {
        visit(unqualified);
        continue;
      }
      // Otherwise looked up outward from the class's own scope, as C++ does:
      // the slapstic's `struct idle : public state` derives from the
      // `atari_slapstic_device::state` declared beside it.
      const scopes = name.split('::').slice(0, -1);
      let found = false;
      for (let depth = scopes.length; depth > 0 && !found; depth--) {
        const nested = `${scopes.slice(0, depth).join('::')}::${unqualified}`;
        if (classes.has(nested)) {
          visit(nested);
          found = true;
        }
      }
      // Or a type an enclosing class inherits: konami1_device's
      // `class mi_konami1 : public mi_default` is m6809_base_device's.
      for (let depth = scopes.length; depth > 0 && !found; depth--) {
        const enclosing = scopes.slice(0, depth).join('::');
        for (const ancestor of classHierarchy(enclosing, classes).reverse()) {
          const inherited = `${ancestor}::${unqualified}`;
          if (ancestor !== enclosing && classes.has(inherited)) {
            visit(inherited);
            found = true;
            break;
          }
        }
      }
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

/**
 * A function-like macro a method defines inside its own body is expanded
 * there, whatever it expands to, and its `#define`/`#undef` lines go: ymfm
 * spells its power table `X(0x3fa), X(0x3f5), ...` under a `#define X(a)`
 * that lives and dies inside `attenuation_to_volume`. The file-wide macro
 * rule (statement macros only) is about names other code also routes on; a
 * macro scoped to one body has no such reader.
 */
function expandLocalMacros(body: string): string {
  if (!/^[ \t]*#[ \t]*define\b/m.test(body)) return body;
  const joined = body.replace(/\\[ \t]*\r?\n/g, ' ');
  const macros = [...joined.matchAll(/^[ \t]*#[ \t]*define[ \t]+(\w+)\(([^)]*)\)[ \t]*(.*)$/gm)]
    .map(match => ({
      name: match[1]!,
      parameters: match[2]!.split(',').map(parameter => parameter.trim()).filter(Boolean),
      body: match[3]!.replace(/\/\/.*$/, '').trim(),
    }));
  if (!macros.length) return body;
  const names = new Set(macros.map(macro => macro.name));
  return expandFunctionMacros(joined.replace(/^[ \t]*#[ \t]*(?:define|undef)[ \t]+(\w+).*$/gm,
    (line, name: string) => names.has(name) ? '' : line), macros);
}

function compileMethod(
  method: MameFunction,
  interruptCallbacks: { member: string; line: string; signal: string }[] = [],
  sourceTables: Record<string, ConstantTable> = {},
  functionMacros: readonly FunctionMacro[] = [],
  memberAliases: readonly MemberAliasMacro[] = [],
  stringMacros: Readonly<Record<string, string>> = {},
  owner: string = method.className ?? '',
): GeneratedDeviceMethod {
  let body = expandMemberAliasMacros(
    expandFunctionMacros(expandLocalMacros(method.body), functionMacros),
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
    // before any method runs (see the timers list in compileMameDevice),
    // an array's elements included.
    /(?<![\w.>])\w+(?:\s*\[[^\]]*\])?\s*=\s*(?:machine\(\)\s*\.\s*scheduler\(\)\s*\.\s*)?timer_alloc\s*\([^;]*\)\s*;\s*/g,
    '',
  );
  // A reference local bound to a framework accessor chain is that chain:
  // `auto &scheduler = machine().scheduler(); if (scheduler.currently_executing())`,
  // or initialised directly and typed, as the Taito SJ security interface does:
  // `device_scheduler &sched(machine().scheduler()); sched.synchronize(...)`.
  for (const alias of [...body.matchAll(/\b[\w:]+\s*&\s*(\w+)\s*(?:=\s*(machine\(\)(?:\s*\.\s*\w+\(\))+)|\(\s*(machine\(\)(?:\s*\.\s*\w+\(\))+)\s*\))\s*;/g)]) {
    const chain = (alias[2] ?? alias[3])!;
    body = body.replace(alias[0], '').replace(new RegExp(`(?<![\\w.>])${alias[1]}\\s*\\.`, 'g'), `${chain}.`);
  }
  body = expandStringMacros(body, stringMacros);
  // MAME's debugger is never running here (debug_flags has no
  // DEBUG_FLAG_ENABLED), so `debugger_enabled()` is false wherever it is
  // asked: the Z80's execute_run guards its interrupt hook with it, and left
  // as a call it kept the whole instruction loop out of the emitter.
  body = body
    // address_space_config's accessors are its fields (the config members
    // carry them): Musashi sizes its autovector map with
    // `m_program_config.addr_width()`.
    .replace(/\b(m_\w*config\w*)\s*\.\s*(addr_width|data_width|addr_shift|logaddr_width|page_shift|endianness)\s*\(\s*\)/g, '$1.m_$2')
    .replace(/(?:\b\w+::)?\bdebugger_enabled\s*\(\s*\)/g, 'false')
    .replace(/\bmachine\s*\(\s*\)\s*\.\s*debug_flags\b/g, '0');
  // `space(AS_PROGRAM).cache(m_cprogram13)` binds the accessor to that space:
  // every later `m_cprogram13.read_byte(a)` reads through it. The accessor is
  // the space as far as the generated device is concerned.
  body = body.replace(
    // The space may be chosen in place: the 6800 fetches opcodes through
    // `space(has_space(AS_OPCODES) ? AS_OPCODES : AS_PROGRAM).cache(m_copcodes)`.
    // Or a field of an object the device holds: the 6809 reads memory
    // through its memory interface, `space(AS_PROGRAM).cache(m_mintf->cprogram)`.
    /\b(space\s*\((?:[^()]|\([^()]*\))*\))\s*\.\s*(?:cache|specific)\s*\(\s*(m_\w+(?:\s*(?:->|\.)\s*\w+)*)\s*\)\s*;/g,
    '$2 = $1;',
  ).replace(
    // Or through a member holding the space: the 8086's
    // `m_opcodes->cache(m_cache8)`, after `m_opcodes = m_program`.
    /(?<![\w.>])(m_\w+)\s*->\s*(?:cache|specific)\s*\(\s*(m_\w+(?:\s*(?:->|\.)\s*\w+)*)\s*\)\s*;/g,
    '$2 = $1;',
  ).replace(
    // Or a space the method was handed: Musashi's init16(address_space &space,
    // address_space &ospace) binds `ospace.cache(m_oprogram16)`.
    /(?<![\w.>])([A-Za-z_]\w*)\s*\.\s*(?:cache|specific)\s*\(\s*(m_\w+(?:\s*(?:->|\.)\s*\w+)*)\s*\)\s*;/g,
    '$2 = $1;',
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
  // A table by its bare name, unless the method's own class defines one of
  // that name: then that one (constantTables keeps both).
  const tables: Record<string, ConstantTable> = {};
  for (const [name, table] of Object.entries(sourceTables)) if (!name.includes('::')) tables[name] = table;
  for (const [name, table] of Object.entries(sourceTables)) {
    const at = name.lastIndexOf('::');
    if (at > 0 && owner && name.slice(0, at) === owner) tables[name.slice(at + 2)] = table;
  }
  for (const [name, table] of Object.entries(tables)) {
    // A table this method declares itself is a local, and the execution-source
    // normalizer folds those together with their declaration. Substituting
    // here as well leaves `static const double TABLE(...) = {...}` behind.
    if (new RegExp(`\\bstatic\\s+[^;{]*\\b${name}\\s*\\[`).test(body)) {
      continue;
    }
    // So is a parameter of that name: segacrpt's file-scope `decode(...,
    // const uint8_t convtable[32][4], ...)` indexes the table each decrypt()
    // passes it, and substituting another class's static `convtable` decoded
    // every Sega Z80 with the wrong one.
    if (new RegExp(`\\b${name}\\s*(?:\\[[^\\]]*\\]\\s*)*(?:,|$)`).test(method.parameters)) {
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
    if (table.rows) {
      body = body.replace(new RegExp(`\\b${name}\\s*\\[${subscript}\\]`, 'g'),
        (_entry, row: string) => `TABLE(${row}, ${table.rows!.join(', ')})`);
    }
  }
  // A table's entries can be macros themselves (the CRT format's UNSUPPORTED).
  body = expandStringMacros(body, stringMacros);
  // An XTAL parameter is the number the machine configuration evaluated it
  // to, so its accessors are that number: `dvalue()` itself, and `value()`
  // xtal.h's rounding, `u32(m_current_clock + 1e-3)`.
  for (const [, name] of method.parameters.matchAll(/\bXTAL\s*&?\s*(\w+)/g)) {
    body = body
      .replace(new RegExp(`\\b${name}\\s*\\.\\s*dvalue\\s*\\(\\s*\\)`, 'g'), `(${name})`)
      .replace(new RegExp(`\\b${name}\\s*\\.\\s*value\\s*\\(\\s*\\)`, 'g'), `u32(${name} + 1e-3)`);
  }
  // So is an XTAL constant: exidysound.cpp's `#define SH8253_CLOCK
  // (CRYSTAL_OSC / 2)` over `3.579545_MHz_XTAL`, read in device_start as
  // `SH8253_CLOCK.value()`. A macro or constant name with an accessor can only
  // be one (an arithmetic constant has none); unrewritten, the stream's rate
  // and the 6840's clocks per sample were both 0, and Berzerk was silent.
  body = body
    .replace(/(?<![\w.>])([A-Z][A-Z0-9_]*)\s*\.\s*dvalue\s*\(\s*\)/g, '($1)')
    .replace(/(?<![\w.>])([A-Z][A-Z0-9_]*)\s*\.\s*value\s*\(\s*\)/g, 'u32($1 + 1e-3)');
  return {
    name: method.name,
    parameters: method.parameters,
    program: compileMameHandler(normalizeMameExecutionSource(body),
      method.returnType ? { returnType: method.returnType } : {}),
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
  // A call operator is `__call`, as the AST names it (parseMameSource).
  const masked = maskNestedClasses(source.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, match =>
    match.replace(/[^\r\n]/g, ' ')))
    .replace(/\boperator\s*\(\s*\)(\s*)\(/g, call => `${'__call'.padEnd(call.length - 1)}(`);
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
  // A member macro defined in the class body, as a header does for a short
  // callback: sn76496.h's `TIMER_CALLBACK_MEMBER(delayed_ready) {
  // set_ready_state(1); }`. Missed, the READY timer named a method no
  // device had, and the first SN76489 write that armed it threw.
  const macroMember = /(?:^|\n|[;{}])\s*(INTERRUPT_GEN_MEMBER|TIMER_CALLBACK_MEMBER|TIMER_DEVICE_CALLBACK_MEMBER|IRQ_CALLBACK_MEMBER|TILEMAP_MAPPER_MEMBER|TILE_GET_INFO_MEMBER|INPUT_CHANGED_MEMBER)\s*\(\s*(\w+)\s*\)\s*\{/g;
  for (let match; (match = macroMember.exec(masked)) !== null;) {
    const braceStart = masked.indexOf('{', match.index + match[0].length - 1);
    const braceEnd = matchingBrace(masked, braceStart);
    if (braceEnd < 0 || methods.some(method => method.name === match![2])) continue;
    const line = declaration.bodySpan.line + source.slice(0, match.index).split('\n').length - 1;
    const span = {
      file: declaration.span.file,
      start: declaration.bodySpan.start + match.index,
      end: declaration.bodySpan.start + braceEnd + 1,
      line, column: 1, endLine: line, endColumn: 1,
    };
    methods.push({
      kind: 'function',
      className: declaration.name,
      name: match[2]!,
      parameters: memberMacroParameters(match[1]!),
      body: source.slice(braceStart + 1, braceEnd),
      statements: [],
      span,
      bodySpan: { ...span, start: declaration.bodySpan.start + braceStart + 1, end: declaration.bodySpan.start + braceEnd },
    });
    macroMember.lastIndex = braceEnd + 1;
  }
  return methods;
}

export function memberDeclarations(
  declaration: MameClass,
  constants: Record<string, number> = {},
): { name: string; valueType: string; arrayLength?: number; arrayShape?: number[] }[] {
  // `mutable` lets a const method write the member; it is still a member
  // (ymfm's channel keeps its next feedback input as `mutable int16_t`).
  // An access specifier ends its line: a class a macro writes (discrete's
  // DISCRETE_CLASS_STEP_RESET) is one line, and the member after `private:`
  // otherwise starts mid-line, where no pattern below looks.
  // Two members on one line are two declarations: neosprite declares
  // `u8* m_region_fixed = nullptr; u32 m_region_fixed_size = 0;`, and only the
  // first was ever read, so the fixed layer's size was no member at all.
  declaration = { ...declaration, body: maskNestedClasses(declaration.body)
    .replace(/;[ \t]+(?=(?:const\s+)?[\w:]+(?:\s*<[^<>;]*>)?[\s*&]+m_\w+\s*(?:=|;|\[|\{))/g, ';\n')
    .replace(/\b(public|protected|private)\s*:(?!:)/g, '$1:\n')
    .replace(/(^\s*|[;{}]\s*)mutable\s+/gm, '$1')
    // A static data member is state too (the build fills it once, every
    // instance reads it): Musashi's `static u16 m68ki_instruction_state_table
    // [NUM_CPU_TYPES][0x10000]` and its cycle tables, built by
    // m68ki_build_opcode_table at the first init. Not a constant, a function
    // or an inline initialiser, which say otherwise.
    .replace(/(^\s*|[;{}]\s*)static\s+(?!(?:const|constexpr|inline|void|struct|class|enum)\b)(?=(?:(?:unsigned|signed|long|short)\s+)*[\w:]+(?:\s*<[^;<>]*>)?\s+\w+\s*(?:\[[^\]]*\]\s*)*;)/gm, '$1') };
  const members: {
    name: string; valueType: string; arrayLength?: number; arrayShape?: number[];
  }[] = [];
  // A member declared by an anonymous struct: `struct { bool on; ... }
  // m_snd_control;`. The block has no type name, so the member's own name is
  // the shape's key -- structDeclarations records it under the same one.
  // Its bound makes it an array of structs: the 8257's four channels are
  // `struct { ... } m_channel[4];`. Its fields are the struct's, never the
  // device's, so the block is masked before the patterns below read them as
  // members of their own.
  let unmasked = declaration.body;
  for (const block of structBlocks(declaration.body)) {
    // Only an anonymous struct declares a member here; a named one is a type,
    // and its members are picked up by the ordinary patterns below.
    // A named one with a declarator declares both: k053260.h's
    // `class KDSC_Voice { ... } m_voice[4];` is four KDSC_Voices.
    const name = block.declarator;
    if (!name || members.some(member => member.name === name)) continue;
    const arrayLength = block.declaratorBound === undefined ? undefined : arrayBound(block.declaratorBound, constants);
    members.push({ valueType: block.name, name,
      ...(arrayLength !== undefined && Number.isInteger(arrayLength) && arrayLength > 0 ? { arrayLength } : {}) });
    unmasked = unmasked.replace(`{${block.body}}`, `{${block.body.replace(/[^\r\n]/g, ' ')}}`);
  }
  declaration = { ...declaration, body: unmasked };
  // C++ commonly groups scalar members (`int m_base, m_mask;`). Treat every
  // declarator as its own field before the single-declarator patterns below.
  // The names need not carry `m_`: the 64H156 keeps its live and checkpoint
  // bit-engine states as `live_info cur_live, checkpoint_live;`. The type may
  // be elaborated: each slapstic state holds `struct test m_bank[4], m_alt, m_bit;`.
  for (const match of declaration.body.matchAll(
    // A template type too: the 6800 keeps both its program and opcode
    // accessors as `memory_access<16, 0, 0, ENDIANNESS_BIG>::cache m_cprogram, m_copcodes;`.
    // Pointer declarators too: the 8086's `address_space *m_program, *m_opcodes;`.
    /^\s*((?:const\s+)?(?:(?:struct|union)\s+)?[\w:]+(?:\s*<[^;<>\r\n]*(?:<[^;<>\r\n]*>[^;<>\r\n]*)*>(?:::\w+)*)?(?:\s+const)?)\s+(\*?\s*[A-Za-z_]\w*(?:\s*\[[^\]]+\])?(?:\s*,\s*\*?\s*[A-Za-z_]\w*(?:\s*\[[^\]]+\])?)+)\s*;/gm,
  )) {
    const baseType = match[1]!.replace(/\b(?:struct|union)\s+/, '').replace(/\s+/g, ' ').trim();
    if (/^(?:return|using|typedef|friend|case|goto|delete|throw)$/.test(baseType)) continue;
    for (const declarator of match[2]!.split(',').map(value => value.trim())) {
      const parsed = /^(\*?)\s*([A-Za-z_]\w*)(?:\s*\[([^\]]+)\])?$/.exec(declarator)!;
      const valueType = parsed[1] ? `${baseType} *` : baseType;
      const name = parsed[2]!;
      const arrayLength = parsed[3] === undefined ? undefined : arrayBound(parsed[3]);
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
    // With an array bound too: ymfm's engine holds
    // `std::unique_ptr<fm_channel<RegisterType>> m_channel[CHANNELS];`.
    /^\s*((?:const\s+)?[\w:]+<[^;\r\n]+>(?:::\w+)*)\s+(\w+)\s*(?:\[([^\]]+)\])?(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    // `char const *m_default_card;` -- east const, as generic_slot_device
    // spells all three of its strings. The pointer may be const itself: the
    // MCS-48's `const mcs48_ophandler *const m_opcode_table;`.
    /^\s*((?:const\s+)?[\w:]+(?:<[^;\r\n]+>)?(?:\s+const)?)\s*(\*)\s*(?:const\s+)?(\w+)\s*(?:\[([^\]]+)\])?(?:\s*\[[^\]]+\])*(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    // A builtin spelled in more than one word -- VLM5030's
    // `unsigned int m_current_energy;` -- and a pointer to a struct the
    // source names with its elaborated specifier, `const struct
    // tms5100_coeffs *m_coeff;`. Neither shape matched above, so the members
    // did not exist and every store into them went nowhere.
    /^\s*((?:const\s+)?(?:(?:unsigned|signed|long|short)\s+)+(?:int|char|long|short)?)\s+(\w+)\s*(?:\[([^\]]+)\])?(?:\s*\[[^\]]+\])*(?:\s*(?:=[^;]*|\{[^{}]*\}))?\s*;/gm,
    /^\s*(?:const\s+)?(?:struct|union)\s+([\w:]+)\s*(\*)\s*(\w+)\s*(?:\[([^\]]+)\])?\s*;/gm,
    // A reference member, bound by the constructor: ymfm's operator reaches
    // its registers and its engine as `RegisterType &m_regs;` and
    // `fm_engine_base<RegisterType> &m_owner;`.
    /^\s*((?:const\s+)?[\w:]+(?:\s*<[^;\r\n]+>)?(?:\s+const)?)\s*(&)\s*(m_\w+)\s*;/gm,
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
      const pointer = match[2] === '*' || match[2] === '&';
      const star = pointer ? match[2] : undefined;
      const name = (pointer ? match[3] : match[2])!;
      const bound = pointer ? match[4] : match[3];
      if (members.some(member => member.name === name)) continue;
      // A statement inside an inline body is not a declaration: slot.h's
      // `return nullptr;` read as a member named nullptr of type return.
      if (/^(?:return|using|typedef|friend|case|goto|delete|throw|else|co_return)$/.test(match[1]!.trim())) continue;
      const valueType = `${match[1]!.replace(/\s+/g, ' ').trim()}${star ?? ''}`;
      // MAME's array creators carry their count as a template argument rather
      // than a declarator bound: `memory_bank_array_creator<2> m_bank_rom`.
      // Read as one object, `m_bank_rom[0]` indexed nothing -- and both of an
      // MBC's ROM windows lost the bank behind them.
      // So does `std::array<T, N>`, ymfm's channel's four operator pointers.
      const templateCount = /_array_creator\s*<\s*(\d+)\s*>/.exec(valueType)?.[1] ??
        /^std::array\s*<[\s\S]*,\s*(\d+)\s*>$/.exec(valueType)?.[1];
      const arrayLength = bound
        ? arrayBound(bound, constants)
        : templateCount ? Number(templateCount) : undefined;
      // `uint8_t m_wave_ram[2][0x10];` -- a C array member may have more than
      // one bound, and only the outermost is the declarator the runtime
      // allocates from. The inner extents have to travel with it or the second
      // subscript indexes a number: the Game Boy APU's wave channel read its
      // whole waveform out of nothing.
      const shape = [...match[0].matchAll(/\[([^\]]+)\]/g)]
        .map(extent => arrayBound(extent[1]!, constants))
        .filter(extent => Number.isInteger(extent) && extent > 0);
      members.push({
        valueType,
        name,
        ...(Number.isInteger(arrayLength) && arrayLength! > 0 ? { arrayLength } : {}),
        ...(shape.length > 1 ? { arrayShape: shape } : {}),
      });
    }
  }
  // An access label before an anonymous enum on its own line (m68705.h's
  // `protected:` then `enum` then `{`) reads as a type and a name; a keyword
  // is never a member's name.
  return members.filter(member => !/^(?:enum|struct|class|union|typedef|using|template|friend|public|protected|private)$/.test(member.name));
}

/**
 * A declarator's array bound, which MAME often writes as arithmetic: the
 * VIC-II's `m_border_color_sample[0x400 / 8]`. Read with `Number()` it was
 * NaN, so the member had no length and every store into it went through the
 * emitter's name-addressed slow path on each of the chip's cycles.
 */
function arrayBound(bound: string, constants: Record<string, number> = {}): number {
  return Number(evalExpr(bound.trim(), constants) ?? Number.NaN);
}

// A named struct is masked too: its fields are its own, and the slapstic's
// states each hold a `struct test m_bank[4]` that read as the device's
// `optional_memory_bank m_bank`. Its `struct name` stays, so a declarator
// after the block (`struct name { ... } m_x;`) is still a member of that type.
function maskNestedClasses(source: string): string {
  const pattern = /\b(class|struct)\s+(\w+)\s*(?::[^;{]+)?\{/g;
  let match: RegExpExecArray | null;
  let result = source;
  while ((match = pattern.exec(source))) {
    const brace = source.indexOf('{', match.index);
    const end = matchingBrace(source, brace);
    if (end < 0) continue;
    const declared = /^\s*\w+\s*(?:\[[^\]]*\]\s*)?;/.test(source.slice(end + 1));
    // A class declaring a member as it closes is a member of that class:
    // k053260.h's `class KDSC_Voice { ... } m_voice[4];` is four voices, each
    // an object of the nested class (see the member's `object`).
    const kept = !declared ? '' : match[1] === 'struct' ? `struct ${match[2]}` : match[2]!;
    const masked = kept + result.slice(match.index + kept.length, end + 1).replace(/[^\r\n]/g, ' ');
    result = result.slice(0, match.index) + masked + result.slice(end + 1);
    pattern.lastIndex = end + 1;
  }
  return result;
}

function finderBinding(
  valueType: string,
  name: string,
  constructorBindings: Record<string, string[]>,
  constants: Record<string, number> = {},
): GeneratedDeviceMember['finder'] {
  const inputArray = /^(?:required|optional)_ioport_array\s*<\s*([^<>]+)>$/.exec(valueType.trim());
  if (inputArray) {
    const binding = constructorBindings[name] ?? [];
    const count = evalExpr(inputArray[1]!, constants);
    const format = unquoteToken(binding[1] ?? '');
    if (count === null || !Number.isInteger(count) || count <= 0 || !format) return undefined;
    const first = evalExpr((binding[2] ?? '0').replace(/(\d)[uUlL]+$/, '$1'), constants) ?? 0;
    const tags = Array.from({ length: count }, (_, index) => format.replace(/%[ud]/, String(first + index)));
    return { kind: 'input', tag: tags[0]!, tags };
  }
  const kind = valueType === 'required_ioport' || valueType === 'optional_ioport'
    ? 'input'
    : /^(?:required|optional)_device(?:_array)?</.test(valueType)
      ? 'device'
      : undefined;
  if (!kind) return undefined;
  const target = constructorBindings[name]?.at(-1);
  // DEVICE_SELF_OWNER is MAME's "^": the device that owns this one. A CTC
  // channel reaches its CTC that way (`m_device(*this, DEVICE_SELF_OWNER)`).
  if (kind === 'device' && target === 'DEVICE_SELF_OWNER') return { kind, tag: '^' };
  const tag = target && unquoteToken(target);
  return { kind, tag: tag ?? '' };
}

/**
 * The tags of a `required_device_array<T, N>` member's elements, from its
 * finder's format and first index: `m_channel(*this, "ch%u", 0U)` is `ch0`
 * to `ch3`. Undefined for anything that is not a device array.
 */
function deviceArrayTags(
  valueType: string,
  binding: readonly string[],
  constants: Record<string, number>,
): string[] | undefined {
  const bound = /^(?:required|optional)_device_array<\s*[\w:]+\s*,\s*([^<>]+)>$/.exec(valueType.trim())?.[1];
  const count = bound === undefined ? null : evalExpr(bound, constants);
  const format = unquoteToken(binding[1] ?? '');
  if (count === null || !Number.isInteger(count) || count <= 0 || !format) return undefined;
  const first = evalExpr((binding[2] ?? '0').replace(/(\d)[uUlL]+$/, '$1'), constants) ?? 0;
  return Array.from({ length: count }, (_, index) => format.replace(/%[ud]/, String(first + index)));
}

/**
 * What device_add_mconfig sets on the children it builds, kept per element.
 * The method is configuration, not behaviour, so it is not lowered with the
 * device's methods; it is run once here against a stand-in for each child,
 * and the numbers it stores into a child's own members are the child's
 * configuration (`m_channel[ch]->m_index = ch`). Statements that are not
 * about a child (routes, clocks, other devices) have nothing to store into
 * and are passed over.
 */
function configureChildren(
  mconfig: string,
  children: NonNullable<GeneratedDeviceDefinition['children']>,
): void {
  if (!children.length) return;
  const program = compileMameHandler(normalizeMameExecutionSource(mconfig));
  if (program.diagnostics.length) return;
  const state: Record<string, unknown> = {};
  for (const child of children) {
    state[child.member] = child.tags ? child.tags.map(() => ({})) : {};
  }
  const calls = Object.fromEntries(children.map(child => [child.type, () => 0]));
  const bindings = { members: state, constants: {}, calls } as never;
  for (const operation of program.operations) {
    try {
      executeGeneratedProgram({ ...program, operations: [operation] }, bindings, {});
    } catch {
      continue;
    }
  }
  for (const child of children) {
    const own = new Set(child.definition.members.map(member => member.name));
    const elements = (child.tags ? state[child.member] : [state[child.member]]) as Record<string, unknown>[];
    const configured = elements.map(element => Object.fromEntries(Object.entries(element)
      .filter((entry): entry is [string, number] =>
        own.has(entry[0]) && typeof entry[1] === 'number' && Number.isFinite(entry[1]))));
    if (configured.some(values => Object.keys(values).length)) child.configured = configured;
  }
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
  // finder_base::DUMMY_TAG names nothing until the machine configuration
  // re-tags the finder (Sega's 315-5177 `set_decrypted_tag(...)`), so it is
  // not the device's own tag.
  return {
    kind: 'shared',
    elementBytes,
    share: target === 'DEVICE_SELF' ? 'self'
      : /\bDUMMY_TAG\b/.test(target) ? 'unset'
        : unquoteToken(target) ?? 'self',
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

/** A devcb array's size, which MAME often names: `devcb_read8::array<PORT_COUNT>`. */
function callbackSlots(valueType: string, constants: Record<string, number> = {}): number {
  const bound = /::array<([^<>]+)>/.exec(valueType)?.[1];
  if (bound === undefined) return 1;
  const size = evalExpr(bound.trim(), constants);
  if (size === null || size === undefined || !Number.isInteger(size)) {
    throw new Error(`devcb array size ${bound} in ${valueType} does not evaluate`);
  }
  return size;
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
  /** The parameters as declared, types included. */
  declared: string[];
  initializers: { name: string; args: string[] }[];
  body: string;
}

/**
 * What a constructor chain sets that is not a number, from its arguments as
 * text: the 6805 hands its base a brace list for a `configuration_params`
 * parameter, and its internal map as `address_map_constructor(FUNC(...), this)`.
 */
export interface ConstructorChainValues {
  /** A struct member the chain builds from a brace list, as its fields' values. */
  structs: Record<string, Record<string, unknown>>;
  /** An `address_space_config` member, as its initializer configures it. */
  spaceConfigs: Record<string, { name: string; dataBits: number; addressBits: number; map?: string; endianness?: 'big' | 'little'; addressShift?: number }>;
  /**
   * A member the chain points at a file-scope table, as the table's entries:
   * the 6800's `m_insn(insn)` and `m_cycles(cycles)`, handed `m6803_insn`
   * and `cycles_6803` by the 6803's constructor two levels down.
   */
  tables?: Record<string, (string | number)[]>;
}

/**
 * The object an initializer takes the address of, `&name`, deciding a
 * conditional between two of them by its constant condition. Undefined for
 * anything else.
 */
function addressedObject(text: string, values: Record<string, number>): string | undefined {
  const trimmed = text.trim().replace(/^\((.*)\)$/s, '$1').trim();
  const direct = /^&\s*(\w+)$/.exec(trimmed)?.[1];
  if (direct) return direct;
  const question = trimmed.indexOf('?');
  const colon = trimmed.lastIndexOf(':');
  if (question < 0 || colon < question) return undefined;
  const condition = constantValue(trimmed.slice(0, question), values);
  if (condition === undefined || condition === null) return undefined;
  return addressedObject(condition ? trimmed.slice(question + 1, colon) : trimmed.slice(colon + 1), values);
}

export function constructorInitialValues(
  concreteClass: string,
  source: string,
  constants: Record<string, number> = {},
  /**
   * Members a constructor initialises with a string literal, filled in when
   * given: generic_slot_device's `m_default_card("rom")`, the card a
   * cartridge loads into.
   */
  strings?: Record<string, string>,
  /**
   * Members a constructor points at a named file-scope object, filled in when
   * given: the AY-3-8910's `m_par(... ? &ay8910_param : &ym2149_param)`, its
   * choice made with the constructor's own arguments.
   */
  pointers?: Record<string, string>,
  /** Each constructor body that runs, base first, with its arguments' values. */
  bodies?: { body: string; env: Record<string, number>; className: string }[],
  /**
   * The member a name means in one class's own code, where a derived class
   * declares a member of a base's name: the Irem G-101's `const u8 m_prg_mask`
   * hides the cartridge interface's, and its `m_prg_mask(prg_mask)` set the
   * base's instead, leaving the G-101's own mask 0 (#184).
   */
  memberName: (className: string, name: string) => string = (_className, name) => name,
  chain?: ConstructorChainValues,
): Record<string, number> {
  const constructors = new Map<string, Constructor[]>();
  // Out of line (`ay8910_device::ay8910_device(`) and inline in the class's
  // own body: DAC_GENERATOR's `dac_8bit_r2r_device(...) : dac_byte_device_base(...) {}`.
  const heads: { index: number; className: string }[] = [...source.matchAll(/\b(\w+)::\1\s*\(/g)]
    .map(found => ({ index: found.index!, className: found[1]! }));
  for (const declaration of source.matchAll(/\b(?:class|struct)\s+(\w+)\b[^;{()]*\{/g)) {
    const className = declaration[1]!;
    const open = declaration.index! + declaration[0].length - 1;
    const close = matchingBrace(source, open);
    if (close < 0) continue;
    const body = source.slice(open, close);
    for (const found of body.matchAll(new RegExp(`(?<![\\w~:.>])${className}\\s*\\(`, 'g'))) {
      // Not a delegating call in another constructor's initializer list,
      // which follows its `:` or a `,`; an access specifier's `public:` is
      // where a constructor stands.
      const before = body.slice(0, found.index!).trimEnd();
      if (before.endsWith(',') || (before.endsWith(':') && !/\b(?:public|protected|private)\s*:$/.test(before))) continue;
      heads.push({ index: open + found.index!, className });
    }
  }
  heads.sort((left, right) => left.index - right.index);
  for (const head of heads) {
    const match = [source.slice(head.index), head.className] as unknown as RegExpExecArray;
    match.index = head.index;
    const open = source.indexOf('(', head.index);
    const close = matchingPair(source, open, '(', ')');
    if (close < 0) continue;
    const brace = constructorBodyBrace(source, close + 1);
    if (brace < 0) continue;
    const braceEnd = matchingBrace(source, brace);
    if (braceEnd < 0) continue;
    const between = source.slice(close + 1, brace).trim();
    const initializerSource = (between.startsWith(':') ? between.slice(1) : '')
      .replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '');
    const declared = splitMameArgs(source.slice(open + 1, close));
    const constructor: Constructor = {
      className: match[1]!,
      parameters: declared.map(parameterName),
      declared,
      initializers: splitMameArgs(initializerSource).flatMap(initializer => {
        const parsed = /^(\w+)\s*\(([\s\S]*)\)$/.exec(initializer.trim());
        return parsed ? [{ name: parsed[1]!, args: splitMameArgs(parsed[2]!) }] : [];
      }),
      body: source.slice(brace + 1, braceEnd),
    };
    const overloads = constructors.get(match[1]!) ?? [];
    overloads.push(constructor);
    constructors.set(match[1]!, overloads);
  }
  const result: Record<string, number> = {};
  const activeConstructors = new Set<Constructor>();
  const definesFunction = (name: string) =>
    new RegExp(`(?:^|[\\s*&])${name}\\s*\\([^;{}]*\\)\\s*(?:const\\s*)?(?:noexcept\\s*)?\\{`, 'm').test(source);
  // Structs the sources declare, which a parameter can be one of, and each
  // one's inline constructors: `configuration_params(ops, cycles, ...) : m_ops(ops), ...`.
  const structNames = new Set([...source.matchAll(/\bstruct\s+(\w+)\b[^;{()]*\{/g)].map(found => found[1]!));
  const structOf = (declaration: string) => [...structNames].find(name => new RegExp(`\\b${name}\\b`).test(declaration));
  const isBrace = (text: string | undefined) => text !== undefined && /^\(?\s*\{[\s\S]*\}\s*\)?$/.test(text.trim());
  // A table a class defines at file scope (`m6805_base_device::s_hmos_s_ops = {...}`),
  // its entries numbers or, once its member pointers are lowered, method names.
  const tables = new Map<string, (string | number)[]>();
  for (const table of source.matchAll(/\b\w+::(\w+)\s*(?:\[[^\]]*\]\s*)*=\s*\{([^{};]*(?:\{[^{}]*\}[^{};]*)*)\}\s*;/g)) {
    // Both comment forms out: mcs48.cpp labels each opcode row `// 00`.
    const entries = splitMameArgs(table[2]!.replace(/\/\*[\s\S]*?\*\/|\/\/[^\r\n]*/g, ''))
      .map(entry => entry.trim().replace(/^\((.*)\)$/s, '$1').trim()).filter(Boolean)
      .map(entry => /^"(\w+)"$/.exec(entry)?.[1] ?? constantValue(entry, constants));
    if (entries.length && entries.every(entry => entry !== undefined)) tables.set(table[1]!, entries as (string | number)[]);
  }
  /** A brace list, as the fields the struct's own constructor of that arity sets. */
  const structValue = (struct: string, brace: string, env: Record<string, number>): Record<string, unknown> | undefined => {
    const values = splitMameArgs(brace.trim().replace(/^\((.*)\)$/s, '$1').trim().slice(1, -1)).map(value => value.trim());
    const inline = [...source.matchAll(new RegExp(`\\b${struct}\\s*\\(([^)]*)\\)\\s*:([\\s\\S]*?)\\{\\s*\\}`, 'g'))]
      .map(found => ({ parameters: splitMameArgs(found[1]!).map(parameterName), initializers: found[2]! }))
      .find(candidate => candidate.parameters.length === values.length);
    if (!inline) return undefined;
    const bound = Object.fromEntries(inline.parameters.map((name, index) => [name, values[index]!]));
    const fields: Record<string, unknown> = {};
    for (const field of inline.initializers.matchAll(/(m_\w+)\s*\(([^()]*(?:\([^()]*\)[^()]*)*)\)/g)) {
      const text = field[2]!.trim().replace(/\b[A-Za-z_]\w*\b/g, name => bound[name] !== undefined ? `(${bound[name]})` : name);
      // A table is chosen by name: `addr_width > 13 ? s_hmos_b_ops : s_hmos_s_ops`.
      const picked = chooseOperand(text, expression => constantValue(expression, { ...constants, ...env }));
      const table = picked !== undefined ? tables.get(picked) : undefined;
      const value = table ?? constantValue(picked ?? text, { ...constants, ...env });
      if (value === undefined) return undefined;
      fields[field[1]!] = value;
    }
    return fields;
  };
  // Each parameter's default, from a class's declaration of a constructor of
  // that many parameters: undefined where it has none.
  const defaultsFor = (className: string, arity: number): (number | undefined)[] | undefined => {
    for (const declaration of source.matchAll(new RegExp(`(?<![:~\\w])${className}\\s*\\(([^;{}]*)\\)\\s*;`, 'g'))) {
      const parameters = splitMameArgs(declaration[1]!);
      if (parameters.length !== arity) continue;
      return parameters.map(parameter => {
        const value = /=\s*([^=]+)$/.exec(parameter)?.[1];
        return value === undefined ? undefined : constantValue(value.trim(), constants);
      });
    }
    return undefined;
  };
  const visit = (className: string, values: number[] = [], texts: (string | undefined)[] = []): void => {
    // A constructor delegating to another of its class's (a template overload
    // handing on `(mconfig, tag, owner, 0)`) never reaches itself again.
    const overloads = (constructors.get(className) ?? []).filter(candidate => !activeConstructors.has(candidate));
    // Chosen as C++ chooses: by count, then by type -- only a brace list
    // binds a struct parameter (the 6805's two seven-argument constructors).
    // A struct parameter takes text (a brace list, or a struct passed on); a
    // scalar one never takes a brace list.
    const fits = (declaration: string, text: string | undefined) =>
      structOf(declaration) ? text !== undefined : !isBrace(text);
    const sameArity = overloads.filter(candidate => values.length > 0 && candidate.parameters.length === values.length);
    // Or one taking more, whose declaration in the class gives the rest
    // defaults: the AY-3-8910 delegates eight arguments to a constructor whose
    // ninth, `int feature = 0`, only the header defaults.
    const defaulted = values.length > 0
      ? overloads.find(candidate => candidate.parameters.length > values.length &&
        defaultsFor(className, candidate.parameters.length)?.slice(values.length).every(value => value !== undefined))
      : undefined;
    const constructor = sameArity.find(candidate =>
      candidate.declared.every((declaration, index) => fits(declaration, texts[index]))) ??
      sameArity[0] ?? defaulted ??
      [...overloads].sort((left, right) =>
        left.parameters.length - right.parameters.length)[0];
    if (constructor && constructor === defaulted) {
      const defaults = defaultsFor(className, constructor.parameters.length)!;
      values = [...values, ...defaults.slice(values.length).map(value => value ?? 0)];
    }
    if (!constructor) return;
    if (activeConstructors.has(constructor)) return;
    activeConstructors.add(constructor);
    // A parameter that arrived as text is that text, not a number.
    const env = Object.fromEntries(constructor.parameters.flatMap((parameter, index) =>
      texts[index] === undefined ? [[parameter, values[index] ?? 0]] : []));
    const textEnv = Object.fromEntries(constructor.parameters.flatMap((parameter, index) =>
      texts[index] !== undefined ? [[parameter, texts[index]!]] : []));
    const substitute = (text: string) =>
      text.replace(/\b[A-Za-z_]\w*\b/g, name => textEnv[name] ?? (env[name] !== undefined ? String(env[name]) : name));
    const structArguments = Object.fromEntries(constructor.parameters.flatMap((parameter, index) => {
      const struct = structOf(constructor.declared[index]!);
      const value = struct && isBrace(texts[index]) ? structValue(struct, texts[index]!, env) : undefined;
      return value ? [[parameter, value]] : [];
    }));
    // `params.m_addr_width`: a field of a struct argument.
    const fieldsOf = (text: string) => text.replace(/\b(\w+)\s*\.\s*(m_\w+)\b/g, (whole, name: string, field: string) => {
      const value = structArguments[name]?.[field];
      return typeof value === 'number' ? String(value) : whole;
    });
    for (const initializer of constructor.initializers) {
      const args = initializer.args.map(arg =>
        constantValue(fieldsOf(arg), { ...constants, ...env }) ?? 0);
      // An argument with no number travels as its text: a brace list, a
      // struct passed on, a map constructor.
      const argTexts = initializer.args.map(arg => {
        const text = substitute(arg.trim());
        return constantValue(fieldsOf(arg), { ...constants, ...env }) === undefined ? text : undefined;
      });
      if (constructors.has(initializer.name)) visit(initializer.name, args, argTexts);
      else if (initializer.name.startsWith('m_') && args.length === 1) {
        const member = memberName(className, initializer.name);
        // A function handed down the constructors as a value is its name, as
        // CALL_METHOD dispatches by: dac_device_base's `m_mapper(mapper)`,
        // which DAC_GENERATOR passes `dac_mapper_unsigned`.
        const passed = argTexts[0] === undefined ? '' : substitute(initializer.args[0]!.trim());
        const text = /^"((?:[^"\\]|\\.)*)"$/.exec(initializer.args[0]!.trim())?.[1] ??
          (/^[A-Za-z_]\w*$/.test(passed) && !/^(?:nullptr|NULL|true|false|this)$/.test(passed) && definesFunction(passed) ? passed : undefined);
        const target = pointers && addressedObject(initializer.args[0]!, { ...constants, ...env });
        const struct = structArguments[initializer.args[0]!.trim()];
        const table = tables.get(substitute(initializer.args[0]!.trim()));
        if (table && chain) (chain.tables ??= {})[member] = table;
        if (struct && chain) chain.structs[member] = struct;
        else if (text !== undefined && strings) strings[member] = text;
        else if (target) pointers[member] = target;
        else result[member] = args[0]!;
      } else if (chain && initializer.name.startsWith('m_') && args.length >= 4) {
        // address_space_config(name, endianness, data width, address width[, shift, map])
        const name = /^"([^"]*)"$/.exec(initializer.args[0]!.trim())?.[1];
        if (name === undefined || !/^ENDIANNESS_\w+$/.test(initializer.args[1]!.trim())) continue;
        const map = selectedMapConstructor(argTexts[5] ?? initializer.args[5] ?? '', text => constantValue(text, { ...constants, ...env }));
        const order = /^ENDIANNESS_(BIG|LITTLE)$/.exec(initializer.args[1]!.trim())?.[1];
        chain.spaceConfigs[memberName(className, initializer.name)] = {
          name, dataBits: args[2]!, addressBits: args[3]!, ...(map ? { map } : {}),
          ...(order ? { endianness: order === 'BIG' ? 'big' as const : 'little' as const } : {}),
          ...(args.length > 4 && args[4] ? { addressShift: args[4] } : {}),
        };
      }
    }
    bodies?.push({ body: constructor.body, env, className });
    for (const assignment of constructor.body.matchAll(/\b(m_\w+)\s*=\s*([^;]+);/g)) {
      const value = constantValue(assignment[2]!, { ...constants, ...env });
      if (value !== undefined && Number.isFinite(value)) result[memberName(className, assignment[1]!)] = value;
    }
    activeConstructors.delete(constructor);
  };
  visit(concreteClass);
  return result;
}

/**
 * The map an `address_space_config` is built with. MAME may choose it by the
 * space's width: the MB88's `(program_width == 9) ? address_map_constructor(
 * FUNC(mb88_cpu_device::program_9bit), this) : (program_width == 10) ? ... :
 * address_map_constructor(FUNC(mb88_cpu_device::program_11bit), this)`. Each
 * arm's condition is evaluated in turn and the last arm is the else.
 */
function selectedMapConstructor(
  text: string,
  evaluate: (expression: string) => number | undefined,
): string | undefined {
  const arm = /address_map_constructor\s*\(\s*FUNC\s*\(\s*[\w:]*::(\w+)\s*\)\s*,\s*\w+\s*\)/g;
  let rest = text.trim();
  for (;;) {
    const question = rest.indexOf('?');
    if (question < 0) return arm.exec(rest)?.[1];
    const condition = evaluate(rest.slice(0, question).trim());
    arm.lastIndex = question;
    const chosen = arm.exec(rest);
    if (!chosen || condition === undefined) return undefined;
    if (condition) return chosen[1];
    const colon = rest.indexOf(':', arm.lastIndex);
    if (colon < 0) return undefined;
    rest = rest.slice(colon + 1).trim();
    arm.lastIndex = 0;
  }
}

/**
 * Where a constructor's body opens, from just past its parameter list. Not
 * the first brace: an initializer can take a brace list as an argument (the
 * 6805's `m6805_hmos_device(..., { addr_width > 13 ? ... }, ram_size)`) or be
 * one (`m_port_open_drain{ false, false, false, false }`), and either read as
 * the body hid every initializer after it -- m_ram_size among them.
 */
function constructorBodyBrace(source: string, from: number): number {
  let depth = 0;
  for (let index = from; index < source.length; index++) {
    const char = source[index];
    if (char === '(') depth++;
    else if (char === ')') depth--;
    else if (char === ';') return -1;
    else if (char === '{') {
      if (depth === 0 && !/\w/.test(source.slice(from, index).trimEnd().slice(-1))) return index;
      const end = matchingBrace(source, index);
      if (end < 0) return -1;
      index = end;
    }
  }
  return -1;
}

/**
 * The operand a conditional picks, when its condition evaluates: `c ? a : b`
 * is `a` or `b`. Undefined when the text is no conditional.
 */
function chooseOperand(text: string, evaluate: (expression: string) => number | undefined): string | undefined {
  let value = text.trim();
  while (value.startsWith('(') && matchingPair(value, 0, '(', ')') === value.length - 1) value = value.slice(1, -1).trim();
  let depth = 0;
  let question = -1;
  for (let index = 0; index < value.length; index++) {
    const char = value[index];
    if (char === '(') depth++;
    else if (char === ')') depth--;
    else if (depth === 0 && char === '?' && question < 0) question = index;
    else if (depth === 0 && char === ':' && question >= 0 && value[index + 1] !== ':' && value[index - 1] !== ':') {
      const condition = evaluate(value.slice(0, question));
      if (condition === undefined) return undefined;
      const picked = (condition ? value.slice(question + 1, index) : value.slice(index + 1)).trim();
      return picked.replace(/^\((.*)\)$/s, '$1').trim();
    }
  }
  return /^\w+$/.test(value) ? value : undefined;
}

/**
 * Members a constructor initialises with a file-scope `static const` or
 * `constexpr` array (`m_levels(default_levels)`), with that array's values.
 */
export function constructorTableValues(
  concreteClass: string,
  source: string,
  constants: Record<string, number> = {},
): Record<string, number[]> {
  const tables = new Map<string, number[]>();
  for (const match of source.matchAll(
    /\bstatic\s+(?:(?:const|constexpr|inline)\s+)+[\w:]+\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]*)\}\s*;/g,
  )) {
    const values = splitMameArgs(match[2]!).map(value => value.trim()).filter(Boolean)
      .map(value => constantValue(value, constants) ?? Number(value.replace(/f$/i, '')));
    if (values.length && values.every(value => Number.isFinite(value))) tables.set(match[1]!, values);
  }
  const result: Record<string, number[]> = {};
  if (!tables.size) return result;
  const constructor = new RegExp(`\\b${concreteClass}::${concreteClass}\\s*\\(`).exec(source);
  if (!constructor) return result;
  const open = source.indexOf('(', constructor.index);
  const close = matchingPair(source, open, '(', ')');
  const brace = close < 0 ? -1 : source.indexOf('{', close + 1);
  if (brace < 0) return result;
  for (const initializer of source.slice(close + 1, brace).matchAll(/\b(m_\w+)\s*\(\s*(\w+)\s*\)/g)) {
    const table = tables.get(initializer[2]!);
    if (table) result[initializer[1]!] = table;
  }
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
export function coreLineStates(mameSrc: string): Record<string, number> {
  const header = join(mameSrc, 'src/emu/diexec.h');
  if (!existsSync(header)) return {};
  // Both of diexec.h's enums: line_state, and the input lines a core's header
  // names its own by (`#define I8085_TRAP_LINE INPUT_LINE_NMI`), the three
  // scheduler-level lines numbered as the host delivers them.
  const source = readFileSync(header, 'utf8');
  const text = source.slice(0, source.indexOf('\nclass '));
  const lines: Record<string, number> = { ...parseEnumConstants(text), ...HOST_INPUT_LINES };
  return lines.CLEAR_LINE === 0 && lines.ASSERT_LINE === 1 && lines.INPUT_LINE_IRQ0 === 0 ? lines : {};
}

/**
 * The OSD layer's constant defines (osdcore.h) a device's source names, read
 * from MAME: DISCRETE allocates its task queue with
 * `osd_work_queue_alloc(WORK_QUEUE_FLAG_MULTI | WORK_QUEUE_FLAG_HIGH_FREQ)`.
 */
function coreOsdDefines(mameSrc: string, sources: readonly { source: string }[]): Record<string, number> {
  const header = join(mameSrc, 'src/osd/osdcore.h');
  if (!existsSync(header)) return {};
  const named = new Set(sources.flatMap(({ source }) => stripCppComments(source).match(/\b[A-Z_][A-Z0-9_]*\b/g) ?? []));
  const defines: Record<string, number> = {};
  for (const match of stripCppComments(readFileSync(header, 'utf8')).matchAll(/^\s*#define\s+([A-Z_][A-Z0-9_]*)\s+([^\r\n]+)$/gm)) {
    if (!named.has(match[1]!)) continue;
    const value = evalExpr(match[2]!.trim(), defines);
    if (value !== null && Number.isFinite(value)) defines[match[1]!] = value;
  }
  return defines;
}

const CORE_CONSTRUCTORS = new Map<string, Map<string, Set<number>>>();

/**
 * The constructor arities of the core library's classes (src/lib/util and
 * src/emu headers), which every device sees: `rectangle` takes 0 or 4.
 */
function coreConstructorArities(mameSrc: string): Map<string, Set<number>> {
  let core = CORE_CONSTRUCTORS.get(mameSrc);
  if (core) return core;
  core = new Map();
  for (const directory of ['src/lib/util', 'src/emu'].map(path => join(mameSrc, path))) {
    for (const file of existsSync(directory) ? readdirSync(directory).filter(name => name.endsWith('.h')).sort() : []) {
      const header = stripCppComments(readFileSync(join(directory, file), 'utf8'));
      for (const match of header.matchAll(/^class\s+(\w+)\b[^;{]*\{/gm)) {
        const name = match[1]!;
        if (core.has(name)) continue;
        const open = header.indexOf('{', match.index);
        const close = matchingBrace(header, open);
        if (close < 0) continue;
        const body = header.slice(open + 1, close);
        const arities = new Set<number>();
        for (const constructor of body.matchAll(new RegExp(`(?:^|[\\s;{}])(?:constexpr\\s+|explicit\\s+)*${name}\\s*\\(([^()]*)\\)\\s*(?::|\\{|noexcept|=)`, 'g'))) {
          const parameters = splitMameArgs(constructor[1]!).map(parameter => parameter.trim()).filter(parameter => parameter && parameter !== 'void');
          arities.add(parameters.length);
        }
        if (arities.size) core.set(name, arities);
      }
    }
  }
  CORE_CONSTRUCTORS.set(mameSrc, core);
  return core;
}

const CORE_STRUCTS = new Map<string, Map<string, GeneratedStructField[]>>();

/**
 * The file-scope structs of the emulator core's headers, sized by each
 * header's own constants (`u32 planeoffset[MAX_GFX_PLANES]`). A device sees
 * all of `src/emu` through emu.h without including any of it.
 */
function coreStructs(mameSrc: string): Map<string, GeneratedStructField[]> {
  let core = CORE_STRUCTS.get(mameSrc);
  if (core) return core;
  core = new Map();
  const directory = join(mameSrc, 'src/emu');
  for (const file of existsSync(directory) ? readdirSync(directory).filter(name => name.endsWith('.h')).sort() : []) {
    const header = stripCppComments(readFileSync(join(directory, file), 'utf8'));
    const constants: Record<string, number> = {};
    for (const match of header.matchAll(/^\s*(?:static\s+)?constexpr\s+[\w:]+\s+(\w+)\s*=\s*([^;]+);/gm)) {
      const value = evalExpr(match[2]!, constants);
      if (value !== null && Number.isFinite(value)) constants[match[1]!] = value;
    }
    for (const declaration of structBlocks(header)) {
      // `struct { ... } w;` names a member, not a type.
      if (!declaration.name || declaration.name === declaration.declarator || core.has(declaration.name)) continue;
      const fields = structFieldList(declaration.body, constants, declaration.name);
      if (fields.length) core.set(declaration.name, fields);
    }
  }
  CORE_STRUCTS.set(mameSrc, core);
  return core;
}

const CORE_ENUMERATORS = new Map<string, Record<string, number>>();

/**
 * The enumerators of the emulator core's unscoped enums that the device's
 * source names. Every device sees all of `src/emu` through emu.h without
 * including any of it, so these are never in its own sources: the K051960
 * builds its sprite draw-mode table from drawgfx.h's `DRAWMODE_SOURCE`,
 * `DRAWMODE_SHADOW` and `DRAWMODE_SHADOW_PRI`. The device's own constants
 * are layered over these.
 */
function coreEnumerators(
  mameSrc: string,
  sources: readonly { source: string }[],
): Record<string, number> {
  let core = CORE_ENUMERATORS.get(mameSrc);
  if (!core) {
    core = {};
    const directory = join(mameSrc, 'src/emu');
    for (const file of existsSync(directory) ? readdirSync(directory).filter(name => name.endsWith('.h')).sort() : []) {
      const header = stripCppComments(readFileSync(join(directory, file), 'utf8'));
      // File scope only: an enum inside a class is named through it
      // (device.h's feature flags, `ROM` and `SOUND` among them).
      const depths: number[] = [];
      for (let index = 0, depth = 0; index < header.length; index++) {
        depths.push(depth);
        if (header[index] === '{') depth++;
        else if (header[index] === '}') depth--;
      }
      // `enum class` is scoped: its enumerators are only ever named qualified.
      for (const match of header.matchAll(/\benum\s+(?!class\b|struct\b)(?:\w+\s*)?(?::\s*[\w:]+\s*)?\{([^{}]*)\}/g)) {
        if (depths[match.index] !== 0) continue;
        let next = 0;
        for (const entry of match[1]!.split(',')) {
          const parsed = /^\s*([A-Za-z_]\w*)\s*(?:=\s*([\s\S]+?))?\s*$/.exec(entry);
          if (!parsed) continue;
          const value = parsed[2] === undefined ? next : evalExpr(parsed[2], core);
          if (value === null || !Number.isInteger(value)) break;
          core[parsed[1]!] = value;
          next = value + 1;
        }
      }
    }
    CORE_ENUMERATORS.set(mameSrc, core);
  }
  // Named in code: a comment's "gfx ROM" is not a use.
  const named = new Set(sources.flatMap(({ source }) =>
    stripCppComments(source).replace(/"(?:[^"\\\n]|\\.)*"/g, '""').match(/\b[A-Za-z_]\w*\b/g) ?? []));
  // The runtime numbers some of them its own way, and its numbering is what
  // every processor answers: diexec.h's INPUT_LINE_NMI is MAX_INPUT_LINES - 3,
  // the generated CPUs' is -1.
  return Object.fromEntries(Object.entries(core).filter(([name]) =>
    named.has(name) && DEFAULT_CONSTANTS[name] === undefined));
}

/**
 * The function-like macros emumem.h gives every device, read from it rather
 * than restated: Musashi checks `WORD_ALIGNED(address)` on every long read,
 * and a device's sources reach emumem.h through emu.h, which they never name.
 * Pure expressions, so substituting them is exactly what the preprocessor
 * does (COMBINE_DATA stays the IR's own intrinsic).
 */
function coreFunctionMacros(mameSrc: string): FunctionMacro[] {
  const header = join(mameSrc, 'src/emu/emumem.h');
  if (!existsSync(header)) return [];
  return collectFunctionMacros(readFileSync(header, 'utf8'), { expressions: true });
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
  // A namespace-scope alias of a template instance names that instance's
  // constants: ymfm's `using opl_registers = opl_registers_base<1>;`, so a
  // YM3526's `RegisterType::OUTPUTS` is opl_registers_base<1>'s
  // `IsOpl3Plus ? 4 : 1`. Column 0 only: a class's own `using fm_engine = ...`
  // is that class's, and two chips spell it differently.
  const namespaceAliases = new Map<string, { target: string; args: string[] }>();
  for (const { source } of sources) {
    for (const alias of stripCppComments(source).matchAll(/^using\s+(\w+)\s*=\s*(\w+)\s*<([^;<>]*)>\s*;/gm)) {
      namespaceAliases.set(alias[1]!, { target: alias[2]!, args: splitMameArgs(alias[3]!).map(argument => argument.trim()) });
    }
  }
  // A class the sources declare but the device does not derive from answers
  // from its own body: a format names `floppy_image::FF_525` and
  // flopimg.h is one of its own sources.
  // Repeated until nothing more resolves: a class constant may be spelled in
  // another class's, which a later owner supplies. ymfm's ym2203 declares
  // `SSG_OUTPUTS = ssg_engine::OUTPUTS`; read before ssg_engine, it fell back
  // to the leaf name, the YM2610's `SSG_OUTPUTS = 1`, and every YM2203 rotated
  // its outputs by one -- FM on an SSG route at twice its gain.
  for (let progress = true; progress && wanted.size;) {
  progress = false;
  for (const [owner, names] of [...wanted]) {
    const alias = classes.has(owner) ? undefined : namespaceAliases.get(owner);
    const root = alias?.target ?? owner;
    const declaration = classes.get(root) as { body?: string; templateParameters?: string[] } | undefined;
    if (!declaration?.body) continue;
    const parameters = alias ? declaration.templateParameters ?? [] : [];
    const bound = (body: string): string => parameters.reduce((text, parameter, index) =>
      alias!.args[index] === undefined ? text : text.replace(new RegExp(`\\b${parameter}\\b`, 'g'), alias!.args[index]!), body);
    // With what the class inherits: OPLL's registers take `EG_HAS_REVERB`
    // from `fm_registers_base`.
    let values: Record<string, number> = { ...known, ...found };
    for (const className of classHierarchy(root, classes as Map<string, MameClass>)) {
      values = numericConstants(bound(stripCppComments((classes.get(className) as { body?: string } | undefined)?.body ?? '')), values);
    }
    for (const name of [...names]) {
      if (values[name] === undefined) continue;
      found[`${owner}::${name}`] = values[name]!;
      names.delete(name);
      progress = true;
    }
    if (!names.size) wanted.delete(owner);
  }
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
  // The emulator core is on every device's include path through emu.h, which
  // the walk above never follows: discrete.cpp sizes its task buffers by
  // `sound_manager::STREAMS_UPDATE_FREQUENCY`, which sound.h declares.
  const core = join(mameSrc, 'src/emu');
  for (const file of existsSync(core) ? readdirSync(core).filter(name => name.endsWith('.h')).sort() : []) {
    const text = readFileSync(join(core, file), 'utf8');
    if ([...wanted.keys()].some(owner => new RegExp(`\\bclass\\s+${owner}\\b`).test(text))) headers.add(join(core, file));
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

const RESCAP_FUNCTIONS = new Map<string, ReturnType<typeof parseConstexprFunctions>>();

/** rescap.h's RES_K, CAP_U and friends, and the device's own one-expression constexpr helpers. */
function constexprHelpers(
  mameSrc: string,
  sources: readonly { source: string }[],
): ReturnType<typeof parseConstexprFunctions> {
  if (!RESCAP_FUNCTIONS.has(mameSrc)) {
    const path = join(mameSrc, 'src/devices/machine/rescap.h');
    RESCAP_FUNCTIONS.set(mameSrc, existsSync(path) ? parseConstexprFunctions(readFileSync(path, 'utf8')) : {});
  }
  return Object.assign({}, RESCAP_FUNCTIONS.get(mameSrc), ...sources.map(({ source }) => parseConstexprFunctions(source)));
}

export function numericConstants(
  source: string,
  /** Constants already known, which the source's own values may be spelled in. */
  seed: Record<string, number> = {},
  /**
   * One-expression constexpr helpers a value may call: polepos.cpp's
   * `static const double r_filt_total = 1.0 / (1.0/RES_K(4.7) + ...)`, which
   * unexpanded read as 0 and scaled the engine sound to nothing.
   */
  functions: Parameters<typeof expandConstexprCalls>[1] = {},
): Record<string, number> {
  const expressions = new Map<string, string>();
  // The define's whitespace is horizontal only (as parseDefines has it): with
  // `\s`, an include guard's bare `#define MAME_CPU_I8085_I8085_H` took the
  // next line as its value, and i8085.h's I8085_INTR_LINE was never defined.
  // The value runs to the end of the line less any comment. Stopping at the
  // first `/` instead cut every dividing macro in half -- VLM5030's
  // `#define IP_SIZE_NORMAL (160/FR_SIZE)` read as `(160` -- and its speed
  // table then gave every frame zero samples.
  for (const match of source.matchAll(/^[ \t]*#define[ \t]+(\w+)[ \t]+([^\r\n]+)/gmi)) {
    const value = match[2]!.replace(/\/\/.*$|\/\*.*?\*\//g, '').trim();
    if (value) expressions.set(match[1]!, value);
  }
  // The type may be qualified: the AY-3-8910 scales every level by
  // `static constexpr sound_stream::sample_t MAX_OUTPUT = 1.0;`, and unread it
  // was 0, so every level it built was 0.
  for (const match of source.matchAll(
    /\b(?:static\s+)?constexpr\s+(?:[\w:]+\s+)+(\w+)\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  // Direct initialisation: galaxian.h's
  // `static constexpr XTAL GALAXIAN_MASTER_CLOCK(18.432_MHz_XTAL);`.
  for (const match of source.matchAll(
    /\b(?:static\s+)?constexpr\s+(?:[\w:]+\s+)+(\w+)\s*\(([^;{}]+)\)\s*;/g,
  )) {
    if (!expressions.has(match[1]!)) expressions.set(match[1]!, match[2]!.trim());
  }
  // A pre-C++17 in-class constant is spelled `static const`, not `constexpr`.
  // MAME's Game Boy APU declares its frame-sequencer period that way, and
  // unresolved it made every `cycles / FRAME_CYCLES` in the sequencer
  // meaningless. `static` is required so a local `const int` inside a method
  // body is never hoisted into the device's shared scope.
  for (const match of source.matchAll(
    // `const` may follow the type too: the 6805's `static unsigned const PORT_COUNT = 4;`.
    /\bstatic\s+(?:(?!const\b)[\w:]+\s+)*const\s+(?:[\w:]+\s+)*?(\w+)\s*=\s*([^;]+);/g,
  )) {
    expressions.set(match[1]!, match[2]!.trim());
  }
  // A namespace-scope `const` needs no `static`: z80daisy.h's
  // `const uint8_t Z80_DAISY_INT = 0x01;`. Unread, every daisy device's
  // interrupt request was 0 and the Z80 CTC could never raise one. A
  // declaration at column 0 is at file scope; a method's locals never are.
  for (const match of source.matchAll(
    /^const\s+(?:[\w:]+\s+)+?(\w+)\s*=\s*([^;]+);/gm,
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
  // What the source declares shadows what it was seeded with, as an inner
  // scope does: OPLL's registers declare `REGISTERS = 0x40` over the 0x100
  // an OPL3 header left in the seed.
  const constants: Record<string, number> = { ...seed };
  for (const name of expressions.keys()) delete constants[name];
  // Until a pass resolves nothing more: the rest name what this source never
  // defines, and another pass over thousands of them changes nothing.
  for (let pass = 0, resolved = 1; pass <= expressions.size && resolved; pass++) {
    resolved = 0;
    for (const [name, expression] of expressions) {
      if (constants[name] !== undefined) continue;
      // A leaf inside a qualified name (`opll_registers::CHANNELS`) is that
      // class's, not this scope's; evalExpr answers the qualified spelling.
      const substituted = expression.replace(
        /(?<![\w:])[A-Za-z_]\w*(?![\w:])/g,
        token => token === 'true' ? '1' : token === 'false' ? '0'
          : constants[token] !== undefined ? String(constants[token]) : token,
      );
      // evalExpr substitutes every constant it is given, one by one: with
      // discrete.h's 2,700 node enumerators that is quadratic, so an
      // expression with no names left is evaluated alone.
      const expanded = /\w\s*\(/.test(substituted) ? expandConstexprCalls(substituted, functions) : substituted;
      const value = evalExpr(expanded, /[A-Za-z_]/.test(expanded) ? constants : {});
      if (value !== null && Number.isFinite(value)) {
        constants[name] = value;
        resolved++;
      }
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
  /**
   * A table of pointers to other tables, by row: whether each row points at
   * one, which is what the table indexed once answers (`if (!tunes[n])`).
   */
  rows?: string[];
}

function constantTables(source: string): Record<string, ConstantTable> {
  const tables: Record<string, ConstantTable> = {};
  // Or a class's own static, defined out of the class as MAME defines one:
  // k053260.cpp's `const int k053260_device::pan_mul[8][2] = { ... };`.
  for (const match of source.matchAll(
    // Its bounds may be named (Musashi's `m68ki_exception_cycle_table
    // [NUM_CPU_TYPES][256]`): then they are what the rows give.
    /(?:\bstatic\s+const\s+[\w:]+\s+|(?:^|[;}])\s*const\s+[\w:]+\s+(\w+)::)(\w+)\s*\[\s*(\w+)\s*\]\s*\[\s*(\w+)\s*\]\s*=\s*\{([\s\S]*?\}),?\s*\}\s*;/gm,
  )) {
    const rowValues = [...match[5]!.matchAll(/\{([^{}]*)\}/g)]
      .map(row => splitMameArgs(row[1]!.replace(/\/\/[^\n]*|\/\*[\s\S]*?\*\//g, '')).map(value => value.trim()).filter(Boolean));
    const columns = /^\d+$/.test(match[4]!) ? Number(match[4]) : rowValues[0]?.length ?? 0;
    const rows = /^\d+$/.test(match[3]!) ? Number(match[3]) : rowValues.length;
    const values = rowValues.flat();
    if (!columns || values.length !== rows * columns) continue;
    tables[match[2]!] = { values, columns };
    if (match[1]) tables[`${match[1]}::${match[2]}`] = { values, columns };
  }
  for (const match of source.matchAll(
    // The element type may be qualified: okim6295.cpp's
    // `const sound_stream::sample_t okim6295_device::s_volume_table[16]`, which
    // missed left every voice's volume undefined and the OKI rendering NaN.
    // `static constexpr double out_pos_gain[] = {...}` (sn76477.cpp) is one too.
    /(?:\bstatic\s+(?:const\s+|constexpr\s+)?[\w:]+\s+|(?<=^|[;}])\s*const\s+[\w:]+\s+(\w+)::)(\w+)\s*\[([^\]]*)\]\s*=\s*\{([^{}]+)\}\s*;/gm,
  )) {
    if (!/^\s*(?:static\s+)?(?:const|constexpr)\b/.test(match[0])) {
      const uses = source.replace(match[0], '');
      const name = match[2]!;
      if (new RegExp(`\\b${name}\\s*\\[[^\\]]+\\]\\s*(?:[+*/&|^-]?=|\\+\\+|--)`).test(uses) ||
          new RegExp(`(?:&|\\+\\+|--)\\s*${name}\\b`).test(uses) ||
          new RegExp(`\\b${name}\\b(?!\\s*\\[)`).test(uses)) continue;
    }
    // Zero past the last initializer, to the declared length: the TMS36xx's
    // `tune1[96*6]` writes 192 of its 576 entries.
    const values = splitMameArgs(match[4]!).map(value => value.trim());
    const declared = match[3]!.trim() ? evalExpr(match[3]!, {}) : null;
    if (declared !== null && declared > values.length) values.push(...Array.from({ length: declared - values.length }, () => '0'));
    tables[match[2]!] = { values };
    // Two classes of one source can each define a static of the same name:
    // okiadpcm.cpp's oki_adpcm_state and oki_adpcm2_state both have an
    // s_index_shift, and by name alone the second won, so the OKIM6295 stepped
    // by the MSM6585's shifts and saturated within a phrase. The owner's own
    // is kept by its qualified name too (see compileMethod).
    if (match[1]) tables[`${match[1]}::${match[2]}`] = { values };
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
  // A table of pointers to tables is those tables, row by row, a null row
  // all zeros: the TMS36xx's `tunes[] = {nullptr,tune1,...}`,
  // which it reads as `tunes[m_tune_num][m_tune_ofs*6+n]`.
  for (const match of source.matchAll(
    /\bstatic\s+const\s+\w+\s*\*\s*const\s+(\w+)\s*\[[^\]]*\]\s*=\s*\{([^{}]+)\}\s*;/g,
  )) {
    const entries = splitMameArgs(match[2]!).map(value => value.trim()).filter(Boolean);
    const columns = Math.max(0, ...entries.map(entry => tables[entry]?.values.length ?? 0));
    if (!columns || !entries.every(entry => /^(?:nullptr|NULL|0)$/.test(entry) || tables[entry])) continue;
    // A shorter row reads zeros past its end. MAME reads on into whatever
    // follows it (its tune4 has 13 notes and m_tune_max is a fixed 96).
    tables[match[1]!] = {
      values: entries.flatMap(entry => {
        const row = tables[entry]?.values ?? [];
        return [...row, ...Array.from({ length: columns - row.length }, () => '0')];
      }),
      columns,
      rows: entries.map(entry => tables[entry] ? '1' : '0'),
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
  /** Configurations a constructor chain builds from its arguments (ConstructorChainValues). */
  chainConfigs: ConstructorChainValues['spaceConfigs'] = {},
): NonNullable<GeneratedDeviceDefinition['spaces']> {
  const spaces: NonNullable<GeneratedDeviceDefinition['spaces']> = [];
  const configs = new Map<string, { name: string; dataBits: number; addressBits: number; map: string; endianness?: 'big' | 'little'; addressShift?: number }>();
  const spaceOrder = (endianness: string, shift: unknown): { endianness?: 'big' | 'little'; addressShift?: number } => ({
    ...(endianness === 'BIG' || endianness === 'LITTLE' ? { endianness: endianness === 'BIG' ? 'big' as const : 'little' as const } : {}),
    ...(Number.isInteger(shift) && shift !== 0 ? { addressShift: Number(shift) } : {}),
  });
  // What the constructor chain built, with the arguments each constructor was
  // handed: a 6800's `m_program_config(..., internal)` and an MCS-48's
  // address width from its feature mask are only known this way.
  const chained = new Map<string, { name: string; dataBits: number; addressBits: number; endianness?: 'big' | 'little'; addressShift?: number }>();
  for (const [member, config] of Object.entries(chainConfigs)) {
    if (config.map) configs.set(member, { ...config, map: config.map });
    else chained.set(member, config);
  }
  for (const owner of hierarchy) {
    const escaped = owner.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const match of source.matchAll(new RegExp(
      `(m_\\w*config\\w*)\\s*\\(\\s*"([^"]*)"\\s*,\\s*ENDIANNESS_(\\w+)\\s*,` +
      `\\s*([^,]+),\\s*([^,]+),\\s*([^,]+),\\s*address_map_constructor\\s*\\(\\s*FUNC\\s*\\(\\s*${escaped}::(\\w+)`,
      'g',
    ))) {
      const dataBits = evalExpr(match[4]!.trim(), constants);
      const addressBits = evalExpr(match[5]!.trim(), constants);
      const addressShift = evalExpr(match[6]!.trim(), constants);
      if (!Number.isInteger(dataBits) || !Number.isInteger(addressBits)) continue;
      configs.set(match[1]!, {
        name: match[2]!,
        dataBits: Number(dataBits),
        addressBits: Number(addressBits),
        map: match[7]!,
        ...spaceOrder(match[3]!, addressShift),
      });
    }
  }
  // A space configured with no map of its own: what the device installs into
  // it itself at start (a YM2610's ADPCM ROM, `space(0).install_rom(...)`).
  const unmapped = new Map<string, { name: string; dataBits: number; addressBits: number; endianness?: 'big' | 'little'; addressShift?: number }>(chained);
  for (const match of source.matchAll(
    // The address shift is optional: `m_data_config("data", ENDIANNESS_BIG, 8, 8)`
    // is the Namco WSG's waveform space, which it fills from its own region.
    /(m_\w*config\w*)\s*\(\s*"([^"]*)"\s*,\s*ENDIANNESS_(\w+)\s*,\s*([^,()]+),\s*([^,()]+)(?:,\s*([^,()]+))?\)/g,
  )) {
    if (configs.has(match[1]!) || unmapped.has(match[1]!)) continue;
    const dataBits = evalExpr(match[4]!.trim(), constants);
    const addressBits = evalExpr(match[5]!.trim(), constants);
    if (!Number.isInteger(dataBits) || !Number.isInteger(addressBits)) continue;
    unmapped.set(match[1]!, {
      name: match[2]!,
      dataBits: Number(dataBits),
      addressBits: Number(addressBits),
      ...spaceOrder(match[3]!, match[6] === undefined ? 0 : evalExpr(match[6].trim(), constants)),
    });
  }
  // A constructor body that edits a config its base built: the 6507's
  // `m_program_config.m_addr_width = 13`, which MAME's 13-bit 2600 map relies
  // on for every mirror (and for the reset vector at $1FFC). Applied base
  // first, so the most derived class's edit stands.
  for (const owner of hierarchy) {
    const escaped = owner.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    for (const constructor of source.matchAll(new RegExp(`\\b${escaped}::${escaped}\\s*\\(`, 'g'))) {
      const end = source.indexOf('\n}', constructor.index);
      const body = source.slice(constructor.index, end < 0 ? undefined : end);
      // And one that gives it an internal map: the RP2A03's
      // `m_program_config.m_internal_map = address_map_constructor(FUNC(rp2a03_device::rp2a03_map), this)`,
      // its APU's registers, ahead of the owner's map as MAME builds them.
      for (const edit of body.matchAll(/\b(m_\w*config\w*)\s*\.\s*m_internal_map\s*=\s*address_map_constructor\s*\(\s*FUNC\s*\(\s*\w+::(\w+)\s*\)/g)) {
        const config = configs.get(edit[1]!) ?? unmapped.get(edit[1]!);
        if (!config) continue;
        unmapped.delete(edit[1]!);
        configs.set(edit[1]!, { ...config, map: edit[2]! });
      }
      for (const edit of body.matchAll(/\b(m_\w*config\w*)\s*\.\s*m_addr_width\s*=\s*([^;]+);/g)) {
        const width = evalExpr(edit[2]!.trim(), constants);
        if (!Number.isInteger(width)) continue;
        for (const table of [configs, unmapped] as const) {
          const config = table.get(edit[1]!);
          if (config) table.set(edit[1]!, { ...config, addressBits: Number(width) } as never);
        }
      }
    }
  }
  if (!configs.size && !unmapped.size) return spaces;
  let vector = methodBodies.get('memory_space_config');
  if (vector === undefined) return spaces;
  // Or what it hands on to: the 68000's `return memory_logical_space_config();`
  // when its spaces are not disabled.
  for (const call of [...vector.matchAll(/\b(\w+)\s*\(\s*\)/g)].map(found => found[1]!)) {
    const delegated = call !== 'memory_space_config' ? methodBodies.get(call) : undefined;
    if (delegated !== undefined) vector += `\n${delegated}`;
  }
  // A space declared only when its owner configures a map for it
  // (`if (has_configured_map(AS_STACK))`, the 8086's stack, code and extra
  // spaces; the 6800's and Z80's opcodes): has_space answers for it only then,
  // so the core falls back to its program space as MAME's does.
  const conditional = new Set([...vector.matchAll(/\bhas_configured_map\s*\(\s*(\w+)\s*\)/g)]
    .map(match => Number(evalExpr(match[1]!, constants))).filter(Number.isInteger));
  const seen = new Set<number>();
  for (const pair of vector.matchAll(
    /std::make_pair\s*\(\s*(\w+)\s*,\s*&\s*(m_\w+)\s*\)/g,
  )) {
    const index = Number(evalExpr(pair[1]!, constants));
    // memory_space_config may answer in branches (`has_configured_map(AS_OPCODES)
    // ? {program, opcodes} : {program}`): a space is the same in each.
    if (seen.has(index)) continue;
    seen.add(index);
    const installed = unmapped.get(pair[2]!);
    if (installed && Number.isInteger(index)) {
      spaces.push({ index, ...installed, installed: true, ...(conditional.has(index) ? { conditional: true as const } : {}) });
      continue;
    }
    const config = configs.get(pair[2]!);
    if (config === undefined || !Number.isInteger(index)) continue;
    const map = methodBodies.get(config.map);
    if (map === undefined) continue;
    // The whole range, as RAM, and nothing else -- `has_configured_map` guards
    // are MAME asking whether the owner supplied a map instead, which the
    // driver here does not.
    const statements = [...map.matchAll(/\bmap\s*\(([^)]*)\)\s*\.\s*(\w+)\s*\(\s*\)/g)];
    if (statements.length !== 1 || statements[0]![2] !== 'ram') {
      // A map that decodes more than RAM: the 68705's internal map of ports,
      // timer, RAM and EPROM, or a 6801's on-chip ports, timer and serial
      // registers. The host builds it by running the method, as MAME does,
      // and a CPU's owner maps the rest of the space (internal first, so it
      // takes priority, as address_map's constructor has it).
      const { map: _map, ...facts } = config;
      spaces.push({ index, ...facts, map: config.map });
      continue;
    }
    const [start, end] = splitMameArgs(statements[0]![1]!)
      .map(value => Number(evalExpr(value.trim(), constants)));
    // RAM over part of the space is a map like any other: the M6802's 128
    // bytes at 0x0000, its owner's map around them.
    if (start !== 0 || end !== (1 << config.addressBits) - 1) {
      const { map: _map, ...facts } = config;
      spaces.push({ index, ...facts, map: config.map });
      continue;
    }
    spaces.push({
      index,
      name: config.name,
      addressBits: config.addressBits,
      dataBits: config.dataBits,
      ...(config.endianness ? { endianness: config.endianness } : {}),
      ...(config.addressShift ? { addressShift: config.addressShift } : {}),
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
  /** The device's own method bodies: a table is lifted only for the device that uses it. */
  methodCode = '',
): GeneratedDeviceMember[] {
  const code = sources.filter(({ file }) => !file.endsWith('.hxx'))
    .map(({ source }) => stripCppComments(source)).join('\n');
  const all = sources.map(({ source }) => stripCppComments(source)).join('\n');
  const macros = objectMacros(all);
  const expand = (text: string, depth = 0): string => depth > 8 ? text
    : text.replace(/\b[A-Z_][A-Z0-9_]*\b/g, name =>
      macros.has(name) && constants[name] === undefined ? expand(macros.get(name)!, depth + 1) : name);
  const lifted: GeneratedDeviceMember[] = [];
  const value = (item: string): unknown => item.startsWith('{')
    ? initializerItems(item.slice(1, -1)).map(value)
    : evalExpr(item, constants) ?? 0;
  // A braced item for a field of a struct type is that struct, field by
  // field: each slapstic's table holds its address predicates as
  // `mask_value` pairs, `{ 0x1f00,0x1e00 }`.
  const record = (fields: readonly GeneratedStructField[], items: readonly string[]): Record<string, unknown> =>
    Object.fromEntries(items.map((item, index) => {
      const field = fields[index]!;
      const nested = field.fields ?? (field.valueType ? structFields.get(field.valueType.split('::').at(-1)!) : undefined);
      return [field.name, item.startsWith('{') && nested && !field.length
        ? record(nested, initializerItems(item.slice(1, -1)))
        : value(item)];
    }));
  // `static const struct x name = {...}`, or a class's struct spelled through
  // the class with no `struct` at all: the AY-3-8910's `static const
  // ay8910_device::ay_ym_param ym2149_param = {...}`, its resistor network.
  // A class's static defined out of the class has no `static` there:
  // `const atari_slapstic_device::slapstic_data atari_slapstic_device::slapstic101 = {...}`.
  for (const match of all.matchAll(/(?:\bstatic\s+|(?:^|[;}\s])(?=const\s+(?:struct\s+)?(?:\w+::)*\w+\s+(?:\w+::)+\w+\s*=))const\s+(?:struct\s+)?((?:\w+::)*(\w+))\s+(?:\w+::)*(\w+)\s*=\s*\{/g)) {
    const [, type, bareType, name] = match;
    const fields = structFields.get(type!) ?? structFields.get(bareType!);
    if (!fields || !new RegExp(`\\b${name}\\b`).test(code)) continue;
    if (existing.some(member => member.name === name) || lifted.some(member => member.name === name)) continue;
    const body = expand(braceBody(all, match.index! + match[0].length - 1, name));
    // C lets an aggregate stop early; the fields it leaves out are zero, which
    // is what the struct's own shape already builds.
    const items = initializerItems(body);
    if (items.length > fields.length) continue;
    lifted.push({
      name: name!,
      valueType: structFields.has(type!) ? type! : bareType!,
      fields,
      initialValue: record(fields, items),
    });
  }
  // A const array of pointers to those statics: the slapstic picks its chip's
  // table as `slapstic_table[m_chipnum - 101]`. Each pointee is const, so the
  // element is its value; a null element (a chip never seen) is all zero,
  // which only MAME's validity check would tell from a table.
  for (const match of all.matchAll(/(?:^|[;}\s])(?:static\s+)?const\s+(?:struct\s+)?((?:\w+::)*(\w+))\s*\*\s*const\s+(?:\w+::)*(\w+)\s*\[\s*\w*\s*\]\s*=\s*\{/g)) {
    const [, type, bareType, name] = match;
    const fields = structFields.get(type!) ?? structFields.get(bareType!);
    if (!fields || !new RegExp(`\\b${name}\\b`).test(methodCode || code)) continue;
    if (existing.some(member => member.name === name) || lifted.some(member => member.name === name)) continue;
    const items = initializerItems(braceBody(all, match.index! + match[0].length - 1, name));
    const elements = items.map(item => {
      if (/^(?:nullptr|NULL|0)$/.test(item.trim())) return null;
      const pointee = /^&\s*(?:\w+::)*(\w+)$/.exec(item.trim())?.[1];
      return lifted.find(member => member.name === pointee)?.initialValue;
    });
    if (!elements.length || elements.some(element => element === undefined)) continue;
    lifted.push({
      name: name!,
      valueType: `${structFields.has(type!) ? type! : bareType!}*`,
      fields,
      arrayLength: elements.length,
      initialValues: elements.map(element => element ?? {}),
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
      // A braced item fills an array field (Musashi's per-row `cycles[NUM_CPU_TYPES]`).
      const item = (text: string): unknown => text.trim().startsWith('{')
        ? initializerItems(text.trim().slice(1, -1)).map(item)
        : quotedItem(text) ?? memberFunctionName(text) ?? evalExpr(text, constants) ?? 0;
      return Object.fromEntries(fields.map((field, index) => [field.name,
        items[index] === undefined ? 0 : item(items[index]!)]));
    });
    lifted.push({ name: name!, valueType: type!, fields, arrayLength: records.length, initialValues: records });
  }
  // A file-scope array of structs: the NES slot's `static const nes_pcb
  // pcb_list[] = { { "nrom", STD_NROM }, ... }`, which nes_pcb_lookup searches
  // by name. Its users live in the `.hxx` the slot includes, so a use is any
  // mention of the name beyond its own definition; a quoted element is its
  // string. Unbound, the lookup answered nothing, m_pcb_id was never a
  // number, and call_load_pcb skipped every board's own wiring.
  // Or a class's static one, defined with both names qualified: the 68000's
  // `const m68000_device::decode_entry m68000_device::s_packed_decode_table[]`,
  // the value/mask/state rows init_decode_table expands.
  for (const match of all.matchAll(/(?:^|[;}\s])(?:static\s+const\s+(?:struct\s+)?(\w+)\s+(\w+)|const\s+(?:struct\s+)?(?:\w+::)+(\w+)\s+(?:\w+::)+(\w+))\s*\[\s*\w*\s*\]\s*=\s*\{/g)) {
    const type = match[1] ?? match[3];
    const name = match[2] ?? match[4];
    const fields = structFields.get(type!);
    if (!fields) continue;
    // Only for a device whose own methods read it: every NES card includes
    // the slot's source, and 390 copies of its tables ran tsc out of memory.
    if (!new RegExp(`\\b${name}\\b`).test(methodCode)) continue;
    if (existing.some(member => member.name === name) || lifted.some(member => member.name === name)) continue;
    const body = expand(braceBody(all, match.index! + match[0].length - 1, name));
    const elements = initializerItems(body).filter(item => item.startsWith('{'));
    const element = (item: string | undefined): unknown => {
      if (item === undefined) return 0;
      // A braced element fills an array field: each Musashi opcode row's
      // `cycles[NUM_CPU_TYPES]`, which m68ki_build_opcode_table copies into
      // the cycle table. Read as one number, every instruction cost nothing.
      if (item.trim().startsWith('{')) return initializerItems(item.trim().slice(1, -1)).map(element);
      const quoted = /^"((?:[^"\\]|\\.)*)"$/.exec(item.trim());
      return quoted ? quoted[1]! : memberFunctionName(item) ?? evalExpr(item, constants) ?? 0;
    };
    const records = elements.map(item => {
      const items = initializerItems(item.slice(1, -1));
      return Object.fromEntries(fields.map((field, index) => [field.name, element(items[index])]));
    });
    if (!records.length) continue;
    lifted.push({ name: name!, valueType: type!, fields, arrayLength: records.length, initialValues: records });
  }
  return lifted;
}

/**
 * A member-function pointer in a table row (`&z8002_device::Z01_ssN0_dddd`),
 * as CALL_METHOD dispatches one: the method's name. The Z8002 decodes every
 * opcode through such a table; evaluated as a number, every row's handler was 0.
 */
function memberFunctionName(item: string): string | undefined {
  return /^&\s*(?:\w+::)+(\w+)$/.exec(item.trim())?.[1];
}

/**
 * A quoted element, as its string: a format's name, or a member-function
 * pointer lowerMemberPointerValues has already made its method's name
 * (`"zinvalid"`).
 */
function quotedItem(item: string): string | undefined {
  return /^"((?:[^"\\]|\\.)*)"$/.exec(item.trim())?.[1];
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
    for (const declaration of structBlocks(littleEndianLayout(stripCppComments(source)))) {
      if (!declaration.name || structs.has(declaration.name)) continue;
      const fields = structFieldList(declaration.body, constants, declaration.name, declaration.union);
      // A union type is its members over one storage: held as a single
      // anonymous union, a member of the type is that union.
      if (fields.length) structs.set(declaration.name, declaration.union ? [{ name: '', union: true, fields }] : fields);
    }
  }
  return structs;
}

/**
 * The methods a struct defines inside its own body, by struct type, each
 * lowered against the struct's fields. MAME's sound chips keep small value
 * types with behaviour of their own -- the AY-3-8910's `tone_t` and
 * `envelope_t` set their periods and shapes through `set_period` and
 * `set_shape` -- and a call on one answered nothing, so no tone ever had a
 * period. A method that does not lower is left out.
 */
function structMethodDeclarations(
  sources: readonly { file: string; source: string }[],
): Record<string, { name: string; parameters: string; program: GeneratedHandlerProgram }[]> {
  const methods: Record<string, { name: string; parameters: string; program: GeneratedHandlerProgram }[]> = {};
  const code = sources.map(({ source }) => stripCppComments(source)).join('\n');
  for (const { source } of sources) {
    for (const declaration of structBlocks(stripCppComments(source))) {
      if (!declaration.name || methods[declaration.name]) continue;
      const owner = ownerReferences(declaration.body);
      const found = [
        ...structMethodsOf(declaration.body, declaration.name, owner),
        ...outOfLineStructMethods(code, declaration.name, owner),
      ];
      if (found.length) methods[declaration.name] = found;
    }
  }
  return methods;
}

/**
 * Each struct method's source, by its compiled program: one that reads a
 * table or macro of the device's own sources is compiled again once the
 * device knows them (see compileMameDeviceSource).
 */
const STRUCT_METHOD_SOURCE = new WeakMap<GeneratedHandlerProgram, string>();

/**
 * The fields a value type holds as a reference to the device that owns it:
 * `k053260_device &m_device;`. A method reaching through one
 * (`m_device.read_byte(...)`, `m_device.save_item(...)`) is calling its
 * device, which is what a struct method's own unqualified call reaches.
 */
function ownerReferences(body: string): string[] {
  return [...body.matchAll(/(?:^|[;{}:])\s*(?:const\s+)?\w+_device\s*&\s*(m_\w+)\s*;/gm)].map(match => match[1]!);
}

function throughOwner(body: string, owner: readonly string[]): string {
  return owner.reduce((text, member) =>
    text.replace(new RegExp(`(?<![\\w.>])${member}\\s*(?:\\.|->)\\s*`, 'g'), ''), body);
}

/**
 * A value type's methods defined outside its body, as MAME defines a nested
 * class's: `void k053260_device::KDSC_Voice::play(s32 *outputs) { ... }`.
 */
function outOfLineStructMethods(
  code: string,
  name: string,
  owner: readonly string[],
): { name: string; parameters: string; program: GeneratedHandlerProgram }[] {
  const leaf = name.split('::').at(-1)!;
  const found: { name: string; parameters: string; program: GeneratedHandlerProgram }[] = [];
  const definition = new RegExp(
    `(?:^|[;}])\\s*(?:inline\\s+)?[\\w:<>]+[\\s*&]+(?:\\w+::)*${leaf}::(\\w+)\\s*\\(([^()]*)\\)\\s*(?:const\\s*)?(?:noexcept\\s*)?\\{`,
    'gm',
  );
  for (const match of code.matchAll(definition)) {
    if (match[1] === leaf) continue;
    const open = code.indexOf('{', match.index! + match[0].length - 1);
    const close = matchingBrace(code, open);
    if (close < 0) continue;
    const body = throughOwner(code.slice(open + 1, close), owner);
    const program = compileMameHandler(normalizeMameExecutionSource(body));
    if (program.diagnostics.length) continue;
    STRUCT_METHOD_SOURCE.set(program, body);
    found.push({ name: match[1]!, parameters: match[2]!.trim(), program });
  }
  return found;
}

/** The inline methods one struct body defines. */
function structMethodsOf(
  body: string,
  name?: string,
  owner: readonly string[] = [],
): { name: string; parameters: string; program: GeneratedHandlerProgram }[] {
  const found: { name: string; parameters: string; program: GeneratedHandlerProgram }[] = [];
  body = throughOwner(body, owner);
  // Its default constructor, as `__construct`, which building the struct
  // runs: discrete's `double_stack() : p(&stk[0]) { }` points its stack at
  // its own storage, and built as zeros the first push wrote through null.
  // One taking arguments is `__construct_<arity>`, which building the struct
  // with them runs instead (`STRUCT_OF(type, ...args)`): the slapstic's
  // address predicate is `test(offs_t m, offs_t v) : m_m(m), m_v(v) {}`.
  const leaf = name?.split('::').at(-1);
  const constructors = leaf
    ? body.matchAll(new RegExp(`(?:^|[;{}]|(?<!:):)\\s*${leaf}\\s*\\(([^()]*)\\)\\s*(?::([^{;]*))?\\{`, 'g'))
    : [];
  for (const constructor of constructors) {
    const parameters = constructor[1]!.trim() === 'void' ? '' : constructor[1]!.trim();
    const arity = parameters ? splitMameArgs(parameters).length : 0;
    const open = constructor.index + constructor[0].length - 1;
    const close = matchingBrace(body, open);
    const initializers = splitMameArgs(constructor[2] ?? '').flatMap(initializer => {
      const parsed = /^\s*(\w+)\s*[({]([\s\S]*)[)}]\s*$/.exec(initializer);
      return parsed ? [`${parsed[1]} = ${parsed[2]!.trim() || '0'};`] : [];
    });
    if (close > open) {
      const program = compileMameHandler(normalizeMameExecutionSource(`${initializers.join('\n')}\n${body.slice(open + 1, close)}`));
      if (!program.diagnostics.length && program.operations.length) {
        found.push({ name: arity ? `__construct_${arity}` : '__construct', parameters, program });
      }
    }
  }
  // Its call operator, as `__call`: `bool operator()(offs_t a) const`.
  for (const match of body.matchAll(/(?:^\s*|[;{}]\s*)(?:inline\s+)?[\w:<>]+[\s*&]+operator\s*\(\s*\)\s*\(([^()]*)\)\s*(?:const\s*)?(?:noexcept\s*)?\{/g)) {
    const open = body.indexOf('{', match.index! + match[0].length - 1);
    const close = matchingBrace(body, open);
    if (close < 0) continue;
    const program = compileMameHandler(normalizeMameExecutionSource(body.slice(open + 1, close)));
    if (!program.diagnostics.length) found.push({ name: '__call', parameters: match[1]!.trim(), program });
  }
  // The first method may open the body: `ymfm_output &clear()`.
  const header = /(?:^\s*|[;{}]\s*)(?:inline\s+)?[\w:<>]+[\s*&]+(\w+)\s*\(([^()]*)\)\s*(?:const\s*)?(?:noexcept\s*)?\{/g;
  for (const match of body.matchAll(header)) {
    const open = body.indexOf('{', match.index! + match[0].length - 1);
    const close = matchingBrace(body, open);
    if (close < 0) continue;
    const program = compileMameHandler(normalizeMameExecutionSource(body.slice(open + 1, close)));
    if (program.diagnostics.length) continue;
    STRUCT_METHOD_SOURCE.set(program, body.slice(open + 1, close));
    found.push({ name: match[1]!, parameters: match[2]!.trim(), program });
  }
  return found;
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
): { name: string; body: string; declarator?: string; declaratorBound?: string; union?: true }[] {
  const blocks: { name: string; body: string; declarator?: string; declaratorBound?: string; union?: true }[] = [];
  // A named union is a type the same way: the 6809's `union M6809Q { ... }`,
  // which its `m_q` holds (A, B, D, E, F, W and Q over one word).
  const opener = /\b(struct|union)\s+(\w+)?\s*\{/g;
  let match: RegExpExecArray | null;
  while ((match = opener.exec(source)) !== null) {
    const open = source.indexOf('{', match.index);
    const close = matchingBrace(source, open);
    if (close < 0) continue;
    // The name after the closing brace declares a member of this struct type;
    // `struct SOUND { ... };` declares none.
    const declared = /^\s*(\w+)\s*(?:\[([^\]]*)\])?\s*;/.exec(source.slice(close + 1));
    const declarator = declared?.[1];
    const union = match[1] === 'union';
    // An anonymous union with no declarator is only ever part of what holds
    // it; one with a declarator declares a member of its shape, as the
    // Z8002's register file is `union { u8 B[16]; u16 W[16]; ... } m_regs`.
    if (union && !match[2] && !declarator) {
      opener.lastIndex = close + 1;
      continue;
    }
    const name = match[2] ?? declarator ?? '';
    const body = source.slice(open + 1, close);
    blocks.push({ name, body, ...(declarator ? { declarator } : {}),
      ...(declared?.[2]?.trim() ? { declaratorBound: declared[2] } : {}),
      ...(union ? { union: true as const } : {}) });
    // A struct declared inside another is a type of its own, named as C++
    // names it: nes_defs.h declares `square_t` in both `apu_t` and
    // `mmc5_sound_t`, with different fields, and MMC5's `square_t squ[2]` is
    // the second.
    if (name) {
      for (const nested of structBlocks(body)) {
        if (nested.name && !nested.declarator) blocks.push({ ...nested, name: `${name}::${nested.name}` });
      }
    }
    opener.lastIndex = close + 1;
  }
  return blocks;
}

/**
 * A layout MAME spells per host byte order, as a little-endian host builds it:
 * exidysound.h's 6840 channel keeps its counter as `union { #ifdef LSB_FIRST
 * struct { uint8_t l, h; } b; #else struct { uint8_t h, l; } b; #endif
 * uint16_t w; }`. Every host this runs on is little-endian, so LSB_FIRST is
 * defined, and both branches read as fields gave `b` twice.
 */
function littleEndianLayout(source: string): string {
  if (!/\bLSB_FIRST\b/.test(source)) return source;
  return resolveLiteralConditionals(source
    .replace(/^(\s*)#\s*ifdef\s+LSB_FIRST\b.*$/gm, '$1#if 1')
    .replace(/^(\s*)#\s*ifndef\s+LSB_FIRST\b.*$/gm, '$1#if 0')
    .replace(/^(\s*)#\s*if\s+defined\s*\(?\s*LSB_FIRST\s*\)?\s*$/gm, '$1#if 1'));
}

/** The fields of one struct body, recursing into nested anonymous structs and unions. */
function structFieldList(
  body: string,
  constants: Record<string, number>,
  owner?: string,
  /** The body is a union's: each member starts at its first byte. */
  inUnion = false,
): GeneratedStructField[] {
  const fields: GeneratedStructField[] = [];
  // Struct types this body declares itself: a field of one is of the
  // qualified type (`mmc5_sound_t::square_t`), and the body is not fields.
  const nestedTypes = new Set([...body.matchAll(/\bstruct\s+(\w+)\s*\{/g)].map(match => match[1]!));
  const qualified = (type: string): string =>
    owner && nestedTypes.has(type) ? `${owner}::${type}` : type;
  const bound = (text: string | undefined): number | undefined => {
    if (text === undefined) return undefined;
    const value = evalExpr(text, constants) ?? undefined;
    return value !== undefined && value > 0 ? value : undefined;
  };
  let cursor = 0;
  while (cursor < body.length) {
    const nested = /\b(struct|union)\s*(?:\w+\s*)?\{/g;
    nested.lastIndex = cursor;
    const start = nested.exec(body);
    const scalars = start ? body.slice(cursor, start.index) : body.slice(cursor);
    // Fields in declaration order, which is what an aggregate initializer
    // assigns by: a function pointer (discrete_block's `factory`) sits
    // between plain fields, and the other pattern does not read it.
    const found: { at: number; field: GeneratedStructField }[] = [];
    for (const pointer of scalars.matchAll(/(?:^|(?<=[;}]))[^;{}()]*\(\s*\*\s*([A-Za-z_]\w*)\s*\)\s*\([^;{}]*\)\s*;/gm)) {
      found.push({ at: pointer.index, field: { name: pointer[1]!, valueType: 'function*' } });
    }
    for (const statement of scalars.matchAll(
      // A builtin may take several words (`unsigned short energytable[...]`)
      // and a table several bounds (`int ktable[MAX_K][MAX_SCALE]`); the LPC
      // coefficient struct uses both, and missing either dropped the field.
      // Several may share a line (`int x; int y;` in the AVG's vgvector), so a
      // field starts at a line, after the previous one's semicolon, or after a
      // constructor's closing brace. Modern
      // MAME also initialises fields in the declaration and groups them --
      // the 64H156's `int state = 0, next_state = 0;` -- and a field the
      // pattern missed was simply absent from the struct, as was an array
      // initialised from a brace list (segaic16's `uint8_t bank[8] = {0,...}`).
      // The type and the
      // name are apart by a space or a `*`: without that, `unsigned short
      // energytable[...]` backtracked into a field `e` of type `energytabl`.
      // An elaborated type names its struct with the keyword: CPS1config's
      // `const struct gfx_range *bank_mapper;`, which missed shifted every
      // later field of each config row by one.
      /(?:^|(?<=[;}]))\s*(?:const\s+)?(?:struct\s+)?((?:(?:unsigned|signed|long|short)\s+)*[\w:]+(?:\s*<[^;{}()]*?>)?)(?:\s+|\s*(?=\*))((?:\*\s*)?[A-Za-z_]\w*\s*(?:\[[^\]]+\]\s*)*(?:=\s*\{[^{}]*\}|=[^,;{}]*|\{[^{}]*\})?(?:\s*,\s*(?:\*\s*)?[A-Za-z_]\w*\s*(?:\[[^\]]+\]\s*)*(?:=\s*\{[^{}]*\}|=[^,;{}]*|\{[^{}]*\})?)*)\s*;/gm,
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
      // A bool is true or false, as a bool member is (bits 1): the Z80 stores
      // its carry as `m_f.c = res & 0x100`, and narrowed to a byte it was 0.
      const bits: 1 | 8 | 16 | 32 | 64 = valueType === 'bool' ? 1 : /64/.test(valueType) ? 64
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
        // A scalar's in-class initializer is where it starts: the NES APU's
        // noise LFSR is `u16 lfsr = 1;`, and from 0 it never left 0, so the
        // noise channel played a constant and every NES game lost its noise.
        const initializer = !pointer && length === undefined
          ? /=\s*([^{}]+?)\s*$|\{\s*([^{},]+?)\s*\}\s*$/.exec(declarator.trim())
          : null;
        const initialText = (initializer?.[1] ?? initializer?.[2])?.replace(/^true$/, '1').replace(/^false$/, '0');
        const initial = initialText !== undefined ? evalExpr(initialText, constants) : null;
        found.push({ at: statement.index, field: {
          name: field[2]!,
          ...(length !== undefined ? { length } : {}),
          ...(initial !== null && initial !== 0 && Number.isFinite(initial) ? { initial } : {}),
          ...(integral && !pointer ? { bits, ...(signed ? { signed } : {}) } : { valueType: pointer ? `${qualified(valueType)}*` : qualified(valueType) }),
        } });
      }
    }
    fields.push(...found.sort((a, b) => a.at - b.at).map(({ field }) => field));
    if (!start) break;
    const open = body.indexOf('{', start.index);
    const close = matchingBrace(body, open);
    if (close < 0) break;
    const declarator = /^\s*(\w+)\s*(?:\[\s*([^\]]+)\s*\])?\s*;/.exec(body.slice(close + 1));
    // A named nested struct with no declarator is a type, recorded on its
    // own by structBlocks; it adds no field here.
    const union = start[1] === 'union';
    const anonymousStruct = !union && !/^struct\s+\w/.test(start[0]);
    if (declarator) {
      const length = bound(declarator[2]);
      fields.push({
        name: declarator[1]!,
        ...(length !== undefined ? { length } : {}),
        fields: structFieldList(body.slice(open + 1, close), constants, undefined, union),
        // Its members share one storage, each from its first byte.
        ...(union ? { union: true } : {}),
      });
    } else if (inUnion && (union || anonymousStruct)) {
      // Inside a union an anonymous member is one more overlapping member,
      // its own fields named as the union's: m6809.h's `union { struct {
      // uint8_t f, e, b, a; }; struct { uint16_t w, d; }; } r;`.
      fields.push({ name: '', fields: structFieldList(body.slice(open + 1, close), constants, undefined, union), ...(union ? { union: true } : {}) });
    } else if (union || anonymousStruct) {
      // In a struct, an anonymous member's fields are the struct's own.
      fields.push(...structFieldList(body.slice(open + 1, close), constants));
    }
    cursor = close + 1 + (declarator?.[0].length ?? 0);
  }
  return fields;
}

/**
 * A constructor written inside its class's declaration, in the shape the
 * out-of-line parser returns. Only the class's own body is searched, and only
 * a constructor named for the class's leaf name.
 */
function inlineConstructor(
  sources: readonly { file: string; source: string }[],
  qualified: string,
): ReturnType<typeof parseMameConstructors>[number] | undefined {
  const leaf = qualified.split('::').at(-1)!;
  for (const { file, source } of sources) {
    const text = stripCppComments(source);
    const declaration = new RegExp(`\\b(?:class|struct)\\s+${leaf}\\b[^;{]*\\{`).exec(text);
    if (!declaration) continue;
    const open = declaration.index + declaration[0].length - 1;
    const close = matchingBrace(text, open);
    if (close < 0) continue;
    const body = text.slice(open + 1, close);
    const head = new RegExp(`(?:^|[;{}\\s])${leaf}\\s*\\(`, 'g');
    // A class that declares no constructor has the implicit default one,
    // which runs only its members' initializers: m6502_device::mi_default,
    // the memory interface every 6502 allocates in device_start. An abstract
    // class (a pure virtual `= 0`) has no instances to construct: ymfm's
    // ymfm_engine_callbacks is what a chip points at its own owner through.
    // Only a class with code of its own: an `enum class` reads as one here,
    // and a plain data struct (atarimo's `dual_entry`) is its fields.
    const isEnum = /\benum\s+$/.test(text.slice(Math.max(0, declaration.index - 8), declaration.index));
    const hasMethods = /\b\w+\s*\([^;{}]*\)\s*(?:const\s*)?(?:override\s*)?[;{]/.test(body);
    if (![...body.matchAll(head)].length && !isEnum && /^\s*class\b/.test(declaration[0]) && hasMethods &&
        !/\)\s*(?:const\s*)?(?:override\s*)?=\s*0\s*;/.test(body)) {
      return {
        className: qualified,
        name: leaf,
        parameters: '',
        body: '',
        initializers: [],
        span: { file, line: 1, column: 1 },
      } as unknown as ReturnType<typeof parseMameConstructors>[number];
    }
    for (const match of body.matchAll(head)) {
      const parametersOpen = (match.index ?? 0) + match[0].length - 1;
      let depth = 0;
      let parametersClose = parametersOpen;
      for (; parametersClose < body.length; parametersClose++) {
        if (body[parametersClose] === '(') depth++;
        else if (body[parametersClose] === ')' && --depth === 0) break;
      }
      let cursor = parametersClose + 1;
      while (/\s/.test(body[cursor] ?? '')) cursor++;
      const initializers: { name: string; args: string[] }[] = [];
      if (body[cursor] === ':') {
        cursor++;
        for (;;) {
          const init = /^\s*([\w:]+)\s*([({])/.exec(body.slice(cursor));
          if (!init) break;
          const start = cursor + init[0].length - 1;
          const closer = init[2] === '(' ? ')' : '}';
          let level = 0;
          let end = start;
          for (; end < body.length; end++) {
            if (body[end] === init[2]) level++;
            else if (body[end] === closer && --level === 0) break;
          }
          initializers.push({ name: init[1]!, args: splitMameArgs(body.slice(start + 1, end)) });
          cursor = end + 1;
          while (/\s/.test(body[cursor] ?? '')) cursor++;
          if (body[cursor] !== ',') break;
          cursor++;
        }
      }
      while (/\s/.test(body[cursor] ?? '')) cursor++;
      if (body[cursor] !== '{') continue;
      const end = matchingBrace(body, cursor);
      if (end < 0) continue;
      return {
        className: qualified,
        name: leaf,
        parameters: body.slice(parametersOpen + 1, parametersClose),
        body: body.slice(cursor + 1, end),
        initializers,
        span: { file, line: 1, column: 1 },
      } as unknown as ReturnType<typeof parseMameConstructors>[number];
    }
  }
  return undefined;
}

/**
 * The power-on value of every port in the block a device's
 * `device_input_ports` names, as MAME's field_alloc builds it: each field's
 * default over its own bits, a DIP switch with no default reading off and a
 * digital input released. The NES-EVENT2 cartridge (Nintendo Campus
 * Challenge 1991) reads its timer DIP switches from here; read as an unknown
 * port they were all ones, and its competition timer had expired at power-on
 * (#184).
 */
export function deviceInputDefaults(body: string | undefined, source: string): Record<string, number> | undefined {
  const name = body && /\bINPUT_PORTS_NAME\s*\(\s*(\w+)\s*\)/.exec(body)?.[1];
  if (!name) return undefined;
  const blocks = new Map(parseInputPorts(source, parseTextMacros(source)).map(block => [block.name, block]));
  const values: Record<string, number> = {};
  const apply = (block: InputPortsDef | undefined, depth = 0): void => {
    if (!block || depth > 8) return;
    for (const include of block.includes ?? []) apply(blocks.get(include), depth + 1);
    for (const port of block.ports) {
      let value = port.modify ? values[port.tag] ?? 0 : 0;
      for (const field of port.fields) {
        const fallback = field.kind === 'dip' || field.activeLow !== false ? field.mask : 0;
        value = ((value & ~field.mask) | ((field.defaultValue ?? fallback) & field.mask)) >>> 0;
      }
      values[port.tag] = value;
    }
  };
  apply(blocks.get(name));
  return Object.keys(values).length ? values : undefined;
}

/**
 * Inline a call statement whose callee moves a reference parameter, when every
 * such argument is one of the caller's own variables: MAME's inline
 * `draw_fixed_layer_2pixels(u32*& pixel_addr, ...)` steps Neo Geo's fixed-layer
 * cursor two pixels at a time. Called as a method, the write through `&` could
 * only be honoured interpreted, and that kept its caller, run for every pixel
 * of every line, interpreted too. Inlined, the reference is the caller's own
 * variable and the callee's locals and value parameters are fresh names.
 */
function inlineReferenceCallees(methods: GeneratedDeviceMethod[]): void {
  const byName = new Map<string, GeneratedDeviceMethod[]>();
  for (const method of methods) byName.set(method.name, [...byName.get(method.name) ?? [], method]);
  const parameters = (method: GeneratedDeviceMethod) => splitMameArgs(method.parameters ?? '')
    .map(parameter => parameter.trim()).filter(parameter => parameter && parameter !== 'void')
    .map(parameter => {
      const name = /([A-Za-z_]\w*)\s*(?:=[^=].*)?$/.exec(parameter)?.[1] ?? '';
      return { name, reference: /&/.test(parameter.slice(0, parameter.lastIndexOf(name))) && !/\bconst\b/.test(parameter) };
    });
  const json = (value: unknown) => JSON.stringify(value);
  const inlinable = (callee: GeneratedDeviceMethod): boolean => {
    if (callee.program.diagnostics.length) return false;
    const text = json(callee.program.operations);
    if (text.includes('"op":"return"')) return false;
    return parameters(callee).some(parameter => parameter.reference &&
      text.includes(`"target":{"kind":"identifier","name":"${parameter.name}"}`));
  };
  let serial = 0;
  const rewrite = (operations: GeneratedHandlerOperation[], depth: number): GeneratedHandlerOperation[] =>
    operations.flatMap(operation => {
      const nested = JSON.parse(json(operation)) as GeneratedHandlerOperation;
      for (const key of ['then', 'else', 'body', 'initialize', 'iterate'] as const) {
        const value = (nested as Record<string, unknown>)[key];
        if (Array.isArray(value)) (nested as Record<string, unknown>)[key] = rewrite(value as GeneratedHandlerOperation[], depth);
      }
      if (nested.op === 'switch') nested.cases = nested.cases.map(entry => ({ ...entry, body: rewrite(entry.body, depth) }));
      if (nested.op === 'try') {
        nested.catches = nested.catches.map(entry => ({ ...entry, body: rewrite(entry.body, depth) }));
        if (nested.finally) nested.finally = rewrite(nested.finally, depth);
      }
      if (nested.op !== 'call' || depth > 4) return [nested];
      const callee = nested.expression.callee;
      if (callee.kind !== 'identifier') return [nested];
      const candidates = byName.get(callee.name) ?? [];
      const target = candidates.length === 1 ? candidates[0]! : undefined;
      if (!target || !inlinable(target)) return [nested];
      const params = parameters(target);
      const args = nested.expression.args;
      if (params.length !== args.length) return [nested];
      if (params.some((parameter, index) => parameter.reference && args[index]!.kind !== 'identifier')) return [nested];
      const tag = `__inline${serial++}_`;
      const renames = new Map<string, string>();
      const prologue: GeneratedHandlerOperation[] = [];
      params.forEach((parameter, index) => {
        const argument = args[index]!;
        if (parameter.reference) renames.set(parameter.name, (argument as { name: string }).name);
        else {
          renames.set(parameter.name, tag + parameter.name);
          prologue.push({ op: 'declare', name: tag + parameter.name, valueType: 'auto', value: argument });
        }
      });
      const body = JSON.parse(json(target.program.operations), (key, value) => {
        if (value && typeof value === 'object' && !Array.isArray(value)) {
          if (value.kind === 'identifier' && renames.has(value.name)) return { ...value, name: renames.get(value.name) };
          if (value.op === 'declare' && typeof value.name === 'string') {
            if (!renames.has(value.name)) renames.set(value.name, tag + value.name);
            return { ...value, name: renames.get(value.name) };
          }
        }
        return value;
      }) as GeneratedHandlerOperation[];
      // Declarations come before their uses in source order, so a second
      // pass renames uses of the callee's own locals now that all are known.
      const renamed = JSON.parse(json(body), (key, value) =>
        value && typeof value === 'object' && value.kind === 'identifier' && renames.has(value.name)
          && !String(value.name).startsWith(tag) ? { ...value, name: renames.get(value.name) } : value) as GeneratedHandlerOperation[];
      return [...prologue, ...rewrite(renamed, depth + 1)];
    });
  for (const method of methods) {
    if (method.program.diagnostics.length) continue;
    const text = json(method.program.operations);
    if (![...byName.keys()].some(name => text.includes(`"name":"${name}"`))) continue;
    method.program = { ...method.program, operations: rewrite(method.program.operations, 0) };
  }
}
