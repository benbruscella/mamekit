import deviceData from './hd6845s.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
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
                    ret = (((((members.m_supports_disp_start_addr_r ?? 0)) ? (((runtime.shiftRight((members.m_disp_start_addr ?? 0), 8)) & (255))) : (0))) & 0xff);
                    break;
                }
            case 13:
                {
                    ret = (((((members.m_supports_disp_start_addr_r ?? 0)) ? (((runtime.shiftRight((members.m_disp_start_addr ?? 0), 0)) & (255))) : (0))) & 0xff);
                    break;
                }
            case 14:
                {
                    ret = ((((runtime.shiftRight((members.m_cursor_addr ?? 0), 8)) & (255))) & 0xff);
                    break;
                }
            case 15:
                {
                    ret = ((((runtime.shiftRight((members.m_cursor_addr ?? 0), 0)) & (255))) & 0xff);
                    break;
                }
            case 16:
                {
                    ret = ((((runtime.shiftRight((members.m_light_pen_addr ?? 0), 8)) & (255))) & 0xff);
                    members.m_light_pen_latched = ((0) ? 1 : 0);
                    break;
                }
            case 17:
                {
                    ret = ((((runtime.shiftRight((members.m_light_pen_addr ?? 0), 0)) & (255))) & 0xff);
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
    function method_call_on_update_address(runtime, strobe) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["m_on_update_addr_changed_cb.isnull"]?.() ?? 0)) ? 0 : 1)) {
            ((runtime.dereference(members.m_upd_trans_timer)).adjust?.(0, (((((members.m_update_addr ?? 0)) << (8))) | (strobe))) ?? 0);
        }
        else {
            (__l["fatalerror"] ? __l["fatalerror"]("M6845: transparent memory mode without handler\n") : runtime.macro("fatalerror", "M6845: transparent memory mode without handler\n"));
        }
    }
    function method_update_upd_adr_timer(runtime) {
        const members = runtime.members;
        if (((((((members.m_de ?? 0)) ? 0 : 1)) && ((members.m_supports_transparent ?? 0))) ? 1 : 0)) {
            ((runtime.dereference(members.m_upd_adr_timer)).adjust?.((members.m_upd_time ?? 0)) ?? 0);
        }
    }
    function method_de_r(runtime) {
        const members = runtime.members;
        return (members.m_de ?? 0);
    }
    function method_cursor_r(runtime) {
        const members = runtime.members;
        return (members.m_cur ?? 0);
    }
    function method_hsync_r(runtime) {
        const members = runtime.members;
        return (members.m_hsync ?? 0);
    }
    function method_vsync_r(runtime) {
        const members = runtime.members;
        return (members.m_vsync ?? 0);
    }
    function method_set_de(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_de ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_de = ((state) | 0);
            if ((members.m_de ?? 0)) {
                ((runtime.dereference(members.m_upd_adr_timer)).adjust?.(Infinity) ?? 0);
            }
            else {
                if ((((members.m_update_ready_bit ?? 0)) ? 0 : 1)) {
                    method_update_upd_adr_timer(runtime);
                }
            }
            (__l["m_out_de_cb"] ? __l["m_out_de_cb"](Number((members.m_de ?? 0))) : typeof members.m_out_de_cb === 'function' ? members.m_out_de_cb((members.m_de ?? 0)) : runtime.invoke("m_out_de_cb", (members.m_de ?? 0)));
        }
    }
    function method_set_hsync(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_hsync ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_hsync = ((state) | 0);
            (__l["m_out_hsync_cb"] ? __l["m_out_hsync_cb"](Number((members.m_hsync ?? 0))) : typeof members.m_out_hsync_cb === 'function' ? members.m_out_hsync_cb((members.m_hsync ?? 0)) : runtime.invoke("m_out_hsync_cb", (members.m_hsync ?? 0)));
        }
    }
    function method_set_vsync(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_vsync ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_vsync = ((state) | 0);
            (__l["m_out_vsync_cb"] ? __l["m_out_vsync_cb"](Number((members.m_vsync ?? 0))) : typeof members.m_out_vsync_cb === 'function' ? members.m_out_vsync_cb((members.m_vsync ?? 0)) : runtime.invoke("m_out_vsync_cb", (members.m_vsync ?? 0)));
        }
    }
    function method_set_cur(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_cur ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_cur = ((state) | 0);
            (__l["m_out_cur_cb"] ? __l["m_out_cur_cb"](Number((members.m_cur ?? 0))) : typeof members.m_out_cur_cb === 'function' ? members.m_out_cur_cb((members.m_cur ?? 0)) : runtime.invoke("m_out_cur_cb", (members.m_cur ?? 0)));
        }
    }
    function method_draw_scanline(runtime, y, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let ra = ((((y) % ((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))))) & 0xff);
        let cursor_visible = ((method_check_cursor_visible(runtime, ra, (members.m_current_disp_addr ?? 0))) | 0);
        let cursor_x = ((((cursor_visible) ? ((((members.m_cursor_addr ?? 0)) - ((members.m_current_disp_addr ?? 0)))) : (-1))) << 24 >> 24);
        let de = ((((((Number(y) <= Number((members.m_max_visible_y ?? 0))) ? 1 : 0)) ? (1) : (0))) | 0);
        let vbp = (((((members.m_vert_pix_total ?? 0)) - ((members.m_vsync_off_pos ?? 0)))) | 0);
        if (((Number(vbp) < Number(0)) ? 1 : 0)) {
            vbp = ((0) | 0);
        }
        let hbp = (((((members.m_horiz_pix_total ?? 0)) - ((members.m_hsync_off_pos ?? 0)))) | 0);
        if (((Number(hbp) < Number(0)) ? 1 : 0)) {
            hbp = ((0) | 0);
        }
        if (((Number((((members.m_mode_control ?? 0)) & (4))) !== Number(0)) ? 1 : 0)) {
            let cc = ((0) & 0xff);
            let cr = ((runtime.divide(y, (((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0))))))) & 0xff);
            let ma = ((((((cr) << (8))) | (cc))) & 0xffff);
            (__l["m_update_row_cb"] ? __l["m_update_row_cb"](({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ((ma) + ((members.m_disp_start_addr ?? 0))), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })) : runtime.macro("m_update_row_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ((ma) + ((members.m_disp_start_addr ?? 0))), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })));
        }
        else {
            (__l["m_update_row_cb"] ? __l["m_update_row_cb"](({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ({ generatedLValue: true, get: () => (members.m_current_disp_addr ?? 0), set: (value) => { members.m_current_disp_addr = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })) : runtime.macro("m_update_row_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } }), ({ generatedLValue: true, get: () => (members.m_current_disp_addr ?? 0), set: (value) => { members.m_current_disp_addr = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => ra, set: (value) => { ra = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => y, set: (value) => { y = ((value) | 0); } }), ({ generatedLValue: true, get: () => (members.m_horiz_disp ?? 0), set: (value) => { members.m_horiz_disp = ((value) & 0xff); } }), ({ generatedLValue: true, get: () => cursor_x, set: (value) => { cursor_x = ((value) << 24 >> 24); } }), ({ generatedLValue: true, get: () => de, set: (value) => { de = ((value) | 0); } }), ({ generatedLValue: true, get: () => hbp, set: (value) => { hbp = ((value) | 0); } }), ({ generatedLValue: true, get: () => vbp, set: (value) => { vbp = ((value) | 0); } })));
        }
        if (((Number(ra) === Number((((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))) - (1)))) ? 1 : 0)) {
            members.m_current_disp_addr = (((((((members.m_current_disp_addr ?? 0)) + ((members.m_horiz_disp ?? 0)))) & (16383))) & 0xffff);
        }
        return ((ra) & 0xff);
    }
    function method_check_cursor_visible(runtime, ra, line_addr) {
        const members = runtime.members;
        if ((((members.m_cursor_state ?? 0)) ? 0 : 1)) {
            return 0;
        }
        if ((((((Number((members.m_cursor_addr ?? 0)) < Number(line_addr)) ? 1 : 0)) || (((Number((members.m_cursor_addr ?? 0)) >= Number(((line_addr) + ((members.m_horiz_disp ?? 0))))) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        let cursor_start_ras = (((((members.m_cursor_start_ras ?? 0)) & (31))) & 0xffff);
        let max_ras_addr = (((((((members.m_max_ras_addr ?? 0)) + (((((Number((((members.m_mode_control ?? 0)) & (3))) === Number(3)) ? 1 : 0)) ? ((members.m_interlace_adjust ?? 0)) : ((members.m_noninterlace_adjust ?? 0)))))) - (1))) & 0xffff);
        if ((((((Number(cursor_start_ras) > Number(max_ras_addr)) ? 1 : 0)) || (((Number(cursor_start_ras) > Number((members.m_cursor_end_ras ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            return 0;
        }
        return (((((Number(ra) >= Number(cursor_start_ras)) ? 1 : 0)) && (((Number(ra) <= Number((members.m_cursor_end_ras ?? 0))) ? 1 : 0))) ? 1 : 0);
    }
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["assert"] ? __l["assert"]((typeof (runtime.dereference(bitmap)).valid === 'function' ? (runtime.dereference(bitmap)).valid() : typeof (runtime.dereference(bitmap)).valid === 'number' || typeof (runtime.dereference(bitmap)).valid === 'boolean' ? (runtime.dereference(bitmap)).valid : runtime.container(bitmap, "valid"))) : runtime.macro("assert", (typeof (runtime.dereference(bitmap)).valid === 'function' ? (runtime.dereference(bitmap)).valid() : typeof (runtime.dereference(bitmap)).valid === 'number' || typeof (runtime.dereference(bitmap)).valid === 'boolean' ? (runtime.dereference(bitmap)).valid : runtime.container(bitmap, "valid"))));
        if ((members.m_has_valid_parameters ?? 0)) {
            if (((Number((members.m_display_disabled_msg_shown ?? 0)) === Number(1)) ? 1 : 0)) {
                0;
                members.m_display_disabled_msg_shown = ((0) ? 1 : 0);
            }
            (__l["m_begin_update_cb"] ? __l["m_begin_update_cb"](({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })) : runtime.macro("m_begin_update_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })));
            if (((Number(cliprect.min_y) === Number(0)) ? 1 : 0)) {
                members.m_current_disp_addr = (((members.m_disp_start_addr ?? 0)) & 0xffff);
            }
            for (let y = ((cliprect.min_y) & 0xffff); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) & 0xffff)) {
                method_draw_scanline(runtime, y, bitmap, cliprect);
            }
            (__l["m_end_update_cb"] ? __l["m_end_update_cb"](({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })) : runtime.macro("m_end_update_cb", ({ generatedLValue: true, get: () => bitmap, set: (value) => { bitmap = value; } }), ({ generatedLValue: true, get: () => cliprect, set: (value) => { cliprect = value; } })));
        }
        else {
            if (((Number((members.m_display_disabled_msg_shown ?? 0)) === Number(0)) ? 1 : 0)) {
                0;
                members.m_display_disabled_msg_shown = ((1) ? 1 : 0);
            }
        }
        return 0;
    }
    function method_match_line(runtime) {
        const members = runtime.members;
        if (((Number((members.m_line_counter ?? 0)) === Number((members.m_vert_disp ?? 0))) ? 1 : 0)) {
            members.m_line_enable_ff = ((0) ? 1 : 0);
            members.m_current_disp_addr = (((members.m_disp_start_addr ?? 0)) & 0xffff);
        }
        if (((Number((members.m_line_counter ?? 0)) === Number((members.m_vert_sync_pos ?? 0))) ? 1 : 0)) {
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
        const h_m_clk_scale = members.m_clk_scale ?? 0;
        return (__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](((clocks) * (h_m_clk_scale))) : runtime.macro("clocks_to_attotime", ((clocks) * (h_m_clk_scale))));
    }
    function method_de_off_tick(runtime, param) {
        const members = runtime.members;
        method_set_de(runtime, 0);
    }
    function method_cursor_on(runtime, param) {
        const members = runtime.members;
        method_set_cur(runtime, 1);
        ((runtime.dereference(members.m_cursor_off_timer)).adjust?.(method_cclks_to_attotime(runtime, 1)) ?? 0);
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
        ((runtime.dereference(members.m_hsync_off_timer)).adjust?.(method_cclks_to_attotime(runtime, hsync_width)) ?? 0);
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
        members.m_character_counter = ((method_attotime_to_cclks(runtime, (typeof (runtime.dereference(members.m_line_timer)).elapsed === 'function' ? (runtime.dereference(members.m_line_timer)).elapsed() : typeof (runtime.dereference(members.m_line_timer)).elapsed === 'number' || typeof (runtime.dereference(members.m_line_timer)).elapsed === 'boolean' ? (runtime.dereference(members.m_line_timer)).elapsed : runtime.container(members.m_line_timer, "elapsed")))) & 0xff);
        if ((typeof (runtime.dereference(members.m_hsync_off_timer)).enabled === 'function' ? (runtime.dereference(members.m_hsync_off_timer)).enabled() : typeof (runtime.dereference(members.m_hsync_off_timer)).enabled === 'number' || typeof (runtime.dereference(members.m_hsync_off_timer)).enabled === 'boolean' ? (runtime.dereference(members.m_hsync_off_timer)).enabled : runtime.container(members.m_hsync_off_timer, "enabled"))) {
            members.m_hsync_width_counter = ((method_attotime_to_cclks(runtime, (typeof (runtime.dereference(members.m_hsync_off_timer)).elapsed === 'function' ? (runtime.dereference(members.m_hsync_off_timer)).elapsed() : typeof (runtime.dereference(members.m_hsync_off_timer)).elapsed === 'number' || typeof (runtime.dereference(members.m_hsync_off_timer)).elapsed === 'boolean' ? (runtime.dereference(members.m_hsync_off_timer)).elapsed : runtime.container(members.m_hsync_off_timer, "elapsed")))) & 0xff);
        }
    }
    function method_attotime_to_cclks(runtime, duration) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_clk_scale = members.m_clk_scale ?? 0;
        return runtime.divide((__l["attotime_to_clocks"] ? __l["attotime_to_clocks"](duration) : runtime.macro("attotime_to_clocks", duration)), h_m_clk_scale);
    }
    function method_adr_update_tick(runtime, param) {
        const members = runtime.members;
        method_call_on_update_address(runtime, ((Number((((members.m_mode_control ?? 0)) & (64))) !== Number(0)) ? 1 : 0));
    }
    function method_transparent_update_tick(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let addr = ((runtime.shiftRight(param, 8)) | 0);
        let strobe = ((((param) & (255))) | 0);
        (__l["m_on_update_addr_changed_cb"] ? __l["m_on_update_addr_changed_cb"](({ generatedLValue: true, get: () => addr, set: (value) => { addr = ((value) | 0); } }), ({ generatedLValue: true, get: () => strobe, set: (value) => { strobe = ((value) | 0); } })) : runtime.macro("m_on_update_addr_changed_cb", ({ generatedLValue: true, get: () => addr, set: (value) => { addr = ((value) | 0); } }), ({ generatedLValue: true, get: () => strobe, set: (value) => { strobe = ((value) | 0); } })));
        if (((((((members.m_update_ready_bit ?? 0)) ? 0 : 1)) && (((Number((((members.m_mode_control ?? 0)) & (136))) === Number(8)) ? 1 : 0))) ? 1 : 0)) {
            members.m_update_addr = ((((members.m_update_addr) + (1))) & 0xffff);
            members.m_update_addr = ((((members.m_update_addr) & (16383))) & 0xffff);
            members.m_update_ready_bit = ((1) ? 1 : 0);
        }
    }
    return {
        "status_r": method_status_r,
        "register_r": method_register_r,
        "transparent_update": method_transparent_update,
        "call_on_update_address": method_call_on_update_address,
        "update_upd_adr_timer": method_update_upd_adr_timer,
        "de_r": method_de_r,
        "cursor_r": method_cursor_r,
        "hsync_r": method_hsync_r,
        "vsync_r": method_vsync_r,
        "set_de": method_set_de,
        "set_hsync": method_set_hsync,
        "set_vsync": method_set_vsync,
        "set_cur": method_set_cur,
        "draw_scanline": method_draw_scanline,
        "check_cursor_visible": method_check_cursor_visible,
        "screen_update": method_screen_update,
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
        "transparent_update_tick": method_transparent_update_tick
    };
})();
definition.compiledMethodLinks = ["assert", "attotime_to_clocks", "clocks_to_attotime", "fatalerror", "m_begin_update_cb", "m_end_update_cb", "m_on_update_addr_changed_cb", "m_on_update_addr_changed_cb.isnull", "m_out_cur_cb", "m_out_de_cb", "m_out_hsync_cb", "m_out_vsync_cb", "m_update_row_cb"];
export const device = definition;
export default device;
