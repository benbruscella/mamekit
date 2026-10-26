// GENERATED executable machine composition from src/mame/universal/cosmic.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'panic');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_panic_sound_output_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(offset) === Number(11)) ? 1 : 0)) {
                    let count = ((0) | 0);
                    if (((Number(data) === Number(0)) ? 1 : 0)) {
                        for (count = ((0) | 0); ((Number(count) < Number(9)) ? 1 : 0); count = ((((count) + (1))) | 0)) {
                            (__l["m_samples.stop"] ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(count);
                        }
                    }
                    members.m_sound_enabled = ((data) | 0);
                }
                if ((members.m_sound_enabled ?? runtime.member("m_sound_enabled"))) {
                    switch (offset) {
                        case 0:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 0);
                                }
                                break;
                            }
                        case 1:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 5);
                                }
                                break;
                            }
                        case 2:
                            {
                                if (data) {
                                    if ((((__l["m_samples.playing"] ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(1)) ? 0 : 1)) {
                                        (__l["m_samples.stop"] ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(2);
                                        (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(1, 3);
                                    }
                                }
                                else {
                                    (__l["m_samples.stop"] ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(1);
                                }
                                break;
                            }
                        case 3:
                            {
                                if ((((data) && ((((__l["m_samples.playing"] ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(6)) ? 0 : 1))) ? 1 : 0)) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(6, 9, 1);
                                }
                                break;
                            }
                        case 4:
                            {
                                break;
                            }
                        case 5:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 5);
                                }
                                break;
                            }
                        case 6:
                            {
                                if (((((((data) && ((((__l["m_samples.playing"] ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(1)) ? 0 : 1))) ? 1 : 0)) && ((((__l["m_samples.playing"] ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(3)) ? 0 : 1))) ? 1 : 0)) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(2, 2);
                                }
                                break;
                            }
                        case 7:
                            {
                                if (data) {
                                    (__l["m_samples.stop"] ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(2);
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(3, 4);
                                }
                                else {
                                    (__l["m_samples.stop"] ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(3);
                                }
                                break;
                            }
                        case 8:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 1);
                                }
                                break;
                            }
                        case 9:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(4, 8);
                                }
                                else {
                                    (__l["m_samples.stop"] ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(4);
                                }
                                break;
                            }
                        case 10:
                            {
                                (__l["m_dac.write"] ?? runtime.memberCall(members.m_dac, "write", 0, undefined))((((data) >>> (7)) & 1));
                                break;
                            }
                    }
                }
            }
            function method_cosmic_color_register_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_color_registers"), offset, ((data) ? (1) : (0)));
            }
            function method_flip_screen_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["flip_screen_set"] ? __l["flip_screen_set"](((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
            }
            function method_panic_sound_output2_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((members.m_sound_enabled ?? runtime.member("m_sound_enabled"))) {
                    switch (offset) {
                        case 0:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 6);
                                }
                                break;
                            }
                        case 1:
                            {
                                if (data) {
                                    (__l["m_samples.start"] ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(5, 7);
                                }
                                break;
                            }
                    }
                }
            }
            function method_screen_update_panic(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(0, cliprect);
                (runtime.overrides["draw_bitmap"] ? runtime.overrides["draw_bitmap"](bitmap, cliprect) : method_draw_bitmap(runtime, bitmap, cliprect));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 7, 1) : method_draw_sprites(runtime, bitmap, cliprect, 7, 1));
                return 0;
            }
            function method_draw_bitmap(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                for (let offs = 0; ((Number(offs) < Number(runtime.container(members.m_videoram, "bytes"))) ? 1 : 0); offs = ((offs) + (1))) {
                    let data = ((runtime.readIndex(h_m_videoram, offs)) & 0xff);
                    let x = ((((offs) << (3))) & 0xff);
                    let y = ((((offs) >>> (5))) & 0xff);
                    let pen = (__l["m_map_color"] ? __l["m_map_color"](x, y) : runtime.macro("m_map_color", x, y));
                    for (let i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((data) & (128))) {
                            if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                                bitmap["pix="](((255) - (y)), ((255) - (x)), pen);
                            }
                            else {
                                bitmap["pix="](y, x, pen);
                            }
                        }
                        x = ((((x) + (1))) & 0xff);
                        data = ((((data) << (1))) & 0xff);
                    }
                }
            }
            function method_draw_sprites(runtime, bitmap, cliprect, color_mask, extra_sprites) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let offs = ((0) | 0);
                for (offs = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    if (((Number(runtime.readIndex(h_m_spriteram, offs)) !== Number(0)) ? 1 : 0)) {
                        let code = ((0) | 0);
                        let color = ((0) | 0);
                        code = (((((~runtime.readIndex(h_m_spriteram, offs))) & (63))) | 0);
                        color = (((((~runtime.readIndex(h_m_spriteram, ((offs) + (3))))) & (color_mask))) | 0);
                        if (extra_sprites) {
                            code = ((((code) | (((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) & (8))) << (3))))) | 0);
                        }
                        if (((runtime.readIndex(h_m_spriteram, offs)) & (128))) {
                            ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transpen?.(bitmap, cliprect, code, color, 0, (((~runtime.readIndex(h_m_spriteram, offs))) & (64)), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), runtime.readIndex(h_m_spriteram, ((offs) + (1))), 0) ?? 0);
                        }
                        else {
                            ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).transpen?.(bitmap, cliprect, runtime.shiftRight(code, 2), color, 0, (((~runtime.readIndex(h_m_spriteram, offs))) & (64)), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), runtime.readIndex(h_m_spriteram, ((offs) + (1))), 0) ?? 0);
                        }
                    }
                }
            }
            function method_panic_scanline(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scanline = ((param) | 0);
                if (((Number(scanline) === Number(224)) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line_and_vector"] ?? runtime.memberCall(members.m_maincpu, "set_input_line_and_vector", 0, undefined))(0, 2, 215);
                }
                if (((Number(scanline) === Number(0)) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line_and_vector"] ?? runtime.memberCall(members.m_maincpu, "set_input_line_and_vector", 0, undefined))(0, 2, 207);
                }
            }
            return {
                "panic_sound_output_w": method_panic_sound_output_w,
                "cosmic_color_register_w": method_cosmic_color_register_w,
                "flip_screen_w": method_flip_screen_w,
                "panic_sound_output2_w": method_panic_sound_output2_w,
                "screen_update_panic": method_screen_update_panic,
                "draw_bitmap": method_draw_bitmap,
                "draw_sprites": method_draw_sprites,
                "panic_scanline": method_panic_scanline
            };
        })();
        return {
            "cosmic_state.panic_sound_output_w": methods["panic_sound_output_w"],
            "cosmic_state.cosmic_color_register_w": methods["cosmic_color_register_w"],
            "cosmic_state.flip_screen_w": methods["flip_screen_w"],
            "cosmic_state.panic_sound_output2_w": methods["panic_sound_output2_w"],
            "cosmic_state.screen_update_panic": methods["screen_update_panic"],
            "cosmic_state.draw_bitmap": methods["draw_bitmap"],
            "cosmic_state.draw_sprites": methods["draw_sprites"],
            "cosmic_state.panic_scanline": methods["panic_scanline"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "fill", "flip_screen", "flip_screen_set", "m_dac.write", "m_gfxdecode.gfx", "m_maincpu.set_input_line_and_vector", "m_map_color", "m_samples.playing", "m_samples.start", "m_samples.stop"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
