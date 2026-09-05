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
  function method_palette_r_0(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
    offset = runtime.andAssign(offset, (~256));
    return ((runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), offset)) | (65504));
  }

  function method_palette_w_0(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
    offset = runtime.andAssign(offset, (~256));
    runtime.combineData(runtime.addressOf(runtime.readIndex(h_m_paletteram, 0), offset), data, mem_mask);
    offset = runtime.andAssign(offset, 255);
    (runtime.overrides["changecolor"] ? runtime.overrides["changecolor"](((offset) + (((0) << (8)))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), ((offset) + (0))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), ((offset) + (512))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), ((offset) + (1024)))) : method_changecolor(runtime, ((offset) + (((0) << (8)))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), ((offset) + (0))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), ((offset) + (512))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 0), ((offset) + (1024)))));
  }

  function method_changecolor(runtime: any, color: any, r: any, g: any, b: any) {
    const members = runtime.members;
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](color, (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](r) : runtime.macro("pal5bit", r)), (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](g) : runtime.macro("pal5bit", g)), (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](b) : runtime.macro("pal5bit", b))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(color, (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](r) : runtime.macro("pal5bit", r)), (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](g) : runtime.macro("pal5bit", g)), (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](b) : runtime.macro("pal5bit", b))) ?? 0) : (runtime.calls["set_pen_color"]?.(color, (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](r) : runtime.macro("pal5bit", r)), (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](g) : runtime.macro("pal5bit", g)), (runtime.calls["pal5bit"] ? runtime.calls["pal5bit"](b) : runtime.macro("pal5bit", b))) ?? 0));
  }

  function method_palette_r_1(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
    offset = runtime.andAssign(offset, (~256));
    return ((runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), offset)) | (65504));
  }

  function method_palette_w_1(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
    offset = runtime.andAssign(offset, (~256));
    runtime.combineData(runtime.addressOf(runtime.readIndex(h_m_paletteram, 1), offset), data, mem_mask);
    offset = runtime.andAssign(offset, 255);
    (runtime.overrides["changecolor"] ? runtime.overrides["changecolor"](((offset) + (((1) << (8)))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), ((offset) + (0))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), ((offset) + (512))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), ((offset) + (1024)))) : method_changecolor(runtime, ((offset) + (((1) << (8)))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), ((offset) + (0))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), ((offset) + (512))), runtime.readIndex(runtime.readIndex(h_m_paletteram, 1), ((offset) + (1024)))));
  }

  function method_videoram1_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    runtime.combineData(runtime.addressOf(runtime.readIndex(h_m_videoram, 0), offset), data, mem_mask);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
  }

  function method_videoram2_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    runtime.combineData(runtime.addressOf(runtime.readIndex(h_m_videoram, 1), offset), data, mem_mask);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
  }

  function method_soundram_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_soundram ?? runtime.member("m_soundram")), offset);
  }

  function method_soundram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_soundram"), offset, data);
  }

  function method_irq_line_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_raster_irq_position = ((((((data) & (511))) - (128))) | 0);
    if ((runtime.calls["m_upd71059c.found"] ? runtime.calls["m_upd71059c.found"]() : (members.m_upd71059c) != null ? (typeof (runtime.dereference(members.m_upd71059c)).found === 'function' ? (runtime.dereference(members.m_upd71059c)).found() : typeof (runtime.dereference(members.m_upd71059c)).found === 'number' || typeof (runtime.dereference(members.m_upd71059c)).found === 'boolean' ? (runtime.dereference(members.m_upd71059c)).found : runtime.container(members.m_upd71059c, "found")) : (runtime.calls["found"]?.() ?? 0))) {
      (runtime.calls["m_upd71059c.ir2_w"] ? runtime.calls["m_upd71059c.ir2_w"](0) : (members.m_upd71059c) != null ? ((runtime.dereference(members.m_upd71059c)).ir2_w?.(0) ?? 0) : (runtime.calls["ir2_w"]?.(0) ?? 0));
    } else {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](12, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(12, 0) ?? 0) : (runtime.calls["set_input_line"]?.(12, 0) ?? 0));
    }
  }

  function method_dmaon_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_spriteram.copy"] ? runtime.calls["m_spriteram.copy"]() : (members.m_spriteram) != null ? (typeof (runtime.dereference(members.m_spriteram)).copy === 'function' ? (runtime.dereference(members.m_spriteram)).copy() : typeof (runtime.dereference(members.m_spriteram)).copy === 'number' || typeof (runtime.dereference(members.m_spriteram)).copy === 'boolean' ? (runtime.dereference(members.m_spriteram)).copy : runtime.container(members.m_spriteram, "copy")) : (runtime.calls["copy"]?.() ?? 0));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    (runtime.overrides["m72_m81_get_tile_info"] ? runtime.overrides["m72_m81_get_tile_info"](tileinfo, tile_index, runtime.readIndex(h_m_videoram, 1), (members.m_bg_source ?? runtime.member("m_bg_source"))) : method_m72_m81_get_tile_info(runtime, tileinfo, tile_index, runtime.readIndex(h_m_videoram, 1), (members.m_bg_source ?? runtime.member("m_bg_source"))));
  }

  function method_m72_m81_get_tile_info(runtime: any, tileinfo: any, tile_index: any, vram: any, gfxnum: any) {
    const members = runtime.members;
    tile_index = ((tile_index) * (2));
    let code: any = ((runtime.readIndex(vram, tile_index)) & 0xffff);
    let attr: any = ((runtime.readIndex(vram, ((tile_index) + (1)))) & 0xffff);
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](gfxnum, ((code) & (16383)), ((attr) & (15)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((code) & (49152))) >>> (14))) : runtime.macro("TILE_FLIPYX", ((((code) & (49152))) >>> (14))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(gfxnum, ((code) & (16383)), ((attr) & (15)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((code) & (49152))) >>> (14))) : runtime.macro("TILE_FLIPYX", ((((code) & (49152))) >>> (14))))) ?? 0) : (runtime.calls["set"]?.(gfxnum, ((code) & (16383)), ((attr) & (15)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((code) & (49152))) >>> (14))) : runtime.macro("TILE_FLIPYX", ((((code) & (49152))) >>> (14))))) ?? 0));
    tileinfo.group = ((((attr) & (192))) >>> (6));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    (runtime.overrides["m72_m81_get_tile_info"] ? runtime.overrides["m72_m81_get_tile_info"](tileinfo, tile_index, runtime.readIndex(h_m_videoram, 0), (members.m_fg_source ?? runtime.member("m_fg_source"))) : method_m72_m81_get_tile_info(runtime, tileinfo, tile_index, runtime.readIndex(h_m_videoram, 0), (members.m_fg_source ?? runtime.member("m_fg_source"))));
  }

  function method_draw_sprites(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    let spriteram: any = (runtime.calls["m_spriteram.buffer"] ? runtime.calls["m_spriteram.buffer"]() : (members.m_spriteram) != null ? (typeof (runtime.dereference(members.m_spriteram)).buffer === 'function' ? (runtime.dereference(members.m_spriteram)).buffer() : typeof (runtime.dereference(members.m_spriteram)).buffer === 'number' || typeof (runtime.dereference(members.m_spriteram)).buffer === 'boolean' ? (runtime.dereference(members.m_spriteram)).buffer : runtime.container(members.m_spriteram, "buffer")) : (runtime.calls["buffer"]?.() ?? 0));
    let spritelist: any = [];
    for (let i: any = 0, w: any = 0; ((Number(i) < Number((members.m_spriteram).length)) ? 1 : 0); i = ((i) + (((w) * (4))))) {
      (runtime.calls["spritelist.push"] ? runtime.calls["spritelist.push"](i) : (spritelist) != null ? (spritelist).push(i) : (runtime.calls["push"]?.(i) ?? 0));
      w = ((1) << (((((runtime.readIndex(spriteram, ((i) + (2)))) & (49152))) >>> (14))));
    }
    for (let i: any = (((spritelist).length) - (1)); ((Number(i) >= Number(0)) ? 1 : 0); i = ((i) - (1))) {
      let offs: any = runtime.readIndex(spritelist, i);
      let code: any = runtime.readIndex(spriteram, ((offs) + (1)));
      let color: any = ((((runtime.readIndex(spriteram, ((offs) + (2)))) & (15))) >>> 0);
      let sx: any = runtime.add((-256), ((runtime.readIndex(spriteram, ((offs) + (3)))) & (1023)));
      let sy: any = ((384) - (((runtime.readIndex(spriteram, ((offs) + (0)))) & (511))));
      let flipx: any = ((runtime.readIndex(spriteram, ((offs) + (2)))) & (2048));
      let flipy: any = ((runtime.readIndex(spriteram, ((offs) + (2)))) & (1024));
      let w: any = ((1) << (((((runtime.readIndex(spriteram, ((offs) + (2)))) & (49152))) >>> (14))));
      let h: any = ((1) << (((((runtime.readIndex(spriteram, ((offs) + (2)))) & (12288))) >>> (12))));
      sy = ((sy) - (((16) * (h))));
      if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
        sx = ((((512) - (((16) * (w))))) - (sx));
        sy = ((((284) - (((16) * (h))))) - (sy));
        flipx = ((flipx) ? 0 : 1);
        flipy = ((flipy) ? 0 : 1);
      }
      for (let x: any = 0; ((Number(x) < Number(w)) ? 1 : 0); x = ((x) + (1))) {
        for (let y: any = 0; ((Number(y) < Number(h)) ? 1 : 0); y = ((y) + (1))) {
          let c: any = code;
          if (flipx) {
            c = ((c) + (((8) * (((((w) - (1))) - (x))))));
          } else {
            c = ((c) + (((8) * (x))));
          }
          if (flipy) {
            c = ((c) + (((((h) - (1))) - (y))));
          } else {
            c = ((c) + (y));
          }
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).prio_transpen?.(bitmap, cliprect, c, color, flipx, flipy, ((sx) + (((16) * (x)))), ((sy) + (((16) * (y)))), (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), (~1), 0) ?? 0);
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
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
