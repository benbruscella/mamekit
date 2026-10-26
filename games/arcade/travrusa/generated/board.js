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
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(runtime.divide(offset, 2));
            }
            function method_scroll_x_low_w(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 0, data);
                (runtime.overrides["set_scroll"] ? runtime.overrides["set_scroll"]() : method_set_scroll(runtime));
            }
            function method_set_scroll(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                for (let i = ((0) | 0); ((Number(i) <= Number(2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(i, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1)))));
                }
                (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(3, 0);
            }
            function method_scroll_x_high_w(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollx"), 1, data);
                (runtime.overrides["set_scroll"] ? runtime.overrides["set_scroll"]() : method_set_scroll(runtime));
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let attr = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), runtime.add(((2) * (tile_index)), 1))) & 0xff);
                let flags = (((__l["TILE_FLIPXY"] ? __l["TILE_FLIPXY"](runtime.shiftRight(((attr) & (48)), 4)) : runtime.macro("TILE_FLIPXY", runtime.shiftRight(((attr) & (48)), 4)))) | 0);
                tileinfo.group = ((((Number(((attr) & (15))) === Number(15)) ? 1 : 0)) ? (1) : (0));
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((2) * (tile_index))), ((((attr) & (192))) << (2))), ((attr) & (15)), flags);
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 32, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 16, 0);
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                let spritevisiblearea = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__l["rectangle"] ? __l["rectangle"](8, 247, 0, 191) : runtime.macro("rectangle", 8, 247, 0, 191)));
                let spritevisibleareaflip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__l["rectangle"] ? __l["rectangle"](8, 247, 64, 255) : runtime.macro("rectangle", 8, 247, 64, 255)));
                let clip = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
                if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                    clip = runtime.andAssign(clip, spritevisibleareaflip);
                }
                else {
                    clip = runtime.andAssign(clip, spritevisiblearea);
                }
                for (let offs = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    let sx = ((((((runtime.add(runtime.readIndex(h_m_spriteram, ((offs) + (3))), 8)) & (255))) - (8))) | 0);
                    let sy = ((((240) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
                    let code = ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) | 0);
                    let attr = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
                    let flipx = ((((attr) & (64))) | 0);
                    let flipy = ((((attr) & (128))) | 0);
                    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                        sx = ((((240) - (sx))) | 0);
                        sy = ((((240) - (sy))) | 0);
                        flipx = ((((flipx) ? 0 : 1)) | 0);
                        flipy = ((((flipy) ? 0 : 1)) | 0);
                    }
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).transpen?.(bitmap, clip, code, ((attr) & (15)), flipx, flipy, sx, sy, 0) ?? 0);
                }
            }
            function method_soundlatch_r(runtime) {
                const members = runtime.members;
                return (members.m_soundlatch ?? runtime.member("m_soundlatch"));
            }
            function method_m6803_port1_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (8))) {
                    return (__l["m_ay_45M.data_r"] ?? runtime.memberCall(members.m_ay_45M, "data_r", 0, undefined))();
                }
                if ((((members.m_port2 ?? runtime.member("m_port2"))) & (16))) {
                    return (__l["m_ay_45L.data_r"] ?? runtime.memberCall(members.m_ay_45L, "data_r", 0, undefined))();
                }
                return 255;
            }
            function method_m6803_port2_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            return {
                "videoram_w": method_videoram_w,
                "scroll_x_low_w": method_scroll_x_low_w,
                "set_scroll": method_set_scroll,
                "scroll_x_high_w": method_scroll_x_high_w,
                "get_tile_info": method_get_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites,
                "soundlatch_r": method_soundlatch_r,
                "m6803_port1_r": method_m6803_port1_r,
                "m6803_port2_r": method_m6803_port2_r
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
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPXY", "draw", "flip_screen", "m_ay_45L.data_r", "m_ay_45M.data_r", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_gfxdecode.gfx", "mark_tile_dirty", "rectangle", "set", "set_scrollx", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
