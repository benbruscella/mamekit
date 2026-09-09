// Capture and restore the mutable state of a composed machine.
//
// This is a MAMEKIT host feature, not MAME behavior (ARCHITECTURE.md §8,
// "Host features"): it knows nothing about a Z80 or a tilemap. It walks
// whatever containers the generic execution model holds -- an emitted CPU
// core's own fields, a device's members record, a share, a timer -- and
// writes the same shapes back IN PLACE, so every alias, binding and hot-path
// link the board resolved at construction survives a load.
//
// The walk is structural with two protocols on top:
//
// - a class that owns state names it through `stateKeys()`, because a blind
//   walk over, say, an interpreted CPU would swallow the IR definition it
//   holds. A class without `stateKeys()` and with methods on its prototype
//   is opaque and contributes nothing; a class whose prototype defines only
//   accessors (an emitted core's register pair, a width-enforcing struct) is
//   data and walks like a plain object.
// - `stateRestored()` runs after an object's state has been written back,
//   for the caches the object derives from that state (a tilemap's decoded
//   tiles, a palette's colors, a bus's view overlays).
//
// A typed array over a buffer the board named (a ROM region, a share) is
// captured as a reference, never as bytes: the board restores each named
// buffer once, and views of it -- in driver state, in device members, as
// 16-bit windows, as offset subarrays -- need nothing written.

export interface StatefulKeys {
  /** Own property names that hold state; everything else on the object is wiring. */
  stateKeys(): readonly string[];
  /** Rebuild whatever this object derives from the state just written back. */
  stateRestored?(): void;
  /**
   * Keys whose typed array the object reallocates as it runs (a bitmap sized
   * by a source `allocate()`); a save of another size replaces the buffer
   * instead of being refused.
   */
  stateResizable?(): readonly string[];
}

/** A captured tree: scalars, cloned typed arrays, plain objects, arrays, Maps, Sets. */
export type StateNode = unknown;

export interface StateDiagnostic {
  path: string;
  message: string;
}

/**
 * Marks a function a slot may hold as state: a CPU's interrupt vector source
 * is one. The function is captured by this name and restored from the
 * caller's `functions` table, so a board of the same game hands the slot its
 * own equivalent closure.
 */
export const STATE_FUNCTION: unique symbol = Symbol.for('mamekit.stateFunction');

export function namedStateFunction<F extends (...args: never[]) => unknown>(name: string, fn: F): F {
  Object.defineProperty(fn, STATE_FUNCTION, { value: name, enumerable: false });
  return fn;
}

function functionName(value: unknown): string | undefined {
  return typeof value === 'function'
    ? (value as { [STATE_FUNCTION]?: string })[STATE_FUNCTION]
    : undefined;
}

/** The node a named function is captured as. */
interface FunctionReference {
  $function: string;
}

/**
 * Marks a value object (MAME's attotime is one) that a slot holds by
 * reference and that carries behavior with its data: it is captured as its
 * enumerable data under `$factory`, and restored by the caller's factory of
 * that name, so a slot that was a plain zero before the value arrived gets
 * a real value back.
 */
export const STATE_FACTORY = '$factory';

/**
 * The marker is an ordinary enumerable property, not a symbol: C++ value
 * semantics mean the interpreter copies such an object when a driver assigns
 * it (`m_interrupt_time = machine().time()`), and a copy keeps this and the
 * data but not a symbol.
 */
export function stateValue<T extends object>(factory: string, value: T): T {
  Object.defineProperty(value, STATE_FACTORY, { value: factory, enumerable: true, writable: true, configurable: true });
  return value;
}

function factoryName(value: unknown): string | undefined {
  const name = typeof value === 'object' && value !== null
    ? (value as { [STATE_FACTORY]?: unknown })[STATE_FACTORY]
    : undefined;
  return typeof name === 'string' ? name : undefined;
}

function isFactoryNode(node: unknown): node is Record<string, unknown> & { $factory: string } {
  return typeof node === 'object' && node !== null && !Array.isArray(node) &&
    typeof (node as { $factory?: unknown }).$factory === 'string';
}

function isFunctionReference(node: unknown): node is FunctionReference {
  return typeof node === 'object' && node !== null &&
    typeof (node as FunctionReference).$function === 'string';
}

