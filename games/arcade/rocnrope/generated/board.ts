// GENERATED executable machine composition from src/mame/konami/rocnrope.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rocnrope');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  const __mame_table_0 = [0, 16, 32, 48, 64, 144, 160, 176, 160, 208];

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
  }

  function method_interrupt_vector_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_vectors"), offset, data);
  }

  function method_filter_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.invoke("set_filter", 1, 0, ((((offset) >>> (0))) & (3)));
    runtime.invoke("set_filter", 1, 1, ((((offset) >>> (2))) & (3)));
    runtime.invoke("set_filter", 1, 2, ((((offset) >>> (4))) & (3)));
    runtime.invoke("set_filter", 0, 0, ((((offset) >>> (6))) & (3)));
    runtime.invoke("set_filter", 0, 1, ((((offset) >>> (8))) & (3)));
    runtime.invoke("set_filter", 0, 2, ((((offset) >>> (10))) & (3)));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let attr: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
    let code: any = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((2) * (((attr) & (128)))))) | 0);
    let color: any = ((((attr) & (15))) | 0);
    let flags: any = ((((((((attr) & (64))) ? (1) : (0))) | (((((attr) & (32))) ? (2) : (0))))) | 0);
    (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(1, code, color, flags);
  }

  function method_sh_irqtrigger_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((((Number((members.m_last_irq_state ?? runtime.member("m_last_irq_state"))) === Number(0)) ? 1 : 0)) && (state)) ? 1 : 0)) {
      (__l["m_soundcpu.set_input_line"] ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 2);
    }
    members.m_last_irq_state = state;
  }

  function method_irq_mask_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_irq_mask = ((state) & 0xff);
    if ((((members.m_irq_mask ?? runtime.member("m_irq_mask"))) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
    runtime.invoke("draw_sprites", bitmap, cliprect);
    return 0;
  }

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
  }

  function method_portB_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__mame_table_0[(((((runtime.divide((__l["m_soundcpu.total_cycles"] ?? runtime.memberCall(members.m_soundcpu, "total_cycles", 0, undefined))(), 512)) % (10))) % 10) + 10) % 10] ?? 0);
  }
  return {
    "colorram_w": method_colorram_w,
    "videoram_w": method_videoram_w,
    "interrupt_vector_w": method_interrupt_vector_w,
    "filter_w": method_filter_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "sh_irqtrigger_w": method_sh_irqtrigger_w,
    "irq_mask_w": method_irq_mask_w,
    "screen_update": method_screen_update,
    "vblank_irq": method_vblank_irq,
    "portB_r": method_portB_r
  };
})();
    return {
      "rocnrope_state.colorram_w": methods["colorram_w"],
      "rocnrope_state.videoram_w": methods["videoram_w"],
      "rocnrope_state.interrupt_vector_w": methods["interrupt_vector_w"],
      "rocnrope_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "rocnrope_state.irq_mask_w": methods["irq_mask_w"],
      "rocnrope_state.screen_update": methods["screen_update"],
      "rocnrope_state.vblank_irq": methods["vblank_irq"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["draw","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_maincpu.set_input_line","m_soundcpu.set_input_line","m_soundcpu.total_cycles","mark_tile_dirty","set","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
