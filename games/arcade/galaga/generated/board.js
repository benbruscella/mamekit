// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'galaga');
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
            const __mame_table_0 = [0, 1, 2, 3];
            function method_cpu3_interrupt_callback(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_subcpu2.pulse_input_line"], __L1 = __l["m_screen.time_until_pos"], __L2 = __l["m_cpu3_interrupt_timer.adjust"], __L3 = __l["adjust"];
                let scanline = ((param) | 0);
                if ((members.m_sub2_nmi_mask ?? runtime.member("m_sub2_nmi_mask"))) {
                    (__L0 ?? runtime.memberCall(members.m_subcpu2, "pulse_input_line", 0, undefined))(-1, 0);
                }
                scanline = ((((scanline) + (128))) | 0);
                if ((((scanline) >= (272)) ? 1 : 0)) {
                    scanline = ((64) | 0);
                }
                (__L2 ?? runtime.memberCall(members.m_cpu3_interrupt_timer, "adjust", 0, __L3))((__L1 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(scanline), scanline);
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
            function method_bosco_dsw_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"];
                let __t0, __t1;
                let bit0 = ((0) | 0);
                let bit1 = ((0) | 0);
                bit0 = ((((runtime.shiftRight((__t0 = __deref_bosco_dsw_r(runtime, (__L0 ? __L0("DSWB") : runtime.macro("ioport", "DSWB"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("DSWB") : runtime.macro("ioport", "DSWB")), "read")), offset)) & (1))) | 0);
                bit1 = ((((runtime.shiftRight((__t1 = __deref_bosco_dsw_r(runtime, (__L0 ? __L0("DSWA") : runtime.macro("ioport", "DSWA"))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0("DSWA") : runtime.macro("ioport", "DSWA")), "read")), offset)) & (1))) | 0);
                return ((bit0) | (((bit1) << (1))));
            }
            function __deref_bosco_dsw_r(runtime, p) {
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
            function method_galaga_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
            }
            function method_irq1_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_main_irq_mask = ((state) & 0xff);
                if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_irq2_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_subcpu.set_input_line"];
                members.m_sub_irq_mask = ((state) & 0xff);
                if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_nmion_w(runtime, state) {
                const members = runtime.members;
                members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
            }
            function method_reset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
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
            function method_get_next_lfsr_state(runtime, lfsr) {
                const members = runtime.members;
                lfsr = ((lfsr) & 0xffff);
                let bit = ((0) & 0xffff);
                bit = ((((((((((lfsr) >>> (0))) ^ (((lfsr) >>> (3))))) ^ (((lfsr) >>> (5))))) ^ (((lfsr) >>> (10))))) & 0xffff);
                lfsr = ((((((lfsr) >>> (1))) | (((bit) << (15))))) & 0xffff);
                return lfsr;
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"], __L1 = __l["m_subcpu.set_input_line"];
                if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
                }
                if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(0, 1);
                }
            }
            function method_vblank(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, ((state) ? (0) : (1)));
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let color = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((tile_index) + (1024)))) & (63))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (1) : (0)));
                tileinfo.group = color;
            }
            function method_tilemap_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                row = ((((row) + (2))) >>> 0);
                col = ((((col) - (2))) >>> 0);
                if (((col) & (32))) {
                    return ((row) + (((((col) & (31))) << (5))));
                }
                else {
                    return ((col) + (((row) << (5))));
                }
            }
            function method_screen_update_galaga(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_palette.black_pen"], __L1 = __l["bitmap.fill"], __L2 = __l["fill"], __L3 = __l["m_starfield.draw_starfield"], __L4 = __l["m_fg_tilemap.draw"], __L5 = __l["draw"];
                let __t0;
                (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ?? runtime.memberCall(members.m_palette, "black_pen", 0, undefined))(), cliprect);
                (__L3 ?? runtime.memberCall(members.m_starfield, "draw_starfield", 0, undefined))(bitmap, cliprect, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__L4 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect);
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["m_gfxdecode.gfx"], __L2 = __l["m_palette.transpen_mask"];
                let spriteram = __addr_draw_sprites(runtime, (members.m_galaga_ram1 ?? runtime.member("m_galaga_ram1")), 896);
                let spriteram$s = undefined, spriteram$o = 0;
                if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram))
                    spriteram$s = spriteram;
                else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) {
                    spriteram$s = spriteram.source;
                    spriteram$o = spriteram.offset;
                }
                let spriteram_2 = __addr_draw_sprites(runtime, (members.m_galaga_ram2 ?? runtime.member("m_galaga_ram2")), 896);
                let spriteram_2$s = undefined, spriteram_2$o = 0;
                if (ArrayBuffer.isView(spriteram_2) || Array.isArray(spriteram_2))
                    spriteram_2$s = spriteram_2;
                else if (spriteram_2 !== null && typeof spriteram_2 === 'object' && spriteram_2.generatedPointer === true && spriteram_2.path === undefined && spriteram_2.target === undefined && (ArrayBuffer.isView(spriteram_2.source) || Array.isArray(spriteram_2.source))) {
                    spriteram_2$s = spriteram_2.source;
                    spriteram_2$o = spriteram_2.offset;
                }
                let spriteram_3 = __addr_draw_sprites(runtime, (members.m_galaga_ram3 ?? runtime.member("m_galaga_ram3")), 896);
                let spriteram_3$s = undefined, spriteram_3$o = 0;
                if (ArrayBuffer.isView(spriteram_3) || Array.isArray(spriteram_3))
                    spriteram_3$s = spriteram_3;
                else if (spriteram_3 !== null && typeof spriteram_3 === 'object' && spriteram_3.generatedPointer === true && spriteram_3.path === undefined && spriteram_3.target === undefined && (ArrayBuffer.isView(spriteram_3.source) || Array.isArray(spriteram_3.source))) {
                    spriteram_3$s = spriteram_3.source;
                    spriteram_3$o = spriteram_3.offset;
                }
                for (let offs = ((0) | 0); (((offs) < (128)) ? 1 : 0); offs = ((((offs) + (2))) | 0)) {
                    let sprite = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs))) & (127))) | 0);
                    let color = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) & (63))) | 0);
                    let sx = ((__add_draw_sprites(runtime, (((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram_2, ((offs) + (1))))) - (40)), ((256) * ((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram_3, ((offs) + (1))))) & (3)))))) | 0);
                    let sy = ((__add_draw_sprites(runtime, ((256) - ((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (offs)] ?? 0) : runtime.readIndex(spriteram_2, offs)))), 1)) | 0);
                    let flipx = (((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (1))) | 0);
                    let flipy = ((runtime.shiftRight((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (2)), 1)) | 0);
                    let sizex = ((runtime.shiftRight((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (4)), 2)) | 0);
                    let sizey = ((runtime.shiftRight((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (8)), 3)) | 0);
                    sy = ((((sy) - (((16) * (sizey))))) | 0);
                    sy = ((((((sy) & (255))) - (32))) | 0);
                    if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
                        flipx = ((((flipx) ^ (1))) | 0);
                        flipy = ((((flipy) ^ (1))) | 0);
                    }
                    for (let y = ((0) | 0); (((y) <= (sizey)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        for (let x = ((0) | 0); (((x) <= (sizex)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, cliprect, ((sprite) + ((__mame_table_0[(((__add_draw_sprites(runtime, ((((y) ^ (((sizey) * (flipy))))) * (2)), ((x) ^ (((sizex) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((sx) + (((16) * (x)))), ((sy) + (((16) * (y)))), (__L2 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1)), color, 15));
                        }
                    }
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
            function __deref_draw_sprites(runtime, p) {
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
            function method_screen_vblank_galaga(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_videolatch.q2_r"], __L1 = __l["m_videolatch.q1_r"], __L2 = __l["m_videolatch.q0_r"], __L3 = __l["m_starfield.set_scroll_speed"], __L4 = __l["m_videolatch.q3_r"], __L5 = __l["m_videolatch.q4_r"], __L6 = __l["m_starfield.set_active_starfield_sets"], __L7 = __l["m_videolatch.q5_r"], __L8 = __l["m_starfield.enable_starfield"];
                let __t0, __t1, __t2, __t3, __t4, __t5;
                if (((state) ? 0 : 1)) {
                    let speed_index_X = (((((((((__L0 ?? runtime.memberCall(members.m_videolatch, "q2_r", 0, undefined))()) << (2))) | ((((__L1 ?? runtime.memberCall(members.m_videolatch, "q1_r", 0, undefined))()) << (1))))) | ((((__L2 ?? runtime.memberCall(members.m_videolatch, "q0_r", 0, undefined))()) << (0))))) & 0xff);
                    let speed_index_Y = ((0) & 0xff);
                    (__L3 ?? runtime.memberCall(members.m_starfield, "set_scroll_speed", 0, undefined))(speed_index_X, speed_index_Y);
                    (__L6 ?? runtime.memberCall(members.m_starfield, "set_active_starfield_sets", 0, undefined))((__L4 ?? runtime.memberCall(members.m_videolatch, "q3_r", 0, undefined))(), (((__L5 ?? runtime.memberCall(members.m_videolatch, "q4_r", 0, undefined))()) | (2)));
                    (__L8 ?? runtime.memberCall(members.m_starfield, "enable_starfield", 0, undefined))((__L7 ?? runtime.memberCall(members.m_videolatch, "q5_r", 0, undefined))());
                }
            }
            function method_K_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return runtime.shiftRight(h_m_latched_cmd, 4);
            }
            function method_R0_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return ((h_m_latched_cmd) & (15));
            }
            function method_compute_resistor_weights(runtime, minval, maxval, scaler, count_1, resistances_1, weights_1, pulldown_1, pullup_1, count_2, resistances_2, weights_2, pulldown_2, pullup_2, count_3, resistances_3, weights_3, pulldown_3, pullup_3) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["fatalerror"], __L1 = __l["std::clamp"];
                let rescount = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let r = Array.from({ length: Math.max(0, Math.trunc(Number(3))) }, () => new Float64Array(new Uint8Array(Math.max(0, Math.trunc(Number(18))))));
                let w = Array.from({ length: Math.max(0, Math.trunc(Number(3))) }, () => new Float64Array(new Uint8Array(Math.max(0, Math.trunc(Number(18))))));
                let ws = Array.from({ length: Math.max(0, Math.trunc(Number(3))) }, () => new Float64Array(new Uint8Array(Math.max(0, Math.trunc(Number(18))))));
                let r_pd = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let r_pu = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let max_out = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let out = new Array(Math.max(0, Math.trunc(Number(3)))).fill(0);
                let networks_no = ((0) | 0);
                for (let n = ((0) | 0); ((Number(n) < Number(3)) ? 1 : 0); n = ((((n) + (1))) | 0)) {
                    let count = ((0) | 0);
                    let pd = ((0) | 0);
                    let pu = ((0) | 0);
                    let resistances = 0;
                    let weights = 0;
                    switch (n) {
                        case 0:
                            {
                                count = ((count_1) | 0);
                                resistances = resistances_1;
                                weights = weights_1;
                                pd = ((pulldown_1) | 0);
                                pu = ((pullup_1) | 0);
                                break;
                            }
                        case 1:
                            {
                                count = ((count_2) | 0);
                                resistances = resistances_2;
                                weights = weights_2;
                                pd = ((pulldown_2) | 0);
                                pu = ((pullup_2) | 0);
                                break;
                            }
                        default:
                            {
                                count = ((count_3) | 0);
                                resistances = resistances_3;
                                weights = weights_3;
                                pd = ((pulldown_3) | 0);
                                pu = ((pullup_3) | 0);
                                break;
                            }
                    }
                    if (((Number(count) > Number(18)) ? 1 : 0)) {
                        (__L0 ? __L0("compute_resistor_weights(): too many resistors in net #%i. The maximum allowed is %i, the number requested was: %i\n", n, 18, count) : runtime.macro("fatalerror", "compute_resistor_weights(): too many resistors in net #%i. The maximum allowed is %i, the number requested was: %i\n", n, 18, count));
                    }
                    if ((((count) > (0)) ? 1 : 0)) {
                        rescount[networks_no] = count;
                        for (let i = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            runtime.writeIndex((r[networks_no] ?? 0), i, ((1) * (runtime.readIndex(resistances, i))));
                        }
                        out[networks_no] = weights;
                        r_pd[networks_no] = pd;
                        r_pu[networks_no] = pu;
                        networks_no = ((((networks_no) + (1))) | 0);
                    }
                }
                if ((((networks_no) < (1)) ? 1 : 0)) {
                    (__L0 ? __L0("compute_resistor_weights(): no input data\n") : runtime.macro("fatalerror", "compute_resistor_weights(): no input data\n"));
                }
                for (let i = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let R0 = 0;
                    let R1 = 0;
                    let Vout = 0;
                    let dst = 0;
                    for (let n = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
                        R0 = ((((Number((r_pd[i] ?? 0)) === Number(0)) ? 1 : 0)) ? (((1) / (1000000000000))) : (((1) / ((r_pd[i] ?? 0)))));
                        R1 = ((((Number((r_pu[i] ?? 0)) === Number(0)) ? 1 : 0)) ? (((1) / (1000000000000))) : (((1) / ((r_pu[i] ?? 0)))));
                        for (let j = ((0) | 0); ((Number(j) < Number((rescount[i] ?? 0))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                            if ((((j) === (n)) ? 1 : 0)) {
                                if (((Number(runtime.readIndex((r[i] ?? 0), j)) !== Number(0)) ? 1 : 0)) {
                                    R1 = ((R1) + (((1) / (runtime.readIndex((r[i] ?? 0), j)))));
                                }
                            }
                            else {
                                if (((Number(runtime.readIndex((r[i] ?? 0), j)) !== Number(0)) ? 1 : 0)) {
                                    R0 = ((R0) + (((1) / (runtime.readIndex((r[i] ?? 0), j)))));
                                }
                            }
                        }
                        R0 = ((1) / (R0));
                        R1 = ((1) / (R1));
                        Vout = ((((((((maxval) - (minval))) * (R0))) / (((R1) + (R0))))) + (minval));
                        dst = (__L1 ? __L1(Vout, minval, maxval) : runtime.macro("std::clamp", Vout, minval, maxval));
                        runtime.writeIndex((w[i] ?? 0), n, dst);
                    }
                }
                let j = ((0) | 0);
                let max = 0;
                for (let i = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let sum = 0;
                    for (let n = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
                        sum = ((sum) + (runtime.readIndex((w[i] ?? 0), n)));
                    }
                    max_out[i] = sum;
                    if ((((max) < (sum)) ? 1 : 0)) {
                        max = sum;
                        j = ((i) | 0);
                    }
                }
                let scale = 0;
                if ((((scaler) < (0)) ? 1 : 0)) {
                    scale = ((maxval) / ((max_out[j] ?? 0)));
                }
                else {
                    scale = scaler;
                }
                for (let i = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    for (let n = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
                        runtime.writeIndex((ws[i] ?? 0), n, ((runtime.readIndex((w[i] ?? 0), n)) * (scale)));
                        runtime.writeIndex((out[i] ?? 0), n, runtime.readIndex((ws[i] ?? 0), n));
                    }
                }
                if (0) {
                    /* osd_printf_info: no effect */
                    /* osd_printf_info: no effect */
                    for (let i = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        let sum = 0;
                        /* osd_printf_info: no effect */
                        if (((Number((r_pu[i] ?? 0)) !== Number(0)) ? 1 : 0)) {
                            /* osd_printf_info: no effect */
                        }
                        if (((Number((r_pd[i] ?? 0)) !== Number(0)) ? 1 : 0)) {
                            /* osd_printf_info: no effect */
                        }
                        /* osd_printf_info: no effect */
                        for (let n = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
                            /* osd_printf_info: no effect */
                            sum = ((sum) + (runtime.readIndex((ws[i] ?? 0), n)));
                        }
                        /* osd_printf_info: no effect */
                    }
                }
                return scale;
            }
            function method_galaga_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"], __L4 = __l["palette.set_pen_indirect"], __L5 = __l["set_pen_indirect"];
                let __t0, __t1, __t2;
                let color_prom = (__t0 = __deref_galaga_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let resistances = [1000, 470, 220];
                let rweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let gweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let bweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, __addr_galaga_palette(runtime, resistances, 0), rweights, 0, 0, 3, __addr_galaga_palette(runtime, resistances, 0), gweights, 0, 0, 2, __addr_galaga_palette(runtime, resistances, 1), bweights, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, __addr_galaga_palette(runtime, resistances, 0), rweights, 0, 0, 3, __addr_galaga_palette(runtime, resistances, 0), gweights, 0, 0, 2, __addr_galaga_palette(runtime, resistances, 1), bweights, 0, 0));
                for (let i = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    bit0 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (0)) & 1)) | 0);
                    bit1 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (1)) & 1)) | 0);
                    bit2 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (2)) & 1)) | 0);
                    let r = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](rweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, rweights, bit0, bit1, bit2))) | 0);
                    bit0 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (3)) & 1)) | 0);
                    bit1 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (4)) & 1)) | 0);
                    bit2 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (5)) & 1)) | 0);
                    let g = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](gweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, gweights, bit0, bit1, bit2))) | 0);
                    bit0 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (6)) & 1)) | 0);
                    bit1 = (((((__deref_galaga_palette(runtime, color_prom)) >>> (7)) & 1)) | 0);
                    let b = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](bweights, bit0, bit1) : method_combine_weights__int__2(runtime, bweights, bit0, bit1))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                    color_prom = __add_galaga_palette(runtime, color_prom, 1);
                }
                let rsweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                let gsweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                let bsweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 2, __addr_galaga_palette(runtime, resistances, 1), rsweights, (resistances[0] ?? 0), 0, 2, __addr_galaga_palette(runtime, resistances, 1), gsweights, (resistances[0] ?? 0), 0, 2, __addr_galaga_palette(runtime, resistances, 1), bsweights, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 2, __addr_galaga_palette(runtime, resistances, 1), rsweights, (resistances[0] ?? 0), 0, 2, __addr_galaga_palette(runtime, resistances, 1), gsweights, (resistances[0] ?? 0), 0, 2, __addr_galaga_palette(runtime, resistances, 1), bsweights, 0, 0));
                for (let i = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let r = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](rsweights, (((i) >>> (0)) & 1), (((i) >>> (1)) & 1)) : method_combine_weights__int__2(runtime, rsweights, (((i) >>> (0)) & 1), (((i) >>> (1)) & 1)))) | 0);
                    let g = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](gsweights, (((i) >>> (2)) & 1), (((i) >>> (3)) & 1)) : method_combine_weights__int__2(runtime, gsweights, (((i) >>> (2)) & 1), (((i) >>> (3)) & 1)))) | 0);
                    let b = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](bsweights, (((i) >>> (4)) & 1), (((i) >>> (5)) & 1)) : method_combine_weights__int__2(runtime, bsweights, (((i) >>> (4)) & 1), (((i) >>> (5)) & 1)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(((32) + (i)), (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(i, ((((__deref_galaga_palette(runtime, (__t1 = color_prom, color_prom = __add_galaga_palette(runtime, color_prom, 1), __t1))) & (15))) | (16)));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((256) + (i)), ((__deref_galaga_palette(runtime, (__t2 = color_prom, color_prom = __add_galaga_palette(runtime, color_prom, 1), __t2))) & (15)));
                }
                for (let i = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((512) + (i)), ((32) + (i)));
                }
            }
            function __add_galaga_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_galaga_palette(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_galaga_palette(runtime, p) {
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
            function method_combine_weights__int__3(runtime, tab, w_0, w_1, w_2) {
                const members = runtime.members;
                return ((__add_combine_weights__int__3(runtime, (runtime.overrides["emu_detail__combine_weights__0__2"] ? runtime.overrides["emu_detail__combine_weights__0__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__0__2(runtime, tab, w_0, w_1, w_2)), 0.5)) | 0);
            }
            function __add_combine_weights__int__3(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__0__2(runtime, tab, w0, w_0, w_1) {
                const members = runtime.members;
                return __add_emu_detail__combine_weights__0__2(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__1"] ? runtime.overrides["emu_detail__combine_weights__1__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__1__1(runtime, tab, w_0, w_1)));
            }
            function __add_emu_detail__combine_weights__0__2(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__1__1(runtime, tab, w0, w_0) {
                const members = runtime.members;
                return __add_emu_detail__combine_weights__1__1(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__0"] ? runtime.overrides["emu_detail__combine_weights__2__0"](tab, w_0) : method_emu_detail__combine_weights__2__0(runtime, tab, w_0)));
            }
            function __add_emu_detail__combine_weights__1__1(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__2__0(runtime, tab, w) {
                const members = runtime.members;
                return ((runtime.readIndex(tab, 2)) * (w));
            }
            function method_combine_weights__int__2(runtime, tab, w_0, w_1) {
                const members = runtime.members;
                return ((__add_combine_weights__int__2(runtime, (runtime.overrides["emu_detail__combine_weights__0__1"] ? runtime.overrides["emu_detail__combine_weights__0__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__0__1(runtime, tab, w_0, w_1)), 0.5)) | 0);
            }
            function __add_combine_weights__int__2(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__0__1(runtime, tab, w0, w_0) {
                const members = runtime.members;
                return __add_emu_detail__combine_weights__0__1(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__0"] ? runtime.overrides["emu_detail__combine_weights__1__0"](tab, w_0) : method_emu_detail__combine_weights__1__0(runtime, tab, w_0)));
            }
            function __add_emu_detail__combine_weights__0__1(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__1__0(runtime, tab, w) {
                const members = runtime.members;
                return ((runtime.readIndex(tab, 1)) * (w));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "cpu3_interrupt_callback": method_cpu3_interrupt_callback,
                "data_w": method_data_w,
                "ctrl_r": method_ctrl_r,
                "bosco_dsw_r": method_bosco_dsw_r,
                "galaga_videoram_w": method_galaga_videoram_w,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "reset": method_reset,
                "chip_select": method_chip_select,
                "rw": method_rw,
                "get_next_lfsr_state": method_get_next_lfsr_state,
                "vblank_irq": method_vblank_irq,
                "vblank": method_vblank,
                "get_tile_info": method_get_tile_info,
                "tilemap_scan": method_tilemap_scan,
                "screen_update_galaga": method_screen_update_galaga,
                "draw_sprites": method_draw_sprites,
                "screen_vblank_galaga": method_screen_vblank_galaga,
                "K_r": method_K_r,
                "R0_r": method_R0_r,
                "compute_resistor_weights": method_compute_resistor_weights,
                "galaga_palette": method_galaga_palette,
                "combine_weights__int__3": method_combine_weights__int__3,
                "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
                "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
                "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
                "combine_weights__int__2": method_combine_weights__int__2,
                "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
                "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0
            };
            return __methodTable;
        })();
        return {
            "galaga_state.cpu3_interrupt_callback": methods["cpu3_interrupt_callback"],
            "galaga_state.bosco_dsw_r": methods["bosco_dsw_r"],
            "galaga_state.galaga_videoram_w": methods["galaga_videoram_w"],
            "galaga_state.irq1_clear_w": methods["irq1_clear_w"],
            "galaga_state.irq2_clear_w": methods["irq2_clear_w"],
            "galaga_state.nmion_w": methods["nmion_w"],
            "galaga_state.vblank_irq": methods["vblank_irq"],
            "galaga_state.get_tile_info": methods["get_tile_info"],
            "galaga_state.tilemap_scan": methods["tilemap_scan"],
            "galaga_state.screen_update_galaga": methods["screen_update_galaga"],
            "galaga_state.draw_sprites": methods["draw_sprites"],
            "galaga_state.screen_vblank_galaga": methods["screen_vblank_galaga"],
            "galaga_state.compute_resistor_weights": methods["compute_resistor_weights"],
            "galaga_state.galaga_palette": methods["galaga_palette"],
            "galaga_state.combine_weights__int__3": methods["combine_weights__int__3"],
            "galaga_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
            "galaga_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
            "galaga_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
            "galaga_state.combine_weights__int__2": methods["combine_weights__int__2"],
            "galaga_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
            "galaga_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust", "bitmap.fill", "draw", "fatalerror", "fill", "flip_screen", "ioport", "m_cpu.set_input_line", "m_cpu3_interrupt_timer.adjust", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.black_pen", "m_palette.transpen_mask", "m_screen.time_until_pos", "m_starfield.draw_starfield", "m_starfield.enable_starfield", "m_starfield.set_active_starfield_sets", "m_starfield.set_scroll_speed", "m_subcpu.set_input_line", "m_subcpu2.pulse_input_line", "m_videolatch.q0_r", "m_videolatch.q1_r", "m_videolatch.q2_r", "m_videolatch.q3_r", "m_videolatch.q4_r", "m_videolatch.q5_r", "mark_tile_dirty", "memregion", "palette.set_indirect_color", "palette.set_pen_indirect", "rgb_t", "set", "set_indirect_color", "set_pen_indirect", "std::clamp", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
