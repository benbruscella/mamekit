// GENERATED executable machine composition from src/mame/universal/mrdo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mrdo');

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


  function method_bgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
  }

  function method_fgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
    (runtime.overrides["protection_w"] ? runtime.overrides["protection_w"](data) : method_protection_w(runtime, data));
  }

  function method_protection_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_flipscreen_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine().tilemap().set_flip_all"];

    data = ((data) & 0xff);
    members.m_flipscreen = ((((data) & (1))) | 0);
    ((__L0 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().tilemap().set_flip_all"))?.((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) ? (3) : (0))) ?? 0);
  }

  function method_protection_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["m_maincpu.state_int"];
    let __t0: any;

    let ROM: any = (__t0 = __deref_protection_r(runtime, (__L0 ? __L0("maincpu") : runtime.macro("memregion", "maincpu"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("maincpu") : runtime.macro("memregion", "maincpu")), "base")); let ROM$s: any = undefined, ROM$o: any = 0; if (ArrayBuffer.isView(ROM) || Array.isArray(ROM)) ROM$s = ROM; else if (ROM !== null && typeof ROM === 'object' && ROM.generatedPointer === true && ROM.path === undefined && ROM.target === undefined && (ArrayBuffer.isView(ROM.source) || Array.isArray(ROM.source))) { ROM$s = ROM.source; ROM$o = ROM.offset; }
    return (ROM$s !== undefined ? (ROM$s[ROM$o + ((__L1 ?? runtime.memberCall(members.m_maincpu, "state_int", 0, undefined))(13))] ?? 0) : runtime.readIndex(ROM, (__L1 ?? runtime.memberCall(members.m_maincpu, "state_int", 0, undefined))(13)));
  }
  function __deref_protection_r(runtime: any, p: any): any {
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

  function method_scrollx_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, data);
  }

  function method_scrolly_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrolly"], __L1: any = __l["set_scrolly"];

    data = ((data) & 0xff);
    if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L1))(0, ((((256) - (data))) & (255)));
    } else {
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L1))(0, data);
    }
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let attr: any = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index)) & 0xff);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(1, __add_get_bg_tile_info(runtime, runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (1024))), ((((attr) & (128))) << (1))), ((attr) & (63)), ((((attr) & (64))) ? (16) : (0)));
  }
  function __add_get_bg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let attr: any = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index)) & 0xff);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, __add_get_fg_tile_info(runtime, runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (1024))), ((((attr) & (128))) << (1))), ((attr) & (63)), ((((attr) & (64))) ? (16) : (0)));
  }
  function __add_get_fg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_screen_update_mrdo(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["m_bg_tilemap.draw"], __L3: any = __l["draw"], __L4: any = __l["m_fg_tilemap.draw"];

    (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(0, cliprect);
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 0, 0);
    (__L4 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"];

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    for (let offs: any = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      if (((Number(runtime.readIndex(h_m_spriteram, ((offs) + (1)))) !== Number(0)) ? 1 : 0)) {
        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "transpen", 0, undefined)(bitmap, cliprect, runtime.readIndex(h_m_spriteram, offs), ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (15)), ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (16)), ((runtime.readIndex(h_m_spriteram, ((offs) + (2)))) & (32)), runtime.readIndex(h_m_spriteram, ((offs) + (3))), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (1))))), 0);
      }
    }
  }

  function method_palette_init(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["rgb_t"], __L2: any = __l["palette.set_indirect_color"], __L3: any = __l["set_indirect_color"], __L4: any = __l["palette.set_pen_indirect"], __L5: any = __l["set_pen_indirect"];
    let __t0: any;

    let R1: any = ((150) | 0);
    let R2: any = ((120) | 0);
    let R3: any = ((100) | 0);
    let R4: any = ((75) | 0);
    let pull: any = ((220) | 0);
    let potadjust: any = 0.7;
    let pot: any = new Float32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
    let weight: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
    for (let i: any = ((15) | 0); (((i) >= (0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
      let par: any = 0;
      if (((i) & (1))) {
        par = ((par) + (((1) / (R1))));
      }
      if (((i) & (2))) {
        par = ((par) + (((1) / (R2))));
      }
      if (((i) & (4))) {
        par = ((par) + (((1) / (R3))));
      }
      if (((i) & (8))) {
        par = ((par) + (((1) / (R4))));
      }
      if (par) {
        par = ((1) / (par));
        pot[i] = ((((pull) / (((pull) + (par))))) - (potadjust));
      } else {
        pot[i] = 0;
      }
      weight[i] = ((((255) * ((pot[i] ?? 0)))) / ((pot[15] ?? 0)));
      if (((Number((weight[i] ?? 0)) < Number(0)) ? 1 : 0)) {
        weight[i] = 0;
      }
    }
    let color_prom: any = (__t0 = __deref_palette_init(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base"));
    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let bits0: any = ((0) | 0);
      let bits2: any = ((0) | 0);
      let a1: any = ((__add_palette_init(runtime, __add_palette_init(runtime, ((runtime.shiftRight(i, 3)) & (28)), ((i) & (3))), 32)) | 0);
      let a2: any = ((__add_palette_init(runtime, ((runtime.shiftRight(i, 0)) & (28)), ((i) & (3)))) | 0);
      bits0 = ((((runtime.shiftRight(runtime.readIndex(color_prom, a1), 0)) & (3))) | 0);
      bits2 = ((((runtime.shiftRight(runtime.readIndex(color_prom, a2), 0)) & (3))) | 0);
      let r: any = (((weight[((bits0) + (((bits2) << (2))))] ?? 0)) | 0);
      bits0 = ((((runtime.shiftRight(runtime.readIndex(color_prom, a1), 2)) & (3))) | 0);
      bits2 = ((((runtime.shiftRight(runtime.readIndex(color_prom, a2), 2)) & (3))) | 0);
      let g: any = (((weight[((bits0) + (((bits2) << (2))))] ?? 0)) | 0);
      bits0 = ((((runtime.shiftRight(runtime.readIndex(color_prom, a1), 4)) & (3))) | 0);
      bits2 = ((((runtime.shiftRight(runtime.readIndex(color_prom, a2), 4)) & (3))) | 0);
      let b: any = (((weight[((bits0) + (((bits2) << (2))))] ?? 0)) | 0);
      (__L2 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L3))(i, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
    color_prom = __add_palette_init(runtime, color_prom, 64);
    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(i, i);
    }
    for (let i: any = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let ctabentry: any = ((runtime.readIndex(color_prom, ((i) & (31)))) & 0xff);
      if (((i) & (32))) {
        ctabentry = ((((ctabentry) >>> (4))) & 0xff);
      } else {
        ctabentry = ((((ctabentry) & (15))) & 0xff);
      }
      (__L4 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L5))(((i) + (256)), ((ctabentry) + (((((ctabentry) & (12))) << (3)))));
    }
  }
  function __add_palette_init(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_palette_init(runtime: any, p: any): any {
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
    "bgvideoram_w": method_bgvideoram_w,
    "fgvideoram_w": method_fgvideoram_w,
    "protection_w": method_protection_w,
    "flipscreen_w": method_flipscreen_w,
    "protection_r": method_protection_r,
    "scrollx_w": method_scrollx_w,
    "scrolly_w": method_scrolly_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "screen_update_mrdo": method_screen_update_mrdo,
    "draw_sprites": method_draw_sprites,
    "palette_init": method_palette_init
  };
  return __methodTable;
})();
    return {
      "mrdo_state.bgvideoram_w": methods["bgvideoram_w"],
      "mrdo_state.fgvideoram_w": methods["fgvideoram_w"],
      "mrdo_state.protection_w": methods["protection_w"],
      "mrdo_state.flipscreen_w": methods["flipscreen_w"],
      "mrdo_state.protection_r": methods["protection_r"],
      "mrdo_state.scrollx_w": methods["scrollx_w"],
      "mrdo_state.scrolly_w": methods["scrolly_w"],
      "mrdo_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "mrdo_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "mrdo_state.screen_update_mrdo": methods["screen_update_mrdo"],
      "mrdo_state.draw_sprites": methods["draw_sprites"],
      "mrdo_state.palette_init": methods["palette_init"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_maincpu.state_int","machine().tilemap().set_flip_all","mark_tile_dirty","memregion","palette.set_indirect_color","palette.set_pen_indirect","rgb_t","set","set_indirect_color","set_pen_indirect","set_scrollx","set_scrolly","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
