// GENERATED executable machine composition from src/mame/technos/matmania.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'matmania');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  function method_paletteram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let bit0: any = 0;
    let bit1: any = 0;
    let bit2: any = 0;
    let bit3: any = 0;
    let val: any = 0;
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    offset = runtime.andAssign(offset, 15);
    val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset);
    bit0 = (((val) >>> (0)) & 1);
    bit1 = (((val) >>> (1)) & 1);
    bit2 = (((val) >>> (2)) & 1);
    bit3 = (((val) >>> (3)) & 1);
    let r: any = runtime.add(runtime.add(runtime.add(((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)));
    val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (16)));
    bit0 = (((val) >>> (0)) & 1);
    bit1 = (((val) >>> (1)) & 1);
    bit2 = (((val) >>> (2)) & 1);
    bit3 = (((val) >>> (3)) & 1);
    let g: any = runtime.add(runtime.add(runtime.add(((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)));
    val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (32)));
    bit0 = (((val) >>> (0)) & 1);
    bit1 = (((val) >>> (1)) & 1);
    bit2 = (((val) >>> (2)) & 1);
    bit3 = (((val) >>> (3)) & 1);
    let b: any = runtime.add(runtime.add(runtime.add(((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)));
    (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](((offset) + (64)), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((offset) + (64)), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) ?? 0) : (runtime.calls["set_pen_color"]?.(((offset) + (64)), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) ?? 0));
  }

  function method_sound_nmi_enable_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_sound_nmi_enable = (((((((data) >>> (0)) & 1)) ? 1 : 0)) ? 1 : 0);
  }

  function method_scanline(runtime: any, param: any) {
    const members = runtime.members;
    let scanline: any = param;
    if (((((members.m_sound_nmi_enable ?? runtime.member("m_sound_nmi_enable"))) && (((Number(scanline) < Number(256)) ? 1 : 0))) ? 1 : 0)) {
      (runtime.calls["m_audiocpu.pulse_input_line"] ? runtime.calls["m_audiocpu.pulse_input_line"](-1, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).pulse_input_line?.(-1, 0) ?? 0) : (runtime.calls["pulse_input_line"]?.(-1, 0) ?? 0));
    }
  }
  return {
    "paletteram_w": method_paletteram_w,
    "sound_nmi_enable_w": method_sound_nmi_enable_w,
    "scanline": method_scanline
  };
})();
    return {
      "matmania_state.paletteram_w": methods["paletteram_w"],
      "matmania_state.sound_nmi_enable_w": methods["sound_nmi_enable_w"],
      "matmania_state.scanline": methods["scanline"],
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
