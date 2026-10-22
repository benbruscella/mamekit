// GENERATED executable machine composition from src/mame/atari/bzone.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bzone');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_status_r(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_lo_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_result ?? runtime.member("m_result"))) & (255));
  }

  function method_hi_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.shiftRight((members.m_result ?? runtime.member("m_result")), 8)) & (255));
  }

  function method_clock_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((((__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))()) & (256))) ? (1) : (0));
  }
  return {
    "status_r": method_status_r,
    "lo_r": method_lo_r,
    "hi_r": method_hi_r,
    "clock_r": method_clock_r
  };
})();
    return {
      "bzone_state.clock_r": methods["clock_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_maincpu.total_cycles"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
