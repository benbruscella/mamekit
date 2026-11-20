// GENERATED executable machine composition from src/mame/dataeast/btime.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'btime');

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


  function method_btime_mirrorvideoram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_btime_mirrorvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
  }

  function method_btime_mirrorcolorram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    return runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offset);
  }

  function method_btime_mirrorcolorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let x: any = ((runtime.divide(offset, 32)) | 0);
    let y: any = ((((offset) % (32))) | 0);
    offset = ((((32) * (y))) + (x));
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
  }

  function method_btime_video_control_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"];

    data = ((data) & 0xff);
    (__L0 ? __L0(((data) & (1))) : runtime.macro("flip_screen_set", ((data) & (1))));
  }

  function method_bnj_scroll_w_0(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_bnj_scroll"), 0, data);
  }

  function method_audio_nmi_enable_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audionmi.in_w_0"];

    data = ((data) & 0xff);
    const h_m_audio_nmi_enable_type = members.m_audio_nmi_enable_type ?? runtime.member("m_audio_nmi_enable_type");
    if (((Number(h_m_audio_nmi_enable_type) === Number(0)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_audionmi, "in_w_0", 0, undefined))((((data) >>> (0)) & 1));
    }
  }

  function method_audio_nmi_gen(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audionmi.in_w_1"];

    let scanline: any = ((param) | 0);
    (__L0 ?? runtime.memberCall(members.m_audionmi, "in_w_1", 0, undefined))(runtime.shiftRight(((scanline) & (8)), 3));
  }

  function method_screen_update_btime(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"];

    if (((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 0)) & (16))) {
      let start: any = ((0) | 0);
      if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
        start = ((0) | 0);
      } else {
        start = ((1) | 0);
      }
      for (let i: any = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        runtime.writeIndex(runtime.writableMember("m_btime_tilemap"), i, ((start) | (((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 0)) & (4)))));
        start = ((((((start) + (1))) & (3))) | 0);
      }
      (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, (members.m_btime_tilemap ?? runtime.member("m_btime_tilemap")), 0) : method_draw_background(runtime, bitmap, cliprect, (members.m_btime_tilemap ?? runtime.member("m_btime_tilemap")), 0));
      (runtime.overrides["draw_chars"] ? runtime.overrides["draw_chars"](bitmap, cliprect, 1, 0, -1) : method_draw_chars(runtime, bitmap, cliprect, 1, 0, -1));
    } else {
      (runtime.overrides["draw_chars"] ? runtime.overrides["draw_chars"](bitmap, cliprect, 0, 0, -1) : method_draw_chars(runtime, bitmap, cliprect, 0, 0, -1));
    }
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 0, 1, 0, (members.m_videoram ?? runtime.member("m_videoram")), 32) : method_draw_sprites(runtime, bitmap, cliprect, 0, 1, 0, (members.m_videoram ?? runtime.member("m_videoram")), 32));
    return 0;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any, tmap: any, color: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"], __L1: any = __l["m_gfxdecode.gfx"];

    color = ((color) & 0xff);
    const h_m_bg_map = members.m_bg_map ?? runtime.member("m_bg_map");
    let scroll: any = (((-((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 1)) | (((((runtime.readIndex((members.m_bnj_scroll ?? runtime.member("m_bnj_scroll")), 0)) & (3))) << (8)))))) | 0);
    for (let i: any = ((0) | 0); (((i) < (5)) ? 1 : 0); i = ((((i) + (1))) | 0), scroll = ((((scroll) + (256))) | 0)) {
      let tileoffset: any = ((runtime.readIndex(tmap, ((i) & (3)))) * (256));
      if ((((scroll) > (256)) ? 1 : 0)) {
        break;
      }
      if (((Number(scroll) < Number(-256)) ? 1 : 0)) {
        continue;
      }
      for (let offs: any = 0; (((offs) < (256)) ? 1 : 0); offs = ((offs) + (1))) {
        let x: any = ((((((240) - (((((16) * (runtime.divide(offs, 16)))) + (scroll))))) - (1))) | 0);
        let y: any = ((((16) * (((offs) % (16))))) | 0);
        if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
          x = ((((240) - (x))) | 0);
          y = ((((240) - (y))) | 0);
        }
        runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "opaque", 0, undefined)(bitmap, cliprect, runtime.readIndex(h_m_bg_map, ((tileoffset) + (offs))), color, (__L0 ? __L0() : runtime.macro("flip_screen")), (__L0 ? __L0() : runtime.macro("flip_screen")), x, y);
      }
    }
  }

  function method_draw_chars(runtime: any, bitmap: any, cliprect: any, transparency: any, color: any, priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"], __L1: any = __l["m_gfxdecode.gfx"];

    transparency = ((transparency) & 0xff);
    color = ((color) & 0xff);
    for (let offs: any = 0; ((Number(offs) < Number(runtime.container(members.m_videoram, "bytes"))) ? 1 : 0); offs = ((offs) + (1))) {
      let x: any = ((((31) - (runtime.divide(offs, 32)))) & 0xff);
      let y: any = ((((offs) % (32))) & 0xff);
      let code: any = ((__add_draw_chars(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs), ((256) * (((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offs)) & (3)))))) & 0xffff);
      if ((((((Number(priority) !== Number(-1)) ? 1 : 0)) && (((Number(priority) !== Number(((((code) >>> (7))) & (1)))) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
        x = ((((31) - (x))) & 0xff);
        y = ((((31) - (y))) & 0xff);
      }
      runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, code, color, (__L0 ? __L0() : runtime.macro("flip_screen")), (__L0 ? __L0() : runtime.macro("flip_screen")), ((8) * (x)), ((8) * (y)), ((transparency) ? (0) : (-1)));
    }
  }
  function __add_draw_chars(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, color: any, sprite_y_adjust: any, sprite_y_adjust_flip_screen: any, sprite_ram: any, interleave: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"], __L1: any = __l["m_gfxdecode.gfx"];

    color = ((color) & 0xff);
    sprite_y_adjust = ((sprite_y_adjust) & 0xff);
    sprite_y_adjust_flip_screen = ((sprite_y_adjust_flip_screen) & 0xff);
    for (let i: any = ((0) | 0), offs: any = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0), offs = ((((offs) + (((4) * (interleave))))) | 0)) {
      if (((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (1))) ? 0 : 1)) {
        continue;
      }
      let x: any = ((((240) - (runtime.readIndex(sprite_ram, ((offs) + (((3) * (interleave)))))))) | 0);
      let y: any = ((((240) - (runtime.readIndex(sprite_ram, ((offs) + (((2) * (interleave)))))))) | 0);
      let flipx: any = ((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (4))) & 0xff);
      let flipy: any = ((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (2))) & 0xff);
      if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
        x = ((((240) - (x))) | 0);
        y = ((((((240) - (y))) + (sprite_y_adjust_flip_screen))) | 0);
        flipx = ((((flipx) ? 0 : 1)) & 0xff);
        flipy = ((((flipy) ? 0 : 1)) & 0xff);
      }
      y = ((((y) - (sprite_y_adjust))) | 0);
      runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, runtime.readIndex(sprite_ram, ((offs) + (interleave))), color, flipx, flipy, x, y, 0);
      y = ((((y) + ((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (-256) : (256))))) | 0);
      runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, runtime.readIndex(sprite_ram, ((offs) + (interleave))), color, flipx, flipy, x, y, 0);
    }
  }

  function method_ay_audio_nmi_enable_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audionmi.in_w_0"];

    data = ((data) & 0xff);
    const h_m_audio_nmi_enable_type = members.m_audio_nmi_enable_type ?? runtime.member("m_audio_nmi_enable_type");
    if (((Number(h_m_audio_nmi_enable_type) === Number(1)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_audionmi, "in_w_0", 0, undefined))(((((~data)) >>> (0)) & 1));
    }
  }

  function method_btime_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["palette.entries"], __L2: any = __l["entries"], __L3: any = __l["rgb_t"], __L4: any = __l["palette.set_pen_color"], __L5: any = __l["set_pen_color"];
    let __t0: any, __t1: any;

    if ((((__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))) ? 0 : 1)) {
      return;
    }
    let color_prom: any = (__t0 = __deref_btime_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base")); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    for (let i: any = ((0) | 0); ((Number(i) < Number((__L1 ?? runtime.memberCall(palette, "entries", 0, __L2))())) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let bit0: any = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 0)) & (1))) | 0);
      let bit1: any = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 1)) & (1))) | 0);
      let bit2: any = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 2)) & (1))) | 0);
      let r: any = ((__add_btime_palette(runtime, __add_btime_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
      bit0 = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 3)) & (1))) | 0);
      bit1 = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 4)) & (1))) | 0);
      bit2 = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 5)) & (1))) | 0);
      let g: any = ((__add_btime_palette(runtime, __add_btime_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
      bit0 = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 6)) & (1))) | 0);
      bit1 = ((((runtime.shiftRight((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i)), 7)) & (1))) | 0);
      let b: any = ((__add_btime_palette(runtime, ((82) * (bit0)), ((173) * (bit1)))) | 0);
      (__L4 ?? runtime.memberCall(palette, "set_pen_color", 0, __L5))(i, (__L3 ? __L3(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
  }
  function __add_btime_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_btime_palette(runtime: any, p: any): any {
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
    "btime_mirrorvideoram_r": method_btime_mirrorvideoram_r,
    "btime_mirrorvideoram_w": method_btime_mirrorvideoram_w,
    "btime_mirrorcolorram_r": method_btime_mirrorcolorram_r,
    "btime_mirrorcolorram_w": method_btime_mirrorcolorram_w,
    "btime_video_control_w": method_btime_video_control_w,
    "bnj_scroll_w_0": method_bnj_scroll_w_0,
    "audio_nmi_enable_w": method_audio_nmi_enable_w,
    "audio_nmi_gen": method_audio_nmi_gen,
    "screen_update_btime": method_screen_update_btime,
    "draw_background": method_draw_background,
    "draw_chars": method_draw_chars,
    "draw_sprites": method_draw_sprites,
    "ay_audio_nmi_enable_w": method_ay_audio_nmi_enable_w,
    "btime_palette": method_btime_palette
  };
  return __methodTable;
})();
    return {
      "btime_state.btime_mirrorvideoram_r": methods["btime_mirrorvideoram_r"],
      "btime_state.btime_mirrorvideoram_w": methods["btime_mirrorvideoram_w"],
      "btime_state.btime_mirrorcolorram_r": methods["btime_mirrorcolorram_r"],
      "btime_state.btime_mirrorcolorram_w": methods["btime_mirrorcolorram_w"],
      "btime_state.btime_video_control_w": methods["btime_video_control_w"],
      "btime_state.bnj_scroll_w_0": methods["bnj_scroll_w_0"],
      "btime_state.audio_nmi_enable_w": methods["audio_nmi_enable_w"],
      "btime_state.audio_nmi_gen": methods["audio_nmi_gen"],
      "btime_state.screen_update_btime": methods["screen_update_btime"],
      "btime_state.draw_background": methods["draw_background"],
      "btime_state.draw_chars": methods["draw_chars"],
      "btime_state.draw_sprites": methods["draw_sprites"],
      "btime_state.ay_audio_nmi_enable_w": methods["ay_audio_nmi_enable_w"],
      "btime_state.btime_palette": methods["btime_palette"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["entries","flip_screen","flip_screen_set","m_audionmi.in_w_0","m_audionmi.in_w_1","m_gfxdecode.gfx","memregion","palette.entries","palette.set_pen_color","rgb_t","set_pen_color"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
