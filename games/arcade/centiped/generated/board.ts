// GENERATED executable machine composition from src/mame/atari/centiped.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'centiped');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_centiped_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_centiped_paletteram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    if (((offset) & (4))) {
      let color: any = 0;
      let r: any = ((255) * ((((((~data)) >>> (0))) & (1))));
      let g: any = ((255) * ((((((~data)) >>> (1))) & (1))));
      let b: any = ((255) * ((((((~data)) >>> (2))) & (1))));
      if ((((~data)) & (8))) {
        if (b) {
          b = 192;
        } else {
          if (g) {
            g = 192;
          }
        }
      }
      color = (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b));
      if (((Number(((offset) & (8))) === Number(0)) ? 1 : 0)) {
        (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](((offset) & (3)), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((offset) & (3)), color) ?? 0) : (runtime.calls["set_pen_color"]?.(((offset) & (3)), color) ?? 0));
      } else {
        let i: any = 0;
        offset = ((offset) & (3));
        for (i = 0; ((Number(i) < Number(256)) ? 1 : 0); i = ((i) + (4))) {
          if (((Number(offset) === Number(((((i) >>> (2))) & (3)))) ? 1 : 0)) {
            (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](runtime.add(((i) + (4)), 1), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.add(((i) + (4)), 1), color) ?? 0) : (runtime.calls["set_pen_color"]?.(runtime.add(((i) + (4)), 1), color) ?? 0));
          }
          if (((Number(offset) === Number(((((i) >>> (4))) & (3)))) ? 1 : 0)) {
            (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](runtime.add(((i) + (4)), 2), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.add(((i) + (4)), 2), color) ?? 0) : (runtime.calls["set_pen_color"]?.(runtime.add(((i) + (4)), 2), color) ?? 0));
          }
          if (((Number(offset) === Number(((((i) >>> (6))) & (3)))) ? 1 : 0)) {
            (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](runtime.add(((i) + (4)), 3), color) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(runtime.add(((i) + (4)), 3), color) ?? 0) : (runtime.calls["set_pen_color"]?.(runtime.add(((i) + (4)), 3), color) ?? 0));
          }
        }
      }
    }
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

  function method_earom_read(runtime: any) {
    const members = runtime.members;
    return (runtime.calls["m_earom.data"] ? runtime.calls["m_earom.data"]() : (members.m_earom) != null ? (typeof (runtime.dereference(members.m_earom)).data === 'function' ? (runtime.dereference(members.m_earom)).data() : typeof (runtime.dereference(members.m_earom)).data === 'number' || typeof (runtime.dereference(members.m_earom)).data === 'boolean' ? (runtime.dereference(members.m_earom)).data : runtime.container(members.m_earom, "data")) : (runtime.calls["data"]?.() ?? 0));
  }

  function method_irq_ack_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
  }

  function method_centiped_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let data: any = runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index);
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, runtime.add(((data) & (63)), 64), 0, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((data) >>> (6))) : runtime.macro("TILE_FLIPYX", ((data) >>> (6))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, runtime.add(((data) & (63)), 64), 0, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((data) >>> (6))) : runtime.macro("TILE_FLIPYX", ((data) >>> (6))))) ?? 0) : (runtime.calls["set"]?.(0, runtime.add(((data) & (63)), 64), 0, (runtime.calls["TILE_FLIPYX"] ? runtime.calls["TILE_FLIPYX"](((data) >>> (6))) : runtime.macro("TILE_FLIPYX", ((data) >>> (6))))) ?? 0));
  }

  function method_generate_interrupt(runtime: any, param: any) {
    const members = runtime.members;
    let scanline: any = param;
    if (((scanline) & (16))) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, ((((((scanline) - (1))) & (32))) ? (1) : (0))) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, ((((((scanline) - (1))) & (32))) ? (1) : (0))) ?? 0) : (runtime.calls["set_input_line"]?.(0, ((((((scanline) - (1))) & (32))) ? (1) : (0))) ?? 0));
    }
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"](scanline) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.(scanline) ?? 0) : (runtime.calls["update_partial"]?.(scanline) ?? 0));
  }

  function method_screen_update_centiped(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let spriteclip: any = Object.assign(Object.create(Object.getPrototypeOf(cliprect)), cliprect);
    (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
    if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
      spriteclip.min_x = ((spriteclip.min_x) + (8));
    } else {
      spriteclip.max_x = ((spriteclip.max_x) - (8));
    }
    for (let offs: any = 0; ((Number(offs) < Number(16)) ? 1 : 0); offs = ((offs) + (1))) {
      let code: any = ((((((runtime.readIndex(h_m_spriteram, offs)) & (62))) >>> (1))) | (((((runtime.readIndex(h_m_spriteram, offs)) & (1))) << (6))));
      let color: any = runtime.readIndex(h_m_spriteram, ((offs) + (48)));
      let flipx: any = ((((runtime.readIndex(h_m_spriteram, offs)) >>> (6))) & (1));
      let flipy: any = ((((runtime.readIndex(h_m_spriteram, offs)) >>> (7))) & (1));
      let x: any = runtime.readIndex(h_m_spriteram, ((offs) + (32)));
      let y: any = ((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (16)))));
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, spriteclip, code, color, flipx, flipy, x, y, runtime.readIndex((members.m_penmask ?? runtime.member("m_penmask")), ((color) & (63)))) ?? 0);
    }
    return 0;
  }

  function method_flip_screen_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_flipscreen = ((state) & 0xff);
  }
  return {
    "centiped_videoram_w": method_centiped_videoram_w,
    "centiped_paletteram_w": method_centiped_paletteram_w,
    "earom_write": method_earom_write,
    "earom_control_w": method_earom_control_w,
    "earom_read": method_earom_read,
    "irq_ack_w": method_irq_ack_w,
    "centiped_get_tile_info": method_centiped_get_tile_info,
    "generate_interrupt": method_generate_interrupt,
    "screen_update_centiped": method_screen_update_centiped,
    "flip_screen_w": method_flip_screen_w
  };
})();
    return {
      "centiped_state.centiped_videoram_w": methods["centiped_videoram_w"],
      "centiped_state.centiped_paletteram_w": methods["centiped_paletteram_w"],
      "centiped_state.earom_write": methods["earom_write"],
      "centiped_state.earom_control_w": methods["earom_control_w"],
      "centiped_state.earom_read": methods["earom_read"],
      "centiped_state.irq_ack_w": methods["irq_ack_w"],
      "centiped_state.centiped_get_tile_info": methods["centiped_get_tile_info"],
      "centiped_state.generate_interrupt": methods["generate_interrupt"],
      "centiped_state.screen_update_centiped": methods["screen_update_centiped"],
      "centiped_state.flip_screen_w": methods["flip_screen_w"],
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
