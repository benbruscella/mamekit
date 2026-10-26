// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './namco_06xx.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_data_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let result: any = ((255) & 0xff);
    if (((((((members.m_control ?? 0)) >>> (4)) & 1)) ? 0 : 1)) {
      0;
      return ((0) & 0xff);
    }
    if (((((members.m_control ?? 0)) >>> (0)) & 1)) {
      result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 0)(0)))) & 0xff);
    }
    if (((((members.m_control ?? 0)) >>> (1)) & 1)) {
      result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 1)(0)))) & 0xff);
    }
    if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
      result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 2)(0)))) & 0xff);
    }
    if (((((members.m_control ?? 0)) >>> (3)) & 1)) {
      result = ((((result) & (runtime.readIndex((members.m_read ?? 0), 3)(0)))) & 0xff);
    }
    return ((result) & 0xff);
  }

  function method_ctrl_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_control ?? 0)) & 0xff);
  }

  function method_nmi_generate(runtime: any, param: any): any {
    const members = runtime.members;

    members.m_timer_state = (((((members.m_timer_state ?? 0)) ? 0 : 1)) ? 1 : 0);
    if ((members.m_timer_state ?? 0)) {
      runtime.readIndex((members.m_rw ?? 0), 0)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
      runtime.readIndex((members.m_rw ?? 0), 1)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
      runtime.readIndex((members.m_rw ?? 0), 2)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
      runtime.readIndex((members.m_rw ?? 0), 3)(0, ((((members.m_control ?? 0)) >>> (4)) & 1));
    }
    if (((((members.m_timer_state ?? 0)) && ((((members.m_read_stretch ?? 0)) ? 0 : 1))) ? 1 : 0)) {
      runtime.invoke("set_nmi", 1);
    } else {
      runtime.invoke("set_nmi", 0);
    }
    members.m_read_stretch = ((0) ? 1 : 0);
    runtime.readIndex((members.m_chipsel ?? 0), 0)(0, (((((((members.m_control ?? 0)) >>> (0)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
    runtime.readIndex((members.m_chipsel ?? 0), 1)(0, (((((((members.m_control ?? 0)) >>> (1)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
    runtime.readIndex((members.m_chipsel ?? 0), 2)(0, (((((((members.m_control ?? 0)) >>> (2)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
    runtime.readIndex((members.m_chipsel ?? 0), 3)(0, (((((((members.m_control ?? 0)) >>> (3)) & 1)) && ((members.m_timer_state ?? 0))) ? 1 : 0));
  }

  function method_write_sync(runtime: any, param: any): any {
    const members = runtime.members;

    if (((((members.m_control ?? 0)) >>> (4)) & 1)) {
      0;
      return;
    }
    if (((((members.m_control ?? 0)) >>> (0)) & 1)) {
      runtime.readIndex((members.m_write ?? 0), 0)(0, param);
    }
    if (((((members.m_control ?? 0)) >>> (1)) & 1)) {
      runtime.readIndex((members.m_write ?? 0), 1)(0, param);
    }
    if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
      runtime.readIndex((members.m_write ?? 0), 2)(0, param);
    }
    if (((((members.m_control ?? 0)) >>> (3)) & 1)) {
      runtime.readIndex((members.m_write ?? 0), 3)(0, param);
    }
  }

  function method_ctrl_w_sync(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_control = ((param) & 0xff);
    if (((Number((((members.m_control ?? 0)) & (224))) === Number(0)) ? 1 : 0)) {
      ((runtime.dereference(members.m_nmi_timer)).adjust?.(Infinity) ?? 0);
      members.m_timer_state = ((0) ? 1 : 0);
      runtime.invoke("set_nmi", 0);
      runtime.readIndex((members.m_chipsel ?? 0), 0)(0, 0);
      runtime.readIndex((members.m_chipsel ?? 0), 1)(0, 0);
      runtime.readIndex((members.m_chipsel ?? 0), 2)(0, 0);
      runtime.readIndex((members.m_chipsel ?? 0), 3)(0, 0);
    } else {
      if (((((members.m_control ?? 0)) >>> (4)) & 1)) {
        runtime.invoke("set_nmi", 0);
        members.m_read_stretch = ((1) ? 1 : 0);
      } else {
        members.m_read_stretch = ((0) ? 1 : 0);
      }
      let num_shifts: any = ((runtime.shiftRight((((members.m_control ?? 0)) & (224)), 5)) & 0xff);
      let divisor: any = ((((1) << (num_shifts))) & 0xff);
      let period: any = runtime.divide((__l["attotime::from_hz"] ? __l["attotime::from_hz"](runtime.divide((__l["clock"] ? __l["clock"]() : runtime.macro("clock")), divisor)) : runtime.macro("attotime::from_hz", runtime.divide((__l["clock"] ? __l["clock"]() : runtime.macro("clock")), divisor))), 2);
      let now: any = ((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
      let total_ticks: any = (typeof now === 'number' ? runtime.attotime(now, "as_ticks", (__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) : ((runtime.dereference(now)).as_ticks?.((__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) ?? 0));
      let delay: any = (((__l["attotime::from_ticks"] ? __l["attotime::from_ticks"](((total_ticks) + (1)), (__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", ((total_ticks) + (1)), (__l["clock"] ? __l["clock"]() : runtime.macro("clock"))))) - (now));
      ((runtime.dereference(members.m_nmi_timer)).adjust?.(delay, 0, period) ?? 0);
    }
  }

  function method_set_maincpu(runtime: any, tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_nmicpu.set_tag"] ? __l["m_nmicpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) : ((members.m_nmicpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) ?? 0));
  }

  function method_namco_06xx_device__set_maincpu(runtime: any, tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_nmicpu.set_tag"] ? __l["m_nmicpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) : ((members.m_nmicpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) ?? 0));
  }
  return {
    "data_r": method_data_r,
    "ctrl_r": method_ctrl_r,
    "nmi_generate": method_nmi_generate,
    "write_sync": method_write_sync,
    "ctrl_w_sync": method_ctrl_w_sync,
    "set_maincpu": method_set_maincpu,
    "namco_06xx_device::set_maincpu": method_namco_06xx_device__set_maincpu
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["attotime::from_hz","attotime::from_ticks","clock","m_nmicpu.set_tag","machine","machine().time","std::forward"];

export const device = definition;
export default device;
