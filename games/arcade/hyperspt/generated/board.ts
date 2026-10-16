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
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_hyperspt_sound_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_vlm.st_w"] ? __l["m_vlm.st_w"]((((offset) >>> (4)) & 1)) : (members.m_vlm) != null ? ((runtime.dereference(members.m_vlm)).st_w?.((((offset) >>> (4)) & 1)) ?? 0) : 0);
    (__l["m_vlm.rst_w"] ? __l["m_vlm.rst_w"]((((offset) >>> (5)) & 1)) : (members.m_vlm) != null ? ((runtime.dereference(members.m_vlm)).rst_w?.((((offset) >>> (5)) & 1)) ?? 0) : 0);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((runtime.add(runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (128))) << (1))), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (64))) << (3)))) | 0);
    let color: any = ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15))) | 0);
    let flags: any = ((((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (16))) ? (1) : (0))) | (((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (32))) ? (2) : (0))))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](1, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, flags) ?? 0) : (__l["set"]?.(1, code, color, flags) ?? 0));
  }

  function method_irq_mask_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_irq_mask = ((state) & 0xff);
    if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
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
      (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](row, scrollx) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(row, scrollx) ?? 0) : (__l["set_scrollx"]?.(row, scrollx) ?? 0));
    }
    (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    for (let offs: any = (((((members.m_spriteram).length) - (4))) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
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
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) ?? 0) : 0)) ?? 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) ?? 0) : 0)) ?? 0);
    }
  }

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
    }
  }
  return {
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "hyperspt_sound_w": method_hyperspt_sound_w,
    "get_bg_tile_info": method_get_bg_tile_info,
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
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_konami_sn76489a_latch_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_sn76489a_latch = ((data) & 0xff);
  }

  function method_konami_sn76489a_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_sn.write"] ? __l["m_sn.write"]((members.m_sn76489a_latch ?? runtime.member("m_sn76489a_latch"))) : (members.m_sn) != null ? ((runtime.dereference(members.m_sn)).write?.((members.m_sn76489a_latch ?? runtime.member("m_sn76489a_latch"))) ?? 0) : 0);
  }

  function method_hyperspt_sound_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_vlm.st_w"] ? __l["m_vlm.st_w"]((((offset) >>> (4)) & 1)) : (members.m_vlm) != null ? ((runtime.dereference(members.m_vlm)).st_w?.((((offset) >>> (4)) & 1)) ?? 0) : 0);
    (__l["m_vlm.rst_w"] ? __l["m_vlm.rst_w"]((((offset) >>> (5)) & 1)) : (members.m_vlm) != null ? ((runtime.dereference(members.m_vlm)).rst_w?.((((offset) >>> (5)) & 1)) ?? 0) : 0);
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
      (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](row, scrollx) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(row, scrollx) ?? 0) : (__l["set_scrollx"]?.(row, scrollx) ?? 0));
    }
    (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    for (let offs: any = (((((members.m_spriteram).length) - (4))) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
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
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) ?? 0) : 0)) ?? 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) ?? 0) : 0)) ?? 0);
    }
  }
  return {
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "konami_sn76489a_latch_w": method_konami_sn76489a_latch_w,
    "konami_sn76489a_w": method_konami_sn76489a_w,
    "hyperspt_sound_w": method_hyperspt_sound_w,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "hyperspt_state.konami_sn76489a_latch_w": methods["konami_sn76489a_latch_w"],
      "hyperspt_state.konami_sn76489a_w": methods["konami_sn76489a_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw","flip_screen","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.transpen_mask","m_sn.write","m_vlm.rst_w","m_vlm.st_w","mark_tile_dirty","set","set_scrollx","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
