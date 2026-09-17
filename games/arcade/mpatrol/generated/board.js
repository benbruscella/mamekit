// GENERATED executable machine composition from src/mame/irem/m52.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mpatrol');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_tx_tilemap.mark_tile_dirty"] ? __l["m_tx_tilemap.mark_tile_dirty"](offset) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__l["m_tx_tilemap.mark_tile_dirty"] ? __l["m_tx_tilemap.mark_tile_dirty"](offset) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_protection_r(runtime) {
                const members = runtime.members;
                let popcount = ((0) | 0);
                for (let temp = ((((runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0)) & (127))) | 0); ((Number(temp) !== Number(0)) ? 1 : 0); temp = ((((temp) >>> (1))) | 0)) {
                    popcount = ((((popcount) + (((temp) & (1))))) | 0);
                }
                return ((popcount) ^ (((runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0)) >>> (7))));
            }
            function method_scroll_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_tx_tilemap.set_scrollx"] ? __l["m_tx_tilemap.set_scrollx"](0, 255) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).set_scrollx?.(0, 255) ?? 0) : (__l["set_scrollx"]?.(0, 255) ?? 0));
                (__l["m_tx_tilemap.set_scrollx"] ? __l["m_tx_tilemap.set_scrollx"](1, 255) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).set_scrollx?.(1, 255) ?? 0) : (__l["set_scrollx"]?.(1, 255) ?? 0));
                (__l["m_tx_tilemap.set_scrollx"] ? __l["m_tx_tilemap.set_scrollx"](2, 255) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).set_scrollx?.(2, 255) ?? 0) : (__l["set_scrollx"]?.(2, 255) ?? 0));
                (__l["m_tx_tilemap.set_scrollx"] ? __l["m_tx_tilemap.set_scrollx"](3, (-((data) + (1)))) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).set_scrollx?.(3, (-((data) + (1)))) ?? 0) : (__l["set_scrollx"]?.(3, (-((data) + (1)))) ?? 0));
            }
            function method_bgxpos_w_0(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgxpos"), 0, data);
            }
            function method_bgypos_w_0(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgypos"), 0, data);
            }
            function method_bgxpos_w_1(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgxpos"), 1, data);
            }
            function method_bgypos_w_1(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgypos"), 1, data);
            }
            function method_bgcontrol_w(runtime, data) {
                const members = runtime.members;
                members.m_bgcontrol = ((data) & 0xff);
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let video = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & 0xff);
                let color = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & 0xff);
                let flag = ((0) | 0);
                let code = ((0) | 0);
                code = ((video) | 0);
                if (((color) & (128))) {
                    code = ((((code) | (256))) | 0);
                }
                if (((Number(runtime.divide(tile_index, 32)) <= Number(6)) ? 1 : 0)) {
                    flag = ((((flag) | (16))) | 0);
                }
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, ((color) & (127)), flag) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, ((color) & (127)), flag) ?? 0) : (__l["set"]?.(0, code, ((color) & (127)), flag) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let paldata = (__l["m_sp_palette.pens"] ? __l["m_sp_palette.pens"]() : (members.m_sp_palette) != null ? (typeof (runtime.dereference(members.m_sp_palette)).pens === 'function' ? (runtime.dereference(members.m_sp_palette)).pens() : typeof (runtime.dereference(members.m_sp_palette)).pens === 'number' || typeof (runtime.dereference(members.m_sp_palette)).pens === 'boolean' ? (runtime.dereference(members.m_sp_palette)).pens : runtime.container(members.m_sp_palette, "pens")) : 0);
                (__l["bitmap.fill"] ? __l["bitmap.fill"](runtime.readIndex(paldata, 0), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(runtime.readIndex(paldata, 0), cliprect) ?? 0) : (__l["fill"]?.(runtime.readIndex(paldata, 0), cliprect) ?? 0));
                if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (32))) ? 0 : 1)) {
                    if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (16))) ? 0 : 1)) {
                        (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 1), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 1), 0) : method_draw_background(runtime, bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 1), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 1), 0));
                    }
                    if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (2))) ? 0 : 1)) {
                        (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 1) : method_draw_background(runtime, bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 1));
                    }
                    else {
                        if ((((((members.m_bgcontrol ?? runtime.member("m_bgcontrol"))) & (4))) ? 0 : 1)) {
                            (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 2) : method_draw_background(runtime, bitmap, cliprect, runtime.readIndex((members.m_bgxpos ?? runtime.member("m_bgxpos")), 0), runtime.readIndex((members.m_bgypos ?? runtime.member("m_bgypos")), 0), 2));
                        }
                    }
                }
                (__l["m_tx_tilemap.set_flip"] ? __l["m_tx_tilemap.set_flip"]((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (((1) | (2))) : (0))) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).set_flip?.((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (((1) | (2))) : (0))) ?? 0) : (__l["set_flip"]?.((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (((1) | (2))) : (0))) ?? 0));
                (__l["m_tx_tilemap.draw"] ? __l["m_tx_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                for (let offs = ((60) | 0); ((Number(offs) <= Number((members.m_spritelimit ?? runtime.member("m_spritelimit")))) ? 1 : 0); offs = ((((offs) + (64))) | 0)) {
                    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, offs) : method_draw_sprites(runtime, bitmap, cliprect, offs));
                }
                return 0;
            }
            function method_draw_background(runtime, bitmap, cliprect, xpos, ypos, image) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let rect = Object.assign(Object.create(Object.getPrototypeOf((__l["rectangle"] ? __l["rectangle"]() : runtime.macro("rectangle")))), (__l["rectangle"] ? __l["rectangle"]() : runtime.macro("rectangle")));
                let visarea = (__l["m_screen.visible_area"] ? __l["m_screen.visible_area"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).visible_area === 'function' ? (runtime.dereference(members.m_screen)).visible_area() : typeof (runtime.dereference(members.m_screen)).visible_area === 'number' || typeof (runtime.dereference(members.m_screen)).visible_area === 'boolean' ? (runtime.dereference(members.m_screen)).visible_area : runtime.container(members.m_screen, "visible_area")) : 0);
                let paldata = (__l["m_bg_palette.pens"] ? __l["m_bg_palette.pens"]() : (members.m_bg_palette) != null ? (typeof (runtime.dereference(members.m_bg_palette)).pens === 'function' ? (runtime.dereference(members.m_bg_palette)).pens() : typeof (runtime.dereference(members.m_bg_palette)).pens === 'number' || typeof (runtime.dereference(members.m_bg_palette)).pens === 'boolean' ? (runtime.dereference(members.m_bg_palette)).pens : runtime.container(members.m_bg_palette, "pens")) : 0);
                let BGHEIGHT = ((128) & 0xff);
                if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                    xpos = ((((264) - (xpos))) | 0);
                    ypos = ((((((264) - (ypos))) - (BGHEIGHT))) | 0);
                }
                xpos = ((((xpos) + (124))) | 0);
                ypos = ((((ypos) + (16))) | 0);
                ((runtime.dereference((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0))).transpen?.(bitmap, cliprect, 0, 0, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), xpos, ypos, 0) ?? 0);
                ((runtime.dereference((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0))).transpen?.(bitmap, cliprect, 0, 0, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), ((xpos) - (256)), ypos, 0) ?? 0);
                if ((members.m_do_bg_fills ?? runtime.member("m_do_bg_fills"))) {
                    rect.min_x = visarea.min_x;
                    rect.max_x = visarea.max_x;
                    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                        rect.min_y = ((ypos) - (BGHEIGHT));
                        rect.max_y = ((ypos) - (1));
                    }
                    else {
                        rect.min_y = ((ypos) + (BGHEIGHT));
                        rect.max_y = ((((ypos) + (((2) * (BGHEIGHT))))) - (1));
                    }
                    (__l["bitmap.fill"] ? __l["bitmap.fill"](runtime.readIndex(paldata, runtime.add(((runtime.dereference((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0))).colorbase?.() ?? runtime.container((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0), "colorbase")), 3)), rect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(runtime.readIndex(paldata, runtime.add(((runtime.dereference((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0))).colorbase?.() ?? runtime.container((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0), "colorbase")), 3)), rect) ?? 0) : (__l["fill"]?.(runtime.readIndex(paldata, runtime.add(((runtime.dereference((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0))).colorbase?.() ?? runtime.container((__l["m_bg_gfxdecode.gfx"] ? __l["m_bg_gfxdecode.gfx"](image) : (members.m_bg_gfxdecode) != null ? ((runtime.dereference(members.m_bg_gfxdecode)).gfx?.(image) ?? 0) : 0), "colorbase")), 3)), rect) ?? 0));
                }
            }
            function method_draw_sprites(runtime, bitmap, cliprect, initoffs) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                for (let offs = ((initoffs) | 0); ((Number(offs) >= Number(((initoffs) & (192)))) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    let sy = ((((257) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
                    let color = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (63))) | 0);
                    let flipx = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (64))) | 0);
                    let flipy = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) & (128))) | 0);
                    let code = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
                    let sx = ((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) | 0);
                    let clip = Object.assign(Object.create(Object.getPrototypeOf(cliprect)), cliprect);
                    if (((((offs) & (128))) ? 0 : 1)) {
                        clip.min_y = 0;
                        clip.max_y = 127;
                    }
                    else {
                        clip.min_y = 128;
                        clip.max_y = 255;
                    }
                    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                        let temp = ((clip.min_y) | 0);
                        clip.min_y = ((255) - (clip.max_y));
                        clip.max_y = ((255) - (temp));
                        flipx = ((((flipx) ? 0 : 1)) | 0);
                        flipy = ((((flipy) ? 0 : 1)) | 0);
                        sx = ((((238) - (sx))) | 0);
                        sy = ((((282) - (sy))) | 0);
                    }
                    sx = ((((sx) + (129))) | 0);
                    clip = cliprect;
                    ((runtime.dereference((__l["m_sp_gfxdecode.gfx"] ? __l["m_sp_gfxdecode.gfx"](0) : (members.m_sp_gfxdecode) != null ? ((runtime.dereference(members.m_sp_gfxdecode)).gfx?.(0) ?? 0) : 0))).transmask?.(bitmap, clip, code, color, flipx, flipy, sx, sy, (__l["m_sp_palette.transpen_mask"] ? __l["m_sp_palette.transpen_mask"](runtime.dereference((__l["m_sp_gfxdecode.gfx"] ? __l["m_sp_gfxdecode.gfx"](0) : (members.m_sp_gfxdecode) != null ? ((runtime.dereference(members.m_sp_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) : (members.m_sp_palette) != null ? ((runtime.dereference(members.m_sp_palette)).transpen_mask?.(runtime.dereference((__l["m_sp_gfxdecode.gfx"] ? __l["m_sp_gfxdecode.gfx"](0) : (members.m_sp_gfxdecode) != null ? ((runtime.dereference(members.m_sp_gfxdecode)).gfx?.(0) ?? 0) : 0)), color, 0) ?? 0) : 0)) ?? 0);
                }
            }
            return {
                "videoram_w": method_videoram_w,
                "colorram_w": method_colorram_w,
                "protection_r": method_protection_r,
                "scroll_w": method_scroll_w,
                "bgxpos_w_0": method_bgxpos_w_0,
                "bgypos_w_0": method_bgypos_w_0,
                "bgxpos_w_1": method_bgxpos_w_1,
                "bgypos_w_1": method_bgypos_w_1,
                "bgcontrol_w": method_bgcontrol_w,
                "get_tile_info": method_get_tile_info,
                "screen_update": method_screen_update,
                "draw_background": method_draw_background,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "m52_state.videoram_w": methods["videoram_w"],
            "m52_state.colorram_w": methods["colorram_w"],
            "m52_state.protection_r": methods["protection_r"],
            "m52_state.scroll_w": methods["scroll_w"],
            "m52_state.bgxpos_w_0": methods["bgxpos_w_0"],
            "m52_state.bgypos_w_0": methods["bgypos_w_0"],
            "m52_state.bgxpos_w_1": methods["bgxpos_w_1"],
            "m52_state.bgypos_w_1": methods["bgypos_w_1"],
            "m52_state.bgcontrol_w": methods["bgcontrol_w"],
            "m52_state.get_tile_info": methods["get_tile_info"],
            "m52_state.screen_update": methods["screen_update"],
            "m52_state.draw_background": methods["draw_background"],
            "m52_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "draw", "fill", "flip_screen", "m_bg_gfxdecode.gfx", "m_bg_palette.pens", "m_screen.visible_area", "m_sp_gfxdecode.gfx", "m_sp_palette.pens", "m_sp_palette.transpen_mask", "m_tx_tilemap.draw", "m_tx_tilemap.mark_tile_dirty", "m_tx_tilemap.set_flip", "m_tx_tilemap.set_scrollx", "mark_tile_dirty", "rectangle", "set", "set_flip", "set_scrollx", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
