// GENERATED executable machine composition from src/mame/taito/qix.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'qix');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_video_firq_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (__l["m_videocpu.set_input_line"] ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 1);
    }
    return (__l["space.unmap"] ?? runtime.memberCall(space, "unmap", 0, __l["unmap"]))();
  }

  function method_video_firq_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_videocpu.set_input_line"] ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 1);
  }

  function method_data_firq_ack_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
    }
    return (__l["space.unmap"] ?? runtime.memberCall(space, "unmap", 0, __l["unmap"]))();
  }

  function method_data_firq_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
  }

  function method_videoram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    offset = ((offset) + (((((runtime.readIndex(h_m_videoram_address, 0)) & (128))) << (8))));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    offset = ((offset) + (((((runtime.readIndex(h_m_videoram_address, 0)) & (128))) << (8))));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_palettebank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(((data) & (3)))) ? 1 : 0)) {
      (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
      members.m_palette_bank = ((((data) & (3))) & 0xff);
    }
    members.m_leds = (((((~data)) & (252))) & 0xff);
  }

  function method_data_firq_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
    }
    return (__l["space.unmap"] ?? runtime.memberCall(space, "unmap", 0, __l["unmap"]))();
  }

  function method_data_firq_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
  }

  function method_video_firq_ack_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (__l["m_videocpu.set_input_line"] ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 0);
    }
    return (__l["space.unmap"] ?? runtime.memberCall(space, "unmap", 0, __l["unmap"]))();
  }

  function method_video_firq_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_videocpu.set_input_line"] ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 0);
  }

  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let old_data: any = (((__l["m_palette.read8"] ?? runtime.memberCall(members.m_palette, "read8", 0, undefined))(offset)) & 0xff);
    if ((((((Number(runtime.shiftRight(offset, 8)) === Number((members.m_palette_bank ?? runtime.member("m_palette_bank")))) ? 1 : 0)) && (((Number(old_data) !== Number(data)) ? 1 : 0))) ? 1 : 0)) {
      (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    (__l["m_palette.write8"] ?? runtime.memberCall(members.m_palette, "write8", 0, undefined))(offset, data);
  }

  function method_addresslatch_r(runtime: any): any {
    const members = runtime.members;

    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    let offset: any = ((((runtime.readIndex(h_m_videoram_address, 0)) << (8))) | (runtime.readIndex(h_m_videoram_address, 1)));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_addresslatch_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    let offset: any = ((((runtime.readIndex(h_m_videoram_address, 0)) << (8))) | (runtime.readIndex(h_m_videoram_address, 1)));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_display_enable_changed(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_scanline_latch = members.m_scanline_latch ?? runtime.member("m_scanline_latch");
    if (state) {
      let ma: any = (((__l["m_crtc.get_ma"] ?? runtime.memberCall(members.m_crtc, "get_ma", 0, undefined))()) & 0xffff);
      let ra: any = (((__l["m_crtc.get_ra"] ?? runtime.memberCall(members.m_crtc, "get_ra", 0, undefined))()) & 0xff);
      runtime.pointerStore(h_m_scanline_latch, ((((runtime.shiftRight(ma, 2)) & (248))) | (((ra) & (7)))));
    }
  }

  function method_flip_screen_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_flip = ((state) ? 1 : 0);
  }

  function method_sndpia_2_warning_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((__l["machine().phase"]?.() ?? 0)) > Number(2)) ? 1 : 0)) {
      0;
    }
  }
  return {
    "video_firq_r": method_video_firq_r,
    "video_firq_w": method_video_firq_w,
    "data_firq_ack_r": method_data_firq_ack_r,
    "data_firq_ack_w": method_data_firq_ack_w,
    "videoram_r": method_videoram_r,
    "videoram_w": method_videoram_w,
    "palettebank_w": method_palettebank_w,
    "data_firq_r": method_data_firq_r,
    "data_firq_w": method_data_firq_w,
    "video_firq_ack_r": method_video_firq_ack_r,
    "video_firq_ack_w": method_video_firq_ack_w,
    "paletteram_w": method_paletteram_w,
    "addresslatch_r": method_addresslatch_r,
    "addresslatch_w": method_addresslatch_w,
    "display_enable_changed": method_display_enable_changed,
    "flip_screen_w": method_flip_screen_w,
    "sndpia_2_warning_w": method_sndpia_2_warning_w
  };
})();
    return {
      "qix_state.video_firq_r": methods["video_firq_r"],
      "qix_state.video_firq_w": methods["video_firq_w"],
      "qix_state.data_firq_ack_r": methods["data_firq_ack_r"],
      "qix_state.data_firq_ack_w": methods["data_firq_ack_w"],
      "qix_state.videoram_r": methods["videoram_r"],
      "qix_state.videoram_w": methods["videoram_w"],
      "qix_state.palettebank_w": methods["palettebank_w"],
      "qix_state.data_firq_r": methods["data_firq_r"],
      "qix_state.data_firq_w": methods["data_firq_w"],
      "qix_state.video_firq_ack_r": methods["video_firq_ack_r"],
      "qix_state.video_firq_ack_w": methods["video_firq_ack_w"],
      "qix_state.paletteram_w": methods["paletteram_w"],
      "qix_state.addresslatch_r": methods["addresslatch_r"],
      "qix_state.addresslatch_w": methods["addresslatch_w"],
      "qix_state.display_enable_changed": methods["display_enable_changed"],
      "qix_state.flip_screen_w": methods["flip_screen_w"],
      "qix_state.sndpia_2_warning_w": methods["sndpia_2_warning_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_crtc.get_ma","m_crtc.get_ra","m_maincpu.set_input_line","m_palette.read8","m_palette.write8","m_screen.update_partial","m_screen.vpos","m_videocpu.set_input_line","machine","machine().phase","machine().side_effects_disabled","space.unmap","unmap"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
