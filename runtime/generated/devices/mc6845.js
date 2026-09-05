import deviceData from './mc6845.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_match_line(runtime) {
        const members = runtime.members;
        if (((Number((members.m_line_counter ?? runtime.member("m_line_counter"))) === Number((members.m_vert_disp ?? runtime.member("m_vert_disp")))) ? 1 : 0)) {
            members.m_line_enable_ff = ((0) ? 1 : 0);
            members.m_current_disp_addr = (((members.m_disp_start_addr ?? runtime.member("m_disp_start_addr"))) & 0xffff);
        }
        if (((Number((members.m_line_counter ?? runtime.member("m_line_counter"))) === Number((members.m_vert_sync_pos ?? runtime.member("m_vert_sync_pos")))) ? 1 : 0)) {
            members.m_vsync_width_counter = ((0) & 0xff);
            members.m_vsync_ff = ((1) & 0xff);
            return 1;
        }
        return 0;
    }
    function method_update_cursor_state(runtime) {
        const members = runtime.members;
        let last_cursor_blink_count = (((members.m_cursor_blink_count ?? runtime.member("m_cursor_blink_count"))) & 0xff);
        members.m_cursor_blink_count = (((((members.m_cursor_blink_count ?? runtime.member("m_cursor_blink_count"))) + (1))) & 0xff);
        switch ((((members.m_cursor_start_ras ?? runtime.member("m_cursor_start_ras"))) & (96))) {
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
                    if (((Number(((last_cursor_blink_count) & (16))) !== Number((((members.m_cursor_blink_count ?? runtime.member("m_cursor_blink_count"))) & (16)))) ? 1 : 0)) {
                        members.m_cursor_state = (((((members.m_cursor_state ?? runtime.member("m_cursor_state"))) ? 0 : 1)) ? 1 : 0);
                    }
                    break;
                }
            case 96:
                {
                    if (((Number(((last_cursor_blink_count) & (32))) !== Number((((members.m_cursor_blink_count ?? runtime.member("m_cursor_blink_count"))) & (32)))) ? 1 : 0)) {
                        members.m_cursor_state = (((((members.m_cursor_state ?? runtime.member("m_cursor_state"))) ? 0 : 1)) ? 1 : 0);
                    }
                    break;
                }
        }
    }
    function method_cclks_to_attotime(runtime, clocks) {
        const members = runtime.members;
        const h_m_clk_scale = members.m_clk_scale ?? runtime.member("m_clk_scale");
        return (runtime.calls["clocks_to_attotime"] ? runtime.calls["clocks_to_attotime"](((clocks) * (h_m_clk_scale))) : runtime.macro("clocks_to_attotime", ((clocks) * (h_m_clk_scale))));
    }
    function method_set_vsync(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_vsync ?? runtime.member("m_vsync"))) !== Number(state)) ? 1 : 0)) {
            members.m_vsync = ((state) | 0);
            runtime.invoke("m_out_vsync_cb", (members.m_vsync ?? runtime.member("m_vsync")));
        }
    }
    function method_set_de(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_de ?? runtime.member("m_de"))) !== Number(state)) ? 1 : 0)) {
            members.m_de = ((state) | 0);
            if ((members.m_de ?? runtime.member("m_de"))) {
                ((runtime.dereference(members.m_upd_adr_timer)).adjust?.(Infinity) ?? 0);
            }
            else {
                if ((((members.m_update_ready_bit ?? runtime.member("m_update_ready_bit"))) ? 0 : 1)) {
                    method_update_upd_adr_timer(runtime);
                }
            }
            runtime.invoke("m_out_de_cb", (members.m_de ?? runtime.member("m_de")));
        }
    }
    function method_update_upd_adr_timer(runtime) {
        const members = runtime.members;
        if (((((((members.m_de ?? runtime.member("m_de"))) ? 0 : 1)) && ((members.m_supports_transparent ?? runtime.member("m_supports_transparent")))) ? 1 : 0)) {
            ((runtime.dereference(members.m_upd_adr_timer)).adjust?.((members.m_upd_time ?? runtime.member("m_upd_time"))) ?? 0);
        }
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
    function method_set_cur(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_cur ?? runtime.member("m_cur"))) !== Number(state)) ? 1 : 0)) {
            members.m_cur = ((state) | 0);
            runtime.invoke("m_out_cur_cb", (members.m_cur ?? runtime.member("m_cur")));
        }
    }
    function method_cursor_off(runtime, param) {
        const members = runtime.members;
        method_set_cur(runtime, 0);
    }
    function method_hsync_on(runtime, param) {
        const members = runtime.members;
        let hsync_width = (((((((members.m_sync_width ?? runtime.member("m_sync_width"))) & (15))) ? ((((members.m_sync_width ?? runtime.member("m_sync_width"))) & (15))) : (16))) & 0xff);
        members.m_hsync_width_counter = ((0) & 0xff);
        method_set_hsync(runtime, 1);
        ((runtime.dereference(members.m_hsync_off_timer)).adjust?.(method_cclks_to_attotime(runtime, hsync_width)) ?? 0);
    }
    function method_set_hsync(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_hsync ?? runtime.member("m_hsync"))) !== Number(state)) ? 1 : 0)) {
            members.m_hsync = ((state) | 0);
            runtime.invoke("m_out_hsync_cb", (members.m_hsync ?? runtime.member("m_hsync")));
        }
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
        return (((((members.m_line_address ?? runtime.member("m_line_address"))) + ((members.m_character_counter ?? runtime.member("m_character_counter"))))) & (16383));
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
        const h_m_clk_scale = members.m_clk_scale ?? runtime.member("m_clk_scale");
        return runtime.divide((runtime.calls["attotime_to_clocks"] ? runtime.calls["attotime_to_clocks"](duration) : runtime.macro("attotime_to_clocks", duration)), h_m_clk_scale);
    }
    function method_call_on_update_address(runtime, strobe) {
        const members = runtime.members;
        if ((((runtime.calls["m_on_update_addr_changed_cb.isnull"]?.() ?? 0)) ? 0 : 1)) {
            ((runtime.dereference(members.m_upd_trans_timer)).adjust?.(0, (((((members.m_update_addr ?? runtime.member("m_update_addr"))) << (8))) | (strobe))) ?? 0);
        }
        else {
            (runtime.calls["fatalerror"] ? runtime.calls["fatalerror"]("M6845: transparent memory mode without handler\n") : runtime.macro("fatalerror", "M6845: transparent memory mode without handler\n"));
        }
    }
    return {
        "match_line": method_match_line,
        "update_cursor_state": method_update_cursor_state,
        "cclks_to_attotime": method_cclks_to_attotime,
        "set_vsync": method_set_vsync,
        "set_de": method_set_de,
        "update_upd_adr_timer": method_update_upd_adr_timer,
        "de_off_tick": method_de_off_tick,
        "cursor_on": method_cursor_on,
        "set_cur": method_set_cur,
        "cursor_off": method_cursor_off,
        "hsync_on": method_hsync_on,
        "set_hsync": method_set_hsync,
        "hsync_off": method_hsync_off,
        "latch_light_pen": method_latch_light_pen,
        "get_ma": method_get_ma,
        "update_counters": method_update_counters,
        "attotime_to_cclks": method_attotime_to_cclks,
        "call_on_update_address": method_call_on_update_address
    };
})();
export const device = definition;
export default device;
