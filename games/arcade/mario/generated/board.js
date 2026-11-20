// GENERATED executable machine composition from src/mame/nintendo/mario.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mario');
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
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_scroll_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrolly"], __L1 = __l["set_scrolly"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L1))(0, ((data) + (17)));
            }
            function method_dac_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audio_dac.write"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_audio_dac, "write", 0, undefined))(data);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let code = ((__add_get_bg_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((256) * ((members.m_gfx_bank ?? runtime.member("m_gfx_bank")))))) | 0);
                let color = ((__add_get_bg_tile_info(runtime, __add_get_bg_tile_info(runtime, 8, runtime.shiftRight(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), 5)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))))) | 0);
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, 0);
            }
            function __add_get_bg_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_memory_read_byte(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.space"], __L1 = __l["prog_space.read_byte"], __L2 = __l["read_byte"];
                let prog_space = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
                return (__L1 ?? runtime.memberCall(prog_space, "read_byte", 0, __L2))(offset);
            }
            function method_memory_write_byte(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.space"], __L1 = __l["prog_space.write_byte"], __L2 = __l["write_byte"];
                data = ((data) & 0xff);
                let prog_space = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
                return (__L1 ?? runtime.memberCall(prog_space, "write_byte", 0, __L2))(offset, data);
            }
            function method_nmi_mask_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_nmi_mask = ((state) ? 1 : 0);
                if (((state) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"];
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let flip = (((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (255) : (0))) & 0xff);
                let offs = ((0) | 0);
                while (((Number(offs) !== Number(runtime.container(members.m_spriteram, "bytes"))) ? 1 : 0)) {
                    if (runtime.readIndex(h_m_spriteram, offs)) {
                        let y = ((((__add_draw_sprites(runtime, __add_draw_sprites(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (0))), ((flip) ? (247) : (249))), 1)) & (255))) | 0);
                        let x = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
                        y = ((((240) - (y))) | 0);
                        y = ((((y) ^ (flip))) | 0);
                        x = ((((x) ^ (flip))) | 0);
                        let code = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
                        let color = ((__add_draw_sprites(runtime, ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))))) | 0);
                        let flipx = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (128))) | 0);
                        let flipy = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (64))) | 0);
                        if (flip) {
                            y = ((((y) - (14))) | 0);
                            x = ((((x) - (7))) | 0);
                            flipx = ((((flipx) ? 0 : 1)) | 0);
                            flipy = ((((flipy) ? 0 : 1)) | 0);
                        }
                        else {
                            y = ((((y) + (1))) | 0);
                            x = ((((x) - (8))) | 0);
                        }
                        runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, x, y, 0);
                    }
                    offs = ((((offs) + (4))) | 0);
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
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if ((((state) && ((members.m_nmi_mask ?? runtime.member("m_nmi_mask")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
                }
            }
            function method_palette(runtime, palette) {
                const members = runtime.members;
                (runtime.overrides["set_palette"] ? runtime.overrides["set_palette"](0) : method_set_palette(runtime, 0));
            }
            function method_set_palette(runtime, monitor) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["m_palette.set_pen_colors"], __L2 = __l["m_palette.palette"];
                let __t0, __t1;
                const h_mario_decode_info = members.mario_decode_info ?? runtime.member("mario_decode_info");
                const h_mario_net_info = members.mario_net_info ?? runtime.member("mario_net_info");
                const h_mario_net_info_std = members.mario_net_info_std ?? runtime.member("mario_net_info_std");
                let color_prom = (__t0 = __deref_set_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let color_prom$s = undefined, color_prom$o = 0;
                if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom))
                    color_prom$s = color_prom;
                else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) {
                    color_prom$s = color_prom.source;
                    color_prom$o = color_prom.offset;
                }
                let rgb = [];
                if ((((monitor) === (0)) ? 1 : 0)) {
                    (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mario_decode_info, h_mario_net_info) : method_compute_res_net_all(runtime, rgb, color_prom, h_mario_decode_info, h_mario_net_info));
                }
                else {
                    (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, __addr_set_palette(runtime, color_prom, 256), h_mario_decode_info, h_mario_net_info_std) : method_compute_res_net_all(runtime, rgb, __addr_set_palette(runtime, color_prom, 256), h_mario_decode_info, h_mario_net_info_std));
                }
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(0, rgb);
                runtime.memberCall((__L2 ?? runtime.memberCall(members.m_palette, "palette", 0, undefined))(), "normalize_range", 0, undefined)(0, 255);
            }
            function __addr_set_palette(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_set_palette(runtime, p) {
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
            function method_compute_res_net_all(runtime, rgb, prom, rdi, di) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t"];
                (rgb = runtime.resize(rgb, __add_compute_res_net_all(runtime, runtime.subtract(rdi.end, rdi.start), 1)));
                for (let i = ((rdi.start) | 0); ((Number(i) <= Number(rdi.end)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let t = [0, 0, 0];
                    for (let j = ((0) | 0); ((Number(j) < Number(rdi.numcomp)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                        for (let k = ((0) | 0); (((k) < (3)) ? 1 : 0); k = ((((k) + (1))) | 0)) {
                            let s = ((runtime.readIndex(rdi.shift, ((((3) * (j))) + (k)))) | 0);
                            if ((((s) > (0)) ? 1 : 0)) {
                                t[k] = (((t[k] ?? 0)) | (((runtime.shiftRight(runtime.readIndex(prom, ((i) + (runtime.readIndex(rdi.offset, ((((3) * (j))) + (k)))))), s)) & (runtime.readIndex(rdi.mask, ((((3) * (j))) + (k)))))));
                            }
                            else {
                                t[k] = (((t[k] ?? 0)) | (((((runtime.readIndex(prom, ((i) + (runtime.readIndex(rdi.offset, ((((3) * (j))) + (k))))))) << (((0) - (s))))) & (runtime.readIndex(rdi.mask, ((((3) * (j))) + (k)))))));
                            }
                        }
                    }
                    let r = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[0] ?? 0), 0, di) : method_compute_res_net(runtime, (t[0] ?? 0), 0, di))) & 0xff);
                    let g = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[1] ?? 0), 1, di) : method_compute_res_net(runtime, (t[1] ?? 0), 1, di))) & 0xff);
                    let b = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[2] ?? 0), 2, di) : method_compute_res_net(runtime, (t[2] ?? 0), 2, di))) & 0xff);
                    runtime.writeIndex(rgb, ((i) - (rdi.start)), (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                }
            }
            function __add_compute_res_net_all(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_compute_res_net(runtime, inputs, channel, di) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["fatalerror"];
                let rTotal = 0;
                let v = 0;
                let vBias = runtime.readIndex(di.rgb, channel).vBias;
                let vOH = di.vOH;
                let vOL = di.vOL;
                let minout = runtime.readIndex(di.rgb, channel).minout;
                let cut = runtime.readIndex(di.rgb, channel).cut;
                let vcc = di.vcc;
                let ttlHRes = 0;
                let rGnd = runtime.readIndex(di.rgb, channel).rGnd;
                let OpenCol = ((di.OpenCol) & 0xff);
                switch (((di.options) & (7))) {
                    case 0:
                        {
                            break;
                        }
                    case 1:
                        {
                            minout = 0;
                            cut = 0;
                            break;
                        }
                    case 2:
                        {
                            minout = 0.9;
                            cut = 0;
                            break;
                        }
                    case 3:
                        {
                            minout = 0;
                            cut = 0.7;
                            break;
                        }
                    case 4:
                        {
                            break;
                        }
                    default:
                        {
                            (__L0 ? __L0("compute_res_net: Unknown amplifier type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown amplifier type\n"));
                        }
                }
                switch (((di.options) & (8))) {
                    case 0:
                        {
                            vcc = 5;
                            break;
                        }
                    case 8:
                        {
                            break;
                        }
                    default:
                        {
                            (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
                        }
                }
                switch (((di.options) & (48))) {
                    case 0:
                        {
                            break;
                        }
                    case 16:
                        {
                            vBias = 5;
                            break;
                        }
                    case 32:
                        {
                            vBias = 4;
                            break;
                        }
                    case 48:
                        {
                            break;
                        }
                    default:
                        {
                            (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
                        }
                }
                switch (((di.options) & (768))) {
                    case 0:
                        {
                            OpenCol = ((1) & 0xff);
                            vOL = 0.05;
                            break;
                        }
                    case 256:
                        {
                            vOL = 0;
                            vOH = vcc;
                            OpenCol = ((0) & 0xff);
                            break;
                        }
                    case 512:
                        {
                            vOL = 0.05;
                            vOH = 4;
                            ttlHRes = 50;
                            OpenCol = ((0) & 0xff);
                            break;
                        }
                    case 768:
                        {
                            break;
                        }
                    default:
                        {
                            (__L0 ? __L0("compute_res_net: Unknown vin type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vin type\n"));
                        }
                }
                switch (((runtime.readIndex(di.rgb, channel).options) & (7))) {
                    case 0:
                        {
                            break;
                        }
                    case 1:
                        {
                            minout = 0;
                            cut = 0;
                            break;
                        }
                    case 2:
                        {
                            minout = 0.7;
                            cut = 0;
                            break;
                        }
                    case 3:
                        {
                            minout = 0;
                            cut = 0.7;
                            break;
                        }
                    case 4:
                        {
                            break;
                        }
                    default:
                        {
                            (__L0 ? __L0("compute_res_net: Unknown amplifier type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown amplifier type\n"));
                        }
                }
                switch (((runtime.readIndex(di.rgb, channel).options) & (48))) {
                    case 0:
                        {
                            break;
                        }
                    case 16:
                        {
                            vBias = 5;
                            break;
                        }
                    case 32:
                        {
                            vBias = 4;
                            break;
                        }
                    case 48:
                        {
                            break;
                        }
                    default:
                        {
                            (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
                        }
                }
                switch (((di.options) & (12288))) {
                    case 4096:
                    case 8192:
                        {
                            break;
                        }
                    case 12288:
                        {
                            if ((((rGnd) !== (0)) ? 1 : 0)) {
                                rGnd = ((((rGnd) * (5600))) / (((rGnd) + (5600))));
                            }
                            else {
                                rGnd = 5600;
                            }
                            break;
                        }
                }
                for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(di.rgb, channel).num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let level = ((((runtime.shiftRight(inputs, i)) & (1))) | 0);
                    if ((((((Number(runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) !== Number(0)) ? 1 : 0)) && (((level) ? 0 : 1))) ? 1 : 0)) {
                        if (OpenCol) {
                            rTotal = ((rTotal) + (((1) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
                            v = ((v) + (((vOL) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
                        }
                        else {
                            rTotal = ((rTotal) + (((1) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
                            v = ((v) + (((vOL) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
                        }
                    }
                }
                if (((Number(runtime.readIndex(di.rgb, channel).rBias) !== Number(0)) ? 1 : 0)) {
                    rTotal = ((rTotal) + (((1) / (runtime.readIndex(di.rgb, channel).rBias))));
                    v = ((v) + (((vBias) / (runtime.readIndex(di.rgb, channel).rBias))));
                }
                if ((((rGnd) !== (0)) ? 1 : 0)) {
                    rTotal = ((rTotal) + (((1) / (rGnd))));
                }
                if (((Number(((di.options) & (768))) === Number(512)) ? 1 : 0)) {
                    if (((Number(((v) / (rTotal))) > Number(vOH)) ? 1 : 0)) {
                        OpenCol = ((1) & 0xff);
                    }
                }
                for (let i = ((0) | 0); ((Number(i) < Number(runtime.readIndex(di.rgb, channel).num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let level = ((((runtime.shiftRight(inputs, i)) & (1))) | 0);
                    if ((((((Number(runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) !== Number(0)) ? 1 : 0)) && (level)) ? 1 : 0)) {
                        if (OpenCol) {
                            rTotal = ((rTotal) + (0));
                            v = ((v) + (0));
                        }
                        else {
                            rTotal = ((rTotal) + (((1) / (((runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) + (ttlHRes))))));
                            v = ((v) + (((vOH) / (((runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) + (ttlHRes))))));
                        }
                    }
                }
                rTotal = ((1) / (rTotal));
                v = ((v) * (rTotal));
                v = cppMax(+(minout), +(((v) - (cut))));
                switch (((di.options) & (12288))) {
                    case 4096:
                        {
                            v = ((vcc) - (v));
                            break;
                        }
                    case 8192:
                        {
                            v = ((vcc) - (v));
                            v = cppMax(+(0), +(((v) - (0.7))));
                            v = cppMin(+(v), +(((vcc) - (((2) * (0.7))))));
                            v = ((v) / (((vcc) - (1.4))));
                            v = ((v) * (vcc));
                            break;
                        }
                    case 12288:
                        {
                            break;
                        }
                }
                return ((__add_compute_res_net(runtime, ((((v) * (255))) / (vcc)), 0.4)) | 0);
            }
            function __add_compute_res_net(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "videoram_w": method_videoram_w,
                "scroll_w": method_scroll_w,
                "dac_w": method_dac_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "memory_read_byte": method_memory_read_byte,
                "memory_write_byte": method_memory_write_byte,
                "nmi_mask_w": method_nmi_mask_w,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "vblank_irq": method_vblank_irq,
                "palette": method_palette,
                "set_palette": method_set_palette,
                "compute_res_net_all": method_compute_res_net_all,
                "compute_res_net": method_compute_res_net
            };
            return __methodTable;
        })();
        return {
            "mario_state.videoram_w": methods["videoram_w"],
            "mario_state.scroll_w": methods["scroll_w"],
            "mario_state.dac_w": methods["dac_w"],
            "mario_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "mario_state.memory_read_byte": methods["memory_read_byte"],
            "mario_state.memory_write_byte": methods["memory_write_byte"],
            "mario_state.nmi_mask_w": methods["nmi_mask_w"],
            "mario_state.screen_update": methods["screen_update"],
            "mario_state.draw_sprites": methods["draw_sprites"],
            "mario_state.vblank_irq": methods["vblank_irq"],
            "mario_state.palette": methods["palette"],
            "mario_state.set_palette": methods["set_palette"],
            "mario_state.compute_res_net_all": methods["compute_res_net_all"],
            "mario_state.compute_res_net": methods["compute_res_net"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw", "fatalerror", "flip_screen", "m_audio_dac.write", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrolly", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_maincpu.space", "m_palette.palette", "m_palette.set_pen_colors", "mark_tile_dirty", "memregion", "prog_space.read_byte", "prog_space.write_byte", "read_byte", "rgb_t", "set", "set_scrolly", "tileinfo.set", "write_byte"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
