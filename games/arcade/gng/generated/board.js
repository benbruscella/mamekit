// GENERATED executable machine composition from src/mame/capcom/gng.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gng');
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
            function method_fgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
            }
            function method_bgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
            }
            function method_bgscrollx_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_scrollx"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, __add_bgscrollx_w(runtime, runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1)))));
            }
            function __add_bgscrollx_w(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_bgscrolly_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrolly"], __L1 = __l["set_scrolly"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_scrolly"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L1))(0, __add_bgscrolly_w(runtime, runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 0), ((256) * (runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 1)))));
            }
            function __add_bgscrolly_w(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_bankswitch_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mainbank.set_entry"], __L1 = __l["set_entry"];
                data = ((data) & 0xff);
                if ((((data) === (4)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L1))(4);
                }
                else {
                    (__L0 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L1))(((data) & (3)));
                }
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let attr = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (1024)))) & 0xff);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, __add_get_fg_tile_info(runtime, runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (15)), (__L0 ? __L0(runtime.shiftRight(((attr) & (48)), 4)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (48)), 4))));
            }
            function __add_get_fg_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let attr = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (1024)))) & 0xff);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(1, __add_get_bg_tile_info(runtime, runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (7)), (__L0 ? __L0(runtime.shiftRight(((attr) & (48)), 4)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (48)), 4))));
                tileinfo.group = runtime.shiftRight(((attr) & (8)), 3);
            }
            function __add_get_bg_tile_info(runtime, a, b) {
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
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"], __L2 = __l["m_fg_tilemap.draw"];
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 32, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 16, 0);
                (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_spriteram.buffer"], __L1 = __l["m_gfxdecode.gfx"], __L2 = __l["m_spriteram.bytes"], __L3 = __l["flip_screen"], __L4 = __l["gfx.transpen"], __L5 = __l["transpen"];
                let __t0, __t1;
                let spriteram = (__L0 ?? runtime.memberCall(members.m_spriteram, "buffer", 0, undefined))();
                let spriteram$s = undefined, spriteram$o = 0;
                if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram))
                    spriteram$s = spriteram;
                else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) {
                    spriteram$s = spriteram.source;
                    spriteram$o = spriteram.offset;
                }
                let gfx = (__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2);
                let gfx$s = undefined, gfx$o = 0;
                if (ArrayBuffer.isView(gfx) || Array.isArray(gfx))
                    gfx$s = gfx;
                else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) {
                    gfx$s = gfx.source;
                    gfx$o = gfx.offset;
                }
                for (let offs = ((runtime.subtract((__L2 ?? runtime.memberCall(members.m_spriteram, "bytes", 0, undefined))(), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    let attributes = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) & 0xff);
                    let sx = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (3)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (3))))) - (((256) * (((attributes) & (1))))))) | 0);
                    let sy = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) | 0);
                    let flipx = ((((attributes) & (4))) | 0);
                    let flipy = ((((attributes) & (8))) | 0);
                    if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                        sx = ((((240) - (sx))) | 0);
                        sy = ((((240) - (sy))) | 0);
                        flipx = ((((flipx) ? 0 : 1)) | 0);
                        flipy = ((((flipy) ? 0 : 1)) | 0);
                    }
                    (__L4 ?? runtime.memberCall(gfx, "transpen", 0, __L5))(bitmap, cliprect, __add_draw_sprites(runtime, (spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs)), ((((attributes) << (2))) & (768))), ((((attributes) >>> (4))) & (3)), flipx, flipy, sx, sy, 15);
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
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "fgvideoram_w": method_fgvideoram_w,
                "bgvideoram_w": method_bgvideoram_w,
                "bgscrollx_w": method_bgscrollx_w,
                "bgscrolly_w": method_bgscrolly_w,
                "bankswitch_w": method_bankswitch_w,
                "get_fg_tile_info": method_get_fg_tile_info,
                "get_bg_tile_info": method_get_bg_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
            return __methodTable;
        })();
        return {
            "gng_state.fgvideoram_w": methods["fgvideoram_w"],
            "gng_state.bgvideoram_w": methods["bgvideoram_w"],
            "gng_state.bgscrollx_w": methods["bgscrollx_w"],
            "gng_state.bgscrolly_w": methods["bgscrolly_w"],
            "gng_state.bankswitch_w": methods["bankswitch_w"],
            "gng_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "gng_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "gng_state.screen_update": methods["screen_update"],
            "gng_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "flip_screen", "gfx.transpen", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_mainbank.set_entry", "m_spriteram.buffer", "m_spriteram.bytes", "mark_tile_dirty", "set", "set_entry", "set_scrollx", "set_scrolly", "tileinfo.set", "transpen"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
