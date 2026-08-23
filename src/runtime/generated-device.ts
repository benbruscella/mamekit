import {
  dereferenceGeneratedValue,
  executeGeneratedProgram,
  type GeneratedCallArgument,
  type GeneratedHandlerBindings,
} from './generated-handler.ts';
import type { GeneratedHandlerProgram } from '../ir/board.ts';
import { GeneratedZ80PioDevice } from './generated-z80pio.ts';
import { GeneratedM68705P5Device } from './generated-m68705.ts';

interface DeviceMember {
  name: string;
  valueType: string;
  bits?: 1 | 8 | 16 | 32;
  signed?: boolean;
  initial?: number;
  values?: unknown[];
  memory?: {
    kind: 'shared' | 'owned';
    elementBytes: number;
    share?: 'self' | string;
  };
  finder?: {
    kind: 'input' | 'device';
    tag: string;
  };
}

interface DeviceCallback {
  signal: string;
  member: string;
  slots: number;
  initial?: number;
}

interface DeviceTimer {
  member: string;
  callback: string;
}

interface DeviceMethod {
  name: string;
  parameters: string;
  program: GeneratedHandlerProgram;
}

type DeviceResource =
  | { kind: 'number'; value: number }
  | { kind: 'region'; name: string }
  | { kind: 'region-length'; name: string }
  | { kind: 'region-pages'; name: string; bytes: number }
  | { kind: 'region-page-mask'; name: string; bytes: number }
  | { kind: 'memory'; name: string; bytes: number; onlyWhenRegionMissing?: string }
  | { kind: 'missing-region-number'; name: string; missing: number; present: number }
  | { kind: 'config-map'; path: string; values: Record<string, number>; fallback?: number }
  | { kind: 'bank-array'; name: string; count: number };

interface GeneratedPointer {
  generatedPointer: true;
  source: ArrayLike<number> & { [index: number]: number };
  offset: number;
}

function isGeneratedPointer(value: unknown): value is GeneratedPointer {
  return Boolean(
    value &&
    typeof value === 'object' &&
    (value as { generatedPointer?: unknown }).generatedPointer,
  );
}

export interface GeneratedDeviceExecutionContext {
  readonly members: Record<string, unknown>;
  /** Late-bound host calls, exposed directly to generated hot paths. */
  readonly calls: Record<string, (...args: any[]) => unknown>;
  readonly palette: number[];
  readIndex(value: unknown, index: number): unknown;
  writeIndex(value: unknown, index: number, next: unknown): unknown;
  addressOf(value: unknown, index: number): GeneratedPointer;
  /** C++ `*value`, resolved by the operand's shape rather than assumed. */
  dereference(value: unknown): unknown;
  invoke(name: string, ...args: GeneratedCallArgument[]): unknown;
}

export type GeneratedDeviceMethodExecutable = (
  runtime: GeneratedDeviceExecutionContext,
  ...args: GeneratedCallArgument[]
) => unknown;

export type GeneratedDeviceMethodMap = Record<string, GeneratedDeviceMethodExecutable>;

export interface GeneratedDeviceDefinition {
  type: string;
  constants: Record<string, number>;
  members: DeviceMember[];
  callbacks: DeviceCallback[];
  timers?: DeviceTimer[];
  methods: DeviceMethod[];
  /** Source-derived runtime entry points selected for direct generated code. */
  hotMethods?: string[];
  slot?: {
    member: string;
    default?: string;
    selector?: string;
    options: Record<string, GeneratedDeviceDefinition>;
  };
  resources?: {
    members?: Record<string, DeviceResource>;
    initialize?: { method: string; args?: DeviceResource[] }[];
  };
  bus?: {
    cpu?: string;
    ranges: GeneratedDeviceBusRange[];
  };
  role?: string;
  links?: GeneratedDeviceLink[];
  clockDivider?: number;
  dataAddressBits?: number;
  compiledMethods?: GeneratedDeviceMethodMap;
  start?: string;
  reset?: string;
  summary: {
    diagnostics: number;
  };
}

export type DeviceCallbackListener = (...args: number[]) => number | void;

