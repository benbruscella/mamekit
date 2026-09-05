// GENERATED executable machine composition from src/mame/konami/trackfld.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'trackfld');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_trackfld_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_trackfld_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_konami_SN76489a_latch_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_SN76489a_latch = ((data) & 0xff);
  }

  function method_konami_SN76489a_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_sn.write"] ? runtime.calls["m_sn.write"]((members.m_SN76489a_latch ?? runtime.member("m_SN76489a_latch"))) : (members.m_sn) != null ? ((runtime.dereference(members.m_sn)).write?.((members.m_SN76489a_latch ?? runtime.member("m_SN76489a_latch"))) ?? 0) : (runtime.calls["write"]?.((members.m_SN76489a_latch ?? runtime.member("m_SN76489a_latch"))) ?? 0));
  }

  function method_trackfld_SN76489a_r(runtime: any) {
    const members = runtime.members;
    (runtime.overrides["konami_SN76489a_w"] ? runtime.overrides["konami_SN76489a_w"](0) : method_konami_SN76489a_w(runtime, 0));
    return 255;
  }

  function method_trackfld_sound_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_vlm.st_w"] ? runtime.calls["m_vlm.st_w"]((((offset) >>> (8)) & 1)) : (members.m_vlm) != null ? ((runtime.dereference(members.m_vlm)).st_w?.((((offset) >>> (8)) & 1)) ?? 0) : (runtime.calls["st_w"]?.((((offset) >>> (8)) & 1)) ?? 0));
    (runtime.calls["m_vlm.rst_w"] ? runtime.calls["m_vlm.rst_w"]((((offset) >>> (9)) & 1)) : (members.m_vlm) != null ? ((runtime.dereference(members.m_vlm)).rst_w?.((((offset) >>> (9)) & 1)) ?? 0) : (runtime.calls["rst_w"]?.((((offset) >>> (9)) & 1)) ?? 0));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let attr: any = runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index);
    let code: any = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((4) * (((attr) & (192)))));
    let color: any = ((attr) & (15));
    let flags: any = ((((((attr) & (16))) ? (1) : (0))) | (((((attr) & (32))) ? (2) : (0))));
    if ((members.m_bg_bank ?? runtime.member("m_bg_bank"))) {
      code = ((code) | (1024));
    }
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, flags) ?? 0) : (runtime.calls["set"]?.(1, code, color, flags) ?? 0));
  }

  function method_irq_mask_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_irq_mask = ((state) ? 1 : 0);
    if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
  }

  function method_vblank_irq(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
    }
  }
  return {
    "trackfld_videoram_w": method_trackfld_videoram_w,
    "trackfld_colorram_w": method_trackfld_colorram_w,
    "konami_SN76489a_latch_w": method_konami_SN76489a_latch_w,
    "konami_SN76489a_w": method_konami_SN76489a_w,
    "trackfld_SN76489a_r": method_trackfld_SN76489a_r,
    "trackfld_sound_w": method_trackfld_sound_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "irq_mask_w": method_irq_mask_w,
    "vblank_irq": method_vblank_irq
  };
})();
    return {
      "trackfld_state.trackfld_videoram_w": methods["trackfld_videoram_w"],
      "trackfld_state.trackfld_colorram_w": methods["trackfld_colorram_w"],
      "trackfld_state.konami_SN76489a_latch_w": methods["konami_SN76489a_latch_w"],
      "trackfld_state.konami_SN76489a_w": methods["konami_SN76489a_w"],
      "trackfld_state.trackfld_SN76489a_r": methods["trackfld_SN76489a_r"],
      "trackfld_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "trackfld_state.irq_mask_w": methods["irq_mask_w"],
      "trackfld_state.vblank_irq": methods["vblank_irq"],
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
