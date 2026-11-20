import deviceData from './ls157.device.ir.json' with { type: 'json' };
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
    function method_a0_w(runtime, state) {
        const members = runtime.members;
        method_write_a_bit(runtime, 0, state);
    }
    function method_write_a_bit(runtime, bit, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_cb"];
        let __t0;
        if (((Number(((((members.m_a ?? 0)) >>> (bit)) & 1)) !== Number(state)) ? 1 : 0)) {
            if (state) {
                members.m_a = ((((members.m_a) | (((1) << (bit))))) & 0xff);
            }
            else {
                members.m_a = ((((members.m_a) & ((~((1) << (bit)))))) & 0xff);
            }
            if ((((((((((members.m_strobe ?? 0)) ? 0 : 1)) && ((((members.m_select ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((((__t0 = __deref_write_a_bit(runtime, members.m_out_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
                (__L0 ? __L0(Number((members.m_a ?? 0))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((members.m_a ?? 0)) : runtime.invoke("m_out_cb", (members.m_a ?? 0)));
            }
        }
    }
    function __deref_write_a_bit(runtime, p) {
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
    function method_a1_w(runtime, state) {
        const members = runtime.members;
        method_write_a_bit(runtime, 1, state);
    }
    function method_a2_w(runtime, state) {
        const members = runtime.members;
        method_write_a_bit(runtime, 2, state);
    }
    function method_a3_w(runtime, state) {
        const members = runtime.members;
        method_write_a_bit(runtime, 3, state);
    }
    function method_b0_w(runtime, state) {
        const members = runtime.members;
        method_write_b_bit(runtime, 0, state);
    }
    function method_write_b_bit(runtime, bit, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_cb"];
        let __t0;
        if (((Number(((((members.m_b ?? 0)) >>> (bit)) & 1)) !== Number(state)) ? 1 : 0)) {
            if (state) {
                members.m_b = ((((members.m_b) | (((1) << (bit))))) & 0xff);
            }
            else {
                members.m_b = ((((members.m_b) & ((~((1) << (bit)))))) & 0xff);
            }
            if ((((((((((members.m_strobe ?? 0)) ? 0 : 1)) && ((members.m_select ?? 0))) ? 1 : 0)) && ((((__t0 = __deref_write_b_bit(runtime, members.m_out_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
                (__L0 ? __L0(Number((members.m_b ?? 0))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((members.m_b ?? 0)) : runtime.invoke("m_out_cb", (members.m_b ?? 0)));
            }
        }
    }
    function __deref_write_b_bit(runtime, p) {
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
    function method_b1_w(runtime, state) {
        const members = runtime.members;
        method_write_b_bit(runtime, 1, state);
    }
    function method_b2_w(runtime, state) {
        const members = runtime.members;
        method_write_b_bit(runtime, 2, state);
    }
    function method_b3_w(runtime, state) {
        const members = runtime.members;
        method_write_b_bit(runtime, 3, state);
    }
    function method_select_w(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_select ?? 0)) !== Number(((state) ? 1 : 0))) ? 1 : 0)) {
            members.m_select = ((((state) ? 1 : 0)) ? 1 : 0);
            method_update_output(runtime);
        }
    }
    function method_update_output(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_b_in_cb"], __L1 = __l["m_out_cb"], __L2 = __l["m_a_in_cb"];
        let __t0, __t1, __t2;
        const h_m_data_mask = members.m_data_mask ?? 0;
        if (((((((members.m_strobe ?? 0)) ? 0 : 1)) && ((((__t0 = __deref_update_output(runtime, members.m_out_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
            if ((members.m_select ?? 0)) {
                (__L1 ? __L1(Number((((__t1 = __deref_update_output(runtime, members.m_b_in_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__L0 ? __L0() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask)))))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((((__t1 = __deref_update_output(runtime, members.m_b_in_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__L0 ? __L0() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask))))) : runtime.invoke("m_out_cb", (((__t1 = __deref_update_output(runtime, members.m_b_in_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__L0 ? __L0() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask))))));
            }
            else {
                (__L1 ? __L1(Number((((__t2 = __deref_update_output(runtime, members.m_a_in_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__L2 ? __L2() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask)))))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((((__t2 = __deref_update_output(runtime, members.m_a_in_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__L2 ? __L2() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask))))) : runtime.invoke("m_out_cb", (((__t2 = __deref_update_output(runtime, members.m_a_in_cb), typeof __t2.isunset === 'function' ? __t2.isunset() : typeof __t2.isunset === 'number' || typeof __t2.isunset === 'boolean' ? __t2.isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__L2 ? __L2() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask))))));
            }
        }
    }
    function __deref_update_output(runtime, p) {
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
    function method_strobe_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_cb"];
        let __t0;
        if (((Number((members.m_strobe ?? 0)) !== Number(((state) ? 1 : 0))) ? 1 : 0)) {
            members.m_strobe = ((((state) ? 1 : 0)) ? 1 : 0);
            if (((((members.m_strobe ?? 0)) && ((((__t0 = __deref_strobe_w(runtime, members.m_out_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
                (__L0 ? __L0(Number(0)) : typeof members.m_out_cb === 'function' ? members.m_out_cb(0) : runtime.invoke("m_out_cb", 0));
            }
            else {
                method_update_output(runtime);
            }
        }
    }
    function __deref_strobe_w(runtime, p) {
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
    function method_output_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_b_in_cb"], __L1 = __l["m_a_in_cb"];
        let __t0, __t1;
        const h_m_data_mask = members.m_data_mask ?? 0;
        if ((members.m_strobe ?? 0)) {
            return ((0) & 0xff);
        }
        else {
            if ((members.m_select ?? 0)) {
                return (((((__t0 = __deref_output_r(runtime, members.m_b_in_cb), typeof __t0.isunset === 'function' ? __t0.isunset() : typeof __t0.isunset === 'number' || typeof __t0.isunset === 'boolean' ? __t0.isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__L0 ? __L0() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask))))) & 0xff);
            }
            else {
                return (((((__t1 = __deref_output_r(runtime, members.m_a_in_cb), typeof __t1.isunset === 'function' ? __t1.isunset() : typeof __t1.isunset === 'number' || typeof __t1.isunset === 'boolean' ? __t1.isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__L1 ? __L1() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask))))) & 0xff);
            }
        }
    }
    function __deref_output_r(runtime, p) {
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
    function method_a_in_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_a_in_callback(runtime, members.m_a_in_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_a_in_cb, "bind"));
    }
    function __deref_a_in_callback(runtime, p) {
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
    function method_b_in_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_b_in_callback(runtime, members.m_b_in_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_b_in_cb, "bind"));
    }
    function __deref_b_in_callback(runtime, p) {
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
    function method_out_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_callback(runtime, members.m_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_cb, "bind"));
    }
    function __deref_out_callback(runtime, p) {
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
    function method_ls157_device__a_in_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ls157_device__a_in_callback(runtime, members.m_a_in_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_a_in_cb, "bind"));
    }
    function __deref_ls157_device__a_in_callback(runtime, p) {
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
    function method_ls157_device__b_in_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ls157_device__b_in_callback(runtime, members.m_b_in_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_b_in_cb, "bind"));
    }
    function __deref_ls157_device__b_in_callback(runtime, p) {
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
    function method_ls157_device__out_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ls157_device__out_callback(runtime, members.m_out_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_cb, "bind"));
    }
    function __deref_ls157_device__out_callback(runtime, p) {
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
        "a0_w": method_a0_w,
        "write_a_bit": method_write_a_bit,
        "a1_w": method_a1_w,
        "a2_w": method_a2_w,
        "a3_w": method_a3_w,
        "b0_w": method_b0_w,
        "write_b_bit": method_write_b_bit,
        "b1_w": method_b1_w,
        "b2_w": method_b2_w,
        "b3_w": method_b3_w,
        "select_w": method_select_w,
        "update_output": method_update_output,
        "strobe_w": method_strobe_w,
        "output_r": method_output_r,
        "a_in_callback": method_a_in_callback,
        "b_in_callback": method_b_in_callback,
        "out_callback": method_out_callback,
        "ls157_device::a_in_callback": method_ls157_device__a_in_callback,
        "ls157_device::b_in_callback": method_ls157_device__b_in_callback,
        "ls157_device::out_callback": method_ls157_device__out_callback
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_a_in_cb", "m_b_in_cb", "m_out_cb"];
export const device = definition;
export default device;
