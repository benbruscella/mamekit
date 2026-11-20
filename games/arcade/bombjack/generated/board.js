// GENERATED executable machine composition from src/mame/tecmo/bombjack.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bombjack');
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
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                if (((Number(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset)) !== Number(data)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
                }
            }
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                if (((Number(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offset)) !== Number(data)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
                }
            }
            function method_spritectrl_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                data = ((((data) & (15))) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_spritectrl"), offset, data);
            }
            function method_background_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                data = ((data) & 0xff);
                data = ((((data) & (31))) & 0xff);
                if (((Number((members.m_bg_image ?? runtime.member("m_bg_image"))) !== Number(data)) ? 1 : 0)) {
                    members.m_bg_image = ((data) & 0xff);
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
                }
            }
            function method_nmi_on_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                data = ((data) & 0xff);
                data = (((((data) >>> (0)) & 1)) & 0xff);
                if (((data) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
                }
                members.m_nmi_on = ((data) ? 1 : 0);
            }
            function method_flip_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_flip"], __L1 = __l["set_flip"], __L2 = __l["m_fg_tilemap.set_flip"];
                data = ((data) & 0xff);
                members.m_flip = (((((data) >>> (0)) & 1)) ? 1 : 0);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_flip", 0, __L1))((((members.m_flip ?? runtime.member("m_flip"))) ? (3) : (0)));
                (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "set_flip", 0, __L1))((((members.m_flip ?? runtime.member("m_flip"))) ? (3) : (0)));
            }
            function method_watchdog_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_watchdog.watchdog_enable"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_watchdog, "watchdog_enable", 0, undefined))((((data) >>> (0)) & 1));
            }
            function method_soundlatch_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_soundlatch.read"], __L1 = __l["machine"], __L2 = __l["machine().side_effects_disabled"], __L3 = __l["m_soundlatch.clear_w"];
                let __t0, __t1;
                let res = (((__L0 ?? runtime.memberCall(members.m_soundlatch, "read", 0, undefined))()) & 0xff);
                if (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__L3 ?? runtime.memberCall(members.m_soundlatch, "clear_w", 0, undefined))();
                }
                return res;
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                const h_m_bgmaps = members.m_bgmaps ?? runtime.member("m_bgmaps");
                tile_index = ((tile_index) | ((((((members.m_bg_image ?? runtime.member("m_bg_image"))) & (15))) << (9))));
                let attr = ((runtime.readIndex(h_m_bgmaps, ((tile_index) + (256)))) & 0xff);
                let code = ((runtime.readIndex(h_m_bgmaps, tile_index)) & 0xffff);
                let color = ((0) & 0xff);
                let flipx = ((0) ? 1 : 0);
                let flipy = ((0) ? 1 : 0);
                (runtime.overrides["set_bg_tile_info"] ? runtime.overrides["set_bg_tile_info"](attr, code, ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), flipx, ({ generatedLValue: true, get: () => flipy, set: (value) => { flipy = ((value) ? 1 : 0); } })) : method_set_bg_tile_info(runtime, attr, code, ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), flipx, ({ generatedLValue: true, get: () => flipy, set: (value) => { flipy = ((value) ? 1 : 0); } })));
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(1, code, color, ((((flipx) ? (1) : (0))) | (((flipy) ? (2) : (0)))));
            }
            function method_set_bg_tile_info(runtime, attr, code, color, flipx, flipy) {
                const members = runtime.members;
                attr = ((attr) & 0xff);
                color.set(((((attr) & (15))) & 0xff));
                flipy.set((((((attr) >>> (7)) & 1)) ? 1 : 0));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let attr = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & 0xff);
                let code = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & 0xffff);
                let color = ((0) & 0xff);
                let flipx = ((0) ? 1 : 0);
                let flipy = ((0) ? 1 : 0);
                (runtime.overrides["set_fg_tile_info"] ? runtime.overrides["set_fg_tile_info"](attr, ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), flipx, flipy) : method_set_fg_tile_info(runtime, attr, ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), flipx, flipy));
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, ((((flipx) ? (1) : (0))) | (((flipy) ? (2) : (0)))));
            }
            function method_set_fg_tile_info(runtime, attr, code, color, flipx, flipy) {
                const members = runtime.members;
                attr = ((attr) & 0xff);
                code.set(((((code.get()) | ((((((attr) >>> (4)) & 1)) << (8))))) & 0xffff));
                color.set((((((attr) >>> (0)) & ((1 << (4)) - 1))) & 0xff));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["bitmap.fill"], __L1 = __l["fill"], __L2 = __l["m_bg_tilemap.draw"], __L3 = __l["draw"], __L4 = __l["m_fg_tilemap.draw"];
                (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(0, cliprect);
                if (((((members.m_bg_image ?? runtime.member("m_bg_image"))) >>> (4)) & 1)) {
                    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 0, 0);
                }
                (__L4 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let max = ((31) | 0);
                let fill = ((runtime.divide(384, 16)) | 0);
                for (let sprite = ((max) | 0); ((Number(sprite) > Number(((max) - (fill)))) ? 1 : 0); sprite = ((((sprite) - (1))) | 0)) {
                    let offs = ((((sprite) * (4))) | 0);
                    let code = ((runtime.readIndex(h_m_spriteram, offs)) | 0);
                    let attr = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
                    let color = ((((attr) & (15))) | 0);
                    let flipx = (((((attr) >>> (6)) & 1)) ? 1 : 0);
                    let flipy = (((((attr) >>> (7)) & 1)) ? 1 : 0);
                    let ypos = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
                    let xpos = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
                    let large = (((runtime.overrides["large_sprite"] ? runtime.overrides["large_sprite"](runtime.shiftRight(sprite, 1), attr) : method_large_sprite(runtime, runtime.shiftRight(sprite, 1), attr))) ? 1 : 0);
                    if (large) {
                        if ((((sprite) >>> (0)) & 1)) {
                            continue;
                        }
                        else {
                            code = ((((code) | (64))) | 0);
                        }
                    }
                    let vpos = ((((large) ? (224) : (240))) | 0);
                    ypos = ((((((vpos) + (1))) - (ypos))) | 0);
                    if ((members.m_flip ?? runtime.member("m_flip"))) {
                        xpos = ((((vpos) - (xpos))) | 0);
                        ypos = ((((vpos) - (ypos))) | 0);
                        flipx = ((((flipx) ? 0 : 1)) ? 1 : 0);
                        flipy = ((((flipy) ? 0 : 1)) ? 1 : 0);
                    }
                    runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((large) ? (3) : (2))), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, xpos, ypos, 0);
                }
            }
            function method_large_sprite(runtime, index, attr) {
                const members = runtime.members;
                attr = ((attr) & 0xff);
                let rev = ((((((Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), 0)) > Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), 1))) ? 1 : 0)) ? (1) : (0))) & 0xff);
                return (((((Number(index) > Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), rev))) ? 1 : 0)) && (((Number(index) <= Number(runtime.readIndex((members.m_spritectrl ?? runtime.member("m_spritectrl")), ((rev) ^ (1))))) ? 1 : 0))) ? 1 : 0);
            }
            function method_vblank_nmi(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if ((((state) && ((members.m_nmi_on ?? runtime.member("m_nmi_on")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
                }
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "videoram_w": method_videoram_w,
                "colorram_w": method_colorram_w,
                "spritectrl_w": method_spritectrl_w,
                "background_w": method_background_w,
                "nmi_on_w": method_nmi_on_w,
                "flip_w": method_flip_w,
                "watchdog_w": method_watchdog_w,
                "soundlatch_r": method_soundlatch_r,
                "get_bg_tile_info": method_get_bg_tile_info,
                "get_fg_tile_info": method_get_fg_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "large_sprite": method_large_sprite,
                "vblank_nmi": method_vblank_nmi
            };
            return __methodTable;
        })();
        return {
            "bombjack_state.videoram_w": methods["videoram_w"],
            "bombjack_state.colorram_w": methods["colorram_w"],
            "bombjack_state.spritectrl_w": methods["spritectrl_w"],
            "bombjack_state.background_w": methods["background_w"],
            "bombjack_state.nmi_on_w": methods["nmi_on_w"],
            "bombjack_state.flip_w": methods["flip_w"],
            "bombjack_state.watchdog_w": methods["watchdog_w"],
            "bombjack_state.soundlatch_r": methods["soundlatch_r"],
            "bombjack_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "bombjack_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "bombjack_state.screen_update": methods["screen_update"],
            "bombjack_state.draw_sprites": methods["draw_sprites"],
            "bombjack_state.large_sprite": methods["large_sprite"],
            "bombjack_state.vblank_nmi": methods["vblank_nmi"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "draw", "fill", "m_bg_tilemap.draw", "m_bg_tilemap.mark_all_dirty", "m_bg_tilemap.set_flip", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_fg_tilemap.set_flip", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_soundlatch.clear_w", "m_soundlatch.read", "m_watchdog.watchdog_enable", "machine", "machine().side_effects_disabled", "mark_all_dirty", "mark_tile_dirty", "set", "set_flip", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
