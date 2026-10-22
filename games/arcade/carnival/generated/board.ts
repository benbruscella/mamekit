// GENERATED executable machine composition from src/mame/sega/vicdual.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'carnival');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_characterram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
  }

  function method_carnival_io_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((offset) & (1))) {
      (runtime.overrides["carnival_audio_1_w"] ? runtime.overrides["carnival_audio_1_w"](data) : method_carnival_audio_1_w(runtime, data));
    }
    if (((offset) & (2))) {
      (runtime.overrides["carnival_audio_2_w"] ? runtime.overrides["carnival_audio_2_w"](data) : method_carnival_audio_2_w(runtime, data));
    }
    if (((offset) & (8))) {
      (runtime.overrides["assert_coin_status"] ? runtime.overrides["assert_coin_status"]() : method_assert_coin_status(runtime));
    }
    if (((offset) & (64))) {
      (runtime.overrides["palette_bank_w"] ? runtime.overrides["palette_bank_w"](data) : method_palette_bank_w(runtime, data));
    }
  }

  function method_carnival_audio_1_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = ((0) | 0);
    let bitsGoneHigh: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port1State ?? runtime.member("m_port1State"))) ^ (data))) | 0);
    bitsGoneHigh = ((((bitsChanged) & (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port1State = ((data) | 0);
    if (((bitsGoneLow) & (1))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 9, 0) : runtime.macro("PLAY", h_m_samples, 9, 0));
    }
    if (((bitsGoneLow) & (2))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 3, 0) : runtime.macro("PLAY", h_m_samples, 3, 0));
    }
    if (((bitsGoneLow) & (4))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 4, 1) : runtime.macro("PLAY", h_m_samples, 4, 1));
    }
    if (((bitsGoneHigh) & (4))) {
      (__l["STOP"] ? __l["STOP"](h_m_samples, 4) : runtime.macro("STOP", h_m_samples, 4));
    }
    if (((bitsGoneLow) & (8))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 5, 1) : runtime.macro("PLAY", h_m_samples, 5, 1));
    }
    if (((bitsGoneHigh) & (8))) {
      (__l["STOP"] ? __l["STOP"](h_m_samples, 5) : runtime.macro("STOP", h_m_samples, 5));
    }
    if (((bitsGoneLow) & (16))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 6, 1) : runtime.macro("PLAY", h_m_samples, 6, 1));
    }
    if (((bitsGoneHigh) & (16))) {
      (__l["STOP"] ? __l["STOP"](h_m_samples, 6) : runtime.macro("STOP", h_m_samples, 6));
    }
    if (((bitsGoneLow) & (32))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 7, 0) : runtime.macro("PLAY", h_m_samples, 7, 0));
    }
    if (((bitsGoneLow) & (64))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 1, 0) : runtime.macro("PLAY", h_m_samples, 1, 0));
    }
    if (((bitsGoneLow) & (128))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 2, 0) : runtime.macro("PLAY", h_m_samples, 2, 0));
    }
  }

  function method_carnival_audio_2_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port2State ?? runtime.member("m_port2State"))) ^ (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port2State = ((data) | 0);
    if (((bitsGoneLow) & (4))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 0, 0) : runtime.macro("PLAY", h_m_samples, 0, 0));
    }
    if (((bitsGoneLow) & (32))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 8, 0) : runtime.macro("PLAY", h_m_samples, 8, 0));
    }
    (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, ((((data) & (16))) ? (0) : (1)));
  }

  function method_assert_coin_status(runtime: any): any {
    const members = runtime.members;

    members.m_coin_status = ((1) & 0xff);
  }

  function method_palette_bank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_palette_bank = ((((data) & (3))) & 0xff);
  }

  function method_carnival_music_port_t1_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.shiftRight((~(members.m_port2State ?? runtime.member("m_port2State"))), 3)) & (1));
  }

  function method_clear_coin_status(runtime: any, param: any): any {
    const members = runtime.members;

    members.m_coin_status = ((0) & 0xff);
  }

  function method_coin_status_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_coin_status ?? runtime.member("m_coin_status"));
  }

  function method_cblank_comp_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((runtime.overrides["vblank_comp_r"] ? runtime.overrides["vblank_comp_r"]() : method_vblank_comp_r(runtime))) && ((((__l["m_screen.hblank"] ?? runtime.memberCall(members.m_screen, "hblank", 0, undefined))()) ? 0 : 1))) ? 1 : 0);
  }

  function method_vblank_comp_r(runtime: any): any {
    const members = runtime.members;

    return ((Number((runtime.overrides["get_vcounter"] ? runtime.overrides["get_vcounter"]() : method_get_vcounter(runtime))) < Number(224)) ? 1 : 0);
  }

  function method_get_vcounter(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let vcounter: any = (((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    if (((Number((__l["m_screen.hpos"] ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))()) >= Number(304)) ? 1 : 0)) {
      vcounter = ((((((vcounter) + (1))) % (262))) | 0);
    }
    return vcounter;
  }

  function method_timer_value_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((typeof (__l["machine().time"]?.() ?? 0) === 'number' ? runtime.attotime((__l["machine().time"]?.() ?? 0), "as_ticks", 500) : ((runtime.dereference((__l["machine().time"]?.() ?? 0))).as_ticks?.(500) ?? 0))) & (1));
  }
  return {
    "videoram_w": method_videoram_w,
    "characterram_w": method_characterram_w,
    "carnival_io_w": method_carnival_io_w,
    "carnival_audio_1_w": method_carnival_audio_1_w,
    "carnival_audio_2_w": method_carnival_audio_2_w,
    "assert_coin_status": method_assert_coin_status,
    "palette_bank_w": method_palette_bank_w,
    "carnival_music_port_t1_r": method_carnival_music_port_t1_r,
    "clear_coin_status": method_clear_coin_status,
    "coin_status_r": method_coin_status_r,
    "cblank_comp_r": method_cblank_comp_r,
    "vblank_comp_r": method_vblank_comp_r,
    "get_vcounter": method_get_vcounter,
    "timer_value_r": method_timer_value_r
  };
})();
    return {
      "vicdual_state.videoram_w": methods["videoram_w"],
      "vicdual_state.characterram_w": methods["characterram_w"],
      "vicdual_state.assert_coin_status": methods["assert_coin_status"],
      "vicdual_state.palette_bank_w": methods["palette_bank_w"],
      "vicdual_state.clear_coin_status": methods["clear_coin_status"],
      "vicdual_state.coin_status_r": methods["coin_status_r"],
      "vicdual_state.cblank_comp_r": methods["cblank_comp_r"],
      "vicdual_state.vblank_comp_r": methods["vblank_comp_r"],
      "vicdual_state.get_vcounter": methods["get_vcounter"],
      "vicdual_state.timer_value_r": methods["timer_value_r"],
    };
  })(),
  ...(() => {
    const methods = (() => {


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_characterram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
  }

  function method_carnival_io_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((offset) & (1))) {
      (runtime.overrides["carnival_audio_1_w"] ? runtime.overrides["carnival_audio_1_w"](data) : method_carnival_audio_1_w(runtime, data));
    }
    if (((offset) & (2))) {
      (runtime.overrides["carnival_audio_2_w"] ? runtime.overrides["carnival_audio_2_w"](data) : method_carnival_audio_2_w(runtime, data));
    }
    if (((offset) & (8))) {
      (runtime.overrides["assert_coin_status"] ? runtime.overrides["assert_coin_status"]() : method_assert_coin_status(runtime));
    }
    if (((offset) & (64))) {
      (runtime.overrides["palette_bank_w"] ? runtime.overrides["palette_bank_w"](data) : method_palette_bank_w(runtime, data));
    }
  }

  function method_carnival_audio_1_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = ((0) | 0);
    let bitsGoneHigh: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port1State ?? runtime.member("m_port1State"))) ^ (data))) | 0);
    bitsGoneHigh = ((((bitsChanged) & (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port1State = ((data) | 0);
    if (((bitsGoneLow) & (1))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 9, 0) : runtime.macro("PLAY", h_m_samples, 9, 0));
    }
    if (((bitsGoneLow) & (2))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 3, 0) : runtime.macro("PLAY", h_m_samples, 3, 0));
    }
    if (((bitsGoneLow) & (4))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 4, 1) : runtime.macro("PLAY", h_m_samples, 4, 1));
    }
    if (((bitsGoneHigh) & (4))) {
      (__l["STOP"] ? __l["STOP"](h_m_samples, 4) : runtime.macro("STOP", h_m_samples, 4));
    }
    if (((bitsGoneLow) & (8))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 5, 1) : runtime.macro("PLAY", h_m_samples, 5, 1));
    }
    if (((bitsGoneHigh) & (8))) {
      (__l["STOP"] ? __l["STOP"](h_m_samples, 5) : runtime.macro("STOP", h_m_samples, 5));
    }
    if (((bitsGoneLow) & (16))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 6, 1) : runtime.macro("PLAY", h_m_samples, 6, 1));
    }
    if (((bitsGoneHigh) & (16))) {
      (__l["STOP"] ? __l["STOP"](h_m_samples, 6) : runtime.macro("STOP", h_m_samples, 6));
    }
    if (((bitsGoneLow) & (32))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 7, 0) : runtime.macro("PLAY", h_m_samples, 7, 0));
    }
    if (((bitsGoneLow) & (64))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 1, 0) : runtime.macro("PLAY", h_m_samples, 1, 0));
    }
    if (((bitsGoneLow) & (128))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 2, 0) : runtime.macro("PLAY", h_m_samples, 2, 0));
    }
  }

  function method_carnival_audio_2_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port2State ?? runtime.member("m_port2State"))) ^ (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port2State = ((data) | 0);
    if (((bitsGoneLow) & (4))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 0, 0) : runtime.macro("PLAY", h_m_samples, 0, 0));
    }
    if (((bitsGoneLow) & (32))) {
      (__l["PLAY"] ? __l["PLAY"](h_m_samples, 8, 0) : runtime.macro("PLAY", h_m_samples, 8, 0));
    }
    (__l["m_audiocpu.set_input_line"] ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, ((((data) & (16))) ? (0) : (1)));
  }

  function method_assert_coin_status(runtime: any): any {
    const members = runtime.members;

    members.m_coin_status = ((1) & 0xff);
  }

  function method_palette_bank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_palette_bank = ((((data) & (3))) & 0xff);
  }

  function method_carnivala_music_port_1_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_musicdata = ((data) | 0);
    (runtime.overrides["carnival_psg_latch"] ? runtime.overrides["carnival_psg_latch"]() : method_carnival_psg_latch(runtime));
  }

  function method_carnival_psg_latch(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((members.m_musicbus ?? runtime.member("m_musicbus"))) & (1))) {
      if ((((members.m_musicbus ?? runtime.member("m_musicbus"))) & (2))) {
        (__l["m_psg.address_w"] ?? runtime.memberCall(members.m_psg, "address_w", 0, undefined))((members.m_musicdata ?? runtime.member("m_musicdata")));
      } else {
        (__l["m_psg.data_w"] ?? runtime.memberCall(members.m_psg, "data_w", 0, undefined))((members.m_musicdata ?? runtime.member("m_musicdata")));
      }
    }
  }

  function method_carnivala_music_port_2_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_musicbus = ((((runtime.shiftRight(data, 6)) & (3))) | 0);
    (runtime.overrides["carnival_psg_latch"] ? runtime.overrides["carnival_psg_latch"]() : method_carnival_psg_latch(runtime));
  }

  function method_carnival_music_port_t1_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.shiftRight((~(members.m_port2State ?? runtime.member("m_port2State"))), 3)) & (1));
  }

  function method_coin_status_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_coin_status ?? runtime.member("m_coin_status"));
  }

  function method_cblank_comp_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((runtime.overrides["vblank_comp_r"] ? runtime.overrides["vblank_comp_r"]() : method_vblank_comp_r(runtime))) && ((((__l["m_screen.hblank"] ?? runtime.memberCall(members.m_screen, "hblank", 0, undefined))()) ? 0 : 1))) ? 1 : 0);
  }

  function method_vblank_comp_r(runtime: any): any {
    const members = runtime.members;

    return ((Number((runtime.overrides["get_vcounter"] ? runtime.overrides["get_vcounter"]() : method_get_vcounter(runtime))) < Number(224)) ? 1 : 0);
  }

  function method_get_vcounter(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let vcounter: any = (((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    if (((Number((__l["m_screen.hpos"] ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))()) >= Number(304)) ? 1 : 0)) {
      vcounter = ((((((vcounter) + (1))) % (262))) | 0);
    }
    return vcounter;
  }

  function method_timer_value_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((typeof (__l["machine().time"]?.() ?? 0) === 'number' ? runtime.attotime((__l["machine().time"]?.() ?? 0), "as_ticks", 500) : ((runtime.dereference((__l["machine().time"]?.() ?? 0))).as_ticks?.(500) ?? 0))) & (1));
  }
  return {
    "videoram_w": method_videoram_w,
    "characterram_w": method_characterram_w,
    "carnival_io_w": method_carnival_io_w,
    "carnival_audio_1_w": method_carnival_audio_1_w,
    "carnival_audio_2_w": method_carnival_audio_2_w,
    "assert_coin_status": method_assert_coin_status,
    "palette_bank_w": method_palette_bank_w,
    "carnivala_music_port_1_w": method_carnivala_music_port_1_w,
    "carnival_psg_latch": method_carnival_psg_latch,
    "carnivala_music_port_2_w": method_carnivala_music_port_2_w,
    "carnival_music_port_t1_r": method_carnival_music_port_t1_r,
    "coin_status_r": method_coin_status_r,
    "cblank_comp_r": method_cblank_comp_r,
    "vblank_comp_r": method_vblank_comp_r,
    "get_vcounter": method_get_vcounter,
    "timer_value_r": method_timer_value_r
  };
})();
    return {
      "carnival_state.carnival_io_w": methods["carnival_io_w"],
      "carnival_state.carnival_audio_1_w": methods["carnival_audio_1_w"],
      "carnival_state.carnival_audio_2_w": methods["carnival_audio_2_w"],
      "carnival_state.carnivala_music_port_1_w": methods["carnivala_music_port_1_w"],
      "carnival_state.carnival_psg_latch": methods["carnival_psg_latch"],
      "carnival_state.carnivala_music_port_2_w": methods["carnivala_music_port_2_w"],
      "carnival_state.carnival_music_port_t1_r": methods["carnival_music_port_t1_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["PLAY","STOP","m_audiocpu.set_input_line","m_psg.address_w","m_psg.data_w","m_screen.hblank","m_screen.hpos","m_screen.update_partial","m_screen.vpos","machine","machine().time"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
