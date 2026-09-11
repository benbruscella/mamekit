// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'galaga');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  const __mame_table_0 = [0, 1, 2, 3];
  function method_galaga_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
  }

  function method_irq1_clear_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_main_irq_mask = ((state) & 0xff);
    if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
    }
  }

  function method_irq2_clear_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_sub_irq_mask = ((state) & 0xff);
    if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
      (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](0, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 0) ?? 0) : 0);
    }
  }

  function method_nmion_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
  }

  function method_get_next_lfsr_state(runtime: any, lfsr: any): any {
    const members = runtime.members;

    let bit: any = ((0) & 0xffff);
    bit = ((((((((((lfsr) >>> (0))) ^ (((lfsr) >>> (3))))) ^ (((lfsr) >>> (5))))) ^ (((lfsr) >>> (10))))) & 0xffff);
    lfsr = ((((((lfsr) >>> (1))) | (((bit) << (15))))) & 0xffff);
    return lfsr;
  }

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
    }
    if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
      (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](0, 1) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 1) ?? 0) : 0);
    }
  }

  function method_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let color: any = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((tile_index) + (1024)))) & (63))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) ?? 0) : (__l["set"]?.(0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) ?? 0));
    tileinfo.group = color;
  }

  function method_tilemap_scan(runtime: any, col: any, row: any, num_cols: any, num_rows: any): any {
    const members = runtime.members;

    row = ((((row) + (2))) >>> 0);
    col = ((((col) - (2))) >>> 0);
    if (((col) & (32))) {
      return ((row) + (((((col) & (31))) << (5))));
    } else {
      return ((col) + (((row) << (5))));
    }
  }

  function method_screen_update_galaga(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["bitmap.fill"] ? __l["bitmap.fill"]((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0) : (__l["fill"]?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0));
    (__l["m_starfield.draw_starfield"] ? __l["m_starfield.draw_starfield"](bitmap, cliprect, 0) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).draw_starfield?.(bitmap, cliprect, 0) ?? 0) : 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect) ?? 0));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_galaga_ram1 = members.m_galaga_ram1 ?? runtime.member("m_galaga_ram1");
    const h_m_galaga_ram2 = members.m_galaga_ram2 ?? runtime.member("m_galaga_ram2");
    const h_m_galaga_ram3 = members.m_galaga_ram3 ?? runtime.member("m_galaga_ram3");
    let spriteram: any = runtime.addressOf(h_m_galaga_ram1, 896);
    let spriteram_2: any = runtime.addressOf(h_m_galaga_ram2, 896);
    let spriteram_3: any = runtime.addressOf(h_m_galaga_ram3, 896);
    for (let offs: any = ((0) | 0); ((Number(offs) < Number(128)) ? 1 : 0); offs = ((((offs) + (2))) | 0)) {
      let sprite: any = ((((runtime.readIndex(spriteram, offs)) & (127))) | 0);
      let color: any = ((((runtime.readIndex(spriteram, ((offs) + (1)))) & (63))) | 0);
      let sx: any = ((runtime.add(((runtime.readIndex(spriteram_2, ((offs) + (1)))) - (40)), ((256) * (((runtime.readIndex(spriteram_3, ((offs) + (1)))) & (3)))))) | 0);
      let sy: any = ((runtime.add(((256) - (runtime.readIndex(spriteram_2, offs))), 1)) | 0);
      let flipx: any = ((((runtime.readIndex(spriteram_3, offs)) & (1))) | 0);
      let flipy: any = ((((((runtime.readIndex(spriteram_3, offs)) & (2))) >>> (1))) | 0);
      let sizex: any = ((((((runtime.readIndex(spriteram_3, offs)) & (4))) >>> (2))) | 0);
      let sizey: any = ((((((runtime.readIndex(spriteram_3, offs)) & (8))) >>> (3))) | 0);
      sy = ((((sy) - (((16) * (sizey))))) | 0);
      sy = ((((((sy) & (255))) - (32))) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        flipx = ((((flipx) ^ (1))) | 0);
        flipy = ((((flipy) ^ (1))) | 0);
      }
      for (let y: any = ((0) | 0); ((Number(y) <= Number(sizey)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        for (let x: any = ((0) | 0); ((Number(x) <= Number(sizex)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transmask?.(bitmap, cliprect, ((sprite) + ((__mame_table_0[(((runtime.add(((((y) ^ (((sizey) * (flipy))))) * (2)), ((x) ^ (((sizex) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((sx) + (((16) * (x)))), ((sy) + (((16) * (y)))), (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), color, 15) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), color, 15) ?? 0) : 0)) ?? 0);
        }
      }
    }
  }

  function method_screen_vblank_galaga(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((state) ? 0 : 1)) {
      let speed_index_X: any = (((((((((__l["m_videolatch.q2_r"] ? __l["m_videolatch.q2_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q2_r === 'function' ? (runtime.dereference(members.m_videolatch)).q2_r() : typeof (runtime.dereference(members.m_videolatch)).q2_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q2_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q2_r : runtime.container(members.m_videolatch, "q2_r")) : 0)) << (2))) | ((((__l["m_videolatch.q1_r"] ? __l["m_videolatch.q1_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q1_r === 'function' ? (runtime.dereference(members.m_videolatch)).q1_r() : typeof (runtime.dereference(members.m_videolatch)).q1_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q1_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q1_r : runtime.container(members.m_videolatch, "q1_r")) : 0)) << (1))))) | ((((__l["m_videolatch.q0_r"] ? __l["m_videolatch.q0_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q0_r === 'function' ? (runtime.dereference(members.m_videolatch)).q0_r() : typeof (runtime.dereference(members.m_videolatch)).q0_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q0_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q0_r : runtime.container(members.m_videolatch, "q0_r")) : 0)) << (0))))) & 0xff);
      let speed_index_Y: any = ((0) & 0xff);
      (__l["m_starfield.set_scroll_speed"] ? __l["m_starfield.set_scroll_speed"](speed_index_X, speed_index_Y) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).set_scroll_speed?.(speed_index_X, speed_index_Y) ?? 0) : 0);
      (__l["m_starfield.set_active_starfield_sets"] ? __l["m_starfield.set_active_starfield_sets"]((__l["m_videolatch.q3_r"] ? __l["m_videolatch.q3_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q3_r === 'function' ? (runtime.dereference(members.m_videolatch)).q3_r() : typeof (runtime.dereference(members.m_videolatch)).q3_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q3_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q3_r : runtime.container(members.m_videolatch, "q3_r")) : 0), (((__l["m_videolatch.q4_r"] ? __l["m_videolatch.q4_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q4_r === 'function' ? (runtime.dereference(members.m_videolatch)).q4_r() : typeof (runtime.dereference(members.m_videolatch)).q4_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q4_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q4_r : runtime.container(members.m_videolatch, "q4_r")) : 0)) | (2))) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).set_active_starfield_sets?.((__l["m_videolatch.q3_r"] ? __l["m_videolatch.q3_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q3_r === 'function' ? (runtime.dereference(members.m_videolatch)).q3_r() : typeof (runtime.dereference(members.m_videolatch)).q3_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q3_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q3_r : runtime.container(members.m_videolatch, "q3_r")) : 0), (((__l["m_videolatch.q4_r"] ? __l["m_videolatch.q4_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q4_r === 'function' ? (runtime.dereference(members.m_videolatch)).q4_r() : typeof (runtime.dereference(members.m_videolatch)).q4_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q4_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q4_r : runtime.container(members.m_videolatch, "q4_r")) : 0)) | (2))) ?? 0) : 0);
      (__l["m_starfield.enable_starfield"] ? __l["m_starfield.enable_starfield"]((__l["m_videolatch.q5_r"] ? __l["m_videolatch.q5_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q5_r === 'function' ? (runtime.dereference(members.m_videolatch)).q5_r() : typeof (runtime.dereference(members.m_videolatch)).q5_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q5_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q5_r : runtime.container(members.m_videolatch, "q5_r")) : 0)) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).enable_starfield?.((__l["m_videolatch.q5_r"] ? __l["m_videolatch.q5_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q5_r === 'function' ? (runtime.dereference(members.m_videolatch)).q5_r() : typeof (runtime.dereference(members.m_videolatch)).q5_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q5_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q5_r : runtime.container(members.m_videolatch, "q5_r")) : 0)) ?? 0) : 0);
    }
  }
  return {
    "galaga_videoram_w": method_galaga_videoram_w,
    "irq1_clear_w": method_irq1_clear_w,
    "irq2_clear_w": method_irq2_clear_w,
    "nmion_w": method_nmion_w,
    "get_next_lfsr_state": method_get_next_lfsr_state,
    "vblank_irq": method_vblank_irq,
    "get_tile_info": method_get_tile_info,
    "tilemap_scan": method_tilemap_scan,
    "screen_update_galaga": method_screen_update_galaga,
    "draw_sprites": method_draw_sprites,
    "screen_vblank_galaga": method_screen_vblank_galaga
  };
})();
    return {
      "galaga_state.galaga_videoram_w": methods["galaga_videoram_w"],
      "galaga_state.irq1_clear_w": methods["irq1_clear_w"],
      "galaga_state.irq2_clear_w": methods["irq2_clear_w"],
      "galaga_state.nmion_w": methods["nmion_w"],
      "galaga_state.vblank_irq": methods["vblank_irq"],
      "galaga_state.get_tile_info": methods["get_tile_info"],
      "galaga_state.tilemap_scan": methods["tilemap_scan"],
      "galaga_state.screen_update_galaga": methods["screen_update_galaga"],
      "galaga_state.draw_sprites": methods["draw_sprites"],
      "galaga_state.screen_vblank_galaga": methods["screen_vblank_galaga"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","flip_screen","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.black_pen","m_palette.transpen_mask","m_starfield.draw_starfield","m_starfield.enable_starfield","m_starfield.set_active_starfield_sets","m_starfield.set_scroll_speed","m_subcpu.set_input_line","m_videolatch.q0_r","m_videolatch.q1_r","m_videolatch.q2_r","m_videolatch.q3_r","m_videolatch.q4_r","m_videolatch.q5_r","mark_tile_dirty","set","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
