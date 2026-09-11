// GENERATED executable machine composition from src/mame/konami/timeplt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'timeplt');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_scanline_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0);
            }
            function method___inline_main_map_c300_lw8(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_mainlatch.write_d0"] ? __l["m_mainlatch.write_d0"](((offset) >>> (1)), data) : (members.m_mainlatch) != null ? ((runtime.dereference(members.m_mainlatch)).write_d0?.(((offset) >>> (1)), data) ?? 0) : 0);
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let attr = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
                let code = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((8) * (((attr) & (32)))))) | 0);
                let color = ((((attr) & (31))) | 0);
                let flags = (((__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((attr) >>> (6))) : runtime.macro("TILE_FLIPYX", ((attr) >>> (6))))) | 0);
                tileinfo.category = ((((attr) & (16))) >>> (4));
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (__l["set"]?.(0, code, color, flags) ?? 0));
            }
            function method_nmi_enable_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_nmi_enable = ((state) & 0xff);
                if ((((members.m_nmi_enable ?? runtime.member("m_nmi_enable"))) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : 0);
                }
            }
            function method_video_enable_w(runtime, state) {
                const members = runtime.members;
                members.m_video_enable = ((state) ? 1 : 0);
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && ((members.m_nmi_enable ?? runtime.member("m_nmi_enable")))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : 0);
                }
            }
            return {
                "colorram_w": method_colorram_w,
                "videoram_w": method_videoram_w,
                "scanline_r": method_scanline_r,
                "__inline_main_map_c300_lw8": method___inline_main_map_c300_lw8,
                "get_tile_info": method_get_tile_info,
                "nmi_enable_w": method_nmi_enable_w,
                "video_enable_w": method_video_enable_w,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "timeplt_state.colorram_w": methods["colorram_w"],
            "timeplt_state.videoram_w": methods["videoram_w"],
            "timeplt_state.scanline_r": methods["scanline_r"],
            "timeplt_state.__inline_main_map_c300_lw8": methods["__inline_main_map_c300_lw8"],
            "timeplt_state.get_tile_info": methods["get_tile_info"],
            "timeplt_state.nmi_enable_w": methods["nmi_enable_w"],
            "timeplt_state.video_enable_w": methods["video_enable_w"],
            "timeplt_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "m_bg_tilemap.mark_tile_dirty", "m_maincpu.set_input_line", "m_mainlatch.write_d0", "m_screen.vpos", "mark_tile_dirty", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
