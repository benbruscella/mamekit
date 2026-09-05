// GENERATED executable machine composition from src/mame/capcom/commando.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'commando');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_scrollx_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scroll_x"), offset, data);
                (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, ((runtime.readIndex((members.m_scroll_x ?? runtime.member("m_scroll_x")), 0)) | (((runtime.readIndex((members.m_scroll_x ?? runtime.member("m_scroll_x")), 1)) << (8))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, ((runtime.readIndex((members.m_scroll_x ?? runtime.member("m_scroll_x")), 0)) | (((runtime.readIndex((members.m_scroll_x ?? runtime.member("m_scroll_x")), 1)) << (8))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, ((runtime.readIndex((members.m_scroll_x ?? runtime.member("m_scroll_x")), 0)) | (((runtime.readIndex((members.m_scroll_x ?? runtime.member("m_scroll_x")), 1)) << (8))))) ?? 0));
            }
            function method_scrolly_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scroll_y"), offset, data);
                (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, ((runtime.readIndex((members.m_scroll_y ?? runtime.member("m_scroll_y")), 0)) | (((runtime.readIndex((members.m_scroll_y ?? runtime.member("m_scroll_y")), 1)) << (8))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, ((runtime.readIndex((members.m_scroll_y ?? runtime.member("m_scroll_y")), 0)) | (((runtime.readIndex((members.m_scroll_y ?? runtime.member("m_scroll_y")), 1)) << (8))))) ?? 0) : (runtime.calls["set_scrolly"]?.(0, ((runtime.readIndex((members.m_scroll_y ?? runtime.member("m_scroll_y")), 0)) | (((runtime.readIndex((members.m_scroll_y ?? runtime.member("m_scroll_y")), 1)) << (8))))) ?? 0));
            }
            function method_videoram_w_1(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), offset, data);
                if (1) {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_colorram_w_1(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 1), offset, data);
                if (1) {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_videoram_w_0(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), offset, data);
                if (0) {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_colorram_w_0(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 0), offset, data);
                if (0) {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 0), tile_index);
                let code = runtime.add(runtime.readIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), tile_index), ((((attr) & (192))) << (2)));
                let color = ((attr) & (15));
                let flags = (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, flags) ?? 0) : (runtime.calls["set"]?.(1, code, color, flags) ?? 0));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 1), tile_index);
                let code = runtime.add(runtime.readIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), tile_index), ((((attr) & (192))) << (2)));
                let color = ((attr) & (15));
                let flags = (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (runtime.calls["set"]?.(0, code, color, flags) ?? 0));
            }
            function method_scanline(runtime, param) {
                const members = runtime.members;
                const h_m_irqprom = members.m_irqprom ?? runtime.member("m_irqprom");
                let scanline = param;
                let irq = ((runtime.readIndex(h_m_irqprom, ((scanline) & (255)))) & 0xff);
                if (((irq) & (8))) {
                    (runtime.calls["m_maincpu.set_input_line_and_vector"] ? runtime.calls["m_maincpu.set_input_line_and_vector"](0, 2, ((199) | (((((irq) << (3))) & (24))))) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line_and_vector?.(0, 2, ((199) | (((((irq) << (3))) & (24))))) ?? 0) : (runtime.calls["set_input_line_and_vector"]?.(0, 2, ((199) | (((((irq) << (3))) & (24))))) ?? 0));
                }
                if (((irq) & (4))) {
                    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 2) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 2) ?? 0) : (runtime.calls["set_input_line"]?.(0, 2) ?? 0));
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                let spriteram = (runtime.calls["m_spriteram.buffer"] ? runtime.calls["m_spriteram.buffer"]() : (members.m_spriteram) != null ? (typeof (runtime.dereference(members.m_spriteram)).buffer === 'function' ? (runtime.dereference(members.m_spriteram)).buffer() : typeof (runtime.dereference(members.m_spriteram)).buffer === 'number' || typeof (runtime.dereference(members.m_spriteram)).buffer === 'boolean' ? (runtime.dereference(members.m_spriteram)).buffer : runtime.container(members.m_spriteram, "buffer")) : (runtime.calls["buffer"]?.() ?? 0));
                for (let offs = (((members.m_spriteram).length) - (4)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
                    let attr = runtime.readIndex(spriteram, ((offs) + (1)));
                    let bank = ((((attr) & (192))) >>> (6));
                    let code = runtime.add(runtime.readIndex(spriteram, offs), ((256) * (bank)));
                    let color = ((((attr) & (48))) >>> (4));
                    let flipx = ((attr) & (4));
                    let flipy = ((attr) & (8));
                    let sx = ((runtime.readIndex(spriteram, ((offs) + (3)))) - (((((attr) & (1))) << (8))));
                    let sy = runtime.readIndex(spriteram, ((offs) + (2)));
                    if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                        sx = ((240) - (sx));
                        sy = ((240) - (sy));
                        flipx = ((flipx) ? 0 : 1);
                        flipy = ((flipy) ? 0 : 1);
                    }
                    if (((Number(bank) < Number(3)) ? 1 : 0)) {
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : (runtime.calls["gfx"]?.(2) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 15) ?? 0);
                    }
                }
            }
            return {
                "scrollx_w": method_scrollx_w,
                "scrolly_w": method_scrolly_w,
                "videoram_w_1": method_videoram_w_1,
                "colorram_w_1": method_colorram_w_1,
                "videoram_w_0": method_videoram_w_0,
                "colorram_w_0": method_colorram_w_0,
                "get_bg_tile_info": method_get_bg_tile_info,
                "get_fg_tile_info": method_get_fg_tile_info,
                "scanline": method_scanline,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "commando_state.scrollx_w": methods["scrollx_w"],
            "commando_state.scrolly_w": methods["scrolly_w"],
            "commando_state.videoram_w_1": methods["videoram_w_1"],
            "commando_state.colorram_w_1": methods["colorram_w_1"],
            "commando_state.videoram_w_0": methods["videoram_w_0"],
            "commando_state.colorram_w_0": methods["colorram_w_0"],
            "commando_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "commando_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "commando_state.scanline": methods["scanline"],
            "commando_state.screen_update": methods["screen_update"],
            "commando_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
