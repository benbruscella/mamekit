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


  function method_centiped_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_centiped_IN0_r(runtime: any): any {
    const members = runtime.members;

    return runtime.invoke("read_trackball", 0, 0);
  }

  function method_centiped_IN2_r(runtime: any): any {
    const members = runtime.members;

    return runtime.invoke("read_trackball", 1, 2);
  }

  function method_centiped_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    if (((offset) & (4))) {
      let color: any = 0;
      let r: any = ((((255) * (((runtime.shiftRight((~data), 0)) & (1))))) | 0);
      let g: any = ((((255) * (((runtime.shiftRight((~data), 1)) & (1))))) | 0);
      let b: any = ((((255) * (((runtime.shiftRight((~data), 2)) & (1))))) | 0);
      if ((((~data)) & (8))) {
        if (b) {
          b = ((192) | 0);
        } else {
          if (g) {
            g = ((192) | 0);
          }
        }
      }
      color = (__l["rgb_t"] ? __l["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b));
      if (((Number(((offset) & (8))) === Number(0)) ? 1 : 0)) {
        (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) & (3)), color);
      } else {
        let i: any = ((0) | 0);
        offset = ((offset) & (3));
        for (i = ((0) | 0); ((Number(i) < Number(256)) ? 1 : 0); i = ((((i) + (4))) | 0)) {
          if (((Number(offset) === Number(((runtime.shiftRight(i, 2)) & (3)))) ? 1 : 0)) {
            (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(runtime.add(((i) + (4)), 1), color);
          }
          if (((Number(offset) === Number(((runtime.shiftRight(i, 4)) & (3)))) ? 1 : 0)) {
            (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(runtime.add(((i) + (4)), 2), color);
          }
          if (((Number(offset) === Number(((runtime.shiftRight(i, 6)) & (3)))) ? 1 : 0)) {
            (__l["m_palette.set_pen_color"] ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(runtime.add(((i) + (4)), 3), color);
          }
        }
      }
    }
  }

  function method_earom_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_earom.set_address"] ?? runtime.memberCall(members.m_earom, "set_address", 0, undefined))(((offset) & (63)));
    (__l["m_earom.set_data"] ?? runtime.memberCall(members.m_earom, "set_data", 0, undefined))(data);
  }

  function method_earom_control_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_earom.set_control"] ?? runtime.memberCall(members.m_earom, "set_control", 0, undefined))((((data) >>> (3)) & 1), 1, (((((data) >>> (1)) & 1)) ? 0 : 1), (((data) >>> (2)) & 1));
    (__l["m_earom.set_clk"] ?? runtime.memberCall(members.m_earom, "set_clk", 0, undefined))((((data) >>> (0)) & 1));
  }

  function method_earom_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["m_earom.data"] ?? runtime.memberCall(members.m_earom, "data", 0, undefined))();
  }

  function method_irq_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
  }

  function method_centiped_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, runtime.add(((data) & (63)), 64), 0, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](runtime.shiftRight(data, 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(data, 6))));
  }

  function method_generate_interrupt(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let scanline: any = ((param) | 0);
    if (((scanline) & (16))) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((((scanline) - (1))) & (32))) ? (1) : (0)));
    }
    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))(scanline);
  }

  function method_screen_update_centiped(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let spriteclip: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
    (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
      spriteclip.min_x = ((spriteclip.min_x) + (8));
    } else {
      spriteclip.max_x = ((spriteclip.max_x) - (8));
    }
    for (let offs: any = ((0) | 0); ((Number(offs) < Number(16)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
      let code: any = ((((runtime.shiftRight(((runtime.readIndex(h_m_spriteram, offs)) & (62)), 1)) | (((((runtime.readIndex(h_m_spriteram, offs)) & (1))) << (6))))) | 0);
      let color: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (48)))) | 0);
      let flipx: any = ((((runtime.shiftRight(runtime.readIndex(h_m_spriteram, offs), 6)) & (1))) | 0);
      let flipy: any = ((((runtime.shiftRight(runtime.readIndex(h_m_spriteram, offs), 7)) & (1))) | 0);
      let x: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (32)))) | 0);
      let y: any = ((((240) - (runtime.readIndex(h_m_spriteram, ((offs) + (16)))))) | 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).transmask?.(bitmap, spriteclip, code, color, flipx, flipy, x, y, runtime.readIndex((members.m_penmask ?? runtime.member("m_penmask")), ((color) & (63)))) ?? 0);
    }
    return 0;
  }

  function method_flip_screen_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_flipscreen = ((state) & 0xff);
  }
  return {
    "centiped_videoram_w": method_centiped_videoram_w,
    "centiped_IN0_r": method_centiped_IN0_r,
    "centiped_IN2_r": method_centiped_IN2_r,
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
      "centiped_state.centiped_IN0_r": methods["centiped_IN0_r"],
      "centiped_state.centiped_IN2_r": methods["centiped_IN2_r"],
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
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","draw","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_earom.data","m_earom.set_address","m_earom.set_clk","m_earom.set_control","m_earom.set_data","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.set_pen_color","m_screen.update_partial","mark_tile_dirty","rgb_t","set","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