export interface Device {
  reset(): void;
  tick(seconds: number): void;
  call(name: string, ...args: number[]): number;
  /** Call a method preserving non-numeric results (memory pointers). */
  invoke(name: string, ...args: GeneratedCallArgument[]): unknown;
  get(name: string): number;
  set(name: string, value: number): void;
  /** Resolve a numeric constant declared by this generated device family. */
  constant(name: string): number | undefined;
  methodNames(): readonly string[];
  arity(name: string): number;
  parameters(name: string): readonly string[];
  signalNames(): readonly string[];
  on(signal: string, listener: DeviceCallbackListener, slot?: number): Device;
  bindCall(
    name: string,
    listener: (...args: any[]) => unknown,
  ): Device;
  cycleClock(): number;
  dataAddressBits(): number | undefined;
  bus(): GeneratedDeviceDefinition['bus'];
  role(): string | undefined;
  links(): readonly GeneratedDeviceLink[];
  invokeSlot(name: string, ...args: GeneratedCallArgument[]): unknown;
}

export interface GeneratedDeviceBusRange {
  start: number;
  end: number;
  read?: string;
  write?: string;
  bank?: string;
}

export interface GeneratedDeviceLink {
  call: string;
  targetRole: string;
  /** Direct source-installed delegate target (PPU scanline/hblank/latch). */
  method?: string;
  ranges?: {
    start: number;
    end: number;
    target: 'self' | 'slot';
    method: string;
  }[];
}

const DEFINITIONS = new Map<string, GeneratedDeviceDefinition>();

export function registerGeneratedDevice(definition: GeneratedDeviceDefinition): void {
  if (definition.summary.diagnostics) {
    throw new Error(
      `cannot register ${definition.type}: ${definition.summary.diagnostics} compiler diagnostics`,
    );
  }
  DEFINITIONS.set(definition.type.toUpperCase(), definition);
}

export function clearGeneratedDevices(): void {
  DEFINITIONS.clear();
}

export function hasGeneratedDevice(type: string): boolean {
  return type.toUpperCase() === 'M68705P5' || DEFINITIONS.has(type.toUpperCase());
}

export interface GeneratedDeviceOptions {
  clock?: number;
  /** Device tag, resolving MAME's DEVICE_SELF memory share binding. */
  tag?: string;
  /** Board memory shares available to required/optional_shared_ptr members. */
  shares?: Record<string, Uint8Array>;
  /** Instance member resources resolved by generated composition metadata. */
  members?: Record<string, unknown>;
  /** Host primitives available before device_start executes. */
  calls?: Record<string, (...args: number[]) => unknown>;
  /** Active-low/raw input ports used by required_ioport finders. */
  inputs?: { read(tag: string): number };
  /** Selected card option for a generated slot definition. */
  slot?: string | number;
  selectors?: Record<string, string | number | undefined>;
  /** Resolve required/optional device finders to host/device proxies. */
  finder?: (tag: string, member?: string) => unknown;
  regions?: Record<string, Uint8Array>;
  configuration?: unknown;
  banks?: Record<string, GeneratedMemoryBank>;
  resourceCache?: Record<string, unknown>;
}

export interface GeneratedMemoryBank {
  configure_entries(start: number, count: number, source: unknown, stride: number): void;
  set_entry(entry: number): void;
  read(offset: number): number;
  write(offset: number, value: number): void;
}

export function createDevice(type: string, options: GeneratedDeviceOptions = {}): Device {
  if (type.toUpperCase() === 'M68705P5') {
    return new GeneratedM68705P5Device(options);
  }
  const definition = DEFINITIONS.get(type.toUpperCase());
  if (!definition) throw new Error(`generated device "${type}" was not registered`);
  if (definition.type.toUpperCase() === 'Z80PIO') {
    return new GeneratedZ80PioDevice(definition, options.clock ?? 0);
  }
  return new IrDevice(definition, options.clock ?? 0, options);
}

/** Numeric seconds with the attotime method surface used by compiled devices. */
class IrAttotime {
  private readonly seconds: number;

  constructor(seconds: number) {
    this.seconds = seconds;
  }

  as_ticks(frequency: number): number {
    return Math.floor(this.seconds * Math.max(0, frequency));
  }

  valueOf(): number {
    return this.seconds;
  }
}

