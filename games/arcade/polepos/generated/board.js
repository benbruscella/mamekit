// GENERATED executable machine composition from src/mame/namco/polepos.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'polepos');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_sprite_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), offset)) & (255));
            }
            function method_sprite_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_sprite16_memory"), offset, ((((runtime.readIndex((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), offset)) & (65280))) | (data)));
            }
            function method_road_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), offset)) & (255));
            }
            function method_road_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_road16_memory"), offset, ((((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), offset)) & (65280))) | (data)));
            }
            function method_alpha_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset)) & (255));
            }
            function method_alpha_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_alpha16_memory"), offset, ((((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset)) & (65280))) | (data)));
                (__l["m_tx_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
            }
            function method_view_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset)) & (255));
            }
            function method_view_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_view16_memory"), offset, ((((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset)) & (65280))) | (data)));
                if (((Number(offset) < Number(1024)) ? 1 : 0)) {
                    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
                }
            }
            function method_ctrl_r(runtime) {
                const members = runtime.members;
                return (members.m_control ?? runtime.member("m_control"));
            }
            function method_ready_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((255) | 0);
                if (((Number((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) >= Number(128)) ? 1 : 0)) {
                    ret = ((((ret) ^ (2))) | 0);
                }
                if ((((__l["m_adc.intr_r"] ?? runtime.memberCall(members.m_adc, "intr_r", 0, undefined))()) ? 0 : 1)) {
                    ret = ((((ret) ^ (8))) | 0);
                }
                return ret;
            }
            function method_alpha16_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.combineData(runtime.addressOf((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset), data, mem_mask);
                (__l["m_tx_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
            }
            function method_view16_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.combineData(runtime.addressOf((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset), data, mem_mask);
                if (((Number(offset) < Number(1024)) ? 1 : 0)) {
                    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
                }
            }
            function method_bg_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let word = ((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), tile_index)) & 0xffff);
                let code = ((((((word) & (255))) | (runtime.shiftRight(((word) & (16384)), 6)))) | 0);
                let color = ((runtime.shiftRight(((word) & (16128)), 8)) | 0);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, code, color, 0);
            }
            function method_tx_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let word = ((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), tile_index)) & 0xffff);
                let code = ((((((word) & (255))) | (runtime.shiftRight(((word) & (16384)), 6)))) | 0);
                let color = ((runtime.shiftRight(((word) & (16128)), 8)) | 0);
                if (((Number((members.m_chacl ?? runtime.member("m_chacl"))) === Number(0)) ? 1 : 0)) {
                    code = ((((code) & (255))) | 0);
                    color = ((0) | 0);
                }
                if (((Number(tile_index) >= Number(512)) ? 1 : 0)) {
                    color = ((((color) | (64))) | 0);
                }
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, 0);
                tileinfo.group = color;
            }
            function method_namco_52xx_si_r(runtime) {
                const members = runtime.members;
                return 1;
            }
            function method_namco_53xx_k_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            function method_steering_changed_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    let steer_new = (((__l["m_steer_io.read"] ?? runtime.memberCall(members.m_steer_io, "read", 0, __l["read"]))()) & 0xff);
                    members.m_steer_accum = ((((members.m_steer_accum) + (((((((steer_new) - ((members.m_steer_last ?? runtime.member("m_steer_last"))))) << 24 >> 24)) * (2))))) << 16 >> 16);
                    members.m_steer_last = ((steer_new) & 0xff);
                    if (((Number((members.m_steer_accum ?? runtime.member("m_steer_accum"))) < Number(0)) ? 1 : 0)) {
                        members.m_steer_delta = ((0) & 0xff);
                        members.m_steer_accum = ((((members.m_steer_accum) + (1))) << 16 >> 16);
                    }
                    else {
                        if (((Number((members.m_steer_accum ?? runtime.member("m_steer_accum"))) > Number(0)) ? 1 : 0)) {
                            members.m_steer_delta = ((1) & 0xff);
                            members.m_steer_accum = ((((members.m_steer_accum) - (1))) << 16 >> 16);
                        }
                    }
                }
                return (((members.m_steer_accum ?? runtime.member("m_steer_accum"))) & (1));
            }
            function method_steering_delta_r(runtime) {
                const members = runtime.members;
                return (members.m_steer_delta ?? runtime.member("m_steer_delta"));
            }
            function method_chip_select(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_cpu.set_input_line"] ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, ((state) ? (1) : (0)));
            }
            function method_reset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_cpu.set_input_line"] ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
            }
            function method_clson_w(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    (runtime.overrides["polepos_engine_sound_lsb_w"] ? runtime.overrides["polepos_engine_sound_lsb_w"](0) : method_polepos_engine_sound_lsb_w(runtime, 0));
                    (runtime.overrides["polepos_engine_sound_msb_w"] ? runtime.overrides["polepos_engine_sound_msb_w"](0) : method_polepos_engine_sound_msb_w(runtime, 0));
                }
            }
            function method_polepos_engine_sound_lsb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                members.m_sample_lsb = ((data) & (62));
                members.m_sample_enable = ((data) & (1));
            }
            function method_polepos_engine_sound_msb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                members.m_sample_msb = ((data) & (63));
            }
            function method_gasel_w(runtime, state) {
                const members = runtime.members;
                members.m_adc_input = ((state) & 0xff);
            }
            function method_sb0_w(runtime, state) {
                const members = runtime.members;
                members.m_auto_start_mask = ((((state) ? 0 : 1)) << 24 >> 24);
            }
            function method_chacl_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_chacl = ((state) & 0xff);
                (__l["m_tx_tilemap.mark_all_dirty"] ?? runtime.memberCall(members.m_tx_tilemap, "mark_all_dirty", 0, __l["mark_all_dirty"]))();
            }
            function method_analog_r(runtime) {
                const members = runtime.members;
                const h_m_analog_io = members.m_analog_io ?? runtime.member("m_analog_io");
                return ((runtime.dereference(runtime.readIndex(h_m_analog_io, (((members.m_adc_input ?? runtime.member("m_adc_input"))) & (1))))).read?.() ?? runtime.container(runtime.readIndex(h_m_analog_io, (((members.m_adc_input ?? runtime.member("m_adc_input"))) & (1))), "read"));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                clip.max_y = 127;
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, clip, 0, 0);
                runtime.invoke("draw_road", bitmap);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__l["m_tx_tilemap.draw"] ?? runtime.memberCall(members.m_tx_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                let posmem = runtime.addressOf((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), 896);
                let sizmem = runtime.addressOf((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), 1920);
                for (let i = ((0) | 0); ((Number(i) < Number(64)) ? 1 : 0); i = ((((i) + (1))) | 0), posmem = runtime.add(posmem, 2), sizmem = runtime.add(sizmem, 2)) {
                    let sx = ((runtime.add(((((runtime.readIndex(posmem, 1)) & (1023))) - (64)), 4)) | 0);
                    let sy = ((runtime.add(((512) - (((runtime.readIndex(posmem, 0)) & (511)))), 1)) | 0);
                    let sizex = ((runtime.shiftRight(((runtime.readIndex(sizmem, 1)) & (16128)), 8)) | 0);
                    let sizey = ((runtime.shiftRight(((runtime.readIndex(sizmem, 0)) & (16128)), 8)) | 0);
                    let code = ((((runtime.readIndex(sizmem, 0)) & (127))) | 0);
                    let flipx = (((((runtime.readIndex(sizmem, 0)) >>> (7)) & 1)) ? 1 : 0);
                    let color = ((((runtime.readIndex(sizmem, 1)) & (63))) | 0);
                    if (((Number(sy) >= Number(128)) ? 1 : 0)) {
                        color = ((((color) | (64))) | 0);
                    }
                    runtime.invoke("zoom_sprite", bitmap, (((runtime.readIndex(sizmem, 0)) >>> (15)) & 1), code, color, flipx, sx, sy, sizex, sizey);
                }
            }
            function method_vblank(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_cpu.set_input_line"] ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, ((state) ? (0) : (1)));
            }
            function method_K_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return ((h_m_latched_cmd) & (15));
            }
            function method_SI_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((__l["m_si"] ? __l["m_si"](0) : runtime.macro("m_si", 0))) ? (1) : (0));
            }
            function method_R0_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((__l["m_romread"] ? __l["m_romread"]((members.m_address ?? runtime.member("m_address"))) : runtime.macro("m_romread", (members.m_address ?? runtime.member("m_address"))))) & (15));
            }
            function method_R1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return runtime.shiftRight((__l["m_romread"] ? __l["m_romread"]((members.m_address ?? runtime.member("m_address"))) : runtime.macro("m_romread", (members.m_address ?? runtime.member("m_address")))), 4);
            }
            function method_auto_start_r(runtime) {
                const members = runtime.members;
                return (members.m_auto_start_mask ?? runtime.member("m_auto_start_mask"));
            }
            return {
                "sprite_r": method_sprite_r,
                "sprite_w": method_sprite_w,
                "road_r": method_road_r,
                "road_w": method_road_w,
                "alpha_r": method_alpha_r,
                "alpha_w": method_alpha_w,
                "view_r": method_view_r,
                "view_w": method_view_w,
                "ctrl_r": method_ctrl_r,
                "ready_r": method_ready_r,
                "alpha16_w": method_alpha16_w,
                "view16_w": method_view16_w,
                "bg_get_tile_info": method_bg_get_tile_info,
                "tx_get_tile_info": method_tx_get_tile_info,
                "namco_52xx_si_r": method_namco_52xx_si_r,
                "namco_53xx_k_r": method_namco_53xx_k_r,
                "steering_changed_r": method_steering_changed_r,
                "steering_delta_r": method_steering_delta_r,
                "chip_select": method_chip_select,
                "reset": method_reset,
                "clson_w": method_clson_w,
                "polepos_engine_sound_lsb_w": method_polepos_engine_sound_lsb_w,
                "polepos_engine_sound_msb_w": method_polepos_engine_sound_msb_w,
                "gasel_w": method_gasel_w,
                "sb0_w": method_sb0_w,
                "chacl_w": method_chacl_w,
                "analog_r": method_analog_r,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "vblank": method_vblank,
                "K_r": method_K_r,
                "SI_r": method_SI_r,
                "R0_r": method_R0_r,
                "R1_r": method_R1_r,
                "auto_start_r": method_auto_start_r
            };
        })();
        return {
            "polepos_state.sprite_r": methods["sprite_r"],
            "polepos_state.sprite_w": methods["sprite_w"],
            "polepos_state.road_r": methods["road_r"],
            "polepos_state.road_w": methods["road_w"],
            "polepos_state.alpha_r": methods["alpha_r"],
            "polepos_state.alpha_w": methods["alpha_w"],
            "polepos_state.view_r": methods["view_r"],
            "polepos_state.view_w": methods["view_w"],
            "polepos_state.ready_r": methods["ready_r"],
            "polepos_state.alpha16_w": methods["alpha16_w"],
            "polepos_state.view16_w": methods["view16_w"],
            "polepos_state.bg_get_tile_info": methods["bg_get_tile_info"],
            "polepos_state.tx_get_tile_info": methods["tx_get_tile_info"],
            "polepos_state.namco_52xx_si_r": methods["namco_52xx_si_r"],
            "polepos_state.namco_53xx_k_r": methods["namco_53xx_k_r"],
            "polepos_state.steering_changed_r": methods["steering_changed_r"],
            "polepos_state.steering_delta_r": methods["steering_delta_r"],
            "polepos_state.gasel_w": methods["gasel_w"],
            "polepos_state.sb0_w": methods["sb0_w"],
            "polepos_state.chacl_w": methods["chacl_w"],
            "polepos_state.analog_r": methods["analog_r"],
            "polepos_state.screen_update": methods["screen_update"],
            "polepos_state.draw_sprites": methods["draw_sprites"],
            "polepos_state.auto_start_r": methods["auto_start_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw", "m_adc.intr_r", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_cpu.set_input_line", "m_romread", "m_screen.vpos", "m_si", "m_steer_io.read", "m_stream.update", "m_tx_tilemap.draw", "m_tx_tilemap.mark_all_dirty", "m_tx_tilemap.mark_tile_dirty", "machine", "machine().side_effects_disabled", "mark_all_dirty", "mark_tile_dirty", "read", "set", "tileinfo.set", "update"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
