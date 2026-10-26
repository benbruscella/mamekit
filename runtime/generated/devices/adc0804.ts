// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './adc0804.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_set_interrupt(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_intr_active ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_intr_active = ((state) ? 1 : 0);
      (__l["m_intr_callback"] ? __l["m_intr_callback"](Number(((state) ? (1) : (0)))) : typeof members.m_intr_callback === 'function' ? members.m_intr_callback(((state) ? (1) : (0))) : runtime.invoke("m_intr_callback", ((state) ? (1) : (0))));
    }
  }

  function method_rd_w(runtime: any, state: any): any {
    const members = runtime.members;

    0;
    if ((((((state) ? 0 : 1)) && ((((members.m_rd_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
      members.m_rd_active = ((1) ? 1 : 0);
      method_set_interrupt(runtime, 0);
    } else {
      if ((((state) && ((members.m_rd_active ?? 0))) ? 1 : 0)) {
        members.m_rd_active = ((0) ? 1 : 0);
      }
    }
  }

  function method_wr_w(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((((state) ? 0 : 1)) && ((((members.m_wr_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
      members.m_wr_active = ((1) ? 1 : 0);
      method_set_interrupt(runtime, 0);
    } else {
      if ((((state) && ((members.m_wr_active ?? 0))) ? 1 : 0)) {
        members.m_wr_active = ((0) ? 1 : 0);
        method_conversion_start(runtime);
      }
    }
  }

  function method_conversion_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((typeof (runtime.dereference(members.m_timer)).enabled === 'function' ? (runtime.dereference(members.m_timer)).enabled() : typeof (runtime.dereference(members.m_timer)).enabled === 'number' || typeof (runtime.dereference(members.m_timer)).enabled === 'boolean' ? (runtime.dereference(members.m_timer)).enabled : runtime.container(members.m_timer, "enabled"))) ? 0 : 1)) {
      ((runtime.dereference(members.m_timer)).adjust?.(((((Number((members.m_fclk_rc ?? 0)) !== Number(0)) ? 1 : 0)) ? ((((members.m_fclk_rc ?? 0)) * (74))) : ((__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](74) : runtime.macro("clocks_to_attotime", 74))))) ?? 0);
    } else {
      0;
    }
  }

  function method_conversion_done(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_result = (((__l["m_vin_callback"] ? __l["m_vin_callback"]() : typeof members.m_vin_callback === 'function' ? members.m_vin_callback() : runtime.invoke("m_vin_callback"))) & 0xff);
    if (((((((members.m_rd_active ?? 0)) ? 0 : 1)) && ((((members.m_wr_active ?? 0)) ? 0 : 1))) ? 1 : 0)) {
      method_set_interrupt(runtime, 1);
    }
  }

  function method_vin_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_vin_callback)).bind === 'function' ? (runtime.dereference(members.m_vin_callback)).bind() : typeof (runtime.dereference(members.m_vin_callback)).bind === 'number' || typeof (runtime.dereference(members.m_vin_callback)).bind === 'boolean' ? (runtime.dereference(members.m_vin_callback)).bind : runtime.container(members.m_vin_callback, "bind"));
  }

  function method_intr_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_intr_callback)).bind === 'function' ? (runtime.dereference(members.m_intr_callback)).bind() : typeof (runtime.dereference(members.m_intr_callback)).bind === 'number' || typeof (runtime.dereference(members.m_intr_callback)).bind === 'boolean' ? (runtime.dereference(members.m_intr_callback)).bind : runtime.container(members.m_intr_callback, "bind"));
  }

  function method_intr_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_intr_active ?? 0)) ? (0) : (1));
  }

  function method_adc0804_device__vin_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_vin_callback)).bind === 'function' ? (runtime.dereference(members.m_vin_callback)).bind() : typeof (runtime.dereference(members.m_vin_callback)).bind === 'number' || typeof (runtime.dereference(members.m_vin_callback)).bind === 'boolean' ? (runtime.dereference(members.m_vin_callback)).bind : runtime.container(members.m_vin_callback, "bind"));
  }

  function method_adc0804_device__intr_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_intr_callback)).bind === 'function' ? (runtime.dereference(members.m_intr_callback)).bind() : typeof (runtime.dereference(members.m_intr_callback)).bind === 'number' || typeof (runtime.dereference(members.m_intr_callback)).bind === 'boolean' ? (runtime.dereference(members.m_intr_callback)).bind : runtime.container(members.m_intr_callback, "bind"));
  }

  function method_adc0804_device__intr_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_intr_active ?? 0)) ? (0) : (1));
  }
  return {
    "set_interrupt": method_set_interrupt,
    "rd_w": method_rd_w,
    "wr_w": method_wr_w,
    "conversion_start": method_conversion_start,
    "conversion_done": method_conversion_done,
    "vin_callback": method_vin_callback,
    "intr_callback": method_intr_callback,
    "intr_r": method_intr_r,
    "adc0804_device::vin_callback": method_adc0804_device__vin_callback,
    "adc0804_device::intr_callback": method_adc0804_device__intr_callback,
    "adc0804_device::intr_r": method_adc0804_device__intr_r
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["clocks_to_attotime","m_intr_callback","m_vin_callback"];

export const device = definition;
export default device;
