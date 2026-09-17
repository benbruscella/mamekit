// GENERATED executable machine composition from src/mame/toaplan/wardner.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'wardner');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {

  function method_wardner_sprite_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram16: any = runtime.packedView((__l["m_spriteram8.live"] ? __l["m_spriteram8.live"]() : (members.m_spriteram8) != null ? (typeof (runtime.dereference(members.m_spriteram8)).live === 'function' ? (runtime.dereference(members.m_spriteram8)).live() : typeof (runtime.dereference(members.m_spriteram8)).live === 'number' || typeof (runtime.dereference(members.m_spriteram8)).live === 'boolean' ? (runtime.dereference(members.m_spriteram8)).live : runtime.container(members.m_spriteram8, "live")) : 0), false);
    if ((((offset) >>> (0)) & 1)) {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), ((((runtime.readIndex(spriteram16, runtime.divide(offset, 2))) & (255))) | (((data) << (8)))));
    } else {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), ((((runtime.readIndex(spriteram16, runtime.divide(offset, 2))) & (65280))) | (data)));
    }
  }

  function method_wardner_sprite_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram16: any = runtime.packedView((__l["m_spriteram8.live"] ? __l["m_spriteram8.live"]() : (members.m_spriteram8) != null ? (typeof (runtime.dereference(members.m_spriteram8)).live === 'function' ? (runtime.dereference(members.m_spriteram8)).live() : typeof (runtime.dereference(members.m_spriteram8)).live === 'number' || typeof (runtime.dereference(members.m_spriteram8)).live === 'boolean' ? (runtime.dereference(members.m_spriteram8)).live : runtime.container(members.m_spriteram8, "live")) : 0), false);
    let shift: any = (((((((offset) >>> (0)) & 1)) * (8))) | 0);
    return ((runtime.readIndex(spriteram16, runtime.divide(offset, 2))) >>> (shift));
  }

  function method_wardner_txlayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_txoffs_w"] ? runtime.overrides["twincobr_txoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_txoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_txoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txoffs ?? runtime.member("m_txoffs")), set: (value: any) => { members.m_txoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_txoffs = ((((members.m_txoffs) % ((members.m_txvideoram_size ?? runtime.member("m_txvideoram_size"))))) | 0);
  }

  function method_wardner_bglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_bgoffs_w"] ? runtime.overrides["twincobr_bgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_bgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgoffs ?? runtime.member("m_bgoffs")), set: (value: any) => { members.m_bgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_bgoffs = ((((members.m_bgoffs) % ((((members.m_bgvideoram_size ?? runtime.member("m_bgvideoram_size"))) >>> (1))))) | 0);
  }

  function method_wardner_fglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_fgoffs_w"] ? runtime.overrides["twincobr_fgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_fgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgoffs ?? runtime.member("m_fgoffs")), set: (value: any) => { members.m_fgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_fgoffs = ((((members.m_fgoffs) % ((members.m_fgvideoram_size ?? runtime.member("m_fgvideoram_size"))))) | 0);
  }

  function method_wardner_exscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    switch (offset) {
      case 1:
      case 0:
      {
        0;
        break;
      }
      case 3:
      case 2:
      {
        0;
        break;
      }
    }
  }

  function method_wardner_videoram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    switch (runtime.divide(offset, 2)) {
      case 0:
      {
        return (((runtime.overrides["twincobr_txram_r"] ? runtime.overrides["twincobr_txram_r"]() : method_twincobr_txram_r(runtime))) >>> (shift));
      }
      case 1:
      {
        return (((runtime.overrides["twincobr_bgram_r"] ? runtime.overrides["twincobr_bgram_r"]() : method_twincobr_bgram_r(runtime))) >>> (shift));
      }
      case 2:
      {
        return (((runtime.overrides["twincobr_fgram_r"] ? runtime.overrides["twincobr_fgram_r"]() : method_twincobr_fgram_r(runtime))) >>> (shift));
      }
    }
    return 0;
  }

  function method_twincobr_txram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), (members.m_txoffs ?? runtime.member("m_txoffs")));
  }

  function method_twincobr_bgram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank"))));
  }

  function method_twincobr_fgram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs")));
  }

  function method_wardner_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    switch (runtime.divide(offset, 2)) {
      case 0:
      {
        (runtime.overrides["twincobr_txram_w"] ? runtime.overrides["twincobr_txram_w"](0, ((data) << (shift)), ((255) << (shift))) : method_twincobr_txram_w(runtime, 0, ((data) << (shift)), ((255) << (shift))));
        break;
      }
      case 1:
      {
        (runtime.overrides["twincobr_bgram_w"] ? runtime.overrides["twincobr_bgram_w"](0, ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgram_w(runtime, 0, ((data) << (shift)), ((255) << (shift))));
        break;
      }
      case 2:
      {
        (runtime.overrides["twincobr_fgram_w"] ? runtime.overrides["twincobr_fgram_w"](0, ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgram_w(runtime, 0, ((data) << (shift)), ((255) << (shift))));
        break;
      }
    }
  }

  function method_twincobr_txram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf((members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), (members.m_txoffs ?? runtime.member("m_txoffs"))), data, mem_mask);
    (__l["m_tx_tilemap.mark_tile_dirty"] ? __l["m_tx_tilemap.mark_tile_dirty"]((members.m_txoffs ?? runtime.member("m_txoffs"))) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.((members.m_txoffs ?? runtime.member("m_txoffs"))) ?? 0) : (__l["mark_tile_dirty"]?.((members.m_txoffs ?? runtime.member("m_txoffs"))) ?? 0));
  }

  function method_twincobr_bgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))), data, mem_mask);
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))) ?? 0) : (__l["mark_tile_dirty"]?.(runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))) ?? 0));
  }

  function method_twincobr_fgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs"))), data, mem_mask);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"]((members.m_fgoffs ?? runtime.member("m_fgoffs"))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.((members.m_fgoffs ?? runtime.member("m_fgoffs"))) ?? 0) : (__l["mark_tile_dirty"]?.((members.m_fgoffs ?? runtime.member("m_fgoffs"))) ?? 0));
  }

  function method_wardner_bank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_rom_ram_view.select"] ? __l["m_rom_ram_view.select"](((((Number(data) === Number(0)) ? 1 : 0)) ? (0) : (1))) : (members.m_rom_ram_view) != null ? ((runtime.dereference(members.m_rom_ram_view)).select?.(((((Number(data) === Number(0)) ? 1 : 0)) ? (0) : (1))) ?? 0) : (__l["select"]?.(((((Number(data) === Number(0)) ? 1 : 0)) ? (0) : (1))) ?? 0));
    (__l["m_rombank.set_entry"] ? __l["m_rombank.set_entry"](((data) & (7))) : (members.m_rombank) != null ? ((runtime.dereference(members.m_rombank)).set_entry?.(((data) & (7))) ?? 0) : (__l["set_entry"]?.(((data) & (7))) ?? 0));
  }

  function method_dsp_host_addr_cb(runtime: any, data: any, seg: any, addr: any): any {
    const members = runtime.members;

    seg.set(((((data) & (57344))) >>> 0));
    addr.set(((((((data) & (2047))) << (1))) >>> 0));
    if (((Number(seg.get()) === Number(24576)) ? 1 : 0)) {
      seg.set(((28672) >>> 0));
    }
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_intenable = ((state) ? 1 : 0);
    if (((state) ? 0 : 1)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
    }
  }

  function method_bg_ram_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_bg_ram_bank = ((((state) ? (4096) : (0))) >>> 0);
    (__l["m_bg_tilemap.mark_all_dirty"] ? __l["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
  }

  function method_fg_rom_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_fg_rom_bank = ((((state) ? (4096) : (0))) >>> 0);
    (__l["m_fg_tilemap.mark_all_dirty"] ? __l["m_fg_tilemap.mark_all_dirty"]() : (members.m_fg_tilemap) != null ? (typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_fg_tilemap)).mark_all_dirty : runtime.container(members.m_fg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
  }

  function method_display_on_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_display_on = ((state) ? 1 : 0);
  }

  function method_log_vram(runtime: any): any {
    const members = runtime.members;


  }

  function method_wardner_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && ((members.m_intenable ?? runtime.member("m_intenable")))) ? 1 : 0)) {
      (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
    }
  }
  return {
    "wardner_sprite_w": method_wardner_sprite_w,
    "wardner_sprite_r": method_wardner_sprite_r,
    "wardner_txlayer_w": method_wardner_txlayer_w,
    "twincobr_txoffs_w": method_twincobr_txoffs_w,
    "wardner_bglayer_w": method_wardner_bglayer_w,
    "twincobr_bgoffs_w": method_twincobr_bgoffs_w,
    "wardner_fglayer_w": method_wardner_fglayer_w,
    "twincobr_fgoffs_w": method_twincobr_fgoffs_w,
    "wardner_exscroll_w": method_wardner_exscroll_w,
    "wardner_videoram_r": method_wardner_videoram_r,
    "twincobr_txram_r": method_twincobr_txram_r,
    "twincobr_bgram_r": method_twincobr_bgram_r,
    "twincobr_fgram_r": method_twincobr_fgram_r,
    "wardner_videoram_w": method_wardner_videoram_w,
    "twincobr_txram_w": method_twincobr_txram_w,
    "twincobr_bgram_w": method_twincobr_bgram_w,
    "twincobr_fgram_w": method_twincobr_fgram_w,
    "wardner_bank_w": method_wardner_bank_w,
    "int_enable_w": method_int_enable_w,
    "bg_ram_bank_w": method_bg_ram_bank_w,
    "fg_rom_bank_w": method_fg_rom_bank_w,
    "display_on_w": method_display_on_w,
    "log_vram": method_log_vram,
    "wardner_vblank_irq": method_wardner_vblank_irq
  };
})();
    return {
      "wardner_state.wardner_sprite_w": methods["wardner_sprite_w"],
      "wardner_state.wardner_sprite_r": methods["wardner_sprite_r"],
      "wardner_state.wardner_txlayer_w": methods["wardner_txlayer_w"],
      "wardner_state.wardner_bglayer_w": methods["wardner_bglayer_w"],
      "wardner_state.wardner_fglayer_w": methods["wardner_fglayer_w"],
      "wardner_state.wardner_exscroll_w": methods["wardner_exscroll_w"],
      "wardner_state.wardner_videoram_r": methods["wardner_videoram_r"],
      "wardner_state.wardner_videoram_w": methods["wardner_videoram_w"],
      "wardner_state.wardner_bank_w": methods["wardner_bank_w"],
      "wardner_state.int_enable_w": methods["int_enable_w"],
      "wardner_state.bg_ram_bank_w": methods["bg_ram_bank_w"],
      "wardner_state.fg_rom_bank_w": methods["fg_rom_bank_w"],
      "wardner_state.display_on_w": methods["display_on_w"],
      "wardner_state.wardner_vblank_irq": methods["wardner_vblank_irq"],
    };
  })(),
  ...(() => {
    const methods = (() => {

  function method_wardner_sprite_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram16: any = runtime.packedView((__l["m_spriteram8.live"] ? __l["m_spriteram8.live"]() : (members.m_spriteram8) != null ? (typeof (runtime.dereference(members.m_spriteram8)).live === 'function' ? (runtime.dereference(members.m_spriteram8)).live() : typeof (runtime.dereference(members.m_spriteram8)).live === 'number' || typeof (runtime.dereference(members.m_spriteram8)).live === 'boolean' ? (runtime.dereference(members.m_spriteram8)).live : runtime.container(members.m_spriteram8, "live")) : 0), false);
    if ((((offset) >>> (0)) & 1)) {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), ((((runtime.readIndex(spriteram16, runtime.divide(offset, 2))) & (255))) | (((data) << (8)))));
    } else {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), ((((runtime.readIndex(spriteram16, runtime.divide(offset, 2))) & (65280))) | (data)));
    }
  }

  function method_wardner_sprite_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let spriteram16: any = runtime.packedView((__l["m_spriteram8.live"] ? __l["m_spriteram8.live"]() : (members.m_spriteram8) != null ? (typeof (runtime.dereference(members.m_spriteram8)).live === 'function' ? (runtime.dereference(members.m_spriteram8)).live() : typeof (runtime.dereference(members.m_spriteram8)).live === 'number' || typeof (runtime.dereference(members.m_spriteram8)).live === 'boolean' ? (runtime.dereference(members.m_spriteram8)).live : runtime.container(members.m_spriteram8, "live")) : 0), false);
    let shift: any = (((((((offset) >>> (0)) & 1)) * (8))) | 0);
    return ((runtime.readIndex(spriteram16, runtime.divide(offset, 2))) >>> (shift));
  }

  function method_wardner_txlayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_txoffs_w"] ? runtime.overrides["twincobr_txoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_txoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_txoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txoffs ?? runtime.member("m_txoffs")), set: (value: any) => { members.m_txoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_txoffs = ((((members.m_txoffs) % ((members.m_txvideoram_size ?? runtime.member("m_txvideoram_size"))))) | 0);
  }

  function method_wardner_bglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_bgoffs_w"] ? runtime.overrides["twincobr_bgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_bgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgoffs ?? runtime.member("m_bgoffs")), set: (value: any) => { members.m_bgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_bgoffs = ((((members.m_bgoffs) % ((((members.m_bgvideoram_size ?? runtime.member("m_bgvideoram_size"))) >>> (1))))) | 0);
  }

  function method_wardner_fglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_fgoffs_w"] ? runtime.overrides["twincobr_fgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_fgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgoffs ?? runtime.member("m_fgoffs")), set: (value: any) => { members.m_fgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_fgoffs = ((((members.m_fgoffs) % ((members.m_fgvideoram_size ?? runtime.member("m_fgvideoram_size"))))) | 0);
  }

  function method_wardner_exscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    switch (offset) {
      case 1:
      case 0:
      {
        0;
        break;
      }
      case 3:
      case 2:
      {
        0;
        break;
      }
    }
  }

  function method_wardner_videoram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    switch (runtime.divide(offset, 2)) {
      case 0:
      {
        return (((runtime.overrides["twincobr_txram_r"] ? runtime.overrides["twincobr_txram_r"]() : method_twincobr_txram_r(runtime))) >>> (shift));
      }
      case 1:
      {
        return (((runtime.overrides["twincobr_bgram_r"] ? runtime.overrides["twincobr_bgram_r"]() : method_twincobr_bgram_r(runtime))) >>> (shift));
      }
      case 2:
      {
        return (((runtime.overrides["twincobr_fgram_r"] ? runtime.overrides["twincobr_fgram_r"]() : method_twincobr_fgram_r(runtime))) >>> (shift));
      }
    }
    return 0;
  }

  function method_twincobr_txram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), (members.m_txoffs ?? runtime.member("m_txoffs")));
  }

  function method_twincobr_bgram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank"))));
  }

  function method_twincobr_fgram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs")));
  }

  function method_wardner_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    switch (runtime.divide(offset, 2)) {
      case 0:
      {
        (runtime.overrides["twincobr_txram_w"] ? runtime.overrides["twincobr_txram_w"](0, ((data) << (shift)), ((255) << (shift))) : method_twincobr_txram_w(runtime, 0, ((data) << (shift)), ((255) << (shift))));
        break;
      }
      case 1:
      {
        (runtime.overrides["twincobr_bgram_w"] ? runtime.overrides["twincobr_bgram_w"](0, ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgram_w(runtime, 0, ((data) << (shift)), ((255) << (shift))));
        break;
      }
      case 2:
      {
        (runtime.overrides["twincobr_fgram_w"] ? runtime.overrides["twincobr_fgram_w"](0, ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgram_w(runtime, 0, ((data) << (shift)), ((255) << (shift))));
        break;
      }
    }
  }

  function method_twincobr_txram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf((members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), (members.m_txoffs ?? runtime.member("m_txoffs"))), data, mem_mask);
    (__l["m_tx_tilemap.mark_tile_dirty"] ? __l["m_tx_tilemap.mark_tile_dirty"]((members.m_txoffs ?? runtime.member("m_txoffs"))) : (members.m_tx_tilemap) != null ? ((runtime.dereference(members.m_tx_tilemap)).mark_tile_dirty?.((members.m_txoffs ?? runtime.member("m_txoffs"))) ?? 0) : (__l["mark_tile_dirty"]?.((members.m_txoffs ?? runtime.member("m_txoffs"))) ?? 0));
  }

  function method_twincobr_bgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))), data, mem_mask);
    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))) ?? 0) : (__l["mark_tile_dirty"]?.(runtime.add((members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))) ?? 0));
  }

  function method_twincobr_fgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    runtime.combineData(runtime.addressOf((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs"))), data, mem_mask);
    (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"]((members.m_fgoffs ?? runtime.member("m_fgoffs"))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.((members.m_fgoffs ?? runtime.member("m_fgoffs"))) ?? 0) : (__l["mark_tile_dirty"]?.((members.m_fgoffs ?? runtime.member("m_fgoffs"))) ?? 0));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((runtime.readIndex((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), ((tile_index) + ((members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))))) & 0xffff);
    let tile_number: any = ((((code) & (4095))) >>> 0);
    let color: any = ((((((code) & (61440))) >>> (12))) >>> 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](2, tile_number, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(2, tile_number, color, 0) ?? 0) : (__l["set"]?.(2, tile_number, color, 0) ?? 0));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((runtime.readIndex((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), tile_index)) & 0xffff);
    let tile_number: any = ((((((code) & (4095))) | ((members.m_fg_rom_bank ?? runtime.member("m_fg_rom_bank"))))) >>> 0);
    let color: any = ((((((code) & (61440))) >>> (12))) >>> 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](1, tile_number, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, tile_number, color, 0) ?? 0) : (__l["set"]?.(1, tile_number, color, 0) ?? 0));
  }

  function method_get_tx_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let code: any = ((runtime.readIndex((members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), tile_index)) & 0xffff);
    let tile_number: any = ((((code) & (2047))) >>> 0);
    let color: any = ((((((code) & (63488))) >>> (11))) >>> 0);
    (__l["tileinfo.set"] ? __l["tileinfo.set"](0, tile_number, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, tile_number, color, 0) ?? 0) : (__l["set"]?.(0, tile_number, color, 0) ?? 0));
  }
  return {
    "wardner_sprite_w": method_wardner_sprite_w,
    "wardner_sprite_r": method_wardner_sprite_r,
    "wardner_txlayer_w": method_wardner_txlayer_w,
    "twincobr_txoffs_w": method_twincobr_txoffs_w,
    "wardner_bglayer_w": method_wardner_bglayer_w,
    "twincobr_bgoffs_w": method_twincobr_bgoffs_w,
    "wardner_fglayer_w": method_wardner_fglayer_w,
    "twincobr_fgoffs_w": method_twincobr_fgoffs_w,
    "wardner_exscroll_w": method_wardner_exscroll_w,
    "wardner_videoram_r": method_wardner_videoram_r,
    "twincobr_txram_r": method_twincobr_txram_r,
    "twincobr_bgram_r": method_twincobr_bgram_r,
    "twincobr_fgram_r": method_twincobr_fgram_r,
    "wardner_videoram_w": method_wardner_videoram_w,
    "twincobr_txram_w": method_twincobr_txram_w,
    "twincobr_bgram_w": method_twincobr_bgram_w,
    "twincobr_fgram_w": method_twincobr_fgram_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "get_tx_tile_info": method_get_tx_tile_info
  };
})();
    return {
      "twincobr_state.twincobr_txoffs_w": methods["twincobr_txoffs_w"],
      "twincobr_state.twincobr_bgoffs_w": methods["twincobr_bgoffs_w"],
      "twincobr_state.twincobr_fgoffs_w": methods["twincobr_fgoffs_w"],
      "twincobr_state.twincobr_txram_r": methods["twincobr_txram_r"],
      "twincobr_state.twincobr_bgram_r": methods["twincobr_bgram_r"],
      "twincobr_state.twincobr_fgram_r": methods["twincobr_fgram_r"],
      "twincobr_state.twincobr_txram_w": methods["twincobr_txram_w"],
      "twincobr_state.twincobr_bgram_w": methods["twincobr_bgram_w"],
      "twincobr_state.twincobr_fgram_w": methods["twincobr_fgram_w"],
      "twincobr_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "twincobr_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "twincobr_state.get_tx_tile_info": methods["get_tx_tile_info"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_bg_tilemap.mark_all_dirty","m_bg_tilemap.mark_tile_dirty","m_fg_tilemap.mark_all_dirty","m_fg_tilemap.mark_tile_dirty","m_maincpu.set_input_line","m_rom_ram_view.select","m_rombank.set_entry","m_spriteram8.live","m_tx_tilemap.mark_tile_dirty","mark_all_dirty","mark_tile_dirty","select","set","set_entry","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
