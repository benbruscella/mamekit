// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './williams_blitter_sc1.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((members.__static_device_start_dummy_table__initialised ?? 0)) ? 0 : 1)) {
      members.__static_device_start_dummy_table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      members.__static_device_start_dummy_table__initialised = 1;
    }
    let dummy_table: any = (members.__static_device_start_dummy_table ?? 0);
    members.m_window_enable = ((0) & 0xff);
    members.m_remap = (members.m_remap_lookup ?? 0);
    for (let i: any = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let table: any = (((typeof (runtime.dereference(members.m_proms)).found === 'function' ? (runtime.dereference(members.m_proms)).found() : typeof (runtime.dereference(members.m_proms)).found === 'number' || typeof (runtime.dereference(members.m_proms)).found === 'boolean' ? (runtime.dereference(members.m_proms)).found : runtime.container(members.m_proms, "found"))) ? (runtime.addressOf((members.m_proms ?? 0), ((((i) & (127))) * (16)))) : (dummy_table));
      for (let j: any = ((0) | 0); ((Number(j) < Number(256)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(runtime.writableMember("m_remap_lookup"), ((((i) * (256))) + (j)), ((((runtime.readIndex(table, runtime.shiftRight(j, 4))) << (4))) | (runtime.readIndex(table, ((j) & (15))))));
      }
    }
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_window_enable ?? 0)) : runtime.macro("NAME", (members.m_window_enable ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_window_enable ?? 0)) : runtime.macro("NAME", (members.m_window_enable ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_control ?? 0)) : runtime.macro("NAME", (members.m_control ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_control ?? 0)) : runtime.macro("NAME", (members.m_control ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_no_even ?? 0)) : runtime.macro("NAME", (members.m_no_even ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_no_even ?? 0)) : runtime.macro("NAME", (members.m_no_even ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_no_odd ?? 0)) : runtime.macro("NAME", (members.m_no_odd ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_no_odd ?? 0)) : runtime.macro("NAME", (members.m_no_odd ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_solid ?? 0)) : runtime.macro("NAME", (members.m_solid ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_solid ?? 0)) : runtime.macro("NAME", (members.m_solid ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_fg_only ?? 0)) : runtime.macro("NAME", (members.m_fg_only ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_fg_only ?? 0)) : runtime.macro("NAME", (members.m_fg_only ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_solid_color ?? 0)) : runtime.macro("NAME", (members.m_solid_color ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_solid_color ?? 0)) : runtime.macro("NAME", (members.m_solid_color ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_sstart ?? 0)) : runtime.macro("NAME", (members.m_sstart ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_sstart ?? 0)) : runtime.macro("NAME", (members.m_sstart ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_dstart ?? 0)) : runtime.macro("NAME", (members.m_dstart ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_dstart ?? 0)) : runtime.macro("NAME", (members.m_dstart ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_width ?? 0)) : runtime.macro("NAME", (members.m_width ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_width ?? 0)) : runtime.macro("NAME", (members.m_width ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_height ?? 0)) : runtime.macro("NAME", (members.m_height ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_height ?? 0)) : runtime.macro("NAME", (members.m_height ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_remap_index ?? 0)) : runtime.macro("NAME", (members.m_remap_index ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_remap_index ?? 0)) : runtime.macro("NAME", (members.m_remap_index ?? 0)))));
  }

  function method_control_w(runtime: any, space: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_control = ((data) & 0xff);
    members.m_no_even = (((((data) >>> (7)) & 1)) ? 1 : 0);
    members.m_no_odd = (((((data) >>> (6)) & 1)) ? 1 : 0);
    members.m_solid = (((((data) >>> (4)) & 1)) ? 1 : 0);
    members.m_fg_only = (((((data) >>> (3)) & 1)) ? 1 : 0);
    let w: any = (((((members.m_width ?? 0)) ^ ((members.m_size_xor ?? 0)))) | 0);
    let h: any = (((((members.m_height ?? 0)) ^ ((members.m_size_xor ?? 0)))) | 0);
    if (((Number(w) === Number(0)) ? 1 : 0)) {
      w = ((1) | 0);
    }
    if (((Number(h) === Number(0)) ? 1 : 0)) {
      h = ((1) | 0);
    }
    let accesses: any = ((method_blit_core(runtime, space, w, h)) | 0);
    let estimated_clocks_at_4MHz: any = ((4) | 0);
    if (((((members.m_control ?? 0)) >>> (2)) & 1)) {
      estimated_clocks_at_4MHz = ((((estimated_clocks_at_4MHz) + (((4) * (((accesses) + (2))))))) | 0);
    } else {
      estimated_clocks_at_4MHz = ((((estimated_clocks_at_4MHz) + (((2) * (((accesses) + (3))))))) | 0);
    }
    (__l["m_cpu.adjust_icount"] ? __l["m_cpu.adjust_icount"]((-runtime.divide(((estimated_clocks_at_4MHz) + (3)), 4))) : ((members.m_cpu)?.adjust_icount?.((-runtime.divide(((estimated_clocks_at_4MHz) + (3)), 4))) ?? 0));
    0;
  }

  function method_blit_core(runtime: any, space: any, w: any, h: any): any {
    const members = runtime.members;

    let dst_stride_256: any = ((((((members.m_control ?? 0)) >>> (1)) & 1)) ? 1 : 0);
    let src_stride_256: any = ((((((members.m_control ?? 0)) >>> (0)) & 1)) ? 1 : 0);
    let sxadv: any = ((((src_stride_256) ? (256) : (1))) | 0);
    let syadv: any = ((((src_stride_256) ? (1) : (w))) | 0);
    let dxadv: any = ((((dst_stride_256) ? (256) : (1))) | 0);
    let dyadv: any = ((((dst_stride_256) ? (1) : (w))) | 0);
    let accesses: any = ((0) | 0);
    let pixdata: any = ((0) | 0);
    let shift: any = ((((((members.m_control ?? 0)) >>> (5)) & 1)) ? 1 : 0);
    let sstart: any = (((members.m_sstart ?? 0)) & 0xffff);
    let dstart: any = (((members.m_dstart ?? 0)) & 0xffff);
    for (let y: any = ((0) | 0); ((Number(y) < Number(h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let source: any = ((sstart) & 0xffff);
      let dest: any = ((dstart) & 0xffff);
      for (let x: any = ((0) | 0); ((Number(x) < Number(w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let rawval: any = ((runtime.readIndex((members.m_remap ?? 0), ((runtime.dereference(space)).read_byte?.(source) ?? 0))) & 0xff);
        if (shift) {
          pixdata = ((((((pixdata) << (8))) | (rawval))) | 0);
          method_blit_pixel(runtime, space, dest, ((runtime.shiftRight(pixdata, 4)) & (255)));
        } else {
          method_blit_pixel(runtime, space, dest, rawval);
        }
        accesses = ((((accesses) + (2))) | 0);
        source = ((((source) + (sxadv))) & 0xffff);
        dest = ((((dest) + (dxadv))) & 0xffff);
      }
      if (dst_stride_256) {
        dstart = ((((((dstart) & (65280))) | (((((dstart) + (dyadv))) & (255))))) & 0xffff);
      } else {
        dstart = ((((dstart) + (dyadv))) & 0xffff);
      }
      if (src_stride_256) {
        sstart = ((((((sstart) & (65280))) | (((((sstart) + (syadv))) & (255))))) & 0xffff);
      } else {
        sstart = ((((sstart) + (syadv))) & 0xffff);
      }
    }
    return accesses;
  }

  function method_blit_pixel(runtime: any, space: any, dstaddr: any, srcdata: any): any {
    const members = runtime.members;

    const h_m_vram = members.m_vram ?? 0;
    let curpix: any = ((((((Number(dstaddr) < Number(49152)) ? 1 : 0)) ? (runtime.readIndex(h_m_vram, dstaddr)) : (((runtime.dereference(space)).read_byte?.(dstaddr) ?? 0)))) | 0);
    let keepmask: any = ((255) & 0xff);
    if (((((members.m_fg_only ?? 0)) && (((((srcdata) & (240))) ? 0 : 1))) ? 1 : 0)) {
      if ((members.m_no_even ?? 0)) {
        keepmask = ((((keepmask) & (15))) & 0xff);
      }
    } else {
      if ((((members.m_no_even ?? 0)) ? 0 : 1)) {
        keepmask = ((((keepmask) & (15))) & 0xff);
      }
    }
    if (((((members.m_fg_only ?? 0)) && (((((srcdata) & (15))) ? 0 : 1))) ? 1 : 0)) {
      if ((members.m_no_odd ?? 0)) {
        keepmask = ((((keepmask) & (240))) & 0xff);
      }
    } else {
      if ((((members.m_no_odd ?? 0)) ? 0 : 1)) {
        keepmask = ((((keepmask) & (240))) & 0xff);
      }
    }
    curpix = ((((curpix) & (keepmask))) | 0);
    if ((members.m_solid ?? 0)) {
      curpix = ((((curpix) | ((((members.m_solid_color ?? 0)) & ((~keepmask)))))) | 0);
    } else {
      curpix = ((((curpix) | (((srcdata) & ((~keepmask)))))) | 0);
    }
    if ((((((((((members.m_window_enable ?? 0)) ? 0 : 1)) || (((Number(dstaddr) < Number((members.m_clip_address ?? 0))) ? 1 : 0))) ? 1 : 0)) || (((Number(dstaddr) >= Number(49152)) ? 1 : 0))) ? 1 : 0)) {
      ((runtime.dereference(space)).write_byte?.(dstaddr, curpix) ?? 0);
    }
  }

  function method_window_enable_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_window_enable = (((((data) >>> (0)) & 1)) & 0xff);
  }

  function method_set_cpu_tag(runtime: any, cpu_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cpu.set_tag"] ? __l["m_cpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_cpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
  }

  function method_set_vram_tag(runtime: any, vram_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_vram)).set_tag?.((__l["std::forward"] ? __l["std::forward"](vram_tag) : runtime.macro("std::forward", vram_tag))) ?? 0);
  }

  function method_set_proms_tag(runtime: any, proms_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_proms)).set_tag?.((__l["std::forward"] ? __l["std::forward"](proms_tag) : runtime.macro("std::forward", proms_tag))) ?? 0);
  }

  function method_set_clip_address(runtime: any, clip_address: any): any {
    const members = runtime.members;

    members.m_clip_address = ((clip_address) & 0xffff);
  }

  function method_set_size_xor(runtime: any, size_xor: any): any {
    const members = runtime.members;

    members.m_size_xor = ((size_xor) & 0xff);
  }

  function method_williams_blitter_device__set_cpu_tag(runtime: any, cpu_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cpu.set_tag"] ? __l["m_cpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) : ((members.m_cpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](cpu_tag) : runtime.macro("std::forward", cpu_tag))) ?? 0));
  }

  function method_williams_blitter_device__set_vram_tag(runtime: any, vram_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_vram)).set_tag?.((__l["std::forward"] ? __l["std::forward"](vram_tag) : runtime.macro("std::forward", vram_tag))) ?? 0);
  }

  function method_williams_blitter_device__set_proms_tag(runtime: any, proms_tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_proms)).set_tag?.((__l["std::forward"] ? __l["std::forward"](proms_tag) : runtime.macro("std::forward", proms_tag))) ?? 0);
  }

  function method_williams_blitter_device__set_clip_address(runtime: any, clip_address: any): any {
    const members = runtime.members;

    members.m_clip_address = ((clip_address) & 0xffff);
  }

  function method_williams_blitter_device__set_size_xor(runtime: any, size_xor: any): any {
    const members = runtime.members;

    members.m_size_xor = ((size_xor) & 0xff);
  }
  return {
    "device_start": method_device_start,
    "control_w": method_control_w,
    "blit_core": method_blit_core,
    "blit_pixel": method_blit_pixel,
    "window_enable_w": method_window_enable_w,
    "set_cpu_tag": method_set_cpu_tag,
    "set_vram_tag": method_set_vram_tag,
    "set_proms_tag": method_set_proms_tag,
    "set_clip_address": method_set_clip_address,
    "set_size_xor": method_set_size_xor,
    "williams_blitter_device::set_cpu_tag": method_williams_blitter_device__set_cpu_tag,
    "williams_blitter_device::set_vram_tag": method_williams_blitter_device__set_vram_tag,
    "williams_blitter_device::set_proms_tag": method_williams_blitter_device__set_proms_tag,
    "williams_blitter_device::set_clip_address": method_williams_blitter_device__set_clip_address,
    "williams_blitter_device::set_size_xor": method_williams_blitter_device__set_size_xor
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["NAME","m_cpu.adjust_icount","m_cpu.set_tag","save_item","std::forward"];

export const device = definition;
export default device;
