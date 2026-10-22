import deviceData from './ttl153.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_s0_w(runtime, state) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s[0] = ((state) ? 1 : 0);
        method_update_a(runtime);
        method_update_b(runtime);
    }
    function method_update_a(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_ia = members.m_ia ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_z = members.m_z ?? 0;
        let za = ((0) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[0]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[1]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[2]) && (h_m_s[1])) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        za = ((((za) | (((((((h_m_ia[3]) && (h_m_s[1])) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        if (((Number(za) !== Number(h_m_z[0])) ? 1 : 0)) {
            (__l["m_za_cb"] ? __l["m_za_cb"](Number(((za) ? (1) : (0)))) : typeof members.m_za_cb === 'function' ? members.m_za_cb(((za) ? (1) : (0))) : runtime.invoke("m_za_cb", ((za) ? (1) : (0))));
        }
        h_m_z[0] = za;
    }
    function method_update_b(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_ib = members.m_ib ?? 0;
        const h_m_s = members.m_s ?? 0;
        const h_m_z = members.m_z ?? 0;
        let zb = ((0) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[0]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[1]) && (((h_m_s[1]) ? 0 : 1))) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[2]) && (h_m_s[1])) ? 1 : 0)) && (((h_m_s[0]) ? 0 : 1))) ? 1 : 0)))) ? 1 : 0);
        zb = ((((zb) | (((((((h_m_ib[3]) && (h_m_s[1])) ? 1 : 0)) && (h_m_s[0])) ? 1 : 0)))) ? 1 : 0);
        if (((Number(zb) !== Number(h_m_z[1])) ? 1 : 0)) {
            (__l["m_zb_cb"] ? __l["m_zb_cb"](Number(((zb) ? (1) : (0)))) : typeof members.m_zb_cb === 'function' ? members.m_zb_cb(((zb) ? (1) : (0))) : runtime.invoke("m_zb_cb", ((zb) ? (1) : (0))));
        }
        h_m_z[1] = zb;
    }
    function method_s1_w(runtime, state) {
        const members = runtime.members;
        const h_m_s = members.m_s ?? 0;
        h_m_s[1] = ((state) ? 1 : 0);
        method_update_a(runtime);
        method_update_b(runtime);
    }
    function method_i0a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[0] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i1a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[1] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i2a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[2] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i3a_w(runtime, state) {
        const members = runtime.members;
        const h_m_ia = members.m_ia ?? 0;
        h_m_ia[3] = ((state) ? 1 : 0);
        method_update_a(runtime);
    }
    function method_i0b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[0] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_i1b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[1] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_i2b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[2] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_i3b_w(runtime, state) {
        const members = runtime.members;
        const h_m_ib = members.m_ib ?? 0;
        h_m_ib[3] = ((state) ? 1 : 0);
        method_update_b(runtime);
    }
    function method_za_r(runtime) {
        const members = runtime.members;
        const h_m_z = members.m_z ?? 0;
        return ((h_m_z[0]) ? (1) : (0));
    }
    function method_zb_r(runtime) {
        const members = runtime.members;
        const h_m_z = members.m_z ?? 0;
        return ((h_m_z[1]) ? (1) : (0));
    }
    return {
        "s0_w": method_s0_w,
        "update_a": method_update_a,
        "update_b": method_update_b,
        "s1_w": method_s1_w,
        "i0a_w": method_i0a_w,
        "i1a_w": method_i1a_w,
        "i2a_w": method_i2a_w,
        "i3a_w": method_i3a_w,
        "i0b_w": method_i0b_w,
        "i1b_w": method_i1b_w,
        "i2b_w": method_i2b_w,
        "i3b_w": method_i3b_w,
        "za_r": method_za_r,
        "zb_r": method_zb_r
    };
})();
definition.compiledMethodLinks = ["m_za_cb", "m_zb_cb"];
export const device = definition;
export default device;
