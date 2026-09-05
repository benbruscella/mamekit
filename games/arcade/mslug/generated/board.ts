// GENERATED executable machine composition from src/mame/snk/neogeo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mslug');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
    }
  }

  function method_unmapped_r(runtime: any, space: any) {
    const members = runtime.members;
    let ret: any = ((0) & 0xffff);
    if ((members.m_recurse ?? runtime.member("m_recurse"))) {
      ret = ((65535) & 0xffff);
    } else {
      members.m_recurse = ((1) ? 1 : 0);
      ret = (((runtime.calls["space.read_word"] ? runtime.calls["space.read_word"]((runtime.calls["m_maincpu.pc"] ? runtime.calls["m_maincpu.pc"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).pc === 'function' ? (runtime.dereference(members.m_maincpu)).pc() : typeof (runtime.dereference(members.m_maincpu)).pc === 'number' || typeof (runtime.dereference(members.m_maincpu)).pc === 'boolean' ? (runtime.dereference(members.m_maincpu)).pc : runtime.container(members.m_maincpu, "pc")) : (runtime.calls["pc"]?.() ?? 0))) : (space) != null ? ((runtime.dereference(space)).read_word?.((runtime.calls["m_maincpu.pc"] ? runtime.calls["m_maincpu.pc"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).pc === 'function' ? (runtime.dereference(members.m_maincpu)).pc() : typeof (runtime.dereference(members.m_maincpu)).pc === 'number' || typeof (runtime.dereference(members.m_maincpu)).pc === 'boolean' ? (runtime.dereference(members.m_maincpu)).pc : runtime.container(members.m_maincpu, "pc")) : (runtime.calls["pc"]?.() ?? 0))) ?? 0) : (runtime.calls["read_word"]?.((runtime.calls["m_maincpu.pc"] ? runtime.calls["m_maincpu.pc"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).pc === 'function' ? (runtime.dereference(members.m_maincpu)).pc() : typeof (runtime.dereference(members.m_maincpu)).pc === 'number' || typeof (runtime.dereference(members.m_maincpu)).pc === 'boolean' ? (runtime.dereference(members.m_maincpu)).pc : runtime.container(members.m_maincpu, "pc")) : (runtime.calls["pc"]?.() ?? 0))) ?? 0))) & 0xffff);
      members.m_recurse = ((0) ? 1 : 0);
    }
    return ret;
  }

  function method_io_control_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    const h_m_edge = members.m_edge ?? runtime.member("m_edge");
    switch (((offset) & (56))) {
      case 0:
      {
        if (h_m_ctrl1) {
          (runtime.calls["m_ctrl1.write_ctrlsel"] ? runtime.calls["m_ctrl1.write_ctrlsel"](((data) & (7))) : (members.m_ctrl1) != null ? ((runtime.dereference(members.m_ctrl1)).write_ctrlsel?.(((data) & (7))) ?? 0) : (runtime.calls["write_ctrlsel"]?.(((data) & (7))) ?? 0));
        }
        if (h_m_ctrl2) {
          (runtime.calls["m_ctrl2.write_ctrlsel"] ? runtime.calls["m_ctrl2.write_ctrlsel"](((((data) >>> (3))) & (7))) : (members.m_ctrl2) != null ? ((runtime.dereference(members.m_ctrl2)).write_ctrlsel?.(((((data) >>> (3))) & (7))) ?? 0) : (runtime.calls["write_ctrlsel"]?.(((((data) >>> (3))) & (7))) ?? 0));
        }
        if (h_m_edge) {
          (runtime.calls["m_edge.write_ctrlsel"] ? runtime.calls["m_edge.write_ctrlsel"](((data) & (63))) : (members.m_edge) != null ? ((runtime.dereference(members.m_edge)).write_ctrlsel?.(((data) & (63))) ?? 0) : (runtime.calls["write_ctrlsel"]?.(((data) & (63))) ?? 0));
        }
        break;
      }
      case 8:
      {
        members.m_card_bank = ((((data) & (7))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
  }

  function method_video_register_r(runtime: any, space: any, offset: any, mem_mask: any) {
    const members = runtime.members;
    let ret: any = ((0) & 0xffff);
    if (((Number(mem_mask) === Number(255)) ? 1 : 0)) {
      ret = (((((runtime.overrides["unmapped_r"] ? runtime.overrides["unmapped_r"](space) : method_unmapped_r(runtime, space))) & (255))) & 0xffff);
    } else {
      switch (offset) {
        default:
        {
          ret = (((runtime.calls["m_sprgen.get_videoram_data"] ? runtime.calls["m_sprgen.get_videoram_data"]() : (members.m_sprgen) != null ? (typeof (runtime.dereference(members.m_sprgen)).get_videoram_data === 'function' ? (runtime.dereference(members.m_sprgen)).get_videoram_data() : typeof (runtime.dereference(members.m_sprgen)).get_videoram_data === 'number' || typeof (runtime.dereference(members.m_sprgen)).get_videoram_data === 'boolean' ? (runtime.dereference(members.m_sprgen)).get_videoram_data : runtime.container(members.m_sprgen, "get_videoram_data")) : (runtime.calls["get_videoram_data"]?.() ?? 0))) & 0xffff);
          break;
        }
        case 2:
        {
          ret = (((runtime.calls["m_sprgen.get_videoram_modulo"] ? runtime.calls["m_sprgen.get_videoram_modulo"]() : (members.m_sprgen) != null ? (typeof (runtime.dereference(members.m_sprgen)).get_videoram_modulo === 'function' ? (runtime.dereference(members.m_sprgen)).get_videoram_modulo() : typeof (runtime.dereference(members.m_sprgen)).get_videoram_modulo === 'number' || typeof (runtime.dereference(members.m_sprgen)).get_videoram_modulo === 'boolean' ? (runtime.dereference(members.m_sprgen)).get_videoram_modulo : runtime.container(members.m_sprgen, "get_videoram_modulo")) : (runtime.calls["get_videoram_modulo"]?.() ?? 0))) & 0xffff);
          break;
        }
        case 3:
        {
          ret = (((runtime.overrides["get_video_control"] ? runtime.overrides["get_video_control"]() : method_get_video_control(runtime))) & 0xffff);
          break;
        }
      }
    }
    return ret;
  }

  function method_get_video_control(runtime: any) {
    const members = runtime.members;
    let v_counter: any = ((runtime.add((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0)), 256)) & 0xffff);
    if (((Number(v_counter) >= Number(512)) ? 1 : 0)) {
      v_counter = ((((v_counter) - (264))) & 0xffff);
    }
    let ret: any = ((((((v_counter) << (7))) | ((((runtime.calls["m_sprgen.get_auto_animation_counter"] ? runtime.calls["m_sprgen.get_auto_animation_counter"]() : (members.m_sprgen) != null ? (typeof (runtime.dereference(members.m_sprgen)).get_auto_animation_counter === 'function' ? (runtime.dereference(members.m_sprgen)).get_auto_animation_counter() : typeof (runtime.dereference(members.m_sprgen)).get_auto_animation_counter === 'number' || typeof (runtime.dereference(members.m_sprgen)).get_auto_animation_counter === 'boolean' ? (runtime.dereference(members.m_sprgen)).get_auto_animation_counter : runtime.container(members.m_sprgen, "get_auto_animation_counter")) : (runtime.calls["get_auto_animation_counter"]?.() ?? 0))) & (7))))) & 0xffff);
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      if (0) {
        0;
      }
    }
    return ret;
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_regsel ?? runtime.member("m_regsel"))) {
      return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
    } else {
      return 65535;
    }
  }

  function method_set_video_control(runtime: any, data: any) {
    const members = runtime.members;
    if (0) {
      0;
    }
    (runtime.calls["m_sprgen.set_auto_animation_speed"] ? runtime.calls["m_sprgen.set_auto_animation_speed"](((data) >>> (8))) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).set_auto_animation_speed?.(((data) >>> (8))) ?? 0) : (runtime.calls["set_auto_animation_speed"]?.(((data) >>> (8))) ?? 0));
    (runtime.calls["m_sprgen.set_auto_animation_disabled"] ? runtime.calls["m_sprgen.set_auto_animation_disabled"]((((data) >>> (3)) & 1)) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).set_auto_animation_disabled?.((((data) >>> (3)) & 1)) ?? 0) : (runtime.calls["set_auto_animation_disabled"]?.((((data) >>> (3)) & 1)) ?? 0));
    (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
  }

  function method_set_display_position_interrupt_control(runtime: any, data: any) {
    const members = runtime.members;
    members.m_display_position_interrupt_control = ((data) & 0xff);
  }

  function method_set_display_counter_msb(runtime: any, data: any) {
    const members = runtime.members;
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
    0;
  }

  function method_paletteram_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
  }

  function method_paletteram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let dark: any = ((((data) >>> (15))) & 0xff);
    let r: any = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
    let g: any = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
    let b: any = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark)) ?? 0) : (runtime.calls["set_pen_color"]?.(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark)) ?? 0));
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2)))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2)))) ?? 0) : (runtime.calls["set_pen_color"]?.(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2)))) ?? 0));
  }

  function method_save_ram_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_save_ram = members.m_save_ram ?? runtime.member("m_save_ram");
    if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
      runtime.combineData(runtime.addressOf(h_m_save_ram, offset), data, mem_mask);
    }
  }

  function method_audio_cpu_enable_nmi_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_audionmi.in_w_1"] ? runtime.calls["m_audionmi.in_w_1"](((((~offset)) >>> (4)) & 1)) : (members.m_audionmi) != null ? ((runtime.dereference(members.m_audionmi)).in_w_1?.(((((~offset)) >>> (4)) & 1)) ?? 0) : (runtime.calls["in_w_1"]?.(((((~offset)) >>> (4)) & 1)) ?? 0));
  }

  function method_set_screen_shadow(runtime: any, state: any) {
    const members = runtime.members;
    members.m_screen_shadow = ((state) ? 1 : 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_set_pens(runtime: any) {
    const members = runtime.members;
    let pen_base: any = runtime.add(runtime.add((runtime.calls["m_palette.pens"] ? runtime.calls["m_palette.pens"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).pens === 'function' ? (runtime.dereference(members.m_palette)).pens() : typeof (runtime.dereference(members.m_palette)).pens === 'number' || typeof (runtime.dereference(members.m_palette)).pens === 'boolean' ? (runtime.dereference(members.m_palette)).pens : runtime.container(members.m_palette, "pens")) : (runtime.calls["pens"]?.() ?? 0)), (members.m_palette_bank ?? runtime.member("m_palette_bank"))), (((members.m_screen_shadow ?? runtime.member("m_screen_shadow"))) ? (8192) : (0)));
    (runtime.calls["m_sprgen.set_pens"] ? runtime.calls["m_sprgen.set_pens"](pen_base) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).set_pens?.(pen_base) ?? 0) : (runtime.calls["set_pens"]?.(pen_base) ?? 0));
    members.m_bg_pen = runtime.addressOf(pen_base, 4095);
  }

  function method_set_use_cart_vectors(runtime: any, state: any) {
    const members = runtime.members;
    members.m_use_cart_vectors = ((state) & 0xff);
  }

  function method_set_palette_bank(runtime: any, state: any) {
    const members = runtime.members;
    members.m_palette_bank = ((((state) ? (4096) : (0))) >>> 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"](runtime.dereference((members.m_bg_pen ?? runtime.member("m_bg_pen"))), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(runtime.dereference((members.m_bg_pen ?? runtime.member("m_bg_pen"))), cliprect) ?? 0) : (runtime.calls["fill"]?.(runtime.dereference((members.m_bg_pen ?? runtime.member("m_bg_pen"))), cliprect) ?? 0));
    (runtime.calls["m_sprgen.draw_sprites"] ? runtime.calls["m_sprgen.draw_sprites"](bitmap, cliprect.min_y) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).draw_sprites?.(bitmap, cliprect.min_y) ?? 0) : (runtime.calls["draw_sprites"]?.(bitmap, cliprect.min_y) ?? 0));
    (runtime.calls["m_sprgen.draw_fixed_layer"] ? runtime.calls["m_sprgen.draw_fixed_layer"](bitmap, cliprect.min_y) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).draw_fixed_layer?.(bitmap, cliprect.min_y) ?? 0) : (runtime.calls["draw_fixed_layer"]?.(bitmap, cliprect.min_y) ?? 0));
    return 0;
  }

  function method_sprite_on_scanline(runtime: any, scanline: any, y: any, rows: any) {
    const members = runtime.members;
    return ((((((((Number(rows) === Number(0)) ? 1 : 0)) || (((Number(rows) >= Number(32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_draw_fixed_layer_2pixels(runtime: any, pixel_addr: any, offset: any, gfx_base: any, char_pens: any) {
    const members = runtime.members;
    let data: any = ((runtime.readIndex(gfx_base, offset)) & 0xff);
    if (((data) & (15))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
    }
    pixel_addr.offset += 1;
    if (((data) & (240))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((((data) & (240))) >>> (4))));
    }
    pixel_addr.offset += 1;
    return pixel_addr;
  }

  function method_memcard_r(runtime: any, offset: any, mem_mask: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (runtime.calls["m_maincpu.eat_cycles"] ? runtime.calls["m_maincpu.eat_cycles"](2) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).eat_cycles?.(2) ?? 0) : (runtime.calls["eat_cycles"]?.(2) ?? 0));
    }
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((runtime.calls["m_memcard.present"] ? runtime.calls["m_memcard.present"]() : (members.m_memcard) != null ? (typeof (runtime.dereference(members.m_memcard)).present === 'function' ? (runtime.dereference(members.m_memcard)).present() : typeof (runtime.dereference(members.m_memcard)).present === 'number' || typeof (runtime.dereference(members.m_memcard)).present === 'boolean' ? (runtime.dereference(members.m_memcard)).present : runtime.container(members.m_memcard, "present")) : (runtime.calls["present"]?.() ?? 0)))) ? 1 : 0)) {
      return (runtime.calls["m_memcard.read"] ? runtime.calls["m_memcard.read"]((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset))) : (members.m_memcard) != null ? ((runtime.dereference(members.m_memcard)).read?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset))) ?? 0) : (runtime.calls["read"]?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset))) ?? 0));
    } else {
      return 65535;
    }
  }

  function method_memcard_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    (runtime.calls["m_maincpu.eat_cycles"] ? runtime.calls["m_maincpu.eat_cycles"](2) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).eat_cycles?.(2) ?? 0) : (runtime.calls["eat_cycles"]?.(2) ?? 0));
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((runtime.calls["m_memcard.present"] ? runtime.calls["m_memcard.present"]() : (members.m_memcard) != null ? (typeof (runtime.dereference(members.m_memcard)).present === 'function' ? (runtime.dereference(members.m_memcard)).present() : typeof (runtime.dereference(members.m_memcard)).present === 'number' || typeof (runtime.dereference(members.m_memcard)).present === 'boolean' ? (runtime.dereference(members.m_memcard)).present : runtime.container(members.m_memcard, "present")) : (runtime.calls["present"]?.() ?? 0)))) ? 1 : 0)) {
      (runtime.calls["m_memcard.write"] ? runtime.calls["m_memcard.write"]((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data) : (members.m_memcard) != null ? ((runtime.dereference(members.m_memcard)).write?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data) ?? 0) : (runtime.calls["write"]?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data) ?? 0));
    }
  }
  return {
    "write": method_write,
    "unmapped_r": method_unmapped_r,
    "io_control_w": method_io_control_w,
    "video_register_r": method_video_register_r,
    "get_video_control": method_get_video_control,
    "read": method_read,
    "set_video_control": method_set_video_control,
    "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
    "set_display_counter_msb": method_set_display_counter_msb,
    "paletteram_r": method_paletteram_r,
    "paletteram_w": method_paletteram_w,
    "save_ram_w": method_save_ram_w,
    "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
    "set_screen_shadow": method_set_screen_shadow,
    "set_pens": method_set_pens,
    "set_use_cart_vectors": method_set_use_cart_vectors,
    "set_palette_bank": method_set_palette_bank,
    "screen_update": method_screen_update,
    "sprite_on_scanline": method_sprite_on_scanline,
    "memcard_r": method_memcard_r,
    "memcard_w": method_memcard_w
  };
})();
    return {
      "neogeo_base_state.unmapped_r": methods["unmapped_r"],
      "neogeo_base_state.io_control_w": methods["io_control_w"],
      "neogeo_base_state.video_register_r": methods["video_register_r"],
      "neogeo_base_state.get_video_control": methods["get_video_control"],
      "neogeo_base_state.set_video_control": methods["set_video_control"],
      "neogeo_base_state.set_display_position_interrupt_control": methods["set_display_position_interrupt_control"],
      "neogeo_base_state.set_display_counter_msb": methods["set_display_counter_msb"],
      "neogeo_base_state.paletteram_r": methods["paletteram_r"],
      "neogeo_base_state.paletteram_w": methods["paletteram_w"],
      "neogeo_base_state.audio_cpu_enable_nmi_w": methods["audio_cpu_enable_nmi_w"],
      "neogeo_base_state.set_screen_shadow": methods["set_screen_shadow"],
      "neogeo_base_state.set_pens": methods["set_pens"],
      "neogeo_base_state.set_use_cart_vectors": methods["set_use_cart_vectors"],
      "neogeo_base_state.set_palette_bank": methods["set_palette_bank"],
      "neogeo_base_state.screen_update": methods["screen_update"],
    };
  })(),
  ...(() => {
    const methods = (() => {
  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
    }
  }

  function method_unmapped_r(runtime: any, space: any) {
    const members = runtime.members;
    let ret: any = ((0) & 0xffff);
    if ((members.m_recurse ?? runtime.member("m_recurse"))) {
      ret = ((65535) & 0xffff);
    } else {
      members.m_recurse = ((1) ? 1 : 0);
      ret = (((runtime.calls["space.read_word"] ? runtime.calls["space.read_word"]((runtime.calls["m_maincpu.pc"] ? runtime.calls["m_maincpu.pc"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).pc === 'function' ? (runtime.dereference(members.m_maincpu)).pc() : typeof (runtime.dereference(members.m_maincpu)).pc === 'number' || typeof (runtime.dereference(members.m_maincpu)).pc === 'boolean' ? (runtime.dereference(members.m_maincpu)).pc : runtime.container(members.m_maincpu, "pc")) : (runtime.calls["pc"]?.() ?? 0))) : (space) != null ? ((runtime.dereference(space)).read_word?.((runtime.calls["m_maincpu.pc"] ? runtime.calls["m_maincpu.pc"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).pc === 'function' ? (runtime.dereference(members.m_maincpu)).pc() : typeof (runtime.dereference(members.m_maincpu)).pc === 'number' || typeof (runtime.dereference(members.m_maincpu)).pc === 'boolean' ? (runtime.dereference(members.m_maincpu)).pc : runtime.container(members.m_maincpu, "pc")) : (runtime.calls["pc"]?.() ?? 0))) ?? 0) : (runtime.calls["read_word"]?.((runtime.calls["m_maincpu.pc"] ? runtime.calls["m_maincpu.pc"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).pc === 'function' ? (runtime.dereference(members.m_maincpu)).pc() : typeof (runtime.dereference(members.m_maincpu)).pc === 'number' || typeof (runtime.dereference(members.m_maincpu)).pc === 'boolean' ? (runtime.dereference(members.m_maincpu)).pc : runtime.container(members.m_maincpu, "pc")) : (runtime.calls["pc"]?.() ?? 0))) ?? 0))) & 0xffff);
      members.m_recurse = ((0) ? 1 : 0);
    }
    return ret;
  }

  function method_io_control_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    const h_m_edge = members.m_edge ?? runtime.member("m_edge");
    switch (((offset) & (56))) {
      case 0:
      {
        if (h_m_ctrl1) {
          (runtime.calls["m_ctrl1.write_ctrlsel"] ? runtime.calls["m_ctrl1.write_ctrlsel"](((data) & (7))) : (members.m_ctrl1) != null ? ((runtime.dereference(members.m_ctrl1)).write_ctrlsel?.(((data) & (7))) ?? 0) : (runtime.calls["write_ctrlsel"]?.(((data) & (7))) ?? 0));
        }
        if (h_m_ctrl2) {
          (runtime.calls["m_ctrl2.write_ctrlsel"] ? runtime.calls["m_ctrl2.write_ctrlsel"](((((data) >>> (3))) & (7))) : (members.m_ctrl2) != null ? ((runtime.dereference(members.m_ctrl2)).write_ctrlsel?.(((((data) >>> (3))) & (7))) ?? 0) : (runtime.calls["write_ctrlsel"]?.(((((data) >>> (3))) & (7))) ?? 0));
        }
        if (h_m_edge) {
          (runtime.calls["m_edge.write_ctrlsel"] ? runtime.calls["m_edge.write_ctrlsel"](((data) & (63))) : (members.m_edge) != null ? ((runtime.dereference(members.m_edge)).write_ctrlsel?.(((data) & (63))) ?? 0) : (runtime.calls["write_ctrlsel"]?.(((data) & (63))) ?? 0));
        }
        break;
      }
      case 8:
      {
        members.m_card_bank = ((((data) & (7))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_regsel ?? runtime.member("m_regsel"))) {
      return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
    } else {
      return 65535;
    }
  }

  function method_set_video_control(runtime: any, data: any) {
    const members = runtime.members;
    if (0) {
      0;
    }
    (runtime.calls["m_sprgen.set_auto_animation_speed"] ? runtime.calls["m_sprgen.set_auto_animation_speed"](((data) >>> (8))) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).set_auto_animation_speed?.(((data) >>> (8))) ?? 0) : (runtime.calls["set_auto_animation_speed"]?.(((data) >>> (8))) ?? 0));
    (runtime.calls["m_sprgen.set_auto_animation_disabled"] ? runtime.calls["m_sprgen.set_auto_animation_disabled"]((((data) >>> (3)) & 1)) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).set_auto_animation_disabled?.((((data) >>> (3)) & 1)) ?? 0) : (runtime.calls["set_auto_animation_disabled"]?.((((data) >>> (3)) & 1)) ?? 0));
    (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
  }

  function method_set_display_position_interrupt_control(runtime: any, data: any) {
    const members = runtime.members;
    members.m_display_position_interrupt_control = ((data) & 0xff);
  }

  function method_set_display_counter_msb(runtime: any, data: any) {
    const members = runtime.members;
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
    0;
  }

  function method_paletteram_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
  }

  function method_paletteram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let dark: any = ((((data) >>> (15))) & 0xff);
    let r: any = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
    let g: any = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
    let b: any = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark)) ?? 0) : (runtime.calls["set_pen_color"]?.(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark)) ?? 0));
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2)))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2)))) ?? 0) : (runtime.calls["set_pen_color"]?.(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2)))) ?? 0));
  }

  function method_save_ram_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_save_ram = members.m_save_ram ?? runtime.member("m_save_ram");
    if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
      runtime.combineData(runtime.addressOf(h_m_save_ram, offset), data, mem_mask);
    }
  }

  function method_audio_cpu_enable_nmi_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_audionmi.in_w_1"] ? runtime.calls["m_audionmi.in_w_1"](((((~offset)) >>> (4)) & 1)) : (members.m_audionmi) != null ? ((runtime.dereference(members.m_audionmi)).in_w_1?.(((((~offset)) >>> (4)) & 1)) ?? 0) : (runtime.calls["in_w_1"]?.(((((~offset)) >>> (4)) & 1)) ?? 0));
  }

  function method_sprite_on_scanline(runtime: any, scanline: any, y: any, rows: any) {
    const members = runtime.members;
    return ((((((((Number(rows) === Number(0)) ? 1 : 0)) || (((Number(rows) >= Number(32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_draw_fixed_layer_2pixels(runtime: any, pixel_addr: any, offset: any, gfx_base: any, char_pens: any) {
    const members = runtime.members;
    let data: any = ((runtime.readIndex(gfx_base, offset)) & 0xff);
    if (((data) & (15))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
    }
    pixel_addr.offset += 1;
    if (((data) & (240))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((((data) & (240))) >>> (4))));
    }
    pixel_addr.offset += 1;
    return pixel_addr;
  }

  function method_in0_edge_joy_r(runtime: any) {
    const members = runtime.members;
    return (((((((runtime.calls["m_edge.in0_r"] ? runtime.calls["m_edge.in0_r"]() : (members.m_edge) != null ? (typeof (runtime.dereference(members.m_edge)).in0_r === 'function' ? (runtime.dereference(members.m_edge)).in0_r() : typeof (runtime.dereference(members.m_edge)).in0_r === 'number' || typeof (runtime.dereference(members.m_edge)).in0_r === 'boolean' ? (runtime.dereference(members.m_edge)).in0_r : runtime.container(members.m_edge, "in0_r")) : (runtime.calls["in0_r"]?.() ?? 0))) & ((runtime.calls["m_ctrl1.read_ctrl"] ? runtime.calls["m_ctrl1.read_ctrl"]() : (members.m_ctrl1) != null ? (typeof (runtime.dereference(members.m_ctrl1)).read_ctrl === 'function' ? (runtime.dereference(members.m_ctrl1)).read_ctrl() : typeof (runtime.dereference(members.m_ctrl1)).read_ctrl === 'number' || typeof (runtime.dereference(members.m_ctrl1)).read_ctrl === 'boolean' ? (runtime.dereference(members.m_ctrl1)).read_ctrl : runtime.container(members.m_ctrl1, "read_ctrl")) : (runtime.calls["read_ctrl"]?.() ?? 0))))) << (8))) | ((runtime.calls["m_dsw.read"] ? runtime.calls["m_dsw.read"]() : (members.m_dsw) != null ? (typeof (runtime.dereference(members.m_dsw)).read === 'function' ? (runtime.dereference(members.m_dsw)).read() : typeof (runtime.dereference(members.m_dsw)).read === 'number' || typeof (runtime.dereference(members.m_dsw)).read === 'boolean' ? (runtime.dereference(members.m_dsw)).read : runtime.container(members.m_dsw, "read")) : (runtime.calls["read"]?.() ?? 0))));
  }

  function method_in0_edge_r(runtime: any) {
    const members = runtime.members;
    return (((((runtime.calls["m_edge.in0_r"] ? runtime.calls["m_edge.in0_r"]() : (members.m_edge) != null ? (typeof (runtime.dereference(members.m_edge)).in0_r === 'function' ? (runtime.dereference(members.m_edge)).in0_r() : typeof (runtime.dereference(members.m_edge)).in0_r === 'number' || typeof (runtime.dereference(members.m_edge)).in0_r === 'boolean' ? (runtime.dereference(members.m_edge)).in0_r : runtime.container(members.m_edge, "in0_r")) : (runtime.calls["in0_r"]?.() ?? 0))) << (8))) | ((runtime.calls["m_dsw.read"] ? runtime.calls["m_dsw.read"]() : (members.m_dsw) != null ? (typeof (runtime.dereference(members.m_dsw)).read === 'function' ? (runtime.dereference(members.m_dsw)).read() : typeof (runtime.dereference(members.m_dsw)).read === 'number' || typeof (runtime.dereference(members.m_dsw)).read === 'boolean' ? (runtime.dereference(members.m_dsw)).read : runtime.container(members.m_dsw, "read")) : (runtime.calls["read"]?.() ?? 0))));
  }

  function method_in1_edge_joy_r(runtime: any) {
    const members = runtime.members;
    return (((((((runtime.calls["m_edge.in1_r"] ? runtime.calls["m_edge.in1_r"]() : (members.m_edge) != null ? (typeof (runtime.dereference(members.m_edge)).in1_r === 'function' ? (runtime.dereference(members.m_edge)).in1_r() : typeof (runtime.dereference(members.m_edge)).in1_r === 'number' || typeof (runtime.dereference(members.m_edge)).in1_r === 'boolean' ? (runtime.dereference(members.m_edge)).in1_r : runtime.container(members.m_edge, "in1_r")) : (runtime.calls["in1_r"]?.() ?? 0))) & ((runtime.calls["m_ctrl2.read_ctrl"] ? runtime.calls["m_ctrl2.read_ctrl"]() : (members.m_ctrl2) != null ? (typeof (runtime.dereference(members.m_ctrl2)).read_ctrl === 'function' ? (runtime.dereference(members.m_ctrl2)).read_ctrl() : typeof (runtime.dereference(members.m_ctrl2)).read_ctrl === 'number' || typeof (runtime.dereference(members.m_ctrl2)).read_ctrl === 'boolean' ? (runtime.dereference(members.m_ctrl2)).read_ctrl : runtime.container(members.m_ctrl2, "read_ctrl")) : (runtime.calls["read_ctrl"]?.() ?? 0))))) << (8))) | (255));
  }

  function method_in1_edge_r(runtime: any) {
    const members = runtime.members;
    return (((((runtime.calls["m_edge.in1_r"] ? runtime.calls["m_edge.in1_r"]() : (members.m_edge) != null ? (typeof (runtime.dereference(members.m_edge)).in1_r === 'function' ? (runtime.dereference(members.m_edge)).in1_r() : typeof (runtime.dereference(members.m_edge)).in1_r === 'number' || typeof (runtime.dereference(members.m_edge)).in1_r === 'boolean' ? (runtime.dereference(members.m_edge)).in1_r : runtime.container(members.m_edge, "in1_r")) : (runtime.calls["in1_r"]?.() ?? 0))) << (8))) | (255));
  }

  function method_memcard_r(runtime: any, offset: any, mem_mask: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (runtime.calls["m_maincpu.eat_cycles"] ? runtime.calls["m_maincpu.eat_cycles"](2) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).eat_cycles?.(2) ?? 0) : (runtime.calls["eat_cycles"]?.(2) ?? 0));
    }
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((runtime.calls["m_memcard.present"] ? runtime.calls["m_memcard.present"]() : (members.m_memcard) != null ? (typeof (runtime.dereference(members.m_memcard)).present === 'function' ? (runtime.dereference(members.m_memcard)).present() : typeof (runtime.dereference(members.m_memcard)).present === 'number' || typeof (runtime.dereference(members.m_memcard)).present === 'boolean' ? (runtime.dereference(members.m_memcard)).present : runtime.container(members.m_memcard, "present")) : (runtime.calls["present"]?.() ?? 0)))) ? 1 : 0)) {
      return (runtime.calls["m_memcard.read"] ? runtime.calls["m_memcard.read"]((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset))) : (members.m_memcard) != null ? ((runtime.dereference(members.m_memcard)).read?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset))) ?? 0) : (runtime.calls["read"]?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset))) ?? 0));
    } else {
      return 65535;
    }
  }

  function method_memcard_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    (runtime.calls["m_maincpu.eat_cycles"] ? runtime.calls["m_maincpu.eat_cycles"](2) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).eat_cycles?.(2) ?? 0) : (runtime.calls["eat_cycles"]?.(2) ?? 0));
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((runtime.calls["m_memcard.present"] ? runtime.calls["m_memcard.present"]() : (members.m_memcard) != null ? (typeof (runtime.dereference(members.m_memcard)).present === 'function' ? (runtime.dereference(members.m_memcard)).present() : typeof (runtime.dereference(members.m_memcard)).present === 'number' || typeof (runtime.dereference(members.m_memcard)).present === 'boolean' ? (runtime.dereference(members.m_memcard)).present : runtime.container(members.m_memcard, "present")) : (runtime.calls["present"]?.() ?? 0)))) ? 1 : 0)) {
      (runtime.calls["m_memcard.write"] ? runtime.calls["m_memcard.write"]((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data) : (members.m_memcard) != null ? ((runtime.dereference(members.m_memcard)).write?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data) ?? 0) : (runtime.calls["write"]?.((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data) ?? 0));
    }
  }

  function method_set_use_cart_audio(runtime: any, state: any) {
    const members = runtime.members;
    members.m_use_cart_audio = ((state) & 0xff);
    (runtime.calls["m_sprgen.set_fixed_layer_source"] ? runtime.calls["m_sprgen.set_fixed_layer_source"](state) : (members.m_sprgen) != null ? ((runtime.dereference(members.m_sprgen)).set_fixed_layer_source?.(state) ?? 0) : (runtime.calls["set_fixed_layer_source"]?.(state) ?? 0));
    (runtime.calls["m_bank_audio_main.set_entry"] ? runtime.calls["m_bank_audio_main.set_entry"]((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio"))) : (members.m_bank_audio_main) != null ? ((runtime.dereference(members.m_bank_audio_main)).set_entry?.((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio"))) ?? 0) : (runtime.calls["set_entry"]?.((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio"))) ?? 0));
  }

  function method_set_save_ram_unlock(runtime: any, state: any) {
    const members = runtime.members;
    members.m_save_ram_unlocked = ((state) & 0xff);
  }
  return {
    "write": method_write,
    "unmapped_r": method_unmapped_r,
    "io_control_w": method_io_control_w,
    "read": method_read,
    "set_video_control": method_set_video_control,
    "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
    "set_display_counter_msb": method_set_display_counter_msb,
    "paletteram_r": method_paletteram_r,
    "paletteram_w": method_paletteram_w,
    "save_ram_w": method_save_ram_w,
    "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
    "sprite_on_scanline": method_sprite_on_scanline,
    "in0_edge_joy_r": method_in0_edge_joy_r,
    "in0_edge_r": method_in0_edge_r,
    "in1_edge_joy_r": method_in1_edge_joy_r,
    "in1_edge_r": method_in1_edge_r,
    "memcard_r": method_memcard_r,
    "memcard_w": method_memcard_w,
    "set_use_cart_audio": method_set_use_cart_audio,
    "set_save_ram_unlock": method_set_save_ram_unlock
  };
})();
    return {
      "ngarcade_base_state.unmapped_r": methods["unmapped_r"],
      "ngarcade_base_state.save_ram_w": methods["save_ram_w"],
      "ngarcade_base_state.in0_edge_joy_r": methods["in0_edge_joy_r"],
      "ngarcade_base_state.in0_edge_r": methods["in0_edge_r"],
      "ngarcade_base_state.in1_edge_joy_r": methods["in1_edge_joy_r"],
      "ngarcade_base_state.in1_edge_r": methods["in1_edge_r"],
      "ngarcade_base_state.memcard_r": methods["memcard_r"],
      "ngarcade_base_state.memcard_w": methods["memcard_w"],
      "ngarcade_base_state.set_use_cart_audio": methods["set_use_cart_audio"],
      "ngarcade_base_state.set_save_ram_unlock": methods["set_save_ram_unlock"],
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
