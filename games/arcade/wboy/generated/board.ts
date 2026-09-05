// GENERATED executable machine composition from src/mame/sega/system1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'wboy');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_paletteram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (runtime.calls["m_palette.set_pen_indirect"] ? runtime.calls["m_palette.set_pen_indirect"](offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_indirect?.(offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) ?? 0) : (runtime.calls["set_pen_indirect"]?.(offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset)) ?? 0));
  }

  function method_videoram_wait_states(runtime: any, cpu: any) {
    const members = runtime.members;
    let cpu_cycles_per_fixst: any = ((32) >>> 0);
    let fixst_offset: any = ((runtime.divide(cpu_cycles_per_fixst, 2)) >>> 0);
    let total_cycles: any = (((runtime.calls["cpu.total_cycles"] ? runtime.calls["cpu.total_cycles"]() : (cpu) != null ? (typeof (runtime.dereference(cpu)).total_cycles === 'function' ? (runtime.dereference(cpu)).total_cycles() : typeof (runtime.dereference(cpu)).total_cycles === 'number' || typeof (runtime.dereference(cpu)).total_cycles === 'boolean' ? (runtime.dereference(cpu)).total_cycles : runtime.container(cpu, "total_cycles")) : (runtime.calls["total_cycles"]?.() ?? 0))) * (10));
    let cycles_until_next_fixst: any = ((((cpu_cycles_per_fixst) - (((((total_cycles) - (fixst_offset))) % (cpu_cycles_per_fixst))))) >>> 0);
    (runtime.calls["cpu.adjust_icount"] ? runtime.calls["cpu.adjust_icount"]((-runtime.divide(((cycles_until_next_fixst) + (5)), 10))) : (cpu) != null ? ((runtime.dereference(cpu)).adjust_icount?.((-runtime.divide(((cycles_until_next_fixst) + (5)), 10))) ?? 0) : (runtime.calls["adjust_icount"]?.((-runtime.divide(((cycles_until_next_fixst) + (5)), 10))) ?? 0));
  }

  function method_mixer_collision_r(runtime: any, offset: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    return ((((runtime.readIndex((members.m_mix_collide ?? runtime.member("m_mix_collide")), ((offset) & (63)))) | (126))) | ((((members.m_mix_collide_summary ?? runtime.member("m_mix_collide_summary"))) << (7))));
  }

  function method_mixer_collision_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_mix_collide"), ((offset) & (63)), 0);
  }

  function method_mixer_collision_reset_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    members.m_mix_collide_summary = ((0) & 0xff);
  }

  function method_sprite_collision_r(runtime: any, offset: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    return ((((runtime.readIndex((members.m_sprite_collide ?? runtime.member("m_sprite_collide")), ((offset) & (1023)))) | (126))) | ((((members.m_sprite_collide_summary ?? runtime.member("m_sprite_collide_summary"))) << (7))));
  }

  function method_sprite_collision_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    runtime.writeIndex(runtime.writableMember("m_sprite_collide"), ((offset) & (1023)), 0);
  }

  function method_sprite_collision_reset_w(runtime: any, data: any) {
    const members = runtime.members;
    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
    members.m_sprite_collide_summary = ((0) & 0xff);
  }

  function method_tile_get_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any) {
    const members = runtime.members;
    let rambase: any = (runtime.calls["tilemap.user_data"] ? runtime.calls["tilemap.user_data"]() : (tilemap) != null ? (typeof (runtime.dereference(tilemap)).user_data === 'function' ? (runtime.dereference(tilemap)).user_data() : typeof (runtime.dereference(tilemap)).user_data === 'number' || typeof (runtime.dereference(tilemap)).user_data === 'boolean' ? (runtime.dereference(tilemap)).user_data : runtime.container(tilemap, "user_data")) : (runtime.calls["user_data"]?.() ?? 0));
    let tiledata: any = ((((runtime.readIndex(rambase, runtime.add(((tile_index) * (2)), 0))) | (((runtime.readIndex(rambase, runtime.add(((tile_index) * (2)), 1))) << (8))))) >>> 0);
    let code: any = ((((((((tiledata) >>> (4))) & (2048))) | (((tiledata) & (2047))))) >>> 0);
    let color: any = ((((((tiledata) >>> (5))) & (255))) >>> 0);
    (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (runtime.calls["set"]?.(0, code, color, 0) ?? 0));
  }

  function method_adjust_cycles(runtime: any, data: any) {
    const members = runtime.members;
    members.m_adjust_cycles = ((((runtime.add((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles")), 2)) % (5))) & 0xff);
    if (((Number((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles"))) <= Number(1)) ? 1 : 0)) {
      (runtime.calls["m_maincpu.adjust_icount"] ? runtime.calls["m_maincpu.adjust_icount"]((-1)) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).adjust_icount?.((-1)) ?? 0) : (runtime.calls["adjust_icount"]?.((-1)) ?? 0));
    }
  }

  function method_soundirq_gen(runtime: any, param: any) {
    const members = runtime.members;
    (runtime.calls["m_soundcpu.set_input_line"] ? runtime.calls["m_soundcpu.set_input_line"](0, 2) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(0, 2) ?? 0) : (runtime.calls["set_input_line"]?.(0, 2) ?? 0));
  }

  function method_common_videomode_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_video_mode = ((data) & 0xff);
    (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
  }
  return {
    "paletteram_w": method_paletteram_w,
    "videoram_wait_states": method_videoram_wait_states,
    "mixer_collision_r": method_mixer_collision_r,
    "mixer_collision_w": method_mixer_collision_w,
    "mixer_collision_reset_w": method_mixer_collision_reset_w,
    "sprite_collision_r": method_sprite_collision_r,
    "sprite_collision_w": method_sprite_collision_w,
    "sprite_collision_reset_w": method_sprite_collision_reset_w,
    "tile_get_info": method_tile_get_info,
    "adjust_cycles": method_adjust_cycles,
    "soundirq_gen": method_soundirq_gen,
    "common_videomode_w": method_common_videomode_w
  };
})();
    return {
      "system1_state.paletteram_w": methods["paletteram_w"],
      "system1_state.videoram_wait_states": methods["videoram_wait_states"],
      "system1_state.mixer_collision_r": methods["mixer_collision_r"],
      "system1_state.mixer_collision_w": methods["mixer_collision_w"],
      "system1_state.mixer_collision_reset_w": methods["mixer_collision_reset_w"],
      "system1_state.sprite_collision_r": methods["sprite_collision_r"],
      "system1_state.sprite_collision_w": methods["sprite_collision_w"],
      "system1_state.sprite_collision_reset_w": methods["sprite_collision_reset_w"],
      "system1_state.tile_get_info": methods["tile_get_info"],
      "system1_state.adjust_cycles": methods["adjust_cycles"],
      "system1_state.soundirq_gen": methods["soundirq_gen"],
      "system1_state.common_videomode_w": methods["common_videomode_w"],
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
