// GENERATED executable machine composition from src/mame/capcom/1942.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, '1942');
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
            function method_scroll_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_scroll"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, ((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0)) | (((runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1)) << (8)))));
            }
            function method_palette_bank_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                data = ((data) & 0xff);
                if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(data)) ? 1 : 0)) {
                    members.m_palette_bank = ((((data) & (3))) | 0);
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
                }
            }
            function method_fgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_fg_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
            }
            function method_bgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_bg_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((((offset) & (15))) | (((((offset) >>> (1))) & (496)))));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let code = ((runtime.readIndex((members.m_fg_videoram ?? runtime.member("m_fg_videoram")), tile_index)) | 0);
                let color = ((runtime.readIndex((members.m_fg_videoram ?? runtime.member("m_fg_videoram")), ((tile_index) + (1024)))) | 0);
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, ((code) + (((((color) & (128))) << (1)))), ((color) & (63)), 0);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                tile_index = ((((tile_index) & (15))) | (((((tile_index) & (496))) << (1))));
                let code = ((runtime.readIndex((members.m_bg_videoram ?? runtime.member("m_bg_videoram")), tile_index)) | 0);
                let color = ((runtime.readIndex((members.m_bg_videoram ?? runtime.member("m_bg_videoram")), ((tile_index) + (16)))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(1, ((code) + (((((color) & (128))) << (1)))), __add_get_bg_tile_info(runtime, ((color) & (31)), ((32) * ((members.m_palette_bank ?? runtime.member("m_palette_bank"))))), (__L0 ? __L0(runtime.shiftRight(((color) & (96)), 5)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((color) & (96)), 5))));
            }
            function __add_get_bg_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_scanline(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line_and_vector"], __L1 = __l["m_audiocpu.set_input_line"];
                const h_m_irqprom = members.m_irqprom ?? runtime.member("m_irqprom");
                let scanline = ((param) | 0);
                let irq = ((runtime.readIndex(h_m_irqprom, ((scanline) & (255)))) & 0xff);
                if (((irq) & (8))) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line_and_vector", 0, undefined))(0, 2, ((199) | (((((irq) << (3))) & (24)))));
                }
                if (((irq) & (4))) {
                    (__L1 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 2);
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"], __L2 = __l["m_fg_tilemap.draw"];
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rectangle"], __L1 = __l["flip_screen"], __L2 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let cliprecty = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0(cliprect.min_x, cliprect.max_x, y, y) : runtime.macro("rectangle", cliprect.min_x, cliprect.max_x, y, y)));
                    let objdata = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](4) : new Uint8Array(Math.max(0, Number(4))));
                    let v = (((((__L1 ? __L1() : runtime.macro("flip_screen"))) ? ((~((y) - (1)))) : (((y) - (1))))) & 0xff);
                    for (let h = ((496) | 0); (((h) >= (128)) ? 1 : 0); h = ((((h) - (16))) | 0)) {
                        let objcnt4 = ((((Number((((h) >>> (8)) & 1)) !== Number(((((~h)) >>> (7)) & 1))) ? 1 : 0)) ? 1 : 0);
                        let objcnt3 = ((((Number(((((((v) >>> (7)) & 1)) && (objcnt4)) ? 1 : 0)) !== Number(((((~h)) >>> (7)) & 1))) ? 1 : 0)) ? 1 : 0);
                        let obj_idx = ((((runtime.shiftRight(h, 4)) & (7))) & 0xff);
                        obj_idx = ((((obj_idx) | (((objcnt3) ? (8) : (0))))) & 0xff);
                        obj_idx = ((((obj_idx) | (((objcnt4) ? (16) : (0))))) & 0xff);
                        obj_idx = ((((obj_idx) << (2))) & 0xff);
                        for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            objdata[i] = runtime.readIndex(h_m_spriteram, ((obj_idx) | (i)));
                        }
                        let code = (((((((((objdata[0] ?? 0)) & (127))) | (((((((objdata[1] ?? 0)) >>> (5)) & 1)) << (7))))) | (((((((objdata[0] ?? 0)) >>> (7)) & 1)) << (8))))) | 0);
                        let col = (((((objdata[1] ?? 0)) & (15))) | 0);
                        let sx = (((((objdata[3] ?? 0)) - (((((((objdata[1] ?? 0)) >>> (4)) & 1)) << (8))))) | 0);
                        let sy = (((objdata[2] ?? 0)) | 0);
                        let dir = ((1) | 0);
                        let valpha = ((((sy) & 0xff)) & 0xff);
                        let v2c = (((((((~v)) & 0xff)) + ((((__L1 ? __L1() : runtime.macro("flip_screen"))) ? (1) : (255))))) & 0xff);
                        let lvbeta = ((((v2c) + (valpha))) & 0xff);
                        let vbeta = (((~lvbeta)) & 0xff);
                        let vleq = ((((Number(vbeta) <= Number((((~valpha)) & (255)))) ? 1 : 0)) ? 1 : 0);
                        let vinlen = ((1) ? 1 : 0);
                        let vlen = ((runtime.shiftRight((objdata[1] ?? 0), 6)) & 0xff);
                        switch (((vlen) & (3))) {
                            case 0:
                                {
                                    vinlen = ((((((((((((((lvbeta) >>> (7)) & 1)) && ((((lvbeta) >>> (6)) & 1))) ? 1 : 0)) && ((((lvbeta) >>> (5)) & 1))) ? 1 : 0)) && ((((lvbeta) >>> (4)) & 1))) ? 1 : 0)) ? 1 : 0);
                                    break;
                                }
                            case 1:
                                {
                                    vinlen = (((((((((((lvbeta) >>> (7)) & 1)) && ((((lvbeta) >>> (6)) & 1))) ? 1 : 0)) && ((((lvbeta) >>> (5)) & 1))) ? 1 : 0)) ? 1 : 0);
                                    break;
                                }
                            case 2:
                                {
                                    vinlen = ((((((((lvbeta) >>> (7)) & 1)) && ((((lvbeta) >>> (6)) & 1))) ? 1 : 0)) ? 1 : 0);
                                    break;
                                }
                            case 3:
                                {
                                    vinlen = ((1) ? 1 : 0);
                                    break;
                                }
                        }
                        let vinzone = (((((((vleq) && (vinlen)) ? 1 : 0)) ? 0 : 1)) ? 1 : 0);
                        if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
                            sx = ((((240) - (sx))) | 0);
                            sy = ((((240) - (sy))) | 0);
                            dir = ((-1) | 0);
                        }
                        let row = (((((((vlen) === (3)) ? 1 : 0)) ? (16) : (((1) << (vlen))))) | 0);
                        code = ((((code) & ((~((row) - (1)))))) | 0);
                        if (((vinzone) ? 0 : 1)) {
                            for (let i = ((0) | 0); (((i) < (row)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "transpen", 0, undefined)(bitmap, cliprecty, ((code) + (i)), col, (__L1 ? __L1() : runtime.macro("flip_screen")), (__L1 ? __L1() : runtime.macro("flip_screen")), sx, ((sy) + (((((16) * (i))) * (dir)))), 15);
                            }
                        }
                    }
                }
            }
            function method__1942_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["palette.set_pen_indirect"], __L2 = __l["set_pen_indirect"];
                let __t0, __t1, __t2;
                (runtime.overrides["create_palette"] ? runtime.overrides["create_palette"](palette) : method_create_palette(runtime, palette));
                let colorbase = ((0) | 0);
                let charlut_prom = (__t0 = __deref__1942_palette(runtime, (__L0 ? __L0("charprom") : runtime.macro("memregion", "charprom"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("charprom") : runtime.macro("memregion", "charprom")), "base"));
                let charlut_prom$s = undefined, charlut_prom$o = 0;
                if (ArrayBuffer.isView(charlut_prom) || Array.isArray(charlut_prom))
                    charlut_prom$s = charlut_prom;
                else if (charlut_prom !== null && typeof charlut_prom === 'object' && charlut_prom.generatedPointer === true && charlut_prom.path === undefined && charlut_prom.target === undefined && (ArrayBuffer.isView(charlut_prom.source) || Array.isArray(charlut_prom.source))) {
                    charlut_prom$s = charlut_prom.source;
                    charlut_prom$o = charlut_prom.offset;
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L1 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L2))(((colorbase) + (i)), ((128) | ((charlut_prom$s !== undefined ? (charlut_prom$s[charlut_prom$o + (i)] ?? 0) : runtime.readIndex(charlut_prom, i)))));
                }
                colorbase = ((((colorbase) + (256))) | 0);
                let tilelut_prom = (__t1 = __deref__1942_palette(runtime, (__L0 ? __L0("tileprom") : runtime.macro("memregion", "tileprom"))), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container((__L0 ? __L0("tileprom") : runtime.macro("memregion", "tileprom")), "base"));
                let tilelut_prom$s = undefined, tilelut_prom$o = 0;
                if (ArrayBuffer.isView(tilelut_prom) || Array.isArray(tilelut_prom))
                    tilelut_prom$s = tilelut_prom;
                else if (tilelut_prom !== null && typeof tilelut_prom === 'object' && tilelut_prom.generatedPointer === true && tilelut_prom.path === undefined && tilelut_prom.target === undefined && (ArrayBuffer.isView(tilelut_prom.source) || Array.isArray(tilelut_prom.source))) {
                    tilelut_prom$s = tilelut_prom.source;
                    tilelut_prom$o = tilelut_prom.offset;
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L1 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L2))(((((colorbase) + (0))) + (i)), ((0) | ((tilelut_prom$s !== undefined ? (tilelut_prom$s[tilelut_prom$o + (i)] ?? 0) : runtime.readIndex(tilelut_prom, i)))));
                    (__L1 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L2))(((((colorbase) + (256))) + (i)), ((16) | ((tilelut_prom$s !== undefined ? (tilelut_prom$s[tilelut_prom$o + (i)] ?? 0) : runtime.readIndex(tilelut_prom, i)))));
                    (__L1 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L2))(((((colorbase) + (512))) + (i)), ((32) | ((tilelut_prom$s !== undefined ? (tilelut_prom$s[tilelut_prom$o + (i)] ?? 0) : runtime.readIndex(tilelut_prom, i)))));
                    (__L1 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L2))(((((colorbase) + (768))) + (i)), ((48) | ((tilelut_prom$s !== undefined ? (tilelut_prom$s[tilelut_prom$o + (i)] ?? 0) : runtime.readIndex(tilelut_prom, i)))));
                }
                colorbase = ((((colorbase) + (1024))) | 0);
                let sprlut_prom = (__t2 = __deref__1942_palette(runtime, (__L0 ? __L0("sprprom") : runtime.macro("memregion", "sprprom"))), typeof __t2.base === 'function' ? (__t2.base() ?? 0) : runtime.container((__L0 ? __L0("sprprom") : runtime.macro("memregion", "sprprom")), "base"));
                let sprlut_prom$s = undefined, sprlut_prom$o = 0;
                if (ArrayBuffer.isView(sprlut_prom) || Array.isArray(sprlut_prom))
                    sprlut_prom$s = sprlut_prom;
                else if (sprlut_prom !== null && typeof sprlut_prom === 'object' && sprlut_prom.generatedPointer === true && sprlut_prom.path === undefined && sprlut_prom.target === undefined && (ArrayBuffer.isView(sprlut_prom.source) || Array.isArray(sprlut_prom.source))) {
                    sprlut_prom$s = sprlut_prom.source;
                    sprlut_prom$o = sprlut_prom.offset;
                }
                for (let i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L1 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L2))(((colorbase) + (i)), ((64) | ((sprlut_prom$s !== undefined ? (sprlut_prom$s[sprlut_prom$o + (i)] ?? 0) : runtime.readIndex(sprlut_prom, i)))));
                }
            }
            function __deref__1942_palette(runtime, p) {
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
            function method_create_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"];
                let __t0;
                let color_prom = (__t0 = __deref_create_palette(runtime, (__L0 ? __L0("palproms") : runtime.macro("memregion", "palproms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("palproms") : runtime.macro("memregion", "palproms")), "base"));
                let color_prom$s = undefined, color_prom$o = 0;
                if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom))
                    color_prom$s = color_prom;
                else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) {
                    color_prom$s = color_prom.source;
                    color_prom$o = color_prom.offset;
                }
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (0)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (0))))) >>> (0)) & 1)) | 0);
                    let bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (0)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (0))))) >>> (1)) & 1)) | 0);
                    let bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (0)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (0))))) >>> (2)) & 1)) | 0);
                    let bit3 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (0)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (0))))) >>> (3)) & 1)) | 0);
                    let r = ((__add_create_palette(runtime, __add_create_palette(runtime, __add_create_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (256)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (256))))) >>> (0)) & 1)) | 0);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (256)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (256))))) >>> (1)) & 1)) | 0);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (256)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (256))))) >>> (2)) & 1)) | 0);
                    bit3 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (256)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (256))))) >>> (3)) & 1)) | 0);
                    let g = ((__add_create_palette(runtime, __add_create_palette(runtime, __add_create_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (512)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (512))))) >>> (0)) & 1)) | 0);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (512)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (512))))) >>> (1)) & 1)) | 0);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (512)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (512))))) >>> (2)) & 1)) | 0);
                    bit3 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((i) + (512)))] ?? 0) : runtime.readIndex(color_prom, ((i) + (512))))) >>> (3)) & 1)) | 0);
                    let b = ((__add_create_palette(runtime, __add_create_palette(runtime, __add_create_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
            }
            function __add_create_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_create_palette(runtime, p) {
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
                "scroll_w": method_scroll_w,
                "palette_bank_w": method_palette_bank_w,
                "fgvideoram_w": method_fgvideoram_w,
                "bgvideoram_w": method_bgvideoram_w,
                "get_fg_tile_info": method_get_fg_tile_info,
                "get_bg_tile_info": method_get_bg_tile_info,
                "scanline": method_scanline,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "_1942_palette": method__1942_palette,
                "create_palette": method_create_palette
            };
            return __methodTable;
        })();
        return {
            "_1942_state.scroll_w": methods["scroll_w"],
            "_1942_state.palette_bank_w": methods["palette_bank_w"],
            "_1942_state.fgvideoram_w": methods["fgvideoram_w"],
            "_1942_state.bgvideoram_w": methods["bgvideoram_w"],
            "_1942_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "_1942_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "_1942_state.scanline": methods["scanline"],
            "_1942_state.screen_update": methods["screen_update"],
            "_1942_state.draw_sprites": methods["draw_sprites"],
            "_1942_state._1942_palette": methods["_1942_palette"],
            "_1942_state.create_palette": methods["create_palette"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "flip_screen", "m_audiocpu.set_input_line", "m_bg_tilemap.draw", "m_bg_tilemap.mark_all_dirty", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_maincpu.set_input_line_and_vector", "mark_all_dirty", "mark_tile_dirty", "memregion", "palette.set_indirect_color", "palette.set_pen_indirect", "rectangle", "rgb_t", "set", "set_indirect_color", "set_pen_indirect", "set_scrollx", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
