// GENERATED executable machine composition from src/mame/konami/hyperspt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'hyperspt');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_hyperspt_sh_timer_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_vlm = members.m_vlm ?? runtime.member("m_vlm");
    let clock: any = ((runtime.divide((__l["m_audiocpu.total_cycles"] ?? runtime.memberCall(members.m_audiocpu, "total_cycles", 0, undefined))(), 1024)) >>> 0);
    if (((h_m_vlm) ? 1 : 0)) {
      return ((((clock) & (3))) | ((((__l["m_vlm.bsy_r"] ?? runtime.memberCall(members.m_vlm, "bsy_r", 0, undefined))()) ? (4) : (0))));
    } else {
      return ((clock) & (3));
    }
  }

  function method_hyperspt_sound_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_vlm.st_w"] ?? runtime.memberCall(members.m_vlm, "st_w", 0, undefined))((((offset) >>> (4)) & 1));
    (__l["m_vlm.rst_w"] ?? runtime.memberCall(members.m_vlm, "rst_w", 0, undefined))((((offset) >>> (5)) & 1));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((runtime.add(runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (128))) << (1))), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (64))) << (3)))) | 0);
    let color: any = ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15))) | 0);
    let flags: any = ((((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (16))) ? (1) : (0))) | (((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (32))) ? (2) : (0))))) | 0);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, code, color, flags);
  }

  function method_sh_irqtrigger_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((((members.m_last_irq ?? runtime.member("m_last_irq"))) ? 0 : 1)) && (state)) ? 1 : 0)) {
      (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 2);
    }
    members.m_last_irq = state;
  }

  function method_irq_mask_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_irq_mask = ((state) & 0xff);
    if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
    for (let row: any = ((0) | 0); ((Number(row) < Number(32)) ? 1 : 0); row = ((((row) + (1))) | 0)) {
      let scrollx: any = ((runtime.add(runtime.readIndex(h_m_scroll, ((row) * (2))), ((((runtime.readIndex(h_m_scroll, runtime.add(((row) * (2)), 1))) & (1))) * (256)))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        scrollx = (((-scrollx)) | 0);
      }
      (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(row, scrollx);
    }
    (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    for (let offs: any = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      let sx: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
      let sy: any = ((((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (1)))))) | 0);
      let code: any = ((runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((8) * (((runtime.readIndex(h_m_spriteram, offs)) & (32)))))) | 0);
      let color: any = ((((runtime.readIndex(h_m_spriteram, offs)) & (15))) | 0);
      let flipx: any = (((((~runtime.readIndex(h_m_spriteram, offs))) & (64))) | 0);
      let flipy: any = ((((runtime.readIndex(h_m_spriteram, offs)) & (128))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        sy = ((((240) - (sy))) | 0);
        flipy = ((((flipy) ? 0 : 1)) | 0);
      }
      sy = ((((sy) + (1))) | 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["m_palette.transpen_mask"] ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0)), color, 0)) ?? 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, (__l["m_palette.transpen_mask"] ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0)), color, 0)) ?? 0);
    }
  }

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
  }
  return {
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "hyperspt_sh_timer_r": method_hyperspt_sh_timer_r,
    "hyperspt_sound_w": method_hyperspt_sound_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "sh_irqtrigger_w": method_sh_irqtrigger_w,
    "irq_mask_w": method_irq_mask_w,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "vblank_irq": method_vblank_irq
  };
})();
    return {
      "base_state.videoram_w": methods["videoram_w"],
      "base_state.colorram_w": methods["colorram_w"],
      "base_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "base_state.irq_mask_w": methods["irq_mask_w"],
      "base_state.screen_update": methods["screen_update"],
      "base_state.draw_sprites": methods["draw_sprites"],
      "base_state.vblank_irq": methods["vblank_irq"],
    };
  })(),
  ...(() => {
    const methods = (() => {


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_hyperspt_sh_timer_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_vlm = members.m_vlm ?? runtime.member("m_vlm");
    let clock: any = ((runtime.divide((__l["m_audiocpu.total_cycles"] ?? runtime.memberCall(members.m_audiocpu, "total_cycles", 0, undefined))(), 1024)) >>> 0);
    if (((h_m_vlm) ? 1 : 0)) {
      return ((((clock) & (3))) | ((((__l["m_vlm.bsy_r"] ?? runtime.memberCall(members.m_vlm, "bsy_r", 0, undefined))()) ? (4) : (0))));
    } else {
      return ((clock) & (3));
    }
  }

  function method_konami_sn76489a_latch_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_sn76489a_latch = ((data) & 0xff);
  }

  function method_konami_sn76489a_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_sn.write"] ?? runtime.memberCall(members.m_sn, "write", 0, undefined))((members.m_sn76489a_latch ?? runtime.member("m_sn76489a_latch")));
  }

  function method_hyperspt_sound_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_vlm.st_w"] ?? runtime.memberCall(members.m_vlm, "st_w", 0, undefined))((((offset) >>> (4)) & 1));
    (__l["m_vlm.rst_w"] ?? runtime.memberCall(members.m_vlm, "rst_w", 0, undefined))((((offset) >>> (5)) & 1));
  }

  function method_sh_irqtrigger_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((((members.m_last_irq ?? runtime.member("m_last_irq"))) ? 0 : 1)) && (state)) ? 1 : 0)) {
      (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 2);
    }
    members.m_last_irq = state;
  }

  function method_irq_mask_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_irq_mask = ((state) & 0xff);
    if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
    for (let row: any = ((0) | 0); ((Number(row) < Number(32)) ? 1 : 0); row = ((((row) + (1))) | 0)) {
      let scrollx: any = ((runtime.add(runtime.readIndex(h_m_scroll, ((row) * (2))), ((((runtime.readIndex(h_m_scroll, runtime.add(((row) * (2)), 1))) & (1))) * (256)))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        scrollx = (((-scrollx)) | 0);
      }
      (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(row, scrollx);
    }
    (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    for (let offs: any = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      let sx: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
      let sy: any = ((((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (1)))))) | 0);
      let code: any = ((runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((8) * (((runtime.readIndex(h_m_spriteram, offs)) & (32)))))) | 0);
      let color: any = ((((runtime.readIndex(h_m_spriteram, offs)) & (15))) | 0);
      let flipx: any = (((((~runtime.readIndex(h_m_spriteram, offs))) & (64))) | 0);
      let flipy: any = ((((runtime.readIndex(h_m_spriteram, offs)) & (128))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        sy = ((((240) - (sy))) | 0);
        flipy = ((((flipy) ? 0 : 1)) | 0);
      }
      sy = ((((sy) + (1))) | 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["m_palette.transpen_mask"] ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0)), color, 0)) ?? 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, (__l["m_palette.transpen_mask"] ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0)), color, 0)) ?? 0);
    }
  }

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
  }
  return {
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "hyperspt_sh_timer_r": method_hyperspt_sh_timer_r,
    "konami_sn76489a_latch_w": method_konami_sn76489a_latch_w,
    "konami_sn76489a_w": method_konami_sn76489a_w,
    "hyperspt_sound_w": method_hyperspt_sound_w,
    "sh_irqtrigger_w": method_sh_irqtrigger_w,
    "irq_mask_w": method_irq_mask_w,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "vblank_irq": method_vblank_irq
  };
})();
    return {
      "hyperspt_state.konami_sn76489a_latch_w": methods["konami_sn76489a_latch_w"],
      "hyperspt_state.konami_sn76489a_w": methods["konami_sn76489a_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw","flip_screen","m_audiocpu.set_input_line","m_audiocpu.total_cycles","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.transpen_mask","m_sn.write","m_vlm.bsy_r","m_vlm.rst_w","m_vlm.st_w","mark_tile_dirty","set","set_scrollx","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
