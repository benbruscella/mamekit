// GENERATED executable machine composition from src/mame/atari/atarisy1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'marble');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {

  function method_int3state_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_scanline_int_state ?? runtime.member("m_scanline_int_state"))) ? (128) : (0));
  }

  function method_update_timers(runtime: any, scanline: any): any {
    const members = runtime.members;


  }

  function method_video_int_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](4, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(4, 0) ?? 0) : 0);
  }

  function method_int3_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let scanline: any = ((param) | 0);
    members.m_scanline_int_state = ((1) ? 1 : 0);
    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](3, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(3, 1) ?? 0) : 0);
    (__l["m_int3off_timer.adjust"] ? __l["m_int3off_timer.adjust"]((__l["m_screen.scan_period"] ? __l["m_screen.scan_period"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).scan_period === 'function' ? (runtime.dereference(members.m_screen)).scan_period() : typeof (runtime.dereference(members.m_screen)).scan_period === 'number' || typeof (runtime.dereference(members.m_screen)).scan_period === 'boolean' ? (runtime.dereference(members.m_screen)).scan_period : runtime.container(members.m_screen, "scan_period")) : 0)) : (members.m_int3off_timer) != null ? ((runtime.dereference(members.m_int3off_timer)).adjust?.((__l["m_screen.scan_period"] ? __l["m_screen.scan_period"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).scan_period === 'function' ? (runtime.dereference(members.m_screen)).scan_period() : typeof (runtime.dereference(members.m_screen)).scan_period === 'number' || typeof (runtime.dereference(members.m_screen)).scan_period === 'boolean' ? (runtime.dereference(members.m_screen)).scan_period : runtime.container(members.m_screen, "scan_period")) : 0)) ?? 0) : 0);
    members.m_next_timer_scanline = ((-1) | 0);
    (runtime.overrides["update_timers"] ? runtime.overrides["update_timers"](scanline) : method_update_timers(runtime, scanline));
  }

  function method_int3off_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_scanline_int_state = ((0) ? 1 : 0);
    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](3, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(3, 0) ?? 0) : 0);
  }

  function method_reset_yscroll_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_playfield_tilemap.set_scrolly"] ? __l["m_playfield_tilemap.set_scrolly"](0, param) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).set_scrolly?.(0, param) ?? 0) : 0);
  }

  function method_get_playfield_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_playfield_lookup = members.m_playfield_lookup ?? runtime.member("m_playfield_lookup");
    let data: any = (((__l["m_playfield_tilemap.basemem_read"] ? __l["m_playfield_tilemap.basemem_read"](tile_index) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).basemem_read?.(tile_index) ?? 0) : 0)) & 0xffff);
    let lookup: any = ((runtime.readIndex(h_m_playfield_lookup, ((((((data) >>> (8))) & (127))) | ((((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) << (7)))))) & 0xffff);
    let gfxindex: any = ((((((lookup) >>> (8))) & (15))) | 0);
    let code: any = ((((((((lookup) & (255))) << (8))) | (((data) & (255))))) | 0);
    let color: any = ((runtime.add(32, ((((((lookup) >>> (12))) & (15))) << (runtime.readIndex((members.m_bank_color_shift ?? runtime.member("m_bank_color_shift")), gfxindex))))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](gfxindex, code, color, ((((data) >>> (15))) & (1))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(gfxindex, code, color, ((((data) >>> (15))) & (1))) ?? 0) : (__l["set"]?.(gfxindex, code, color, ((((data) >>> (15))) & (1))) ?? 0));
  }

  function method_get_alpha_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((__l["m_alpha_tilemap.basemem_read"] ? __l["m_alpha_tilemap.basemem_read"](tile_index) : (members.m_alpha_tilemap) != null ? ((runtime.dereference(members.m_alpha_tilemap)).basemem_read?.(tile_index) ?? 0) : 0)) & 0xffff);
    let code: any = ((((data) & (1023))) | 0);
    let color: any = ((((((data) >>> (10))) & (7))) | 0);
    let opaque: any = ((((data) & (8192))) | 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, color, ((opaque) ? (16) : (0))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, ((opaque) ? (16) : (0))) ?? 0) : (__l["set"]?.(0, code, color, ((opaque) ? (16) : (0))) ?? 0));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_mob.draw_async"] ? __l["m_mob.draw_async"](cliprect) : (members.m_mob) != null ? ((runtime.dereference(members.m_mob)).draw_async?.(cliprect) ?? 0) : 0);
    (__l["m_playfield_tilemap.draw"] ? __l["m_playfield_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_playfield_tilemap) != null ? ((runtime.dereference(members.m_playfield_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : 0);
    let mobitmap: any = (__l["m_mob.bitmap"] ? __l["m_mob.bitmap"]() : (members.m_mob) != null ? (typeof (runtime.dereference(members.m_mob)).bitmap === 'function' ? (runtime.dereference(members.m_mob)).bitmap() : typeof (runtime.dereference(members.m_mob)).bitmap === 'number' || typeof (runtime.dereference(members.m_mob)).bitmap === 'boolean' ? (runtime.dereference(members.m_mob)).bitmap : runtime.container(members.m_mob, "bitmap")) : 0);
    (__l["m_mob.iterate_dirty_rects"] ? __l["m_mob.iterate_dirty_rects"](cliprect, ((rect: any) => {
      for (let y: any = (((__l["rect.top"] ? __l["rect.top"]() : (rect) != null ? (typeof (runtime.dereference(rect)).top === 'function' ? (runtime.dereference(rect)).top() : typeof (runtime.dereference(rect)).top === 'number' || typeof (runtime.dereference(rect)).top === 'boolean' ? (runtime.dereference(rect)).top : runtime.container(rect, "top")) : (__l["top"]?.() ?? 0))) | 0); ((Number(y) <= Number((__l["rect.bottom"] ? __l["rect.bottom"]() : (rect) != null ? (typeof (runtime.dereference(rect)).bottom === 'function' ? (runtime.dereference(rect)).bottom() : typeof (runtime.dereference(rect)).bottom === 'number' || typeof (runtime.dereference(rect)).bottom === 'boolean' ? (runtime.dereference(rect)).bottom : runtime.container(rect, "bottom")) : (__l["bottom"]?.() ?? 0)))) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let mo: any = mobitmap["pix&"](y);
        let pf: any = bitmap["pix&"](y);
        for (let x: any = (((__l["rect.left"] ? __l["rect.left"]() : (rect) != null ? (typeof (runtime.dereference(rect)).left === 'function' ? (runtime.dereference(rect)).left() : typeof (runtime.dereference(rect)).left === 'number' || typeof (runtime.dereference(rect)).left === 'boolean' ? (runtime.dereference(rect)).left : runtime.container(rect, "left")) : (__l["left"]?.() ?? 0))) | 0); ((Number(x) <= Number((__l["rect.right"] ? __l["rect.right"]() : (rect) != null ? (typeof (runtime.dereference(rect)).right === 'function' ? (runtime.dereference(rect)).right() : typeof (runtime.dereference(rect)).right === 'number' || typeof (runtime.dereference(rect)).right === 'boolean' ? (runtime.dereference(rect)).right : runtime.container(rect, "right")) : (__l["right"]?.() ?? 0)))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          if (((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) {
            if (((runtime.readIndex(mo, x)) & (61440))) {
              if (((Number(((runtime.readIndex(mo, x)) & (15))) !== Number(1)) ? 1 : 0)) {
                runtime.writeIndex(pf, x, runtime.add(runtime.add(768, ((((runtime.readIndex(pf, x)) & (15))) << (4))), ((runtime.readIndex(mo, x)) & (15))));
              }
            } else {
              if ((((((Number(((runtime.readIndex(pf, x)) & (248))) !== Number(0)) ? 1 : 0)) || ((((((members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))) & (((1) << (((runtime.readIndex(pf, x)) & (7))))))) ? 0 : 1))) ? 1 : 0)) {
                runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
              }
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
            if (((runtime.readIndex(mo, x)) & (61440))) {
              if (((Number(((runtime.readIndex(mo, x)) & (15))) !== Number(1)) ? 1 : 0)) {
                runtime.writeIndex(pf, x, runtime.add(runtime.add(768, ((((runtime.readIndex(pf, x)) & (15))) << (4))), ((runtime.readIndex(mo, x)) & (15))));
              }
            } else {
              if ((((((Number(((runtime.readIndex(pf, x)) & (248))) !== Number(0)) ? 1 : 0)) || ((((((members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))) & (((1) << (((runtime.readIndex(pf, x)) & (7))))))) ? 0 : 1))) ? 1 : 0)) {
                runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
              }
            }
          }
        }
      }
    })) ?? 0) : 0);
    (__l["m_alpha_tilemap.draw"] ? __l["m_alpha_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_alpha_tilemap) != null ? ((runtime.dereference(members.m_alpha_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : 0);
    return 0;
  }

  function method_compute_log(runtime: any, value: any): any {
    const members = runtime.members;

    let log: any = ((0) | 0);
    if (((Number(value) === Number(0)) ? 1 : 0)) {
      return -1;
    }
    while (((((value) & (1))) ? 0 : 1)) {
      log = ((((log) + (1))) | 0);
      value = ((((value) >>> (1))) | 0);
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
    while (((Number((value = ((((value) >>> (1))) | 0))) !== Number(0)) ? 1 : 0)) {
      log = ((((log) + (1))) | 0);
    }
    return ((1) << (((log) + (1))));
  }
  return {
    "int3state_r": method_int3state_r,
    "update_timers": method_update_timers,
    "video_int_ack_w": method_video_int_ack_w,
    "int3_callback": method_int3_callback,
    "int3off_callback": method_int3off_callback,
    "reset_yscroll_callback": method_reset_yscroll_callback,
    "get_playfield_tile_info": method_get_playfield_tile_info,
    "get_alpha_tile_info": method_get_alpha_tile_info,
    "screen_update": method_screen_update,
    "compute_log": method_compute_log,
    "round_to_powerof2": method_round_to_powerof2
  };
})();
    return {
      "atarisy1_state.int3state_r": methods["int3state_r"],
      "atarisy1_state.update_timers": methods["update_timers"],
      "atarisy1_state.video_int_ack_w": methods["video_int_ack_w"],
      "atarisy1_state.int3_callback": methods["int3_callback"],
      "atarisy1_state.int3off_callback": methods["int3off_callback"],
      "atarisy1_state.reset_yscroll_callback": methods["reset_yscroll_callback"],
      "atarisy1_state.get_playfield_tile_info": methods["get_playfield_tile_info"],
      "atarisy1_state.get_alpha_tile_info": methods["get_alpha_tile_info"],
      "atarisy1_state.screen_update": methods["screen_update"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bottom","left","m_alpha_tilemap.basemem_read","m_alpha_tilemap.draw","m_int3off_timer.adjust","m_maincpu.set_input_line","m_mob.bitmap","m_mob.draw_async","m_mob.iterate_dirty_rects","m_playfield_tilemap.basemem_read","m_playfield_tilemap.draw","m_playfield_tilemap.set_scrolly","m_screen.scan_period","rect.bottom","rect.left","rect.right","rect.top","right","set","tileinfo.set","top"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
