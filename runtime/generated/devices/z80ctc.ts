// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './z80ctc.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let ch: any = ((((offset) & (3))) | 0);
    return ((h_m_channel[ch].m_down) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let ch: any = ((((offset) & (3))) | 0);
    if (((Number(((h_m_channel[ch].m_mode) & (4))) === Number(4)) ? 1 : 0)) {
      h_m_channel[ch].m_tconst = ((data) ? (data) : (256));
      h_m_channel[ch].m_mode = runtime.andAssign(h_m_channel[ch].m_mode, -5);
      h_m_channel[ch].m_mode = runtime.andAssign(h_m_channel[ch].m_mode, -3);
      h_m_channel[ch].m_down = h_m_channel[ch].m_tconst;
    } else {
      if ((((((Number(((data) & (1))) === Number(0)) ? 1 : 0)) && (((Number(ch) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
        members.m_vector = ((((data) & (248))) & 0xff);
      } else {
        if (((Number(((data) & (1))) === Number(1)) ? 1 : 0)) {
          h_m_channel[ch].m_mode = data;
          if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
            h_m_channel[ch].m_int_state = runtime.andAssign(h_m_channel[ch].m_int_state, -2);
          }
          method_interrupt_check(runtime);
        }
      }
    }
  }

  function method_interrupt_check(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let state: any = ((method_z80daisy_irq_state(runtime)) | 0);
    (__l["m_intr_cb"] ? __l["m_intr_cb"](Number(((((state) & (1))) ? (1) : (0)))) : typeof members.m_intr_cb === 'function' ? members.m_intr_cb(((((state) & (1))) ? (1) : (0))) : runtime.invoke("m_intr_cb", ((((state) & (1))) ? (1) : (0))));
  }

  function method_z80daisy_irq_state(runtime: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let state: any = ((0) | 0);
    for (let ch: any = ((0) | 0); ((Number(ch) < Number(4)) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
      if (((h_m_channel[ch].m_int_state) & (2))) {
        state = ((((state) | (2))) | 0);
        break;
      }
      state = ((((state) | (h_m_channel[ch].m_int_state))) | 0);
    }
    return state;
  }

  function method_trg0(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let state_value: any = ((((state) ? (1) : (0))) | 0);
    if (((Number(state_value) !== Number(h_m_channel[0].m_extclk)) ? 1 : 0)) {
      h_m_channel[0].m_extclk = state_value;
      if (((((((((Number(((h_m_channel[0].m_mode) & (16))) === Number(16)) ? 1 : 0)) && (state_value)) ? 1 : 0)) || ((((((Number(((h_m_channel[0].m_mode) & (16))) === Number(0)) ? 1 : 0)) && (((state_value) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
        h_m_channel[0].m_mode = runtime.andAssign(h_m_channel[0].m_mode, -257);
        if (((Number(((h_m_channel[0].m_mode) & (64))) === Number(64)) ? 1 : 0)) {
          h_m_channel[0].m_down = ((h_m_channel[0].m_down) - (1));
          if (((Number(h_m_channel[0].m_down) === Number(0)) ? 1 : 0)) {
            if (((Number(((h_m_channel[0].m_mode) & (128))) === Number(128)) ? 1 : 0)) {
              h_m_channel[0].m_int_state = ((h_m_channel[0].m_int_state) | (1));
              method_interrupt_check(runtime);
            }
            (members.m_zc_cb ?? 0)[0](1);
            (members.m_zc_cb ?? 0)[0](0);
            h_m_channel[0].m_down = h_m_channel[0].m_tconst;
          }
        }
      }
    }
  }

  function method_trg1(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let state_value: any = ((((state) ? (1) : (0))) | 0);
    if (((Number(state_value) !== Number(h_m_channel[1].m_extclk)) ? 1 : 0)) {
      h_m_channel[1].m_extclk = state_value;
      if (((((((((Number(((h_m_channel[1].m_mode) & (16))) === Number(16)) ? 1 : 0)) && (state_value)) ? 1 : 0)) || ((((((Number(((h_m_channel[1].m_mode) & (16))) === Number(0)) ? 1 : 0)) && (((state_value) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
        h_m_channel[1].m_mode = runtime.andAssign(h_m_channel[1].m_mode, -257);
        if (((Number(((h_m_channel[1].m_mode) & (64))) === Number(64)) ? 1 : 0)) {
          h_m_channel[1].m_down = ((h_m_channel[1].m_down) - (1));
          if (((Number(h_m_channel[1].m_down) === Number(0)) ? 1 : 0)) {
            if (((Number(((h_m_channel[1].m_mode) & (128))) === Number(128)) ? 1 : 0)) {
              h_m_channel[1].m_int_state = ((h_m_channel[1].m_int_state) | (1));
              method_interrupt_check(runtime);
            }
            (members.m_zc_cb ?? 0)[1](1);
            (members.m_zc_cb ?? 0)[1](0);
            h_m_channel[1].m_down = h_m_channel[1].m_tconst;
          }
        }
      }
    }
  }

  function method_trg2(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let state_value: any = ((((state) ? (1) : (0))) | 0);
    if (((Number(state_value) !== Number(h_m_channel[2].m_extclk)) ? 1 : 0)) {
      h_m_channel[2].m_extclk = state_value;
      if (((((((((Number(((h_m_channel[2].m_mode) & (16))) === Number(16)) ? 1 : 0)) && (state_value)) ? 1 : 0)) || ((((((Number(((h_m_channel[2].m_mode) & (16))) === Number(0)) ? 1 : 0)) && (((state_value) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
        h_m_channel[2].m_mode = runtime.andAssign(h_m_channel[2].m_mode, -257);
        if (((Number(((h_m_channel[2].m_mode) & (64))) === Number(64)) ? 1 : 0)) {
          h_m_channel[2].m_down = ((h_m_channel[2].m_down) - (1));
          if (((Number(h_m_channel[2].m_down) === Number(0)) ? 1 : 0)) {
            if (((Number(((h_m_channel[2].m_mode) & (128))) === Number(128)) ? 1 : 0)) {
              h_m_channel[2].m_int_state = ((h_m_channel[2].m_int_state) | (1));
              method_interrupt_check(runtime);
            }
            (members.m_zc_cb ?? 0)[2](1);
            (members.m_zc_cb ?? 0)[2](0);
            h_m_channel[2].m_down = h_m_channel[2].m_tconst;
          }
        }
      }
    }
  }

  function method_trg3(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    let state_value: any = ((((state) ? (1) : (0))) | 0);
    if (((Number(state_value) !== Number(h_m_channel[3].m_extclk)) ? 1 : 0)) {
      h_m_channel[3].m_extclk = state_value;
      if (((((((((Number(((h_m_channel[3].m_mode) & (16))) === Number(16)) ? 1 : 0)) && (state_value)) ? 1 : 0)) || ((((((Number(((h_m_channel[3].m_mode) & (16))) === Number(0)) ? 1 : 0)) && (((state_value) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
        h_m_channel[3].m_mode = runtime.andAssign(h_m_channel[3].m_mode, -257);
        if (((Number(((h_m_channel[3].m_mode) & (64))) === Number(64)) ? 1 : 0)) {
          h_m_channel[3].m_down = ((h_m_channel[3].m_down) - (1));
          if (((Number(h_m_channel[3].m_down) === Number(0)) ? 1 : 0)) {
            if (((Number(((h_m_channel[3].m_mode) & (128))) === Number(128)) ? 1 : 0)) {
              h_m_channel[3].m_int_state = ((h_m_channel[3].m_int_state) | (1));
              method_interrupt_check(runtime);
            }
            (members.m_zc_cb ?? 0)[3](1);
            (members.m_zc_cb ?? 0)[3](0);
            h_m_channel[3].m_down = h_m_channel[3].m_tconst;
          }
        }
      }
    }
  }

  function method_intr_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_intr_cb)).bind === 'function' ? (runtime.dereference(members.m_intr_cb)).bind() : typeof (runtime.dereference(members.m_intr_cb)).bind === 'number' || typeof (runtime.dereference(members.m_intr_cb)).bind === 'boolean' ? (runtime.dereference(members.m_intr_cb)).bind : runtime.container(members.m_intr_cb, "bind"));
  }

  function method_get_channel_constant(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return ((h_m_channel[ch].m_tconst) & 0xffff);
  }

  function method_channel_int_state(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return ((h_m_channel[ch].m_int_state) & 0xff);
  }

  function method_channel_mode(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return ((h_m_channel[ch].m_mode) & 0xff);
  }

  function method_channel_config(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return runtime.dereference(((runtime.dereference(h_m_channel[ch])).lookup?.() ?? runtime.container(h_m_channel[ch], "lookup")));
  }

  function method_z80ctc_device__intr_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_intr_cb)).bind === 'function' ? (runtime.dereference(members.m_intr_cb)).bind() : typeof (runtime.dereference(members.m_intr_cb)).bind === 'number' || typeof (runtime.dereference(members.m_intr_cb)).bind === 'boolean' ? (runtime.dereference(members.m_intr_cb)).bind : runtime.container(members.m_intr_cb, "bind"));
  }

  function method_z80ctc_device__get_channel_constant(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return ((h_m_channel[ch].m_tconst) & 0xffff);
  }

  function method_z80ctc_device__channel_int_state(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return ((h_m_channel[ch].m_int_state) & 0xff);
  }

  function method_z80ctc_device__channel_mode(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return ((h_m_channel[ch].m_mode) & 0xff);
  }

  function method_z80ctc_device__channel_config(runtime: any, ch: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return runtime.dereference(((runtime.dereference(h_m_channel[ch])).lookup?.() ?? runtime.container(h_m_channel[ch], "lookup")));
  }
  return {
    "read": method_read,
    "write": method_write,
    "interrupt_check": method_interrupt_check,
    "z80daisy_irq_state": method_z80daisy_irq_state,
    "trg0": method_trg0,
    "trg1": method_trg1,
    "trg2": method_trg2,
    "trg3": method_trg3,
    "intr_callback": method_intr_callback,
    "get_channel_constant": method_get_channel_constant,
    "channel_int_state": method_channel_int_state,
    "channel_mode": method_channel_mode,
    "channel_config": method_channel_config,
    "z80ctc_device::intr_callback": method_z80ctc_device__intr_callback,
    "z80ctc_device::get_channel_constant": method_z80ctc_device__get_channel_constant,
    "z80ctc_device::channel_int_state": method_z80ctc_device__channel_int_state,
    "z80ctc_device::channel_mode": method_z80ctc_device__channel_mode,
    "z80ctc_device::channel_config": method_z80ctc_device__channel_config
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_intr_cb"];
definition.children![0]!.definition.compiledMethods = (() => {


  function method_period(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((((members.m_mode ?? 0)) & (2))) === Number(2)) ? 1 : 0)) {
      return Infinity;
    }
    if (((Number((((members.m_mode ?? 0)) & (64))) === Number(64)) ? 1 : 0)) {
      return (__l["clocks_to_attotime"] ? __l["clocks_to_attotime"]((members.m_tconst ?? 0)) : runtime.macro("clocks_to_attotime", (members.m_tconst ?? 0)));
    }
    let period: any = (__l["m_device.clocks_to_attotime"] ? __l["m_device.clocks_to_attotime"](((((Number((((members.m_mode ?? 0)) & (32))) === Number(0)) ? 1 : 0)) ? (16) : (256))) : ((members.m_device)?.clocks_to_attotime?.(((((Number((((members.m_mode ?? 0)) & (32))) === Number(0)) ? 1 : 0)) ? (16) : (256))) ?? 0));
    return ((period) * ((members.m_tconst ?? 0)));
  }

  function method_zc_to_callback(runtime: any, param: any): any {
    const members = runtime.members;

    const h_m_device = members.m_device ?? 0;
    const h_m_index = members.m_index ?? 0;
    runtime.readIndex(h_m_device.m_zc_cb, h_m_index)(0);
  }
  return {
    "period": method_period,
    "zc_to_callback": method_zc_to_callback
  };
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.compiledMethodLinks = ["clocks_to_attotime","m_device.clocks_to_attotime"];

export const device = definition;
export default device;
