import deviceData from './z80pio.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read(runtime, offset) {
        const members = runtime.members;
        let index = (((offset) >>> (0)) & 1);
        return (((((offset) >>> (1)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)));
    }
    function method_control_read(runtime) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        return ((((h_m_port[0].m_icw) & (192))) | (((h_m_port[1].m_icw) >>> (4))));
    }
    function method_data_read(runtime, offset) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        return ((runtime.dereference(h_m_port[((offset) & (1))])).data_read?.() ?? runtime.container(h_m_port[((offset) & (1))], "data_read"));
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        let index = (((offset) >>> (0)) & 1);
        if ((((offset) >>> (1)) & 1)) {
            method_control_write(runtime, index, data);
        }
        else {
            method_data_write(runtime, index, data);
        }
    }
    function method_control_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        ((runtime.dereference(h_m_port[((offset) & (1))])).control_write?.(data) ?? 0);
    }
    function method_data_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        ((runtime.dereference(h_m_port[((offset) & (1))])).data_write?.(data) ?? 0);
    }
    function method_read_alt(runtime, offset) {
        const members = runtime.members;
        let index = (((offset) >>> (1)) & 1);
        return (((((offset) >>> (0)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)));
    }
    function method_write_alt(runtime, offset, data) {
        const members = runtime.members;
        let index = (((offset) >>> (1)) & 1);
        if ((((offset) >>> (0)) & 1)) {
            method_control_write(runtime, index, data);
        }
        else {
            method_data_write(runtime, index, data);
        }
    }
    return {
        "read": method_read,
        "control_read": method_control_read,
        "data_read": method_data_read,
        "write": method_write,
        "control_write": method_control_write,
        "data_write": method_data_write,
        "read_alt": method_read_alt,
        "write_alt": method_write_alt
    };
})();
export const device = definition;
export default device;
