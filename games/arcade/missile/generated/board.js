// GENERATED executable machine composition from src/mame/atari/missile.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'missile');
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
            const __mame_table_0 = [0, 15, 240, 255];
            function method_trampoline_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mainmap.read8"];
                if ((runtime.overrides["get_madsel"] ? runtime.overrides["get_madsel"]() : method_get_madsel(runtime))) {
                    return (runtime.overrides["vram_mad_r"] ? runtime.overrides["vram_mad_r"](offset) : method_vram_mad_r(runtime, offset));
                }
                let data = (((__L0 ?? runtime.memberCall(members.m_mainmap, "read8", 0, undefined))(offset)) & 0xff);
                (runtime.overrides["load_madsel"] ? runtime.overrides["load_madsel"](data) : method_load_madsel(runtime, data));
                return data;
            }
            function method_get_madsel(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.total_cycles"], __L1 = __l["machine"], __L2 = __l["machine().side_effects_disabled"];
                let __t0;
                let madsel = ((0) ? 1 : 0);
                if ((members.m_madsel_lastcycles ?? runtime.member("m_madsel_lastcycles"))) {
                    madsel = ((((Number(runtime.subtract((__L0 ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (members.m_madsel_lastcycles ?? runtime.member("m_madsel_lastcycles")))) === Number(5)) ? 1 : 0)) ? 1 : 0);
                    if ((((madsel) && (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        members.m_madsel_lastcycles = 0;
                    }
                }
                return madsel;
            }
            function method_vram_mad_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_maincpu.adjust_icount"];
                let vramaddr = 0;
                let vramdata = ((0) & 0xff);
                let vrammask = ((0) & 0xff);
                let result = ((255) & 0xff);
                vramaddr = ((offset) >>> (2));
                vrammask = ((((17) << (((offset) & (3))))) & 0xff);
                vramdata = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), vramaddr)) & (vrammask))) & 0xff);
                if (((Number(((vramdata) & (240))) === Number(0)) ? 1 : 0)) {
                    result = ((((result) & (-129))) & 0xff);
                }
                if (((Number(((vramdata) & (15))) === Number(0)) ? 1 : 0)) {
                    result = ((((result) & (-65))) & 0xff);
                }
                if (((Number(((offset) & (57344))) === Number(57344)) ? 1 : 0)) {
                    vramaddr = (runtime.overrides["get_bit3_addr"] ? runtime.overrides["get_bit3_addr"](offset) : method_get_bit3_addr(runtime, offset));
                    vrammask = ((((1) << (((offset) & (7))))) & 0xff);
                    vramdata = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), vramaddr)) & (vrammask))) & 0xff);
                    if ((((vramdata) === (0)) ? 1 : 0)) {
                        result = ((((result) & (-33))) & 0xff);
                    }
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        (__L2 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(-1);
                    }
                }
                return result;
            }
            function method_get_bit3_addr(runtime, pixaddr) {
                const members = runtime.members;
                return ((((((runtime.shiftRight(((pixaddr) & (2048)), 1)) | (runtime.shiftRight((((~pixaddr)) & (2048)), 2)))) | (runtime.shiftRight(((pixaddr) & (2040)), 2)))) | (runtime.shiftRight(((pixaddr) & (4096)), 12)));
            }
            function method_load_madsel(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.get_sync"], __L1 = __l["machine"], __L2 = __l["machine().side_effects_disabled"], __L3 = __l["m_maincpu.total_cycles"];
                let __t0, __t1;
                data = ((data) & 0xff);
                if (((((((((((((members.m_irq_pin ?? runtime.member("m_irq_pin"))) ? 0 : 1)) && (((Number(((data) & (31))) === Number(1)) ? 1 : 0))) ? 1 : 0)) && ((__L0 ?? runtime.memberCall(members.m_maincpu, "get_sync", 0, undefined))())) ? 1 : 0)) && (((((__L2 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    members.m_madsel_lastcycles = (__L3 ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))();
                }
            }
            function method_trampoline_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_mainmap.write8"];
                data = ((data) & 0xff);
                if ((runtime.overrides["get_madsel"] ? runtime.overrides["get_madsel"]() : method_get_madsel(runtime))) {
                    (runtime.overrides["vram_mad_w"] ? runtime.overrides["vram_mad_w"](offset, data) : method_vram_mad_w(runtime, offset, data));
                }
                else {
                    (__L0 ?? runtime.memberCall(members.m_mainmap, "write8", 0, undefined))(offset, data);
                }
            }
            function method_vram_mad_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["machine"], __L1 = __l["machine().side_effects_disabled"], __L2 = __l["m_maincpu.adjust_icount"];
                data = ((data) & 0xff);
                const h_m_writeprom = members.m_writeprom ?? runtime.member("m_writeprom");
                let vramaddr = 0;
                let vramdata = ((0) & 0xff);
                let vrammask = ((0) & 0xff);
                vramaddr = ((offset) >>> (2));
                vramdata = (((__mame_table_0[(((((data) >>> (6))) % 4) + 4) % 4] ?? 0)) & 0xff);
                vrammask = ((runtime.readIndex(h_m_writeprom, ((((offset) & (7))) | (16)))) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), vramaddr, ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), vramaddr)) & (vrammask))) | (((vramdata) & ((~vrammask))))));
                if (((Number(((offset) & (57344))) === Number(57344)) ? 1 : 0)) {
                    vramaddr = (runtime.overrides["get_bit3_addr"] ? runtime.overrides["get_bit3_addr"](offset) : method_get_bit3_addr(runtime, offset));
                    vramdata = (((-((((data) >>> (5))) & (1)))) & 0xff);
                    vrammask = ((runtime.readIndex(h_m_writeprom, ((((offset) & (7))) | (24)))) & 0xff);
                    runtime.writeIndex(runtime.writableMember("m_videoram"), vramaddr, ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), vramaddr)) & (vrammask))) | (((vramdata) & ((~vrammask))))));
                    if (((((__L1 ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        (__L2 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(-1);
                    }
                }
            }
            function method_vram_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
            }
            function method_vram_w(runtime, offset, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
            }
            function method_trackball_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_track[1].read"], __L1 = __l["read"], __L2 = __l["m_track[0].read"], __L3 = __l["m_track[3].read"], __L4 = __l["m_track[2].read"], __L5 = __l["m_inputs[0].read"];
                let __t0, __t1, __t2, __t3, __t4;
                const h_m_track = members.m_track ?? runtime.member("m_track");
                const h_m_inputs = members.m_inputs ?? runtime.member("m_inputs");
                if ((members.m_ctrld ?? runtime.member("m_ctrld"))) {
                    if ((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? 0 : 1)) {
                        return (((((((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_track, 1), "read", 0, __L1))()) << (4))) & (240))) | ((((__L2 ?? runtime.memberCall(runtime.readIndex(h_m_track, 0), "read", 0, __L1))()) & (15))));
                    }
                    else {
                        return (((((((__L3 ?? runtime.memberCall(runtime.readIndex(h_m_track, 3), "read", 0, __L1))()) << (4))) & (240))) | ((((__L4 ?? runtime.memberCall(runtime.readIndex(h_m_track, 2), "read", 0, __L1))()) & (15))));
                    }
                }
                return (__L5 ?? runtime.memberCall(runtime.readIndex(h_m_inputs, 0), "read", 0, __L1))();
            }
            function method_palette_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["pal1bit"], __L1 = __l["m_palette.set_pen_color"];
                data = ((data) & 0xff);
                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) & (7)), (__L0 ? __L0(runtime.shiftRight((~data), 3)) : runtime.macro("pal1bit", runtime.shiftRight((~data), 3))), (__L0 ? __L0(runtime.shiftRight((~data), 2)) : runtime.macro("pal1bit", runtime.shiftRight((~data), 2))), (__L0 ? __L0(runtime.shiftRight((~data), 1)) : runtime.macro("pal1bit", runtime.shiftRight((~data), 1))));
            }
            function method_irqack_w(runtime, data) {
                const members = runtime.members;
                data = ((data) & 0xff);
                members.m_irq_state = ((0) & 0xff);
            }
            function method_adjust_cpu_speed(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_unscaled_clock"], __L1 = __l["m_screen.time_until_pos"], __L2 = __l["m_cpu_timer.adjust"], __L3 = __l["adjust"];
                let curv = ((param) | 0);
                if ((((curv) === (224)) ? 1 : 0)) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_unscaled_clock", 0, undefined))(runtime.divide(10000000, 16));
                }
                else {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_unscaled_clock", 0, undefined))(runtime.divide(10000000, 8));
                }
                curv = ((((curv) ^ (224))) | 0);
                (__L2 ?? runtime.memberCall(members.m_cpu_timer, "adjust", 0, __L3))((__L1 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))((runtime.overrides["v_to_scanline"] ? runtime.overrides["v_to_scanline"](curv) : method_v_to_scanline(runtime, curv))), curv);
            }
            function method_v_to_scanline(runtime, v) {
                const members = runtime.members;
                return (((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? (((256) - (v))) : (v));
            }
            function method_clock_irq(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.update_partial"];
                let curv = ((param) | 0);
                members.m_irq_state = ((((((~curv)) >>> (5)) & 1)) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((runtime.overrides["v_to_scanline"] ? runtime.overrides["v_to_scanline"](curv) : method_v_to_scanline(runtime, curv)));
                (runtime.overrides["schedule_next_irq"] ? runtime.overrides["schedule_next_irq"](curv) : method_schedule_next_irq(runtime, curv));
            }
            function method_schedule_next_irq(runtime, curv) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.time_until_pos"], __L1 = __l["m_irq_timer.adjust"], __L2 = __l["adjust"];
                if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
                    curv = ((((((((curv) - (32))) & (255))) | (16))) | 0);
                }
                else {
                    curv = ((((((((curv) + (32))) & (255))) & (-17))) | 0);
                }
                (__L1 ?? runtime.memberCall(members.m_irq_timer, "adjust", 0, __L2))((__L0 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))((runtime.overrides["v_to_scanline"] ? runtime.overrides["v_to_scanline"](curv) : method_v_to_scanline(runtime, curv))), curv);
            }
            function method_sync_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                if ((((state) && (((Number((members.m_irq_state ?? runtime.member("m_irq_state"))) !== Number((members.m_irq_pin ?? runtime.member("m_irq_pin")))) ? 1 : 0))) ? 1 : 0)) {
                    members.m_irq_pin = (((members.m_irq_state ?? runtime.member("m_irq_state"))) & 0xff);
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, (((members.m_irq_pin ?? runtime.member("m_irq_pin"))) ? (1) : (0)));
                }
            }
            function method_screen_update_missile(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["cliprect.top"], __L1 = __l["top"], __L2 = __l["cliprect.bottom"], __L3 = __l["bottom"], __L4 = __l["cliprect.left"], __L5 = __l["left"], __L6 = __l["cliprect.right"], __L7 = __l["right"];
                let __t0, __t1, __t2, __t3;
                for (let y = (((__L0 ?? runtime.memberCall(cliprect, "top", 0, __L1))()) | 0); ((Number(y) <= Number((__L2 ?? runtime.memberCall(cliprect, "bottom", 0, __L3))())) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let dst = bitmap["pix&"](y);
                    let dst$s = undefined, dst$o = 0;
                    if (ArrayBuffer.isView(dst) || Array.isArray(dst))
                        dst$s = dst;
                    else if (dst !== null && typeof dst === 'object' && dst.generatedPointer === true && dst.path === undefined && dst.target === undefined && (ArrayBuffer.isView(dst.source) || Array.isArray(dst.source))) {
                        dst$s = dst.source;
                        dst$o = dst.offset;
                    }
                    let effy = (((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? (((((280) - (y))) & (255))) : (y))) | 0);
                    let src = __addr_screen_update_missile(runtime, (members.m_videoram ?? runtime.member("m_videoram")), ((effy) * (64)));
                    let src$s = undefined, src$o = 0;
                    if (ArrayBuffer.isView(src) || Array.isArray(src))
                        src$s = src;
                    else if (src !== null && typeof src === 'object' && src.generatedPointer === true && src.path === undefined && src.target === undefined && (ArrayBuffer.isView(src.source) || Array.isArray(src.source))) {
                        src$s = src.source;
                        src$o = src.offset;
                    }
                    let src3 = 0;
                    if ((((effy) >= (224)) ? 1 : 0)) {
                        src3 = __addr_screen_update_missile(runtime, (members.m_videoram ?? runtime.member("m_videoram")), (runtime.overrides["get_bit3_addr"] ? runtime.overrides["get_bit3_addr"](((effy) << (8))) : method_get_bit3_addr(runtime, ((effy) << (8)))));
                    }
                    for (let x = (((__L4 ?? runtime.memberCall(cliprect, "left", 0, __L5))()) | 0); ((Number(x) <= Number((__L6 ?? runtime.memberCall(cliprect, "right", 0, __L7))())) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let pix = ((runtime.shiftRight((src$s !== undefined ? (src$s[src$o + (runtime.divide(x, 4))] ?? 0) : runtime.readIndex(src, runtime.divide(x, 4))), ((x) & (3)))) & 0xff);
                        pix = ((((((((pix) >>> (2))) & (4))) | (((((pix) << (1))) & (2))))) & 0xff);
                        if (src3) {
                            pix = ((((pix) | (((runtime.shiftRight(runtime.readIndex(src3, ((runtime.divide(x, 8)) * (2))), ((x) & (7)))) & (1))))) & 0xff);
                        }
                        runtime.writeIndex(dst, x, pix);
                    }
                }
                return 0;
            }
            function __addr_screen_update_missile(runtime, v, i) {
                if (Array.isArray(v) || ArrayBuffer.isView(v))
                    return { generatedPointer: true, source: v, offset: i };
                return runtime.addressOf(v, i);
            }
            function method_vblank_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_screen.vpos"];
                let __t0;
                let v = (((runtime.overrides["scanline_to_v"] ? runtime.overrides["scanline_to_v"]((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) : method_scanline_to_v(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()))) | 0);
                return (((v) < (24)) ? 1 : 0);
            }
            function method_scanline_to_v(runtime, scanline) {
                const members = runtime.members;
                return (((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? (((256) - (scanline))) : (scanline));
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "trampoline_r": method_trampoline_r,
                "get_madsel": method_get_madsel,
                "vram_mad_r": method_vram_mad_r,
                "get_bit3_addr": method_get_bit3_addr,
                "load_madsel": method_load_madsel,
                "trampoline_w": method_trampoline_w,
                "vram_mad_w": method_vram_mad_w,
                "vram_r": method_vram_r,
                "vram_w": method_vram_w,
                "trackball_r": method_trackball_r,
                "palette_w": method_palette_w,
                "irqack_w": method_irqack_w,
                "adjust_cpu_speed": method_adjust_cpu_speed,
                "v_to_scanline": method_v_to_scanline,
                "clock_irq": method_clock_irq,
                "schedule_next_irq": method_schedule_next_irq,
                "sync_w": method_sync_w,
                "screen_update_missile": method_screen_update_missile,
                "vblank_r": method_vblank_r,
                "scanline_to_v": method_scanline_to_v
            };
            return __methodTable;
        })();
        return {
            "missile_state.trampoline_r": methods["trampoline_r"],
            "missile_state.get_madsel": methods["get_madsel"],
            "missile_state.vram_mad_r": methods["vram_mad_r"],
            "missile_state.get_bit3_addr": methods["get_bit3_addr"],
            "missile_state.load_madsel": methods["load_madsel"],
            "missile_state.trampoline_w": methods["trampoline_w"],
            "missile_state.vram_mad_w": methods["vram_mad_w"],
            "missile_state.vram_r": methods["vram_r"],
            "missile_state.vram_w": methods["vram_w"],
            "missile_state.trackball_r": methods["trackball_r"],
            "missile_state.palette_w": methods["palette_w"],
            "missile_state.irqack_w": methods["irqack_w"],
            "missile_state.adjust_cpu_speed": methods["adjust_cpu_speed"],
            "missile_state.v_to_scanline": methods["v_to_scanline"],
            "missile_state.clock_irq": methods["clock_irq"],
            "missile_state.schedule_next_irq": methods["schedule_next_irq"],
            "missile_state.sync_w": methods["sync_w"],
            "missile_state.screen_update_missile": methods["screen_update_missile"],
            "missile_state.vblank_r": methods["vblank_r"],
            "missile_state.scanline_to_v": methods["scanline_to_v"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust", "bottom", "cliprect.bottom", "cliprect.left", "cliprect.right", "cliprect.top", "left", "m_cpu_timer.adjust", "m_inputs[0].read", "m_irq_timer.adjust", "m_maincpu.adjust_icount", "m_maincpu.get_sync", "m_maincpu.set_input_line", "m_maincpu.set_unscaled_clock", "m_maincpu.total_cycles", "m_mainmap.read8", "m_mainmap.write8", "m_palette.set_pen_color", "m_screen.time_until_pos", "m_screen.update_partial", "m_screen.vpos", "m_track[0].read", "m_track[1].read", "m_track[2].read", "m_track[3].read", "machine", "machine().side_effects_disabled", "pal1bit", "read", "right", "top"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
