// Generic execution of generated handler IR.
//
// Neutral by construction: this interprets typed operations lowered from MAME
// source and knows nothing about buses, browsers or board composition. It sits
// in src/ir because both sides need it — the knowledge-graph builder evaluates
// constant expressions with it during generation, and the browser runtime
// executes the same programs at run time. One interpreter means the two cannot
// disagree about what a lowered program means.

import { isVideoPlanCall } from './framework-calls.ts';
import type {
  BoardIr,
  GeneratedCallback,
  GeneratedCompiledHandler,
  GeneratedHandlerRuntime,
  GeneratedExpression,
  GeneratedHandler,
  GeneratedHandlerOperation,
  GeneratedHandlerProgram,
  GeneratedStateMember,
} from './board.ts';

/**
 * Where a struct's declared field widths hang, for the interpreter to narrow
 * an assignment through. A symbol so it never collides with a MAME field name
 * and never shows up in a key walk over the struct.
 */
export const GENERATED_FIELD_WIDTHS = Symbol.for('mamekit.fieldWidths');

/** Marks a C struct instance the host built from a declared shape. */
export const GENERATED_STRUCT = Symbol.for('mamekit.struct');

/** How a growable vector makes a new element (another vector, a struct). */
const GENERATED_ELEMENT = Symbol.for('mamekit.vectorElement');

/**
 * A std::vector held as a growable array: `push_back` appends, `clear`
 * empties, `resize` grows by elements of its own kind. `element` makes one;
 * absent, elements are integers and grow as zero.
 */
export function generatedVector(element?: () => unknown): unknown[] {
  const vector: unknown[] = [];
  if (element) Object.defineProperty(vector, GENERATED_ELEMENT, { value: element, enumerable: false });
  return vector;
}

/** `vector.resize(length)` on a growable vector: in place, new elements of its kind. */
export function resizeGeneratedVector(vector: unknown[], length: number): unknown[] {
  const element = (vector as { [GENERATED_ELEMENT]?: () => unknown })[GENERATED_ELEMENT];
  const target = Math.max(0, Math.floor(length));
  if (vector.length > target) vector.length = target;
  while (vector.length < target) vector.push(element ? element() : 0);
  return vector;
}

/** `container.resize(length)` for emitted code: the resized container. */
export function resizeGeneratedContainer(container: unknown, length: number): unknown {
  if (Array.isArray(container)) return resizeGeneratedVector(container, length);
  if (!ArrayBuffer.isView(container)) return container;
  const current = container as unknown as ArrayLike<number> & { constructor: new (size: number) => ArrayLike<number> & { set(values: ArrayLike<number>): void } };
  const target = Math.max(0, Math.floor(length));
  if (current.length === target) return container;
  const resized = new current.constructor(target);
  resized.set((container as unknown as { subarray(start: number, end: number): ArrayLike<number> }).subarray(0, Math.min(target, current.length)));
  return resized;
}

/**
 * std::lower_bound / std::upper_bound over [first, last), with the comparator
 * the source passes (a lambda) or `<`, answering an iterator into the same
 * buffer. Its own function so a device can bind it directly: the floppy
 * drive searches its track on every flux reversal it caches.
 */
export function generatedBoundSearch(
  lower: boolean, first: unknown, last: unknown, value: unknown, compare?: unknown,
): unknown {
  const source = isGeneratedPointer(first) ? first.source : first;
  const start = isGeneratedPointer(first) ? first.offset : 0;
  const end = isGeneratedPointer(last) ? last.offset : (source as ArrayLike<unknown>).length;
  const less = typeof compare === 'function'
    ? (a: unknown, b: unknown) => truthy((compare as (a: unknown, b: unknown) => unknown)(a, b))
    : (a: unknown, b: unknown) => toNumber(a) < toNumber(b);
  const items = source as ArrayLike<unknown>;
  let low = start;
  let high = end;
  while (low < high) {
    const middle = (low + high) >>> 1;
    const before = lower ? less(items[middle], value) : !less(value, items[middle]);
    if (before) low = middle + 1;
    else high = middle;
  }
  return { generatedPointer: true, source, offset: low };
}

/** A struct value from interleaved field names and values. */
/**
 * On a host object a generated program calls methods of: method -> the
 * indices of its parameters that MAME declares as references. The interpreter
 * passes those as lvalues, with `get()` and `set()`.
 */
export const REFERENCE_PARAMETERS = Symbol.for('mamekit.referenceParameters');

function generatedStruct(pairs: readonly unknown[]): Record<string, unknown> {
  const entries: [string, unknown][] = [];
  for (let index = 0; index + 1 < pairs.length; index += 2) entries.push([String(pairs[index]), pairs[index + 1]]);
  // Built in one operation: see structMember in generated-device.ts.
  const value = Object.fromEntries(entries);
  Object.defineProperty(value, GENERATED_STRUCT, { value: true, enumerable: false, configurable: true });
  return value;
}

export function isGeneratedStruct(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' &&
    (value as { [GENERATED_STRUCT]?: true })[GENERATED_STRUCT]);
}

/**
 * C++ struct assignment: `cur_live = checkpoint_live` copies, field by field.
 *
 * A struct member is one JavaScript object, so a plain store would make the
 * two names one struct -- and the 64H156's checkpoint would then move with
 * the live state it exists to roll back to. The target keeps its identity
 * (anything holding it still holds it); nested structs and arrays copy
 * element by element. Returns the target.
 */
export function copyGeneratedStruct(target: unknown, source: unknown): unknown {
  if (!isGeneratedStruct(target) || !source || typeof source !== 'object' || target === source) return source;
  const from = source as Record<string, unknown>;
  // A struct's fields never change once it is built, so their names are read
  // once: the 64H156 copies its live state twice at every syncpoint, twelve
  // thousand times a frame while a 1541 reads.
  let keys = STRUCT_FIELDS.get(target);
  if (!keys) STRUCT_FIELDS.set(target, keys = Object.keys(target));
  for (let field = 0; field < keys.length; field++) {
    const key = keys[field]!;
    const next = from[key];
    if (next === undefined && !(key in from)) continue;
    const current = target[key];
    if (current === null || typeof current !== 'object') target[key] = next;
    else if (isGeneratedStruct(current)) copyGeneratedStruct(current, next);
    else if (Array.isArray(current) && Array.isArray(next)) {
      for (let index = 0; index < current.length && index < next.length; index++) {
        if (isGeneratedStruct(current[index])) copyGeneratedStruct(current[index], next[index]);
        else current[index] = next[index];
      }
    } else target[key] = next;
  }
  return target;
}

/**
 * Whether `target = value` is a C++ struct assignment, which copies into the
 * struct the target holds. A pointer on the right means the target is a
 * pointer that happens to hold a struct, and the store rebinds it: the
 * VLM5030 aims `m_coeff = &vlm5030_coeff;` at its coefficient table, and
 * copied from a pointer the table stayed zero and Hyper Sports lost its speech.
 */
function copiesStruct(target: unknown, value: unknown): boolean {
  if (!isGeneratedStruct(target)) return false;
  const source = isLValue(value) ? value.get() : value;
  return Boolean(source) && typeof source === 'object' && !isGeneratedPointer(source);
}

/** Each struct's field names, read once (see copyGeneratedStruct). */
const STRUCT_FIELDS = new WeakMap<object, string[]>();

/**
 * The value of a C++ default argument (`bool force = false`,
 * `const attotime &limit = attotime::never`, `offs_t mask = ~u32(0)`), or
 * undefined for a default this runtime cannot spell as a number.
 */
export function cppDefaultArgument(parameter: string): number | undefined {
  const value = /=\s*([\s\S]+)$/.exec(parameter)?.[1]?.trim();
  if (value === undefined) return undefined;
  const numeric = /^-?(?:0[xX][\da-fA-F]+|\d+)[uUlL]*$/.exec(value);
  if (numeric) return Number(value.replace(/[uUlL]+$/, ''));
  if (value === 'true') return 1;
  if (value === 'false' || value === 'nullptr' || value === 'NULL') return 0;
  if (value === 'attotime::never') return Infinity;
  if (value === 'attotime::zero') return 0;
  // `~Type(0)` and kin are MAME's all-ones memory masks.
  if (/^~\s*\w+\s*\(\s*0\s*\)$/.test(value)) return 0xffffffff;
  return undefined;
}

/**
 * MAME `attotime`'s value methods, for an attotime the runtime holds as
 * seconds -- `attotime::never` is Infinity. Undefined for any other method.
 * Answered generically, a method on a number read as 0: `tm.is_never()` said
 * "no" for the one time that is never, and the 64H156 ran its bit engine from
 * a clock that had not started.
 */
export function attotimeSecondsMethod(seconds: number, method: string, args: readonly number[] = []): number | undefined {
  switch (method) {
    case 'is_never': return seconds === Infinity ? 1 : 0;
    case 'is_zero': return seconds === 0 ? 1 : 0;
    case 'as_double': return seconds;
    case 'as_ticks': return Math.floor(seconds * Math.max(1, args[0] ?? 1));
    case 'as_attoseconds': return seconds * 1e18;
    case 'seconds': return Math.floor(seconds);
    case 'attoseconds': return (seconds - Math.floor(seconds)) * 1e18;
    default: return undefined;
  }
}

/**
 * One field's C conversion. The width is the declared bit count, negated when
 * the declaration is signed, so the whole shape is a plain number map.
 */
export function generatedFieldWidth(value: number, width: number): number {
  const bits = Math.abs(width);
  if (width < 0) {
    if (bits === 8) return value << 24 >> 24;
    if (bits === 16) return value << 16 >> 16;
    return value | 0;
  }
  if (bits === 8) return value & 0xff;
  if (bits === 16) return value & 0xffff;
  return value >>> 0;
}

/** Active-low raw input port state, read by generated programs. */
export interface IrInputPorts {
  read(tag: string): number;
}

export interface GeneratedHandlerBindings {
  /** MAME member names, including the leading m_ used in the source. */
  members?: Record<string, unknown>;
  getters?: Record<string, () => unknown>;
  setters?: Record<string, (value: number) => void>;
  inputs?: IrInputPorts;
  constants?: Record<string, number>;
  /**
   * Runtime device calls keyed as "m_device.method" or just "method".
   * Calls used only for MAME renderer cache maintenance are ignored by default.
   */
  calls?: Record<string, (...args: number[]) => unknown>;
  /**
   * Generated C++ methods that may receive reference parameters. Unlike
   * browser/device endpoints in `calls`, these receive l-value wrappers for
   * parameters declared with `&`.
   */
  referenceCalls?: Record<string, (...args: GeneratedCallArgument[]) => unknown>;
  callParameters?: Record<string, string[]>;
  /**
   * MAME `machine().scheduler().synchronize()`: run this at the current time
   * but only once the running CPU has yielded. Absent, the caller runs it
   * inline, which is what a spec harness with no scheduler wants.
   */
  schedule?(run: () => void): void;
  /**
   * MAME `machine().scheduler().synchronize()` with no callback: end the
   * running processor's timeslice, so the devices behind it in the round
   * catch up to it. Absent, there is no slice to end.
   */
  endTimeslice?(): void;
  /**
   * MAME's address_space for a handler whose signature takes one
   * (`void congo_sprite_custom_w(address_space &space, ...)`). The space is the
   * one belonging to the CPU whose map reached the handler, so the board
   * resolves it by tag rather than handing out a single global bus.
   */
  addressSpace?: (cpuTag?: string) => unknown;
  /** Device-finder members whose calls must resolve only to concrete hardware. */
  concreteDeviceMembers?: ReadonlySet<string>;
  /**
   * Widths MAME declared for the driver state class's own members.
   *
   * A fixed C array is allocated as the matching typed array, so an indexed
   * write wraps the way the declaration does: the Game Boy's
   * `uint8_t m_gb_io[0x10]` counted TIMECNT past 255 in a plain JS array and
   * never came back to zero, which is the one event that raises its timer
   * interrupt.
   */
  stateMembers?: readonly GeneratedStateMember[];
}

export interface GeneratedLValue {
  readonly generatedLValue: true;
  get(): unknown;
  set(value: unknown): void;
}

export type GeneratedCallArgument = unknown | GeneratedLValue;

interface ExecutionContext {
  bindings: GeneratedHandlerBindings;
  locals: Record<string, unknown>;
  localTypes: Record<string, string | undefined>;
}

interface RuntimeReference {
  reference: string;
  /** A device finder target known to exist in the generated machine. */
  resolved?: true;
}

interface GeneratedPointer {
  readonly generatedPointer: true;
  readonly source?: unknown;
  readonly offset: number;
  readonly target?: GeneratedLValue;
}

interface ExecutionResult {
  control?: 'return' | 'break' | 'continue';
  value?: unknown;
}

interface PreparedMachineCalls {
  /** the host call names the compiled handlers reach (BoardIr.compiledHandlerLinks) */
  linkKeys: readonly string[];
  referenceCalls: NonNullable<GeneratedHandlerBindings['referenceCalls']>;
  callParameters: NonNullable<GeneratedHandlerBindings['callParameters']>;
  concreteDeviceMembers: ReadonlySet<string>;
  /**
   * The bindings.referenceCalls object this table was seeded from. Board
   * construction replaces bindings.referenceCalls when the video package
   * merges its framework calls (tilemap dirty marking and kin); a snapshot
   * seeded before that merge must be rebuilt, not reused, or those calls
   * silently no-op for every later handler (Mario's palette_bank_w).
   */
  seededFrom: GeneratedHandlerBindings['referenceCalls'];
  /**
   * The bindings.constants object this table was seeded from, guarding the
   * per-handler binding views below for the same reason as seededFrom: board
   * construction can replace the constant table while wiring a source-defined
   * device interface.
   */
  seededConstants: GeneratedHandlerBindings['constants'];
  /** The bindings.calls object the emitted-handler namespace was flattened from. */
  seededCalls: GeneratedHandlerBindings['calls'];
  /**
   * One binding view per handler, reused for the life of the board.
   *
   * These used to be rebuilt on every invocation, which allocated two objects
   * per generated call and — because the compiled-program cache is keyed by
   * binding identity — guaranteed that cache could never hit. A per-scanline
   * renderer such as 1942's calls its sprite handler thousands of times a
   * frame, so it recompiled thousands of closure trees a frame and threw all
   * of them away.
   */
  handlerBindings: WeakMap<GeneratedHandler, GeneratedHandlerBindings>;
  /** Execution context for this board's emitted handlers, built on first use. */
  runtime?: GeneratedHandlerRuntime;
}

const MACHINE_CALL_CACHE = new WeakMap<
  BoardIr,
  WeakMap<GeneratedHandlerBindings, Map<string, PreparedMachineCalls>>
>();
const MACHINE_CALL_STACK: string[] = [];
const GENERATED_LOOP_ITERATION_LIMIT = 1_048_576;

function generatedLoopLimitError(kind: string, context: ExecutionContext): Error {
  const callPath = MACHINE_CALL_STACK.length > 0
    ? ` in ${MACHINE_CALL_STACK.join(' -> ')}`
    : '';
  const locals = Object.entries(context.locals)
    .filter(([, value]) => typeof value === 'number' || typeof value === 'boolean')
    .map(([name, value]) => `${name}=${String(value)}`)
    .join(', ');
  return new Error(
    `generated handler ${kind} loop exceeded ${GENERATED_LOOP_ITERATION_LIMIT} iterations${callPath}`
      + (locals ? ` (${locals})` : ''),
  );
}

export const DEFAULT_CONSTANTS: Record<string, number> = {
  ASSERT_LINE: 1,
  CLEAR_LINE: 0,
  HOLD_LINE: 2,
  // emu/disound.h: a sound device's every output at once. Gauntlet's mixer_w
  // sets each chip's gain with it; unresolved it read 0, so only a YM2151's
  // first output was ever turned down (#194).
  ALL_OUTPUTS: 65535,
  'filter_rc_device::LOWPASS_3R': 0,
  'filter_rc_device::LOWPASS': 2,
  'filter_rc_device::HIGHPASS': 3,
  'filter_rc_device::AC': 4,
  INPUT_LINE_IRQ0: 0,
  INPUT_LINE_NMI: -1,
  INPUT_LINE_RESET: -2,
  INPUT_LINE_HALT: -3,
  M6801_IRQ1_LINE: 0,
  M6801_IS3_LINE: 2,
  M6802_IRQ_LINE: 0,
  M6805_IRQ_LINE: 0,
  M68705_IRQ_LINE: 0,
  M68705_INT_TIMER: 1,
  M6809_IRQ_LINE: 0,
  M6809_FIRQ_LINE: 1,
  KONAMI_IRQ_LINE: 0,
  KONAMI_FIRQ_LINE: 1,
  'm6502_device::IRQ_LINE': 0,
  'm6502_device::NMI_LINE': -1,
  // The SO pin, as the generated 6502 numbers it (V_LINE = INPUT_LINE_IRQ0 +
  // 16 in m6502.h): the 1541's gate array raises it for every byte read.
  'm6502_device::V_LINE': 16,
  // emu/machine.h's machine_phase, which running_machine::phase() answers. A
  // device ignores a port write while MAME is still resetting: the 1541's
  // VIA port B handler drives the spindle motor and stepper only when RUNNING.
  'machine_phase::PREINIT': 0,
  'machine_phase::INIT': 1,
  'machine_phase::RESET': 2,
  'machine_phase::RUNNING': 3,
  'machine_phase::EXIT': 4,
  // emu/diimage.h's image_error, what an image load answers with when it
  // fails: the C64's quickload rejects a .t64 without its header this way.
  'image_error::INTERNAL': 1,
  'image_error::UNSUPPORTED': 2,
  'image_error::INVALIDIMAGE': 3,
  'image_error::INVALIDLENGTH': 4,
  'image_error::ALREADYOPEN': 5,
  'image_error::NOSOFTWARE': 6,
  'image_error::BADSOFTWARE': 7,
  'image_error::UNSPECIFIED': 8,
  M6502_IRQ_LINE: 0,
  M6502_NMI_LINE: -1,
  M6502_SET_OVERFLOW: 16,
  M68K_IRQ_1: 1,
  M68K_IRQ_2: 2,
  M68K_IRQ_3: 3,
  M68K_IRQ_4: 4,
  M68K_IRQ_5: 5,
  M68K_IRQ_6: 6,
  M68K_IRQ_7: 7,
  M68K_IRQ_IPL0: 0,
  M68K_IRQ_IPL1: 1,
  M68K_IRQ_IPL2: 2,
  MCS48_INPUT_EA: 1,
  TILE_FLIPX: 1,
  TILE_FLIPY: 2,
  TILEMAP_FLIPX: 1,
  TILEMAP_FLIPY: 2,
  TILEMAP_DRAW_OPAQUE: 0x80,
  // <numbers>: the speaker's sinc kernel steps by `std::numbers::pi / 2 / 4`.
  'std::numbers::pi': Math.PI,
  'attotime::never': Infinity,
  // emu/attotime.h: attoseconds are carried as plain numbers.
  ATTOSECONDS_PER_SECOND: 1e18,
  ATTOSECONDS_PER_MILLISECOND: 1e15,
  ATTOSECONDS_PER_MICROSECOND: 1e12,
  ATTOSECONDS_PER_NANOSECOND: 1e9,
  'attotime::zero': 0,
};

export function executeGeneratedHandler(
  program: GeneratedHandlerProgram,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown> = {},
): number | undefined {
  const result = executeGeneratedProgram(program, bindings, args);
  return result.returned && result.value !== undefined ? toNumber(result.value) : undefined;
}

export function executeGeneratedProgram(
  program: GeneratedHandlerProgram,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown> = {},
  /**
   * Whether the MAME handler parameters (`offset`, `data`, ...) default to 0.
   * A struct's own method has none: ymfm's `ymfm_output::clear()` writes its
   * field `data`, which a defaulted local of the same name hid.
   */
  handlerDefaults = true,
): { returned: boolean; value?: unknown } {
  if (program.diagnostics.length) {
    throw new Error(`cannot execute handler with compiler diagnostics: ${program.diagnostics.join('; ')}`);
  }
  const context: ExecutionContext = {
    bindings,
    locals: handlerDefaults ? {
      ...args,
      addr: args.addr ?? 0,
      offset: args.offset ?? 0,
      data: args.data ?? 0,
      state: args.state ?? args.data ?? 0,
    } : { ...args },
    localTypes: {},
  };
  // Only the absence of a compiled form falls back: a compiled program that
  // ends without an explicit `return` yields undefined, and treating that as
  // "not compiled" would run the whole program twice.
  const fast = compiledProgram(program, bindings, new Set(Object.keys(context.locals)));
  const result = fast
    ? (fast(context) ?? EMPTY_RESULT)
    : executeOperations(program.operations, context);
  return result.control === 'return'
    ? { returned: true, ...(result.value !== undefined ? { value: result.value } : {}) }
    : { returned: false };
}

const EMPTY_RESULT: ExecutionResult = {};

/**
 * One compiled closure tree per program, reused for the life of the board.
 *
 * Keyed by program *and* bindings: a closure captures the dictionaries it
 * resolved against, so sharing one across boards would read another machine's
 * state. compileFastOperations returns undefined for anything it cannot
 * express, which falls back to the interpreter unchanged.
 */
const COMPILED_PROGRAMS = new WeakMap<
  GeneratedHandlerProgram,
  WeakMap<object, FastOperation | null>
>();

function compiledProgram(
  program: GeneratedHandlerProgram,
  bindings: GeneratedHandlerBindings,
  locals: ReadonlySet<string>,
): FastOperation | undefined {
  let byBindings = COMPILED_PROGRAMS.get(program);
  if (!byBindings) {
    byBindings = new WeakMap();
    COMPILED_PROGRAMS.set(program, byBindings);
  }
  const cached = byBindings.get(bindings);
  if (cached !== undefined) return cached ?? undefined;
  const compiled = compileFastOperations(program.operations, bindings, locals) ?? null;
  byBindings.set(bindings, compiled);
  return compiled ?? undefined;
}




export function executeGeneratedCallbackHandler(
  machine: BoardIr,
  callbackOrId: GeneratedCallback | string,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown> = {},
): number | undefined {
  const callback = typeof callbackOrId === 'string'
    ? machine.callbacks.find(candidate => candidate.id === callbackOrId)
    : callbackOrId;
  if (!callback?.targetClass || !callback.targetMethod) return undefined;
  const handler = machine.handlers?.find(candidate =>
    candidate.ownerClass === callback.targetClass &&
    candidate.method === callback.targetMethod &&
    candidate.program &&
    candidate.program.diagnostics.length === 0);
  return handler?.program
    ? executeGeneratedMachineHandler(machine, handler, bindings, args)
    : undefined;
}

export function generatedPeriodicLines(
  machine: BoardIr,
  ownerTag: string,
  refreshHz: number,
  vtotal: number,
): number[] {
  const callback = machine.callbacks.find(candidate =>
    candidate.ownerTag === ownerTag &&
    candidate.signal === 'set_periodic_int' &&
    candidate.periodHz !== undefined,
  );
  if (!callback?.periodHz || refreshHz <= 0 || vtotal <= 0) return [];
  const eventsPerFrame = callback.periodHz / refreshHz;
  const rounded = Math.round(eventsPerFrame);
  if (rounded <= 0 || Math.abs(eventsPerFrame - rounded) > 0.1) return [];
  return Array.from({ length: rounded }, (_, index) =>
    Math.floor(index * vtotal / rounded));
}


