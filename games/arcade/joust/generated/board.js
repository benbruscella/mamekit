// GENERATED executable machine composition from src/mame/williams/williams.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'joust');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_vram_select_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((data) >>> (0)) & 1)) {
                    (__l["m_rom_view.select"] ? __l["m_rom_view.select"](0) : (members.m_rom_view) != null ? ((runtime.dereference(members.m_rom_view)).select?.(0) ?? 0) : (__l["select"]?.(0) ?? 0));
                }
                else {
                    (__l["m_rom_view.disable"] ? __l["m_rom_view.disable"]() : (members.m_rom_view) != null ? (typeof (runtime.dereference(members.m_rom_view)).disable === 'function' ? (runtime.dereference(members.m_rom_view)).disable() : typeof (runtime.dereference(members.m_rom_view)).disable === 'number' || typeof (runtime.dereference(members.m_rom_view)).disable === 'boolean' ? (runtime.dereference(members.m_rom_view)).disable : runtime.container(members.m_rom_view, "disable")) : (__l["disable"]?.() ?? 0));
                }
                members.m_cocktail = (((((data) >>> (1)) & 1)) & 0xff);
            }
            function method_video_counter_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) < Number(256)) ? 1 : 0)) {
                    return (((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) & (252));
                }
                else {
                    return 252;
                }
            }
            function method_watchdog_reset_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(data) === Number(57)) ? 1 : 0)) {
                    (__l["m_watchdog.watchdog_reset"] ? __l["m_watchdog.watchdog_reset"]() : (members.m_watchdog) != null ? (typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'function' ? (runtime.dereference(members.m_watchdog)).watchdog_reset() : typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'number' || typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'boolean' ? (runtime.dereference(members.m_watchdog)).watchdog_reset : runtime.container(members.m_watchdog, "watchdog_reset")) : 0);
                }
            }
            function method_cmos_4bit_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_nvram"), offset, ((data) | (240)));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                let pens = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
                for (let x = ((0) | 0); ((Number(x) < Number(16)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
                    runtime.writeIndex(pens, x, (__l["m_palette.pen_color"] ? __l["m_palette.pen_color"](runtime.readIndex(h_m_paletteram, x)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).pen_color?.(runtime.readIndex(h_m_paletteram, x)) ?? 0) : 0));
                }
                for (let y = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
                    let source = runtime.addressOf(h_m_videoram, y);
                    let dest = bitmap["pix&"](y);
                    for (let x = ((((cliprect.min_x) & (-2))) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (2))) | 0)) {
                        let pix = ((runtime.readIndex(source, ((runtime.divide(x, 2)) * (256)))) & 0xff);
                        runtime.writeIndex(dest, ((x) + (0)), runtime.readIndex(pens, ((pix) >>> (4))));
                        runtime.writeIndex(dest, ((x) + (1)), runtime.readIndex(pens, ((pix) & (15))));
                    }
                }
                return 0;
            }
            return {
                "vram_select_w": method_vram_select_w,
                "video_counter_r": method_video_counter_r,
                "watchdog_reset_w": method_watchdog_reset_w,
                "cmos_4bit_w": method_cmos_4bit_w,
                "screen_update": method_screen_update
            };
        })();
        return {
            "williams_state.vram_select_w": methods["vram_select_w"],
            "williams_state.video_counter_r": methods["video_counter_r"],
            "williams_state.watchdog_reset_w": methods["watchdog_reset_w"],
            "williams_state.cmos_4bit_w": methods["cmos_4bit_w"],
            "williams_state.screen_update": methods["screen_update"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["disable", "m_palette.pen_color", "m_rom_view.disable", "m_rom_view.select", "m_screen.vpos", "m_watchdog.watchdog_reset", "select"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
