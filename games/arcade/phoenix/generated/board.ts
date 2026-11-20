// GENERATED executable machine composition from src/mame/phoenix/phoenix.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'phoenix');

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


  function method_phoenix_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["m_bg_tilemap.mark_tile_dirty"], __L2: any = __l["mark_tile_dirty"], __L3: any = __l["m_fg_tilemap.mark_tile_dirty"];
    let __t0: any;

    data = ((data) & 0xff);
    let rom: any = (__t0 = __deref_phoenix_videoram_w(runtime, (__L0 ? __L0("maincpu") : runtime.macro("memregion", "maincpu"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("maincpu") : runtime.macro("memregion", "maincpu")), "base")); let rom$s: any = undefined, rom$o: any = 0; if (ArrayBuffer.isView(rom) || Array.isArray(rom)) rom$s = rom; else if (rom !== null && typeof rom === 'object' && rom.generatedPointer === true && rom.path === undefined && rom.target === undefined && (ArrayBuffer.isView(rom.source) || Array.isArray(rom.source))) { rom$s = rom.source; rom$o = rom.offset; }
    runtime.writeIndex(runtime.readIndex((members.m_videoram_pg ?? runtime.member("m_videoram_pg")), (members.m_videoram_pg_index ?? runtime.member("m_videoram_pg_index"))), offset, data);
    if (((Number(((offset) & (2047))) < Number(832)) ? 1 : 0)) {
      if (((offset) & (2048))) {
        (__L1 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L2))(((offset) & (1023)));
      } else {
        (__L3 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L2))(((offset) & (1023)));
      }
    }
    runtime.writeIndex(rom, ((offset) + (16384)), data);
  }
  function __deref_phoenix_videoram_w(runtime: any, p: any): any {
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

  function method_phoenix_scroll_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, data);
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((0) | 0);
    let col: any = ((0) | 0);
    code = ((runtime.readIndex(runtime.readIndex((members.m_videoram_pg ?? runtime.member("m_videoram_pg")), (members.m_videoram_pg_index ?? runtime.member("m_videoram_pg_index"))), tile_index)) | 0);
    col = ((runtime.shiftRight(code, 5)) | 0);
    col = ((((((col) | (8))) | ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) << (4))))) | 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(1, code, col, 0);
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((0) | 0);
    let col: any = ((0) | 0);
    code = ((runtime.readIndex(runtime.readIndex((members.m_videoram_pg ?? runtime.member("m_videoram_pg")), (members.m_videoram_pg_index ?? runtime.member("m_videoram_pg_index"))), ((tile_index) + (2048)))) | 0);
    col = ((runtime.shiftRight(code, 5)) | 0);
    col = ((((((col) | (0))) | ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) << (4))))) | 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, col, 0);
  }

  function method_screen_update_phoenix(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.draw"], __L1: any = __l["draw"], __L2: any = __l["m_fg_tilemap.draw"];

    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
    (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
    return 0;
  }

  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["c_state"], __L1: any = __l["n_state"], __L2: any = __l["machine"], __L3: any = __l["machine().sample_rate"], __L4: any = __l["stream_alloc"], __L5: any = __l["NAME"], __L6: any = __l["save_item"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let shiftreg: any = ((0) >>> 0);
    members.m_sound_latch_a = 0;
    members.m_c24_state = (__L0 ? __L0() : runtime.macro("c_state"));
    members.m_c25_state = (__L0 ? __L0() : runtime.macro("c_state"));
    members.m_noise_state = (__L1 ? __L1() : runtime.macro("n_state"));
    members.m_poly18 = (runtime.overrides["ALLOC32"] ? runtime.overrides["ALLOC32"](8192) : new Uint32Array(Math.max(0, Number(8192))));
    shiftreg = ((0) >>> 0);
    for (i = ((0) | 0); ((Number(i) < Number(8192)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let bits: any = ((0) >>> 0);
      for (j = ((0) | 0); (((j) < (32)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        bits = ((((((bits) >>> (1))) | (((shiftreg) << (31))))) >>> 0);
        if (((Number(((((shiftreg) >>> (16))) & (1))) === Number(((((shiftreg) >>> (17))) & (1)))) ? 1 : 0)) {
          shiftreg = ((((((shiftreg) << (1))) | (1))) >>> 0);
        } else {
          shiftreg = ((((shiftreg) << (1))) >>> 0);
        }
      }
      runtime.writeIndex(runtime.writableMember("m_poly18"), i, bits);
    }
    members.m_channel = (__L4 ? __L4(0, 1, ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)) : runtime.macro("stream_alloc", 0, 1, ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().sample_rate"))?.() ?? 0)));
    (__L6 ? __L6((__L5 ? __L5((members.m_sound_latch_a ?? runtime.member("m_sound_latch_a"))) : runtime.macro("NAME", (members.m_sound_latch_a ?? runtime.member("m_sound_latch_a"))))) : runtime.macro("save_item", (__L5 ? __L5((members.m_sound_latch_a ?? runtime.member("m_sound_latch_a"))) : runtime.macro("NAME", (members.m_sound_latch_a ?? runtime.member("m_sound_latch_a"))))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).counter))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).counter))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).level) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).level))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).level) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c24_state ?? runtime.member("m_c24_state"))).level))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).counter))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).counter))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).level) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).level))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).level) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_c25_state ?? runtime.member("m_c25_state"))).level))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).counter))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).counter))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polybit) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polybit))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polybit) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polybit))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polyoffs) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polyoffs))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polyoffs) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).polyoffs))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_counter))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_counter) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_counter))));
    (__L6 ? __L6((__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_polybit) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_polybit))) : runtime.macro("save_item", (__L5 ? __L5(__deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_polybit) : runtime.macro("NAME", __deref_device_start(runtime, (members.m_noise_state ?? runtime.member("m_noise_state"))).lowpass_polybit))));
  }
  function __deref_device_start(runtime: any, p: any): any {
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

  function method_player_input_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any, __t1: any;

    if ((members.m_cocktail_mode ?? runtime.member("m_cocktail_mode"))) {
      return runtime.shiftRight((((__t0 = __deref_player_input_r(runtime, (__L0 ? __L0("CTRL") : runtime.macro("ioport", "CTRL"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("CTRL") : runtime.macro("ioport", "CTRL")), "read"))) & (240)), 4);
    } else {
      return runtime.shiftRight((((__t1 = __deref_player_input_r(runtime, (__L0 ? __L0("CTRL") : runtime.macro("ioport", "CTRL"))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0("CTRL") : runtime.macro("ioport", "CTRL")), "read"))) & (15)), 0);
    }
  }
  function __deref_player_input_r(runtime: any, p: any): any {
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

  function method_phoenix_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["palette.set_pen_color"], __L2: any = __l["set_pen_color"], __L3: any = __l["palette.palette"], __L4: any = __l["palette"];
    let __t0: any, __t1: any;

    const h_phoenix_decode_info = members.phoenix_decode_info ?? runtime.member("phoenix_decode_info");
    const h_phoenix_net_info = members.phoenix_net_info ?? runtime.member("phoenix_net_info");
    let color_prom: any = (__t0 = __deref_phoenix_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base")); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    let rgb: any = [];
    (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_phoenix_decode_info, h_phoenix_net_info) : method_compute_res_net_all(runtime, rgb, color_prom, h_phoenix_decode_info, h_phoenix_net_info));
    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let col: any = ((((((i) >>> (6)) & 1) << 6 | (((i) >>> (5)) & 1) << 5 | (((i) >>> (1)) & 1) << 4 | (((i) >>> (0)) & 1) << 3 | (((i) >>> (4)) & 1) << 2 | (((i) >>> (3)) & 1) << 1 | (((i) >>> (2)) & 1) << 0)) | 0);
      (__L1 ?? runtime.memberCall(palette, "set_pen_color", 0, __L2))(i, (rgb[col] ?? 0));
    }
    runtime.memberCall((__L3 ?? runtime.memberCall(palette, "palette", 0, __L4))(), "normalize_range", 0, undefined)(0, 255);
  }
  function __deref_phoenix_palette(runtime: any, p: any): any {
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

  function method_compute_res_net_all(runtime: any, rgb: any, prom: any, rdi: any, di: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t"];

    (rgb = runtime.resize(rgb, __add_compute_res_net_all(runtime, runtime.subtract(rdi.end, rdi.start), 1)));
    for (let i: any = ((rdi.start) | 0); ((Number(i) <= Number(rdi.end)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let t: any = [0, 0, 0];
      for (let j: any = ((0) | 0); ((Number(j) < Number(rdi.numcomp)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        for (let k: any = ((0) | 0); (((k) < (3)) ? 1 : 0); k = ((((k) + (1))) | 0)) {
          let s: any = ((runtime.readIndex(rdi.shift, ((((3) * (j))) + (k)))) | 0);
          if ((((s) > (0)) ? 1 : 0)) {
            t[k] = (((t[k] ?? 0)) | (((runtime.shiftRight(runtime.readIndex(prom, ((i) + (runtime.readIndex(rdi.offset, ((((3) * (j))) + (k)))))), s)) & (runtime.readIndex(rdi.mask, ((((3) * (j))) + (k)))))));
          } else {
            t[k] = (((t[k] ?? 0)) | (((((runtime.readIndex(prom, ((i) + (runtime.readIndex(rdi.offset, ((((3) * (j))) + (k))))))) << (((0) - (s))))) & (runtime.readIndex(rdi.mask, ((((3) * (j))) + (k)))))));
          }
        }
      }
      let r: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[0] ?? 0), 0, di) : method_compute_res_net(runtime, (t[0] ?? 0), 0, di))) & 0xff);
      let g: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[1] ?? 0), 1, di) : method_compute_res_net(runtime, (t[1] ?? 0), 1, di))) & 0xff);
      let b: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[2] ?? 0), 2, di) : method_compute_res_net(runtime, (t[2] ?? 0), 2, di))) & 0xff);
      runtime.writeIndex(rgb, ((i) - (rdi.start)), (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
  }
  function __add_compute_res_net_all(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_compute_res_net(runtime: any, inputs: any, channel: any, di: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["fatalerror"];

    let rTotal: any = 0;
    let v: any = 0;
    let vBias: any = runtime.readIndex(di.rgb, channel).vBias;
    let vOH: any = di.vOH;
    let vOL: any = di.vOL;
    let minout: any = runtime.readIndex(di.rgb, channel).minout;
    let cut: any = runtime.readIndex(di.rgb, channel).cut;
    let vcc: any = di.vcc;
    let ttlHRes: any = 0;
    let rGnd: any = runtime.readIndex(di.rgb, channel).rGnd;
    let OpenCol: any = ((di.OpenCol) & 0xff);
    switch ((((di.options) & (7)) as number)) {
      case 0:
      {
        break;
      }
      case 1:
      {
        minout = 0;
        cut = 0;
        break;
      }
      case 2:
      {
        minout = 0.9;
        cut = 0;
        break;
      }
      case 3:
      {
        minout = 0;
        cut = 0.7;
        break;
      }
      case 4:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown amplifier type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown amplifier type\n"));
      }
    }
    switch ((((di.options) & (8)) as number)) {
      case 0:
      {
        vcc = 5;
        break;
      }
      case 8:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
      }
    }
    switch ((((di.options) & (48)) as number)) {
      case 0:
      {
        break;
      }
      case 16:
      {
        vBias = 5;
        break;
      }
      case 32:
      {
        vBias = 4;
        break;
      }
      case 48:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
      }
    }
    switch ((((di.options) & (768)) as number)) {
      case 0:
      {
        OpenCol = ((1) & 0xff);
        vOL = 0.05;
        break;
      }
      case 256:
      {
        vOL = 0;
        vOH = vcc;
        OpenCol = ((0) & 0xff);
        break;
      }
      case 512:
      {
        vOL = 0.05;
        vOH = 4;
        ttlHRes = 50;
        OpenCol = ((0) & 0xff);
        break;
      }
      case 768:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vin type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vin type\n"));
      }
    }
    switch ((((runtime.readIndex(di.rgb, channel).options) & (7)) as number)) {
      case 0:
      {
        break;
      }
      case 1:
      {
        minout = 0;
        cut = 0;
        break;
      }
      case 2:
      {
        minout = 0.7;
        cut = 0;
        break;
      }
      case 3:
      {
        minout = 0;
        cut = 0.7;
        break;
      }
      case 4:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown amplifier type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown amplifier type\n"));
      }
    }
    switch ((((runtime.readIndex(di.rgb, channel).options) & (48)) as number)) {
      case 0:
      {
        break;
      }
      case 16:
      {
        vBias = 5;
        break;
      }
      case 32:
      {
        vBias = 4;
        break;
      }
      case 48:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
      }
    }
    switch ((((di.options) & (12288)) as number)) {
      case 4096:
      case 8192:
      {
        break;
      }
      case 12288:
      {
        if ((((rGnd) !== (0)) ? 1 : 0)) {
          rGnd = ((((rGnd) * (5600))) / (((rGnd) + (5600))));
        } else {
          rGnd = 5600;
        }
        break;
      }
    }
    for (let i: any = ((0) | 0); ((Number(i) < Number(runtime.readIndex(di.rgb, channel).num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let level: any = ((((runtime.shiftRight(inputs, i)) & (1))) | 0);
      if ((((((Number(runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) !== Number(0)) ? 1 : 0)) && (((level) ? 0 : 1))) ? 1 : 0)) {
        if (OpenCol) {
          rTotal = ((rTotal) + (((1) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
          v = ((v) + (((vOL) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
        } else {
          rTotal = ((rTotal) + (((1) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
          v = ((v) + (((vOL) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
        }
      }
    }
    if (((Number(runtime.readIndex(di.rgb, channel).rBias) !== Number(0)) ? 1 : 0)) {
      rTotal = ((rTotal) + (((1) / (runtime.readIndex(di.rgb, channel).rBias))));
      v = ((v) + (((vBias) / (runtime.readIndex(di.rgb, channel).rBias))));
    }
    if ((((rGnd) !== (0)) ? 1 : 0)) {
      rTotal = ((rTotal) + (((1) / (rGnd))));
    }
    if (((Number(((di.options) & (768))) === Number(512)) ? 1 : 0)) {
      if (((Number(((v) / (rTotal))) > Number(vOH)) ? 1 : 0)) {
        OpenCol = ((1) & 0xff);
      }
    }
    for (let i: any = ((0) | 0); ((Number(i) < Number(runtime.readIndex(di.rgb, channel).num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let level: any = ((((runtime.shiftRight(inputs, i)) & (1))) | 0);
      if ((((((Number(runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) !== Number(0)) ? 1 : 0)) && (level)) ? 1 : 0)) {
        if (OpenCol) {
          rTotal = ((rTotal) + (0));
          v = ((v) + (0));
        } else {
          rTotal = ((rTotal) + (((1) / (((runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) + (ttlHRes))))));
          v = ((v) + (((vOH) / (((runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) + (ttlHRes))))));
        }
      }
    }
    rTotal = ((1) / (rTotal));
    v = ((v) * (rTotal));
    v = cppMax(+(minout), +(((v) - (cut))));
    switch ((((di.options) & (12288)) as number)) {
      case 4096:
      {
        v = ((vcc) - (v));
        break;
      }
      case 8192:
      {
        v = ((vcc) - (v));
        v = cppMax(+(0), +(((v) - (0.7))));
        v = cppMin(+(v), +(((vcc) - (((2) * (0.7))))));
        v = ((v) / (((vcc) - (1.4))));
        v = ((v) * (vcc));
        break;
      }
      case 12288:
      {
        break;
      }
    }
    return ((__add_compute_res_net(runtime, ((((v) * (255))) / (vcc)), 0.4)) | 0);
  }
  function __add_compute_res_net(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "phoenix_videoram_w": method_phoenix_videoram_w,
    "phoenix_scroll_w": method_phoenix_scroll_w,
    "get_fg_tile_info": method_get_fg_tile_info,
    "get_bg_tile_info": method_get_bg_tile_info,
    "screen_update_phoenix": method_screen_update_phoenix,
    "device_start": method_device_start,
    "player_input_r": method_player_input_r,
    "phoenix_palette": method_phoenix_palette,
    "compute_res_net_all": method_compute_res_net_all,
    "compute_res_net": method_compute_res_net
  };
  return __methodTable;
})();
    return {
      "phoenix_state.phoenix_videoram_w": methods["phoenix_videoram_w"],
      "phoenix_state.phoenix_scroll_w": methods["phoenix_scroll_w"],
      "phoenix_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "phoenix_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "phoenix_state.screen_update_phoenix": methods["screen_update_phoenix"],
      "phoenix_state.player_input_r": methods["player_input_r"],
      "phoenix_state.phoenix_palette": methods["phoenix_palette"],
      "phoenix_state.compute_res_net_all": methods["compute_res_net_all"],
      "phoenix_state.compute_res_net": methods["compute_res_net"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["NAME","c_state","draw","fatalerror","ioport","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","machine","machine().sample_rate","mark_tile_dirty","memregion","n_state","palette","palette.palette","palette.set_pen_color","rgb_t","save_item","set","set_pen_color","set_scrollx","stream_alloc","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
