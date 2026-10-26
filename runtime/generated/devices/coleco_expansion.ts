// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './coleco_expansion.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_int_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_int_handler)).bind === 'function' ? (runtime.dereference(members.m_int_handler)).bind() : typeof (runtime.dereference(members.m_int_handler)).bind === 'number' || typeof (runtime.dereference(members.m_int_handler)).bind === 'boolean' ? (runtime.dereference(members.m_int_handler)).bind : runtime.container(members.m_int_handler, "bind"));
  }

  function method_nmi_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_nmi_handler)).bind === 'function' ? (runtime.dereference(members.m_nmi_handler)).bind() : typeof (runtime.dereference(members.m_nmi_handler)).bind === 'number' || typeof (runtime.dereference(members.m_nmi_handler)).bind === 'boolean' ? (runtime.dereference(members.m_nmi_handler)).bind : runtime.container(members.m_nmi_handler, "bind"));
  }

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

  function method_mem_space(runtime: any): any {
    const members = runtime.members;

    const h_m_program = members.m_program ?? 0;
    return runtime.dereference(h_m_program);
  }

  function method_io_space(runtime: any): any {
    const members = runtime.members;

    const h_m_io = members.m_io ?? 0;
    return runtime.dereference(h_m_io);
  }

  function method_coleco_expansion_device__int_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_int_handler)).bind === 'function' ? (runtime.dereference(members.m_int_handler)).bind() : typeof (runtime.dereference(members.m_int_handler)).bind === 'number' || typeof (runtime.dereference(members.m_int_handler)).bind === 'boolean' ? (runtime.dereference(members.m_int_handler)).bind : runtime.container(members.m_int_handler, "bind"));
  }

  function method_coleco_expansion_device__nmi_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_nmi_handler)).bind === 'function' ? (runtime.dereference(members.m_nmi_handler)).bind() : typeof (runtime.dereference(members.m_nmi_handler)).bind === 'number' || typeof (runtime.dereference(members.m_nmi_handler)).bind === 'boolean' ? (runtime.dereference(members.m_nmi_handler)).bind : runtime.container(members.m_nmi_handler, "bind"));
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

  function method_coleco_expansion_device__mem_space(runtime: any): any {
    const members = runtime.members;

    const h_m_program = members.m_program ?? 0;
    return runtime.dereference(h_m_program);
  }

  function method_coleco_expansion_device__io_space(runtime: any): any {
    const members = runtime.members;

    const h_m_io = members.m_io ?? 0;
    return runtime.dereference(h_m_io);
  }
  return {
    "int_handler": method_int_handler,
    "nmi_handler": method_nmi_handler,
    "int_w": method_int_w,
    "nmi_w": method_nmi_w,
    "mem_space": method_mem_space,
    "io_space": method_io_space,
    "coleco_expansion_device::int_handler": method_coleco_expansion_device__int_handler,
    "coleco_expansion_device::nmi_handler": method_coleco_expansion_device__nmi_handler,
    "coleco_expansion_device::int_w": method_coleco_expansion_device__int_w,
    "coleco_expansion_device::nmi_w": method_coleco_expansion_device__nmi_w,
    "coleco_expansion_device::mem_space": method_coleco_expansion_device__mem_space,
    "coleco_expansion_device::io_space": method_coleco_expansion_device__io_space
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_int_handler","m_nmi_handler"];

export const device = definition;
export default device;
