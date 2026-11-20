// GENERATED executable machine composition from src/mame/atari/gauntlet.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gauntlet');
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
            function method_video_int_ack_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                data = ((data) & 0xffff);
                (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(4, 0);
            }
            function method_yscroll_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_playfield_tilemap.mark_all_dirty"], __L3 = __l["m_playfield_tilemap.set_scrolly"], __L4 = __l["m_mob.set_yscroll"];
                let __t0, __t1;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                const h_m_yscroll = members.m_yscroll ?? runtime.member("m_yscroll");
                let oldyscroll = ((__deref_yscroll_w(runtime, h_m_yscroll)) & 0xffff);
                runtime.combineData(h_m_yscroll, data, mem_mask);
                if (((Number(__deref_yscroll_w(runtime, h_m_yscroll)) !== Number(oldyscroll)) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                    if (((Number((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) !== Number(((__deref_yscroll_w(runtime, h_m_yscroll)) & (3)))) ? 1 : 0)) {
                        members.m_playfield_tile_bank = ((((__deref_yscroll_w(runtime, h_m_yscroll)) & (3))) & 0xff);
                        (__L2 ?? runtime.memberCall(members.m_playfield_tilemap, "mark_all_dirty", 0, undefined))();
                    }
                    (__L3 ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrolly", 0, undefined))(0, runtime.shiftRight(__deref_yscroll_w(runtime, h_m_yscroll), 7));
                    (__L4 ?? runtime.memberCall(members.m_mob, "set_yscroll", 0, undefined))(((runtime.shiftRight(__deref_yscroll_w(runtime, h_m_yscroll), 7)) & (511)));
                }
            }
            function __deref_yscroll_w(runtime, p) {
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
            function method_xscroll_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_playfield_tilemap.set_scrollx"], __L3 = __l["m_mob.set_xscroll"];
                let __t0;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                const h_m_xscroll = members.m_xscroll ?? runtime.member("m_xscroll");
                let oldxscroll = ((__deref_xscroll_w(runtime, h_m_xscroll)) & 0xffff);
                runtime.combineData(h_m_xscroll, data, mem_mask);
                if (((Number(__deref_xscroll_w(runtime, h_m_xscroll)) !== Number(oldxscroll)) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                    (__L2 ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrollx", 0, undefined))(0, __deref_xscroll_w(runtime, h_m_xscroll));
                    (__L3 ?? runtime.memberCall(members.m_mob, "set_xscroll", 0, undefined))(((__deref_xscroll_w(runtime, h_m_xscroll)) & (511)));
                }
            }
            function __deref_xscroll_w(runtime, p) {
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
            function method_mixer_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ym2151.set_output_gain"], __L1 = __l["m_pokey.set_output_gain"], __L2 = __l["m_tms5220.set_output_gain"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_ym2151, "set_output_gain", 0, undefined))(65535, ((((data) & (7))) / (7)));
                (__L1 ?? runtime.memberCall(members.m_pokey, "set_output_gain", 0, undefined))(65535, ((((((data) >>> (3))) & (3))) / (3)));
                (__L2 ?? runtime.memberCall(members.m_tms5220, "set_output_gain", 0, undefined))(65535, ((((((data) >>> (5))) & (7))) / (7)));
            }
            function method_switch_6502_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_soundlatch.pending_r"], __L1 = __l["m_mainlatch.pending_r"], __L2 = __l["m_tms5220.readyq_r"], __L3 = __l["m_803008.read"], __L4 = __l["read"];
                let __t0, __t1, __t2, __t3;
                let temp = ((48) | 0);
                if ((__L0 ?? runtime.memberCall(members.m_soundlatch, "pending_r", 0, undefined))()) {
                    temp = ((((temp) ^ (128))) | 0);
                }
                if ((__L1 ?? runtime.memberCall(members.m_mainlatch, "pending_r", 0, undefined))()) {
                    temp = ((((temp) ^ (64))) | 0);
                }
                if ((((__L2 ?? runtime.memberCall(members.m_tms5220, "readyq_r", 0, undefined))()) ? 0 : 1)) {
                    temp = ((((temp) ^ (32))) | 0);
                }
                if (((((~(__L3 ?? runtime.memberCall(members.m_803008, "read", 0, __L4))())) >>> (3)) & 1)) {
                    temp = ((((temp) ^ (16))) | 0);
                }
                return temp;
            }
            function method_sound_irq_ack_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_audiocpu.set_input_line"];
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__L2 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 0);
                }
                return 255;
            }
            function method_sound_irq_ack_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.set_input_line"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 0);
            }
            function method_sound_reset_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.set_input_line"], __L1 = __l["m_soundctl.clear_w"], __L2 = __l["m_mainlatch.acknowledge_w"];
                let __t0;
                (__L0 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
                (__L1 ?? runtime.memberCall(members.m_soundctl, "clear_w", 0, undefined))(state);
                if (((state) ? 0 : 1)) {
                    (__L2 ?? runtime.memberCall(members.m_mainlatch, "acknowledge_w", 0, undefined))();
                    (runtime.overrides["mixer_w"] ? runtime.overrides["mixer_w"](0) : method_mixer_w(runtime, 0));
                }
            }
            function method_scanline_update(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.set_input_line"];
                if (((param) & (32))) {
                    (__L0 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 1);
                }
            }
            function method_get_playfield_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_playfield_tilemap.basemem_read"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let data = (((__L0 ?? runtime.memberCall(members.m_playfield_tilemap, "basemem_read", 0, undefined))(tile_index)) & 0xffff);
                let code = ((((__add_get_playfield_tile_info(runtime, (((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) * (4096)), ((data) & (4095)))) ^ (2048))) | 0);
                let color = ((__add_get_playfield_tile_info(runtime, __add_get_playfield_tile_info(runtime, 16, (((members.m_playfield_color_bank ?? runtime.member("m_playfield_color_bank"))) * (8))), ((((data) >>> (12))) & (7)))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, code, color, ((((data) >>> (15))) & (1)));
            }
            function __add_get_playfield_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_get_alpha_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_alpha_tilemap.basemem_read"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let data = (((__L0 ?? runtime.memberCall(members.m_alpha_tilemap, "basemem_read", 0, undefined))(tile_index)) & 0xffff);
                let code = ((((data) & (1023))) | 0);
                let color = ((((((((data) >>> (10))) & (15))) | (((((data) >>> (9))) & (32))))) | 0);
                let opaque = ((((data) & (32768))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(1, code, color, ((opaque) ? (16) : (0)));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mob.draw_async"], __L1 = __l["m_playfield_tilemap.draw"], __L2 = __l["m_mob.bitmap"], __L3 = __l["m_mob.iterate_dirty_rects"], __L4 = __l["m_alpha_tilemap.draw"];
                let __t0, __t1, __t2, __t3, __t4;
                const h_m_vindctr2_screen_refresh = members.m_vindctr2_screen_refresh ?? runtime.member("m_vindctr2_screen_refresh");
                (__L0 ?? runtime.memberCall(members.m_mob, "draw_async", 0, undefined))(cliprect);
                (__L1 ?? runtime.memberCall(members.m_playfield_tilemap, "draw", 0, undefined))(screen, bitmap, cliprect, 0, 0);
                let mobitmap = (__L2 ?? runtime.memberCall(members.m_mob, "bitmap", 0, undefined))();
                (__L3 ?? runtime.memberCall(members.m_mob, "iterate_dirty_rects", 0, undefined))(cliprect, ((rect) => {
                    for (let y = (((__l["rect.top"] ?? runtime.memberCall(rect, "top", 0, __l["top"]))()) | 0); ((Number(y) <= Number((__l["rect.bottom"] ?? runtime.memberCall(rect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        let mo = mobitmap["pix&"](y);
                        let pf = bitmap["pix&"](y);
                        for (let x = (((__l["rect.left"] ?? runtime.memberCall(rect, "left", 0, __l["left"]))()) | 0); ((Number(x) <= Number((__l["rect.right"] ?? runtime.memberCall(rect, "right", 0, __l["right"]))())) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            if (((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) {
                                if (((Number(((runtime.readIndex(mo, x)) & (15))) === Number(1)) ? 1 : 0)) {
                                    if ((((((h_m_vindctr2_screen_refresh) ? 0 : 1)) || (((Number(((runtime.readIndex(mo, x)) & (240))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                                        runtime.writeIndex(pf, x, ((runtime.readIndex(pf, x)) ^ (128)));
                                    }
                                }
                                else {
                                    runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
                                }
                            }
                        }
                    }
                }));
                (__L4 ?? runtime.memberCall(members.m_alpha_tilemap, "draw", 0, undefined))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function method_speech_squeak_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tms5220.set_unscaled_clock"];
                let data = ((((5) | (((state) ? (2) : (0))))) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_tms5220, "set_unscaled_clock", 0, undefined))(runtime.divide(runtime.divide(14318181, 2), ((16) - (data))));
            }
            function method_compute_log(runtime, value) {
                const members = runtime.members;
                let log = ((0) | 0);
                if ((((value) === (0)) ? 1 : 0)) {
                    return -1;
                }
                while (((((value) & (1))) ? 0 : 1)) {
                    log = ((((log) + (1))) | 0);
                    value = ((((value) >> (1))) | 0);
                }
                if ((((value) !== (1)) ? 1 : 0)) {
                    return -1;
                }
                return log;
            }
            function method_round_to_powerof2(runtime, value) {
                const members = runtime.members;
                let log = ((0) | 0);
                if ((((value) === (0)) ? 1 : 0)) {
                    return 1;
                }
                while (((Number((value = ((((value) >> (1))) | 0))) !== Number(0)) ? 1 : 0)) {
                    log = ((((log) + (1))) | 0);
                }
                return ((1) << (((log) + (1))));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "video_int_ack_w": method_video_int_ack_w,
                "yscroll_w": method_yscroll_w,
                "xscroll_w": method_xscroll_w,
                "mixer_w": method_mixer_w,
                "switch_6502_r": method_switch_6502_r,
                "sound_irq_ack_r": method_sound_irq_ack_r,
                "sound_irq_ack_w": method_sound_irq_ack_w,
                "sound_reset_w": method_sound_reset_w,
                "scanline_update": method_scanline_update,
                "get_playfield_tile_info": method_get_playfield_tile_info,
                "get_alpha_tile_info": method_get_alpha_tile_info,
                "screen_update": method_screen_update,
                "speech_squeak_w": method_speech_squeak_w,
                "compute_log": method_compute_log,
                "round_to_powerof2": method_round_to_powerof2
            };
            return __methodTable;
        })();
        return {
            "gauntlet_state.video_int_ack_w": methods["video_int_ack_w"],
            "gauntlet_state.yscroll_w": methods["yscroll_w"],
            "gauntlet_state.xscroll_w": methods["xscroll_w"],
            "gauntlet_state.mixer_w": methods["mixer_w"],
            "gauntlet_state.switch_6502_r": methods["switch_6502_r"],
            "gauntlet_state.sound_irq_ack_r": methods["sound_irq_ack_r"],
            "gauntlet_state.sound_irq_ack_w": methods["sound_irq_ack_w"],
            "gauntlet_state.sound_reset_w": methods["sound_reset_w"],
            "gauntlet_state.scanline_update": methods["scanline_update"],
            "gauntlet_state.get_playfield_tile_info": methods["get_playfield_tile_info"],
            "gauntlet_state.get_alpha_tile_info": methods["get_alpha_tile_info"],
            "gauntlet_state.screen_update": methods["screen_update"],
            "gauntlet_state.speech_squeak_w": methods["speech_squeak_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bottom", "left", "m_803008.read", "m_alpha_tilemap.basemem_read", "m_alpha_tilemap.draw", "m_audiocpu.set_input_line", "m_maincpu.set_input_line", "m_mainlatch.acknowledge_w", "m_mainlatch.pending_r", "m_mob.bitmap", "m_mob.draw_async", "m_mob.iterate_dirty_rects", "m_mob.set_xscroll", "m_mob.set_yscroll", "m_playfield_tilemap.basemem_read", "m_playfield_tilemap.draw", "m_playfield_tilemap.mark_all_dirty", "m_playfield_tilemap.set_scrollx", "m_playfield_tilemap.set_scrolly", "m_pokey.set_output_gain", "m_screen.update_partial", "m_screen.vpos", "m_soundctl.clear_w", "m_soundlatch.pending_r", "m_tms5220.readyq_r", "m_tms5220.set_output_gain", "m_tms5220.set_unscaled_clock", "m_ym2151.set_output_gain", "machine", "machine().side_effects_disabled", "read", "rect.bottom", "rect.left", "rect.right", "rect.top", "right", "set", "tileinfo.set", "top"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
