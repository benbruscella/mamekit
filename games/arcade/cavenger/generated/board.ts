// GENERATED executable machine composition from src/mame/universal/ladybug.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'cavenger');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_spr_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_spr_ram"), ((offset) & (1023)), data);
  }

  function method_bg_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((offset) & (2047)));
  }

  function method_bg_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_bg_ram"), ((offset) & (2047)), data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(((offset) & (1023)));
  }

  function method_screen_update_ladybug(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(0, cliprect);
    (__l["m_video.draw"] ?? runtime.memberCall(members.m_video, "draw", 0, undefined))(screen, bitmap, cliprect, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")));
    return 0;
  }

  function method_draw(runtime: any, screen: any, bitmap: any, cliprect: any, flip: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    for (let offs: any = 0; ((Number(offs) < Number(32)) ? 1 : 0); offs = ((offs) + (1))) {
      let scroll: any = ((runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((((((offs) & (3))) << (5))) | (((offs) >>> (2)))))) | 0);
      (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(offs, ((flip) ? ((-scroll)) : (scroll)));
    }
    (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0);
    runtime.invoke("draw_sprites", bitmap, cliprect);
  }
  return {
    "spr_w": method_spr_w,
    "bg_r": method_bg_r,
    "bg_w": method_bg_w,
    "screen_update_ladybug": method_screen_update_ladybug,
    "draw": method_draw
  };
})();
    return {
      "ladybug_state.screen_update_ladybug": methods["screen_update_ladybug"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","flip_screen","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_video.draw","mark_tile_dirty","set_scrollx"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
