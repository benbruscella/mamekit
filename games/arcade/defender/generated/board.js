// GENERATED executable machine composition from src/mame/williams/williams.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'defender');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_watchdog_reset_w(runtime, data) {
                const members = runtime.members;
                if (((Number(data) === Number(57)) ? 1 : 0)) {
                    (runtime.calls["m_watchdog.watchdog_reset"] ? runtime.calls["m_watchdog.watchdog_reset"]() : (members.m_watchdog) != null ? (typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'function' ? (runtime.dereference(members.m_watchdog)).watchdog_reset() : typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'number' || typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'boolean' ? (runtime.dereference(members.m_watchdog)).watchdog_reset : runtime.container(members.m_watchdog, "watchdog_reset")) : (runtime.calls["watchdog_reset"]?.() ?? 0));
                }
            }
            function method_video_control_w(runtime, data) {
                const members = runtime.members;
                members.m_cocktail = (((((data) >>> (0)) & 1)) & 0xff);
            }
            function method_cmos_4bit_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_nvram"), offset, ((data) | (240)));
            }
            function method_video_counter_r(runtime) {
                const members = runtime.members;
                if (((Number((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) < Number(256)) ? 1 : 0)) {
                    return (((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) & (252));
                }
                else {
                    return 252;
                }
            }
            function method_bank_select_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_rom_view.select"] ? runtime.calls["m_rom_view.select"](((data) & (15))) : (members.m_rom_view) != null ? ((runtime.dereference(members.m_rom_view)).select?.(((data) & (15))) ?? 0) : (runtime.calls["select"]?.(((data) & (15))) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                let pens = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
                for (let x = 0; ((Number(x) < Number(16)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.writeIndex(pens, x, (runtime.calls["m_palette.pen_color"] ? runtime.calls["m_palette.pen_color"](runtime.readIndex(h_m_paletteram, x)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).pen_color?.(runtime.readIndex(h_m_paletteram, x)) ?? 0) : (runtime.calls["pen_color"]?.(runtime.readIndex(h_m_paletteram, x)) ?? 0)));
                }
                for (let y = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
                    let source = runtime.addressOf(h_m_videoram, y);
                    let dest = bitmap["pix&"](y);
                    for (let x = ((cliprect.min_x) & ((~1))); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((x) + (2))) {
                        let pix = ((runtime.readIndex(source, ((runtime.divide(x, 2)) * (256)))) & 0xff);
                        runtime.writeIndex(dest, ((x) + (0)), runtime.readIndex(pens, ((pix) >>> (4))));
                        runtime.writeIndex(dest, ((x) + (1)), runtime.readIndex(pens, ((pix) & (15))));
                    }
                }
                return 0;
            }
            return {
                "watchdog_reset_w": method_watchdog_reset_w,
                "video_control_w": method_video_control_w,
                "cmos_4bit_w": method_cmos_4bit_w,
                "video_counter_r": method_video_counter_r,
                "bank_select_w": method_bank_select_w,
                "screen_update": method_screen_update
            };
        })();
        return {
            "defender_state.watchdog_reset_w": methods["watchdog_reset_w"],
            "defender_state.video_control_w": methods["video_control_w"],
            "defender_state.cmos_4bit_w": methods["cmos_4bit_w"],
            "defender_state.video_counter_r": methods["video_counter_r"],
            "defender_state.bank_select_w": methods["bank_select_w"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_watchdog_reset_w(runtime, data) {
                const members = runtime.members;
                if (((Number(data) === Number(57)) ? 1 : 0)) {
                    (runtime.calls["m_watchdog.watchdog_reset"] ? runtime.calls["m_watchdog.watchdog_reset"]() : (members.m_watchdog) != null ? (typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'function' ? (runtime.dereference(members.m_watchdog)).watchdog_reset() : typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'number' || typeof (runtime.dereference(members.m_watchdog)).watchdog_reset === 'boolean' ? (runtime.dereference(members.m_watchdog)).watchdog_reset : runtime.container(members.m_watchdog, "watchdog_reset")) : (runtime.calls["watchdog_reset"]?.() ?? 0));
                }
            }
            function method_cmos_4bit_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_nvram"), offset, ((data) | (240)));
            }
            function method_video_counter_r(runtime) {
                const members = runtime.members;
                if (((Number((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) < Number(256)) ? 1 : 0)) {
                    return (((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) & (252));
                }
                else {
                    return 252;
                }
            }
            function method_vram_select_w(runtime, data) {
                const members = runtime.members;
                if ((((data) >>> (0)) & 1)) {
                    (runtime.calls["m_rom_view.select"] ? runtime.calls["m_rom_view.select"](0) : (members.m_rom_view) != null ? ((runtime.dereference(members.m_rom_view)).select?.(0) ?? 0) : (runtime.calls["select"]?.(0) ?? 0));
                }
                else {
                    (runtime.calls["m_rom_view.disable"] ? runtime.calls["m_rom_view.disable"]() : (members.m_rom_view) != null ? (typeof (runtime.dereference(members.m_rom_view)).disable === 'function' ? (runtime.dereference(members.m_rom_view)).disable() : typeof (runtime.dereference(members.m_rom_view)).disable === 'number' || typeof (runtime.dereference(members.m_rom_view)).disable === 'boolean' ? (runtime.dereference(members.m_rom_view)).disable : runtime.container(members.m_rom_view, "disable")) : (runtime.calls["disable"]?.() ?? 0));
                }
                members.m_cocktail = (((((data) >>> (1)) & 1)) & 0xff);
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                let pens = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
                for (let x = 0; ((Number(x) < Number(16)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.writeIndex(pens, x, (runtime.calls["m_palette.pen_color"] ? runtime.calls["m_palette.pen_color"](runtime.readIndex(h_m_paletteram, x)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).pen_color?.(runtime.readIndex(h_m_paletteram, x)) ?? 0) : (runtime.calls["pen_color"]?.(runtime.readIndex(h_m_paletteram, x)) ?? 0)));
                }
                for (let y = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
                    let source = runtime.addressOf(h_m_videoram, y);
                    let dest = bitmap["pix&"](y);
                    for (let x = ((cliprect.min_x) & ((~1))); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((x) + (2))) {
                        let pix = ((runtime.readIndex(source, ((runtime.divide(x, 2)) * (256)))) & 0xff);
                        runtime.writeIndex(dest, ((x) + (0)), runtime.readIndex(pens, ((pix) >>> (4))));
                        runtime.writeIndex(dest, ((x) + (1)), runtime.readIndex(pens, ((pix) & (15))));
                    }
                }
                return 0;
            }
            return {
                "watchdog_reset_w": method_watchdog_reset_w,
                "cmos_4bit_w": method_cmos_4bit_w,
                "video_counter_r": method_video_counter_r,
                "vram_select_w": method_vram_select_w,
                "screen_update": method_screen_update
            };
        })();
        return {
            "williams_state.watchdog_reset_w": methods["watchdog_reset_w"],
            "williams_state.cmos_4bit_w": methods["cmos_4bit_w"],
            "williams_state.video_counter_r": methods["video_counter_r"],
            "williams_state.vram_select_w": methods["vram_select_w"],
            "williams_state.screen_update": methods["screen_update"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
