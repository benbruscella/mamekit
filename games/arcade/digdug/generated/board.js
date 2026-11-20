// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'digdug');
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
            const __mame_table_0 = [0, 1, 2, 3];
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
            function method_digdug_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
            }
            function method_earom_write(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_earom.set_address"], __L1 = __l["m_earom.set_data"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_earom, "set_address", 0, undefined))(((offset) & (63)));
                (__L1 ?? runtime.memberCall(members.m_earom, "set_data", 0, undefined))(data);
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
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["m_gfxdecode.gfx"], __L2 = __l["m_palette.transpen_mask"];
                const h_m_digdug_objram = members.m_digdug_objram ?? runtime.member("m_digdug_objram");
                const h_m_digdug_posram = members.m_digdug_posram ?? runtime.member("m_digdug_posram");
                const h_m_digdug_flpram = members.m_digdug_flpram ?? runtime.member("m_digdug_flpram");
                let spriteram = __addr_draw_sprites(runtime, h_m_digdug_objram, 896);
                let spriteram$s = undefined, spriteram$o = 0;
                if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram))
                    spriteram$s = spriteram;
                else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) {
                    spriteram$s = spriteram.source;
                    spriteram$o = spriteram.offset;
                }
                let spriteram_2 = __addr_draw_sprites(runtime, h_m_digdug_posram, 896);
                let spriteram_2$s = undefined, spriteram_2$o = 0;
                if (ArrayBuffer.isView(spriteram_2) || Array.isArray(spriteram_2))
                    spriteram_2$s = spriteram_2;
                else if (spriteram_2 !== null && typeof spriteram_2 === 'object' && spriteram_2.generatedPointer === true && spriteram_2.path === undefined && spriteram_2.target === undefined && (ArrayBuffer.isView(spriteram_2.source) || Array.isArray(spriteram_2.source))) {
                    spriteram_2$s = spriteram_2.source;
                    spriteram_2$o = spriteram_2.offset;
                }
                let spriteram_3 = __addr_draw_sprites(runtime, h_m_digdug_flpram, 896);
                let spriteram_3$s = undefined, spriteram_3$o = 0;
                if (ArrayBuffer.isView(spriteram_3) || Array.isArray(spriteram_3))
                    spriteram_3$s = spriteram_3;
                else if (spriteram_3 !== null && typeof spriteram_3 === 'object' && spriteram_3.generatedPointer === true && spriteram_3.path === undefined && spriteram_3.target === undefined && (ArrayBuffer.isView(spriteram_3.source) || Array.isArray(spriteram_3.source))) {
                    spriteram_3$s = spriteram_3.source;
                    spriteram_3$o = spriteram_3.offset;
                }
                let offs = ((0) | 0);
                let visarea = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                visarea.min_x = 16;
                visarea.max_x = 271;
                for (offs = ((0) | 0); (((offs) < (128)) ? 1 : 0); offs = ((((offs) + (2))) | 0)) {
                    let sprite = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs))) | 0);
                    let color = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) & (63))) | 0);
                    let sx = ((__add_draw_sprites(runtime, (((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram_2, ((offs) + (1))))) - (40)), 1)) | 0);
                    let sy = ((__add_draw_sprites(runtime, ((256) - ((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (offs)] ?? 0) : runtime.readIndex(spriteram_2, offs)))), 1)) | 0);
                    let flipx = (((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (1))) | 0);
                    let flipy = ((runtime.shiftRight((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (2)), 1)) | 0);
                    let size = ((runtime.shiftRight(((sprite) & (128)), 7)) | 0);
                    let x = ((0) | 0);
                    let y = ((0) | 0);
                    if (size) {
                        sprite = ((((((sprite) & (192))) | (((((sprite) & (-193))) << (2))))) | 0);
                    }
                    sy = ((((sy) - (((16) * (size))))) | 0);
                    sy = ((((((sy) & (255))) - (32))) | 0);
                    if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
                        flipx = ((((flipx) ^ (1))) | 0);
                        flipy = ((((flipy) ^ (1))) | 0);
                    }
                    for (y = ((0) | 0); (((y) <= (size)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        for (x = ((0) | 0); (((x) <= (size)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            let transmask = (((__L2 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1)), color, 31)) >>> 0);
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, visarea, ((sprite) + ((__mame_table_0[(((__add_draw_sprites(runtime, ((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((((sx) + (((16) * (x))))) & (255)), ((sy) + (((16) * (y)))), transmask);
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, visarea, ((sprite) + ((__mame_table_0[(((__add_draw_sprites(runtime, ((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, __add_draw_sprites(runtime, ((((sx) + (((16) * (x))))) & (255)), 256), ((sy) + (((16) * (y)))), transmask);
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
            function method_tx_color_mode_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                members.m_tx_color_mode = ((state) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_all_dirty", 0, __L1))();
            }
            function method_bg_disable_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                members.m_bg_disable = ((state) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
            }
            function method_K_r(runtime) {
                const members = runtime.members;
                return (((((members.m_rw ?? runtime.member("m_rw"))) << (3))) | ((((members.m_portO ?? runtime.member("m_portO"))) & (7))));
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
            function method_digdug_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"], __L4 = __l["palette.set_pen_indirect"], __L5 = __l["set_pen_indirect"];
                let __t0, __t1, __t2;
                let color_prom = (__t0 = __deref_digdug_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let resistances = [1000, 470, 220];
                let rweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let gweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let bweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, __addr_digdug_palette(runtime, resistances, 0), rweights, 0, 0, 3, __addr_digdug_palette(runtime, resistances, 0), gweights, 0, 0, 2, __addr_digdug_palette(runtime, resistances, 1), bweights, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, __addr_digdug_palette(runtime, resistances, 0), rweights, 0, 0, 3, __addr_digdug_palette(runtime, resistances, 0), gweights, 0, 0, 2, __addr_digdug_palette(runtime, resistances, 1), bweights, 0, 0));
                for (let i = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    bit0 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (0)) & 1)) | 0);
                    bit1 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (1)) & 1)) | 0);
                    bit2 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (2)) & 1)) | 0);
                    let r = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](rweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, rweights, bit0, bit1, bit2))) | 0);
                    bit0 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (3)) & 1)) | 0);
                    bit1 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (4)) & 1)) | 0);
                    bit2 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (5)) & 1)) | 0);
                    let g = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](gweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, gweights, bit0, bit1, bit2))) | 0);
                    bit0 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (6)) & 1)) | 0);
                    bit1 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (7)) & 1)) | 0);
                    let b = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](bweights, bit0, bit1) : method_combine_weights__int__2(runtime, bweights, bit0, bit1))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                    color_prom = __add_digdug_palette(runtime, color_prom, 1);
                }
                for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((((i) << (1))) | (0)), 0);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((((i) << (1))) | (1)), i);
                }
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((32) + (i)), ((((__deref_digdug_palette(runtime, (__t1 = color_prom, color_prom = __add_digdug_palette(runtime, color_prom, 1), __t1))) & (15))) | (16)));
                }
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((288) + (i)), ((__deref_digdug_palette(runtime, (__t2 = color_prom, color_prom = __add_digdug_palette(runtime, color_prom, 1), __t2))) & (15)));
                }
            }
            function __add_digdug_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_digdug_palette(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_digdug_palette(runtime, p) {
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
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "cpu3_interrupt_callback": method_cpu3_interrupt_callback,
                "data_w": method_data_w,
                "ctrl_r": method_ctrl_r,
                "digdug_videoram_w": method_digdug_videoram_w,
                "earom_write": method_earom_write,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "reset": method_reset,
                "chip_select": method_chip_select,
                "rw": method_rw,
                "vblank_irq": method_vblank_irq,
                "vblank": method_vblank,
                "draw_sprites": method_draw_sprites,
                "tx_color_mode_w": method_tx_color_mode_w,
                "bg_disable_w": method_bg_disable_w,
                "K_r": method_K_r,
                "compute_resistor_weights": method_compute_resistor_weights,
                "digdug_palette": method_digdug_palette,
                "combine_weights__int__3": method_combine_weights__int__3,
                "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
                "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
                "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
                "combine_weights__int__2": method_combine_weights__int__2,
                "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
                "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0
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
            const __mame_table_0 = [0, 1, 2, 3];
            function method_data_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.synchronize("write_sync", data);
            }
            function method_ctrl_r(runtime) {
                const members = runtime.members;
                return (members.m_control ?? runtime.member("m_control"));
            }
            function method_digdug_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
            }
            function method_earom_read(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_earom.data"];
                let __t0;
                return (__L0 ?? runtime.memberCall(members.m_earom, "data", 0, undefined))();
            }
            function method_earom_write(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_earom.set_address"], __L1 = __l["m_earom.set_data"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_earom, "set_address", 0, undefined))(((offset) & (63)));
                (__L1 ?? runtime.memberCall(members.m_earom, "set_data", 0, undefined))(data);
            }
            function method_earom_control_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_earom.set_control"], __L1 = __l["m_earom.set_clk"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_earom, "set_control", 0, undefined))((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1));
                (__L1 ?? runtime.memberCall(members.m_earom, "set_clk", 0, undefined))((((data) >>> (0)) & 1));
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
            function method_bg_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let __t0;
                let rom = (__t0 = __deref_bg_get_tile_info(runtime, (__L0 ? __L0("gfx4") : runtime.macro("memregion", "gfx4"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("gfx4") : runtime.macro("memregion", "gfx4")), "base"));
                let rom$s = undefined, rom$o = 0;
                if (ArrayBuffer.isView(rom) || Array.isArray(rom))
                    rom$s = rom;
                else if (rom !== null && typeof rom === 'object' && rom.generatedPointer === true && rom.path === undefined && rom.target === undefined && (ArrayBuffer.isView(rom.source) || Array.isArray(rom.source))) {
                    rom$s = rom.source;
                    rom$o = rom.offset;
                }
                let code = (((rom$s !== undefined ? (rom$s[rom$o + (((tile_index) | ((((members.m_bg_select ?? runtime.member("m_bg_select"))) << (10)))))] ?? 0) : runtime.readIndex(rom, ((tile_index) | ((((members.m_bg_select ?? runtime.member("m_bg_select"))) << (10))))))) | 0);
                let color = (((((members.m_bg_disable ?? runtime.member("m_bg_disable"))) ? (15) : (runtime.shiftRight(code, 4)))) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(2, code, ((color) | ((members.m_bg_color_bank ?? runtime.member("m_bg_color_bank")))), 0);
            }
            function __deref_bg_get_tile_info(runtime, p) {
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
            function method_tilemap_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                row = ((((row) + (2))) >>> 0);
                col = ((((col) - (2))) >>> 0);
                if (((col) & (32))) {
                    return ((row) + (((((col) & (31))) << (5))));
                }
                else {
                    return ((col) + (((row) << (5))));
                }
            }
            function method_tx_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let code = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & 0xff);
                let color = ((0) | 0);
                if ((members.m_tx_color_mode ?? runtime.member("m_tx_color_mode"))) {
                    color = ((((code) & (15))) | 0);
                }
                else {
                    color = ((((((((code) >>> (4))) & (14))) | (((((code) >>> (3))) & (2))))) | 0);
                }
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, ((((code) & (127))) | ((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (128) : (0)))), color, (((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (1) : (0)));
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["m_gfxdecode.gfx"], __L2 = __l["m_palette.transpen_mask"];
                const h_m_digdug_objram = members.m_digdug_objram ?? runtime.member("m_digdug_objram");
                const h_m_digdug_posram = members.m_digdug_posram ?? runtime.member("m_digdug_posram");
                const h_m_digdug_flpram = members.m_digdug_flpram ?? runtime.member("m_digdug_flpram");
                let spriteram = __addr_draw_sprites(runtime, h_m_digdug_objram, 896);
                let spriteram$s = undefined, spriteram$o = 0;
                if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram))
                    spriteram$s = spriteram;
                else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) {
                    spriteram$s = spriteram.source;
                    spriteram$o = spriteram.offset;
                }
                let spriteram_2 = __addr_draw_sprites(runtime, h_m_digdug_posram, 896);
                let spriteram_2$s = undefined, spriteram_2$o = 0;
                if (ArrayBuffer.isView(spriteram_2) || Array.isArray(spriteram_2))
                    spriteram_2$s = spriteram_2;
                else if (spriteram_2 !== null && typeof spriteram_2 === 'object' && spriteram_2.generatedPointer === true && spriteram_2.path === undefined && spriteram_2.target === undefined && (ArrayBuffer.isView(spriteram_2.source) || Array.isArray(spriteram_2.source))) {
                    spriteram_2$s = spriteram_2.source;
                    spriteram_2$o = spriteram_2.offset;
                }
                let spriteram_3 = __addr_draw_sprites(runtime, h_m_digdug_flpram, 896);
                let spriteram_3$s = undefined, spriteram_3$o = 0;
                if (ArrayBuffer.isView(spriteram_3) || Array.isArray(spriteram_3))
                    spriteram_3$s = spriteram_3;
                else if (spriteram_3 !== null && typeof spriteram_3 === 'object' && spriteram_3.generatedPointer === true && spriteram_3.path === undefined && spriteram_3.target === undefined && (ArrayBuffer.isView(spriteram_3.source) || Array.isArray(spriteram_3.source))) {
                    spriteram_3$s = spriteram_3.source;
                    spriteram_3$o = spriteram_3.offset;
                }
                let offs = ((0) | 0);
                let visarea = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                visarea.min_x = 16;
                visarea.max_x = 271;
                for (offs = ((0) | 0); (((offs) < (128)) ? 1 : 0); offs = ((((offs) + (2))) | 0)) {
                    let sprite = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs))) | 0);
                    let color = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) & (63))) | 0);
                    let sx = ((__add_draw_sprites(runtime, (((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram_2, ((offs) + (1))))) - (40)), 1)) | 0);
                    let sy = ((__add_draw_sprites(runtime, ((256) - ((spriteram_2$s !== undefined ? (spriteram_2$s[spriteram_2$o + (offs)] ?? 0) : runtime.readIndex(spriteram_2, offs)))), 1)) | 0);
                    let flipx = (((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (1))) | 0);
                    let flipy = ((runtime.shiftRight((((spriteram_3$s !== undefined ? (spriteram_3$s[spriteram_3$o + (offs)] ?? 0) : runtime.readIndex(spriteram_3, offs))) & (2)), 1)) | 0);
                    let size = ((runtime.shiftRight(((sprite) & (128)), 7)) | 0);
                    let x = ((0) | 0);
                    let y = ((0) | 0);
                    if (size) {
                        sprite = ((((((sprite) & (192))) | (((((sprite) & (-193))) << (2))))) | 0);
                    }
                    sy = ((((sy) - (((16) * (size))))) | 0);
                    sy = ((((((sy) & (255))) - (32))) | 0);
                    if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
                        flipx = ((((flipx) ^ (1))) | 0);
                        flipy = ((((flipy) ^ (1))) | 0);
                    }
                    for (y = ((0) | 0); (((y) <= (size)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        for (x = ((0) | 0); (((x) <= (size)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                            let transmask = (((__L2 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1)), color, 31)) >>> 0);
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, visarea, ((sprite) + ((__mame_table_0[(((__add_draw_sprites(runtime, ((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((((sx) + (((16) * (x))))) & (255)), ((sy) + (((16) * (y)))), transmask);
                            runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, visarea, ((sprite) + ((__mame_table_0[(((__add_draw_sprites(runtime, ((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, __add_draw_sprites(runtime, ((((sx) + (((16) * (x))))) & (255)), 256), ((sy) + (((16) * (y)))), transmask);
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
            function method_bg_select_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0, __t1;
                data = ((data) & 0xff);
                if (((Number((members.m_bg_select ?? runtime.member("m_bg_select"))) !== Number(((data) & (3)))) ? 1 : 0)) {
                    members.m_bg_select = ((((data) & (3))) & 0xff);
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
                }
                if (((Number((members.m_bg_color_bank ?? runtime.member("m_bg_color_bank"))) !== Number(((data) & (48)))) ? 1 : 0)) {
                    members.m_bg_color_bank = ((((data) & (48))) & 0xff);
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
                }
            }
            function method_tx_color_mode_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_fg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                members.m_tx_color_mode = ((state) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_all_dirty", 0, __L1))();
            }
            function method_bg_disable_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_all_dirty"], __L1 = __l["mark_all_dirty"];
                let __t0;
                members.m_bg_disable = ((state) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
            }
            function method_screen_update_digdug(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"], __L2 = __l["m_fg_tilemap.draw"];
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                return 0;
            }
            function method_K_r(runtime) {
                const members = runtime.members;
                return (((((members.m_rw ?? runtime.member("m_rw"))) << (3))) | ((((members.m_portO ?? runtime.member("m_portO"))) & (7))));
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
            function method_digdug_palette(runtime, palette) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["memregion"], __L1 = __l["rgb_t"], __L2 = __l["palette.set_indirect_color"], __L3 = __l["set_indirect_color"], __L4 = __l["palette.set_pen_indirect"], __L5 = __l["set_pen_indirect"];
                let __t0, __t1, __t2;
                let color_prom = (__t0 = __deref_digdug_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
                let resistances = [1000, 470, 220];
                let rweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let gweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
                let bweights = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
                (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, __addr_digdug_palette(runtime, resistances, 0), rweights, 0, 0, 3, __addr_digdug_palette(runtime, resistances, 0), gweights, 0, 0, 2, __addr_digdug_palette(runtime, resistances, 1), bweights, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, __addr_digdug_palette(runtime, resistances, 0), rweights, 0, 0, 3, __addr_digdug_palette(runtime, resistances, 0), gweights, 0, 0, 2, __addr_digdug_palette(runtime, resistances, 1), bweights, 0, 0));
                for (let i = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    let bit0 = ((0) | 0);
                    let bit1 = ((0) | 0);
                    let bit2 = ((0) | 0);
                    bit0 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (0)) & 1)) | 0);
                    bit1 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (1)) & 1)) | 0);
                    bit2 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (2)) & 1)) | 0);
                    let r = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](rweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, rweights, bit0, bit1, bit2))) | 0);
                    bit0 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (3)) & 1)) | 0);
                    bit1 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (4)) & 1)) | 0);
                    bit2 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (5)) & 1)) | 0);
                    let g = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](gweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, gweights, bit0, bit1, bit2))) | 0);
                    bit0 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (6)) & 1)) | 0);
                    bit1 = (((((__deref_digdug_palette(runtime, color_prom)) >>> (7)) & 1)) | 0);
                    let b = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](bweights, bit0, bit1) : method_combine_weights__int__2(runtime, bweights, bit0, bit1))) | 0);
                    (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
                    color_prom = __add_digdug_palette(runtime, color_prom, 1);
                }
                for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((((i) << (1))) | (0)), 0);
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((((i) << (1))) | (1)), i);
                }
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((32) + (i)), ((((__deref_digdug_palette(runtime, (__t1 = color_prom, color_prom = __add_digdug_palette(runtime, color_prom, 1), __t1))) & (15))) | (16)));
                }
                for (let i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((288) + (i)), ((__deref_digdug_palette(runtime, (__t2 = color_prom, color_prom = __add_digdug_palette(runtime, color_prom, 1), __t2))) & (15)));
                }
            }
            function __add_digdug_palette(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __addr_digdug_palette(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function __deref_digdug_palette(runtime, p) {
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
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "data_w": method_data_w,
                "ctrl_r": method_ctrl_r,
                "digdug_videoram_w": method_digdug_videoram_w,
                "earom_read": method_earom_read,
                "earom_write": method_earom_write,
                "earom_control_w": method_earom_control_w,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "reset": method_reset,
                "chip_select": method_chip_select,
                "rw": method_rw,
                "vblank_irq": method_vblank_irq,
                "vblank": method_vblank,
                "bg_get_tile_info": method_bg_get_tile_info,
                "tilemap_scan": method_tilemap_scan,
                "tx_get_tile_info": method_tx_get_tile_info,
                "draw_sprites": method_draw_sprites,
                "bg_select_w": method_bg_select_w,
                "tx_color_mode_w": method_tx_color_mode_w,
                "bg_disable_w": method_bg_disable_w,
                "screen_update_digdug": method_screen_update_digdug,
                "K_r": method_K_r,
                "compute_resistor_weights": method_compute_resistor_weights,
                "digdug_palette": method_digdug_palette,
                "combine_weights__int__3": method_combine_weights__int__3,
                "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
                "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
                "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
                "combine_weights__int__2": method_combine_weights__int__2,
                "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
                "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0
            };
            return __methodTable;
        })();
        return {
            "digdug_state.digdug_videoram_w": methods["digdug_videoram_w"],
            "digdug_state.earom_read": methods["earom_read"],
            "digdug_state.earom_write": methods["earom_write"],
            "digdug_state.earom_control_w": methods["earom_control_w"],
            "digdug_state.bg_get_tile_info": methods["bg_get_tile_info"],
            "digdug_state.tilemap_scan": methods["tilemap_scan"],
            "digdug_state.tx_get_tile_info": methods["tx_get_tile_info"],
            "digdug_state.draw_sprites": methods["draw_sprites"],
            "digdug_state.bg_select_w": methods["bg_select_w"],
            "digdug_state.tx_color_mode_w": methods["tx_color_mode_w"],
            "digdug_state.bg_disable_w": methods["bg_disable_w"],
            "digdug_state.screen_update_digdug": methods["screen_update_digdug"],
            "digdug_state.compute_resistor_weights": methods["compute_resistor_weights"],
            "digdug_state.digdug_palette": methods["digdug_palette"],
            "digdug_state.combine_weights__int__3": methods["combine_weights__int__3"],
            "digdug_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
            "digdug_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
            "digdug_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
            "digdug_state.combine_weights__int__2": methods["combine_weights__int__2"],
            "digdug_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
            "digdug_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust", "draw", "fatalerror", "flip_screen", "m_bg_tilemap.draw", "m_bg_tilemap.mark_all_dirty", "m_cpu.set_input_line", "m_cpu3_interrupt_timer.adjust", "m_earom.data", "m_earom.set_address", "m_earom.set_clk", "m_earom.set_control", "m_earom.set_data", "m_fg_tilemap.draw", "m_fg_tilemap.mark_all_dirty", "m_fg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.transpen_mask", "m_screen.time_until_pos", "m_subcpu.set_input_line", "m_subcpu2.pulse_input_line", "mark_all_dirty", "mark_tile_dirty", "memregion", "palette.set_indirect_color", "palette.set_pen_indirect", "rgb_t", "set", "set_indirect_color", "set_pen_indirect", "std::clamp", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
