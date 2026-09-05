// GENERATED executable machine composition from src/mame/midw8080/mw8080bw.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'invaders');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_vpos_to_vysnc_chain_counter(runtime, vpos) {
                const members = runtime.members;
                let counter = ((0) & 0xff);
                let vblank = ((Number(vpos) >= Number(224)) ? 1 : 0);
                if (vblank) {
                    counter = ((runtime.add(((vpos) - (224)), 218)) & 0xff);
                }
                else {
                    counter = ((((vpos) + (32))) & 0xff);
                }
                return counter;
            }
            function method_vysnc_chain_counter_to_vpos(runtime, counter, vblank) {
                const members = runtime.members;
                let vpos = 0;
                if (vblank) {
                    vpos = runtime.add(((counter) - (218)), 224);
                }
                else {
                    vpos = ((counter) - (32));
                }
                return vpos;
            }
            function method_interrupt_vector(runtime, irqline) {
                const members = runtime.members;
                let vpos = (runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0));
                if (((Number((runtime.calls["machine().time"]?.() ?? 0)) < Number((members.m_interrupt_time ?? runtime.member("m_interrupt_time")))) ? 1 : 0)) {
                    vpos = ((vpos) + (1));
                }
                let counter = (((runtime.overrides["vpos_to_vysnc_chain_counter"] ? runtime.overrides["vpos_to_vysnc_chain_counter"](vpos) : method_vpos_to_vysnc_chain_counter(runtime, vpos))) & 0xff);
                let vector = ((((((199) | (((((counter) & (64))) >>> (2))))) | ((((((~counter)) & (64))) >>> (3))))) & 0xff);
                (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                return vector;
            }
            function method_int_enable_w(runtime, state) {
                const members = runtime.members;
                members.m_int_enable = ((state) ? 1 : 0);
            }
            function method_screen_update_invaders(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_flip_screen = members.m_flip_screen ?? runtime.member("m_flip_screen");
                const h_m_main_ram = members.m_main_ram ?? runtime.member("m_main_ram");
                let x = ((0) & 0xff);
                let y = ((32) & 0xff);
                let video_data = ((0) & 0xff);
                while (1) {
                    let pen = ((((video_data) & (1))) ? ((runtime.calls["rgb_t::white"] ? runtime.calls["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
                    if (h_m_flip_screen) {
                        bitmap["pix="](((((224) - (1))) - (((y) - (32)))), ((((260) - (1))) - (x)), pen);
                    }
                    else {
                        bitmap["pix="](((y) - (32)), x, pen);
                    }
                    video_data = ((((video_data) >>> (1))) & 0xff);
                    x = ((((x) + (1))) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                        for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                            pen = ((((video_data) & (1))) ? ((runtime.calls["rgb_t::white"] ? runtime.calls["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
                            if (h_m_flip_screen) {
                                bitmap["pix="](((((224) - (1))) - (((y) - (32)))), ((((260) - (1))) - (((256) + (i)))), pen);
                            }
                            else {
                                bitmap["pix="](((y) - (32)), ((256) + (i)), pen);
                            }
                            video_data = ((((video_data) >>> (1))) & 0xff);
                        }
                        y = ((((y) + (1))) & 0xff);
                        if (((Number(y) === Number(0)) ? 1 : 0)) {
                            break;
                        }
                    }
                    else {
                        if (((Number(((x) & (7))) === Number(4)) ? 1 : 0)) {
                            let offs = ((((y) << (5))) | (((x) >>> (3))));
                            video_data = ((runtime.readIndex(h_m_main_ram, offs)) & 0xff);
                        }
                    }
                }
                return 0;
            }
            return {
                "vpos_to_vysnc_chain_counter": method_vpos_to_vysnc_chain_counter,
                "vysnc_chain_counter_to_vpos": method_vysnc_chain_counter_to_vpos,
                "interrupt_vector": method_interrupt_vector,
                "int_enable_w": method_int_enable_w,
                "screen_update_invaders": method_screen_update_invaders
            };
        })();
        return {
            "mw8080bw_state.vpos_to_vysnc_chain_counter": methods["vpos_to_vysnc_chain_counter"],
            "mw8080bw_state.vysnc_chain_counter_to_vpos": methods["vysnc_chain_counter_to_vpos"],
            "mw8080bw_state.interrupt_vector": methods["interrupt_vector"],
            "mw8080bw_state.int_enable_w": methods["int_enable_w"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_screen_update_invaders(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_flip_screen = members.m_flip_screen ?? runtime.member("m_flip_screen");
                const h_m_main_ram = members.m_main_ram ?? runtime.member("m_main_ram");
                let x = ((0) & 0xff);
                let y = ((32) & 0xff);
                let video_data = ((0) & 0xff);
                while (1) {
                    let pen = ((((video_data) & (1))) ? ((runtime.calls["rgb_t::white"] ? runtime.calls["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
                    if (h_m_flip_screen) {
                        bitmap["pix="](((((224) - (1))) - (((y) - (32)))), ((((260) - (1))) - (x)), pen);
                    }
                    else {
                        bitmap["pix="](((y) - (32)), x, pen);
                    }
                    video_data = ((((video_data) >>> (1))) & 0xff);
                    x = ((((x) + (1))) & 0xff);
                    if (((Number(x) === Number(0)) ? 1 : 0)) {
                        for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                            pen = ((((video_data) & (1))) ? ((runtime.calls["rgb_t::white"] ? runtime.calls["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
                            if (h_m_flip_screen) {
                                bitmap["pix="](((((224) - (1))) - (((y) - (32)))), ((((260) - (1))) - (((256) + (i)))), pen);
                            }
                            else {
                                bitmap["pix="](((y) - (32)), ((256) + (i)), pen);
                            }
                            video_data = ((((video_data) >>> (1))) & 0xff);
                        }
                        y = ((((y) + (1))) & 0xff);
                        if (((Number(y) === Number(0)) ? 1 : 0)) {
                            break;
                        }
                    }
                    else {
                        if (((Number(((x) & (7))) === Number(4)) ? 1 : 0)) {
                            let offs = ((((y) << (5))) | (((x) >>> (3))));
                            video_data = ((runtime.readIndex(h_m_main_ram, offs)) & 0xff);
                        }
                    }
                }
                return 0;
            }
            return {
                "screen_update_invaders": method_screen_update_invaders
            };
        })();
        return {
            "invaders_state.screen_update_invaders": methods["screen_update_invaders"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
