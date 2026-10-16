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

  function method_video_int_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](4, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(4, 0) ?? 0) : 0);
  }

  function method_yscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_yscroll = members.m_yscroll ?? runtime.member("m_yscroll");
    let oldyscroll: any = ((runtime.dereference(h_m_yscroll)) & 0xffff);
    runtime.combineData(h_m_yscroll, data, mem_mask);
    if (((Number(runtime.dereference(h_m_yscroll)) !== Number(oldyscroll)) ? 1 : 0)) {
      (__l["m_screen.update_partial"] ? __l["m_screen.update_partial"]((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) ?? 0) : 0);
      if (((Number((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) !== Number(((runtime.dereference(h_m_yscroll)) & (3)))) ? 1 : 0)) {
        members.m_playfield_tile_bank = ((((runtime.dereference(h_m_yscroll)) & (3))) & 0xff);
        (__l["m_playfield_tilemap.mark_all_dirty"] ? __l["m_playfield_tilemap.mark_all_dirty"]() : (members.m_playfield_tilemap) != null ? (typeof (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_playfield_tilemap)).mark_all_dirty : runtime.container(members.m_playfield_tilemap, "mark_all_dirty")) : 0);
      }
      (__l["m_playfield_tilemap.set_scrolly"] ? __l["m_playfield_tilemap.set_scrolly"](0, runtime.shiftRight(runtime.dereference(h_m_yscroll), 7)) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).set_scrolly?.(0, runtime.shiftRight(runtime.dereference(h_m_yscroll), 7)) ?? 0) : 0);
      (__l["m_mob.set_yscroll"] ? __l["m_mob.set_yscroll"](((runtime.shiftRight(runtime.dereference(h_m_yscroll), 7)) & (511))) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).set_yscroll?.(((runtime.shiftRight(runtime.dereference(h_m_yscroll), 7)) & (511))) ?? 0) : 0);
    }
  }

  function method_xscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_xscroll = members.m_xscroll ?? runtime.member("m_xscroll");
    let oldxscroll: any = ((runtime.dereference(h_m_xscroll)) & 0xffff);
    runtime.combineData(h_m_xscroll, data, mem_mask);
    if (((Number(runtime.dereference(h_m_xscroll)) !== Number(oldxscroll)) ? 1 : 0)) {
      (__l["m_screen.update_partial"] ? __l["m_screen.update_partial"]((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((__l["m_screen.vpos"] ? __l["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : 0)) ?? 0) : 0);
      (__l["m_playfield_tilemap.set_scrollx"] ? __l["m_playfield_tilemap.set_scrollx"](0, runtime.dereference(h_m_xscroll)) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).set_scrollx?.(0, runtime.dereference(h_m_xscroll)) ?? 0) : 0);
      (__l["m_mob.set_xscroll"] ? __l["m_mob.set_xscroll"](((runtime.dereference(h_m_xscroll)) & (511))) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).set_xscroll?.(((runtime.dereference(h_m_xscroll)) & (511))) ?? 0) : 0);
    }
  }

  function method_switch_6502_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let temp: any = ((48) | 0);
    if ((__l["m_soundlatch.pending_r"] ? __l["m_soundlatch.pending_r"]() : (members.m_soundlatch) != null ? (typeof (runtime.dereference(members.m_soundlatch)).pending_r === 'function' ? (runtime.dereference(members.m_soundlatch)).pending_r() : typeof (runtime.dereference(members.m_soundlatch)).pending_r === 'number' || typeof (runtime.dereference(members.m_soundlatch)).pending_r === 'boolean' ? (runtime.dereference(members.m_soundlatch)).pending_r : runtime.container(members.m_soundlatch, "pending_r")) : 0)) {
      temp = ((((temp) ^ (128))) | 0);
    }
    if ((__l["m_mainlatch.pending_r"] ? __l["m_mainlatch.pending_r"]() : (members.m_mainlatch) != null ? (typeof (runtime.dereference(members.m_mainlatch)).pending_r === 'function' ? (runtime.dereference(members.m_mainlatch)).pending_r() : typeof (runtime.dereference(members.m_mainlatch)).pending_r === 'number' || typeof (runtime.dereference(members.m_mainlatch)).pending_r === 'boolean' ? (runtime.dereference(members.m_mainlatch)).pending_r : runtime.container(members.m_mainlatch, "pending_r")) : 0)) {
      temp = ((((temp) ^ (64))) | 0);
    }
    if ((((__l["m_tms5220.readyq_r"] ? __l["m_tms5220.readyq_r"]() : (members.m_tms5220) != null ? (typeof (runtime.dereference(members.m_tms5220)).readyq_r === 'function' ? (runtime.dereference(members.m_tms5220)).readyq_r() : typeof (runtime.dereference(members.m_tms5220)).readyq_r === 'number' || typeof (runtime.dereference(members.m_tms5220)).readyq_r === 'boolean' ? (runtime.dereference(members.m_tms5220)).readyq_r : runtime.container(members.m_tms5220, "readyq_r")) : 0)) ? 0 : 1)) {
      temp = ((((temp) ^ (32))) | 0);
    }
    if (((((~(__l["m_803008.read"] ? __l["m_803008.read"]() : (members.m_803008) != null ? (typeof (runtime.dereference(members.m_803008)).read === 'function' ? (runtime.dereference(members.m_803008)).read() : typeof (runtime.dereference(members.m_803008)).read === 'number' || typeof (runtime.dereference(members.m_803008)).read === 'boolean' ? (runtime.dereference(members.m_803008)).read : runtime.container(members.m_803008, "read")) : (__l["read"]?.() ?? 0)))) >>> (3)) & 1)) {
      temp = ((((temp) ^ (16))) | 0);
    }
    return temp;
  }

  function method_sound_irq_ack_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      (__l["m_audiocpu.set_input_line"] ? __l["m_audiocpu.set_input_line"](0, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 0) ?? 0) : 0);
    }
    return 255;
  }

  function method_sound_irq_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_audiocpu.set_input_line"] ? __l["m_audiocpu.set_input_line"](0, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 0) ?? 0) : 0);
  }

  function method_scanline_update(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((param) & (32))) {
      (__l["m_audiocpu.set_input_line"] ? __l["m_audiocpu.set_input_line"](0, 1) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 1) ?? 0) : 0);
    }
  }

  function method_get_playfield_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((__l["m_playfield_tilemap.basemem_read"] ? __l["m_playfield_tilemap.basemem_read"](tile_index) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).basemem_read?.(tile_index) ?? 0) : 0)) & 0xffff);
    let code: any = ((((runtime.add((((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) * (4096)), ((data) & (4095)))) ^ (2048))) | 0);
    let color: any = ((runtime.add(runtime.add(16, (((members.m_playfield_color_bank ?? runtime.member("m_playfield_color_bank"))) * (8))), ((runtime.shiftRight(data, 12)) & (7)))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, color, ((runtime.shiftRight(data, 15)) & (1))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, ((runtime.shiftRight(data, 15)) & (1))) ?? 0) : (__l["set"]?.(0, code, color, ((runtime.shiftRight(data, 15)) & (1))) ?? 0));
  }

  function method_get_alpha_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((__l["m_alpha_tilemap.basemem_read"] ? __l["m_alpha_tilemap.basemem_read"](tile_index) : (members.m_alpha_tilemap) != null ? ((runtime.dereference(members.m_alpha_tilemap)).basemem_read?.(tile_index) ?? 0) : 0)) & 0xffff);
    let code: any = ((((data) & (1023))) | 0);
    let color: any = ((((((runtime.shiftRight(data, 10)) & (15))) | (((runtime.shiftRight(data, 9)) & (32))))) | 0);
    let opaque: any = ((((data) & (32768))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](1, code, color, ((opaque) ? (16) : (0))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, ((opaque) ? (16) : (0))) ?? 0) : (__l["set"]?.(1, code, color, ((opaque) ? (16) : (0))) ?? 0));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_vindctr2_screen_refresh = members.m_vindctr2_screen_refresh ?? runtime.member("m_vindctr2_screen_refresh");
    (__l["m_mob.draw_async"] ? __l["m_mob.draw_async"](cliprect) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).draw_async?.(cliprect) ?? 0) : 0);
    (__l["m_playfield_tilemap.draw"] ? __l["m_playfield_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : 0);
    let mobitmap: any = (__l["m_mob.bitmap"] ? __l["m_mob.bitmap"]() : (members.m_mob) != null ? (typeof (runtime.dereference(members.m_mob)).bitmap === 'function' ? (runtime.dereference(members.m_mob)).bitmap() : typeof (runtime.dereference(members.m_mob)).bitmap === 'number' || typeof (runtime.dereference(members.m_mob)).bitmap === 'boolean' ? (runtime.dereference(members.m_mob)).bitmap : runtime.container(members.m_mob, "bitmap")) : 0);
    (__l["m_mob.iterate_dirty_rects"] ? __l["m_mob.iterate_dirty_rects"](cliprect, ((rect: any) => {
      for (let y: any = (((__l["rect.top"] ? __l["rect.top"]() : (rect) != null ? (typeof (runtime.dereference(rect)).top === 'function' ? (runtime.dereference(rect)).top() : typeof (runtime.dereference(rect)).top === 'number' || typeof (runtime.dereference(rect)).top === 'boolean' ? (runtime.dereference(rect)).top : runtime.container(rect, "top")) : (__l["top"]?.() ?? 0))) | 0); ((Number(y) <= Number((__l["rect.bottom"] ? __l["rect.bottom"]() : (rect) != null ? (typeof (runtime.dereference(rect)).bottom === 'function' ? (runtime.dereference(rect)).bottom() : typeof (runtime.dereference(rect)).bottom === 'number' || typeof (runtime.dereference(rect)).bottom === 'boolean' ? (runtime.dereference(rect)).bottom : runtime.container(rect, "bottom")) : (__l["bottom"]?.() ?? 0)))) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let mo: any = mobitmap["pix&"](y);
        let pf: any = bitmap["pix&"](y);
        for (let x: any = (((__l["rect.left"] ? __l["rect.left"]() : (rect) != null ? (typeof (runtime.dereference(rect)).left === 'function' ? (runtime.dereference(rect)).left() : typeof (runtime.dereference(rect)).left === 'number' || typeof (runtime.dereference(rect)).left === 'boolean' ? (runtime.dereference(rect)).left : runtime.container(rect, "left")) : (__l["left"]?.() ?? 0))) | 0); ((Number(x) <= Number((__l["rect.right"] ? __l["rect.right"]() : (rect) != null ? (typeof (runtime.dereference(rect)).right === 'function' ? (runtime.dereference(rect)).right() : typeof (runtime.dereference(rect)).right === 'number' || typeof (runtime.dereference(rect)).right === 'boolean' ? (runtime.dereference(rect)).right : runtime.container(rect, "right")) : (__l["right"]?.() ?? 0)))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          if (((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) {
            if (((Number(((runtime.readIndex(mo, x)) & (15))) === Number(1)) ? 1 : 0)) {
              if ((((((h_m_vindctr2_screen_refresh) ? 0 : 1)) || (((Number(((runtime.readIndex(mo, x)) & (240))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(pf, x, ((runtime.readIndex(pf, x)) ^ (128)));
              }
            } else {
              runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
            }
          }
        }
      }
    })) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).iterate_dirty_rects?.(cliprect, ((rect: any) => {
      for (let y: any = (((__l["rect.top"] ? __l["rect.top"]() : (rect) != null ? (typeof (runtime.dereference(rect)).top === 'function' ? (runtime.dereference(rect)).top() : typeof (runtime.dereference(rect)).top === 'number' || typeof (runtime.dereference(rect)).top === 'boolean' ? (runtime.dereference(rect)).top : runtime.container(rect, "top")) : (__l["top"]?.() ?? 0))) | 0); ((Number(y) <= Number((__l["rect.bottom"] ? __l["rect.bottom"]() : (rect) != null ? (typeof (runtime.dereference(rect)).bottom === 'function' ? (runtime.dereference(rect)).bottom() : typeof (runtime.dereference(rect)).bottom === 'number' || typeof (runtime.dereference(rect)).bottom === 'boolean' ? (runtime.dereference(rect)).bottom : runtime.container(rect, "bottom")) : (__l["bottom"]?.() ?? 0)))) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let mo: any = mobitmap["pix&"](y);
        let pf: any = bitmap["pix&"](y);
        for (let x: any = (((__l["rect.left"] ? __l["rect.left"]() : (rect) != null ? (typeof (runtime.dereference(rect)).left === 'function' ? (runtime.dereference(rect)).left() : typeof (runtime.dereference(rect)).left === 'number' || typeof (runtime.dereference(rect)).left === 'boolean' ? (runtime.dereference(rect)).left : runtime.container(rect, "left")) : (__l["left"]?.() ?? 0))) | 0); ((Number(x) <= Number((__l["rect.right"] ? __l["rect.right"]() : (rect) != null ? (typeof (runtime.dereference(rect)).right === 'function' ? (runtime.dereference(rect)).right() : typeof (runtime.dereference(rect)).right === 'number' || typeof (runtime.dereference(rect)).right === 'boolean' ? (runtime.dereference(rect)).right : runtime.container(rect, "right")) : (__l["right"]?.() ?? 0)))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          if (((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) {
            if (((Number(((runtime.readIndex(mo, x)) & (15))) === Number(1)) ? 1 : 0)) {
              if ((((((h_m_vindctr2_screen_refresh) ? 0 : 1)) || (((Number(((runtime.readIndex(mo, x)) & (240))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(pf, x, ((runtime.readIndex(pf, x)) ^ (128)));
              }
            } else {
              runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
            }
          }
        }
      }
    })) ?? 0) : 0);
    (__l["m_alpha_tilemap.draw"] ? __l["m_alpha_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_alpha_tilemap) != null ? ((runtime.dereference(members.m_alpha_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : 0);
    return 0;
  }

  function method_speech_squeak_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = ((((5) | (((state) ? (2) : (0))))) & 0xff);
    (__l["m_tms5220.set_unscaled_clock"] ? __l["m_tms5220.set_unscaled_clock"](runtime.divide(runtime.divide(14318181, 2), ((16) - (data)))) : (members.m_tms5220) != null ? ((runtime.dereference(members.m_tms5220)).set_unscaled_clock?.(runtime.divide(runtime.divide(14318181, 2), ((16) - (data)))) ?? 0) : 0);
  }

  function method_compute_log(runtime: any, value: any): any {
    const members = runtime.members;

    let log: any = ((0) | 0);
    if (((Number(value) === Number(0)) ? 1 : 0)) {
      return -1;
    }
    while (((((value) & (1))) ? 0 : 1)) {
      log = ((((log) + (1))) | 0);
      value = ((runtime.shiftRight(value, 1)) | 0);
    }
    if (((Number(value) !== Number(1)) ? 1 : 0)) {
      return -1;
    }
    return log;
  }

  function method_round_to_powerof2(runtime: any, value: any): any {
    const members = runtime.members;

    let log: any = ((0) | 0);
    if (((Number(value) === Number(0)) ? 1 : 0)) {
      return 1;
    }
    while (((Number((value = ((runtime.shiftRight(value, 1)) | 0))) !== Number(0)) ? 1 : 0)) {
      log = ((((log) + (1))) | 0);
    }
    return ((1) << (((log) + (1))));
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
    "get_alpha_tile_info": method_get_alpha_tile_info,
    "screen_update": method_screen_update,
    "speech_squeak_w": method_speech_squeak_w,
    "compute_log": method_compute_log,
    "round_to_powerof2": method_round_to_powerof2
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
      "gauntlet_state.get_alpha_tile_info": methods["get_alpha_tile_info"],
      "gauntlet_state.screen_update": methods["screen_update"],
      "gauntlet_state.speech_squeak_w": methods["speech_squeak_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bottom","left","m_803008.read","m_alpha_tilemap.basemem_read","m_alpha_tilemap.draw","m_audiocpu.set_input_line","m_maincpu.set_input_line","m_mainlatch.pending_r","m_mob.bitmap","m_mob.draw_async","m_mob.iterate_dirty_rects","m_mob.set_xscroll","m_mob.set_yscroll","m_playfield_tilemap.basemem_read","m_playfield_tilemap.draw","m_playfield_tilemap.mark_all_dirty","m_playfield_tilemap.set_scrollx","m_playfield_tilemap.set_scrolly","m_screen.update_partial","m_screen.vpos","m_soundlatch.pending_r","m_tms5220.readyq_r","m_tms5220.set_unscaled_clock","machine","machine().side_effects_disabled","read","rect.bottom","rect.left","rect.right","rect.top","right","set","tileinfo.set","top"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
