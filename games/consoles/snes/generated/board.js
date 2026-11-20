// GENERATED executable machine composition from src/mame/nintendo/snes.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'snes');
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
            const __mame_table_0 = [0, 2, 4, 6, 8, 10, 12, 14, 512, 514, 516, 518, 520, 522, 524, 526, 1024, 1026, 1028, 1030, 1032, 1034, 1036, 1038, 1536, 1538, 1540, 1542, 1544, 1546, 1548, 1550, 2048, 2050, 2052, 2054, 2056, 2058, 2060, 2062];
            function method_snes_scanline_tick(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_ppu.set_current_vert"], __L2 = __l["m_ppu.current_vert"], __L3 = __l["m_ppu.current_x"], __L4 = __l["m_ppu.current_y"], __L5 = __l["m_ppu.set_latch_hv"], __L6 = __l["m_ppu.htmult"], __L7 = __l["m_screen.time_until_pos"], __L8 = __l["m_hirq_timer.adjust"], __L9 = __l["adjust"], __L10 = __l["m_ppu.last_visible_line"], __L11 = __l["m_oam_reset_addr_timer.adjust"], __L12 = __l["m_maincpu.cycles_to_attotime"], __L13 = __l["m_nmi_timer.adjust"], __L14 = __l["m_io_timer.adjust"], __L15 = __l["m_maincpu.space"], __L16 = __l["m_ppu.toggle_field"], __L17 = __l["m_ppu.clear_time_range_over"], __L18 = __l["m_maincpu.set_input_line"], __L19 = __l["m_hblank_timer.adjust"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16, __t17;
                (__L1 ?? runtime.memberCall(members.m_ppu, "set_current_vert", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 18, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 18)) & (-65)));
                if ((((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 0)) & (32))) && (((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 0)) & (16))) ? 0 : 1))) ? 1 : 0)) {
                    if (((Number((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) === Number((members.m_vtime ?? runtime.member("m_vtime")))) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 17, 128);
                        (__L5 ?? runtime.memberCall(members.m_ppu, "set_latch_hv", 0, undefined))((__L3 ?? runtime.memberCall(members.m_ppu, "current_x", 0, undefined))(), (__L4 ?? runtime.memberCall(members.m_ppu, "current_y", 0, undefined))());
                        (runtime.overrides["scpu_irq_refresh"] ? runtime.overrides["scpu_irq_refresh"]() : method_scpu_irq_refresh(runtime));
                    }
                }
                if (((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 0)) & (16))) {
                    let setirq = ((1) | 0);
                    let pixel = (((members.m_htime ?? runtime.member("m_htime"))) | 0);
                    if (((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 0)) & (32))) {
                        if (((Number((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) !== Number((members.m_vtime ?? runtime.member("m_vtime")))) ? 1 : 0)) {
                            setirq = ((0) | 0);
                        }
                    }
                    if (setirq) {
                        if ((((pixel) === (0)) ? 1 : 0)) {
                            (runtime.overrides["hirq_tick"] ? runtime.overrides["hirq_tick"]() : method_hirq_tick(runtime));
                        }
                        else {
                            (__L8 ?? runtime.memberCall(members.m_hirq_timer, "adjust", 0, __L9))((__L7 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), ((pixel) * ((__L6 ?? runtime.memberCall(members.m_ppu, "htmult", 0, undefined))()))));
                        }
                    }
                }
                if (((Number((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) === Number((__L10 ?? runtime.memberCall(members.m_ppu, "last_visible_line", 0, undefined))())) ? 1 : 0)) {
                    (__L11 ?? runtime.memberCall(members.m_oam_reset_addr_timer, "adjust", 0, __L9))((__L7 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), 10));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 18, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 18)) | (129)));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 16, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 16)) | (128)));
                    if (((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 0)) & (128))) {
                        (__L13 ?? runtime.memberCall(members.m_nmi_timer, "adjust", 0, __L9))((__L12 ?? runtime.memberCall(members.m_maincpu, "cycles_to_attotime", 0, undefined))(12));
                    }
                    (__L14 ?? runtime.memberCall(members.m_io_timer, "adjust", 0, __L9))((__L7 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(__add_snes_scanline_tick(runtime, (__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), 2), (((members.m_hblank_offset ?? runtime.member("m_hblank_offset"))) * ((__L6 ?? runtime.memberCall(members.m_ppu, "htmult", 0, undefined))()))));
                }
                if (((Number((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) === Number(0)) ? 1 : 0)) {
                    let cpu0space = (__L15 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
                    (runtime.overrides["hdma_init"] ? runtime.overrides["hdma_init"](cpu0space) : method_hdma_init(runtime, cpu0space));
                }
                if (((Number((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) === Number(0)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 18, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 18)) & (127)));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 16, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 16)) & (127)));
                    (__L16 ?? runtime.memberCall(members.m_ppu, "toggle_field", 0, undefined))();
                    (__L17 ?? runtime.memberCall(members.m_ppu, "clear_time_range_over", 0, undefined))();
                    (__L18 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
                }
                (__L19 ?? runtime.memberCall(members.m_hblank_timer, "adjust", 0, __L9))((__L7 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))((__L2 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), (((members.m_hblank_offset ?? runtime.member("m_hblank_offset"))) * ((__L6 ?? runtime.memberCall(members.m_ppu, "htmult", 0, undefined))()))));
            }
            function __add_snes_scanline_tick(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_scpu_irq_refresh(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_scpu_irq.in_w_0"], __L1 = __l["m_maincpu.set_input_line"];
                const h_m_scpu_irq = members.m_scpu_irq ?? runtime.member("m_scpu_irq");
                if (((Number(h_m_scpu_irq) !== Number(0)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_scpu_irq, "in_w_0", 0, undefined))(((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 17)) & (128)));
                }
                else {
                    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 17)) & (128))) ? (1) : (0)));
                }
            }
            function method_hirq_tick(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.current_x"], __L1 = __l["m_ppu.current_y"], __L2 = __l["m_ppu.set_latch_hv"];
                let __t0, __t1;
                (__L2 ?? runtime.memberCall(members.m_ppu, "set_latch_hv", 0, undefined))((__L0 ?? runtime.memberCall(members.m_ppu, "current_x", 0, undefined))(), (__L1 ?? runtime.memberCall(members.m_ppu, "current_y", 0, undefined))());
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 17, 128);
                (runtime.overrides["scpu_irq_refresh"] ? runtime.overrides["scpu_irq_refresh"]() : method_scpu_irq_refresh(runtime));
            }
            function method_hdma_init(runtime, space) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                members.m_hdmaen = ((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 12)) & 0xff);
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) {
                        runtime.readIndex(h_m_dma_channel, i).hdma_addr = runtime.readIndex(h_m_dma_channel, i).src_addr;
                        (runtime.overrides["hdma_update"] ? runtime.overrides["hdma_update"](space, i) : method_hdma_update(runtime, space, i));
                    }
                }
            }
            function method_hdma_update(runtime, space, dma) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                let abus = (((runtime.overrides["get_hdma_addr"] ? runtime.overrides["get_hdma_addr"](dma) : method_get_hdma_addr(runtime, dma))) >>> 0);
                runtime.readIndex(h_m_dma_channel, dma).hdma_line_counter = (runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus));
                if (((runtime.readIndex(h_m_dma_channel, dma).dmap) & (64))) {
                    abus = (((runtime.overrides["get_hdma_addr"] ? runtime.overrides["get_hdma_addr"](dma) : method_get_hdma_addr(runtime, dma))) >>> 0);
                    runtime.readIndex(h_m_dma_channel, dma).trans_size = (((runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus))) << (8));
                    if ((((runtime.readIndex(h_m_dma_channel, dma).hdma_line_counter) || ((((runtime.overrides["is_last_active_channel"] ? runtime.overrides["is_last_active_channel"](dma) : method_is_last_active_channel(runtime, dma))) ? 0 : 1))) ? 1 : 0)) {
                        abus = (((runtime.overrides["get_hdma_addr"] ? runtime.overrides["get_hdma_addr"](dma) : method_get_hdma_addr(runtime, dma))) >>> 0);
                        runtime.readIndex(h_m_dma_channel, dma).trans_size = runtime.shiftRight(runtime.readIndex(h_m_dma_channel, dma).trans_size, 8);
                        runtime.readIndex(h_m_dma_channel, dma).trans_size = ((runtime.readIndex(h_m_dma_channel, dma).trans_size) | ((((runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus))) << (8))));
                    }
                }
                if (((runtime.readIndex(h_m_dma_channel, dma).hdma_line_counter) ? 0 : 1)) {
                    members.m_hdmaen = ((((members.m_hdmaen) & ((~((1) << (dma)))))) & 0xff);
                }
                runtime.readIndex(h_m_dma_channel, dma).do_transfer = 1;
            }
            function method_get_hdma_addr(runtime, dma) {
                const members = runtime.members;
                let __t0;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                return ((((runtime.readIndex(h_m_dma_channel, dma).bank) << (16))) | ((__t0 = runtime.readIndex(h_m_dma_channel, dma).hdma_addr, runtime.readIndex(h_m_dma_channel, dma).hdma_addr = __add_get_hdma_addr(runtime, runtime.readIndex(h_m_dma_channel, dma).hdma_addr, 1), __t0)));
            }
            function __add_get_hdma_addr(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_abus_read(runtime, space, abus) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["space.read_byte"], __L1 = __l["read_byte"];
                if ((((runtime.overrides["dma_abus_valid"] ? runtime.overrides["dma_abus_valid"](abus) : method_dma_abus_valid(runtime, abus))) ? 0 : 1)) {
                    return 0;
                }
                return (__L0 ?? runtime.memberCall(space, "read_byte", 0, __L1))(abus);
            }
            function method_dma_abus_valid(runtime, address) {
                const members = runtime.members;
                if (((Number(((address) & (4259584))) === Number(8448)) ? 1 : 0)) {
                    return 0;
                }
                if (((Number(((address) & (4259328))) === Number(16384)) ? 1 : 0)) {
                    return 0;
                }
                if (((Number(((address) & (4259808))) === Number(16896)) ? 1 : 0)) {
                    return 0;
                }
                if (((Number(((address) & (4259712))) === Number(17152)) ? 1 : 0)) {
                    return 0;
                }
                return 1;
            }
            function method_is_last_active_channel(runtime, dma) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                for (let i = ((((dma) + (1))) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) && (runtime.readIndex(h_m_dma_channel, i).hdma_line_counter)) ? 1 : 0)) {
                        return 0;
                    }
                }
                return 1;
            }
            function method_snes_hblank_tick(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.space"], __L1 = __l["m_screen.vpos"], __L2 = __l["m_ppu.set_current_vert"], __L3 = __l["m_ppu.current_vert"], __L4 = __l["m_ppu.last_visible_line"], __L5 = __l["m_ppu.interlace"], __L6 = __l["m_screen.update_partial"], __L7 = __l["m_ppu.vtotal"], __L8 = __l["m_screen.time_until_pos"], __L9 = __l["m_scanline_timer.adjust"], __L10 = __l["adjust"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9;
                let cpu0space = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
                let nextscan = ((0) | 0);
                (__L2 ?? runtime.memberCall(members.m_ppu, "set_current_vert", 0, undefined))((__L1 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                if (((Number((__L3 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) <= Number((__L4 ?? runtime.memberCall(members.m_ppu, "last_visible_line", 0, undefined))())) ? 1 : 0)) {
                    if (runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 12)) {
                        (runtime.overrides["hdma"] ? runtime.overrides["hdma"](cpu0space) : method_hdma(runtime, cpu0space));
                    }
                    if (((Number((__L1 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) > Number(0)) ? 1 : 0)) {
                        (__L6 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))(((((Number((__L5 ?? runtime.memberCall(members.m_ppu, "interlace", 0, undefined))()) === Number(2)) ? 1 : 0)) ? ((((__L3 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))()) * ((__L5 ?? runtime.memberCall(members.m_ppu, "interlace", 0, undefined))()))) : (runtime.subtract((__L3 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), 1))));
                    }
                }
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 18, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 18)) | (64)));
                nextscan = ((__add_snes_hblank_tick(runtime, (__L3 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), 1)) | 0);
                if (((Number(nextscan) >= Number((__L7 ?? runtime.memberCall(members.m_ppu, "vtotal", 0, undefined))())) ? 1 : 0)) {
                    nextscan = ((0) | 0);
                }
                (__L9 ?? runtime.memberCall(members.m_scanline_timer, "adjust", 0, __L10))((__L8 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(nextscan));
            }
            function __add_snes_hblank_tick(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_hdma(runtime, space) {
                const members = runtime.members;
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                let bbus = ((0) & 0xffff);
                let abus = ((0) >>> 0);
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) {
                        if (runtime.readIndex(h_m_dma_channel, i).do_transfer) {
                            if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (64))) {
                                abus = ((__add_hdma(runtime, ((runtime.readIndex(h_m_dma_channel, i).ibank) << (16)), runtime.readIndex(h_m_dma_channel, i).trans_size)) >>> 0);
                            }
                            else {
                                abus = ((__add_hdma(runtime, ((runtime.readIndex(h_m_dma_channel, i).bank) << (16)), runtime.readIndex(h_m_dma_channel, i).hdma_addr)) >>> 0);
                            }
                            bbus = ((__add_hdma(runtime, runtime.readIndex(h_m_dma_channel, i).dest_addr, 8448)) & 0xffff);
                            switch (((runtime.readIndex(h_m_dma_channel, i).dmap) & (7))) {
                                case 0:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t0 = abus, abus = ((((abus) + (1))) >>> 0), __t0), bbus) : method_dma_transfer(runtime, space, i, (__t0 = abus, abus = ((((abus) + (1))) >>> 0), __t0), bbus));
                                        break;
                                    }
                                case 5:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t1 = abus, abus = ((((abus) + (1))) >>> 0), __t1), bbus) : method_dma_transfer(runtime, space, i, (__t1 = abus, abus = ((((abus) + (1))) >>> 0), __t1), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t2 = abus, abus = ((((abus) + (1))) >>> 0), __t2), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t2 = abus, abus = ((((abus) + (1))) >>> 0), __t2), ((bbus) + (1))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t3 = abus, abus = ((((abus) + (1))) >>> 0), __t3), bbus) : method_dma_transfer(runtime, space, i, (__t3 = abus, abus = ((((abus) + (1))) >>> 0), __t3), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t4 = abus, abus = ((((abus) + (1))) >>> 0), __t4), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t4 = abus, abus = ((((abus) + (1))) >>> 0), __t4), ((bbus) + (1))));
                                        break;
                                    }
                                case 1:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t5 = abus, abus = ((((abus) + (1))) >>> 0), __t5), bbus) : method_dma_transfer(runtime, space, i, (__t5 = abus, abus = ((((abus) + (1))) >>> 0), __t5), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t6 = abus, abus = ((((abus) + (1))) >>> 0), __t6), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t6 = abus, abus = ((((abus) + (1))) >>> 0), __t6), ((bbus) + (1))));
                                        break;
                                    }
                                case 2:
                                case 6:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t7 = abus, abus = ((((abus) + (1))) >>> 0), __t7), bbus) : method_dma_transfer(runtime, space, i, (__t7 = abus, abus = ((((abus) + (1))) >>> 0), __t7), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t8 = abus, abus = ((((abus) + (1))) >>> 0), __t8), bbus) : method_dma_transfer(runtime, space, i, (__t8 = abus, abus = ((((abus) + (1))) >>> 0), __t8), bbus));
                                        break;
                                    }
                                case 3:
                                case 7:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t9 = abus, abus = ((((abus) + (1))) >>> 0), __t9), bbus) : method_dma_transfer(runtime, space, i, (__t9 = abus, abus = ((((abus) + (1))) >>> 0), __t9), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t10 = abus, abus = ((((abus) + (1))) >>> 0), __t10), bbus) : method_dma_transfer(runtime, space, i, (__t10 = abus, abus = ((((abus) + (1))) >>> 0), __t10), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t11 = abus, abus = ((((abus) + (1))) >>> 0), __t11), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t11 = abus, abus = ((((abus) + (1))) >>> 0), __t11), ((bbus) + (1))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t12 = abus, abus = ((((abus) + (1))) >>> 0), __t12), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t12 = abus, abus = ((((abus) + (1))) >>> 0), __t12), ((bbus) + (1))));
                                        break;
                                    }
                                case 4:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t13 = abus, abus = ((((abus) + (1))) >>> 0), __t13), bbus) : method_dma_transfer(runtime, space, i, (__t13 = abus, abus = ((((abus) + (1))) >>> 0), __t13), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t14 = abus, abus = ((((abus) + (1))) >>> 0), __t14), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t14 = abus, abus = ((((abus) + (1))) >>> 0), __t14), ((bbus) + (1))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t15 = abus, abus = ((((abus) + (1))) >>> 0), __t15), ((bbus) + (2))) : method_dma_transfer(runtime, space, i, (__t15 = abus, abus = ((((abus) + (1))) >>> 0), __t15), ((bbus) + (2))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t16 = abus, abus = ((((abus) + (1))) >>> 0), __t16), ((bbus) + (3))) : method_dma_transfer(runtime, space, i, (__t16 = abus, abus = ((((abus) + (1))) >>> 0), __t16), ((bbus) + (3))));
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                            if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (64))) {
                                runtime.readIndex(h_m_dma_channel, i).trans_size = abus;
                            }
                            else {
                                runtime.readIndex(h_m_dma_channel, i).hdma_addr = abus;
                            }
                        }
                    }
                }
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) {
                        runtime.readIndex(h_m_dma_channel, i).do_transfer = (((runtime.readIndex(h_m_dma_channel, i).hdma_line_counter = runtime.subtract(runtime.readIndex(h_m_dma_channel, i).hdma_line_counter, 1))) & (128));
                        if (((((runtime.readIndex(h_m_dma_channel, i).hdma_line_counter) & (127))) ? 0 : 1)) {
                            (runtime.overrides["hdma_update"] ? runtime.overrides["hdma_update"](space, i) : method_hdma_update(runtime, space, i));
                        }
                    }
                }
            }
            function __add_hdma(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_dma_transfer(runtime, space, dma, abus, bbus) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["space.write_byte"], __L1 = __l["write_byte"], __L2 = __l["space.read_byte"], __L3 = __l["read_byte"];
                dma = ((dma) & 0xff);
                bbus = ((bbus) & 0xffff);
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                if (((runtime.readIndex(h_m_dma_channel, dma).dmap) & (128))) {
                    if (((((((bbus) === (8576)) ? 1 : 0)) && ((((((Number(((abus) & (16646144))) === Number(8257536)) ? 1 : 0)) || (((Number(((abus) & (4251648))) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(abus, 0);
                        return;
                    }
                    else {
                        if ((((runtime.overrides["dma_abus_valid"] ? runtime.overrides["dma_abus_valid"](abus) : method_dma_abus_valid(runtime, abus))) ? 0 : 1)) {
                            return;
                        }
                        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(abus, (__L2 ?? runtime.memberCall(space, "read_byte", 0, __L3))(bbus));
                        return;
                    }
                }
                else {
                    if (((((((bbus) === (8576)) ? 1 : 0)) && ((((((Number(((abus) & (16646144))) === Number(8257536)) ? 1 : 0)) || (((Number(((abus) & (4251648))) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        return;
                    }
                    else {
                        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(bbus, (runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus)));
                        return;
                    }
                }
            }
            function method_snes_nmi_tick(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
            }
            function method_snes_hirq_tick_callback(runtime, param) {
                const members = runtime.members;
                (runtime.overrides["hirq_tick"] ? runtime.overrides["hirq_tick"]() : method_hirq_tick(runtime));
            }
            function method_snes_update_io(runtime, param) {
                const members = runtime.members;
                (runtime.overrides["io_read"] ? runtime.overrides["io_read"]() : method_io_read(runtime));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 18, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 18)) & (254)));
            }
            function method_io_read(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrl1.port_poll"], __L1 = __l["m_ctrl2.port_poll"], __L2 = __l["m_ctrl1.read_pin4"], __L3 = __l["m_ctrl2.read_pin4"], __L4 = __l["m_ctrl1.read_pin5"], __L5 = __l["m_ctrl2.read_pin5"];
                let __t0, __t1, __t2, __t3, __t4, __t5;
                if (((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 0)) & (1))) {
                    let joy1 = ((0) & 0xffff);
                    let joy2 = ((0) & 0xffff);
                    let joy3 = ((0) & 0xffff);
                    let joy4 = ((0) & 0xffff);
                    (__L0 ?? runtime.memberCall(members.m_ctrl1, "port_poll", 0, undefined))();
                    (__L1 ?? runtime.memberCall(members.m_ctrl2, "port_poll", 0, undefined))();
                    for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        joy1 = ((((joy1) | ((((((__L2 ?? runtime.memberCall(members.m_ctrl1, "read_pin4", 0, undefined))()) & (1))) << (((15) - (i))))))) & 0xffff);
                        joy2 = ((((joy2) | ((((((__L3 ?? runtime.memberCall(members.m_ctrl2, "read_pin4", 0, undefined))()) & (1))) << (((15) - (i))))))) & 0xffff);
                        joy3 = ((((joy3) | ((((((__L4 ?? runtime.memberCall(members.m_ctrl1, "read_pin5", 0, undefined))()) & (1))) << (((15) - (i))))))) & 0xffff);
                        joy4 = ((((joy4) | ((((((__L5 ?? runtime.memberCall(members.m_ctrl2, "read_pin5", 0, undefined))()) & (1))) << (((15) - (i))))))) & 0xffff);
                    }
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 24, runtime.shiftRight(((joy1) & (255)), 0));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 25, runtime.shiftRight(((joy1) & (65280)), 8));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 26, runtime.shiftRight(((joy2) & (255)), 0));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 27, runtime.shiftRight(((joy2) & (65280)), 8));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 28, runtime.shiftRight(((joy3) & (255)), 0));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 29, runtime.shiftRight(((joy3) & (65280)), 8));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 30, runtime.shiftRight(((joy4) & (255)), 0));
                    runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 31, runtime.shiftRight(((joy4) & (65280)), 8));
                }
            }
            function method_snes_reset_oam_address(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.screen_disabled"], __L1 = __l["m_ppu.oam_address_reset"];
                let __t0, __t1;
                if ((((__L0 ?? runtime.memberCall(members.m_ppu, "screen_disabled", 0, undefined))()) ? 0 : 1)) {
                    (__L1 ?? runtime.memberCall(members.m_ppu, "oam_address_reset", 0, undefined))();
                }
            }
            function method_snes_reset_hdma(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.space"];
                let cpu0space = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
                (runtime.overrides["hdma_init"] ? runtime.overrides["hdma_init"](cpu0space) : method_hdma_init(runtime, cpu0space));
            }
            function method_snes_r_io(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.read"], __L1 = __l["m_soundcpu.spc_port_out_r"], __L2 = __l["machine"], __L3 = __l["machine().side_effects_disabled"], __L4 = __l["ioport"];
                let __t0;
                const h_m_oldjoy1_latch = members.m_oldjoy1_latch ?? runtime.member("m_oldjoy1_latch");
                let value = ((0) & 0xff);
                if ((((((Number(offset) >= Number(8448)) ? 1 : 0)) && (((Number(offset) < Number(8512)) ? 1 : 0))) ? 1 : 0)) {
                    return (__L0 ?? runtime.memberCall(members.m_ppu, "read", 0, undefined))(offset, ((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 1)) & (128)));
                }
                if ((((((Number(offset) >= Number(8512)) ? 1 : 0)) && (((Number(offset) < Number(8576)) ? 1 : 0))) ? 1 : 0)) {
                    return (__L1 ?? runtime.memberCall(members.m_soundcpu, "spc_port_out_r", 0, undefined))(((offset) & (3)));
                }
                if ((((((Number(offset) >= Number(17152)) ? 1 : 0)) && ((((offset) < (17280)) ? 1 : 0))) ? 1 : 0)) {
                    return (runtime.overrides["snes_io_dma_r"] ? runtime.overrides["snes_io_dma_r"](offset) : method_snes_io_dma_r(runtime, offset));
                }
                switch (offset) {
                    case 8576:
                        {
                            value = ((runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), (members.m_wram_address ?? runtime.member("m_wram_address")))) & 0xff);
                            if (((((__L3 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                members.m_wram_address = ((((__add_snes_r_io(runtime, (members.m_wram_address ?? runtime.member("m_wram_address")), 1)) & (131071))) >>> 0);
                            }
                            return value;
                        }
                    case 16406:
                        {
                            return (((((runtime.overrides["oldjoy1_read"] ? runtime.overrides["oldjoy1_read"](((h_m_oldjoy1_latch) & (1))) : method_oldjoy1_read(runtime, ((h_m_oldjoy1_latch) & (1))))) & (3))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (252))));
                        }
                    case 16407:
                        {
                            return (((((((runtime.overrides["oldjoy2_read"] ? runtime.overrides["oldjoy2_read"](((h_m_oldjoy1_latch) & (1))) : method_oldjoy2_read(runtime, ((h_m_oldjoy1_latch) & (1))))) & (3))) | (28))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (224))));
                        }
                    case 16912:
                        {
                            value = ((((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 16)) & (128))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (112))))) & 0xff);
                            if (((((__L3 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 16, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 16)) & (112)));
                            }
                            return ((value) | (2));
                        }
                    case 16913:
                        {
                            value = (((((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (127))) | (((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 17)) & (128))))) & 0xff);
                            if (((((__L3 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 17, 0);
                                (runtime.overrides["scpu_irq_refresh"] ? runtime.overrides["scpu_irq_refresh"]() : method_scpu_irq_refresh(runtime));
                            }
                            return value;
                        }
                    case 16914:
                        {
                            return ((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 18)) & (193))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (62))));
                        }
                    case 16915:
                        {
                            return runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 1);
                        }
                    case 16920:
                    case 16921:
                    case 16922:
                    case 16923:
                    case 16924:
                    case 16925:
                    case 16926:
                    case 16927:
                        {
                            if (((((members.m_is_nss ?? runtime.member("m_is_nss"))) && ((members.m_input_disabled ?? runtime.member("m_input_disabled")))) ? 1 : 0)) {
                                return 0;
                            }
                            return runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), ((offset) - (16896)));
                        }
                    case 16640:
                        {
                            if ((members.m_is_nss ?? runtime.member("m_is_nss"))) {
                                return (__t0 = __deref_snes_r_io(runtime, (__L4 ? __L4("DSW") : runtime.macro("ioport", "DSW"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L4 ? __L4("DSW") : runtime.macro("ioport", "DSW")), "read"));
                            }
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
            }
            function __add_snes_r_io(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_snes_r_io(runtime, p) {
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
            function method_snes_io_dma_r(runtime, offset) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                switch (offset) {
                    case 17152:
                    case 17168:
                    case 17184:
                    case 17200:
                    case 17216:
                    case 17232:
                    case 17248:
                    case 17264:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dmap;
                        }
                    case 17153:
                    case 17169:
                    case 17185:
                    case 17201:
                    case 17217:
                    case 17233:
                    case 17249:
                    case 17265:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dest_addr;
                        }
                    case 17154:
                    case 17170:
                    case 17186:
                    case 17202:
                    case 17218:
                    case 17234:
                    case 17250:
                    case 17266:
                        {
                            return ((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr) & (255));
                        }
                    case 17155:
                    case 17171:
                    case 17187:
                    case 17203:
                    case 17219:
                    case 17235:
                    case 17251:
                    case 17267:
                        {
                            return ((runtime.shiftRight(runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr, 8)) & (255));
                        }
                    case 17156:
                    case 17172:
                    case 17188:
                    case 17204:
                    case 17220:
                    case 17236:
                    case 17252:
                    case 17268:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).bank;
                        }
                    case 17157:
                    case 17173:
                    case 17189:
                    case 17205:
                    case 17221:
                    case 17237:
                    case 17253:
                    case 17269:
                        {
                            return ((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size) & (255));
                        }
                    case 17158:
                    case 17174:
                    case 17190:
                    case 17206:
                    case 17222:
                    case 17238:
                    case 17254:
                    case 17270:
                        {
                            return ((runtime.shiftRight(runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size, 8)) & (255));
                        }
                    case 17159:
                    case 17175:
                    case 17191:
                    case 17207:
                    case 17223:
                    case 17239:
                    case 17255:
                    case 17271:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).ibank;
                        }
                    case 17160:
                    case 17176:
                    case 17192:
                    case 17208:
                    case 17224:
                    case 17240:
                    case 17256:
                    case 17272:
                        {
                            return ((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr) & (255));
                        }
                    case 17161:
                    case 17177:
                    case 17193:
                    case 17209:
                    case 17225:
                    case 17241:
                    case 17257:
                    case 17273:
                        {
                            return ((runtime.shiftRight(runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr, 8)) & (255));
                        }
                    case 17162:
                    case 17178:
                    case 17194:
                    case 17210:
                    case 17226:
                    case 17242:
                    case 17258:
                    case 17274:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_line_counter;
                        }
                    case 17163:
                    case 17179:
                    case 17195:
                    case 17211:
                    case 17227:
                    case 17243:
                    case 17259:
                    case 17275:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).unk;
                        }
                }
                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
            }
            function method_snes_open_bus_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.pc"], __L1 = __l["m_maincpu.space"];
                let __t0;
                let recurse = ((0) & 0xff);
                let result = ((0) & 0xffff);
                if (recurse) {
                    return 255;
                }
                recurse = ((1) & 0xff);
                result = ((runtime.memberCall((__L1 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0), "read_byte", 0, undefined)(runtime.subtract((__L0 ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))(), 1))) & 0xffff);
                recurse = ((0) & 0xff);
                return result;
            }
            function method_oldjoy1_read(runtime, latched) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrl1.read_pin4"], __L1 = __l["m_ctrl1.read_pin5"];
                let __t0, __t1;
                let ret = ((0) & 0xff);
                ret = ((((ret) | ((__L0 ?? runtime.memberCall(members.m_ctrl1, "read_pin4", 0, undefined))()))) & 0xff);
                ret = ((((ret) | ((((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_pin5", 0, undefined))()) << (1))))) & 0xff);
                return ret;
            }
            function method_oldjoy2_read(runtime, latched) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrl2.read_pin4"], __L1 = __l["m_ctrl2.read_pin5"];
                let __t0, __t1;
                let ret = ((0) & 0xff);
                ret = ((((ret) | ((__L0 ?? runtime.memberCall(members.m_ctrl2, "read_pin4", 0, undefined))()))) & 0xff);
                ret = ((((ret) | ((((__L1 ?? runtime.memberCall(members.m_ctrl2, "read_pin5", 0, undefined))()) << (1))))) & 0xff);
                return ret;
            }
            function method_CX4_readw(runtime, addr) {
                const members = runtime.members;
                addr = ((addr) & 0xffff);
                return ((runtime.invoke("CX4_read", addr)) | (((runtime.invoke("CX4_read", ((addr) + (1)))) << (8))));
            }
            function method_CX4_readl(runtime, addr) {
                const members = runtime.members;
                addr = ((addr) & 0xffff);
                return ((((runtime.invoke("CX4_read", addr)) | (((runtime.invoke("CX4_read", ((addr) + (1)))) << (8))))) | (((runtime.invoke("CX4_read", ((addr) + (2)))) << (16))));
            }
            function method_CX4_op00_03(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_C4DoScaleRotate", 0);
            }
            function method_CX4_writew(runtime, space, addr, data) {
                const members = runtime.members;
                addr = ((addr) & 0xffff);
                data = ((data) & 0xffff);
                runtime.invoke("CX4_write", space, ((addr) + (0)), ((data) >>> (0)));
                runtime.invoke("CX4_write", space, ((addr) + (1)), ((data) >>> (8)));
            }
            function method_CX4_op00_07(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_C4DoScaleRotate", 64);
            }
            function method_CX4_op00_08(runtime, space) {
                const members = runtime.members;
                runtime.invoke("CX4_C4DrawWireFrame", space);
            }
            function method_CX4_op00_0c(runtime, space) {
                const members = runtime.members;
                let i = ((0) | 0);
                let j = ((0) | 0);
                let destptr = ((0) >>> 0);
                let waveptr = ((runtime.invoke("CX4_read", 8067)) >>> 0);
                let mask1 = ((49344) & 0xffff);
                let mask2 = ((16191) & 0xffff);
                for (j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    do {
                        let height = (((((-((runtime.invoke("CX4_read", ((waveptr) + (2816)))) << 24 >> 24))) - (16))) << 16 >> 16);
                        for (i = ((0) | 0); (((i) < (40)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let temp = (((((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))) : method_CX4_readw(runtime, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))))) & (mask2))) & 0xffff);
                            if ((((height) >= (0)) ? 1 : 0)) {
                                if ((((height) < (8)) ? 1 : 0)) {
                                    temp = ((((temp) | (((mask1) & ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](__add_CX4_op00_0c(runtime, 2560, ((height) * (2)))) : method_CX4_readw(runtime, __add_CX4_op00_0c(runtime, 2560, ((height) * (2)))))))))) & 0xffff);
                                }
                                else {
                                    temp = ((((temp) | (((mask1) & (65280))))) & 0xffff);
                                }
                            }
                            (runtime.overrides["CX4_writew"] ? runtime.overrides["CX4_writew"](space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp) : method_CX4_writew(runtime, space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp));
                            height = ((((height) + (1))) << 16 >> 16);
                        }
                        waveptr = ((((((waveptr) + (1))) & (127))) >>> 0);
                        mask1 = ((((((mask1) >>> (2))) | (((mask1) << (6))))) & 0xffff);
                        mask2 = ((((((mask2) >>> (2))) | (((mask2) << (6))))) & 0xffff);
                    } while ((((mask1) !== (49344)) ? 1 : 0));
                    destptr = ((((destptr) + (16))) >>> 0);
                    do {
                        let height = (((((-((runtime.invoke("CX4_read", ((waveptr) + (2816)))) << 24 >> 24))) - (16))) << 16 >> 16);
                        for (i = ((0) | 0); (((i) < (40)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let temp = (((((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))) : method_CX4_readw(runtime, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))))) & (mask2))) & 0xffff);
                            if ((((height) >= (0)) ? 1 : 0)) {
                                if ((((height) < (8)) ? 1 : 0)) {
                                    temp = ((((temp) | (((mask1) & ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](__add_CX4_op00_0c(runtime, 2576, ((height) * (2)))) : method_CX4_readw(runtime, __add_CX4_op00_0c(runtime, 2576, ((height) * (2)))))))))) & 0xffff);
                                }
                                else {
                                    temp = ((((temp) | (((mask1) & (65280))))) & 0xffff);
                                }
                            }
                            (runtime.overrides["CX4_writew"] ? runtime.overrides["CX4_writew"](space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp) : method_CX4_writew(runtime, space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp));
                            height = ((((height) + (1))) << 16 >> 16);
                        }
                        waveptr = ((((((waveptr) + (1))) & (127))) >>> 0);
                        mask1 = ((((((mask1) >>> (2))) | (((mask1) << (6))))) & 0xffff);
                        mask2 = ((((((mask2) >>> (2))) | (((mask2) << (6))))) & 0xffff);
                    } while ((((mask1) !== (49344)) ? 1 : 0));
                    destptr = ((((destptr) + (16))) >>> 0);
                }
            }
            function __add_CX4_op00_0c(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_CX4_op05(runtime, space) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["CX4_sar"];
                let temp = ((65536) | 0);
                if ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8067) : method_CX4_readw(runtime, 8067))) {
                    temp = (((__L0 ? __L0(((runtime.divide(temp, (runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8067) : method_CX4_readw(runtime, 8067)))) * ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8065) : method_CX4_readw(runtime, 8065)))), 8) : runtime.macro("CX4_sar", ((runtime.divide(temp, (runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8067) : method_CX4_readw(runtime, 8067)))) * ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8065) : method_CX4_readw(runtime, 8065)))), 8))) | 0);
                }
                (runtime.overrides["CX4_writew"] ? runtime.overrides["CX4_writew"](space, 8064, temp) : method_CX4_writew(runtime, space, 8064, temp));
            }
            function method_CX4_mul(runtime, x, y, rl, rh) {
                const members = runtime.members;
                let rx = ((x) & (16777215));
                let ry = ((y) & (16777215));
                if (((rx) & (8388608))) {
                    rx = ((rx) | (-8388608));
                }
                if (((ry) & (8388608))) {
                    ry = ((ry) | (-8388608));
                }
                rx = ((rx) * (ry));
                runtime.pointerStore(rl, ((rx) & (16777215)));
                runtime.pointerStore(rh, ((runtime.shiftRight(rx, 24)) & (16777215)));
            }
            function method_CX4_cos(runtime, rx) {
                const members = runtime.members;
                return runtime.invoke("CX4_sin", ((rx) + (128)));
            }
            function method_CX4_op5c(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_str", 0, 0);
                runtime.invoke("CX4_immediate_reg", 0);
            }
            function method_CX4_op5e(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 0);
            }
            function method_CX4_op60(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 3);
            }
            function method_CX4_op62(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 6);
            }
            function method_CX4_op64(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 9);
            }
            function method_CX4_op66(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 12);
            }
            function method_CX4_op68(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 15);
            }
            function method_CX4_op6a(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 18);
            }
            function method_CX4_op6c(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 21);
            }
            function method_CX4_op6e(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 24);
            }
            function method_CX4_op70(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 27);
            }
            function method_CX4_op72(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 30);
            }
            function method_CX4_op74(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 33);
            }
            function method_CX4_op76(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 36);
            }
            function method_CX4_op78(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 39);
            }
            function method_CX4_op7a(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 42);
            }
            function method_CX4_op7c(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 45);
            }
            function method_CX4_op89(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_str", 0, 344886);
                runtime.invoke("CX4_str", 1, 16777215);
            }
            function method_snes_io_dma_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                switch (offset) {
                    case 17152:
                    case 17168:
                    case 17184:
                    case 17200:
                    case 17216:
                    case 17232:
                    case 17248:
                    case 17264:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dmap = data;
                            break;
                        }
                    case 17153:
                    case 17169:
                    case 17185:
                    case 17201:
                    case 17217:
                    case 17233:
                    case 17249:
                    case 17265:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dest_addr = data;
                            break;
                        }
                    case 17154:
                    case 17170:
                    case 17186:
                    case 17202:
                    case 17218:
                    case 17234:
                    case 17250:
                    case 17266:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr) & (65280))) | (((data) << (0))));
                            break;
                        }
                    case 17155:
                    case 17171:
                    case 17187:
                    case 17203:
                    case 17219:
                    case 17235:
                    case 17251:
                    case 17267:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr) & (255))) | (((data) << (8))));
                            break;
                        }
                    case 17156:
                    case 17172:
                    case 17188:
                    case 17204:
                    case 17220:
                    case 17236:
                    case 17252:
                    case 17268:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).bank = data;
                            break;
                        }
                    case 17157:
                    case 17173:
                    case 17189:
                    case 17205:
                    case 17221:
                    case 17237:
                    case 17253:
                    case 17269:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size) & (65280))) | (((data) << (0))));
                            break;
                        }
                    case 17158:
                    case 17174:
                    case 17190:
                    case 17206:
                    case 17222:
                    case 17238:
                    case 17254:
                    case 17270:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size) & (255))) | (((data) << (8))));
                            break;
                        }
                    case 17159:
                    case 17175:
                    case 17191:
                    case 17207:
                    case 17223:
                    case 17239:
                    case 17255:
                    case 17271:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).ibank = data;
                            break;
                        }
                    case 17160:
                    case 17176:
                    case 17192:
                    case 17208:
                    case 17224:
                    case 17240:
                    case 17256:
                    case 17272:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr) & (65280))) | (((data) << (0))));
                            break;
                        }
                    case 17161:
                    case 17177:
                    case 17193:
                    case 17209:
                    case 17225:
                    case 17241:
                    case 17257:
                    case 17273:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr) & (255))) | (((data) << (8))));
                            break;
                        }
                    case 17162:
                    case 17178:
                    case 17194:
                    case 17210:
                    case 17226:
                    case 17242:
                    case 17258:
                    case 17274:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_line_counter = data;
                            break;
                        }
                    case 17163:
                    case 17179:
                    case 17195:
                    case 17211:
                    case 17227:
                    case 17243:
                    case 17259:
                    case 17275:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).unk = data;
                            break;
                        }
                }
                runtime.writeIndex(runtime.writableMember("m_dma_regs"), ((offset) - (17152)), data);
            }
            function method_dma(runtime, space, channels) {
                const members = runtime.members;
                channels = ((channels) & 0xff);
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                let increment = ((0) << 24 >> 24);
                let bbus = ((0) & 0xffff);
                let abus = ((0) >>> 0);
                let abus_bank = ((0) >>> 0);
                let length = ((0) & 0xffff);
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((channels) >>> (i)) & 1)) {
                        runtime.readIndex(h_m_dma_channel, i).dma_disabled = 0;
                        abus = ((runtime.readIndex(h_m_dma_channel, i).src_addr) >>> 0);
                        abus_bank = ((((runtime.readIndex(h_m_dma_channel, i).bank) << (16))) >>> 0);
                        bbus = ((__add_dma(runtime, runtime.readIndex(h_m_dma_channel, i).dest_addr, 8448)) & 0xffff);
                        if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (8))) {
                            increment = ((0) << 24 >> 24);
                        }
                        else {
                            if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (16))) {
                                increment = ((-1) << 24 >> 24);
                            }
                            else {
                                increment = ((1) << 24 >> 24);
                            }
                        }
                        length = ((runtime.readIndex(h_m_dma_channel, i).trans_size) & 0xffff);
                        switch (((runtime.readIndex(h_m_dma_channel, i).dmap) & (7))) {
                            case 0:
                            case 2:
                            case 6:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            case 1:
                            case 5:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            case 3:
                            case 7:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            case 4:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (2))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (2))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (3))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (3))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                        runtime.readIndex(h_m_dma_channel, i).src_addr = abus;
                        runtime.readIndex(h_m_dma_channel, i).trans_size = 0;
                    }
                }
            }
            function __add_dma(runtime, a, b) {
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
                const __L0 = __l["m_ppu.refresh_scanline"];
                for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    (__L0 ?? runtime.memberCall(members.m_ppu, "refresh_scanline", 0, undefined))(bitmap, ((y) + (1)));
                }
                return 0;
            }
            function method_machine_reset__base(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.reset_interlace"];
                let __t0;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                (runtime.overrides["snes_init_ram"] ? runtime.overrides["snes_init_ram"]() : method_snes_init_ram(runtime));
                for (let __range0 = h_m_dma_channel, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                    const __range0_item = runtime.readIndex(__range0, __range0_index);
                    __range0_item.dmap = 255;
                    __range0_item.dest_addr = 255;
                    __range0_item.src_addr = 65535;
                    __range0_item.bank = 255;
                    __range0_item.trans_size = 65535;
                    __range0_item.ibank = 255;
                    __range0_item.hdma_addr = 65535;
                    __range0_item.hdma_line_counter = 255;
                    __range0_item.unk = 255;
                }
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 0, 0);
                members.m_htime = ((511) & 0xffff);
                members.m_vtime = ((511) & 0xffff);
                (__L0 ?? runtime.memberCall(members.m_ppu, "reset_interlace", 0, undefined))();
            }
            function method_snes_init_ram(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.frame_period"], __L1 = __l["m_ppu.set_current_vert"];
                let __t0;
                let i = ((0) | 0);
                let size = runtime.container(members.m_wram, "bytes");
                for (i = ((0) | 0); ((Number(i) < Number(size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    runtime.writeIndex(runtime.writableMember("m_wram"), i, 85);
                }
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 24, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 25, 0)));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 26, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 27, 0)));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 28, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 29, 0)));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 30, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 31, 0)));
                runtime.writeIndex(runtime.writableMember("m_data1"), 0, (runtime.writeIndex(runtime.writableMember("m_data2"), 0, (runtime.writeIndex(runtime.writableMember("m_data1"), 1, (runtime.writeIndex(runtime.writableMember("m_data2"), 1, 0)))))));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 1, 255);
                if (((Number((typeof (__L0 ?? runtime.memberCall(members.m_screen, "frame_period", 0, undefined))() === 'number' ? runtime.attotime((__L0 ?? runtime.memberCall(members.m_screen, "frame_period", 0, undefined))(), "as_hz") : (__deref_snes_init_ram(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "frame_period", 0, undefined))()).as_hz?.() ?? 0))) >= Number(59)) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_ppu, "set_current_vert", 0, undefined))(262);
                }
                else {
                    (__L1 ?? runtime.memberCall(members.m_ppu, "set_current_vert", 0, undefined))(312);
                }
            }
            function __deref_snes_init_ram(runtime, p) {
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
            function method_machine_start__lambda0(runtime, offset, __unnamed1, __unnamed2) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.set_address"];
                (__L0 ?? runtime.memberCall(members.m_cartslot, "set_address", 0, undefined))(offset);
            }
            function method_machine_start__lambda1(runtime, offset, __unnamed1, __unnamed2) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.set_address"];
                (__L0 ?? runtime.memberCall(members.m_cartslot, "set_address", 0, undefined))(offset);
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "snes_scanline_tick": method_snes_scanline_tick,
                "scpu_irq_refresh": method_scpu_irq_refresh,
                "hirq_tick": method_hirq_tick,
                "hdma_init": method_hdma_init,
                "hdma_update": method_hdma_update,
                "get_hdma_addr": method_get_hdma_addr,
                "abus_read": method_abus_read,
                "dma_abus_valid": method_dma_abus_valid,
                "is_last_active_channel": method_is_last_active_channel,
                "snes_hblank_tick": method_snes_hblank_tick,
                "hdma": method_hdma,
                "dma_transfer": method_dma_transfer,
                "snes_nmi_tick": method_snes_nmi_tick,
                "snes_hirq_tick_callback": method_snes_hirq_tick_callback,
                "snes_update_io": method_snes_update_io,
                "io_read": method_io_read,
                "snes_reset_oam_address": method_snes_reset_oam_address,
                "snes_reset_hdma": method_snes_reset_hdma,
                "snes_r_io": method_snes_r_io,
                "snes_io_dma_r": method_snes_io_dma_r,
                "snes_open_bus_r": method_snes_open_bus_r,
                "oldjoy1_read": method_oldjoy1_read,
                "oldjoy2_read": method_oldjoy2_read,
                "CX4_readw": method_CX4_readw,
                "CX4_readl": method_CX4_readl,
                "CX4_op00_03": method_CX4_op00_03,
                "CX4_writew": method_CX4_writew,
                "CX4_op00_07": method_CX4_op00_07,
                "CX4_op00_08": method_CX4_op00_08,
                "CX4_op00_0c": method_CX4_op00_0c,
                "CX4_op05": method_CX4_op05,
                "CX4_mul": method_CX4_mul,
                "CX4_cos": method_CX4_cos,
                "CX4_op5c": method_CX4_op5c,
                "CX4_op5e": method_CX4_op5e,
                "CX4_op60": method_CX4_op60,
                "CX4_op62": method_CX4_op62,
                "CX4_op64": method_CX4_op64,
                "CX4_op66": method_CX4_op66,
                "CX4_op68": method_CX4_op68,
                "CX4_op6a": method_CX4_op6a,
                "CX4_op6c": method_CX4_op6c,
                "CX4_op6e": method_CX4_op6e,
                "CX4_op70": method_CX4_op70,
                "CX4_op72": method_CX4_op72,
                "CX4_op74": method_CX4_op74,
                "CX4_op76": method_CX4_op76,
                "CX4_op78": method_CX4_op78,
                "CX4_op7a": method_CX4_op7a,
                "CX4_op7c": method_CX4_op7c,
                "CX4_op89": method_CX4_op89,
                "snes_io_dma_w": method_snes_io_dma_w,
                "dma": method_dma,
                "screen_update": method_screen_update,
                "machine_reset__base": method_machine_reset__base,
                "snes_init_ram": method_snes_init_ram,
                "machine_start__lambda0": method_machine_start__lambda0,
                "machine_start__lambda1": method_machine_start__lambda1
            };
            return __methodTable;
        })();
        return {
            "snes_state.snes_scanline_tick": methods["snes_scanline_tick"],
            "snes_state.scpu_irq_refresh": methods["scpu_irq_refresh"],
            "snes_state.hirq_tick": methods["hirq_tick"],
            "snes_state.hdma_init": methods["hdma_init"],
            "snes_state.hdma_update": methods["hdma_update"],
            "snes_state.get_hdma_addr": methods["get_hdma_addr"],
            "snes_state.abus_read": methods["abus_read"],
            "snes_state.dma_abus_valid": methods["dma_abus_valid"],
            "snes_state.is_last_active_channel": methods["is_last_active_channel"],
            "snes_state.snes_hblank_tick": methods["snes_hblank_tick"],
            "snes_state.hdma": methods["hdma"],
            "snes_state.dma_transfer": methods["dma_transfer"],
            "snes_state.snes_nmi_tick": methods["snes_nmi_tick"],
            "snes_state.snes_hirq_tick_callback": methods["snes_hirq_tick_callback"],
            "snes_state.snes_update_io": methods["snes_update_io"],
            "snes_state.io_read": methods["io_read"],
            "snes_state.snes_reset_oam_address": methods["snes_reset_oam_address"],
            "snes_state.snes_reset_hdma": methods["snes_reset_hdma"],
            "snes_state.snes_r_io": methods["snes_r_io"],
            "snes_state.snes_io_dma_r": methods["snes_io_dma_r"],
            "snes_state.snes_open_bus_r": methods["snes_open_bus_r"],
            "snes_state.oldjoy1_read": methods["oldjoy1_read"],
            "snes_state.oldjoy2_read": methods["oldjoy2_read"],
            "snes_state.snes_io_dma_w": methods["snes_io_dma_w"],
            "snes_state.dma": methods["dma"],
            "snes_state.screen_update": methods["screen_update"],
            "snes_state.machine_reset__base": methods["machine_reset__base"],
            "snes_state.snes_init_ram": methods["snes_init_ram"],
            "snes_state.machine_start__lambda0": methods["machine_start__lambda0"],
            "snes_state.machine_start__lambda1": methods["machine_start__lambda1"],
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
            const __mame_table_0 = [0, 2, 4, 6, 8, 10, 12, 14, 512, 514, 516, 518, 520, 522, 524, 526, 1024, 1026, 1028, 1030, 1032, 1034, 1036, 1038, 1536, 1538, 1540, 1542, 1544, 1546, 1548, 1550, 2048, 2050, 2052, 2054, 2056, 2058, 2060, 2062];
            function method_hdma(runtime, space) {
                const members = runtime.members;
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7, __t8, __t9, __t10, __t11, __t12, __t13, __t14, __t15, __t16;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                let bbus = ((0) & 0xffff);
                let abus = ((0) >>> 0);
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) {
                        if (runtime.readIndex(h_m_dma_channel, i).do_transfer) {
                            if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (64))) {
                                abus = ((__add_hdma(runtime, ((runtime.readIndex(h_m_dma_channel, i).ibank) << (16)), runtime.readIndex(h_m_dma_channel, i).trans_size)) >>> 0);
                            }
                            else {
                                abus = ((__add_hdma(runtime, ((runtime.readIndex(h_m_dma_channel, i).bank) << (16)), runtime.readIndex(h_m_dma_channel, i).hdma_addr)) >>> 0);
                            }
                            bbus = ((__add_hdma(runtime, runtime.readIndex(h_m_dma_channel, i).dest_addr, 8448)) & 0xffff);
                            switch (((runtime.readIndex(h_m_dma_channel, i).dmap) & (7))) {
                                case 0:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t0 = abus, abus = ((((abus) + (1))) >>> 0), __t0), bbus) : method_dma_transfer(runtime, space, i, (__t0 = abus, abus = ((((abus) + (1))) >>> 0), __t0), bbus));
                                        break;
                                    }
                                case 5:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t1 = abus, abus = ((((abus) + (1))) >>> 0), __t1), bbus) : method_dma_transfer(runtime, space, i, (__t1 = abus, abus = ((((abus) + (1))) >>> 0), __t1), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t2 = abus, abus = ((((abus) + (1))) >>> 0), __t2), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t2 = abus, abus = ((((abus) + (1))) >>> 0), __t2), ((bbus) + (1))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t3 = abus, abus = ((((abus) + (1))) >>> 0), __t3), bbus) : method_dma_transfer(runtime, space, i, (__t3 = abus, abus = ((((abus) + (1))) >>> 0), __t3), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t4 = abus, abus = ((((abus) + (1))) >>> 0), __t4), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t4 = abus, abus = ((((abus) + (1))) >>> 0), __t4), ((bbus) + (1))));
                                        break;
                                    }
                                case 1:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t5 = abus, abus = ((((abus) + (1))) >>> 0), __t5), bbus) : method_dma_transfer(runtime, space, i, (__t5 = abus, abus = ((((abus) + (1))) >>> 0), __t5), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t6 = abus, abus = ((((abus) + (1))) >>> 0), __t6), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t6 = abus, abus = ((((abus) + (1))) >>> 0), __t6), ((bbus) + (1))));
                                        break;
                                    }
                                case 2:
                                case 6:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t7 = abus, abus = ((((abus) + (1))) >>> 0), __t7), bbus) : method_dma_transfer(runtime, space, i, (__t7 = abus, abus = ((((abus) + (1))) >>> 0), __t7), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t8 = abus, abus = ((((abus) + (1))) >>> 0), __t8), bbus) : method_dma_transfer(runtime, space, i, (__t8 = abus, abus = ((((abus) + (1))) >>> 0), __t8), bbus));
                                        break;
                                    }
                                case 3:
                                case 7:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t9 = abus, abus = ((((abus) + (1))) >>> 0), __t9), bbus) : method_dma_transfer(runtime, space, i, (__t9 = abus, abus = ((((abus) + (1))) >>> 0), __t9), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t10 = abus, abus = ((((abus) + (1))) >>> 0), __t10), bbus) : method_dma_transfer(runtime, space, i, (__t10 = abus, abus = ((((abus) + (1))) >>> 0), __t10), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t11 = abus, abus = ((((abus) + (1))) >>> 0), __t11), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t11 = abus, abus = ((((abus) + (1))) >>> 0), __t11), ((bbus) + (1))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t12 = abus, abus = ((((abus) + (1))) >>> 0), __t12), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t12 = abus, abus = ((((abus) + (1))) >>> 0), __t12), ((bbus) + (1))));
                                        break;
                                    }
                                case 4:
                                    {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t13 = abus, abus = ((((abus) + (1))) >>> 0), __t13), bbus) : method_dma_transfer(runtime, space, i, (__t13 = abus, abus = ((((abus) + (1))) >>> 0), __t13), bbus));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t14 = abus, abus = ((((abus) + (1))) >>> 0), __t14), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, (__t14 = abus, abus = ((((abus) + (1))) >>> 0), __t14), ((bbus) + (1))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t15 = abus, abus = ((((abus) + (1))) >>> 0), __t15), ((bbus) + (2))) : method_dma_transfer(runtime, space, i, (__t15 = abus, abus = ((((abus) + (1))) >>> 0), __t15), ((bbus) + (2))));
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, (__t16 = abus, abus = ((((abus) + (1))) >>> 0), __t16), ((bbus) + (3))) : method_dma_transfer(runtime, space, i, (__t16 = abus, abus = ((((abus) + (1))) >>> 0), __t16), ((bbus) + (3))));
                                        break;
                                    }
                                default:
                                    {
                                        break;
                                    }
                            }
                            if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (64))) {
                                runtime.readIndex(h_m_dma_channel, i).trans_size = abus;
                            }
                            else {
                                runtime.readIndex(h_m_dma_channel, i).hdma_addr = abus;
                            }
                        }
                    }
                }
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) {
                        runtime.readIndex(h_m_dma_channel, i).do_transfer = (((runtime.readIndex(h_m_dma_channel, i).hdma_line_counter = runtime.subtract(runtime.readIndex(h_m_dma_channel, i).hdma_line_counter, 1))) & (128));
                        if (((((runtime.readIndex(h_m_dma_channel, i).hdma_line_counter) & (127))) ? 0 : 1)) {
                            (runtime.overrides["hdma_update"] ? runtime.overrides["hdma_update"](space, i) : method_hdma_update(runtime, space, i));
                        }
                    }
                }
            }
            function __add_hdma(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_dma_transfer(runtime, space, dma, abus, bbus) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["space.write_byte"], __L1 = __l["write_byte"], __L2 = __l["space.read_byte"], __L3 = __l["read_byte"];
                dma = ((dma) & 0xff);
                bbus = ((bbus) & 0xffff);
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                if (((runtime.readIndex(h_m_dma_channel, dma).dmap) & (128))) {
                    if (((((((bbus) === (8576)) ? 1 : 0)) && ((((((Number(((abus) & (16646144))) === Number(8257536)) ? 1 : 0)) || (((Number(((abus) & (4251648))) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(abus, 0);
                        return;
                    }
                    else {
                        if ((((runtime.overrides["dma_abus_valid"] ? runtime.overrides["dma_abus_valid"](abus) : method_dma_abus_valid(runtime, abus))) ? 0 : 1)) {
                            return;
                        }
                        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(abus, (__L2 ?? runtime.memberCall(space, "read_byte", 0, __L3))(bbus));
                        return;
                    }
                }
                else {
                    if (((((((bbus) === (8576)) ? 1 : 0)) && ((((((Number(((abus) & (16646144))) === Number(8257536)) ? 1 : 0)) || (((Number(((abus) & (4251648))) === Number(0)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        return;
                    }
                    else {
                        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(bbus, (runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus)));
                        return;
                    }
                }
            }
            function method_dma_abus_valid(runtime, address) {
                const members = runtime.members;
                if (((Number(((address) & (4259584))) === Number(8448)) ? 1 : 0)) {
                    return 0;
                }
                if (((Number(((address) & (4259328))) === Number(16384)) ? 1 : 0)) {
                    return 0;
                }
                if (((Number(((address) & (4259808))) === Number(16896)) ? 1 : 0)) {
                    return 0;
                }
                if (((Number(((address) & (4259712))) === Number(17152)) ? 1 : 0)) {
                    return 0;
                }
                return 1;
            }
            function method_abus_read(runtime, space, abus) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["space.read_byte"], __L1 = __l["read_byte"];
                if ((((runtime.overrides["dma_abus_valid"] ? runtime.overrides["dma_abus_valid"](abus) : method_dma_abus_valid(runtime, abus))) ? 0 : 1)) {
                    return 0;
                }
                return (__L0 ?? runtime.memberCall(space, "read_byte", 0, __L1))(abus);
            }
            function method_hdma_update(runtime, space, dma) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                let abus = (((runtime.overrides["get_hdma_addr"] ? runtime.overrides["get_hdma_addr"](dma) : method_get_hdma_addr(runtime, dma))) >>> 0);
                runtime.readIndex(h_m_dma_channel, dma).hdma_line_counter = (runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus));
                if (((runtime.readIndex(h_m_dma_channel, dma).dmap) & (64))) {
                    abus = (((runtime.overrides["get_hdma_addr"] ? runtime.overrides["get_hdma_addr"](dma) : method_get_hdma_addr(runtime, dma))) >>> 0);
                    runtime.readIndex(h_m_dma_channel, dma).trans_size = (((runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus))) << (8));
                    if ((((runtime.readIndex(h_m_dma_channel, dma).hdma_line_counter) || ((((runtime.overrides["is_last_active_channel"] ? runtime.overrides["is_last_active_channel"](dma) : method_is_last_active_channel(runtime, dma))) ? 0 : 1))) ? 1 : 0)) {
                        abus = (((runtime.overrides["get_hdma_addr"] ? runtime.overrides["get_hdma_addr"](dma) : method_get_hdma_addr(runtime, dma))) >>> 0);
                        runtime.readIndex(h_m_dma_channel, dma).trans_size = runtime.shiftRight(runtime.readIndex(h_m_dma_channel, dma).trans_size, 8);
                        runtime.readIndex(h_m_dma_channel, dma).trans_size = ((runtime.readIndex(h_m_dma_channel, dma).trans_size) | ((((runtime.overrides["abus_read"] ? runtime.overrides["abus_read"](space, abus) : method_abus_read(runtime, space, abus))) << (8))));
                    }
                }
                if (((runtime.readIndex(h_m_dma_channel, dma).hdma_line_counter) ? 0 : 1)) {
                    members.m_hdmaen = ((((members.m_hdmaen) & ((~((1) << (dma)))))) & 0xff);
                }
                runtime.readIndex(h_m_dma_channel, dma).do_transfer = 1;
            }
            function method_get_hdma_addr(runtime, dma) {
                const members = runtime.members;
                let __t0;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                return ((((runtime.readIndex(h_m_dma_channel, dma).bank) << (16))) | ((__t0 = runtime.readIndex(h_m_dma_channel, dma).hdma_addr, runtime.readIndex(h_m_dma_channel, dma).hdma_addr = __add_get_hdma_addr(runtime, runtime.readIndex(h_m_dma_channel, dma).hdma_addr, 1), __t0)));
            }
            function __add_get_hdma_addr(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_is_last_active_channel(runtime, dma) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                for (let i = ((((dma) + (1))) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((((((members.m_hdmaen ?? runtime.member("m_hdmaen"))) >>> (i)) & 1)) && (runtime.readIndex(h_m_dma_channel, i).hdma_line_counter)) ? 1 : 0)) {
                        return 0;
                    }
                }
                return 1;
            }
            function method_snes20_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.get_type"], __L1 = __l["m_cartslot.chip_read"], __L2 = __l["m_cartslot.read_l"], __L3 = __l["m_cartslot.m_cart.get_rom_size"], __L4 = __l["get_rom_size"], __L5 = __l["m_cartslot.m_cart.get_nvram_size"], __L6 = __l["get_nvram_size"], __L7 = __l["m_cartslot.read_ram"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(17)) ? 1 : 0)) && ((((((((((offset) >= (6291456)) ? 1 : 0)) && ((((offset) < (6815744)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(16384)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                }
                else {
                    if (((((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(17)) ? 1 : 0)) || (((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(18)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6815744)) ? 1 : 0)) && ((((offset) < (7340032)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                    }
                    else {
                        if ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(4)) ? 1 : 0)) && ((((((((((offset) < (4194304)) ? 1 : 0)) && (((Number(((offset) & (65535))) >= Number(24576)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                            return runtime.invoke("CX4_read", ((((offset) & (65535))) - (24576)));
                        }
                    }
                }
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                            }
                            else {
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((offset) < (7340032)) ? 1 : 0)) {
                        if ((((address) < (32768)) ? 1 : 0)) {
                            return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                        }
                        else {
                            return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                        }
                    }
                    else {
                        if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(26)) ? 1 : 0)) && ((((address) >= (32768)) ? 1 : 0))) ? 1 : 0)) && ((((offset) < (7602176)) ? 1 : 0))) ? 1 : 0)) {
                            return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                        }
                        if ((((((Number((__L3 ?? runtime.memberCall(__deref_snes20_lo_r(runtime, h_m_cartslot).m_cart, "get_rom_size", 0, __L4))()) > Number(2097152)) ? 1 : 0)) && ((((address) >= (32768)) ? 1 : 0))) ? 1 : 0)) {
                            return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                        }
                        else {
                            if (((Number((__L5 ?? runtime.memberCall(__deref_snes20_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L6))()) > Number(32768)) ? 1 : 0)) {
                                offset = __add_snes20_lo_r(runtime, ((runtime.divide(((offset) - (7340032)), 65536)) * (32768)), ((offset) & (32767)));
                                return (__L7 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                            }
                            else {
                                if (((Number((__L5 ?? runtime.memberCall(__deref_snes20_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L6))()) > Number(0)) ? 1 : 0)) {
                                    return (__L7 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                }
                                else {
                                    return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                                }
                            }
                        }
                    }
                }
            }
            function __add_snes20_lo_r(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_snes20_lo_r(runtime, p) {
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
            function method_snes_r_io(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.read"], __L1 = __l["m_soundcpu.spc_port_out_r"], __L2 = __l["machine"], __L3 = __l["machine().side_effects_disabled"], __L4 = __l["ioport"];
                let __t0;
                const h_m_oldjoy1_latch = members.m_oldjoy1_latch ?? runtime.member("m_oldjoy1_latch");
                let value = ((0) & 0xff);
                if ((((((Number(offset) >= Number(8448)) ? 1 : 0)) && (((Number(offset) < Number(8512)) ? 1 : 0))) ? 1 : 0)) {
                    return (__L0 ?? runtime.memberCall(members.m_ppu, "read", 0, undefined))(offset, ((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 1)) & (128)));
                }
                if ((((((Number(offset) >= Number(8512)) ? 1 : 0)) && (((Number(offset) < Number(8576)) ? 1 : 0))) ? 1 : 0)) {
                    return (__L1 ?? runtime.memberCall(members.m_soundcpu, "spc_port_out_r", 0, undefined))(((offset) & (3)));
                }
                if ((((((Number(offset) >= Number(17152)) ? 1 : 0)) && ((((offset) < (17280)) ? 1 : 0))) ? 1 : 0)) {
                    return (runtime.overrides["snes_io_dma_r"] ? runtime.overrides["snes_io_dma_r"](offset) : method_snes_io_dma_r(runtime, offset));
                }
                switch (offset) {
                    case 8576:
                        {
                            value = ((runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), (members.m_wram_address ?? runtime.member("m_wram_address")))) & 0xff);
                            if (((((__L3 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                members.m_wram_address = ((((__add_snes_r_io(runtime, (members.m_wram_address ?? runtime.member("m_wram_address")), 1)) & (131071))) >>> 0);
                            }
                            return value;
                        }
                    case 16406:
                        {
                            return (((((runtime.overrides["oldjoy1_read"] ? runtime.overrides["oldjoy1_read"](((h_m_oldjoy1_latch) & (1))) : method_oldjoy1_read(runtime, ((h_m_oldjoy1_latch) & (1))))) & (3))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (252))));
                        }
                    case 16407:
                        {
                            return (((((((runtime.overrides["oldjoy2_read"] ? runtime.overrides["oldjoy2_read"](((h_m_oldjoy1_latch) & (1))) : method_oldjoy2_read(runtime, ((h_m_oldjoy1_latch) & (1))))) & (3))) | (28))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (224))));
                        }
                    case 16912:
                        {
                            value = ((((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 16)) & (128))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (112))))) & 0xff);
                            if (((((__L3 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 16, ((runtime.readIndex(runtime.writableMember("m_cpu_regs"), 16)) & (112)));
                            }
                            return ((value) | (2));
                        }
                    case 16913:
                        {
                            value = (((((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (127))) | (((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 17)) & (128))))) & 0xff);
                            if (((((__L3 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 17, 0);
                                (runtime.overrides["scpu_irq_refresh"] ? runtime.overrides["scpu_irq_refresh"]() : method_scpu_irq_refresh(runtime));
                            }
                            return value;
                        }
                    case 16914:
                        {
                            return ((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 18)) & (193))) | ((((runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime))) & (62))));
                        }
                    case 16915:
                        {
                            return runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 1);
                        }
                    case 16920:
                    case 16921:
                    case 16922:
                    case 16923:
                    case 16924:
                    case 16925:
                    case 16926:
                    case 16927:
                        {
                            if (((((members.m_is_nss ?? runtime.member("m_is_nss"))) && ((members.m_input_disabled ?? runtime.member("m_input_disabled")))) ? 1 : 0)) {
                                return 0;
                            }
                            return runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), ((offset) - (16896)));
                        }
                    case 16640:
                        {
                            if ((members.m_is_nss ?? runtime.member("m_is_nss"))) {
                                return (__t0 = __deref_snes_r_io(runtime, (__L4 ? __L4("DSW") : runtime.macro("ioport", "DSW"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L4 ? __L4("DSW") : runtime.macro("ioport", "DSW")), "read"));
                            }
                            break;
                        }
                    default:
                        {
                            break;
                        }
                }
                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
            }
            function __add_snes_r_io(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_snes_r_io(runtime, p) {
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
            function method_snes_io_dma_r(runtime, offset) {
                const members = runtime.members;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                switch (offset) {
                    case 17152:
                    case 17168:
                    case 17184:
                    case 17200:
                    case 17216:
                    case 17232:
                    case 17248:
                    case 17264:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dmap;
                        }
                    case 17153:
                    case 17169:
                    case 17185:
                    case 17201:
                    case 17217:
                    case 17233:
                    case 17249:
                    case 17265:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dest_addr;
                        }
                    case 17154:
                    case 17170:
                    case 17186:
                    case 17202:
                    case 17218:
                    case 17234:
                    case 17250:
                    case 17266:
                        {
                            return ((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr) & (255));
                        }
                    case 17155:
                    case 17171:
                    case 17187:
                    case 17203:
                    case 17219:
                    case 17235:
                    case 17251:
                    case 17267:
                        {
                            return ((runtime.shiftRight(runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr, 8)) & (255));
                        }
                    case 17156:
                    case 17172:
                    case 17188:
                    case 17204:
                    case 17220:
                    case 17236:
                    case 17252:
                    case 17268:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).bank;
                        }
                    case 17157:
                    case 17173:
                    case 17189:
                    case 17205:
                    case 17221:
                    case 17237:
                    case 17253:
                    case 17269:
                        {
                            return ((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size) & (255));
                        }
                    case 17158:
                    case 17174:
                    case 17190:
                    case 17206:
                    case 17222:
                    case 17238:
                    case 17254:
                    case 17270:
                        {
                            return ((runtime.shiftRight(runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size, 8)) & (255));
                        }
                    case 17159:
                    case 17175:
                    case 17191:
                    case 17207:
                    case 17223:
                    case 17239:
                    case 17255:
                    case 17271:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).ibank;
                        }
                    case 17160:
                    case 17176:
                    case 17192:
                    case 17208:
                    case 17224:
                    case 17240:
                    case 17256:
                    case 17272:
                        {
                            return ((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr) & (255));
                        }
                    case 17161:
                    case 17177:
                    case 17193:
                    case 17209:
                    case 17225:
                    case 17241:
                    case 17257:
                    case 17273:
                        {
                            return ((runtime.shiftRight(runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr, 8)) & (255));
                        }
                    case 17162:
                    case 17178:
                    case 17194:
                    case 17210:
                    case 17226:
                    case 17242:
                    case 17258:
                    case 17274:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_line_counter;
                        }
                    case 17163:
                    case 17179:
                    case 17195:
                    case 17211:
                    case 17227:
                    case 17243:
                    case 17259:
                    case 17275:
                        {
                            return runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).unk;
                        }
                }
                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
            }
            function method_snes_open_bus_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.pc"], __L1 = __l["m_maincpu.space"];
                let __t0;
                let recurse = ((0) & 0xff);
                let result = ((0) & 0xffff);
                if (recurse) {
                    return 255;
                }
                recurse = ((1) & 0xff);
                result = ((runtime.memberCall((__L1 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0), "read_byte", 0, undefined)(runtime.subtract((__L0 ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))(), 1))) & 0xffff);
                recurse = ((0) & 0xff);
                return result;
            }
            function method_oldjoy1_read(runtime, latched) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrl1.read_pin4"], __L1 = __l["m_ctrl1.read_pin5"];
                let __t0, __t1;
                let ret = ((0) & 0xff);
                ret = ((((ret) | ((__L0 ?? runtime.memberCall(members.m_ctrl1, "read_pin4", 0, undefined))()))) & 0xff);
                ret = ((((ret) | ((((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_pin5", 0, undefined))()) << (1))))) & 0xff);
                return ret;
            }
            function method_oldjoy2_read(runtime, latched) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrl2.read_pin4"], __L1 = __l["m_ctrl2.read_pin5"];
                let __t0, __t1;
                let ret = ((0) & 0xff);
                ret = ((((ret) | ((__L0 ?? runtime.memberCall(members.m_ctrl2, "read_pin4", 0, undefined))()))) & 0xff);
                ret = ((((ret) | ((((__L1 ?? runtime.memberCall(members.m_ctrl2, "read_pin5", 0, undefined))()) << (1))))) & 0xff);
                return ret;
            }
            function method_scpu_irq_refresh(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_scpu_irq.in_w_0"], __L1 = __l["m_maincpu.set_input_line"];
                const h_m_scpu_irq = members.m_scpu_irq ?? runtime.member("m_scpu_irq");
                if (((Number(h_m_scpu_irq) !== Number(0)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_scpu_irq, "in_w_0", 0, undefined))(((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 17)) & (128)));
                }
                else {
                    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 17)) & (128))) ? (1) : (0)));
                }
            }
            function method_snes20_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.write_l"];
                data = ((data) & 0xff);
                if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(26)) ? 1 : 0)) && (((Number(((offset) & (65535))) >= Number(32768)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6291456)) ? 1 : 0)) && ((((offset) < (6553600)) ? 1 : 0))) ? 1 : 0)) || (((((((offset) >= (7340032)) ? 1 : 0)) && ((((offset) < (7602176)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_cartslot, "write_l", 0, undefined))(offset, data);
                    return;
                }
                (runtime.overrides["snes20_hi_w"] ? runtime.overrides["snes20_hi_w"](space, offset, data) : method_snes20_hi_w(runtime, space, offset, data));
            }
            function method_snes20_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.get_type"], __L1 = __l["m_cartslot.chip_write"], __L2 = __l["m_cartslot.write_h"], __L3 = __l["m_cartslot.m_cart.get_rom_size"], __L4 = __l["get_rom_size"], __L5 = __l["m_cartslot.m_cart.get_nvram_size"], __L6 = __l["get_nvram_size"], __L7 = __l["m_cartslot.write_ram"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7;
                data = ((data) & 0xff);
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if (((((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(17)) ? 1 : 0)) || (((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(18)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6291456)) ? 1 : 0)) && ((((offset) < (6815744)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(16384)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                    return;
                }
                else {
                    if (((((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(17)) ? 1 : 0)) || (((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(18)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6815744)) ? 1 : 0)) && ((((offset) < (7340032)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                        return;
                    }
                    else {
                        if ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(4)) ? 1 : 0)) && ((((((((((offset) < (4194304)) ? 1 : 0)) && (((Number(((offset) & (65535))) >= Number(24576)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                            runtime.invoke("CX4_write", space, ((((offset) & (65535))) - (24576)), data);
                            return;
                        }
                        else {
                            if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(26)) ? 1 : 0)) && ((((address) >= (32768)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6291456)) ? 1 : 0)) && ((((offset) < (6553600)) ? 1 : 0))) ? 1 : 0)) || (((((((offset) >= (7340032)) ? 1 : 0)) && ((((offset) < (7602176)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                (__L2 ?? runtime.memberCall(members.m_cartslot, "write_h", 0, undefined))(offset, data);
                                return;
                            }
                        }
                    }
                }
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                    }
                }
                else {
                    if (((((((offset) >= (7340032)) ? 1 : 0)) && ((((((Number((__L3 ?? runtime.memberCall(__deref_snes20_hi_w(runtime, h_m_cartslot).m_cart, "get_rom_size", 0, __L4))()) <= Number(2097152)) ? 1 : 0)) || ((((address) < (32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        if (((Number((__L5 ?? runtime.memberCall(__deref_snes20_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L6))()) > Number(32768)) ? 1 : 0)) {
                            offset = __add_snes20_hi_w(runtime, ((runtime.divide(((offset) - (7340032)), 65536)) * (32768)), ((offset) & (32767)));
                            (__L7 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                        }
                        else {
                            if (((Number((__L5 ?? runtime.memberCall(__deref_snes20_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L6))()) > Number(0)) ? 1 : 0)) {
                                (__L7 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                            }
                        }
                    }
                }
            }
            function __add_snes20_hi_w(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_snes20_hi_w(runtime, p) {
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
            function method_CX4_readw(runtime, addr) {
                const members = runtime.members;
                addr = ((addr) & 0xffff);
                return ((runtime.invoke("CX4_read", addr)) | (((runtime.invoke("CX4_read", ((addr) + (1)))) << (8))));
            }
            function method_CX4_readl(runtime, addr) {
                const members = runtime.members;
                addr = ((addr) & 0xffff);
                return ((((runtime.invoke("CX4_read", addr)) | (((runtime.invoke("CX4_read", ((addr) + (1)))) << (8))))) | (((runtime.invoke("CX4_read", ((addr) + (2)))) << (16))));
            }
            function method_CX4_op00_03(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_C4DoScaleRotate", 0);
            }
            function method_CX4_writew(runtime, space, addr, data) {
                const members = runtime.members;
                addr = ((addr) & 0xffff);
                data = ((data) & 0xffff);
                runtime.invoke("CX4_write", space, ((addr) + (0)), ((data) >>> (0)));
                runtime.invoke("CX4_write", space, ((addr) + (1)), ((data) >>> (8)));
            }
            function method_CX4_op00_07(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_C4DoScaleRotate", 64);
            }
            function method_CX4_op00_08(runtime, space) {
                const members = runtime.members;
                runtime.invoke("CX4_C4DrawWireFrame", space);
            }
            function method_CX4_op00_0c(runtime, space) {
                const members = runtime.members;
                let i = ((0) | 0);
                let j = ((0) | 0);
                let destptr = ((0) >>> 0);
                let waveptr = ((runtime.invoke("CX4_read", 8067)) >>> 0);
                let mask1 = ((49344) & 0xffff);
                let mask2 = ((16191) & 0xffff);
                for (j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                    do {
                        let height = (((((-((runtime.invoke("CX4_read", ((waveptr) + (2816)))) << 24 >> 24))) - (16))) << 16 >> 16);
                        for (i = ((0) | 0); (((i) < (40)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let temp = (((((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))) : method_CX4_readw(runtime, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))))) & (mask2))) & 0xffff);
                            if ((((height) >= (0)) ? 1 : 0)) {
                                if ((((height) < (8)) ? 1 : 0)) {
                                    temp = ((((temp) | (((mask1) & ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](__add_CX4_op00_0c(runtime, 2560, ((height) * (2)))) : method_CX4_readw(runtime, __add_CX4_op00_0c(runtime, 2560, ((height) * (2)))))))))) & 0xffff);
                                }
                                else {
                                    temp = ((((temp) | (((mask1) & (65280))))) & 0xffff);
                                }
                            }
                            (runtime.overrides["CX4_writew"] ? runtime.overrides["CX4_writew"](space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp) : method_CX4_writew(runtime, space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp));
                            height = ((((height) + (1))) << 16 >> 16);
                        }
                        waveptr = ((((((waveptr) + (1))) & (127))) >>> 0);
                        mask1 = ((((((mask1) >>> (2))) | (((mask1) << (6))))) & 0xffff);
                        mask2 = ((((((mask2) >>> (2))) | (((mask2) << (6))))) & 0xffff);
                    } while ((((mask1) !== (49344)) ? 1 : 0));
                    destptr = ((((destptr) + (16))) >>> 0);
                    do {
                        let height = (((((-((runtime.invoke("CX4_read", ((waveptr) + (2816)))) << 24 >> 24))) - (16))) << 16 >> 16);
                        for (i = ((0) | 0); (((i) < (40)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                            let temp = (((((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))) : method_CX4_readw(runtime, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0)))))) & (mask2))) & 0xffff);
                            if ((((height) >= (0)) ? 1 : 0)) {
                                if ((((height) < (8)) ? 1 : 0)) {
                                    temp = ((((temp) | (((mask1) & ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](__add_CX4_op00_0c(runtime, 2576, ((height) * (2)))) : method_CX4_readw(runtime, __add_CX4_op00_0c(runtime, 2576, ((height) * (2)))))))))) & 0xffff);
                                }
                                else {
                                    temp = ((((temp) | (((mask1) & (65280))))) & 0xffff);
                                }
                            }
                            (runtime.overrides["CX4_writew"] ? runtime.overrides["CX4_writew"](space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp) : method_CX4_writew(runtime, space, ((destptr) + ((__mame_table_0[(((i) % 40) + 40) % 40] ?? 0))), temp));
                            height = ((((height) + (1))) << 16 >> 16);
                        }
                        waveptr = ((((((waveptr) + (1))) & (127))) >>> 0);
                        mask1 = ((((((mask1) >>> (2))) | (((mask1) << (6))))) & 0xffff);
                        mask2 = ((((((mask2) >>> (2))) | (((mask2) << (6))))) & 0xffff);
                    } while ((((mask1) !== (49344)) ? 1 : 0));
                    destptr = ((((destptr) + (16))) >>> 0);
                }
            }
            function __add_CX4_op00_0c(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_CX4_op05(runtime, space) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["CX4_sar"];
                let temp = ((65536) | 0);
                if ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8067) : method_CX4_readw(runtime, 8067))) {
                    temp = (((__L0 ? __L0(((runtime.divide(temp, (runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8067) : method_CX4_readw(runtime, 8067)))) * ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8065) : method_CX4_readw(runtime, 8065)))), 8) : runtime.macro("CX4_sar", ((runtime.divide(temp, (runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8067) : method_CX4_readw(runtime, 8067)))) * ((runtime.overrides["CX4_readw"] ? runtime.overrides["CX4_readw"](8065) : method_CX4_readw(runtime, 8065)))), 8))) | 0);
                }
                (runtime.overrides["CX4_writew"] ? runtime.overrides["CX4_writew"](space, 8064, temp) : method_CX4_writew(runtime, space, 8064, temp));
            }
            function method_CX4_mul(runtime, x, y, rl, rh) {
                const members = runtime.members;
                let rx = ((x) & (16777215));
                let ry = ((y) & (16777215));
                if (((rx) & (8388608))) {
                    rx = ((rx) | (-8388608));
                }
                if (((ry) & (8388608))) {
                    ry = ((ry) | (-8388608));
                }
                rx = ((rx) * (ry));
                runtime.pointerStore(rl, ((rx) & (16777215)));
                runtime.pointerStore(rh, ((runtime.shiftRight(rx, 24)) & (16777215)));
            }
            function method_CX4_cos(runtime, rx) {
                const members = runtime.members;
                return runtime.invoke("CX4_sin", ((rx) + (128)));
            }
            function method_CX4_op5c(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_str", 0, 0);
                runtime.invoke("CX4_immediate_reg", 0);
            }
            function method_CX4_op5e(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 0);
            }
            function method_CX4_op60(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 3);
            }
            function method_CX4_op62(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 6);
            }
            function method_CX4_op64(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 9);
            }
            function method_CX4_op66(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 12);
            }
            function method_CX4_op68(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 15);
            }
            function method_CX4_op6a(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 18);
            }
            function method_CX4_op6c(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 21);
            }
            function method_CX4_op6e(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 24);
            }
            function method_CX4_op70(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 27);
            }
            function method_CX4_op72(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 30);
            }
            function method_CX4_op74(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 33);
            }
            function method_CX4_op76(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 36);
            }
            function method_CX4_op78(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 39);
            }
            function method_CX4_op7a(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 42);
            }
            function method_CX4_op7c(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_immediate_reg", 45);
            }
            function method_CX4_op89(runtime) {
                const members = runtime.members;
                runtime.invoke("CX4_str", 0, 344886);
                runtime.invoke("CX4_str", 1, 16777215);
            }
            function method_snes_w_io(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.write"], __L1 = __l["m_soundcpu.spc_port_in_w"], __L2 = __l["attotime::from_usec"], __L3 = __l["machine().scheduler().perfect_quantum"], __L4 = __l["m_ppu.current_vert"], __L5 = __l["m_screen.time_until_pos"], __L6 = __l["m_hdma_reset_timer.adjust"], __L7 = __l["adjust"];
                let __t0, __t1;
                data = ((data) & 0xff);
                if ((((((Number(offset) >= Number(8448)) ? 1 : 0)) && (((Number(offset) < Number(8512)) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_ppu, "write", 0, undefined))(offset, data);
                    return;
                }
                if ((((((Number(offset) >= Number(8512)) ? 1 : 0)) && (((Number(offset) < Number(8576)) ? 1 : 0))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_soundcpu, "spc_port_in_w", 0, undefined))(((offset) & (3)), data);
                    ((__L3 ?? globalThis.mamekitMissingCall?.("machine().scheduler().perfect_quantum"))?.((__L2 ? __L2(20) : runtime.macro("attotime::from_usec", 20))) ?? 0);
                    return;
                }
                if ((((((Number(offset) >= Number(17152)) ? 1 : 0)) && ((((offset) < (17280)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.overrides["snes_io_dma_w"] ? runtime.overrides["snes_io_dma_w"](offset, data) : method_snes_io_dma_w(runtime, offset, data));
                    return;
                }
                switch (offset) {
                    case 8576:
                        {
                            runtime.writeIndex(runtime.writableMember("m_wram"), (__t0 = (members.m_wram_address ?? runtime.member("m_wram_address")), members.m_wram_address = ((((members.m_wram_address) + (1))) >>> 0), __t0), data);
                            members.m_wram_address = ((((members.m_wram_address) & (131071))) >>> 0);
                            return;
                        }
                    case 8577:
                        {
                            members.m_wram_address = (((((((members.m_wram_address ?? runtime.member("m_wram_address"))) & (130816))) | (((data) << (0))))) >>> 0);
                            return;
                        }
                    case 8578:
                        {
                            members.m_wram_address = (((((((members.m_wram_address ?? runtime.member("m_wram_address"))) & (65791))) | (((data) << (8))))) >>> 0);
                            return;
                        }
                    case 8579:
                        {
                            members.m_wram_address = (((((((members.m_wram_address ?? runtime.member("m_wram_address"))) & (65535))) | (((((data) & (1))) << (16))))) >>> 0);
                            return;
                        }
                    case 16406:
                        {
                            (runtime.overrides["write_joy_latch"] ? runtime.overrides["write_joy_latch"](data) : method_write_joy_latch(runtime, data));
                            if ((members.m_is_nss ?? runtime.member("m_is_nss"))) {
                                members.m_game_over_flag = ((runtime.shiftRight(((data) & (4)), 2)) & 0xff);
                            }
                            return;
                        }
                    case 16407:
                        {
                            return;
                        }
                    case 16896:
                        {
                            if (((Number(((data) & (48))) === Number(0)) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 17, 0);
                                (runtime.overrides["scpu_irq_refresh"] ? runtime.overrides["scpu_irq_refresh"]() : method_scpu_irq_refresh(runtime));
                            }
                            runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 0, data);
                            return;
                        }
                    case 16897:
                        {
                            (runtime.overrides["wrio_write"] ? runtime.overrides["wrio_write"](data) : method_wrio_write(runtime, data));
                            runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 1, data);
                            return;
                        }
                    case 16903:
                        {
                            members.m_htime = (((((((members.m_htime ?? runtime.member("m_htime"))) & (256))) | (((data) << (0))))) & 0xffff);
                            return;
                        }
                    case 16904:
                        {
                            members.m_htime = (((((((members.m_htime ?? runtime.member("m_htime"))) & (255))) | (((((data) & (1))) << (8))))) & 0xffff);
                            return;
                        }
                    case 16905:
                        {
                            members.m_vtime = (((((((members.m_vtime ?? runtime.member("m_vtime"))) & (256))) | (((data) << (0))))) & 0xffff);
                            return;
                        }
                    case 16906:
                        {
                            members.m_vtime = (((((((members.m_vtime ?? runtime.member("m_vtime"))) & (255))) | (((((data) & (1))) << (8))))) & 0xffff);
                            return;
                        }
                    case 16907:
                        {
                            (runtime.overrides["dma"] ? runtime.overrides["dma"](space, data) : method_dma(runtime, space, data));
                            runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 11, 0);
                            return;
                        }
                    case 16908:
                        {
                            if (((Number(data) !== Number(runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 12))) ? 1 : 0)) {
                                (__L6 ?? runtime.memberCall(members.m_hdma_reset_timer, "adjust", 0, __L7))((__L5 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(__add_snes_w_io(runtime, (__L4 ?? runtime.memberCall(members.m_ppu, "current_vert", 0, undefined))(), 1)));
                            }
                            runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 12, data);
                            return;
                        }
                    case 16913:
                        {
                            runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 17, 0);
                            (runtime.overrides["scpu_irq_refresh"] ? runtime.overrides["scpu_irq_refresh"]() : method_scpu_irq_refresh(runtime));
                            return;
                        }
                    case 16914:
                    case 8500:
                    case 8501:
                    case 8502:
                    case 16915:
                    case 16920:
                    case 16921:
                    case 16922:
                    case 16923:
                    case 16924:
                    case 16925:
                    case 16926:
                    case 16927:
                        {
                            0;
                            return;
                        }
                }
            }
            function __add_snes_w_io(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_snes_io_dma_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                switch (offset) {
                    case 17152:
                    case 17168:
                    case 17184:
                    case 17200:
                    case 17216:
                    case 17232:
                    case 17248:
                    case 17264:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dmap = data;
                            break;
                        }
                    case 17153:
                    case 17169:
                    case 17185:
                    case 17201:
                    case 17217:
                    case 17233:
                    case 17249:
                    case 17265:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).dest_addr = data;
                            break;
                        }
                    case 17154:
                    case 17170:
                    case 17186:
                    case 17202:
                    case 17218:
                    case 17234:
                    case 17250:
                    case 17266:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr) & (65280))) | (((data) << (0))));
                            break;
                        }
                    case 17155:
                    case 17171:
                    case 17187:
                    case 17203:
                    case 17219:
                    case 17235:
                    case 17251:
                    case 17267:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).src_addr) & (255))) | (((data) << (8))));
                            break;
                        }
                    case 17156:
                    case 17172:
                    case 17188:
                    case 17204:
                    case 17220:
                    case 17236:
                    case 17252:
                    case 17268:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).bank = data;
                            break;
                        }
                    case 17157:
                    case 17173:
                    case 17189:
                    case 17205:
                    case 17221:
                    case 17237:
                    case 17253:
                    case 17269:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size) & (65280))) | (((data) << (0))));
                            break;
                        }
                    case 17158:
                    case 17174:
                    case 17190:
                    case 17206:
                    case 17222:
                    case 17238:
                    case 17254:
                    case 17270:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).trans_size) & (255))) | (((data) << (8))));
                            break;
                        }
                    case 17159:
                    case 17175:
                    case 17191:
                    case 17207:
                    case 17223:
                    case 17239:
                    case 17255:
                    case 17271:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).ibank = data;
                            break;
                        }
                    case 17160:
                    case 17176:
                    case 17192:
                    case 17208:
                    case 17224:
                    case 17240:
                    case 17256:
                    case 17272:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr) & (65280))) | (((data) << (0))));
                            break;
                        }
                    case 17161:
                    case 17177:
                    case 17193:
                    case 17209:
                    case 17225:
                    case 17241:
                    case 17257:
                    case 17273:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr = ((((runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_addr) & (255))) | (((data) << (8))));
                            break;
                        }
                    case 17162:
                    case 17178:
                    case 17194:
                    case 17210:
                    case 17226:
                    case 17242:
                    case 17258:
                    case 17274:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).hdma_line_counter = data;
                            break;
                        }
                    case 17163:
                    case 17179:
                    case 17195:
                    case 17211:
                    case 17227:
                    case 17243:
                    case 17259:
                    case 17275:
                        {
                            runtime.readIndex(h_m_dma_channel, ((((offset) >>> (4))) & (7))).unk = data;
                            break;
                        }
                }
                runtime.writeIndex(runtime.writableMember("m_dma_regs"), ((offset) - (17152)), data);
            }
            function method_write_joy_latch(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ctrl1.write_strobe"], __L1 = __l["m_ctrl2.write_strobe"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_ctrl1, "write_strobe", 0, undefined))(data);
                (__L1 ?? runtime.memberCall(members.m_ctrl2, "write_strobe", 0, undefined))(data);
            }
            function method_wrio_write(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.current_x"], __L1 = __l["m_ppu.current_y"], __L2 = __l["m_ppu.set_latch_hv"], __L3 = __l["m_ctrl1.write_pin6"], __L4 = __l["m_ctrl2.write_pin6"];
                let __t0, __t1;
                data = ((data) & 0xff);
                if ((((((((runtime.readIndex((members.m_cpu_regs ?? runtime.member("m_cpu_regs")), 1)) & (128))) ? 0 : 1)) && (((data) & (128)))) ? 1 : 0)) {
                    (__L2 ?? runtime.memberCall(members.m_ppu, "set_latch_hv", 0, undefined))((__L0 ?? runtime.memberCall(members.m_ppu, "current_x", 0, undefined))(), (__L1 ?? runtime.memberCall(members.m_ppu, "current_y", 0, undefined))());
                }
                (__L3 ?? runtime.memberCall(members.m_ctrl1, "write_pin6", 0, undefined))((((data) >>> (6)) & 1));
                (__L4 ?? runtime.memberCall(members.m_ctrl2, "write_pin6", 0, undefined))((((data) >>> (7)) & 1));
            }
            function method_dma(runtime, space, channels) {
                const members = runtime.members;
                channels = ((channels) & 0xff);
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                let increment = ((0) << 24 >> 24);
                let bbus = ((0) & 0xffff);
                let abus = ((0) >>> 0);
                let abus_bank = ((0) >>> 0);
                let length = ((0) & 0xffff);
                for (let i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((channels) >>> (i)) & 1)) {
                        runtime.readIndex(h_m_dma_channel, i).dma_disabled = 0;
                        abus = ((runtime.readIndex(h_m_dma_channel, i).src_addr) >>> 0);
                        abus_bank = ((((runtime.readIndex(h_m_dma_channel, i).bank) << (16))) >>> 0);
                        bbus = ((__add_dma(runtime, runtime.readIndex(h_m_dma_channel, i).dest_addr, 8448)) & 0xffff);
                        if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (8))) {
                            increment = ((0) << 24 >> 24);
                        }
                        else {
                            if (((runtime.readIndex(h_m_dma_channel, i).dmap) & (16))) {
                                increment = ((-1) << 24 >> 24);
                            }
                            else {
                                increment = ((1) << 24 >> 24);
                            }
                        }
                        length = ((runtime.readIndex(h_m_dma_channel, i).trans_size) & 0xffff);
                        switch (((runtime.readIndex(h_m_dma_channel, i).dmap) & (7))) {
                            case 0:
                            case 2:
                            case 6:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            case 1:
                            case 5:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            case 3:
                            case 7:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            case 4:
                                {
                                    do {
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), bbus) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), bbus));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (1))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (2))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (2))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                        if (((((((length = ((((length) - (1))) & 0xffff))) ? 0 : 1)) || (runtime.readIndex(h_m_dma_channel, i).dma_disabled)) ? 1 : 0)) {
                                            break;
                                        }
                                        (runtime.overrides["dma_transfer"] ? runtime.overrides["dma_transfer"](space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (3))) : method_dma_transfer(runtime, space, i, ((((abus) & (65535))) | (abus_bank)), ((bbus) + (3))));
                                        abus = ((((abus) + (increment))) >>> 0);
                                    } while (((((length = ((((length) - (1))) & 0xffff))) && (((runtime.readIndex(h_m_dma_channel, i).dma_disabled) ? 0 : 1))) ? 1 : 0));
                                    break;
                                }
                            default:
                                {
                                    break;
                                }
                        }
                        runtime.readIndex(h_m_dma_channel, i).src_addr = abus;
                        runtime.readIndex(h_m_dma_channel, i).trans_size = 0;
                    }
                }
            }
            function __add_dma(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_snes20_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.get_type"], __L1 = __l["m_cartslot.chip_read"], __L2 = __l["m_cartslot.read_h"], __L3 = __l["m_cartslot.m_cart.get_rom_size"], __L4 = __l["get_rom_size"], __L5 = __l["m_cartslot.m_cart.get_nvram_size"], __L6 = __l["get_nvram_size"], __L7 = __l["m_cartslot.read_ram"];
                let __t0, __t1, __t2, __t3, __t4, __t5, __t6, __t7;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if (((((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(17)) ? 1 : 0)) || (((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(18)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6291456)) ? 1 : 0)) && ((((offset) < (6815744)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(16384)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                }
                else {
                    if (((((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(17)) ? 1 : 0)) || (((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(18)) ? 1 : 0))) ? 1 : 0)) && ((((((((((offset) >= (6815744)) ? 1 : 0)) && ((((offset) < (7340032)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                        return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                    }
                    else {
                        if ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(4)) ? 1 : 0)) && ((((((((((offset) < (4194304)) ? 1 : 0)) && (((Number(((offset) & (65535))) >= Number(24576)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) & (65535))) < Number(32768)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                            return runtime.invoke("CX4_read", ((((offset) & (65535))) - (24576)));
                        }
                    }
                }
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                            }
                            else {
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((offset) < (7340032)) ? 1 : 0)) {
                        if ((((address) < (32768)) ? 1 : 0)) {
                            return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                        }
                        else {
                            return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                        }
                    }
                    else {
                        if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(26)) ? 1 : 0)) && ((((address) >= (32768)) ? 1 : 0))) ? 1 : 0)) && ((((offset) < (7602176)) ? 1 : 0))) ? 1 : 0)) {
                            return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                        }
                        if ((((((Number((__L3 ?? runtime.memberCall(__deref_snes20_hi_r(runtime, h_m_cartslot).m_cart, "get_rom_size", 0, __L4))()) > Number(2097152)) ? 1 : 0)) && ((((address) >= (32768)) ? 1 : 0))) ? 1 : 0)) {
                            return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                        }
                        else {
                            if (((Number((__L5 ?? runtime.memberCall(__deref_snes20_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L6))()) > Number(32768)) ? 1 : 0)) {
                                offset = __add_snes20_hi_r(runtime, ((runtime.divide(((offset) - (7340032)), 65536)) * (32768)), ((offset) & (32767)));
                                return (__L7 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                            }
                            else {
                                if (((Number((__L5 ?? runtime.memberCall(__deref_snes20_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L6))()) > Number(0)) ? 1 : 0)) {
                                    return (__L7 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                }
                                else {
                                    return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                                }
                            }
                        }
                    }
                }
            }
            function __add_snes20_hi_r(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_snes20_hi_r(runtime, p) {
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
            function method_snessgb_lo_r(runtime, space, offset) {
                const members = runtime.members;
                return (runtime.overrides["snessgb_hi_r"] ? runtime.overrides["snessgb_hi_r"](space, offset) : method_snessgb_hi_r(runtime, space, offset));
            }
            function method_snessgb_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_h"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((address) >= (32768)) ? 1 : 0)) {
                        return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                    }
                }
                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
            }
            function method_snessgb_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["snessgb_hi_w"] ? runtime.overrides["snessgb_hi_w"](space, offset, data) : method_snessgb_hi_w(runtime, space, offset, data));
            }
            function method_snessgb_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"];
                data = ((data) & 0xff);
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                            }
                        }
                    }
                }
            }
            function method_snessa1_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_l"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (8704)) ? 1 : 0)) && ((((address) < (9216)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                if (((((((address) >= (12288)) ? 1 : 0)) && ((((address) < (14336)) ? 1 : 0))) ? 1 : 0)) {
                                    return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                                }
                                else {
                                    return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                                }
                            }
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((offset) < (5242880)) ? 1 : 0)) {
                        return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                    }
                    else {
                        return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                    }
                }
            }
            function method_snessa1_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"];
                data = ((data) & 0xff);
                if (((((((offset) >= (4194304)) ? 1 : 0)) && ((((offset) < (5242880)) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                }
                else {
                    (runtime.overrides["snessa1_hi_w"] ? runtime.overrides["snessa1_hi_w"](space, offset, data) : method_snessa1_hi_w(runtime, space, offset, data));
                }
            }
            function method_snessa1_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"];
                data = ((data) & 0xff);
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (8704)) ? 1 : 0)) && ((((address) < (9216)) ? 1 : 0))) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                            }
                            else {
                                if (((((((address) >= (12288)) ? 1 : 0)) && ((((address) < (14336)) ? 1 : 0))) ? 1 : 0)) {
                                    (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                                }
                                else {
                                    (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                                }
                            }
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                            }
                        }
                    }
                }
            }
            function method_snessa1_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_h"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (8704)) ? 1 : 0)) && ((((address) < (9216)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                if (((((((address) >= (12288)) ? 1 : 0)) && ((((address) < (14336)) ? 1 : 0))) ? 1 : 0)) {
                                    return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                                }
                                else {
                                    return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                                }
                            }
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                }
            }
            function method_snessfx_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_ram"], __L2 = __l["m_cartslot.read_l"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (12288)) ? 1 : 0)) && ((((address) < (13056)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                            }
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(((offset) & (8191)));
                            }
                            else {
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((offset) < (6291456)) ? 1 : 0)) {
                        return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                    }
                    else {
                        return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                    }
                }
            }
            function method_snessfx_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["snessfx_hi_w"] ? runtime.overrides["snessfx_hi_w"](space, offset, data) : method_snessfx_hi_w(runtime, space, offset, data));
            }
            function method_snessfx_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"], __L1 = __l["m_cartslot.write_ram"];
                data = ((data) & 0xff);
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (12288)) ? 1 : 0)) && ((((address) < (13056)) ? 1 : 0))) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                            }
                            else {
                                (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                            }
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                (__L1 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(((offset) & (8191)), data);
                            }
                        }
                    }
                }
                else {
                    if ((((offset) >= (6291456)) ? 1 : 0)) {
                        (__L1 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                    }
                }
            }
            function method_snessfx_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_ram"], __L2 = __l["m_cartslot.read_h"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (12288)) ? 1 : 0)) && ((((address) < (13056)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            else {
                                return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                            }
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(((offset) & (8191)));
                            }
                            else {
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((offset) < (6291456)) ? 1 : 0)) {
                        return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                    }
                    else {
                        return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                    }
                }
            }
            function method_snessdd1_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_l"], __L2 = __l["m_cartslot.m_cart.get_nvram_size"], __L3 = __l["get_nvram_size"], __L4 = __l["m_cartslot.read_ram"];
                let __t0;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (18432)) ? 1 : 0)) && ((((address) < (18440)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(address);
                            }
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                else {
                    if ((((((((((offset) >= (7340032)) ? 1 : 0)) && ((((address) < (32768)) ? 1 : 0))) ? 1 : 0)) && ((__L2 ?? runtime.memberCall(__deref_snessdd1_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L3))())) ? 1 : 0)) {
                        return (__L4 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                    }
                    else {
                        return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                    }
                }
            }
            function __deref_snessdd1_lo_r(runtime, p) {
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
            function method_snessdd1_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["snessdd1_hi_w"] ? runtime.overrides["snessdd1_hi_w"](space, offset, data) : method_snessdd1_hi_w(runtime, space, offset, data));
            }
            function method_snessdd1_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"], __L1 = __l["m_cartslot.m_cart.get_nvram_size"], __L2 = __l["get_nvram_size"], __L3 = __l["m_cartslot.write_ram"];
                let __t0;
                data = ((data) & 0xff);
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (17152)) ? 1 : 0)) && ((((address) < (17280)) ? 1 : 0))) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(address, data);
                            }
                            if (((((((address) >= (18432)) ? 1 : 0)) && ((((address) < (18440)) ? 1 : 0))) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(address, data);
                                return;
                            }
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                    }
                }
                if ((((((((((offset) >= (7340032)) ? 1 : 0)) && ((((address) < (32768)) ? 1 : 0))) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(__deref_snessdd1_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L2))())) ? 1 : 0)) {
                    return (__L3 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                }
            }
            function __deref_snessdd1_hi_w(runtime, p) {
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
            function method_snessdd1_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.read_h"];
                if ((((offset) >= (4194304)) ? 1 : 0)) {
                    return (__L0 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                }
                else {
                    return (runtime.overrides["snessdd1_lo_r"] ? runtime.overrides["snessdd1_lo_r"](space, offset) : method_snessdd1_lo_r(runtime, space, offset));
                }
            }
            function method_snesbsx_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_l"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (8584)) ? 1 : 0)) && ((((address) < (8608)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            if ((((address) >= (20480)) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) >= (2097152)) ? 1 : 0)) {
                                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                                }
                                else {
                                    return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                                }
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
            }
            function method_snesbsx_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["snesbsx_hi_w"] ? runtime.overrides["snesbsx_hi_w"](space, offset, data) : method_snesbsx_hi_w(runtime, space, offset, data));
            }
            function method_snesbsx_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"], __L1 = __l["m_cartslot.write_l"];
                data = ((data) & 0xff);
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (8584)) ? 1 : 0)) && ((((address) < (8608)) ? 1 : 0))) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                                return;
                            }
                            if ((((address) >= (20480)) ? 1 : 0)) {
                                (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                                return;
                            }
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) >= (2097152)) ? 1 : 0)) {
                                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "write_l", 0, undefined))(offset, data);
                                }
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "write_l", 0, undefined))(offset, data);
                            }
                        }
                    }
                }
                return (__L1 ?? runtime.memberCall(members.m_cartslot, "write_l", 0, undefined))(offset, data);
            }
            function method_snesbsx_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.read_h"];
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            if (((((((address) >= (8584)) ? 1 : 0)) && ((((address) < (8608)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            if ((((address) >= (20480)) ? 1 : 0)) {
                                return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                            }
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) >= (2097152)) ? 1 : 0)) {
                                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                                }
                                else {
                                    return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                                }
                            }
                            else {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                return (__L1 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
            }
            function method_snes21_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.m_cart.get_nvram_size"], __L1 = __l["get_nvram_size"], __L2 = __l["m_cartslot.read_ram"], __L3 = __l["m_cartslot.read_l"];
                let __t0, __t1, __t2, __t3;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if (((((((offset) < (4194304)) ? 1 : 0)) && ((((address) < (32768)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(24)) ? 1 : 0)) && ((__L0 ?? runtime.memberCall(__deref_snes21_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))())) ? 1 : 0)) && ((((offset) >= (2097152)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(((((offset) - (24576))) & (mask)));
                            }
                            if (((((__L0 ?? runtime.memberCall(__deref_snes21_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))()) && ((((offset) >= (3145728)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(((((offset) - (24576))) & (mask)));
                            }
                            else {
                                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                            }
                        }
                    }
                }
                return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
            }
            function __deref_snes21_lo_r(runtime, p) {
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
            function method_snes21_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.m_cart.get_nvram_size"], __L1 = __l["get_nvram_size"], __L2 = __l["m_cartslot.write_ram"];
                let __t0, __t1, __t2, __t3;
                data = ((data) & 0xff);
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if (((((((offset) < (4194304)) ? 1 : 0)) && ((((address) < (32768)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                        else {
                            if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(24)) ? 1 : 0)) && ((__L0 ?? runtime.memberCall(__deref_snes21_lo_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))())) ? 1 : 0)) && ((((offset) >= (2097152)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_lo_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                (__L2 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(((((offset) - (24576))) & (mask)), data);
                                return;
                            }
                            if (((((__L0 ?? runtime.memberCall(__deref_snes21_lo_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))()) && ((((offset) >= (3145728)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_lo_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                (__L2 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(((((offset) - (24576))) & (mask)), data);
                            }
                        }
                    }
                }
            }
            function __deref_snes21_lo_w(runtime, p) {
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
            function method_snes21_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.m_cart.get_nvram_size"], __L1 = __l["get_nvram_size"], __L2 = __l["m_cartslot.read_ram"], __L3 = __l["m_cartslot.read_h"];
                let __t0, __t1, __t2, __t3;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if (((((((offset) < (4194304)) ? 1 : 0)) && ((((address) < (32768)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(24)) ? 1 : 0)) && ((__L0 ?? runtime.memberCall(__deref_snes21_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))())) ? 1 : 0)) && ((((offset) >= (2097152)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(((((offset) - (24576))) & (mask)));
                            }
                            if (((((__L0 ?? runtime.memberCall(__deref_snes21_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))()) && ((((offset) >= (3145728)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(((((offset) - (24576))) & (mask)));
                            }
                            else {
                                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                            }
                        }
                    }
                }
                return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
            }
            function __deref_snes21_hi_r(runtime, p) {
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
            function method_snes21_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.m_cart.get_nvram_size"], __L1 = __l["get_nvram_size"], __L2 = __l["m_cartslot.write_ram"];
                let __t0, __t1, __t2, __t3;
                data = ((data) & 0xff);
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if (((((((offset) < (4194304)) ? 1 : 0)) && ((((address) < (32768)) ? 1 : 0))) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                        else {
                            if (((((((((Number((members.m_type ?? runtime.member("m_type"))) === Number(24)) ? 1 : 0)) && ((__L0 ?? runtime.memberCall(__deref_snes21_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))())) ? 1 : 0)) && ((((offset) >= (2097152)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                (__L2 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(((((offset) - (24576))) & (mask)), data);
                                return;
                            }
                            if (((((__L0 ?? runtime.memberCall(__deref_snes21_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))()) && ((((offset) >= (3145728)) ? 1 : 0))) ? 1 : 0)) {
                                let mask = ((((runtime.subtract((__L0 ?? runtime.memberCall(__deref_snes21_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L1))(), 1)) & (32767))) | 0);
                                (__L2 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(((((offset) - (24576))) & (mask)), data);
                            }
                        }
                    }
                }
            }
            function __deref_snes21_hi_w(runtime, p) {
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
            function method_snes7110_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.get_type"], __L1 = __l["m_cartslot.chip_read"], __L2 = __l["m_cartslot.read_ram"], __L3 = __l["m_cartslot.read_l"];
                let __t0;
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            let limit = ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(15)) ? 1 : 0)) ? (18499) : (18496))) & 0xffff);
                            if (((((((address) >= (18432)) ? 1 : 0)) && ((((address) < (limit)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(address);
                            }
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) < (65536)) ? 1 : 0)) {
                                    return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                }
                                if (((((((offset) >= (3145728)) ? 1 : 0)) && ((((offset) < (3211264)) ? 1 : 0))) ? 1 : 0)) {
                                    return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                }
                            }
                            else {
                                return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                if (((((((offset) >= (5242880)) ? 1 : 0)) && ((((offset) < (5308416)) ? 1 : 0))) ? 1 : 0)) {
                    return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(18432);
                }
                return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
            }
            function method_snes7110_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.get_type"], __L1 = __l["m_cartslot.chip_write"], __L2 = __l["m_cartslot.write_ram"];
                let __t0;
                data = ((data) & 0xff);
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            let limit = ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(15)) ? 1 : 0)) ? (18499) : (18496))) & 0xffff);
                            if (((((((address) >= (18432)) ? 1 : 0)) && ((((address) < (limit)) ? 1 : 0))) ? 1 : 0)) {
                                (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(address, data);
                                return;
                            }
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) < (65536)) ? 1 : 0)) {
                                    (__L2 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                                }
                                if (((((((offset) >= (3145728)) ? 1 : 0)) && ((((offset) < (3211264)) ? 1 : 0))) ? 1 : 0)) {
                                    (__L2 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                                }
                            }
                        }
                    }
                }
            }
            function method_snes7110_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.get_type"], __L1 = __l["m_cartslot.chip_read"], __L2 = __l["m_cartslot.read_ram"], __L3 = __l["m_cartslot.read_h"];
                let __t0;
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            let limit = ((((((Number((__L0 ?? runtime.memberCall(members.m_cartslot, "get_type", 0, undefined))()) === Number(15)) ? 1 : 0)) ? (18499) : (18496))) & 0xffff);
                            if (((((((address) >= (18432)) ? 1 : 0)) && ((((address) < (limit)) ? 1 : 0))) ? 1 : 0)) {
                                return (__L1 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(address);
                            }
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) < (65536)) ? 1 : 0)) {
                                    return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                }
                                if (((((((offset) >= (3145728)) ? 1 : 0)) && ((((offset) < (3211264)) ? 1 : 0))) ? 1 : 0)) {
                                    return (__L2 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                }
                            }
                            else {
                                return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
            }
            function method_snes7110_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["snes7110_lo_w"] ? runtime.overrides["snes7110_lo_w"](space, offset, data) : method_snes7110_lo_w(runtime, space, offset, data));
            }
            function method_pfest94_lo_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.m_cart.get_nvram_size"], __L2 = __l["get_nvram_size"], __L3 = __l["m_cartslot.read_ram"], __L4 = __l["m_cartslot.read_l"];
                let __t0;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) < (1048576)) ? 1 : 0)) {
                                    return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                                }
                                else {
                                    if ((((offset) === (1073152)) ? 1 : 0)) {
                                        return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(((offset) + (32768)));
                                    }
                                    else {
                                        if (((((((offset) >= (3145728)) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(__deref_pfest94_lo_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L2))())) ? 1 : 0)) {
                                            return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                        }
                                        else {
                                            return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                                        }
                                    }
                                }
                            }
                            else {
                                return (__L4 ?? runtime.memberCall(members.m_cartslot, "read_l", 0, undefined))(offset);
                            }
                        }
                    }
                }
                return 255;
            }
            function __deref_pfest94_lo_r(runtime, p) {
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
            function method_pfest94_lo_w(runtime, space, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                (runtime.overrides["pfest94_hi_w"] ? runtime.overrides["pfest94_hi_w"](space, offset, data) : method_pfest94_hi_w(runtime, space, offset, data));
            }
            function method_pfest94_hi_w(runtime, space, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_write"], __L1 = __l["m_cartslot.m_cart.get_nvram_size"], __L2 = __l["get_nvram_size"], __L3 = __l["m_cartslot.write_ram"];
                let __t0;
                data = ((data) & 0xff);
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_wram"), address, data);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            (runtime.overrides["snes_w_io"] ? runtime.overrides["snes_w_io"](space, address, data) : method_snes_w_io(runtime, space, address, data));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) < (1048576)) ? 1 : 0)) {
                                    (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(offset, data);
                                }
                                else {
                                    if ((((offset) === (2121728)) ? 1 : 0)) {
                                        (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_write", 0, undefined))(((offset) + (32768)), data);
                                    }
                                    else {
                                        if (((((((offset) >= (3145728)) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(__deref_pfest94_hi_w(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L2))())) ? 1 : 0)) {
                                            (__L3 ?? runtime.memberCall(members.m_cartslot, "write_ram", 0, undefined))(offset, data);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            function __deref_pfest94_hi_w(runtime, p) {
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
            function method_pfest94_hi_r(runtime, space, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.chip_read"], __L1 = __l["m_cartslot.m_cart.get_nvram_size"], __L2 = __l["get_nvram_size"], __L3 = __l["m_cartslot.read_ram"], __L4 = __l["m_cartslot.read_h"];
                let __t0;
                const h_m_cartslot = members.m_cartslot ?? runtime.member("m_cartslot");
                let address = ((((offset) & (65535))) & 0xffff);
                if ((((offset) < (4194304)) ? 1 : 0)) {
                    if ((((address) < (8192)) ? 1 : 0)) {
                        return runtime.readIndex((members.m_wram ?? runtime.member("m_wram")), address);
                    }
                    else {
                        if ((((address) < (24576)) ? 1 : 0)) {
                            return (runtime.overrides["snes_r_io"] ? runtime.overrides["snes_r_io"](address) : method_snes_r_io(runtime, address));
                        }
                        else {
                            if ((((address) < (32768)) ? 1 : 0)) {
                                if ((((offset) < (1048576)) ? 1 : 0)) {
                                    return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(offset);
                                }
                                else {
                                    if ((((offset) === (1073152)) ? 1 : 0)) {
                                        return (__L0 ?? runtime.memberCall(members.m_cartslot, "chip_read", 0, undefined))(((offset) + (32768)));
                                    }
                                    else {
                                        if (((((((offset) >= (3145728)) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(__deref_pfest94_hi_r(runtime, h_m_cartslot).m_cart, "get_nvram_size", 0, __L2))())) ? 1 : 0)) {
                                            return (__L3 ?? runtime.memberCall(members.m_cartslot, "read_ram", 0, undefined))(offset);
                                        }
                                        else {
                                            return (runtime.overrides["snes_open_bus_r"] ? runtime.overrides["snes_open_bus_r"]() : method_snes_open_bus_r(runtime));
                                        }
                                    }
                                }
                            }
                            else {
                                return (__L4 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
                            }
                        }
                    }
                }
                return (__L4 ?? runtime.memberCall(members.m_cartslot, "read_h", 0, undefined))(offset);
            }
            function __deref_pfest94_hi_r(runtime, p) {
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
            function method_machine_reset__base(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ppu.reset_interlace"];
                let __t0;
                const h_m_dma_channel = members.m_dma_channel ?? runtime.member("m_dma_channel");
                (runtime.overrides["snes_init_ram"] ? runtime.overrides["snes_init_ram"]() : method_snes_init_ram(runtime));
                for (let __range0 = h_m_dma_channel, __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
                    const __range0_item = runtime.readIndex(__range0, __range0_index);
                    __range0_item.dmap = 255;
                    __range0_item.dest_addr = 255;
                    __range0_item.src_addr = 65535;
                    __range0_item.bank = 255;
                    __range0_item.trans_size = 65535;
                    __range0_item.ibank = 255;
                    __range0_item.hdma_addr = 65535;
                    __range0_item.hdma_line_counter = 255;
                    __range0_item.unk = 255;
                }
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 0, 0);
                members.m_htime = ((511) & 0xffff);
                members.m_vtime = ((511) & 0xffff);
                (__L0 ?? runtime.memberCall(members.m_ppu, "reset_interlace", 0, undefined))();
            }
            function method_snes_init_ram(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.frame_period"], __L1 = __l["m_ppu.set_current_vert"];
                let __t0;
                let i = ((0) | 0);
                let size = runtime.container(members.m_wram, "bytes");
                for (i = ((0) | 0); ((Number(i) < Number(size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    runtime.writeIndex(runtime.writableMember("m_wram"), i, 85);
                }
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 24, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 25, 0)));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 26, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 27, 0)));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 28, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 29, 0)));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 30, (runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 31, 0)));
                runtime.writeIndex(runtime.writableMember("m_data1"), 0, (runtime.writeIndex(runtime.writableMember("m_data2"), 0, (runtime.writeIndex(runtime.writableMember("m_data1"), 1, (runtime.writeIndex(runtime.writableMember("m_data2"), 1, 0)))))));
                runtime.writeIndex(runtime.writableMember("m_cpu_regs"), 1, 255);
                if (((Number((typeof (__L0 ?? runtime.memberCall(members.m_screen, "frame_period", 0, undefined))() === 'number' ? runtime.attotime((__L0 ?? runtime.memberCall(members.m_screen, "frame_period", 0, undefined))(), "as_hz") : (__deref_snes_init_ram(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "frame_period", 0, undefined))()).as_hz?.() ?? 0))) >= Number(59)) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_ppu, "set_current_vert", 0, undefined))(262);
                }
                else {
                    (__L1 ?? runtime.memberCall(members.m_ppu, "set_current_vert", 0, undefined))(312);
                }
            }
            function __deref_snes_init_ram(runtime, p) {
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
            function method_machine_start__lambda0(runtime, offset, __unnamed1, __unnamed2) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.set_address"];
                (__L0 ?? runtime.memberCall(members.m_cartslot, "set_address", 0, undefined))(offset);
            }
            function method_machine_start__lambda1(runtime, offset, __unnamed1, __unnamed2) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_cartslot.set_address"];
                (__L0 ?? runtime.memberCall(members.m_cartslot, "set_address", 0, undefined))(offset);
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "hdma": method_hdma,
                "dma_transfer": method_dma_transfer,
                "dma_abus_valid": method_dma_abus_valid,
                "abus_read": method_abus_read,
                "hdma_update": method_hdma_update,
                "get_hdma_addr": method_get_hdma_addr,
                "is_last_active_channel": method_is_last_active_channel,
                "snes20_lo_r": method_snes20_lo_r,
                "snes_r_io": method_snes_r_io,
                "snes_io_dma_r": method_snes_io_dma_r,
                "snes_open_bus_r": method_snes_open_bus_r,
                "oldjoy1_read": method_oldjoy1_read,
                "oldjoy2_read": method_oldjoy2_read,
                "scpu_irq_refresh": method_scpu_irq_refresh,
                "snes20_lo_w": method_snes20_lo_w,
                "snes20_hi_w": method_snes20_hi_w,
                "CX4_readw": method_CX4_readw,
                "CX4_readl": method_CX4_readl,
                "CX4_op00_03": method_CX4_op00_03,
                "CX4_writew": method_CX4_writew,
                "CX4_op00_07": method_CX4_op00_07,
                "CX4_op00_08": method_CX4_op00_08,
                "CX4_op00_0c": method_CX4_op00_0c,
                "CX4_op05": method_CX4_op05,
                "CX4_mul": method_CX4_mul,
                "CX4_cos": method_CX4_cos,
                "CX4_op5c": method_CX4_op5c,
                "CX4_op5e": method_CX4_op5e,
                "CX4_op60": method_CX4_op60,
                "CX4_op62": method_CX4_op62,
                "CX4_op64": method_CX4_op64,
                "CX4_op66": method_CX4_op66,
                "CX4_op68": method_CX4_op68,
                "CX4_op6a": method_CX4_op6a,
                "CX4_op6c": method_CX4_op6c,
                "CX4_op6e": method_CX4_op6e,
                "CX4_op70": method_CX4_op70,
                "CX4_op72": method_CX4_op72,
                "CX4_op74": method_CX4_op74,
                "CX4_op76": method_CX4_op76,
                "CX4_op78": method_CX4_op78,
                "CX4_op7a": method_CX4_op7a,
                "CX4_op7c": method_CX4_op7c,
                "CX4_op89": method_CX4_op89,
                "snes_w_io": method_snes_w_io,
                "snes_io_dma_w": method_snes_io_dma_w,
                "write_joy_latch": method_write_joy_latch,
                "wrio_write": method_wrio_write,
                "dma": method_dma,
                "snes20_hi_r": method_snes20_hi_r,
                "snessgb_lo_r": method_snessgb_lo_r,
                "snessgb_hi_r": method_snessgb_hi_r,
                "snessgb_lo_w": method_snessgb_lo_w,
                "snessgb_hi_w": method_snessgb_hi_w,
                "snessa1_lo_r": method_snessa1_lo_r,
                "snessa1_lo_w": method_snessa1_lo_w,
                "snessa1_hi_w": method_snessa1_hi_w,
                "snessa1_hi_r": method_snessa1_hi_r,
                "snessfx_lo_r": method_snessfx_lo_r,
                "snessfx_lo_w": method_snessfx_lo_w,
                "snessfx_hi_w": method_snessfx_hi_w,
                "snessfx_hi_r": method_snessfx_hi_r,
                "snessdd1_lo_r": method_snessdd1_lo_r,
                "snessdd1_lo_w": method_snessdd1_lo_w,
                "snessdd1_hi_w": method_snessdd1_hi_w,
                "snessdd1_hi_r": method_snessdd1_hi_r,
                "snesbsx_lo_r": method_snesbsx_lo_r,
                "snesbsx_lo_w": method_snesbsx_lo_w,
                "snesbsx_hi_w": method_snesbsx_hi_w,
                "snesbsx_hi_r": method_snesbsx_hi_r,
                "snes21_lo_r": method_snes21_lo_r,
                "snes21_lo_w": method_snes21_lo_w,
                "snes21_hi_r": method_snes21_hi_r,
                "snes21_hi_w": method_snes21_hi_w,
                "snes7110_lo_r": method_snes7110_lo_r,
                "snes7110_lo_w": method_snes7110_lo_w,
                "snes7110_hi_r": method_snes7110_hi_r,
                "snes7110_hi_w": method_snes7110_hi_w,
                "pfest94_lo_r": method_pfest94_lo_r,
                "pfest94_lo_w": method_pfest94_lo_w,
                "pfest94_hi_w": method_pfest94_hi_w,
                "pfest94_hi_r": method_pfest94_hi_r,
                "machine_reset__base": method_machine_reset__base,
                "snes_init_ram": method_snes_init_ram,
                "machine_start__lambda0": method_machine_start__lambda0,
                "machine_start__lambda1": method_machine_start__lambda1
            };
            return __methodTable;
        })();
        return {
            "snes_console_state.snes20_lo_r": methods["snes20_lo_r"],
            "snes_console_state.snes_open_bus_r": methods["snes_open_bus_r"],
            "snes_console_state.snes20_lo_w": methods["snes20_lo_w"],
            "snes_console_state.snes20_hi_w": methods["snes20_hi_w"],
            "snes_console_state.CX4_readw": methods["CX4_readw"],
            "snes_console_state.CX4_readl": methods["CX4_readl"],
            "snes_console_state.CX4_op00_03": methods["CX4_op00_03"],
            "snes_console_state.CX4_writew": methods["CX4_writew"],
            "snes_console_state.CX4_op00_07": methods["CX4_op00_07"],
            "snes_console_state.CX4_op00_08": methods["CX4_op00_08"],
            "snes_console_state.CX4_op00_0c": methods["CX4_op00_0c"],
            "snes_console_state.CX4_op05": methods["CX4_op05"],
            "snes_console_state.CX4_cos": methods["CX4_cos"],
            "snes_console_state.CX4_op5c": methods["CX4_op5c"],
            "snes_console_state.CX4_op5e": methods["CX4_op5e"],
            "snes_console_state.CX4_op60": methods["CX4_op60"],
            "snes_console_state.CX4_op62": methods["CX4_op62"],
            "snes_console_state.CX4_op64": methods["CX4_op64"],
            "snes_console_state.CX4_op66": methods["CX4_op66"],
            "snes_console_state.CX4_op68": methods["CX4_op68"],
            "snes_console_state.CX4_op6a": methods["CX4_op6a"],
            "snes_console_state.CX4_op6c": methods["CX4_op6c"],
            "snes_console_state.CX4_op6e": methods["CX4_op6e"],
            "snes_console_state.CX4_op70": methods["CX4_op70"],
            "snes_console_state.CX4_op72": methods["CX4_op72"],
            "snes_console_state.CX4_op74": methods["CX4_op74"],
            "snes_console_state.CX4_op76": methods["CX4_op76"],
            "snes_console_state.CX4_op78": methods["CX4_op78"],
            "snes_console_state.CX4_op7a": methods["CX4_op7a"],
            "snes_console_state.CX4_op7c": methods["CX4_op7c"],
            "snes_console_state.CX4_op89": methods["CX4_op89"],
            "snes_console_state.snes20_hi_r": methods["snes20_hi_r"],
            "snes_console_state.snessgb_lo_r": methods["snessgb_lo_r"],
            "snes_console_state.snessgb_hi_r": methods["snessgb_hi_r"],
            "snes_console_state.snessgb_lo_w": methods["snessgb_lo_w"],
            "snes_console_state.snessgb_hi_w": methods["snessgb_hi_w"],
            "snes_console_state.snessa1_lo_r": methods["snessa1_lo_r"],
            "snes_console_state.snessa1_lo_w": methods["snessa1_lo_w"],
            "snes_console_state.snessa1_hi_w": methods["snessa1_hi_w"],
            "snes_console_state.snessa1_hi_r": methods["snessa1_hi_r"],
            "snes_console_state.snessfx_lo_r": methods["snessfx_lo_r"],
            "snes_console_state.snessfx_lo_w": methods["snessfx_lo_w"],
            "snes_console_state.snessfx_hi_w": methods["snessfx_hi_w"],
            "snes_console_state.snessfx_hi_r": methods["snessfx_hi_r"],
            "snes_console_state.snessdd1_lo_r": methods["snessdd1_lo_r"],
            "snes_console_state.snessdd1_lo_w": methods["snessdd1_lo_w"],
            "snes_console_state.snessdd1_hi_w": methods["snessdd1_hi_w"],
            "snes_console_state.snessdd1_hi_r": methods["snessdd1_hi_r"],
            "snes_console_state.snesbsx_lo_r": methods["snesbsx_lo_r"],
            "snes_console_state.snesbsx_lo_w": methods["snesbsx_lo_w"],
            "snes_console_state.snesbsx_hi_w": methods["snesbsx_hi_w"],
            "snes_console_state.snesbsx_hi_r": methods["snesbsx_hi_r"],
            "snes_console_state.snes21_lo_r": methods["snes21_lo_r"],
            "snes_console_state.snes21_lo_w": methods["snes21_lo_w"],
            "snes_console_state.snes21_hi_r": methods["snes21_hi_r"],
            "snes_console_state.snes21_hi_w": methods["snes21_hi_w"],
            "snes_console_state.snes7110_lo_r": methods["snes7110_lo_r"],
            "snes_console_state.snes7110_lo_w": methods["snes7110_lo_w"],
            "snes_console_state.snes7110_hi_r": methods["snes7110_hi_r"],
            "snes_console_state.snes7110_hi_w": methods["snes7110_hi_w"],
            "snes_console_state.pfest94_lo_r": methods["pfest94_lo_r"],
            "snes_console_state.pfest94_lo_w": methods["pfest94_lo_w"],
            "snes_console_state.pfest94_hi_w": methods["pfest94_hi_w"],
            "snes_console_state.pfest94_hi_r": methods["pfest94_hi_r"],
            "snes_console_state.machine_start__lambda0": methods["machine_start__lambda0"],
            "snes_console_state.machine_start__lambda1": methods["machine_start__lambda1"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["CX4_sar", "adjust", "attotime::from_usec", "get_nvram_size", "get_rom_size", "ioport", "m_cartslot.chip_read", "m_cartslot.chip_write", "m_cartslot.get_type", "m_cartslot.m_cart.get_nvram_size", "m_cartslot.m_cart.get_rom_size", "m_cartslot.read_h", "m_cartslot.read_l", "m_cartslot.read_ram", "m_cartslot.set_address", "m_cartslot.write_h", "m_cartslot.write_l", "m_cartslot.write_ram", "m_ctrl1.port_poll", "m_ctrl1.read_pin4", "m_ctrl1.read_pin5", "m_ctrl1.write_pin6", "m_ctrl1.write_strobe", "m_ctrl2.port_poll", "m_ctrl2.read_pin4", "m_ctrl2.read_pin5", "m_ctrl2.write_pin6", "m_ctrl2.write_strobe", "m_hblank_timer.adjust", "m_hdma_reset_timer.adjust", "m_hirq_timer.adjust", "m_io_timer.adjust", "m_maincpu.cycles_to_attotime", "m_maincpu.pc", "m_maincpu.set_input_line", "m_maincpu.space", "m_nmi_timer.adjust", "m_oam_reset_addr_timer.adjust", "m_ppu.clear_time_range_over", "m_ppu.current_vert", "m_ppu.current_x", "m_ppu.current_y", "m_ppu.htmult", "m_ppu.interlace", "m_ppu.last_visible_line", "m_ppu.oam_address_reset", "m_ppu.read", "m_ppu.refresh_scanline", "m_ppu.reset_interlace", "m_ppu.screen_disabled", "m_ppu.set_current_vert", "m_ppu.set_latch_hv", "m_ppu.toggle_field", "m_ppu.vtotal", "m_ppu.write", "m_scanline_timer.adjust", "m_scpu_irq.in_w_0", "m_screen.frame_period", "m_screen.time_until_pos", "m_screen.update_partial", "m_screen.vpos", "m_soundcpu.spc_port_in_w", "m_soundcpu.spc_port_out_r", "machine", "machine().scheduler().perfect_quantum", "machine().side_effects_disabled", "read_byte", "space.read_byte", "space.write_byte", "write_byte"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
