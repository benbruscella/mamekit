// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './spectrum_ula_128k.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    method_spectrum_ula_device__device_start(runtime);
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_is_timings_late ?? 0)) : runtime.macro("NAME", (members.m_is_timings_late ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_is_timings_late ?? 0)) : runtime.macro("NAME", (members.m_is_timings_late ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_int_at ?? 0)) : runtime.macro("NAME", (members.m_int_at ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_int_at ?? 0)) : runtime.macro("NAME", (members.m_int_at ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_is_m1_rd_contended ?? 0)) : runtime.macro("NAME", (members.m_is_m1_rd_contended ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_is_m1_rd_contended ?? 0)) : runtime.macro("NAME", (members.m_is_m1_rd_contended ?? 0)))));
    members.m_video_line_clocks = runtime.divide((((__l["m_screen.width"] ? __l["m_screen.width"]() : ((members.m_screen)?.width?.() ?? 0))) * ((__l["m_maincpu.clock"] ? __l["m_maincpu.clock"]() : ((members.m_maincpu)?.clock?.() ?? 0)))), (__l["m_screen.clock"] ? __l["m_screen.clock"]() : ((members.m_screen)?.clock?.() ?? 0)));
    members.m_raster_line_clocks = runtime.divide((((typeof (runtime.dereference(members.m_screen_area)).width === 'function' ? (runtime.dereference(members.m_screen_area)).width() : typeof (runtime.dereference(members.m_screen_area)).width === 'number' || typeof (runtime.dereference(members.m_screen_area)).width === 'boolean' ? (runtime.dereference(members.m_screen_area)).width : runtime.container(members.m_screen_area, "width"))) * ((__l["m_maincpu.clock"] ? __l["m_maincpu.clock"]() : ((members.m_maincpu)?.clock?.() ?? 0)))), (__l["m_screen.clock"] ? __l["m_screen.clock"]() : ((members.m_screen)?.clock?.() ?? 0)));
  }

  function method_spectrum_ula_device__device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_bank3_page ?? 0)) : runtime.macro("NAME", (members.m_bank3_page ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_bank3_page ?? 0)) : runtime.macro("NAME", (members.m_bank3_page ?? 0)))));
  }

  function method_set_z80(runtime: any, cpu_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_tag"] ? __l["m_maincpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_maincpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
  }

  function method_set_screen(runtime: any, screen_tag: any, screen_area: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.set_tag"] ? __l["m_screen.set_tag"]((__l["std::forward"] ? __l["std::forward"](screen_tag) : runtime.macro("std::forward", screen_tag))) : ((members.m_screen)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](screen_tag) : runtime.macro("std::forward", screen_tag))) ?? 0));
    members.m_screen_area = screen_area;
  }

  function method_INPUT_CHANGED_MEMBER(runtime: any, on_contention_changed: any): any {
    const members = runtime.members;


  }

  function method_nomem_rq(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (method_is_contended(runtime, offset)) {
      method_content_early(runtime);
    }
  }

  function method_is_contended(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((((((((Number(offset) >= Number(16384)) ? 1 : 0)) && (((Number(offset) < Number(32768)) ? 1 : 0))) ? 1 : 0)) || (((((((((Number(offset) >= Number(49152)) ? 1 : 0)) && (((Number(offset) <= Number(65535)) ? 1 : 0))) ? 1 : 0)) && ((((members.m_bank3_page ?? 0)) & (1)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_content_early(runtime: any, shift: any = 0): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_pattern = members.m_pattern ?? 0;
    let vpos: any = (__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : ((members.m_screen)?.vpos?.() ?? 0));
    if ((((((Number(vpos) < Number((typeof (runtime.dereference(members.m_screen_area)).top === 'function' ? (runtime.dereference(members.m_screen_area)).top() : typeof (runtime.dereference(members.m_screen_area)).top === 'number' || typeof (runtime.dereference(members.m_screen_area)).top === 'boolean' ? (runtime.dereference(members.m_screen_area)).top : runtime.container(members.m_screen_area, "top")))) ? 1 : 0)) || (((Number(vpos) > Number((typeof (runtime.dereference(members.m_screen_area)).bottom === 'function' ? (runtime.dereference(members.m_screen_area)).bottom() : typeof (runtime.dereference(members.m_screen_area)).bottom === 'number' || typeof (runtime.dereference(members.m_screen_area)).bottom === 'boolean' ? (runtime.dereference(members.m_screen_area)).bottom : runtime.container(members.m_screen_area, "bottom")))) ? 1 : 0))) ? 1 : 0)) {
      return;
    }
    let now: any = (((((__l["m_maincpu.total_cycles"] ? __l["m_maincpu.total_cycles"]() : ((members.m_maincpu)?.total_cycles?.() ?? 0))) - ((members.m_int_at ?? 0)))) + (shift));
    let cf: any = runtime.add(((vpos) * ((members.m_video_line_clocks ?? 0))), method_get_raster_contention_offset(runtime));
    let ct: any = ((cf) + ((members.m_raster_line_clocks ?? 0)));
    if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
      members.m_is_m1_rd_contended = ((1) ? 1 : 0);
      let clocks: any = ((now) - (cf));
      let c: any = ((h_m_pattern[((clocks) % (8))]) & 0xff);
      (__l["m_maincpu.adjust_icount"] ? __l["m_maincpu.adjust_icount"]((-c)) : ((members.m_maincpu)?.adjust_icount?.((-c)) ?? 0));
    }
  }

  function method_get_raster_contention_offset(runtime: any): any {
    const members = runtime.members;

    const h_m_base_offset = members.m_base_offset ?? 0;
    return ((((h_m_base_offset) + ((members.m_is_timings_late ?? 0)))) << 24 >> 24);
  }

  function method_m1(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_is_m1_rd_contended = ((0) ? 1 : 0);
    if (((((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
      method_content_early(runtime);
    }
  }

  function method_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
      method_content_early(runtime);
      method_content_late(runtime);
    }
  }

  function method_content_late(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_pattern = members.m_pattern ?? 0;
    let vpos: any = (__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : ((members.m_screen)?.vpos?.() ?? 0));
    if ((((((Number(vpos) < Number((typeof (runtime.dereference(members.m_screen_area)).top === 'function' ? (runtime.dereference(members.m_screen_area)).top() : typeof (runtime.dereference(members.m_screen_area)).top === 'number' || typeof (runtime.dereference(members.m_screen_area)).top === 'boolean' ? (runtime.dereference(members.m_screen_area)).top : runtime.container(members.m_screen_area, "top")))) ? 1 : 0)) || (((Number(vpos) > Number((typeof (runtime.dereference(members.m_screen_area)).bottom === 'function' ? (runtime.dereference(members.m_screen_area)).bottom() : typeof (runtime.dereference(members.m_screen_area)).bottom === 'number' || typeof (runtime.dereference(members.m_screen_area)).bottom === 'boolean' ? (runtime.dereference(members.m_screen_area)).bottom : runtime.container(members.m_screen_area, "bottom")))) ? 1 : 0))) ? 1 : 0)) {
      return;
    }
    let now: any = runtime.add((((__l["m_maincpu.total_cycles"] ? __l["m_maincpu.total_cycles"]() : ((members.m_maincpu)?.total_cycles?.() ?? 0))) - ((members.m_int_at ?? 0))), 1);
    let cf: any = runtime.add(((vpos) * ((members.m_video_line_clocks ?? 0))), method_get_raster_contention_offset(runtime));
    let ct: any = ((cf) + ((members.m_raster_line_clocks ?? 0)));
    for (let i: any = 4; i; i = runtime.shiftRight(i, 1)) {
      if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
        let clocks: any = ((now) - (cf));
        let c: any = ((h_m_pattern[((clocks) % (8))]) & 0xff);
        (__l["m_maincpu.adjust_icount"] ? __l["m_maincpu.adjust_icount"]((-c)) : ((members.m_maincpu)?.adjust_icount?.((-c)) ?? 0));
        now = ((now) + (c));
      }
      now = ((now) + (1));
    }
  }

  function method_io_w(runtime: any, offset: any): any {
    const members = runtime.members;

    if (method_is_contended(runtime, offset)) {
      method_content_early(runtime);
      method_content_late(runtime);
    }
  }

  function method_data_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) && (method_is_contended(runtime, offset))) ? 1 : 0)) {
      method_content_early(runtime);
    }
  }

  function method_data_w(runtime: any, offset: any): any {
    const members = runtime.members;

    if (method_is_contended(runtime, offset)) {
      method_content_early(runtime);
    }
  }

  function method_ula_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      if (method_is_contended(runtime, offset)) {
        method_content_early(runtime);
      }
      method_content_early(runtime, 1);
    }
  }

  function method_ula_w(runtime: any, offset: any): any {
    const members = runtime.members;

    if (method_is_contended(runtime, offset)) {
      method_content_early(runtime);
    }
    method_content_early(runtime, 1);
  }

  function method_on_irq(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_int_at = runtime.subtract((__l["m_maincpu.total_cycles"] ? __l["m_maincpu.total_cycles"]() : ((members.m_maincpu)?.total_cycles?.() ?? 0)), (__l["m_maincpu.attotime_to_cycles"] ? __l["m_maincpu.attotime_to_cycles"](runtime.subtract((__l["m_maincpu.local_time"] ? __l["m_maincpu.local_time"]() : ((members.m_maincpu)?.local_time?.() ?? 0)), (__l["machine().time"]?.() ?? 0))) : ((members.m_maincpu)?.attotime_to_cycles?.(runtime.subtract((__l["m_maincpu.local_time"] ? __l["m_maincpu.local_time"]() : ((members.m_maincpu)?.local_time?.() ?? 0)), (__l["machine().time"]?.() ?? 0))) ?? 0)));
  }

  function method_bank3_pg_w(runtime: any, bank3_page: any): any {
    const members = runtime.members;

    members.m_bank3_page = ((bank3_page) & 0xff);
  }

  function method_is_snow_possible(runtime: any, addr: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((((method_is_contended(runtime, addr)) && ((((members.m_is_m1_rd_contended ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((runtime.dereference(members.m_screen_area)).contains?.((__l["m_screen.hpos"] ? __l["m_screen.hpos"]() : ((members.m_screen)?.hpos?.() ?? 0)), (__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : ((members.m_screen)?.vpos?.() ?? 0))) ?? 0))) ? 1 : 0);
  }

  function method_is_in_contended_area(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let vpos: any = (__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : ((members.m_screen)?.vpos?.() ?? 0));
    return (((((Number(vpos) >= Number((typeof (runtime.dereference(members.m_screen_area)).top === 'function' ? (runtime.dereference(members.m_screen_area)).top() : typeof (runtime.dereference(members.m_screen_area)).top === 'number' || typeof (runtime.dereference(members.m_screen_area)).top === 'boolean' ? (runtime.dereference(members.m_screen_area)).top : runtime.container(members.m_screen_area, "top")))) ? 1 : 0)) && (((Number(vpos) <= Number((typeof (runtime.dereference(members.m_screen_area)).bottom === 'function' ? (runtime.dereference(members.m_screen_area)).bottom() : typeof (runtime.dereference(members.m_screen_area)).bottom === 'number' || typeof (runtime.dereference(members.m_screen_area)).bottom === 'boolean' ? (runtime.dereference(members.m_screen_area)).bottom : runtime.container(members.m_screen_area, "bottom")))) ? 1 : 0))) ? 1 : 0);
  }

  function method_get_video_line_clocks(runtime: any): any {
    const members = runtime.members;

    return (members.m_video_line_clocks ?? 0);
  }

  function method_get_raster_line_clocks(runtime: any): any {
    const members = runtime.members;

    return (members.m_raster_line_clocks ?? 0);
  }

  function method_get_irq_at(runtime: any): any {
    const members = runtime.members;

    return (members.m_int_at ?? 0);
  }

  function method_get_irq_ext_length(runtime: any): any {
    const members = runtime.members;

    return (((members.m_is_timings_late ?? 0)) & 0xff);
  }

  function method_get_border_chunk_size(runtime: any): any {
    const members = runtime.members;

    return ((8) & 0xff);
  }

  function method_get_btime(runtime: any): any {
    const members = runtime.members;

    const h_m_btime = members.m_btime ?? 0;
    return ((h_m_btime) & 0xff);
  }

  function method_get_atime_left(runtime: any): any {
    const members = runtime.members;

    const h_m_atime_left = members.m_atime_left ?? 0;
    return ((h_m_atime_left) & 0xff);
  }

  function method_get_atime_right(runtime: any): any {
    const members = runtime.members;

    const h_m_atime_right = members.m_atime_right ?? 0;
    return ((h_m_atime_right) & 0xff);
  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;

    members.m_is_m1_rd_contended = ((0) ? 1 : 0);
  }

  function method_spectrum_ula_device__set_z80(runtime: any, cpu_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_tag"] ? __l["m_maincpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_maincpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
  }

  function method_spectrum_ula_device__set_screen(runtime: any, screen_tag: any, screen_area: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.set_tag"] ? __l["m_screen.set_tag"]((__l["std::forward"] ? __l["std::forward"](screen_tag) : runtime.macro("std::forward", screen_tag))) : ((members.m_screen)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](screen_tag) : runtime.macro("std::forward", screen_tag))) ?? 0));
    members.m_screen_area = screen_area;
  }

  function method_spectrum_ula_device__INPUT_CHANGED_MEMBER(runtime: any, on_contention_changed: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__nomem_rq(runtime: any, offset: any, data: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__m1(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__io_r(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__io_w(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__data_r(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__data_w(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__ula_r(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__ula_w(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__on_irq(runtime: any): any {
    const members = runtime.members;


  }

  function method_spectrum_ula_device__bank3_pg_w(runtime: any, bank3_page: any): any {
    const members = runtime.members;

    members.m_bank3_page = ((bank3_page) & 0xff);
  }

  function method_spectrum_ula_device__is_snow_possible(runtime: any, addr: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_spectrum_ula_device__is_in_contended_area(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_spectrum_ula_device__get_video_line_clocks(runtime: any): any {
    const members = runtime.members;

    0;
    return -1;
  }

  function method_spectrum_ula_device__get_raster_line_clocks(runtime: any): any {
    const members = runtime.members;

    0;
    return -1;
  }

  function method_spectrum_ula_device__get_irq_at(runtime: any): any {
    const members = runtime.members;

    0;
    return -1;
  }

  function method_spectrum_ula_device__get_irq_ext_length(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_spectrum_ula_device__get_border_chunk_size(runtime: any): any {
    const members = runtime.members;

    return ((1) & 0xff);
  }

  function method_spectrum_ula_device__get_btime(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_spectrum_ula_device__get_atime_left(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_spectrum_ula_device__get_atime_right(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_spectrum_ula_device__get_raster_contention_offset(runtime: any): any {
    const members = runtime.members;

    return ((0) << 24 >> 24);
  }

  function method_spectrum_ula_device__device_reset(runtime: any): any {
    const members = runtime.members;


  }

  function method_on_contention_changed(runtime: any, field: any, param: any, oldval: any, newval: any): any {
    const members = runtime.members;

    members.m_is_timings_late = ((((newval) & (1))) ? 1 : 0);
  }

  function method_spectrum_ula_contended_device__get_video_line_clocks(runtime: any): any {
    const members = runtime.members;

    return (members.m_video_line_clocks ?? 0);
  }

  function method_spectrum_ula_contended_device__get_raster_line_clocks(runtime: any): any {
    const members = runtime.members;

    return (members.m_raster_line_clocks ?? 0);
  }

  function method_spectrum_ula_contended_device__get_irq_at(runtime: any): any {
    const members = runtime.members;

    return (members.m_int_at ?? 0);
  }

  function method_spectrum_ula_contended_device__get_irq_ext_length(runtime: any): any {
    const members = runtime.members;

    return (((members.m_is_timings_late ?? 0)) & 0xff);
  }

  function method_spectrum_ula_contended_device__get_border_chunk_size(runtime: any): any {
    const members = runtime.members;

    return ((8) & 0xff);
  }

  function method_spectrum_ula_contended_device__get_btime(runtime: any): any {
    const members = runtime.members;

    const h_m_btime = members.m_btime ?? 0;
    return ((h_m_btime) & 0xff);
  }

  function method_spectrum_ula_contended_device__get_atime_left(runtime: any): any {
    const members = runtime.members;

    const h_m_atime_left = members.m_atime_left ?? 0;
    return ((h_m_atime_left) & 0xff);
  }

  function method_spectrum_ula_contended_device__get_atime_right(runtime: any): any {
    const members = runtime.members;

    const h_m_atime_right = members.m_atime_right ?? 0;
    return ((h_m_atime_right) & 0xff);
  }

  function method_spectrum_ula_contended_device__get_raster_contention_offset(runtime: any): any {
    const members = runtime.members;

    const h_m_base_offset = members.m_base_offset ?? 0;
    return ((((h_m_base_offset) + ((members.m_is_timings_late ?? 0)))) << 24 >> 24);
  }
  return {
    "device_start": method_device_start,
    "spectrum_ula_device::device_start": method_spectrum_ula_device__device_start,
    "set_z80": method_set_z80,
    "set_screen": method_set_screen,
    "INPUT_CHANGED_MEMBER": method_INPUT_CHANGED_MEMBER,
    "nomem_rq": method_nomem_rq,
    "is_contended": method_is_contended,
    "content_early": method_content_early,
    "get_raster_contention_offset": method_get_raster_contention_offset,
    "m1": method_m1,
    "io_r": method_io_r,
    "content_late": method_content_late,
    "io_w": method_io_w,
    "data_r": method_data_r,
    "data_w": method_data_w,
    "ula_r": method_ula_r,
    "ula_w": method_ula_w,
    "on_irq": method_on_irq,
    "bank3_pg_w": method_bank3_pg_w,
    "is_snow_possible": method_is_snow_possible,
    "is_in_contended_area": method_is_in_contended_area,
    "get_video_line_clocks": method_get_video_line_clocks,
    "get_raster_line_clocks": method_get_raster_line_clocks,
    "get_irq_at": method_get_irq_at,
    "get_irq_ext_length": method_get_irq_ext_length,
    "get_border_chunk_size": method_get_border_chunk_size,
    "get_btime": method_get_btime,
    "get_atime_left": method_get_atime_left,
    "get_atime_right": method_get_atime_right,
    "device_reset": method_device_reset,
    "spectrum_ula_device::set_z80": method_spectrum_ula_device__set_z80,
    "spectrum_ula_device::set_screen": method_spectrum_ula_device__set_screen,
    "spectrum_ula_device::INPUT_CHANGED_MEMBER": method_spectrum_ula_device__INPUT_CHANGED_MEMBER,
    "spectrum_ula_device::nomem_rq": method_spectrum_ula_device__nomem_rq,
    "spectrum_ula_device::m1": method_spectrum_ula_device__m1,
    "spectrum_ula_device::io_r": method_spectrum_ula_device__io_r,
    "spectrum_ula_device::io_w": method_spectrum_ula_device__io_w,
    "spectrum_ula_device::data_r": method_spectrum_ula_device__data_r,
    "spectrum_ula_device::data_w": method_spectrum_ula_device__data_w,
    "spectrum_ula_device::ula_r": method_spectrum_ula_device__ula_r,
    "spectrum_ula_device::ula_w": method_spectrum_ula_device__ula_w,
    "spectrum_ula_device::on_irq": method_spectrum_ula_device__on_irq,
    "spectrum_ula_device::bank3_pg_w": method_spectrum_ula_device__bank3_pg_w,
    "spectrum_ula_device::is_snow_possible": method_spectrum_ula_device__is_snow_possible,
    "spectrum_ula_device::is_in_contended_area": method_spectrum_ula_device__is_in_contended_area,
    "spectrum_ula_device::get_video_line_clocks": method_spectrum_ula_device__get_video_line_clocks,
    "spectrum_ula_device::get_raster_line_clocks": method_spectrum_ula_device__get_raster_line_clocks,
    "spectrum_ula_device::get_irq_at": method_spectrum_ula_device__get_irq_at,
    "spectrum_ula_device::get_irq_ext_length": method_spectrum_ula_device__get_irq_ext_length,
    "spectrum_ula_device::get_border_chunk_size": method_spectrum_ula_device__get_border_chunk_size,
    "spectrum_ula_device::get_btime": method_spectrum_ula_device__get_btime,
    "spectrum_ula_device::get_atime_left": method_spectrum_ula_device__get_atime_left,
    "spectrum_ula_device::get_atime_right": method_spectrum_ula_device__get_atime_right,
    "spectrum_ula_device::get_raster_contention_offset": method_spectrum_ula_device__get_raster_contention_offset,
    "spectrum_ula_device::device_reset": method_spectrum_ula_device__device_reset,
    "on_contention_changed": method_on_contention_changed,
    "spectrum_ula_contended_device::get_video_line_clocks": method_spectrum_ula_contended_device__get_video_line_clocks,
    "spectrum_ula_contended_device::get_raster_line_clocks": method_spectrum_ula_contended_device__get_raster_line_clocks,
    "spectrum_ula_contended_device::get_irq_at": method_spectrum_ula_contended_device__get_irq_at,
    "spectrum_ula_contended_device::get_irq_ext_length": method_spectrum_ula_contended_device__get_irq_ext_length,
    "spectrum_ula_contended_device::get_border_chunk_size": method_spectrum_ula_contended_device__get_border_chunk_size,
    "spectrum_ula_contended_device::get_btime": method_spectrum_ula_contended_device__get_btime,
    "spectrum_ula_contended_device::get_atime_left": method_spectrum_ula_contended_device__get_atime_left,
    "spectrum_ula_contended_device::get_atime_right": method_spectrum_ula_contended_device__get_atime_right,
    "spectrum_ula_contended_device::get_raster_contention_offset": method_spectrum_ula_contended_device__get_raster_contention_offset
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["NAME","m_maincpu.adjust_icount","m_maincpu.attotime_to_cycles","m_maincpu.clock","m_maincpu.local_time","m_maincpu.set_tag","m_maincpu.total_cycles","m_screen.clock","m_screen.hpos","m_screen.set_tag","m_screen.vpos","m_screen.width","machine","machine().side_effects_disabled","machine().time","save_item","std::forward"];

export const device = definition;
export default device;
