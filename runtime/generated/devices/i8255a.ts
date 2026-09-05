// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './i8255a.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    switch (((offset) & (3))) {
      case 0:
      {
        switch (method_group_mode(runtime, 0)) {
          case 0:
          {
            data = ((method_read_mode0(runtime, 0)) & 0xff);
            break;
          }
          case 1:
          {
            data = ((method_read_mode1(runtime, 0)) & 0xff);
            break;
          }
          case 2:
          {
            data = ((method_read_mode2(runtime)) & 0xff);
            break;
          }
        }
        0;
        break;
      }
      case 1:
      {
        switch (method_group_mode(runtime, 1)) {
          case 0:
          {
            data = ((method_read_mode0(runtime, 1)) & 0xff);
            break;
          }
          case 1:
          {
            data = ((method_read_mode1(runtime, 1)) & 0xff);
            break;
          }
        }
        0;
        break;
      }
      case 2:
      {
        data = ((method_read_pc(runtime)) & 0xff);
        0;
        break;
      }
      case 3:
      {
        data = (((members.m_control ?? runtime.member("m_control"))) & 0xff);
        0;
        break;
      }
    }
    return data;
  }

  function method_group_mode(runtime: any, group: any) {
    const members = runtime.members;
    let mode: any = 0;
    switch (group) {
      case 0:
      {
        switch ((((((members.m_control ?? runtime.member("m_control"))) & (96))) >>> (5))) {
          case 0:
          {
            mode = 0;
            break;
          }
          case 1:
          {
            mode = 1;
            break;
          }
          case 2:
          case 3:
          {
            mode = 2;
            break;
          }
        }
        break;
      }
      case 1:
      {
        mode = (((((members.m_control ?? runtime.member("m_control"))) & (4))) ? (1) : (0));
        break;
      }
    }
    return mode;
  }

  function method_read_mode0(runtime: any, port: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
      data = (((members.m_output ?? runtime.member("m_output"))[port]) & 0xff);
    } else {
      data = ((((((Number(port) === Number(0)) ? 1 : 0)) ? (runtime.invoke("m_in_pa_cb", 0)) : (((((Number(port) === Number(1)) ? 1 : 0)) ? (runtime.invoke("m_in_pb_cb", 0)) : (runtime.invoke("m_in_pc_cb", 0)))))) & 0xff);
    }
    return data;
  }

  function method_port_mode(runtime: any, port: any) {
    const members = runtime.members;
    let mode: any = 0;
    switch (port) {
      case 0:
      {
        mode = (((((members.m_control ?? runtime.member("m_control"))) & (16))) ? (1) : (0));
        break;
      }
      case 1:
      {
        mode = (((((members.m_control ?? runtime.member("m_control"))) & (2))) ? (1) : (0));
        break;
      }
    }
    return mode;
  }

  function method_read_mode1(runtime: any, port: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
      data = (((members.m_output ?? runtime.member("m_output"))[port]) & 0xff);
    } else {
      data = (((members.m_input ?? runtime.member("m_input"))[port]) & 0xff);
      if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
        method_set_ibf(runtime, port, 0);
        method_set_intr(runtime, port, 0);
        (members.m_input ?? runtime.member("m_input"))[port] = 0;
      }
    }
    return data;
  }

  function method_set_ibf(runtime: any, port: any, state: any) {
    const members = runtime.members;
    0;
    (members.m_ibf ?? runtime.member("m_ibf"))[port] = state;
    method_check_interrupt(runtime, port);
  }

  function method_check_interrupt(runtime: any, port: any) {
    const members = runtime.members;
    switch (method_group_mode(runtime, port)) {
      case 1:
      {
        switch (method_port_mode(runtime, port)) {
          case 1:
          {
            method_set_intr(runtime, port, ((((members.m_inte ?? runtime.member("m_inte"))[port]) && ((members.m_ibf ?? runtime.member("m_ibf"))[port])) ? 1 : 0));
            break;
          }
          case 0:
          {
            method_set_intr(runtime, port, ((((members.m_inte ?? runtime.member("m_inte"))[port]) && ((members.m_obf ?? runtime.member("m_obf"))[port])) ? 1 : 0));
            break;
          }
        }
        break;
      }
      case 2:
      {
        method_set_intr(runtime, port, (((((((members.m_inte1 ?? runtime.member("m_inte1"))) && ((members.m_obf ?? runtime.member("m_obf"))[port])) ? 1 : 0)) || (((((members.m_inte2 ?? runtime.member("m_inte2"))) && ((members.m_ibf ?? runtime.member("m_ibf"))[port])) ? 1 : 0))) ? 1 : 0));
        break;
      }
    }
  }

  function method_set_intr(runtime: any, port: any, state: any) {
    const members = runtime.members;
    0;
    (members.m_intr ?? runtime.member("m_intr"))[port] = state;
    method_output_pc(runtime);
  }

  function method_output_pc(runtime: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    let mask: any = ((0) & 0xff);
    let b_mask: any = ((15) & 0xff);
    switch (method_group_mode(runtime, 0)) {
      case 0:
      {
        if (((Number(method_port_c_upper_mode(runtime)) === Number(0)) ? 1 : 0)) {
          mask = ((((mask) | (240))) & 0xff);
        } else {
          data = ((((data) | (((runtime.invoke("m_tri_pc_cb", 0)) & (240))))) & 0xff);
        }
        break;
      }
      case 1:
      {
        data = ((((data) | ((((members.m_intr ?? runtime.member("m_intr"))[0]) ? (8) : (0))))) & 0xff);
        if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_obf ?? runtime.member("m_obf"))[0]) ? (128) : (0))))) & 0xff);
          mask = ((((mask) | (48))) & 0xff);
        } else {
          data = ((((data) | ((((members.m_ibf ?? runtime.member("m_ibf"))[0]) ? (32) : (0))))) & 0xff);
          mask = ((((mask) | (192))) & 0xff);
        }
        break;
      }
      case 2:
      {
        b_mask = ((7) & 0xff);
        data = ((((data) | ((((members.m_intr ?? runtime.member("m_intr"))[0]) ? (8) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_ibf ?? runtime.member("m_ibf"))[0]) ? (32) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_obf ?? runtime.member("m_obf"))[0]) ? (128) : (0))))) & 0xff);
        break;
      }
    }
    switch (method_group_mode(runtime, 1)) {
      case 0:
      {
        if (((Number(method_port_c_lower_mode(runtime)) === Number(0)) ? 1 : 0)) {
          mask = ((((mask) | (b_mask))) & 0xff);
        } else {
          data = ((((data) | (((runtime.invoke("m_tri_pc_cb", 0)) & (b_mask))))) & 0xff);
        }
        break;
      }
      case 1:
      {
        data = ((((data) | ((((members.m_intr ?? runtime.member("m_intr"))[1]) ? (1) : (0))))) & 0xff);
        if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_obf ?? runtime.member("m_obf"))[1]) ? (2) : (0))))) & 0xff);
        } else {
          data = ((((data) | ((((members.m_ibf ?? runtime.member("m_ibf"))[1]) ? (2) : (0))))) & 0xff);
        }
      }
    }
    data = ((((data) | ((((members.m_output ?? runtime.member("m_output"))[2]) & (mask))))) & 0xff);
    runtime.invoke("m_out_pc_cb", 0, data);
  }

  function method_port_c_upper_mode(runtime: any) {
    const members = runtime.members;
    return (((((members.m_control ?? runtime.member("m_control"))) & (8))) ? (1) : (0));
  }

  function method_port_c_lower_mode(runtime: any) {
    const members = runtime.members;
    return (((((members.m_control ?? runtime.member("m_control"))) & (1))) ? (1) : (0));
  }

  function method_read_mode2(runtime: any) {
    const members = runtime.members;
    let data: any = (((members.m_input ?? runtime.member("m_input"))[0]) & 0xff);
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      method_set_ibf(runtime, 0, 0);
      method_set_intr(runtime, 0, 0);
      (members.m_input ?? runtime.member("m_input"))[0] = 0;
    }
    return data;
  }

  function method_read_pc(runtime: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    let mask: any = ((0) & 0xff);
    let b_mask: any = ((15) & 0xff);
    switch (method_group_mode(runtime, 0)) {
      case 0:
      {
        if (((Number(method_port_c_upper_mode(runtime)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_output ?? runtime.member("m_output"))[2]) & (240))))) & 0xff);
        } else {
          mask = ((((mask) | (240))) & 0xff);
        }
        break;
      }
      case 1:
      {
        data = ((((data) | ((((members.m_intr ?? runtime.member("m_intr"))[0]) ? (8) : (0))))) & 0xff);
        if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_obf ?? runtime.member("m_obf"))[0]) ? (128) : (0))))) & 0xff);
          data = ((((data) | ((((members.m_inte ?? runtime.member("m_inte"))[0]) ? (64) : (0))))) & 0xff);
          mask = ((((mask) | (48))) & 0xff);
        } else {
          data = ((((data) | ((((members.m_ibf ?? runtime.member("m_ibf"))[0]) ? (32) : (0))))) & 0xff);
          data = ((((data) | ((((members.m_inte ?? runtime.member("m_inte"))[0]) ? (16) : (0))))) & 0xff);
          mask = ((((mask) | (192))) & 0xff);
        }
        if (((Number(method_port_c_upper_mode(runtime)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_output ?? runtime.member("m_output"))[2]) & (mask))))) & 0xff);
          mask = ((0) & 0xff);
        }
        break;
      }
      case 2:
      {
        b_mask = ((7) & 0xff);
        data = ((((data) | ((((members.m_intr ?? runtime.member("m_intr"))[0]) ? (8) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_inte2 ?? runtime.member("m_inte2"))) ? (16) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_ibf ?? runtime.member("m_ibf"))[0]) ? (32) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_inte1 ?? runtime.member("m_inte1"))) ? (64) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_obf ?? runtime.member("m_obf"))[0]) ? (128) : (0))))) & 0xff);
        break;
      }
    }
    switch (method_group_mode(runtime, 1)) {
      case 0:
      {
        if (((Number(method_port_c_lower_mode(runtime)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_output ?? runtime.member("m_output"))[2]) & (b_mask))))) & 0xff);
        } else {
          mask = ((((mask) | (b_mask))) & 0xff);
        }
        break;
      }
      case 1:
      {
        data = ((((data) | ((((members.m_inte ?? runtime.member("m_inte"))[1]) ? (4) : (0))))) & 0xff);
        data = ((((data) | ((((members.m_intr ?? runtime.member("m_intr"))[1]) ? (1) : (0))))) & 0xff);
        if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
          data = ((((data) | ((((members.m_obf ?? runtime.member("m_obf"))[1]) ? (2) : (0))))) & 0xff);
        } else {
          data = ((((data) | ((((members.m_ibf ?? runtime.member("m_ibf"))[1]) ? (2) : (0))))) & 0xff);
        }
      }
    }
    if (mask) {
      data = ((((data) | (((runtime.invoke("m_in_pc_cb", 0)) & (mask))))) & 0xff);
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    switch (((offset) & (3))) {
      case 0:
      {
        0;
        switch (method_group_mode(runtime, 0)) {
          case 0:
          {
            method_write_mode0(runtime, 0, data);
            break;
          }
          case 1:
          {
            method_write_mode1(runtime, 0, data);
            break;
          }
          case 2:
          {
            method_write_mode2(runtime, data);
            break;
          }
        }
        break;
      }
      case 1:
      {
        0;
        switch (method_group_mode(runtime, 1)) {
          case 0:
          {
            method_write_mode0(runtime, 1, data);
            break;
          }
          case 1:
          {
            method_write_mode1(runtime, 1, data);
            break;
          }
        }
        break;
      }
      case 2:
      {
        0;
        (members.m_output ?? runtime.member("m_output"))[2] = data;
        method_output_pc(runtime);
        break;
      }
      case 3:
      {
        if (((data) & (128))) {
          0;
          method_set_mode(runtime, data);
        } else {
          let bit: any = ((((data) >>> (1))) & (7));
          let state: any = (((data) >>> (0)) & 1);
          0;
          method_set_pc_bit(runtime, bit, state);
        }
        break;
      }
    }
  }

  function method_write_mode0(runtime: any, port: any, data: any) {
    const members = runtime.members;
    if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
      (members.m_output ?? runtime.member("m_output"))[port] = data;
      if (((Number(port) === Number(0)) ? 1 : 0)) {
        runtime.invoke("m_out_pa_cb", 0, (members.m_output ?? runtime.member("m_output"))[port]);
      } else {
        runtime.invoke("m_out_pb_cb", 0, (members.m_output ?? runtime.member("m_output"))[port]);
      }
    }
  }

  function method_write_mode1(runtime: any, port: any, data: any) {
    const members = runtime.members;
    if (((Number(method_port_mode(runtime, port)) === Number(0)) ? 1 : 0)) {
      (members.m_output ?? runtime.member("m_output"))[port] = data;
      if (((Number(port) === Number(0)) ? 1 : 0)) {
        runtime.invoke("m_out_pa_cb", 0, (members.m_output ?? runtime.member("m_output"))[port]);
      } else {
        runtime.invoke("m_out_pb_cb", 0, (members.m_output ?? runtime.member("m_output"))[port]);
      }
      method_set_obf(runtime, port, 0);
      method_set_intr(runtime, port, 0);
    }
  }

  function method_set_obf(runtime: any, port: any, state: any) {
    const members = runtime.members;
    0;
    (members.m_obf ?? runtime.member("m_obf"))[port] = state;
    method_check_interrupt(runtime, port);
  }

  function method_write_mode2(runtime: any, data: any) {
    const members = runtime.members;
    (members.m_output ?? runtime.member("m_output"))[0] = data;
    runtime.invoke("m_out_pa_cb", 0, data);
    method_set_obf(runtime, 0, 0);
    method_set_intr(runtime, 0, 0);
  }

  function method_set_mode(runtime: any, data: any) {
    const members = runtime.members;
    const h_m_force_portb_in = members.m_force_portb_in ?? runtime.member("m_force_portb_in");
    const h_m_force_portc_out = members.m_force_portc_out ?? runtime.member("m_force_portc_out");
    const h_m_dont_clear_output_latches = members.m_dont_clear_output_latches ?? runtime.member("m_dont_clear_output_latches");
    members.m_control = ((data) & 0xff);
    if (h_m_force_portb_in) {
      members.m_control = (((((members.m_control ?? runtime.member("m_control"))) | (2))) & 0xff);
    }
    if (h_m_force_portc_out) {
      members.m_control = (((((members.m_control ?? runtime.member("m_control"))) & ((~8)))) & 0xff);
      members.m_control = (((((members.m_control ?? runtime.member("m_control"))) & ((~1)))) & 0xff);
    }
    if (((h_m_dont_clear_output_latches) ? 0 : 1)) {
      (members.m_output ?? runtime.member("m_output"))[0] = 0;
    }
    (members.m_input ?? runtime.member("m_input"))[0] = 0;
    (members.m_ibf ?? runtime.member("m_ibf"))[0] = 0;
    (members.m_obf ?? runtime.member("m_obf"))[0] = 1;
    (members.m_inte ?? runtime.member("m_inte"))[0] = 0;
    members.m_inte1 = ((0) | 0);
    members.m_inte2 = ((0) | 0);
    if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
      runtime.invoke("m_out_pa_cb", 0, (members.m_output ?? runtime.member("m_output"))[0]);
      (members.m_ibf ?? runtime.member("m_ibf"))[0] = 1;
    } else {
      runtime.invoke("m_out_pa_cb", 0, runtime.invoke("m_tri_pa_cb", 0));
    }
    0;
    0;
    0;
    0;
    0;
    0;
    if (((h_m_dont_clear_output_latches) ? 0 : 1)) {
      (members.m_output ?? runtime.member("m_output"))[1] = 0;
    }
    (members.m_input ?? runtime.member("m_input"))[1] = 0;
    (members.m_ibf ?? runtime.member("m_ibf"))[1] = 0;
    (members.m_obf ?? runtime.member("m_obf"))[1] = 1;
    (members.m_inte ?? runtime.member("m_inte"))[1] = 0;
    if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
      runtime.invoke("m_out_pb_cb", 0, (members.m_output ?? runtime.member("m_output"))[1]);
    } else {
      runtime.invoke("m_out_pb_cb", 0, runtime.invoke("m_tri_pb_cb", 0));
    }
    if (((h_m_dont_clear_output_latches) ? 0 : 1)) {
      (members.m_output ?? runtime.member("m_output"))[2] = 0;
    }
    (members.m_input ?? runtime.member("m_input"))[2] = 0;
    method_output_pc(runtime);
  }

  function method_set_pc_bit(runtime: any, bit: any, state: any) {
    const members = runtime.members;
    (members.m_output ?? runtime.member("m_output"))[2] = runtime.andAssign((members.m_output ?? runtime.member("m_output"))[2], (~((1) << (bit))));
    (members.m_output ?? runtime.member("m_output"))[2] = (((members.m_output ?? runtime.member("m_output"))[2]) | (((state) << (bit))));
    switch (method_group_mode(runtime, 0)) {
      case 1:
      {
        if (((Number(method_port_mode(runtime, 0)) === Number(0)) ? 1 : 0)) {
          switch (bit) {
            case 3:
            {
              method_set_intr(runtime, 0, state);
              break;
            }
            case 6:
            {
              method_set_inte(runtime, 0, state);
              break;
            }
            case 7:
            {
              method_set_obf(runtime, 0, state);
              break;
            }
            default:
            {
              break;
            }
          }
        } else {
          switch (bit) {
            case 3:
            {
              method_set_intr(runtime, 0, state);
              break;
            }
            case 4:
            {
              method_set_inte(runtime, 0, state);
              break;
            }
            case 5:
            {
              method_set_ibf(runtime, 0, state);
              break;
            }
            default:
            {
              break;
            }
          }
        }
        break;
      }
      case 2:
      {
        switch (bit) {
          case 3:
          {
            method_set_intr(runtime, 0, state);
            break;
          }
          case 4:
          {
            method_set_inte2(runtime, state);
            break;
          }
          case 5:
          {
            method_set_ibf(runtime, 0, state);
            break;
          }
          case 6:
          {
            method_set_inte1(runtime, state);
            break;
          }
          case 7:
          {
            method_set_obf(runtime, 0, state);
            break;
          }
          default:
          {
            break;
          }
        }
        break;
      }
    }
    if (((Number(method_group_mode(runtime, 1)) === Number(1)) ? 1 : 0)) {
      switch (bit) {
        case 0:
        {
          method_set_intr(runtime, 1, state);
          break;
        }
        case 1:
        {
          if (((Number(method_port_mode(runtime, 1)) === Number(0)) ? 1 : 0)) {
            method_set_obf(runtime, 1, state);
          } else {
            method_set_ibf(runtime, 1, state);
          }
          break;
        }
        case 2:
        {
          method_set_inte(runtime, 1, state);
          break;
        }
        default:
        {
          break;
        }
      }
    }
    method_output_pc(runtime);
  }

  function method_set_inte(runtime: any, port: any, state: any) {
    const members = runtime.members;
    0;
    (members.m_inte ?? runtime.member("m_inte"))[port] = state;
    method_check_interrupt(runtime, port);
  }

  function method_set_inte2(runtime: any, state: any) {
    const members = runtime.members;
    0;
    members.m_inte2 = ((state) | 0);
    method_check_interrupt(runtime, 0);
  }

  function method_set_inte1(runtime: any, state: any) {
    const members = runtime.members;
    0;
    members.m_inte1 = ((state) | 0);
    method_check_interrupt(runtime, 0);
  }
  return {
    "read": method_read,
    "group_mode": method_group_mode,
    "read_mode0": method_read_mode0,
    "port_mode": method_port_mode,
    "read_mode1": method_read_mode1,
    "set_ibf": method_set_ibf,
    "check_interrupt": method_check_interrupt,
    "set_intr": method_set_intr,
    "output_pc": method_output_pc,
    "port_c_upper_mode": method_port_c_upper_mode,
    "port_c_lower_mode": method_port_c_lower_mode,
    "read_mode2": method_read_mode2,
    "read_pc": method_read_pc,
    "write": method_write,
    "write_mode0": method_write_mode0,
    "write_mode1": method_write_mode1,
    "set_obf": method_set_obf,
    "write_mode2": method_write_mode2,
    "set_mode": method_set_mode,
    "set_pc_bit": method_set_pc_bit,
    "set_inte": method_set_inte,
    "set_inte2": method_set_inte2,
    "set_inte1": method_set_inte1
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
