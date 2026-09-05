// GENERATED executable machine composition from src/mame/irem/travrusa.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'travrusa');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](runtime.divide(offset, 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.divide(offset, 2)) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(runtime.divide(offset, 2)) ?? 0));
            }
            function method_scroll_x_low_w(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 0, data);
                (runtime.overrides["set_scroll"] ? runtime.overrides["set_scroll"]() : method_set_scroll(runtime));
            }
            function method_set_scroll(runtime) {
                const members = runtime.members;
                for (let i = 0; ((Number(i) <= Number(2)) ? 1 : 0); i = ((i) + (1))) {
                    (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](i, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(i, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1))))) ?? 0) : (runtime.calls["set_scrollx"]?.(i, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1))))) ?? 0));
                }
                (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](3, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(3, 0) ?? 0) : (runtime.calls["set_scrollx"]?.(3, 0) ?? 0));
            }
            function method_scroll_x_high_w(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 1, data);
                (runtime.overrides["set_scroll"] ? runtime.overrides["set_scroll"]() : method_set_scroll(runtime));
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), runtime.add(((2) * (tile_index)), 1))) & 0xff);
                let flags = (runtime.calls["TILE_FLIPXY"] ? runtime.calls["TILE_FLIPXY"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPXY", ((((attr) & (48))) >>> (4))));
                tileinfo.group = ((((Number(((attr) & (15))) === Number(15)) ? 1 : 0)) ? (1) : (0));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((2) * (tile_index))), ((((attr) & (192))) << (2))), ((attr) & (15)), flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((2) * (tile_index))), ((((attr) & (192))) << (2))), ((attr) & (15)), flags) ?? 0) : (runtime.calls["set"]?.(0, runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((2) * (tile_index))), ((((attr) & (192))) << (2))), ((attr) & (15)), flags) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 32, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 32, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 32, 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 16, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 16, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 16, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let spritevisiblearea = Object.assign(Object.create(Object.getPrototypeOf((runtime.calls["rectangle"] ? runtime.calls["rectangle"](((1) * (8)), ((((31) * (8))) - (1)), ((0) * (8)), ((((24) * (8))) - (1))) : runtime.macro("rectangle", ((1) * (8)), ((((31) * (8))) - (1)), ((0) * (8)), ((((24) * (8))) - (1)))))), (runtime.calls["rectangle"] ? runtime.calls["rectangle"](((1) * (8)), ((((31) * (8))) - (1)), ((0) * (8)), ((((24) * (8))) - (1))) : runtime.macro("rectangle", ((1) * (8)), ((((31) * (8))) - (1)), ((0) * (8)), ((((24) * (8))) - (1)))));
                let spritevisibleareaflip = Object.assign(Object.create(Object.getPrototypeOf((runtime.calls["rectangle"] ? runtime.calls["rectangle"](((1) * (8)), ((((31) * (8))) - (1)), ((8) * (8)), ((((32) * (8))) - (1))) : runtime.macro("rectangle", ((1) * (8)), ((((31) * (8))) - (1)), ((8) * (8)), ((((32) * (8))) - (1)))))), (runtime.calls["rectangle"] ? runtime.calls["rectangle"](((1) * (8)), ((((31) * (8))) - (1)), ((8) * (8)), ((((32) * (8))) - (1))) : runtime.macro("rectangle", ((1) * (8)), ((((31) * (8))) - (1)), ((8) * (8)), ((((32) * (8))) - (1)))));
                let clip = Object.assign(Object.create(Object.getPrototypeOf(cliprect)), cliprect);
                if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                    clip = runtime.andAssign(clip, spritevisibleareaflip);
                }
                else {
                    clip = runtime.andAssign(clip, spritevisiblearea);
                }
                for (let offs = (((members.m_spriteram).length) - (4)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
                    let sx = ((((runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (3))), 8)) & (255))) - (8));
                    let sy = ((240) - (runtime.readIndex(h_m_spriteram, offs)));
                    let code = runtime.readIndex(h_m_spriteram, ((offs) + (2)));
                    let attr = runtime.readIndex(h_m_spriteram, ((offs) + (1)));
                    let flipx = ((attr) & (64));
                    let flipy = ((attr) & (128));
                    if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                        sx = ((240) - (sx));
                        sy = ((240) - (sy));
                        flipx = ((flipx) ? 0 : 1);
                        flipy = ((flipy) ? 0 : 1);
                    }
                    ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transpen?.(bitmap, clip, code, ((attr) & (15)), flipx, flipy, sx, sy, 0) ?? 0);
                }
            }
            return {
                "videoram_w": method_videoram_w,
                "scroll_x_low_w": method_scroll_x_low_w,
                "set_scroll": method_set_scroll,
                "scroll_x_high_w": method_scroll_x_high_w,
                "get_tile_info": method_get_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "travrusa_state.videoram_w": methods["videoram_w"],
            "travrusa_state.scroll_x_low_w": methods["scroll_x_low_w"],
            "travrusa_state.set_scroll": methods["set_scroll"],
            "travrusa_state.scroll_x_high_w": methods["scroll_x_high_w"],
            "travrusa_state.get_tile_info": methods["get_tile_info"],
            "travrusa_state.screen_update": methods["screen_update"],
            "travrusa_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
