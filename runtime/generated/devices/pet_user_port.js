import deviceData from './pet_user_port.device.ir.json' with { type: 'json' };
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
    function method_device_config_complete(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["get_card_device"], __L1 = __l["DYNAMIC_CAST"];
        members.m_card = (__L1 ? __L1((__L0 ? __L0() : runtime.macro("get_card_device")), "device_pet_user_port_interface") : runtime.macro("DYNAMIC_CAST", (__L0 ? __L0() : runtime.macro("get_card_device")), "device_pet_user_port_interface"));
    }
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_3_handler"], __L1 = __l["m_4_handler"], __L2 = __l["m_5_handler"], __L3 = __l["m_6_handler"], __L4 = __l["m_7_handler"], __L5 = __l["m_8_handler"], __L6 = __l["m_9_handler"], __L7 = __l["m_b_handler"], __L8 = __l["m_c_handler"], __L9 = __l["m_d_handler"], __L10 = __l["m_e_handler"], __L11 = __l["m_f_handler"], __L12 = __l["m_h_handler"], __L13 = __l["m_j_handler"], __L14 = __l["m_k_handler"], __L15 = __l["m_l_handler"], __L16 = __l["m_m_handler"];
        (__L0 ? __L0(Number(1)) : typeof members.m_3_handler === 'function' ? members.m_3_handler(1) : runtime.invoke("m_3_handler", 1));
        (__L1 ? __L1(Number(1)) : typeof members.m_4_handler === 'function' ? members.m_4_handler(1) : runtime.invoke("m_4_handler", 1));
        (__L2 ? __L2(Number(1)) : typeof members.m_5_handler === 'function' ? members.m_5_handler(1) : runtime.invoke("m_5_handler", 1));
        (__L3 ? __L3(Number(1)) : typeof members.m_6_handler === 'function' ? members.m_6_handler(1) : runtime.invoke("m_6_handler", 1));
        (__L4 ? __L4(Number(1)) : typeof members.m_7_handler === 'function' ? members.m_7_handler(1) : runtime.invoke("m_7_handler", 1));
        (__L5 ? __L5(Number(1)) : typeof members.m_8_handler === 'function' ? members.m_8_handler(1) : runtime.invoke("m_8_handler", 1));
        (__L6 ? __L6(Number(1)) : typeof members.m_9_handler === 'function' ? members.m_9_handler(1) : runtime.invoke("m_9_handler", 1));
        (__L7 ? __L7(Number(1)) : typeof members.m_b_handler === 'function' ? members.m_b_handler(1) : runtime.invoke("m_b_handler", 1));
        (__L8 ? __L8(Number(1)) : typeof members.m_c_handler === 'function' ? members.m_c_handler(1) : runtime.invoke("m_c_handler", 1));
        (__L9 ? __L9(Number(1)) : typeof members.m_d_handler === 'function' ? members.m_d_handler(1) : runtime.invoke("m_d_handler", 1));
        (__L10 ? __L10(Number(1)) : typeof members.m_e_handler === 'function' ? members.m_e_handler(1) : runtime.invoke("m_e_handler", 1));
        (__L11 ? __L11(Number(1)) : typeof members.m_f_handler === 'function' ? members.m_f_handler(1) : runtime.invoke("m_f_handler", 1));
        (__L12 ? __L12(Number(1)) : typeof members.m_h_handler === 'function' ? members.m_h_handler(1) : runtime.invoke("m_h_handler", 1));
        (__L13 ? __L13(Number(1)) : typeof members.m_j_handler === 'function' ? members.m_j_handler(1) : runtime.invoke("m_j_handler", 1));
        (__L14 ? __L14(Number(1)) : typeof members.m_k_handler === 'function' ? members.m_k_handler(1) : runtime.invoke("m_k_handler", 1));
        (__L15 ? __L15(Number(1)) : typeof members.m_l_handler === 'function' ? members.m_l_handler(1) : runtime.invoke("m_l_handler", 1));
        (__L16 ? __L16(Number(1)) : typeof members.m_m_handler === 'function' ? members.m_m_handler(1) : runtime.invoke("m_m_handler", 1));
    }
    function method_write_2(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_2?.(state) ?? 0);
        }
    }
    function method_write_3(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_3?.(state) ?? 0);
        }
    }
    function method_write_4(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_4?.(state) ?? 0);
        }
    }
    function method_write_5(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_5?.(state) ?? 0);
        }
    }
    function method_write_6(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_6?.(state) ?? 0);
        }
    }
    function method_write_7(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_7?.(state) ?? 0);
        }
    }
    function method_write_8(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_8?.(state) ?? 0);
        }
    }
    function method_write_9(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_9?.(state) ?? 0);
        }
    }
    function method_write_10(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_10?.(state) ?? 0);
        }
    }
    function method_write_b(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_b?.(state) ?? 0);
        }
    }
    function method_write_c(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_c?.(state) ?? 0);
        }
    }
    function method_write_d(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_d?.(state) ?? 0);
        }
    }
    function method_write_e(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_e?.(state) ?? 0);
        }
    }
    function method_write_f(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_f?.(state) ?? 0);
        }
    }
    function method_write_h(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_h?.(state) ?? 0);
        }
    }
    function method_write_j(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_j?.(state) ?? 0);
        }
    }
    function method_write_k(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_k?.(state) ?? 0);
        }
    }
    function method_write_l(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_l?.(state) ?? 0);
        }
    }
    function method_write_m(runtime, state) {
        const members = runtime.members;
        if ((((members.m_card ?? 0)) ? 1 : 0)) {
            (members.m_card.input_m?.(state) ?? 0);
        }
    }
    function method_pet_user_port_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_p2_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p2_handler(runtime, members.m_2_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_2_handler, "bind"));
    }
    function __deref_p2_handler(runtime, p) {
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
    function method_p3_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p3_handler(runtime, members.m_3_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_3_handler, "bind"));
    }
    function __deref_p3_handler(runtime, p) {
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
    function method_p4_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p4_handler(runtime, members.m_4_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_4_handler, "bind"));
    }
    function __deref_p4_handler(runtime, p) {
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
    function method_p5_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p5_handler(runtime, members.m_5_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_5_handler, "bind"));
    }
    function __deref_p5_handler(runtime, p) {
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
    function method_p6_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p6_handler(runtime, members.m_6_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_6_handler, "bind"));
    }
    function __deref_p6_handler(runtime, p) {
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
    function method_p7_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p7_handler(runtime, members.m_7_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_7_handler, "bind"));
    }
    function __deref_p7_handler(runtime, p) {
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
    function method_p8_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p8_handler(runtime, members.m_8_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_8_handler, "bind"));
    }
    function __deref_p8_handler(runtime, p) {
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
    function method_p9_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p9_handler(runtime, members.m_9_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_9_handler, "bind"));
    }
    function __deref_p9_handler(runtime, p) {
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
    function method_p10_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p10_handler(runtime, members.m_10_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_10_handler, "bind"));
    }
    function __deref_p10_handler(runtime, p) {
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
    function method_pb_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pb_handler(runtime, members.m_b_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_b_handler, "bind"));
    }
    function __deref_pb_handler(runtime, p) {
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
    function method_pc_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pc_handler(runtime, members.m_c_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_c_handler, "bind"));
    }
    function __deref_pc_handler(runtime, p) {
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
    function method_pd_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pd_handler(runtime, members.m_d_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_d_handler, "bind"));
    }
    function __deref_pd_handler(runtime, p) {
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
    function method_pe_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pe_handler(runtime, members.m_e_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_e_handler, "bind"));
    }
    function __deref_pe_handler(runtime, p) {
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
    function method_pf_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pf_handler(runtime, members.m_f_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_f_handler, "bind"));
    }
    function __deref_pf_handler(runtime, p) {
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
    function method_ph_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ph_handler(runtime, members.m_h_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_h_handler, "bind"));
    }
    function __deref_ph_handler(runtime, p) {
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
    function method_pj_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pj_handler(runtime, members.m_j_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_j_handler, "bind"));
    }
    function __deref_pj_handler(runtime, p) {
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
    function method_pk_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pk_handler(runtime, members.m_k_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_k_handler, "bind"));
    }
    function __deref_pk_handler(runtime, p) {
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
    function method_pl_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pl_handler(runtime, members.m_l_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_l_handler, "bind"));
    }
    function __deref_pl_handler(runtime, p) {
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
    function method_pm_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pm_handler(runtime, members.m_m_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_m_handler, "bind"));
    }
    function __deref_pm_handler(runtime, p) {
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
    function method_pet_user_port_device__pet_user_port_device(runtime, mconfig, tag, owner, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["set_options"];
        (__L1 ? __L1((__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__L0 ? __L0(opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_pet_user_port_device__p2_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p2_handler(runtime, members.m_2_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_2_handler, "bind"));
    }
    function __deref_pet_user_port_device__p2_handler(runtime, p) {
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
    function method_pet_user_port_device__p3_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p3_handler(runtime, members.m_3_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_3_handler, "bind"));
    }
    function __deref_pet_user_port_device__p3_handler(runtime, p) {
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
    function method_pet_user_port_device__p4_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p4_handler(runtime, members.m_4_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_4_handler, "bind"));
    }
    function __deref_pet_user_port_device__p4_handler(runtime, p) {
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
    function method_pet_user_port_device__p5_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p5_handler(runtime, members.m_5_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_5_handler, "bind"));
    }
    function __deref_pet_user_port_device__p5_handler(runtime, p) {
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
    function method_pet_user_port_device__p6_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p6_handler(runtime, members.m_6_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_6_handler, "bind"));
    }
    function __deref_pet_user_port_device__p6_handler(runtime, p) {
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
    function method_pet_user_port_device__p7_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p7_handler(runtime, members.m_7_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_7_handler, "bind"));
    }
    function __deref_pet_user_port_device__p7_handler(runtime, p) {
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
    function method_pet_user_port_device__p8_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p8_handler(runtime, members.m_8_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_8_handler, "bind"));
    }
    function __deref_pet_user_port_device__p8_handler(runtime, p) {
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
    function method_pet_user_port_device__p9_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p9_handler(runtime, members.m_9_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_9_handler, "bind"));
    }
    function __deref_pet_user_port_device__p9_handler(runtime, p) {
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
    function method_pet_user_port_device__p10_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__p10_handler(runtime, members.m_10_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_10_handler, "bind"));
    }
    function __deref_pet_user_port_device__p10_handler(runtime, p) {
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
    function method_pet_user_port_device__pb_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pb_handler(runtime, members.m_b_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_b_handler, "bind"));
    }
    function __deref_pet_user_port_device__pb_handler(runtime, p) {
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
    function method_pet_user_port_device__pc_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pc_handler(runtime, members.m_c_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_c_handler, "bind"));
    }
    function __deref_pet_user_port_device__pc_handler(runtime, p) {
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
    function method_pet_user_port_device__pd_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pd_handler(runtime, members.m_d_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_d_handler, "bind"));
    }
    function __deref_pet_user_port_device__pd_handler(runtime, p) {
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
    function method_pet_user_port_device__pe_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pe_handler(runtime, members.m_e_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_e_handler, "bind"));
    }
    function __deref_pet_user_port_device__pe_handler(runtime, p) {
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
    function method_pet_user_port_device__pf_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pf_handler(runtime, members.m_f_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_f_handler, "bind"));
    }
    function __deref_pet_user_port_device__pf_handler(runtime, p) {
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
    function method_pet_user_port_device__ph_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__ph_handler(runtime, members.m_h_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_h_handler, "bind"));
    }
    function __deref_pet_user_port_device__ph_handler(runtime, p) {
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
    function method_pet_user_port_device__pj_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pj_handler(runtime, members.m_j_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_j_handler, "bind"));
    }
    function __deref_pet_user_port_device__pj_handler(runtime, p) {
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
    function method_pet_user_port_device__pk_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pk_handler(runtime, members.m_k_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_k_handler, "bind"));
    }
    function __deref_pet_user_port_device__pk_handler(runtime, p) {
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
    function method_pet_user_port_device__pl_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pl_handler(runtime, members.m_l_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_l_handler, "bind"));
    }
    function __deref_pet_user_port_device__pl_handler(runtime, p) {
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
    function method_pet_user_port_device__pm_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_pet_user_port_device__pm_handler(runtime, members.m_m_handler), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_m_handler, "bind"));
    }
    function __deref_pet_user_port_device__pm_handler(runtime, p) {
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
        "device_config_complete": method_device_config_complete,
        "device_start": method_device_start,
        "write_2": method_write_2,
        "write_3": method_write_3,
        "write_4": method_write_4,
        "write_5": method_write_5,
        "write_6": method_write_6,
        "write_7": method_write_7,
        "write_8": method_write_8,
        "write_9": method_write_9,
        "write_10": method_write_10,
        "write_b": method_write_b,
        "write_c": method_write_c,
        "write_d": method_write_d,
        "write_e": method_write_e,
        "write_f": method_write_f,
        "write_h": method_write_h,
        "write_j": method_write_j,
        "write_k": method_write_k,
        "write_l": method_write_l,
        "write_m": method_write_m,
        "pet_user_port_device": method_pet_user_port_device,
        "p2_handler": method_p2_handler,
        "p3_handler": method_p3_handler,
        "p4_handler": method_p4_handler,
        "p5_handler": method_p5_handler,
        "p6_handler": method_p6_handler,
        "p7_handler": method_p7_handler,
        "p8_handler": method_p8_handler,
        "p9_handler": method_p9_handler,
        "p10_handler": method_p10_handler,
        "pb_handler": method_pb_handler,
        "pc_handler": method_pc_handler,
        "pd_handler": method_pd_handler,
        "pe_handler": method_pe_handler,
        "pf_handler": method_pf_handler,
        "ph_handler": method_ph_handler,
        "pj_handler": method_pj_handler,
        "pk_handler": method_pk_handler,
        "pl_handler": method_pl_handler,
        "pm_handler": method_pm_handler,
        "pet_user_port_device::pet_user_port_device": method_pet_user_port_device__pet_user_port_device,
        "pet_user_port_device::p2_handler": method_pet_user_port_device__p2_handler,
        "pet_user_port_device::p3_handler": method_pet_user_port_device__p3_handler,
        "pet_user_port_device::p4_handler": method_pet_user_port_device__p4_handler,
        "pet_user_port_device::p5_handler": method_pet_user_port_device__p5_handler,
        "pet_user_port_device::p6_handler": method_pet_user_port_device__p6_handler,
        "pet_user_port_device::p7_handler": method_pet_user_port_device__p7_handler,
        "pet_user_port_device::p8_handler": method_pet_user_port_device__p8_handler,
        "pet_user_port_device::p9_handler": method_pet_user_port_device__p9_handler,
        "pet_user_port_device::p10_handler": method_pet_user_port_device__p10_handler,
        "pet_user_port_device::pb_handler": method_pet_user_port_device__pb_handler,
        "pet_user_port_device::pc_handler": method_pet_user_port_device__pc_handler,
        "pet_user_port_device::pd_handler": method_pet_user_port_device__pd_handler,
        "pet_user_port_device::pe_handler": method_pet_user_port_device__pe_handler,
        "pet_user_port_device::pf_handler": method_pet_user_port_device__pf_handler,
        "pet_user_port_device::ph_handler": method_pet_user_port_device__ph_handler,
        "pet_user_port_device::pj_handler": method_pet_user_port_device__pj_handler,
        "pet_user_port_device::pk_handler": method_pet_user_port_device__pk_handler,
        "pet_user_port_device::pl_handler": method_pet_user_port_device__pl_handler,
        "pet_user_port_device::pm_handler": method_pet_user_port_device__pm_handler
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["DYNAMIC_CAST", "get_card_device", "m_3_handler", "m_4_handler", "m_5_handler", "m_6_handler", "m_7_handler", "m_8_handler", "m_9_handler", "m_b_handler", "m_c_handler", "m_d_handler", "m_e_handler", "m_f_handler", "m_h_handler", "m_j_handler", "m_k_handler", "m_l_handler", "m_m_handler", "set_options", "std::forward"];
export const device = definition;
export default device;
