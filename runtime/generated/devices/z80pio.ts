// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './z80pio.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_z80daisy_irq_ack(runtime: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    for (let index: any = ((0) | 0); ((Number(index) < Number(2)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
      let port: any = h_m_port[index];
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

  function method_check_interrupts(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_port = members.m_port ?? 0;
    let state: any = ((0) | 0);
    let ius: any = (((((h_m_port[0].m_ius) || (h_m_port[1].m_ius)) ? 1 : 0)) ? 1 : 0);
    for (let index: any = ((0) | 0); ((Number(index) < Number(2)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
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

  function method_z80daisy_irq_reti(runtime: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    for (let index: any = ((0) | 0); ((Number(index) < Number(2)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
      let port: any = h_m_port[index];
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

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    let index: any = (((((offset) >>> (0)) & 1)) | 0);
    return (((((((offset) >>> (1)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)))) & 0xff);
  }

  function method_control_read(runtime: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((((((h_m_port[0].m_icw) & (192))) | (runtime.shiftRight(h_m_port[1].m_icw, 4)))) & 0xff);
  }

  function method_data_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((((runtime.dereference(h_m_port[((offset) & (1))])).data_read?.() ?? runtime.container(h_m_port[((offset) & (1))], "data_read"))) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let index: any = (((((offset) >>> (0)) & 1)) | 0);
    if ((((offset) >>> (1)) & 1)) {
      method_control_write(runtime, index, data);
    } else {
      method_data_write(runtime, index, data);
    }
  }

  function method_control_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    ((runtime.dereference(h_m_port[((offset) & (1))])).control_write?.(data) ?? 0);
  }

  function method_data_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    ((runtime.dereference(h_m_port[((offset) & (1))])).data_write?.(data) ?? 0);
  }

  function method_read_alt(runtime: any, offset: any): any {
    const members = runtime.members;

    let index: any = (((((offset) >>> (1)) & 1)) | 0);
    return (((((((offset) >>> (0)) & 1)) ? (method_control_read(runtime)) : (method_data_read(runtime, index)))) & 0xff);
  }

  function method_write_alt(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let index: any = (((((offset) >>> (1)) & 1)) | 0);
    if ((((offset) >>> (0)) & 1)) {
      method_control_write(runtime, index, data);
    } else {
      method_data_write(runtime, index, data);
    }
  }

  function method_out_int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_int_cb)).bind === 'function' ? (runtime.dereference(members.m_out_int_cb)).bind() : typeof (runtime.dereference(members.m_out_int_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_int_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_int_cb)).bind : runtime.container(members.m_out_int_cb, "bind"));
  }

  function method_in_pa_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_pa_cb)).bind === 'function' ? (runtime.dereference(members.m_in_pa_cb)).bind() : typeof (runtime.dereference(members.m_in_pa_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_pa_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_pa_cb)).bind : runtime.container(members.m_in_pa_cb, "bind"));
  }

  function method_out_pa_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_pa_cb)).bind === 'function' ? (runtime.dereference(members.m_out_pa_cb)).bind() : typeof (runtime.dereference(members.m_out_pa_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_pa_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_pa_cb)).bind : runtime.container(members.m_out_pa_cb, "bind"));
  }

  function method_out_ardy_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_ardy_cb)).bind === 'function' ? (runtime.dereference(members.m_out_ardy_cb)).bind() : typeof (runtime.dereference(members.m_out_ardy_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_ardy_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_ardy_cb)).bind : runtime.container(members.m_out_ardy_cb, "bind"));
  }

  function method_in_pb_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_pb_cb)).bind === 'function' ? (runtime.dereference(members.m_in_pb_cb)).bind() : typeof (runtime.dereference(members.m_in_pb_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_pb_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_pb_cb)).bind : runtime.container(members.m_in_pb_cb, "bind"));
  }

  function method_out_pb_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_pb_cb)).bind === 'function' ? (runtime.dereference(members.m_out_pb_cb)).bind() : typeof (runtime.dereference(members.m_out_pb_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_pb_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_pb_cb)).bind : runtime.container(members.m_out_pb_cb, "bind"));
  }

  function method_out_brdy_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_brdy_cb)).bind === 'function' ? (runtime.dereference(members.m_out_brdy_cb)).bind() : typeof (runtime.dereference(members.m_out_brdy_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_brdy_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_brdy_cb)).bind : runtime.container(members.m_out_brdy_cb, "bind"));
  }

  function method_rdy(runtime: any, which: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((runtime.dereference(h_m_port[which])).rdy?.() ?? runtime.container(h_m_port[which], "rdy"));
  }

  function method_strobe_a(runtime: any, state: any): any {
    const members = runtime.members;

    method_strobe(runtime, 0, state);
  }

  function method_strobe(runtime: any, which: any, state: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    ((runtime.dereference(h_m_port[which])).strobe?.(state) ?? 0);
  }

  function method_strobe_b(runtime: any, state: any): any {
    const members = runtime.members;

    method_strobe(runtime, 1, state);
  }

  function method_port_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((((runtime.dereference(h_m_port[((offset) & (1))])).read?.() ?? runtime.container(h_m_port[((offset) & (1))], "read"))) & 0xff);
  }

  function method_pa0_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 0, state);
  }

  function method_port_write__3(runtime: any, offset: any, bit: any, state: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    method_port_write__2(runtime, offset, ((((h_m_port[((offset) & (1))].m_input) & ((~((1) << (bit)))))) | (((state) << (bit)))));
  }

  function method_port_write__2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    ((runtime.dereference(h_m_port[((offset) & (1))])).write?.(data) ?? 0);
  }

  function method_pa1_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 1, state);
  }

  function method_pa2_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 2, state);
  }

  function method_pa3_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 3, state);
  }

  function method_pa4_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 4, state);
  }

  function method_pa5_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 5, state);
  }

  function method_pa6_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 6, state);
  }

  function method_pa7_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 7, state);
  }

  function method_pb0_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 0, state);
  }

  function method_pb1_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 1, state);
  }

  function method_pb2_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 2, state);
  }

  function method_pb3_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 3, state);
  }

  function method_pb4_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 4, state);
  }

  function method_pb5_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 5, state);
  }

  function method_pb6_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 6, state);
  }

  function method_pb7_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 7, state);
  }

  function method_z80pio_device__out_int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_int_cb)).bind === 'function' ? (runtime.dereference(members.m_out_int_cb)).bind() : typeof (runtime.dereference(members.m_out_int_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_int_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_int_cb)).bind : runtime.container(members.m_out_int_cb, "bind"));
  }

  function method_z80pio_device__in_pa_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_pa_cb)).bind === 'function' ? (runtime.dereference(members.m_in_pa_cb)).bind() : typeof (runtime.dereference(members.m_in_pa_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_pa_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_pa_cb)).bind : runtime.container(members.m_in_pa_cb, "bind"));
  }

  function method_z80pio_device__out_pa_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_pa_cb)).bind === 'function' ? (runtime.dereference(members.m_out_pa_cb)).bind() : typeof (runtime.dereference(members.m_out_pa_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_pa_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_pa_cb)).bind : runtime.container(members.m_out_pa_cb, "bind"));
  }

  function method_z80pio_device__out_ardy_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_ardy_cb)).bind === 'function' ? (runtime.dereference(members.m_out_ardy_cb)).bind() : typeof (runtime.dereference(members.m_out_ardy_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_ardy_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_ardy_cb)).bind : runtime.container(members.m_out_ardy_cb, "bind"));
  }

  function method_z80pio_device__in_pb_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_pb_cb)).bind === 'function' ? (runtime.dereference(members.m_in_pb_cb)).bind() : typeof (runtime.dereference(members.m_in_pb_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_pb_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_pb_cb)).bind : runtime.container(members.m_in_pb_cb, "bind"));
  }

  function method_z80pio_device__out_pb_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_pb_cb)).bind === 'function' ? (runtime.dereference(members.m_out_pb_cb)).bind() : typeof (runtime.dereference(members.m_out_pb_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_pb_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_pb_cb)).bind : runtime.container(members.m_out_pb_cb, "bind"));
  }

  function method_z80pio_device__out_brdy_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_brdy_cb)).bind === 'function' ? (runtime.dereference(members.m_out_brdy_cb)).bind() : typeof (runtime.dereference(members.m_out_brdy_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_brdy_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_brdy_cb)).bind : runtime.container(members.m_out_brdy_cb, "bind"));
  }

  function method_z80pio_device__rdy(runtime: any, which: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((runtime.dereference(h_m_port[which])).rdy?.() ?? runtime.container(h_m_port[which], "rdy"));
  }

  function method_z80pio_device__strobe_a(runtime: any, state: any): any {
    const members = runtime.members;

    method_strobe(runtime, 0, state);
  }

  function method_z80pio_device__strobe_b(runtime: any, state: any): any {
    const members = runtime.members;

    method_strobe(runtime, 1, state);
  }

  function method_z80pio_device__data_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((((runtime.dereference(h_m_port[((offset) & (1))])).data_read?.() ?? runtime.container(h_m_port[((offset) & (1))], "data_read"))) & 0xff);
  }

  function method_z80pio_device__port_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_port = members.m_port ?? 0;
    return ((((runtime.dereference(h_m_port[((offset) & (1))])).read?.() ?? runtime.container(h_m_port[((offset) & (1))], "read"))) & 0xff);
  }

  function method_z80pio_device__pa0_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 0, state);
  }

  function method_z80pio_device__pa1_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 1, state);
  }

  function method_z80pio_device__pa2_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 2, state);
  }

  function method_z80pio_device__pa3_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 3, state);
  }

  function method_z80pio_device__pa4_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 4, state);
  }

  function method_z80pio_device__pa5_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 5, state);
  }

  function method_z80pio_device__pa6_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 6, state);
  }

  function method_z80pio_device__pa7_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 0, 7, state);
  }

  function method_z80pio_device__pb0_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 0, state);
  }

  function method_z80pio_device__pb1_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 1, state);
  }

  function method_z80pio_device__pb2_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 2, state);
  }

  function method_z80pio_device__pb3_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 3, state);
  }

  function method_z80pio_device__pb4_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 4, state);
  }

  function method_z80pio_device__pb5_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 5, state);
  }

  function method_z80pio_device__pb6_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_port_write__3(runtime, 1, 6, state);
  }

  function method_z80pio_device__pb7_w(runtime: any, state: any): any {
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
    "out_int_callback": method_out_int_callback,
    "in_pa_callback": method_in_pa_callback,
    "out_pa_callback": method_out_pa_callback,
    "out_ardy_callback": method_out_ardy_callback,
    "in_pb_callback": method_in_pb_callback,
    "out_pb_callback": method_out_pb_callback,
    "out_brdy_callback": method_out_brdy_callback,
    "rdy": method_rdy,
    "strobe_a": method_strobe_a,
    "strobe": method_strobe,
    "strobe_b": method_strobe_b,
    "port_read": method_port_read,
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
    "z80pio_device::out_int_callback": method_z80pio_device__out_int_callback,
    "z80pio_device::in_pa_callback": method_z80pio_device__in_pa_callback,
    "z80pio_device::out_pa_callback": method_z80pio_device__out_pa_callback,
    "z80pio_device::out_ardy_callback": method_z80pio_device__out_ardy_callback,
    "z80pio_device::in_pb_callback": method_z80pio_device__in_pb_callback,
    "z80pio_device::out_pb_callback": method_z80pio_device__out_pb_callback,
    "z80pio_device::out_brdy_callback": method_z80pio_device__out_brdy_callback,
    "z80pio_device::rdy": method_z80pio_device__rdy,
    "z80pio_device::strobe_a": method_z80pio_device__strobe_a,
    "z80pio_device::strobe_b": method_z80pio_device__strobe_b,
    "z80pio_device::data_read": method_z80pio_device__data_read,
    "z80pio_device::port_read": method_z80pio_device__port_read,
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
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_out_int_cb"];
definition.allocations!["pio_port"]!.compiledMethods = (() => {


  function method_start(runtime: any, device: any, index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_device = device;
    members.m_index = ((index) | 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_mode ?? 0)) : runtime.macro("NAME", (members.m_mode ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_next_control_word ?? 0)) : runtime.macro("NAME", (members.m_next_control_word ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_input ?? 0)) : runtime.macro("NAME", (members.m_input ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_output ?? 0)) : runtime.macro("NAME", (members.m_output ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_ior ?? 0)) : runtime.macro("NAME", (members.m_ior ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_rdy ?? 0)) : runtime.macro("NAME", (members.m_rdy ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_stb ?? 0)) : runtime.macro("NAME", (members.m_stb ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_ie ?? 0)) : runtime.macro("NAME", (members.m_ie ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_ip ?? 0)) : runtime.macro("NAME", (members.m_ip ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_ius ?? 0)) : runtime.macro("NAME", (members.m_ius ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_icw ?? 0)) : runtime.macro("NAME", (members.m_icw ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_vector ?? 0)) : runtime.macro("NAME", (members.m_vector ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_mask ?? 0)) : runtime.macro("NAME", (members.m_mask ?? 0))), (members.m_index ?? 0)) ?? 0);
    ((runtime.dereference(members.m_device)).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_match ?? 0)) : runtime.macro("NAME", (members.m_match ?? 0))), (members.m_index ?? 0)) ?? 0);
  }

  function method_reset(runtime: any): any {
    const members = runtime.members;

    method_set_mode(runtime, 1);
    members.m_icw = ((((members.m_icw) & (-129))) & 0xff);
    members.m_ie = ((0) ? 1 : 0);
    members.m_ip = ((0) ? 1 : 0);
    members.m_ius = ((0) ? 1 : 0);
    members.m_match = ((0) ? 1 : 0);
    members.m_ior = ((0) & 0xff);
    members.m_mask = ((255) & 0xff);
    members.m_output = ((0) & 0xff);
    method_set_rdy(runtime, 0);
  }

  function method_set_mode(runtime: any, mode: any): any {
    const members = runtime.members;

    switch ((mode as number)) {
      case 0:
      {
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
          ((runtime.dereference(members.m_device)).m_out_pa_cb?.(0, (members.m_output ?? 0)) ?? 0);
        } else {
          ((runtime.dereference(members.m_device)).m_out_pb_cb?.(0, (members.m_output ?? 0)) ?? 0);
        }
        method_set_rdy(runtime, 1);
        members.m_mode = ((mode) | 0);
        break;
      }
      case 1:
      {
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        members.m_mode = ((mode) | 0);
        break;
      }
      case 2:
      {
        if (((Number((members.m_index ?? 0)) === Number(1)) ? 1 : 0)) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        } else {
          if (0) {
            (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
          }
          members.m_mode = ((mode) | 0);
        }
        break;
      }
      case 3:
      {
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        if ((((((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) || (((Number(runtime.readIndex((members.m_device ?? 0).m_port, 0).m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
          method_set_rdy(runtime, 0);
        }
        members.m_ie = ((0) ? 1 : 0);
        method_check_interrupts(runtime);
        members.m_match = ((0) ? 1 : 0);
        members.m_next_control_word = ((1) | 0);
        members.m_mode = ((mode) | 0);
        break;
      }
    }
  }

  function method_set_rdy(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number((members.m_rdy ?? 0)) === Number(state)) ? 1 : 0)) {
      return;
    }
    if (0) {
      (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
    }
    members.m_rdy = ((state) ? 1 : 0);
    if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
      ((runtime.dereference(members.m_device)).m_out_ardy_cb?.(state) ?? 0);
    } else {
      ((runtime.dereference(members.m_device)).m_out_brdy_cb?.(state) ?? 0);
    }
  }

  function method_check_interrupts(runtime: any): any {
    const members = runtime.members;

    (typeof (runtime.dereference(members.m_device)).check_interrupts === 'function' ? (runtime.dereference(members.m_device)).check_interrupts() : typeof (runtime.dereference(members.m_device)).check_interrupts === 'number' || typeof (runtime.dereference(members.m_device)).check_interrupts === 'boolean' ? (runtime.dereference(members.m_device)).check_interrupts : runtime.container(members.m_device, "check_interrupts"));
  }

  function method_trigger_interrupt(runtime: any): any {
    const members = runtime.members;

    members.m_ip = ((1) ? 1 : 0);
    if (0) {
      (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
    }
    method_check_interrupts(runtime);
  }

  function method_strobe(runtime: any, state: any): any {
    const members = runtime.members;

    if (0) {
      (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
    }
    if (((Number(runtime.readIndex((members.m_device ?? 0).m_port, 0).m_mode) === Number(2)) ? 1 : 0)) {
      if ((members.m_rdy ?? 0)) {
        if (((((members.m_stb ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
          if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
            ((runtime.dereference(members.m_device)).m_out_pa_cb?.(0, (members.m_output ?? 0)) ?? 0);
          } else {
            runtime.readIndex((members.m_device ?? 0).m_port, 0).m_input = ((runtime.dereference(members.m_device)).m_in_pa_cb?.(0) ?? 0);
          }
        } else {
          if (((((((members.m_stb ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
            method_trigger_interrupt(runtime);
            method_set_rdy(runtime, 0);
          }
        }
      }
    } else {
      switch (((members.m_mode ?? 0) as number)) {
        case 0:
        {
          if ((members.m_rdy ?? 0)) {
            if (((((((members.m_stb ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
              method_trigger_interrupt(runtime);
              method_set_rdy(runtime, 0);
            }
          }
          break;
        }
        case 1:
        {
          if (((state) ? 0 : 1)) {
            if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
              members.m_input = ((((runtime.dereference(members.m_device)).m_in_pa_cb?.(0) ?? 0)) & 0xff);
            } else {
              members.m_input = ((((runtime.dereference(members.m_device)).m_in_pb_cb?.(0) ?? 0)) & 0xff);
            }
          } else {
            if (((((((members.m_stb ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
              method_trigger_interrupt(runtime);
              method_set_rdy(runtime, 0);
            }
          }
          break;
        }
      }
    }
    members.m_stb = ((state) ? 1 : 0);
  }

  function method_read(runtime: any): any {
    const members = runtime.members;

    let data: any = ((255) & 0xff);
    switch (((members.m_mode ?? 0) as number)) {
      case 0:
      {
        data = (((members.m_output ?? 0)) & 0xff);
        break;
      }
      case 2:
      {
        if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
          data = (((members.m_output ?? 0)) & 0xff);
        }
        break;
      }
      case 3:
      {
        data = (((((members.m_ior ?? 0)) | ((((members.m_output ?? 0)) & ((((members.m_ior ?? 0)) ^ (255))))))) & 0xff);
        break;
      }
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, data: any): any {
    const members = runtime.members;

    if (((Number((members.m_mode ?? 0)) === Number(3)) ? 1 : 0)) {
      members.m_input = ((data) & 0xff);
      let data__1: any = (((((((members.m_input ?? 0)) & ((members.m_ior ?? 0)))) | ((((members.m_output ?? 0)) & ((~(members.m_ior ?? 0))))))) & 0xff);
      let mask: any = (((~(members.m_mask ?? 0))) & 0xff);
      let match: any = ((0) ? 1 : 0);
      data__1 = ((((data__1) & (mask))) & 0xff);
      switch (((((members.m_icw ?? 0)) & (96)) as number)) {
        case 0:
        {
          match = ((((Number(data__1) !== Number(mask)) ? 1 : 0)) ? 1 : 0);
          break;
        }
        case 32:
        {
          match = ((((Number(data__1) !== Number(0)) ? 1 : 0)) ? 1 : 0);
          break;
        }
        case 64:
        {
          match = ((((Number(data__1) === Number(0)) ? 1 : 0)) ? 1 : 0);
          break;
        }
        case 96:
        {
          match = ((((Number(data__1) === Number(mask)) ? 1 : 0)) ? 1 : 0);
          break;
        }
      }
      if ((((((((((members.m_match ?? 0)) ? 0 : 1)) && (match)) ? 1 : 0)) && ((((members.m_ius ?? 0)) ? 0 : 1))) ? 1 : 0)) {
        members.m_ip = ((1) ? 1 : 0);
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
      }
      members.m_match = ((match) ? 1 : 0);
      method_check_interrupts(runtime);
    }
  }

  function method_control_write(runtime: any, data: any): any {
    const members = runtime.members;

    switch (((members.m_next_control_word ?? 0) as number)) {
      case 0:
      {
        if ((((((data) >>> (0)) & 1)) ? 0 : 1)) {
          members.m_vector = ((data) & 0xff);
          if (0) {
            (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
          }
        } else {
          switch ((((data) & (15)) as number)) {
            case 15:
            {
              method_set_mode(runtime, ((data) >>> (6)));
              break;
            }
            case 7:
            {
              members.m_icw = ((data) & 0xff);
              if (0) {
                (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
                (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
                (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
                (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
              }
              if ((((members.m_icw ?? 0)) & (16))) {
                members.m_ie = ((0) ? 1 : 0);
                members.m_ip = ((0) ? 1 : 0);
                method_check_interrupts(runtime);
                members.m_match = ((0) ? 1 : 0);
                members.m_next_control_word = ((2) | 0);
              } else {
                members.m_ie = ((((((((members.m_icw ?? 0)) >>> (7)) & 1)) ? (1) : (0))) ? 1 : 0);
                method_check_interrupts(runtime);
              }
              break;
            }
            case 3:
            {
              members.m_icw = ((((((data) & (128))) | ((((members.m_icw ?? 0)) & (127))))) & 0xff);
              if (0) {
                (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
              }
              members.m_ie = ((((((((members.m_icw ?? 0)) >>> (7)) & 1)) ? (1) : (0))) ? 1 : 0);
              method_check_interrupts(runtime);
              break;
            }
            default:
            {
              (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
            }
          }
        }
        break;
      }
      case 1:
      {
        members.m_ior = ((data) & 0xff);
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        members.m_ie = ((((((((members.m_icw ?? 0)) >>> (7)) & 1)) ? (1) : (0))) ? 1 : 0);
        method_check_interrupts(runtime);
        members.m_next_control_word = ((0) | 0);
        break;
      }
      case 2:
      {
        members.m_mask = ((data) & 0xff);
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        members.m_ie = ((((((((members.m_icw ?? 0)) >>> (7)) & 1)) ? (1) : (0))) ? 1 : 0);
        method_check_interrupts(runtime);
        members.m_next_control_word = ((0) | 0);
        break;
      }
    }
  }

  function method_data_read(runtime: any): any {
    const members = runtime.members;

    let data: any = ((0) & 0xff);
    switch (((members.m_mode ?? 0) as number)) {
      case 0:
      {
        data = (((members.m_output ?? 0)) & 0xff);
        break;
      }
      case 1:
      {
        if ((((members.m_stb ?? 0)) ? 0 : 1)) {
          if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_input = ((((runtime.dereference(members.m_device)).m_in_pa_cb?.(0) ?? 0)) & 0xff);
          } else {
            members.m_input = ((((runtime.dereference(members.m_device)).m_in_pb_cb?.(0) ?? 0)) & 0xff);
          }
          if (0) {
            (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
          }
        }
        data = (((members.m_input ?? 0)) & 0xff);
        method_set_rdy(runtime, 0);
        method_set_rdy(runtime, 1);
        break;
      }
      case 2:
      {
        data = (((members.m_input ?? 0)) & 0xff);
        ((runtime.dereference(runtime.readIndex((members.m_device ?? 0).m_port, 1))).set_rdy?.(0) ?? 0);
        ((runtime.dereference(runtime.readIndex((members.m_device ?? 0).m_port, 1))).set_rdy?.(1) ?? 0);
        break;
      }
      case 3:
      {
        if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
          members.m_input = ((((runtime.dereference(members.m_device)).m_in_pa_cb?.(0) ?? 0)) & 0xff);
        } else {
          members.m_input = ((((runtime.dereference(members.m_device)).m_in_pb_cb?.(0) ?? 0)) & 0xff);
        }
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        data = (((((((members.m_input ?? 0)) & ((members.m_ior ?? 0)))) | ((((members.m_output ?? 0)) & ((((members.m_ior ?? 0)) ^ (255))))))) & 0xff);
        break;
      }
    }
    return ((data) & 0xff);
  }

  function method_data_write(runtime: any, data: any): any {
    const members = runtime.members;

    switch (((members.m_mode ?? 0) as number)) {
      case 0:
      {
        method_set_rdy(runtime, 0);
        members.m_output = ((data) & 0xff);
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
          ((runtime.dereference(members.m_device)).m_out_pa_cb?.(0, (members.m_output ?? 0)) ?? 0);
        } else {
          ((runtime.dereference(members.m_device)).m_out_pb_cb?.(0, (members.m_output ?? 0)) ?? 0);
        }
        method_set_rdy(runtime, 1);
        break;
      }
      case 1:
      {
        members.m_output = ((data) & 0xff);
        break;
      }
      case 2:
      {
        method_set_rdy(runtime, 0);
        members.m_output = ((data) & 0xff);
        if ((((members.m_stb ?? 0)) ? 0 : 1)) {
          if (0) {
            (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
          }
          if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
            ((runtime.dereference(members.m_device)).m_out_pa_cb?.(0, data) ?? 0);
          } else {
            ((runtime.dereference(members.m_device)).m_out_pb_cb?.(0, data) ?? 0);
          }
        }
        method_set_rdy(runtime, 1);
        break;
      }
      case 3:
      {
        members.m_output = ((data) & 0xff);
        if (0) {
          (typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'function' ? (runtime.dereference(members.m_device)).TRACE_NOOP() : typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'number' || typeof (runtime.dereference(members.m_device)).TRACE_NOOP === 'boolean' ? (runtime.dereference(members.m_device)).TRACE_NOOP : runtime.container(members.m_device, "TRACE_NOOP"));
        }
        if (((Number((members.m_index ?? 0)) === Number(0)) ? 1 : 0)) {
          ((runtime.dereference(members.m_device)).m_out_pa_cb?.(0, (((members.m_ior ?? 0)) | ((((members.m_output ?? 0)) & ((((members.m_ior ?? 0)) ^ (255))))))) ?? 0);
        } else {
          ((runtime.dereference(members.m_device)).m_out_pb_cb?.(0, (((members.m_ior ?? 0)) | ((((members.m_output ?? 0)) & ((((members.m_ior ?? 0)) ^ (255))))))) ?? 0);
        }
        break;
      }
    }
  }

  function method_rdy(runtime: any): any {
    const members = runtime.members;

    return (members.m_rdy ?? 0);
  }

  function method_z80pio_device__pio_port__rdy(runtime: any): any {
    const members = runtime.members;

    return (members.m_rdy ?? 0);
  }

  function method_z80pio_device__pio_port__check_interrupts(runtime: any): any {
    const members = runtime.members;

    (typeof (runtime.dereference(members.m_device)).check_interrupts === 'function' ? (runtime.dereference(members.m_device)).check_interrupts() : typeof (runtime.dereference(members.m_device)).check_interrupts === 'number' || typeof (runtime.dereference(members.m_device)).check_interrupts === 'boolean' ? (runtime.dereference(members.m_device)).check_interrupts : runtime.container(members.m_device, "check_interrupts"));
  }

  function method___construct(runtime: any): any {
    const members = runtime.members;

    members.m_device = 0;
    members.m_index = ((0) | 0);
    members.m_mode = ((0) | 0);
    members.m_next_control_word = ((0) | 0);
    members.m_input = ((0) & 0xff);
    members.m_output = ((0) & 0xff);
    members.m_ior = ((0) & 0xff);
    members.m_rdy = ((0) ? 1 : 0);
    members.m_stb = ((0) ? 1 : 0);
    members.m_ie = ((0) ? 1 : 0);
    members.m_ip = ((0) ? 1 : 0);
    members.m_ius = ((0) ? 1 : 0);
    members.m_icw = ((0) & 0xff);
    members.m_vector = ((0) & 0xff);
    members.m_mask = ((0) & 0xff);
    members.m_match = ((0) ? 1 : 0);
  }
  return {
    "start": method_start,
    "reset": method_reset,
    "set_mode": method_set_mode,
    "set_rdy": method_set_rdy,
    "check_interrupts": method_check_interrupts,
    "trigger_interrupt": method_trigger_interrupt,
    "strobe": method_strobe,
    "read": method_read,
    "write": method_write,
    "control_write": method_control_write,
    "data_read": method_data_read,
    "data_write": method_data_write,
    "rdy": method_rdy,
    "z80pio_device::pio_port::rdy": method_z80pio_device__pio_port__rdy,
    "z80pio_device::pio_port::check_interrupts": method_z80pio_device__pio_port__check_interrupts,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;
definition.allocations!["pio_port"]!.compiledMethodLinks = ["NAME"];

export const device = definition;
export default device;
