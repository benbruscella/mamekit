// GENERATED executable machine composition from src/mame/taito/taitosj.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'junglek');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_characterram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(runtime.readIndex((members.m_characterram ?? runtime.member("m_characterram")), offset)) !== Number(data)) ? 1 : 0)) {
      if (((Number(offset) < Number(6144)) ? 1 : 0)) {
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0))).mark_dirty?.(((runtime.divide(offset, 8)) & (255))) ?? 0);
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1))).mark_dirty?.(((runtime.divide(offset, 32)) & (63))) ?? 0);
      } else {
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2))).mark_dirty?.(((runtime.divide(offset, 8)) & (255))) ?? 0);
        ((runtime.dereference((__l["m_gfxdecode.gfx"] ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(3))).mark_dirty?.(((runtime.divide(offset, 32)) & (63))) ?? 0);
      }
      runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
    }
  }

  function method_fake_data_r(runtime: any): any {
    const members = runtime.members;

    0;
    return 0;
  }

  function method_fake_data_w(runtime: any, data: any): any {
    const members = runtime.members;

    0;
  }

  function method_fake_status_r(runtime: any): any {
    const members = runtime.members;

    0;
    return 255;
  }

  function method_gfxrom_r(runtime: any): any {
    const members = runtime.members;

    const h_m_gfx = members.m_gfx ?? runtime.member("m_gfx");
    let ret: any = ((0) & 0xff);
    let offs: any = ((runtime.readIndex((members.m_gfxpointer ?? runtime.member("m_gfxpointer")), 0)) | (((runtime.readIndex((members.m_gfxpointer ?? runtime.member("m_gfxpointer")), 1)) << (8))));
    if (((Number(offs) < Number(32768)) ? 1 : 0)) {
      ret = ((runtime.readIndex(h_m_gfx, offs)) & 0xff);
    } else {
      ret = ((0) & 0xff);
    }
    offs = ((offs) + (1));
    runtime.writeIndex(runtime.writableMember("m_gfxpointer"), 0, ((offs) & (255)));
    runtime.writeIndex(runtime.writableMember("m_gfxpointer"), 1, runtime.shiftRight(offs, 8));
    return ret;
  }

  function method_collision_reg_clear_w(runtime: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 0, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 1, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 2, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 3, 0);
  }

  function method_soundlatch_flags_r(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_soundlatch_flag ?? runtime.member("m_soundlatch_flag"))) ? (8) : (0))) | ((((members.m_sound_semaphore2 ?? runtime.member("m_sound_semaphore2"))) ? (4) : (0))))) | (3));
  }

  function method_video_update_common(runtime: any, bitmap: any, cliprect: any, copy_layer_func: any): any {
    const members = runtime.members;

    let sprites_on: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32)))));
    let sprite_areas: any = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32))));
    runtime.invoke("calculate_sprite_areas", sprites_on, sprite_areas);
    runtime.invoke("set_pens");
    runtime.invoke("draw_layers");
    (runtime.overrides["copy_layers"] ? runtime.overrides["copy_layers"](bitmap, cliprect, copy_layer_func, sprites_on, sprite_areas) : method_copy_layers(runtime, bitmap, cliprect, copy_layer_func, sprites_on, sprite_areas));
    (runtime.overrides["check_collision"] ? runtime.overrides["check_collision"](sprites_on, sprite_areas) : method_check_collision(runtime, sprites_on, sprite_areas));
    return 0;
  }

  function method_copy_layers(runtime: any, bitmap: any, cliprect: any, copy_layer_func: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_colorbank = members.m_colorbank ?? runtime.member("m_colorbank");
    const h_m_video_priority = members.m_video_priority ?? runtime.member("m_video_priority");
    (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(((8) * (((runtime.readIndex(h_m_colorbank, 1)) & (7)))), cliprect);
    for (let i: any = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let which: any = ((runtime.readIndex(runtime.readIndex((members.m_draw_order ?? runtime.member("m_draw_order")), ((runtime.dereference(h_m_video_priority)) & (31))), i)) | 0);
      runtime.invoke("copy_layer", bitmap, cliprect, copy_layer_func, which, sprites_on, sprite_areas);
    }
  }

  function method_check_collision(runtime: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;

    runtime.invoke("check_sprite_sprite_collision");
    runtime.invoke("check_sprite_layer_collision", sprites_on, sprite_areas);
  }

  function method_input_port_4_f0_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_input_port_4_f0 = ((runtime.shiftRight(data, 4)) & 0xff);
  }

  function method_input_port_4_f0_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_input_port_4_f0 ?? runtime.member("m_input_port_4_f0"));
  }
  return {
    "characterram_w": method_characterram_w,
    "fake_data_r": method_fake_data_r,
    "fake_data_w": method_fake_data_w,
    "fake_status_r": method_fake_status_r,
    "gfxrom_r": method_gfxrom_r,
    "collision_reg_clear_w": method_collision_reg_clear_w,
    "soundlatch_flags_r": method_soundlatch_flags_r,
    "video_update_common": method_video_update_common,
    "copy_layers": method_copy_layers,
    "check_collision": method_check_collision,
    "input_port_4_f0_w": method_input_port_4_f0_w,
    "input_port_4_f0_r": method_input_port_4_f0_r
  };
})();
    return {
      "taitosj_state.characterram_w": methods["characterram_w"],
      "taitosj_state.fake_data_r": methods["fake_data_r"],
      "taitosj_state.fake_data_w": methods["fake_data_w"],
      "taitosj_state.fake_status_r": methods["fake_status_r"],
      "taitosj_state.gfxrom_r": methods["gfxrom_r"],
      "taitosj_state.collision_reg_clear_w": methods["collision_reg_clear_w"],
      "taitosj_state.soundlatch_flags_r": methods["soundlatch_flags_r"],
      "taitosj_state.video_update_common": methods["video_update_common"],
      "taitosj_state.copy_layers": methods["copy_layers"],
      "taitosj_state.check_collision": methods["check_collision"],
      "taitosj_state.input_port_4_f0_w": methods["input_port_4_f0_w"],
      "taitosj_state.input_port_4_f0_r": methods["input_port_4_f0_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","fill","m_gfxdecode.gfx"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
