// GENERATED executable machine composition from src/mame/sega/segas16a.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'shinobi');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_tileram_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_tileram = members.m_tileram ?? runtime.member("m_tileram");
    return runtime.readIndex(h_m_tileram, offset);
  }

  function method_textram_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_textram = members.m_textram ?? runtime.member("m_textram");
    return runtime.readIndex(h_m_textram, offset);
  }

  function method_misc_io_r(runtime: any, offset: any) {
    const members = runtime.members;
    return (runtime.calls["m_custom_io_r"] ? runtime.calls["m_custom_io_r"](offset) : runtime.macro("m_custom_io_r", offset));
  }

  function method_misc_io_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    (runtime.calls["m_custom_io_w"] ? runtime.calls["m_custom_io_w"](offset, data, mem_mask) : runtime.macro("m_custom_io_w", offset, data, mem_mask));
  }

  function method_sound_data_r(runtime: any) {
    const members = runtime.members;
    (runtime.calls["m_i8255.pc6_w"] ? runtime.calls["m_i8255.pc6_w"](0) : (members.m_i8255) != null ? ((runtime.dereference(members.m_i8255)).pc6_w?.(0) ?? 0) : (runtime.calls["pc6_w"]?.(0) ?? 0));
    return (runtime.calls["m_soundlatch.read"] ? runtime.calls["m_soundlatch.read"]() : (members.m_soundlatch) != null ? (typeof (runtime.dereference(members.m_soundlatch)).read === 'function' ? (runtime.dereference(members.m_soundlatch)).read() : typeof (runtime.dereference(members.m_soundlatch)).read === 'number' || typeof (runtime.dereference(members.m_soundlatch)).read === 'boolean' ? (runtime.dereference(members.m_soundlatch)).read : runtime.container(members.m_soundlatch, "read")) : (runtime.calls["read"]?.() ?? 0));
  }

  function method_upd7751_p2_r(runtime: any) {
    const members = runtime.members;
    return ((((128) | ((((((members.m_upd7751_command ?? runtime.member("m_upd7751_command"))) & (7))) << (4))))) | ((((runtime.calls["m_upd7751_i8243.p2_r"] ? runtime.calls["m_upd7751_i8243.p2_r"]() : (members.m_upd7751_i8243) != null ? (typeof (runtime.dereference(members.m_upd7751_i8243)).p2_r === 'function' ? (runtime.dereference(members.m_upd7751_i8243)).p2_r() : typeof (runtime.dereference(members.m_upd7751_i8243)).p2_r === 'number' || typeof (runtime.dereference(members.m_upd7751_i8243)).p2_r === 'boolean' ? (runtime.dereference(members.m_upd7751_i8243)).p2_r : runtime.container(members.m_upd7751_i8243, "p2_r")) : (runtime.calls["p2_r"]?.() ?? 0))) & (15))));
  }

  function method_upd7751_p2_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_upd7751_i8243.p2_w"] ? runtime.calls["m_upd7751_i8243.p2_w"](((data) & (15))) : (members.m_upd7751_i8243) != null ? ((runtime.dereference(members.m_upd7751_i8243)).p2_w?.(((data) & (15))) ?? 0) : (runtime.calls["p2_w"]?.(((data) & (15))) ?? 0));
  }

  function method_upd7751_rom_offset_w_0(runtime: any, data: any) {
    const members = runtime.members;
    let mask: any = ((((15) << (0))) & (16383));
    let newdata: any = ((((data) << (0))) & (mask));
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_4(runtime: any, data: any) {
    const members = runtime.members;
    let mask: any = ((((15) << (4))) & (16383));
    let newdata: any = ((((data) << (4))) & (mask));
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_8(runtime: any, data: any) {
    const members = runtime.members;
    let mask: any = ((((15) << (8))) & (16383));
    let newdata: any = ((((data) << (8))) & (mask));
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_12(runtime: any, data: any) {
    const members = runtime.members;
    let mask: any = ((((15) << (12))) & (16383));
    let newdata: any = ((((data) << (12))) & (mask));
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_tilemap_sound_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_soundcpu.set_input_line"] ? runtime.calls["m_soundcpu.set_input_line"](-1, ((((data) & (128))) ? (0) : (1))) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(-1, ((((data) & (128))) ? (0) : (1))) ?? 0) : (runtime.calls["set_input_line"]?.(-1, ((((data) & (128))) ? (0) : (1))) ?? 0));
    (runtime.calls["m_segaic16vid.tilemap_set_colscroll"] ? runtime.calls["m_segaic16vid.tilemap_set_colscroll"](0, (((~data)) & (4))) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_set_colscroll?.(0, (((~data)) & (4))) ?? 0) : (runtime.calls["tilemap_set_colscroll"]?.(0, (((~data)) & (4))) ?? 0));
    (runtime.calls["m_segaic16vid.tilemap_set_rowscroll"] ? runtime.calls["m_segaic16vid.tilemap_set_rowscroll"](0, (((~data)) & (2))) : (members.m_segaic16vid) != null ? ((runtime.dereference(members.m_segaic16vid)).tilemap_set_rowscroll?.(0, (((~data)) & (2))) ?? 0) : (runtime.calls["tilemap_set_rowscroll"]?.(0, (((~data)) & (2))) ?? 0));
  }
  return {
    "tileram_r": method_tileram_r,
    "textram_r": method_textram_r,
    "misc_io_r": method_misc_io_r,
    "misc_io_w": method_misc_io_w,
    "sound_data_r": method_sound_data_r,
    "upd7751_p2_r": method_upd7751_p2_r,
    "upd7751_p2_w": method_upd7751_p2_w,
    "upd7751_rom_offset_w_0": method_upd7751_rom_offset_w_0,
    "upd7751_rom_offset_w_4": method_upd7751_rom_offset_w_4,
    "upd7751_rom_offset_w_8": method_upd7751_rom_offset_w_8,
    "upd7751_rom_offset_w_12": method_upd7751_rom_offset_w_12,
    "tilemap_sound_w": method_tilemap_sound_w
  };
})();
    return {
      "segas16a_state.misc_io_r": methods["misc_io_r"],
      "segas16a_state.misc_io_w": methods["misc_io_w"],
      "segas16a_state.sound_data_r": methods["sound_data_r"],
      "segas16a_state.upd7751_p2_r": methods["upd7751_p2_r"],
      "segas16a_state.upd7751_p2_w": methods["upd7751_p2_w"],
      "segas16a_state.upd7751_rom_offset_w_0": methods["upd7751_rom_offset_w_0"],
      "segas16a_state.upd7751_rom_offset_w_4": methods["upd7751_rom_offset_w_4"],
      "segas16a_state.upd7751_rom_offset_w_8": methods["upd7751_rom_offset_w_8"],
      "segas16a_state.upd7751_rom_offset_w_12": methods["upd7751_rom_offset_w_12"],
      "segas16a_state.tilemap_sound_w": methods["tilemap_sound_w"],
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
