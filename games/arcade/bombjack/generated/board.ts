// GENERATED executable machine composition from src/mame/tecmo/bombjack.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bombjack');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset)) !== Number(data)) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
      (__l["m_fg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
    }
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offset)) !== Number(data)) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
      (__l["m_fg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
    }
  }

  function method_spritectrl_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((((data) & (15))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_spritectrl"), offset, data);
  }

  function method_background_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    data = ((((data) & (31))) & 0xff);
    if (((Number((members.m_bg_image ?? runtime.member("m_bg_image"))) !== Number(data)) ? 1 : 0)) {
      members.m_bg_image = ((data) & 0xff);
      (__l["m_bg_tilemap.mark_all_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __l["mark_all_dirty"]))();
    }
  }

  function method_nmi_on_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    data = (((((data) >>> (0)) & 1)) & 0xff);
    if (((data) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
    }
    members.m_nmi_on = ((data) ? 1 : 0);
  }

  function method_flip_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_flip = (((((data) >>> (0)) & 1)) ? 1 : 0);
    (__l["m_bg_tilemap.set_flip"] ?? runtime.memberCall(members.m_bg_tilemap, "set_flip", 0, __l["set_flip"]))((((members.m_flip ?? runtime.member("m_flip"))) ? (3) : (0)));
    (__l["m_fg_tilemap.set_flip"] ?? runtime.memberCall(members.m_fg_tilemap, "set_flip", 0, __l["set_flip"]))((((members.m_flip ?? runtime.member("m_flip"))) ? (3) : (0)));
  }

  function method_watchdog_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_watchdog.watchdog_enable"] ?? runtime.memberCall(members.m_watchdog, "watchdog_enable", 0, undefined))((((data) >>> (0)) & 1));
  }

  function method_soundlatch_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let res: any = (((__l["m_soundlatch.read"] ?? runtime.memberCall(members.m_soundlatch, "read", 0, undefined))()) & 0xff);
    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (__l["m_soundlatch.clear_w"] ?? runtime.memberCall(members.m_soundlatch, "clear_w", 0, undefined))();
    }
    return res;
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bgmaps = members.m_bgmaps ?? runtime.member("m_bgmaps");
    tile_index = ((tile_index) | ((((((members.m_bg_image ?? runtime.member("m_bg_image"))) & (15))) << (9))));
    let attr: any = ((runtime.readIndex(h_m_bgmaps, ((tile_index) + (256)))) & 0xff);
    let code: any = ((runtime.readIndex(h_m_bgmaps, tile_index)) & 0xffff);
    let color: any = ((0) & 0xff);
    let flipx: any = ((0) ? 1 : 0);
    let flipy: any = ((0) ? 1 : 0);
    (runtime.overrides["set_bg_tile_info"] ? runtime.overrides["set_bg_tile_info"](attr, code, ({ generatedLValue: true, get: () => color, set: (value: any) => { color = ((value) & 0xff); } }), flipx, ({ generatedLValue: true, get: () => flipy, set: (value: any) => { flipy = ((value) ? 1 : 0); } })) : method_set_bg_tile_info(runtime, attr, code, ({ generatedLValue: true, get: () => color, set: (value: any) => { color = ((value) & 0xff); } }), flipx, ({ generatedLValue: true, get: () => flipy, set: (value: any) => { flipy = ((value) ? 1 : 0); } })));
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, code, color, ((((flipx) ? (1) : (0))) | (((flipy) ? (2) : (0)))));
  }

  function method_set_bg_tile_info(runtime: any, attr: any, code: any, color: any, flipx: any, flipy: any): any {
    const members = runtime.members;

    color.set(((((attr) & (15))) & 0xff));
    flipy.set((((((attr) >>> (7)) & 1)) ? 1 : 0));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & 0xff);
    let code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & 0xffff);
    let color: any = ((0) & 0xff);
    let flipx: any = ((0) ? 1 : 0);
    let flipy: any = ((0) ? 1 : 0);
    (runtime.overrides["set_fg_tile_info"] ? runtime.overrides["set_fg_tile_info"](attr, ({ generatedLValue: true, get: () => code, set: (value: any) => { code = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = ((value) & 0xff); } }), flipx, flipy) : method_set_fg_tile_info(runtime, attr, ({ generatedLValue: true, get: () => code, set: (value: any) => { code = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = ((value) & 0xff); } }), flipx, flipy));
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, ((((flipx) ? (1) : (0))) | (((flipy) ? (2) : (0)))));
  }

  function method_set_fg_tile_info(runtime: any, attr: any, code: any, color: any, flipx: any, flipy: any): any {
    const members = runtime.members;

    code.set(((((code.get()) | ((((((attr) >>> (4)) & 1)) << (8))))) & 0xffff));
    color.set((((((attr) >>> (0)) & ((1 << (4)) - 1))) & 0xff));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(0, cliprect);
    if (((((members.m_bg_image ?? runtime.member("m_bg_image"))) >>> (4)) & 1)) {
      (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    }
    (__l["m_fg_tilemap.draw"] ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let max: any = ((31) | 0);
    let fill: any = ((runtime.divide(384, 16)) | 0);
    for (let sprite: any = ((max) | 0); ((Number(sprite) > Number(((max) - (fill)))) ? 1 : 0); sprite = ((((sprite) - (1))) | 0)) {
      let offs: any = ((((sprite) * (4))) | 0);
      let code: any = ((runtime.readIndex(h_m_spriteram, offs)) | 0);
      let attr: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
      let color: any = ((((attr) & (15))) | 0);
      let flipx: any = (((((attr) >>> (6)) & 1)) ? 1 : 0);
      let flipy: any = (((((attr) >>> (7)) & 1)) ? 1 : 0);
      let ypos: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
      let xpos: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
      let large: any = (((runtime.overrides["large_sprite"] ? runtime.overrides["large_sprite"](runtime.shiftRight(sprite, 1), attr) : method_large_sprite(runtime, runtime.shiftRight(sprite, 1), attr))) ? 1 : 0);
      if (large) {
        if ((((sprite) >>> (0)) & 1)) {
          continue;
        } else {
          code = ((((code) | (64))) | 0);
        }
      }
      let vpos: any = ((((large) ? (224) : (240))) | 0);
      ypos = ((((((vpos) + (1))) - (ypos))) | 0);
      if ((members.m_flip ?? runtime.member("m_flip"))) {
        xpos = ((((vpos) - (xpos))) | 0);
        ypos = ((((vpos) - (ypos))) | 0);
        flipx = ((((flipx) ? 0 : 1)) ? 1 : 0);
        flipy = ((((flipy) ? 0 : 1)) ? 1 : 0);
      }
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((large) ? (3) : (2))))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, xpos, ypos, 0) ?? 0);
    }
  }

  function method_large_sprite(runtime: any, index: any, attr: any): any {
    const members = runtime.members;

    let rev: any = ((((((Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), 0)) > Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), 1))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    return (((((Number(index) > Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), rev))) ? 1 : 0)) && (((Number(index) <= Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), ((rev) ^ (1))))) ? 1 : 0))) ? 1 : 0);
  }

  function method_vblank_nmi(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_nmi_on ?? runtime.member("m_nmi_on")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
    }
  }
  return {
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "spritectrl_w": method_spritectrl_w,
    "background_w": method_background_w,
    "nmi_on_w": method_nmi_on_w,
    "flip_w": method_flip_w,
    "watchdog_w": method_watchdog_w,
    "soundlatch_r": method_soundlatch_r,
    "get_bg_tile_info": method_get_bg_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "large_sprite": method_large_sprite,
    "vblank_nmi": method_vblank_nmi
  };
})();
    return {
      "bombjack_state.videoram_w": methods["videoram_w"],
      "bombjack_state.colorram_w": methods["colorram_w"],
      "bombjack_state.spritectrl_w": methods["spritectrl_w"],
      "bombjack_state.background_w": methods["background_w"],
      "bombjack_state.nmi_on_w": methods["nmi_on_w"],
      "bombjack_state.flip_w": methods["flip_w"],
      "bombjack_state.watchdog_w": methods["watchdog_w"],
      "bombjack_state.soundlatch_r": methods["soundlatch_r"],
      "bombjack_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "bombjack_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "bombjack_state.screen_update": methods["screen_update"],
      "bombjack_state.draw_sprites": methods["draw_sprites"],
      "bombjack_state.large_sprite": methods["large_sprite"],
      "bombjack_state.vblank_nmi": methods["vblank_nmi"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","m_bg_tilemap.draw","m_bg_tilemap.mark_all_dirty","m_bg_tilemap.set_flip","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_flip","m_gfxdecode.gfx","m_maincpu.set_input_line","m_soundlatch.clear_w","m_soundlatch.read","m_watchdog.watchdog_enable","machine","machine().side_effects_disabled","mark_all_dirty","mark_tile_dirty","set","set_flip","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
