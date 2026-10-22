import deviceData from './adc0804.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_rd_w(runtime, state) {
        const members = runtime.members;
        0;
        if ((((((state) ? 0 : 1)) && ((((members.m_rd_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_rd_active = ((1) ? 1 : 0);
            method_set_interrupt(runtime, 0);
        }
        else {
            if ((((state) && ((members.m_rd_active ?? 0))) ? 1 : 0)) {
                members.m_rd_active = ((0) ? 1 : 0);
            }
        }
    }
    function method_set_interrupt(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_intr_active ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_intr_active = ((state) ? 1 : 0);
            (__l["m_intr_callback"] ? __l["m_intr_callback"](Number(((state) ? (1) : (0)))) : typeof members.m_intr_callback === 'function' ? members.m_intr_callback(((state) ? (1) : (0))) : runtime.invoke("m_intr_callback", ((state) ? (1) : (0))));
        }
    }
    function method_wr_w(runtime, state) {
        const members = runtime.members;
        if ((((((state) ? 0 : 1)) && ((((members.m_wr_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            members.m_wr_active = ((1) ? 1 : 0);
            method_set_interrupt(runtime, 0);
        }
        else {
            if ((((state) && ((members.m_wr_active ?? 0))) ? 1 : 0)) {
                members.m_wr_active = ((0) ? 1 : 0);
                method_conversion_start(runtime);
            }
        }
    }
    function method_conversion_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((typeof (runtime.dereference(members.m_timer)).enabled === 'function' ? (runtime.dereference(members.m_timer)).enabled() : typeof (runtime.dereference(members.m_timer)).enabled === 'number' || typeof (runtime.dereference(members.m_timer)).enabled === 'boolean' ? (runtime.dereference(members.m_timer)).enabled : runtime.container(members.m_timer, "enabled"))) ? 0 : 1)) {
            ((runtime.dereference(members.m_timer)).adjust?.(((((Number((members.m_fclk_rc ?? 0)) !== Number(0)) ? 1 : 0)) ? ((((members.m_fclk_rc ?? 0)) * (74))) : ((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](74) : runtime.macro("clocks_to_attotime", 74))))) ?? 0);
        }
        else {
            0;
        }
    }
    function method_conversion_done(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_result = (((__l["m_vin_callback"] ? __l["m_vin_callback"]() : typeof members.m_vin_callback === 'function' ? members.m_vin_callback() : runtime.invoke("m_vin_callback"))) & 0xff);
        if (((((((members.m_rd_active ?? 0)) ? 0 : 1)) && ((((members.m_wr_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_set_interrupt(runtime, 1);
        }
    }
    function method_intr_r(runtime) {
        const members = runtime.members;
        return (((members.m_intr_active ?? 0)) ? (0) : (1));
    }
    function method_adc0804_device__intr_r(runtime) {
        const members = runtime.members;
        return (((members.m_intr_active ?? 0)) ? (0) : (1));
    }
    return {
        "rd_w": method_rd_w,
        "set_interrupt": method_set_interrupt,
        "wr_w": method_wr_w,
        "conversion_start": method_conversion_start,
        "conversion_done": method_conversion_done,
        "intr_r": method_intr_r,
        "adc0804_device::intr_r": method_adc0804_device__intr_r
    };
})();
definition.compiledMethodLinks = ["clocks_to_attotime", "m_intr_callback", "m_vin_callback"];
export const device = definition;
export default device;
