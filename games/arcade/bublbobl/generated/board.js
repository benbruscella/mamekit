// GENERATED executable machine composition from src/mame/taito/bublbobl.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
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
            function method_common_sound_semaphores_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((252) & 0xff);
                ret = ((((ret) | ((((__l["m_main_to_sound.pending_r"] ?? runtime.memberCall(members.m_main_to_sound, "pending_r", 0, undefined))()) ? (2) : (0))))) & 0xff);
                ret = ((((ret) | ((((__l["m_sound_to_main.pending_r"] ?? runtime.memberCall(members.m_sound_to_main, "pending_r", 0, undefined))()) ? (1) : (0))))) & 0xff);
                return ret;
            }
            function method_bublbobl_soundcpu_reset_w(runtime, data) {
                const members = runtime.members;
                (runtime.overrides["common_sreset"] ? runtime.overrides["common_sreset"](((data) ? (1) : (0))) : method_common_sreset(runtime, ((data) ? (1) : (0))));
            }
            function method_common_sreset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_ym2203 = members.m_ym2203 ?? runtime.member("m_ym2203");
                const h_m_ym3526 = members.m_ym3526 ?? runtime.member("m_ym3526");
                if ((((((Number(state) !== Number(0)) ? 1 : 0)) && ((((members.m_sreset_old ?? runtime.member("m_sreset_old"))) ? 0 : 1))) ? 1 : 0)) {
                    if (((Number(h_m_ym2203) !== Number(0)) ? 1 : 0)) {
                        (__l["m_ym2203.reset"] ?? runtime.memberCall(members.m_ym2203, "reset", 0, undefined))();
                    }
                    if (((Number(h_m_ym3526) !== Number(0)) ? 1 : 0)) {
                        (__l["m_ym3526.reset"] ?? runtime.memberCall(members.m_ym3526, "reset", 0, undefined))();
                    }
                    (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 0);
                    (__l["m_sound_to_main.acknowledge_w"] ?? runtime.memberCall(members.m_sound_to_main, "acknowledge_w", 0, undefined))();
                    (__l["m_soundnmi.in_w_0"] ?? runtime.memberCall(members.m_soundnmi, "in_w_0", 0, undefined))(0);
                }
                (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, state);
                members.m_sreset_old = ((((Number(1) === Number(state)) ? 1 : 0)) | 0);
            }
            function method_bublbobl_nmitrigger_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_subcpu.pulse_input_line"] ?? runtime.memberCall(members.m_subcpu, "pulse_input_line", 0, undefined))(-1, 0);
            }
            function method_mcram_vect_r(runtime, irqline) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                return runtime.readIndex((members.m_mcu_sharedram ?? runtime.member("m_mcu_sharedram")), 0);
            }
            function method_bublbobl_mcu_port3_w(runtime, data) {
                const members = runtime.members;
                members.m_port3_out = ((data) & 0xff);
            }
            function method_bublbobl_mcu_port3_r(runtime) {
                const members = runtime.members;
                return (members.m_port3_in ?? runtime.member("m_port3_in"));
            }
            function method_bublbobl_mcu_port4_w(runtime, data) {
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
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_audiocpu.set_input_line", "m_main_to_sound.pending_r", "m_maincpu.set_input_line", "m_sound_to_main.acknowledge_w", "m_sound_to_main.pending_r", "m_soundnmi.in_w_0", "m_subcpu.pulse_input_line", "m_ym2203.reset", "m_ym3526.reset"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
