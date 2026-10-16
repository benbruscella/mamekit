// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './cbm_iec.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_device_start(runtime: any): any {
    const members = runtime.members;


  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;

    method_host_reset_w(runtime, 0);
    method_host_reset_w(runtime, 1);
  }

  function method_host_reset_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 4, state);
  }

  function method_set_signal(runtime: any, device: any, signal: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let changed: any = ((0) ? 1 : 0);
    if ((runtime.same(device, (members.this ?? runtime.member("this"))) ? 1 : 0)) {
      if (((Number(runtime.readIndex((members.m_line ?? runtime.member("m_line")), signal)) !== Number(state)) ? 1 : 0)) {
        if (0) {
          0;
        }
        runtime.writeIndex(runtime.writableMember("m_line"), signal, state);
        changed = ((1) ? 1 : 0);
      }
    } else {
      let entry: any = (typeof (runtime.dereference(members.m_device_list)).first === 'function' ? (runtime.dereference(members.m_device_list)).first() : typeof (runtime.dereference(members.m_device_list)).first === 'number' || typeof (runtime.dereference(members.m_device_list)).first === 'boolean' ? (runtime.dereference(members.m_device_list)).first : runtime.container(members.m_device_list, "first"));
      while (entry) {
        if ((((__l["strcmp"] ? __l["strcmp"]((typeof (runtime.dereference(entry.m_device)).tag === 'function' ? (runtime.dereference(entry.m_device)).tag() : typeof (runtime.dereference(entry.m_device)).tag === 'number' || typeof (runtime.dereference(entry.m_device)).tag === 'boolean' ? (runtime.dereference(entry.m_device)).tag : runtime.container(entry.m_device, "tag")), (typeof (runtime.dereference(device)).tag === 'function' ? (runtime.dereference(device)).tag() : typeof (runtime.dereference(device)).tag === 'number' || typeof (runtime.dereference(device)).tag === 'boolean' ? (runtime.dereference(device)).tag : runtime.container(device, "tag"))) : runtime.macro("strcmp", (typeof (runtime.dereference(entry.m_device)).tag === 'function' ? (runtime.dereference(entry.m_device)).tag() : typeof (runtime.dereference(entry.m_device)).tag === 'number' || typeof (runtime.dereference(entry.m_device)).tag === 'boolean' ? (runtime.dereference(entry.m_device)).tag : runtime.container(entry.m_device, "tag")), (typeof (runtime.dereference(device)).tag === 'function' ? (runtime.dereference(device)).tag() : typeof (runtime.dereference(device)).tag === 'number' || typeof (runtime.dereference(device)).tag === 'boolean' ? (runtime.dereference(device)).tag : runtime.container(device, "tag"))))) ? 0 : 1)) {
          if (((Number(runtime.readIndex(entry.m_line, signal)) !== Number(state)) ? 1 : 0)) {
            if (0) {
              0;
            }
            runtime.writeIndex(entry.m_line, signal, state);
            changed = ((1) ? 1 : 0);
          }
        }
        entry = (typeof (runtime.dereference(entry)).next === 'function' ? (runtime.dereference(entry)).next() : typeof (runtime.dereference(entry)).next === 'number' || typeof (runtime.dereference(entry)).next === 'boolean' ? (runtime.dereference(entry)).next : runtime.container(entry, "next"));
      }
    }
    if (changed) {
      switch (signal) {
        case 0:
        {
          (__l["m_write_srq"] ? __l["m_write_srq"](Number(state)) : typeof members.m_write_srq === 'function' ? members.m_write_srq(state) : runtime.invoke("m_write_srq", state));
          break;
        }
        case 1:
        {
          (__l["m_write_atn"] ? __l["m_write_atn"](Number(state)) : typeof members.m_write_atn === 'function' ? members.m_write_atn(state) : runtime.invoke("m_write_atn", state));
          break;
        }
        case 2:
        {
          (__l["m_write_clk"] ? __l["m_write_clk"](Number(state)) : typeof members.m_write_clk === 'function' ? members.m_write_clk(state) : runtime.invoke("m_write_clk", state));
          break;
        }
        case 3:
        {
          (__l["m_write_data"] ? __l["m_write_data"](Number(state)) : typeof members.m_write_data === 'function' ? members.m_write_data(state) : runtime.invoke("m_write_data", state));
          break;
        }
        case 4:
        {
          (__l["m_write_reset"] ? __l["m_write_reset"](Number(state)) : typeof members.m_write_reset === 'function' ? members.m_write_reset(state) : runtime.invoke("m_write_reset", state));
          break;
        }
      }
      let entry: any = (typeof (runtime.dereference(members.m_device_list)).first === 'function' ? (runtime.dereference(members.m_device_list)).first() : typeof (runtime.dereference(members.m_device_list)).first === 'number' || typeof (runtime.dereference(members.m_device_list)).first === 'boolean' ? (runtime.dereference(members.m_device_list)).first : runtime.container(members.m_device_list, "first"));
      while (entry) {
        switch (signal) {
          case 0:
          {
            ((runtime.dereference(entry.m_interface)).cbm_iec_srq?.(state) ?? 0);
            break;
          }
          case 1:
          {
            ((runtime.dereference(entry.m_interface)).cbm_iec_atn?.(state) ?? 0);
            break;
          }
          case 2:
          {
            ((runtime.dereference(entry.m_interface)).cbm_iec_clk?.(state) ?? 0);
            break;
          }
          case 3:
          {
            ((runtime.dereference(entry.m_interface)).cbm_iec_data?.(state) ?? 0);
            break;
          }
          case 4:
          {
            ((runtime.dereference(entry.m_interface)).cbm_iec_reset?.(state) ?? 0);
            break;
          }
        }
        entry = (typeof (runtime.dereference(entry)).next === 'function' ? (runtime.dereference(entry)).next() : typeof (runtime.dereference(entry)).next === 'number' || typeof (runtime.dereference(entry)).next === 'boolean' ? (runtime.dereference(entry)).next : runtime.container(entry, "next"));
      }
      if (0) {
        0;
      }
    }
  }

  function method_device_stop(runtime: any): any {
    const members = runtime.members;

    (typeof (runtime.dereference(members.m_device_list)).reset === 'function' ? (runtime.dereference(members.m_device_list)).reset() : typeof (runtime.dereference(members.m_device_list)).reset === 'number' || typeof (runtime.dereference(members.m_device_list)).reset === 'boolean' ? (runtime.dereference(members.m_device_list)).reset : runtime.container(members.m_device_list, "reset"));
  }

  function method_add_device(runtime: any, slot: any, target: any): any {
    const members = runtime.members;

    let entry: any = runtime.invoke("new::daisy_entry", target);
    entry.m_interface.m_slot = slot;
    entry.m_interface.m_bus = (members.this ?? runtime.member("this"));
    ((runtime.dereference(members.m_device_list)).append?.(runtime.dereference(entry)) ?? 0);
  }

  function method_get_signal(runtime: any, signal: any): any {
    const members = runtime.members;

    let state: any = ((runtime.readIndex((members.m_line ?? runtime.member("m_line")), signal)) | 0);
    if (state) {
      let entry: any = (typeof (runtime.dereference(members.m_device_list)).first === 'function' ? (runtime.dereference(members.m_device_list)).first() : typeof (runtime.dereference(members.m_device_list)).first === 'number' || typeof (runtime.dereference(members.m_device_list)).first === 'boolean' ? (runtime.dereference(members.m_device_list)).first : runtime.container(members.m_device_list, "first"));
      while (entry) {
        if (((runtime.readIndex(entry.m_line, signal)) ? 0 : 1)) {
          state = ((0) | 0);
          break;
        }
        entry = (typeof (runtime.dereference(entry)).next === 'function' ? (runtime.dereference(entry)).next() : typeof (runtime.dereference(entry)).next === 'number' || typeof (runtime.dereference(entry)).next === 'boolean' ? (runtime.dereference(entry)).next : runtime.container(entry, "next"));
      }
    }
    return state;
  }

  function method_srq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_srq)).bind === 'function' ? (runtime.dereference(members.m_write_srq)).bind() : typeof (runtime.dereference(members.m_write_srq)).bind === 'number' || typeof (runtime.dereference(members.m_write_srq)).bind === 'boolean' ? (runtime.dereference(members.m_write_srq)).bind : runtime.container(members.m_write_srq, "bind"));
  }

  function method_atn_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_atn)).bind === 'function' ? (runtime.dereference(members.m_write_atn)).bind() : typeof (runtime.dereference(members.m_write_atn)).bind === 'number' || typeof (runtime.dereference(members.m_write_atn)).bind === 'boolean' ? (runtime.dereference(members.m_write_atn)).bind : runtime.container(members.m_write_atn, "bind"));
  }

  function method_clk_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_clk)).bind === 'function' ? (runtime.dereference(members.m_write_clk)).bind() : typeof (runtime.dereference(members.m_write_clk)).bind === 'number' || typeof (runtime.dereference(members.m_write_clk)).bind === 'boolean' ? (runtime.dereference(members.m_write_clk)).bind : runtime.container(members.m_write_clk, "bind"));
  }

  function method_data_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_data)).bind === 'function' ? (runtime.dereference(members.m_write_data)).bind() : typeof (runtime.dereference(members.m_write_data)).bind === 'number' || typeof (runtime.dereference(members.m_write_data)).bind === 'boolean' ? (runtime.dereference(members.m_write_data)).bind : runtime.container(members.m_write_data, "bind"));
  }

  function method_reset_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_reset)).bind === 'function' ? (runtime.dereference(members.m_write_reset)).bind() : typeof (runtime.dereference(members.m_write_reset)).bind === 'number' || typeof (runtime.dereference(members.m_write_reset)).bind === 'boolean' ? (runtime.dereference(members.m_write_reset)).bind : runtime.container(members.m_write_reset, "bind"));
  }

  function method_srq_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 0);
  }

  function method_atn_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 1);
  }

  function method_clk_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 2);
  }

  function method_data_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 3);
  }

  function method_reset_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 4);
  }

  function method_host_srq_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 0, state);
  }

  function method_host_atn_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 1, state);
  }

  function method_host_clk_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 2, state);
  }

  function method_host_data_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 3, state);
  }

  function method_srq_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 0, state);
  }

  function method_atn_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 1, state);
  }

  function method_clk_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 2, state);
  }

  function method_data_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 3, state);
  }

  function method_reset_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 4, state);
  }

  function method_cbm_iec_device__srq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_srq)).bind === 'function' ? (runtime.dereference(members.m_write_srq)).bind() : typeof (runtime.dereference(members.m_write_srq)).bind === 'number' || typeof (runtime.dereference(members.m_write_srq)).bind === 'boolean' ? (runtime.dereference(members.m_write_srq)).bind : runtime.container(members.m_write_srq, "bind"));
  }

  function method_cbm_iec_device__atn_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_atn)).bind === 'function' ? (runtime.dereference(members.m_write_atn)).bind() : typeof (runtime.dereference(members.m_write_atn)).bind === 'number' || typeof (runtime.dereference(members.m_write_atn)).bind === 'boolean' ? (runtime.dereference(members.m_write_atn)).bind : runtime.container(members.m_write_atn, "bind"));
  }

  function method_cbm_iec_device__clk_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_clk)).bind === 'function' ? (runtime.dereference(members.m_write_clk)).bind() : typeof (runtime.dereference(members.m_write_clk)).bind === 'number' || typeof (runtime.dereference(members.m_write_clk)).bind === 'boolean' ? (runtime.dereference(members.m_write_clk)).bind : runtime.container(members.m_write_clk, "bind"));
  }

  function method_cbm_iec_device__data_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_data)).bind === 'function' ? (runtime.dereference(members.m_write_data)).bind() : typeof (runtime.dereference(members.m_write_data)).bind === 'number' || typeof (runtime.dereference(members.m_write_data)).bind === 'boolean' ? (runtime.dereference(members.m_write_data)).bind : runtime.container(members.m_write_data, "bind"));
  }

  function method_cbm_iec_device__reset_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_reset)).bind === 'function' ? (runtime.dereference(members.m_write_reset)).bind() : typeof (runtime.dereference(members.m_write_reset)).bind === 'number' || typeof (runtime.dereference(members.m_write_reset)).bind === 'boolean' ? (runtime.dereference(members.m_write_reset)).bind : runtime.container(members.m_write_reset, "bind"));
  }

  function method_cbm_iec_device__srq_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 0);
  }

  function method_cbm_iec_device__atn_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 1);
  }

  function method_cbm_iec_device__clk_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 2);
  }

  function method_cbm_iec_device__data_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 3);
  }

  function method_cbm_iec_device__reset_r(runtime: any): any {
    const members = runtime.members;

    return method_get_signal(runtime, 4);
  }

  function method_cbm_iec_device__host_srq_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 0, state);
  }

  function method_cbm_iec_device__host_atn_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 1, state);
  }

  function method_cbm_iec_device__host_clk_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 2, state);
  }

  function method_cbm_iec_device__host_data_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 3, state);
  }

  function method_cbm_iec_device__host_reset_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, (members.this ?? runtime.member("this")), 4, state);
  }

  function method_cbm_iec_device__srq_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 0, state);
  }

  function method_cbm_iec_device__atn_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 1, state);
  }

  function method_cbm_iec_device__clk_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 2, state);
  }

  function method_cbm_iec_device__data_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 3, state);
  }

  function method_cbm_iec_device__reset_w(runtime: any, device: any, state: any): any {
    const members = runtime.members;

    method_set_signal(runtime, device, 4, state);
  }

  function method___construct(runtime: any, mconfig: any, tag: any, owner: any, clock: any): any {
    const members = runtime.members;

    for (let __range0: any = (members.m_line ?? runtime.member("m_line")), __range0_index: any = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
      runtime.writeIndex(__range0, __range0_index, 1);
    }
  }
  return {
    "device_start": method_device_start,
    "device_reset": method_device_reset,
    "host_reset_w": method_host_reset_w,
    "set_signal": method_set_signal,
    "device_stop": method_device_stop,
    "add_device": method_add_device,
    "get_signal": method_get_signal,
    "srq_callback": method_srq_callback,
    "atn_callback": method_atn_callback,
    "clk_callback": method_clk_callback,
    "data_callback": method_data_callback,
    "reset_callback": method_reset_callback,
    "srq_r": method_srq_r,
    "atn_r": method_atn_r,
    "clk_r": method_clk_r,
    "data_r": method_data_r,
    "reset_r": method_reset_r,
    "host_srq_w": method_host_srq_w,
    "host_atn_w": method_host_atn_w,
    "host_clk_w": method_host_clk_w,
    "host_data_w": method_host_data_w,
    "srq_w": method_srq_w,
    "atn_w": method_atn_w,
    "clk_w": method_clk_w,
    "data_w": method_data_w,
    "reset_w": method_reset_w,
    "cbm_iec_device::srq_callback": method_cbm_iec_device__srq_callback,
    "cbm_iec_device::atn_callback": method_cbm_iec_device__atn_callback,
    "cbm_iec_device::clk_callback": method_cbm_iec_device__clk_callback,
    "cbm_iec_device::data_callback": method_cbm_iec_device__data_callback,
    "cbm_iec_device::reset_callback": method_cbm_iec_device__reset_callback,
    "cbm_iec_device::srq_r": method_cbm_iec_device__srq_r,
    "cbm_iec_device::atn_r": method_cbm_iec_device__atn_r,
    "cbm_iec_device::clk_r": method_cbm_iec_device__clk_r,
    "cbm_iec_device::data_r": method_cbm_iec_device__data_r,
    "cbm_iec_device::reset_r": method_cbm_iec_device__reset_r,
    "cbm_iec_device::host_srq_w": method_cbm_iec_device__host_srq_w,
    "cbm_iec_device::host_atn_w": method_cbm_iec_device__host_atn_w,
    "cbm_iec_device::host_clk_w": method_cbm_iec_device__host_clk_w,
    "cbm_iec_device::host_data_w": method_cbm_iec_device__host_data_w,
    "cbm_iec_device::host_reset_w": method_cbm_iec_device__host_reset_w,
    "cbm_iec_device::srq_w": method_cbm_iec_device__srq_w,
    "cbm_iec_device::atn_w": method_cbm_iec_device__atn_w,
    "cbm_iec_device::clk_w": method_cbm_iec_device__clk_w,
    "cbm_iec_device::data_w": method_cbm_iec_device__data_w,
    "cbm_iec_device::reset_w": method_cbm_iec_device__reset_w,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_write_atn","m_write_clk","m_write_data","m_write_reset","m_write_srq","strcmp"];

export const device = definition;
export default device;
