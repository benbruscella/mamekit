import deviceData from './cd4099.device.ir.json' with { type: 'json' };
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
    function method_write_bit(runtime, offset, d) {
        const members = runtime.members;
        method_write_abcd(runtime, offset, d);
        method_enable_w(runtime, 0);
        method_enable_w(runtime, 1);
    }
    function method_write_abcd(runtime, a, d) {
        const members = runtime.members;
        a = ((a) & 0xff);
        members.m_address = ((((a) & (7))) & 0xff);
        members.m_data = ((d) ? 1 : 0);
        if ((members.m_enable ?? 0)) {
            if ((members.m_clear ?? 0)) {
                method_clear_outputs(runtime, (((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0))));
            }
            else {
                method_update_bit(runtime);
            }
        }
    }
    function method_clear_outputs(runtime, new_q) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_parallel_out_cb"];
        new_q = ((new_q) & 0xff);
        let bits_changed = (((((members.m_q ?? 0)) ^ (new_q))) & 0xff);
        if ((((bits_changed) === (0)) ? 1 : 0)) {
            return;
        }
        members.m_q = ((new_q) & 0xff);
        for (let bit = ((0) | 0); (((bit) < (8)) ? 1 : 0); bit = ((((bit) + (1))) | 0)) {
            if ((((bits_changed) >>> (bit)) & 1)) {
                (members.m_q_out_cb ?? 0)[bit]((((new_q) >>> (bit)) & 1));
            }
        }
        (__L0 ? __L0(Number(0), Number(new_q), Number(bits_changed)) : typeof members.m_parallel_out_cb === 'function' ? members.m_parallel_out_cb(0, new_q, bits_changed) : runtime.invoke("m_parallel_out_cb", 0, new_q, bits_changed));
    }
    function method_update_bit(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_parallel_out_cb"];
        let __t0, __t1;
        if (((Number(((((members.m_q ?? 0)) >>> ((members.m_address ?? 0))) & 1)) === Number((members.m_data ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((members.m_clear ?? 0)) ? 0 : 1)) {
            members.m_q = (((((((members.m_q ?? 0)) & ((~((1) << ((members.m_address ?? 0))))))) | ((((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0)))))) & 0xff);
        }
        else {
            method_clear_outputs(runtime, 0);
            members.m_q = (((((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0)))) & 0xff);
        }
        (members.m_q_out_cb ?? 0)[(members.m_address ?? 0)]((members.m_data ?? 0));
        (__L0 ? __L0(Number(0), Number((members.m_q ?? 0)), Number(((1) << ((members.m_address ?? 0))))) : typeof members.m_parallel_out_cb === 'function' ? members.m_parallel_out_cb(0, (members.m_q ?? 0), ((1) << ((members.m_address ?? 0)))) : runtime.invoke("m_parallel_out_cb", 0, (members.m_q ?? 0), ((1) << ((members.m_address ?? 0)))));
        if ((((0) || (((((((0) && ((__t0 = __deref_update_bit(runtime, (members.m_q_out_cb ?? 0)[(members.m_address ?? 0)]), typeof __t0.isunset === 'function' ? (__t0.isunset() ?? 0) : runtime.container((members.m_q_out_cb ?? 0)[(members.m_address ?? 0)], "isunset")))) ? 1 : 0)) && ((__t1 = __deref_update_bit(runtime, members.m_parallel_out_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_parallel_out_cb, "isunset")))) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
    }
    function __deref_update_bit(runtime, p) {
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
    function method_enable_w(runtime, state) {
        const members = runtime.members;
        members.m_enable = ((((state) ? 0 : 1)) ? 1 : 0);
        if ((members.m_enable ?? 0)) {
            method_update_bit(runtime);
        }
        else {
            if ((members.m_clear ?? 0)) {
                method_clear_outputs(runtime, 0);
            }
        }
    }
    function method_write_d0(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((((((((0) && ((((data) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((data) !== (1)) ? 1 : 0))) ? 1 : 0)) && ((((data) !== (255)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        method_write_bit(runtime, offset, (((data) >>> (0)) & 1));
    }
    function method_write_d1(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((((((((0) && ((((data) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((data) !== (2)) ? 1 : 0))) ? 1 : 0)) && ((((data) !== (255)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        method_write_bit(runtime, offset, (((data) >>> (1)) & 1));
    }
    function method_write_d7(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((((((((0) && ((((data) !== (0)) ? 1 : 0))) ? 1 : 0)) && ((((data) !== (128)) ? 1 : 0))) ? 1 : 0)) && ((((data) !== (255)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        method_write_bit(runtime, offset, (((data) >>> (7)) & 1));
    }
    function method_write_a0(runtime, offset, data = 0) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_bit(runtime, ((offset) >>> (1)), ((offset) & (1)));
    }
    function method_write_a3(runtime, offset, data = 0) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_write_bit(runtime, ((offset) & (7)), runtime.shiftRight(((offset) & (8)), 3));
    }
    function method_clear_w(runtime, state) {
        const members = runtime.members;
        members.m_clear = ((((Number(((state) ? 1 : 0)) === Number(1)) ? 1 : 0)) ? 1 : 0);
        if ((members.m_clear ?? 0)) {
            method_clear_outputs(runtime, (((members.m_enable ?? 0)) ? ((((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0)))) : (0)));
        }
    }
    function method_q_out_cb_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_0(runtime, (members.m_q_out_cb ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[0], "bind"));
    }
    function __deref_q_out_cb_0(runtime, p) {
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
    function method_q_out_cb_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_1(runtime, (members.m_q_out_cb ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[1], "bind"));
    }
    function __deref_q_out_cb_1(runtime, p) {
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
    function method_q_out_cb_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_2(runtime, (members.m_q_out_cb ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[2], "bind"));
    }
    function __deref_q_out_cb_2(runtime, p) {
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
    function method_q_out_cb_3(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_3(runtime, (members.m_q_out_cb ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[3], "bind"));
    }
    function __deref_q_out_cb_3(runtime, p) {
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
    function method_q_out_cb_4(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_4(runtime, (members.m_q_out_cb ?? 0)[4]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[4], "bind"));
    }
    function __deref_q_out_cb_4(runtime, p) {
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
    function method_q_out_cb_5(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_5(runtime, (members.m_q_out_cb ?? 0)[5]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[5], "bind"));
    }
    function __deref_q_out_cb_5(runtime, p) {
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
    function method_q_out_cb_6(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_6(runtime, (members.m_q_out_cb ?? 0)[6]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[6], "bind"));
    }
    function __deref_q_out_cb_6(runtime, p) {
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
    function method_q_out_cb_7(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_q_out_cb_7(runtime, (members.m_q_out_cb ?? 0)[7]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[7], "bind"));
    }
    function __deref_q_out_cb_7(runtime, p) {
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
    function method_parallel_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_parallel_out_cb(runtime, members.m_parallel_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_parallel_out_cb, "bind"));
    }
    function __deref_parallel_out_cb(runtime, p) {
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
    function method_q0_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (0)) & 1)) | 0);
    }
    function method_q1_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (1)) & 1)) | 0);
    }
    function method_q2_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (2)) & 1)) | 0);
    }
    function method_q3_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (3)) & 1)) | 0);
    }
    function method_q4_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (4)) & 1)) | 0);
    }
    function method_q5_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (5)) & 1)) | 0);
    }
    function method_q6_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (6)) & 1)) | 0);
    }
    function method_q7_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (7)) & 1)) | 0);
    }
    function method_output_state(runtime) {
        const members = runtime.members;
        return (((members.m_q ?? 0)) & 0xff);
    }
    function method_addressable_latch_device__q_out_cb_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_0(runtime, (members.m_q_out_cb ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[0], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_0(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_1(runtime, (members.m_q_out_cb ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[1], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_1(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_2(runtime, (members.m_q_out_cb ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[2], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_2(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_3(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_3(runtime, (members.m_q_out_cb ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[3], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_3(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_4(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_4(runtime, (members.m_q_out_cb ?? 0)[4]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[4], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_4(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_5(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_5(runtime, (members.m_q_out_cb ?? 0)[5]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[5], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_5(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_6(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_6(runtime, (members.m_q_out_cb ?? 0)[6]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[6], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_6(runtime, p) {
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
    function method_addressable_latch_device__q_out_cb_7(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__q_out_cb_7(runtime, (members.m_q_out_cb ?? 0)[7]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_q_out_cb ?? 0)[7], "bind"));
    }
    function __deref_addressable_latch_device__q_out_cb_7(runtime, p) {
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
    function method_addressable_latch_device__parallel_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_addressable_latch_device__parallel_out_cb(runtime, members.m_parallel_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_parallel_out_cb, "bind"));
    }
    function __deref_addressable_latch_device__parallel_out_cb(runtime, p) {
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
    function method_addressable_latch_device__q0_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (0)) & 1)) | 0);
    }
    function method_addressable_latch_device__q1_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (1)) & 1)) | 0);
    }
    function method_addressable_latch_device__q2_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (2)) & 1)) | 0);
    }
    function method_addressable_latch_device__q3_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (3)) & 1)) | 0);
    }
    function method_addressable_latch_device__q4_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (4)) & 1)) | 0);
    }
    function method_addressable_latch_device__q5_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (5)) & 1)) | 0);
    }
    function method_addressable_latch_device__q6_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (6)) & 1)) | 0);
    }
    function method_addressable_latch_device__q7_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_q ?? 0)) >>> (7)) & 1)) | 0);
    }
    function method_addressable_latch_device__output_state(runtime) {
        const members = runtime.members;
        return (((members.m_q ?? 0)) & 0xff);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "write_bit": method_write_bit,
        "write_abcd": method_write_abcd,
        "clear_outputs": method_clear_outputs,
        "update_bit": method_update_bit,
        "enable_w": method_enable_w,
        "write_d0": method_write_d0,
        "write_d1": method_write_d1,
        "write_d7": method_write_d7,
        "write_a0": method_write_a0,
        "write_a3": method_write_a3,
        "clear_w": method_clear_w,
        "q_out_cb_0": method_q_out_cb_0,
        "q_out_cb_1": method_q_out_cb_1,
        "q_out_cb_2": method_q_out_cb_2,
        "q_out_cb_3": method_q_out_cb_3,
        "q_out_cb_4": method_q_out_cb_4,
        "q_out_cb_5": method_q_out_cb_5,
        "q_out_cb_6": method_q_out_cb_6,
        "q_out_cb_7": method_q_out_cb_7,
        "parallel_out_cb": method_parallel_out_cb,
        "q0_r": method_q0_r,
        "q1_r": method_q1_r,
        "q2_r": method_q2_r,
        "q3_r": method_q3_r,
        "q4_r": method_q4_r,
        "q5_r": method_q5_r,
        "q6_r": method_q6_r,
        "q7_r": method_q7_r,
        "output_state": method_output_state,
        "addressable_latch_device::q_out_cb_0": method_addressable_latch_device__q_out_cb_0,
        "addressable_latch_device::q_out_cb_1": method_addressable_latch_device__q_out_cb_1,
        "addressable_latch_device::q_out_cb_2": method_addressable_latch_device__q_out_cb_2,
        "addressable_latch_device::q_out_cb_3": method_addressable_latch_device__q_out_cb_3,
        "addressable_latch_device::q_out_cb_4": method_addressable_latch_device__q_out_cb_4,
        "addressable_latch_device::q_out_cb_5": method_addressable_latch_device__q_out_cb_5,
        "addressable_latch_device::q_out_cb_6": method_addressable_latch_device__q_out_cb_6,
        "addressable_latch_device::q_out_cb_7": method_addressable_latch_device__q_out_cb_7,
        "addressable_latch_device::parallel_out_cb": method_addressable_latch_device__parallel_out_cb,
        "addressable_latch_device::q0_r": method_addressable_latch_device__q0_r,
        "addressable_latch_device::q1_r": method_addressable_latch_device__q1_r,
        "addressable_latch_device::q2_r": method_addressable_latch_device__q2_r,
        "addressable_latch_device::q3_r": method_addressable_latch_device__q3_r,
        "addressable_latch_device::q4_r": method_addressable_latch_device__q4_r,
        "addressable_latch_device::q5_r": method_addressable_latch_device__q5_r,
        "addressable_latch_device::q6_r": method_addressable_latch_device__q6_r,
        "addressable_latch_device::q7_r": method_addressable_latch_device__q7_r,
        "addressable_latch_device::output_state": method_addressable_latch_device__output_state
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_parallel_out_cb"];
export const device = definition;
export default device;
