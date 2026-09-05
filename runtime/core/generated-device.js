import { applyCombineData, applyGeneratedAndAssign, applyGeneratedDivision, applyGeneratedMacro, dereferenceGeneratedValue, generatedContainerAccessor, generatedAdd, generatedPointerStore, generatedWideBinary, executeGeneratedProgram, generatedReferent, generatedValuesEqual, GENERATED_FIELD_WIDTHS, } from "./generated-handler.js";
import { GeneratedZ80PioDevice } from "./generated-z80pio.js";
import { GeneratedM68705P5Device } from "./generated-m68705.js";
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
    return type.toUpperCase() === 'M68705P5' || DEFINITIONS.has(type.toUpperCase());
}
export function createDevice(type, options = {}) {
    if (type.toUpperCase() === 'M68705P5') {
        return new GeneratedM68705P5Device(options);
    }
    const definition = DEFINITIONS.get(type.toUpperCase());
    if (!definition)
        throw new Error(`generated device "${type}" was not registered`);
    if (definition.type.toUpperCase() === 'Z80PIO') {
        return new GeneratedZ80PioDevice(definition, options.clock ?? 0);
    }
    return new IrDevice(definition, options.clock ?? 0, options);
}
/** Numeric seconds with the attotime method surface used by compiled devices. */
class IrAttotime {
    seconds;
    constructor(seconds) {
        this.seconds = seconds;
    }
    as_ticks(frequency) {
        return Math.floor(this.seconds * Math.max(0, frequency));
    }
    valueOf() {
        return this.seconds;
    }
}
/**
 * Seconds of the tick a firing device timer has NOT consumed yet.
 *
 * Device time is delivered in instruction-sized lumps, so a timer that expires
 * partway through one is serviced with the clock already credited to the far
 * end of the lump. MAME's scheduler instead stops at the expiry, and anything
 * the callback then asks about the beam is answered from there. This is that
 * difference, readable for as long as the callback runs and zero outside one.
 */
