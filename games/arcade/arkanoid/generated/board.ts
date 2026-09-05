// GENERATED executable machine composition from src/mame/taito/arkanoid.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'arkanoid');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_arkanoid_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
  }

  function method_input_mux_r(runtime: any) {
    const members = runtime.members;
    const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
    return ((runtime.dereference(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))))).read_safe?.(255) ?? 0);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let offs: any = ((tile_index) * (2));
    let code: any = runtime.add(runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((offs) + (1))), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & (7))) << (8))), ((2048) * ((members.m_gfxbank ?? runtime.member("m_gfxbank")))));
    let color: any = runtime.add(((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & (248))) >>> (3)), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank")))));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
  }

  function method_screen_update_arkanoid(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let offs: any = 0;
    for (offs = 0; ((Number(offs) < Number((members.m_spriteram).length)) ? 1 : 0); offs = ((offs) + (4))) {
      let sx: any = 0;
      let sy: any = 0;
      let code: any = 0;
      sx = runtime.readIndex(h_m_spriteram, offs);
      sy = ((248) - (runtime.readIndex(h_m_spriteram, ((offs) + (1)))));
      if ((runtime.calls["flip_screen_x"] ? runtime.calls["flip_screen_x"]() : runtime.macro("flip_screen_x"))) {
        sx = ((248) - (sx));
      }
      if ((runtime.calls["flip_screen_y"] ? runtime.calls["flip_screen_y"]() : runtime.macro("flip_screen_y"))) {
        sy = ((248) - (sy));
      }
      code = runtime.add(runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (3))), ((((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (3))) << (8))), ((1024) * ((members.m_gfxbank ?? runtime.member("m_gfxbank")))));
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).transpen?.(bitmap, cliprect, ((2) * (code)), runtime.add(((((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (248))) >>> (3)), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank"))))), (runtime.calls["flip_screen_x"] ? runtime.calls["flip_screen_x"]() : runtime.macro("flip_screen_x")), (runtime.calls["flip_screen_y"] ? runtime.calls["flip_screen_y"]() : runtime.macro("flip_screen_y")), sx, ((sy) + ((((runtime.calls["flip_screen_y"] ? runtime.calls["flip_screen_y"]() : runtime.macro("flip_screen_y"))) ? (8) : ((-8))))), 0) ?? 0);
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).transpen?.(bitmap, cliprect, runtime.add(((2) * (code)), 1), runtime.add(((((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (248))) >>> (3)), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank"))))), (runtime.calls["flip_screen_x"] ? runtime.calls["flip_screen_x"]() : runtime.macro("flip_screen_x")), (runtime.calls["flip_screen_y"] ? runtime.calls["flip_screen_y"]() : runtime.macro("flip_screen_y")), sx, sy, 0) ?? 0);
    }
  }
  return {
    "arkanoid_videoram_w": method_arkanoid_videoram_w,
    "input_mux_r": method_input_mux_r,
    "get_bg_tile_info": method_get_bg_tile_info,
    "screen_update_arkanoid": method_screen_update_arkanoid,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "arkanoid_state.arkanoid_videoram_w": methods["arkanoid_videoram_w"],
      "arkanoid_state.input_mux_r": methods["input_mux_r"],
      "arkanoid_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "arkanoid_state.screen_update_arkanoid": methods["screen_update_arkanoid"],
      "arkanoid_state.draw_sprites": methods["draw_sprites"],
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
