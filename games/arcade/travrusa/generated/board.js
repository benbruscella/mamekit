// GENERATED executable machine composition from src/mame/irem/travrusa.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'travrusa');
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
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
            }
            function method_scroll_x_low_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 0, data);
                (runtime.overrides["set_scroll"] ? runtime.overrides["set_scroll"]() : method_set_scroll(runtime));
            }
            function method_set_scroll(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"];
                for (let i = ((0) | 0); (((i) <= (2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(i, __add_set_scroll(runtime, runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1)))));
                }
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(3, 0);
            }
            function __add_set_scroll(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_scroll_x_high_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 1, data);
                (runtime.overrides["set_scroll"] ? runtime.overrides["set_scroll"]() : method_set_scroll(runtime));
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPXY"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let attr = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), __add_get_tile_info(runtime, ((2) * (tile_index)), 1))) & 0xff);
                let flags = (((__L0 ? __L0(runtime.shiftRight(((attr) & (48)), 4)) : runtime.macro("TILE_FLIPXY", runtime.shiftRight(((attr) & (48)), 4)))) | 0);
                tileinfo.group = ((((Number(((attr) & (15))) === Number(15)) ? 1 : 0)) ? (1) : (0));
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, __add_get_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((2) * (tile_index))), ((((attr) & (192))) << (2))), ((attr) & (15)), flags);
            }
            function __add_get_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"];
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 32, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 16, 0);
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rectangle"], __L1 = __l["flip_screen"], __L2 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let spritevisiblearea = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0(8, 247, 0, 191) : runtime.macro("rectangle", 8, 247, 0, 191)));
                let spritevisibleareaflip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0(8, 247, 64, 255) : runtime.macro("rectangle", 8, 247, 64, 255)));
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
                    clip = runtime.andAssign(clip, spritevisibleareaflip);
                }
                else {
                    clip = runtime.andAssign(clip, spritevisiblearea);
                }
                for (let offs = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    let sx = ((((((__add_draw_sprites(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (3))), 8)) & (255))) - (8))) | 0);
                    let sy = ((((240) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
                    let code = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
                    let attr = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
                    let flipx = ((((attr) & (64))) | 0);
                    let flipy = ((((attr) & (128))) | 0);
                    if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
                        sx = ((((240) - (sx))) | 0);
                        sy = ((((240) - (sy))) | 0);
                        flipx = ((((flipx) ? 0 : 1)) | 0);
                        flipy = ((((flipy) ? 0 : 1)) | 0);
                    }
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, clip, code, ((attr) & (15)), flipx, flipy, sx, sy, 0);
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
            function method_soundlatch_r(runtime) {
                const members = runtime.members;
                return (members.m_soundlatch ?? runtime.member("m_soundlatch"));
            }
            function method_m6803_port1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ay_45M.data_r"], __L1 = __l["m_ay_45L.data_r"];
                let __t0, __t1;
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (8))) {
                    return (__L0 ?? runtime.memberCall(members.m_ay_45M, "data_r", 0, undefined))();
                }
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (16))) {
                    return (__L1 ?? runtime.memberCall(members.m_ay_45L, "data_r", 0, undefined))();
                }
                return 255;
            }
            function method_m6803_port2_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            function method_travrusa_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"], __L4 = __l["palette.set_pen_indirect"], __L5 = __l["set_pen_indirect"];
                let __t0;
                let color_prom = (__t0 = __deref_travrusa_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                for (let i = ((0) | 0); (((i) < (128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, i)) >>> (6)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, i)) >>> (7)) & 1)) | 0);
                    let r = ((__add_travrusa_palette(runtime, ((82) * (bit0)), ((173) * (bit1)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, i)) >>> (3)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, i)) >>> (4)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, i)) >>> (5)) & 1)) | 0);
                    let g = ((__add_travrusa_palette(runtime, __add_travrusa_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, i)) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, i)) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, i)) >>> (2)) & 1)) | 0);
                    let b = ((__add_travrusa_palette(runtime, __add_travrusa_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
                for (let i = ((128) | 0); (((i) < (144)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (6)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (7)) & 1)) | 0);
                    let r = ((__add_travrusa_palette(runtime, ((82) * (bit0)), ((173) * (bit1)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (3)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (4)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (5)) & 1)) | 0);
                    let g = ((__add_travrusa_palette(runtime, __add_travrusa_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, __add_travrusa_palette(runtime, ((i) - (128)), 512))) >>> (2)) & 1)) | 0);
                    let b = ((__add_travrusa_palette(runtime, __add_travrusa_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
                color_prom = __add_travrusa_palette(runtime, color_prom, 544);
                for (let i = ((0) | 0); (((i) < (128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(i, i);
                }
                for (let i = ((128) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let ctabentry = ((((((runtime.readIndex(color_prom, ((i) - (128)))) & (15))) | (128))) & 0xff);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(i, ctabentry);
                }
            }
            function __add_travrusa_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_travrusa_palette(runtime, p) {
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
                "videoram_w": method_videoram_w,
                "scroll_x_low_w": method_scroll_x_low_w,
                "set_scroll": method_set_scroll,
                "scroll_x_high_w": method_scroll_x_high_w,
                "get_tile_info": method_get_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "soundlatch_r": method_soundlatch_r,
                "m6803_port1_r": method_m6803_port1_r,
                "m6803_port2_r": method_m6803_port2_r,
                "travrusa_palette": method_travrusa_palette
            };
            return __methodTable;
        })();
        return {
            "travrusa_state.videoram_w": methods["videoram_w"],
            "travrusa_state.scroll_x_low_w": methods["scroll_x_low_w"],
            "travrusa_state.set_scroll": methods["set_scroll"],
            "travrusa_state.scroll_x_high_w": methods["scroll_x_high_w"],
            "travrusa_state.get_tile_info": methods["get_tile_info"],
            "travrusa_state.screen_update": methods["screen_update"],
            "travrusa_state.draw_sprites": methods["draw_sprites"],
            "travrusa_state.travrusa_palette": methods["travrusa_palette"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPXY", "draw", "flip_screen", "m_ay_45L.data_r", "m_ay_45M.data_r", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_gfxdecode.gfx", "mark_tile_dirty", "memregion", "palette.set_indirect_color", "palette.set_pen_indirect", "rectangle", "rgb_t", "set", "set_indirect_color", "set_pen_indirect", "set_scrollx", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
