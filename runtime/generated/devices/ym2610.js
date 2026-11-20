import deviceData from './ym2610.device.ir.json' with { type: 'json' };
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
    function method_ymfm_external_read(runtime, type, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["space"];
        if (((Number(type) === Number(1)) ? 1 : 0)) {
            return (((((__L0 ? __L0(0) : runtime.macro("space", 0))).read_byte?.(offset) ?? 0)) & 0xff);
        }
        else {
            if (((Number(type) === Number(2)) ? 1 : 0)) {
                return (((((__L0 ? __L0(1) : runtime.macro("space", 1))).read_byte?.(offset) ?? 0)) & 0xff);
            }
        }
        return ((0) & 0xff);
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
        const __L0 = __l["has_configured_map"], __L1 = __l["space"];
        let __t0, __t1, __t2;
        const h_m_adpcm_a_region = members.m_adpcm_a_region ?? 0;
        const h_m_adpcm_b_region = members.m_adpcm_b_region ?? 0;
        (members.m_chip.set_fidelity?.(2) ?? 0);
        method_ymfm_device_base__device_start(runtime);
        if (((((((__L0 ? __L0(0) : runtime.macro("has_configured_map", 0))) ? 0 : 1)) && ((((__L0 ? __L0(1) : runtime.macro("has_configured_map", 1))) ? 0 : 1))) ? 1 : 0)) {
            if (h_m_adpcm_a_region) {
                (((__L1 ? __L1(0) : runtime.macro("space", 0))).install_rom?.(0, runtime.subtract(runtime.container(members.m_adpcm_a_region, "bytes"), 1), (__t0 = __deref_device_start(runtime, members.m_adpcm_a_region), typeof __t0.base === 'function' ? __t0.base() : typeof __t0.base === 'number' || typeof __t0.base === 'boolean' ? __t0.base : runtime.container(members.m_adpcm_a_region, "base"))) ?? 0);
            }
            if (h_m_adpcm_b_region) {
                (((__L1 ? __L1(1) : runtime.macro("space", 1))).install_rom?.(0, runtime.subtract(runtime.container(members.m_adpcm_b_region, "bytes"), 1), (__t1 = __deref_device_start(runtime, members.m_adpcm_b_region), typeof __t1.base === 'function' ? __t1.base() : typeof __t1.base === 'number' || typeof __t1.base === 'boolean' ? __t1.base : runtime.container(members.m_adpcm_b_region, "base"))) ?? 0);
            }
            else {
                if (h_m_adpcm_a_region) {
                    (((__L1 ? __L1(1) : runtime.macro("space", 1))).install_rom?.(0, runtime.subtract(runtime.container(members.m_adpcm_a_region, "bytes"), 1), (__t2 = __deref_device_start(runtime, members.m_adpcm_a_region), typeof __t2.base === 'function' ? __t2.base() : typeof __t2.base === 'number' || typeof __t2.base === 'boolean' ? __t2.base : runtime.container(members.m_adpcm_a_region, "base"))) ?? 0);
                }
            }
        }
    }
    function __deref_device_start(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        members.m_stream = (__L1 ? __L1(0, 3, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)) : runtime.macro("stream_alloc", 0, 3, (members.m_chip.sample_rate?.((__L0 ? __L0() : runtime.macro("clock"))) ?? 0)));
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
        method_ymfm_device_base__update_internal(runtime, stream, 1);
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
                let eff_outnum = ((((((outnum) + (output_shift))) % (3))) | 0);
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
                let eff_outnum = ((((((outnum) + (output_shift))) % (3))) | 0);
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
    function method_ymfm_ssg_device_base(runtime, mconfig, tag, owner, clock, type) {
        const members = runtime.members;
    }
    function method_ymfm_ssg_device_base__ymfm_ssg_device_base(runtime, mconfig, tag, owner, clock, type) {
        const members = runtime.members;
    }
    function method_ymfm_ssg_device_base__sound_stream_update(runtime, stream) {
        const members = runtime.members;
        method_ymfm_device_base__update_internal(runtime, stream, 1);
    }
    function method_ym2610_device_base(runtime, mconfig, tag, owner, clock, type) {
        const members = runtime.members;
    }
    function method_data_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_data_r(runtime, method_update_streams(runtime)), typeof __t0.read_data === 'function' ? (__t0.read_data() ?? 0) : runtime.container(method_update_streams(runtime), "read_data"))) & 0xff);
    }
    function __deref_data_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_status_hi_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_status_hi_r(runtime, method_update_streams(runtime)), typeof __t0.read_status_hi === 'function' ? (__t0.read_status_hi() ?? 0) : runtime.container(method_update_streams(runtime), "read_status_hi"))) & 0xff);
    }
    function __deref_status_hi_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_data_hi_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_data_hi_r(runtime, method_update_streams(runtime)), typeof __t0.read_data_hi === 'function' ? (__t0.read_data_hi() ?? 0) : runtime.container(method_update_streams(runtime), "read_data_hi"))) & 0xff);
    }
    function __deref_data_hi_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_address_hi_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_address_hi_w(runtime, method_update_streams(runtime)).write_address_hi?.(data) ?? 0);
    }
    function __deref_address_hi_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_data_hi_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_data_hi_w(runtime, method_update_streams(runtime)).write_data_hi?.(data) ?? 0);
    }
    function __deref_data_hi_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ym2610_device_base__data_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_ym2610_device_base__data_r(runtime, method_update_streams(runtime)), typeof __t0.read_data === 'function' ? (__t0.read_data() ?? 0) : runtime.container(method_update_streams(runtime), "read_data"))) & 0xff);
    }
    function __deref_ym2610_device_base__data_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ym2610_device_base__status_hi_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_ym2610_device_base__status_hi_r(runtime, method_update_streams(runtime)), typeof __t0.read_status_hi === 'function' ? (__t0.read_status_hi() ?? 0) : runtime.container(method_update_streams(runtime), "read_status_hi"))) & 0xff);
    }
    function __deref_ym2610_device_base__status_hi_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ym2610_device_base__data_hi_r(runtime) {
        const members = runtime.members;
        let __t0;
        return (((__t0 = __deref_ym2610_device_base__data_hi_r(runtime, method_update_streams(runtime)), typeof __t0.read_data_hi === 'function' ? (__t0.read_data_hi() ?? 0) : runtime.container(method_update_streams(runtime), "read_data_hi"))) & 0xff);
    }
    function __deref_ym2610_device_base__data_hi_r(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ym2610_device_base__address_hi_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_ym2610_device_base__address_hi_w(runtime, method_update_streams(runtime)).write_address_hi?.(data) ?? 0);
    }
    function __deref_ym2610_device_base__address_hi_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ym2610_device_base__data_hi_w(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (__deref_ym2610_device_base__data_hi_w(runtime, method_update_streams(runtime)).write_data_hi?.(data) ?? 0);
    }
    function __deref_ym2610_device_base__data_hi_w(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        "ymfm_device_base::device_start": method_ymfm_device_base__device_start,
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
        "ymfm_device_base::update_internal": method_ymfm_device_base__update_internal,
        "update_internal": method_update_internal,
        "ymfm_device_base::ymfm_device_base": method_ymfm_device_base__ymfm_device_base,
        "ymfm_device_base::read": method_ymfm_device_base__read,
        "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
        "ymfm_device_base::write": method_ymfm_device_base__write,
        "ymfm_device_base::address_w": method_ymfm_device_base__address_w,
        "ymfm_device_base::data_w": method_ymfm_device_base__data_w,
        "ymfm_device_base::device_reset": method_ymfm_device_base__device_reset,
        "ymfm_device_base::device_clock_changed": method_ymfm_device_base__device_clock_changed,
        "ymfm_device_base::device_pre_save": method_ymfm_device_base__device_pre_save,
        "ymfm_device_base::device_post_load": method_ymfm_device_base__device_post_load,
        "ymfm_device_base::sound_stream_update": method_ymfm_device_base__sound_stream_update,
        "ymfm_device_base::update_streams": method_ymfm_device_base__update_streams,
        "ymfm_ssg_device_base": method_ymfm_ssg_device_base,
        "ymfm_ssg_device_base::ymfm_ssg_device_base": method_ymfm_ssg_device_base__ymfm_ssg_device_base,
        "ymfm_ssg_device_base::sound_stream_update": method_ymfm_ssg_device_base__sound_stream_update,
        "ym2610_device_base": method_ym2610_device_base,
        "data_r": method_data_r,
        "status_hi_r": method_status_hi_r,
        "data_hi_r": method_data_hi_r,
        "address_hi_w": method_address_hi_w,
        "data_hi_w": method_data_hi_w,
        "ym2610_device_base::data_r": method_ym2610_device_base__data_r,
        "ym2610_device_base::status_hi_r": method_ym2610_device_base__status_hi_r,
        "ym2610_device_base::data_hi_r": method_ym2610_device_base__data_hi_r,
        "ym2610_device_base::address_hi_w": method_ym2610_device_base__address_hi_w,
        "ym2610_device_base::data_hi_w": method_ym2610_device_base__data_hi_w,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "update_streams=": method_update_streams_,
        "ymfm_device_base::update_streams=": method_ymfm_device_base__update_streams_
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "__builtin_clz", "__throw", "attotime::from_ticks", "clock", "emu_fatalerror", "has_configured_map", "m_update_irq", "machine", "machine().time", "save_item", "space", "stream_alloc"];
definition.allocations["ym2610"].compiledMethods = (() => {
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
    function method_ssg_override(runtime, intf) {
        const members = runtime.members;
        (members.m_ssg.override?.(intf) ?? 0);
    }
    function method_set_fidelity(runtime, fidelity) {
        const members = runtime.members;
        members.m_fidelity = fidelity;
        method_update_prescale(runtime);
    }
    function method_update_prescale(runtime) {
        const members = runtime.members;
        if ((((((Number((members.m_fidelity ?? 0)) === Number(1)) ? 1 : 0)) || (((Number((members.m_fidelity ?? 0)) === Number(2)) ? 1 : 0))) ? 1 : 0)) {
            members.m_fm_samples_per_output = ((1) & 0xff);
            (members.m_ssg_resampler.configure?.(2, 9) ?? 0);
        }
        else {
            members.m_fm_samples_per_output = ((9) & 0xff);
            (members.m_ssg_resampler.configure?.(2, 1) ?? 0);
        }
        if ((members.m_ssg.overridden?.() ?? 0)) {
            (members.m_ssg_resampler.configure?.(0, 0) ?? 0);
        }
    }
    function method_sample_rate(runtime, input_clock) {
        const members = runtime.members;
        switch ((members.m_fidelity ?? 0)) {
            case 1:
                {
                    return ((runtime.divide(input_clock, 144)) >>> 0);
                }
            case 2:
                {
                    return ((runtime.divide(input_clock, 144)) >>> 0);
                }
            default:
                {
                    return ((runtime.divide(input_clock, 16)) >>> 0);
                }
        }
    }
    function method_ssg_effective_clock(runtime, input_clock) {
        const members = runtime.members;
        return ((runtime.divide(input_clock, 4)) >>> 0);
    }
    function method_invalidate_caches(runtime) {
        const members = runtime.members;
        (members.m_fm.invalidate_caches?.() ?? 0);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        (members.m_fm.reset?.() ?? 0);
        (members.m_ssg.reset?.() ?? 0);
        (members.m_adpcm_a.reset?.() ?? 0);
        (members.m_adpcm_b.reset?.() ?? 0);
        members.m_eos_status = ((0) & 0xff);
        members.m_flag_mask = ((191) & 0xff);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_address ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_eos_status ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_flag_mask ?? 0)) ?? 0);
        (members.m_fm.save_restore?.(state) ?? 0);
        (members.m_ssg.save_restore?.(state) ?? 0);
        (members.m_ssg_resampler.save_restore?.(state) ?? 0);
        (members.m_adpcm_a.save_restore?.(state) ?? 0);
        (members.m_adpcm_b.save_restore?.(state) ?? 0);
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
        let result = (((((members.m_fm.status?.() ?? 0)) & (3))) & 0xff);
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
    function method_read_data(runtime) {
        const members = runtime.members;
        let result = ((0) & 0xff);
        if (((((members.m_address ?? 0)) < (14)) ? 1 : 0)) {
            result = (((members.m_ssg.read?.((((members.m_address ?? 0)) & (15))) ?? 0)) & 0xff);
        }
        else {
            if (((((members.m_address ?? 0)) < (16)) ? 1 : 0)) {
                result = ((255) & 0xff);
            }
            else {
                if (((((members.m_address ?? 0)) === (255)) ? 1 : 0)) {
                    result = ((1) & 0xff);
                }
            }
        }
        return ((result) & 0xff);
    }
    function method_read_status_hi(runtime) {
        const members = runtime.members;
        return (((((members.m_eos_status ?? 0)) & ((members.m_flag_mask ?? 0)))) & 0xff);
    }
    function method_read_data_hi(runtime) {
        const members = runtime.members;
        let result = ((0) & 0xff);
        return ((result) & 0xff);
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let result = ((0) & 0xff);
        switch (((offset) & (3))) {
            case 0:
                {
                    result = ((method_read_status(runtime)) & 0xff);
                    break;
                }
            case 1:
                {
                    result = ((method_read_data(runtime)) & 0xff);
                    break;
                }
            case 2:
                {
                    result = ((method_read_status_hi(runtime)) & 0xff);
                    break;
                }
            case 3:
                {
                    result = ((method_read_data_hi(runtime)) & 0xff);
                    break;
                }
        }
        return ((result) & 0xff);
    }
    function method_write_address(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_address = ((data) & 0xffff);
    }
    function method_write_data(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (method_bitfield(runtime, (members.m_address ?? 0), 8)) {
            return;
        }
        if (((((members.m_address ?? 0)) < (14)) ? 1 : 0)) {
            (members.m_ssg.write?.((((members.m_address ?? 0)) & (15)), data) ?? 0);
        }
        else {
            if (((((members.m_address ?? 0)) < (16)) ? 1 : 0)) {
            }
            else {
                if (((((members.m_address ?? 0)) < (28)) ? 1 : 0)) {
                    if (((((members.m_address ?? 0)) === (16)) ? 1 : 0)) {
                        data = ((((((data) | (32))) & (-65))) & 0xff);
                    }
                    (members.m_adpcm_b.write?.((((members.m_address ?? 0)) & (15)), data) ?? 0);
                }
                else {
                    if (((((members.m_address ?? 0)) === (28)) ? 1 : 0)) {
                        members.m_flag_mask = (((((~data)) & (191))) & 0xff);
                        members.m_eos_status = ((((members.m_eos_status) & ((~((data) & (191)))))) & 0xff);
                        if (method_bitfield(runtime, data, 7)) {
                            (members.m_adpcm_b.clear_status?.(1) ?? 0);
                        }
                    }
                    else {
                        (members.m_fm.write?.((members.m_address ?? 0), data) ?? 0);
                    }
                }
            }
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
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_write_address_hi(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_address = ((((256) | (data))) & 0xffff);
    }
    function method_write_data_hi(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (((method_bitfield(runtime, (members.m_address ?? 0), 8)) ? 0 : 1)) {
            return;
        }
        if (((((members.m_address ?? 0)) < (304)) ? 1 : 0)) {
            (members.m_adpcm_a.write?.((((members.m_address ?? 0)) & (63)), data) ?? 0);
        }
        else {
            (members.m_fm.write?.((members.m_address ?? 0), data) ?? 0);
        }
        (__deref_write_data_hi(runtime, (members.m_fm.intf?.() ?? 0)).ymfm_set_busy_end?.(((32) * ((members.m_fm.clock_prescale?.() ?? 0)))) ?? 0);
    }
    function __deref_write_data_hi(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        switch (((offset) & (3))) {
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
            case 2:
                {
                    method_write_address_hi(runtime, data);
                    break;
                }
            case 3:
                {
                    method_write_data_hi(runtime, data);
                    break;
                }
        }
    }
    function method_generate(runtime, output, numsamples = 1) {
        const members = runtime.members;
        const h_m_last_fm = members.m_last_fm ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_generate(runtime, output, 1)) {
            if (((Number((((((members.m_ssg_resampler.sampindex?.() ?? 0)) + (samp))) % ((members.m_fm_samples_per_output ?? 0)))) === Number(0)) ? 1 : 0)) {
                method_clock_fm_and_adpcm(runtime);
            }
            __deref_generate(runtime, output).data[0] = h_m_last_fm.data[0];
            __deref_generate(runtime, output).data[1] = h_m_last_fm.data[1];
        }
        (members.m_ssg_resampler.resample?.(__addr_generate(runtime, output, -(numsamples)), numsamples) ?? 0);
    }
    function __add_generate(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function __addr_generate(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
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
    function method_clock_fm_and_adpcm(runtime) {
        const members = runtime.members;
        let __t0, __t1;
        const h_m_last_fm = members.m_last_fm ?? 0;
        let env_counter = (((members.m_fm.clock?.((members.m_fm_mask ?? 0)) ?? 0)) >>> 0);
        if (((Number(method_bitfield(runtime, env_counter, 0, 2)) === Number(0)) ? 1 : 0)) {
            members.m_eos_status = ((((members.m_eos_status) | ((members.m_adpcm_a.clock?.(63) ?? 0)))) & 0xff);
        }
        (members.m_adpcm_b.clock?.() ?? 0);
        let live_eos = ((((((Number((((members.m_adpcm_b.status?.() ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) ? (64) : (0))) & 0xff);
        if (((Number(((((live_eos) ^ ((members.m_eos_status ?? 0)))) & (64))) !== Number(0)) ? 1 : 0)) {
            members.m_eos_status = (((((((((members.m_eos_status ?? 0)) & (-193))) | (live_eos))) | (((live_eos) << (1))))) & 0xff);
        }
        (members.m_fm.output?.((__t0 = __deref_clock_fm_and_adpcm(runtime, members.m_last_fm), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_last_fm, "clear")), 1, 32767, (members.m_fm_mask ?? 0)) ?? 0);
        (members.m_adpcm_a.output_2?.(h_m_last_fm, 63) ?? 0);
        (members.m_adpcm_b.output_2?.(h_m_last_fm, 1) ?? 0);
        (__t1 = __deref_clock_fm_and_adpcm(runtime, members.m_last_fm), typeof __t1.clamp16 === 'function' ? __t1.clamp16() : typeof __t1.clamp16 === 'number' || typeof __t1.clamp16 === 'boolean' ? __t1.clamp16 : runtime.container(members.m_last_fm, "clamp16"));
    }
    function __deref_clock_fm_and_adpcm(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ym2610__ssg_override(runtime, intf) {
        const members = runtime.members;
        (members.m_ssg.override?.(intf) ?? 0);
    }
    function method_ym2610__set_fidelity(runtime, fidelity) {
        const members = runtime.members;
        members.m_fidelity = fidelity;
        method_update_prescale(runtime);
    }
    function method_ym2610__sample_rate(runtime, input_clock) {
        const members = runtime.members;
        switch ((members.m_fidelity ?? 0)) {
            case 1:
                {
                    return ((runtime.divide(input_clock, 144)) >>> 0);
                }
            case 2:
                {
                    return ((runtime.divide(input_clock, 144)) >>> 0);
                }
            default:
                {
                    return ((runtime.divide(input_clock, 16)) >>> 0);
                }
        }
    }
    function method_ym2610__ssg_effective_clock(runtime, input_clock) {
        const members = runtime.members;
        return ((runtime.divide(input_clock, 4)) >>> 0);
    }
    function method_ym2610__invalidate_caches(runtime) {
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
    function method___construct(runtime, intf, channel_mask = 54) {
        const members = runtime.members;
        channel_mask = ((channel_mask) & 0xff);
        members.m_fidelity = 0;
        members.m_address = ((0) & 0xffff);
        members.m_fm_mask = ((channel_mask) & 0xff);
        members.m_eos_status = ((0) & 0xff);
        members.m_flag_mask = ((191) & 0xff);
        members.m_fm = runtime.invoke("new::fm_engine_base__opna_registers", intf);
        members.m_ssg = runtime.invoke("new::ssg_engine", intf);
        members.m_ssg_resampler = runtime.invoke("new::ssg_resampler__ymfm_output__3_2_true", (members.m_ssg ?? 0));
        members.m_adpcm_a = runtime.invoke("new::adpcm_a_engine", intf, 8);
        members.m_adpcm_b = runtime.invoke("new::adpcm_b_engine", intf, 8);
        method_update_prescale(runtime);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "ssg_override": method_ssg_override,
        "set_fidelity": method_set_fidelity,
        "update_prescale": method_update_prescale,
        "sample_rate": method_sample_rate,
        "ssg_effective_clock": method_ssg_effective_clock,
        "invalidate_caches": method_invalidate_caches,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "read_status": method_read_status,
        "read_data": method_read_data,
        "read_status_hi": method_read_status_hi,
        "read_data_hi": method_read_data_hi,
        "read": method_read,
        "write_address": method_write_address,
        "write_data": method_write_data,
        "bitfield": method_bitfield,
        "write_address_hi": method_write_address_hi,
        "write_data_hi": method_write_data_hi,
        "write": method_write,
        "generate": method_generate,
        "clock_fm_and_adpcm": method_clock_fm_and_adpcm,
        "ym2610::ssg_override": method_ym2610__ssg_override,
        "ym2610::set_fidelity": method_ym2610__set_fidelity,
        "ym2610::sample_rate": method_ym2610__sample_rate,
        "ym2610::ssg_effective_clock": method_ym2610__ssg_effective_clock,
        "ym2610::invalidate_caches": method_ym2610__invalidate_caches,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].compiledMethodLinks = ["__builtin_clz"];
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].compiledMethods = (() => {
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
    function method_set_reset_status(runtime, set, reset) {
        const members = runtime.members;
        let __t0;
        set = ((set) & 0xff);
        reset = ((reset) & 0xff);
        members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (128)))))) & 0xff);
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
        return ((runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (24)))) >>> 0);
    }
    function method_intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_invalidate_caches(runtime) {
        const members = runtime.members;
        members.m_modified_channels = ((63) >>> 0);
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
    function method_reset(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        const h_m_channel = members.m_channel ?? 0;
        const h_m_operator = members.m_operator ?? 0;
        method_set_reset_status(runtime, 0, 255);
        (__t0 = __deref_reset(runtime, members.m_regs), typeof __t0.reset === 'function' ? __t0.reset() : typeof __t0.reset === 'number' || typeof __t0.reset === 'boolean' ? __t0.reset : runtime.container(members.m_regs, "reset"));
        method_write(runtime, 39, 0);
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
    function method_write(runtime, regnum, data) {
        const members = runtime.members;
        regnum = ((regnum) & 0xffff);
        data = ((data) & 0xff);
        const h_m_channel = members.m_channel ?? 0;
        /* debug::log_fm_write: no effect */
        if (((Number(regnum) === Number(39)) ? 1 : 0)) {
            (members.m_intf.ymfm_sync_mode_write?.(data) ?? 0);
            return;
        }
        members.m_modified_channels = ((63) >>> 0);
        let keyon_channel = ((0) >>> 0);
        let keyon_opmask = ((0) >>> 0);
        if ((__deref_write(runtime, members.m_regs).write?.(regnum, data, ({ generatedLValue: true, get: () => keyon_channel, set: (value) => { keyon_channel = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => keyon_opmask, set: (value) => { keyon_opmask = ((value) >>> 0); } })) ?? 0)) {
            if (((Number(keyon_channel) < Number(6)) ? 1 : 0)) {
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
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            (h_m_channel[chnum].save_restore?.(state) ?? 0);
        }
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number(24)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
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
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
        let lfo_raw_pm = (((__t1 = __deref_clock(runtime, members.m_regs), typeof __t1.clock_noise_and_lfo === 'function' ? __t1.clock_noise_and_lfo() : typeof __t1.clock_noise_and_lfo === 'number' || typeof __t1.clock_noise_and_lfo === 'boolean' ? __t1.clock_noise_and_lfo : runtime.container(members.m_regs, "clock_noise_and_lfo"))) | 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
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
        return (((((((members.m_status ?? 0)) & (-129))) & ((~(__t0 = __deref_status(runtime, members.m_regs), typeof __t0.status_mask === 'function' ? __t0.status_mask() : typeof __t0.status_mask === 'number' || typeof __t0.status_mask === 'boolean' ? __t0.status_mask : runtime.container(members.m_regs, "status_mask")))))) & 0xff);
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
            (members.m_intf.ymfm_set_timer?.(tnum, ((((period) * (24))) * ((members.m_clock_prescale ?? 0)))) ?? 0);
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
            method_set_reset_status(runtime, 1, 0);
        }
        else {
            if (((((((tnum) === (1)) ? 1 : 0)) && ((__t1 = __deref_engine_timer_expired(runtime, members.m_regs), typeof __t1.enable_timer_b === 'function' ? __t1.enable_timer_b() : typeof __t1.enable_timer_b === 'number' || typeof __t1.enable_timer_b === 'boolean' ? __t1.enable_timer_b : runtime.container(members.m_regs, "enable_timer_b")))) ? 1 : 0)) {
                method_set_reset_status(runtime, 2, 0);
            }
        }
        if (((((((tnum) === (0)) ? 1 : 0)) && ((__t2 = __deref_engine_timer_expired(runtime, members.m_regs), typeof __t2.csm === 'function' ? __t2.csm() : typeof __t2.csm === 'number' || typeof __t2.csm === 'boolean' ? __t2.csm : runtime.container(members.m_regs, "csm")))) ? 1 : 0)) {
            for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
                if (method_bitfield(runtime, 4, chnum)) {
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
            members.m_status = ((((members.m_status) | (0))) & 0xff);
        }
        else {
            members.m_status = ((((members.m_status) & (-1))) & 0xff);
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
        members.m_modified_channels = ((63) >>> 0);
        let dummy1 = ((0) >>> 0);
        let dummy2 = ((0) >>> 0);
        (__deref_engine_mode_write(runtime, members.m_regs).write?.(39, data, ({ generatedLValue: true, get: () => dummy1, set: (value) => { dummy1 = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => dummy2, set: (value) => { dummy2 = ((value) >>> 0); } })) ?? 0);
        if ((__t0 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t0.irq_reset === 'function' ? __t0.irq_reset() : typeof __t0.irq_reset === 'number' || typeof __t0.irq_reset === 'boolean' ? __t0.irq_reset : runtime.container(members.m_regs, "irq_reset"))) {
            method_set_reset_status(runtime, 0, 120);
        }
        else {
            let reset_mask = ((0) & 0xff);
            if ((__t1 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t1.reset_timer_b === 'function' ? __t1.reset_timer_b() : typeof __t1.reset_timer_b === 'number' || typeof __t1.reset_timer_b === 'boolean' ? __t1.reset_timer_b : runtime.container(members.m_regs, "reset_timer_b"))) {
                reset_mask = ((((reset_mask) | (2))) & 0xff);
            }
            if ((__t2 = __deref_engine_mode_write(runtime, members.m_regs), typeof __t2.reset_timer_a === 'function' ? __t2.reset_timer_a() : typeof __t2.reset_timer_a === 'number' || typeof __t2.reset_timer_a === 'boolean' ? __t2.reset_timer_a : runtime.container(members.m_regs, "reset_timer_a"))) {
                reset_mask = ((((reset_mask) | (1))) & 0xff);
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
    function method_fm_engine_base__set_reset_status(runtime, set, reset) {
        const members = runtime.members;
        let __t0;
        set = ((set) & 0xff);
        reset = ((reset) & 0xff);
        members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (128)))))) & 0xff);
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
        return ((runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (24)))) >>> 0);
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
        members.m_modified_channels = ((63) >>> 0);
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
    function method_opna_registers__channel_offset(runtime, chnum) {
        const members = runtime.members;
        if (1) {
            return __add_opna_registers__channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))));
        }
    }
    function __add_opna_registers__channel_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opna_registers__operator_offset(runtime, opnum) {
        const members = runtime.members;
        if (1) {
            return __add_opna_registers__operator_offset(runtime, __add_opna_registers__operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))));
        }
    }
    function __add_opna_registers__operator_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
        members.m_clock_prescale = ((6) & 0xff);
        members.m_irq_mask = ((3) & 0xff);
        members.m_irq_state = ((0) & 0xff);
        h_m_timer_running[0] = 0;
        h_m_timer_running[1] = 0;
        members.m_total_clocks = ((0) & 0xff);
        members.m_active_channels = ((63) >>> 0);
        members.m_modified_channels = ((63) >>> 0);
        members.m_prepare_count = ((0) >>> 0);
        (members.m_intf ?? 0).m_engine = (members.this ?? 0);
        for (let chnum = ((0) >>> 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
            h_m_channel[chnum] = runtime.invoke("new::fm_channel__opna_registers", (members.this ?? 0), method_opna_registers__channel_offset(runtime, chnum));
        }
        for (let opnum = ((0) >>> 0); ((Number(opnum) < Number(24)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
            h_m_operator[opnum] = runtime.invoke("new::fm_operator__opna_registers", (members.this ?? 0), method_opna_registers__operator_offset(runtime, opnum));
        }
        method_assign_operators(runtime);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_reset_status": method_set_reset_status,
        "set_irq_mask": method_set_irq_mask,
        "clock_prescale": method_clock_prescale,
        "set_clock_prescale": method_set_clock_prescale,
        "sample_rate": method_sample_rate,
        "intf": method_intf,
        "regs": method_regs,
        "invalidate_caches": method_invalidate_caches,
        "debug_channel": method_debug_channel,
        "debug_operator": method_debug_operator,
        "reset": method_reset,
        "write": method_write,
        "bitfield": method_bitfield,
        "save_restore": method_save_restore,
        "clock": method_clock,
        "assign_operators": method_assign_operators,
        "output": method_output,
        "status": method_status,
        "update_timer": method_update_timer,
        "engine_timer_expired": method_engine_timer_expired,
        "engine_check_interrupts": method_engine_check_interrupts,
        "engine_mode_write": method_engine_mode_write,
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
        "opna_registers::channel_offset": method_opna_registers__channel_offset,
        "opna_registers::operator_offset": method_opna_registers__operator_offset,
        "intf=": method_intf_,
        "regs=": method_regs_,
        "fm_engine_base::intf=": method_fm_engine_base__intf_,
        "fm_engine_base::regs=": method_fm_engine_base__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].compiledMethodLinks = ["STRUCT_OF", "__builtin_clz"];
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["opn_registers_base__true"].compiledMethods = (() => {
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
        return ((0) >>> 0);
    }
    function method_irq_reset(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_noise_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_rhythm_enable(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_op_ssg_eg_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 144, 3, 1, opoffs)) >>> 0);
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
    function method_op_ssg_eg_mode(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 144, 0, 3, opoffs)) >>> 0);
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
    function method_channel_offset(runtime, chnum) {
        const members = runtime.members;
        if (1) {
            return ((__add_channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))))) >>> 0);
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
            return ((__add_operator_offset(runtime, __add_operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))))) >>> 0);
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
        members.m_lfo_counter = ((0) >>> 0);
    }
    function method_noise_state(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_test(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 33, 0, 8)) >>> 0);
    }
    function method_lfo_enable(runtime) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 34, 3, 1)) : (0))) >>> 0);
    }
    function method_lfo_rate(runtime) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 34, 0, 3)) : (0))) >>> 0);
    }
    function method_timer_a_value(runtime) {
        const members = runtime.members;
        return ((method_word(runtime, 36, 0, 8, 37, 0, 2)) >>> 0);
    }
    function method_word(runtime, offset1, start1, count1, offset2, start2, count2, extra_offset = 0) {
        const members = runtime.members;
        return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
    }
    function method_timer_b_value(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 38, 0, 8)) >>> 0);
    }
    function method_csm(runtime) {
        const members = runtime.members;
        return ((((Number(method_byte(runtime, 39, 6, 2)) === Number(2)) ? 1 : 0)) >>> 0);
    }
    function method_multi_freq(runtime) {
        const members = runtime.members;
        return ((((Number(method_byte(runtime, 39, 6, 2)) !== Number(0)) ? 1 : 0)) >>> 0);
    }
    function method_reset_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 5, 1)) >>> 0);
    }
    function method_reset_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 4, 1)) >>> 0);
    }
    function method_enable_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 3, 1)) >>> 0);
    }
    function method_enable_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 2, 1)) >>> 0);
    }
    function method_load_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 1, 1)) >>> 0);
    }
    function method_load_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 0, 1)) >>> 0);
    }
    function method_multi_block_freq(runtime, num) {
        const members = runtime.members;
        return ((method_word(runtime, 172, 0, 6, 168, 0, 8, num)) >>> 0);
    }
    function method_ch_block_freq(runtime, choffs) {
        const members = runtime.members;
        return ((method_word(runtime, 164, 0, 6, 160, 0, 8, choffs)) >>> 0);
    }
    function method_ch_feedback(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 176, 3, 3, choffs)) >>> 0);
    }
    function method_ch_algorithm(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 176, 0, 3, choffs)) >>> 0);
    }
    function method_ch_output_any(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 6, 2, choffs)) : (1))) >>> 0);
    }
    function method_ch_output_0(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 7, 1, choffs)) : (1))) >>> 0);
    }
    function method_ch_output_1(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 6, 1, choffs)) : (0))) >>> 0);
    }
    function method_ch_output_2(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_ch_output_3(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_ch_lfo_am_sens(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 4, 2, choffs)) : (0))) >>> 0);
    }
    function method_ch_lfo_pm_sens(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 0, 3, choffs)) : (0))) >>> 0);
    }
    function method_op_detune(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 48, 4, 3, opoffs)) >>> 0);
    }
    function method_op_multiple(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 48, 0, 4, opoffs)) >>> 0);
    }
    function method_op_total_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 0, 7, opoffs)) >>> 0);
    }
    function method_op_ksr(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 80, 6, 2, opoffs)) >>> 0);
    }
    function method_op_attack_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 80, 0, 5, opoffs)) >>> 0);
    }
    function method_op_decay_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 0, 5, opoffs)) >>> 0);
    }
    function method_op_lfo_am_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 96, 7, 1, opoffs)) : (0))) >>> 0);
    }
    function method_op_sustain_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 112, 0, 5, opoffs)) >>> 0);
    }
    function method_op_sustain_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 4, 4, opoffs)) >>> 0);
    }
    function method_op_release_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 0, 4, opoffs)) >>> 0);
    }
    function method_opn_registers_base(runtime) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            runtime.writeIndex(h_m_waveform[0], index, ((method_abs_sin_attenuation(runtime, index)) | (((method_bitfield(runtime, index, 9)) << (15)))));
        }
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
        (__L0 ? __L0(__addr_reset(runtime, h_m_regdata, 0), 512, 0) : runtime.macro("std::fill_n", __addr_reset(runtime, h_m_regdata, 0), 512, 0));
        if (1) {
            h_m_regdata[180] = (h_m_regdata[181] = (h_m_regdata[182] = 192));
            h_m_regdata[436] = (h_m_regdata[437] = (h_m_regdata[438] = 192));
        }
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        if (1) {
            (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_counter ?? 0)) ?? 0);
            (__deref_save_restore(runtime, state).save_restore?.((members.m_lfo_am ?? 0)) ?? 0);
        }
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
            runtime.copyStruct(members.__static_operator_map_s_fixed_map, new cppStruct_chan([method_operator_list(runtime, 0, 6, 3, 9), method_operator_list(runtime, 1, 7, 4, 10), method_operator_list(runtime, 2, 8, 5, 11), method_operator_list(runtime, 12, 18, 15, 21), method_operator_list(runtime, 13, 19, 16, 22), method_operator_list(runtime, 14, 20, 17, 23)]));
            members.__static_operator_map_s_fixed_map__initialised = 1;
        }
        let s_fixed_map = h___static_operator_map_s_fixed_map;
        dest = s_fixed_map;
        return dest;
    }
    function method_opn_registers_base__operator_map(runtime, dest) {
        const members = runtime.members;
        const h___static_opn_registers_base_operator_map_s_fixed_map = members.__static_opn_registers_base_operator_map_s_fixed_map ?? 0;
        if ((((members.__static_opn_registers_base_operator_map_s_fixed_map__initialised ?? 0)) ? 0 : 1)) {
            runtime.copyStruct(members.__static_opn_registers_base_operator_map_s_fixed_map, new cppStruct_chan([method_operator_list(runtime, 0, 6, 3, 9), method_operator_list(runtime, 1, 7, 4, 10), method_operator_list(runtime, 2, 8, 5, 11)]));
            members.__static_opn_registers_base_operator_map_s_fixed_map__initialised = 1;
        }
        let s_fixed_map = h___static_opn_registers_base_operator_map_s_fixed_map;
        dest = s_fixed_map;
        return dest;
    }
    function method_write(runtime, index, data, channel, opmask) {
        const members = runtime.members;
        index = ((index) & 0xffff);
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        if (((Number(((index) & (240))) === Number(160)) ? 1 : 0)) {
            if (((Number(method_bitfield(runtime, index, 0, 2)) === Number(3)) ? 1 : 0)) {
                return 0;
            }
            let latchindex = ((((184) | (method_bitfield(runtime, index, 3)))) >>> 0);
            if (method_bitfield(runtime, index, 2)) {
                h_m_regdata[latchindex] = ((data) & (63));
            }
            else {
                h_m_regdata[index] = data;
                h_m_regdata[((index) | (4))] = h_m_regdata[latchindex];
            }
            return 0;
        }
        else {
            if (((Number(((index) & (248))) === Number(184)) ? 1 : 0)) {
                return 0;
            }
        }
        h_m_regdata[index] = data;
        if ((((index) === (40)) ? 1 : 0)) {
            channel.set(((method_bitfield(runtime, data, 0, 2)) >>> 0));
            if (((Number(channel.get()) === Number(3)) ? 1 : 0)) {
                return 0;
            }
            if (1) {
                channel.set(((((channel.get()) + (((method_bitfield(runtime, data, 2, 1)) * (3))))) >>> 0));
            }
            opmask.set(((method_bitfield(runtime, data, 4, 4)) >>> 0));
            return 1;
        }
        return 0;
    }
    function method_clock_noise_and_lfo(runtime) {
        const members = runtime.members;
        let __t0;
        if ((((0) || (((method_lfo_enable(runtime)) ? 0 : 1))) ? 1 : 0)) {
            members.m_lfo_counter = ((0) >>> 0);
            members.m_lfo_am = ((63) & 0xff);
            return ((0) | 0);
        }
        if ((((members.__static_clock_noise_and_lfo_lfo_max_count__initialised ?? 0)) ? 0 : 1)) {
            members.__static_clock_noise_and_lfo_lfo_max_count = [109, 78, 72, 68, 63, 45, 9, 6];
            members.__static_clock_noise_and_lfo_lfo_max_count__initialised = 1;
        }
        let lfo_max_count = (members.__static_clock_noise_and_lfo_lfo_max_count ?? 0);
        let subcount = (((((__t0 = (members.m_lfo_counter ?? 0), members.m_lfo_counter = ((((members.m_lfo_counter) + (1))) >>> 0), __t0)) & 0xff)) >>> 0);
        if (((Number(subcount) >= Number(runtime.readIndex(lfo_max_count, method_lfo_rate(runtime)))) ? 1 : 0)) {
            members.m_lfo_counter = ((((members.m_lfo_counter) + (((257) - (subcount))))) >>> 0);
        }
        members.m_lfo_am = ((method_bitfield(runtime, (members.m_lfo_counter ?? 0), 8, 6)) & 0xff);
        if (((Number(method_bitfield(runtime, (members.m_lfo_counter ?? 0), 14)) === Number(0)) ? 1 : 0)) {
            members.m_lfo_am = ((((members.m_lfo_am) ^ (63))) & 0xff);
        }
        let pm = ((method_bitfield(runtime, (members.m_lfo_counter ?? 0), 10, 3)) | 0);
        if (method_bitfield(runtime, (members.m_lfo_counter ?? 0), 13)) {
            pm = ((((pm) ^ (7))) | 0);
        }
        return ((((method_bitfield(runtime, (members.m_lfo_counter ?? 0), 14)) ? ((-pm)) : (pm))) | 0);
    }
    function method_lfo_am_offset(runtime, choffs) {
        const members = runtime.members;
        let am_shift = ((((((1) << (((method_ch_lfo_am_sens(runtime, choffs)) ^ (3))))) - (1))) >>> 0);
        return ((runtime.shiftRight((((members.m_lfo_am ?? 0)) << (1)), am_shift)) >>> 0);
    }
    function method_cache_operator_data(runtime, choffs, opoffs, cache) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        cache.waveform = __addr_cache_operator_data(runtime, h_m_waveform[0], 0);
        let block_freq = (((cache.block_freq = ((method_ch_block_freq(runtime, choffs)) >>> 0))) >>> 0);
        if ((((method_multi_freq(runtime)) && ((((choffs) === (2)) ? 1 : 0))) ? 1 : 0)) {
            if ((((opoffs) === (2)) ? 1 : 0)) {
                block_freq = (((cache.block_freq = ((method_multi_block_freq(runtime, 1)) >>> 0))) >>> 0);
            }
            else {
                if ((((opoffs) === (10)) ? 1 : 0)) {
                    block_freq = (((cache.block_freq = ((method_multi_block_freq(runtime, 2)) >>> 0))) >>> 0);
                }
                else {
                    if ((((opoffs) === (6)) ? 1 : 0)) {
                        block_freq = (((cache.block_freq = ((method_multi_block_freq(runtime, 0)) >>> 0))) >>> 0);
                    }
                }
            }
        }
        let keycode = ((((method_bitfield(runtime, block_freq, 10, 4)) << (1))) >>> 0);
        keycode = ((((keycode) | (method_bitfield(runtime, 65152, method_bitfield(runtime, block_freq, 7, 4))))) >>> 0);
        cache.detune = ((method_detune_adjustment(runtime, method_op_detune(runtime, opoffs), keycode)) | 0);
        cache.multiple = ((((method_op_multiple(runtime, opoffs)) * (2))) >>> 0);
        if ((((cache.multiple) === (0)) ? 1 : 0)) {
            cache.multiple = ((1) >>> 0);
        }
        if (((((((0) || (((Number(method_lfo_enable(runtime)) === Number(0)) ? 1 : 0))) ? 1 : 0)) || (((Number(method_ch_lfo_pm_sens(runtime, choffs)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
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
    function method_compute_phase_step(runtime, choffs, opoffs, cache, lfo_raw_pm) {
        const members = runtime.members;
        let fnum = ((((method_bitfield(runtime, cache.block_freq, 0, 11)) << (1))) >>> 0);
        let pm_sensitivity = ((method_ch_lfo_pm_sens(runtime, choffs)) >>> 0);
        if ((((pm_sensitivity) !== (0)) ? 1 : 0)) {
            fnum = ((((fnum) + (method_opn_lfo_pm_phase_adjustment(runtime, method_bitfield(runtime, cache.block_freq, 4, 7), pm_sensitivity, lfo_raw_pm)))) >>> 0);
            fnum = ((((fnum) & (4095))) >>> 0);
        }
        let block = ((method_bitfield(runtime, cache.block_freq, 11, 3)) >>> 0);
        let phase_step = ((runtime.shiftRight(((fnum) << (block)), 2)) >>> 0);
        phase_step = ((((phase_step) + (cache.detune))) >>> 0);
        phase_step = ((((phase_step) & (131071))) >>> 0);
        return ((runtime.shiftRight(((phase_step) * (cache.multiple)), 1)) >>> 0);
    }
    function method_opn_lfo_pm_phase_adjustment(runtime, fnum_bits, pm_sensitivity, lfo_raw_pm) {
        const members = runtime.members;
        if ((((members.__static_opn_lfo_pm_phase_adjustment_s_lfo_pm_shifts__initialised ?? 0)) ? 0 : 1)) {
            members.__static_opn_lfo_pm_phase_adjustment_s_lfo_pm_shifts = [[119, 119, 119, 119, 119, 119, 119, 119], [119, 119, 119, 119, 114, 114, 114, 114], [119, 119, 119, 114, 114, 114, 23, 23], [119, 119, 114, 114, 23, 23, 18, 18], [119, 119, 114, 23, 23, 23, 18, 7], [119, 119, 23, 18, 7, 7, 2, 1], [119, 119, 23, 18, 7, 7, 2, 1], [119, 119, 23, 18, 7, 7, 2, 1]];
            members.__static_opn_lfo_pm_phase_adjustment_s_lfo_pm_shifts__initialised = 1;
        }
        let s_lfo_pm_shifts = (members.__static_opn_lfo_pm_phase_adjustment_s_lfo_pm_shifts ?? 0);
        let abs_pm = (((((((lfo_raw_pm) < (0)) ? 1 : 0)) ? ((-lfo_raw_pm)) : (lfo_raw_pm))) | 0);
        let shifts = ((runtime.readIndex(runtime.readIndex(s_lfo_pm_shifts, pm_sensitivity), method_bitfield(runtime, abs_pm, 0, 3))) >>> 0);
        let adjust = ((__add_opn_lfo_pm_phase_adjustment(runtime, ((fnum_bits) >>> (method_bitfield(runtime, shifts, 0, 4))), ((fnum_bits) >>> (method_bitfield(runtime, shifts, 4, 4))))) | 0);
        if ((((pm_sensitivity) > (5)) ? 1 : 0)) {
            adjust = ((((adjust) << (((pm_sensitivity) - (5))))) | 0);
        }
        adjust = ((((adjust) >> (2))) | 0);
        return (((((lfo_raw_pm) < (0)) ? 1 : 0)) ? ((-adjust)) : (adjust));
    }
    function __add_opn_lfo_pm_phase_adjustment(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_log_keyon(runtime, choffs, opoffs) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["snprintf"];
        let chnum = ((__add_log_keyon(runtime, ((choffs) & (3)), ((3) * (method_bitfield(runtime, choffs, 8))))) >>> 0);
        let opnum = ((__add_log_keyon(runtime, ((((opoffs) & (15))) - (runtime.divide(((opoffs) & (15)), 4))), ((12) * (method_bitfield(runtime, opoffs, 8))))) >>> 0);
        let block_freq = ((method_ch_block_freq(runtime, choffs)) >>> 0);
        if ((((method_multi_freq(runtime)) && ((((choffs) === (2)) ? 1 : 0))) ? 1 : 0)) {
            if ((((opoffs) === (2)) ? 1 : 0)) {
                block_freq = ((method_multi_block_freq(runtime, 1)) >>> 0);
            }
            else {
                if ((((opoffs) === (10)) ? 1 : 0)) {
                    block_freq = ((method_multi_block_freq(runtime, 2)) >>> 0);
                }
                else {
                    if ((((opoffs) === (6)) ? 1 : 0)) {
                        block_freq = ((method_multi_block_freq(runtime, 0)) >>> 0);
                    }
                }
            }
        }
        let buffer = new Uint8Array(Math.max(0, Number(256)));
        let end = ((0) | 0);
        end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%u.%02u freq=%04X dt=%u fb=%u alg=%X mul=%X tl=%02X ksr=%u adsr=%02X/%02X/%02X/%X sl=%X", chnum, opnum, block_freq, method_op_detune(runtime, opoffs), method_ch_feedback(runtime, choffs), method_ch_algorithm(runtime, choffs), method_op_multiple(runtime, opoffs), method_op_total_level(runtime, opoffs), method_op_ksr(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_sustain_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%u.%02u freq=%04X dt=%u fb=%u alg=%X mul=%X tl=%02X ksr=%u adsr=%02X/%02X/%02X/%X sl=%X", chnum, opnum, block_freq, method_op_detune(runtime, opoffs), method_ch_feedback(runtime, choffs), method_ch_algorithm(runtime, choffs), method_op_multiple(runtime, opoffs), method_op_total_level(runtime, opoffs), method_op_ksr(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_sustain_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs)))))) | 0);
        if (1) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " out=%c%c", ((method_ch_output_0(runtime, choffs)) ? (76) : (45)), ((method_ch_output_1(runtime, choffs)) ? (82) : (45))) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " out=%c%c", ((method_ch_output_0(runtime, choffs)) ? (76) : (45)), ((method_ch_output_1(runtime, choffs)) ? (82) : (45))))))) | 0);
        }
        if (method_op_ssg_eg_enable(runtime, opoffs)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " ssg=%X", method_op_ssg_eg_mode(runtime, opoffs)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " ssg=%X", method_op_ssg_eg_mode(runtime, opoffs)))))) | 0);
        }
        let am = (((((method_op_lfo_am_enable(runtime, opoffs)) && (((Number(method_ch_lfo_am_sens(runtime, choffs)) !== Number(0)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if (am) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=%u", method_ch_lfo_am_sens(runtime, choffs)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=%u", method_ch_lfo_am_sens(runtime, choffs)))))) | 0);
        }
        let pm = ((((Number(method_ch_lfo_pm_sens(runtime, choffs)) !== Number(0)) ? 1 : 0)) ? 1 : 0);
        if (pm) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=%u", method_ch_lfo_pm_sens(runtime, choffs)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=%u", method_ch_lfo_pm_sens(runtime, choffs)))))) | 0);
        }
        if ((((am) || (pm)) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " lfo=%02X", method_lfo_rate(runtime)) : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " lfo=%02X", method_lfo_rate(runtime)))))) | 0);
        }
        if ((((method_multi_freq(runtime)) && ((((choffs) === (2)) ? 1 : 0))) ? 1 : 0)) {
            end = ((((end) + ((__L0 ? __L0(__addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " multi=1") : runtime.macro("snprintf", __addr_log_keyon(runtime, buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " multi=1"))))) | 0);
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
    function method_opn_registers_base__channel_offset(runtime, chnum) {
        const members = runtime.members;
        if (1) {
            return ((__add_opn_registers_base__channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))))) >>> 0);
        }
    }
    function __add_opn_registers_base__channel_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opn_registers_base__operator_offset(runtime, opnum) {
        const members = runtime.members;
        if (1) {
            return ((__add_opn_registers_base__operator_offset(runtime, __add_opn_registers_base__operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))))) >>> 0);
        }
    }
    function __add_opn_registers_base__operator_offset(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_opn_registers_base__read(runtime, index) {
        const members = runtime.members;
        index = ((index) & 0xffff);
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_opn_registers_base__reset_lfo(runtime) {
        const members = runtime.members;
        members.m_lfo_counter = ((0) >>> 0);
    }
    function method_opn_registers_base__noise_state(runtime) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opn_registers_base__test(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 33, 0, 8)) >>> 0);
    }
    function method_opn_registers_base__lfo_enable(runtime) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 34, 3, 1)) : (0))) >>> 0);
    }
    function method_opn_registers_base__lfo_rate(runtime) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 34, 0, 3)) : (0))) >>> 0);
    }
    function method_opn_registers_base__timer_a_value(runtime) {
        const members = runtime.members;
        return ((method_word(runtime, 36, 0, 8, 37, 0, 2)) >>> 0);
    }
    function method_opn_registers_base__timer_b_value(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 38, 0, 8)) >>> 0);
    }
    function method_opn_registers_base__csm(runtime) {
        const members = runtime.members;
        return ((((Number(method_byte(runtime, 39, 6, 2)) === Number(2)) ? 1 : 0)) >>> 0);
    }
    function method_opn_registers_base__multi_freq(runtime) {
        const members = runtime.members;
        return ((((Number(method_byte(runtime, 39, 6, 2)) !== Number(0)) ? 1 : 0)) >>> 0);
    }
    function method_opn_registers_base__reset_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 5, 1)) >>> 0);
    }
    function method_opn_registers_base__reset_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 4, 1)) >>> 0);
    }
    function method_opn_registers_base__enable_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 3, 1)) >>> 0);
    }
    function method_opn_registers_base__enable_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 2, 1)) >>> 0);
    }
    function method_opn_registers_base__load_timer_b(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 1, 1)) >>> 0);
    }
    function method_opn_registers_base__load_timer_a(runtime) {
        const members = runtime.members;
        return ((method_byte(runtime, 39, 0, 1)) >>> 0);
    }
    function method_opn_registers_base__multi_block_freq(runtime, num) {
        const members = runtime.members;
        return ((method_word(runtime, 172, 0, 6, 168, 0, 8, num)) >>> 0);
    }
    function method_opn_registers_base__ch_block_freq(runtime, choffs) {
        const members = runtime.members;
        return ((method_word(runtime, 164, 0, 6, 160, 0, 8, choffs)) >>> 0);
    }
    function method_opn_registers_base__ch_feedback(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 176, 3, 3, choffs)) >>> 0);
    }
    function method_opn_registers_base__ch_algorithm(runtime, choffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 176, 0, 3, choffs)) >>> 0);
    }
    function method_opn_registers_base__ch_output_any(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 6, 2, choffs)) : (1))) >>> 0);
    }
    function method_opn_registers_base__ch_output_0(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 7, 1, choffs)) : (1))) >>> 0);
    }
    function method_opn_registers_base__ch_output_1(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 6, 1, choffs)) : (0))) >>> 0);
    }
    function method_opn_registers_base__ch_output_2(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opn_registers_base__ch_output_3(runtime, choffs) {
        const members = runtime.members;
        return ((0) >>> 0);
    }
    function method_opn_registers_base__ch_lfo_am_sens(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 4, 2, choffs)) : (0))) >>> 0);
    }
    function method_opn_registers_base__ch_lfo_pm_sens(runtime, choffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 180, 0, 3, choffs)) : (0))) >>> 0);
    }
    function method_opn_registers_base__op_detune(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 48, 4, 3, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_multiple(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 48, 0, 4, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_total_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 64, 0, 7, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_ksr(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 80, 6, 2, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_attack_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 80, 0, 5, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_decay_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 96, 0, 5, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_lfo_am_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((((1) ? (method_byte(runtime, 96, 7, 1, opoffs)) : (0))) >>> 0);
    }
    function method_opn_registers_base__op_sustain_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 112, 0, 5, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_sustain_level(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 4, 4, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_release_rate(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 128, 0, 4, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_ssg_eg_enable(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 144, 3, 1, opoffs)) >>> 0);
    }
    function method_opn_registers_base__op_ssg_eg_mode(runtime, opoffs) {
        const members = runtime.members;
        return ((method_byte(runtime, 144, 0, 3, opoffs)) >>> 0);
    }
    function method_opn_registers_base__byte(runtime, offset, start, count, extra_offset = 0) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return method_bitfield(runtime, h_m_regdata[((offset) + (extra_offset))], start, count);
    }
    function method_opn_registers_base__word(runtime, offset1, start1, count1, offset2, start2, count2, extra_offset = 0) {
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
    function method___construct(runtime) {
        const members = runtime.members;
        const h_m_waveform = members.m_waveform ?? 0;
        members.m_lfo_counter = ((0) >>> 0);
        members.m_lfo_am = ((0) & 0xff);
        for (let index = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
            runtime.writeIndex(h_m_waveform[0], index, ((method_abs_sin_attenuation(runtime, index)) | (((method_bitfield(runtime, index, 9)) << (15)))));
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "status_mask": method_status_mask,
        "irq_reset": method_irq_reset,
        "noise_enable": method_noise_enable,
        "rhythm_enable": method_rhythm_enable,
        "op_ssg_eg_enable": method_op_ssg_eg_enable,
        "byte": method_byte,
        "bitfield": method_bitfield,
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
        "channel_offset": method_channel_offset,
        "operator_offset": method_operator_offset,
        "read": method_read,
        "reset_lfo": method_reset_lfo,
        "noise_state": method_noise_state,
        "test": method_test,
        "lfo_enable": method_lfo_enable,
        "lfo_rate": method_lfo_rate,
        "timer_a_value": method_timer_a_value,
        "word": method_word,
        "timer_b_value": method_timer_b_value,
        "csm": method_csm,
        "multi_freq": method_multi_freq,
        "reset_timer_b": method_reset_timer_b,
        "reset_timer_a": method_reset_timer_a,
        "enable_timer_b": method_enable_timer_b,
        "enable_timer_a": method_enable_timer_a,
        "load_timer_b": method_load_timer_b,
        "load_timer_a": method_load_timer_a,
        "multi_block_freq": method_multi_block_freq,
        "ch_block_freq": method_ch_block_freq,
        "ch_feedback": method_ch_feedback,
        "ch_algorithm": method_ch_algorithm,
        "ch_output_any": method_ch_output_any,
        "ch_output_0": method_ch_output_0,
        "ch_output_1": method_ch_output_1,
        "ch_output_2": method_ch_output_2,
        "ch_output_3": method_ch_output_3,
        "ch_lfo_am_sens": method_ch_lfo_am_sens,
        "ch_lfo_pm_sens": method_ch_lfo_pm_sens,
        "op_detune": method_op_detune,
        "op_multiple": method_op_multiple,
        "op_total_level": method_op_total_level,
        "op_ksr": method_op_ksr,
        "op_attack_rate": method_op_attack_rate,
        "op_decay_rate": method_op_decay_rate,
        "op_lfo_am_enable": method_op_lfo_am_enable,
        "op_sustain_rate": method_op_sustain_rate,
        "op_sustain_level": method_op_sustain_level,
        "op_release_rate": method_op_release_rate,
        "opn_registers_base": method_opn_registers_base,
        "abs_sin_attenuation": method_abs_sin_attenuation,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "clock_noise_and_lfo": method_clock_noise_and_lfo,
        "lfo_am_offset": method_lfo_am_offset,
        "cache_operator_data": method_cache_operator_data,
        "detune_adjustment": method_detune_adjustment,
        "compute_phase_step": method_compute_phase_step,
        "opn_lfo_pm_phase_adjustment": method_opn_lfo_pm_phase_adjustment,
        "log_keyon": method_log_keyon,
        "opn_registers_base::channel_offset": method_opn_registers_base__channel_offset,
        "opn_registers_base::operator_offset": method_opn_registers_base__operator_offset,
        "opn_registers_base::read": method_opn_registers_base__read,
        "opn_registers_base::reset_lfo": method_opn_registers_base__reset_lfo,
        "opn_registers_base::noise_state": method_opn_registers_base__noise_state,
        "opn_registers_base::test": method_opn_registers_base__test,
        "opn_registers_base::lfo_enable": method_opn_registers_base__lfo_enable,
        "opn_registers_base::lfo_rate": method_opn_registers_base__lfo_rate,
        "opn_registers_base::timer_a_value": method_opn_registers_base__timer_a_value,
        "opn_registers_base::timer_b_value": method_opn_registers_base__timer_b_value,
        "opn_registers_base::csm": method_opn_registers_base__csm,
        "opn_registers_base::multi_freq": method_opn_registers_base__multi_freq,
        "opn_registers_base::reset_timer_b": method_opn_registers_base__reset_timer_b,
        "opn_registers_base::reset_timer_a": method_opn_registers_base__reset_timer_a,
        "opn_registers_base::enable_timer_b": method_opn_registers_base__enable_timer_b,
        "opn_registers_base::enable_timer_a": method_opn_registers_base__enable_timer_a,
        "opn_registers_base::load_timer_b": method_opn_registers_base__load_timer_b,
        "opn_registers_base::load_timer_a": method_opn_registers_base__load_timer_a,
        "opn_registers_base::multi_block_freq": method_opn_registers_base__multi_block_freq,
        "opn_registers_base::ch_block_freq": method_opn_registers_base__ch_block_freq,
        "opn_registers_base::ch_feedback": method_opn_registers_base__ch_feedback,
        "opn_registers_base::ch_algorithm": method_opn_registers_base__ch_algorithm,
        "opn_registers_base::ch_output_any": method_opn_registers_base__ch_output_any,
        "opn_registers_base::ch_output_0": method_opn_registers_base__ch_output_0,
        "opn_registers_base::ch_output_1": method_opn_registers_base__ch_output_1,
        "opn_registers_base::ch_output_2": method_opn_registers_base__ch_output_2,
        "opn_registers_base::ch_output_3": method_opn_registers_base__ch_output_3,
        "opn_registers_base::ch_lfo_am_sens": method_opn_registers_base__ch_lfo_am_sens,
        "opn_registers_base::ch_lfo_pm_sens": method_opn_registers_base__ch_lfo_pm_sens,
        "opn_registers_base::op_detune": method_opn_registers_base__op_detune,
        "opn_registers_base::op_multiple": method_opn_registers_base__op_multiple,
        "opn_registers_base::op_total_level": method_opn_registers_base__op_total_level,
        "opn_registers_base::op_ksr": method_opn_registers_base__op_ksr,
        "opn_registers_base::op_attack_rate": method_opn_registers_base__op_attack_rate,
        "opn_registers_base::op_decay_rate": method_opn_registers_base__op_decay_rate,
        "opn_registers_base::op_lfo_am_enable": method_opn_registers_base__op_lfo_am_enable,
        "opn_registers_base::op_sustain_rate": method_opn_registers_base__op_sustain_rate,
        "opn_registers_base::op_sustain_level": method_opn_registers_base__op_sustain_level,
        "opn_registers_base::op_release_rate": method_opn_registers_base__op_release_rate,
        "opn_registers_base::op_ssg_eg_enable": method_opn_registers_base__op_ssg_eg_enable,
        "opn_registers_base::op_ssg_eg_mode": method_opn_registers_base__op_ssg_eg_mode,
        "opn_registers_base::byte": method_opn_registers_base__byte,
        "opn_registers_base::word": method_opn_registers_base__word,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["opn_registers_base__true"].compiledMethodLinks = ["__builtin_clz", "snprintf", "std::fill_n"];
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["opn_registers_base__true"].compiledStructMethods = {
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
            if (1) {
                return ((__add_channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))))) >>> 0);
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
                return ((__add_operator_offset(runtime, __add_operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))))) >>> 0);
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
        function method_noise_state(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_opn_registers_base__channel_offset(runtime, chnum) {
            const members = runtime.members;
            if (1) {
                return ((__add_opn_registers_base__channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))))) >>> 0);
            }
        }
        function __add_opn_registers_base__channel_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opn_registers_base__operator_offset(runtime, opnum) {
            const members = runtime.members;
            if (1) {
                return ((__add_opn_registers_base__operator_offset(runtime, __add_opn_registers_base__operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))))) >>> 0);
            }
        }
        function __add_opn_registers_base__operator_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opn_registers_base__noise_state(runtime) {
            const members = runtime.members;
            return ((0) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "status_mask": method_status_mask,
            "irq_reset": method_irq_reset,
            "noise_enable": method_noise_enable,
            "rhythm_enable": method_rhythm_enable,
            "fm_registers_base::status_mask": method_fm_registers_base__status_mask,
            "fm_registers_base::irq_reset": method_fm_registers_base__irq_reset,
            "fm_registers_base::noise_enable": method_fm_registers_base__noise_enable,
            "fm_registers_base::rhythm_enable": method_fm_registers_base__rhythm_enable,
            "channel_offset": method_channel_offset,
            "operator_offset": method_operator_offset,
            "noise_state": method_noise_state,
            "bitfield": method_bitfield,
            "opn_registers_base::channel_offset": method_opn_registers_base__channel_offset,
            "opn_registers_base::operator_offset": method_opn_registers_base__operator_offset,
            "opn_registers_base::noise_state": method_opn_registers_base__noise_state
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["fm_channel__opna_registers"].compiledMethods = (() => {
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
        return ((Number(runtime.divide(24, 6)) === Number(4)) ? 1 : 0);
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
    function method_add_to_output(runtime, choffs, output, value) {
        const members = runtime.members;
        let out0_index = ((0) | 0);
        let out1_index = ((((1) % (2))) | 0);
        let out2_index = ((((2) % (2))) | 0);
        let out3_index = ((((3) % (2))) | 0);
        if ((((0) || ((__deref_add_to_output(runtime, members.m_regs).ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out0_index] = ((output.data[out0_index]) + (value));
        }
        if ((((1) && ((__deref_add_to_output(runtime, members.m_regs).ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
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
        return ((Number(runtime.divide(24, 6)) === Number(4)) ? 1 : 0);
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
        if ((((0) || ((__deref_fm_channel__add_to_output(runtime, members.m_regs).ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
            output.data[out0_index] = ((output.data[out0_index]) + (value));
        }
        if ((((1) && ((__deref_fm_channel__add_to_output(runtime, members.m_regs).ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["__builtin_clz"];
        if ((((value) === (0)) ? 1 : 0)) {
            return 32;
        }
        return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
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
        "choffs": method_choffs,
        "assign": method_assign,
        "is4op": method_is4op,
        "regs": method_regs,
        "debug_operator": method_debug_operator,
        "add_to_output": method_add_to_output,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "keyonoff": method_keyonoff,
        "bitfield": method_bitfield,
        "prepare": method_prepare,
        "clock": method_clock,
        "output_2op": method_output_2op,
        "clamp": method_clamp,
        "output_4op": method_output_4op,
        "output_rhythm_ch6": method_output_rhythm_ch6,
        "output_rhythm_ch7": method_output_rhythm_ch7,
        "output_rhythm_ch8": method_output_rhythm_ch8,
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
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["fm_channel__opna_registers"].compiledMethodLinks = ["__builtin_clz", "debug::log_keyon"];
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["fm_channel__opna_registers"].compiledStructMethods = {
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
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["__builtin_clz"];
            if ((((value) === (0)) ? 1 : 0)) {
                return 32;
            }
            return (__L0 ? __L0(value) : runtime.macro("__builtin_clz", value));
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
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["fm_operator__opna_registers"].compiledMethods = (() => {
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
        if ((((1) && (((is_restart) ? 0 : 1))) ? 1 : 0)) {
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
        if ((((1) && ((members.m_ssg_inverted ?? 0))) ? 1 : 0)) {
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
        if ((((1) && ((members.m_ssg_inverted ?? 0))) ? 1 : 0)) {
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
        "opoffs": method_opoffs,
        "choffs": method_choffs,
        "set_choffs": method_set_choffs,
        "phase": method_phase,
        "regs": method_regs,
        "debug_eg_state": method_debug_eg_state,
        "debug_eg_attenuation": method_debug_eg_attenuation,
        "debug_ssg_inverted": method_debug_ssg_inverted,
        "debug_cache": method_debug_cache,
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
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["fm_operator__opna_registers"].compiledMethodLinks = ["__builtin_clz"];
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].allocations["fm_operator__opna_registers"].compiledStructMethods = {
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["fm_engine_base__opna_registers"].compiledStructMethods = {
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
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_opna_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            if (1) {
                return __add_opna_registers__channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))));
            }
        }
        function __add_opna_registers__channel_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opna_registers__operator_offset(runtime, opnum) {
            const members = runtime.members;
            if (1) {
                return __add_opna_registers__operator_offset(runtime, __add_opna_registers__operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))));
            }
        }
        function __add_opna_registers__operator_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "bitfield": method_bitfield,
            "opna_registers::channel_offset": method_opna_registers__channel_offset,
            "opna_registers::operator_offset": method_opna_registers__operator_offset
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
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_opna_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            if (1) {
                return __add_opna_registers__channel_offset(runtime, ((chnum) % (3)), ((256) * (runtime.divide(chnum, 3))));
            }
        }
        function __add_opna_registers__channel_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
        }
        function method_opna_registers__operator_offset(runtime, opnum) {
            const members = runtime.members;
            if (1) {
                return __add_opna_registers__operator_offset(runtime, __add_opna_registers__operator_offset(runtime, ((opnum) % (12)), runtime.divide(((opnum) % (12)), 3)), ((256) * (runtime.divide(opnum, 12))));
            }
        }
        function __add_opna_registers__operator_offset(runtime, a, b) {
            if (typeof a === 'number' && typeof b === 'number')
                return a + b;
            if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                return { generatedPointer: true, source: a.source, offset: a.offset + b };
            }
            return runtime.add(a, b);
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
            "opna_registers::channel_offset": method_opna_registers__channel_offset,
            "opna_registers::operator_offset": method_opna_registers__operator_offset
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["ssg_engine"].compiledMethods = (() => {
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
    function method_override(runtime, override) {
        const members = runtime.members;
        members.m_override = (override.address ? override.address() : ({ generatedPointer: true, target: override, offset: 0 }));
    }
    function method_intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_overridden(runtime) {
        const members = runtime.members;
        return (((members.m_override ?? 0)) ? 1 : 0);
    }
    function method_prescale_changed(runtime) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_override ?? 0)) ? 1 : 0)) {
            (__t0 = __deref_prescale_changed(runtime, members.m_override), typeof __t0.ssg_prescale_changed === 'function' ? __t0.ssg_prescale_changed() : typeof __t0.ssg_prescale_changed === 'number' || typeof __t0.ssg_prescale_changed === 'boolean' ? __t0.ssg_prescale_changed : runtime.container(members.m_override, "ssg_prescale_changed"));
        }
    }
    function __deref_prescale_changed(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        let __t0;
        const h_m_tone_count = members.m_tone_count ?? 0;
        const h_m_tone_state = members.m_tone_state ?? 0;
        if ((((members.m_override ?? 0)) ? 1 : 0)) {
            return (__t0 = __deref_reset(runtime, members.m_override), typeof __t0.ssg_reset === 'function' ? __t0.ssg_reset() : typeof __t0.ssg_reset === 'number' || typeof __t0.ssg_reset === 'boolean' ? __t0.ssg_reset : runtime.container(members.m_override, "ssg_reset"));
        }
        (members.m_regs.reset?.() ?? 0);
        for (let chan = ((0) | 0); (((chan) < (3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            h_m_tone_count[chan] = 0;
            h_m_tone_state[chan] = 0;
        }
        members.m_envelope_count = ((0) >>> 0);
        members.m_envelope_state = ((0) >>> 0);
        members.m_noise_count = ((0) >>> 0);
        members.m_noise_state = ((1) >>> 0);
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
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_tone_count = members.m_tone_count ?? 0;
        const h_m_tone_state = members.m_tone_state ?? 0;
        (members.m_regs.save_restore?.(state) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_tone_count) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_tone_state) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_envelope_count ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_envelope_state ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_count ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_noise_state ?? 0)) ?? 0);
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
    function method_clock(runtime) {
        const members = runtime.members;
        const h_m_tone_count = members.m_tone_count ?? 0;
        const h_m_tone_state = members.m_tone_state ?? 0;
        for (let chan = ((0) | 0); (((chan) < (3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            h_m_tone_count[chan] = ((h_m_tone_count[chan]) + (1));
            if (((Number(h_m_tone_count[chan]) >= Number((members.m_regs.ch_tone_period?.(chan) ?? 0))) ? 1 : 0)) {
                h_m_tone_state[chan] = ((h_m_tone_state[chan]) ^ (1));
                h_m_tone_count[chan] = 0;
            }
        }
        members.m_noise_count = ((((members.m_noise_count) + (1))) >>> 0);
        if ((((((Number((((members.m_noise_count ?? 0)) >>> (1))) >= Number((members.m_regs.noise_period?.() ?? 0))) ? 1 : 0)) && (((((members.m_noise_count ?? 0)) !== (1)) ? 1 : 0))) ? 1 : 0)) {
            members.m_noise_state = ((((members.m_noise_state) ^ (((((method_bitfield(runtime, (members.m_noise_state ?? 0), 0)) ^ (method_bitfield(runtime, (members.m_noise_state ?? 0), 3)))) << (17))))) >>> 0);
            members.m_noise_state = ((((members.m_noise_state) >>> (1))) >>> 0);
            members.m_noise_count = ((0) >>> 0);
        }
        members.m_envelope_count = ((((members.m_envelope_count) + (1))) >>> 0);
        if (((Number((members.m_envelope_count ?? 0)) >= Number((members.m_regs.envelope_period?.() ?? 0))) ? 1 : 0)) {
            members.m_envelope_state = ((((members.m_envelope_state) + (1))) >>> 0);
            members.m_envelope_count = ((0) >>> 0);
        }
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_output(runtime, output) {
        const members = runtime.members;
        const h_m_tone_state = members.m_tone_state ?? 0;
        if ((((members.__static_output_s_amplitudes__initialised ?? 0)) ? 0 : 1)) {
            members.__static_output_s_amplitudes = [0, 32, 78, 141, 178, 222, 262, 306, 369, 441, 509, 585, 701, 836, 965, 1112, 1334, 1595, 1853, 2146, 2576, 3081, 3576, 4135, 5000, 6006, 7023, 8155, 9963, 11976, 14132, 16382];
            members.__static_output_s_amplitudes__initialised = 1;
        }
        let s_amplitudes = (members.__static_output_s_amplitudes ?? 0);
        let envelope_volume = ((0) >>> 0);
        if (((((((members.m_regs.envelope_hold?.() ?? 0)) | ((((members.m_regs.envelope_continue?.() ?? 0)) ^ (1))))) && (((((members.m_envelope_state ?? 0)) >= (32)) ? 1 : 0))) ? 1 : 0)) {
            members.m_envelope_state = ((32) >>> 0);
            envelope_volume = (((((((((members.m_regs.envelope_attack?.() ?? 0)) ^ ((members.m_regs.envelope_alternate?.() ?? 0)))) & ((members.m_regs.envelope_continue?.() ?? 0)))) ? (31) : (0))) >>> 0);
        }
        else {
            let attack = (((members.m_regs.envelope_attack?.() ?? 0)) >>> 0);
            if ((members.m_regs.envelope_alternate?.() ?? 0)) {
                attack = ((((attack) ^ (method_bitfield(runtime, (members.m_envelope_state ?? 0), 5)))) >>> 0);
            }
            envelope_volume = (((((((members.m_envelope_state ?? 0)) & (31))) ^ (((attack) ? (0) : (31))))) >>> 0);
        }
        for (let chan = ((0) | 0); (((chan) < (3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            let noise_on = (((((members.m_regs.ch_noise_enable_n?.(chan) ?? 0)) | ((members.m_noise_state ?? 0)))) >>> 0);
            let tone_on = (((((members.m_regs.ch_tone_enable_n?.(chan) ?? 0)) | (h_m_tone_state[chan]))) >>> 0);
            let volume = ((0) >>> 0);
            if (((Number(((noise_on) & (tone_on))) === Number(0)) ? 1 : 0)) {
                volume = ((0) >>> 0);
            }
            else {
                if ((members.m_regs.ch_envelope_enable?.(chan) ?? 0)) {
                    volume = ((envelope_volume) >>> 0);
                }
                else {
                    volume = (((((members.m_regs.ch_amplitude?.(chan) ?? 0)) * (2))) >>> 0);
                    if ((((volume) !== (0)) ? 1 : 0)) {
                        volume = ((((volume) | (1))) >>> 0);
                    }
                }
            }
            output.data[chan] = runtime.readIndex(s_amplitudes, volume);
        }
    }
    function method_read(runtime, regnum) {
        const members = runtime.members;
        if ((((members.m_override ?? 0)) ? 1 : 0)) {
            return (((__deref_read(runtime, members.m_override).ssg_read?.(regnum) ?? 0)) & 0xff);
        }
        if (((((((regnum) === (14)) ? 1 : 0)) && ((((members.m_regs.io_a_out?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            return (((members.m_intf.ymfm_external_read?.(0, 0) ?? 0)) & 0xff);
        }
        else {
            if (((((((regnum) === (15)) ? 1 : 0)) && ((((members.m_regs.io_b_out?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                return (((members.m_intf.ymfm_external_read?.(0, 1) ?? 0)) & 0xff);
            }
        }
        return (((members.m_regs.read?.(regnum) ?? 0)) & 0xff);
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
    function method_write(runtime, regnum, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if ((((members.m_override ?? 0)) ? 1 : 0)) {
            return (__deref_write(runtime, members.m_override).ssg_write?.(regnum, data) ?? 0);
        }
        (members.m_regs.write?.(regnum, data) ?? 0);
        if ((((regnum) === (13)) ? 1 : 0)) {
            members.m_envelope_state = ((0) >>> 0);
        }
        else {
            if (((((((regnum) === (14)) ? 1 : 0)) && ((members.m_regs.io_a_out?.() ?? 0))) ? 1 : 0)) {
                (members.m_intf.ymfm_external_write?.(0, 0, data) ?? 0);
            }
            else {
                if (((((((regnum) === (15)) ? 1 : 0)) && ((members.m_regs.io_b_out?.() ?? 0))) ? 1 : 0)) {
                    (members.m_intf.ymfm_external_write?.(0, 1, data) ?? 0);
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
    function method_ssg_engine__override(runtime, override) {
        const members = runtime.members;
        members.m_override = (override.address ? override.address() : ({ generatedPointer: true, target: override, offset: 0 }));
    }
    function method_ssg_engine__intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_ssg_engine__regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_ssg_engine__overridden(runtime) {
        const members = runtime.members;
        return (((members.m_override ?? 0)) ? 1 : 0);
    }
    function method_ssg_engine__prescale_changed(runtime) {
        const members = runtime.members;
        let __t0;
        if ((((members.m_override ?? 0)) ? 1 : 0)) {
            (__t0 = __deref_ssg_engine__prescale_changed(runtime, members.m_override), typeof __t0.ssg_prescale_changed === 'function' ? __t0.ssg_prescale_changed() : typeof __t0.ssg_prescale_changed === 'number' || typeof __t0.ssg_prescale_changed === 'boolean' ? __t0.ssg_prescale_changed : runtime.container(members.m_override, "ssg_prescale_changed"));
        }
    }
    function __deref_ssg_engine__prescale_changed(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
    function method_ssg_engine__intf_(runtime, __assigned) {
        const members = runtime.members;
        members.m_intf = __assigned;
        return (members.m_intf ?? 0);
    }
    function method_ssg_engine__regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method___construct(runtime, intf) {
        const members = runtime.members;
        const h_m_tone_count = members.m_tone_count ?? 0;
        const h_m_tone_state = members.m_tone_state ?? 0;
        members.m_intf = intf;
        h_m_tone_count[0] = 0;
        h_m_tone_count[1] = 0;
        h_m_tone_count[2] = 0;
        h_m_tone_state[0] = 0;
        h_m_tone_state[1] = 0;
        h_m_tone_state[2] = 0;
        members.m_envelope_count = ((0) >>> 0);
        members.m_envelope_state = ((0) >>> 0);
        members.m_noise_count = ((0) >>> 0);
        members.m_noise_state = ((1) >>> 0);
        members.m_override = 0;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "intf": method_intf,
        "regs": method_regs,
        "overridden": method_overridden,
        "prescale_changed": method_prescale_changed,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "clock": method_clock,
        "bitfield": method_bitfield,
        "output": method_output,
        "read": method_read,
        "write": method_write,
        "ssg_engine::intf": method_ssg_engine__intf,
        "ssg_engine::regs": method_ssg_engine__regs,
        "ssg_engine::overridden": method_ssg_engine__overridden,
        "ssg_engine::prescale_changed": method_ssg_engine__prescale_changed,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "intf=": method_intf_,
        "regs=": method_regs_,
        "ssg_engine::intf=": method_ssg_engine__intf_,
        "ssg_engine::regs=": method_ssg_engine__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["ssg_engine"].compiledMethodLinks = ["__builtin_clz"];
definition.allocations["ym2610"].allocations["ssg_engine"].allocations["ssg_registers"].compiledMethods = (() => {
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
    function method_read(runtime, index) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_write(runtime, index, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        h_m_regdata[index] = data;
    }
    function method_noise_period(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[6], 0, 5)) >>> 0);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_io_b_out(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], 7)) >>> 0);
    }
    function method_io_a_out(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], 6)) >>> 0);
    }
    function method_envelope_period(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[11]) | (((h_m_regdata[12]) << (8))))) >>> 0);
    }
    function method_envelope_continue(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 3)) >>> 0);
    }
    function method_envelope_attack(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 2)) >>> 0);
    }
    function method_envelope_alternate(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 1)) >>> 0);
    }
    function method_envelope_hold(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 0)) >>> 0);
    }
    function method_io_a_data(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[14]) >>> 0);
    }
    function method_io_b_data(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[15]) >>> 0);
    }
    function method_ch_noise_enable_n(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], ((3) + (choffs)))) >>> 0);
    }
    function method_ch_tone_enable_n(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], ((0) + (choffs)))) >>> 0);
    }
    function method_ch_tone_period(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[__add_ch_tone_period(runtime, 0, ((2) * (choffs)))]) | (((method_bitfield(runtime, h_m_regdata[__add_ch_tone_period(runtime, 1, ((2) * (choffs)))], 0, 4)) << (8))))) >>> 0);
    }
    function __add_ch_tone_period(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ch_envelope_enable(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((8) + (choffs))], 4)) >>> 0);
    }
    function method_ch_amplitude(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((8) + (choffs))], 0, 4)) >>> 0);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::fill_n"];
        const h_m_regdata = members.m_regdata ?? 0;
        (__L0 ? __L0(__addr_reset(runtime, h_m_regdata, 0), 16, 0) : runtime.macro("std::fill_n", __addr_reset(runtime, h_m_regdata, 0), 16, 0));
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
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
    function method_ssg_registers__read(runtime, index) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_ssg_registers__write(runtime, index, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        h_m_regdata[index] = data;
    }
    function method_ssg_registers__noise_period(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[6], 0, 5)) >>> 0);
    }
    function method_ssg_registers__io_b_out(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], 7)) >>> 0);
    }
    function method_ssg_registers__io_a_out(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], 6)) >>> 0);
    }
    function method_ssg_registers__envelope_period(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[11]) | (((h_m_regdata[12]) << (8))))) >>> 0);
    }
    function method_ssg_registers__envelope_continue(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 3)) >>> 0);
    }
    function method_ssg_registers__envelope_attack(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 2)) >>> 0);
    }
    function method_ssg_registers__envelope_alternate(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 1)) >>> 0);
    }
    function method_ssg_registers__envelope_hold(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[13], 0)) >>> 0);
    }
    function method_ssg_registers__io_a_data(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[14]) >>> 0);
    }
    function method_ssg_registers__io_b_data(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[15]) >>> 0);
    }
    function method_ssg_registers__ch_noise_enable_n(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], ((3) + (choffs)))) >>> 0);
    }
    function method_ssg_registers__ch_tone_enable_n(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[7], ((0) + (choffs)))) >>> 0);
    }
    function method_ssg_registers__ch_tone_period(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[__add_ssg_registers__ch_tone_period(runtime, 0, ((2) * (choffs)))]) | (((method_bitfield(runtime, h_m_regdata[__add_ssg_registers__ch_tone_period(runtime, 1, ((2) * (choffs)))], 0, 4)) << (8))))) >>> 0);
    }
    function __add_ssg_registers__ch_tone_period(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_ssg_registers__ch_envelope_enable(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((8) + (choffs))], 4)) >>> 0);
    }
    function method_ssg_registers__ch_amplitude(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((8) + (choffs))], 0, 4)) >>> 0);
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
    function method___construct(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "noise_period": method_noise_period,
        "bitfield": method_bitfield,
        "io_b_out": method_io_b_out,
        "io_a_out": method_io_a_out,
        "envelope_period": method_envelope_period,
        "envelope_continue": method_envelope_continue,
        "envelope_attack": method_envelope_attack,
        "envelope_alternate": method_envelope_alternate,
        "envelope_hold": method_envelope_hold,
        "io_a_data": method_io_a_data,
        "io_b_data": method_io_b_data,
        "ch_noise_enable_n": method_ch_noise_enable_n,
        "ch_tone_enable_n": method_ch_tone_enable_n,
        "ch_tone_period": method_ch_tone_period,
        "ch_envelope_enable": method_ch_envelope_enable,
        "ch_amplitude": method_ch_amplitude,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "ssg_registers::read": method_ssg_registers__read,
        "ssg_registers::write": method_ssg_registers__write,
        "ssg_registers::noise_period": method_ssg_registers__noise_period,
        "ssg_registers::io_b_out": method_ssg_registers__io_b_out,
        "ssg_registers::io_a_out": method_ssg_registers__io_a_out,
        "ssg_registers::envelope_period": method_ssg_registers__envelope_period,
        "ssg_registers::envelope_continue": method_ssg_registers__envelope_continue,
        "ssg_registers::envelope_attack": method_ssg_registers__envelope_attack,
        "ssg_registers::envelope_alternate": method_ssg_registers__envelope_alternate,
        "ssg_registers::envelope_hold": method_ssg_registers__envelope_hold,
        "ssg_registers::io_a_data": method_ssg_registers__io_a_data,
        "ssg_registers::io_b_data": method_ssg_registers__io_b_data,
        "ssg_registers::ch_noise_enable_n": method_ssg_registers__ch_noise_enable_n,
        "ssg_registers::ch_tone_enable_n": method_ssg_registers__ch_tone_enable_n,
        "ssg_registers::ch_tone_period": method_ssg_registers__ch_tone_period,
        "ssg_registers::ch_envelope_enable": method_ssg_registers__ch_envelope_enable,
        "ssg_registers::ch_amplitude": method_ssg_registers__ch_amplitude,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["ssg_engine"].allocations["ssg_registers"].compiledMethodLinks = ["__builtin_clz", "std::fill_n"];
definition.allocations["ym2610"].allocations["ssg_engine"].allocations["ssg_registers"].compiledStructMethods = {
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["ssg_engine"].compiledStructMethods = {
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
    "ymfm_output__3": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
definition.allocations["ym2610"].allocations["adpcm_a_engine"].compiledMethods = (() => {
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
    function method_set_start_end(runtime, chnum, start, end) {
        const members = runtime.members;
        chnum = ((chnum) & 0xff);
        start = ((start) & 0xffff);
        end = ((end) & 0xffff);
        let choffs = ((method_adpcm_a_registers__channel_offset(runtime, chnum)) >>> 0);
        (members.m_regs.write_start?.(choffs, start) ?? 0);
        (members.m_regs.write_end?.(choffs, end) ?? 0);
    }
    function method_adpcm_a_registers__channel_offset(runtime, chnum) {
        const members = runtime.members;
        return chnum;
    }
    function method_intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        let __t0;
        const h_m_channel = members.m_channel ?? 0;
        (members.m_regs.reset?.() ?? 0);
        for (let __range0 = h_m_channel, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            const __range0_item = runtime.readIndex(__range0, __range0_index);
            (__t0 = __deref_reset(runtime, __range0_item), typeof __t0.reset === 'function' ? (__t0.reset() ?? 0) : runtime.container(__range0_item, "reset"));
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
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        (members.m_regs.save_restore?.(state) ?? 0);
        for (let chnum = ((0) | 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) | 0)) {
            (h_m_channel[chnum].save_restore?.(state) ?? 0);
        }
    }
    function method_clock(runtime, chanmask) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        let result = ((0) >>> 0);
        for (let chnum = ((0) | 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) | 0)) {
            if (method_bitfield(runtime, chanmask, chnum)) {
                if ((h_m_channel[chnum].clock?.() ?? 0)) {
                    result = ((((result) | (((1) << (chnum))))) >>> 0);
                }
            }
        }
        return ((result) >>> 0);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_output_1(runtime, output, chanmask) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        chanmask = ((((chanmask) & (4294967295))) >>> 0);
        for (let chnum = ((0) | 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) | 0)) {
            if (method_bitfield(runtime, chanmask, chnum)) {
                (h_m_channel[chnum].output_1?.(output) ?? 0);
            }
        }
    }
    function method_output_2(runtime, output, chanmask) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        chanmask = ((((chanmask) & (4294967295))) >>> 0);
        for (let chnum = ((0) | 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) | 0)) {
            if (method_bitfield(runtime, chanmask, chnum)) {
                (h_m_channel[chnum].output_2?.(output) ?? 0);
            }
        }
    }
    function method_write(runtime, regnum, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_channel = members.m_channel ?? 0;
        (members.m_regs.write?.(regnum, data) ?? 0);
        if ((((regnum) === (0)) ? 1 : 0)) {
            for (let chnum = ((0) | 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) | 0)) {
                if (method_bitfield(runtime, data, chnum)) {
                    (h_m_channel[chnum].keyonoff?.(method_bitfield(runtime, (~data), 7)) ?? 0);
                }
            }
        }
    }
    function method_adpcm_a_engine__set_start_end(runtime, chnum, start, end) {
        const members = runtime.members;
        chnum = ((chnum) & 0xff);
        start = ((start) & 0xffff);
        end = ((end) & 0xffff);
        let choffs = ((method_adpcm_a_registers__channel_offset(runtime, chnum)) >>> 0);
        (members.m_regs.write_start?.(choffs, start) ?? 0);
        (members.m_regs.write_end?.(choffs, end) ?? 0);
    }
    function method_adpcm_a_engine__intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_adpcm_a_engine__regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
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
    function method_adpcm_a_engine__intf_(runtime, __assigned) {
        const members = runtime.members;
        members.m_intf = __assigned;
        return (members.m_intf ?? 0);
    }
    function method_adpcm_a_engine__regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method___construct(runtime, intf, addrshift) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? 0;
        members.m_intf = intf;
        for (let chnum = ((0) | 0); ((Number(chnum) < Number(6)) ? 1 : 0); chnum = ((((chnum) + (1))) | 0)) {
            h_m_channel[chnum] = runtime.invoke("new::adpcm_a_channel", (members.this ?? 0), chnum, addrshift);
        }
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "set_start_end": method_set_start_end,
        "adpcm_a_registers::channel_offset": method_adpcm_a_registers__channel_offset,
        "intf": method_intf,
        "regs": method_regs,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "clock": method_clock,
        "bitfield": method_bitfield,
        "output_1": method_output_1,
        "output_2": method_output_2,
        "write": method_write,
        "adpcm_a_engine::set_start_end": method_adpcm_a_engine__set_start_end,
        "adpcm_a_engine::intf": method_adpcm_a_engine__intf,
        "adpcm_a_engine::regs": method_adpcm_a_engine__regs,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "intf=": method_intf_,
        "regs=": method_regs_,
        "adpcm_a_engine::intf=": method_adpcm_a_engine__intf_,
        "adpcm_a_engine::regs=": method_adpcm_a_engine__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["adpcm_a_engine"].compiledMethodLinks = ["__builtin_clz"];
