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
            function method_k053246_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_kx46_regs"), offset, data);
            }
            function method_eeprom_w(runtime, data) {
                const members = runtime.members;
                if (((Number(data) === Number(255)) ? 1 : 0)) {
                    return;
                }
                (runtime.calls["m_io_eepromout.write"] ? runtime.calls["m_io_eepromout.write"](data, 255) : (members.m_io_eepromout) != null ? ((runtime.dereference(members.m_io_eepromout)).write?.(data, 255) ?? 0) : (runtime.calls["write"]?.(data, 255) ?? 0));
                (runtime.overrides["video_bank_select"] ? runtime.overrides["video_bank_select"](((data) & (3))) : method_video_bank_select(runtime, ((data) & (3))));
                members.m_firq_enabled = (((((data) >>> (2)) & 1)) ? 1 : 0);
                if ((((members.m_firq_enabled ?? runtime.member("m_firq_enabled"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(1, 0) ?? 0));
                }
            }
            function method_video_bank_select(runtime, bank) {
                const members = runtime.members;
                if ((((bank) >>> (0)) & 1)) {
                    (runtime.calls["m_palette_view.select"] ? runtime.calls["m_palette_view.select"](0) : (members.m_palette_view) != null ? ((runtime.dereference(members.m_palette_view)).select?.(0) ?? 0) : (runtime.calls["select"]?.(0) ?? 0));
                }
                else {
                    (runtime.calls["m_palette_view.disable"] ? runtime.calls["m_palette_view.disable"]() : (members.m_palette_view) != null ? (typeof (runtime.dereference(members.m_palette_view)).disable === 'function' ? (runtime.dereference(members.m_palette_view)).disable() : typeof (runtime.dereference(members.m_palette_view)).disable === 'number' || typeof (runtime.dereference(members.m_palette_view)).disable === 'boolean' ? (runtime.dereference(members.m_palette_view)).disable : runtime.container(members.m_palette_view, "disable")) : (runtime.calls["disable"]?.() ?? 0));
                }
                (runtime.calls["m_video_view.select"] ? runtime.calls["m_video_view.select"]((((bank) >>> (1)) & 1)) : (members.m_video_view) != null ? ((runtime.dereference(members.m_video_view)).select?.((((bank) >>> (1)) & 1)) ?? 0) : (runtime.calls["select"]?.((((bank) >>> (1)) & 1)) ?? 0));
            }
            function method_sound_interrupt_r(runtime) {
                const members = runtime.members;
                if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 2) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 2) ?? 0) : (runtime.calls["set_input_line"]?.(0, 2) ?? 0));
                }
                return 0;
            }
            function method_k052109_r(runtime, offset) {
                const members = runtime.members;
                return (runtime.calls["m_k052109.read"] ? runtime.calls["m_k052109.read"](((offset) + (8192))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).read?.(((offset) + (8192))) ?? 0) : (runtime.calls["read"]?.(((offset) + (8192))) ?? 0));
            }
            function method_k052109_w(runtime, offset, data) {
                const members = runtime.members;
                (runtime.calls["m_k052109.write"] ? runtime.calls["m_k052109.write"](((offset) + (8192)), data) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).write?.(((offset) + (8192)), data) ?? 0) : (runtime.calls["write"]?.(((offset) + (8192)), data) ?? 0));
            }
            function method_k053247_r(runtime, offset) {
                const members = runtime.members;
                let offs = ((offset) >>> (1));
                if ((((offset) >>> (0)) & 1)) {
                    return ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (255));
                }
                else {
                    return ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) >>> (8));
                }
            }
            function method_k053247_w(runtime, offset, data) {
                const members = runtime.members;
                let offs = ((offset) >>> (1));
                if ((((offset) >>> (0)) & 1)) {
                    runtime.writeIndex(runtime.writableMember("m_spriteram"), offs, ((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (65280))) | (data)));
                }
                else {
                    runtime.writeIndex(runtime.writableMember("m_spriteram"), offs, ((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), offs)) & (255))) | (((data) << (8)))));
                }
            }
            function method_z80_bankswitch_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_audiobank.set_entry"] ? runtime.calls["m_audiobank.set_entry"](((data) & (7))) : (members.m_audiobank) != null ? ((runtime.dereference(members.m_audiobank)).set_entry?.(((data) & (7))) ?? 0) : (runtime.calls["set_entry"]?.(((data) & (7))) ?? 0));
            }
            function method_banking_callback(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_mainbank.set_entry"] ? runtime.calls["m_mainbank.set_entry"](((data) & (63))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) & (63))) ?? 0) : (runtime.calls["set_entry"]?.(((data) & (63))) ?? 0));
            }
            function method_konami_sortlayers3(runtime, layer, pri) {
                const members = runtime.members;
                (runtime.calls["konami_sortlayers_3"] ? runtime.calls["konami_sortlayers_3"]((runtime.calls["std::less"] ? runtime.calls["std::less"]() : runtime.macro("std::less")), layer, pri) : runtime.macro("konami_sortlayers_3", (runtime.calls["std::less"] ? runtime.calls["std::less"]() : runtime.macro("std::less")), layer, pri));
            }
            function method_tile_callback(runtime, layer, bank, code, color, flags, priority) {
                const members = runtime.members;
                code.set(((code.get()) | (((((((color.get()) & (63))) << (8))) | (((bank) << (14)))))));
                color.set(runtime.add(runtime.readIndex((members.m_layer_colorbase ?? runtime.member("m_layer_colorbase")), layer), ((((color.get()) & (192))) >>> (6))));
            }
            function method_sprite_callback(runtime, code, color, priority_mask) {
                const members = runtime.members;
                let pri = ((((color.get()) & (3968))) >>> (6));
                if (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 2))) ? 1 : 0)) {
                    priority_mask.set(0);
                }
                else {
                    if ((((((Number(pri) > Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 2))) ? 1 : 0)) && (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 1))) ? 1 : 0))) ? 1 : 0)) {
                        priority_mask.set(240);
                    }
                    else {
                        if ((((((Number(pri) > Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 1))) ? 1 : 0)) && (((Number(pri) <= Number(runtime.readIndex((members.m_layerpri ?? runtime.member("m_layerpri")), 0))) ? 1 : 0))) ? 1 : 0)) {
                            priority_mask.set(((240) | (204)));
                        }
                        else {
                            priority_mask.set(((((240) | (204))) | (170)));
                        }
                    }
                }
                color.set(runtime.add((members.m_sprite_colorbase ?? runtime.member("m_sprite_colorbase")), ((color.get()) & (31))));
            }
            return {
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
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
