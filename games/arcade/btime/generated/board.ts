// GENERATED executable machine composition from src/mame/dataeast/btime.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'btime');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {

  function method_btime_mirrorvideoram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_btime_mirrorvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_btime_mirrorcolorram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    return runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offset);
  }

  function method_btime_mirrorcolorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
  }

  function method_btime_video_control_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["flip_screen_set"] ? __l["flip_screen_set"](((data) & (1))) : runtime.macro("flip_screen_set", ((data) & (1))));
  }

  function method_bnj_scroll_w_0(runtime: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_bnj_scroll"), 0, data);
  }

  function method_audio_nmi_gen(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let scanline: any = ((param) | 0);
    (__l["m_audionmi.in_w_1"] ? __l["m_audionmi.in_w_1"](runtime.shiftRight(((scanline) & (8)), 3)) : (members.m_audionmi) != null ? ((runtime.dereference(members.m_audionmi)).in_w_1?.(runtime.shiftRight(((scanline) & (8)), 3)) ?? 0) : 0);
  }

  function method_screen_update_btime(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 0)) & (16))) {
      let start: any = ((0) | 0);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        start = ((0) | 0);
      } else {
        start = ((1) | 0);
      }
      for (let i: any = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        runtime.writeIndex(runtime.writableMember("m_btime_tilemap"), i, ((start) | (((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 0)) & (4)))));
        start = ((((((start) + (1))) & (3))) | 0);
      }
      (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, (members.m_btime_tilemap ?? runtime.member("m_btime_tilemap")), 0) : method_draw_background(runtime, bitmap, cliprect, (members.m_btime_tilemap ?? runtime.member("m_btime_tilemap")), 0));
      (runtime.overrides["draw_chars"] ? runtime.overrides["draw_chars"](bitmap, cliprect, 1, 0, -1) : method_draw_chars(runtime, bitmap, cliprect, 1, 0, -1));
    } else {
      (runtime.overrides["draw_chars"] ? runtime.overrides["draw_chars"](bitmap, cliprect, 0, 0, -1) : method_draw_chars(runtime, bitmap, cliprect, 0, 0, -1));
    }
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 0, 1, 0, (members.m_videoram ?? runtime.member("m_videoram")), 32) : method_draw_sprites(runtime, bitmap, cliprect, 0, 1, 0, (members.m_videoram ?? runtime.member("m_videoram")), 32));
    return 0;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any, tmap: any, color: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bg_map = members.m_bg_map ?? runtime.member("m_bg_map");
    let scroll: any = (((-((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 1)) | (((((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 0)) & (3))) << (8)))))) | 0);
    for (let i: any = ((0) | 0); ((Number(i) < Number(5)) ? 1 : 0); i = ((((i) + (1))) | 0), scroll = ((((scroll) + (256))) | 0)) {
      let tileoffset: any = ((runtime.readIndex(tmap, ((i) & (3)))) * (256));
      if (((Number(scroll) > Number(256)) ? 1 : 0)) {
        break;
      }
      if (((Number(scroll) < Number(-256)) ? 1 : 0)) {
        continue;
      }
      for (let offs: any = 0; ((Number(offs) < Number(256)) ? 1 : 0); offs = ((offs) + (1))) {
        let x: any = ((((((240) - (((((16) * (runtime.divide(offs, 16)))) + (scroll))))) - (1))) | 0);
        let y: any = ((((16) * (((offs) % (16))))) | 0);
        if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
          x = ((((240) - (x))) | 0);
          y = ((((240) - (y))) | 0);
        }
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](2) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(2) ?? 0) : 0))).opaque?.(bitmap, cliprect, runtime.readIndex(h_m_bg_map, ((tileoffset) + (offs))), color, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), x, y) ?? 0);
      }
    }
  }

  function method_draw_chars(runtime: any, bitmap: any, cliprect: any, transparency: any, color: any, priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    for (let offs: any = 0; ((Number(offs) < Number((members.m_videoram).length)) ? 1 : 0); offs = ((offs) + (1))) {
      let x: any = ((((31) - (runtime.divide(offs, 32)))) & 0xff);
      let y: any = ((((offs) % (32))) & 0xff);
      let code: any = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs), ((256) * (((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offs)) & (3)))))) & 0xffff);
      if ((((((Number(priority) !== Number(-1)) ? 1 : 0)) && (((Number(priority) !== Number(((runtime.shiftRight(code, 7)) & (1)))) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        x = ((((31) - (x))) & 0xff);
        y = ((((31) - (y))) & 0xff);
      }
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0))).transpen?.(bitmap, cliprect, code, color, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), ((8) * (x)), ((8) * (y)), ((transparency) ? (0) : (-1))) ?? 0);
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, color: any, sprite_y_adjust: any, sprite_y_adjust_flip_screen: any, sprite_ram: any, interleave: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    for (let i: any = ((0) | 0), offs: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), offs = ((((offs) + (((4) * (interleave))))) | 0)) {
      if (((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (1))) ? 0 : 1)) {
        continue;
      }
      let x: any = ((((240) - (runtime.readIndex(sprite_ram, ((offs) + (((3) * (interleave)))))))) | 0);
      let y: any = ((((240) - (runtime.readIndex(sprite_ram, ((offs) + (((2) * (interleave)))))))) | 0);
      let flipx: any = ((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (4))) & 0xff);
      let flipy: any = ((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (2))) & 0xff);
      if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
        x = ((((240) - (x))) | 0);
        y = ((((((240) - (y))) + (sprite_y_adjust_flip_screen))) | 0);
        flipx = ((((flipx) ? 0 : 1)) & 0xff);
        flipy = ((((flipy) ? 0 : 1)) & 0xff);
      }
      y = ((((y) - (sprite_y_adjust))) | 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, runtime.readIndex(sprite_ram, ((offs) + (interleave))), color, flipx, flipy, x, y, 0) ?? 0);
      y = ((((y) + ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (-256) : (256))))) | 0);
      ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, runtime.readIndex(sprite_ram, ((offs) + (interleave))), color, flipx, flipy, x, y, 0) ?? 0);
    }
  }
  return {
    "btime_mirrorvideoram_r": method_btime_mirrorvideoram_r,
    "btime_mirrorvideoram_w": method_btime_mirrorvideoram_w,
    "btime_mirrorcolorram_r": method_btime_mirrorcolorram_r,
    "btime_mirrorcolorram_w": method_btime_mirrorcolorram_w,
    "btime_video_control_w": method_btime_video_control_w,
    "bnj_scroll_w_0": method_bnj_scroll_w_0,
    "audio_nmi_gen": method_audio_nmi_gen,
    "screen_update_btime": method_screen_update_btime,
    "draw_background": method_draw_background,
    "draw_chars": method_draw_chars,
    "draw_sprites": method_draw_sprites
  };
})();
    return {
      "btime_state.btime_mirrorvideoram_r": methods["btime_mirrorvideoram_r"],
      "btime_state.btime_mirrorvideoram_w": methods["btime_mirrorvideoram_w"],
      "btime_state.btime_mirrorcolorram_r": methods["btime_mirrorcolorram_r"],
      "btime_state.btime_mirrorcolorram_w": methods["btime_mirrorcolorram_w"],
      "btime_state.btime_video_control_w": methods["btime_video_control_w"],
      "btime_state.bnj_scroll_w_0": methods["bnj_scroll_w_0"],
      "btime_state.audio_nmi_gen": methods["audio_nmi_gen"],
      "btime_state.screen_update_btime": methods["screen_update_btime"],
      "btime_state.draw_background": methods["draw_background"],
      "btime_state.draw_chars": methods["draw_chars"],
      "btime_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["flip_screen","flip_screen_set","m_audionmi.in_w_1","m_gfxdecode.gfx"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
