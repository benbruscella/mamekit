// GENERATED executable machine composition from src/mame/konami/pooyan.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'pooyan');
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
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index);
                let code = runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index);
                let color = ((attr) & (15));
                let flags = (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((attr) >>> (6))) : runtime.macro("TILE_FLIPYX", ((attr) >>> (6))));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (runtime.calls["set"]?.(0, code, color, flags) ?? 0));
            }
            function method_irq_enable_w(runtime, state) {
                const members = runtime.members;
                members.m_irq_enable = ((state) & 0xff);
                if ((((members.m_irq_enable ?? runtime.member("m_irq_enable"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                if ((((state) && ((members.m_irq_enable ?? runtime.member("m_irq_enable")))) ? 1 : 0)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 1) ?? 0));
                }
            }
            return {
                "colorram_w": method_colorram_w,
                "videoram_w": method_videoram_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "irq_enable_w": method_irq_enable_w,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "pooyan_state.colorram_w": methods["colorram_w"],
            "pooyan_state.videoram_w": methods["videoram_w"],
            "pooyan_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "pooyan_state.irq_enable_w": methods["irq_enable_w"],
            "pooyan_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
