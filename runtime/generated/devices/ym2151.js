import deviceData from './ym2151.device.ir.json' with { type: 'json' };
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
        members.m_stream = (__L1 ? __L1(0, 2, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) : runtime.macro("stream_alloc", 0, 2, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)));
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
        if (((((members.m_reset_state ?? 0)) === (0)) ? 1 : 0)) {
            return;
        }
        method_ymfm_device_base__write(runtime, offset, data);
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
    function method_address_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((((members.m_reset_state ?? 0)) === (0)) ? 1 : 0)) {
            return;
        }
        method_ymfm_device_base__address_w(runtime, data);
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
    function method_data_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((((members.m_reset_state ?? 0)) === (0)) ? 1 : 0)) {
            return;
        }
        method_ymfm_device_base__data_w(runtime, data);
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
                let eff_outnum = ((((((outnum) + (output_shift))) % (2))) | 0);
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
                let eff_outnum = ((((((outnum) + (output_shift))) % (2))) | 0);
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
    function method_ymfm_device_base__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clock"], __L1 = __l["stream_alloc"], __L2 = __l["NAME"], __L3 = __l["save_item"];
        const h_m_save_blob = members.m_save_blob ?? 0;
        method_ym_generic_device__device_start(runtime);
        members.m_stream = (__L1 ? __L1(0, 2, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) : runtime.macro("stream_alloc", 0, 2, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)));
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
    function method_reset_w(runtime, state) {
        const members = runtime.members;
        let __t0;
        if ((((state) !== ((members.m_reset_state ?? 0))) ? 1 : 0)) {
            (__t0 = __deref_reset_w(runtime, members.m_stream), typeof __t0.update === 'function' ? __t0.update() : typeof __t0.update === 'number' || typeof __t0.update === 'boolean' ? __t0.update : runtime.container(members.m_stream, "update"));
            members.m_reset_state = ((state) & 0xff);
            if ((((state) !== (0)) ? 1 : 0)) {
                (members.m_chip.reset?.() ?? 0);
            }
        }
    }
    function __deref_reset_w(runtime, p) {
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
    function method_port_write_handler(runtime) {
        const members = runtime.members;
        return method_io_write_handler(runtime);
    }
    function method_ym2151_device__port_write_handler(runtime) {
        const members = runtime.members;
        return method_io_write_handler(runtime);
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
        "ymfm_device_base::write": method_ymfm_device_base__write,
        "address_w": method_address_w,
        "ymfm_device_base::address_w": method_ymfm_device_base__address_w,
        "data_w": method_data_w,
        "ymfm_device_base::data_w": method_ymfm_device_base__data_w,
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
        "ymfm_device_base::device_start": method_ymfm_device_base__device_start,
        "ymfm_device_base::device_reset": method_ymfm_device_base__device_reset,
        "ymfm_device_base::device_clock_changed": method_ymfm_device_base__device_clock_changed,
        "ymfm_device_base::device_pre_save": method_ymfm_device_base__device_pre_save,
        "ymfm_device_base::device_post_load": method_ymfm_device_base__device_post_load,
        "ymfm_device_base::sound_stream_update": method_ymfm_device_base__sound_stream_update,
        "ymfm_device_base::update_streams": method_ymfm_device_base__update_streams,
        "reset_w": method_reset_w,
        "port_write_handler": method_port_write_handler,
        "ym2151_device::port_write_handler": method_ym2151_device__port_write_handler,
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
definition.allocations["ym2151"].compiledMethods = (() => {
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
        (members.m_fm.save_restore?.(state) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_address ?? 0)) ?? 0);
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
        let __t0;
        let result = (((members.m_fm.status?.() ?? 0)) & 0xff);
        if ((__t0 = __deref_read_status(runtime, (members.m_fm.intf?.() ?? 0)), typeof __t0.ymfm_is_busy === 'function' ? (__t0.ymfm_is_busy() ?? 0) : runtime.container((members.m_fm.intf?.() ?? 0), "ymfm_is_busy"))) {
            result = ((((result) | (128))) & 0xff);
        }
        return ((result) & 0xff);
    }
    function __deref_read_status(runtime, p) {
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
    function method_read(runtime, offset) {
        const members = runtime.members;
        let result = ((255) & 0xff);
        switch (((offset) & (1))) {
            case 0:
                {
                    /* debug::log_unexpected_read_write: no effect */
                    break;
                }
            case 1:
                {
                    result = ((method_read_status(runtime)) & 0xff);
                    break;
                }
        }
        return ((result) & 0xff);
    }
    function method_write_address(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_address = ((data) & 0xff);
    }
    function method_write_data(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (members.m_fm.write?.((members.m_address ?? 0), data) ?? 0);
        if (((((members.m_address ?? 0)) === (27)) ? 1 : 0)) {
            (__deref_write_data(runtime, (members.m_fm.intf?.() ?? 0)).ymfm_external_write?.(0, 0, ((data) >>> (6))) ?? 0);
        }
        (__deref_write_data(runtime, (members.m_fm.intf?.() ?? 0)).ymfm_set_busy_end?.(((32) * ((members.m_fm.clock_prescale?.() ?? 0)))) ?? 0);
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
            (members.m_fm.clock?.(255) ?? 0);
            (members.m_fm.output?.((__t0 = __deref_generate(runtime, output), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(output, "clear")), 0, 32767, 255) ?? 0);
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
    function method_ym2151__sample_rate(runtime, input_clock) {
        const members = runtime.members;
        return (((members.m_fm.sample_rate?.(input_clock) ?? 0)) >>> 0);
    }
    function method_ym2151__invalidate_caches(runtime) {
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
    function method___construct(runtime, intf, variant) {
        const members = runtime.members;
        members.m_variant = variant;
        members.m_address = ((0) & 0xff);
        members.m_fm = runtime.invoke("new::fm_engine_base__opm_registers", intf);
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
        "ym2151::sample_rate": method_ym2151__sample_rate,
        "ym2151::invalidate_caches": method_ym2151__invalidate_caches,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].compiledMethods = (() => {
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
        let __t0, __t1;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_operator = members.m_operator ?? 0;
        method_set_reset_status(runtime, 0, 255);
        (members.m_regs.reset?.() ?? 0);
        method_write(runtime, 20, 0);
        for (let __range0 = h_m_channel, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__t0 = __deref_reset(runtime, __range0_item), typeof __t0.reset === 'function' ? (__t0.reset() ?? 0) : runtime.container(__range0_item, "reset"));
        }
        for (let __range0 = h_m_operator, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__t1 = __deref_reset(runtime, __range0_item), typeof __t1.reset === 'function' ? (__t1.reset() ?? 0) : runtime.container(__range0_item, "reset"));
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
        set = ((set) & 0xff);
        reset = ((reset) & 0xff);
        members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (128)))))) & 0xff);
        (members.m_intf.ymfm_sync_check_interrupts?.() ?? 0);
        return (((((members.m_status ?? 0)) & ((~(members.m_regs.status_mask?.() ?? 0))))) & 0xff);
    }
    function method_write(runtime, regnum, data) {
        const members = runtime.members;
        regnum = ((regnum) & 0xffff);
        data = ((data) & 0xff);
        const h_m_channel = members.m_channel ?? 0;
        /* debug::log_fm_write: no effect */
        if (((Number(regnum) === Number(20)) ? 1 : 0)) {
            (members.m_intf.ymfm_sync_mode_write?.(data) ?? 0);
            return;
        }
        members.m_modified_channels = ((255) >>> 0);
        let keyon_channel = ((0) >>> 0);
        let keyon_opmask = ((0) >>> 0);
        if ((members.m_regs.write?.(regnum, data, ({ generatedLValue: true, get: () => keyon_channel, set: (value) => { keyon_channel = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => keyon_opmask, set: (value) => { keyon_opmask = ((value) >>> 0); } })) ?? 0)) {
            if (((Number(keyon_channel) < Number(8)) ? 1 : 0)) {
                (h_m_channel[keyon_channel].keyonoff?.(keyon_opmask, 0, keyon_channel) ?? 0);
            }
            else {
                if ((((0) && (((Number(keyon_channel) === Number(255)) ? 1 : 0))) ? 1 : 0)) {
                    (h_m_channel[6].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 4)) ? (3) : (0)), 1, 6) ?? 0);
                    (h_m_channel[7].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 0)) | (((method_bitfield(runtime, keyon_opmask, 3)) << (1)))), 1, 7) ?? 0);
                    (h_m_channel[8].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 2)) | (((method_bitfield(runtime, keyon_opmask, 1)) << (1)))), 1, 8) ?? 0);
                }
            }
        }
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
        (members.m_regs.save_restore?.(state) ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            (h_m_channel[chnum].save_restore?.(state) ?? 0);
        }
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number(32)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
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
        members.m_modified_channels = ((255) >>> 0);
    }
    function method_clock(runtime, chanmask) {
        const members = runtime.members;
        let __t0;
        const h_m_channel = members.m_channel ?? 0;
        members.m_total_clocks = ((((members.m_total_clocks) + (1))) & 0xff);
        if ((((((((members.m_modified_channels ?? 0)) !== (0)) ? 1 : 0)) || (((Number((__t0 = (members.m_prepare_count ?? 0), members.m_prepare_count = ((((members.m_prepare_count) + (1))) >>> 0), __t0)) >= Number(4096)) ? 1 : 0))) ? 1 : 0)) {
            if (0) {
                method_assign_operators(runtime);
            }
            members.m_active_channels = ((0) >>> 0);
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, chanmask, chnum)) {
                    if ((h_m_channel[chnum].prepare?.() ?? 0)) {
                        members.m_active_channels = ((((members.m_active_channels) | (((1) << (chnum))))) >>> 0);
                    }
                }
            }
            members.m_modified_channels = (((members.m_prepare_count = ((0) >>> 0))) >>> 0);
        }
        if (0) {
            members.m_env_counter = ((((members.m_env_counter) + (4))) >>> 0);
        }
        else {
            if (((Number(method_bitfield(runtime, (members.m_env_counter = ((((members.m_env_counter) + (1))) >>> 0)), 0, 2)) === Number(3)) ? 1 : 0)) {
                members.m_env_counter = ((((members.m_env_counter) + (1))) >>> 0);
            }
        }
        let lfo_raw_pm = (((members.m_regs.clock_noise_and_lfo?.() ?? 0)) | 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            if (method_bitfield(runtime, chanmask, chnum)) {
                (h_m_channel[chnum].clock?.((members.m_env_counter ?? 0), lfo_raw_pm) ?? 0);
            }
        }
        return (((members.m_env_counter ?? 0)) >>> 0);
    }
    function method_assign_operators(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["STRUCT_OF"];
        const h_m_operator = members.m_operator ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        let map = (__L0 ? __L0("operator_mapping") : runtime.macro("STRUCT_OF", "operator_mapping"));
        (members.m_regs.operator_map?.(({ generatedLValue: true, get: () => map, set: (value) => { map = value; } })) ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            for (let index = ((0) >>> 0); (((index) < (4)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                let opnum = ((method_bitfield(runtime, runtime.readIndex(map.chan, chnum), ((8) * (index)), 8)) >>> 0);
                (h_m_channel[chnum].assign?.(index, (((((opnum) === (255)) ? 1 : 0)) ? (0) : (h_m_operator[opnum]))) ?? 0);
            }
        }
    }
    function method_output(runtime, output, rshift, clipmax, chanmask) {
        const members = runtime.members;
        const h_m_operator = members.m_operator ?? 0;
        const h_m_channel = members.m_channel ?? 0;
        chanmask = ((((chanmask) & (4294967295))) >>> 0);
        if (1) {
            chanmask = ((((chanmask) & ((members.m_active_channels ?? 0)))) >>> 0);
        }
        if ((members.m_regs.rhythm_enable?.() ?? 0)) {
            let op13phase = (((h_m_operator[13].phase?.() ?? 0)) >>> 0);
            let op17phase = (((h_m_operator[17].phase?.() ?? 0)) >>> 0);
            let phase_select = ((((((((method_bitfield(runtime, op13phase, 2)) ^ (method_bitfield(runtime, op13phase, 7)))) | (method_bitfield(runtime, op13phase, 3)))) | (((method_bitfield(runtime, op17phase, 5)) ^ (method_bitfield(runtime, op17phase, 3)))))) >>> 0);
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
    function method_status(runtime) {
        const members = runtime.members;
        return (((((((members.m_status ?? 0)) & (-129))) & ((~(members.m_regs.status_mask?.() ?? 0))))) & 0xff);
    }
    function method_update_timer(runtime, tnum, enable, delta_clocks) {
        const members = runtime.members;
        const h_m_timer_running = members.m_timer_running ?? 0;
        if ((((enable) && (((h_m_timer_running[tnum]) ? 0 : 1))) ? 1 : 0)) {
            let period = (((((((tnum) === (0)) ? 1 : 0)) ? (runtime.subtract(1024, (members.m_regs.timer_a_value?.() ?? 0))) : (((16) * (runtime.subtract(256, (members.m_regs.timer_b_value?.() ?? 0))))))) >>> 0);
            period = ((((period) + (delta_clocks))) >>> 0);
            (members.m_intf.ymfm_set_timer?.(tnum, ((((period) * (32))) * ((members.m_clock_prescale ?? 0)))) ?? 0);
            h_m_timer_running[tnum] = 1;
        }
        else {
            if (((enable) ? 0 : 1)) {
                (members.m_intf.ymfm_set_timer?.(tnum, -1) ?? 0);
                h_m_timer_running[tnum] = 0;
            }
        }
    }
    function method_engine_timer_expired(runtime, tnum) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_timer_running = members.m_timer_running ?? 0;
        if (((((((tnum) === (0)) ? 1 : 0)) && ((members.m_regs.enable_timer_a?.() ?? 0))) ? 1 : 0)) {
            method_set_reset_status(runtime, 1, 0);
        }
        else {
            if (((((((tnum) === (1)) ? 1 : 0)) && ((members.m_regs.enable_timer_b?.() ?? 0))) ? 1 : 0)) {
                method_set_reset_status(runtime, 2, 0);
            }
        }
        if (((((((tnum) === (0)) ? 1 : 0)) && ((members.m_regs.csm?.() ?? 0))) ? 1 : 0)) {
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, 255, chnum)) {
                    (h_m_channel[chnum].keyonoff?.(15, 2, chnum) ?? 0);
                    members.m_modified_channels = ((((members.m_modified_channels) | (((1) << (chnum))))) >>> 0);
                }
            }
        }
        h_m_timer_running[tnum] = 0;
        method_update_timer(runtime, tnum, 1, 0);
    }
    function method_engine_check_interrupts(runtime) {
        const members = runtime.members;
        let old_state = (((members.m_irq_state ?? 0)) & 0xff);
        members.m_irq_state = ((((Number((((((members.m_status ?? 0)) & ((members.m_irq_mask ?? 0)))) & ((~(members.m_regs.status_mask?.() ?? 0))))) !== Number(0)) ? 1 : 0)) & 0xff);
        if ((members.m_irq_state ?? 0)) {
            members.m_status = ((((members.m_status) | (0))) & 0xff);
        }
        else {
            members.m_status = ((((members.m_status) & (-1))) & 0xff);
        }
        if ((((old_state) !== ((members.m_irq_state ?? 0))) ? 1 : 0)) {
            (members.m_intf.ymfm_update_irq?.((((members.m_irq_state ?? 0)) ? (1) : (0))) ?? 0);
        }
    }
    function method_engine_mode_write(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_modified_channels = ((255) >>> 0);
        let dummy1 = ((0) >>> 0);
        let dummy2 = ((0) >>> 0);
        (members.m_regs.write?.(20, data, ({ generatedLValue: true, get: () => dummy1, set: (value) => { dummy1 = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => dummy2, set: (value) => { dummy2 = ((value) >>> 0); } })) ?? 0);
        if ((members.m_regs.irq_reset?.() ?? 0)) {
            method_set_reset_status(runtime, 0, 120);
        }
        else {
            let reset_mask = ((0) & 0xff);
            if ((members.m_regs.reset_timer_b?.() ?? 0)) {
                reset_mask = ((((reset_mask) | (2))) & 0xff);
            }
            if ((members.m_regs.reset_timer_a?.() ?? 0)) {
                reset_mask = ((((reset_mask) | (1))) & 0xff);
            }
            method_set_reset_status(runtime, 0, reset_mask);
            method_update_timer(runtime, 1, (members.m_regs.load_timer_b?.() ?? 0), (-(((members.m_total_clocks ?? 0)) & (15))));
            method_update_timer(runtime, 0, (members.m_regs.load_timer_a?.() ?? 0), 0);
        }
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
        return ((runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (32)))) >>> 0);
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
        set = ((set) & 0xff);
        reset = ((reset) & 0xff);
        members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (128)))))) & 0xff);
        (members.m_intf.ymfm_sync_check_interrupts?.() ?? 0);
        return (((((members.m_status ?? 0)) & ((~(members.m_regs.status_mask?.() ?? 0))))) & 0xff);
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
        return ((runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (32)))) >>> 0);
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
        members.m_modified_channels = ((255) >>> 0);
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
    function method_opm_registers__channel_offset(runtime, chnum) {
        const members = runtime.members;
        return chnum;
    }
    function method_opm_registers__operator_offset(runtime, opnum) {
        const members = runtime.members;
        return opnum;
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
        members.m_clock_prescale = ((2) & 0xff);
        members.m_irq_mask = ((3) & 0xff);
        members.m_irq_state = ((0) & 0xff);
        h_m_timer_running[0] = 0;
        h_m_timer_running[1] = 0;
        members.m_total_clocks = ((0) & 0xff);
        members.m_active_channels = ((255) >>> 0);
        members.m_modified_channels = ((255) >>> 0);
        members.m_prepare_count = ((0) >>> 0);
        (members.m_intf ?? 0).m_engine = (members.this ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(8)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            h_m_channel[chnum] = runtime.invoke("new::fm_channel__opm_registers", (members.this ?? 0), method_opm_registers__channel_offset(runtime, chnum));
        }
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number(32)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            h_m_operator[opnum] = runtime.invoke("new::fm_operator__opm_registers", (members.this ?? 0), method_opm_registers__operator_offset(runtime, opnum));
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
        "opm_registers::channel_offset": method_opm_registers__channel_offset,
        "opm_registers::operator_offset": method_opm_registers__operator_offset,
        "intf=": method_intf_,
        "regs=": method_regs_,
        "fm_engine_base::intf=": method_fm_engine_base__intf_,
        "fm_engine_base::regs=": method_fm_engine_base__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].compiledMethodLinks = ["STRUCT_OF"];
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["opm_registers"].compiledMethods = (() => {
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
    const __mame_table_0 = [41568, 41600, 41632, 41664, 41696, 41728, 41760, 41792, 41856, 41888, 41920, 41952, 42016, 42048, 42080, 42112, 42176, 42208, 42240, 42272, 42304, 42336, 42368, 42400, 42464, 42496, 42528, 42560, 42624, 42656, 42688, 42720, 42784, 42816, 42848, 42880, 42912, 42944, 42976, 43008, 43072, 43104, 43136, 43168, 43232, 43264, 43296, 43328, 43392, 43424, 43456, 43488, 43552, 43584, 43616, 43648, 43712, 43744, 43776, 43808, 43872, 43904, 43936, 43968, 44032, 44064, 44096, 44128, 44192, 44224, 44256, 44288, 44352, 44384, 44416, 44448, 44512, 44544, 44576, 44608, 44672, 44704, 44736, 44768, 44832, 44864, 44896, 44928, 44992, 45024, 45056, 45088, 45152, 45184, 45216, 45248, 45312, 45344, 45376, 45408, 45472, 45504, 45536, 45568, 45632, 45664, 45728, 45760, 45792, 45824, 45888, 45920, 45984, 46016, 46048, 46080, 46144, 46176, 46208, 46240, 46304, 46336, 46368, 46400, 46464, 46496, 46528, 46560, 46656, 46688, 46720, 46752, 46816, 46848, 46880, 46912, 46976, 47008, 47072, 47104, 47136, 47168, 47232, 47264, 47328, 47360, 47392, 47424, 47488, 47520, 47552, 47584, 47648, 47680, 47744, 47776, 47808, 47840, 47904, 47936, 48032, 48064, 48096, 48128, 48192, 48224, 48288, 48320, 48384, 48416, 48448, 48480, 48544, 48576, 48640, 48672, 48736, 48768, 48800, 48832, 48896, 48928, 48992, 49024, 49088, 49120, 49152, 49184, 49248, 49280, 49344, 49376, 49440, 49472, 49504, 49536, 49600, 49632, 49696, 49728, 49792, 49824, 49856, 49888, 49952, 49984, 50048, 50080, 50144, 50176, 50208, 50240, 50304, 50336, 50400, 50432, 50496, 50528, 50560, 50592, 50656, 50688, 50752, 50784, 50880, 50912, 50944, 50976, 51040, 51072, 51136, 51168, 51232, 51264, 51328, 51360, 51424, 51456, 51488, 51520, 51616, 51648, 51680, 51712, 51776, 51808, 51872, 51904, 51968, 52000, 52064, 52096, 52160, 52192, 52224, 52256, 52384, 52416, 52448, 52480, 52544, 52576, 52640, 52672, 52736, 52768, 52832, 52864, 52928, 52960, 52992, 53024, 53120, 53152, 53216, 53248, 53312, 53344, 53408, 53440, 53504, 53536, 53600, 53632, 53696, 53728, 53792, 53824, 53920, 53952, 54016, 54048, 54112, 54144, 54208, 54240, 54304, 54336, 54400, 54432, 54496, 54528, 54592, 54624, 54688, 54720, 54784, 54816, 54880, 54912, 54976, 55008, 55072, 55104, 55168, 55200, 55264, 55296, 55360, 55392, 55488, 55520, 55584, 55616, 55680, 55712, 55776, 55808, 55872, 55936, 55968, 56032, 56064, 56128, 56160, 56224, 56288, 56320, 56384, 56416, 56480, 56512, 56576, 56608, 56672, 56736, 56768, 56832, 56864, 56928, 56960, 57024, 57120, 57152, 57216, 57248, 57312, 57376, 57408, 57472, 57536, 57568, 57632, 57664, 57728, 57792, 57824, 57888, 57952, 57984, 58048, 58080, 58144, 58208, 58240, 58304, 58368, 58400, 58464, 58496, 58560, 58624, 58656, 58720, 58784, 58816, 58880, 58912, 58976, 59040, 59072, 59136, 59200, 59232, 59296, 59328, 59392, 59456, 59488, 59552, 59648, 59680, 59744, 59776, 59840, 59904, 59936, 60000, 60064, 60128, 60160, 60224, 60288, 60320, 60384, 60416, 60512, 60544, 60608, 60640, 60704, 60768, 60800, 60864, 60928, 60992, 61024, 61088, 61152, 61184, 61248, 61280, 61376, 61408, 61472, 61536, 61600, 61632, 61696, 61760, 61824, 61856, 61920, 61984, 62048, 62080, 62144, 62208, 62272, 62304, 62368, 62432, 62496, 62528, 62592, 62656, 62720, 62752, 62816, 62880, 62944, 62976, 63040, 63104, 63200, 63232, 63296, 63360, 63424, 63456, 63520, 63584, 63648, 63680, 63744, 63808, 63872, 63904, 63968, 64032, 64096, 64128, 64192, 64256, 64320, 64352, 64416, 64480, 64544, 64608, 64672, 64704, 64768, 64832, 64896, 64928, 65024, 65056, 65120, 65184, 65248, 65312, 65376, 65408, 65504, 65536, 65600, 65664, 65728, 65792, 65856, 65888, 65984, 66016, 66080, 66144, 66208, 66272, 66336, 66368, 66464, 66496, 66560, 66624, 66688, 66752, 66816, 66848, 66944, 66976, 67040, 67104, 67168, 67232, 67296, 67328, 67424, 67456, 67520, 67584, 67648, 67712, 67776, 67808, 67904, 67936, 68000, 68064, 68128, 68192, 68256, 68288, 68384, 68448, 68512, 68544, 68640, 68672, 68736, 68800, 68896, 68928, 68992, 69056, 69120, 69184, 69248, 69280, 69376, 69440, 69504, 69536, 69632, 69664, 69728, 69792, 69920, 69952, 70016, 70080, 70144, 70208, 70272, 70304, 70400, 70464, 70528, 70560, 70656, 70688, 70752, 70816, 70912, 70976, 71040, 71104, 71136, 71232, 71264, 71360, 71424, 71488, 71552, 71616, 71648, 71744, 71776, 71872, 71968, 72032, 72096, 72160, 72192, 72288, 72320, 72416, 72480, 72544, 72608, 72672, 72704, 72800, 72832, 72928, 72992, 73056, 73120, 73184, 73216, 73312, 73344, 73440, 73504, 73568, 73632, 73696, 73728, 73824, 73856, 73952, 74080, 74144, 74208, 74272, 74304, 74400, 74432, 74528, 74592, 74656, 74720, 74784, 74816, 74912, 74944, 75040, 75136, 75200, 75264, 75328, 75360, 75456, 75488, 75584, 75648, 75712, 75776, 75840, 75872, 75968, 76000, 76096, 76224, 76288, 76352, 76416, 76448, 76544, 76576, 76672, 76736, 76800, 76864, 76928, 77024, 77120, 77152, 77248, 77344, 77408, 77472, 77536, 77568, 77664, 77696, 77792, 77856, 77920, 77984, 78048, 78144, 78240, 78272, 78368, 78464, 78528, 78592, 78656, 78688, 78784, 78816, 78912, 78976, 79040, 79104, 79168, 79264, 79360, 79392, 79488, 79616, 79680, 79744, 79808, 79840, 79936, 79968, 80064, 80128, 80192, 80256, 80320, 80416, 80512, 80544, 80640, 80768, 80832, 80896, 80960, 80992, 81088, 81120, 81216, 81280, 81344, 81408, 81472, 81568, 81664, 81696, 81792, 81952, 82016, 82080, 82144, 82176, 82272, 82304, 82400, 82464, 82528, 82592, 82656, 82752, 82848, 82880, 82976];
    function cppStruct_chan(a0) { this["chan"] = a0; }
    cppStruct_chan.prototype = cppStructPrototype;
    function method_status_mask(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_irq_reset(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_noise_enable(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 15, 7, 1)) >>> 0);
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
    function method_rhythm_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
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
    function method_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::fill_n"];
        const h_m_regdata = members.m_regdata ?? 0;
        (__L0 ? __L0(__addr_reset(runtime, h_m_regdata, 0), 256, 0) : runtime.macro("std::fill_n", __addr_reset(runtime, h_m_regdata, 0), 256, 0));
        h_m_regdata[32] = (h_m_regdata[33] = (h_m_regdata[34] = (h_m_regdata[35] = 192)));
        h_m_regdata[36] = (h_m_regdata[37] = (h_m_regdata[38] = (h_m_regdata[39] = 192)));
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_counter ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_am ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_lfsr ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_counter ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_state ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_lfo ?? 0)) ?? 0);
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
        if ((((members.__static_operator_map_s_fixed_map__initialised ?? 0)) ? 0 : 1)) {
            runtime.copyStruct(members.__static_operator_map_s_fixed_map, new cppStruct_chan([method_operator_list(runtime, 0, 16, 8, 24), method_operator_list(runtime, 1, 17, 9, 25), method_operator_list(runtime, 2, 18, 10, 26), method_operator_list(runtime, 3, 19, 11, 27), method_operator_list(runtime, 4, 20, 12, 28), method_operator_list(runtime, 5, 21, 13, 29), method_operator_list(runtime, 6, 22, 14, 30), method_operator_list(runtime, 7, 23, 15, 31)]));
            members.__static_operator_map_s_fixed_map__initialised = 1;
        }
        let s_fixed_map = h___static_operator_map_s_fixed_map;
        dest = s_fixed_map;
        return dest;
    }
    function method_write(runtime, index, data, channel, opmask) {
        const members = runtime.members;
        index = ((index) & 0xffff);
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        if ((((index) === (25)) ? 1 : 0)) {
            h_m_regdata[((index) + (method_bitfield(runtime, data, 7)))] = data;
        }
        else {
            if ((((index) !== (26)) ? 1 : 0)) {
                h_m_regdata[index] = data;
            }
        }
        if ((((index) === (8)) ? 1 : 0)) {
            channel.set(((method_bitfield(runtime, data, 0, 3)) >>> 0));
            opmask.set(((method_bitfield(runtime, data, 3, 4)) >>> 0));
            return 1;
        }
        return 0;
    }
    function method_clock_noise_and_lfo(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_lfo_waveform = members.m_lfo_waveform ?? 0;
        let freq = ((method_noise_frequency(runtime)) >>> 0);
        for (let rep = ((0) | 0); (((rep) < (2)) ? 1 : 0); rep = ((((rep) + (1))) | 0)) {
            members.m_noise_lfsr = ((((members.m_noise_lfsr) << (1))) >>> 0);
            members.m_noise_lfsr = ((((members.m_noise_lfsr) | (((((method_bitfield(runtime, (members.m_noise_lfsr ?? 0), 17)) ^ (method_bitfield(runtime, (members.m_noise_lfsr ?? 0), 14)))) ^ (1))))) >>> 0);
            if (((Number((__t0 = (members.m_noise_counter ?? 0), members.m_noise_counter = ((((members.m_noise_counter) + (1))) & 0xff), __t0)) >= Number(freq)) ? 1 : 0)) {
                members.m_noise_counter = ((0) & 0xff);
                members.m_noise_state = ((method_bitfield(runtime, (members.m_noise_lfsr ?? 0), 17)) & 0xff);
            }
        }
        let rate = ((method_lfo_rate(runtime)) >>> 0);
        members.m_lfo_counter = ((((members.m_lfo_counter) + (((((16) | (method_bitfield(runtime, rate, 0, 4)))) << (method_bitfield(runtime, rate, 4, 4)))))) >>> 0);
        if (method_lfo_reset(runtime)) {
            members.m_lfo_counter = ((0) >>> 0);
        }
        let lfo = ((method_bitfield(runtime, (members.m_lfo_counter ?? 0), 22, 8)) >>> 0);
        let lfo_noise = ((method_bitfield(runtime, (members.m_noise_lfsr ?? 0), 17, 8)) >>> 0);
        runtime.writeIndex(h_m_lfo_waveform[3], ((((lfo) + (1))) & (255)), ((lfo_noise) | (((lfo_noise) << (8)))));
        let ampm = ((runtime.readIndex(h_m_lfo_waveform[method_lfo_waveform(runtime)], lfo)) | 0);
        members.m_lfo_am = ((runtime.shiftRight(((((ampm) & (255))) * (method_lfo_am_depth(runtime))), 7)) & 0xff);
        return ((runtime.shiftRight(((runtime.shiftRight(ampm, 8)) * (((method_lfo_pm_depth(runtime)) | 0))), 7)) | 0);
    }
    function method_noise_frequency(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 15, 0, 5)) ^ (31))) >>> 0);
    }
    function method_lfo_rate(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 24, 0, 8)) >>> 0);
    }
    function method_lfo_reset(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 1, 1, 1)) >>> 0);
    }
    function method_lfo_waveform(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 27, 0, 2)) >>> 0);
    }
    function method_lfo_am_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 25, 0, 7)) >>> 0);
    }
    function method_lfo_pm_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 26, 0, 7)) >>> 0);
    }
    function method_lfo_am_offset(runtime, choffs) {
        const members = runtime.members;
        let am_sensitivity = ((method_ch_lfo_am_sens(runtime, choffs)) >>> 0);
        if ((((am_sensitivity) === (0)) ? 1 : 0)) {
            return ((0) >>> 0);
        }
        return (((((members.m_lfo_am ?? 0)) << (((am_sensitivity) - (1))))) >>> 0);
    }
    function method_ch_lfo_am_sens(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 56, 0, 2, choffs)) >>> 0);
    }
    function method_cache_operator_data(runtime, choffs, opoffs, cache) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        cache.waveform = __addr_cache_operator_data(runtime, h_m_waveform[0], 0);
        let block_freq = (((cache.block_freq = ((method_ch_block_freq(runtime, choffs)) >>> 0))) >>> 0);
        let keycode = ((method_bitfield(runtime, block_freq, 8, 5)) >>> 0);
        cache.detune = ((method_detune_adjustment(runtime, method_op_detune(runtime, opoffs), keycode)) | 0);
        cache.multiple = ((((method_op_multiple(runtime, opoffs)) * (2))) >>> 0);
        if ((((cache.multiple) === (0)) ? 1 : 0)) {
            cache.multiple = ((1) >>> 0);
        }
        if ((((((Number(method_lfo_pm_depth(runtime)) === Number(0)) ? 1 : 0)) || (((Number(method_ch_lfo_pm_sens(runtime, choffs)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            cache.phase_step = ((method_compute_phase_step(runtime, choffs, opoffs, cache, 0)) >>> 0);
        }
        else {
            cache.phase_step = ((1) >>> 0);
        }
        cache.total_level = ((((method_op_total_level(runtime, opoffs)) << (3))) >>> 0);
        cache.eg_sustain = ((method_op_sustain_level(runtime, opoffs)) >>> 0);
        cache.eg_sustain = ((((cache.eg_sustain) | (((((cache.eg_sustain) + (1))) & (16))))) >>> 0);
        cache.eg_sustain = ((((cache.eg_sustain) << (5))) >>> 0);
        let ksrval = ((((keycode) >>> (((method_op_ksr(runtime, opoffs)) ^ (3))))) >>> 0);
        cache.eg_rate[1] = method_effective_rate(runtime, ((method_op_attack_rate(runtime, opoffs)) * (2)), ksrval);
        cache.eg_rate[2] = method_effective_rate(runtime, ((method_op_decay_rate(runtime, opoffs)) * (2)), ksrval);
        cache.eg_rate[3] = method_effective_rate(runtime, ((method_op_sustain_rate(runtime, opoffs)) * (2)), ksrval);
        cache.eg_rate[4] = method_effective_rate(runtime, __add_cache_operator_data(runtime, ((method_op_release_rate(runtime, opoffs)) * (4)), 2), ksrval);
    }
    function __add_cache_operator_data(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_cache_operator_data(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_ch_block_freq(runtime, choffs) {
        const members = runtime.members;
        return ((method_word(runtime, 40, 0, 7, 48, 2, 6, choffs)) >>> 0);
    }
    function method_word(runtime, offset1, start1, count1, offset2, start2, count2, extra_offset = 0) {
        const members = runtime.members;
        return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
    }
    function method_detune_adjustment(runtime, detune, keycode) {
        const members = runtime.members;
        if ((((members.__static_detune_adjustment_s_detune_adjustment__initialised ?? 0)) ? 0 : 1)) {
            members.__static_detune_adjustment_s_detune_adjustment = [[0, 0, 1, 2], [0, 0, 1, 2], [0, 0, 1, 2], [0, 0, 1, 2], [0, 1, 2, 2], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 4], [0, 1, 3, 4], [0, 1, 3, 4], [0, 1, 3, 5], [0, 2, 4, 5], [0, 2, 4, 6], [0, 2, 4, 6], [0, 2, 5, 7], [0, 2, 5, 8], [0, 3, 6, 8], [0, 3, 6, 9], [0, 3, 7, 10], [0, 4, 8, 11], [0, 4, 8, 12], [0, 4, 9, 13], [0, 5, 10, 14], [0, 5, 11, 16], [0, 6, 12, 17], [0, 6, 13, 19], [0, 7, 14, 20], [0, 8, 16, 22], [0, 8, 16, 22], [0, 8, 16, 22], [0, 8, 16, 22]];
            members.__static_detune_adjustment_s_detune_adjustment__initialised = 1;
        }
        let s_detune_adjustment = (members.__static_detune_adjustment_s_detune_adjustment ?? 0);
        let result = ((runtime.readIndex(runtime.readIndex(s_detune_adjustment, keycode), ((detune) & (3)))) | 0);
        return ((method_bitfield(runtime, detune, 2)) ? ((-result)) : (result));
    }
    function method_op_detune(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 4, 3, opoffs)) >>> 0);
    }
    function method_op_multiple(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 0, 4, opoffs)) >>> 0);
    }
    function method_ch_lfo_pm_sens(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 56, 4, 3, choffs)) >>> 0);
    }
    function method_compute_phase_step(runtime, choffs, opoffs, cache, lfo_raw_pm) {
        const members = runtime.members;
        let delta = ((([0, runtime.divide(38450, 100), runtime.divide(50034, 100), runtime.divide(60850, 100)][(((method_op_detune2(runtime, opoffs)) % 4) + 4) % 4] ?? 0)) | 0);
        let pm_sensitivity = ((method_ch_lfo_pm_sens(runtime, choffs)) >>> 0);
        if ((((pm_sensitivity) !== (0)) ? 1 : 0)) {
            if ((((pm_sensitivity) < (6)) ? 1 : 0)) {
                delta = ((((delta) + (runtime.shiftRight(lfo_raw_pm, ((6) - (pm_sensitivity)))))) | 0);
            }
            else {
                delta = ((((delta) + (((((lfo_raw_pm) >>> 0)) << (((pm_sensitivity) - (5))))))) | 0);
            }
        }
        let phase_step = ((method_opm_key_code_to_phase_step(runtime, cache.block_freq, delta)) >>> 0);
        phase_step = ((((phase_step) + (cache.detune))) >>> 0);
        return ((runtime.shiftRight(((phase_step) * (cache.multiple)), 1)) >>> 0);
    }
    function method_op_detune2(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 192, 6, 2, opoffs)) >>> 0);
    }
    function method_opm_key_code_to_phase_step(runtime, block_freq, delta) {
        const members = runtime.members;
        let __t0, __t1;
        let block = ((method_bitfield(runtime, block_freq, 10, 3)) >>> 0);
        let adjusted_code = ((runtime.subtract(method_bitfield(runtime, block_freq, 6, 4), method_bitfield(runtime, block_freq, 8, 2))) >>> 0);
        let eff_freq = ((((((adjusted_code) << (6))) | (method_bitfield(runtime, block_freq, 0, 6)))) | 0);
        eff_freq = ((((eff_freq) + (delta))) | 0);
        if ((((((eff_freq) >>> 0)) >= (768)) ? 1 : 0)) {
            if ((((eff_freq) < (0)) ? 1 : 0)) {
                eff_freq = ((((eff_freq) + (768))) | 0);
                if (((Number((__t0 = block, block = ((((block) - (1))) >>> 0), __t0)) === Number(0)) ? 1 : 0)) {
                    return runtime.shiftRight((__mame_table_0[(((0) % 768) + 768) % 768] ?? 0), 7);
                }
            }
            else {
                eff_freq = ((((eff_freq) - (768))) | 0);
                if ((((eff_freq) >= (768)) ? 1 : 0)) {
                    block = ((((block) + (1))) >>> 0);
                    eff_freq = ((((eff_freq) - (768))) | 0);
                }
                if (((Number((__t1 = block, block = ((((block) + (1))) >>> 0), __t1)) >= Number(7)) ? 1 : 0)) {
                    return (__mame_table_0[(((767) % 768) + 768) % 768] ?? 0);
                }
            }
        }
        return runtime.shiftRight((__mame_table_0[(((eff_freq) % 768) + 768) % 768] ?? 0), ((block) ^ (7)));
    }
    function method_op_total_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 0, 7, opoffs)) >>> 0);
    }
    function method_op_sustain_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 224, 4, 4, opoffs)) >>> 0);
    }
    function method_op_ksr(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 6, 2, opoffs)) >>> 0);
    }
    function method_op_attack_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 0, 5, opoffs)) >>> 0);
    }
    function method_op_decay_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 160, 0, 5, opoffs)) >>> 0);
    }
    function method_op_sustain_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 192, 0, 5, opoffs)) >>> 0);
    }
    function method_op_release_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 224, 0, 4, opoffs)) >>> 0);
    }
    function method_log_keyon(runtime, choffs, opoffs) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["snprintf"];
        let chnum = ((choffs) >>> 0);
        let opnum = ((opoffs) >>> 0);
        let buffer = new Uint8Array(Math.max(0, Number(256)));
        let end = ((0) | 0);
        end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%u.%02u freq=%04X dt2=%u dt=%u fb=%u alg=%X mul=%X tl=%02X ksr=%u adsr=%02X/%02X/%02X/%X sl=%X out=%c%c", chnum, opnum, method_ch_block_freq(runtime, choffs), method_op_detune2(runtime, opoffs), method_op_detune(runtime, opoffs), method_ch_feedback(runtime, choffs), method_ch_algorithm(runtime, choffs), method_op_multiple(runtime, opoffs), method_op_total_level(runtime, opoffs), method_op_ksr(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_sustain_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs), ((method_ch_output_0(runtime, choffs)) ? (76) : (45)), ((method_ch_output_1(runtime, choffs)) ? (82) : (45))) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%u.%02u freq=%04X dt2=%u dt=%u fb=%u alg=%X mul=%X tl=%02X ksr=%u adsr=%02X/%02X/%02X/%X sl=%X out=%c%c", chnum, opnum, method_ch_block_freq(runtime, choffs), method_op_detune2(runtime, opoffs), method_op_detune(runtime, opoffs), method_ch_feedback(runtime, choffs), method_ch_algorithm(runtime, choffs), method_op_multiple(runtime, opoffs), method_op_total_level(runtime, opoffs), method_op_ksr(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_sustain_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs), ((method_ch_output_0(runtime, choffs)) ? (76) : (45)), ((method_ch_output_1(runtime, choffs)) ? (82) : (45))))))) | 0);
        let am = ((((((((((Number(method_lfo_am_depth(runtime)) !== Number(0)) ? 1 : 0)) && (((Number(method_ch_lfo_am_sens(runtime, choffs)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(method_op_lfo_am_enable(runtime, opoffs)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if (am) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=%u/%02X", method_ch_lfo_am_sens(runtime, choffs), method_lfo_am_depth(runtime)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=%u/%02X", method_ch_lfo_am_sens(runtime, choffs), method_lfo_am_depth(runtime)))))) | 0);
        }
        let pm = (((((((Number(method_lfo_pm_depth(runtime)) !== Number(0)) ? 1 : 0)) && (((Number(method_ch_lfo_pm_sens(runtime, choffs)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if (pm) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=%u/%02X", method_ch_lfo_pm_sens(runtime, choffs), method_lfo_pm_depth(runtime)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=%u/%02X", method_ch_lfo_pm_sens(runtime, choffs), method_lfo_pm_depth(runtime)))))) | 0);
        }
        if ((((am) || (pm)) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " lfo=%02X/%c", method_lfo_rate(runtime), runtime.readIndex("WQTN", method_lfo_waveform(runtime))) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " lfo=%02X/%c", method_lfo_rate(runtime), runtime.readIndex("WQTN", method_lfo_waveform(runtime))))))) | 0);
        }
        if ((((method_noise_enable(runtime)) && ((((opoffs) === (31)) ? 1 : 0))) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " noise=1") : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " noise=1"))))) | 0);
        }
        return buffer;
    }
    function __addr_log_keyon(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_ch_feedback(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 3, 3, choffs)) >>> 0);
    }
    function method_ch_algorithm(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 0, 3, choffs)) >>> 0);
    }
    function method_ch_output_0(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 6, 1, choffs)) >>> 0);
    }
    function method_ch_output_1(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 7, 1, choffs)) >>> 0);
    }
    function method_op_lfo_am_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 160, 7, 1, opoffs)) >>> 0);
    }
    function method_channel_offset(runtime, chnum) {
        const members = runtime.members;
        return ((chnum) >>> 0);
    }
    function method_operator_offset(runtime, opnum) {
        const members = runtime.members;
        return ((opnum) >>> 0);
    }
    function method_noise_state(runtime) {
        const members = runtime.members;
        return (((members.m_noise_state ?? 0)) >>> 0);
    }
    function method_test(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 1, 0, 8)) >>> 0);
    }
    function method_timer_a_value(runtime) {
        const members = runtime.members;
        return ((method_word(runtime, 16, 0, 8, 17, 0, 2)) >>> 0);
    }
    function method_timer_b_value(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 18, 0, 8)) >>> 0);
    }
    function method_csm(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 7, 1)) >>> 0);
    }
    function method_reset_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 5, 1)) >>> 0);
    }
    function method_reset_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 4, 1)) >>> 0);
    }
    function method_enable_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 3, 1)) >>> 0);
    }
    function method_enable_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 2, 1)) >>> 0);
    }
    function method_load_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 1, 1)) >>> 0);
    }
    function method_load_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 0, 1)) >>> 0);
    }
    function method_output_bits(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 27, 6, 2)) >>> 0);
    }
    function method_ch_output_any(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 6, 2, choffs)) >>> 0);
    }
    function method_ch_output_2(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_ch_output_3(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opm_registers__channel_offset(runtime, chnum) {
        const members = runtime.members;
        return ((chnum) >>> 0);
    }
    function method_opm_registers__operator_offset(runtime, opnum) {
        const members = runtime.members;
        return ((opnum) >>> 0);
    }
    function method_opm_registers__noise_state(runtime) {
        const members = runtime.members;
        return (((members.m_noise_state ?? 0)) >>> 0);
    }
    function method_opm_registers__test(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 1, 0, 8)) >>> 0);
    }
    function method_opm_registers__lfo_reset(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 1, 1, 1)) >>> 0);
    }
    function method_opm_registers__noise_frequency(runtime) {
        const members = runtime.members;
        return ((((method_byte(runtime, 15, 0, 5)) ^ (31))) >>> 0);
    }
    function method_opm_registers__noise_enable(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 15, 7, 1)) >>> 0);
    }
    function method_opm_registers__timer_a_value(runtime) {
        const members = runtime.members;
        return ((method_word(runtime, 16, 0, 8, 17, 0, 2)) >>> 0);
    }
    function method_opm_registers__timer_b_value(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 18, 0, 8)) >>> 0);
    }
    function method_opm_registers__csm(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 7, 1)) >>> 0);
    }
    function method_opm_registers__reset_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 5, 1)) >>> 0);
    }
    function method_opm_registers__reset_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 4, 1)) >>> 0);
    }
    function method_opm_registers__enable_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 3, 1)) >>> 0);
    }
    function method_opm_registers__enable_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 2, 1)) >>> 0);
    }
    function method_opm_registers__load_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 1, 1)) >>> 0);
    }
    function method_opm_registers__load_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 20, 0, 1)) >>> 0);
    }
    function method_opm_registers__lfo_rate(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 24, 0, 8)) >>> 0);
    }
    function method_opm_registers__lfo_am_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 25, 0, 7)) >>> 0);
    }
    function method_opm_registers__lfo_pm_depth(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 26, 0, 7)) >>> 0);
    }
    function method_opm_registers__output_bits(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 27, 6, 2)) >>> 0);
    }
    function method_opm_registers__lfo_waveform(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 27, 0, 2)) >>> 0);
    }
    function method_opm_registers__ch_output_any(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 6, 2, choffs)) >>> 0);
    }
    function method_opm_registers__ch_output_0(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 6, 1, choffs)) >>> 0);
    }
    function method_opm_registers__ch_output_1(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 7, 1, choffs)) >>> 0);
    }
    function method_opm_registers__ch_output_2(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opm_registers__ch_output_3(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opm_registers__ch_feedback(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 3, 3, choffs)) >>> 0);
    }
    function method_opm_registers__ch_algorithm(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 32, 0, 3, choffs)) >>> 0);
    }
    function method_opm_registers__ch_block_freq(runtime, choffs) {
        const members = runtime.members;
        return ((method_word(runtime, 40, 0, 7, 48, 2, 6, choffs)) >>> 0);
    }
    function method_opm_registers__ch_lfo_pm_sens(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 56, 4, 3, choffs)) >>> 0);
    }
    function method_opm_registers__ch_lfo_am_sens(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 56, 0, 2, choffs)) >>> 0);
    }
    function method_opm_registers__op_detune(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 4, 3, opoffs)) >>> 0);
    }
    function method_opm_registers__op_multiple(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 0, 4, opoffs)) >>> 0);
    }
    function method_opm_registers__op_total_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 0, 7, opoffs)) >>> 0);
    }
    function method_opm_registers__op_ksr(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 6, 2, opoffs)) >>> 0);
    }
    function method_opm_registers__op_attack_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 0, 5, opoffs)) >>> 0);
    }
    function method_opm_registers__op_lfo_am_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 160, 7, 1, opoffs)) >>> 0);
    }
    function method_opm_registers__op_decay_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 160, 0, 5, opoffs)) >>> 0);
    }
    function method_opm_registers__op_detune2(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 192, 6, 2, opoffs)) >>> 0);
    }
    function method_opm_registers__op_sustain_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 192, 0, 5, opoffs)) >>> 0);
    }
    function method_opm_registers__op_sustain_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 224, 4, 4, opoffs)) >>> 0);
    }
    function method_opm_registers__op_release_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 224, 0, 4, opoffs)) >>> 0);
    }
    function method_opm_registers__byte(runtime, offset, start, count, extra_offset = 0) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return method_bitfield(runtime, h_m_regdata[((offset) + (extra_offset))], start, count);
    }
    function method_opm_registers__word(runtime, offset1, start1, count1, offset2, start2, count2, extra_offset = 0) {
        const members = runtime.members;
        return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
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
    function method___construct(runtime) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        const h_m_lfo_waveform = members.m_lfo_waveform ?? 0;
        members.m_lfo_counter = ((0) >>> 0);
        members.m_noise_lfsr = ((1) >>> 0);
        members.m_noise_counter = ((0) & 0xff);
        members.m_noise_state = ((0) & 0xff);
        members.m_noise_lfo = ((0) & 0xff);
        members.m_lfo_am = ((0) & 0xff);
        for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            runtime.writeIndex(h_m_waveform[0], index, ((method_abs_sin_attenuation(runtime, index)) | (((method_bitfield(runtime, index, 9)) << (15)))));
        }
        for (let index = ((0) >>> 0); ((Number(index) < Number(256)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            let am = ((((index) ^ (255))) & 0xff);
            let pm = ((index) & 0xff);
            runtime.writeIndex(h_m_lfo_waveform[0], index, ((am) | (((pm) << (8)))));
            am = ((((method_bitfield(runtime, index, 7)) ? (0) : (255))) & 0xff);
            pm = ((((am) ^ (128))) & 0xff);
            runtime.writeIndex(h_m_lfo_waveform[1], index, ((am) | (((pm) << (8)))));
            am = ((((method_bitfield(runtime, index, 7)) ? (((index) << (1))) : (((((index) ^ (255))) << (1))))) & 0xff);
            pm = ((((method_bitfield(runtime, index, 6)) ? (am) : ((~am)))) & 0xff);
            runtime.writeIndex(h_m_lfo_waveform[2], index, ((am) | (((pm) << (8)))));
            runtime.writeIndex(h_m_lfo_waveform[3], index, 0);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "status_mask": method_status_mask,
        "irq_reset": method_irq_reset,
        "noise_enable": method_noise_enable,
        "byte": method_byte,
        "bitfield": method_bitfield,
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
        "reset": method_reset,
        "save_restore": method_save_restore,
        "clock_noise_and_lfo": method_clock_noise_and_lfo,
        "noise_frequency": method_noise_frequency,
        "lfo_rate": method_lfo_rate,
        "lfo_reset": method_lfo_reset,
        "lfo_waveform": method_lfo_waveform,
        "lfo_am_depth": method_lfo_am_depth,
        "lfo_pm_depth": method_lfo_pm_depth,
        "lfo_am_offset": method_lfo_am_offset,
        "ch_lfo_am_sens": method_ch_lfo_am_sens,
        "cache_operator_data": method_cache_operator_data,
        "ch_block_freq": method_ch_block_freq,
        "word": method_word,
        "detune_adjustment": method_detune_adjustment,
        "op_detune": method_op_detune,
        "op_multiple": method_op_multiple,
        "ch_lfo_pm_sens": method_ch_lfo_pm_sens,
        "compute_phase_step": method_compute_phase_step,
        "op_detune2": method_op_detune2,
        "opm_key_code_to_phase_step": method_opm_key_code_to_phase_step,
        "op_total_level": method_op_total_level,
        "op_sustain_level": method_op_sustain_level,
        "op_ksr": method_op_ksr,
        "op_attack_rate": method_op_attack_rate,
        "op_decay_rate": method_op_decay_rate,
        "op_sustain_rate": method_op_sustain_rate,
        "op_release_rate": method_op_release_rate,
        "log_keyon": method_log_keyon,
        "ch_feedback": method_ch_feedback,
        "ch_algorithm": method_ch_algorithm,
        "ch_output_0": method_ch_output_0,
        "ch_output_1": method_ch_output_1,
        "op_lfo_am_enable": method_op_lfo_am_enable,
        "channel_offset": method_channel_offset,
        "operator_offset": method_operator_offset,
        "noise_state": method_noise_state,
        "test": method_test,
        "timer_a_value": method_timer_a_value,
        "timer_b_value": method_timer_b_value,
        "csm": method_csm,
        "reset_timer_b": method_reset_timer_b,
        "reset_timer_a": method_reset_timer_a,
        "enable_timer_b": method_enable_timer_b,
        "enable_timer_a": method_enable_timer_a,
        "load_timer_b": method_load_timer_b,
        "load_timer_a": method_load_timer_a,
        "output_bits": method_output_bits,
        "ch_output_any": method_ch_output_any,
        "ch_output_2": method_ch_output_2,
        "ch_output_3": method_ch_output_3,
        "opm_registers::channel_offset": method_opm_registers__channel_offset,
        "opm_registers::operator_offset": method_opm_registers__operator_offset,
        "opm_registers::noise_state": method_opm_registers__noise_state,
        "opm_registers::test": method_opm_registers__test,
        "opm_registers::lfo_reset": method_opm_registers__lfo_reset,
        "opm_registers::noise_frequency": method_opm_registers__noise_frequency,
        "opm_registers::noise_enable": method_opm_registers__noise_enable,
        "opm_registers::timer_a_value": method_opm_registers__timer_a_value,
        "opm_registers::timer_b_value": method_opm_registers__timer_b_value,
        "opm_registers::csm": method_opm_registers__csm,
        "opm_registers::reset_timer_b": method_opm_registers__reset_timer_b,
        "opm_registers::reset_timer_a": method_opm_registers__reset_timer_a,
        "opm_registers::enable_timer_b": method_opm_registers__enable_timer_b,
        "opm_registers::enable_timer_a": method_opm_registers__enable_timer_a,
        "opm_registers::load_timer_b": method_opm_registers__load_timer_b,
        "opm_registers::load_timer_a": method_opm_registers__load_timer_a,
        "opm_registers::lfo_rate": method_opm_registers__lfo_rate,
        "opm_registers::lfo_am_depth": method_opm_registers__lfo_am_depth,
        "opm_registers::lfo_pm_depth": method_opm_registers__lfo_pm_depth,
        "opm_registers::output_bits": method_opm_registers__output_bits,
        "opm_registers::lfo_waveform": method_opm_registers__lfo_waveform,
        "opm_registers::ch_output_any": method_opm_registers__ch_output_any,
        "opm_registers::ch_output_0": method_opm_registers__ch_output_0,
        "opm_registers::ch_output_1": method_opm_registers__ch_output_1,
        "opm_registers::ch_output_2": method_opm_registers__ch_output_2,
        "opm_registers::ch_output_3": method_opm_registers__ch_output_3,
        "opm_registers::ch_feedback": method_opm_registers__ch_feedback,
        "opm_registers::ch_algorithm": method_opm_registers__ch_algorithm,
        "opm_registers::ch_block_freq": method_opm_registers__ch_block_freq,
        "opm_registers::ch_lfo_pm_sens": method_opm_registers__ch_lfo_pm_sens,
        "opm_registers::ch_lfo_am_sens": method_opm_registers__ch_lfo_am_sens,
        "opm_registers::op_detune": method_opm_registers__op_detune,
        "opm_registers::op_multiple": method_opm_registers__op_multiple,
        "opm_registers::op_total_level": method_opm_registers__op_total_level,
        "opm_registers::op_ksr": method_opm_registers__op_ksr,
        "opm_registers::op_attack_rate": method_opm_registers__op_attack_rate,
        "opm_registers::op_lfo_am_enable": method_opm_registers__op_lfo_am_enable,
        "opm_registers::op_decay_rate": method_opm_registers__op_decay_rate,
        "opm_registers::op_detune2": method_opm_registers__op_detune2,
        "opm_registers::op_sustain_rate": method_opm_registers__op_sustain_rate,
        "opm_registers::op_sustain_level": method_opm_registers__op_sustain_level,
        "opm_registers::op_release_rate": method_opm_registers__op_release_rate,
        "opm_registers::byte": method_opm_registers__byte,
        "opm_registers::word": method_opm_registers__word,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "abs_sin_attenuation": method_abs_sin_attenuation,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["opm_registers"].compiledMethodLinks = ["snprintf", "std::fill_n"];
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["opm_registers"].compiledStructMethods = {
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
        function method_status_mask(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_irq_reset(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_rhythm_enable(runtime) {
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
            return ((chnum) >>> 0);
        }
        function method_operator_offset(runtime, opnum) {
            const members = runtime.members;
            return ((opnum) >>> 0);
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_opm_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            return ((chnum) >>> 0);
        }
        function method_opm_registers__operator_offset(runtime, opnum) {
            const members = runtime.members;
            return ((opnum) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "status_mask": method_status_mask,
            "irq_reset": method_irq_reset,
            "rhythm_enable": method_rhythm_enable,
            "fm_registers_base::status_mask": method_fm_registers_base__status_mask,
            "fm_registers_base::irq_reset": method_fm_registers_base__irq_reset,
            "fm_registers_base::noise_enable": method_fm_registers_base__noise_enable,
            "fm_registers_base::rhythm_enable": method_fm_registers_base__rhythm_enable,
            "channel_offset": method_channel_offset,
            "operator_offset": method_operator_offset,
            "bitfield": method_bitfield,
            "opm_registers::channel_offset": method_opm_registers__channel_offset,
            "opm_registers::operator_offset": method_opm_registers__operator_offset
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["fm_channel__opm_registers"].compiledMethods = (() => {
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
                    (__L0 ? __L0("%c%s\n", ((method_bitfield(runtime, states, opnum)) ? (43) : (45)), (__t0 = __deref_keyonoff(runtime, (members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0)), typeof __t0.c_str === 'function' ? (__t0.c_str() ?? 0) : runtime.container((members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0), "c_str"))) : runtime.macro("debug::log_keyon", "%c%s\n", ((method_bitfield(runtime, states, opnum)) ? (43) : (45)), (__t0 = __deref_keyonoff(runtime, (members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0)), typeof __t0.c_str === 'function' ? (__t0.c_str() ?? 0) : runtime.container((members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0), "c_str"))));
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
        let am_offset = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let opmod = ((0) | 0);
        let feedback = (((members.m_regs.ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        if ((((feedback) !== (0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
        }
        let op1value = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
        if (((Number((members.m_regs.ch_output_any?.((members.m_choffs ?? 0)) ?? 0)) === Number(0)) ? 1 : 0)) {
            return;
        }
        let result = ((0) | 0);
        if (((Number(method_bitfield(runtime, (members.m_regs.ch_algorithm?.((members.m_choffs ?? 0)) ?? 0), 0)) === Number(0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((0) ? (h_m_feedback[1]) : (op1value)), 1)) | 0);
            result = ((runtime.shiftRight((h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0), rshift)) | 0);
        }
        else {
            result = ((runtime.shiftRight(((0) ? (h_m_feedback[1]) : (op1value)), rshift)) | 0);
            result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.((h_m_op[1].phase?.() ?? 0), am_offset) ?? 0), rshift)))) | 0);
            let clipmin = (((((-clipmax)) - (1))) | 0);
            result = ((method_clamp(runtime, result, clipmin, clipmax)) | 0);
        }
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, result);
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
        let out1_index = ((((1) % (2))) | 0);
        let out2_index = ((((2) % (2))) | 0);
        let out3_index = ((((3) % (2))) | 0);
        if ((((0) || ((members.m_regs.ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out0_index] = ((output.data[out0_index]) + (value));
        }
        if ((((1) && ((members.m_regs.ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out1_index] = ((output.data[out1_index]) + (value));
        }
        if ((((0) && ((members.m_regs.ch_output_2?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out2_index] = ((output.data[out2_index]) + (value));
        }
        if ((((0) && ((members.m_regs.ch_output_3?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out3_index] = ((output.data[out3_index]) + (value));
        }
    }
    function method_output_4op(runtime, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let opmod = ((0) | 0);
        let feedback = (((members.m_regs.ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        if ((((feedback) !== (0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
        }
        let op1value = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
        if (((Number((members.m_regs.ch_output_any?.((members.m_choffs ?? 0)) ?? 0)) === Number(0)) ? 1 : 0)) {
            return;
        }
        if ((((members.__static_output_4op_s_algorithm_ops__initialised ?? 0)) ? 0 : 1)) {
            members.__static_output_4op_s_algorithm_ops = [53, 58, 100, 113, 305, 787, 769, 896, 53, 180, 305, 644];
            members.__static_output_4op_s_algorithm_ops__initialised = 1;
        }
        let s_algorithm_ops = (members.__static_output_4op_s_algorithm_ops ?? 0);
        let algorithm_ops = ((runtime.readIndex(s_algorithm_ops, (members.m_regs.ch_algorithm?.((members.m_choffs ?? 0)) ?? 0))) >>> 0);
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
        if (((((members.m_regs.noise_enable?.() ?? 0)) && (((((members.m_choffs ?? 0)) === (7)) ? 1 : 0))) ? 1 : 0)) {
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
    function method_output_rhythm_ch6(runtime, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_feedback = members.m_feedback ?? 0;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let opmod = ((0) | 0);
        let feedback = (((members.m_regs.ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        if ((((feedback) !== (0)) ? 1 : 0)) {
            opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
        }
        let opout1 = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
        opmod = ((((method_bitfield(runtime, (members.m_regs.ch_algorithm?.((members.m_choffs ?? 0)) ?? 0), 0)) ? (0) : (runtime.shiftRight(opout1, 1)))) | 0);
        let result = ((runtime.shiftRight((h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0), rshift)) | 0);
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
    }
    function method_output_rhythm_ch7(runtime, phase_select, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let noise_state = ((method_bitfield(runtime, (members.m_regs.noise_state?.() ?? 0), 0)) >>> 0);
        let phase = ((((((phase_select) << (9))) | (runtime.shiftRight(208, ((2) * (((noise_state) ^ (phase_select)))))))) >>> 0);
        let result = ((runtime.shiftRight((h_m_op[0].compute_volume?.(phase, am_offset) ?? 0), rshift)) | 0);
        let op13phase = (((h_m_op[0].phase?.() ?? 0)) >>> 0);
        phase = ((((((256) << (method_bitfield(runtime, op13phase, 8)))) ^ (((noise_state) << (8))))) >>> 0);
        result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.(phase, am_offset) ?? 0), rshift)))) | 0);
        result = ((method_clamp(runtime, result, (((-clipmax)) - (1)), clipmax)) | 0);
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
    }
    function method_output_rhythm_ch8(runtime, phase_select, output, rshift, clipmax) {
        const members = runtime.members;
        const h_m_op = members.m_op ?? 0;
        let am_offset = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
        let result = ((runtime.shiftRight((h_m_op[0].compute_volume?.((h_m_op[0].phase?.() ?? 0), am_offset) ?? 0), rshift)) | 0);
        let phase = ((((256) | (((phase_select) << (9))))) >>> 0);
        result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.(phase, am_offset) ?? 0), rshift)))) | 0);
        result = ((method_clamp(runtime, result, (((-clipmax)) - (1)), clipmax)) | 0);
        method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
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
        return ((Number(runtime.divide(32, 8)) === Number(4)) ? 1 : 0);
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
        return ((Number(runtime.divide(32, 8)) === Number(4)) ? 1 : 0);
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
        let out1_index = ((((1) % (2))) | 0);
        let out2_index = ((((2) % (2))) | 0);
        let out3_index = ((((3) % (2))) | 0);
        if ((((0) || ((members.m_regs.ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out0_index] = ((output.data[out0_index]) + (value));
        }
        if ((((1) && ((members.m_regs.ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out1_index] = ((output.data[out1_index]) + (value));
        }
        if ((((0) && ((members.m_regs.ch_output_2?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out2_index] = ((output.data[out2_index]) + (value));
        }
        if ((((0) && ((members.m_regs.ch_output_3?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out3_index] = ((output.data[out3_index]) + (value));
        }
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
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["fm_channel__opm_registers"].compiledMethodLinks = ["debug::log_keyon"];
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["fm_channel__opm_registers"].compiledStructMethods = {
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
    "ymfm_output__2": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["fm_operator__opm_registers"].compiledMethods = (() => {
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
        (members.m_regs.cache_operator_data?.((members.m_choffs ?? 0), (members.m_opoffs ?? 0), h_m_cache) ?? 0);
        method_clock_keystate(runtime, ((((((members.m_keyon_live ?? 0)) !== (0)) ? 1 : 0)) >>> 0));
        members.m_keyon_live = ((((members.m_keyon_live) & (-5))) & 0xff);
        return (((((Number((members.m_env_state ?? 0)) !== Number(4)) ? 1 : 0)) || (((Number((members.m_env_attenuation ?? 0)) < Number(896)) ? 1 : 0))) ? 1 : 0);
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
            members.m_ssg_inverted = (((((members.m_regs.op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) & (method_bitfield(runtime, (members.m_regs.op_ssg_eg_mode?.((members.m_opoffs ?? 0)) ?? 0), 2)))) & 0xff);
        }
        if (((is_restart) ? 0 : 1)) {
            members.m_phase = ((0) >>> 0);
        }
        if ((((h_m_cache.eg_rate[1]) >= (62)) ? 1 : 0)) {
            members.m_env_attenuation = ((0) & 0xffff);
        }
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
        if ((members.m_regs.op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) {
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
    function method_clock_ssg_eg_state(runtime) {
        const members = runtime.members;
        if (((method_bitfield(runtime, (members.m_env_attenuation ?? 0), 9)) ? 0 : 1)) {
            return;
        }
        let mode = (((members.m_regs.op_ssg_eg_mode?.((members.m_opoffs ?? 0)) ?? 0)) >>> 0);
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
            if ((((members.m_regs.op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) ? 0 : 1)) {
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
            phase_step = (((members.m_regs.compute_phase_step?.((members.m_choffs ?? 0), (members.m_opoffs ?? 0), h_m_cache, lfo_raw_pm) ?? 0)) >>> 0);
        }
        members.m_phase = ((((members.m_phase) + (phase_step))) >>> 0);
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
        if ((members.m_regs.op_lfo_am_enable?.((members.m_opoffs ?? 0)) ?? 0)) {
            result = ((((result) + (am_offset))) >>> 0);
        }
        result = ((((result) + (h_m_cache.total_level))) >>> 0);
        return ((cppMin(+(result), +(1023))) >>> 0);
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
        let result = ((((((method_envelope_attenuation(runtime, am_offset)) ^ (1023))) << (1))) | 0);
        return ((((method_bitfield(runtime, (members.m_regs.noise_state?.() ?? 0), 0)) ? ((-result)) : (result))) | 0);
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
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].allocations["fm_operator__opm_registers"].compiledStructMethods = {
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
definition.allocations["ym2151"].allocations["fm_engine_base__opm_registers"].compiledStructMethods = {
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
        function method_opm_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            return chnum;
        }
        function method_opm_registers__operator_offset(runtime, opnum) {
            const members = runtime.members;
            return opnum;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "bitfield": method_bitfield,
            "opm_registers::channel_offset": method_opm_registers__channel_offset,
            "opm_registers::operator_offset": method_opm_registers__operator_offset
        };
        return __methodTable;
    })(),
    "ymfm_output__2": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
        function method_opm_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            return chnum;
        }
        function method_opm_registers__operator_offset(runtime, opnum) {
            const members = runtime.members;
            return opnum;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "bitfield": method_bitfield,
            "opm_registers::channel_offset": method_opm_registers__channel_offset,
            "opm_registers::operator_offset": method_opm_registers__operator_offset
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2151"].compiledStructMethods = {
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
                        /* debug::log_unexpected_read_write: no effect */
                        break;
                    }
                case 1:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
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
    "ymfm_output__2": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
                        /* debug::log_unexpected_read_write: no effect */
                        break;
                    }
                case 1:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
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
        function method_port_write_handler(runtime) {
            const members = runtime.members;
            return method_io_write_handler(runtime);
        }
        function method_ym2151_device__port_write_handler(runtime) {
            const members = runtime.members;
            return method_io_write_handler(runtime);
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
            "ymfm_device_base::write": method_ymfm_device_base__write,
            "sound_stream_update": method_sound_stream_update,
            "ymfm_device_base::read": method_ymfm_device_base__read,
            "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
            "port_write_handler": method_port_write_handler,
            "ym2151_device::port_write_handler": method_ym2151_device__port_write_handler
        };
        return __methodTable;
    })(),
    "ymfm_output__2": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
        function method_port_write_handler(runtime) {
            const members = runtime.members;
            return method_io_write_handler(runtime);
        }
        function method_ym2151_device__port_write_handler(runtime) {
            const members = runtime.members;
            return method_io_write_handler(runtime);
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
            "ymfm_device_base::write": method_ymfm_device_base__write,
            "sound_stream_update": method_sound_stream_update,
            "ymfm_device_base::read": method_ymfm_device_base__read,
            "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
            "port_write_handler": method_port_write_handler,
            "ym2151_device::port_write_handler": method_ym2151_device__port_write_handler
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