/**
 * Report a call that resolved to nothing to whoever is listening: a census
 * (tools/unresolved-calls.ts) records it, the acceptance harness fails on one
 * nobody has accounted for. With no listener it is the old silent 0 or
 * unresolved reference, which a browser keeps so a player's game never stops
 * on a gap the contracts did not reach (#178). Emitted code reports through
 * the same hook (src/mame/device-codegen.ts fallbackLink).
 */
function noteUnresolvedCall(name: string): void {
  (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.(name);
}

/**
 * Resolve the call names emitted code uses into one fast-mode table.
 *
 * The bindings' `calls` dictionary is large enough that V8 keeps it in
 * dictionary mode, so each constant-key read is a hash probe; the C64's memory
 * path made a dozen per bus access and spent a third of its frame on them. A
 * table holding only the names a module reaches is a small fast object, and a
 * constant-key read of it is an inline-cached load.
 */
export function buildCallLinks(
  calls: Record<string, unknown> | undefined,
  keys: readonly string[],
): Record<string, ((...args: any[]) => unknown) | undefined> {
  // Built in one step on purpose: adding this many named properties to an
  // object one keyed store at a time trips V8's fast-properties soft limit
  // and hands back a dictionary-mode object -- exactly the thing the table
  // exists to avoid. Object.fromEntries keeps it a fast-mode object.
  return Object.fromEntries(keys.map(key =>
    [key, calls?.[key] as ((...args: any[]) => unknown) | undefined]));
}

/**
 * Bumped whenever a host binding changes after construction (bindCall, a
 * device's connectCall refresh), so every prepared handler runtime rebuilds
 * its links table on its next dispatch instead of calling a stale target.
 */
export let callLinksGeneration = 0;
export function noteCallLinksChanged(): void {
  callLinksGeneration++;
}

/** The handler runtime with its links table current for this dispatch. */
function currentHandlerRuntime(
  prepared: PreparedMachineCalls,
  bindings: GeneratedHandlerBindings,
): GeneratedHandlerRuntime & { linksGeneration?: number } {
  const runtime = preparedHandlerRuntime(prepared, bindings) as GeneratedHandlerRuntime & { linksGeneration?: number };
  if (runtime.linksGeneration !== callLinksGeneration) {
    // A board whose module declares no link list (one emitted before the
    // table existed, or a harness attaching handlers by hand) keeps reading
    // the calls dictionary: an empty table would make every call look unbound.
    runtime.links = prepared.linkKeys.length ? buildCallLinks(runtime.calls, prepared.linkKeys) : undefined;
    runtime.linksGeneration = callLinksGeneration;
  }
  return runtime;
}

/** One handler's compiled dispatch, resolved once rather than per bus access. */
interface HandlerDispatch {
  machine: BoardIr;
  compiled: GeneratedCompiledHandler | undefined;
  names: string[];
}
const HANDLER_DISPATCH = new WeakMap<GeneratedHandler, HandlerDispatch>();

function handlerDispatch(machine: BoardIr, handler: GeneratedHandler): HandlerDispatch {
  const cached = HANDLER_DISPATCH.get(handler);
  if (cached && cached.machine === machine &&
      cached.compiled === machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`]) return cached;
  const created: HandlerDispatch = {
    machine,
    compiled: machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`],
    names: parameterNames(handler.parameters),
  };
  HANDLER_DISPATCH.set(handler, created);
  return created;
}

export function executeGeneratedMachineProgram(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown>,
): { returned: boolean; value?: unknown } {
  const { compiled, names } = handlerDispatch(machine, handler);
  if (compiled) {
    const prepared = preparedMachineCalls(machine, bindings, handler.ownerClass);
    const value = compiled(
      currentHandlerRuntime(prepared, bindings),
      // An interpreted caller passes every C++ reference parameter as an
      // l-value standing in for its storage. Emitted code reads those by value
      // — a renderer mutates what `bitmap_ind16 &bitmap` points at without ever
      // reassigning it — so the referent is what it must receive. Handlers that
      // do assign through a reference are excluded from codegen precisely so
      // that this unwrapping is always the right thing to do.
      ...names.map(name => {
        const argument = args[name];
        if (argument === undefined) return 0;
        return isLValue(argument) ? argument.get() : argument;
      }),
    );
    return value === undefined ? { returned: false } : { returned: true, value };
  }
  return executeGeneratedProgram(
    handler.program!,
    machineHandlerBindings(machine, handler, bindings),
    args,
  );
}

/**
 * The execution context emitted handler code runs against, built once per
 * prepared call table.
 *
 * `invoke` reaches generated handlers first, matching the interpreter's own
 * precedence: a driver method the emitter chose not to compile must still run,
 * and it must be the same one an interpreted caller would have reached.
 */
function preparedHandlerRuntime(
  prepared: PreparedMachineCalls,
  bindings: GeneratedHandlerBindings,
): GeneratedHandlerRuntime {
  if (prepared.runtime) return prepared.runtime;
  // eslint-disable-next-line prefer-const -- `runtime` is referenced by its own
  // `writableMember`, which resolves through `member` exactly as the
  // interpreter does before deciding to allocate.
  let runtime: GeneratedHandlerRuntime;
  // The interpreter resolves an identifier call through referenceCalls first
  // and the board's host calls second — `rectangle` is a video-package
  // reference call while `flip_screen` is a board call, and a renderer uses
  // both. Emitted code reads one dictionary, so it is handed that same
  // namespace in that same precedence.
  //
  // Flattened rather than proxied because this is the renderer's hot path, and
  // taken here rather than at board construction because both dictionaries are
  // fully wired by the time any handler runs. Replacing either rebuilds the
  // prepared table, and this runtime with it.
  const calls = Object.create(bindings.calls ?? null) as Record<
    string,
    (...args: unknown[]) => unknown
  >;
  for (const name in prepared.referenceCalls) {
    calls[name] = prepared.referenceCalls[name]!;
  }
  // Every emitted board handler reads `runtime.members`, `runtime.links` and
  // `runtime.readIndex` on each call, so this object must stay in V8's fast
  // mode. An object literal carrying an accessor is built as a dictionary
  // (every one of those reads was a hash probe -- a third of a C64 bus read),
  // so the fields are plain data, the links slots exist from the start rather
  // than being added later, and the one accessor is defined afterwards.
  const fields = {
    members: bindings.members ??= {},
    calls,
    links: undefined as GeneratedHandlerRuntime['links'],
    // Through the prepared namespace: a board's own handlers (Qix's
    // deferred_sndpia1_porta_w) are prepared calls, not raw bindings.
    synchronize: (callback: string, parameter: unknown) =>
      generatedSynchronize(bindings, callback, parameter, prepared.referenceCalls),
    linksGeneration: undefined as number | undefined,
    // Memory a handler indexes is almost always a typed array (RAM, a ROM
    // region, a share); answer it before the pointer and reference probes,
    // which on a typed array are two prototype-chain misses per access.
    readIndex: (value: unknown, index: number) => ArrayBuffer.isView(value)
      ? (value as Uint8Array)[index] ?? 0
      : isGeneratedPointer(value)
        ? pointerValue(value, index)
        : indexValue(value, index),
    writeIndex: (value, index, next) => {
      if (isGeneratedPointer(value)) setPointerValue(value, index, next);
      else if (ArrayBuffer.isView(value)) (value as Uint8Array)[index] = toNumber(next);
      else if (value && typeof value === 'object') {
        (value as Record<number, unknown>)[index] = next;
      }
      return next;
    },
    addressOf: (value, index) => isGeneratedPointer(value)
      ? {
        generatedPointer: true,
        source: value.source as ArrayLike<number> & { [index: number]: number },
        offset: value.offset + index,
      }
      : {
        generatedPointer: true,
        source: value as ArrayLike<number> & { [index: number]: number },
        offset: index,
      },
    dereference: dereferenceGeneratedValue,
    // A `u16*`/`s16*` declaration over byte memory is a reinterpreting view,
    // not a copy -- the same rule compilePackedPointerView applies on the
    // interpreted path. Emitted code dropped it, so a byte-backed sprite RAM
    // written a half-word at a time (wardner's wardner_sprite_w) stored the
    // low byte at the word index and lost every high byte.
    packedView: generatedPackedView,
    byteView: generatedByteView,
    container: generatedContainerAccessor,
    stringMethod: generatedStringCall,
    pointerStore: generatedPointerStore,
    add: generatedAdd,
    subtract: generatedSubtract,
    resize: resizeGeneratedContainer,
    attotime: (seconds: number, method: string, ...args: number[]) => attotimeSecondsMethod(seconds, method, args) ?? 0,
    wide: wideBinary,
    invoke: (name, ...args) => prepared.referenceCalls[name]?.(...args) ??
      bindings.calls?.[name]?.(...args.map(toNumber)) ?? 0,
    macro: (name, ...args) => generatedMacroCall(name, args),
    combineData: applyCombineData,
    divide: applyGeneratedDivision,
    shiftRight: applyGeneratedShiftRight,
    same: generatedValuesEqual,
    andAssign: applyGeneratedAndAssign,
    and: applyGeneratedAnd,
    // The board's state object only holds what a handler has written, so a
    // read can miss three things the interpreter resolves: a declared getter,
    // a member whose stored value is undefined, and a device finder, which
    // answers as a resolved reference and is therefore truthy. Emitted code
    // reaches this only when `members.<name>` is absent, so the fast path
    // stays a plain property read.
    // The container an indexed write stores into, materialised on first use
    // exactly as `writableIndexObject` does for the interpreter. A board's
    // state object only holds what a handler has already written, so without
    // this an emitted `m_gb_io[0] = ...` stored into nothing.
    //
    // It resolves through the ordinary member read first: a member the board
    // exposes through a getter, or one already holding memory, is returned as
    // it stands. Only a name that resolves to nothing indexable is allocated,
    // which is the one case the interpreter allocates for too.
    writableMember: name => {
      const current = bindings.members?.[name] ?? runtime.member(name);
      if (isIndexableMemory(current) || isGeneratedPointer(current)) return current;
      if (current && typeof current === 'object') return current;
      const members = bindings.members ??= {};
      const allocated = declaredStateArray(bindings, name) ?? [];
      members[name] = allocated;
      return allocated;
    },
    member: name => {
      const getter = bindings.getters?.[name];
      if (getter) return getter();
      // Presence is a value, not a key: the board pre-declares every state
      // name as `undefined` so V8 keeps the state object in fast mode, and an
      // own-key test then answered "present, undefined" for a device finder or
      // a reference that has to resolve further down. Double Dragon's ADPCM,
      // Kung-Fu Master's MSM5205s and Q*bert's whole sound board went silent
      // on exactly that.
      const value = bindings.members?.[name];
      if (value !== undefined) return value;
      if (bindings.referenceCalls?.[name]) return bindings.referenceCalls[name];
      // The device set lives on the prepared table, not on the bindings this
      // runtime closes over: an interpreted handler gets it grafted on per
      // call (see preparedHandlerBindings), so reading it off `bindings` here
      // found nothing and made every device finder falsy — bublbobl then
      // skipped `if (m_ym2203) m_ym2203->reset()` and lost two chip resets.
      return prepared.concreteDeviceMembers?.has(name)
        ? { reference: name, resolved: true }
        : 0;
    },
    overrides: bindings.referenceCalls ?? {},
    memberCall: (object, property, direct, bare) => (...args) => {
      if (object == null) return bare?.(...args) ?? 0;
      const target = (direct ? object : dereferenceGeneratedValue(object)) as Record<string, unknown>;
      const value = target[property] as ((...values: unknown[]) => unknown) | number | boolean | undefined;
      if (args.length) return (value == null ? undefined : (value as (...values: unknown[]) => unknown).apply(target, args)) ?? 0;
      if (typeof value === 'function') return value.call(target);
      if (typeof value === 'number' || typeof value === 'boolean') return value;
      return generatedContainerAccessor(object, property);
    },
  } satisfies Omit<GeneratedHandlerRuntime, 'palette'> & { linksGeneration?: number };
  // A board handler has no palette of its own: every read is a fresh scratch
  // array, as it always was.
  prepared.runtime = runtime = Object.defineProperty(fields, 'palette', {
    get: () => [],
    enumerable: true,
  }) as typeof fields & Pick<GeneratedHandlerRuntime, 'palette'>;
  return runtime;
}

/**
 * The binding view a generated handler executes against, built once per
 * handler and reused.
 *
 * It layers over the board's own binding object rather than copying it. Board
 * construction merges the video package's members into that same object after
 * the first handlers have already run, and a copy would freeze every later
 * handler on the pre-merge view.
 */
function machineHandlerBindings(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): GeneratedHandlerBindings {
  const prepared = preparedMachineCalls(machine, bindings, handler.ownerClass);
  const cached = prepared.handlerBindings.get(handler);
  if (cached) return cached;
  const suffix = /_(\d+)$/.exec(handler.method);
  const created: GeneratedHandlerBindings = Object.assign(
    Object.create(bindings) as GeneratedHandlerBindings,
    {
      constants: {
        ...handler.constants,
        ...bindings.constants,
        ...(suffix ? { Which: Number(suffix[1]) } : {}),
      },
      referenceCalls: prepared.referenceCalls,
      callParameters: prepared.callParameters,
      concreteDeviceMembers: prepared.concreteDeviceMembers,
    },
  );
  prepared.handlerBindings.set(handler, created);
  return created;
}

function preparedMachineCalls(
  machine: BoardIr,
  bindings: GeneratedHandlerBindings,
  ownerClass: string,
): PreparedMachineCalls {
  let byBindings = MACHINE_CALL_CACHE.get(machine);
  if (!byBindings) {
    byBindings = new WeakMap();
    MACHINE_CALL_CACHE.set(machine, byBindings);
  }
  let byOwner = byBindings.get(bindings);
  if (!byOwner) {
    byOwner = new Map();
    byBindings.set(bindings, byOwner);
  }
  const cached = byOwner.get(ownerClass);
  if (
    cached &&
    cached.seededFrom === bindings.referenceCalls &&
    cached.seededConstants === bindings.constants &&
    cached.seededCalls === bindings.calls
  ) return cached;

  const compiled = (machine.handlers ?? []).filter(candidate =>
    candidate.program && candidate.program.diagnostics.length === 0);
  // Prototype-chained views over the live binding dictionaries: cross-handler
  // delegates layer on top while later additions (video framework calls merged
  // after board construction) stay visible without invalidating this cache.
  const referenceCalls = Object.create(bindings.referenceCalls ?? null) as NonNullable<
    GeneratedHandlerBindings['referenceCalls']
  >;
  const callParameters = Object.create(bindings.callParameters ?? null) as NonNullable<
    GeneratedHandlerBindings['callParameters']
  >;
  const resolve = (method: string): GeneratedHandler | undefined =>
    compiled.find(candidate => candidate.ownerClass === ownerClass && candidate.method === method) ??
    compiled.find(candidate => candidate.method === method);
  const invoke = (target: GeneratedHandler, values: GeneratedCallArgument[]): unknown => {
    const key = `${target.ownerClass}.${target.method}`;
    if (MACHINE_CALL_STACK.length >= 64) {
      throw new Error(
        `generated handler call depth exceeded 64: ${[...MACHINE_CALL_STACK, key].join(' -> ')}`,
      );
    }
    const names = parameterNames(target.parameters);
    MACHINE_CALL_STACK.push(key);
    try {
      // The compiled ABI dereferences every argument, so a callee with a C++
      // reference parameter stays on the interpreted path: that is the only
      // one that keeps the caller's lvalue intact and lets the callee's
      // writes land back in the caller's member.
      const executable = hasReferenceParameter(target.parameters)
        ? undefined
        : machine.compiledHandlers?.[key];
      if (executable) {
        // Cross-component bus calls already arrive in parameter order. Keep
        // that ABI instead of allocating a locals dictionary only to unpack
        // it again in executeGeneratedMachineProgram on every memory access.
        const runtime = currentHandlerRuntime(
          preparedMachineCalls(machine, bindings, target.ownerClass), bindings,
        );
        return executable(runtime, ...names.map((_, index) =>
          generatedReferent(values[index] ?? 0))) ?? 0;
      }
      return executeGeneratedMachineProgram(
        machine,
        target,
        bindings,
        Object.fromEntries(names.map((name, index) => [name, values[index] ?? 0])),
      ).value ?? 0;
    } finally {
      MACHINE_CALL_STACK.pop();
    }
  };
  for (const candidate of compiled) {
    const qualified = `${candidate.ownerClass}.${candidate.method}`;
    // C++ spelling as well as the board's own. An explicit base call is
    // recorded exactly as the source writes it -- `base_state::machine_reset`
    // -- and it must reach that implementation rather than resolving by bare
    // name into the override that called it.
    const scoped = `${candidate.ownerClass}::${candidate.method}`;
    if (!referenceCalls[qualified]) {
      referenceCalls[qualified] = (...values) => invoke(candidate, values);
    }
    if (!referenceCalls[scoped]) {
      referenceCalls[scoped] = (...values) => invoke(candidate, values);
    }
    for (const alias of candidate.finderAliases ?? []) {
      // A gap filler only: a runtime that already binds the call (a family
      // package, a composed device's own bridge) keeps it. Checked at call time
      // because those bindings land after this table is prepared.
      referenceCalls[alias] ??= (...values) => {
        const bound = bindings.calls?.[alias];
        return bound ? bound(...values.map(callArgument)) : invoke(candidate, values);
      };
      callParameters[alias] = splitParameters(candidate.parameters ?? '');
    }
    if (!referenceCalls[candidate.method]) {
      referenceCalls[candidate.method] = (...values) => {
        const target = resolve(candidate.method);
        return target ? invoke(target, values) : 0;
      };
    }
    const parameters = splitParameters(candidate.parameters ?? '');
    callParameters[qualified] = parameters;
    callParameters[scoped] = parameters;
    callParameters[candidate.method] = parameters;
  }
  // device_image_interface on a device the board composes: nothing is ever
  // mounted on one, so `is_loaded()` and `exists()` answer false, as MAME's do
  // with no image given. Unanswered, the Neo Geo memory card's `present()`
  // returned an unresolved reference, which emitted code read as a card in
  // the slot.
  if ((machine.devices ?? []).some(device => device.imageInterface && device.classHierarchy?.includes(ownerClass))) {
    referenceCalls.is_loaded ??= () => 0;
    referenceCalls.exists ??= () => 0;
  }
  // A device_delegate the owning device calls by member name. MAME writes the
  // two halves apart -- the driver names the device's setter, the device calls
  // the member that setter assigned -- and the callee's parameter list has to
  // travel with the binding: wardner's DSP addresses host RAM entirely through
  // `u32 &seg` / `u32 &addr` out-parameters, and a caller that cannot see they
  // are references passes values and drops every write the callee makes.
  for (const callback of machine.callbacks ?? []) {
    if (!callback.delegate || !callback.member || !callback.targetMethod) continue;
    const target = compiled.find(candidate =>
      candidate.ownerClass === callback.targetClass &&
      candidate.method === callback.targetMethod);
    if (!target) continue;
    callParameters[callback.member] ??= splitParameters(target.parameters ?? '');
    referenceCalls[callback.member] ??= (...values) => invoke(target, values);
  }
  // A configured custom device can be a source-defined composite rather than
  // a primitive supplied by the runtime. Bind its finder member to methods on
  // the matching MAME device class (TIMEPLT_AUDIO -> timeplt_audio_device),
  // while leaving unrelated same-named hardware methods strictly isolated.
  const classStem = (value: string): string =>
    value.replace(/_device$/, '').replace(/[^A-Za-z0-9]/g, '').toLowerCase();
  for (const device of machine.devices ?? []) {
    if (!device.member) continue;
    const deviceStem = classStem(device.type);
    for (const candidate of compiled) {
      if (classStem(candidate.ownerClass) !== deviceStem) continue;
      const memberMethod = `${device.member}.${candidate.method}`;
      if (!referenceCalls[memberMethod] && !bindings.calls?.[memberMethod]) {
        referenceCalls[memberMethod] = (...values) => invoke(candidate, values);
      }
    }
  }
  const prepared = {
    referenceCalls,
    callParameters,
    concreteDeviceMembers: new Set(
      (machine.devices ?? []).flatMap(device => device.member ? [device.member] : []),
    ),
    seededFrom: bindings.referenceCalls,
    seededConstants: bindings.constants,
    seededCalls: bindings.calls,
    handlerBindings: new WeakMap<GeneratedHandler, GeneratedHandlerBindings>(),
    linkKeys: machine.compiledHandlerLinks ?? [],
  } as PreparedMachineCalls;
  byOwner.set(ownerClass, prepared);
  return prepared;
}

/**
 * Resolve one machine handler's dispatch once, ahead of the calls.
 *
 * A handler on a per-instruction signal runs seventeen thousand times a frame
 * — the LR35902 calls the Game Boy's `gb_timer_callback` after every
 * instruction — and re-resolving its compiled function, its prepared call
 * table, its runtime and its parameter list on each of those cost more than
 * the handler body did. All four are stable for the life of a board: the
 * compiled table is attached when the generated module loads, and the prepared
 * table is keyed on binding identity, which never changes.
 *
 * Built on first call rather than eagerly, so a handler nothing signals costs
 * nothing.
 */
export function prepareGeneratedMachineHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): (args: Record<string, unknown>) => number | undefined {
  let dispatch: ((args: Record<string, unknown>) => number | undefined) | undefined;
  return args => (dispatch ??= buildGeneratedMachineDispatch(machine, handler, bindings))(args);
}

/** Positional ABI for a host that already supplies the source signature.
 * Bind lazily because board construction installs services after bus handlers.
 */
export function prepareGeneratedMachineCall(
  machine: BoardIr, handler: GeneratedHandler, bindings: GeneratedHandlerBindings,
): (...args: unknown[]) => unknown {
  let call: ((...args: unknown[]) => unknown) | undefined;
  return (...args) => {
    if (!call) {
      const compiled = machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`];
      if (compiled) call = compiled.bind(undefined,
        preparedHandlerRuntime(preparedMachineCalls(machine, bindings, handler.ownerClass), bindings));
      else {
        const names = parameterNames(handler.parameters);
        const dispatch = buildGeneratedMachineDispatch(machine, handler, bindings);
        call = (...values) => dispatch(Object.fromEntries(names.map((name, index) => [name, values[index]])));
      }
    }
    return call(...args);
  };
}

/**
 * prepareGeneratedMachineCall for a bus read, `(offset)`, which runs on every
 * access the processor makes: the emitted method is called directly, with no
 * rest-argument wrapper and no bound-function trampoline in between. A handler
 * with no emitted body takes the general path.
 *
 * Resolved on first use, since board construction installs services after bus
 * handlers, and the runtime is re-resolved whenever a host binding changes, so
 * its links table never outlives the bindings it was built from.
 */
export function prepareGeneratedMachineRead(
  machine: BoardIr, handler: GeneratedHandler, bindings: GeneratedHandlerBindings,
): (offset: number) => unknown {
  let compiled: GeneratedCompiledHandler | undefined;
  let runtime: (GeneratedHandlerRuntime & { linksGeneration?: number }) | undefined;
  let general: ((...args: unknown[]) => unknown) | undefined;
  return offset => {
    if (runtime !== undefined && runtime.linksGeneration === callLinksGeneration) {
      return compiled!(runtime, offset);
    }
    if (general) return general(offset);
    compiled ??= machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`];
    if (!compiled) return (general = prepareGeneratedMachineCall(machine, handler, bindings))(offset);
    runtime = currentHandlerRuntime(preparedMachineCalls(machine, bindings, handler.ownerClass), bindings);
    return compiled(runtime, offset);
  };
}

