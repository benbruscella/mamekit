// GENERATED executable machine composition from src/mame/capcom/gunsmoke.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gunsmoke');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_protection_r(runtime, offset) {
                const members = runtime.members;
                return ([255, 0, 0][(((offset) % 3) + 3) % 3] ?? 0);
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_layer_w(runtime, data) {
                const members = runtime.members;
                members.m_sprite3bank = ((((data) & (7))) & 0xff);
                members.m_bgon = ((((data) & (16))) & 0xff);
                members.m_objon = ((((data) & (32))) & 0xff);
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index);
                let code = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((attr) & (224))) << (2)));
                let color = ((attr) & (31));
                tileinfo.group = color;
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_scrollx = members.m_scrollx ?? runtime.member("m_scrollx");
                const h_m_scrolly = members.m_scrolly ?? runtime.member("m_scrolly");
                (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, runtime.add(runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1))))) ?? 0));
                (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, runtime.readIndex(h_m_scrolly, 0)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, runtime.readIndex(h_m_scrolly, 0)) ?? 0) : (runtime.calls["set_scrolly"]?.(0, runtime.readIndex(h_m_scrolly, 0)) ?? 0));
                if ((members.m_bgon ?? runtime.member("m_bgon"))) {
                    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                }
                else {
                    (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0));
                }
                if ((members.m_objon ?? runtime.member("m_objon"))) {
                    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                }
                if ((members.m_chon ?? runtime.member("m_chon"))) {
                    (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                }
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                let spriteram = (runtime.calls["m_spriteram.buffer"] ? runtime.calls["m_spriteram.buffer"]() : (members.m_spriteram) != null ? (typeof (runtime.dereference(members.m_spriteram)).buffer === 'function' ? (runtime.dereference(members.m_spriteram)).buffer() : typeof (runtime.dereference(members.m_spriteram)).buffer === 'number' || typeof (runtime.dereference(members.m_spriteram)).buffer === 'boolean' ? (runtime.dereference(members.m_spriteram)).buffer : runtime.container(members.m_spriteram, "buffer")) : (runtime.calls["buffer"]?.() ?? 0));
                for (let offs = (((members.m_spriteram).length) - (32)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (32))) {
                    let attr = runtime.readIndex(spriteram, ((offs) + (1)));
                    let bank = ((((attr) & (192))) >>> (6));
                    let code = runtime.readIndex(spriteram, offs);
                    let color = ((attr) & (15));
                    let flipx = 0;
                    let flipy = ((attr) & (16));
                    let sx = ((runtime.readIndex(spriteram, ((offs) + (3)))) - (((((attr) & (32))) << (3))));
                    let sy = runtime.readIndex(spriteram, ((offs) + (2)));
                    if (((Number(bank) === Number(3)) ? 1 : 0)) {
                        bank = ((bank) + ((members.m_sprite3bank ?? runtime.member("m_sprite3bank"))));
                    }
                    code = ((code) + (((256) * (bank))));
                    if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                        sx = ((240) - (sx));
                        sy = ((240) - (sy));
                        flipx = ((flipx) ? 0 : 1);
                        flipy = ((flipy) ? 0 : 1);
                    }
                    ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : (runtime.calls["gfx"]?.(2) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0) ?? 0);
                }
            }
            return {
                "protection_r": method_protection_r,
                "videoram_w": method_videoram_w,
                "colorram_w": method_colorram_w,
                "layer_w": method_layer_w,
                "get_fg_tile_info": method_get_fg_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "gunsmoke_state.protection_r": methods["protection_r"],
            "gunsmoke_state.videoram_w": methods["videoram_w"],
            "gunsmoke_state.colorram_w": methods["colorram_w"],
            "gunsmoke_state.layer_w": methods["layer_w"],
            "gunsmoke_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "gunsmoke_state.screen_update": methods["screen_update"],
            "gunsmoke_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
