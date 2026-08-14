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

const DEFAULT_CONSTANTS: Record<string, number> = {
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
  const result = executeOperations(program.operations, context);
  return result.control === 'return'
    ? { returned: true, ...(result.value !== undefined ? { value: result.value } : {}) }
    : { returned: false };
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
  const prepared = preparedMachineCalls(machine, bindings, handler.ownerClass);
  const suffix = /_(\d+)$/.exec(handler.method);
  const generatedBindings: GeneratedHandlerBindings = {
    ...bindings,
    constants: {
      ...handler.constants,
      ...bindings.constants,
      ...(suffix ? { Which: Number(suffix[1]) } : {}),
    },
    referenceCalls: prepared.referenceCalls,
    callParameters: prepared.callParameters,
    concreteDeviceMembers: prepared.concreteDeviceMembers,
  };
  return executeGeneratedProgram(handler.program!, generatedBindings, args);
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
  if (cached) return cached;

  const compiled = (machine.handlers ?? []).filter(candidate =>
    candidate.program && candidate.program.diagnostics.length === 0);
  const referenceCalls = { ...bindings.referenceCalls };
  const callParameters = { ...bindings.callParameters };
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
  };
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
  const prepared = preparedMachineCalls(machine, bindings, handler.ownerClass);
  const suffix = /_(\d+)$/.exec(handler.method);
  const generatedBindings: GeneratedHandlerBindings = {
    ...bindings,
    constants: {
      ...handler.constants,
      ...bindings.constants,
      ...(suffix ? { Which: Number(suffix[1]) } : {}),
    },
    referenceCalls: prepared.referenceCalls,
    callParameters: prepared.callParameters,
    concreteDeviceMembers: prepared.concreteDeviceMembers,
  };
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
      const value = operation.value
        ? compileFastExpression(operation.value, bindings, localNames)
        : () => 0;
      const wrap = compileValueWrapper(operation.valueType);
      compiled.push(context => {
        context.localTypes[operation.name] = operation.valueType;
        context.locals[operation.name] = wrap(value(context));
        return undefined;
      });
      continue;
    }
    if (operation.op === 'assign') {
      const value = compileFastExpression(operation.value, bindings, localNames);
      compiled.push(context => {
        assign(operation.target, operation.operator, value(context), context);
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
    return undefined;
  }
  return context => {
    for (const operation of compiled) {
      const result = operation(context);
      if (result?.control) return result;
    }
    return undefined;
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
    const wrap = compileValueWrapper(expression.valueType);
    return context => wrap(operand(context));
  }
  if (expression.kind === 'binary') {
    const left = compileFastExpression(expression.left, bindings, locals);
    const right = compileFastExpression(expression.right, bindings, locals);
    if (expression.operator === '&&') {
      return context => truthy(left(context)) && truthy(right(context)) ? 1 : 0;
    }
    if (expression.operator === '||') {
      return context => truthy(left(context)) || truthy(right(context)) ? 1 : 0;
    }
    return context => {
      const leftValue = left(context);
      const rightValue = right(context);
      if (expression.operator === '+' && isGeneratedPointer(leftValue)) {
        return offsetPointer(leftValue, toNumber(rightValue));
      }
      if (expression.operator === '+' && isIndexableMemory(leftValue)) {
        return { generatedPointer: true, source: leftValue, offset: toNumber(rightValue) };
      }
      if (expression.operator === '+' && isGeneratedPointer(rightValue)) {
        return offsetPointer(rightValue, toNumber(leftValue));
      }
      if (expression.operator === '-' && isGeneratedPointer(leftValue)) {
        return offsetPointer(leftValue, -toNumber(rightValue));
      }
      if (expression.operator === '==' || expression.operator === '!=') {
        const equal = comparableValue(leftValue) === comparableValue(rightValue);
        return expression.operator === '==' ? Number(equal) : Number(!equal);
      }
      return binary(expression.operator, toNumber(leftValue), toNumber(rightValue));
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
  // Calls and assignment expressions have nuanced reference/device semantics;
  // retain their established evaluator while the enclosing operations and
  // arithmetic remain precompiled.
  return context => evaluate(expression, context);
}

function compileValueWrapper(valueType: string | undefined): (value: unknown) => unknown {
  const normalized = valueType?.replace(/\bconst\b/g, '').trim();
  if (normalized === 'uint8_t' || normalized === 'u8') return value => toNumber(value) & 0xff;
  if (normalized === 'int8_t' || normalized === 's8' || normalized === 'char') {
    return value => toNumber(value) << 24 >> 24;
  }
  if (normalized === 'bool') return value => toNumber(value) ? 1 : 0;
  if (normalized === 'uint16_t' || normalized === 'u16') return value => toNumber(value) & 0xffff;
  if (normalized === 'int16_t' || normalized === 's16') {
    return value => toNumber(value) << 16 >> 16;
  }
  if (normalized === 'uint32_t' || normalized === 'u32') return value => toNumber(value) >>> 0;
  if (normalized === 'int32_t' || normalized === 's32') return value => toNumber(value) | 0;
  if (normalized === 'uint64_t' || normalized === 'u64' ||
      normalized === 'int64_t' || normalized === 's64') {
    return value => Math.trunc(toNumber(value));
  }
  return value => wrapValue(valueType, value);
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
      const equal = comparableValue(leftValue) === comparableValue(rightValue);
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

function isFloatingExpression(expression: GeneratedExpression): boolean {
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
    const args = expression.args.map(arg => evaluate(arg, context));
    if (name === 'COMBINE_DATA') {
      const pointer = args[0];
      if (!isGeneratedPointer(pointer)) return 0;
      const old = toNumber(pointerValue(pointer, 0));
      const data = toNumber(context.locals.data);
      const memMask = Object.hasOwn(context.locals, 'mem_mask')
        ? toNumber(context.locals.mem_mask)
        : 0xffff;
      const combined = ((old & ~memMask) | (data & memMask)) >>> 0;
      setPointerValue(pointer, 0, combined);
      return combined;
    }
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
      const red = toNumber(args[0]) & 0xff;
      const green = toNumber(args[1]) & 0xff;
      const blue = toNumber(args[2]) & 0xff;
      return (0xff000000 | blue << 16 | green << 8 | red) >>> 0;
    }
    const paletteExpansion = /^pal([1-8])bit$/.exec(name);
    if (paletteExpansion) {
      const bits = Number(paletteExpansion[1]);
      const maximum = (1 << bits) - 1;
      return Math.round((toNumber(args[0]) & maximum) * 255 / maximum);
    }
    if (name === 'assert' || name === 'static_assert') return 0;
    if (name === 'sizeof') {
      return typeByteWidth(generatedExpressionName(expression.args[0]!));
    }
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

function assignmentValue(operator: string, current: unknown, value: unknown): unknown {
  if (operator === '=') return value;
  if (operator === '+=' && isGeneratedPointer(current)) {
    return offsetPointer(current, toNumber(value));
  }
  if (operator === '-=' && isGeneratedPointer(current)) {
    return offsetPointer(current, -toNumber(value));
  }
  if (
    operator === '&=' &&
    current &&
    typeof current === 'object' &&
    typeof (current as { intersect?: unknown }).intersect === 'function'
  ) {
    (current as { intersect: (other: unknown) => void }).intersect(value);
    return current;
  }
  return binary(operator.slice(0, -1), toNumber(current), toNumber(value));
}

function wrapValue(valueType: string | undefined, value: unknown): unknown {
  if (valueType?.includes('*') && value instanceof Uint8Array) {
    const normalized = valueType.replace(/\bconst\b/g, '').replace(/\s/g, '');
    if (/^(?:u16|uint16_t)\*$/.test(normalized)) {
      return new Uint16Array(value.buffer, value.byteOffset, value.byteLength >>> 1);
    }
    if (/^(?:s16|int16_t)\*$/.test(normalized)) {
      return new Int16Array(value.buffer, value.byteOffset, value.byteLength >>> 1);
    }
  }
  if (valueType === 'auto' || valueType?.includes('*') || valueType?.includes('&')) return value;
  valueType = valueType?.replace(/\bconst\b/g, '').trim();
  if (valueType === 'rectangle' && value && typeof value === 'object') {
    return Object.assign(
      Object.create(Object.getPrototypeOf(value)),
      value,
    );
  }
  if (value && typeof value === 'object') return value;
  const number = toNumber(value);
  if (valueType === 'uint8_t' || valueType === 'u8') return number & 0xff;
  if (valueType === 'int8_t' || valueType === 's8') return (number << 24) >> 24;
  if (valueType === 'char') return (number << 24) >> 24;
  if (valueType === 'bool') return number ? 1 : 0;
  if (valueType === 'uint16_t' || valueType === 'u16') return number & 0xffff;
  if (valueType === 'int16_t' || valueType === 's16') return (number << 16) >> 16;
  if (valueType === 'uint32_t' || valueType === 'u32') return number >>> 0;
  if (valueType === 'int32_t' || valueType === 's32') return number | 0;
  if (
    valueType === 'uint64_t' || valueType === 'u64' ||
    valueType === 'int64_t' || valueType === 's64'
  ) {
    return Math.trunc(number);
  }
  return number;
}

function binary(operator: string, left: number, right: number): number {
  if (operator === '|') return left | right;
  if (operator === '^') return left ^ right;
  if (operator === '&') return left & right;
  if (operator === '==') return left === right ? 1 : 0;
  if (operator === '!=') return left !== right ? 1 : 0;
  if (operator === '<') return left < right ? 1 : 0;
  if (operator === '<=') return left <= right ? 1 : 0;
  if (operator === '>') return left > right ? 1 : 0;
  if (operator === '>=') return left >= right ? 1 : 0;
  if (operator === '<<') return left << right;
  if (operator === '>>') {
    // C++ >> on unsigned operands is a logical shift. The IR is untyped, so
    // infer signedness from the value: JS-negative means a signed C++ value
    // (arithmetic shift); non-negative u32 values with bit 31 set (for
    // example rgb_t 0xff000000) must not sign-extend, and wider-than-32-bit
    // values shift via division rather than ToInt32 truncation.
    if (left < 0) return left >> right;
    if (left <= 0xffffffff) return left >>> right;
    return Math.floor(left / 2 ** right);
  }
  if (operator === '+') return left + right;
  if (operator === '-') return left - right;
  if (operator === '*') return left * right;
  if (operator === '/') {
    // C++ integer division truncates; float division must not. The IR is
    // untyped, so treat the operation as integral only when both operands
    // are integers (float literals and CAP_/RES_-derived values stay exact).
    const quotient = left / right;
    return Number.isInteger(left) && Number.isInteger(right) ? Math.trunc(quotient) : quotient;
  }
  if (operator === '%') return left % right;
  return 0;
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
  if (value && typeof value === 'object' && !isReference(value)) return value;
  return toNumber(value);
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

function isIndexableMemory(value: unknown): value is ArrayLike<unknown> {
  return ArrayBuffer.isView(value) || Array.isArray(value);
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

function lValue(expression: GeneratedExpression, context: ExecutionContext): GeneratedLValue {
  return {
    generatedLValue: true,
    get: () => evaluate(expression, context),
    set: value => assign(expression, '=', value, context),
  };
}

function generatedExpressionName(expression: GeneratedExpression): string {
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