class IrTimer {
  private remainingSeconds = Infinity;
  private intervalSeconds = Infinity;
  private period = Infinity;
  private parameter = 0;
  private adjustmentGeneration = 0;

  adjust(delay: number, parameter = 0, period = Infinity): void {
    this.remainingSeconds = Number.isFinite(delay) && delay >= 0 ? delay : Infinity;
    this.intervalSeconds = this.remainingSeconds;
    this.period = Number.isFinite(period) && period > 0 ? period : Infinity;
    this.parameter = parameter;
    this.adjustmentGeneration++;
  }

  remaining(): IrAttotime {
    return new IrAttotime(this.remainingSeconds);
  }

  elapsed(): IrAttotime {
    const seconds = !Number.isFinite(this.intervalSeconds)
      ? 0
      : Math.max(0, this.intervalSeconds - Math.max(0, this.remainingSeconds));
    return new IrAttotime(seconds);
  }

  enabled(): boolean {
    return Number.isFinite(this.remainingSeconds);
  }

  tick(seconds: number, callback: (parameter: number) => void): void {
    if (!Number.isFinite(this.remainingSeconds)) return;
    this.remainingSeconds -= seconds;
    let firings = 0;
    while (this.remainingSeconds <= 0) {
      if (++firings > 65_536) throw new Error('generated device timer exceeded 65536 firings');
      const overshoot = -this.remainingSeconds;
      const firedPeriod = this.period;
      const generation = this.adjustmentGeneration;
      callback(this.parameter);

      // MAME callbacks commonly re-arm their own one-shot timer. Honour that
      // new schedule instead of disabling it based on the timer state that
      // caused the callback (for example, the NES PPU scanline timer).
      if (this.adjustmentGeneration !== generation) {
        if (!Number.isFinite(this.remainingSeconds)) break;
        this.remainingSeconds -= overshoot;
        continue;
      }

      if (!Number.isFinite(firedPeriod)) {
        this.remainingSeconds = Infinity;
        break;
      }
      this.remainingSeconds += firedPeriod;
      this.intervalSeconds = firedPeriod;
    }
  }
}

class IrDevice implements Device {
  private readonly definition: GeneratedDeviceDefinition;
  private readonly members: Record<string, unknown> = {};
  private readonly memberBits = new Map<string, 1 | 8 | 16 | 32>();
  private readonly memberSigned = new Set<string>();
  private readonly methods = new Map<string, DeviceMethod[]>();
  /** Parameter names resolved once per method (the regex is a hot-path cost). */
  private readonly methodParams = new Map<DeviceMethod, string[]>();
  /** C++ default argument values, applied when a caller omits a parameter. */
  private readonly methodDefaults = new Map<DeviceMethod, (number | undefined)[]>();
  private readonly listeners = new Map<string, DeviceCallbackListener[][]>();
  private readonly bindings: GeneratedHandlerBindings;
  private readonly executionContext: GeneratedDeviceExecutionContext;
  private readonly timers = new Map<string, { timer: IrTimer; callback: string }>();
  private readonly clock: number;
  private slotChild?: IrDevice;

