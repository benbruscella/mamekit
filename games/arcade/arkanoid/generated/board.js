// GENERATED executable machine composition from src/mame/taito/arkanoid.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'arkanoid');
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
            function method_input_mux_r(runtime) {
                const members = runtime.members;
                const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
                return runtime.memberCall(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))), "read_safe", 0, undefined)(255);
            }
            function method_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mcu.set_input_line"];
                members.m_reset_input = ((Number(1) === Number(state)) ? 1 : 0);
                if (((Number(0) !== Number(state)) ? 1 : 0)) {
                    members.m_host_flag = 0;
                    members.m_mcu_flag = 0;
                    (__L0 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(0, 0);
                }
                (__L0 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-2, state);
            }
            function method_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_semaphore_cb"];
                let result = (((((members.m_mcu_latch ?? runtime.member("m_mcu_latch"))) & 0xff)) & 0xff);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mcu_flag = 0;
                    (__L2 ? __L2(0) : runtime.macro("m_semaphore_cb", 0));
                }
                return result;
            }
            function method_arkanoid_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let offs = ((((tile_index) * (2))) | 0);
                let code = ((__add_get_bg_tile_info(runtime, __add_get_bg_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((offs) + (1))), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & (7))) << (8))), ((2048) * ((members.m_gfxbank ?? runtime.member("m_gfxbank")))))) | 0);
                let color = ((__add_get_bg_tile_info(runtime, runtime.shiftRight(((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & (248)), 3), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank")))))) | 0);
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, 0);
            }
            function __add_get_bg_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_screen_update_arkanoid(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"];
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen_x"], __L1 = __l["flip_screen_y"], __L2 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let offs = ((0) | 0);
                for (offs = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_spriteram, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    let sx = ((0) | 0);
                    let sy = ((0) | 0);
                    let code = ((0) | 0);
                    sx = ((runtime.readIndex(h_m_spriteram, offs)) | 0);
                    sy = ((((248) - (runtime.readIndex(h_m_spriteram, ((offs) + (1)))))) | 0);
                    if ((__L0 ? __L0() : runtime.macro("flip_screen_x"))) {
                        sx = ((((248) - (sx))) | 0);
                    }
                    if ((__L1 ? __L1() : runtime.macro("flip_screen_y"))) {
                        sy = ((((248) - (sy))) | 0);
                    }
                    code = ((__add_draw_sprites(runtime, __add_draw_sprites(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (3))), ((((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (3))) << (8))), ((1024) * ((members.m_gfxbank ?? runtime.member("m_gfxbank")))))) | 0);
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, ((2) * (code)), __add_draw_sprites(runtime, runtime.shiftRight(((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (248)), 3), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank"))))), (__L0 ? __L0() : runtime.macro("flip_screen_x")), (__L1 ? __L1() : runtime.macro("flip_screen_y")), sx, ((sy) + ((((__L1 ? __L1() : runtime.macro("flip_screen_y"))) ? (8) : (-8)))), 0);
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, __add_draw_sprites(runtime, ((2) * (code)), 1), __add_draw_sprites(runtime, runtime.shiftRight(((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (248)), 3), ((32) * ((members.m_palettebank ?? runtime.member("m_palettebank"))))), (__L0 ? __L0() : runtime.macro("flip_screen_x")), (__L1 ? __L1() : runtime.macro("flip_screen_y")), sx, sy, 0);
                }
            }
            function __add_draw_sprites(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_mcu_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_portb_r_cb"];
                return (__L0 ? __L0() : runtime.macro("m_portb_r_cb"));
            }
            function method_mcu_pc_r(runtime) {
                const members = runtime.members;
                return (((((((runtime.overrides["host_flag"] ? runtime.overrides["host_flag"]() : method_host_flag(runtime))) ? (1) : (0))) | ((((runtime.overrides["mcu_flag"] ? runtime.overrides["mcu_flag"]() : method_mcu_flag(runtime))) ? (0) : (2))))) | (252));
            }
            function method_host_flag(runtime) {
                const members = runtime.members;
                return (members.m_host_flag ?? runtime.member("m_host_flag"));
            }
            function method_mcu_flag(runtime) {
                const members = runtime.members;
                return (members.m_mcu_flag ?? runtime.member("m_mcu_flag"));
            }
            function method_arkanoid_semaphore_input_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mcuintf.host_semaphore_r"], __L1 = __l["m_mcuintf.mcu_semaphore_r"];
                let __t0, __t1;
                return ((((((Number(0) !== Number((__L0 ?? runtime.memberCall(members.m_mcuintf, "host_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (1))) | (((((Number(0) !== Number((__L1 ?? runtime.memberCall(members.m_mcuintf, "mcu_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (2))));
            }
            function method_mcu_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_mcu_flag ?? runtime.member("m_mcu_flag"))) ? (1) : (0));
            }
            function method_host_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_host_flag ?? runtime.member("m_host_flag"))) ? (1) : (0));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "input_mux_r": method_input_mux_r,
                "reset_w": method_reset_w,
                "data_r": method_data_r,
                "arkanoid_videoram_w": method_arkanoid_videoram_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "screen_update_arkanoid": method_screen_update_arkanoid,
                "draw_sprites": method_draw_sprites,
                "mcu_pb_r": method_mcu_pb_r,
                "mcu_pc_r": method_mcu_pc_r,
                "host_flag": method_host_flag,
                "mcu_flag": method_mcu_flag,
                "arkanoid_semaphore_input_r": method_arkanoid_semaphore_input_r,
                "mcu_semaphore_r": method_mcu_semaphore_r,
                "host_semaphore_r": method_host_semaphore_r
            };
            return __methodTable;
        })();
        return {
            "arkanoid_state.input_mux_r": methods["input_mux_r"],
            "arkanoid_state.arkanoid_videoram_w": methods["arkanoid_videoram_w"],
            "arkanoid_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "arkanoid_state.screen_update_arkanoid": methods["screen_update_arkanoid"],
            "arkanoid_state.draw_sprites": methods["draw_sprites"],
            "arkanoid_state.arkanoid_semaphore_input_r": methods["arkanoid_semaphore_input_r"],
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
            function method_input_mux_r(runtime) {
                const members = runtime.members;
                const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
                return runtime.memberCall(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))), "read_safe", 0, undefined)(255);
            }
            function method_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mcu.set_input_line"];
                members.m_reset_input = ((Number(1) === Number(state)) ? 1 : 0);
                if (((Number(0) !== Number(state)) ? 1 : 0)) {
                    members.m_host_flag = 0;
                    members.m_mcu_flag = 0;
                    (__L0 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(0, 0);
                }
                (__L0 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-2, state);
            }
            function method_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_semaphore_cb"];
                let result = (((((members.m_mcu_latch ?? runtime.member("m_mcu_latch"))) & 0xff)) & 0xff);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mcu_flag = 0;
                    (__L2 ? __L2(0) : runtime.macro("m_semaphore_cb", 0));
                }
                return result;
            }
            function method_arkanoid_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_mcu_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_portb_r_cb"];
                return (__L0 ? __L0() : runtime.macro("m_portb_r_cb"));
            }
            function method_mcu_pc_r(runtime) {
                const members = runtime.members;
                return (((((((runtime.overrides["host_flag"] ? runtime.overrides["host_flag"]() : method_host_flag(runtime))) ? (1) : (0))) | ((((runtime.overrides["mcu_flag"] ? runtime.overrides["mcu_flag"]() : method_mcu_flag(runtime))) ? (0) : (2))))) | (252));
            }
            function method_host_flag(runtime) {
                const members = runtime.members;
                return (members.m_host_flag ?? runtime.member("m_host_flag"));
            }
            function method_mcu_flag(runtime) {
                const members = runtime.members;
                return (members.m_mcu_flag ?? runtime.member("m_mcu_flag"));
            }
            function method_arkanoid_semaphore_input_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mcuintf.host_semaphore_r"], __L1 = __l["m_mcuintf.mcu_semaphore_r"];
                let __t0, __t1;
                return ((((((Number(0) !== Number((__L0 ?? runtime.memberCall(members.m_mcuintf, "host_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (1))) | (((((Number(0) !== Number((__L1 ?? runtime.memberCall(members.m_mcuintf, "mcu_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (2))));
            }
            function method_mcu_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_mcu_flag ?? runtime.member("m_mcu_flag"))) ? (1) : (0));
            }
            function method_host_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_host_flag ?? runtime.member("m_host_flag"))) ? (1) : (0));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "input_mux_r": method_input_mux_r,
                "reset_w": method_reset_w,
                "data_r": method_data_r,
                "arkanoid_videoram_w": method_arkanoid_videoram_w,
                "mcu_pb_r": method_mcu_pb_r,
                "mcu_pc_r": method_mcu_pc_r,
                "host_flag": method_host_flag,
                "mcu_flag": method_mcu_flag,
                "arkanoid_semaphore_input_r": method_arkanoid_semaphore_input_r,
                "mcu_semaphore_r": method_mcu_semaphore_r,
                "host_semaphore_r": method_host_semaphore_r
            };
            return __methodTable;
        })();
        return {
            "taito68705_mcu_device_base.reset_w": methods["reset_w"],
            "taito68705_mcu_device_base.host_flag": methods["host_flag"],
            "taito68705_mcu_device_base.mcu_flag": methods["mcu_flag"],
            "taito68705_mcu_device_base.mcu_semaphore_r": methods["mcu_semaphore_r"],
            "taito68705_mcu_device_base.host_semaphore_r": methods["host_semaphore_r"],
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
            function method_input_mux_r(runtime) {
                const members = runtime.members;
                const h_m_muxports = members.m_muxports ?? runtime.member("m_muxports");
                return runtime.memberCall(runtime.readIndex(h_m_muxports, ((((Number(0) === Number((members.m_paddle_select ?? runtime.member("m_paddle_select")))) ? 1 : 0)) ? (0) : (1))), "read_safe", 0, undefined)(255);
            }
            function method_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mcu.set_input_line"];
                members.m_reset_input = ((Number(1) === Number(state)) ? 1 : 0);
                if (((Number(0) !== Number(state)) ? 1 : 0)) {
                    members.m_host_flag = 0;
                    members.m_mcu_flag = 0;
                    (__L0 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(0, 0);
                }
                (__L0 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-2, state);
            }
            function method_data_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_semaphore_cb"];
                let result = (((((members.m_mcu_latch ?? runtime.member("m_mcu_latch"))) & 0xff)) & 0xff);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    members.m_mcu_flag = 0;
                    (__L2 ? __L2(0) : runtime.macro("m_semaphore_cb", 0));
                }
                return result;
            }
            function method_arkanoid_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_mcu_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_portb_r_cb"];
                return (__L0 ? __L0() : runtime.macro("m_portb_r_cb"));
            }
            function method_mcu_pc_r(runtime) {
                const members = runtime.members;
                return (((((((runtime.overrides["host_flag"] ? runtime.overrides["host_flag"]() : method_host_flag(runtime))) ? (1) : (0))) | ((((runtime.overrides["mcu_flag"] ? runtime.overrides["mcu_flag"]() : method_mcu_flag(runtime))) ? (0) : (2))))) | (252));
            }
            function method_host_flag(runtime) {
                const members = runtime.members;
                return (members.m_host_flag ?? runtime.member("m_host_flag"));
            }
            function method_mcu_flag(runtime) {
                const members = runtime.members;
                return (members.m_mcu_flag ?? runtime.member("m_mcu_flag"));
            }
            function method_arkanoid_semaphore_input_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mcuintf.host_semaphore_r"], __L1 = __l["m_mcuintf.mcu_semaphore_r"];
                let __t0, __t1;
                return ((((((Number(0) !== Number((__L0 ?? runtime.memberCall(members.m_mcuintf, "host_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (1))) | (((((Number(0) !== Number((__L1 ?? runtime.memberCall(members.m_mcuintf, "mcu_semaphore_r", 0, undefined))())) ? 1 : 0)) ? (0) : (2))));
            }
            function method_mcu_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_mcu_flag ?? runtime.member("m_mcu_flag"))) ? (1) : (0));
            }
            function method_host_semaphore_r(runtime) {
                const members = runtime.members;
                return (((members.m_host_flag ?? runtime.member("m_host_flag"))) ? (1) : (0));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "input_mux_r": method_input_mux_r,
                "reset_w": method_reset_w,
                "data_r": method_data_r,
                "arkanoid_videoram_w": method_arkanoid_videoram_w,
                "mcu_pb_r": method_mcu_pb_r,
                "mcu_pc_r": method_mcu_pc_r,
                "host_flag": method_host_flag,
                "mcu_flag": method_mcu_flag,
                "arkanoid_semaphore_input_r": method_arkanoid_semaphore_input_r,
                "mcu_semaphore_r": method_mcu_semaphore_r,
                "host_semaphore_r": method_host_semaphore_r
            };
            return __methodTable;
        })();
        return {
            "arkanoid_mcu_device_base.data_r": methods["data_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw", "flip_screen_x", "flip_screen_y", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_mcu.set_input_line", "m_mcuintf.host_semaphore_r", "m_mcuintf.mcu_semaphore_r", "m_portb_r_cb", "m_semaphore_cb", "machine", "machine().side_effects_disabled", "mark_tile_dirty", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
