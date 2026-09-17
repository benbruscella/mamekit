// GENERATED executable machine composition from src/mame/irem/m62.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
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
            function method_m62_hscroll_low_w(runtime, data) {
                const members = runtime.members;
                members.m_m62_background_hscroll = (((((((members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll"))) & (65280))) | (data))) | 0);
            }
            function method_m62_hscroll_high_w(runtime, data) {
                const members = runtime.members;
                members.m_m62_background_hscroll = (((((((members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll"))) & (255))) | (((data) << (8))))) | 0);
            }
            function method_kungfum_tileram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](((offset) & (2047))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) & (2047))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) & (2047))) ?? 0));
            }
            function method_m62_tileram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](((offset) >>> (1))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) >>> (1))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) >>> (1))) ?? 0));
            }
            function method_m62_adpcm_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let adpcm = ((((offset) & (1))) ? ((__l["m_adpcm2.target"] ? __l["m_adpcm2.target"]() : (members.m_adpcm2) != null ? (typeof (runtime.dereference(members.m_adpcm2)).target === 'function' ? (runtime.dereference(members.m_adpcm2)).target() : typeof (runtime.dereference(members.m_adpcm2)).target === 'number' || typeof (runtime.dereference(members.m_adpcm2)).target === 'boolean' ? (runtime.dereference(members.m_adpcm2)).target : runtime.container(members.m_adpcm2, "target")) : 0)) : ((__l["m_adpcm1.target"] ? __l["m_adpcm1.target"]() : (members.m_adpcm1) != null ? (typeof (runtime.dereference(members.m_adpcm1)).target === 'function' ? (runtime.dereference(members.m_adpcm1)).target() : typeof (runtime.dereference(members.m_adpcm1)).target === 'number' || typeof (runtime.dereference(members.m_adpcm1)).target === 'boolean' ? (runtime.dereference(members.m_adpcm1)).target : runtime.container(members.m_adpcm1, "target")) : 0)));
                if (((adpcm) ? 1 : 0)) {
                    (__l["adpcm.data_w"] ? __l["adpcm.data_w"](data) : (adpcm) != null ? ((runtime.dereference(adpcm)).data_w?.(data) ?? 0) : (__l["data_w"]?.(data) ?? 0));
                }
            }
            function method_get_kungfum_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let code = ((0) | 0);
                let color = ((0) | 0);
                let flags = ((0) | 0);
                code = ((runtime.readIndex((members.m_m62_tileram ?? runtime.member("m_m62_tileram")), tile_index)) | 0);
                color = ((runtime.readIndex((members.m_m62_tileram ?? runtime.member("m_m62_tileram")), ((tile_index) + (2048)))) | 0);
                flags = ((0) | 0);
                if (((color) & (32))) {
                    flags = ((((flags) | (1))) | 0);
                }
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags) ?? 0) : (__l["set"]?.(0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags) ?? 0));
                if ((((((Number(runtime.divide(tile_index, 64)) < Number(6)) ? 1 : 0)) || (((Number(((((color) & (31))) >>> (1))) > Number(12)) ? 1 : 0))) ? 1 : 0)) {
                    tileinfo.category = 1;
                }
                else {
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
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adpcm.data_w", "data_w", "m_adpcm1.target", "m_adpcm2.target", "m_bg_tilemap.mark_tile_dirty", "mark_tile_dirty", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
