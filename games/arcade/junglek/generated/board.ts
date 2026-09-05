// GENERATED executable machine composition from src/mame/taito/taitosj.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'junglek');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_characterram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(runtime.readIndex((members.m_characterram ?? runtime.member("m_characterram")), offset)) !== Number(data)) ? 1 : 0)) {
      if (((Number(offset) < Number(6144)) ? 1 : 0)) {
        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).mark_dirty?.(((runtime.divide(offset, 8)) & (255))) ?? 0);
        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).mark_dirty?.(((runtime.divide(offset, 32)) & (63))) ?? 0);
      } else {
        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : (runtime.calls["gfx"]?.(2) ?? 0)))).mark_dirty?.(((runtime.divide(offset, 8)) & (255))) ?? 0);
        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](3) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(3) ?? 0) : (runtime.calls["gfx"]?.(3) ?? 0)))).mark_dirty?.(((runtime.divide(offset, 32)) & (63))) ?? 0);
      }
      runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
    }
  }

  function method_fake_data_r(runtime: any) {
    const members = runtime.members;
    0;
    return 0;
  }

  function method_fake_data_w(runtime: any, data: any) {
    const members = runtime.members;
    0;
  }

  function method_fake_status_r(runtime: any) {
    const members = runtime.members;
    0;
    return 255;
  }

  function method_collision_reg_clear_w(runtime: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 0, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 1, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 2, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 3, 0);
  }

  function method_soundlatch_flags_r(runtime: any) {
    const members = runtime.members;
    return (((((((members.m_soundlatch_flag ?? runtime.member("m_soundlatch_flag"))) ? (8) : (0))) | ((((members.m_sound_semaphore2 ?? runtime.member("m_sound_semaphore2"))) ? (4) : (0))))) | (3));
  }

  function method_input_port_4_f0_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_input_port_4_f0 = ((((data) >>> (4))) & 0xff);
  }
  return {
    "characterram_w": method_characterram_w,
    "fake_data_r": method_fake_data_r,
    "fake_data_w": method_fake_data_w,
    "fake_status_r": method_fake_status_r,
    "collision_reg_clear_w": method_collision_reg_clear_w,
    "soundlatch_flags_r": method_soundlatch_flags_r,
    "input_port_4_f0_w": method_input_port_4_f0_w
  };
})();
    return {
      "taitosj_state.characterram_w": methods["characterram_w"],
      "taitosj_state.fake_data_r": methods["fake_data_r"],
      "taitosj_state.fake_data_w": methods["fake_data_w"],
      "taitosj_state.fake_status_r": methods["fake_status_r"],
      "taitosj_state.collision_reg_clear_w": methods["collision_reg_clear_w"],
      "taitosj_state.soundlatch_flags_r": methods["soundlatch_flags_r"],
      "taitosj_state.input_port_4_f0_w": methods["input_port_4_f0_w"],
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
