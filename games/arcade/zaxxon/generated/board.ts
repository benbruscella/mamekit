// GENERATED executable machine composition from src/mame/sega/zaxxon.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'zaxxon');

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


  function method_zaxxon_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_bg_position_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if ((((offset) === (0)) ? 1 : 0)) {
      members.m_bg_position = (((((((members.m_bg_position ?? runtime.member("m_bg_position"))) & (1792))) | (((((data) << (0))) & (255))))) & 0xffff);
    } else {
      members.m_bg_position = (((((((members.m_bg_position ?? runtime.member("m_bg_position"))) & (255))) | (((((data) << (8))) & (1792))))) & 0xffff);
    }
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];
    let __t0: any;

    let source: any = (__t0 = __deref_get_bg_tile_info(runtime, (__L0 ? __L0("tilemap_dat") : runtime.macro("memregion", "tilemap_dat"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("tilemap_dat") : runtime.macro("memregion", "tilemap_dat")), "base")); let source$s: any = undefined, source$o: any = 0; if (ArrayBuffer.isView(source) || Array.isArray(source)) source$s = source; else if (source !== null && typeof source === 'object' && source.generatedPointer === true && source.path === undefined && source.target === undefined && (ArrayBuffer.isView(source.source) || Array.isArray(source.source))) { source$s = source.source; source$o = source.offset; }
    let size: any = ((runtime.divide(runtime.container((__L0 ? __L0("tilemap_dat") : runtime.macro("memregion", "tilemap_dat")), "bytes"), 2)) | 0);
    let eff_index: any = ((((tile_index) & (((size) - (1))))) | 0);
    let code: any = ((__add_get_bg_tile_info(runtime, (source$s !== undefined ? (source$s[source$o + (eff_index)] ?? 0) : runtime.readIndex(source, eff_index)), ((256) * ((((source$s !== undefined ? (source$s[source$o + (((eff_index) + (size)))] ?? 0) : runtime.readIndex(source, ((eff_index) + (size))))) & (3)))))) | 0);
    let color: any = ((runtime.shiftRight((source$s !== undefined ? (source$s[source$o + (((eff_index) + (size)))] ?? 0) : runtime.readIndex(source, ((eff_index) + (size)))), 4)) | 0);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(1, code, color, 0);
  }
  function __add_get_bg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_get_bg_tile_info(runtime: any, p: any): any {
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

  function method_zaxxon_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let sx: any = ((((tile_index) % (32))) | 0);
    let sy: any = ((runtime.divide(tile_index, 32)) | 0);
    let code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
    let color: any = ((((runtime.readIndex((members.m_color_codes ?? runtime.member("m_color_codes")), ((sx) + (((32) * (runtime.divide(sy, 4))))))) & (15))) | 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, ((color) * (2)), 0);
  }

  function method_zaxxon_sound_a_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.set_volume"], __L1: any = __l["m_samples.start"], __L2: any = __l["m_samples.stop"];

    data = ((data) & 0xff);
    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 0)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 0, data);
    (__L0 ?? runtime.memberCall(members.m_samples, "set_volume", 0, undefined))(10, __add_zaxxon_sound_a_w(runtime, 0.5, ((0.157) * (((data) & (3))))));
    (__L0 ?? runtime.memberCall(members.m_samples, "set_volume", 0, undefined))(11, __add_zaxxon_sound_a_w(runtime, 0.5, ((0.157) * (((data) & (3))))));
    if ((((((diff) & (4))) && (((((data) & (4))) ? 0 : 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(10, 10, 1);
    }
    if ((((((diff) & (4))) && (((data) & (4)))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(10);
    }
    if ((((((diff) & (8))) && (((((data) & (8))) ? 0 : 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(11, 11, 1);
    }
    if ((((((diff) & (8))) && (((data) & (8)))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(11);
    }
    if ((((((diff) & (16))) && (((((data) & (16))) ? 0 : 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 0, 1);
    }
    if ((((((diff) & (16))) && (((data) & (16)))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(0);
    }
    if ((((((diff) & (32))) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(1, 1);
    }
    if ((((((diff) & (64))) && (((((data) & (64))) ? 0 : 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(2, 2, 1);
    }
    if ((((((diff) & (64))) && (((data) & (64)))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(2);
    }
    if ((((((diff) & (128))) && (((((data) & (128))) ? 0 : 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(3, 3, 1);
    }
    if ((((((diff) & (128))) && (((data) & (128)))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(3);
    }
  }
  function __add_zaxxon_sound_a_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_zaxxon_sound_b_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"], __L1: any = __l["m_samples.playing"];

    data = ((data) & 0xff);
    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 1)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 1, data);
    if ((((((diff) & (16))) && (((((data) & (16))) ? 0 : 1))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(4, 4);
    }
    if (((((((((diff) & (32))) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) && ((((__L1 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(5)) ? 0 : 1))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(5, 5);
    }
    if ((((((diff) & (128))) && (((((data) & (128))) ? 0 : 1))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(6, 6);
    }
  }

  function method_zaxxon_sound_c_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"], __L1: any = __l["m_samples.playing"];

    data = ((data) & 0xff);
    let diff: any = ((((data) ^ (runtime.readIndex((members.m_sound_state ?? runtime.member("m_sound_state")), 2)))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_sound_state"), 2, data);
    if ((((((diff) & (1))) && (((((data) & (1))) ? 0 : 1))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(7, 7);
    }
    if ((((((diff) & (4))) && (((((data) & (4))) ? 0 : 1))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(8, 8);
    }
    if (((((((((diff) & (8))) && (((((data) & (8))) ? 0 : 1))) ? 1 : 0)) && ((((__L1 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(9)) ? 0 : 1))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(9, 9);
    }
  }

  function method_flipscreen_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.set_flip"], __L1: any = __l["set_flip"];

    members.m_flip_screen = ((((state) ? 0 : 1)) ? 1 : 0);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "set_flip", 0, __L1))((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (3) : (0)));
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    members.m_int_enabled = ((state) & 0xff);
    if ((((members.m_int_enabled ?? runtime.member("m_int_enabled"))) ? 0 : 1)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_fg_color_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.set_palette_offset"], __L1: any = __l["set_palette_offset"];

    members.m_fg_color = ((((state) * (128))) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "set_palette_offset", 0, __L1))(__add_fg_color_w(runtime, (members.m_fg_color ?? runtime.member("m_fg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8))));
  }
  function __add_fg_color_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_bg_color_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_bg_color = ((((state) * (128))) & 0xff);
  }

  function method_bg_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_bg_enable = ((state) & 0xff);
  }

  function method_screen_update_zaxxon(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.draw"], __L1: any = __l["draw"];

    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bitmap, cliprect, 1) : method_draw_background(runtime, bitmap, cliprect, 1));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 320, 384) : method_draw_sprites(runtime, bitmap, cliprect, 320, 384));
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
    return 0;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any, skew: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.pixmap"], __L1: any = __l["pixmap"], __L2: any = __l["pixmap.width"], __L3: any = __l["width"], __L4: any = __l["pixmap.height"], __L5: any = __l["height"], __L6: any = __l["m_palette.black_pen"], __L7: any = __l["bitmap.fill"], __L8: any = __l["fill"];
    let __t0: any, __t1: any, __t2: any, __t3: any;

    if ((members.m_bg_enable ?? runtime.member("m_bg_enable"))) {
      let pixmap: any = (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "pixmap", 0, __L1))();
      let colorbase: any = ((__add_draw_background(runtime, (members.m_bg_color ?? runtime.member("m_bg_color")), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (8)))) | 0);
      let xmask: any = ((runtime.subtract((__L2 ?? runtime.memberCall(pixmap, "width", 0, __L3))(), 1)) | 0);
      let ymask: any = ((runtime.subtract((__L4 ?? runtime.memberCall(pixmap, "height", 0, __L5))(), 1)) | 0);
      let flipmask: any = (((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (255) : (0))) | 0);
      let flipoffs: any = (((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? (56) : (64))) | 0);
      if ((((members.m_flip_screen ?? runtime.member("m_flip_screen"))) ? 0 : 1)) {
        flipoffs = ((((flipoffs) - (1))) | 0);
      } else {
        flipoffs = ((((flipoffs) + (7))) | 0);
      }
      for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let dst: any = bitmap["pix&"](y); let dst$s: any = undefined, dst$o: any = 0; if (ArrayBuffer.isView(dst) || Array.isArray(dst)) dst$s = dst; else if (dst !== null && typeof dst === 'object' && dst.generatedPointer === true && dst.path === undefined && dst.target === undefined && (ArrayBuffer.isView(dst.source) || Array.isArray(dst.source))) { dst$s = dst.source; dst$o = dst.offset; }
        let vf: any = ((((y) ^ (flipmask))) | 0);
        let srcy: any = ((__add_draw_background(runtime, ((vf) + ((((((members.m_bg_position ?? runtime.member("m_bg_position"))) << (1))) ^ (4095)))), 1)) | 0);
        let src: any = pixmap["pix&"](((srcy) & (ymask))); let src$s: any = undefined, src$o: any = 0; if (ArrayBuffer.isView(src) || Array.isArray(src)) src$s = src; else if (src !== null && typeof src === 'object' && src.generatedPointer === true && src.path === undefined && src.target === undefined && (ArrayBuffer.isView(src.source) || Array.isArray(src.source))) { src$s = src.source; src$o = src.offset; }
        for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          let srcx: any = ((((x) ^ (flipmask))) | 0);
          if (skew) {
            srcx = ((((srcx) + (__add_draw_background(runtime, ((runtime.shiftRight(vf, 1)) ^ (255)), 1)))) | 0);
            srcx = ((((srcx) + (flipoffs))) | 0);
          }
          runtime.writeIndex(dst, x, (((src$s !== undefined ? (src$s[src$o + (((srcx) & (xmask)))] ?? 0) : runtime.readIndex(src, ((srcx) & (xmask))))) + (colorbase)));
        }
      }
    } else {
      (__L7 ?? runtime.memberCall(bitmap, "fill", 0, __L8))((__L6 ?? runtime.memberCall(members.m_palette, "black_pen", 0, undefined))(), cliprect);
    }
  }
  function __add_draw_background(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, flipxmask: any, flipymask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"], __L1: any = __l["gfx.transpen"], __L2: any = __l["transpen"];

    flipxmask = ((flipxmask) & 0xffff);
    flipymask = ((flipymask) & 0xffff);
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let spriteram: any = h_m_spriteram; let spriteram$s: any = undefined, spriteram$o: any = 0; if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram)) spriteram$s = spriteram; else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) { spriteram$s = spriteram.source; spriteram$o = spriteram.offset; }
    let gfx: any = (__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2); let gfx$s: any = undefined, gfx$o: any = 0; if (ArrayBuffer.isView(gfx) || Array.isArray(gfx)) gfx$s = gfx; else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) { gfx$s = gfx.source; gfx$o = gfx.offset; }
    let flip: any = (((members.m_flip_screen ?? runtime.member("m_flip_screen"))) | 0);
    let flipmask: any = ((((flip) ? (255) : (0))) | 0);
    let offs: any = ((0) | 0);
    for (offs = ((124) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      let sy: any = (((runtime.overrides["find_minimum_y"] ? runtime.overrides["find_minimum_y"]((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs)), flip) : method_find_minimum_y(runtime, (spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs)), flip))) | 0);
      let flipy: any = (((((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (((flipymask) >>> (8)))))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (((flipymask) >>> (8))))))) ^ (flipmask))) & (flipymask))) | 0);
      let flipx: any = (((((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (((flipxmask) >>> (8)))))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (((flipxmask) >>> (8))))))) ^ (flipmask))) & (flipxmask))) | 0);
      let code: any = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) | 0);
      let color: any = ((__add_draw_sprites(runtime, (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) & (31)), (((members.m_congo_color_bank ?? runtime.member("m_congo_color_bank"))) << (5)))) | 0);
      let sx: any = (((runtime.overrides["find_minimum_x"] ? runtime.overrides["find_minimum_x"]((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (3)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (3)))), flip) : method_find_minimum_x(runtime, (spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (3)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (3)))), flip))) | 0);
      (__L1 ?? runtime.memberCall(gfx, "transpen", 0, __L2))(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0);
      (__L1 ?? runtime.memberCall(gfx, "transpen", 0, __L2))(bitmap, cliprect, code, color, flipx, flipy, sx, ((sy) - (256)), 0);
      (__L1 ?? runtime.memberCall(gfx, "transpen", 0, __L2))(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), sy, 0);
      (__L1 ?? runtime.memberCall(gfx, "transpen", 0, __L2))(bitmap, cliprect, code, color, flipx, flipy, ((sx) - (256)), ((sy) - (256)), 0);
    }
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_find_minimum_y(runtime: any, value: any, flip: any): any {
    const members = runtime.members;

    value = ((value) & 0xff);
    let flipmask: any = ((((flip) ? (255) : (0))) | 0);
    let flipconst: any = ((((flip) ? (239) : (241))) | 0);
    let y: any = ((0) | 0);
    for (y = ((0) | 0); (((y) < (256)) ? 1 : 0); y = ((((y) + (16))) | 0)) {
      let sum: any = ((__add_find_minimum_y(runtime, __add_find_minimum_y(runtime, ((value) + (flipconst)), 1), ((y) ^ (flipmask)))) | 0);
      if (((Number(((sum) & (224))) === Number(224)) ? 1 : 0)) {
        break;
      }
    }
    while (1) {
      let sum: any = ((__add_find_minimum_y(runtime, __add_find_minimum_y(runtime, ((value) + (flipconst)), 1), ((((y) - (1))) ^ (flipmask)))) | 0);
      if (((Number(((sum) & (224))) !== Number(224)) ? 1 : 0)) {
        break;
      }
      y = ((((y) - (1))) | 0);
    }
    return ((((y) + (1))) & (255));
  }
  function __add_find_minimum_y(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_find_minimum_x(runtime: any, value: any, flip: any): any {
    const members = runtime.members;

    value = ((value) & 0xff);
    let flipmask: any = ((((flip) ? (255) : (0))) | 0);
    let x: any = ((0) | 0);
    x = ((((__add_find_minimum_x(runtime, ((value) + (239)), 1)) ^ (flipmask))) | 0);
    if (flipmask) {
      x = ((((x) - (31))) | 0);
    }
    return ((x) & (255));
  }
  function __add_find_minimum_x(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_vblank_int(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    if ((((state) && ((members.m_int_enabled ?? runtime.member("m_int_enabled")))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
  }

  function method_zaxxon_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["palette.entries"], __L2: any = __l["entries"], __L3: any = __l["rgb_t"], __L4: any = __l["palette.set_pen_color"], __L5: any = __l["set_pen_color"];
    let __t0: any, __t1: any;

    let color_prom: any = (__t0 = __deref_zaxxon_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base")); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    let resistances: any = [1000, 470, 220];
    let rweights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let gweights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let bweights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, __addr_zaxxon_palette(runtime, resistances, 0), rweights, 470, 0, 3, __addr_zaxxon_palette(runtime, resistances, 0), gweights, 470, 0, 2, __addr_zaxxon_palette(runtime, resistances, 1), bweights, 470, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, __addr_zaxxon_palette(runtime, resistances, 0), rweights, 470, 0, 3, __addr_zaxxon_palette(runtime, resistances, 0), gweights, 470, 0, 2, __addr_zaxxon_palette(runtime, resistances, 1), bweights, 470, 0));
    for (let i: any = ((0) | 0); ((Number(i) < Number((__L1 ?? runtime.memberCall(palette, "entries", 0, __L2))())) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let bit0: any = ((0) | 0);
      let bit1: any = ((0) | 0);
      let bit2: any = ((0) | 0);
      bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (0)) & 1)) | 0);
      bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (1)) & 1)) | 0);
      bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (2)) & 1)) | 0);
      let r: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](rweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, rweights, bit0, bit1, bit2))) | 0);
      bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (3)) & 1)) | 0);
      bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (4)) & 1)) | 0);
      bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (5)) & 1)) | 0);
      let g: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](gweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, gweights, bit0, bit1, bit2))) | 0);
      bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (6)) & 1)) | 0);
      bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (7)) & 1)) | 0);
      let b: any = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](bweights, bit0, bit1) : method_combine_weights__int__2(runtime, bweights, bit0, bit1))) | 0);
      (__L4 ?? runtime.memberCall(palette, "set_pen_color", 0, __L5))(i, (__L3 ? __L3(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
    members.m_color_codes = __addr_zaxxon_palette(runtime, color_prom, 256);
  }
  function __addr_zaxxon_palette(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_zaxxon_palette(runtime: any, p: any): any {
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

  function method_compute_resistor_weights(runtime: any, minval: any, maxval: any, scaler: any, count_1: any, resistances_1: any, weights_1: any, pulldown_1: any, pullup_1: any, count_2: any, resistances_2: any, weights_2: any, pulldown_2: any, pullup_2: any, count_3: any, resistances_3: any, weights_3: any, pulldown_3: any, pullup_3: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["fatalerror"], __L1: any = __l["std::clamp"];

    let rescount: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let r: any = Array.from({ length: Math.max(0, Math.trunc(Number(3))) }, () => new Float64Array(new Uint8Array(Math.max(0, Math.trunc(Number(18))))));
    let w: any = Array.from({ length: Math.max(0, Math.trunc(Number(3))) }, () => new Float64Array(new Uint8Array(Math.max(0, Math.trunc(Number(18))))));
    let ws: any = Array.from({ length: Math.max(0, Math.trunc(Number(3))) }, () => new Float64Array(new Uint8Array(Math.max(0, Math.trunc(Number(18))))));
    let r_pd: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let r_pu: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let max_out: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let out: any = new Array(Math.max(0, Math.trunc(Number(3)))).fill(0);
    let networks_no: any = ((0) | 0);
    for (let n: any = ((0) | 0); ((Number(n) < Number(3)) ? 1 : 0); n = ((((n) + (1))) | 0)) {
      let count: any = ((0) | 0);
      let pd: any = ((0) | 0);
      let pu: any = ((0) | 0);
      let resistances: any = 0;
      let weights: any = 0;
      switch ((n as number)) {
        case 0:
        {
          count = ((count_1) | 0);
          resistances = resistances_1;
          weights = weights_1;
          pd = ((pulldown_1) | 0);
          pu = ((pullup_1) | 0);
          break;
        }
        case 1:
        {
          count = ((count_2) | 0);
          resistances = resistances_2;
          weights = weights_2;
          pd = ((pulldown_2) | 0);
          pu = ((pullup_2) | 0);
          break;
        }
        default:
        {
          count = ((count_3) | 0);
          resistances = resistances_3;
          weights = weights_3;
          pd = ((pulldown_3) | 0);
          pu = ((pullup_3) | 0);
          break;
        }
      }
      if (((Number(count) > Number(18)) ? 1 : 0)) {
        (__L0 ? __L0("compute_resistor_weights(): too many resistors in net #%i. The maximum allowed is %i, the number requested was: %i\n", n, 18, count) : runtime.macro("fatalerror", "compute_resistor_weights(): too many resistors in net #%i. The maximum allowed is %i, the number requested was: %i\n", n, 18, count));
      }
      if ((((count) > (0)) ? 1 : 0)) {
        rescount[networks_no] = count;
        for (let i: any = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
          runtime.writeIndex((r[networks_no] ?? 0), i, ((1) * (runtime.readIndex(resistances, i))));
        }
        out[networks_no] = weights;
        r_pd[networks_no] = pd;
        r_pu[networks_no] = pu;
        networks_no = ((((networks_no) + (1))) | 0);
      }
    }
    if ((((networks_no) < (1)) ? 1 : 0)) {
      (__L0 ? __L0("compute_resistor_weights(): no input data\n") : runtime.macro("fatalerror", "compute_resistor_weights(): no input data\n"));
    }
    for (let i: any = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let R0: any = 0;
      let R1: any = 0;
      let Vout: any = 0;
      let dst: any = 0;
      for (let n: any = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
        R0 = ((((Number((r_pd[i] ?? 0)) === Number(0)) ? 1 : 0)) ? (((1) / (1000000000000))) : (((1) / ((r_pd[i] ?? 0)))));
        R1 = ((((Number((r_pu[i] ?? 0)) === Number(0)) ? 1 : 0)) ? (((1) / (1000000000000))) : (((1) / ((r_pu[i] ?? 0)))));
        for (let j: any = ((0) | 0); ((Number(j) < Number((rescount[i] ?? 0))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
          if ((((j) === (n)) ? 1 : 0)) {
            if (((Number(runtime.readIndex((r[i] ?? 0), j)) !== Number(0)) ? 1 : 0)) {
              R1 = ((R1) + (((1) / (runtime.readIndex((r[i] ?? 0), j)))));
            }
          } else {
            if (((Number(runtime.readIndex((r[i] ?? 0), j)) !== Number(0)) ? 1 : 0)) {
              R0 = ((R0) + (((1) / (runtime.readIndex((r[i] ?? 0), j)))));
            }
          }
        }
        R0 = ((1) / (R0));
        R1 = ((1) / (R1));
        Vout = ((((((((maxval) - (minval))) * (R0))) / (((R1) + (R0))))) + (minval));
        dst = (__L1 ? __L1(Vout, minval, maxval) : runtime.macro("std::clamp", Vout, minval, maxval));
        runtime.writeIndex((w[i] ?? 0), n, dst);
      }
    }
    let j: any = ((0) | 0);
    let max: any = 0;
    for (let i: any = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let sum: any = 0;
      for (let n: any = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
        sum = ((sum) + (runtime.readIndex((w[i] ?? 0), n)));
      }
      max_out[i] = sum;
      if ((((max) < (sum)) ? 1 : 0)) {
        max = sum;
        j = ((i) | 0);
      }
    }
    let scale: any = 0;
    if ((((scaler) < (0)) ? 1 : 0)) {
      scale = ((maxval) / ((max_out[j] ?? 0)));
    } else {
      scale = scaler;
    }
    for (let i: any = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      for (let n: any = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
        runtime.writeIndex((ws[i] ?? 0), n, ((runtime.readIndex((w[i] ?? 0), n)) * (scale)));
        runtime.writeIndex((out[i] ?? 0), n, runtime.readIndex((ws[i] ?? 0), n));
      }
    }
    if (0) {
      /* osd_printf_info: no effect */
      /* osd_printf_info: no effect */
      for (let i: any = ((0) | 0); (((i) < (networks_no)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let sum: any = 0;
        /* osd_printf_info: no effect */
        if (((Number((r_pu[i] ?? 0)) !== Number(0)) ? 1 : 0)) {
          /* osd_printf_info: no effect */
        }
        if (((Number((r_pd[i] ?? 0)) !== Number(0)) ? 1 : 0)) {
          /* osd_printf_info: no effect */
        }
        /* osd_printf_info: no effect */
        for (let n: any = ((0) | 0); ((Number(n) < Number((rescount[i] ?? 0))) ? 1 : 0); n = ((((n) + (1))) | 0)) {
          /* osd_printf_info: no effect */
          sum = ((sum) + (runtime.readIndex((ws[i] ?? 0), n)));
        }
        /* osd_printf_info: no effect */
      }
    }
    return scale;
  }

  function method_combine_weights__int__3(runtime: any, tab: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__3(runtime, (runtime.overrides["emu_detail__combine_weights__0__2"] ? runtime.overrides["emu_detail__combine_weights__0__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__0__2(runtime, tab, w_0, w_1, w_2)), 0.5)) | 0);
  }
  function __add_combine_weights__int__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__2(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__1"] ? runtime.overrides["emu_detail__combine_weights__1__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__1__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__0__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__1(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__0"] ? runtime.overrides["emu_detail__combine_weights__2__0"](tab, w_0) : method_emu_detail__combine_weights__2__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__1__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 2)) * (w));
  }

  function method_combine_weights__int__2(runtime: any, tab: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__2(runtime, (runtime.overrides["emu_detail__combine_weights__0__1"] ? runtime.overrides["emu_detail__combine_weights__0__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__0__1(runtime, tab, w_0, w_1)), 0.5)) | 0);
  }
  function __add_combine_weights__int__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__1(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__0"] ? runtime.overrides["emu_detail__combine_weights__1__0"](tab, w_0) : method_emu_detail__combine_weights__1__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__0__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 1)) * (w));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "zaxxon_videoram_w": method_zaxxon_videoram_w,
    "bg_position_w": method_bg_position_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "zaxxon_get_fg_tile_info": method_zaxxon_get_fg_tile_info,
    "zaxxon_sound_a_w": method_zaxxon_sound_a_w,
    "zaxxon_sound_b_w": method_zaxxon_sound_b_w,
    "zaxxon_sound_c_w": method_zaxxon_sound_c_w,
    "flipscreen_w": method_flipscreen_w,
    "int_enable_w": method_int_enable_w,
    "fg_color_w": method_fg_color_w,
    "bg_color_w": method_bg_color_w,
    "bg_enable_w": method_bg_enable_w,
    "screen_update_zaxxon": method_screen_update_zaxxon,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "find_minimum_y": method_find_minimum_y,
    "find_minimum_x": method_find_minimum_x,
    "vblank_int": method_vblank_int,
    "zaxxon_palette": method_zaxxon_palette,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__3": method_combine_weights__int__3,
    "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
    "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
    "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
    "combine_weights__int__2": method_combine_weights__int__2,
    "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
    "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0
  };
  return __methodTable;
})();
    return {
      "zaxxon_state.zaxxon_videoram_w": methods["zaxxon_videoram_w"],
      "zaxxon_state.bg_position_w": methods["bg_position_w"],
      "zaxxon_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "zaxxon_state.zaxxon_get_fg_tile_info": methods["zaxxon_get_fg_tile_info"],
      "zaxxon_state.zaxxon_sound_a_w": methods["zaxxon_sound_a_w"],
      "zaxxon_state.zaxxon_sound_b_w": methods["zaxxon_sound_b_w"],
      "zaxxon_state.zaxxon_sound_c_w": methods["zaxxon_sound_c_w"],
      "zaxxon_state.flipscreen_w": methods["flipscreen_w"],
      "zaxxon_state.int_enable_w": methods["int_enable_w"],
      "zaxxon_state.fg_color_w": methods["fg_color_w"],
      "zaxxon_state.bg_color_w": methods["bg_color_w"],
      "zaxxon_state.bg_enable_w": methods["bg_enable_w"],
      "zaxxon_state.screen_update_zaxxon": methods["screen_update_zaxxon"],
      "zaxxon_state.draw_background": methods["draw_background"],
      "zaxxon_state.draw_sprites": methods["draw_sprites"],
      "zaxxon_state.find_minimum_y": methods["find_minimum_y"],
      "zaxxon_state.find_minimum_x": methods["find_minimum_x"],
      "zaxxon_state.vblank_int": methods["vblank_int"],
      "zaxxon_state.zaxxon_palette": methods["zaxxon_palette"],
      "zaxxon_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "zaxxon_state.combine_weights__int__3": methods["combine_weights__int__3"],
      "zaxxon_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
      "zaxxon_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
      "zaxxon_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
      "zaxxon_state.combine_weights__int__2": methods["combine_weights__int__2"],
      "zaxxon_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
      "zaxxon_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","entries","fatalerror","fill","gfx.transpen","height","m_bg_tilemap.pixmap","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_flip","m_fg_tilemap.set_palette_offset","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.black_pen","m_samples.playing","m_samples.set_volume","m_samples.start","m_samples.stop","mark_tile_dirty","memregion","palette.entries","palette.set_pen_color","pixmap","pixmap.height","pixmap.width","rgb_t","set","set_flip","set_palette_offset","set_pen_color","std::clamp","tileinfo.set","transpen","width"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
