import deviceData from './sn76489.device.ir.json' with { type: 'json' };
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
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        let __t0;
        const h_m_register = members.m_register ?? 0;
        const h_m_output = members.m_output ?? 0;
        const h_m_count = members.m_count ?? 0;
        const h_m_period = members.m_period ?? 0;
        const h_m_vol_table = members.m_vol_table ?? 0;
        const h_m_volume = members.m_volume ?? 0;
        if ((((members.__static_device_start_MAX_OUTPUT__initialised ?? 0)) ? 0 : 1)) {
            members.__static_device_start_MAX_OUTPUT = 32767;
            members.__static_device_start_MAX_OUTPUT__initialised = 1;
        }
        let sample_rate = ((runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 2)) | 0);
        members.m_sound = (__L1 ? __L1(0, 1, sample_rate) : runtime.macro("stream_alloc", 0, 1, sample_rate));
        members.m_last_register = ((0) | 0);
        for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (2))) | 0)) {
            h_m_register[i] = 0;
            h_m_register[((i) + (1))] = 0;
        }
        for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_output[i] = 0;
            h_m_count[i] = 0;
            h_m_period[i] = (((((0) || ((((i) === (3)) ? 1 : 0))) ? 1 : 0)) ? (0) : (1024));
        }
        members.m_RNG = ((16384) >>> 0);
        h_m_output[3] = (((members.m_RNG ?? 0)) & (1));
        members.m_stereo_mask = ((255) | 0);
        members.m_current_clock = ((7) | 0);
        let gain = ((0) | 0);
        gain = ((((gain) & (255))) | 0);
        let out = runtime.divide((members.__static_device_start_MAX_OUTPUT ?? 0), 4);
        while (((Number((__t0 = gain, gain = ((((gain) - (1))) | 0), __t0)) > Number(0)) ? 1 : 0)) {
            out = ((out) * (1.023292992));
        }
        for (let i = ((0) | 0); (((i) < (15)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((Number(out) > Number(runtime.divide((members.__static_device_start_MAX_OUTPUT ?? 0), 4))) ? 1 : 0)) {
                h_m_vol_table[i] = runtime.divide((members.__static_device_start_MAX_OUTPUT ?? 0), 4);
            }
            else {
                h_m_vol_table[i] = out;
            }
            out = ((out) / (1.258925412));
        }
        h_m_vol_table[15] = 0;
        for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_volume[i] = h_m_vol_table[h_m_register[__add_device_start(runtime, ((i) * (2)), 1)]];
        }
        members.m_ready_state = ((-1) | 0);
        (__deref_device_start(runtime, members.m_ready_timer).adjust?.(0) ?? 0);
        (__L3 ? __L3((__L2 ? __L2((members.m_ready_state ?? 0)) : runtime.macro("NAME", (members.m_ready_state ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_ready_state ?? 0)) : runtime.macro("NAME", (members.m_ready_state ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2(h_m_register) : runtime.macro("NAME", h_m_register))) : runtime.macro("save_item", (__L2 ? __L2(h_m_register) : runtime.macro("NAME", h_m_register))));
        (__L3 ? __L3((__L2 ? __L2((members.m_last_register ?? 0)) : runtime.macro("NAME", (members.m_last_register ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_last_register ?? 0)) : runtime.macro("NAME", (members.m_last_register ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2(h_m_volume) : runtime.macro("NAME", h_m_volume))) : runtime.macro("save_item", (__L2 ? __L2(h_m_volume) : runtime.macro("NAME", h_m_volume))));
        (__L3 ? __L3((__L2 ? __L2((members.m_RNG ?? 0)) : runtime.macro("NAME", (members.m_RNG ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_RNG ?? 0)) : runtime.macro("NAME", (members.m_RNG ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_current_clock ?? 0)) : runtime.macro("NAME", (members.m_current_clock ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_current_clock ?? 0)) : runtime.macro("NAME", (members.m_current_clock ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2((members.m_stereo_mask ?? 0)) : runtime.macro("NAME", (members.m_stereo_mask ?? 0)))) : runtime.macro("save_item", (__L2 ? __L2((members.m_stereo_mask ?? 0)) : runtime.macro("NAME", (members.m_stereo_mask ?? 0)))));
        (__L3 ? __L3((__L2 ? __L2(h_m_period) : runtime.macro("NAME", h_m_period))) : runtime.macro("save_item", (__L2 ? __L2(h_m_period) : runtime.macro("NAME", h_m_period))));
        (__L3 ? __L3((__L2 ? __L2(h_m_count) : runtime.macro("NAME", h_m_count))) : runtime.macro("save_item", (__L2 ? __L2(h_m_count) : runtime.macro("NAME", h_m_count))));
        (__L3 ? __L3((__L2 ? __L2(h_m_output) : runtime.macro("NAME", h_m_output))) : runtime.macro("save_item", (__L2 ? __L2(h_m_output) : runtime.macro("NAME", h_m_output))));
    }
    function __add_device_start(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_device_start(runtime, p) {
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
        const __L0 = __l["clock"];
        (__deref_device_clock_changed(runtime, members.m_sound).set_sample_rate?.(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 2)) ?? 0);
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
    function method_stereo_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["fatalerror"];
        let __t0;
        data = ((data) & 0xff);
        (__t0 = __deref_stereo_w(runtime, members.m_sound), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_sound, "update"));
        if (0) {
            members.m_stereo_mask = ((data) | 0);
        }
        else {
            (__L0 ? __L0("sn76496_base_device: Call to stereo write with mono chip!\n") : runtime.macro("fatalerror", "sn76496_base_device: Call to stereo write with mono chip!\n"));
        }
    }
    function __deref_stereo_w(runtime, p) {
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
    function method_set_ready_state(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_ready_handler"];
        let __t0;
        if ((((state) !== ((members.m_ready_state ?? 0))) ? 1 : 0)) {
            members.m_ready_state = ((state) | 0);
            if ((((__t0 = __deref_set_ready_state(runtime, members.m_ready_handler), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_ready_handler, "isunset"))) ? 0 : 1)) {
                (__L0 ? __L0(Number(((state) ? (1) : (0)))) : typeof members.m_ready_handler === 'function' ? members.m_ready_handler(((state) ? (1) : (0))) : runtime.invoke("m_ready_handler", ((state) ? (1) : (0))));
            }
        }
    }
    function __deref_set_ready_state(runtime, p) {
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
    function method_write(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_hz"];
        let __t0;
        data = ((data) & 0xff);
        const h_m_register = members.m_register ?? 0;
        const h_m_period = members.m_period ?? 0;
        const h_m_vol_table = members.m_vol_table ?? 0;
        const h_m_volume = members.m_volume ?? 0;
        (__t0 = __deref_write(runtime, members.m_sound), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_sound, "update"));
        let r = ((0) | 0);
        if (((data) & (128))) {
            r = ((runtime.shiftRight(((data) & (112)), 4)) | 0);
            members.m_last_register = ((r) | 0);
            if (((((((0) && ((((r) === (6)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (4))) !== Number(((h_m_register[6]) & (4)))) ? 1 : 0))) ? 1 : 0)) {
                members.m_RNG = ((16384) >>> 0);
            }
            h_m_register[r] = ((((h_m_register[r]) & (1008))) | (((data) & (15))));
        }
        else {
            r = (((members.m_last_register ?? 0)) | 0);
        }
        let c = ((runtime.shiftRight(r, 1)) | 0);
        switch (r) {
            case 0:
            case 2:
            case 4:
                {
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        h_m_register[r] = ((((h_m_register[r]) & (15))) | (((((data) & (63))) << (4))));
                    }
                    if (((((((h_m_register[r]) !== (0)) ? 1 : 0)) || (0)) ? 1 : 0)) {
                        h_m_period[c] = h_m_register[r];
                    }
                    else {
                        h_m_period[c] = 1024;
                    }
                    if ((((r) === (4)) ? 1 : 0)) {
                        if (((Number(((h_m_register[6]) & (3))) === Number(3)) ? 1 : 0)) {
                            h_m_period[3] = ((h_m_period[2]) << (1));
                        }
                    }
                    break;
                }
            case 1:
            case 3:
            case 5:
            case 7:
                {
                    h_m_volume[c] = h_m_vol_table[((data) & (15))];
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        h_m_register[r] = ((((h_m_register[r]) & (1008))) | (((data) & (15))));
                    }
                    break;
                }
            case 6:
                {
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        0;
                    }
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        h_m_register[r] = ((((h_m_register[r]) & (1008))) | (((data) & (15))));
                    }
                    let n = ((h_m_register[6]) | 0);
                    h_m_period[3] = ((((Number(((n) & (3))) === Number(3)) ? 1 : 0)) ? (((h_m_period[2]) << (1))) : (((1) << (__add_write(runtime, 5, ((n) & (3)))))));
                    if (1) {
                        members.m_RNG = ((16384) >>> 0);
                    }
                    break;
                }
        }
        method_set_ready_state(runtime, 0);
        (__deref_write(runtime, members.m_ready_timer).adjust?.((__L1 ? __L1(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 32)) : runtime.macro("attotime::from_hz", runtime.divide((__L0 ? __L0() : runtime.macro("clock")), 32)))) ?? 0);
    }
    function __add_write(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_write(runtime, p) {
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
        let __t0;
        const h_m_count = members.m_count ?? 0;
        const h_m_output = members.m_output ?? 0;
        const h_m_period = members.m_period ?? 0;
        const h_m_register = members.m_register ?? 0;
        const h_m_volume = members.m_volume ?? 0;
        let out = ((0) << 16 >> 16);
        let out2 = ((0) << 16 >> 16);
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            if (((((members.m_current_clock ?? 0)) > (0)) ? 1 : 0)) {
                members.m_current_clock = ((((members.m_current_clock) - (1))) | 0);
            }
            else {
                members.m_current_clock = ((7) | 0);
                for (let i = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    h_m_count[i] = ((h_m_count[i]) - (1));
                    if ((((h_m_count[i]) <= (0)) ? 1 : 0)) {
                        h_m_output[i] = ((h_m_output[i]) ^ (1));
                        h_m_count[i] = h_m_period[i];
                    }
                }
                h_m_count[3] = ((h_m_count[3]) - (1));
                if ((((h_m_count[3]) <= (0)) ? 1 : 0)) {
                    if (((Number(((Number((((members.m_RNG ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) !== Number((((((Number((((members.m_RNG ?? 0)) & (2))) !== Number(0)) ? 1 : 0)) && ((((h_m_register[6]) >>> (2)) & 1))) ? 1 : 0))) ? 1 : 0)) {
                        members.m_RNG = ((((members.m_RNG) >>> (1))) >>> 0);
                        members.m_RNG = ((((members.m_RNG) | (16384))) >>> 0);
                    }
                    else {
                        members.m_RNG = ((((members.m_RNG) >>> (1))) >>> 0);
                    }
                    h_m_output[3] = (((members.m_RNG ?? 0)) & (1));
                    h_m_count[3] = h_m_period[3];
                }
            }
            if (0) {
                out = ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, (((((((Number((((members.m_stereo_mask ?? 0)) & (16))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[0]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[0]) : (0)), (((((((Number((((members.m_stereo_mask ?? 0)) & (32))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[1]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[1]) : (0))), (((((((Number((((members.m_stereo_mask ?? 0)) & (64))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[2]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[2]) : (0))), (((((((Number((((members.m_stereo_mask ?? 0)) & (128))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[3]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[3]) : (0)))) << 16 >> 16);
                out2 = ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, (((((((Number((((members.m_stereo_mask ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[0]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[0]) : (0)), (((((((Number((((members.m_stereo_mask ?? 0)) & (2))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[1]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[1]) : (0))), (((((((Number((((members.m_stereo_mask ?? 0)) & (4))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[2]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[2]) : (0))), (((((((Number((((members.m_stereo_mask ?? 0)) & (8))) !== Number(0)) ? 1 : 0)) && ((((h_m_output[3]) !== (0)) ? 1 : 0))) ? 1 : 0)) ? (h_m_volume[3]) : (0)))) << 16 >> 16);
            }
            else {
                out = ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, (((((h_m_output[0]) !== (0)) ? 1 : 0)) ? (h_m_volume[0]) : (0)), (((((h_m_output[1]) !== (0)) ? 1 : 0)) ? (h_m_volume[1]) : (0))), (((((h_m_output[2]) !== (0)) ? 1 : 0)) ? (h_m_volume[2]) : (0))), (((((h_m_output[3]) !== (0)) ? 1 : 0)) ? (h_m_volume[3]) : (0)))) << 16 >> 16);
            }
            if (1) {
                out = (((-out)) << 16 >> 16);
                out2 = (((-out2)) << 16 >> 16);
            }
            (__deref_sound_stream_update(runtime, stream).put_int?.(0, sampindex, out, 32768) ?? 0);
            if (0) {
                (__deref_sound_stream_update(runtime, stream).put_int?.(1, sampindex, out2, 32768) ?? 0);
            }
        }
    }
    function __add_sound_stream_update(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_ready_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ready_cb(runtime, members.m_ready_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_ready_handler, "bind"));
    }
    function __deref_ready_cb(runtime, p) {
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
    function method_ready_r(runtime) {
        const members = runtime.members;
        return (((((members.m_ready_state ?? 0)) ? (1) : (0))) | 0);
    }
    function method_sn76496_base_device__ready_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_sn76496_base_device__ready_cb(runtime, members.m_ready_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_ready_handler, "bind"));
    }
    function __deref_sn76496_base_device__ready_cb(runtime, p) {
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
    function method_sn76496_base_device__ready_r(runtime) {
        const members = runtime.members;
        return (((((members.m_ready_state ?? 0)) ? (1) : (0))) | 0);
    }
    function method_delayed_ready(runtime, param) {
        const members = runtime.members;
        method_set_ready_state(runtime, 1);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "device_clock_changed": method_device_clock_changed,
        "stereo_w": method_stereo_w,
        "set_ready_state": method_set_ready_state,
        "write": method_write,
        "sound_stream_update": method_sound_stream_update,
        "ready_cb": method_ready_cb,
        "ready_r": method_ready_r,
        "sn76496_base_device::ready_cb": method_sn76496_base_device__ready_cb,
        "sn76496_base_device::ready_r": method_sn76496_base_device__ready_r,
        "delayed_ready": method_delayed_ready
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "attotime::from_hz", "clock", "fatalerror", "m_ready_handler", "save_item", "stream_alloc"];
export const device = definition;
export default device;
