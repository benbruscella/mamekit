import { executeGeneratedProgram, } from "./generated-handler.js";
function isGeneratedPointer(value) {
    return Boolean(value &&
        typeof value === 'object' &&
        value.generatedPointer);
}
const DEFINITIONS = new Map();
export function registerGeneratedDevice(definition) {
    if (definition.summary.diagnostics) {
        throw new Error(`cannot register ${definition.type}: ${definition.summary.diagnostics} compiler diagnostics`);
    }
    DEFINITIONS.set(definition.type.toUpperCase(), definition);
}
export function clearGeneratedDevices() {
    DEFINITIONS.clear();
}
export function hasGeneratedDevice(type) {
    return DEFINITIONS.has(type.toUpperCase());
}
export function createDevice(type, options = {}) {
    const definition = DEFINITIONS.get(type.toUpperCase());
    if (!definition)
        throw new Error(`generated device "${type}" was not registered`);
    return new IrDevice(definition, options.clock ?? 0, options);
}
class IrTimer {
    remainingSeconds = Infinity;
    period = Infinity;
    parameter = 0;
    adjustmentGeneration = 0;
    adjust(delay, parameter = 0, period = Infinity) {
        this.remainingSeconds = Number.isFinite(delay) && delay >= 0 ? delay : Infinity;
        this.period = Number.isFinite(period) && period > 0 ? period : Infinity;
        this.parameter = parameter;
        this.adjustmentGeneration++;
    }
    remaining() {
        return this.remainingSeconds;
    }
    tick(seconds, callback) {
        if (!Number.isFinite(this.remainingSeconds))
            return;
        this.remainingSeconds -= seconds;
        let firings = 0;
        while (this.remainingSeconds <= 0) {
            if (++firings > 65_536)
                throw new Error('generated device timer exceeded 65536 firings');
            const overshoot = -this.remainingSeconds;
            const firedPeriod = this.period;
            const generation = this.adjustmentGeneration;
            callback(this.parameter);
            // MAME callbacks commonly re-arm their own one-shot timer. Honour that
            // new schedule instead of disabling it based on the timer state that
            // caused the callback (for example, the NES PPU scanline timer).
            if (this.adjustmentGeneration !== generation) {
                if (!Number.isFinite(this.remainingSeconds))
                    break;
                this.remainingSeconds -= overshoot;
                continue;
            }
            if (!Number.isFinite(firedPeriod)) {
                this.remainingSeconds = Infinity;
                break;
            }
            this.remainingSeconds += firedPeriod;
        }
    }
}
class IrDevice {
    definition;
    members = {};
    memberBits = new Map();
    memberSigned = new Set();
    methods = new Map();
    /** Parameter names resolved once per method (the regex is a hot-path cost). */
    methodParams = new Map();
    /** C++ default argument values, applied when a caller omits a parameter. */
    methodDefaults = new Map();
    listeners = new Map();
    bindings;
    executionContext;
    timers = new Map();
    clock;
    slotChild;
    constructor(definition, clock, options = {}) {
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
                    ? resolveDeviceResource(resourceMembers[member.name], resourceOptions)
                    :
                        (inputTag
                            ? { read: () => options.inputs?.read(inputTag) ?? 0xff }
                            : member.finder?.kind === 'device'
                                ? options.finder?.(member.finder.tag) ?? 0
                                : member.valueType === 'bitmap_rgb32'
                                    ? new GeneratedBitmapRgb32()
                                    : member.memory
                                        ? memoryMember(member, options)
                                        : member.values ? [...member.values] : member.initial ?? 0));
            if (member.bits)
                this.memberBits.set(member.name, member.bits);
            if (member.signed)
                this.memberSigned.add(member.name);
        }
        for (const [name, resource] of Object.entries(resourceMembers)) {
            if (!Object.hasOwn(this.members, name)) {
                this.members[name] = resolveDeviceResource(resource, resourceOptions);
            }
        }
        Object.assign(this.members, options.members);
        for (const callback of definition.callbacks) {
            const slots = Array.from({ length: callback.slots }, () => []);
            this.listeners.set(callback.signal, slots);
            const emitters = slots.map(listeners => (...args) => {
                let result = callback.initial ?? 0;
                for (const listener of listeners) {
                    const value = listener(...args);
                    if (value !== undefined)
                        result = value;
                }
                return result;
            });
            this.members[callback.member] = callback.slots === 1 ? emitters[0] : emitters;
        }
        for (const specification of definition.timers ?? []) {
            const timer = new IrTimer();
            this.timers.set(specification.member, { timer, callback: specification.callback });
            this.members[specification.member] = timer;
        }
        const getters = {};
        const setters = {};
        for (const member of definition.members) {
            getters[member.name] = () => this.members[member.name] ?? 0;
            setters[member.name] = value => {
                this.members[member.name] = wrap(value, member.bits, member.signed);
            };
        }
        const referenceCalls = {};
        const callParameters = {};
        const palette = [];
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
                set_pen_color: (entry, color) => {
                    palette[entry] = color >>> 0;
                    return 0;
                },
                pen_color: entry => palette[entry] ?? 0xff000000,
                floor: value => Math.floor(value),
                cos: value => Math.cos(value),
                sin: value => Math.sin(value),
                DEGREE_TO_RADIAN: value => value * Math.PI / 180,
                'std::clamp': (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value)),
                rgb_t: (red, green, blue) => (0xff000000 |
                    (blue & 0xff) << 16 |
                    (green & 0xff) << 8 |
                    (red & 0xff)) >>> 0,
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
            calls: this.bindings.calls,
            palette,
            readIndex: (value, index) => {
                if (isGeneratedPointer(value)) {
                    return value.source[value.offset + index] ?? 0;
                }
                return value?.[index] ?? 0;
            },
            writeIndex: (value, index, next) => {
                if (isGeneratedPointer(value)) {
                    value.source[value.offset + index] = Number(next);
                }
                else if (value && typeof value === 'object') {
                    value[index] = next;
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
                    source: value,
                    offset: index,
                },
            invoke: (name, ...args) => {
                const method = this.selectMethod(name, args);
                if (method)
                    return this.executeMethod(method, this.methodParams.get(method), args);
                const binding = this.bindings.calls?.[name];
                if (binding)
                    return binding(...args.map(Number));
                const member = this.members[name];
                if (typeof member === 'function')
                    return member(...args);
                return 0;
            },
        };
        const pendingTimers = [...this.timers.values()];
        this.bindings.calls.timer_alloc = () => pendingTimers.shift()?.timer ?? 0;
        for (const method of definition.methods) {
            const parameters = splitParameters(method.parameters);
            const names = parameters.map(parameterName);
            callParameters[method.name] = parameters;
            this.methodParams.set(method, names);
            this.methodDefaults.set(method, parameters.map(parameterDefault));
            referenceCalls[method.name] = (...args) => {
                const selected = this.selectMethod(method.name, args);
                return selected
                    ? this.executeMethod(selected, this.methodParams.get(selected), args)
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
                    (...args) => child.invoke(name, ...args),
                ]));
                this.members[definition.slot.member] = proxy;
                this.bindings.calls.get_card_device = () => proxy;
            }
            else {
                this.members[definition.slot.member] = 0;
                this.bindings.calls.get_card_device = () => 0;
            }
        }
        if (definition.start)
            this.call(definition.start);
        for (const initialize of definition.resources?.initialize ?? []) {
            if (!this.methodNames().includes(initialize.method))
                continue;
            this.invoke(initialize.method, ...(initialize.args ?? []).map(resource => resolveDeviceResource(resource, resourceOptions)));
        }
        this.reset();
    }
    reset() {
        if (this.definition.reset)
            this.call(this.definition.reset);
    }
    tick(seconds) {
        for (const { timer, callback } of this.timers.values()) {
            timer.tick(seconds, parameter => this.call(callback, parameter));
        }
    }
    call(name, ...args) {
        return Number(this.invoke(name, ...args)) || 0;
    }
    invoke(name, ...args) {
        const method = this.selectMethod(name, args);
        if (!method)
            throw new Error(`${this.definition.type} has no generated method "${name}"`);
        return this.executeMethod(method, this.methodParams.get(method), args);
    }
    get(name) {
        return Number(this.members[name]) || 0;
    }
    set(name, value) {
        this.members[name] = wrap(value, this.memberBits.get(name), this.memberSigned.has(name));
    }
    methodNames() {
        return [...this.methods.keys()];
    }
    arity(name) {
        const overloads = this.methods.get(name) ?? [];
        return overloads.length
            ? Math.max(...overloads.map(method => splitParameters(method.parameters).length))
            : 0;
    }
    parameters(name) {
        const overloads = this.methods.get(name) ?? [];
        return splitParameters(overloads.at(-1)?.parameters ?? '');
    }
    signalNames() {
        return [...this.listeners.keys()];
    }
    on(signal, listener, slot = 0) {
        const channels = this.listeners.get(signal);
        if (!channels)
            throw new Error(`${this.definition.type} has no callback signal "${signal}"`);
        const listeners = channels[slot];
        if (!listeners) {
            throw new Error(`${this.definition.type} callback "${signal}" has no slot ${slot}`);
        }
        listeners.push(listener);
        return this;
    }
    bindCall(name, listener) {
        this.bindings.calls[name] = listener;
        return this;
    }
    cycleClock() {
        return this.clock / (this.definition.clockDivider ?? 1);
    }
    dataAddressBits() {
        return this.definition.dataAddressBits;
    }
    bus() {
        return this.definition.bus;
    }
    role() {
        return this.definition.role;
    }
    links() {
        return this.definition.links ?? [];
    }
    invokeSlot(name, ...args) {
        if (!this.slotChild)
            throw new Error(`${this.definition.type} has no selected slot card`);
        return this.slotChild.invoke(name, ...args);
    }
    executeMethod(method, parameterNames, args) {
        try {
            const compiled = this.definition.compiledMethods?.[method.name];
            if (compiled)
                return compiled(this.executionContext, ...args);
            const locals = {};
            const defaults = this.methodDefaults.get(method);
            for (let index = 0; index < parameterNames.length; index++) {
                locals[parameterNames[index]] = args[index] ?? defaults?.[index] ?? 0;
            }
            return executeGeneratedProgram(method.program, this.bindings, locals).value;
        }
        catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            throw new Error(`${this.definition.type}.${method.name}: ${message}`);
        }
    }
    selectMethod(name, args) {
        const overloads = this.methods.get(name);
        if (!overloads?.length)
            return undefined;
        const exact = overloads.filter(method => (this.methodParams.get(method) ?? splitParameters(method.parameters)).length === args.length);
        if (exact.length)
            return exact.at(-1);
        return overloads
            .filter(method => {
            const parameters = this.methodParams.get(method) ?? splitParameters(method.parameters);
            const defaults = this.methodDefaults.get(method) ??
                parameters.map(parameterDefault);
            return parameters.length >= args.length &&
                defaults.slice(args.length).every(value => value !== undefined);
        })
            .sort((left, right) => splitParameters(left.parameters).length - splitParameters(right.parameters).length)
            .at(0) ?? overloads.at(-1);
    }
}
class IrMemoryBank {
    source = new Uint8Array(0);
    stride = 1;
    entry = 0;
    configure_entries(_start, _count, source, stride) {
        if (ArrayBuffer.isView(source) || Array.isArray(source)) {
            this.source = source;
        }
        this.stride = Math.max(1, stride | 0);
    }
    set_entry(entry) {
        this.entry = Math.max(0, entry | 0);
    }
    read(offset) {
        return this.source[this.entry * this.stride + offset] ?? 0xff;
    }
    write(offset, value) {
        const target = this.source;
        const index = this.entry * this.stride + offset;
        if (index >= 0 && index < this.source.length)
            target[index] = value & 0xff;
    }
}
function resolveDeviceResource(resource, options) {
    if (resource.kind === 'number')
        return resource.value;
    const regions = options.regions ?? {};
    if (resource.kind === 'region')
        return regions[resource.name] ?? new Uint8Array(0);
    if (resource.kind === 'region-length')
        return regions[resource.name]?.length ?? 0;
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
        const value = resource.path.split('.').reduce((current, key) => current && typeof current === 'object'
            ? current[key]
            : undefined, options.configuration);
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
    bitmapWidth = 0;
    bitmapHeight = 0;
    allocate(width, height) {
        this.bitmapWidth = Math.max(0, width | 0);
        this.bitmapHeight = Math.max(0, height | 0);
        this.pixels = new Uint32Array(this.bitmapWidth * this.bitmapHeight);
    }
    width() {
        return this.bitmapWidth;
    }
    height() {
        return this.bitmapHeight;
    }
    pix(y, x = 0) {
        return this.pixels[y * this.bitmapWidth + x] ?? 0;
    }
    'pix='(y, x, value) {
        const index = y * this.bitmapWidth + x;
        if (index >= 0 && index < this.pixels.length)
            this.pixels[index] = value >>> 0;
    }
    'pix&'(y, x = 0) {
        return {
            generatedPointer: true,
            source: this.pixels,
            offset: y * this.bitmapWidth + x,
        };
    }
}
function copyGeneratedBitmap(destination, source) {
    const pixels = source && typeof source === 'object' &&
        ArrayBuffer.isView(source.pixels)
        ? source.pixels
        : undefined;
    if (!pixels || !destination || typeof destination !== 'object')
        return;
    const direct = destination.direct?.pixels;
    if (direct) {
        direct.set(pixels.subarray(0, direct.length));
        return;
    }
    const setPixel = destination['pix='];
    if (typeof setPixel !== 'function')
        return;
    const width = Math.max(1, Math.floor(Math.sqrt(pixels.length)));
    for (let index = 0; index < pixels.length; index++) {
        setPixel(Math.floor(index / width), index % width, pixels[index]);
    }
}
/**
 * Bind a MAME memory container member: a shared pointer aliases the board share
 * MAME's constructor names (DEVICE_SELF is the device's own tag), and an owned
 * vector starts empty for device_start to size.
 */
