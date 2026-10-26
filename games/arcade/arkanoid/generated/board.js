// GENERATED executable machine composition from src/mame/taito/arkanoid.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'arkanoid');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_input_mux_r(runtime) {
                const members = runtime.members;
                const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
                return ((runtime.dereference(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))))).read_safe?.(255) ?? 0);
            }
            function method_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_reset_input = ((Number(1) === Number(state)) ? 1 : 0);
                if (((Number(0) !== Number(state)) ? 1 : 0)) {
                    members.m_host_flag = 0;
                    members.m_mcu_flag = 0;
                    (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(0, 0);
                }
                (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-2, state);
            }
            function method_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let result = (((((members.m_mcu_latch ?? runtime.member("m_mcu_latch"))) & 0xff)) & 0xff);
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mcu_flag = 0;
                    (__l["m_semaphore_cb"] ? __l["m_semaphore_cb"](0) : runtime.macro("m_semaphore_cb", 0));
                }
                return result;
            }
            function method_arkanoid_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let offs = ((((tile_index) * (2))) | 0);
                let code = ((runtime.add(runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((offs) + (1))), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & (7))) << (8))), ((2048) * ((members.m_gfxbank ?? runtime.member("m_gfxbank")))))) | 0);
                let color = ((runtime.add(runtime.shiftRight(((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & (248)), 3), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank")))))) | 0);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, 0);
            }
            function method_screen_update_arkanoid(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let offs = ((0) | 0);
                for (offs = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_spriteram, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    let sx = ((0) | 0);
                    let sy = ((0) | 0);
                    let code = ((0) | 0);
                    sx = ((runtime.readIndex(h_m_spriteram, offs)) | 0);
                    sy = ((((248) - (runtime.readIndex(h_m_spriteram, ((offs) + (1)))))) | 0);
                    if ((__l["flip_screen_x"] ? __l["flip_screen_x"]() : runtime.macro("flip_screen_x"))) {
                        sx = ((((248) - (sx))) | 0);
                    }
                    if ((__l["flip_screen_y"] ? __l["flip_screen_y"]() : runtime.macro("flip_screen_y"))) {
                        sy = ((((248) - (sy))) | 0);
                    }
                    code = ((runtime.add(runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (3))), ((((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (3))) << (8))), ((1024) * ((members.m_gfxbank ?? runtime.member("m_gfxbank")))))) | 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transpen?.(bitmap, cliprect, ((2) * (code)), runtime.add(runtime.shiftRight(((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (248)), 3), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank"))))), (__l["flip_screen_x"] ? __l["flip_screen_x"]() : runtime.macro("flip_screen_x")), (__l["flip_screen_y"] ? __l["flip_screen_y"]() : runtime.macro("flip_screen_y")), sx, ((sy) + ((((__l["flip_screen_y"] ? __l["flip_screen_y"]() : runtime.macro("flip_screen_y"))) ? (8) : (-8)))), 0) ?? 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transpen?.(bitmap, cliprect, runtime.add(((2) * (code)), 1), runtime.add(runtime.shiftRight(((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (248)), 3), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank"))))), (__l["flip_screen_x"] ? __l["flip_screen_x"]() : runtime.macro("flip_screen_x")), (__l["flip_screen_y"] ? __l["flip_screen_y"]() : runtime.macro("flip_screen_y")), sx, sy, 0) ?? 0);
                }
            }
            function method_mcu_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_portb_r_cb"] ? __l["m_portb_r_cb"]() : runtime.macro("m_portb_r_cb"));
            }
            function method_mcu_pc_r(runtime) {
                const members = runtime.members;
                return (((((((runtime.overrides["host_flag"] ? runtime.overrides["host_flag"]() : method_host_flag(runtime))) ? (1) : (0))) | ((((runtime.overrides["mcu_flag"] ? runtime.overrides["mcu_flag"]() : method_mcu_flag(runtime))) ? (0) : (2))))) | (252));
            }
            function method_host_flag(runtime) {
                const members = runtime.members;
                return (members.m_host_flag ?? runtime.member("m_host_flag"));
            }
            function method_mcu_flag(runtime) {
                const members = runtime.members;
                return (members.m_mcu_flag ?? runtime.member("m_mcu_flag"));
            }
            function method_arkanoid_semaphore_input_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return ((((((Number(0) !== Number((__l["m_mcuintf.host_semaphore_r"] ?? runtime.memberCall(members.m_mcuintf, "host_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (1))) | (((((Number(0) !== Number((__l["m_mcuintf.mcu_semaphore_r"] ?? runtime.memberCall(members.m_mcuintf, "mcu_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (2))));
            }
            function method_mcu_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_mcu_flag ?? runtime.member("m_mcu_flag"))) ? (1) : (0));
            }
            function method_host_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_host_flag ?? runtime.member("m_host_flag"))) ? (1) : (0));
            }
            return {
                "input_mux_r": method_input_mux_r,
                "reset_w": method_reset_w,
                "data_r": method_data_r,
                "arkanoid_videoram_w": method_arkanoid_videoram_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "screen_update_arkanoid": method_screen_update_arkanoid,
                "draw_sprites": method_draw_sprites,
                "mcu_pb_r": method_mcu_pb_r,
                "mcu_pc_r": method_mcu_pc_r,
                "host_flag": method_host_flag,
                "mcu_flag": method_mcu_flag,
                "arkanoid_semaphore_input_r": method_arkanoid_semaphore_input_r,
                "mcu_semaphore_r": method_mcu_semaphore_r,
                "host_semaphore_r": method_host_semaphore_r
            };
        })();
        return {
            "arkanoid_state.input_mux_r": methods["input_mux_r"],
            "arkanoid_state.arkanoid_videoram_w": methods["arkanoid_videoram_w"],
            "arkanoid_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "arkanoid_state.screen_update_arkanoid": methods["screen_update_arkanoid"],
            "arkanoid_state.draw_sprites": methods["draw_sprites"],
            "arkanoid_state.arkanoid_semaphore_input_r": methods["arkanoid_semaphore_input_r"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_input_mux_r(runtime) {
                const members = runtime.members;
                const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
                return ((runtime.dereference(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))))).read_safe?.(255) ?? 0);
            }
            function method_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_reset_input = ((Number(1) === Number(state)) ? 1 : 0);
                if (((Number(0) !== Number(state)) ? 1 : 0)) {
                    members.m_host_flag = 0;
                    members.m_mcu_flag = 0;
                    (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(0, 0);
                }
                (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-2, state);
            }
            function method_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let result = (((((members.m_mcu_latch ?? runtime.member("m_mcu_latch"))) & 0xff)) & 0xff);
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mcu_flag = 0;
                    (__l["m_semaphore_cb"] ? __l["m_semaphore_cb"](0) : runtime.macro("m_semaphore_cb", 0));
                }
                return result;
            }
            function method_arkanoid_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
            }
            function method_mcu_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_portb_r_cb"] ? __l["m_portb_r_cb"]() : runtime.macro("m_portb_r_cb"));
            }
            function method_mcu_pc_r(runtime) {
                const members = runtime.members;
                return (((((((runtime.overrides["host_flag"] ? runtime.overrides["host_flag"]() : method_host_flag(runtime))) ? (1) : (0))) | ((((runtime.overrides["mcu_flag"] ? runtime.overrides["mcu_flag"]() : method_mcu_flag(runtime))) ? (0) : (2))))) | (252));
            }
            function method_host_flag(runtime) {
                const members = runtime.members;
                return (members.m_host_flag ?? runtime.member("m_host_flag"));
            }
            function method_mcu_flag(runtime) {
                const members = runtime.members;
                return (members.m_mcu_flag ?? runtime.member("m_mcu_flag"));
            }
            function method_arkanoid_semaphore_input_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return ((((((Number(0) !== Number((__l["m_mcuintf.host_semaphore_r"] ?? runtime.memberCall(members.m_mcuintf, "host_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (1))) | (((((Number(0) !== Number((__l["m_mcuintf.mcu_semaphore_r"] ?? runtime.memberCall(members.m_mcuintf, "mcu_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (2))));
            }
            function method_mcu_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_mcu_flag ?? runtime.member("m_mcu_flag"))) ? (1) : (0));
            }
            function method_host_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_host_flag ?? runtime.member("m_host_flag"))) ? (1) : (0));
            }
            return {
                "input_mux_r": method_input_mux_r,
                "reset_w": method_reset_w,
                "data_r": method_data_r,
                "arkanoid_videoram_w": method_arkanoid_videoram_w,
                "mcu_pb_r": method_mcu_pb_r,
                "mcu_pc_r": method_mcu_pc_r,
                "host_flag": method_host_flag,
                "mcu_flag": method_mcu_flag,
                "arkanoid_semaphore_input_r": method_arkanoid_semaphore_input_r,
                "mcu_semaphore_r": method_mcu_semaphore_r,
                "host_semaphore_r": method_host_semaphore_r
            };
        })();
        return {
            "taito68705_mcu_device_base.reset_w": methods["reset_w"],
            "taito68705_mcu_device_base.host_flag": methods["host_flag"],
            "taito68705_mcu_device_base.mcu_flag": methods["mcu_flag"],
            "taito68705_mcu_device_base.mcu_semaphore_r": methods["mcu_semaphore_r"],
            "taito68705_mcu_device_base.host_semaphore_r": methods["host_semaphore_r"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_input_mux_r(runtime) {
                const members = runtime.members;
                const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
                return ((runtime.dereference(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))))).read_safe?.(255) ?? 0);
            }
            function method_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_reset_input = ((Number(1) === Number(state)) ? 1 : 0);
                if (((Number(0) !== Number(state)) ? 1 : 0)) {
                    members.m_host_flag = 0;
                    members.m_mcu_flag = 0;
                    (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(0, 0);
                }
                (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-2, state);
            }
            function method_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let result = (((((members.m_mcu_latch ?? runtime.member("m_mcu_latch"))) & 0xff)) & 0xff);
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mcu_flag = 0;
                    (__l["m_semaphore_cb"] ? __l["m_semaphore_cb"](0) : runtime.macro("m_semaphore_cb", 0));
                }
                return result;
            }
            function method_arkanoid_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
            }
            function method_mcu_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_portb_r_cb"] ? __l["m_portb_r_cb"]() : runtime.macro("m_portb_r_cb"));
            }
            function method_mcu_pc_r(runtime) {
                const members = runtime.members;
                return (((((((runtime.overrides["host_flag"] ? runtime.overrides["host_flag"]() : method_host_flag(runtime))) ? (1) : (0))) | ((((runtime.overrides["mcu_flag"] ? runtime.overrides["mcu_flag"]() : method_mcu_flag(runtime))) ? (0) : (2))))) | (252));
            }
            function method_host_flag(runtime) {
                const members = runtime.members;
                return (members.m_host_flag ?? runtime.member("m_host_flag"));
            }
            function method_mcu_flag(runtime) {
                const members = runtime.members;
                return (members.m_mcu_flag ?? runtime.member("m_mcu_flag"));
            }
            function method_arkanoid_semaphore_input_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return ((((((Number(0) !== Number((__l["m_mcuintf.host_semaphore_r"] ?? runtime.memberCall(members.m_mcuintf, "host_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (1))) | (((((Number(0) !== Number((__l["m_mcuintf.mcu_semaphore_r"] ?? runtime.memberCall(members.m_mcuintf, "mcu_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (2))));
            }
            function method_mcu_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_mcu_flag ?? runtime.member("m_mcu_flag"))) ? (1) : (0));
            }
            function method_host_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_host_flag ?? runtime.member("m_host_flag"))) ? (1) : (0));
            }
            return {
                "input_mux_r": method_input_mux_r,
                "reset_w": method_reset_w,
                "data_r": method_data_r,
                "arkanoid_videoram_w": method_arkanoid_videoram_w,
                "mcu_pb_r": method_mcu_pb_r,
                "mcu_pc_r": method_mcu_pc_r,
                "host_flag": method_host_flag,
                "mcu_flag": method_mcu_flag,
                "arkanoid_semaphore_input_r": method_arkanoid_semaphore_input_r,
                "mcu_semaphore_r": method_mcu_semaphore_r,
                "host_semaphore_r": method_host_semaphore_r
            };
        })();
        return {
            "arkanoid_mcu_device_base.data_r": methods["data_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw", "flip_screen_x", "flip_screen_y", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_mcu.set_input_line", "m_mcuintf.host_semaphore_r", "m_mcuintf.mcu_semaphore_r", "m_portb_r_cb", "m_semaphore_cb", "machine", "machine().side_effects_disabled", "mark_tile_dirty", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
