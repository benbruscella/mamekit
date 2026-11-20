import deviceData from './spectrum_ula_48k.device.ir.json' with { type: 'json' };
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
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"], __L2 = __l["m_screen.width"], __L3 = __l["m_maincpu.clock"], __L4 = __l["m_screen.clock"];
        let __t0;
        method_spectrum_ula_device__device_start(runtime);
        (__L1 ? __L1((__L0 ? __L0((members.m_is_timings_late ?? 0)) : runtime.macro("NAME", (members.m_is_timings_late ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_is_timings_late ?? 0)) : runtime.macro("NAME", (members.m_is_timings_late ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_int_at ?? 0)) : runtime.macro("NAME", (members.m_int_at ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_int_at ?? 0)) : runtime.macro("NAME", (members.m_int_at ?? 0)))));
        (__L1 ? __L1((__L0 ? __L0((members.m_is_m1_rd_contended ?? 0)) : runtime.macro("NAME", (members.m_is_m1_rd_contended ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_is_m1_rd_contended ?? 0)) : runtime.macro("NAME", (members.m_is_m1_rd_contended ?? 0)))));
        members.m_video_line_clocks = runtime.divide((((__L2 ? __L2() : ((members.m_screen)?.width?.() ?? 0))) * ((__L3 ? __L3() : ((members.m_maincpu)?.clock?.() ?? 0)))), (__L4 ? __L4() : ((members.m_screen)?.clock?.() ?? 0)));
        members.m_raster_line_clocks = runtime.divide((((__t0 = __deref_device_start(runtime, members.m_screen_area), typeof __t0.width === 'function' ? __t0.width() : typeof __t0.width === 'number' || typeof __t0.width === 'boolean' ? __t0.width : runtime.container(members.m_screen_area, "width"))) * ((__L3 ? __L3() : ((members.m_maincpu)?.clock?.() ?? 0)))), (__L4 ? __L4() : ((members.m_screen)?.clock?.() ?? 0)));
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
    function method_spectrum_ula_device__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["NAME"], __L1 = __l["save_item"];
        (__L1 ? __L1((__L0 ? __L0((members.m_bank3_page ?? 0)) : runtime.macro("NAME", (members.m_bank3_page ?? 0)))) : runtime.macro("save_item", (__L0 ? __L0((members.m_bank3_page ?? 0)) : runtime.macro("NAME", (members.m_bank3_page ?? 0)))));
    }
    function method_set_z80(runtime, cpu_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_maincpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_maincpu)?.set_tag?.((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
    }
    function method_set_screen(runtime, screen_tag, screen_area) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_screen.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(screen_tag) : runtime.macro("std::forward", screen_tag))) : ((members.m_screen)?.set_tag?.((__L0 ? __L0(screen_tag) : runtime.macro("std::forward", screen_tag))) ?? 0));
        members.m_screen_area = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(screen_area);
    }
    function method_INPUT_CHANGED_MEMBER(runtime, on_contention_changed) {
        const members = runtime.members;
    }
    function method_nomem_rq(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
        if (method_is_contended(runtime, offset)) {
            method_content_early(runtime);
        }
    }
    function method_is_contended(runtime, offset) {
        const members = runtime.members;
        return ((((((offset) >= (16384)) ? 1 : 0)) && ((((offset) < (32768)) ? 1 : 0))) ? 1 : 0);
    }
    function method_content_early(runtime, shift = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_screen.vpos"], __L1 = __l["m_maincpu.total_cycles"], __L2 = __l["m_maincpu.adjust_icount"];
        let __t0, __t1;
        shift = ((shift) << 24 >> 24);
        const h_m_pattern = members.m_pattern ?? 0;
        let vpos = (__L0 ? __L0() : ((members.m_screen)?.vpos?.() ?? 0));
        if ((((runtime.wide("<", vpos, (__t0 = __deref_content_early(runtime, members.m_screen_area), typeof __t0.top === 'function' ? __t0.top() : typeof __t0.top === 'number' || typeof __t0.top === 'boolean' ? __t0.top : runtime.container(members.m_screen_area, "top")))) || (runtime.wide(">", vpos, (__t1 = __deref_content_early(runtime, members.m_screen_area), typeof __t1.bottom === 'function' ? __t1.bottom() : typeof __t1.bottom === 'number' || typeof __t1.bottom === 'boolean' ? __t1.bottom : runtime.container(members.m_screen_area, "bottom"))))) ? 1 : 0)) {
            return;
        }
        let now = runtime.wide("+", runtime.wide("-", (__L1 ? __L1() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (members.m_int_at ?? 0)), ((shift) << 24 >> 24));
        let cf = runtime.wide("+", runtime.wide("*", vpos, (members.m_video_line_clocks ?? 0)), method_get_raster_contention_offset(runtime));
        let ct = runtime.wide("+", cf, (members.m_raster_line_clocks ?? 0));
        if ((((runtime.wide("<=", cf, now)) && (runtime.wide("<", now, ct))) ? 1 : 0)) {
            members.m_is_m1_rd_contended = ((1) ? 1 : 0);
            let clocks = runtime.wide("-", now, cf);
            let c = ((h_m_pattern[runtime.wide("%", clocks, 8)]) & 0xff);
            (__L2 ? __L2((-c)) : ((members.m_maincpu)?.adjust_icount?.((-c)) ?? 0));
        }
    }
    function __deref_content_early(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_get_raster_contention_offset(runtime) {
        const members = runtime.members;
        const h_m_base_offset = members.m_base_offset ?? 0;
        return ((((h_m_base_offset) + ((members.m_is_timings_late ?? 0)))) << 24 >> 24);
    }
    function method_m1(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        members.m_is_m1_rd_contended = ((0) ? 1 : 0);
        if ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
            method_content_early(runtime);
        }
    }
    function method_io_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
            method_content_early(runtime);
            method_content_late(runtime);
        }
    }
    function method_content_late(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_screen.vpos"], __L1 = __l["m_maincpu.total_cycles"], __L2 = __l["m_maincpu.adjust_icount"];
        let __t0, __t1;
        const h_m_pattern = members.m_pattern ?? 0;
        let vpos = (__L0 ? __L0() : ((members.m_screen)?.vpos?.() ?? 0));
        if ((((runtime.wide("<", vpos, (__t0 = __deref_content_late(runtime, members.m_screen_area), typeof __t0.top === 'function' ? __t0.top() : typeof __t0.top === 'number' || typeof __t0.top === 'boolean' ? __t0.top : runtime.container(members.m_screen_area, "top")))) || (runtime.wide(">", vpos, (__t1 = __deref_content_late(runtime, members.m_screen_area), typeof __t1.bottom === 'function' ? __t1.bottom() : typeof __t1.bottom === 'number' || typeof __t1.bottom === 'boolean' ? __t1.bottom : runtime.container(members.m_screen_area, "bottom"))))) ? 1 : 0)) {
            return;
        }
        let now = runtime.wide("+", runtime.wide("-", (__L1 ? __L1() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (members.m_int_at ?? 0)), 1);
        let cf = runtime.wide("+", runtime.wide("*", vpos, (members.m_video_line_clocks ?? 0)), method_get_raster_contention_offset(runtime));
        let ct = runtime.wide("+", cf, (members.m_raster_line_clocks ?? 0));
        for (let i = 4; i; i = runtime.shiftRight(i, 1)) {
            if ((((runtime.wide("<=", cf, now)) && (runtime.wide("<", now, ct))) ? 1 : 0)) {
                let clocks = runtime.wide("-", now, cf);
                let c = ((h_m_pattern[runtime.wide("%", clocks, 8)]) & 0xff);
                (__L2 ? __L2((-c)) : ((members.m_maincpu)?.adjust_icount?.((-c)) ?? 0));
                now = runtime.wide("+", now, c);
            }
            now = runtime.wide("+", now, 1);
        }
    }
    function __deref_content_late(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_io_w(runtime, offset) {
        const members = runtime.members;
        if (method_is_contended(runtime, offset)) {
            method_content_early(runtime);
            method_content_late(runtime);
        }
    }
    function method_data_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
            method_content_early(runtime);
        }
    }
    function method_data_w(runtime, offset) {
        const members = runtime.members;
        if (method_is_contended(runtime, offset)) {
            method_content_early(runtime);
        }
    }
    function method_ula_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
        if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if (method_is_contended(runtime, offset)) {
                method_content_early(runtime);
            }
            method_content_early(runtime, 1);
        }
    }
    function method_ula_w(runtime, offset) {
        const members = runtime.members;
        if (method_is_contended(runtime, offset)) {
            method_content_early(runtime);
        }
        method_content_early(runtime, 1);
    }
    function method_on_irq(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_maincpu.total_cycles"], __L1 = __l["m_maincpu.local_time"], __L2 = __l["machine"], __L3 = __l["machine().time"], __L4 = __l["m_maincpu.attotime_to_cycles"];
        members.m_int_at = runtime.subtract((__L0 ? __L0() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (__L4 ? __L4(runtime.subtract((__L1 ? __L1() : ((members.m_maincpu)?.local_time?.() ?? 0)), ((__L3 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))) : ((members.m_maincpu)?.attotime_to_cycles?.(runtime.subtract((__L1 ? __L1() : ((members.m_maincpu)?.local_time?.() ?? 0)), ((__L3 ?? globalThis.mamekitMissingCall?.("machine().time"))?.() ?? 0))) ?? 0)));
    }
    function method_bank3_pg_w(runtime, bank3_page) {
        const members = runtime.members;
        bank3_page = ((bank3_page) & 0xff);
        members.m_bank3_page = ((bank3_page) & 0xff);
    }
    function method_is_snow_possible(runtime, addr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_screen.hpos"], __L1 = __l["m_screen.vpos"];
        addr = ((addr) & 0xffff);
        return ((((((method_is_contended(runtime, addr)) && ((((members.m_is_m1_rd_contended ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((__deref_is_snow_possible(runtime, members.m_screen_area).contains?.((__L0 ? __L0() : ((members.m_screen)?.hpos?.() ?? 0)), (__L1 ? __L1() : ((members.m_screen)?.vpos?.() ?? 0))) ?? 0))) ? 1 : 0);
    }
    function __deref_is_snow_possible(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_is_in_contended_area(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_screen.vpos"];
        let __t0, __t1;
        let vpos = (__L0 ? __L0() : ((members.m_screen)?.vpos?.() ?? 0));
        return (((runtime.wide(">=", vpos, (__t0 = __deref_is_in_contended_area(runtime, members.m_screen_area), typeof __t0.top === 'function' ? __t0.top() : typeof __t0.top === 'number' || typeof __t0.top === 'boolean' ? __t0.top : runtime.container(members.m_screen_area, "top")))) && (runtime.wide("<=", vpos, (__t1 = __deref_is_in_contended_area(runtime, members.m_screen_area), typeof __t1.bottom === 'function' ? __t1.bottom() : typeof __t1.bottom === 'number' || typeof __t1.bottom === 'boolean' ? __t1.bottom : runtime.container(members.m_screen_area, "bottom"))))) ? 1 : 0);
    }
    function __deref_is_in_contended_area(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_get_video_line_clocks(runtime) {
        const members = runtime.members;
        return (members.m_video_line_clocks ?? 0);
    }
    function method_get_raster_line_clocks(runtime) {
        const members = runtime.members;
        return (members.m_raster_line_clocks ?? 0);
    }
    function method_get_irq_at(runtime) {
        const members = runtime.members;
        return (members.m_int_at ?? 0);
    }
    function method_get_irq_ext_length(runtime) {
        const members = runtime.members;
        return (((members.m_is_timings_late ?? 0)) & 0xff);
    }
    function method_get_border_chunk_size(runtime) {
        const members = runtime.members;
        return ((8) & 0xff);
    }
    function method_get_btime(runtime) {
        const members = runtime.members;
        const h_m_btime = members.m_btime ?? 0;
        return ((h_m_btime) & 0xff);
    }
    function method_get_atime_left(runtime) {
        const members = runtime.members;
        const h_m_atime_left = members.m_atime_left ?? 0;
        return ((h_m_atime_left) & 0xff);
    }
    function method_get_atime_right(runtime) {
        const members = runtime.members;
        const h_m_atime_right = members.m_atime_right ?? 0;
        return ((h_m_atime_right) & 0xff);
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
        members.m_is_m1_rd_contended = ((0) ? 1 : 0);
    }
    function method_spectrum_ula_device__set_z80(runtime, cpu_tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_maincpu.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_maincpu)?.set_tag?.((__L0 ? __L0(cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
    }
    function method_spectrum_ula_device__set_screen(runtime, screen_tag, screen_area) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["std::forward"], __L1 = __l["m_screen.set_tag"];
        (__L1 ? __L1((__L0 ? __L0(screen_tag) : runtime.macro("std::forward", screen_tag))) : ((members.m_screen)?.set_tag?.((__L0 ? __L0(screen_tag) : runtime.macro("std::forward", screen_tag))) ?? 0));
        members.m_screen_area = ((__v) => (__v !== null && typeof __v === 'object' && typeof __v.intersect === 'function') ? Object.assign(Object.create(Object.getPrototypeOf(__v)), __v) : __v)(screen_area);
    }
    function method_spectrum_ula_device__INPUT_CHANGED_MEMBER(runtime, on_contention_changed) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__nomem_rq(runtime, offset, data) {
        const members = runtime.members;
        data = ((data) & 0xff);
    }
    function method_spectrum_ula_device__m1(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__io_r(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__io_w(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__data_r(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__data_w(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__ula_r(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__ula_w(runtime, offset) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__on_irq(runtime) {
        const members = runtime.members;
    }
    function method_spectrum_ula_device__bank3_pg_w(runtime, bank3_page) {
        const members = runtime.members;
        bank3_page = ((bank3_page) & 0xff);
        members.m_bank3_page = ((bank3_page) & 0xff);
    }
    function method_spectrum_ula_device__is_snow_possible(runtime, addr) {
        const members = runtime.members;
        addr = ((addr) & 0xffff);
        return 0;
    }
    function method_spectrum_ula_device__is_in_contended_area(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_spectrum_ula_device__get_video_line_clocks(runtime) {
        const members = runtime.members;
        return -1;
    }
    function method_spectrum_ula_device__get_raster_line_clocks(runtime) {
        const members = runtime.members;
        return -1;
    }
    function method_spectrum_ula_device__get_irq_at(runtime) {
        const members = runtime.members;
        return -1;
    }
    function method_spectrum_ula_device__get_irq_ext_length(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_spectrum_ula_device__get_border_chunk_size(runtime) {
        const members = runtime.members;
        return ((1) & 0xff);
    }
    function method_spectrum_ula_device__get_btime(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_spectrum_ula_device__get_atime_left(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_spectrum_ula_device__get_atime_right(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_spectrum_ula_device__get_raster_contention_offset(runtime) {
        const members = runtime.members;
        return ((0) << 24 >> 24);
    }
    function method_spectrum_ula_device__device_reset(runtime) {
        const members = runtime.members;
    }
    function method_on_contention_changed(runtime, field, param, oldval, newval) {
        const members = runtime.members;
        members.m_is_timings_late = ((((newval) & (1))) ? 1 : 0);
    }
    function method_spectrum_ula_contended_device__get_video_line_clocks(runtime) {
        const members = runtime.members;
        return (members.m_video_line_clocks ?? 0);
    }
    function method_spectrum_ula_contended_device__get_raster_line_clocks(runtime) {
        const members = runtime.members;
        return (members.m_raster_line_clocks ?? 0);
    }
    function method_spectrum_ula_contended_device__get_irq_at(runtime) {
        const members = runtime.members;
        return (members.m_int_at ?? 0);
    }
    function method_spectrum_ula_contended_device__get_irq_ext_length(runtime) {
        const members = runtime.members;
        return (((members.m_is_timings_late ?? 0)) & 0xff);
    }
    function method_spectrum_ula_contended_device__get_border_chunk_size(runtime) {
        const members = runtime.members;
        return ((8) & 0xff);
    }
    function method_spectrum_ula_contended_device__get_btime(runtime) {
        const members = runtime.members;
        const h_m_btime = members.m_btime ?? 0;
        return ((h_m_btime) & 0xff);
    }
    function method_spectrum_ula_contended_device__get_atime_left(runtime) {
        const members = runtime.members;
        const h_m_atime_left = members.m_atime_left ?? 0;
        return ((h_m_atime_left) & 0xff);
    }
    function method_spectrum_ula_contended_device__get_atime_right(runtime) {
        const members = runtime.members;
        const h_m_atime_right = members.m_atime_right ?? 0;
        return ((h_m_atime_right) & 0xff);
    }
    function method_spectrum_ula_contended_device__get_raster_contention_offset(runtime) {
        const members = runtime.members;
        const h_m_base_offset = members.m_base_offset ?? 0;
        return ((((h_m_base_offset) + ((members.m_is_timings_late ?? 0)))) << 24 >> 24);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "device_start": method_device_start,
        "spectrum_ula_device::device_start": method_spectrum_ula_device__device_start,
        "set_z80": method_set_z80,
        "set_screen": method_set_screen,
        "INPUT_CHANGED_MEMBER": method_INPUT_CHANGED_MEMBER,
        "nomem_rq": method_nomem_rq,
        "is_contended": method_is_contended,
        "content_early": method_content_early,
        "get_raster_contention_offset": method_get_raster_contention_offset,
        "m1": method_m1,
        "io_r": method_io_r,
        "content_late": method_content_late,
        "io_w": method_io_w,
        "data_r": method_data_r,
        "data_w": method_data_w,
        "ula_r": method_ula_r,
        "ula_w": method_ula_w,
        "on_irq": method_on_irq,
        "bank3_pg_w": method_bank3_pg_w,
        "is_snow_possible": method_is_snow_possible,
        "is_in_contended_area": method_is_in_contended_area,
        "get_video_line_clocks": method_get_video_line_clocks,
        "get_raster_line_clocks": method_get_raster_line_clocks,
        "get_irq_at": method_get_irq_at,
        "get_irq_ext_length": method_get_irq_ext_length,
        "get_border_chunk_size": method_get_border_chunk_size,
        "get_btime": method_get_btime,
        "get_atime_left": method_get_atime_left,
        "get_atime_right": method_get_atime_right,
        "device_reset": method_device_reset,
        "spectrum_ula_device::set_z80": method_spectrum_ula_device__set_z80,
        "spectrum_ula_device::set_screen": method_spectrum_ula_device__set_screen,
        "spectrum_ula_device::INPUT_CHANGED_MEMBER": method_spectrum_ula_device__INPUT_CHANGED_MEMBER,
        "spectrum_ula_device::nomem_rq": method_spectrum_ula_device__nomem_rq,
        "spectrum_ula_device::m1": method_spectrum_ula_device__m1,
        "spectrum_ula_device::io_r": method_spectrum_ula_device__io_r,
        "spectrum_ula_device::io_w": method_spectrum_ula_device__io_w,
        "spectrum_ula_device::data_r": method_spectrum_ula_device__data_r,
        "spectrum_ula_device::data_w": method_spectrum_ula_device__data_w,
        "spectrum_ula_device::ula_r": method_spectrum_ula_device__ula_r,
        "spectrum_ula_device::ula_w": method_spectrum_ula_device__ula_w,
        "spectrum_ula_device::on_irq": method_spectrum_ula_device__on_irq,
        "spectrum_ula_device::bank3_pg_w": method_spectrum_ula_device__bank3_pg_w,
        "spectrum_ula_device::is_snow_possible": method_spectrum_ula_device__is_snow_possible,
        "spectrum_ula_device::is_in_contended_area": method_spectrum_ula_device__is_in_contended_area,
        "spectrum_ula_device::get_video_line_clocks": method_spectrum_ula_device__get_video_line_clocks,
        "spectrum_ula_device::get_raster_line_clocks": method_spectrum_ula_device__get_raster_line_clocks,
        "spectrum_ula_device::get_irq_at": method_spectrum_ula_device__get_irq_at,
        "spectrum_ula_device::get_irq_ext_length": method_spectrum_ula_device__get_irq_ext_length,
        "spectrum_ula_device::get_border_chunk_size": method_spectrum_ula_device__get_border_chunk_size,
        "spectrum_ula_device::get_btime": method_spectrum_ula_device__get_btime,
        "spectrum_ula_device::get_atime_left": method_spectrum_ula_device__get_atime_left,
        "spectrum_ula_device::get_atime_right": method_spectrum_ula_device__get_atime_right,
        "spectrum_ula_device::get_raster_contention_offset": method_spectrum_ula_device__get_raster_contention_offset,
        "spectrum_ula_device::device_reset": method_spectrum_ula_device__device_reset,
        "on_contention_changed": method_on_contention_changed,
        "spectrum_ula_contended_device::get_video_line_clocks": method_spectrum_ula_contended_device__get_video_line_clocks,
        "spectrum_ula_contended_device::get_raster_line_clocks": method_spectrum_ula_contended_device__get_raster_line_clocks,
        "spectrum_ula_contended_device::get_irq_at": method_spectrum_ula_contended_device__get_irq_at,
        "spectrum_ula_contended_device::get_irq_ext_length": method_spectrum_ula_contended_device__get_irq_ext_length,
        "spectrum_ula_contended_device::get_border_chunk_size": method_spectrum_ula_contended_device__get_border_chunk_size,
        "spectrum_ula_contended_device::get_btime": method_spectrum_ula_contended_device__get_btime,
        "spectrum_ula_contended_device::get_atime_left": method_spectrum_ula_contended_device__get_atime_left,
        "spectrum_ula_contended_device::get_atime_right": method_spectrum_ula_contended_device__get_atime_right,
        "spectrum_ula_contended_device::get_raster_contention_offset": method_spectrum_ula_contended_device__get_raster_contention_offset
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["NAME", "m_maincpu.adjust_icount", "m_maincpu.attotime_to_cycles", "m_maincpu.clock", "m_maincpu.local_time", "m_maincpu.set_tag", "m_maincpu.total_cycles", "m_screen.clock", "m_screen.hpos", "m_screen.set_tag", "m_screen.vpos", "m_screen.width", "machine", "machine().side_effects_disabled", "machine().time", "save_item", "std::forward"];
definition.compiledStructMethods = {
    "m_f": (() => {
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
        function method_s(runtime) {
            const members = runtime.members;
            const h_s_val = members.s_val ?? 0;
            return ((h_s_val) & (128));
        }
        function method_z(runtime) {
            const members = runtime.members;
            const h_z_val = members.z_val ?? 0;
            return ((h_z_val) ? (0) : (64));
        }
        function method_yx(runtime) {
            const members = runtime.members;
            const h_yx_val = members.yx_val ?? 0;
            return ((h_yx_val) & (40));
        }
        function method_h(runtime) {
            const members = runtime.members;
            const h_h_val = members.h_val ?? 0;
            return ((h_h_val) & (16));
        }
        function method_pv(runtime) {
            const members = runtime.members;
            const h_pv_val = members.pv_val ?? 0;
            let val = ((h_pv_val) & 0xff);
            val = ((((val) ^ (((val) >>> (4))))) & 0xff);
            val = ((((val) ^ (((val) << (2))))) & 0xff);
            val = ((((val) ^ (((val) >>> (1))))) & 0xff);
            return (((~val)) & (4));
        }
        function method_nomem_rq(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
            if (method_is_contended(runtime, offset)) {
                runtime.invoke("content_early");
            }
        }
        function method_is_contended(runtime, offset) {
            const members = runtime.members;
            return ((((((offset) >= (16384)) ? 1 : 0)) && ((((offset) < (32768)) ? 1 : 0))) ? 1 : 0);
        }
        function method_io_r(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
            if ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
                runtime.invoke("content_early");
                runtime.invoke("content_late");
            }
        }
        function method_io_w(runtime, offset) {
            const members = runtime.members;
            if (method_is_contended(runtime, offset)) {
                runtime.invoke("content_early");
                runtime.invoke("content_late");
            }
        }
        function method_data_r(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
            if ((((((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
                runtime.invoke("content_early");
            }
        }
        function method_data_w(runtime, offset) {
            const members = runtime.members;
            if (method_is_contended(runtime, offset)) {
                runtime.invoke("content_early");
            }
        }
        function method_ula_r(runtime, offset) {
            const members = runtime.members;
            const __l = runtime.links ?? runtime.calls;
            const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
            if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                if (method_is_contended(runtime, offset)) {
                    runtime.invoke("content_early");
                }
                runtime.invoke("content_early", 1);
            }
        }
        function method_ula_w(runtime, offset) {
            const members = runtime.members;
            if (method_is_contended(runtime, offset)) {
                runtime.invoke("content_early");
            }
            runtime.invoke("content_early", 1);
        }
        function method_get_border_chunk_size(runtime) {
            const members = runtime.members;
            return ((8) & 0xff);
        }
        function method_spectrum_ula_device__nomem_rq(runtime, offset, data) {
            const members = runtime.members;
            data = ((data) & 0xff);
        }
        function method_spectrum_ula_device__m1(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__io_r(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__io_w(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__data_r(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__data_w(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__ula_r(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__ula_w(runtime, offset) {
            const members = runtime.members;
        }
        function method_spectrum_ula_device__is_in_contended_area(runtime) {
            const members = runtime.members;
            return 0;
        }
        function method_spectrum_ula_device__get_video_line_clocks(runtime) {
            const members = runtime.members;
            return -1;
        }
        function method_spectrum_ula_device__get_raster_line_clocks(runtime) {
            const members = runtime.members;
            return -1;
        }
        function method_spectrum_ula_device__get_irq_at(runtime) {
            const members = runtime.members;
            return -1;
        }
        function method_spectrum_ula_device__get_irq_ext_length(runtime) {
            const members = runtime.members;
            return ((0) & 0xff);
        }
        function method_spectrum_ula_device__get_border_chunk_size(runtime) {
            const members = runtime.members;
            return ((1) & 0xff);
        }
        function method_spectrum_ula_device__get_btime(runtime) {
            const members = runtime.members;
            return ((0) & 0xff);
        }
        function method_spectrum_ula_device__get_atime_left(runtime) {
            const members = runtime.members;
            return ((0) & 0xff);
        }
        function method_spectrum_ula_device__get_atime_right(runtime) {
            const members = runtime.members;
            return ((0) & 0xff);
        }
        function method_spectrum_ula_device__get_raster_contention_offset(runtime) {
            const members = runtime.members;
            return ((0) << 24 >> 24);
        }
        function method_spectrum_ula_contended_device__get_border_chunk_size(runtime) {
            const members = runtime.members;
            return ((8) & 0xff);
        }
        // CALL_METHOD's direct targets: each emitted method by its name.
        const __methodTable = {
            "s": method_s,
            "z": method_z,
            "yx": method_yx,
            "h": method_h,
            "pv": method_pv,
            "nomem_rq": method_nomem_rq,
            "is_contended": method_is_contended,
            "io_r": method_io_r,
            "io_w": method_io_w,
            "data_r": method_data_r,
            "data_w": method_data_w,
            "ula_r": method_ula_r,
            "ula_w": method_ula_w,
            "get_border_chunk_size": method_get_border_chunk_size,
            "spectrum_ula_device::nomem_rq": method_spectrum_ula_device__nomem_rq,
            "spectrum_ula_device::m1": method_spectrum_ula_device__m1,
            "spectrum_ula_device::io_r": method_spectrum_ula_device__io_r,
            "spectrum_ula_device::io_w": method_spectrum_ula_device__io_w,
            "spectrum_ula_device::data_r": method_spectrum_ula_device__data_r,
            "spectrum_ula_device::data_w": method_spectrum_ula_device__data_w,
            "spectrum_ula_device::ula_r": method_spectrum_ula_device__ula_r,
            "spectrum_ula_device::ula_w": method_spectrum_ula_device__ula_w,
            "spectrum_ula_device::is_in_contended_area": method_spectrum_ula_device__is_in_contended_area,
            "spectrum_ula_device::get_video_line_clocks": method_spectrum_ula_device__get_video_line_clocks,
            "spectrum_ula_device::get_raster_line_clocks": method_spectrum_ula_device__get_raster_line_clocks,
            "spectrum_ula_device::get_irq_at": method_spectrum_ula_device__get_irq_at,
            "spectrum_ula_device::get_irq_ext_length": method_spectrum_ula_device__get_irq_ext_length,
            "spectrum_ula_device::get_border_chunk_size": method_spectrum_ula_device__get_border_chunk_size,
            "spectrum_ula_device::get_btime": method_spectrum_ula_device__get_btime,
            "spectrum_ula_device::get_atime_left": method_spectrum_ula_device__get_atime_left,
            "spectrum_ula_device::get_atime_right": method_spectrum_ula_device__get_atime_right,
            "spectrum_ula_device::get_raster_contention_offset": method_spectrum_ula_device__get_raster_contention_offset,
            "spectrum_ula_contended_device::get_border_chunk_size": method_spectrum_ula_contended_device__get_border_chunk_size
        };
        return __methodTable;
    })(),
};
export const device = definition;
export default device;
