// GENERATED executable machine composition from src/mame/sega/vicdual.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'carnival');

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


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_characterram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
  }

  function method_carnival_io_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if (((offset) & (1))) {
      (runtime.overrides["carnival_audio_1_w"] ? runtime.overrides["carnival_audio_1_w"](data) : method_carnival_audio_1_w(runtime, data));
    }
    if (((offset) & (2))) {
      (runtime.overrides["carnival_audio_2_w"] ? runtime.overrides["carnival_audio_2_w"](data) : method_carnival_audio_2_w(runtime, data));
    }
    if (((offset) & (8))) {
      (runtime.overrides["assert_coin_status"] ? runtime.overrides["assert_coin_status"]() : method_assert_coin_status(runtime));
    }
    if (((offset) & (64))) {
      (runtime.overrides["palette_bank_w"] ? runtime.overrides["palette_bank_w"](data) : method_palette_bank_w(runtime, data));
    }
  }

  function method_carnival_audio_1_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"], __L1: any = __l["m_samples.stop"];

    data = ((data) & 0xff);
    let bitsChanged: any = ((0) | 0);
    let bitsGoneHigh: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port1State ?? runtime.member("m_port1State"))) ^ (data))) | 0);
    bitsGoneHigh = ((((bitsChanged) & (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port1State = ((data) | 0);
    if (((bitsGoneLow) & (1))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(9, 9, 0);
    }
    if (((bitsGoneLow) & (2))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(3, 3, 0);
    }
    if (((bitsGoneLow) & (4))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(4, 4, 1);
    }
    if (((bitsGoneHigh) & (4))) {
      (__L1 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(4);
    }
    if (((bitsGoneLow) & (8))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(5, 5, 1);
    }
    if (((bitsGoneHigh) & (8))) {
      (__L1 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(5);
    }
    if (((bitsGoneLow) & (16))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(6, 6, 1);
    }
    if (((bitsGoneHigh) & (16))) {
      (__L1 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(6);
    }
    if (((bitsGoneLow) & (32))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(7, 7, 0);
    }
    if (((bitsGoneLow) & (64))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(1, 1, 0);
    }
    if (((bitsGoneLow) & (128))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(2, 2, 0);
    }
  }

  function method_carnival_audio_2_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"], __L1: any = __l["m_audiocpu.set_input_line"];

    data = ((data) & 0xff);
    let bitsChanged: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port2State ?? runtime.member("m_port2State"))) ^ (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port2State = ((data) | 0);
    if (((bitsGoneLow) & (4))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 0, 0);
    }
    if (((bitsGoneLow) & (32))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(8, 8, 0);
    }
    (__L1 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, ((((data) & (16))) ? (0) : (1)));
  }

  function method_assert_coin_status(runtime: any): any {
    const members = runtime.members;

    members.m_coin_status = ((1) & 0xff);
  }

  function method_palette_bank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_palette_bank = ((((data) & (3))) & 0xff);
  }

  function method_carnival_music_port_t1_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.shiftRight((~(members.m_port2State ?? runtime.member("m_port2State"))), 3)) & (1));
  }

  function method_clear_coin_status(runtime: any, param: any): any {
    const members = runtime.members;

    members.m_coin_status = ((0) & 0xff);
  }

  function method_screen_update_color(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_proms.base"], __L1: any = __l["base"], __L2: any = __l["rgb_t::black"], __L3: any = __l["rgb_t::white"];
    let __t0: any;

    let color_prom: any = runtime.byteView((__L0 ?? runtime.memberCall(members.m_proms, "base", 0, __L1))()); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    let x: any = ((0) & 0xff);
    let y: any = ((cliprect.min_y) & 0xff);
    let video_data: any = ((0) & 0xff);
    let back_pen: any = 0;
    let fore_pen: any = 0;
    while (1) {
      if (((Number(((x) & (7))) === Number(0)) ? 1 : 0)) {
        let offs: any = 0;
        offs = ((((((y) >>> (3))) << (5))) | (((x) >>> (3))));
        let char_code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & 0xff);
        offs = ((((char_code) << (3))) | (((y) & (7))));
        video_data = ((runtime.readIndex((members.m_characterram ?? runtime.member("m_characterram")), offs)) & 0xff);
        offs = ((((char_code) >>> (5))) | ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) << (3))));
        back_pen = ([(__L2 ? __L2() : runtime.macro("rgb_t::black")), 4278255360, 4294901760, 4294967040, 4278190335, 4278255615, 4294902015, (__L3 ? __L3() : runtime.macro("rgb_t::white"))][(((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (offs)] ?? 0) : runtime.readIndex(color_prom, offs)), 1)) & (7))) % 8) + 8) % 8] ?? 0);
        fore_pen = ([(__L2 ? __L2() : runtime.macro("rgb_t::black")), 4278255360, 4294901760, 4294967040, 4278190335, 4278255615, 4294902015, (__L3 ? __L3() : runtime.macro("rgb_t::white"))][(((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (offs)] ?? 0) : runtime.readIndex(color_prom, offs)), 5)) & (7))) % 8) + 8) % 8] ?? 0);
      }
      back_pen = (runtime.overrides["choose_pen"] ? runtime.overrides["choose_pen"](x, y, back_pen) : method_choose_pen(runtime, x, y, back_pen));
      let pen: any = ((((video_data) & (128))) ? (fore_pen) : (back_pen));
      bitmap["pix="](y, x, pen);
      video_data = ((((video_data) << (1))) & 0xff);
      x = ((((x) + (1))) & 0xff);
      if ((((x) === (0)) ? 1 : 0)) {
        if (((Number(y) === Number(cliprect.max_y)) ? 1 : 0)) {
          break;
        }
        y = ((((y) + (1))) & 0xff);
      }
    }
    return 0;
  }

  function method_choose_pen(runtime: any, x: any, y: any, back_pen: any): any {
    const members = runtime.members;

    x = ((x) & 0xff);
    y = ((y) & 0xff);
    return back_pen;
  }

  function method_coin_status_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_coin_status ?? runtime.member("m_coin_status"));
  }

  function method_cblank_comp_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.hblank"];
    let __t0: any;

    return ((((runtime.overrides["vblank_comp_r"] ? runtime.overrides["vblank_comp_r"]() : method_vblank_comp_r(runtime))) && ((((__L0 ?? runtime.memberCall(members.m_screen, "hblank", 0, undefined))()) ? 0 : 1))) ? 1 : 0);
  }

  function method_vblank_comp_r(runtime: any): any {
    const members = runtime.members;

    return ((Number((runtime.overrides["get_vcounter"] ? runtime.overrides["get_vcounter"]() : method_get_vcounter(runtime))) < Number(224)) ? 1 : 0);
  }

  function method_get_vcounter(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.hpos"];
    let __t0: any, __t1: any;

    let vcounter: any = (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    if (((Number((__L1 ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))()) >= Number(304)) ? 1 : 0)) {
      vcounter = ((((((vcounter) + (1))) % (262))) | 0);
    }
    return vcounter;
  }

  function method_timer_value_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().time"];

    return (((typeof ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? runtime.attotime(((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0), "as_ticks", 500) : (__deref_timer_value_r(runtime, ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_ticks?.(500) ?? 0))) & (1));
  }
  function __deref_timer_value_r(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "videoram_w": method_videoram_w,
    "characterram_w": method_characterram_w,
    "carnival_io_w": method_carnival_io_w,
    "carnival_audio_1_w": method_carnival_audio_1_w,
    "carnival_audio_2_w": method_carnival_audio_2_w,
    "assert_coin_status": method_assert_coin_status,
    "palette_bank_w": method_palette_bank_w,
    "carnival_music_port_t1_r": method_carnival_music_port_t1_r,
    "clear_coin_status": method_clear_coin_status,
    "screen_update_color": method_screen_update_color,
    "choose_pen": method_choose_pen,
    "coin_status_r": method_coin_status_r,
    "cblank_comp_r": method_cblank_comp_r,
    "vblank_comp_r": method_vblank_comp_r,
    "get_vcounter": method_get_vcounter,
    "timer_value_r": method_timer_value_r
  };
  return __methodTable;
})();
    return {
      "vicdual_state.videoram_w": methods["videoram_w"],
      "vicdual_state.characterram_w": methods["characterram_w"],
      "vicdual_state.assert_coin_status": methods["assert_coin_status"],
      "vicdual_state.palette_bank_w": methods["palette_bank_w"],
      "vicdual_state.clear_coin_status": methods["clear_coin_status"],
      "vicdual_state.screen_update_color": methods["screen_update_color"],
      "vicdual_state.choose_pen": methods["choose_pen"],
      "vicdual_state.coin_status_r": methods["coin_status_r"],
      "vicdual_state.cblank_comp_r": methods["cblank_comp_r"],
      "vicdual_state.vblank_comp_r": methods["vblank_comp_r"],
      "vicdual_state.get_vcounter": methods["get_vcounter"],
      "vicdual_state.timer_value_r": methods["timer_value_r"],
    };
  })(),
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


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_characterram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
  }

  function method_carnival_io_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if (((offset) & (1))) {
      (runtime.overrides["carnival_audio_1_w"] ? runtime.overrides["carnival_audio_1_w"](data) : method_carnival_audio_1_w(runtime, data));
    }
    if (((offset) & (2))) {
      (runtime.overrides["carnival_audio_2_w"] ? runtime.overrides["carnival_audio_2_w"](data) : method_carnival_audio_2_w(runtime, data));
    }
    if (((offset) & (8))) {
      (runtime.overrides["assert_coin_status"] ? runtime.overrides["assert_coin_status"]() : method_assert_coin_status(runtime));
    }
    if (((offset) & (64))) {
      (runtime.overrides["palette_bank_w"] ? runtime.overrides["palette_bank_w"](data) : method_palette_bank_w(runtime, data));
    }
  }

  function method_carnival_audio_1_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"], __L1: any = __l["m_samples.stop"];

    data = ((data) & 0xff);
    let bitsChanged: any = ((0) | 0);
    let bitsGoneHigh: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port1State ?? runtime.member("m_port1State"))) ^ (data))) | 0);
    bitsGoneHigh = ((((bitsChanged) & (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port1State = ((data) | 0);
    if (((bitsGoneLow) & (1))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(9, 9, 0);
    }
    if (((bitsGoneLow) & (2))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(3, 3, 0);
    }
    if (((bitsGoneLow) & (4))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(4, 4, 1);
    }
    if (((bitsGoneHigh) & (4))) {
      (__L1 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(4);
    }
    if (((bitsGoneLow) & (8))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(5, 5, 1);
    }
    if (((bitsGoneHigh) & (8))) {
      (__L1 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(5);
    }
    if (((bitsGoneLow) & (16))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(6, 6, 1);
    }
    if (((bitsGoneHigh) & (16))) {
      (__L1 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(6);
    }
    if (((bitsGoneLow) & (32))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(7, 7, 0);
    }
    if (((bitsGoneLow) & (64))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(1, 1, 0);
    }
    if (((bitsGoneLow) & (128))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(2, 2, 0);
    }
  }

  function method_carnival_audio_2_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"], __L1: any = __l["m_audiocpu.set_input_line"];

    data = ((data) & 0xff);
    let bitsChanged: any = ((0) | 0);
    let bitsGoneLow: any = ((0) | 0);
    bitsChanged = (((((members.m_port2State ?? runtime.member("m_port2State"))) ^ (data))) | 0);
    bitsGoneLow = ((((bitsChanged) & ((~data)))) | 0);
    members.m_port2State = ((data) | 0);
    if (((bitsGoneLow) & (4))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 0, 0);
    }
    if (((bitsGoneLow) & (32))) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(8, 8, 0);
    }
    (__L1 ?? runtime.memberCall(members.m_audiocpu, "set_input_line", 0, undefined))(-2, ((((data) & (16))) ? (0) : (1)));
  }

  function method_assert_coin_status(runtime: any): any {
    const members = runtime.members;

    members.m_coin_status = ((1) & 0xff);
  }

  function method_palette_bank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_palette_bank = ((((data) & (3))) & 0xff);
  }

  function method_carnivala_music_port_1_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_musicdata = ((data) | 0);
    (runtime.overrides["carnival_psg_latch"] ? runtime.overrides["carnival_psg_latch"]() : method_carnival_psg_latch(runtime));
  }

  function method_carnival_psg_latch(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_psg.address_w"], __L1: any = __l["m_psg.data_w"];

    if ((((members.m_musicbus ?? runtime.member("m_musicbus"))) & (1))) {
      if ((((members.m_musicbus ?? runtime.member("m_musicbus"))) & (2))) {
        (__L0 ?? runtime.memberCall(members.m_psg, "address_w", 0, undefined))((members.m_musicdata ?? runtime.member("m_musicdata")));
      } else {
        (__L1 ?? runtime.memberCall(members.m_psg, "data_w", 0, undefined))((members.m_musicdata ?? runtime.member("m_musicdata")));
      }
    }
  }

  function method_carnivala_music_port_2_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_musicbus = ((((((data) >>> (6))) & (3))) | 0);
    (runtime.overrides["carnival_psg_latch"] ? runtime.overrides["carnival_psg_latch"]() : method_carnival_psg_latch(runtime));
  }

  function method_carnival_music_port_t1_r(runtime: any): any {
    const members = runtime.members;

    return ((runtime.shiftRight((~(members.m_port2State ?? runtime.member("m_port2State"))), 3)) & (1));
  }

  function method_coin_status_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_coin_status ?? runtime.member("m_coin_status"));
  }

  function method_cblank_comp_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.hblank"];
    let __t0: any;

    return ((((runtime.overrides["vblank_comp_r"] ? runtime.overrides["vblank_comp_r"]() : method_vblank_comp_r(runtime))) && ((((__L0 ?? runtime.memberCall(members.m_screen, "hblank", 0, undefined))()) ? 0 : 1))) ? 1 : 0);
  }

  function method_vblank_comp_r(runtime: any): any {
    const members = runtime.members;

    return ((Number((runtime.overrides["get_vcounter"] ? runtime.overrides["get_vcounter"]() : method_get_vcounter(runtime))) < Number(224)) ? 1 : 0);
  }

  function method_get_vcounter(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.hpos"];
    let __t0: any, __t1: any;

    let vcounter: any = (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    if (((Number((__L1 ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))()) >= Number(304)) ? 1 : 0)) {
      vcounter = ((((((vcounter) + (1))) % (262))) | 0);
    }
    return vcounter;
  }

  function method_timer_value_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().time"];

    return (((typeof ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0) === 'number' ? runtime.attotime(((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0), "as_ticks", 500) : (__deref_timer_value_r(runtime, ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)).as_ticks?.(500) ?? 0))) & (1));
  }
  function __deref_timer_value_r(runtime: any, p: any): any {
    if (p !== null && typeof p === 'object') {
      if (p.generatedPointer === true) {
        if (p.target === undefined) {
          const read = p.source[p.offset];
          if (read !== undefined && read !== null) return read;
        }
      } else if (!Array.isArray(p) && !ArrayBuffer.isView(p)) {
        return p;
      }
    }
    return runtime.dereference(p);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "videoram_w": method_videoram_w,
    "characterram_w": method_characterram_w,
    "carnival_io_w": method_carnival_io_w,
    "carnival_audio_1_w": method_carnival_audio_1_w,
    "carnival_audio_2_w": method_carnival_audio_2_w,
    "assert_coin_status": method_assert_coin_status,
    "palette_bank_w": method_palette_bank_w,
    "carnivala_music_port_1_w": method_carnivala_music_port_1_w,
    "carnival_psg_latch": method_carnival_psg_latch,
    "carnivala_music_port_2_w": method_carnivala_music_port_2_w,
    "carnival_music_port_t1_r": method_carnival_music_port_t1_r,
    "coin_status_r": method_coin_status_r,
    "cblank_comp_r": method_cblank_comp_r,
    "vblank_comp_r": method_vblank_comp_r,
    "get_vcounter": method_get_vcounter,
    "timer_value_r": method_timer_value_r
  };
  return __methodTable;
})();
    return {
      "carnival_state.carnival_io_w": methods["carnival_io_w"],
      "carnival_state.carnival_audio_1_w": methods["carnival_audio_1_w"],
      "carnival_state.carnival_audio_2_w": methods["carnival_audio_2_w"],
      "carnival_state.carnivala_music_port_1_w": methods["carnivala_music_port_1_w"],
      "carnival_state.carnival_psg_latch": methods["carnival_psg_latch"],
      "carnival_state.carnivala_music_port_2_w": methods["carnivala_music_port_2_w"],
      "carnival_state.carnival_music_port_t1_r": methods["carnival_music_port_t1_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["base","m_audiocpu.set_input_line","m_proms.base","m_psg.address_w","m_psg.data_w","m_samples.start","m_samples.stop","m_screen.hblank","m_screen.hpos","m_screen.update_partial","m_screen.vpos","machine","machine().time","rgb_t::black","rgb_t::white"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
