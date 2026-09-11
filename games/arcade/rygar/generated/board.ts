// GENERATED executable machine composition from src/mame/tecmo/tecmo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
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

  function method_txvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_txvideoram"), offset, data);
    (__l["m_tx_tilemap.mark_tile_dirty"] ? __l["m_tx_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
  }

  function method_fgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](((offset) & (511))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (511))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) & (511))) ?? 0));
  }

  function method_bgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](((offset) & (511))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) & (511))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) & (511))) ?? 0));
  }

  function method_dsw_l_r_0(runtime: any): any {
    const members = runtime.members;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 0))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 0), "read"))) & 0xff);
    port = ((runtime.andAssign(port, 15)) & 0xff);
    return port;
  }

  function method_dsw_h_r_0(runtime: any): any {
    const members = runtime.members;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 0))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 0), "read"))) & 0xff);
    port = ((runtime.andAssign(port, 240)) & 0xff);
    return ((port) >>> (4));
  }

  function method_dsw_l_r_1(runtime: any): any {
    const members = runtime.members;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 1))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 1), "read"))) & 0xff);
    port = ((runtime.andAssign(port, 15)) & 0xff);
    return port;
  }

  function method_dsw_h_r_1(runtime: any): any {
    const members = runtime.members;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = ((((runtime.dereference(runtime.readIndex(h_m_dsw, 1))).read?.() ?? runtime.container(runtime.readIndex(h_m_dsw, 1), "read"))) & 0xff);
    port = ((runtime.andAssign(port, 240)) & 0xff);
    return ((port) >>> (4));
  }

  function method_fgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_fgscroll"), offset, data);
    (__l["m_screen.update_partial"] ? __l["m_screen.update_partial"]((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) ?? 0) : 0);
    (__l["m_fg_tilemap.set_scrollx"] ? __l["m_fg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1))))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1))))) ?? 0) : (__l["set_scrollx"]?.(0, runtime.add(runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1))))) ?? 0));
    (__l["m_fg_tilemap.set_scrolly"] ? __l["m_fg_tilemap.set_scrolly"](0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2)) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrolly?.(0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2)) ?? 0) : (__l["set_scrolly"]?.(0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2)) ?? 0));
  }

  function method_bgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_bgscroll"), offset, data);
    (__l["m_screen.update_partial"] ? __l["m_screen.update_partial"]((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) ?? 0) : 0);
    (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](0, runtime.add(runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1))))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, runtime.add(runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1))))) ?? 0) : (__l["set_scrollx"]?.(0, runtime.add(runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1))))) ?? 0));
    (__l["m_bg_tilemap.set_scrolly"] ? __l["m_bg_tilemap.set_scrolly"](0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2)) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2)) ?? 0) : (__l["set_scrolly"]?.(0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2)) ?? 0));
  }

  function method_flipscreen_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["flip_screen_set"] ? __l["flip_screen_set"]((((data) >>> (0)) & 1)) : runtime.macro("flip_screen_set", (((data) >>> (0)) & 1)));
  }

  function method_bankswitch_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_mainbank.set_entry"] ? __l["m_mainbank.set_entry"](((data) >>> (3))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) >>> (3))) ?? 0) : (__l["set_entry"]?.(((data) >>> (3))) ?? 0));
  }

  function method_adpcm_start_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_adpcm_pos = ((((data) << (8))) & 0xffff);
    members.m_adpcm_toggle = ((0) ? 1 : 0);
    members.m_adpcm_enabled = ((1) ? 1 : 0);
    (__l["m_msm.reset_w"] ? __l["m_msm.reset_w"](0) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).reset_w?.(0) ?? 0) : 0);
  }

  function method_adpcm_end_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_adpcm_end = ((data) & 0xff);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (512)))) & 0xff);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](2, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(2, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0) : (__l["set"]?.(2, runtime.add(runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (512)))) & 0xff);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](1, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0) : (__l["set"]?.(1, runtime.add(runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0) ?? 0));
  }

  function method_get_tx_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), ((tile_index) + (1024)))) & 0xff);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, runtime.add(runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, runtime.add(runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0) ?? 0) : (__l["set"]?.(0, runtime.add(runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0) ?? 0));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_video_type = members.m_video_type ?? runtime.member("m_video_type");
    ((runtime.dereference((__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)))).fill?.(0, cliprect) ?? 0);
    (__l["bitmap.fill"] ? __l["bitmap.fill"](256, cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(256, cliprect) ?? 0) : (__l["fill"]?.(256, cliprect) ?? 0));
    (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 1) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 1) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 1) ?? 0));
    (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 2) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 2) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 2) ?? 0));
    (__l["m_tx_tilemap.draw"] ? __l["m_tx_tilemap.draw"](screen, bitmap, cliprect, 0, 4) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).draw?.(screen, bitmap, cliprect, 0, 4) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 4) ?? 0));
    (__l["m_sprgen.draw_sprites_8bit"] ? __l["m_sprgen.draw_sprites_8bit"](screen, bitmap, cliprect, h_m_spriteram, (members.m_spriteram).length, h_m_video_type, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).draw_sprites_8bit?.(screen, bitmap, cliprect, h_m_spriteram, (members.m_spriteram).length, h_m_video_type, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ?? 0) : 0);
    return 0;
  }

  function method_pri_cb(runtime: any, pri: any): any {
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
        return 252;
      }
      case 3:
      {
        return 254;
      }
    }
  }

  function method_adpcm_int(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_adpcm_rom = members.m_adpcm_rom ?? runtime.member("m_adpcm_rom");
    if ((((((state) ? 0 : 1)) || ((((members.m_adpcm_enabled ?? runtime.member("m_adpcm_enabled"))) ? 0 : 1))) ? 1 : 0)) {
      return;
    }
    let data: any = ((runtime.readIndex(h_m_adpcm_rom, (((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) % ((members.m_adpcm_rom).length)))) & 0xff);
    if ((members.m_adpcm_toggle ?? runtime.member("m_adpcm_toggle"))) {
      (__l["m_msm.data_w"] ? __l["m_msm.data_w"](((data) & (15))) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).data_w?.(((data) & (15))) ?? 0) : 0);
      let hi: any = (((((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) >>> (8))) & 0xff);
      members.m_adpcm_pos = ((((members.m_adpcm_pos) + (1))) & 0xffff);
      if ((((((Number((((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) & (255))) === Number(0)) ? 1 : 0)) && (((Number(hi) === Number((members.m_adpcm_end ?? runtime.member("m_adpcm_end")))) ? 1 : 0))) ? 1 : 0)) {
        members.m_adpcm_enabled = ((0) ? 1 : 0);
        (__l["m_msm.reset_w"] ? __l["m_msm.reset_w"](1) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).reset_w?.(1) ?? 0) : 0);
      }
    } else {
      (__l["m_msm.data_w"] ? __l["m_msm.data_w"](((data) >>> (4))) : (members.m_msm) != null ? ((runtime.dereference(members.m_msm)).data_w?.(((data) >>> (4))) ?? 0) : 0);
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
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","flip_screen","flip_screen_set","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_scrollx","m_fg_tilemap.set_scrolly","m_mainbank.set_entry","m_msm.data_w","m_msm.reset_w","m_screen.update_partial","m_screen.vpos","m_sprgen.draw_sprites_8bit","m_tx_tilemap.draw","m_tx_tilemap.mark_tile_dirty","mark_tile_dirty","priority","screen.priority","set","set_entry","set_scrollx","set_scrolly","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
