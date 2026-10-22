import deviceData from './z80pio.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_z80daisy_irq_ack(runtime) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
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
        const h_m_port = members.m_port ?? 0;
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
        const h_m_port = members.m_port ?? 0;
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
        return (((((((offset) >>> (1)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)))) & 0xff);
    }
    function method_control_read(runtime) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
        return ((((((h_m_port[0].m_icw) & (192))) | (runtime.shiftRight(h_m_port[1].m_icw, 4)))) & 0xff);
    }
    function method_data_read(runtime, offset) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
        return ((((runtime.dereference(h_m_port[((offset) & (1))])).data_read?.() ?? runtime.container(h_m_port[((offset) & (1))], "data_read"))) & 0xff);
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
        const h_m_port = members.m_port ?? 0;
        ((runtime.dereference(h_m_port[((offset) & (1))])).control_write?.(data) ?? 0);
    }
    function method_data_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
        ((runtime.dereference(h_m_port[((offset) & (1))])).data_write?.(data) ?? 0);
    }
    function method_read_alt(runtime, offset) {
        const members = runtime.members;
        let index = (((((offset) >>> (1)) & 1)) | 0);
        return (((((((offset) >>> (0)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)))) & 0xff);
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
    function method_strobe_a(runtime, state) {
        const members = runtime.members;
        method_strobe(runtime, 0, state);
    }
    function method_strobe(runtime, which, state) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
        ((runtime.dereference(h_m_port[which])).strobe?.(state) ?? 0);
    }
    function method_strobe_b(runtime, state) {
        const members = runtime.members;
        method_strobe(runtime, 1, state);
    }
    function method_pa0_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 0, state);
    }
    function method_port_write__3(runtime, offset, bit, state) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
        method_port_write__2(runtime, offset, ((((h_m_port[((offset) & (1))].m_input) & ((~((1) << (bit)))))) | (((state) << (bit)))));
    }
    function method_port_write__2(runtime, offset, data) {
        const members = runtime.members;
        const h_m_port = members.m_port ?? 0;
        ((runtime.dereference(h_m_port[((offset) & (1))])).write?.(data) ?? 0);
    }
    function method_pa1_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 1, state);
    }
    function method_pa2_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 2, state);
    }
    function method_pa3_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 3, state);
    }
    function method_pa4_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 4, state);
    }
    function method_pa5_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 5, state);
    }
    function method_pa6_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 6, state);
    }
    function method_pa7_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 7, state);
    }
    function method_pb0_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 0, state);
    }
    function method_pb1_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 1, state);
    }
    function method_pb2_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 2, state);
    }
    function method_pb3_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 3, state);
    }
    function method_pb4_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 4, state);
    }
    function method_pb5_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 5, state);
    }
    function method_pb6_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 6, state);
    }
    function method_pb7_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 7, state);
    }
    function method_z80pio_device__strobe_a(runtime, state) {
        const members = runtime.members;
        method_strobe(runtime, 0, state);
    }
    function method_z80pio_device__strobe_b(runtime, state) {
        const members = runtime.members;
        method_strobe(runtime, 1, state);
    }
    function method_z80pio_device__pa0_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 0, state);
    }
    function method_z80pio_device__pa1_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 1, state);
    }
    function method_z80pio_device__pa2_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 2, state);
    }
    function method_z80pio_device__pa3_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 3, state);
    }
    function method_z80pio_device__pa4_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 4, state);
    }
    function method_z80pio_device__pa5_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 5, state);
    }
    function method_z80pio_device__pa6_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 6, state);
    }
    function method_z80pio_device__pa7_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 0, 7, state);
    }
    function method_z80pio_device__pb0_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 0, state);
    }
    function method_z80pio_device__pb1_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 1, state);
    }
    function method_z80pio_device__pb2_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 2, state);
    }
    function method_z80pio_device__pb3_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 3, state);
    }
    function method_z80pio_device__pb4_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 4, state);
    }
    function method_z80pio_device__pb5_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 5, state);
    }
    function method_z80pio_device__pb6_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 6, state);
    }
    function method_z80pio_device__pb7_w(runtime, state) {
        const members = runtime.members;
        method_port_write__3(runtime, 1, 7, state);
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
        "write_alt": method_write_alt,
        "strobe_a": method_strobe_a,
        "strobe": method_strobe,
        "strobe_b": method_strobe_b,
        "pa0_w": method_pa0_w,
        "port_write__3": method_port_write__3,
        "port_write__2": method_port_write__2,
        "pa1_w": method_pa1_w,
        "pa2_w": method_pa2_w,
        "pa3_w": method_pa3_w,
        "pa4_w": method_pa4_w,
        "pa5_w": method_pa5_w,
        "pa6_w": method_pa6_w,
        "pa7_w": method_pa7_w,
        "pb0_w": method_pb0_w,
        "pb1_w": method_pb1_w,
        "pb2_w": method_pb2_w,
        "pb3_w": method_pb3_w,
        "pb4_w": method_pb4_w,
        "pb5_w": method_pb5_w,
        "pb6_w": method_pb6_w,
        "pb7_w": method_pb7_w,
        "z80pio_device::strobe_a": method_z80pio_device__strobe_a,
        "z80pio_device::strobe_b": method_z80pio_device__strobe_b,
        "z80pio_device::pa0_w": method_z80pio_device__pa0_w,
        "z80pio_device::pa1_w": method_z80pio_device__pa1_w,
        "z80pio_device::pa2_w": method_z80pio_device__pa2_w,
        "z80pio_device::pa3_w": method_z80pio_device__pa3_w,
        "z80pio_device::pa4_w": method_z80pio_device__pa4_w,
        "z80pio_device::pa5_w": method_z80pio_device__pa5_w,
        "z80pio_device::pa6_w": method_z80pio_device__pa6_w,
        "z80pio_device::pa7_w": method_z80pio_device__pa7_w,
        "z80pio_device::pb0_w": method_z80pio_device__pb0_w,
        "z80pio_device::pb1_w": method_z80pio_device__pb1_w,
        "z80pio_device::pb2_w": method_z80pio_device__pb2_w,
        "z80pio_device::pb3_w": method_z80pio_device__pb3_w,
        "z80pio_device::pb4_w": method_z80pio_device__pb4_w,
        "z80pio_device::pb5_w": method_z80pio_device__pb5_w,
        "z80pio_device::pb6_w": method_z80pio_device__pb6_w,
        "z80pio_device::pb7_w": method_z80pio_device__pb7_w
    };
})();
definition.compiledMethodLinks = ["m_out_int_cb"];
export const device = definition;
export default device;