  constructor(
    definition: GeneratedDeviceDefinition,
    clock: number,
    options: GeneratedDeviceOptions = {},
  ) {
    this.definition = definition;
    this.clock = clock;
    const resourceCache = options.resourceCache ?? {};
    const resourceOptions = { ...options, resourceCache };
    const resourceMembers = definition.resources?.members ?? {};
    for (const method of definition.methods) {
      const overloads = this.methods.get(method.name) ?? [];
      overloads.push(method);
      this.methods.set(method.name, overloads);
    }
    for (const member of definition.members) {
      const inputTag = member.finder?.kind === 'input'
        ? [options.tag, member.finder.tag].filter(Boolean).join(':')
        : undefined;
      this.members[member.name] = options.members?.[member.name] ??
        (resourceMembers[member.name]
          ? resolveDeviceResource(resourceMembers[member.name]!, resourceOptions)
          :
        (inputTag
          ? { read: () => options.inputs?.read(inputTag) ?? 0xff }
          : member.finder?.kind === 'device'
            ? options.finder?.(member.finder.tag, member.name) ?? 0
          : member.valueType === 'bitmap_rgb32'
            ? new GeneratedBitmapRgb32()
        : member.memory
        ? memoryMember(member, options)
        : member.values ? [...member.values]
        : isIndexableMemberType(member.valueType) ? []
        : member.initial ?? 0));
      if (member.bits) this.memberBits.set(member.name, member.bits);
      if (member.signed) this.memberSigned.add(member.name);
    }
    for (const [name, resource] of Object.entries(resourceMembers)) {
      if (!Object.hasOwn(this.members, name)) {
        this.members[name] = resolveDeviceResource(resource, resourceOptions);
      }
    }
    Object.assign(this.members, options.members);
    for (const callback of definition.callbacks) {
      const slots = Array.from({ length: callback.slots }, () => [] as DeviceCallbackListener[]);
      this.listeners.set(callback.signal, slots);
      const emitters = slots.map(listeners => {
        const emitter = (...args: number[]) => {
          // A MAME devcb is one .set() plus any number of .append()s, and the
          // whole chain contributes: reads are OR-combined. Overwriting kept
          // only the last entry, which collapsed the Namco 53xx's mode select
          // — (q7<<3)|(q6<<2)|(q5<<1) on one K port — to a single bit.
          //
          // A listener that returns nothing (every write callback) contributes
          // nothing: the declared initial still stands, exactly as it does for
          // an unbound chain. Folding those into 0 silently changed the value
          // read back from write-only devcbs.
          let result: number | undefined;
          for (const listener of listeners) {
            const value = listener(...args);
            if (value === undefined) continue;
            result = (result ?? 0) | (Number(value) || 0);
          }
          return result ?? callback.initial ?? 0;
        };
        // MAME device code uses devcb::isunset() to decide which callback
        // slots override internal latch state.  Treating an unbound slot as a
        // callback returning zero changes input pins and can redirect CPU
        // execution (DK's T0/T1 sound inputs are one concrete example).
        Object.defineProperty(emitter, 'isunset', {
          value: () => listeners.length === 0,
        });
        return emitter;
      });
      this.members[callback.member] = callback.slots === 1 ? emitters[0] : emitters;
    }
    for (const specification of definition.timers ?? []) {
      const timer = new IrTimer();
      this.timers.set(specification.member, { timer, callback: specification.callback });
      this.members[specification.member] = timer;
    }

    const getters: Record<string, () => unknown> = {};
    const setters: Record<string, (value: number) => void> = {};
    for (const member of definition.members) {
      getters[member.name] = () => this.members[member.name] ?? 0;
      setters[member.name] = value => {
        this.members[member.name] = wrap(value, member.bits, member.signed);
      };
    }
    const referenceCalls: NonNullable<GeneratedHandlerBindings['referenceCalls']> = {};
    const callParameters: NonNullable<GeneratedHandlerBindings['callParameters']> = {};
    const palette: number[] = [];
    this.bindings = {
      members: this.members,
      getters,
      setters,
      constants: definition.constants,
      calls: {
        save_item: () => 0,
        save_pointer: () => 0,
        logerror: () => 0,
        clock: () => clock,
        clocks_to_attotime: ticks => clock > 0 ? ticks / clock : Infinity,
        'attotime::from_hz': frequency =>
          frequency > 0 ? 1 / frequency : Infinity,
        'attotime::from_ticks': (ticks, frequency) =>
          frequency > 0 ? ticks / frequency : Infinity,
        set_pen_color: (entry, color) => {
          palette[entry] = color >>> 0;
          return 0;
        },
        pen_color: entry => palette[entry] ?? 0xff000000,
        floor: value => Math.floor(value),
        cos: value => Math.cos(value),
        sin: value => Math.sin(value),
        DEGREE_TO_RADIAN: value => value * Math.PI / 180,
        'std::clamp': (value, minimum, maximum) =>
          Math.min(maximum, Math.max(minimum, value)),
        rgb_t: (...components) => {
          const offset = components.length >= 4 ? 1 : 0;
          const alpha = components.length >= 4 ? components[0]! & 0xff : 0xff;
          const red = components[offset]! & 0xff;
          const green = components[offset + 1]! & 0xff;
          const blue = components[offset + 2]! & 0xff;
          return (alpha << 24 | blue << 16 | green << 8 | red) >>> 0;
        },
        copybitmap: (destination, source) => {
          copyGeneratedBitmap(destination, source);
          return 0;
        },
        ...options.calls,
      },
      referenceCalls,
      callParameters,
    };
    this.executionContext = {
      members: this.members,
      calls: this.bindings.calls!,
      palette,
      readIndex: (value, index) => {
        if (isGeneratedPointer(value)) {
          return value.source[value.offset + index] ?? 0;
        }
        return (value as ArrayLike<unknown> | undefined)?.[index] ?? 0;
      },
      writeIndex: (value, index, next) => {
        if (isGeneratedPointer(value)) {
          value.source[value.offset + index] = Number(next);
        } else if (value && typeof value === 'object') {
          (value as Record<number, unknown>)[index] = next;
        }
        return next;
      },
      addressOf: (value, index) => isGeneratedPointer(value)
        ? {
          generatedPointer: true,
          source: value.source,
          offset: value.offset + index,
        }
        : {
          generatedPointer: true,
          source: value as ArrayLike<number> & { [index: number]: number },
          offset: index,
        },
      dereference: dereferenceGeneratedValue,
      invoke: (name, ...args) => {
        const method = this.selectMethod(name, args);
        if (method) return this.executeMethod(method, this.methodParams.get(method)!, args);
        const binding = this.bindings.calls?.[name];
        if (binding) return binding(...args.map(Number));
        const member = this.members[name];
        if (typeof member === 'function') return member(...args);
        return 0;
      },
    };
    const pendingTimers = [...this.timers.values()];
    this.bindings.calls!.timer_alloc = () => pendingTimers.shift()?.timer ?? 0;
    for (const method of definition.methods) {
      const parameters = splitParameters(method.parameters);
      const names = parameters.map(parameterName);
      callParameters[method.name] = parameters;
      this.methodParams.set(method, names);
      this.methodDefaults.set(method, parameters.map(parameterDefault));
      referenceCalls[method.name] = (...args) => {
        const selected = this.selectMethod(method.name, args);
        return selected
          ? this.executeMethod(selected, this.methodParams.get(selected)!, args)
          : 0;
      };
    }

    if (definition.slot) {
      const selected = definition.slot.selector
        ? options.selectors?.[definition.slot.selector]
        : options.slot;
      const option = String(selected ?? definition.slot.default ?? '');
      const childDefinition = definition.slot.options[option];
      if (childDefinition) {
        const child = this.slotChild = new IrDevice(childDefinition, clock, {
          ...resourceOptions,
          // A child card may itself be a slot in a future bus; do not pass
          // the parent's selected option through accidentally.
          slot: undefined,
        });
        const proxy = Object.fromEntries(child.methodNames().map(name => [
          name,
          (...args: GeneratedCallArgument[]) => child.invoke(name, ...args),
        ]));
        this.members[definition.slot.member] = proxy;
        this.bindings.calls!.get_card_device = () => proxy;
      } else {
        this.members[definition.slot.member] = 0;
        this.bindings.calls!.get_card_device = () => 0;
      }
    }

    if (definition.start) this.call(definition.start);
    for (const initialize of definition.resources?.initialize ?? []) {
      if (!this.methodNames().includes(initialize.method)) continue;
      this.invoke(
        initialize.method,
        ...(initialize.args ?? []).map(resource =>
          resolveDeviceResource(resource, resourceOptions)),
      );
    }
    this.reset();
  }

