// GENERATED executable machine composition from src/mame/konami/rocnrope.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rocnrope');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_interrupt_vector_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_vectors"), offset, data);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index);
                let code = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((2) * (((attr) & (128)))));
                let color = ((attr) & (15));
                let flags = ((((((attr) & (64))) ? (1) : (0))) | (((((attr) & (32))) ? (2) : (0))));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, flags) ?? 0) : (runtime.calls["set"]?.(1, code, color, flags) ?? 0));
            }
            function method_irq_mask_w(runtime, state) {
                const members = runtime.members;
                members.m_irq_mask = ((state) & 0xff);
                if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                }
            }
            return {
                "colorram_w": method_colorram_w,
                "videoram_w": method_videoram_w,
                "interrupt_vector_w": method_interrupt_vector_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "irq_mask_w": method_irq_mask_w,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "rocnrope_state.colorram_w": methods["colorram_w"],
            "rocnrope_state.videoram_w": methods["videoram_w"],
            "rocnrope_state.interrupt_vector_w": methods["interrupt_vector_w"],
            "rocnrope_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "rocnrope_state.irq_mask_w": methods["irq_mask_w"],
            "rocnrope_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
