// GENERATED executable machine composition from src/mame/nintendo/popeye.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'popeye');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_popeye_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_popeye_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_background_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let shift: any = (((((offset) >>> (12)) & 1)) ? (4) : (0));
    offset = (((offset) >>> (0)) & ((1 << (12)) - 1));
    runtime.writeIndex(runtime.writableMember("m_background_ram"), offset, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), offset)) & ((~((15) << (shift)))))) | (((((data) & (15))) << (shift)))));
  }

  function method_protection_r(runtime: any, offset: any) {
    const members = runtime.members;
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      return (((((((members.m_prot1 ?? runtime.member("m_prot1"))) << ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))) | ((((members.m_prot0 ?? runtime.member("m_prot0"))) >>> (((8) - ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))))))) & (255));
    } else {
      return 0;
    }
  }

  function method_protection_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      members.m_prot_shift = ((((data) & (7))) & 0xff);
    } else {
      members.m_prot0 = (((members.m_prot1 ?? runtime.member("m_prot1"))) & 0xff);
      members.m_prot1 = ((data) & 0xff);
    }
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index);
    let color: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
  }

  function method_refresh_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let nmi_enabled: any = ((((Number(((((offset) >>> (8))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
    if (((Number((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) !== Number(nmi_enabled)) ? 1 : 0)) {
      members.m_nmi_enabled = ((nmi_enabled) ? 1 : 0);
      if ((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) ? 0 : 1)) {
        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
      }
    }
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
      let rovi: any = ((runtime.add((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (((runtime.divide(y, 2)) ^ (255))) : (runtime.divide(y, 2))), runtime.readIndex(h_m_background_scroll, 1))) & 0xffff);
      for (let x: any = cliprect.min_x; ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((x) + (1))) {
        let roh: any = ((runtime.add(runtime.add(56, runtime.divide(x, 2)), runtime.readIndex(h_m_background_scroll, 0))) & 0xff);
        let shift: any = (((((rovi) >>> (7)) & 1)) ? (4) : (0));
        bitmap["pix="](y, x, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), (((((rovi) >>> (8)) & 1)) ? ((((((((rovi) >>> (1)) & ((1 << (6)) - 1))) << (6))) | ((((roh) >>> (2)) & ((1 << (6)) - 1))))) : (0)))) >>> (shift))) & (15)));
      }
    }
  }

  function method_screen_vblank(runtime: any, state: any) {
    const members = runtime.members;
    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    const h_m_dmasource = members.m_dmasource ?? runtime.member("m_dmasource");
    if (state) {
      (runtime.calls["std::copy_n"] ? runtime.calls["std::copy_n"]((runtime.calls["m_dmasource.target"] ? runtime.calls["m_dmasource.target"]() : (members.m_dmasource) != null ? (typeof (runtime.dereference(members.m_dmasource)).target === 'function' ? (runtime.dereference(members.m_dmasource)).target() : typeof (runtime.dereference(members.m_dmasource)).target === 'number' || typeof (runtime.dereference(members.m_dmasource)).target === 'boolean' ? (runtime.dereference(members.m_dmasource)).target : runtime.container(members.m_dmasource, "target")) : (runtime.calls["target"]?.() ?? 0)), (members.m_dmasource).length, (runtime.calls["m_sprite_ram.begin"] ? runtime.calls["m_sprite_ram.begin"]() : (members.m_sprite_ram) != null ? (typeof (runtime.dereference(members.m_sprite_ram)).begin === 'function' ? (runtime.dereference(members.m_sprite_ram)).begin() : typeof (runtime.dereference(members.m_sprite_ram)).begin === 'number' || typeof (runtime.dereference(members.m_sprite_ram)).begin === 'boolean' ? (runtime.dereference(members.m_sprite_ram)).begin : runtime.container(members.m_sprite_ram, "begin")) : (runtime.calls["begin"]?.() ?? 0))) : runtime.macro("std::copy_n", (runtime.calls["m_dmasource.target"] ? runtime.calls["m_dmasource.target"]() : (members.m_dmasource) != null ? (typeof (runtime.dereference(members.m_dmasource)).target === 'function' ? (runtime.dereference(members.m_dmasource)).target() : typeof (runtime.dereference(members.m_dmasource)).target === 'number' || typeof (runtime.dereference(members.m_dmasource)).target === 'boolean' ? (runtime.dereference(members.m_dmasource)).target : runtime.container(members.m_dmasource, "target")) : (runtime.calls["target"]?.() ?? 0)), (members.m_dmasource).length, (runtime.calls["m_sprite_ram.begin"] ? runtime.calls["m_sprite_ram.begin"]() : (members.m_sprite_ram) != null ? (typeof (runtime.dereference(members.m_sprite_ram)).begin === 'function' ? (runtime.dereference(members.m_sprite_ram)).begin() : typeof (runtime.dereference(members.m_sprite_ram)).begin === 'number' || typeof (runtime.dereference(members.m_sprite_ram)).begin === 'boolean' ? (runtime.dereference(members.m_sprite_ram)).begin : runtime.container(members.m_sprite_ram, "begin")) : (runtime.calls["begin"]?.() ?? 0))));
      (runtime.calls["std::copy_n"] ? runtime.calls["std::copy_n"]((runtime.calls["m_dmasource.target"] ? runtime.calls["m_dmasource.target"]() : (members.m_dmasource) != null ? (typeof (runtime.dereference(members.m_dmasource)).target === 'function' ? (runtime.dereference(members.m_dmasource)).target() : typeof (runtime.dereference(members.m_dmasource)).target === 'number' || typeof (runtime.dereference(members.m_dmasource)).target === 'boolean' ? (runtime.dereference(members.m_dmasource)).target : runtime.container(members.m_dmasource, "target")) : (runtime.calls["target"]?.() ?? 0)), 3, h_m_background_scroll) : runtime.macro("std::copy_n", (runtime.calls["m_dmasource.target"] ? runtime.calls["m_dmasource.target"]() : (members.m_dmasource) != null ? (typeof (runtime.dereference(members.m_dmasource)).target === 'function' ? (runtime.dereference(members.m_dmasource)).target() : typeof (runtime.dereference(members.m_dmasource)).target === 'number' || typeof (runtime.dereference(members.m_dmasource)).target === 'boolean' ? (runtime.dereference(members.m_dmasource)).target : runtime.container(members.m_dmasource, "target")) : (runtime.calls["target"]?.() ?? 0)), 3, h_m_background_scroll));
      members.m_palette_bank = ((runtime.readIndex(h_m_dmasource, 3)) & 0xff);
      members.m_field = ((((members.m_field) ^ (1))) | 0);
      if ((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) {
        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 1) ?? 0));
      }
    }
  }

  function method_popeye_portB_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((data) & (1))) : runtime.macro("flip_screen_set", ((data) & (1))));
    members.m_dswbit = ((((((data) & (14))) >>> (1))) & 0xff);
  }
  return {
    "popeye_videoram_w": method_popeye_videoram_w,
    "popeye_colorram_w": method_popeye_colorram_w,
    "background_w": method_background_w,
    "protection_r": method_protection_r,
    "protection_w": method_protection_w,
    "get_fg_tile_info": method_get_fg_tile_info,
    "refresh_w": method_refresh_w,
    "draw_background": method_draw_background,
    "screen_vblank": method_screen_vblank,
    "popeye_portB_w": method_popeye_portB_w
  };
})();
    return {
      "tnx1_state.popeye_videoram_w": methods["popeye_videoram_w"],
      "tnx1_state.popeye_colorram_w": methods["popeye_colorram_w"],
      "tnx1_state.background_w": methods["background_w"],
      "tnx1_state.protection_r": methods["protection_r"],
      "tnx1_state.protection_w": methods["protection_w"],
      "tnx1_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "tnx1_state.refresh_w": methods["refresh_w"],
      "tnx1_state.draw_background": methods["draw_background"],
      "tnx1_state.screen_vblank": methods["screen_vblank"],
      "tnx1_state.popeye_portB_w": methods["popeye_portB_w"],
    };
  })(),
  ...(() => {
    const methods = (() => {
  function method_popeye_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_popeye_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_background_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let shift: any = (((((offset) >>> (12)) & 1)) ? (4) : (0));
    offset = (((offset) >>> (0)) & ((1 << (12)) - 1));
    runtime.writeIndex(runtime.writableMember("m_background_ram"), offset, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), offset)) & ((~((15) << (shift)))))) | (((((data) & (15))) << (shift)))));
  }

  function method_protection_r(runtime: any, offset: any) {
    const members = runtime.members;
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      return (((((((members.m_prot1 ?? runtime.member("m_prot1"))) << ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))) | ((((members.m_prot0 ?? runtime.member("m_prot0"))) >>> (((8) - ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))))))) & (255));
    } else {
      return 0;
    }
  }

  function method_protection_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      members.m_prot_shift = ((((data) & (7))) & 0xff);
    } else {
      members.m_prot0 = (((members.m_prot1 ?? runtime.member("m_prot1"))) & 0xff);
      members.m_prot1 = ((data) & 0xff);
    }
  }

  function method_refresh_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let nmi_enabled: any = ((((Number(((((offset) >>> (8))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
    if (((Number((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) !== Number(nmi_enabled)) ? 1 : 0)) {
      members.m_nmi_enabled = ((nmi_enabled) ? 1 : 0);
      if ((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) ? 0 : 1)) {
        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
      }
    }
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    for (let y: any = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
      let rovi: any = ((runtime.add((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (((runtime.divide(y, 2)) ^ (255))) : (runtime.divide(y, 2))), runtime.readIndex(h_m_background_scroll, 1))) & 0xffff);
      for (let x: any = cliprect.min_x; ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((x) + (1))) {
        let roh: any = ((runtime.add(runtime.add(56, runtime.divide(x, 2)), runtime.readIndex(h_m_background_scroll, 0))) & 0xff);
        let shift: any = (((((rovi) >>> (7)) & 1)) ? (4) : (0));
        bitmap["pix="](y, x, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), (((((rovi) >>> (8)) & 1)) ? ((((((((rovi) >>> (1)) & ((1 << (6)) - 1))) << (6))) | ((((roh) >>> (2)) & ((1 << (6)) - 1))))) : (0)))) >>> (shift))) & (15)));
      }
    }
  }
  return {
    "popeye_videoram_w": method_popeye_videoram_w,
    "popeye_colorram_w": method_popeye_colorram_w,
    "background_w": method_background_w,
    "protection_r": method_protection_r,
    "protection_w": method_protection_w,
    "refresh_w": method_refresh_w,
    "draw_background": method_draw_background
  };
})();
    return {
      "tpp2_state.background_w": methods["background_w"],
      "tpp2_state.draw_background": methods["draw_background"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
