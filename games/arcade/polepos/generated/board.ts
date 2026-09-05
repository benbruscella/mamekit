// GENERATED executable machine composition from src/mame/namco/polepos.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'polepos');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_sprite_r(runtime: any, offset: any) {
    const members = runtime.members;
    return ((runtime.readIndex((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), offset)) & (255));
  }

  function method_sprite_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_sprite16_memory"), offset, ((((runtime.readIndex((members.m_sprite16_memory ?? runtime.member("m_sprite16_memory")), offset)) & (65280))) | (data)));
  }

  function method_road_r(runtime: any, offset: any) {
    const members = runtime.members;
    return ((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), offset)) & (255));
  }

  function method_road_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_road16_memory"), offset, ((((runtime.readIndex((members.m_road16_memory ?? runtime.member("m_road16_memory")), offset)) & (65280))) | (data)));
  }

  function method_alpha_r(runtime: any, offset: any) {
    const members = runtime.members;
    return ((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset)) & (255));
  }

  function method_alpha_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_alpha16_memory"), offset, ((((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset)) & (65280))) | (data)));
    (runtime.calls["m_tx_tilemap.mark_tile_dirty"] ? runtime.calls["m_tx_tilemap.mark_tile_dirty"](offset) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_view_r(runtime: any, offset: any) {
    const members = runtime.members;
    return ((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset)) & (255));
  }

  function method_view_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_view16_memory"), offset, ((((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset)) & (65280))) | (data)));
    if (((Number(offset) < Number(1024)) ? 1 : 0)) {
      (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
    }
  }

  function method_ready_r(runtime: any) {
    const members = runtime.members;
    let ret: any = 255;
    if (((Number((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) >= Number(128)) ? 1 : 0)) {
      ret = ((ret) ^ (2));
    }
    if ((((runtime.calls["m_adc.intr_r"] ? runtime.calls["m_adc.intr_r"]() : (members.m_adc) != null ? (typeof (runtime.dereference(members.m_adc)).intr_r === 'function' ? (runtime.dereference(members.m_adc)).intr_r() : typeof (runtime.dereference(members.m_adc)).intr_r === 'number' || typeof (runtime.dereference(members.m_adc)).intr_r === 'boolean' ? (runtime.dereference(members.m_adc)).intr_r : runtime.container(members.m_adc, "intr_r")) : (runtime.calls["intr_r"]?.() ?? 0))) ? 0 : 1)) {
      ret = ((ret) ^ (8));
    }
    return ret;
  }

  function method_alpha16_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    runtime.combineData(runtime.addressOf((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), offset), data, mem_mask);
    (runtime.calls["m_tx_tilemap.mark_tile_dirty"] ? runtime.calls["m_tx_tilemap.mark_tile_dirty"](offset) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
  }

  function method_view16_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    runtime.combineData(runtime.addressOf((members.m_view16_memory ?? runtime.member("m_view16_memory")), offset), data, mem_mask);
    if (((Number(offset) < Number(1024)) ? 1 : 0)) {
      (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
    }
  }

  function method_bg_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let word: any = ((runtime.readIndex((members.m_view16_memory ?? runtime.member("m_view16_memory")), tile_index)) & 0xffff);
    let code: any = ((((word) & (255))) | (((((word) & (16384))) >>> (6))));
    let color: any = ((((word) & (16128))) >>> (8));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, 0) ?? 0) : (runtime.calls["set"]?.(1, code, color, 0) ?? 0));
  }

  function method_tx_get_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let word: any = ((runtime.readIndex((members.m_alpha16_memory ?? runtime.member("m_alpha16_memory")), tile_index)) & 0xffff);
    let code: any = ((((word) & (255))) | (((((word) & (16384))) >>> (6))));
    let color: any = ((((word) & (16128))) >>> (8));
    if (((Number((members.m_chacl ?? runtime.member("m_chacl"))) === Number(0)) ? 1 : 0)) {
      code = runtime.andAssign(code, 255);
      color = 0;
    }
    if (((Number(tile_index) >= Number(((32) * (16)))) ? 1 : 0)) {
      color = ((color) | (64));
    }
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
    tileinfo.group = color;
  }

  function method_namco_52xx_si_r(runtime: any) {
    const members = runtime.members;
    return 1;
  }

  function method_namco_53xx_k_r(runtime: any) {
    const members = runtime.members;
    return 0;
  }

  function method_steering_changed_r(runtime: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      let steer_new: any = (((runtime.calls["m_steer_io.read"] ? runtime.calls["m_steer_io.read"]() : (members.m_steer_io) != null ? (typeof (runtime.dereference(members.m_steer_io)).read === 'function' ? (runtime.dereference(members.m_steer_io)).read() : typeof (runtime.dereference(members.m_steer_io)).read === 'number' || typeof (runtime.dereference(members.m_steer_io)).read === 'boolean' ? (runtime.dereference(members.m_steer_io)).read : runtime.container(members.m_steer_io, "read")) : (runtime.calls["read"]?.() ?? 0))) & 0xff);
      members.m_steer_accum = ((((members.m_steer_accum) + (((((((steer_new) - ((members.m_steer_last ?? runtime.member("m_steer_last"))))) << 24 >> 24)) * (2))))) << 16 >> 16);
      members.m_steer_last = ((steer_new) & 0xff);
      if (((Number((members.m_steer_accum ?? runtime.member("m_steer_accum"))) < Number(0)) ? 1 : 0)) {
        members.m_steer_delta = ((0) & 0xff);
        members.m_steer_accum = ((((members.m_steer_accum) + (1))) << 16 >> 16);
      } else {
        if (((Number((members.m_steer_accum ?? runtime.member("m_steer_accum"))) > Number(0)) ? 1 : 0)) {
          members.m_steer_delta = ((1) & 0xff);
          members.m_steer_accum = ((((members.m_steer_accum) - (1))) << 16 >> 16);
        }
      }
    }
    return (((members.m_steer_accum ?? runtime.member("m_steer_accum"))) & (1));
  }

  function method_steering_delta_r(runtime: any) {
    const members = runtime.members;
    return (members.m_steer_delta ?? runtime.member("m_steer_delta"));
  }

  function method_gasel_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_adc_input = ((state) & 0xff);
  }

  function method_sb0_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_auto_start_mask = ((((state) ? 0 : 1)) << 24 >> 24);
  }

  function method_chacl_w(runtime: any, state: any) {
    const members = runtime.members;
    members.m_chacl = ((state) & 0xff);
    (runtime.calls["m_tx_tilemap.mark_all_dirty"] ? runtime.calls["m_tx_tilemap.mark_all_dirty"]() : (members.m_tx_tilemap) != null ? (typeof (runtime.dereference(members.m_tx_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_tx_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_tx_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_tx_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_tx_tilemap)).mark_all_dirty : runtime.container(members.m_tx_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
  }

  function method_analog_r(runtime: any) {
    const members = runtime.members;
    const h_m_analog_io = members.m_analog_io ?? runtime.member("m_analog_io");
    return ((runtime.dereference(runtime.readIndex(h_m_analog_io, (((members.m_adc_input ?? runtime.member("m_adc_input"))) & (1))))).read?.() ?? runtime.container(runtime.readIndex(h_m_analog_io, (((members.m_adc_input ?? runtime.member("m_adc_input"))) & (1))), "read"));
  }
  return {
    "sprite_r": method_sprite_r,
    "sprite_w": method_sprite_w,
    "road_r": method_road_r,
    "road_w": method_road_w,
    "alpha_r": method_alpha_r,
    "alpha_w": method_alpha_w,
    "view_r": method_view_r,
    "view_w": method_view_w,
    "ready_r": method_ready_r,
    "alpha16_w": method_alpha16_w,
    "view16_w": method_view16_w,
    "bg_get_tile_info": method_bg_get_tile_info,
    "tx_get_tile_info": method_tx_get_tile_info,
    "namco_52xx_si_r": method_namco_52xx_si_r,
    "namco_53xx_k_r": method_namco_53xx_k_r,
    "steering_changed_r": method_steering_changed_r,
    "steering_delta_r": method_steering_delta_r,
    "gasel_w": method_gasel_w,
    "sb0_w": method_sb0_w,
    "chacl_w": method_chacl_w,
    "analog_r": method_analog_r
  };
})();
    return {
      "polepos_state.sprite_r": methods["sprite_r"],
      "polepos_state.sprite_w": methods["sprite_w"],
      "polepos_state.road_r": methods["road_r"],
      "polepos_state.road_w": methods["road_w"],
      "polepos_state.alpha_r": methods["alpha_r"],
      "polepos_state.alpha_w": methods["alpha_w"],
      "polepos_state.view_r": methods["view_r"],
      "polepos_state.view_w": methods["view_w"],
      "polepos_state.ready_r": methods["ready_r"],
      "polepos_state.alpha16_w": methods["alpha16_w"],
      "polepos_state.view16_w": methods["view16_w"],
      "polepos_state.bg_get_tile_info": methods["bg_get_tile_info"],
      "polepos_state.tx_get_tile_info": methods["tx_get_tile_info"],
      "polepos_state.namco_52xx_si_r": methods["namco_52xx_si_r"],
      "polepos_state.namco_53xx_k_r": methods["namco_53xx_k_r"],
      "polepos_state.steering_changed_r": methods["steering_changed_r"],
      "polepos_state.steering_delta_r": methods["steering_delta_r"],
      "polepos_state.gasel_w": methods["gasel_w"],
      "polepos_state.sb0_w": methods["sb0_w"],
      "polepos_state.chacl_w": methods["chacl_w"],
      "polepos_state.analog_r": methods["analog_r"],
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
