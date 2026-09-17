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

    const h_m_proms = members.m_proms ?? runtime.member("m_proms");
    let dummy_table: any = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    members.m_window_enable = ((0) & 0xff);
    members.m_remap = members.m_remap_lookup;
    for (let i: any = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let table: any = (((typeof (runtime.dereference(members.m_proms)).found === 'function' ? (runtime.dereference(members.m_proms)).found() : typeof (runtime.dereference(members.m_proms)).found === 'number' || typeof (runtime.dereference(members.m_proms)).found === 'boolean' ? (runtime.dereference(members.m_proms)).found : runtime.container(members.m_proms, "found"))) ? (runtime.addressOf(h_m_proms, ((((i) & (127))) * (16)))) : (dummy_table));
      for (let j: any = ((0) | 0); ((Number(j) < Number(256)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(runtime.writableMember("m_remap_lookup"), ((((i) * (256))) + (j)), ((((runtime.readIndex(table, ((j) >>> (4)))) << (4))) | (runtime.readIndex(table, ((j) & (15))))));
      }
    }
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_window_enable ?? runtime.member("m_window_enable"))) : runtime.macro("NAME", (members.m_window_enable ?? runtime.member("m_window_enable"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_window_enable ?? runtime.member("m_window_enable"))) : runtime.macro("NAME", (members.m_window_enable ?? runtime.member("m_window_enable"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_control ?? runtime.member("m_control"))) : runtime.macro("NAME", (members.m_control ?? runtime.member("m_control"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_control ?? runtime.member("m_control"))) : runtime.macro("NAME", (members.m_control ?? runtime.member("m_control"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_no_even ?? runtime.member("m_no_even"))) : runtime.macro("NAME", (members.m_no_even ?? runtime.member("m_no_even"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_no_even ?? runtime.member("m_no_even"))) : runtime.macro("NAME", (members.m_no_even ?? runtime.member("m_no_even"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_no_odd ?? runtime.member("m_no_odd"))) : runtime.macro("NAME", (members.m_no_odd ?? runtime.member("m_no_odd"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_no_odd ?? runtime.member("m_no_odd"))) : runtime.macro("NAME", (members.m_no_odd ?? runtime.member("m_no_odd"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_solid ?? runtime.member("m_solid"))) : runtime.macro("NAME", (members.m_solid ?? runtime.member("m_solid"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_solid ?? runtime.member("m_solid"))) : runtime.macro("NAME", (members.m_solid ?? runtime.member("m_solid"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_fg_only ?? runtime.member("m_fg_only"))) : runtime.macro("NAME", (members.m_fg_only ?? runtime.member("m_fg_only"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_fg_only ?? runtime.member("m_fg_only"))) : runtime.macro("NAME", (members.m_fg_only ?? runtime.member("m_fg_only"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_solid_color ?? runtime.member("m_solid_color"))) : runtime.macro("NAME", (members.m_solid_color ?? runtime.member("m_solid_color"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_solid_color ?? runtime.member("m_solid_color"))) : runtime.macro("NAME", (members.m_solid_color ?? runtime.member("m_solid_color"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_sstart ?? runtime.member("m_sstart"))) : runtime.macro("NAME", (members.m_sstart ?? runtime.member("m_sstart"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_sstart ?? runtime.member("m_sstart"))) : runtime.macro("NAME", (members.m_sstart ?? runtime.member("m_sstart"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_dstart ?? runtime.member("m_dstart"))) : runtime.macro("NAME", (members.m_dstart ?? runtime.member("m_dstart"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_dstart ?? runtime.member("m_dstart"))) : runtime.macro("NAME", (members.m_dstart ?? runtime.member("m_dstart"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_width ?? runtime.member("m_width"))) : runtime.macro("NAME", (members.m_width ?? runtime.member("m_width"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_width ?? runtime.member("m_width"))) : runtime.macro("NAME", (members.m_width ?? runtime.member("m_width"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_height ?? runtime.member("m_height"))) : runtime.macro("NAME", (members.m_height ?? runtime.member("m_height"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_height ?? runtime.member("m_height"))) : runtime.macro("NAME", (members.m_height ?? runtime.member("m_height"))))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_remap_index ?? runtime.member("m_remap_index"))) : runtime.macro("NAME", (members.m_remap_index ?? runtime.member("m_remap_index"))))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_remap_index ?? runtime.member("m_remap_index"))) : runtime.macro("NAME", (members.m_remap_index ?? runtime.member("m_remap_index"))))));
  }

  function method_control_w(runtime: any, space: any, offset: any, data: any): any {
    const members = runtime.members;

    members.m_control = ((data) & 0xff);
    members.m_no_even = (((((data) >>> (7)) & 1)) ? 1 : 0);
    members.m_no_odd = (((((data) >>> (6)) & 1)) ? 1 : 0);
    members.m_solid = (((((data) >>> (4)) & 1)) ? 1 : 0);
    members.m_fg_only = (((((data) >>> (3)) & 1)) ? 1 : 0);
    let w: any = (((((members.m_width ?? runtime.member("m_width"))) ^ ((members.m_size_xor ?? runtime.member("m_size_xor"))))) | 0);
    let h: any = (((((members.m_height ?? runtime.member("m_height"))) ^ ((members.m_size_xor ?? runtime.member("m_size_xor"))))) | 0);
    if (((Number(w) === Number(0)) ? 1 : 0)) {
      w = ((1) | 0);
    }
    if (((Number(h) === Number(0)) ? 1 : 0)) {
      h = ((1) | 0);
    }
    let accesses: any = ((method_blit_core(runtime, space, w, h)) | 0);
    let estimated_clocks_at_4MHz: any = ((4) | 0);
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (2)) & 1)) {
      estimated_clocks_at_4MHz = ((((estimated_clocks_at_4MHz) + (((4) * (((accesses) + (2))))))) | 0);
    } else {
      estimated_clocks_at_4MHz = ((((estimated_clocks_at_4MHz) + (((2) * (((accesses) + (3))))))) | 0);
    }
    ((members.m_cpu)?.adjust_icount?.((-runtime.divide(((estimated_clocks_at_4MHz) + (3)), 4))) ?? 0);
    0;
  }

  function method_blit_core(runtime: any, space: any, w: any, h: any): any {
    const members = runtime.members;

    let dst_stride_256: any = ((((((members.m_control ?? runtime.member("m_control"))) >>> (1)) & 1)) ? 1 : 0);
    let src_stride_256: any = ((((((members.m_control ?? runtime.member("m_control"))) >>> (0)) & 1)) ? 1 : 0);
    let sxadv: any = ((((src_stride_256) ? (256) : (1))) | 0);
    let syadv: any = ((((src_stride_256) ? (1) : (w))) | 0);
    let dxadv: any = ((((dst_stride_256) ? (256) : (1))) | 0);
    let dyadv: any = ((((dst_stride_256) ? (1) : (w))) | 0);
    let accesses: any = ((0) | 0);
    let pixdata: any = ((0) | 0);
    let shift: any = ((((((members.m_control ?? runtime.member("m_control"))) >>> (5)) & 1)) ? 1 : 0);
    let sstart: any = (((members.m_sstart ?? runtime.member("m_sstart"))) & 0xffff);
    let dstart: any = (((members.m_dstart ?? runtime.member("m_dstart"))) & 0xffff);
    for (let y: any = ((0) | 0); ((Number(y) < Number(h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let source: any = ((sstart) & 0xffff);
      let dest: any = ((dstart) & 0xffff);
      for (let x: any = ((0) | 0); ((Number(x) < Number(w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let rawval: any = ((runtime.readIndex((members.m_remap ?? runtime.member("m_remap")), ((runtime.dereference(space)).read_byte?.(source) ?? 0))) & 0xff);
        if (shift) {
          pixdata = ((((((pixdata) << (8))) | (rawval))) | 0);
          method_blit_pixel(runtime, space, dest, ((((pixdata) >>> (4))) & (255)));
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

    const h_m_vram = members.m_vram ?? runtime.member("m_vram");
    let curpix: any = ((((((Number(dstaddr) < Number(49152)) ? 1 : 0)) ? (runtime.readIndex(h_m_vram, dstaddr)) : (((runtime.dereference(space)).read_byte?.(dstaddr) ?? 0)))) | 0);
    let keepmask: any = ((255) & 0xff);
    if (((((members.m_fg_only ?? runtime.member("m_fg_only"))) && (((((srcdata) & (240))) ? 0 : 1))) ? 1 : 0)) {
      if ((members.m_no_even ?? runtime.member("m_no_even"))) {
        keepmask = ((runtime.andAssign(keepmask, 15)) & 0xff);
      }
    } else {
      if ((((members.m_no_even ?? runtime.member("m_no_even"))) ? 0 : 1)) {
        keepmask = ((runtime.andAssign(keepmask, 15)) & 0xff);
      }
    }
    if (((((members.m_fg_only ?? runtime.member("m_fg_only"))) && (((((srcdata) & (15))) ? 0 : 1))) ? 1 : 0)) {
      if ((members.m_no_odd ?? runtime.member("m_no_odd"))) {
        keepmask = ((runtime.andAssign(keepmask, 240)) & 0xff);
      }
    } else {
      if ((((members.m_no_odd ?? runtime.member("m_no_odd"))) ? 0 : 1)) {
        keepmask = ((runtime.andAssign(keepmask, 240)) & 0xff);
      }
    }
    curpix = ((runtime.andAssign(curpix, keepmask)) | 0);
    if ((members.m_solid ?? runtime.member("m_solid"))) {
      curpix = ((((curpix) | ((((members.m_solid_color ?? runtime.member("m_solid_color"))) & ((~keepmask)))))) | 0);
    } else {
      curpix = ((((curpix) | (((srcdata) & ((~keepmask)))))) | 0);
    }
    if ((((((((((members.m_window_enable ?? runtime.member("m_window_enable"))) ? 0 : 1)) || (((Number(dstaddr) < Number((members.m_clip_address ?? runtime.member("m_clip_address")))) ? 1 : 0))) ? 1 : 0)) || (((Number(dstaddr) >= Number(49152)) ? 1 : 0))) ? 1 : 0)) {
      ((runtime.dereference(space)).write_byte?.(dstaddr, curpix) ?? 0);
    }
  }
  return {
    "device_start": method_device_start,
    "control_w": method_control_w,
    "blit_core": method_blit_core,
    "blit_pixel": method_blit_pixel
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["NAME","save_item"];

export const device = definition;
export default device;
