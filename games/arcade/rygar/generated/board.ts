// GENERATED executable machine composition from src/mame/tecmo/tecmo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rygar');

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


  function method_txvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_tx_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_txvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_tx_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (1023)));
  }

  function method_fgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (511)));
  }

  function method_bgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (511)));
  }

  function method_dsw_l_r_0(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dsw[0].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = (((__L0 ? __L0() : (runtime.readIndex(h_m_dsw, 0)) != null ? (__t0 = __deref_dsw_l_r_0(runtime, runtime.readIndex(h_m_dsw, 0)), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_dsw, 0), "read")) : ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("read"))?.() ?? 0))) & 0xff);
    port = ((((port) & (15))) & 0xff);
    return port;
  }
  function __deref_dsw_l_r_0(runtime: any, p: any): any {
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

  function method_dsw_h_r_0(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dsw[0].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = (((__L0 ? __L0() : (runtime.readIndex(h_m_dsw, 0)) != null ? (__t0 = __deref_dsw_h_r_0(runtime, runtime.readIndex(h_m_dsw, 0)), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_dsw, 0), "read")) : ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("read"))?.() ?? 0))) & 0xff);
    port = ((((port) & (240))) & 0xff);
    return ((port) >>> (4));
  }
  function __deref_dsw_h_r_0(runtime: any, p: any): any {
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

  function method_dsw_l_r_1(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dsw[1].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = (((__L0 ? __L0() : (runtime.readIndex(h_m_dsw, 1)) != null ? (__t0 = __deref_dsw_l_r_1(runtime, runtime.readIndex(h_m_dsw, 1)), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_dsw, 1), "read")) : ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("read"))?.() ?? 0))) & 0xff);
    port = ((((port) & (15))) & 0xff);
    return port;
  }
  function __deref_dsw_l_r_1(runtime: any, p: any): any {
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

  function method_dsw_h_r_1(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dsw[1].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_dsw = members.m_dsw ?? runtime.member("m_dsw");
    let port: any = (((__L0 ? __L0() : (runtime.readIndex(h_m_dsw, 1)) != null ? (__t0 = __deref_dsw_h_r_1(runtime, runtime.readIndex(h_m_dsw, 1)), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_dsw, 1), "read")) : ((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("read"))?.() ?? 0))) & 0xff);
    port = ((((port) & (240))) & 0xff);
    return ((port) >>> (4));
  }
  function __deref_dsw_h_r_1(runtime: any, p: any): any {
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

  function method_fgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["m_fg_tilemap.set_scrollx"], __L3: any = __l["set_scrollx"], __L4: any = __l["m_fg_tilemap.set_scrolly"], __L5: any = __l["set_scrolly"];
    let __t0: any;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_fgscroll"), offset, data);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrollx", 0, __L3))(0, __add_fgscroll_w(runtime, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 0), ((256) * (runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 1)))));
    (__L4 ?? runtime.memberCall(members.m_fg_tilemap, "set_scrolly", 0, __L5))(0, runtime.readIndex((members.m_fgscroll ?? runtime.member("m_fgscroll")), 2));
  }
  function __add_fgscroll_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_bgscroll_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["m_bg_tilemap.set_scrollx"], __L3: any = __l["set_scrollx"], __L4: any = __l["m_bg_tilemap.set_scrolly"], __L5: any = __l["set_scrolly"];
    let __t0: any;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_bgscroll"), offset, data);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L3))(0, __add_bgscroll_w(runtime, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 0), ((256) * (runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 1)))));
    (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L5))(0, runtime.readIndex((members.m_bgscroll ?? runtime.member("m_bgscroll")), 2));
  }
  function __add_bgscroll_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_flipscreen_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"];

    data = ((data) & 0xff);
    (__L0 ? __L0((((data) >>> (0)) & 1)) : runtime.macro("flip_screen_set", (((data) >>> (0)) & 1)));
  }

  function method_bankswitch_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mainbank.set_entry"], __L1: any = __l["set_entry"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L1))(((data) >>> (3)));
  }

  function method_adpcm_start_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_msm.reset_w"];

    data = ((data) & 0xff);
    members.m_adpcm_pos = ((((data) << (8))) & 0xffff);
    members.m_adpcm_toggle = ((0) ? 1 : 0);
    members.m_adpcm_enabled = ((1) ? 1 : 0);
    (__L0 ?? runtime.memberCall(members.m_msm, "reset_w", 0, undefined))(0);
  }

  function method_adpcm_end_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_adpcm_end = ((data) & 0xff);
  }

  function method_adpcm_vol_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_msm.set_output_gain"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_msm, "set_output_gain", 0, undefined))(65535, ((((data) & (15))) / (15)));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let attr: any = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) + (512)))) & 0xff);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(2, __add_get_bg_tile_info(runtime, runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0);
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

    let attr: any = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) + (512)))) & 0xff);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(1, __add_get_fg_tile_info(runtime, runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index), ((((attr) & (7))) << (8))), ((attr) >>> (4)), 0);
  }
  function __add_get_fg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_get_tx_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let attr: any = ((runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), ((tile_index) + (1024)))) & 0xff);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, __add_get_tx_tile_info(runtime, runtime.readIndex((members.m_txvideoram ?? runtime.member("m_txvideoram")), tile_index), ((((attr) & (3))) << (8))), ((attr) >>> (4)), 0);
  }
  function __add_get_tx_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.priority"], __L1: any = __l["priority"], __L2: any = __l["bitmap.fill"], __L3: any = __l["fill"], __L4: any = __l["m_bg_tilemap.draw"], __L5: any = __l["draw"], __L6: any = __l["m_fg_tilemap.draw"], __L7: any = __l["m_tx_tilemap.draw"], __L8: any = __l["flip_screen"], __L9: any = __l["m_sprgen.draw_sprites_8bit"];
    let __t0: any;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_video_type = members.m_video_type ?? runtime.member("m_video_type");
    runtime.memberCall((__L0 ?? runtime.memberCall(screen, "priority", 0, __L1))(), "fill", 0, undefined)(0, cliprect);
    (__L2 ?? runtime.memberCall(bitmap, "fill", 0, __L3))(256, cliprect);
    (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 1);
    (__L6 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 2);
    (__L7 ?? runtime.memberCall(members.m_tx_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 4);
    (__L9 ?? runtime.memberCall(members.m_sprgen, "draw_sprites_8bit", 0, undefined))(screen, bitmap, cliprect, h_m_spriteram, runtime.container(members.m_spriteram, "bytes"), h_m_video_type, (__L8 ? __L8() : runtime.macro("flip_screen")));
    return 0;
  }

  function method_pri_cb(runtime: any, pri: any): any {
    const members = runtime.members;

    pri = ((pri) & 0xff);
    switch ((pri as number)) {
      default:
      {
        return 0;
      }
      case 1:
      {
        return 240;
      }
      case 2:
      {
        return 252;
      }
      case 3:
      {
        return 254;
      }
    }
  }

  function method_adpcm_int(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_msm.data_w"], __L1: any = __l["m_msm.reset_w"];

    const h_m_adpcm_rom = members.m_adpcm_rom ?? runtime.member("m_adpcm_rom");
    if ((((((state) ? 0 : 1)) || ((((members.m_adpcm_enabled ?? runtime.member("m_adpcm_enabled"))) ? 0 : 1))) ? 1 : 0)) {
      return;
    }
    let data: any = ((runtime.readIndex(h_m_adpcm_rom, (((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) % (runtime.container(members.m_adpcm_rom, "bytes"))))) & 0xff);
    if ((members.m_adpcm_toggle ?? runtime.member("m_adpcm_toggle"))) {
      (__L0 ?? runtime.memberCall(members.m_msm, "data_w", 0, undefined))(((data) & (15)));
      let hi: any = ((runtime.shiftRight((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos")), 8)) & 0xff);
      members.m_adpcm_pos = ((((members.m_adpcm_pos) + (1))) & 0xffff);
      if ((((((Number((((members.m_adpcm_pos ?? runtime.member("m_adpcm_pos"))) & (255))) === Number(0)) ? 1 : 0)) && (((Number(hi) === Number((members.m_adpcm_end ?? runtime.member("m_adpcm_end")))) ? 1 : 0))) ? 1 : 0)) {
        members.m_adpcm_enabled = ((0) ? 1 : 0);
        (__L1 ?? runtime.memberCall(members.m_msm, "reset_w", 0, undefined))(1);
      }
    } else {
      (__L0 ?? runtime.memberCall(members.m_msm, "data_w", 0, undefined))(((data) >>> (4)));
    }
    members.m_adpcm_toggle = (((((members.m_adpcm_toggle ?? runtime.member("m_adpcm_toggle"))) ? 0 : 1)) ? 1 : 0);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "txvideoram_w": method_txvideoram_w,
    "fgvideoram_w": method_fgvideoram_w,
    "bgvideoram_w": method_bgvideoram_w,
    "dsw_l_r_0": method_dsw_l_r_0,
    "dsw_h_r_0": method_dsw_h_r_0,
    "dsw_l_r_1": method_dsw_l_r_1,
    "dsw_h_r_1": method_dsw_h_r_1,
    "fgscroll_w": method_fgscroll_w,
    "bgscroll_w": method_bgscroll_w,
    "flipscreen_w": method_flipscreen_w,
    "bankswitch_w": method_bankswitch_w,
    "adpcm_start_w": method_adpcm_start_w,
    "adpcm_end_w": method_adpcm_end_w,
    "adpcm_vol_w": method_adpcm_vol_w,
    "get_bg_tile_info": method_get_bg_tile_info,
    "get_fg_tile_info": method_get_fg_tile_info,
    "get_tx_tile_info": method_get_tx_tile_info,
    "screen_update": method_screen_update,
    "pri_cb": method_pri_cb,
    "adpcm_int": method_adpcm_int
  };
  return __methodTable;
})();
    return {
      "tecmo_state.txvideoram_w": methods["txvideoram_w"],
      "tecmo_state.fgvideoram_w": methods["fgvideoram_w"],
      "tecmo_state.bgvideoram_w": methods["bgvideoram_w"],
      "tecmo_state.dsw_l_r_0": methods["dsw_l_r_0"],
      "tecmo_state.dsw_h_r_0": methods["dsw_h_r_0"],
      "tecmo_state.dsw_l_r_1": methods["dsw_l_r_1"],
      "tecmo_state.dsw_h_r_1": methods["dsw_h_r_1"],
      "tecmo_state.fgscroll_w": methods["fgscroll_w"],
      "tecmo_state.bgscroll_w": methods["bgscroll_w"],
      "tecmo_state.flipscreen_w": methods["flipscreen_w"],
      "tecmo_state.bankswitch_w": methods["bankswitch_w"],
      "tecmo_state.adpcm_start_w": methods["adpcm_start_w"],
      "tecmo_state.adpcm_end_w": methods["adpcm_end_w"],
      "tecmo_state.adpcm_vol_w": methods["adpcm_vol_w"],
      "tecmo_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "tecmo_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "tecmo_state.get_tx_tile_info": methods["get_tx_tile_info"],
      "tecmo_state.screen_update": methods["screen_update"],
      "tecmo_state.pri_cb": methods["pri_cb"],
      "tecmo_state.adpcm_int": methods["adpcm_int"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fill","flip_screen","flip_screen_set","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_dsw[0].read","m_dsw[1].read","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_fg_tilemap.set_scrollx","m_fg_tilemap.set_scrolly","m_mainbank.set_entry","m_msm.data_w","m_msm.reset_w","m_msm.set_output_gain","m_screen.update_partial","m_screen.vpos","m_sprgen.draw_sprites_8bit","m_tx_tilemap.draw","m_tx_tilemap.mark_tile_dirty","mark_tile_dirty","priority","read","screen.priority","set","set_entry","set_scrollx","set_scrolly","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
