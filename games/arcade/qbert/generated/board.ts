// GENERATED executable machine composition from src/mame/gottlieb/gottlieb.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'qbert');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_video_control_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number((members.m_background_priority ?? runtime.member("m_background_priority"))) !== Number((((data) >>> (0)) & 1))) ? 1 : 0)) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    }
    members.m_background_priority = (((((data) >>> (0)) & 1)) & 0xff);
    (runtime.calls["flip_screen_x_set"] ? runtime.calls["flip_screen_x_set"]((((data) >>> (1)) & 1)) : runtime.macro("flip_screen_x_set", (((data) >>> (1)) & 1)));
    (runtime.calls["flip_screen_y_set"] ? runtime.calls["flip_screen_y_set"]((((data) >>> (2)) & 1)) : runtime.macro("flip_screen_y_set", (((data) >>> (2)) & 1)));
  }

  function method_qbert_knocker(runtime: any, knock: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_knockers"), 0, ((knock) ? (1) : (0)));
    if (((knock) & ((~(members.m_knocker_prev ?? runtime.member("m_knocker_prev")))))) {
      (runtime.calls["m_knocker_sample.start"] ? runtime.calls["m_knocker_sample.start"](0, 0) : (members.m_knocker_sample) != null ? ((runtime.dereference(members.m_knocker_sample)).start?.(0, 0) ?? 0) : (runtime.calls["start"]?.(0, 0) ?? 0));
    }
    members.m_knocker_prev = ((knock) & 0xff);
  }

  function method_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_charram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(runtime.readIndex((members.m_charram ?? runtime.member("m_charram")), offset)) !== Number(data)) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_charram"), offset, data);
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).mark_dirty?.(runtime.divide(offset, 32)) ?? 0);
    }
  }

  function method_palette_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_weights = members.m_weights ?? runtime.member("m_weights");
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let val: any = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) & ((~1))));
    let g: any = (runtime.calls["combine_weights"] ? runtime.calls["combine_weights"](h_m_weights, (((val) >>> (4)) & 1), (((val) >>> (5)) & 1), (((val) >>> (6)) & 1), (((val) >>> (7)) & 1)) : runtime.macro("combine_weights", h_m_weights, (((val) >>> (4)) & 1), (((val) >>> (5)) & 1), (((val) >>> (6)) & 1), (((val) >>> (7)) & 1)));
    let b: any = (runtime.calls["combine_weights"] ? runtime.calls["combine_weights"](h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)) : runtime.macro("combine_weights", h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)));
    val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (1)));
    let r: any = (runtime.calls["combine_weights"] ? runtime.calls["combine_weights"](h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)) : runtime.macro("combine_weights", h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)));
    let a: any = ((((((members.m_transparent0 ?? runtime.member("m_transparent0"))) && (((Number(runtime.divide(offset, 2)) === Number(0)) ? 1 : 0))) ? 1 : 0)) ? (0) : (255));
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](runtime.divide(offset, 2), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](a, r, g, b) : runtime.macro("rgb_t", a, r, g, b))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.divide(offset, 2), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](a, r, g, b) : runtime.macro("rgb_t", a, r, g, b))) ?? 0) : (runtime.calls["set_pen_color"]?.(runtime.divide(offset, 2), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](a, r, g, b) : runtime.macro("rgb_t", a, r, g, b))) ?? 0));
  }

  function method_analog_reset_w(runtime: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_track"), 0, (runtime.calls["m_track_x.read_safe"] ? runtime.calls["m_track_x.read_safe"](0) : (members.m_track_x) != null ? ((runtime.dereference(members.m_track_x)).read_safe?.(0) ?? 0) : (runtime.calls["read_safe"]?.(0) ?? 0)));
    runtime.writeIndex(runtime.writableMember("m_track"), 1, (runtime.calls["m_track_y.read_safe"] ? runtime.calls["m_track_y.read_safe"](0) : (members.m_track_y) != null ? ((runtime.dereference(members.m_track_y)).read_safe?.(0) ?? 0) : (runtime.calls["read_safe"]?.(0) ?? 0)));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    const h_m_gfxcharlo = members.m_gfxcharlo ?? runtime.member("m_gfxcharlo");
    const h_m_gfxcharhi = members.m_gfxcharhi ?? runtime.member("m_gfxcharhi");
    let code: any = runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index);
    if (((Number(((code) & (128))) === Number(0)) ? 1 : 0)) {
      (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](h_m_gfxcharlo, code, 0, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(h_m_gfxcharlo, code, 0, 0) ?? 0) : (runtime.calls["set"]?.(h_m_gfxcharlo, code, 0, 0) ?? 0));
    } else {
      (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](h_m_gfxcharhi, code, 0, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(h_m_gfxcharhi, code, 0, 0) ?? 0) : (runtime.calls["set"]?.(h_m_gfxcharhi, code, 0, 0) ?? 0));
    }
  }
  return {
    "video_control_w": method_video_control_w,
    "qbert_knocker": method_qbert_knocker,
    "videoram_w": method_videoram_w,
    "charram_w": method_charram_w,
    "palette_w": method_palette_w,
    "analog_reset_w": method_analog_reset_w,
    "get_bg_tile_info": method_get_bg_tile_info
  };
})();
    return {
      "gottlieb_state.video_control_w": methods["video_control_w"],
      "gottlieb_state.qbert_knocker": methods["qbert_knocker"],
      "gottlieb_state.videoram_w": methods["videoram_w"],
      "gottlieb_state.charram_w": methods["charram_w"],
      "gottlieb_state.palette_w": methods["palette_w"],
      "gottlieb_state.analog_reset_w": methods["analog_reset_w"],
      "gottlieb_state.get_bg_tile_info": methods["get_bg_tile_info"],
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
