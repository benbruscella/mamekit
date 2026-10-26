// GENERATED executable machine composition from src/mame/sega/system1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'upndown');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (__l["m_palette.set_pen_indirect"] ?? runtime.memberCall(members.m_palette, "set_pen_indirect", 0, undefined))(offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset));
  }

  function method_videoram_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_maincpu = members.m_maincpu ?? runtime.member("m_maincpu");
    if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (runtime.overrides["videoram_wait_states"] ? runtime.overrides["videoram_wait_states"](h_m_maincpu) : method_videoram_wait_states(runtime, h_m_maincpu));
    }
    offset = ((offset) | (((4096) * (((runtime.shiftRight((members.m_videoram_bank ?? runtime.member("m_videoram_bank")), 1)) % (runtime.divide((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages")), 2)))))));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_videoram_wait_states(runtime: any, cpu: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let cpu_cycles_per_fixst: any = ((32) >>> 0);
    let fixst_offset: any = ((runtime.divide(cpu_cycles_per_fixst, 2)) >>> 0);
    let total_cycles: any = (((__l["cpu.total_cycles"] ?? runtime.memberCall(cpu, "total_cycles", 0, __l["total_cycles"]))()) * (10));
    let cycles_until_next_fixst: any = ((((cpu_cycles_per_fixst) - (((((total_cycles) - (fixst_offset))) % (cpu_cycles_per_fixst))))) >>> 0);
    (__l["cpu.adjust_icount"] ?? runtime.memberCall(cpu, "adjust_icount", 0, __l["adjust_icount"]))((-runtime.divide(((cycles_until_next_fixst) + (5)), 10)));
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_maincpu = members.m_maincpu ?? runtime.member("m_maincpu");
    (runtime.overrides["videoram_wait_states"] ? runtime.overrides["videoram_wait_states"](h_m_maincpu) : method_videoram_wait_states(runtime, h_m_maincpu));
    offset = ((offset) | (((4096) * (((runtime.shiftRight((members.m_videoram_bank ?? runtime.member("m_videoram_bank")), 1)) % (runtime.divide((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages")), 2)))))));
    if ((((((((((((Number((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages"))) > Number(2)) ? 1 : 0)) && (((Number(offset) >= Number(1856)) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) < Number(1864)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) % (2))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    ((runtime.dereference(runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), runtime.divide(offset, 2048)))).mark_tile_dirty?.(runtime.divide(((offset) % (2048)), 2)) ?? 0);
  }

  function method_mixer_collision_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    return ((((runtime.readIndex((members.m_mix_collide ?? runtime.member("m_mix_collide")), ((offset) & (63)))) | (126))) | ((((members.m_mix_collide_summary ?? runtime.member("m_mix_collide_summary"))) << (7))));
  }

  function method_mixer_collision_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_mix_collide"), ((offset) & (63)), 0);
  }

  function method_mixer_collision_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_mix_collide_summary = ((0) & 0xff);
  }

  function method_sprite_collision_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    return ((((runtime.readIndex((members.m_sprite_collide ?? runtime.member("m_sprite_collide")), ((offset) & (1023)))) | (126))) | ((((members.m_sprite_collide_summary ?? runtime.member("m_sprite_collide_summary"))) << (7))));
  }

  function method_sprite_collision_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_sprite_collide"), ((offset) & (1023)), 0);
  }

  function method_sprite_collision_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_screen.update_partial"] ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_sprite_collide_summary = ((0) & 0xff);
  }

  function method_tile_get_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let rambase: any = (__l["tilemap.user_data"] ?? runtime.memberCall(tilemap, "user_data", 0, __l["user_data"]))();
    let tiledata: any = ((((runtime.readIndex(rambase, runtime.add(((tile_index) * (2)), 0))) | (((runtime.readIndex(rambase, runtime.add(((tile_index) * (2)), 1))) << (8))))) >>> 0);
    let code: any = ((((((((tiledata) >>> (4))) & (2048))) | (((tiledata) & (2047))))) >>> 0);
    let color: any = ((((((tiledata) >>> (5))) & (255))) >>> 0);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, 0);
  }

  function method_adjust_cycles(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_adjust_cycles = ((((runtime.add((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles")), 2)) % (5))) & 0xff);
    if (((Number((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles"))) <= Number(1)) ? 1 : 0)) {
      (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(-1);
    }
  }

  function method_soundirq_gen(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_soundcpu.set_input_line"] ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 2);
  }

  function method_common_videomode_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_video_mode = ((data) & 0xff);
    (__l["flip_screen_set"] ? __l["flip_screen_set"](((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
  }

  function method_videoram_bank_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_videoram_bank = ((data) & 0xff);
  }

  function method_screen_update_system1(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let bgpixmaps: any = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](4) : new Uint8Array(Math.max(0, Number(4))));
    let bgrowscroll: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32)))));
    runtime.writeIndex(bgpixmaps, 0, (runtime.writeIndex(bgpixmaps, 1, (runtime.writeIndex(bgpixmaps, 2, (runtime.writeIndex(bgpixmaps, 3, runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), 0)["pixmap&"]())))))));
    let fgpixmap: any = (__l["m_tilemap_page[1].pixmap"] ?? runtime.memberCall(runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), 1), "pixmap", 0, __l["pixmap"]))();
    let xscroll: any = ((((runtime.add(((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 4092)) | (((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 4093)) << (8)))), 28)) << 16 >> 16)) | 0);
    let yscroll: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 4029)) | 0);
    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
      xscroll = ((((640) - (((xscroll) & (511))))) | 0);
      yscroll = ((((764) - (((yscroll) & (511))))) | 0);
    }
    for (let y: any = ((0) | 0); ((Number(y) < Number(32)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      runtime.writeIndex(bgrowscroll, y, xscroll);
    }
    runtime.invoke("video_update_common", screen, bitmap, cliprect, fgpixmap, bgpixmaps, bgrowscroll, yscroll, 0);
    return 0;
  }
  return {
    "paletteram_w": method_paletteram_w,
    "videoram_r": method_videoram_r,
    "videoram_wait_states": method_videoram_wait_states,
    "videoram_w": method_videoram_w,
    "mixer_collision_r": method_mixer_collision_r,
    "mixer_collision_w": method_mixer_collision_w,
    "mixer_collision_reset_w": method_mixer_collision_reset_w,
    "sprite_collision_r": method_sprite_collision_r,
    "sprite_collision_w": method_sprite_collision_w,
    "sprite_collision_reset_w": method_sprite_collision_reset_w,
    "tile_get_info": method_tile_get_info,
    "adjust_cycles": method_adjust_cycles,
    "soundirq_gen": method_soundirq_gen,
    "common_videomode_w": method_common_videomode_w,
    "videoram_bank_w": method_videoram_bank_w,
    "screen_update_system1": method_screen_update_system1
  };
})();
    return {
      "system1_state.paletteram_w": methods["paletteram_w"],
      "system1_state.videoram_r": methods["videoram_r"],
      "system1_state.videoram_wait_states": methods["videoram_wait_states"],
      "system1_state.videoram_w": methods["videoram_w"],
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
      "system1_state.videoram_bank_w": methods["videoram_bank_w"],
      "system1_state.screen_update_system1": methods["screen_update_system1"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust_icount","cpu.adjust_icount","cpu.total_cycles","flip_screen","flip_screen_set","m_maincpu.adjust_icount","m_palette.set_pen_indirect","m_screen.update_partial","m_screen.vpos","m_soundcpu.set_input_line","m_tilemap_page[1].pixmap","machine","machine().side_effects_disabled","pixmap","set","tileinfo.set","tilemap.user_data","total_cycles","user_data"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
