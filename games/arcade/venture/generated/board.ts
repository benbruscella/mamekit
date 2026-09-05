// GENERATED executable machine composition from src/mame/exidy/exidy.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'venture');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_exidy_interrupt_r(runtime: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
    return (members.m_int_condition ?? runtime.member("m_int_condition"));
  }

  function method_set_colors(runtime: any) {
    const members = runtime.members;
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](0, 0) : method_set_1_color(runtime, 0, 0));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](1, 7) : method_set_1_color(runtime, 1, 7));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](2, 0) : method_set_1_color(runtime, 2, 0));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](3, 6) : method_set_1_color(runtime, 3, 6));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](4, 4) : method_set_1_color(runtime, 4, 4));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](5, 3) : method_set_1_color(runtime, 5, 3));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](6, 2) : method_set_1_color(runtime, 6, 2));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](7, 1) : method_set_1_color(runtime, 7, 1));
  }

  function method_set_1_color(runtime: any, index: any, which: any) {
    const members = runtime.members;
    const h_m_color_latch = members.m_color_latch ?? runtime.member("m_color_latch");
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](index, (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 2)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 2)) >>> (which)))), (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 1)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 1)) >>> (which)))), (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 0)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 0)) >>> (which))))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(index, (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 2)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 2)) >>> (which)))), (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 1)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 1)) >>> (which)))), (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 0)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 0)) >>> (which))))) ?? 0) : (runtime.calls["set_pen_color"]?.(index, (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 2)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 2)) >>> (which)))), (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 1)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 1)) >>> (which)))), (runtime.calls["pal1bit"] ? runtime.calls["pal1bit"](((runtime.readIndex(h_m_color_latch, 0)) >>> (which))) : runtime.macro("pal1bit", ((runtime.readIndex(h_m_color_latch, 0)) >>> (which))))) ?? 0));
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
    const h_m_sprite2_xpos = members.m_sprite2_xpos ?? runtime.member("m_sprite2_xpos");
    const h_m_sprite2_ypos = members.m_sprite2_ypos ?? runtime.member("m_sprite2_ypos");
    const h_m_spriteno = members.m_spriteno ?? runtime.member("m_spriteno");
    const h_m_sprite1_xpos = members.m_sprite1_xpos ?? runtime.member("m_sprite1_xpos");
    const h_m_sprite1_ypos = members.m_sprite1_ypos ?? runtime.member("m_sprite1_ypos");
    let sprite_set_2: any = ((Number(((runtime.dereference(h_m_sprite_enable)) & (64))) !== Number(0)) ? 1 : 0);
    let sx: any = ((((236) - (runtime.dereference(h_m_sprite2_xpos)))) - (4));
    let sy: any = ((((244) - (runtime.dereference(h_m_sprite2_ypos)))) - (4));
    ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).transpen?.(bitmap, cliprect, runtime.add(runtime.add(((((runtime.dereference(h_m_spriteno)) >>> (4))) & (15)), 32), ((16) * (sprite_set_2))), 1, 0, 0, sx, sy, 0) ?? 0);
    if ((runtime.overrides["sprite_1_enabled"] ? runtime.overrides["sprite_1_enabled"]() : method_sprite_1_enabled(runtime))) {
      let sprite_set_1: any = ((Number(((runtime.dereference(h_m_sprite_enable)) & (32))) !== Number(0)) ? 1 : 0);
      sx = ((((236) - (runtime.dereference(h_m_sprite1_xpos)))) - (4));
      sy = ((((244) - (runtime.dereference(h_m_sprite1_ypos)))) - (4));
      if (((Number(sy) < Number(0)) ? 1 : 0)) {
        sy = 0;
      }
      ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : (runtime.calls["gfx"]?.(0) ?? 0)))).transpen?.(bitmap, cliprect, runtime.add(((runtime.dereference(h_m_spriteno)) & (15)), ((16) * (sprite_set_1))), 0, 0, 0, sx, sy, 0) ?? 0);
    }
  }

  function method_sprite_1_enabled(runtime: any) {
    const members = runtime.members;
    const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
    const h_m_collision_mask = members.m_collision_mask ?? runtime.member("m_collision_mask");
    return ((((((((((runtime.dereference(h_m_sprite_enable)) & (128))) ? 0 : 1)) || (((runtime.dereference(h_m_sprite_enable)) & (16)))) ? 1 : 0)) || (((Number(h_m_collision_mask) === Number(0)) ? 1 : 0))) ? 1 : 0);
  }
  return {
    "exidy_interrupt_r": method_exidy_interrupt_r,
    "set_colors": method_set_colors,
    "set_1_color": method_set_1_color,
    "draw_sprites": method_draw_sprites,
    "sprite_1_enabled": method_sprite_1_enabled
  };
})();
    return {
      "exidy_state.exidy_interrupt_r": methods["exidy_interrupt_r"],
      "exidy_state.set_colors": methods["set_colors"],
      "exidy_state.set_1_color": methods["set_1_color"],
      "exidy_state.draw_sprites": methods["draw_sprites"],
      "exidy_state.sprite_1_enabled": methods["sprite_1_enabled"],
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
