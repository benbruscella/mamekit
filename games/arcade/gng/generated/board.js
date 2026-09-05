// GENERATED executable machine composition from src/mame/capcom/gng.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gng');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_fgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
                (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
            }
            function method_bgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
            }
            function method_bgscrollx_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrollx"), offset, data);
                (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, runtime.add(runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0), ((256) * (runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1))))) ?? 0));
            }
            function method_bgscrolly_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_scrolly"), offset, data);
                (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, runtime.add(runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 0), ((256) * (runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, runtime.add(runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 0), ((256) * (runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 1))))) ?? 0) : (runtime.calls["set_scrolly"]?.(0, runtime.add(runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 0), ((256) * (runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 1))))) ?? 0));
            }
            function method_bankswitch_w(runtime, data) {
                const members = runtime.members;
                if (((Number(data) === Number(4)) ? 1 : 0)) {
                    (runtime.calls["m_mainbank.set_entry"] ? runtime.calls["m_mainbank.set_entry"](4) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(4) ?? 0) : (runtime.calls["set_entry"]?.(4) ?? 0));
                }
                else {
                    (runtime.calls["m_mainbank.set_entry"] ? runtime.calls["m_mainbank.set_entry"](((data) & (3))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) & (3))) ?? 0) : (runtime.calls["set_entry"]?.(((data) & (3))) ?? 0));
                }
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (1024)))) & 0xff);
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (15)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (15)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))))) ?? 0) : (runtime.calls["set"]?.(0, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (15)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))))) ?? 0));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (1024)))) & 0xff);
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (7)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (7)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))))) ?? 0) : (runtime.calls["set"]?.(1, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (192))) << (2))), ((attr) & (7)), (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (48))) >>> (4))) : runtime.macro("TILE_FLIPYX", ((((attr) & (48))) >>> (4))))) ?? 0));
                tileinfo.group = ((((attr) & (8))) >>> (3));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 32, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 32, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 32, 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 16, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 16, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 16, 0) ?? 0));
                (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                let spriteram = (runtime.calls["m_spriteram.buffer"] ? runtime.calls["m_spriteram.buffer"]() : (members.m_spriteram) != null ? (typeof (runtime.dereference(members.m_spriteram)).buffer === 'function' ? (runtime.dereference(members.m_spriteram)).buffer() : typeof (runtime.dereference(members.m_spriteram)).buffer === 'number' || typeof (runtime.dereference(members.m_spriteram)).buffer === 'boolean' ? (runtime.dereference(members.m_spriteram)).buffer : runtime.container(members.m_spriteram, "buffer")) : (runtime.calls["buffer"]?.() ?? 0));
                let gfx = (runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : (runtime.calls["gfx"]?.(2) ?? 0));
                for (let offs = (((members.m_spriteram).length) - (4)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
                    let attributes = ((runtime.readIndex(spriteram, ((offs) + (1)))) & 0xff);
                    let sx = ((runtime.readIndex(spriteram, ((offs) + (3)))) - (((256) * (((attributes) & (1))))));
                    let sy = runtime.readIndex(spriteram, ((offs) + (2)));
                    let flipx = ((attributes) & (4));
                    let flipy = ((attributes) & (8));
                    if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                        sx = ((240) - (sx));
                        sy = ((240) - (sy));
                        flipx = ((flipx) ? 0 : 1);
                        flipy = ((flipy) ? 0 : 1);
                    }
                    (runtime.calls["gfx.transpen"] ? runtime.calls["gfx.transpen"](bitmap, cliprect, runtime.add(runtime.readIndex(spriteram, offs), ((((attributes) << (2))) & (768))), ((((attributes) >>> (4))) & (3)), flipx, flipy, sx, sy, 15) : (gfx) != null ? ((runtime.dereference(gfx)).transpen?.(bitmap, cliprect, runtime.add(runtime.readIndex(spriteram, offs), ((((attributes) << (2))) & (768))), ((((attributes) >>> (4))) & (3)), flipx, flipy, sx, sy, 15) ?? 0) : (runtime.calls["transpen"]?.(bitmap, cliprect, runtime.add(runtime.readIndex(spriteram, offs), ((((attributes) << (2))) & (768))), ((((attributes) >>> (4))) & (3)), flipx, flipy, sx, sy, 15) ?? 0));
                }
            }
            return {
                "fgvideoram_w": method_fgvideoram_w,
                "bgvideoram_w": method_bgvideoram_w,
                "bgscrollx_w": method_bgscrollx_w,
                "bgscrolly_w": method_bgscrolly_w,
                "bankswitch_w": method_bankswitch_w,
                "get_fg_tile_info": method_get_fg_tile_info,
                "get_bg_tile_info": method_get_bg_tile_info,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "gng_state.fgvideoram_w": methods["fgvideoram_w"],
            "gng_state.bgvideoram_w": methods["bgvideoram_w"],
            "gng_state.bgscrollx_w": methods["bgscrollx_w"],
            "gng_state.bgscrolly_w": methods["bgscrolly_w"],
            "gng_state.bankswitch_w": methods["bankswitch_w"],
            "gng_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "gng_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "gng_state.screen_update": methods["screen_update"],
            "gng_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
