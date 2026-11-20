// GENERATED executable machine composition from src/mame/taito/bublbobl.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bublbobl');
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
            function method_common_sound_semaphores_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_main_to_sound.pending_r"], __L1 = __l["m_sound_to_main.pending_r"];
                let __t0, __t1;
                let ret = ((252) & 0xff);
                ret = ((((ret) | ((((__L0 ?? runtime.memberCall(members.m_main_to_sound, "pending_r", 0, undefined))()) ? (2) : (0))))) & 0xff);
                ret = ((((ret) | ((((__L1 ?? runtime.memberCall(members.m_sound_to_main, "pending_r", 0, undefined))()) ? (1) : (0))))) & 0xff);
                return ret;
            }
            function method_bublbobl_soundcpu_reset_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["common_sreset"] ? runtime.overrides["common_sreset"](((data) ? (1) : (0))) : method_common_sreset(runtime, ((data) ? (1) : (0))));
            }
            function method_common_sreset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ym2203.reset"], __L1 = __l["m_ym3526.reset"], __L2 = __l["m_audiocpu.set_input_line"], __L3 = __l["m_sound_to_main.acknowledge_w"], __L4 = __l["m_soundnmi.in_w_0"];
                let __t0, __t1, __t2;
                const h_m_ym2203 = members.m_ym2203 ?? runtime.member("m_ym2203");
                const h_m_ym3526 = members.m_ym3526 ?? runtime.member("m_ym3526");
                if ((((((Number(state) !== Number(0)) ? 1 : 0)) && ((((members.m_sreset_old ?? runtime.member("m_sreset_old"))) ? 0 : 1))) ? 1 : 0)) {
                    if (((Number(h_m_ym2203) !== Number(0)) ? 1 : 0)) {
                        (__L0 ?? runtime.memberCall(members.m_ym2203, "reset", 0, undefined))();
                    }
                    if (((Number(h_m_ym3526) !== Number(0)) ? 1 : 0)) {
                        (__L1 ?? runtime.memberCall(members.m_ym3526, "reset", 0, undefined))();
                    }
                    (__L2 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 0);
                    (__L3 ?? runtime.memberCall(members.m_sound_to_main, "acknowledge_w", 0, undefined))();
                    (__L4 ?? runtime.memberCall(members.m_soundnmi, "in_w_0", 0, undefined))(0);
                }
                (__L2 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, state);
                members.m_sreset_old = ((((Number(1) === Number(state)) ? 1 : 0)) | 0);
            }
            function method_bublbobl_nmitrigger_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_subcpu.pulse_input_line"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_subcpu, "pulse_input_line", 0, undefined))(-1, 0);
            }
            function method_screen_update_bublbobl(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["bitmap.fill"], __L1 = __l["fill"], __L2 = __l["memregion"], __L3 = __l["flip_screen"], __L4 = __l["m_gfxdecode.gfx"];
                let __t0;
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                let offs = ((0) | 0);
                let sx = ((0) | 0);
                let sy = ((0) | 0);
                let xc = ((0) | 0);
                let yc = ((0) | 0);
                let gfx_num = ((0) | 0);
                let gfx_attr = ((0) | 0);
                let gfx_offs = ((0) | 0);
                let prom = 0;
                let prom_line = 0;
                (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(255, cliprect);
                if ((((members.m_video_enable ?? runtime.member("m_video_enable"))) ? 0 : 1)) {
                    return 0;
                }
                sx = ((0) | 0);
                prom = (__t0 = __deref_screen_update_bublbobl(runtime, (__L2 ? __L2("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L2 ? __L2("proms") : runtime.macro("memregion", "proms")), "base"));
                for (offs = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_objectram, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    if (((Number(__deref_screen_update_bublbobl(runtime, runtime.packedView(__addr_screen_update_bublbobl(runtime, (members.m_objectram ?? runtime.member("m_objectram")), offs), 'u32'))) === Number(0)) ? 1 : 0)) {
                        continue;
                    }
                    gfx_num = ((runtime.readIndex((members.m_objectram ?? runtime.member("m_objectram")), ((offs) + (1)))) | 0);
                    gfx_attr = ((runtime.readIndex((members.m_objectram ?? runtime.member("m_objectram")), ((offs) + (3)))) | 0);
                    prom_line = __addr_screen_update_bublbobl(runtime, __addr_screen_update_bublbobl(runtime, prom, 128), runtime.shiftRight(((gfx_num) & (224)), 1));
                    gfx_offs = ((((((gfx_num) & (31))) * (128))) | 0);
                    if (((Number(((gfx_num) & (160))) === Number(160)) ? 1 : 0)) {
                        gfx_offs = ((((gfx_offs) | (4096))) | 0);
                    }
                    sy = (((-runtime.readIndex((members.m_objectram ?? runtime.member("m_objectram")), ((offs) + (0))))) | 0);
                    for (yc = ((0) | 0); (((yc) < (32)) ? 1 : 0); yc = ((((yc) + (1))) | 0)) {
                        if (((runtime.readIndex(prom_line, runtime.divide(yc, 2))) & (8))) {
                            continue;
                        }
                        if (((((runtime.readIndex(prom_line, runtime.divide(yc, 2))) & (4))) ? 0 : 1)) {
                            sx = ((runtime.readIndex((members.m_objectram ?? runtime.member("m_objectram")), ((offs) + (2)))) | 0);
                            if (((gfx_attr) & (64))) {
                                sx = ((((sx) - (256))) | 0);
                            }
                        }
                        for (xc = ((0) | 0); (((xc) < (2)) ? 1 : 0); xc = ((((xc) + (1))) | 0)) {
                            let goffs = ((0) | 0);
                            let code = ((0) | 0);
                            let color = ((0) | 0);
                            let flipx = ((0) | 0);
                            let flipy = ((0) | 0);
                            let x = ((0) | 0);
                            let y = ((0) | 0);
                            goffs = ((__add_screen_update_bublbobl(runtime, __add_screen_update_bublbobl(runtime, ((gfx_offs) + (((xc) * (64)))), ((((yc) & (7))) * (2))), ((((runtime.readIndex(prom_line, runtime.divide(yc, 2))) & (3))) * (16)))) | 0);
                            code = ((__add_screen_update_bublbobl(runtime, __add_screen_update_bublbobl(runtime, runtime.readIndex(h_m_videoram, goffs), ((256) * (((runtime.readIndex(h_m_videoram, ((goffs) + (1)))) & (3))))), ((1024) * (((gfx_attr) & (15)))))) | 0);
                            color = ((runtime.shiftRight(((runtime.readIndex(h_m_videoram, ((goffs) + (1)))) & (60)), 2)) | 0);
                            flipx = ((((runtime.readIndex(h_m_videoram, ((goffs) + (1)))) & (64))) | 0);
                            flipy = ((((runtime.readIndex(h_m_videoram, ((goffs) + (1)))) & (128))) | 0);
                            x = ((((sx) + (((xc) * (8))))) | 0);
                            y = ((((((sy) + (((yc) * (8))))) & (255))) | 0);
                            if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                                x = ((((248) - (x))) | 0);
                                y = ((((248) - (y))) | 0);
                                flipx = ((((flipx) ? 0 : 1)) | 0);
                                flipy = ((((flipy) ? 0 : 1)) | 0);
                            }
                            runtime.memberCall((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, x, y, 15);
                        }
                    }
                    sx = ((((sx) + (16))) | 0);
                }
                return 0;
            }
            function __add_screen_update_bublbobl(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_screen_update_bublbobl(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_screen_update_bublbobl(runtime, p) {
                if (p !== null && typeof p === 'object') {
                    if (p.generatedPointer === true) {
                        if (p.target === undefined) {
                            const read = p.source[p.offset];
                            if (read !== undefined && read !== null)
                                return read;
                        }
                    }
                    else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                        return p;
                    }
                }
                return runtime.dereference(p);
            }
            function method_mcram_vect_r(runtime, irqline) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                return runtime.readIndex((members.m_mcu_sharedram ?? runtime.member("m_mcu_sharedram")), 0);
            }
            function method_bublbobl_mcu_port2_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"], __L1 = __l["attotime::from_usec"], __L2 = __l["m_mcu.pulse_input_line"];
                let __t0;
                data = ((data) & 0xff);
                let portnames = ["DSW0", "DSW1", "IN1", "IN2"];
                if (((((((~(members.m_port2_out ?? runtime.member("m_port2_out")))) & (16))) && (((data) & (16)))) ? 1 : 0)) {
                    let address = (((((members.m_port4_out ?? runtime.member("m_port4_out"))) | (((((data) & (15))) << (8))))) | 0);
                    if ((((members.m_port1_out ?? runtime.member("m_port1_out"))) & (128))) {
                        if (((Number(((address) & (2048))) === Number(0)) ? 1 : 0)) {
                            members.m_port3_in = (((__t0 = __deref_bublbobl_mcu_port2_w(runtime, (__L0 ? __L0((portnames[((address) & (3))] ?? 0)) : runtime.macro("ioport", (portnames[((address) & (3))] ?? 0)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0((portnames[((address) & (3))] ?? 0)) : runtime.macro("ioport", (portnames[((address) & (3))] ?? 0))), "read"))) & 0xff);
                        }
                        else {
                            if (((Number(((address) & (3072))) === Number(3072)) ? 1 : 0)) {
                                members.m_port3_in = ((runtime.readIndex((members.m_mcu_sharedram ?? runtime.member("m_mcu_sharedram")), ((address) & (1023)))) & 0xff);
                            }
                        }
                        (__L2 ?? runtime.memberCall(members.m_mcu, "pulse_input_line", 0, undefined))(2, (__L1 ? __L1(1) : runtime.macro("attotime::from_usec", 1)));
                    }
                    else {
                        if (((Number(((address) & (3072))) === Number(3072)) ? 1 : 0)) {
                            runtime.writeIndex(runtime.writableMember("m_mcu_sharedram"), ((address) & (1023)), (members.m_port3_out ?? runtime.member("m_port3_out")));
                        }
                    }
                }
                members.m_port2_out = ((data) & 0xff);
            }
            function __deref_bublbobl_mcu_port2_w(runtime, p) {
                if (p !== null && typeof p === 'object') {
                    if (p.generatedPointer === true) {
                        if (p.target === undefined) {
                            const read = p.source[p.offset];
                            if (read !== undefined && read !== null)
                                return read;
                        }
                    }
                    else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
                        return p;
                    }
                }
                return runtime.dereference(p);
            }
            function method_bublbobl_mcu_port3_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_port3_out = ((data) & 0xff);
            }
            function method_bublbobl_mcu_port3_r(runtime) {
                const members = runtime.members;
                return (members.m_port3_in ?? runtime.member("m_port3_in"));
            }
            function method_bublbobl_mcu_port4_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_port4_out = ((data) & 0xff);
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "common_sound_semaphores_r": method_common_sound_semaphores_r,
                "bublbobl_soundcpu_reset_w": method_bublbobl_soundcpu_reset_w,
                "common_sreset": method_common_sreset,
                "bublbobl_nmitrigger_w": method_bublbobl_nmitrigger_w,
                "screen_update_bublbobl": method_screen_update_bublbobl,
                "mcram_vect_r": method_mcram_vect_r,
                "bublbobl_mcu_port2_w": method_bublbobl_mcu_port2_w,
                "bublbobl_mcu_port3_w": method_bublbobl_mcu_port3_w,
                "bublbobl_mcu_port3_r": method_bublbobl_mcu_port3_r,
                "bublbobl_mcu_port4_w": method_bublbobl_mcu_port4_w
            };
            return __methodTable;
        })();
        return {
            "bublbobl_state.common_sound_semaphores_r": methods["common_sound_semaphores_r"],
            "bublbobl_state.bublbobl_soundcpu_reset_w": methods["bublbobl_soundcpu_reset_w"],
            "bublbobl_state.common_sreset": methods["common_sreset"],
            "bublbobl_state.bublbobl_nmitrigger_w": methods["bublbobl_nmitrigger_w"],
            "bublbobl_state.screen_update_bublbobl": methods["screen_update_bublbobl"],
            "bublbobl_state.mcram_vect_r": methods["mcram_vect_r"],
            "bublbobl_state.bublbobl_mcu_port2_w": methods["bublbobl_mcu_port2_w"],
            "bublbobl_state.bublbobl_mcu_port3_w": methods["bublbobl_mcu_port3_w"],
            "bublbobl_state.bublbobl_mcu_port3_r": methods["bublbobl_mcu_port3_r"],
            "bublbobl_state.bublbobl_mcu_port4_w": methods["bublbobl_mcu_port4_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["attotime::from_usec", "bitmap.fill", "fill", "flip_screen", "ioport", "m_audiocpu.set_input_line", "m_gfxdecode.gfx", "m_main_to_sound.pending_r", "m_maincpu.set_input_line", "m_mcu.pulse_input_line", "m_sound_to_main.acknowledge_w", "m_sound_to_main.pending_r", "m_soundnmi.in_w_0", "m_subcpu.pulse_input_line", "m_ym2203.reset", "m_ym3526.reset", "memregion"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
