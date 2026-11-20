// GENERATED executable machine composition from src/mame/taito/qix.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'qix');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {
  const cppMin = (a: number, b: number) => (b < a ? b : a);
  const cppMax = (a: number, b: number) => (a < b ? b : a);
  // An aggregate initializer's struct, marked as one (execute.ts's
  // isGeneratedStruct) through its prototype: like generatedStruct's
  // non-enumerable marker, field walks and spreads never see it, and a
  // literal with a prototype costs nothing next to defineProperty.
  const cppStructPrototype = { [Symbol.for('mamekit.struct')]: true };
  // CALL_METHOD through a table of method names: each entry's emitted method,
  // resolved once and again only if that entry's name changes (see the
  // CALL_METHOD emission). The last table is held, as a core keeps one until
  // its mode changes.
  const cppDispatch = new WeakMap<object, { names: unknown[]; methods: any[] }>();
  let cppLastTable: unknown, cppLastEntry: { names: unknown[]; methods: any[] } | undefined;
  const cppMethodAt = (table: any, index: number): any => {
    if (!Array.isArray(table)) return undefined;
    let entry = table === cppLastTable ? cppLastEntry : undefined;
    if (!entry) {
      entry = cppDispatch.get(table);
      if (!entry) cppDispatch.set(table, entry = { names: new Array(table.length), methods: new Array(table.length) });
      cppLastTable = table;
      cppLastEntry = entry;
    }
    const name = table[index];
    if (entry.names[index] === name && name !== undefined) return entry.methods[index];
    entry.names[index] = name;
    return entry.methods[index] = typeof name === 'string' ? __methodTable[name] : undefined;
  };
  // execute.ts's clearGeneratedStruct, field names read once per struct.
  const cppUnionElements = Symbol.for('mamekit.unionElements');
  const cppStructKeys = new WeakMap<object, string[]>();
  const cppClearStruct = (target: any, value: number): void => {
    let keys = cppStructKeys.get(target);
    if (!keys) cppStructKeys.set(target, keys = Object.keys(target));
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index]!;
      const field = target[key];
      if (ArrayBuffer.isView(field) || Array.isArray(field)) (field as any).fill(value);
      else if (field && typeof field === 'object') cppClearStruct(field, value);
      else target[key] = value;
    }
  };
  // memset: typed memory fills in place; a plain array of numbers is set
  // element by element (as the interpreter's fillGeneratedMemory writes it,
  // count elements from 0); an array holding structs, or a pointer into a
  // plain array, goes to the interpreter's rule, which clears each struct.
  const cppMemset = (runtime: any, target: any, value: number, count: any) => {
    const bytes = Number(count);
    if (Array.isArray(target)) {
      for (let index = 0; index < bytes; index++) {
        const element = target[index];
        if (element !== null && typeof element === 'object') {
          // A struct element is cleared field by field (cppClearStruct);
          // anything else array-like takes the interpreter's rule.
          if (ArrayBuffer.isView(element) || Array.isArray(element) || element[cppUnionElements] === true) {
            return runtime.macro("memset", target, value, bytes);
          }
          cppClearStruct(element, value);
          continue;
        }
        target[index] = value;
      }
      return target;
    }
    if (Array.isArray(target?.source)) return runtime.macro("memset", target, value, bytes);
    if (target?.generatedPointer) {
      const width = target.source.BYTES_PER_ELEMENT ?? 1;
      target.source.fill(value, target.offset, target.offset + Math.ceil(bytes / width));
      return target;
    }
    target.fill(value, 0, bytes);
    return target;
  };
  // A 64-bit local held as two unsigned 32-bit halves (splitWideLocals):
  // the halves of any value, and unsigned 64-bit shifts of a pair, exactly as
  // execute.ts's wide operators answer them (a shift of 64 or more is 0).
  const cppLo64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v)) : (Number(v) >>> 0);
  const cppHi64 = (v: any) => typeof v === 'bigint' ? Number(BigInt.asUintN(32, v >> 32n)) : (Math.floor(Number(v) / 4294967296) >>> 0);
  const cppShl64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? (lo << s) >>> 0 : 0;
  const cppShl64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShr64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? ((hi << s) | (lo >>> (32 - s))) >>> 0 : s < 64 ? (lo << (s - 32)) >>> 0 : 0;
  const cppShr64Lo = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Lo(lo, hi, -s) : s === 0 ? lo : s < 32 ? ((lo >>> s) | (hi << (32 - s))) >>> 0 : s < 64 ? hi >>> (s - 32) : 0;
  const cppShr64Hi = (lo: number, hi: number, s: number): number => s < 0 ? cppShl64Hi(lo, hi, -s) : s === 0 ? hi : s < 32 ? hi >>> s : 0;
  const cppStringText = (value: unknown) => typeof value === 'string' ? value
    : typeof value === 'number' || typeof value === 'boolean' ? String(Number(value))
    : value === undefined || value === null ? '' : String(value);


  function method_video_firq_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_videocpu.set_input_line"], __L3: any = __l["space.unmap"], __L4: any = __l["unmap"];
    let __t0: any;

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 1);
    }
    return (__L3 ?? runtime.memberCall(space, "unmap", 0, __L4))();
  }

  function method_video_firq_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_videocpu.set_input_line"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 1);
  }

  function method_data_firq_ack_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.unmap"], __L4: any = __l["unmap"];
    let __t0: any;

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
    }
    return (__L3 ?? runtime.memberCall(space, "unmap", 0, __L4))();
  }

  function method_data_firq_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
  }

  function method_pia_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("pia_w_callback", ((data) | (((offset) << (8)))));
  }

  function method_videoram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    offset = ((offset) + (((((runtime.readIndex(h_m_videoram_address, 0)) & (128))) << (8))));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    offset = ((offset) + (((((runtime.readIndex(h_m_videoram_address, 0)) & (128))) << (8))));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_palettebank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(((data) & (3)))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
      members.m_palette_bank = ((((data) & (3))) & 0xff);
    }
    members.m_leds = (((((~data)) & (252))) & 0xff);
  }

  function method_data_firq_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.unmap"], __L4: any = __l["unmap"];
    let __t0: any;

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
    }
    return (__L3 ?? runtime.memberCall(space, "unmap", 0, __L4))();
  }

  function method_data_firq_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
  }

  function method_video_firq_ack_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_videocpu.set_input_line"], __L3: any = __l["space.unmap"], __L4: any = __l["unmap"];
    let __t0: any;

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 0);
    }
    return (__L3 ?? runtime.memberCall(space, "unmap", 0, __L4))();
  }

  function method_video_firq_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_videocpu.set_input_line"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_videocpu, "set_input_line", 0, undefined))(1, 0);
  }

  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.read8"], __L1: any = __l["m_screen.vpos"], __L2: any = __l["m_screen.update_partial"], __L3: any = __l["m_palette.write8"];
    let __t0: any;

    data = ((data) & 0xff);
    let old_data: any = (((__L0 ?? runtime.memberCall(members.m_palette, "read8", 0, undefined))(offset)) & 0xff);
    if ((((((Number(((offset) >>> (8))) === Number((members.m_palette_bank ?? runtime.member("m_palette_bank")))) ? 1 : 0)) && ((((old_data) !== (data)) ? 1 : 0))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L1 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    (__L3 ?? runtime.memberCall(members.m_palette, "write8", 0, undefined))(offset, data);
  }

  function method_addresslatch_r(runtime: any): any {
    const members = runtime.members;

    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    let offset: any = ((((runtime.readIndex(h_m_videoram_address, 0)) << (8))) | (runtime.readIndex(h_m_videoram_address, 1)));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_addresslatch_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    let offset: any = ((((runtime.readIndex(h_m_videoram_address, 0)) << (8))) | (runtime.readIndex(h_m_videoram_address, 1)));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_display_enable_changed(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_crtc.get_ma"], __L1: any = __l["m_crtc.get_ra"];
    let __t0: any, __t1: any;

    const h_m_scanline_latch = members.m_scanline_latch ?? runtime.member("m_scanline_latch");
    if (state) {
      let ma: any = (((__L0 ?? runtime.memberCall(members.m_crtc, "get_ma", 0, undefined))()) & 0xffff);
      let ra: any = (((__L1 ?? runtime.memberCall(members.m_crtc, "get_ra", 0, undefined))()) & 0xff);
      runtime.pointerStore(h_m_scanline_latch, ((((((ma) >>> (2))) & (248))) | (((ra) & (7)))));
    }
  }

  function method_sync_sndpia1_porta_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("deferred_sndpia1_porta_w", data);
  }

  function method_vol_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_discrete.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741840, data);
  }

  function method_flip_screen_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_flip = ((state) ? 1 : 0);
  }

  function method_dac_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_discrete.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741832, data);
  }

  function method_sndpia_2_warning_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().phase"];

    data = ((data) & 0xff);
    if (((Number(((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().phase"))?.() ?? 0)) > Number(2)) ? 1 : 0)) {
      0;
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "video_firq_r": method_video_firq_r,
    "video_firq_w": method_video_firq_w,
    "data_firq_ack_r": method_data_firq_ack_r,
    "data_firq_ack_w": method_data_firq_ack_w,
    "pia_w": method_pia_w,
    "videoram_r": method_videoram_r,
    "videoram_w": method_videoram_w,
    "palettebank_w": method_palettebank_w,
    "data_firq_r": method_data_firq_r,
    "data_firq_w": method_data_firq_w,
    "video_firq_ack_r": method_video_firq_ack_r,
    "video_firq_ack_w": method_video_firq_ack_w,
    "paletteram_w": method_paletteram_w,
    "addresslatch_r": method_addresslatch_r,
    "addresslatch_w": method_addresslatch_w,
    "display_enable_changed": method_display_enable_changed,
    "sync_sndpia1_porta_w": method_sync_sndpia1_porta_w,
    "vol_w": method_vol_w,
    "flip_screen_w": method_flip_screen_w,
    "dac_w": method_dac_w,
    "sndpia_2_warning_w": method_sndpia_2_warning_w
  };
  return __methodTable;
})();
    return {
      "qix_state.video_firq_r": methods["video_firq_r"],
      "qix_state.video_firq_w": methods["video_firq_w"],
      "qix_state.data_firq_ack_r": methods["data_firq_ack_r"],
      "qix_state.data_firq_ack_w": methods["data_firq_ack_w"],
      "qix_state.pia_w": methods["pia_w"],
      "qix_state.videoram_r": methods["videoram_r"],
      "qix_state.videoram_w": methods["videoram_w"],
      "qix_state.palettebank_w": methods["palettebank_w"],
      "qix_state.data_firq_r": methods["data_firq_r"],
      "qix_state.data_firq_w": methods["data_firq_w"],
      "qix_state.video_firq_ack_r": methods["video_firq_ack_r"],
      "qix_state.video_firq_ack_w": methods["video_firq_ack_w"],
      "qix_state.paletteram_w": methods["paletteram_w"],
      "qix_state.addresslatch_r": methods["addresslatch_r"],
      "qix_state.addresslatch_w": methods["addresslatch_w"],
      "qix_state.display_enable_changed": methods["display_enable_changed"],
      "qix_state.sync_sndpia1_porta_w": methods["sync_sndpia1_porta_w"],
      "qix_state.vol_w": methods["vol_w"],
      "qix_state.flip_screen_w": methods["flip_screen_w"],
      "qix_state.dac_w": methods["dac_w"],
      "qix_state.sndpia_2_warning_w": methods["sndpia_2_warning_w"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_crtc.get_ma","m_crtc.get_ra","m_discrete.write","m_maincpu.set_input_line","m_palette.read8","m_palette.write8","m_screen.update_partial","m_screen.vpos","m_videocpu.set_input_line","machine","machine().phase","machine().side_effects_disabled","space.unmap","unmap"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
