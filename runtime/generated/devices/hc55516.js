import deviceData from './hc55516.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const cppMin = (a, b) => (b < a ? b : a);
    const cppMax = (a, b) => (a < b ? b : a);
    // An aggregate initializer's struct, marked as one (execute.ts's
    // isGeneratedStruct) through its prototype: like generatedStruct's
    // non-enumerable marker, field walks and spreads never see it, and a
    // literal with a prototype costs nothing next to defineProperty.
    const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
    // CALL_METHOD through a table of method names: each entry's emitted method,
    // resolved once and again only if that entry's name changes (see the
    // CALL_METHOD emission). The last table is held, as a core keeps one until
    // its mode changes.
    const cppDispatch = new WeakMap();
    let cppLastTable, cppLastEntry;
    const cppMethodAt = (table, index) => {
        if (!Array.isArray(table))
            return undefined;
        let entry = table === cppLastTable ? cppLastEntry : undefined;
        if (!entry) {
            entry = cppDispatch.get(table);
            if (!entry)
                cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
            cppLastTable = table;
            cppLastEntry = entry;
        }
        const name = table[index];
        if (entry.names[index] === name && name !== undefined)
            return entry.methods[index];
        entry.names[index] = name;
        return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
    };
    // execute.ts's clearGeneratedStruct, field names read once per struct.
    const cppUnionElements = Symbol.for('mamekit.unionElements');
    const cppStructKeys = new WeakMap();
    const cppClearStruct = (target, value) => {
        let keys = cppStructKeys.get(target);
        if (!keys)
            cppStructKeys.set(target, keys = Object.keys(target));
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            const field = target[key];
            if (ArrayBuffer.isView(field) || Array.isArray(field))
                field.fill(value);
            else if (field && typeof field === 'object')
                cppClearStruct(field, value);
            else
                target[key] = value;
        }
    };
    // memset: typed memory fills in place; a plain array of numbers is set
    // element by element (as the interpreter's fillGeneratedMemory writes it,
    // count elements from 0); an array holding structs, or a pointer into a
    // plain array, goes to the interpreter's rule, which clears each struct.
    const cppMemset = (runtime, target, value, count) => {
        const bytes = Number(count);
        if (Array.isArray(target)) {
            for (let index = 0; index < bytes; index++) {
                const element = target[index];
                if (element !== null && typeof element === 'object') {
                    // A struct element is cleared field by field (cppClearStruct);
                    // anything else array-like takes the interpreter's rule.
                    if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
                        return runtime.macro("memset", target, value, bytes);
                    }
                    cppClearStruct(element, value);
                    continue;
                }
                target[index] = value;
            }
            return target;
        }
        if (Array.isArray(target?.source))
            return runtime.macro("memset", target, value, bytes);
        if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        }
        target.fill(value, 0, bytes);
        return target;
    };
    // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
    // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
    // execute.ts's wide operators answer them (a shift of 64 or more is 0).
    const cppLo64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
    const cppHi64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
    const cppShl64Lo = (lo, hi, s) => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
    const cppShl64Hi = (lo, hi, s) => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
    const cppShr64Lo = (lo, hi, s) => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
    const cppShr64Hi = (lo, hi, s) => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
    const cppStringText = (value) => typeof value === 'string' ? value
        : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
            : value === undefined || value === null ? '' : String(value);
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        method_cvsd_device_base__device_start(runtime);
        (__L1 ? __L1((__L0 ? __L0((members.m_sylfilter ?? 0)) : runtime.macro("NAME", (members.m_sylfilter ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_sylfilter ?? 0)) : runtime.macro("NAME", (members.m_sylfilter ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_intfilter ?? 0)) : runtime.macro("NAME", (members.m_intfilter ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_intfilter ?? 0)) : runtime.macro("NAME", (members.m_intfilter ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_next_sample ?? 0)) : runtime.macro("NAME", (members.m_next_sample ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_next_sample ?? 0)) : runtime.macro("NAME", (members.m_next_sample ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_agc ?? 0)) : runtime.macro("NAME", (members.m_agc ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_agc ?? 0)) : runtime.macro("NAME", (members.m_agc ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_buffered_fzq ?? 0)) : runtime.macro("NAME", (members.m_buffered_fzq ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_buffered_fzq ?? 0)) : runtime.macro("NAME", (members.m_buffered_fzq ?? 0)))));
    }
    function method_cvsd_device_base__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["stream_alloc"], __L1 = __l["NAME"], __L2 = __l["save_item"];
        members.m_stream = (__L0 ? __L0(0, 1, 192000) : runtime.macro("stream_alloc", 0, 1, 192000));
        (__L2 ? __L2((__L1 ? __L1((members.m_last_clock_state ?? 0)) : runtime.macro("NAME", (members.m_last_clock_state ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_last_clock_state ?? 0)) : runtime.macro("NAME", (members.m_last_clock_state ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_buffered_bit ?? 0)) : runtime.macro("NAME", (members.m_buffered_bit ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_buffered_bit ?? 0)) : runtime.macro("NAME", (members.m_buffered_bit ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_shiftreg ?? 0)) : runtime.macro("NAME", (members.m_shiftreg ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_shiftreg ?? 0)) : runtime.macro("NAME", (members.m_shiftreg ?? 0)))));
        (__L2 ? __L2((__L1 ? __L1((members.m_samples_generated ?? 0)) : runtime.macro("NAME", (members.m_samples_generated ?? 0)))) : runtime.macro("save_item", (__L1 ? __L1((members.m_samples_generated ?? 0)) : runtime.macro("NAME", (members.m_samples_generated ?? 0)))));
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        method_cvsd_device_base__device_reset(runtime);
        members.m_sylfilter = ((63) | 0);
        members.m_intfilter = ((0) | 0);
        members.m_agc = ((1) ? 1 : 0);
        members.m_buffered_fzq = ((1) ? 1 : 0);
    }
    function method_cvsd_device_base__device_reset(runtime) {
        const members = runtime.members;
        members.m_last_clock_state = ((0) ? 1 : 0);
    }
    function method_clock_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            (__t0 = __deref_clock_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        }
        return ((method_clock_state_r(runtime)) | 0);
    }
    function __deref_clock_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_clock_state_r(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_clock_state_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        return ((method_current_clock_state(runtime)) | 0);
    }
    function __deref_clock_state_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_current_clock_state(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        return ((runtime.wide("&", runtime.wide("/", runtime.wide("*", runtime.wide("*", (((members.m_samples_generated ?? 0)) >>> 0), (__L0 ? __L0() : runtime.macro("clock"))), 2), 192000), 1)) ? 1 : 0);
    }
    function method_mclock_w(runtime, state) {
        const members = runtime.members;
        method_clock_w(runtime, state);
    }
    function method_clock_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_clock_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        let clock_state = ((((state) ? 1 : 0)) ? 1 : 0);
        if (method_is_clock_changed(runtime, clock_state)) {
            members.m_samples_generated = ((0) >>> 0);
            method_process_bit(runtime, (members.m_buffered_bit ?? 0), clock_state);
        }
        members.m_last_clock_state = ((clock_state) ? 1 : 0);
    }
    function __deref_clock_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_is_clock_changed(runtime, clock_state) {
        const members = runtime.members;
        return (((((((((members.m_last_clock_state ?? 0)) ? 0 : 1)) && (clock_state)) ? 1 : 0)) || (((((members.m_last_clock_state ?? 0)) && (((clock_state) ? 0 : 1))) ? 1 : 0))) ? 1 : 0);
    }
    function method_process_bit(runtime, bit, clock_state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_fzq_pull_cb"], __L1 = __l["util::sext"], __L2 = __l["m_agc_push_cb"];
        let __t0;
        let frozen = ((((((((((((members.m_intfilter ?? 0)) >= (384)) ? 1 : 0)) && (((bit) ? 0 : 1))) ? 1 : 0)) || ((((((Number((members.m_intfilter ?? 0)) <= Number(-384)) ? 1 : 0)) && (bit)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        let sum = ((0) | 0);
        if (method_is_active_clock_transition(runtime, clock_state)) {
            let fzq_state = ((0) ? 1 : 0);
            if ((((__t0 = __deref_process_bit(runtime, members.m_fzq_pull_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_fzq_pull_cb, "isunset"))) ? 0 : 1)) {
                fzq_state = (((__L0 ? __L0() : typeof members.m_fzq_pull_cb === 'function' ? members.m_fzq_pull_cb() : runtime.invoke("m_fzq_pull_cb"))) ? 1 : 0);
            }
            else {
                fzq_state = (((members.m_buffered_fzq ?? 0)) ? 1 : 0);
            }
            if (((fzq_state) ? 0 : 1)) {
                bit = (((((((members.m_shiftreg ?? 0)) & (1))) ? 0 : 1)) ? 1 : 0);
            }
            members.m_shiftreg = (((((((members.m_shiftreg ?? 0)) << (1))) | (((bit) ? (1) : (0))))) & 0xff);
            if ((((((Number((((members.m_shiftreg ?? 0)) & (7))) === Number(0)) ? 1 : 0)) || (((Number((((members.m_shiftreg ?? 0)) & (7))) === Number(7)) ? 1 : 0))) ? 1 : 0)) {
                if (((frozen) ? 0 : 1)) {
                    members.m_sylfilter = ((((members.m_sylfilter) + (runtime.shiftRight((((~(members.m_sylfilter ?? 0))) & (4032)), 6)))) | 0);
                }
            }
            else {
                if (((frozen) ? 0 : 1)) {
                    members.m_sylfilter = ((((members.m_sylfilter) + (((runtime.shiftRight((((~(members.m_sylfilter ?? 0))) & (4032)), 6)) + (4033))))) | 0);
                }
            }
            members.m_sylfilter = ((((members.m_sylfilter) & (4095))) | 0);
            sum = (((__L1 ? __L1(__add_process_bit(runtime, runtime.shiftRight((~(members.m_intfilter ?? 0)), 4), 1), 10) : runtime.macro("util::sext", __add_process_bit(runtime, runtime.shiftRight((~(members.m_intfilter ?? 0)), 4), 1), 10))) | 0);
        }
        else {
            if ((((members.m_shiftreg ?? 0)) & (1))) {
                sum = (((__L1 ? __L1(__add_process_bit(runtime, (~cppMax(+(2), +(runtime.shiftRight((members.m_sylfilter ?? 0), 6)))), 1), 10) : runtime.macro("util::sext", __add_process_bit(runtime, (~cppMax(+(2), +(runtime.shiftRight((members.m_sylfilter ?? 0), 6)))), 1), 10))) | 0);
            }
            else {
                sum = (((__L1 ? __L1(cppMax(+(2), +(runtime.shiftRight((members.m_sylfilter ?? 0), 6))), 10) : runtime.macro("util::sext", cppMax(+(2), +(runtime.shiftRight((members.m_sylfilter ?? 0), 6))), 10))) | 0);
            }
        }
        if (((frozen) ? 0 : 1)) {
            members.m_intfilter = (((__L1 ? __L1((((members.m_intfilter ?? 0)) + (sum)), 10) : runtime.macro("util::sext", (((members.m_intfilter ?? 0)) + (sum)), 10))) | 0);
        }
        members.m_next_sample = (((((((members.m_intfilter ?? 0)) << (6))) | (runtime.shiftRight((((((members.m_intfilter ?? 0)) & (1023))) ^ (512)), 4)))) << 16 >> 16);
        if ((((((((members.m_intfilter ?? 0)) >= (256)) ? 1 : 0)) || (((Number((members.m_intfilter ?? 0)) <= Number(-256)) ? 1 : 0))) ? 1 : 0)) {
            members.m_agc = ((0) ? 1 : 0);
        }
        else {
            members.m_agc = ((1) ? 1 : 0);
        }
        (__L2 ? __L2(Number((members.m_agc ?? 0))) : typeof members.m_agc_push_cb === 'function' ? members.m_agc_push_cb((members.m_agc ?? 0)) : runtime.invoke("m_agc_push_cb", (members.m_agc ?? 0)));
    }
    function __add_process_bit(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_process_bit(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_is_active_clock_transition(runtime, clock_state) {
        const members = runtime.members;
        return (((((Number(clock_state) !== Number((members.m_last_clock_state ?? 0))) ? 1 : 0)) && (((Number(clock_state) === Number(1)) ? 1 : 0))) ? 1 : 0);
    }
    function method_digin_w(runtime, state) {
        const members = runtime.members;
        method_digit_w(runtime, state);
    }
    function method_digit_w(runtime, digit) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_digit_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_buffered_bit = ((((digit) ? 1 : 0)) ? 1 : 0);
    }
    function __deref_digit_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_dec_encq_w(runtime, state) {
        const members = runtime.members;
    }
    function method_digout_r(runtime) {
        const members = runtime.members;
        return ((0) | 0);
    }
    function method_is_external_oscillator(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        return ((Number((__L0 ? __L0() : runtime.macro("clock"))) !== Number(0)) ? 1 : 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1;
        if (method_is_external_oscillator(runtime)) {
            for (let i = ((0) | 0); ((Number(i) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                (__deref_sound_stream_update(runtime, stream).put_int?.(0, i, (members.m_next_sample ?? 0), 32768) ?? 0);
                members.m_samples_generated = ((((members.m_samples_generated) + (1))) >>> 0);
                let clock_state = ((method_current_clock_state(runtime)) & 0xff);
                if (method_is_clock_changed(runtime, clock_state)) {
                    method_process_bit(runtime, (members.m_buffered_bit ?? 0), clock_state);
                }
                members.m_last_clock_state = ((clock_state) ? 1 : 0);
            }
        }
        else {
            for (let i = ((0) | 0); ((Number(i) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                (__deref_sound_stream_update(runtime, stream).put_int?.(0, i, (members.m_next_sample ?? 0), 32768) ?? 0);
            }
        }
    }
    function __deref_sound_stream_update(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_clock_state_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_clock_state_cb(runtime, members.m_clock_state_push_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_clock_state_push_cb, "bind"));
    }
    function __deref_clock_state_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_digin_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_digin_cb(runtime, members.m_digin_pull_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_digin_pull_cb, "bind"));
    }
    function __deref_digin_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_digout_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_digout_cb(runtime, members.m_digout_push_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_digout_push_cb, "bind"));
    }
    function __deref_digout_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cvsd_device_base__clock_state_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cvsd_device_base__clock_state_cb(runtime, members.m_clock_state_push_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_clock_state_push_cb, "bind"));
    }
    function __deref_cvsd_device_base__clock_state_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cvsd_device_base__digin_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cvsd_device_base__digin_cb(runtime, members.m_digin_pull_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_digin_pull_cb, "bind"));
    }
    function __deref_cvsd_device_base__digin_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cvsd_device_base__digout_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cvsd_device_base__digout_cb(runtime, members.m_digout_push_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_digout_push_cb, "bind"));
    }
    function __deref_cvsd_device_base__digout_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_fzq_w(runtime, state) {
        const members = runtime.members;
        members.m_buffered_fzq = ((state) ? 1 : 0);
    }
    function method_agc_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        let __t0;
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            (__t0 = __deref_agc_r(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        }
        return (((members.m_agc ?? 0)) | 0);
    }
    function __deref_agc_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cvsd_device_base__process_bit(runtime, bit, clock_state) {
        const members = runtime.members;
    }
    function method_cvsd_device_base__sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0;
        members.m_samples_generated = ((((members.m_samples_generated) + ((__t0 = __deref_cvsd_device_base__sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples"))))) >>> 0);
        if (((Number((members.m_samples_generated ?? 0)) >= Number(192000)) ? 1 : 0)) {
            members.m_samples_generated = ((((members.m_samples_generated) - (192000))) >>> 0);
        }
    }
    function __deref_cvsd_device_base__sound_stream_update(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_fzq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_fzq_cb(runtime, members.m_fzq_pull_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_fzq_pull_cb, "bind"));
    }
    function __deref_fzq_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_agc_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_agc_cb(runtime, members.m_agc_push_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_agc_push_cb, "bind"));
    }
    function __deref_agc_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_hc55516_device__fzq_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_hc55516_device__fzq_cb(runtime, members.m_fzq_pull_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_fzq_pull_cb, "bind"));
    }
    function __deref_hc55516_device__fzq_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_hc55516_device__agc_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_hc55516_device__agc_cb(runtime, members.m_agc_push_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_agc_push_cb, "bind"));
    }
    function __deref_hc55516_device__agc_cb(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "cvsd_device_base::device_start": method_cvsd_device_base__device_start,
        "device_reset": method_device_reset,
        "cvsd_device_base::device_reset": method_cvsd_device_base__device_reset,
        "clock_r": method_clock_r,
        "clock_state_r": method_clock_state_r,
        "current_clock_state": method_current_clock_state,
        "mclock_w": method_mclock_w,
        "clock_w": method_clock_w,
        "is_clock_changed": method_is_clock_changed,
        "process_bit": method_process_bit,
        "is_active_clock_transition": method_is_active_clock_transition,
        "digin_w": method_digin_w,
        "digit_w": method_digit_w,
        "dec_encq_w": method_dec_encq_w,
        "digout_r": method_digout_r,
        "is_external_oscillator": method_is_external_oscillator,
        "sound_stream_update": method_sound_stream_update,
        "clock_state_cb": method_clock_state_cb,
        "digin_cb": method_digin_cb,
        "digout_cb": method_digout_cb,
        "cvsd_device_base::clock_state_cb": method_cvsd_device_base__clock_state_cb,
        "cvsd_device_base::digin_cb": method_cvsd_device_base__digin_cb,
        "cvsd_device_base::digout_cb": method_cvsd_device_base__digout_cb,
        "fzq_w": method_fzq_w,
        "agc_r": method_agc_r,
        "cvsd_device_base::process_bit": method_cvsd_device_base__process_bit,
        "cvsd_device_base::sound_stream_update": method_cvsd_device_base__sound_stream_update,
        "fzq_cb": method_fzq_cb,
        "agc_cb": method_agc_cb,
        "hc55516_device::fzq_cb": method_hc55516_device__fzq_cb,
        "hc55516_device::agc_cb": method_hc55516_device__agc_cb
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "clock", "m_agc_push_cb", "m_fzq_pull_cb", "machine", "machine().side_effects_disabled", "save_item", "stream_alloc", "util::sext"];
export const device = definition;
export default device;
