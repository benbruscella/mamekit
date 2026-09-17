// GENERATED executable machine composition from src/mame/phoenix/phoenix.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'phoenix');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {

  function method_phoenix_scroll_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](0, data) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, data) ?? 0) : (__l["set_scrollx"]?.(0, data) ?? 0));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((0) | 0);
    let col: any = ((0) | 0);
    code = ((runtime.readIndex(runtime.readIndex((members.m_videoram_pg ?? runtime.member("m_videoram_pg")), (members.m_videoram_pg_index ?? runtime.member("m_videoram_pg_index"))), tile_index)) | 0);
    col = ((((code) >>> (5))) | 0);
    col = ((((((col) | (8))) | ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) << (4))))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](1, code, col, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, col, 0) ?? 0) : (__l["set"]?.(1, code, col, 0) ?? 0));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((0) | 0);
    let col: any = ((0) | 0);
    code = ((runtime.readIndex(runtime.readIndex((members.m_videoram_pg ?? runtime.member("m_videoram_pg")), (members.m_videoram_pg_index ?? runtime.member("m_videoram_pg_index"))), ((tile_index) + (2048)))) | 0);
    col = ((((code) >>> (5))) | 0);
    col = ((((((col) | (0))) | ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) << (4))))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, col, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, col, 0) ?? 0) : (__l["set"]?.(0, code, col, 0) ?? 0));
  }

  function method_screen_update_phoenix(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    return 0;
  }
  return {
    "phoenix_scroll_w": method_phoenix_scroll_w,
    "get_fg_tile_info": method_get_fg_tile_info,
    "get_bg_tile_info": method_get_bg_tile_info,
    "screen_update_phoenix": method_screen_update_phoenix
  };
})();
    return {
      "phoenix_state.phoenix_scroll_w": methods["phoenix_scroll_w"],
      "phoenix_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "phoenix_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "phoenix_state.screen_update_phoenix": methods["screen_update_phoenix"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw","m_bg_tilemap.draw","m_bg_tilemap.set_scrollx","m_fg_tilemap.draw","set","set_scrollx","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
