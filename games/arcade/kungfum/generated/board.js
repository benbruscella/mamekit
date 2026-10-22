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
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(((offset) & (2047)));
            }
            function method_m62_tileram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.shiftRight(offset, 1));
            }
            function method_m62_adpcm_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let adpcm = ((((offset) & (1))) ? ((__l["m_adpcm2.target"] ?? runtime.memberCall(members.m_adpcm2, "target", 0, undefined))()) : ((__l["m_adpcm1.target"] ?? runtime.memberCall(members.m_adpcm1, "target", 0, undefined))()));
                if (((adpcm) ? 1 : 0)) {
                    (__l["adpcm.data_w"] ?? runtime.memberCall(adpcm, "data_w", 0, __l["data_w"]))(data);
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
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags);
                if ((((((Number(runtime.divide(tile_index, 64)) < Number(6)) ? 1 : 0)) || (((Number(runtime.shiftRight(((color) & (31)), 1)) > Number(12)) ? 1 : 0))) ? 1 : 0)) {
                    tileinfo.category = 1;
                }
                else {
                    tileinfo.category = 0;
                }
            }
            function method_screen_update_kungfum(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let i = ((0) | 0);
                for (i = ((0) | 0); ((Number(i) < Number(6)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(i, 0);
                }
                for (i = ((6) | 0); ((Number(i) < Number(32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(i, (members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll")));
                }
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                runtime.invoke("draw_sprites", bitmap, cliprect, 31, 0, 0);
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 1, 0);
                return 0;
            }
            function method_m6803_port1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (8))) {
                    return (__l["m_ay_45M.data_r"] ?? runtime.memberCall(members.m_ay_45M, "data_r", 0, undefined))();
                }
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (16))) {
                    return (__l["m_ay_45L.data_r"] ?? runtime.memberCall(members.m_ay_45L, "data_r", 0, undefined))();
                }
                return 255;
            }
            function method_m6803_port2_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            function method_soundlatch_r(runtime) {
                const members = runtime.members;
                return (members.m_soundlatch ?? runtime.member("m_soundlatch"));
            }
            return {
                "m62_hscroll_low_w": method_m62_hscroll_low_w,
                "m62_hscroll_high_w": method_m62_hscroll_high_w,
                "kungfum_tileram_w": method_kungfum_tileram_w,
                "m62_tileram_w": method_m62_tileram_w,
                "m62_adpcm_w": method_m62_adpcm_w,
                "get_kungfum_bg_tile_info": method_get_kungfum_bg_tile_info,
                "screen_update_kungfum": method_screen_update_kungfum,
                "m6803_port1_r": method_m6803_port1_r,
                "m6803_port2_r": method_m6803_port2_r,
                "soundlatch_r": method_soundlatch_r
            };
        })();
        return {
            "m62_state.m62_hscroll_low_w": methods["m62_hscroll_low_w"],
            "m62_state.m62_hscroll_high_w": methods["m62_hscroll_high_w"],
            "m62_state.kungfum_tileram_w": methods["kungfum_tileram_w"],
            "m62_state.m62_tileram_w": methods["m62_tileram_w"],
            "m62_state.get_kungfum_bg_tile_info": methods["get_kungfum_bg_tile_info"],
            "m62_state.screen_update_kungfum": methods["screen_update_kungfum"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adpcm.data_w", "data_w", "draw", "m_adpcm1.target", "m_adpcm2.target", "m_ay_45L.data_r", "m_ay_45M.data_r", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "mark_tile_dirty", "set", "set_scrollx", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