export interface WalkOptions {
  /** Buffers the caller restores itself; views of them are captured by name. */
  namedBuffers?: Map<ArrayBufferLike, string>;
  /** Functions a slot may hold, by the name `namedStateFunction` gave them. */
  functions?: Map<string, (...args: never[]) => unknown>;
  /** Value objects a slot may hold, rebuilt from their captured data by the name `stateValue` gave them. */
  factories?: Map<string, (data: Record<string, unknown>) => object>;
  /** Called for every opaque object the walk skipped, for coverage review. */
  onOpaque?: (path: string, value: object) => void;
  /**
   * Classes whose every own property is state despite the methods on their
   * prototype: an emitted CPU core is one (its fields are exactly the
   * members its MAME source declared), and it cannot declare `stateKeys()`
   * without re-emitting every core.
   */
  walkOwnKeys?: (value: object) => boolean;
}

/** The node a view of a named buffer is captured as. */
interface BufferReference {
  $buffer: string;
  byteOffset: number;
  length: number;
}

type Kind = 'scalar' | 'skip' | 'ref' | 'bytes' | 'array' | 'map' | 'set' | 'object' | 'opaque';

type TypedArray =
  | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array
  | Float32Array | Float64Array | Uint8ClampedArray | BigInt64Array | BigUint64Array;

const DATA_PROTOTYPES = new WeakMap<object, boolean>();

/**
 * The declared state keys of an object, or undefined when it declares none.
 * A Proxy that answers every property with a function (a device finder, an
 * ioport handle) looks like it has `stateKeys` but returns no array; it is
 * not stateful.
 */
function statefulKeys(value: object): readonly string[] | undefined {
  const method = (value as { stateKeys?: unknown }).stateKeys;
  if (typeof method !== 'function') return undefined;
  const keys = (method as () => unknown).call(value);
  return Array.isArray(keys) ? keys as readonly string[] : undefined;
}

function hasStateKeys(value: object): value is StatefulKeys {
  return statefulKeys(value) !== undefined;
}

/**
 * A class instance walks like a plain object only when nothing on its
 * prototype chain is a method: accessors are how a register pair or a
 * width-enforcing struct presents its fields, but a method means behavior
 * the walk cannot see through, and the object is opaque unless it declares
 * `stateKeys()`.
 */
function isDataObject(value: object): boolean {
  const prototype = Object.getPrototypeOf(value) as object | null;
  if (prototype === null || prototype === Object.prototype) return true;
  const cached = DATA_PROTOTYPES.get(prototype);
  if (cached !== undefined) return cached;
  let data = true;
  for (let p: object | null = prototype; p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
    for (const name of Reflect.ownKeys(p)) {
      if (name === 'constructor') continue;
      const descriptor = Object.getOwnPropertyDescriptor(p, name);
      if (descriptor && typeof descriptor.value === 'function') { data = false; break; }
    }
    if (!data) break;
  }
  DATA_PROTOTYPES.set(prototype, data);
  return data;
}

function kindOf(value: unknown, options?: WalkOptions): Kind {
  if (value === null || value === undefined) return 'scalar';
  switch (typeof value) {
    case 'number': case 'boolean': case 'string': case 'bigint': return 'scalar';
    case 'function': return functionName(value) === undefined ? 'skip' : 'ref';
    case 'symbol': return 'skip';
    default: break;
  }
  if (ArrayBuffer.isView(value)) return value instanceof DataView ? 'skip' : 'bytes';
  if (value instanceof ArrayBuffer) return 'skip';
  if (Array.isArray(value)) return 'array';
  if (value instanceof Map) return 'map';
  if (value instanceof Set) return 'set';
  if (hasStateKeys(value as object) || isDataObject(value as object)) return 'object';
  if (factoryName(value) !== undefined) return 'object';
  if (options?.walkOwnKeys?.(value as object)) return 'object';
  return 'opaque';
}

function isBufferReference(node: unknown): node is BufferReference {
  return typeof node === 'object' && node !== null &&
    typeof (node as BufferReference).$buffer === 'string';
}

function keysOf(value: object): readonly string[] {
  return statefulKeys(value) ?? Object.keys(value);
}

