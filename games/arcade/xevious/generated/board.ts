// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'xevious');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_xevious_fg_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_fg_colorram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_bg_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_bg_colorram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_fg_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_fg_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_bg_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_bg_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_vh_latch_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let reg: any = 0;
    let scroll: any = ((data) + (((((offset) & (1))) << (8))));
    reg = ((((offset) & (240))) >>> (4));
    switch (reg) {
      case 0:
      {
        (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (runtime.calls["set_scrollx"]?.(0, scroll) ?? 0));
        break;
      }
      case 1:
      {
        (runtime.calls["m_fg_tilemap.set_scrollx"] ? runtime.calls["m_fg_tilemap.set_scrollx"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (runtime.calls["set_scrollx"]?.(0, scroll) ?? 0));
        break;
      }
      case 2:
      {
        (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (runtime.calls["set_scrolly"]?.(0, scroll) ?? 0));
        break;
      }
      case 3:
      {
        (runtime.calls["m_fg_tilemap.set_scrolly"] ? runtime.calls["m_fg_tilemap.set_scrolly"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (runtime.calls["set_scrolly"]?.(0, scroll) ?? 0));
        break;
      }
      case 7:
      {
        (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((scroll) & (1))) : runtime.macro("flip_screen_set", ((scroll) & (1))));
        break;
      }
      default:
      {
        0;
        break;
      }
    }
  }

  function method_xevious_bs_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_bs"), ((offset) & (1)), data);
  }

  function method_irq1_clear_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_main_irq_mask = ((state) & 0xff);
    if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
  }

  function method_irq2_clear_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_sub_irq_mask = ((state) & 0xff);
    if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
      (runtime.calls["m_subcpu.set_input_line"] ? runtime.calls["m_subcpu.set_input_line"](0, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
  }

  function method_nmion_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
  }

  function method_vblank_irq(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
    }
    if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
      (runtime.calls["m_subcpu.set_input_line"] ? runtime.calls["m_subcpu.set_input_line"](0, 1) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
    }
  }
  return {
    "xevious_fg_colorram_w": method_xevious_fg_colorram_w,
    "xevious_bg_colorram_w": method_xevious_bg_colorram_w,
    "xevious_fg_videoram_w": method_xevious_fg_videoram_w,
    "xevious_bg_videoram_w": method_xevious_bg_videoram_w,
    "xevious_vh_latch_w": method_xevious_vh_latch_w,
    "xevious_bs_w": method_xevious_bs_w,
    "irq1_clear_w": method_irq1_clear_w,
    "irq2_clear_w": method_irq2_clear_w,
    "nmion_w": method_nmion_w,
    "vblank_irq": method_vblank_irq
  };
})();
    return {
      "galaga_state.irq1_clear_w": methods["irq1_clear_w"],
      "galaga_state.irq2_clear_w": methods["irq2_clear_w"],
      "galaga_state.nmion_w": methods["nmion_w"],
      "galaga_state.vblank_irq": methods["vblank_irq"],
    };
  })(),
  ...(() => {
    const methods = (() => {
  function method_xevious_fg_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_fg_colorram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_bg_colorram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_bg_colorram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_fg_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_fg_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_bg_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_bg_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_xevious_vh_latch_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let reg: any = 0;
    let scroll: any = ((data) + (((((offset) & (1))) << (8))));
    reg = ((((offset) & (240))) >>> (4));
    switch (reg) {
      case 0:
      {
        (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (runtime.calls["set_scrollx"]?.(0, scroll) ?? 0));
        break;
      }
      case 1:
      {
        (runtime.calls["m_fg_tilemap.set_scrollx"] ? runtime.calls["m_fg_tilemap.set_scrollx"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (runtime.calls["set_scrollx"]?.(0, scroll) ?? 0));
        break;
      }
      case 2:
      {
        (runtime.calls["m_bg_tilemap.set_scrolly"] ? runtime.calls["m_bg_tilemap.set_scrolly"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (runtime.calls["set_scrolly"]?.(0, scroll) ?? 0));
        break;
      }
      case 3:
      {
        (runtime.calls["m_fg_tilemap.set_scrolly"] ? runtime.calls["m_fg_tilemap.set_scrolly"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (runtime.calls["set_scrolly"]?.(0, scroll) ?? 0));
        break;
      }
      case 7:
      {
        (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((scroll) & (1))) : runtime.macro("flip_screen_set", ((scroll) & (1))));
        break;
      }
      default:
      {
        0;
        break;
      }
    }
  }

  function method_xevious_bs_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_xevious_bs"), ((offset) & (1)), data);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = ((runtime.readIndex((members.m_xevious_bg_videoram ?? runtime.member("m_xevious_bg_videoram")), tile_index)) & 0xff);
    let attr: any = ((runtime.readIndex((members.m_xevious_bg_colorram ?? runtime.member("m_xevious_bg_colorram")), tile_index)) & 0xff);
    let color: any = ((((((((((attr) & (60))) >>> (2))) | (((((code) & (128))) >>> (3))))) | (((((attr) & (3))) << (5))))) & 0xff);
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, ((code) + (((((attr) & (1))) << (8)))), color, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, ((code) + (((((attr) & (1))) << (8)))), color, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ?? 0) : (runtime.calls["set"]?.(1, ((code) + (((((attr) & (1))) << (8)))), color, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ?? 0));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let attr: any = ((runtime.readIndex((members.m_xevious_fg_colorram ?? runtime.member("m_xevious_fg_colorram")), tile_index)) & 0xff);
    let color: any = ((((((((attr) & (3))) << (4))) | (((((attr) & (60))) >>> (2))))) & 0xff);
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ^ ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ^ ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))))) ?? 0) : (runtime.calls["set"]?.(0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ^ ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))))) ?? 0));
  }

  function method_screen_update_xevious(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_xevious_sr3 = members.m_xevious_sr3 ?? runtime.member("m_xevious_sr3");
    const h_m_xevious_sr1 = members.m_xevious_sr1 ?? runtime.member("m_xevious_sr1");
    const h_m_xevious_sr2 = members.m_xevious_sr2 ?? runtime.member("m_xevious_sr2");
    let spriteram: any = runtime.addressOf(h_m_xevious_sr3, 1920);
    let spriteram_2: any = runtime.addressOf(h_m_xevious_sr1, 1920);
    let spriteram_3: any = runtime.addressOf(h_m_xevious_sr2, 1920);
    let offs: any = 0;
    let sx: any = 0;
    let sy: any = 0;
    for (offs = 0; ((Number(offs) < Number(128)) ? 1 : 0); offs = ((offs) + (2))) {
      if (((Number(((runtime.readIndex(spriteram, ((offs) + (1)))) & (64))) === Number(0)) ? 1 : 0)) {
        let bank: any = 0;
        let code: any = 0;
        let color: any = 0;
        let flipx: any = 0;
        let flipy: any = 0;
        let transmask: any = ((0) >>> 0);
        if (((runtime.readIndex(spriteram_3, offs)) & (128))) {
          bank = 2;
          code = runtime.add(((runtime.readIndex(spriteram, offs)) & (63)), 256);
        } else {
          bank = 2;
          code = runtime.readIndex(spriteram, offs);
        }
        color = ((runtime.readIndex(spriteram, ((offs) + (1)))) & (127));
        flipx = ((runtime.readIndex(spriteram_3, offs)) & (4));
        flipy = ((runtime.readIndex(spriteram_3, offs)) & (8));
        sx = runtime.add(((runtime.readIndex(spriteram_2, ((offs) + (1)))) - (40)), ((256) * (((runtime.readIndex(spriteram_3, ((offs) + (1)))) & (1)))));
        sy = ((((((28) * (8))) - (runtime.readIndex(spriteram_2, offs)))) - (1));
        if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
          flipx = ((flipx) ? 0 : 1);
          flipy = ((flipy) ? 0 : 1);
        }
        transmask = (((runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0))), color, 128) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0))), color, 128) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0))), color, 128) ?? 0))) >>> 0);
        if (((runtime.readIndex(spriteram_3, offs)) & (2))) {
          if (((runtime.readIndex(spriteram_3, offs)) & (1))) {
            code = runtime.andAssign(code, (~3));
            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, ((code) + (3)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, ((code) + (1)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (sy) : (((sy) - (16)))), transmask) ?? 0);
          }
          code = runtime.andAssign(code, (~2));
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, ((code) + (2)), color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (sy) : (((sy) - (16)))), transmask) ?? 0);
        } else {
          if (((runtime.readIndex(spriteram_3, offs)) & (1))) {
            code = runtime.andAssign(code, (~1));
            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, ((code) + (1)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
          } else {
            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : (runtime.calls["gfx"]?.(bank) ?? 0)))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, transmask) ?? 0);
          }
        }
      }
    }
  }
  return {
    "xevious_fg_colorram_w": method_xevious_fg_colorram_w,
    "xevious_bg_colorram_w": method_xevious_bg_colorram_w,
    "xevious_fg_videoram_w": method_xevious_fg_videoram_w,
    "xevious_bg_videoram_w": method_xevious_bg_videoram_w,
    "xevious_vh_latch_w": method_xevious_vh_latch_w,
    "xevious_bs_w": method_xevious_bs_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "screen_update_xevious": method_screen_update_xevious,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "xevious_state.xevious_fg_colorram_w": methods["xevious_fg_colorram_w"],
      "xevious_state.xevious_bg_colorram_w": methods["xevious_bg_colorram_w"],
      "xevious_state.xevious_fg_videoram_w": methods["xevious_fg_videoram_w"],
      "xevious_state.xevious_bg_videoram_w": methods["xevious_bg_videoram_w"],
      "xevious_state.xevious_vh_latch_w": methods["xevious_vh_latch_w"],
      "xevious_state.xevious_bs_w": methods["xevious_bs_w"],
      "xevious_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "xevious_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "xevious_state.screen_update_xevious": methods["screen_update_xevious"],
      "xevious_state.draw_sprites": methods["draw_sprites"],
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
