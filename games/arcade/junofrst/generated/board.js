// GENERATED executable machine composition from src/mame/konami/junofrst.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'junofrst');
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
            function method_sh_irqtrigger_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.set_input_line"];
                data = ((data) & 0xff);
                if ((((((Number((members.m_last_irq ?? runtime.member("m_last_irq"))) === Number(0)) ? 1 : 0)) && ((((data) === (1)) ? 1 : 0))) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(0, 2);
                }
                members.m_last_irq = ((data) & 0xff);
            }
            function method_bankselect_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mainbank.set_entry"], __L1 = __l["set_entry"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L1))(((data) & (15)));
            }
            function method_blitter_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                const h_m_blitrom = members.m_blitrom ?? runtime.member("m_blitrom");
                runtime.writeIndex(runtime.writableMember("m_blitterdata"), offset, data);
                if ((((offset) === (3)) ? 1 : 0)) {
                    let src = ((((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 2)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)))) & (65532));
                    let dest = ((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 0)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 1)));
                    let copy = (((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)) >>> (0)) & 1)) ? 1 : 0);
                    for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        for (let j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                            let data = ((0) & 0xff);
                            if ((((src) >>> (0)) & 1)) {
                                data = ((((runtime.readIndex(h_m_blitrom, ((src) >>> (1)))) & (15))) & 0xff);
                            }
                            else {
                                data = ((runtime.shiftRight(runtime.readIndex(h_m_blitrom, ((src) >>> (1))), 4)) & 0xff);
                            }
                            src = ((src) + (1));
                            if (data) {
                                if (((copy) ? 0 : 1)) {
                                    data = ((0) & 0xff);
                                }
                                if ((((dest) >>> (0)) & 1)) {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (15))) | (((data) << (4)))));
                                }
                                else {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (240))) | (data)));
                                }
                            }
                            dest = ((dest) + (1));
                        }
                        dest = ((dest) + (240));
                    }
                }
            }
            function method_i8039_irq_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_i8039.set_input_line"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_i8039, "set_input_line", 0, undefined))(0, 1);
            }
            function method_i8039_irqen_and_status_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_i8039.set_input_line"];
                data = ((data) & 0xff);
                if (((((~data)) >>> (7)) & 1)) {
                    (__L0 ?? runtime.memberCall(members.m_i8039, "set_input_line", 0, undefined))(0, 0);
                }
                members.m_i8039_status = ((runtime.shiftRight(((data) & (112)), 4)) & 0xff);
            }
            function method_irq_enable_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_irq_enable = ((state) & 0xff);
                if ((((members.m_irq_enable ?? runtime.member("m_irq_enable"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_flip_screen_x_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_x = ((state) & 0xff);
            }
            function method_flip_screen_y_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_y = ((state) & 0xff);
            }
            function method_scramble_draw_background(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t::black"], __L1 = __l["bitmap.fill"], __L2 = __l["fill"];
                (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ? __L0() : runtime.macro("rgb_t::black")), cliprect);
                (runtime.overrides["scramble_draw_stars"] ? runtime.overrides["scramble_draw_stars"](bitmap, cliprect, 256) : method_scramble_draw_stars(runtime, bitmap, cliprect, 256));
            }
            function method_scramble_draw_stars(runtime, bitmap, cliprect, maxx) {
                const members = runtime.members;
                if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
                    for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, maxx, y, ((y) * (512))) : method_stars_draw_row(runtime, bitmap, maxx, y, ((y) * (512))));
                    }
                }
            }
            function method_stars_draw_row(runtime, bitmap, maxx, y, star_offs) {
                const members = runtime.members;
                let __t0, __t1;
                let flipxor = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (192) : (0))) & 0xff);
                star_offs = ((((star_offs) % (131071))) >>> 0);
                for (let x = ((0) | 0); (((x) < (maxx)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    let h8q = ((((((~x)) >>> (3)) & 1)) & 0xff);
                    let enable_star = (((((((y) ^ (h8q))) >>> (0)) & 1)) ? 1 : 0);
                    let blink_state = (((((members.m_stars_blink_state ?? runtime.member("m_stars_blink_state"))) & (3))) & 0xff);
                    let enab = ((0) ? 1 : 0);
                    switch (blink_state) {
                        case 0:
                            {
                                enab = ((1) ? 1 : 0);
                                break;
                            }
                        case 1:
                            {
                                enab = (((((y) >>> (0)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 2:
                            {
                                enab = (((((y) >>> (1)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 3:
                            {
                                enab = ((h8q) ? 1 : 0);
                                break;
                            }
                    }
                    enable_star = ((((enable_star) & ((((enab) && (((Number(((((x) & (192))) ^ (flipxor))) !== Number(192)) ? 1 : 0))) ? 1 : 0)))) ? 1 : 0);
                    let star = ((0) & 0xff);
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t0 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t0))) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t1 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t1))) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
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
            function method__30hz_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if (state) {
                    members.m_irq_toggle = ((((members.m_irq_toggle) ^ (1))) & 0xff);
                    if (((((members.m_irq_toggle ?? runtime.member("m_irq_toggle"))) && ((members.m_irq_enable ?? runtime.member("m_irq_enable")))) ? 1 : 0)) {
                        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
                    }
                }
            }
            function method_portA_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.total_cycles"];
                let __t0;
                let timer = ((((runtime.divide((__L0 ?? runtime.memberCall(members.m_audiocpu, "total_cycles", 0, undefined))(), runtime.divide(1024, 2))) & (15))) | 0);
                return ((((timer) << (4))) | ((members.m_i8039_status ?? runtime.member("m_i8039_status"))));
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
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "sh_irqtrigger_w": method_sh_irqtrigger_w,
                "bankselect_w": method_bankselect_w,
                "blitter_w": method_blitter_w,
                "i8039_irq_w": method_i8039_irq_w,
                "i8039_irqen_and_status_w": method_i8039_irqen_and_status_w,
                "irq_enable_w": method_irq_enable_w,
                "flip_screen_x_w": method_flip_screen_x_w,
                "flip_screen_y_w": method_flip_screen_y_w,
                "scramble_draw_background": method_scramble_draw_background,
                "scramble_draw_stars": method_scramble_draw_stars,
                "stars_draw_row": method_stars_draw_row,
                "_30hz_irq": method__30hz_irq,
                "portA_r": method_portA_r,
                "compute_resistor_weights": method_compute_resistor_weights
            };
            return __methodTable;
        })();
        return {
            "junofrst_state.sh_irqtrigger_w": methods["sh_irqtrigger_w"],
            "junofrst_state.bankselect_w": methods["bankselect_w"],
            "junofrst_state.blitter_w": methods["blitter_w"],
            "junofrst_state.i8039_irq_w": methods["i8039_irq_w"],
            "junofrst_state.i8039_irqen_and_status_w": methods["i8039_irqen_and_status_w"],
            "junofrst_state.irq_enable_w": methods["irq_enable_w"],
            "junofrst_state.flip_screen_x_w": methods["flip_screen_x_w"],
            "junofrst_state.flip_screen_y_w": methods["flip_screen_y_w"],
            "junofrst_state._30hz_irq": methods["_30hz_irq"],
            "junofrst_state.portA_r": methods["portA_r"],
            "junofrst_state.compute_resistor_weights": methods["compute_resistor_weights"],
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
            function method_blitter_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                const h_m_blitrom = members.m_blitrom ?? runtime.member("m_blitrom");
                runtime.writeIndex(runtime.writableMember("m_blitterdata"), offset, data);
                if ((((offset) === (3)) ? 1 : 0)) {
                    let src = ((((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 2)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)))) & (65532));
                    let dest = ((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 0)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 1)));
                    let copy = (((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)) >>> (0)) & 1)) ? 1 : 0);
                    for (let i = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        for (let j = ((0) | 0); (((j) < (16)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                            let data = ((0) & 0xff);
                            if ((((src) >>> (0)) & 1)) {
                                data = ((((runtime.readIndex(h_m_blitrom, ((src) >>> (1)))) & (15))) & 0xff);
                            }
                            else {
                                data = ((runtime.shiftRight(runtime.readIndex(h_m_blitrom, ((src) >>> (1))), 4)) & 0xff);
                            }
                            src = ((src) + (1));
                            if (data) {
                                if (((copy) ? 0 : 1)) {
                                    data = ((0) & 0xff);
                                }
                                if ((((dest) >>> (0)) & 1)) {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (15))) | (((data) << (4)))));
                                }
                                else {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (240))) | (data)));
                                }
                            }
                            dest = ((dest) + (1));
                        }
                        dest = ((dest) + (240));
                    }
                }
            }
            function method_irq_enable_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                members.m_irq_enable = ((state) & 0xff);
                if ((((members.m_irq_enable ?? runtime.member("m_irq_enable"))) ? 0 : 1)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
                }
            }
            function method_flip_screen_x_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_x = ((state) & 0xff);
            }
            function method_flip_screen_y_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_y = ((state) & 0xff);
            }
            function method_scramble_draw_background(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t::black"], __L1 = __l["bitmap.fill"], __L2 = __l["fill"];
                (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ? __L0() : runtime.macro("rgb_t::black")), cliprect);
                (runtime.overrides["scramble_draw_stars"] ? runtime.overrides["scramble_draw_stars"](bitmap, cliprect, 256) : method_scramble_draw_stars(runtime, bitmap, cliprect, 256));
            }
            function method_scramble_draw_stars(runtime, bitmap, cliprect, maxx) {
                const members = runtime.members;
                if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
                    for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, maxx, y, ((y) * (512))) : method_stars_draw_row(runtime, bitmap, maxx, y, ((y) * (512))));
                    }
                }
            }
            function method_stars_draw_row(runtime, bitmap, maxx, y, star_offs) {
                const members = runtime.members;
                let __t0, __t1;
                let flipxor = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (192) : (0))) & 0xff);
                star_offs = ((((star_offs) % (131071))) >>> 0);
                for (let x = ((0) | 0); (((x) < (maxx)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    let h8q = ((((((~x)) >>> (3)) & 1)) & 0xff);
                    let enable_star = (((((((y) ^ (h8q))) >>> (0)) & 1)) ? 1 : 0);
                    let blink_state = (((((members.m_stars_blink_state ?? runtime.member("m_stars_blink_state"))) & (3))) & 0xff);
                    let enab = ((0) ? 1 : 0);
                    switch (blink_state) {
                        case 0:
                            {
                                enab = ((1) ? 1 : 0);
                                break;
                            }
                        case 1:
                            {
                                enab = (((((y) >>> (0)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 2:
                            {
                                enab = (((((y) >>> (1)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 3:
                            {
                                enab = ((h8q) ? 1 : 0);
                                break;
                            }
                    }
                    enable_star = ((((enable_star) & ((((enab) && (((Number(((((x) & (192))) ^ (flipxor))) !== Number(192)) ? 1 : 0))) ? 1 : 0)))) ? 1 : 0);
                    let star = ((0) & 0xff);
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t0 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t0))) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t1 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t1))) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
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
            function method__30hz_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if (state) {
                    members.m_irq_toggle = ((((members.m_irq_toggle) ^ (1))) & 0xff);
                    if (((((members.m_irq_toggle ?? runtime.member("m_irq_toggle"))) && ((members.m_irq_enable ?? runtime.member("m_irq_enable")))) ? 1 : 0)) {
                        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
                    }
                }
            }
            function method_portA_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_audiocpu.total_cycles"];
                let __t0;
                let timer = ((((runtime.divide((__L0 ?? runtime.memberCall(members.m_audiocpu, "total_cycles", 0, undefined))(), runtime.divide(1024, 2))) & (15))) | 0);
                return ((((timer) << (4))) | ((members.m_i8039_status ?? runtime.member("m_i8039_status"))));
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
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "blitter_w": method_blitter_w,
                "irq_enable_w": method_irq_enable_w,
                "flip_screen_x_w": method_flip_screen_x_w,
                "flip_screen_y_w": method_flip_screen_y_w,
                "scramble_draw_background": method_scramble_draw_background,
                "scramble_draw_stars": method_scramble_draw_stars,
                "stars_draw_row": method_stars_draw_row,
                "_30hz_irq": method__30hz_irq,
                "portA_r": method_portA_r,
                "compute_resistor_weights": method_compute_resistor_weights
            };
            return __methodTable;
        })();
        return {
            "tutankhm_state.scramble_draw_background": methods["scramble_draw_background"],
            "tutankhm_state.scramble_draw_stars": methods["scramble_draw_stars"],
            "tutankhm_state.stars_draw_row": methods["stars_draw_row"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "fatalerror", "fill", "m_audiocpu.set_input_line", "m_audiocpu.total_cycles", "m_i8039.set_input_line", "m_mainbank.set_entry", "m_maincpu.set_input_line", "rgb_t::black", "set_entry", "std::clamp"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
