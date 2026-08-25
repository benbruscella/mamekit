// Generic execution of generated handler IR.
//
// Neutral by construction: this interprets typed operations lowered from MAME
// source and knows nothing about buses, browsers or board composition. It sits
// in src/ir because both sides need it — the knowledge-graph builder evaluates
// constant expressions with it during generation, and the browser runtime
// executes the same programs at run time. One interpreter means the two cannot
// disagree about what a lowered program means.

import type {
  BoardIr,
  GeneratedCallback,
  GeneratedHandlerRuntime,
  GeneratedExpression,
  GeneratedHandler,
  GeneratedHandlerOperation,
  GeneratedHandlerProgram,
} from './board.ts';

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
  /** Device-finder members whose calls must resolve only to concrete hardware. */
  concreteDeviceMembers?: ReadonlySet<string>;
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
  M6809_IRQ_LINE: 0,
  M6809_FIRQ_LINE: 1,
  KONAMI_IRQ_LINE: 0,
  KONAMI_FIRQ_LINE: 1,
  'm6502_device::IRQ_LINE': 0,
  'm6502_device::NMI_LINE': -1,
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
  'attotime::never': Infinity,
  'attotime::zero': 0,
};

const CACHE_ONLY_METHODS = new Set([
  'mark_all_dirty',
  'mark_tile_dirty',
  'set_flip',
  'set_scrollx',
  'set_scrolly',
  'update_partial',
]);

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
): { returned: boolean; value?: unknown } {
  if (program.diagnostics.length) {
    throw new Error(`cannot execute handler with compiler diagnostics: ${program.diagnostics.join('; ')}`);
  }
  const context: ExecutionContext = {
    bindings,
    locals: {
      ...args,
      addr: args.addr ?? 0,
      offset: args.offset ?? 0,
      data: args.data ?? 0,
      state: args.state ?? args.data ?? 0,
    },
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


export function executeGeneratedMachineProgram(
  machine: BoardIr,
  handler: GeneratedHandler,
  bindings: GeneratedHandlerBindings,
  args: Record<string, unknown>,
): { returned: boolean; value?: unknown } {
  const compiled = machine.compiledHandlers?.[`${handler.ownerClass}.${handler.method}`];
  if (compiled) {
    const prepared = preparedMachineCalls(machine, bindings, handler.ownerClass);
    const names = parameterNames(handler.parameters);
    const value = compiled(
      preparedHandlerRuntime(prepared, bindings),
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
  return prepared.runtime = {
    get members() { return bindings.members ??= {}; },
    calls,
    get palette() { return []; },
    readIndex: (value, index) => isGeneratedPointer(value)
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
    invoke: (name, ...args) => prepared.referenceCalls[name]?.(...args) ??
      bindings.calls?.[name]?.(...args.map(toNumber)) ?? 0,
    macro: (name, ...args) => applyGeneratedMacro(name, args) ?? 0,
    combineData: applyCombineData,
    divide: applyGeneratedDivision,
    same: generatedValuesEqual,
    andAssign: applyGeneratedAndAssign,
    // The board's state object only holds what a handler has written, so a
    // read can miss three things the interpreter resolves: a declared getter,
    // a member whose stored value is undefined, and a device finder, which
    // answers as a resolved reference and is therefore truthy. Emitted code
    // reaches this only when `members.<name>` is absent, so the fast path
    // stays a plain property read.
    member: name => {
      const getter = bindings.getters?.[name];
      if (getter) return getter();
      if (Object.hasOwn(bindings.members ?? {}, name)) return bindings.members![name];
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
  };
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
    if (!referenceCalls[qualified]) {
      referenceCalls[qualified] = (...values) => invoke(candidate, values);
    }
    if (!referenceCalls[candidate.method]) {
      referenceCalls[candidate.method] = (...values) => {
        const target = resolve(candidate.method);
        return target ? invoke(target, values) : 0;
      };
    }
    const parameters = (candidate.parameters ?? '')
      .split(',')
      .map(parameter => parameter.trim())
      .filter(Boolean);
    callParameters[qualified] = parameters;
    callParameters[candidate.method] = parameters;
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
  } as PreparedMachineCalls;
  byOwner.set(ownerClass, prepared);
  return prepared;
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
        const wrapped = wrapValue(
          context.localTypes[name],
          combine(reference ? reference.get() ?? local : local, value),
        );
        if (reference) reference.set(wrapped);
        else context.locals[name] = wrapped;
        return;
      }
      const next = combine(
        context.bindings.getters?.[name]?.() ?? context.bindings.members?.[name],
        value,
      );
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
  if (expression.kind === 'number' || expression.kind === 'string') {
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
    const constant = bindings.constants?.[name] ?? bindings.constants?.[constantName] ??
      DEFAULT_CONSTANTS[name] ?? DEFAULT_CONSTANTS[constantName];
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
      if (Object.hasOwn(bindings.members ?? {}, name)) return bindings.members![name];
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
    const wrap = valueWrapper(expression.valueType);
    return context => wrap(operand(context));
  }
  if (expression.kind === 'binary') {
    const left = compileFastExpression(expression.left, bindings, locals);
    const right = compileFastExpression(expression.right, bindings, locals);
    const operator = expression.operator;
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
        return toNumber(leftValue) + toNumber(rightValue);
      };
    }
    if (operator === '-') {
      return context => {
        const leftValue = left(context);
        const rightValue = right(context);
        return isGeneratedPointer(leftValue)
          ? offsetPointer(leftValue, -toNumber(rightValue))
          : toNumber(leftValue) - toNumber(rightValue);
      };
    }
    return context => apply(toNumber(left(context)), toNumber(right(context)));
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
      const object = isGeneratedPointer(raw) ? pointerValue(raw, 0) : raw;
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
  if (declared === 'uint16_t' || declared === 'u16') return value => toNumber(value) & 0xffff;
  if (declared === 'int16_t' || declared === 's16') {
    return value => toNumber(value) << 16 >> 16;
  }
  if (declared === 'uint32_t' || declared === 'u32') return value => toNumber(value) >>> 0;
  if (declared === 'int32_t' || declared === 's32') return value => toNumber(value) | 0;
  if (declared === 'uint64_t' || declared === 'u64' ||
      declared === 'int64_t' || declared === 's64') {
    return value => Math.trunc(toNumber(value));
  }
  // wrapValue's terminal case: an unnamed scalar type (`int`, `float`, a
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
    names = key
      .split(',')
      .map(parameter => /(\w+)\s*$/.exec(parameter.trim())?.[1])
      .filter((name): name is string => Boolean(name));
    PARAMETER_NAMES.set(key, names);
  }
  return names;
}

function executeOperations(
  operations: GeneratedHandlerOperation[],
  context: ExecutionContext,
): ExecutionResult {
  for (const operation of operations) {
    if (operation.op === 'declare') {
      context.localTypes[operation.name] = operation.valueType;
      context.locals[operation.name] = wrapValue(operation.valueType, operation.value
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
  if (expression.kind === 'number' || expression.kind === 'string') return expression.value;
  if (expression.kind === 'identifier') {
    if (Object.hasOwn(context.locals, expression.name)) {
      const local = context.locals[expression.name];
      return isLValue(local) ? local.get() : local;
    }
    const getter = context.bindings.getters?.[expression.name];
    if (getter) return getter();
    if (Object.hasOwn(context.bindings.members ?? {}, expression.name)) {
      return context.bindings.members![expression.name];
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
    const constantName = expression.name.split('::').at(-1)!;
    const constant = context.bindings.constants?.[expression.name] ??
      context.bindings.constants?.[constantName] ??
      DEFAULT_CONSTANTS[expression.name] ??
      DEFAULT_CONSTANTS[constantName];
    if (constant !== undefined) return constant;
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
    if (expression.operator === '-' && isGeneratedPointer(leftValue)) {
      return offsetPointer(leftValue, -toNumber(rightValue));
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
    const object = isGeneratedPointer(rawObject) ? pointerValue(rawObject, 0) : rawObject;
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
  return evaluateCall(expression, context);
}

export function isFloatingExpression(expression: GeneratedExpression): boolean {
  if (expression.kind === 'number') return Boolean(expression.floating);
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
export function applyGeneratedMacro(name: string, args: unknown[]): unknown {
  if (name === 'BIT') {
    // MAME BIT(x, n) extracts one bit; BIT(x, n, w) extracts a w-bit field.
    const width = args.length > 2 ? toNumber(args[2]) : 1;
    return (toNumber(args[0]) >> toNumber(args[1])) & ((1 << width) - 1);
  }
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
  if (name === 'ALLOC' || name === 'make_unique_clear') {
    return new Uint8Array(Math.max(0, toNumber(args[0])));
  }
  if (name === 'ARRAY') return args;
  if (name === 'floor') return Math.floor(toNumber(args[0]));
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
  const paletteExpansion = /^pal([1-8])bit$/.exec(name);
  if (paletteExpansion) {
    const bits = Number(paletteExpansion[1]);
    const maximum = (1 << bits) - 1;
    return Math.round((toNumber(args[0]) & maximum) * 255 / maximum);
  }
  if (name === 'assert' || name === 'static_assert') return 0;
  if (name === 'memcpy' || name === 'memmove') {
    copyGeneratedMemory(args[0], args[1], toNumber(args[2]));
    return args[0];
  }
  if (name === 'std::copy_n') {
    copyGeneratedMemory(args[2], args[0], toNumber(args[1]));
    return args[2];
  }
  if (name === 'memset') {
    fillGeneratedMemory(args[0], toNumber(args[1]), toNumber(args[2]));
    return args[0];
  }
  if (name === 'rgb_t::black') return 0xff000000;
  if (name === 'rgb_t::white') return 0xffffffff;
  if (name === 'CAP_P') return toNumber(args[0]) * 1e-12;
  if (name === 'CAP_N') return toNumber(args[0]) * 1e-9;
  if (name === 'CAP_U') return toNumber(args[0]) * 1e-6;
  if (name === 'RES_K') return toNumber(args[0]) * 1e3;
  if (name === 'RES_M') return toNumber(args[0]) * 1e6;
  if (name === 'attotime::from_hz') return 1 / Math.max(1, toNumber(args[0]));
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
  if (!isGeneratedPointer(pointer)) return 0;
  const old = toNumber(pointerValue(pointer, 0));
  const mask = toNumber(memMask);
  const combined = ((old & ~mask) | (toNumber(data) & mask)) >>> 0;
  setPointerValue(pointer, 0, combined);
  return combined;
}

function applyIdentifierCall(
  name: string,
  args: unknown[],
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: ExecutionContext,
): unknown {
  if (name === 'COMBINE_DATA') {
    const memMask = Object.hasOwn(context.locals, 'mem_mask')
      ? context.locals.mem_mask
      : 0xffff;
    return applyCombineData(args[0], context.locals.data, memMask);
  }
  const macro = applyGeneratedMacro(name, args);
  if (macro !== undefined) return macro;
  if (name === 'sizeof') {
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
  if (['s32', 'int32_t'].includes(name)) return toNumber(args[0]) | 0;
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
  if (handler) return handler(...args.map(callArgument));
  const member = context.bindings.members?.[name];
  if (typeof member === 'function') return member(...args.map(callArgument));
  return reference(`${name}()`);
}

function evaluateCall(
  expression: Extract<GeneratedExpression, { kind: 'call' }>,
  context: ExecutionContext,
): unknown {
  if (expression.callee.kind === 'identifier') {
    const name = expression.callee.name;
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
      const callback = timerDelegateName(expression.args[0]);
      const generatedCallback = callback
        ? context.bindings.referenceCalls?.[callback]
        : undefined;
      if (!generatedCallback) return 0;
      return generatedCallback(
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
    const object = isGeneratedPointer(rawObject) ? pointerValue(rawObject, 0) : rawObject;
    const method = expression.callee.property;
    if (typeof object === 'number' && method === 'as_ticks') {
      const clock = Math.max(1, toNumber(evaluate(expression.args[0]!, context)));
      return Math.floor(object * clock);
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
        const callback = timerDelegateName(expression.args[0]);
        const generatedCallback = callback
          ? context.bindings.referenceCalls?.[callback]
          : undefined;
        if (!generatedCallback) return 0;
        return generatedCallback(
          expression.args[1] ? evaluate(expression.args[1], context) : 0,
        );
      }
      // Generated devices only execute while their host processor is runnable;
      // board-level reset/hold state is enforced by the frame scheduler.
      if (method === 'suspended') return 0;
      const handler = context.bindings.calls?.[key] ?? context.bindings.calls?.[method];
      if (handler) return handler(...args.map(callArgument));
      if (CACHE_ONLY_METHODS.has(method)) return 0;
      return reference(`${key}()`);
    }
    if (object && (typeof object === 'object' || typeof object === 'function')) {
      const args = expression.args.map(arg => evaluate(arg, context));
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
        if (method === 'bytes' || method === 'size' || method === 'length') {
          return object.length;
        }
        if (method === 'empty') return object.length === 0 ? 1 : 0;
        if (method === 'resize') {
          resizeGeneratedMemory(expression.callee.object, toNumber(args[0]), context);
          return 0;
        }
        if (
          method === 'target' || method === 'base' || method === 'get' ||
          method === 'begin'
        ) return object;
      }
    }
  }
  if (expression.callee.kind === 'index') {
    const callable = evaluate(expression.callee, context);
    const args = expression.args.map(arg => evaluate(arg, context));
    if (typeof callable === 'function') return callable(...args.map(callArgument));
  }
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
      throw new Error(`generated dereference assignment has no pointer (received ${received})`);
    }
    const current = pointerValue(pointer, 0);
    setPointerValue(pointer, 0, assignmentValue(operator, current, value));
    return;
  }
  if (target.kind === 'member') {
    const rawObject = evaluate(target.object, context);
    const object = isGeneratedPointer(rawObject) ? pointerValue(rawObject, 0) : rawObject;
    if (!object || typeof object !== 'object' || isReference(object)) {
      throw new Error(`generated member assignment has no object for "${target.property}"`);
    }
    const record = object as Record<string, unknown>;
    record[target.property] = assignmentValue(operator, record[target.property], value);
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
function writableIndexObject(
  expression: GeneratedExpression,
  context: ExecutionContext,
): unknown {
  const current = evaluate(expression, context);
  if (isIndexableMemory(current) || isGeneratedPointer(current)) return current;
  if (expression.kind === 'identifier' && expression.name.startsWith('m_')) {
    const members = context.bindings.members ??= {};
    const allocated: unknown[] = [];
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
  else if (operator === '+=') {
    combine = (current, value) => isGeneratedPointer(current)
      ? offsetPointer(current, toNumber(value))
      : apply(toNumber(current), toNumber(value));
  } else if (operator === '-=') {
    combine = (current, value) => isGeneratedPointer(current)
      ? offsetPointer(current, -toNumber(value))
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

function modulo(value: number, divisor: number): number {
  return ((value % divisor) + divisor) % divisor;
}

function indexValue(object: unknown, index: number): unknown {
  if (isGeneratedPointer(object)) return pointerValue(object, index);
  // Finder arrays such as required_device_array and required_memory_bank_array
  // are symbolic runtime references, not JavaScript arrays. Preserve the
  // indexed C++ member name so a binding like "m_ay8910[0].data_w" or
  // "m_rombanks[1].set_entry" can resolve it.
  if (isReference(object)) return reference(`${object.reference}[${index}]`);
  if (ArrayBuffer.isView(object)) return (object as Uint8Array)[index] ?? 0;
  if (Array.isArray(object)) return object[index] ?? 0;
  return 0;
}

function addressOf(expression: GeneratedExpression, context: ExecutionContext): unknown {
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
export function generatedValuesEqual(left: unknown, right: unknown): boolean {
  const leftValue = comparableValue(left);
  const rightValue = comparableValue(right);
  if (isGeneratedPointer(leftValue) && isGeneratedPointer(rightValue)) {
    return leftValue.source === rightValue.source &&
      leftValue.offset === rightValue.offset;
  }
  return leftValue === rightValue;
}

function truthy(value: unknown): boolean {
  if (isReference(value) && value.resolved) return true;
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
  const match = /(?:^|_)(?:u|s|int|uint)?(8|16|32|64)(?:_t)?$/.exec(name);
  if (match) return Number(match[1]) / 8;
  if (['char', 'bool', 'u8', 's8'].includes(name)) return 1;
  return 1;
}

/** Resolve the byte view a pointer or container expression addresses. */
function generatedMemoryView(
  value: unknown,
): { bytes: ArrayLike<unknown>; offset: number } | undefined {
  if (isGeneratedPointer(value)) {
    const source = value.source;
    return isIndexableMemory(source) ? { bytes: source, offset: value.offset } : undefined;
  }
  return isIndexableMemory(value) ? { bytes: value, offset: 0 } : undefined;
}

function copyGeneratedMemory(destination: unknown, source: unknown, count: number): void {
  const target = generatedMemoryView(destination);
  const origin = generatedMemoryView(source);
  if (!target || !origin) return;
  const writable = target.bytes as unknown as { [index: number]: unknown };
  for (let index = 0; index < count; index++) {
    writable[target.offset + index] = origin.bytes[origin.offset + index] ?? 0;
  }
}

function fillGeneratedMemory(destination: unknown, value: number, count: number): void {
  const target = generatedMemoryView(destination);
  if (!target) return;
  const writable = target.bytes as unknown as { [index: number]: unknown };
  for (let index = 0; index < count; index++) writable[target.offset + index] = value;
}

/** std::vector::resize over a member bound to a growable byte container. */
function resizeGeneratedMemory(
  target: GeneratedExpression,
  length: number,
  context: ExecutionContext,
): void {
  const current = evaluate(target, context);
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
export function dereferenceGeneratedValue(value: unknown): unknown {
  if (isGeneratedPointer(value)) return pointerValue(value, 0);
  if (isIndexableMemory(value)) return indexValue(value, 0);
  return value;
}

function isIndexableMemory(value: unknown): value is ArrayLike<unknown> {
  return ArrayBuffer.isView(value) || Array.isArray(value);
}

/**
 * The referent behind a C++ reference argument, or the value itself.
 *
 * A caller cannot know whether the callee reassigns a `&` parameter, so every
 * one of them crosses as a get/set wrapper. Code generation only ever claims a
 * method that does NOT reassign its references, so an emitted callee must be
 * handed what the reference points at instead.
 */
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
  return toNumber(value);
}

function generatedCallArguments(
  name: string,
  expressions: GeneratedExpression[],
  context: ExecutionContext,
): GeneratedCallArgument[] {
  const parameters = context.bindings.callParameters?.[name] ?? [];
  return expressions.map((expression, index) =>
    parameters[index]?.includes('&')
      ? lValue(expression, context)
      : evaluate(expression, context));
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
      values[index] = parameters?.[index]?.includes('&')
        ? lValue(expressions[index]!, context)
        : compiled[index]!(context);
    }
    return values;
  };
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
