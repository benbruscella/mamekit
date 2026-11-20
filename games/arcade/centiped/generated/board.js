// GENERATED executable machine composition from src/mame/atari/centiped.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'centiped');
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
            function method_centiped_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.mark_tile_dirty"], __L1 = __l["mark_tile_dirty"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
            }
            function method_centiped_IN0_r(runtime) {
                const members = runtime.members;
                return (runtime.overrides["read_trackball"] ? runtime.overrides["read_trackball"](0, 0) : method_read_trackball(runtime, 0, 0));
            }
            function method_read_trackball(runtime, idx, switch_port) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["ioport"];
                let __t0, __t1, __t2;
                let newpos = ((0) & 0xff);
                let portnames = ["IN0", "IN1", "IN2"];
                let tracknames = ["TRACK0_X", "TRACK0_Y", "TRACK1_X", "TRACK1_Y"];
                if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
                    idx = ((((idx) + (2))) | 0);
                }
                if ((members.m_dsw_select ?? runtime.member("m_dsw_select"))) {
                    return (((((__t0 = __deref_read_trackball(runtime, (__L0 ? __L0((portnames[switch_port] ?? 0)) : runtime.macro("ioport", (portnames[switch_port] ?? 0)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0((portnames[switch_port] ?? 0)) : runtime.macro("ioport", (portnames[switch_port] ?? 0))), "read"))) & (127))) | (runtime.readIndex((members.m_sign ?? runtime.member("m_sign")), idx)));
                }
                newpos = (((__t1 = __deref_read_trackball(runtime, (__L0 ? __L0((tracknames[idx] ?? 0)) : runtime.macro("ioport", (tracknames[idx] ?? 0)))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0((tracknames[idx] ?? 0)) : runtime.macro("ioport", (tracknames[idx] ?? 0))), "read"))) & 0xff);
                if (((Number(newpos) !== Number(runtime.readIndex((members.m_oldpos ?? runtime.member("m_oldpos")), idx))) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_sign"), idx, ((((newpos) - (runtime.readIndex((members.m_oldpos ?? runtime.member("m_oldpos")), idx)))) & (128)));
                    runtime.writeIndex(runtime.writableMember("m_oldpos"), idx, newpos);
                }
                return (((((((__t2 = __deref_read_trackball(runtime, (__L0 ? __L0((portnames[switch_port] ?? 0)) : runtime.macro("ioport", (portnames[switch_port] ?? 0)))), typeof __t2.read === 'function' ? (__t2.read() ?? 0) : runtime.container((__L0 ? __L0((portnames[switch_port] ?? 0)) : runtime.macro("ioport", (portnames[switch_port] ?? 0))), "read"))) & (112))) | (((runtime.readIndex((members.m_oldpos ?? runtime.member("m_oldpos")), idx)) & (15))))) | (runtime.readIndex((members.m_sign ?? runtime.member("m_sign")), idx)));
            }
            function __deref_read_trackball(runtime, p) {
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
            function method_centiped_IN2_r(runtime) {
                const members = runtime.members;
                return (runtime.overrides["read_trackball"] ? runtime.overrides["read_trackball"](1, 2) : method_read_trackball(runtime, 1, 2));
            }
            function method_centiped_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["rgb_t"], __L1 = __l["m_palette.set_pen_color"];
                data = ((data) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                if (((offset) & (4))) {
                    let color = 0;
                    let r = ((((255) * (((runtime.shiftRight((~data), 0)) & (1))))) | 0);
                    let g = ((((255) * (((runtime.shiftRight((~data), 1)) & (1))))) | 0);
                    let b = ((((255) * (((runtime.shiftRight((~data), 2)) & (1))))) | 0);
                    if ((((~data)) & (8))) {
                        if (b) {
                            b = ((192) | 0);
                        }
                        else {
                            if (g) {
                                g = ((192) | 0);
                            }
                        }
                    }
                    color = (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b));
                    if (((Number(((offset) & (8))) === Number(0)) ? 1 : 0)) {
                        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) & (3)), color);
                    }
                    else {
                        let i = ((0) | 0);
                        offset = ((offset) & (3));
                        for (i = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (4))) | 0)) {
                            if (((Number(offset) === Number(((runtime.shiftRight(i, 2)) & (3)))) ? 1 : 0)) {
                                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_centiped_paletteram_w(runtime, ((i) + (4)), 1), color);
                            }
                            if (((Number(offset) === Number(((runtime.shiftRight(i, 4)) & (3)))) ? 1 : 0)) {
                                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_centiped_paletteram_w(runtime, ((i) + (4)), 2), color);
                            }
                            if (((Number(offset) === Number(((runtime.shiftRight(i, 6)) & (3)))) ? 1 : 0)) {
                                (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_centiped_paletteram_w(runtime, ((i) + (4)), 3), color);
                            }
                        }
                    }
                }
            }
            function __add_centiped_paletteram_w(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
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
            function method_earom_read(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_earom.data"];
                let __t0;
                return (__L0 ?? runtime.memberCall(members.m_earom, "data", 0, undefined))();
            }
            function method_irq_ack_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"];
                data = ((data) & 0xff);
                (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
            }
            function method_centiped_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["TILE_FLIPYX"], __L1 = __l["tileinfo.set"], __L2 = __l["set"];
                let data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
                (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, __add_centiped_get_tile_info(runtime, ((data) & (63)), 64), 0, (__L0 ? __L0(runtime.shiftRight(data, 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(data, 6))));
            }
            function __add_centiped_get_tile_info(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_generate_interrupt(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_maincpu.set_input_line"], __L1 = __l["m_screen.update_partial"];
                let scanline = ((param) | 0);
                if (((scanline) & (16))) {
                    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((((scanline) - (1))) & (32))) ? (1) : (0)));
                }
                (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))(scanline);
            }
            function method_screen_update_centiped(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const __L0 = __l["m_bg_tilemap.draw"], __L1 = __l["draw"], __L2 = __l["m_gfxdecode.gfx"];
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let spriteclip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
                if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
                    spriteclip.min_x = __add_screen_update_centiped(runtime, spriteclip.min_x, 8);
                }
                else {
                    spriteclip.max_x = runtime.subtract(spriteclip.max_x, 8);
                }
                for (let offs = ((0) | 0); (((offs) < (16)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                    let code = ((((runtime.shiftRight(((runtime.readIndex(h_m_spriteram, offs)) & (62)), 1)) | (((((runtime.readIndex(h_m_spriteram, offs)) & (1))) << (6))))) | 0);
                    let color = ((runtime.readIndex(h_m_spriteram, ((offs) + (48)))) | 0);
                    let flipx = ((((runtime.shiftRight(runtime.readIndex(h_m_spriteram, offs), 6)) & (1))) | 0);
                    let flipy = ((((runtime.shiftRight(runtime.readIndex(h_m_spriteram, offs), 7)) & (1))) | 0);
                    let x = ((runtime.readIndex(h_m_spriteram, ((offs) + (32)))) | 0);
                    let y = ((((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (16)))))) | 0);
                    runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, spriteclip, code, color, flipx, flipy, x, y, runtime.readIndex((members.m_penmask ?? runtime.member("m_penmask")), ((color) & (63))));
                }
                return 0;
            }
            function __add_screen_update_centiped(runtime, a, b) {
                if (typeof a === 'number' && typeof b === 'number')
                    return a + b;
                if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
                    return { generatedPointer: true, source: a.source, offset: a.offset + b };
                }
                return runtime.add(a, b);
            }
            function method_flip_screen_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen = ((state) & 0xff);
            }
            // CALL_METHOD's direct targets: each emitted method by its name.
            const __methodTable = {
                "centiped_videoram_w": method_centiped_videoram_w,
                "centiped_IN0_r": method_centiped_IN0_r,
                "read_trackball": method_read_trackball,
                "centiped_IN2_r": method_centiped_IN2_r,
                "centiped_paletteram_w": method_centiped_paletteram_w,
                "earom_write": method_earom_write,
                "earom_control_w": method_earom_control_w,
                "earom_read": method_earom_read,
                "irq_ack_w": method_irq_ack_w,
                "centiped_get_tile_info": method_centiped_get_tile_info,
                "generate_interrupt": method_generate_interrupt,
                "screen_update_centiped": method_screen_update_centiped,
                "flip_screen_w": method_flip_screen_w
            };
            return __methodTable;
        })();
        return {
            "centiped_state.centiped_videoram_w": methods["centiped_videoram_w"],
            "centiped_state.centiped_IN0_r": methods["centiped_IN0_r"],
            "centiped_state.read_trackball": methods["read_trackball"],
            "centiped_state.centiped_IN2_r": methods["centiped_IN2_r"],
            "centiped_state.centiped_paletteram_w": methods["centiped_paletteram_w"],
            "centiped_state.earom_write": methods["earom_write"],
            "centiped_state.earom_control_w": methods["earom_control_w"],
            "centiped_state.earom_read": methods["earom_read"],
            "centiped_state.irq_ack_w": methods["irq_ack_w"],
            "centiped_state.centiped_get_tile_info": methods["centiped_get_tile_info"],
            "centiped_state.generate_interrupt": methods["generate_interrupt"],
            "centiped_state.screen_update_centiped": methods["screen_update_centiped"],
            "centiped_state.flip_screen_w": methods["flip_screen_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "ioport", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_earom.data", "m_earom.set_address", "m_earom.set_clk", "m_earom.set_control", "m_earom.set_data", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.set_pen_color", "m_screen.update_partial", "mark_tile_dirty", "rgb_t", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
