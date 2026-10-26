// GENERATED executable machine composition from src/mame/bally/mcr3.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'spyhunt');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_stat_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_status ?? runtime.member("m_status"));
  }

  function method_sirq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_pia_sync_timer.adjust"] ?? runtime.memberCall(members.m_pia_sync_timer, "adjust", 0, __l["adjust"]))(0, ((state) ? 0 : 1));
  }

  function method_mcr_paletteram9_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
  }

  function method_mcr_set_color(runtime: any, index: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
  }

  function method_mcr3_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
  }

  function method_spyhunt_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_spyhunt_alpharam_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_spyhunt_alpharam"), offset, data);
    (__l["m_alpha_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_alpha_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_spyhunt_scroll_value_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    switch ((offset as number)) {
      case 0:
      {
        members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (-256))) | (data))) << 16 >> 16);
        break;
      }
      case 1:
      {
        members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (255))) | (((((data) & (7))) << (8))))) << 16 >> 16);
        members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (255))) | (((((data) & (128))) << (1))))) << 16 >> 16);
        break;
      }
      case 2:
      {
        members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (-256))) | (data))) << 16 >> 16);
        break;
      }
    }
  }

  function method_data_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_mcr_interrupt(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let scanline: any = ((param) | 0);
    if ((((((Number(scanline) === Number(0)) ? 1 : 0)) || (((Number(scanline) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
      (__l["m_ctc.trg2"] ?? runtime.memberCall(members.m_ctc, "trg2", 0, undefined))(1);
      (__l["m_ctc.trg2"] ?? runtime.memberCall(members.m_ctc, "trg2", 0, undefined))(0);
    }
    if (((Number(scanline) === Number(0)) ? 1 : 0)) {
      (__l["m_ctc.trg3"] ?? runtime.memberCall(members.m_ctc, "trg3", 0, undefined))(1);
      (__l["m_ctc.trg3"] ?? runtime.memberCall(members.m_ctc, "trg3", 0, undefined))(0);
    }
  }

  function method_spyhunt_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
    let code: any = ((((((data) & (63))) | (((runtime.shiftRight(data, 1)) & (64))))) | 0);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, 0, ((((data) & (64))) ? (2) : (0)));
  }

  function method_spyhunt_bg_scan(runtime: any, col: any, row: any, num_cols: any, num_rows: any): any {
    const members = runtime.members;

    return ((((((row) & (15))) | (((((col) & (63))) << (4))))) | (((((row) & (16))) << (6))));
  }

  function method_spyhunt_get_alpha_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(2, runtime.readIndex((members.m_spyhunt_alpharam ?? runtime.member("m_spyhunt_alpharam")), tile_index), 0, 0);
  }

  function method_screen_update_spyhunt(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spyhunt_scroll_offset = members.m_spyhunt_scroll_offset ?? runtime.member("m_spyhunt_scroll_offset");
    const h_m_spyhunt_sprite_color_mask = members.m_spyhunt_sprite_color_mask ?? runtime.member("m_spyhunt_sprite_color_mask");
    (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(0, runtime.add((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) * (2)), h_m_spyhunt_scroll_offset));
    (__l["m_bg_tilemap.set_scrolly"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __l["set_scrolly"]))(0, (((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) * (2)));
    (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["mcr3_update_sprites"] ? runtime.overrides["mcr3_update_sprites"](screen, bitmap, cliprect, h_m_spyhunt_sprite_color_mask, 0, -12, 0, 1) : method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, h_m_spyhunt_sprite_color_mask, 0, -12, 0, 1));
    (__l["m_alpha_tilemap.draw"] ?? runtime.memberCall(members.m_alpha_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    return 0;
  }

  function method_mcr3_update_sprites(runtime: any, screen: any, bitmap: any, cliprect: any, color_mask: any, code_xor: any, dx: any, dy: any, interlaced: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    ((runtime.dereference((__l["m_screen.priority"] ?? runtime.memberCall(members.m_screen, "priority", 0, undefined))())).fill?.(1, cliprect) ?? 0);
    for (let offs: any = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      if (((Number(runtime.readIndex(h_m_spriteram, offs)) === Number(0)) ? 1 : 0)) {
        continue;
      }
      let flags: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
      let code: any = ((runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((256) * (((runtime.shiftRight(flags, 3)) & (1)))))) | 0);
      let color: any = (((((~flags)) & (color_mask))) | 0);
      let flipx: any = ((((flags) & (16))) | 0);
      let flipy: any = ((((flags) & (32))) | 0);
      let sx: any = ((((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) - (3))) * (2))) | 0);
      let sy: any = ((((241) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
      if (((Number(interlaced) === Number(1)) ? 1 : 0)) {
        sy = ((((sy) * (2))) | 0);
      }
      code = ((((code) ^ (code_xor))) | 0);
      sx = ((((sx) + (dx))) | 0);
      sy = ((((sy) + (dy))) | 0);
      if ((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? 0 : 1)) {
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).prio_transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))(), 0, 257) ?? 0);
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).prio_transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))(), 2, 65279) ?? 0);
      } else {
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).prio_transmask?.(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))(), 0, 257) ?? 0);
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).prio_transmask?.(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))(), 2, 65279) ?? 0);
      }
    }
  }

  function method_spyhunt_ip2_r(runtime: any): any {
    const members = runtime.members;

    const h_m_analog_inputs = members.m_analog_inputs ?? runtime.member("m_analog_inputs");
    return ((runtime.dereference(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))))).read?.() ?? runtime.container(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))), "read"));
  }

  function method_irq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let combined_state: any = (((((__l["m_pia.irq_a_state"] ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__l["m_pia.irq_b_state"] ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
    (__l["m_cpu.set_input_line"] ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
  }
  return {
    "stat_r": method_stat_r,
    "sirq_w": method_sirq_w,
    "mcr_paletteram9_w": method_mcr_paletteram9_w,
    "mcr_set_color": method_mcr_set_color,
    "mcr3_videoram_w": method_mcr3_videoram_w,
    "spyhunt_videoram_w": method_spyhunt_videoram_w,
    "spyhunt_alpharam_w": method_spyhunt_alpharam_w,
    "spyhunt_scroll_value_w": method_spyhunt_scroll_value_w,
    "data_r": method_data_r,
    "mcr_interrupt": method_mcr_interrupt,
    "spyhunt_get_bg_tile_info": method_spyhunt_get_bg_tile_info,
    "spyhunt_bg_scan": method_spyhunt_bg_scan,
    "spyhunt_get_alpha_tile_info": method_spyhunt_get_alpha_tile_info,
    "screen_update_spyhunt": method_screen_update_spyhunt,
    "mcr3_update_sprites": method_mcr3_update_sprites,
    "spyhunt_ip2_r": method_spyhunt_ip2_r,
    "irq_w": method_irq_w
  };
})();
    return {
      "mcr3_state.mcr_paletteram9_w": methods["mcr_paletteram9_w"],
      "mcr3_state.mcr3_videoram_w": methods["mcr3_videoram_w"],
      "mcr3_state.spyhunt_videoram_w": methods["spyhunt_videoram_w"],
      "mcr3_state.spyhunt_alpharam_w": methods["spyhunt_alpharam_w"],
      "mcr3_state.spyhunt_scroll_value_w": methods["spyhunt_scroll_value_w"],
      "mcr3_state.mcr_interrupt": methods["mcr_interrupt"],
      "mcr3_state.spyhunt_get_bg_tile_info": methods["spyhunt_get_bg_tile_info"],
      "mcr3_state.spyhunt_bg_scan": methods["spyhunt_bg_scan"],
      "mcr3_state.spyhunt_get_alpha_tile_info": methods["spyhunt_get_alpha_tile_info"],
      "mcr3_state.screen_update_spyhunt": methods["screen_update_spyhunt"],
      "mcr3_state.mcr3_update_sprites": methods["mcr3_update_sprites"],
    };
  })(),
  ...(() => {
    const methods = (() => {


  function method_stat_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_status ?? runtime.member("m_status"));
  }

  function method_spyhunt_op4_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_input_mux = (((((data) >>> (7)) & 1)) & 0xff);
    (__l["m_adc.rd_w"] ?? runtime.memberCall(members.m_adc, "rd_w", 0, undefined))((((data) >>> (6)) & 1));
    (__l["m_adc.wr_w"] ?? runtime.memberCall(members.m_adc, "wr_w", 0, undefined))((((data) >>> (6)) & 1));
    if (((((((((members.m_last_op4 ?? runtime.member("m_last_op4"))) ^ (data))) & (32))) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) {
      (__l["m_lamplatch.write_bit"] ?? runtime.memberCall(members.m_lamplatch, "write_bit", 0, undefined))(((data) & (7)), (((data) >>> (3)) & 1));
    }
    members.m_last_op4 = ((data) & 0xff);
    (__l["m_cheap_squeak_deluxe.sr_w"] ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "sr_w", 0, undefined))(((data) & (15)));
    (__l["m_cheap_squeak_deluxe.sirq_w"] ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "sirq_w", 0, undefined))((((data) >>> (4)) & 1));
  }

  function method_sirq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_pia_sync_timer.adjust"] ?? runtime.memberCall(members.m_pia_sync_timer, "adjust", 0, __l["adjust"]))(0, ((state) ? 0 : 1));
  }

  function method_mcr_paletteram9_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
  }

  function method_mcr_set_color(runtime: any, index: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
  }

  function method_mcr3_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
  }

  function method_spyhunt_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_spyhunt_alpharam_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_spyhunt_alpharam"), offset, data);
    (__l["m_alpha_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_alpha_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_spyhunt_scroll_value_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    switch ((offset as number)) {
      case 0:
      {
        members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (-256))) | (data))) << 16 >> 16);
        break;
      }
      case 1:
      {
        members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (255))) | (((((data) & (7))) << (8))))) << 16 >> 16);
        members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (255))) | (((((data) & (128))) << (1))))) << 16 >> 16);
        break;
      }
      case 2:
      {
        members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (-256))) | (data))) << 16 >> 16);
        break;
      }
    }
  }

  function method_data_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_spyhunt_ip2_r(runtime: any): any {
    const members = runtime.members;

    const h_m_analog_inputs = members.m_analog_inputs ?? runtime.member("m_analog_inputs");
    return ((runtime.dereference(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))))).read?.() ?? runtime.container(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))), "read"));
  }

  function method_irq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let combined_state: any = (((((__l["m_pia.irq_a_state"] ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__l["m_pia.irq_b_state"] ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
    (__l["m_cpu.set_input_line"] ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
  }
  return {
    "stat_r": method_stat_r,
    "spyhunt_op4_w": method_spyhunt_op4_w,
    "sirq_w": method_sirq_w,
    "mcr_paletteram9_w": method_mcr_paletteram9_w,
    "mcr_set_color": method_mcr_set_color,
    "mcr3_videoram_w": method_mcr3_videoram_w,
    "spyhunt_videoram_w": method_spyhunt_videoram_w,
    "spyhunt_alpharam_w": method_spyhunt_alpharam_w,
    "spyhunt_scroll_value_w": method_spyhunt_scroll_value_w,
    "data_r": method_data_r,
    "spyhunt_ip2_r": method_spyhunt_ip2_r,
    "irq_w": method_irq_w
  };
})();
    return {
      "mcrsc_csd_state.spyhunt_op4_w": methods["spyhunt_op4_w"],
      "mcrsc_csd_state.spyhunt_ip2_r": methods["spyhunt_ip2_r"],
    };
  })(),
  ...(() => {
    const methods = (() => {


  function method_stat_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_status ?? runtime.member("m_status"));
  }

  function method_sirq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_pia_sync_timer.adjust"] ?? runtime.memberCall(members.m_pia_sync_timer, "adjust", 0, __l["adjust"]))(0, ((state) ? 0 : 1));
  }

  function method_mcr_paletteram9_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
  }

  function method_mcr_set_color(runtime: any, index: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__l["pal3bit"] ? __l["pal3bit"](runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
  }

  function method_mcr3_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
  }

  function method_spyhunt_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_spyhunt_alpharam_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_spyhunt_alpharam"), offset, data);
    (__l["m_alpha_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_alpha_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_spyhunt_scroll_value_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    switch ((offset as number)) {
      case 0:
      {
        members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (-256))) | (data))) << 16 >> 16);
        break;
      }
      case 1:
      {
        members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (255))) | (((((data) & (7))) << (8))))) << 16 >> 16);
        members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (255))) | (((((data) & (128))) << (1))))) << 16 >> 16);
        break;
      }
      case 2:
      {
        members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (-256))) | (data))) << 16 >> 16);
        break;
      }
    }
  }

  function method_data_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_spyhunt_ip2_r(runtime: any): any {
    const members = runtime.members;

    const h_m_analog_inputs = members.m_analog_inputs ?? runtime.member("m_analog_inputs");
    return ((runtime.dereference(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))))).read?.() ?? runtime.container(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))), "read"));
  }

  function method_irq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let combined_state: any = (((((__l["m_pia.irq_a_state"] ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__l["m_pia.irq_b_state"] ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
    (__l["m_cpu.set_input_line"] ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
  }
  return {
    "stat_r": method_stat_r,
    "sirq_w": method_sirq_w,
    "mcr_paletteram9_w": method_mcr_paletteram9_w,
    "mcr_set_color": method_mcr_set_color,
    "mcr3_videoram_w": method_mcr3_videoram_w,
    "spyhunt_videoram_w": method_spyhunt_videoram_w,
    "spyhunt_alpharam_w": method_spyhunt_alpharam_w,
    "spyhunt_scroll_value_w": method_spyhunt_scroll_value_w,
    "data_r": method_data_r,
    "spyhunt_ip2_r": method_spyhunt_ip2_r,
    "irq_w": method_irq_w
  };
})();
    return {
      "mcr_state.mcr_set_color": methods["mcr_set_color"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust","draw","m_adc.rd_w","m_adc.wr_w","m_alpha_tilemap.draw","m_alpha_tilemap.mark_tile_dirty","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_cheap_squeak_deluxe.sirq_w","m_cheap_squeak_deluxe.sr_w","m_cpu.set_input_line","m_ctc.trg2","m_ctc.trg3","m_gfxdecode.gfx","m_lamplatch.write_bit","m_palette.set_pen_color","m_pia.irq_a_state","m_pia.irq_b_state","m_pia_sync_timer.adjust","m_screen.priority","mark_tile_dirty","pal3bit","priority","screen.priority","set","set_scrollx","set_scrolly","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
