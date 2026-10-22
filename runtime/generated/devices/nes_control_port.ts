// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './nes_control_port.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    let data: any = ((0) & 0xff);
    if ((members.m_device ?? 0)) {
      data = ((((runtime.dereference(members.m_device)).read_exp?.(offset) ?? 0)) & 0xff);
    }
    return ((data) & 0xff);
  }
  return {
    "read_exp": method_read_exp
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["joypad"]!.compiledMethods = (() => {


  function method_read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_device_nes_control_port_interface__read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }
  return {
    "read_exp": method_read_exp,
    "device_nes_control_port_interface::read_exp": method_device_nes_control_port_interface__read_exp
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["zapper"]!.compiledMethods = (() => {


  function method_read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    let ret: any = ((0) & 0xff);
    if (((Number(offset) === Number(1)) ? 1 : 0)) {
      ret = ((method_device_nes_control_port_interface__read_bit34(runtime)) & 0xff);
    }
    return ((ret) & 0xff);
  }

  function method_device_nes_control_port_interface__read_bit34(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_device_nes_control_port_interface__read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_trigger(runtime: any, field: any, param: any, oldval: any, newval: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (newval) {
      ((runtime.dereference(members.m_trigger)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](50) : runtime.macro("attotime::from_msec", 50))) ?? 0);
    }
  }
  return {
    "read_exp": method_read_exp,
    "device_nes_control_port_interface::read_bit34": method_device_nes_control_port_interface__read_bit34,
    "device_nes_control_port_interface::read_exp": method_device_nes_control_port_interface__read_exp,
    "trigger": method_trigger
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["zapper"]!.compiledMethodLinks = ["attotime::from_msec"];
definition.slot!.options["zapper"]!.children![0]!.definition.compiledMethods = (() => {


  function method_detect_light(runtime: any, x: any, y: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let vpos: any = (((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : ((members.m_screen)?.vpos?.() ?? 0))) | 0);
    let hpos: any = (((__l["m_screen.hpos"] ? __l["m_screen.hpos"]() : ((members.m_screen)?.hpos?.() ?? 0))) | 0);
    if ((((__l["m_screen.vblank"] ? __l["m_screen.vblank"]() : ((members.m_screen)?.vblank?.() ?? 0))) ? 0 : 1)) {
      if ((((((Number(vpos) > Number(((y) - (5)))) ? 1 : 0)) || ((((((Number(vpos) === Number(((y) - (5)))) ? 1 : 0)) && (((Number(hpos) >= Number(((x) - (5)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
        (__l["m_screen.update_now"] ? __l["m_screen.update_now"]() : ((members.m_screen)?.update_now?.() ?? 0));
      }
    }
    let sum: any = ((0) | 0);
    let scanned: any = ((0) | 0);
    for (let i: any = ((((x) - (5))) | 0); ((Number(i) <= Number(((x) + (5)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      for (let j: any = ((((y) - (5))) | 0); ((Number(j) <= Number(((y) + (5)))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        if (((Number(runtime.add(((((x) - (i))) * (((x) - (i)))), ((((y) - (j))) * (((y) - (j)))))) <= Number(25)) ? 1 : 0)) {
          let pix: any = (__l["m_screen.pixel"] ? __l["m_screen.pixel"](i, j) : ((members.m_screen)?.pixel?.(i, j) ?? 0));
          if (((((((((Number(j) <= Number(vpos)) ? 1 : 0)) && (((Number(j) > Number(((vpos) - (22)))) ? 1 : 0))) ? 1 : 0)) && ((((((Number(j) !== Number(vpos)) ? 1 : 0)) || (((Number(i) <= Number(hpos)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            sum = ((((sum) + (runtime.add(runtime.add((typeof pix === 'number' ? ((pix) >>> 0) & 0xff : ((runtime.dereference(pix)).r?.() ?? 0)), (typeof pix === 'number' ? ((pix) >>> 8) & 0xff : ((runtime.dereference(pix)).g?.() ?? 0))), (typeof pix === 'number' ? ((pix) >>> 16) & 0xff : ((runtime.dereference(pix)).b?.() ?? 0)))))) | 0);
          }
          scanned = ((((scanned) + (1))) | 0);
        }
      }
    }
    return ((Number(sum) >= Number(((192) * (scanned)))) ? 1 : 0);
  }
  return {
    "detect_light": method_detect_light
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["zapper"]!.children![0]!.definition.compiledMethodLinks = ["m_screen.hpos","m_screen.pixel","m_screen.update_now","m_screen.vblank","m_screen.vpos"];
definition.slot!.options["vaus"]!.compiledMethods = (() => {


  function method_read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_device_nes_control_port_interface__read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }
  return {
    "read_exp": method_read_exp,
    "device_nes_control_port_interface::read_exp": method_device_nes_control_port_interface__read_exp
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["powerpad"]!.compiledMethods = (() => {


  function method_read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_device_nes_control_port_interface__read_exp(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }
  return {
    "read_exp": method_read_exp,
    "device_nes_control_port_interface::read_exp": method_device_nes_control_port_interface__read_exp
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
