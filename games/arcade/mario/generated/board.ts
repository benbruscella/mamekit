// GENERATED executable machine composition from src/mame/nintendo/mario.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mario');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_scroll_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, ((data) + (17))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, ((data) + (17))) ?? 0) : (runtime.calls["set_scrolly"]?.(0, ((data) + (17))) ?? 0));
  }

  function method_dac_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_audio_dac.write"] ? runtime.calls["m_audio_dac.write"](data) : (members.m_audio_dac) != null ? ((runtime.dereference(members.m_audio_dac)).write?.(data) ?? 0) : (runtime.calls["write"]?.(data) ?? 0));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((256) * ((members.m_gfx_bank ?? runtime.member("m_gfx_bank")))));
    let color: any = runtime.add(runtime.add(8, ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) >>> (5))), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
  }

  function method_nmi_mask_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_nmi_mask = ((state) ? 1 : 0);
    if (((state) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let flip: any = (((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (255) : (0))) & 0xff);
    let offs: any = 0;
    while (((Number(offs) !== Number((members.m_spriteram).length)) ? 1 : 0)) {
      if (runtime.readIndex(h_m_spriteram, offs)) {
        let y: any = ((runtime.add(runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (0))), ((flip) ? (247) : (249))), 1)) & (255));
        let x: any = runtime.readIndex(h_m_spriteram, ((offs) + (3)));
        y = ((240) - (y));
        y = ((y) ^ (flip));
        x = ((x) ^ (flip));
        let code: any = runtime.readIndex(h_m_spriteram, ((offs) + (2)));
        let color: any = runtime.add(((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))));
        let flipx: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (128));
        let flipy: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (64));
        if (flip) {
          y = ((y) - (14));
          x = ((x) - (7));
          flipx = ((flipx) ? 0 : 1);
          flipy = ((flipy) ? 0 : 1);
        } else {
          y = ((y) + (1));
          x = ((x) - (8));
        }
        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, x, y, 0) ?? 0);
      }
      offs = ((offs) + (4));
    }
  }

  function method_vblank_irq(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_nmi_mask ?? runtime.member("m_nmi_mask")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 1) ?? 0));
    }
  }
  return {
    "videoram_w": method_videoram_w,
    "scroll_w": method_scroll_w,
    "dac_w": method_dac_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "nmi_mask_w": method_nmi_mask_w,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "vblank_irq": method_vblank_irq
  };
})();
    return {
      "mario_state.videoram_w": methods["videoram_w"],
      "mario_state.scroll_w": methods["scroll_w"],
      "mario_state.dac_w": methods["dac_w"],
      "mario_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "mario_state.nmi_mask_w": methods["nmi_mask_w"],
      "mario_state.screen_update": methods["screen_update"],
      "mario_state.draw_sprites": methods["draw_sprites"],
      "mario_state.vblank_irq": methods["vblank_irq"],
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