  reset(): void {
    if (this.definition.reset) this.call(this.definition.reset);
  }

  tick(seconds: number): void {
    for (const { timer, callback } of this.timers.values()) {
      timer.tick(seconds, parameter => this.call(callback, parameter));
    }
  }

  call(name: string, ...args: number[]): number {
    return Number(this.invoke(name, ...args)) || 0;
  }

  invoke(name: string, ...args: GeneratedCallArgument[]): unknown {
    // A composition capability may replace a source method when the method's
    // external card/device dependency is supplied by the host (for example a
    // controller connector backed by live browser input ports).
    const bound = this.bindings.calls?.[name];
    if (bound) return bound(...args.map(Number));
    const method = this.selectMethod(name, args);
    if (!method) throw new Error(`${this.definition.type} has no generated method "${name}"`);
    return this.executeMethod(method, this.methodParams.get(method)!, args);
  }

  get(name: string): number {
    return Number(this.members[name]) || 0;
  }

  set(name: string, value: number): void {
    this.members[name] = wrap(
      value,
      this.memberBits.get(name),
      this.memberSigned.has(name),
    );
  }

  constant(name: string): number | undefined {
    return this.definition.constants[name] ??
      this.definition.constants[name.split('::').at(-1)!];
  }

  methodNames(): readonly string[] {
    return [...this.methods.keys()];
  }

