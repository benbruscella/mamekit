// GENERATED executable machine composition from src/mame/williams/midtunit.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mk');
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
            const __mame_table_0 = [19, 39, 15, 31, 62, 61, 59, 55, 46, 28, 56, 49, 34, 5, 10, 21, 43, 22, 45, 26, 52, 40, 16, 33, 3, 6, 12, 25, 50, 36, 9, 19, 39, 15, 31, 62, 61, 59, 55, 46, 28, 56, 49, 34, 5, 10, 21, 43, 22, 45, 26, 52, 40, 16, 33, 3, 255];
            function method_mk_prot_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                const h_mk_prot_values = members.mk_prot_values ?? runtime.member("mk_prot_values");
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    0;
                }
                if (((Number((members.m_mk_prot_index ?? runtime.member("m_mk_prot_index"))) >= Number(((h_mk_prot_values)?.byteLength ?? 1))) ? 1 : 0)) {
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        0;
                    }
                    members.m_mk_prot_index = ((0) & 0xff);
                }
                let result = (((((__mame_table_0[((((members.m_mk_prot_index ?? runtime.member("m_mk_prot_index"))) % 57) + 57) % 57] ?? 0)) << (9))) & 0xffff);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mk_prot_index = ((((members.m_mk_prot_index) + (1))) & 0xff);
                }
                return result;
            }
            function method_mk_prot_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                const h_mk_prot_values = members.mk_prot_values ?? runtime.member("mk_prot_values");
                if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                    let first_val = ((((((data) >>> (9))) & (63))) | 0);
                    let i = ((0) | 0);
                    for (i = ((0) | 0); ((Number(i) < Number(((h_mk_prot_values)?.byteLength ?? 1))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((Number((__mame_table_0[(((i) % 57) + 57) % 57] ?? 0)) === Number(first_val)) ? 1 : 0)) {
                            members.m_mk_prot_index = ((i) & 0xff);
                            break;
                        }
                    }
                    if (((Number(i) === Number(((h_mk_prot_values)?.byteLength ?? 1))) ? 1 : 0)) {
                        0;
                        members.m_mk_prot_index = ((0) & 0xff);
                    }
                    0;
                }
            }
            function method_midtunit_vram_r(runtime, offset) {
                const members = runtime.members;
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    return ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) << (8))));
                }
                else {
                    return ((runtime.shiftRight(runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset), 8)) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (65280))));
                }
            }
            function method_midtunit_vram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((data) & (255))) | (((((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((((data) >>> (8))) & (255))) | (((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (65280)))));
                    }
                }
                else {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((((data) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (255))) | (((data) & (65280)))));
                    }
                }
            }
            function method_cmos_r(runtime, offset) {
                const members = runtime.members;
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                return runtime.readIndex(h_m_nvram, offset);
            }
            function method_cmos_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                if (1) {
                    runtime.combineData(__addr_cmos_w(runtime, h_m_nvram, offset), data, mem_mask);
                    members.m_cmos_write_enable = ((0) & 0xff);
                }
            }
            function __addr_cmos_w(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_dma_r(runtime, offset) {
                const members = runtime.members;
                if ((((offset) === (0)) ? 1 : 0)) {
                    offset = 1;
                }
                return runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), offset);
            }
            function method_sound_state_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                if ((members.m_fake_sound_state ?? runtime.member("m_fake_sound_state"))) {
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_fake_sound_state = ((((members.m_fake_sound_state) - (1))) & 0xff);
                    }
                    return 0;
                }
                return -1;
            }
            function method_sound_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    0;
                }
                return -1;
            }
            function method_sound_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_adpcm_sound.reset_write"], __L1 = __l["m_adpcm_sound.write"];
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                if (((offset) ? 0 : 1)) {
                    0;
                    return;
                }
                if (((((((mem_mask) & 0x00ff) ? 1 : 0)) && ((((mem_mask) & 0xff00) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_adpcm_sound, "reset_write", 0, undefined))((((~data)) & (256)));
                    (__L1 ?? runtime.memberCall(members.m_adpcm_sound, "write", 0, undefined))(((data) & (255)));
                    members.m_fake_sound_state = ((128) & 0xff);
                }
            }
            function method_reset_write(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                if (state) {
                    (runtime.overrides["bank_select_w"] ? runtime.overrides["bank_select_w"](0) : method_bank_select_w(runtime, 0));
                    (runtime.overrides["device_reset"] ? runtime.overrides["device_reset"]() : method_device_reset(runtime));
                    (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, 1);
                }
                else {
                    (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, 0);
                }
            }
            function method_bank_select_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_rombank.set_entry"], __L1 = __l["set_entry"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_rombank, "set_entry", 0, __L1))(((data) & (7)));
            }
            function method_device_reset(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"], __L1 = __l["m_sync_command_timer.adjust"], __L2 = __l["adjust"], __L3 = __l["m_irq_clear_timer.adjust"];
                members.m_sound_int_state = 0;
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, 0);
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, 0);
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-1, 0);
                (__L1 ?? runtime.memberCall(members.m_sync_command_timer, "adjust", 0, __L2))(Infinity);
                (__L3 ?? runtime.memberCall(members.m_irq_clear_timer, "adjust", 0, __L2))(Infinity);
            }
            function method_command_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"], __L1 = __l["attotime::from_usec"], __L2 = __l["m_irq_clear_timer.adjust"], __L3 = __l["adjust"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, 0);
                (__L2 ?? runtime.memberCall(members.m_irq_clear_timer, "adjust", 0, __L3))((__L1 ? __L1(10) : runtime.macro("attotime::from_usec", 10)));
                return (members.m_latch ?? runtime.member("m_latch"));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "mk_prot_r": method_mk_prot_r,
                "mk_prot_w": method_mk_prot_w,
                "midtunit_vram_r": method_midtunit_vram_r,
                "midtunit_vram_w": method_midtunit_vram_w,
                "cmos_r": method_cmos_r,
                "cmos_w": method_cmos_w,
                "dma_r": method_dma_r,
                "sound_state_r": method_sound_state_r,
                "sound_r": method_sound_r,
                "sound_w": method_sound_w,
                "reset_write": method_reset_write,
                "bank_select_w": method_bank_select_w,
                "device_reset": method_device_reset,
                "command_r": method_command_r
            };
            return __methodTable;
        })();
        return {
            "midtunit_adpcm_state.mk_prot_r": methods["mk_prot_r"],
            "midtunit_adpcm_state.mk_prot_w": methods["mk_prot_w"],
            "midtunit_adpcm_state.sound_state_r": methods["sound_state_r"],
            "midtunit_adpcm_state.sound_r": methods["sound_r"],
            "midtunit_adpcm_state.sound_w": methods["sound_w"],
        };
    })(),
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
            const __mame_table_0 = [19, 39, 15, 31, 62, 61, 59, 55, 46, 28, 56, 49, 34, 5, 10, 21, 43, 22, 45, 26, 52, 40, 16, 33, 3, 6, 12, 25, 50, 36, 9, 19, 39, 15, 31, 62, 61, 59, 55, 46, 28, 56, 49, 34, 5, 10, 21, 43, 22, 45, 26, 52, 40, 16, 33, 3, 255];
            function method_mk_prot_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                const h_mk_prot_values = members.mk_prot_values ?? runtime.member("mk_prot_values");
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    0;
                }
                if (((Number((members.m_mk_prot_index ?? runtime.member("m_mk_prot_index"))) >= Number(((h_mk_prot_values)?.byteLength ?? 1))) ? 1 : 0)) {
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        0;
                    }
                    members.m_mk_prot_index = ((0) & 0xff);
                }
                let result = (((((__mame_table_0[((((members.m_mk_prot_index ?? runtime.member("m_mk_prot_index"))) % 57) + 57) % 57] ?? 0)) << (9))) & 0xffff);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mk_prot_index = ((((members.m_mk_prot_index) + (1))) & 0xff);
                }
                return result;
            }
            function method_mk_prot_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                const h_mk_prot_values = members.mk_prot_values ?? runtime.member("mk_prot_values");
                if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                    let first_val = ((((((data) >>> (9))) & (63))) | 0);
                    let i = ((0) | 0);
                    for (i = ((0) | 0); ((Number(i) < Number(((h_mk_prot_values)?.byteLength ?? 1))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if (((Number((__mame_table_0[(((i) % 57) + 57) % 57] ?? 0)) === Number(first_val)) ? 1 : 0)) {
                            members.m_mk_prot_index = ((i) & 0xff);
                            break;
                        }
                    }
                    if (((Number(i) === Number(((h_mk_prot_values)?.byteLength ?? 1))) ? 1 : 0)) {
                        0;
                        members.m_mk_prot_index = ((0) & 0xff);
                    }
                    0;
                }
            }
            function method_midtunit_vram_r(runtime, offset) {
                const members = runtime.members;
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    return ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) << (8))));
                }
                else {
                    return ((runtime.shiftRight(runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset), 8)) | (((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (65280))));
                }
            }
            function method_midtunit_vram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                offset = ((offset) * (2));
                if ((members.m_videobank_select ?? runtime.member("m_videobank_select"))) {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((data) & (255))) | (((((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((((data) >>> (8))) & (255))) | (((runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), 8)) & (65280)))));
                    }
                }
                else {
                    if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), offset, ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), offset)) & (255))) | (((((data) & (255))) << (8)))));
                    }
                    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_local_videoram"), ((offset) + (1)), ((((runtime.readIndex((members.m_local_videoram ?? runtime.member("m_local_videoram")), ((offset) + (1)))) & (255))) | (((data) & (65280)))));
                    }
                }
            }
            function method_cmos_r(runtime, offset) {
                const members = runtime.members;
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                return runtime.readIndex(h_m_nvram, offset);
            }
            function method_cmos_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                const h_m_nvram = members.m_nvram ?? runtime.member("m_nvram");
                if (1) {
                    runtime.combineData(__addr_cmos_w(runtime, h_m_nvram, offset), data, mem_mask);
                    members.m_cmos_write_enable = ((0) & 0xff);
                }
            }
            function __addr_cmos_w(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_cmos_enable_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                members.m_cmos_write_enable = ((1) & 0xff);
            }
            function method_dma_r(runtime, offset) {
                const members = runtime.members;
                if ((((offset) === (0)) ? 1 : 0)) {
                    offset = 1;
                }
                return runtime.readIndex((members.m_dma_register ?? runtime.member("m_dma_register")), offset);
            }
            function method_sound_state_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                if ((members.m_fake_sound_state ?? runtime.member("m_fake_sound_state"))) {
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_fake_sound_state = ((((members.m_fake_sound_state) - (1))) & 0xff);
                    }
                    return 0;
                }
                return -1;
            }
            function method_sound_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    0;
                }
                return -1;
            }
            function method_sound_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_adpcm_sound.reset_write"], __L1 = __l["m_adpcm_sound.write"];
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                if (((offset) ? 0 : 1)) {
                    0;
                    return;
                }
                if (((((((mem_mask) & 0x00ff) ? 1 : 0)) && ((((mem_mask) & 0xff00) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_adpcm_sound, "reset_write", 0, undefined))((((~data)) & (256)));
                    (__L1 ?? runtime.memberCall(members.m_adpcm_sound, "write", 0, undefined))(((data) & (255)));
                    members.m_fake_sound_state = ((128) & 0xff);
                }
            }
            function method_reset_write(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                if (state) {
                    (runtime.overrides["bank_select_w"] ? runtime.overrides["bank_select_w"](0) : method_bank_select_w(runtime, 0));
                    (runtime.overrides["device_reset"] ? runtime.overrides["device_reset"]() : method_device_reset(runtime));
                    (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, 1);
                }
                else {
                    (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, 0);
                }
            }
            function method_bank_select_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_rombank.set_entry"], __L1 = __l["set_entry"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_rombank, "set_entry", 0, __L1))(((data) & (7)));
            }
            function method_device_reset(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"], __L1 = __l["m_sync_command_timer.adjust"], __L2 = __l["adjust"], __L3 = __l["m_irq_clear_timer.adjust"];
                members.m_sound_int_state = 0;
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, 0);
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, 0);
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-1, 0);
                (__L1 ?? runtime.memberCall(members.m_sync_command_timer, "adjust", 0, __L2))(Infinity);
                (__L3 ?? runtime.memberCall(members.m_irq_clear_timer, "adjust", 0, __L2))(Infinity);
            }
            function method_command_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"], __L1 = __l["attotime::from_usec"], __L2 = __l["m_irq_clear_timer.adjust"], __L3 = __l["adjust"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, 0);
                (__L2 ?? runtime.memberCall(members.m_irq_clear_timer, "adjust", 0, __L3))((__L1 ? __L1(10) : runtime.macro("attotime::from_usec", 10)));
                return (members.m_latch ?? runtime.member("m_latch"));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "mk_prot_r": method_mk_prot_r,
                "mk_prot_w": method_mk_prot_w,
                "midtunit_vram_r": method_midtunit_vram_r,
                "midtunit_vram_w": method_midtunit_vram_w,
                "cmos_r": method_cmos_r,
                "cmos_w": method_cmos_w,
                "cmos_enable_w": method_cmos_enable_w,
                "dma_r": method_dma_r,
                "sound_state_r": method_sound_state_r,
                "sound_r": method_sound_r,
                "sound_w": method_sound_w,
                "reset_write": method_reset_write,
                "bank_select_w": method_bank_select_w,
                "device_reset": method_device_reset,
                "command_r": method_command_r
            };
            return __methodTable;
        })();
        return {
            "midtunit_base_state.cmos_r": methods["cmos_r"],
            "midtunit_base_state.cmos_w": methods["cmos_w"],
            "midtunit_base_state.cmos_enable_w": methods["cmos_enable_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust", "attotime::from_usec", "m_adpcm_sound.reset_write", "m_adpcm_sound.write", "m_cpu.set_input_line", "m_irq_clear_timer.adjust", "m_rombank.set_entry", "m_sync_command_timer.adjust", "machine", "machine().side_effects_disabled", "set_entry"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
