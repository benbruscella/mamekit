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


  function method_wardner_sprite_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram8.live"];
    let __t0: any;

    data = ((data) & 0xff);
    let spriteram16: any = runtime.packedView((__L0 ?? runtime.memberCall(members.m_spriteram8, "live", 0, undefined))(), false); let spriteram16$s: any = undefined, spriteram16$o: any = 0; if (ArrayBuffer.isView(spriteram16) || Array.isArray(spriteram16)) spriteram16$s = spriteram16; else if (spriteram16 !== null && typeof spriteram16 === 'object' && spriteram16.generatedPointer === true && spriteram16.path === undefined && spriteram16.target === undefined && (ArrayBuffer.isView(spriteram16.source) || Array.isArray(spriteram16.source))) { spriteram16$s = spriteram16.source; spriteram16$o = spriteram16.offset; }
    if ((((offset) >>> (0)) & 1)) {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), (((((spriteram16$s !== undefined ? (spriteram16$s[spriteram16$o + (runtime.divide(offset, 2))] ?? 0) : runtime.readIndex(spriteram16, runtime.divide(offset, 2)))) & (255))) | (((data) << (8)))));
    } else {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), (((((spriteram16$s !== undefined ? (spriteram16$s[spriteram16$o + (runtime.divide(offset, 2))] ?? 0) : runtime.readIndex(spriteram16, runtime.divide(offset, 2)))) & (65280))) | (data)));
    }
  }

  function method_wardner_sprite_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram8.live"];
    let __t0: any;

    let spriteram16: any = runtime.packedView((__L0 ?? runtime.memberCall(members.m_spriteram8, "live", 0, undefined))(), false); let spriteram16$s: any = undefined, spriteram16$o: any = 0; if (ArrayBuffer.isView(spriteram16) || Array.isArray(spriteram16)) spriteram16$s = spriteram16; else if (spriteram16 !== null && typeof spriteram16 === 'object' && spriteram16.generatedPointer === true && spriteram16.path === undefined && spriteram16.target === undefined && (ArrayBuffer.isView(spriteram16.source) || Array.isArray(spriteram16.source))) { spriteram16$s = spriteram16.source; spriteram16$o = spriteram16.offset; }
    let shift: any = (((((((offset) >>> (0)) & 1)) * (8))) | 0);
    return runtime.shiftRight((spriteram16$s !== undefined ? (spriteram16$s[spriteram16$o + (runtime.divide(offset, 2))] ?? 0) : runtime.readIndex(spriteram16, runtime.divide(offset, 2))), shift);
  }

  function method_wardner_txscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_txscroll_w"] ? runtime.overrides["twincobr_txscroll_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_txscroll_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_txscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_tx_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_tx_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((offset) === (0)) ? 1 : 0)) {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txscrollx ?? runtime.member("m_txscrollx")), set: (value: any) => { members.m_txscrollx = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrollx", 0, __L1))(0, (members.m_txscrollx ?? runtime.member("m_txscrollx")));
    } else {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txscrolly ?? runtime.member("m_txscrolly")), set: (value: any) => { members.m_txscrolly = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L2 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrolly", 0, __L3))(0, (members.m_txscrolly ?? runtime.member("m_txscrolly")));
    }
  }

  function method_wardner_txlayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_txoffs_w"] ? runtime.overrides["twincobr_txoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_txoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_txoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txoffs ?? runtime.member("m_txoffs")), set: (value: any) => { members.m_txoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_txoffs = ((((members.m_txoffs) % ((members.m_txvideoram_size ?? runtime.member("m_txvideoram_size"))))) | 0);
  }

  function method_wardner_bgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_bgscroll_w"] ? runtime.overrides["twincobr_bgscroll_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgscroll_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_bgscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_bg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((offset) === (0)) ? 1 : 0)) {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgscrollx ?? runtime.member("m_bgscrollx")), set: (value: any) => { members.m_bgscrollx = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, (members.m_bgscrollx ?? runtime.member("m_bgscrollx")));
    } else {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgscrolly ?? runtime.member("m_bgscrolly")), set: (value: any) => { members.m_bgscrolly = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(0, (members.m_bgscrolly ?? runtime.member("m_bgscrolly")));
    }
  }

  function method_wardner_bglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_bgoffs_w"] ? runtime.overrides["twincobr_bgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_bgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgoffs ?? runtime.member("m_bgoffs")), set: (value: any) => { members.m_bgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_bgoffs = ((((members.m_bgoffs) % (runtime.shiftRight((members.m_bgvideoram_size ?? runtime.member("m_bgvideoram_size")), 1)))) | 0);
  }

  function method_wardner_fgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_fgscroll_w"] ? runtime.overrides["twincobr_fgscroll_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgscroll_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_fgscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_fg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((offset) === (0)) ? 1 : 0)) {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgscrollx ?? runtime.member("m_fgscrollx")), set: (value: any) => { members.m_fgscrollx = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrollx", 0, __L1))(0, (members.m_fgscrollx ?? runtime.member("m_fgscrollx")));
    } else {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgscrolly ?? runtime.member("m_fgscrolly")), set: (value: any) => { members.m_fgscrolly = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrolly", 0, __L3))(0, (members.m_fgscrolly ?? runtime.member("m_fgscrolly")));
    }
  }

  function method_wardner_fglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_fgoffs_w"] ? runtime.overrides["twincobr_fgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_fgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgoffs ?? runtime.member("m_fgoffs")), set: (value: any) => { members.m_fgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_fgoffs = ((((members.m_fgoffs) % ((members.m_fgvideoram_size ?? runtime.member("m_fgvideoram_size"))))) | 0);
  }

  function method_wardner_exscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    switch ((offset as number)) {
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
    switch ((runtime.divide(offset, 2) as number)) {
      case 0:
      {
        return runtime.shiftRight((runtime.overrides["twincobr_txram_r"] ? runtime.overrides["twincobr_txram_r"]() : method_twincobr_txram_r(runtime)), shift);
      }
      case 1:
      {
        return runtime.shiftRight((runtime.overrides["twincobr_bgram_r"] ? runtime.overrides["twincobr_bgram_r"]() : method_twincobr_bgram_r(runtime)), shift);
      }
      case 2:
      {
        return runtime.shiftRight((runtime.overrides["twincobr_fgram_r"] ? runtime.overrides["twincobr_fgram_r"]() : method_twincobr_fgram_r(runtime)), shift);
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

    return runtime.readIndex((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), __add_twincobr_bgram_r(runtime, (members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank"))));
  }
  function __add_twincobr_bgram_r(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_twincobr_fgram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs")));
  }

  function method_wardner_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    switch ((runtime.divide(offset, 2) as number)) {
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
    const __L0: any = __l["m_tx_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_twincobr_txram_w(runtime, (members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), (members.m_txoffs ?? runtime.member("m_txoffs"))), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))((members.m_txoffs ?? runtime.member("m_txoffs")));
  }
  function __addr_twincobr_txram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_twincobr_bgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_twincobr_bgram_w(runtime, (members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), __add_twincobr_bgram_w(runtime, (members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(__add_twincobr_bgram_w(runtime, (members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank"))));
  }
  function __add_twincobr_bgram_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_twincobr_bgram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_twincobr_fgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_twincobr_fgram_w(runtime, (members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs"))), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))((members.m_fgoffs ?? runtime.member("m_fgoffs")));
  }
  function __addr_twincobr_fgram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_wardner_bank_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_rom_ram_view.select"], __L1: any = __l["select"], __L2: any = __l["m_rombank.set_entry"], __L3: any = __l["set_entry"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_rom_ram_view, "select", 0, __L1))((((((data) === (0)) ? 1 : 0)) ? (0) : (1)));
    (__L2 ?? runtime.memberCall(members.m_rombank, "set_entry", 0, __L3))(((data) & (7)));
  }

  function method_dsp_host_addr_cb(runtime: any, data: any, seg: any, addr: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    seg.set(((((data) & (57344))) >>> 0));
    addr.set(((((((data) & (2047))) << (1))) >>> 0));
    if (((Number(seg.get()) === Number(24576)) ? 1 : 0)) {
      seg.set(((28672) >>> 0));
    }
  }

  function method_dsp_host_read_cb(runtime: any, seg: any, addr: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["mainspace.read_byte"], __L2: any = __l["read_byte"], __L3: any = __l["machine"], __L4: any = __l["machine().side_effects_disabled"];

    let input_data: any = ((0) & 0xffff);
    switch ((seg as number)) {
      case 28672:
      case 32768:
      case 40960:
      {
        let mainspace: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
        input_data = (((((__L1 ?? runtime.memberCall(mainspace, "read_byte", 0, __L2))(((seg) + (((addr) + (0)))))) | ((((__L1 ?? runtime.memberCall(mainspace, "read_byte", 0, __L2))(((seg) + (((addr) + (1)))))) << (8))))) & 0xffff);
        break;
      }
      default:
      {
        if (((((__L4 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
          0;
        }
        break;
      }
    }
    return input_data;
  }

  function method_dsp_host_write_cb(runtime: any, seg: any, addr: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["mainspace.write_byte"], __L2: any = __l["write_byte"];

    data = ((data) & 0xffff);
    let execute: any = ((0) ? 1 : 0);
    switch ((seg as number)) {
      case 28672:
      {
        if (((((((addr) < (3)) ? 1 : 0)) && ((((data) === (0)) ? 1 : 0))) ? 1 : 0)) {
          execute = ((1) ? 1 : 0);
        }
      }
      case 32768:
      case 40960:
      {
        let mainspace: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
        (__L1 ?? runtime.memberCall(mainspace, "write_byte", 0, __L2))(((seg) + (((addr) + (0)))), ((data) & (255)));
        (__L1 ?? runtime.memberCall(mainspace, "write_byte", 0, __L2))(((seg) + (((addr) + (1)))), ((((data) >>> (8))) & (255)));
        break;
      }
      default:
      {
        0;
        break;
      }
    }
    return execute;
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    members.m_intenable = ((state) ? 1 : 0);
    if (((state) ? 0 : 1)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_flipscreen_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine().tilemap().set_flip_all"];

    ((__L0 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().tilemap().set_flip_all"))?.(((state) ? (3) : (0))) ?? 0);
  }

  function method_bg_ram_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_all_dirty"], __L1: any = __l["mark_all_dirty"];
    let __t0: any;

    members.m_bg_ram_bank = ((((state) ? (4096) : (0))) >>> 0);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
  }

  function method_fg_rom_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_all_dirty"], __L1: any = __l["mark_all_dirty"];
    let __t0: any;

    members.m_fg_rom_bank = ((((state) ? (4096) : (0))) >>> 0);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_all_dirty", 0, __L1))();
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
    const __L0: any = __l["m_maincpu.set_input_line"];

    if ((((state) && ((members.m_intenable ?? runtime.member("m_intenable")))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
  }

  function method_bio_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_dsp_bio ?? runtime.member("m_dsp_bio"));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "wardner_sprite_w": method_wardner_sprite_w,
    "wardner_sprite_r": method_wardner_sprite_r,
    "wardner_txscroll_w": method_wardner_txscroll_w,
    "twincobr_txscroll_w": method_twincobr_txscroll_w,
    "wardner_txlayer_w": method_wardner_txlayer_w,
    "twincobr_txoffs_w": method_twincobr_txoffs_w,
    "wardner_bgscroll_w": method_wardner_bgscroll_w,
    "twincobr_bgscroll_w": method_twincobr_bgscroll_w,
    "wardner_bglayer_w": method_wardner_bglayer_w,
    "twincobr_bgoffs_w": method_twincobr_bgoffs_w,
    "wardner_fgscroll_w": method_wardner_fgscroll_w,
    "twincobr_fgscroll_w": method_twincobr_fgscroll_w,
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
    "dsp_host_read_cb": method_dsp_host_read_cb,
    "dsp_host_write_cb": method_dsp_host_write_cb,
    "int_enable_w": method_int_enable_w,
    "flipscreen_w": method_flipscreen_w,
    "bg_ram_bank_w": method_bg_ram_bank_w,
    "fg_rom_bank_w": method_fg_rom_bank_w,
    "display_on_w": method_display_on_w,
    "log_vram": method_log_vram,
    "wardner_vblank_irq": method_wardner_vblank_irq,
    "bio_r": method_bio_r
  };
  return __methodTable;
})();
    return {
      "wardner_state.wardner_sprite_w": methods["wardner_sprite_w"],
      "wardner_state.wardner_sprite_r": methods["wardner_sprite_r"],
      "wardner_state.wardner_txscroll_w": methods["wardner_txscroll_w"],
      "wardner_state.wardner_txlayer_w": methods["wardner_txlayer_w"],
      "wardner_state.wardner_bgscroll_w": methods["wardner_bgscroll_w"],
      "wardner_state.wardner_bglayer_w": methods["wardner_bglayer_w"],
      "wardner_state.wardner_fgscroll_w": methods["wardner_fgscroll_w"],
      "wardner_state.wardner_fglayer_w": methods["wardner_fglayer_w"],
      "wardner_state.wardner_exscroll_w": methods["wardner_exscroll_w"],
      "wardner_state.wardner_videoram_r": methods["wardner_videoram_r"],
      "wardner_state.wardner_videoram_w": methods["wardner_videoram_w"],
      "wardner_state.wardner_bank_w": methods["wardner_bank_w"],
      "wardner_state.dsp_host_read_cb": methods["dsp_host_read_cb"],
      "wardner_state.dsp_host_write_cb": methods["dsp_host_write_cb"],
      "wardner_state.int_enable_w": methods["int_enable_w"],
      "wardner_state.flipscreen_w": methods["flipscreen_w"],
      "wardner_state.bg_ram_bank_w": methods["bg_ram_bank_w"],
      "wardner_state.fg_rom_bank_w": methods["fg_rom_bank_w"],
      "wardner_state.display_on_w": methods["display_on_w"],
      "wardner_state.wardner_vblank_irq": methods["wardner_vblank_irq"],
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


  function method_wardner_sprite_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram8.live"];
    let __t0: any;

    data = ((data) & 0xff);
    let spriteram16: any = runtime.packedView((__L0 ?? runtime.memberCall(members.m_spriteram8, "live", 0, undefined))(), false); let spriteram16$s: any = undefined, spriteram16$o: any = 0; if (ArrayBuffer.isView(spriteram16) || Array.isArray(spriteram16)) spriteram16$s = spriteram16; else if (spriteram16 !== null && typeof spriteram16 === 'object' && spriteram16.generatedPointer === true && spriteram16.path === undefined && spriteram16.target === undefined && (ArrayBuffer.isView(spriteram16.source) || Array.isArray(spriteram16.source))) { spriteram16$s = spriteram16.source; spriteram16$o = spriteram16.offset; }
    if ((((offset) >>> (0)) & 1)) {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), (((((spriteram16$s !== undefined ? (spriteram16$s[spriteram16$o + (runtime.divide(offset, 2))] ?? 0) : runtime.readIndex(spriteram16, runtime.divide(offset, 2)))) & (255))) | (((data) << (8)))));
    } else {
      runtime.writeIndex(spriteram16, runtime.divide(offset, 2), (((((spriteram16$s !== undefined ? (spriteram16$s[spriteram16$o + (runtime.divide(offset, 2))] ?? 0) : runtime.readIndex(spriteram16, runtime.divide(offset, 2)))) & (65280))) | (data)));
    }
  }

  function method_wardner_sprite_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram8.live"];
    let __t0: any;

    let spriteram16: any = runtime.packedView((__L0 ?? runtime.memberCall(members.m_spriteram8, "live", 0, undefined))(), false); let spriteram16$s: any = undefined, spriteram16$o: any = 0; if (ArrayBuffer.isView(spriteram16) || Array.isArray(spriteram16)) spriteram16$s = spriteram16; else if (spriteram16 !== null && typeof spriteram16 === 'object' && spriteram16.generatedPointer === true && spriteram16.path === undefined && spriteram16.target === undefined && (ArrayBuffer.isView(spriteram16.source) || Array.isArray(spriteram16.source))) { spriteram16$s = spriteram16.source; spriteram16$o = spriteram16.offset; }
    let shift: any = (((((((offset) >>> (0)) & 1)) * (8))) | 0);
    return runtime.shiftRight((spriteram16$s !== undefined ? (spriteram16$s[spriteram16$o + (runtime.divide(offset, 2))] ?? 0) : runtime.readIndex(spriteram16, runtime.divide(offset, 2))), shift);
  }

  function method_wardner_txscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_txscroll_w"] ? runtime.overrides["twincobr_txscroll_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_txscroll_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_txscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_tx_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_tx_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((offset) === (0)) ? 1 : 0)) {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txscrollx ?? runtime.member("m_txscrollx")), set: (value: any) => { members.m_txscrollx = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrollx", 0, __L1))(0, (members.m_txscrollx ?? runtime.member("m_txscrollx")));
    } else {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txscrolly ?? runtime.member("m_txscrolly")), set: (value: any) => { members.m_txscrolly = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L2 ?? runtime.memberCall(members.m_tx_tilemap, "set_scrolly", 0, __L3))(0, (members.m_txscrolly ?? runtime.member("m_txscrolly")));
    }
  }

  function method_wardner_txlayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_txoffs_w"] ? runtime.overrides["twincobr_txoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_txoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_txoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_txoffs ?? runtime.member("m_txoffs")), set: (value: any) => { members.m_txoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_txoffs = ((((members.m_txoffs) % ((members.m_txvideoram_size ?? runtime.member("m_txvideoram_size"))))) | 0);
  }

  function method_wardner_bgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_bgscroll_w"] ? runtime.overrides["twincobr_bgscroll_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgscroll_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_bgscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_bg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((offset) === (0)) ? 1 : 0)) {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgscrollx ?? runtime.member("m_bgscrollx")), set: (value: any) => { members.m_bgscrollx = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, (members.m_bgscrollx ?? runtime.member("m_bgscrollx")));
    } else {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgscrolly ?? runtime.member("m_bgscrolly")), set: (value: any) => { members.m_bgscrolly = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(0, (members.m_bgscrolly ?? runtime.member("m_bgscrolly")));
    }
  }

  function method_wardner_bglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_bgoffs_w"] ? runtime.overrides["twincobr_bgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_bgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_bgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_bgoffs ?? runtime.member("m_bgoffs")), set: (value: any) => { members.m_bgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_bgoffs = ((((members.m_bgoffs) % (runtime.shiftRight((members.m_bgvideoram_size ?? runtime.member("m_bgvideoram_size")), 1)))) | 0);
  }

  function method_wardner_fgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_fgscroll_w"] ? runtime.overrides["twincobr_fgscroll_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgscroll_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_fgscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_fg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((offset) === (0)) ? 1 : 0)) {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgscrollx ?? runtime.member("m_fgscrollx")), set: (value: any) => { members.m_fgscrollx = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrollx", 0, __L1))(0, (members.m_fgscrollx ?? runtime.member("m_fgscrollx")));
    } else {
      runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgscrolly ?? runtime.member("m_fgscrolly")), set: (value: any) => { members.m_fgscrolly = ((value) | 0); } }), offset: 0 }), data, mem_mask);
      (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrolly", 0, __L3))(0, (members.m_fgscrolly ?? runtime.member("m_fgscrolly")));
    }
  }

  function method_wardner_fglayer_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    (runtime.overrides["twincobr_fgoffs_w"] ? runtime.overrides["twincobr_fgoffs_w"](runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))) : method_twincobr_fgoffs_w(runtime, runtime.divide(offset, 2), ((data) << (shift)), ((255) << (shift))));
  }

  function method_twincobr_fgoffs_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => (members.m_fgoffs ?? runtime.member("m_fgoffs")), set: (value: any) => { members.m_fgoffs = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    members.m_fgoffs = ((((members.m_fgoffs) % ((members.m_fgvideoram_size ?? runtime.member("m_fgvideoram_size"))))) | 0);
  }

  function method_wardner_exscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    switch ((offset as number)) {
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
    switch ((runtime.divide(offset, 2) as number)) {
      case 0:
      {
        return runtime.shiftRight((runtime.overrides["twincobr_txram_r"] ? runtime.overrides["twincobr_txram_r"]() : method_twincobr_txram_r(runtime)), shift);
      }
      case 1:
      {
        return runtime.shiftRight((runtime.overrides["twincobr_bgram_r"] ? runtime.overrides["twincobr_bgram_r"]() : method_twincobr_bgram_r(runtime)), shift);
      }
      case 2:
      {
        return runtime.shiftRight((runtime.overrides["twincobr_fgram_r"] ? runtime.overrides["twincobr_fgram_r"]() : method_twincobr_fgram_r(runtime)), shift);
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

    return runtime.readIndex((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), __add_twincobr_bgram_r(runtime, (members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank"))));
  }
  function __add_twincobr_bgram_r(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_twincobr_fgram_r(runtime: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs")));
  }

  function method_wardner_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (0)) & 1)) << (3))) | 0);
    switch ((runtime.divide(offset, 2) as number)) {
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
    const __L0: any = __l["m_tx_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_twincobr_txram_w(runtime, (members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), (members.m_txoffs ?? runtime.member("m_txoffs"))), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))((members.m_txoffs ?? runtime.member("m_txoffs")));
  }
  function __addr_twincobr_txram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_twincobr_bgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_twincobr_bgram_w(runtime, (members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), __add_twincobr_bgram_w(runtime, (members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(__add_twincobr_bgram_w(runtime, (members.m_bgoffs ?? runtime.member("m_bgoffs")), (members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank"))));
  }
  function __add_twincobr_bgram_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_twincobr_bgram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_twincobr_fgram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_twincobr_fgram_w(runtime, (members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), (members.m_fgoffs ?? runtime.member("m_fgoffs"))), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))((members.m_fgoffs ?? runtime.member("m_fgoffs")));
  }
  function __addr_twincobr_fgram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((runtime.readIndex((members.m_bgvideoram16 ?? runtime.member("m_bgvideoram16")), ((tile_index) + ((members.m_bg_ram_bank ?? runtime.member("m_bg_ram_bank")))))) & 0xffff);
    let tile_number: any = ((((code) & (4095))) >>> 0);
    let color: any = ((runtime.shiftRight(((code) & (61440)), 12)) >>> 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(2, tile_number, color, 0);
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((runtime.readIndex((members.m_fgvideoram16 ?? runtime.member("m_fgvideoram16")), tile_index)) & 0xffff);
    let tile_number: any = ((((((code) & (4095))) | ((members.m_fg_rom_bank ?? runtime.member("m_fg_rom_bank"))))) >>> 0);
    let color: any = ((runtime.shiftRight(((code) & (61440)), 12)) >>> 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(1, tile_number, color, 0);
  }

  function method_get_tx_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((runtime.readIndex((members.m_txvideoram16 ?? runtime.member("m_txvideoram16")), tile_index)) & 0xffff);
    let tile_number: any = ((((code) & (2047))) >>> 0);
    let color: any = ((runtime.shiftRight(((code) & (63488)), 11)) >>> 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, tile_number, color, 0);
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    members.m_intenable = ((state) ? 1 : 0);
    if (((state) ? 0 : 1)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_flipscreen_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine().tilemap().set_flip_all"];

    ((__L0 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().tilemap().set_flip_all"))?.(((state) ? (3) : (0))) ?? 0);
  }

  function method_bg_ram_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_all_dirty"], __L1: any = __l["mark_all_dirty"];
    let __t0: any;

    members.m_bg_ram_bank = ((((state) ? (4096) : (0))) >>> 0);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_all_dirty", 0, __L1))();
  }

  function method_fg_rom_bank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_all_dirty"], __L1: any = __l["mark_all_dirty"];
    let __t0: any;

    members.m_fg_rom_bank = ((((state) ? (4096) : (0))) >>> 0);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_all_dirty", 0, __L1))();
  }

  function method_display_on_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_display_on = ((state) ? 1 : 0);
  }

  function method_wardner_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    if ((((state) && ((members.m_intenable ?? runtime.member("m_intenable")))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
  }

  function method_bio_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_dsp_bio ?? runtime.member("m_dsp_bio"));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "wardner_sprite_w": method_wardner_sprite_w,
    "wardner_sprite_r": method_wardner_sprite_r,
    "wardner_txscroll_w": method_wardner_txscroll_w,
    "twincobr_txscroll_w": method_twincobr_txscroll_w,
    "wardner_txlayer_w": method_wardner_txlayer_w,
    "twincobr_txoffs_w": method_twincobr_txoffs_w,
    "wardner_bgscroll_w": method_wardner_bgscroll_w,
    "twincobr_bgscroll_w": method_twincobr_bgscroll_w,
    "wardner_bglayer_w": method_wardner_bglayer_w,
    "twincobr_bgoffs_w": method_twincobr_bgoffs_w,
    "wardner_fgscroll_w": method_wardner_fgscroll_w,
    "twincobr_fgscroll_w": method_twincobr_fgscroll_w,
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
    "get_tx_tile_info": method_get_tx_tile_info,
    "int_enable_w": method_int_enable_w,
    "flipscreen_w": method_flipscreen_w,
    "bg_ram_bank_w": method_bg_ram_bank_w,
    "fg_rom_bank_w": method_fg_rom_bank_w,
    "display_on_w": method_display_on_w,
    "wardner_vblank_irq": method_wardner_vblank_irq,
    "bio_r": method_bio_r
  };
  return __methodTable;
})();
    return {
      "twincobr_state.twincobr_txscroll_w": methods["twincobr_txscroll_w"],
      "twincobr_state.twincobr_txoffs_w": methods["twincobr_txoffs_w"],
      "twincobr_state.twincobr_bgscroll_w": methods["twincobr_bgscroll_w"],
      "twincobr_state.twincobr_bgoffs_w": methods["twincobr_bgoffs_w"],
      "twincobr_state.twincobr_fgscroll_w": methods["twincobr_fgscroll_w"],
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
defined.compiledHandlerLinks = ["m_bg_tilemap.mark_all_dirty","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_fg_tilemap.mark_all_dirty","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_scrollx","m_fg_tilemap.set_scrolly","m_maincpu.set_input_line","m_maincpu.space","m_rom_ram_view.select","m_rombank.set_entry","m_spriteram8.live","m_tx_tilemap.mark_tile_dirty","m_tx_tilemap.set_scrollx","m_tx_tilemap.set_scrolly","machine","machine().side_effects_disabled","machine().tilemap().set_flip_all","mainspace.read_byte","mainspace.write_byte","mark_all_dirty","mark_tile_dirty","read_byte","select","set","set_entry","set_scrollx","set_scrolly","tileinfo.set","write_byte"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
