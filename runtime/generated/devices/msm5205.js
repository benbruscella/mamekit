import deviceData from './msm5205.device.ir.json' with { type: 'json' };
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
    const __mame_table_0 = [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, -1, 0, 0, 0, -1, 0, 0, 1, -1, 0, 1, 0, -1, 0, 1, 1, -1, 1, 0, 0, -1, 1, 0, 1, -1, 1, 1, 0, -1, 1, 1, 1];
    const __mame_table_1 = [-1, -1, -1, -1, 2, 4, 6, 8];
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        method_compute_tables(runtime);
        members.m_stream = (__L1 ? __L1(0, 1, (__L0 ? __L0() : runtime.macro("clock"))) : runtime.macro("stream_alloc", 0, 1, (__L0 ? __L0() : runtime.macro("clock"))));
        (__L3 ? __L3((__L2 ? __L2((members.m_data ?? 0)) : runtime.macro("NAME", (members.m_data ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_data ?? 0)) : runtime.macro("NAME", (members.m_data ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_vck ?? 0)) : runtime.macro("NAME", (members.m_vck ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_vck ?? 0)) : runtime.macro("NAME", (members.m_vck ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_reset ?? 0)) : runtime.macro("NAME", (members.m_reset ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_reset ?? 0)) : runtime.macro("NAME", (members.m_reset ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_s1 ?? 0)) : runtime.macro("NAME", (members.m_s1 ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_s1 ?? 0)) : runtime.macro("NAME", (members.m_s1 ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_s2 ?? 0)) : runtime.macro("NAME", (members.m_s2 ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_s2 ?? 0)) : runtime.macro("NAME", (members.m_s2 ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_bitwidth ?? 0)) : runtime.macro("NAME", (members.m_bitwidth ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_bitwidth ?? 0)) : runtime.macro("NAME", (members.m_bitwidth ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_signal ?? 0)) : runtime.macro("NAME", (members.m_signal ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_signal ?? 0)) : runtime.macro("NAME", (members.m_signal ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_step ?? 0)) : runtime.macro("NAME", (members.m_step ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_step ?? 0)) : runtime.macro("NAME", (members.m_step ?? 0)))));
    }
    function method_compute_tables(runtime) {
        const members = runtime.members;
        const h_m_diff_lookup = members.m_diff_lookup ?? 0;
        for (let step = ((0) | 0); (((step) <= (48)) ? 1 : 0); step = ((((step) + (1))) | 0)) {
            let stepval = ((Math.floor(Number(((16) * (Math.pow(Number(((11) / (10))), Number(step))))))) | 0);
            for (let nib = ((0) | 0); (((nib) < (16)) ? 1 : 0); nib = ((((nib) + (1))) | 0)) {
                h_m_diff_lookup[((((step) * (16))) + (nib))] = (((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 0)) % 64) + 64) % 64] ?? 0)) * (__add_compute_tables(runtime, __add_compute_tables(runtime, __add_compute_tables(runtime, ((stepval) * ((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 1)) % 64) + 64) % 64] ?? 0))), ((runtime.divide(stepval, 2)) * ((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 2)) % 64) + 64) % 64] ?? 0)))), ((runtime.divide(stepval, 4)) * ((__mame_table_0[(((__add_compute_tables(runtime, ((nib) * (4)), 3)) % 64) + 64) % 64] ?? 0)))), runtime.divide(stepval, 8))));
            }
        }
    }
    function __add_compute_tables(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        members.m_data = ((0) & 0xff);
        members.m_vck = ((0) ? 1 : 0);
        members.m_reset = ((0) ? 1 : 0);
        members.m_signal = ((0) | 0);
        members.m_step = ((0) | 0);
    }
    function method_vclk_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_ticks"];
        if (((Number(method_get_prescaler(runtime)) !== Number(0)) ? 1 : 0)) {
            0;
        }
        else {
            if (((((members.m_vck ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
                (__deref_vclk_w(runtime, members.m_capture_timer).adjust?.((__L1 ? __L1(6, (__L0 ? __L0() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", 6, (__L0 ? __L0() : runtime.macro("clock"))))) ?? 0);
            }
            members.m_vck = ((state) ? 1 : 0);
        }
    }
    function __deref_vclk_w(runtime, p) {
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
    function method_get_prescaler(runtime) {
        const members = runtime.members;
        if ((members.m_s1 ?? 0)) {
            return (((((members.m_s2 ?? 0)) ? (0) : (48))) | 0);
        }
        else {
            return (((((members.m_s2 ?? 0)) ? (64) : (96))) | 0);
        }
    }
    function method_reset_w(runtime, state) {
        const members = runtime.members;
        members.m_reset = ((state) ? 1 : 0);
    }
    function method_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((((members.m_bitwidth ?? 0)) === (4)) ? 1 : 0)) {
            members.m_data = ((((data) & (15))) & 0xff);
        }
        else {
            members.m_data = ((((((data) & (7))) << (1))) & 0xff);
        }
    }
    function method_playmode_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["notify_clock_changed"];
        let __t0, __t1;
        data = ((data) & 0xff);
        let s1 = (((((data) >>> (0)) & 1)) ? 1 : 0);
        let s2 = (((((data) >>> (1)) & 1)) ? 1 : 0);
        let bitwidth = (((((((data) >>> (2)) & 1)) ? (4) : (3))) & 0xff);
        if ((((((Number((members.m_s1 ?? 0)) !== Number(s1)) ? 1 : 0)) || (((Number((members.m_s2 ?? 0)) !== Number(s2)) ? 1 : 0))) ? 1 : 0)) {
            (__t0 = __deref_playmode_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
            members.m_s1 = ((s1) ? 1 : 0);
            members.m_s2 = ((s2) ? 1 : 0);
            (__L0 ? __L0() : runtime.macro("notify_clock_changed"));
        }
        if (((((members.m_bitwidth ?? 0)) !== (bitwidth)) ? 1 : 0)) {
            (__t1 = __deref_playmode_w(runtime, members.m_stream), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_stream, "update"));
            members.m_bitwidth = ((bitwidth) & 0xff);
        }
    }
    function __deref_playmode_w(runtime, p) {
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
    function method_s1_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["notify_clock_changed"];
        let __t0;
        if (((Number((members.m_s1 ?? 0)) !== Number(((state) ? 1 : 0))) ? 1 : 0)) {
            (__t0 = __deref_s1_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
            members.m_s1 = ((state) ? 1 : 0);
            (__L0 ? __L0() : runtime.macro("notify_clock_changed"));
        }
    }
    function __deref_s1_w(runtime, p) {
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
    function method_s2_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["notify_clock_changed"];
        let __t0;
        if (((Number((members.m_s2 ?? 0)) !== Number(((state) ? 1 : 0))) ? 1 : 0)) {
            (__t0 = __deref_s2_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
            members.m_s2 = ((state) ? 1 : 0);
            (__L0 ? __L0() : runtime.macro("notify_clock_changed"));
        }
    }
    function __deref_s2_w(runtime, p) {
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
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["clocks_to_attotime"];
        (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0);
        let prescaler = ((method_get_prescaler(runtime)) | 0);
        if ((((prescaler) !== (0)) ? 1 : 0)) {
            0;
            let half_period = (__L1 ? __L1(runtime.divide(prescaler, 2)) : runtime.macro("clocks_to_attotime", runtime.divide(prescaler, 2)));
            (__deref_device_clock_changed(runtime, members.m_vck_timer).adjust?.(half_period, 0, half_period) ?? 0);
        }
        else {
            0;
            (__deref_device_clock_changed(runtime, members.m_vck_timer).adjust?.(Infinity) ?? 0);
        }
    }
    function __deref_device_clock_changed(runtime, p) {
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
        const h_m_dac_bits = members.m_dac_bits ?? 0;
        if ((members.m_signal ?? 0)) {
            let sample_scale = ((1) / (4096));
            let dac_mask = (((((((h_m_dac_bits) >= (12)) ? 1 : 0)) ? (0) : (((((1) << (((12) - (h_m_dac_bits))))) - (1))))) | 0);
            let val = (((((members.m_signal ?? 0)) & ((~dac_mask)))) * (sample_scale));
            (__deref_sound_stream_update(runtime, stream).fill?.(0, val) ?? 0);
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
    function method_msm5205_device__sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_dac_bits = members.m_dac_bits ?? 0;
        if ((members.m_signal ?? 0)) {
            let sample_scale = ((1) / (4096));
            let dac_mask = (((((((h_m_dac_bits) >= (12)) ? 1 : 0)) ? (0) : (((((1) << (((12) - (h_m_dac_bits))))) - (1))))) | 0);
            let val = (((((members.m_signal ?? 0)) & ((~dac_mask)))) * (sample_scale));
            (__deref_msm5205_device__sound_stream_update(runtime, stream).fill?.(0, val) ?? 0);
        }
    }
    function __deref_msm5205_device__sound_stream_update(runtime, p) {
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
    function method_toggle_vck(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_vck_cb"], __L1 = __l["clock"], __L2 = __l["attotime::from_ticks"];
        members.m_vck = (((((members.m_vck ?? 0)) ? 0 : 1)) ? 1 : 0);
        (__L0 ? __L0(Number((members.m_vck ?? 0))) : typeof members.m_vck_cb === 'function' ? members.m_vck_cb((members.m_vck ?? 0)) : runtime.invoke("m_vck_cb", (members.m_vck ?? 0)));
        if ((((members.m_vck ?? 0)) ? 0 : 1)) {
            (__deref_toggle_vck(runtime, members.m_capture_timer).adjust?.((__L2 ? __L2(method_adpcm_capture_divisor(runtime), (__L1 ? __L1() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", method_adpcm_capture_divisor(runtime), (__L1 ? __L1() : runtime.macro("clock"))))) ?? 0);
        }
    }
    function __deref_toggle_vck(runtime, p) {
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
    function method_adpcm_capture_divisor(runtime) {
        const members = runtime.members;
        return ((6) | 0);
    }
    function method_update_adpcm(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_vck_legacy_cb"];
        let __t0, __t1;
        const h_m_diff_lookup = members.m_diff_lookup ?? 0;
        let new_signal = ((0) | 0);
        if ((((__t0 = __deref_update_adpcm(runtime, members.m_vck_legacy_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_vck_legacy_cb, "isunset"))) ? 0 : 1)) {
            (__L0 ? __L0(Number(1)) : typeof members.m_vck_legacy_cb === 'function' ? members.m_vck_legacy_cb(1) : runtime.invoke("m_vck_legacy_cb", 1));
        }
        if ((members.m_reset ?? 0)) {
            new_signal = ((0) | 0);
            members.m_step = ((0) | 0);
        }
        else {
            let val = (((members.m_data ?? 0)) | 0);
            new_signal = (((((members.m_signal ?? 0)) + (h_m_diff_lookup[__add_update_adpcm(runtime, (((members.m_step ?? 0)) * (16)), ((val) & (15)))]))) | 0);
            if ((((new_signal) > (2047)) ? 1 : 0)) {
                new_signal = ((2047) | 0);
            }
            else {
                if (((Number(new_signal) < Number(-2048)) ? 1 : 0)) {
                    new_signal = ((-2048) | 0);
                }
            }
            members.m_step = ((((members.m_step) + ((__mame_table_1[(((((val) & (7))) % 8) + 8) % 8] ?? 0)))) | 0);
            if (((((members.m_step ?? 0)) > (48)) ? 1 : 0)) {
                members.m_step = ((48) | 0);
            }
            else {
                if (((((members.m_step ?? 0)) < (0)) ? 1 : 0)) {
                    members.m_step = ((0) | 0);
                }
            }
        }
        if (((((members.m_signal ?? 0)) !== (new_signal)) ? 1 : 0)) {
            (__t1 = __deref_update_adpcm(runtime, members.m_stream), typeof __t1.update === 'function' ? __t1.update() : typeof __t1.update === 'number' || typeof __t1.update === 'boolean' ? __t1.update : runtime.container(members.m_stream, "update"));
            members.m_signal = ((new_signal) | 0);
        }
    }
    function __add_update_adpcm(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_update_adpcm(runtime, p) {
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
    function method_set_prescaler_selector(runtime, select) {
        const members = runtime.members;
        members.m_s1 = (((((select) >>> (0)) & 1)) ? 1 : 0);
        members.m_s2 = (((((select) >>> (1)) & 1)) ? 1 : 0);
        members.m_bitwidth = (((((((select) >>> (2)) & 1)) ? (4) : (3))) & 0xff);
    }
    function method_vck_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vck_callback(runtime, members.m_vck_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vck_cb, "bind"));
    }
    function __deref_vck_callback(runtime, p) {
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
    function method_vck_legacy_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_vck_legacy_callback(runtime, members.m_vck_legacy_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vck_legacy_cb, "bind"));
    }
    function __deref_vck_legacy_callback(runtime, p) {
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
    function method_msm5205_device__set_prescaler_selector(runtime, select) {
        const members = runtime.members;
        members.m_s1 = (((((select) >>> (0)) & 1)) ? 1 : 0);
        members.m_s2 = (((((select) >>> (1)) & 1)) ? 1 : 0);
        members.m_bitwidth = (((((((select) >>> (2)) & 1)) ? (4) : (3))) & 0xff);
    }
    function method_msm5205_device__vck_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_msm5205_device__vck_callback(runtime, members.m_vck_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vck_cb, "bind"));
    }
    function __deref_msm5205_device__vck_callback(runtime, p) {
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
    function method_msm5205_device__vck_legacy_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_msm5205_device__vck_legacy_callback(runtime, members.m_vck_legacy_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_vck_legacy_cb, "bind"));
    }
    function __deref_msm5205_device__vck_legacy_callback(runtime, p) {
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
    function method_msm5205_device__adpcm_capture_divisor(runtime) {
        const members = runtime.members;
        return ((6) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "compute_tables": method_compute_tables,
        "device_reset": method_device_reset,
        "vclk_w": method_vclk_w,
        "get_prescaler": method_get_prescaler,
        "reset_w": method_reset_w,
        "data_w": method_data_w,
        "playmode_w": method_playmode_w,
        "s1_w": method_s1_w,
        "s2_w": method_s2_w,
        "device_clock_changed": method_device_clock_changed,
        "sound_stream_update": method_sound_stream_update,
        "msm5205_device::sound_stream_update": method_msm5205_device__sound_stream_update,
        "toggle_vck": method_toggle_vck,
        "adpcm_capture_divisor": method_adpcm_capture_divisor,
        "update_adpcm": method_update_adpcm,
        "set_prescaler_selector": method_set_prescaler_selector,
        "vck_callback": method_vck_callback,
        "vck_legacy_callback": method_vck_legacy_callback,
        "msm5205_device::set_prescaler_selector": method_msm5205_device__set_prescaler_selector,
        "msm5205_device::vck_callback": method_msm5205_device__vck_callback,
        "msm5205_device::vck_legacy_callback": method_msm5205_device__vck_legacy_callback,
        "msm5205_device::adpcm_capture_divisor": method_msm5205_device__adpcm_capture_divisor
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "attotime::from_ticks", "clock", "clocks_to_attotime", "m_vck_cb", "m_vck_legacy_cb", "notify_clock_changed", "save_item", "stream_alloc"];
export const device = definition;
export default device;
