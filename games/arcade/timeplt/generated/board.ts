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
  function method_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_scanline_r(runtime: any) {
    const members = runtime.members;
    return (runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0));
  }

  function method___inline_main_map_c300_lw8(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_mainlatch.write_d0"] ? runtime.calls["m_mainlatch.write_d0"](((offset) >>> (1)), data) : (members.m_mainlatch) != null ? ((runtime.dereference(members.m_mainlatch)).write_d0?.(((offset) >>> (1)), data) ?? 0) : (runtime.calls["write_d0"]?.(((offset) >>> (1)), data) ?? 0));
  }

  function method_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let attr: any = runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index);
    let code: any = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((8) * (((attr) & (32)))));
    let color: any = ((attr) & (31));
    let flags: any = (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((attr) >>> (6))) : runtime.macro("TILE_FLIPYX", ((attr) >>> (6))));
    tileinfo.category = ((((attr) & (16))) >>> (4));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (runtime.calls["set"]?.(0, code, color, flags) ?? 0));
  }

  function method_nmi_enable_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_nmi_enable = ((state) & 0xff);
    if ((((members.m_nmi_enable ?? runtime.member("m_nmi_enable"))) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
    }
  }

  function method_video_enable_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_video_enable = ((state) ? 1 : 0);
  }

  function method_vblank_irq(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_nmi_enable ?? runtime.member("m_nmi_enable")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 1) ?? 0));
    }
  }
  return {
    "colorram_w": method_colorram_w,
    "videoram_w": method_videoram_w,
    "scanline_r": method_scanline_r,
    "__inline_main_map_c300_lw8": method___inline_main_map_c300_lw8,
    "get_tile_info": method_get_tile_info,
    "nmi_enable_w": method_nmi_enable_w,
    "video_enable_w": method_video_enable_w,
    "vblank_irq": method_vblank_irq
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
      "timeplt_state.vblank_irq": methods["vblank_irq"],
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
