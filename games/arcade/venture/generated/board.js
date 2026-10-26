// GENERATED executable machine composition from src/mame/exidy/exidy.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'venture');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_exidy_interrupt_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
                return (members.m_int_condition ?? runtime.member("m_int_condition"));
            }
            function method_sh8253_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                (__l["m_pit.write"] ?? runtime.memberCall(members.m_pit, "write", 0, undefined))(offset, data);
            }
            function method_sfxctrl_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                switch (offset) {
                    case 0:
                        {
                            members.m_sfxctrl = data;
                            break;
                        }
                    case 1:
                    case 2:
                    case 3:
                        {
                            runtime.writeIndex(runtime.writableMember("m_sh6840_volume"), ((offset) - (1)), runtime.divide(((((data) & (7))) * (5461.166666666667)), 7));
                            break;
                        }
                }
            }
            function method_exidy_vblank_interrupt(runtime, device) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.invoke("latch_condition", 0);
                members.m_int_condition = ((((members.m_int_condition) & (-129))) & 0xff);
                ((runtime.dereference((__l["device.execute"] ?? runtime.memberCall(device, "execute", 0, __l["execute"]))())).set_input_line?.(0, 1) ?? 0);
            }
            function method_set_colors(runtime) {
                const members = runtime.members;
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](0, 0) : method_set_1_color(runtime, 0, 0));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](1, 7) : method_set_1_color(runtime, 1, 7));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](2, 0) : method_set_1_color(runtime, 2, 0));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](3, 6) : method_set_1_color(runtime, 3, 6));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](4, 4) : method_set_1_color(runtime, 4, 4));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](5, 3) : method_set_1_color(runtime, 5, 3));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](6, 2) : method_set_1_color(runtime, 6, 2));
                (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](7, 1) : method_set_1_color(runtime, 7, 1));
            }
            function method_set_1_color(runtime, index, which) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_color_latch = members.m_color_latch ?? runtime.member("m_color_latch");
                (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(runtime.readIndex(h_m_color_latch, 2), which)) : runtime.macro("pal1bit", runtime.shiftRight(runtime.readIndex(h_m_color_latch, 2), which))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(runtime.readIndex(h_m_color_latch, 1), which)) : runtime.macro("pal1bit", runtime.shiftRight(runtime.readIndex(h_m_color_latch, 1), which))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight(runtime.readIndex(h_m_color_latch, 0), which)) : runtime.macro("pal1bit", runtime.shiftRight(runtime.readIndex(h_m_color_latch, 0), which))));
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
                const h_m_sprite2_xpos = members.m_sprite2_xpos ?? runtime.member("m_sprite2_xpos");
                const h_m_sprite2_ypos = members.m_sprite2_ypos ?? runtime.member("m_sprite2_ypos");
                const h_m_spriteno = members.m_spriteno ?? runtime.member("m_spriteno");
                const h_m_sprite1_xpos = members.m_sprite1_xpos ?? runtime.member("m_sprite1_xpos");
                const h_m_sprite1_ypos = members.m_sprite1_ypos ?? runtime.member("m_sprite1_ypos");
                let sprite_set_2 = ((((Number(((runtime.dereference(h_m_sprite_enable)) & (64))) !== Number(0)) ? 1 : 0)) | 0);
                let sx = ((((((236) - (runtime.dereference(h_m_sprite2_xpos)))) - (4))) | 0);
                let sy = ((((((244) - (runtime.dereference(h_m_sprite2_ypos)))) - (4))) | 0);
                ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transpen?.(bitmap, cliprect, runtime.add(runtime.add(((runtime.shiftRight(runtime.dereference(h_m_spriteno), 4)) & (15)), 32), ((16) * (sprite_set_2))), 1, 0, 0, sx, sy, 0) ?? 0);
                if ((runtime.overrides["sprite_1_enabled"] ? runtime.overrides["sprite_1_enabled"]() : method_sprite_1_enabled(runtime))) {
                    let sprite_set_1 = ((((Number(((runtime.dereference(h_m_sprite_enable)) & (32))) !== Number(0)) ? 1 : 0)) | 0);
                    sx = ((((((236) - (runtime.dereference(h_m_sprite1_xpos)))) - (4))) | 0);
                    sy = ((((((244) - (runtime.dereference(h_m_sprite1_ypos)))) - (4))) | 0);
                    if (((Number(sy) < Number(0)) ? 1 : 0)) {
                        sy = ((0) | 0);
                    }
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).transpen?.(bitmap, cliprect, runtime.add(((runtime.dereference(h_m_spriteno)) & (15)), ((16) * (sprite_set_1))), 0, 0, 0, sx, sy, 0) ?? 0);
                }
            }
            function method_sprite_1_enabled(runtime) {
                const members = runtime.members;
                const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
                const h_m_collision_mask = members.m_collision_mask ?? runtime.member("m_collision_mask");
                return ((((((((((runtime.dereference(h_m_sprite_enable)) & (128))) ? 0 : 1)) || (((runtime.dereference(h_m_sprite_enable)) & (16)))) ? 1 : 0)) || (((Number(h_m_collision_mask) === Number(0)) ? 1 : 0))) ? 1 : 0);
            }
            function method_cb_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_pia.cb1_w"] ?? runtime.memberCall(members.m_pia, "cb1_w", 0, undefined))(state);
            }
            function method_ca_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_pia.ca1_w"] ?? runtime.memberCall(members.m_pia, "ca1_w", 0, undefined))(state);
            }
            function method_pit_out_0(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                if (state) {
                    members.m_pit_out = ((members.m_pit_out) | (((((1) & 0xff)) << (0))));
                }
                else {
                    members.m_pit_out = runtime.andAssign(members.m_pit_out, (~((((1) & 0xff)) << (0))));
                }
            }
            function method_pit_out_1(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                if (state) {
                    members.m_pit_out = ((members.m_pit_out) | (((((1) & 0xff)) << (1))));
                }
                else {
                    members.m_pit_out = runtime.andAssign(members.m_pit_out, (~((((1) & 0xff)) << (1))));
                }
            }
            function method_pit_out_2(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_stream.update"] ?? runtime.memberCall(members.m_stream, "update", 0, __l["update"]))();
                if (state) {
                    members.m_pit_out = ((members.m_pit_out) | (((((1) & 0xff)) << (2))));
                }
                else {
                    members.m_pit_out = runtime.andAssign(members.m_pit_out, (~((((1) & 0xff)) << (2))));
                }
            }
            function method_pia_ca2_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ca2_callback"] ? __l["m_ca2_callback"](state) : runtime.macro("m_ca2_callback", state));
            }
            function method_pia_cb2_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_cb2_callback"] ? __l["m_cb2_callback"](state) : runtime.macro("m_cb2_callback", state));
            }
            function method_intsource_coins_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let dsw = (((__l["m_dsw.read"] ?? runtime.memberCall(members.m_dsw, "read", 0, __l["read"]))()) & 0xff);
                let in0 = (((__l["m_in0.read"] ?? runtime.memberCall(members.m_in0, "read", 0, __l["read"]))()) & 0xff);
                return ((((((((~in0)) >>> (7)) & 1)) << (1))) | ((((dsw) >>> (0)) & 1)));
            }
            return {
                "exidy_interrupt_r": method_exidy_interrupt_r,
                "sh8253_w": method_sh8253_w,
                "sfxctrl_w": method_sfxctrl_w,
                "exidy_vblank_interrupt": method_exidy_vblank_interrupt,
                "set_colors": method_set_colors,
                "set_1_color": method_set_1_color,
                "draw_sprites": method_draw_sprites,
                "sprite_1_enabled": method_sprite_1_enabled,
                "cb_w": method_cb_w,
                "ca_w": method_ca_w,
                "pit_out_0": method_pit_out_0,
                "pit_out_1": method_pit_out_1,
                "pit_out_2": method_pit_out_2,
                "pia_ca2_w": method_pia_ca2_w,
                "pia_cb2_w": method_pia_cb2_w,
                "intsource_coins_r": method_intsource_coins_r
            };
        })();
        return {
            "exidy_state.exidy_interrupt_r": methods["exidy_interrupt_r"],
            "exidy_state.exidy_vblank_interrupt": methods["exidy_vblank_interrupt"],
            "exidy_state.set_colors": methods["set_colors"],
            "exidy_state.set_1_color": methods["set_1_color"],
            "exidy_state.draw_sprites": methods["draw_sprites"],
            "exidy_state.sprite_1_enabled": methods["sprite_1_enabled"],
            "exidy_state.intsource_coins_r": methods["intsource_coins_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["device.execute", "execute", "m_ca2_callback", "m_cb2_callback", "m_dsw.read", "m_gfxdecode.gfx", "m_in0.read", "m_maincpu.set_input_line", "m_palette.set_pen_color", "m_pia.ca1_w", "m_pia.cb1_w", "m_pit.write", "m_stream.update", "machine", "machine().side_effects_disabled", "pal1bit", "read", "update"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
