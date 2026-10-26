// GENERATED executable machine composition from src/mame/snk/neogeo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mslug');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
                }
            }
            function method_unmapped_r(runtime, space) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((0) & 0xffff);
                if ((members.m_recurse ?? runtime.member("m_recurse"))) {
                    ret = ((65535) & 0xffff);
                }
                else {
                    members.m_recurse = ((1) ? 1 : 0);
                    ret = (((__l["space.read_word"] ?? runtime.memberCall(space, "read_word", 0, __l["read_word"]))((__l["m_maincpu.pc"] ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))())) & 0xffff);
                    members.m_recurse = ((0) ? 1 : 0);
                }
                return ret;
            }
            function method_video_register_r(runtime, space, offset, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((0) & 0xffff);
                if (((Number(mem_mask) === Number(255)) ? 1 : 0)) {
                    ret = (((((runtime.overrides["unmapped_r"] ? runtime.overrides["unmapped_r"](space) : method_unmapped_r(runtime, space))) & (255))) & 0xffff);
                }
                else {
                    switch (offset) {
                        default:
                            {
                                ret = (((__l["m_sprgen.get_videoram_data"] ?? runtime.memberCall(members.m_sprgen, "get_videoram_data", 0, undefined))()) & 0xffff);
                                break;
                            }
                        case 2:
                            {
                                ret = (((__l["m_sprgen.get_videoram_modulo"] ?? runtime.memberCall(members.m_sprgen, "get_videoram_modulo", 0, undefined))()) & 0xffff);
                                break;
                            }
                        case 3:
                            {
                                ret = (((runtime.overrides["get_video_control"] ? runtime.overrides["get_video_control"]() : method_get_video_control(runtime))) & 0xffff);
                                break;
                            }
                    }
                }
                return ret;
            }
            function method_get_video_control(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let v_counter = ((runtime.add((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), 256)) & 0xffff);
                if (((Number(v_counter) >= Number(512)) ? 1 : 0)) {
                    v_counter = ((((v_counter) - (264))) & 0xffff);
                }
                let ret = ((((((v_counter) << (7))) | ((((__l["m_sprgen.get_auto_animation_counter"] ?? runtime.memberCall(members.m_sprgen, "get_auto_animation_counter", 0, undefined))()) & (7))))) & 0xffff);
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    if (0) {
                        0;
                    }
                }
                return ret;
            }
            function method_read(runtime, offset) {
                const members = runtime.members;
                if ((members.m_regsel ?? runtime.member("m_regsel"))) {
                    return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
                }
                else {
                    return 65535;
                }
            }
            function method_video_register_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(mem_mask) !== Number(255)) ? 1 : 0)) {
                    if (((Number(mem_mask) === Number(65280)) ? 1 : 0)) {
                        data = ((((((data) & (65280))) | (((data) >>> (8))))) & 0xffff);
                    }
                    switch (offset) {
                        case 0:
                            {
                                (__l["m_sprgen.set_videoram_offset"] ?? runtime.memberCall(members.m_sprgen, "set_videoram_offset", 0, undefined))(data);
                                break;
                            }
                        case 1:
                            {
                                (__l["m_sprgen.set_videoram_data"] ?? runtime.memberCall(members.m_sprgen, "set_videoram_data", 0, undefined))(data);
                                break;
                            }
                        case 2:
                            {
                                (__l["m_sprgen.set_videoram_modulo"] ?? runtime.memberCall(members.m_sprgen, "set_videoram_modulo", 0, undefined))(data);
                                break;
                            }
                        case 3:
                            {
                                (runtime.overrides["set_video_control"] ? runtime.overrides["set_video_control"](data) : method_set_video_control(runtime, data));
                                break;
                            }
                        case 4:
                            {
                                (runtime.overrides["set_display_counter_msb"] ? runtime.overrides["set_display_counter_msb"](data) : method_set_display_counter_msb(runtime, data));
                                break;
                            }
                        case 5:
                            {
                                (runtime.overrides["set_display_counter_lsb"] ? runtime.overrides["set_display_counter_lsb"](data) : method_set_display_counter_lsb(runtime, data));
                                break;
                            }
                        case 6:
                            {
                                (runtime.overrides["acknowledge_interrupt"] ? runtime.overrides["acknowledge_interrupt"](data) : method_acknowledge_interrupt(runtime, data));
                                break;
                            }
                        case 7:
                            {
                                break;
                            }
                    }
                }
            }
            function method_set_video_control(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (0) {
                    0;
                }
                (__l["m_sprgen.set_auto_animation_speed"] ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_speed", 0, undefined))(((data) >>> (8)));
                (__l["m_sprgen.set_auto_animation_disabled"] ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_disabled", 0, undefined))((((data) >>> (3)) & 1));
                (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
            }
            function method_set_display_position_interrupt_control(runtime, data) {
                const members = runtime.members;
                members.m_display_position_interrupt_control = ((data) & 0xff);
            }
            function method_set_display_counter_msb(runtime, data) {
                const members = runtime.members;
                members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
                0;
            }
            function method_set_display_counter_lsb(runtime, data) {
                const members = runtime.members;
                members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (4294901760))) | (data))) >>> 0);
                0;
                if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (5)) & 1)) {
                    0;
                    runtime.invoke("adjust_display_position_interrupt_timer");
                }
            }
            function method_acknowledge_interrupt(runtime, data) {
                const members = runtime.members;
                if ((((data) >>> (0)) & 1)) {
                    members.m_irq3_pending = ((0) & 0xff);
                }
                if ((((data) >>> (1)) & 1)) {
                    members.m_display_position_interrupt_pending = ((0) & 0xff);
                }
                if ((((data) >>> (2)) & 1)) {
                    members.m_vblank_interrupt_pending = ((0) & 0xff);
                }
                runtime.invoke("update_interrupts");
            }
            function method_paletteram_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
            }
            function method_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                let dark = ((((data) >>> (15))) & 0xff);
                let r = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
                let g = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
                let b = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
                (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark));
                (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2))));
            }
            function method_save_ram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
                    runtime.combineData(runtime.addressOf((members.m_save_ram ?? runtime.member("m_save_ram")), offset), data, mem_mask);
                }
            }
            function method_audio_cpu_enable_nmi_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_audionmi.in_w_1"] ?? runtime.memberCall(members.m_audionmi, "in_w_1", 0, undefined))(((((~offset)) >>> (4)) & 1));
            }
            function method_set_screen_shadow(runtime, state) {
                const members = runtime.members;
                members.m_screen_shadow = ((state) ? 1 : 0);
                (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
            }
            function method_set_pens(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let pen_base = runtime.add(runtime.add((__l["m_palette.pens"] ?? runtime.memberCall(members.m_palette, "pens", 0, undefined))(), (members.m_palette_bank ?? runtime.member("m_palette_bank"))), (((members.m_screen_shadow ?? runtime.member("m_screen_shadow"))) ? (8192) : (0)));
                (__l["m_sprgen.set_pens"] ?? runtime.memberCall(members.m_sprgen, "set_pens", 0, undefined))(pen_base);
                members.m_bg_pen = runtime.addressOf(pen_base, 4095);
            }
            function method_set_use_cart_vectors(runtime, state) {
                const members = runtime.members;
                members.m_use_cart_vectors = ((state) & 0xff);
            }
            function method_set_palette_bank(runtime, state) {
                const members = runtime.members;
                members.m_palette_bank = ((((state) ? (4096) : (0))) >>> 0);
                (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(runtime.dereference((members.m_bg_pen ?? runtime.member("m_bg_pen"))), cliprect);
                (__l["m_sprgen.draw_sprites"] ?? runtime.memberCall(members.m_sprgen, "draw_sprites", 0, undefined))(bitmap, cliprect.min_y);
                (__l["m_sprgen.draw_fixed_layer"] ?? runtime.memberCall(members.m_sprgen, "draw_fixed_layer", 0, undefined))(bitmap, cliprect.min_y);
                return 0;
            }
            function method_sprite_on_scanline(runtime, scanline, y, rows) {
                const members = runtime.members;
                return ((((((((Number(rows) === Number(0)) ? 1 : 0)) || (((Number(rows) >= Number(32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
            }
            function method_draw_fixed_layer_2pixels(runtime, pixel_addr, offset, gfx_base, char_pens) {
                const members = runtime.members;
                let data = ((runtime.readIndex(gfx_base, offset)) & 0xff);
                if (((data) & (15))) {
                    runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
                }
                pixel_addr.offset += 1;
                if (((data) & (240))) {
                    runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, runtime.shiftRight(((data) & (240)), 4)));
                }
                pixel_addr.offset += 1;
                return pixel_addr;
            }
            function method_lock1_w(runtime, state) {
                const members = runtime.members;
                members.m_lock1 = state;
            }
            function method_unlock2_w(runtime, state) {
                const members = runtime.members;
                members.m_unlock2 = state;
            }
            function method_regsel_w(runtime, state) {
                const members = runtime.members;
                members.m_regsel = state;
            }
            function method_in0_edge_joy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((((__l["m_edge.in0_r"] ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) & ((__l["m_ctrl1.read_ctrl"] ?? runtime.memberCall(members.m_ctrl1, "read_ctrl", 0, undefined))()))) << (8))) | ((__l["m_dsw.read"] ?? runtime.memberCall(members.m_dsw, "read", 0, __l["read"]))()));
            }
            function method_in0_edge_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((__l["m_edge.in0_r"] ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) << (8))) | ((__l["m_dsw.read"] ?? runtime.memberCall(members.m_dsw, "read", 0, __l["read"]))()));
            }
            function method_in1_edge_joy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((((__l["m_edge.in1_r"] ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) & ((__l["m_ctrl2.read_ctrl"] ?? runtime.memberCall(members.m_ctrl2, "read_ctrl", 0, undefined))()))) << (8))) | (255));
            }
            function method_in1_edge_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((__l["m_edge.in1_r"] ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) << (8))) | (255));
            }
            function method_memcard_r(runtime, offset, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__l["m_maincpu.eat_cycles"] ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
                }
                if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__l["m_memcard.present"] ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
                    return (__l["m_memcard.read"] ?? runtime.memberCall(members.m_memcard, "read", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)));
                }
                else {
                    return 65535;
                }
            }
            function method_memcard_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.eat_cycles"] ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
                if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__l["m_memcard.present"] ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
                    (__l["m_memcard.write"] ?? runtime.memberCall(members.m_memcard, "write", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data);
                }
            }
            function method_set_use_cart_audio(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_use_cart_audio = ((state) & 0xff);
                (__l["m_sprgen.set_fixed_layer_source"] ?? runtime.memberCall(members.m_sprgen, "set_fixed_layer_source", 0, undefined))(state);
                (__l["m_bank_audio_main.set_entry"] ?? runtime.memberCall(members.m_bank_audio_main, "set_entry", 0, __l["set_entry"]))((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio")));
            }
            function method_set_save_ram_unlock(runtime, state) {
                const members = runtime.members;
                members.m_save_ram_unlocked = ((state) & 0xff);
            }
            function method_startsel_edge_joy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
                const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
                let ret = (((((__l["m_edge.read_start_sel"] ?? runtime.memberCall(members.m_edge, "read_start_sel", 0, undefined))()) | (-6))) >>> 0);
                if (h_m_ctrl1) {
                    ret = ((((ret) & ((((((__l["m_ctrl1.read_start_sel"] ?? runtime.memberCall(members.m_ctrl1, "read_start_sel", 0, undefined))()) << (0))) | (-4))))) >>> 0);
                }
                if (h_m_ctrl2) {
                    ret = ((((ret) & ((((((__l["m_ctrl2.read_start_sel"] ?? runtime.memberCall(members.m_ctrl2, "read_start_sel", 0, undefined))()) << (2))) | (-13))))) >>> 0);
                }
                return ret;
            }
            function method_io_control_w__base(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
                const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
                const h_m_edge = members.m_edge ?? runtime.member("m_edge");
                switch (((offset) & (56))) {
                    case 0:
                        {
                            if (h_m_ctrl1) {
                                (__l["m_ctrl1.write_ctrlsel"] ?? runtime.memberCall(members.m_ctrl1, "write_ctrlsel", 0, undefined))(((data) & (7)));
                            }
                            if (h_m_ctrl2) {
                                (__l["m_ctrl2.write_ctrlsel"] ?? runtime.memberCall(members.m_ctrl2, "write_ctrlsel", 0, undefined))(((((data) >>> (3))) & (7)));
                            }
                            if (h_m_edge) {
                                (__l["m_edge.write_ctrlsel"] ?? runtime.memberCall(members.m_edge, "write_ctrlsel", 0, undefined))(((data) & (63)));
                            }
                            break;
                        }
                    case 8:
                        {
                            members.m_card_bank = ((((data) & (7))) & 0xff);
                            break;
                        }
                    default:
                        {
                            0;
                        }
                }
            }
            return {
                "write": method_write,
                "unmapped_r": method_unmapped_r,
                "video_register_r": method_video_register_r,
                "get_video_control": method_get_video_control,
                "read": method_read,
                "video_register_w": method_video_register_w,
                "set_video_control": method_set_video_control,
                "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
                "set_display_counter_msb": method_set_display_counter_msb,
                "set_display_counter_lsb": method_set_display_counter_lsb,
                "acknowledge_interrupt": method_acknowledge_interrupt,
                "paletteram_r": method_paletteram_r,
                "paletteram_w": method_paletteram_w,
                "save_ram_w": method_save_ram_w,
                "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
                "set_screen_shadow": method_set_screen_shadow,
                "set_pens": method_set_pens,
                "set_use_cart_vectors": method_set_use_cart_vectors,
                "set_palette_bank": method_set_palette_bank,
                "screen_update": method_screen_update,
                "sprite_on_scanline": method_sprite_on_scanline,
                "lock1_w": method_lock1_w,
                "unlock2_w": method_unlock2_w,
                "regsel_w": method_regsel_w,
                "in0_edge_joy_r": method_in0_edge_joy_r,
                "in0_edge_r": method_in0_edge_r,
                "in1_edge_joy_r": method_in1_edge_joy_r,
                "in1_edge_r": method_in1_edge_r,
                "memcard_r": method_memcard_r,
                "memcard_w": method_memcard_w,
                "set_use_cart_audio": method_set_use_cart_audio,
                "set_save_ram_unlock": method_set_save_ram_unlock,
                "startsel_edge_joy_r": method_startsel_edge_joy_r,
                "io_control_w__base": method_io_control_w__base
            };
        })();
        return {
            "neogeo_base_state.unmapped_r": methods["unmapped_r"],
            "neogeo_base_state.video_register_r": methods["video_register_r"],
            "neogeo_base_state.get_video_control": methods["get_video_control"],
            "neogeo_base_state.video_register_w": methods["video_register_w"],
            "neogeo_base_state.set_video_control": methods["set_video_control"],
            "neogeo_base_state.set_display_position_interrupt_control": methods["set_display_position_interrupt_control"],
            "neogeo_base_state.set_display_counter_msb": methods["set_display_counter_msb"],
            "neogeo_base_state.set_display_counter_lsb": methods["set_display_counter_lsb"],
            "neogeo_base_state.acknowledge_interrupt": methods["acknowledge_interrupt"],
            "neogeo_base_state.paletteram_r": methods["paletteram_r"],
            "neogeo_base_state.paletteram_w": methods["paletteram_w"],
            "neogeo_base_state.audio_cpu_enable_nmi_w": methods["audio_cpu_enable_nmi_w"],
            "neogeo_base_state.set_screen_shadow": methods["set_screen_shadow"],
            "neogeo_base_state.set_pens": methods["set_pens"],
            "neogeo_base_state.set_use_cart_vectors": methods["set_use_cart_vectors"],
            "neogeo_base_state.set_palette_bank": methods["set_palette_bank"],
            "neogeo_base_state.screen_update": methods["screen_update"],
            "neogeo_base_state.io_control_w__base": methods["io_control_w__base"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
                }
            }
            function method_unmapped_r(runtime, space) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ret = ((0) & 0xffff);
                if ((members.m_recurse ?? runtime.member("m_recurse"))) {
                    ret = ((65535) & 0xffff);
                }
                else {
                    members.m_recurse = ((1) ? 1 : 0);
                    ret = (((__l["space.read_word"] ?? runtime.memberCall(space, "read_word", 0, __l["read_word"]))((__l["m_maincpu.pc"] ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))())) & 0xffff);
                    members.m_recurse = ((0) ? 1 : 0);
                }
                return ret;
            }
            function method_read(runtime, offset) {
                const members = runtime.members;
                if ((members.m_regsel ?? runtime.member("m_regsel"))) {
                    return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
                }
                else {
                    return 65535;
                }
            }
            function method_video_register_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(mem_mask) !== Number(255)) ? 1 : 0)) {
                    if (((Number(mem_mask) === Number(65280)) ? 1 : 0)) {
                        data = ((((((data) & (65280))) | (((data) >>> (8))))) & 0xffff);
                    }
                    switch (offset) {
                        case 0:
                            {
                                (__l["m_sprgen.set_videoram_offset"] ?? runtime.memberCall(members.m_sprgen, "set_videoram_offset", 0, undefined))(data);
                                break;
                            }
                        case 1:
                            {
                                (__l["m_sprgen.set_videoram_data"] ?? runtime.memberCall(members.m_sprgen, "set_videoram_data", 0, undefined))(data);
                                break;
                            }
                        case 2:
                            {
                                (__l["m_sprgen.set_videoram_modulo"] ?? runtime.memberCall(members.m_sprgen, "set_videoram_modulo", 0, undefined))(data);
                                break;
                            }
                        case 3:
                            {
                                (runtime.overrides["set_video_control"] ? runtime.overrides["set_video_control"](data) : method_set_video_control(runtime, data));
                                break;
                            }
                        case 4:
                            {
                                (runtime.overrides["set_display_counter_msb"] ? runtime.overrides["set_display_counter_msb"](data) : method_set_display_counter_msb(runtime, data));
                                break;
                            }
                        case 5:
                            {
                                (runtime.overrides["set_display_counter_lsb"] ? runtime.overrides["set_display_counter_lsb"](data) : method_set_display_counter_lsb(runtime, data));
                                break;
                            }
                        case 6:
                            {
                                (runtime.overrides["acknowledge_interrupt"] ? runtime.overrides["acknowledge_interrupt"](data) : method_acknowledge_interrupt(runtime, data));
                                break;
                            }
                        case 7:
                            {
                                break;
                            }
                    }
                }
            }
            function method_set_video_control(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (0) {
                    0;
                }
                (__l["m_sprgen.set_auto_animation_speed"] ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_speed", 0, undefined))(((data) >>> (8)));
                (__l["m_sprgen.set_auto_animation_disabled"] ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_disabled", 0, undefined))((((data) >>> (3)) & 1));
                (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
            }
            function method_set_display_position_interrupt_control(runtime, data) {
                const members = runtime.members;
                members.m_display_position_interrupt_control = ((data) & 0xff);
            }
            function method_set_display_counter_msb(runtime, data) {
                const members = runtime.members;
                members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
                0;
            }
            function method_set_display_counter_lsb(runtime, data) {
                const members = runtime.members;
                members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (4294901760))) | (data))) >>> 0);
                0;
                if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (5)) & 1)) {
                    0;
                    runtime.invoke("adjust_display_position_interrupt_timer");
                }
            }
            function method_acknowledge_interrupt(runtime, data) {
                const members = runtime.members;
                if ((((data) >>> (0)) & 1)) {
                    members.m_irq3_pending = ((0) & 0xff);
                }
                if ((((data) >>> (1)) & 1)) {
                    members.m_display_position_interrupt_pending = ((0) & 0xff);
                }
                if ((((data) >>> (2)) & 1)) {
                    members.m_vblank_interrupt_pending = ((0) & 0xff);
                }
                runtime.invoke("update_interrupts");
            }
            function method_paletteram_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
            }
            function method_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                let dark = ((((data) >>> (15))) & 0xff);
                let r = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
                let g = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
                let b = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
                (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark));
                (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2))));
            }
            function method_save_ram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
                    runtime.combineData(runtime.addressOf((members.m_save_ram ?? runtime.member("m_save_ram")), offset), data, mem_mask);
                }
            }
            function method_audio_cpu_enable_nmi_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_audionmi.in_w_1"] ?? runtime.memberCall(members.m_audionmi, "in_w_1", 0, undefined))(((((~offset)) >>> (4)) & 1));
            }
            function method_set_screen_shadow(runtime, state) {
                const members = runtime.members;
                members.m_screen_shadow = ((state) ? 1 : 0);
                (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
            }
            function method_set_pens(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let pen_base = runtime.add(runtime.add((__l["m_palette.pens"] ?? runtime.memberCall(members.m_palette, "pens", 0, undefined))(), (members.m_palette_bank ?? runtime.member("m_palette_bank"))), (((members.m_screen_shadow ?? runtime.member("m_screen_shadow"))) ? (8192) : (0)));
                (__l["m_sprgen.set_pens"] ?? runtime.memberCall(members.m_sprgen, "set_pens", 0, undefined))(pen_base);
                members.m_bg_pen = runtime.addressOf(pen_base, 4095);
            }
            function method_set_use_cart_vectors(runtime, state) {
                const members = runtime.members;
                members.m_use_cart_vectors = ((state) & 0xff);
            }
            function method_set_palette_bank(runtime, state) {
                const members = runtime.members;
                members.m_palette_bank = ((((state) ? (4096) : (0))) >>> 0);
                (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
            }
            function method_sprite_on_scanline(runtime, scanline, y, rows) {
                const members = runtime.members;
                return ((((((((Number(rows) === Number(0)) ? 1 : 0)) || (((Number(rows) >= Number(32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
            }
            function method_draw_fixed_layer_2pixels(runtime, pixel_addr, offset, gfx_base, char_pens) {
                const members = runtime.members;
                let data = ((runtime.readIndex(gfx_base, offset)) & 0xff);
                if (((data) & (15))) {
                    runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
                }
                pixel_addr.offset += 1;
                if (((data) & (240))) {
                    runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, runtime.shiftRight(((data) & (240)), 4)));
                }
                pixel_addr.offset += 1;
                return pixel_addr;
            }
            function method_lock1_w(runtime, state) {
                const members = runtime.members;
                members.m_lock1 = state;
            }
            function method_unlock2_w(runtime, state) {
                const members = runtime.members;
                members.m_unlock2 = state;
            }
            function method_regsel_w(runtime, state) {
                const members = runtime.members;
                members.m_regsel = state;
            }
            function method_in0_edge_joy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((((__l["m_edge.in0_r"] ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) & ((__l["m_ctrl1.read_ctrl"] ?? runtime.memberCall(members.m_ctrl1, "read_ctrl", 0, undefined))()))) << (8))) | ((__l["m_dsw.read"] ?? runtime.memberCall(members.m_dsw, "read", 0, __l["read"]))()));
            }
            function method_in0_edge_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((__l["m_edge.in0_r"] ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) << (8))) | ((__l["m_dsw.read"] ?? runtime.memberCall(members.m_dsw, "read", 0, __l["read"]))()));
            }
            function method_in1_edge_joy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((((__l["m_edge.in1_r"] ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) & ((__l["m_ctrl2.read_ctrl"] ?? runtime.memberCall(members.m_ctrl2, "read_ctrl", 0, undefined))()))) << (8))) | (255));
            }
            function method_in1_edge_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((__l["m_edge.in1_r"] ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) << (8))) | (255));
            }
            function method_memcard_r(runtime, offset, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__l["m_maincpu.eat_cycles"] ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
                }
                if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__l["m_memcard.present"] ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
                    return (__l["m_memcard.read"] ?? runtime.memberCall(members.m_memcard, "read", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)));
                }
                else {
                    return 65535;
                }
            }
            function method_memcard_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.eat_cycles"] ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
                if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__l["m_memcard.present"] ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
                    (__l["m_memcard.write"] ?? runtime.memberCall(members.m_memcard, "write", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data);
                }
            }
            function method_set_use_cart_audio(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_use_cart_audio = ((state) & 0xff);
                (__l["m_sprgen.set_fixed_layer_source"] ?? runtime.memberCall(members.m_sprgen, "set_fixed_layer_source", 0, undefined))(state);
                (__l["m_bank_audio_main.set_entry"] ?? runtime.memberCall(members.m_bank_audio_main, "set_entry", 0, __l["set_entry"]))((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio")));
            }
            function method_set_save_ram_unlock(runtime, state) {
                const members = runtime.members;
                members.m_save_ram_unlocked = ((state) & 0xff);
            }
            function method_startsel_edge_joy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
                const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
                let ret = (((((__l["m_edge.read_start_sel"] ?? runtime.memberCall(members.m_edge, "read_start_sel", 0, undefined))()) | (-6))) >>> 0);
                if (h_m_ctrl1) {
                    ret = ((((ret) & ((((((__l["m_ctrl1.read_start_sel"] ?? runtime.memberCall(members.m_ctrl1, "read_start_sel", 0, undefined))()) << (0))) | (-4))))) >>> 0);
                }
                if (h_m_ctrl2) {
                    ret = ((((ret) & ((((((__l["m_ctrl2.read_start_sel"] ?? runtime.memberCall(members.m_ctrl2, "read_start_sel", 0, undefined))()) << (2))) | (-13))))) >>> 0);
                }
                return ret;
            }
            function method_io_control_w__base(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
                const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
                const h_m_edge = members.m_edge ?? runtime.member("m_edge");
                switch (((offset) & (56))) {
                    case 0:
                        {
                            if (h_m_ctrl1) {
                                (__l["m_ctrl1.write_ctrlsel"] ?? runtime.memberCall(members.m_ctrl1, "write_ctrlsel", 0, undefined))(((data) & (7)));
                            }
                            if (h_m_ctrl2) {
                                (__l["m_ctrl2.write_ctrlsel"] ?? runtime.memberCall(members.m_ctrl2, "write_ctrlsel", 0, undefined))(((((data) >>> (3))) & (7)));
                            }
                            if (h_m_edge) {
                                (__l["m_edge.write_ctrlsel"] ?? runtime.memberCall(members.m_edge, "write_ctrlsel", 0, undefined))(((data) & (63)));
                            }
                            break;
                        }
                    case 8:
                        {
                            members.m_card_bank = ((((data) & (7))) & 0xff);
                            break;
                        }
                    default:
                        {
                            0;
                        }
                }
            }
            return {
                "write": method_write,
                "unmapped_r": method_unmapped_r,
                "read": method_read,
                "video_register_w": method_video_register_w,
                "set_video_control": method_set_video_control,
                "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
                "set_display_counter_msb": method_set_display_counter_msb,
                "set_display_counter_lsb": method_set_display_counter_lsb,
                "acknowledge_interrupt": method_acknowledge_interrupt,
                "paletteram_r": method_paletteram_r,
                "paletteram_w": method_paletteram_w,
                "save_ram_w": method_save_ram_w,
                "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
                "set_screen_shadow": method_set_screen_shadow,
                "set_pens": method_set_pens,
                "set_use_cart_vectors": method_set_use_cart_vectors,
                "set_palette_bank": method_set_palette_bank,
                "sprite_on_scanline": method_sprite_on_scanline,
                "lock1_w": method_lock1_w,
                "unlock2_w": method_unlock2_w,
                "regsel_w": method_regsel_w,
                "in0_edge_joy_r": method_in0_edge_joy_r,
                "in0_edge_r": method_in0_edge_r,
                "in1_edge_joy_r": method_in1_edge_joy_r,
                "in1_edge_r": method_in1_edge_r,
                "memcard_r": method_memcard_r,
                "memcard_w": method_memcard_w,
                "set_use_cart_audio": method_set_use_cart_audio,
                "set_save_ram_unlock": method_set_save_ram_unlock,
                "startsel_edge_joy_r": method_startsel_edge_joy_r,
                "io_control_w__base": method_io_control_w__base
            };
        })();
        return {
            "ngarcade_base_state.unmapped_r": methods["unmapped_r"],
            "ngarcade_base_state.save_ram_w": methods["save_ram_w"],
            "ngarcade_base_state.in0_edge_joy_r": methods["in0_edge_joy_r"],
            "ngarcade_base_state.in0_edge_r": methods["in0_edge_r"],
            "ngarcade_base_state.in1_edge_joy_r": methods["in1_edge_joy_r"],
            "ngarcade_base_state.in1_edge_r": methods["in1_edge_r"],
            "ngarcade_base_state.memcard_r": methods["memcard_r"],
            "ngarcade_base_state.memcard_w": methods["memcard_w"],
            "ngarcade_base_state.set_use_cart_audio": methods["set_use_cart_audio"],
            "ngarcade_base_state.set_save_ram_unlock": methods["set_save_ram_unlock"],
            "ngarcade_base_state.startsel_edge_joy_r": methods["startsel_edge_joy_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "fill", "m_audionmi.in_w_1", "m_bank_audio_main.set_entry", "m_ctrl1.read_ctrl", "m_ctrl1.read_start_sel", "m_ctrl1.write_ctrlsel", "m_ctrl2.read_ctrl", "m_ctrl2.read_start_sel", "m_ctrl2.write_ctrlsel", "m_dsw.read", "m_edge.in0_r", "m_edge.in1_r", "m_edge.read_start_sel", "m_edge.write_ctrlsel", "m_maincpu.eat_cycles", "m_maincpu.pc", "m_memcard.present", "m_memcard.read", "m_memcard.write", "m_palette.pens", "m_palette.set_pen_color", "m_screen.vpos", "m_sprgen.draw_fixed_layer", "m_sprgen.draw_sprites", "m_sprgen.get_auto_animation_counter", "m_sprgen.get_videoram_data", "m_sprgen.get_videoram_modulo", "m_sprgen.set_auto_animation_disabled", "m_sprgen.set_auto_animation_speed", "m_sprgen.set_fixed_layer_source", "m_sprgen.set_pens", "m_sprgen.set_videoram_data", "m_sprgen.set_videoram_modulo", "m_sprgen.set_videoram_offset", "machine", "machine().side_effects_disabled", "read", "read_word", "set_entry", "space.read_word"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
