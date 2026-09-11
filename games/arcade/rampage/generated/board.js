// GENERATED executable machine composition from src/mame/bally/mcr3.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rampage');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_rampage_op6_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_sounds_good.reset_write"] ? __l["m_sounds_good.reset_write"]((((((~data)) >>> (5))) & (1))) : (members.m_sounds_good) != null ? ((runtime.dereference(members.m_sounds_good)).reset_write?.((((((~data)) >>> (5))) & (1))) ?? 0) : 0);
                (__l["m_sounds_good.write"] ? __l["m_sounds_good.write"](data) : (members.m_sounds_good) != null ? ((runtime.dereference(members.m_sounds_good)).write?.(data) ?? 0) : 0);
            }
            function method_mcr_paletteram9_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
            }
            function method_mcr_set_color(runtime, index, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](index, (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(index, (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) ?? 0) : 0);
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (__l["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
            }
            function method_mcrmono_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((tile_index) * (2)))) | (((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), runtime.add(((tile_index) * (2)), 1))) << (8))))) | 0);
                let code = ((((((data) & (1023))) | (((((data) >>> (4))) & (1024))))) | 0);
                let color = ((((((((data) >>> (12))) & (3))) ^ (3))) | 0);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, color, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((data) >>> (10))) : runtime.macro("TILE_FLIPYX", ((data) >>> (10))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((data) >>> (10))) : runtime.macro("TILE_FLIPYX", ((data) >>> (10))))) ?? 0) : (__l["set"]?.(0, code, color, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((data) >>> (10))) : runtime.macro("TILE_FLIPYX", ((data) >>> (10))))) ?? 0));
            }
            function method_mcr_interrupt(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scanline = ((param) | 0);
                if ((((((Number(scanline) === Number(0)) ? 1 : 0)) || (((Number(scanline) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                    (__l["m_ctc.trg2"] ? __l["m_ctc.trg2"](1) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg2?.(1) ?? 0) : 0);
                    (__l["m_ctc.trg2"] ? __l["m_ctc.trg2"](0) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg2?.(0) ?? 0) : 0);
                }
                if (((Number(scanline) === Number(0)) ? 1 : 0)) {
                    (__l["m_ctc.trg3"] ? __l["m_ctc.trg3"](1) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg3?.(1) ?? 0) : 0);
                    (__l["m_ctc.trg3"] ? __l["m_ctc.trg3"](0) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg3?.(0) ?? 0) : 0);
                }
            }
            function method_screen_update_mcr3(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_bg_tilemap.set_flip"] ? __l["m_bg_tilemap.set_flip"]((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (((1) | (2))) : (0))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_flip?.((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (((1) | (2))) : (0))) ?? 0) : (__l["set_flip"]?.((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (((1) | (2))) : (0))) ?? 0));
                (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                (runtime.overrides["mcr3_update_sprites"] ? runtime.overrides["mcr3_update_sprites"](screen, bitmap, cliprect, 3, 0, 0, 0, 1) : method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, 3, 0, 0, 0, 1));
                return 0;
            }
            function method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, color_mask, code_xor, dx, dy, interlaced) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                ((runtime.dereference((__l["m_screen.priority"] ? __l["m_screen.priority"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).priority === 'function' ? (runtime.dereference(members.m_screen)).priority() : typeof (runtime.dereference(members.m_screen)).priority === 'number' || typeof (runtime.dereference(members.m_screen)).priority === 'boolean' ? (runtime.dereference(members.m_screen)).priority : runtime.container(members.m_screen, "priority")) : 0))).fill?.(1, cliprect) ?? 0);
                for (let offs = (((((members.m_spriteram).length) - (4))) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    if (((Number(runtime.readIndex(h_m_spriteram, offs)) === Number(0)) ? 1 : 0)) {
                        continue;
                    }
                    let flags = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
                    let code = ((runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((256) * (((((flags) >>> (3))) & (1)))))) | 0);
                    let color = (((((~flags)) & (color_mask))) | 0);
                    let flipx = ((((flags) & (16))) | 0);
                    let flipy = ((((flags) & (32))) | 0);
                    let sx = ((((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) - (3))) * (2))) | 0);
                    let sy = ((((241) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
                    if (((Number(interlaced) === Number(1)) ? 1 : 0)) {
                        sy = ((((sy) * (2))) | 0);
                    }
                    code = ((((code) ^ (code_xor))) | 0);
                    sx = ((((sx) + (dx))) | 0);
                    sy = ((((sy) + (dy))) | 0);
                    if ((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? 0 : 1)) {
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).prio_transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 0, 257) ?? 0);
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).prio_transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 2, 65279) ?? 0);
                    }
                    else {
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).prio_transmask?.(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 0, 257) ?? 0);
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).prio_transmask?.(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)), 2, 65279) ?? 0);
                    }
                }
            }
            return {
                "rampage_op6_w": method_rampage_op6_w,
                "mcr_paletteram9_w": method_mcr_paletteram9_w,
                "mcr_set_color": method_mcr_set_color,
                "mcr3_videoram_w": method_mcr3_videoram_w,
                "mcrmono_get_bg_tile_info": method_mcrmono_get_bg_tile_info,
                "mcr_interrupt": method_mcr_interrupt,
                "screen_update_mcr3": method_screen_update_mcr3,
                "mcr3_update_sprites": method_mcr3_update_sprites
            };
        })();
        return {
            "mcr3_state.rampage_op6_w": methods["rampage_op6_w"],
            "mcr3_state.mcr_paletteram9_w": methods["mcr_paletteram9_w"],
            "mcr3_state.mcr3_videoram_w": methods["mcr3_videoram_w"],
            "mcr3_state.mcrmono_get_bg_tile_info": methods["mcrmono_get_bg_tile_info"],
            "mcr3_state.mcr_interrupt": methods["mcr_interrupt"],
            "mcr3_state.screen_update_mcr3": methods["screen_update_mcr3"],
            "mcr3_state.mcr3_update_sprites": methods["mcr3_update_sprites"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_mcr_paletteram9_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
            }
            function method_mcr_set_color(runtime, index, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_palette.set_pen_color"] ? __l["m_palette.set_pen_color"](index, (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(index, (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (__l["pal3bit"] ? __l["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) ?? 0) : 0);
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (__l["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
            }
            return {
                "mcr_paletteram9_w": method_mcr_paletteram9_w,
                "mcr_set_color": method_mcr_set_color,
                "mcr3_videoram_w": method_mcr3_videoram_w
            };
        })();
        return {
            "mcr_state.mcr_set_color": methods["mcr_set_color"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_flip", "m_ctc.trg2", "m_ctc.trg3", "m_gfxdecode.gfx", "m_palette.set_pen_color", "m_screen.priority", "m_sounds_good.reset_write", "m_sounds_good.write", "mark_tile_dirty", "pal3bit", "priority", "screen.priority", "set", "set_flip", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
