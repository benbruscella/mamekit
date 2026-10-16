// GENERATED executable machine composition from src/mame/konami/simpsons.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'simpsons');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(((offset) & (8191))) < Number(6144)) ? 1 : 0)) {
                    if (((Number(offset) >= Number(16384)) ? 1 : 0)) {
                        members.m_has_extra_video_ram = 1;
                    }
                    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
                    ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), runtime.shiftRight(((offset) & (6144)), 11)))).mark_tile_dirty?.(((offset) & (2047))) ?? 0);
                }
                else {
                    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
                    if ((((((Number(offset) >= Number(6156)) ? 1 : 0)) && (((Number(offset) < Number(6196)) ? 1 : 0))) ? 1 : 0)) {
                    }
                    else {
                        if ((((((Number(offset) >= Number(6656)) ? 1 : 0)) && (((Number(offset) < Number(7168)) ? 1 : 0))) ? 1 : 0)) {
                        }
                        else {
                            if (((Number(offset) === Number(7168)) ? 1 : 0)) {
                                members.m_addrmap = data;
                            }
                            else {
                                if (((Number(offset) === Number(7296)) ? 1 : 0)) {
                                    if (((Number((members.m_scrollctrl ?? runtime.member("m_scrollctrl"))) !== Number(data)) ? 1 : 0)) {
                                        members.m_scrollctrl = data;
                                    }
                                }
                                else {
                                    if (((Number(offset) === Number(7424)) ? 1 : 0)) {
                                        if (((((((~data)) & ((members.m_irq_control ?? runtime.member("m_irq_control"))))) >>> (0)) & 1)) {
                                            (__l["m_nmi_handler"] ? __l["m_nmi_handler"](0) : runtime.macro("m_nmi_handler", 0));
                                        }
                                        if (((((((~data)) & ((members.m_irq_control ?? runtime.member("m_irq_control"))))) >>> (1)) & 1)) {
                                            (__l["m_firq_handler"] ? __l["m_firq_handler"](0) : runtime.macro("m_firq_handler", 0));
                                        }
                                        if (((((((~data)) & ((members.m_irq_control ?? runtime.member("m_irq_control"))))) >>> (2)) & 1)) {
                                            (__l["m_irq_handler"] ? __l["m_irq_handler"](0) : runtime.macro("m_irq_handler", 0));
                                        }
                                        members.m_irq_control = data;
                                    }
                                    else {
                                        if (((Number(offset) === Number(7552)) ? 1 : 0)) {
                                            let dirty = ((0) | 0);
                                            if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 0)) !== Number(((data) & (15)))) ? 1 : 0)) {
                                                dirty = ((((dirty) | (1))) | 0);
                                            }
                                            if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 1)) !== Number(((runtime.shiftRight(data, 4)) & (15)))) ? 1 : 0)) {
                                                dirty = ((((dirty) | (2))) | 0);
                                            }
                                            if (dirty) {
                                                runtime.writeIndex(runtime.writableMember("m_charrombank"), 0, ((data) & (15)));
                                                runtime.writeIndex(runtime.writableMember("m_charrombank"), 1, ((runtime.shiftRight(data, 4)) & (15)));
                                                for (let i = ((0) | 0); ((Number(i) < Number(6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                    let bank = ((runtime.shiftRight(((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), i)) & (12)), 2)) | 0);
                                                    if (((((((((Number(bank) === Number(0)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || ((((((Number(bank) === Number(1)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                                                        ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), runtime.shiftRight(((i) & (6144)), 11)))).mark_tile_dirty?.(((i) & (2047))) ?? 0);
                                                    }
                                                }
                                            }
                                        }
                                        else {
                                            if ((((((Number(offset) === Number(7680)) ? 1 : 0)) || (((Number(offset) === Number(15872)) ? 1 : 0))) ? 1 : 0)) {
                                                members.m_romsubbank = data;
                                            }
                                            else {
                                                if (((Number(offset) === Number(7808)) ? 1 : 0)) {
                                                    if (((Number((((members.m_tileflip_enable ?? runtime.member("m_tileflip_enable"))) & (6))) !== Number(((data) & (6)))) ? 1 : 0)) {
                                                        for (let i = ((0) | 0); ((Number(i) < Number(3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), i))).mark_all_dirty?.() ?? runtime.container(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), i), "mark_all_dirty"));
                                                        }
                                                    }
                                                    members.m_tileflip_enable = ((data) & (7));
                                                    (runtime.overrides["tileflip_reset"] ? runtime.overrides["tileflip_reset"]() : method_tileflip_reset(runtime));
                                                }
                                                else {
                                                    if (((Number(offset) === Number(7936)) ? 1 : 0)) {
                                                        let dirty = ((0) | 0);
                                                        if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 2)) !== Number(((data) & (15)))) ? 1 : 0)) {
                                                            dirty = ((((dirty) | (1))) | 0);
                                                        }
                                                        if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 3)) !== Number(((runtime.shiftRight(data, 4)) & (15)))) ? 1 : 0)) {
                                                            dirty = ((((dirty) | (2))) | 0);
                                                        }
                                                        if (dirty) {
                                                            runtime.writeIndex(runtime.writableMember("m_charrombank"), 2, ((data) & (15)));
                                                            runtime.writeIndex(runtime.writableMember("m_charrombank"), 3, ((runtime.shiftRight(data, 4)) & (15)));
                                                            for (let i = ((0) | 0); ((Number(i) < Number(6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                                let bank = ((runtime.shiftRight(((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), i)) & (12)), 2)) | 0);
                                                                if (((((((((Number(bank) === Number(2)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || ((((((Number(bank) === Number(3)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                                                                    ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), runtime.shiftRight(((i) & (6144)), 11)))).mark_tile_dirty?.(((i) & (2047))) ?? 0);
                                                                }
                                                            }
                                                        }
                                                    }
                                                    else {
                                                        if ((((((Number(offset) >= Number(14348)) ? 1 : 0)) && (((Number(offset) < Number(14388)) ? 1 : 0))) ? 1 : 0)) {
                                                        }
                                                        else {
                                                            if ((((((Number(offset) >= Number(14848)) ? 1 : 0)) && (((Number(offset) < Number(15360)) ? 1 : 0))) ? 1 : 0)) {
                                                            }
                                                            else {
                                                                if (((Number(offset) === Number(15744)) ? 1 : 0)) {
                                                                    runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 0, ((data) & (15)));
                                                                    runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 1, ((runtime.shiftRight(data, 4)) & (15)));
                                                                }
                                                                else {
                                                                    if (((Number(offset) === Number(16128)) ? 1 : 0)) {
                                                                        runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 2, ((data) & (15)));
                                                                        runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 3, ((runtime.shiftRight(data, 4)) & (15)));
                                                                    }
                                                                    else {
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function method_tileflip_reset(runtime) {
                const members = runtime.members;
                let flip = ((((((((members.m_tileflip_enable ?? runtime.member("m_tileflip_enable"))) >>> (0)) & 1)) ? (((2) | (1))) : (0))) >>> 0);
                for (let i = ((0) | 0); ((Number(i) < Number(3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), i))).set_flip?.(flip) ?? 0);
                }
            }
            function method_k053246_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_kx46_regs"), offset, data);
            }
            function method_eeprom_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(data) === Number(255)) ? 1 : 0)) {
                    return;
                }
                (__l["m_io_eepromout.write"] ? __l["m_io_eepromout.write"](data, 255) : (members.m_io_eepromout) != null ? ((runtime.dereference(members.m_io_eepromout)).write?.(data, 255) ?? 0) : (__l["write"]?.(data, 255) ?? 0));
                (runtime.overrides["video_bank_select"] ? runtime.overrides["video_bank_select"](((data) & (3))) : method_video_bank_select(runtime, ((data) & (3))));
                members.m_firq_enabled = (((((data) >>> (2)) & 1)) ? 1 : 0);
                if ((((members.m_firq_enabled ?? runtime.member("m_firq_enabled"))) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 0) ?? 0) : 0);
                }
            }
            function method_video_bank_select(runtime, bank) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((bank) >>> (0)) & 1)) {
                    (__l["m_palette_view.select"] ? __l["m_palette_view.select"](0) : (members.m_palette_view) != null ? ((runtime.dereference(members.m_palette_view)).select?.(0) ?? 0) : (__l["select"]?.(0) ?? 0));
                }
                else {
                    (__l["m_palette_view.disable"] ? __l["m_palette_view.disable"]() : (members.m_palette_view) != null ? (typeof (runtime.dereference(members.m_palette_view)).disable === 'function' ? (runtime.dereference(members.m_palette_view)).disable() : typeof (runtime.dereference(members.m_palette_view)).disable === 'number' || typeof (runtime.dereference(members.m_palette_view)).disable === 'boolean' ? (runtime.dereference(members.m_palette_view)).disable : runtime.container(members.m_palette_view, "disable")) : (__l["disable"]?.() ?? 0));
                }
                (__l["m_video_view.select"] ? __l["m_video_view.select"]((((bank) >>> (1)) & 1)) : (members.m_video_view) != null ? ((runtime.dereference(members.m_video_view)).select?.((((bank) >>> (1)) & 1)) ?? 0) : (__l["select"]?.((((bank) >>> (1)) & 1)) ?? 0));
            }
            function method_sound_interrupt_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (__l["m_audiocpu.set_input_line"] ? __l["m_audiocpu.set_input_line"](0, 2) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 2) ?? 0) : 0);
                }
                return 0;
            }
            function method_k052109_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_k052109.read"] ? __l["m_k052109.read"](((offset) + (8192))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).read?.(((offset) + (8192))) ?? 0) : 0);
            }
            function method_k052109_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_k052109.write"] ? __l["m_k052109.write"](((offset) + (8192)), data) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).write?.(((offset) + (8192)), data) ?? 0) : 0);
            }
            function method_k053247_r(runtime, offset) {
                const members = runtime.members;
                let offs = ((runtime.shiftRight(offset, 1)) | 0);
                if ((((offset) >>> (0)) & 1)) {
                    return ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (255));
                }
                else {
                    return runtime.shiftRight(runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs), 8);
                }
            }
            function method_k053247_w(runtime, offset, data) {
                const members = runtime.members;
                let offs = ((runtime.shiftRight(offset, 1)) | 0);
                if ((((offset) >>> (0)) & 1)) {
                    runtime.writeIndex(runtime.writableMember("m_spriteram"), offs, ((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (65280))) | (data)));
                }
                else {
                    runtime.writeIndex(runtime.writableMember("m_spriteram"), offs, ((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (255))) | (((data) << (8)))));
                }
            }
            function method_z80_bankswitch_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_audiobank.set_entry"] ? __l["m_audiobank.set_entry"](((data) & (7))) : (members.m_audiobank) != null ? ((runtime.dereference(members.m_audiobank)).set_entry?.(((data) & (7))) ?? 0) : (__l["set_entry"]?.(((data) & (7))) ?? 0));
            }
            function method_banking_callback(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_mainbank.set_entry"] ? __l["m_mainbank.set_entry"](((data) & (63))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) & (63))) ?? 0) : (__l["set_entry"]?.(((data) & (63))) ?? 0));
            }
            function method_konami_sortlayers3(runtime, layer, pri) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["konami_sortlayers_3"] ? __l["konami_sortlayers_3"]((__l["std::less"] ? __l["std::less"]() : runtime.macro("std::less")), layer, pri) : runtime.macro("konami_sortlayers_3", (__l["std::less"] ? __l["std::less"]() : runtime.macro("std::less")), layer, pri));
            }
            function method_tile_callback(runtime, layer, bank, code, color, flags, priority) {
                const members = runtime.members;
                code.set(((((code.get()) | (((((((color.get()) & (63))) << (8))) | (((bank) << (14))))))) | 0));
                color.set(((runtime.add(runtime.readIndex((members.m_layer_colorbase ?? runtime.member("m_layer_colorbase")), layer), runtime.shiftRight(((color.get()) & (192)), 6))) | 0));
            }
            function method_sprite_callback(runtime, code, color, priority_mask) {
                const members = runtime.members;
                let pri = ((runtime.shiftRight(((color.get()) & (3968)), 6)) | 0);
                if (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 2))) ? 1 : 0)) {
                    priority_mask.set(((0) | 0));
                }
                else {
                    if ((((((Number(pri) > Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 2))) ? 1 : 0)) && (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 1))) ? 1 : 0))) ? 1 : 0)) {
                        priority_mask.set(((240) | 0));
                    }
                    else {
                        if ((((((Number(pri) > Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 1))) ? 1 : 0)) && (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 0))) ? 1 : 0))) ? 1 : 0)) {
                            priority_mask.set(((252) | 0));
                        }
                        else {
                            priority_mask.set(((254) | 0));
                        }
                    }
                }
                color.set(((runtime.add((members.m_sprite_colorbase ?? runtime.member("m_sprite_colorbase")), ((color.get()) & (31)))) | 0));
            }
            return {
                "write": method_write,
                "tileflip_reset": method_tileflip_reset,
                "k053246_w": method_k053246_w,
                "eeprom_w": method_eeprom_w,
                "video_bank_select": method_video_bank_select,
                "sound_interrupt_r": method_sound_interrupt_r,
                "k052109_r": method_k052109_r,
                "k052109_w": method_k052109_w,
                "k053247_r": method_k053247_r,
                "k053247_w": method_k053247_w,
                "z80_bankswitch_w": method_z80_bankswitch_w,
                "banking_callback": method_banking_callback,
                "konami_sortlayers3": method_konami_sortlayers3
            };
        })();
        return {
            "simpsons_state.eeprom_w": methods["eeprom_w"],
            "simpsons_state.video_bank_select": methods["video_bank_select"],
            "simpsons_state.sound_interrupt_r": methods["sound_interrupt_r"],
            "simpsons_state.k052109_r": methods["k052109_r"],
            "simpsons_state.k052109_w": methods["k052109_w"],
            "simpsons_state.k053247_r": methods["k053247_r"],
            "simpsons_state.k053247_w": methods["k053247_w"],
            "simpsons_state.z80_bankswitch_w": methods["z80_bankswitch_w"],
            "simpsons_state.banking_callback": methods["banking_callback"],
            "simpsons_state.konami_sortlayers3": methods["konami_sortlayers3"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["disable", "konami_sortlayers_3", "m_audiobank.set_entry", "m_audiocpu.set_input_line", "m_firq_handler", "m_io_eepromout.write", "m_irq_handler", "m_k052109.read", "m_k052109.write", "m_mainbank.set_entry", "m_maincpu.set_input_line", "m_nmi_handler", "m_palette_view.disable", "m_palette_view.select", "m_video_view.select", "machine", "machine().side_effects_disabled", "select", "set_entry", "std::less", "write"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
