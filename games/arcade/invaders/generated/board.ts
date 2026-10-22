// GENERATED executable machine composition from src/mame/midw8080/mw8080bw.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'invaders');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_vpos_to_vysnc_chain_counter(runtime: any, vpos: any): any {
    const members = runtime.members;

    let counter: any = ((0) & 0xff);
    let vblank: any = ((((Number(vpos) >= Number(224)) ? 1 : 0)) | 0);
    if (vblank) {
      counter = ((runtime.add(((vpos) - (224)), 218)) & 0xff);
    } else {
      counter = ((((vpos) + (32))) & 0xff);
    }
    return counter;
  }

  function method_vysnc_chain_counter_to_vpos(runtime: any, counter: any, vblank: any): any {
    const members = runtime.members;

    let vpos: any = ((0) | 0);
    if (vblank) {
      vpos = ((runtime.add(((counter) - (218)), 224)) | 0);
    } else {
      vpos = ((((counter) - (32))) | 0);
    }
    return vpos;
  }

  function method_interrupt_vector(runtime: any, irqline: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let vpos: any = (((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    if (((Number((__l["machine().time"]?.() ?? 0)) < Number((members.m_interrupt_time ?? runtime.member("m_interrupt_time")))) ? 1 : 0)) {
      vpos = ((((vpos) + (1))) | 0);
    }
    let counter: any = (((runtime.overrides["vpos_to_vysnc_chain_counter"] ? runtime.overrides["vpos_to_vysnc_chain_counter"](vpos) : method_vpos_to_vysnc_chain_counter(runtime, vpos))) & 0xff);
    let vector: any = ((((((199) | (runtime.shiftRight(((counter) & (64)), 2)))) | (runtime.shiftRight((((~counter)) & (64)), 3)))) & 0xff);
    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    return vector;
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_int_enable = ((state) ? 1 : 0);
  }

  function method_screen_update_invaders(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_flip_screen = members.m_flip_screen ?? runtime.member("m_flip_screen");
    const h_m_main_ram = members.m_main_ram ?? runtime.member("m_main_ram");
    let x: any = ((0) & 0xff);
    let y: any = ((32) & 0xff);
    let video_data: any = ((0) & 0xff);
    while (1) {
      let pen: any = ((((video_data) & (1))) ? ((__l["rgb_t::white"] ? __l["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((__l["rgb_t::black"] ? __l["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
      if (h_m_flip_screen) {
        bitmap["pix="](((223) - (((y) - (32)))), ((259) - (x)), pen);
      } else {
        bitmap["pix="](((y) - (32)), x, pen);
      }
      video_data = ((runtime.shiftRight(video_data, 1)) & 0xff);
      x = ((((x) + (1))) & 0xff);
      if (((Number(x) === Number(0)) ? 1 : 0)) {
        for (let i: any = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
          pen = ((((video_data) & (1))) ? ((__l["rgb_t::white"] ? __l["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((__l["rgb_t::black"] ? __l["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
          if (h_m_flip_screen) {
            bitmap["pix="](((223) - (((y) - (32)))), ((259) - (((256) + (i)))), pen);
          } else {
            bitmap["pix="](((y) - (32)), ((256) + (i)), pen);
          }
          video_data = ((runtime.shiftRight(video_data, 1)) & 0xff);
        }
        y = ((((y) + (1))) & 0xff);
        if (((Number(y) === Number(0)) ? 1 : 0)) {
          break;
        }
      } else {
        if (((Number(((x) & (7))) === Number(4)) ? 1 : 0)) {
          let offs: any = ((((y) << (5))) | (runtime.shiftRight(x, 3)));
          video_data = ((runtime.readIndex(h_m_main_ram, offs)) & 0xff);
        }
      }
    }
    return 0;
  }

  function method_is_cabinet_cocktail(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((__l["m_cabinet_type.read"] ?? runtime.memberCall(members.m_cabinet_type, "read", 0, __l["read"]))()) >>> (0)) & 1);
  }

  function method_invaders_in0_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 7;
    } else {
      return (__l["m_player_controls[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __l["read"]))();
    }
  }

  function method_invaders_in1_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return (__l["m_player_controls[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __l["read"]))();
  }

  function method_invaders_in2_control_r(runtime: any): any {
    const members = runtime.members;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return ((runtime.dereference(runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0))))).read?.() ?? runtime.container(runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0))), "read"));
  }
  return {
    "vpos_to_vysnc_chain_counter": method_vpos_to_vysnc_chain_counter,
    "vysnc_chain_counter_to_vpos": method_vysnc_chain_counter_to_vpos,
    "interrupt_vector": method_interrupt_vector,
    "int_enable_w": method_int_enable_w,
    "screen_update_invaders": method_screen_update_invaders,
    "is_cabinet_cocktail": method_is_cabinet_cocktail,
    "invaders_in0_control_r": method_invaders_in0_control_r,
    "invaders_in1_control_r": method_invaders_in1_control_r,
    "invaders_in2_control_r": method_invaders_in2_control_r
  };
})();
    return {
      "mw8080bw_state.vpos_to_vysnc_chain_counter": methods["vpos_to_vysnc_chain_counter"],
      "mw8080bw_state.vysnc_chain_counter_to_vpos": methods["vysnc_chain_counter_to_vpos"],
      "mw8080bw_state.interrupt_vector": methods["interrupt_vector"],
      "mw8080bw_state.int_enable_w": methods["int_enable_w"],
    };
  })(),
  ...(() => {
    const methods = (() => {


  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_int_enable = ((state) ? 1 : 0);
  }

  function method_screen_update_invaders(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_flip_screen = members.m_flip_screen ?? runtime.member("m_flip_screen");
    const h_m_main_ram = members.m_main_ram ?? runtime.member("m_main_ram");
    let x: any = ((0) & 0xff);
    let y: any = ((32) & 0xff);
    let video_data: any = ((0) & 0xff);
    while (1) {
      let pen: any = ((((video_data) & (1))) ? ((__l["rgb_t::white"] ? __l["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((__l["rgb_t::black"] ? __l["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
      if (h_m_flip_screen) {
        bitmap["pix="](((223) - (((y) - (32)))), ((259) - (x)), pen);
      } else {
        bitmap["pix="](((y) - (32)), x, pen);
      }
      video_data = ((runtime.shiftRight(video_data, 1)) & 0xff);
      x = ((((x) + (1))) & 0xff);
      if (((Number(x) === Number(0)) ? 1 : 0)) {
        for (let i: any = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
          pen = ((((video_data) & (1))) ? ((__l["rgb_t::white"] ? __l["rgb_t::white"]() : runtime.macro("rgb_t::white"))) : ((__l["rgb_t::black"] ? __l["rgb_t::black"]() : runtime.macro("rgb_t::black"))));
          if (h_m_flip_screen) {
            bitmap["pix="](((223) - (((y) - (32)))), ((259) - (((256) + (i)))), pen);
          } else {
            bitmap["pix="](((y) - (32)), ((256) + (i)), pen);
          }
          video_data = ((runtime.shiftRight(video_data, 1)) & 0xff);
        }
        y = ((((y) + (1))) & 0xff);
        if (((Number(y) === Number(0)) ? 1 : 0)) {
          break;
        }
      } else {
        if (((Number(((x) & (7))) === Number(4)) ? 1 : 0)) {
          let offs: any = ((((y) << (5))) | (runtime.shiftRight(x, 3)));
          video_data = ((runtime.readIndex(h_m_main_ram, offs)) & 0xff);
        }
      }
    }
    return 0;
  }

  function method_is_cabinet_cocktail(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((__l["m_cabinet_type.read"] ?? runtime.memberCall(members.m_cabinet_type, "read", 0, __l["read"]))()) >>> (0)) & 1);
  }

  function method_invaders_in0_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 7;
    } else {
      return (__l["m_player_controls[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __l["read"]))();
    }
  }

  function method_invaders_in1_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return (__l["m_player_controls[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __l["read"]))();
  }

  function method_invaders_in2_control_r(runtime: any): any {
    const members = runtime.members;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return ((runtime.dereference(runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0))))).read?.() ?? runtime.container(runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0))), "read"));
  }
  return {
    "int_enable_w": method_int_enable_w,
    "screen_update_invaders": method_screen_update_invaders,
    "is_cabinet_cocktail": method_is_cabinet_cocktail,
    "invaders_in0_control_r": method_invaders_in0_control_r,
    "invaders_in1_control_r": method_invaders_in1_control_r,
    "invaders_in2_control_r": method_invaders_in2_control_r
  };
})();
    return {
      "invaders_state.screen_update_invaders": methods["screen_update_invaders"],
      "invaders_state.is_cabinet_cocktail": methods["is_cabinet_cocktail"],
      "invaders_state.invaders_in0_control_r": methods["invaders_in0_control_r"],
      "invaders_state.invaders_in1_control_r": methods["invaders_in1_control_r"],
      "invaders_state.invaders_in2_control_r": methods["invaders_in2_control_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_cabinet_type.read","m_maincpu.set_input_line","m_player_controls[0].read","m_screen.vpos","machine","machine().time","read","rgb_t::black","rgb_t::white"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
