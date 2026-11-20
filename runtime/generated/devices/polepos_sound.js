import deviceData from './polepos_sound.device.ir.json' with { type: 'json' };
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
    function method_RES_K(runtime, res) {
        const members = runtime.members;
        return ((res) * (1000));
    }
    function method_CAP_U(runtime, cap) {
        const members = runtime.members;
        return ((cap) * (0.000001));
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_filter_engine = members.m_filter_engine ?? 0;
        for (let loop = ((0) | 0); (((loop) < (3)) ? 1 : 0); loop = ((((loop) + (1))) | 0)) {
            (__t0 = __deref_device_reset(runtime, h_m_filter_engine[loop]), typeof __t0.reset === 'function' ? (__t0.reset() ?? 0) : runtime.container(h_m_filter_engine[loop], "reset"));
        }
    }
    function __deref_device_reset(runtime, p) {
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["unscaled_clock"];
        let __t0, __t1;
        const h_m_filter_engine = members.m_filter_engine ?? 0;
        if ((((members.m_sample_enable ?? 0)) ? 0 : 1)) {
            return;
        }
        let clock = ((runtime.divide(((runtime.divide((__L0 ? __L0() : runtime.macro("unscaled_clock")), 16)) * (__add_sound_stream_update(runtime, (((((((members.m_sample_msb ?? 0)) + (1))) * (64))) + ((members.m_sample_lsb ?? 0))), 1))), 4096)) >>> 0);
        let step = ((runtime.divide(((clock) << (12)), 24000)) >>> 0);
        let slot = (((((members.m_sample_msb ?? 0)) >>> (3))) & (7));
        let volume = ([((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250))))), ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250))))), ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), 1000), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250))))), 2200), ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250))))), 2200), 1000), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, 4700, ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, 4700, ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), 1000), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, 4700, 2200), ((1) / (__add_sound_stream_update(runtime, ((1) / (1000)), ((1) / (250)))))), 2200)) / (10000)), ((__add_sound_stream_update(runtime, __add_sound_stream_update(runtime, __add_sound_stream_update(runtime, 4700, 2200), 1000), 2200)) / (10000))][((slot) & 7)] ?? 0);
        let base = __addr_sound_stream_update(runtime, (members.m_data ?? 0), ((slot) * (2048)));
        let base$s = undefined, base$o = 0;
        if (ArrayBuffer.isView(base) || Array.isArray(base))
            base$s = base;
        else if (base !== null && typeof base === 'object' && base.generatedPointer === true && base.path === undefined && base.target === undefined && (ArrayBuffer.isView(base.source) || Array.isArray(base.source))) {
            base$s = base.source;
            base$o = base.offset;
        }
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((__t0 = __deref_sound_stream_update(runtime, stream), typeof __t0.samples === 'function' ? __t0.samples() : typeof __t0.samples === 'number' || typeof __t0.samples === 'boolean' ? __t0.samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            h_m_filter_engine[0].x0 = ((((((((3.4) / (255))) * ((base$s !== undefined ? (base$s[base$o + ((((((members.m_current_position ?? 0)) >>> (12))) & (2047)))] ?? 0) : runtime.readIndex(base, (((((members.m_current_position ?? 0)) >>> (12))) & (2047))))))) - (2))) * (volume));
            h_m_filter_engine[1].x0 = h_m_filter_engine[0].x0;
            h_m_filter_engine[2].x0 = h_m_filter_engine[0].x0;
            let i_total = 0;
            for (let loop = ((0) | 0); (((loop) < (3)) ? 1 : 0); loop = ((((loop) + (1))) | 0)) {
                (__t1 = __deref_sound_stream_update(runtime, h_m_filter_engine[loop]), typeof __t1.step === 'function' ? (__t1.step() ?? 0) : runtime.container(h_m_filter_engine[loop], "step"));
                if ((((h_m_filter_engine[loop].y0) > (1.5)) ? 1 : 0)) {
                    h_m_filter_engine[loop].y0 = 1.5;
                }
                if (((Number(h_m_filter_engine[loop].y0) < Number(-2)) ? 1 : 0)) {
                    h_m_filter_engine[loop].y0 = -2;
                }
                i_total = ((i_total) + (((h_m_filter_engine[loop].y0) / (([method_RES_K(runtime, 4.7), method_RES_K(runtime, 7.5), method_RES_K(runtime, 10)][(((loop) % 3) + 3) % 3] ?? 0)))));
            }
            i_total = ((i_total) * (runtime.divide(2241.6534181240063, 2)));
            (__deref_sound_stream_update(runtime, stream).put?.(0, sampindex, i_total) ?? 0);
            members.m_current_position = ((((members.m_current_position) + (step))) >>> 0);
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
    function __addr_sound_stream_update(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_clson_w(runtime, state) {
        const members = runtime.members;
        if (((state) ? 0 : 1)) {
            method_polepos_engine_sound_lsb_w(runtime, 0);
            method_polepos_engine_sound_msb_w(runtime, 0);
        }
    }
    function method_polepos_engine_sound_lsb_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        (__t0 = __deref_polepos_engine_sound_lsb_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_sample_lsb = ((((data) & (62))) & 0xff);
        members.m_sample_enable = ((((data) & (1))) ? 1 : 0);
    }
    function __deref_polepos_engine_sound_lsb_w(runtime, p) {
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
    function method_polepos_engine_sound_msb_w(runtime, data) {
        const members = runtime.members;
        let __t0;
        data = ((data) & 0xff);
        (__t0 = __deref_polepos_engine_sound_msb_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_sample_msb = ((((data) & (63))) & 0xff);
    }
    function __deref_polepos_engine_sound_msb_w(runtime, p) {
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
        "RES_K": method_RES_K,
        "CAP_U": method_CAP_U,
        "device_reset": method_device_reset,
        "sound_stream_update": method_sound_stream_update,
        "clson_w": method_clson_w,
        "polepos_engine_sound_lsb_w": method_polepos_engine_sound_lsb_w,
        "polepos_engine_sound_msb_w": method_polepos_engine_sound_msb_w
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["unscaled_clock"];
definition.compiledStructMethods = {
    "filter2_context": (() => {
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
        function method_setup(runtime, device, type, fc, d, gain) {
            const members = runtime.members;
            let __t0, __t1;
            let sample_rate = (((__t1 = __deref_setup(runtime, (__t0 = __deref_setup(runtime, device), typeof __t0.machine === 'function' ? __t0.machine() : typeof __t0.machine === 'number' || typeof __t0.machine === 'boolean' ? __t0.machine : runtime.container(device, "machine"))), typeof __t1.sample_rate === 'function' ? (__t1.sample_rate() ?? 0) : runtime.container((__t0 = __deref_setup(runtime, device), typeof __t0.machine === 'function' ? __t0.machine() : typeof __t0.machine === 'number' || typeof __t0.machine === 'boolean' ? __t0.machine : runtime.container(device, "machine")), "sample_rate"))) | 0);
            let two_over_T = ((2) * (sample_rate));
            let two_over_T_squared = ((two_over_T) * (two_over_T));
            let w = ((((sample_rate) * (2))) * (Math.tan(Number(runtime.divide(((3.141592653589793) * (fc)), sample_rate)))));
            let w_squared = ((w) * (w));
            let den = ((((two_over_T_squared) + (((((d) * (w))) * (two_over_T))))) + (w_squared));
            members.a1 = ((((2) * ((((-two_over_T_squared)) + (w_squared))))) / (den));
            members.a2 = ((((((two_over_T_squared) - (((((d) * (w))) * (two_over_T))))) + (w_squared))) / (den));
            switch (type) {
                case 0:
                    {
                        members.b0 = (members.b2 = ((w_squared) / (den)));
                        members.b1 = ((2) * ((members.b0 ?? 0)));
                        break;
                    }
                case 2:
                    {
                        members.b0 = ((((((d) * (w))) * (two_over_T))) / (den));
                        members.b1 = 0;
                        members.b2 = (-(members.b0 ?? 0));
                        break;
                    }
                case 1:
                    {
                        members.b0 = (members.b2 = ((two_over_T_squared) / (den)));
                        members.b1 = (((-2)) * ((members.b0 ?? 0)));
                        break;
                    }
                default:
                    {
                        0;
                        break;
                    }
            }
            members.b0 = ((members.b0) * (gain));
            members.b1 = ((members.b1) * (gain));
            members.b2 = ((members.b2) * (gain));
        }
        function __deref_setup(runtime, p) {
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
        function method_reset(runtime) {
            const members = runtime.members;
            members.x0 = 0;
            members.x1 = 0;
            members.x2 = 0;
            members.y0 = 0;
            members.y1 = 0;
            members.y2 = 0;
        }
        function method_step(runtime) {
            const members = runtime.members;
            members.y0 = __add_step(runtime, __add_step(runtime, __add_step(runtime, (((((-(members.a1 ?? 0))) * ((members.y1 ?? 0)))) - ((((members.a2 ?? 0)) * ((members.y2 ?? 0))))), (((members.b0 ?? 0)) * ((members.x0 ?? 0)))), (((members.b1 ?? 0)) * ((members.x1 ?? 0)))), (((members.b2 ?? 0)) * ((members.x2 ?? 0))));
            members.x2 = (members.x1 ?? 0);
            members.x1 = (members.x0 ?? 0);
            members.y2 = (members.y1 ?? 0);
            members.y1 = (members.y0 ?? 0);
        }
        function __add_step(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opamp_m_bandpass_setup(runtime, device, r1, r2, r3, c1, c2) {
            const members = runtime.members;
            if ((((r1) === (0)) ? 1 : 0)) {
                0;
                return;
            }
            let r_in = 0;
            let gain = 0;
            if ((((r2) === (0)) ? 1 : 0)) {
                gain = 1;
                r_in = r1;
            }
            else {
                gain = runtime.divide(r2, ((r1) + (r2)));
                r_in = ((1) / (__add_opamp_m_bandpass_setup(runtime, ((1) / (r1)), ((1) / (r2)))));
            }
            let fc = ((1) / (((((2) * (3.141592653589793))) * (Math.sqrt(Number(((((((r_in) * (r3))) * (c1))) * (c2))))))));
            let d = runtime.divide(((c1) + (c2)), Math.sqrt(Number(((((((r3) / (r_in))) * (c1))) * (c2)))));
            gain = ((gain) * ((((((((-r3)) / (r_in))) * (c2))) / (((c1) + (c2))))));
            method_setup(runtime, device, 2, fc, d, gain);
        }
        function __add_opamp_m_bandpass_setup(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_RES_K(runtime, res) {
            const members = runtime.members;
            return ((res) * (1000));
        }
        function method_clson_w(runtime, state) {
            const members = runtime.members;
            if (((state) ? 0 : 1)) {
                runtime.invoke("polepos_engine_sound_lsb_w", 0);
                runtime.invoke("polepos_engine_sound_msb_w", 0);
            }
        }
        function method_CAP_U(runtime, cap) {
            const members = runtime.members;
            return ((cap) * (0.000001));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "setup": method_setup,
            "reset": method_reset,
            "step": method_step,
            "opamp_m_bandpass_setup": method_opamp_m_bandpass_setup,
            "RES_K": method_RES_K,
            "clson_w": method_clson_w,
            "CAP_U": method_CAP_U
        };
        return __methodTable;
    })(),
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
        function method_RES_K(runtime, res) {
            const members = runtime.members;
            return ((res) * (1000));
        }
        function method_clson_w(runtime, state) {
            const members = runtime.members;
            if (((state) ? 0 : 1)) {
                runtime.invoke("polepos_engine_sound_lsb_w", 0);
                runtime.invoke("polepos_engine_sound_msb_w", 0);
            }
        }
        function method_CAP_U(runtime, cap) {
            const members = runtime.members;
            return ((cap) * (0.000001));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "__construct_1": method___construct_1,
            "RES_K": method_RES_K,
            "clson_w": method_clson_w,
            "CAP_U": method_CAP_U
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
        function method_RES_K(runtime, res) {
            const members = runtime.members;
            return ((res) * (1000));
        }
        function method_clson_w(runtime, state) {
            const members = runtime.members;
            if (((state) ? 0 : 1)) {
                runtime.invoke("polepos_engine_sound_lsb_w", 0);
                runtime.invoke("polepos_engine_sound_msb_w", 0);
            }
        }
        function method_CAP_U(runtime, cap) {
            const members = runtime.members;
            return ((cap) * (0.000001));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "__construct": method___construct,
            "push": method_push,
            "pop": method_pop,
            "RES_K": method_RES_K,
            "clson_w": method_clson_w,
            "CAP_U": method_CAP_U
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
