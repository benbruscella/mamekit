// GENERATED executable machine composition from src/mame/gottlieb/gottlieb.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'qbert');
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
            function method_qbert_output_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.invoke("general_output_w", ((data) & (-33)));
                (runtime.overrides["qbert_knocker"] ? runtime.overrides["qbert_knocker"]((((data) >>> (5)) & 1)) : method_qbert_knocker(runtime, (((data) >>> (5)) & 1)));
            }
            function method_video_control_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"], __L1 = __l["m_screen.update_partial"], __L2 = __l["flip_screen_x_set"], __L3 = __l["flip_screen_y_set"];
                let __t0;
                data = ((data) & 0xff);
                if (((Number((members.m_background_priority ?? runtime.member("m_background_priority"))) !== Number((((data) >>> (0)) & 1))) ? 1 : 0)) {
                    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
                }
                members.m_background_priority = (((((data) >>> (0)) & 1)) & 0xff);
                (__L2 ? __L2((((data) >>> (1)) & 1)) : runtime.macro("flip_screen_x_set", (((data) >>> (1)) & 1)));
                (__L3 ? __L3((((data) >>> (2)) & 1)) : runtime.macro("flip_screen_y_set", (((data) >>> (2)) & 1)));
            }
            function method_qbert_knocker(runtime, knock) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_knocker_sample.start"];
                knock = ((knock) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_knockers"), 0, ((knock) ? (1) : (0)));
                if (((knock) & ((~(members.m_knocker_prev ?? runtime.member("m_knocker_prev")))))) {
                    (__L0 ?? runtime.memberCall(members.m_knocker_sample, "start", 0, undefined))(0, 0);
                }
                members.m_knocker_prev = ((knock) & 0xff);
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_charram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_gfxdecode.gfx"];
                data = ((data) & 0xff);
                if (((Number(runtime.readIndex((members.m_charram ?? runtime.member("m_charram")), offset)) !== Number(data)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_charram"), offset, data);
                    runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "mark_dirty", 0, undefined)(runtime.divide(offset, 32));
                }
            }
            function method_palette_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t"], __L1 = __l["m_palette.set_pen_color"];
                data = ((data) & 0xff);
                const h_m_weights = members.m_weights ?? runtime.member("m_weights");
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                let val = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) & (-2)))) | 0);
                let g = (((runtime.overrides["combine_weights__int__4"] ? runtime.overrides["combine_weights__int__4"](h_m_weights, (((val) >>> (4)) & 1), (((val) >>> (5)) & 1), (((val) >>> (6)) & 1), (((val) >>> (7)) & 1)) : method_combine_weights__int__4(runtime, h_m_weights, (((val) >>> (4)) & 1), (((val) >>> (5)) & 1), (((val) >>> (6)) & 1), (((val) >>> (7)) & 1)))) | 0);
                let b = (((runtime.overrides["combine_weights__int__4"] ? runtime.overrides["combine_weights__int__4"](h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)) : method_combine_weights__int__4(runtime, h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)))) | 0);
                val = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (1)))) | 0);
                let r = (((runtime.overrides["combine_weights__int__4"] ? runtime.overrides["combine_weights__int__4"](h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)) : method_combine_weights__int__4(runtime, h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)))) | 0);
                let a = ((((((((members.m_transparent0 ?? runtime.member("m_transparent0"))) && (((Number(runtime.divide(offset, 2)) === Number(0)) ? 1 : 0))) ? 1 : 0)) ? (0) : (255))) | 0);
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(runtime.divide(offset, 2), (__L0 ? __L0(a, r, g, b) : runtime.macro("rgb_t", a, r, g, b)));
            }
            function method_combine_weights__int__4(runtime, tab, w_0, w_1, w_2, w_3) {
                const members = runtime.members;
                return ((__add_combine_weights__int__4(runtime, (runtime.overrides["emu_detail__combine_weights__0__3"] ? runtime.overrides["emu_detail__combine_weights__0__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__0__3(runtime, tab, w_0, w_1, w_2, w_3)), 0.5)) | 0);
            }
            function __add_combine_weights__int__4(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__0__3(runtime, tab, w0, w_0, w_1, w_2) {
                const members = runtime.members;
                return __add_emu_detail__combine_weights__0__3(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__2"] ? runtime.overrides["emu_detail__combine_weights__1__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__1__2(runtime, tab, w_0, w_1, w_2)));
            }
            function __add_emu_detail__combine_weights__0__3(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__1__2(runtime, tab, w0, w_0, w_1) {
                const members = runtime.members;
                return __add_emu_detail__combine_weights__1__2(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__1"] ? runtime.overrides["emu_detail__combine_weights__2__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__2__1(runtime, tab, w_0, w_1)));
            }
            function __add_emu_detail__combine_weights__1__2(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__2__1(runtime, tab, w0, w_0) {
                const members = runtime.members;
                return __add_emu_detail__combine_weights__2__1(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__0"] ? runtime.overrides["emu_detail__combine_weights__3__0"](tab, w_0) : method_emu_detail__combine_weights__3__0(runtime, tab, w_0)));
            }
            function __add_emu_detail__combine_weights__2__1(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_emu_detail__combine_weights__3__0(runtime, tab, w) {
                const members = runtime.members;
                return ((runtime.readIndex(tab, 3)) * (w));
            }
            function method_analog_reset_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_track_x.read_safe"], __L1 = __l["read_safe"], __L2 = __l["m_track_y.read_safe"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_track"), 0, (__L0 ?? runtime.memberCall(members.m_track_x, "read_safe", 0, __L1))(0));
                runtime.writeIndex(runtime.writableMember("m_track"), 1, (__L2 ?? runtime.memberCall(members.m_track_y, "read_safe", 0, __L1))(0));
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
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                const h_m_gfxcharlo = members.m_gfxcharlo ?? runtime.member("m_gfxcharlo");
                const h_m_gfxcharhi = members.m_gfxcharhi ?? runtime.member("m_gfxcharhi");
                let code = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
                if (((Number(((code) & (128))) === Number(0)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(h_m_gfxcharlo, code, 0, 0);
                }
                else {
                    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(h_m_gfxcharhi, code, 0, 0);
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"], __L2 = __l["m_palette.pen"], __L3 = __l["bitmap.fill"], __L4 = __l["fill"];
                if ((((members.m_background_priority ?? runtime.member("m_background_priority"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 128, 0);
                }
                else {
                    (__L3 ?? runtime.memberCall(bitmap, "fill", 0, __L4))((__L2 ?? runtime.memberCall(members.m_palette, "pen", 0, undefined))(0), cliprect);
                }
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                if ((members.m_background_priority ?? runtime.member("m_background_priority"))) {
                    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                }
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen_x"], __L1 = __l["flip_screen_y"], __L2 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                const h_m_spritebank = members.m_spritebank ?? runtime.member("m_spritebank");
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                clip.min_x = 8;
                for (let offs = ((0) | 0); (((offs) < (256)) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    let sx = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) - (4))) | 0);
                    let sy = ((((runtime.readIndex(h_m_spriteram, offs)) - (13))) | 0);
                    let code = ((__add_draw_sprites(runtime, ((255) ^ (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), ((256) * (h_m_spritebank)))) | 0);
                    if ((__L0 ? __L0() : runtime.macro("flip_screen_x"))) {
                        sx = ((((233) - (sx))) | 0);
                    }
                    if ((__L1 ? __L1() : runtime.macro("flip_screen_y"))) {
                        sy = ((((228) - (sy))) | 0);
                    }
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "transpen", 0, undefined)(bitmap, clip, code, 0, (__L0 ? __L0() : runtime.macro("flip_screen_x")), (__L1 ? __L1() : runtime.macro("flip_screen_y")), sx, sy, 0);
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
                "qbert_output_w": method_qbert_output_w,
                "video_control_w": method_video_control_w,
                "qbert_knocker": method_qbert_knocker,
                "videoram_w": method_videoram_w,
                "charram_w": method_charram_w,
                "palette_w": method_palette_w,
                "combine_weights__int__4": method_combine_weights__int__4,
                "emu_detail__combine_weights__0__3": method_emu_detail__combine_weights__0__3,
                "emu_detail__combine_weights__1__2": method_emu_detail__combine_weights__1__2,
                "emu_detail__combine_weights__2__1": method_emu_detail__combine_weights__2__1,
                "emu_detail__combine_weights__3__0": method_emu_detail__combine_weights__3__0,
                "analog_reset_w": method_analog_reset_w,
                "compute_resistor_weights": method_compute_resistor_weights,
                "get_bg_tile_info": method_get_bg_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
            return __methodTable;
        })();
        return {
            "gottlieb_state.qbert_output_w": methods["qbert_output_w"],
            "gottlieb_state.video_control_w": methods["video_control_w"],
            "gottlieb_state.qbert_knocker": methods["qbert_knocker"],
            "gottlieb_state.videoram_w": methods["videoram_w"],
            "gottlieb_state.charram_w": methods["charram_w"],
            "gottlieb_state.palette_w": methods["palette_w"],
            "gottlieb_state.combine_weights__int__4": methods["combine_weights__int__4"],
            "gottlieb_state.emu_detail__combine_weights__0__3": methods["emu_detail__combine_weights__0__3"],
            "gottlieb_state.emu_detail__combine_weights__1__2": methods["emu_detail__combine_weights__1__2"],
            "gottlieb_state.emu_detail__combine_weights__2__1": methods["emu_detail__combine_weights__2__1"],
            "gottlieb_state.emu_detail__combine_weights__3__0": methods["emu_detail__combine_weights__3__0"],
            "gottlieb_state.analog_reset_w": methods["analog_reset_w"],
            "gottlieb_state.compute_resistor_weights": methods["compute_resistor_weights"],
            "gottlieb_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "gottlieb_state.screen_update": methods["screen_update"],
            "gottlieb_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "draw", "fatalerror", "fill", "flip_screen_x", "flip_screen_x_set", "flip_screen_y", "flip_screen_y_set", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_knocker_sample.start", "m_palette.pen", "m_palette.set_pen_color", "m_screen.update_partial", "m_screen.vpos", "m_track_x.read_safe", "m_track_y.read_safe", "mark_tile_dirty", "read_safe", "rgb_t", "set", "std::clamp", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
