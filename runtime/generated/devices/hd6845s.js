import deviceData from './hd6845s.device.ir.json' with { type: 'json' };
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
    function method_call_on_update_address(runtime, strobe) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_on_update_addr_changed_cb.isnull"], __L1 = __l["fatalerror"];
        const h_m_on_update_addr_changed_cb = members.m_on_update_addr_changed_cb ?? 0;
        if ((((__L0 ? __L0() : typeof (h_m_on_update_addr_changed_cb)?.isnull === 'function' ? (h_m_on_update_addr_changed_cb).isnull() : ((__L0 ?? globalThis.mamekitMissingCall?.("m_on_update_addr_changed_cb.isnull"))?.() ?? 0))) ? 0 : 1)) {
            (__deref_call_on_update_address(runtime, members.m_upd_trans_timer).adjust?.(0, (((((members.m_update_addr ?? 0)) << (8))) | (strobe))) ?? 0);
        }
        else {
            (__L1 ? __L1("M6845: transparent memory mode without handler\n") : runtime.macro("fatalerror", "M6845: transparent memory mode without handler\n"));
        }
    }
    function __deref_call_on_update_address(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
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
        members.m_register_address_latch = ((((data) & (31))) & 0xff);
    }
    function method_status_r(runtime) {
        const members = runtime.members;
        let ret = ((0) & 0xff);
        if (((((members.m_supports_status_reg_d5 ?? 0)) && ((((members.m_line_enable_ff ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            ret = ((((ret) | (32))) & 0xff);
        }
        if (((((members.m_supports_status_reg_d6 ?? 0)) && ((members.m_light_pen_latched ?? 0))) ? 1 : 0)) {
            ret = ((((ret) | (64))) & 0xff);
        }
        if (((((members.m_supports_status_reg_d7 ?? 0)) && ((members.m_update_ready_bit ?? 0))) ? 1 : 0)) {
            ret = ((((ret) | (128))) & 0xff);
        }
        return ((ret) & 0xff);
    }
    function method_register_r(runtime) {
        const members = runtime.members;
        let ret = ((0) & 0xff);
        switch ((members.m_register_address_latch ?? 0)) {
            case 12:
                {
                    ret = (((((members.m_supports_disp_start_addr_r ?? 0)) ? ((((((members.m_disp_start_addr ?? 0)) >>> (8))) & (255))) : (0))) & 0xff);
                    break;
                }
            case 13:
                {
                    ret = (((((members.m_supports_disp_start_addr_r ?? 0)) ? ((((((members.m_disp_start_addr ?? 0)) >>> (0))) & (255))) : (0))) & 0xff);
                    break;
                }
            case 14:
                {
                    ret = (((((((members.m_cursor_addr ?? 0)) >>> (8))) & (255))) & 0xff);
                    break;
                }
            case 15:
                {
                    ret = (((((((members.m_cursor_addr ?? 0)) >>> (0))) & (255))) & 0xff);
                    break;
                }
            case 16:
                {
                    ret = (((((((members.m_light_pen_addr ?? 0)) >>> (8))) & (255))) & 0xff);
                    members.m_light_pen_latched = ((0) ? 1 : 0);
                    break;
                }
            case 17:
                {
                    ret = (((((((members.m_light_pen_addr ?? 0)) >>> (0))) & (255))) & 0xff);
                    members.m_light_pen_latched = ((0) ? 1 : 0);
                    break;
                }
            case 31:
                {
                    method_transparent_update(runtime);
                    break;
                }
            default:
                {
                    break;
                }
        }
        return ((ret) & 0xff);
    }
    function method_transparent_update(runtime) {
        const members = runtime.members;
        if (((((members.m_supports_transparent ?? 0)) && (((Number((((members.m_mode_control ?? 0)) & (8))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
            if (((Number((((members.m_mode_control ?? 0)) & (136))) === Number(136)) ? 1 : 0)) {
                members.m_update_addr = ((((members.m_update_addr) + (1))) & 0xffff);
                members.m_update_addr = ((((members.m_update_addr) & (16383))) & 0xffff);
                method_call_on_update_address(runtime, ((Number((((members.m_mode_control ?? 0)) & (64))) !== Number(0)) ? 1 : 0));
            }
            else {
                if ((members.m_update_ready_bit ?? 0)) {
                    members.m_update_ready_bit = ((0) ? 1 : 0);
                    method_update_upd_adr_timer(runtime);
                }
            }
        }
    }
    function method_update_upd_adr_timer(runtime) {
        const members = runtime.members;
        if (((((((members.m_de ?? 0)) ? 0 : 1)) && ((members.m_supports_transparent ?? 0))) ? 1 : 0)) {
            (__deref_update_upd_adr_timer(runtime, members.m_upd_adr_timer).adjust?.((members.m_upd_time ?? 0)) ?? 0);
        }
    }
    function __deref_update_upd_adr_timer(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_de_r(runtime) {
        const members = runtime.members;
        return (((members.m_de ?? 0)) | 0);
    }
    function method_cursor_r(runtime) {
        const members = runtime.members;
        return (((members.m_cur ?? 0)) | 0);
    }
    function method_hsync_r(runtime) {
        const members = runtime.members;
        return (((members.m_hsync ?? 0)) | 0);
    }
    function method_vsync_r(runtime) {
        const members = runtime.members;
        return (((members.m_vsync ?? 0)) | 0);
    }
    function method_set_de(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_de_cb"];
        if (((((members.m_de ?? 0)) !== (state)) ? 1 : 0)) {
            members.m_de = ((state) | 0);
            if ((members.m_de ?? 0)) {
                (__deref_set_de(runtime, members.m_upd_adr_timer).adjust?.(Infinity) ?? 0);
            }
            else {
                if ((((members.m_update_ready_bit ?? 0)) ? 0 : 1)) {
                    method_update_upd_adr_timer(runtime);
                }
            }
            (__L0 ? __L0(Number((members.m_de ?? 0))) : typeof members.m_out_de_cb === 'function' ? members.m_out_de_cb((members.m_de ?? 0)) : runtime.invoke("m_out_de_cb", (members.m_de ?? 0)));
        }
    }
    function __deref_set_de(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_set_hsync(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_hsync_cb"];
        if (((((members.m_hsync ?? 0)) !== (state)) ? 1 : 0)) {
            members.m_hsync = ((state) | 0);
            (__L0 ? __L0(Number((members.m_hsync ?? 0))) : typeof members.m_out_hsync_cb === 'function' ? members.m_out_hsync_cb((members.m_hsync ?? 0)) : runtime.invoke("m_out_hsync_cb", (members.m_hsync ?? 0)));
        }
    }
    function method_set_vsync(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_vsync_cb"];
        if (((((members.m_vsync ?? 0)) !== (state)) ? 1 : 0)) {
            members.m_vsync = ((state) | 0);
            (__L0 ? __L0(Number((members.m_vsync ?? 0))) : typeof members.m_out_vsync_cb === 'function' ? members.m_out_vsync_cb((members.m_vsync ?? 0)) : runtime.invoke("m_out_vsync_cb", (members.m_vsync ?? 0)));
        }
    }
    function method_set_cur(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_out_cur_cb"];
        if (((((members.m_cur ?? 0)) !== (state)) ? 1 : 0)) {
            members.m_cur = ((state) | 0);
            (__L0 ? __L0(Number((members.m_cur ?? 0))) : typeof members.m_out_cur_cb === 'function' ? members.m_out_cur_cb((members.m_cur ?? 0)) : runtime.invoke("m_out_cur_cb", (members.m_cur ?? 0)));
        }
    }
    function method_get_ra(runtime) {
        const members = runtime.members;
        return (((members.m_raster_counter ?? 0)) & 0xff);
    }
    function method_draw_scanline(runtime, y, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_update_row_cb"];
        let ra = ((((y) % ((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))))) & 0xff);
        let cursor_visible = ((method_check_cursor_visible(runtime, ra, (members.m_current_disp_addr ?? 0))) | 0);
        let cursor_x = ((((cursor_visible) ? ((((members.m_cursor_addr ?? 0)) - ((members.m_current_disp_addr ?? 0)))) : (-1))) << 24 >> 24);
        let de = (((((((y) <= ((members.m_max_visible_y ?? 0))) ? 1 : 0)) ? (1) : (0))) | 0);
        let vbp = (((((members.m_vert_pix_total ?? 0)) - ((members.m_vsync_off_pos ?? 0)))) | 0);
        if ((((vbp) < (0)) ? 1 : 0)) {
            vbp = ((0) | 0);
        }
        let hbp = (((((members.m_horiz_pix_total ?? 0)) - ((members.m_hsync_off_pos ?? 0)))) | 0);
        if ((((hbp) < (0)) ? 1 : 0)) {
            hbp = ((0) | 0);
        }
        if (((Number((((members.m_mode_control ?? 0)) & (4))) !== Number(0)) ? 1 : 0)) {
            let cc = ((0) & 0xff);
            let cr = ((runtime.divide(y, (((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0))))))) & 0xff);
            let ma = ((((((cr) << (8))) | (cc))) & 0xffff);
            (__L0 ? __L0(({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ((ma) + ((members.m_disp_start_addr ?? 0))), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })) : runtime.macro("m_update_row_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ((ma) + ((members.m_disp_start_addr ?? 0))), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })));
        }
        else {
            (__L0 ? __L0(({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ({ generatedLValue: true, get: () => (members.m_current_disp_addr ?? 0), set: (value) => { members.m_current_disp_addr = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })) : runtime.macro("m_update_row_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ({ generatedLValue: true, get: () => (members.m_current_disp_addr ?? 0), set: (value) => { members.m_current_disp_addr = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })));
        }
        if (((Number(ra) === Number((((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))) - (1)))) ? 1 : 0)) {
            members.m_current_disp_addr = (((((((members.m_current_disp_addr ?? 0)) + ((members.m_horiz_disp ?? 0)))) & (16383))) & 0xffff);
        }
        return ((ra) & 0xff);
    }
    function method_check_cursor_visible(runtime, ra, line_addr) {
        const members = runtime.members;
        ra = ((ra) & 0xffff);
        line_addr = ((line_addr) & 0xffff);
        if ((((members.m_cursor_state ?? 0)) ? 0 : 1)) {
            return 0;
        }
        if ((((((((members.m_cursor_addr ?? 0)) < (line_addr)) ? 1 : 0)) || (((Number((members.m_cursor_addr ?? 0)) >= Number(((line_addr) + ((members.m_horiz_disp ?? 0))))) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        let cursor_start_ras = (((((members.m_cursor_start_ras ?? 0)) & (31))) & 0xffff);
        let max_ras_addr = (((((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))) - (1))) & 0xffff);
        if (((((((cursor_start_ras) > (max_ras_addr)) ? 1 : 0)) || ((((cursor_start_ras) > ((members.m_cursor_end_ras ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        return ((((((ra) >= (cursor_start_ras)) ? 1 : 0)) && ((((ra) <= ((members.m_cursor_end_ras ?? 0))) ? 1 : 0))) ? 1 : 0);
    }
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_begin_update_cb"], __L1 = __l["m_end_update_cb"];
        if ((members.m_has_valid_parameters ?? 0)) {
            if (((Number((members.m_display_disabled_msg_shown ?? 0)) === Number(1)) ? 1 : 0)) {
                0;
                members.m_display_disabled_msg_shown = ((0) ? 1 : 0);
            }
            (__L0 ? __L0(({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })) : runtime.macro("m_begin_update_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })));
            if (((Number(cliprect.min_y) === Number(0)) ? 1 : 0)) {
                members.m_current_disp_addr = (((members.m_disp_start_addr ?? 0)) & 0xffff);
            }
            for (let y = ((cliprect.min_y) & 0xffff); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) & 0xffff)) {
                method_draw_scanline(runtime, y, bitmap, cliprect);
            }
            (__L1 ? __L1(({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })) : runtime.macro("m_end_update_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })));
        }
        else {
            if (((Number((members.m_display_disabled_msg_shown ?? 0)) === Number(0)) ? 1 : 0)) {
                0;
                members.m_display_disabled_msg_shown = ((1) ? 1 : 0);
            }
        }
        return ((0) >>> 0);
    }
    function method_handle_line_timer(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["has_screen"], __L1 = __l["screen"], __L2 = __l["screen().reset_origin"];
        let new_vsync = (((members.m_vsync ?? 0)) ? 1 : 0);
        members.m_character_counter = ((0) & 0xff);
        members.m_cursor_x = ((-1) << 16 >> 16);
        if ((members.m_vsync_ff ?? 0)) {
            let vsync_width = (((((members.m_supports_vert_sync_width ?? 0)) ? ((((((members.m_sync_width ?? 0)) >>> (4))) & (15))) : (0))) & 0xff);
            members.m_vsync_width_counter = (((((((members.m_vsync_width_counter ?? 0)) + (1))) & (15))) & 0xff);
            if (((((members.m_vsync_width_counter ?? 0)) === (vsync_width)) ? 1 : 0)) {
                members.m_vsync_ff = ((0) & 0xff);
                new_vsync = ((0) ? 1 : 0);
            }
        }
        if (((Number((members.m_raster_counter ?? 0)) === Number((((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))) - (1)))) ? 1 : 0)) {
            if (((((members.m_line_counter ?? 0)) === ((members.m_vert_char_total ?? 0))) ? 1 : 0)) {
                members.m_adjust_counter = ((0) & 0xff);
                members.m_adjust_active = ((1) & 0xff);
            }
            members.m_raster_counter = ((0) & 0xff);
            members.m_line_counter = (((((((members.m_line_counter ?? 0)) + (1))) & (127))) & 0xff);
            members.m_line_address = (((((((members.m_line_address ?? 0)) + ((members.m_horiz_disp ?? 0)))) & (16383))) & 0xffff);
            if (method_match_line(runtime)) {
                new_vsync = ((1) ? 1 : 0);
            }
        }
        else {
            members.m_raster_counter = (((((((members.m_raster_counter ?? 0)) + (1))) & (31))) & 0xff);
        }
        if ((members.m_adjust_active ?? 0)) {
            if (((((members.m_adjust_counter ?? 0)) === ((members.m_vert_total_adj ?? 0))) ? 1 : 0)) {
                members.m_adjust_active = ((0) & 0xff);
                members.m_raster_counter = ((0) & 0xff);
                members.m_line_counter = ((0) & 0xff);
                members.m_line_address = (((members.m_disp_start_addr ?? 0)) & 0xffff);
                members.m_line_enable_ff = ((1) ? 1 : 0);
                if ((members.m_supports_vert_sync_width ?? 0)) {
                    if (method_match_line(runtime)) {
                        new_vsync = ((1) ? 1 : 0);
                    }
                }
                method_update_cursor_state(runtime);
                if ((__L0 ? __L0() : runtime.macro("has_screen"))) {
                    ((__L2 ?? globalThis.mamekitMissingCall?.("screen().reset_origin"))?.() ?? 0);
                }
            }
            else {
                members.m_adjust_counter = (((((((members.m_adjust_counter ?? 0)) + (1))) & (31))) & 0xff);
            }
        }
        if ((members.m_line_enable_ff ?? 0)) {
            (__deref_handle_line_timer(runtime, members.m_de_off_timer).adjust?.(method_cclks_to_attotime(runtime, (members.m_horiz_disp ?? 0))) ?? 0);
            if (method_check_cursor_visible(runtime, (members.m_raster_counter ?? 0), (members.m_line_address ?? 0))) {
                members.m_cursor_x = (((((members.m_cursor_addr ?? 0)) - ((members.m_line_address ?? 0)))) << 16 >> 16);
                (__deref_handle_line_timer(runtime, members.m_cursor_on_timer).adjust?.(method_cclks_to_attotime(runtime, (members.m_cursor_x ?? 0))) ?? 0);
            }
        }
        (__deref_handle_line_timer(runtime, members.m_hsync_on_timer).adjust?.(method_cclks_to_attotime(runtime, (members.m_horiz_sync_pos ?? 0))) ?? 0);
        (__deref_handle_line_timer(runtime, members.m_line_timer).adjust?.(method_cclks_to_attotime(runtime, (((members.m_horiz_char_total ?? 0)) + (1)))) ?? 0);
        method_set_vsync(runtime, new_vsync);
        method_set_de(runtime, (((members.m_line_enable_ff ?? 0)) ? (1) : (0)));
    }
    function __deref_handle_line_timer(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_match_line(runtime) {
        const members = runtime.members;
        if (((((members.m_line_counter ?? 0)) === ((members.m_vert_disp ?? 0))) ? 1 : 0)) {
            members.m_line_enable_ff = ((0) ? 1 : 0);
            members.m_current_disp_addr = (((members.m_disp_start_addr ?? 0)) & 0xffff);
        }
        if (((((members.m_line_counter ?? 0)) === ((members.m_vert_sync_pos ?? 0))) ? 1 : 0)) {
            members.m_vsync_width_counter = ((0) & 0xff);
            members.m_vsync_ff = ((1) & 0xff);
            return 1;
        }
        return 0;
    }
    function method_update_cursor_state(runtime) {
        const members = runtime.members;
        let last_cursor_blink_count = (((members.m_cursor_blink_count ?? 0)) & 0xff);
        members.m_cursor_blink_count = (((((members.m_cursor_blink_count ?? 0)) + (1))) & 0xff);
        switch ((((members.m_cursor_start_ras ?? 0)) & (96))) {
            case 0:
                {
                    members.m_cursor_state = ((1) ? 1 : 0);
                    break;
                }
            default:
                {
                    members.m_cursor_state = ((0) ? 1 : 0);
                    break;
                }
            case 64:
                {
                    if (((Number(((last_cursor_blink_count) & (16))) !== Number((((members.m_cursor_blink_count ?? 0)) & (16)))) ? 1 : 0)) {
                        members.m_cursor_state = (((((members.m_cursor_state ?? 0)) ? 0 : 1)) ? 1 : 0);
                    }
                    break;
                }
            case 96:
                {
                    if (((Number(((last_cursor_blink_count) & (32))) !== Number((((members.m_cursor_blink_count ?? 0)) & (32)))) ? 1 : 0)) {
                        members.m_cursor_state = (((((members.m_cursor_state ?? 0)) ? 0 : 1)) ? 1 : 0);
                    }
                    break;
                }
        }
    }
    function method_cclks_to_attotime(runtime, clocks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"];
        const h_m_clk_scale = members.m_clk_scale ?? 0;
        return (__L0 ? __L0(runtime.wide("*", clocks, ((h_m_clk_scale) >>> 0))) : runtime.macro("clocks_to_attotime", runtime.wide("*", clocks, ((h_m_clk_scale) >>> 0))));
    }
    function method_de_off_tick(runtime, param) {
        const members = runtime.members;
        method_set_de(runtime, 0);
    }
    function method_cursor_on(runtime, param) {
        const members = runtime.members;
        method_set_cur(runtime, 1);
        (__deref_cursor_on(runtime, members.m_cursor_off_timer).adjust?.(method_cclks_to_attotime(runtime, 1)) ?? 0);
    }
    function __deref_cursor_on(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_cursor_off(runtime, param) {
        const members = runtime.members;
        method_set_cur(runtime, 0);
    }
    function method_hsync_on(runtime, param) {
        const members = runtime.members;
        let hsync_width = (((((((members.m_sync_width ?? 0)) & (15))) ? ((((members.m_sync_width ?? 0)) & (15))) : (16))) & 0xff);
        members.m_hsync_width_counter = ((0) & 0xff);
        method_set_hsync(runtime, 1);
        (__deref_hsync_on(runtime, members.m_hsync_off_timer).adjust?.(method_cclks_to_attotime(runtime, hsync_width)) ?? 0);
    }
    function __deref_hsync_on(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_hsync_off(runtime, param) {
        const members = runtime.members;
        method_set_hsync(runtime, 0);
    }
    function method_latch_light_pen(runtime, param) {
        const members = runtime.members;
        members.m_light_pen_addr = ((method_get_ma(runtime)) & 0xffff);
        members.m_light_pen_latched = ((1) ? 1 : 0);
    }
    function method_get_ma(runtime) {
        const members = runtime.members;
        method_update_counters(runtime);
        return (((((((members.m_line_address ?? 0)) + ((members.m_character_counter ?? 0)))) & (16383))) & 0xffff);
    }
    function method_update_counters(runtime) {
        const members = runtime.members;
        let __t0, __t1, __t2;
        members.m_character_counter = ((method_attotime_to_cclks(runtime, (__t0 = __deref_update_counters(runtime, members.m_line_timer), typeof __t0.elapsed === 'function' ? __t0.elapsed() : typeof __t0.elapsed === 'number' || typeof __t0.elapsed === 'boolean' ? __t0.elapsed : runtime.container(members.m_line_timer, "elapsed")))) & 0xff);
        if ((__t1 = __deref_update_counters(runtime, members.m_hsync_off_timer), typeof __t1.enabled === 'function' ? __t1.enabled() : typeof __t1.enabled === 'number' || typeof __t1.enabled === 'boolean' ? __t1.enabled : runtime.container(members.m_hsync_off_timer, "enabled"))) {
            members.m_hsync_width_counter = ((method_attotime_to_cclks(runtime, (__t2 = __deref_update_counters(runtime, members.m_hsync_off_timer), typeof __t2.elapsed === 'function' ? __t2.elapsed() : typeof __t2.elapsed === 'number' || typeof __t2.elapsed === 'boolean' ? __t2.elapsed : runtime.container(members.m_hsync_off_timer, "elapsed")))) & 0xff);
        }
    }
    function __deref_update_counters(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_attotime_to_cclks(runtime, duration) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime_to_clocks"];
        const h_m_clk_scale = members.m_clk_scale ?? 0;
        return runtime.divide((__L0 ? __L0(duration) : runtime.macro("attotime_to_clocks", duration)), h_m_clk_scale);
    }
    function method_adr_update_tick(runtime, param) {
        const members = runtime.members;
        method_call_on_update_address(runtime, ((Number((((members.m_mode_control ?? 0)) & (64))) !== Number(0)) ? 1 : 0));
    }
    function method_transparent_update_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["m_on_update_addr_changed_cb"];
        let addr = ((runtime.shiftRight(param, 8)) | 0);
        let strobe = ((((param) & (255))) | 0);
        (__L0 ? __L0(({ generatedLValue: true, get: () => addr, set: (value) => { addr = ((value) | 0); } }), ({ generatedLValue: true, get: () => strobe, set: (value) => { strobe = ((value) | 0); } })) : runtime.macro("m_on_update_addr_changed_cb", ({ generatedLValue: true, get: () => addr, set: (value) => { addr = ((value) | 0); } }), ({ generatedLValue: true, get: () => strobe, set: (value) => { strobe = ((value) | 0); } })));
        if (((((((members.m_update_ready_bit ?? 0)) ? 0 : 1)) && (((Number((((members.m_mode_control ?? 0)) & (136))) === Number(8)) ? 1 : 0))) ? 1 : 0)) {
            members.m_update_addr = ((((members.m_update_addr) + (1))) & 0xffff);
            members.m_update_addr = ((((members.m_update_addr) & (16383))) & 0xffff);
            members.m_update_ready_bit = ((1) ? 1 : 0);
        }
    }
    function method_set_show_border_area(runtime, show) {
        const members = runtime.members;
        members.m_show_border_area = ((show) ? 1 : 0);
    }
    function method_set_char_width(runtime, pixels) {
        const members = runtime.members;
        members.m_hpixels_per_column = ((pixels) | 0);
    }
    function method_out_de_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_de_callback(runtime, members.m_out_de_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_de_cb, "bind"));
    }
    function __deref_out_de_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_cur_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_cur_callback(runtime, members.m_out_cur_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_cur_cb, "bind"));
    }
    function __deref_out_cur_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_hsync_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_hsync_callback(runtime, members.m_out_hsync_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_hsync_cb, "bind"));
    }
    function __deref_out_hsync_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_out_vsync_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_out_vsync_callback(runtime, members.m_out_vsync_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_vsync_cb, "bind"));
    }
    function __deref_out_vsync_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mc6845_device__set_show_border_area(runtime, show) {
        const members = runtime.members;
        members.m_show_border_area = ((show) ? 1 : 0);
    }
    function method_mc6845_device__set_char_width(runtime, pixels) {
        const members = runtime.members;
        members.m_hpixels_per_column = ((pixels) | 0);
    }
    function method_mc6845_device__out_de_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mc6845_device__out_de_callback(runtime, members.m_out_de_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_de_cb, "bind"));
    }
    function __deref_mc6845_device__out_de_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mc6845_device__out_cur_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mc6845_device__out_cur_callback(runtime, members.m_out_cur_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_cur_cb, "bind"));
    }
    function __deref_mc6845_device__out_cur_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mc6845_device__out_hsync_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mc6845_device__out_hsync_callback(runtime, members.m_out_hsync_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_hsync_cb, "bind"));
    }
    function __deref_mc6845_device__out_hsync_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mc6845_device__out_vsync_callback(runtime) {
        const members = runtime.members;
        let __t0;
        return (__t0 = __deref_mc6845_device__out_vsync_callback(runtime, members.m_out_vsync_cb), typeof __t0.bind === 'function' ? __t0.bind() : typeof __t0.bind === 'number' || typeof __t0.bind === 'boolean' ? __t0.bind : runtime.container(members.m_out_vsync_cb, "bind"));
    }
    function __deref_mc6845_device__out_vsync_callback(runtime, p) {
        if (p !== null && typeof p === 'object') {
            if (p.generatedPointer === true) {
                if (p.target === undefined) {
                    const read = p.source[p.offset];
                    if (read !== undefined && read !== null)
                        return read;
                }
            }
            else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                return p;
            }
        }
        return runtime.dereference(p);
    }
    function method_mc6845_device__cclks_to_attotime(runtime, clocks) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["clocks_to_attotime"];
        const h_m_clk_scale = members.m_clk_scale ?? 0;
        return (__L0 ? __L0(runtime.wide("*", clocks, ((h_m_clk_scale) >>> 0))) : runtime.macro("clocks_to_attotime", runtime.wide("*", clocks, ((h_m_clk_scale) >>> 0))));
    }
    function method_mc6845_device__attotime_to_cclks(runtime, duration) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const __L0 = __l["attotime_to_clocks"];
        const h_m_clk_scale = members.m_clk_scale ?? 0;
        return runtime.divide((__L0 ? __L0(duration) : runtime.macro("attotime_to_clocks", duration)), h_m_clk_scale);
    }
    // CALL_METHOD's direct targets: each emitted method by its name.
    const __methodTable = {
        "call_on_update_address": method_call_on_update_address,
        "address_w": method_address_w,
        "status_r": method_status_r,
        "register_r": method_register_r,
        "transparent_update": method_transparent_update,
        "update_upd_adr_timer": method_update_upd_adr_timer,
        "de_r": method_de_r,
        "cursor_r": method_cursor_r,
        "hsync_r": method_hsync_r,
        "vsync_r": method_vsync_r,
        "set_de": method_set_de,
        "set_hsync": method_set_hsync,
        "set_vsync": method_set_vsync,
        "set_cur": method_set_cur,
        "get_ra": method_get_ra,
        "draw_scanline": method_draw_scanline,
        "check_cursor_visible": method_check_cursor_visible,
        "screen_update": method_screen_update,
        "handle_line_timer": method_handle_line_timer,
        "match_line": method_match_line,
        "update_cursor_state": method_update_cursor_state,
        "cclks_to_attotime": method_cclks_to_attotime,
        "de_off_tick": method_de_off_tick,
        "cursor_on": method_cursor_on,
        "cursor_off": method_cursor_off,
        "hsync_on": method_hsync_on,
        "hsync_off": method_hsync_off,
        "latch_light_pen": method_latch_light_pen,
        "get_ma": method_get_ma,
        "update_counters": method_update_counters,
        "attotime_to_cclks": method_attotime_to_cclks,
        "adr_update_tick": method_adr_update_tick,
        "transparent_update_tick": method_transparent_update_tick,
        "set_show_border_area": method_set_show_border_area,
        "set_char_width": method_set_char_width,
        "out_de_callback": method_out_de_callback,
        "out_cur_callback": method_out_cur_callback,
        "out_hsync_callback": method_out_hsync_callback,
        "out_vsync_callback": method_out_vsync_callback,
        "mc6845_device::set_show_border_area": method_mc6845_device__set_show_border_area,
        "mc6845_device::set_char_width": method_mc6845_device__set_char_width,
        "mc6845_device::out_de_callback": method_mc6845_device__out_de_callback,
        "mc6845_device::out_cur_callback": method_mc6845_device__out_cur_callback,
        "mc6845_device::out_hsync_callback": method_mc6845_device__out_hsync_callback,
        "mc6845_device::out_vsync_callback": method_mc6845_device__out_vsync_callback,
        "mc6845_device::cclks_to_attotime": method_mc6845_device__cclks_to_attotime,
        "mc6845_device::attotime_to_cclks": method_mc6845_device__attotime_to_cclks
    };
    return __methodTable;
})();
definition.compiledMethodLinks = ["attotime_to_clocks", "clocks_to_attotime", "fatalerror", "has_screen", "m_begin_update_cb", "m_end_update_cb", "m_on_update_addr_changed_cb", "m_on_update_addr_changed_cb.isnull", "m_out_cur_cb", "m_out_de_cb", "m_out_hsync_cb", "m_out_vsync_cb", "m_update_row_cb", "screen", "screen().reset_origin"];
export const device = definition;
export default device;
