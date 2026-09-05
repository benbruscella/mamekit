// GENERATED executable machine composition from src/mame/coleco/coleco.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'coleco');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_cart_r(runtime, offset) {
                const members = runtime.members;
                return (runtime.calls["m_cart.read"] ? runtime.calls["m_cart.read"](offset, 0, 0, 0, 0) : (members.m_cart) != null ? ((runtime.dereference(members.m_cart)).read?.(offset, 0, 0, 0, 0) ?? 0) : (runtime.calls["read"]?.(offset, 0, 0, 0, 0) ?? 0));
            }
            function method_cart_w(runtime, offset, data) {
                const members = runtime.members;
                (runtime.calls["m_cart.write"] ? runtime.calls["m_cart.write"](offset, data, 0, 0, 0, 0) : (members.m_cart) != null ? ((runtime.dereference(members.m_cart)).write?.(offset, data, 0, 0, 0, 0) ?? 0) : (runtime.calls["write"]?.(offset, data, 0, 0, 0, 0) ?? 0));
            }
            function method_paddle_off_w(runtime, data) {
                const members = runtime.members;
                members.m_joy_mode = ((0) | 0);
            }
            function method_paddle_on_w(runtime, data) {
                const members = runtime.members;
                members.m_joy_mode = ((1) | 0);
            }
            function method_coleco_paddle_read(runtime, port, joy_mode, joy_status) {
                const members = runtime.members;
                let ctrl_sel = (((runtime.calls["m_ctrlsel.read_safe"] ? runtime.calls["m_ctrlsel.read_safe"](0) : (members.m_ctrlsel) != null ? ((runtime.dereference(members.m_ctrlsel)).read_safe?.(0) ?? 0) : (runtime.calls["read_safe"]?.(0) ?? 0))) & 0xff);
                let ctrl_extra = ((((ctrl_sel) & (128))) & 0xff);
                ctrl_sel = ((((((ctrl_sel) >>> (((port) * (4))))) & (7))) & 0xff);
                if (((Number(joy_mode) === Number(0)) ? 1 : 0)) {
                    let data = ((15) & 0xff);
                    let ipt = ((65535) & 0xffff);
                    if (((Number(ctrl_sel) === Number(0)) ? 1 : 0)) {
                        ipt = ((((port) ? ((runtime.calls["m_std_keypad2.read"] ? runtime.calls["m_std_keypad2.read"]() : (members.m_std_keypad2) != null ? (typeof (runtime.dereference(members.m_std_keypad2)).read === 'function' ? (runtime.dereference(members.m_std_keypad2)).read() : typeof (runtime.dereference(members.m_std_keypad2)).read === 'number' || typeof (runtime.dereference(members.m_std_keypad2)).read === 'boolean' ? (runtime.dereference(members.m_std_keypad2)).read : runtime.container(members.m_std_keypad2, "read")) : (runtime.calls["read"]?.() ?? 0))) : ((runtime.calls["m_std_keypad1.read"] ? runtime.calls["m_std_keypad1.read"]() : (members.m_std_keypad1) != null ? (typeof (runtime.dereference(members.m_std_keypad1)).read === 'function' ? (runtime.dereference(members.m_std_keypad1)).read() : typeof (runtime.dereference(members.m_std_keypad1)).read === 'number' || typeof (runtime.dereference(members.m_std_keypad1)).read === 'boolean' ? (runtime.dereference(members.m_std_keypad1)).read : runtime.container(members.m_std_keypad1, "read")) : (runtime.calls["read"]?.() ?? 0))))) & 0xffff);
                    }
                    else {
                        if (((Number(ctrl_sel) === Number(2)) ? 1 : 0)) {
                            ipt = ((((port) ? ((runtime.calls["m_sac_keypad2.read"] ? runtime.calls["m_sac_keypad2.read"]() : (members.m_sac_keypad2) != null ? (typeof (runtime.dereference(members.m_sac_keypad2)).read === 'function' ? (runtime.dereference(members.m_sac_keypad2)).read() : typeof (runtime.dereference(members.m_sac_keypad2)).read === 'number' || typeof (runtime.dereference(members.m_sac_keypad2)).read === 'boolean' ? (runtime.dereference(members.m_sac_keypad2)).read : runtime.container(members.m_sac_keypad2, "read")) : (runtime.calls["read"]?.() ?? 0))) : ((runtime.calls["m_sac_keypad1.read"] ? runtime.calls["m_sac_keypad1.read"]() : (members.m_sac_keypad1) != null ? (typeof (runtime.dereference(members.m_sac_keypad1)).read === 'function' ? (runtime.dereference(members.m_sac_keypad1)).read() : typeof (runtime.dereference(members.m_sac_keypad1)).read === 'number' || typeof (runtime.dereference(members.m_sac_keypad1)).read === 'boolean' ? (runtime.dereference(members.m_sac_keypad1)).read : runtime.container(members.m_sac_keypad1, "read")) : (runtime.calls["read"]?.() ?? 0))))) & 0xffff);
                        }
                    }
                    if (((((ipt) & (1))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 10)) & 0xff);
                    }
                    if (((((ipt) & (2))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 13)) & 0xff);
                    }
                    if (((((ipt) & (4))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 7)) & 0xff);
                    }
                    if (((((ipt) & (8))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 12)) & 0xff);
                    }
                    if (((((ipt) & (16))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 2)) & 0xff);
                    }
                    if (((((ipt) & (32))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 3)) & 0xff);
                    }
                    if (((((ipt) & (64))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 14)) & 0xff);
                    }
                    if (((((ipt) & (128))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 5)) & 0xff);
                    }
                    if (((((ipt) & (256))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 1)) & 0xff);
                    }
                    if (((((ipt) & (512))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 11)) & 0xff);
                    }
                    if (((((ipt) & (1024))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 6)) & 0xff);
                    }
                    if (((((ipt) & (2048))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 9)) & 0xff);
                    }
                    if (((((ipt) & (4096))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 4)) & 0xff);
                    }
                    if (((((ipt) & (8192))) ? 0 : 1)) {
                        data = ((runtime.andAssign(data, 8)) & 0xff);
                    }
                    return ((((((((ipt) & (16384))) >>> (8))) | (48))) | (data));
                }
                else {
                    let data = ((127) & 0xff);
                    if (((Number(ctrl_sel) === Number(0)) ? 1 : 0)) {
                        data = ((((port) ? ((runtime.calls["m_std_joy2.read"] ? runtime.calls["m_std_joy2.read"]() : (members.m_std_joy2) != null ? (typeof (runtime.dereference(members.m_std_joy2)).read === 'function' ? (runtime.dereference(members.m_std_joy2)).read() : typeof (runtime.dereference(members.m_std_joy2)).read === 'number' || typeof (runtime.dereference(members.m_std_joy2)).read === 'boolean' ? (runtime.dereference(members.m_std_joy2)).read : runtime.container(members.m_std_joy2, "read")) : (runtime.calls["read"]?.() ?? 0))) : ((runtime.calls["m_std_joy1.read"] ? runtime.calls["m_std_joy1.read"]() : (members.m_std_joy1) != null ? (typeof (runtime.dereference(members.m_std_joy1)).read === 'function' ? (runtime.dereference(members.m_std_joy1)).read() : typeof (runtime.dereference(members.m_std_joy1)).read === 'number' || typeof (runtime.dereference(members.m_std_joy1)).read === 'boolean' ? (runtime.dereference(members.m_std_joy1)).read : runtime.container(members.m_std_joy1, "read")) : (runtime.calls["read"]?.() ?? 0))))) & 0xff);
                    }
                    else {
                        if (((Number(ctrl_sel) === Number(2)) ? 1 : 0)) {
                            data = ((((port) ? ((runtime.calls["m_sac_joy2.read"] ? runtime.calls["m_sac_joy2.read"]() : (members.m_sac_joy2) != null ? (typeof (runtime.dereference(members.m_sac_joy2)).read === 'function' ? (runtime.dereference(members.m_sac_joy2)).read() : typeof (runtime.dereference(members.m_sac_joy2)).read === 'number' || typeof (runtime.dereference(members.m_sac_joy2)).read === 'boolean' ? (runtime.dereference(members.m_sac_joy2)).read : runtime.container(members.m_sac_joy2, "read")) : (runtime.calls["read"]?.() ?? 0))) : ((runtime.calls["m_sac_joy1.read"] ? runtime.calls["m_sac_joy1.read"]() : (members.m_sac_joy1) != null ? (typeof (runtime.dereference(members.m_sac_joy1)).read === 'function' ? (runtime.dereference(members.m_sac_joy1)).read() : typeof (runtime.dereference(members.m_sac_joy1)).read === 'number' || typeof (runtime.dereference(members.m_sac_joy1)).read === 'boolean' ? (runtime.dereference(members.m_sac_joy1)).read : runtime.container(members.m_sac_joy1, "read")) : (runtime.calls["read"]?.() ?? 0))))) & 0xff);
                        }
                        else {
                            if (((Number(ctrl_sel) === Number(3)) ? 1 : 0)) {
                                data = ((((port) ? ((runtime.calls["m_driv_pedal2.read"] ? runtime.calls["m_driv_pedal2.read"]() : (members.m_driv_pedal2) != null ? (typeof (runtime.dereference(members.m_driv_pedal2)).read === 'function' ? (runtime.dereference(members.m_driv_pedal2)).read() : typeof (runtime.dereference(members.m_driv_pedal2)).read === 'number' || typeof (runtime.dereference(members.m_driv_pedal2)).read === 'boolean' ? (runtime.dereference(members.m_driv_pedal2)).read : runtime.container(members.m_driv_pedal2, "read")) : (runtime.calls["read"]?.() ?? 0))) : ((runtime.calls["m_driv_pedal1.read"] ? runtime.calls["m_driv_pedal1.read"]() : (members.m_driv_pedal1) != null ? (typeof (runtime.dereference(members.m_driv_pedal1)).read === 'function' ? (runtime.dereference(members.m_driv_pedal1)).read() : typeof (runtime.dereference(members.m_driv_pedal1)).read === 'number' || typeof (runtime.dereference(members.m_driv_pedal1)).read === 'boolean' ? (runtime.dereference(members.m_driv_pedal1)).read : runtime.container(members.m_driv_pedal1, "read")) : (runtime.calls["read"]?.() ?? 0))))) & 0xff);
                            }
                        }
                    }
                    if (((((((ctrl_extra) || (((Number(ctrl_sel) === Number(2)) ? 1 : 0))) ? 1 : 0)) || (((Number(ctrl_sel) === Number(3)) ? 1 : 0))) ? 1 : 0)) {
                        if (((joy_status) & (128))) {
                            data = ((((data) ^ (48))) & 0xff);
                        }
                        else {
                            if (joy_status) {
                                data = ((((data) ^ (16))) & 0xff);
                            }
                        }
                    }
                    return ((data) & (127));
                }
            }
            return {
                "cart_r": method_cart_r,
                "cart_w": method_cart_w,
                "paddle_off_w": method_paddle_off_w,
                "paddle_on_w": method_paddle_on_w,
                "coleco_paddle_read": method_coleco_paddle_read
            };
        })();
        return {
            "coleco_state.cart_r": methods["cart_r"],
            "coleco_state.cart_w": methods["cart_w"],
            "coleco_state.paddle_off_w": methods["paddle_off_w"],
            "coleco_state.paddle_on_w": methods["paddle_on_w"],
            "coleco_state.coleco_paddle_read": methods["coleco_paddle_read"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
