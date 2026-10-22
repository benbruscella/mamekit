// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './dma_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_card = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
  }

  function method_busreq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_out_busreq_cb"] ? __l["m_out_busreq_cb"](Number(state)) : typeof members.m_out_busreq_cb === 'function' ? members.m_out_busreq_cb(state) : runtime.invoke("m_out_busreq_cb", state));
  }

  function method_int_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_out_int_cb"] ? __l["m_out_int_cb"](Number(state)) : typeof members.m_out_int_cb === 'function' ? members.m_out_int_cb(state) : runtime.invoke("m_out_int_cb", state));
  }

  function method_mreq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_out_mreq_cb"] ? __l["m_out_mreq_cb"](Number(state)) : typeof members.m_out_mreq_cb === 'function' ? members.m_out_mreq_cb(state) : runtime.invoke("m_out_mreq_cb", state));
  }

  function method_mreq_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((__l["m_in_mreq_cb"] ? __l["m_in_mreq_cb"](Number(offset)) : typeof members.m_in_mreq_cb === 'function' ? members.m_in_mreq_cb(offset) : runtime.invoke("m_in_mreq_cb", offset))) & 0xff);
  }

  function method_iorq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_out_iorq_cb"] ? __l["m_out_iorq_cb"](Number(state)) : typeof members.m_out_iorq_cb === 'function' ? members.m_out_iorq_cb(state) : runtime.invoke("m_out_iorq_cb", state));
  }

  function method_iorq_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((__l["m_in_iorq_cb"] ? __l["m_in_iorq_cb"](Number(offset)) : typeof members.m_in_iorq_cb === 'function' ? members.m_in_iorq_cb(offset) : runtime.invoke("m_in_iorq_cb", offset))) & 0xff);
  }

  function method_bai_w(runtime: any, state: any): any {
    const members = runtime.members;

    if ((members.m_card ?? 0)) {
      ((runtime.dereference(members.m_card)).bai_w?.(state) ?? 0);
    }
  }

  function method_dma_slot_device(runtime: any, mconfig: any, tag: any, owner: any, clock: any, opts: any, dflt: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
  }

  function method_set_io_space(runtime: any, tag: any, spacenum: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_io)).set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag)), spacenum) ?? 0);
  }

  function method_out_busreq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_busreq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_busreq_cb)).bind() : typeof (runtime.dereference(members.m_out_busreq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_busreq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_busreq_cb)).bind : runtime.container(members.m_out_busreq_cb, "bind"));
  }

  function method_out_int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_int_cb)).bind === 'function' ? (runtime.dereference(members.m_out_int_cb)).bind() : typeof (runtime.dereference(members.m_out_int_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_int_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_int_cb)).bind : runtime.container(members.m_out_int_cb, "bind"));
  }

  function method_in_mreq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_mreq_cb)).bind === 'function' ? (runtime.dereference(members.m_in_mreq_cb)).bind() : typeof (runtime.dereference(members.m_in_mreq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_mreq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_mreq_cb)).bind : runtime.container(members.m_in_mreq_cb, "bind"));
  }

  function method_out_mreq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_mreq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_mreq_cb)).bind() : typeof (runtime.dereference(members.m_out_mreq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_mreq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_mreq_cb)).bind : runtime.container(members.m_out_mreq_cb, "bind"));
  }

  function method_in_iorq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_iorq_cb)).bind === 'function' ? (runtime.dereference(members.m_in_iorq_cb)).bind() : typeof (runtime.dereference(members.m_in_iorq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_iorq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_iorq_cb)).bind : runtime.container(members.m_in_iorq_cb, "bind"));
  }

  function method_out_iorq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_iorq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_iorq_cb)).bind() : typeof (runtime.dereference(members.m_out_iorq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_iorq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_iorq_cb)).bind : runtime.container(members.m_out_iorq_cb, "bind"));
  }

  function method_io(runtime: any): any {
    const members = runtime.members;

    const h_m_io = members.m_io ?? 0;
    return runtime.dereference(h_m_io);
  }

  function method_dma_slot_device__dma_slot_device(runtime: any, mconfig: any, tag: any, owner: any, clock: any, opts: any, dflt: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
  }

  function method_dma_slot_device__set_io_space(runtime: any, tag: any, spacenum: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_io)).set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag)), spacenum) ?? 0);
  }

  function method_dma_slot_device__out_busreq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_busreq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_busreq_cb)).bind() : typeof (runtime.dereference(members.m_out_busreq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_busreq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_busreq_cb)).bind : runtime.container(members.m_out_busreq_cb, "bind"));
  }

  function method_dma_slot_device__out_int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_int_cb)).bind === 'function' ? (runtime.dereference(members.m_out_int_cb)).bind() : typeof (runtime.dereference(members.m_out_int_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_int_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_int_cb)).bind : runtime.container(members.m_out_int_cb, "bind"));
  }

  function method_dma_slot_device__in_mreq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_mreq_cb)).bind === 'function' ? (runtime.dereference(members.m_in_mreq_cb)).bind() : typeof (runtime.dereference(members.m_in_mreq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_mreq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_mreq_cb)).bind : runtime.container(members.m_in_mreq_cb, "bind"));
  }

  function method_dma_slot_device__out_mreq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_mreq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_mreq_cb)).bind() : typeof (runtime.dereference(members.m_out_mreq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_mreq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_mreq_cb)).bind : runtime.container(members.m_out_mreq_cb, "bind"));
  }

  function method_dma_slot_device__in_iorq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_in_iorq_cb)).bind === 'function' ? (runtime.dereference(members.m_in_iorq_cb)).bind() : typeof (runtime.dereference(members.m_in_iorq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_in_iorq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_in_iorq_cb)).bind : runtime.container(members.m_in_iorq_cb, "bind"));
  }

  function method_dma_slot_device__out_iorq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_iorq_cb)).bind === 'function' ? (runtime.dereference(members.m_out_iorq_cb)).bind() : typeof (runtime.dereference(members.m_out_iorq_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_iorq_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_iorq_cb)).bind : runtime.container(members.m_out_iorq_cb, "bind"));
  }

  function method_dma_slot_device__io(runtime: any): any {
    const members = runtime.members;

    const h_m_io = members.m_io ?? 0;
    return runtime.dereference(h_m_io);
  }
  return {
    "device_start": method_device_start,
    "busreq_w": method_busreq_w,
    "int_w": method_int_w,
    "mreq_w": method_mreq_w,
    "mreq_r": method_mreq_r,
    "iorq_w": method_iorq_w,
    "iorq_r": method_iorq_r,
    "bai_w": method_bai_w,
    "dma_slot_device": method_dma_slot_device,
    "set_io_space": method_set_io_space,
    "out_busreq_callback": method_out_busreq_callback,
    "out_int_callback": method_out_int_callback,
    "in_mreq_callback": method_in_mreq_callback,
    "out_mreq_callback": method_out_mreq_callback,
    "in_iorq_callback": method_in_iorq_callback,
    "out_iorq_callback": method_out_iorq_callback,
    "io": method_io,
    "dma_slot_device::dma_slot_device": method_dma_slot_device__dma_slot_device,
    "dma_slot_device::set_io_space": method_dma_slot_device__set_io_space,
    "dma_slot_device::out_busreq_callback": method_dma_slot_device__out_busreq_callback,
    "dma_slot_device::out_int_callback": method_dma_slot_device__out_int_callback,
    "dma_slot_device::in_mreq_callback": method_dma_slot_device__in_mreq_callback,
    "dma_slot_device::out_mreq_callback": method_dma_slot_device__out_mreq_callback,
    "dma_slot_device::in_iorq_callback": method_dma_slot_device__in_iorq_callback,
    "dma_slot_device::out_iorq_callback": method_dma_slot_device__out_iorq_callback,
    "dma_slot_device::io": method_dma_slot_device__io
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["get_card_device","m_in_iorq_cb","m_in_mreq_cb","m_out_busreq_cb","m_out_int_cb","m_out_iorq_cb","m_out_mreq_cb","set_options","std::forward"];

export const device = definition;
export default device;