function child(path: string, key: string | number): string {
  return path ? `${path}.${key}` : String(key);
}

// ---------------------------------------------------------------------------
// capture
// ---------------------------------------------------------------------------

class Capture {
  private readonly ancestors = new Set<object>();
  private readonly options: WalkOptions;
  constructor(options: WalkOptions) { this.options = options; }

  value(value: unknown, path: string): StateNode {
    switch (kindOf(value, this.options)) {
      case 'scalar': return value;
      case 'skip': return undefined;
      case 'ref': return { $function: functionName(value)! } satisfies FunctionReference;
      case 'bytes': return this.bytes(value as TypedArray);
      case 'array': return this.container(value as object, path, () =>
        (value as unknown[]).map((item, index) => {
          const kind = kindOf(item, this.options);
          if (kind === 'skip' || this.cyclic(item)) return null;
          if (kind === 'opaque') { this.opaque(child(path, index), item); return null; }
          return this.value(item, child(path, index));
        }));
      case 'map': return this.container(value as object, path, () => {
        const out = new Map<unknown, StateNode>();
        for (const [key, item] of value as Map<unknown, unknown>) {
          const kind = kindOf(item, this.options);
          if (kind === 'skip' || this.cyclic(item)) continue;
          if (kind === 'opaque') { this.opaque(child(path, String(key)), item); continue; }
          out.set(key, this.value(item, child(path, String(key))));
        }
        return out;
      });
      case 'set': return new Set(value as Set<unknown>);
      case 'object': return this.container(value as object, path, () => {
        const out: Record<string, StateNode> = {};
        const object = value as Record<string, unknown>;
        const factory = factoryName(object);
        if (factory !== undefined) out.$factory = factory;
        for (const key of keysOf(object)) {
          const item = object[key];
          const kind = kindOf(item, this.options);
          if (kind === 'skip' || this.cyclic(item)) continue;
          if (kind === 'opaque') { this.opaque(child(path, key), item); continue; }
          out[key] = this.value(item, child(path, key));
        }
        return out;
      });
      case 'opaque': this.opaque(path, value); return undefined;
    }
  }

  private bytes(view: TypedArray): StateNode {
    const name = this.options.namedBuffers?.get(view.buffer);
    if (name !== undefined) {
      return { $buffer: name, byteOffset: view.byteOffset, length: view.length } satisfies BufferReference;
    }
    return view.slice();
  }

  /** A back-reference to a container still being walked: omitted, and the restore skips it the same way. */
  private cyclic(item: unknown): boolean {
    return typeof item === 'object' && item !== null && this.ancestors.has(item);
  }

  private container(object: object, _path: string, walk: () => StateNode): StateNode {
    this.ancestors.add(object);
    try {
      return walk();
    } finally {
      this.ancestors.delete(object);
    }
  }

  private opaque(path: string, value: unknown): void {
    this.options.onOpaque?.(path, value as object);
  }
}

export function captureState(root: unknown, options: WalkOptions = {}): StateNode {
  return new Capture(options).value(root, '');
}

// ---------------------------------------------------------------------------
// restore
// ---------------------------------------------------------------------------

class Restore {
  readonly diagnostics: StateDiagnostic[] = [];
  private readonly ancestors = new Set<object>();
  private readonly restored: StatefulKeys[] = [];
  private readonly options: WalkOptions;
  constructor(options: WalkOptions) { this.options = options; }

