// GENERATED executable machine composition from src/mame/namco/polepos.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'polepos');
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
            function method_sprite_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), offset)) & (255));
            }
            function method_sprite_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_sprite16_memory"), offset, ((((runtime.readIndex((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), offset)) & (65280))) | (data)));
            }
            function method_road_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), offset)) & (255));
            }
            function method_road_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_road16_memory"), offset, ((((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), offset)) & (65280))) | (data)));
            }
            function method_alpha_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset)) & (255));
            }
            function method_alpha_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tx_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_alpha16_memory"), offset, ((((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset)) & (65280))) | (data)));
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_view_r(runtime, offset) {
                const members = runtime.members;
                return ((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset)) & (255));
            }
            function method_view_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_view16_memory"), offset, ((((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset)) & (65280))) | (data)));
                if ((((offset) < (1024)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
                }
            }
            function method_data_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("write_sync", data);
            }
            function method_ctrl_r(runtime) {
                const members = runtime.members;
                return (members.m_control ?? runtime.member("m_control"));
            }
            function method_ready_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_adc.intr_r"];
                let __t0, __t1;
                let ret = ((255) | 0);
                if (((Number((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) >= Number(128)) ? 1 : 0)) {
                    ret = ((((ret) ^ (2))) | 0);
                }
                if ((((__L1 ?? runtime.memberCall(members.m_adc, "intr_r", 0, undefined))()) ? 0 : 1)) {
                    ret = ((((ret) ^ (8))) | 0);
                }
                return ret;
            }
            function method_alpha16_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tx_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                runtime.combineData(__addr_alpha16_w(runtime, (members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset), data, mem_mask);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function __addr_alpha16_w(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_view16_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                runtime.combineData(__addr_view16_w(runtime, (members.m_view16_memory ?? runtime.member("m_view16_memory")), offset), data, mem_mask);
                if ((((offset) < (1024)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
                }
            }
            function __addr_view16_w(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_view16_hscroll_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"];
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_scroll ?? runtime.member("m_scroll")), set: (value) => { members.m_scroll = ((value) & 0xffff); } }), offset: 0 }), data, mem_mask);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, (members.m_scroll ?? runtime.member("m_scroll")));
            }
            function method_road16_vscroll_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_road16_vscroll ?? runtime.member("m_road16_vscroll")), set: (value) => { members.m_road16_vscroll = ((value) & 0xffff); } }), offset: 0 }), data, mem_mask);
            }
            function method_bg_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let word = ((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), tile_index)) & 0xffff);
                let code = ((((((word) & (255))) | (runtime.shiftRight(((word) & (16384)), 6)))) | 0);
                let color = ((runtime.shiftRight(((word) & (16128)), 8)) | 0);
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(1, code, color, 0);
            }
            function method_tx_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let word = ((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), tile_index)) & 0xffff);
                let code = ((((((word) & (255))) | (runtime.shiftRight(((word) & (16384)), 6)))) | 0);
                let color = ((runtime.shiftRight(((word) & (16128)), 8)) | 0);
                if (((Number((members.m_chacl ?? runtime.member("m_chacl"))) === Number(0)) ? 1 : 0)) {
                    code = ((((code) & (255))) | 0);
                    color = ((0) | 0);
                }
                if (((Number(tile_index) >= Number(512)) ? 1 : 0)) {
                    color = ((((color) | (64))) | 0);
                }
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, 0);
                tileinfo.group = color;
            }
            function method_namco_52xx_rom_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"];
                const h_m_52xx_region = members.m_52xx_region ?? runtime.member("m_52xx_region");
                let length = ((runtime.container(members.m_52xx_region, "bytes")) >>> 0);
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    0;
                }
                return (((((offset) < (length)) ? 1 : 0)) ? (runtime.readIndex(h_m_52xx_region, offset)) : (255));
            }
            function method_namco_52xx_si_r(runtime) {
                const members = runtime.members;
                return 1;
            }
            function method_namco_53xx_k_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            function method_steering_changed_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_steer_io.read"], __L3 = __l["read"];
                let __t0;
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    let steer_new = (((__L2 ?? runtime.memberCall(members.m_steer_io, "read", 0, __L3))()) & 0xff);
                    members.m_steer_accum = ((((members.m_steer_accum) + (((((((steer_new) - ((members.m_steer_last ?? runtime.member("m_steer_last"))))) << 24 >> 24)) * (2))))) << 16 >> 16);
                    members.m_steer_last = ((steer_new) & 0xff);
                    if (((Number((members.m_steer_accum ?? runtime.member("m_steer_accum"))) < Number(0)) ? 1 : 0)) {
                        members.m_steer_delta = ((0) & 0xff);
                        members.m_steer_accum = ((((members.m_steer_accum) + (1))) << 16 >> 16);
                    }
                    else {
                        if (((Number((members.m_steer_accum ?? runtime.member("m_steer_accum"))) > Number(0)) ? 1 : 0)) {
                            members.m_steer_delta = ((1) & 0xff);
                            members.m_steer_accum = ((((members.m_steer_accum) - (1))) << 16 >> 16);
                        }
                    }
                }
                return (((members.m_steer_accum ?? runtime.member("m_steer_accum"))) & (1));
            }
            function method_steering_delta_r(runtime) {
                const members = runtime.members;
                return (members.m_steer_delta ?? runtime.member("m_steer_delta"));
            }
            function method_chip_select(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, ((state) ? (1) : (0)));
            }
            function method_rw(runtime, state) {
                const members = runtime.members;
                runtime.synchronize("rw_sync", state);
            }
            function method_reset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
            }
            function method_clson_w(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    (runtime.overrides["polepos_engine_sound_lsb_w"] ? runtime.overrides["polepos_engine_sound_lsb_w"](0) : method_polepos_engine_sound_lsb_w(runtime, 0));
                    (runtime.overrides["polepos_engine_sound_msb_w"] ? runtime.overrides["polepos_engine_sound_msb_w"](0) : method_polepos_engine_sound_msb_w(runtime, 0));
                }
            }
            function method_polepos_engine_sound_lsb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_stream.update"], __L1 = __l["update"];
                let __t0;
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
                members.m_sample_lsb = ((data) & (62));
                members.m_sample_enable = ((data) & (1));
            }
            function method_polepos_engine_sound_msb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_stream.update"], __L1 = __l["update"];
                let __t0;
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
                members.m_sample_msb = ((data) & (63));
            }
            function method_gasel_w(runtime, state) {
                const members = runtime.members;
                members.m_adc_input = ((state) & 0xff);
            }
            function method_sb0_w(runtime, state) {
                const members = runtime.members;
                members.m_auto_start_mask = ((((state) ? 0 : 1)) << 24 >> 24);
            }
            function method_chacl_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tx_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                members.m_chacl = ((state) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_all_dirty", 0, __L1))();
            }
            function method_analog_r(runtime) {
                const members = runtime.members;
                let __t0;
                const h_m_analog_io = members.m_analog_io ?? runtime.member("m_analog_io");
                return (__t0 = __deref_analog_r(runtime, runtime.readIndex(h_m_analog_io, (((members.m_adc_input ?? runtime.member("m_adc_input"))) & (1)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_analog_io, (((members.m_adc_input ?? runtime.member("m_adc_input"))) & (1))), "read"));
            }
            function __deref_analog_r(runtime, p) {
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
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"], __L2 = __l["m_tx_tilemap.draw"];
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                clip.max_y = 127;
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, clip, 0, 0);
                (runtime.overrides["draw_road"] ? runtime.overrides["draw_road"](bitmap) : method_draw_road(runtime, bitmap));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__L2 ?? runtime.memberCall(members.m_tx_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function method_draw_road(runtime, bitmap) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["draw_scanline16"];
                let __t0, __t1;
                let road_bits1 = __addr_draw_road(runtime, (members.m_road_region ?? runtime.member("m_road_region")), 8192);
                let road_bits1$s = undefined, road_bits1$o = 0;
                if (ArrayBuffer.isView(road_bits1) || Array.isArray(road_bits1))
                    road_bits1$s = road_bits1;
                else if (road_bits1 !== null && typeof road_bits1 === 'object' && road_bits1.generatedPointer === true && road_bits1.path === undefined && road_bits1.target === undefined && (ArrayBuffer.isView(road_bits1.source) || Array.isArray(road_bits1.source))) {
                    road_bits1$s = road_bits1.source;
                    road_bits1$o = road_bits1.offset;
                }
                let road_bits2 = __addr_draw_road(runtime, (members.m_road_region ?? runtime.member("m_road_region")), 16384);
                let road_bits2$s = undefined, road_bits2$o = 0;
                if (ArrayBuffer.isView(road_bits2) || Array.isArray(road_bits2))
                    road_bits2$s = road_bits2;
                else if (road_bits2 !== null && typeof road_bits2 === 'object' && road_bits2.generatedPointer === true && road_bits2.path === undefined && road_bits2.target === undefined && (ArrayBuffer.isView(road_bits2.source) || Array.isArray(road_bits2.source))) {
                    road_bits2$s = road_bits2.source;
                    road_bits2$o = road_bits2.offset;
                }
                for (let y = ((128) | 0); (((y) < (256)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let scanline = new Uint16Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](264) : new Uint8Array(Math.max(0, Number(264)))));
                    let dest = ((0) | 0);
                    let yoffs = ((((runtime.shiftRight(__add_draw_road(runtime, runtime.readIndex((members.m_vertical_position_modifier ?? runtime.member("m_vertical_position_modifier")), y), (members.m_road16_vscroll ?? runtime.member("m_road16_vscroll"))), 3)) & (511))) | 0);
                    let roadpal = ((((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), yoffs)) & (15))) | 0);
                    let pen_base = __add_draw_road(runtime, 2816, ((roadpal) << (6)));
                    let xoffs = ((((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), __add_draw_road(runtime, 896, ((y) & (127))))) & (1023))) | 0);
                    let xscroll = ((((xoffs) & (7))) | 0);
                    xoffs = ((((xoffs) & (-8))) | 0);
                    for (let x = ((0) | 0); ((Number(x) < Number(__add_draw_road(runtime, runtime.divide(256, 8), 1))) ? 1 : 0); x = ((((x) + (1))) | 0), xoffs = ((((xoffs) + (8))) | 0)) {
                        if (((xoffs) & (512))) {
                            for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                scanline[(__t0 = dest, dest = ((((dest) + (1))) | 0), __t0)] = ((pen_base) | (0));
                            }
                        }
                        else {
                            let romoffs = ((__add_draw_road(runtime, ((((y) & (127))) << (6)), runtime.shiftRight(((xoffs) & (504)), 3))) | 0);
                            let control = ((runtime.readIndex((members.m_road_region ?? runtime.member("m_road_region")), romoffs)) | 0);
                            let bits1 = (((road_bits1$s !== undefined ? (road_bits1$s[road_bits1$o + (romoffs)] ?? 0) : runtime.readIndex(road_bits1, romoffs))) | 0);
                            let bits2 = (((road_bits2$s !== undefined ? (road_bits2$s[road_bits2$o + (((((romoffs) & (4095))) | (runtime.shiftRight(((romoffs) & (4096)), 1))))] ?? 0) : runtime.readIndex(road_bits2, ((((romoffs) & (4095))) | (runtime.shiftRight(((romoffs) & (4096)), 1)))))) | 0);
                            let roadval = ((((control) & (63))) | 0);
                            let carin = ((runtime.shiftRight(control, 7)) | 0);
                            for (let i = ((8) | 0); (((i) > (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
                                let bits = ((__add_draw_road(runtime, (((bits1) >>> (i)) & 1), (((((bits2) >>> (i)) & 1)) << (1)))) | 0);
                                if ((((((carin) ? 0 : 1)) && (bits)) ? 1 : 0)) {
                                    bits = ((((bits) + (1))) | 0);
                                }
                                scanline[(__t1 = dest, dest = ((((dest) + (1))) | 0), __t1)] = ((pen_base) | (((roadval) & (63))));
                                roadval = ((((roadval) + (bits))) | 0);
                            }
                        }
                    }
                    (__L0 ? __L0(bitmap, 0, y, 256, __addr_draw_road(runtime, scanline, xscroll), 0) : runtime.macro("draw_scanline16", bitmap, 0, y, 256, __addr_draw_road(runtime, scanline, xscroll), 0));
                }
            }
            function __add_draw_road(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_draw_road(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                let posmem = __addr_draw_sprites(runtime, (members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), 896);
                let sizmem = __addr_draw_sprites(runtime, (members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), 1920);
                for (let i = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0), posmem = __add_draw_sprites(runtime, posmem, 2), sizmem = __add_draw_sprites(runtime, sizmem, 2)) {
                    let sx = ((__add_draw_sprites(runtime, ((((runtime.readIndex(posmem, 1)) & (1023))) - (64)), 4)) | 0);
                    let sy = ((__add_draw_sprites(runtime, ((512) - (((runtime.readIndex(posmem, 0)) & (511)))), 1)) | 0);
                    let sizex = ((runtime.shiftRight(((runtime.readIndex(sizmem, 1)) & (16128)), 8)) | 0);
                    let sizey = ((runtime.shiftRight(((runtime.readIndex(sizmem, 0)) & (16128)), 8)) | 0);
                    let code = ((((runtime.readIndex(sizmem, 0)) & (127))) | 0);
                    let flipx = (((((runtime.readIndex(sizmem, 0)) >>> (7)) & 1)) ? 1 : 0);
                    let color = ((((runtime.readIndex(sizmem, 1)) & (63))) | 0);
                    if ((((sy) >= (128)) ? 1 : 0)) {
                        color = ((((color) | (64))) | 0);
                    }
                    (runtime.overrides["zoom_sprite"] ? runtime.overrides["zoom_sprite"](bitmap, (((runtime.readIndex(sizmem, 0)) >>> (15)) & 1), code, color, flipx, sx, sy, sizex, sizey) : method_zoom_sprite(runtime, bitmap, (((runtime.readIndex(sizmem, 0)) >>> (15)) & 1), code, color, flipx, sx, sy, sizex, sizey));
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
            function __addr_draw_sprites(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_zoom_sprite(runtime, bitmap, big, code, color, flipx, sx, sy, sizex, sizey) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_gfxdecode.gfx"], __L1 = __l["gfx.elements"], __L2 = __l["elements"], __L3 = __l["gfx.get_data"], __L4 = __l["get_data"], __L5 = __l["m_palette.transpen_mask"], __L6 = __l["gfx.colorbase"], __L7 = __l["colorbase"], __L8 = __l["gfx.granularity"], __L9 = __l["granularity"], __L10 = __l["gfx.rowbytes"], __L11 = __l["rowbytes"];
                let __t0, __t1, __t2, __t3;
                const h_m_scalelut_region = members.m_scalelut_region ?? runtime.member("m_scalelut_region");
                let gfx = (__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((big) ? (3) : (2)));
                let gfx$s = undefined, gfx$o = 0;
                if (ArrayBuffer.isView(gfx) || Array.isArray(gfx))
                    gfx$s = gfx;
                else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) {
                    gfx$s = gfx.source;
                    gfx$o = gfx.offset;
                }
                let gfxdata = (__L3 ?? runtime.memberCall(gfx, "get_data", 0, __L4))(((code) % ((__L1 ?? runtime.memberCall(gfx, "elements", 0, __L2))())));
                let gfxdata$s = undefined, gfxdata$o = 0;
                if (ArrayBuffer.isView(gfxdata) || Array.isArray(gfxdata))
                    gfxdata$s = gfxdata;
                else if (gfxdata !== null && typeof gfxdata === 'object' && gfxdata.generatedPointer === true && gfxdata.path === undefined && gfxdata.target === undefined && (ArrayBuffer.isView(gfxdata.source) || Array.isArray(gfxdata.source))) {
                    gfxdata$s = gfxdata.source;
                    gfxdata$o = gfxdata.offset;
                }
                let transmask = (((__L5 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_zoom_sprite(runtime, gfx), color, 31)) >>> 0);
                let coloroffs = ((__add_zoom_sprite(runtime, (__L6 ?? runtime.memberCall(gfx, "colorbase", 0, __L7))(), ((color) * ((__L8 ?? runtime.memberCall(gfx, "granularity", 0, __L9))())))) | 0);
                let offsxor = ((((flipx) ? (((big) ? (31) : (15))) : (0))) | 0);
                for (let y = ((0) | 0); (((y) <= (sizey)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let yy = ((((((sy) + (y))) & (511))) | 0);
                    if (((((((yy) >= (16)) ? 1 : 0)) && ((((yy) < (240)) ? 1 : 0))) ? 1 : 0)) {
                        let dy = ((((runtime.readIndex(h_m_scalelut_region, ((((y) << (6))) + (sizey)))) & (31))) | 0);
                        let xx = ((((sx) & (1023))) | 0);
                        let siz = ((0) | 0);
                        let offs = ((0) | 0);
                        if (((big) ? 0 : 1)) {
                            dy = ((((dy) >> (1))) | 0);
                        }
                        let src = __addr_zoom_sprite(runtime, gfxdata, ((dy) * ((__L10 ?? runtime.memberCall(gfx, "rowbytes", 0, __L11))())));
                        let src$s = undefined, src$o = 0;
                        if (ArrayBuffer.isView(src) || Array.isArray(src))
                            src$s = src;
                        else if (src !== null && typeof src === 'object' && src.generatedPointer === true && src.path === undefined && src.target === undefined && (ArrayBuffer.isView(src.source) || Array.isArray(src.source))) {
                            src$s = src.source;
                            src$o = src.offset;
                        }
                        for (let x = ((((big) ? (64) : (32))) | 0); (((x) > (0)) ? 1 : 0); x = ((((x) - (1))) | 0)) {
                            if ((((xx) < (256)) ? 1 : 0)) {
                                let pen = (((src$s !== undefined ? (src$s[src$o + (((runtime.divide(offs, 2)) ^ (offsxor)))] ?? 0) : runtime.readIndex(src, ((runtime.divide(offs, 2)) ^ (offsxor))))) | 0);
                                if (((((((transmask) >>> (pen))) & (1))) ? 0 : 1)) {
                                    bitmap["pix="](yy, xx, ((pen) + (coloroffs)));
                                }
                            }
                            offs = ((((offs) + (1))) | 0);
                            siz = ((((((siz) + (1))) + (sizex))) | 0);
                            if (((siz) & (64))) {
                                siz = ((((siz) & (63))) | 0);
                                xx = ((((((xx) + (1))) & (1023))) | 0);
                            }
                        }
                    }
                }
            }
            function __add_zoom_sprite(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_zoom_sprite(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_zoom_sprite(runtime, p) {
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
            function method_vblank(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, ((state) ? (0) : (1)));
            }
            function method_K_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return ((h_m_latched_cmd) & (15));
            }
            function method_SI_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_si"];
                return (((__L0 ? __L0(0) : runtime.macro("m_si", 0))) ? (1) : (0));
            }
            function method_R0_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_romread"];
                return (((__L0 ? __L0((members.m_address ?? runtime.member("m_address"))) : runtime.macro("m_romread", (members.m_address ?? runtime.member("m_address"))))) & (15));
            }
            function method_R1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_romread"];
                return runtime.shiftRight((__L0 ? __L0((members.m_address ?? runtime.member("m_address"))) : runtime.macro("m_romread", (members.m_address ?? runtime.member("m_address")))), 4);
            }
            function method_auto_start_r(runtime) {
                const members = runtime.members;
                return (members.m_auto_start_mask ?? runtime.member("m_auto_start_mask"));
            }
            function method_polepos_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"], __L4 = __l["palette.set_pen_indirect"], __L5 = __l["set_pen_indirect"];
                let __t0;
                let color_prom = (__t0 = __deref_polepos_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let color_prom$s = undefined, color_prom$o = 0;
                if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom))
                    color_prom$s = color_prom;
                else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) {
                    color_prom$s = color_prom.source;
                    color_prom$o = color_prom.offset;
                }
                for (let i = ((0) | 0); (((i) < (128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    let bit3 = ((0) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((0) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((0) + (i))))) >>> (0)) & 1)) | 0);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((0) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((0) + (i))))) >>> (1)) & 1)) | 0);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((0) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((0) + (i))))) >>> (2)) & 1)) | 0);
                    bit3 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((0) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((0) + (i))))) >>> (3)) & 1)) | 0);
                    let r = ((__add_polepos_palette(runtime, __add_polepos_palette(runtime, __add_polepos_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((256) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((256) + (i))))) >>> (0)) & 1)) | 0);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((256) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((256) + (i))))) >>> (1)) & 1)) | 0);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((256) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((256) + (i))))) >>> (2)) & 1)) | 0);
                    bit3 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((256) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((256) + (i))))) >>> (3)) & 1)) | 0);
                    let g = ((__add_polepos_palette(runtime, __add_polepos_palette(runtime, __add_polepos_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((512) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((512) + (i))))) >>> (0)) & 1)) | 0);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((512) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((512) + (i))))) >>> (1)) & 1)) | 0);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((512) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((512) + (i))))) >>> (2)) & 1)) | 0);
                    bit3 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((512) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((512) + (i))))) >>> (3)) & 1)) | 0);
                    let b = ((__add_polepos_palette(runtime, __add_polepos_palette(runtime, __add_polepos_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let color = (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((768) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((768) + (i))))) | 0);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((0) + (i)), (((((color) !== (15)) ? 1 : 0)) ? (((32) + (color))) : (47)));
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((256) + (i)), (((((color) !== (15)) ? 1 : 0)) ? (((96) + (color))) : (47)));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let color = (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((1024) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((1024) + (i))))) | 0);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((512) + (i)), ((0) + (color)));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(1024)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let color = (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((3072) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((3072) + (i))))) | 0);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((768) + (i)), (((((color) !== (15)) ? 1 : 0)) ? (((16) + (color))) : (31)));
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((1792) + (i)), (((((color) !== (15)) ? 1 : 0)) ? (((80) + (color))) : (31)));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(1024)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let color = (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((2048) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((2048) + (i))))) | 0);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((2816) + (i)), ((64) + (color)));
                }
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let j = ((__add_polepos_palette(runtime, __add_polepos_palette(runtime, (color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((1280) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((1280) + (i)))), (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((1536) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((1536) + (i))))) << (4))), (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((1792) + (i)))] ?? 0) : runtime.readIndex(color_prom, ((1792) + (i))))) << (8)))) | 0);
                    runtime.writeIndex(runtime.writableMember("m_vertical_position_modifier"), i, j);
                }
            }
            function __add_polepos_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_polepos_palette(runtime, p) {
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
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "sprite_r": method_sprite_r,
                "sprite_w": method_sprite_w,
                "road_r": method_road_r,
                "road_w": method_road_w,
                "alpha_r": method_alpha_r,
                "alpha_w": method_alpha_w,
                "view_r": method_view_r,
                "view_w": method_view_w,
                "data_w": method_data_w,
                "ctrl_r": method_ctrl_r,
                "ready_r": method_ready_r,
                "alpha16_w": method_alpha16_w,
                "view16_w": method_view16_w,
                "view16_hscroll_w": method_view16_hscroll_w,
                "road16_vscroll_w": method_road16_vscroll_w,
                "bg_get_tile_info": method_bg_get_tile_info,
                "tx_get_tile_info": method_tx_get_tile_info,
                "namco_52xx_rom_r": method_namco_52xx_rom_r,
                "namco_52xx_si_r": method_namco_52xx_si_r,
                "namco_53xx_k_r": method_namco_53xx_k_r,
                "steering_changed_r": method_steering_changed_r,
                "steering_delta_r": method_steering_delta_r,
                "chip_select": method_chip_select,
                "rw": method_rw,
                "reset": method_reset,
                "clson_w": method_clson_w,
                "polepos_engine_sound_lsb_w": method_polepos_engine_sound_lsb_w,
                "polepos_engine_sound_msb_w": method_polepos_engine_sound_msb_w,
                "gasel_w": method_gasel_w,
                "sb0_w": method_sb0_w,
                "chacl_w": method_chacl_w,
                "analog_r": method_analog_r,
                "screen_update": method_screen_update,
                "draw_road": method_draw_road,
                "draw_sprites": method_draw_sprites,
                "zoom_sprite": method_zoom_sprite,
                "vblank": method_vblank,
                "K_r": method_K_r,
                "SI_r": method_SI_r,
                "R0_r": method_R0_r,
                "R1_r": method_R1_r,
                "auto_start_r": method_auto_start_r,
                "polepos_palette": method_polepos_palette
            };
            return __methodTable;
        })();
        return {
            "polepos_state.sprite_r": methods["sprite_r"],
            "polepos_state.sprite_w": methods["sprite_w"],
            "polepos_state.road_r": methods["road_r"],
            "polepos_state.road_w": methods["road_w"],
            "polepos_state.alpha_r": methods["alpha_r"],
            "polepos_state.alpha_w": methods["alpha_w"],
            "polepos_state.view_r": methods["view_r"],
            "polepos_state.view_w": methods["view_w"],
            "polepos_state.ready_r": methods["ready_r"],
            "polepos_state.alpha16_w": methods["alpha16_w"],
            "polepos_state.view16_w": methods["view16_w"],
            "polepos_state.view16_hscroll_w": methods["view16_hscroll_w"],
            "polepos_state.road16_vscroll_w": methods["road16_vscroll_w"],
            "polepos_state.bg_get_tile_info": methods["bg_get_tile_info"],
            "polepos_state.tx_get_tile_info": methods["tx_get_tile_info"],
            "polepos_state.namco_52xx_rom_r": methods["namco_52xx_rom_r"],
            "polepos_state.namco_52xx_si_r": methods["namco_52xx_si_r"],
            "polepos_state.namco_53xx_k_r": methods["namco_53xx_k_r"],
            "polepos_state.steering_changed_r": methods["steering_changed_r"],
            "polepos_state.steering_delta_r": methods["steering_delta_r"],
            "polepos_state.gasel_w": methods["gasel_w"],
            "polepos_state.sb0_w": methods["sb0_w"],
            "polepos_state.chacl_w": methods["chacl_w"],
            "polepos_state.analog_r": methods["analog_r"],
            "polepos_state.screen_update": methods["screen_update"],
            "polepos_state.draw_road": methods["draw_road"],
            "polepos_state.draw_sprites": methods["draw_sprites"],
            "polepos_state.zoom_sprite": methods["zoom_sprite"],
            "polepos_state.auto_start_r": methods["auto_start_r"],
            "polepos_state.polepos_palette": methods["polepos_palette"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["colorbase", "draw", "draw_scanline16", "elements", "get_data", "gfx.colorbase", "gfx.elements", "gfx.get_data", "gfx.granularity", "gfx.rowbytes", "granularity", "m_adc.intr_r", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_cpu.set_input_line", "m_gfxdecode.gfx", "m_palette.transpen_mask", "m_romread", "m_screen.vpos", "m_si", "m_steer_io.read", "m_stream.update", "m_tx_tilemap.draw", "m_tx_tilemap.mark_all_dirty", "m_tx_tilemap.mark_tile_dirty", "machine", "machine().side_effects_disabled", "mark_all_dirty", "mark_tile_dirty", "memregion", "palette.set_indirect_color", "palette.set_pen_indirect", "read", "rgb_t", "rowbytes", "set", "set_indirect_color", "set_pen_indirect", "set_scrollx", "tileinfo.set", "update"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
