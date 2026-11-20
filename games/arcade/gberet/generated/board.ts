// GENERATED executable machine composition from src/mame/konami/gberet.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gberet');

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


  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_scroll_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_scrollram ?? runtime.member("m_scrollram")), ((offset) & (63)));
  }

  function method_scroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_scrollram"), ((offset) & (63)), data);
  }

  function method_ctrl_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_irq_cb"], __L1: any = __l["m_firq_cb"], __L2: any = __l["m_nmi_cb"], __L3: any = __l["m_flipscreen_cb"];

    data = ((data) & 0xff);
    offset = ((offset) & (7));
    if ((((offset) === (4)) ? 1 : 0)) {
      if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (1)) & 1)) {
        (__L0 ? __L0(0) : runtime.macro("m_irq_cb", 0));
      }
      if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (2)) & 1)) {
        (__L1 ? __L1(0) : runtime.macro("m_firq_cb", 0));
      }
      if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (0)) & 1)) {
        (__L2 ? __L2(0) : runtime.macro("m_nmi_cb", 0));
      }
      if ((((((data) ^ (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (3)) & 1)) {
        members.m_flipscreen = (((data) >>> (3)) & 1);
        (__L3 ? __L3((((data) >>> (3)) & 1)) : runtime.macro("m_flipscreen_cb", (((data) >>> (3)) & 1)));
      }
    }
    runtime.writeIndex(runtime.writableMember("m_ctrlram"), offset, data);
  }

  function method_sound_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sn.write"];

    data = ((data) & 0xff);
    const h_m_soundlatch = members.m_soundlatch ?? runtime.member("m_soundlatch");
    (__L0 ?? runtime.memberCall(members.m_sn, "write", 0, undefined))(__deref_sound_w(runtime, h_m_soundlatch));
  }
  function __deref_sound_w(runtime: any, p: any): any {
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

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k005849.scroll_r"], __L1: any = __l["m_bg_tilemap.set_scrollx"], __L2: any = __l["set_scrollx"], __L3: any = __l["m_bg_tilemap.draw"], __L4: any = __l["draw"];

    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L1 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L2))(i, (((__L0 ?? runtime.memberCall(members.m_k005849, "scroll_r", 0, undefined))(i)) | ((((((__L0 ?? runtime.memberCall(members.m_k005849, "scroll_r", 0, undefined))(((i) | (32)))) & (1))) << (8)))));
    }
    (__L3 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L4))(screen, bitmap, cliprect, 640, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (__L3 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L4))(screen, bitmap, cliprect, 0, 0);
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k005849.ctrl_r"], __L1: any = __l["flip_screen"], __L2: any = __l["m_gfxdecode.gfx"], __L3: any = __l["m_palette.transpen_mask"];

    const h_m_spriteram2 = members.m_spriteram2 ?? runtime.member("m_spriteram2");
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let sr: any = 0;
    if ((((__L0 ?? runtime.memberCall(members.m_k005849, "ctrl_r", 0, undefined))(3)) & (8))) {
      sr = h_m_spriteram2;
    } else {
      sr = h_m_spriteram;
    }
    for (let offs: any = ((0) | 0); (((offs) < (192)) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
      if (runtime.readIndex(sr, ((offs) + (3)))) {
        let attr: any = ((runtime.readIndex(sr, ((offs) + (1)))) | 0);
        let code: any = ((__add_draw_sprites(runtime, runtime.readIndex(sr, ((offs) + (0))), ((((attr) & (64))) << (2)))) | 0);
        let color: any = ((((attr) & (15))) | 0);
        let sx: any = ((((runtime.readIndex(sr, ((offs) + (2)))) - (((2) * (((attr) & (128))))))) | 0);
        let sy: any = ((runtime.readIndex(sr, ((offs) + (3)))) | 0);
        let flipx: any = ((((attr) & (16))) | 0);
        let flipy: any = ((((attr) & (32))) | 0);
        if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
          sx = ((((240) - (sx))) | 0);
          sy = ((((240) - (sy))) | 0);
          flipx = ((((flipx) ? 0 : 1)) | 0);
          flipy = ((((flipy) ? 0 : 1)) | 0);
        }
        runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__L3 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1)), color, 0));
      }
    }
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_draw_sprites(runtime: any, p: any): any {
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

  function method_ctrl_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), ((offset) & (7)));
  }

  function method_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["rgb_t"], __L2: any = __l["palette.set_indirect_color"], __L3: any = __l["set_indirect_color"], __L4: any = __l["palette.set_pen_indirect"], __L5: any = __l["set_pen_indirect"];
    let __t0: any;

    let color_prom: any = (__t0 = __deref_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let bit0: any = (((((runtime.readIndex(color_prom, i)) >>> (0)) & 1)) | 0);
      let bit1: any = (((((runtime.readIndex(color_prom, i)) >>> (1)) & 1)) | 0);
      let bit2: any = (((((runtime.readIndex(color_prom, i)) >>> (2)) & 1)) | 0);
      let r: any = ((__add_palette(runtime, __add_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
      bit0 = (((((runtime.readIndex(color_prom, i)) >>> (3)) & 1)) | 0);
      bit1 = (((((runtime.readIndex(color_prom, i)) >>> (4)) & 1)) | 0);
      bit2 = (((((runtime.readIndex(color_prom, i)) >>> (5)) & 1)) | 0);
      let g: any = ((__add_palette(runtime, __add_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
      bit0 = (((((runtime.readIndex(color_prom, i)) >>> (6)) & 1)) | 0);
      bit1 = (((((runtime.readIndex(color_prom, i)) >>> (7)) & 1)) | 0);
      let b: any = ((__add_palette(runtime, ((82) * (bit0)), ((173) * (bit1)))) | 0);
      (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
    color_prom = __add_palette(runtime, color_prom, 32);
    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let ctabentry: any = ((((((runtime.readIndex(color_prom, i)) & (15))) | (16))) & 0xff);
      (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(i, ctabentry);
    }
    for (let i: any = ((256) | 0); (((i) < (512)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let ctabentry: any = ((((runtime.readIndex(color_prom, i)) & (15))) & 0xff);
      (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(i, ctabentry);
    }
  }
  function __add_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_palette(runtime: any, p: any): any {
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
    "colorram_w": method_colorram_w,
    "videoram_w": method_videoram_w,
    "scroll_r": method_scroll_r,
    "scroll_w": method_scroll_w,
    "ctrl_w": method_ctrl_w,
    "sound_w": method_sound_w,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "ctrl_r": method_ctrl_r,
    "palette": method_palette
  };
  return __methodTable;
})();
    return {
      "gberet_state.colorram_w": methods["colorram_w"],
      "gberet_state.videoram_w": methods["videoram_w"],
      "gberet_state.sound_w": methods["sound_w"],
      "gberet_state.screen_update": methods["screen_update"],
      "gberet_state.draw_sprites": methods["draw_sprites"],
      "gberet_state.palette": methods["palette"],
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


  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_scroll_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_scrollram ?? runtime.member("m_scrollram")), ((offset) & (63)));
  }

  function method_scroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_scrollram"), ((offset) & (63)), data);
  }

  function method_ctrl_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_irq_cb"], __L1: any = __l["m_firq_cb"], __L2: any = __l["m_nmi_cb"], __L3: any = __l["m_flipscreen_cb"];

    data = ((data) & 0xff);
    offset = ((offset) & (7));
    if ((((offset) === (4)) ? 1 : 0)) {
      if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (1)) & 1)) {
        (__L0 ? __L0(0) : runtime.macro("m_irq_cb", 0));
      }
      if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (2)) & 1)) {
        (__L1 ? __L1(0) : runtime.macro("m_firq_cb", 0));
      }
      if (((((((~data)) & (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (0)) & 1)) {
        (__L2 ? __L2(0) : runtime.macro("m_nmi_cb", 0));
      }
      if ((((((data) ^ (runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), 4)))) >>> (3)) & 1)) {
        members.m_flipscreen = (((data) >>> (3)) & 1);
        (__L3 ? __L3((((data) >>> (3)) & 1)) : runtime.macro("m_flipscreen_cb", (((data) >>> (3)) & 1)));
      }
    }
    runtime.writeIndex(runtime.writableMember("m_ctrlram"), offset, data);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["TILE_FLIPYX"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];

    let attr: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
    let code: any = ((__add_get_bg_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((attr) & (64))) << (2)))) | 0);
    let color: any = ((((attr) & (15))) | 0);
    let flags: any = (((__L0 ? __L0(runtime.shiftRight(((attr) & (48)), 4)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (48)), 4)))) | 0);
    tileinfo.group = color;
    tileinfo.category = runtime.shiftRight(((attr) & (128)), 7);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, code, color, flags);
  }
  function __add_get_bg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k005849.scroll_r"], __L1: any = __l["m_bg_tilemap.set_scrollx"], __L2: any = __l["set_scrollx"], __L3: any = __l["m_bg_tilemap.draw"], __L4: any = __l["draw"];

    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L1 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L2))(i, (((__L0 ?? runtime.memberCall(members.m_k005849, "scroll_r", 0, undefined))(i)) | ((((((__L0 ?? runtime.memberCall(members.m_k005849, "scroll_r", 0, undefined))(((i) | (32)))) & (1))) << (8)))));
    }
    (__L3 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L4))(screen, bitmap, cliprect, 640, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (__L3 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L4))(screen, bitmap, cliprect, 0, 0);
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k005849.ctrl_r"], __L1: any = __l["flip_screen"], __L2: any = __l["m_gfxdecode.gfx"], __L3: any = __l["m_palette.transpen_mask"];

    const h_m_spriteram2 = members.m_spriteram2 ?? runtime.member("m_spriteram2");
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let sr: any = 0;
    if ((((__L0 ?? runtime.memberCall(members.m_k005849, "ctrl_r", 0, undefined))(3)) & (8))) {
      sr = h_m_spriteram2;
    } else {
      sr = h_m_spriteram;
    }
    for (let offs: any = ((0) | 0); (((offs) < (192)) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
      if (runtime.readIndex(sr, ((offs) + (3)))) {
        let attr: any = ((runtime.readIndex(sr, ((offs) + (1)))) | 0);
        let code: any = ((__add_draw_sprites(runtime, runtime.readIndex(sr, ((offs) + (0))), ((((attr) & (64))) << (2)))) | 0);
        let color: any = ((((attr) & (15))) | 0);
        let sx: any = ((((runtime.readIndex(sr, ((offs) + (2)))) - (((2) * (((attr) & (128))))))) | 0);
        let sy: any = ((runtime.readIndex(sr, ((offs) + (3)))) | 0);
        let flipx: any = ((((attr) & (16))) | 0);
        let flipy: any = ((((attr) & (32))) | 0);
        if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
          sx = ((((240) - (sx))) | 0);
          sy = ((((240) - (sy))) | 0);
          flipx = ((((flipx) ? 0 : 1)) | 0);
          flipy = ((((flipy) ? 0 : 1)) | 0);
        }
        runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__L3 ?? runtime.memberCall(members.m_palette, "transpen_mask", 0, undefined))(__deref_draw_sprites(runtime, (__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1)), color, 0));
      }
    }
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_draw_sprites(runtime: any, p: any): any {
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

  function method_ctrl_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_ctrlram ?? runtime.member("m_ctrlram")), ((offset) & (7)));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "colorram_w": method_colorram_w,
    "videoram_w": method_videoram_w,
    "scroll_r": method_scroll_r,
    "scroll_w": method_scroll_w,
    "ctrl_w": method_ctrl_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "ctrl_r": method_ctrl_r
  };
  return __methodTable;
})();
    return {
      "gberet_base_state.get_bg_tile_info": methods["get_bg_tile_info"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","draw","flip_screen","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_firq_cb","m_flipscreen_cb","m_gfxdecode.gfx","m_irq_cb","m_k005849.ctrl_r","m_k005849.scroll_r","m_nmi_cb","m_palette.transpen_mask","m_sn.write","mark_tile_dirty","memregion","palette.set_indirect_color","palette.set_pen_indirect","rgb_t","set","set_indirect_color","set_pen_indirect","set_scrollx","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
