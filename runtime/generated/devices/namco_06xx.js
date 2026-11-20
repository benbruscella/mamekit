import deviceData from './namco_06xx.device.ir.json' with { type: 'json' };
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
    function method_data_r(runtime, offset) {
        const members = runtime.members;
        let result = ((255) & 0xff);
        if (((((((members.m_control ?? 0)) >>> (4)) & 1)) ? 0 : 1)) {
            0;
            return ((0) & 0xff);
        }
        if (((((members.m_control ?? 0)) >>> (0)) & 1)) {
            result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 0)(0)))) & 0xff);
        }
        if (((((members.m_control ?? 0)) >>> (1)) & 1)) {
            result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 1)(0)))) & 0xff);
        }
        if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
            result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 2)(0)))) & 0xff);
        }
        if (((((members.m_control ?? 0)) >>> (3)) & 1)) {
            result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 3)(0)))) & 0xff);
        }
        return ((result) & 0xff);
    }
    function method_data_w(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("write_sync", data);
    }
    function method_ctrl_r(runtime) {
        const members = runtime.members;
        return (((members.m_control ?? 0)) & 0xff);
    }
    function method_ctrl_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("ctrl_w_sync", data);
    }
    function method_nmi_generate(runtime, param) {
        const members = runtime.members;
        members.m_timer_state = (((((members.m_timer_state ?? 0)) ? 0 : 1)) ? 1 : 0);
        if ((members.m_timer_state ?? 0)) {
            runtime.readIndex((members.m_rw ?? 0), 0)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
            runtime.readIndex((members.m_rw ?? 0), 1)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
            runtime.readIndex((members.m_rw ?? 0), 2)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
            runtime.readIndex((members.m_rw ?? 0), 3)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
        }
        if (((((members.m_timer_state ?? 0)) && ((((members.m_read_stretch ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            runtime.invoke("set_nmi", 1);
        }
        else {
            runtime.invoke("set_nmi", 0);
        }
        members.m_read_stretch = ((0) ? 1 : 0);
        runtime.readIndex((members.m_chipsel ?? 0), 0)(0, (((((((members.m_control ?? 0)) >>> (0)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
        runtime.readIndex((members.m_chipsel ?? 0), 1)(0, (((((((members.m_control ?? 0)) >>> (1)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
        runtime.readIndex((members.m_chipsel ?? 0), 2)(0, (((((((members.m_control ?? 0)) >>> (2)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
        runtime.readIndex((members.m_chipsel ?? 0), 3)(0, (((((((members.m_control ?? 0)) >>> (3)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
    }
    function method_write_sync(runtime, param) {
        const members = runtime.members;
        if (((((members.m_control ?? 0)) >>> (4)) & 1)) {
            0;
            return;
        }
        if (((((members.m_control ?? 0)) >>> (0)) & 1)) {
            runtime.readIndex((members.m_write ?? 0), 0)(0, param);
        }
        if (((((members.m_control ?? 0)) >>> (1)) & 1)) {
            runtime.readIndex((members.m_write ?? 0), 1)(0, param);
        }
        if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
            runtime.readIndex((members.m_write ?? 0), 2)(0, param);
        }
        if (((((members.m_control ?? 0)) >>> (3)) & 1)) {
            runtime.readIndex((members.m_write ?? 0), 3)(0, param);
        }
    }
    function method_ctrl_w_sync(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_hz"], __L2 = __l["machine"], __L3 = __l["machine().time"], __L4 = __l["attotime::from_ticks"];
        members.m_control = ((param) & 0xff);
        if (((Number((((members.m_control ?? 0)) & (224))) === Number(0)) ? 1 : 0)) {
            (__deref_ctrl_w_sync(runtime, members.m_nmi_timer).adjust?.(Infinity) ?? 0);
            members.m_timer_state = ((0) ? 1 : 0);
            runtime.invoke("set_nmi", 0);
            runtime.readIndex((members.m_chipsel ?? 0), 0)(0, 0);
            runtime.readIndex((members.m_chipsel ?? 0), 1)(0, 0);
            runtime.readIndex((members.m_chipsel ?? 0), 2)(0, 0);
            runtime.readIndex((members.m_chipsel ?? 0), 3)(0, 0);
        }
        else {
            if (((((members.m_control ?? 0)) >>> (4)) & 1)) {
                runtime.invoke("set_nmi", 0);
                members.m_read_stretch = ((1) ? 1 : 0);
            }
            else {
                members.m_read_stretch = ((0) ? 1 : 0);
            }
            let num_shifts = ((runtime.shiftRight((((members.m_control ?? 0)) & (224)), 5)) & 0xff);
            let divisor = ((((1) << (num_shifts))) & 0xff);
            let period = runtime.divide((__L1 ? __L1(runtime.divide((__L0 ? __L0() : runtime.macro("clock")), divisor)) : runtime.macro("attotime::from_hz", runtime.divide((__L0 ? __L0() : runtime.macro("clock")), divisor))), 2);
            let now = ((__L3 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0);
            let total_ticks = (typeof now === 'number' ? runtime.attotime(now, "as_ticks", (__L0 ? __L0() : runtime.macro("clock"))) : (__deref_ctrl_w_sync(runtime, now).as_ticks?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0));
            let delay = (((__L4 ? __L4(runtime.wide("+", total_ticks, 1), (__L0 ? __L0() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", runtime.wide("+", total_ticks, 1), (__L0 ? __L0() : runtime.macro("clock"))))) - (now));
            (__deref_ctrl_w_sync(runtime, members.m_nmi_timer).adjust?.(delay, 0, period) ?? 0);
        }
    }
    function __deref_ctrl_w_sync(runtime, p) {
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
    function method_set_maincpu(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_nmicpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_nmicpu)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_chip_select_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_chip_select_callback_0(runtime, runtime.readIndex((members.m_chipsel ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 0), "bind"));
    }
    function __deref_chip_select_callback_0(runtime, p) {
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
    function method_chip_select_callback_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_chip_select_callback_1(runtime, runtime.readIndex((members.m_chipsel ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 1), "bind"));
    }
    function __deref_chip_select_callback_1(runtime, p) {
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
    function method_chip_select_callback_3(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_chip_select_callback_3(runtime, runtime.readIndex((members.m_chipsel ?? 0), 3)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 3), "bind"));
    }
    function __deref_chip_select_callback_3(runtime, p) {
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
    function method_chip_select_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_chip_select_callback_2(runtime, runtime.readIndex((members.m_chipsel ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 2), "bind"));
    }
    function __deref_chip_select_callback_2(runtime, p) {
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
    function method_rw_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_rw_callback_0(runtime, runtime.readIndex((members.m_rw ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_rw ?? 0), 0), "bind"));
    }
    function __deref_rw_callback_0(runtime, p) {
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
    function method_rw_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_rw_callback_2(runtime, runtime.readIndex((members.m_rw ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_rw ?? 0), 2), "bind"));
    }
    function __deref_rw_callback_2(runtime, p) {
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
    function method_read_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_callback_0(runtime, runtime.readIndex((members.m_read ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read ?? 0), 0), "bind"));
    }
    function __deref_read_callback_0(runtime, p) {
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
    function method_read_callback_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_callback_1(runtime, runtime.readIndex((members.m_read ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read ?? 0), 1), "bind"));
    }
    function __deref_read_callback_1(runtime, p) {
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
    function method_read_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_read_callback_2(runtime, runtime.readIndex((members.m_read ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read ?? 0), 2), "bind"));
    }
    function __deref_read_callback_2(runtime, p) {
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
    function method_write_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_callback_0(runtime, runtime.readIndex((members.m_write ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write ?? 0), 0), "bind"));
    }
    function __deref_write_callback_0(runtime, p) {
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
    function method_write_callback_3(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_callback_3(runtime, runtime.readIndex((members.m_write ?? 0), 3)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write ?? 0), 3), "bind"));
    }
    function __deref_write_callback_3(runtime, p) {
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
    function method_write_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_write_callback_2(runtime, runtime.readIndex((members.m_write ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write ?? 0), 2), "bind"));
    }
    function __deref_write_callback_2(runtime, p) {
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
    function method_namco_06xx_device__set_maincpu(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_nmicpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) : ((members.m_nmicpu)?.set_tag?.((__L0 ? __L0(tag) : runtime.macro("std::forward", tag))) ?? 0));
    }
    function method_namco_06xx_device__chip_select_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__chip_select_callback_0(runtime, runtime.readIndex((members.m_chipsel ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 0), "bind"));
    }
    function __deref_namco_06xx_device__chip_select_callback_0(runtime, p) {
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
    function method_namco_06xx_device__chip_select_callback_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__chip_select_callback_1(runtime, runtime.readIndex((members.m_chipsel ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 1), "bind"));
    }
    function __deref_namco_06xx_device__chip_select_callback_1(runtime, p) {
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
    function method_namco_06xx_device__chip_select_callback_3(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__chip_select_callback_3(runtime, runtime.readIndex((members.m_chipsel ?? 0), 3)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 3), "bind"));
    }
    function __deref_namco_06xx_device__chip_select_callback_3(runtime, p) {
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
    function method_namco_06xx_device__chip_select_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__chip_select_callback_2(runtime, runtime.readIndex((members.m_chipsel ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_chipsel ?? 0), 2), "bind"));
    }
    function __deref_namco_06xx_device__chip_select_callback_2(runtime, p) {
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
    function method_namco_06xx_device__rw_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__rw_callback_0(runtime, runtime.readIndex((members.m_rw ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_rw ?? 0), 0), "bind"));
    }
    function __deref_namco_06xx_device__rw_callback_0(runtime, p) {
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
    function method_namco_06xx_device__rw_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__rw_callback_2(runtime, runtime.readIndex((members.m_rw ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_rw ?? 0), 2), "bind"));
    }
    function __deref_namco_06xx_device__rw_callback_2(runtime, p) {
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
    function method_namco_06xx_device__read_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__read_callback_0(runtime, runtime.readIndex((members.m_read ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read ?? 0), 0), "bind"));
    }
    function __deref_namco_06xx_device__read_callback_0(runtime, p) {
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
    function method_namco_06xx_device__read_callback_1(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__read_callback_1(runtime, runtime.readIndex((members.m_read ?? 0), 1)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read ?? 0), 1), "bind"));
    }
    function __deref_namco_06xx_device__read_callback_1(runtime, p) {
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
    function method_namco_06xx_device__read_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__read_callback_2(runtime, runtime.readIndex((members.m_read ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_read ?? 0), 2), "bind"));
    }
    function __deref_namco_06xx_device__read_callback_2(runtime, p) {
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
    function method_namco_06xx_device__write_callback_0(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__write_callback_0(runtime, runtime.readIndex((members.m_write ?? 0), 0)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write ?? 0), 0), "bind"));
    }
    function __deref_namco_06xx_device__write_callback_0(runtime, p) {
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
    function method_namco_06xx_device__write_callback_3(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__write_callback_3(runtime, runtime.readIndex((members.m_write ?? 0), 3)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write ?? 0), 3), "bind"));
    }
    function __deref_namco_06xx_device__write_callback_3(runtime, p) {
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
    function method_namco_06xx_device__write_callback_2(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_namco_06xx_device__write_callback_2(runtime, runtime.readIndex((members.m_write ?? 0), 2)), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(runtime.readIndex((members.m_write ?? 0), 2), "bind"));
    }
    function __deref_namco_06xx_device__write_callback_2(runtime, p) {
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
        "data_r": method_data_r,
        "data_w": method_data_w,
        "ctrl_r": method_ctrl_r,
        "ctrl_w": method_ctrl_w,
        "nmi_generate": method_nmi_generate,
        "write_sync": method_write_sync,
        "ctrl_w_sync": method_ctrl_w_sync,
        "set_maincpu": method_set_maincpu,
        "chip_select_callback_0": method_chip_select_callback_0,
        "chip_select_callback_1": method_chip_select_callback_1,
        "chip_select_callback_3": method_chip_select_callback_3,
        "chip_select_callback_2": method_chip_select_callback_2,
        "rw_callback_0": method_rw_callback_0,
        "rw_callback_2": method_rw_callback_2,
        "read_callback_0": method_read_callback_0,
        "read_callback_1": method_read_callback_1,
        "read_callback_2": method_read_callback_2,
        "write_callback_0": method_write_callback_0,
        "write_callback_3": method_write_callback_3,
        "write_callback_2": method_write_callback_2,
        "namco_06xx_device::set_maincpu": method_namco_06xx_device__set_maincpu,
        "namco_06xx_device::chip_select_callback_0": method_namco_06xx_device__chip_select_callback_0,
        "namco_06xx_device::chip_select_callback_1": method_namco_06xx_device__chip_select_callback_1,
        "namco_06xx_device::chip_select_callback_3": method_namco_06xx_device__chip_select_callback_3,
        "namco_06xx_device::chip_select_callback_2": method_namco_06xx_device__chip_select_callback_2,
        "namco_06xx_device::rw_callback_0": method_namco_06xx_device__rw_callback_0,
        "namco_06xx_device::rw_callback_2": method_namco_06xx_device__rw_callback_2,
        "namco_06xx_device::read_callback_0": method_namco_06xx_device__read_callback_0,
        "namco_06xx_device::read_callback_1": method_namco_06xx_device__read_callback_1,
        "namco_06xx_device::read_callback_2": method_namco_06xx_device__read_callback_2,
        "namco_06xx_device::write_callback_0": method_namco_06xx_device__write_callback_0,
        "namco_06xx_device::write_callback_3": method_namco_06xx_device__write_callback_3,
        "namco_06xx_device::write_callback_2": method_namco_06xx_device__write_callback_2
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime::from_hz", "attotime::from_ticks", "clock", "m_nmicpu.set_tag", "machine", "machine().time", "std::forward"];
export const device = definition;
export default device;
