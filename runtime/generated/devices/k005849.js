import deviceData from './k005849.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_ctrl_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        offset = runtime.andAssign(offset, 7);
        if (((Number(offset) === Number(4)) ? 1 : 0)) {
            if (((((((~data)) & ((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]))) >>> (1)) & 1)) {
                (__l["m_irq_cb"] ? __l["m_irq_cb"](Number(0)) : typeof members.m_irq_cb === 'function' ? members.m_irq_cb(0) : runtime.invoke("m_irq_cb", 0));
            }
            if (((((((~data)) & ((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]))) >>> (2)) & 1)) {
                (__l["m_firq_cb"] ? __l["m_firq_cb"](Number(0)) : typeof members.m_firq_cb === 'function' ? members.m_firq_cb(0) : runtime.invoke("m_firq_cb", 0));
            }
            if (((((((~data)) & ((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]))) >>> (0)) & 1)) {
                (__l["m_nmi_cb"] ? __l["m_nmi_cb"](Number(0)) : typeof members.m_nmi_cb === 'function' ? members.m_nmi_cb(0) : runtime.invoke("m_nmi_cb", 0));
            }
            if ((((((data) ^ ((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]))) >>> (3)) & 1)) {
                members.m_flipscreen = (((((data) >>> (3)) & 1)) ? 1 : 0);
                (__l["m_flipscreen_cb"] ? __l["m_flipscreen_cb"](Number((((data) >>> (3)) & 1))) : typeof members.m_flipscreen_cb === 'function' ? members.m_flipscreen_cb((((data) >>> (3)) & 1)) : runtime.invoke("m_flipscreen_cb", (((data) >>> (3)) & 1)));
            }
        }
        (members.m_ctrlram ?? runtime.member("m_ctrlram"))[offset] = data;
    }
    function method_scanline(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let scanline = ((param) | 0);
        if ((((((((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]) >>> (0)) & 1)) && (((Number(((scanline) & (31))) === Number(16)) ? 1 : 0))) ? 1 : 0)) {
            (__l["m_nmi_cb"] ? __l["m_nmi_cb"](Number(1)) : typeof members.m_nmi_cb === 'function' ? members.m_nmi_cb(1) : runtime.invoke("m_nmi_cb", 1));
        }
        if (((Number(scanline) === Number(240)) ? 1 : 0)) {
            if ((((((((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]) >>> (2)) & 1)) && ((((__l["screen().frame_number"]?.() ?? 0)) & (1)))) ? 1 : 0)) {
                (__l["m_firq_cb"] ? __l["m_firq_cb"](Number(1)) : typeof members.m_firq_cb === 'function' ? members.m_firq_cb(1) : runtime.invoke("m_firq_cb", 1));
            }
            if (((((members.m_ctrlram ?? runtime.member("m_ctrlram"))[4]) >>> (1)) & 1)) {
                (__l["m_irq_cb"] ? __l["m_irq_cb"](Number(1)) : typeof members.m_irq_cb === 'function' ? members.m_irq_cb(1) : runtime.invoke("m_irq_cb", 1));
            }
        }
        scanline = ((((scanline) + (16))) | 0);
        if (((Number(scanline) >= Number((__l["screen().height"]?.() ?? 0))) ? 1 : 0)) {
            scanline = ((0) | 0);
        }
        ((runtime.dereference(members.m_scanline_timer)).adjust?.((__l["screen().time_until_pos"]?.(scanline) ?? 0), scanline) ?? 0);
    }
    function method_ctrl_r(runtime, offset) {
        const members = runtime.members;
        return (members.m_ctrlram ?? runtime.member("m_ctrlram"))[((offset) & (7))];
    }
    function method_scroll_r(runtime, offset) {
        const members = runtime.members;
        return (members.m_scrollram ?? runtime.member("m_scrollram"))[((offset) & (63))];
    }
    function method_scroll_w(runtime, offset, data) {
        const members = runtime.members;
        (members.m_scrollram ?? runtime.member("m_scrollram"))[((offset) & (63))] = data;
    }
    function method_k005849_device__ctrl_r(runtime, offset) {
        const members = runtime.members;
        return (members.m_ctrlram ?? runtime.member("m_ctrlram"))[((offset) & (7))];
    }
    function method_k005849_device__scroll_r(runtime, offset) {
        const members = runtime.members;
        return (members.m_scrollram ?? runtime.member("m_scrollram"))[((offset) & (63))];
    }
    function method_k005849_device__scroll_w(runtime, offset, data) {
        const members = runtime.members;
        (members.m_scrollram ?? runtime.member("m_scrollram"))[((offset) & (63))] = data;
    }
    return {
        "ctrl_w": method_ctrl_w,
        "scanline": method_scanline,
        "ctrl_r": method_ctrl_r,
        "scroll_r": method_scroll_r,
        "scroll_w": method_scroll_w,
        "k005849_device::ctrl_r": method_k005849_device__ctrl_r,
        "k005849_device::scroll_r": method_k005849_device__scroll_r,
        "k005849_device::scroll_w": method_k005849_device__scroll_w
    };
})();
definition.compiledMethodLinks = ["m_firq_cb", "m_flipscreen_cb", "m_irq_cb", "m_nmi_cb", "screen", "screen().frame_number", "screen().height", "screen().time_until_pos"];
export const device = definition;
export default device;
