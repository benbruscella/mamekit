// GENERATED executable machine composition from src/mame/konami/gberet.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gberet');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_scroll_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_scrollram ?? runtime.member("m_scrollram")), ((offset) & (63)));
            }
            function method_scroll_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollram"), ((offset) & (63)), data);
            }
            function method_ctrl_w(runtime, offset, data) {
                const members = runtime.members;
                offset = runtime.andAssign(offset, 7);
                if (((Number(offset) === Number(4)) ? 1 : 0)) {
                    if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (1)) & 1)) {
                        (runtime.calls["m_irq_cb"] ? runtime.calls["m_irq_cb"](0) : runtime.macro("m_irq_cb", 0));
                    }
                    if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (2)) & 1)) {
                        (runtime.calls["m_firq_cb"] ? runtime.calls["m_firq_cb"](0) : runtime.macro("m_firq_cb", 0));
                    }
                    if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (0)) & 1)) {
                        (runtime.calls["m_nmi_cb"] ? runtime.calls["m_nmi_cb"](0) : runtime.macro("m_nmi_cb", 0));
                    }
                    if ((((((data) ^ (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (3)) & 1)) {
                        members.m_flipscreen = (((data) >>> (3)) & 1);
                        (runtime.calls["m_flipscreen_cb"] ? runtime.calls["m_flipscreen_cb"]((((data) >>> (3)) & 1)) : runtime.macro("m_flipscreen_cb", (((data) >>> (3)) & 1)));
                    }
                }
                runtime.writeIndex(runtime.writableMember("m_ctrlram"), offset, data);
            }
            function method_sound_w(runtime, data) {
                const members = runtime.members;
                const h_m_soundlatch = members.m_soundlatch ?? runtime.member("m_soundlatch");
                (runtime.calls["m_sn.write"] ? runtime.calls["m_sn.write"](runtime.dereference(h_m_soundlatch)) : (members.m_sn) != null ? ((runtime.dereference(members.m_sn)).write?.(runtime.dereference(h_m_soundlatch)) ?? 0) : (runtime.calls["write"]?.(runtime.dereference(h_m_soundlatch)) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                for (let i = 0; ((Number(i) < Number(32)) ? 1 : 0); i = ((i) + (1))) {
                    (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](i, (((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](i) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(i) ?? 0) : (runtime.calls["scroll_r"]?.(i) ?? 0))) | ((((((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](((i) | (32))) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(((i) | (32))) ?? 0) : (runtime.calls["scroll_r"]?.(((i) | (32))) ?? 0))) & (1))) << (8))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(i, (((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](i) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(i) ?? 0) : (runtime.calls["scroll_r"]?.(i) ?? 0))) | ((((((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](((i) | (32))) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(((i) | (32))) ?? 0) : (runtime.calls["scroll_r"]?.(((i) | (32))) ?? 0))) & (1))) << (8))))) ?? 0) : (runtime.calls["set_scrollx"]?.(i, (((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](i) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(i) ?? 0) : (runtime.calls["scroll_r"]?.(i) ?? 0))) | ((((((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](((i) | (32))) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(((i) | (32))) ?? 0) : (runtime.calls["scroll_r"]?.(((i) | (32))) ?? 0))) & (1))) << (8))))) ?? 0));
                }
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, ((128) | (512)), 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, ((128) | (512)), 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, ((128) | (512)), 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_spriteram2 = members.m_spriteram2 ?? runtime.member("m_spriteram2");
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let sr = 0;
                if ((((runtime.calls["m_k005849.ctrl_r"] ? runtime.calls["m_k005849.ctrl_r"](3) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).ctrl_r?.(3) ?? 0) : (runtime.calls["ctrl_r"]?.(3) ?? 0))) & (8))) {
                    sr = h_m_spriteram2;
                }
                else {
                    sr = h_m_spriteram;
                }
                for (let offs = 0; ((Number(offs) < Number(192)) ? 1 : 0); offs = ((offs) + (4))) {
                    if (runtime.readIndex(sr, ((offs) + (3)))) {
                        let attr = runtime.readIndex(sr, ((offs) + (1)));
                        let code = runtime.add(runtime.readIndex(sr, ((offs) + (0))), ((((attr) & (64))) << (2)));
                        let color = ((attr) & (15));
                        let sx = ((runtime.readIndex(sr, ((offs) + (2)))) - (((2) * (((attr) & (128))))));
                        let sy = runtime.readIndex(sr, ((offs) + (3)));
                        let flipx = ((attr) & (16));
                        let flipy = ((attr) & (32));
                        if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                            sx = ((240) - (sx));
                            sy = ((240) - (sy));
                            flipx = ((flipx) ? 0 : 1);
                            flipy = ((flipy) ? 0 : 1);
                        }
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 0) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 0) ?? 0))) ?? 0);
                    }
                }
            }
            function method_ctrl_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), ((offset) & (7)));
            }
            return {
                "colorram_w": method_colorram_w,
                "videoram_w": method_videoram_w,
                "scroll_r": method_scroll_r,
                "scroll_w": method_scroll_w,
                "ctrl_w": method_ctrl_w,
                "sound_w": method_sound_w,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "ctrl_r": method_ctrl_r
            };
        })();
        return {
            "gberet_state.colorram_w": methods["colorram_w"],
            "gberet_state.videoram_w": methods["videoram_w"],
            "gberet_state.sound_w": methods["sound_w"],
            "gberet_state.screen_update": methods["screen_update"],
            "gberet_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_scroll_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_scrollram ?? runtime.member("m_scrollram")), ((offset) & (63)));
            }
            function method_scroll_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollram"), ((offset) & (63)), data);
            }
            function method_ctrl_w(runtime, offset, data) {
                const members = runtime.members;
                offset = runtime.andAssign(offset, 7);
                if (((Number(offset) === Number(4)) ? 1 : 0)) {
                    if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (1)) & 1)) {
                        (runtime.calls["m_irq_cb"] ? runtime.calls["m_irq_cb"](0) : runtime.macro("m_irq_cb", 0));
                    }
                    if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (2)) & 1)) {
                        (runtime.calls["m_firq_cb"] ? runtime.calls["m_firq_cb"](0) : runtime.macro("m_firq_cb", 0));
                    }
                    if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (0)) & 1)) {
                        (runtime.calls["m_nmi_cb"] ? runtime.calls["m_nmi_cb"](0) : runtime.macro("m_nmi_cb", 0));
                    }
                    if ((((((data) ^ (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (3)) & 1)) {
                        members.m_flipscreen = (((data) >>> (3)) & 1);
                        (runtime.calls["m_flipscreen_cb"] ? runtime.calls["m_flipscreen_cb"]((((data) >>> (3)) & 1)) : runtime.macro("m_flipscreen_cb", (((data) >>> (3)) & 1)));
                    }
                }
                runtime.writeIndex(runtime.writableMember("m_ctrlram"), offset, data);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index);
                let code = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((attr) & (64))) << (2)));
                let color = ((attr) & (15));
                let flags = (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))));
                tileinfo.group = color;
                tileinfo.category = ((((attr) & (128))) >>> (7));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (runtime.calls["set"]?.(0, code, color, flags) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                for (let i = 0; ((Number(i) < Number(32)) ? 1 : 0); i = ((i) + (1))) {
                    (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](i, (((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](i) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(i) ?? 0) : (runtime.calls["scroll_r"]?.(i) ?? 0))) | ((((((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](((i) | (32))) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(((i) | (32))) ?? 0) : (runtime.calls["scroll_r"]?.(((i) | (32))) ?? 0))) & (1))) << (8))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(i, (((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](i) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(i) ?? 0) : (runtime.calls["scroll_r"]?.(i) ?? 0))) | ((((((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](((i) | (32))) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(((i) | (32))) ?? 0) : (runtime.calls["scroll_r"]?.(((i) | (32))) ?? 0))) & (1))) << (8))))) ?? 0) : (runtime.calls["set_scrollx"]?.(i, (((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](i) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(i) ?? 0) : (runtime.calls["scroll_r"]?.(i) ?? 0))) | ((((((runtime.calls["m_k005849.scroll_r"] ? runtime.calls["m_k005849.scroll_r"](((i) | (32))) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).scroll_r?.(((i) | (32))) ?? 0) : (runtime.calls["scroll_r"]?.(((i) | (32))) ?? 0))) & (1))) << (8))))) ?? 0));
                }
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, ((128) | (512)), 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, ((128) | (512)), 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, ((128) | (512)), 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_spriteram2 = members.m_spriteram2 ?? runtime.member("m_spriteram2");
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let sr = 0;
                if ((((runtime.calls["m_k005849.ctrl_r"] ? runtime.calls["m_k005849.ctrl_r"](3) : (members.m_k005849) != null ? ((runtime.dereference(members.m_k005849)).ctrl_r?.(3) ?? 0) : (runtime.calls["ctrl_r"]?.(3) ?? 0))) & (8))) {
                    sr = h_m_spriteram2;
                }
                else {
                    sr = h_m_spriteram;
                }
                for (let offs = 0; ((Number(offs) < Number(192)) ? 1 : 0); offs = ((offs) + (4))) {
                    if (runtime.readIndex(sr, ((offs) + (3)))) {
                        let attr = runtime.readIndex(sr, ((offs) + (1)));
                        let code = runtime.add(runtime.readIndex(sr, ((offs) + (0))), ((((attr) & (64))) << (2)));
                        let color = ((attr) & (15));
                        let sx = ((runtime.readIndex(sr, ((offs) + (2)))) - (((2) * (((attr) & (128))))));
                        let sy = runtime.readIndex(sr, ((offs) + (3)));
                        let flipx = ((attr) & (16));
                        let flipy = ((attr) & (32));
                        if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                            sx = ((240) - (sx));
                            sy = ((240) - (sy));
                            flipx = ((flipx) ? 0 : 1);
                            flipy = ((flipy) ? 0 : 1);
                        }
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 0) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 0) ?? 0))) ?? 0);
                    }
                }
            }
            function method_ctrl_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), ((offset) & (7)));
            }
            return {
                "colorram_w": method_colorram_w,
                "videoram_w": method_videoram_w,
                "scroll_r": method_scroll_r,
                "scroll_w": method_scroll_w,
                "ctrl_w": method_ctrl_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "ctrl_r": method_ctrl_r
            };
        })();
        return {
            "gberet_base_state.get_bg_tile_info": methods["get_bg_tile_info"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
