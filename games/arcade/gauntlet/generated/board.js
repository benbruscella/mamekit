// GENERATED executable machine composition from src/mame/atari/gauntlet.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gauntlet');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_video_int_ack_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(4, 0);
            }
            function method_yscroll_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_yscroll = members.m_yscroll ?? runtime.member("m_yscroll");
                let oldyscroll = ((runtime.dereference(h_m_yscroll)) & 0xffff);
                runtime.combineData(h_m_yscroll, data, mem_mask);
                if (((Number(runtime.dereference(h_m_yscroll)) !== Number(oldyscroll)) ? 1 : 0)) {
                    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                    if (((Number((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) !== Number(((runtime.dereference(h_m_yscroll)) & (3)))) ? 1 : 0)) {
                        members.m_playfield_tile_bank = ((((runtime.dereference(h_m_yscroll)) & (3))) & 0xff);
                        (__l["m_playfield_tilemap.mark_all_dirty"] ?? runtime.memberCall(members.m_playfield_tilemap, "mark_all_dirty", 0, undefined))();
                    }
                    (__l["m_playfield_tilemap.set_scrolly"] ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrolly", 0, undefined))(0, runtime.shiftRight(runtime.dereference(h_m_yscroll), 7));
                    (__l["m_mob.set_yscroll"] ?? runtime.memberCall(members.m_mob, "set_yscroll", 0, undefined))(((runtime.shiftRight(runtime.dereference(h_m_yscroll), 7)) & (511)));
                }
            }
            function method_xscroll_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_xscroll = members.m_xscroll ?? runtime.member("m_xscroll");
                let oldxscroll = ((runtime.dereference(h_m_xscroll)) & 0xffff);
                runtime.combineData(h_m_xscroll, data, mem_mask);
                if (((Number(runtime.dereference(h_m_xscroll)) !== Number(oldxscroll)) ? 1 : 0)) {
                    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                    (__l["m_playfield_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrollx", 0, undefined))(0, runtime.dereference(h_m_xscroll));
                    (__l["m_mob.set_xscroll"] ?? runtime.memberCall(members.m_mob, "set_xscroll", 0, undefined))(((runtime.dereference(h_m_xscroll)) & (511)));
                }
            }
            function method_mixer_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ym2151.set_output_gain"] ?? runtime.memberCall(members.m_ym2151, "set_output_gain", 0, undefined))(65535, ((((data) & (7))) / (7)));
                (__l["m_pokey.set_output_gain"] ?? runtime.memberCall(members.m_pokey, "set_output_gain", 0, undefined))(65535, ((((((data) >>> (3))) & (3))) / (3)));
                (__l["m_tms5220.set_output_gain"] ?? runtime.memberCall(members.m_tms5220, "set_output_gain", 0, undefined))(65535, ((((((data) >>> (5))) & (7))) / (7)));
            }
            function method_switch_6502_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let temp = ((48) | 0);
                if ((__l["m_soundlatch.pending_r"] ?? runtime.memberCall(members.m_soundlatch, "pending_r", 0, undefined))()) {
                    temp = ((((temp) ^ (128))) | 0);
                }
                if ((__l["m_mainlatch.pending_r"] ?? runtime.memberCall(members.m_mainlatch, "pending_r", 0, undefined))()) {
                    temp = ((((temp) ^ (64))) | 0);
                }
                if ((((__l["m_tms5220.readyq_r"] ?? runtime.memberCall(members.m_tms5220, "readyq_r", 0, undefined))()) ? 0 : 1)) {
                    temp = ((((temp) ^ (32))) | 0);
                }
                if (((((~(__l["m_803008.read"] ?? runtime.memberCall(members.m_803008, "read", 0, __l["read"]))())) >>> (3)) & 1)) {
                    temp = ((((temp) ^ (16))) | 0);
                }
                return temp;
            }
            function method_sound_irq_ack_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 0);
                }
                return 255;
            }
            function method_sound_irq_ack_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 0);
            }
            function method_sound_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
                (__l["m_soundctl.clear_w"] ?? runtime.memberCall(members.m_soundctl, "clear_w", 0, undefined))(state);
                if (((state) ? 0 : 1)) {
                    (__l["m_mainlatch.acknowledge_w"] ?? runtime.memberCall(members.m_mainlatch, "acknowledge_w", 0, undefined))();
                    (runtime.overrides["mixer_w"] ? runtime.overrides["mixer_w"](0) : method_mixer_w(runtime, 0));
                }
            }
            function method_scanline_update(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((param) & (32))) {
                    (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 1);
                }
            }
            function method_get_playfield_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = (((__l["m_playfield_tilemap.basemem_read"] ?? runtime.memberCall(members.m_playfield_tilemap, "basemem_read", 0, undefined))(tile_index)) & 0xffff);
                let code = ((((runtime.add((((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) * (4096)), ((data) & (4095)))) ^ (2048))) | 0);
                let color = ((runtime.add(runtime.add(16, (((members.m_playfield_color_bank ?? runtime.member("m_playfield_color_bank"))) * (8))), ((((data) >>> (12))) & (7)))) | 0);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, ((((data) >>> (15))) & (1)));
            }
            function method_get_alpha_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = (((__l["m_alpha_tilemap.basemem_read"] ?? runtime.memberCall(members.m_alpha_tilemap, "basemem_read", 0, undefined))(tile_index)) & 0xffff);
                let code = ((((data) & (1023))) | 0);
                let color = ((((((((data) >>> (10))) & (15))) | (((((data) >>> (9))) & (32))))) | 0);
                let opaque = ((((data) & (32768))) | 0);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, code, color, ((opaque) ? (16) : (0)));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_vindctr2_screen_refresh = members.m_vindctr2_screen_refresh ?? runtime.member("m_vindctr2_screen_refresh");
                (__l["m_mob.draw_async"] ?? runtime.memberCall(members.m_mob, "draw_async", 0, undefined))(cliprect);
                (__l["m_playfield_tilemap.draw"] ?? runtime.memberCall(members.m_playfield_tilemap, "draw", 0, undefined))(screen, bitmap, cliprect, 0, 0);
                let mobitmap = (__l["m_mob.bitmap"] ?? runtime.memberCall(members.m_mob, "bitmap", 0, undefined))();
                (__l["m_mob.iterate_dirty_rects"] ?? runtime.memberCall(members.m_mob, "iterate_dirty_rects", 0, undefined))(cliprect, ((rect) => {
                    for (let y = (((__l["rect.top"] ?? runtime.memberCall(rect, "top", 0, __l["top"]))()) | 0); ((Number(y) <= Number((__l["rect.bottom"] ?? runtime.memberCall(rect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        let mo = mobitmap["pix&"](y);
                        let pf = bitmap["pix&"](y);
                        for (let x = (((__l["rect.left"] ?? runtime.memberCall(rect, "left", 0, __l["left"]))()) | 0); ((Number(x) <= Number((__l["rect.right"] ?? runtime.memberCall(rect, "right", 0, __l["right"]))())) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            if (((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) {
                                if (((Number(((runtime.readIndex(mo, x)) & (15))) === Number(1)) ? 1 : 0)) {
                                    if ((((((h_m_vindctr2_screen_refresh) ? 0 : 1)) || (((Number(((runtime.readIndex(mo, x)) & (240))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                        runtime.writeIndex(pf, x, ((runtime.readIndex(pf, x)) ^ (128)));
                                    }
                                }
                                else {
                                    runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
                                }
                            }
                        }
                    }
                }));
                (__l["m_alpha_tilemap.draw"] ?? runtime.memberCall(members.m_alpha_tilemap, "draw", 0, undefined))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function method_speech_squeak_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((((5) | (((state) ? (2) : (0))))) & 0xff);
                (__l["m_tms5220.set_unscaled_clock"] ?? runtime.memberCall(members.m_tms5220, "set_unscaled_clock", 0, undefined))(runtime.divide(runtime.divide(14318181, 2), ((16) - (data))));
            }
            function method_compute_log(runtime, value) {
                const members = runtime.members;
                let log = ((0) | 0);
                if (((Number(value) === Number(0)) ? 1 : 0)) {
                    return -1;
                }
                while (((((value) & (1))) ? 0 : 1)) {
                    log = ((((log) + (1))) | 0);
                    value = ((runtime.shiftRight(value, 1)) | 0);
                }
                if (((Number(value) !== Number(1)) ? 1 : 0)) {
                    return -1;
                }
                return log;
            }
            function method_round_to_powerof2(runtime, value) {
                const members = runtime.members;
                let log = ((0) | 0);
                if (((Number(value) === Number(0)) ? 1 : 0)) {
                    return 1;
                }
                while (((Number((value = ((runtime.shiftRight(value, 1)) | 0))) !== Number(0)) ? 1 : 0)) {
                    log = ((((log) + (1))) | 0);
                }
                return ((1) << (((log) + (1))));
            }
            return {
                "video_int_ack_w": method_video_int_ack_w,
                "yscroll_w": method_yscroll_w,
                "xscroll_w": method_xscroll_w,
                "mixer_w": method_mixer_w,
                "switch_6502_r": method_switch_6502_r,
                "sound_irq_ack_r": method_sound_irq_ack_r,
                "sound_irq_ack_w": method_sound_irq_ack_w,
                "sound_reset_w": method_sound_reset_w,
                "scanline_update": method_scanline_update,
                "get_playfield_tile_info": method_get_playfield_tile_info,
                "get_alpha_tile_info": method_get_alpha_tile_info,
                "screen_update": method_screen_update,
                "speech_squeak_w": method_speech_squeak_w,
                "compute_log": method_compute_log,
                "round_to_powerof2": method_round_to_powerof2
            };
        })();
        return {
            "gauntlet_state.video_int_ack_w": methods["video_int_ack_w"],
            "gauntlet_state.yscroll_w": methods["yscroll_w"],
            "gauntlet_state.xscroll_w": methods["xscroll_w"],
            "gauntlet_state.mixer_w": methods["mixer_w"],
            "gauntlet_state.switch_6502_r": methods["switch_6502_r"],
            "gauntlet_state.sound_irq_ack_r": methods["sound_irq_ack_r"],
            "gauntlet_state.sound_irq_ack_w": methods["sound_irq_ack_w"],
            "gauntlet_state.sound_reset_w": methods["sound_reset_w"],
            "gauntlet_state.scanline_update": methods["scanline_update"],
            "gauntlet_state.get_playfield_tile_info": methods["get_playfield_tile_info"],
            "gauntlet_state.get_alpha_tile_info": methods["get_alpha_tile_info"],
            "gauntlet_state.screen_update": methods["screen_update"],
            "gauntlet_state.speech_squeak_w": methods["speech_squeak_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bottom", "left", "m_803008.read", "m_alpha_tilemap.basemem_read", "m_alpha_tilemap.draw", "m_audiocpu.set_input_line", "m_maincpu.set_input_line", "m_mainlatch.acknowledge_w", "m_mainlatch.pending_r", "m_mob.bitmap", "m_mob.draw_async", "m_mob.iterate_dirty_rects", "m_mob.set_xscroll", "m_mob.set_yscroll", "m_playfield_tilemap.basemem_read", "m_playfield_tilemap.draw", "m_playfield_tilemap.mark_all_dirty", "m_playfield_tilemap.set_scrollx", "m_playfield_tilemap.set_scrolly", "m_pokey.set_output_gain", "m_screen.update_partial", "m_screen.vpos", "m_soundctl.clear_w", "m_soundlatch.pending_r", "m_tms5220.readyq_r", "m_tms5220.set_output_gain", "m_tms5220.set_unscaled_clock", "m_ym2151.set_output_gain", "machine", "machine().side_effects_disabled", "read", "rect.bottom", "rect.left", "rect.right", "rect.top", "right", "set", "tileinfo.set", "top"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
