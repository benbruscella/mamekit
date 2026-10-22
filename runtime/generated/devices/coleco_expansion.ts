// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './coleco_expansion.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_int_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_int_handler"] ? __l["m_int_handler"](Number(state)) : typeof members.m_int_handler === 'function' ? members.m_int_handler(state) : runtime.invoke("m_int_handler", state));
  }

  function method_nmi_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_nmi_handler"] ? __l["m_nmi_handler"](Number(state)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(state) : runtime.invoke("m_nmi_handler", state));
  }

  function method_coleco_expansion_device__int_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_int_handler"] ? __l["m_int_handler"](Number(state)) : typeof members.m_int_handler === 'function' ? members.m_int_handler(state) : runtime.invoke("m_int_handler", state));
  }

  function method_coleco_expansion_device__nmi_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_nmi_handler"] ? __l["m_nmi_handler"](Number(state)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(state) : runtime.invoke("m_nmi_handler", state));
  }
  return {
    "int_w": method_int_w,
    "nmi_w": method_nmi_w,
    "coleco_expansion_device::int_w": method_coleco_expansion_device__int_w,
    "coleco_expansion_device::nmi_w": method_coleco_expansion_device__nmi_w
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_int_handler","m_nmi_handler"];

export const device = definition;
export default device;
