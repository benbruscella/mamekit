// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './mos6567.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  const __mame_table_0 = [4278190080, 4294770429, 4280556222, 4291225136, 4293008052, 4280209951, 4289600289, 4278908639, 4278469048, 4278465386, 4283910910, 4282402114, 4285494384, 4284087897, 4294857567, 4288849828];
  const __mame_table_1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 192, 0, 1, 112, 240, 0, 0, 0, 0, 0, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 240, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255];

  function method_set_interrupt(runtime: any, mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_reg = members.m_reg ?? 0;
    if (((((((h_m_reg[25]) ^ (mask))) & (h_m_reg[26]))) & (15))) {
      if (((((h_m_reg[25]) & (128))) ? 0 : 1)) {
        do {
          if (0) {
            if (Boolean("vic2")) {
              0;
            }
            0;
          }
        } while (0);
        h_m_reg[25] = ((h_m_reg[25]) | (128));
        (__l["m_write_irq"] ? __l["m_write_irq"](Number(1)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(1) : runtime.invoke("m_write_irq", 1));
      }
    }
    h_m_reg[25] = ((h_m_reg[25]) | (mask));
  }

  function method_clear_interrupt(runtime: any, mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_reg = members.m_reg ?? 0;
    h_m_reg[25] = ((h_m_reg[25]) & ((~mask)));
    if ((((((h_m_reg[25]) & (128))) && (((((((h_m_reg[25]) & (h_m_reg[26]))) & (15))) ? 0 : 1))) ? 1 : 0)) {
      do {
        if (0) {
          if (Boolean("vic2")) {
            0;
          }
          0;
        }
      } while (0);
      h_m_reg[25] = ((h_m_reg[25]) & (-129));
      (__l["m_write_irq"] ? __l["m_write_irq"](Number(0)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(0) : runtime.invoke("m_write_irq", 0));
    }
  }

  function method_read_videoram(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_last_data = (((((__l["space"] ? __l["space"](0) : runtime.macro("space", 0))).read_byte?.(((offset) & (16383))) ?? 0)) & 0xff);
    return (((members.m_last_data ?? 0)) & 0xff);
  }

  function method_read_colorram(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((((__l["space"] ? __l["space"](1) : runtime.macro("space", 1))).read_byte?.(((offset) & (1023))) ?? 0)) & 0xff);
  }

  function method_idle_access(runtime: any): any {
    const members = runtime.members;

    method_read_videoram(runtime, 16383);
  }

  function method_spr_ptr_access(runtime: any, num: any): any {
    const members = runtime.members;

    const h_m_spr_ptr = members.m_spr_ptr ?? 0;
    h_m_spr_ptr[num] = ((method_read_videoram(runtime, (((((members.m_videoaddr ?? 0)) | (1016))) | (num)))) << (6));
  }

  function method_spr_ba(runtime: any, num: any): any {
    const members = runtime.members;

    if (((((members.m_spr_dma_on ?? 0)) >>> (num)) & 1)) {
      method_set_ba(runtime, 0);
      members.m_rdy_cycles = ((((members.m_rdy_cycles) + (2))) | 0);
    } else {
      if ((((((Number(num) > Number(1)) ? 1 : 0)) && (((((((members.m_spr_dma_on ?? 0)) >>> (((num) - (1)))) & 1)) ? 0 : 1))) ? 1 : 0)) {
        method_set_ba(runtime, 1);
      }
    }
  }

  function method_set_ba(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number((members.m_ba ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_ba = ((state) | 0);
      if ((members.m_ba ?? 0)) {
        members.m_aec_delay = ((255) & 0xff);
      }
    }
  }

  function method_spr_data_access(runtime: any, num: any, bytenum: any): any {
    const members = runtime.members;

    const h_m_mc = members.m_mc ?? 0;
    const h_m_spr_ptr = members.m_spr_ptr ?? 0;
    const h_m_spr_data = members.m_spr_data ?? 0;
    if ((((members.m_spr_dma_on ?? 0)) & (((1) << (num))))) {
      runtime.writeIndex(h_m_spr_data[num], bytenum, method_read_videoram(runtime, ((((h_m_mc[num]) & (63))) | (h_m_spr_ptr[num]))));
      h_m_mc[num] = ((h_m_mc[num]) + (1));
    } else {
      if (((Number(bytenum) === Number(1)) ? 1 : 0)) {
        method_idle_access(runtime);
      }
    }
  }

  function method_display_if_bad_line(runtime: any): any {
    const members = runtime.members;

    if ((members.m_is_bad_line ?? 0)) {
      members.m_display_state = ((1) & 0xff);
    }
  }

  function method_set_aec(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number((members.m_aec ?? 0)) !== Number(state)) ? 1 : 0)) {
      members.m_aec = ((state) | 0);
    }
  }

  function method_bad_line_ba(runtime: any): any {
    const members = runtime.members;

    if ((members.m_is_bad_line ?? 0)) {
      if ((members.m_ba ?? 0)) {
        method_set_ba(runtime, 0);
        members.m_rdy_cycles = ((((members.m_rdy_cycles) + (((55) - ((members.m_cycle ?? 0)))))) | 0);
      }
    } else {
      method_set_ba(runtime, 1);
    }
  }

  function method_refresh_access(runtime: any): any {
    const members = runtime.members;

    method_read_videoram(runtime, ((16128) | ((() => { const previous = members.m_ref_cnt; members.m_ref_cnt = ((((members.m_ref_cnt) - (1))) & 0xff); return previous; })())));
  }

  function method_fetch_if_bad_line(runtime: any): any {
    const members = runtime.members;

    if ((members.m_is_bad_line ?? 0)) {
      members.m_display_state = ((1) & 0xff);
    }
  }

  function method_rc_if_bad_line(runtime: any): any {
    const members = runtime.members;

    if ((members.m_is_bad_line ?? 0)) {
      members.m_display_state = ((1) & 0xff);
      members.m_rc = ((0) & 0xff);
    }
  }

  function method_sample_border(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_border_color_sample = members.m_border_color_sample ?? 0;
    if ((members.m_draw_this_line ?? 0)) {
      if ((members.m_border_on ?? 0)) {
        h_m_border_color_sample[(((members.m_cycle ?? 0)) - (13))] = ((h_m_reg[32]) & (15));
      }
      members.m_graphic_x = ((((members.m_graphic_x) + (8))) & 0xffff);
    }
  }

  function method_check_sprite_dma(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_mc_base = members.m_mc_base ?? 0;
    let i: any = ((0) | 0);
    let mask: any = ((1) & 0xff);
    for (i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), mask = ((((mask) << (1))) & 0xff)) {
      if ((((((h_m_reg[21]) & (((1) << (i))))) && (((Number((((members.m_rasterline ?? 0)) & (255))) === Number(h_m_reg[runtime.add(1, ((2) * (i)))])) ? 1 : 0))) ? 1 : 0)) {
        members.m_spr_dma_on = ((((members.m_spr_dma_on) | (mask))) & 0xff);
        h_m_mc_base[i] = 0;
        if (((h_m_reg[23]) & (((1) << (i))))) {
          members.m_spr_exp_y = ((((members.m_spr_exp_y) & ((~mask)))) & 0xff);
        }
      }
    }
  }

  function method_matrix_access(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_matrix_line = members.m_matrix_line ?? 0;
    const h_m_color_line = members.m_color_line ?? 0;
    if ((((members.m_is_bad_line ?? 0)) ? 0 : 1)) {
      return;
    }
    let adr: any = (((((((members.m_vc ?? 0)) & (1023))) | (((((h_m_reg[24]) & (240))) << (6))))) & 0xffff);
    members.m_phi0 = ((1) | 0);
    method_set_aec(runtime, ((((members.m_aec_delay ?? 0)) >>> (2)) & 1));
    if (((((((members.m_ba ?? 0)) ? 0 : 1)) && ((members.m_aec ?? 0))) ? 1 : 0)) {
      h_m_matrix_line[(members.m_ml_index ?? 0)] = 255;
    } else {
      h_m_matrix_line[(members.m_ml_index ?? 0)] = method_read_videoram(runtime, adr);
    }
    h_m_color_line[(members.m_ml_index ?? 0)] = method_read_colorram(runtime, ((adr) & (1023)));
  }

  function method_graphics_access(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_matrix_line = members.m_matrix_line ?? 0;
    const h_m_color_line = members.m_color_line ?? 0;
    if (((Number((members.m_display_state ?? 0)) === Number(1)) ? 1 : 0)) {
      let adr: any = ((0) & 0xffff);
      if (((h_m_reg[17]) & (32))) {
        adr = (((((((((((members.m_vc ?? 0)) & (1023))) << (3))) | ((members.m_bitmapaddr ?? 0)))) | ((members.m_rc ?? 0)))) & 0xffff);
      } else {
        adr = ((((((((h_m_matrix_line[(members.m_ml_index ?? 0)]) << (3))) | ((members.m_chargenaddr ?? 0)))) | ((members.m_rc ?? 0)))) & 0xffff);
      }
      if (((h_m_reg[17]) & (64))) {
        adr = ((((adr) & (63999))) & 0xffff);
      }
      members.m_gfx_data = ((method_read_videoram(runtime, adr)) & 0xff);
      members.m_char_data = ((h_m_matrix_line[(members.m_ml_index ?? 0)]) & 0xff);
      members.m_color_data = ((h_m_color_line[(members.m_ml_index ?? 0)]) & 0xff);
      members.m_ml_index = ((((members.m_ml_index) + (1))) & 0xffff);
      members.m_vc = ((((members.m_vc) + (1))) & 0xffff);
    } else {
      members.m_gfx_data = ((method_read_videoram(runtime, ((((h_m_reg[17]) & (64))) ? (14847) : (16383)))) & 0xff);
      members.m_char_data = ((0) & 0xff);
    }
  }

  function method_draw_background(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_colors = members.m_colors ?? 0;
    if ((members.m_draw_this_line ?? 0)) {
      let c: any = ((0) & 0xff);
      switch (runtime.shiftRight(((((h_m_reg[17]) & (96))) | (((h_m_reg[22]) & (16)))), 4)) {
        case 0:
        case 1:
        case 3:
        {
          c = ((h_m_colors[0]) & 0xff);
          break;
        }
        case 2:
        {
          c = (((((members.m_last_char_data ?? 0)) & (15))) & 0xff);
          break;
        }
        case 4:
        {
          if ((((members.m_last_char_data ?? 0)) & (128))) {
            if ((((members.m_last_char_data ?? 0)) & (64))) {
              c = ((h_m_colors[3]) & 0xff);
            } else {
              c = ((h_m_colors[2]) & 0xff);
            }
          } else {
            if ((((members.m_last_char_data ?? 0)) & (64))) {
              c = ((h_m_colors[1]) & 0xff);
            } else {
              c = ((h_m_colors[0]) & 0xff);
            }
          }
          break;
        }
        default:
        {
          c = ((0) & 0xff);
          break;
        }
      }
      ((members.m_bitmap).plot_box?.((members.m_graphic_x ?? 0), ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((c) & 15)] ?? 0)) ?? 0);
    }
  }

  function method_draw_mono(runtime: any, p: any, c0: any, c1: any): any {
    const members = runtime.members;

    const h_m_bitmap = members.m_bitmap ?? 0;
    const h_m_fore_coll_buf = members.m_fore_coll_buf ?? 0;
    let c: any = [c0, c1];
    let data: any = (((members.m_gfx_data ?? 0)) & 0xff);
    for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
      h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((((p) + (7))) - (i)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (1)))) % 16) + 16) % 16] ?? 0));
      h_m_fore_coll_buf[((((p) + (7))) - (i))] = ((data) & (1));
      data = ((runtime.shiftRight(data, 1)) & 0xff);
    }
  }

  function method_draw_multi(runtime: any, p: any, c0: any, c1: any, c2: any, c3: any): any {
    const members = runtime.members;

    const h_m_bitmap = members.m_bitmap ?? 0;
    const h_m_fore_coll_buf = members.m_fore_coll_buf ?? 0;
    let c: any = [c0, c1, c2, c3];
    let data: any = (((members.m_gfx_data ?? 0)) & 0xff);
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (7)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (3)))) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (7))] = ((data) & (2));
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (6)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (3)))) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (6))] = ((data) & (2));
    data = ((runtime.shiftRight(data, 2)) & 0xff);
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (5)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (3)))) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (5))] = ((data) & (2));
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (4)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (3)))) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (4))] = ((data) & (2));
    data = ((runtime.shiftRight(data, 2)) & 0xff);
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (3)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (3)))) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (3))] = ((data) & (2));
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (2)), (__mame_table_0[(((runtime.readIndex(c, ((data) & (3)))) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (2))] = ((data) & (2));
    data = ((runtime.shiftRight(data, 2)) & 0xff);
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (1)), (__mame_table_0[(((runtime.readIndex(c, data)) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (1))] = ((data) & (2));
    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (0)), (__mame_table_0[(((runtime.readIndex(c, data)) % 16) + 16) % 16] ?? 0));
    h_m_fore_coll_buf[((p) + (0))] = ((data) & (2));
  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_mc = members.m_mc ?? 0;
    const h_m_matrix_line = members.m_matrix_line ?? 0;
    const h_m_color_line = members.m_color_line ?? 0;
    const h_m_spr_coll_buf = members.m_spr_coll_buf ?? 0;
    const h_m_fore_coll_buf = members.m_fore_coll_buf ?? 0;
    const h_m_border_on_sample = members.m_border_on_sample ?? 0;
    const h_m_border_color_sample = members.m_border_color_sample ?? 0;
    const h_m_spr_ptr = members.m_spr_ptr ?? 0;
    const h_m_mc_base = members.m_mc_base ?? 0;
    const h_m_spr_draw_data = members.m_spr_draw_data ?? 0;
    const h_m_spr_data = members.m_spr_data ?? 0;
    const h_m_colors = members.m_colors ?? 0;
    const h_m_spritemulti = members.m_spritemulti ?? 0;
    (() => { const target = h_m_reg; const bytes = Number(128); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    for (let __range0: any = h_m_mc, __range0_index: any = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
      runtime.writeIndex(__range0, __range0_index, 63);
    }
    members.m_rasterline = ((0) | 0);
    members.m_cycle = ((14) & 0xff);
    members.m_raster_x = ((4) & 0xffff);
    members.m_graphic_x = ((0) & 0xffff);
    members.m_last_data = ((0) & 0xff);
    members.m_on = ((1) | 0);
    members.m_chargenaddr = (((members.m_videoaddr = (((members.m_bitmapaddr = ((0) & 0xffff))) & 0xffff))) & 0xffff);
    members.m_dy_start = ((55) & 0xffff);
    members.m_dy_stop = ((247) & 0xffff);
    members.m_draw_this_line = ((0) & 0xff);
    members.m_is_bad_line = ((0) & 0xff);
    members.m_bad_lines_enabled = ((0) & 0xff);
    members.m_display_state = ((0) & 0xff);
    members.m_char_data = ((0) & 0xff);
    members.m_gfx_data = ((0) & 0xff);
    members.m_color_data = ((0) & 0xff);
    members.m_last_char_data = ((0) & 0xff);
    members.m_vblanking = ((0) & 0xff);
    members.m_ml_index = ((0) & 0xffff);
    members.m_rc = ((0) & 0xff);
    members.m_vc = ((0) & 0xffff);
    members.m_vc_base = ((0) & 0xffff);
    members.m_ref_cnt = ((0) & 0xff);
    members.m_spr_exp_y = ((0) & 0xff);
    members.m_spr_dma_on = ((0) & 0xff);
    members.m_spr_draw = ((0) & 0xff);
    members.m_spr_disp_on = ((0) & 0xff);
    members.m_border_on = ((0) & 0xff);
    members.m_ud_border_on = ((0) & 0xff);
    members.m_first_ba_cycle = 0;
    members.m_device_suspended = ((0) & 0xff);
    (() => { const target = h_m_matrix_line; const bytes = Number(40); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_color_line; const bytes = Number(40); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_spr_coll_buf; const bytes = Number(1024); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_fore_coll_buf; const bytes = Number(1024); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_border_on_sample; const bytes = Number(5); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_border_color_sample; const bytes = Number(128); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      h_m_spr_ptr[i] = 0;
      h_m_mc_base[i] = 0;
      h_m_mc[i] = 0;
      for (let j: any = ((0) | 0); ((Number(j) < Number(4)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        runtime.writeIndex(h_m_spr_draw_data[i], j, 0);
        runtime.writeIndex(h_m_spr_data[i], j, 0);
      }
    }
    for (let i: any = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      h_m_colors[i] = 0;
      h_m_spritemulti[i] = 0;
    }
    members.m_phi0 = ((1) | 0);
    members.m_ba = ((0) | 0);
    members.m_aec = ((0) | 0);
    members.m_aec_delay = ((255) & 0xff);
    members.m_rdy_cycles = ((0) | 0);
    method_set_ba(runtime, 1);
    method_set_aec(runtime, 1);
  }

  function method_execute_run(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_border_on_sample = members.m_border_on_sample ?? 0;
    const h_m_mc_base = members.m_mc_base ?? 0;
    const h_m_spr_draw_data = members.m_spr_draw_data ?? 0;
    const h_m_spr_data = members.m_spr_data ?? 0;
    const h_m_mc = members.m_mc ?? 0;
    const h_m_border_color_sample = members.m_border_color_sample ?? 0;
    do {
      let cpu_cycles: any = (((((__l["m_cpu.total_cycles"] ? __l["m_cpu.total_cycles"]() : ((members.m_cpu)?.total_cycles?.() ?? 0))) & (255))) & 0xff);
      let vic_cycles: any = (((((__l["total_cycles"] ? __l["total_cycles"]() : runtime.macro("total_cycles"))) & (255))) & 0xff);
      members.m_phi0 = ((0) | 0);
      members.m_aec_delay = ((((members.m_aec_delay) << (1))) & 0xff);
      members.m_aec_delay = ((((members.m_aec_delay) | ((members.m_ba ?? 0)))) & 0xff);
      method_set_aec(runtime, 0);
      let i: any = ((0) | 0);
      let mask: any = ((0) & 0xff);
      if (((Number((members.m_rasterline ?? 0)) === Number(48)) ? 1 : 0)) {
        members.m_bad_lines_enabled = ((((h_m_reg[17]) & (16))) & 0xff);
      }
      members.m_is_bad_line = (((((((((((((Number((members.m_rasterline ?? 0)) >= Number(48)) ? 1 : 0)) && (((Number((members.m_rasterline ?? 0)) <= Number(247)) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_rasterline ?? 0)) & (7))) === Number(((h_m_reg[17]) & (7)))) ? 1 : 0))) ? 1 : 0)) && ((members.m_bad_lines_enabled ?? 0))) ? 1 : 0)) & 0xff);
      switch ((members.m_cycle ?? 0)) {
        case 1:
        {
          if (((Number((members.m_rasterline ?? 0)) === Number(262)) ? 1 : 0)) {
            members.m_vblanking = ((1) & 0xff);
          } else {
            members.m_rasterline = ((((members.m_rasterline) + (1))) | 0);
            members.m_draw_this_line = (((((((Number(((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222))))))) >= Number(0)) ? 1 : 0)) && (((Number(((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222))))))) <= Number(234)) ? 1 : 0))) ? 1 : 0)) & 0xff);
          }
          h_m_border_on_sample[0] = (members.m_border_on ?? 0);
          method_spr_ptr_access(runtime, 3);
          method_spr_data_access(runtime, 3, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 2:
        {
          if ((members.m_vblanking ?? 0)) {
            members.m_rasterline = (((members.m_vc_base = ((0) & 0xffff))) | 0);
            members.m_ref_cnt = ((255) & 0xff);
            members.m_vblanking = ((0) & 0xff);
            if (((Number(((((((h_m_reg[17]) & (128))) << (1))) | (h_m_reg[18]))) === Number(0)) ? 1 : 0)) {
              method_set_interrupt(runtime, 1);
            }
          }
          if (((Number((members.m_rasterline ?? 0)) === Number(((((((h_m_reg[17]) & (128))) << (1))) | (h_m_reg[18])))) ? 1 : 0)) {
            method_set_interrupt(runtime, 1);
          }
          members.m_graphic_x = ((0) & 0xffff);
          method_spr_data_access(runtime, 3, 1);
          method_spr_data_access(runtime, 3, 2);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 5);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 3:
        {
          method_spr_ptr_access(runtime, 4);
          method_spr_data_access(runtime, 4, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 4:
        {
          method_spr_data_access(runtime, 4, 1);
          method_spr_data_access(runtime, 4, 2);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 6);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 5:
        {
          method_spr_ptr_access(runtime, 5);
          method_spr_data_access(runtime, 5, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 6:
        {
          method_spr_data_access(runtime, 5, 1);
          method_spr_data_access(runtime, 5, 2);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 7);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 7:
        {
          method_spr_ptr_access(runtime, 6);
          method_spr_data_access(runtime, 6, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 8:
        {
          method_spr_data_access(runtime, 6, 1);
          method_spr_data_access(runtime, 6, 2);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 9:
        {
          method_spr_ptr_access(runtime, 7);
          method_spr_data_access(runtime, 7, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 10:
        {
          method_spr_data_access(runtime, 7, 1);
          method_spr_data_access(runtime, 7, 2);
          method_display_if_bad_line(runtime);
          method_set_ba(runtime, 1);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 11:
        {
          method_refresh_access(runtime);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 12:
        {
          method_bad_line_ba(runtime);
          method_refresh_access(runtime);
          method_fetch_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 13:
        {
          method_bad_line_ba(runtime);
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_refresh_access(runtime);
          method_fetch_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 14:
        {
          method_bad_line_ba(runtime);
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_refresh_access(runtime);
          method_rc_if_bad_line(runtime);
          members.m_vc = (((members.m_vc_base ?? 0)) & 0xffff);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 15:
        {
          method_bad_line_ba(runtime);
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_refresh_access(runtime);
          method_fetch_if_bad_line(runtime);
          for (i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if ((((members.m_spr_exp_y ?? 0)) & (((1) << (i))))) {
              h_m_mc_base[i] = ((h_m_mc_base[i]) + (2));
            }
          }
          members.m_ml_index = ((0) & 0xffff);
          method_matrix_access(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 16:
        {
          method_bad_line_ba(runtime);
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_graphics_access(runtime);
          method_fetch_if_bad_line(runtime);
          mask = ((1) & 0xff);
          for (i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), mask = ((((mask) << (1))) & 0xff)) {
            if ((((members.m_spr_exp_y ?? 0)) & (mask))) {
              h_m_mc_base[i] = ((h_m_mc_base[i]) + (1));
            }
            if (((Number(((h_m_mc_base[i]) & (63))) === Number(63)) ? 1 : 0)) {
              members.m_spr_dma_on = ((((members.m_spr_dma_on) & ((~mask)))) & 0xff);
            }
          }
          method_matrix_access(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 17:
        {
          method_bad_line_ba(runtime);
          if (((h_m_reg[22]) & (8))) {
            if (((Number((members.m_rasterline ?? 0)) === Number((members.m_dy_stop ?? 0))) ? 1 : 0)) {
              members.m_ud_border_on = ((1) & 0xff);
            } else {
              if (((h_m_reg[17]) & (16))) {
                if (((Number((members.m_rasterline ?? 0)) === Number((members.m_dy_start ?? 0))) ? 1 : 0)) {
                  members.m_border_on = (((members.m_ud_border_on = ((0) & 0xff))) & 0xff);
                } else {
                  if (((Number((members.m_ud_border_on ?? 0)) === Number(0)) ? 1 : 0)) {
                    members.m_border_on = ((0) & 0xff);
                  }
                }
              } else {
                if (((Number((members.m_ud_border_on ?? 0)) === Number(0)) ? 1 : 0)) {
                  members.m_border_on = ((0) & 0xff);
                }
              }
            }
          }
          h_m_border_on_sample[1] = (members.m_border_on ?? 0);
          method_draw_background(runtime);
          method_draw_graphics(runtime);
          method_sample_border(runtime);
          method_graphics_access(runtime);
          method_fetch_if_bad_line(runtime);
          method_matrix_access(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 18:
        {
          method_bad_line_ba(runtime);
          if (((((h_m_reg[22]) & (8))) ? 0 : 1)) {
            if (((Number((members.m_rasterline ?? 0)) === Number((members.m_dy_stop ?? 0))) ? 1 : 0)) {
              members.m_ud_border_on = ((1) & 0xff);
            } else {
              if (((h_m_reg[17]) & (16))) {
                if (((Number((members.m_rasterline ?? 0)) === Number((members.m_dy_start ?? 0))) ? 1 : 0)) {
                  members.m_border_on = (((members.m_ud_border_on = ((0) & 0xff))) & 0xff);
                } else {
                  if (((Number((members.m_ud_border_on ?? 0)) === Number(0)) ? 1 : 0)) {
                    members.m_border_on = ((0) & 0xff);
                  }
                }
              } else {
                if (((Number((members.m_ud_border_on ?? 0)) === Number(0)) ? 1 : 0)) {
                  members.m_border_on = ((0) & 0xff);
                }
              }
            }
          }
          h_m_border_on_sample[2] = (members.m_border_on ?? 0);
        }
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
        case 37:
        case 38:
        case 39:
        case 40:
        case 41:
        case 42:
        case 43:
        case 44:
        case 45:
        case 46:
        case 47:
        case 48:
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        {
          method_draw_graphics(runtime);
          method_sample_border(runtime);
          method_graphics_access(runtime);
          method_fetch_if_bad_line(runtime);
          method_matrix_access(runtime);
          members.m_last_char_data = (((members.m_char_data ?? 0)) & 0xff);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 55:
        {
          if ((members.m_is_bad_line ?? 0)) {
            method_set_ba(runtime, 1);
          }
          method_draw_graphics(runtime);
          method_sample_border(runtime);
          method_graphics_access(runtime);
          method_display_if_bad_line(runtime);
          mask = ((1) & 0xff);
          for (i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), mask = ((((mask) << (1))) & 0xff)) {
            if (((h_m_reg[23]) & (((1) << (i))))) {
              members.m_spr_exp_y = ((((members.m_spr_exp_y) ^ (mask))) & 0xff);
            }
          }
          method_check_sprite_dma(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 56:
        {
          if (((((h_m_reg[22]) & (8))) ? 0 : 1)) {
            members.m_border_on = ((1) & 0xff);
          }
          h_m_border_on_sample[3] = (members.m_border_on ?? 0);
          method_draw_graphics(runtime);
          method_sample_border(runtime);
          method_idle_access(runtime);
          method_display_if_bad_line(runtime);
          method_check_sprite_dma(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 57:
        {
          if (((h_m_reg[22]) & (8))) {
            members.m_border_on = ((1) & 0xff);
          }
          h_m_border_on_sample[4] = (members.m_border_on ?? 0);
          members.m_spr_draw = (((members.m_spr_disp_on ?? 0)) & 0xff);
          if ((members.m_spr_draw ?? 0)) {
            (__l["memcpy"] ? __l["memcpy"](h_m_spr_draw_data, h_m_spr_data, 32) : runtime.macro("memcpy", h_m_spr_draw_data, h_m_spr_data, 32));
          }
          mask = ((1) & 0xff);
          for (i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), mask = ((((mask) << (1))) & 0xff)) {
            if (((((((members.m_spr_disp_on ?? 0)) & (mask))) && ((((((members.m_spr_dma_on ?? 0)) & (mask))) ? 0 : 1))) ? 1 : 0)) {
              members.m_spr_disp_on = ((((members.m_spr_disp_on) & ((~mask)))) & 0xff);
            }
          }
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_idle_access(runtime);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 0);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 58:
        {
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_idle_access(runtime);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 59:
        {
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_idle_access(runtime);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 1);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 60:
        {
          method_draw_background(runtime);
          method_sample_border(runtime);
          mask = ((1) & 0xff);
          for (i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), mask = ((((mask) << (1))) & 0xff)) {
            h_m_mc[i] = h_m_mc_base[i];
            if (((((((members.m_spr_dma_on ?? 0)) & (mask))) && (((Number((((members.m_rasterline ?? 0)) & (255))) === Number(h_m_reg[runtime.add(1, ((2) * (i)))])) ? 1 : 0))) ? 1 : 0)) {
              members.m_spr_disp_on = ((((members.m_spr_disp_on) | (mask))) & 0xff);
            }
          }
          method_spr_ptr_access(runtime, 0);
          method_spr_data_access(runtime, 0, 0);
          if (((Number((members.m_rc ?? 0)) === Number(7)) ? 1 : 0)) {
            members.m_vc_base = (((members.m_vc ?? 0)) & 0xffff);
            members.m_display_state = ((0) & 0xff);
          }
          if (((((members.m_is_bad_line ?? 0)) || ((members.m_display_state ?? 0))) ? 1 : 0)) {
            members.m_display_state = ((1) & 0xff);
            members.m_rc = (((((((members.m_rc ?? 0)) + (1))) & (7))) & 0xff);
          }
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 61:
        {
          method_draw_background(runtime);
          method_sample_border(runtime);
          method_spr_data_access(runtime, 0, 1);
          method_spr_data_access(runtime, 0, 2);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 2);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 62:
        {
          method_draw_background(runtime);
          method_sample_border(runtime);
          if ((members.m_draw_this_line ?? 0)) {
            method_draw_sprites(runtime);
            if (h_m_border_on_sample[0]) {
              for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                ((members.m_bitmap).plot_box?.(((0) ? (((i) * (8))) : (((i) * (8)))), ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((h_m_border_color_sample[i]) & 15)] ?? 0)) ?? 0);
              }
            }
            if (h_m_border_on_sample[1]) {
              ((members.m_bitmap).plot_box?.(32, ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((h_m_border_color_sample[4]) & 15)] ?? 0)) ?? 0);
            }
            if (h_m_border_on_sample[2]) {
              for (i = ((5) | 0); ((Number(i) < Number(43)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                ((members.m_bitmap).plot_box?.(((0) ? (((i) * (8))) : (((i) * (8)))), ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((h_m_border_color_sample[i]) & 15)] ?? 0)) ?? 0);
              }
            }
            if (h_m_border_on_sample[3]) {
              ((members.m_bitmap).plot_box?.(344, ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((h_m_border_color_sample[43]) & 15)] ?? 0)) ?? 0);
            }
            if (h_m_border_on_sample[4]) {
              for (i = ((44) | 0); ((Number(i) < Number(48)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                ((members.m_bitmap).plot_box?.(((0) ? (((i) * (8))) : (((i) * (8)))), ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((h_m_border_color_sample[i]) & 15)] ?? 0)) ?? 0);
              }
              for (i = ((48) | 0); ((Number(i) < Number(53)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                ((members.m_bitmap).plot_box?.(((0) ? (((i) * (8))) : (((i) * (8)))), ((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), 8, 1, (__mame_table_0[((h_m_border_color_sample[47]) & 15)] ?? 0)) ?? 0);
              }
            }
          }
          method_spr_ptr_access(runtime, 1);
          method_spr_data_access(runtime, 1, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 63:
        {
          method_spr_data_access(runtime, 1, 1);
          method_spr_data_access(runtime, 1, 2);
          method_display_if_bad_line(runtime);
          method_spr_ba(runtime, 3);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 64:
        {
          method_spr_ptr_access(runtime, 2);
          method_spr_data_access(runtime, 2, 0);
          method_display_if_bad_line(runtime);
          members.m_cycle = ((((members.m_cycle) + (1))) & 0xff);
          break;
        }
        case 65:
        {
          method_spr_data_access(runtime, 2, 1);
          method_spr_data_access(runtime, 2, 2);
          method_display_if_bad_line(runtime);
          if (((Number((members.m_rasterline ?? 0)) === Number((members.m_dy_stop ?? 0))) ? 1 : 0)) {
            members.m_ud_border_on = ((1) & 0xff);
          } else {
            if ((((((h_m_reg[17]) & (16))) && (((Number((members.m_rasterline ?? 0)) === Number((members.m_dy_start ?? 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_ud_border_on = ((0) & 0xff);
            }
          }
          method_spr_ba(runtime, 4);
          members.m_cycle = ((1) & 0xff);
        }
      }
      members.m_phi0 = ((1) | 0);
      method_set_aec(runtime, ((((members.m_aec_delay ?? 0)) >>> (2)) & 1));
      (__l["m_write_ba"] ? __l["m_write_ba"](Number((members.m_ba ?? 0))) : typeof members.m_write_ba === 'function' ? members.m_write_ba((members.m_ba ?? 0)) : runtime.invoke("m_write_ba", (members.m_ba ?? 0)));
      (__l["m_write_aec"] ? __l["m_write_aec"](Number((members.m_aec ?? 0))) : typeof members.m_write_aec === 'function' ? members.m_write_aec((members.m_aec ?? 0)) : runtime.invoke("m_write_aec", (members.m_aec ?? 0)));
      members.m_raster_x = ((((members.m_raster_x) + (8))) & 0xffff);
      if (((Number((members.m_raster_x ?? 0)) === Number(508)) ? 1 : 0)) {
        members.m_raster_x = ((4) & 0xffff);
      }
      if ((((((Number(cpu_cycles) === Number(vic_cycles)) ? 1 : 0)) && (((Number((members.m_rdy_cycles ?? 0)) > Number(0)) ? 1 : 0))) ? 1 : 0)) {
        (__l["m_cpu.spin_until_time"] ? __l["m_cpu.spin_until_time"]((__l["m_cpu.cycles_to_attotime"] ? __l["m_cpu.cycles_to_attotime"]((members.m_rdy_cycles ?? 0)) : ((members.m_cpu)?.cycles_to_attotime?.((members.m_rdy_cycles ?? 0)) ?? 0))) : ((members.m_cpu)?.spin_until_time?.((__l["m_cpu.cycles_to_attotime"] ? __l["m_cpu.cycles_to_attotime"]((members.m_rdy_cycles ?? 0)) : ((members.m_cpu)?.cycles_to_attotime?.((members.m_rdy_cycles ?? 0)) ?? 0))) ?? 0));
        members.m_rdy_cycles = ((0) | 0);
      }
      members.m_icount = ((((members.m_icount) - (1))) | 0);
    } while (((Number((members.m_icount ?? 0)) > Number(0)) ? 1 : 0));
  }

  function method_draw_graphics(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_fore_coll_buf = members.m_fore_coll_buf ?? 0;
    const h_m_colors = members.m_colors ?? 0;
    const h_m_bitmap = members.m_bitmap ?? 0;
    if (((Number((members.m_draw_this_line ?? 0)) === Number(0)) ? 1 : 0)) {
      let p: any = (((((members.m_graphic_x ?? 0)) + (((h_m_reg[22]) & (7))))) & 0xffff);
      h_m_fore_coll_buf[((p) + (7))] = 0;
      h_m_fore_coll_buf[((p) + (6))] = 0;
      h_m_fore_coll_buf[((p) + (5))] = 0;
      h_m_fore_coll_buf[((p) + (4))] = 0;
      h_m_fore_coll_buf[((p) + (3))] = 0;
      h_m_fore_coll_buf[((p) + (2))] = 0;
      h_m_fore_coll_buf[((p) + (1))] = 0;
      h_m_fore_coll_buf[((p) + (0))] = 0;
    } else {
      if ((members.m_ud_border_on ?? 0)) {
        let p: any = (((((members.m_graphic_x ?? 0)) + (((h_m_reg[22]) & (7))))) & 0xffff);
        h_m_fore_coll_buf[((p) + (7))] = 0;
        h_m_fore_coll_buf[((p) + (6))] = 0;
        h_m_fore_coll_buf[((p) + (5))] = 0;
        h_m_fore_coll_buf[((p) + (4))] = 0;
        h_m_fore_coll_buf[((p) + (3))] = 0;
        h_m_fore_coll_buf[((p) + (2))] = 0;
        h_m_fore_coll_buf[((p) + (1))] = 0;
        h_m_fore_coll_buf[((p) + (0))] = 0;
        method_draw_background(runtime);
      } else {
        let tmp_col: any = ((0) & 0xff);
        let p: any = (((((members.m_graphic_x ?? 0)) + (((h_m_reg[22]) & (7))))) & 0xffff);
        switch (runtime.shiftRight(((((h_m_reg[17]) & (96))) | (((h_m_reg[22]) & (16)))), 4)) {
          case 0:
          {
            method_draw_mono(runtime, p, h_m_colors[0], (((members.m_color_data ?? 0)) & (15)));
            break;
          }
          case 1:
          {
            if ((((members.m_color_data ?? 0)) & (8))) {
              method_draw_multi(runtime, p, h_m_colors[0], h_m_colors[1], h_m_colors[2], (((members.m_color_data ?? 0)) & (7)));
            } else {
              method_draw_mono(runtime, p, h_m_colors[0], (((members.m_color_data ?? 0)) & (15)));
            }
            break;
          }
          case 2:
          {
            method_draw_mono(runtime, p, (((members.m_char_data ?? 0)) & (15)), runtime.shiftRight((members.m_char_data ?? 0), 4));
            break;
          }
          case 3:
          {
            method_draw_multi(runtime, p, h_m_colors[0], runtime.shiftRight((members.m_char_data ?? 0), 4), (((members.m_char_data ?? 0)) & (15)), (((members.m_color_data ?? 0)) & (15)));
            break;
          }
          case 4:
          {
            if ((((members.m_char_data ?? 0)) & (128))) {
              if ((((members.m_char_data ?? 0)) & (64))) {
                tmp_col = ((h_m_colors[3]) & 0xff);
              } else {
                tmp_col = ((h_m_colors[2]) & 0xff);
              }
            } else {
              if ((((members.m_char_data ?? 0)) & (64))) {
                tmp_col = ((h_m_colors[1]) & 0xff);
              } else {
                tmp_col = ((h_m_colors[0]) & 0xff);
              }
            }
            method_draw_mono(runtime, p, tmp_col, (((members.m_color_data ?? 0)) & (15)));
            break;
          }
          case 5:
          case 6:
          case 7:
          {
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (7)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (7))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (6)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (6))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (5)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (5))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (4)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (4))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (3)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (3))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (2)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (2))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (1)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (1))] = 0;
            h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (0)), (__mame_table_0[((0) & 15)] ?? 0));
            h_m_fore_coll_buf[((p) + (0))] = 0;
            break;
          }
        }
      }
    }
  }

  function method_draw_sprites(runtime: any): any {
    const members = runtime.members;

    const h_m_spr_coll_buf = members.m_spr_coll_buf ?? 0;
    const h_m_reg = members.m_reg ?? 0;
    const h_m_spr_draw_data = members.m_spr_draw_data ?? 0;
    const h_m_expandx_multi = members.m_expandx_multi ?? 0;
    const h_m_fore_coll_buf = members.m_fore_coll_buf ?? 0;
    const h_m_spritemulti = members.m_spritemulti ?? 0;
    const h_m_bitmap = members.m_bitmap ?? 0;
    const h_m_expandx = members.m_expandx ?? 0;
    let i: any = ((0) | 0);
    let snum: any = ((0) & 0xff);
    let sbit: any = ((0) & 0xff);
    let spr_coll: any = ((0) & 0xff);
    let gfx_coll: any = ((0) & 0xff);
    let plane0_l: any = ((0) >>> 0);
    let plane0_r: any = ((0) >>> 0);
    let plane1_l: any = ((0) >>> 0);
    let plane1_r: any = ((0) >>> 0);
    let sdata_l: any = ((0) >>> 0);
    let sdata_r: any = ((0) >>> 0);
    for (i = ((0) | 0); ((Number(i) < Number(1024)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      h_m_spr_coll_buf[i] = 0;
    }
    for (snum = ((0) & 0xff), sbit = ((1) & 0xff); ((Number(snum) < Number(8)) ? 1 : 0); snum = ((((snum) + (1))) & 0xff), sbit = ((((sbit) << (1))) & 0xff)) {
      if (((((((members.m_spr_draw ?? 0)) & (sbit))) && (((Number(((h_m_reg[((snum) * (2))]) | (((((h_m_reg[16]) & (((1) << (snum))))) ? (256) : (0))))) <= Number(352)) ? 1 : 0))) ? 1 : 0)) {
        let p: any = ((runtime.add(runtime.add(((h_m_reg[((snum) * (2))]) | (((((h_m_reg[16]) & (((1) << (snum))))) ? (256) : (0)))), 0), 8)) & 0xffff);
        let color: any = ((((h_m_reg[((39) + (snum))]) & (15))) & 0xff);
        let sdata: any = ((((((((runtime.readIndex(h_m_spr_draw_data[snum], 0)) << (24))) | (((runtime.readIndex(h_m_spr_draw_data[snum], 1)) << (16))))) | (((runtime.readIndex(h_m_spr_draw_data[snum], 2)) << (8))))) >>> 0);
        if (((h_m_reg[29]) & (((1) << (snum))))) {
          if (((Number(((h_m_reg[((snum) * (2))]) | (((((h_m_reg[16]) & (((1) << (snum))))) ? (256) : (0))))) > Number(328)) ? 1 : 0)) {
            continue;
          }
          if (((h_m_reg[28]) & (((1) << (snum))))) {
            sdata_l = ((((((h_m_expandx_multi[((runtime.shiftRight(sdata, 24)) & (255))]) << (16))) | (h_m_expandx_multi[((runtime.shiftRight(sdata, 16)) & (255))]))) >>> 0);
            sdata_r = ((((h_m_expandx_multi[((runtime.shiftRight(sdata, 8)) & (255))]) << (16))) >>> 0);
            plane0_l = ((((((sdata_l) & (1431655765))) | (((((sdata_l) & (1431655765))) << (1))))) >>> 0);
            plane1_l = ((((((sdata_l) & (2863311530))) | (runtime.shiftRight(((sdata_l) & (2863311530)), 1)))) >>> 0);
            plane0_r = ((((((sdata_r) & (1431655765))) | (((((sdata_r) & (1431655765))) << (1))))) >>> 0);
            plane1_r = ((((((sdata_r) & (2863311530))) | (runtime.shiftRight(((sdata_r) & (2863311530)), 1)))) >>> 0);
            for (i = ((0) | 0); ((Number(i) < Number(32)) ? 1 : 0); i = ((((i) + (1))) | 0), plane0_l = ((((plane0_l) << (1))) >>> 0), plane1_l = ((((plane1_l) << (1))) >>> 0)) {
              let col: any = ((0) & 0xff);
              if (((plane1_l) & (2147483648))) {
                if (h_m_fore_coll_buf[((p) + (i))]) {
                  gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                }
                if (((plane0_l) & (2147483648))) {
                  col = ((h_m_spritemulti[3]) & 0xff);
                } else {
                  col = ((color) & 0xff);
                }
              } else {
                if (((plane0_l) & (2147483648))) {
                  if (h_m_fore_coll_buf[((p) + (i))]) {
                    gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                  }
                  col = ((h_m_spritemulti[1]) & 0xff);
                } else {
                  continue;
                }
              }
              if (h_m_spr_coll_buf[((p) + (i))]) {
                spr_coll = ((((spr_coll) | (((h_m_spr_coll_buf[((p) + (i))]) | (sbit))))) & 0xff);
              } else {
                if (((h_m_reg[27]) & (((1) << (snum))))) {
                  if (((Number(h_m_fore_coll_buf[((p) + (i))]) === Number(0)) ? 1 : 0)) {
                    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((col) & 15)] ?? 0));
                  }
                  h_m_spr_coll_buf[((p) + (i))] = sbit;
                } else {
                  h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((col) & 15)] ?? 0));
                  h_m_spr_coll_buf[((p) + (i))] = sbit;
                }
              }
            }
            for (; ((Number(i) < Number(48)) ? 1 : 0); i = ((((i) + (1))) | 0), plane0_r = ((((plane0_r) << (1))) >>> 0), plane1_r = ((((plane1_r) << (1))) >>> 0)) {
              let col: any = ((0) & 0xff);
              if (((plane1_r) & (2147483648))) {
                if (h_m_fore_coll_buf[((p) + (i))]) {
                  gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                }
                if (((plane0_r) & (2147483648))) {
                  col = ((h_m_spritemulti[3]) & 0xff);
                } else {
                  col = ((color) & 0xff);
                }
              } else {
                if (((plane0_r) & (2147483648))) {
                  if (h_m_fore_coll_buf[((p) + (i))]) {
                    gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                  }
                  col = ((h_m_spritemulti[1]) & 0xff);
                } else {
                  continue;
                }
              }
              if (h_m_spr_coll_buf[((p) + (i))]) {
                spr_coll = ((((spr_coll) | (((h_m_spr_coll_buf[((p) + (i))]) | (sbit))))) & 0xff);
              } else {
                if (((h_m_reg[27]) & (((1) << (snum))))) {
                  if (((Number(h_m_fore_coll_buf[((p) + (i))]) === Number(0)) ? 1 : 0)) {
                    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((col) & 15)] ?? 0));
                  }
                  h_m_spr_coll_buf[((p) + (i))] = sbit;
                } else {
                  h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((col) & 15)] ?? 0));
                  h_m_spr_coll_buf[((p) + (i))] = sbit;
                }
              }
            }
          } else {
            sdata_l = ((((((h_m_expandx[((runtime.shiftRight(sdata, 24)) & (255))]) << (16))) | (h_m_expandx[((runtime.shiftRight(sdata, 16)) & (255))]))) >>> 0);
            sdata_r = ((((h_m_expandx[((runtime.shiftRight(sdata, 8)) & (255))]) << (16))) >>> 0);
            for (i = ((0) | 0); ((Number(i) < Number(32)) ? 1 : 0); i = ((((i) + (1))) | 0), sdata_l = ((((sdata_l) << (1))) >>> 0)) {
              if (((sdata_l) & (2147483648))) {
                if (h_m_fore_coll_buf[((p) + (i))]) {
                  gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                }
                if (h_m_spr_coll_buf[((p) + (i))]) {
                  spr_coll = ((((spr_coll) | (((h_m_spr_coll_buf[((p) + (i))]) | (sbit))))) & 0xff);
                } else {
                  if (((h_m_reg[27]) & (((1) << (snum))))) {
                    if (((Number(h_m_fore_coll_buf[((p) + (i))]) === Number(0)) ? 1 : 0)) {
                      h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((color) & 15)] ?? 0));
                    }
                    h_m_spr_coll_buf[((p) + (i))] = sbit;
                  } else {
                    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((color) & 15)] ?? 0));
                    h_m_spr_coll_buf[((p) + (i))] = sbit;
                  }
                }
              }
            }
            for (; ((Number(i) < Number(48)) ? 1 : 0); i = ((((i) + (1))) | 0), sdata_r = ((((sdata_r) << (1))) >>> 0)) {
              if (((sdata_r) & (2147483648))) {
                if (h_m_fore_coll_buf[((p) + (i))]) {
                  gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                }
                if (h_m_spr_coll_buf[((p) + (i))]) {
                  spr_coll = ((((spr_coll) | (((h_m_spr_coll_buf[((p) + (i))]) | (sbit))))) & 0xff);
                } else {
                  if (((h_m_reg[27]) & (((1) << (snum))))) {
                    if (((Number(h_m_fore_coll_buf[((p) + (i))]) === Number(0)) ? 1 : 0)) {
                      h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((color) & 15)] ?? 0));
                    }
                    h_m_spr_coll_buf[((p) + (i))] = sbit;
                  } else {
                    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((color) & 15)] ?? 0));
                    h_m_spr_coll_buf[((p) + (i))] = sbit;
                  }
                }
              }
            }
          }
        } else {
          if (((h_m_reg[28]) & (((1) << (snum))))) {
            let plane0: any = ((((((sdata) & (1431655765))) | (((((sdata) & (1431655765))) << (1))))) >>> 0);
            let plane1: any = ((((((sdata) & (2863311530))) | (runtime.shiftRight(((sdata) & (2863311530)), 1)))) >>> 0);
            for (i = ((0) | 0); ((Number(i) < Number(24)) ? 1 : 0); i = ((((i) + (1))) | 0), plane0 = ((((plane0) << (1))) >>> 0), plane1 = ((((plane1) << (1))) >>> 0)) {
              let col: any = ((0) & 0xff);
              if (((plane1) & (2147483648))) {
                if (h_m_fore_coll_buf[((p) + (i))]) {
                  gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                }
                if (((plane0) & (2147483648))) {
                  col = ((h_m_spritemulti[3]) & 0xff);
                } else {
                  col = ((color) & 0xff);
                }
              } else {
                if (((plane0) & (2147483648))) {
                  if (h_m_fore_coll_buf[((p) + (i))]) {
                    gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                  }
                  col = ((h_m_spritemulti[1]) & 0xff);
                } else {
                  continue;
                }
              }
              if (h_m_spr_coll_buf[((p) + (i))]) {
                spr_coll = ((((spr_coll) | (((h_m_spr_coll_buf[((p) + (i))]) | (sbit))))) & 0xff);
              } else {
                if (((h_m_reg[27]) & (((1) << (snum))))) {
                  if (((Number(h_m_fore_coll_buf[((p) + (i))]) === Number(0)) ? 1 : 0)) {
                    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((col) & 15)] ?? 0));
                  }
                  h_m_spr_coll_buf[((p) + (i))] = sbit;
                } else {
                  h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((col) & 15)] ?? 0));
                  h_m_spr_coll_buf[((p) + (i))] = sbit;
                }
              }
            }
          } else {
            for (i = ((0) | 0); ((Number(i) < Number(24)) ? 1 : 0); i = ((((i) + (1))) | 0), sdata = ((((sdata) << (1))) >>> 0)) {
              if (((sdata) & (2147483648))) {
                if (h_m_fore_coll_buf[((p) + (i))]) {
                  gfx_coll = ((((gfx_coll) | (sbit))) & 0xff);
                }
                if (h_m_spr_coll_buf[((p) + (i))]) {
                  spr_coll = ((((spr_coll) | (((h_m_spr_coll_buf[((p) + (i))]) | (sbit))))) & 0xff);
                } else {
                  if (((h_m_reg[27]) & (((1) << (snum))))) {
                    if (((Number(h_m_fore_coll_buf[((p) + (i))]) === Number(0)) ? 1 : 0)) {
                      h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((color) & 15)] ?? 0));
                    }
                    h_m_spr_coll_buf[((p) + (i))] = sbit;
                  } else {
                    h_m_bitmap["pix="](((0) ? ((((members.m_rasterline ?? 0)) - (16))) : (((((Number((members.m_rasterline ?? 0)) >= Number(41)) ? 1 : 0)) ? ((((members.m_rasterline ?? 0)) - (41))) : ((((members.m_rasterline ?? 0)) + (222)))))), ((p) + (i)), (__mame_table_0[((color) & 15)] ?? 0));
                    h_m_spr_coll_buf[((p) + (i))] = sbit;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (h_m_reg[30]) {
      h_m_reg[30] = ((h_m_reg[30]) | (spr_coll));
    } else {
      h_m_reg[30] = spr_coll;
      if (h_m_reg[30]) {
        method_set_interrupt(runtime, 4);
      }
    }
    if (h_m_reg[31]) {
      h_m_reg[31] = ((h_m_reg[31]) | (gfx_coll));
    } else {
      h_m_reg[31] = gfx_coll;
      if (h_m_reg[31]) {
        method_set_interrupt(runtime, 2);
      }
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bitmap = members.m_bitmap ?? 0;
    ((runtime.dereference(bitmap)).fill?.((__mame_table_0[((0) & 15)] ?? 0), cliprect) ?? 0);
    if ((members.m_on ?? 0)) {
      (__l["copybitmap"] ? __l["copybitmap"](bitmap, h_m_bitmap, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_m_bitmap, 0, 0, 0, 0, cliprect));
    }
    return 0;
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    let val: any = ((0) & 0xff);
    offset = ((offset) & (63));
    switch (offset) {
      case 17:
      {
        val = ((((((h_m_reg[offset]) & (-129))) | (runtime.shiftRight((((members.m_rasterline ?? 0)) & (256)), 1)))) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 18:
      {
        val = (((((members.m_rasterline ?? 0)) & (255))) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 22:
      {
        val = ((((h_m_reg[offset]) | (192))) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 24:
      {
        val = ((((h_m_reg[offset]) | (1))) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 25:
      {
        val = ((((h_m_reg[offset]) | (112))) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 26:
      {
        val = ((((h_m_reg[offset]) | (240))) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 30:
      {
        val = ((h_m_reg[offset]) & 0xff);
        h_m_reg[offset] = 0;
        method_clear_interrupt(runtime, 4);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 31:
      {
        val = ((h_m_reg[offset]) & 0xff);
        h_m_reg[offset] = 0;
        method_clear_interrupt(runtime, 2);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 32:
      case 33:
      case 34:
      case 35:
      case 36:
      {
        val = ((h_m_reg[offset]) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
      case 16:
      case 23:
      case 27:
      case 28:
      case 29:
      case 37:
      case 38:
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      {
        val = ((h_m_reg[offset]) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      case 47:
      case 48:
      {
        if (0) {
          val = ((h_m_reg[offset]) & 0xff);
          do {
            if (0) {
              if (Boolean("vic read")) {
                0;
              }
              0;
            }
          } while (0);
        } else {
          val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        }
        break;
      }
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      {
        do {
          if (0) {
            if (Boolean("vic read")) {
              0;
            }
            0;
          }
        } while (0);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
        break;
      }
      default:
      {
        val = ((h_m_reg[offset]) & 0xff);
        val = ((((val) | ((__mame_table_1[((offset) & 63)] ?? 0)))) & 0xff);
      }
    }
    if ((((((Number(offset) !== Number(17)) ? 1 : 0)) && (((Number(offset) !== Number(18)) ? 1 : 0))) ? 1 : 0)) {
      do {
        if (0) {
          if (Boolean("vic read")) {
            0;
          }
          0;
        }
      } while (0);
    }
    return ((val) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_reg = members.m_reg ?? 0;
    const h_m_spritemulti = members.m_spritemulti ?? 0;
    const h_m_colors = members.m_colors ?? 0;
    do {
      if (0) {
        if (Boolean("vic write")) {
          0;
        }
        0;
      }
    } while (0);
    offset = ((offset) & (63));
    switch (offset) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 9:
      case 11:
      case 13:
      case 15:
      {
        h_m_reg[offset] = data;
        break;
      }
      case 0:
      case 2:
      case 4:
      case 6:
      case 8:
      case 10:
      case 12:
      case 14:
      {
        h_m_reg[offset] = data;
        break;
      }
      case 16:
      {
        h_m_reg[offset] = data;
        break;
      }
      case 23:
      {
        members.m_spr_exp_y = ((((members.m_spr_exp_y) | ((~data)))) & 0xff);
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 29:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 27:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 28:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 39:
      case 40:
      case 41:
      case 42:
      case 43:
      case 44:
      case 45:
      case 46:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 37:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          h_m_spritemulti[1] = ((h_m_reg[37]) & (15));
        }
        break;
      }
      case 38:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          h_m_spritemulti[3] = ((h_m_reg[38]) & (15));
        }
        break;
      }
      case 25:
      {
        method_clear_interrupt(runtime, ((data) & (15)));
        break;
      }
      case 26:
      {
        h_m_reg[offset] = data;
        method_set_interrupt(runtime, 0);
        break;
      }
      case 17:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          if (((data) & (8))) {
            members.m_dy_start = ((51) & 0xffff);
            members.m_dy_stop = ((251) & 0xffff);
          } else {
            members.m_dy_start = ((55) & 0xffff);
            members.m_dy_stop = ((247) & 0xffff);
          }
        }
        break;
      }
      case 18:
      {
        if (((Number(data) !== Number(h_m_reg[offset])) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 22:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 24:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          members.m_videoaddr = ((((((h_m_reg[24]) & (240))) << (6))) & 0xffff);
          members.m_chargenaddr = ((((((h_m_reg[24]) & (14))) << (10))) & 0xffff);
          members.m_bitmapaddr = ((((((data) & (8))) << (10))) & 0xffff);
        }
        break;
      }
      case 33:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          h_m_colors[0] = ((h_m_reg[33]) & (15));
        }
        break;
      }
      case 34:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          h_m_colors[1] = ((h_m_reg[34]) & (15));
        }
        break;
      }
      case 35:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          h_m_colors[2] = ((h_m_reg[35]) & (15));
        }
        break;
      }
      case 36:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
          h_m_colors[3] = ((h_m_reg[36]) & (15));
        }
        break;
      }
      case 32:
      {
        if (((Number(h_m_reg[offset]) !== Number(data)) ? 1 : 0)) {
          h_m_reg[offset] = data;
        }
        break;
      }
      case 47:
      {
        if (0) {
          h_m_reg[offset] = ((data) | (248));
          (__l["m_write_k"] ? __l["m_write_k"](Number(0), Number(((data) & (7)))) : typeof members.m_write_k === 'function' ? members.m_write_k(0, ((data) & (7))) : runtime.invoke("m_write_k", 0, ((data) & (7))));
        }
        break;
      }
      case 48:
      {
        if (0) {
          if (((Number((((h_m_reg[offset]) >>> (0)) & 1)) !== Number((((data) >>> (0)) & 1))) ? 1 : 0)) {
            (__l["m_cpu.set_unscaled_clock"] ? __l["m_cpu.set_unscaled_clock"]((((__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) << ((((data) >>> (0)) & 1)))) : ((members.m_cpu)?.set_unscaled_clock?.((((__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) << ((((data) >>> (0)) & 1)))) ?? 0));
          }
          h_m_reg[offset] = ((data) | (252));
          members.m_on = (((((((data) >>> (0)) & 1)) ? 0 : 1)) | 0);
        }
        break;
      }
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
      case 58:
      case 59:
      case 60:
      case 61:
      case 62:
      case 63:
      {
        h_m_reg[offset] = data;
        do {
          if (0) {
            if (Boolean("vic write")) {
              0;
            }
            0;
          }
        } while (0);
        break;
      }
      default:
      {
        h_m_reg[offset] = data;
        break;
      }
    }
  }

  function method_lp_w(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    if ((((((((members.m_lp ?? 0)) && (((state) ? 0 : 1))) ? 1 : 0)) && (((((h_m_reg[25]) & (8))) ? 0 : 1))) ? 1 : 0)) {
      h_m_reg[19] = runtime.shiftRight((members.m_raster_x ?? 0), 1);
      h_m_reg[20] = (members.m_rasterline ?? 0);
      method_set_interrupt(runtime, 8);
    }
    members.m_lp = ((state) | 0);
  }

  function method_set_cpu(runtime: any, tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cpu.set_tag"] ? __l["m_cpu.set_tag"](tag) : ((members.m_cpu)?.set_tag?.(tag) ?? 0));
  }

  function method_irq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_irq)).bind === 'function' ? (runtime.dereference(members.m_write_irq)).bind() : typeof (runtime.dereference(members.m_write_irq)).bind === 'number' || typeof (runtime.dereference(members.m_write_irq)).bind === 'boolean' ? (runtime.dereference(members.m_write_irq)).bind : runtime.container(members.m_write_irq, "bind"));
  }

  function method_ba_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_ba)).bind === 'function' ? (runtime.dereference(members.m_write_ba)).bind() : typeof (runtime.dereference(members.m_write_ba)).bind === 'number' || typeof (runtime.dereference(members.m_write_ba)).bind === 'boolean' ? (runtime.dereference(members.m_write_ba)).bind : runtime.container(members.m_write_ba, "bind"));
  }

  function method_aec_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_aec)).bind === 'function' ? (runtime.dereference(members.m_write_aec)).bind() : typeof (runtime.dereference(members.m_write_aec)).bind === 'number' || typeof (runtime.dereference(members.m_write_aec)).bind === 'boolean' ? (runtime.dereference(members.m_write_aec)).bind : runtime.container(members.m_write_aec, "bind"));
  }

  function method_k_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_k)).bind === 'function' ? (runtime.dereference(members.m_write_k)).bind() : typeof (runtime.dereference(members.m_write_k)).bind === 'number' || typeof (runtime.dereference(members.m_write_k)).bind === 'boolean' ? (runtime.dereference(members.m_write_k)).bind : runtime.container(members.m_write_k, "bind"));
  }

  function method_phi0_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_phi0 ?? 0);
  }

  function method_ba_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_ba ?? 0);
  }

  function method_aec_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_aec ?? 0);
  }

  function method_bus_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_last_data ?? 0)) & 0xff);
  }

  function method_mos6566_device__set_cpu(runtime: any, tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cpu.set_tag"] ? __l["m_cpu.set_tag"](tag) : ((members.m_cpu)?.set_tag?.(tag) ?? 0));
  }

  function method_mos6566_device__irq_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_irq)).bind === 'function' ? (runtime.dereference(members.m_write_irq)).bind() : typeof (runtime.dereference(members.m_write_irq)).bind === 'number' || typeof (runtime.dereference(members.m_write_irq)).bind === 'boolean' ? (runtime.dereference(members.m_write_irq)).bind : runtime.container(members.m_write_irq, "bind"));
  }

  function method_mos6566_device__ba_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_ba)).bind === 'function' ? (runtime.dereference(members.m_write_ba)).bind() : typeof (runtime.dereference(members.m_write_ba)).bind === 'number' || typeof (runtime.dereference(members.m_write_ba)).bind === 'boolean' ? (runtime.dereference(members.m_write_ba)).bind : runtime.container(members.m_write_ba, "bind"));
  }

  function method_mos6566_device__aec_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_aec)).bind === 'function' ? (runtime.dereference(members.m_write_aec)).bind() : typeof (runtime.dereference(members.m_write_aec)).bind === 'number' || typeof (runtime.dereference(members.m_write_aec)).bind === 'boolean' ? (runtime.dereference(members.m_write_aec)).bind : runtime.container(members.m_write_aec, "bind"));
  }

  function method_mos6566_device__k_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_write_k)).bind === 'function' ? (runtime.dereference(members.m_write_k)).bind() : typeof (runtime.dereference(members.m_write_k)).bind === 'number' || typeof (runtime.dereference(members.m_write_k)).bind === 'boolean' ? (runtime.dereference(members.m_write_k)).bind : runtime.container(members.m_write_k, "bind"));
  }

  function method_mos6566_device__phi0_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_phi0 ?? 0);
  }

  function method_mos6566_device__ba_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_ba ?? 0);
  }

  function method_mos6566_device__aec_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_aec ?? 0);
  }

  function method_mos6566_device__bus_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_last_data ?? 0)) & 0xff);
  }
  return {
    "set_interrupt": method_set_interrupt,
    "clear_interrupt": method_clear_interrupt,
    "read_videoram": method_read_videoram,
    "read_colorram": method_read_colorram,
    "idle_access": method_idle_access,
    "spr_ptr_access": method_spr_ptr_access,
    "spr_ba": method_spr_ba,
    "set_ba": method_set_ba,
    "spr_data_access": method_spr_data_access,
    "display_if_bad_line": method_display_if_bad_line,
    "set_aec": method_set_aec,
    "bad_line_ba": method_bad_line_ba,
    "refresh_access": method_refresh_access,
    "fetch_if_bad_line": method_fetch_if_bad_line,
    "rc_if_bad_line": method_rc_if_bad_line,
    "sample_border": method_sample_border,
    "check_sprite_dma": method_check_sprite_dma,
    "matrix_access": method_matrix_access,
    "graphics_access": method_graphics_access,
    "draw_background": method_draw_background,
    "draw_mono": method_draw_mono,
    "draw_multi": method_draw_multi,
    "device_reset": method_device_reset,
    "execute_run": method_execute_run,
    "draw_graphics": method_draw_graphics,
    "draw_sprites": method_draw_sprites,
    "screen_update": method_screen_update,
    "read": method_read,
    "write": method_write,
    "lp_w": method_lp_w,
    "set_cpu": method_set_cpu,
    "irq_callback": method_irq_callback,
    "ba_callback": method_ba_callback,
    "aec_callback": method_aec_callback,
    "k_callback": method_k_callback,
    "phi0_r": method_phi0_r,
    "ba_r": method_ba_r,
    "aec_r": method_aec_r,
    "bus_r": method_bus_r,
    "mos6566_device::set_cpu": method_mos6566_device__set_cpu,
    "mos6566_device::irq_callback": method_mos6566_device__irq_callback,
    "mos6566_device::ba_callback": method_mos6566_device__ba_callback,
    "mos6566_device::aec_callback": method_mos6566_device__aec_callback,
    "mos6566_device::k_callback": method_mos6566_device__k_callback,
    "mos6566_device::phi0_r": method_mos6566_device__phi0_r,
    "mos6566_device::ba_r": method_mos6566_device__ba_r,
    "mos6566_device::aec_r": method_mos6566_device__aec_r,
    "mos6566_device::bus_r": method_mos6566_device__bus_r
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["clock","copybitmap","m_cpu.cycles_to_attotime","m_cpu.set_tag","m_cpu.set_unscaled_clock","m_cpu.spin_until_time","m_cpu.total_cycles","m_write_aec","m_write_ba","m_write_irq","m_write_k","memcpy","space","total_cycles"];

export const device = definition;
export default device;