/**
 * The write counterpart of prepareGeneratedMachineRead, for an emitted handler
 * taking exactly `(offset, data)`: the bus calls it on every store, and the
 * general path built a named argument record per write to read it back by
 * name. Undefined when the handler has no emitted body.
 */
export function prepareGeneratedMachineWrite(
  machine: BoardIr, handler: GeneratedHandler, bindings: GeneratedHandlerBindings,
): ((offset: number, data: number) => void) | undefined {
  const compiled = machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`];
  if (!compiled) return undefined;
  let runtime: (GeneratedHandlerRuntime & { linksGeneration?: number }) | undefined;
  return (offset, data) => {
    if (runtime === undefined || runtime.linksGeneration !== callLinksGeneration) {
      runtime = currentHandlerRuntime(preparedMachineCalls(machine, bindings, handler.ownerClass), bindings);
    }
    compiled(runtime, offset, data);
  };
}

/**
 * The compiled dispatch with its arguments already in declaration order, for a
 * host that knows each one's value: the board's signal handlers, which
 * otherwise built a named record per delivery only for the dispatch to read it
 * back by name. The 1541's gate array raises BYTE READY six thousand times a
 * frame. Undefined when the handler has no emitted body; the runtime is kept
 * current as for prepareGeneratedMachineRead.
 */
export function prepareGeneratedMachinePositional(
  machine: BoardIr, handler: GeneratedHandler, bindings: GeneratedHandlerBindings,
): ((values: readonly unknown[]) => number | undefined) | undefined {
  const compiled = machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`];
  if (!compiled) return undefined;
  let runtime: (GeneratedHandlerRuntime & { linksGeneration?: number }) | undefined;
  // As buildGeneratedMachineDispatch: an absent argument is 0, and a C++
  // reference arrives as its referent.
  const argument = (value: unknown): unknown =>
    value === undefined ? 0 : isLValue(value) ? value.get() : value;
  return values => {
    if (runtime === undefined || runtime.linksGeneration !== callLinksGeneration) {
      runtime = currentHandlerRuntime(preparedMachineCalls(machine, bindings, handler.ownerClass), bindings);
    }
    const value = values.length === 0 ? compiled(runtime)
      : values.length === 1 ? compiled(runtime, argument(values[0]))
        : compiled(runtime, ...values.map(argument));
    return value === undefined ? undefined : toNumber(value);
  };
}

function buildGeneratedMachineDispatch(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): (args: Record<string, unknown>) => number | undefined {
  const compiled = machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`];
  if (!compiled) {
    const handlerBindings = machineHandlerBindings(machine, handler, bindings);
    const program = handler.program!;
    return args => {
      const result = executeGeneratedProgram(program, handlerBindings, args);
      return result.returned && result.value !== undefined ? toNumber(result.value) : undefined;
    };
  }
  const runtime = preparedHandlerRuntime(
    preparedMachineCalls(machine, bindings, handler.ownerClass),
    bindings,
  );
  const names = parameterNames(handler.parameters);
  const values = new Array<unknown>(names.length);
  return args => {
    // See executeGeneratedMachineProgram for why a reference parameter is
    // handed to emitted code as its referent.
    for (let index = 0; index < names.length; index++) {
      const argument = args[names[index]!];
      values[index] = argument === undefined
        ? 0
        : isLValue(argument) ? argument.get() : argument;
    }
    const value = compiled(runtime, ...values);
    return value === undefined ? undefined : toNumber(value);
  };
}

export function executeGeneratedMachineHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown>,
): number | undefined {
  const result = executeGeneratedMachineProgram(machine, handler, bindings, args);
  return result.returned && result.value !== undefined ? toNumber(result.value) : undefined;
}

/**
 * A handler run as a device_delegate, which answers in its C++ type: a tuple
 * survives -- a quickload's load callback returns std::pair<error, message>,
 * which snapquik.cpp unpacks as `auto [err, message]` -- and anything else is
 * the number executeGeneratedMachineHandler answers.
 */
export function executeGeneratedMachineDelegate(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown>,
): unknown {
  const result = executeGeneratedMachineProgram(machine, handler, bindings, args);
  if (!result.returned || result.value === undefined) return undefined;
  return Array.isArray(result.value) ? result.value : toNumber(result.value);
}

export type CompiledGeneratedMachineHandler = (
  args: Record<string, unknown>,
) => number | undefined;

/**
 * Precompile the common straight-line/conditional handler subset into
 * closures. This is CSP-safe (no eval/new Function) and preserves the generic
 * interpreter as the fallback for loops and other uncommon control flow.
 * Hardware callbacks often execute hundreds of thousands of tiny handlers per
 * second, so removing repeated IR dispatch is material to real-time emulation.
 */
export function compileGeneratedMachineHandler(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
): CompiledGeneratedMachineHandler | undefined {
  if (!handler.program || handler.program.diagnostics.length) return undefined;
  const generatedBindings = machineHandlerBindings(machine, handler, bindings);
  const localNames = new Set([
    ...parameterNames(handler.parameters),
    'addr', 'offset', 'data', 'state',
  ]);
  const executable = compileFastOperations(
    handler.program.operations,
    generatedBindings,
    localNames,
  );
  if (!executable) return undefined;
  return args => {
    const context: ExecutionContext = {
      bindings: generatedBindings,
      locals: {
        ...args,
        addr: args.addr ?? 0,
        offset: args.offset ?? 0,
        data: args.data ?? 0,
        state: args.state ?? args.data ?? 0,
      },
      localTypes: {},
    };
    const result = executable(context);
    return result?.control === 'return' && result.value !== undefined
      ? toNumber(result.value)
      : undefined;
  };
}

type FastOperation = (context: ExecutionContext) => ExecutionResult | undefined;
type FastExpression = (context: ExecutionContext) => unknown;

function compileFastOperations(
  operations: GeneratedHandlerOperation[],
  bindings: GeneratedHandlerBindings,
  inheritedLocals: ReadonlySet<string>,
): FastOperation | undefined {
  const localNames = new Set(inheritedLocals);
  const compiled: FastOperation[] = [];
  for (const operation of operations) {
    if (operation.op === 'declare') {
      localNames.add(operation.name);
      const name = operation.name;
      const valueType = operation.valueType;
      const arrayLength = declaredArrayLength(operation.value);
      if (arrayLength) {
        const length = compileFastExpression(arrayLength, bindings, localNames);
        if (!length) return undefined;
        compiled.push(context => {
          context.localTypes[name] = valueType;
          const size = toNumber(length(context));
          context.locals[name] = allocateDeclaredArray(valueType, size) ??
            new Uint8Array(Math.max(0, Math.trunc(size)));
          return undefined;
        });
        continue;
      }
      const value = operation.value
        ? compileFastExpression(operation.value, bindings, localNames)
        : () => 0;
      const wrap = valueWrapper(valueType);
      compiled.push(context => {
        context.localTypes[name] = valueType;
        context.locals[name] = wrap(value(context));
        return undefined;
      });
      continue;
    }
    if (operation.op === 'assign') {
      const value = compileFastExpression(operation.value, bindings, localNames);
      const store = compileFastAssign(operation.target, operation.operator, bindings, localNames);
      compiled.push(context => {
        store(context, value(context));
        return undefined;
      });
      continue;
    }
    if (operation.op === 'call') {
      const expression = compileFastExpression(operation.expression, bindings, localNames);
      compiled.push(context => { expression(context); return undefined; });
      continue;
    }
    if (operation.op === 'return') {
      const value = operation.value
        ? compileFastExpression(operation.value, bindings, localNames)
        : undefined;
      compiled.push(context => ({
        control: 'return',
        ...(value ? { value: value(context) } : {}),
      }));
      continue;
    }
    if (operation.op === 'break' || operation.op === 'continue') {
      compiled.push(() => ({ control: operation.op }));
      continue;
    }
    if (operation.op === 'if') {
      const condition = compileFastExpression(operation.condition, bindings, localNames);
      const whenTrue = compileFastOperations(operation.then, bindings, localNames);
      const whenFalse = compileFastOperations(operation.else ?? [], bindings, localNames);
      if (!whenTrue || !whenFalse) return undefined;
      compiled.push(context =>
        (truthy(condition(context)) ? whenTrue : whenFalse)(context));
      continue;
    }
    if (operation.op === 'switch') {
      const subject = compileFastExpression(operation.expression, bindings, localNames);
      const cases = operation.cases.map(entry => ({
        values: entry.values?.map(candidate =>
          compileFastExpression(candidate, bindings, localNames)),
        body: compileFastOperations(entry.body, bindings, localNames),
      }));
      if (cases.some(entry => !entry.body)) return undefined;
      compiled.push(context => {
        const value = toNumber(subject(context));
        let index = cases.findIndex(entry =>
          entry.values?.some(candidate => toNumber(candidate(context)) === value));
        if (index < 0) index = cases.findIndex(entry => !entry.values);
        for (; index >= 0 && index < cases.length; index++) {
          const result = cases[index]!.body!(context);
          if (result?.control === 'return') return result;
          if (result?.control === 'continue') return result;
          if (result?.control === 'break') break;
        }
        return undefined;
      });
      continue;
    }
    if (operation.op === 'for' || operation.op === 'while' || operation.op === 'do-while') {
      // The induction variable is declared inside `initialize`, which compiles
      // in its own scope; it must join this one before the condition, body and
      // step compile, or they resolve it as a binding lookup and never end.
      for (const initializer of operation.op === 'for' ? operation.initialize : []) {
        if (initializer.op === 'declare') localNames.add(initializer.name);
      }
      const initialize = operation.op === 'for'
        ? compileFastOperations(operation.initialize, bindings, localNames)
        : undefined;
      const condition = compileFastExpression(operation.condition, bindings, localNames);
      const body = compileFastOperations(operation.body, bindings, localNames);
      const iterate = operation.op === 'for'
        ? compileFastOperations(operation.iterate, bindings, localNames)
        : undefined;
      if (!body || (operation.op === 'for' && (!initialize || !iterate))) return undefined;
      const kind = operation.op;
      compiled.push(context => {
        if (initialize) {
          const initialized = initialize(context);
          if (initialized?.control) return initialized;
        }
        let iterations = 0;
        const step = (): ExecutionResult | undefined => {
          if (++iterations > GENERATED_LOOP_ITERATION_LIMIT) {
            throw generatedLoopLimitError(kind, context);
          }
          const result = body(context);
          if (result?.control === 'return') return result;
          if (result?.control === 'break') return { control: 'break' };
          if (iterate) {
            const iterated = iterate(context);
            if (iterated?.control === 'return') return iterated;
            if (iterated?.control === 'break') return { control: 'break' };
          }
          return undefined;
        };
        if (kind === 'do-while') {
          do {
            const result = step();
            if (result?.control === 'return') return result;
            if (result?.control === 'break') break;
          } while (truthy(condition(context)));
          return undefined;
        }
        while (truthy(condition(context))) {
          const result = step();
          if (result?.control === 'return') return result;
          if (result?.control === 'break') break;
        }
        return undefined;
      });
      continue;
    }
    return undefined;
  }
  // Indexed rather than iterated: a block body runs once per loop iteration,
  // and a per-scanline renderer runs its innermost block millions of times a
  // second.
  if (compiled.length === 1) return compiled[0]!;
  return context => {
    for (let index = 0; index < compiled.length; index++) {
      const result = compiled[index]!(context);
      if (result?.control) return result;
    }
    return undefined;
  };
}

type FastAssign = (context: ExecutionContext, value: unknown) => void;

/**
 * Assignment with the target shape resolved once.
 *
 * The interpreter re-walks the target expression and re-derives the compound
 * operator on every write. Shapes it does not resolve statically — member,
 * dereference and call targets — keep the interpreter's own store.
 */
function compileFastAssign(
  target: GeneratedExpression,
  operator: string,
  bindings: GeneratedHandlerBindings,
  locals: ReadonlySet<string>,
): FastAssign {
  const combine = compileAssignmentValue(operator);
  if (target.kind === 'identifier') {
    const name = target.name;
    return (context, value) => {
      if (Object.hasOwn(context.locals, name)) {
        const local = context.locals[name];
        // A reference parameter holds an l-value standing in for the caller's
        // storage; its current value is read and written through that.
        const reference = isLValue(local) ? local : undefined;
        const current = reference ? reference.get() ?? local : local;
        // C++ struct assignment copies into the struct, as the interpreter's
        // own store does: ymfm hands its operator map back through
        // `operator_mapping &dest` as `dest = s_fixed_map`.
        if (operator === '=' && copiesStruct(current, value)) {
          copyGeneratedStruct(current, isLValue(value) ? value.get() : value);
          return;
        }
        const wrapped = wrapValue(context.localTypes[name], combine(current, value));
        if (reference) reference.set(wrapped);
        else context.locals[name] = wrapped;
        return;
      }
      const current = context.bindings.getters?.[name]?.() ?? context.bindings.members?.[name];
      if (operator === '=' && copiesStruct(current, value)) {
        copyGeneratedStruct(current, isLValue(value) ? value.get() : value);
        return;
      }
      const next = combine(current, value);
      // Setters exist to apply a member's declared bit width, which is
      // meaningless for a memory container; those store by reference.
      const setter = typeof next === 'number' || typeof next === 'boolean'
        ? context.bindings.setters?.[name]
        : undefined;
      if (setter) setter(toNumber(next));
      else (context.bindings.members ??= {})[name] = next;
    };
  }
  if (target.kind === 'index') {
    const container = compileWritableIndexObject(target.object, bindings, locals);
    const index = compileFastExpression(target.index, bindings, locals);
    return (context, value) => {
      const object = container(context);
      const at = toNumber(index(context));
      const next = combine(indexValue(object, at), value);
      if (isGeneratedPointer(object)) setPointerValue(object, at, next);
      else if (ArrayBuffer.isView(object)) (object as Uint8Array)[at] = toNumber(next);
      else if (Array.isArray(object)) object[at] = next;
    };
  }
  return (context, value) => assign(target, operator, value, context);
}

/**
 * The container an indexed write stores into. The common case is an expression
 * that already evaluates to memory; only a member array that has never been
 * written falls back to the interpreter's materialising form.
 */
function compileWritableIndexObject(
  expression: GeneratedExpression,
  bindings: GeneratedHandlerBindings,
  locals: ReadonlySet<string>,
): FastExpression {
  const read = compileFastExpression(expression, bindings, locals);
  return context => {
    const current = read(context);
    return isIndexableMemory(current) || isGeneratedPointer(current)
      ? current
      : writableIndexObject(expression, context);
  };
}

function compileFastExpression(
  expression: GeneratedExpression,
  bindings: GeneratedHandlerBindings,
  locals: ReadonlySet<string>,
): FastExpression {
  if (expression.kind === 'number') {
    if (expression.wide !== undefined) {
      const wide = BigInt(expression.wide);
      return () => wide;
    }
    return () => expression.value;
  }
  if (expression.kind === 'string') {
    return () => expression.value;
  }
  if (expression.kind === 'identifier') {
    const name = expression.name;
    if (locals.has(name)) {
      return context => {
        const value = context.locals[name];
        return isLValue(value) ? value.get() : value;
      };
    }
    const constantName = name.split('::').at(-1)!;
    // A qualified spelling resolves qualified first (see evaluate).
    const constant = bindings.constants?.[name] ?? DEFAULT_CONSTANTS[name] ??
      bindings.constants?.[constantName] ?? DEFAULT_CONSTANTS[constantName];
    if (constant !== undefined) return () => constant;
    if (name === 'ACCESSING_BITS_0_7') {
      return context => toNumber(context.locals.mem_mask) & 0x00ff ? 1 : 0;
    }
    if (name === 'ACCESSING_BITS_8_15') {
      return context => toNumber(context.locals.mem_mask) & 0xff00 ? 1 : 0;
    }
    // Driver members are materialized lazily as source handlers first touch
    // them. A closure may therefore compile before a member exists (Pole
    // Position's steering accumulators are one example). Resolve at execution
    // time so later writes are visible instead of permanently compiling the
    // identifier as a zero-valued symbolic reference.
    return () => {
      const getter = bindings.getters?.[name];
      if (getter) return getter();
      // A value, not an own key: see preparedHandlerRuntime's member lookup.
      const value = bindings.members?.[name];
      if (value !== undefined) return value;
      if (bindings.referenceCalls?.[name]) return bindings.referenceCalls[name];
      return bindings.concreteDeviceMembers?.has(name)
        ? { reference: name, resolved: true }
        : reference(name);
    };
  }
  if (expression.kind === 'unary') {
    if (expression.operator === '&' || expression.operator === '*') {
      return context => evaluate(expression, context);
    }
    const operand = compileFastExpression(expression.operand, bindings, locals);
    if (expression.operator === '!') return context => truthy(operand(context)) ? 0 : 1;
    if (expression.operator === '~') return context => ~toNumber(operand(context));
    if (expression.operator === '-') return context => -toNumber(operand(context));
    return context => toNumber(operand(context));
  }
  if (expression.kind === 'cast') {
    const operand = compileFastExpression(expression.operand, bindings, locals);
    if (expression.pointer && isBytePointerType(expression.valueType)) return context => generatedByteView(operand(context));
    const view = expression.pointer ? packedCastView(expression.valueType) : undefined;
    if (view !== undefined) return context => packedByteView(operand(context), view);
    const wrap = valueWrapper(expression.valueType);
    return context => wrap(operand(context));
  }
  if (expression.kind === 'binary') {
    const left = compileFastExpression(expression.left, bindings, locals);
    const right = compileFastExpression(expression.right, bindings, locals);
    const operator = expression.operator;
    if (expression.precision === 64) return context => wideBinary(operator, left(context), right(context));
    if (operator === '&&') {
      return context => truthy(left(context)) && truthy(right(context)) ? 1 : 0;
    }
    if (operator === '||') {
      return context => truthy(left(context)) || truthy(right(context)) ? 1 : 0;
    }
    // Equality compares references and pointers structurally, so it never
    // reaches the numeric table.
    if (operator === '==' || operator === '!=') {
      const wantEqual = operator === '==';
      return context =>
        generatedValuesEqual(left(context), right(context)) === wantEqual ? 1 : 0;
    }
    // Division is integral only between integers, so it keeps the
    // interpreter's two exemptions: an attotime operand, and an operand the
    // source wrote as a float. Whether the expression is floating is a
    // property of the source text, so it is settled here rather than per
    // evaluation.
    if (operator === '/') {
      const floating = isFloatingExpression(expression.left) ||
        isFloatingExpression(expression.right);
      const dividend = expression.left;
      return context => {
        const leftValue = toNumber(left(context));
        const rightValue = toNumber(right(context));
        return floating || isAttotimeExpression(dividend, context)
          ? leftValue / rightValue
          : BINARY_OPERATORS['/']!(leftValue, rightValue);
      };
    }
    const apply = BINARY_OPERATORS[operator] ?? UNKNOWN_BINARY;
    // Only + and - can carry pointer arithmetic. Every other operator skips
    // those runtime shape tests entirely.
    if (operator === '+') {
      return context => {
        const leftValue = left(context);
        const rightValue = right(context);
        if (isGeneratedPointer(leftValue)) return offsetPointer(leftValue, toNumber(rightValue));
        if (isIndexableMemory(leftValue)) {
          return { generatedPointer: true, source: leftValue, offset: toNumber(rightValue) };
        }
        if (isGeneratedPointer(rightValue)) return offsetPointer(rightValue, toNumber(leftValue));
        if (typeof leftValue === 'bigint' || typeof rightValue === 'bigint') {
          return wideBinary('+', leftValue, rightValue);
        }
        return toNumber(leftValue) + toNumber(rightValue);
      };
    }
    if (operator === '&') {
      return context => {
        const leftValue = left(context);
        const rightValue = right(context);
        if (isIntersectable(leftValue)) return intersection(leftValue, rightValue);
        return typeof leftValue === 'bigint' || typeof rightValue === 'bigint'
          ? wideBinary('&', leftValue, rightValue)
          : toNumber(leftValue) & toNumber(rightValue);
      };
    }
    if (operator === '-') {
      return context => {
        const leftValue = left(context);
        const rightValue = right(context);
        // As evaluate() does it: two pointers into one array are the count
        // between them. The Z80 DMA numbers its registers that way,
        // `&(_r) - &(WR0)`, and read as a pointer less nothing, every
        // follow byte was written into the register array's own slot.
        if (isGeneratedPointer(leftValue) || isGeneratedPointer(rightValue)) {
          return generatedSubtract(leftValue, rightValue);
        }
        if (typeof leftValue === 'bigint' || typeof rightValue === 'bigint') {
          return wideBinary('-', leftValue, rightValue);
        }
        return toNumber(leftValue) - toNumber(rightValue);
      };
    }
    return context => {
      const leftValue = left(context);
      const rightValue = right(context);
      // A 64-bit operand promotes the operation, exactly as in C.
      return typeof leftValue === 'bigint' || typeof rightValue === 'bigint'
        ? wideBinary(operator, leftValue, rightValue)
        : apply(toNumber(leftValue), toNumber(rightValue));
    };
  }
  if (expression.kind === 'conditional') {
    const condition = compileFastExpression(expression.condition, bindings, locals);
    const whenTrue = compileFastExpression(expression.whenTrue, bindings, locals);
    const whenFalse = compileFastExpression(expression.whenFalse, bindings, locals);
    return context => truthy(condition(context)) ? whenTrue(context) : whenFalse(context);
  }
  if (expression.kind === 'member') {
    const objectExpression = compileFastExpression(expression.object, bindings, locals);
    return context => {
      const raw = objectExpression(context);
      const object = memberObject(raw, expression.property);
      if (isReference(object)) return reference(`${object.reference}.${expression.property}`);
      if (object && (typeof object === 'object' || typeof object === 'function') &&
          expression.property in object) {
        return (object as Record<string, unknown>)[expression.property];
      }
      return reference(expression.property);
    };
  }
  if (expression.kind === 'index') {
    const object = compileFastExpression(expression.object, bindings, locals);
    const index = compileFastExpression(expression.index, bindings, locals);
    return context => indexValue(object(context), toNumber(index(context)));
  }
  // A call through an identifier is the shape a MAME macro takes — BIT, the
  // fixed-width casts, the arithmetic helpers — and a per-scanline renderer
  // evaluates dozens per sprite. Compiling the arguments removes the only
  // interpreted step left on that path; the callee dispatch stays live so a
  // generated handler bound under the same name still wins, exactly as it
  // does for the interpreter.
  if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
    const name = expression.callee.name;
    const args = expression.args.map(arg => compileFastExpression(arg, bindings, locals));
    const generatedArguments = compileGeneratedCallArguments(name, expression.args, args);
    return context => {
      // A lambda held by a local or a parameter; see evaluateCall.
      const held = Object.hasOwn(context.locals, name) ? context.locals[name] : undefined;
      const local = isLValue(held) ? held.get() : held;
      if (typeof local === 'function') {
        const values = new Array<unknown>(args.length);
        for (let index = 0; index < args.length; index++) {
          values[index] = callArgument(args[index]!(context));
        }
        return (local as (...call: unknown[]) => unknown)(...values);
      }
      const generated = context.bindings.referenceCalls?.[name];
      if (generated) return generated(...generatedArguments(context));
      const values = new Array<unknown>(args.length);
      for (let index = 0; index < args.length; index++) values[index] = args[index]!(context);
      return applyIdentifierCall(name, values, expression, context);
    };
  }
  // Member calls and assignment expressions have nuanced reference/device
  // semantics; retain their established evaluator while the enclosing
  // operations and arithmetic remain precompiled.
  return context => evaluate(expression, context);
}

/**
 * `float pot[16]` and `rgb_t pens[16]` allocate an array of that element type.
 * ALLOC alone cannot know it -- the array length is the only thing at the call
 * site -- so every declaration used to land in a byte array and silently clamp
 * anything wider. Mr. Do!'s resistor weights became zero and its whole palette
 * came out black.
 */
function allocateDeclaredArray(
  valueType: string | undefined,
  length: number,
): ArrayBufferView | undefined {
  const size = Math.max(0, Math.trunc(length));
  switch (valueType?.replace(/\bconst\b/g, '').trim()) {
    // MAME computes in single precision where the source says float, and the
    // difference is visible: Mr. Do!'s palette normalises against its own
    // brightest weight, which lands on 255 in float and 254.999 in double.
    case 'float': return new Float32Array(size);
    case 'double': return new Float64Array(size);
    case 'int': case 'int32_t': case 's32': return new Int32Array(size);
    case 'unsigned': case 'uint32_t': case 'u32': case 'offs_t':
    case 'pen_t': case 'rgb_t': return new Uint32Array(size);
    case 'int16_t': case 's16': return new Int16Array(size);
    case 'uint16_t': case 'u16': return new Uint16Array(size);
    case 'int8_t': case 's8': return new Int8Array(size);
    // uint8_t, char and every unnamed type keep ALLOC's byte array.
    default: return undefined;
  }
}

/** The ALLOC(length) a local array declaration lowers to, if this is one. */
function declaredArrayLength(
  value: GeneratedExpression | undefined,
): GeneratedExpression | undefined {
  return value?.kind === 'call' &&
    value.callee.kind === 'identifier' &&
    ['ALLOC', 'ALLOC16', 'ALLOC32', 'ALLOCF'].includes(value.callee.name)
    ? value.args[0] ?? { kind: 'number', value: 0 }
    : undefined;
}

/**
 * wrapValue with every decision about the declared type hoisted to compile
 * time. A declared type is a source constant, but wrapValue re-derived it —
 * regex included — on each of the thousands of narrowings a per-scanline
 * renderer performs per frame.
 *
 * The branch order below is wrapValue's own; both must stay in step or the
 * compiled and interpreted paths disagree about what a lowered program means.
 */
function compileValueWrapper(valueType: string | undefined): (value: unknown) => unknown {
  const packed = compilePackedPointerView(valueType);
  // A scalar valueType says nothing about the value: MAME declares local
  // arrays as `uint8_t objdata` initialised by ALLOC(4), so narrowing to a
  // byte turned the array into 0 and silently dropped every indexed write.
  const opaque = valueType === 'auto' ||
    (valueType?.includes('*') ?? false) ||
    (valueType?.includes('&') ?? false);
  const declared = valueType?.replace(/\bconst\b/g, '').trim();
  const narrow = compileValueNarrowing(declared);
  return value => {
    if (packed && value instanceof Uint8Array) return packed(value);
    if (opaque) return value;
    // `rectangle draw = cliprect` is a C++ value copy. Aliasing it instead
    // let a handler narrow its own clip rectangle and then hand the mutated
    // one back to its caller — frogger drew a flipped screen through a
    // rectangle its callee had already shrunk.
    if (declared === 'rectangle' && value && typeof value === 'object') {
      return Object.assign(Object.create(Object.getPrototypeOf(value)), value);
    }
    if (value && typeof value === 'object') return value;
    return narrow(value);
  };
}

/**
 * A `u16*`/`s16*` declaration over byte-addressed memory reinterprets the
 * bytes rather than copying them, so the wider view writes through to the same
 * shared memory the board handed out.
 */
function compilePackedPointerView(
  valueType: string | undefined,
): ((value: Uint8Array) => unknown) | undefined {
  if (!valueType?.includes('*')) return undefined;
  const normalized = valueType.replace(/\bconst\b/g, '').replace(/\s/g, '');
  if (/^(?:u16|uint16_t)\*$/.test(normalized)) {
    return value => new Uint16Array(value.buffer, value.byteOffset, value.byteLength >>> 1);
  }
  if (/^(?:s16|int16_t)\*$/.test(normalized)) {
    return value => new Int16Array(value.buffer, value.byteOffset, value.byteLength >>> 1);
  }
  return undefined;
}

/** Narrowing for an already const-stripped declared type. */
function compileValueNarrowing(declared: string | undefined): (value: unknown) => unknown {
  if (declared === 'uint8_t' || declared === 'u8') return value => toNumber(value) & 0xff;
  if (declared === 'int8_t' || declared === 's8' || declared === 'char') {
    return value => toNumber(value) << 24 >> 24;
  }
  if (declared === 'bool') return value => toNumber(value) ? 1 : 0;
  if (declared === 'uint16_t' || declared === 'u16' || declared === 'unsigned short') return value => toNumber(value) & 0xffff;
  if (declared === 'int16_t' || declared === 's16' || declared === 'short') {
    return value => toNumber(value) << 16 >> 16;
  }
  // `offs_t` is MAME's own name for a u32 address offset.
  if (declared === 'uint32_t' || declared === 'u32' || declared === 'offs_t') {
    return value => toNumber(value) >>> 0;
  }
  if (declared === 'int' || declared === 'int32_t' || declared === 's32') return value => toNumber(value) | 0;
  if (declared === 'uint64_t' || declared === 'u64' ||
      declared === 'int64_t' || declared === 's64') {
    return value => Math.trunc(toNumber(value));
  }
  // A `float` local rounds to single precision on every store, as it does in
  // C++; `double` and every unnamed scalar type keep their value unchanged.
  if (declared === 'float') return value => Math.fround(toNumber(value));
  // A std::string is its text. Narrowed as a number, `std::string
  // fulltag(tag)` in device_generic_cart_interface::rom_alloc held 0, and
  // every generic cartridge's ROM region was named "0".
  if (declared === 'std::string' || declared === 'std::string_view') {
    return value => {
      const held = isLValue(value) ? value.get() : value;
      return typeof held === 'string' ? held : '';
    };
  }
  // wrapValue's terminal case: an unnamed scalar type (`int`, `double`, a
  // driver typedef) keeps its numeric value unchanged.
  return toNumber;
}

