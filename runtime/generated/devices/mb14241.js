import deviceData from './mb14241.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_shift_count_w(runtime, data) {
        const members = runtime.members;
        members.m_shift_count = (((((~data)) & (7))) & 0xff);
    }
    function method_shift_data_w(runtime, data) {
        const members = runtime.members;
        members.m_shift_data = (((((((members.m_shift_data ?? 0)) >>> (8))) | (((((data) & 0xffff)) << (7))))) & 0xffff);
    }
    function method_shift_result_r(runtime) {
        const members = runtime.members;
        return (((((((((members.m_shift_data ?? 0)) >>> ((members.m_shift_count ?? 0)))) & (255))) & 0xff)) & 0xff);
    }
    return {
        "shift_count_w": method_shift_count_w,
        "shift_data_w": method_shift_data_w,
        "shift_result_r": method_shift_result_r
    };
})();
export const device = definition;
export default device;
