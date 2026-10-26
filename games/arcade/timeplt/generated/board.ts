// GENERATED executable machine composition from src/mame/konami/timeplt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'timeplt');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  const __mame_table_0 = [0, 16, 32, 48, 64, 144, 160, 176, 160, 208];

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_scanline_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
  }

  function method___inline_main_map_c300_lw8(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_mainlatch.write_d0"] ?? runtime.memberCall(members.m_mainlatch, "write_d0", 0, undefined))(((offset) >>> (1)), data);
  }

  function method_filter_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.invoke("set_filter", 1, 0, ((((offset) >>> (0))) & (3)));
    runtime.invoke("set_filter", 1, 1, ((((offset) >>> (2))) & (3)));
    runtime.invoke("set_filter", 1, 2, ((((offset) >>> (4))) & (3)));
    runtime.invoke("set_filter", 0, 0, ((((offset) >>> (6))) & (3)));
    runtime.invoke("set_filter", 0, 1, ((((offset) >>> (8))) & (3)));
    runtime.invoke("set_filter", 0, 2, ((((offset) >>> (10))) & (3)));
  }

  function method_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
    let code: any = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((8) * (((attr) & (32)))))) | 0);
    let color: any = ((((attr) & (31))) | 0);
    let flags: any = (((__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](runtime.shiftRight(attr, 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(attr, 6)))) | 0);
    tileinfo.category = runtime.shiftRight(((attr) & (16)), 4);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, flags);
  }

  function method_nmi_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_nmi_enable = ((state) & 0xff);
    if ((((members.m_nmi_enable ?? runtime.member("m_nmi_enable"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
    }
  }

  function method_sh_irqtrigger_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((((Number((members.m_last_irq_state ?? runtime.member("m_last_irq_state"))) === Number(0)) ? 1 : 0)) && (state)) ? 1 : 0)) {
      (__l["m_soundcpu.set_input_line"] ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 2);
    }
    members.m_last_irq_state = state;
  }

  function method_video_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_video_enable = ((state) ? 1 : 0);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((members.m_video_enable ?? runtime.member("m_video_enable"))) {
      (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
      runtime.invoke("draw_sprites", bitmap, cliprect);
      (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 1, 0);
    }
    return 0;
  }

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_nmi_enable ?? runtime.member("m_nmi_enable")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
    }
  }

  function method_portB_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__mame_table_0[(((((runtime.divide((__l["m_soundcpu.total_cycles"] ?? runtime.memberCall(members.m_soundcpu, "total_cycles", 0, undefined))(), 512)) % (10))) % 10) + 10) % 10] ?? 0);
  }
  return {
    "colorram_w": method_colorram_w,
    "videoram_w": method_videoram_w,
    "scanline_r": method_scanline_r,
    "__inline_main_map_c300_lw8": method___inline_main_map_c300_lw8,
    "filter_w": method_filter_w,
    "get_tile_info": method_get_tile_info,
    "nmi_enable_w": method_nmi_enable_w,
    "sh_irqtrigger_w": method_sh_irqtrigger_w,
    "video_enable_w": method_video_enable_w,
    "screen_update": method_screen_update,
    "vblank_irq": method_vblank_irq,
    "portB_r": method_portB_r
  };
})();
    return {
      "timeplt_state.colorram_w": methods["colorram_w"],
      "timeplt_state.videoram_w": methods["videoram_w"],
      "timeplt_state.scanline_r": methods["scanline_r"],
      "timeplt_state.__inline_main_map_c300_lw8": methods["__inline_main_map_c300_lw8"],
      "timeplt_state.get_tile_info": methods["get_tile_info"],
      "timeplt_state.nmi_enable_w": methods["nmi_enable_w"],
      "timeplt_state.video_enable_w": methods["video_enable_w"],
      "timeplt_state.screen_update": methods["screen_update"],
      "timeplt_state.vblank_irq": methods["vblank_irq"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","draw","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_maincpu.set_input_line","m_mainlatch.write_d0","m_screen.vpos","m_soundcpu.set_input_line","m_soundcpu.total_cycles","mark_tile_dirty","set","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
