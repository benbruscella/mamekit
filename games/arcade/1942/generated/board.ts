// GENERATED executable machine composition from src/mame/capcom/1942.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, '1942');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_scroll_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_scroll"), offset, data);
    (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, ((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0)) | (((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1)) << (8))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, ((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0)) | (((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1)) << (8))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, ((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0)) | (((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1)) << (8))))) ?? 0));
  }

  function method_palette_bank_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(data)) ? 1 : 0)) {
      members.m_palette_bank = ((((data) & (3))) | 0);
      (runtime.calls["m_bg_tilemap.mark_all_dirty"] ? runtime.calls["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
    }
  }

  function method_fgvideoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_fg_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
  }

  function method_bgvideoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_bg_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](((((offset) & (15))) | (((((offset) >>> (1))) & (496))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((((offset) & (15))) | (((((offset) >>> (1))) & (496))))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((((offset) & (15))) | (((((offset) >>> (1))) & (496))))) ?? 0));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = runtime.readIndex((members.m_fg_videoram ?? runtime.member("m_fg_videoram")), tile_index);
    let color: any = runtime.readIndex((members.m_fg_videoram ?? runtime.member("m_fg_videoram")), ((tile_index) + (1024)));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, ((code) + (((((color) & (128))) << (1)))), ((color) & (63)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((code) + (((((color) & (128))) << (1)))), ((color) & (63)), 0) ?? 0) : (runtime.calls["set"]?.(0, ((code) + (((((color) & (128))) << (1)))), ((color) & (63)), 0) ?? 0));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    tile_index = ((((tile_index) & (15))) | (((((tile_index) & (496))) << (1))));
    let code: any = runtime.readIndex((members.m_bg_videoram ?? runtime.member("m_bg_videoram")), tile_index);
    let color: any = runtime.readIndex((members.m_bg_videoram ?? runtime.member("m_bg_videoram")), ((tile_index) + (16)));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, ((code) + (((((color) & (128))) << (1)))), runtime.add(((color) & (31)), ((32) * ((members.m_palette_bank ?? runtime.member("m_palette_bank"))))), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((color) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((color) & (96))) >>> (5))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, ((code) + (((((color) & (128))) << (1)))), runtime.add(((color) & (31)), ((32) * ((members.m_palette_bank ?? runtime.member("m_palette_bank"))))), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((color) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((color) & (96))) >>> (5))))) ?? 0) : (runtime.calls["set"]?.(1, ((code) + (((((color) & (128))) << (1)))), runtime.add(((color) & (31)), ((32) * ((members.m_palette_bank ?? runtime.member("m_palette_bank"))))), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((color) & (96))) >>> (5))) : runtime.macro("TILE_FLIPYX", ((((color) & (96))) >>> (5))))) ?? 0));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
      let cliprecty: any = Object.assign(Object.create(Object.getPrototypeOf((runtime.calls["rectangle"] ? runtime.calls["rectangle"](cliprect.min_x, cliprect.max_x, y, y) : runtime.macro("rectangle", cliprect.min_x, cliprect.max_x, y, y)))), (runtime.calls["rectangle"] ? runtime.calls["rectangle"](cliprect.min_x, cliprect.max_x, y, y) : runtime.macro("rectangle", cliprect.min_x, cliprect.max_x, y, y)));
      let objdata: any = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](4) : new Uint8Array(Math.max(0, Number(4))));
      let v: any = (((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? ((~((y) - (1)))) : (((y) - (1))))) & 0xff);
      for (let h: any = 496; ((Number(h) >= Number(128)) ? 1 : 0); h = ((h) - (16))) {
        let objcnt4: any = ((((Number((((h) >>> (8)) & 1)) !== Number(((((~h)) >>> (7)) & 1))) ? 1 : 0)) ? 1 : 0);
        let objcnt3: any = ((((Number(((((((v) >>> (7)) & 1)) && (objcnt4)) ? 1 : 0)) !== Number(((((~h)) >>> (7)) & 1))) ? 1 : 0)) ? 1 : 0);
        let obj_idx: any = ((((((h) >>> (4))) & (7))) & 0xff);
        obj_idx = ((((obj_idx) | (((objcnt3) ? (8) : (0))))) & 0xff);
        obj_idx = ((((obj_idx) | (((objcnt4) ? (16) : (0))))) & 0xff);
        obj_idx = ((((obj_idx) << (2))) & 0xff);
        for (let i: any = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
          runtime.writeIndex(objdata, i, runtime.readIndex(h_m_spriteram, ((obj_idx) | (i))));
        }
        let code: any = ((((((runtime.readIndex(objdata, 0)) & (127))) | ((((((runtime.readIndex(objdata, 1)) >>> (5)) & 1)) << (7))))) | ((((((runtime.readIndex(objdata, 0)) >>> (7)) & 1)) << (8))));
        let col: any = ((runtime.readIndex(objdata, 1)) & (15));
        let sx: any = ((runtime.readIndex(objdata, 3)) - ((((((runtime.readIndex(objdata, 1)) >>> (4)) & 1)) << (8))));
        let sy: any = runtime.readIndex(objdata, 2);
        let dir: any = 1;
        let valpha: any = ((((sy) & 0xff)) & 0xff);
        let v2c: any = (((((((~v)) & 0xff)) + ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (255))))) & 0xff);
        let lvbeta: any = ((((v2c) + (valpha))) & 0xff);
        let vbeta: any = (((~lvbeta)) & 0xff);
        let vleq: any = ((((Number(vbeta) <= Number((((~valpha)) & (255)))) ? 1 : 0)) ? 1 : 0);
        let vinlen: any = ((1) ? 1 : 0);
        let vlen: any = ((((runtime.readIndex(objdata, 1)) >>> (6))) & 0xff);
        switch (((vlen) & (3))) {
          case 0:
          {
            vinlen = ((((((((((((((lvbeta) >>> (7)) & 1)) && ((((lvbeta) >>> (6)) & 1))) ? 1 : 0)) && ((((lvbeta) >>> (5)) & 1))) ? 1 : 0)) && ((((lvbeta) >>> (4)) & 1))) ? 1 : 0)) ? 1 : 0);
            break;
          }
          case 1:
          {
            vinlen = (((((((((((lvbeta) >>> (7)) & 1)) && ((((lvbeta) >>> (6)) & 1))) ? 1 : 0)) && ((((lvbeta) >>> (5)) & 1))) ? 1 : 0)) ? 1 : 0);
            break;
          }
          case 2:
          {
            vinlen = ((((((((lvbeta) >>> (7)) & 1)) && ((((lvbeta) >>> (6)) & 1))) ? 1 : 0)) ? 1 : 0);
            break;
          }
          case 3:
          {
            vinlen = ((1) ? 1 : 0);
            break;
          }
        }
        let vinzone: any = (((((((vleq) && (vinlen)) ? 1 : 0)) ? 0 : 1)) ? 1 : 0);
        if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
          sx = ((240) - (sx));
          sy = ((240) - (sy));
          dir = (-1);
        }
        let row: any = ((((Number(vlen) === Number(3)) ? 1 : 0)) ? (16) : (((1) << (vlen))));
        code = runtime.andAssign(code, (~((row) - (1))));
        if (((vinzone) ? 0 : 1)) {
          for (let i: any = 0; ((Number(i) < Number(row)) ? 1 : 0); i = ((i) + (1))) {
            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : (runtime.calls["gfx"]?.(2) ?? 0)))).transpen?.(bitmap, cliprecty, ((code) + (i)), col, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen")), (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen")), sx, ((sy) + (((((16) * (i))) * (dir)))), 15) ?? 0);
          }
        }
      }
    }
  }
  return {
    "scroll_w": method_scroll_w,
    "palette_bank_w": method_palette_bank_w,
    "fgvideoram_w": method_fgvideoram_w,
    "bgvideoram_w": method_bgvideoram_w,
    "get_fg_tile_info": method_get_fg_tile_info,
    "get_bg_tile_info": method_get_bg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "_1942_state.scroll_w": methods["scroll_w"],
      "_1942_state.palette_bank_w": methods["palette_bank_w"],
      "_1942_state.fgvideoram_w": methods["fgvideoram_w"],
      "_1942_state.bgvideoram_w": methods["bgvideoram_w"],
      "_1942_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "_1942_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "_1942_state.screen_update": methods["screen_update"],
      "_1942_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
