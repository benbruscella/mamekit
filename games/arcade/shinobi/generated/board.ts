// GENERATED executable machine composition from src/mame/sega/segas16a.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'shinobi');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {

  function method_tileram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_tileram ?? runtime.member("m_tileram")), offset);
  }

  function method_textram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_textram ?? runtime.member("m_textram")), offset);
  }

  function method_misc_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["m_custom_io_r"] ? __l["m_custom_io_r"](offset) : runtime.macro("m_custom_io_r", offset));
  }

  function method_misc_io_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_custom_io_w"] ? __l["m_custom_io_w"](offset, data, mem_mask) : runtime.macro("m_custom_io_w", offset, data, mem_mask));
  }

  function method_sound_data_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_i8255.pc6_w"] ? __l["m_i8255.pc6_w"](0) : (members.m_i8255) != null ? ((runtime.dereference(members.m_i8255)).pc6_w?.(0) ?? 0) : 0);
    return (__l["m_soundlatch.read"] ? __l["m_soundlatch.read"]() : (members.m_soundlatch) != null ? (typeof (runtime.dereference(members.m_soundlatch)).read === 'function' ? (runtime.dereference(members.m_soundlatch)).read() : typeof (runtime.dereference(members.m_soundlatch)).read === 'number' || typeof (runtime.dereference(members.m_soundlatch)).read === 'boolean' ? (runtime.dereference(members.m_soundlatch)).read : runtime.container(members.m_soundlatch, "read")) : 0);
  }

  function method_upd7751_p2_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((128) | ((((((members.m_upd7751_command ?? runtime.member("m_upd7751_command"))) & (7))) << (4))))) | ((((__l["m_upd7751_i8243.p2_r"] ? __l["m_upd7751_i8243.p2_r"]() : (members.m_upd7751_i8243) != null ? (typeof (runtime.dereference(members.m_upd7751_i8243)).p2_r === 'function' ? (runtime.dereference(members.m_upd7751_i8243)).p2_r() : typeof (runtime.dereference(members.m_upd7751_i8243)).p2_r === 'number' || typeof (runtime.dereference(members.m_upd7751_i8243)).p2_r === 'boolean' ? (runtime.dereference(members.m_upd7751_i8243)).p2_r : runtime.container(members.m_upd7751_i8243, "p2_r")) : 0)) & (15))));
  }

  function method_upd7751_p2_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_upd7751_i8243.p2_w"] ? __l["m_upd7751_i8243.p2_w"](((data) & (15))) : (members.m_upd7751_i8243) != null ? ((runtime.dereference(members.m_upd7751_i8243)).p2_w?.(((data) & (15))) ?? 0) : 0);
  }

  function method_upd7751_rom_offset_w_0(runtime: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((((15) << (0))) & (16383))) | 0);
    let newdata: any = ((((((data) << (0))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_4(runtime: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((((15) << (4))) & (16383))) | 0);
    let newdata: any = ((((((data) << (4))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_8(runtime: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((((15) << (8))) & (16383))) | 0);
    let newdata: any = ((((((data) << (8))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_12(runtime: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((((15) << (12))) & (16383))) | 0);
    let newdata: any = ((((((data) << (12))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_tilemap_sound_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_soundcpu.set_input_line"] ? __l["m_soundcpu.set_input_line"](-1, ((((data) & (128))) ? (0) : (1))) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(-1, ((((data) & (128))) ? (0) : (1))) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_set_colscroll"] ? __l["m_segaic16vid.tilemap_set_colscroll"](0, (((~data)) & (4))) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_set_colscroll?.(0, (((~data)) & (4))) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_set_rowscroll"] ? __l["m_segaic16vid.tilemap_set_rowscroll"](0, (((~data)) & (2))) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_set_rowscroll?.(0, (((~data)) & (2))) ?? 0) : 0);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_segaic16vid = members.m_segaic16vid ?? runtime.member("m_segaic16vid");
    if (((h_m_segaic16vid.m_display_enable) ? 0 : 1)) {
      (__l["bitmap.fill"] ? __l["bitmap.fill"]((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0) : (__l["fill"]?.((__l["m_palette.black_pen"] ? __l["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : 0), cliprect) ?? 0));
      return 0;
    }
    (__l["m_sprites.draw_async"] ? __l["m_sprites.draw_async"](cliprect) : (members.m_sprites) != null ? ((runtime.dereference(members.m_sprites)).draw_async?.(cliprect) ?? 0) : 0);
    ((runtime.dereference((__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0)))).fill?.(0, cliprect) ?? 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 1, ((0) | (128)), 0) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 1, ((0) | (128)), 0) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 1, ((1) | (128)), 0) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 1, ((1) | (128)), 0) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 1, 0, 1) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 1, 0, 1) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 1, 1, 2) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 1, 1, 2) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 0, 0, 2) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 0, 0, 2) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 0, 1, 4) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 0, 1, 4) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 2, 0, 4) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 2, 0, 4) ?? 0) : 0);
    (__l["m_segaic16vid.tilemap_draw"] ? __l["m_segaic16vid.tilemap_draw"](screen, bitmap, cliprect, 0, 2, 1, 8) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_draw?.(screen, bitmap, cliprect, 0, 2, 1, 8) ?? 0) : 0);
    let sprites: any = (__l["m_sprites.bitmap"] ? __l["m_sprites.bitmap"]() : (members.m_sprites) != null ? (typeof (runtime.dereference(members.m_sprites)).bitmap === 'function' ? (runtime.dereference(members.m_sprites)).bitmap() : typeof (runtime.dereference(members.m_sprites)).bitmap === 'number' || typeof (runtime.dereference(members.m_sprites)).bitmap === 'boolean' ? (runtime.dereference(members.m_sprites)).bitmap : runtime.container(members.m_sprites, "bitmap")) : 0);
    (__l["m_sprites.iterate_dirty_rects"] ? __l["m_sprites.iterate_dirty_rects"](cliprect, ((rect: any) => {
      for (let y: any = ((rect.min_y) | 0); ((Number(y) <= Number(rect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let dest: any = bitmap["pix&"](y);
        let src: any = sprites["pix&"](y);
        let pri: any = (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0))["pix&"](y);
        for (let x: any = ((rect.min_x) | 0); ((Number(x) <= Number(rect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          let pix: any = ((runtime.readIndex(src, x)) & 0xffff);
          if (((Number(pix) !== Number(65535)) ? 1 : 0)) {
            let priority: any = ((runtime.shiftRight(pix, 10)) | 0);
            if (((Number(((1) << (priority))) > Number(runtime.readIndex(pri, x))) ? 1 : 0)) {
              if (((Number(((pix) & (1008))) === Number(1008)) ? 1 : 0)) {
                runtime.writeIndex(dest, x, ((runtime.readIndex(dest, x)) + ((members.m_palette_entries ?? runtime.member("m_palette_entries")))));
              } else {
                runtime.writeIndex(dest, x, ((1024) | (((pix) & (1023)))));
              }
            }
          }
        }
      }
    })) : (members.m_sprites) != null ? ((runtime.dereference(members.m_sprites)).iterate_dirty_rects?.(cliprect, ((rect: any) => {
      for (let y: any = ((rect.min_y) | 0); ((Number(y) <= Number(rect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let dest: any = bitmap["pix&"](y);
        let src: any = sprites["pix&"](y);
        let pri: any = (__l["screen.priority"] ? __l["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (__l["priority"]?.() ?? 0))["pix&"](y);
        for (let x: any = ((rect.min_x) | 0); ((Number(x) <= Number(rect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          let pix: any = ((runtime.readIndex(src, x)) & 0xffff);
          if (((Number(pix) !== Number(65535)) ? 1 : 0)) {
            let priority: any = ((runtime.shiftRight(pix, 10)) | 0);
            if (((Number(((1) << (priority))) > Number(runtime.readIndex(pri, x))) ? 1 : 0)) {
              if (((Number(((pix) & (1008))) === Number(1008)) ? 1 : 0)) {
                runtime.writeIndex(dest, x, ((runtime.readIndex(dest, x)) + ((members.m_palette_entries ?? runtime.member("m_palette_entries")))));
              } else {
                runtime.writeIndex(dest, x, ((1024) | (((pix) & (1023)))));
              }
            }
          }
        }
      }
    })) ?? 0) : 0);
    return 0;
  }
  return {
    "tileram_r": method_tileram_r,
    "textram_r": method_textram_r,
    "misc_io_r": method_misc_io_r,
    "misc_io_w": method_misc_io_w,
    "sound_data_r": method_sound_data_r,
    "upd7751_p2_r": method_upd7751_p2_r,
    "upd7751_p2_w": method_upd7751_p2_w,
    "upd7751_rom_offset_w_0": method_upd7751_rom_offset_w_0,
    "upd7751_rom_offset_w_4": method_upd7751_rom_offset_w_4,
    "upd7751_rom_offset_w_8": method_upd7751_rom_offset_w_8,
    "upd7751_rom_offset_w_12": method_upd7751_rom_offset_w_12,
    "tilemap_sound_w": method_tilemap_sound_w,
    "screen_update": method_screen_update
  };
})();
    return {
      "segas16a_state.misc_io_r": methods["misc_io_r"],
      "segas16a_state.misc_io_w": methods["misc_io_w"],
      "segas16a_state.sound_data_r": methods["sound_data_r"],
      "segas16a_state.upd7751_p2_r": methods["upd7751_p2_r"],
      "segas16a_state.upd7751_p2_w": methods["upd7751_p2_w"],
      "segas16a_state.upd7751_rom_offset_w_0": methods["upd7751_rom_offset_w_0"],
      "segas16a_state.upd7751_rom_offset_w_4": methods["upd7751_rom_offset_w_4"],
      "segas16a_state.upd7751_rom_offset_w_8": methods["upd7751_rom_offset_w_8"],
      "segas16a_state.upd7751_rom_offset_w_12": methods["upd7751_rom_offset_w_12"],
      "segas16a_state.tilemap_sound_w": methods["tilemap_sound_w"],
      "segas16a_state.screen_update": methods["screen_update"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","fill","m_custom_io_r","m_custom_io_w","m_i8255.pc6_w","m_palette.black_pen","m_segaic16vid.tilemap_draw","m_segaic16vid.tilemap_set_colscroll","m_segaic16vid.tilemap_set_rowscroll","m_soundcpu.set_input_line","m_soundlatch.read","m_sprites.bitmap","m_sprites.draw_async","m_sprites.iterate_dirty_rects","m_upd7751_i8243.p2_r","m_upd7751_i8243.p2_w","priority","screen.priority"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
