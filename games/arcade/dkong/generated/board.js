// GENERATED executable machine composition from src/mame/nintendo/dkong.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'dkong');
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
            function method_dkong_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                if (((Number(runtime.readIndex((members.m_video_ram ?? runtime.member("m_video_ram")), offset)) !== Number(data)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_video_ram"), offset, data);
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
                }
            }
            function method_radarscp_grid_color_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_grid_col = ((((((data) & (7))) ^ (7))) & 0xffff);
            }
            function method_dkong_audio_irq_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_soundcpu.set_input_line"];
                data = ((data) & 0xff);
                if (data) {
                    (__L0 ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 1);
                }
                else {
                    (__L0 ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_radarscp_grid_enable_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_grid_on = ((((data) & (1))) & 0xff);
            }
            function method_dkong_flipscreen_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_flip = ((((data) & (1))) & 0xff);
            }
            function method_dkong_spritebank_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_sprite_bank = ((((data) & (1))) & 0xff);
            }
            function method_nmi_mask_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                data = ((data) & 0xff);
                members.m_nmi_mask = ((((data) & (1))) & 0xff);
                if ((((members.m_nmi_mask ?? runtime.member("m_nmi_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
                }
            }
            function method_dkong_palettebank_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                data = ((data) & 0xff);
                let newbank = ((0) | 0);
                newbank = (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) | 0);
                if (((data) & (1))) {
                    newbank = ((((newbank) | (((1) << (offset))))) | 0);
                }
                else {
                    newbank = ((((newbank) & ((~((1) << (offset)))))) | 0);
                }
                if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(newbank)) ? 1 : 0)) {
                    members.m_palette_bank = ((newbank) & 0xff);
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
                }
            }
            function method_dkong_tune_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_dev_vp2.read"], __L1 = __l["m_ls175_3d.read"];
                const h_m_snd_rom = members.m_snd_rom ?? runtime.member("m_snd_rom");
                let page = (((((__L0 ?? runtime.memberCall(members.m_dev_vp2, "read", 0, undefined))(0)) & (71))) & 0xff);
                if (((page) & (64))) {
                    return (((((__L1 ?? runtime.memberCall(members.m_ls175_3d, "read", 0, undefined))(0)) & (15))) | ((((runtime.overrides["dkong_voice_status_r"] ? runtime.overrides["dkong_voice_status_r"]() : method_dkong_voice_status_r(runtime))) << (4))));
                }
                else {
                    return runtime.readIndex(h_m_snd_rom, ((__add_dkong_tune_r(runtime, 4096, ((((page) & (7))) * (256)))) + (offset)));
                }
            }
            function __add_dkong_tune_r(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_dkong_voice_status_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            function method_dkong_voice_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                0;
            }
            function method_dkong_p1_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_discrete.write"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741880, data);
            }
            function method_scanline_callback(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["m_screen.time_until_pos"], __L3 = __l["m_scanline_timer.adjust"], __L4 = __l["adjust"];
                let __t0;
                let scanline = ((param) | 0);
                if ((((((Number((members.m_hardware_type ?? runtime.member("m_hardware_type"))) === Number(2)) ? 1 : 0)) || (((Number((members.m_hardware_type ?? runtime.member("m_hardware_type"))) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.overrides["radarscp_scanline"] ? runtime.overrides["radarscp_scanline"](scanline) : method_radarscp_scanline(runtime, scanline));
                }
                (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                scanline = ((((((scanline) + (1))) % (264))) | 0);
                (__L3 ?? runtime.memberCall(members.m_scanline_timer, "adjust", 0, __L4))((__L2 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(scanline), scanline);
            }
            function method_radarscp_scanline(runtime, scanline) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.visible_area"], __L1 = __l["m_screen.width"];
                let __t0, __t1;
                const h_m_bg_bits = members.m_bg_bits ?? runtime.member("m_bg_bits");
                let table = (members.m_gfx3 ?? runtime.member("m_gfx3"));
                let table$s = undefined, table$o = 0;
                if (ArrayBuffer.isView(table) || Array.isArray(table))
                    table$s = table;
                else if (table !== null && typeof table === 'object' && table.generatedPointer === true && table.path === undefined && table.target === undefined && (ArrayBuffer.isView(table.source) || Array.isArray(table.source))) {
                    table$s = table.source;
                    table$o = table.offset;
                }
                let table_len = (((members.m_gfx3_len ?? runtime.member("m_gfx3_len"))) | 0);
                let visarea = (__L0 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))();
                let y = ((scanline) | 0);
                runtime.invoke("radarscp_step", y);
                if ((((((Number(y) <= Number(visarea.min_y)) ? 1 : 0)) || (((Number(y) > Number(visarea.max_y)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_counter = ((0) | 0);
                }
                let offset = (((((((members.m_flip ?? runtime.member("m_flip"))) ^ ((members.m_rflip_sig ?? runtime.member("m_rflip_sig"))))) ? (0) : (1024))) | 0);
                let x = ((0) | 0);
                while (((Number(x) < Number((__L1 ?? runtime.memberCall(members.m_screen, "width", 0, undefined))())) ? 1 : 0)) {
                    let pixel = h_m_bg_bits["pix&"](y, x);
                    let pixel$s = undefined, pixel$o = 0;
                    if (ArrayBuffer.isView(pixel) || Array.isArray(pixel))
                        pixel$s = pixel;
                    else if (pixel !== null && typeof pixel === 'object' && pixel.generatedPointer === true && pixel.path === undefined && pixel.target === undefined && (ArrayBuffer.isView(pixel.source) || Array.isArray(pixel.source))) {
                        pixel$s = pixel.source;
                        pixel$o = pixel.offset;
                    }
                    if ((((((Number((members.m_counter ?? runtime.member("m_counter"))) < Number(table_len)) ? 1 : 0)) && (((Number(x) === Number(((4) * ((((table$s !== undefined ? (table$s[table$o + ((((members.m_counter ?? runtime.member("m_counter"))) | (offset)))] ?? 0) : runtime.readIndex(table, (((members.m_counter ?? runtime.member("m_counter"))) | (offset))))) & (127)))))) ? 1 : 0))) ? 1 : 0)) {
                        if (((((members.m_star_ff ?? runtime.member("m_star_ff"))) && ((((table$s !== undefined ? (table$s[table$o + ((((members.m_counter ?? runtime.member("m_counter"))) | (offset)))] ?? 0) : runtime.readIndex(table, (((members.m_counter ?? runtime.member("m_counter"))) | (offset))))) & (128)))) ? 1 : 0)) {
                            runtime.pointerStore(pixel, 520);
                        }
                        else {
                            if (((((members.m_grid_sig ?? runtime.member("m_grid_sig"))) && ((((((table$s !== undefined ? (table$s[table$o + ((((members.m_counter ?? runtime.member("m_counter"))) | (offset)))] ?? 0) : runtime.readIndex(table, (((members.m_counter ?? runtime.member("m_counter"))) | (offset))))) & (128))) ? 0 : 1))) ? 1 : 0)) {
                                runtime.pointerStore(pixel, __add_radarscp_scanline(runtime, 512, (members.m_grid_col ?? runtime.member("m_grid_col"))));
                            }
                            else {
                                runtime.pointerStore(pixel, __add_radarscp_scanline(runtime, 256, (members.m_blue_level ?? runtime.member("m_blue_level"))));
                            }
                        }
                        members.m_counter = ((((members.m_counter) + (1))) | 0);
                    }
                    else {
                        runtime.pointerStore(pixel, __add_radarscp_scanline(runtime, 256, (members.m_blue_level ?? runtime.member("m_blue_level"))));
                    }
                    x = ((((x) + (1))) | 0);
                }
                while ((((((Number((members.m_counter ?? runtime.member("m_counter"))) < Number(table_len)) ? 1 : 0)) && (((Number(x) < Number(((4) * ((((table$s !== undefined ? (table$s[table$o + ((((members.m_counter ?? runtime.member("m_counter"))) | (offset)))] ?? 0) : runtime.readIndex(table, (((members.m_counter ?? runtime.member("m_counter"))) | (offset))))) & (127)))))) ? 1 : 0))) ? 1 : 0)) {
                    members.m_counter = ((((members.m_counter) + (1))) | 0);
                }
            }
            function __add_radarscp_scanline(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_CD4049(runtime, x) {
                const members = runtime.members;
                if ((((x) > (0)) ? 1 : 0)) {
                    return Math.exp(Number((((-(members.m_cd4049_a ?? runtime.member("m_cd4049_a")))) * (Math.pow(Number(x), Number((members.m_cd4049_b ?? runtime.member("m_cd4049_b"))))))));
                }
                else {
                    return 1;
                }
            }
            function method_dkong_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let code = ((__add_dkong_bg_tile_info(runtime, runtime.readIndex((members.m_video_ram ?? runtime.member("m_video_ram")), tile_index), ((256) * ((members.m_gfx_bank ?? runtime.member("m_gfx_bank")))))) | 0);
                let color = ((__add_dkong_bg_tile_info(runtime, ((runtime.readIndex((members.m_color_codes ?? runtime.member("m_color_codes")), __add_dkong_bg_tile_info(runtime, ((tile_index) % (32)), ((32) * (runtime.divide(runtime.divide(tile_index, 32), 4)))))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))))) | 0);
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, 0);
            }
            function __add_dkong_bg_tile_info(runtime, a, b) {
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
                (__L1 ?? runtime.memberCall(prog_space, "write_byte", 0, __L2))(offset, data);
            }
            function method_p8257_ctl_r(runtime) {
                const members = runtime.members;
                return (members.m_dma_latch ?? runtime.member("m_dma_latch"));
            }
            function method_p8257_ctl_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_dma_latch = ((data) & 0xff);
            }
            function method_screen_update_dkong(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine().tilemap().set_flip_all"], __L1 = __l["m_bg_tilemap.draw"], __L2 = __l["draw"], __L3 = __l["fatalerror"];
                ((__L0 ?? globalThis.mamekitMissingCall?.("machine().tilemap().set_flip_all"))?.((((members.m_flip ?? runtime.member("m_flip"))) ? (3) : (0))) ?? 0);
                switch ((members.m_hardware_type ?? runtime.member("m_hardware_type"))) {
                    case (members.HARDWARE_TKG02 ?? runtime.member("HARDWARE_TKG02")):
                    case (members.HARDWARE_TKG04 ?? runtime.member("HARDWARE_TKG04")):
                        {
                            (runtime.overrides["check_palette"] ? runtime.overrides["check_palette"]() : method_check_palette(runtime));
                            (__L1 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L2))(screen, bitmap, cliprect, 0, 0);
                            (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 64, 1) : method_draw_sprites(runtime, bitmap, cliprect, 64, 1));
                            break;
                        }
                    case (members.HARDWARE_TRS01 ?? runtime.member("HARDWARE_TRS01")):
                    case (members.HARDWARE_TRS02 ?? runtime.member("HARDWARE_TRS02")):
                        {
                            (__L1 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L2))(screen, bitmap, cliprect, 0, 0);
                            (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 64, 1) : method_draw_sprites(runtime, bitmap, cliprect, 64, 1));
                            runtime.invoke("radarscp_draw_background", bitmap, cliprect);
                            break;
                        }
                    default:
                        {
                            (__L3 ? __L3("Invalid hardware type in dkong_video_update\n") : runtime.macro("fatalerror", "Invalid hardware type in dkong_video_update\n"));
                        }
                }
                return 0;
            }
            function method_check_palette(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"], __L1 = __l["port.read"], __L2 = __l["read"];
                let __t0;
                const h_m_palette = members.m_palette ?? runtime.member("m_palette");
                let port = 0;
                let newset = ((0) | 0);
                port = (__L0 ? __L0("VIDHW") : runtime.macro("ioport", "VIDHW"));
                if (((port) ? 1 : 0)) {
                    newset = (((__L1 ?? runtime.memberCall(port, "read", 0, __L2))()) | 0);
                    if (((Number(newset) !== Number((members.m_vidhw ?? runtime.member("m_vidhw")))) ? 1 : 0)) {
                        members.m_vidhw = ((newset) << 24 >> 24);
                        switch (newset) {
                            case (members.DKONG_RADARSCP_CONVERSION ?? runtime.member("DKONG_RADARSCP_CONVERSION")):
                                {
                                    runtime.invoke("radarscp_palette", __deref_check_palette(runtime, h_m_palette));
                                    break;
                                }
                            case (members.DKONG_BOARD ?? runtime.member("DKONG_BOARD")):
                                {
                                    (runtime.overrides["dkong2b_palette"] ? runtime.overrides["dkong2b_palette"](__deref_check_palette(runtime, h_m_palette)) : method_dkong2b_palette(runtime, __deref_check_palette(runtime, h_m_palette)));
                                    break;
                                }
                        }
                    }
                }
            }
            function __deref_check_palette(runtime, p) {
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
            function method_dkong2b_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["palette.set_pen_colors"], __L2 = __l["set_pen_colors"], __L3 = __l["palette.set_pen_color"], __L4 = __l["set_pen_color"], __L5 = __l["palette.palette"], __L6 = __l["palette"];
                let __t0, __t1;
                const h_dkong_decode_info = members.dkong_decode_info ?? runtime.member("dkong_decode_info");
                const h_dkong_net_info = members.dkong_net_info ?? runtime.member("dkong_net_info");
                const h_dkong_net_bck_info = members.dkong_net_bck_info ?? runtime.member("dkong_net_bck_info");
                let color_prom = (__t0 = __deref_dkong2b_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let rgb = [];
                (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_dkong_decode_info, h_dkong_net_info) : method_compute_res_net_all(runtime, rgb, color_prom, h_dkong_decode_info, h_dkong_net_info));
                (__L1 ?? runtime.memberCall(palette, "set_pen_colors", 0, __L2))(0, rgb);
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((Number(((i) & (3))) === Number(0)) ? 1 : 0)) {
                        let r = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](1, 0, h_dkong_net_bck_info) : method_compute_res_net(runtime, 1, 0, h_dkong_net_bck_info))) | 0);
                        let g = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](1, 1, h_dkong_net_bck_info) : method_compute_res_net(runtime, 1, 1, h_dkong_net_bck_info))) | 0);
                        let b = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](1, 2, h_dkong_net_bck_info) : method_compute_res_net(runtime, 1, 2, h_dkong_net_bck_info))) | 0);
                        (__L3 ?? runtime.memberCall(palette, "set_pen_color", 0, __L4))(i, r, g, b);
                    }
                }
                runtime.memberCall((__L5 ?? runtime.memberCall(palette, "palette", 0, __L6))(), "normalize_range", 0, undefined)(0, 255);
                color_prom = __add_dkong2b_palette(runtime, color_prom, 512);
                members.m_color_codes = color_prom;
            }
            function __add_dkong2b_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_dkong2b_palette(runtime, p) {
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
            function method_draw_sprites(runtime, bitmap, cliprect, mask_bank, shift_bits) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_gfxdecode.gfx"];
                const h_m_sprite_ram = members.m_sprite_ram ?? runtime.member("m_sprite_ram");
                let offs = ((0) | 0);
                let scanline_vf = ((0) | 0);
                let scanline_vfc = ((0) | 0);
                let scanline = ((0) | 0);
                let add_y = ((0) | 0);
                let add_x = ((0) | 0);
                let num_sprt = ((0) | 0);
                scanline_vf = ((((runtime.subtract(cliprect.max_y, 1)) & (255))) | 0);
                scanline_vfc = ((((runtime.subtract(cliprect.max_y, 1)) & (255))) | 0);
                scanline = ((((cliprect.max_y) & (255))) | 0);
                if ((members.m_flip ?? runtime.member("m_flip"))) {
                    scanline_vf = ((((scanline_vf) ^ (255))) | 0);
                    scanline_vfc = ((((scanline_vfc) ^ (255))) | 0);
                    add_y = ((247) | 0);
                    add_x = ((247) | 0);
                }
                else {
                    add_y = ((249) | 0);
                    add_x = ((247) | 0);
                }
                for (offs = (((((members.m_sprite_bank ?? runtime.member("m_sprite_bank"))) << (9))) | 0), num_sprt = ((0) | 0); ((((((num_sprt) < (16)) ? 1 : 0)) && (((Number(offs) < Number(__add_draw_sprites(runtime, (((members.m_sprite_bank ?? runtime.member("m_sprite_bank"))) << (9)), 512))) ? 1 : 0))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    let y = ((runtime.readIndex(h_m_sprite_ram, offs)) | 0);
                    let do_draw = ((((((Number(((((__add_draw_sprites(runtime, ((y) + (add_y)), 1)) + (scanline_vf))) & (240))) === Number(240)) ? 1 : 0)) ? (1) : (0))) | 0);
                    if (do_draw) {
                        let code = ((__add_draw_sprites(runtime, ((runtime.readIndex(h_m_sprite_ram, ((offs) + (1)))) & (127)), ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (mask_bank))) << (shift_bits)))) | 0);
                        let color = ((__add_draw_sprites(runtime, ((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))))) | 0);
                        let flipx = ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (128))) | 0);
                        let flipy = ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (1)))) & (128))) | 0);
                        let x = ((((__add_draw_sprites(runtime, ((runtime.readIndex(h_m_sprite_ram, ((offs) + (3)))) + (add_x)), 1)) & (255))) | 0);
                        if ((members.m_flip ?? runtime.member("m_flip"))) {
                            x = ((((((x) ^ (255))) - (15))) | 0);
                            flipx = ((((flipx) ? 0 : 1)) | 0);
                        }
                        y = ((((scanline) - (((((__add_draw_sprites(runtime, ((y) + (add_y)), 1)) + (scanline_vfc))) & (15))))) | 0);
                        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, x, y, 0);
                        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, (((members.m_flip ?? runtime.member("m_flip"))) ? (((x) + (256))) : (((x) - (256)))), y, 0);
                        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, x, ((y) - (256)), 0);
                        num_sprt = ((((num_sprt) + (1))) | 0);
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
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if ((((state) && ((members.m_nmi_mask ?? runtime.member("m_nmi_mask")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
                }
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "dkong_videoram_w": method_dkong_videoram_w,
                "radarscp_grid_color_w": method_radarscp_grid_color_w,
                "dkong_audio_irq_w": method_dkong_audio_irq_w,
                "radarscp_grid_enable_w": method_radarscp_grid_enable_w,
                "dkong_flipscreen_w": method_dkong_flipscreen_w,
                "dkong_spritebank_w": method_dkong_spritebank_w,
                "nmi_mask_w": method_nmi_mask_w,
                "dkong_palettebank_w": method_dkong_palettebank_w,
                "dkong_tune_r": method_dkong_tune_r,
                "dkong_voice_status_r": method_dkong_voice_status_r,
                "dkong_voice_w": method_dkong_voice_w,
                "dkong_p1_w": method_dkong_p1_w,
                "scanline_callback": method_scanline_callback,
                "radarscp_scanline": method_radarscp_scanline,
                "CD4049": method_CD4049,
                "dkong_bg_tile_info": method_dkong_bg_tile_info,
                "memory_read_byte": method_memory_read_byte,
                "memory_write_byte": method_memory_write_byte,
                "p8257_ctl_r": method_p8257_ctl_r,
                "p8257_ctl_w": method_p8257_ctl_w,
                "screen_update_dkong": method_screen_update_dkong,
                "check_palette": method_check_palette,
                "compute_res_net": method_compute_res_net,
                "dkong2b_palette": method_dkong2b_palette,
                "compute_res_net_all": method_compute_res_net_all,
                "draw_sprites": method_draw_sprites,
                "vblank_irq": method_vblank_irq
            };
            return __methodTable;
        })();
        return {
            "dkong_state.dkong_videoram_w": methods["dkong_videoram_w"],
            "dkong_state.radarscp_grid_color_w": methods["radarscp_grid_color_w"],
            "dkong_state.dkong_audio_irq_w": methods["dkong_audio_irq_w"],
            "dkong_state.radarscp_grid_enable_w": methods["radarscp_grid_enable_w"],
            "dkong_state.dkong_flipscreen_w": methods["dkong_flipscreen_w"],
            "dkong_state.dkong_spritebank_w": methods["dkong_spritebank_w"],
            "dkong_state.nmi_mask_w": methods["nmi_mask_w"],
            "dkong_state.dkong_palettebank_w": methods["dkong_palettebank_w"],
            "dkong_state.dkong_tune_r": methods["dkong_tune_r"],
            "dkong_state.dkong_voice_status_r": methods["dkong_voice_status_r"],
            "dkong_state.dkong_voice_w": methods["dkong_voice_w"],
            "dkong_state.dkong_p1_w": methods["dkong_p1_w"],
            "dkong_state.scanline_callback": methods["scanline_callback"],
            "dkong_state.radarscp_scanline": methods["radarscp_scanline"],
            "dkong_state.CD4049": methods["CD4049"],
            "dkong_state.dkong_bg_tile_info": methods["dkong_bg_tile_info"],
            "dkong_state.memory_read_byte": methods["memory_read_byte"],
            "dkong_state.memory_write_byte": methods["memory_write_byte"],
            "dkong_state.p8257_ctl_r": methods["p8257_ctl_r"],
            "dkong_state.p8257_ctl_w": methods["p8257_ctl_w"],
            "dkong_state.screen_update_dkong": methods["screen_update_dkong"],
            "dkong_state.check_palette": methods["check_palette"],
            "dkong_state.compute_res_net": methods["compute_res_net"],
            "dkong_state.dkong2b_palette": methods["dkong2b_palette"],
            "dkong_state.compute_res_net_all": methods["compute_res_net_all"],
            "dkong_state.draw_sprites": methods["draw_sprites"],
            "dkong_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust", "draw", "fatalerror", "ioport", "m_bg_tilemap.draw", "m_bg_tilemap.mark_all_dirty", "m_bg_tilemap.mark_tile_dirty", "m_dev_vp2.read", "m_discrete.write", "m_gfxdecode.gfx", "m_ls175_3d.read", "m_maincpu.set_input_line", "m_maincpu.space", "m_scanline_timer.adjust", "m_screen.time_until_pos", "m_screen.update_partial", "m_screen.visible_area", "m_screen.vpos", "m_screen.width", "m_soundcpu.set_input_line", "machine().tilemap().set_flip_all", "mark_all_dirty", "mark_tile_dirty", "memregion", "palette", "palette.palette", "palette.set_pen_color", "palette.set_pen_colors", "port.read", "prog_space.read_byte", "prog_space.write_byte", "read", "read_byte", "rgb_t", "set", "set_pen_color", "set_pen_colors", "tileinfo.set", "write_byte"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
