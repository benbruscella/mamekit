// GENERATED executable machine composition from src/mame/pacman/pacman.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mspacman');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_pacman_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_pacman_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_pacman_read_nop(runtime: any) {
    const members = runtime.members;
    return 191;
  }

  function method_pacman_interrupt_vector_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_interrupt_vector = ((data) & 0xff);
  }

  function method_pacman_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | ((((members.m_charbank ?? runtime.member("m_charbank"))) << (8))));
    let attr: any = ((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (31))) | ((((members.m_colortablebank ?? runtime.member("m_colortablebank"))) << (5))))) | ((((members.m_palettebank ?? runtime.member("m_palettebank"))) << (6))));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, attr, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, attr, 0) ?? 0) : (runtime.calls["set"]?.(0, code, attr, 0) ?? 0));
  }

  function method_pacman_scan_rows(runtime: any, col: any, row: any, num_cols: any, num_rows: any) {
    const members = runtime.members;
    row = ((((row) + (2))) >>> 0);
    col = ((((col) - (2))) >>> 0);
    if (((col) & (32))) {
      return ((row) + (((((col) & (31))) << (5))));
    } else {
      return ((col) + (((row) << (5))));
    }
  }

  function method_interrupt_vector_r(runtime: any, irqline: any) {
    const members = runtime.members;
    return (members.m_interrupt_vector ?? runtime.member("m_interrupt_vector"));
  }

  function method_irq_mask_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_irq_mask = ((state) ? 1 : 0);
    if (((state) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
  }

  function method_flipscreen_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_flipscreen = ((state) & 0xff);
    (runtime.calls["m_bg_tilemap.set_flip"] ? runtime.calls["m_bg_tilemap.set_flip"]((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) * (runtime.add(1, 2)))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_flip?.((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) * (runtime.add(1, 2)))) ?? 0) : (runtime.calls["set_flip"]?.((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) * (runtime.add(1, 2)))) ?? 0));
  }

  function method_screen_update_pacman(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    if (((Number((members.m_bgpriority ?? runtime.member("m_bgpriority"))) !== Number(0)) ? 1 : 0)) {
      (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"](0, cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(0, cliprect) ?? 0) : (runtime.calls["fill"]?.(0, cliprect) ?? 0));
    } else {
      (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 128, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 128, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 128, 0) ?? 0));
    }
    if ((runtime.same(h_m_spriteram, 0) ? 0 : 1)) {
      (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](screen, bitmap, cliprect) : method_draw_sprites(runtime, screen, bitmap, cliprect));
    }
    if (((Number((members.m_bgpriority ?? runtime.member("m_bgpriority"))) !== Number(0)) ? 1 : 0)) {
      (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    }
    return 0;
  }

  function method_draw_sprites(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_spriteram2 = members.m_spriteram2 ?? runtime.member("m_spriteram2");
    let spriteram: any = h_m_spriteram;
    let spriteram_2: any = h_m_spriteram2;
    let spriteclip: any = Object.assign(Object.create(Object.getPrototypeOf((runtime.calls["rectangle"] ? runtime.calls["rectangle"](((2) * (8)), ((((34) * (8))) - (1)), ((0) * (8)), ((((28) * (8))) - (1))) : runtime.macro("rectangle", ((2) * (8)), ((((34) * (8))) - (1)), ((0) * (8)), ((((28) * (8))) - (1)))))), (runtime.calls["rectangle"] ? runtime.calls["rectangle"](((2) * (8)), ((((34) * (8))) - (1)), ((0) * (8)), ((((28) * (8))) - (1))) : runtime.macro("rectangle", ((2) * (8)), ((((34) * (8))) - (1)), ((0) * (8)), ((((28) * (8))) - (1)))));
    spriteclip = runtime.andAssign(spriteclip, cliprect);
    for (let offs: any = (((members.m_spriteram).length) - (2)); ((Number(offs) > Number(((2) * (2)))) ? 1 : 0); offs = ((offs) - (2))) {
      let color: any = 0;
      let sx: any = 0;
      let sy: any = 0;
      let fx: any = ((0) & 0xff);
      let fy: any = ((0) & 0xff);
      if ((members.m_inv_spr ?? runtime.member("m_inv_spr"))) {
        sx = runtime.readIndex(spriteram_2, ((offs) + (1)));
        sy = ((240) - (runtime.readIndex(spriteram_2, offs)));
      } else {
        sx = ((272) - (runtime.readIndex(spriteram_2, ((offs) + (1)))));
        sy = ((runtime.readIndex(spriteram_2, offs)) - (31));
      }
      fx = ((((((runtime.readIndex(spriteram, offs)) & (1))) ^ ((members.m_inv_spr ?? runtime.member("m_inv_spr"))))) & 0xff);
      fy = ((((((runtime.readIndex(spriteram, offs)) & (2))) ^ ((((members.m_inv_spr ?? runtime.member("m_inv_spr"))) << (1))))) & 0xff);
      color = ((((((runtime.readIndex(spriteram, ((offs) + (1)))) & (31))) | ((((members.m_colortablebank ?? runtime.member("m_colortablebank"))) << (5))))) | ((((members.m_palettebank ?? runtime.member("m_palettebank"))) << (6))));
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, sx, sy, (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0))) ?? 0);
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, ((sx) - (256)), sy, (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0))) ?? 0);
    }
    for (let offs: any = ((2) * (2)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (2))) {
      let color: any = 0;
      let sx: any = 0;
      let sy: any = 0;
      let fx: any = ((0) & 0xff);
      let fy: any = ((0) & 0xff);
      if ((members.m_inv_spr ?? runtime.member("m_inv_spr"))) {
        sx = runtime.readIndex(spriteram_2, ((offs) + (1)));
        sy = ((240) - (runtime.readIndex(spriteram_2, offs)));
      } else {
        sx = ((272) - (runtime.readIndex(spriteram_2, ((offs) + (1)))));
        sy = ((runtime.readIndex(spriteram_2, offs)) - (31));
      }
      color = ((((((runtime.readIndex(spriteram, ((offs) + (1)))) & (31))) | ((((members.m_colortablebank ?? runtime.member("m_colortablebank"))) << (5))))) | ((((members.m_palettebank ?? runtime.member("m_palettebank"))) << (6))));
      fx = ((((((runtime.readIndex(spriteram, offs)) & (1))) ^ ((members.m_inv_spr ?? runtime.member("m_inv_spr"))))) & 0xff);
      fy = ((((((runtime.readIndex(spriteram, offs)) & (2))) ^ ((((members.m_inv_spr ?? runtime.member("m_inv_spr"))) << (1))))) & 0xff);
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, sx, ((sy) + ((members.m_xoffsethack ?? runtime.member("m_xoffsethack")))), (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0))) ?? 0);
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, ((sx) - (256)), ((sy) + ((members.m_xoffsethack ?? runtime.member("m_xoffsethack")))), (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), ((color) & (63)), 0) ?? 0))) ?? 0);
    }
  }

  function method_vblank_irq(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
    }
  }
  return {
    "pacman_videoram_w": method_pacman_videoram_w,
    "pacman_colorram_w": method_pacman_colorram_w,
    "pacman_read_nop": method_pacman_read_nop,
    "pacman_interrupt_vector_w": method_pacman_interrupt_vector_w,
    "pacman_get_tile_info": method_pacman_get_tile_info,
    "pacman_scan_rows": method_pacman_scan_rows,
    "interrupt_vector_r": method_interrupt_vector_r,
    "irq_mask_w": method_irq_mask_w,
    "flipscreen_w": method_flipscreen_w,
    "screen_update_pacman": method_screen_update_pacman,
    "draw_sprites": method_draw_sprites,
    "vblank_irq": method_vblank_irq
  };
})();
    return {
      "pacman_state.pacman_videoram_w": methods["pacman_videoram_w"],
      "pacman_state.pacman_colorram_w": methods["pacman_colorram_w"],
      "pacman_state.pacman_read_nop": methods["pacman_read_nop"],
      "pacman_state.pacman_interrupt_vector_w": methods["pacman_interrupt_vector_w"],
      "pacman_state.pacman_get_tile_info": methods["pacman_get_tile_info"],
      "pacman_state.pacman_scan_rows": methods["pacman_scan_rows"],
      "pacman_state.interrupt_vector_r": methods["interrupt_vector_r"],
      "pacman_state.irq_mask_w": methods["irq_mask_w"],
      "pacman_state.flipscreen_w": methods["flipscreen_w"],
      "pacman_state.screen_update_pacman": methods["screen_update_pacman"],
      "pacman_state.draw_sprites": methods["draw_sprites"],
      "pacman_state.vblank_irq": methods["vblank_irq"],
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