  arity(name: string): number {
    const overloads = this.methods.get(name) ?? [];
    return overloads.length
      ? Math.max(...overloads.map(method => splitParameters(method.parameters).length))
      : 0;
  }

  parameters(name: string): readonly string[] {
    const overloads = this.methods.get(name) ?? [];
    return splitParameters(overloads.at(-1)?.parameters ?? '');
  }

  signalNames(): readonly string[] {
    return [...this.listeners.keys()];
  }

  on(signal: string, listener: DeviceCallbackListener, slot = 0): Device {
    const channels = this.listeners.get(signal);
    if (!channels) throw new Error(`${this.definition.type} has no callback signal "${signal}"`);
    const listeners = channels[slot];
    if (!listeners) {
      throw new Error(`${this.definition.type} callback "${signal}" has no slot ${slot}`);
    }
    listeners.push(listener);
    return this;
  }

  bindCall(
    name: string,
    listener: (...args: any[]) => unknown,
  ): Device {
    this.bindings.calls![name] = listener;
    return this;
  }

  cycleClock(): number {
    return this.clock / (this.definition.clockDivider ?? 1);
  }

  dataAddressBits(): number | undefined {
    return this.definition.dataAddressBits;
  }

  bus(): GeneratedDeviceDefinition['bus'] {
    return this.definition.bus;
  }

  role(): string | undefined {
    return this.definition.role;
  }

  links(): readonly GeneratedDeviceLink[] {
    return this.definition.links ?? [];
  }

  invokeSlot(name: string, ...args: GeneratedCallArgument[]): unknown {
    if (!this.slotChild) throw new Error(`${this.definition.type} has no selected slot card`);
    return this.slotChild.invoke(name, ...args);
  }

  private executeMethod(
    method: DeviceMethod,
    parameterNames: string[],
    args: GeneratedCallArgument[],
  ): unknown {
    try {
      if (
        this.definition.type.toUpperCase() === 'GENERIC_LATCH_8' &&
        method.name === 'write'
      ) {
        // generic_latch_8_device defers the store with
        // scheduler().synchronize(sync_callback, data) so both CPUs observe
        // it at an execution boundary. Generated CPU method calls already are
        // such a boundary; run the source callback immediately rather than
        // dropping the opaque timer_expired_delegate expression.
        return this.invoke('sync_callback', args[0] ?? 0);
      }
      const defaults = this.methodDefaults.get(method);
      const resolvedArgs = parameterNames.map((_name, index) =>
        args[index] ?? defaults?.[index] ?? 0);
      const compiled = this.definition.compiledMethods?.[method.name];
      if (compiled) return compiled(this.executionContext, ...resolvedArgs);
      const locals: Record<string, unknown> = {};
      for (let index = 0; index < parameterNames.length; index++) {
        locals[parameterNames[index]!] = resolvedArgs[index];
      }
      return executeGeneratedProgram(method.program, this.bindings, locals).value;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(`${this.definition.type}.${method.name}: ${message}`);
    }
  }

  private selectMethod(
    name: string,
    args: GeneratedCallArgument[],
  ): DeviceMethod | undefined {
    const overloads = this.methods.get(name);
    if (!overloads?.length) return undefined;
    const exact = overloads.filter(method =>
      (this.methodParams.get(method) ?? splitParameters(method.parameters)).length === args.length);
    if (exact.length) return exact.at(-1);
    return overloads
      .filter(method => {
        const parameters = this.methodParams.get(method) ?? splitParameters(method.parameters);
        const defaults = this.methodDefaults.get(method) ??
          parameters.map(parameterDefault);
        return parameters.length >= args.length &&
          defaults.slice(args.length).every(value => value !== undefined);
      })
      .sort((left, right) =>
        splitParameters(left.parameters).length - splitParameters(right.parameters).length)
      .at(0) ?? overloads.at(-1);
  }
}

