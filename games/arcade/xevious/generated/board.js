// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'xevious');
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
            function method_cpu3_interrupt_callback(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_subcpu2.pulse_input_line"], __L1 = __l["m_screen.time_until_pos"], __L2 = __l["m_cpu3_interrupt_timer.adjust"], __L3 = __l["adjust"];
                let scanline = ((param) | 0);
                if ((members.m_sub2_nmi_mask ?? runtime.member("m_sub2_nmi_mask"))) {
                    (__L0 ?? runtime.memberCall(members.m_subcpu2, "pulse_input_line", 0, undefined))(-1, 0);
                }
                scanline = ((((scanline) + (128))) | 0);
                if ((((scanline) >= (272)) ? 1 : 0)) {
                    scanline = ((64) | 0);
                }
                (__L2 ?? runtime.memberCall(members.m_cpu3_interrupt_timer, "adjust", 0, __L3))((__L1 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(scanline), scanline);
            }
            function method_data_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("write_sync", data);
            }
            function method_ctrl_r(runtime) {
                const members = runtime.members;
                return (members.m_control ?? runtime.member("m_control"));
            }
            function method_bosco_dsw_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"];
                let __t0, __t1;
                let bit0 = ((0) | 0);
                let bit1 = ((0) | 0);
                bit0 = ((((runtime.shiftRight((__t0 = __deref_bosco_dsw_r(runtime, (__L0 ? __L0("DSWB") : runtime.macro("ioport", "DSWB"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("DSWB") : runtime.macro("ioport", "DSWB")), "read")), offset)) & (1))) | 0);
                bit1 = ((((runtime.shiftRight((__t1 = __deref_bosco_dsw_r(runtime, (__L0 ? __L0("DSWA") : runtime.macro("ioport", "DSWA"))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0("DSWA") : runtime.macro("ioport", "DSWA")), "read")), offset)) & (1))) | 0);
                return ((bit0) | (((bit1) << (1))));
            }
            function __deref_bosco_dsw_r(runtime, p) {
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
            function method_xevious_fg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_colorram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_bg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_colorram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_fg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_bg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_vh_latch_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"], __L2 = __l["m_fg_tilemap.set_scrollx"], __L3 = __l["m_bg_tilemap.set_scrolly"], __L4 = __l["set_scrolly"], __L5 = __l["m_fg_tilemap.set_scrolly"], __L6 = __l["flip_screen_set"];
                data = ((data) & 0xff);
                let reg = ((0) | 0);
                let scroll = ((((data) + (((((offset) & (1))) << (8))))) | 0);
                reg = ((runtime.shiftRight(((offset) & (240)), 4)) | 0);
                switch (reg) {
                    case 0:
                        {
                            (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, scroll);
                            break;
                        }
                    case 1:
                        {
                            (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrollx", 0, __L1))(0, scroll);
                            break;
                        }
                    case 2:
                        {
                            (__L3 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L4))(0, scroll);
                            break;
                        }
                    case 3:
                        {
                            (__L5 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrolly", 0, __L4))(0, scroll);
                            break;
                        }
                    case 7:
                        {
                            (__L6 ? __L6(((scroll) & (1))) : runtime.macro("flip_screen_set", ((scroll) & (1))));
                            break;
                        }
                    default:
                        {
                            0;
                            break;
                        }
                }
            }
            function method_xevious_bb_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"];
                let __t0;
                let rom2a = (__t0 = __deref_xevious_bb_r(runtime, (__L0 ? __L0("gfx4") : runtime.macro("memregion", "gfx4"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("gfx4") : runtime.macro("memregion", "gfx4")), "base"));
                let rom2a$s = undefined, rom2a$o = 0;
                if (ArrayBuffer.isView(rom2a) || Array.isArray(rom2a))
                    rom2a$s = rom2a;
                else if (rom2a !== null && typeof rom2a === 'object' && rom2a.generatedPointer === true && rom2a.path === undefined && rom2a.target === undefined && (ArrayBuffer.isView(rom2a.source) || Array.isArray(rom2a.source))) {
                    rom2a$s = rom2a.source;
                    rom2a$o = rom2a.offset;
                }
                let rom2b = __addr_xevious_bb_r(runtime, rom2a, 4096);
                let rom2b$s = undefined, rom2b$o = 0;
                if (ArrayBuffer.isView(rom2b) || Array.isArray(rom2b))
                    rom2b$s = rom2b;
                else if (rom2b !== null && typeof rom2b === 'object' && rom2b.generatedPointer === true && rom2b.path === undefined && rom2b.target === undefined && (ArrayBuffer.isView(rom2b.source) || Array.isArray(rom2b.source))) {
                    rom2b$s = rom2b.source;
                    rom2b$o = rom2b.offset;
                }
                let rom2c = __addr_xevious_bb_r(runtime, rom2a, 12288);
                let rom2c$s = undefined, rom2c$o = 0;
                if (ArrayBuffer.isView(rom2c) || Array.isArray(rom2c))
                    rom2c$s = rom2c;
                else if (rom2c !== null && typeof rom2c === 'object' && rom2c.generatedPointer === true && rom2c.path === undefined && rom2c.target === undefined && (ArrayBuffer.isView(rom2c.source) || Array.isArray(rom2c.source))) {
                    rom2c$s = rom2c.source;
                    rom2c$o = rom2c.offset;
                }
                let adr_2b = ((0) | 0);
                let adr_2c = ((0) | 0);
                let dat1 = ((0) | 0);
                let dat2 = ((0) | 0);
                adr_2b = ((((((((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 1)) & (126))) << (6))) | (runtime.shiftRight(((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 0)) & (254)), 1)))) | 0);
                if (((adr_2b) & (1))) {
                    dat1 = (((((((((rom2a$s !== undefined ? (rom2a$s[rom2a$o + (runtime.shiftRight(adr_2b, 1))] ?? 0) : runtime.readIndex(rom2a, runtime.shiftRight(adr_2b, 1)))) & (240))) << (4))) | ((rom2b$s !== undefined ? (rom2b$s[rom2b$o + (adr_2b)] ?? 0) : runtime.readIndex(rom2b, adr_2b))))) | 0);
                }
                else {
                    dat1 = (((((((((rom2a$s !== undefined ? (rom2a$s[rom2a$o + (runtime.shiftRight(adr_2b, 1))] ?? 0) : runtime.readIndex(rom2a, runtime.shiftRight(adr_2b, 1)))) & (15))) << (8))) | ((rom2b$s !== undefined ? (rom2b$s[rom2b$o + (adr_2b)] ?? 0) : runtime.readIndex(rom2b, adr_2b))))) | 0);
                }
                adr_2c = ((((((((((dat1) & (511))) << (2))) | (((((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 1)) & (1))) << (1))))) | (((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 0)) & (1))))) | 0);
                if (((dat1) & (1024))) {
                    adr_2c = ((((adr_2c) ^ (1))) | 0);
                }
                if (((dat1) & (512))) {
                    adr_2c = ((((adr_2c) ^ (2))) | 0);
                }
                if (((offset) & (1))) {
                    dat2 = (((rom2c$s !== undefined ? (rom2c$s[rom2c$o + (((adr_2c) | (2048)))] ?? 0) : runtime.readIndex(rom2c, ((adr_2c) | (2048))))) | 0);
                }
                else {
                    dat2 = (((rom2c$s !== undefined ? (rom2c$s[rom2c$o + (adr_2c)] ?? 0) : runtime.readIndex(rom2c, adr_2c))) | 0);
                    dat2 = ((((((dat2) >>> (6)) & 1) << 7 | (((dat2) >>> (7)) & 1) << 6 | (((dat2) >>> (5)) & 1) << 5 | (((dat2) >>> (4)) & 1) << 4 | (((dat2) >>> (3)) & 1) << 3 | (((dat2) >>> (2)) & 1) << 2 | (((dat2) >>> (1)) & 1) << 1 | (((dat2) >>> (0)) & 1) << 0)) | 0);
                    if (((dat1) & (1024))) {
                        dat2 = ((((dat2) ^ (64))) | 0);
                    }
                    if (((dat1) & (512))) {
                        dat2 = ((((dat2) ^ (128))) | 0);
                    }
                }
                return dat2;
            }
            function __addr_xevious_bb_r(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_xevious_bb_r(runtime, p) {
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
            function method_xevious_bs_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_bs"), ((offset) & (1)), data);
            }
            function method_irq1_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_main_irq_mask = ((state) & 0xff);
                if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_irq2_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_subcpu.set_input_line"];
                members.m_sub_irq_mask = ((state) & 0xff);
                if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_nmion_w(runtime, state) {
                const members = runtime.members;
                members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
            }
            function method_reset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
            }
            function method_chip_select(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, ((state) ? (1) : (0)));
            }
            function method_rw(runtime, state) {
                const members = runtime.members;
                runtime.synchronize("rw_sync", state);
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"], __L1 = __l["m_subcpu.set_input_line"];
                if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
                }
                if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(0, 1);
                }
            }
            function method_vblank(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, ((state) ? (0) : (1)));
            }
            function method_K_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return runtime.shiftRight(h_m_latched_cmd, 4);
            }
            function method_R0_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return ((h_m_latched_cmd) & (15));
            }
            function method_R2_r(runtime) {
                const members = runtime.members;
                return (((members.m_rw ?? runtime.member("m_rw"))) & (1));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "cpu3_interrupt_callback": method_cpu3_interrupt_callback,
                "data_w": method_data_w,
                "ctrl_r": method_ctrl_r,
                "bosco_dsw_r": method_bosco_dsw_r,
                "xevious_fg_colorram_w": method_xevious_fg_colorram_w,
                "xevious_bg_colorram_w": method_xevious_bg_colorram_w,
                "xevious_fg_videoram_w": method_xevious_fg_videoram_w,
                "xevious_bg_videoram_w": method_xevious_bg_videoram_w,
                "xevious_vh_latch_w": method_xevious_vh_latch_w,
                "xevious_bb_r": method_xevious_bb_r,
                "xevious_bs_w": method_xevious_bs_w,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "reset": method_reset,
                "chip_select": method_chip_select,
                "rw": method_rw,
                "vblank_irq": method_vblank_irq,
                "vblank": method_vblank,
                "K_r": method_K_r,
                "R0_r": method_R0_r,
                "R2_r": method_R2_r
            };
            return __methodTable;
        })();
        return {
            "galaga_state.cpu3_interrupt_callback": methods["cpu3_interrupt_callback"],
            "galaga_state.irq1_clear_w": methods["irq1_clear_w"],
            "galaga_state.irq2_clear_w": methods["irq2_clear_w"],
            "galaga_state.nmion_w": methods["nmion_w"],
            "galaga_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
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
            function method_data_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("write_sync", data);
            }
            function method_ctrl_r(runtime) {
                const members = runtime.members;
                return (members.m_control ?? runtime.member("m_control"));
            }
            function method_bosco_dsw_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"];
                let __t0, __t1;
                let bit0 = ((0) | 0);
                let bit1 = ((0) | 0);
                bit0 = ((((runtime.shiftRight((__t0 = __deref_bosco_dsw_r(runtime, (__L0 ? __L0("DSWB") : runtime.macro("ioport", "DSWB"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("DSWB") : runtime.macro("ioport", "DSWB")), "read")), offset)) & (1))) | 0);
                bit1 = ((((runtime.shiftRight((__t1 = __deref_bosco_dsw_r(runtime, (__L0 ? __L0("DSWA") : runtime.macro("ioport", "DSWA"))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0("DSWA") : runtime.macro("ioport", "DSWA")), "read")), offset)) & (1))) | 0);
                return ((bit0) | (((bit1) << (1))));
            }
            function __deref_bosco_dsw_r(runtime, p) {
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
            function method_xevious_fg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_colorram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_bg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_colorram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_fg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_bg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_xevious_vh_latch_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.set_scrollx"], __L1 = __l["set_scrollx"], __L2 = __l["m_fg_tilemap.set_scrollx"], __L3 = __l["m_bg_tilemap.set_scrolly"], __L4 = __l["set_scrolly"], __L5 = __l["m_fg_tilemap.set_scrolly"], __L6 = __l["flip_screen_set"];
                data = ((data) & 0xff);
                let reg = ((0) | 0);
                let scroll = ((((data) + (((((offset) & (1))) << (8))))) | 0);
                reg = ((runtime.shiftRight(((offset) & (240)), 4)) | 0);
                switch (reg) {
                    case 0:
                        {
                            (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, scroll);
                            break;
                        }
                    case 1:
                        {
                            (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrollx", 0, __L1))(0, scroll);
                            break;
                        }
                    case 2:
                        {
                            (__L3 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L4))(0, scroll);
                            break;
                        }
                    case 3:
                        {
                            (__L5 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrolly", 0, __L4))(0, scroll);
                            break;
                        }
                    case 7:
                        {
                            (__L6 ? __L6(((scroll) & (1))) : runtime.macro("flip_screen_set", ((scroll) & (1))));
                            break;
                        }
                    default:
                        {
                            0;
                            break;
                        }
                }
            }
            function method_xevious_bb_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"];
                let __t0;
                let rom2a = (__t0 = __deref_xevious_bb_r(runtime, (__L0 ? __L0("gfx4") : runtime.macro("memregion", "gfx4"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("gfx4") : runtime.macro("memregion", "gfx4")), "base"));
                let rom2a$s = undefined, rom2a$o = 0;
                if (ArrayBuffer.isView(rom2a) || Array.isArray(rom2a))
                    rom2a$s = rom2a;
                else if (rom2a !== null && typeof rom2a === 'object' && rom2a.generatedPointer === true && rom2a.path === undefined && rom2a.target === undefined && (ArrayBuffer.isView(rom2a.source) || Array.isArray(rom2a.source))) {
                    rom2a$s = rom2a.source;
                    rom2a$o = rom2a.offset;
                }
                let rom2b = __addr_xevious_bb_r(runtime, rom2a, 4096);
                let rom2b$s = undefined, rom2b$o = 0;
                if (ArrayBuffer.isView(rom2b) || Array.isArray(rom2b))
                    rom2b$s = rom2b;
                else if (rom2b !== null && typeof rom2b === 'object' && rom2b.generatedPointer === true && rom2b.path === undefined && rom2b.target === undefined && (ArrayBuffer.isView(rom2b.source) || Array.isArray(rom2b.source))) {
                    rom2b$s = rom2b.source;
                    rom2b$o = rom2b.offset;
                }
                let rom2c = __addr_xevious_bb_r(runtime, rom2a, 12288);
                let rom2c$s = undefined, rom2c$o = 0;
                if (ArrayBuffer.isView(rom2c) || Array.isArray(rom2c))
                    rom2c$s = rom2c;
                else if (rom2c !== null && typeof rom2c === 'object' && rom2c.generatedPointer === true && rom2c.path === undefined && rom2c.target === undefined && (ArrayBuffer.isView(rom2c.source) || Array.isArray(rom2c.source))) {
                    rom2c$s = rom2c.source;
                    rom2c$o = rom2c.offset;
                }
                let adr_2b = ((0) | 0);
                let adr_2c = ((0) | 0);
                let dat1 = ((0) | 0);
                let dat2 = ((0) | 0);
                adr_2b = ((((((((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 1)) & (126))) << (6))) | (runtime.shiftRight(((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 0)) & (254)), 1)))) | 0);
                if (((adr_2b) & (1))) {
                    dat1 = (((((((((rom2a$s !== undefined ? (rom2a$s[rom2a$o + (runtime.shiftRight(adr_2b, 1))] ?? 0) : runtime.readIndex(rom2a, runtime.shiftRight(adr_2b, 1)))) & (240))) << (4))) | ((rom2b$s !== undefined ? (rom2b$s[rom2b$o + (adr_2b)] ?? 0) : runtime.readIndex(rom2b, adr_2b))))) | 0);
                }
                else {
                    dat1 = (((((((((rom2a$s !== undefined ? (rom2a$s[rom2a$o + (runtime.shiftRight(adr_2b, 1))] ?? 0) : runtime.readIndex(rom2a, runtime.shiftRight(adr_2b, 1)))) & (15))) << (8))) | ((rom2b$s !== undefined ? (rom2b$s[rom2b$o + (adr_2b)] ?? 0) : runtime.readIndex(rom2b, adr_2b))))) | 0);
                }
                adr_2c = ((((((((((dat1) & (511))) << (2))) | (((((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 1)) & (1))) << (1))))) | (((runtime.readIndex((members.m_xevious_bs ?? runtime.member("m_xevious_bs")), 0)) & (1))))) | 0);
                if (((dat1) & (1024))) {
                    adr_2c = ((((adr_2c) ^ (1))) | 0);
                }
                if (((dat1) & (512))) {
                    adr_2c = ((((adr_2c) ^ (2))) | 0);
                }
                if (((offset) & (1))) {
                    dat2 = (((rom2c$s !== undefined ? (rom2c$s[rom2c$o + (((adr_2c) | (2048)))] ?? 0) : runtime.readIndex(rom2c, ((adr_2c) | (2048))))) | 0);
                }
                else {
                    dat2 = (((rom2c$s !== undefined ? (rom2c$s[rom2c$o + (adr_2c)] ?? 0) : runtime.readIndex(rom2c, adr_2c))) | 0);
                    dat2 = ((((((dat2) >>> (6)) & 1) << 7 | (((dat2) >>> (7)) & 1) << 6 | (((dat2) >>> (5)) & 1) << 5 | (((dat2) >>> (4)) & 1) << 4 | (((dat2) >>> (3)) & 1) << 3 | (((dat2) >>> (2)) & 1) << 2 | (((dat2) >>> (1)) & 1) << 1 | (((dat2) >>> (0)) & 1) << 0)) | 0);
                    if (((dat1) & (1024))) {
                        dat2 = ((((dat2) ^ (64))) | 0);
                    }
                    if (((dat1) & (512))) {
                        dat2 = ((((dat2) ^ (128))) | 0);
                    }
                }
                return dat2;
            }
            function __addr_xevious_bb_r(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_xevious_bb_r(runtime, p) {
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
            function method_xevious_bs_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_xevious_bs"), ((offset) & (1)), data);
            }
            function method_irq1_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_main_irq_mask = ((state) & 0xff);
                if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_irq2_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_subcpu.set_input_line"];
                members.m_sub_irq_mask = ((state) & 0xff);
                if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_nmion_w(runtime, state) {
                const members = runtime.members;
                members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
            }
            function method_reset(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (0) : (1)));
            }
            function method_chip_select(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(0, ((state) ? (1) : (0)));
            }
            function method_rw(runtime, state) {
                const members = runtime.members;
                runtime.synchronize("rw_sync", state);
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"], __L1 = __l["m_subcpu.set_input_line"];
                if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
                }
                if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(0, 1);
                }
            }
            function method_vblank(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(1, ((state) ? (0) : (1)));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let code = ((runtime.readIndex((members.m_xevious_bg_videoram ?? runtime.member("m_xevious_bg_videoram")), tile_index)) & 0xff);
                let attr = ((runtime.readIndex((members.m_xevious_bg_colorram ?? runtime.member("m_xevious_bg_colorram")), tile_index)) & 0xff);
                let color = ((((((runtime.shiftRight(((attr) & (60)), 2)) | (runtime.shiftRight(((code) & (128)), 3)))) | (((((attr) & (3))) << (5))))) & 0xff);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(1, ((code) + (((((attr) & (1))) << (8)))), color, (__L0 ? __L0(runtime.shiftRight(((attr) & (192)), 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (192)), 6))));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["TILE_FLIPYX"], __L2 = __l["tileinfo.set"], __L3 = __l["set"];
                let attr = ((runtime.readIndex((members.m_xevious_fg_colorram ?? runtime.member("m_xevious_fg_colorram")), tile_index)) & 0xff);
                let color = ((((((((attr) & (3))) << (4))) | (runtime.shiftRight(((attr) & (60)), 2)))) & 0xff);
                (__L2 ?? runtime.memberCall(tileinfo, "set", 0, __L3))(0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((__L1 ? __L1(runtime.shiftRight(((attr) & (192)), 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (192)), 6)))) ^ ((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (1) : (0)))));
            }
            function method_screen_update_xevious(runtime, screen, bitmap, cliprect) {
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
                const __L0 = __l["flip_screen"], __L1 = __l["m_gfxdecode.gfx"], __L2 = __l["m_palette.transpen_mask"];
                const h_m_xevious_sr3 = members.m_xevious_sr3 ?? runtime.member("m_xevious_sr3");
                const h_m_xevious_sr1 = members.m_xevious_sr1 ?? runtime.member("m_xevious_sr1");
                const h_m_xevious_sr2 = members.m_xevious_sr2 ?? runtime.member("m_xevious_sr2");
                let spriteram = __addr_draw_sprites(runtime, h_m_xevious_sr3, 1920);
                let spriteram$s = undefined, spriteram$o = 0;
                if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram))
                    spriteram$s = spriteram;
                else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) {
                    spriteram$s = spriteram.source;
                    spriteram$o = spriteram.offset;
                }
                let spriteram_2 = __addr_draw_sprites(runtime, h_m_xevious_sr1, 1920);
                let spriteram_2$s = undefined, spriteram_2$o = 0;
                if (ArrayBuffer.isView(spriteram_2) || Array.isArray(spriteram_2))
                    spriteram_2$s = spriteram_2;
                else if (spriteram_2 !== null && typeof spriteram_2 === 'object' && spriteram_2.generatedPointer === true && spriteram_2.path === undefined && spriteram_2.target === undefined && (ArrayBuffer.isView(spriteram_2.source) || Array.isArray(spriteram_2.source))) {
                    spriteram_2$s = spriteram_2.source;
                    spriteram_2$o = spriteram_2.offset;
                }
                let spriteram_3 = __addr_draw_sprites(runtime, h_m_xevious_sr2, 1920);
                let spriteram_3$s = undefined, spriteram_3$o = 0;
                if (ArrayBuffer.isView(spriteram_3) || Array.isArray(spriteram_3))
                    spriteram_3$s = spriteram_3;
                else if (spriteram_3 !== null && typeof spriteram_3 === 'object' && spriteram_3.generatedPointer === true && spriteram_3.path === undefined && spriteram_3.target === undefined && (ArrayBuffer.isView(spriteram_3.source) || Array.isArray(spriteram_3.source))) {
                    spriteram_3$s = spriteram_3.source;
                    spriteram_3$o = spriteram_3.offset;
                }
                let offs = ((0) | 0);
                let sx = ((0) | 0);
                let sy = ((0) | 0);
                for (offs = ((0) | 0); (((offs) < (128)) ? 1 : 0); offs = ((((offs) + (2))) | 0)) {
                    if (((Number((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) & (64))) === Number(0)) ? 1 : 0)) {
                        let bank = ((0) | 0);
                        let code = ((0) | 0);
                        let color = ((0) | 0);
                        let flipx = ((0) | 0);
                        let flipy = ((0) | 0);
                        let transmask = ((0) >>> 0);
                        if ((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (128))) {
                            bank = ((2) | 0);
                            code = ((__add_draw_sprites(runtime, (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs))) & (63)), 256)) | 0);
                        }
                        else {
                            bank = ((2) | 0);
                            code = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs))) | 0);
                        }
                        color = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) & (127))) | 0);
                        flipx = (((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (4))) | 0);
                        flipy = (((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (8))) | 0);
                        sx = ((__add_draw_sprites(runtime, (((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram_2, ((offs) + (1))))) - (40)), ((256) * ((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram_3, ((offs) + (1))))) & (1)))))) | 0);
                        sy = ((((((224) - ((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (offs)] ?? 0) : runtime.readIndex(spriteram_2, offs))))) - (1))) | 0);
                        if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
                            flipx = ((((flipx) ? 0 : 1)) | 0);
                            flipy = ((((flipy) ? 0 : 1)) | 0);
                        }
                        transmask = (((__L2 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank)), color, 128)) >>> 0);
                        if ((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (2))) {
                            if ((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (1))) {
                                code = ((((code) & (-4))) | 0);
                                runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, ((code) + (3)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (((sy) - (16))) : (sy)), transmask);
                                runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, ((code) + (1)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (sy) : (((sy) - (16)))), transmask);
                            }
                            code = ((((code) & (-3))) | 0);
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, ((code) + (2)), color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (((sy) - (16))) : (sy)), transmask);
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (sy) : (((sy) - (16)))), transmask);
                        }
                        else {
                            if ((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (1))) {
                                code = ((((code) & (-2))) | 0);
                                runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (((sy) - (16))) : (sy)), transmask);
                                runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, ((code) + (1)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (((sy) - (16))) : (sy)), transmask);
                            }
                            else {
                                runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(bank), "transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, transmask);
                            }
                        }
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
            function __addr_draw_sprites(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_draw_sprites(runtime, p) {
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
            function method_K_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return runtime.shiftRight(h_m_latched_cmd, 4);
            }
            function method_R0_r(runtime) {
                const members = runtime.members;
                const h_m_latched_cmd = members.m_latched_cmd ?? runtime.member("m_latched_cmd");
                return ((h_m_latched_cmd) & (15));
            }
            function method_R2_r(runtime) {
                const members = runtime.members;
                return (((members.m_rw ?? runtime.member("m_rw"))) & (1));
            }
            function method_xevious_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"], __L4 = __l["m_gfxdecode.gfx"], __L5 = __l["palette.set_pen_indirect"], __L6 = __l["set_pen_indirect"];
                let __t0, __t1, __t2, __t3, __t4, __t5;
                let color_prom = (__t0 = __deref_xevious_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let TOTAL_COLORS = ((gfxn) => {
                    return (((__t1 = __deref_xevious_palette(runtime, (__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn)), typeof __t1.colors === 'function' ? (__t1.colors() ?? 0) : runtime.container((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn), "colors"))) * ((__t2 = __deref_xevious_palette(runtime, (__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn)), typeof __t2.granularity === 'function' ? (__t2.granularity() ?? 0) : runtime.container((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn), "granularity"))));
                });
                for (let i = ((0) | 0); (((i) < (128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    let bit3 = ((0) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, 0)) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, 0)) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, 0)) >>> (2)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, 0)) >>> (3)) & 1)) | 0);
                    let r = ((__add_xevious_palette(runtime, __add_xevious_palette(runtime, __add_xevious_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, 256)) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, 256)) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, 256)) >>> (2)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, 256)) >>> (3)) & 1)) | 0);
                    let g = ((__add_xevious_palette(runtime, __add_xevious_palette(runtime, __add_xevious_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    bit0 = (((((runtime.readIndex(color_prom, 512)) >>> (0)) & 1)) | 0);
                    bit1 = (((((runtime.readIndex(color_prom, 512)) >>> (1)) & 1)) | 0);
                    bit2 = (((((runtime.readIndex(color_prom, 512)) >>> (2)) & 1)) | 0);
                    bit3 = (((((runtime.readIndex(color_prom, 512)) >>> (3)) & 1)) | 0);
                    let b = ((__add_xevious_palette(runtime, __add_xevious_palette(runtime, __add_xevious_palette(runtime, ((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                    color_prom = __add_xevious_palette(runtime, color_prom, 1);
                }
                (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(128, 4278190080);
                color_prom = __add_xevious_palette(runtime, color_prom, 128);
                color_prom = __add_xevious_palette(runtime, color_prom, 512);
                for (let i = ((0) | 0); ((Number(i) < Number((typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(1) : runtime.macro("TOTAL_COLORS", 1)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))((((__t3 = __deref_xevious_palette(runtime, (__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1)), typeof __t3.colorbase === 'function' ? (__t3.colorbase() ?? 0) : runtime.container((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "colorbase"))) + (i)), ((((runtime.readIndex(color_prom, 0)) & (15))) | (((((runtime.readIndex(color_prom, (typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(1) : runtime.macro("TOTAL_COLORS", 1)))) & (15))) << (4)))));
                    color_prom = __add_xevious_palette(runtime, color_prom, 1);
                }
                color_prom = __add_xevious_palette(runtime, color_prom, (typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(1) : runtime.macro("TOTAL_COLORS", 1)));
                for (let i = ((0) | 0); ((Number(i) < Number((typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(2) : runtime.macro("TOTAL_COLORS", 2)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let c = ((((((runtime.readIndex(color_prom, 0)) & (15))) | (((((runtime.readIndex(color_prom, (typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(2) : runtime.macro("TOTAL_COLORS", 2)))) & (15))) << (4))))) | 0);
                    (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))((((__t4 = __deref_xevious_palette(runtime, (__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2)), typeof __t4.colorbase === 'function' ? (__t4.colorbase() ?? 0) : runtime.container((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "colorbase"))) + (i)), ((((c) & (128))) ? (((c) & (127))) : (128)));
                    color_prom = __add_xevious_palette(runtime, color_prom, 1);
                }
                color_prom = __add_xevious_palette(runtime, color_prom, (typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(2) : runtime.macro("TOTAL_COLORS", 2)));
                for (let i = ((0) | 0); ((Number(i) < Number((typeof TOTAL_COLORS === 'function' ? TOTAL_COLORS(0) : runtime.macro("TOTAL_COLORS", 0)))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))((((__t5 = __deref_xevious_palette(runtime, (__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0)), typeof __t5.colorbase === 'function' ? (__t5.colorbase() ?? 0) : runtime.container((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "colorbase"))) + (i)), (((((i) >>> (0)) & 1)) ? (runtime.shiftRight(i, 1)) : (128)));
                }
            }
            function __add_xevious_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_xevious_palette(runtime, p) {
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
            function method_xevious_palette__lambda0(runtime, gfxn) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_gfxdecode.gfx"];
                let __t0, __t1;
                return (((__t0 = __deref_xevious_palette__lambda0(runtime, (__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn)), typeof __t0.colors === 'function' ? (__t0.colors() ?? 0) : runtime.container((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn), "colors"))) * ((__t1 = __deref_xevious_palette__lambda0(runtime, (__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn)), typeof __t1.granularity === 'function' ? (__t1.granularity() ?? 0) : runtime.container((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfxn), "granularity"))));
            }
            function __deref_xevious_palette__lambda0(runtime, p) {
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
                "data_w": method_data_w,
                "ctrl_r": method_ctrl_r,
                "bosco_dsw_r": method_bosco_dsw_r,
                "xevious_fg_colorram_w": method_xevious_fg_colorram_w,
                "xevious_bg_colorram_w": method_xevious_bg_colorram_w,
                "xevious_fg_videoram_w": method_xevious_fg_videoram_w,
                "xevious_bg_videoram_w": method_xevious_bg_videoram_w,
                "xevious_vh_latch_w": method_xevious_vh_latch_w,
                "xevious_bb_r": method_xevious_bb_r,
                "xevious_bs_w": method_xevious_bs_w,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "reset": method_reset,
                "chip_select": method_chip_select,
                "rw": method_rw,
                "vblank_irq": method_vblank_irq,
                "vblank": method_vblank,
                "get_bg_tile_info": method_get_bg_tile_info,
                "get_fg_tile_info": method_get_fg_tile_info,
                "screen_update_xevious": method_screen_update_xevious,
                "draw_sprites": method_draw_sprites,
                "K_r": method_K_r,
                "R0_r": method_R0_r,
                "R2_r": method_R2_r,
                "xevious_palette": method_xevious_palette,
                "xevious_palette__lambda0": method_xevious_palette__lambda0
            };
            return __methodTable;
        })();
        return {
            "xevious_state.bosco_dsw_r": methods["bosco_dsw_r"],
            "xevious_state.xevious_fg_colorram_w": methods["xevious_fg_colorram_w"],
            "xevious_state.xevious_bg_colorram_w": methods["xevious_bg_colorram_w"],
            "xevious_state.xevious_fg_videoram_w": methods["xevious_fg_videoram_w"],
            "xevious_state.xevious_bg_videoram_w": methods["xevious_bg_videoram_w"],
            "xevious_state.xevious_vh_latch_w": methods["xevious_vh_latch_w"],
            "xevious_state.xevious_bb_r": methods["xevious_bb_r"],
            "xevious_state.xevious_bs_w": methods["xevious_bs_w"],
            "xevious_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "xevious_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "xevious_state.screen_update_xevious": methods["screen_update_xevious"],
            "xevious_state.draw_sprites": methods["draw_sprites"],
            "xevious_state.xevious_palette": methods["xevious_palette"],
            "xevious_state.xevious_palette__lambda0": methods["xevious_palette__lambda0"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "adjust", "draw", "flip_screen", "flip_screen_set", "ioport", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_cpu.set_input_line", "m_cpu3_interrupt_timer.adjust", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_fg_tilemap.set_scrollx", "m_fg_tilemap.set_scrolly", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.transpen_mask", "m_screen.time_until_pos", "m_subcpu.set_input_line", "m_subcpu2.pulse_input_line", "mark_tile_dirty", "memregion", "palette.set_indirect_color", "palette.set_pen_indirect", "rgb_t", "set", "set_indirect_color", "set_pen_indirect", "set_scrollx", "set_scrolly", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
