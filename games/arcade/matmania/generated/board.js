// GENERATED executable machine composition from src/mame/technos/matmania.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'matmania');
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
            function method_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t"], __L1 = __l["m_palette.set_pen_color"];
                data = ((data) & 0xff);
                let bit0 = ((0) | 0);
                let bit1 = ((0) | 0);
                let bit2 = ((0) | 0);
                let bit3 = ((0) | 0);
                let val = ((0) | 0);
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                offset = ((offset) & (15));
                val = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) | 0);
                bit0 = (((((val) >>> (0)) & 1)) | 0);
                bit1 = (((((val) >>> (1)) & 1)) | 0);
                bit2 = (((((val) >>> (2)) & 1)) | 0);
                bit3 = (((((val) >>> (3)) & 1)) | 0);
                let r = ((__add_paletteram_w(runtime, __add_paletteram_w(runtime, __add_paletteram_w(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                val = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (16)))) | 0);
                bit0 = (((((val) >>> (0)) & 1)) | 0);
                bit1 = (((((val) >>> (1)) & 1)) | 0);
                bit2 = (((((val) >>> (2)) & 1)) | 0);
                bit3 = (((((val) >>> (3)) & 1)) | 0);
                let g = ((__add_paletteram_w(runtime, __add_paletteram_w(runtime, __add_paletteram_w(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                val = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (32)))) | 0);
                bit0 = (((((val) >>> (0)) & 1)) | 0);
                bit1 = (((((val) >>> (1)) & 1)) | 0);
                bit2 = (((((val) >>> (2)) & 1)) | 0);
                bit3 = (((((val) >>> (3)) & 1)) | 0);
                let b = ((__add_paletteram_w(runtime, __add_paletteram_w(runtime, __add_paletteram_w(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) + (64)), (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
            }
            function __add_paletteram_w(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_sound_nmi_enable_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_sound_nmi_enable = (((((((data) >>> (0)) & 1)) ? 1 : 0)) ? 1 : 0);
            }
            function method_scanline(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.pulse_input_line"];
                let scanline = ((param) | 0);
                if (((((members.m_sound_nmi_enable ?? runtime.member("m_sound_nmi_enable"))) && ((((scanline) < (256)) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_audiocpu, "pulse_input_line", 0, undefined))(-1, 0);
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tmpbitmap[0].cliprect"], __L1 = __l["cliprect"], __L2 = __l["m_gfxdecode.gfx"], __L3 = __l["m_tmpbitmap[1].cliprect"], __L4 = __l["copyscrollbitmap"];
                let __t0, __t1;
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                const h_m_colorram = members.m_colorram ?? runtime.member("m_colorram");
                const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
                const h_m_pageselect = members.m_pageselect ?? runtime.member("m_pageselect");
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                for (let offs = ((runtime.subtract(runtime.container(runtime.readIndex(h_m_videoram, 0), "bytes"), 1)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (1))) | 0)) {
                    let sx = ((((15) - (runtime.divide(offs, 32)))) | 0);
                    let sy = ((((offs) % (32))) | 0);
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "opaque", 0, undefined)(__deref_screen_update(runtime, runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 0)), (__L0 ?? runtime.memberCall(runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 0), "cliprect", 0, __L1))(), __add_screen_update(runtime, runtime.readIndex(runtime.readIndex(h_m_videoram, 0), offs), ((((runtime.readIndex(runtime.readIndex(h_m_colorram, 0), offs)) & (8))) << (5))), runtime.shiftRight(((runtime.readIndex(runtime.readIndex(h_m_colorram, 0), offs)) & (48)), 4), 0, (((sy) >= (16)) ? 1 : 0), ((16) * (sx)), ((16) * (sy)));
                }
                for (let offs = ((runtime.subtract(runtime.container(runtime.readIndex(h_m_videoram, 2), "bytes"), 1)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (1))) | 0)) {
                    let sx = ((((15) - (runtime.divide(offs, 32)))) | 0);
                    let sy = ((((offs) % (32))) | 0);
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "opaque", 0, undefined)(__deref_screen_update(runtime, runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 1)), (__L3 ?? runtime.memberCall(runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 1), "cliprect", 0, __L1))(), __add_screen_update(runtime, runtime.readIndex(runtime.readIndex(h_m_videoram, 2), offs), ((((runtime.readIndex(runtime.readIndex(h_m_colorram, 2), offs)) & (8))) << (5))), runtime.shiftRight(((runtime.readIndex(runtime.readIndex(h_m_colorram, 2), offs)) & (48)), 4), 0, (((sy) >= (16)) ? 1 : 0), ((16) * (sx)), ((16) * (sy)));
                }
                let scrolly = (((-__deref_screen_update(runtime, h_m_scroll))) | 0);
                if (((runtime.readIndex(h_m_pageselect, 0)) & (1))) {
                    (__L4 ? __L4(bitmap, __deref_screen_update(runtime, runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 1)), 0, 0, 1, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => scrolly, set: (value) => { scrolly = ((value) | 0); } }), offset: 0 }), cliprect) : runtime.macro("copyscrollbitmap", bitmap, __deref_screen_update(runtime, runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 1)), 0, 0, 1, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => scrolly, set: (value) => { scrolly = ((value) | 0); } }), offset: 0 }), cliprect));
                }
                else {
                    (__L4 ? __L4(bitmap, __deref_screen_update(runtime, runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 0)), 0, 0, 1, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => scrolly, set: (value) => { scrolly = ((value) | 0); } }), offset: 0 }), cliprect) : runtime.macro("copyscrollbitmap", bitmap, __deref_screen_update(runtime, runtime.readIndex((members.m_tmpbitmap ?? runtime.member("m_tmpbitmap")), 0)), 0, 0, 1, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => scrolly, set: (value) => { scrolly = ((value) | 0); } }), offset: 0 }), cliprect));
                }
                for (let offs = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_spriteram, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    if (((runtime.readIndex(h_m_spriteram, offs)) & (1))) {
                        runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "transpen", 0, undefined)(bitmap, cliprect, __add_screen_update(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (1))), ((((runtime.readIndex(h_m_spriteram, offs)) & (240))) << (4))), runtime.shiftRight(((runtime.readIndex(h_m_spriteram, offs)) & (8)), 3), ((runtime.readIndex(h_m_spriteram, offs)) & (4)), ((runtime.readIndex(h_m_spriteram, offs)) & (2)), ((239) - (runtime.readIndex(h_m_spriteram, ((offs) + (3))))), ((((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (2)))))) & (255)), 0);
                    }
                }
                for (let offs = ((runtime.subtract(runtime.container(runtime.readIndex(h_m_videoram, 1), "bytes"), 1)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (1))) | 0)) {
                    let sx = ((((31) - (runtime.divide(offs, 32)))) | 0);
                    let sy = ((((offs) % (32))) | 0);
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, __add_screen_update(runtime, runtime.readIndex(runtime.readIndex(h_m_videoram, 1), offs), ((256) * (((runtime.readIndex(runtime.readIndex(h_m_colorram, 1), offs)) & (7))))), runtime.shiftRight(((runtime.readIndex(runtime.readIndex(h_m_colorram, 1), offs)) & (48)), 4), 0, 0, ((8) * (sx)), ((8) * (sy)), 0);
                }
                return 0;
            }
            function __add_screen_update(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_screen_update(runtime, p) {
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
            function method_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_pen_color"], __L3 = __l["set_pen_color"];
                let __t0;
                let color_prom = (__t0 = __deref_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                for (let i = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    let bit3 = ((0) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, 0)) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, 0)) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, 0)) >>> (2)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, 0)) >>> (3)) & 1)) | 0);
                    let r = ((__add_palette(runtime, __add_palette(runtime, __add_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, 0)) >>> (4)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, 0)) >>> (5)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, 0)) >>> (6)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, 0)) >>> (7)) & 1)) | 0);
                    let g = ((__add_palette(runtime, __add_palette(runtime, __add_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, 64)) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, 64)) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, 64)) >>> (2)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, 64)) >>> (3)) & 1)) | 0);
                    let b = ((__add_palette(runtime, __add_palette(runtime, __add_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_pen_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                    color_prom = __add_palette(runtime, color_prom, 1);
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
                "paletteram_w": method_paletteram_w,
                "sound_nmi_enable_w": method_sound_nmi_enable_w,
                "scanline": method_scanline,
                "screen_update": method_screen_update,
                "palette": method_palette
            };
            return __methodTable;
        })();
        return {
            "matmania_state.paletteram_w": methods["paletteram_w"],
            "matmania_state.sound_nmi_enable_w": methods["sound_nmi_enable_w"],
            "matmania_state.scanline": methods["scanline"],
            "matmania_state.screen_update": methods["screen_update"],
            "matmania_state.palette": methods["palette"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["cliprect", "copyscrollbitmap", "m_audiocpu.pulse_input_line", "m_gfxdecode.gfx", "m_palette.set_pen_color", "m_tmpbitmap[0].cliprect", "m_tmpbitmap[1].cliprect", "memregion", "palette.set_pen_color", "rgb_t", "set_pen_color"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
