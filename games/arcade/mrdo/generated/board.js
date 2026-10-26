// GENERATED executable machine composition from src/mame/universal/mrdo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mrdo');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_bgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(((offset) & (1023)));
            }
            function method_fgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
                (__l["m_fg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(((offset) & (1023)));
                (runtime.overrides["protection_w"] ? runtime.overrides["protection_w"](data) : method_protection_w(runtime, data));
            }
            function method_protection_w(runtime, data) {
                const members = runtime.members;
            }
            function method_scrollx_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_bg_tilemap.set_scrollx"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __l["set_scrollx"]))(0, data);
            }
            function method_scrolly_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
                    (__l["m_bg_tilemap.set_scrolly"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __l["set_scrolly"]))(0, ((((256) - (data))) & (255)));
                }
                else {
                    (__l["m_bg_tilemap.set_scrolly"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __l["set_scrolly"]))(0, data);
                }
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let attr = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index)) & 0xff);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (1024))), ((((attr) & (128))) << (1))), ((attr) & (63)), ((((attr) & (64))) ? (16) : (0)));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let attr = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index)) & 0xff);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (1024))), ((((attr) & (128))) << (1))), ((attr) & (63)), ((((attr) & (64))) ? (16) : (0)));
            }
            function method_screen_update_mrdo(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(0, cliprect);
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                (__l["m_fg_tilemap.draw"] ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                for (let offs = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
                    if (((Number(runtime.readIndex(h_m_spriteram, ((offs) + (1)))) !== Number(0)) ? 1 : 0)) {
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2))).transpen?.(bitmap, cliprect, runtime.readIndex(h_m_spriteram, offs), ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (15)), ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (16)), ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (32)), runtime.readIndex(h_m_spriteram, ((offs) + (3))), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (1))))), 0) ?? 0);
                    }
                }
            }
            return {
                "bgvideoram_w": method_bgvideoram_w,
                "fgvideoram_w": method_fgvideoram_w,
                "protection_w": method_protection_w,
                "scrollx_w": method_scrollx_w,
                "scrolly_w": method_scrolly_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "get_fg_tile_info": method_get_fg_tile_info,
                "screen_update_mrdo": method_screen_update_mrdo,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "mrdo_state.bgvideoram_w": methods["bgvideoram_w"],
            "mrdo_state.fgvideoram_w": methods["fgvideoram_w"],
            "mrdo_state.protection_w": methods["protection_w"],
            "mrdo_state.scrollx_w": methods["scrollx_w"],
            "mrdo_state.scrolly_w": methods["scrolly_w"],
            "mrdo_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "mrdo_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "mrdo_state.screen_update_mrdo": methods["screen_update_mrdo"],
            "mrdo_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "draw", "fill", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "mark_tile_dirty", "set", "set_scrollx", "set_scrolly", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
