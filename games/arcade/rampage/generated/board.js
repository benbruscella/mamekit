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
                (runtime.calls["m_sounds_good.reset_write"] ? runtime.calls["m_sounds_good.reset_write"]((((((~data)) >>> (5))) & (1))) : (members.m_sounds_good) != null ? ((runtime.dereference(members.m_sounds_good)).reset_write?.((((((~data)) >>> (5))) & (1))) ?? 0) : (runtime.calls["reset_write"]?.((((((~data)) >>> (5))) & (1))) ?? 0));
                (runtime.calls["m_sounds_good.write"] ? runtime.calls["m_sounds_good.write"](data) : (members.m_sounds_good) != null ? ((runtime.dereference(members.m_sounds_good)).write?.(data) ?? 0) : (runtime.calls["write"]?.(data) ?? 0));
            }
            function method_mcr_paletteram9_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
            }
            function method_mcr_set_color(runtime, index, data) {
                const members = runtime.members;
                (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](index, (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(index, (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) ?? 0) : (runtime.calls["set_pen_color"]?.(index, (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) ?? 0));
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
            }
            function method_mcrmono_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let data = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((tile_index) * (2)))) | (((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), runtime.add(((tile_index) * (2)), 1))) << (8))));
                let code = ((((data) & (1023))) | (((((data) >>> (4))) & (1024))));
                let color = ((((((data) >>> (12))) & (3))) ^ (3));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((data) >>> (10))) : runtime.macro("TILE_FLIPYX", ((data) >>> (10))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((data) >>> (10))) : runtime.macro("TILE_FLIPYX", ((data) >>> (10))))) ?? 0) : (runtime.calls["set"]?.(0, code, color, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((data) >>> (10))) : runtime.macro("TILE_FLIPYX", ((data) >>> (10))))) ?? 0));
            }
            function method_mcr_interrupt(runtime, param) {
                const members = runtime.members;
                let scanline = param;
                if ((((((Number(scanline) === Number(0)) ? 1 : 0)) || (((Number(scanline) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.calls["m_ctc.trg2"] ? runtime.calls["m_ctc.trg2"](1) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg2?.(1) ?? 0) : (runtime.calls["trg2"]?.(1) ?? 0));
                    (runtime.calls["m_ctc.trg2"] ? runtime.calls["m_ctc.trg2"](0) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg2?.(0) ?? 0) : (runtime.calls["trg2"]?.(0) ?? 0));
                }
                if (((Number(scanline) === Number(0)) ? 1 : 0)) {
                    (runtime.calls["m_ctc.trg3"] ? runtime.calls["m_ctc.trg3"](1) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg3?.(1) ?? 0) : (runtime.calls["trg3"]?.(1) ?? 0));
                    (runtime.calls["m_ctc.trg3"] ? runtime.calls["m_ctc.trg3"](0) : (members.m_ctc) != null ? ((runtime.dereference(members.m_ctc)).trg3?.(0) ?? 0) : (runtime.calls["trg3"]?.(0) ?? 0));
                }
            }
            function method_screen_update_mcr3(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["m_bg_tilemap.set_flip"] ? runtime.calls["m_bg_tilemap.set_flip"]((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (((1) | (2))) : (0))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_flip?.((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (((1) | (2))) : (0))) ?? 0) : (runtime.calls["set_flip"]?.((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (((1) | (2))) : (0))) ?? 0));
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                (runtime.overrides["mcr3_update_sprites"] ? runtime.overrides["mcr3_update_sprites"](screen, bitmap, cliprect, 3, 0, 0, 0, 1) : method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, 3, 0, 0, 0, 1));
                return 0;
            }
            function method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, color_mask, code_xor, dx, dy, interlaced) {
                const members = runtime.members;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                ((runtime.dereference((runtime.calls["m_screen.priority"] ? runtime.calls["m_screen.priority"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).priority === 'function' ? (runtime.dereference(members.m_screen)).priority() : typeof (runtime.dereference(members.m_screen)).priority === 'number' || typeof (runtime.dereference(members.m_screen)).priority === 'boolean' ? (runtime.dereference(members.m_screen)).priority : runtime.container(members.m_screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)))).fill?.(1, cliprect) ?? 0);
                for (let offs = (((members.m_spriteram).length) - (4)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
                    if (((Number(runtime.readIndex(h_m_spriteram, offs)) === Number(0)) ? 1 : 0)) {
                        continue;
                    }
                    let flags = runtime.readIndex(h_m_spriteram, ((offs) + (1)));
                    let code = runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((256) * (((((flags) >>> (3))) & (1)))));
                    let color = (((~flags)) & (color_mask));
                    let flipx = ((flags) & (16));
                    let flipy = ((flags) & (32));
                    let sx = ((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) - (3))) * (2));
                    let sy = ((241) - (runtime.readIndex(h_m_spriteram, offs)));
                    if (((Number(interlaced) === Number(1)) ? 1 : 0)) {
                        sy = ((sy) * (2));
                    }
                    code = ((code) ^ (code_xor));
                    sx = ((sx) + (dx));
                    sy = ((sy) + (dy));
                    if ((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? 0 : 1)) {
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).prio_transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 257) ?? 0);
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).prio_transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 2, 65279) ?? 0);
                    }
                    else {
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).prio_transmask?.(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 257) ?? 0);
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).prio_transmask?.(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 2, 65279) ?? 0);
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
                (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](index, (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(index, (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) ?? 0) : (runtime.calls["set_pen_color"]?.(index, (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (6))) : runtime.macro("pal3bit", ((data) >>> (6)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (0))) : runtime.macro("pal3bit", ((data) >>> (0)))), (runtime.calls["pal3bit"] ? runtime.calls["pal3bit"](((data) >>> (3))) : runtime.macro("pal3bit", ((data) >>> (3))))) ?? 0));
            }
            function method_mcr3_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
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
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
