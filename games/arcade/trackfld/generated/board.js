// GENERATED executable machine composition from src/mame/konami/trackfld.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'trackfld');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_trackfld_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
            }
            function method_trackfld_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
            }
            function method_konami_SN76489a_latch_w(runtime, data) {
                const members = runtime.members;
                members.m_SN76489a_latch = ((data) & 0xff);
            }
            function method_konami_SN76489a_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_sn.write"] ?? runtime.memberCall(members.m_sn, "write", 0, undefined))((members.m_SN76489a_latch ?? runtime.member("m_SN76489a_latch")));
            }
            function method_trackfld_sh_timer_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let clock = ((runtime.divide((__l["m_audiocpu.total_cycles"] ?? runtime.memberCall(members.m_audiocpu, "total_cycles", 0, undefined))(), 1024)) >>> 0);
                return ((clock) & (15));
            }
            function method_trackfld_SN76489a_r(runtime) {
                const members = runtime.members;
                (runtime.overrides["konami_SN76489a_w"] ? runtime.overrides["konami_SN76489a_w"](0) : method_konami_SN76489a_w(runtime, 0));
                return 255;
            }
            function method_trackfld_speech_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((__l["m_vlm.bsy_r"] ?? runtime.memberCall(members.m_vlm, "bsy_r", 0, undefined))()) ? (16) : (0));
            }
            function method_trackfld_sound_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_vlm.st_w"] ?? runtime.memberCall(members.m_vlm, "st_w", 0, undefined))((((offset) >>> (8)) & 1));
                (__l["m_vlm.rst_w"] ?? runtime.memberCall(members.m_vlm, "rst_w", 0, undefined))((((offset) >>> (9)) & 1));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let attr = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
                let code = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((4) * (((attr) & (192)))))) | 0);
                let color = ((((attr) & (15))) | 0);
                let flags = ((((((((attr) & (16))) ? (1) : (0))) | (((((attr) & (32))) ? (2) : (0))))) | 0);
                if ((members.m_bg_bank ?? runtime.member("m_bg_bank"))) {
                    code = ((((code) | (1024))) | 0);
                }
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, code, color, flags);
            }
            function method_sh_irqtrigger_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((((((members.m_last_irq ?? runtime.member("m_last_irq"))) ? 0 : 1)) && (state)) ? 1 : 0)) {
                    (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 2);
                }
                members.m_last_irq = state;
            }
            function method_irq_mask_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_irq_mask = ((state) ? 1 : 0);
                if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_screen_update_trackfld(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
                const h_m_scroll2 = members.m_scroll2 ?? runtime.member("m_scroll2");
                let row = ((0) | 0);
                let scrollx = ((0) | 0);
                for (row = ((0) | 0); ((Number(row) < Number(32)) ? 1 : 0); row = ((((row) + (1))) | 0)) {
                    scrollx = ((runtime.add(runtime.readIndex(h_m_scroll, row), ((256) * (((runtime.readIndex(h_m_scroll2, row)) & (1)))))) | 0);
                    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                        scrollx = (((-scrollx)) | 0);
                    }
                    (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(row, scrollx);
                }
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                runtime.invoke("draw_sprites", bitmap, cliprect);
                return 0;
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
                }
            }
            return {
                "trackfld_videoram_w": method_trackfld_videoram_w,
                "trackfld_colorram_w": method_trackfld_colorram_w,
                "konami_SN76489a_latch_w": method_konami_SN76489a_latch_w,
                "konami_SN76489a_w": method_konami_SN76489a_w,
                "trackfld_sh_timer_r": method_trackfld_sh_timer_r,
                "trackfld_SN76489a_r": method_trackfld_SN76489a_r,
                "trackfld_speech_r": method_trackfld_speech_r,
                "trackfld_sound_w": method_trackfld_sound_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "sh_irqtrigger_w": method_sh_irqtrigger_w,
                "irq_mask_w": method_irq_mask_w,
                "screen_update_trackfld": method_screen_update_trackfld,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "trackfld_state.trackfld_videoram_w": methods["trackfld_videoram_w"],
            "trackfld_state.trackfld_colorram_w": methods["trackfld_colorram_w"],
            "trackfld_state.konami_SN76489a_latch_w": methods["konami_SN76489a_latch_w"],
            "trackfld_state.konami_SN76489a_w": methods["konami_SN76489a_w"],
            "trackfld_state.trackfld_SN76489a_r": methods["trackfld_SN76489a_r"],
            "trackfld_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "trackfld_state.irq_mask_w": methods["irq_mask_w"],
            "trackfld_state.screen_update_trackfld": methods["screen_update_trackfld"],
            "trackfld_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw", "flip_screen", "m_audiocpu.set_input_line", "m_audiocpu.total_cycles", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_maincpu.set_input_line", "m_sn.write", "m_vlm.bsy_r", "m_vlm.rst_w", "m_vlm.st_w", "mark_tile_dirty", "set", "set_scrollx", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
