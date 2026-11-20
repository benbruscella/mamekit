import deviceData from './cbm_iec.device.ir.json' with { type: 'json' };
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
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        method_host_reset_w(runtime, 0);
        method_host_reset_w(runtime, 1);
    }
    function method_host_reset_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 4, state);
    }
    function method_set_signal(runtime, device, signal, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["strcmp"], __L1 = __l["m_write_srq"], __L2 = __l["m_write_atn"], __L3 = __l["m_write_clk"], __L4 = __l["m_write_data"], __L5 = __l["m_write_reset"];
        let __t0, __t1, __t2, __t3, __t4, __t5;
        const h_m_line = members.m_line ?? 0;
        let changed = ((0) ? 1 : 0);
        if ((runtime.same(device, (members.this ?? 0)) ? 1 : 0)) {
            if ((((h_m_line[signal]) !== (state)) ? 1 : 0)) {
                if (0) {
                    0;
                }
                h_m_line[signal] = state;
                changed = ((1) ? 1 : 0);
            }
        }
        else {
            let entry = (__t0 = __deref_set_signal(runtime, members.m_device_list), typeof __t0.first === 'function' ? __t0.first() : typeof __t0.first === 'number' || typeof __t0.first === 'boolean' ? __t0.first : runtime.container(members.m_device_list, "first"));
            while (entry) {
                if ((((__L0 ? __L0((__t1 = __deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_device), typeof __t1.tag === 'function' ? __t1.tag() : typeof __t1.tag === 'number' || typeof __t1.tag === 'boolean' ? __t1.tag : runtime.container(__deref_set_signal(runtime, entry).m_device, "tag")), (__t2 = __deref_set_signal(runtime, device), typeof __t2.tag === 'function' ? __t2.tag() : typeof __t2.tag === 'number' || typeof __t2.tag === 'boolean' ? __t2.tag : runtime.container(device, "tag"))) : runtime.macro("strcmp", (__t1 = __deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_device), typeof __t1.tag === 'function' ? __t1.tag() : typeof __t1.tag === 'number' || typeof __t1.tag === 'boolean' ? __t1.tag : runtime.container(__deref_set_signal(runtime, entry).m_device, "tag")), (__t2 = __deref_set_signal(runtime, device), typeof __t2.tag === 'function' ? __t2.tag() : typeof __t2.tag === 'number' || typeof __t2.tag === 'boolean' ? __t2.tag : runtime.container(device, "tag"))))) ? 0 : 1)) {
                    if (((Number(runtime.readIndex(__deref_set_signal(runtime, entry).m_line, signal)) !== Number(state)) ? 1 : 0)) {
                        if (0) {
                            0;
                        }
                        runtime.writeIndex(__deref_set_signal(runtime, entry).m_line, signal, state);
                        changed = ((1) ? 1 : 0);
                    }
                }
                entry = (__t3 = __deref_set_signal(runtime, entry), typeof __t3.next === 'function' ? __t3.next() : typeof __t3.next === 'number' || typeof __t3.next === 'boolean' ? __t3.next : runtime.container(entry, "next"));
            }
        }
        if (changed) {
            switch (signal) {
                case 0:
                    {
                        (__L1 ? __L1(Number(state)) : typeof members.m_write_srq === 'function' ? members.m_write_srq(state) : runtime.invoke("m_write_srq", state));
                        break;
                    }
                case 1:
                    {
                        (__L2 ? __L2(Number(state)) : typeof members.m_write_atn === 'function' ? members.m_write_atn(state) : runtime.invoke("m_write_atn", state));
                        break;
                    }
                case 2:
                    {
                        (__L3 ? __L3(Number(state)) : typeof members.m_write_clk === 'function' ? members.m_write_clk(state) : runtime.invoke("m_write_clk", state));
                        break;
                    }
                case 3:
                    {
                        (__L4 ? __L4(Number(state)) : typeof members.m_write_data === 'function' ? members.m_write_data(state) : runtime.invoke("m_write_data", state));
                        break;
                    }
                case 4:
                    {
                        (__L5 ? __L5(Number(state)) : typeof members.m_write_reset === 'function' ? members.m_write_reset(state) : runtime.invoke("m_write_reset", state));
                        break;
                    }
            }
            let entry = (__t4 = __deref_set_signal(runtime, members.m_device_list), typeof __t4.first === 'function' ? __t4.first() : typeof __t4.first === 'number' || typeof __t4.first === 'boolean' ? __t4.first : runtime.container(members.m_device_list, "first"));
            while (entry) {
                switch (signal) {
                    case 0:
                        {
                            (__deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_interface).cbm_iec_srq?.(state) ?? 0);
                            break;
                        }
                    case 1:
                        {
                            (__deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_interface).cbm_iec_atn?.(state) ?? 0);
                            break;
                        }
                    case 2:
                        {
                            (__deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_interface).cbm_iec_clk?.(state) ?? 0);
                            break;
                        }
                    case 3:
                        {
                            (__deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_interface).cbm_iec_data?.(state) ?? 0);
                            break;
                        }
                    case 4:
                        {
                            (__deref_set_signal(runtime, __deref_set_signal(runtime, entry).m_interface).cbm_iec_reset?.(state) ?? 0);
                            break;
                        }
                }
                entry = (__t5 = __deref_set_signal(runtime, entry), typeof __t5.next === 'function' ? __t5.next() : typeof __t5.next === 'number' || typeof __t5.next === 'boolean' ? __t5.next : runtime.container(entry, "next"));
            }
            if (0) {
                0;
            }
        }
    }
    function __deref_set_signal(runtime, p) {
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
    function method_device_stop(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_device_stop(runtime, members.m_device_list), typeof __t0.reset === 'function' ? __t0.reset() : typeof __t0.reset === 'number' || typeof __t0.reset === 'boolean' ? __t0.reset : runtime.container(members.m_device_list, "reset"));
    }
    function __deref_device_stop(runtime, p) {
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
    function method_add_device(runtime, slot, target) {
        const members = runtime.members;
        let entry = runtime.invoke("new::daisy_entry", target);
        entry.m_interface.m_slot = slot;
        entry.m_interface.m_bus = (members.this ?? 0);
        (__deref_add_device(runtime, members.m_device_list).append?.(__deref_add_device(runtime, entry)) ?? 0);
    }
    function __deref_add_device(runtime, p) {
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
    function method_get_signal(runtime, signal) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_line = members.m_line ?? 0;
        let state = ((h_m_line[signal]) | 0);
        if (state) {
            let entry = (__t0 = __deref_get_signal(runtime, members.m_device_list), typeof __t0.first === 'function' ? __t0.first() : typeof __t0.first === 'number' || typeof __t0.first === 'boolean' ? __t0.first : runtime.container(members.m_device_list, "first"));
            while (entry) {
                if (((runtime.readIndex(__deref_get_signal(runtime, entry).m_line, signal)) ? 0 : 1)) {
                    state = ((0) | 0);
                    break;
                }
                entry = (__t1 = __deref_get_signal(runtime, entry), typeof __t1.next === 'function' ? __t1.next() : typeof __t1.next === 'number' || typeof __t1.next === 'boolean' ? __t1.next : runtime.container(entry, "next"));
            }
        }
        return state;
    }
    function __deref_get_signal(runtime, p) {
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
    function method_srq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_srq_callback(runtime, members.m_write_srq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_srq, "bind"));
    }
    function __deref_srq_callback(runtime, p) {
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
    function method_atn_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_atn_callback(runtime, members.m_write_atn), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_atn, "bind"));
    }
    function __deref_atn_callback(runtime, p) {
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
    function method_clk_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_clk_callback(runtime, members.m_write_clk), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_clk, "bind"));
    }
    function __deref_clk_callback(runtime, p) {
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
    function method_data_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_data_callback(runtime, members.m_write_data), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_data, "bind"));
    }
    function __deref_data_callback(runtime, p) {
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
    function method_reset_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_reset_callback(runtime, members.m_write_reset), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_reset, "bind"));
    }
    function __deref_reset_callback(runtime, p) {
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
    function method_srq_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 0)) | 0);
    }
    function method_atn_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 1)) | 0);
    }
    function method_clk_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 2)) | 0);
    }
    function method_data_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 3)) | 0);
    }
    function method_reset_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 4)) | 0);
    }
    function method_host_srq_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 0, state);
    }
    function method_host_atn_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 1, state);
    }
    function method_host_clk_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 2, state);
    }
    function method_host_data_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 3, state);
    }
    function method_srq_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 0, state);
    }
    function method_atn_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 1, state);
    }
    function method_clk_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 2, state);
    }
    function method_data_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 3, state);
    }
    function method_reset_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 4, state);
    }
    function method_cbm_iec_device__srq_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cbm_iec_device__srq_callback(runtime, members.m_write_srq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_srq, "bind"));
    }
    function __deref_cbm_iec_device__srq_callback(runtime, p) {
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
    function method_cbm_iec_device__atn_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cbm_iec_device__atn_callback(runtime, members.m_write_atn), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_atn, "bind"));
    }
    function __deref_cbm_iec_device__atn_callback(runtime, p) {
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
    function method_cbm_iec_device__clk_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cbm_iec_device__clk_callback(runtime, members.m_write_clk), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_clk, "bind"));
    }
    function __deref_cbm_iec_device__clk_callback(runtime, p) {
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
    function method_cbm_iec_device__data_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cbm_iec_device__data_callback(runtime, members.m_write_data), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_data, "bind"));
    }
    function __deref_cbm_iec_device__data_callback(runtime, p) {
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
    function method_cbm_iec_device__reset_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_cbm_iec_device__reset_callback(runtime, members.m_write_reset), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_write_reset, "bind"));
    }
    function __deref_cbm_iec_device__reset_callback(runtime, p) {
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
    function method_cbm_iec_device__srq_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 0)) | 0);
    }
    function method_cbm_iec_device__atn_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 1)) | 0);
    }
    function method_cbm_iec_device__clk_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 2)) | 0);
    }
    function method_cbm_iec_device__data_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 3)) | 0);
    }
    function method_cbm_iec_device__reset_r(runtime) {
        const members = runtime.members;
        return ((method_get_signal(runtime, 4)) | 0);
    }
    function method_cbm_iec_device__host_srq_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 0, state);
    }
    function method_cbm_iec_device__host_atn_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 1, state);
    }
    function method_cbm_iec_device__host_clk_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 2, state);
    }
    function method_cbm_iec_device__host_data_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 3, state);
    }
    function method_cbm_iec_device__host_reset_w(runtime, state) {
        const members = runtime.members;
        method_set_signal(runtime, (members.this ?? 0), 4, state);
    }
    function method_cbm_iec_device__srq_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 0, state);
    }
    function method_cbm_iec_device__atn_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 1, state);
    }
    function method_cbm_iec_device__clk_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 2, state);
    }
    function method_cbm_iec_device__data_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 3, state);
    }
    function method_cbm_iec_device__reset_w(runtime, device, state) {
        const members = runtime.members;
        method_set_signal(runtime, device, 4, state);
    }
    function method___construct(runtime, mconfig, tag, owner, clock) {
        const members = runtime.members;
        const h_m_line = members.m_line ?? 0;
        for (let __range0 = h_m_line, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            runtime.writeIndex(__range0, __range0_index, 1);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "host_reset_w": method_host_reset_w,
        "set_signal": method_set_signal,
        "device_stop": method_device_stop,
        "add_device": method_add_device,
        "get_signal": method_get_signal,
        "srq_callback": method_srq_callback,
        "atn_callback": method_atn_callback,
        "clk_callback": method_clk_callback,
        "data_callback": method_data_callback,
        "reset_callback": method_reset_callback,
        "srq_r": method_srq_r,
        "atn_r": method_atn_r,
        "clk_r": method_clk_r,
        "data_r": method_data_r,
        "reset_r": method_reset_r,
        "host_srq_w": method_host_srq_w,
        "host_atn_w": method_host_atn_w,
        "host_clk_w": method_host_clk_w,
        "host_data_w": method_host_data_w,
        "srq_w": method_srq_w,
        "atn_w": method_atn_w,
        "clk_w": method_clk_w,
        "data_w": method_data_w,
        "reset_w": method_reset_w,
        "cbm_iec_device::srq_callback": method_cbm_iec_device__srq_callback,
        "cbm_iec_device::atn_callback": method_cbm_iec_device__atn_callback,
        "cbm_iec_device::clk_callback": method_cbm_iec_device__clk_callback,
        "cbm_iec_device::data_callback": method_cbm_iec_device__data_callback,
        "cbm_iec_device::reset_callback": method_cbm_iec_device__reset_callback,
        "cbm_iec_device::srq_r": method_cbm_iec_device__srq_r,
        "cbm_iec_device::atn_r": method_cbm_iec_device__atn_r,
        "cbm_iec_device::clk_r": method_cbm_iec_device__clk_r,
        "cbm_iec_device::data_r": method_cbm_iec_device__data_r,
        "cbm_iec_device::reset_r": method_cbm_iec_device__reset_r,
        "cbm_iec_device::host_srq_w": method_cbm_iec_device__host_srq_w,
        "cbm_iec_device::host_atn_w": method_cbm_iec_device__host_atn_w,
        "cbm_iec_device::host_clk_w": method_cbm_iec_device__host_clk_w,
        "cbm_iec_device::host_data_w": method_cbm_iec_device__host_data_w,
        "cbm_iec_device::host_reset_w": method_cbm_iec_device__host_reset_w,
        "cbm_iec_device::srq_w": method_cbm_iec_device__srq_w,
        "cbm_iec_device::atn_w": method_cbm_iec_device__atn_w,
        "cbm_iec_device::clk_w": method_cbm_iec_device__clk_w,
        "cbm_iec_device::data_w": method_cbm_iec_device__data_w,
        "cbm_iec_device::reset_w": method_cbm_iec_device__reset_w,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["m_write_atn", "m_write_clk", "m_write_data", "m_write_reset", "m_write_srq", "strcmp"];
definition.allocations["daisy_entry"].compiledMethods = (() => {
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
    function method_next(runtime) {
        const members = runtime.members;
        return (members.m_next ?? 0);
    }
    function method_cbm_iec_device__daisy_entry__next(runtime) {
        const members = runtime.members;
        return (members.m_next ?? 0);
    }
    function method___construct(runtime, device) {
        const members = runtime.members;
        const h_m_line = members.m_line ?? 0;
        members.m_next = 0;
        members.m_device = device;
        members.m_interface = 0;
        for (let __range0 = h_m_line, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            runtime.writeIndex(__range0, __range0_index, 1);
        }
        members.m_interface = (__deref___construct(runtime, device).interface?.("device_cbm_iec_interface") ?? 0);
    }
    function __deref___construct(runtime, p) {
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
        "next": method_next,
        "cbm_iec_device::daisy_entry::next": method_cbm_iec_device__daisy_entry__next,
        "__construct": method___construct
    };
    return __methodTable;
})();
export const device = definition;
export default device;
