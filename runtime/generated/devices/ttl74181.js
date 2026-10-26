import deviceData from './ttl74181.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_mode_w(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_m ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_m = ((state) | 0);
            method_update(runtime);
        }
    }
    function method_update(runtime) {
        const members = runtime.members;
        let a0 = ((((((members.m_a ?? 0)) >>> (0)) & 1)) | 0);
        let a1 = ((((((members.m_a ?? 0)) >>> (1)) & 1)) | 0);
        let a2 = ((((((members.m_a ?? 0)) >>> (2)) & 1)) | 0);
        let a3 = ((((((members.m_a ?? 0)) >>> (3)) & 1)) | 0);
        let b0 = ((((((members.m_b ?? 0)) >>> (0)) & 1)) | 0);
        let b1 = ((((((members.m_b ?? 0)) >>> (1)) & 1)) | 0);
        let b2 = ((((((members.m_b ?? 0)) >>> (2)) & 1)) | 0);
        let b3 = ((((((members.m_b ?? 0)) >>> (3)) & 1)) | 0);
        let s0 = ((((((members.m_s ?? 0)) >>> (0)) & 1)) | 0);
        let s1 = ((((((members.m_s ?? 0)) >>> (1)) & 1)) | 0);
        let s2 = ((((((members.m_s ?? 0)) >>> (2)) & 1)) | 0);
        let s3 = ((((((members.m_s ?? 0)) >>> (3)) & 1)) | 0);
        let mp = (((((members.m_m ?? 0)) ? 0 : 1)) | 0);
        let ap0 = ((((((((a0) | (((b0) & (s0))))) | (((s1) & ((~b0)))))) ? 0 : 1)) | 0);
        let bp0 = ((((((((((((b0) ? 0 : 1)) & (s2))) & (a0))) | (((((a0) & (b0))) & (s3))))) ? 0 : 1)) | 0);
        let ap1 = ((((((((a1) | (((b1) & (s0))))) | (((s1) & ((~b1)))))) ? 0 : 1)) | 0);
        let bp1 = ((((((((((((b1) ? 0 : 1)) & (s2))) & (a1))) | (((((a1) & (b1))) & (s3))))) ? 0 : 1)) | 0);
        let ap2 = ((((((((a2) | (((b2) & (s0))))) | (((s1) & ((~b2)))))) ? 0 : 1)) | 0);
        let bp2 = ((((((((((((b2) ? 0 : 1)) & (s2))) & (a2))) | (((((a2) & (b2))) & (s3))))) ? 0 : 1)) | 0);
        let ap3 = ((((((((a3) | (((b3) & (s0))))) | (((s1) & ((~b3)))))) ? 0 : 1)) | 0);
        let bp3 = ((((((((((((b3) ? 0 : 1)) & (s2))) & (a3))) | (((((a3) & (b3))) & (s3))))) ? 0 : 1)) | 0);
        let fp0 = (((((((((members.m_c ?? 0)) & (mp))) ? 0 : 1)) ^ (((((ap0) ? 0 : 1)) & (bp0))))) | 0);
        let fp1 = ((((((((((mp) & (ap0))) | (((((mp) & (bp0))) & ((members.m_c ?? 0)))))) ? 0 : 1)) ^ (((((ap1) ? 0 : 1)) & (bp1))))) | 0);
        let fp2 = ((((((((((((mp) & (ap1))) | (((((mp) & (ap0))) & (bp1))))) | (((((((mp) & ((members.m_c ?? 0)))) & (bp0))) & (bp1))))) ? 0 : 1)) ^ (((((ap2) ? 0 : 1)) & (bp2))))) | 0);
        let fp3 = ((((((((((((((mp) & (ap2))) | (((((mp) & (ap1))) & (bp2))))) | (((((((mp) & (ap0))) & (bp1))) & (bp2))))) | (((((((((mp) & ((members.m_c ?? 0)))) & (bp0))) & (bp1))) & (bp2))))) ? 0 : 1)) ^ (((((ap3) ? 0 : 1)) & (bp3))))) | 0);
        members.m_f = ((((((((fp0) | (((fp1) << (1))))) | (((fp2) << (2))))) | (((fp3) << (3))))) & 0xff);
        members.m_equals = ((((((((fp0) & (fp1))) & (fp2))) & (fp3))) | 0);
        members.m_p = ((((((((((bp0) & (bp1))) & (bp2))) & (bp3))) ? 0 : 1)) | 0);
        members.m_g = ((((((((((((((((ap0) & (bp1))) & (bp2))) & (bp3))) | (((((ap1) & (bp2))) & (bp3))))) | (((ap2) & (bp3))))) | (ap3))) ? 0 : 1)) | 0);
        members.m_cn = (((((((((((((((members.m_c ?? 0)) & (bp0))) & (bp1))) & (bp2))) & (bp3))) ? 0 : 1)) | ((members.m_g ?? 0)))) | 0);
    }
    function method_carry_w(runtime, state) {
        const members = runtime.members;
        if (((Number((members.m_c ?? 0)) !== Number(state)) ? 1 : 0)) {
            members.m_c = ((state) | 0);
            method_update(runtime);
        }
    }
    function method_function_r(runtime) {
        const members = runtime.members;
        return (((members.m_f ?? 0)) & 0xff);
    }
    function method_carry_r(runtime) {
        const members = runtime.members;
        return (members.m_cn ?? 0);
    }
    function method_generate_r(runtime) {
        const members = runtime.members;
        return (members.m_g ?? 0);
    }
    function method_propagate_r(runtime) {
        const members = runtime.members;
        return (members.m_p ?? 0);
    }
    function method_equals_r(runtime) {
        const members = runtime.members;
        return (members.m_equals ?? 0);
    }
    function method_ttl74181_device__function_r(runtime) {
        const members = runtime.members;
        return (((members.m_f ?? 0)) & 0xff);
    }
    function method_ttl74181_device__carry_r(runtime) {
        const members = runtime.members;
        return (members.m_cn ?? 0);
    }
    function method_ttl74181_device__generate_r(runtime) {
        const members = runtime.members;
        return (members.m_g ?? 0);
    }
    function method_ttl74181_device__propagate_r(runtime) {
        const members = runtime.members;
        return (members.m_p ?? 0);
    }
    function method_ttl74181_device__equals_r(runtime) {
        const members = runtime.members;
        return (members.m_equals ?? 0);
    }
    return {
        "mode_w": method_mode_w,
        "update": method_update,
        "carry_w": method_carry_w,
        "function_r": method_function_r,
        "carry_r": method_carry_r,
        "generate_r": method_generate_r,
        "propagate_r": method_propagate_r,
        "equals_r": method_equals_r,
        "ttl74181_device::function_r": method_ttl74181_device__function_r,
        "ttl74181_device::carry_r": method_ttl74181_device__carry_r,
        "ttl74181_device::generate_r": method_ttl74181_device__generate_r,
        "ttl74181_device::propagate_r": method_ttl74181_device__propagate_r,
        "ttl74181_device::equals_r": method_ttl74181_device__equals_r
    };
})();
export const device = definition;
export default device;
