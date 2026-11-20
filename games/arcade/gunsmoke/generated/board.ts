// GENERATED executable machine composition from src/mame/capcom/gunsmoke.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gunsmoke');

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
  const __mame_table_0 = [255, 0, 0];

  function method_protection_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return (__mame_table_0[(((offset) % 3) + 3) % 3] ?? 0);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_layer_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_sprite3bank = ((((data) & (7))) & 0xff);
    members.m_bgon = ((((data) & (16))) & 0xff);
    members.m_objon = ((((data) & (32))) & 0xff);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["TILE_FLIPYX"], __L2: any = __l["tileinfo.set"], __L3: any = __l["set"];
    let __t0: any;

    let tilerom: any = (__t0 = __deref_get_bg_tile_info(runtime, (__L0 ? __L0("bgtiles") : runtime.macro("memregion", "bgtiles"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("bgtiles") : runtime.macro("memregion", "bgtiles")), "base")); let tilerom$s: any = undefined, tilerom$o: any = 0; if (ArrayBuffer.isView(tilerom) || Array.isArray(tilerom)) tilerom$s = tilerom; else if (tilerom !== null && typeof tilerom === 'object' && tilerom.generatedPointer === true && tilerom.path === undefined && tilerom.target === undefined && (ArrayBuffer.isView(tilerom.source) || Array.isArray(tilerom.source))) { tilerom$s = tilerom.source; tilerom$o = tilerom.offset; }
    let offs: any = ((((tile_index) * (2))) | 0);
    let attr: any = (((tilerom$s !== undefined ? (tilerom$s[tilerom$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(tilerom, ((offs) + (1))))) | 0);
    let code: any = ((__add_get_bg_tile_info(runtime, (tilerom$s !== undefined ? (tilerom$s[tilerom$o + (offs)] ?? 0) : runtime.readIndex(tilerom, offs)), ((((attr) & (1))) << (8)))) | 0);
    let color: any = ((runtime.shiftRight(((attr) & (60)), 2)) | 0);
    let flags: any = (((__L1 ? __L1(runtime.shiftRight(((attr) & (192)), 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (192)), 6)))) | 0);
    (__L2 ?? runtime.memberCall(tileinfo, "set", 0, __L3))(1, code, color, flags);
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

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let attr: any = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) | 0);
    let code: any = ((__add_get_fg_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((attr) & (224))) << (2)))) | 0);
    let color: any = ((((attr) & (31))) | 0);
    tileinfo.group = color;
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, 0);
  }
  function __add_get_fg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_bg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"], __L4: any = __l["m_bg_tilemap.draw"], __L5: any = __l["draw"], __L6: any = __l["m_palette.black_pen"], __L7: any = __l["bitmap.fill"], __L8: any = __l["fill"], __L9: any = __l["m_fg_tilemap.draw"];
    let __t0: any;

    const h_m_scrollx = members.m_scrollx ?? runtime.member("m_scrollx");
    const h_m_scrolly = members.m_scrolly ?? runtime.member("m_scrolly");
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, __add_screen_update(runtime, runtime.readIndex(h_m_scrollx, 0), ((256) * (runtime.readIndex(h_m_scrollx, 1)))));
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(0, runtime.readIndex(h_m_scrolly, 0));
    if ((members.m_bgon ?? runtime.member("m_bgon"))) {
      (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
    } else {
      (__L7 ?? runtime.memberCall(bitmap, "fill", 0, __L8))((__L6 ?? runtime.memberCall(members.m_palette, "black_pen", 0, undefined))(), cliprect);
    }
    if ((members.m_objon ?? runtime.member("m_objon"))) {
      (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    }
    if ((members.m_chon ?? runtime.member("m_chon"))) {
      (__L9 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
    }
    return 0;
  }
  function __add_screen_update(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spriteram.buffer"], __L1: any = __l["m_spriteram.bytes"], __L2: any = __l["flip_screen"], __L3: any = __l["m_gfxdecode.gfx"];
    let __t0: any, __t1: any;

    let spriteram: any = (__L0 ?? runtime.memberCall(members.m_spriteram, "buffer", 0, undefined))(); let spriteram$s: any = undefined, spriteram$o: any = 0; if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram)) spriteram$s = spriteram; else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) { spriteram$s = spriteram.source; spriteram$o = spriteram.offset; }
    for (let offs: any = ((runtime.subtract((__L1 ?? runtime.memberCall(members.m_spriteram, "bytes", 0, undefined))(), 32)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (32))) | 0)) {
      let attr: any = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (1)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (1))))) | 0);
      let bank: any = ((runtime.shiftRight(((attr) & (192)), 6)) | 0);
      let code: any = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offs)] ?? 0) : runtime.readIndex(spriteram, offs))) | 0);
      let color: any = ((((attr) & (15))) | 0);
      let flipx: any = ((0) | 0);
      let flipy: any = ((((attr) & (16))) | 0);
      let sx: any = (((((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (3)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (3))))) - (((((attr) & (32))) << (3))))) | 0);
      let sy: any = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offs) + (2)))] ?? 0) : runtime.readIndex(spriteram, ((offs) + (2))))) | 0);
      if ((((bank) === (3)) ? 1 : 0)) {
        bank = ((((bank) + ((members.m_sprite3bank ?? runtime.member("m_sprite3bank"))))) | 0);
      }
      code = ((((code) + (((256) * (bank))))) | 0);
      if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
        sx = ((((240) - (sx))) | 0);
        sy = ((((240) - (sy))) | 0);
        flipx = ((((flipx) ? 0 : 1)) | 0);
        flipy = ((((flipy) ? 0 : 1)) | 0);
      }
      runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0);
    }
  }

  function method_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["pal4bit"], __L2: any = __l["rgb_t"], __L3: any = __l["palette.set_indirect_color"], __L4: any = __l["set_indirect_color"], __L5: any = __l["palette.set_pen_indirect"], __L6: any = __l["set_pen_indirect"];
    let __t0: any;

    let color_prom: any = (__t0 = __deref_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let r: any = (((__L1 ? __L1(runtime.readIndex(color_prom, ((i) + (0)))) : runtime.macro("pal4bit", runtime.readIndex(color_prom, ((i) + (0)))))) | 0);
      let g: any = (((__L1 ? __L1(runtime.readIndex(color_prom, ((i) + (256)))) : runtime.macro("pal4bit", runtime.readIndex(color_prom, ((i) + (256)))))) | 0);
      let b: any = (((__L1 ? __L1(runtime.readIndex(color_prom, ((i) + (512)))) : runtime.macro("pal4bit", runtime.readIndex(color_prom, ((i) + (512)))))) | 0);
      (__L3 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L4))(i, (__L2 ? __L2(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
    color_prom = __add_palette(runtime, color_prom, 768);
    for (let i: any = ((0) | 0); (((i) < (128)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let ctabentry: any = ((((runtime.readIndex(color_prom, i)) | (64))) & 0xff);
      (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))(i, ctabentry);
    }
    for (let i: any = ((256) | 0); (((i) < (512)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let ctabentry: any = ((((runtime.readIndex(color_prom, i)) | (((((runtime.readIndex(color_prom, ((i) + (256)))) & (3))) << (4))))) & 0xff);
      (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))(((i) - (128)), ctabentry);
    }
    for (let i: any = ((768) | 0); (((i) < (1024)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let ctabentry: any = ((((((runtime.readIndex(color_prom, i)) | (((((runtime.readIndex(color_prom, ((i) + (256)))) & (7))) << (4))))) | (128))) & 0xff);
      (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))(((i) - (384)), ctabentry);
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
    "protection_r": method_protection_r,
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "layer_w": method_layer_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "palette": method_palette
  };
  return __methodTable;
})();
    return {
      "gunsmoke_state.protection_r": methods["protection_r"],
      "gunsmoke_state.videoram_w": methods["videoram_w"],
      "gunsmoke_state.colorram_w": methods["colorram_w"],
      "gunsmoke_state.layer_w": methods["layer_w"],
      "gunsmoke_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "gunsmoke_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "gunsmoke_state.screen_update": methods["screen_update"],
      "gunsmoke_state.draw_sprites": methods["draw_sprites"],
      "gunsmoke_state.palette": methods["palette"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","bitmap.fill","draw","fill","flip_screen","m_bg_tilemap.draw","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_palette.black_pen","m_spriteram.buffer","m_spriteram.bytes","mark_tile_dirty","memregion","pal4bit","palette.set_indirect_color","palette.set_pen_indirect","rgb_t","set","set_indirect_color","set_pen_indirect","set_scrollx","set_scrolly","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
