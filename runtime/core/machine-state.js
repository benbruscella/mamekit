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
/**
 * Marks a function a slot may hold as state: a CPU's interrupt vector source
 * is one. The function is captured by this name and restored from the
 * caller's `functions` table, so a board of the same game hands the slot its
 * own equivalent closure.
 */
export const STATE_FUNCTION = Symbol.for('mamekit.stateFunction');
export function namedStateFunction(name, fn) {
    Object.defineProperty(fn, STATE_FUNCTION, { value: name, enumerable: false });
    return fn;
}
function functionName(value) {
    return typeof value === 'function'
        ? value[STATE_FUNCTION]
        : undefined;
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
export function stateValue(factory, value) {
    Object.defineProperty(value, STATE_FACTORY, { value: factory, enumerable: true, writable: true, configurable: true });
    return value;
}
function factoryName(value) {
    const name = typeof value === 'object' && value !== null
        ? value[STATE_FACTORY]
        : undefined;
    return typeof name === 'string' ? name : undefined;
}
function isFactoryNode(node) {
    return typeof node === 'object' && node !== null && !Array.isArray(node) &&
        typeof node.$factory === 'string';
}
function isFunctionReference(node) {
    return typeof node === 'object' && node !== null &&
        typeof node.$function === 'string';
}
const DATA_PROTOTYPES = new WeakMap();
/**
 * The declared state keys of an object, or undefined when it declares none.
 * A Proxy that answers every property with a function (a device finder, an
 * ioport handle) looks like it has `stateKeys` but returns no array; it is
 * not stateful.
 */
function statefulKeys(value) {
    const method = value.stateKeys;
    if (typeof method !== 'function')
        return undefined;
    const keys = method.call(value);
    return Array.isArray(keys) ? keys : undefined;
}
function hasStateKeys(value) {
    return statefulKeys(value) !== undefined;
}
/**
 * A class instance walks like a plain object only when nothing on its
 * prototype chain is a method: accessors are how a register pair or a
 * width-enforcing struct presents its fields, but a method means behavior
 * the walk cannot see through, and the object is opaque unless it declares
 * `stateKeys()`.
 */
function isDataObject(value) {
    const prototype = Object.getPrototypeOf(value);
    if (prototype === null || prototype === Object.prototype)
        return true;
    const cached = DATA_PROTOTYPES.get(prototype);
    if (cached !== undefined)
        return cached;
    let data = true;
    for (let p = prototype; p && p !== Object.prototype; p = Object.getPrototypeOf(p)) {
        for (const name of Reflect.ownKeys(p)) {
            if (name === 'constructor')
                continue;
            const descriptor = Object.getOwnPropertyDescriptor(p, name);
            if (descriptor && typeof descriptor.value === 'function') {
                data = false;
                break;
            }
        }
        if (!data)
            break;
    }
    DATA_PROTOTYPES.set(prototype, data);
    return data;
}
function kindOf(value, options) {
    if (value === null || value === undefined)
        return 'scalar';
    switch (typeof value) {
        case 'number':
        case 'boolean':
        case 'string':
        case 'bigint': return 'scalar';
        case 'function': return functionName(value) === undefined ? 'skip' : 'ref';
        case 'symbol': return 'skip';
        default: break;
    }
    if (ArrayBuffer.isView(value))
        return value instanceof DataView ? 'skip' : 'bytes';
    if (value instanceof ArrayBuffer)
        return 'skip';
    if (Array.isArray(value))
        return 'array';
    if (value instanceof Map)
        return 'map';
    if (value instanceof Set)
        return 'set';
    if (hasStateKeys(value) || isDataObject(value))
        return 'object';
    if (factoryName(value) !== undefined)
        return 'object';
    if (options?.walkOwnKeys?.(value))
        return 'object';
    return 'opaque';
}
function isBufferReference(node) {
    return typeof node === 'object' && node !== null &&
        typeof node.$buffer === 'string';
}
function keysOf(value) {
    return statefulKeys(value) ?? Object.keys(value);
}
function child(path, key) {
    return path ? `${path}.${key}` : String(key);
}
// ---------------------------------------------------------------------------
// capture
// ---------------------------------------------------------------------------
class Capture {
    ancestors = new Set();
    options;
    constructor(options) { this.options = options; }
    value(value, path) {
        switch (kindOf(value, this.options)) {
            case 'scalar': return value;
            case 'skip': return undefined;
            case 'ref': return { $function: functionName(value) };
            case 'bytes': return this.bytes(value);
            case 'array': return this.container(value, path, () => value.map((item, index) => {
                const kind = kindOf(item, this.options);
                if (kind === 'skip' || this.cyclic(item))
                    return null;
                if (kind === 'opaque') {
                    this.opaque(child(path, index), item);
                    return null;
                }
                return this.value(item, child(path, index));
            }));
            case 'map': return this.container(value, path, () => {
                const out = new Map();
                for (const [key, item] of value) {
                    const kind = kindOf(item, this.options);
                    if (kind === 'skip' || this.cyclic(item))
                        continue;
                    if (kind === 'opaque') {
                        this.opaque(child(path, String(key)), item);
                        continue;
                    }
                    out.set(key, this.value(item, child(path, String(key))));
                }
                return out;
            });
            case 'set': return new Set(value);
            case 'object': return this.container(value, path, () => {
                const out = {};
                const object = value;
                const factory = factoryName(object);
                if (factory !== undefined)
                    out.$factory = factory;
                for (const key of keysOf(object)) {
                    const item = object[key];
                    const kind = kindOf(item, this.options);
                    if (kind === 'skip' || this.cyclic(item))
                        continue;
                    if (kind === 'opaque') {
                        this.opaque(child(path, key), item);
                        continue;
                    }
                    out[key] = this.value(item, child(path, key));
                }
                return out;
            });
            case 'opaque':
                this.opaque(path, value);
                return undefined;
        }
    }
    bytes(view) {
        const name = this.options.namedBuffers?.get(view.buffer);
        if (name !== undefined) {
            return { $buffer: name, byteOffset: view.byteOffset, length: view.length };
        }
        return view.slice();
    }
    /** A back-reference to a container still being walked: omitted, and the restore skips it the same way. */
    cyclic(item) {
        return typeof item === 'object' && item !== null && this.ancestors.has(item);
    }
    container(object, _path, walk) {
        this.ancestors.add(object);
        try {
            return walk();
        }
        finally {
            this.ancestors.delete(object);
        }
    }
    opaque(path, value) {
        this.options.onOpaque?.(path, value);
    }
}
export function captureState(root, options = {}) {
    return new Capture(options).value(root, '');
}
// ---------------------------------------------------------------------------
// restore
// ---------------------------------------------------------------------------
class Restore {
    diagnostics = [];
    ancestors = new Set();
    restored = [];
    options;
    constructor(options) { this.options = options; }
    /** Write `saved` into `live`, which the caller holds at `holder[key]`. */
    into(live, saved, holder, key, path) {
        const kind = kindOf(live, this.options);
        // A slot changes kind as the machine runs: driver state is declared as
        // zero and later holds a value object, a sample buffer is handed back as
        // null. The save says what the slot held; a live slot of the other kind
        // takes it whole.
        if (kindOf(saved, this.options) === 'scalar' && kind !== 'skip' && kind !== 'opaque' && kind !== 'scalar') {
            return this.assign(holder, key, saved, path);
        }
        if (isFactoryNode(saved)) {
            if (kind === 'skip' || kind === 'opaque')
                return;
            const make = this.options.factories?.get(saved.$factory);
            if (!make)
                return this.report(path, `no factory named "${saved.$factory}" to restore`);
            const { $factory: _name, ...data } = saved;
            return this.assign(holder, key, make(clone(data)), path);
        }
        if (isFunctionReference(saved)) {
            if (kind !== 'scalar' && kind !== 'ref')
                return this.report(path, `expected a ${kind}, saved a function`);
            const fn = this.options.functions?.get(saved.$function);
            if (!fn)
                return this.report(path, `no function named "${saved.$function}" to restore`);
            return this.assign(holder, key, fn, path);
        }
        switch (kind) {
            case 'skip':
            case 'opaque': return;
            case 'ref': {
                if (kindOf(saved, this.options) !== 'scalar')
                    return this.report(path, 'expected a scalar or a function');
                this.assign(holder, key, saved, path);
                return;
            }
            case 'scalar': {
                // The slot held a container when saved (an array sized on first
                // write, a value object) and a scalar here: it takes the container.
                if (kindOf(saved, this.options) !== 'scalar')
                    return this.assign(holder, key, clone(saved), path);
                this.assign(holder, key, saved, path);
                return;
            }
            case 'bytes': return this.bytes(live, saved, holder, key, path);
            case 'array': return this.array(live, saved, path);
            case 'map': return this.map(live, saved, path);
            case 'set': {
                if (!(saved instanceof Set))
                    return this.report(path, 'expected a Set');
                const set = live;
                set.clear();
                for (const item of saved)
                    set.add(item);
                return;
            }
            case 'object': return this.object(live, saved, path);
        }
    }
    finish() {
        // Derived caches rebuild after every write is in, innermost object first,
        // so a container's rebuild sees its children already restored.
        for (const object of this.restored)
            object.stateRestored?.();
        return this.diagnostics;
    }
    bytes(live, saved, holder, key, path) {
        const name = this.options.namedBuffers?.get(live.buffer);
        if (name !== undefined) {
            // The board restores this buffer once through its own name; a view of
            // it carries nothing of its own. A save that captured it as bytes came
            // from a board that had not named it, which is a different machine.
            if (!isBufferReference(saved))
                this.report(path, `expected a reference to buffer "${name}"`);
            return;
        }
        if (isBufferReference(saved))
            return this.report(path, `saved as a reference to "${saved.$buffer}", live is its own buffer`);
        if (!ArrayBuffer.isView(saved) || saved instanceof DataView)
            return this.report(path, 'expected bytes');
        const bytes = saved;
        if (bytes.length !== live.length) {
            const resizable = hasStateKeys(holder) && holder.stateResizable?.().includes(String(key));
            if (resizable && bytes.constructor === live.constructor)
                return this.assign(holder, key, bytes.slice(), path);
            return this.report(path, `length ${live.length}, saved ${bytes.length}`);
        }
        if (bytes.constructor !== live.constructor) {
            return this.report(path, `${live.constructor.name}, saved ${bytes.constructor.name}`);
        }
        live.set(bytes);
    }
    array(live, saved, path) {
        if (!Array.isArray(saved))
            return this.report(path, 'expected an array');
        if (!this.enter(live))
            return;
        try {
            for (let index = 0; index < saved.length; index++) {
                const item = saved[index];
                if (index < live.length && this.isContainer(live[index]) && this.isContainer(item)) {
                    this.into(live[index], item, live, index, child(path, index));
                }
                else if (item === null && index < live.length && kindOf(live[index], this.options) !== 'scalar') {
                    // an element the capture could not carry (a closure, an opaque object)
                }
                else {
                    this.assign(live, index, clone(item), child(path, index));
                }
            }
            live.length = saved.length;
        }
        finally {
            this.leave(live);
        }
    }
    map(live, saved, path) {
        if (!(saved instanceof Map))
            return this.report(path, 'expected a Map');
        if (!this.enter(live))
            return;
        try {
            for (const key of [...live.keys()]) {
                if (!saved.has(key)) {
                    const kind = kindOf(live.get(key), this.options);
                    if (kind === 'skip' || kind === 'opaque')
                        continue;
                    live.delete(key);
                }
            }
            for (const [key, item] of saved) {
                const current = live.get(key);
                if (current !== undefined && this.isContainer(current) && this.isContainer(item)) {
                    this.into(current, item, live, String(key), child(path, String(key)));
                }
                else if (current === undefined || !this.isContainer(current)) {
                    live.set(key, clone(item));
                }
                else {
                    this.report(child(path, String(key)), `expected a ${kindOf(current, this.options)}`);
                }
            }
        }
        finally {
            this.leave(live);
        }
    }
    object(live, saved, path) {
        if (typeof saved !== 'object' || saved === null || saved instanceof Map || saved instanceof Set ||
            Array.isArray(saved) || ArrayBuffer.isView(saved) || isBufferReference(saved)) {
            return this.report(path, 'expected an object');
        }
        if (!this.enter(live))
            return;
        try {
            const record = saved;
            const keyed = hasStateKeys(live);
            const seen = new Set();
            for (const key of keysOf(live)) {
                seen.add(key);
                const item = live[key];
                const kind = kindOf(item, this.options);
                if (kind === 'skip' || kind === 'opaque')
                    continue;
                if (!Object.hasOwn(record, key)) {
                    // A key the save does not have is one the machine had not made yet
                    // when it was taken. On an open record — driver state, a device's
                    // members, the board's lazily allocated resources — the key set is
                    // itself data, so putting the machine back means taking the key
                    // away again, exactly as the mirror case below adds one.
                    // A container missing from the record was a back-reference the
                    // capture stepped over as a cycle, not a value it lost; leave it be.
                    if (kind !== 'scalar' && kind !== 'bytes' && kind !== 'ref')
                        continue;
                    // Where the key set is fixed — a class that declares its keys, an
                    // emitted core whose fields are its MAME source's members — a key
                    // the save does not have is a gap in the walker, and is said.
                    if (keyed || this.options.walkOwnKeys?.(live)) {
                        this.report(child(path, key), 'missing from the save');
                    }
                    else {
                        this.drop(live, key, child(path, key));
                    }
                    continue;
                }
                this.into(item, record[key], live, key, child(path, key));
            }
            for (const key of Object.keys(record)) {
                if (seen.has(key))
                    continue;
                if (keyed) {
                    this.report(child(path, key), 'saved, but the object does not declare it');
                    continue;
                }
                // an open record (device members, driver state) gains keys as the
                // source assigns them; a save from further on carries the new one
                this.assign(live, key, clone(record[key]), child(path, key));
            }
            if (keyed)
                this.restored.push(live);
        }
        finally {
            this.leave(live);
        }
    }
    /** Put a slot back to not existing, for a record whose key set is data. */
    drop(holder, key, path) {
        try {
            delete holder[key];
        }
        catch (error) {
            this.report(path, `cannot remove: ${error.message}`);
        }
    }
    assign(holder, key, value, path) {
        try {
            holder[key] = value;
        }
        catch (error) {
            this.report(path, `cannot assign: ${error.message}`);
        }
    }
    enter(object) {
        if (this.ancestors.has(object))
            return false;
        this.ancestors.add(object);
        return true;
    }
    leave(object) {
        this.ancestors.delete(object);
    }
    report(path, message) {
        this.diagnostics.push({ path, message });
    }
    isContainer(value) {
        const kind = kindOf(value, this.options);
        return kind === 'bytes' || kind === 'array' || kind === 'map' || kind === 'set' || kind === 'object';
    }
}
/** A saved node is never handed to the machine directly: the save must stay reusable. */
function clone(node) {
    if (typeof node !== 'object' || node === null)
        return node;
    return structuredClone(node);
}
/**
 * Write a captured tree back into the live object graph it came from. The
 * diagnostics name every value that could not be matched; a caller that
 * wants a whole machine or nothing checks that the list is empty.
 */
export function restoreState(root, saved, options = {}) {
    const restore = new Restore(options);
    const holder = { root };
    restore.into(root, saved, holder, 'root', '');
    return restore.finish();
}
/** Every saved node, for a size estimate or a debugging dump. */
export function stateByteLength(node) {
    if (ArrayBuffer.isView(node))
        return node.byteLength;
    if (node instanceof Map) {
        let total = 0;
        for (const item of node.values())
            total += stateByteLength(item);
        return total;
    }
    if (node instanceof Set)
        return node.size * 8;
    if (Array.isArray(node))
        return node.reduce((total, item) => total + stateByteLength(item), 0);
    if (typeof node === 'object' && node !== null) {
        if (isBufferReference(node) || isFunctionReference(node))
            return 0;
        if (isFactoryNode(node))
            return Object.keys(node).length * 8;
        return Object.values(node).reduce((total, item) => total + stateByteLength(item), 0);
    }
    return 8;
}
