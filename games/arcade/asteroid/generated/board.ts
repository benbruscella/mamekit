// GENERATED executable machine composition from src/mame/atari/asteroid.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'asteroid');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_asteroid_DSW1_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let val: any = (((__l["m_dsw1.read"] ?? runtime.memberCall(members.m_dsw1, "read", 0, __l["read"]))()) & 0xff);
    (__l["m_dsw_sel.i3a_w"] ?? runtime.memberCall(members.m_dsw_sel, "i3a_w", 0, undefined))((((val) >>> (0)) & 1));
    (__l["m_dsw_sel.i3b_w"] ?? runtime.memberCall(members.m_dsw_sel, "i3b_w", 0, undefined))((((val) >>> (1)) & 1));
    (__l["m_dsw_sel.i2a_w"] ?? runtime.memberCall(members.m_dsw_sel, "i2a_w", 0, undefined))((((val) >>> (2)) & 1));
    (__l["m_dsw_sel.i2b_w"] ?? runtime.memberCall(members.m_dsw_sel, "i2b_w", 0, undefined))((((val) >>> (3)) & 1));
    (__l["m_dsw_sel.i1a_w"] ?? runtime.memberCall(members.m_dsw_sel, "i1a_w", 0, undefined))((((val) >>> (4)) & 1));
    (__l["m_dsw_sel.i1b_w"] ?? runtime.memberCall(members.m_dsw_sel, "i1b_w", 0, undefined))((((val) >>> (5)) & 1));
    (__l["m_dsw_sel.i0a_w"] ?? runtime.memberCall(members.m_dsw_sel, "i0a_w", 0, undefined))((((val) >>> (6)) & 1));
    (__l["m_dsw_sel.i0b_w"] ?? runtime.memberCall(members.m_dsw_sel, "i0b_w", 0, undefined))((((val) >>> (7)) & 1));
    (__l["m_dsw_sel.s_w"] ?? runtime.memberCall(members.m_dsw_sel, "s_w", 0, undefined))(((offset) & (3)));
    return ((((252) | ((((__l["m_dsw_sel.zb_r"] ?? runtime.memberCall(members.m_dsw_sel, "zb_r", 0, undefined))()) << (1))))) | ((__l["m_dsw_sel.za_r"] ?? runtime.memberCall(members.m_dsw_sel, "za_r", 0, undefined))()));
  }

  function method_cocktail_inv_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let flip: any = (((((state) && ((__l["m_cocktail.read"] ?? runtime.memberCall(members.m_cocktail, "read", 0, __l["read"]))())) ? 1 : 0)) | 0);
    (__l["m_dvg.set_flip_x"] ?? runtime.memberCall(members.m_dvg, "set_flip_x", 0, undefined))(flip);
    (__l["m_dvg.set_flip_y"] ?? runtime.memberCall(members.m_dvg, "set_flip_y", 0, undefined))(flip);
  }

  function method_clock_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((((__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))()) & (256))) ? (1) : (0));
  }
  return {
    "asteroid_DSW1_r": method_asteroid_DSW1_r,
    "cocktail_inv_w": method_cocktail_inv_w,
    "clock_r": method_clock_r
  };
})();
    return {
      "asteroid_state.asteroid_DSW1_r": methods["asteroid_DSW1_r"],
      "asteroid_state.cocktail_inv_w": methods["cocktail_inv_w"],
      "asteroid_state.clock_r": methods["clock_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_cocktail.read","m_dsw1.read","m_dsw_sel.i0a_w","m_dsw_sel.i0b_w","m_dsw_sel.i1a_w","m_dsw_sel.i1b_w","m_dsw_sel.i2a_w","m_dsw_sel.i2b_w","m_dsw_sel.i3a_w","m_dsw_sel.i3b_w","m_dsw_sel.s_w","m_dsw_sel.za_r","m_dsw_sel.zb_r","m_dvg.set_flip_x","m_dvg.set_flip_y","m_maincpu.total_cycles","read"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
