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
                let ret = ((64) & 0xff);
                ret = ((((ret) | ((runtime.calls["m_ctrl1.read_bit0"] ? runtime.calls["m_ctrl1.read_bit0"]() : (members.m_ctrl1) != null ? (typeof (runtime.dereference(members.m_ctrl1)).read_bit0 === 'function' ? (runtime.dereference(members.m_ctrl1)).read_bit0() : typeof (runtime.dereference(members.m_ctrl1)).read_bit0 === 'number' || typeof (runtime.dereference(members.m_ctrl1)).read_bit0 === 'boolean' ? (runtime.dereference(members.m_ctrl1)).read_bit0 : runtime.container(members.m_ctrl1, "read_bit0")) : (runtime.calls["read_bit0"]?.() ?? 0))))) & 0xff);
                ret = ((((ret) | ((runtime.calls["m_ctrl1.read_bit34"] ? runtime.calls["m_ctrl1.read_bit34"]() : (members.m_ctrl1) != null ? (typeof (runtime.dereference(members.m_ctrl1)).read_bit34 === 'function' ? (runtime.dereference(members.m_ctrl1)).read_bit34() : typeof (runtime.dereference(members.m_ctrl1)).read_bit34 === 'number' || typeof (runtime.dereference(members.m_ctrl1)).read_bit34 === 'boolean' ? (runtime.dereference(members.m_ctrl1)).read_bit34 : runtime.container(members.m_ctrl1, "read_bit34")) : (runtime.calls["read_bit34"]?.() ?? 0))))) & 0xff);
                return ret;
            }
            function method_nes_in0_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_ctrl1.write"] ? runtime.calls["m_ctrl1.write"](data) : (members.m_ctrl1) != null ? ((runtime.dereference(members.m_ctrl1)).write?.(data) ?? 0) : (runtime.calls["write"]?.(data) ?? 0));
                (runtime.calls["m_ctrl2.write"] ? runtime.calls["m_ctrl2.write"](data) : (members.m_ctrl2) != null ? ((runtime.dereference(members.m_ctrl2)).write?.(data) ?? 0) : (runtime.calls["write"]?.(data) ?? 0));
            }
            function method_nes_in1_r(runtime) {
                const members = runtime.members;
                let ret = ((64) & 0xff);
                ret = ((((ret) | ((runtime.calls["m_ctrl2.read_bit0"] ? runtime.calls["m_ctrl2.read_bit0"]() : (members.m_ctrl2) != null ? (typeof (runtime.dereference(members.m_ctrl2)).read_bit0 === 'function' ? (runtime.dereference(members.m_ctrl2)).read_bit0() : typeof (runtime.dereference(members.m_ctrl2)).read_bit0 === 'number' || typeof (runtime.dereference(members.m_ctrl2)).read_bit0 === 'boolean' ? (runtime.dereference(members.m_ctrl2)).read_bit0 : runtime.container(members.m_ctrl2, "read_bit0")) : (runtime.calls["read_bit0"]?.() ?? 0))))) & 0xff);
                ret = ((((ret) | ((runtime.calls["m_ctrl2.read_bit34"] ? runtime.calls["m_ctrl2.read_bit34"]() : (members.m_ctrl2) != null ? (typeof (runtime.dereference(members.m_ctrl2)).read_bit34 === 'function' ? (runtime.dereference(members.m_ctrl2)).read_bit34() : typeof (runtime.dereference(members.m_ctrl2)).read_bit34 === 'number' || typeof (runtime.dereference(members.m_ctrl2)).read_bit34 === 'boolean' ? (runtime.dereference(members.m_ctrl2)).read_bit34 : runtime.container(members.m_ctrl2, "read_bit34")) : (runtime.calls["read_bit34"]?.() ?? 0))))) & 0xff);
                return ret;
            }
            function method_screen_update_nes(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["m_ppu.render"] ? runtime.calls["m_ppu.render"](bitmap, 0, 0, 0, 0, cliprect) : (members.m_ppu) != null ? ((runtime.dereference(members.m_ppu)).render?.(bitmap, 0, 0, 0, 0, cliprect) ?? 0) : (runtime.calls["render"]?.(bitmap, 0, 0, 0, 0, cliprect) ?? 0));
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
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
