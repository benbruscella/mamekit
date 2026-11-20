// GENERATED executable machine composition from src/mame/irem/m52.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mpatrol');
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
                const __L0 = __l["m_tx_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tx_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_protection_r(runtime) {
                const members = runtime.members;
                let popcount = ((0) | 0);
                for (let temp = ((((runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0)) & (127))) | 0); (((temp) !== (0)) ? 1 : 0); temp = ((((temp) >> (1))) | 0)) {
                    popcount = ((((popcount) + (((temp) & (1))))) | 0);
                }
                return ((popcount) ^ (runtime.shiftRight(runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), 7)));
            }
            function method_scroll_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_tx_tilemap.set_scrollx"], __L1 = __l["set_scrollx"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrollx", 0, __L1))(0, 255);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrollx", 0, __L1))(1, 255);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrollx", 0, __L1))(2, 255);
                (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrollx", 0, __L1))(3, (-((data) + (1))));
            }
            function method_bgxpos_w_0(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_bgxpos"), 0, data);
            }
            function method_bgypos_w_0(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_bgypos"), 0, data);
            }
            function method_bgxpos_w_1(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_bgxpos"), 1, data);
            }
            function method_bgypos_w_1(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_bgypos"), 1, data);
            }
            function method_bgcontrol_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_bgcontrol = ((data) & 0xff);
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
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["tileinfo.set"], __L1 = __l["set"];
                let video = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & 0xff);
                let color = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & 0xff);
                let flag = ((0) | 0);
                let code = ((0) | 0);
                code = ((video) | 0);
                if (((color) & (128))) {
                    code = ((((code) | (256))) | 0);
                }
                if (((Number(runtime.divide(tile_index, 32)) <= Number(6)) ? 1 : 0)) {
                    flag = ((((flag) | (16))) | 0);
                }
                (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, ((color) & (127)), flag);
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_sp_palette.pens"], __L1 = __l["bitmap.fill"], __L2 = __l["fill"], __L3 = __l["flip_screen"], __L4 = __l["m_tx_tilemap.set_flip"], __L5 = __l["set_flip"], __L6 = __l["m_tx_tilemap.draw"], __L7 = __l["draw"];
                let __t0;
                let paldata = (__L0 ?? runtime.memberCall(members.m_sp_palette, "pens", 0, undefined))();
                let paldata$s = undefined, paldata$o = 0;
                if (ArrayBuffer.isView(paldata) || Array.isArray(paldata))
                    paldata$s = paldata;
                else if (paldata !== null && typeof paldata === 'object' && paldata.generatedPointer === true && paldata.path === undefined && paldata.target === undefined && (ArrayBuffer.isView(paldata.source) || Array.isArray(paldata.source))) {
                    paldata$s = paldata.source;
                    paldata$o = paldata.offset;
                }
                (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((paldata$s !== undefined ? (paldata$s[paldata$o + (0)] ?? 0) : runtime.readIndex(paldata, 0)), cliprect);
                if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (32))) ? 0 : 1)) {
                    if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (16))) ? 0 : 1)) {
                        (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 1), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 1), 0) : method_draw_background(runtime, bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 1), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 1), 0));
                    }
                    if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (2))) ? 0 : 1)) {
                        (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 1) : method_draw_background(runtime, bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 1));
                    }
                    else {
                        if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (4))) ? 0 : 1)) {
                            (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 2) : method_draw_background(runtime, bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 2));
                        }
                    }
                }
                (__L4 ?? runtime.memberCall(members.m_tx_tilemap, "set_flip", 0, __L5))((((__L3 ? __L3() : runtime.macro("flip_screen"))) ? (3) : (0)));
                (__L6 ?? runtime.memberCall(members.m_tx_tilemap, "draw", 0, __L7))(screen, bitmap, cliprect, 0, 0);
                for (let offs = ((60) | 0); ((Number(offs) <= Number((members.m_spritelimit ?? runtime.member("m_spritelimit")))) ? 1 : 0); offs = ((((offs) + (64))) | 0)) {
                    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, offs) : method_draw_sprites(runtime, bitmap, cliprect, offs));
                }
                return 0;
            }
            function method_draw_background(runtime, bitmap, cliprect, xpos, ypos, image) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rectangle"], __L1 = __l["m_screen.visible_area"], __L2 = __l["m_bg_palette.pens"], __L3 = __l["flip_screen"], __L4 = __l["m_bg_gfxdecode.gfx"], __L5 = __l["bitmap.fill"], __L6 = __l["fill"];
                let __t0, __t1, __t2;
                let rect = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0() : runtime.macro("rectangle")));
                let visarea = (__L1 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))();
                let paldata = (__L2 ?? runtime.memberCall(members.m_bg_palette, "pens", 0, undefined))();
                let paldata$s = undefined, paldata$o = 0;
                if (ArrayBuffer.isView(paldata) || Array.isArray(paldata))
                    paldata$s = paldata;
                else if (paldata !== null && typeof paldata === 'object' && paldata.generatedPointer === true && paldata.path === undefined && paldata.target === undefined && (ArrayBuffer.isView(paldata.source) || Array.isArray(paldata.source))) {
                    paldata$s = paldata.source;
                    paldata$o = paldata.offset;
                }
                let BGHEIGHT = ((128) & 0xff);
                if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                    xpos = ((((264) - (xpos))) | 0);
                    ypos = ((((((264) - (ypos))) - (BGHEIGHT))) | 0);
                }
                xpos = ((((xpos) + (124))) | 0);
                ypos = ((((ypos) + (16))) | 0);
                runtime.memberCall((__L4 ?? runtime.memberCall(members.m_bg_gfxdecode, "gfx", 0, undefined))(image), "transpen", 0, undefined)(bitmap, cliprect, 0, 0, (__L3 ? __L3() : runtime.macro("flip_screen")), (__L3 ? __L3() : runtime.macro("flip_screen")), xpos, ypos, 0);
                runtime.memberCall((__L4 ?? runtime.memberCall(members.m_bg_gfxdecode, "gfx", 0, undefined))(image), "transpen", 0, undefined)(bitmap, cliprect, 0, 0, (__L3 ? __L3() : runtime.macro("flip_screen")), (__L3 ? __L3() : runtime.macro("flip_screen")), ((xpos) - (256)), ypos, 0);
                if ((members.m_do_bg_fills ?? runtime.member("m_do_bg_fills"))) {
                    rect.min_x = visarea.min_x;
                    rect.max_x = visarea.max_x;
                    if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                        rect.min_y = ((ypos) - (BGHEIGHT));
                        rect.max_y = ((ypos) - (1));
                    }
                    else {
                        rect.min_y = ((ypos) + (BGHEIGHT));
                        rect.max_y = ((((ypos) + (((2) * (BGHEIGHT))))) - (1));
                    }
                    (__L5 ?? runtime.memberCall(bitmap, "fill", 0, __L6))((paldata$s !== undefined ? (paldata$s[paldata$o + (__add_draw_background(runtime, (__t2 = __deref_draw_background(runtime, (__L4 ?? runtime.memberCall(members.m_bg_gfxdecode, "gfx", 0, undefined))(image)), typeof __t2.colorbase === 'function' ? (__t2.colorbase() ?? 0) : runtime.container((__L4 ?? runtime.memberCall(members.m_bg_gfxdecode, "gfx", 0, undefined))(image), "colorbase")), 3))] ?? 0) : runtime.readIndex(paldata, __add_draw_background(runtime, (__t2 = __deref_draw_background(runtime, (__L4 ?? runtime.memberCall(members.m_bg_gfxdecode, "gfx", 0, undefined))(image)), typeof __t2.colorbase === 'function' ? (__t2.colorbase() ?? 0) : runtime.container((__L4 ?? runtime.memberCall(members.m_bg_gfxdecode, "gfx", 0, undefined))(image), "colorbase")), 3))), rect);
                }
            }
            function __add_draw_background(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function __deref_draw_background(runtime, p) {
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
            function method_draw_sprites(runtime, bitmap, cliprect, initoffs) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["flip_screen"], __L1 = __l["m_sp_gfxdecode.gfx"], __L2 = __l["m_sp_palette.transpen_mask"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                for (let offs = ((initoffs) | 0); ((Number(offs) >= Number(((initoffs) & (192)))) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    let sy = ((((257) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
                    let color = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (63))) | 0);
                    let flipx = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (64))) | 0);
                    let flipy = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (128))) | 0);
                    let code = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
                    let sx = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
                    let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                    if (((((offs) & (128))) ? 0 : 1)) {
                        clip.min_y = 0;
                        clip.max_y = 127;
                    }
                    else {
                        clip.min_y = 128;
                        clip.max_y = 255;
                    }
                    if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
                        let temp = ((clip.min_y) | 0);
                        clip.min_y = runtime.subtract(255, clip.max_y);
                        clip.max_y = ((255) - (temp));
                        flipx = ((((flipx) ? 0 : 1)) | 0);
                        flipy = ((((flipy) ? 0 : 1)) | 0);
                        sx = ((((238) - (sx))) | 0);
                        sy = ((((282) - (sy))) | 0);
                    }
                    sx = ((((sx) + (129))) | 0);
                    clip = cliprect;
                    runtime.memberCall((__L1 ?? runtime.memberCall(members.m_sp_gfxdecode, "gfx", 0, undefined))(0), "transmask", 0, undefined)(bitmap, clip, code, color, flipx, flipy, sx, sy, (__L2 ?? runtime.memberCall(members.m_sp_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L1 ?? runtime.memberCall(members.m_sp_gfxdecode, "gfx", 0, undefined))(0)), color, 0));
                }
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
            function method_soundlatch_r(runtime) {
                const members = runtime.members;
                return (members.m_soundlatch ?? runtime.member("m_soundlatch"));
            }
            function method_m6803_port1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_ay_45M.data_r"], __L1 = __l["m_ay_45L.data_r"];
                let __t0, __t1;
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (8))) {
                    return (__L0 ?? runtime.memberCall(members.m_ay_45M, "data_r", 0, undefined))();
                }
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (16))) {
                    return (__L1 ?? runtime.memberCall(members.m_ay_45L, "data_r", 0, undefined))();
                }
                return 255;
            }
            function method_m6803_port2_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "videoram_w": method_videoram_w,
                "colorram_w": method_colorram_w,
                "protection_r": method_protection_r,
                "scroll_w": method_scroll_w,
                "bgxpos_w_0": method_bgxpos_w_0,
                "bgypos_w_0": method_bgypos_w_0,
                "bgxpos_w_1": method_bgxpos_w_1,
                "bgypos_w_1": method_bgypos_w_1,
                "bgcontrol_w": method_bgcontrol_w,
                "compute_resistor_weights": method_compute_resistor_weights,
                "combine_weights__int__3": method_combine_weights__int__3,
                "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
                "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
                "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
                "combine_weights__int__2": method_combine_weights__int__2,
                "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
                "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0,
                "get_tile_info": method_get_tile_info,
                "screen_update": method_screen_update,
                "draw_background": method_draw_background,
                "draw_sprites": method_draw_sprites,
                "soundlatch_r": method_soundlatch_r,
                "m6803_port1_r": method_m6803_port1_r,
                "m6803_port2_r": method_m6803_port2_r
            };
            return __methodTable;
        })();
        return {
            "m52_state.videoram_w": methods["videoram_w"],
            "m52_state.colorram_w": methods["colorram_w"],
            "m52_state.protection_r": methods["protection_r"],
            "m52_state.scroll_w": methods["scroll_w"],
            "m52_state.bgxpos_w_0": methods["bgxpos_w_0"],
            "m52_state.bgypos_w_0": methods["bgypos_w_0"],
            "m52_state.bgxpos_w_1": methods["bgxpos_w_1"],
            "m52_state.bgypos_w_1": methods["bgypos_w_1"],
            "m52_state.bgcontrol_w": methods["bgcontrol_w"],
            "m52_state.compute_resistor_weights": methods["compute_resistor_weights"],
            "m52_state.combine_weights__int__3": methods["combine_weights__int__3"],
            "m52_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
            "m52_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
            "m52_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
            "m52_state.combine_weights__int__2": methods["combine_weights__int__2"],
            "m52_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
            "m52_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
            "m52_state.get_tile_info": methods["get_tile_info"],
            "m52_state.screen_update": methods["screen_update"],
            "m52_state.draw_background": methods["draw_background"],
            "m52_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "draw", "fatalerror", "fill", "flip_screen", "m_ay_45L.data_r", "m_ay_45M.data_r", "m_bg_gfxdecode.gfx", "m_bg_palette.pens", "m_screen.visible_area", "m_sp_gfxdecode.gfx", "m_sp_palette.pens", "m_sp_palette.transpen_mask", "m_tx_tilemap.draw", "m_tx_tilemap.mark_tile_dirty", "m_tx_tilemap.set_flip", "m_tx_tilemap.set_scrollx", "mark_tile_dirty", "rectangle", "set", "set_flip", "set_scrollx", "std::clamp", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
