import deviceData from './latch8.device.ir.json' with { type: 'json' };
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        let __t0;
        let res = (((members.m_value ?? 0)) & 0xff);
        if ((members.m_has_read ?? 0)) {
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((((__t0 = __deref_read(runtime, runtime.readIndex((members.m_read_cb ?? 0), i)), typeof __t0.isunset === 'function' ? (__t0.isunset() ?? 0) : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), i), "isunset"))) ? 0 : 1)) {
                    res = ((((((res) & ((~((1) << (i)))))) | (((runtime.readIndex((members.m_read_cb ?? 0), i)()) << (i))))) & 0xff);
                }
            }
        }
        return ((((((res) & ((~(members.m_maskout ?? 0))))) ^ ((members.m_xorvalue ?? 0)))) & 0xff);
    }
    function __deref_read(runtime, p) {
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
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((((members.m_nosync ?? 0)) !== (255)) ? 1 : 0)) {
            runtime.synchronize("timerproc", ((65280) | (data)));
        }
        else {
            method_update(runtime, data, 255);
        }
    }
    function method_update(runtime, new_val, mask) {
        const members = runtime.members;
        new_val = ((new_val) & 0xff);
        mask = ((mask) & 0xff);
        let old_val = (((members.m_value ?? 0)) & 0xff);
        members.m_value = (((((((members.m_value ?? 0)) & ((~mask)))) | (((new_val) & (mask))))) & 0xff);
        if ((members.m_has_write ?? 0)) {
            let changed = ((((old_val) ^ ((members.m_value ?? 0)))) & 0xff);
            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                if ((((changed) >>> (i)) & 1)) {
                    runtime.readIndex((members.m_write_cb ?? 0), i)(((((members.m_value ?? 0)) >>> (i)) & 1));
                }
            }
        }
    }
    function method_reset_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_value = ((0) & 0xff);
    }
    function method_bitx_w_0(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (0)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_1(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (1)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_2(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (2)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_3(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (3)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_4(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (4)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_5(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (5)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_6(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (6)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bitx_w_7(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        let mask = ((((1) << (offset))) & 0xff);
        let masked_data = (((((((data) >>> (7)) & 1)) << (offset))) & 0xff);
        if ((((members.m_nosync ?? 0)) & (mask))) {
            method_update(runtime, masked_data, mask);
        }
        else {
            runtime.synchronize("timerproc", ((((mask) << (8))) | (masked_data)));
        }
    }
    function method_bit0_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_0(runtime, offset, data);
    }
    function method_bit1_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_1(runtime, offset, data);
    }
    function method_bit2_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_2(runtime, offset, data);
    }
    function method_bit3_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_3(runtime, offset, data);
    }
    function method_bit4_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_4(runtime, offset, data);
    }
    function method_bit5_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_5(runtime, offset, data);
    }
    function method_bit6_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_6(runtime, offset, data);
    }
    function method_bit7_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        method_bitx_w_7(runtime, offset, data);
    }
    function method_timerproc(runtime, param) {
        const members = runtime.members;
        let new_val = ((((param) & (255))) & 0xff);
        let mask = ((runtime.shiftRight(param, 8)) & 0xff);
        method_update(runtime, new_val, mask);
    }
    function method_write_cb_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_cb_0(runtime, runtime.readIndex((members.m_write_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 0), "bind"));
    }
    function __deref_write_cb_0(runtime, p) {
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
    function method_write_cb_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_cb_1(runtime, runtime.readIndex((members.m_write_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 1), "bind"));
    }
    function __deref_write_cb_1(runtime, p) {
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
    function method_write_cb_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_cb_2(runtime, runtime.readIndex((members.m_write_cb ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 2), "bind"));
    }
    function __deref_write_cb_2(runtime, p) {
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
    function method_write_cb_6(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_cb_6(runtime, runtime.readIndex((members.m_write_cb ?? 0), 6)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 6), "bind"));
    }
    function __deref_write_cb_6(runtime, p) {
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
    function method_write_cb_7(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_cb_7(runtime, runtime.readIndex((members.m_write_cb ?? 0), 7)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 7), "bind"));
    }
    function __deref_write_cb_7(runtime, p) {
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
    function method_read_cb_5(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_cb_5(runtime, runtime.readIndex((members.m_read_cb ?? 0), 5)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), 5), "bind"));
    }
    function __deref_read_cb_5(runtime, p) {
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
    function method_read_cb_6(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_cb_6(runtime, runtime.readIndex((members.m_read_cb ?? 0), 6)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), 6), "bind"));
    }
    function __deref_read_cb_6(runtime, p) {
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
    function method_read_cb_4(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_cb_4(runtime, runtime.readIndex((members.m_read_cb ?? 0), 4)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), 4), "bind"));
    }
    function __deref_read_cb_4(runtime, p) {
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
    function method_set_maskout(runtime, maskout) {
        const members = runtime.members;
        members.m_maskout = ((maskout) >>> 0);
    }
    function method_set_xorvalue(runtime, xorvalue) {
        const members = runtime.members;
        members.m_xorvalue = ((xorvalue) >>> 0);
    }
    function method_set_nosync(runtime, nosync) {
        const members = runtime.members;
        members.m_nosync = ((nosync) >>> 0);
    }
    function method_bit0_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (0)) & 1)) | 0);
    }
    function method_bit1_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (1)) & 1)) | 0);
    }
    function method_bit2_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (2)) & 1)) | 0);
    }
    function method_bit3_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (3)) & 1)) | 0);
    }
    function method_bit4_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (4)) & 1)) | 0);
    }
    function method_bit5_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (5)) & 1)) | 0);
    }
    function method_bit6_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (6)) & 1)) | 0);
    }
    function method_bit7_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (7)) & 1)) | 0);
    }
    function method_bit0_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (0)) & 1)) | 0);
    }
    function method_bit1_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (1)) & 1)) | 0);
    }
    function method_bit2_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (2)) & 1)) | 0);
    }
    function method_bit3_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (3)) & 1)) | 0);
    }
    function method_bit4_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (4)) & 1)) | 0);
    }
    function method_bit5_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (5)) & 1)) | 0);
    }
    function method_bit6_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (6)) & 1)) | 0);
    }
    function method_bit7_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (7)) & 1)) | 0);
    }
    function method_latch8_device__write_cb_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__write_cb_0(runtime, runtime.readIndex((members.m_write_cb ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 0), "bind"));
    }
    function __deref_latch8_device__write_cb_0(runtime, p) {
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
    function method_latch8_device__write_cb_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__write_cb_1(runtime, runtime.readIndex((members.m_write_cb ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 1), "bind"));
    }
    function __deref_latch8_device__write_cb_1(runtime, p) {
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
    function method_latch8_device__write_cb_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__write_cb_2(runtime, runtime.readIndex((members.m_write_cb ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 2), "bind"));
    }
    function __deref_latch8_device__write_cb_2(runtime, p) {
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
    function method_latch8_device__write_cb_6(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__write_cb_6(runtime, runtime.readIndex((members.m_write_cb ?? 0), 6)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 6), "bind"));
    }
    function __deref_latch8_device__write_cb_6(runtime, p) {
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
    function method_latch8_device__write_cb_7(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__write_cb_7(runtime, runtime.readIndex((members.m_write_cb ?? 0), 7)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write_cb ?? 0), 7), "bind"));
    }
    function __deref_latch8_device__write_cb_7(runtime, p) {
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
    function method_latch8_device__read_cb_5(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__read_cb_5(runtime, runtime.readIndex((members.m_read_cb ?? 0), 5)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), 5), "bind"));
    }
    function __deref_latch8_device__read_cb_5(runtime, p) {
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
    function method_latch8_device__read_cb_6(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__read_cb_6(runtime, runtime.readIndex((members.m_read_cb ?? 0), 6)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), 6), "bind"));
    }
    function __deref_latch8_device__read_cb_6(runtime, p) {
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
    function method_latch8_device__read_cb_4(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_latch8_device__read_cb_4(runtime, runtime.readIndex((members.m_read_cb ?? 0), 4)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read_cb ?? 0), 4), "bind"));
    }
    function __deref_latch8_device__read_cb_4(runtime, p) {
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
    function method_latch8_device__set_maskout(runtime, maskout) {
        const members = runtime.members;
        members.m_maskout = ((maskout) >>> 0);
    }
    function method_latch8_device__set_xorvalue(runtime, xorvalue) {
        const members = runtime.members;
        members.m_xorvalue = ((xorvalue) >>> 0);
    }
    function method_latch8_device__set_nosync(runtime, nosync) {
        const members = runtime.members;
        members.m_nosync = ((nosync) >>> 0);
    }
    function method_latch8_device__bit0_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (0)) & 1)) | 0);
    }
    function method_latch8_device__bit1_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (1)) & 1)) | 0);
    }
    function method_latch8_device__bit2_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (2)) & 1)) | 0);
    }
    function method_latch8_device__bit3_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (3)) & 1)) | 0);
    }
    function method_latch8_device__bit4_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (4)) & 1)) | 0);
    }
    function method_latch8_device__bit5_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (5)) & 1)) | 0);
    }
    function method_latch8_device__bit6_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (6)) & 1)) | 0);
    }
    function method_latch8_device__bit7_r(runtime) {
        const members = runtime.members;
        return ((((((members.m_value ?? 0)) >>> (7)) & 1)) | 0);
    }
    function method_latch8_device__bit0_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (0)) & 1)) | 0);
    }
    function method_latch8_device__bit1_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (1)) & 1)) | 0);
    }
    function method_latch8_device__bit2_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (2)) & 1)) | 0);
    }
    function method_latch8_device__bit3_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (3)) & 1)) | 0);
    }
    function method_latch8_device__bit4_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (4)) & 1)) | 0);
    }
    function method_latch8_device__bit5_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (5)) & 1)) | 0);
    }
    function method_latch8_device__bit6_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (6)) & 1)) | 0);
    }
    function method_latch8_device__bit7_q_r(runtime) {
        const members = runtime.members;
        return ((((((~(members.m_value ?? 0))) >>> (7)) & 1)) | 0);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "update": method_update,
        "reset_w": method_reset_w,
        "bitx_w_0": method_bitx_w_0,
        "bitx_w_1": method_bitx_w_1,
        "bitx_w_2": method_bitx_w_2,
        "bitx_w_3": method_bitx_w_3,
        "bitx_w_4": method_bitx_w_4,
        "bitx_w_5": method_bitx_w_5,
        "bitx_w_6": method_bitx_w_6,
        "bitx_w_7": method_bitx_w_7,
        "bit0_w": method_bit0_w,
        "bit1_w": method_bit1_w,
        "bit2_w": method_bit2_w,
        "bit3_w": method_bit3_w,
        "bit4_w": method_bit4_w,
        "bit5_w": method_bit5_w,
        "bit6_w": method_bit6_w,
        "bit7_w": method_bit7_w,
        "timerproc": method_timerproc,
        "write_cb_0": method_write_cb_0,
        "write_cb_1": method_write_cb_1,
        "write_cb_2": method_write_cb_2,
        "write_cb_6": method_write_cb_6,
        "write_cb_7": method_write_cb_7,
        "read_cb_5": method_read_cb_5,
        "read_cb_6": method_read_cb_6,
        "read_cb_4": method_read_cb_4,
        "set_maskout": method_set_maskout,
        "set_xorvalue": method_set_xorvalue,
        "set_nosync": method_set_nosync,
        "bit0_r": method_bit0_r,
        "bit1_r": method_bit1_r,
        "bit2_r": method_bit2_r,
        "bit3_r": method_bit3_r,
        "bit4_r": method_bit4_r,
        "bit5_r": method_bit5_r,
        "bit6_r": method_bit6_r,
        "bit7_r": method_bit7_r,
        "bit0_q_r": method_bit0_q_r,
        "bit1_q_r": method_bit1_q_r,
        "bit2_q_r": method_bit2_q_r,
        "bit3_q_r": method_bit3_q_r,
        "bit4_q_r": method_bit4_q_r,
        "bit5_q_r": method_bit5_q_r,
        "bit6_q_r": method_bit6_q_r,
        "bit7_q_r": method_bit7_q_r,
        "latch8_device::write_cb_0": method_latch8_device__write_cb_0,
        "latch8_device::write_cb_1": method_latch8_device__write_cb_1,
        "latch8_device::write_cb_2": method_latch8_device__write_cb_2,
        "latch8_device::write_cb_6": method_latch8_device__write_cb_6,
        "latch8_device::write_cb_7": method_latch8_device__write_cb_7,
        "latch8_device::read_cb_5": method_latch8_device__read_cb_5,
        "latch8_device::read_cb_6": method_latch8_device__read_cb_6,
        "latch8_device::read_cb_4": method_latch8_device__read_cb_4,
        "latch8_device::set_maskout": method_latch8_device__set_maskout,
        "latch8_device::set_xorvalue": method_latch8_device__set_xorvalue,
        "latch8_device::set_nosync": method_latch8_device__set_nosync,
        "latch8_device::bit0_r": method_latch8_device__bit0_r,
        "latch8_device::bit1_r": method_latch8_device__bit1_r,
        "latch8_device::bit2_r": method_latch8_device__bit2_r,
        "latch8_device::bit3_r": method_latch8_device__bit3_r,
        "latch8_device::bit4_r": method_latch8_device__bit4_r,
        "latch8_device::bit5_r": method_latch8_device__bit5_r,
        "latch8_device::bit6_r": method_latch8_device__bit6_r,
        "latch8_device::bit7_r": method_latch8_device__bit7_r,
        "latch8_device::bit0_q_r": method_latch8_device__bit0_q_r,
        "latch8_device::bit1_q_r": method_latch8_device__bit1_q_r,
        "latch8_device::bit2_q_r": method_latch8_device__bit2_q_r,
        "latch8_device::bit3_q_r": method_latch8_device__bit3_q_r,
        "latch8_device::bit4_q_r": method_latch8_device__bit4_q_r,
        "latch8_device::bit5_q_r": method_latch8_device__bit5_q_r,
        "latch8_device::bit6_q_r": method_latch8_device__bit6_q_r,
        "latch8_device::bit7_q_r": method_latch8_device__bit7_q_r
    };
    return __methodTable;
})();
export const device = definition;
export default device;
