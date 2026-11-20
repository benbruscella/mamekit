// GENERATED executable machine composition from src/mame/galaxian/galaxian.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'galaxian');
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
            function method_lfo_freq_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_discrete.write"];
                data = ((data) & 0xff);
                let lfo_val_new = (((((((members.m_lfo_val ?? runtime.member("m_lfo_val"))) & ((~((1) << (offset)))))) | (((((data) & (1))) << (offset))))) & 0xff);
                if (((Number((members.m_lfo_val ?? runtime.member("m_lfo_val"))) !== Number(lfo_val_new)) ? 1 : 0)) {
                    members.m_lfo_val = lfo_val_new;
                    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741904, (members.m_lfo_val ?? runtime.member("m_lfo_val")));
                }
            }
            function method_sound_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                data = ((((data) & (1))) & 0xff);
                switch (((offset) & (7))) {
                    case 0:
                    case 1:
                    case 2:
                        {
                            (runtime.overrides["background_enable_w"] ? runtime.overrides["background_enable_w"](offset, data) : method_background_enable_w(runtime, offset, data));
                            break;
                        }
                    case 3:
                        {
                            (runtime.overrides["noise_enable_w"] ? runtime.overrides["noise_enable_w"](data) : method_noise_enable_w(runtime, data));
                            break;
                        }
                    case 4:
                        {
                            break;
                        }
                    case 5:
                        {
                            (runtime.overrides["fire_enable_w"] ? runtime.overrides["fire_enable_w"](data) : method_fire_enable_w(runtime, data));
                            break;
                        }
                    case 6:
                    case 7:
                        {
                            (runtime.overrides["vol_w"] ? runtime.overrides["vol_w"](((offset) & (1)), data) : method_vol_w(runtime, ((offset) & (1)), data));
                            break;
                        }
                }
            }
            function method_background_enable_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["NODE_RELATIVE"], __L1 = __l["m_discrete.write"];
                data = ((data) & 0xff);
                (__L1 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))((__L0 ? __L0(1073741984, offset) : runtime.macro("NODE_RELATIVE", 1073741984, offset)), ((data) & (1)));
            }
            function method_noise_enable_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_discrete.write"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073742008, ((data) & (1)));
            }
            function method_fire_enable_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_discrete.write"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073742024, ((data) & (1)));
            }
            function method_vol_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["NODE_RELATIVE"], __L1 = __l["m_discrete.write"];
                data = ((data) & 0xff);
                (__L1 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))((__L0 ? __L0(1073742032, offset) : runtime.macro("NODE_RELATIVE", 1073742032, offset)), ((data) & (1)));
            }
            function method_galaxian_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_bg_tilemap.mark_tile_dirty"], __L3 = __l["mark_tile_dirty"];
                let __t0;
                data = ((data) & 0xff);
                (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L3))(offset);
            }
            function method_galaxian_objram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_bg_tilemap.set_scrolly"], __L3 = __l["set_scrolly"], __L4 = __l["m_bg_tilemap.set_scrollx"], __L5 = __l["set_scrollx"], __L6 = __l["m_bg_tilemap.mark_tile_dirty"], __L7 = __l["mark_tile_dirty"];
                let __t0;
                data = ((data) & 0xff);
                const h_m_frogger_adjust = members.m_frogger_adjust ?? runtime.member("m_frogger_adjust");
                const h_m_sfx_adjust = members.m_sfx_adjust ?? runtime.member("m_sfx_adjust");
                const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
                (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
                if ((((offset) < (64)) ? 1 : 0)) {
                    if (((Number(((offset) & (1))) === Number(0)) ? 1 : 0)) {
                        if (h_m_frogger_adjust) {
                            data = ((((((data) >>> (4))) | (((data) << (4))))) & 0xff);
                        }
                        if (((h_m_sfx_adjust) ? 0 : 1)) {
                            (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(((offset) >>> (1)), data);
                        }
                        else {
                            (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L5))(((offset) >>> (1)), ((h_m_x_scale) * (data)));
                        }
                    }
                    else {
                        for (offset = ((offset) >>> (1)); (((offset) < (1024)) ? 1 : 0); offset = ((offset) + (32))) {
                            (__L6 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L7))(offset);
                        }
                    }
                }
            }
            function method_start_lamp_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_lamps"), offset, (((data) >>> (0)) & 1));
            }
            function method_irq_enable_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                data = ((data) & 0xff);
                const h_m_irq_line = members.m_irq_line ?? runtime.member("m_irq_line");
                members.m_irq_enabled = ((((data) & (1))) & 0xff);
                if ((((members.m_irq_enabled ?? runtime.member("m_irq_enabled"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(h_m_irq_line, 0);
                }
            }
            function method_galaxian_stars_enable_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_screen.hpos"], __L3 = __l["m_screen.frame_number"];
                let __t0, __t1, __t2, __t3;
                data = ((data) & 0xff);
                if ((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) ^ (data))) & (1))) {
                    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                }
                if (((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) ? 0 : 1)) && (((data) & (1)))) ? 1 : 0)) {
                    members.m_star_rng_origin = ((((131071) - (__add_galaxian_stars_enable_w(runtime, (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) * (512)), (__L2 ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))())))) >>> 0);
                    members.m_star_rng_origin_frame = (((__L3 ?? runtime.memberCall(members.m_screen, "frame_number", 0, undefined))()) >>> 0);
                }
                members.m_stars_enabled = ((((data) & (1))) & 0xff);
            }
            function __add_galaxian_stars_enable_w(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_galaxian_flip_screen_x_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_bg_tilemap.set_flip"], __L3 = __l["set_flip"];
                let __t0;
                data = ((data) & 0xff);
                if (((Number((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) !== Number(((data) & (1)))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                    (runtime.overrides["stars_update_origin"] ? runtime.overrides["stars_update_origin"]() : method_stars_update_origin(runtime));
                    members.m_flipscreen_x = ((((data) & (1))) & 0xff);
                    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_flip", 0, __L3))((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0)))));
                }
            }
            function method_stars_update_origin(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.frame_number"];
                let __t0;
                let curframe = (((__L0 ?? runtime.memberCall(members.m_screen, "frame_number", 0, undefined))()) | 0);
                if (((Number(curframe) !== Number((members.m_star_rng_origin_frame ?? runtime.member("m_star_rng_origin_frame")))) ? 1 : 0)) {
                    let per_frame_delta = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (-1))) | 0);
                    let total_delta = ((((per_frame_delta) * (((curframe) - ((members.m_star_rng_origin_frame ?? runtime.member("m_star_rng_origin_frame"))))))) | 0);
                    while ((((total_delta) < (0)) ? 1 : 0)) {
                        total_delta = ((((total_delta) + (131071))) | 0);
                    }
                    members.m_star_rng_origin = (((((((members.m_star_rng_origin ?? runtime.member("m_star_rng_origin"))) + (total_delta))) % (131071))) >>> 0);
                    members.m_star_rng_origin_frame = ((curframe) >>> 0);
                }
            }
            function method_galaxian_flip_screen_y_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_bg_tilemap.set_flip"], __L3 = __l["set_flip"];
                let __t0;
                data = ((data) & 0xff);
                if (((Number((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) !== Number(((data) & (1)))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                    members.m_flipscreen_y = ((((data) & (1))) & 0xff);
                    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_flip", 0, __L3))((((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (1) : (0))) | ((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (2) : (0)))));
                }
            }
            function method_bg_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_extend_tile_info_ptr"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let videoram = (members.m_videoram ?? runtime.member("m_videoram"));
                let videoram$s = undefined, videoram$o = 0;
                if (ArrayBuffer.isView(videoram) || Array.isArray(videoram))
                    videoram$s = videoram;
                else if (videoram !== null && typeof videoram === 'object' && videoram.generatedPointer === true && videoram.path === undefined && videoram.target === undefined && (ArrayBuffer.isView(videoram.source) || Array.isArray(videoram.source))) {
                    videoram$s = videoram.source;
                    videoram$o = videoram.offset;
                }
                let x = ((((tile_index) & (31))) & 0xff);
                let y = ((runtime.shiftRight(tile_index, 5)) & 0xff);
                let code = (((videoram$s !== undefined ? (videoram$s[videoram$o + (tile_index)] ?? 0) : runtime.readIndex(videoram, tile_index))) & 0xffff);
                let attrib = ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), __add_bg_get_tile_info(runtime, ((x) * (2)), 1))) & 0xff);
                let color = ((((attrib) & (7))) & 0xff);
                (__L0 ? __L0(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) & 0xffff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), offset: 0 }), attrib, x, y) : runtime.macro("m_extend_tile_info_ptr", ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) & 0xffff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), offset: 0 }), attrib, x, y));
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, code, color, 0);
            }
            function __add_bg_get_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_sprites_draw(runtime, screen, bitmap, cliprect, spritebase) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_extend_sprite_info_ptr"], __L1 = __l["m_gfxdecode.gfx"];
                const h_m_frogger_adjust = members.m_frogger_adjust ?? runtime.member("m_frogger_adjust");
                const h_m_sfx_adjust = members.m_sfx_adjust ?? runtime.member("m_sfx_adjust");
                const h_m_h0_start = members.m_h0_start ?? runtime.member("m_h0_start");
                const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                (clip = method_sprites_clip(runtime, screen, clip));
                for (let sprnum = ((7) | 0); (((sprnum) >= (0)) ? 1 : 0); sprnum = ((((sprnum) - (1))) | 0)) {
                    let base = __addr_sprites_draw(runtime, spritebase, ((sprnum) * (4)));
                    let base$s = undefined, base$o = 0;
                    if (ArrayBuffer.isView(base) || Array.isArray(base))
                        base$s = base;
                    else if (base !== null && typeof base === 'object' && base.generatedPointer === true && base.path === undefined && base.target === undefined && (ArrayBuffer.isView(base.source) || Array.isArray(base.source))) {
                        base$s = base.source;
                        base$o = base.offset;
                    }
                    let base0 = ((((h_m_frogger_adjust) ? (((runtime.shiftRight((base$s !== undefined ? (base$s[base$o + (0)] ?? 0) : runtime.readIndex(base, 0)), 4)) | ((((base$s !== undefined ? (base$s[base$o + (0)] ?? 0) : runtime.readIndex(base, 0))) << (4))))) : ((base$s !== undefined ? (base$s[base$o + (0)] ?? 0) : runtime.readIndex(base, 0))))) & 0xff);
                    let sy = ((((240) - (((base0) - (((h_m_sfx_adjust) ? ((((sprnum) >= (3)) ? 1 : 0)) : ((((sprnum) < (3)) ? 1 : 0)))))))) & 0xff);
                    let code = (((((base$s !== undefined ? (base$s[base$o + (1)] ?? 0) : runtime.readIndex(base, 1))) & (63))) & 0xffff);
                    let flipx = (((((base$s !== undefined ? (base$s[base$o + (1)] ?? 0) : runtime.readIndex(base, 1))) & (64))) & 0xff);
                    let flipy = (((((base$s !== undefined ? (base$s[base$o + (1)] ?? 0) : runtime.readIndex(base, 1))) & (128))) & 0xff);
                    let color = (((((base$s !== undefined ? (base$s[base$o + (2)] ?? 0) : runtime.readIndex(base, 2))) & (7))) & 0xff);
                    let hoffset = ((1) | 0);
                    let sx = (((((base$s !== undefined ? (base$s[base$o + (3)] ?? 0) : runtime.readIndex(base, 3))) + (hoffset))) & 0xff);
                    (__L0 ? __L0(base, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx, set: (value) => { sx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy, set: (value) => { sy = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => flipx, set: (value) => { flipx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => flipy, set: (value) => { flipy = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) & 0xffff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), offset: 0 })) : runtime.macro("m_extend_sprite_info_ptr", base, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx, set: (value) => { sx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy, set: (value) => { sy = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => flipx, set: (value) => { flipx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => flipy, set: (value) => { flipy = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => code, set: (value) => { code = ((value) & 0xffff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => color, set: (value) => { color = ((value) & 0xff); } }), offset: 0 })));
                    if ((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) {
                        sx = ((((240) - (sx))) & 0xff);
                        flipx = ((((flipx) ? 0 : 1)) & 0xff);
                    }
                    if ((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) {
                        sy = ((((240) - (sy))) & 0xff);
                        flipy = ((((flipy) ? 0 : 1)) & 0xff);
                    }
                    runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, clip, code, color, flipx, flipy, __add_sprites_draw(runtime, h_m_h0_start, ((h_m_x_scale) * (sx))), sy, 0);
                }
            }
            function __add_sprites_draw(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_sprites_draw(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_sprites_clip(runtime, screen, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["screen.visible_area"], __L1 = __l["visible_area"];
                let __t0;
                const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ?? runtime.memberCall(screen, "visible_area", 0, __L1))());
                if ((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) {
                    clip.max_x = ((((239) * (h_m_x_scale))) - (1));
                }
                else {
                    clip.min_x = ((17) * (h_m_x_scale));
                }
                cliprect = runtime.andAssign(cliprect, clip);
                return cliprect;
            }
            function method_bullets_draw(runtime, screen, bitmap, cliprect, base) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_draw_bullet_ptr"];
                for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let shell = ((255) & 0xff);
                    let missile = ((255) & 0xff);
                    let effy = ((0) & 0xff);
                    effy = (((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (((((y) - (1))) ^ (255))) : (((y) - (1))))) & 0xff);
                    for (let which = ((0) | 0); (((which) < (3)) ? 1 : 0); which = ((((which) + (1))) | 0)) {
                        if ((((((((runtime.readIndex(base, __add_bullets_draw(runtime, ((which) * (4)), 1))) + (effy))) & 0xff)) === (255)) ? 1 : 0)) {
                            shell = ((which) & 0xff);
                        }
                    }
                    effy = (((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (((y) ^ (255))) : (y))) & 0xff);
                    for (let which = ((3) | 0); (((which) < (8)) ? 1 : 0); which = ((((which) + (1))) | 0)) {
                        if ((((((((runtime.readIndex(base, __add_bullets_draw(runtime, ((which) * (4)), 1))) + (effy))) & 0xff)) === (255)) ? 1 : 0)) {
                            if ((((which) !== (7)) ? 1 : 0)) {
                                shell = ((which) & 0xff);
                            }
                            else {
                                missile = ((which) & 0xff);
                            }
                        }
                    }
                    if ((((shell) !== (255)) ? 1 : 0)) {
                        (__L0 ? __L0(bitmap, cliprect, shell, ((255) - (runtime.readIndex(base, __add_bullets_draw(runtime, ((shell) * (4)), 3)))), y) : runtime.macro("m_draw_bullet_ptr", bitmap, cliprect, shell, ((255) - (runtime.readIndex(base, __add_bullets_draw(runtime, ((shell) * (4)), 3)))), y));
                    }
                    if ((((missile) !== (255)) ? 1 : 0)) {
                        (__L0 ? __L0(bitmap, cliprect, missile, ((255) - (runtime.readIndex(base, __add_bullets_draw(runtime, ((missile) * (4)), 3)))), y) : runtime.macro("m_draw_bullet_ptr", bitmap, cliprect, missile, ((255) - (runtime.readIndex(base, __add_bullets_draw(runtime, ((missile) * (4)), 3)))), y));
                    }
                }
            }
            function __add_bullets_draw(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_vblank_interrupt_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                const h_m_irq_line = members.m_irq_line ?? runtime.member("m_irq_line");
                if ((((state) && ((members.m_irq_enabled ?? runtime.member("m_irq_enabled")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(h_m_irq_line, 1);
                }
            }
            function method_galaxian_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_pen_color"], __L3 = __l["set_pen_color"];
                let __t0;
                let color_prom = (__t0 = __deref_galaxian_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let color_prom$s = undefined, color_prom$o = 0;
                if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom))
                    color_prom$s = color_prom;
                else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) {
                    color_prom$s = color_prom.source;
                    color_prom$o = color_prom.offset;
                }
                let rgb_resistances = [1000, 470, 220];
                let rweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let gweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let bweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 224, (-1), 3, __addr_galaxian_palette(runtime, rgb_resistances, 0), rweights, 470, 0, 3, __addr_galaxian_palette(runtime, rgb_resistances, 0), gweights, 470, 0, 2, __addr_galaxian_palette(runtime, rgb_resistances, 1), bweights, 470, 0) : method_compute_resistor_weights(runtime, 0, 224, (-1), 3, __addr_galaxian_palette(runtime, rgb_resistances, 0), rweights, 470, 0, 3, __addr_galaxian_palette(runtime, rgb_resistances, 0), gweights, 470, 0, 2, __addr_galaxian_palette(runtime, rgb_resistances, 1), bweights, 470, 0));
                let len = ((runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "bytes")) | 0);
                for (let i = ((0) | 0); (((i) < (len)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) & 0xff);
                    let bit1 = ((0) & 0xff);
                    let bit2 = ((0) & 0xff);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (0)) & 1)) & 0xff);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (1)) & 1)) & 0xff);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (2)) & 1)) & 0xff);
                    let r = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](rweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, rweights, bit0, bit1, bit2))) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (3)) & 1)) & 0xff);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (4)) & 1)) & 0xff);
                    bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (5)) & 1)) & 0xff);
                    let g = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](gweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, gweights, bit0, bit1, bit2))) | 0);
                    bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (6)) & 1)) & 0xff);
                    bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (7)) & 1)) & 0xff);
                    let b = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](bweights, bit0, bit1) : method_combine_weights__int__2(runtime, bweights, bit0, bit1))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_pen_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
                let minval = ((runtime.divide(29120, 150)) | 0);
                let midval = ((runtime.divide(29120, 100)) | 0);
                let maxval = ((runtime.divide(29120, 60)) | 0);
                let starmap = [0, minval, ((minval) + (runtime.divide(((((255) - (minval))) * (((midval) - (minval)))), ((maxval) - (minval))))), 255];
                for (let i = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) & 0xff);
                    let bit1 = ((0) & 0xff);
                    bit0 = (((((i) >>> (5)) & 1)) & 0xff);
                    bit1 = (((((i) >>> (4)) & 1)) & 0xff);
                    let r = (((starmap[((((bit1) << (1))) | (bit0))] ?? 0)) | 0);
                    bit0 = (((((i) >>> (3)) & 1)) & 0xff);
                    bit1 = (((((i) >>> (2)) & 1)) & 0xff);
                    let g = (((starmap[((((bit1) << (1))) | (bit0))] ?? 0)) | 0);
                    bit0 = (((((i) >>> (1)) & 1)) & 0xff);
                    bit1 = (((((i) >>> (0)) & 1)) & 0xff);
                    let b = (((starmap[((((bit1) << (1))) | (bit0))] ?? 0)) | 0);
                    runtime.writeIndex(runtime.writableMember("m_star_color"), i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
                for (let i = ((0) | 0); (((i) < (7)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    runtime.writeIndex(runtime.writableMember("m_bullet_color"), i, 4294967295);
                }
                runtime.writeIndex(runtime.writableMember("m_bullet_color"), 7, 4278255615);
            }
            function __addr_galaxian_palette(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_galaxian_palette(runtime, p) {
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
            function method_galaxian_draw_stars(runtime, bitmap, cliprect, maxx) {
                const members = runtime.members;
                (runtime.overrides["stars_update_origin"] ? runtime.overrides["stars_update_origin"]() : method_stars_update_origin(runtime));
                if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
                    for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        let star_offs = ((__add_galaxian_draw_stars(runtime, (members.m_star_rng_origin ?? runtime.member("m_star_rng_origin")), ((y) * (512)))) >>> 0);
                        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, maxx, y, star_offs, 255) : method_stars_draw_row(runtime, bitmap, maxx, y, star_offs, 255));
                    }
                }
            }
            function __add_galaxian_draw_stars(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_stars_draw_row(runtime, bitmap, maxx, y, star_offs, starmask) {
                const members = runtime.members;
                let __t0, __t1;
                starmask = ((starmask) & 0xff);
                const h_m_x_scale = members.m_x_scale ?? runtime.member("m_x_scale");
                star_offs = ((((star_offs) % (131071))) >>> 0);
                for (let x = ((0) | 0); (((x) < (maxx)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    let enable_star = ((((((y) ^ (runtime.shiftRight(x, 3)))) & (1))) | 0);
                    let star = ((0) & 0xff);
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t0 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t0))) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if (((((((enable_star) && (((Number(((star) & (128))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(((star) & (starmask))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((h_m_x_scale) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t1 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t1))) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if (((((((enable_star) && (((Number(((star) & (128))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(((star) & (starmask))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((h_m_x_scale) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((h_m_x_scale) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                }
            }
            function __add_stars_draw_row(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "lfo_freq_w": method_lfo_freq_w,
                "sound_w": method_sound_w,
                "background_enable_w": method_background_enable_w,
                "noise_enable_w": method_noise_enable_w,
                "fire_enable_w": method_fire_enable_w,
                "vol_w": method_vol_w,
                "galaxian_videoram_w": method_galaxian_videoram_w,
                "galaxian_objram_w": method_galaxian_objram_w,
                "start_lamp_w": method_start_lamp_w,
                "irq_enable_w": method_irq_enable_w,
                "galaxian_stars_enable_w": method_galaxian_stars_enable_w,
                "galaxian_flip_screen_x_w": method_galaxian_flip_screen_x_w,
                "stars_update_origin": method_stars_update_origin,
                "galaxian_flip_screen_y_w": method_galaxian_flip_screen_y_w,
                "bg_get_tile_info": method_bg_get_tile_info,
                "sprites_draw": method_sprites_draw,
                "bullets_draw": method_bullets_draw,
                "vblank_interrupt_w": method_vblank_interrupt_w,
                "galaxian_palette": method_galaxian_palette,
                "compute_resistor_weights": method_compute_resistor_weights,
                "combine_weights__int__3": method_combine_weights__int__3,
                "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
                "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
                "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
                "combine_weights__int__2": method_combine_weights__int__2,
                "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
                "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0,
                "galaxian_draw_stars": method_galaxian_draw_stars,
                "stars_draw_row": method_stars_draw_row
            };
            return __methodTable;
        })();
        return {
            "galaxian_state.galaxian_videoram_w": methods["galaxian_videoram_w"],
            "galaxian_state.galaxian_objram_w": methods["galaxian_objram_w"],
            "galaxian_state.start_lamp_w": methods["start_lamp_w"],
            "galaxian_state.irq_enable_w": methods["irq_enable_w"],
            "galaxian_state.galaxian_stars_enable_w": methods["galaxian_stars_enable_w"],
            "galaxian_state.galaxian_flip_screen_x_w": methods["galaxian_flip_screen_x_w"],
            "galaxian_state.stars_update_origin": methods["stars_update_origin"],
            "galaxian_state.galaxian_flip_screen_y_w": methods["galaxian_flip_screen_y_w"],
            "galaxian_state.bg_get_tile_info": methods["bg_get_tile_info"],
            "galaxian_state.sprites_draw": methods["sprites_draw"],
            "galaxian_state.bullets_draw": methods["bullets_draw"],
            "galaxian_state.vblank_interrupt_w": methods["vblank_interrupt_w"],
            "galaxian_state.galaxian_palette": methods["galaxian_palette"],
            "galaxian_state.compute_resistor_weights": methods["compute_resistor_weights"],
            "galaxian_state.combine_weights__int__3": methods["combine_weights__int__3"],
            "galaxian_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
            "galaxian_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
            "galaxian_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
            "galaxian_state.combine_weights__int__2": methods["combine_weights__int__2"],
            "galaxian_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
            "galaxian_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
            "galaxian_state.galaxian_draw_stars": methods["galaxian_draw_stars"],
            "galaxian_state.stars_draw_row": methods["stars_draw_row"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["NODE_RELATIVE", "fatalerror", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_flip", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_discrete.write", "m_draw_bullet_ptr", "m_extend_sprite_info_ptr", "m_extend_tile_info_ptr", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_screen.frame_number", "m_screen.hpos", "m_screen.update_partial", "m_screen.vpos", "mark_tile_dirty", "memregion", "palette.set_pen_color", "rgb_t", "screen.visible_area", "set", "set_flip", "set_pen_color", "set_scrollx", "set_scrolly", "std::clamp", "tileinfo.set", "visible_area"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
