// GENERATED executable machine composition from src/mame/irem/m62.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'kungfum');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_m62_hscroll_low_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_m62_background_hscroll = (((((((members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll"))) & (65280))) | (data))) | 0);
  }

  function method_m62_hscroll_high_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_m62_background_hscroll = (((((((members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll"))) & (255))) | (((data) << (8))))) | 0);
  }

  function method_kungfum_tileram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](((offset) & (2047))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) & (2047))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (2047))) ?? 0));
  }

  function method_m62_tileram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](((offset) >>> (1))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) >>> (1))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) >>> (1))) ?? 0));
  }

  function method_m62_adpcm_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let adpcm: any = ((((offset) & (1))) ? ((runtime.calls["m_adpcm2.target"] ? runtime.calls["m_adpcm2.target"]() : (members.m_adpcm2) != null ? (typeof (runtime.dereference(members.m_adpcm2)).target === 'function' ? (runtime.dereference(members.m_adpcm2)).target() : typeof (runtime.dereference(members.m_adpcm2)).target === 'number' || typeof (runtime.dereference(members.m_adpcm2)).target === 'boolean' ? (runtime.dereference(members.m_adpcm2)).target : runtime.container(members.m_adpcm2, "target")) : (runtime.calls["target"]?.() ?? 0))) : ((runtime.calls["m_adpcm1.target"] ? runtime.calls["m_adpcm1.target"]() : (members.m_adpcm1) != null ? (typeof (runtime.dereference(members.m_adpcm1)).target === 'function' ? (runtime.dereference(members.m_adpcm1)).target() : typeof (runtime.dereference(members.m_adpcm1)).target === 'number' || typeof (runtime.dereference(members.m_adpcm1)).target === 'boolean' ? (runtime.dereference(members.m_adpcm1)).target : runtime.container(members.m_adpcm1, "target")) : (runtime.calls["target"]?.() ?? 0))));
    if ((runtime.same(adpcm, 0) ? 0 : 1)) {
      (runtime.calls["adpcm.data_w"] ? runtime.calls["adpcm.data_w"](data) : (adpcm) != null ? ((runtime.dereference(adpcm)).data_w?.(data) ?? 0) : (runtime.calls["data_w"]?.(data) ?? 0));
    }
  }

  function method_get_kungfum_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = 0;
    let color: any = 0;
    let flags: any = 0;
    code = runtime.readIndex((members.m_m62_tileram ?? runtime.member("m_m62_tileram")), tile_index);
    color = runtime.readIndex((members.m_m62_tileram ?? runtime.member("m_m62_tileram")), ((tile_index) + (2048)));
    flags = 0;
    if (((color) & (32))) {
      flags = ((flags) | (1));
    }
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags) ?? 0) : (runtime.calls["set"]?.(0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags) ?? 0));
    if ((((((Number(runtime.divide(tile_index, 64)) < Number(6)) ? 1 : 0)) || (((Number(((((color) & (31))) >>> (1))) > Number(12)) ? 1 : 0))) ? 1 : 0)) {
      tileinfo.category = 1;
    } else {
      tileinfo.category = 0;
    }
  }
  return {
    "m62_hscroll_low_w": method_m62_hscroll_low_w,
    "m62_hscroll_high_w": method_m62_hscroll_high_w,
    "kungfum_tileram_w": method_kungfum_tileram_w,
    "m62_tileram_w": method_m62_tileram_w,
    "m62_adpcm_w": method_m62_adpcm_w,
    "get_kungfum_bg_tile_info": method_get_kungfum_bg_tile_info
  };
})();
    return {
      "m62_state.m62_hscroll_low_w": methods["m62_hscroll_low_w"],
      "m62_state.m62_hscroll_high_w": methods["m62_hscroll_high_w"],
      "m62_state.kungfum_tileram_w": methods["kungfum_tileram_w"],
      "m62_state.m62_tileram_w": methods["m62_tileram_w"],
      "m62_state.get_kungfum_bg_tile_info": methods["get_kungfum_bg_tile_info"],
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
