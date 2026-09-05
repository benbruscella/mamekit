// GENERATED executable machine composition from src/mame/tecmo/tecmo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rygar');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_txvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_txvideoram"), offset, data);
                (runtime.calls["m_tx_tilemap.mark_tile_dirty"] ? runtime.calls["m_tx_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
            }
            function method_fgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
                (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](((offset) & (511))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (511))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (511))) ?? 0));
            }
            function method_bgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](((offset) & (511))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) & (511))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (511))) ?? 0));
            }
            function method_dsw_l_r_0(runtime) {
                const members = runtime.members;
                const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
                let port = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 0))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 0), "read"))) & 0xff);
                port = ((runtime.andAssign(port, 15)) & 0xff);
                return port;
            }
            function method_dsw_h_r_0(runtime) {
                const members = runtime.members;
                const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
                let port = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 0))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 0), "read"))) & 0xff);
                port = ((runtime.andAssign(port, 240)) & 0xff);
                return ((port) >>> (4));
            }
            function method_dsw_l_r_1(runtime) {
                const members = runtime.members;
                const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
                let port = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 1))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 1), "read"))) & 0xff);
                port = ((runtime.andAssign(port, 15)) & 0xff);
                return port;
            }
            function method_dsw_h_r_1(runtime) {
                const members = runtime.members;
                const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
                let port = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 1))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 1), "read"))) & 0xff);
                port = ((runtime.andAssign(port, 240)) & 0xff);
                return ((port) >>> (4));
            }
            function method_fgscroll_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_fgscroll"), offset, data);
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                (runtime.calls["m_fg_tilemap.set_scrollx"] ? runtime.calls["m_fg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1))))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, runtime.add(runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1))))) ?? 0));
                (runtime.calls["m_fg_tilemap.set_scrolly"] ? runtime.calls["m_fg_tilemap.set_scrolly"](0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2)) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrolly?.(0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2)) ?? 0) : (runtime.calls["set_scrolly"]?.(0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2)) ?? 0));
            }
            function method_bgscroll_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bgscroll"), offset, data);
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, runtime.add(runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1))))) ?? 0));
                (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2)) ?? 0) : (runtime.calls["set_scrolly"]?.(0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2)) ?? 0));
            }
            function method_flipscreen_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"]((((data) >>> (0)) & 1)) : runtime.macro("flip_screen_set", (((data) >>> (0)) & 1)));
            }
            function method_bankswitch_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_mainbank.set_entry"] ? runtime.calls["m_mainbank.set_entry"](((data) >>> (3))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) >>> (3))) ?? 0) : (runtime.calls["set_entry"]?.(((data) >>> (3))) ?? 0));
            }
            function method_adpcm_start_w(runtime, data) {
                const members = runtime.members;
                members.m_adpcm_pos = ((((data) << (8))) & 0xffff);
                members.m_adpcm_toggle = ((0) ? 1 : 0);
                members.m_adpcm_enabled = ((1) ? 1 : 0);
                (runtime.calls["m_msm.reset_w"] ? runtime.calls["m_msm.reset_w"](0) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).reset_w?.(0) ?? 0) : (runtime.calls["reset_w"]?.(0) ?? 0));
            }
            function method_adpcm_end_w(runtime, data) {
                const members = runtime.members;
                members.m_adpcm_end = ((data) & 0xff);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (512)))) & 0xff);
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](2, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(2, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0) : (runtime.calls["set"]?.(2, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (512)))) & 0xff);
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0) : (runtime.calls["set"]?.(1, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0));
            }
            function method_get_tx_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let attr = ((runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), ((tile_index) + (1024)))) & 0xff);
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, runtime.add(runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, runtime.add(runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0) ?? 0) : (runtime.calls["set"]?.(0, runtime.add(runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0) ?? 0));
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                const h_m_video_type = members.m_video_type ?? runtime.member("m_video_type");
                ((runtime.dereference((runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)))).fill?.(0, cliprect) ?? 0);
                (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"](256, cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(256, cliprect) ?? 0) : (runtime.calls["fill"]?.(256, cliprect) ?? 0));
                (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 1) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 1) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 1) ?? 0));
                (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 2) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 2) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 2) ?? 0));
                (runtime.calls["m_tx_tilemap.draw"] ? runtime.calls["m_tx_tilemap.draw"](screen, bitmap, cliprect, 0, 4) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).draw?.(screen, bitmap, cliprect, 0, 4) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 4) ?? 0));
                (runtime.calls["m_sprgen.draw_sprites_8bit"] ? runtime.calls["m_sprgen.draw_sprites_8bit"](screen, bitmap, cliprect, h_m_spriteram, (members.m_spriteram).length, h_m_video_type, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).draw_sprites_8bit?.(screen, bitmap, cliprect, h_m_spriteram, (members.m_spriteram).length, h_m_video_type, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ?? 0) : (runtime.calls["draw_sprites_8bit"]?.(screen, bitmap, cliprect, h_m_spriteram, (members.m_spriteram).length, h_m_video_type, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ?? 0));
                return 0;
            }
            function method_pri_cb(runtime, pri) {
                const members = runtime.members;
                switch (pri) {
                    default:
                        {
                            return 0;
                        }
                    case 1:
                        {
                            return 240;
                        }
                    case 2:
                        {
                            return ((240) | (204));
                        }
                    case 3:
                        {
                            return ((((240) | (204))) | (170));
                        }
                }
            }
            function method_adpcm_int(runtime, state) {
                const members = runtime.members;
                const h_m_adpcm_rom = members.m_adpcm_rom ?? runtime.member("m_adpcm_rom");
                if ((((((state) ? 0 : 1)) || ((((members.m_adpcm_enabled ?? runtime.member("m_adpcm_enabled"))) ? 0 : 1))) ? 1 : 0)) {
                    return;
                }
                let data = ((runtime.readIndex(h_m_adpcm_rom, (((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) % ((members.m_adpcm_rom).length)))) & 0xff);
                if ((members.m_adpcm_toggle ?? runtime.member("m_adpcm_toggle"))) {
                    (runtime.calls["m_msm.data_w"] ? runtime.calls["m_msm.data_w"](((data) & (15))) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).data_w?.(((data) & (15))) ?? 0) : (runtime.calls["data_w"]?.(((data) & (15))) ?? 0));
                    let hi = (((((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) >>> (8))) & 0xff);
                    members.m_adpcm_pos = ((((members.m_adpcm_pos) + (1))) & 0xffff);
                    if ((((((Number((((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) & (255))) === Number(0)) ? 1 : 0)) && (((Number(hi) === Number((members.m_adpcm_end ?? runtime.member("m_adpcm_end")))) ? 1 : 0))) ? 1 : 0)) {
                        members.m_adpcm_enabled = ((0) ? 1 : 0);
                        (runtime.calls["m_msm.reset_w"] ? runtime.calls["m_msm.reset_w"](1) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).reset_w?.(1) ?? 0) : (runtime.calls["reset_w"]?.(1) ?? 0));
                    }
                }
                else {
                    (runtime.calls["m_msm.data_w"] ? runtime.calls["m_msm.data_w"](((data) >>> (4))) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).data_w?.(((data) >>> (4))) ?? 0) : (runtime.calls["data_w"]?.(((data) >>> (4))) ?? 0));
                }
                members.m_adpcm_toggle = (((((members.m_adpcm_toggle ?? runtime.member("m_adpcm_toggle"))) ? 0 : 1)) ? 1 : 0);
            }
            return {
                "txvideoram_w": method_txvideoram_w,
                "fgvideoram_w": method_fgvideoram_w,
                "bgvideoram_w": method_bgvideoram_w,
                "dsw_l_r_0": method_dsw_l_r_0,
                "dsw_h_r_0": method_dsw_h_r_0,
                "dsw_l_r_1": method_dsw_l_r_1,
                "dsw_h_r_1": method_dsw_h_r_1,
                "fgscroll_w": method_fgscroll_w,
                "bgscroll_w": method_bgscroll_w,
                "flipscreen_w": method_flipscreen_w,
                "bankswitch_w": method_bankswitch_w,
                "adpcm_start_w": method_adpcm_start_w,
                "adpcm_end_w": method_adpcm_end_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "get_fg_tile_info": method_get_fg_tile_info,
                "get_tx_tile_info": method_get_tx_tile_info,
                "screen_update": method_screen_update,
                "pri_cb": method_pri_cb,
                "adpcm_int": method_adpcm_int
            };
        })();
        return {
            "tecmo_state.txvideoram_w": methods["txvideoram_w"],
            "tecmo_state.fgvideoram_w": methods["fgvideoram_w"],
            "tecmo_state.bgvideoram_w": methods["bgvideoram_w"],
            "tecmo_state.dsw_l_r_0": methods["dsw_l_r_0"],
            "tecmo_state.dsw_h_r_0": methods["dsw_h_r_0"],
            "tecmo_state.dsw_l_r_1": methods["dsw_l_r_1"],
            "tecmo_state.dsw_h_r_1": methods["dsw_h_r_1"],
            "tecmo_state.fgscroll_w": methods["fgscroll_w"],
            "tecmo_state.bgscroll_w": methods["bgscroll_w"],
            "tecmo_state.flipscreen_w": methods["flipscreen_w"],
            "tecmo_state.bankswitch_w": methods["bankswitch_w"],
            "tecmo_state.adpcm_start_w": methods["adpcm_start_w"],
            "tecmo_state.adpcm_end_w": methods["adpcm_end_w"],
            "tecmo_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "tecmo_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "tecmo_state.get_tx_tile_info": methods["get_tx_tile_info"],
            "tecmo_state.screen_update": methods["screen_update"],
            "tecmo_state.pri_cb": methods["pri_cb"],
            "tecmo_state.adpcm_int": methods["adpcm_int"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
