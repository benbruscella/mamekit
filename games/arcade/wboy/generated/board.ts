// GENERATED executable machine composition from src/mame/sega/system1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'wboy');

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


  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_indirect"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_indirect", 0, undefined))(offset, runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset));
  }

  function method_videoram_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"];

    const h_m_maincpu = members.m_maincpu ?? runtime.member("m_maincpu");
    const h_m_videoram_bank = members.m_videoram_bank ?? runtime.member("m_videoram_bank");
    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (runtime.overrides["videoram_wait_states"] ? runtime.overrides["videoram_wait_states"](h_m_maincpu) : method_videoram_wait_states(runtime, h_m_maincpu));
    }
    offset = ((offset) | (((4096) * (((runtime.shiftRight(h_m_videoram_bank, 1)) % (runtime.divide((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages")), 2)))))));
    return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
  }

  function method_videoram_wait_states(runtime: any, cpu: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["cpu.total_cycles"], __L1: any = __l["total_cycles"], __L2: any = __l["cpu.adjust_icount"], __L3: any = __l["adjust_icount"];
    let __t0: any;

    let cpu_cycles_per_fixst: any = ((32) >>> 0);
    let fixst_offset: any = ((runtime.divide(cpu_cycles_per_fixst, 2)) >>> 0);
    let total_cycles: any = (((__L0 ?? runtime.memberCall(cpu, "total_cycles", 0, __L1))()) * (10));
    let cycles_until_next_fixst: any = ((((cpu_cycles_per_fixst) - (((((total_cycles) - (fixst_offset))) % (cpu_cycles_per_fixst))))) >>> 0);
    (__L2 ?? runtime.memberCall(cpu, "adjust_icount", 0, __L3))((-runtime.divide(((cycles_until_next_fixst) + (5)), 10)));
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_maincpu = members.m_maincpu ?? runtime.member("m_maincpu");
    const h_m_videoram_bank = members.m_videoram_bank ?? runtime.member("m_videoram_bank");
    (runtime.overrides["videoram_wait_states"] ? runtime.overrides["videoram_wait_states"](h_m_maincpu) : method_videoram_wait_states(runtime, h_m_maincpu));
    offset = ((offset) | (((4096) * (((runtime.shiftRight(h_m_videoram_bank, 1)) % (runtime.divide((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages")), 2)))))));
    if ((((((((((((Number((members.m_tilemap_pages ?? runtime.member("m_tilemap_pages"))) > Number(2)) ? 1 : 0)) && ((((offset) >= (1856)) ? 1 : 0))) ? 1 : 0)) && ((((offset) < (1864)) ? 1 : 0))) ? 1 : 0)) && (((Number(((offset) % (2))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    runtime.memberCall(runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), runtime.divide(offset, 2048)), "mark_tile_dirty", 0, undefined)(runtime.divide(((offset) % (2048)), 2));
  }

  function method_mixer_collision_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    return ((((runtime.readIndex((members.m_mix_collide ?? runtime.member("m_mix_collide")), ((offset) & (63)))) | (126))) | ((((members.m_mix_collide_summary ?? runtime.member("m_mix_collide_summary"))) << (7))));
  }

  function method_mixer_collision_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_mix_collide"), ((offset) & (63)), 0);
  }

  function method_mixer_collision_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_mix_collide_summary = ((0) & 0xff);
  }

  function method_sprite_collision_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    return ((((runtime.readIndex((members.m_sprite_collide ?? runtime.member("m_sprite_collide")), ((offset) & (1023)))) | (126))) | ((((members.m_sprite_collide_summary ?? runtime.member("m_sprite_collide_summary"))) << (7))));
  }

  function method_sprite_collision_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    runtime.writeIndex(runtime.writableMember("m_sprite_collide"), ((offset) & (1023)), 0);
  }

  function method_sprite_collision_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    members.m_sprite_collide_summary = ((0) & 0xff);
  }

  function method_tile_get_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tilemap.user_data"], __L1: any = __l["user_data"], __L2: any = __l["tileinfo.set"], __L3: any = __l["set"];
    let __t0: any;

    let rambase: any = runtime.byteView((__L0 ?? runtime.memberCall(tilemap, "user_data", 0, __L1))()); let rambase$s: any = undefined, rambase$o: any = 0; if (ArrayBuffer.isView(rambase) || Array.isArray(rambase)) rambase$s = rambase; else if (rambase !== null && typeof rambase === 'object' && rambase.generatedPointer === true && rambase.path === undefined && rambase.target === undefined && (ArrayBuffer.isView(rambase.source) || Array.isArray(rambase.source))) { rambase$s = rambase.source; rambase$o = rambase.offset; }
    let tiledata: any = (((((rambase$s !== undefined ? (rambase$s[rambase$o + (__add_tile_get_info(runtime, ((tile_index) * (2)), 0))] ?? 0) : runtime.readIndex(rambase, __add_tile_get_info(runtime, ((tile_index) * (2)), 0)))) | ((((rambase$s !== undefined ? (rambase$s[rambase$o + (__add_tile_get_info(runtime, ((tile_index) * (2)), 1))] ?? 0) : runtime.readIndex(rambase, __add_tile_get_info(runtime, ((tile_index) * (2)), 1)))) << (8))))) >>> 0);
    let code: any = ((((((((tiledata) >>> (4))) & (2048))) | (((tiledata) & (2047))))) >>> 0);
    let color: any = ((((((tiledata) >>> (5))) & (255))) >>> 0);
    (__L2 ?? runtime.memberCall(tileinfo, "set", 0, __L3))(0, code, color, 0);
  }
  function __add_tile_get_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_adjust_cycles(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.adjust_icount"];

    data = ((data) & 0xff);
    members.m_adjust_cycles = ((((__add_adjust_cycles(runtime, (members.m_adjust_cycles ?? runtime.member("m_adjust_cycles")), 2)) % (5))) & 0xff);
    if (((Number((members.m_adjust_cycles ?? runtime.member("m_adjust_cycles"))) <= Number(1)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(-1);
    }
  }
  function __add_adjust_cycles(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_soundirq_gen(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_soundcpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 2);
  }

  function method_soundport_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_soundlatch.write"], __L1: any = __l["attotime::from_usec"], __L2: any = __l["machine().scheduler().perfect_quantum"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_soundlatch, "write", 0, undefined))(data);
    ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().scheduler().perfect_quantum"))?.((__L1 ? __L1(100) : runtime.macro("attotime::from_usec", 100))) ?? 0);
  }

  function method_common_videomode_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"];

    data = ((data) & 0xff);
    members.m_video_mode = ((data) & 0xff);
    (__L0 ? __L0(((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
  }

  function method_screen_update_system1(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_tilemap_page[1].pixmap"], __L1: any = __l["pixmap"], __L2: any = __l["flip_screen"];
    let __t0: any;

    let bgpixmaps: any = new Array(Math.max(0, Math.trunc(Number(4)))).fill(0);
    let bgrowscroll: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32)))));
    bgpixmaps[0] = (bgpixmaps[1] = (bgpixmaps[2] = (bgpixmaps[3] = __deref_screen_update_system1(runtime, runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), 0))["pixmap&"]())));
    let fgpixmap: any = (__L0 ?? runtime.memberCall(runtime.readIndex((members.m_tilemap_page ?? runtime.member("m_tilemap_page")), 1), "pixmap", 0, __L1))();
    let xscroll: any = ((((__add_screen_update_system1(runtime, ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 4092)) | (((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 4093)) << (8)))), 28)) << 16 >> 16)) | 0);
    let yscroll: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 4029)) | 0);
    if ((__L2 ? __L2() : runtime.macro("flip_screen"))) {
      xscroll = ((((640) - (((xscroll) & (511))))) | 0);
      yscroll = ((((764) - (((yscroll) & (511))))) | 0);
    }
    for (let y: any = ((0) | 0); (((y) < (32)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      bgrowscroll[y] = xscroll;
    }
    (runtime.overrides["video_update_common"] ? runtime.overrides["video_update_common"](screen, bitmap, cliprect, fgpixmap, bgpixmaps, bgrowscroll, yscroll, 0) : method_video_update_common(runtime, screen, bitmap, cliprect, fgpixmap, bgpixmaps, bgrowscroll, yscroll, 0));
    return 0;
  }
  function __add_screen_update_system1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_screen_update_system1(runtime: any, p: any): any {
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

  function method_video_update_common(runtime: any, screen: any, bitmap: any, cliprect: any, fgpixmap: any, bgpixmaps: any, bgrowscroll: any, bgyscroll: any, spritexoffs: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["m_sprite_bitmap.fill"];

    const h_m_sprite_bitmap = members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap");
    const h_m_lookup_prom = members.m_lookup_prom ?? runtime.member("m_lookup_prom");
    if ((((members.m_video_mode ?? runtime.member("m_video_mode"))) & (16))) {
      (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(0, cliprect);
      return;
    }
    (__L2 ?? runtime.memberCall(members.m_sprite_bitmap, "fill", 0, __L1))(0, cliprect);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](h_m_sprite_bitmap, cliprect, spritexoffs) : method_draw_sprites(runtime, h_m_sprite_bitmap, cliprect, spritexoffs));
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let fgbase: any = fgpixmap["pix&"](((y) & (255))); let fgbase$s: any = undefined, fgbase$o: any = 0; if (ArrayBuffer.isView(fgbase) || Array.isArray(fgbase)) fgbase$s = fgbase; else if (fgbase !== null && typeof fgbase === 'object' && fgbase.generatedPointer === true && fgbase.path === undefined && fgbase.target === undefined && (ArrayBuffer.isView(fgbase.source) || Array.isArray(fgbase.source))) { fgbase$s = fgbase.source; fgbase$o = fgbase.offset; }
      let sprbase: any = h_m_sprite_bitmap["pix&"](((y) & (255))); let sprbase$s: any = undefined, sprbase$o: any = 0; if (ArrayBuffer.isView(sprbase) || Array.isArray(sprbase)) sprbase$s = sprbase; else if (sprbase !== null && typeof sprbase === 'object' && sprbase.generatedPointer === true && sprbase.path === undefined && sprbase.target === undefined && (ArrayBuffer.isView(sprbase.source) || Array.isArray(sprbase.source))) { sprbase$s = sprbase.source; sprbase$o = sprbase.offset; }
      let dstbase: any = bitmap["pix&"](y); let dstbase$s: any = undefined, dstbase$o: any = 0; if (ArrayBuffer.isView(dstbase) || Array.isArray(dstbase)) dstbase$s = dstbase; else if (dstbase !== null && typeof dstbase === 'object' && dstbase.generatedPointer === true && dstbase.path === undefined && dstbase.target === undefined && (ArrayBuffer.isView(dstbase.source) || Array.isArray(dstbase.source))) { dstbase$s = dstbase.source; dstbase$o = dstbase.offset; }
      let bgy: any = ((((((y) + (bgyscroll))) & (511))) | 0);
      let bgxscroll: any = ((runtime.readIndex(bgrowscroll, ((runtime.shiftRight(y, 3)) & (31)))) | 0);
      let bgbase: any = [__deref_video_update_common(runtime, runtime.readIndex(bgpixmaps, __add_video_update_common(runtime, ((runtime.shiftRight(bgy, 8)) * (2)), 0)))["pix&"](((bgy) & (255))), __deref_video_update_common(runtime, runtime.readIndex(bgpixmaps, __add_video_update_common(runtime, ((runtime.shiftRight(bgy, 8)) * (2)), 1)))["pix&"](((bgy) & (255)))];
      for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let bgx: any = ((((runtime.divide(((x) - (bgxscroll)), 2)) & (511))) | 0);
        let fgpix: any = (((fgbase$s !== undefined ? (fgbase$s[fgbase$o + (((runtime.divide(x, 2)) & (255)))] ?? 0) : runtime.readIndex(fgbase, ((runtime.divide(x, 2)) & (255))))) & 0xffff);
        let bgpix: any = ((runtime.readIndex((bgbase[runtime.shiftRight(bgx, 8)] ?? 0), ((bgx) & (255)))) & 0xffff);
        let sprpix: any = (((sprbase$s !== undefined ? (sprbase$s[sprbase$o + (x)] ?? 0) : runtime.readIndex(sprbase, x))) & 0xffff);
        let lookup_index: any = ((((((((((((((Number(((sprpix) & (15))) === Number(0)) ? 1 : 0)) << (0))) | (((((Number(((fgpix) & (7))) === Number(0)) ? 1 : 0)) << (1))))) | (((((((fgpix) >>> (9))) & (3))) << (2))))) | (((((Number(((bgpix) & (7))) === Number(0)) ? 1 : 0)) << (4))))) | (((((((bgpix) >>> (9))) & (3))) << (5))))) & 0xff);
        let lookup_value: any = ((runtime.readIndex(h_m_lookup_prom, lookup_index)) & 0xff);
        if (((((lookup_value) & (4))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_mix_collide"), ((((((lookup_value) & (8))) << (2))) | (((((sprpix) >>> (4))) & (31)))), (members.m_mix_collide_summary = ((1) & 0xff)));
        }
        lookup_value = ((((lookup_value) & (3))) & 0xff);
        if ((((lookup_value) === (0)) ? 1 : 0)) {
          runtime.writeIndex(dstbase, x, ((0) | (((sprpix) & (511)))));
        } else {
          if ((((lookup_value) === (1)) ? 1 : 0)) {
            runtime.writeIndex(dstbase, x, ((512) | (((fgpix) & (511)))));
          } else {
            runtime.writeIndex(dstbase, x, ((1024) | (((bgpix) & (511)))));
          }
        }
      }
    }
  }
  function __add_video_update_common(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_video_update_common(runtime: any, p: any): any {
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, xoffset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"];

    let gfxbanks: any = ((runtime.divide(runtime.container(members.m_spriterom, "bytes"), 32768)) >>> 0);
    let flipscreen: any = (((__L0 ? __L0() : runtime.macro("flip_screen"))) | 0);
    for (let spritenum: any = ((0) | 0); (((spritenum) < (32)) ? 1 : 0); spritenum = ((((spritenum) + (1))) | 0)) {
      let spritedata: any = __addr_draw_sprites(runtime, (members.m_spriteram ?? runtime.member("m_spriteram")), ((spritenum) * (16))); let spritedata$s: any = undefined, spritedata$o: any = 0; if (ArrayBuffer.isView(spritedata) || Array.isArray(spritedata)) spritedata$s = spritedata; else if (spritedata !== null && typeof spritedata === 'object' && spritedata.generatedPointer === true && spritedata.path === undefined && spritedata.target === undefined && (ArrayBuffer.isView(spritedata.source) || Array.isArray(spritedata.source))) { spritedata$s = spritedata.source; spritedata$o = spritedata.offset; }
      let srcaddr: any = ((__add_draw_sprites(runtime, (spritedata$s !== undefined ? (spritedata$s[spritedata$o + (6)] ?? 0) : runtime.readIndex(spritedata, 6)), (((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (7)] ?? 0) : runtime.readIndex(spritedata, 7))) << (8)))) & 0xffff);
      let stride: any = ((__add_draw_sprites(runtime, (spritedata$s !== undefined ? (spritedata$s[spritedata$o + (4)] ?? 0) : runtime.readIndex(spritedata, 4)), (((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (5)] ?? 0) : runtime.readIndex(spritedata, 5))) << (8)))) & 0xffff);
      let bank: any = ((((((runtime.shiftRight((((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (3)] ?? 0) : runtime.readIndex(spritedata, 3))) & (128)), 7)) | (runtime.shiftRight((((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (3)] ?? 0) : runtime.readIndex(spritedata, 3))) & (64)), 5)))) | (runtime.shiftRight((((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (3)] ?? 0) : runtime.readIndex(spritedata, 3))) & (32)), 3)))) & 0xff);
      let xstart: any = (((((((((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (2)] ?? 0) : runtime.readIndex(spritedata, 2))) | ((((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (3)] ?? 0) : runtime.readIndex(spritedata, 3))) << (8))))) & (511))) + (xoffset))) | 0);
      let bottom: any = ((__add_draw_sprites(runtime, (spritedata$s !== undefined ? (spritedata$s[spritedata$o + (1)] ?? 0) : runtime.readIndex(spritedata, 1)), 1)) | 0);
      let top: any = ((__add_draw_sprites(runtime, (spritedata$s !== undefined ? (spritedata$s[spritedata$o + (0)] ?? 0) : runtime.readIndex(spritedata, 0)), 1)) | 0);
      let palettebase: any = ((((spritenum) * (16))) & 0xffff);
      if (((Number((spritedata$s !== undefined ? (spritedata$s[spritedata$o + (0)] ?? 0) : runtime.readIndex(spritedata, 0))) === Number(255)) ? 1 : 0)) {
        return;
      }
      bank = ((((bank) % (gfxbanks))) & 0xff);
      let gfxbankbase: any = __addr_draw_sprites(runtime, (members.m_spriterom ?? runtime.member("m_spriterom")), ((bank) * (32768))); let gfxbankbase$s: any = undefined, gfxbankbase$o: any = 0; if (ArrayBuffer.isView(gfxbankbase) || Array.isArray(gfxbankbase)) gfxbankbase$s = gfxbankbase; else if (gfxbankbase !== null && typeof gfxbankbase === 'object' && gfxbankbase.generatedPointer === true && gfxbankbase.path === undefined && gfxbankbase.target === undefined && (ArrayBuffer.isView(gfxbankbase.source) || Array.isArray(gfxbankbase.source))) { gfxbankbase$s = gfxbankbase.source; gfxbankbase$o = gfxbankbase.offset; }
      if (flipscreen) {
        let temp: any = ((top) | 0);
        top = ((((256) - (bottom))) | 0);
        bottom = ((((256) - (temp))) | 0);
      }
      for (let y: any = ((top) | 0); (((y) < (bottom)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let destbase: any = bitmap["pix&"](y); let destbase$s: any = undefined, destbase$o: any = 0; if (ArrayBuffer.isView(destbase) || Array.isArray(destbase)) destbase$s = destbase; else if (destbase !== null && typeof destbase === 'object' && destbase.generatedPointer === true && destbase.path === undefined && destbase.target === undefined && (ArrayBuffer.isView(destbase.source) || Array.isArray(destbase.source))) { destbase$s = destbase.source; destbase$o = destbase.offset; }
        srcaddr = ((((srcaddr) + (stride))) & 0xffff);
        if ((((((Number(y) < Number(cliprect.min_y)) ? 1 : 0)) || (((Number(y) > Number(cliprect.max_y)) ? 1 : 0))) ? 1 : 0)) {
          continue;
        }
        let addrdelta: any = ((((((srcaddr) & (32768))) ? (-1) : (1))) | 0);
        for (let x: any = ((xstart) | 0), curaddr: any = ((srcaddr) | 0); 1; x = ((((x) + (4))) | 0), curaddr = ((((curaddr) + (addrdelta))) | 0)) {
          let color1: any = ((0) & 0xff);
          let color2: any = ((0) & 0xff);
          let data: any = (((gfxbankbase$s !== undefined ? (gfxbankbase$s[gfxbankbase$o + (((curaddr) & (32767)))] ?? 0) : runtime.readIndex(gfxbankbase, ((curaddr) & (32767))))) & 0xff);
          if (((((curaddr) & (32768))) ? 0 : 1)) {
            color1 = ((((data) >>> (4))) & 0xff);
            color2 = ((((data) & (15))) & 0xff);
          } else {
            color1 = ((((data) & (15))) & 0xff);
            color2 = ((((data) >>> (4))) & 0xff);
          }
          if ((((color1) === (15)) ? 1 : 0)) {
            break;
          }
          if ((((color1) !== (0)) ? 1 : 0)) {
            for (let i: any = ((0) | 0); (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
              let effx: any = ((((flipscreen) ? (((510) - (((x) + (i))))) : (((x) + (i))))) | 0);
              if ((((((Number(effx) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(effx) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) {
                let prevpix: any = (((destbase$s !== undefined ? (destbase$s[destbase$o + (effx)] ?? 0) : runtime.readIndex(destbase, effx))) | 0);
                if (((Number(((prevpix) & (15))) !== Number(0)) ? 1 : 0)) {
                  runtime.writeIndex(runtime.writableMember("m_sprite_collide"), __add_draw_sprites(runtime, ((runtime.shiftRight(prevpix, 4)) & (31)), ((32) * (spritenum))), (members.m_sprite_collide_summary = ((1) & 0xff)));
                }
                runtime.writeIndex(destbase, effx, ((color1) | (palettebase)));
              }
            }
          }
          if ((((color2) === (15)) ? 1 : 0)) {
            break;
          }
          if ((((color2) !== (0)) ? 1 : 0)) {
            for (let i: any = ((0) | 0); (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
              let effx: any = ((((flipscreen) ? (((510) - (((((x) + (2))) + (i))))) : (((((x) + (2))) + (i))))) | 0);
              if ((((((Number(effx) >= Number(cliprect.min_x)) ? 1 : 0)) && (((Number(effx) <= Number(cliprect.max_x)) ? 1 : 0))) ? 1 : 0)) {
                let prevpix: any = (((destbase$s !== undefined ? (destbase$s[destbase$o + (effx)] ?? 0) : runtime.readIndex(destbase, effx))) | 0);
                if (((Number(((prevpix) & (15))) !== Number(0)) ? 1 : 0)) {
                  runtime.writeIndex(runtime.writableMember("m_sprite_collide"), __add_draw_sprites(runtime, ((runtime.shiftRight(prevpix, 4)) & (31)), ((32) * (spritenum))), (members.m_sprite_collide_summary = ((1) & 0xff)));
                }
                runtime.writeIndex(destbase, effx, ((color2) | (palettebase)));
              }
            }
          }
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
  function __addr_draw_sprites(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_system1_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t"], __L1: any = __l["palette.set_indirect_color"], __L2: any = __l["set_indirect_color"];

    const h_m_color_prom = members.m_color_prom ?? runtime.member("m_color_prom");
    if (((h_m_color_prom) ? 1 : 0)) {
      for (let pal: any = ((0) | 0); (((pal) < (256)) ? 1 : 0); pal = ((((pal) + (1))) | 0)) {
        let val: any = ((0) & 0xff);
        val = ((runtime.readIndex(h_m_color_prom, ((pal) + (0)))) & 0xff);
        let r: any = ((__add_system1_palette(runtime, __add_system1_palette(runtime, __add_system1_palette(runtime, ((14) * ((((val) >>> (0)) & 1))), ((31) * ((((val) >>> (1)) & 1)))), ((67) * ((((val) >>> (2)) & 1)))), ((143) * ((((val) >>> (3)) & 1))))) & 0xff);
        val = ((runtime.readIndex(h_m_color_prom, ((pal) + (256)))) & 0xff);
        let g: any = ((__add_system1_palette(runtime, __add_system1_palette(runtime, __add_system1_palette(runtime, ((14) * ((((val) >>> (0)) & 1))), ((31) * ((((val) >>> (1)) & 1)))), ((67) * ((((val) >>> (2)) & 1)))), ((143) * ((((val) >>> (3)) & 1))))) & 0xff);
        val = ((runtime.readIndex(h_m_color_prom, ((pal) + (512)))) & 0xff);
        let b: any = ((__add_system1_palette(runtime, __add_system1_palette(runtime, __add_system1_palette(runtime, ((14) * ((((val) >>> (0)) & 1))), ((31) * ((((val) >>> (1)) & 1)))), ((67) * ((((val) >>> (2)) & 1)))), ((143) * ((((val) >>> (3)) & 1))))) & 0xff);
        (__L1 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L2))(pal, (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
      }
    } else {
      let resistances_rg: any = new Int32Array([995, 495, 250]);
      let resistances_b: any = new Int32Array([495, 250]);
      let weights_r: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
      let weights_g: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
      let weights_b: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
      (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, resistances_rg, weights_r, 0, 0, 3, resistances_rg, weights_g, 0, 0, 2, resistances_b, weights_b, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, resistances_rg, weights_r, 0, 0, 3, resistances_rg, weights_g, 0, 0, 2, resistances_b, weights_b, 0, 0));
      for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let bit0: any = ((0) | 0);
        let bit1: any = ((0) | 0);
        let bit2: any = ((0) | 0);
        bit0 = (((((i) >>> (0)) & 1)) | 0);
        bit1 = (((((i) >>> (1)) & 1)) | 0);
        bit2 = (((((i) >>> (2)) & 1)) | 0);
        let r: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](weights_r, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, weights_r, bit0, bit1, bit2))) | 0);
        bit0 = (((((i) >>> (3)) & 1)) | 0);
        bit1 = (((((i) >>> (4)) & 1)) | 0);
        bit2 = (((((i) >>> (5)) & 1)) | 0);
        let g: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](weights_g, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, weights_g, bit0, bit1, bit2))) | 0);
        bit0 = (((((i) >>> (6)) & 1)) | 0);
        bit1 = (((((i) >>> (7)) & 1)) | 0);
        let b: any = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](weights_b, bit0, bit1) : method_combine_weights__int__2(runtime, weights_b, bit0, bit1))) | 0);
        (__L1 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L2))(i, (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
      }
    }
  }
  function __add_system1_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
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
    "paletteram_w": method_paletteram_w,
    "videoram_r": method_videoram_r,
    "videoram_wait_states": method_videoram_wait_states,
    "videoram_w": method_videoram_w,
    "mixer_collision_r": method_mixer_collision_r,
    "mixer_collision_w": method_mixer_collision_w,
    "mixer_collision_reset_w": method_mixer_collision_reset_w,
    "sprite_collision_r": method_sprite_collision_r,
    "sprite_collision_w": method_sprite_collision_w,
    "sprite_collision_reset_w": method_sprite_collision_reset_w,
    "tile_get_info": method_tile_get_info,
    "adjust_cycles": method_adjust_cycles,
    "soundirq_gen": method_soundirq_gen,
    "soundport_w": method_soundport_w,
    "common_videomode_w": method_common_videomode_w,
    "screen_update_system1": method_screen_update_system1,
    "video_update_common": method_video_update_common,
    "draw_sprites": method_draw_sprites,
    "system1_palette": method_system1_palette,
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
      "system1_state.paletteram_w": methods["paletteram_w"],
      "system1_state.videoram_r": methods["videoram_r"],
      "system1_state.videoram_wait_states": methods["videoram_wait_states"],
      "system1_state.videoram_w": methods["videoram_w"],
      "system1_state.mixer_collision_r": methods["mixer_collision_r"],
      "system1_state.mixer_collision_w": methods["mixer_collision_w"],
      "system1_state.mixer_collision_reset_w": methods["mixer_collision_reset_w"],
      "system1_state.sprite_collision_r": methods["sprite_collision_r"],
      "system1_state.sprite_collision_w": methods["sprite_collision_w"],
      "system1_state.sprite_collision_reset_w": methods["sprite_collision_reset_w"],
      "system1_state.tile_get_info": methods["tile_get_info"],
      "system1_state.adjust_cycles": methods["adjust_cycles"],
      "system1_state.soundirq_gen": methods["soundirq_gen"],
      "system1_state.soundport_w": methods["soundport_w"],
      "system1_state.common_videomode_w": methods["common_videomode_w"],
      "system1_state.screen_update_system1": methods["screen_update_system1"],
      "system1_state.video_update_common": methods["video_update_common"],
      "system1_state.draw_sprites": methods["draw_sprites"],
      "system1_state.system1_palette": methods["system1_palette"],
      "system1_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "system1_state.combine_weights__int__3": methods["combine_weights__int__3"],
      "system1_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
      "system1_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
      "system1_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
      "system1_state.combine_weights__int__2": methods["combine_weights__int__2"],
      "system1_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
      "system1_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust_icount","attotime::from_usec","bitmap.fill","cpu.adjust_icount","cpu.total_cycles","fatalerror","fill","flip_screen","flip_screen_set","m_maincpu.adjust_icount","m_palette.set_pen_indirect","m_screen.update_partial","m_screen.vpos","m_soundcpu.set_input_line","m_soundlatch.write","m_sprite_bitmap.fill","m_tilemap_page[1].pixmap","machine","machine().scheduler().perfect_quantum","machine().side_effects_disabled","palette.set_indirect_color","pixmap","rgb_t","set","set_indirect_color","std::clamp","tileinfo.set","tilemap.user_data","total_cycles","user_data"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
