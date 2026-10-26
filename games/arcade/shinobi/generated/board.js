// GENERATED executable machine composition from src/mame/sega/segas16a.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'shinobi');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_tileram_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_tileram ?? runtime.member("m_tileram")), offset);
            }
            function method_textram_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_textram ?? runtime.member("m_textram")), offset);
            }
            function method_misc_io_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_custom_io_r"] ? __l["m_custom_io_r"](offset) : runtime.macro("m_custom_io_r", offset));
            }
            function method_misc_io_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_custom_io_w"] ? __l["m_custom_io_w"](offset, data, mem_mask) : runtime.macro("m_custom_io_w", offset, data, mem_mask));
            }
            function method_sound_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_i8255.pc6_w"] ?? runtime.memberCall(members.m_i8255, "pc6_w", 0, undefined))(0);
                return (__l["m_soundlatch.read"] ?? runtime.memberCall(members.m_soundlatch, "read", 0, undefined))();
            }
            function method_upd7751_p2_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return ((((128) | ((((((members.m_upd7751_command ?? runtime.member("m_upd7751_command"))) & (7))) << (4))))) | ((((__l["m_upd7751_i8243.p2_r"] ?? runtime.memberCall(members.m_upd7751_i8243, "p2_r", 0, undefined))()) & (15))));
            }
            function method_upd7751_p2_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_upd7751_i8243.p2_w"] ?? runtime.memberCall(members.m_upd7751_i8243, "p2_w", 0, undefined))(((data) & (15)));
            }
            function method_upd7751_rom_offset_w_0(runtime, data) {
                const members = runtime.members;
                let mask = ((15) | 0);
                let newdata = ((((((data) << (0))) & (mask))) | 0);
                members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
            }
            function method_upd7751_rom_offset_w_4(runtime, data) {
                const members = runtime.members;
                let mask = ((240) | 0);
                let newdata = ((((((data) << (4))) & (mask))) | 0);
                members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
            }
            function method_upd7751_rom_offset_w_8(runtime, data) {
                const members = runtime.members;
                let mask = ((3840) | 0);
                let newdata = ((((((data) << (8))) & (mask))) | 0);
                members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
            }
            function method_upd7751_rom_offset_w_12(runtime, data) {
                const members = runtime.members;
                let mask = ((12288) | 0);
                let newdata = ((((((data) << (12))) & (mask))) | 0);
                members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
            }
            function method_tilemap_sound_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_soundcpu.set_input_line"] ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(-1, ((((data) & (128))) ? (0) : (1)));
                (__l["m_segaic16vid.tilemap_set_colscroll"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_set_colscroll", 0, undefined))(0, (((~data)) & (4)));
                (__l["m_segaic16vid.tilemap_set_rowscroll"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_set_rowscroll", 0, undefined))(0, (((~data)) & (2)));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_segaic16vid = members.m_segaic16vid ?? runtime.member("m_segaic16vid");
                if (((h_m_segaic16vid.m_display_enable) ? 0 : 1)) {
                    (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))((__l["m_palette.black_pen"] ?? runtime.memberCall(members.m_palette, "black_pen", 0, undefined))(), cliprect);
                    return 0;
                }
                (__l["m_sprites.draw_async"] ?? runtime.memberCall(members.m_sprites, "draw_async", 0, undefined))(cliprect);
                ((runtime.dereference((__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))())).fill?.(0, cliprect) ?? 0);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 128, 0);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 129, 0);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 0, 1);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 1, 2);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 0, 0, 2);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 0, 1, 4);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 2, 0, 4);
                (__l["m_segaic16vid.tilemap_draw"] ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 2, 1, 8);
                let sprites = (__l["m_sprites.bitmap"] ?? runtime.memberCall(members.m_sprites, "bitmap", 0, undefined))();
                (__l["m_sprites.iterate_dirty_rects"] ?? runtime.memberCall(members.m_sprites, "iterate_dirty_rects", 0, undefined))(cliprect, ((rect) => {
                    for (let y = ((rect.min_y) | 0); ((Number(y) <= Number(rect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        let dest = bitmap["pix&"](y);
                        let src = sprites["pix&"](y);
                        let pri = (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))()["pix&"](y);
                        for (let x = ((rect.min_x) | 0); ((Number(x) <= Number(rect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            let pix = ((runtime.readIndex(src, x)) & 0xffff);
                            if (((Number(pix) !== Number(65535)) ? 1 : 0)) {
                                let priority = ((((pix) >>> (10))) | 0);
                                if (((Number(((1) << (priority))) > Number(runtime.readIndex(pri, x))) ? 1 : 0)) {
                                    if (((Number(((pix) & (1008))) === Number(1008)) ? 1 : 0)) {
                                        runtime.writeIndex(dest, x, ((runtime.readIndex(dest, x)) + ((members.m_palette_entries ?? runtime.member("m_palette_entries")))));
                                    }
                                    else {
                                        runtime.writeIndex(dest, x, ((1024) | (((pix) & (1023)))));
                                    }
                                }
                            }
                        }
                    }
                }));
                return 0;
            }
            return {
                "tileram_r": method_tileram_r,
                "textram_r": method_textram_r,
                "misc_io_r": method_misc_io_r,
                "misc_io_w": method_misc_io_w,
                "sound_data_r": method_sound_data_r,
                "upd7751_p2_r": method_upd7751_p2_r,
                "upd7751_p2_w": method_upd7751_p2_w,
                "upd7751_rom_offset_w_0": method_upd7751_rom_offset_w_0,
                "upd7751_rom_offset_w_4": method_upd7751_rom_offset_w_4,
                "upd7751_rom_offset_w_8": method_upd7751_rom_offset_w_8,
                "upd7751_rom_offset_w_12": method_upd7751_rom_offset_w_12,
                "tilemap_sound_w": method_tilemap_sound_w,
                "screen_update": method_screen_update
            };
        })();
        return {
            "segas16a_state.misc_io_r": methods["misc_io_r"],
            "segas16a_state.misc_io_w": methods["misc_io_w"],
            "segas16a_state.sound_data_r": methods["sound_data_r"],
            "segas16a_state.upd7751_p2_r": methods["upd7751_p2_r"],
            "segas16a_state.upd7751_p2_w": methods["upd7751_p2_w"],
            "segas16a_state.upd7751_rom_offset_w_0": methods["upd7751_rom_offset_w_0"],
            "segas16a_state.upd7751_rom_offset_w_4": methods["upd7751_rom_offset_w_4"],
            "segas16a_state.upd7751_rom_offset_w_8": methods["upd7751_rom_offset_w_8"],
            "segas16a_state.upd7751_rom_offset_w_12": methods["upd7751_rom_offset_w_12"],
            "segas16a_state.tilemap_sound_w": methods["tilemap_sound_w"],
            "segas16a_state.screen_update": methods["screen_update"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "fill", "m_custom_io_r", "m_custom_io_w", "m_i8255.pc6_w", "m_palette.black_pen", "m_segaic16vid.tilemap_draw", "m_segaic16vid.tilemap_set_colscroll", "m_segaic16vid.tilemap_set_rowscroll", "m_soundcpu.set_input_line", "m_soundlatch.read", "m_sprites.bitmap", "m_sprites.draw_async", "m_sprites.iterate_dirty_rects", "m_upd7751_i8243.p2_r", "m_upd7751_i8243.p2_w", "priority", "screen.priority"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
