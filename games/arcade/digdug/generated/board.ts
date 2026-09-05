// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'digdug');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_digdug_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
  }

  function method_earom_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_earom.set_address"] ? runtime.calls["m_earom.set_address"](((offset) & (63))) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_address?.(((offset) & (63))) ?? 0) : (runtime.calls["set_address"]?.(((offset) & (63))) ?? 0));
    (runtime.calls["m_earom.set_data"] ? runtime.calls["m_earom.set_data"](data) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_data?.(data) ?? 0) : (runtime.calls["set_data"]?.(data) ?? 0));
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_digdug_objram = members.m_digdug_objram ?? runtime.member("m_digdug_objram");
    const h_m_digdug_posram = members.m_digdug_posram ?? runtime.member("m_digdug_posram");
    const h_m_digdug_flpram = members.m_digdug_flpram ?? runtime.member("m_digdug_flpram");
    let spriteram: any = runtime.addressOf(h_m_digdug_objram, 896);
    let spriteram_2: any = runtime.addressOf(h_m_digdug_posram, 896);
    let spriteram_3: any = runtime.addressOf(h_m_digdug_flpram, 896);
    let offs: any = 0;
    let visarea: any = Object.assign(Object.create(Object.getPrototypeOf(cliprect)), cliprect);
    visarea.min_x = ((2) * (8));
    visarea.max_x = ((((34) * (8))) - (1));
    for (offs = 0; ((Number(offs) < Number(128)) ? 1 : 0); offs = ((offs) + (2))) {
      let sprite: any = runtime.readIndex(spriteram, offs);
      let color: any = ((runtime.readIndex(spriteram, ((offs) + (1)))) & (63));
      let sx: any = runtime.add(((runtime.readIndex(spriteram_2, ((offs) + (1)))) - (40)), 1);
      let sy: any = runtime.add(((256) - (runtime.readIndex(spriteram_2, offs))), 1);
      let flipx: any = ((runtime.readIndex(spriteram_3, offs)) & (1));
      let flipy: any = ((((runtime.readIndex(spriteram_3, offs)) & (2))) >>> (1));
      let size: any = ((((sprite) & (128))) >>> (7));
      let x: any = 0;
      let y: any = 0;
      if (size) {
        sprite = ((((sprite) & (192))) | (((((sprite) & ((~192)))) << (2))));
      }
      sy = ((sy) - (((16) * (size))));
      sy = ((((sy) & (255))) - (32));
      if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
        flipx = ((flipx) ^ (1));
        flipy = ((flipy) ^ (1));
      }
      for (y = 0; ((Number(y) <= Number(size)) ? 1 : 0); y = ((y) + (1))) {
        for (x = 0; ((Number(x) <= Number(size)) ? 1 : 0); x = ((x) + (1))) {
          let transmask: any = (((runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 31) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 31) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 31) ?? 0))) >>> 0);
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, visarea, ((sprite) + (([0, 1, 2, 3][(((runtime.add(((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((((sx) + (((16) * (x))))) & (255)), ((sy) + (((16) * (y)))), transmask) ?? 0);
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, visarea, ((sprite) + (([0, 1, 2, 3][(((runtime.add(((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, runtime.add(((((sx) + (((16) * (x))))) & (255)), 256), ((sy) + (((16) * (y)))), transmask) ?? 0);
        }
      }
    }
  }
  return {
    "digdug_videoram_w": method_digdug_videoram_w,
    "earom_write": method_earom_write,
    "irq1_clear_w": method_irq1_clear_w,
    "irq2_clear_w": method_irq2_clear_w,
    "nmion_w": method_nmion_w,
    "vblank_irq": method_vblank_irq,
    "draw_sprites": method_draw_sprites
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
  function method_digdug_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
  }

  function method_earom_read(runtime: any) {
    const members = runtime.members;
    return (runtime.calls["m_earom.data"] ? runtime.calls["m_earom.data"]() : (members.m_earom) != null ? (typeof (runtime.dereference(members.m_earom)).data === 'function' ? (runtime.dereference(members.m_earom)).data() : typeof (runtime.dereference(members.m_earom)).data === 'number' || typeof (runtime.dereference(members.m_earom)).data === 'boolean' ? (runtime.dereference(members.m_earom)).data : runtime.container(members.m_earom, "data")) : (runtime.calls["data"]?.() ?? 0));
  }

  function method_earom_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_earom.set_address"] ? runtime.calls["m_earom.set_address"](((offset) & (63))) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_address?.(((offset) & (63))) ?? 0) : (runtime.calls["set_address"]?.(((offset) & (63))) ?? 0));
    (runtime.calls["m_earom.set_data"] ? runtime.calls["m_earom.set_data"](data) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_data?.(data) ?? 0) : (runtime.calls["set_data"]?.(data) ?? 0));
  }

  function method_earom_control_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_earom.set_control"] ? runtime.calls["m_earom.set_control"]((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1)) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_control?.((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1)) ?? 0) : (runtime.calls["set_control"]?.((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1)) ?? 0));
    (runtime.calls["m_earom.set_clk"] ? runtime.calls["m_earom.set_clk"]((((data) >>> (0)) & 1)) : (members.m_earom) != null ? ((runtime.dereference(members.m_earom)).set_clk?.((((data) >>> (0)) & 1)) ?? 0) : (runtime.calls["set_clk"]?.((((data) >>> (0)) & 1)) ?? 0));
  }

  function method_tilemap_scan(runtime: any, col: any, row: any, num_cols: any, num_rows: any) {
    const members = runtime.members;
    row = ((((row) + (2))) >>> 0);
    col = ((((col) - (2))) >>> 0);
    if (((col) & (32))) {
      return ((row) + (((((col) & (31))) << (5))));
    } else {
      return ((col) + (((row) << (5))));
    }
  }

  function method_tx_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & 0xff);
    let color: any = 0;
    if ((members.m_tx_color_mode ?? runtime.member("m_tx_color_mode"))) {
      color = ((code) & (15));
    } else {
      color = ((((((code) >>> (4))) & (14))) | (((((code) >>> (3))) & (2))));
    }
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, ((((code) & (127))) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0)))), color, (((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((((code) & (127))) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0)))), color, (((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) ?? 0) : (runtime.calls["set"]?.(0, ((((code) & (127))) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0)))), color, (((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) ?? 0));
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_digdug_objram = members.m_digdug_objram ?? runtime.member("m_digdug_objram");
    const h_m_digdug_posram = members.m_digdug_posram ?? runtime.member("m_digdug_posram");
    const h_m_digdug_flpram = members.m_digdug_flpram ?? runtime.member("m_digdug_flpram");
    let spriteram: any = runtime.addressOf(h_m_digdug_objram, 896);
    let spriteram_2: any = runtime.addressOf(h_m_digdug_posram, 896);
    let spriteram_3: any = runtime.addressOf(h_m_digdug_flpram, 896);
    let offs: any = 0;
    let visarea: any = Object.assign(Object.create(Object.getPrototypeOf(cliprect)), cliprect);
    visarea.min_x = ((2) * (8));
    visarea.max_x = ((((34) * (8))) - (1));
    for (offs = 0; ((Number(offs) < Number(128)) ? 1 : 0); offs = ((offs) + (2))) {
      let sprite: any = runtime.readIndex(spriteram, offs);
      let color: any = ((runtime.readIndex(spriteram, ((offs) + (1)))) & (63));
      let sx: any = runtime.add(((runtime.readIndex(spriteram_2, ((offs) + (1)))) - (40)), 1);
      let sy: any = runtime.add(((256) - (runtime.readIndex(spriteram_2, offs))), 1);
      let flipx: any = ((runtime.readIndex(spriteram_3, offs)) & (1));
      let flipy: any = ((((runtime.readIndex(spriteram_3, offs)) & (2))) >>> (1));
      let size: any = ((((sprite) & (128))) >>> (7));
      let x: any = 0;
      let y: any = 0;
      if (size) {
        sprite = ((((sprite) & (192))) | (((((sprite) & ((~192)))) << (2))));
      }
      sy = ((sy) - (((16) * (size))));
      sy = ((((sy) & (255))) - (32));
      if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
        flipx = ((flipx) ^ (1));
        flipy = ((flipy) ^ (1));
      }
      for (y = 0; ((Number(y) <= Number(size)) ? 1 : 0); y = ((y) + (1))) {
        for (x = 0; ((Number(x) <= Number(size)) ? 1 : 0); x = ((x) + (1))) {
          let transmask: any = (((runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 31) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 31) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 31) ?? 0))) >>> 0);
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, visarea, ((sprite) + (([0, 1, 2, 3][(((runtime.add(((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((((sx) + (((16) * (x))))) & (255)), ((sy) + (((16) * (y)))), transmask) ?? 0);
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, visarea, ((sprite) + (([0, 1, 2, 3][(((runtime.add(((((y) ^ (((size) * (flipy))))) * (2)), ((x) ^ (((size) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, runtime.add(((((sx) + (((16) * (x))))) & (255)), 256), ((sy) + (((16) * (y)))), transmask) ?? 0);
        }
      }
    }
  }

  function method_bg_select_w(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number((members.m_bg_select ?? runtime.member("m_bg_select"))) !== Number(((data) & (3)))) ? 1 : 0)) {
      members.m_bg_select = ((((data) & (3))) & 0xff);
      (runtime.calls["m_bg_tilemap.mark_all_dirty"] ? runtime.calls["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
    }
    if (((Number((members.m_bg_color_bank ?? runtime.member("m_bg_color_bank"))) !== Number(((data) & (48)))) ? 1 : 0)) {
      members.m_bg_color_bank = ((((data) & (48))) & 0xff);
      (runtime.calls["m_bg_tilemap.mark_all_dirty"] ? runtime.calls["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
    }
  }

  function method_tx_color_mode_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_tx_color_mode = ((state) & 0xff);
    (runtime.calls["m_fg_tilemap.mark_all_dirty"] ? runtime.calls["m_fg_tilemap.mark_all_dirty"]() : (members.m_fg_tilemap) != null ? (typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty : runtime.container(members.m_fg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
  }

  function method_bg_disable_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_bg_disable = ((state) & 0xff);
    (runtime.calls["m_bg_tilemap.mark_all_dirty"] ? runtime.calls["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
  }

  function method_screen_update_digdug(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }
  return {
    "digdug_videoram_w": method_digdug_videoram_w,
    "earom_read": method_earom_read,
    "earom_write": method_earom_write,
    "earom_control_w": method_earom_control_w,
    "tilemap_scan": method_tilemap_scan,
    "tx_get_tile_info": method_tx_get_tile_info,
    "draw_sprites": method_draw_sprites,
    "bg_select_w": method_bg_select_w,
    "tx_color_mode_w": method_tx_color_mode_w,
    "bg_disable_w": method_bg_disable_w,
    "screen_update_digdug": method_screen_update_digdug
  };
})();
    return {
      "digdug_state.digdug_videoram_w": methods["digdug_videoram_w"],
      "digdug_state.earom_read": methods["earom_read"],
      "digdug_state.earom_write": methods["earom_write"],
      "digdug_state.earom_control_w": methods["earom_control_w"],
      "digdug_state.tilemap_scan": methods["tilemap_scan"],
      "digdug_state.tx_get_tile_info": methods["tx_get_tile_info"],
      "digdug_state.draw_sprites": methods["draw_sprites"],
      "digdug_state.bg_select_w": methods["bg_select_w"],
      "digdug_state.tx_color_mode_w": methods["tx_color_mode_w"],
      "digdug_state.bg_disable_w": methods["bg_disable_w"],
      "digdug_state.screen_update_digdug": methods["screen_update_digdug"],
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