function memoryMember(member, options) {
    const memory = member.memory;
    if (memory.kind === 'owned')
        return new Uint8Array(0);
    const tag = memory.share === 'self' ? options.tag : memory.share;
    const bytes = tag ? options.shares?.[tag] : undefined;
    if (!bytes) {
        throw new Error(`generated device memory share "${tag ?? memory.share}" is not available for ${member.name}`);
    }
    return bytes;
}
function splitParameters(parameters) {
    return parameters.split(',').map(parameter => parameter.trim()).filter(Boolean);
}
function parameterName(parameter) {
    return /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter.replace(/=[\s\S]*$/, ''))?.[1]
        ?? /(\w+)\s*(?:=[\s\S]*)?$/.exec(parameter)?.[1]
        ?? parameter;
}
/** A C++ default argument, when it is a plain numeric literal. */
function parameterDefault(parameter) {
    const value = /=\s*([\s\S]+)$/.exec(parameter)?.[1]?.trim();
    if (value === undefined)
        return undefined;
    const numeric = /^(?:0[xX][\da-fA-F]+|\d+)[uUlL]*$/.exec(value);
    if (numeric)
        return Number(value.replace(/[uUlL]+$/, ''));
    // `~Type(0)` and kin are MAME's all-ones memory masks.
    if (/^~\s*\w+\s*\(\s*0\s*\)$/.test(value))
        return 0xffffffff;
    return undefined;
}
function wrap(value, bits, signed = false) {
    if (bits === 1)
        return value ? 1 : 0;
    if (bits === 8)
        return signed ? value << 24 >> 24 : value & 0xff;
    if (bits === 16)
        return signed ? value << 16 >> 16 : value & 0xffff;
    if (bits === 32)
        return signed ? value | 0 : value >>> 0;
    return value;
}
