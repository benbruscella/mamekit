import deviceData from './phoenix_sound.device.ir.json' with { type: 'json' };
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
        const __L0 = __l["STRUCT_OF"], __L1 = __l["machine"], __L2 = __l["machine().sample_rate"], __L3 = __l["stream_alloc"], __L4 = __l["NAME"], __L5 = __l["save_item"];
        let __t0;
        const h_m_c24_state = members.m_c24_state ?? 0;
        const h_m_c25_state = members.m_c25_state ?? 0;
        const h_m_noise_state = members.m_noise_state ?? 0;
        let i = ((0) | 0);
        let j = ((0) | 0);
        let shiftreg = ((0) >>> 0);
        members.m_sound_latch_a = ((0) & 0xff);
        runtime.copyStruct(members.m_c24_state, (__L0 ? __L0("c_state") : runtime.macro("STRUCT_OF", "c_state")));
        runtime.copyStruct(members.m_c25_state, (__L0 ? __L0("c_state") : runtime.macro("STRUCT_OF", "c_state")));
        runtime.copyStruct(members.m_noise_state, (__L0 ? __L0("n_state") : runtime.macro("STRUCT_OF", "n_state")));
        shiftreg = ((0) >>> 0);
        for (i = ((0) | 0); ((Number(i) < Number(8192)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let bits = ((0) >>> 0);
            for (j = ((0) | 0); (((j) < (32)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                bits = ((((((bits) >>> (1))) | (((shiftreg) << (31))))) >>> 0);
                if (((Number(((((shiftreg) >>> (16))) & (1))) === Number(((((shiftreg) >>> (17))) & (1)))) ? 1 : 0)) {
                    shiftreg = ((((((shiftreg) << (1))) | (1))) >>> 0);
                }
                else {
                    shiftreg = ((((shiftreg) << (1))) >>> 0);
                }
            }
            ((__t0 = members.m_poly18) && ArrayBuffer.isView(__t0) ? (__t0[i] = bits) : runtime.writeIndex(runtime.writableMember("m_poly18"), i, bits));
        }
        members.m_channel = (__L3 ? __L3(0, 1, ((__L2 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, ((__L2 ?? globalThis.mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
        (__L5 ? __L5((__L4 ? __L4((members.m_sound_latch_a ?? 0)) : runtime.macro("NAME", (members.m_sound_latch_a ?? 0)))) : runtime.macro("save_item", (__L4 ? __L4((members.m_sound_latch_a ?? 0)) : runtime.macro("NAME", (members.m_sound_latch_a ?? 0)))));
        (__L5 ? __L5((__L4 ? __L4(h_m_c24_state.counter) : runtime.macro("NAME", h_m_c24_state.counter))) : runtime.macro("save_item", (__L4 ? __L4(h_m_c24_state.counter) : runtime.macro("NAME", h_m_c24_state.counter))));
        (__L5 ? __L5((__L4 ? __L4(h_m_c24_state.level) : runtime.macro("NAME", h_m_c24_state.level))) : runtime.macro("save_item", (__L4 ? __L4(h_m_c24_state.level) : runtime.macro("NAME", h_m_c24_state.level))));
        (__L5 ? __L5((__L4 ? __L4(h_m_c25_state.counter) : runtime.macro("NAME", h_m_c25_state.counter))) : runtime.macro("save_item", (__L4 ? __L4(h_m_c25_state.counter) : runtime.macro("NAME", h_m_c25_state.counter))));
        (__L5 ? __L5((__L4 ? __L4(h_m_c25_state.level) : runtime.macro("NAME", h_m_c25_state.level))) : runtime.macro("save_item", (__L4 ? __L4(h_m_c25_state.level) : runtime.macro("NAME", h_m_c25_state.level))));
        (__L5 ? __L5((__L4 ? __L4(h_m_noise_state.counter) : runtime.macro("NAME", h_m_noise_state.counter))) : runtime.macro("save_item", (__L4 ? __L4(h_m_noise_state.counter) : runtime.macro("NAME", h_m_noise_state.counter))));
        (__L5 ? __L5((__L4 ? __L4(h_m_noise_state.polybit) : runtime.macro("NAME", h_m_noise_state.polybit))) : runtime.macro("save_item", (__L4 ? __L4(h_m_noise_state.polybit) : runtime.macro("NAME", h_m_noise_state.polybit))));
        (__L5 ? __L5((__L4 ? __L4(h_m_noise_state.polyoffs) : runtime.macro("NAME", h_m_noise_state.polyoffs))) : runtime.macro("save_item", (__L4 ? __L4(h_m_noise_state.polyoffs) : runtime.macro("NAME", h_m_noise_state.polyoffs))));
        (__L5 ? __L5((__L4 ? __L4(h_m_noise_state.lowpass_counter) : runtime.macro("NAME", h_m_noise_state.lowpass_counter))) : runtime.macro("save_item", (__L4 ? __L4(h_m_noise_state.lowpass_counter) : runtime.macro("NAME", h_m_noise_state.lowpass_counter))));
        (__L5 ? __L5((__L4 ? __L4(h_m_noise_state.lowpass_polybit) : runtime.macro("NAME", h_m_noise_state.lowpass_polybit))) : runtime.macro("save_item", (__L4 ? __L4(h_m_noise_state.lowpass_polybit) : runtime.macro("NAME", h_m_noise_state.lowpass_polybit))));
    }
    function method_update_c24(runtime, samplerate) {
        const members = runtime.members;
        const h_m_c24_state = members.m_c24_state ?? 0;
        if ((((members.m_sound_latch_a ?? 0)) & (64))) {
            if ((((h_m_c24_state.level) > (0)) ? 1 : 0)) {
                h_m_c24_state.counter = ((((h_m_c24_state.counter) - (((((((h_m_c24_state.level) - (0))) / (((20000) * (0.0000068))))) | 0)))) | 0);
                if ((((h_m_c24_state.counter) <= (0)) ? 1 : 0)) {
                    let n = ((__add_update_c24(runtime, runtime.divide((-h_m_c24_state.counter), samplerate), 1)) | 0);
                    h_m_c24_state.counter = ((((h_m_c24_state.counter) + (((n) * (samplerate))))) | 0);
                    if (((Number((h_m_c24_state.level = ((((h_m_c24_state.level) - (n))) | 0))) < Number(0)) ? 1 : 0)) {
                        h_m_c24_state.level = ((0) | 0);
                    }
                }
            }
        }
        else {
            if ((((h_m_c24_state.level) < (32767)) ? 1 : 0)) {
                h_m_c24_state.counter = ((((h_m_c24_state.counter) - (((((((32767) - (h_m_c24_state.level))) / (((1330) * (0.0000068))))) | 0)))) | 0);
                if ((((h_m_c24_state.counter) <= (0)) ? 1 : 0)) {
                    let n = ((__add_update_c24(runtime, runtime.divide((-h_m_c24_state.counter), samplerate), 1)) | 0);
                    h_m_c24_state.counter = ((((h_m_c24_state.counter) + (((n) * (samplerate))))) | 0);
                    if (((Number((h_m_c24_state.level = ((((h_m_c24_state.level) + (n))) | 0))) > Number(32767)) ? 1 : 0)) {
                        h_m_c24_state.level = ((32767) | 0);
                    }
                }
            }
        }
        return ((((32767) - (h_m_c24_state.level))) | 0);
    }
    function __add_update_c24(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_update_c25(runtime, samplerate) {
        const members = runtime.members;
        const h_m_c25_state = members.m_c25_state ?? 0;
        if ((((members.m_sound_latch_a ?? 0)) & (128))) {
            if ((((h_m_c25_state.level) < (32767)) ? 1 : 0)) {
                h_m_c25_state.counter = ((((h_m_c25_state.counter) - (((((((32767) - (h_m_c25_state.level))) / (((1330) * (0.0000068))))) | 0)))) | 0);
                if ((((h_m_c25_state.counter) <= (0)) ? 1 : 0)) {
                    let n = ((__add_update_c25(runtime, runtime.divide((-h_m_c25_state.counter), samplerate), 1)) | 0);
                    h_m_c25_state.counter = ((((h_m_c25_state.counter) + (((n) * (samplerate))))) | 0);
                    if (((Number((h_m_c25_state.level = ((((h_m_c25_state.level) + (n))) | 0))) > Number(32767)) ? 1 : 0)) {
                        h_m_c25_state.level = ((32767) | 0);
                    }
                }
            }
        }
        else {
            if ((((h_m_c25_state.level) > (0)) ? 1 : 0)) {
                h_m_c25_state.counter = ((((h_m_c25_state.counter) - (((((((h_m_c25_state.level) - (0))) / (((47000) * (0.0000068))))) | 0)))) | 0);
                if ((((h_m_c25_state.counter) <= (0)) ? 1 : 0)) {
                    let n = ((__add_update_c25(runtime, runtime.divide((-h_m_c25_state.counter), samplerate), 1)) | 0);
                    h_m_c25_state.counter = ((((h_m_c25_state.counter) + (((n) * (samplerate))))) | 0);
                    if (((Number((h_m_c25_state.level = ((((h_m_c25_state.level) - (n))) | 0))) < Number(0)) ? 1 : 0)) {
                        h_m_c25_state.level = ((0) | 0);
                    }
                }
            }
        }
        return ((h_m_c25_state.level) | 0);
    }
    function __add_update_c25(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_noise(runtime, samplerate) {
        const members = runtime.members;
        let __t0;
        const h_m_noise_state = members.m_noise_state ?? 0;
        let vc24 = ((method_update_c24(runtime, samplerate)) | 0);
        let vc25 = ((method_update_c25(runtime, samplerate)) | 0);
        let sum = ((0) | 0);
        let level = ((0) | 0);
        let frequency = ((0) | 0);
        if ((((vc24) < (vc25)) ? 1 : 0)) {
            level = ((((vc24) + (runtime.divide(((vc25) - (vc24)), 2)))) | 0);
        }
        else {
            level = ((((vc25) + (runtime.divide(((vc24) - (vc25)), 2)))) | 0);
        }
        frequency = ((__add_noise(runtime, 588, runtime.divide(((6325) * (level)), 32768))) | 0);
        h_m_noise_state.counter = ((((h_m_noise_state.counter) - (frequency))) | 0);
        if ((((h_m_noise_state.counter) <= (0)) ? 1 : 0)) {
            let n = ((__add_noise(runtime, runtime.divide((-h_m_noise_state.counter), samplerate), 1)) | 0);
            h_m_noise_state.counter = ((((h_m_noise_state.counter) + (((n) * (samplerate))))) | 0);
            h_m_noise_state.polyoffs = ((((((h_m_noise_state.polyoffs) + (n))) & (262143))) | 0);
            h_m_noise_state.polybit = ((((runtime.shiftRight((__t0 = (members.m_poly18 ?? 0), ArrayBuffer.isView(__t0) ? (__t0[runtime.shiftRight(h_m_noise_state.polyoffs, 5)] ?? 0) : runtime.readIndex(__t0, runtime.shiftRight(h_m_noise_state.polyoffs, 5))), ((h_m_noise_state.polyoffs) & (31)))) & (1))) | 0);
        }
        if (((h_m_noise_state.polybit) ? 0 : 1)) {
            sum = ((((sum) + (vc24))) | 0);
        }
        h_m_noise_state.lowpass_counter = ((((h_m_noise_state.lowpass_counter) - (400))) | 0);
        if ((((h_m_noise_state.lowpass_counter) <= (0)) ? 1 : 0)) {
            h_m_noise_state.lowpass_counter = ((((h_m_noise_state.lowpass_counter) + (samplerate))) | 0);
            h_m_noise_state.lowpass_polybit = ((h_m_noise_state.polybit) | 0);
        }
        if (((h_m_noise_state.lowpass_polybit) ? 0 : 1)) {
            sum = ((((sum) + (vc25))) | 0);
        }
        return ((sum) | 0);
    }
    function __add_noise(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_control_a_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"];
        let __t0;
        data = ((data) & 0xff);
        (__L0 ? __L0(1073741856, ((data) & (15))) : ((members.m_discrete)?.write?.(1073741856, ((data) & (15))) ?? 0));
        (__L0 ? __L0(1073741864, runtime.shiftRight(((data) & (48)), 4)) : ((members.m_discrete)?.write?.(1073741864, runtime.shiftRight(((data) & (48)), 4)) ?? 0));
        (__t0 = __deref_control_a_w(runtime, members.m_channel), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_channel, "update"));
        members.m_sound_latch_a = ((data) & 0xff);
    }
    function __deref_control_a_w(runtime, p) {
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
    function method_control_b_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_discrete.write"], __L1 = __l["m_tms.mm6221aa_tune_w"];
        data = ((data) & 0xff);
        (__L0 ? __L0(1073741832, ((data) & (15))) : ((members.m_discrete)?.write?.(1073741832, ((data) & (15))) ?? 0));
        (__L0 ? __L0(1073741848, ((data) & (32))) : ((members.m_discrete)?.write?.(1073741848, ((data) & (32))) ?? 0));
        (__L0 ? __L0(1073741840, ((data) & (16))) : ((members.m_discrete)?.write?.(1073741840, ((data) & (16))) ?? 0));
        (__L1 ? __L1(((data) >>> (6))) : ((members.m_tms)?.mm6221aa_tune_w?.(((data) >>> (6))) ?? 0));
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        let __t0, __t1;
        let samplerate = (((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate"))) | 0);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            let sum = ((0) | 0);
            sum = ((runtime.divide(method_noise(runtime, samplerate), 2)) | 0);
            (__deref_sound_stream_update(runtime, stream).put_int_clamp?.(0, sampindex, sum, 32768) ?? 0);
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
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "update_c24": method_update_c24,
        "update_c25": method_update_c25,
        "noise": method_noise,
        "control_a_w": method_control_a_w,
        "control_b_w": method_control_b_w,
        "sound_stream_update": method_sound_stream_update
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "STRUCT_OF", "m_discrete.write", "m_tms.mm6221aa_tune_w", "machine", "machine().sample_rate", "save_item", "stream_alloc"];
definition.compiledStructMethods = {
    "output_buffer": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            members.source = 0;
            members.ptr = 0;
        }
        function method___construct_1(runtime, that) {
            const members = runtime.members;
            members.node_buf = that.node_buf;
            members.source = that.source;
            members.ptr = (__deref___construct_1(runtime, that.ptr).load?.(0) ?? 0);
            members.node_num = ((that.node_num) | 0);
        }
        function __deref___construct_1(runtime, p) {
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
        function method_sound_stream_update(runtime, stream) {
            const members = runtime.members;
            let __t0, __t1;
            let samplerate = (((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate"))) | 0);
            for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                let sum = ((0) | 0);
                sum = ((runtime.divide(runtime.invoke("noise", samplerate), 2)) | 0);
                (__deref_sound_stream_update(runtime, stream).put_int_clamp?.(0, sampindex, sum, 32768) ?? 0);
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "__construct_1": method___construct_1,
            "sound_stream_update": method_sound_stream_update
        };
        return __methodTable;
    })(),
    "double_stack": (() => {
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
        function method___construct(runtime) {
            const members = runtime.members;
            const h_stk = members.stk ?? 0;
            members.p = __addr___construct(runtime, h_stk, 0);
        }
        function __addr___construct(runtime, v, i) {
            if (Array.isArray(v) || ArrayBuffer.isView(v))
                return { generatedPointer: true, source: v, offset: i };
            return runtime.addressOf(v, i);
        }
        function method_push(runtime, v) {
            const members = runtime.members;
            let __t0;
            runtime.pointerStore((__t0 = (members.p ?? 0), members.p = __add_push(runtime, members.p, 1), __t0), v);
        }
        function __add_push(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_pop(runtime) {
            const members = runtime.members;
            members.p = runtime.subtract(members.p, 1);
            return __deref_pop(runtime, (members.p ?? 0));
        }
        function __deref_pop(runtime, p) {
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
        function method_sound_stream_update(runtime, stream) {
            const members = runtime.members;
            let __t0, __t1;
            let samplerate = (((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.sample_rate === 'function' ? __t0.sample_rate() : typeof __t0.sample_rate === 'number' || typeof __t0.sample_rate === 'boolean' ? __t0.sample_rate : runtime.container(stream, "sample_rate"))) | 0);
            for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t1 = __deref_sound_stream_update(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
                let sum = ((0) | 0);
                sum = ((runtime.divide(runtime.invoke("noise", samplerate), 2)) | 0);
                (__deref_sound_stream_update(runtime, stream).put_int_clamp?.(0, sampindex, sum, 32768) ?? 0);
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "push": method_push,
            "pop": method_pop,
            "sound_stream_update": method_sound_stream_update
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