// A MAME signature is a constant, so parsing it is cached by that string.
// This runs on every machine-handler call, which for video handlers is per
// tile and per pixel.
const PARAMETER_NAMES = new Map<string, string[]>();

function parameterNames(parameters: string | undefined): string[] {
  const key = parameters ?? '';
  let names = PARAMETER_NAMES.get(key);
  if (!names) {
    names = splitParameters(key)
      // `int length = 1` names `length`, not its default. Read as `1`, ymfm's
      // bitfield masked with `(1 << 0) - 1` and answered 0 for every field.
      .map(parameter => parameter.replace(/=[\s\S]*$/, ''))
      .map(parameter => /\(\s*\*\s*(\w+)\s*\)/.exec(parameter)?.[1] ?? /(\w+)\s*$/.exec(parameter)?.[1])
      .filter((name): name is string => Boolean(name));
    PARAMETER_NAMES.set(key, names);
  }
  return names;
}

/**
 * A C++ parameter list, one declaration each. Only top-level commas separate
 * parameters: a function-pointer parameter carries a list of its own --
 * MAME's CBM quickload takes `void (*cbm_sethiaddress)(address_space &space,
 * uint16_t hiaddress)` -- and splitting inside it named the callee's
 * parameters `space` and `hiaddress)`.
 */
export function splitParameters(parameters: string): string[] {
  const out: string[] = [];
  let depth = 0;
  let current = '';
  for (const ch of parameters) {
    if (ch === '(' || ch === '<' || ch === '[') depth++;
    else if (ch === ')' || ch === '>' || ch === ']') depth--;
    if (ch === ',' && depth === 0) { out.push(current.trim()); current = ''; continue; }
    current += ch;
  }
  if (current.trim()) out.push(current.trim());
  return out.filter(Boolean);
}

function executeOperations(
  operations: GeneratedHandlerOperation[],
  context: ExecutionContext,
): ExecutionResult {
  for (const operation of operations) {
    if (operation.op === 'declare') {
      context.localTypes[operation.name] = operation.valueType;
      const arrayLength = declaredArrayLength(operation.value);
      const typed = arrayLength
        ? allocateDeclaredArray(operation.valueType, toNumber(evaluate(arrayLength, context)))
        : undefined;
      context.locals[operation.name] = typed ?? wrapValue(operation.valueType, operation.value
        ? evaluate(operation.value, context)
        : 0);
    } else if (operation.op === 'assign') {
      assign(operation.target, operation.operator, evaluate(operation.value, context), context);
    } else if (operation.op === 'call') {
      evaluate(operation.expression, context);
    } else if (operation.op === 'return') {
      return {
        control: 'return',
        ...(operation.value ? { value: evaluate(operation.value, context) } : {}),
      };
    } else if (operation.op === 'break') {
      return { control: 'break' };
    } else if (operation.op === 'continue') {
      return { control: 'continue' };
    } else if (operation.op === 'if') {
      const branch = truthy(evaluate(operation.condition, context))
        ? operation.then
        : operation.else ?? [];
      const result = executeOperations(branch, context);
      if (result.control) return result;
    } else if (operation.op === 'for') {
      const initialized = executeOperations(operation.initialize, context);
      if (initialized.control) return initialized;
      let iterations = 0;
      while (truthy(evaluate(operation.condition, context))) {
        if (++iterations > GENERATED_LOOP_ITERATION_LIMIT) throw generatedLoopLimitError('for', context);
        const result = executeOperations(operation.body, context);
        if (result.control === 'return') return result;
        if (result.control === 'break') break;
        const iterated = executeOperations(operation.iterate, context);
        if (iterated.control === 'return') return iterated;
        if (iterated.control === 'break') break;
      }
    } else if (operation.op === 'while') {
      let iterations = 0;
      while (truthy(evaluate(operation.condition, context))) {
        if (++iterations > GENERATED_LOOP_ITERATION_LIMIT) throw generatedLoopLimitError('while', context);
        const result = executeOperations(operation.body, context);
        if (result.control === 'return') return result;
        if (result.control === 'break') break;
      }
    } else if (operation.op === 'do-while') {
      let iterations = 0;
      do {
        if (++iterations > GENERATED_LOOP_ITERATION_LIMIT) throw generatedLoopLimitError('do-while', context);
        const result = executeOperations(operation.body, context);
        if (result.control === 'return') return result;
        if (result.control === 'break') break;
      } while (truthy(evaluate(operation.condition, context)));
    } else if (operation.op === 'switch') {
      const value = toNumber(evaluate(operation.expression, context));
      let index = operation.cases.findIndex(candidate =>
        candidate.values?.some(candidateValue =>
          toNumber(evaluate(candidateValue, context)) === value));
      if (index < 0) index = operation.cases.findIndex(candidate => !candidate.values);
      for (; index >= 0 && index < operation.cases.length; index++) {
        const result = executeOperations(operation.cases[index]!.body, context);
        if (result.control === 'return') return result;
        if (result.control === 'continue') return result;
        if (result.control === 'break') break;
      }
    }
  }
  return {};
}

function evaluate(expression: GeneratedExpression, context: ExecutionContext): unknown {
  if (expression.kind === 'number') {
    return expression.wide === undefined ? expression.value : BigInt(expression.wide);
  }
  if (expression.kind === 'string') return expression.value;
  if (expression.kind === 'identifier') {
    if (Object.hasOwn(context.locals, expression.name)) {
      const local = context.locals[expression.name];
      return isLValue(local) ? local.get() : local;
    }
    const getter = context.bindings.getters?.[expression.name];
    if (getter) return getter();
    {
      // A value, not an own key: see preparedHandlerRuntime's member lookup.
      const value = context.bindings.members?.[expression.name];
      if (value !== undefined) return value;
    }
    if (expression.name === 'ACCESSING_BITS_0_7') {
      return toNumber(context.locals.mem_mask) & 0x00ff ? 1 : 0;
    }
    if (expression.name === 'ACCESSING_BITS_8_15') {
      return toNumber(context.locals.mem_mask) & 0xff00 ? 1 : 0;
    }
    // Clang retains a scoped spelling for device constants used by driver
    // handlers (for example `z8002_device::NVI_LINE`), while the source
    // compiler records the declaration under its leaf name (`NVI_LINE`).
    // Resolve both forms so source-derived callbacks deliver the numeric pin
    // rather than passing an unresolved reference object to a device.
    // The qualified spelling wins over any leaf: `machine_phase::RUNNING`
    // must not become the 64H156's own `RUNNING` live state, which turned
    // every 1541 motor and stepper write into an early return.
    const constantName = expression.name.split('::').at(-1)!;
    const constant = context.bindings.constants?.[expression.name] ??
      DEFAULT_CONSTANTS[expression.name] ??
      context.bindings.constants?.[constantName] ??
      DEFAULT_CONSTANTS[constantName];
    if (constant !== undefined) return constant;
    if (context.bindings.referenceCalls?.[expression.name]) return context.bindings.referenceCalls[expression.name];
    return context.bindings.concreteDeviceMembers?.has(expression.name)
      ? { reference: expression.name, resolved: true }
      : reference(expression.name);
  }
  if (expression.kind === 'unary') {
    if (expression.operator === '&') return addressOf(expression.operand, context);
    const raw = evaluate(expression.operand, context);
    if (expression.operator === '*') {
      if (isGeneratedPointer(raw)) return pointerValue(raw, 0);
      if (isIndexableMemory(raw)) return indexValue(raw, 0);
      return raw;
    }
    if (expression.operator === '!') return truthy(raw) ? 0 : 1;
    const value = toNumber(raw);
    if (expression.operator === '~') return ~value;
    if (expression.operator === '-') return -value;
    return value;
  }
  if (expression.kind === 'cast') {
    if (expression.pointer && isBytePointerType(expression.valueType)) return generatedByteView(evaluate(expression.operand, context));
    const view = expression.pointer ? packedCastView(expression.valueType) : undefined;
    if (view !== undefined) return packedByteView(evaluate(expression.operand, context), view);
    return wrapValue(expression.valueType, evaluate(expression.operand, context));
  }
  if (expression.kind === 'assignment') {
    const previous = expression.postfix ? evaluate(expression.target, context) : undefined;
    const value = evaluate(expression.value, context);
    assign(expression.target, expression.operator, value, context);
    return expression.postfix ? previous : evaluate(expression.target, context);
  }
  if (expression.kind === 'binary') {
    const leftValue = evaluate(expression.left, context);
    if (expression.operator === '&&') {
      return truthy(leftValue) && truthy(evaluate(expression.right, context)) ? 1 : 0;
    }
    if (expression.operator === '||') {
      return truthy(leftValue) || truthy(evaluate(expression.right, context)) ? 1 : 0;
    }
    const rightValue = evaluate(expression.right, context);
    if (expression.precision === 64) return wideBinary(expression.operator, leftValue, rightValue);
    if (expression.operator === '+' && isGeneratedPointer(leftValue)) {
      return offsetPointer(leftValue, toNumber(rightValue));
    }
    if (expression.operator === '+' && isIndexableMemory(leftValue)) {
      return {
        generatedPointer: true,
        source: leftValue,
        offset: toNumber(rightValue),
      };
    }
    if (expression.operator === '+' && isGeneratedPointer(rightValue)) {
      return offsetPointer(rightValue, toNumber(leftValue));
    }
    if (expression.operator === '+' && isIndexableMemory(rightValue)) {
      return {
        generatedPointer: true,
        source: rightValue,
        offset: toNumber(leftValue),
      };
    }
    if (expression.operator === '-' && (isGeneratedPointer(leftValue) || isGeneratedPointer(rightValue))) {
      return generatedSubtract(leftValue, rightValue);
    }
    if (expression.operator === '-' && isIndexableMemory(leftValue)) {
      return {
        generatedPointer: true,
        source: leftValue,
        offset: -toNumber(rightValue),
      };
    }
    if (expression.operator === '==' || expression.operator === '!=') {
      const equal = generatedValuesEqual(leftValue, rightValue);
      return expression.operator === '==' ? Number(equal) : Number(!equal);
    }
    if (expression.operator === '&' && isIntersectable(leftValue)) return intersection(leftValue, rightValue);
    if (typeof leftValue === 'bigint' || typeof rightValue === 'bigint') {
      return wideBinary(expression.operator, leftValue, rightValue);
    }
    const left = toNumber(leftValue);
    const right = toNumber(rightValue);
    if (expression.operator === '/' && isAttotimeExpression(expression.left, context)) {
      return left / right;
    }
    if (
      expression.operator === '/' &&
      (isFloatingExpression(expression.left) || isFloatingExpression(expression.right))
    ) {
      return left / right;
    }
    return binary(expression.operator, left, right);
  }
  if (expression.kind === 'conditional') {
    return evaluate(
      truthy(evaluate(expression.condition, context)) ? expression.whenTrue : expression.whenFalse,
      context,
    );
  }
  if (expression.kind === 'member') {
    const rawObject = evaluate(expression.object, context);
    const object = memberObject(rawObject, expression.property);
    if (isReference(object)) return reference(`${object.reference}.${expression.property}`);
    if (
      object &&
      (typeof object === 'object' || typeof object === 'function') &&
      expression.property in object
    ) {
      return (object as Record<string, unknown>)[expression.property];
    }
    return reference(expression.property);
  }
  if (expression.kind === 'index') {
    const object = evaluate(expression.object, context);
    const index = toNumber(evaluate(expression.index, context));
    return indexValue(object, index);
  }
  if (expression.kind === 'lambda') {
    // The lambda body runs in the enclosing scope's own context -- a MAME
    // lambda captures `this`, so every member and call it names is already
    // resolvable there -- with its parameters bound over the top. An unnamed
    // parameter keeps its position and binds nothing.
    const { parameters, body } = expression;
    // Init-captures are evaluated here, where the lambda is written, exactly
    // once -- which is what C++ does and what MAME relies on: the captured
    // pointer is taken before the loop that calls the lambda begins.
    const captured: Record<string, unknown> = {};
    for (const capture of expression.captures ?? []) {
      captured[capture.name] = evaluate(capture.value, context);
    }
    const lambda = (...args: unknown[]): unknown => {
      const locals = { ...context.locals, ...captured };
      for (const [index, name] of parameters.entries()) {
        if (name) locals[name] = args[index] ?? 0;
      }
      const result = executeOperations(body, { ...context, locals });
      return result.control === 'return' ? result.value : undefined;
    };
    // How many arguments it declares, for a host that must call it the way
    // MAME would: an address-map write lambda takes `(u8 data)` or
    // `(offs_t offset, u8 data)`, and the two are not interchangeable.
    Object.defineProperty(lambda, 'declaredParameters', { value: parameters.length });
    return lambda;
  }
  return evaluateCall(expression, context);
}

export function isFloatingExpression(expression: GeneratedExpression): boolean {
  if (expression.kind === 'number') return Boolean(expression.floating);
  if (expression.kind === 'identifier') return Boolean(expression.floating);
  // `weights[i]` is as floating as the array it indexes.
  if (expression.kind === 'index') return isFloatingExpression(expression.object);
  if (expression.kind === 'cast') {
    return /\b(?:float|double)\b/.test(expression.valueType) ||
      isFloatingExpression(expression.operand);
  }
  if (expression.kind === 'unary') return isFloatingExpression(expression.operand);
  if (expression.kind === 'binary') {
    return isFloatingExpression(expression.left) || isFloatingExpression(expression.right);
  }
  if (expression.kind === 'conditional') {
    return isFloatingExpression(expression.whenTrue) || isFloatingExpression(expression.whenFalse);
  }
  return false;
}

/**
 * Everything an identifier-callee call means once its arguments are values:
 * MAME's macro intrinsics, the C++ primitives its sources use, and the
 * browser/device endpoints a board binds.
 *
 * Shared so the compiled fast path can evaluate the arguments through
 * compiled expressions and still reach exactly the semantics the interpreter
 * gives the same call.
 */
/**
 * MAME framework macros with context-free semantics, shared between the
 * interpreter and emitted handler code (`runtime.macro`). Returns undefined
 * for a name it does not know, so callers keep their own fallbacks.
 */
/**
 * A framework macro as emitted code calls it (`runtime.macro`): the macro's
 * value, or 0 for a name the table does not know -- noted for the census like
 * every other unresolved call.
 */
export function generatedMacroCall(name: string, args: unknown[]): unknown {
  const value = applyGeneratedMacro(name, args);
  if (value !== undefined) return value;
  noteUnresolvedCall(name);
  return 0;
}

