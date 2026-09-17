// GENERATED executable machine composition from src/mame/capcom/gunsmoke.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gunsmoke');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  const __mame_table_0 = [255, 0, 0];
  function method_protection_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return (__mame_table_0[(((offset) % 3) + 3) % 3] ?? 0);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_layer_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_sprite3bank = ((((data) & (7))) & 0xff);
    members.m_bgon = ((((data) & (16))) & 0xff);
    members.m_objon = ((((data) & (32))) & 0xff);
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
    let code: any = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((attr) & (224))) << (2)))) | 0);
    let color: any = ((((attr) & (31))) | 0);
    tileinfo.group = color;
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (__l["set"]?.(0, code, color, 0) ?? 0));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_scrollx = members.m_scrollx ?? runtime.member("m_scrollx");
    const h_m_scrolly = members.m_scrolly ?? runtime.member("m_scrolly");
    (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1))))) ?? 0) : (__l["set_scrollx"]?.(0, runtime.add(runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1))))) ?? 0));
    (__l["m_bg_tilemap.set_scrolly"] ? __l["m_bg_tilemap.set_scrolly"](0, runtime.readIndex(h_m_scrolly, 0)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, runtime.readIndex(h_m_scrolly, 0)) ?? 0) : (__l["set_scrolly"]?.(0, runtime.readIndex(h_m_scrolly, 0)) ?? 0));
    if ((members.m_bgon ?? runtime.member("m_bgon"))) {
      (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    } else {
      (__l["bitmap.fill"] ? __l["bitmap.fill"]((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0) : (__l["fill"]?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0));
    }
    if ((members.m_objon ?? runtime.member("m_objon"))) {
      (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    }
    if ((members.m_chon ?? runtime.member("m_chon"))) {
      (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    }
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram: any = (__l["m_spriteram.buffer"] ? __l["m_spriteram.buffer"]() : (members.m_spriteram) != null ? (typeof (runtime.dereference(members.m_spriteram)).buffer === 'function' ? (runtime.dereference(members.m_spriteram)).buffer() : typeof (runtime.dereference(members.m_spriteram)).buffer === 'number' || typeof (runtime.dereference(members.m_spriteram)).buffer === 'boolean' ? (runtime.dereference(members.m_spriteram)).buffer : runtime.container(members.m_spriteram, "buffer")) : 0);
    for (let offs: any = (((((members.m_spriteram).length) - (32))) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (32))) | 0)) {
      let attr: any = ((runtime.readIndex(spriteram, ((offs) + (1)))) | 0);
      let bank: any = ((((((attr) & (192))) >>> (6))) | 0);
      let code: any = ((runtime.readIndex(spriteram, offs)) | 0);
      let color: any = ((((attr) & (15))) | 0);
      let flipx: any = ((0) | 0);
      let flipy: any = ((((attr) & (16))) | 0);
      let sx: any = ((((runtime.readIndex(spriteram, ((offs) + (3)))) - (((((attr) & (32))) << (3))))) | 0);
      let sy: any = ((runtime.readIndex(spriteram, ((offs) + (2)))) | 0);
      if (((Number(bank) === Number(3)) ? 1 : 0)) {
        bank = ((((bank) + ((members.m_sprite3bank ?? runtime.member("m_sprite3bank"))))) | 0);
      }
      code = ((((code) + (((256) * (bank))))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        sx = ((((240) - (sx))) | 0);
        sy = ((((240) - (sy))) | 0);
        flipx = ((((flipx) ? 0 : 1)) | 0);
        flipy = ((((flipy) ? 0 : 1)) | 0);
      }
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : 0))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) ?? 0);
    }
  }
  return {
    "protection_r": method_protection_r,
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "layer_w": method_layer_w,
    "get_fg_tile_info": method_get_fg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "gunsmoke_state.protection_r": methods["protection_r"],
      "gunsmoke_state.videoram_w": methods["videoram_w"],
      "gunsmoke_state.colorram_w": methods["colorram_w"],
      "gunsmoke_state.layer_w": methods["layer_w"],
      "gunsmoke_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "gunsmoke_state.screen_update": methods["screen_update"],
      "gunsmoke_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","flip_screen","m_bg_tilemap.draw","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_palette.black_pen","m_spriteram.buffer","mark_tile_dirty","set","set_scrollx","set_scrolly","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
