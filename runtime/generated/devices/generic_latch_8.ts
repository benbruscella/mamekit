// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './generic_latch_8.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_init_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_data_pending_cb"] ? __l["m_data_pending_cb"](Number((((members.m_latch_written ?? 0)) ? (1) : (0)))) : typeof members.m_data_pending_cb === 'function' ? members.m_data_pending_cb((((members.m_latch_written ?? 0)) ? (1) : (0))) : runtime.invoke("m_data_pending_cb", (((members.m_latch_written ?? 0)) ? (1) : (0))));
  }

  function method_pending_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_latch_written ?? 0)) ? (1) : (0));
  }

  function method_set_latch_written(runtime: any, latch_written: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_latch_written ?? 0)) !== Number(latch_written)) ? 1 : 0)) {
      members.m_latch_written = ((latch_written) ? 1 : 0);
      (__l["m_data_pending_cb"] ? __l["m_data_pending_cb"](Number(((latch_written) ? (1) : (0)))) : typeof members.m_data_pending_cb === 'function' ? members.m_data_pending_cb(((latch_written) ? (1) : (0))) : runtime.invoke("m_data_pending_cb", ((latch_written) ? (1) : (0))));
    }
  }

  function method_data_pending_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_data_pending_cb)).bind === 'function' ? (runtime.dereference(members.m_data_pending_cb)).bind() : typeof (runtime.dereference(members.m_data_pending_cb)).bind === 'number' || typeof (runtime.dereference(members.m_data_pending_cb)).bind === 'boolean' ? (runtime.dereference(members.m_data_pending_cb)).bind : runtime.container(members.m_data_pending_cb, "bind"));
  }

  function method_set_separate_acknowledge(runtime: any, ack: any): any {
    const members = runtime.members;

    members.m_separate_acknowledge = ((ack) ? 1 : 0);
  }

  function method_has_separate_acknowledge(runtime: any): any {
    const members = runtime.members;

    return (members.m_separate_acknowledge ?? 0);
  }

  function method_is_latch_written(runtime: any): any {
    const members = runtime.members;

    return (members.m_latch_written ?? 0);
  }

  function method_generic_latch_base_device__data_pending_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_data_pending_cb)).bind === 'function' ? (runtime.dereference(members.m_data_pending_cb)).bind() : typeof (runtime.dereference(members.m_data_pending_cb)).bind === 'number' || typeof (runtime.dereference(members.m_data_pending_cb)).bind === 'boolean' ? (runtime.dereference(members.m_data_pending_cb)).bind : runtime.container(members.m_data_pending_cb, "bind"));
  }

  function method_generic_latch_base_device__set_separate_acknowledge(runtime: any, ack: any): any {
    const members = runtime.members;

    members.m_separate_acknowledge = ((ack) ? 1 : 0);
  }

  function method_generic_latch_base_device__has_separate_acknowledge(runtime: any): any {
    const members = runtime.members;

    return (members.m_separate_acknowledge ?? 0);
  }

  function method_generic_latch_base_device__is_latch_written(runtime: any): any {
    const members = runtime.members;

    return (members.m_latch_written ?? 0);
  }

  function method_preset_w(runtime: any, data: any = 255): any {
    const members = runtime.members;

    members.m_latched_value = ((data) & 0xff);
  }

  function method_preset(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_latched_value = ((255) & 0xff);
  }

  function method_clear(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_latched_value = ((0) & 0xff);
  }

  function method_sync_callback(runtime: any, param: any): any {
    const members = runtime.members;

    let value: any = ((param) & 0xff);
    if ((((method_is_latch_written(runtime)) && (((Number((members.m_latched_value ?? 0)) !== Number(value)) ? 1 : 0))) ? 1 : 0)) {
      0;
    }
    members.m_latched_value = ((value) & 0xff);
    method_set_latch_written(runtime, 1);
  }
  return {
    "init_callback": method_init_callback,
    "pending_r": method_pending_r,
    "set_latch_written": method_set_latch_written,
    "data_pending_callback": method_data_pending_callback,
    "set_separate_acknowledge": method_set_separate_acknowledge,
    "has_separate_acknowledge": method_has_separate_acknowledge,
    "is_latch_written": method_is_latch_written,
    "generic_latch_base_device::data_pending_callback": method_generic_latch_base_device__data_pending_callback,
    "generic_latch_base_device::set_separate_acknowledge": method_generic_latch_base_device__set_separate_acknowledge,
    "generic_latch_base_device::has_separate_acknowledge": method_generic_latch_base_device__has_separate_acknowledge,
    "generic_latch_base_device::is_latch_written": method_generic_latch_base_device__is_latch_written,
    "preset_w": method_preset_w,
    "preset": method_preset,
    "clear": method_clear,
    "sync_callback": method_sync_callback
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_data_pending_cb"];

export const device = definition;
export default device;