  /** Write `saved` into `live`, which the caller holds at `holder[key]`. */
  into(live: unknown, saved: StateNode, holder: object, key: string | number, path: string): void {
    const kind = kindOf(live, this.options);
    // A slot changes kind as the machine runs: driver state is declared as
    // zero and later holds a value object, a sample buffer is handed back as
    // null. The save says what the slot held; a live slot of the other kind
    // takes it whole.
    if (kindOf(saved, this.options) === 'scalar' && kind !== 'skip' && kind !== 'opaque' && kind !== 'scalar') {
      return this.assign(holder, key, saved, path);
    }
    if (isFactoryNode(saved)) {
      if (kind === 'skip' || kind === 'opaque') return;
      const make = this.options.factories?.get(saved.$factory);
      if (!make) return this.report(path, `no factory named "${saved.$factory}" to restore`);
      const { $factory: _name, ...data } = saved;
      return this.assign(holder, key, make(clone(data)), path);
    }
    if (isFunctionReference(saved)) {
      if (kind !== 'scalar' && kind !== 'ref') return this.report(path, `expected a ${kind}, saved a function`);
      const fn = this.options.functions?.get(saved.$function);
      if (!fn) return this.report(path, `no function named "${saved.$function}" to restore`);
      return this.assign(holder, key, fn, path);
    }
    switch (kind) {
      case 'skip': case 'opaque': return;
      case 'ref': {
        if (kindOf(saved, this.options) !== 'scalar') return this.report(path, 'expected a scalar or a function');
        this.assign(holder, key, saved, path);
        return;
      }
      case 'scalar': {
        // The slot held a container when saved (an array sized on first
        // write, a value object) and a scalar here: it takes the container.
        if (kindOf(saved, this.options) !== 'scalar') return this.assign(holder, key, clone(saved), path);
        this.assign(holder, key, saved, path);
        return;
      }
      case 'bytes': return this.bytes(live as TypedArray, saved, holder, key, path);
      case 'array': return this.array(live as unknown[], saved, path);
      case 'map': return this.map(live as Map<unknown, unknown>, saved, path);
      case 'set': {
        if (!(saved instanceof Set)) return this.report(path, 'expected a Set');
        const set = live as Set<unknown>;
        set.clear();
        for (const item of saved) set.add(item);
        return;
      }
      case 'object': return this.object(live as Record<string, unknown>, saved, path);
    }
  }

  finish(): StateDiagnostic[] {
    // Derived caches rebuild after every write is in, innermost object first,
    // so a container's rebuild sees its children already restored.
    for (const object of this.restored) object.stateRestored?.();
    return this.diagnostics;
  }

  private bytes(live: TypedArray, saved: StateNode, holder: object, key: string | number, path: string): void {
    const name = this.options.namedBuffers?.get(live.buffer);
    if (name !== undefined) {
      // The board restores this buffer once through its own name; a view of
      // it carries nothing of its own. A save that captured it as bytes came
      // from a board that had not named it, which is a different machine.
      if (!isBufferReference(saved)) this.report(path, `expected a reference to buffer "${name}"`);
      return;
    }
    if (isBufferReference(saved)) return this.report(path, `saved as a reference to "${saved.$buffer}", live is its own buffer`);
    if (!ArrayBuffer.isView(saved) || saved instanceof DataView) return this.report(path, 'expected bytes');
    const bytes = saved as TypedArray;
    if (bytes.length !== live.length) {
      const resizable = hasStateKeys(holder) && holder.stateResizable?.().includes(String(key));
      if (resizable && bytes.constructor === live.constructor) return this.assign(holder, key, bytes.slice(), path);
      return this.report(path, `length ${live.length}, saved ${bytes.length}`);
    }
    if (bytes.constructor !== live.constructor) {
      return this.report(path, `${live.constructor.name}, saved ${bytes.constructor.name}`);
    }
    (live as Uint8Array).set(bytes as Uint8Array);
  }

  private array(live: unknown[], saved: StateNode, path: string): void {
    if (!Array.isArray(saved)) return this.report(path, 'expected an array');
    if (!this.enter(live)) return;
    try {
      for (let index = 0; index < saved.length; index++) {
        const item = saved[index];
        if (index < live.length && this.isContainer(live[index]) && this.isContainer(item)) {
          this.into(live[index], item, live, index, child(path, index));
        } else if (item === null && index < live.length && kindOf(live[index], this.options) !== 'scalar') {
          // an element the capture could not carry (a closure, an opaque object)
        } else {
          this.assign(live, index, clone(item), child(path, index));
        }
      }
      live.length = saved.length;
    } finally {
      this.leave(live);
    }
  }

