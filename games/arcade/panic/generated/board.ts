// GENERATED executable machine composition from src/mame/universal/cosmic.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'panic');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_panic_sound_output_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(offset) === Number(11)) ? 1 : 0)) {
      let count: any = 0;
      if (((Number(data) === Number(0)) ? 1 : 0)) {
        for (count = 0; ((Number(count) < Number(9)) ? 1 : 0); count = ((count) + (1))) {
          (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](count) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(count) ?? 0) : (runtime.calls["stop"]?.(count) ?? 0));
        }
      }
      members.m_sound_enabled = ((data) | 0);
    }
    if ((members.m_sound_enabled ?? runtime.member("m_sound_enabled"))) {
      switch (offset) {
        case 0:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](0, 0) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 0) ?? 0) : (runtime.calls["start"]?.(0, 0) ?? 0));
          }
          break;
        }
        case 1:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](0, 5) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 5) ?? 0) : (runtime.calls["start"]?.(0, 5) ?? 0));
          }
          break;
        }
        case 2:
        {
          if (data) {
            if ((((runtime.calls["m_samples.playing"] ? runtime.calls["m_samples.playing"](1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(1) ?? 0) : (runtime.calls["playing"]?.(1) ?? 0))) ? 0 : 1)) {
              (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](2) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(2) ?? 0) : (runtime.calls["stop"]?.(2) ?? 0));
              (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](1, 3) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(1, 3) ?? 0) : (runtime.calls["start"]?.(1, 3) ?? 0));
            }
          } else {
            (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(1) ?? 0) : (runtime.calls["stop"]?.(1) ?? 0));
          }
          break;
        }
        case 3:
        {
          if ((((data) && ((((runtime.calls["m_samples.playing"] ? runtime.calls["m_samples.playing"](6) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(6) ?? 0) : (runtime.calls["playing"]?.(6) ?? 0))) ? 0 : 1))) ? 1 : 0)) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](6, 9, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(6, 9, 1) ?? 0) : (runtime.calls["start"]?.(6, 9, 1) ?? 0));
          }
          break;
        }
        case 4:
        {
          break;
        }
        case 5:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](0, 5) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 5) ?? 0) : (runtime.calls["start"]?.(0, 5) ?? 0));
          }
          break;
        }
        case 6:
        {
          if (((((((data) && ((((runtime.calls["m_samples.playing"] ? runtime.calls["m_samples.playing"](1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(1) ?? 0) : (runtime.calls["playing"]?.(1) ?? 0))) ? 0 : 1))) ? 1 : 0)) && ((((runtime.calls["m_samples.playing"] ? runtime.calls["m_samples.playing"](3) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).playing?.(3) ?? 0) : (runtime.calls["playing"]?.(3) ?? 0))) ? 0 : 1))) ? 1 : 0)) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](2, 2) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(2, 2) ?? 0) : (runtime.calls["start"]?.(2, 2) ?? 0));
          }
          break;
        }
        case 7:
        {
          if (data) {
            (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](2) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(2) ?? 0) : (runtime.calls["stop"]?.(2) ?? 0));
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](3, 4) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(3, 4) ?? 0) : (runtime.calls["start"]?.(3, 4) ?? 0));
          } else {
            (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](3) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(3) ?? 0) : (runtime.calls["stop"]?.(3) ?? 0));
          }
          break;
        }
        case 8:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](0, 1) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 1) ?? 0) : (runtime.calls["start"]?.(0, 1) ?? 0));
          }
          break;
        }
        case 9:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](4, 8) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(4, 8) ?? 0) : (runtime.calls["start"]?.(4, 8) ?? 0));
          } else {
            (runtime.calls["m_samples.stop"] ? runtime.calls["m_samples.stop"](4) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).stop?.(4) ?? 0) : (runtime.calls["stop"]?.(4) ?? 0));
          }
          break;
        }
        case 10:
        {
          (runtime.calls["m_dac.write"] ? runtime.calls["m_dac.write"]((((data) >>> (7)) & 1)) : (members.m_dac) != null ? ((runtime.dereference(members.m_dac)).write?.((((data) >>> (7)) & 1)) ?? 0) : (runtime.calls["write"]?.((((data) >>> (7)) & 1)) ?? 0));
          break;
        }
      }
    }
  }

  function method_cosmic_color_register_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_color_registers"), offset, ((data) ? (1) : (0)));
  }

  function method_flip_screen_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
  }

  function method_panic_sound_output2_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_sound_enabled ?? runtime.member("m_sound_enabled"))) {
      switch (offset) {
        case 0:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](0, 6) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(0, 6) ?? 0) : (runtime.calls["start"]?.(0, 6) ?? 0));
          }
          break;
        }
        case 1:
        {
          if (data) {
            (runtime.calls["m_samples.start"] ? runtime.calls["m_samples.start"](5, 7) : (members.m_samples) != null ? ((runtime.dereference(members.m_samples)).start?.(5, 7) ?? 0) : (runtime.calls["start"]?.(5, 7) ?? 0));
          }
          break;
        }
      }
    }
  }

  function method_screen_update_panic(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"](0, cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(0, cliprect) ?? 0) : (runtime.calls["fill"]?.(0, cliprect) ?? 0));
    (runtime.overrides["draw_bitmap"] ? runtime.overrides["draw_bitmap"](bitmap, cliprect) : method_draw_bitmap(runtime, bitmap, cliprect));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 7, 1) : method_draw_sprites(runtime, bitmap, cliprect, 7, 1));
    return 0;
  }

  function method_draw_bitmap(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    for (let offs: any = 0; ((Number(offs) < Number((members.m_videoram).length)) ? 1 : 0); offs = ((offs) + (1))) {
      let data: any = ((runtime.readIndex(h_m_videoram, offs)) & 0xff);
      let x: any = ((((offs) << (3))) & 0xff);
      let y: any = ((((offs) >>> (5))) & 0xff);
      let pen: any = (runtime.calls["m_map_color"] ? runtime.calls["m_map_color"](x, y) : runtime.macro("m_map_color", x, y));
      for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
        if (((data) & (128))) {
          if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
            bitmap["pix="](((255) - (y)), ((255) - (x)), pen);
          } else {
            bitmap["pix="](y, x, pen);
          }
        }
        x = ((((x) + (1))) & 0xff);
        data = ((((data) << (1))) & 0xff);
      }
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, color_mask: any, extra_sprites: any) {
    const members = runtime.members;
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let offs: any = 0;
    for (offs = (((members.m_spriteram).length) - (4)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (4))) {
      if (((Number(runtime.readIndex(h_m_spriteram, offs)) !== Number(0)) ? 1 : 0)) {
        let code: any = 0;
        let color: any = 0;
        code = (((~runtime.readIndex(h_m_spriteram, offs))) & (63));
        color = (((~runtime.readIndex(h_m_spriteram, ((offs) + (3))))) & (color_mask));
        if (extra_sprites) {
          code = ((code) | (((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) & (8))) << (3))));
        }
        if (((runtime.readIndex(h_m_spriteram, offs)) & (128))) {
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).transpen?.(bitmap, cliprect, code, color, 0, (((~runtime.readIndex(h_m_spriteram, offs))) & (64)), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), runtime.readIndex(h_m_spriteram, ((offs) + (1))), 0) ?? 0);
        } else {
          ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transpen?.(bitmap, cliprect, ((code) >>> (2)), color, 0, (((~runtime.readIndex(h_m_spriteram, offs))) & (64)), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), runtime.readIndex(h_m_spriteram, ((offs) + (1))), 0) ?? 0);
        }
      }
    }
  }

  function method_panic_scanline(runtime: any, param: any) {
    const members = runtime.members;
    let scanline: any = param;
    if (((Number(scanline) === Number(224)) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line_and_vector"] ? runtime.calls["m_maincpu.set_input_line_and_vector"](0, 2, 215) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line_and_vector?.(0, 2, 215) ?? 0) : (runtime.calls["set_input_line_and_vector"]?.(0, 2, 215) ?? 0));
    }
    if (((Number(scanline) === Number(0)) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line_and_vector"] ? runtime.calls["m_maincpu.set_input_line_and_vector"](0, 2, 207) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line_and_vector?.(0, 2, 207) ?? 0) : (runtime.calls["set_input_line_and_vector"]?.(0, 2, 207) ?? 0));
    }
  }
  return {
    "panic_sound_output_w": method_panic_sound_output_w,
    "cosmic_color_register_w": method_cosmic_color_register_w,
    "flip_screen_w": method_flip_screen_w,
    "panic_sound_output2_w": method_panic_sound_output2_w,
    "screen_update_panic": method_screen_update_panic,
    "draw_bitmap": method_draw_bitmap,
    "draw_sprites": method_draw_sprites,
    "panic_scanline": method_panic_scanline
  };
})();
    return {
      "cosmic_state.panic_sound_output_w": methods["panic_sound_output_w"],
      "cosmic_state.cosmic_color_register_w": methods["cosmic_color_register_w"],
      "cosmic_state.flip_screen_w": methods["flip_screen_w"],
      "cosmic_state.panic_sound_output2_w": methods["panic_sound_output2_w"],
      "cosmic_state.screen_update_panic": methods["screen_update_panic"],
      "cosmic_state.draw_bitmap": methods["draw_bitmap"],
      "cosmic_state.draw_sprites": methods["draw_sprites"],
      "cosmic_state.panic_scanline": methods["panic_scanline"],
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
