import deviceData from './toaplan_scu.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_set_colorbase(runtime, base) {
        const members = runtime.members;
        members.m_colbase = ((base) & 0xffff);
    }
    function method_toaplan_scu_device__set_colorbase(runtime, base) {
        const members = runtime.members;
        members.m_colbase = ((base) & 0xffff);
    }
    return {
        "set_colorbase": method_set_colorbase,
        "toaplan_scu_device::set_colorbase": method_toaplan_scu_device__set_colorbase
    };
})();
export const device = definition;
export default device;
