// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './mos6532.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_pa_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    0;
    members.m_pa_in = (((((((members.m_pa_in ?? runtime.member("m_pa_in"))) & ((~mem_mask)))) | (((data) & (mem_mask))))) & 0xff);
    method_edge_detect(runtime);
  }

  function method_edge_detect(runtime: any) {
    const members = runtime.members;
    let data: any = (((((((members.m_pa_out ?? runtime.member("m_pa_out"))) & ((members.m_pa_ddr ?? runtime.member("m_pa_ddr"))))) | ((((members.m_pa_in ?? runtime.member("m_pa_in"))) & ((~(members.m_pa_ddr ?? runtime.member("m_pa_ddr")))))))) & 0xff);
    let state: any = (((data) >>> (7)) & 1);
    if ((((((((((members.m_pa7 ?? runtime.member("m_pa7"))) ^ (state))) && ((((((members.m_pa7_dir ?? runtime.member("m_pa7_dir"))) ^ (state))) ? 0 : 1))) ? 1 : 0)) && ((((members.m_irq_edge ?? runtime.member("m_irq_edge"))) ? 0 : 1))) ? 1 : 0)) {
      0;
      members.m_irq_edge = ((1) ? 1 : 0);
      method_update_irq(runtime);
    }
    members.m_pa7 = ((state) | 0);
  }

  function method_update_irq(runtime: any) {
    const members = runtime.members;
    let state: any = 0;
    if (((((members.m_ie_timer ?? runtime.member("m_ie_timer"))) && ((members.m_irq_timer ?? runtime.member("m_irq_timer")))) ? 1 : 0)) {
      state = 1;
    }
    if (((((members.m_ie_edge ?? runtime.member("m_ie_edge"))) && ((members.m_irq_edge ?? runtime.member("m_irq_edge")))) ? 1 : 0)) {
      state = 1;
    }
    runtime.invoke("m_irq_cb", state);
  }

  function method_pb_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    0;
    members.m_pb_in = (((((((members.m_pb_in ?? runtime.member("m_pb_in"))) & ((~mem_mask)))) | (((data) & (mem_mask))))) & 0xff);
  }

  function method_pa_data_r(runtime: any) {
    const members = runtime.members;
    let $in: any = ((0) & 0xff);
    if ((typeof (runtime.dereference(members.m_in8_pa_cb)).isunset === 'function' ? (runtime.dereference(members.m_in8_pa_cb)).isunset() : typeof (runtime.dereference(members.m_in8_pa_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_in8_pa_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_in8_pa_cb)).isunset : runtime.container(members.m_in8_pa_cb, "isunset"))) {
      for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
        $in = (((($in) | (((((((runtime.dereference(runtime.readIndex((members.m_in_pa_cb ?? runtime.member("m_in_pa_cb")), i))).isunset?.() ?? runtime.container(runtime.readIndex((members.m_in_pa_cb ?? runtime.member("m_in_pa_cb")), i), "isunset"))) ? (((((members.m_pa_in ?? runtime.member("m_pa_in"))) >>> (i)) & 1)) : (runtime.readIndex((members.m_in_pa_cb ?? runtime.member("m_in_pa_cb")), i)()))) << (i))))) & 0xff);
      }
    } else {
      $in = ((runtime.invoke("m_in8_pa_cb")) & 0xff);
    }
    let data: any = (((((((members.m_pa_out ?? runtime.member("m_pa_out"))) & ((members.m_pa_ddr ?? runtime.member("m_pa_ddr"))))) | ((($in) & ((~(members.m_pa_ddr ?? runtime.member("m_pa_ddr")))))))) & 0xff);
    0;
    return data;
  }

  function method_pa_data_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_pa_out = ((data) & 0xff);
    0;
    method_update_pa(runtime);
    method_edge_detect(runtime);
  }

  function method_update_pa(runtime: any) {
    const members = runtime.members;
    let data: any = (((((((members.m_pa_out ?? runtime.member("m_pa_out"))) & ((members.m_pa_ddr ?? runtime.member("m_pa_ddr"))))) | ((((members.m_pa_ddr ?? runtime.member("m_pa_ddr"))) ^ (255))))) & 0xff);
    if ((typeof (runtime.dereference(members.m_out8_pa_cb)).isunset === 'function' ? (runtime.dereference(members.m_out8_pa_cb)).isunset() : typeof (runtime.dereference(members.m_out8_pa_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out8_pa_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out8_pa_cb)).isunset : runtime.container(members.m_out8_pa_cb, "isunset"))) {
      for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
        runtime.readIndex((members.m_out_pa_cb ?? runtime.member("m_out_pa_cb")), i)((((data) >>> (i)) & 1));
      }
    } else {
      runtime.invoke("m_out8_pa_cb", data);
    }
  }

  function method_pa_ddr_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_pa_ddr = ((data) & 0xff);
    0;
    method_update_pa(runtime);
    method_edge_detect(runtime);
  }

  function method_pb_data_r(runtime: any) {
    const members = runtime.members;
    let $in: any = ((0) & 0xff);
    if ((typeof (runtime.dereference(members.m_in8_pb_cb)).isunset === 'function' ? (runtime.dereference(members.m_in8_pb_cb)).isunset() : typeof (runtime.dereference(members.m_in8_pb_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_in8_pb_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_in8_pb_cb)).isunset : runtime.container(members.m_in8_pb_cb, "isunset"))) {
      for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
        $in = (((($in) | (((((((runtime.dereference(runtime.readIndex((members.m_in_pb_cb ?? runtime.member("m_in_pb_cb")), i))).isunset?.() ?? runtime.container(runtime.readIndex((members.m_in_pb_cb ?? runtime.member("m_in_pb_cb")), i), "isunset"))) ? (((((members.m_pb_in ?? runtime.member("m_pb_in"))) >>> (i)) & 1)) : (runtime.readIndex((members.m_in_pb_cb ?? runtime.member("m_in_pb_cb")), i)()))) << (i))))) & 0xff);
      }
    } else {
      $in = ((runtime.invoke("m_in8_pb_cb")) & 0xff);
    }
    let data: any = (((((((members.m_pb_out ?? runtime.member("m_pb_out"))) & ((members.m_pb_ddr ?? runtime.member("m_pb_ddr"))))) | ((($in) & ((~(members.m_pb_ddr ?? runtime.member("m_pb_ddr")))))))) & 0xff);
    0;
    return data;
  }

  function method_pb_data_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_pb_out = ((data) & 0xff);
    0;
    method_update_pb(runtime);
  }

  function method_update_pb(runtime: any) {
    const members = runtime.members;
    let data: any = (((((((members.m_pb_out ?? runtime.member("m_pb_out"))) & ((members.m_pb_ddr ?? runtime.member("m_pb_ddr"))))) | ((((members.m_pb_ddr ?? runtime.member("m_pb_ddr"))) ^ (255))))) & 0xff);
    if ((typeof (runtime.dereference(members.m_out8_pb_cb)).isunset === 'function' ? (runtime.dereference(members.m_out8_pb_cb)).isunset() : typeof (runtime.dereference(members.m_out8_pb_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out8_pb_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out8_pb_cb)).isunset : runtime.container(members.m_out8_pb_cb, "isunset"))) {
      for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
        runtime.readIndex((members.m_out_pb_cb ?? runtime.member("m_out_pb_cb")), i)((((data) >>> (i)) & 1));
      }
    } else {
      runtime.invoke("m_out8_pb_cb", data);
    }
  }

  function method_pb_ddr_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_pb_ddr = ((data) & 0xff);
    0;
    method_update_pb(runtime);
  }

  function method_timer_off_r(runtime: any) {
    const members = runtime.members;
    return method_timer_r(runtime, 0);
  }

  function method_timer_r(runtime: any, ie: any) {
    const members = runtime.members;
    let data: any = ((method_get_timer(runtime)) & 0xff);
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      if (((Number((members.m_timeout ?? runtime.member("m_timeout"))) < Number((((runtime.calls["machine().time"]?.() ?? 0)) - ((runtime.calls["attotime::from_hz"] ? runtime.calls["attotime::from_hz"](((2) * ((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))))) : runtime.macro("attotime::from_hz", ((2) * ((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock")))))))))) ? 1 : 0)) {
        members.m_irq_timer = ((0) ? 1 : 0);
        if (((Number((members.m_timerstate ?? runtime.member("m_timerstate"))) === Number(1)) ? 1 : 0)) {
          method_timer_start(runtime, data);
        }
      }
      members.m_ie_timer = ((ie) ? 1 : 0);
      method_update_irq(runtime);
      0;
    }
    return data;
  }

  function method_get_timer(runtime: any) {
    const members = runtime.members;
    let shift: any = ((((((Number((members.m_timerstate ?? runtime.member("m_timerstate"))) === Number(0)) ? 1 : 0)) ? ((members.m_timershift ?? runtime.member("m_timershift"))) : (0))) & 0xff);
    let remain: any = ((runtime.dereference((typeof (runtime.dereference(members.m_timer)).remaining === 'function' ? (runtime.dereference(members.m_timer)).remaining() : typeof (runtime.dereference(members.m_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_timer)).remaining : runtime.container(members.m_timer, "remaining")))).as_ticks?.((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))) ?? 0);
    let val: any = ((((remain) >>> (shift))) & 0xff);
    return ((((remain) & (((((1) << (shift))) - (1))))) ? (val) : (((val) - (1))));
  }

  function method_timer_start(runtime: any, data: any) {
    const members = runtime.members;
    members.m_timerstate = ((0) & 0xff);
    let curtime: any = (runtime.calls["machine().time"]?.() ?? 0);
    let target: any = runtime.add(runtime.add(((runtime.dereference(curtime)).as_ticks?.((runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))) ?? 0), 1), ((data) << ((members.m_timershift ?? runtime.member("m_timershift")))));
    ((runtime.dereference(members.m_timer)).adjust?.((((runtime.calls["attotime::from_ticks"] ? runtime.calls["attotime::from_ticks"](target, (runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", target, (runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))))) - (curtime))) ?? 0);
  }

  function method_timer_on_r(runtime: any) {
    const members = runtime.members;
    return method_timer_r(runtime, 1);
  }

  function method_irq_r(runtime: any) {
    const members = runtime.members;
    let data: any = ((method_get_irq_flags(runtime)) & 0xff);
    if (((((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) && ((members.m_irq_edge ?? runtime.member("m_irq_edge")))) ? 1 : 0)) {
      members.m_irq_edge = ((0) ? 1 : 0);
      method_update_irq(runtime);
    }
    return data;
  }

  function method_get_irq_flags(runtime: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    if ((members.m_irq_timer ?? runtime.member("m_irq_timer"))) {
      data = ((((data) | (128))) & 0xff);
    }
    if ((members.m_irq_edge ?? runtime.member("m_irq_edge"))) {
      data = ((((data) | (64))) & 0xff);
    }
    return data;
  }

  function method_timer_off_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_timer_w(runtime, offset, data, 0);
  }

  function method_timer_w(runtime: any, offset: any, data: any, ie: any) {
    const members = runtime.members;
    let select: any = ((offset) & (3));
    members.m_timershift = ((((((Number(select) === Number(0)) ? 1 : 0)) ? (0) : (((((Number(select) === Number(1)) ? 1 : 0)) ? (3) : (((((Number(select) === Number(2)) ? 1 : 0)) ? (6) : (10))))))) & 0xff);
    method_timer_start(runtime, data);
    members.m_irq_timer = ((0) ? 1 : 0);
    members.m_ie_timer = ((ie) ? 1 : 0);
    method_update_irq(runtime);
  }

  function method_timer_on_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_timer_w(runtime, offset, data, 1);
  }

  function method_edge_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    members.m_pa7_dir = (((((offset) >>> (0)) & 1)) | 0);
    members.m_ie_edge = (((((((offset) >>> (1)) & 1)) ? 1 : 0)) ? 1 : 0);
    method_update_irq(runtime);
    0;
  }

  function method_timer_end(runtime: any, param: any) {
    const members = runtime.members;
    if (((Number((members.m_timerstate ?? runtime.member("m_timerstate"))) === Number(0)) ? 1 : 0)) {
      members.m_timeout = (runtime.calls["machine().time"]?.() ?? 0);
      members.m_irq_timer = ((1) ? 1 : 0);
      method_update_irq(runtime);
    }
    members.m_timerstate = ((1) & 0xff);
    ((runtime.dereference(members.m_timer)).adjust?.((runtime.calls["attotime::from_ticks"] ? runtime.calls["attotime::from_ticks"](256, (runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", 256, (runtime.calls["clock"] ? runtime.calls["clock"]() : runtime.macro("clock"))))) ?? 0);
  }

  function method_rom_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return runtime.readIndex(h_m_rom, offset);
  }

  function method_ram_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
  }

  function method_ram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
  }

  function method_pa_ddr_r(runtime: any) {
    const members = runtime.members;
    return (members.m_pa_ddr ?? runtime.member("m_pa_ddr"));
  }

  function method_pb_ddr_r(runtime: any) {
    const members = runtime.members;
    return (members.m_pb_ddr ?? runtime.member("m_pb_ddr"));
  }

  function method_mos6530_device_base__rom_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return runtime.readIndex(h_m_rom, offset);
  }

  function method_mos6530_device_base__ram_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
  }

  function method_mos6530_device_base__ram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
  }
  return {
    "pa_w": method_pa_w,
    "edge_detect": method_edge_detect,
    "update_irq": method_update_irq,
    "pb_w": method_pb_w,
    "pa_data_r": method_pa_data_r,
    "pa_data_w": method_pa_data_w,
    "update_pa": method_update_pa,
    "pa_ddr_w": method_pa_ddr_w,
    "pb_data_r": method_pb_data_r,
    "pb_data_w": method_pb_data_w,
    "update_pb": method_update_pb,
    "pb_ddr_w": method_pb_ddr_w,
    "timer_off_r": method_timer_off_r,
    "timer_r": method_timer_r,
    "get_timer": method_get_timer,
    "timer_start": method_timer_start,
    "timer_on_r": method_timer_on_r,
    "irq_r": method_irq_r,
    "get_irq_flags": method_get_irq_flags,
    "timer_off_w": method_timer_off_w,
    "timer_w": method_timer_w,
    "timer_on_w": method_timer_on_w,
    "edge_w": method_edge_w,
    "timer_end": method_timer_end,
    "rom_r": method_rom_r,
    "ram_r": method_ram_r,
    "ram_w": method_ram_w,
    "pa_ddr_r": method_pa_ddr_r,
    "pb_ddr_r": method_pb_ddr_r,
    "mos6530_device_base::rom_r": method_mos6530_device_base__rom_r,
    "mos6530_device_base::ram_r": method_mos6530_device_base__ram_r,
    "mos6530_device_base::ram_w": method_mos6530_device_base__ram_w
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
