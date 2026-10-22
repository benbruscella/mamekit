// GENERATED executable machine composition from src/mame/nintendo/nes.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'nes');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_nes_in0_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((64) & 0xff);
                ret = ((((ret) | ((__l["m_ctrl1.read_bit0"] ?? runtime.memberCall(members.m_ctrl1, "read_bit0", 0, undefined))()))) & 0xff);
                ret = ((((ret) | ((__l["m_ctrl1.read_bit34"] ?? runtime.memberCall(members.m_ctrl1, "read_bit34", 0, undefined))()))) & 0xff);
                return ret;
            }
            function method_nes_in0_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ctrl1.write"] ?? runtime.memberCall(members.m_ctrl1, "write", 0, undefined))(data);
                (__l["m_ctrl2.write"] ?? runtime.memberCall(members.m_ctrl2, "write", 0, undefined))(data);
            }
            function method_nes_in1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((64) & 0xff);
                ret = ((((ret) | ((__l["m_ctrl2.read_bit0"] ?? runtime.memberCall(members.m_ctrl2, "read_bit0", 0, undefined))()))) & 0xff);
                ret = ((((ret) | ((__l["m_ctrl2.read_bit34"] ?? runtime.memberCall(members.m_ctrl2, "read_bit34", 0, undefined))()))) & 0xff);
                return ret;
            }
            function method_screen_update_nes(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ppu.render"] ?? runtime.memberCall(members.m_ppu, "render", 0, undefined))(bitmap, 0, 0, 0, 0, cliprect);
                return 0;
            }
            return {
                "nes_in0_r": method_nes_in0_r,
                "nes_in0_w": method_nes_in0_w,
                "nes_in1_r": method_nes_in1_r,
                "screen_update_nes": method_screen_update_nes
            };
        })();
        return {
            "nes_state.nes_in0_r": methods["nes_in0_r"],
            "nes_state.nes_in0_w": methods["nes_in0_w"],
            "nes_state.nes_in1_r": methods["nes_in1_r"],
            "nes_state.screen_update_nes": methods["screen_update_nes"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_ctrl1.read_bit0", "m_ctrl1.read_bit34", "m_ctrl1.write", "m_ctrl2.read_bit0", "m_ctrl2.read_bit34", "m_ctrl2.write", "m_ppu.render"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
