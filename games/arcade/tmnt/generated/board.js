// GENERATED executable machine composition from src/mame/konami/tmnt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'tmnt');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_k052109_word_noA12_r(runtime, offset, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                offset = ((((((offset) & (12288))) >>> (1))) | (((offset) & (2047))));
                if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                    return (((__l["m_k052109.read"] ? __l["m_k052109.read"](offset) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).read?.(offset) ?? 0) : 0)) << (8));
                }
                else {
                    return (__l["m_k052109.read"] ? __l["m_k052109.read"](((offset) + (8192))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).read?.(((offset) + (8192))) ?? 0) : 0);
                }
            }
            function method_k052109_word_noA12_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                offset = ((((((offset) & (12288))) >>> (1))) | (((offset) & (2047))));
                if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                    (__l["m_k052109.write"] ? __l["m_k052109.write"](offset, ((((data) >>> (8))) & (255))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).write?.(offset, ((((data) >>> (8))) & (255))) ?? 0) : 0);
                }
                else {
                    (__l["m_k052109.write"] ? __l["m_k052109.write"](((offset) + (8192)), ((data) & (255))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).write?.(((offset) + (8192)), ((data) & (255))) ?? 0) : 0);
                }
            }
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(((offset) & (8191))) < Number(6144)) ? 1 : 0)) {
                    if (((Number(offset) >= Number(16384)) ? 1 : 0)) {
                        members.m_has_extra_video_ram = 1;
                    }
                    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
                    ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), ((((offset) & (6144))) >>> (11))))).mark_tile_dirty?.(((offset) & (2047))) ?? 0);
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
                                            if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 1)) !== Number(((((data) >>> (4))) & (15)))) ? 1 : 0)) {
                                                dirty = ((((dirty) | (2))) | 0);
                                            }
                                            if (dirty) {
                                                runtime.writeIndex(runtime.writableMember("m_charrombank"), 0, ((data) & (15)));
                                                runtime.writeIndex(runtime.writableMember("m_charrombank"), 1, ((((data) >>> (4))) & (15)));
                                                for (let i = ((0) | 0); ((Number(i) < Number(6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                    let bank = ((((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), i)) & (12))) >>> (2))) | 0);
                                                    if (((((((((Number(bank) === Number(0)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || ((((((Number(bank) === Number(1)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                                                        ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), ((((i) & (6144))) >>> (11))))).mark_tile_dirty?.(((i) & (2047))) ?? 0);
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
                                                        if (((Number(runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), 3)) !== Number(((((data) >>> (4))) & (15)))) ? 1 : 0)) {
                                                            dirty = ((((dirty) | (2))) | 0);
                                                        }
                                                        if (dirty) {
                                                            runtime.writeIndex(runtime.writableMember("m_charrombank"), 2, ((data) & (15)));
                                                            runtime.writeIndex(runtime.writableMember("m_charrombank"), 3, ((((data) >>> (4))) & (15)));
                                                            for (let i = ((0) | 0); ((Number(i) < Number(6144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                                                let bank = ((((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), i)) & (12))) >>> (2))) | 0);
                                                                if (((((((((Number(bank) === Number(2)) ? 1 : 0)) && (((dirty) & (1)))) ? 1 : 0)) || ((((((Number(bank) === Number(3)) ? 1 : 0)) && (((dirty) & (2)))) ? 1 : 0))) ? 1 : 0)) {
                                                                    ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), ((((i) & (6144))) >>> (11))))).mark_tile_dirty?.(((i) & (2047))) ?? 0);
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
                                                                    runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 1, ((((data) >>> (4))) & (15)));
                                                                }
                                                                else {
                                                                    if (((Number(offset) === Number(16128)) ? 1 : 0)) {
                                                                        runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 2, ((data) & (15)));
                                                                        runtime.writeIndex(runtime.writableMember("m_charrombank_2"), 3, ((((data) >>> (4))) & (15)));
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
            function method_k051937_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                offset = runtime.andAssign(offset, 7);
                if (((Number(offset) === Number(0)) ? 1 : 0)) {
                    if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (0)) & 1)) {
                        (__l["m_irq_handler"] ? __l["m_irq_handler"](0) : runtime.macro("m_irq_handler", 0));
                    }
                    if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (1)) & 1)) {
                        (__l["m_firq_handler"] ? __l["m_firq_handler"](0) : runtime.macro("m_firq_handler", 0));
                    }
                    if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (2)) & 1)) {
                        (__l["m_nmi_handler"] ? __l["m_nmi_handler"](0) : runtime.macro("m_nmi_handler", 0));
                    }
                    members.m_control = data;
                }
                else {
                    if (((Number(offset) === Number(1)) ? 1 : 0)) {
                        if (0) {
                            0;
                        }
                        if ((((((data) ^ ((members.m_shadow_config ?? runtime.member("m_shadow_config"))))) >>> (0)) & 1)) {
                            (__l["m_shadow_config_cb"] ? __l["m_shadow_config_cb"](((data) & (1))) : runtime.macro("m_shadow_config_cb", ((data) & (1))));
                        }
                        members.m_shadow_config = ((data) & (7));
                    }
                    else {
                        if ((((((Number(offset) >= Number(2)) ? 1 : 0)) && (((Number(offset) < Number(5)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.writeIndex(runtime.writableMember("m_spriterombank"), ((offset) - (2)), data);
                        }
                        else {
                        }
                    }
                }
            }
            function method_k051960_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
            }
            function method_priority_w(runtime, offset, data) {
                const members = runtime.members;
                members.m_priority = ((((((data) & (12))) >>> (2))) & 0xffff);
            }
            function method_sres_r(runtime) {
                const members = runtime.members;
                return (members.m_tmnt_soundlatch ?? runtime.member("m_tmnt_soundlatch"));
            }
            function method_tmnt_upd_start_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_upd7759.start_w"] ? __l["m_upd7759.start_w"]((((((data) >>> (0)) & 1)) ? 0 : 1)) : (members.m_upd7759) != null ? ((runtime.dereference(members.m_upd7759)).start_w?.((((((data) >>> (0)) & 1)) ? 0 : 1)) ?? 0) : 0);
            }
            function method_tmnt_upd_busy_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((__l["m_upd7759.busy_r"] ? __l["m_upd7759.busy_r"]() : (members.m_upd7759) != null ? (typeof (runtime.dereference(members.m_upd7759)).busy_r === 'function' ? (runtime.dereference(members.m_upd7759)).busy_r() : typeof (runtime.dereference(members.m_upd7759)).busy_r === 'number' || typeof (runtime.dereference(members.m_upd7759)).busy_r === 'boolean' ? (runtime.dereference(members.m_upd7759)).busy_r : runtime.container(members.m_upd7759, "busy_r")) : 0)) ? (1) : (0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_k052109.tilemap_draw"] ? __l["m_k052109.tilemap_draw"](screen, bitmap, cliprect, 2, 128, 0) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).tilemap_draw?.(screen, bitmap, cliprect, 2, 128, 0) ?? 0) : 0);
                if (((Number((((members.m_priority ?? runtime.member("m_priority"))) & (1))) === Number(1)) ? 1 : 0)) {
                    (__l["m_k051960.k051960_sprites_draw"] ? __l["m_k051960.k051960_sprites_draw"](bitmap, cliprect, (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 0, 0) : (members.m_k051960) != null ? ((runtime.dereference(members.m_k051960)).k051960_sprites_draw?.(bitmap, cliprect, (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 0, 0) ?? 0) : 0);
                }
                (__l["m_k052109.tilemap_draw"] ? __l["m_k052109.tilemap_draw"](screen, bitmap, cliprect, 1, 0, 0) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).tilemap_draw?.(screen, bitmap, cliprect, 1, 0, 0) ?? 0) : 0);
                if (((Number((((members.m_priority ?? runtime.member("m_priority"))) & (1))) === Number(0)) ? 1 : 0)) {
                    (__l["m_k051960.k051960_sprites_draw"] ? __l["m_k051960.k051960_sprites_draw"](bitmap, cliprect, (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 0, 0) : (members.m_k051960) != null ? ((runtime.dereference(members.m_k051960)).k051960_sprites_draw?.(bitmap, cliprect, (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 0, 0) ?? 0) : 0);
                }
                (__l["m_k052109.tilemap_draw"] ? __l["m_k052109.tilemap_draw"](screen, bitmap, cliprect, 0, 0, 0) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).tilemap_draw?.(screen, bitmap, cliprect, 0, 0, 0) ?? 0) : 0);
                return 0;
            }
            function method_vblank_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && ((members.m_irq5_mask ?? runtime.member("m_irq5_mask")))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](5, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(5, 1) ?? 0) : 0);
                }
            }
            function method_volume_callback(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_k007232.set_volume"] ? __l["m_k007232.set_volume"](0, ((((data) >>> (4))) * (17)), 0) : (members.m_k007232) != null ? ((runtime.dereference(members.m_k007232)).set_volume?.(0, ((((data) >>> (4))) * (17)), 0) ?? 0) : 0);
                (__l["m_k007232.set_volume"] ? __l["m_k007232.set_volume"](1, 0, ((((data) & (15))) * (17))) : (members.m_k007232) != null ? ((runtime.dereference(members.m_k007232)).set_volume?.(1, 0, ((((data) & (15))) * (17))) ?? 0) : 0);
            }
            function method_tmnt_tile_callback(runtime, layer, bank, code, color, flags, priority) {
                const members = runtime.members;
                code.set(((((code.get()) | (((((((((((color.get()) & (3))) << (8))) | (((((color.get()) & (16))) << (6))))) | (((((color.get()) & (12))) << (9))))) | (((bank) << (13))))))) | 0));
                color.set(((runtime.add(runtime.readIndex((members.m_layer_colorbase ?? runtime.member("m_layer_colorbase")), layer), ((((color.get()) & (224))) >>> (5)))) | 0));
            }
            function method_tmnt_sprite_callback(runtime, code, color, priority, shadow) {
                const members = runtime.members;
                code.set(((((code.get()) | (((((color.get()) & (16))) << (9))))) | 0));
                color.set(((runtime.add((members.m_sprite_colorbase ?? runtime.member("m_sprite_colorbase")), ((color.get()) & (15)))) | 0));
            }
            return {
                "k052109_word_noA12_r": method_k052109_word_noA12_r,
                "k052109_word_noA12_w": method_k052109_word_noA12_w,
                "write": method_write,
                "tileflip_reset": method_tileflip_reset,
                "k051937_w": method_k051937_w,
                "k051960_w": method_k051960_w,
                "priority_w": method_priority_w,
                "sres_r": method_sres_r,
                "tmnt_upd_start_w": method_tmnt_upd_start_w,
                "tmnt_upd_busy_r": method_tmnt_upd_busy_r,
                "screen_update": method_screen_update,
                "vblank_w": method_vblank_w,
                "volume_callback": method_volume_callback
            };
        })();
        return {
            "tmnt_state.k052109_word_noA12_r": methods["k052109_word_noA12_r"],
            "tmnt_state.k052109_word_noA12_w": methods["k052109_word_noA12_w"],
            "tmnt_state.priority_w": methods["priority_w"],
            "tmnt_state.sres_r": methods["sres_r"],
            "tmnt_state.tmnt_upd_start_w": methods["tmnt_upd_start_w"],
            "tmnt_state.tmnt_upd_busy_r": methods["tmnt_upd_busy_r"],
            "tmnt_state.screen_update": methods["screen_update"],
            "tmnt_state.vblank_w": methods["vblank_w"],
            "tmnt_state.volume_callback": methods["volume_callback"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_firq_handler", "m_irq_handler", "m_k007232.set_volume", "m_k051960.k051960_sprites_draw", "m_k052109.read", "m_k052109.tilemap_draw", "m_k052109.write", "m_maincpu.set_input_line", "m_nmi_handler", "m_shadow_config_cb", "m_upd7759.busy_r", "m_upd7759.start_w", "priority", "screen.priority"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
