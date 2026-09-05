// GENERATED executable machine composition from src/mame/atari/gauntlet.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gauntlet');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_video_int_ack_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](4, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(4, 0) ?? 0) : (runtime.calls["set_input_line"]?.(4, 0) ?? 0));
  }

  function method_yscroll_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_yscroll = members.m_yscroll ?? runtime.member("m_yscroll");
    let oldyscroll: any = ((runtime.dereference(h_m_yscroll)) & 0xffff);
    runtime.combineData(h_m_yscroll, data, mem_mask);
    if (((Number(runtime.dereference(h_m_yscroll)) !== Number(oldyscroll)) ? 1 : 0)) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
      if (((Number((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) !== Number(((runtime.dereference(h_m_yscroll)) & (3)))) ? 1 : 0)) {
        members.m_playfield_tile_bank = ((((runtime.dereference(h_m_yscroll)) & (3))) & 0xff);
        (runtime.calls["m_playfield_tilemap.mark_all_dirty"] ? runtime.calls["m_playfield_tilemap.mark_all_dirty"]() : (members.m_playfield_tilemap) != null ? (typeof (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty : runtime.container(members.m_playfield_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
      }
      (runtime.calls["m_playfield_tilemap.set_scrolly"] ? runtime.calls["m_playfield_tilemap.set_scrolly"](0, ((runtime.dereference(h_m_yscroll)) >>> (7))) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).set_scrolly?.(0, ((runtime.dereference(h_m_yscroll)) >>> (7))) ?? 0) : (runtime.calls["set_scrolly"]?.(0, ((runtime.dereference(h_m_yscroll)) >>> (7))) ?? 0));
      (runtime.calls["m_mob.set_yscroll"] ? runtime.calls["m_mob.set_yscroll"](((((runtime.dereference(h_m_yscroll)) >>> (7))) & (511))) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).set_yscroll?.(((((runtime.dereference(h_m_yscroll)) >>> (7))) & (511))) ?? 0) : (runtime.calls["set_yscroll"]?.(((((runtime.dereference(h_m_yscroll)) >>> (7))) & (511))) ?? 0));
    }
  }

  function method_xscroll_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_xscroll = members.m_xscroll ?? runtime.member("m_xscroll");
    let oldxscroll: any = ((runtime.dereference(h_m_xscroll)) & 0xffff);
    runtime.combineData(h_m_xscroll, data, mem_mask);
    if (((Number(runtime.dereference(h_m_xscroll)) !== Number(oldxscroll)) ? 1 : 0)) {
      (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
      (runtime.calls["m_playfield_tilemap.set_scrollx"] ? runtime.calls["m_playfield_tilemap.set_scrollx"](0, runtime.dereference(h_m_xscroll)) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).set_scrollx?.(0, runtime.dereference(h_m_xscroll)) ?? 0) : (runtime.calls["set_scrollx"]?.(0, runtime.dereference(h_m_xscroll)) ?? 0));
      (runtime.calls["m_mob.set_xscroll"] ? runtime.calls["m_mob.set_xscroll"](((runtime.dereference(h_m_xscroll)) & (511))) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).set_xscroll?.(((runtime.dereference(h_m_xscroll)) & (511))) ?? 0) : (runtime.calls["set_xscroll"]?.(((runtime.dereference(h_m_xscroll)) & (511))) ?? 0));
    }
  }

  function method_switch_6502_r(runtime: any) {
    const members = runtime.members;
    let temp: any = 48;
    if ((runtime.calls["m_soundlatch.pending_r"] ? runtime.calls["m_soundlatch.pending_r"]() : (members.m_soundlatch) != null ? (typeof (runtime.dereference(members.m_soundlatch)).pending_r === 'function' ? (runtime.dereference(members.m_soundlatch)).pending_r() : typeof (runtime.dereference(members.m_soundlatch)).pending_r === 'number' || typeof (runtime.dereference(members.m_soundlatch)).pending_r === 'boolean' ? (runtime.dereference(members.m_soundlatch)).pending_r : runtime.container(members.m_soundlatch, "pending_r")) : (runtime.calls["pending_r"]?.() ?? 0))) {
      temp = ((temp) ^ (128));
    }
    if ((runtime.calls["m_mainlatch.pending_r"] ? runtime.calls["m_mainlatch.pending_r"]() : (members.m_mainlatch) != null ? (typeof (runtime.dereference(members.m_mainlatch)).pending_r === 'function' ? (runtime.dereference(members.m_mainlatch)).pending_r() : typeof (runtime.dereference(members.m_mainlatch)).pending_r === 'number' || typeof (runtime.dereference(members.m_mainlatch)).pending_r === 'boolean' ? (runtime.dereference(members.m_mainlatch)).pending_r : runtime.container(members.m_mainlatch, "pending_r")) : (runtime.calls["pending_r"]?.() ?? 0))) {
      temp = ((temp) ^ (64));
    }
    if ((((runtime.calls["m_tms5220.readyq_r"] ? runtime.calls["m_tms5220.readyq_r"]() : (members.m_tms5220) != null ? (typeof (runtime.dereference(members.m_tms5220)).readyq_r === 'function' ? (runtime.dereference(members.m_tms5220)).readyq_r() : typeof (runtime.dereference(members.m_tms5220)).readyq_r === 'number' || typeof (runtime.dereference(members.m_tms5220)).readyq_r === 'boolean' ? (runtime.dereference(members.m_tms5220)).readyq_r : runtime.container(members.m_tms5220, "readyq_r")) : (runtime.calls["readyq_r"]?.() ?? 0))) ? 0 : 1)) {
      temp = ((temp) ^ (32));
    }
    if (((((~(runtime.calls["m_803008.read"] ? runtime.calls["m_803008.read"]() : (members.m_803008) != null ? (typeof (runtime.dereference(members.m_803008)).read === 'function' ? (runtime.dereference(members.m_803008)).read() : typeof (runtime.dereference(members.m_803008)).read === 'number' || typeof (runtime.dereference(members.m_803008)).read === 'boolean' ? (runtime.dereference(members.m_803008)).read : runtime.container(members.m_803008, "read")) : (runtime.calls["read"]?.() ?? 0)))) >>> (3)) & 1)) {
      temp = ((temp) ^ (16));
    }
    return temp;
  }

  function method_sound_irq_ack_r(runtime: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
    }
    return 255;
  }

  function method_sound_irq_ack_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
  }

  function method_scanline_update(runtime: any, param: any) {
    const members = runtime.members;
    if (((param) & (32))) {
      (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 1) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
    }
  }

  function method_get_playfield_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let data: any = (((runtime.calls["m_playfield_tilemap.basemem_read"] ? runtime.calls["m_playfield_tilemap.basemem_read"](tile_index) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).basemem_read?.(tile_index) ?? 0) : (runtime.calls["basemem_read"]?.(tile_index) ?? 0))) & 0xffff);
    let code: any = ((runtime.add((((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) * (4096)), ((data) & (4095)))) ^ (2048));
    let color: any = runtime.add(runtime.add(16, (((members.m_playfield_color_bank ?? runtime.member("m_playfield_color_bank"))) * (8))), ((((data) >>> (12))) & (7)));
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, ((((data) >>> (15))) & (1))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, ((((data) >>> (15))) & (1))) ?? 0) : (runtime.calls["set"]?.(0, code, color, ((((data) >>> (15))) & (1))) ?? 0));
  }

  function method_speech_squeak_w(runtime: any, state: any) {
    const members = runtime.members;
    let data: any = ((((5) | (((state) ? (2) : (0))))) & 0xff);
    (runtime.calls["m_tms5220.set_unscaled_clock"] ? runtime.calls["m_tms5220.set_unscaled_clock"](runtime.divide(runtime.divide(14318181, 2), ((16) - (data)))) : (members.m_tms5220) != null ? ((runtime.dereference(members.m_tms5220)).set_unscaled_clock?.(runtime.divide(runtime.divide(14318181, 2), ((16) - (data)))) ?? 0) : (runtime.calls["set_unscaled_clock"]?.(runtime.divide(runtime.divide(14318181, 2), ((16) - (data)))) ?? 0));
  }
  return {
    "video_int_ack_w": method_video_int_ack_w,
    "yscroll_w": method_yscroll_w,
    "xscroll_w": method_xscroll_w,
    "switch_6502_r": method_switch_6502_r,
    "sound_irq_ack_r": method_sound_irq_ack_r,
    "sound_irq_ack_w": method_sound_irq_ack_w,
    "scanline_update": method_scanline_update,
    "get_playfield_tile_info": method_get_playfield_tile_info,
    "speech_squeak_w": method_speech_squeak_w
  };
})();
    return {
      "gauntlet_state.video_int_ack_w": methods["video_int_ack_w"],
      "gauntlet_state.yscroll_w": methods["yscroll_w"],
      "gauntlet_state.xscroll_w": methods["xscroll_w"],
      "gauntlet_state.switch_6502_r": methods["switch_6502_r"],
      "gauntlet_state.sound_irq_ack_r": methods["sound_irq_ack_r"],
      "gauntlet_state.sound_irq_ack_w": methods["sound_irq_ack_w"],
      "gauntlet_state.scanline_update": methods["scanline_update"],
      "gauntlet_state.get_playfield_tile_info": methods["get_playfield_tile_info"],
      "gauntlet_state.speech_squeak_w": methods["speech_squeak_w"],
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
