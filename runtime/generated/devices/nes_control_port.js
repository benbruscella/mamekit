import deviceData from './nes_control_port.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read_exp(runtime, offset) {
        const members = runtime.members;
        let data = ((0) & 0xff);
        if ((members.m_device ?? runtime.member("m_device"))) {
            data = ((((runtime.dereference(members.m_device)).read_exp?.(offset) ?? 0)) & 0xff);
        }
        return data;
    }
    return {
        "read_exp": method_read_exp
    };
})();
definition.slot.options["joypad"].compiledMethods = (() => {
    function method_read_exp(runtime, offset) {
        const members = runtime.members;
        return 0;
    }
    function method_device_nes_control_port_interface__read_exp(runtime, offset) {
        const members = runtime.members;
        return 0;
    }
    return {
        "read_exp": method_read_exp,
        "device_nes_control_port_interface::read_exp": method_device_nes_control_port_interface__read_exp
    };
})();
export const device = definition;
export default device;
