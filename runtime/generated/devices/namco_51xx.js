import deviceData from './namco_51xx.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_K_r(runtime) {
        const members = runtime.members;
        return ((((members.m_rw) << (3))) | (((members.m_portO) & (7))));
    }
    function method_R_r_0(runtime) {
        const members = runtime.members;
        return runtime.readIndex(members.m_in, 0)();
    }
    function method_R_r_1(runtime) {
        const members = runtime.members;
        return runtime.readIndex(members.m_in, 1)();
    }
    function method_R_r_2(runtime) {
        const members = runtime.members;
        return runtime.readIndex(members.m_in, 2)();
    }
    function method_R_r_3(runtime) {
        const members = runtime.members;
        return runtime.readIndex(members.m_in, 3)();
    }
    function method_P_w(runtime, data) {
        const members = runtime.members;
        runtime.invoke("m_out", data);
    }
    function method_rw_sync(runtime, param) {
        const members = runtime.members;
        members.m_rw = ((param) & 0xff);
    }
    function method_write_sync(runtime, param) {
        const members = runtime.members;
        members.m_portO = ((param) & 0xff);
    }
    function method_O_w_sync(runtime, param) {
        const members = runtime.members;
        members.m_portO = ((param) & 0xff);
    }
    return {
        "K_r": method_K_r,
        "R_r_0": method_R_r_0,
        "R_r_1": method_R_r_1,
        "R_r_2": method_R_r_2,
        "R_r_3": method_R_r_3,
        "P_w": method_P_w,
        "rw_sync": method_rw_sync,
        "write_sync": method_write_sync,
        "O_w_sync": method_O_w_sync
    };
})();
export const device = definition;
export default device;
