// GENERATED executable machine composition from src/mame/konami/tmnt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'tmnt');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_k052109_word_noA12_r(runtime: any, offset: any, mem_mask: any) {
    const members = runtime.members;
    offset = ((((((offset) & (12288))) >>> (1))) | (((offset) & (2047))));
    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
      return (((runtime.calls["m_k052109.read"] ? runtime.calls["m_k052109.read"](offset) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).read?.(offset) ?? 0) : (runtime.calls["read"]?.(offset) ?? 0))) << (8));
    } else {
      return (runtime.calls["m_k052109.read"] ? runtime.calls["m_k052109.read"](((offset) + (8192))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).read?.(((offset) + (8192))) ?? 0) : (runtime.calls["read"]?.(((offset) + (8192))) ?? 0));
    }
  }

  function method_k052109_word_noA12_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    offset = ((((((offset) & (12288))) >>> (1))) | (((offset) & (2047))));
    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
      (runtime.calls["m_k052109.write"] ? runtime.calls["m_k052109.write"](offset, ((((data) >>> (8))) & (255))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).write?.(offset, ((((data) >>> (8))) & (255))) ?? 0) : (runtime.calls["write"]?.(offset, ((((data) >>> (8))) & (255))) ?? 0));
    } else {
      (runtime.calls["m_k052109.write"] ? runtime.calls["m_k052109.write"](((offset) + (8192)), ((data) & (255))) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).write?.(((offset) + (8192)), ((data) & (255))) ?? 0) : (runtime.calls["write"]?.(((offset) + (8192)), ((data) & (255))) ?? 0));
    }
  }

  function method_k051937_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    offset = runtime.andAssign(offset, 7);
    if (((Number(offset) === Number(0)) ? 1 : 0)) {
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (0)) & 1)) {
        (runtime.calls["m_irq_handler"] ? runtime.calls["m_irq_handler"](0) : runtime.macro("m_irq_handler", 0));
      }
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (1)) & 1)) {
        (runtime.calls["m_firq_handler"] ? runtime.calls["m_firq_handler"](0) : runtime.macro("m_firq_handler", 0));
      }
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (2)) & 1)) {
        (runtime.calls["m_nmi_handler"] ? runtime.calls["m_nmi_handler"](0) : runtime.macro("m_nmi_handler", 0));
      }
      members.m_control = data;
    } else {
      if (((Number(offset) === Number(1)) ? 1 : 0)) {
        if (0) {
          0;
        }
        if ((((((data) ^ ((members.m_shadow_config ?? runtime.member("m_shadow_config"))))) >>> (0)) & 1)) {
          (runtime.calls["m_shadow_config_cb"] ? runtime.calls["m_shadow_config_cb"](((data) & (1))) : runtime.macro("m_shadow_config_cb", ((data) & (1))));
        }
        members.m_shadow_config = ((data) & (7));
      } else {
        if ((((((Number(offset) >= Number(2)) ? 1 : 0)) && (((Number(offset) < Number(5)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(runtime.writableMember("m_spriterombank"), ((offset) - (2)), data);
        } else {
        }
      }
    }
  }

  function method_k051960_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
  }

  function method_priority_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    members.m_priority = ((((((data) & (12))) >>> (2))) & 0xffff);
  }

  function method_sres_r(runtime: any) {
    const members = runtime.members;
    return (members.m_tmnt_soundlatch ?? runtime.member("m_tmnt_soundlatch"));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    (runtime.calls["m_k052109.tilemap_draw"] ? runtime.calls["m_k052109.tilemap_draw"](screen, bitmap, cliprect, 2, 128, 0) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).tilemap_draw?.(screen, bitmap, cliprect, 2, 128, 0) ?? 0) : (runtime.calls["tilemap_draw"]?.(screen, bitmap, cliprect, 2, 128, 0) ?? 0));
    if (((Number((((members.m_priority ?? runtime.member("m_priority"))) & (1))) === Number(1)) ? 1 : 0)) {
      (runtime.calls["m_k051960.k051960_sprites_draw"] ? runtime.calls["m_k051960.k051960_sprites_draw"](bitmap, cliprect, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 0) : (members.m_k051960) != null ? ((runtime.dereference(members.m_k051960)).k051960_sprites_draw?.(bitmap, cliprect, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 0) ?? 0) : (runtime.calls["k051960_sprites_draw"]?.(bitmap, cliprect, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 0) ?? 0));
    }
    (runtime.calls["m_k052109.tilemap_draw"] ? runtime.calls["m_k052109.tilemap_draw"](screen, bitmap, cliprect, 1, 0, 0) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).tilemap_draw?.(screen, bitmap, cliprect, 1, 0, 0) ?? 0) : (runtime.calls["tilemap_draw"]?.(screen, bitmap, cliprect, 1, 0, 0) ?? 0));
    if (((Number((((members.m_priority ?? runtime.member("m_priority"))) & (1))) === Number(0)) ? 1 : 0)) {
      (runtime.calls["m_k051960.k051960_sprites_draw"] ? runtime.calls["m_k051960.k051960_sprites_draw"](bitmap, cliprect, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 0) : (members.m_k051960) != null ? ((runtime.dereference(members.m_k051960)).k051960_sprites_draw?.(bitmap, cliprect, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 0) ?? 0) : (runtime.calls["k051960_sprites_draw"]?.(bitmap, cliprect, (runtime.calls["screen.priority"] ? runtime.calls["screen.priority"]() : (screen) != null ? (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")) : (runtime.calls["priority"]?.() ?? 0)), 0, 0) ?? 0));
    }
    (runtime.calls["m_k052109.tilemap_draw"] ? runtime.calls["m_k052109.tilemap_draw"](screen, bitmap, cliprect, 0, 0, 0) : (members.m_k052109) != null ? ((runtime.dereference(members.m_k052109)).tilemap_draw?.(screen, bitmap, cliprect, 0, 0, 0) ?? 0) : (runtime.calls["tilemap_draw"]?.(screen, bitmap, cliprect, 0, 0, 0) ?? 0));
    return 0;
  }

  function method_vblank_w(runtime: any, state: any) {
    const members = runtime.members;
    if ((((state) && ((members.m_irq5_mask ?? runtime.member("m_irq5_mask")))) ? 1 : 0)) {
      (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](5, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(5, 1) ?? 0) : (runtime.calls["set_input_line"]?.(5, 1) ?? 0));
    }
  }

  function method_volume_callback(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_k007232.set_volume"] ? runtime.calls["m_k007232.set_volume"](0, ((((data) >>> (4))) * (17)), 0) : (members.m_k007232) != null ? ((runtime.dereference(members.m_k007232)).set_volume?.(0, ((((data) >>> (4))) * (17)), 0) ?? 0) : (runtime.calls["set_volume"]?.(0, ((((data) >>> (4))) * (17)), 0) ?? 0));
    (runtime.calls["m_k007232.set_volume"] ? runtime.calls["m_k007232.set_volume"](1, 0, ((((data) & (15))) * (17))) : (members.m_k007232) != null ? ((runtime.dereference(members.m_k007232)).set_volume?.(1, 0, ((((data) & (15))) * (17))) ?? 0) : (runtime.calls["set_volume"]?.(1, 0, ((((data) & (15))) * (17))) ?? 0));
  }

  function method_tmnt_tile_callback(runtime: any, layer: any, bank: any, code: any, color: any, flags: any, priority: any) {
    const members = runtime.members;
    code.set(((code.get()) | (((((((((((color.get()) & (3))) << (8))) | (((((color.get()) & (16))) << (6))))) | (((((color.get()) & (12))) << (9))))) | (((bank) << (13)))))));
    color.set(runtime.add(runtime.readIndex((members.m_layer_colorbase ?? runtime.member("m_layer_colorbase")), layer), ((((color.get()) & (224))) >>> (5))));
  }

  function method_tmnt_sprite_callback(runtime: any, code: any, color: any, priority: any, shadow: any) {
    const members = runtime.members;
    code.set(((code.get()) | (((((color.get()) & (16))) << (9)))));
    color.set(runtime.add((members.m_sprite_colorbase ?? runtime.member("m_sprite_colorbase")), ((color.get()) & (15))));
  }
  return {
    "k052109_word_noA12_r": method_k052109_word_noA12_r,
    "k052109_word_noA12_w": method_k052109_word_noA12_w,
    "k051937_w": method_k051937_w,
    "k051960_w": method_k051960_w,
    "priority_w": method_priority_w,
    "sres_r": method_sres_r,
    "screen_update": method_screen_update,
    "vblank_w": method_vblank_w,
    "volume_callback": method_volume_callback
  };
})();
    return {
      "tmnt_state.k052109_word_noA12_r": methods["k052109_word_noA12_r"],
      "tmnt_state.k052109_word_noA12_w": methods["k052109_word_noA12_w"],
      "tmnt_state.priority_w": methods["priority_w"],
      "tmnt_state.sres_r": methods["sres_r"],
      "tmnt_state.screen_update": methods["screen_update"],
      "tmnt_state.vblank_w": methods["vblank_w"],
      "tmnt_state.volume_callback": methods["volume_callback"],
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
