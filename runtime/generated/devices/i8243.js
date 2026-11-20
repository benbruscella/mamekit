import deviceData from './i8243.device.ir.json' with { type: 'json' };
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
    function method_p2_r(runtime) {
        const members = runtime.members;
        return (((members.m_p2out ?? 0)) & 0xff);
    }
    function method_p2_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_p2 = ((((data) & (15))) & 0xff);
    }
    function method_output_update(runtime, which) {
        const members = runtime.members;
        let __t0;
        const h_m_p = members.m_p ?? 0;
        if ((__t0 = __deref_output_update(runtime, (members.m_writehandler ?? 0)[which]), typeof __t0.isunset === 'function' ? (__t0.isunset() ?? 0) : runtime.container((members.m_writehandler ?? 0)[which], "isunset"))) {
            0;
        }
        else {
            (members.m_writehandler ?? 0)[which](h_m_p[which]);
        }
    }
    function __deref_output_update(runtime, p) {
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
    function method_prog_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        const h_m_p = members.m_p ?? 0;
        if ((((((((members.m_prog ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) && ((((members.m_cs ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_opcode = (((members.m_p2 ?? 0)) & 0xff);
            if (((Number((((members.m_opcode ?? 0)) >>> (2))) === Number(0)) ? 1 : 0)) {
                let which = (((((members.m_opcode ?? 0)) & (3))) | 0);
                if ((__t0 = __deref_prog_w(runtime, (members.m_readhandler ?? 0)[which]), typeof __t0.isunset === 'function' ? (__t0.isunset() ?? 0) : runtime.container((members.m_readhandler ?? 0)[which], "isunset"))) {
                    0;
                }
                else {
                    h_m_p[which] = (members.m_readhandler ?? 0)[which]();
                }
                members.m_p2out = ((((h_m_p[which]) & (15))) & 0xff);
            }
            else {
                members.m_p2out = ((15) & 0xff);
            }
        }
        else {
            if ((((((((((members.m_prog ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) && ((((members.m_cs ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                switch ((((members.m_opcode ?? 0)) >>> (2))) {
                    case 0:
                        {
                            members.m_p2out = ((15) & 0xff);
                            break;
                        }
                    case 1:
                        {
                            h_m_p[(((members.m_opcode ?? 0)) & (3))] = (((members.m_p2 ?? 0)) & (15));
                            method_output_update(runtime, (((members.m_opcode ?? 0)) & (3)));
                            break;
                        }
                    case 2:
                        {
                            h_m_p[(((members.m_opcode ?? 0)) & (3))] = ((h_m_p[(((members.m_opcode ?? 0)) & (3))]) | ((((members.m_p2 ?? 0)) & (15))));
                            method_output_update(runtime, (((members.m_opcode ?? 0)) & (3)));
                            break;
                        }
                    case 3:
                        {
                            h_m_p[(((members.m_opcode ?? 0)) & (3))] = runtime.andAssign(h_m_p[(((members.m_opcode ?? 0)) & (3))], (((members.m_p2 ?? 0)) & (15)));
                            method_output_update(runtime, (((members.m_opcode ?? 0)) & (3)));
                            break;
                        }
                }
            }
        }
        members.m_prog = ((state) ? 1 : 0);
    }
    function __deref_prog_w(runtime, p) {
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
    function method_cs_w(runtime, state) {
        const members = runtime.members;
        members.m_cs = ((state) ? 1 : 0);
        if ((members.m_cs ?? 0)) {
            members.m_p2out = ((15) & 0xff);
        }
    }
    function method_p4_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p4_in_cb(runtime, (members.m_readhandler ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[0], "bind"));
    }
    function __deref_p4_in_cb(runtime, p) {
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
    function method_p4_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p4_out_cb(runtime, (members.m_writehandler ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[0], "bind"));
    }
    function __deref_p4_out_cb(runtime, p) {
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
    function method_p5_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p5_in_cb(runtime, (members.m_readhandler ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[1], "bind"));
    }
    function __deref_p5_in_cb(runtime, p) {
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
    function method_p5_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p5_out_cb(runtime, (members.m_writehandler ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[1], "bind"));
    }
    function __deref_p5_out_cb(runtime, p) {
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
    function method_p6_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p6_in_cb(runtime, (members.m_readhandler ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[2], "bind"));
    }
    function __deref_p6_in_cb(runtime, p) {
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
    function method_p6_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p6_out_cb(runtime, (members.m_writehandler ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[2], "bind"));
    }
    function __deref_p6_out_cb(runtime, p) {
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
    function method_p7_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p7_in_cb(runtime, (members.m_readhandler ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[3], "bind"));
    }
    function __deref_p7_in_cb(runtime, p) {
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
    function method_p7_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_p7_out_cb(runtime, (members.m_writehandler ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[3], "bind"));
    }
    function __deref_p7_out_cb(runtime, p) {
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
    function method_i8243_device__p4_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p4_in_cb(runtime, (members.m_readhandler ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[0], "bind"));
    }
    function __deref_i8243_device__p4_in_cb(runtime, p) {
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
    function method_i8243_device__p4_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p4_out_cb(runtime, (members.m_writehandler ?? 0)[0]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[0], "bind"));
    }
    function __deref_i8243_device__p4_out_cb(runtime, p) {
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
    function method_i8243_device__p5_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p5_in_cb(runtime, (members.m_readhandler ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[1], "bind"));
    }
    function __deref_i8243_device__p5_in_cb(runtime, p) {
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
    function method_i8243_device__p5_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p5_out_cb(runtime, (members.m_writehandler ?? 0)[1]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[1], "bind"));
    }
    function __deref_i8243_device__p5_out_cb(runtime, p) {
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
    function method_i8243_device__p6_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p6_in_cb(runtime, (members.m_readhandler ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[2], "bind"));
    }
    function __deref_i8243_device__p6_in_cb(runtime, p) {
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
    function method_i8243_device__p6_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p6_out_cb(runtime, (members.m_writehandler ?? 0)[2]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[2], "bind"));
    }
    function __deref_i8243_device__p6_out_cb(runtime, p) {
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
    function method_i8243_device__p7_in_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p7_in_cb(runtime, (members.m_readhandler ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_readhandler ?? 0)[3], "bind"));
    }
    function __deref_i8243_device__p7_in_cb(runtime, p) {
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
    function method_i8243_device__p7_out_cb(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_i8243_device__p7_out_cb(runtime, (members.m_writehandler ?? 0)[3]), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container((members.m_writehandler ?? 0)[3], "bind"));
    }
    function __deref_i8243_device__p7_out_cb(runtime, p) {
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
        "p2_r": method_p2_r,
        "p2_w": method_p2_w,
        "output_update": method_output_update,
        "prog_w": method_prog_w,
        "cs_w": method_cs_w,
        "p4_in_cb": method_p4_in_cb,
        "p4_out_cb": method_p4_out_cb,
        "p5_in_cb": method_p5_in_cb,
        "p5_out_cb": method_p5_out_cb,
        "p6_in_cb": method_p6_in_cb,
        "p6_out_cb": method_p6_out_cb,
        "p7_in_cb": method_p7_in_cb,
        "p7_out_cb": method_p7_out_cb,
        "i8243_device::p4_in_cb": method_i8243_device__p4_in_cb,
        "i8243_device::p4_out_cb": method_i8243_device__p4_out_cb,
        "i8243_device::p5_in_cb": method_i8243_device__p5_in_cb,
        "i8243_device::p5_out_cb": method_i8243_device__p5_out_cb,
        "i8243_device::p6_in_cb": method_i8243_device__p6_in_cb,
        "i8243_device::p6_out_cb": method_i8243_device__p6_out_cb,
        "i8243_device::p7_in_cb": method_i8243_device__p7_in_cb,
        "i8243_device::p7_out_cb": method_i8243_device__p7_out_cb
    };
    return __methodTable;
})();
export const device = definition;
export default device;