definition.allocations["ym2610"].allocations["adpcm_a_engine"].allocations["adpcm_a_registers"].compiledMethods = (() => {
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
    function method_channel_offset(runtime, chnum) {
        const members = runtime.members;
        return ((chnum) >>> 0);
    }
    function method_adpcm_a_registers__channel_offset(runtime, chnum) {
        const members = runtime.members;
        return ((chnum) >>> 0);
    }
    function method_write(runtime, index, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        h_m_regdata[index] = data;
    }
    function method_dump(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 7)) >>> 0);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_dump_mask(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 0, 6)) >>> 0);
    }
    function method_total_level(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 0, 6)) >>> 0);
    }
    function method_test(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[2]) >>> 0);
    }
    function method_ch_pan_left(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((choffs) + (8))], 7)) >>> 0);
    }
    function method_ch_pan_right(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((choffs) + (8))], 6)) >>> 0);
    }
    function method_ch_instrument_level(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((choffs) + (8))], 0, 5)) >>> 0);
    }
    function method_ch_start(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[((choffs) + (16))]) | (((h_m_regdata[((choffs) + (24))]) << (8))))) >>> 0);
    }
    function method_ch_end(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[((choffs) + (32))]) | (((h_m_regdata[((choffs) + (40))]) << (8))))) >>> 0);
    }
    function method_write_start(runtime, choffs, address) {
        const members = runtime.members;
        method_write(runtime, ((choffs) + (16)), address);
        method_write(runtime, ((choffs) + (24)), ((address) >>> (8)));
    }
    function method_write_end(runtime, choffs, address) {
        const members = runtime.members;
        method_write(runtime, ((choffs) + (32)), address);
        method_write(runtime, ((choffs) + (40)), ((address) >>> (8)));
    }
    function method_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::fill_n"];
        const h_m_regdata = members.m_regdata ?? 0;
        (__L0 ? __L0(__addr_reset(runtime, h_m_regdata, 0), 48, 0) : runtime.macro("std::fill_n", __addr_reset(runtime, h_m_regdata, 0), 48, 0));
        h_m_regdata[8] = (h_m_regdata[9] = (h_m_regdata[10] = (h_m_regdata[11] = (h_m_regdata[12] = (h_m_regdata[13] = 223)))));
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
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
    function method_adpcm_a_registers__write(runtime, index, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        h_m_regdata[index] = data;
    }
    function method_adpcm_a_registers__dump(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 7)) >>> 0);
    }
    function method_adpcm_a_registers__dump_mask(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 0, 6)) >>> 0);
    }
    function method_adpcm_a_registers__total_level(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 0, 6)) >>> 0);
    }
    function method_adpcm_a_registers__test(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[2]) >>> 0);
    }
    function method_adpcm_a_registers__ch_pan_left(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((choffs) + (8))], 7)) >>> 0);
    }
    function method_adpcm_a_registers__ch_pan_right(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((choffs) + (8))], 6)) >>> 0);
    }
    function method_adpcm_a_registers__ch_instrument_level(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[((choffs) + (8))], 0, 5)) >>> 0);
    }
    function method_adpcm_a_registers__ch_start(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[((choffs) + (16))]) | (((h_m_regdata[((choffs) + (24))]) << (8))))) >>> 0);
    }
    function method_adpcm_a_registers__ch_end(runtime, choffs) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[((choffs) + (32))]) | (((h_m_regdata[((choffs) + (40))]) << (8))))) >>> 0);
    }
    function method_adpcm_a_registers__write_start(runtime, choffs, address) {
        const members = runtime.members;
        method_write(runtime, ((choffs) + (16)), address);
        method_write(runtime, ((choffs) + (24)), ((address) >>> (8)));
    }
    function method_adpcm_a_registers__write_end(runtime, choffs, address) {
        const members = runtime.members;
        method_write(runtime, ((choffs) + (32)), address);
        method_write(runtime, ((choffs) + (40)), ((address) >>> (8)));
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
    function method___construct(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "channel_offset": method_channel_offset,
        "adpcm_a_registers::channel_offset": method_adpcm_a_registers__channel_offset,
        "write": method_write,
        "dump": method_dump,
        "bitfield": method_bitfield,
        "dump_mask": method_dump_mask,
        "total_level": method_total_level,
        "test": method_test,
        "ch_pan_left": method_ch_pan_left,
        "ch_pan_right": method_ch_pan_right,
        "ch_instrument_level": method_ch_instrument_level,
        "ch_start": method_ch_start,
        "ch_end": method_ch_end,
        "write_start": method_write_start,
        "write_end": method_write_end,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "adpcm_a_registers::write": method_adpcm_a_registers__write,
        "adpcm_a_registers::dump": method_adpcm_a_registers__dump,
        "adpcm_a_registers::dump_mask": method_adpcm_a_registers__dump_mask,
        "adpcm_a_registers::total_level": method_adpcm_a_registers__total_level,
        "adpcm_a_registers::test": method_adpcm_a_registers__test,
        "adpcm_a_registers::ch_pan_left": method_adpcm_a_registers__ch_pan_left,
        "adpcm_a_registers::ch_pan_right": method_adpcm_a_registers__ch_pan_right,
        "adpcm_a_registers::ch_instrument_level": method_adpcm_a_registers__ch_instrument_level,
        "adpcm_a_registers::ch_start": method_adpcm_a_registers__ch_start,
        "adpcm_a_registers::ch_end": method_adpcm_a_registers__ch_end,
        "adpcm_a_registers::write_start": method_adpcm_a_registers__write_start,
        "adpcm_a_registers::write_end": method_adpcm_a_registers__write_end,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["adpcm_a_engine"].allocations["adpcm_a_registers"].compiledMethodLinks = ["__builtin_clz", "std::fill_n"];
definition.allocations["ym2610"].allocations["adpcm_a_engine"].allocations["adpcm_a_registers"].compiledStructMethods = {
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
        function method_channel_offset(runtime, chnum) {
            const members = runtime.members;
            return ((chnum) >>> 0);
        }
        function method_adpcm_a_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            return ((chnum) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "channel_offset": method_channel_offset,
            "adpcm_a_registers::channel_offset": method_adpcm_a_registers__channel_offset
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["adpcm_a_engine"].allocations["adpcm_a_channel"].compiledMethods = (() => {
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
        members.m_playing = ((0) >>> 0);
        members.m_curnibble = ((0) >>> 0);
        members.m_curbyte = ((0) >>> 0);
        members.m_curaddress = ((0) >>> 0);
        members.m_accumulator = ((0) | 0);
        members.m_step_index = ((0) | 0);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_playing ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_curnibble ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_curbyte ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_curaddress ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_accumulator ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_step_index ?? 0)) ?? 0);
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
    function method_keyonoff(runtime, on) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["debug::log_keyon"];
        members.m_playing = ((on) >>> 0);
        if ((members.m_playing ?? 0)) {
            members.m_curaddress = (((((members.m_regs.ch_start?.((members.m_choffs ?? 0)) ?? 0)) << ((members.m_address_shift ?? 0)))) >>> 0);
            members.m_curnibble = ((0) >>> 0);
            members.m_curbyte = ((0) >>> 0);
            members.m_accumulator = ((0) | 0);
            members.m_step_index = ((0) | 0);
            if (((Number(((runtime.shiftRight(4294967295, (members.m_choffs ?? 0))) & (1))) !== Number(0)) ? 1 : 0)) {
                (__L0 ? __L0("KeyOn ADPCM-A%d: pan=%d%d start=%04X end=%04X level=%02X\n", (members.m_choffs ?? 0), (members.m_regs.ch_pan_left?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_pan_right?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_start?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_end?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_instrument_level?.((members.m_choffs ?? 0)) ?? 0)) : runtime.macro("debug::log_keyon", "KeyOn ADPCM-A%d: pan=%d%d start=%04X end=%04X level=%02X\n", (members.m_choffs ?? 0), (members.m_regs.ch_pan_left?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_pan_right?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_start?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_end?.((members.m_choffs ?? 0)) ?? 0), (members.m_regs.ch_instrument_level?.((members.m_choffs ?? 0)) ?? 0)));
            }
        }
    }
    function method_clock(runtime) {
        const members = runtime.members;
        let __t0;
        if (((((members.m_playing ?? 0)) === (0)) ? 1 : 0)) {
            members.m_accumulator = ((0) | 0);
            return 0;
        }
        let data = ((0) & 0xff);
        if (((((members.m_curnibble ?? 0)) === (0)) ? 1 : 0)) {
            let end = ((((__add_clock(runtime, (members.m_regs.ch_end?.((members.m_choffs ?? 0)) ?? 0), 1)) << ((members.m_address_shift ?? 0)))) >>> 0);
            if (((Number((((((members.m_curaddress ?? 0)) ^ (end))) & (1048575))) === Number(0)) ? 1 : 0)) {
                members.m_playing = (((members.m_accumulator = ((0) | 0))) >>> 0);
                return 1;
            }
            members.m_curbyte = (((__deref_clock(runtime, (members.m_owner.intf?.() ?? 0)).ymfm_external_read?.(1, (__t0 = (members.m_curaddress ?? 0), members.m_curaddress = ((((members.m_curaddress) + (1))) >>> 0), __t0)) ?? 0)) >>> 0);
            data = (((((members.m_curbyte ?? 0)) >>> (4))) & 0xff);
            members.m_curnibble = ((1) >>> 0);
        }
        else {
            data = (((((members.m_curbyte ?? 0)) & (15))) & 0xff);
            members.m_curnibble = ((0) >>> 0);
        }
        if ((((members.__static_clock_s_steps__initialised ?? 0)) ? 0 : 1)) {
            members.__static_clock_s_steps = [16, 17, 19, 21, 23, 25, 28, 31, 34, 37, 41, 45, 50, 55, 60, 66, 73, 80, 88, 97, 107, 118, 130, 143, 157, 173, 190, 209, 230, 253, 279, 307, 337, 371, 408, 449, 494, 544, 598, 658, 724, 796, 876, 963, 1060, 1166, 1282, 1411, 1552];
            members.__static_clock_s_steps__initialised = 1;
        }
        let s_steps = (members.__static_clock_s_steps ?? 0);
        let delta = ((runtime.divide(((__add_clock(runtime, ((2) * (method_bitfield(runtime, data, 0, 3))), 1)) * (runtime.readIndex(s_steps, (members.m_step_index ?? 0)))), 8)) | 0);
        if (method_bitfield(runtime, data, 3)) {
            delta = (((-delta)) | 0);
        }
        members.m_accumulator = (((((((members.m_accumulator ?? 0)) + (delta))) & (4095))) | 0);
        if ((((members.__static_clock_s_step_inc__initialised ?? 0)) ? 0 : 1)) {
            members.__static_clock_s_step_inc = [-1, -1, -1, -1, 2, 5, 7, 9];
            members.__static_clock_s_step_inc__initialised = 1;
        }
        let s_step_inc = (members.__static_clock_s_step_inc ?? 0);
        members.m_step_index = ((method_clamp(runtime, (((members.m_step_index ?? 0)) + (runtime.readIndex(s_step_inc, method_bitfield(runtime, data, 0, 3)))), 0, 48)) | 0);
        return 0;
    }
    function __add_clock(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
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
    function method_output_1(runtime, output) {
        const members = runtime.members;
        let vol = ((__add_output_1(runtime, (((members.m_regs.ch_instrument_level?.((members.m_choffs ?? 0)) ?? 0)) ^ (31)), (((members.m_regs.total_level?.() ?? 0)) ^ (63)))) | 0);
        if ((((vol) >= (63)) ? 1 : 0)) {
            return;
        }
        let mul = ((((15) - (((vol) & (7))))) << 24 >> 24);
        let shift = ((__add_output_1(runtime, 5, runtime.shiftRight(vol, 3))) & 0xff);
        let value = ((((runtime.shiftRight((((((((members.m_accumulator ?? 0)) << (4))) << 16 >> 16)) * (mul)), shift)) & (-4))) << 16 >> 16);
        if (1) {
            runtime.writeIndex(output.data, 0, ((runtime.readIndex(output.data, 0)) + (value)));
        }
    }
    function __add_output_1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_output_2(runtime, output) {
        const members = runtime.members;
        let vol = ((__add_output_2(runtime, (((members.m_regs.ch_instrument_level?.((members.m_choffs ?? 0)) ?? 0)) ^ (31)), (((members.m_regs.total_level?.() ?? 0)) ^ (63)))) | 0);
        if ((((vol) >= (63)) ? 1 : 0)) {
            return;
        }
        let mul = ((((15) - (((vol) & (7))))) << 24 >> 24);
        let shift = ((__add_output_2(runtime, 5, runtime.shiftRight(vol, 3))) & 0xff);
        let value = ((((runtime.shiftRight((((((((members.m_accumulator ?? 0)) << (4))) << 16 >> 16)) * (mul)), shift)) & (-4))) << 16 >> 16);
        if ((((0) || ((members.m_regs.ch_pan_left?.((members.m_choffs ?? 0)) ?? 0))) ? 1 : 0)) {
            runtime.writeIndex(output.data, 0, ((runtime.readIndex(output.data, 0)) + (value)));
        }
        if ((((1) && ((members.m_regs.ch_pan_right?.((members.m_choffs ?? 0)) ?? 0))) ? 1 : 0)) {
            runtime.writeIndex(output.data, 1, ((runtime.readIndex(output.data, 1)) + (value)));
        }
    }
    function __add_output_2(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
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
    function method___construct(runtime, owner, choffs, addrshift) {
        const members = runtime.members;
        let __t0;
        members.m_choffs = ((choffs) >>> 0);
        members.m_address_shift = ((addrshift) >>> 0);
        members.m_playing = ((0) >>> 0);
        members.m_curnibble = ((0) >>> 0);
        members.m_curbyte = ((0) >>> 0);
        members.m_curaddress = ((0) >>> 0);
        members.m_accumulator = ((0) | 0);
        members.m_step_index = ((0) | 0);
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
        "clock": method_clock,
        "bitfield": method_bitfield,
        "clamp": method_clamp,
        "output_1": method_output_1,
        "output_2": method_output_2,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["adpcm_a_engine"].allocations["adpcm_a_channel"].compiledMethodLinks = ["__builtin_clz", "debug::log_keyon"];
definition.allocations["ym2610"].allocations["adpcm_a_engine"].allocations["adpcm_a_channel"].compiledStructMethods = {
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["adpcm_a_engine"].compiledStructMethods = {
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
        function method_adpcm_a_registers__channel_offset(runtime, chnum) {
            const members = runtime.members;
            return chnum;
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "adpcm_a_registers::channel_offset": method_adpcm_a_registers__channel_offset
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["adpcm_b_engine"].compiledMethods = (() => {
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
    function method_read(runtime, regnum) {
        const members = runtime.members;
        return (((members.m_channel.read?.(regnum) ?? 0)) >>> 0);
    }
    function method_status(runtime) {
        const members = runtime.members;
        return (((members.m_channel.status?.() ?? 0)) & 0xff);
    }
    function method_clear_status(runtime, status) {
        const members = runtime.members;
        status = ((status) & 0xff);
        (members.m_channel.clear_status?.(status) ?? 0);
    }
    function method_intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        (members.m_regs.reset?.() ?? 0);
        (members.m_channel.reset?.() ?? 0);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        (members.m_regs.save_restore?.(state) ?? 0);
        (members.m_channel.save_restore?.(state) ?? 0);
    }
    function method_clock(runtime) {
        const members = runtime.members;
        (members.m_channel.clock?.() ?? 0);
    }
    function method_output_1(runtime, output, rshift) {
        const members = runtime.members;
        (members.m_channel.output_1?.(output, rshift) ?? 0);
    }
    function method_output_2(runtime, output, rshift) {
        const members = runtime.members;
        (members.m_channel.output_2?.(output, rshift) ?? 0);
    }
    function method_write(runtime, regnum, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        (members.m_regs.write?.(regnum, data) ?? 0);
        (members.m_channel.write?.(regnum, data) ?? 0);
    }
    function method_adpcm_b_engine__read(runtime, regnum) {
        const members = runtime.members;
        return (((members.m_channel.read?.(regnum) ?? 0)) >>> 0);
    }
    function method_adpcm_b_engine__status(runtime) {
        const members = runtime.members;
        return (((members.m_channel.status?.() ?? 0)) & 0xff);
    }
    function method_adpcm_b_engine__clear_status(runtime, status) {
        const members = runtime.members;
        status = ((status) & 0xff);
        (members.m_channel.clear_status?.(status) ?? 0);
    }
    function method_adpcm_b_engine__intf(runtime) {
        const members = runtime.members;
        return (members.m_intf ?? 0);
    }
    function method_adpcm_b_engine__regs(runtime) {
        const members = runtime.members;
        return (members.m_regs ?? 0);
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
    function method_adpcm_b_engine__intf_(runtime, __assigned) {
        const members = runtime.members;
        members.m_intf = __assigned;
        return (members.m_intf ?? 0);
    }
    function method_adpcm_b_engine__regs_(runtime, __assigned) {
        const members = runtime.members;
        members.m_regs = __assigned;
        return (members.m_regs ?? 0);
    }
    function method___construct(runtime, intf, addrshift = 0) {
        const members = runtime.members;
        members.m_intf = intf;
        members.m_channel = runtime.invoke("new::adpcm_b_channel", (members.this ?? 0), addrshift);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "status": method_status,
        "clear_status": method_clear_status,
        "intf": method_intf,
        "regs": method_regs,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "clock": method_clock,
        "output_1": method_output_1,
        "output_2": method_output_2,
        "write": method_write,
        "adpcm_b_engine::read": method_adpcm_b_engine__read,
        "adpcm_b_engine::status": method_adpcm_b_engine__status,
        "adpcm_b_engine::clear_status": method_adpcm_b_engine__clear_status,
        "adpcm_b_engine::intf": method_adpcm_b_engine__intf,
        "adpcm_b_engine::regs": method_adpcm_b_engine__regs,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "intf=": method_intf_,
        "regs=": method_regs_,
        "adpcm_b_engine::intf=": method_adpcm_b_engine__intf_,
        "adpcm_b_engine::regs=": method_adpcm_b_engine__regs_,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["adpcm_b_engine"].compiledMethodLinks = ["__builtin_clz"];
definition.allocations["ym2610"].allocations["adpcm_b_engine"].allocations["adpcm_b_registers"].compiledMethods = (() => {
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
    function method_read(runtime, index) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_write(runtime, index, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        h_m_regdata[index] = data;
    }
    function method_execute(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 7)) >>> 0);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_record(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 6)) >>> 0);
    }
    function method_external(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 5)) >>> 0);
    }
    function method_repeat(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 4)) >>> 0);
    }
    function method_speaker(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 3)) >>> 0);
    }
    function method_resetflag(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 0)) >>> 0);
    }
    function method_pan_left(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 7)) >>> 0);
    }
    function method_pan_right(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 6)) >>> 0);
    }
    function method_start_conversion(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 3)) >>> 0);
    }
    function method_dac_enable(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 2)) >>> 0);
    }
    function method_dram_8bit(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 1)) >>> 0);
    }
    function method_rom_ram(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 0)) >>> 0);
    }
    function method_start(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[2]) | (((h_m_regdata[3]) << (8))))) >>> 0);
    }
    function method_end(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[4]) | (((h_m_regdata[5]) << (8))))) >>> 0);
    }
    function method_prescale(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[6]) | (((method_bitfield(runtime, h_m_regdata[7], 0, 3)) << (8))))) >>> 0);
    }
    function method_cpudata(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[8]) >>> 0);
    }
    function method_delta_n(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[9]) | (((h_m_regdata[10]) << (8))))) >>> 0);
    }
    function method_level(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[11]) >>> 0);
    }
    function method_limit(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[12]) | (((h_m_regdata[13]) << (8))))) >>> 0);
    }
    function method_dac(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[14]) >>> 0);
    }
    function method_pcm(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[15]) >>> 0);
    }
    function method_reset(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::fill_n"];
        const h_m_regdata = members.m_regdata ?? 0;
        (__L0 ? __L0(__addr_reset(runtime, h_m_regdata, 0), 17, 0) : runtime.macro("std::fill_n", __addr_reset(runtime, h_m_regdata, 0), 17, 0));
        h_m_regdata[12] = (h_m_regdata[13] = 255);
    }
    function __addr_reset(runtime, v, i) {
        if (Array.isArray(v) || ArrayBuffer.isView(v))
            return { generatedPointer: true, source: v, offset: i };
        return runtime.addressOf(v, i);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
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
    function method_adpcm_b_registers__read(runtime, index) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[index]) & 0xff);
    }
    function method_adpcm_b_registers__write(runtime, index, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        const h_m_regdata = members.m_regdata ?? 0;
        h_m_regdata[index] = data;
    }
    function method_adpcm_b_registers__execute(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 7)) >>> 0);
    }
    function method_adpcm_b_registers__record(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 6)) >>> 0);
    }
    function method_adpcm_b_registers__external(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 5)) >>> 0);
    }
    function method_adpcm_b_registers__repeat(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 4)) >>> 0);
    }
    function method_adpcm_b_registers__speaker(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 3)) >>> 0);
    }
    function method_adpcm_b_registers__resetflag(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[0], 0)) >>> 0);
    }
    function method_adpcm_b_registers__pan_left(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 7)) >>> 0);
    }
    function method_adpcm_b_registers__pan_right(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 6)) >>> 0);
    }
    function method_adpcm_b_registers__start_conversion(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 3)) >>> 0);
    }
    function method_adpcm_b_registers__dac_enable(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 2)) >>> 0);
    }
    function method_adpcm_b_registers__dram_8bit(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 1)) >>> 0);
    }
    function method_adpcm_b_registers__rom_ram(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((method_bitfield(runtime, h_m_regdata[1], 0)) >>> 0);
    }
    function method_adpcm_b_registers__start(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[2]) | (((h_m_regdata[3]) << (8))))) >>> 0);
    }
    function method_adpcm_b_registers__end(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[4]) | (((h_m_regdata[5]) << (8))))) >>> 0);
    }
    function method_adpcm_b_registers__prescale(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[6]) | (((method_bitfield(runtime, h_m_regdata[7], 0, 3)) << (8))))) >>> 0);
    }
    function method_adpcm_b_registers__cpudata(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[8]) >>> 0);
    }
    function method_adpcm_b_registers__delta_n(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[9]) | (((h_m_regdata[10]) << (8))))) >>> 0);
    }
    function method_adpcm_b_registers__level(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[11]) >>> 0);
    }
    function method_adpcm_b_registers__limit(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((((h_m_regdata[12]) | (((h_m_regdata[13]) << (8))))) >>> 0);
    }
    function method_adpcm_b_registers__dac(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[14]) >>> 0);
    }
    function method_adpcm_b_registers__pcm(runtime) {
        const members = runtime.members;
        const h_m_regdata = members.m_regdata ?? 0;
        return ((h_m_regdata[15]) >>> 0);
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
    function method___construct(runtime) {
        const members = runtime.members;
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "read": method_read,
        "write": method_write,
        "execute": method_execute,
        "bitfield": method_bitfield,
        "record": method_record,
        "external": method_external,
        "repeat": method_repeat,
        "speaker": method_speaker,
        "resetflag": method_resetflag,
        "pan_left": method_pan_left,
        "pan_right": method_pan_right,
        "start_conversion": method_start_conversion,
        "dac_enable": method_dac_enable,
        "dram_8bit": method_dram_8bit,
        "rom_ram": method_rom_ram,
        "start": method_start,
        "end": method_end,
        "prescale": method_prescale,
        "cpudata": method_cpudata,
        "delta_n": method_delta_n,
        "level": method_level,
        "limit": method_limit,
        "dac": method_dac,
        "pcm": method_pcm,
        "reset": method_reset,
        "save_restore": method_save_restore,
        "adpcm_b_registers::read": method_adpcm_b_registers__read,
        "adpcm_b_registers::write": method_adpcm_b_registers__write,
        "adpcm_b_registers::execute": method_adpcm_b_registers__execute,
        "adpcm_b_registers::record": method_adpcm_b_registers__record,
        "adpcm_b_registers::external": method_adpcm_b_registers__external,
        "adpcm_b_registers::repeat": method_adpcm_b_registers__repeat,
        "adpcm_b_registers::speaker": method_adpcm_b_registers__speaker,
        "adpcm_b_registers::resetflag": method_adpcm_b_registers__resetflag,
        "adpcm_b_registers::pan_left": method_adpcm_b_registers__pan_left,
        "adpcm_b_registers::pan_right": method_adpcm_b_registers__pan_right,
        "adpcm_b_registers::start_conversion": method_adpcm_b_registers__start_conversion,
        "adpcm_b_registers::dac_enable": method_adpcm_b_registers__dac_enable,
        "adpcm_b_registers::dram_8bit": method_adpcm_b_registers__dram_8bit,
        "adpcm_b_registers::rom_ram": method_adpcm_b_registers__rom_ram,
        "adpcm_b_registers::start": method_adpcm_b_registers__start,
        "adpcm_b_registers::end": method_adpcm_b_registers__end,
        "adpcm_b_registers::prescale": method_adpcm_b_registers__prescale,
        "adpcm_b_registers::cpudata": method_adpcm_b_registers__cpudata,
        "adpcm_b_registers::delta_n": method_adpcm_b_registers__delta_n,
        "adpcm_b_registers::level": method_adpcm_b_registers__level,
        "adpcm_b_registers::limit": method_adpcm_b_registers__limit,
        "adpcm_b_registers::dac": method_adpcm_b_registers__dac,
        "adpcm_b_registers::pcm": method_adpcm_b_registers__pcm,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["adpcm_b_engine"].allocations["adpcm_b_registers"].compiledMethodLinks = ["__builtin_clz", "std::fill_n"];
definition.allocations["ym2610"].allocations["adpcm_b_engine"].allocations["adpcm_b_registers"].compiledStructMethods = {
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["adpcm_b_engine"].allocations["adpcm_b_channel"].compiledMethods = (() => {
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
        members.m_status = ((2) >>> 0);
        members.m_buffer = ((0) >>> 0);
        members.m_nibbles = ((0) >>> 0);
        members.m_position = ((0) >>> 0);
        members.m_curaddress = ((0) >>> 0);
        members.m_accumulator = ((0) | 0);
        members.m_output = ((0) | 0);
        members.m_prev_output = ((0) | 0);
        members.m_adpcm_step = ((127) | 0);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_status ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_buffer ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_nibbles ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_position ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_curaddress ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_accumulator ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_output ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_prev_output ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.((members.m_adpcm_step ?? 0)) ?? 0);
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
    function method_clock(runtime) {
        const members = runtime.members;
        if ((((((((((members.m_regs.execute?.() ?? 0)) ? 0 : 1)) || ((members.m_regs.record?.() ?? 0))) ? 1 : 0)) || (((Number((((members.m_status ?? 0)) & (16))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
            members.m_prev_output = (((members.m_output ?? 0)) | 0);
            members.m_position = ((0) >>> 0);
            method_set_reset_status(runtime, 0, 16);
            return;
        }
        let position = (((((members.m_position ?? 0)) + ((members.m_regs.delta_n?.() ?? 0)))) >>> 0);
        members.m_position = ((((position) & 0xffff)) >>> 0);
        if ((((position) < (65536)) ? 1 : 0)) {
            return;
        }
        if (((((members.m_nibbles ?? 0)) !== (0)) ? 1 : 0)) {
            let data = ((method_consume_nibbles(runtime, 1)) & 0xff);
            let delta = ((runtime.divide(((__add_clock(runtime, ((2) * (method_bitfield(runtime, data, 0, 3))), 1)) * ((members.m_adpcm_step ?? 0))), 8)) | 0);
            if (method_bitfield(runtime, data, 3)) {
                delta = (((-delta)) | 0);
            }
            members.m_accumulator = ((method_clamp(runtime, (((members.m_accumulator ?? 0)) + (delta)), -32768, 32767)) | 0);
            if ((((members.__static_clock_s_step_scale__initialised ?? 0)) ? 0 : 1)) {
                members.__static_clock_s_step_scale = [57, 57, 57, 57, 77, 102, 128, 153];
                members.__static_clock_s_step_scale__initialised = 1;
            }
            let s_step_scale = (members.__static_clock_s_step_scale ?? 0);
            members.m_adpcm_step = ((method_clamp(runtime, runtime.divide((((members.m_adpcm_step ?? 0)) * (runtime.readIndex(s_step_scale, method_bitfield(runtime, data, 0, 3)))), 64), 127, 24576)) | 0);
            members.m_prev_output = (((members.m_output ?? 0)) | 0);
            members.m_output = (((members.m_accumulator ?? 0)) | 0);
            if (((((members.m_nibbles ?? 0)) === (0)) ? 1 : 0)) {
                members.m_accumulator = ((0) | 0);
                members.m_adpcm_step = ((127) | 0);
                method_set_reset_status(runtime, 1);
                /* debug::log_keyon: no effect */
                if ((((members.m_regs.repeat?.() ?? 0)) ? 0 : 1)) {
                    method_set_reset_status(runtime, 0, 16);
                }
            }
        }
        if ((((((Number((((members.m_status ?? 0)) & (16))) !== Number(0)) ? 1 : 0)) && (((((members.m_nibbles ?? 0)) < (3)) ? 1 : 0))) ? 1 : 0)) {
            if (method_request_data(runtime)) {
                method_consume_nibbles(runtime, 3);
                if ((members.m_regs.repeat?.() ?? 0)) {
                    method_latch_addresses(runtime);
                }
            }
        }
    }
    function __add_clock(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_set_reset_status(runtime, set, reset = 0) {
        const members = runtime.members;
        members.m_status = (((((((members.m_status ?? 0)) & ((~reset)))) | (set))) >>> 0);
    }
    function method_consume_nibbles(runtime, count) {
        const members = runtime.members;
        count = ((count) & 0xff);
        let result = (((((members.m_buffer ?? 0)) >>> (((32) - (((4) * (count))))))) >>> 0);
        members.m_buffer = ((((members.m_buffer) << (((4) * (count))))) >>> 0);
        members.m_nibbles = ((((((((members.m_nibbles ?? 0)) > (count)) ? 1 : 0)) ? ((((members.m_nibbles ?? 0)) - (count))) : (0))) >>> 0);
        return ((result) >>> 0);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
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
    function method_request_data(runtime) {
        const members = runtime.members;
        if (((Number((members.m_curaddress ?? 0)) === Number(4294967295)) ? 1 : 0)) {
            method_latch_addresses(runtime);
        }
        if ((((members.m_regs.external?.() ?? 0)) ? 0 : 1)) {
            if (((Number((((members.m_status ?? 0)) & (2))) === Number(0)) ? 1 : 0)) {
                method_append_buffer_byte(runtime, (members.m_regs.cpudata?.() ?? 0));
            }
            method_set_reset_status(runtime, 2);
            return 0;
        }
        let data = (((__deref_request_data(runtime, (members.m_owner.intf?.() ?? 0)).ymfm_external_read?.(2, (members.m_curaddress ?? 0)) ?? 0)) & 0xff);
        method_append_buffer_byte(runtime, data);
        (members.m_regs.write?.(8, data) ?? 0);
        return method_advance_address(runtime);
    }
    function __deref_request_data(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_latch_addresses(runtime) {
        const members = runtime.members;
        members.m_curaddress = (((((members.m_regs.external?.() ?? 0)) ? ((((members.m_regs.start?.() ?? 0)) << (method_address_shift(runtime)))) : (0))) >>> 0);
    }
    function method_address_shift(runtime) {
        const members = runtime.members;
        if (((Number((members.m_address_shift ?? 0)) !== Number(0)) ? 1 : 0)) {
            return (((members.m_address_shift ?? 0)) >>> 0);
        }
        if ((members.m_regs.rom_ram?.() ?? 0)) {
            return ((5) >>> 0);
        }
        if ((members.m_regs.dram_8bit?.() ?? 0)) {
            return ((5) >>> 0);
        }
        return ((2) >>> 0);
    }
    function method_append_buffer_byte(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_buffer = ((((members.m_buffer) | (((data) << (((24) - (((4) * ((members.m_nibbles ?? 0)))))))))) >>> 0);
        members.m_nibbles = ((((members.m_nibbles) + (2))) >>> 0);
    }
    function method_advance_address(runtime) {
        const members = runtime.members;
        let shift = method_address_shift(runtime);
        let mask = ((((1) << (shift))) - (1));
        if (((Number((((members.m_curaddress ?? 0)) & (mask))) === Number(mask)) ? 1 : 0)) {
            let unitaddr = (((((members.m_curaddress ?? 0)) >>> (shift))) >>> 0);
            if ((runtime.same(unitaddr, (members.m_regs.end?.() ?? 0)) ? 1 : 0)) {
                return 1;
            }
            else {
                if (((Number(unitaddr) === Number((members.m_regs.limit?.() ?? 0))) ? 1 : 0)) {
                    members.m_curaddress = ((0) >>> 0);
                    return 0;
                }
            }
        }
        members.m_curaddress = (((((((members.m_curaddress ?? 0)) + (1))) & (16777215))) >>> 0);
        return 0;
    }
    function method_output_1(runtime, output, rshift) {
        const members = runtime.members;
        if (0) {
            return;
        }
        let result = ((runtime.shiftRight(__add_output_1(runtime, (((members.m_prev_output ?? 0)) * (((__add_output_1(runtime, (((members.m_position ?? 0)) ^ (65535)), 1)) | 0))), (((members.m_output ?? 0)) * ((((members.m_position ?? 0)) | 0)))), 16)) | 0);
        result = ((runtime.shiftRight(((result) * ((((members.m_regs.level?.() ?? 0)) | 0))), ((8) + (rshift)))) | 0);
        if (1) {
            runtime.writeIndex(output.data, 0, ((runtime.readIndex(output.data, 0)) + (result)));
        }
    }
    function __add_output_1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_output_2(runtime, output, rshift) {
        const members = runtime.members;
        if (0) {
            return;
        }
        let result = ((runtime.shiftRight(__add_output_2(runtime, (((members.m_prev_output ?? 0)) * (((__add_output_2(runtime, (((members.m_position ?? 0)) ^ (65535)), 1)) | 0))), (((members.m_output ?? 0)) * ((((members.m_position ?? 0)) | 0)))), 16)) | 0);
        result = ((runtime.shiftRight(((result) * ((((members.m_regs.level?.() ?? 0)) | 0))), ((8) + (rshift)))) | 0);
        if ((((0) || ((members.m_regs.pan_left?.() ?? 0))) ? 1 : 0)) {
            runtime.writeIndex(output.data, 0, ((runtime.readIndex(output.data, 0)) + (result)));
        }
        if ((((1) && ((members.m_regs.pan_right?.() ?? 0))) ? 1 : 0)) {
            runtime.writeIndex(output.data, 1, ((runtime.readIndex(output.data, 1)) + (result)));
        }
    }
    function __add_output_2(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_read(runtime, regnum) {
        const members = runtime.members;
        let result = ((0) & 0xff);
        if (((((((((((((regnum) === (8)) ? 1 : 0)) && ((((members.m_regs.execute?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((((members.m_regs.record?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((members.m_regs.external?.() ?? 0))) ? 1 : 0)) {
            result = ((method_read_ram(runtime)) & 0xff);
        }
        return ((result) & 0xff);
    }
    function method_read_ram(runtime) {
        const members = runtime.members;
        if (((Number((members.m_curaddress ?? 0)) === Number(4294967295)) ? 1 : 0)) {
            method_set_reset_status(runtime, 0, 8);
            while (((((members.m_nibbles ?? 0)) < (4)) ? 1 : 0)) {
                method_append_buffer_byte(runtime, (members.m_regs.cpudata?.() ?? 0));
            }
        }
        let result = ((method_consume_nibbles(runtime, 2)) & 0xff);
        method_set_reset_status(runtime, 2);
        if (((Number((((members.m_status ?? 0)) & (8))) !== Number(0)) ? 1 : 0)) {
            if (((((members.m_nibbles ?? 0)) === (0)) ? 1 : 0)) {
                method_set_reset_status(runtime, 1, 8);
                if ((members.m_regs.repeat?.() ?? 0)) {
                    method_append_buffer_byte(runtime, (members.m_regs.cpudata?.() ?? 0));
                    members.m_curaddress = (((((members.m_regs.start?.() ?? 0)) << (method_address_shift(runtime)))) >>> 0);
                    method_request_data(runtime);
                }
                else {
                    members.m_curaddress = ((4294967295) >>> 0);
                }
            }
        }
        else {
            if (method_request_data(runtime)) {
                method_set_reset_status(runtime, 8);
            }
        }
        return ((result) & 0xff);
    }
    function method_write(runtime, regnum, value) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["debug::log_keyon"];
        value = ((value) & 0xff);
        if ((((regnum) === (0)) ? 1 : 0)) {
            if ((members.m_regs.resetflag?.() ?? 0)) {
                method_set_reset_status(runtime, ((2) | (((((Number((((members.m_status ?? 0)) & (16))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))), 16);
            }
            else {
                method_set_reset_status(runtime, 2, 60);
                members.m_curaddress = ((4294967295) >>> 0);
                if ((members.m_regs.execute?.() ?? 0)) {
                    members.m_buffer = ((0) >>> 0);
                    members.m_nibbles = ((0) >>> 0);
                    members.m_position = ((0) >>> 0);
                    members.m_accumulator = ((0) | 0);
                    members.m_adpcm_step = ((127) | 0);
                    members.m_output = ((0) | 0);
                    method_set_reset_status(runtime, 20, 1);
                    if (1) {
                        (__L0 ? __L0("KeyOn ADPCM-B: rep=%d spk=%d pan=%d%d dac=%d 8b=%d rom=%d ext=%d rec=%d start=%04X end=%04X pre=%04X dn=%04X lvl=%02X lim=%04X\n", (members.m_regs.repeat?.() ?? 0), (members.m_regs.speaker?.() ?? 0), (members.m_regs.pan_left?.() ?? 0), (members.m_regs.pan_right?.() ?? 0), (members.m_regs.dac_enable?.() ?? 0), (members.m_regs.dram_8bit?.() ?? 0), (members.m_regs.rom_ram?.() ?? 0), (members.m_regs.external?.() ?? 0), (members.m_regs.record?.() ?? 0), (members.m_regs.start?.() ?? 0), (members.m_regs.end?.() ?? 0), (members.m_regs.prescale?.() ?? 0), (members.m_regs.delta_n?.() ?? 0), (members.m_regs.level?.() ?? 0), (members.m_regs.limit?.() ?? 0)) : runtime.macro("debug::log_keyon", "KeyOn ADPCM-B: rep=%d spk=%d pan=%d%d dac=%d 8b=%d rom=%d ext=%d rec=%d start=%04X end=%04X pre=%04X dn=%04X lvl=%02X lim=%04X\n", (members.m_regs.repeat?.() ?? 0), (members.m_regs.speaker?.() ?? 0), (members.m_regs.pan_left?.() ?? 0), (members.m_regs.pan_right?.() ?? 0), (members.m_regs.dac_enable?.() ?? 0), (members.m_regs.dram_8bit?.() ?? 0), (members.m_regs.rom_ram?.() ?? 0), (members.m_regs.external?.() ?? 0), (members.m_regs.record?.() ?? 0), (members.m_regs.start?.() ?? 0), (members.m_regs.end?.() ?? 0), (members.m_regs.prescale?.() ?? 0), (members.m_regs.delta_n?.() ?? 0), (members.m_regs.level?.() ?? 0), (members.m_regs.limit?.() ?? 0)));
                    }
                }
            }
        }
        else {
            if ((((regnum) === (8)) ? 1 : 0)) {
                if ((members.m_regs.execute?.() ?? 0)) {
                    if (((((((members.m_regs.record?.() ?? 0)) ? 0 : 1)) && ((((members.m_regs.external?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        method_set_reset_status(runtime, 0, 2);
                    }
                }
                else {
                    if (((((members.m_regs.external?.() ?? 0)) && ((members.m_regs.record?.() ?? 0))) ? 1 : 0)) {
                        method_write_ram(runtime, value);
                    }
                    else {
                        method_read_ram(runtime);
                    }
                }
            }
        }
    }
    function method_write_ram(runtime, value) {
        const members = runtime.members;
        value = ((value) & 0xff);
        if (((Number((((members.m_status ?? 0)) & (32))) === Number(0)) ? 1 : 0)) {
            if (((Number((members.m_curaddress ?? 0)) === Number(4294967295)) ? 1 : 0)) {
                method_latch_addresses(runtime);
            }
            (__deref_write_ram(runtime, (members.m_owner.intf?.() ?? 0)).ymfm_external_write?.(2, (members.m_curaddress ?? 0), value) ?? 0);
            method_set_reset_status(runtime, 2);
            if (method_advance_address(runtime)) {
                method_set_reset_status(runtime, 1);
                members.m_curaddress = ((4294967295) >>> 0);
                if ((members.m_regs.repeat?.() ?? 0)) {
                    method_set_reset_status(runtime, 32);
                }
            }
        }
        if (((Number((((members.m_status ?? 0)) & (32))) !== Number(0)) ? 1 : 0)) {
            members.m_buffer = ((((value) << (16))) >>> 0);
            members.m_nibbles = ((4) >>> 0);
            method_read_ram(runtime);
        }
    }
    function __deref_write_ram(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        return (((((members.m_status ?? 0)) & (7))) & 0xff);
    }
    function method_clear_status(runtime, status) {
        const members = runtime.members;
        status = ((status) & 0xff);
        members.m_status = ((((members.m_status) & ((~((status) & (7)))))) >>> 0);
    }
    function method_adpcm_b_channel__status(runtime) {
        const members = runtime.members;
        return (((((members.m_status ?? 0)) & (7))) & 0xff);
    }
    function method_adpcm_b_channel__clear_status(runtime, status) {
        const members = runtime.members;
        status = ((status) & 0xff);
        members.m_status = ((((members.m_status) & ((~((status) & (7)))))) >>> 0);
    }
    function method_adpcm_b_channel__set_reset_status(runtime, set, reset = 0) {
        const members = runtime.members;
        members.m_status = (((((((members.m_status ?? 0)) & ((~reset)))) | (set))) >>> 0);
    }
    function method_adpcm_b_channel__latch_addresses(runtime) {
        const members = runtime.members;
        members.m_curaddress = (((((members.m_regs.external?.() ?? 0)) ? ((((members.m_regs.start?.() ?? 0)) << (method_address_shift(runtime)))) : (0))) >>> 0);
    }
    function method_adpcm_b_channel__append_buffer_byte(runtime, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        members.m_buffer = ((((members.m_buffer) | (((data) << (((24) - (((4) * ((members.m_nibbles ?? 0)))))))))) >>> 0);
        members.m_nibbles = ((((members.m_nibbles) + (2))) >>> 0);
    }
    function method_adpcm_b_channel__consume_nibbles(runtime, count) {
        const members = runtime.members;
        count = ((count) & 0xff);
        let result = (((((members.m_buffer ?? 0)) >>> (((32) - (((4) * (count))))))) >>> 0);
        members.m_buffer = ((((members.m_buffer) << (((4) * (count))))) >>> 0);
        members.m_nibbles = ((((((((members.m_nibbles ?? 0)) > (count)) ? 1 : 0)) ? ((((members.m_nibbles ?? 0)) - (count))) : (0))) >>> 0);
        return ((result) >>> 0);
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
    function method___construct(runtime, owner, addrshift) {
        const members = runtime.members;
        let __t0;
        members.m_address_shift = ((addrshift) >>> 0);
        members.m_status = ((2) >>> 0);
        members.m_buffer = ((0) >>> 0);
        members.m_nibbles = ((0) >>> 0);
        members.m_position = ((0) >>> 0);
        members.m_curaddress = ((0) >>> 0);
        members.m_accumulator = ((0) | 0);
        members.m_output = ((0) | 0);
        members.m_prev_output = ((0) | 0);
        members.m_adpcm_step = ((127) | 0);
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
        "clock": method_clock,
        "set_reset_status": method_set_reset_status,
        "consume_nibbles": method_consume_nibbles,
        "bitfield": method_bitfield,
        "clamp": method_clamp,
        "request_data": method_request_data,
        "latch_addresses": method_latch_addresses,
        "address_shift": method_address_shift,
        "append_buffer_byte": method_append_buffer_byte,
        "advance_address": method_advance_address,
        "output_1": method_output_1,
        "output_2": method_output_2,
        "read": method_read,
        "read_ram": method_read_ram,
        "write": method_write,
        "write_ram": method_write_ram,
        "status": method_status,
        "clear_status": method_clear_status,
        "adpcm_b_channel::status": method_adpcm_b_channel__status,
        "adpcm_b_channel::clear_status": method_adpcm_b_channel__clear_status,
        "adpcm_b_channel::set_reset_status": method_adpcm_b_channel__set_reset_status,
        "adpcm_b_channel::latch_addresses": method_adpcm_b_channel__latch_addresses,
        "adpcm_b_channel::append_buffer_byte": method_adpcm_b_channel__append_buffer_byte,
        "adpcm_b_channel::consume_nibbles": method_adpcm_b_channel__consume_nibbles,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["adpcm_b_engine"].allocations["adpcm_b_channel"].compiledMethodLinks = ["debug::log_keyon"];
definition.allocations["ym2610"].allocations["adpcm_b_engine"].allocations["adpcm_b_channel"].compiledStructMethods = {
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
definition.allocations["ym2610"].allocations["adpcm_b_engine"].compiledStructMethods = {
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
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros
        };
        return __methodTable;
    })(),
};
definition.allocations["ym2610"].allocations["ssg_resampler__ymfm_output__3_2_true"].compiledMethods = (() => {
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
    function method_add_last(runtime, sum0, sum1, sum2, scale = 1) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        sum0.set(((((sum0.get()) + (((h_m_last.data[0]) * (scale))))) | 0));
        sum1.set(((((sum1.get()) + (((h_m_last.data[1]) * (scale))))) | 0));
        sum2.set(((((sum2.get()) + (((h_m_last.data[2]) * (scale))))) | 0));
    }
    function method_clock_and_add(runtime, sum0, sum1, sum2, scale = 1) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        (members.m_ssg.clock?.() ?? 0);
        (members.m_ssg.output?.(h_m_last) ?? 0);
        let __inline0_scale = scale;
        sum0.set(((((sum0.get()) + (((h_m_last.data[0]) * (__inline0_scale))))) | 0));
        sum1.set(((((sum1.get()) + (((h_m_last.data[1]) * (__inline0_scale))))) | 0));
        sum2.set(((((sum2.get()) + (((h_m_last.data[2]) * (__inline0_scale))))) | 0));
    }
    function method_write_to_output(runtime, output, sum0, sum1, sum2, divisor = 1) {
        const members = runtime.members;
        const __pointee_output = __deref_write_to_output(runtime, output);
        if (1) {
            __pointee_output.data[2] = runtime.divide(((((((sum0) + (sum1))) + (sum2))) * (2)), ((3) * (divisor)));
        }
        members.m_sampindex = ((((members.m_sampindex) + (1))) >>> 0);
    }
    function __deref_write_to_output(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ssg_resampler(runtime, ssg) {
        const members = runtime.members;
        let __t0;
        (__t0 = __deref_ssg_resampler(runtime, members.m_last), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_last, "clear"));
    }
    function __deref_ssg_resampler(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_save_restore(runtime, state) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        (__deref_save_restore(runtime, state).save_restore?.((members.m_sampindex ?? 0)) ?? 0);
        (__deref_save_restore(runtime, state).save_restore?.(h_m_last.data) ?? 0);
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
    function method_configure(runtime, outsamples, srcsamples) {
        const members = runtime.members;
        outsamples = ((outsamples) & 0xff);
        srcsamples = ((srcsamples) & 0xff);
        switch (((((outsamples) * (10))) + (srcsamples))) {
            case 41:
                {
                    members.m_resampler = "resample_n_1_4";
                    break;
                }
            case 21:
                {
                    members.m_resampler = "resample_n_1_2";
                    break;
                }
            case 43:
                {
                    members.m_resampler = "resample_4_3";
                    break;
                }
            case 11:
                {
                    members.m_resampler = "resample_n_1_1";
                    break;
                }
            case 23:
                {
                    members.m_resampler = "resample_2_3";
                    break;
                }
            case 13:
                {
                    members.m_resampler = "resample_1_n_3";
                    break;
                }
            case 29:
                {
                    members.m_resampler = "resample_2_9";
                    break;
                }
            case 16:
                {
                    members.m_resampler = "resample_1_n_6";
                    break;
                }
            case 0:
                {
                    members.m_resampler = "resample_nop";
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    function method_resample_n_1_4(runtime, output, numsamples) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_n_1_4(runtime, output, 1)) {
            if (((Number((((members.m_sampindex ?? 0)) % (4))) === Number(0)) ? 1 : 0)) {
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
            }
            method_write_to_output(runtime, output, h_m_last.data[0], h_m_last.data[1], h_m_last.data[2]);
        }
    }
    function __add_resample_n_1_4(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_n_1_2(runtime, output, numsamples) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_n_1_2(runtime, output, 1)) {
            if (((Number((((members.m_sampindex ?? 0)) % (2))) === Number(0)) ? 1 : 0)) {
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
            }
            method_write_to_output(runtime, output, h_m_last.data[0], h_m_last.data[1], h_m_last.data[2]);
        }
    }
    function __add_resample_n_1_2(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_n_1_1(runtime, output, numsamples) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_n_1_1(runtime, output, 1)) {
            if (((Number((((members.m_sampindex ?? 0)) % (1))) === Number(0)) ? 1 : 0)) {
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
            }
            method_write_to_output(runtime, output, h_m_last.data[0], h_m_last.data[1], h_m_last.data[2]);
        }
    }
    function __add_resample_n_1_1(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_1_n_3(runtime, output, numsamples) {
        const members = runtime.members;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_1_n_3(runtime, output, 1)) {
            let sum0 = ((0) | 0);
            let sum1 = ((0) | 0);
            let sum2 = ((0) | 0);
            for (let rep = ((0) | 0); (((rep) < (3)) ? 1 : 0); rep = ((((rep) + (1))) | 0)) {
                method_clock_and_add(runtime, ({ generatedLValue: true, get: () => sum0, set: (value) => { sum0 = ((value) | 0); } }), ({ generatedLValue: true, get: () => sum1, set: (value) => { sum1 = ((value) | 0); } }), ({ generatedLValue: true, get: () => sum2, set: (value) => { sum2 = ((value) | 0); } }));
            }
            method_write_to_output(runtime, output, sum0, sum1, sum2, 3);
        }
    }
    function __add_resample_1_n_3(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_1_n_6(runtime, output, numsamples) {
        const members = runtime.members;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_1_n_6(runtime, output, 1)) {
            let sum0 = ((0) | 0);
            let sum1 = ((0) | 0);
            let sum2 = ((0) | 0);
            for (let rep = ((0) | 0); (((rep) < (6)) ? 1 : 0); rep = ((((rep) + (1))) | 0)) {
                method_clock_and_add(runtime, ({ generatedLValue: true, get: () => sum0, set: (value) => { sum0 = ((value) | 0); } }), ({ generatedLValue: true, get: () => sum1, set: (value) => { sum1 = ((value) | 0); } }), ({ generatedLValue: true, get: () => sum2, set: (value) => { sum2 = ((value) | 0); } }));
            }
            method_write_to_output(runtime, output, sum0, sum1, sum2, 6);
        }
    }
    function __add_resample_1_n_6(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_2_9(runtime, output, numsamples) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_2_9(runtime, output, 1)) {
            let sum0 = ((0) | 0);
            let sum1 = ((0) | 0);
            let sum2 = ((0) | 0);
            if (((Number(method_bitfield(runtime, (members.m_sampindex ?? 0), 0)) !== Number(0)) ? 1 : 0)) {
                let __inline1_scale = 1;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline1_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline1_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline1_scale))))) | 0);
            }
            let __inline2_scale = 2;
            (members.m_ssg.clock?.() ?? 0);
            (members.m_ssg.output?.(h_m_last) ?? 0);
            let __inline2___inline0_scale = __inline2_scale;
            sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline2___inline0_scale))))) | 0);
            sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline2___inline0_scale))))) | 0);
            sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline2___inline0_scale))))) | 0);
            let __inline3_scale = 2;
            (members.m_ssg.clock?.() ?? 0);
            (members.m_ssg.output?.(h_m_last) ?? 0);
            let __inline3___inline0_scale = __inline3_scale;
            sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline3___inline0_scale))))) | 0);
            sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline3___inline0_scale))))) | 0);
            sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline3___inline0_scale))))) | 0);
            let __inline4_scale = 2;
            (members.m_ssg.clock?.() ?? 0);
            (members.m_ssg.output?.(h_m_last) ?? 0);
            let __inline4___inline0_scale = __inline4_scale;
            sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline4___inline0_scale))))) | 0);
            sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline4___inline0_scale))))) | 0);
            sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline4___inline0_scale))))) | 0);
            let __inline5_scale = 2;
            (members.m_ssg.clock?.() ?? 0);
            (members.m_ssg.output?.(h_m_last) ?? 0);
            let __inline5___inline0_scale = __inline5_scale;
            sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline5___inline0_scale))))) | 0);
            sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline5___inline0_scale))))) | 0);
            sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline5___inline0_scale))))) | 0);
            if (((Number(method_bitfield(runtime, (members.m_sampindex ?? 0), 0)) === Number(0)) ? 1 : 0)) {
                let __inline6_scale = 1;
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
                let __inline6___inline0_scale = __inline6_scale;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline6___inline0_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline6___inline0_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline6___inline0_scale))))) | 0);
            }
            method_write_to_output(runtime, output, sum0, sum1, sum2, 9);
        }
    }
    function __add_resample_2_9(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_bitfield(runtime, value, start, length = 1) {
        const members = runtime.members;
        return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
    }
    function method_resample_2_3(runtime, output, numsamples) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_2_3(runtime, output, 1)) {
            let sum0 = ((0) | 0);
            let sum1 = ((0) | 0);
            let sum2 = ((0) | 0);
            if (((Number(method_bitfield(runtime, (members.m_sampindex ?? 0), 0)) === Number(0)) ? 1 : 0)) {
                let __inline7_scale = 2;
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
                let __inline7___inline0_scale = __inline7_scale;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline7___inline0_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline7___inline0_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline7___inline0_scale))))) | 0);
                let __inline8_scale = 1;
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
                let __inline8___inline0_scale = __inline8_scale;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline8___inline0_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline8___inline0_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline8___inline0_scale))))) | 0);
            }
            else {
                let __inline9_scale = 1;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline9_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline9_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline9_scale))))) | 0);
                let __inline10_scale = 2;
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
                let __inline10___inline0_scale = __inline10_scale;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline10___inline0_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline10___inline0_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline10___inline0_scale))))) | 0);
            }
            method_write_to_output(runtime, output, sum0, sum1, sum2, 3);
        }
    }
    function __add_resample_2_3(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_4_3(runtime, output, numsamples) {
        const members = runtime.members;
        const h_m_last = members.m_last ?? 0;
        for (let samp = ((0) >>> 0); (((samp) < (numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = __add_resample_4_3(runtime, output, 1)) {
            let sum0 = ((0) | 0);
            let sum1 = ((0) | 0);
            let sum2 = ((0) | 0);
            let step = ((method_bitfield(runtime, (members.m_sampindex ?? 0), 0, 2)) | 0);
            let __inline11_scale = step;
            sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline11_scale))))) | 0);
            sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline11_scale))))) | 0);
            sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline11_scale))))) | 0);
            if ((((step) !== (3)) ? 1 : 0)) {
                let __inline12_scale = ((3) - (step));
                (members.m_ssg.clock?.() ?? 0);
                (members.m_ssg.output?.(h_m_last) ?? 0);
                let __inline12___inline0_scale = __inline12_scale;
                sum0 = ((((sum0) + (((h_m_last.data[0]) * (__inline12___inline0_scale))))) | 0);
                sum1 = ((((sum1) + (((h_m_last.data[1]) * (__inline12___inline0_scale))))) | 0);
                sum2 = ((((sum2) + (((h_m_last.data[2]) * (__inline12___inline0_scale))))) | 0);
            }
            method_write_to_output(runtime, output, sum0, sum1, sum2, 3);
        }
    }
    function __add_resample_4_3(runtime, a, b) {
        if (typeof a === 'number' && typeof b === 'number')
            return a + b;
        if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
            return { generatedPointer: true, source: a.source, offset: a.offset + b };
        }
        return runtime.add(a, b);
    }
    function method_resample_nop(runtime, output, numsamples) {
        const members = runtime.members;
        const __pointee_output = __deref_resample_nop(runtime, output);
        members.m_sampindex = ((((members.m_sampindex) + (numsamples))) >>> 0);
    }
    function __deref_resample_nop(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_sampindex(runtime) {
        const members = runtime.members;
        return (((members.m_sampindex ?? 0)) >>> 0);
    }
    function method_resample(runtime, output, numsamples) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"];
        const __pointee_output = __deref_resample(runtime, output);
        ((__method) => __method ? __method(runtime, output, numsamples) : (__L0 ? __L0((members.m_resampler ?? 0), output, numsamples) : runtime.macro("CALL_METHOD", (members.m_resampler ?? 0), output, numsamples)))(__methodTable[(members.m_resampler ?? 0)]);
    }
    function __deref_resample(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_ssg_resampler__sampindex(runtime) {
        const members = runtime.members;
        return (((members.m_sampindex ?? 0)) >>> 0);
    }
    function method_ssg_resampler__resample(runtime, output, numsamples) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["CALL_METHOD"];
        const __pointee_output = __deref_ssg_resampler__resample(runtime, output);
        ((__method) => __method ? __method(runtime, output, numsamples) : (__L0 ? __L0((members.m_resampler ?? 0), output, numsamples) : runtime.macro("CALL_METHOD", (members.m_resampler ?? 0), output, numsamples)))(__methodTable[(members.m_resampler ?? 0)]);
    }
    function __deref_ssg_resampler__resample(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
    function method___construct(runtime, ssg) {
        const members = runtime.members;
        let __t0;
        members.m_ssg = ssg;
        members.m_sampindex = ((0) >>> 0);
        members.m_resampler = "resample_nop";
        (__t0 = __deref___construct(runtime, members.m_last), typeof __t0.clear === 'function' ? __t0.clear() : typeof __t0.clear === 'number' || typeof __t0.clear === 'boolean' ? __t0.clear : runtime.container(members.m_last, "clear"));
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
        "write_to_output": method_write_to_output,
        "ssg_resampler": method_ssg_resampler,
        "save_restore": method_save_restore,
        "configure": method_configure,
        "resample_n_1_4": method_resample_n_1_4,
        "resample_n_1_2": method_resample_n_1_2,
        "resample_n_1_1": method_resample_n_1_1,
        "resample_1_n_3": method_resample_1_n_3,
        "resample_1_n_6": method_resample_1_n_6,
        "resample_2_9": method_resample_2_9,
        "bitfield": method_bitfield,
        "resample_2_3": method_resample_2_3,
        "resample_4_3": method_resample_4_3,
        "resample_nop": method_resample_nop,
        "sampindex": method_sampindex,
        "resample": method_resample,
        "ssg_resampler::sampindex": method_ssg_resampler__sampindex,
        "ssg_resampler::resample": method_ssg_resampler__resample,
        "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
        "count_leading_zeros": method_count_leading_zeros,
        "clamp": method_clamp,
        "roundtrip_fp": method_roundtrip_fp,
        "__construct": method___construct
    };
    return __methodTable;
})();
definition.allocations["ym2610"].allocations["ssg_resampler__ymfm_output__3_2_true"].compiledMethodLinks = ["CALL_METHOD"];
definition.allocations["ym2610"].allocations["ssg_resampler__ymfm_output__3_2_true"].compiledStructMethods = {
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
    "ymfm_output__3": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
definition.allocations["ym2610"].compiledStructMethods = {
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
        function method_ssg_effective_clock(runtime, input_clock) {
            const members = runtime.members;
            return ((runtime.divide(input_clock, 4)) >>> 0);
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            let result = ((0) & 0xff);
            switch (((offset) & (3))) {
                case 0:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
                        break;
                    }
                case 1:
                    {
                        result = ((runtime.invoke("read_data")) & 0xff);
                        break;
                    }
                case 2:
                    {
                        result = ((runtime.invoke("read_status_hi")) & 0xff);
                        break;
                    }
                case 3:
                    {
                        result = ((method_read_data_hi(runtime)) & 0xff);
                        break;
                    }
            }
            return ((result) & 0xff);
        }
        function method_read_data_hi(runtime) {
            const members = runtime.members;
            let result = ((0) & 0xff);
            return ((result) & 0xff);
        }
        function method_write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (3))) {
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
                case 2:
                    {
                        runtime.invoke("write_address_hi", data);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("write_data_hi", data);
                        break;
                    }
            }
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_ym2610__ssg_effective_clock(runtime, input_clock) {
            const members = runtime.members;
            return ((runtime.divide(input_clock, 4)) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clamp": method_clamp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "ssg_effective_clock": method_ssg_effective_clock,
            "read": method_read,
            "read_data_hi": method_read_data_hi,
            "write": method_write,
            "bitfield": method_bitfield,
            "ym2610::ssg_effective_clock": method_ym2610__ssg_effective_clock
        };
        return __methodTable;
    })(),
    "ymfm_output__3": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (members.data ?? 0)[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (members.data ?? 0)[index] = method_clamp(runtime, (members.data ?? 0)[index], -32768, 32767);
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (members.data ?? 0)[index] = method_ymfm__roundtrip_fp(runtime, (members.data ?? 0)[index]);
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
        function method_ssg_effective_clock(runtime, input_clock) {
            const members = runtime.members;
            return ((runtime.divide(input_clock, 4)) >>> 0);
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            let result = ((0) & 0xff);
            switch (((offset) & (3))) {
                case 0:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
                        break;
                    }
                case 1:
                    {
                        result = ((runtime.invoke("read_data")) & 0xff);
                        break;
                    }
                case 2:
                    {
                        result = ((runtime.invoke("read_status_hi")) & 0xff);
                        break;
                    }
                case 3:
                    {
                        result = ((method_read_data_hi(runtime)) & 0xff);
                        break;
                    }
            }
            return ((result) & 0xff);
        }
        function method_read_data_hi(runtime) {
            const members = runtime.members;
            let result = ((0) & 0xff);
            return ((result) & 0xff);
        }
        function method_write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (3))) {
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
                case 2:
                    {
                        runtime.invoke("write_address_hi", data);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("write_data_hi", data);
                        break;
                    }
            }
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_ym2610__ssg_effective_clock(runtime, input_clock) {
            const members = runtime.members;
            return ((runtime.divide(input_clock, 4)) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "ssg_effective_clock": method_ssg_effective_clock,
            "read": method_read,
            "read_data_hi": method_read_data_hi,
            "write": method_write,
            "bitfield": method_bitfield,
            "ym2610::ssg_effective_clock": method_ym2610__ssg_effective_clock
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (members.data ?? 0)[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (members.data ?? 0)[index] = method_clamp(runtime, (members.data ?? 0)[index], -32768, 32767);
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
            for (let index = ((0) >>> 0); (((index) < (2)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                (members.data ?? 0)[index] = method_ymfm__roundtrip_fp(runtime, (members.data ?? 0)[index]);
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
        function method_ssg_effective_clock(runtime, input_clock) {
            const members = runtime.members;
            return ((runtime.divide(input_clock, 4)) >>> 0);
        }
        function method_read(runtime, offset) {
            const members = runtime.members;
            let result = ((0) & 0xff);
            switch (((offset) & (3))) {
                case 0:
                    {
                        result = ((runtime.invoke("read_status")) & 0xff);
                        break;
                    }
                case 1:
                    {
                        result = ((runtime.invoke("read_data")) & 0xff);
                        break;
                    }
                case 2:
                    {
                        result = ((runtime.invoke("read_status_hi")) & 0xff);
                        break;
                    }
                case 3:
                    {
                        result = ((method_read_data_hi(runtime)) & 0xff);
                        break;
                    }
            }
            return ((result) & 0xff);
        }
        function method_read_data_hi(runtime) {
            const members = runtime.members;
            let result = ((0) & 0xff);
            return ((result) & 0xff);
        }
        function method_write(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            switch (((offset) & (3))) {
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
                case 2:
                    {
                        runtime.invoke("write_address_hi", data);
                        break;
                    }
                case 3:
                    {
                        runtime.invoke("write_data_hi", data);
                        break;
                    }
            }
        }
        function method_bitfield(runtime, value, start, length = 1) {
            const members = runtime.members;
            return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
        }
        function method_ym2610__ssg_effective_clock(runtime, input_clock) {
            const members = runtime.members;
            return ((runtime.divide(input_clock, 4)) >>> 0);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "clear": method_clear,
            "clamp16": method_clamp16,
            "clamp": method_clamp,
            "roundtrip_fp": method_roundtrip_fp,
            "ymfm::roundtrip_fp": method_ymfm__roundtrip_fp,
            "count_leading_zeros": method_count_leading_zeros,
            "ssg_effective_clock": method_ssg_effective_clock,
            "read": method_read,
            "read_data_hi": method_read_data_hi,
            "write": method_write,
            "bitfield": method_bitfield,
            "ym2610::ssg_effective_clock": method_ym2610__ssg_effective_clock
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
            runtime.invoke("ymfm_device_base::update_internal", stream, 1);
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
        function method_data_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_data_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data === 'function' ? (__t0.read_data() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data"))) & 0xff);
        }
        function __deref_data_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_status_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_status_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status_hi === 'function' ? (__t0.read_status_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status_hi"))) & 0xff);
        }
        function __deref_status_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_data_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_data_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data_hi === 'function' ? (__t0.read_data_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data_hi"))) & 0xff);
        }
        function __deref_data_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_ym2610_device_base__data_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ym2610_device_base__data_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data === 'function' ? (__t0.read_data() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data"))) & 0xff);
        }
        function __deref_ym2610_device_base__data_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_ym2610_device_base__status_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ym2610_device_base__status_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status_hi === 'function' ? (__t0.read_status_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status_hi"))) & 0xff);
        }
        function __deref_ym2610_device_base__status_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_ym2610_device_base__data_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ym2610_device_base__data_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data_hi === 'function' ? (__t0.read_data_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data_hi"))) & 0xff);
        }
        function __deref_ym2610_device_base__data_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
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
            "ymfm_device_base::write": method_ymfm_device_base__write,
            "data_r": method_data_r,
            "status_hi_r": method_status_hi_r,
            "data_hi_r": method_data_hi_r,
            "ym2610_device_base::data_r": method_ym2610_device_base__data_r,
            "ym2610_device_base::status_hi_r": method_ym2610_device_base__status_hi_r,
            "ym2610_device_base::data_hi_r": method_ym2610_device_base__data_hi_r
        };
        return __methodTable;
    })(),
    "ymfm_output__3": (() => {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
                h_data[index] = 0;
            }
            return (members.this ?? 0);
        }
        function method_clamp16(runtime) {
            const members = runtime.members;
            const h_data = members.data ?? 0;
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            for (let index = ((0) >>> 0); (((index) < (3)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
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
            runtime.invoke("ymfm_device_base::update_internal", stream, 1);
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
        function method_data_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_data_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data === 'function' ? (__t0.read_data() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data"))) & 0xff);
        }
        function __deref_data_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_status_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_status_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status_hi === 'function' ? (__t0.read_status_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status_hi"))) & 0xff);
        }
        function __deref_status_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_data_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_data_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data_hi === 'function' ? (__t0.read_data_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data_hi"))) & 0xff);
        }
        function __deref_data_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_ym2610_device_base__data_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ym2610_device_base__data_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data === 'function' ? (__t0.read_data() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data"))) & 0xff);
        }
        function __deref_ym2610_device_base__data_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_ym2610_device_base__status_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ym2610_device_base__status_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_status_hi === 'function' ? (__t0.read_status_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_status_hi"))) & 0xff);
        }
        function __deref_ym2610_device_base__status_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
                            return read;
                    }
                }
                else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                    return p;
                }
            }
            return runtime.dereference(p);
        }
        function method_ym2610_device_base__data_hi_r(runtime) {
            const members = runtime.members;
            let __t0;
            return (((__t0 = __deref_ym2610_device_base__data_hi_r(runtime, runtime.invoke("update_streams")), typeof __t0.read_data_hi === 'function' ? (__t0.read_data_hi() ?? 0) : runtime.container(runtime.invoke("update_streams"), "read_data_hi"))) & 0xff);
        }
        function __deref_ym2610_device_base__data_hi_r(runtime, p) {
            if (p !== null && typeof p === 'object') {
                if (p.generatedPointer === true) {
                    if (p.target === undefined) {
                        const read = p.source[p.offset];
                        if (read !== undefined && read !== null)
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
            "ymfm_device_base::write": method_ymfm_device_base__write,
            "data_r": method_data_r,
            "status_hi_r": method_status_hi_r,
            "data_hi_r": method_data_hi_r,
            "ym2610_device_base::data_r": method_ym2610_device_base__data_r,
            "ym2610_device_base::status_hi_r": method_ym2610_device_base__status_hi_r,
            "ym2610_device_base::data_hi_r": method_ym2610_device_base__data_hi_r
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
