import deviceData from './speaker_sound.device.ir.json' with { type: 'json' };
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
        const __L0 = __l["machine"], __L1 = __l["machine().sample_rate"], __L2 = __l["stream_alloc"], __L3 = __l["std::begin"], __L4 = __l["std::end"], __L5 = __l["std::fill"], __L6 = __l["machine().time"], __L7 = __l["HZ_TO_ATTOSECONDS"], __L8 = __l["ATTOSECONDS_TO_DOUBLE"], __L9 = __l["attotime"], __L10 = __l["NAME"], __L11 = __l["save_item"];
        const h_m_composed_volume = members.m_composed_volume ?? 0;
        const h_m_ampl = members.m_ampl ?? 0;
        members.m_channel = (__L2 ? __L2(0, 1, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        members.m_level = ((0) | 0);
        (__L5 ? __L5((__L3 ? __L3(h_m_composed_volume) : runtime.macro("std::begin", h_m_composed_volume)), (__L4 ? __L4(h_m_composed_volume) : runtime.macro("std::end", h_m_composed_volume)), 0) : runtime.macro("std::fill", (__L3 ? __L3(h_m_composed_volume) : runtime.macro("std::begin", h_m_composed_volume)), (__L4 ? __L4(h_m_composed_volume) : runtime.macro("std::end", h_m_composed_volume)), 0));
        members.m_composed_sample_index = ((0) | 0);
        members.m_interm_sample_index = ((0) | 0);
        members.m_prevx = (members.m_prevy = 0);
        members.m_last_update_time = ((__L6 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        members.m_channel_sample_period = (__L7 ? __L7(((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("HZ_TO_ATTOSECONDS", ((__L1 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        members.m_channel_sample_period_secfrac = (__L8 ? __L8((members.m_channel_sample_period ?? 0)) : runtime.macro("ATTOSECONDS_TO_DOUBLE", (members.m_channel_sample_period ?? 0)));
        members.m_interm_sample_period = runtime.wide("/", (members.m_channel_sample_period ?? 0), 4);
        members.m_interm_sample_period_secfrac = (__L8 ? __L8((members.m_interm_sample_period ?? 0)) : runtime.macro("ATTOSECONDS_TO_DOUBLE", (members.m_interm_sample_period ?? 0)));
        members.m_channel_last_sample_time = (members.m_last_update_time ?? 0);
        members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L9 ? __L9(0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
        members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L9 ? __L9(0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
        let FILTER_STEP = runtime.divide(runtime.divide(3.141592653589793, 2), 4);
        let i = ((0) | 0);
        let x = 0;
        for (i = ((0) | 0), x = ((((0.5) - (((64) / (2))))) * (FILTER_STEP)); ((Number(i) < Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0), x = ((x) + (FILTER_STEP))) {
            if ((((x) === (0)) ? 1 : 0)) {
                h_m_ampl[i] = 1;
            }
            else {
                h_m_ampl[i] = ((Math.sin(Number(x))) / (x));
            }
        }
        (__L11 ? __L11((__L10 ? __L10((members.m_level ?? 0)) : runtime.macro("NAME", (members.m_level ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_level ?? 0)) : runtime.macro("NAME", (members.m_level ?? 0)))));
        (__L11 ? __L11((__L10 ? __L10(h_m_composed_volume) : runtime.macro("NAME", h_m_composed_volume))) : runtime.macro("save_item", (__L10 ? __L10(h_m_composed_volume) : runtime.macro("NAME", h_m_composed_volume))));
        (__L11 ? __L11((__L10 ? __L10((members.m_composed_sample_index ?? 0)) : runtime.macro("NAME", (members.m_composed_sample_index ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_composed_sample_index ?? 0)) : runtime.macro("NAME", (members.m_composed_sample_index ?? 0)))));
        (__L11 ? __L11((__L10 ? __L10((members.m_channel_last_sample_time ?? 0)) : runtime.macro("NAME", (members.m_channel_last_sample_time ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_channel_last_sample_time ?? 0)) : runtime.macro("NAME", (members.m_channel_last_sample_time ?? 0)))));
        (__L11 ? __L11((__L10 ? __L10((members.m_interm_sample_index ?? 0)) : runtime.macro("NAME", (members.m_interm_sample_index ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_interm_sample_index ?? 0)) : runtime.macro("NAME", (members.m_interm_sample_index ?? 0)))));
        (__L11 ? __L11((__L10 ? __L10((members.m_last_update_time ?? 0)) : runtime.macro("NAME", (members.m_last_update_time ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_last_update_time ?? 0)) : runtime.macro("NAME", (members.m_last_update_time ?? 0)))));
        (__L11 ? __L11((__L10 ? __L10((members.m_prevx ?? 0)) : runtime.macro("NAME", (members.m_prevx ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_prevx ?? 0)) : runtime.macro("NAME", (members.m_prevx ?? 0)))));
        (__L11 ? __L11((__L10 ? __L10((members.m_prevy ?? 0)) : runtime.macro("NAME", (members.m_prevy ?? 0)))) : runtime.macro("save_item", (__L10 ? __L10((members.m_prevy ?? 0)) : runtime.macro("NAME", (members.m_prevy ?? 0)))));
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        members.m_level = ((0) | 0);
    }
    function method_device_post_load(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime"];
        members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L0 ? __L0(0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
        members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L0 ? __L0(0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime"];
        let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
        let volume = runtime.readIndex((members.m_levels ?? 0), (members.m_level ?? 0));
        let filtered_volume = 0;
        let sampled_time = 0;
        if (((Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples"))) > Number(0)) ? 1 : 0)) {
            sampled_time = (__L0 ? __L0(0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)));
            if (((Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples"))) > Number(1)) ? 1 : 0)) {
                sampled_time = ((sampled_time) * ((__t2 = __deref_sound_stream_update(runtime, stream), typeof __t2.samples === 'function' ? __t2.samples() : typeof __t2.samples === 'number' || typeof __t2.samples === 'boolean' ? __t2.samples : runtime.container(stream, "samples"))));
            }
        }
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t3 = __deref_sound_stream_update(runtime, stream), typeof __t3.samples === 'function' ? __t3.samples() : typeof __t3.samples === 'number' || typeof __t3.samples === 'boolean' ? __t3.samples : runtime.container(stream, "samples")))) ? 1 : 0);) {
            filtered_volume = method_update_interm_samples_get_filtered_volume(runtime, volume);
            (__deref_sound_stream_update(runtime, stream).put?.(0, (__t4 = sampindex, sampindex = ((((sampindex) + (1))) | 0), __t4), filtered_volume) ?? 0);
            while (((Number(sampindex) < Number((__t5 = __deref_sound_stream_update(runtime, stream), typeof __t5.samples === 'function' ? __t5.samples() : typeof __t5.samples === 'number' || typeof __t5.samples === 'boolean' ? __t5.samples : runtime.container(stream, "samples")))) ? 1 : 0)) {
                filtered_volume = method_update_interm_samples_get_filtered_volume(runtime, volume);
                (__deref_sound_stream_update(runtime, stream).put?.(0, (__t6 = sampindex, sampindex = ((((sampindex) + (1))) | 0), __t6), filtered_volume) ?? 0);
            }
            members.m_channel_last_sample_time = ((members.m_channel_last_sample_time) + (sampled_time));
            members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L0 ? __L0(0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
            members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L0 ? __L0(0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
            members.m_last_update_time = (members.m_channel_last_sample_time ?? 0);
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
    function method_update_interm_samples_get_filtered_volume(runtime, volume) {
        const members = runtime.members;
        const h_m_composed_volume = members.m_composed_volume ?? 0;
        let filtered_volume = 0;
        let tempx = 0;
        if (((Number((members.m_interm_sample_index ?? 0)) < Number(4)) ? 1 : 0)) {
            method_finalize_interm_sample(runtime, volume);
            while (((Number((((members.m_interm_sample_index ?? 0)) + (1))) < Number(4)) ? 1 : 0)) {
                method_init_next_interm_sample(runtime);
                h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = volume;
            }
        }
        filtered_volume = method_get_filtered_volume(runtime);
        method_init_next_interm_sample(runtime);
        members.m_interm_sample_index = ((0) | 0);
        tempx = filtered_volume;
        filtered_volume = __add_update_interm_samples_get_filtered_volume(runtime, ((tempx) - ((members.m_prevx ?? 0))), ((0.995) * ((members.m_prevy ?? 0))));
        members.m_prevx = tempx;
        members.m_prevy = filtered_volume;
        return filtered_volume;
    }
    function __add_update_interm_samples_get_filtered_volume(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_finalize_interm_sample(runtime, volume) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime"];
        const h_m_composed_volume = members.m_composed_volume ?? 0;
        let fraction = 0;
        fraction = method_make_fraction(runtime, (members.m_next_interm_sample_time ?? 0), (members.m_last_update_time ?? 0), (members.m_interm_sample_period_secfrac ?? 0));
        h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = ((h_m_composed_volume[(members.m_composed_sample_index ?? 0)]) + (((volume) * (fraction))));
        members.m_last_update_time = (members.m_next_interm_sample_time ?? 0);
        members.m_next_interm_sample_time = ((members.m_next_interm_sample_time) + ((__L0 ? __L0(0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
    }
    function method_make_fraction(runtime, a, b, timediv) {
        const members = runtime.members;
        return (((typeof ((a) - (b)) === 'number' ? (((a) - (b))) : (__deref_make_fraction(runtime, ((a) - (b))).as_double?.() ?? 0))) / (timediv));
    }
    function __deref_make_fraction(runtime, p) {
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
    function method_init_next_interm_sample(runtime) {
        const members = runtime.members;
        const h_m_composed_volume = members.m_composed_volume ?? 0;
        members.m_composed_sample_index = ((((members.m_composed_sample_index) + (1))) | 0);
        if (((Number((members.m_composed_sample_index ?? 0)) >= Number(64)) ? 1 : 0)) {
            members.m_composed_sample_index = ((0) | 0);
        }
        h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = 0;
        members.m_interm_sample_index = ((((members.m_interm_sample_index) + (1))) | 0);
    }
    function method_get_filtered_volume(runtime) {
        const members = runtime.members;
        const h_m_composed_volume = members.m_composed_volume ?? 0;
        const h_m_ampl = members.m_ampl ?? 0;
        let filtered_volume = 0;
        let ampsum = 0;
        let i = ((0) | 0);
        let c = ((0) | 0);
        for (i = (((((members.m_composed_sample_index ?? 0)) + (1))) | 0), c = ((0) | 0); ((Number(c) < Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0), c = ((((c) + (1))) | 0)) {
            if (((Number(i) >= Number(64)) ? 1 : 0)) {
                i = ((0) | 0);
            }
            filtered_volume = ((filtered_volume) + (((h_m_composed_volume[i]) * (h_m_ampl[c]))));
            ampsum = ((ampsum) + (Math.abs(Number(h_m_ampl[c]))));
        }
        filtered_volume = ((filtered_volume) / (ampsum));
        return filtered_volume;
    }
    function method_level_w(runtime, new_level) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["attotime"];
        let __t0, __t1;
        let volume = 0;
        let time = 0;
        if ((((new_level) === ((members.m_level ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((new_level) < (0)) ? 1 : 0)) {
            new_level = ((0) | 0);
        }
        else {
            if ((((new_level) >= ((members.m_num_levels ?? 0))) ? 1 : 0)) {
                new_level = (((((members.m_num_levels ?? 0)) - (1))) | 0);
            }
        }
        volume = runtime.readIndex((members.m_levels ?? 0), (members.m_level ?? 0));
        time = ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
        if (((Number(time) < Number((members.m_channel_next_sample_time ?? 0))) ? 1 : 0)) {
            method_update_interm_samples(runtime, time, volume);
            members.m_level = ((new_level) | 0);
            return;
        }
        (__t0 = __deref_level_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        members.m_channel_last_sample_time = (__t1 = __deref_level_w(runtime, members.m_channel), typeof __t1.end_time === 'function' ? __t1.end_time() : typeof __t1.end_time === 'number' || typeof __t1.end_time === 'boolean' ? __t1.end_time : runtime.container(members.m_channel, "end_time"));
        if (((Number((members.m_channel_last_sample_time ?? 0)) > Number(time)) ? 1 : 0)) {
            members.m_channel_last_sample_time = ((members.m_channel_last_sample_time) - ((__L2 ? __L2(0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
        }
        members.m_channel_next_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L2 ? __L2(0, (members.m_channel_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_channel_sample_period ?? 0)))));
        members.m_next_interm_sample_time = (((members.m_channel_last_sample_time ?? 0)) + ((__L2 ? __L2(0, (members.m_interm_sample_period ?? 0)) : runtime.macro("attotime", 0, (members.m_interm_sample_period ?? 0)))));
        members.m_last_update_time = (members.m_channel_last_sample_time ?? 0);
        method_update_interm_samples(runtime, time, volume);
        members.m_level = ((new_level) | 0);
    }
    function __deref_level_w(runtime, p) {
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
    function method_update_interm_samples(runtime, time, volume) {
        const members = runtime.members;
        const h_m_composed_volume = members.m_composed_volume ?? 0;
        let fraction = 0;
        while (((Number(time) >= Number((members.m_next_interm_sample_time ?? 0))) ? 1 : 0)) {
            method_finalize_interm_sample(runtime, volume);
            method_init_next_interm_sample(runtime);
        }
        fraction = method_make_fraction(runtime, time, (members.m_last_update_time ?? 0), (members.m_interm_sample_period_secfrac ?? 0));
        h_m_composed_volume[(members.m_composed_sample_index ?? 0)] = ((h_m_composed_volume[(members.m_composed_sample_index ?? 0)]) + (((volume) * (fraction))));
        members.m_last_update_time = time;
    }
    function method_set_levels(runtime, num_levels, levels) {
        const members = runtime.members;
        members.m_num_levels = ((num_levels) | 0);
        members.m_levels = levels;
    }
    function method_speaker_sound_device__set_levels(runtime, num_levels, levels) {
        const members = runtime.members;
        members.m_num_levels = ((num_levels) | 0);
        members.m_levels = levels;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "device_post_load": method_device_post_load,
        "sound_stream_update": method_sound_stream_update,
        "update_interm_samples_get_filtered_volume": method_update_interm_samples_get_filtered_volume,
        "finalize_interm_sample": method_finalize_interm_sample,
        "make_fraction": method_make_fraction,
        "init_next_interm_sample": method_init_next_interm_sample,
        "get_filtered_volume": method_get_filtered_volume,
        "level_w": method_level_w,
        "update_interm_samples": method_update_interm_samples,
        "set_levels": method_set_levels,
        "speaker_sound_device::set_levels": method_speaker_sound_device__set_levels
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["ATTOSECONDS_TO_DOUBLE", "HZ_TO_ATTOSECONDS", "NAME", "attotime", "machine", "machine().sample_rate", "machine().time", "save_item", "std::begin", "std::end", "std::fill", "stream_alloc"];
export const device = definition;
export default device;
