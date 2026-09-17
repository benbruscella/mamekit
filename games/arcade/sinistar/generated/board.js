// GENERATED executable machine composition from src/mame/williams/williams.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'sinistar');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            const __mame_table_0 = [0, 4, 6, 7, 11, 9, 8];
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
            function method_sinistar_vram_select_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (runtime.overrides["vram_select_w"] ? runtime.overrides["vram_select_w"](data) : method_vram_select_w(runtime, data));
                (__l["m_blitter.window_enable_w"] ? __l["m_blitter.window_enable_w"]((((data) >>> (2)) & 1)) : (members.m_blitter) != null ? ((runtime.dereference(members.m_blitter)).window_enable_w?.((((data) >>> (2)) & 1)) ?? 0) : 0);
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
            function method_port_0_49way_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((__mame_table_0[((((((__l["m_49way_x.read"] ? __l["m_49way_x.read"]() : (members.m_49way_x) != null ? (typeof (runtime.dereference(members.m_49way_x)).read === 'function' ? (runtime.dereference(members.m_49way_x)).read() : typeof (runtime.dereference(members.m_49way_x)).read === 'number' || typeof (runtime.dereference(members.m_49way_x)).read === 'boolean' ? (runtime.dereference(members.m_49way_x)).read : runtime.container(members.m_49way_x, "read")) : (__l["read"]?.() ?? 0))) >>> (4))) % 7) + 7) % 7] ?? 0)) << (4))) | ((__mame_table_0[((((((__l["m_49way_y.read"] ? __l["m_49way_y.read"]() : (members.m_49way_y) != null ? (typeof (runtime.dereference(members.m_49way_y)).read === 'function' ? (runtime.dereference(members.m_49way_y)).read() : typeof (runtime.dereference(members.m_49way_y)).read === 'number' || typeof (runtime.dereference(members.m_49way_y)).read === 'boolean' ? (runtime.dereference(members.m_49way_y)).read : runtime.container(members.m_49way_y, "read")) : (__l["read"]?.() ?? 0))) >>> (4))) % 7) + 7) % 7] ?? 0)));
            }
            return {
                "vram_select_w": method_vram_select_w,
                "video_counter_r": method_video_counter_r,
                "watchdog_reset_w": method_watchdog_reset_w,
                "cmos_4bit_w": method_cmos_4bit_w,
                "sinistar_vram_select_w": method_sinistar_vram_select_w,
                "screen_update": method_screen_update,
                "port_0_49way_r": method_port_0_49way_r
            };
        })();
        return {
            "williams_state.vram_select_w": methods["vram_select_w"],
            "williams_state.video_counter_r": methods["video_counter_r"],
            "williams_state.watchdog_reset_w": methods["watchdog_reset_w"],
            "williams_state.cmos_4bit_w": methods["cmos_4bit_w"],
            "williams_state.sinistar_vram_select_w": methods["sinistar_vram_select_w"],
            "williams_state.screen_update": methods["screen_update"],
            "williams_state.port_0_49way_r": methods["port_0_49way_r"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["disable", "m_49way_x.read", "m_49way_y.read", "m_blitter.window_enable_w", "m_palette.pen_color", "m_rom_view.disable", "m_rom_view.select", "m_screen.vpos", "m_watchdog.watchdog_reset", "read", "select"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
