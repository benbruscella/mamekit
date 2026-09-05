// GENERATED executable machine composition from src/mame/taito/bublbobl.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bublbobl');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_common_sound_semaphores_r(runtime: any) {
    const members = runtime.members;
    let ret: any = ((252) & 0xff);
    ret = ((((ret) | ((((runtime.calls["m_main_to_sound.pending_r"] ? runtime.calls["m_main_to_sound.pending_r"]() : (members.m_main_to_sound) != null ? (typeof (runtime.dereference(members.m_main_to_sound)).pending_r === 'function' ? (runtime.dereference(members.m_main_to_sound)).pending_r() : typeof (runtime.dereference(members.m_main_to_sound)).pending_r === 'number' || typeof (runtime.dereference(members.m_main_to_sound)).pending_r === 'boolean' ? (runtime.dereference(members.m_main_to_sound)).pending_r : runtime.container(members.m_main_to_sound, "pending_r")) : (runtime.calls["pending_r"]?.() ?? 0))) ? (2) : (0))))) & 0xff);
    ret = ((((ret) | ((((runtime.calls["m_sound_to_main.pending_r"] ? runtime.calls["m_sound_to_main.pending_r"]() : (members.m_sound_to_main) != null ? (typeof (runtime.dereference(members.m_sound_to_main)).pending_r === 'function' ? (runtime.dereference(members.m_sound_to_main)).pending_r() : typeof (runtime.dereference(members.m_sound_to_main)).pending_r === 'number' || typeof (runtime.dereference(members.m_sound_to_main)).pending_r === 'boolean' ? (runtime.dereference(members.m_sound_to_main)).pending_r : runtime.container(members.m_sound_to_main, "pending_r")) : (runtime.calls["pending_r"]?.() ?? 0))) ? (1) : (0))))) & 0xff);
    return ret;
  }

  function method_bublbobl_soundcpu_reset_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.overrides["common_sreset"] ? runtime.overrides["common_sreset"](((data) ? (1) : (0))) : method_common_sreset(runtime, ((data) ? (1) : (0))));
  }

  function method_common_sreset(runtime: any, state: any) {
    const members = runtime.members;
    const h_m_ym2203 = members.m_ym2203 ?? runtime.member("m_ym2203");
    const h_m_ym3526 = members.m_ym3526 ?? runtime.member("m_ym3526");
    if ((((((Number(state) !== Number(0)) ? 1 : 0)) && ((((members.m_sreset_old ?? runtime.member("m_sreset_old"))) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(h_m_ym2203) !== Number(0)) ? 1 : 0)) {
        (runtime.calls["m_ym2203.reset"] ? runtime.calls["m_ym2203.reset"]() : (members.m_ym2203) != null ? (typeof (runtime.dereference(members.m_ym2203)).reset === 'function' ? (runtime.dereference(members.m_ym2203)).reset() : typeof (runtime.dereference(members.m_ym2203)).reset === 'number' || typeof (runtime.dereference(members.m_ym2203)).reset === 'boolean' ? (runtime.dereference(members.m_ym2203)).reset : runtime.container(members.m_ym2203, "reset")) : (runtime.calls["reset"]?.() ?? 0));
      }
      if (((Number(h_m_ym3526) !== Number(0)) ? 1 : 0)) {
        (runtime.calls["m_ym3526.reset"] ? runtime.calls["m_ym3526.reset"]() : (members.m_ym3526) != null ? (typeof (runtime.dereference(members.m_ym3526)).reset === 'function' ? (runtime.dereference(members.m_ym3526)).reset() : typeof (runtime.dereference(members.m_ym3526)).reset === 'number' || typeof (runtime.dereference(members.m_ym3526)).reset === 'boolean' ? (runtime.dereference(members.m_ym3526)).reset : runtime.container(members.m_ym3526, "reset")) : (runtime.calls["reset"]?.() ?? 0));
      }
      (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
      (runtime.calls["m_sound_to_main.acknowledge_w"] ? runtime.calls["m_sound_to_main.acknowledge_w"]() : (members.m_sound_to_main) != null ? (typeof (runtime.dereference(members.m_sound_to_main)).acknowledge_w === 'function' ? (runtime.dereference(members.m_sound_to_main)).acknowledge_w() : typeof (runtime.dereference(members.m_sound_to_main)).acknowledge_w === 'number' || typeof (runtime.dereference(members.m_sound_to_main)).acknowledge_w === 'boolean' ? (runtime.dereference(members.m_sound_to_main)).acknowledge_w : runtime.container(members.m_sound_to_main, "acknowledge_w")) : (runtime.calls["acknowledge_w"]?.() ?? 0));
      (runtime.calls["m_soundnmi.in_w_0"] ? runtime.calls["m_soundnmi.in_w_0"](0) : (members.m_soundnmi) != null ? ((runtime.dereference(members.m_soundnmi)).in_w_0?.(0) ?? 0) : (runtime.calls["in_w_0"]?.(0) ?? 0));
    }
    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](-2, state) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(-2, state) ?? 0) : (runtime.calls["set_input_line"]?.(-2, state) ?? 0));
    members.m_sreset_old = ((((Number(1) === Number(state)) ? 1 : 0)) | 0);
  }

  function method_bublbobl_nmitrigger_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_subcpu.pulse_input_line"] ? runtime.calls["m_subcpu.pulse_input_line"](-1, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).pulse_input_line?.(-1, 0) ?? 0) : (runtime.calls["pulse_input_line"]?.(-1, 0) ?? 0));
  }

  function method_mcram_vect_r(runtime: any, irqline: any) {
    const members = runtime.members;
    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    return runtime.readIndex((members.m_mcu_sharedram ?? runtime.member("m_mcu_sharedram")), 0);
  }

  function method_bublbobl_mcu_port3_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_port3_out = ((data) & 0xff);
  }

  function method_bublbobl_mcu_port3_r(runtime: any) {
    const members = runtime.members;
    return (members.m_port3_in ?? runtime.member("m_port3_in"));
  }

  function method_bublbobl_mcu_port4_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_port4_out = ((data) & 0xff);
  }
  return {
    "common_sound_semaphores_r": method_common_sound_semaphores_r,
    "bublbobl_soundcpu_reset_w": method_bublbobl_soundcpu_reset_w,
    "common_sreset": method_common_sreset,
    "bublbobl_nmitrigger_w": method_bublbobl_nmitrigger_w,
    "mcram_vect_r": method_mcram_vect_r,
    "bublbobl_mcu_port3_w": method_bublbobl_mcu_port3_w,
    "bublbobl_mcu_port3_r": method_bublbobl_mcu_port3_r,
    "bublbobl_mcu_port4_w": method_bublbobl_mcu_port4_w
  };
})();
    return {
      "bublbobl_state.common_sound_semaphores_r": methods["common_sound_semaphores_r"],
      "bublbobl_state.bublbobl_soundcpu_reset_w": methods["bublbobl_soundcpu_reset_w"],
      "bublbobl_state.common_sreset": methods["common_sreset"],
      "bublbobl_state.bublbobl_nmitrigger_w": methods["bublbobl_nmitrigger_w"],
      "bublbobl_state.mcram_vect_r": methods["mcram_vect_r"],
      "bublbobl_state.bublbobl_mcu_port3_w": methods["bublbobl_mcu_port3_w"],
      "bublbobl_state.bublbobl_mcu_port3_r": methods["bublbobl_mcu_port3_r"],
      "bublbobl_state.bublbobl_mcu_port4_w": methods["bublbobl_mcu_port4_w"],
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
