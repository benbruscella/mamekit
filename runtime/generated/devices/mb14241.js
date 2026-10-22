import deviceData from './mb14241.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_shift_result_r(runtime) {
        const members = runtime.members;
        return ((((((runtime.shiftRight((members.m_shift_data ?? 0), (members.m_shift_count ?? 0))) & (255))) & 0xff)) & 0xff);
    }
    return {
        "shift_result_r": method_shift_result_r
    };
})();
export const device = definition;
export default device;
