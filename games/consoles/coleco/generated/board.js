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
            const cppMin = (a, b) => (b < a ? b : a);
            const cppMax = (a, b) => (a < b ? b : a);
            // An aggregate initializer's struct, marked as one (execute.ts's
            // isGeneratedStruct) through its prototype: like generatedStruct's
            // non-enumerable marker, field walks and spreads never see it, and a
            // literal with a prototype costs nothing next to defineProperty.
            const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
            // CALL_METHOD through a table of method names: each entry's emitted method,
            // resolved once and again only if that entry's name changes (see the
            // CALL_METHOD emission). The last table is held, as a core keeps one until
            // its mode changes.
            const cppDispatch = new WeakMap();
            let cppLastTable, cppLastEntry;
            const cppMethodAt = (table, index) => {
                if (!Array.isArray(table))
                    return undefined;
                let entry = table === cppLastTable ? cppLastEntry : undefined;
                if (!entry) {
                    entry = cppDispatch.get(table);
                    if (!entry)
                        cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
                    cppLastTable = table;
                    cppLastEntry = entry;
                }
                const name = table[index];
                if (entry.names[index] === name && name !== undefined)
                    return entry.methods[index];
                entry.names[index] = name;
                return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
            };
            // execute.ts's clearGeneratedStruct, field names read once per struct.
            const cppUnionElements = Symbol.for('mamekit.unionElements');
            const cppStructKeys = new WeakMap();
            const cppClearStruct = (target, value) => {
                let keys = cppStructKeys.get(target);
                if (!keys)
                    cppStructKeys.set(target, keys = Object.keys(target));
                for (let index = 0; index < keys.length; index++) {
                    const key = keys[index];
                    const field = target[key];
                    if (ArrayBuffer.isView(field) || Array.isArray(field))
                        field.fill(value);
                    else if (field && typeof field === 'object')
                        cppClearStruct(field, value);
                    else
                        target[key] = value;
                }
            };
            // memset: typed memory fills in place; a plain array of numbers is set
            // element by element (as the interpreter's fillGeneratedMemory writes it,
            // count elements from 0); an array holding structs, or a pointer into a
            // plain array, goes to the interpreter's rule, which clears each struct.
            const cppMemset = (runtime, target, value, count) => {
                const bytes = Number(count);
                if (Array.isArray(target)) {
                    for (let index = 0; index < bytes; index++) {
                        const element = target[index];
                        if (element !== null && typeof element === 'object') {
                            // A struct element is cleared field by field (cppClearStruct);
                            // anything else array-like takes the interpreter's rule.
                            if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
                                return runtime.macro("memset", target, value, bytes);
                            }
                            cppClearStruct(element, value);
                            continue;
                        }
                        target[index] = value;
                    }
                    return target;
                }
                if (Array.isArray(target?.source))
                    return runtime.macro("memset", target, value, bytes);
                if (target?.generatedPointer) {
                    const width = target.source.BYTES_PER_ELEMENT ?? 1;
                    target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
                    return target;
                }
                target.fill(value, 0, bytes);
                return target;
            };
            // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
            // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
            // execute.ts's wide operators answer them (a shift of 64 or more is 0).
            const cppLo64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
            const cppHi64 = (v) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
            const cppShl64Lo = (lo, hi, s) => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
            const cppShl64Hi = (lo, hi, s) => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
            const cppShr64Lo = (lo, hi, s) => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
            const cppShr64Hi = (lo, hi, s) => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
            const cppStringText = (value) => typeof value === 'string' ? value
                : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
                    : value === undefined || value === null ? '' : String(value);
            function method_cart_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cart.read"];
                return (__L0 ?? runtime.memberCall(members.m_cart, "read", 0, undefined))(offset, 0, 0, 0, 0);
            }
            function method_cart_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cart.write"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_cart, "write", 0, undefined))(offset, data, 0, 0, 0, 0);
            }
            function method_paddle_off_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_joy_mode = ((0) | 0);
            }
            function method_paddle_on_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_joy_mode = ((1) | 0);
            }
            function method_paddle_1_r(runtime) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_joy_d7_state ?? runtime.member("m_joy_d7_state")), 0)) | ((runtime.overrides["coleco_paddle_read"] ? runtime.overrides["coleco_paddle_read"](0, (members.m_joy_mode ?? runtime.member("m_joy_mode")), runtime.readIndex((members.m_joy_analog_state ?? runtime.member("m_joy_analog_state")), 0)) : method_coleco_paddle_read(runtime, 0, (members.m_joy_mode ?? runtime.member("m_joy_mode")), runtime.readIndex((members.m_joy_analog_state ?? runtime.member("m_joy_analog_state")), 0)))));
            }
            function method_coleco_paddle_read(runtime, port, joy_mode, joy_status) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrlsel.read_safe"], __L1 = __l["read_safe"], __L2 = __l["m_std_keypad2.read"], __L3 = __l["read"], __L4 = __l["m_std_keypad1.read"], __L5 = __l["m_sac_keypad2.read"], __L6 = __l["m_sac_keypad1.read"], __L7 = __l["m_std_joy2.read"], __L8 = __l["m_std_joy1.read"], __L9 = __l["m_sac_joy2.read"], __L10 = __l["m_sac_joy1.read"], __L11 = __l["m_driv_pedal2.read"], __L12 = __l["m_driv_pedal1.read"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9;
                joy_status = ((joy_status) & 0xff);
                let ctrl_sel = (((__L0 ?? runtime.memberCall(members.m_ctrlsel, "read_safe", 0, __L1))(0)) & 0xff);
                let ctrl_extra = ((((ctrl_sel) & (128))) & 0xff);
                ctrl_sel = ((((((ctrl_sel) >>> (((port) * (4))))) & (7))) & 0xff);
                if ((((joy_mode) === (0)) ? 1 : 0)) {
                    let data = ((15) & 0xff);
                    let ipt = ((65535) & 0xffff);
                    if ((((ctrl_sel) === (0)) ? 1 : 0)) {
                        ipt = ((((port) ? ((__L2 ?? runtime.memberCall(members.m_std_keypad2, "read", 0, __L3))()) : ((__L4 ?? runtime.memberCall(members.m_std_keypad1, "read", 0, __L3))()))) & 0xffff);
                    }
                    else {
                        if ((((ctrl_sel) === (2)) ? 1 : 0)) {
                            ipt = ((((port) ? ((__L5 ?? runtime.memberCall(members.m_sac_keypad2, "read", 0, __L3))()) : ((__L6 ?? runtime.memberCall(members.m_sac_keypad1, "read", 0, __L3))()))) & 0xffff);
                        }
                    }
                    if (((((ipt) & (1))) ? 0 : 1)) {
                        data = ((((data) & (10))) & 0xff);
                    }
                    if (((((ipt) & (2))) ? 0 : 1)) {
                        data = ((((data) & (13))) & 0xff);
                    }
                    if (((((ipt) & (4))) ? 0 : 1)) {
                        data = ((((data) & (7))) & 0xff);
                    }
                    if (((((ipt) & (8))) ? 0 : 1)) {
                        data = ((((data) & (12))) & 0xff);
                    }
                    if (((((ipt) & (16))) ? 0 : 1)) {
                        data = ((((data) & (2))) & 0xff);
                    }
                    if (((((ipt) & (32))) ? 0 : 1)) {
                        data = ((((data) & (3))) & 0xff);
                    }
                    if (((((ipt) & (64))) ? 0 : 1)) {
                        data = ((((data) & (14))) & 0xff);
                    }
                    if (((((ipt) & (128))) ? 0 : 1)) {
                        data = ((((data) & (5))) & 0xff);
                    }
                    if (((((ipt) & (256))) ? 0 : 1)) {
                        data = ((((data) & (1))) & 0xff);
                    }
                    if (((((ipt) & (512))) ? 0 : 1)) {
                        data = ((((data) & (11))) & 0xff);
                    }
                    if (((((ipt) & (1024))) ? 0 : 1)) {
                        data = ((((data) & (6))) & 0xff);
                    }
                    if (((((ipt) & (2048))) ? 0 : 1)) {
                        data = ((((data) & (9))) & 0xff);
                    }
                    if (((((ipt) & (4096))) ? 0 : 1)) {
                        data = ((((data) & (4))) & 0xff);
                    }
                    if (((((ipt) & (8192))) ? 0 : 1)) {
                        data = ((((data) & (8))) & 0xff);
                    }
                    return ((((runtime.shiftRight(((ipt) & (16384)), 8)) | (48))) | (data));
                }
                else {
                    let data = ((127) & 0xff);
                    if ((((ctrl_sel) === (0)) ? 1 : 0)) {
                        data = ((((port) ? ((__L7 ?? runtime.memberCall(members.m_std_joy2, "read", 0, __L3))()) : ((__L8 ?? runtime.memberCall(members.m_std_joy1, "read", 0, __L3))()))) & 0xff);
                    }
                    else {
                        if ((((ctrl_sel) === (2)) ? 1 : 0)) {
                            data = ((((port) ? ((__L9 ?? runtime.memberCall(members.m_sac_joy2, "read", 0, __L3))()) : ((__L10 ?? runtime.memberCall(members.m_sac_joy1, "read", 0, __L3))()))) & 0xff);
                        }
                        else {
                            if ((((ctrl_sel) === (3)) ? 1 : 0)) {
                                data = ((((port) ? ((__L11 ?? runtime.memberCall(members.m_driv_pedal2, "read", 0, __L3))()) : ((__L12 ?? runtime.memberCall(members.m_driv_pedal1, "read", 0, __L3))()))) & 0xff);
                            }
                        }
                    }
                    if (((((((ctrl_extra) || ((((ctrl_sel) === (2)) ? 1 : 0))) ? 1 : 0)) || ((((ctrl_sel) === (3)) ? 1 : 0))) ? 1 : 0)) {
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
            function method_paddle_2_r(runtime) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_joy_d7_state ?? runtime.member("m_joy_d7_state")), 1)) | ((runtime.overrides["coleco_paddle_read"] ? runtime.overrides["coleco_paddle_read"](1, (members.m_joy_mode ?? runtime.member("m_joy_mode")), runtime.readIndex((members.m_joy_analog_state ?? runtime.member("m_joy_analog_state")), 1)) : method_coleco_paddle_read(runtime, 1, (members.m_joy_mode ?? runtime.member("m_joy_mode")), runtime.readIndex((members.m_joy_analog_state ?? runtime.member("m_joy_analog_state")), 1)))));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "cart_r": method_cart_r,
                "cart_w": method_cart_w,
                "paddle_off_w": method_paddle_off_w,
                "paddle_on_w": method_paddle_on_w,
                "paddle_1_r": method_paddle_1_r,
                "coleco_paddle_read": method_coleco_paddle_read,
                "paddle_2_r": method_paddle_2_r
            };
            return __methodTable;
        })();
        return {
            "coleco_state.cart_r": methods["cart_r"],
            "coleco_state.cart_w": methods["cart_w"],
            "coleco_state.paddle_off_w": methods["paddle_off_w"],
            "coleco_state.paddle_on_w": methods["paddle_on_w"],
            "coleco_state.paddle_1_r": methods["paddle_1_r"],
            "coleco_state.coleco_paddle_read": methods["coleco_paddle_read"],
            "coleco_state.paddle_2_r": methods["paddle_2_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_cart.read", "m_cart.write", "m_ctrlsel.read_safe", "m_driv_pedal1.read", "m_driv_pedal2.read", "m_sac_joy1.read", "m_sac_joy2.read", "m_sac_keypad1.read", "m_sac_keypad2.read", "m_std_joy1.read", "m_std_joy2.read", "m_std_keypad1.read", "m_std_keypad2.read", "read", "read_safe"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
