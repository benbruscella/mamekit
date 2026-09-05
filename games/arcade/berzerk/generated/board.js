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
                let vpos = 0;
                if (v256) {
                    vpos = runtime.add(((counter) - (218)), 256);
                    if (((Number(vpos) >= Number(262)) ? 1 : 0)) {
                        vpos = ((vpos) - (262));
                    }
                }
                else {
                    vpos = counter;
                }
                return vpos;
            }
            function method_magicram_w(runtime, offset, data) {
                const members = runtime.members;
                let alu_output = ((0) & 0xff);
                let current_video_data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset)) & 0xff);
                let shift_flop_output = (((((((((((members.m_last_shift_data ?? runtime.member("m_last_shift_data"))) & 0xffff)) << (8))) | (data))) >>> ((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) & (7))))) & 0xff);
                if ((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) & (8))) {
                    shift_flop_output = ((((((shift_flop_output) >>> (0)) & 1) << 7 | (((shift_flop_output) >>> (1)) & 1) << 6 | (((shift_flop_output) >>> (2)) & 1) << 5 | (((shift_flop_output) >>> (3)) & 1) << 4 | (((shift_flop_output) >>> (4)) & 1) << 3 | (((shift_flop_output) >>> (5)) & 1) << 2 | (((shift_flop_output) >>> (6)) & 1) << 1 | (((shift_flop_output) >>> (7)) & 1) << 0)) & 0xff);
                }
                if (((shift_flop_output) & (current_video_data))) {
                    members.m_intercept = ((0) & 0xff);
                }
                (runtime.calls["m_ls181_12c.input_a_w"] ? runtime.calls["m_ls181_12c.input_a_w"](((shift_flop_output) >>> (0))) : (members.m_ls181_12c) != null ? ((runtime.dereference(members.m_ls181_12c)).input_a_w?.(((shift_flop_output) >>> (0))) ?? 0) : (runtime.calls["input_a_w"]?.(((shift_flop_output) >>> (0))) ?? 0));
                (runtime.calls["m_ls181_10c.input_a_w"] ? runtime.calls["m_ls181_10c.input_a_w"](((shift_flop_output) >>> (4))) : (members.m_ls181_10c) != null ? ((runtime.dereference(members.m_ls181_10c)).input_a_w?.(((shift_flop_output) >>> (4))) ?? 0) : (runtime.calls["input_a_w"]?.(((shift_flop_output) >>> (4))) ?? 0));
                (runtime.calls["m_ls181_12c.input_b_w"] ? runtime.calls["m_ls181_12c.input_b_w"](((current_video_data) >>> (0))) : (members.m_ls181_12c) != null ? ((runtime.dereference(members.m_ls181_12c)).input_b_w?.(((current_video_data) >>> (0))) ?? 0) : (runtime.calls["input_b_w"]?.(((current_video_data) >>> (0))) ?? 0));
                (runtime.calls["m_ls181_10c.input_b_w"] ? runtime.calls["m_ls181_10c.input_b_w"](((current_video_data) >>> (4))) : (members.m_ls181_10c) != null ? ((runtime.dereference(members.m_ls181_10c)).input_b_w?.(((current_video_data) >>> (4))) ?? 0) : (runtime.calls["input_b_w"]?.(((current_video_data) >>> (4))) ?? 0));
                (runtime.calls["m_ls181_12c.select_w"] ? runtime.calls["m_ls181_12c.select_w"]((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) >>> (4))) : (members.m_ls181_12c) != null ? ((runtime.dereference(members.m_ls181_12c)).select_w?.((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) >>> (4))) ?? 0) : (runtime.calls["select_w"]?.((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) >>> (4))) ?? 0));
                (runtime.calls["m_ls181_10c.select_w"] ? runtime.calls["m_ls181_10c.select_w"]((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) >>> (4))) : (members.m_ls181_10c) != null ? ((runtime.dereference(members.m_ls181_10c)).select_w?.((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) >>> (4))) ?? 0) : (runtime.calls["select_w"]?.((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) >>> (4))) ?? 0));
                alu_output = (((((((runtime.calls["m_ls181_10c.function_r"] ? runtime.calls["m_ls181_10c.function_r"]() : (members.m_ls181_10c) != null ? (typeof (runtime.dereference(members.m_ls181_10c)).function_r === 'function' ? (runtime.dereference(members.m_ls181_10c)).function_r() : typeof (runtime.dereference(members.m_ls181_10c)).function_r === 'number' || typeof (runtime.dereference(members.m_ls181_10c)).function_r === 'boolean' ? (runtime.dereference(members.m_ls181_10c)).function_r : runtime.container(members.m_ls181_10c, "function_r")) : (runtime.calls["function_r"]?.() ?? 0))) << (4))) | ((runtime.calls["m_ls181_12c.function_r"] ? runtime.calls["m_ls181_12c.function_r"]() : (members.m_ls181_12c) != null ? (typeof (runtime.dereference(members.m_ls181_12c)).function_r === 'function' ? (runtime.dereference(members.m_ls181_12c)).function_r() : typeof (runtime.dereference(members.m_ls181_12c)).function_r === 'number' || typeof (runtime.dereference(members.m_ls181_12c)).function_r === 'boolean' ? (runtime.dereference(members.m_ls181_12c)).function_r : runtime.container(members.m_ls181_12c, "function_r")) : (runtime.calls["function_r"]?.() ?? 0))))) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, ((alu_output) ^ (255)));
                members.m_last_shift_data = ((((data) & (127))) & 0xff);
            }
            function method_audio_r(runtime, offset) {
                const members = runtime.members;
                switch (offset) {
                    case 4:
                        {
                            return (((runtime.calls["m_s14001a.busy_r"] ? runtime.calls["m_s14001a.busy_r"]() : (members.m_s14001a) != null ? (typeof (runtime.dereference(members.m_s14001a)).busy_r === 'function' ? (runtime.dereference(members.m_s14001a)).busy_r() : typeof (runtime.dereference(members.m_s14001a)).busy_r === 'number' || typeof (runtime.dereference(members.m_s14001a)).busy_r === 'boolean' ? (runtime.dereference(members.m_s14001a)).busy_r : runtime.container(members.m_s14001a, "busy_r")) : (runtime.calls["busy_r"]?.() ?? 0))) ? (0) : (64));
                        }
                    case 6:
                        {
                            0;
                            return 0;
                        }
                    default:
                        {
                            return (runtime.calls["m_custom.sh6840_r"] ? runtime.calls["m_custom.sh6840_r"](offset) : (members.m_custom) != null ? ((runtime.dereference(members.m_custom)).sh6840_r?.(offset) ?? 0) : (runtime.calls["sh6840_r"]?.(offset) ?? 0));
                        }
                }
            }
            function method_audio_w(runtime, offset, data) {
                const members = runtime.members;
                switch (offset) {
                    case 4:
                        {
                            switch (((data) >>> (6))) {
                                case 0:
                                    {
                                        (runtime.calls["m_s14001a.data_w"] ? runtime.calls["m_s14001a.data_w"](((data) & (63))) : (members.m_s14001a) != null ? ((runtime.dereference(members.m_s14001a)).data_w?.(((data) & (63))) ?? 0) : (runtime.calls["data_w"]?.(((data) & (63))) ?? 0));
                                        (runtime.calls["m_s14001a.start_w"] ? runtime.calls["m_s14001a.start_w"](1) : (members.m_s14001a) != null ? ((runtime.dereference(members.m_s14001a)).start_w?.(1) ?? 0) : (runtime.calls["start_w"]?.(1) ?? 0));
                                        (runtime.calls["m_s14001a.start_w"] ? runtime.calls["m_s14001a.start_w"](0) : (members.m_s14001a) != null ? ((runtime.dereference(members.m_s14001a)).start_w?.(0) ?? 0) : (runtime.calls["start_w"]?.(0) ?? 0));
                                        break;
                                    }
                                case 1:
                                    {
                                        (runtime.calls["m_s14001a_volume.set_gain"] ? runtime.calls["m_s14001a_volume.set_gain"](((((((data) >>> (3))) & (7))) / (7))) : (members.m_s14001a_volume) != null ? ((runtime.dereference(members.m_s14001a_volume)).set_gain?.(((((((data) >>> (3))) & (7))) / (7))) ?? 0) : (runtime.calls["set_gain"]?.(((((((data) >>> (3))) & (7))) / (7))) ?? 0));
                                        let clock_divisor = ((16) - (((data) & (7))));
                                        (runtime.calls["m_s14001a.set_unscaled_clock"] ? runtime.calls["m_s14001a.set_unscaled_clock"](runtime.divide(runtime.divide(2500000, clock_divisor), 8)) : (members.m_s14001a) != null ? ((runtime.dereference(members.m_s14001a)).set_unscaled_clock?.(runtime.divide(runtime.divide(2500000, clock_divisor), 8)) ?? 0) : (runtime.calls["set_unscaled_clock"]?.(runtime.divide(runtime.divide(2500000, clock_divisor), 8)) ?? 0));
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
                            (runtime.calls["m_custom.sfxctrl_w"] ? runtime.calls["m_custom.sfxctrl_w"](((data) >>> (6)), data) : (members.m_custom) != null ? ((runtime.dereference(members.m_custom)).sfxctrl_w?.(((data) >>> (6)), data) ?? 0) : (runtime.calls["sfxctrl_w"]?.(((data) >>> (6)), data) ?? 0));
                            break;
                        }
                    default:
                        {
                            (runtime.calls["m_custom.sh6840_w"] ? runtime.calls["m_custom.sh6840_w"](offset, data) : (members.m_custom) != null ? ((runtime.dereference(members.m_custom)).sh6840_w?.(offset, data) ?? 0) : (runtime.calls["sh6840_w"]?.(offset, data) ?? 0));
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
                    let temp = runtime.add(((vpos) - (256)), 218);
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
                "vector_r": method_vector_r
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
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
