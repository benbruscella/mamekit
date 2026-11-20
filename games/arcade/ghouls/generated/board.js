// GENERATED executable machine composition from src/mame/capcom/cps1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'ghouls');
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
            function method_irqack_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_maincpu.set_input_line"], __L3 = __l["m68000_base_device::autovector"];
                if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
                    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(2, 0);
                }
                return (__L3 ? __L3(((offset) + (1))) : runtime.macro("m68000_base_device::autovector", ((offset) + (1))));
            }
            function method_cps1_dsw_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_io_in[0].read"], __L1 = __l["read"];
                let __t0, __t1;
                const h_m_io_in = members.m_io_in ?? runtime.member("m_io_in");
                const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
                let $in = ((255) | 0);
                switch (offset) {
                    case 0:
                        {
                            $in = (((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_io_in, 0), "read", 0, __L1))()) | 0);
                            break;
                        }
                    case 1:
                    case 2:
                    case 3:
                        {
                            $in = (((__t1 = __deref_cps1_dsw_r(runtime, runtime.readIndex(h_m_dsw, ((offset) - (1)))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container(runtime.readIndex(h_m_dsw, ((offset) - (1))), "read"))) | 0);
                            break;
                        }
                }
                return (((($in) << (8))) | (255));
            }
            function __deref_cps1_dsw_r(runtime, p) {
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
            function method_cps1_cps_a_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                data = ((runtime.combineData(__addr_cps1_cps_a_w(runtime, (members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), offset), data, mem_mask)) & 0xffff);
                if (((Number(offset) === Number(5)) ? 1 : 0)) {
                    (runtime.overrides["cps1_build_palette"] ? runtime.overrides["cps1_build_palette"]((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](5, (members.m_palette_align ?? runtime.member("m_palette_align"))) : method_cps1_base(runtime, 5, (members.m_palette_align ?? runtime.member("m_palette_align"))))) : method_cps1_build_palette(runtime, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](5, (members.m_palette_align ?? runtime.member("m_palette_align"))) : method_cps1_base(runtime, 5, (members.m_palette_align ?? runtime.member("m_palette_align"))))));
                }
            }
            function __addr_cps1_cps_a_w(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_cps1_build_palette(runtime, palette_base) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t"], __L1 = __l["m_palette.set_pen_color"];
                let __t0;
                let palette_ram = palette_base;
                let ctrl = ((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(__deref_cps1_build_palette(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).palette_control, 2))) & 0xffff);
                for (let page = ((0) | 0); (((page) < (6)) ? 1 : 0); page = ((((page) + (1))) | 0)) {
                    if ((((ctrl) >>> (page)) & 1)) {
                        for (let offset = ((0) | 0); (((offset) < (512)) ? 1 : 0); offset = ((((offset) + (1))) | 0)) {
                            let palette = ((__deref_cps1_build_palette(runtime, (__t0 = palette_ram, palette_ram = __add_cps1_build_palette(runtime, palette_ram, 1), __t0))) & 0xffff);
                            let bright = ((__add_cps1_build_palette(runtime, 15, ((((palette) >>> (12))) << (1)))) | 0);
                            let r = ((runtime.divide(((((((((palette) >>> (8))) & (15))) * (17))) * (bright)), 45)) | 0);
                            let g = ((runtime.divide(((((((((palette) >>> (4))) & (15))) * (17))) * (bright)), 45)) | 0);
                            let b = ((runtime.divide(((((((((palette) >>> (0))) & (15))) * (17))) * (bright)), 45)) | 0);
                            (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((((512) * (page))) + (offset)), (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                        }
                    }
                    else {
                        if ((runtime.same(palette_ram, palette_base) ? 0 : 1)) {
                            palette_ram = __add_cps1_build_palette(runtime, palette_ram, 512);
                        }
                    }
                }
            }
            function __add_cps1_build_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_cps1_build_palette(runtime, p) {
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
            function method_cps1_base(runtime, offset, boundary) {
                const members = runtime.members;
                let base = ((((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), offset)) * (256))) | 0);
                base = ((((base) & ((~((boundary) - (1)))))) | 0);
                return __addr_cps1_base(runtime, (members.m_gfxram ?? runtime.member("m_gfxram")), runtime.divide(((base) & (262143)), 2));
            }
            function __addr_cps1_base(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_cps1_gfxram_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap[0].mark_tile_dirty"], __L1 = __l["mark_tile_dirty"], __L2 = __l["m_bg_tilemap[1].mark_tile_dirty"], __L3 = __l["m_bg_tilemap[2].mark_tile_dirty"];
                data = ((data) & 0xffff);
                mem_mask = ((mem_mask) & 0xffff);
                let page = ((((((offset) >>> (7))) & (960))) | 0);
                runtime.combineData(__addr_cps1_gfxram_w(runtime, (members.m_gfxram ?? runtime.member("m_gfxram")), offset), data, mem_mask);
                if (((Number(page) === Number(((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 1)) & (960)))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0), "mark_tile_dirty", 0, __L1))(((runtime.divide(offset, 2)) & (4095)));
                }
                if (((Number(page) === Number(((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 2)) & (960)))) ? 1 : 0)) {
                    (__L2 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1), "mark_tile_dirty", 0, __L1))(((runtime.divide(offset, 2)) & (4095)));
                }
                if (((Number(page) === Number(((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 3)) & (960)))) ? 1 : 0)) {
                    (__L3 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2), "mark_tile_dirty", 0, __L1))(((runtime.divide(offset, 2)) & (4095)));
                }
            }
            function __addr_cps1_gfxram_w(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_cps1_snd_bankswitch_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiobank.set_entry"], __L1 = __l["set_entry"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_audiobank, "set_entry", 0, __L1))((((data) >>> (0)) & 1));
            }
            function method_cps1_oki_pin7_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_oki.set_pin7"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_oki, "set_pin7", 0, undefined))((((data) >>> (0)) & 1));
            }
            function method_get_tile0_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                const h_m_empty_tile = members.m_empty_tile ?? runtime.member("m_empty_tile");
                let code = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0), ((2) * (tile_index)))) | 0);
                let attr = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0), __add_get_tile0_info(runtime, ((2) * (tile_index)), 1))) & 0xffff);
                code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](2, code) : method_gfxrom_bank_mapper(runtime, 2, code))) | 0);
                let gfxset = (((((tile_index) >>> (5)) & 1)) & 0xff);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(gfxset, code, __add_get_tile0_info(runtime, ((attr) & (31)), 32), (__L0 ? __L0(runtime.shiftRight(((attr) & (96)), 5)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (96)), 5))));
                tileinfo.group = runtime.shiftRight(((attr) & (384)), 7);
                if (((Number(code) === Number(-1)) ? 1 : 0)) {
                    tileinfo.pen_data = h_m_empty_tile;
                }
            }
            function __add_get_tile0_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_gfxrom_bank_mapper(runtime, type, code) {
                const members = runtime.members;
                let range = __deref_gfxrom_bank_mapper(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bank_mapper;
                let shift = ((0) | 0);
                switch (type) {
                    case 1:
                        {
                            shift = ((1) | 0);
                            break;
                        }
                    case 2:
                        {
                            shift = ((0) | 0);
                            break;
                        }
                    case 4:
                        {
                            shift = ((1) | 0);
                            break;
                        }
                    case 8:
                        {
                            shift = ((3) | 0);
                            break;
                        }
                }
                code = ((((code) << (shift))) | 0);
                while (__deref_gfxrom_bank_mapper(runtime, range).type) {
                    if ((((((Number(code) >= Number(__deref_gfxrom_bank_mapper(runtime, range).start)) ? 1 : 0)) && (((Number(code) <= Number(__deref_gfxrom_bank_mapper(runtime, range).end)) ? 1 : 0))) ? 1 : 0)) {
                        if (((__deref_gfxrom_bank_mapper(runtime, range).type) & (type))) {
                            let base = ((0) | 0);
                            for (let i = ((0) | 0); ((Number(i) < Number(__deref_gfxrom_bank_mapper(runtime, range).bank)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                base = ((((base) + (runtime.readIndex(__deref_gfxrom_bank_mapper(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bank_sizes, i)))) | 0);
                            }
                            return runtime.shiftRight(((base) + (((code) & (((runtime.readIndex(__deref_gfxrom_bank_mapper(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bank_sizes, __deref_gfxrom_bank_mapper(runtime, range).bank)) - (1)))))), shift);
                        }
                    }
                    range = __add_gfxrom_bank_mapper(runtime, range, 1);
                }
                return -1;
            }
            function __add_gfxrom_bank_mapper(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_gfxrom_bank_mapper(runtime, p) {
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
            function method_tilemap0_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return __add_tilemap0_scan(runtime, __add_tilemap0_scan(runtime, ((row) & (31)), ((((col) & (63))) << (5))), ((((row) & (32))) << (6)));
            }
            function __add_tilemap0_scan(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_get_tile1_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                const h_m_empty_tile = members.m_empty_tile ?? runtime.member("m_empty_tile");
                let code = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1), ((2) * (tile_index)))) | 0);
                let attr = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1), __add_get_tile1_info(runtime, ((2) * (tile_index)), 1))) & 0xffff);
                code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](4, code) : method_gfxrom_bank_mapper(runtime, 4, code))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(2, code, __add_get_tile1_info(runtime, ((attr) & (31)), 64), (__L0 ? __L0(runtime.shiftRight(((attr) & (96)), 5)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (96)), 5))));
                tileinfo.group = runtime.shiftRight(((attr) & (384)), 7);
                if (((Number(code) === Number(-1)) ? 1 : 0)) {
                    tileinfo.pen_data = h_m_empty_tile;
                }
            }
            function __add_get_tile1_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_tilemap1_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return __add_tilemap1_scan(runtime, __add_tilemap1_scan(runtime, ((row) & (15)), ((((col) & (63))) << (4))), ((((row) & (48))) << (6)));
            }
            function __add_tilemap1_scan(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_get_tile2_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                const h_m_empty_tile = members.m_empty_tile ?? runtime.member("m_empty_tile");
                let code = ((((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 2), ((2) * (tile_index)))) & (16383))) | 0);
                let attr = ((runtime.readIndex(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 2), __add_get_tile2_info(runtime, ((2) * (tile_index)), 1))) & 0xffff);
                code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](8, code) : method_gfxrom_bank_mapper(runtime, 8, code))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(3, code, __add_get_tile2_info(runtime, ((attr) & (31)), 96), (__L0 ? __L0(runtime.shiftRight(((attr) & (96)), 5)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (96)), 5))));
                tileinfo.group = runtime.shiftRight(((attr) & (384)), 7);
                if (((Number(code) === Number(-1)) ? 1 : 0)) {
                    tileinfo.pen_data = h_m_empty_tile;
                }
            }
            function __add_get_tile2_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_tilemap2_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return __add_tilemap2_scan(runtime, __add_tilemap2_scan(runtime, ((row) & (7)), ((((col) & (63))) << (3))), ((((row) & (56))) << (6)));
            }
            function __add_tilemap2_scan(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_cps1_interrupt(runtime, device) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["device.execute"], __L1 = __l["execute"];
                let __t0;
                runtime.memberCall((__L0 ?? runtime.memberCall(device, "execute", 0, __L1))(), "set_input_line", 0, undefined)(1, 1);
            }
            function method_cps1_get_video_base(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap[0].mark_all_dirty"], __L1 = __l["mark_all_dirty"], __L2 = __l["m_bg_tilemap[1].mark_all_dirty"], __L3 = __l["m_bg_tilemap[2].mark_all_dirty"], __L4 = __l["m_bg_tilemap[0].enable"], __L5 = __l["enable"], __L6 = __l["m_bg_tilemap[1].enable"], __L7 = __l["m_bg_tilemap[2].enable"];
                let __t0, __t1, __t2;
                let scroll1xoff = ((0) | 0);
                let scroll2xoff = ((0) | 0);
                let scroll3xoff = ((0) | 0);
                if (((Number(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 0)) !== Number((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](1, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 1, (members.m_scroll_size ?? runtime.member("m_scroll_size")))))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_scroll"), 0, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](1, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 1, (members.m_scroll_size ?? runtime.member("m_scroll_size")))));
                    (__L0 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0), "mark_all_dirty", 0, __L1))();
                }
                if (((Number(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 1)) !== Number((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](2, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 2, (members.m_scroll_size ?? runtime.member("m_scroll_size")))))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_scroll"), 1, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](2, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 2, (members.m_scroll_size ?? runtime.member("m_scroll_size")))));
                    (__L2 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1), "mark_all_dirty", 0, __L1))();
                }
                if (((Number(runtime.readIndex((members.m_scroll ?? runtime.member("m_scroll")), 2)) !== Number((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](3, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 3, (members.m_scroll_size ?? runtime.member("m_scroll_size")))))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_scroll"), 2, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](3, (members.m_scroll_size ?? runtime.member("m_scroll_size"))) : method_cps1_base(runtime, 3, (members.m_scroll_size ?? runtime.member("m_scroll_size")))));
                    (__L3 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2), "mark_all_dirty", 0, __L1))();
                }
                let kludge = ((((__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bootleg_kludge) & (15))) & 0xff);
                if ((((kludge) === (1)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 0, 37120);
                    scroll1xoff = ((-12) | 0);
                    scroll2xoff = ((-14) | 0);
                    scroll3xoff = ((-16) | 0);
                }
                else {
                    if ((((kludge) === (14)) ? 1 : 0)) {
                        scroll1xoff = ((65466) | 0);
                        scroll2xoff = ((65472) | 0);
                        scroll3xoff = ((65466) | 0);
                    }
                    else {
                        if ((((kludge) === (15)) ? 1 : 0)) {
                            scroll1xoff = ((65472) | 0);
                            scroll2xoff = ((65472) | 0);
                            scroll3xoff = ((65472) | 0);
                        }
                        else {
                            if ((((kludge) === (2)) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 0, 37120);
                                scroll1xoff = ((-16) | 0);
                                scroll2xoff = ((-16) | 0);
                                scroll3xoff = ((-16) | 0);
                            }
                            else {
                                if ((((kludge) === (3)) ? 1 : 0)) {
                                    scroll1xoff = ((-8) | 0);
                                    scroll2xoff = ((-11) | 0);
                                    scroll3xoff = ((-12) | 0);
                                }
                                else {
                                    if (((Number(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bootleg_kludge) === Number(136)) ? 1 : 0)) {
                                        scroll1xoff = ((4) | 0);
                                        scroll2xoff = ((6) | 0);
                                        scroll3xoff = ((10) | 0);
                                        runtime.writeIndex(runtime.writableMember("m_cps_b_regs"), runtime.divide(48, 2), 63);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 17, 62);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 2, 37056);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 3, 37120);
                                        runtime.writeIndex(runtime.writableMember("m_cps_a_regs"), 5, 37184);
                                    }
                                }
                            }
                        }
                    }
                }
                members.m_obj = (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](0, (members.m_obj_size ?? runtime.member("m_obj_size"))) : method_cps1_base(runtime, 0, (members.m_obj_size ?? runtime.member("m_obj_size"))));
                members.m_other = (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](4, (members.m_other_size ?? runtime.member("m_other_size"))) : method_cps1_base(runtime, 4, (members.m_other_size ?? runtime.member("m_other_size"))));
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 0, ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 6)) + (scroll1xoff)));
                runtime.writeIndex(runtime.writableMember("m_scrolly"), 0, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 7));
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 1, ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 8)) + (scroll2xoff)));
                runtime.writeIndex(runtime.writableMember("m_scrolly"), 1, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 9));
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 2, ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 10)) + (scroll3xoff)));
                runtime.writeIndex(runtime.writableMember("m_scrolly"), 2, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 11));
                runtime.writeIndex(runtime.writableMember("m_starsx"), 0, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 12));
                runtime.writeIndex(runtime.writableMember("m_starsy"), 0, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 13));
                runtime.writeIndex(runtime.writableMember("m_starsx"), 1, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 14));
                runtime.writeIndex(runtime.writableMember("m_starsy"), 1, runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 15));
                let layercontrol = ((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_control, 2))) & 0xffff);
                let videocontrol = ((runtime.readIndex((members.m_cps_a_regs ?? runtime.member("m_cps_a_regs")), 17)) & 0xffff);
                (__L4 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0), "enable", 0, __L5))(((layercontrol) & (runtime.readIndex(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_enable_mask, 0))));
                (__L6 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1), "enable", 0, __L5))((((((layercontrol) & (runtime.readIndex(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_enable_mask, 1)))) && ((((videocontrol) >>> (2)) & 1))) ? 1 : 0));
                (__L7 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2), "enable", 0, __L5))((((((layercontrol) & (runtime.readIndex(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_enable_mask, 2)))) && ((((videocontrol) >>> (3)) & 1))) ? 1 : 0));
                runtime.writeIndex(runtime.writableMember("m_stars_enabled"), 0, ((layercontrol) & (runtime.readIndex(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_enable_mask, 3))));
                runtime.writeIndex(runtime.writableMember("m_stars_enabled"), 1, ((layercontrol) & (runtime.readIndex(__deref_cps1_get_video_base(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_enable_mask, 4))));
            }
            function __deref_cps1_get_video_base(runtime, p) {
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
            function method_find_last_sprite(runtime) {
                const members = runtime.members;
                let offset = ((0) | 0);
                while (((Number(offset) < Number(runtime.divide((members.m_obj_size ?? runtime.member("m_obj_size")), 2))) ? 1 : 0)) {
                    if (((Number((((__deref_find_last_sprite(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bootleg_kludge) >>> (0)) & ((1 << (4)) - 1))) === Number(3)) ? 1 : 0)) {
                        let marker = ((runtime.readIndex((members.m_buffered_obj ?? runtime.member("m_buffered_obj")), ((offset) + (1)))) | 0);
                        if ((((marker) >= (32768)) ? 1 : 0)) {
                            members.m_last_sprite_offset = ((((offset) - (4))) | 0);
                            return;
                        }
                    }
                    else {
                        let marker = ((runtime.readIndex((members.m_buffered_obj ?? runtime.member("m_buffered_obj")), ((offset) + (3)))) | 0);
                        if (((Number(((marker) & (65280))) === Number(65280)) ? 1 : 0)) {
                            members.m_last_sprite_offset = ((((offset) - (4))) | 0);
                            return;
                        }
                    }
                    offset = ((((offset) + (4))) | 0);
                }
                members.m_last_sprite_offset = ((((runtime.divide((members.m_obj_size ?? runtime.member("m_obj_size")), 2)) - (4))) | 0);
            }
            function __deref_find_last_sprite(runtime, p) {
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
            function method_cps1_update_transmasks(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap[0].set_transmask"], __L1 = __l["set_transmask"], __L2 = __l["m_bg_tilemap[1].set_transmask"], __L3 = __l["m_bg_tilemap[2].set_transmask"];
                for (let i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let mask = ((0) >>> 0);
                    if (((Number(runtime.readIndex(__deref_cps1_update_transmasks(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).priority, i)) !== Number(-1)) ? 1 : 0)) {
                        mask = ((((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(runtime.readIndex(__deref_cps1_update_transmasks(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).priority, i), 2))) ^ (65535))) >>> 0);
                    }
                    else {
                        mask = ((65535) >>> 0);
                    }
                    (__L0 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 0), "set_transmask", 0, __L1))(i, mask, 32768);
                    (__L2 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 1), "set_transmask", 0, __L1))(i, mask, 32768);
                    (__L3 ?? runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), 2), "set_transmask", 0, __L1))(i, mask, 32768);
                }
            }
            function __deref_cps1_update_transmasks(runtime, p) {
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
            function method_render_layers(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["screen.priority"], __L1 = __l["priority"];
                let __t0;
                let layercontrol = ((runtime.readIndex((members.m_cps_b_regs ?? runtime.member("m_cps_b_regs")), runtime.divide(__deref_render_layers(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).layer_control, 2))) & 0xffff);
                let l0 = ((((((layercontrol) >>> (6))) & (3))) & 0xffff);
                let l1 = ((((((layercontrol) >>> (8))) & (3))) & 0xffff);
                let l2 = ((((((layercontrol) >>> (10))) & (3))) & 0xffff);
                let l3 = ((((((layercontrol) >>> (12))) & (3))) & 0xffff);
                runtime.memberCall((__L0 ?? runtime.memberCall(screen, "priority", 0, __L1))(), "fill", 0, undefined)(0, cliprect);
                if ((((__deref_render_layers(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bootleg_kludge) >>> (7)) & 1)) {
                    (runtime.overrides["cps1_build_palette"] ? runtime.overrides["cps1_build_palette"]((runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](5, (members.m_palette_align ?? runtime.member("m_palette_align"))) : method_cps1_base(runtime, 5, (members.m_palette_align ?? runtime.member("m_palette_align"))))) : method_cps1_build_palette(runtime, (runtime.overrides["cps1_base"] ? runtime.overrides["cps1_base"](5, (members.m_palette_align ?? runtime.member("m_palette_align"))) : method_cps1_base(runtime, 5, (members.m_palette_align ?? runtime.member("m_palette_align"))))));
                }
                (runtime.overrides["cps1_render_layer"] ? runtime.overrides["cps1_render_layer"](screen, bitmap, cliprect, l0, 0) : method_cps1_render_layer(runtime, screen, bitmap, cliprect, l0, 0));
                if ((((l1) === (0)) ? 1 : 0)) {
                    (runtime.overrides["cps1_render_high_layer"] ? runtime.overrides["cps1_render_high_layer"](screen, bitmap, cliprect, l0) : method_cps1_render_high_layer(runtime, screen, bitmap, cliprect, l0));
                }
                (runtime.overrides["cps1_render_layer"] ? runtime.overrides["cps1_render_layer"](screen, bitmap, cliprect, l1, 0) : method_cps1_render_layer(runtime, screen, bitmap, cliprect, l1, 0));
                if ((((l2) === (0)) ? 1 : 0)) {
                    (runtime.overrides["cps1_render_high_layer"] ? runtime.overrides["cps1_render_high_layer"](screen, bitmap, cliprect, l1) : method_cps1_render_high_layer(runtime, screen, bitmap, cliprect, l1));
                }
                (runtime.overrides["cps1_render_layer"] ? runtime.overrides["cps1_render_layer"](screen, bitmap, cliprect, l2, 0) : method_cps1_render_layer(runtime, screen, bitmap, cliprect, l2, 0));
                if ((((l3) === (0)) ? 1 : 0)) {
                    (runtime.overrides["cps1_render_high_layer"] ? runtime.overrides["cps1_render_high_layer"](screen, bitmap, cliprect, l2) : method_cps1_render_high_layer(runtime, screen, bitmap, cliprect, l2));
                }
                (runtime.overrides["cps1_render_layer"] ? runtime.overrides["cps1_render_layer"](screen, bitmap, cliprect, l3, 0) : method_cps1_render_layer(runtime, screen, bitmap, cliprect, l3, 0));
            }
            function __deref_render_layers(runtime, p) {
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
            function method_cps1_render_layer(runtime, screen, bitmap, cliprect, layer, primask) {
                const members = runtime.members;
                switch (layer) {
                    case 0:
                        {
                            (runtime.overrides["cps1_render_sprites"] ? runtime.overrides["cps1_render_sprites"](screen, bitmap, cliprect) : method_cps1_render_sprites(runtime, screen, bitmap, cliprect));
                            break;
                        }
                    case 1:
                    case 2:
                    case 3:
                        {
                            runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), ((layer) - (1))), "draw", 0, undefined)(screen, bitmap, cliprect, 32, primask);
                            break;
                        }
                }
            }
            function method_cps1_render_sprites(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_buffered_obj.get"], __L1 = __l["get"], __L2 = __l["flip_screen"], __L3 = __l["screen.priority"], __L4 = __l["priority"], __L5 = __l["m_gfxdecode.gfx"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10;
                let baseadd = ((0) | 0);
                let base = (__L0 ?? runtime.memberCall(members.m_buffered_obj, "get", 0, __L1))();
                if ((((__deref_cps1_render_sprites(runtime, (members.m_game_config ?? runtime.member("m_game_config"))).bootleg_kludge) >>> (6)) & 1)) {
                    base = __add_cps1_render_sprites(runtime, base, (members.m_last_sprite_offset ?? runtime.member("m_last_sprite_offset")));
                    baseadd = ((-4) | 0);
                }
                else {
                    baseadd = ((4) | 0);
                }
                for (let i = (((members.m_last_sprite_offset ?? runtime.member("m_last_sprite_offset"))) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (4))) | 0)) {
                    let x = ((__deref_cps1_render_sprites(runtime, __addr_cps1_render_sprites(runtime, base, 0))) | 0);
                    let y = ((__deref_cps1_render_sprites(runtime, __addr_cps1_render_sprites(runtime, base, 1))) | 0);
                    let code = ((__deref_cps1_render_sprites(runtime, __addr_cps1_render_sprites(runtime, base, 2))) | 0);
                    let colour = ((__deref_cps1_render_sprites(runtime, __addr_cps1_render_sprites(runtime, base, 3))) | 0);
                    let col = ((((colour) & (31))) | 0);
                    let flipx = (((((colour) >>> (5)) & 1)) ? 1 : 0);
                    let flipy = (((((colour) >>> (6)) & 1)) ? 1 : 0);
                    code = (((runtime.overrides["gfxrom_bank_mapper"] ? runtime.overrides["gfxrom_bank_mapper"](1, code) : method_gfxrom_bank_mapper(runtime, 1, code))) | 0);
                    if (((Number(code) !== Number(-1)) ? 1 : 0)) {
                        if (((colour) & (65280))) {
                            let nx = ((runtime.shiftRight(((colour) & (3840)), 8)) | 0);
                            let ny = ((runtime.shiftRight(((colour) & (61440)), 12)) | 0);
                            nx = ((((nx) + (1))) | 0);
                            ny = ((((ny) + (1))) | 0);
                            if (flipy) {
                                if (flipx) {
                                    for (let nys = ((0) | 0); (((nys) < (ny)) ? 1 : 0); nys = ((((nys) + (1))) | 0)) {
                                        let sy = ((((((y) + (((nys) * (16))))) & (511))) | 0);
                                        for (let nxs = ((0) | 0); (((nxs) < (nx)) ? 1 : 0); nxs = ((((nxs) + (1))) | 0)) {
                                            let sx = ((((((x) + (((nxs) * (16))))) & (511))) | 0);
                                            if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((((code) + (((nx) - (1))))) - (nxs))) & (15))), ((16) * (((((ny) - (1))) - (nys))))), col, 0, 0, ((496) - (sx)), ((240) - (sy)), (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                            else {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((((code) + (((nx) - (1))))) - (nxs))) & (15))), ((16) * (((((ny) - (1))) - (nys))))), col, 1, 1, sx, sy, (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (let nys = ((0) | 0); (((nys) < (ny)) ? 1 : 0); nys = ((((nys) + (1))) | 0)) {
                                        let sy = ((((((y) + (((nys) * (16))))) & (511))) | 0);
                                        for (let nxs = ((0) | 0); (((nxs) < (nx)) ? 1 : 0); nxs = ((((nxs) + (1))) | 0)) {
                                            let sx = ((((((x) + (((nxs) * (16))))) & (511))) | 0);
                                            if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((code) + (nxs))) & (15))), ((16) * (((((ny) - (1))) - (nys))))), col, 1, 0, ((496) - (sx)), ((240) - (sy)), (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                            else {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((code) + (nxs))) & (15))), ((16) * (((((ny) - (1))) - (nys))))), col, 0, 1, sx, sy, (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (flipx) {
                                    for (let nys = ((0) | 0); (((nys) < (ny)) ? 1 : 0); nys = ((((nys) + (1))) | 0)) {
                                        let sy = ((((((y) + (((nys) * (16))))) & (511))) | 0);
                                        for (let nxs = ((0) | 0); (((nxs) < (nx)) ? 1 : 0); nxs = ((((nxs) + (1))) | 0)) {
                                            let sx = ((((((x) + (((nxs) * (16))))) & (511))) | 0);
                                            if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((((code) + (((nx) - (1))))) - (nxs))) & (15))), ((16) * (nys))), col, 0, 1, ((496) - (sx)), ((240) - (sy)), (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                            else {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((((code) + (((nx) - (1))))) - (nxs))) & (15))), ((16) * (nys))), col, 1, 0, sx, sy, (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (let nys = ((0) | 0); (((nys) < (ny)) ? 1 : 0); nys = ((((nys) + (1))) | 0)) {
                                        let sy = ((((((y) + (((nys) * (16))))) & (511))) | 0);
                                        for (let nxs = ((0) | 0); (((nxs) < (nx)) ? 1 : 0); nxs = ((((nxs) + (1))) | 0)) {
                                            let sx = ((((((x) + (((nxs) * (16))))) & (511))) | 0);
                                            if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((code) + (nxs))) & (15))), ((16) * (nys))), col, 1, 1, ((496) - (sx)), ((240) - (sy)), (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                            else {
                                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, __add_cps1_render_sprites(runtime, __add_cps1_render_sprites(runtime, ((code) & (-16)), ((((code) + (nxs))) & (15))), ((16) * (nys))), col, 0, 0, sx, sy, (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, code, col, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((496) - (((x) & (511)))), ((240) - (((y) & (511)))), (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                            }
                            else {
                                runtime.memberCall((__L5 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "prio_transpen", 0, undefined)(bitmap, cliprect, code, col, flipx, flipy, ((x) & (511)), ((y) & (511)), (__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), 2, 15);
                            }
                        }
                    }
                    base = __add_cps1_render_sprites(runtime, base, baseadd);
                }
            }
            function __add_cps1_render_sprites(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_cps1_render_sprites(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_cps1_render_sprites(runtime, p) {
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
            function method_cps1_render_high_layer(runtime, screen, bitmap, cliprect, layer) {
                const members = runtime.members;
                const h_m_dummy_bitmap = members.m_dummy_bitmap ?? runtime.member("m_dummy_bitmap");
                switch (layer) {
                    case 0:
                        {
                            break;
                        }
                    case 1:
                    case 2:
                    case 3:
                        {
                            runtime.memberCall(runtime.readIndex((members.m_bg_tilemap ?? runtime.member("m_bg_tilemap")), ((layer) - (1))), "draw", 0, undefined)(screen, h_m_dummy_bitmap, cliprect, 16, 1);
                            break;
                        }
                }
            }
            function method_screen_vblank_cps1(runtime, state) {
                const members = runtime.members;
                if (state) {
                    (runtime.overrides["cps1_get_video_base"] ? runtime.overrides["cps1_get_video_base"]() : method_cps1_get_video_base(runtime));
                }
            }
            function method_cps1_objram_latch(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_buffered_obj.get"], __L1 = __l["get"], __L2 = __l["memcpy"];
                let __t0;
                if (state) {
                    (__L2 ? __L2((__L0 ?? runtime.memberCall(members.m_buffered_obj, "get", 0, __L1))(), (members.m_obj ?? runtime.member("m_obj")), (members.m_obj_size ?? runtime.member("m_obj_size"))) : runtime.macro("memcpy", (__L0 ?? runtime.memberCall(members.m_buffered_obj, "get", 0, __L1))(), (members.m_obj ?? runtime.member("m_obj")), (members.m_obj_size ?? runtime.member("m_obj_size"))));
                }
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "irqack_r": method_irqack_r,
                "cps1_dsw_r": method_cps1_dsw_r,
                "cps1_cps_a_w": method_cps1_cps_a_w,
                "cps1_build_palette": method_cps1_build_palette,
                "cps1_base": method_cps1_base,
                "cps1_gfxram_w": method_cps1_gfxram_w,
                "cps1_snd_bankswitch_w": method_cps1_snd_bankswitch_w,
                "cps1_oki_pin7_w": method_cps1_oki_pin7_w,
                "get_tile0_info": method_get_tile0_info,
                "gfxrom_bank_mapper": method_gfxrom_bank_mapper,
                "tilemap0_scan": method_tilemap0_scan,
                "get_tile1_info": method_get_tile1_info,
                "tilemap1_scan": method_tilemap1_scan,
                "get_tile2_info": method_get_tile2_info,
                "tilemap2_scan": method_tilemap2_scan,
                "cps1_interrupt": method_cps1_interrupt,
                "cps1_get_video_base": method_cps1_get_video_base,
                "find_last_sprite": method_find_last_sprite,
                "cps1_update_transmasks": method_cps1_update_transmasks,
                "render_layers": method_render_layers,
                "cps1_render_layer": method_cps1_render_layer,
                "cps1_render_sprites": method_cps1_render_sprites,
                "cps1_render_high_layer": method_cps1_render_high_layer,
                "screen_vblank_cps1": method_screen_vblank_cps1,
                "cps1_objram_latch": method_cps1_objram_latch
            };
            return __methodTable;
        })();
        return {
            "cps_state.irqack_r": methods["irqack_r"],
            "cps_state.cps1_dsw_r": methods["cps1_dsw_r"],
            "cps_state.cps1_cps_a_w": methods["cps1_cps_a_w"],
            "cps_state.cps1_build_palette": methods["cps1_build_palette"],
            "cps_state.cps1_base": methods["cps1_base"],
            "cps_state.cps1_gfxram_w": methods["cps1_gfxram_w"],
            "cps_state.cps1_snd_bankswitch_w": methods["cps1_snd_bankswitch_w"],
            "cps_state.cps1_oki_pin7_w": methods["cps1_oki_pin7_w"],
            "cps_state.get_tile0_info": methods["get_tile0_info"],
            "cps_state.gfxrom_bank_mapper": methods["gfxrom_bank_mapper"],
            "cps_state.tilemap0_scan": methods["tilemap0_scan"],
            "cps_state.get_tile1_info": methods["get_tile1_info"],
            "cps_state.tilemap1_scan": methods["tilemap1_scan"],
            "cps_state.get_tile2_info": methods["get_tile2_info"],
            "cps_state.tilemap2_scan": methods["tilemap2_scan"],
            "cps_state.cps1_interrupt": methods["cps1_interrupt"],
            "cps_state.cps1_get_video_base": methods["cps1_get_video_base"],
            "cps_state.find_last_sprite": methods["find_last_sprite"],
            "cps_state.cps1_update_transmasks": methods["cps1_update_transmasks"],
            "cps_state.render_layers": methods["render_layers"],
            "cps_state.cps1_render_layer": methods["cps1_render_layer"],
            "cps_state.cps1_render_sprites": methods["cps1_render_sprites"],
            "cps_state.cps1_render_high_layer": methods["cps1_render_high_layer"],
            "cps_state.screen_vblank_cps1": methods["screen_vblank_cps1"],
            "cps_state.cps1_objram_latch": methods["cps1_objram_latch"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "device.execute", "enable", "execute", "flip_screen", "get", "m68000_base_device::autovector", "m_audiobank.set_entry", "m_bg_tilemap[0].enable", "m_bg_tilemap[0].mark_all_dirty", "m_bg_tilemap[0].mark_tile_dirty", "m_bg_tilemap[0].set_transmask", "m_bg_tilemap[1].enable", "m_bg_tilemap[1].mark_all_dirty", "m_bg_tilemap[1].mark_tile_dirty", "m_bg_tilemap[1].set_transmask", "m_bg_tilemap[2].enable", "m_bg_tilemap[2].mark_all_dirty", "m_bg_tilemap[2].mark_tile_dirty", "m_bg_tilemap[2].set_transmask", "m_buffered_obj.get", "m_gfxdecode.gfx", "m_io_in[0].read", "m_maincpu.set_input_line", "m_oki.set_pin7", "m_palette.set_pen_color", "machine", "machine().side_effects_disabled", "mark_all_dirty", "mark_tile_dirty", "memcpy", "priority", "read", "rgb_t", "screen.priority", "set", "set_entry", "set_transmask", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