class IrMemoryBank implements GeneratedMemoryBank {
  private source: ArrayLike<number> = new Uint8Array(0);
  private stride = 1;
  private entry = 0;

  configure_entries(_start: number, _count: number, source: unknown, stride: number): void {
    if (ArrayBuffer.isView(source) || Array.isArray(source)) {
      this.source = source as ArrayLike<number>;
    }
    this.stride = Math.max(1, stride | 0);
  }

  set_entry(entry: number): void {
    this.entry = Math.max(0, entry | 0);
  }

  read(offset: number): number {
    return this.source[this.entry * this.stride + offset] ?? 0xff;
  }

  write(offset: number, value: number): void {
    const target = this.source as { [index: number]: number };
    const index = this.entry * this.stride + offset;
    if (index >= 0 && index < this.source.length) target[index] = value & 0xff;
  }
}

function resolveDeviceResource(
  resource: DeviceResource,
  options: GeneratedDeviceOptions,
): unknown {
  if (resource.kind === 'number') return resource.value;
  const regions = options.regions ?? {};
  if (resource.kind === 'region') return regions[resource.name] ?? new Uint8Array(0);
  if (resource.kind === 'region-length') return regions[resource.name]?.length ?? 0;
  if (resource.kind === 'region-pages') {
    return Math.floor((regions[resource.name]?.length ?? 0) / Math.max(1, resource.bytes));
  }
  if (resource.kind === 'region-page-mask') {
    const pages = Math.floor((regions[resource.name]?.length ?? 0) / Math.max(1, resource.bytes));
    return Math.max(0, pages - 1);
  }
  if (resource.kind === 'missing-region-number') {
    return regions[resource.name]?.length ? resource.present : resource.missing;
  }
  if (resource.kind === 'config-map') {
    const value = resource.path.split('.').reduce<unknown>(
      (current, key) => current && typeof current === 'object'
        ? (current as Record<string, unknown>)[key]
        : undefined,
      options.configuration,
    );
    return resource.values[String(value)] ?? resource.fallback ?? 0;
  }
  if (resource.kind === 'memory') {
    const bytes = resource.onlyWhenRegionMissing && regions[resource.onlyWhenRegionMissing]?.length
      ? 0
      : resource.bytes;
    const key = `memory:${resource.name}:${bytes}`;
    return (options.resourceCache ??= {})[key] ??=
      new Uint8Array(Math.max(0, bytes));
  }
  const banks = options.banks ??= {};
  const result = Array.from({ length: resource.count }, (_unused, index) => {
    const key = `${resource.name}${index}`;
    return banks[key] ??= new IrMemoryBank();
  });
  return result;
}

/** Minimal MAME bitmap_rgb32 value used by generated device methods. */
class GeneratedBitmapRgb32 {
  pixels = new Uint32Array(0);
  private bitmapWidth = 0;
  private bitmapHeight = 0;

  allocate(width: number, height: number): void {
    this.bitmapWidth = Math.max(0, width | 0);
    this.bitmapHeight = Math.max(0, height | 0);
    this.pixels = new Uint32Array(this.bitmapWidth * this.bitmapHeight);
  }

  width(): number {
    return this.bitmapWidth;
  }

  height(): number {
    return this.bitmapHeight;
  }

  pix(y: number, x = 0): number {
    return this.pixels[y * this.bitmapWidth + x] ?? 0;
  }

  'pix='(y: number, x: number, value: number): void {
    const index = y * this.bitmapWidth + x;
    if (index >= 0 && index < this.pixels.length) this.pixels[index] = value >>> 0;
  }

  'pix&'(y: number, x = 0): {
    generatedPointer: true;
    source: Uint32Array;
    offset: number;
  } {
    return {
      generatedPointer: true,
      source: this.pixels,
      offset: y * this.bitmapWidth + x,
    };
  }
}

