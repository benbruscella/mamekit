// GENERATED executable machine composition from src/mame/irem/m72.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rtype');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_palette_r_0(runtime: any, offset: any): any {
    const members = runtime.members;

    offset = ((offset) & (-257));
    return ((runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), offset)) | (65504));
  }

  function method_palette_w_0(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    offset = ((offset) & (-257));
    runtime.combineData(runtime.addressOf(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), offset), data, mem_mask);
    offset = ((offset) & (255));
    (runtime.overrides["changecolor"] ? runtime.overrides["changecolor"](((offset) + (0)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (1024)))) : method_changecolor(runtime, ((offset) + (0)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (1024)))));
  }

  function method_changecolor(runtime: any, color: any, r: any, g: any, b: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(color, (__l["pal5bit"] ? __l["pal5bit"](r) : runtime.macro("pal5bit", r)), (__l["pal5bit"] ? __l["pal5bit"](g) : runtime.macro("pal5bit", g)), (__l["pal5bit"] ? __l["pal5bit"](b) : runtime.macro("pal5bit", b)));
  }

  function method_palette_r_1(runtime: any, offset: any): any {
    const members = runtime.members;

    offset = ((offset) & (-257));
    return ((runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), offset)) | (65504));
  }

  function method_palette_w_1(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    offset = ((offset) & (-257));
    runtime.combineData(runtime.addressOf(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), offset), data, mem_mask);
    offset = ((offset) & (255));
    (runtime.overrides["changecolor"] ? runtime.overrides["changecolor"](((offset) + (256)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (1024)))) : method_changecolor(runtime, ((offset) + (256)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (1024)))));
  }

  function method_videoram1_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), offset), data, mem_mask);
    (__l["m_fg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
  }

  function method_videoram2_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), offset), data, mem_mask);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
  }

  function method_soundram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_soundram ?? runtime.member("m_soundram")), offset);
  }

  function method_soundram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_soundram"), offset, data);
  }

  function method_irq_line_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_raster_irq_position = ((((((data) & (511))) - (128))) | 0);
    if ((__l["m_upd71059c.found"] ?? runtime.memberCall(members.m_upd71059c, "found", 0, undefined))()) {
      (__l["m_upd71059c.ir2_w"] ?? runtime.memberCall(members.m_upd71059c, "ir2_w", 0, undefined))(0);
    } else {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(12, 0);
    }
  }

  function method_dmaon_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_spriteram.copy"] ?? runtime.memberCall(members.m_spriteram, "copy", 0, undefined))();
  }

  function method_sample_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["read_byte"] ? __l["read_byte"]((members.m_sample_addr ?? runtime.member("m_sample_addr"))) : runtime.macro("read_byte", (members.m_sample_addr ?? runtime.member("m_sample_addr"))));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;

    (runtime.overrides["m72_m81_get_tile_info"] ? runtime.overrides["m72_m81_get_tile_info"](tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), (members.m_bg_source ?? runtime.member("m_bg_source"))) : method_m72_m81_get_tile_info(runtime, tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), (members.m_bg_source ?? runtime.member("m_bg_source"))));
  }

  function method_m72_m81_get_tile_info(runtime: any, tileinfo: any, tile_index: any, vram: any, gfxnum: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    tile_index = ((((tile_index) * (2))) | 0);
    let code: any = ((runtime.readIndex(vram, tile_index)) & 0xffff);
    let attr: any = ((runtime.readIndex(vram, ((tile_index) + (1)))) & 0xffff);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(gfxnum, ((code) & (16383)), ((attr) & (15)), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](runtime.shiftRight(((code) & (49152)), 14)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((code) & (49152)), 14))));
    tileinfo.group = runtime.shiftRight(((attr) & (192)), 6);
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;

    (runtime.overrides["m72_m81_get_tile_info"] ? runtime.overrides["m72_m81_get_tile_info"](tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), (members.m_fg_source ?? runtime.member("m_fg_source"))) : method_m72_m81_get_tile_info(runtime, tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), (members.m_fg_source ?? runtime.member("m_fg_source"))));
  }

  function method_draw_sprites(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram: any = (__l["m_spriteram.buffer"] ?? runtime.memberCall(members.m_spriteram, "buffer", 0, undefined))();
    let spritelist: any = [];
    for (let i: any = ((0) | 0), w: any = ((0) | 0); ((Number(i) < Number((members.m_spriteram).length)) ? 1 : 0); i = ((((i) + (((w) * (4))))) | 0)) {
      (__l["spritelist.push"] ? __l["spritelist.push"](i) : (spritelist) != null ? (spritelist).push(i) : ((__l["push"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("push"))?.(i) ?? 0));
      w = ((((1) << (runtime.shiftRight(((runtime.readIndex(spriteram, ((i) + (2)))) & (49152)), 14)))) | 0);
    }
    for (let i: any = ((runtime.subtract((spritelist).length, 1)) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
      let offs: any = ((runtime.readIndex(spritelist, i)) | 0);
      let code: any = ((runtime.readIndex(spriteram, ((offs) + (1)))) | 0);
      let color: any = ((((runtime.readIndex(spriteram, ((offs) + (2)))) & (15))) >>> 0);
      let sx: any = ((runtime.add(-256, ((runtime.readIndex(spriteram, ((offs) + (3)))) & (1023)))) | 0);
      let sy: any = ((((384) - (((runtime.readIndex(spriteram, ((offs) + (0)))) & (511))))) | 0);
      let flipx: any = ((((runtime.readIndex(spriteram, ((offs) + (2)))) & (2048))) | 0);
      let flipy: any = ((((runtime.readIndex(spriteram, ((offs) + (2)))) & (1024))) | 0);
      let w: any = ((((1) << (runtime.shiftRight(((runtime.readIndex(spriteram, ((offs) + (2)))) & (49152)), 14)))) | 0);
      let h: any = ((((1) << (runtime.shiftRight(((runtime.readIndex(spriteram, ((offs) + (2)))) & (12288)), 12)))) | 0);
      sy = ((((sy) - (((16) * (h))))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        sx = ((((((512) - (((16) * (w))))) - (sx))) | 0);
        sy = ((((((284) - (((16) * (h))))) - (sy))) | 0);
        flipx = ((((flipx) ? 0 : 1)) | 0);
        flipy = ((((flipy) ? 0 : 1)) | 0);
      }
      for (let x: any = ((0) | 0); ((Number(x) < Number(w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        for (let y: any = ((0) | 0); ((Number(y) < Number(h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
          let c: any = ((code) | 0);
          if (flipx) {
            c = ((((c) + (((8) * (((((w) - (1))) - (x))))))) | 0);
          } else {
            c = ((((c) + (((8) * (x))))) | 0);
          }
          if (flipy) {
            c = ((((c) + (((((h) - (1))) - (y))))) | 0);
          } else {
            c = ((((c) + (y))) | 0);
          }
          ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).prio_transpen?.(bitmap, cliprect, c, color, flipx, flipy, ((sx) + (((16) * (x)))), ((sy) + (((16) * (y)))), (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))(), -2, 0) ?? 0);
        }
      }
    }
  }
  return {
    "palette_r_0": method_palette_r_0,
    "palette_w_0": method_palette_w_0,
    "changecolor": method_changecolor,
    "palette_r_1": method_palette_r_1,
    "palette_w_1": method_palette_w_1,
    "videoram1_w": method_videoram1_w,
    "videoram2_w": method_videoram2_w,
    "soundram_r": method_soundram_r,
    "soundram_w": method_soundram_w,
    "irq_line_w": method_irq_line_w,
    "dmaon_w": method_dmaon_w,
    "sample_r": method_sample_r,
    "get_bg_tile_info": method_get_bg_tile_info,
    "m72_m81_get_tile_info": method_m72_m81_get_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "m72_state.palette_r_0": methods["palette_r_0"],
      "m72_state.palette_w_0": methods["palette_w_0"],
      "m72_state.changecolor": methods["changecolor"],
      "m72_state.palette_r_1": methods["palette_r_1"],
      "m72_state.palette_w_1": methods["palette_w_1"],
      "m72_state.videoram1_w": methods["videoram1_w"],
      "m72_state.videoram2_w": methods["videoram2_w"],
      "m72_state.soundram_r": methods["soundram_r"],
      "m72_state.soundram_w": methods["soundram_w"],
      "m72_state.irq_line_w": methods["irq_line_w"],
      "m72_state.dmaon_w": methods["dmaon_w"],
      "m72_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "m72_state.m72_m81_get_tile_info": methods["m72_m81_get_tile_info"],
      "m72_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "m72_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","flip_screen","m_bg_tilemap.mark_tile_dirty","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.set_pen_color","m_spriteram.buffer","m_spriteram.copy","m_upd71059c.found","m_upd71059c.ir2_w","mark_tile_dirty","pal5bit","priority","push","read_byte","screen.priority","set","spritelist.push","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
