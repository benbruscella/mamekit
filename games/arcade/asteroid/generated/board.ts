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

    let val: any = (((__l["m_dsw1.read"] ? __l["m_dsw1.read"]() : (members.m_dsw1) != null ? (typeof (runtime.dereference(members.m_dsw1)).read === 'function' ? (runtime.dereference(members.m_dsw1)).read() : typeof (runtime.dereference(members.m_dsw1)).read === 'number' || typeof (runtime.dereference(members.m_dsw1)).read === 'boolean' ? (runtime.dereference(members.m_dsw1)).read : runtime.container(members.m_dsw1, "read")) : (__l["read"]?.() ?? 0))) & 0xff);
    (__l["m_dsw_sel.i3a_w"] ? __l["m_dsw_sel.i3a_w"]((((val) >>> (0)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i3a_w?.((((val) >>> (0)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i3b_w"] ? __l["m_dsw_sel.i3b_w"]((((val) >>> (1)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i3b_w?.((((val) >>> (1)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i2a_w"] ? __l["m_dsw_sel.i2a_w"]((((val) >>> (2)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i2a_w?.((((val) >>> (2)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i2b_w"] ? __l["m_dsw_sel.i2b_w"]((((val) >>> (3)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i2b_w?.((((val) >>> (3)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i1a_w"] ? __l["m_dsw_sel.i1a_w"]((((val) >>> (4)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i1a_w?.((((val) >>> (4)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i1b_w"] ? __l["m_dsw_sel.i1b_w"]((((val) >>> (5)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i1b_w?.((((val) >>> (5)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i0a_w"] ? __l["m_dsw_sel.i0a_w"]((((val) >>> (6)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i0a_w?.((((val) >>> (6)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.i0b_w"] ? __l["m_dsw_sel.i0b_w"]((((val) >>> (7)) & 1)) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).i0b_w?.((((val) >>> (7)) & 1)) ?? 0) : 0);
    (__l["m_dsw_sel.s_w"] ? __l["m_dsw_sel.s_w"](((offset) & (3))) : (members.m_dsw_sel) != null ? ((runtime.dereference(members.m_dsw_sel)).s_w?.(((offset) & (3))) ?? 0) : 0);
    return ((((252) | ((((__l["m_dsw_sel.zb_r"] ? __l["m_dsw_sel.zb_r"]() : (members.m_dsw_sel) != null ? (typeof (runtime.dereference(members.m_dsw_sel)).zb_r === 'function' ? (runtime.dereference(members.m_dsw_sel)).zb_r() : typeof (runtime.dereference(members.m_dsw_sel)).zb_r === 'number' || typeof (runtime.dereference(members.m_dsw_sel)).zb_r === 'boolean' ? (runtime.dereference(members.m_dsw_sel)).zb_r : runtime.container(members.m_dsw_sel, "zb_r")) : 0)) << (1))))) | ((__l["m_dsw_sel.za_r"] ? __l["m_dsw_sel.za_r"]() : (members.m_dsw_sel) != null ? (typeof (runtime.dereference(members.m_dsw_sel)).za_r === 'function' ? (runtime.dereference(members.m_dsw_sel)).za_r() : typeof (runtime.dereference(members.m_dsw_sel)).za_r === 'number' || typeof (runtime.dereference(members.m_dsw_sel)).za_r === 'boolean' ? (runtime.dereference(members.m_dsw_sel)).za_r : runtime.container(members.m_dsw_sel, "za_r")) : 0)));
  }

  function method_cocktail_inv_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let flip: any = (((((state) && ((__l["m_cocktail.read"] ? __l["m_cocktail.read"]() : (members.m_cocktail) != null ? (typeof (runtime.dereference(members.m_cocktail)).read === 'function' ? (runtime.dereference(members.m_cocktail)).read() : typeof (runtime.dereference(members.m_cocktail)).read === 'number' || typeof (runtime.dereference(members.m_cocktail)).read === 'boolean' ? (runtime.dereference(members.m_cocktail)).read : runtime.container(members.m_cocktail, "read")) : (__l["read"]?.() ?? 0)))) ? 1 : 0)) | 0);
    (__l["m_dvg.set_flip_x"] ? __l["m_dvg.set_flip_x"](flip) : (members.m_dvg) != null ? ((runtime.dereference(members.m_dvg)).set_flip_x?.(flip) ?? 0) : 0);
    (__l["m_dvg.set_flip_y"] ? __l["m_dvg.set_flip_y"](flip) : (members.m_dvg) != null ? ((runtime.dereference(members.m_dvg)).set_flip_y?.(flip) ?? 0) : 0);
  }
  return {
    "asteroid_DSW1_r": method_asteroid_DSW1_r,
    "cocktail_inv_w": method_cocktail_inv_w
  };
})();
    return {
      "asteroid_state.asteroid_DSW1_r": methods["asteroid_DSW1_r"],
      "asteroid_state.cocktail_inv_w": methods["cocktail_inv_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_cocktail.read","m_dsw1.read","m_dsw_sel.i0a_w","m_dsw_sel.i0b_w","m_dsw_sel.i1a_w","m_dsw_sel.i1b_w","m_dsw_sel.i2a_w","m_dsw_sel.i2b_w","m_dsw_sel.i3a_w","m_dsw_sel.i3b_w","m_dsw_sel.s_w","m_dsw_sel.za_r","m_dsw_sel.zb_r","m_dvg.set_flip_x","m_dvg.set_flip_y","read"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
