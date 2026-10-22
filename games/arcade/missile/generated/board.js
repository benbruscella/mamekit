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
            const __mame_table_0 = [0, 15, 240, 255];
            function method_trampoline_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((runtime.overrides["get_madsel"] ? runtime.overrides["get_madsel"]() : method_get_madsel(runtime))) {
                    return (runtime.overrides["vram_mad_r"] ? runtime.overrides["vram_mad_r"](offset) : method_vram_mad_r(runtime, offset));
                }
                let data = (((__l["m_mainmap.read8"] ?? runtime.memberCall(members.m_mainmap, "read8", 0, undefined))(offset)) & 0xff);
                (runtime.overrides["load_madsel"] ? runtime.overrides["load_madsel"](data) : method_load_madsel(runtime, data));
                return data;
            }
            function method_get_madsel(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let madsel = ((0) ? 1 : 0);
                if ((members.m_madsel_lastcycles ?? runtime.member("m_madsel_lastcycles"))) {
                    madsel = ((((Number(runtime.subtract((__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (members.m_madsel_lastcycles ?? runtime.member("m_madsel_lastcycles")))) === Number(5)) ? 1 : 0)) ? 1 : 0);
                    if ((((madsel) && ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        members.m_madsel_lastcycles = 0;
                    }
                }
                return madsel;
            }
            function method_vram_mad_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let vramaddr = 0;
                let vramdata = ((0) & 0xff);
                let vrammask = ((0) & 0xff);
                let result = ((255) & 0xff);
                vramaddr = runtime.shiftRight(offset, 2);
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
                    if (((Number(vramdata) === Number(0)) ? 1 : 0)) {
                        result = ((((result) & (-33))) & 0xff);
                    }
                    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                        (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(-1);
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
                if (((((((((((((members.m_irq_pin ?? runtime.member("m_irq_pin"))) ? 0 : 1)) && (((Number(((data) & (31))) === Number(1)) ? 1 : 0))) ? 1 : 0)) && ((__l["m_maincpu.get_sync"] ?? runtime.memberCall(members.m_maincpu, "get_sync", 0, undefined))())) ? 1 : 0)) && ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                    members.m_madsel_lastcycles = (__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))();
                }
            }
            function method_trampoline_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((runtime.overrides["get_madsel"] ? runtime.overrides["get_madsel"]() : method_get_madsel(runtime))) {
                    (runtime.overrides["vram_mad_w"] ? runtime.overrides["vram_mad_w"](offset, data) : method_vram_mad_w(runtime, offset, data));
                }
                else {
                    (__l["m_mainmap.write8"] ?? runtime.memberCall(members.m_mainmap, "write8", 0, undefined))(offset, data);
                }
            }
            function method_vram_mad_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_writeprom = members.m_writeprom ?? runtime.member("m_writeprom");
                let vramaddr = 0;
                let vramdata = ((0) & 0xff);
                let vrammask = ((0) & 0xff);
                vramaddr = runtime.shiftRight(offset, 2);
                vramdata = (((__mame_table_0[(((runtime.shiftRight(data, 6)) % 4) + 4) % 4] ?? 0)) & 0xff);
                vrammask = ((runtime.readIndex(h_m_writeprom, ((((offset) & (7))) | (16)))) & 0xff);
                runtime.writeIndex(runtime.writableMember("m_videoram"), vramaddr, ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), vramaddr)) & (vrammask))) | (((vramdata) & ((~vrammask))))));
                if (((Number(((offset) & (57344))) === Number(57344)) ? 1 : 0)) {
                    vramaddr = (runtime.overrides["get_bit3_addr"] ? runtime.overrides["get_bit3_addr"](offset) : method_get_bit3_addr(runtime, offset));
                    vramdata = (((-((runtime.shiftRight(data, 5)) & (1)))) & 0xff);
                    vrammask = ((runtime.readIndex(h_m_writeprom, ((((offset) & (7))) | (24)))) & 0xff);
                    runtime.writeIndex(runtime.writableMember("m_videoram"), vramaddr, ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), vramaddr)) & (vrammask))) | (((vramdata) & ((~vrammask))))));
                    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                        (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(-1);
                    }
                }
            }
            function method_vram_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
            }
            function method_vram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
            }
            function method_trackball_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_track = members.m_track ?? runtime.member("m_track");
                const h_m_inputs = members.m_inputs ?? runtime.member("m_inputs");
                if ((members.m_ctrld ?? runtime.member("m_ctrld"))) {
                    if ((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? 0 : 1)) {
                        return (((((((__l["m_track[1].read"] ?? runtime.memberCall(runtime.readIndex(h_m_track, 1), "read", 0, __l["read"]))()) << (4))) & (240))) | ((((__l["m_track[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_track, 0), "read", 0, __l["read"]))()) & (15))));
                    }
                    else {
                        return (((((((__l["m_track[3].read"] ?? runtime.memberCall(runtime.readIndex(h_m_track, 3), "read", 0, __l["read"]))()) << (4))) & (240))) | ((((__l["m_track[2].read"] ?? runtime.memberCall(runtime.readIndex(h_m_track, 2), "read", 0, __l["read"]))()) & (15))));
                    }
                }
                return (__l["m_inputs[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_inputs, 0), "read", 0, __l["read"]))();
            }
            function method_palette_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) & (7)), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight((~data), 3)) : runtime.macro("pal1bit", runtime.shiftRight((~data), 3))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight((~data), 2)) : runtime.macro("pal1bit", runtime.shiftRight((~data), 2))), (__l["pal1bit"] ? __l["pal1bit"](runtime.shiftRight((~data), 1)) : runtime.macro("pal1bit", runtime.shiftRight((~data), 1))));
            }
            function method_irqack_w(runtime, data) {
                const members = runtime.members;
                members.m_irq_state = ((0) & 0xff);
            }
            function method_sync_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && (((Number((members.m_irq_state ?? runtime.member("m_irq_state"))) !== Number((members.m_irq_pin ?? runtime.member("m_irq_pin")))) ? 1 : 0))) ? 1 : 0)) {
                    members.m_irq_pin = (((members.m_irq_state ?? runtime.member("m_irq_state"))) & 0xff);
                    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, (((members.m_irq_pin ?? runtime.member("m_irq_pin"))) ? (1) : (0)));
                }
            }
            function method_screen_update_missile(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                for (let y = (((__l["cliprect.top"] ?? runtime.memberCall(cliprect, "top", 0, __l["top"]))()) | 0); ((Number(y) <= Number((__l["cliprect.bottom"] ?? runtime.memberCall(cliprect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let dst = bitmap["pix&"](y);
                    let effy = (((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? (((((280) - (y))) & (255))) : (y))) | 0);
                    let src = runtime.addressOf((members.m_videoram ?? runtime.member("m_videoram")), ((effy) * (64)));
                    let src3 = 0;
                    if (((Number(effy) >= Number(224)) ? 1 : 0)) {
                        src3 = runtime.addressOf((members.m_videoram ?? runtime.member("m_videoram")), (runtime.overrides["get_bit3_addr"] ? runtime.overrides["get_bit3_addr"](((effy) << (8))) : method_get_bit3_addr(runtime, ((effy) << (8)))));
                    }
                    for (let x = (((__l["cliprect.left"] ?? runtime.memberCall(cliprect, "left", 0, __l["left"]))()) | 0); ((Number(x) <= Number((__l["cliprect.right"] ?? runtime.memberCall(cliprect, "right", 0, __l["right"]))())) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                        let pix = ((runtime.shiftRight(runtime.readIndex(src, runtime.divide(x, 4)), ((x) & (3)))) & 0xff);
                        pix = ((((((runtime.shiftRight(pix, 2)) & (4))) | (((((pix) << (1))) & (2))))) & 0xff);
                        if (src3) {
                            pix = ((((pix) | (((runtime.shiftRight(runtime.readIndex(src3, ((runtime.divide(x, 8)) * (2))), ((x) & (7)))) & (1))))) & 0xff);
                        }
                        runtime.writeIndex(dst, x, pix);
                    }
                }
                return 0;
            }
            function method_vblank_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let v = (((runtime.overrides["scanline_to_v"] ? runtime.overrides["scanline_to_v"]((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) : method_scanline_to_v(runtime, (__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()))) | 0);
                return ((Number(v) < Number(24)) ? 1 : 0);
            }
            function method_scanline_to_v(runtime, scanline) {
                const members = runtime.members;
                return (((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? (((256) - (scanline))) : (scanline));
            }
            return {
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
                "sync_w": method_sync_w,
                "screen_update_missile": method_screen_update_missile,
                "vblank_r": method_vblank_r,
                "scanline_to_v": method_scanline_to_v
            };
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
            "missile_state.sync_w": methods["sync_w"],
            "missile_state.screen_update_missile": methods["screen_update_missile"],
            "missile_state.vblank_r": methods["vblank_r"],
            "missile_state.scanline_to_v": methods["scanline_to_v"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bottom", "cliprect.bottom", "cliprect.left", "cliprect.right", "cliprect.top", "left", "m_inputs[0].read", "m_maincpu.adjust_icount", "m_maincpu.get_sync", "m_maincpu.set_input_line", "m_maincpu.total_cycles", "m_mainmap.read8", "m_mainmap.write8", "m_palette.set_pen_color", "m_screen.vpos", "m_track[0].read", "m_track[1].read", "m_track[2].read", "m_track[3].read", "machine", "machine().side_effects_disabled", "pal1bit", "read", "right", "top"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
