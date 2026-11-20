// GENERATED executable machine composition from src/mame/konami/timeplt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'timeplt');
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
            const __mame_table_0 = [0, 16, 32, 48, 64, 144, 160, 176, 160, 208];
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_scanline_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"];
                let __t0;
                return (__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
            }
            function method___inline_main_map_c300_lw8(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mainlatch.write_d0"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_mainlatch, "write_d0", 0, undefined))(((offset) >>> (1)), data);
            }
            function method_filter_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.invoke("set_filter", 1, 0, ((((offset) >>> (0))) & (3)));
                runtime.invoke("set_filter", 1, 1, ((((offset) >>> (2))) & (3)));
                runtime.invoke("set_filter", 1, 2, ((((offset) >>> (4))) & (3)));
                runtime.invoke("set_filter", 0, 0, ((((offset) >>> (6))) & (3)));
                runtime.invoke("set_filter", 0, 1, ((((offset) >>> (8))) & (3)));
                runtime.invoke("set_filter", 0, 2, ((((offset) >>> (10))) & (3)));
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let attr = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
                let code = ((__add_get_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((8) * (((attr) & (32)))))) | 0);
                let color = ((((attr) & (31))) | 0);
                let flags = (((__L0 ? __L0(runtime.shiftRight(attr, 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(attr, 6)))) | 0);
                tileinfo.category = runtime.shiftRight(((attr) & (16)), 4);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, code, color, flags);
            }
            function __add_get_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_nmi_enable_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_nmi_enable = ((state) & 0xff);
                if ((((members.m_nmi_enable ?? runtime.member("m_nmi_enable"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
                }
            }
            function method_sh_irqtrigger_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_soundcpu.set_input_line"];
                if ((((((Number((members.m_last_irq_state ?? runtime.member("m_last_irq_state"))) === Number(0)) ? 1 : 0)) && (state)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 2);
                }
                members.m_last_irq_state = state;
            }
            function method_video_enable_w(runtime, state) {
                const members = runtime.members;
                members.m_video_enable = ((state) ? 1 : 0);
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"];
                if ((members.m_video_enable ?? runtime.member("m_video_enable"))) {
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 1, 0);
                }
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                for (let offs = ((62) | 0); (((offs) >= (16)) ? 1 : 0); offs = ((((offs) - (2))) | 0)) {
                    let sx = ((runtime.readIndex(runtime.readIndex(h_m_spriteram, 0), offs)) | 0);
                    let sy = ((((241) - (runtime.readIndex(runtime.readIndex(h_m_spriteram, 1), ((offs) + (1)))))) | 0);
                    let code = ((runtime.readIndex(runtime.readIndex(h_m_spriteram, 0), ((offs) + (1)))) | 0);
                    let color = ((((runtime.readIndex(runtime.readIndex(h_m_spriteram, 1), offs)) & (63))) | 0);
                    let flipx = (((((~runtime.readIndex(runtime.readIndex(h_m_spriteram, 1), offs))) & (64))) | 0);
                    let flipy = ((((runtime.readIndex(runtime.readIndex(h_m_spriteram, 1), offs)) & (128))) | 0);
                    runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0);
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if ((((state) && ((members.m_nmi_enable ?? runtime.member("m_nmi_enable")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
                }
            }
            function method_portB_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_soundcpu.total_cycles"];
                let __t0;
                return (__mame_table_0[(((((runtime.divide((__L0 ?? runtime.memberCall(members.m_soundcpu, "total_cycles", 0, undefined))(), 512)) % (10))) % 10) + 10) % 10] ?? 0);
            }
            function method_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_pen_color"], __L3 = __l["set_pen_color"];
                let __t0, __t1, __t2;
                let color_prom = (__t0 = __deref_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let palette_val = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32)))));
                for (let i = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    let bit3 = ((0) | 0);
                    let bit4 = ((0) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (1)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (2)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (3)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (4)) & 1)) | 0);
                    bit4 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (5)) & 1)) | 0);
                    let r = ((__add_palette(runtime, __add_palette(runtime, __add_palette(runtime, __add_palette(runtime, ((25) * (bit0)), ((36) * (bit1))), ((53) * (bit2))), ((64) * (bit3))), ((77) * (bit4)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (6)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, ((i) + (32)))) >>> (7)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (0)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (1)) & 1)) | 0);
                    bit4 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (2)) & 1)) | 0);
                    let g = ((__add_palette(runtime, __add_palette(runtime, __add_palette(runtime, __add_palette(runtime, ((25) * (bit0)), ((36) * (bit1))), ((53) * (bit2))), ((64) * (bit3))), ((77) * (bit4)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (3)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (4)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (5)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (6)) & 1)) | 0);
                    bit4 = (((((runtime.readIndex(color_prom, ((i) + (0)))) >>> (7)) & 1)) | 0);
                    let b = ((__add_palette(runtime, __add_palette(runtime, __add_palette(runtime, __add_palette(runtime, ((25) * (bit0)), ((36) * (bit1))), ((53) * (bit2))), ((64) * (bit3))), ((77) * (bit4)))) | 0);
                    palette_val[i] = (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b));
                }
                color_prom = __add_palette(runtime, color_prom, 64);
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L2 ?? runtime.memberCall(palette, "set_pen_color", 0, __L3))(((128) + (i)), (palette_val[((__deref_palette(runtime, (__t1 = color_prom, color_prom = __add_palette(runtime, color_prom, 1), __t1))) & (15))] ?? 0));
                }
                for (let i = ((0) | 0); ((Number(i) < Number(128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L2 ?? runtime.memberCall(palette, "set_pen_color", 0, __L3))(i, (palette_val[__add_palette(runtime, ((__deref_palette(runtime, (__t2 = color_prom, color_prom = __add_palette(runtime, color_prom, 1), __t2))) & (15)), 16)] ?? 0));
                }
            }
            function __add_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_palette(runtime, p) {
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
                "colorram_w": method_colorram_w,
                "videoram_w": method_videoram_w,
                "scanline_r": method_scanline_r,
                "__inline_main_map_c300_lw8": method___inline_main_map_c300_lw8,
                "filter_w": method_filter_w,
                "get_tile_info": method_get_tile_info,
                "nmi_enable_w": method_nmi_enable_w,
                "sh_irqtrigger_w": method_sh_irqtrigger_w,
                "video_enable_w": method_video_enable_w,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "vblank_irq": method_vblank_irq,
                "portB_r": method_portB_r,
                "palette": method_palette
            };
            return __methodTable;
        })();
        return {
            "timeplt_state.colorram_w": methods["colorram_w"],
            "timeplt_state.videoram_w": methods["videoram_w"],
            "timeplt_state.scanline_r": methods["scanline_r"],
            "timeplt_state.__inline_main_map_c300_lw8": methods["__inline_main_map_c300_lw8"],
            "timeplt_state.get_tile_info": methods["get_tile_info"],
            "timeplt_state.nmi_enable_w": methods["nmi_enable_w"],
            "timeplt_state.video_enable_w": methods["video_enable_w"],
            "timeplt_state.screen_update": methods["screen_update"],
            "timeplt_state.draw_sprites": methods["draw_sprites"],
            "timeplt_state.vblank_irq": methods["vblank_irq"],
            "timeplt_state.palette": methods["palette"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_mainlatch.write_d0", "m_screen.vpos", "m_soundcpu.set_input_line", "m_soundcpu.total_cycles", "mark_tile_dirty", "memregion", "palette.set_pen_color", "rgb_t", "set", "set_pen_color", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
