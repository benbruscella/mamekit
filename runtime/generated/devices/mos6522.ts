// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './mos6522.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read_pa(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_out_a ?? 0)) & ((members.m_ddr_a ?? 0)))) | ((~(members.m_ddr_a ?? 0))))) & 0xff);
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let val: any = ((0) | 0);
    offset = ((offset) & (15));
    switch ((offset as number)) {
      case 0:
      {
        if ((((((Number((((members.m_acr ?? 0)) & (2))) !== Number(0)) ? 1 : 0)) && (((Number((((members.m_ifr ?? 0)) & (16))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
          val = (((members.m_latch_b ?? 0)) | 0);
        } else {
          val = ((method_input_pb(runtime)) | 0);
        }
        if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
          0;
          method_clear_int(runtime, ((16) | (((((((Number((((members.m_pcr ?? 0)) & (160))) === Number(32)) ? 1 : 0)) ? 0 : 1)) ? (8) : (0)))));
        }
        break;
      }
      case 1:
      {
        if ((((((Number((((members.m_acr ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) && (((Number((((members.m_ifr ?? 0)) & (2))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
          val = (((members.m_latch_a ?? 0)) | 0);
        } else {
          val = ((method_input_pa(runtime)) | 0);
        }
        if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
          0;
          method_clear_int(runtime, ((2) | (((((((Number((((members.m_pcr ?? 0)) & (10))) === Number(2)) ? 1 : 0)) ? 0 : 1)) ? (1) : (0)))));
          if (((((members.m_out_ca2 ?? 0)) && ((((((Number((((members.m_pcr ?? 0)) & (14))) === Number(10)) ? 1 : 0)) || (((Number((((members.m_pcr ?? 0)) & (12))) === Number(8)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            members.m_out_ca2 = ((0) | 0);
            (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number((members.m_out_ca2 ?? 0))) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler((members.m_out_ca2 ?? 0)) : runtime.invoke("m_ca2_handler", (members.m_out_ca2 ?? 0)));
          }
          if (((Number((((members.m_pcr ?? 0)) & (14))) === Number(10)) ? 1 : 0)) {
            ((runtime.dereference(members.m_ca2_timer)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](1) : runtime.macro("clocks_to_attotime", 1))) ?? 0);
          }
        }
        break;
      }
      case 15:
      {
        if ((((((Number((((members.m_acr ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) && (((Number((((members.m_ifr ?? 0)) & (2))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
          val = (((members.m_latch_a ?? 0)) | 0);
        } else {
          val = ((method_input_pa(runtime)) | 0);
        }
        break;
      }
      case 2:
      {
        val = (((members.m_ddr_b ?? 0)) | 0);
        break;
      }
      case 3:
      {
        val = (((members.m_ddr_a ?? 0)) | 0);
        break;
      }
      case 4:
      {
        if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
          0;
          method_clear_int(runtime, 64);
        }
        val = ((((method_get_counter1_value(runtime)) & (255))) | 0);
        break;
      }
      case 5:
      {
        val = ((runtime.shiftRight(method_get_counter1_value(runtime), 8)) | 0);
        break;
      }
      case 6:
      {
        val = (((members.m_t1ll ?? 0)) | 0);
        break;
      }
      case 7:
      {
        val = (((members.m_t1lh ?? 0)) | 0);
        break;
      }
      case 8:
      {
        if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
          0;
          method_clear_int(runtime, 32);
        }
        if (((((members.m_t2_active ?? 0)) && ((typeof (runtime.dereference(members.m_t2)).enabled === 'function' ? (runtime.dereference(members.m_t2)).enabled() : typeof (runtime.dereference(members.m_t2)).enabled === 'number' || typeof (runtime.dereference(members.m_t2)).enabled === 'boolean' ? (runtime.dereference(members.m_t2)).enabled : runtime.container(members.m_t2, "enabled")))) ? 1 : 0)) {
          val = (((((__l["attotime_to_clocks"] ? __l["attotime_to_clocks"]((typeof (runtime.dereference(members.m_t2)).remaining === 'function' ? (runtime.dereference(members.m_t2)).remaining() : typeof (runtime.dereference(members.m_t2)).remaining === 'number' || typeof (runtime.dereference(members.m_t2)).remaining === 'boolean' ? (runtime.dereference(members.m_t2)).remaining : runtime.container(members.m_t2, "remaining"))) : runtime.macro("attotime_to_clocks", (typeof (runtime.dereference(members.m_t2)).remaining === 'function' ? (runtime.dereference(members.m_t2)).remaining() : typeof (runtime.dereference(members.m_t2)).remaining === 'number' || typeof (runtime.dereference(members.m_t2)).remaining === 'boolean' ? (runtime.dereference(members.m_t2)).remaining : runtime.container(members.m_t2, "remaining"))))) & (255))) | 0);
        } else {
          if ((((members.m_acr ?? 0)) & (32))) {
            val = (((members.m_t2cl ?? 0)) | 0);
          } else {
            val = ((((((((65536) - ((((__l["attotime_to_clocks"] ? __l["attotime_to_clocks"](((((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_time2 ?? 0)))) : runtime.macro("attotime_to_clocks", ((((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_time2 ?? 0)))))) & (65535))))) - (1))) & (255))) | 0);
          }
        }
        break;
      }
      case 9:
      {
        if (((((members.m_t2_active ?? 0)) && ((typeof (runtime.dereference(members.m_t2)).enabled === 'function' ? (runtime.dereference(members.m_t2)).enabled() : typeof (runtime.dereference(members.m_t2)).enabled === 'number' || typeof (runtime.dereference(members.m_t2)).enabled === 'boolean' ? (runtime.dereference(members.m_t2)).enabled : runtime.container(members.m_t2, "enabled")))) ? 1 : 0)) {
          val = ((runtime.shiftRight((__l["attotime_to_clocks"] ? __l["attotime_to_clocks"]((typeof (runtime.dereference(members.m_t2)).remaining === 'function' ? (runtime.dereference(members.m_t2)).remaining() : typeof (runtime.dereference(members.m_t2)).remaining === 'number' || typeof (runtime.dereference(members.m_t2)).remaining === 'boolean' ? (runtime.dereference(members.m_t2)).remaining : runtime.container(members.m_t2, "remaining"))) : runtime.macro("attotime_to_clocks", (typeof (runtime.dereference(members.m_t2)).remaining === 'function' ? (runtime.dereference(members.m_t2)).remaining() : typeof (runtime.dereference(members.m_t2)).remaining === 'number' || typeof (runtime.dereference(members.m_t2)).remaining === 'boolean' ? (runtime.dereference(members.m_t2)).remaining : runtime.container(members.m_t2, "remaining")))), 8)) | 0);
        } else {
          if ((((members.m_acr ?? 0)) & (32))) {
            val = (((members.m_t2ch ?? 0)) | 0);
          } else {
            val = ((runtime.shiftRight(((((65536) - ((((__l["attotime_to_clocks"] ? __l["attotime_to_clocks"](((((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_time2 ?? 0)))) : runtime.macro("attotime_to_clocks", ((((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_time2 ?? 0)))))) & (65535))))) - (1)), 8)) | 0);
          }
        }
        break;
      }
      case 10:
      {
        0;
        val = (((members.m_sr ?? 0)) | 0);
        if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
          if ((((((((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(28)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
            members.m_out_cb1 = ((1) | 0);
            (__l["m_cb1_handler"] ? __l["m_cb1_handler"](Number((members.m_out_cb1 ?? 0))) : typeof members.m_cb1_handler === 'function' ? members.m_cb1_handler((members.m_out_cb1 ?? 0)) : runtime.invoke("m_cb1_handler", (members.m_out_cb1 ?? 0)));
            members.m_shift_counter = ((15) & 0xff);
          } else {
            members.m_shift_counter = (((((members.m_in_cb1 ?? 0)) ? (15) : (16))) & 0xff);
          }
          0;
          method_clear_int(runtime, 4);
          0;
          if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(8)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(24)) ? 1 : 0))) ? 1 : 0)) {
            ((runtime.dereference(members.m_shift_timer)).adjust?.(runtime.divide((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](7) : runtime.macro("clocks_to_attotime", 7)), 2)) ?? 0);
            0;
          } else {
            if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(4)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(20)) ? 1 : 0))) ? 1 : 0)) {
              ((runtime.dereference(members.m_shift_timer)).adjust?.(runtime.divide((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"]((((members.m_t2ll ?? 0)) + (2))) : runtime.macro("clocks_to_attotime", (((members.m_t2ll ?? 0)) + (2)))), 2)) ?? 0);
              0;
            } else {
              if (((((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) ? 0 : 1)) {
                ((runtime.dereference(members.m_shift_timer)).adjust?.(Infinity) ?? 0);
                0;
              }
            }
          }
          0;
        }
        break;
      }
      case 12:
      {
        val = (((members.m_pcr ?? 0)) | 0);
        break;
      }
      case 11:
      {
        val = (((members.m_acr ?? 0)) | 0);
        break;
      }
      case 14:
      {
        val = (((((members.m_ier ?? 0)) | (128))) | 0);
        break;
      }
      case 13:
      {
        val = (((members.m_ifr ?? 0)) | 0);
        break;
      }
    }
    0;
    return ((val) & 0xff);
  }

  function method_input_pb(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let pb: any = (((((members.m_in_b ?? 0)) & ((~(members.m_ddr_b ?? 0))))) & 0xff);
    if ((((((Number((members.m_ddr_b ?? 0)) !== Number(255)) ? 1 : 0)) && ((((typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_b_handler)).isunset() : typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_b_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_b_handler)).isunset : runtime.container(members.m_in_b_handler, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
      pb = ((((pb) & ((__l["m_in_b_handler"] ? __l["m_in_b_handler"]() : typeof members.m_in_b_handler === 'function' ? members.m_in_b_handler() : runtime.invoke("m_in_b_handler"))))) & 0xff);
    }
    pb = ((((pb) | ((((members.m_out_b ?? 0)) & ((members.m_ddr_b ?? 0)))))) & 0xff);
    if ((((members.m_acr ?? 0)) & (128))) {
      pb = ((((((pb) & (127))) | ((((members.m_t1_pb7 ?? 0)) << (7))))) & 0xff);
    }
    return ((pb) & 0xff);
  }

  function method_clear_int(runtime: any, data: any): any {
    const members = runtime.members;

    if ((((members.m_ifr ?? 0)) & (data))) {
      0;
      members.m_ifr = ((((members.m_ifr) & ((~data)))) & 0xff);
      method_output_irq(runtime);
      0;
    } else {
      0;
    }
  }

  function method_output_irq(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((((members.m_ier ?? 0)) & ((members.m_ifr ?? 0)))) & (127))) {
      if (((Number((((members.m_ifr ?? 0)) & (128))) === Number(0)) ? 1 : 0)) {
        0;
        members.m_ifr = ((((members.m_ifr) | (128))) & 0xff);
        (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(1)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(1) : runtime.invoke("m_irq_handler", 1));
      }
    } else {
      if ((((members.m_ifr ?? 0)) & (128))) {
        0;
        members.m_ifr = ((((members.m_ifr) & (-129))) & 0xff);
        (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(0)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(0) : runtime.invoke("m_irq_handler", 0));
      }
    }
  }

  function method_input_pa(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'function' ? (runtime.dereference(members.m_in_a_handler)).isunset() : typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'number' || typeof (runtime.dereference(members.m_in_a_handler)).isunset === 'boolean' ? (runtime.dereference(members.m_in_a_handler)).isunset : runtime.container(members.m_in_a_handler, "isunset"))) ? 0 : 1)) {
      return (((((((((members.m_in_a ?? 0)) & ((~(members.m_ddr_a ?? 0))))) & ((__l["m_in_a_handler"] ? __l["m_in_a_handler"]() : typeof members.m_in_a_handler === 'function' ? members.m_in_a_handler() : runtime.invoke("m_in_a_handler"))))) | ((((members.m_out_a ?? 0)) & ((members.m_ddr_a ?? 0)))))) & 0xff);
    } else {
      return (((((((members.m_out_a ?? 0)) | ((~(members.m_ddr_a ?? 0))))) & ((members.m_in_a ?? 0)))) & 0xff);
    }
  }

  function method_get_counter1_value(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let val: any = ((0) & 0xffff);
    if ((members.m_t1_active ?? 0)) {
      val = ((runtime.subtract((__l["attotime_to_clocks"] ? __l["attotime_to_clocks"]((typeof (runtime.dereference(members.m_t1)).remaining === 'function' ? (runtime.dereference(members.m_t1)).remaining() : typeof (runtime.dereference(members.m_t1)).remaining === 'number' || typeof (runtime.dereference(members.m_t1)).remaining === 'boolean' ? (runtime.dereference(members.m_t1)).remaining : runtime.container(members.m_t1, "remaining"))) : runtime.macro("attotime_to_clocks", (typeof (runtime.dereference(members.m_t1)).remaining === 'function' ? (runtime.dereference(members.m_t1)).remaining() : typeof (runtime.dereference(members.m_t1)).remaining === 'number' || typeof (runtime.dereference(members.m_t1)).remaining === 'boolean' ? (runtime.dereference(members.m_t1)).remaining : runtime.container(members.m_t1, "remaining")))), 3)) & 0xffff);
    } else {
      val = ((runtime.subtract(65535, (__l["attotime_to_clocks"] ? __l["attotime_to_clocks"](((((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_time1 ?? 0)))) : runtime.macro("attotime_to_clocks", ((((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) - ((members.m_time1 ?? 0))))))) & 0xffff);
    }
    return ((val) & 0xffff);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    offset = ((offset) & (15));
    0;
    switch ((offset as number)) {
      case 0:
      {
        members.m_out_b = ((data) & 0xff);
        if (((Number((members.m_ddr_b ?? 0)) !== Number(0)) ? 1 : 0)) {
          method_output_pb(runtime);
        }
        0;
        method_clear_int(runtime, ((16) | (((((((Number((((members.m_pcr ?? 0)) & (160))) === Number(32)) ? 1 : 0)) ? 0 : 1)) ? (8) : (0)))));
        if (((((members.m_out_cb2 ?? 0)) && ((((((Number((((members.m_pcr ?? 0)) & (224))) === Number(160)) ? 1 : 0)) || (((Number((((members.m_pcr ?? 0)) & (192))) === Number(128)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_cb2 = ((0) | 0);
          (__l["m_cb2_handler"] ? __l["m_cb2_handler"](Number((members.m_out_cb2 ?? 0))) : typeof members.m_cb2_handler === 'function' ? members.m_cb2_handler((members.m_out_cb2 ?? 0)) : runtime.invoke("m_cb2_handler", (members.m_out_cb2 ?? 0)));
        }
        if (((Number((((members.m_pcr ?? 0)) & (224))) === Number(160)) ? 1 : 0)) {
          ((runtime.dereference(members.m_cb2_timer)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](1) : runtime.macro("clocks_to_attotime", 1))) ?? 0);
        }
        break;
      }
      case 1:
      {
        members.m_out_a = ((data) & 0xff);
        if (((Number((members.m_ddr_a ?? 0)) !== Number(0)) ? 1 : 0)) {
          method_output_pa(runtime);
        }
        0;
        method_clear_int(runtime, ((2) | (((((((Number((((members.m_pcr ?? 0)) & (10))) === Number(2)) ? 1 : 0)) ? 0 : 1)) ? (1) : (0)))));
        if (((((members.m_out_ca2 ?? 0)) && ((((((Number((((members.m_pcr ?? 0)) & (14))) === Number(10)) ? 1 : 0)) || (((Number((((members.m_pcr ?? 0)) & (12))) === Number(8)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_ca2 = ((0) | 0);
          (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number((members.m_out_ca2 ?? 0))) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler((members.m_out_ca2 ?? 0)) : runtime.invoke("m_ca2_handler", (members.m_out_ca2 ?? 0)));
        }
        if (((Number((((members.m_pcr ?? 0)) & (14))) === Number(10)) ? 1 : 0)) {
          ((runtime.dereference(members.m_ca2_timer)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](1) : runtime.macro("clocks_to_attotime", 1))) ?? 0);
        }
        break;
      }
      case 15:
      {
        members.m_out_a = ((data) & 0xff);
        if (((Number((members.m_ddr_a ?? 0)) !== Number(0)) ? 1 : 0)) {
          method_output_pa(runtime);
        }
        break;
      }
      case 2:
      {
        if (((Number(data) !== Number((members.m_ddr_b ?? 0))) ? 1 : 0)) {
          members.m_ddr_b = ((data) & 0xff);
          method_output_pb(runtime);
        }
        break;
      }
      case 3:
      {
        if (((Number((members.m_ddr_a ?? 0)) !== Number(data)) ? 1 : 0)) {
          members.m_ddr_a = ((data) & 0xff);
          method_output_pa(runtime);
        }
        break;
      }
      case 4:
      case 6:
      {
        members.m_t1ll = ((data) & 0xff);
        break;
      }
      case 7:
      {
        members.m_t1lh = ((data) & 0xff);
        0;
        method_clear_int(runtime, 64);
        break;
      }
      case 5:
      {
        members.m_t1ch = (((members.m_t1lh = ((data) & 0xff))) & 0xff);
        members.m_t1cl = (((members.m_t1ll ?? 0)) & 0xff);
        0;
        method_clear_int(runtime, 64);
        members.m_t1_pb7 = ((0) | 0);
        if ((((members.m_acr ?? 0)) & (128))) {
          method_output_pb(runtime);
        }
        ((runtime.dereference(members.m_t1)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](runtime.add((((members.m_t1ll ?? 0)) + ((((members.m_t1lh ?? 0)) << (8)))), 3)) : runtime.macro("clocks_to_attotime", runtime.add((((members.m_t1ll ?? 0)) + ((((members.m_t1lh ?? 0)) << (8)))), 3)))) ?? 0);
        members.m_t1_active = ((1) & 0xff);
        break;
      }
      case 8:
      {
        members.m_t2ll = ((data) & 0xff);
        break;
      }
      case 9:
      {
        members.m_t2ch = (((members.m_t2lh = ((data) & 0xff))) & 0xff);
        members.m_t2cl = (((members.m_t2ll ?? 0)) & 0xff);
        0;
        method_clear_int(runtime, 32);
        if ((((((members.m_acr ?? 0)) & (32))) ? 0 : 1)) {
          ((runtime.dereference(members.m_t2)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](runtime.add((((members.m_t2ll ?? 0)) + ((((members.m_t2lh ?? 0)) << (8)))), 3)) : runtime.macro("clocks_to_attotime", runtime.add((((members.m_t2ll ?? 0)) + ((((members.m_t2lh ?? 0)) << (8)))), 3)))) ?? 0);
          members.m_t2_active = ((1) & 0xff);
        } else {
          members.m_t2_active = ((1) & 0xff);
          members.m_time2 = ((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
        }
        break;
      }
      case 10:
      {
        members.m_sr = ((data) & 0xff);
        0;
        if ((((((((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(28)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
          members.m_out_cb1 = ((1) | 0);
          (__l["m_cb1_handler"] ? __l["m_cb1_handler"](Number((members.m_out_cb1 ?? 0))) : typeof members.m_cb1_handler === 'function' ? members.m_cb1_handler((members.m_out_cb1 ?? 0)) : runtime.invoke("m_cb1_handler", (members.m_out_cb1 ?? 0)));
          members.m_shift_counter = ((15) & 0xff);
        } else {
          members.m_shift_counter = (((((members.m_in_cb1 ?? 0)) ? (15) : (16))) & 0xff);
        }
        0;
        method_clear_int(runtime, 4);
        0;
        if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(24)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(8)) ? 1 : 0))) ? 1 : 0)) {
          ((runtime.dereference(members.m_shift_timer)).adjust?.(runtime.divide((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](6) : runtime.macro("clocks_to_attotime", 6)), 2)) ?? 0);
          0;
        } else {
          if (((((((((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(20)) ? 1 : 0))) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
            ((runtime.dereference(members.m_shift_timer)).adjust?.(runtime.divide((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"]((((members.m_t2ll ?? 0)) + (2))) : runtime.macro("clocks_to_attotime", (((members.m_t2ll ?? 0)) + (2)))), 2)) ?? 0);
            0;
          } else {
            ((runtime.dereference(members.m_shift_timer)).adjust?.(Infinity) ?? 0);
            0;
          }
        }
        0;
        break;
      }
      case 12:
      {
        members.m_pcr = ((data) & 0xff);
        0;
        if ((((((Number(((data) & (12))) === Number(12)) ? 1 : 0)) && (((Number((members.m_out_ca2 ?? 0)) !== Number(runtime.shiftRight(((data) & (2)), 1))) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_ca2 = ((runtime.shiftRight(((data) & (2)), 1)) | 0);
          (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number((members.m_out_ca2 ?? 0))) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler((members.m_out_ca2 ?? 0)) : runtime.invoke("m_ca2_handler", (members.m_out_ca2 ?? 0)));
        }
        if ((((((Number(((data) & (192))) === Number(192)) ? 1 : 0)) && (((Number((members.m_out_cb2 ?? 0)) !== Number(runtime.shiftRight(((data) & (32)), 5))) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_cb2 = ((runtime.shiftRight(((data) & (32)), 5)) | 0);
          (__l["m_cb2_handler"] ? __l["m_cb2_handler"](Number((members.m_out_cb2 ?? 0))) : typeof members.m_cb2_handler === 'function' ? members.m_cb2_handler((members.m_out_cb2 ?? 0)) : runtime.invoke("m_cb2_handler", (members.m_out_cb2 ?? 0)));
        }
        break;
      }
      case 11:
      {
        let counter1: any = ((method_get_counter1_value(runtime)) & 0xffff);
        members.m_acr = ((data) & 0xff);
        0;
        method_output_pb(runtime);
        0;
        if ((((((members.m_acr ?? 0)) & (28))) ? 0 : 1)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(4)) ? 1 : 0)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(8)) ? 1 : 0)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(20)) ? 1 : 0)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(24)) ? 1 : 0)) {
          0;
        }
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(28)) ? 1 : 0)) {
          0;
        }
        if ((((((((((((members.m_acr ?? 0)) & (28))) ? 0 : 1)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0))) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(28)) ? 1 : 0))) ? 1 : 0)) {
          ((runtime.dereference(members.m_shift_timer)).adjust?.(Infinity) ?? 0);
          0;
        }
        if ((((members.m_acr ?? 0)) & (64))) {
          ((runtime.dereference(members.m_t1)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](((counter1) + (3))) : runtime.macro("clocks_to_attotime", ((counter1) + (3))))) ?? 0);
          members.m_t1_active = ((1) & 0xff);
        }
        if (((((((((Number((((members.m_acr ?? 0)) & (28))) === Number(4)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(8)) ? 1 : 0))) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_cb2 = ((1) | 0);
          (__l["m_cb2_handler"] ? __l["m_cb2_handler"](Number((members.m_out_cb2 ?? 0))) : typeof members.m_cb2_handler === 'function' ? members.m_cb2_handler((members.m_out_cb2 ?? 0)) : runtime.invoke("m_cb2_handler", (members.m_out_cb2 ?? 0)));
        }
        0;
        break;
      }
      case 14:
      {
        if (((data) & (128))) {
          members.m_ier = ((((members.m_ier) | (((data) & (127))))) & 0xff);
        } else {
          members.m_ier = ((((members.m_ier) & ((~((data) & (127)))))) & 0xff);
        }
        method_output_irq(runtime);
        break;
      }
      case 13:
      {
        0;
        method_clear_int(runtime, ((data) & (127)));
        break;
      }
    }
  }

  function method_output_pb(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let pb: any = (((((((members.m_out_b ?? 0)) & ((members.m_ddr_b ?? 0)))) | ((~(members.m_ddr_b ?? 0))))) & 0xff);
    if ((((members.m_acr ?? 0)) & (128))) {
      pb = ((((((pb) & (127))) | ((((members.m_t1_pb7 ?? 0)) << (7))))) & 0xff);
    }
    (__l["m_out_b_handler"] ? __l["m_out_b_handler"](Number(pb)) : typeof members.m_out_b_handler === 'function' ? members.m_out_b_handler(pb) : runtime.invoke("m_out_b_handler", pb));
  }

  function method_output_pa(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let pa: any = (((((((members.m_out_a ?? 0)) & ((members.m_ddr_a ?? 0)))) | ((~(members.m_ddr_a ?? 0))))) & 0xff);
    (__l["m_out_a_handler"] ? __l["m_out_a_handler"](Number(pa)) : typeof members.m_out_a_handler === 'function' ? members.m_out_a_handler(pa) : runtime.invoke("m_out_a_handler", pa));
  }

  function method_write_pa(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_in_a = ((data) & 0xff);
  }

  function method_write_ca1(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_in_ca1 ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_in_ca1 = ((state) | 0);
      0;
      if ((((((((members.m_in_ca1 ?? 0)) && ((((members.m_pcr ?? 0)) & (1)))) ? 1 : 0)) || (((((((members.m_in_ca1 ?? 0)) ? 0 : 1)) && ((((((members.m_pcr ?? 0)) & (1))) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
        if ((((members.m_acr ?? 0)) & (1))) {
          members.m_latch_a = ((method_input_pa(runtime)) & 0xff);
        }
        0;
        method_set_int(runtime, 2);
        if (((((((members.m_out_ca2 ?? 0)) ? 0 : 1)) && (((Number((((members.m_pcr ?? 0)) & (12))) === Number(8)) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_ca2 = ((1) | 0);
          (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number((members.m_out_ca2 ?? 0))) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler((members.m_out_ca2 ?? 0)) : runtime.invoke("m_ca2_handler", (members.m_out_ca2 ?? 0)));
        }
      }
    }
  }

  function method_set_int(runtime: any, data: any): any {
    const members = runtime.members;

    if ((((((members.m_ifr ?? 0)) & (data))) ? 0 : 1)) {
      members.m_ifr = ((((members.m_ifr) | (data))) & 0xff);
      method_output_irq(runtime);
      0;
      0;
    } else {
      0;
    }
  }

  function method_write_ca2(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number((members.m_in_ca2 ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_in_ca2 = ((state) | 0);
      if ((((((members.m_pcr ?? 0)) & (8))) ? 0 : 1)) {
        if ((((((((members.m_in_ca2 ?? 0)) && (((Number((((members.m_pcr ?? 0)) & (12))) === Number(4)) ? 1 : 0))) ? 1 : 0)) || (((((((members.m_in_ca2 ?? 0)) ? 0 : 1)) && (((Number((((members.m_pcr ?? 0)) & (12))) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          0;
          method_set_int(runtime, 1);
        }
      }
    }
  }

  function method_write_cb1(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_in_cb1 ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_in_cb1 = ((state) | 0);
      if ((((((((members.m_in_cb1 ?? 0)) && ((((members.m_pcr ?? 0)) & (16)))) ? 1 : 0)) || (((((((members.m_in_cb1 ?? 0)) ? 0 : 1)) && ((((((members.m_pcr ?? 0)) & (16))) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
        if ((((members.m_acr ?? 0)) & (2))) {
          members.m_latch_b = ((method_input_pb(runtime)) & 0xff);
        }
        0;
        method_set_int(runtime, 16);
        if (((((((members.m_out_cb2 ?? 0)) ? 0 : 1)) && (((Number((((members.m_pcr ?? 0)) & (192))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
          members.m_out_cb2 = ((1) | 0);
          (__l["m_cb2_handler"] ? __l["m_cb2_handler"](Number(1)) : typeof members.m_cb2_handler === 'function' ? members.m_cb2_handler(1) : runtime.invoke("m_cb2_handler", 1));
        }
      }
      if (((Number((((members.m_acr ?? 0)) & (28))) === Number(28)) ? 1 : 0)) {
        0;
        method_shift_out(runtime);
      } else {
        if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0)) || ((((((members.m_acr ?? 0)) & (28))) ? 0 : 1))) ? 1 : 0)) {
          0;
          method_shift_in(runtime);
        }
      }
    }
  }

  function method_shift_out(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((members.m_shift_counter ?? 0)) & (1))) {
      0;
      members.m_out_cb2 = (((((((members.m_sr ?? 0)) >>> (7))) & (1))) | 0);
      members.m_sr = (((((((members.m_sr ?? 0)) << (1))) | ((members.m_out_cb2 ?? 0)))) & 0xff);
      0;
      (__l["m_cb2_handler"] ? __l["m_cb2_handler"](Number((members.m_out_cb2 ?? 0))) : typeof members.m_cb2_handler === 'function' ? members.m_cb2_handler((members.m_out_cb2 ?? 0)) : runtime.invoke("m_cb2_handler", (members.m_out_cb2 ?? 0)));
      if ((((((Number((members.m_shift_counter ?? 0)) === Number(1)) ? 1 : 0)) && (((Number((((members.m_acr ?? 0)) & (28))) === Number(28)) ? 1 : 0))) ? 1 : 0)) {
        0;
        method_set_int(runtime, 4);
      }
    } else {
      if (((((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) ? 0 : 1)) {
        if ((((((Number((members.m_shift_counter ?? 0)) === Number(0)) ? 1 : 0)) && ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(24)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(20)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          0;
          method_set_int(runtime, 4);
        }
      }
    }
    members.m_shift_counter = (((((((members.m_shift_counter ?? 0)) - (1))) & (15))) & 0xff);
  }

  function method_shift_in(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((((members.m_shift_counter ?? 0)) & (1))) ? 0 : 1)) {
      0;
      members.m_sr = (((((((members.m_sr ?? 0)) << (1))) | ((((members.m_in_cb2 ?? 0)) & (1))))) & 0xff);
      0;
      if ((((((Number((members.m_shift_counter ?? 0)) === Number(0)) ? 1 : 0)) && ((((((((members.m_acr ?? 0)) & (28))) ? 0 : 1)) ? 0 : 1))) ? 1 : 0)) {
        0;
        if (((Number((((members.m_acr ?? 0)) & (28))) === Number(12)) ? 1 : 0)) {
          method_set_int(runtime, 4);
        } else {
          ((runtime.dereference(members.m_shift_irq_timer)).adjust?.(runtime.divide((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](2) : runtime.macro("clocks_to_attotime", 2)), 2)) ?? 0);
        }
      }
    }
    members.m_shift_counter = (((((((members.m_shift_counter ?? 0)) - (1))) & (15))) & 0xff);
  }

  function method_write_cb2(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number((members.m_in_cb2 ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_in_cb2 = ((state) | 0);
      0;
      if ((((((members.m_pcr ?? 0)) & (128))) ? 0 : 1)) {
        if ((((((((members.m_in_cb2 ?? 0)) && (((Number((((members.m_pcr ?? 0)) & (192))) === Number(64)) ? 1 : 0))) ? 1 : 0)) || (((((((members.m_in_cb2 ?? 0)) ? 0 : 1)) && (((Number((((members.m_pcr ?? 0)) & (192))) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          0;
          method_set_int(runtime, 8);
        }
      }
    }
  }

  function method_shift_irq_tick(runtime: any, param: any): any {
    const members = runtime.members;

    method_set_int(runtime, 4);
    ((runtime.dereference(members.m_shift_irq_timer)).adjust?.(Infinity) ?? 0);
  }

  function method_shift_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    0;
    members.m_out_cb1 = ((((members.m_out_cb1) ^ (1))) | 0);
    (__l["m_cb1_handler"] ? __l["m_cb1_handler"](Number((members.m_out_cb1 ?? 0))) : typeof members.m_cb1_handler === 'function' ? members.m_cb1_handler((members.m_out_cb1 ?? 0)) : runtime.invoke("m_cb1_handler", (members.m_out_cb1 ?? 0)));
    if (((((((((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(20)) ? 1 : 0))) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(24)) ? 1 : 0))) ? 1 : 0)) {
      method_shift_out(runtime);
    } else {
      if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(4)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(8)) ? 1 : 0))) ? 1 : 0)) {
        method_shift_in(runtime);
      }
    }
    if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) || (((Number((members.m_shift_counter ?? 0)) < Number(15)) ? 1 : 0))) ? 1 : 0)) {
      if ((((((Number((((members.m_acr ?? 0)) & (28))) === Number(8)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(24)) ? 1 : 0))) ? 1 : 0)) {
        ((runtime.dereference(members.m_shift_timer)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](1) : runtime.macro("clocks_to_attotime", 1))) ?? 0);
      } else {
        if (((((((((Number((((members.m_acr ?? 0)) & (28))) === Number(16)) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(20)) ? 1 : 0))) ? 1 : 0)) || (((Number((((members.m_acr ?? 0)) & (28))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          ((runtime.dereference(members.m_shift_timer)).adjust?.(runtime.divide((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"]((((members.m_t2ll ?? 0)) + (2))) : runtime.macro("clocks_to_attotime", (((members.m_t2ll ?? 0)) + (2)))), 2)) ?? 0);
        } else {
          ((runtime.dereference(members.m_shift_timer)).adjust?.(Infinity) ?? 0);
        }
      }
    }
  }

  function method_t1_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((members.m_acr ?? 0)) & (64))) {
      if (((Number((((members.m_t1ll ?? 0)) + ((((members.m_t1lh ?? 0)) << (8))))) > Number(0)) ? 1 : 0)) {
        members.m_t1_pb7 = (((((members.m_t1_pb7 ?? 0)) ? 0 : 1)) | 0);
      }
      ((runtime.dereference(members.m_t1)).adjust?.((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](runtime.add((((members.m_t1ll ?? 0)) + ((((members.m_t1lh ?? 0)) << (8)))), 3)) : runtime.macro("clocks_to_attotime", runtime.add((((members.m_t1ll ?? 0)) + ((((members.m_t1lh ?? 0)) << (8)))), 3)))) ?? 0);
    } else {
      members.m_t1_pb7 = ((1) | 0);
      members.m_t1_active = ((0) & 0xff);
      members.m_time1 = ((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
    }
    if ((((members.m_acr ?? 0)) & (128))) {
      method_output_pb(runtime);
    }
    0;
    method_set_int(runtime, 64);
  }

  function method_t2_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_t2_active = ((0) & 0xff);
    members.m_time2 = ((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
    0;
    method_set_int(runtime, 32);
  }

  function method_ca2_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_out_ca2 = ((1) | 0);
    (__l["m_ca2_handler"] ? __l["m_ca2_handler"](Number((members.m_out_ca2 ?? 0))) : typeof members.m_ca2_handler === 'function' ? members.m_ca2_handler((members.m_out_ca2 ?? 0)) : runtime.invoke("m_ca2_handler", (members.m_out_ca2 ?? 0)));
  }

  function method_readpa_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_a_handler)).bind === 'function' ? (runtime.dereference(members.m_in_a_handler)).bind() : typeof (runtime.dereference(members.m_in_a_handler)).bind === 'number' || typeof (runtime.dereference(members.m_in_a_handler)).bind === 'boolean' ? (runtime.dereference(members.m_in_a_handler)).bind : runtime.container(members.m_in_a_handler, "bind"));
  }

  function method_readpb_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_b_handler)).bind === 'function' ? (runtime.dereference(members.m_in_b_handler)).bind() : typeof (runtime.dereference(members.m_in_b_handler)).bind === 'number' || typeof (runtime.dereference(members.m_in_b_handler)).bind === 'boolean' ? (runtime.dereference(members.m_in_b_handler)).bind : runtime.container(members.m_in_b_handler, "bind"));
  }

  function method_writepa_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_a_handler)).bind === 'function' ? (runtime.dereference(members.m_out_a_handler)).bind() : typeof (runtime.dereference(members.m_out_a_handler)).bind === 'number' || typeof (runtime.dereference(members.m_out_a_handler)).bind === 'boolean' ? (runtime.dereference(members.m_out_a_handler)).bind : runtime.container(members.m_out_a_handler, "bind"));
  }

  function method_writepb_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_b_handler)).bind === 'function' ? (runtime.dereference(members.m_out_b_handler)).bind() : typeof (runtime.dereference(members.m_out_b_handler)).bind === 'number' || typeof (runtime.dereference(members.m_out_b_handler)).bind === 'boolean' ? (runtime.dereference(members.m_out_b_handler)).bind : runtime.container(members.m_out_b_handler, "bind"));
  }

  function method_ca2_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_ca2_handler)).bind === 'function' ? (runtime.dereference(members.m_ca2_handler)).bind() : typeof (runtime.dereference(members.m_ca2_handler)).bind === 'number' || typeof (runtime.dereference(members.m_ca2_handler)).bind === 'boolean' ? (runtime.dereference(members.m_ca2_handler)).bind : runtime.container(members.m_ca2_handler, "bind"));
  }

  function method_cb1_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_cb1_handler)).bind === 'function' ? (runtime.dereference(members.m_cb1_handler)).bind() : typeof (runtime.dereference(members.m_cb1_handler)).bind === 'number' || typeof (runtime.dereference(members.m_cb1_handler)).bind === 'boolean' ? (runtime.dereference(members.m_cb1_handler)).bind : runtime.container(members.m_cb1_handler, "bind"));
  }

  function method_cb2_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_cb2_handler)).bind === 'function' ? (runtime.dereference(members.m_cb2_handler)).bind() : typeof (runtime.dereference(members.m_cb2_handler)).bind === 'number' || typeof (runtime.dereference(members.m_cb2_handler)).bind === 'boolean' ? (runtime.dereference(members.m_cb2_handler)).bind : runtime.container(members.m_cb2_handler, "bind"));
  }

  function method_irq_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_irq_handler)).bind === 'function' ? (runtime.dereference(members.m_irq_handler)).bind() : typeof (runtime.dereference(members.m_irq_handler)).bind === 'number' || typeof (runtime.dereference(members.m_irq_handler)).bind === 'boolean' ? (runtime.dereference(members.m_irq_handler)).bind : runtime.container(members.m_irq_handler, "bind"));
  }

  function method_write_pa0(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 0, state);
  }

  function method_set_pa_line(runtime: any, line: any, state: any): any {
    const members = runtime.members;

    if (state) {
      members.m_in_a = ((((members.m_in_a) | (((1) << (line))))) & 0xff);
    } else {
      members.m_in_a = ((((members.m_in_a) & ((~((1) << (line)))))) & 0xff);
    }
  }

  function method_write_pa1(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 1, state);
  }

  function method_write_pa2(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 2, state);
  }

  function method_write_pa3(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 3, state);
  }

  function method_write_pa4(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 4, state);
  }

  function method_write_pa5(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 5, state);
  }

  function method_write_pa6(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 6, state);
  }

  function method_write_pa7(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 7, state);
  }

  function method_write_pb0(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 0, state);
  }

  function method_set_pb_line(runtime: any, line: any, state: any): any {
    const members = runtime.members;

    if (state) {
      members.m_in_b = ((((members.m_in_b) | (((1) << (line))))) & 0xff);
    } else {
      if ((((((Number(line) === Number(6)) ? 1 : 0)) && (((((members.m_in_b ?? 0)) >>> (6)) & 1))) ? 1 : 0)) {
        method_counter2_decrement(runtime);
      }
      members.m_in_b = ((((members.m_in_b) & ((~((1) << (line)))))) & 0xff);
    }
  }

  function method_counter2_decrement(runtime: any): any {
    const members = runtime.members;

    if ((((((members.m_acr ?? 0)) & (32))) ? 0 : 1)) {
      return;
    }
    if (((Number((() => { const previous = (members.m_t2cl ?? 0); members.m_t2cl = ((((members.m_t2cl) - (1))) & 0xff); return previous; })()) !== Number(0)) ? 1 : 0)) {
      return;
    }
    if (((Number((() => { const previous = (members.m_t2ch ?? 0); members.m_t2ch = ((((members.m_t2ch) - (1))) & 0xff); return previous; })()) !== Number(0)) ? 1 : 0)) {
      return;
    }
    if ((members.m_t2_active ?? 0)) {
      members.m_t2_active = ((0) & 0xff);
      0;
      method_set_int(runtime, 32);
    }
  }

  function method_write_pb1(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 1, state);
  }

  function method_write_pb2(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 2, state);
  }

  function method_write_pb3(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 3, state);
  }

  function method_write_pb4(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 4, state);
  }

  function method_write_pb5(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 5, state);
  }

  function method_write_pb6(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 6, state);
  }

  function method_write_pb7(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 7, state);
  }

  function method_ca2_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_out_ca2 ?? 0);
  }

  function method_cb1_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_out_cb1 ?? 0);
  }

  function method_cb2_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_out_cb2 ?? 0);
  }

  function method_via6522_device__readpa_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_a_handler)).bind === 'function' ? (runtime.dereference(members.m_in_a_handler)).bind() : typeof (runtime.dereference(members.m_in_a_handler)).bind === 'number' || typeof (runtime.dereference(members.m_in_a_handler)).bind === 'boolean' ? (runtime.dereference(members.m_in_a_handler)).bind : runtime.container(members.m_in_a_handler, "bind"));
  }

  function method_via6522_device__readpb_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_b_handler)).bind === 'function' ? (runtime.dereference(members.m_in_b_handler)).bind() : typeof (runtime.dereference(members.m_in_b_handler)).bind === 'number' || typeof (runtime.dereference(members.m_in_b_handler)).bind === 'boolean' ? (runtime.dereference(members.m_in_b_handler)).bind : runtime.container(members.m_in_b_handler, "bind"));
  }

  function method_via6522_device__writepa_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_a_handler)).bind === 'function' ? (runtime.dereference(members.m_out_a_handler)).bind() : typeof (runtime.dereference(members.m_out_a_handler)).bind === 'number' || typeof (runtime.dereference(members.m_out_a_handler)).bind === 'boolean' ? (runtime.dereference(members.m_out_a_handler)).bind : runtime.container(members.m_out_a_handler, "bind"));
  }

  function method_via6522_device__writepb_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_b_handler)).bind === 'function' ? (runtime.dereference(members.m_out_b_handler)).bind() : typeof (runtime.dereference(members.m_out_b_handler)).bind === 'number' || typeof (runtime.dereference(members.m_out_b_handler)).bind === 'boolean' ? (runtime.dereference(members.m_out_b_handler)).bind : runtime.container(members.m_out_b_handler, "bind"));
  }

  function method_via6522_device__ca2_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_ca2_handler)).bind === 'function' ? (runtime.dereference(members.m_ca2_handler)).bind() : typeof (runtime.dereference(members.m_ca2_handler)).bind === 'number' || typeof (runtime.dereference(members.m_ca2_handler)).bind === 'boolean' ? (runtime.dereference(members.m_ca2_handler)).bind : runtime.container(members.m_ca2_handler, "bind"));
  }

  function method_via6522_device__cb1_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_cb1_handler)).bind === 'function' ? (runtime.dereference(members.m_cb1_handler)).bind() : typeof (runtime.dereference(members.m_cb1_handler)).bind === 'number' || typeof (runtime.dereference(members.m_cb1_handler)).bind === 'boolean' ? (runtime.dereference(members.m_cb1_handler)).bind : runtime.container(members.m_cb1_handler, "bind"));
  }

  function method_via6522_device__cb2_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_cb2_handler)).bind === 'function' ? (runtime.dereference(members.m_cb2_handler)).bind() : typeof (runtime.dereference(members.m_cb2_handler)).bind === 'number' || typeof (runtime.dereference(members.m_cb2_handler)).bind === 'boolean' ? (runtime.dereference(members.m_cb2_handler)).bind : runtime.container(members.m_cb2_handler, "bind"));
  }

  function method_via6522_device__irq_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_irq_handler)).bind === 'function' ? (runtime.dereference(members.m_irq_handler)).bind() : typeof (runtime.dereference(members.m_irq_handler)).bind === 'number' || typeof (runtime.dereference(members.m_irq_handler)).bind === 'boolean' ? (runtime.dereference(members.m_irq_handler)).bind : runtime.container(members.m_irq_handler, "bind"));
  }

  function method_via6522_device__write_pa0(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 0, state);
  }

  function method_via6522_device__write_pa1(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 1, state);
  }

  function method_via6522_device__write_pa2(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 2, state);
  }

  function method_via6522_device__write_pa3(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 3, state);
  }

  function method_via6522_device__write_pa4(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 4, state);
  }

  function method_via6522_device__write_pa5(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 5, state);
  }

  function method_via6522_device__write_pa6(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 6, state);
  }

  function method_via6522_device__write_pa7(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pa_line(runtime, 7, state);
  }

  function method_via6522_device__write_pb0(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 0, state);
  }

  function method_via6522_device__write_pb1(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 1, state);
  }

  function method_via6522_device__write_pb2(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 2, state);
  }

  function method_via6522_device__write_pb3(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 3, state);
  }

  function method_via6522_device__write_pb4(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 4, state);
  }

  function method_via6522_device__write_pb5(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 5, state);
  }

  function method_via6522_device__write_pb6(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 6, state);
  }

  function method_via6522_device__write_pb7(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_pb_line(runtime, 7, state);
  }

  function method_via6522_device__ca2_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_out_ca2 ?? 0);
  }

  function method_via6522_device__cb1_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_out_cb1 ?? 0);
  }

  function method_via6522_device__cb2_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_out_cb2 ?? 0);
  }
  return {
    "read_pa": method_read_pa,
    "read": method_read,
    "input_pb": method_input_pb,
    "clear_int": method_clear_int,
    "output_irq": method_output_irq,
    "input_pa": method_input_pa,
    "get_counter1_value": method_get_counter1_value,
    "write": method_write,
    "output_pb": method_output_pb,
    "output_pa": method_output_pa,
    "write_pa": method_write_pa,
    "write_ca1": method_write_ca1,
    "set_int": method_set_int,
    "write_ca2": method_write_ca2,
    "write_cb1": method_write_cb1,
    "shift_out": method_shift_out,
    "shift_in": method_shift_in,
    "write_cb2": method_write_cb2,
    "shift_irq_tick": method_shift_irq_tick,
    "shift_tick": method_shift_tick,
    "t1_tick": method_t1_tick,
    "t2_tick": method_t2_tick,
    "ca2_tick": method_ca2_tick,
    "readpa_handler": method_readpa_handler,
    "readpb_handler": method_readpb_handler,
    "writepa_handler": method_writepa_handler,
    "writepb_handler": method_writepb_handler,
    "ca2_handler": method_ca2_handler,
    "cb1_handler": method_cb1_handler,
    "cb2_handler": method_cb2_handler,
    "irq_handler": method_irq_handler,
    "write_pa0": method_write_pa0,
    "set_pa_line": method_set_pa_line,
    "write_pa1": method_write_pa1,
    "write_pa2": method_write_pa2,
    "write_pa3": method_write_pa3,
    "write_pa4": method_write_pa4,
    "write_pa5": method_write_pa5,
    "write_pa6": method_write_pa6,
    "write_pa7": method_write_pa7,
    "write_pb0": method_write_pb0,
    "set_pb_line": method_set_pb_line,
    "counter2_decrement": method_counter2_decrement,
    "write_pb1": method_write_pb1,
    "write_pb2": method_write_pb2,
    "write_pb3": method_write_pb3,
    "write_pb4": method_write_pb4,
    "write_pb5": method_write_pb5,
    "write_pb6": method_write_pb6,
    "write_pb7": method_write_pb7,
    "ca2_r": method_ca2_r,
    "cb1_r": method_cb1_r,
    "cb2_r": method_cb2_r,
    "via6522_device::readpa_handler": method_via6522_device__readpa_handler,
    "via6522_device::readpb_handler": method_via6522_device__readpb_handler,
    "via6522_device::writepa_handler": method_via6522_device__writepa_handler,
    "via6522_device::writepb_handler": method_via6522_device__writepb_handler,
    "via6522_device::ca2_handler": method_via6522_device__ca2_handler,
    "via6522_device::cb1_handler": method_via6522_device__cb1_handler,
    "via6522_device::cb2_handler": method_via6522_device__cb2_handler,
    "via6522_device::irq_handler": method_via6522_device__irq_handler,
    "via6522_device::write_pa0": method_via6522_device__write_pa0,
    "via6522_device::write_pa1": method_via6522_device__write_pa1,
    "via6522_device::write_pa2": method_via6522_device__write_pa2,
    "via6522_device::write_pa3": method_via6522_device__write_pa3,
    "via6522_device::write_pa4": method_via6522_device__write_pa4,
    "via6522_device::write_pa5": method_via6522_device__write_pa5,
    "via6522_device::write_pa6": method_via6522_device__write_pa6,
    "via6522_device::write_pa7": method_via6522_device__write_pa7,
    "via6522_device::write_pb0": method_via6522_device__write_pb0,
    "via6522_device::write_pb1": method_via6522_device__write_pb1,
    "via6522_device::write_pb2": method_via6522_device__write_pb2,
    "via6522_device::write_pb3": method_via6522_device__write_pb3,
    "via6522_device::write_pb4": method_via6522_device__write_pb4,
    "via6522_device::write_pb5": method_via6522_device__write_pb5,
    "via6522_device::write_pb6": method_via6522_device__write_pb6,
    "via6522_device::write_pb7": method_via6522_device__write_pb7,
    "via6522_device::ca2_r": method_via6522_device__ca2_r,
    "via6522_device::cb1_r": method_via6522_device__cb1_r,
    "via6522_device::cb2_r": method_via6522_device__cb2_r
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["attotime_to_clocks","clocks_to_attotime","m_ca2_handler","m_cb1_handler","m_cb2_handler","m_in_a_handler","m_in_b_handler","m_irq_handler","m_out_a_handler","m_out_b_handler","machine","machine().side_effects_disabled","machine().time"];

export const device = definition;
export default device;
