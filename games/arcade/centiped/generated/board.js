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
            function method_centiped_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_centiped_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                if (((offset) & (4))) {
                    let color = 0;
                    let r = ((((255) * ((((((~data)) >>> (0))) & (1))))) | 0);
                    let g = ((((255) * ((((((~data)) >>> (1))) & (1))))) | 0);
                    let b = ((((255) * ((((((~data)) >>> (2))) & (1))))) | 0);
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
                    color = (__l["rgb_t"] ? __l["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b));
                    if (((Number(((offset) & (8))) === Number(0)) ? 1 : 0)) {
                        (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](((offset) & (3)), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((offset) & (3)), color) ?? 0) : 0);
                    }
                    else {
                        let i = ((0) | 0);
                        offset = ((offset) & (3));
                        for (i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (4))) | 0)) {
                            if (((Number(offset) === Number(((((i) >>> (2))) & (3)))) ? 1 : 0)) {
                                (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](runtime.add(((i) + (4)), 1), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.add(((i) + (4)), 1), color) ?? 0) : 0);
                            }
                            if (((Number(offset) === Number(((((i) >>> (4))) & (3)))) ? 1 : 0)) {
                                (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](runtime.add(((i) + (4)), 2), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.add(((i) + (4)), 2), color) ?? 0) : 0);
                            }
                            if (((Number(offset) === Number(((((i) >>> (6))) & (3)))) ? 1 : 0)) {
                                (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](runtime.add(((i) + (4)), 3), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.add(((i) + (4)), 3), color) ?? 0) : 0);
                            }
                        }
                    }
                }
            }
            function method_earom_write(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_earom.set_address"] ? __l["m_earom.set_address"](((offset) & (63))) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_address?.(((offset) & (63))) ?? 0) : 0);
                (__l["m_earom.set_data"] ? __l["m_earom.set_data"](data) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_data?.(data) ?? 0) : 0);
            }
            function method_earom_control_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_earom.set_control"] ? __l["m_earom.set_control"]((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1)) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_control?.((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1)) ?? 0) : 0);
                (__l["m_earom.set_clk"] ? __l["m_earom.set_clk"]((((data) >>> (0)) & 1)) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_clk?.((((data) >>> (0)) & 1)) ?? 0) : 0);
            }
            function method_earom_read(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["m_earom.data"] ? __l["m_earom.data"]() : (members.m_earom) != null ? (typeof (runtime.dereference(members.m_earom)).data === 'function' ? (runtime.dereference(members.m_earom)).data() : typeof (runtime.dereference(members.m_earom)).data === 'number' || typeof (runtime.dereference(members.m_earom)).data === 'boolean' ? (runtime.dereference(members.m_earom)).data : runtime.container(members.m_earom, "data")) : 0);
            }
            function method_irq_ack_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
            }
            function method_centiped_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, runtime.add(((data) & (63)), 64), 0, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((data) >>> (6))) : runtime.macro("TILE_FLIPYX", ((data) >>> (6))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, runtime.add(((data) & (63)), 64), 0, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((data) >>> (6))) : runtime.macro("TILE_FLIPYX", ((data) >>> (6))))) ?? 0) : (__l["set"]?.(0, runtime.add(((data) & (63)), 64), 0, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((data) >>> (6))) : runtime.macro("TILE_FLIPYX", ((data) >>> (6))))) ?? 0));
            }
            function method_generate_interrupt(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scanline = ((param) | 0);
                if (((scanline) & (16))) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, ((((((scanline) - (1))) & (32))) ? (1) : (0))) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, ((((((scanline) - (1))) & (32))) ? (1) : (0))) ?? 0) : 0);
                }
                (__l["m_screen.update_partial"] ? __l["m_screen.update_partial"](scanline) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.(scanline) ?? 0) : 0);
            }
            function method_screen_update_centiped(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let spriteclip = Object.assign(Object.create(Object.getPrototypeOf(cliprect)), cliprect);
                (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
                    spriteclip.min_x = ((spriteclip.min_x) + (8));
                }
                else {
                    spriteclip.max_x = ((spriteclip.max_x) - (8));
                }
                for (let offs = ((0) | 0); ((Number(offs) < Number(16)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
                    let code = ((((((((runtime.readIndex(h_m_spriteram, offs)) & (62))) >>> (1))) | (((((runtime.readIndex(h_m_spriteram, offs)) & (1))) << (6))))) | 0);
                    let color = ((runtime.readIndex(h_m_spriteram, ((offs) + (48)))) | 0);
                    let flipx = ((((((runtime.readIndex(h_m_spriteram, offs)) >>> (6))) & (1))) | 0);
                    let flipy = ((((((runtime.readIndex(h_m_spriteram, offs)) >>> (7))) & (1))) | 0);
                    let x = ((runtime.readIndex(h_m_spriteram, ((offs) + (32)))) | 0);
                    let y = ((((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (16)))))) | 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transmask?.(bitmap, spriteclip, code, color, flipx, flipy, x, y, runtime.readIndex((members.m_penmask ?? runtime.member("m_penmask")), ((color) & (63)))) ?? 0);
                }
                return 0;
            }
            function method_flip_screen_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen = ((state) & 0xff);
            }
            return {
                "centiped_videoram_w": method_centiped_videoram_w,
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
        })();
        return {
            "centiped_state.centiped_videoram_w": methods["centiped_videoram_w"],
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
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_earom.data", "m_earom.set_address", "m_earom.set_clk", "m_earom.set_control", "m_earom.set_data", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.set_pen_color", "m_screen.update_partial", "mark_tile_dirty", "rgb_t", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