export function applyGeneratedMacro(name: string, args: unknown[]): unknown {
  // As the C library and as `std::` spell it: the floppy drive's call_load
  // compares its `write_protected` feature with `std::strcmp`, and the NES
  // loader an `mmc1_type` against the prefix `"MMC1B"` with `strncmp`, which
  // unanswered was 0 -- equal -- for every MMC1 cartridge.
  const bounded = name === 'strncmp' || name === 'std::strncmp';
  if (name === 'strcmp' || name === 'std::strcmp' || bounded) {
    const string = (value: unknown): string => {
      if (typeof value === 'string') return value.split('\0')[0]!;
      if (Array.isArray(value) || ArrayBuffer.isView(value)) {
        const bytes = Array.from(value as ArrayLike<number>);
        const end = bytes.indexOf(0);
        return String.fromCharCode(...bytes.slice(0, end < 0 ? undefined : end));
      }
      throw new Error(`${name} requires a string or byte array`);
    };
    const length = bounded ? Math.max(0, toNumber(args[2])) : Infinity;
    const left = string(args[0]).slice(0, length);
    const right = string(args[1]).slice(0, length);
    return left === right ? 0 : left < right ? -1 : 1;
  }
  // `sscanf` over a string, for the integer and character conversions MAME's
  // loaders use: the NES reads a board's `mmc1_prg_bank`-style feature with
  // `sscanf(size, "%u%*c", &kbyte) != 1`, and unanswered the count was 0, so
  // three boards' features were all rejected. Each stored value goes through
  // its pointer; the answer is how many were stored, or -1 (EOF) for an input
  // that ended before the first conversion.
  if (name === 'sscanf' || name === 'std::sscanf') {
    const text = typeof args[0] === 'string' ? args[0] : '';
    const format = typeof args[1] === 'string' ? args[1] : '';
    let at = 0;
    let assigned = 0;
    let target = 2;
    const conversions = [...format.matchAll(/%(\*?)\d*(?:hh|h|ll|l)?([udixc])/g)];
    if (!text.length) return -1;
    for (const [, suppressed, kind] of conversions) {
      let value: number;
      if (kind === 'c') {
        if (at >= text.length) break;
        value = text.charCodeAt(at++);
      } else {
        while (at < text.length && /\s/.test(text[at]!)) at++;
        const pattern = kind === 'x' ? /^[+-]?(?:0[xX])?[\da-fA-F]+/ : kind === 'i' ? /^[+-]?(?:0[xX][\da-fA-F]+|\d+)/ : /^[+-]?\d+/;
        const match = pattern.exec(text.slice(at));
        if (!match) break;
        at += match[0].length;
        value = kind === 'x' ? Number.parseInt(match[0], 16) : kind === 'i' ? Number(match[0]) : Number.parseInt(match[0], 10);
        if (kind === 'u') value >>>= 0;
      }
      if (suppressed) continue;
      const destination = args[target++];
      if (isGeneratedPointer(destination)) setPointerValue(destination, 0, value);
      else if (isLValue(destination)) destination.set(value);
      assigned++;
    }
    return assigned;
  }
  // What `stripTracingCalls` leaves where a MAME `LOG(...)` stood. It is a
  // placeholder, not hardware, and it is answered first because a renderer
  // carries dozens of them through its hottest loop.
  if (name === 'TRACE_NOOP') return 0;
  if (name === 'BIT') {
    // MAME BIT(x, n) extracts one bit; BIT(x, n, w) extracts a w-bit field.
    const width = args.length > 2 ? toNumber(args[2]) : 1;
    return (toNumber(args[0]) >> toNumber(args[1])) & ((1 << width) - 1);
  }
  // C's built-in short cast is parsed as a function-style call. Direct device
  // code reaches this macro surface (rather than the interpreter's broader
  // call dispatcher), so keep its signed 16-bit coordinate semantics here.
  if (name === 'short') return (toNumber(args[0]) << 16) >> 16;
  if (name === 'BITSWAP') {
    const source = toNumber(args[0]);
    return args.slice(1).reduce<number>(
      (result, bit) => (result << 1) | ((source >> toNumber(bit)) & 1),
      0,
    );
  }
  // C and C++ standard-library primitives MAME device sources rely on.
  if (name === 'std::min') {
    return Math.min(...args.map(toNumber));
  }
  if (name === 'std::max') {
    return Math.max(...args.map(toNumber));
  }
  if (name === 'std::clamp') {
    return Math.min(toNumber(args[2]), Math.max(toNumber(args[1]), toNumber(args[0])));
  }
  // <bit>. MAME's cartridge buses work out how a non-power-of-two ROM decodes
  // with these, one power-of-two chunk at a time; unbound they answered zero,
  // which turns the decode loop into one that never terminates.
  if (name === 'std::bit_width') return 32 - Math.clz32(toNumber(args[0]) >>> 0);
  if (name === 'std::bit_ceil') {
    const value = toNumber(args[0]) >>> 0;
    return value <= 1 ? 1 : 2 ** (32 - Math.clz32(value - 1));
  }
  if (name === 'std::bit_floor') {
    const value = toNumber(args[0]) >>> 0;
    return value === 0 ? 0 : 2 ** (31 - Math.clz32(value));
  }
  if (name === 'std::has_single_bit') {
    const value = toNumber(args[0]) >>> 0;
    return value !== 0 && (value & (value - 1)) === 0 ? 1 : 0;
  }
  if (name === 'std::countl_zero') return Math.clz32(toNumber(args[0]) >>> 0);
  if (name === 'std::countr_zero') {
    const value = toNumber(args[0]) >>> 0;
    return value === 0 ? 32 : 31 - Math.clz32(value & -value);
  }
  if (name === 'std::popcount') {
    let value = toNumber(args[0]) >>> 0;
    let count = 0;
    while (value) { value &= value - 1; count++; }
    return count;
  }
  // <type_traits> signedness casts, written as functional casts. The IR drops
  // the template argument, so the only thing left to preserve is which way the
  // value is read -- and MAME uses these precisely to stop a shift or a
  // comparison going negative.
  // Perfect forwarding is a compile-time notion: at run time it is the value.
  // MAME's decode helpers pass their callback on with `std::forward<T>`, and
  // an unbound call answered zero -- so the inner overload had nothing to call.
  if (name === 'std::forward' || name === 'std::move') return args[0];
  // A pair or tuple is its values, which is how a structured binding reads
  // them back: a quickload's load callback answers std::make_pair(error,
  // message), and snapquik.cpp unpacks it as `auto [err, message]`.
  if (name === 'std::make_pair' || name === 'std::make_tuple' || name === 'std::pair' || name === 'std::tuple') {
    return [...args];
  }
  // C's string-to-integer conversions: a C64 cartridge's `exrom` feature is
  // the string "0", and its slot reads it with atol.
  if (name === 'atol' || name === 'atoi' || name === 'atoll') {
    const text = isLValue(args[0]) ? args[0].get() : args[0];
    return Number.parseInt(String(text ?? ''), 10) || 0;
  }
  // Default-constructed, an error_condition is success and a string empty.
  if (name === 'std::error_condition' && !args.length) return 0;
  if (name === 'std::string' && !args.length) return '';
  // A C string made a std::string is the same text: the CRT reader returns
  // `std::string(CRT_C64_SLOT_NAMES[hardware])`, the card a .crt needs.
  if (name === 'std::string' && args.length === 1) {
    const value = isLValue(args[0]) ? args[0].get() : args[0];
    if (typeof value === 'string') return value;
  }
  // osdcomm.h's byte-order helpers. A value read raw out of a file
  // (`image.fread(&address, 2)`) lands in host order, which here, as on
  // every host MAME builds for, is little-endian: making it little-endian is
  // nothing, and big-endian is a swap.
  if (/^little_endianize_int(?:16|32|64)$/.test(name)) return toNumber(args[0]);
  if (name === 'big_endianize_int16') {
    const value = toNumber(args[0]) & 0xffff;
    return ((value & 0xff) << 8) | (value >>> 8);
  }
  if (name === 'big_endianize_int32') {
    const value = toNumber(args[0]) >>> 0;
    return (((value & 0xff) << 24) | ((value & 0xff00) << 8) | ((value >>> 8) & 0xff00) | (value >>> 24)) >>> 0;
  }
  // MAME's own right-aligned mask helper (util::make_bitmask<T>(n)). The IR
  // drops the width, so the mask is as wide as the requested bits -- which is
  // what every caller asks for. Unbound it answered zero, and an MBC1 masked
  // its own bank number down to nothing.
  if (/(?:^|::)make_bitmask$/.test(name)) {
    const bits = Math.max(0, Math.min(32, toNumber(args[0])));
    return bits >= 32 ? 0xffffffff : (2 ** bits) - 1;
  }
  if (name === 'std::make_unsigned_t') return toNumber(args[0]) >>> 0;
  if (name === 'std::make_signed_t') return toNumber(args[0]) | 0;
  if (name === 'ALLOC' || name === 'make_unique_clear') {
    return new Uint8Array(Math.max(0, toNumber(args[0])));
  }
  // The same allocation at the element width MAME declared.
  if (name === 'ALLOC16') return new Uint16Array(Math.max(0, toNumber(args[0])));
  if (name === 'ALLOC32') return new Uint32Array(Math.max(0, toNumber(args[0])));
  if (name === 'ALLOCF') return new Float64Array(Math.max(0, toNumber(args[0])));
  if (name === 'ARRAY') return args;
  // <cmath>'s std:: spellings answer as the C ones: the speaker filter sums
  // `std::abs(m_ampl[c])`, and unbound that sum was 0 and every sample
  // divided by it.
  if (name.startsWith('std::') && ['abs', 'fabs', 'floor', 'ceil', 'pow', 'sqrt', 'exp', 'log', 'log10',
    'tan', 'atan', 'atan2', 'cos', 'sin'].includes(name.slice(5))) {
    return applyGeneratedMacro(name.slice(5) === 'abs' ? 'fabs' : name.slice(5), args);
  }
  if (name === 'abs') return Math.abs(toNumber(args[0]));
  if (name === 'floor') return Math.floor(toNumber(args[0]));
  // The C math functions MAME's palette and DSP arithmetic reaches for.
  if (name === 'ceil') return Math.ceil(toNumber(args[0]));
  if (name === 'pow') return Math.pow(toNumber(args[0]), toNumber(args[1]));
  if (name === 'sqrt') return Math.sqrt(toNumber(args[0]));
  if (name === 'exp') return Math.exp(toNumber(args[0]));
  if (name === 'log') return Math.log(toNumber(args[0]));
  if (name === 'log10') return Math.log10(toNumber(args[0]));
  if (name === 'fabs') return Math.abs(toNumber(args[0]));
  if (name === 'tan') return Math.tan(toNumber(args[0]));
  if (name === 'atan') return Math.atan(toNumber(args[0]));
  if (name === 'atan2') return Math.atan2(toNumber(args[0]), toNumber(args[1]));
  if (name === 'cos') return Math.cos(toNumber(args[0]));
  if (name === 'sin') return Math.sin(toNumber(args[0]));
  if (name === 'DEGREE_TO_RADIAN') return toNumber(args[0]) * Math.PI / 180;
  if (name === 'rgb_t') {
    // rgb_t has both (r, g, b) and (a, r, g, b) constructors.  Treating
    // the four-argument form as RGB made alpha become red and discarded
    // blue, flattening Gottlieb games to a single yellow field.
    const offset = args.length >= 4 ? 1 : 0;
    const alpha = args.length >= 4 ? toNumber(args[0]) & 0xff : 0xff;
    const red = toNumber(args[offset]) & 0xff;
    const green = toNumber(args[offset + 1]) & 0xff;
    const blue = toNumber(args[offset + 2]) & 0xff;
    return (alpha << 24 | blue << 16 | green << 8 | red) >>> 0;
  }
  // MAME's bitswap<N>(value, b(N-1), ..., b0): the first listed source bit
  // becomes the most significant bit of the N-bit result.
  if (name.startsWith('bitswap_')) {
    const value = toNumber(args[0]);
    let swapped = 0;
    for (let index = 1; index < args.length; index++) {
      swapped = (swapped << 1) | ((value >>> toNumber(args[index])) & 1);
    }
    return swapped >>> 0;
  }
  const paletteExpansion = /^pal([1-8])bit$/.exec(name);
  if (paletteExpansion) {
    const bits = Number(paletteExpansion[1]);
    const maximum = (1 << bits) - 1;
    return Math.round((toNumber(args[0]) & maximum) * 255 / maximum);
  }
  if (name === 'assert' || name === 'static_assert') return 0;
  // C++17 `std::size`: the extent of an array. Unanswered it returned
  // undefined, and MAME's Game Boy PPU indexes its window-start history with
  // `(index + 4) % std::size(...)` -- which made every one of those subscripts
  // NaN and the index with it.
  if (name === 'std::size' || name === 'std::ssize') {
    const container = args[0];
    if (isIndexableMemory(container)) return container.length;
    if (isGeneratedPointer(container)) {
      return Math.max(0, (container.source as ArrayLike<unknown>).length - container.offset);
    }
    return 0;
  }
  // Iterators over an array member, as `std::fill(std::begin(m_irq_state),
  // std::end(m_irq_state), CLEAR_LINE)` uses them. Unresolved, that line in the
  // 6805's device_reset left every IRQ line as it was across a reset, and
  // Galaxian's machine_reset kept its graphics banks (#178).
  if ((name === 'std::begin' || name === 'std::end') && isIndexableMemory(args[0])) {
    return {
      generatedPointer: true,
      source: args[0],
      offset: name === 'std::end' ? args[0].length : 0,
    } satisfies GeneratedPointer;
  }
  if (name === 'std::fill' && isGeneratedPointer(args[0]) && isGeneratedPointer(args[1]) &&
      args[0].source === args[1].source) {
    for (let offset = args[0].offset; offset < args[1].offset; offset++) {
      setPointerValue(args[0], offset - args[0].offset, args[2]);
    }
    return 0;
  }
  if ((name === 'std::min_element' || name === 'std::max_element') &&
      isGeneratedPointer(args[0]) && isGeneratedPointer(args[1]) && args[0].source === args[1].source) {
    // The first of equal elements, as the standard specifies; an empty range
    // answers its end.
    let best = args[0].offset;
    for (let offset = args[0].offset + 1; offset < args[1].offset; offset++) {
      const value = toNumber(pointerValue(args[0], offset - args[0].offset));
      const current = toNumber(pointerValue(args[0], best - args[0].offset));
      if (name === 'std::min_element' ? value < current : value > current) best = offset;
    }
    return { generatedPointer: true, source: args[0].source, offset: best } satisfies GeneratedPointer;
  }
  if (name === 'memcpy' || name === 'memmove') {
    copyGeneratedMemory(args[0], args[1], toNumber(args[2]), true);
    return args[0];
  }
  // std::fill_n(first, count, value), returning the end of the range:
  // OPLL's register reset is `std::fill_n(&m_regdata[0], REGISTERS, 0)`.
  if (name === 'std::fill_n') {
    const count = toNumber(args[1]);
    fillGeneratedMemory(args[0], toNumber(args[2]), count);
    return generatedAdd(args[0], count);
  }
  if (name === 'std::copy_n') {
    const count = toNumber(args[1]);
    copyGeneratedMemory(args[2], args[0], count);
    // std::copy_n returns the output iterator immediately after the copied
    // range. Sprite DMA uses that return value as the destination for the
    // next active object; returning the original pointer overwrote slot zero
    // for every object and then cleared its active flag.
    return generatedAdd(args[2], count);
  }
  // C's untyped allocation: storage that holds whatever is put in it, a
  // pointer table as readily as bytes (TZX's block list). free() releases
  // nothing here.
  if (name === 'malloc') return new Array<unknown>(Math.max(0, toNumber(args[0]))).fill(0);
  if (name === 'free') return 0;
  if (name === 'memset') {
    fillGeneratedMemory(args[0], toNumber(args[1]), toNumber(args[2]));
    return args[0];
  }
  // A struct built in place: field names and values, interleaved, as the
  // device compiler lowers a brace initialiser (see lowerStructLocals).
  if (name === 'STRUCT') return generatedStruct(args);
  // `T items[n]` of a struct T: n structs with T's fields, zeroed.
  if (name === 'STRUCT_ARRAY') {
    const names = args.slice(1).map(String);
    return Array.from({ length: Math.max(0, toNumber(args[0])) }, () =>
      generatedStruct(names.flatMap(field => [field, 0])));
  }
  // A brace list the compiler could not give a struct shape: its values.
  if (name === 'AGGREGATE') return [...args];
  // MAME util::read_at over the host's image bytes (`{ bytes }`, see the
  // floppy image host). Two overloads: into a buffer, answering
  // (error, actual); or a fresh buffer, answering (error, buffer, actual).
  // Tuples are arrays; a host read cannot fail, so error is 0.
  if (name === 'read_at') {
    const bytes = (args[0] as { bytes?: Uint8Array } | undefined)?.bytes ?? new Uint8Array(0);
    const offset = Math.max(0, toNumber(args[1]));
    if (args.length >= 4) {
      const count = Math.max(0, Math.min(toNumber(args[3]), bytes.length - offset));
      copyGeneratedMemory(args[2], bytes.subarray(offset, offset + count), count);
      return [0, count];
    }
    const data = bytes.slice(offset, offset + Math.max(0, toNumber(args[2])));
    return [0, data, data.length];
  }
  if (name === 'memcmp') {
    const byte = (value: unknown, index: number): number => typeof value === 'string'
      ? value.charCodeAt(index) || 0
      : toNumber(isGeneratedPointer(value) ? pointerValue(value, index) : (value as ArrayLike<number>)[index]) & 0xff;
    for (let index = 0; index < toNumber(args[2]); index++) {
      const difference = byte(args[0], index) - byte(args[1], index);
      if (difference) return difference;
    }
    return 0;
  }
  // A C++ `throw`, as handler-ir lowers it: the source gave up here.
  if (name === '__throw') throw new Error('MAME source threw an exception');
  // MAME util/multibyte.h: little- and big-endian loads from a byte pointer.
  // The pointer is usually into a buffer (`&cur_block[16]`): a TZX turbo or
  // pure-data block's length is a get_u24le there, and read as a bare array
  // it was 0, so Elite's 48K tape ended after its BASIC loader.
  if (/^get_u(16|24|32)(le|be)$/.test(name)) {
    const byte = (index: number): number => toNumber(isGeneratedPointer(args[0])
      ? pointerValue(args[0], index) : (args[0] as ArrayLike<number>)[index]) & 0xff;
    const count = name.includes('16') ? 2 : name.includes('24') ? 3 : 4;
    let value = 0;
    for (let index = 0; index < count; index++) {
      value += byte(name.endsWith('le') ? index : count - 1 - index) * 2 ** (8 * index);
    }
    return value;
  }
  // std::lower_bound / std::upper_bound over [first, last), with the
  // comparator the source passes (a lambda) or `<`. They answer an iterator
  // into the same buffer.
  if (name === 'std::lower_bound' || name === 'std::upper_bound') {
    return generatedBoundSearch(name === 'std::lower_bound', args[0], args[1], args[2], args[3]);
  }
  if (name === 'rgb_t::black') return 0xff000000;
  if (name === 'rgb_t::white') return 0xffffffff;
  if (name === 'CAP_P') return toNumber(args[0]) * 1e-12;
  if (name === 'CAP_N') return toNumber(args[0]) * 1e-9;
  if (name === 'CAP_U') return toNumber(args[0]) * 1e-6;
  if (name === 'RES_K') return toNumber(args[0]) * 1e3;
  if (name === 'RES_M') return toNumber(args[0]) * 1e6;
  // emu/attotime.h's own conversions and its (seconds, attoseconds)
  // constructor, in the seconds every duration is held in here. The speaker
  // steps its intermediate samples by `attotime(0, HZ_TO_ATTOSECONDS(rate))`;
  // unbound that step was 0 and its catch-up loop never ended.
  if (name === 'HZ_TO_ATTOSECONDS') return Math.trunc(1e18 / toNumber(args[0]));
  if (name === 'ATTOSECONDS_TO_DOUBLE') return toNumber(args[0]) * 1e-18;
  if (name === 'attotime') return args.length ? toNumber(args[0]) + toNumber(args[1] ?? 0) * 1e-18 : 0;
  if (name === 'attotime::from_hz') return 1 / Math.max(1, toNumber(args[0]));
  // Durations are seconds here, as from_hz and from_ticks already are.
  if (name === 'attotime::from_seconds' || name === 'attotime::from_double') return toNumber(args[0]);
  if (name === 'attotime::from_msec') return toNumber(args[0]) * 1e-3;
  if (name === 'attotime::from_usec') return toNumber(args[0]) * 1e-6;
  if (name === 'attotime::from_nsec') return toNumber(args[0]) * 1e-9;
  if (name === 'attotime::from_ticks') {
    return toNumber(args[0]) / Math.max(1, toNumber(args[1]));
  }
  if (name === 'TILE_FLIPYX') return toNumber(args[0]) & 3;
  if (name === 'TILE_FLIPXY') {
    const value = toNumber(args[0]);
    return ((value & 2) >> 1) | ((value & 1) << 1);
  }
  if (name === 'TABLE') {
    const values = args.slice(1);
    const index = values.length
      ? modulo(toNumber(args[0]), values.length)
      : 0;
    return values[index] ?? 0;
  }
  return undefined;
}

/**
 * C++ `/` as the interpreter applies it, for emitted code: integral between
 * integers, exact otherwise. Shared so both paths truncate identically.
 */
export function applyGeneratedDivision(left: unknown, right: unknown): number {
  return BINARY_OPERATORS['/']!(toNumber(left), toNumber(right));
}

/**
 * C++ `>>` as the interpreter applies it, for emitted code: arithmetic on a
 * negative value, logical otherwise (see BINARY_OPERATORS). Emitted as a bare
 * `>>>`, a negative left operand came back as a huge positive -- the
 * Battlezone AVG's `(... - 0x200) * cycles * scale >> 4` threw every beam
 * position off the screen.
 */
export function applyGeneratedShiftRight(left: unknown, right: unknown): number {
  return BINARY_OPERATORS['>>']!(toNumber(left), toNumber(right));
}

/**
 * C++ `&=` as the interpreter applies it, for emitted code.
 *
 * `rectangle::operator&=` is an intersection, not a bitwise AND, and only the
 * value knows which it is. Lowering it as `&` made `Number(rect) & Number(rect)`
 * zero, which erased pacman's sprite clip entirely — Crush Roller's tunnel
 * sprites then drew outside the region MAME confines them to.
 */
export function applyGeneratedAndAssign(current: unknown, value: unknown): unknown {
  if (
    current &&
    typeof current === 'object' &&
    typeof (current as { intersect?: unknown }).intersect === 'function'
  ) {
    (current as { intersect: (other: unknown) => void }).intersect(value);
    return current;
  }
  return toNumber(current) & toNumber(value);
}

/** MAME COMBINE_DATA against a generated pointer, with explicit locals. */
export function applyCombineData(
  pointer: unknown,
  data: unknown,
  memMask: unknown,
): number {
  // MAME's macro is `(*(ptr) = ((*(ptr) & ~mem_mask) | (data & mem_mask)))`,
  // and the pointer a driver passes is usually its own memory-share finder.
  // A share is bound as the array itself, not as a pointer object; refusing
  // it here left every write-only scroll register at its power-on value,
  // because nothing else on such a range stores the word (Gauntlet's
  // xscroll_w, issue #88).
  const target = isGeneratedPointer(pointer)
    ? undefined
    : ArrayBuffer.isView(pointer) || Array.isArray(pointer)
      ? pointer as unknown as { [index: number]: unknown }
      : undefined;
  if (!isGeneratedPointer(pointer) && !target) return 0;
  const old = toNumber(
    target ? target[0] : pointerValue(pointer as GeneratedPointer, 0),
  );
  const mask = toNumber(memMask);
  const combined = ((old & ~mask) | (toNumber(data) & mask)) >>> 0;
  if (target) target[0] = combined;
  else setPointerValue(pointer as GeneratedPointer, 0, combined);
  return combined;
}

function applyIdentifierCall(
  name: string,
  args: unknown[],
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: ExecutionContext,
): unknown {
  // A memory handler installed with a delegate. MAME binds the delegate to a
  // target and a method -- `read8sm_delegate(m_dpc, FUNC(dpc_device::read))`
  // points at a *different* device -- and address_space::install_read_handler
  // wants something callable. Without this the delegate evaluated to a number,
  // the install recorded a handler with nothing behind it, and the range was
  // dropped: Pitfall II's DPC coprocessor was never once addressed.
  // MAME's older per-width spellings (read8sm_delegate) and the newer generic
  // one its recent bus devices use -- `emu::rw_delegate(*this, FUNC(...))`,
  // which is how every Game Boy MBC installs its bank-switch writes.
  if (/^(?:read|write)\d*\w*_delegate$/.test(name) || /(?:^|::)rw_delegate$/.test(name)) {
    const handler = memoryDelegate(expression, args, context);
    if (handler) return handler;
  }
  if (name === 'COMBINE_DATA') {
    const memMask = Object.hasOwn(context.locals, 'mem_mask')
      ? context.locals.mem_mask
      : 0xffff;
    return applyCombineData(args[0], context.locals.data, memMask);
  }
  const macro = applyGeneratedMacro(name, args);
  if (macro !== undefined) return macro;
  if (name === 'sizeof') {
    // `sizeof buffer` is the whole object's size, so an operand that evaluated
    // to real storage answers with its own byte length. A type name evaluates
    // to nothing and falls back to that type's declared width.
    const operand = args[0];
    if (isIndexableMemory(operand)) {
      return (operand as { byteLength?: number }).byteLength ?? operand.length;
    }
    return typeByteWidth(generatedExpressionName(expression.args[0]!));
  }
  if (name === 'ioport') return reference(`ioport:${String(args[0] ?? '')}`);
  // Driver handlers use the machine-level membank("tag") finder. Preserve
  // its string tag as a reference so a following ->set_entry(...) reaches
  // the source-derived bank binding instead of coercing the tag to zero.
  if (name === 'membank') return reference(String(args[0] ?? ''));
  if (['u8', 'uint8_t'].includes(name)) return toNumber(args[0]) & 0xff;
  if (['s8', 'int8_t'].includes(name)) return (toNumber(args[0]) << 24) >> 24;
  if (['u16', 'uint16_t'].includes(name)) return toNumber(args[0]) & 0xffff;
  if (['s16', 'int16_t'].includes(name)) return (toNumber(args[0]) << 16) >> 16;
  if (['u32', 'uint32_t'].includes(name)) return toNumber(args[0]) >>> 0;
  if (['int', 's32', 'int32_t'].includes(name)) return toNumber(args[0]) | 0;
  if (['u64', 'uint64_t', 's64', 'int64_t'].includes(name)) {
    return Math.trunc(toNumber(args[0]));
  }
  if (name === 'bool') return toNumber(args[0]) ? 1 : 0;
  // The handler parser deliberately keeps C++ direct-initialization in its
  // call-shaped form.  For inferred values and bitmap references this is an
  // identity operation, not a call to a generated source handler.  Keeping
  // the object intact is essential for declarations such as
  // `bitmap_ind16 &bm(bitmap)` used by Popeye's renderer.
  if (
    name === 'auto' ||
    name === 'bitmap_ind8' ||
    name === 'bitmap_ind16' ||
    name === 'bitmap_rgb32'
  ) {
    return args[0];
  }
  const handler = context.bindings.calls?.[name];
  // A member-function pointer is the name of its method (member-pointers.ts);
  // coercing it like any other argument would call method "0".
  if (handler && name === 'CALL_METHOD') {
    const target = isLValue(args[0]) ? args[0].get() : args[0];
    return handler(target as number, ...args.slice(1).map(callArgument));
  }
  if (handler) return handler(...args.map(callArgument));
  const member = context.bindings.members?.[name];
  if (typeof member === 'function') return member(...args.map(callArgument));
  noteUnresolvedCall(name);
  return reference(`${name}()`);
}

function evaluateCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: ExecutionContext,
): unknown {
  if (expression.callee.kind === 'identifier') {
    const name = expression.callee.name;
    // A callable held by a local or a parameter, which in MAME means a lambda
    // that was passed in. `install_non_power_of_two(length, ..., install)`
    // calls its own last parameter once per decoded chunk, and every Game Boy
    // cartridge installs its ROM that way; resolved as a global name instead,
    // the call found nothing and the cartridge decoded nothing.
    // A forwarding reference (`T &&install`) arrives as the caller's l-value;
    // what it refers to is the lambda.
    const held = Object.hasOwn(context.locals, name) ? context.locals[name] : undefined;
    const local = isLValue(held) ? held.get() : held;
    if (typeof local === 'function') {
      return (local as (...args: unknown[]) => unknown)(
        ...expression.args.map(arg => callArgument(evaluate(arg, context))),
      );
    }
    const generated = context.bindings.referenceCalls?.[name];
    if (generated) {
      return generated(...generatedCallArguments(name, expression.args, context));
    }
    return applyIdentifierCall(
      name,
      expression.args.map(arg => evaluate(arg, context)),
      expression,
      context,
    );
  }
  if (expression.callee.kind === 'member') {
    const generatedName = `${generatedExpressionName(expression.callee.object)}.${expression.callee.property}`;
    const schedulerCall = expression.callee.property === 'synchronize' &&
      expression.callee.object.kind === 'call' &&
      expression.callee.object.callee.kind === 'member' &&
      expression.callee.object.callee.property === 'scheduler' &&
      expression.callee.object.callee.object.kind === 'call' &&
      expression.callee.object.callee.object.callee.kind === 'identifier' &&
      expression.callee.object.callee.object.callee.name === 'machine';
    if (schedulerCall) {
      // With no callback MAME posts an empty timer at the current time: the
      // running processor's slice ends and the others catch up to it, and
      // nothing else happens. POKEY's read asks for one to "force resync".
      if (!expression.args.length) return generatedSynchronize(context.bindings, '', 0);
      const callback = timerDelegateName(expression.args[0]);
      if (!callback) {
        noteUnresolvedCall('synchronize(?)');
        return 0;
      }
      return generatedSynchronize(
        context.bindings,
        callback,
        expression.args[1] ? evaluate(expression.args[1], context) : 0,
      );
    }
    const generated = context.bindings.referenceCalls?.[generatedName];
    if (generated) {
      return generated(...generatedCallArguments(generatedName, expression.args, context));
    }
    const direct = context.bindings.calls?.[generatedName];
    if (direct) {
      const args = expression.args.map(arg => evaluate(arg, context));
      return direct(...args.map(callArgument));
    }
    const rawObject = evaluate(expression.callee.object, context);
    const object = memberObject(rawObject, expression.callee.property);
    const method = expression.callee.property;
    if (typeof object === 'number') {
      const answered = attotimeSecondsMethod(object, method,
        expression.args.map(arg => toNumber(evaluate(arg, context))));
      if (answered !== undefined) return answered;
    }
    // A MAME `rgb_t` is a packed number, and its channel accessors read it
    // back: the TIA builds its 16k blended palette by averaging every pair of
    // base pens through `pen_color(i).r()`.
    if (typeof object === 'number' && !expression.args.length && RGB_CHANNELS[method]) {
      return (object >>> RGB_CHANNELS[method]!) & 0xff;
    }
    // A std::string is a JS string, which has none of its methods. `append`
    // changes the string in place, so its answer is stored back into a
    // receiver that names storage; `std::string(tag()).append(...)` has none.
    const text = isLValue(object) ? object.get() : object;
    if (typeof text === 'string') {
      const answered = generatedStringMethod(text, method,
        ...expression.args.map(arg => evaluate(arg, context)));
      if (answered !== undefined) {
        const receiver = expression.callee.object;
        if (STRING_MUTATORS.has(method) &&
            (receiver.kind === 'identifier' || receiver.kind === 'member' || receiver.kind === 'index')) {
          assign(receiver, '=', answered, context);
        }
        return answered;
      }
    }
    if (isReference(object)) {
      const key = `${object.reference}.${method}`;
      const generated = context.bindings.referenceCalls?.[key];
      if (generated) {
        return generated(...generatedCallArguments(key, expression.args, context));
      }
      // A source-derived composite-device call retains its finder spelling
      // (m_timeplt_audio->sh_irqtrigger_w), while the target handler is keyed
      // by its declaring C++ class. emitSourceHandlerClosure only admits this
      // cross-class dependency when the method is unique, so the method key is
      // the safe bridge between those two source identities.
      // Only device finders/members can denote another source-compiled
      // component. Framework chains such as machine().bookkeeping() may share
      // a method name with a driver wrapper; resolving those by name would
      // call the wrapper recursively instead of the MAME service.
      const generatedMethod = object.reference.startsWith('m_') &&
        !context.bindings.concreteDeviceMembers?.has(object.reference)
        ? context.bindings.referenceCalls?.[method]
        : undefined;
      if (generatedMethod) {
        return generatedMethod(...generatedCallArguments(method, expression.args, context));
      }
      const args = expression.args.map(arg => evaluate(arg, context));
      // MAME device finders expose target() when source code needs a nullable
      // device pointer. Preserve the selected device reference so subsequent
      // calls through a local pointer still reach the bound runtime device.
      if (method === 'target' && args.length === 0) {
        return { reference: object.reference, resolved: true };
      }
      if (object.reference.startsWith('ioport:') && method === 'read') {
        return context.bindings.inputs?.read(object.reference.slice('ioport:'.length)) ?? 0xff;
      }
      if (key === 'machine().scheduler().synchronize') {
        if (!expression.args.length) return generatedSynchronize(context.bindings, '', 0);
        const callback = timerDelegateName(expression.args[0]);
        if (!callback) {
          noteUnresolvedCall('synchronize(?)');
          return 0;
        }
        return generatedSynchronize(
          context.bindings,
          callback,
          expression.args[1] ? evaluate(expression.args[1], context) : 0,
        );
      }
      // Generated devices only execute while their host processor is runnable;
      // board-level reset/hold state is enforced by the frame scheduler.
      if (method === 'suspended') return 0;
      const handler = context.bindings.calls?.[key] ?? context.bindings.calls?.[method];
      if (handler) return handler(...args.map(callArgument));
      if (isVideoPlanCall(method)) return 0;
      // Still answered without effect, as before #178, but counted: a driver
      // that asks for a partial update mid-frame (Neo Geo's raster effects)
      // reaches no screen from here, and that is a gap, not a no-op.
      if (method === 'update_partial') {
        noteUnresolvedCall(key);
        return 0;
      }
      noteUnresolvedCall(key);
      return reference(`${key}()`);
    }
    if (object && (typeof object === 'object' || typeof object === 'function')) {
      // A host object names the parameters MAME declares as references, which
      // the call then writes through: `core_file::length(std::uint64_t &)`.
      const references = expression.references ??
        (object as { [REFERENCE_PARAMETERS]?: Record<string, readonly number[]> })[REFERENCE_PARAMETERS]?.[method];
      const args = expression.args.map((arg, index) =>
        references?.includes(index) ? referenceArgument(arg, context) : evaluate(arg, context));
      if (Array.isArray(object) && (method === 'insert' || method === 'erase')) {
        return generatedVectorMethod(object, method, ...args);
      }
      const methodValue = (object as Record<string, unknown>)[method];
      if (typeof methodValue === 'function') return methodValue.apply(object, args);
      // MAME spells every framework accessor as a call, but the runtime models
      // some of those surfaces as plain data: a bitmap's extent is a field on
      // the generated pixmap, not a method. A zero-argument call whose member
      // resolves to a scalar is that scalar. Falling through to 0 instead made
      // `pixmap.width() - 1` an all-ones mask, so Zaxxon's background sampled
      // past the end of every source row and drew the next row's pixels.
      if (
        !args.length &&
        (typeof methodValue === 'number' || typeof methodValue === 'boolean')
      ) return methodValue;
      // MAME memory containers (required_shared_ptr, std::vector) expose their
      // extent and, for vectors, in-place resizing.
      if (isIndexableMemory(object)) {
        if (method === 'resize') {
          resizeGeneratedMemory(expression.callee.object, toNumber(args[0]), context);
          return 0;
        }
      }
      // A `std::unique_ptr<u8[]>` member is a generated pointer, and MAME
      // indexes it through `.get()`. The accessor answers the pointer itself,
      // exactly as it answers a bare array.
      if (!args.length && (isIndexableMemory(object) || isGeneratedPointer(object))) {
        return generatedContainerAccessor(object, method);
      }
    }
  }
  if (expression.callee.kind === 'index' ||
      (expression.callee.kind === 'unary' && expression.callee.operator === '*')) {
    const callable = evaluate(expression.callee, context);
    const args = expression.args.map(arg => evaluate(arg, context));
    if (typeof callable === 'function') return callable(...args.map(callArgument));
  }
  noteUnresolvedCall(expression.callee.kind === 'member'
    ? `${generatedExpressionName(expression.callee.object)}.${expression.callee.property}`
    : `<${expression.callee.kind}>`);
  return 0;
}

function assign(
  target: GeneratedExpression,
  operator: string,
  value: unknown,
  context: ExecutionContext,
): void {
  if (target.kind === 'identifier') {
    const local = context.locals[target.name];
    const localReference = isLValue(local) ? local : undefined;
    const current = Object.hasOwn(context.locals, target.name)
      ? localReference?.get() ?? local
      : context.bindings.getters?.[target.name]?.() ?? context.bindings.members?.[target.name];
    if (operator === '=' && copiesStruct(current, value)) {
      copyGeneratedStruct(current, isLValue(value) ? value.get() : value);
      return;
    }
    const next = assignmentValue(operator, current, value);
    if (Object.hasOwn(context.locals, target.name)) {
      const wrapped = wrapValue(context.localTypes[target.name], next);
      if (localReference) localReference.set(wrapped);
      else context.locals[target.name] = wrapped;
    }
    else {
      // Setters exist to apply a member's declared bit width, which is
      // meaningless for a memory container; those store by reference.
      const setter = typeof next === 'number' || typeof next === 'boolean'
        ? context.bindings.setters?.[target.name]
        : undefined;
      if (setter) setter(toNumber(next));
      else (context.bindings.members ??= {})[target.name] = next;
    }
    return;
  }
  if (target.kind === 'index') {
    const object = writableIndexObject(target.object, context);
    const index = toNumber(evaluate(target.index, context));
    const current = indexValue(object, index);
    const next = assignmentValue(operator, current, value);
    if (isGeneratedPointer(object)) {
      setPointerValue(object, index, next);
    } else if (ArrayBuffer.isView(object)) {
      (object as Uint8Array)[index] = toNumber(next);
    } else if (Array.isArray(object)) {
      object[index] = next;
    }
    return;
  }
  if (target.kind === 'unary' && target.operator === '*') {
    const pointer = evaluate(target.operand, context);
    if (isIndexableMemory(pointer)) {
      const current = indexValue(pointer, 0);
      const next = assignmentValue(operator, current, value);
      if (ArrayBuffer.isView(pointer)) (pointer as Uint8Array)[0] = toNumber(next);
      else (pointer as unknown[])[0] = next;
      return;
    }
    if (!isGeneratedPointer(pointer)) {
      const received = pointer && typeof pointer === 'object'
        ? `object with keys ${Object.keys(pointer).join(', ') || '(none)'}`
        : `${typeof pointer} ${String(pointer)}`;
      throw new Error(
        `generated dereference assignment has no pointer: ` +
        `*${describeGeneratedTarget(target.operand)} received ${received}`,
      );
    }
    const current = pointerValue(pointer, 0);
    setPointerValue(pointer, 0, assignmentValue(operator, current, value));
    return;
  }
  if (target.kind === 'member') {
    const rawObject = evaluate(target.object, context);
    const object = memberObject(rawObject, target.property);
    if (!object || typeof object !== 'object' || isReference(object)) {
      throw new Error(`generated member assignment has no object for "${target.property}"`);
    }
    const record = object as Record<string, unknown>;
    const next = assignmentValue(operator, record[target.property], value);
    // A struct field carries the width MAME declared. Emitted code narrows to
    // it inline; an interpreted store narrows through the shape the host
    // stamped on the struct, which is a plain hidden property rather than an
    // accessor per field -- accessors made every read of the Game Boy's
    // channel counters a call.
    const widths = (record as { [GENERATED_FIELD_WIDTHS]?: Record<string, number> })
      [GENERATED_FIELD_WIDTHS];
    const width = widths?.[target.property];
    record[target.property] = width === undefined || typeof next !== 'number'
      ? next
      : generatedFieldWidth(next, width);
    return;
  }
  if (target.kind === 'call') {
    assignCallResult(target, value, context);
    return;
  }
  throw new Error(`unsupported generated assignment target "${target.kind}"`);
}

/**
 * Source handlers frequently mutate fixed C++ member arrays whose storage is
 * implicit in the declaring class (for example Midway SSIO's `m_data[4]`).
 * These members do not correspond to a ROM region or mapped RAM share, so
 * there is no external object to bind. Materialise the zero-initialized array
 * on its first indexed write, including nested arrays such as
 * `m_duty_cycle[2][3]`.
 */
/**
 * Storage for a driver-state member MAME declared as a fixed C array, typed
 * and sized the way the declaration is, so an indexed write wraps on its own.
 *
 * Returns nothing for a member with no declared array bound -- a plain array
 * remains the right thing for a member the board grows on demand.
 */
function declaredStateArray(
  bindings: GeneratedHandlerBindings,
  name: string,
): ArrayBufferView | undefined {
  const member = bindings.stateMembers?.find(candidate => candidate.name === name);
  if (!member?.arrayLength) return undefined;
  const { arrayLength, bits, signed } = member;
  if (bits === 8) return signed ? new Int8Array(arrayLength) : new Uint8Array(arrayLength);
  if (bits === 16) return signed ? new Int16Array(arrayLength) : new Uint16Array(arrayLength);
  if (bits === 32) return signed ? new Int32Array(arrayLength) : new Uint32Array(arrayLength);
  return new Uint8Array(arrayLength);
}

function writableIndexObject(
  expression: GeneratedExpression,
  context: ExecutionContext,
): unknown {
  const current = evaluate(expression, context);
  if (isIndexableMemory(current) || isGeneratedPointer(current)) return current;
  if (expression.kind === 'identifier' && expression.name.startsWith('m_')) {
    const members = context.bindings.members ??= {};
    const allocated = declaredStateArray(context.bindings, expression.name) ?? [];
    members[expression.name] = allocated;
    return allocated;
  }
  if (expression.kind === 'index') {
    const parent = writableIndexObject(expression.object, context);
    if (!isIndexableMemory(parent)) return current;
    const index = toNumber(evaluate(expression.index, context));
    const child = indexValue(parent, index);
    if (isIndexableMemory(child) || isGeneratedPointer(child)) return child;
    const allocated: unknown[] = [];
    if (Array.isArray(parent)) parent[index] = allocated;
    return allocated;
  }
  return current;
}

function assignCallResult(
  target: Extract<GeneratedExpression, { kind: 'call' }>,
  value: unknown,
  context: ExecutionContext,
): void {
  const args = target.args.map(arg => toNumber(evaluate(arg, context)));
  if (target.callee.kind === 'identifier') {
    const handler = context.bindings.calls?.[`${target.callee.name}=`];
    if (handler) {
      handler(...args, toNumber(value));
      return;
    }
  } else if (target.callee.kind === 'member') {
    const object = evaluate(target.callee.object, context);
    if (isReference(object)) {
      const handler = context.bindings.calls?.[`${object.reference}.${target.callee.property}=`];
      if (handler) {
        handler(...args, toNumber(value));
        return;
      }
    } else if (object && typeof object === 'object') {
      const handler = (object as Record<string, unknown>)[`${target.callee.property}=`];
      if (typeof handler === 'function') {
        handler.apply(object, [...args, toNumber(value)]);
        return;
      }
    }
  }
  const targetName = target.callee.kind === 'member'
    ? `${generatedExpressionName(target.callee.object)}.${target.callee.property}`
    : generatedExpressionName(target.callee);
  const targetObject = target.callee.kind === 'member'
    ? evaluate(target.callee.object, context)
    : undefined;
  const received = targetObject && typeof targetObject === 'object'
    ? `object with keys ${Object.keys(targetObject).join(', ') || '(none)'}`
    : `${typeof targetObject} ${String(targetObject)}`;
  throw new Error(
    `generated call-result assignment "${targetName}" has no runtime binding ` +
      `(received ${received})`,
  );
}

type FastAssignmentValue = (current: unknown, value: unknown) => unknown;

/**
 * The value a compound assignment stores, with the operator resolved once.
 * An assignment operator is a source constant, so the combiner is cached by it.
 */
const ASSIGNMENT_VALUES = new Map<string, FastAssignmentValue>();

function compileAssignmentValue(operator: string): FastAssignmentValue {
  let combine = ASSIGNMENT_VALUES.get(operator);
  if (combine) return combine;
  const apply = BINARY_OPERATORS[operator.slice(0, -1)] ?? UNKNOWN_BINARY;
  if (operator === '=') combine = (_current, value) => value;
  // `color_prom += 0x40` walks a pointer, exactly as the binary `+` path
  // already handles. Advancing a bare memory container turned the local into a
  // number, so every later read through it returned zero -- Mr. Do!'s sprite
  // lookup PROM read as all-zero after the palette loop stepped past it.
  else if (operator === '+=') {
    combine = (current, value) => isGeneratedPointer(current)
      ? offsetPointer(current, toNumber(value))
      : isIndexableMemory(current)
        ? { generatedPointer: true, source: current, offset: toNumber(value) }
        : apply(toNumber(current), toNumber(value));
  } else if (operator === '-=') {
    combine = (current, value) => isGeneratedPointer(current)
      ? offsetPointer(current, -toNumber(value))
      : isIndexableMemory(current)
        ? { generatedPointer: true, source: current, offset: -toNumber(value) }
        : apply(toNumber(current), toNumber(value));
  } else if (operator === '&=') {
    combine = (current, value) => {
      if (
        current &&
        typeof current === 'object' &&
        typeof (current as { intersect?: unknown }).intersect === 'function'
      ) {
        (current as { intersect: (other: unknown) => void }).intersect(value);
        return current;
      }
      return apply(toNumber(current), toNumber(value));
    };
  } else combine = (current, value) => apply(toNumber(current), toNumber(value));
  ASSIGNMENT_VALUES.set(operator, combine);
  return combine;
}

function assignmentValue(operator: string, current: unknown, value: unknown): unknown {
  return compileAssignmentValue(operator)(current, value);
}

/**
 * A declared type is a source constant, so the wrapper it implies is cached by
 * that string. Deriving it per value put a regex on the interpreter's
 * assignment path, which a renderer walks once per local write per pixel.
 */
const VALUE_WRAPPERS = new Map<string, (value: unknown) => unknown>();

function valueWrapper(valueType: string | undefined): (value: unknown) => unknown {
  const key = valueType ?? '';
  let wrapper = VALUE_WRAPPERS.get(key);
  if (!wrapper) {
    wrapper = compileValueWrapper(valueType);
    VALUE_WRAPPERS.set(key, wrapper);
  }
  return wrapper;
}


/**
 * `reinterpret_cast<u16 *>` over byte memory: a view, not a copy, so writes
 * through the wider type reach the same shared bytes. Undefined for any other
 * pointer cast, which stays an identity.
 */
function isBytePointerType(valueType: string | undefined): boolean {
  return /^(?:u8|uint8_t)$/.test((valueType ?? '').replace(/\bconst\b/g, '').replace(/[\s*]/g, ''));
}

function packedCastView(valueType: string | undefined): boolean | undefined {
  const pointee = (valueType ?? '').replace(/\bconst\b/g, '').replace(/[\s*]/g, '');
  if (/^(?:u16|uint16_t)$/.test(pointee)) return false;
  if (/^(?:s16|int16_t)$/.test(pointee)) return true;
  return undefined;
}

function packedByteView(value: unknown, signed: boolean): unknown {
  if (!(value instanceof Uint8Array) && !(value instanceof Int8Array)) return value;
  const bytes: Uint8Array | Int8Array = value;
  return signed
    ? new Int16Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength >>> 1)
    : new Uint16Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength >>> 1);
}

function wrapValue(valueType: string | undefined, value: unknown): unknown {
  return valueWrapper(valueType)(value);
}

/**
 * One definition of every numeric operator, shared by the interpreter and the
 * compiled fast path. The fast path resolves the entry once when it compiles
 * an expression, so a hot arithmetic node stops re-testing the operator string
 * on every evaluation.
 */
const BINARY_OPERATORS: Record<string, (left: number, right: number) => number> = {
  '|': (left, right) => left | right,
  '^': (left, right) => left ^ right,
  '&': (left, right) => left & right,
  '==': (left, right) => left === right ? 1 : 0,
  '!=': (left, right) => left !== right ? 1 : 0,
  '<': (left, right) => left < right ? 1 : 0,
  '<=': (left, right) => left <= right ? 1 : 0,
  '>': (left, right) => left > right ? 1 : 0,
  '>=': (left, right) => left >= right ? 1 : 0,
  '<<': (left, right) => left << right,
  // C++ >> on unsigned operands is a logical shift. The IR is untyped, so
  // infer signedness from the value: JS-negative means a signed C++ value
  // (arithmetic shift); non-negative u32 values with bit 31 set (for
  // example rgb_t 0xff000000) must not sign-extend, and wider-than-32-bit
  // values shift via division rather than ToInt32 truncation.
  '>>': (left, right) => {
    if (left < 0) return left >> right;
    if (left <= 0xffffffff) return left >>> right;
    return Math.floor(left / 2 ** right);
  },
  '+': (left, right) => left + right,
  '-': (left, right) => left - right,
  '*': (left, right) => left * right,
  // C++ integer division truncates; float division must not. The IR is
  // untyped, so treat the operation as integral only when both operands
  // are integers (float literals and CAP_/RES_-derived values stay exact).
  '/': (left, right) => {
    const quotient = left / right;
    return Number.isInteger(left) && Number.isInteger(right) ? Math.trunc(quotient) : quotient;
  },
  '%': (left, right) => left % right,
};

