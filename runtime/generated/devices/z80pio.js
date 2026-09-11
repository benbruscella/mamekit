import deviceData from './z80pio.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_z80daisy_irq_ack(runtime) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        for (let index = ((0) | 0); ((Number(index) < Number(2)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
            let port = h_m_port[index];
            if (port.m_ip) {
                if (0) {
                    0;
                }
                port.m_ip = 0;
                port.m_ius = 1;
                method_check_interrupts(runtime);
                return port.m_vector;
            }
        }
        return 0;
    }
    function method_check_interrupts(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        let state = ((0) | 0);
        let ius = (((((h_m_port[0].m_ius) || (h_m_port[1].m_ius)) ? 1 : 0)) ? 1 : 0);
        for (let index = ((0) | 0); ((Number(index) < Number(2)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
            if (0) {
                0;
            }
            if (((((((((ius) ? 0 : 1)) && (h_m_port[index].m_ie)) ? 1 : 0)) && (h_m_port[index].m_ip)) ? 1 : 0)) {
                state = ((1) | 0);
            }
        }
        if (0) {
            0;
        }
        (__l["m_out_int_cb"] ? __l["m_out_int_cb"](Number(state)) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb(state) : runtime.invoke("m_out_int_cb", state));
    }
    function method_z80daisy_irq_reti(runtime) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? runtime.member("m_port");
        for (let index = ((0) | 0); ((Number(index) < Number(2)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
            let port = h_m_port[index];
            if (port.m_ius) {
                if (0) {
                    0;
                }
                port.m_ius = 0;
                method_check_interrupts(runtime);
                return;
            }
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let index = (((((offset) >>> (0)) & 1)) | 0);
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
        let index = (((((offset) >>> (0)) & 1)) | 0);
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
        let index = (((((offset) >>> (1)) & 1)) | 0);
        return (((((offset) >>> (0)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)));
    }
    function method_write_alt(runtime, offset, data) {
        const members = runtime.members;
        let index = (((((offset) >>> (1)) & 1)) | 0);
        if ((((offset) >>> (0)) & 1)) {
            method_control_write(runtime, index, data);
        }
        else {
            method_data_write(runtime, index, data);
        }
    }
    return {
        "z80daisy_irq_ack": method_z80daisy_irq_ack,
        "check_interrupts": method_check_interrupts,
        "z80daisy_irq_reti": method_z80daisy_irq_reti,
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
definition.compiledMethodLinks = ["m_out_int_cb"];
export const device = definition;
export default device;
