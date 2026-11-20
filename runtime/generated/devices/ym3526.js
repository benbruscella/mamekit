import deviceData from './ym3526.device.ir.json' with { type: 'json' };
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
    function method_ymfm_sync_mode_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("fm_mode_write", data);
    }
    function method_ymfm_set_timer(runtime, tnum, duration_in_clocks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_ticks"];
        const h_m_timer = members.m_timer ?? 0;
        if ((((duration_in_clocks) >= (0)) ? 1 : 0)) {
            (__deref_ymfm_set_timer(runtime, h_m_timer[tnum]).adjust?.((__L1 ? __L1(duration_in_clocks, (__L0 ? __L0() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", duration_in_clocks, (__L0 ? __L0() : runtime.macro("clock")))), tnum) ?? 0);
        }
        else {
            (__deref_ymfm_set_timer(runtime, h_m_timer[tnum]).enable?.(0) ?? 0);
        }
    }
    function __deref_ymfm_set_timer(runtime, p) {
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
    function method_ymfm_set_busy_end(runtime, clocks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["clock"], __L3 = __l["attotime::from_ticks"];
        members.m_busy_end = __add_ymfm_set_busy_end(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), (__L3 ? __L3(clocks, (__L2 ? __L2() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", clocks, (__L2 ? __L2() : runtime.macro("clock")))));
    }
    function __add_ymfm_set_busy_end(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ymfm_is_busy(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        return ((Number(((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) < Number((members.m_busy_end ?? 0))) ? 1 : 0);
    }
    function method_ymfm_update_irq(runtime, asserted) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_update_irq"];
        (__L0 ? __L0(Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
    }
    function method_ymfm_external_read(runtime, type, address) {
        const members = runtime.members;
        return ((((((Number(type) !== Number(0)) ? 1 : 0)) ? (0) : (runtime.readIndex((members.m_io_read ?? 0), ((address) & (1)))()))) & 0xff);
    }
    function method_ymfm_external_write(runtime, type, address, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((Number(type) === Number(0)) ? 1 : 0)) {
            runtime.readIndex((members.m_io_write ?? 0), ((address) & (1)))(data);
        }
    }
    function method_ymfm_interface__ymfm_sync_mode_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_ymfm_interface__ymfm_sync_mode_write(runtime, members.m_engine).engine_mode_write?.(data) ?? 0);
    }
    function __deref_ymfm_interface__ymfm_sync_mode_write(runtime, p) {
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
    function method_ymfm_interface__ymfm_sync_check_interrupts(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_ymfm_interface__ymfm_sync_check_interrupts(runtime, members.m_engine), typeof __t0.engine_check_interrupts === 'function' ? __t0.engine_check_interrupts() : typeof __t0.engine_check_interrupts === 'number' || typeof __t0.engine_check_interrupts === 'boolean' ? __t0.engine_check_interrupts : runtime.container(members.m_engine, "engine_check_interrupts"));
    }
    function __deref_ymfm_interface__ymfm_sync_check_interrupts(runtime, p) {
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
    function method_ymfm_interface__ymfm_set_timer(runtime, tnum, duration_in_clocks) {
        const members = runtime.members;
    }
    function method_ymfm_interface__ymfm_set_busy_end(runtime, clocks) {
        const members = runtime.members;
    }
    function method_ymfm_interface__ymfm_is_busy(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_ymfm_interface__ymfm_update_irq(runtime, asserted) {
        const members = runtime.members;
    }
    function method_ymfm_interface__ymfm_external_read(runtime, type, address) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_ymfm_interface__ymfm_external_write(runtime, type, address, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_irq_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_irq_handler(runtime, members.m_update_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_update_irq, "bind"));
    }
    function __deref_irq_handler(runtime, p) {
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
    function method_io_read_handler(runtime, index = 0) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_io_read_handler(runtime, runtime.readIndex((members.m_io_read ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
    }
    function __deref_io_read_handler(runtime, p) {
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
    function method_io_write_handler(runtime, index = 0) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_io_write_handler(runtime, runtime.readIndex((members.m_io_write ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
    }
    function __deref_io_write_handler(runtime, p) {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        const h_m_save_blob = members.m_save_blob ?? 0;
        method_ym_generic_device__device_start(runtime);
        members.m_stream = (__L1 ? __L1(0, 1, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) : runtime.macro("stream_alloc", 0, 1, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)));
        let state = runtime.invoke("new::ymfm_saved_state", h_m_save_blob, 1);
        (members.m_chip.save_restore?.(state) ?? 0);
        (__L3 ? __L3((__L2 ? __L2(h_m_save_blob) : runtime.macro("NAME", h_m_save_blob))) : runtime.macro("save_item", (__L2 ? __L2(h_m_save_blob) : runtime.macro("NAME", h_m_save_blob))));
    }
    function method_ym_generic_device__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        for (let tnum = ((0) | 0); (((tnum) < (2)) ? 1 : 0); tnum = ((((tnum) + (1))) | 0)) {
            (__L1 ? __L1((__L0 ? __L0((members.m_busy_end ?? 0)) : runtime.macro("NAME", (members.m_busy_end ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_busy_end ?? 0)) : runtime.macro("NAME", (members.m_busy_end ?? 0)))));
        }
    }
    function method_fm_mode_write(runtime, param) {
        const members = runtime.members;
        (__deref_fm_mode_write(runtime, members.m_engine).engine_mode_write?.(param) ?? 0);
    }
    function __deref_fm_mode_write(runtime, p) {
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
    function method_fm_check_interrupts(runtime, param) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_fm_check_interrupts(runtime, members.m_engine), typeof __t0.engine_check_interrupts === 'function' ? __t0.engine_check_interrupts() : typeof __t0.engine_check_interrupts === 'number' || typeof __t0.engine_check_interrupts === 'boolean' ? __t0.engine_check_interrupts : runtime.container(members.m_engine, "engine_check_interrupts"));
    }
    function __deref_fm_check_interrupts(runtime, p) {
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
    function method_fm_timer_handler(runtime, param) {
        const members = runtime.members;
        (__deref_fm_timer_handler(runtime, members.m_engine).engine_timer_expired?.(param) ?? 0);
    }
    function __deref_fm_timer_handler(runtime, p) {
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
    function method_ym_generic_device__irq_handler(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ym_generic_device__irq_handler(runtime, members.m_update_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_update_irq, "bind"));
    }
    function __deref_ym_generic_device__irq_handler(runtime, p) {
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
    function method_ym_generic_device__io_read_handler(runtime, index = 0) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ym_generic_device__io_read_handler(runtime, runtime.readIndex((members.m_io_read ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
    }
    function __deref_ym_generic_device__io_read_handler(runtime, p) {
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
    function method_ym_generic_device__io_write_handler(runtime, index = 0) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_ym_generic_device__io_write_handler(runtime, runtime.readIndex((members.m_io_write ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
    }
    function __deref_ym_generic_device__io_write_handler(runtime, p) {
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
    function method_ym_generic_device__ymfm_sync_mode_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        runtime.synchronize("fm_mode_write", data);
    }
    function method_ym_generic_device__ymfm_set_timer(runtime, tnum, duration_in_clocks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["attotime::from_ticks"];
        const h_m_timer = members.m_timer ?? 0;
        if ((((duration_in_clocks) >= (0)) ? 1 : 0)) {
            (__deref_ym_generic_device__ymfm_set_timer(runtime, h_m_timer[tnum]).adjust?.((__L1 ? __L1(duration_in_clocks, (__L0 ? __L0() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", duration_in_clocks, (__L0 ? __L0() : runtime.macro("clock")))), tnum) ?? 0);
        }
        else {
            (__deref_ym_generic_device__ymfm_set_timer(runtime, h_m_timer[tnum]).enable?.(0) ?? 0);
        }
    }
    function __deref_ym_generic_device__ymfm_set_timer(runtime, p) {
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
    function method_ym_generic_device__ymfm_update_irq(runtime, asserted) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_update_irq"];
        (__L0 ? __L0(Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
    }
    function method_ym_generic_device__ymfm_set_busy_end(runtime, clocks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"], __L2 = __l["clock"], __L3 = __l["attotime::from_ticks"];
        members.m_busy_end = __add_ym_generic_device__ymfm_set_busy_end(runtime, ((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0), (__L3 ? __L3(clocks, (__L2 ? __L2() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", clocks, (__L2 ? __L2() : runtime.macro("clock")))));
    }
    function __add_ym_generic_device__ymfm_set_busy_end(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ym_generic_device__ymfm_is_busy(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().time"];
        return ((Number(((__L1 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0)) < Number((members.m_busy_end ?? 0))) ? 1 : 0);
    }
    function method_ym_generic_device__ymfm_external_read(runtime, type, address) {
        const members = runtime.members;
        return ((((((Number(type) !== Number(0)) ? 1 : 0)) ? (0) : (runtime.readIndex((members.m_io_read ?? 0), ((address) & (1)))()))) & 0xff);
    }
    function method_ym_generic_device__ymfm_external_write(runtime, type, address, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((Number(type) === Number(0)) ? 1 : 0)) {
            runtime.readIndex((members.m_io_write ?? 0), ((address) & (1)))(data);
        }
    }
    function method_ym_generic_device__fm_mode_write(runtime, param) {
        const members = runtime.members;
        (__deref_ym_generic_device__fm_mode_write(runtime, members.m_engine).engine_mode_write?.(param) ?? 0);
    }
    function __deref_ym_generic_device__fm_mode_write(runtime, p) {
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
    function method_ym_generic_device__fm_check_interrupts(runtime, param) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_ym_generic_device__fm_check_interrupts(runtime, members.m_engine), typeof __t0.engine_check_interrupts === 'function' ? __t0.engine_check_interrupts() : typeof __t0.engine_check_interrupts === 'number' || typeof __t0.engine_check_interrupts === 'boolean' ? __t0.engine_check_interrupts : runtime.container(members.m_engine, "engine_check_interrupts"));
    }
    function __deref_ym_generic_device__fm_check_interrupts(runtime, p) {
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
    function method_ym_generic_device__fm_timer_handler(runtime, param) {
        const members = runtime.members;
        (__deref_ym_generic_device__fm_timer_handler(runtime, members.m_engine).engine_timer_expired?.(param) ?? 0);
    }
    function __deref_ym_generic_device__fm_timer_handler(runtime, p) {
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
    function method_ymfm_device_base(runtime, mconfig, tag, owner, clock, type) {
        const members = runtime.members;
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        return (((__deref_read(runtime, method_update_streams(runtime)).read?.(offset) ?? 0)) & 0xff);
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
    function method_update_streams(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_update_streams(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        return (members.m_chip ?? 0);
    }
    function __deref_update_streams(runtime, p) {
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
    function method_status_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_status_r(runtime, method_update_streams(runtime)), typeof __t0.read_status === 'function' ? (__t0.read_status() ?? 0) : runtime.container(method_update_streams(runtime), "read_status"))) & 0xff);
    }
    function __deref_status_r(runtime, p) {
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
        (__deref_write(runtime, method_update_streams(runtime)).write?.(offset, data) ?? 0);
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
    function method_address_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_address_w(runtime, method_update_streams(runtime)).write_address?.(data) ?? 0);
    }
    function __deref_address_w(runtime, p) {
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
    function method_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_data_w(runtime, method_update_streams(runtime)).write_data?.(data) ?? 0);
    }
    function __deref_data_w(runtime, p) {
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
    function method_device_reset(runtime) {
        const members = runtime.members;
        (members.m_chip.reset?.() ?? 0);
    }
    function method_device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        if ((((members.m_stream ?? 0)) ? 1 : 0)) {
            (__deref_device_clock_changed(runtime, members.m_stream).set_sample_rate?.((members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) ?? 0);
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
    function method_device_pre_save(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["emu_fatalerror"], __L1 = __l["__throw"];
        const h_m_save_blob = members.m_save_blob ?? 0;
        let orig_size = (members.m_save_blob).length;
        let state = runtime.invoke("new::ymfm_saved_state", h_m_save_blob, 1);
        (members.m_chip.save_restore?.(state) ?? 0);
        if (((Number((members.m_save_blob).length) !== Number(orig_size)) ? 1 : 0)) {
            (__L1 ? __L1((__L0 ? __L0("State size changed for ymfm chip") : runtime.macro("emu_fatalerror", "State size changed for ymfm chip"))) : runtime.macro("__throw", (__L0 ? __L0("State size changed for ymfm chip") : runtime.macro("emu_fatalerror", "State size changed for ymfm chip"))));
        }
    }
    function method_device_post_load(runtime) {
        const members = runtime.members;
        const h_m_save_blob = members.m_save_blob ?? 0;
        let state = runtime.invoke("new::ymfm_saved_state", h_m_save_blob, 0);
        (members.m_chip.save_restore?.(state) ?? 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        method_update_internal(runtime, stream);
    }
    function method_update_internal(runtime, stream, output_shift = 0) {
        const members = runtime.members;
        let __t0, __t1;
        const h___local_update_internal_output = members.__local_update_internal_output ?? 0;
        let MAX_SAMPLES = ((256) | 0);
        let output = h___local_update_internal_output;
        let outcount = ((cppMin(+((__t0 = __deref_update_internal(runtime, stream), typeof __t0.output_count === 'function' ? __t0.output_count() : typeof __t0.output_count === 'number' || typeof __t0.output_count === 'boolean' ? __t0.output_count : runtime.container(stream, "output_count"))), +(((((runtime.readIndex(output, 0).data)?.length ?? 0)) >>> 0)))) | 0);
        let numsamples = (((__t1 = __deref_update_internal(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples"))) | 0);
        for (let sampindex = ((0) | 0); (((sampindex) < (numsamples)) ? 1 : 0); sampindex = ((((sampindex) + (MAX_SAMPLES))) | 0)) {
            let cursamples = ((cppMin(+(((numsamples) - (sampindex))), +(MAX_SAMPLES))) | 0);
            (members.m_chip.generate?.(output, cursamples) ?? 0);
            for (let outnum = ((0) | 0); (((outnum) < (outcount)) ? 1 : 0); outnum = ((((outnum) + (1))) | 0)) {
                let eff_outnum = ((((((outnum) + (output_shift))) % (1))) | 0);
                for (let index = ((0) | 0); (((index) < (cursamples)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
                    (__deref_update_internal(runtime, stream).put_int?.(eff_outnum, ((sampindex) + (index)), runtime.readIndex(runtime.readIndex(output, index).data, outnum), 32768) ?? 0);
                }
            }
        }
    }
    function __deref_update_internal(runtime, p) {
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
    function method_ymfm_device_base__update_internal(runtime, stream, output_shift = 0) {
        const members = runtime.members;
        let __t0, __t1;
        const h___local_ymfm_device_base_update_internal_output = members.__local_ymfm_device_base_update_internal_output ?? 0;
        let MAX_SAMPLES = ((256) | 0);
        let output = h___local_ymfm_device_base_update_internal_output;
        let outcount = ((cppMin(+((__t0 = __deref_ymfm_device_base__update_internal(runtime, stream), typeof __t0.output_count === 'function' ? __t0.output_count() : typeof __t0.output_count === 'number' || typeof __t0.output_count === 'boolean' ? __t0.output_count : runtime.container(stream, "output_count"))), +(((((runtime.readIndex(output, 0).data)?.length ?? 0)) >>> 0)))) | 0);
        let numsamples = (((__t1 = __deref_ymfm_device_base__update_internal(runtime, stream), typeof __t1.samples === 'function' ? __t1.samples() : typeof __t1.samples === 'number' || typeof __t1.samples === 'boolean' ? __t1.samples : runtime.container(stream, "samples"))) | 0);
        for (let sampindex = ((0) | 0); (((sampindex) < (numsamples)) ? 1 : 0); sampindex = ((((sampindex) + (MAX_SAMPLES))) | 0)) {
            let cursamples = ((cppMin(+(((numsamples) - (sampindex))), +(MAX_SAMPLES))) | 0);
            (members.m_chip.generate?.(output, cursamples) ?? 0);
            for (let outnum = ((0) | 0); (((outnum) < (outcount)) ? 1 : 0); outnum = ((((outnum) + (1))) | 0)) {
                let eff_outnum = ((((((outnum) + (output_shift))) % (1))) | 0);
                for (let index = ((0) | 0); (((index) < (cursamples)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
                    (__deref_ymfm_device_base__update_internal(runtime, stream).put_int?.(eff_outnum, ((sampindex) + (index)), runtime.readIndex(runtime.readIndex(output, index).data, outnum), 32768) ?? 0);
                }
            }
        }
    }
    function __deref_ymfm_device_base__update_internal(runtime, p) {
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
    function method_ymfm_device_base__ymfm_device_base(runtime, mconfig, tag, owner, clock, type) {
        const members = runtime.members;
    }
    function method_ymfm_device_base__read(runtime, offset) {
        const members = runtime.members;
        return (((__deref_ymfm_device_base__read(runtime, method_update_streams(runtime)).read?.(offset) ?? 0)) & 0xff);
    }
    function __deref_ymfm_device_base__read(runtime, p) {
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
    function method_ymfm_device_base__status_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_ymfm_device_base__status_r(runtime, method_update_streams(runtime)), typeof __t0.read_status === 'function' ? (__t0.read_status() ?? 0) : runtime.container(method_update_streams(runtime), "read_status"))) & 0xff);
    }
    function __deref_ymfm_device_base__status_r(runtime, p) {
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
    function method_ymfm_device_base__write(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_ymfm_device_base__write(runtime, method_update_streams(runtime)).write?.(offset, data) ?? 0);
    }
    function __deref_ymfm_device_base__write(runtime, p) {
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
    function method_ymfm_device_base__address_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_ymfm_device_base__address_w(runtime, method_update_streams(runtime)).write_address?.(data) ?? 0);
    }
    function __deref_ymfm_device_base__address_w(runtime, p) {
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
    function method_ymfm_device_base__data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_ymfm_device_base__data_w(runtime, method_update_streams(runtime)).write_data?.(data) ?? 0);
    }
    function __deref_ymfm_device_base__data_w(runtime, p) {
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
    function method_ymfm_device_base__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        const h_m_save_blob = members.m_save_blob ?? 0;
        method_ym_generic_device__device_start(runtime);
        members.m_stream = (__L1 ? __L1(0, 1, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) : runtime.macro("stream_alloc", 0, 1, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)));
        let state = runtime.invoke("new::ymfm_saved_state", h_m_save_blob, 1);
        (members.m_chip.save_restore?.(state) ?? 0);
        (__L3 ? __L3((__L2 ? __L2(h_m_save_blob) : runtime.macro("NAME", h_m_save_blob))) : runtime.macro("save_item", (__L2 ? __L2(h_m_save_blob) : runtime.macro("NAME", h_m_save_blob))));
    }
    function method_ymfm_device_base__device_reset(runtime) {
        const members = runtime.members;
        (members.m_chip.reset?.() ?? 0);
    }
    function method_ymfm_device_base__device_clock_changed(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"];
        if ((((members.m_stream ?? 0)) ? 1 : 0)) {
            (__deref_ymfm_device_base__device_clock_changed(runtime, members.m_stream).set_sample_rate?.((members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) ?? 0);
        }
    }
    function __deref_ymfm_device_base__device_clock_changed(runtime, p) {
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
    function method_ymfm_device_base__device_pre_save(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["emu_fatalerror"], __L1 = __l["__throw"];
        const h_m_save_blob = members.m_save_blob ?? 0;
        let orig_size = (members.m_save_blob).length;
        let state = runtime.invoke("new::ymfm_saved_state", h_m_save_blob, 1);
        (members.m_chip.save_restore?.(state) ?? 0);
        if (((Number((members.m_save_blob).length) !== Number(orig_size)) ? 1 : 0)) {
            (__L1 ? __L1((__L0 ? __L0("State size changed for ymfm chip") : runtime.macro("emu_fatalerror", "State size changed for ymfm chip"))) : runtime.macro("__throw", (__L0 ? __L0("State size changed for ymfm chip") : runtime.macro("emu_fatalerror", "State size changed for ymfm chip"))));
        }
    }
    function method_ymfm_device_base__device_post_load(runtime) {
        const members = runtime.members;
        const h_m_save_blob = members.m_save_blob ?? 0;
        let state = runtime.invoke("new::ymfm_saved_state", h_m_save_blob, 0);
        (members.m_chip.save_restore?.(state) ?? 0);
    }
    function method_ymfm_device_base__sound_stream_update(runtime, stream) {
        const members = runtime.members;
        method_update_internal(runtime, stream);
    }
    function method_ymfm_device_base__update_streams(runtime) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_ymfm_device_base__update_streams(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        return (members.m_chip ?? 0);
    }
    function __deref_ymfm_device_base__update_streams(runtime, p) {
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
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["__builtin_clz"];
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
    }
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_update_streams_(runtime, __assigned) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_update_streams_(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_chip = __assigned;
        return (members.m_chip ?? 0);
    }
    function __deref_update_streams_(runtime, p) {
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
    function method_ymfm_device_base__update_streams_(runtime, __assigned) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_ymfm_device_base__update_streams_(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
        members.m_chip = __assigned;
        return (members.m_chip ?? 0);
    }
    function __deref_ymfm_device_base__update_streams_(runtime, p) {
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
        "ymfm_sync_mode_write": method_ymfm_sync_mode_write,
        "ymfm_set_timer": method_ymfm_set_timer,
        "ymfm_set_busy_end": method_ymfm_set_busy_end,
        "ymfm_is_busy": method_ymfm_is_busy,
        "ymfm_update_irq": method_ymfm_update_irq,
        "ymfm_external_read": method_ymfm_external_read,
        "ymfm_external_write": method_ymfm_external_write,
        "ymfm_interface::ymfm_sync_mode_write": method_ymfm_interface__ymfm_sync_mode_write,
        "ymfm_interface::ymfm_sync_check_interrupts": method_ymfm_interface__ymfm_sync_check_interrupts,
        "ymfm_interface::ymfm_set_timer": method_ymfm_interface__ymfm_set_timer,
        "ymfm_interface::ymfm_set_busy_end": method_ymfm_interface__ymfm_set_busy_end,
        "ymfm_interface::ymfm_is_busy": method_ymfm_interface__ymfm_is_busy,
        "ymfm_interface::ymfm_update_irq": method_ymfm_interface__ymfm_update_irq,
        "ymfm_interface::ymfm_external_read": method_ymfm_interface__ymfm_external_read,
        "ymfm_interface::ymfm_external_write": method_ymfm_interface__ymfm_external_write,
        "irq_handler": method_irq_handler,
        "io_read_handler": method_io_read_handler,
        "io_write_handler": method_io_write_handler,
        "device_start": method_device_start,
        "ym_generic_device::device_start": method_ym_generic_device__device_start,
        "fm_mode_write": method_fm_mode_write,
        "fm_check_interrupts": method_fm_check_interrupts,
        "fm_timer_handler": method_fm_timer_handler,
        "ym_generic_device::irq_handler": method_ym_generic_device__irq_handler,
        "ym_generic_device::io_read_handler": method_ym_generic_device__io_read_handler,
        "ym_generic_device::io_write_handler": method_ym_generic_device__io_write_handler,
        "ym_generic_device::ymfm_sync_mode_write": method_ym_generic_device__ymfm_sync_mode_write,
        "ym_generic_device::ymfm_set_timer": method_ym_generic_device__ymfm_set_timer,
        "ym_generic_device::ymfm_update_irq": method_ym_generic_device__ymfm_update_irq,
        "ym_generic_device::ymfm_set_busy_end": method_ym_generic_device__ymfm_set_busy_end,
        "ym_generic_device::ymfm_is_busy": method_ym_generic_device__ymfm_is_busy,
        "ym_generic_device::ymfm_external_read": method_ym_generic_device__ymfm_external_read,
        "ym_generic_device::ymfm_external_write": method_ym_generic_device__ymfm_external_write,
        "ym_generic_device::fm_mode_write": method_ym_generic_device__fm_mode_write,
        "ym_generic_device::fm_check_interrupts": method_ym_generic_device__fm_check_interrupts,
        "ym_generic_device::fm_timer_handler": method_ym_generic_device__fm_timer_handler,
        "ymfm_device_base": method_ymfm_device_base,
        "read": method_read,
        "update_streams": method_update_streams,
        "status_r": method_status_r,
        "write": method_write,
        "address_w": method_address_w,
        "data_w": method_data_w,
        "device_reset": method_device_reset,
        "device_clock_changed": method_device_clock_changed,
        "device_pre_save": method_device_pre_save,
        "device_post_load": method_device_post_load,
        "sound_stream_update": method_sound_stream_update,
        "update_internal": method_update_internal,
        "ymfm_device_base::update_internal": method_ymfm_device_base__update_internal,
        "ymfm_device_base::ymfm_device_base": method_ymfm_device_base__ymfm_device_base,
        "ymfm_device_base::read": method_ymfm_device_base__read,
        "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
        "ymfm_device_base::write": method_ymfm_device_base__write,
        "ymfm_device_base::address_w": method_ymfm_device_base__address_w,
        "ymfm_device_base::data_w": method_ymfm_device_base__data_w,
        "ymfm_device_base::device_start": method_ymfm_device_base__device_start,
        "ymfm_device_base::device_reset": method_ymfm_device_base__device_reset,
        "ymfm_device_base::device_clock_changed": method_ymfm_device_base__device_clock_changed,
        "ymfm_device_base::device_pre_save": method_ymfm_device_base__device_pre_save,
        "ymfm_device_base::device_post_load": method_ymfm_device_base__device_post_load,
        "ymfm_device_base::sound_stream_update": method_ymfm_device_base__sound_stream_update,
        "ymfm_device_base::update_streams": method_ymfm_device_base__update_streams,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "update_streams=": method_update_streams_,
        "ymfm_device_base::update_streams=": method_ymfm_device_base__update_streams_
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "__builtin_clz", "__throw", "attotime::from_ticks", "clock", "emu_fatalerror", "m_update_irq", "machine", "machine().time", "save_item", "stream_alloc"];
definition.allocations["ym3526"].compiledMethods = (() => {
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
    function method_reset(runtime) {
        const members = runtime.members;
        (members.m_fm.reset?.() ?? 0);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_address ?? 0)) ?? 0);
        (members.m_fm.save_restore?.(state) ?? 0);
    }
    function __deref_save_restore(runtime, p) {
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
    function method_read_status(runtime) {
        const members = runtime.members;
        return (((((members.m_fm.status?.() ?? 0)) | (6))) & 0xff);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let result = ((255) & 0xff);
        switch (((offset) & (1))) {
            case 0:
                {
                    result = ((method_read_status(runtime)) & 0xff);
                    break;
                }
            case 1:
                {
                    break;
                }
        }
        return ((result) & 0xff);
    }
    function method_write_address(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_write_address(runtime, (members.m_fm.intf?.() ?? 0)).ymfm_set_busy_end?.(((12) * ((members.m_fm.clock_prescale?.() ?? 0)))) ?? 0);
        members.m_address = ((data) & 0xff);
    }
    function __deref_write_address(runtime, p) {
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
    function method_write_data(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_write_data(runtime, (members.m_fm.intf?.() ?? 0)).ymfm_set_busy_end?.(((84) * ((members.m_fm.clock_prescale?.() ?? 0)))) ?? 0);
        (members.m_fm.write?.((members.m_address ?? 0), data) ?? 0);
    }
    function __deref_write_data(runtime, p) {
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
        switch (((offset) & (1))) {
            case 0:
                {
                    method_write_address(runtime, data);
                    break;
                }
            case 1:
                {
                    method_write_data(runtime, data);
                    break;
                }
        }
    }
    function method_generate(runtime, output, numsamples = 1) {
        const members = runtime.members;
        let __t0, __t1;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_generate(runtime, output, 1)) {
            (members.m_fm.clock?.(511) ?? 0);
            (members.m_fm.output?.((__t0 = __deref_generate(runtime, output), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(output, "clear")), 1, 32767, 511) ?? 0);
            (__t1 = __deref_generate(runtime, output), typeof __t1.roundtrip_fp === 'function' ? __t1.roundtrip_fp() : typeof __t1.roundtrip_fp === 'number' || typeof __t1.roundtrip_fp === 'boolean' ? __t1.roundtrip_fp : runtime.container(output, "roundtrip_fp"));
        }
    }
    function __add_generate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_generate(runtime, p) {
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
    function method_sample_rate(runtime, input_clock) {
        const members = runtime.members;
        return (((members.m_fm.sample_rate?.(input_clock) ?? 0)) >>> 0);
    }
    function method_invalidate_caches(runtime) {
        const members = runtime.members;
        (members.m_fm.invalidate_caches?.() ?? 0);
    }
    function method_ym3526__sample_rate(runtime, input_clock) {
        const members = runtime.members;
        return (((members.m_fm.sample_rate?.(input_clock) ?? 0)) >>> 0);
    }
    function method_ym3526__invalidate_caches(runtime) {
        const members = runtime.members;
        (members.m_fm.invalidate_caches?.() ?? 0);
    }
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        let count = ((0) & 0xff);
        for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
            value = ((((value) << (1))) >>> 0);
        }
        return count;
    }
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method___construct(runtime, intf) {
        const members = runtime.members;
        members.m_address = ((0) & 0xff);
        members.m_fm = runtime.invoke("new::fm_engine_base__opl_registers", intf);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "reset": method_reset,
        "save_restore": method_save_restore,
        "read_status": method_read_status,
        "read": method_read,
        "write_address": method_write_address,
        "write_data": method_write_data,
        "write": method_write,
        "generate": method_generate,
        "sample_rate": method_sample_rate,
        "invalidate_caches": method_invalidate_caches,
        "ym3526::sample_rate": method_ym3526__sample_rate,
        "ym3526::invalidate_caches": method_ym3526__invalidate_caches,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].compiledMethods = (() => {
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
    function method_reset(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_operator = members.m_operator ?? 0;
        method_set_reset_status(runtime, 0, 255);
        (__t0 = __deref_reset(runtime, members.m_regs), typeof __t0.reset === 'function' ? __t0.reset() : typeof __t0.reset === 'number' || typeof __t0.reset === 'boolean' ? __t0.reset : runtime.container(members.m_regs, "reset"));
        method_write(runtime, 4, 0);
        for (let __range0 = h_m_channel, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__t1 = __deref_reset(runtime, __range0_item), typeof __t1.reset === 'function' ? (__t1.reset() ?? 0) : runtime.container(__range0_item, "reset"));
        }
        for (let __range0 = h_m_operator, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__t2 = __deref_reset(runtime, __range0_item), typeof __t2.reset === 'function' ? (__t2.reset() ?? 0) : runtime.container(__range0_item, "reset"));
        }
    }
    function __deref_reset(runtime, p) {
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
    function method_set_reset_status(runtime, set, reset) {
        const members = runtime.members;
        let __t0;
        set = ((set) & 0xff);
        reset = ((reset) & 0xff);
        members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (0)))))) & 0xff);
        (members.m_intf.ymfm_sync_check_interrupts?.() ?? 0);
        return (((((members.m_status ?? 0)) & ((~(__t0 = __deref_set_reset_status(runtime, members.m_regs), typeof __t0.status_mask === 'function' ? __t0.status_mask() : typeof __t0.status_mask === 'number' || typeof __t0.status_mask === 'boolean' ? __t0.status_mask : runtime.container(members.m_regs, "status_mask")))))) & 0xff);
    }
    function __deref_set_reset_status(runtime, p) {
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
    function method_write(runtime, regnum, data) {
        const members = runtime.members;
        regnum = ((regnum) & 0xffff);
        data = ((data) & 0xff);
        const h_m_channel = members.m_channel ?? 0;
        /* debug::log_fm_write: no effect */
        if (((Number(regnum) === Number(4)) ? 1 : 0)) {
            (members.m_intf.ymfm_sync_mode_write?.(data) ?? 0);
            return;
        }
        members.m_modified_channels = ((511) >>> 0);
        let keyon_channel = ((0) >>> 0);
        let keyon_opmask = ((0) >>> 0);
        if ((__deref_write(runtime, members.m_regs).write?.(regnum, data, ({ generatedLValue: true, get: () => keyon_channel, set: (value) => { keyon_channel = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => keyon_opmask, set: (value) => { keyon_opmask = ((value) >>> 0); } })) ?? 0)) {
            if (((Number(keyon_channel) < Number(9)) ? 1 : 0)) {
                (h_m_channel[keyon_channel].keyonoff?.(keyon_opmask, 0, keyon_channel) ?? 0);
            }
            else {
                if ((((1) && (((Number(keyon_channel) === Number(255)) ? 1 : 0))) ? 1 : 0)) {
                    (h_m_channel[6].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 4)) ? (3) : (0)), 1, 6) ?? 0);
                    (h_m_channel[7].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 0)) | (((method_bitfield(runtime, keyon_opmask, 3)) << (1)))), 1, 7) ?? 0);
                    (h_m_channel[8].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 2)) | (((method_bitfield(runtime, keyon_opmask, 1)) << (1)))), 1, 8) ?? 0);
                }
            }
        }
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
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_timer_running = members.m_timer_running ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_operator = members.m_operator ?? 0;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_env_counter ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_status ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_clock_prescale ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_irq_mask ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_irq_state ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_timer_running[0]) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_timer_running[1]) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_total_clocks ?? 0)) ?? 0);
        (__deref_save_restore(runtime, members.m_regs).save_restore?.(state) ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            (h_m_channel[chnum].save_restore?.(state) ?? 0);
        }
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number(18)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            (h_m_operator[opnum].save_restore?.(state) ?? 0);
        }
        method_invalidate_caches(runtime);
    }
    function __deref_save_restore(runtime, p) {
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
    function method_invalidate_caches(runtime) {
        const members = runtime.members;
        members.m_modified_channels = ((511) >>> 0);
    }
    function method_clock(runtime, chanmask) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_channel = members.m_channel ?? 0;
        members.m_total_clocks = ((((members.m_total_clocks) + (1))) & 0xff);
        if ((((((((members.m_modified_channels ?? 0)) !== (0)) ? 1 : 0)) || (((Number((__t0 = (members.m_prepare_count ?? 0), members.m_prepare_count = ((((members.m_prepare_count) + (1))) >>> 0), __t0)) >= Number(4096)) ? 1 : 0))) ? 1 : 0)) {
            if (0) {
                method_assign_operators(runtime);
            }
            members.m_active_channels = ((0) >>> 0);
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, chanmask, chnum)) {
                    if ((h_m_channel[chnum].prepare?.() ?? 0)) {
                        members.m_active_channels = ((((members.m_active_channels) | (((1) << (chnum))))) >>> 0);
                    }
                }
            }
            members.m_modified_channels = (((members.m_prepare_count = ((0) >>> 0))) >>> 0);
        }
        if (1) {
            members.m_env_counter = ((((members.m_env_counter) + (4))) >>> 0);
        }
        else {
            if (((Number(method_bitfield(runtime, (members.m_env_counter = ((((members.m_env_counter) + (1))) >>> 0)), 0, 2)) === Number(1)) ? 1 : 0)) {
                members.m_env_counter = ((((members.m_env_counter) + (3))) >>> 0);
            }
        }
        let lfo_raw_pm = (((__t1 = __deref_clock(runtime, members.m_regs), typeof __t1.clock_noise_and_lfo === 'function' ? __t1.clock_noise_and_lfo() : typeof __t1.clock_noise_and_lfo === 'number' || typeof __t1.clock_noise_and_lfo === 'boolean' ? __t1.clock_noise_and_lfo : runtime.container(members.m_regs, "clock_noise_and_lfo"))) | 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            if (method_bitfield(runtime, chanmask, chnum)) {
                (h_m_channel[chnum].clock?.((members.m_env_counter ?? 0), lfo_raw_pm) ?? 0);
            }
        }
        return (((members.m_env_counter ?? 0)) >>> 0);
    }
    function __deref_clock(runtime, p) {
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
    function method_assign_operators(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        const h_m_operator = members.m_operator ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        let map = (__L0 ? __L0("operator_mapping") : runtime.macro("STRUCT_OF", "operator_mapping"));
        (__deref_assign_operators(runtime, members.m_regs).operator_map?.(({ generatedLValue: true, get: () => map, set: (value) => { map = value; } })) ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            for (let index = ((0) >>> 0); (((index) < (4)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                let opnum = ((method_bitfield(runtime, runtime.readIndex(map.chan, chnum), ((8) * (index)), 8)) >>> 0);
                (h_m_channel[chnum].assign?.(index, (((((opnum) === (255)) ? 1 : 0)) ? (0) : (h_m_operator[opnum]))) ?? 0);
            }
        }
    }
    function __deref_assign_operators(runtime, p) {
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
    function method_output(runtime, output, rshift, clipmax, chanmask) {
        const members = runtime.members;
        let __t0;
        const h_m_operator = members.m_operator ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        chanmask = ((((chanmask) & (4294967295))) >>> 0);
        if (1) {
            chanmask = ((((chanmask) & ((members.m_active_channels ?? 0)))) >>> 0);
        }
        if ((__t0 = __deref_output(runtime, members.m_regs), typeof __t0.rhythm_enable === 'function' ? __t0.rhythm_enable() : typeof __t0.rhythm_enable === 'number' || typeof __t0.rhythm_enable === 'boolean' ? __t0.rhythm_enable : runtime.container(members.m_regs, "rhythm_enable"))) {
            let op13phase = (((h_m_operator[13].phase?.() ?? 0)) >>> 0);
            let op17phase = (((h_m_operator[17].phase?.() ?? 0)) >>> 0);
            let phase_select = ((((((((method_bitfield(runtime, op13phase, 2)) ^ (method_bitfield(runtime, op13phase, 7)))) | (method_bitfield(runtime, op13phase, 3)))) | (((method_bitfield(runtime, op17phase, 5)) ^ (method_bitfield(runtime, op17phase, 3)))))) >>> 0);
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, chanmask, chnum)) {
                    if ((((chnum) === (6)) ? 1 : 0)) {
                        (h_m_channel[chnum].output_rhythm_ch6?.(output, rshift, clipmax) ?? 0);
                    }
                    else {
                        if ((((chnum) === (7)) ? 1 : 0)) {
                            (h_m_channel[chnum].output_rhythm_ch7?.(phase_select, output, rshift, clipmax) ?? 0);
                        }
                        else {
                            if ((((chnum) === (8)) ? 1 : 0)) {
                                (h_m_channel[chnum].output_rhythm_ch8?.(phase_select, output, rshift, clipmax) ?? 0);
                            }
                            else {
                                if ((h_m_channel[chnum].is4op?.() ?? 0)) {
                                    (h_m_channel[chnum].output_4op?.(output, rshift, clipmax) ?? 0);
                                }
                                else {
                                    (h_m_channel[chnum].output_2op?.(output, rshift, clipmax) ?? 0);
                                }
                            }
                        }
                    }
                }
            }
        }
        else {
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, chanmask, chnum)) {
                    if ((h_m_channel[chnum].is4op?.() ?? 0)) {
                        (h_m_channel[chnum].output_4op?.(output, rshift, clipmax) ?? 0);
                    }
                    else {
                        (h_m_channel[chnum].output_2op?.(output, rshift, clipmax) ?? 0);
                    }
                }
            }
        }
    }
    function __deref_output(runtime, p) {
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
    function method_status(runtime) {
        const members = runtime.members;
        let __t0;
        return (((((((members.m_status ?? 0)) & (-1))) & ((~(__t0 = __deref_status(runtime, members.m_regs), typeof __t0.status_mask === 'function' ? __t0.status_mask() : typeof __t0.status_mask === 'number' || typeof __t0.status_mask === 'boolean' ? __t0.status_mask : runtime.container(members.m_regs, "status_mask")))))) & 0xff);
    }
    function __deref_status(runtime, p) {
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
    function method_update_timer(runtime, tnum, enable, delta_clocks) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_timer_running = members.m_timer_running ?? 0;
        if ((((enable) && (((h_m_timer_running[tnum]) ? 0 : 1))) ? 1 : 0)) {
            let period = (((((((tnum) === (0)) ? 1 : 0)) ? (runtime.subtract(1024, (__t0 = __deref_update_timer(runtime, members.m_regs), typeof __t0.timer_a_value === 'function' ? __t0.timer_a_value() : typeof __t0.timer_a_value === 'number' || typeof __t0.timer_a_value === 'boolean' ? __t0.timer_a_value : runtime.container(members.m_regs, "timer_a_value")))) : (((16) * (runtime.subtract(256, (__t1 = __deref_update_timer(runtime, members.m_regs), typeof __t1.timer_b_value === 'function' ? __t1.timer_b_value() : typeof __t1.timer_b_value === 'number' || typeof __t1.timer_b_value === 'boolean' ? __t1.timer_b_value : runtime.container(members.m_regs, "timer_b_value")))))))) >>> 0);
            period = ((((period) + (delta_clocks))) >>> 0);
            (members.m_intf.ymfm_set_timer?.(tnum, ((((period) * (18))) * ((members.m_clock_prescale ?? 0)))) ?? 0);
            h_m_timer_running[tnum] = 1;
        }
        else {
            if (((enable) ? 0 : 1)) {
                (members.m_intf.ymfm_set_timer?.(tnum, -1) ?? 0);
                h_m_timer_running[tnum] = 0;
            }
        }
    }
    function __deref_update_timer(runtime, p) {
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
    function method_engine_timer_expired(runtime, tnum) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_timer_running = members.m_timer_running ?? 0;
        if (((((((tnum) === (0)) ? 1 : 0)) && ((__t0 = __deref_engine_timer_expired(runtime, members.m_regs), typeof __t0.enable_timer_a === 'function' ? __t0.enable_timer_a() : typeof __t0.enable_timer_a === 'number' || typeof __t0.enable_timer_a === 'boolean' ? __t0.enable_timer_a : runtime.container(members.m_regs, "enable_timer_a")))) ? 1 : 0)) {
            method_set_reset_status(runtime, 64, 0);
        }
        else {
            if (((((((tnum) === (1)) ? 1 : 0)) && ((__t1 = __deref_engine_timer_expired(runtime, members.m_regs), typeof __t1.enable_timer_b === 'function' ? __t1.enable_timer_b() : typeof __t1.enable_timer_b === 'number' || typeof __t1.enable_timer_b === 'boolean' ? __t1.enable_timer_b : runtime.container(members.m_regs, "enable_timer_b")))) ? 1 : 0)) {
                method_set_reset_status(runtime, 32, 0);
            }
        }
        if (((((((tnum) === (0)) ? 1 : 0)) && ((__t2 = __deref_engine_timer_expired(runtime, members.m_regs), typeof __t2.csm === 'function' ? __t2.csm() : typeof __t2.csm === 'number' || typeof __t2.csm === 'boolean' ? __t2.csm : runtime.container(members.m_regs, "csm")))) ? 1 : 0)) {
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, 511, chnum)) {
                    (h_m_channel[chnum].keyonoff?.(15, 2, chnum) ?? 0);
                    members.m_modified_channels = ((((members.m_modified_channels) | (((1) << (chnum))))) >>> 0);
                }
            }
        }
        h_m_timer_running[tnum] = 0;
        method_update_timer(runtime, tnum, 1, 0);
    }
    function __deref_engine_timer_expired(runtime, p) {
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
    function method_engine_check_interrupts(runtime) {
        const members = runtime.members;
        let __t0;
        let old_state = (((members.m_irq_state ?? 0)) & 0xff);
        members.m_irq_state = ((((Number((((((members.m_status ?? 0)) & ((members.m_irq_mask ?? 0)))) & ((~(__t0 = __deref_engine_check_interrupts(runtime, members.m_regs), typeof __t0.status_mask === 'function' ? __t0.status_mask() : typeof __t0.status_mask === 'number' || typeof __t0.status_mask === 'boolean' ? __t0.status_mask : runtime.container(members.m_regs, "status_mask")))))) !== Number(0)) ? 1 : 0)) & 0xff);
        if ((members.m_irq_state ?? 0)) {
            members.m_status = ((((members.m_status) | (128))) & 0xff);
        }
        else {
            members.m_status = ((((members.m_status) & (-129))) & 0xff);
        }
        if ((((old_state) !== ((members.m_irq_state ?? 0))) ? 1 : 0)) {
            (members.m_intf.ymfm_update_irq?.((((members.m_irq_state ?? 0)) ? (1) : (0))) ?? 0);
        }
    }
    function __deref_engine_check_interrupts(runtime, p) {
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
    function method_engine_mode_write(runtime, data) {
        const members = runtime.members;
        let __t0, __t1, __t2, __t3, __t4;
        data = ((data) & 0xff);
        members.m_modified_channels = ((511) >>> 0);
        let dummy1 = ((0) >>> 0);
        let dummy2 = ((0) >>> 0);
        (__deref_engine_mode_write(runtime, members.m_regs).write?.(4, data, ({ generatedLValue: true, get: () => dummy1, set: (value) => { dummy1 = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => dummy2, set: (value) => { dummy2 = ((value) >>> 0); } })) ?? 0);
        if ((__t0 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t0.irq_reset === 'function' ? __t0.irq_reset() : typeof __t0.irq_reset === 'number' || typeof __t0.irq_reset === 'boolean' ? __t0.irq_reset : runtime.container(members.m_regs, "irq_reset"))) {
            method_set_reset_status(runtime, 0, 120);
        }
        else {
            let reset_mask = ((0) & 0xff);
            if ((__t1 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t1.reset_timer_b === 'function' ? __t1.reset_timer_b() : typeof __t1.reset_timer_b === 'number' || typeof __t1.reset_timer_b === 'boolean' ? __t1.reset_timer_b : runtime.container(members.m_regs, "reset_timer_b"))) {
                reset_mask = ((((reset_mask) | (32))) & 0xff);
            }
            if ((__t2 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t2.reset_timer_a === 'function' ? __t2.reset_timer_a() : typeof __t2.reset_timer_a === 'number' || typeof __t2.reset_timer_a === 'boolean' ? __t2.reset_timer_a : runtime.container(members.m_regs, "reset_timer_a"))) {
                reset_mask = ((((reset_mask) | (64))) & 0xff);
            }
            method_set_reset_status(runtime, 0, reset_mask);
            method_update_timer(runtime, 1, (__t3 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t3.load_timer_b === 'function' ? __t3.load_timer_b() : typeof __t3.load_timer_b === 'number' || typeof __t3.load_timer_b === 'boolean' ? __t3.load_timer_b : runtime.container(members.m_regs, "load_timer_b")), (-(((members.m_total_clocks ?? 0)) & (15))));
            method_update_timer(runtime, 0, (__t4 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t4.load_timer_a === 'function' ? __t4.load_timer_a() : typeof __t4.load_timer_a === 'number' || typeof __t4.load_timer_a === 'boolean' ? __t4.load_timer_a : runtime.container(members.m_regs, "load_timer_a")), 0);
        }
    }
    function __deref_engine_mode_write(runtime, p) {
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
    function method_set_irq_mask(runtime, mask) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        members.m_irq_mask = ((mask) & 0xff);
        (members.m_intf.ymfm_sync_check_interrupts?.() ?? 0);
    }
    function method_clock_prescale(runtime) {
        const members = runtime.members;
        return (((members.m_clock_prescale ?? 0)) >>> 0);
    }
    function method_set_clock_prescale(runtime, prescale) {
        const members = runtime.members;
        members.m_clock_prescale = ((prescale) & 0xff);
    }
    function method_sample_rate(runtime, baseclock) {
        const members = runtime.members;
        return ((runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (18)))) >>> 0);
    }
    function method_intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_debug_channel(runtime, index) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[index];
    }
    function method_debug_operator(runtime, index) {
        const members = runtime.members;
        const h_m_operator = members.m_operator ?? 0;
        return h_m_operator[index];
    }
    function method_fm_engine_base__set_reset_status(runtime, set, reset) {
        const members = runtime.members;
        let __t0;
        set = ((set) & 0xff);
        reset = ((reset) & 0xff);
        members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (0)))))) & 0xff);
        (members.m_intf.ymfm_sync_check_interrupts?.() ?? 0);
        return (((((members.m_status ?? 0)) & ((~(__t0 = __deref_fm_engine_base__set_reset_status(runtime, members.m_regs), typeof __t0.status_mask === 'function' ? __t0.status_mask() : typeof __t0.status_mask === 'number' || typeof __t0.status_mask === 'boolean' ? __t0.status_mask : runtime.container(members.m_regs, "status_mask")))))) & 0xff);
    }
    function __deref_fm_engine_base__set_reset_status(runtime, p) {
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
    function method_fm_engine_base__set_irq_mask(runtime, mask) {
        const members = runtime.members;
        mask = ((mask) & 0xff);
        members.m_irq_mask = ((mask) & 0xff);
        (members.m_intf.ymfm_sync_check_interrupts?.() ?? 0);
    }
    function method_fm_engine_base__clock_prescale(runtime) {
        const members = runtime.members;
        return (((members.m_clock_prescale ?? 0)) >>> 0);
    }
    function method_fm_engine_base__set_clock_prescale(runtime, prescale) {
        const members = runtime.members;
        members.m_clock_prescale = ((prescale) & 0xff);
    }
    function method_fm_engine_base__sample_rate(runtime, baseclock) {
        const members = runtime.members;
        return ((runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (18)))) >>> 0);
    }
    function method_fm_engine_base__intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_fm_engine_base__regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_fm_engine_base__invalidate_caches(runtime) {
        const members = runtime.members;
        members.m_modified_channels = ((511) >>> 0);
    }
    function method_fm_engine_base__debug_channel(runtime, index) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        return h_m_channel[index];
    }
    function method_fm_engine_base__debug_operator(runtime, index) {
        const members = runtime.members;
        const h_m_operator = members.m_operator ?? 0;
        return h_m_operator[index];
    }
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        let count = ((0) & 0xff);
        for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
            value = ((((value) << (1))) >>> 0);
        }
        return count;
    }
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_intf_(runtime, __assigned) {
        const members = runtime.members;
        members.m_intf = __assigned;
        return (members.m_intf ?? 0);
    }
    function method_regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method_fm_engine_base__intf_(runtime, __assigned) {
        const members = runtime.members;
        members.m_intf = __assigned;
        return (members.m_intf ?? 0);
    }
    function method_fm_engine_base__regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method___construct(runtime, intf) {
        const members = runtime.members;
        const h_m_timer_running = members.m_timer_running ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_operator = members.m_operator ?? 0;
        members.m_intf = intf;
        members.m_env_counter = ((0) >>> 0);
        members.m_status = ((0) & 0xff);
        members.m_clock_prescale = ((4) & 0xff);
        members.m_irq_mask = ((96) & 0xff);
        members.m_irq_state = ((0) & 0xff);
        h_m_timer_running[0] = 0;
        h_m_timer_running[1] = 0;
        members.m_total_clocks = ((0) & 0xff);
        members.m_active_channels = ((511) >>> 0);
        members.m_modified_channels = ((511) >>> 0);
        members.m_prepare_count = ((0) >>> 0);
        (members.m_intf ?? 0).m_engine = (members.this ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            h_m_channel[chnum] = runtime.invoke("new::fm_channel__opl_registers", (members.this ?? 0), runtime.invoke("opl_registers::channel_offset", chnum));
        }
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number(18)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            h_m_operator[opnum] = runtime.invoke("new::fm_operator__opl_registers", (members.this ?? 0), runtime.invoke("opl_registers::operator_offset", opnum));
        }
        method_assign_operators(runtime);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "reset": method_reset,
        "set_reset_status": method_set_reset_status,
        "write": method_write,
        "bitfield": method_bitfield,
        "save_restore": method_save_restore,
        "invalidate_caches": method_invalidate_caches,
        "clock": method_clock,
        "assign_operators": method_assign_operators,
        "output": method_output,
        "status": method_status,
        "update_timer": method_update_timer,
        "engine_timer_expired": method_engine_timer_expired,
        "engine_check_interrupts": method_engine_check_interrupts,
        "engine_mode_write": method_engine_mode_write,
        "set_irq_mask": method_set_irq_mask,
        "clock_prescale": method_clock_prescale,
        "set_clock_prescale": method_set_clock_prescale,
        "sample_rate": method_sample_rate,
        "intf": method_intf,
        "regs": method_regs,
        "debug_channel": method_debug_channel,
        "debug_operator": method_debug_operator,
        "fm_engine_base::set_reset_status": method_fm_engine_base__set_reset_status,
        "fm_engine_base::set_irq_mask": method_fm_engine_base__set_irq_mask,
        "fm_engine_base::clock_prescale": method_fm_engine_base__clock_prescale,
        "fm_engine_base::set_clock_prescale": method_fm_engine_base__set_clock_prescale,
        "fm_engine_base::sample_rate": method_fm_engine_base__sample_rate,
        "fm_engine_base::intf": method_fm_engine_base__intf,
        "fm_engine_base::regs": method_fm_engine_base__regs,
        "fm_engine_base::invalidate_caches": method_fm_engine_base__invalidate_caches,
        "fm_engine_base::debug_channel": method_fm_engine_base__debug_channel,
        "fm_engine_base::debug_operator": method_fm_engine_base__debug_operator,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "intf=": method_intf_,
        "regs=": method_regs_,
        "fm_engine_base::intf=": method_fm_engine_base__intf_,
        "fm_engine_base::regs=": method_fm_engine_base__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].compiledMethodLinks = ["STRUCT_OF"];
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["opl_registers_base__1"].compiledMethods = (() => {
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
    function cppStruct_chan(a0) { this["chan"] = a0; }
    cppStruct_chan.prototype = cppStructPrototype;
    function method_status_mask(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 4, 0, 8)) & (120))) >>> 0);
    }
    function method_byte(runtime, offset, start, count, extra_offset = 0) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return method_bitfield(runtime, h_m_regdata[((offset) + (extra_offset))], start, count);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_irq_reset(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 4, 7, 1)) >>> 0);
    }
    function method_noise_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_rhythm_enable(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 5, 1)) >>> 0);
    }
    function method_op_ssg_eg_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_op_ssg_eg_mode(runtime, opoffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_operator_list(runtime, o1 = 255, o2 = 255, o3 = 255, o4 = 255) {
        const members = runtime.members;
        o1 = ((o1) & 0xff);
        o2 = ((o2) & 0xff);
        o3 = ((o3) & 0xff);
        o4 = ((o4) & 0xff);
        return ((((((((o1) | (((o2) << (8))))) | (((o3) << (16))))) | (((o4) << (24))))) >>> 0);
    }
    function method_effective_rate(runtime, rawrate, ksr) {
        const members = runtime.members;
        return (((((((rawrate) === (0)) ? 1 : 0)) ? (0) : (cppMin(+(((rawrate) + (ksr))), +(63))))) >>> 0);
    }
    function method_fm_registers_base__status_mask(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fm_registers_base__irq_reset(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fm_registers_base__noise_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fm_registers_base__rhythm_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fm_registers_base__op_ssg_eg_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fm_registers_base__op_ssg_eg_mode(runtime, opoffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fm_registers_base__operator_list(runtime, o1 = 255, o2 = 255, o3 = 255, o4 = 255) {
        const members = runtime.members;
        o1 = ((o1) & 0xff);
        o2 = ((o2) & 0xff);
        o3 = ((o3) & 0xff);
        o4 = ((o4) & 0xff);
        return ((((((((o1) | (((o2) << (8))))) | (((o3) << (16))))) | (((o4) << (24))))) >>> 0);
    }
    function method_fm_registers_base__effective_rate(runtime, rawrate, ksr) {
        const members = runtime.members;
        return (((((((rawrate) === (0)) ? 1 : 0)) ? (0) : (cppMin(+(((rawrate) + (ksr))), +(63))))) >>> 0);
    }
    function method_opl_registers_base(runtime) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        let wf0 = __addr_opl_registers_base(runtime, h_m_waveform[0], 0);
        let wf0$s = undefined, wf0$o = 0;
        if (ArrayBuffer.isView(wf0) || Array.isArray(wf0))
            wf0$s = wf0;
        else if (wf0 !== null && typeof wf0 === 'object' && wf0.generatedPointer === true && wf0.path === undefined && wf0.target === undefined && (ArrayBuffer.isView(wf0.source) || Array.isArray(wf0.source))) {
            wf0$s = wf0.source;
            wf0$o = wf0.offset;
        }
        let wf1 = __addr_opl_registers_base(runtime, h_m_waveform[((1) % (1))], 0);
        let wf1$s = undefined, wf1$o = 0;
        if (ArrayBuffer.isView(wf1) || Array.isArray(wf1))
            wf1$s = wf1;
        else if (wf1 !== null && typeof wf1 === 'object' && wf1.generatedPointer === true && wf1.path === undefined && wf1.target === undefined && (ArrayBuffer.isView(wf1.source) || Array.isArray(wf1.source))) {
            wf1$s = wf1.source;
            wf1$o = wf1.offset;
        }
        let wf2 = __addr_opl_registers_base(runtime, h_m_waveform[((2) % (1))], 0);
        let wf2$s = undefined, wf2$o = 0;
        if (ArrayBuffer.isView(wf2) || Array.isArray(wf2))
            wf2$s = wf2;
        else if (wf2 !== null && typeof wf2 === 'object' && wf2.generatedPointer === true && wf2.path === undefined && wf2.target === undefined && (ArrayBuffer.isView(wf2.source) || Array.isArray(wf2.source))) {
            wf2$s = wf2.source;
            wf2$o = wf2.offset;
        }
        let wf3 = __addr_opl_registers_base(runtime, h_m_waveform[((3) % (1))], 0);
        let wf3$s = undefined, wf3$o = 0;
        if (ArrayBuffer.isView(wf3) || Array.isArray(wf3))
            wf3$s = wf3;
        else if (wf3 !== null && typeof wf3 === 'object' && wf3.generatedPointer === true && wf3.path === undefined && wf3.target === undefined && (ArrayBuffer.isView(wf3.source) || Array.isArray(wf3.source))) {
            wf3$s = wf3.source;
            wf3$o = wf3.offset;
        }
        let wf4 = __addr_opl_registers_base(runtime, h_m_waveform[((4) % (1))], 0);
        let wf4$s = undefined, wf4$o = 0;
        if (ArrayBuffer.isView(wf4) || Array.isArray(wf4))
            wf4$s = wf4;
        else if (wf4 !== null && typeof wf4 === 'object' && wf4.generatedPointer === true && wf4.path === undefined && wf4.target === undefined && (ArrayBuffer.isView(wf4.source) || Array.isArray(wf4.source))) {
            wf4$s = wf4.source;
            wf4$o = wf4.offset;
        }
        let wf5 = __addr_opl_registers_base(runtime, h_m_waveform[((5) % (1))], 0);
        let wf5$s = undefined, wf5$o = 0;
        if (ArrayBuffer.isView(wf5) || Array.isArray(wf5))
            wf5$s = wf5;
        else if (wf5 !== null && typeof wf5 === 'object' && wf5.generatedPointer === true && wf5.path === undefined && wf5.target === undefined && (ArrayBuffer.isView(wf5.source) || Array.isArray(wf5.source))) {
            wf5$s = wf5.source;
            wf5$o = wf5.offset;
        }
        let wf6 = __addr_opl_registers_base(runtime, h_m_waveform[((6) % (1))], 0);
        let wf6$s = undefined, wf6$o = 0;
        if (ArrayBuffer.isView(wf6) || Array.isArray(wf6))
            wf6$s = wf6;
        else if (wf6 !== null && typeof wf6 === 'object' && wf6.generatedPointer === true && wf6.path === undefined && wf6.target === undefined && (ArrayBuffer.isView(wf6.source) || Array.isArray(wf6.source))) {
            wf6$s = wf6.source;
            wf6$o = wf6.offset;
        }
        let wf7 = __addr_opl_registers_base(runtime, h_m_waveform[((7) % (1))], 0);
        let wf7$s = undefined, wf7$o = 0;
        if (ArrayBuffer.isView(wf7) || Array.isArray(wf7))
            wf7$s = wf7;
        else if (wf7 !== null && typeof wf7 === 'object' && wf7.generatedPointer === true && wf7.path === undefined && wf7.target === undefined && (ArrayBuffer.isView(wf7.source) || Array.isArray(wf7.source))) {
            wf7$s = wf7.source;
            wf7$o = wf7.offset;
        }
        for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            runtime.writeIndex(wf0, index, ((method_abs_sin_attenuation(runtime, index)) | (((method_bitfield(runtime, index, 9)) << (15)))));
        }
        if (0) {
            let zeroval = (((wf0$s !== undefined ? (wf0$s[wf0$o + (0)] ?? 0) : runtime.readIndex(wf0, 0))) & 0xffff);
            for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                runtime.writeIndex(wf1, index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : ((wf0$s !== undefined ? (wf0$s[wf0$o + (index)] ?? 0) : runtime.readIndex(wf0, index)))));
                runtime.writeIndex(wf2, index, (((wf0$s !== undefined ? (wf0$s[wf0$o + (index)] ?? 0) : runtime.readIndex(wf0, index))) & (32767)));
                runtime.writeIndex(wf3, index, ((method_bitfield(runtime, index, 8)) ? (zeroval) : ((((wf0$s !== undefined ? (wf0$s[wf0$o + (index)] ?? 0) : runtime.readIndex(wf0, index))) & (32767)))));
                if (0) {
                    runtime.writeIndex(wf4, index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : ((wf0$s !== undefined ? (wf0$s[wf0$o + (((index) * (2)))] ?? 0) : runtime.readIndex(wf0, ((index) * (2)))))));
                    runtime.writeIndex(wf5, index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : ((wf0$s !== undefined ? (wf0$s[wf0$o + (((((index) * (2))) & (511)))] ?? 0) : runtime.readIndex(wf0, ((((index) * (2))) & (511)))))));
                    runtime.writeIndex(wf6, index, ((method_bitfield(runtime, index, 9)) << (15)));
                    runtime.writeIndex(wf7, index, ((((method_bitfield(runtime, index, 9)) ? (((index) ^ (5119))) : (index))) << (3)));
                }
            }
        }
    }
    function __addr_opl_registers_base(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_abs_sin_attenuation(runtime, input) {
        const members = runtime.members;
        if ((((members.__static_abs_sin_attenuation_s_sin_table__initialised ?? 0)) ? 0 : 1)) {
            members.__static_abs_sin_attenuation_s_sin_table = [2137, 1731, 1543, 1419, 1326, 1252, 1190, 1137, 1091, 1050, 1013, 979, 949, 920, 894, 869, 846, 825, 804, 785, 767, 749, 732, 717, 701, 687, 672, 659, 646, 633, 621, 609, 598, 587, 576, 566, 556, 546, 536, 527, 518, 509, 501, 492, 484, 476, 468, 461, 453, 446, 439, 432, 425, 418, 411, 405, 399, 392, 386, 380, 375, 369, 363, 358, 352, 347, 341, 336, 331, 326, 321, 316, 311, 307, 302, 297, 293, 289, 284, 280, 276, 271, 267, 263, 259, 255, 251, 248, 244, 240, 236, 233, 229, 226, 222, 219, 215, 212, 209, 205, 202, 199, 196, 193, 190, 187, 184, 181, 178, 175, 172, 169, 167, 164, 161, 159, 156, 153, 151, 148, 146, 143, 141, 138, 136, 134, 131, 129, 127, 125, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 91, 89, 87, 85, 83, 82, 80, 78, 77, 75, 74, 72, 70, 69, 67, 66, 64, 63, 62, 60, 59, 57, 56, 55, 53, 52, 51, 49, 48, 47, 46, 45, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 23, 22, 21, 20, 20, 19, 18, 17, 17, 16, 15, 15, 14, 13, 13, 12, 12, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            members.__static_abs_sin_attenuation_s_sin_table__initialised = 1;
        }
        let s_sin_table = (members.__static_abs_sin_attenuation_s_sin_table ?? 0);
        if (method_bitfield(runtime, input, 8)) {
            input = (((~input)) >>> 0);
        }
        return runtime.readIndex(s_sin_table, ((input) & (255)));
    }
    function method_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::fill_n"];
        const h_m_regdata = members.m_regdata ?? 0;
        (__L0 ? __L0(__addr_reset(runtime, h_m_regdata, 0), 256, 0) : runtime.macro("std::fill_n", __addr_reset(runtime, h_m_regdata, 0), 256, 0));
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_am_counter ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_pm_counter ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_am ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_lfsr ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_regdata) ?? 0);
    }
    function __deref_save_restore(runtime, p) {
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
    function method_operator_map(runtime, dest) {
        const members = runtime.members;
        const h___static_operator_map_s_fixed_map = members.__static_operator_map_s_fixed_map ?? 0;
        if (1) {
            if ((((members.__static_operator_map_s_fixed_map__initialised ?? 0)) ? 0 : 1)) {
                runtime.copyStruct(members.__static_operator_map_s_fixed_map, new cppStruct_chan([method_operator_list(runtime, 0, 3), method_operator_list(runtime, 1, 4), method_operator_list(runtime, 2, 5), method_operator_list(runtime, 6, 9), method_operator_list(runtime, 7, 10), method_operator_list(runtime, 8, 11), method_operator_list(runtime, 12, 15), method_operator_list(runtime, 13, 16), method_operator_list(runtime, 14, 17)]));
                members.__static_operator_map_s_fixed_map__initialised = 1;
            }
            let s_fixed_map = h___static_operator_map_s_fixed_map;
            dest = s_fixed_map;
        }
        return dest;
    }
    function method_write(runtime, index, data, channel, opmask) {
        const members = runtime.members;
        index = ((index) & 0xffff);
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        if ((((((Number(index) === Number(4)) ? 1 : 0)) && (((Number(method_bitfield(runtime, data, 7)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            h_m_regdata[index] = ((h_m_regdata[index]) | (128));
        }
        else {
            h_m_regdata[index] = data;
        }
        if ((((index) === (189)) ? 1 : 0)) {
            channel.set(((255) >>> 0));
            opmask.set(((((method_bitfield(runtime, data, 5)) ? (method_bitfield(runtime, data, 0, 5)) : (0))) >>> 0));
            return 1;
        }
        if (((Number(((index) & (240))) === Number(176)) ? 1 : 0)) {
            channel.set(((((index) & (15))) >>> 0));
            if (((Number(channel.get()) < Number(9)) ? 1 : 0)) {
                if (0) {
                    channel.set(((((channel.get()) + (((9) * (method_bitfield(runtime, index, 8)))))) >>> 0));
                }
                opmask.set(((((method_bitfield(runtime, data, 5)) ? (15) : (0))) >>> 0));
                return 1;
            }
        }
        return 0;
    }
    function method_clock_noise_and_lfo(runtime) {
        const members = runtime.members;
        return ((method_opl_clock_noise_and_lfo(runtime, ({ generatedLValue: true, get: () => (members.m_noise_lfsr ?? 0), set: (value) => { members.m_noise_lfsr = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => (members.m_lfo_am_counter ?? 0), set: (value) => { members.m_lfo_am_counter = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => (members.m_lfo_pm_counter ?? 0), set: (value) => { members.m_lfo_pm_counter = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => (members.m_lfo_am ?? 0), set: (value) => { members.m_lfo_am = ((value) & 0xff); } }), method_lfo_am_depth(runtime), method_lfo_pm_depth(runtime))) | 0);
    }
    function method_opl_clock_noise_and_lfo(runtime, noise_lfsr, lfo_am_counter, lfo_pm_counter, lfo_am, am_depth, pm_depth) {
        const members = runtime.members;
        let __t0, __t1;
        noise_lfsr.set(((((noise_lfsr.get()) << (1))) >>> 0));
        noise_lfsr.set(((((noise_lfsr.get()) | (((((((method_bitfield(runtime, noise_lfsr.get(), 23)) ^ (method_bitfield(runtime, noise_lfsr.get(), 9)))) ^ (method_bitfield(runtime, noise_lfsr.get(), 8)))) ^ (method_bitfield(runtime, noise_lfsr.get(), 1)))))) >>> 0));
        let am_counter = (((__t0 = lfo_am_counter.get(), lfo_am_counter.set(((((lfo_am_counter.get()) + (1))) & 0xffff)), __t0)) >>> 0);
        if (((Number(am_counter) >= Number(13439)) ? 1 : 0)) {
            lfo_am_counter.set(((0) & 0xffff));
        }
        let shift = ((((9) - (((2) * (am_depth))))) | 0);
        lfo_am.set(((runtime.shiftRight(((((Number(am_counter) < Number(6720)) ? 1 : 0)) ? (am_counter) : (((13503) - (am_counter)))), shift)) & 0xff));
        let pm_counter = (((__t1 = lfo_pm_counter.get(), lfo_pm_counter.set(((((lfo_pm_counter.get()) + (1))) & 0xffff)), __t1)) >>> 0);
        if ((((members.__static_opl_clock_noise_and_lfo_pm_scale__initialised ?? 0)) ? 0 : 1)) {
            members.__static_opl_clock_noise_and_lfo_pm_scale = [8, 4, 0, -4, -8, -4, 0, 4];
            members.__static_opl_clock_noise_and_lfo_pm_scale__initialised = 1;
        }
        let pm_scale = (members.__static_opl_clock_noise_and_lfo_pm_scale ?? 0);
        return runtime.shiftRight(runtime.readIndex(pm_scale, method_bitfield(runtime, pm_counter, 10, 3)), ((pm_depth) ^ (1)));
    }
    function method_lfo_am_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 7, 1)) >>> 0);
    }
    function method_lfo_pm_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 6, 1)) >>> 0);
    }
    function method_cache_operator_data(runtime, choffs, opoffs, cache) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        cache.waveform = __addr_cache_operator_data(runtime, h_m_waveform[((method_op_waveform(runtime, opoffs)) % (1))], 0);
        let block_freq = (((cache.block_freq = ((method_ch_block_freq(runtime, choffs)) >>> 0))) >>> 0);
        let keycode = ((((method_bitfield(runtime, block_freq, 10, 3)) << (1))) >>> 0);
        keycode = ((((keycode) | (method_bitfield(runtime, block_freq, runtime.subtract(9, method_note_select(runtime)), 1)))) >>> 0);
        cache.detune = ((0) | 0);
        let multiple = ((method_op_multiple(runtime, opoffs)) >>> 0);
        cache.multiple = ((((((((multiple) & (14))) | (method_bitfield(runtime, 49834, multiple)))) * (2))) >>> 0);
        if ((((cache.multiple) === (0)) ? 1 : 0)) {
            cache.multiple = ((1) >>> 0);
        }
        if (((Number(method_op_lfo_pm_enable(runtime, opoffs)) === Number(0)) ? 1 : 0)) {
            cache.phase_step = ((method_compute_phase_step(runtime, choffs, opoffs, cache, 0)) >>> 0);
        }
        else {
            cache.phase_step = ((1) >>> 0);
        }
        cache.total_level = ((((method_op_total_level(runtime, opoffs)) << (3))) >>> 0);
        let ksl = ((method_op_ksl(runtime, opoffs)) >>> 0);
        if ((((ksl) !== (0)) ? 1 : 0)) {
            cache.total_level = ((((cache.total_level) + (((method_opl_key_scale_atten(runtime, method_bitfield(runtime, block_freq, 10, 3), method_bitfield(runtime, block_freq, 6, 4))) << (ksl))))) >>> 0);
        }
        cache.eg_sustain = ((method_op_sustain_level(runtime, opoffs)) >>> 0);
        cache.eg_sustain = ((((cache.eg_sustain) | (((((cache.eg_sustain) + (1))) & (16))))) >>> 0);
        cache.eg_sustain = ((((cache.eg_sustain) << (5))) >>> 0);
        let ksrval = ((((keycode) >>> (((2) * (((method_op_ksr(runtime, opoffs)) ^ (1))))))) >>> 0);
        cache.eg_rate[1] = method_effective_rate(runtime, ((method_op_attack_rate(runtime, opoffs)) * (4)), ksrval);
        cache.eg_rate[2] = method_effective_rate(runtime, ((method_op_decay_rate(runtime, opoffs)) * (4)), ksrval);
        cache.eg_rate[3] = ((method_op_eg_sustain(runtime, opoffs)) ? (0) : (method_effective_rate(runtime, ((method_op_release_rate(runtime, opoffs)) * (4)), ksrval)));
        cache.eg_rate[4] = method_effective_rate(runtime, ((method_op_release_rate(runtime, opoffs)) * (4)), ksrval);
        cache.eg_rate[0] = 63;
    }
    function __addr_cache_operator_data(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_op_waveform(runtime, opoffs) {
        const members = runtime.members;
        return ((((method_waveform_enable(runtime)) ? (method_byte(runtime, 224, 0, ((method_newflag(runtime)) ? (3) : (2)), opoffs)) : (0))) >>> 0);
    }
    function method_waveform_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_newflag(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_ch_block_freq(runtime, choffs) {
        const members = runtime.members;
        return ((method_word(runtime, 176, 0, 5, 160, 0, 8, choffs)) >>> 0);
    }
    function method_word(runtime, offset1, start1, count1, offset2, start2, count2, extra_offset = 0) {
        const members = runtime.members;
        return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
    }
    function method_note_select(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 8, 6, 1)) >>> 0);
    }
    function method_op_multiple(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 0, 4, opoffs)) >>> 0);
    }
    function method_op_lfo_pm_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 6, 1, opoffs)) >>> 0);
    }
    function method_compute_phase_step(runtime, choffs, opoffs, cache, lfo_raw_pm) {
        const members = runtime.members;
        return ((method_opl_compute_phase_step(runtime, cache.block_freq, cache.multiple, ((method_op_lfo_pm_enable(runtime, opoffs)) ? (lfo_raw_pm) : (0)))) >>> 0);
    }
    function method_opl_compute_phase_step(runtime, block_freq, multiple, lfo_raw_pm) {
        const members = runtime.members;
        let fnum = ((((method_bitfield(runtime, block_freq, 0, 10)) << (2))) >>> 0);
        fnum = ((((fnum) + (runtime.shiftRight(((lfo_raw_pm) * (method_bitfield(runtime, block_freq, 7, 3))), 1)))) >>> 0);
        fnum = ((((fnum) & (4095))) >>> 0);
        let block = ((method_bitfield(runtime, block_freq, 10, 3)) >>> 0);
        let phase_step = ((runtime.shiftRight(((fnum) << (block)), 2)) >>> 0);
        return runtime.shiftRight(((phase_step) * (multiple)), 1);
    }
    function method_op_total_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 0, 6, opoffs)) >>> 0);
    }
    function method_op_ksl(runtime, opoffs) {
        const members = runtime.members;
        let temp = ((method_byte(runtime, 64, 6, 2, opoffs)) >>> 0);
        return ((((method_bitfield(runtime, temp, 1)) | (((method_bitfield(runtime, temp, 0)) << (1))))) >>> 0);
    }
    function method_opl_key_scale_atten(runtime, block, fnum_4msb) {
        const members = runtime.members;
        if ((((members.__static_opl_key_scale_atten_fnum_to_atten__initialised ?? 0)) ? 0 : 1)) {
            members.__static_opl_key_scale_atten_fnum_to_atten = [0, 24, 32, 37, 40, 43, 45, 47, 48, 50, 51, 52, 53, 54, 55, 56];
            members.__static_opl_key_scale_atten_fnum_to_atten__initialised = 1;
        }
        let fnum_to_atten = (members.__static_opl_key_scale_atten_fnum_to_atten ?? 0);
        let result = ((((runtime.readIndex(fnum_to_atten, fnum_4msb)) - (((8) * (((block) ^ (7))))))) | 0);
        return cppMax(+(0), +(result));
    }
    function method_op_sustain_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 4, 4, opoffs)) >>> 0);
    }
    function method_op_ksr(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 4, 1, opoffs)) >>> 0);
    }
    function method_op_attack_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 4, 4, opoffs)) >>> 0);
    }
    function method_op_decay_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 0, 4, opoffs)) >>> 0);
    }
    function method_op_eg_sustain(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 5, 1, opoffs)) >>> 0);
    }
    function method_op_release_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 0, 4, opoffs)) >>> 0);
    }
    function method_log_keyon(runtime, choffs, opoffs) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["snprintf"], __L1 = __l["STRUCT_OF"];
        const h___static_log_keyon___inline0_s_fixed_map = members.__static_log_keyon___inline0_s_fixed_map ?? 0;
        let chnum = ((__add_log_keyon(runtime, ((choffs) & (15)), ((9) * (method_bitfield(runtime, choffs, 8))))) >>> 0);
        let opnum = ((__add_log_keyon(runtime, ((((opoffs) & (31))) - (((2) * (runtime.divide(((opoffs) & (31)), 8))))), ((18) * (method_bitfield(runtime, opoffs, 8))))) >>> 0);
        let buffer = new Uint8Array(Math.max(0, Number(256)));
        let end = ((0) | 0);
        end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%2u.%02u freq=%04X fb=%u alg=%X mul=%X tl=%02X ksr=%u ns=%u ksl=%u adr=%X/%X/%X sl=%X sus=%u", chnum, opnum, method_ch_block_freq(runtime, choffs), method_ch_feedback(runtime, choffs), method_ch_algorithm(runtime, choffs), method_op_multiple(runtime, opoffs), method_op_total_level(runtime, opoffs), method_op_ksr(runtime, opoffs), method_note_select(runtime), method_op_ksl(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs), method_op_eg_sustain(runtime, opoffs)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%2u.%02u freq=%04X fb=%u alg=%X mul=%X tl=%02X ksr=%u ns=%u ksl=%u adr=%X/%X/%X sl=%X sus=%u", chnum, opnum, method_ch_block_freq(runtime, choffs), method_ch_feedback(runtime, choffs), method_ch_algorithm(runtime, choffs), method_op_multiple(runtime, opoffs), method_op_total_level(runtime, opoffs), method_op_ksr(runtime, opoffs), method_note_select(runtime), method_op_ksl(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs), method_op_eg_sustain(runtime, opoffs)))))) | 0);
        if (0) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " out=%c%c%c%c", ((method_ch_output_0(runtime, choffs)) ? (76) : (45)), ((method_ch_output_1(runtime, choffs)) ? (82) : (45)), ((method_ch_output_2(runtime, choffs)) ? (48) : (45)), ((method_ch_output_3(runtime, choffs)) ? (49) : (45))) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " out=%c%c%c%c", ((method_ch_output_0(runtime, choffs)) ? (76) : (45)), ((method_ch_output_1(runtime, choffs)) ? (82) : (45)), ((method_ch_output_2(runtime, choffs)) ? (48) : (45)), ((method_ch_output_3(runtime, choffs)) ? (49) : (45))))))) | 0);
        }
        if (((Number(method_op_lfo_am_enable(runtime, opoffs)) !== Number(0)) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=%u", method_lfo_am_depth(runtime)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=%u", method_lfo_am_depth(runtime)))))) | 0);
        }
        if (((Number(method_op_lfo_pm_enable(runtime, opoffs)) !== Number(0)) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=%u", method_lfo_pm_depth(runtime)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=%u", method_lfo_pm_depth(runtime)))))) | 0);
        }
        if ((((method_waveform_enable(runtime)) && (((Number(method_op_waveform(runtime, opoffs)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " wf=%u", method_op_waveform(runtime, opoffs)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " wf=%u", method_op_waveform(runtime, opoffs)))))) | 0);
        }
        if (method_is_rhythm(runtime, choffs)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " rhy=1") : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " rhy=1"))))) | 0);
        }
        if (0) {
            let map = (__L1 ? __L1("operator_mapping") : runtime.macro("STRUCT_OF", "operator_mapping"));
            if (1) {
                if ((((members.__static_log_keyon___inline0_s_fixed_map__initialised ?? 0)) ? 0 : 1)) {
                    runtime.copyStruct(members.__static_log_keyon___inline0_s_fixed_map, new cppStruct_chan([method_operator_list(runtime, 0, 3), method_operator_list(runtime, 1, 4), method_operator_list(runtime, 2, 5), method_operator_list(runtime, 6, 9), method_operator_list(runtime, 7, 10), method_operator_list(runtime, 8, 11), method_operator_list(runtime, 12, 15), method_operator_list(runtime, 13, 16), method_operator_list(runtime, 14, 17)]));
                    members.__static_log_keyon___inline0_s_fixed_map__initialised = 1;
                }
                let __inline0_s_fixed_map = h___static_log_keyon___inline0_s_fixed_map;
                map = __inline0_s_fixed_map;
            }
            if (((Number(method_bitfield(runtime, map.chan[chnum], 16, 8)) !== Number(255)) ? 1 : 0)) {
                end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " 4op") : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " 4op"))))) | 0);
            }
        }
        return buffer;
    }
    function __add_log_keyon(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_log_keyon(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_ch_feedback(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 192, 1, 3, choffs)) >>> 0);
    }
    function method_ch_algorithm(runtime, choffs) {
        const members = runtime.members;
        return ((((method_byte(runtime, 192, 0, 1, choffs)) | (0))) >>> 0);
    }
    function method_ch_output_0(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 4, 1)) : (1))) >>> 0);
    }
    function method_ch_output_1(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 5, 1)) : (0))) >>> 0);
    }
    function method_ch_output_2(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 6, 1)) : (0))) >>> 0);
    }
    function method_ch_output_3(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 7, 1)) : (0))) >>> 0);
    }
    function method_op_lfo_am_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 7, 1, opoffs)) >>> 0);
    }
    function method_is_rhythm(runtime, choffs) {
        const members = runtime.members;
        return (((method_rhythm_enable(runtime)) && (((((((choffs) >= (6)) ? 1 : 0)) && ((((choffs) <= (8)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
    }
    function method_channel_offset(runtime, chnum) {
        const members = runtime.members;
        if (1) {
            return ((chnum) >>> 0);
        }
        else {
            return ((__add_channel_offset(runtime, ((chnum) % (9)), ((256) * (runtime.divide(chnum, 9))))) >>> 0);
        }
    }
    function __add_channel_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_operator_offset(runtime, opnum) {
        const members = runtime.members;
        if (1) {
            return ((((opnum) + (((2) * (runtime.divide(opnum, 6)))))) >>> 0);
        }
        else {
            return ((__add_operator_offset(runtime, __add_operator_offset(runtime, ((opnum) % (18)), ((2) * (runtime.divide(((opnum) % (18)), 6)))), ((256) * (runtime.divide(opnum, 18))))) >>> 0);
        }
    }
    function __add_operator_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read(runtime, index) {
        const members = runtime.members;
        index = ((index) & 0xffff);
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_reset_lfo(runtime) {
        const members = runtime.members;
        members.m_lfo_am_counter = (((members.m_lfo_pm_counter = ((0) & 0xffff))) & 0xffff);
    }
    function method_lfo_am_offset(runtime, choffs) {
        const members = runtime.members;
        return (((members.m_lfo_am ?? 0)) >>> 0);
    }
    function method_noise_state(runtime) {
        const members = runtime.members;
        return (((((members.m_noise_lfsr ?? 0)) >>> (23))) >>> 0);
    }
    function method_test(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 1, 0, 8)) >>> 0);
    }
    function method_timer_a_value(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 2, 0, 8)) * (4))) >>> 0);
    }
    function method_timer_b_value(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 3, 0, 8)) >>> 0);
    }
    function method_reset_timer_b(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 4, 7, 1)) | (method_byte(runtime, 4, 5, 1)))) >>> 0);
    }
    function method_reset_timer_a(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 4, 7, 1)) | (method_byte(runtime, 4, 6, 1)))) >>> 0);
    }
    function method_enable_timer_b(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_enable_timer_a(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_load_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 4, 1, 1)) >>> 0);
    }
    function method_load_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 4, 0, 1)) >>> 0);
    }
    function method_csm(runtime) {
        const members = runtime.members;
        return ((((0) ? (0) : (method_byte(runtime, 8, 7, 1)))) >>> 0);
    }
    function method_rhythm_keyon(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 4, 0)) >>> 0);
    }
    function method_new2flag(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_fourop_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_ch_output_any(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 4, 4)) : (1))) >>> 0);
    }
    function method_opl_registers_base__channel_offset(runtime, chnum) {
        const members = runtime.members;
        if (1) {
            return ((chnum) >>> 0);
        }
        else {
            return ((__add_opl_registers_base__channel_offset(runtime, ((chnum) % (9)), ((256) * (runtime.divide(chnum, 9))))) >>> 0);
        }
    }
    function __add_opl_registers_base__channel_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opl_registers_base__operator_offset(runtime, opnum) {
        const members = runtime.members;
        if (1) {
            return ((((opnum) + (((2) * (runtime.divide(opnum, 6)))))) >>> 0);
        }
        else {
            return ((__add_opl_registers_base__operator_offset(runtime, __add_opl_registers_base__operator_offset(runtime, ((opnum) % (18)), ((2) * (runtime.divide(((opnum) % (18)), 6)))), ((256) * (runtime.divide(opnum, 18))))) >>> 0);
        }
    }
    function __add_opl_registers_base__operator_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opl_registers_base__read(runtime, index) {
        const members = runtime.members;
        index = ((index) & 0xffff);
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_opl_registers_base__reset_lfo(runtime) {
        const members = runtime.members;
        members.m_lfo_am_counter = (((members.m_lfo_pm_counter = ((0) & 0xffff))) & 0xffff);
    }
    function method_opl_registers_base__lfo_am_offset(runtime, choffs) {
        const members = runtime.members;
        return (((members.m_lfo_am ?? 0)) >>> 0);
    }
    function method_opl_registers_base__noise_state(runtime) {
        const members = runtime.members;
        return (((((members.m_noise_lfsr ?? 0)) >>> (23))) >>> 0);
    }
    function method_opl_registers_base__test(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 1, 0, 8)) >>> 0);
    }
    function method_opl_registers_base__waveform_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opl_registers_base__timer_a_value(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 2, 0, 8)) * (4))) >>> 0);
    }
    function method_opl_registers_base__timer_b_value(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 3, 0, 8)) >>> 0);
    }
    function method_opl_registers_base__status_mask(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 4, 0, 8)) & (120))) >>> 0);
    }
    function method_opl_registers_base__irq_reset(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 4, 7, 1)) >>> 0);
    }
    function method_opl_registers_base__reset_timer_b(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 4, 7, 1)) | (method_byte(runtime, 4, 5, 1)))) >>> 0);
    }
    function method_opl_registers_base__reset_timer_a(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 4, 7, 1)) | (method_byte(runtime, 4, 6, 1)))) >>> 0);
    }
    function method_opl_registers_base__enable_timer_b(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_opl_registers_base__enable_timer_a(runtime) {
        const members = runtime.members;
        return ((1) >>> 0);
    }
    function method_opl_registers_base__load_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 4, 1, 1)) >>> 0);
    }
    function method_opl_registers_base__load_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 4, 0, 1)) >>> 0);
    }
    function method_opl_registers_base__csm(runtime) {
        const members = runtime.members;
        return ((((0) ? (0) : (method_byte(runtime, 8, 7, 1)))) >>> 0);
    }
    function method_opl_registers_base__note_select(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 8, 6, 1)) >>> 0);
    }
    function method_opl_registers_base__lfo_am_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 7, 1)) >>> 0);
    }
    function method_opl_registers_base__lfo_pm_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 6, 1)) >>> 0);
    }
    function method_opl_registers_base__rhythm_enable(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 5, 1)) >>> 0);
    }
    function method_opl_registers_base__rhythm_keyon(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 189, 4, 0)) >>> 0);
    }
    function method_opl_registers_base__newflag(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opl_registers_base__new2flag(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opl_registers_base__fourop_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opl_registers_base__ch_block_freq(runtime, choffs) {
        const members = runtime.members;
        return ((method_word(runtime, 176, 0, 5, 160, 0, 8, choffs)) >>> 0);
    }
    function method_opl_registers_base__ch_feedback(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 192, 1, 3, choffs)) >>> 0);
    }
    function method_opl_registers_base__ch_algorithm(runtime, choffs) {
        const members = runtime.members;
        return ((((method_byte(runtime, 192, 0, 1, choffs)) | (0))) >>> 0);
    }
    function method_opl_registers_base__ch_output_any(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 4, 4)) : (1))) >>> 0);
    }
    function method_opl_registers_base__ch_output_0(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 4, 1)) : (1))) >>> 0);
    }
    function method_opl_registers_base__ch_output_1(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 5, 1)) : (0))) >>> 0);
    }
    function method_opl_registers_base__ch_output_2(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 6, 1)) : (0))) >>> 0);
    }
    function method_opl_registers_base__ch_output_3(runtime, choffs) {
        const members = runtime.members;
        return ((((method_newflag(runtime)) ? (method_byte(runtime, ((192) + (choffs)), 7, 1)) : (0))) >>> 0);
    }
    function method_opl_registers_base__op_lfo_am_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 7, 1, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_lfo_pm_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 6, 1, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_eg_sustain(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 5, 1, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_ksr(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 4, 1, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_multiple(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 0, 4, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_ksl(runtime, opoffs) {
        const members = runtime.members;
        let temp = ((method_byte(runtime, 64, 6, 2, opoffs)) >>> 0);
        return ((((method_bitfield(runtime, temp, 1)) | (((method_bitfield(runtime, temp, 0)) << (1))))) >>> 0);
    }
    function method_opl_registers_base__op_total_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 0, 6, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_attack_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 4, 4, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_decay_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 0, 4, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_sustain_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 4, 4, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_release_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 0, 4, opoffs)) >>> 0);
    }
    function method_opl_registers_base__op_waveform(runtime, opoffs) {
        const members = runtime.members;
        return ((((method_waveform_enable(runtime)) ? (method_byte(runtime, 224, 0, ((method_newflag(runtime)) ? (3) : (2)), opoffs)) : (0))) >>> 0);
    }
    function method_opl_registers_base__byte(runtime, offset, start, count, extra_offset = 0) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return method_bitfield(runtime, h_m_regdata[((offset) + (extra_offset))], start, count);
    }
    function method_opl_registers_base__word(runtime, offset1, start1, count1, offset2, start2, count2, extra_offset = 0) {
        const members = runtime.members;
        return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
    }
    function method_opl_registers_base__is_rhythm(runtime, choffs) {
        const members = runtime.members;
        return (((method_rhythm_enable(runtime)) && (((((((choffs) >= (6)) ? 1 : 0)) && ((((choffs) <= (8)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
    }
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        let count = ((0) & 0xff);
        for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
            value = ((((value) << (1))) >>> 0);
        }
        return count;
    }
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method___construct(runtime) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        members.m_lfo_am_counter = ((0) & 0xffff);
        members.m_lfo_pm_counter = ((0) & 0xffff);
        members.m_noise_lfsr = ((1) >>> 0);
        members.m_lfo_am = ((0) & 0xff);
        let wf0 = __addr___construct(runtime, h_m_waveform[0], 0);
        let wf0$s = undefined, wf0$o = 0;
        if (ArrayBuffer.isView(wf0) || Array.isArray(wf0))
            wf0$s = wf0;
        else if (wf0 !== null && typeof wf0 === 'object' && wf0.generatedPointer === true && wf0.path === undefined && wf0.target === undefined && (ArrayBuffer.isView(wf0.source) || Array.isArray(wf0.source))) {
            wf0$s = wf0.source;
            wf0$o = wf0.offset;
        }
        let wf1 = __addr___construct(runtime, h_m_waveform[((1) % (1))], 0);
        let wf1$s = undefined, wf1$o = 0;
        if (ArrayBuffer.isView(wf1) || Array.isArray(wf1))
            wf1$s = wf1;
        else if (wf1 !== null && typeof wf1 === 'object' && wf1.generatedPointer === true && wf1.path === undefined && wf1.target === undefined && (ArrayBuffer.isView(wf1.source) || Array.isArray(wf1.source))) {
            wf1$s = wf1.source;
            wf1$o = wf1.offset;
        }
        let wf2 = __addr___construct(runtime, h_m_waveform[((2) % (1))], 0);
        let wf2$s = undefined, wf2$o = 0;
        if (ArrayBuffer.isView(wf2) || Array.isArray(wf2))
            wf2$s = wf2;
        else if (wf2 !== null && typeof wf2 === 'object' && wf2.generatedPointer === true && wf2.path === undefined && wf2.target === undefined && (ArrayBuffer.isView(wf2.source) || Array.isArray(wf2.source))) {
            wf2$s = wf2.source;
            wf2$o = wf2.offset;
        }
        let wf3 = __addr___construct(runtime, h_m_waveform[((3) % (1))], 0);
        let wf3$s = undefined, wf3$o = 0;
        if (ArrayBuffer.isView(wf3) || Array.isArray(wf3))
            wf3$s = wf3;
        else if (wf3 !== null && typeof wf3 === 'object' && wf3.generatedPointer === true && wf3.path === undefined && wf3.target === undefined && (ArrayBuffer.isView(wf3.source) || Array.isArray(wf3.source))) {
            wf3$s = wf3.source;
            wf3$o = wf3.offset;
        }
        let wf4 = __addr___construct(runtime, h_m_waveform[((4) % (1))], 0);
        let wf4$s = undefined, wf4$o = 0;
        if (ArrayBuffer.isView(wf4) || Array.isArray(wf4))
            wf4$s = wf4;
        else if (wf4 !== null && typeof wf4 === 'object' && wf4.generatedPointer === true && wf4.path === undefined && wf4.target === undefined && (ArrayBuffer.isView(wf4.source) || Array.isArray(wf4.source))) {
            wf4$s = wf4.source;
            wf4$o = wf4.offset;
        }
        let wf5 = __addr___construct(runtime, h_m_waveform[((5) % (1))], 0);
        let wf5$s = undefined, wf5$o = 0;
        if (ArrayBuffer.isView(wf5) || Array.isArray(wf5))
            wf5$s = wf5;
        else if (wf5 !== null && typeof wf5 === 'object' && wf5.generatedPointer === true && wf5.path === undefined && wf5.target === undefined && (ArrayBuffer.isView(wf5.source) || Array.isArray(wf5.source))) {
            wf5$s = wf5.source;
            wf5$o = wf5.offset;
        }
        let wf6 = __addr___construct(runtime, h_m_waveform[((6) % (1))], 0);
        let wf6$s = undefined, wf6$o = 0;
        if (ArrayBuffer.isView(wf6) || Array.isArray(wf6))
            wf6$s = wf6;
        else if (wf6 !== null && typeof wf6 === 'object' && wf6.generatedPointer === true && wf6.path === undefined && wf6.target === undefined && (ArrayBuffer.isView(wf6.source) || Array.isArray(wf6.source))) {
            wf6$s = wf6.source;
            wf6$o = wf6.offset;
        }
        let wf7 = __addr___construct(runtime, h_m_waveform[((7) % (1))], 0);
        let wf7$s = undefined, wf7$o = 0;
        if (ArrayBuffer.isView(wf7) || Array.isArray(wf7))
            wf7$s = wf7;
        else if (wf7 !== null && typeof wf7 === 'object' && wf7.generatedPointer === true && wf7.path === undefined && wf7.target === undefined && (ArrayBuffer.isView(wf7.source) || Array.isArray(wf7.source))) {
            wf7$s = wf7.source;
            wf7$o = wf7.offset;
        }
        for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            runtime.writeIndex(wf0, index, ((method_abs_sin_attenuation(runtime, index)) | (((method_bitfield(runtime, index, 9)) << (15)))));
        }
        if (0) {
            let zeroval = (((wf0$s !== undefined ? (wf0$s[wf0$o + (0)] ?? 0) : runtime.readIndex(wf0, 0))) & 0xffff);
            for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                runtime.writeIndex(wf1, index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : ((wf0$s !== undefined ? (wf0$s[wf0$o + (index)] ?? 0) : runtime.readIndex(wf0, index)))));
                runtime.writeIndex(wf2, index, (((wf0$s !== undefined ? (wf0$s[wf0$o + (index)] ?? 0) : runtime.readIndex(wf0, index))) & (32767)));
                runtime.writeIndex(wf3, index, ((method_bitfield(runtime, index, 8)) ? (zeroval) : ((((wf0$s !== undefined ? (wf0$s[wf0$o + (index)] ?? 0) : runtime.readIndex(wf0, index))) & (32767)))));
                if (0) {
                    runtime.writeIndex(wf4, index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : ((wf0$s !== undefined ? (wf0$s[wf0$o + (((index) * (2)))] ?? 0) : runtime.readIndex(wf0, ((index) * (2)))))));
                    runtime.writeIndex(wf5, index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : ((wf0$s !== undefined ? (wf0$s[wf0$o + (((((index) * (2))) & (511)))] ?? 0) : runtime.readIndex(wf0, ((((index) * (2))) & (511)))))));
                    runtime.writeIndex(wf6, index, ((method_bitfield(runtime, index, 9)) << (15)));
                    runtime.writeIndex(wf7, index, ((((method_bitfield(runtime, index, 9)) ? (((index) ^ (5119))) : (index))) << (3)));
                }
            }
        }
    }
    function __addr___construct(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "status_mask": method_status_mask,
        "byte": method_byte,
        "bitfield": method_bitfield,
        "irq_reset": method_irq_reset,
        "noise_enable": method_noise_enable,
        "rhythm_enable": method_rhythm_enable,
        "op_ssg_eg_enable": method_op_ssg_eg_enable,
        "op_ssg_eg_mode": method_op_ssg_eg_mode,
        "operator_list": method_operator_list,
        "effective_rate": method_effective_rate,
        "fm_registers_base::status_mask": method_fm_registers_base__status_mask,
        "fm_registers_base::irq_reset": method_fm_registers_base__irq_reset,
        "fm_registers_base::noise_enable": method_fm_registers_base__noise_enable,
        "fm_registers_base::rhythm_enable": method_fm_registers_base__rhythm_enable,
        "fm_registers_base::op_ssg_eg_enable": method_fm_registers_base__op_ssg_eg_enable,
        "fm_registers_base::op_ssg_eg_mode": method_fm_registers_base__op_ssg_eg_mode,
        "fm_registers_base::operator_list": method_fm_registers_base__operator_list,
        "fm_registers_base::effective_rate": method_fm_registers_base__effective_rate,
        "opl_registers_base": method_opl_registers_base,
        "abs_sin_attenuation": method_abs_sin_attenuation,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "clock_noise_and_lfo": method_clock_noise_and_lfo,
        "lfo_am_depth": method_lfo_am_depth,
        "lfo_pm_depth": method_lfo_pm_depth,
        "cache_operator_data": method_cache_operator_data,
        "op_waveform": method_op_waveform,
        "waveform_enable": method_waveform_enable,
        "newflag": method_newflag,
        "ch_block_freq": method_ch_block_freq,
        "word": method_word,
        "note_select": method_note_select,
        "op_multiple": method_op_multiple,
        "op_lfo_pm_enable": method_op_lfo_pm_enable,
        "compute_phase_step": method_compute_phase_step,
        "opl_compute_phase_step": method_opl_compute_phase_step,
        "op_total_level": method_op_total_level,
        "op_ksl": method_op_ksl,
        "opl_key_scale_atten": method_opl_key_scale_atten,
        "op_sustain_level": method_op_sustain_level,
        "op_ksr": method_op_ksr,
        "op_attack_rate": method_op_attack_rate,
        "op_decay_rate": method_op_decay_rate,
        "op_eg_sustain": method_op_eg_sustain,
        "op_release_rate": method_op_release_rate,
        "log_keyon": method_log_keyon,
        "ch_feedback": method_ch_feedback,
        "ch_algorithm": method_ch_algorithm,
        "ch_output_0": method_ch_output_0,
        "ch_output_1": method_ch_output_1,
        "ch_output_2": method_ch_output_2,
        "ch_output_3": method_ch_output_3,
        "op_lfo_am_enable": method_op_lfo_am_enable,
        "is_rhythm": method_is_rhythm,
        "channel_offset": method_channel_offset,
        "operator_offset": method_operator_offset,
        "read": method_read,
        "reset_lfo": method_reset_lfo,
        "lfo_am_offset": method_lfo_am_offset,
        "noise_state": method_noise_state,
        "test": method_test,
        "timer_a_value": method_timer_a_value,
        "timer_b_value": method_timer_b_value,
        "reset_timer_b": method_reset_timer_b,
        "reset_timer_a": method_reset_timer_a,
        "enable_timer_b": method_enable_timer_b,
        "enable_timer_a": method_enable_timer_a,
        "load_timer_b": method_load_timer_b,
        "load_timer_a": method_load_timer_a,
        "csm": method_csm,
        "rhythm_keyon": method_rhythm_keyon,
        "new2flag": method_new2flag,
        "fourop_enable": method_fourop_enable,
        "ch_output_any": method_ch_output_any,
        "opl_registers_base::channel_offset": method_opl_registers_base__channel_offset,
        "opl_registers_base::operator_offset": method_opl_registers_base__operator_offset,
        "opl_registers_base::read": method_opl_registers_base__read,
        "opl_registers_base::reset_lfo": method_opl_registers_base__reset_lfo,
        "opl_registers_base::lfo_am_offset": method_opl_registers_base__lfo_am_offset,
        "opl_registers_base::noise_state": method_opl_registers_base__noise_state,
        "opl_registers_base::test": method_opl_registers_base__test,
        "opl_registers_base::waveform_enable": method_opl_registers_base__waveform_enable,
        "opl_registers_base::timer_a_value": method_opl_registers_base__timer_a_value,
        "opl_registers_base::timer_b_value": method_opl_registers_base__timer_b_value,
        "opl_registers_base::status_mask": method_opl_registers_base__status_mask,
        "opl_registers_base::irq_reset": method_opl_registers_base__irq_reset,
        "opl_registers_base::reset_timer_b": method_opl_registers_base__reset_timer_b,
        "opl_registers_base::reset_timer_a": method_opl_registers_base__reset_timer_a,
        "opl_registers_base::enable_timer_b": method_opl_registers_base__enable_timer_b,
        "opl_registers_base::enable_timer_a": method_opl_registers_base__enable_timer_a,
        "opl_registers_base::load_timer_b": method_opl_registers_base__load_timer_b,
        "opl_registers_base::load_timer_a": method_opl_registers_base__load_timer_a,
        "opl_registers_base::csm": method_opl_registers_base__csm,
        "opl_registers_base::note_select": method_opl_registers_base__note_select,
        "opl_registers_base::lfo_am_depth": method_opl_registers_base__lfo_am_depth,
        "opl_registers_base::lfo_pm_depth": method_opl_registers_base__lfo_pm_depth,
        "opl_registers_base::rhythm_enable": method_opl_registers_base__rhythm_enable,
        "opl_registers_base::rhythm_keyon": method_opl_registers_base__rhythm_keyon,
        "opl_registers_base::newflag": method_opl_registers_base__newflag,
        "opl_registers_base::new2flag": method_opl_registers_base__new2flag,
        "opl_registers_base::fourop_enable": method_opl_registers_base__fourop_enable,
        "opl_registers_base::ch_block_freq": method_opl_registers_base__ch_block_freq,
        "opl_registers_base::ch_feedback": method_opl_registers_base__ch_feedback,
        "opl_registers_base::ch_algorithm": method_opl_registers_base__ch_algorithm,
        "opl_registers_base::ch_output_any": method_opl_registers_base__ch_output_any,
        "opl_registers_base::ch_output_0": method_opl_registers_base__ch_output_0,
        "opl_registers_base::ch_output_1": method_opl_registers_base__ch_output_1,
        "opl_registers_base::ch_output_2": method_opl_registers_base__ch_output_2,
        "opl_registers_base::ch_output_3": method_opl_registers_base__ch_output_3,
        "opl_registers_base::op_lfo_am_enable": method_opl_registers_base__op_lfo_am_enable,
        "opl_registers_base::op_lfo_pm_enable": method_opl_registers_base__op_lfo_pm_enable,
        "opl_registers_base::op_eg_sustain": method_opl_registers_base__op_eg_sustain,
        "opl_registers_base::op_ksr": method_opl_registers_base__op_ksr,
        "opl_registers_base::op_multiple": method_opl_registers_base__op_multiple,
        "opl_registers_base::op_ksl": method_opl_registers_base__op_ksl,
        "opl_registers_base::op_total_level": method_opl_registers_base__op_total_level,
        "opl_registers_base::op_attack_rate": method_opl_registers_base__op_attack_rate,
        "opl_registers_base::op_decay_rate": method_opl_registers_base__op_decay_rate,
        "opl_registers_base::op_sustain_level": method_opl_registers_base__op_sustain_level,
        "opl_registers_base::op_release_rate": method_opl_registers_base__op_release_rate,
        "opl_registers_base::op_waveform": method_opl_registers_base__op_waveform,
        "opl_registers_base::byte": method_opl_registers_base__byte,
        "opl_registers_base::word": method_opl_registers_base__word,
        "opl_registers_base::is_rhythm": method_opl_registers_base__is_rhythm,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["opl_registers_base__1"].compiledMethodLinks = ["STRUCT_OF", "snprintf", "std::fill_n"];
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["opl_registers_base__1"].compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        function method_noise_enable(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_fm_registers_base__status_mask(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_fm_registers_base__irq_reset(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_fm_registers_base__noise_enable(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_fm_registers_base__rhythm_enable(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_channel_offset(runtime, chnum) {
            const members = runtime.members;
            if (1) {
                return ((chnum) >>> 0);
            }
            else {
                return ((__add_channel_offset(runtime, ((chnum) % (9)), ((256) * (runtime.divide(chnum, 9))))) >>> 0);
            }
        }
        function __add_channel_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_operator_offset(runtime, opnum) {
            const members = runtime.members;
            if (1) {
                return ((((opnum) + (((2) * (runtime.divide(opnum, 6)))))) >>> 0);
            }
            else {
                return ((__add_operator_offset(runtime, __add_operator_offset(runtime, ((opnum) % (18)), ((2) * (runtime.divide(((opnum) % (18)), 6)))), ((256) * (runtime.divide(opnum, 18))))) >>> 0);
            }
        }
        function __add_operator_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_enable_timer_b(runtime) {
            const members = runtime.members;
            return ((1) >>> 0);
        }
        function method_enable_timer_a(runtime) {
            const members = runtime.members;
            return ((1) >>> 0);
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_opl_registers_base__channel_offset(runtime, chnum) {
            const members = runtime.members;
            if (1) {
                return ((chnum) >>> 0);
            }
            else {
                return ((__add_opl_registers_base__channel_offset(runtime, ((chnum) % (9)), ((256) * (runtime.divide(chnum, 9))))) >>> 0);
            }
        }
        function __add_opl_registers_base__channel_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opl_registers_base__operator_offset(runtime, opnum) {
            const members = runtime.members;
            if (1) {
                return ((((opnum) + (((2) * (runtime.divide(opnum, 6)))))) >>> 0);
            }
            else {
                return ((__add_opl_registers_base__operator_offset(runtime, __add_opl_registers_base__operator_offset(runtime, ((opnum) % (18)), ((2) * (runtime.divide(((opnum) % (18)), 6)))), ((256) * (runtime.divide(opnum, 18))))) >>> 0);
            }
        }
        function __add_opl_registers_base__operator_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opl_registers_base__enable_timer_b(runtime) {
            const members = runtime.members;
            return ((1) >>> 0);
        }
        function method_opl_registers_base__enable_timer_a(runtime) {
            const members = runtime.members;
            return ((1) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "noise_enable": method_noise_enable,
            "fm_registers_base::status_mask": method_fm_registers_base__status_mask,
            "fm_registers_base::irq_reset": method_fm_registers_base__irq_reset,
            "fm_registers_base::noise_enable": method_fm_registers_base__noise_enable,
            "fm_registers_base::rhythm_enable": method_fm_registers_base__rhythm_enable,
            "channel_offset": method_channel_offset,
            "operator_offset": method_operator_offset,
            "enable_timer_b": method_enable_timer_b,
            "enable_timer_a": method_enable_timer_a,
            "bitfield": method_bitfield,
            "opl_registers_base::channel_offset": method_opl_registers_base__channel_offset,
            "opl_registers_base::operator_offset": method_opl_registers_base__operator_offset,
            "opl_registers_base::enable_timer_b": method_opl_registers_base__enable_timer_b,
            "opl_registers_base::enable_timer_a": method_opl_registers_base__enable_timer_a
        };
        return __methodTable;
    })(),
};
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["fm_channel__opl_registers"].compiledMethods = (() => {
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
    const cppScratch_output_4op_opout = new Int16Array(new Uint8Array(Math.max(0, Number(8))));
    function method_reset(runtime) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        h_m_feedback[0] = (h_m_feedback[1] = 0);
        members.m_feedback_in = ((0) << 16 >> 16);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        (__deref_save_restore(runtime, state).save_restore?.(h_m_feedback[0]) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_feedback[1]) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_feedback_in ?? 0)) ?? 0);
    }
    function __deref_save_restore(runtime, p) {
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
    function method_keyonoff(runtime, states, type, chnum) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["debug::log_keyon"];
        let __t0;
        const h_m_op = members.m_op ?? 0;
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
                (h_m_op[opnum].keyonoff?.(method_bitfield(runtime, states, opnum), type) ?? 0);
            }
        }
        if ((((0) && (((Number(((runtime.shiftRight(4294967295, chnum)) & (1))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            for (let opnum = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
                if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
                    (__L0 ? __L0("%c%s\n", ((method_bitfield(runtime, states, opnum)) ? (43) : (45)), (__t0 = __deref_keyonoff(runtime, (__deref_keyonoff(runtime, members.m_regs).log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0)), typeof __t0.c_str === 'function' ? (__t0.c_str() ?? 0) : runtime.container((__deref_keyonoff(runtime, members.m_regs).log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0), "c_str"))) : runtime.macro("debug::log_keyon", "%c%s\n", ((method_bitfield(runtime, states, opnum)) ? (43) : (45)), (__t0 = __deref_keyonoff(runtime, (__deref_keyonoff(runtime, members.m_regs).log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0)), typeof __t0.c_str === 'function' ? (__t0.c_str() ?? 0) : runtime.container((__deref_keyonoff(runtime, members.m_regs).log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0), "c_str"))));
                }
            }
        }
    }
    function __deref_keyonoff(runtime, p) {
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
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_prepare(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let active_mask = ((0) >>> 0);
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
                if ((h_m_op[opnum].prepare?.() ?? 0)) {
                    active_mask = ((((active_mask) | (((1) << (opnum))))) >>> 0);
                }
            }
        }
        return (((active_mask) !== (0)) ? 1 : 0);
    }
    function method_clock(runtime, env_counter, lfo_raw_pm) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        h_m_feedback[0] = h_m_feedback[1];
        h_m_feedback[1] = (members.m_feedback_in ?? 0);
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
                (h_m_op[opnum].clock?.(env_counter, lfo_raw_pm) ?? 0);
            }
        }
    }
    function method_output_2op(runtime, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((__deref_output_2op(runtime, members.m_regs).lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let opmod = ((0) | 0);
        let feedback = (((__deref_output_2op(runtime, members.m_regs).ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        if ((((feedback) !== (0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
        }
        let op1value = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
        if (((Number((__deref_output_2op(runtime, members.m_regs).ch_output_any?.((members.m_choffs ?? 0)) ?? 0)) === Number(0)) ? 1 : 0)) {
            return;
        }
        let result = ((0) | 0);
        if (((Number(method_bitfield(runtime, (__deref_output_2op(runtime, members.m_regs).ch_algorithm?.((members.m_choffs ?? 0)) ?? 0), 0)) === Number(0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((1) ? (h_m_feedback[1]) : (op1value)), 1)) | 0);
            result = ((runtime.shiftRight((h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0), rshift)) | 0);
        }
        else {
            result = ((runtime.shiftRight(((1) ? (h_m_feedback[1]) : (op1value)), rshift)) | 0);
            result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.((h_m_op[1].phase?.() ?? 0), am_offset) ?? 0), rshift)))) | 0);
            let clipmin = (((((-clipmax)) - (1))) | 0);
            result = ((method_clamp(runtime, result, clipmin, clipmax)) | 0);
        }
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, result);
    }
    function __deref_output_2op(runtime, p) {
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
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_add_to_output(runtime, choffs, output, value) {
        const members = runtime.members;
        let out0_index = ((0) | 0);
        let out1_index = ((((1) % (1))) | 0);
        let out2_index = ((((2) % (1))) | 0);
        let out3_index = ((((3) % (1))) | 0);
        if ((((1) || ((__deref_add_to_output(runtime, members.m_regs).ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out0_index] = ((output.data[out0_index]) + (value));
        }
        if ((((0) && ((__deref_add_to_output(runtime, members.m_regs).ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out1_index] = ((output.data[out1_index]) + (value));
        }
        if ((((0) && ((__deref_add_to_output(runtime, members.m_regs).ch_output_2?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out2_index] = ((output.data[out2_index]) + (value));
        }
        if ((((0) && ((__deref_add_to_output(runtime, members.m_regs).ch_output_3?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out3_index] = ((output.data[out3_index]) + (value));
        }
    }
    function __deref_add_to_output(runtime, p) {
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
    function method_output_4op(runtime, output, rshift, clipmax) {
        const members = runtime.members;
        let __t0;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((__deref_output_4op(runtime, members.m_regs).lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let opmod = ((0) | 0);
        let feedback = (((__deref_output_4op(runtime, members.m_regs).ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        if ((((feedback) !== (0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
        }
        let op1value = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
        if (((Number((__deref_output_4op(runtime, members.m_regs).ch_output_any?.((members.m_choffs ?? 0)) ?? 0)) === Number(0)) ? 1 : 0)) {
            return;
        }
        if ((((members.__static_output_4op_s_algorithm_ops__initialised ?? 0)) ? 0 : 1)) {
            members.__static_output_4op_s_algorithm_ops = [53, 58, 100, 113, 305, 787, 769, 896, 53, 180, 305, 644];
            members.__static_output_4op_s_algorithm_ops__initialised = 1;
        }
        let s_algorithm_ops = (members.__static_output_4op_s_algorithm_ops ?? 0);
        let algorithm_ops = ((runtime.readIndex(s_algorithm_ops, (__deref_output_4op(runtime, members.m_regs).ch_algorithm?.((members.m_choffs ?? 0)) ?? 0))) >>> 0);
        let opout = cppScratch_output_4op_opout.fill(0);
        opout[0] = 0;
        opout[1] = op1value;
        opmod = ((runtime.shiftRight((opout[method_bitfield(runtime, algorithm_ops, 0, 1)] ?? 0), 1)) | 0);
        opout[2] = (h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0);
        opout[5] = __add_output_4op(runtime, (opout[1] ?? 0), (opout[2] ?? 0));
        opmod = ((runtime.shiftRight((opout[method_bitfield(runtime, algorithm_ops, 1, 3)] ?? 0), 1)) | 0);
        opout[3] = (h_m_op[2].compute_volume?.((((h_m_op[2].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0);
        opout[6] = __add_output_4op(runtime, (opout[1] ?? 0), (opout[3] ?? 0));
        opout[7] = __add_output_4op(runtime, (opout[2] ?? 0), (opout[3] ?? 0));
        let result = ((0) | 0);
        if (((((__t0 = __deref_output_4op(runtime, members.m_regs), typeof __t0.noise_enable === 'function' ? __t0.noise_enable() : typeof __t0.noise_enable === 'number' || typeof __t0.noise_enable === 'boolean' ? __t0.noise_enable : runtime.container(members.m_regs, "noise_enable"))) && (((((members.m_choffs ?? 0)) === (7)) ? 1 : 0))) ? 1 : 0)) {
            result = (((h_m_op[3].compute_noise_volume?.(am_offset) ?? 0)) | 0);
        }
        else {
            opmod = ((runtime.shiftRight((opout[method_bitfield(runtime, algorithm_ops, 4, 3)] ?? 0), 1)) | 0);
            result = (((h_m_op[3].compute_volume?.((((h_m_op[3].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) | 0);
        }
        result = ((((result) >> (rshift))) | 0);
        let clipmin = (((((-clipmax)) - (1))) | 0);
        if (((Number(method_bitfield(runtime, algorithm_ops, 7)) !== Number(0)) ? 1 : 0)) {
            result = ((method_clamp(runtime, ((result) + (runtime.shiftRight((opout[1] ?? 0), rshift))), clipmin, clipmax)) | 0);
        }
        if (((Number(method_bitfield(runtime, algorithm_ops, 8)) !== Number(0)) ? 1 : 0)) {
            result = ((method_clamp(runtime, ((result) + (runtime.shiftRight((opout[2] ?? 0), rshift))), clipmin, clipmax)) | 0);
        }
        if (((Number(method_bitfield(runtime, algorithm_ops, 9)) !== Number(0)) ? 1 : 0)) {
            result = ((method_clamp(runtime, ((result) + (runtime.shiftRight((opout[3] ?? 0), rshift))), clipmin, clipmax)) | 0);
        }
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, result);
    }
    function __add_output_4op(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __deref_output_4op(runtime, p) {
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
    function method_output_rhythm_ch6(runtime, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((__deref_output_rhythm_ch6(runtime, members.m_regs).lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let opmod = ((0) | 0);
        let feedback = (((__deref_output_rhythm_ch6(runtime, members.m_regs).ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        if ((((feedback) !== (0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
        }
        let opout1 = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
        opmod = ((((method_bitfield(runtime, (__deref_output_rhythm_ch6(runtime, members.m_regs).ch_algorithm?.((members.m_choffs ?? 0)) ?? 0), 0)) ? (0) : (runtime.shiftRight(opout1, 1)))) | 0);
        let result = ((runtime.shiftRight((h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0), rshift)) | 0);
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
    }
    function __deref_output_rhythm_ch6(runtime, p) {
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
    function method_output_rhythm_ch7(runtime, phase_select, output, rshift, clipmax) {
        const members = runtime.members;
        let __t0;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((__deref_output_rhythm_ch7(runtime, members.m_regs).lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let noise_state = ((method_bitfield(runtime, (__t0 = __deref_output_rhythm_ch7(runtime, members.m_regs), typeof __t0.noise_state === 'function' ? __t0.noise_state() : typeof __t0.noise_state === 'number' || typeof __t0.noise_state === 'boolean' ? __t0.noise_state : runtime.container(members.m_regs, "noise_state")), 0)) >>> 0);
        let phase = ((((((phase_select) << (9))) | (runtime.shiftRight(208, ((2) * (((noise_state) ^ (phase_select)))))))) >>> 0);
        let result = ((runtime.shiftRight((h_m_op[0].compute_volume?.(phase, am_offset) ?? 0), rshift)) | 0);
        let op13phase = (((h_m_op[0].phase?.() ?? 0)) >>> 0);
        phase = ((((((256) << (method_bitfield(runtime, op13phase, 8)))) ^ (((noise_state) << (8))))) >>> 0);
        result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.(phase, am_offset) ?? 0), rshift)))) | 0);
        result = ((method_clamp(runtime, result, (((-clipmax)) - (1)), clipmax)) | 0);
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
    }
    function __deref_output_rhythm_ch7(runtime, p) {
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
    function method_output_rhythm_ch8(runtime, phase_select, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((__deref_output_rhythm_ch8(runtime, members.m_regs).lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let result = ((runtime.shiftRight((h_m_op[0].compute_volume?.((h_m_op[0].phase?.() ?? 0), am_offset) ?? 0), rshift)) | 0);
        let phase = ((((256) | (((phase_select) << (9))))) >>> 0);
        result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.(phase, am_offset) ?? 0), rshift)))) | 0);
        result = ((method_clamp(runtime, result, (((-clipmax)) - (1)), clipmax)) | 0);
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
    }
    function __deref_output_rhythm_ch8(runtime, p) {
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
    function method_choffs(runtime) {
        const members = runtime.members;
        return (((members.m_choffs ?? 0)) >>> 0);
    }
    function method_assign(runtime, index, op) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        h_m_op[index] = op;
        if (((op) ? 1 : 0)) {
            (__deref_assign(runtime, op).set_choffs?.((members.m_choffs ?? 0)) ?? 0);
        }
    }
    function __deref_assign(runtime, p) {
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
    function method_is4op(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        if (0) {
            return ((Number(h_m_op[2]) !== Number(0)) ? 1 : 0);
        }
        return ((Number(runtime.divide(18, 9)) === Number(4)) ? 1 : 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_debug_operator(runtime, index) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        return h_m_op[index];
    }
    function method_fm_channel__choffs(runtime) {
        const members = runtime.members;
        return (((members.m_choffs ?? 0)) >>> 0);
    }
    function method_fm_channel__assign(runtime, index, op) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        h_m_op[index] = op;
        if (((op) ? 1 : 0)) {
            (__deref_fm_channel__assign(runtime, op).set_choffs?.((members.m_choffs ?? 0)) ?? 0);
        }
    }
    function __deref_fm_channel__assign(runtime, p) {
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
    function method_fm_channel__is4op(runtime) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        if (0) {
            return ((Number(h_m_op[2]) !== Number(0)) ? 1 : 0);
        }
        return ((Number(runtime.divide(18, 9)) === Number(4)) ? 1 : 0);
    }
    function method_fm_channel__regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_fm_channel__debug_operator(runtime, index) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        return h_m_op[index];
    }
    function method_fm_channel__add_to_output(runtime, choffs, output, value) {
        const members = runtime.members;
        let out0_index = ((0) | 0);
        let out1_index = ((((1) % (1))) | 0);
        let out2_index = ((((2) % (1))) | 0);
        let out3_index = ((((3) % (1))) | 0);
        if ((((1) || ((__deref_fm_channel__add_to_output(runtime, members.m_regs).ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out0_index] = ((output.data[out0_index]) + (value));
        }
        if ((((0) && ((__deref_fm_channel__add_to_output(runtime, members.m_regs).ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out1_index] = ((output.data[out1_index]) + (value));
        }
        if ((((0) && ((__deref_fm_channel__add_to_output(runtime, members.m_regs).ch_output_2?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out2_index] = ((output.data[out2_index]) + (value));
        }
        if ((((0) && ((__deref_fm_channel__add_to_output(runtime, members.m_regs).ch_output_3?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out3_index] = ((output.data[out3_index]) + (value));
        }
    }
    function __deref_fm_channel__add_to_output(runtime, p) {
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
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        let count = ((0) & 0xff);
        for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
            value = ((((value) << (1))) >>> 0);
        }
        return count;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method_fm_channel__regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method___construct(runtime, owner, choffs) {
        const members = runtime.members;
        let __t0;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        members.m_choffs = ((choffs) >>> 0);
        h_m_feedback[0] = 0;
        h_m_feedback[1] = 0;
        members.m_feedback_in = ((0) << 16 >> 16);
        h_m_op[0] = 0;
        h_m_op[1] = 0;
        h_m_op[2] = 0;
        h_m_op[3] = 0;
        members.m_regs = (__t0 = __deref___construct(runtime, owner), typeof __t0.regs === 'function' ? __t0.regs() : typeof __t0.regs === 'number' || typeof __t0.regs === 'boolean' ? __t0.regs : runtime.container(owner, "regs"));
        members.m_owner = owner;
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
        "reset": method_reset,
        "save_restore": method_save_restore,
        "keyonoff": method_keyonoff,
        "bitfield": method_bitfield,
        "prepare": method_prepare,
        "clock": method_clock,
        "output_2op": method_output_2op,
        "clamp": method_clamp,
        "add_to_output": method_add_to_output,
        "output_4op": method_output_4op,
        "output_rhythm_ch6": method_output_rhythm_ch6,
        "output_rhythm_ch7": method_output_rhythm_ch7,
        "output_rhythm_ch8": method_output_rhythm_ch8,
        "choffs": method_choffs,
        "assign": method_assign,
        "is4op": method_is4op,
        "regs": method_regs,
        "debug_operator": method_debug_operator,
        "fm_channel::choffs": method_fm_channel__choffs,
        "fm_channel::assign": method_fm_channel__assign,
        "fm_channel::is4op": method_fm_channel__is4op,
        "fm_channel::regs": method_fm_channel__regs,
        "fm_channel::debug_operator": method_fm_channel__debug_operator,
        "fm_channel::add_to_output": method_fm_channel__add_to_output,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "roundtrip_fp": method_roundtrip_fp,
        "regs=": method_regs_,
        "fm_channel::regs=": method_fm_channel__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["fm_channel__opl_registers"].compiledMethodLinks = ["debug::log_keyon"];
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["fm_channel__opl_registers"].compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
    "ymfm_output__1": (() => {
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
        function method_clear(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_clamp(runtime, h_data[index], -32768, 32767);
            }
            return (members.this ?? 0);
        }
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_roundtrip_fp(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_ymfm__roundtrip_fp(runtime, h_data[index]);
            }
            return (members.this ?? 0);
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["fm_operator__opl_registers"].compiledMethods = (() => {
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
    function method_fm_operator(runtime, owner, opoffs) {
        const members = runtime.members;
    }
    function method_reset(runtime) {
        const members = runtime.members;
        members.m_phase = ((0) >>> 0);
        members.m_env_attenuation = ((1023) & 0xffff);
        members.m_env_state = 4;
        members.m_ssg_inverted = ((0) & 0xff);
        members.m_key_state = ((0) & 0xff);
        members.m_keyon_live = ((0) & 0xff);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_phase ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_env_attenuation ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_env_state ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_ssg_inverted ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_key_state ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_keyon_live ?? 0)) ?? 0);
    }
    function __deref_save_restore(runtime, p) {
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
    function method_prepare(runtime) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        (__deref_prepare(runtime, members.m_regs).cache_operator_data?.((members.m_choffs ?? 0), (members.m_opoffs ?? 0), h_m_cache) ?? 0);
        method_clock_keystate(runtime, ((((((members.m_keyon_live ?? 0)) !== (0)) ? 1 : 0)) >>> 0));
        members.m_keyon_live = ((((members.m_keyon_live) & (-5))) & 0xff);
        return (((((Number((members.m_env_state ?? 0)) !== Number(4)) ? 1 : 0)) || (((Number((members.m_env_attenuation ?? 0)) < Number(896)) ? 1 : 0))) ? 1 : 0);
    }
    function __deref_prepare(runtime, p) {
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
    function method_clock_keystate(runtime, keystate) {
        const members = runtime.members;
        if (((Number(((keystate) ^ ((members.m_key_state ?? 0)))) !== Number(0)) ? 1 : 0)) {
            members.m_key_state = ((keystate) & 0xff);
            if ((((keystate) !== (0)) ? 1 : 0)) {
                if ((((0) && (((((members.m_env_attenuation ?? 0)) < (512)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_env_state = 0;
                }
                else {
                    method_start_attack(runtime);
                }
            }
            else {
                method_start_release(runtime);
            }
        }
    }
    function method_start_attack(runtime, is_restart = 0) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        if (((Number((members.m_env_state ?? 0)) === Number(1)) ? 1 : 0)) {
            return;
        }
        members.m_env_state = 1;
        if ((((0) && (((is_restart) ? 0 : 1))) ? 1 : 0)) {
            members.m_ssg_inverted = (((((__deref_start_attack(runtime, members.m_regs).op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) & (method_bitfield(runtime, (__deref_start_attack(runtime, members.m_regs).op_ssg_eg_mode?.((members.m_opoffs ?? 0)) ?? 0), 2)))) & 0xff);
        }
        if (((is_restart) ? 0 : 1)) {
            members.m_phase = ((0) >>> 0);
        }
        if ((((h_m_cache.eg_rate[1]) >= (62)) ? 1 : 0)) {
            members.m_env_attenuation = ((0) & 0xffff);
        }
    }
    function __deref_start_attack(runtime, p) {
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
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_start_release(runtime) {
        const members = runtime.members;
        if (((Number((members.m_env_state ?? 0)) >= Number(4)) ? 1 : 0)) {
            return;
        }
        members.m_env_state = 4;
        if ((((0) && ((members.m_ssg_inverted ?? 0))) ? 1 : 0)) {
            members.m_env_attenuation = ((((((512) - ((members.m_env_attenuation ?? 0)))) & (1023))) & 0xffff);
            members.m_ssg_inverted = ((0) & 0xff);
        }
    }
    function method_clock(runtime, env_counter, lfo_raw_pm) {
        const members = runtime.members;
        if ((__deref_clock(runtime, members.m_regs).op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) {
            method_clock_ssg_eg_state(runtime);
        }
        else {
            members.m_ssg_inverted = ((0) & 0xff);
        }
        if (((Number(method_bitfield(runtime, env_counter, 0, 2)) === Number(0)) ? 1 : 0)) {
            method_clock_envelope(runtime, ((env_counter) >>> (2)));
        }
        method_clock_phase(runtime, lfo_raw_pm);
    }
    function __deref_clock(runtime, p) {
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
    function method_clock_ssg_eg_state(runtime) {
        const members = runtime.members;
        if (((method_bitfield(runtime, (members.m_env_attenuation ?? 0), 9)) ? 0 : 1)) {
            return;
        }
        let mode = (((__deref_clock_ssg_eg_state(runtime, members.m_regs).op_ssg_eg_mode?.((members.m_opoffs ?? 0)) ?? 0)) >>> 0);
        if (method_bitfield(runtime, mode, 0)) {
            members.m_ssg_inverted = ((((method_bitfield(runtime, mode, 2)) ^ (method_bitfield(runtime, mode, 1)))) & 0xff);
            if (((Number((members.m_env_state ?? 0)) !== Number(1)) ? 1 : 0)) {
                members.m_env_attenuation = (((((members.m_ssg_inverted ?? 0)) ? (512) : (1023))) & 0xffff);
            }
        }
        else {
            members.m_ssg_inverted = ((((members.m_ssg_inverted) ^ (method_bitfield(runtime, mode, 1)))) & 0xff);
            if ((((((Number((members.m_env_state ?? 0)) === Number(2)) ? 1 : 0)) || (((Number((members.m_env_state ?? 0)) === Number(3)) ? 1 : 0))) ? 1 : 0)) {
                method_start_attack(runtime, 1);
            }
            if (((Number(method_bitfield(runtime, mode, 1)) === Number(0)) ? 1 : 0)) {
                members.m_phase = ((0) >>> 0);
            }
        }
        if (((Number((members.m_env_state ?? 0)) === Number(4)) ? 1 : 0)) {
            members.m_env_attenuation = ((1023) & 0xffff);
        }
    }
    function __deref_clock_ssg_eg_state(runtime, p) {
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
    function method_clock_envelope(runtime, env_counter) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        if ((((((Number((members.m_env_state ?? 0)) === Number(1)) ? 1 : 0)) && (((((members.m_env_attenuation ?? 0)) === (0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_env_state = 2;
        }
        if ((((((Number((members.m_env_state ?? 0)) === Number(2)) ? 1 : 0)) && (((((members.m_env_attenuation ?? 0)) >= (h_m_cache.eg_sustain)) ? 1 : 0))) ? 1 : 0)) {
            members.m_env_state = 3;
        }
        let rate = ((h_m_cache.eg_rate[(members.m_env_state ?? 0)]) >>> 0);
        let rate_shift = ((((rate) >>> (2))) >>> 0);
        env_counter = ((((env_counter) << (rate_shift))) >>> 0);
        if (((Number(method_bitfield(runtime, env_counter, 0, 11)) !== Number(0)) ? 1 : 0)) {
            return;
        }
        let relevant_bits = ((method_bitfield(runtime, env_counter, (((((rate_shift) <= (11)) ? 1 : 0)) ? (11) : (rate_shift)), 3)) >>> 0);
        let increment = ((method_attenuation_increment(runtime, rate, relevant_bits)) >>> 0);
        if (((Number((members.m_env_state ?? 0)) === Number(1)) ? 1 : 0)) {
            if ((((rate) < (62)) ? 1 : 0)) {
                members.m_env_attenuation = ((((members.m_env_attenuation) + (runtime.shiftRight((((~(members.m_env_attenuation ?? 0))) * (increment)), 4)))) & 0xffff);
            }
        }
        else {
            if ((((__deref_clock_envelope(runtime, members.m_regs).op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) ? 0 : 1)) {
                members.m_env_attenuation = ((((members.m_env_attenuation) + (increment))) & 0xffff);
            }
            else {
                if (((((members.m_env_attenuation ?? 0)) < (512)) ? 1 : 0)) {
                    members.m_env_attenuation = ((((members.m_env_attenuation) + (((4) * (increment))))) & 0xffff);
                }
            }
            if (((((members.m_env_attenuation ?? 0)) >= (1024)) ? 1 : 0)) {
                members.m_env_attenuation = ((1023) & 0xffff);
            }
            if (((((((0) && (((Number((members.m_env_state ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_env_attenuation ?? 0)) >= (512)) ? 1 : 0))) ? 1 : 0)) {
                method_start_attack(runtime);
            }
            if (((((((0) && (((Number((members.m_env_state ?? 0)) === Number(4)) ? 1 : 0))) ? 1 : 0)) && (((((members.m_env_attenuation ?? 0)) >= (192)) ? 1 : 0))) ? 1 : 0)) {
                members.m_env_state = 5;
            }
        }
    }
    function __deref_clock_envelope(runtime, p) {
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
    function method_attenuation_increment(runtime, rate, index) {
        const members = runtime.members;
        if ((((members.__static_attenuation_increment_s_increment_table__initialised ?? 0)) ? 0 : 1)) {
            members.__static_attenuation_increment_s_increment_table = [0, 0, 269488144, 269488144, 269488144, 269488144, 286265616, 286265616, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 286331153, 554770705, 555819297, 572596769, 572662306, 1109541410, 1111638594, 1145193538, 1145324612, 2219082820, 2223277188, 2290387076, 2290649224, 2290649224, 2290649224, 2290649224];
            members.__static_attenuation_increment_s_increment_table__initialised = 1;
        }
        let s_increment_table = (members.__static_attenuation_increment_s_increment_table ?? 0);
        return method_bitfield(runtime, runtime.readIndex(s_increment_table, rate), ((4) * (index)), 4);
    }
    function method_clock_phase(runtime, lfo_raw_pm) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        let phase_step = ((h_m_cache.phase_step) >>> 0);
        if (((Number(phase_step) === Number(1)) ? 1 : 0)) {
            phase_step = (((__deref_clock_phase(runtime, members.m_regs).compute_phase_step?.((members.m_choffs ?? 0), (members.m_opoffs ?? 0), h_m_cache, lfo_raw_pm) ?? 0)) >>> 0);
        }
        members.m_phase = ((((members.m_phase) + (phase_step))) >>> 0);
    }
    function __deref_clock_phase(runtime, p) {
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
    function method_compute_volume(runtime, phase, am_offset) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        if (((Number((members.m_env_attenuation ?? 0)) > Number(896)) ? 1 : 0)) {
            return ((0) | 0);
        }
        let sin_attenuation = ((runtime.readIndex(h_m_cache.waveform, ((phase) & (1023)))) >>> 0);
        let env_attenuation = ((((method_envelope_attenuation(runtime, am_offset)) << (2))) >>> 0);
        let result = ((method_attenuation_to_volume(runtime, ((((sin_attenuation) & (32767))) + (env_attenuation)))) | 0);
        return ((((method_bitfield(runtime, sin_attenuation, 15)) ? ((-result)) : (result))) | 0);
    }
    function method_envelope_attenuation(runtime, am_offset) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        let result = (((((members.m_env_attenuation ?? 0)) >>> (h_m_cache.eg_shift))) >>> 0);
        if ((((0) && ((members.m_ssg_inverted ?? 0))) ? 1 : 0)) {
            result = ((((((512) - (result))) & (1023))) >>> 0);
        }
        if ((__deref_envelope_attenuation(runtime, members.m_regs).op_lfo_am_enable?.((members.m_opoffs ?? 0)) ?? 0)) {
            result = ((((result) + (am_offset))) >>> 0);
        }
        result = ((((result) + (h_m_cache.total_level))) >>> 0);
        return ((cppMin(+(result), +(1023))) >>> 0);
    }
    function __deref_envelope_attenuation(runtime, p) {
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
    function method_attenuation_to_volume(runtime, input) {
        const members = runtime.members;
        if ((((members.__static_attenuation_to_volume_s_power_table__initialised ?? 0)) ? 0 : 1)) {
            members.__static_attenuation_to_volume_s_power_table = [8168, 8148, 8124, 8104, 8080, 8060, 8040, 8016, 7996, 7972, 7952, 7932, 7908, 7888, 7864, 7844, 7824, 7804, 7780, 7760, 7740, 7720, 7696, 7676, 7656, 7636, 7616, 7592, 7572, 7552, 7532, 7512, 7492, 7472, 7452, 7432, 7412, 7392, 7372, 7352, 7332, 7312, 7292, 7272, 7252, 7232, 7212, 7192, 7176, 7156, 7136, 7116, 7096, 7076, 7060, 7040, 7020, 7000, 6984, 6964, 6944, 6928, 6908, 6888, 6868, 6852, 6832, 6816, 6796, 6776, 6760, 6740, 6724, 6704, 6688, 6668, 6652, 6632, 6616, 6596, 6580, 6560, 6544, 6524, 6508, 6492, 6472, 6456, 6436, 6420, 6404, 6384, 6368, 6352, 6336, 6316, 6300, 6284, 6264, 6248, 6232, 6216, 6200, 6180, 6164, 6148, 6132, 6116, 6100, 6080, 6064, 6048, 6032, 6016, 6000, 5984, 5968, 5952, 5936, 5920, 5904, 5888, 5872, 5856, 5840, 5824, 5808, 5792, 5776, 5760, 5744, 5732, 5716, 5700, 5684, 5668, 5652, 5636, 5624, 5608, 5592, 5576, 5564, 5548, 5532, 5516, 5504, 5488, 5472, 5456, 5444, 5428, 5412, 5400, 5384, 5368, 5356, 5340, 5328, 5312, 5296, 5284, 5268, 5256, 5240, 5228, 5212, 5200, 5184, 5168, 5156, 5144, 5128, 5116, 5100, 5088, 5072, 5060, 5044, 5032, 5020, 5004, 4992, 4976, 4964, 4952, 4936, 4924, 4912, 4896, 4884, 4872, 4856, 4844, 4832, 4820, 4804, 4792, 4780, 4768, 4752, 4740, 4728, 4716, 4704, 4688, 4676, 4664, 4652, 4640, 4628, 4616, 4600, 4588, 4576, 4564, 4552, 4540, 4528, 4516, 4504, 4492, 4480, 4468, 4456, 4444, 4432, 4420, 4408, 4396, 4384, 4372, 4360, 4348, 4336, 4324, 4312, 4300, 4288, 4276, 4264, 4256, 4244, 4232, 4220, 4208, 4196, 4184, 4176, 4164, 4152, 4140, 4128, 4120, 4108, 4096];
            members.__static_attenuation_to_volume_s_power_table__initialised = 1;
        }
        let s_power_table = (members.__static_attenuation_to_volume_s_power_table ?? 0);
        return runtime.shiftRight(runtime.readIndex(s_power_table, ((input) & (255))), ((input) >>> (8)));
    }
    function method_compute_noise_volume(runtime, am_offset) {
        const members = runtime.members;
        let __t0;
        let result = ((((((method_envelope_attenuation(runtime, am_offset)) ^ (1023))) << (1))) | 0);
        return ((((method_bitfield(runtime, (__t0 = __deref_compute_noise_volume(runtime, members.m_regs), typeof __t0.noise_state === 'function' ? __t0.noise_state() : typeof __t0.noise_state === 'number' || typeof __t0.noise_state === 'boolean' ? __t0.noise_state : runtime.container(members.m_regs, "noise_state")), 0)) ? ((-result)) : (result))) | 0);
    }
    function __deref_compute_noise_volume(runtime, p) {
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
    function method_keyonoff(runtime, on, type) {
        const members = runtime.members;
        members.m_keyon_live = (((((((members.m_keyon_live ?? 0)) & ((~((1) << (((type) | 0))))))) | (((method_bitfield(runtime, on, 0)) << (((type) | 0)))))) & 0xff);
    }
    function method_opoffs(runtime) {
        const members = runtime.members;
        return (((members.m_opoffs ?? 0)) >>> 0);
    }
    function method_choffs(runtime) {
        const members = runtime.members;
        return (((members.m_choffs ?? 0)) >>> 0);
    }
    function method_set_choffs(runtime, choffs) {
        const members = runtime.members;
        members.m_choffs = ((choffs) >>> 0);
    }
    function method_phase(runtime) {
        const members = runtime.members;
        return (((((members.m_phase ?? 0)) >>> (10))) >>> 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_debug_eg_state(runtime) {
        const members = runtime.members;
        return (members.m_env_state ?? 0);
    }
    function method_debug_eg_attenuation(runtime) {
        const members = runtime.members;
        return (((members.m_env_attenuation ?? 0)) & 0xffff);
    }
    function method_debug_ssg_inverted(runtime) {
        const members = runtime.members;
        return (((members.m_ssg_inverted ?? 0)) & 0xff);
    }
    function method_debug_cache(runtime) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        return h_m_cache;
    }
    function method_fm_operator__opoffs(runtime) {
        const members = runtime.members;
        return (((members.m_opoffs ?? 0)) >>> 0);
    }
    function method_fm_operator__choffs(runtime) {
        const members = runtime.members;
        return (((members.m_choffs ?? 0)) >>> 0);
    }
    function method_fm_operator__set_choffs(runtime, choffs) {
        const members = runtime.members;
        members.m_choffs = ((choffs) >>> 0);
    }
    function method_fm_operator__phase(runtime) {
        const members = runtime.members;
        return (((((members.m_phase ?? 0)) >>> (10))) >>> 0);
    }
    function method_fm_operator__regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_fm_operator__debug_eg_state(runtime) {
        const members = runtime.members;
        return (members.m_env_state ?? 0);
    }
    function method_fm_operator__debug_eg_attenuation(runtime) {
        const members = runtime.members;
        return (((members.m_env_attenuation ?? 0)) & 0xffff);
    }
    function method_fm_operator__debug_ssg_inverted(runtime) {
        const members = runtime.members;
        return (((members.m_ssg_inverted ?? 0)) & 0xff);
    }
    function method_fm_operator__debug_cache(runtime) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        return h_m_cache;
    }
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        let count = ((0) & 0xff);
        for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
            value = ((((value) << (1))) >>> 0);
        }
        return count;
    }
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method_debug_cache_(runtime, __assigned) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        runtime.copyStruct(members.m_cache, __assigned);
        return h_m_cache;
    }
    function method_fm_operator__regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method_fm_operator__debug_cache_(runtime, __assigned) {
        const members = runtime.members;
        const h_m_cache = members.m_cache ?? 0;
        runtime.copyStruct(members.m_cache, __assigned);
        return h_m_cache;
    }
    function method___construct(runtime, owner, opoffs) {
        const members = runtime.members;
        let __t0;
        members.m_choffs = ((0) >>> 0);
        members.m_opoffs = ((opoffs) >>> 0);
        members.m_phase = ((0) >>> 0);
        members.m_env_attenuation = ((1023) & 0xffff);
        members.m_env_state = 4;
        members.m_ssg_inverted = ((0) & 0xff);
        members.m_key_state = ((0) & 0xff);
        members.m_keyon_live = ((0) & 0xff);
        members.m_regs = (__t0 = __deref___construct(runtime, owner), typeof __t0.regs === 'function' ? __t0.regs() : typeof __t0.regs === 'number' || typeof __t0.regs === 'boolean' ? __t0.regs : runtime.container(owner, "regs"));
        members.m_owner = owner;
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
        "fm_operator": method_fm_operator,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "prepare": method_prepare,
        "clock_keystate": method_clock_keystate,
        "start_attack": method_start_attack,
        "bitfield": method_bitfield,
        "start_release": method_start_release,
        "clock": method_clock,
        "clock_ssg_eg_state": method_clock_ssg_eg_state,
        "clock_envelope": method_clock_envelope,
        "attenuation_increment": method_attenuation_increment,
        "clock_phase": method_clock_phase,
        "compute_volume": method_compute_volume,
        "envelope_attenuation": method_envelope_attenuation,
        "attenuation_to_volume": method_attenuation_to_volume,
        "compute_noise_volume": method_compute_noise_volume,
        "keyonoff": method_keyonoff,
        "opoffs": method_opoffs,
        "choffs": method_choffs,
        "set_choffs": method_set_choffs,
        "phase": method_phase,
        "regs": method_regs,
        "debug_eg_state": method_debug_eg_state,
        "debug_eg_attenuation": method_debug_eg_attenuation,
        "debug_ssg_inverted": method_debug_ssg_inverted,
        "debug_cache": method_debug_cache,
        "fm_operator::opoffs": method_fm_operator__opoffs,
        "fm_operator::choffs": method_fm_operator__choffs,
        "fm_operator::set_choffs": method_fm_operator__set_choffs,
        "fm_operator::phase": method_fm_operator__phase,
        "fm_operator::regs": method_fm_operator__regs,
        "fm_operator::debug_eg_state": method_fm_operator__debug_eg_state,
        "fm_operator::debug_eg_attenuation": method_fm_operator__debug_eg_attenuation,
        "fm_operator::debug_ssg_inverted": method_fm_operator__debug_ssg_inverted,
        "fm_operator::debug_cache": method_fm_operator__debug_cache,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "regs=": method_regs_,
        "debug_cache=": method_debug_cache_,
        "fm_operator::regs=": method_fm_operator__regs_,
        "fm_operator::debug_cache=": method_fm_operator__debug_cache_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].allocations["fm_operator__opl_registers"].compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym3526"].allocations["fm_engine_base__opl_registers"].compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "bitfield": method_bitfield
        };
        return __methodTable;
    })(),
    "ymfm_output__1": (() => {
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
        function method_clear(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_clamp(runtime, h_data[index], -32768, 32767);
            }
            return (members.this ?? 0);
        }
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_roundtrip_fp(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_ymfm__roundtrip_fp(runtime, h_data[index]);
            }
            return (members.this ?? 0);
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "bitfield": method_bitfield
        };
        return __methodTable;
    })(),
};
definition.allocations["ym3526"].compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            let result = ((255) & 0xff);
            switch (((offset) & (1))) {
                case 0:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
                        break;
                    }
                case 1:
                    {
                        break;
                    }
            }
            return ((result) & 0xff);
        }
        function method_write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (1))) {
                case 0:
                    {
                        runtime.invoke("write_address", data);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("write_data", data);
                        break;
                    }
            }
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "read": method_read,
            "write": method_write
        };
        return __methodTable;
    })(),
    "ymfm_output__1": (() => {
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
        function method_clear(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_clamp(runtime, h_data[index], -32768, 32767);
            }
            return (members.this ?? 0);
        }
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_roundtrip_fp(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_ymfm__roundtrip_fp(runtime, h_data[index]);
            }
            return (members.this ?? 0);
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            let count = ((0) & 0xff);
            for (count = ((0) & 0xff); (((((value) | 0)) >= (0)) ? 1 : 0); count = ((((count) + (1))) & 0xff)) {
                value = ((((value) << (1))) >>> 0);
            }
            return count;
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            let result = ((255) & 0xff);
            switch (((offset) & (1))) {
                case 0:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
                        break;
                    }
                case 1:
                    {
                        break;
                    }
            }
            return ((result) & 0xff);
        }
        function method_write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (1))) {
                case 0:
                    {
                        runtime.invoke("write_address", data);
                        break;
                    }
                case 1:
                    {
                        runtime.invoke("write_data", data);
                        break;
                    }
            }
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "read": method_read,
            "write": method_write
        };
        return __methodTable;
    })(),
};
definition.allocations["ymfm_saved_state"].compiledMethods = (() => {
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
    function method_ymfm_saved_state(runtime, buffer, saving) {
        const members = runtime.members;
        if (saving) {
            (buffer = runtime.resize(buffer, 0));
        }
    }
    function method_saving(runtime) {
        const members = runtime.members;
        return ((((members.m_offset ?? 0)) < (0)) ? 1 : 0);
    }
    function method_save_restore(runtime, data) {
        const members = runtime.members;
        if (method_saving(runtime)) {
            runtime.invoke("save", data);
        }
        else {
            runtime.invoke("restore", data);
        }
    }
    function method_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (members.m_buffer).push(data);
        return (members.this ?? 0);
    }
    function method_read(runtime) {
        const members = runtime.members;
        let __t0;
        return ((((((((members.m_offset ?? 0)) < ((((members.m_buffer).length) | 0))) ? 1 : 0)) ? (runtime.readIndex((members.m_buffer ?? 0), (__t0 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) | 0), __t0))) : (0))) & 0xff);
    }
    function method_ymfm_saved_state__ymfm_saved_state(runtime, buffer, saving) {
        const members = runtime.members;
        if (saving) {
            (buffer = runtime.resize(buffer, 0));
        }
    }
    function method_ymfm_saved_state__saving(runtime) {
        const members = runtime.members;
        return ((((members.m_offset ?? 0)) < (0)) ? 1 : 0);
    }
    function method_ymfm_saved_state__save_restore(runtime, data) {
        const members = runtime.members;
        if (method_saving(runtime)) {
            runtime.invoke("save", data);
        }
        else {
            runtime.invoke("restore", data);
        }
    }
    function method_ymfm_saved_state__save(runtime, data) {
        const members = runtime.members;
        method_write(runtime, ((data) ? (1) : (0)));
    }
    function method_ymfm_saved_state__restore(runtime, data) {
        const members = runtime.members;
        data = ((((method_read(runtime)) ? (1) : (0))) ? 1 : 0);
        return data;
    }
    function method_ymfm_saved_state__write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (members.m_buffer).push(data);
        return (members.this ?? 0);
    }
    function method_ymfm_saved_state__read(runtime) {
        const members = runtime.members;
        let __t0;
        return ((((((((members.m_offset ?? 0)) < ((((members.m_buffer).length) | 0))) ? 1 : 0)) ? (runtime.readIndex((members.m_buffer ?? 0), (__t0 = (members.m_offset ?? 0), members.m_offset = ((((members.m_offset) + (1))) | 0), __t0))) : (0))) & 0xff);
    }
    function method_ymfm__roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_count_leading_zeros(runtime, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["__builtin_clz"];
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
    }
    function method_clamp(runtime, value, minval, maxval) {
        const members = runtime.members;
        if ((((value) < (minval)) ? 1 : 0)) {
            return minval;
        }
        if ((((value) > (maxval)) ? 1 : 0)) {
            return maxval;
        }
        return value;
    }
    function method_roundtrip_fp(runtime, value) {
        const members = runtime.members;
        if (((Number(value) < Number(-32768)) ? 1 : 0)) {
            return -32768;
        }
        if ((((value) > (32767)) ? 1 : 0)) {
            return 32767;
        }
        let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
        let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
        exponent = ((cppMax(+(exponent), +(1))) | 0);
        exponent = ((((exponent) - (1))) | 0);
        let mask = ((((((1) << (exponent))) - (1))) | 0);
        return ((value) & ((~mask)));
    }
    function method_write_(runtime, data, __assigned) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (members.m_buffer).push(data);
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method_ymfm_saved_state__write_(runtime, data, __assigned) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (members.m_buffer).push(data);
        runtime.pointerStore((members.this ?? 0), __assigned);
        return (members.this ?? 0);
    }
    function method___construct(runtime, buffer, saving) {
        const members = runtime.members;
        members.m_buffer = buffer;
        members.m_offset = ((((saving) ? (-1) : (0))) | 0);
        if (saving) {
            (buffer = runtime.resize(buffer, 0));
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "ymfm_saved_state": method_ymfm_saved_state,
        "saving": method_saving,
        "save_restore": method_save_restore,
        "write": method_write,
        "read": method_read,
        "ymfm_saved_state::ymfm_saved_state": method_ymfm_saved_state__ymfm_saved_state,
        "ymfm_saved_state::saving": method_ymfm_saved_state__saving,
        "ymfm_saved_state::save_restore": method_ymfm_saved_state__save_restore,
        "ymfm_saved_state::save": method_ymfm_saved_state__save,
        "ymfm_saved_state::write": method_ymfm_saved_state__write,
        "ymfm_saved_state::read": method_ymfm_saved_state__read,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "write=": method_write_,
        "ymfm_saved_state::write=": method_ymfm_saved_state__write_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ymfm_saved_state"].compiledMethodLinks = ["__builtin_clz"];
definition.allocations["ymfm_saved_state"].compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["__builtin_clz"];
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
        }
        function method_ymfm_saved_state__restore(runtime, data) {
            const members = runtime.members;
            data = ((((runtime.invoke("read")) ? (1) : (0))) ? 1 : 0);
            return data;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.compiledStructMethods = {
    "ymfm_output": (() => {
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
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["__builtin_clz"];
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
        }
        function method_ymfm_sync_mode_write(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.synchronize("fm_mode_write", data);
        }
        function method_ymfm_update_irq(runtime, asserted) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_update_irq"];
            (__L0 ? __L0(Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
        }
        function method_ymfm_interface__ymfm_is_busy(runtime) {
            const members = runtime.members;
            return 0;
        }
        function method_irq_handler(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq_handler(runtime, members.m_update_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_update_irq, "bind"));
        }
        function __deref_irq_handler(runtime, p) {
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
        function method_io_read_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_io_read_handler(runtime, runtime.readIndex((members.m_io_read ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_io_read_handler(runtime, p) {
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
        function method_io_write_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_io_write_handler(runtime, runtime.readIndex((members.m_io_write ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_io_write_handler(runtime, p) {
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
        function method_ym_generic_device__irq_handler(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ym_generic_device__irq_handler(runtime, members.m_update_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_update_irq, "bind"));
        }
        function __deref_ym_generic_device__irq_handler(runtime, p) {
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
        function method_ym_generic_device__io_read_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ym_generic_device__io_read_handler(runtime, runtime.readIndex((members.m_io_read ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_ym_generic_device__io_read_handler(runtime, p) {
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
        function method_ym_generic_device__io_write_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ym_generic_device__io_write_handler(runtime, runtime.readIndex((members.m_io_write ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_ym_generic_device__io_write_handler(runtime, p) {
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
        function method_ym_generic_device__ymfm_sync_mode_write(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.synchronize("fm_mode_write", data);
        }
        function method_ym_generic_device__ymfm_update_irq(runtime, asserted) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_update_irq"];
            (__L0 ? __L0(Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            return (((__deref_read(runtime, runtime.invoke("update_streams")).read?.(offset) ?? 0)) & 0xff);
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
        function method_status_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_status_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status === 'function' ? (__t0.read_status() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status"))) & 0xff);
        }
        function __deref_status_r(runtime, p) {
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
            (__deref_write(runtime, runtime.invoke("update_streams")).write?.(offset, data) ?? 0);
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
            runtime.invoke("update_internal", stream);
        }
        function method_ymfm_device_base__read(runtime, offset) {
            const members = runtime.members;
            return (((__deref_ymfm_device_base__read(runtime, runtime.invoke("update_streams")).read?.(offset) ?? 0)) & 0xff);
        }
        function __deref_ymfm_device_base__read(runtime, p) {
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
        function method_ymfm_device_base__status_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ymfm_device_base__status_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status === 'function' ? (__t0.read_status() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status"))) & 0xff);
        }
        function __deref_ymfm_device_base__status_r(runtime, p) {
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
        function method_ymfm_device_base__write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            (__deref_ymfm_device_base__write(runtime, runtime.invoke("update_streams")).write?.(offset, data) ?? 0);
        }
        function __deref_ymfm_device_base__write(runtime, p) {
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
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "ymfm_sync_mode_write": method_ymfm_sync_mode_write,
            "ymfm_update_irq": method_ymfm_update_irq,
            "ymfm_interface::ymfm_is_busy": method_ymfm_interface__ymfm_is_busy,
            "irq_handler": method_irq_handler,
            "io_read_handler": method_io_read_handler,
            "io_write_handler": method_io_write_handler,
            "ym_generic_device::irq_handler": method_ym_generic_device__irq_handler,
            "ym_generic_device::io_read_handler": method_ym_generic_device__io_read_handler,
            "ym_generic_device::io_write_handler": method_ym_generic_device__io_write_handler,
            "ym_generic_device::ymfm_sync_mode_write": method_ym_generic_device__ymfm_sync_mode_write,
            "ym_generic_device::ymfm_update_irq": method_ym_generic_device__ymfm_update_irq,
            "read": method_read,
            "status_r": method_status_r,
            "write": method_write,
            "sound_stream_update": method_sound_stream_update,
            "ymfm_device_base::read": method_ymfm_device_base__read,
            "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
            "ymfm_device_base::write": method_ymfm_device_base__write
        };
        return __methodTable;
    })(),
    "ymfm_output__1": (() => {
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
        function method_clear(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_clamp(runtime, h_data[index], -32768, 32767);
            }
            return (members.this ?? 0);
        }
        function method_clamp(runtime, value, minval, maxval) {
            const members = runtime.members;
            if ((((value) < (minval)) ? 1 : 0)) {
                return minval;
            }
            if ((((value) > (maxval)) ? 1 : 0)) {
                return maxval;
            }
            return value;
        }
        function method_roundtrip_fp(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (1)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = method_ymfm__roundtrip_fp(runtime, h_data[index]);
            }
            return (members.this ?? 0);
        }
        function method_ymfm__roundtrip_fp(runtime, value) {
            const members = runtime.members;
            if (((Number(value) < Number(-32768)) ? 1 : 0)) {
                return -32768;
            }
            if ((((value) > (32767)) ? 1 : 0)) {
                return 32767;
            }
            let scanvalue = ((((value) ^ (runtime.shiftRight(((value) | 0), 31)))) | 0);
            let exponent = ((runtime.subtract(7, method_count_leading_zeros(runtime, ((scanvalue) << (17))))) | 0);
            exponent = ((cppMax(+(exponent), +(1))) | 0);
            exponent = ((((exponent) - (1))) | 0);
            let mask = ((((((1) << (exponent))) - (1))) | 0);
            return ((value) & ((~mask)));
        }
        function method_count_leading_zeros(runtime, value) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["__builtin_clz"];
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
        }
        function method_ymfm_sync_mode_write(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.synchronize("fm_mode_write", data);
        }
        function method_ymfm_update_irq(runtime, asserted) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_update_irq"];
            (__L0 ? __L0(Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
        }
        function method_ymfm_interface__ymfm_is_busy(runtime) {
            const members = runtime.members;
            return 0;
        }
        function method_irq_handler(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_irq_handler(runtime, members.m_update_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_update_irq, "bind"));
        }
        function __deref_irq_handler(runtime, p) {
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
        function method_io_read_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_io_read_handler(runtime, runtime.readIndex((members.m_io_read ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_io_read_handler(runtime, p) {
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
        function method_io_write_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_io_write_handler(runtime, runtime.readIndex((members.m_io_write ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_io_write_handler(runtime, p) {
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
        function method_ym_generic_device__irq_handler(runtime) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ym_generic_device__irq_handler(runtime, members.m_update_irq), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_update_irq, "bind"));
        }
        function __deref_ym_generic_device__irq_handler(runtime, p) {
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
        function method_ym_generic_device__io_read_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ym_generic_device__io_read_handler(runtime, runtime.readIndex((members.m_io_read ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_ym_generic_device__io_read_handler(runtime, p) {
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
        function method_ym_generic_device__io_write_handler(runtime, index = 0) {
            const members = runtime.members;
            let __t0;
            return (__t0 = __deref_ym_generic_device__io_write_handler(runtime, runtime.readIndex((members.m_io_write ?? 0), ((index) & (1)))), typeof __t0.bind === 'function' ? (__t0.bind() ?? 0) : runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
        }
        function __deref_ym_generic_device__io_write_handler(runtime, p) {
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
        function method_ym_generic_device__ymfm_sync_mode_write(runtime, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            runtime.synchronize("fm_mode_write", data);
        }
        function method_ym_generic_device__ymfm_update_irq(runtime, asserted) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["m_update_irq"];
            (__L0 ? __L0(Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            return (((__deref_read(runtime, runtime.invoke("update_streams")).read?.(offset) ?? 0)) & 0xff);
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
        function method_status_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_status_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status === 'function' ? (__t0.read_status() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status"))) & 0xff);
        }
        function __deref_status_r(runtime, p) {
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
            (__deref_write(runtime, runtime.invoke("update_streams")).write?.(offset, data) ?? 0);
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
            runtime.invoke("update_internal", stream);
        }
        function method_ymfm_device_base__read(runtime, offset) {
            const members = runtime.members;
            return (((__deref_ymfm_device_base__read(runtime, runtime.invoke("update_streams")).read?.(offset) ?? 0)) & 0xff);
        }
        function __deref_ymfm_device_base__read(runtime, p) {
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
        function method_ymfm_device_base__status_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ymfm_device_base__status_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status === 'function' ? (__t0.read_status() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status"))) & 0xff);
        }
        function __deref_ymfm_device_base__status_r(runtime, p) {
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
        function method_ymfm_device_base__write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            (__deref_ymfm_device_base__write(runtime, runtime.invoke("update_streams")).write?.(offset, data) ?? 0);
        }
        function __deref_ymfm_device_base__write(runtime, p) {
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
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "ymfm_sync_mode_write": method_ymfm_sync_mode_write,
            "ymfm_update_irq": method_ymfm_update_irq,
            "ymfm_interface::ymfm_is_busy": method_ymfm_interface__ymfm_is_busy,
            "irq_handler": method_irq_handler,
            "io_read_handler": method_io_read_handler,
            "io_write_handler": method_io_write_handler,
            "ym_generic_device::irq_handler": method_ym_generic_device__irq_handler,
            "ym_generic_device::io_read_handler": method_ym_generic_device__io_read_handler,
            "ym_generic_device::io_write_handler": method_ym_generic_device__io_write_handler,
            "ym_generic_device::ymfm_sync_mode_write": method_ym_generic_device__ymfm_sync_mode_write,
            "ym_generic_device::ymfm_update_irq": method_ym_generic_device__ymfm_update_irq,
            "read": method_read,
            "status_r": method_status_r,
            "write": method_write,
            "sound_stream_update": method_sound_stream_update,
            "ymfm_device_base::read": method_ymfm_device_base__read,
            "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
            "ymfm_device_base::write": method_ymfm_device_base__write
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