const UNKNOWN_BINARY = (): number => 0;

function binary(operator: string, left: number, right: number): number {
  return (BINARY_OPERATORS[operator] ?? UNKNOWN_BINARY)(left, right);
}

/**
 * C++ arithmetic on a 64-bit operand, evaluated exactly.
 *
 * A literal too wide for a double promotes its whole expression to 64 bits in
 * C, and the result usually narrows straight back -- MAME's Game Boy pixel
 * interleave ends `& 0x5555`. So the answer returns to a plain number as soon
 * as one can hold it, and the rest of the executor never sees a bigint.
 */
export function generatedWideBinary(
  operator: string,
  left: unknown,
  right: unknown,
): unknown {
  return wideBinary(operator, left, right);
}

const WIDE_OPERATORS: Record<string, (a: bigint, b: bigint) => bigint | boolean> = {
  '|': (a, b) => a | b,
  '^': (a, b) => a ^ b,
  '&': (a, b) => a & b,
  '<': (a, b) => a < b,
  '<=': (a, b) => a <= b,
  '>': (a, b) => a > b,
  '>=': (a, b) => a >= b,
  // Unsigned 64-bit: the operands are masked to their width so a shift or a
  // multiply wraps the way the hardware model expects rather than growing.
  '<<': (a, b) => BigInt.asUintN(64, a << b),
  '>>': (a, b) => BigInt.asUintN(64, a) >> b,
  '+': (a, b) => BigInt.asUintN(64, a + b),
  '-': (a, b) => BigInt.asUintN(64, a - b),
  '*': (a, b) => BigInt.asUintN(64, a * b),
  '/': (a, b) => b === 0n ? 0n : a / b,
  '%': (a, b) => b === 0n ? 0n : a % b,
};

const WIDE_MINIMUM = BigInt(Number.MIN_SAFE_INTEGER);
const WIDE_MAXIMUM = BigInt(Number.MAX_SAFE_INTEGER);

function wideBinary(operator: string, leftValue: unknown, rightValue: unknown): unknown {
  if (typeof leftValue === 'number' && typeof rightValue === 'number') {
    const narrow = narrowWideBinary(operator, leftValue, rightValue);
    if (narrow !== undefined) return narrow;
  }
  const apply = WIDE_OPERATORS[operator];
  if (!apply) return binary(operator, toNumber(leftValue), toNumber(rightValue));
  const result = apply(toBigInt(leftValue), toBigInt(rightValue));
  if (typeof result === 'boolean') return result ? 1 : 0;
  return result >= WIDE_MINIMUM && result <= WIDE_MAXIMUM ? Number(result) : result;
}

/**
 * The double-precision answer, when it is exactly the 64-bit one.
 *
 * A Game Boy tile row is expanded through a chain of six 64-bit operations per
 * fetch, and both ends of that chain are ordinary small integers: a byte goes
 * in and a sixteen-bit value comes out. Converting those to BigInt and back
 * cost more than the arithmetic in the middle, which genuinely needs it.
 *
 * Undefined means "not exact here" — the caller then does it in BigInt. Only
 * non-negative safe integers qualify, because the wide operators mask to
 * unsigned 64 bits and a negative would wrap there and not here.
 */
function narrowWideBinary(operator: string, a: number, b: number): number | undefined {
  if (a < 0 || b < 0 || !Number.isSafeInteger(a) || !Number.isSafeInteger(b)) return undefined;
  switch (operator) {
    case '<': return a < b ? 1 : 0;
    case '<=': return a <= b ? 1 : 0;
    case '>': return a > b ? 1 : 0;
    case '>=': return a >= b ? 1 : 0;
    // JavaScript's bitwise operators are exact only inside 32 bits.
    case '&': return a > 0xffffffff || b > 0xffffffff ? undefined : (a & b) >>> 0;
    case '|': return a > 0xffffffff || b > 0xffffffff ? undefined : (a | b) >>> 0;
    case '^': return a > 0xffffffff || b > 0xffffffff ? undefined : (a ^ b) >>> 0;
    case '>>': return Math.floor(a / 2 ** b);
    case '/': return b === 0 ? 0 : Math.floor(a / b);
    case '%': return b === 0 ? 0 : a % b;
    // Exact when the result is still a safe integer; if it is not, the true
    // value needed more than 53 bits and the double cannot be trusted.
    case '<<': return safeInteger(a * 2 ** b);
    case '+': return safeInteger(a + b);
    // A negative difference is not the same answer: the wide operator masks
    // it to unsigned 64 bits, where it becomes a very large positive.
    case '-': return a >= b ? a - b : undefined;
    case '*': return safeInteger(a * b);
    default: return undefined;
  }
}

function safeInteger(value: number): number | undefined {
  return Number.isSafeInteger(value) ? value : undefined;
}

function toBigInt(value: unknown): bigint {
  if (typeof value === 'bigint') return value;
  const numeric = toNumber(value);
  return Number.isFinite(numeric) ? BigInt(Math.trunc(numeric)) : 0n;
}

function modulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function indexValue(object: unknown, index: number): unknown {
  // Memory first: a typed array is never a pointer wrapper or a reference,
  // and a board's per-pixel row reads (`&bitmap.pix(y)`) land here.
  if (ArrayBuffer.isView(object)) return (object as Uint8Array)[index] ?? 0;
  if (isGeneratedPointer(object)) return pointerValue(object, index);
  // Finder arrays such as required_device_array and required_memory_bank_array
  // are symbolic runtime references, not JavaScript arrays. Preserve the
  // indexed C++ member name so a binding like "m_ay8910[0].data_w" or
  // "m_rombanks[1].set_entry" can resolve it.
  if (isReference(object)) return reference(`${object.reference}[${index}]`);
  if (ArrayBuffer.isView(object)) return (object as Uint8Array)[index] ?? 0;
  if (Array.isArray(object)) return object[index] ?? 0;
  // A C string's characters are its bytes: `names()[0][0] == '*'`.
  if (typeof object === 'string') return object.charCodeAt(index) || 0;
  return 0;
}

function addressOf(expression: GeneratedExpression, context: ExecutionContext): unknown {
  if (expression.kind === 'identifier' && !Object.hasOwn(context.locals, expression.name) &&
      context.bindings.members?.[expression.name] === undefined &&
      context.bindings.referenceCalls?.[expression.name]) {
    return context.bindings.referenceCalls[expression.name];
  }
  if (expression.kind === 'index') {
    const source = evaluate(expression.object, context);
    const offset = toNumber(evaluate(expression.index, context));
    return isGeneratedPointer(source)
      ? offsetPointer(source, offset)
      : { generatedPointer: true, source, offset };
  }
  if (expression.kind === 'call' && expression.callee.kind === 'member') {
    const object = evaluate(expression.callee.object, context);
    const directName = isReference(object)
      ? `${object.reference}.${expression.callee.property}`
      : `${generatedExpressionName(expression.callee.object)}.${expression.callee.property}`;
    const direct = context.bindings.calls?.[directName];
    if (direct) {
      const args = expression.args.map(argument => evaluate(argument, context));
      const result = direct(...args.map(callArgument));
      // MAME factory methods such as tilemap_manager::create return a
      // reference. Taking its address produces the live composed object, not
      // a pointer wrapper around an unresolved call expression.
      if (result && (typeof result === 'object' || typeof result === 'function')) return result;
    }
    const reference = object && typeof object === 'object'
      ? (object as Record<string, unknown>)[`${expression.callee.property}&`]
      : undefined;
    if (typeof reference === 'function') {
      const args = expression.args.map(argument => toNumber(evaluate(argument, context)));
      const pointer = reference.apply(object, args);
      if (isGeneratedPointer(pointer)) return pointer;
    }
    // `&region->as_u8()` is MAME's way of saying "the first byte of this
    // storage", not "a slot holding one value". When the call answers with
    // memory, its address is that memory -- boxed as a single-value slot
    // instead, every Game Boy cartridge installed a ROM window over one byte.
    const memory = evaluate(expression, context);
    if (isIndexableMemory(memory) || isGeneratedPointer(memory)) return memory;
  }
  return {
    generatedPointer: true,
    target: lValue(expression, context),
    offset: 0,
  };
}

function offsetPointer(pointer: GeneratedPointer, offset: number): GeneratedPointer {
  return { ...pointer, offset: pointer.offset + offset };
}

function pointerValue(pointer: GeneratedPointer, index: number): unknown {
  const offset = pointer.offset + index;
  if (pointer.target) return offset === 0 ? pointer.target.get() : 0;
  return indexValue(pointer.source, offset);
}

function setPointerValue(pointer: GeneratedPointer, index: number, value: unknown): void {
  const offset = pointer.offset + index;
  if (pointer.target) {
    if (offset === 0) pointer.target.set(value);
    return;
  }
  if (isGeneratedPointer(pointer.source)) {
    setPointerValue(pointer.source, offset, value);
  } else if (ArrayBuffer.isView(pointer.source)) {
    (pointer.source as Uint8Array)[offset] = toNumber(value);
  } else if (Array.isArray(pointer.source)) {
    pointer.source[offset] = value;
  }
}

function toNumber(value: unknown): number {
  if (isLValue(value)) return toNumber(value.get());
  if (typeof value === 'number') return value;
  if (typeof value === 'boolean') return value ? 1 : 0;
  return Number(value) || 0;
}

function comparableValue(value: unknown): unknown {
  if (isLValue(value)) return comparableValue(value.get());
  if (isReference(value) && value.resolved) return value;
  if (value && typeof value === 'object' && !isReference(value)) {
    // A numeric wrapper compares as its number. `attotime` is the one that
    // reaches here — MAME writes `m_scanline_timer->remaining() ==
    // attotime::zero` — and the runtime carries it as seconds behind an
    // attotime method surface. Everything else a handler holds as an object
    // (arrays, pointers, bitmaps, device references) leaves valueOf alone and
    // still compares by identity.
    const primitive = (value as { valueOf(): unknown }).valueOf();
    if (typeof primitive === 'number') return primitive;
    return value;
  }
  // A C string is a pointer, and no string is the null one: a C64
  // cartridge's `get_feature("exrom") != nullptr` holds for the feature "0".
  // Read as a number, "0" was nullptr and the cartridge's EXROM line never
  // went low.
  if (typeof value === 'string') return value;
  return toNumber(value);
}

/**
 * C++ `==` and `!=`, for values the runtime may hold as pointers.
 *
 * A generated pointer is an address, so two of them are equal when they name
 * the same element of the same memory - not when they happen to be the same
 * JavaScript object, which is an artifact of how the address was built.
 * `runtime.addressOf(m_gfxram, n)` produces a fresh object every time, and a
 * pointer walked with `p++` produces one per step.
 *
 * Emitted code shares this so equality means one thing in both paths. It could
 * not simply reuse the numeric comparison: `Number()` of a pointer object is
 * NaN, `NaN !== NaN` is true, and CPS1's
 * `if (palette_ram != palette_base) palette_ram += 0x200` therefore skipped a
 * page of gfxram before the first page was ever copied, so cps1_build_palette
 * read the wrong half of palette RAM and left the palette black.
 */
/** A value whose `&` is an intersection: MAME's `rectangle`. */
interface Intersectable {
  intersect(other: unknown): void;
  min_x: number;
  max_x: number;
  min_y: number;
  max_y: number;
}

function isIntersectable(value: unknown): value is Intersectable {
  return Boolean(value) && typeof value === 'object' &&
    typeof (value as { intersect?: unknown }).intersect === 'function';
}

/**
 * `rectangle::operator&`: a new rectangle, the intersection of the two. The
 * Spectrum's screen update clips each border strip to the update's cliprect
 * this way.
 */
function intersection(left: Intersectable, right: unknown): Intersectable {
  const copy = Object.assign(Object.create(Object.getPrototypeOf(left)), left) as Intersectable;
  copy.intersect(right);
  return copy;
}

/** C++ `a & b` as the interpreter applies it, for emitted code. */
export function applyGeneratedAnd(left: unknown, right: unknown): unknown {
  if (isIntersectable(left)) return intersection(left, right);
  return toNumber(left) & toNumber(right);
}

export function generatedValuesEqual(left: unknown, right: unknown): boolean {
  const leftValue = comparableValue(left);
  const rightValue = comparableValue(right);
  // `rectangle::operator==` compares the four edges: the Spectrum's screen
  // update draws its border only where the visible area is not the screen.
  if (isIntersectable(leftValue) && isIntersectable(rightValue)) {
    return leftValue.min_x === rightValue.min_x && leftValue.max_x === rightValue.max_x &&
      leftValue.min_y === rightValue.min_y && leftValue.max_y === rightValue.max_y;
  }
  if (isGeneratedPointer(leftValue) && isGeneratedPointer(rightValue)) {
    return leftValue.source === rightValue.source &&
      leftValue.offset === rightValue.offset;
  }
  // A container's begin() is the container itself (generatedContainerAccessor),
  // and an iterator into it is a pointer: `buf.begin() == it` is the pointer
  // at offset zero.
  if (isGeneratedPointer(leftValue) && isIndexableMemory(rightValue)) {
    return leftValue.source === rightValue && leftValue.offset === 0;
  }
  if (isGeneratedPointer(rightValue) && isIndexableMemory(leftValue)) {
    return rightValue.source === leftValue && rightValue.offset === 0;
  }
  return leftValue === rightValue;
}

function truthy(value: unknown): boolean {
  if (isReference(value) && value.resolved) return true;
  // A string is a `const char *` that points somewhere: non-null, so true,
  // whatever it says. `if (get_feature("mirroring"))` read as Number("vertical")
  // was zero, and the NES slot's call_load_pcb skipped every feature a
  // cartridge declares -- its mirroring among them. (The absent feature is 0.)
  if (typeof value === 'string') return true;
  if (value && typeof value === 'object' && !isReference(value) && !isLValue(value)) {
    return true;
  }
  return toNumber(value) !== 0;
}

function reference(name: string): RuntimeReference {
  return { reference: name };
}

function isReference(value: unknown): value is RuntimeReference {
  return Boolean(value && typeof value === 'object' && 'reference' in value);
}

function isGeneratedPointer(value: unknown): value is GeneratedPointer {
  return Boolean(
    value && typeof value === 'object' &&
    (value as GeneratedPointer).generatedPointer === true,
  );
}

/** sizeof for the fixed-width integer names MAME device sources use. */
function typeByteWidth(name: string): number {
  // A pointer, on the 64-bit hosts MAME is built for.
  if (name.trim().endsWith('*')) return 8;
  const match = /(?:^|_)(?:u|s|int|uint)?(8|16|32|64)(?:_t)?$/.exec(name);
  if (match) return Number(match[1]) / 8;
  if (['char', 'bool', 'u8', 's8'].includes(name)) return 1;
  return 1;
}

/** Resolve the byte view a pointer or container expression addresses. */
function generatedMemoryView(
  value: unknown,
  bytewise = false,
): { bytes: ArrayLike<unknown>; offset: number } | undefined {
  if (isGeneratedPointer(value)) {
    const source = value.source;
    if (!isIndexableMemory(source)) return undefined;
    if (bytewise && ArrayBuffer.isView(source)) {
      const view = source as ArrayBufferView;
      const bytesPerElement = (source as { BYTES_PER_ELEMENT?: number }).BYTES_PER_ELEMENT ?? 1;
      return {
        bytes: new Uint8Array(view.buffer, view.byteOffset, view.byteLength),
        offset: value.offset * bytesPerElement,
      };
    }
    return { bytes: source, offset: value.offset };
  }
  if (bytewise && ArrayBuffer.isView(value)) {
    const view = value as ArrayBufferView;
    return { bytes: new Uint8Array(view.buffer, view.byteOffset, view.byteLength), offset: 0 };
  }
  return isIndexableMemory(value) ? { bytes: value, offset: 0 } : undefined;
}

/**
 * The bytes of a scalar whose address was taken (`&address`), as a byte view.
 * A local or member is one value here, not storage, so its bytes are its
 * value's, least significant first, as MAME's little-endian hosts lay it out.
 */
function scalarTarget(value: unknown): value is GeneratedPointer & { target: GeneratedLValue } {
  if (!isGeneratedPointer(value) || !value.target) return false;
  // A struct or array behind the address is storage of its own, not a value,
  // and so is one never given a value: the Game Boy slot reads a GBX trailer
  // struct the same way, into a caller's undeclared `gbxfile::trailer`.
  const held = value.target.get();
  return typeof held === 'number' || typeof held === 'boolean';
}

function scalarBytes(pointer: GeneratedPointer, count: number): Uint8Array {
  let value = toNumber(pointer.target!.get());
  const bytes = new Uint8Array(count);
  for (let index = 0; index < count; index++) {
    bytes[index] = value & 0xff;
    value = Math.floor(value / 256);
  }
  return bytes;
}

/**
 * The cells of a nested array (`uint8_t m_spr_data[8][4]`) in C's row-major
 * order, as one flat run of storage: what memcpy and memset of the whole array
 * address. The runtime holds it as an array of rows, and copying the outer
 * array copied the rows themselves -- the VIC-II's cycle-57 snapshot of its
 * sprite data became the very buffer the next fetches wrote, so sprites 0 and
 * 1 drew the following line's data, a line early.
 */
function nestedCells(value: unknown): { row: { [index: number]: unknown }; index: number }[] | undefined {
  if (!Array.isArray(value) || !value.length || !value.every(row => isIndexableMemory(row))) return undefined;
  const cells: { row: { [index: number]: unknown }; index: number }[] = [];
  for (const row of value as ArrayLike<unknown>[]) {
    const inner = nestedCells(row);
    if (inner) { cells.push(...inner); continue; }
    for (let index = 0; index < row.length; index++) cells.push({ row: row as { [index: number]: unknown }, index });
  }
  return cells;
}

/**
 * A struct as the bytes C lays it out in: its fields in declaration order,
 * each as wide as it is declared (an array field as its elements, a byte each
 * unless typed wider). MAME reads a .crt's header straight into
 * `cbm_crt_header` this way. Byte fields only need no padding, which is the
 * shape of every struct a file is read into.
 */
function structCells(struct: Record<string, unknown>): { set(byte: number): void }[] {
  const widths = (struct as { [GENERATED_FIELD_WIDTHS]?: Record<string, number> })[GENERATED_FIELD_WIDTHS] ?? {};
  const cells: { set(byte: number): void }[] = [];
  for (const name of Object.keys(struct)) {
    const field = struct[name];
    if (field && typeof field === 'object' && !ArrayBuffer.isView(field) && !Array.isArray(field)) {
      cells.push(...structCells(field as Record<string, unknown>));
    } else if (ArrayBuffer.isView(field) || Array.isArray(field)) {
      const array = field as { [index: number]: unknown; length: number; BYTES_PER_ELEMENT?: number };
      const bytes = array.BYTES_PER_ELEMENT ?? 1;
      for (let index = 0; index < array.length; index++) {
        for (let byte = 0; byte < bytes; byte++) {
          cells.push({ set: value => {
            const current = byte ? Number(array[index]) || 0 : 0;
            array[index] = current + value * 2 ** (8 * byte);
          } });
        }
      }
    } else {
      const bytes = Math.max(1, Math.abs(widths[name] ?? 32) / 8);
      for (let byte = 0; byte < bytes; byte++) {
        cells.push({ set: value => {
          const current = byte ? Number(struct[name]) || 0 : 0;
          struct[name] = current + value * 2 ** (8 * byte);
        } });
      }
    }
  }
  return cells;
}

function copyGeneratedMemory(
  destination: unknown,
  source: unknown,
  count: number,
  bytewise = false,
): void {
  // Bytes into a struct (`read(file, &header, CRT_HEADER_LENGTH)`).
  const struct = isGeneratedPointer(destination) && destination.target ? destination.target.get() : destination;
  if (isGeneratedStruct(struct)) {
    const origin = generatedMemoryView(source, bytewise);
    if (!origin) return;
    const cells = structCells(struct);
    for (let index = 0; index < Math.min(count, cells.length); index++) {
      cells[index]!.set(Number(origin.bytes[origin.offset + index] ?? 0) & 0xff);
    }
    return;
  }
  const targetCells = nestedCells(destination);
  const originCells = nestedCells(source);
  if (targetCells || originCells) {
    const origin = originCells ?? [];
    const view = originCells ? undefined : generatedMemoryView(source, bytewise);
    const length = Math.min(count, targetCells?.length ?? count, originCells?.length ?? count);
    const values = Array.from({ length }, (_, index) => originCells
      ? origin[index]!.row[origin[index]!.index]
      : view?.bytes[view.offset + index] ?? 0);
    if (targetCells) values.forEach((value, index) => { targetCells[index]!.row[targetCells[index]!.index] = value; });
    else {
      const target = generatedMemoryView(destination, bytewise);
      if (target) values.forEach((value, index) => { (target.bytes as { [index: number]: unknown })[target.offset + index] = value; });
    }
    return;
  }
  // `memcpy(&value, bytes, 2)` and `image.fread(&address, 2)` fill a scalar:
  // the bytes become its value, little-endian, and any above them stay.
  if (scalarTarget(destination)) {
    const origin = scalarTarget(source)
      ? { bytes: scalarBytes(source, count), offset: 0 }
      : generatedMemoryView(source, bytewise);
    if (!origin) return;
    const kept = scalarBytes(destination, Math.max(count, 4));
    for (let index = 0; index < count; index++) kept[index] = Number(origin.bytes[origin.offset + index] ?? 0) & 0xff;
    let value = 0;
    for (let index = kept.length - 1; index >= 0; index--) value = value * 256 + kept[index]!;
    destination.target.set(value);
    return;
  }
  const target = generatedMemoryView(destination, bytewise);
  const origin = scalarTarget(source)
    ? { bytes: scalarBytes(source, count), offset: 0 }
    : generatedMemoryView(source, bytewise);
  if (!target || !origin) return;
  const writable = target.bytes as unknown as { [index: number]: unknown };
  for (let index = 0; index < count; index++) {
    writable[target.offset + index] = origin.bytes[origin.offset + index] ?? 0;
  }
}

/**
 * Copy `count` bytes from `source` into whatever a handler passed as a
 * destination -- a buffer, a pointer into one, or a scalar's address -- as
 * memcpy would. The host's file reads (an image device's `fread`) land here.
 */
export function copyGeneratedBytes(destination: unknown, source: unknown, count: number): void {
  copyGeneratedMemory(destination, source, count, true);
}

function fillGeneratedMemory(destination: unknown, value: number, count: number): void {
  const cells = nestedCells(destination);
  if (cells) {
    for (const cell of cells.slice(0, count)) cell.row[cell.index] = value;
    return;
  }
  const target = generatedMemoryView(destination, true);
  if (!target) return;
  const writable = target.bytes as unknown as { [index: number]: unknown };
  for (let index = 0; index < count; index++) {
    // `memset(&m_snd[0], 0, sizeof(m_snd[0]))` clears one struct, not the slot
    // holding it: MAME's sound chips reset a channel this way. Overwriting the
    // element with a number left the Game Boy's APU with a number where its
    // channel state had been, and the next field assignment had nothing to
    // assign into.
    const element = writable[target.offset + index];
    if (element && typeof element === 'object' && !ArrayBuffer.isView(element)) {
      clearGeneratedStruct(element as Record<string, unknown>, value);
      continue;
    }
    writable[target.offset + index] = value;
  }
}

/** Set every field of a struct-shaped object, recursing into nested ones. */
function clearGeneratedStruct(target: Record<string, unknown>, value: number): void {
  for (const key of Object.keys(target)) {
    const field = target[key];
    if (ArrayBuffer.isView(field)) {
      (field as unknown as { fill(value: number): void }).fill(value);
    } else if (Array.isArray(field)) {
      field.fill(value);
    } else if (field && typeof field === 'object') {
      clearGeneratedStruct(field as Record<string, unknown>, value);
    } else {
      target[key] = value;
    }
  }
}

