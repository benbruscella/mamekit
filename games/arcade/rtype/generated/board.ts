// GENERATED executable machine composition from src/mame/irem/m72.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rtype');

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


  function method_scanline_interrupt(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["m_upd71059c.ir2_w"], __L3: any = __l["m_upd71059c.ir0_w"], __L4: any = __l["m_screen.height"], __L5: any = __l["m_screen.time_until_pos"], __L6: any = __l["m_scanline_timer.adjust"], __L7: any = __l["adjust"];
    let __t0: any, __t1: any;

    let scanline: any = ((param) | 0);
    if (((Number(scanline) === Number((members.m_raster_irq_position ?? runtime.member("m_raster_irq_position")))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
      (__L2 ?? runtime.memberCall(members.m_upd71059c, "ir2_w", 0, undefined))(1);
    } else {
      (__L2 ?? runtime.memberCall(members.m_upd71059c, "ir2_w", 0, undefined))(0);
    }
    if ((((scanline) === (256)) ? 1 : 0)) {
      (__L3 ?? runtime.memberCall(members.m_upd71059c, "ir0_w", 0, undefined))(1);
    } else {
      (__L3 ?? runtime.memberCall(members.m_upd71059c, "ir0_w", 0, undefined))(0);
    }
    if (((Number((scanline = ((((scanline) + (1))) | 0))) >= Number((__L4 ?? runtime.memberCall(members.m_screen, "height", 0, undefined))())) ? 1 : 0)) {
      scanline = ((0) | 0);
    }
    (__L6 ?? runtime.memberCall(members.m_scanline_timer, "adjust", 0, __L7))((__L5 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(scanline), scanline);
  }

  function method_palette_r_0(runtime: any, offset: any): any {
    const members = runtime.members;

    offset = ((offset) & (-257));
    return ((runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), offset)) | (65504));
  }

  function method_palette_w_0(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    offset = ((offset) & (-257));
    runtime.combineData(__addr_palette_w_0(runtime, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), offset), data, mem_mask);
    offset = ((offset) & (255));
    (runtime.overrides["changecolor"] ? runtime.overrides["changecolor"](((offset) + (0)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (1024)))) : method_changecolor(runtime, ((offset) + (0)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 0), ((offset) + (1024)))));
  }
  function __addr_palette_w_0(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_changecolor(runtime: any, color: any, r: any, g: any, b: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["pal5bit"], __L1: any = __l["m_palette.set_pen_color"];

    r = ((r) & 0xff);
    g = ((g) & 0xff);
    b = ((b) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(color, (__L0 ? __L0(r) : runtime.macro("pal5bit", r)), (__L0 ? __L0(g) : runtime.macro("pal5bit", g)), (__L0 ? __L0(b) : runtime.macro("pal5bit", b)));
  }

  function method_palette_r_1(runtime: any, offset: any): any {
    const members = runtime.members;

    offset = ((offset) & (-257));
    return ((runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), offset)) | (65504));
  }

  function method_palette_w_1(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    offset = ((offset) & (-257));
    runtime.combineData(__addr_palette_w_1(runtime, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), offset), data, mem_mask);
    offset = ((offset) & (255));
    (runtime.overrides["changecolor"] ? runtime.overrides["changecolor"](((offset) + (256)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (1024)))) : method_changecolor(runtime, ((offset) + (256)), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (0))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (512))), runtime.readIndex(runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), 1), ((offset) + (1024)))));
  }
  function __addr_palette_w_1(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_videoram1_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_videoram1_w(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), offset), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
  }
  function __addr_videoram1_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_videoram2_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_videoram2_w(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), offset), data, mem_mask);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
  }
  function __addr_videoram2_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_soundram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_soundram ?? runtime.member("m_soundram")), offset);
  }

  function method_soundram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_soundram"), offset, data);
  }

  function method_irq_line_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd71059c.found"], __L1: any = __l["m_upd71059c.ir2_w"], __L2: any = __l["m_maincpu.set_input_line"];
    let __t0: any;

    data = ((data) & 0xffff);
    members.m_raster_irq_position = ((((((data) & (511))) - (128))) | 0);
    if ((__L0 ?? runtime.memberCall(members.m_upd71059c, "found", 0, undefined))()) {
      (__L1 ?? runtime.memberCall(members.m_upd71059c, "ir2_w", 0, undefined))(0);
    } else {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(12, 0);
    }
  }

  function method_dmaon_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram.copy"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_spriteram, "copy", 0, undefined))();
  }

  function method_scrolly_w_0(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_scrolly_w_0(runtime, (members.m_scrolly ?? runtime.member("m_scrolly")), 0), data, mem_mask);
  }
  function __addr_scrolly_w_0(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_scrollx_w_0(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_scrollx_w_0(runtime, (members.m_scrollx ?? runtime.member("m_scrollx")), 0), data, mem_mask);
  }
  function __addr_scrollx_w_0(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_scrolly_w_1(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_scrolly_w_1(runtime, (members.m_scrolly ?? runtime.member("m_scrolly")), 1), data, mem_mask);
  }
  function __addr_scrolly_w_1(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_scrollx_w_1(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    runtime.combineData(__addr_scrollx_w_1(runtime, (members.m_scrollx ?? runtime.member("m_scrollx")), 1), data, mem_mask);
  }
  function __addr_scrollx_w_1(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_sample_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["read_byte"];

    return (__L0 ? __L0((members.m_sample_addr ?? runtime.member("m_sample_addr"))) : runtime.macro("read_byte", (members.m_sample_addr ?? runtime.member("m_sample_addr"))));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;

    (runtime.overrides["m72_m81_get_tile_info"] ? runtime.overrides["m72_m81_get_tile_info"](tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), (members.m_bg_source ?? runtime.member("m_bg_source"))) : method_m72_m81_get_tile_info(runtime, tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), (members.m_bg_source ?? runtime.member("m_bg_source"))));
  }

  function method_m72_m81_get_tile_info(runtime: any, tileinfo: any, tile_index: any, vram: any, gfxnum: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["TILE_FLIPYX"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];

    tile_index = ((((tile_index) * (2))) | 0);
    let code: any = ((runtime.readIndex(vram, tile_index)) & 0xffff);
    let attr: any = ((runtime.readIndex(vram, ((tile_index) + (1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(gfxnum, ((code) & (16383)), ((attr) & (15)), (__L0 ? __L0(runtime.shiftRight(((code) & (49152)), 14)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((code) & (49152)), 14))));
    tileinfo.group = runtime.shiftRight(((attr) & (192)), 6);
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;

    (runtime.overrides["m72_m81_get_tile_info"] ? runtime.overrides["m72_m81_get_tile_info"](tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), (members.m_fg_source ?? runtime.member("m_fg_source"))) : method_m72_m81_get_tile_info(runtime, tileinfo, tile_index, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), (members.m_fg_source ?? runtime.member("m_fg_source"))));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.black_pen"], __L1: any = __l["bitmap.fill"], __L2: any = __l["fill"], __L3: any = __l["screen.priority"], __L4: any = __l["priority"], __L5: any = __l["m_fg_tilemap.set_scrollx"], __L6: any = __l["set_scrollx"], __L7: any = __l["m_fg_tilemap.set_scrolly"], __L8: any = __l["set_scrolly"], __L9: any = __l["m_bg_tilemap.set_scrollx"], __L10: any = __l["m_bg_tilemap.set_scrolly"], __L11: any = __l["m_bg_tilemap.draw"], __L12: any = __l["draw"], __L13: any = __l["m_fg_tilemap.draw"], __L14: any = __l["m_bg_tilemap.set_transmask"], __L15: any = __l["set_transmask"];
    let __t0: any, __t1: any;

    if ((members.m_video_off ?? runtime.member("m_video_off"))) {
      (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ?? runtime.memberCall(members.m_palette, "black_pen", 0, undefined))(), cliprect);
      return 0;
    }
    runtime.memberCall((__L3 ?? runtime.memberCall(screen, "priority", 0, __L4))(), "fill", 0, undefined)(0, cliprect);
    (__L5 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrollx", 0, __L6))(0, runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 0));
    (__L7 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrolly", 0, __L8))(0, runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 0));
    (__L9 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L6))(0, runtime.readIndex((members.m_scrollx ?? runtime.member("m_scrollx")), 1));
    (__L10 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L8))(0, runtime.readIndex((members.m_scrolly ?? runtime.member("m_scrolly")), 1));
    (__L11 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L12))(screen, bitmap, cliprect, 16, 1);
    (__L13 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L12))(screen, bitmap, cliprect, 16, 1);
    (__L14 ?? runtime.memberCall(members.m_bg_tilemap, "set_transmask", 0, __L15))(2, 65535, 0);
    (__L11 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L12))(screen, bitmap, cliprect, 32, 0);
    (__L13 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L12))(screen, bitmap, cliprect, 32, 0);
    (__L11 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L12))(screen, bitmap, cliprect, 16, 0);
    (__L13 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L12))(screen, bitmap, cliprect, 16, 0);
    (__L14 ?? runtime.memberCall(members.m_bg_tilemap, "set_transmask", 0, __L15))(2, 1, 65534);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](screen, bitmap, cliprect) : method_draw_sprites(runtime, screen, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram.buffer"], __L1: any = __l["m_spriteram.length"], __L2: any = __l["spritelist.push"], __L3: any = __l["push"], __L4: any = __l["flip_screen"], __L5: any = __l["screen.priority"], __L6: any = __l["priority"], __L7: any = __l["m_gfxdecode.gfx"];
    let __t0: any, __t1: any, __t2: any;

    let spriteram: any = (__L0 ?? runtime.memberCall(members.m_spriteram, "buffer", 0, undefined))(); let spriteram$s: any = undefined, spriteram$o: any = 0; if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram)) spriteram$s = spriteram; else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) { spriteram$s = spriteram.source; spriteram$o = spriteram.offset; }
    let spritelist: any = [];
    for (let i: any = ((0) | 0), w: any = ((0) | 0); ((Number(i) < Number((__L1 ?? runtime.memberCall(members.m_spriteram, "length", 0, undefined))())) ? 1 : 0); i = ((((i) + (((w) * (4))))) | 0)) {
      (__L2 ? __L2(i) : (spritelist) != null ? (spritelist).push(i) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("push"))?.(i) ?? 0));
      w = ((((1) << (runtime.shiftRight((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((i) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((i) + (2))))) & (49152)), 14)))) | 0);
    }
    for (let i: any = ((runtime.subtract((spritelist).length, 1)) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
      let offs: any = (((spritelist[i] ?? 0)) | 0);
      let code: any = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) | 0);
      let color: any = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) & (15))) >>> 0);
      let sx: any = ((__add_draw_sprites(runtime, -256, (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (3)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (3))))) & (1023)))) | 0);
      let sy: any = ((((384) - ((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (0)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (0))))) & (511))))) | 0);
      let flipx: any = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) & (2048))) | 0);
      let flipy: any = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) & (1024))) | 0);
      let w: any = ((((1) << (runtime.shiftRight((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) & (49152)), 14)))) | 0);
      let h: any = ((((1) << (runtime.shiftRight((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) & (12288)), 12)))) | 0);
      sy = ((((sy) - (((16) * (h))))) | 0);
      if ((__L4 ? __L4() : runtime.macro("flip_screen"))) {
        sx = ((((((512) - (((16) * (w))))) - (sx))) | 0);
        sy = ((((((284) - (((16) * (h))))) - (sy))) | 0);
        flipx = ((((flipx) ? 0 : 1)) | 0);
        flipy = ((((flipy) ? 0 : 1)) | 0);
      }
      for (let x: any = ((0) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        for (let y: any = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
          let c: any = ((code) | 0);
          if (flipx) {
            c = ((((c) + (((8) * (((((w) - (1))) - (x))))))) | 0);
          } else {
            c = ((((c) + (((8) * (x))))) | 0);
          }
          if (flipy) {
            c = ((((c) + (((((h) - (1))) - (y))))) | 0);
          } else {
            c = ((((c) + (y))) | 0);
          }
          runtime.memberCall((__L7 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "prio_transpen", 0, undefined)(bitmap, cliprect, c, color, flipx, flipy, ((sx) + (((16) * (x)))), ((sy) + (((16) * (y)))), (__L5 ?? runtime.memberCall(screen, "priority", 0, __L6))(), -2, 0);
        }
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
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "scanline_interrupt": method_scanline_interrupt,
    "palette_r_0": method_palette_r_0,
    "palette_w_0": method_palette_w_0,
    "changecolor": method_changecolor,
    "palette_r_1": method_palette_r_1,
    "palette_w_1": method_palette_w_1,
    "videoram1_w": method_videoram1_w,
    "videoram2_w": method_videoram2_w,
    "soundram_r": method_soundram_r,
    "soundram_w": method_soundram_w,
    "irq_line_w": method_irq_line_w,
    "dmaon_w": method_dmaon_w,
    "scrolly_w_0": method_scrolly_w_0,
    "scrollx_w_0": method_scrollx_w_0,
    "scrolly_w_1": method_scrolly_w_1,
    "scrollx_w_1": method_scrollx_w_1,
    "sample_r": method_sample_r,
    "get_bg_tile_info": method_get_bg_tile_info,
    "m72_m81_get_tile_info": method_m72_m81_get_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites
  };
  return __methodTable;
})();
    return {
      "m72_state.scanline_interrupt": methods["scanline_interrupt"],
      "m72_state.palette_r_0": methods["palette_r_0"],
      "m72_state.palette_w_0": methods["palette_w_0"],
      "m72_state.changecolor": methods["changecolor"],
      "m72_state.palette_r_1": methods["palette_r_1"],
      "m72_state.palette_w_1": methods["palette_w_1"],
      "m72_state.videoram1_w": methods["videoram1_w"],
      "m72_state.videoram2_w": methods["videoram2_w"],
      "m72_state.soundram_r": methods["soundram_r"],
      "m72_state.soundram_w": methods["soundram_w"],
      "m72_state.irq_line_w": methods["irq_line_w"],
      "m72_state.dmaon_w": methods["dmaon_w"],
      "m72_state.scrolly_w_0": methods["scrolly_w_0"],
      "m72_state.scrollx_w_0": methods["scrollx_w_0"],
      "m72_state.scrolly_w_1": methods["scrolly_w_1"],
      "m72_state.scrollx_w_1": methods["scrollx_w_1"],
      "m72_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "m72_state.m72_m81_get_tile_info": methods["m72_m81_get_tile_info"],
      "m72_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "m72_state.screen_update": methods["screen_update"],
      "m72_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","adjust","bitmap.fill","draw","fill","flip_screen","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_bg_tilemap.set_transmask","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_scrollx","m_fg_tilemap.set_scrolly","m_gfxdecode.gfx","m_maincpu.set_input_line","m_palette.black_pen","m_palette.set_pen_color","m_scanline_timer.adjust","m_screen.height","m_screen.time_until_pos","m_screen.update_partial","m_screen.vpos","m_spriteram.buffer","m_spriteram.copy","m_spriteram.length","m_upd71059c.found","m_upd71059c.ir0_w","m_upd71059c.ir2_w","mark_tile_dirty","pal5bit","priority","push","read_byte","screen.priority","set","set_scrollx","set_scrolly","set_transmask","spritelist.push","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