let timerBacklogSeconds = 0;
/** @see timerBacklogSeconds */
export function generatedTimerBacklog() {
    return timerBacklogSeconds;
}
class IrTimer {
    remainingSeconds = Infinity;
    intervalSeconds = Infinity;
    period = Infinity;
    parameter = 0;
    adjustmentGeneration = 0;
    adjust(delay, parameter = 0, period = Infinity) {
        this.remainingSeconds = Number.isFinite(delay) && delay >= 0 ? delay : Infinity;
        this.intervalSeconds = this.remainingSeconds;
        this.period = Number.isFinite(period) && period > 0 ? period : Infinity;
        this.parameter = parameter;
        this.adjustmentGeneration++;
    }
    remaining() {
        // MAME's scheduler stops exactly at a timer's expiry, so a callback asking
        // its own timer how long is left reads zero. Host device time arrives in
        // instruction-sized lumps, so by the time the callback runs the deadline
        // is usually already a hair in the past — a value MAME can never produce,
        // and one that silently fails the `== attotime::zero` tests real hardware
        // models gate on. The NES PPU has two: skipping them left every scanline
        // rendering nametable row 0, so a fully drawn title screen came out as one
        // flat colour.
        return new IrAttotime(Math.max(0, this.remainingSeconds));
    }
    elapsed() {
        const seconds = !Number.isFinite(this.intervalSeconds)
            ? 0
            : Math.max(0, this.intervalSeconds - Math.max(0, this.remainingSeconds));
        return new IrAttotime(seconds);
    }
    enabled() {
        return Number.isFinite(this.remainingSeconds);
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
            // The callback runs at the expiry, not at the end of the lump that
            // carried the clock past it: a scanline tick re-arming for the next line
            // must measure that line from where it actually fired.
            const outerBacklog = timerBacklogSeconds;
            timerBacklogSeconds = outerBacklog + overshoot;
            try {
                callback(this.parameter);
            }
            finally {
                timerBacklogSeconds = outerBacklog;
            }
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
            this.intervalSeconds = firedPeriod;
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
    /** Backing store for each address space the device declares, by MAME index. */
    spaces = new Map();
    clock;
    /** Samples published through `sound_stream::put_int` since the last collection. */
    streamSamples = [];
    slotChild;
    /** Set for the duration of a mounted card's installer; see installSlotCard. */
    installSpace;
    /** Devices instantiated from this one's device_add_mconfig. */
    children = [];
    constructor(definition, clock, options = {}) {
        this.definition = definition;
        // `device_t::m_clock` is a u32, so MAME's own `clock()` never has a
        // fraction: a device configured at m_xtal/114 is asked for 31399, not
        // 31399.78. Handing the fraction back made the TIA's sample counter land
        // one short of its divisor and take the oversampling branch MAME does not.
        clock = Math.trunc(clock);
        this.clock = clock;
        for (const config of definition.spaces ?? []) {
            this.spaces.set(config.index, generatedDeviceSpace(config.addressBits));
        }
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
                                ? options.finder?.(member.finder.tag, member.name) ?? 0
                                : /^bitmap_(?:rgb32|ind16|ind8)$/.test(member.valueType)
                                    ? (member.arrayLength
                                        ? Array.from({ length: member.arrayLength }, () => new GeneratedBitmap(member.valueType))
                                        : new GeneratedBitmap(member.valueType))
                                    // MAME's `memory_bank_creator m_bank{*this, "bank"}`: a device that
                                    // banks its own window declares the bank as a member and installs it
                                    // into the owner's space. Resolving it to a number left every Atari
                                    // 2600 bank-switch cartridge with no window at all.
                                    : /^memory_bank(?:_array)?_creator/.test(member.valueType)
                                        ? (member.arrayLength
                                            ? Array.from({ length: member.arrayLength }, () => new IrMemoryBank())
                                            : new IrMemoryBank())
                                        // A struct the device declares: build the shape its source gives it,
                                        // so the fields a method writes exist to be written.
                                        : member.fields
                                            ? (member.arrayLength
                                                ? Array.from({ length: member.arrayLength }, () => structMember(member.fields))
                                                : structMember(member.fields))
                                            : member.memory
                                                ? memoryMember(member, options)
                                                : member.values ? [...member.values]
                                                    // A multi-dimensional array needs its inner rows to exist before the
                                                    // second subscript can store into one: `m_wave_ram[bank][offset] = x`
                                                    // indexes a number otherwise, and the write goes nowhere.
                                                    : member.arrayShape ? nestedArrayMember(member.arrayShape)
                                                        : isIndexableMemberType(member.valueType) ? []
                                                            : member.initial ?? 0));
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
            // One signal can name two different devcbs, told apart in MAME by how
            // they are called: `pa_rd_callback()` is the whole-port read, and
            // `pa_rd_callback<n>()` is bit n. Keying only by signal let the second
            // definition replace the first, so the 6532's whole-port read kept an
            // orphaned listener list, reported itself unset, and every Atari 2600
            // joystick read fell back to the port latch.
            const group = this.listeners.get(callback.signal) ?? [];
            group.push(slots);
            this.listeners.set(callback.signal, group);
            const emitters = slots.map(listeners => {
                const emitter = (...args) => {
                    // A MAME devcb is one .set() plus any number of .append()s, and the
                    // whole chain contributes: reads are OR-combined. Overwriting kept
                    // only the last entry, which collapsed the Namco 53xx's mode select
                    // — (q7<<3)|(q6<<2)|(q5<<1) on one K port — to a single bit.
                    //
                    // A listener that returns nothing (every write callback) contributes
                    // nothing: the declared initial still stands, exactly as it does for
                    // an unbound chain. Folding those into 0 silently changed the value
                    // read back from write-only devcbs.
                    let result;
                    for (const listener of listeners) {
                        const value = listener(...args);
                        if (value === undefined)
                            continue;
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
                clocks_to_attotime: ticks => clock > 0 ? ticks / clock : Infinity,
                // MAME `device_t::attotime_to_clocks`, the inverse. A chip that
                // measures an interval in its own clocks needs it: the Game Boy APU
                // advances every channel by
                // `attotime_to_clocks(now - m_last_updated)`, and unbound that was
                // zero every time -- the square waves never toggled and the console
                // rendered silence however loud the game set the envelope.
                attotime_to_clocks: seconds => Math.floor(Number(seconds) * clock),
                // MAME `sound_stream::put_int(channel, index, value, max)`, with the
                // channel dropped by the caller: a sound device publishes one rendered
                // sample per call, scaled to full-range, and the host collects them
                // through takeStreamSamples() rather than the device pushing anywhere.
                stream_put_int: (index, value, max) => {
                    this.streamSamples[index] = max ? value / max : 0;
                    return 0;
                },
                'attotime::from_hz': frequency => frequency > 0 ? 1 / frequency : Infinity,
                'attotime::from_ticks': (ticks, frequency) => frequency > 0 ? ticks / frequency : Infinity,
                // MAME's device_palette_interface has both overloads:
                // `set_pen_color(pen, rgb_t)` and `set_pen_color(pen, r, g, b)`. Only
                // the argument count separates them, and reading the four-argument form
                // as the two-argument one stored the red channel alone as the whole
                // colour -- which made the TIA's pen 0 black-with-no-alpha and every
                // Atari 2600 picture invisible.
                set_pen_color: (entry, ...channels) => {
                    palette[entry] = channels.length >= 3
                        ? rgbPixel(channels[0], channels[1], channels[2])
                        : channels[0] >>> 0;
                    return 0;
                },
                pen_color: entry => palette[entry] ?? 0xff000000,
                // device_palette_interface::pen(i). With no indirection table MAME
                // points m_pens straight at the adjusted entry colours, so the pen a
                // device writes into a bitmap_rgb32 is the colour itself.
                pen: entry => palette[entry] ?? 0xff000000,
                // The C math functions MAME's palette and DSP arithmetic reaches for.
                // `pow` is not optional decoration: the TIA gamma-corrects every one of
                // its 128 base pens with `pow(R, 0.9)`, and an unbound call answered
                // zero -- which made the whole palette black and every Atari 2600
                // picture with it.
                floor: value => Math.floor(value),
                ceil: value => Math.ceil(value),
                pow: (value, exponent) => Math.pow(value, exponent),
                sqrt: value => Math.sqrt(value),
                exp: value => Math.exp(value),
                log: value => Math.log(value),
                log10: value => Math.log10(value),
                fabs: value => Math.abs(value),
                tan: value => Math.tan(value),
                atan: value => Math.atan(value),
                atan2: (y, x) => Math.atan2(y, x),
                cos: value => Math.cos(value),
                sin: value => Math.sin(value),
                DEGREE_TO_RADIAN: value => value * Math.PI / 180,
                'std::clamp': (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value)),
                rgb_t: (...components) => {
                    const offset = components.length >= 4 ? 1 : 0;
                    const alpha = components.length >= 4 ? components[0] & 0xff : 0xff;
                    const red = components[offset] & 0xff;
                    const green = components[offset + 1] & 0xff;
                    const blue = components[offset + 2] & 0xff;
                    return (alpha << 24 | blue << 16 | green << 8 | red) >>> 0;
                },
                // MAME: copybitmap(dest, src, flipx, flipy, destx, desty, cliprect).
                // The arguments past the two bitmaps are not decoration -- a video
                // device's own bitmap is its whole raster, wider than the visible
                // screen, so a copy that ignores stride and offset shears the picture.
                copybitmap: (destination, source, _flipx, _flipy, destX, destY, cliprect) => {
                    copyGeneratedBitmap(destination, source, destX, destY, cliprect);
                    return 0;
                },
                // `space(n)`: the device's own address space, as MAME's
                // device_memory_interface hands it out. Every declared space is flat
                // RAM (the extractor records no other shape), so the map is the buffer.
                space: index => this.spaces.get(Number(index)) ?? 0,
                // Storage a device reaches through an accessor rather than a member:
                // a Game Boy cartridge PCB asks its slot for `cart_rom_region()`.
                ...Object.fromEntries(Object.entries(definition.resources?.calls ?? {}).map(([name, resource]) => {
                    const value = resolveDeviceResource(resource, resourceOptions);
                    return [name, () => value];
                })),
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
            dereference: dereferenceGeneratedValue,
            container: generatedContainerAccessor,
            pointerStore: generatedPointerStore,
            add: generatedAdd,
            // A device declares every member up front, so the container is already
            // there; the name-addressed form exists for the board, whose driver
            // members are materialised on first write.
            writableMember: name => this.members[name] ?? 0,
            wide: generatedWideBinary,
            invoke: (name, ...args) => {
                const method = this.selectMethod(name, args);
                if (method)
                    return this.executeMethod(method, this.methodParams.get(method), args);
                const binding = this.bindings.calls?.[name];
                if (binding) {
                    const delegate = Object.values(this.definition.delegates ?? {}).includes(name);
                    return binding(...(delegate ? args : args.map(Number)));
                }
                const member = this.members[name];
                if (typeof member === 'function')
                    return member(...args);
                return 0;
            },
            macro: (name, ...args) => applyGeneratedMacro(name, args) ?? 0,
            combineData: applyCombineData,
            divide: applyGeneratedDivision,
            same: generatedValuesEqual,
            andAssign: applyGeneratedAndAssign,
            // Devices declare every member up front, so an absent one is genuinely
            // absent; boards resolve finders and getters here (see execute.ts).
            member: () => 0,
            overrides: {},
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
                const cartSpace = definition.slot.install?.space;
                const child = this.slotChild = new IrDevice(childDefinition, clock, {
                    ...resourceOptions,
                    // A child card may itself be a slot in a future bus; do not pass
                    // the parent's selected option through accidentally.
                    slot: undefined,
                    // The address space the card installs itself into, as MAME's own
                    // interface hands it out. The slot fills it in for the duration of
                    // installSlotCard and clears it after, so a card that asks outside
                    // that window sees the null pointer MAME's `cart_space()` returns.
                    ...(cartSpace
                        ? {
                            calls: {
                                ...resourceOptions.calls,
                                [cartSpace]: () => this.slotChild?.installSpace ?? 0,
                            },
                        }
                        : {}),
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
        // Devices this one is built out of, as its device_add_mconfig declares.
        // Constructed before device_start, because that is when MAME's own
        // finders are already resolved -- the DPC cartridge hands its display
        // data straight to its coprocessor.
        for (const child of definition.children ?? []) {
            const instance = new IrDevice(child.definition, clock, {
                ...resourceOptions,
                slot: undefined,
            });
            this.children.push(instance);
            this.members[child.member] = Object.fromEntries(instance.methodNames().map(name => [
                name,
                (...args) => instance.invoke(name, ...args),
            ]));
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
        for (const child of this.children)
            child.reset();
        if (this.definition.reset)
            this.call(this.definition.reset);
    }
    tick(seconds) {
        for (const { timer, callback } of this.timers.values()) {
            timer.tick(seconds, parameter => this.call(callback, parameter));
        }
        // A device built out of other devices has to advance them too: the board
        // only knows the devices its own machine config names. Pitfall II's DPC
        // coprocessor sits two levels down -- cartridge slot, then mounted PCB --
        // and its 18400 Hz oscillator drives the chip's random-number and music
        // counters, so without this it is frozen while everything else runs.
        for (const child of this.children)
            child.tick(seconds);
        this.slotChild?.tick(seconds);
    }
    call(name, ...args) {
        return Number(this.invoke(name, ...args)) || 0;
    }
    invoke(name, ...args) {
        // A composition capability may replace a source method when the method's
        // external card/device dependency is supplied by the host (for example a
        // controller connector backed by live browser input ports).
        const bound = this.bindings.calls?.[name];
        if (bound) {
            // device_delegate callbacks may carry C++ reference parameters (Konami
            // tile/sprite callbacks update code, color and priority in place).  A
            // numeric coercion here discards the generated pointer wrapper and makes
            // the callback appear to run while none of its results reach the chip.
            const delegate = Object.values(this.definition.delegates ?? {}).includes(name);
            return bound(...(delegate ? args : args.map(Number)));
        }
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
    hasMember(name) {
        return Object.hasOwn(this.members, name);
    }
    bindMember(name, value) {
        if (this.hasMember(name))
            this.members[name] = value;
    }
    constant(name) {
        return this.definition.constants[name] ??
            this.definition.constants[name.split('::').at(-1)];
    }
    constants() {
        return this.definition.constants;
    }
    methodNames() {
        return [...this.methods.keys()];
    }
    takeStreamSamples() {
        const samples = this.streamSamples;
        this.streamSamples = [];
        return samples;
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
    on(signal, listener, slot) {
        const group = this.listeners.get(signal);
        if (!group?.length) {
            throw new Error(`${this.definition.type} has no callback signal "${signal}"`);
        }
        // An unindexed binding is the whole-port devcb; an indexed one addresses a
        // bit. Where a signal names both, that is what separates them.
        const channels = slot === undefined
            ? group.find(candidate => candidate.length === 1) ?? group[0]
            : group.find(candidate => candidate.length > 1 && slot < candidate.length)
                ?? group[0];
        const listeners = channels[slot ?? 0];
        if (!listeners) {
            throw new Error(`${this.definition.type} callback "${signal}" has no slot ${slot}`);
        }
        listeners.push(listener);
        return this;
    }
    bindCall(name, listener, parameters) {
        this.bindings.calls[name] = listener;
        if (parameters !== undefined) {
            this.bindings.callParameters[name] = splitParameters(parameters);
            if (parameters.includes('&')) {
                this.bindings.referenceCalls[name] = listener;
            }
        }
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
    delegates() {
        return this.definition.delegates ?? {};
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
    /**
     * Run the mounted card's own installer against `space`.
     *
     * MAME's two cartridge buses ask for this differently, and the slot's IR
     * says which: the Atari 2600's interface takes the space as an argument,
     * while a Game Boy PCB's `load(message)` reaches for it through
     * `cart_space()`. Binding the accessor for the duration covers both without
     * the host needing to know which bus it is holding.
     */
    installSlotCard(space) {
        const install = this.definition.slot?.install ??
            { method: 'install_memory_handlers', space: undefined };
        if (!this.slotChild)
            throw new Error(`${this.definition.type} has no selected slot card`);
        if (!install.space) {
            this.slotChild.invoke(install.method, space);
            return;
        }
        this.slotChild.installSpace = space;
        try {
            this.slotChild.invoke(install.method, 0);
        }
        finally {
            this.slotChild.installSpace = undefined;
        }
        // MAME resets after mounting an image -- a cartridge slot's
        // `is_reset_on_load()` is true -- and a PCB's power-on bank positions are
        // set by its own device_reset. Run at construction, before the card had
        // configured any banks, that reset selected entries on banks that did not
        // exist yet: an MBC1 came up with both ROM windows on page 0 instead of
        // pages 0 and 1, so every cartridge larger than 32 KiB read its first page
        // twice.
        this.slotChild.reset();
    }
    executeMethod(method, parameterNames, args) {
        try {
            if (this.definition.type.toUpperCase() === 'GENERIC_LATCH_8' &&
                method.name === 'write') {
                // generic_latch_8_device defers the store with
                // scheduler().synchronize(sync_callback, data) so the reading
                // processor cannot observe each write of a burst separately. The
                // quantum is what provides that here — it runs to the next scheduled
                // event, as MAME's runs to the next timer — so the store itself is
                // applied directly rather than dropping the timer_expired_delegate.
                return this.invoke('sync_callback', args[0] ?? 0);
            }
            const defaults = this.methodDefaults.get(method);
            const resolvedArgs = parameterNames.map((_name, index) => args[index] ?? defaults?.[index] ?? 0);
            const compiled = this.definition.compiledMethods?.[method.name];
            // A `&` parameter always arrives as a get/set wrapper, because the caller
            // cannot know whether the callee reassigns it. Only methods that do NOT
            // reassign one reach this map (the emitter keeps the others out of it,
            // since their ABI is one an emitted caller satisfies directly), so an
            // emitted method here wants the referent — the same unwrapping the
            // board's compiled-handler path performs. Without it the NES PPU's
            // emitted draw_tile_pixel wrote through `u32*& dest` as if the wrapper
            // itself were the pointer, and one background tile threw.
            if (compiled) {
                return compiled(this.executionContext, ...resolvedArgs.map(argument => generatedReferent(argument)));
            }
            const locals = {};
            for (let index = 0; index < parameterNames.length; index++) {
                locals[parameterNames[index]] = resolvedArgs[index];
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
    /** Per-entry bases, for a bank configured one entry at a time. */
    bases = new Map();
    configure_entries(_start, _count, source, stride) {
        const bytes = asBankBytes(source);
        if (bytes)
            this.source = bytes.source;
        this.stride = Math.max(1, stride | 0);
        this.bases.clear();
    }
    /**
     * MAME `memory_bank::configure_entry(entry, base)`: one entry pointed at one
     * place, rather than a whole run at a fixed stride. The Game Boy's MBCs use
     * this form exclusively -- a ROM smaller than its bank count is mapped by
     * folding pages onto entries, which no single stride describes.
     */
    configure_entry(entry, base) {
        const bytes = asBankBytes(base);
        if (!bytes)
            return;
        this.source = bytes.source;
        this.bases.set(Math.max(0, entry | 0), bytes.offset);
    }
    set_entry(entry) {
        this.entry = Math.max(0, entry | 0);
    }
    /** MAME `memory_bank::base()`: the bytes the selected entry starts at. */
    base() {
        return { generatedPointer: true, source: this.source, offset: this.offset() };
    }
    read(offset) {
        return this.source[this.offset() + offset] ?? 0xff;
    }
    write(offset, value) {
        const target = this.source;
        const index = this.offset() + offset;
        if (index >= 0 && index < this.source.length)
            target[index] = value & 0xff;
    }
    offset() {
        return this.bases.get(this.entry) ?? this.entry * this.stride;
    }
}
/** A bank base, whether it arrived as bytes or as a pointer part-way in. */
function asBankBytes(value) {
    if (ArrayBuffer.isView(value) || Array.isArray(value)) {
        return { source: value, offset: 0 };
    }
    if (isGeneratedPointer(value))
        return { source: value.source, offset: value.offset };
    return undefined;
}
function resolveDeviceResource(resource, options) {
    if (resource.kind === 'number')
        return resource.value;
    const regions = options.regions ?? {};
    const resourceName = 'name' in resource ? resource.name : '';
    const regionName = resourceName === 'self' ? options.tag ?? '' : resourceName;
    if (resource.kind === 'region')
        return regions[regionName] ?? new Uint8Array(0);
    // MAME's `memory_region *`. A device that is handed one asks it three
    // questions -- how big, where does it start, give me the bytes -- and a
    // missing region answers as a null pointer does, which is what lets a
    // cartridge with no save RAM take MAME's own "no NVRAM" branch.
    if (resource.kind === 'region-object') {
        const bytes = regions[regionName];
        if (!bytes?.length)
            return 0;
        return {
            bytes: () => bytes.length,
            base: () => bytes,
            as_u8: () => bytes,
        };
    }
    if (resource.kind === 'region-pointer') {
        // MAME's `get_rom_base() + N`: the same bytes, addressed from an offset.
        return {
            generatedPointer: true,
            source: regions[regionName] ?? new Uint8Array(0),
            offset: resource.offset,
        };
    }
    if (resource.kind === 'region-length')
        return regions[regionName]?.length ?? 0;
    if (resource.kind === 'region-pages') {
        return Math.floor((regions[regionName]?.length ?? 0) / Math.max(1, resource.bytes));
    }
    if (resource.kind === 'region-page-mask') {
        const pages = Math.floor((regions[regionName]?.length ?? 0) / Math.max(1, resource.bytes));
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
/**
 * A MAME bitmap value used by generated device methods.
 *
 * MAME names the pixel format in the type -- `bitmap_rgb32`, `bitmap_ind16`,
 * `bitmap_ind8` -- and a device that composes its picture in an indexed format
 * before resolving pens needs the narrower store, not a 32-bit one. The TIA
 * composites two `bitmap_ind16` scanline buffers and diffs them into a
 * `bitmap_rgb32`, so both widths have to be real.
 */
class GeneratedBitmap {
    pixels;
    bitmapWidth = 0;
    bitmapHeight = 0;
    storage;
    constructor(valueType) {
        this.storage = /_ind8$/.test(valueType)
            ? Uint8Array
            : /_ind16$/.test(valueType)
                ? Uint16Array
                : Uint32Array;
        this.pixels = new this.storage(0);
    }
    allocate(width, height) {
        this.bitmapWidth = Math.max(0, width | 0);
        this.bitmapHeight = Math.max(0, height | 0);
        this.pixels = new this.storage(this.bitmapWidth * this.bitmapHeight);
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
/**
 * MAME's copybitmap: `dest(x, y) = src(x - destX, y - destY)` over the clip.
 *
 * Both bitmaps are addressed in the screen's own raster coordinates, and the
 * source is normally the whole raster -- the TMS9928A's is 342 x 313 for a
 * 280 x 216 visible screen. Copying the backing arrays linearly therefore
 * shears the picture by the difference in stride once per line, which looks
 * like a correctly laid out screen made of scrambled pixels.
 */
function copyGeneratedBitmap(destination, source, destX = 0, destY = 0, clip) {
    if (!source || typeof source !== 'object' || !destination || typeof destination !== 'object')
        return;
    const bitmap = source;
    if (!ArrayBuffer.isView(bitmap.pixels))
        return;
    const pixels = bitmap.pixels;
    const sourceWidth = bitmap.bitmapWidth ?? 0;
    const sourceHeight = bitmap.bitmapHeight ?? 0;
    if (sourceWidth <= 0 || sourceHeight <= 0)
        return;
    const offsetX = Number(destX) || 0;
    const offsetY = Number(destY) || 0;
    const rectangle = clip && typeof clip === 'object' ? clip : undefined;
    // Absent a clip the whole source lands, placed where destX/destY put it.
    const minX = Math.max(rectangle?.min_x ?? offsetX, offsetX);
    const maxX = Math.min(rectangle?.max_x ?? offsetX + sourceWidth - 1, offsetX + sourceWidth - 1);
    const minY = Math.max(rectangle?.min_y ?? offsetY, offsetY);
    const maxY = Math.min(rectangle?.max_y ?? offsetY + sourceHeight - 1, offsetY + sourceHeight - 1);
    const direct = destination.direct;
    if (direct?.pixels) {
        for (let y = minY; y <= maxY; y++) {
            const row = (y - offsetY) * sourceWidth;
            const visibleY = Math.floor((y - direct.scaledYOffset) / direct.yScale);
            if (visibleY < 0 || visibleY >= direct.height)
                continue;
            const target = visibleY * direct.width;
            for (let x = minX; x <= maxX; x++) {
                const visibleX = Math.floor((x - direct.scaledXOffset) / direct.xScale);
                if (visibleX < 0 || visibleX >= direct.width)
                    continue;
                direct.pixels[target + visibleX] = pixels[row + (x - offsetX)] >>> 0;
            }
        }
        return;
    }
    const setPixel = destination['pix='];
    if (typeof setPixel !== 'function')
        return;
    const write = setPixel;
    for (let y = minY; y <= maxY; y++) {
        const row = (y - offsetY) * sourceWidth;
        for (let x = minX; x <= maxX; x++)
            write(y, x, pixels[row + (x - offsetX)]);
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
        return generatedMemoryArray(memory.elementBytes);
    const tag = (memory.share === 'self' ? options.tag : memory.share)
        ?.replace(/^\^+/, '')
        .replace(/^:/, '');
    const bytes = tag ? options.shares?.[tag] : undefined;
    if (!bytes && /^optional_shared_ptr\b/.test(member.valueType)) {
        return new Uint8Array(0);
    }
    if (!bytes) {
        throw new Error(`generated device memory share "${tag ?? memory.share}" is not available for ${member.name}`);
    }
    return generatedMemoryArray(memory.elementBytes, bytes);
}
/** A memory container indexed in the element width declared by its C++ type. */
function generatedMemoryArray(elementBytes, bytes) {
    if (!bytes) {
        if (elementBytes === 2)
            return new Uint16Array(0);
        if (elementBytes === 4)
            return new Uint32Array(0);
        return new Uint8Array(0);
    }
    if (elementBytes === 2) {
        return new Uint16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
    }
    if (elementBytes === 4) {
        return new Uint32Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 4));
    }
    return bytes;
}
function splitParameters(parameters) {
    // `(void)` is C's empty parameter list, not a parameter named `void`.
    if (parameters.trim() === 'void')
        return [];
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
function isIndexableMemberType(valueType) {
    if (!valueType)
        return false;
    return /^(?:memory_share_creator|required_shared_ptr|optional_shared_ptr)\b/.test(valueType)
        || /\[\s*\d*\s*\]$/.test(valueType);
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
function generatedDeviceSpace(addressBits) {
    const memory = new Uint8Array(1 << addressBits);
    const mask = memory.length - 1;
    return {
        memory,
        read_byte: address => memory[address & mask],
        write_byte: (address, data) => {
            memory[address & mask] = data & 0xff;
            return 0;
        },
    };
}
/**
 * The packing the generated runtime uses for a MAME `rgb_t`: alpha, then blue,
 * green and red down to the low byte. `rgb_t::r()` and friends read it back.
 */
function rgbPixel(red, green, blue) {
    return ((0xff << 24) | ((blue & 0xff) << 16) | ((green & 0xff) << 8) | (red & 0xff)) >>> 0;
}
/** A plain-old-data struct member, with each declared field present. */
/**
 * A C struct instance whose scalar fields keep their declared width.
 *
 * The width is enforced by the property itself rather than at each assignment,
 * so every path -- interpreted, emitted, or a host poke -- wraps identically.
 * Without it a `uint8_t` field decremented past zero became -1 instead of
 * 0xff, and MAME code that carries on `if (field == 0xff)` silently never
 * carried: the DPC's display-data pointer walked off its 2K window.
 */
function structMember(fields) {
    const value = {};
    const widths = {};
    for (const field of fields) {
        // A field that is itself a struct, and commonly an array of them: the
        // Game Boy PPU keeps ten sprite slots inside its per-line state. Built as
        // a number, the first assignment into one had nothing to assign to.
        if (field.fields) {
            value[field.name] = field.length
                ? Array.from({ length: field.length }, () => structMember(field.fields))
                : structMember(field.fields);
            continue;
        }
        if (field.length) {
            value[field.name] = Array.from({ length: field.length }, () => 0);
            continue;
        }
        value[field.name] = 0;
        // The width travels beside the struct rather than as an accessor on the
        // field. Emitted code narrows inline from the same declaration; the
        // interpreter narrows through this on assignment. Accessors did it for
        // both, and made every *read* a call too -- the Game Boy's wave channel
        // walks its counters in a loop that runs forty thousand times a frame.
        if (field.bits && field.bits < 32) {
            widths[field.name] = field.signed ? -field.bits : field.bits;
        }
    }
    if (Object.keys(widths).length) {
        Object.defineProperty(value, GENERATED_FIELD_WIDTHS, {
            value: widths,
            enumerable: false,
            configurable: true,
        });
    }
    return value;
}
/** A C array member's storage, one level of nesting per declarator bound. */
function nestedArrayMember(shape) {
    const [extent, ...inner] = shape;
    return Array.from({ length: Math.max(0, extent ?? 0) }, () => inner.length ? nestedArrayMember(inner) : 0);
}
