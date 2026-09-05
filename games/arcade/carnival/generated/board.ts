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
  function method_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_characterram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
  }

  function method_carnival_io_w(runtime: any, offset: any, data: any) {
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

  function method_carnival_audio_1_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = 0;
    let bitsGoneHigh: any = 0;
    let bitsGoneLow: any = 0;
    bitsChanged = (((members.m_port1State ?? runtime.member("m_port1State"))) ^ (data));
    bitsGoneHigh = ((bitsChanged) & (data));
    bitsGoneLow = ((bitsChanged) & ((~data)));
    members.m_port1State = ((data) | 0);
    if (((bitsGoneLow) & (1))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 9, 0) : runtime.macro("PLAY", h_m_samples, 9, 0));
    }
    if (((bitsGoneLow) & (2))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 3, 0) : runtime.macro("PLAY", h_m_samples, 3, 0));
    }
    if (((bitsGoneLow) & (4))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 4, 1) : runtime.macro("PLAY", h_m_samples, 4, 1));
    }
    if (((bitsGoneHigh) & (4))) {
      (runtime.calls["STOP"] ? runtime.calls["STOP"](h_m_samples, 4) : runtime.macro("STOP", h_m_samples, 4));
    }
    if (((bitsGoneLow) & (8))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 5, 1) : runtime.macro("PLAY", h_m_samples, 5, 1));
    }
    if (((bitsGoneHigh) & (8))) {
      (runtime.calls["STOP"] ? runtime.calls["STOP"](h_m_samples, 5) : runtime.macro("STOP", h_m_samples, 5));
    }
    if (((bitsGoneLow) & (16))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 6, 1) : runtime.macro("PLAY", h_m_samples, 6, 1));
    }
    if (((bitsGoneHigh) & (16))) {
      (runtime.calls["STOP"] ? runtime.calls["STOP"](h_m_samples, 6) : runtime.macro("STOP", h_m_samples, 6));
    }
    if (((bitsGoneLow) & (32))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 7, 0) : runtime.macro("PLAY", h_m_samples, 7, 0));
    }
    if (((bitsGoneLow) & (64))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 1, 0) : runtime.macro("PLAY", h_m_samples, 1, 0));
    }
    if (((bitsGoneLow) & (128))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 2, 0) : runtime.macro("PLAY", h_m_samples, 2, 0));
    }
  }

  function method_carnival_audio_2_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = 0;
    let bitsGoneLow: any = 0;
    bitsChanged = (((members.m_port2State ?? runtime.member("m_port2State"))) ^ (data));
    bitsGoneLow = ((bitsChanged) & ((~data)));
    members.m_port2State = ((data) | 0);
    if (((bitsGoneLow) & (4))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 0, 0) : runtime.macro("PLAY", h_m_samples, 0, 0));
    }
    if (((bitsGoneLow) & (32))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 8, 0) : runtime.macro("PLAY", h_m_samples, 8, 0));
    }
    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](-2, ((((data) & (16))) ? (0) : (1))) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(-2, ((((data) & (16))) ? (0) : (1))) ?? 0) : (runtime.calls["set_input_line"]?.(-2, ((((data) & (16))) ? (0) : (1))) ?? 0));
  }

  function method_assert_coin_status(runtime: any) {
    const members = runtime.members;
    members.m_coin_status = ((1) & 0xff);
  }

  function method_palette_bank_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    members.m_palette_bank = ((((data) & (3))) & 0xff);
  }
  return {
    "videoram_w": method_videoram_w,
    "characterram_w": method_characterram_w,
    "carnival_io_w": method_carnival_io_w,
    "carnival_audio_1_w": method_carnival_audio_1_w,
    "carnival_audio_2_w": method_carnival_audio_2_w,
    "assert_coin_status": method_assert_coin_status,
    "palette_bank_w": method_palette_bank_w
  };
})();
    return {
      "vicdual_state.videoram_w": methods["videoram_w"],
      "vicdual_state.characterram_w": methods["characterram_w"],
      "vicdual_state.assert_coin_status": methods["assert_coin_status"],
      "vicdual_state.palette_bank_w": methods["palette_bank_w"],
    };
  })(),
  ...(() => {
    const methods = (() => {
  function method_videoram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_characterram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
  }

  function method_carnival_io_w(runtime: any, offset: any, data: any) {
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

  function method_carnival_audio_1_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = 0;
    let bitsGoneHigh: any = 0;
    let bitsGoneLow: any = 0;
    bitsChanged = (((members.m_port1State ?? runtime.member("m_port1State"))) ^ (data));
    bitsGoneHigh = ((bitsChanged) & (data));
    bitsGoneLow = ((bitsChanged) & ((~data)));
    members.m_port1State = ((data) | 0);
    if (((bitsGoneLow) & (1))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 9, 0) : runtime.macro("PLAY", h_m_samples, 9, 0));
    }
    if (((bitsGoneLow) & (2))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 3, 0) : runtime.macro("PLAY", h_m_samples, 3, 0));
    }
    if (((bitsGoneLow) & (4))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 4, 1) : runtime.macro("PLAY", h_m_samples, 4, 1));
    }
    if (((bitsGoneHigh) & (4))) {
      (runtime.calls["STOP"] ? runtime.calls["STOP"](h_m_samples, 4) : runtime.macro("STOP", h_m_samples, 4));
    }
    if (((bitsGoneLow) & (8))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 5, 1) : runtime.macro("PLAY", h_m_samples, 5, 1));
    }
    if (((bitsGoneHigh) & (8))) {
      (runtime.calls["STOP"] ? runtime.calls["STOP"](h_m_samples, 5) : runtime.macro("STOP", h_m_samples, 5));
    }
    if (((bitsGoneLow) & (16))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 6, 1) : runtime.macro("PLAY", h_m_samples, 6, 1));
    }
    if (((bitsGoneHigh) & (16))) {
      (runtime.calls["STOP"] ? runtime.calls["STOP"](h_m_samples, 6) : runtime.macro("STOP", h_m_samples, 6));
    }
    if (((bitsGoneLow) & (32))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 7, 0) : runtime.macro("PLAY", h_m_samples, 7, 0));
    }
    if (((bitsGoneLow) & (64))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 1, 0) : runtime.macro("PLAY", h_m_samples, 1, 0));
    }
    if (((bitsGoneLow) & (128))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 2, 0) : runtime.macro("PLAY", h_m_samples, 2, 0));
    }
  }

  function method_carnival_audio_2_w(runtime: any, data: any) {
    const members = runtime.members;
    const h_m_samples = members.m_samples ?? runtime.member("m_samples");
    let bitsChanged: any = 0;
    let bitsGoneLow: any = 0;
    bitsChanged = (((members.m_port2State ?? runtime.member("m_port2State"))) ^ (data));
    bitsGoneLow = ((bitsChanged) & ((~data)));
    members.m_port2State = ((data) | 0);
    if (((bitsGoneLow) & (4))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 0, 0) : runtime.macro("PLAY", h_m_samples, 0, 0));
    }
    if (((bitsGoneLow) & (32))) {
      (runtime.calls["PLAY"] ? runtime.calls["PLAY"](h_m_samples, 8, 0) : runtime.macro("PLAY", h_m_samples, 8, 0));
    }
    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](-2, ((((data) & (16))) ? (0) : (1))) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(-2, ((((data) & (16))) ? (0) : (1))) ?? 0) : (runtime.calls["set_input_line"]?.(-2, ((((data) & (16))) ? (0) : (1))) ?? 0));
  }

  function method_assert_coin_status(runtime: any) {
    const members = runtime.members;
    members.m_coin_status = ((1) & 0xff);
  }

  function method_palette_bank_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    members.m_palette_bank = ((((data) & (3))) & 0xff);
  }

  function method_carnivala_music_port_1_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_musicdata = ((data) | 0);
    (runtime.overrides["carnival_psg_latch"] ? runtime.overrides["carnival_psg_latch"]() : method_carnival_psg_latch(runtime));
  }

  function method_carnival_psg_latch(runtime: any) {
    const members = runtime.members;
    if ((((members.m_musicbus ?? runtime.member("m_musicbus"))) & (1))) {
      if ((((members.m_musicbus ?? runtime.member("m_musicbus"))) & (2))) {
        (runtime.calls["m_psg.address_w"] ? runtime.calls["m_psg.address_w"]((members.m_musicdata ?? runtime.member("m_musicdata"))) : (members.m_psg) != null ? ((runtime.dereference(members.m_psg)).address_w?.((members.m_musicdata ?? runtime.member("m_musicdata"))) ?? 0) : (runtime.calls["address_w"]?.((members.m_musicdata ?? runtime.member("m_musicdata"))) ?? 0));
      } else {
        (runtime.calls["m_psg.data_w"] ? runtime.calls["m_psg.data_w"]((members.m_musicdata ?? runtime.member("m_musicdata"))) : (members.m_psg) != null ? ((runtime.dereference(members.m_psg)).data_w?.((members.m_musicdata ?? runtime.member("m_musicdata"))) ?? 0) : (runtime.calls["data_w"]?.((members.m_musicdata ?? runtime.member("m_musicdata"))) ?? 0));
      }
    }
  }

  function method_carnivala_music_port_2_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_musicbus = ((((((data) >>> (6))) & (3))) | 0);
    (runtime.overrides["carnival_psg_latch"] ? runtime.overrides["carnival_psg_latch"]() : method_carnival_psg_latch(runtime));
  }

  function method_carnival_music_port_t1_r(runtime: any) {
    const members = runtime.members;
    return (((((~(members.m_port2State ?? runtime.member("m_port2State")))) >>> (3))) & (1));
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
    "carnival_music_port_t1_r": method_carnival_music_port_t1_r
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
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
