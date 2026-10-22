// GENERATED executable machine composition from src/mame/stern/berzerk.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'berzerk');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_vsync_chain_counter_to_vpos(runtime, counter, v256) {
                const members = runtime.members;
                let vpos = ((0) | 0);
                if (v256) {
                    vpos = ((runtime.add(((counter) - (218)), 256)) | 0);
                    if (((Number(vpos) >= Number(262)) ? 1 : 0)) {
                        vpos = ((((vpos) - (262))) | 0);
                    }
                }
                else {
                    vpos = ((counter) | 0);
                }
                return vpos;
            }
            function method_magicram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let alu_output = ((0) & 0xff);
                let current_video_data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset)) & 0xff);
                let shift_flop_output = ((runtime.shiftRight((((((((members.m_last_shift_data ?? runtime.member("m_last_shift_data"))) & 0xffff)) << (8))) | (data)), (((members.m_magicram_control ?? runtime.member("m_magicram_control"))) & (7)))) & 0xff);
                if ((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) & (8))) {
                    shift_flop_output = ((((((shift_flop_output) >>> (0)) & 1) << 7 | (((shift_flop_output) >>> (1)) & 1) << 6 | (((shift_flop_output) >>> (2)) & 1) << 5 | (((shift_flop_output) >>> (3)) & 1) << 4 | (((shift_flop_output) >>> (4)) & 1) << 3 | (((shift_flop_output) >>> (5)) & 1) << 2 | (((shift_flop_output) >>> (6)) & 1) << 1 | (((shift_flop_output) >>> (7)) & 1) << 0)) & 0xff);
                }
                if (((shift_flop_output) & (current_video_data))) {
                    members.m_intercept = ((0) & 0xff);
                }
                (__l["m_ls181_12c.input_a_w"] ?? runtime.memberCall(members.m_ls181_12c, "input_a_w", 0, undefined))(runtime.shiftRight(shift_flop_output, 0));
                (__l["m_ls181_10c.input_a_w"] ?? runtime.memberCall(members.m_ls181_10c, "input_a_w", 0, undefined))(runtime.shiftRight(shift_flop_output, 4));
                (__l["m_ls181_12c.input_b_w"] ?? runtime.memberCall(members.m_ls181_12c, "input_b_w", 0, undefined))(runtime.shiftRight(current_video_data, 0));
                (__l["m_ls181_10c.input_b_w"] ?? runtime.memberCall(members.m_ls181_10c, "input_b_w", 0, undefined))(runtime.shiftRight(current_video_data, 4));
                (__l["m_ls181_12c.select_w"] ?? runtime.memberCall(members.m_ls181_12c, "select_w", 0, undefined))(runtime.shiftRight((members.m_magicram_control ?? runtime.member("m_magicram_control")), 4));
                (__l["m_ls181_10c.select_w"] ?? runtime.memberCall(members.m_ls181_10c, "select_w", 0, undefined))(runtime.shiftRight((members.m_magicram_control ?? runtime.member("m_magicram_control")), 4));
                alu_output = (((((((__l["m_ls181_10c.function_r"] ?? runtime.memberCall(members.m_ls181_10c, "function_r", 0, undefined))()) << (4))) | ((__l["m_ls181_12c.function_r"] ?? runtime.memberCall(members.m_ls181_12c, "function_r", 0, undefined))()))) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, ((alu_output) ^ (255)));
                members.m_last_shift_data = ((((data) & (127))) & 0xff);
            }
            function method_audio_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                switch (offset) {
                    case 4:
                        {
                            return (((__l["m_s14001a.busy_r"] ?? runtime.memberCall(members.m_s14001a, "busy_r", 0, undefined))()) ? (0) : (64));
                        }
                    case 6:
                        {
                            0;
                            return 0;
                        }
                    default:
                        {
                            return (__l["m_custom.sh6840_r"] ?? runtime.memberCall(members.m_custom, "sh6840_r", 0, undefined))(offset);
                        }
                }
            }
            function method_audio_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                switch (offset) {
                    case 4:
                        {
                            switch (runtime.shiftRight(data, 6)) {
                                case 0:
                                    {
                                        (__l["m_s14001a.data_w"] ?? runtime.memberCall(members.m_s14001a, "data_w", 0, undefined))(((data) & (63)));
                                        (__l["m_s14001a.start_w"] ?? runtime.memberCall(members.m_s14001a, "start_w", 0, undefined))(1);
                                        (__l["m_s14001a.start_w"] ?? runtime.memberCall(members.m_s14001a, "start_w", 0, undefined))(0);
                                        break;
                                    }
                                case 1:
                                    {
                                        (__l["m_s14001a_volume.set_gain"] ?? runtime.memberCall(members.m_s14001a_volume, "set_gain", 0, undefined))(((((runtime.shiftRight(data, 3)) & (7))) / (7)));
                                        let clock_divisor = ((((16) - (((data) & (7))))) | 0);
                                        (__l["m_s14001a.set_unscaled_clock"] ?? runtime.memberCall(members.m_s14001a, "set_unscaled_clock", 0, undefined))(runtime.divide(runtime.divide(2500000, clock_divisor), 8));
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                            break;
                        }
                    case 6:
                        {
                            (__l["m_custom.sfxctrl_w"] ?? runtime.memberCall(members.m_custom, "sfxctrl_w", 0, undefined))(runtime.shiftRight(data, 6), data);
                            break;
                        }
                    default:
                        {
                            (__l["m_custom.sh6840_w"] ?? runtime.memberCall(members.m_custom, "sh6840_w", 0, undefined))(offset, data);
                            break;
                        }
                }
            }
            function method_magicram_control_w(runtime, data) {
                const members = runtime.members;
                members.m_magicram_control = ((data) & 0xff);
                members.m_last_shift_data = ((0) & 0xff);
                members.m_intercept = ((1) & 0xff);
            }
            function method_nmi_enable_r(runtime) {
                const members = runtime.members;
                members.m_nmi_enabled = ((1) & 0xff);
                return 0;
            }
            function method_nmi_enable_w(runtime, data) {
                const members = runtime.members;
                members.m_nmi_enabled = ((1) & 0xff);
            }
            function method_nmi_disable_r(runtime) {
                const members = runtime.members;
                members.m_nmi_enabled = ((0) & 0xff);
                return 0;
            }
            function method_nmi_disable_w(runtime, data) {
                const members = runtime.members;
                members.m_nmi_enabled = ((0) & 0xff);
            }
            function method_vpos_to_vsync_chain_counter(runtime, vpos, counter, v256) {
                const members = runtime.members;
                runtime.pointerStore(v256, (((((Number(vpos) < Number(32)) ? 1 : 0)) || (((Number(vpos) >= Number(256)) ? 1 : 0))) ? 1 : 0));
                if (runtime.dereference(v256)) {
                    let temp = ((runtime.add(((vpos) - (256)), 218)) | 0);
                    if (((Number(temp) < Number(0)) ? 1 : 0)) {
                        runtime.pointerStore(counter, ((temp) + (262)));
                    }
                    else {
                        runtime.pointerStore(counter, temp);
                    }
                }
                else {
                    runtime.pointerStore(counter, vpos);
                }
            }
            function method_irq_enable_w(runtime, data) {
                const members = runtime.members;
                members.m_irq_enabled = ((((data) & (1))) & 0xff);
            }
            function method_led_off_r(runtime) {
                const members = runtime.members;
                members.m_led = 0;
                return 0;
            }
            function method_led_off_w(runtime, data) {
                const members = runtime.members;
                members.m_led = 0;
            }
            function method_led_on_r(runtime) {
                const members = runtime.members;
                members.m_led = 1;
                return 0;
            }
            function method_led_on_w(runtime, data) {
                const members = runtime.members;
                members.m_led = 1;
            }
            function method_vector_r(runtime, irqline) {
                const members = runtime.members;
                return 252;
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_colorram = members.m_colorram ?? runtime.member("m_colorram");
                let pens = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
                runtime.invoke("get_pens", pens);
                for (let offs = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_videoram, "bytes"))) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                    let data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & 0xff);
                    let color = ((runtime.readIndex(h_m_colorram, ((((runtime.shiftRight(offs, 2)) & (2016))) | (((offs) & (31)))))) & 0xff);
                    let y = ((runtime.shiftRight(offs, 5)) & 0xff);
                    let x = ((((offs) << (3))) & 0xff);
                    let i = ((0) | 0);
                    for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        let pen = ((((data) & (128))) ? (runtime.readIndex(pens, runtime.shiftRight(color, 4))) : ((__l["rgb_t::black"] ? __l["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
                        bitmap["pix="](y, x, pen);
                        x = ((((x) + (1))) & 0xff);
                        data = ((((data) << (1))) & 0xff);
                    }
                    for (; ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        let pen = ((((data) & (128))) ? (runtime.readIndex(pens, ((color) & (15)))) : ((__l["rgb_t::black"] ? __l["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
                        bitmap["pix="](y, x, pen);
                        x = ((((x) + (1))) & 0xff);
                        data = ((((data) << (1))) & 0xff);
                    }
                }
                return 0;
            }
            return {
                "vsync_chain_counter_to_vpos": method_vsync_chain_counter_to_vpos,
                "magicram_w": method_magicram_w,
                "audio_r": method_audio_r,
                "audio_w": method_audio_w,
                "magicram_control_w": method_magicram_control_w,
                "nmi_enable_r": method_nmi_enable_r,
                "nmi_enable_w": method_nmi_enable_w,
                "nmi_disable_r": method_nmi_disable_r,
                "nmi_disable_w": method_nmi_disable_w,
                "vpos_to_vsync_chain_counter": method_vpos_to_vsync_chain_counter,
                "irq_enable_w": method_irq_enable_w,
                "led_off_r": method_led_off_r,
                "led_off_w": method_led_off_w,
                "led_on_r": method_led_on_r,
                "led_on_w": method_led_on_w,
                "vector_r": method_vector_r,
                "screen_update": method_screen_update
            };
        })();
        return {
            "berzerk_state.vsync_chain_counter_to_vpos": methods["vsync_chain_counter_to_vpos"],
            "berzerk_state.magicram_w": methods["magicram_w"],
            "berzerk_state.audio_r": methods["audio_r"],
            "berzerk_state.audio_w": methods["audio_w"],
            "berzerk_state.magicram_control_w": methods["magicram_control_w"],
            "berzerk_state.nmi_enable_r": methods["nmi_enable_r"],
            "berzerk_state.nmi_enable_w": methods["nmi_enable_w"],
            "berzerk_state.nmi_disable_r": methods["nmi_disable_r"],
            "berzerk_state.nmi_disable_w": methods["nmi_disable_w"],
            "berzerk_state.irq_enable_w": methods["irq_enable_w"],
            "berzerk_state.led_off_r": methods["led_off_r"],
            "berzerk_state.led_off_w": methods["led_off_w"],
            "berzerk_state.led_on_r": methods["led_on_r"],
            "berzerk_state.led_on_w": methods["led_on_w"],
            "berzerk_state.vector_r": methods["vector_r"],
            "berzerk_state.screen_update": methods["screen_update"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_custom.sfxctrl_w", "m_custom.sh6840_r", "m_custom.sh6840_w", "m_ls181_10c.function_r", "m_ls181_10c.input_a_w", "m_ls181_10c.input_b_w", "m_ls181_10c.select_w", "m_ls181_12c.function_r", "m_ls181_12c.input_a_w", "m_ls181_12c.input_b_w", "m_ls181_12c.select_w", "m_s14001a.busy_r", "m_s14001a.data_w", "m_s14001a.set_unscaled_clock", "m_s14001a.start_w", "m_s14001a_volume.set_gain", "rgb_t::black"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
