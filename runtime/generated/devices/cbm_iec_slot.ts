// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './cbm_iec_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_cbm_iec_slot_device(runtime: any, mconfig: any, tag: any, owner: any, address: any, opts: any, dflt: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    method_set_address(runtime, address);
  }

  function method_set_address(runtime: any, address: any): any {
    const members = runtime.members;

    members.m_address = ((address) | 0);
  }

  function method_get_address(runtime: any): any {
    const members = runtime.members;

    return (members.m_address ?? runtime.member("m_address"));
  }

  function method_cbm_iec_slot_device__cbm_iec_slot_device(runtime: any, mconfig: any, tag: any, owner: any, address: any, opts: any, dflt: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    method_set_address(runtime, address);
  }

  function method_cbm_iec_slot_device__set_address(runtime: any, address: any): any {
    const members = runtime.members;

    members.m_address = ((address) | 0);
  }

  function method_cbm_iec_slot_device__get_address(runtime: any): any {
    const members = runtime.members;

    return (members.m_address ?? runtime.member("m_address"));
  }
  return {
    "cbm_iec_slot_device": method_cbm_iec_slot_device,
    "set_address": method_set_address,
    "get_address": method_get_address,
    "cbm_iec_slot_device::cbm_iec_slot_device": method_cbm_iec_slot_device__cbm_iec_slot_device,
    "cbm_iec_slot_device::set_address": method_cbm_iec_slot_device__set_address,
    "cbm_iec_slot_device::get_address": method_cbm_iec_slot_device__get_address
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["set_options","std::forward"];

export const device = definition;
export default device;