function copyGeneratedBitmap(destination: unknown, source: unknown): void {
  const pixels = source && typeof source === 'object' &&
    ArrayBuffer.isView((source as { pixels?: unknown }).pixels)
    ? (source as { pixels: Uint32Array }).pixels
    : undefined;
  if (!pixels || !destination || typeof destination !== 'object') return;
  const direct = (destination as { direct?: { pixels?: Uint32Array } }).direct?.pixels;
  if (direct) {
    direct.set(pixels.subarray(0, direct.length));
    return;
  }
  const setPixel = (destination as Record<string, unknown>)['pix='];
  if (typeof setPixel !== 'function') return;
  const width = Math.max(1, Math.floor(Math.sqrt(pixels.length)));
  for (let index = 0; index < pixels.length; index++) {
    (setPixel as (y: number, x: number, value: number) => void)(
      Math.floor(index / width),
      index % width,
      pixels[index]!,
    );
  }
}

/**
 * Bind a MAME memory container member: a shared pointer aliases the board share
 * MAME's constructor names (DEVICE_SELF is the device's own tag), and an owned
 * vector starts empty for device_start to size.
 */
function memoryMember(
  member: DeviceMember,
  options: GeneratedDeviceOptions,
): ArrayLike<number> {
  const memory = member.memory!;
  if (memory.kind === 'owned') return new Uint8Array(0);
  const tag = memory.share === 'self' ? options.tag : memory.share;
  const bytes = tag ? options.shares?.[tag] : undefined;
  if (!bytes) {
    throw new Error(
      `generated device memory share "${tag ?? memory.share}" is not available for ${member.name}`,
    );
  }
  return bytes;
}

function splitParameters(parameters: string): string[] {
  return parameters.split(',').map(parameter => parameter.trim()).filter(Boolean);
}

/**
 * Members MAME declares as a memory block rather than a scalar.
 *
 * These arrive with no size, no values and no initial, so they settled on the
 * scalar default of `0`. The interpreter hid that: its indexed-write path
 * allocates a backing array for any unset `m_` member on first use
 * (`writableIndexObject` in src/ir/execute.ts). A compiled method has no such
 * fallback — `writeIndex` only stores into something that is already an
 * object, so with `0` there it silently discarded every write.
 *
 * Venture (issue #63) is what that costs: the 6532's `m_ram` is the sound
 * 6502's zero page and stack. Once `ram_w` compiled, every push and every
 * zero-page store vanished, so the audio CPU could not run its service routine
 * and the board was silent — while `ram_r` stayed correct and hid the cause.
 * Allocating here keeps the two execution paths agreeing on one store. This
 * must stay *after* the `values` branch: i8257's `m_channel` is `channel[]`
 * with four initial structs, and claiming it first replaced them with an empty
 * array, so device_reset wrote through undefined and dkong stopped booting.
 */
function isIndexableMemberType(valueType: string | undefined): boolean {
  if (!valueType) return false;
  return /^(?:memory_share_creator|required_shared_ptr|optional_shared_ptr)\b/.test(valueType)
    || /\[\s*\d*\s*\]$/.test(valueType);
}

function parameterName(parameter: string): string {
  return /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.replace(/=[\s\S]*$/, '')) ?.[1]
    ?? /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter)?.[1]
    ?? parameter;
}

/** A C++ default argument, when it is a plain numeric literal. */
function parameterDefault(parameter: string): number | undefined {
  const value = /=\s*([\s\S]+)$/.exec(parameter)?.[1]?.trim();
  if (value === undefined) return undefined;
  const numeric = /^(?:0[xX][\da-fA-F]+|\d+)[uUlL]*$/.exec(value);
  if (numeric) return Number(value.replace(/[uUlL]+$/, ''));
  // `~Type(0)` and kin are MAME's all-ones memory masks.
  if (/^~\s*\w+\s*\(\s*0\s*\)$/.test(value)) return 0xffffffff;
  return undefined;
}

function wrap(value: number, bits?: 1 | 8 | 16 | 32, signed = false): number {
  if (bits === 1) return value ? 1 : 0;
  if (bits === 8) return signed ? value << 24 >> 24 : value & 0xff;
  if (bits === 16) return signed ? value << 16 >> 16 : value & 0xffff;
  if (bits === 32) return signed ? value | 0 : value >>> 0;
  return value;
}