  private map(live: Map<unknown, unknown>, saved: StateNode, path: string): void {
    if (!(saved instanceof Map)) return this.report(path, 'expected a Map');
    if (!this.enter(live)) return;
    try {
      for (const key of [...live.keys()]) {
        if (!saved.has(key)) {
          const kind = kindOf(live.get(key), this.options);
          if (kind === 'skip' || kind === 'opaque') continue;
          live.delete(key);
        }
      }
      for (const [key, item] of saved) {
        const current = live.get(key);
        if (current !== undefined && this.isContainer(current) && this.isContainer(item)) {
          this.into(current, item, live, String(key), child(path, String(key)));
        } else if (current === undefined || !this.isContainer(current)) {
          live.set(key, clone(item));
        } else {
          this.report(child(path, String(key)), `expected a ${kindOf(current, this.options)}`);
        }
      }
    } finally {
      this.leave(live);
    }
  }

  private object(live: Record<string, unknown>, saved: StateNode, path: string): void {
    if (typeof saved !== 'object' || saved === null || saved instanceof Map || saved instanceof Set ||
      Array.isArray(saved) || ArrayBuffer.isView(saved) || isBufferReference(saved)) {
      return this.report(path, 'expected an object');
    }
    if (!this.enter(live)) return;
    try {
      const record = saved as Record<string, StateNode>;
      const keyed = hasStateKeys(live);
      const seen = new Set<string>();
      for (const key of keysOf(live)) {
        seen.add(key);
        const item = live[key];
        const kind = kindOf(item, this.options);
        if (kind === 'skip' || kind === 'opaque') continue;
        if (!Object.hasOwn(record, key)) {
          // A container the capture walked but found cyclic is absent from
          // the record; only a value the save should have carried is missing.
          if (kind === 'scalar' || kind === 'bytes' || kind === 'ref') this.report(child(path, key), 'missing from the save');
          continue;
        }
        this.into(item, record[key], live, key, child(path, key));
      }
      for (const key of Object.keys(record)) {
        if (seen.has(key)) continue;
        if (keyed) { this.report(child(path, key), 'saved, but the object does not declare it'); continue; }
        // an open record (device members, driver state) gains keys as the
        // source assigns them; a save from further on carries the new one
        this.assign(live, key, clone(record[key]), child(path, key));
      }
      if (keyed) this.restored.push(live as unknown as StatefulKeys);
    } finally {
      this.leave(live);
    }
  }

  private assign(holder: object, key: string | number, value: unknown, path: string): void {
    try {
      (holder as Record<string | number, unknown>)[key] = value;
    } catch (error) {
      this.report(path, `cannot assign: ${(error as Error).message}`);
    }
  }

  private enter(object: object): boolean {
    if (this.ancestors.has(object)) return false;
    this.ancestors.add(object);
    return true;
  }

  private leave(object: object): void {
    this.ancestors.delete(object);
  }

  private report(path: string, message: string): void {
    this.diagnostics.push({ path, message });
  }

  private isContainer(value: unknown): boolean {
    const kind = kindOf(value, this.options);
    return kind === 'bytes' || kind === 'array' || kind === 'map' || kind === 'set' || kind === 'object';
  }
}

/** A saved node is never handed to the machine directly: the save must stay reusable. */
function clone<T>(node: T): T {
  if (typeof node !== 'object' || node === null) return node;
  return structuredClone(node);
}

/**
 * Write a captured tree back into the live object graph it came from. The
 * diagnostics name every value that could not be matched; a caller that
 * wants a whole machine or nothing checks that the list is empty.
 */
export function restoreState(root: unknown, saved: StateNode, options: WalkOptions = {}): StateDiagnostic[] {
  const restore = new Restore(options);
  const holder = { root };
  restore.into(root, saved, holder, 'root', '');
  return restore.finish();
}

/** Every saved node, for a size estimate or a debugging dump. */
export function stateByteLength(node: StateNode): number {
  if (ArrayBuffer.isView(node)) return node.byteLength;
  if (node instanceof Map) { let total = 0; for (const item of node.values()) total += stateByteLength(item); return total; }
  if (node instanceof Set) return node.size * 8;
  if (Array.isArray(node)) return node.reduce<number>((total, item) => total + stateByteLength(item), 0);
  if (typeof node === 'object' && node !== null) {
    if (isBufferReference(node) || isFunctionReference(node)) return 0;
    if (isFactoryNode(node)) return Object.keys(node).length * 8;
    return Object.values(node).reduce<number>((total, item) => total + stateByteLength(item), 0);
  }
  return 8;
}
