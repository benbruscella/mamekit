// GENERATED executable machine composition from src/mame/bally/mcr3.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'spyhunt');
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
            function method_spyhunt_ip1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"], __L1 = __l["m_cheap_squeak_deluxe.stat_r"];
                let __t0, __t1;
                return (((__t0 = __deref_spyhunt_ip1_r(runtime, (__L0 ? __L0("ssio:IP1") : runtime.macro("ioport", "ssio:IP1"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("ssio:IP1") : runtime.macro("ioport", "ssio:IP1")), "read"))) | ((((__L1 ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "stat_r", 0, undefined))()) << (5))));
            }
            function __deref_spyhunt_ip1_r(runtime, p) {
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
            function method_stat_r(runtime) {
                const members = runtime.members;
                return (members.m_status ?? runtime.member("m_status"));
            }
            function method_sirq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_pia_sync_timer.adjust"], __L1 = __l["adjust"];
                (__L0 ?? runtime.memberCall(members.m_pia_sync_timer, "adjust", 0, __L1))(0, ((state) ? 0 : 1));
            }
            function method_mcr_paletteram9_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
            }
            function method_mcr_set_color(runtime, index, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["pal3bit"], __L1 = __l["m_palette.set_pen_color"];
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__L0 ? __L0(runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__L0 ? __L0(runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__L0 ? __L0(runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_spyhunt_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_spyhunt_alpharam_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_alpha_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_spyhunt_alpharam"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_alpha_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_spyhunt_scroll_value_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                switch (offset) {
                    case 0:
                        {
                            members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (-256))) | (data))) << 16 >> 16);
                            break;
                        }
                    case 1:
                        {
                            members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (255))) | (((((data) & (7))) << (8))))) << 16 >> 16);
                            members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (255))) | (((((data) & (128))) << (1))))) << 16 >> 16);
                            break;
                        }
                    case 2:
                        {
                            members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (-256))) | (data))) << 16 >> 16);
                            break;
                        }
                }
            }
            function method_data_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
            }
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("synced_write", ((((offset) << (8))) | (((data) & (255)))));
            }
            function method_mcr_interrupt(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctc.trg2"], __L1 = __l["m_ctc.trg3"];
                let scanline = ((param) | 0);
                if (((((((scanline) === (0)) ? 1 : 0)) || ((((scanline) === (240)) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_ctc, "trg2", 0, undefined))(1);
                    (__L0 ?? runtime.memberCall(members.m_ctc, "trg2", 0, undefined))(0);
                }
                if ((((scanline) === (0)) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_ctc, "trg3", 0, undefined))(1);
                    (__L1 ?? runtime.memberCall(members.m_ctc, "trg3", 0, undefined))(0);
                }
            }
            function method_spyhunt_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
                let code = ((((((data) & (63))) | (((runtime.shiftRight(data, 1)) & (64))))) | 0);
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, 0, ((((data) & (64))) ? (2) : (0)));
            }
            function method_spyhunt_bg_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return ((((((row) & (15))) | (((((col) & (63))) << (4))))) | (((((row) & (16))) << (6))));
            }
            function method_spyhunt_get_alpha_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(2, runtime.readIndex((members.m_spyhunt_alpharam ?? runtime.member("m_spyhunt_alpharam")), tile_index), 0, 0);
            }
            function method_screen_update_spyhunt(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"], __L2 = __l["m_bg_tilemap.set_scrolly"], __L3 = __l["set_scrolly"], __L4 = __l["m_bg_tilemap.draw"], __L5 = __l["draw"], __L6 = __l["m_alpha_tilemap.draw"];
                const h_m_spyhunt_scroll_offset = members.m_spyhunt_scroll_offset ?? runtime.member("m_spyhunt_scroll_offset");
                const h_m_spyhunt_sprite_color_mask = members.m_spyhunt_sprite_color_mask ?? runtime.member("m_spyhunt_sprite_color_mask");
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, __add_screen_update_spyhunt(runtime, (((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) * (2)), h_m_spyhunt_scroll_offset));
                (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(0, (((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) * (2)));
                (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["mcr3_update_sprites"] ? runtime.overrides["mcr3_update_sprites"](screen, bitmap, cliprect, h_m_spyhunt_sprite_color_mask, 0, -12, 0, 1) : method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, h_m_spyhunt_sprite_color_mask, 0, -12, 0, 1));
                (__L6 ?? runtime.memberCall(members.m_alpha_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function __add_screen_update_spyhunt(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, color_mask, code_xor, dx, dy, interlaced) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.priority"], __L1 = __l["screen.priority"], __L2 = __l["priority"], __L3 = __l["m_gfxdecode.gfx"];
                let __t0, __t1, __t2, __t3, __t4;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                runtime.memberCall((__L0 ?? runtime.memberCall(members.m_screen, "priority", 0, undefined))(), "fill", 0, undefined)(1, cliprect);
                for (let offs = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    if (((Number(runtime.readIndex(h_m_spriteram, offs)) === Number(0)) ? 1 : 0)) {
                        continue;
                    }
                    let flags = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
                    let code = ((__add_mcr3_update_sprites(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((256) * (((runtime.shiftRight(flags, 3)) & (1)))))) | 0);
                    let color = (((((~flags)) & (color_mask))) | 0);
                    let flipx = ((((flags) & (16))) | 0);
                    let flipy = ((((flags) & (32))) | 0);
                    let sx = ((((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) - (3))) * (2))) | 0);
                    let sy = ((((241) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
                    if ((((interlaced) === (1)) ? 1 : 0)) {
                        sy = ((((sy) * (2))) | 0);
                    }
                    code = ((((code) ^ (code_xor))) | 0);
                    sx = ((((sx) + (dx))) | 0);
                    sy = ((((sy) + (dy))) | 0);
                    if ((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? 0 : 1)) {
                        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 0, 257);
                        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 2, 65279);
                    }
                    else {
                        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 0, 257);
                        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 2, 65279);
                    }
                }
            }
            function __add_mcr3_update_sprites(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_spyhunt_ip2_r(runtime) {
                const members = runtime.members;
                let __t0;
                const h_m_analog_inputs = members.m_analog_inputs ?? runtime.member("m_analog_inputs");
                return (__t0 = __deref_spyhunt_ip2_r(runtime, runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux")))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))), "read"));
            }
            function __deref_spyhunt_ip2_r(runtime, p) {
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
            function method_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_pia.irq_a_state"], __L1 = __l["m_pia.irq_b_state"], __L2 = __l["m_cpu.set_input_line"];
                let __t0, __t1;
                let combined_state = (((((__L0 ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__L1 ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
                (__L2 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
            }
            function method_compute_ay8910_modulation(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"];
                let __t0;
                let prom = (__t0 = __deref_compute_ay8910_modulation(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let prom$s = undefined, prom$o = 0;
                if (ArrayBuffer.isView(prom) || Array.isArray(prom))
                    prom$s = prom;
                else if (prom !== null && typeof prom === 'object' && prom.generatedPointer === true && prom.path === undefined && prom.target === undefined && (ArrayBuffer.isView(prom.source) || Array.isArray(prom.source))) {
                    prom$s = prom.source;
                    prom$o = prom.offset;
                }
                for (let volval = ((0) | 0); (((volval) < (16)) ? 1 : 0); volval = ((((volval) + (1))) | 0)) {
                    let remaining_clocks = ((volval) | 0);
                    let cur = ((0) | 0);
                    let prev = ((1) | 0);
                    let curclock = ((0) | 0);
                    for (curclock = ((0) | 0); ((((((curclock) < (160)) ? 1 : 0)) && (remaining_clocks)) ? 1 : 0); curclock = ((((curclock) + (1))) | 0)) {
                        cur = (((((prom$s !== undefined ? (prom$s[prom$o + (runtime.divide(curclock, 8))] ?? 0) : runtime.readIndex(prom, runtime.divide(curclock, 8)))) & (runtime.shiftRight(128, ((curclock) % (8)))))) | 0);
                        if (((((((cur) === (0)) ? 1 : 0)) && ((((prev) !== (0)) ? 1 : 0))) ? 1 : 0)) {
                            remaining_clocks = ((((remaining_clocks) - (1))) | 0);
                        }
                        prev = ((cur) | 0);
                    }
                    runtime.writeIndex(runtime.writableMember("m_ayvolume_lookup"), ((15) - (volval)), ((curclock) / (160)));
                }
            }
            function __deref_compute_ay8910_modulation(runtime, p) {
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
                "spyhunt_ip1_r": method_spyhunt_ip1_r,
                "stat_r": method_stat_r,
                "sirq_w": method_sirq_w,
                "mcr_paletteram9_w": method_mcr_paletteram9_w,
                "mcr_set_color": method_mcr_set_color,
                "mcr3_videoram_w": method_mcr3_videoram_w,
                "spyhunt_videoram_w": method_spyhunt_videoram_w,
                "spyhunt_alpharam_w": method_spyhunt_alpharam_w,
                "spyhunt_scroll_value_w": method_spyhunt_scroll_value_w,
                "data_r": method_data_r,
                "write": method_write,
                "mcr_interrupt": method_mcr_interrupt,
                "spyhunt_get_bg_tile_info": method_spyhunt_get_bg_tile_info,
                "spyhunt_bg_scan": method_spyhunt_bg_scan,
                "spyhunt_get_alpha_tile_info": method_spyhunt_get_alpha_tile_info,
                "screen_update_spyhunt": method_screen_update_spyhunt,
                "mcr3_update_sprites": method_mcr3_update_sprites,
                "spyhunt_ip2_r": method_spyhunt_ip2_r,
                "irq_w": method_irq_w,
                "compute_ay8910_modulation": method_compute_ay8910_modulation
            };
            return __methodTable;
        })();
        return {
            "mcr3_state.mcr_paletteram9_w": methods["mcr_paletteram9_w"],
            "mcr3_state.mcr3_videoram_w": methods["mcr3_videoram_w"],
            "mcr3_state.spyhunt_videoram_w": methods["spyhunt_videoram_w"],
            "mcr3_state.spyhunt_alpharam_w": methods["spyhunt_alpharam_w"],
            "mcr3_state.spyhunt_scroll_value_w": methods["spyhunt_scroll_value_w"],
            "mcr3_state.mcr_interrupt": methods["mcr_interrupt"],
            "mcr3_state.spyhunt_get_bg_tile_info": methods["spyhunt_get_bg_tile_info"],
            "mcr3_state.spyhunt_bg_scan": methods["spyhunt_bg_scan"],
            "mcr3_state.spyhunt_get_alpha_tile_info": methods["spyhunt_get_alpha_tile_info"],
            "mcr3_state.screen_update_spyhunt": methods["screen_update_spyhunt"],
            "mcr3_state.mcr3_update_sprites": methods["mcr3_update_sprites"],
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
            function method_spyhunt_ip1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"], __L1 = __l["m_cheap_squeak_deluxe.stat_r"];
                let __t0, __t1;
                return (((__t0 = __deref_spyhunt_ip1_r(runtime, (__L0 ? __L0("ssio:IP1") : runtime.macro("ioport", "ssio:IP1"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("ssio:IP1") : runtime.macro("ioport", "ssio:IP1")), "read"))) | ((((__L1 ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "stat_r", 0, undefined))()) << (5))));
            }
            function __deref_spyhunt_ip1_r(runtime, p) {
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
            function method_stat_r(runtime) {
                const members = runtime.members;
                return (members.m_status ?? runtime.member("m_status"));
            }
            function method_spyhunt_op4_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_adc.rd_w"], __L1 = __l["m_adc.wr_w"], __L2 = __l["m_lamplatch.write_bit"], __L3 = __l["m_cheap_squeak_deluxe.sr_w"], __L4 = __l["m_cheap_squeak_deluxe.sirq_w"];
                data = ((data) & 0xff);
                members.m_input_mux = (((((data) >>> (7)) & 1)) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_adc, "rd_w", 0, undefined))((((data) >>> (6)) & 1));
                (__L1 ?? runtime.memberCall(members.m_adc, "wr_w", 0, undefined))((((data) >>> (6)) & 1));
                if (((((((((members.m_last_op4 ?? runtime.member("m_last_op4"))) ^ (data))) & (32))) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) {
                    (__L2 ?? runtime.memberCall(members.m_lamplatch, "write_bit", 0, undefined))(((data) & (7)), (((data) >>> (3)) & 1));
                }
                members.m_last_op4 = ((data) & 0xff);
                (__L3 ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "sr_w", 0, undefined))(((data) & (15)));
                (__L4 ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "sirq_w", 0, undefined))((((data) >>> (4)) & 1));
            }
            function method_sirq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_pia_sync_timer.adjust"], __L1 = __l["adjust"];
                (__L0 ?? runtime.memberCall(members.m_pia_sync_timer, "adjust", 0, __L1))(0, ((state) ? 0 : 1));
            }
            function method_mcr_paletteram9_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
            }
            function method_mcr_set_color(runtime, index, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["pal3bit"], __L1 = __l["m_palette.set_pen_color"];
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__L0 ? __L0(runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__L0 ? __L0(runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__L0 ? __L0(runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_spyhunt_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_spyhunt_alpharam_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_alpha_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_spyhunt_alpharam"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_alpha_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_spyhunt_scroll_value_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                switch (offset) {
                    case 0:
                        {
                            members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (-256))) | (data))) << 16 >> 16);
                            break;
                        }
                    case 1:
                        {
                            members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (255))) | (((((data) & (7))) << (8))))) << 16 >> 16);
                            members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (255))) | (((((data) & (128))) << (1))))) << 16 >> 16);
                            break;
                        }
                    case 2:
                        {
                            members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (-256))) | (data))) << 16 >> 16);
                            break;
                        }
                }
            }
            function method_data_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
            }
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("synced_write", ((((offset) << (8))) | (((data) & (255)))));
            }
            function method_spyhunt_ip2_r(runtime) {
                const members = runtime.members;
                let __t0;
                const h_m_analog_inputs = members.m_analog_inputs ?? runtime.member("m_analog_inputs");
                return (__t0 = __deref_spyhunt_ip2_r(runtime, runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux")))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))), "read"));
            }
            function __deref_spyhunt_ip2_r(runtime, p) {
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
            function method_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_pia.irq_a_state"], __L1 = __l["m_pia.irq_b_state"], __L2 = __l["m_cpu.set_input_line"];
                let __t0, __t1;
                let combined_state = (((((__L0 ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__L1 ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
                (__L2 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
            }
            function method_compute_ay8910_modulation(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"];
                let __t0;
                let prom = (__t0 = __deref_compute_ay8910_modulation(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let prom$s = undefined, prom$o = 0;
                if (ArrayBuffer.isView(prom) || Array.isArray(prom))
                    prom$s = prom;
                else if (prom !== null && typeof prom === 'object' && prom.generatedPointer === true && prom.path === undefined && prom.target === undefined && (ArrayBuffer.isView(prom.source) || Array.isArray(prom.source))) {
                    prom$s = prom.source;
                    prom$o = prom.offset;
                }
                for (let volval = ((0) | 0); (((volval) < (16)) ? 1 : 0); volval = ((((volval) + (1))) | 0)) {
                    let remaining_clocks = ((volval) | 0);
                    let cur = ((0) | 0);
                    let prev = ((1) | 0);
                    let curclock = ((0) | 0);
                    for (curclock = ((0) | 0); ((((((curclock) < (160)) ? 1 : 0)) && (remaining_clocks)) ? 1 : 0); curclock = ((((curclock) + (1))) | 0)) {
                        cur = (((((prom$s !== undefined ? (prom$s[prom$o + (runtime.divide(curclock, 8))] ?? 0) : runtime.readIndex(prom, runtime.divide(curclock, 8)))) & (runtime.shiftRight(128, ((curclock) % (8)))))) | 0);
                        if (((((((cur) === (0)) ? 1 : 0)) && ((((prev) !== (0)) ? 1 : 0))) ? 1 : 0)) {
                            remaining_clocks = ((((remaining_clocks) - (1))) | 0);
                        }
                        prev = ((cur) | 0);
                    }
                    runtime.writeIndex(runtime.writableMember("m_ayvolume_lookup"), ((15) - (volval)), ((curclock) / (160)));
                }
            }
            function __deref_compute_ay8910_modulation(runtime, p) {
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
                "spyhunt_ip1_r": method_spyhunt_ip1_r,
                "stat_r": method_stat_r,
                "spyhunt_op4_w": method_spyhunt_op4_w,
                "sirq_w": method_sirq_w,
                "mcr_paletteram9_w": method_mcr_paletteram9_w,
                "mcr_set_color": method_mcr_set_color,
                "mcr3_videoram_w": method_mcr3_videoram_w,
                "spyhunt_videoram_w": method_spyhunt_videoram_w,
                "spyhunt_alpharam_w": method_spyhunt_alpharam_w,
                "spyhunt_scroll_value_w": method_spyhunt_scroll_value_w,
                "data_r": method_data_r,
                "write": method_write,
                "spyhunt_ip2_r": method_spyhunt_ip2_r,
                "irq_w": method_irq_w,
                "compute_ay8910_modulation": method_compute_ay8910_modulation
            };
            return __methodTable;
        })();
        return {
            "mcrsc_csd_state.spyhunt_ip1_r": methods["spyhunt_ip1_r"],
            "mcrsc_csd_state.spyhunt_op4_w": methods["spyhunt_op4_w"],
            "mcrsc_csd_state.spyhunt_ip2_r": methods["spyhunt_ip2_r"],
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
            function method_spyhunt_ip1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"], __L1 = __l["m_cheap_squeak_deluxe.stat_r"];
                let __t0, __t1;
                return (((__t0 = __deref_spyhunt_ip1_r(runtime, (__L0 ? __L0("ssio:IP1") : runtime.macro("ioport", "ssio:IP1"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("ssio:IP1") : runtime.macro("ioport", "ssio:IP1")), "read"))) | ((((__L1 ?? runtime.memberCall(members.m_cheap_squeak_deluxe, "stat_r", 0, undefined))()) << (5))));
            }
            function __deref_spyhunt_ip1_r(runtime, p) {
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
            function method_stat_r(runtime) {
                const members = runtime.members;
                return (members.m_status ?? runtime.member("m_status"));
            }
            function method_sirq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_pia_sync_timer.adjust"], __L1 = __l["adjust"];
                (__L0 ?? runtime.memberCall(members.m_pia_sync_timer, "adjust", 0, __L1))(0, ((state) ? 0 : 1));
            }
            function method_mcr_paletteram9_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
            }
            function method_mcr_set_color(runtime, index, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["pal3bit"], __L1 = __l["m_palette.set_pen_color"];
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__L0 ? __L0(runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__L0 ? __L0(runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__L0 ? __L0(runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_spyhunt_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_spyhunt_alpharam_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_alpha_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_spyhunt_alpharam"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_alpha_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_spyhunt_scroll_value_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                switch (offset) {
                    case 0:
                        {
                            members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (-256))) | (data))) << 16 >> 16);
                            break;
                        }
                    case 1:
                        {
                            members.m_spyhunt_scrollx = (((((((members.m_spyhunt_scrollx ?? runtime.member("m_spyhunt_scrollx"))) & (255))) | (((((data) & (7))) << (8))))) << 16 >> 16);
                            members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (255))) | (((((data) & (128))) << (1))))) << 16 >> 16);
                            break;
                        }
                    case 2:
                        {
                            members.m_spyhunt_scrolly = (((((((members.m_spyhunt_scrolly ?? runtime.member("m_spyhunt_scrolly"))) & (-256))) | (data))) << 16 >> 16);
                            break;
                        }
                }
            }
            function method_data_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
            }
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("synced_write", ((((offset) << (8))) | (((data) & (255)))));
            }
            function method_spyhunt_ip2_r(runtime) {
                const members = runtime.members;
                let __t0;
                const h_m_analog_inputs = members.m_analog_inputs ?? runtime.member("m_analog_inputs");
                return (__t0 = __deref_spyhunt_ip2_r(runtime, runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux")))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_analog_inputs, (members.m_input_mux ?? runtime.member("m_input_mux"))), "read"));
            }
            function __deref_spyhunt_ip2_r(runtime, p) {
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
            function method_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_pia.irq_a_state"], __L1 = __l["m_pia.irq_b_state"], __L2 = __l["m_cpu.set_input_line"];
                let __t0, __t1;
                let combined_state = (((((__L0 ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__L1 ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
                (__L2 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
            }
            function method_compute_ay8910_modulation(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"];
                let __t0;
                let prom = (__t0 = __deref_compute_ay8910_modulation(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let prom$s = undefined, prom$o = 0;
                if (ArrayBuffer.isView(prom) || Array.isArray(prom))
                    prom$s = prom;
                else if (prom !== null && typeof prom === 'object' && prom.generatedPointer === true && prom.path === undefined && prom.target === undefined && (ArrayBuffer.isView(prom.source) || Array.isArray(prom.source))) {
                    prom$s = prom.source;
                    prom$o = prom.offset;
                }
                for (let volval = ((0) | 0); (((volval) < (16)) ? 1 : 0); volval = ((((volval) + (1))) | 0)) {
                    let remaining_clocks = ((volval) | 0);
                    let cur = ((0) | 0);
                    let prev = ((1) | 0);
                    let curclock = ((0) | 0);
                    for (curclock = ((0) | 0); ((((((curclock) < (160)) ? 1 : 0)) && (remaining_clocks)) ? 1 : 0); curclock = ((((curclock) + (1))) | 0)) {
                        cur = (((((prom$s !== undefined ? (prom$s[prom$o + (runtime.divide(curclock, 8))] ?? 0) : runtime.readIndex(prom, runtime.divide(curclock, 8)))) & (runtime.shiftRight(128, ((curclock) % (8)))))) | 0);
                        if (((((((cur) === (0)) ? 1 : 0)) && ((((prev) !== (0)) ? 1 : 0))) ? 1 : 0)) {
                            remaining_clocks = ((((remaining_clocks) - (1))) | 0);
                        }
                        prev = ((cur) | 0);
                    }
                    runtime.writeIndex(runtime.writableMember("m_ayvolume_lookup"), ((15) - (volval)), ((curclock) / (160)));
                }
            }
            function __deref_compute_ay8910_modulation(runtime, p) {
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
                "spyhunt_ip1_r": method_spyhunt_ip1_r,
                "stat_r": method_stat_r,
                "sirq_w": method_sirq_w,
                "mcr_paletteram9_w": method_mcr_paletteram9_w,
                "mcr_set_color": method_mcr_set_color,
                "mcr3_videoram_w": method_mcr3_videoram_w,
                "spyhunt_videoram_w": method_spyhunt_videoram_w,
                "spyhunt_alpharam_w": method_spyhunt_alpharam_w,
                "spyhunt_scroll_value_w": method_spyhunt_scroll_value_w,
                "data_r": method_data_r,
                "write": method_write,
                "spyhunt_ip2_r": method_spyhunt_ip2_r,
                "irq_w": method_irq_w,
                "compute_ay8910_modulation": method_compute_ay8910_modulation
            };
            return __methodTable;
        })();
        return {
            "mcr_state.mcr_set_color": methods["mcr_set_color"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust", "draw", "ioport", "m_adc.rd_w", "m_adc.wr_w", "m_alpha_tilemap.draw", "m_alpha_tilemap.mark_tile_dirty", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_cheap_squeak_deluxe.sirq_w", "m_cheap_squeak_deluxe.sr_w", "m_cheap_squeak_deluxe.stat_r", "m_cpu.set_input_line", "m_ctc.trg2", "m_ctc.trg3", "m_gfxdecode.gfx", "m_lamplatch.write_bit", "m_palette.set_pen_color", "m_pia.irq_a_state", "m_pia.irq_b_state", "m_pia_sync_timer.adjust", "m_screen.priority", "mark_tile_dirty", "memregion", "pal3bit", "priority", "screen.priority", "set", "set_scrollx", "set_scrolly", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