/** std::vector::resize over a member bound to a growable byte container. */
function resizeGeneratedMemory(
  target: GeneratedExpression,
  length: number,
  context: ExecutionContext,
): void {
  const current = evaluate(target, context);
  if (Array.isArray(current)) {
    resizeGeneratedVector(current, length);
    return;
  }
  if (!isIndexableMemory(current) || current.length === length) return;
  const resized = ArrayBuffer.isView(current)
    ? new (current.constructor as new (size: number) => ArrayLike<unknown>)(length)
    : new Array<number>(length).fill(0);
  copyGeneratedMemory(resized, current, Math.min(length, current.length));
  assign(target, '=', resized, context);
}

/**
 * C++ `*value`, with the same rules the interpreter applies.
 *
 * The operand's shape decides: a generated pointer reads through its source, a
 * memory container yields its first element, and anything else — a MAME object
 * reached through a pointer, such as `*m_gfxdecode->gfx(0)` — is already the
 * value the source means and passes through untouched.
 *
 * Generated code calls this rather than assuming a pointer. Assuming one made
 * `m_sp_palette->transpen_mask(*m_sp_gfxdecode->gfx(0), ...)` read `.source`
 * off a gfx element that never had one.
 */
/**
 * A `u16*`/`s16*` declaration over byte memory is a reinterpreting view, not a
 * copy. Shared with the device runtime: a generated device core emits the same
 * `runtime.packedView` call, and without it the Neo Geo sprite core stopped on
 * "runtime.packedView is not a function".
 */
/**
 * `reinterpret_cast<uint8_t *>` over wider memory: its bytes, little-endian, at
 * the same place. samples_device reads an 8-bit file into its 16-bit vector and
 * then walks it by the byte.
 */
export function generatedByteView(value: unknown): unknown {
  const bytes = (memory: unknown): Uint8Array | undefined => {
    const view = memory as Uint16Array;
    return ArrayBuffer.isView(memory) && view.BYTES_PER_ELEMENT > 1
      ? new Uint8Array(view.buffer as ArrayBuffer, view.byteOffset, view.byteLength)
      : undefined;
  };
  if (isGeneratedPointer(value)) {
    const source = bytes(value.source);
    if (!source) return value;
    return { ...value, source, offset: value.offset * (value.source as Uint16Array).BYTES_PER_ELEMENT };
  }
  return bytes(value) ?? value;
}

export function generatedPackedView(value: unknown, signed: boolean): unknown {
  if (!(value instanceof Uint8Array) && !(value instanceof Int8Array)) return value;
  const bytes: Uint8Array | Int8Array = value;
  return signed
    ? new Int16Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength >>> 1)
    : new Uint16Array(bytes.buffer as ArrayBuffer, bytes.byteOffset, bytes.byteLength >>> 1);
}

/** The source spelling of an assignment target, for diagnostics. */
function describeGeneratedTarget(expression: unknown): string {
  const node = expression as { kind?: string; name?: string; property?: string; object?: unknown };
  if (node?.kind === 'identifier') return String(node.name);
  if (node?.kind === 'member') return `${describeGeneratedTarget(node.object)}.${node.property}`;
  if (node?.kind === 'call') {
    return `${describeGeneratedTarget((node as { callee?: unknown }).callee)}()`;
  }
  return node?.kind ? `<${node.kind}>` : '<unknown>';
}

export function dereferenceGeneratedValue(value: unknown): unknown {
  if (ArrayBuffer.isView(value)) return (value as Uint8Array)[0] ?? 0;
  if (isGeneratedPointer(value)) return pointerValue(value, 0);
  if (isIndexableMemory(value)) return indexValue(value, 0);
  return value;
}

function isIndexableMemory(value: unknown): value is ArrayLike<unknown> {
  return ArrayBuffer.isView(value) || Array.isArray(value);
}

/**
 * A MAME memory container's own accessor, answered from the container.
 *
 * `std::unique_ptr<u8[]>` and the shared-pointer finders are plain arrays at
 * run time, so `m_vram.get()` has no method to call -- the pointer it returns
 * *is* the array. The interpreter has always resolved this; emitted code did
 * not, and answered 0, so the Game Boy PPU fetched every background tile out
 * of address zero and drew a blank screen.
 */
/**
 * C++ `*pointer = value`, as emitted code performs it.
 *
 * A generated pointer stores at its own source and offset. Plain memory --
 * which is what a `.share()`-bound member is, and qix stores its scanline
 * latch through one -- stores at element zero. Anything else falls back to the
 * indexed store so a materialised member still receives the write.
 */
/**
 * C++ `a + b` where the compiler could not prove either side is a number.
 *
 * A call that answers memory -- `m_palette->pens()` -- has no declared type,
 * and the interpreter decides pointer arithmetic from the value it actually
 * gets. Emitted code that assumed a number turned the Neo Geo's pen base into
 * an integer and drew every sprite from the wrong palette.
 */
export function generatedAdd(left: unknown, right: unknown): unknown {
  // Two plain numbers is what this almost always is, and the pointer and wide
  // cases below each cost a type test to rule out. Emitted code calls it on
  // every `+` whose operands it could not prove numeric, which on the Game Boy
  // is once per instruction in the timer callback alone.
  if (typeof left === 'number' && typeof right === 'number') return left + right;
  if (isGeneratedPointer(left)) return offsetPointer(left, toNumber(right));
  if (isIndexableMemory(left)) {
    return { generatedPointer: true, source: left, offset: toNumber(right) };
  }
  if (isGeneratedPointer(right)) return offsetPointer(right, toNumber(left));
  if (isIndexableMemory(right)) {
    return { generatedPointer: true, source: right, offset: toNumber(left) };
  }
  if (typeof left === 'bigint' || typeof right === 'bigint') {
    return wideBinary('+', left, right);
  }
  return toNumber(left) + toNumber(right);
}

/**
 * C++ `-` for operands that may be pointers: a pointer less a number is a
 * pointer, and two pointers into one buffer are the distance between them
 * (`it - buf.begin()`, which the floppy drive takes from std::upper_bound to
 * find the flux cell under the head).
 */
export function generatedSubtract(left: unknown, right: unknown): unknown {
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  const position = (value: unknown): { source: unknown; offset: number } | undefined =>
    isGeneratedPointer(value) ? { source: value.source, offset: value.offset }
      : isIndexableMemory(value) ? { source: value, offset: 0 } : undefined;
  const from = position(left);
  const to = position(right);
  if (from && to) return from.offset - to.offset;
  if (isGeneratedPointer(left)) return offsetPointer(left, -toNumber(right));
  if (isIndexableMemory(left)) return { generatedPointer: true, source: left, offset: -toNumber(right) };
  if (typeof left === 'bigint' || typeof right === 'bigint') return wideBinary('-', left, right);
  return toNumber(left) - toNumber(right);
}

export function generatedPointerStore(pointer: unknown, value: unknown): unknown {
  if (isGeneratedPointer(pointer)) {
    setPointerValue(pointer, 0, value);
    return value;
  }
  if (isIndexableMemory(pointer)) {
    if (ArrayBuffer.isView(pointer)) (pointer as unknown as Uint8Array)[0] = toNumber(value);
    else (pointer as unknown[])[0] = value;
    return value;
  }
  if (pointer && typeof pointer === 'object') {
    (pointer as Record<number, unknown>)[0] = value;
  }
  return value;
}

/**
 * std::vector's `insert` and `erase`, over a growable vector held as an array.
 * They take iterators, which are positions in the vector: `begin()` is the
 * vector itself and `begin() + i` or `end() - 1` a pointer into it. A plain
 * array has neither method, so a call on one was optional-chained into
 * nothing: the floppy drive's wspan_write never changed a track, and every
 * 1541 write failed its verify (`25, WRITE ERROR`). Anything else keeps its
 * own method of that name.
 */
/** The std::string methods that change the string, answering its new text. */
export const STRING_MUTATORS: ReadonlySet<string> = new Set(['append']);

/**
 * A std::string method over the JS string that stands for one, or undefined
 * for a method or overload not modelled here, which the caller reports as
 * unresolved. A mutator answers the new text; storing it is the caller's.
 *
 * device_generic_cart_interface::rom_alloc names a cartridge's ROM region
 * `fulltag.append(GENERIC_ROM_REGION_TAG)`, and the NES loader hands its
 * `mapinfo.c_str()` to sscanf.
 */
export function generatedStringMethod(text: string, method: string, ...args: unknown[]): unknown {
  const values = args.map(arg => isLValue(arg) ? arg.get() : arg);
  if ((method === 'c_str' || method === 'data') && !values.length) return text;
  if ((method === 'size' || method === 'length') && !values.length) return text.length;
  if (method === 'empty' && !values.length) return text.length ? 0 : 1;
  if (method === 'append' && values.length === 1 && typeof values[0] === 'string') return text + values[0];
  return undefined;
}

/**
 * A std::string method as emitted code calls it (`runtime.stringMethod`): its
 * answer, or 0 -- noted for the census like every other unresolved call.
 */
export function generatedStringCall(value: unknown, method: string, ...args: unknown[]): unknown {
  const text = isLValue(value) ? value.get() : value;
  const answered = typeof text === 'string' ? generatedStringMethod(text, method, ...args) : undefined;
  if (answered !== undefined) return answered;
  noteUnresolvedCall(`std::string::${method}`);
  return 0;
}

export function generatedVectorMethod(container: unknown, method: string, ...args: unknown[]): unknown {
  const vector = isLValue(container) ? container.get() : container;
  if (!Array.isArray(vector)) {
    const own = vector && typeof vector === 'object' ? (vector as Record<string, unknown>)[method] : undefined;
    return typeof own === 'function' ? own.apply(vector, args) ?? 0 : 0;
  }
  const position = (iterator: unknown): number => {
    const held = isLValue(iterator) ? iterator.get() : iterator;
    if (held === vector) return 0;
    if (isGeneratedPointer(held) && held.source === vector) return held.offset;
    throw new Error(`std::vector::${method}: the iterator does not point into the vector`);
  };
  const at = position(args[0]);
  if (method === 'insert') {
    if (args.length !== 2) throw new Error(`std::vector::insert with ${args.length} arguments is not supported`);
    vector.splice(at, 0, isLValue(args[1]) ? args[1].get() : args[1]);
  } else if (method === 'erase') {
    const end = args.length > 1 ? position(args[1]) : at + 1;
    vector.splice(at, Math.max(0, end - at));
  } else {
    throw new Error(`std::vector has no ${method} here`);
  }
  return { generatedPointer: true, source: vector, offset: at };
}

export function generatedContainerAccessor(value: unknown, method: string): unknown {
  const held = isLValue(value) ? value.get() : value;
  if (typeof held === 'number') {
    const answered = attotimeSecondsMethod(held, method);
    if (answered !== undefined) return answered;
  }
  const pointer = isGeneratedPointer(held);
  if (!pointer && !isIndexableMemory(held)) {
    // Not a memory container: a device accessor handing back a reference to
    // one of its own members. `atari_motion_objects_device::bitmap()` returns
    // the sprite bitmap that way, and answering 0 left Atari's screen update
    // taking `&mobitmap.pix(y)` on a number.  Only a non-callable member: a
    // method is something the caller invokes itself.
    const member = held && typeof held === 'object'
      ? (held as Record<string, unknown>)[method]
      : undefined;
    return member !== undefined && typeof member !== 'function' ? member : 0;
  }
  const length = pointer
    ? Math.max(0, (held.source as ArrayLike<unknown>).length - held.offset)
    : (held as ArrayLike<unknown>).length;
  if (method === 'bytes') {
    return !pointer && ArrayBuffer.isView(held)
      ? (held as ArrayBufferView).byteLength
      : pointer && ArrayBuffer.isView(held.source)
        ? Math.max(0, (held.source as ArrayBufferView).byteLength -
          held.offset * ((held.source as { BYTES_PER_ELEMENT?: number }).BYTES_PER_ELEMENT ?? 1))
        : length;
  }
  if (method === 'size' || method === 'length') return length;
  if (method === 'empty') return length === 0 ? 1 : 0;
  if (method === 'target' || method === 'base' || method === 'get') {
    return held;
  }
  // A container's iterators are positions in it, so they can be compared and
  // subtracted (`it - buf.begin()`); `end()` is one past the last element.
  if (method === 'begin' || method === 'end' || method === 'data') {
    const offset = method === 'end' ? length : 0;
    if (pointer) return offsetPointer(held, offset);
    return method === 'end' ? { generatedPointer: true, source: held, offset } : held;
  }
  if (method === 'clear' && Array.isArray(held)) {
    held.length = 0;
    return 0;
  }
  return 0;
}

/**
 * The referent behind a C++ reference argument, or the value itself.
 *
 * A caller cannot know whether the callee reassigns a `&` parameter, so every
 * one of them crosses as a get/set wrapper. Code generation only ever claims a
 * method that does NOT reassign its references, so an emitted callee must be
 * handed what the reference points at instead.
 */
/**
 * The object a member access reaches: a pointer's target, and -- as C decays
 * an array to a pointer to its first element -- a struct array's first
 * struct. ymfm renders `output->clear()` with `output` still the caller's
 * `output_data output[256]`.
 */
function memberObject(value: unknown, property: string): unknown {
  if (isGeneratedPointer(value)) return pointerValue(value, 0);
  // Not a property the array has itself: a range-for reads `__range.length`.
  if (Array.isArray(value) && isGeneratedStruct(value[0]) && !(property in value)) return value[0];
  return value;
}

export function generatedReferent(value: unknown): unknown {
  return isLValue(value) ? value.get() : value;
}

function isLValue(value: unknown): value is GeneratedLValue {
  return Boolean(
    value &&
    typeof value === 'object' &&
    (value as Partial<GeneratedLValue>).generatedLValue === true,
  );
}

/**
 * Arguments crossing into bound calls stay numbers when numeric; objects
 * (bitmaps, cliprects, timers) pass through untouched so device methods can
 * receive them from machine handlers.
 */
function callArgument(value: unknown): number {
  if (typeof value === 'object' && value !== null) return value as unknown as number;
  if (typeof value === 'function') return value as unknown as number;
  // A C string stays one: `file.open(util::string_format("%s/%s.wav", ...))`.
  if (typeof value === 'string') return value as unknown as number;
  return toNumber(value);
}

function generatedCallArguments(
  name: string,
  expressions: GeneratedExpression[],
  context: ExecutionContext,
): GeneratedCallArgument[] {
  const parameters = context.bindings.callParameters?.[name] ?? [];
  return expressions.map((expression, index) =>
    isReferenceParameter(parameters[index], expression)
      ? referenceArgument(expression, context)
      : evaluate(expression, context));
}

/**
 * Is this argument passed by C++ reference, so the callee can write back?
 *
 * The parameter's `&` says it might be, but a lambda literal has no storage to
 * write back to: MAME's cartridge decode helpers take their callback as
 * `T &&install`, and boxing that as an assignable slot handed the helper an
 * object where it expected something to call -- so every Game Boy cartridge
 * decoded its ROM and then installed none of it.
 */

/** Whether a MAME parameter list declares a non-const C++ reference. */
function hasReferenceParameter(parameters: string | undefined): boolean {
  return splitParameters(parameters ?? '')
    .some(parameter => parameter.includes('&') && !/\bconst\b/.test(parameter));
}

function isReferenceParameter(
  parameter: string | undefined,
  expression: GeneratedExpression,
): boolean {
  return Boolean(parameter?.includes('&')) && expression.kind !== 'lambda';
}

/**
 * generatedCallArguments with the argument expressions precompiled.
 *
 * Which parameters are C++ references stays a runtime lookup: a board can bind
 * further generated handlers after a caller has already compiled, and a
 * parameter wrongly treated as by-value silently drops the callee's writes.
 */
function compileGeneratedCallArguments(
  name: string,
  expressions: GeneratedExpression[],
  compiled: FastExpression[],
): (context: ExecutionContext) => GeneratedCallArgument[] {
  return context => {
    const parameters = context.bindings.callParameters?.[name];
    const values = new Array<GeneratedCallArgument>(compiled.length);
    for (let index = 0; index < compiled.length; index++) {
      values[index] = isReferenceParameter(parameters?.[index], expressions[index]!)
        ? referenceArgument(expressions[index]!, context)
        : compiled[index]!(context);
    }
    return values;
  };
}

/**
 * An argument bound to a C++ reference parameter. Storage the source names
 * (a local, a member, an element, a dereference) is passed as an l-value the
 * callee writes back through. Anything else is evaluated once, as C++ binds
 * the reference to that one result: ymfm calls `m_fm.output(output->clear(),
 * ...)`, and as an l-value every read of the parameter cleared the output
 * again, so only the last channel was ever heard.
 */
function referenceArgument(expression: GeneratedExpression, context: ExecutionContext): unknown {
  const storage = expression.kind === 'identifier' || expression.kind === 'member' || expression.kind === 'index' ||
    (expression.kind === 'unary' && expression.operator === '*');
  return storage ? lValue(expression, context) : evaluate(expression, context);
}

function lValue(expression: GeneratedExpression, context: ExecutionContext): GeneratedLValue {
  return {
    generatedLValue: true,
    get: () => evaluate(expression, context),
    set: value => assign(expression, '=', value, context),
  };
}

/**
 * The binding key a call expression denotes is a property of the source text,
 * and decoded IR nodes live as long as the board does — so each node's name is
 * built once. Rebuilding it per call put a recursive string concatenation on
 * the device-call path, which a renderer walks once per sprite row.
 */
const EXPRESSION_NAMES = new WeakMap<GeneratedExpression, string>();

function generatedExpressionName(expression: GeneratedExpression): string {
  let name = EXPRESSION_NAMES.get(expression);
  if (name === undefined) {
    name = buildGeneratedExpressionName(expression);
    EXPRESSION_NAMES.set(expression, name);
  }
  return name;
}

function buildGeneratedExpressionName(expression: GeneratedExpression): string {
  if (expression.kind === 'identifier') return expression.name;
  if (expression.kind === 'member') {
    return `${generatedExpressionName(expression.object)}.${expression.property}`;
  }
  // Required-device arrays retain their source spelling in the generated
  // bindings (`m_mainlatch[1]`).  Static indexed calls must use that same key
  // so `m_mainlatch[1]->write_bit(...)` reaches the concrete device.
  if (expression.kind === 'index' && expression.index.kind === 'number') {
    return `${generatedExpressionName(expression.object)}[${expression.index.value}]`;
  }
  // `machine()` in `machine().rand()`: the chain is named as emitted code and
  // the board name it (`machine().rand`). Unnamed, the call fell through to
  // the host's `machine()` object, which has no `rand`, and the VLM5030's
  // unvoiced frames drew every sign from a zero.
  if (expression.kind === 'call' && !expression.args.length &&
      (expression.callee.kind === 'identifier' || expression.callee.kind === 'member')) {
    return `${generatedExpressionName(expression.callee)}()`;
  }
  return '<expression>';
}

function isAttotimeExpression(
  expression: GeneratedExpression,
  context: ExecutionContext,
): boolean {
  if (expression.kind === 'identifier') {
    return context.localTypes[expression.name]?.replace(/\bconst\b/g, '').trim() === 'attotime';
  }
  if (expression.kind === 'call' && expression.callee.kind === 'identifier') {
    return expression.callee.name.startsWith('attotime::');
  }
  return false;
}

/**
 * The callable behind `readNsm_delegate(target, FUNC(class::method))`.
 *
 * The target is whichever argument is not the FUNC: `*this` for a device's own
 * handler, or a finder member when one device installs another's -- which is
 * how a cartridge exposes its add-on chip to the CPU bus.
 */
function memoryDelegate(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  args: unknown[],
  context: ExecutionContext,
): ((...values: number[]) => number) | undefined {
  const index = expression.args.findIndex(argument =>
    argument.kind === 'call' &&
    argument.callee.kind === 'identifier' &&
    argument.callee.name === 'FUNC');
  if (index < 0) return undefined;
  const named = expression.args[index] as Extract<GeneratedExpression, { kind: 'call' }>;
  const qualified = named.args[0];
  if (qualified?.kind !== 'identifier') return undefined;
  const method = qualified.name.split('::').at(-1);
  if (!method) return undefined;
  const target = args.find((_value, position) => position !== index);
  // MAME picks the delegate flavour from the bound method's own signature:
  // `void bank_switch_fine(u8 data)` installs as a data-only handler, where
  // `void write(offs_t offset, u8 data)` also takes the address. The host
  // always offers both, so a one-parameter handler drops the leading offset --
  // otherwise every Game Boy MBC read an address where it wanted a bank number.
  const declared = context.bindings.callParameters?.[method];
  const dataOnly = declared?.length === 1;
  const apply = (
    callee: (...values: number[]) => unknown,
  ): ((...values: number[]) => number) =>
    (...values: number[]) =>
      Number(callee(...(dataOnly && values.length > 1 ? values.slice(1) : values))) || 0;
  const bound = target && typeof target === 'object'
    ? (target as Record<string, unknown>)[method]
    : undefined;
  if (typeof bound === 'function') return apply(bound as (...values: number[]) => unknown);
  // No separate target: the device is installing one of its own handlers.
  const own = context.bindings.referenceCalls?.[method] ?? context.bindings.calls?.[method];
  if (typeof own === 'function') return apply(own as (...values: number[]) => unknown);
  return undefined;
}

/**
 * MAME `machine().scheduler().synchronize(callback, parameter)`, shared by the
 * interpreter and emitted code. With no callback (`''`) it only ends the
 * running slice. Otherwise the callback is posted at the current time and
 * fires once the running processor has yielded and the others have caught up
 * to it: run inline, Sinistar's first sound command reached the sound board's
 * PIA before the sound CPU had configured CB1's active edge, so the line
 * latched high with no interrupt and no later command could produce an edge.
 * Without a scheduler (a spec harness) it runs inline.
 */
export function generatedSynchronize(
  bindings: GeneratedHandlerBindings,
  callback: string,
  parameter: unknown,
  references = bindings.referenceCalls,
): number {
  if (!callback) {
    bindings.endTimeslice?.();
    return 0;
  }
  const generatedCallback = references?.[callback];
  if (!generatedCallback) {
    noteUnresolvedCall(`synchronize(${callback})`);
    return 0;
  }
  const schedule = bindings.schedule;
  if (!schedule) return Number(generatedCallback(parameter as GeneratedCallArgument)) || 0;
  schedule(() => void generatedCallback(parameter as GeneratedCallArgument));
  return 0;
}

function timerDelegateName(expression: GeneratedExpression | undefined): string | undefined {
  if (
    expression?.kind !== 'call' ||
    expression.callee.kind !== 'identifier' ||
    expression.callee.name !== 'timer_expired_delegate'
  ) {
    return undefined;
  }
  const callback = expression.args[0];
  if (
    callback?.kind !== 'call' ||
    callback.callee.kind !== 'identifier' ||
    callback.callee.name !== 'FUNC'
  ) {
    return undefined;
  }
  const target = callback.args[0];
  if (target?.kind !== 'identifier') return undefined;
  return target.name.split('::').at(-1);
}

/**
 * `rgb_t` channel accessors, by the shift that reads each one out of the
 * packing `rgb_t(...)` builds above: alpha, blue, green, red down to bit zero.
 */
const RGB_CHANNELS: Record<string, number | undefined> = { r: 0, g: 8, b: 16, a: 24 };
