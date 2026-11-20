// GENERATED executable machine composition from src/mame/atari/atarisy1.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'marble');

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


  function method_int3state_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_scanline_int_state ?? runtime.member("m_scanline_int_state"))) ? (128) : (0));
  }

  function method_xscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["m_playfield_tilemap.set_scrollx"];
    let __t0: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    const h_m_xscroll = members.m_xscroll ?? runtime.member("m_xscroll");
    let oldscroll: any = ((__deref_xscroll_w(runtime, h_m_xscroll)) & 0xffff);
    let newscroll: any = ((oldscroll) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => newscroll, set: (value: any) => { newscroll = ((value) & 0xffff); } }), offset: 0 }), data, mem_mask);
    if ((((oldscroll) !== (newscroll)) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    (__L2 ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrollx", 0, undefined))(0, newscroll);
    runtime.pointerStore(h_m_xscroll, newscroll);
  }
  function __deref_xscroll_w(runtime: any, p: any): any {
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

  function method_yscroll_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["m_screen.visible_area"], __L3: any = __l["m_playfield_tilemap.set_scrolly"], __L4: any = __l["m_screen.time_until_pos"], __L5: any = __l["m_yscroll_reset_timer.adjust"];
    let __t0: any, __t1: any, __t2: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    let oldscroll: any = ((__deref_yscroll_w(runtime, (members.m_yscroll ?? runtime.member("m_yscroll")))) & 0xffff);
    let newscroll: any = ((oldscroll) & 0xffff);
    let scanline: any = (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => newscroll, set: (value: any) => { newscroll = ((value) & 0xffff); } }), offset: 0 }), data, mem_mask);
    (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))(scanline);
    let adjusted_scroll: any = ((newscroll) | 0);
    if (((Number(scanline) <= Number((__t2 = __deref_yscroll_w(runtime, (__L2 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))()), typeof __t2.bottom === 'function' ? (__t2.bottom() ?? 0) : runtime.container((__L2 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))(), "bottom")))) ? 1 : 0)) {
      adjusted_scroll = ((((adjusted_scroll) - (((scanline) + (1))))) | 0);
    }
    (__L3 ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrolly", 0, undefined))(0, adjusted_scroll);
    (__L5 ?? runtime.memberCall(members.m_yscroll_reset_timer, "adjust", 0, undefined))((__L4 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(0), newscroll);
    runtime.pointerStore((members.m_yscroll ?? runtime.member("m_yscroll")), newscroll);
  }
  function __deref_yscroll_w(runtime: any, p: any): any {
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

  function method_priority_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    let oldpens: any = (((members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))) & 0xffff);
    let newpens: any = ((oldpens) & 0xffff);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => newpens, set: (value: any) => { newpens = ((value) & 0xffff); } }), offset: 0 }), data, mem_mask);
    if ((((oldpens) !== (newpens)) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    members.m_playfield_priority_pens = ((newpens) & 0xffff);
  }

  function method_update_timers(runtime: any, scanline: any): any {
    const members = runtime.members;


  }

  function method_video_int_ack_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(4, 0);
  }

  function method_spriteram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mob.bank"], __L1: any = __l["m_mob.spriteram"], __L2: any = __l["m_screen.vpos"], __L3: any = __l["m_screen.update_partial"];
    let __t0: any, __t1: any, __t2: any, __t3: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    let active_bank: any = (((__L0 ?? runtime.memberCall(members.m_mob, "bank", 0, undefined))()) | 0);
    let spriteram: any = (__L1 ?? runtime.memberCall(members.m_mob, "spriteram", 0, undefined))(); let spriteram$s: any = undefined, spriteram$o: any = 0; if (ArrayBuffer.isView(spriteram) || Array.isArray(spriteram)) spriteram$s = spriteram; else if (spriteram !== null && typeof spriteram === 'object' && spriteram.generatedPointer === true && spriteram.path === undefined && spriteram.target === undefined && (ArrayBuffer.isView(spriteram.source) || Array.isArray(spriteram.source))) { spriteram$s = spriteram.source; spriteram$o = spriteram.offset; }
    let oldword: any = (((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (offset)] ?? 0) : runtime.readIndex(spriteram, offset))) | 0);
    let newword: any = ((oldword) | 0);
    runtime.combineData(({ generatedPointer: true, target: ({ generatedLValue: true, get: () => newword, set: (value: any) => { newword = ((value) | 0); } }), offset: 0 }), data, mem_mask);
    if (((((((oldword) !== (newword)) ? 1 : 0)) && (((Number(((offset) >>> (8))) === Number(active_bank)) ? 1 : 0))) ? 1 : 0)) {
      if (((((((((Number(((offset) & (192))) === Number(0)) ? 1 : 0)) && (((Number((spriteram$s !== undefined ? (spriteram$s[spriteram$o + (((offset) | (64)))] ?? 0) : runtime.readIndex(spriteram, ((offset) | (64))))) === Number(65535)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((offset) & (192))) === Number(64)) ? 1 : 0)) && (((((((newword) === (65535)) ? 1 : 0)) || ((((oldword) === (65535)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
        runtime.writeIndex(spriteram, offset, data);
        (runtime.overrides["update_timers"] ? runtime.overrides["update_timers"]((__L2 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) : method_update_timers(runtime, (__L2 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()));
      } else {
        (__L3 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))(__add_spriteram_w(runtime, (__L2 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), 2));
      }
    }
    runtime.writeIndex(spriteram, offset, data);
  }
  function __add_spriteram_w(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_trakball_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    const h_m_trackball_type = members.m_trackball_type ?? runtime.member("m_trackball_type");
    let result: any = ((255) | 0);
    if (((Number(h_m_trackball_type) === Number(1)) ? 1 : 0)) {
      let player: any = ((((((offset) >>> (1))) & (1))) | 0);
      let which: any = ((((offset) & (1))) | 0);
      if ((((which) === (0)) ? 1 : 0)) {
        let posx: any = ((0) & 0xff);
        let posy: any = ((0) & 0xff);
        if ((((player) === (0)) ? 1 : 0)) {
          posx = (((((__t0 = __deref_trakball_r(runtime, (__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0")), "read"))) << 24 >> 24)) & 0xff);
          posy = (((((__t1 = __deref_trakball_r(runtime, (__L0 ? __L0("IN1") : runtime.macro("ioport", "IN1"))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0("IN1") : runtime.macro("ioport", "IN1")), "read"))) << 24 >> 24)) & 0xff);
        } else {
          posx = (((((__t2 = __deref_trakball_r(runtime, (__L0 ? __L0("IN2") : runtime.macro("ioport", "IN2"))), typeof __t2.read === 'function' ? (__t2.read() ?? 0) : runtime.container((__L0 ? __L0("IN2") : runtime.macro("ioport", "IN2")), "read"))) << 24 >> 24)) & 0xff);
          posy = (((((__t3 = __deref_trakball_r(runtime, (__L0 ? __L0("IN3") : runtime.macro("ioport", "IN3"))), typeof __t3.read === 'function' ? (__t3.read() ?? 0) : runtime.container((__L0 ? __L0("IN3") : runtime.macro("ioport", "IN3")), "read"))) << 24 >> 24)) & 0xff);
        }
        runtime.writeIndex(runtime.readIndex((members.m_cur ?? runtime.member("m_cur")), player), 0, ((posx) + (posy)));
        runtime.writeIndex(runtime.readIndex((members.m_cur ?? runtime.member("m_cur")), player), 1, ((posx) - (posy)));
      }
      result = ((runtime.readIndex(runtime.readIndex((members.m_cur ?? runtime.member("m_cur")), player), which)) | 0);
    } else {
      if (((Number(h_m_trackball_type) === Number(2)) ? 1 : 0)) {
        result = (((__t4 = __deref_trakball_r(runtime, (__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0"))), typeof __t4.read === 'function' ? (__t4.read() ?? 0) : runtime.container((__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0")), "read"))) | 0);
      }
    }
    return result;
  }
  function __deref_trakball_r(runtime: any, p: any): any {
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

  function method_switch_6502_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any, __t1: any;

    let temp: any = (((__t0 = __deref_switch_6502_r(runtime, (__L0 ? __L0("1820") : runtime.macro("ioport", "1820"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("1820") : runtime.macro("ioport", "1820")), "read"))) | 0);
    if ((((((__t1 = __deref_switch_6502_r(runtime, (__L0 ? __L0("F60000") : runtime.macro("ioport", "F60000"))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L0 ? __L0("F60000") : runtime.macro("ioport", "F60000")), "read"))) & (64))) ? 0 : 1)) {
      temp = ((((temp) ^ (128))) | 0);
    }
    return temp;
  }
  function __deref_switch_6502_r(runtime: any, p: any): any {
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

  function method_video_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mob.code_lookup"], __L1: any = __l["m_mob.color_lookup"], __L2: any = __l["m_mob.gfx_lookup"], __L3: any = __l["m_mob.set_yscroll"], __L4: any = __l["NAME"], __L5: any = __l["save_item"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_playfield_lookup = members.m_playfield_lookup ?? runtime.member("m_playfield_lookup");
    let motable: any = new Uint16Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](256) : new Uint8Array(Math.max(0, Number(256)))));
    (runtime.overrides["decode_gfx"] ? runtime.overrides["decode_gfx"](h_m_playfield_lookup, motable) : method_decode_gfx(runtime, h_m_playfield_lookup, motable));
    let codelookup: any = (__L0 ?? runtime.memberCall(members.m_mob, "code_lookup", 0, undefined))();
    for (let i: any = 0; ((Number(i) < Number((codelookup).length)) ? 1 : 0); i = ((i) + (1))) {
      runtime.writeIndex(codelookup, i, ((((i) & (255))) | ((((((motable[((i) >>> (8))] ?? 0)) & (255))) << (8)))));
    }
    let colorlookup: any = (__L1 ?? runtime.memberCall(members.m_mob, "color_lookup", 0, undefined))();
    let gfxlookup: any = (__L2 ?? runtime.memberCall(members.m_mob, "gfx_lookup", 0, undefined))();
    for (let i: any = 0; ((Number(i) < Number((colorlookup).length)) ? 1 : 0); i = ((i) + (1))) {
      runtime.writeIndex(colorlookup, i, ((((runtime.shiftRight((motable[i] ?? 0), 12)) & (15))) << (1)));
      runtime.writeIndex(gfxlookup, i, ((runtime.shiftRight((motable[i] ?? 0), 8)) & (15)));
    }
    (__L3 ?? runtime.memberCall(members.m_mob, "set_yscroll", 0, undefined))(256);
    members.m_next_timer_scanline = ((-1) | 0);
    members.m_scanline_int_state = ((0) ? 1 : 0);
    members.m_bankselect = ((255) & 0xff);
    members.m_playfield_tile_bank = ((0) & 0xff);
    (__L5 ? __L5((__L4 ? __L4((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) : runtime.macro("NAME", (members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))))) : runtime.macro("save_item", (__L4 ? __L4((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) : runtime.macro("NAME", (members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))))));
    (__L5 ? __L5((__L4 ? __L4((members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))) : runtime.macro("NAME", (members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))))) : runtime.macro("save_item", (__L4 ? __L4((members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))) : runtime.macro("NAME", (members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))))));
    (__L5 ? __L5((__L4 ? __L4((members.m_next_timer_scanline ?? runtime.member("m_next_timer_scanline"))) : runtime.macro("NAME", (members.m_next_timer_scanline ?? runtime.member("m_next_timer_scanline"))))) : runtime.macro("save_item", (__L4 ? __L4((members.m_next_timer_scanline ?? runtime.member("m_next_timer_scanline"))) : runtime.macro("NAME", (members.m_next_timer_scanline ?? runtime.member("m_next_timer_scanline"))))));
    (__L5 ? __L5((__L4 ? __L4((members.m_scanline_int_state ?? runtime.member("m_scanline_int_state"))) : runtime.macro("NAME", (members.m_scanline_int_state ?? runtime.member("m_scanline_int_state"))))) : runtime.macro("save_item", (__L4 ? __L4((members.m_scanline_int_state ?? runtime.member("m_scanline_int_state"))) : runtime.macro("NAME", (members.m_scanline_int_state ?? runtime.member("m_scanline_int_state"))))));
    (__L5 ? __L5((__L4 ? __L4((members.m_bankselect ?? runtime.member("m_bankselect"))) : runtime.macro("NAME", (members.m_bankselect ?? runtime.member("m_bankselect"))))) : runtime.macro("save_item", (__L4 ? __L4((members.m_bankselect ?? runtime.member("m_bankselect"))) : runtime.macro("NAME", (members.m_bankselect ?? runtime.member("m_bankselect"))))));
  }

  function method_decode_gfx(runtime: any, pflookup: any, molookup: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"];

    let prom1: any = (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))["as_u8&"](0);
    let prom2: any = (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))["as_u8&"](512);
    cppMemset(runtime, __addr_decode_gfx(runtime, runtime.readIndex((members.m_bank_gfx ?? runtime.member("m_bank_gfx")), 0), 0), 0, (((members.m_bank_gfx ?? runtime.member("m_bank_gfx")))?.byteLength ?? 1));
    for (let obj: any = ((0) | 0); (((obj) < (2)) ? 1 : 0); obj = ((((obj) + (1))) | 0)) {
      for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0), prom1 = __add_decode_gfx(runtime, prom1, 1), prom2 = __add_decode_gfx(runtime, prom2, 1)) {
        let bank: any = ((0) | 0);
        let bpp: any = ((0) | 0);
        let color: any = ((0) | 0);
        let offset: any = ((0) | 0);
        bpp = ((4) | 0);
        if (((__deref_decode_gfx(runtime, prom2)) & (16))) {
          bpp = ((5) | 0);
          if (((__deref_decode_gfx(runtime, prom2)) & (32))) {
            bpp = ((6) | 0);
          }
        }
        offset = ((((__deref_decode_gfx(runtime, prom1)) & (15))) | 0);
        bank = (((runtime.overrides["get_bank"] ? runtime.overrides["get_bank"](__deref_decode_gfx(runtime, prom1), __deref_decode_gfx(runtime, prom2), bpp) : method_get_bank(runtime, __deref_decode_gfx(runtime, prom1), __deref_decode_gfx(runtime, prom2), bpp))) | 0);
        if ((((obj) === (0)) ? 1 : 0)) {
          color = ((runtime.shiftRight((((~__deref_decode_gfx(runtime, prom2))) & (15)), ((bpp) - (4)))) | 0);
          if ((((bank) === (0)) ? 1 : 0)) {
            bank = ((1) | 0);
            offset = (((color = ((0) | 0))) | 0);
          }
          runtime.writeIndex(pflookup, i, ((((offset) | (((bank) << (8))))) | (((color) << (12)))));
        } else {
          color = ((runtime.shiftRight((((~__deref_decode_gfx(runtime, prom2))) & (7)), ((bpp) - (4)))) | 0);
          runtime.writeIndex(molookup, i, ((((offset) | (((bank) << (8))))) | (((color) << (12)))));
        }
      }
    }
  }
  function __add_decode_gfx(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_decode_gfx(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_decode_gfx(runtime: any, p: any): any {
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

  function method_get_bank(runtime: any, prom1: any, prom2: any, bpp: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["m_gfxdecode.gfx"], __L2: any = __l["std::make_unique<gfx_element>"], __L3: any = __l["m_gfxdecode.set_gfx"], __L4: any = __l["fatalerror"];

    prom1 = ((prom1) & 0xff);
    prom2 = ((prom2) & 0xff);
    const h_m_palette = members.m_palette ?? runtime.member("m_palette");
    const h_objlayout_4bpp = members.objlayout_4bpp ?? runtime.member("objlayout_4bpp");
    const h_objlayout_5bpp = members.objlayout_5bpp ?? runtime.member("objlayout_5bpp");
    const h_objlayout_6bpp = members.objlayout_6bpp ?? runtime.member("objlayout_6bpp");
    let bank_index: any = ((0) | 0);
    let gfx_index: any = ((0) | 0);
    if (((Number(((prom1) & (16))) === Number(0)) ? 1 : 0)) {
      bank_index = ((1) | 0);
    } else {
      if (((Number(((prom1) & (32))) === Number(0)) ? 1 : 0)) {
        bank_index = ((2) | 0);
      } else {
        if (((Number(((prom1) & (64))) === Number(0)) ? 1 : 0)) {
          bank_index = ((3) | 0);
        } else {
          if (((Number(((prom1) & (128))) === Number(0)) ? 1 : 0)) {
            bank_index = ((4) | 0);
          } else {
            if (((Number(((prom2) & (64))) === Number(0)) ? 1 : 0)) {
              bank_index = ((5) | 0);
            } else {
              if (((Number(((prom2) & (128))) === Number(0)) ? 1 : 0)) {
                if (((Number(((prom2) & (8))) === Number(0)) ? 1 : 0)) {
                  bank_index = ((7) | 0);
                } else {
                  bank_index = ((6) | 0);
                }
              } else {
                return 0;
              }
            }
          }
        }
      }
    }
    if (runtime.readIndex(runtime.readIndex((members.m_bank_gfx ?? runtime.member("m_bank_gfx")), ((bpp) - (4))), bank_index)) {
      return runtime.readIndex(runtime.readIndex((members.m_bank_gfx ?? runtime.member("m_bank_gfx")), ((bpp) - (4))), bank_index);
    }
    let tiles: any = (__L0 ? __L0("tiles") : runtime.macro("memregion", "tiles")); let tiles$s: any = undefined, tiles$o: any = 0; if (ArrayBuffer.isView(tiles) || Array.isArray(tiles)) tiles$s = tiles; else if (tiles !== null && typeof tiles === 'object' && tiles.generatedPointer === true && tiles.path === undefined && tiles.target === undefined && (ArrayBuffer.isView(tiles.source) || Array.isArray(tiles.source))) { tiles$s = tiles.source; tiles$o = tiles.offset; }
    if (((Number(((524288) * (((bank_index) - (1))))) >= Number(runtime.container(tiles, "bytes"))) ? 1 : 0)) {
      return 0;
    }
    for (gfx_index = ((0) | 0); ((Number(gfx_index) < Number(32)) ? 1 : 0); gfx_index = ((((gfx_index) + (1))) | 0)) {
      if (((Number((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfx_index)) === Number(0)) ? 1 : 0)) {
        break;
      }
    }
    let srcdata: any = tiles["as_u8&"](((524288) * (((bank_index) - (1))))); let srcdata$s: any = undefined, srcdata$o: any = 0; if (ArrayBuffer.isView(srcdata) || Array.isArray(srcdata)) srcdata$s = srcdata; else if (srcdata !== null && typeof srcdata === 'object' && srcdata.generatedPointer === true && srcdata.path === undefined && srcdata.target === undefined && (ArrayBuffer.isView(srcdata.source) || Array.isArray(srcdata.source))) { srcdata$s = srcdata.source; srcdata$o = srcdata.offset; }
    switch ((bpp as number)) {
      case 4:
      {
        (__L3 ?? runtime.memberCall(members.m_gfxdecode, "set_gfx", 0, undefined))(gfx_index, (__L2 ? __L2(h_m_palette, h_objlayout_4bpp, srcdata, 0, 64, 256) : runtime.macro("std::make_unique<gfx_element>", h_m_palette, h_objlayout_4bpp, srcdata, 0, 64, 256)));
        break;
      }
      case 5:
      {
        (__L3 ?? runtime.memberCall(members.m_gfxdecode, "set_gfx", 0, undefined))(gfx_index, (__L2 ? __L2(h_m_palette, h_objlayout_5bpp, srcdata, 0, 64, 256) : runtime.macro("std::make_unique<gfx_element>", h_m_palette, h_objlayout_5bpp, srcdata, 0, 64, 256)));
        break;
      }
      case 6:
      {
        (__L3 ?? runtime.memberCall(members.m_gfxdecode, "set_gfx", 0, undefined))(gfx_index, (__L2 ? __L2(h_m_palette, h_objlayout_6bpp, srcdata, 0, 64, 256) : runtime.macro("std::make_unique<gfx_element>", h_m_palette, h_objlayout_6bpp, srcdata, 0, 64, 256)));
        break;
      }
      default:
      {
        (__L4 ? __L4("Unsupported bpp\n") : runtime.macro("fatalerror", "Unsupported bpp\n"));
      }
    }
    runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(gfx_index), "set_granularity", 0, undefined)(8);
    runtime.writeIndex(runtime.writableMember("m_bank_color_shift"), gfx_index, ((bpp) - (3)));
    return (runtime.writeIndex(runtime.readIndex((members.m_bank_gfx ?? runtime.member("m_bank_gfx")), ((bpp) - (4))), bank_index, gfx_index));
  }

  function method_int3_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"], __L1: any = __l["m_screen.scan_period"], __L2: any = __l["m_int3off_timer.adjust"];
    let __t0: any;

    let scanline: any = ((param) | 0);
    members.m_scanline_int_state = ((1) ? 1 : 0);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(3, 1);
    (__L2 ?? runtime.memberCall(members.m_int3off_timer, "adjust", 0, undefined))((__L1 ?? runtime.memberCall(members.m_screen, "scan_period", 0, undefined))());
    members.m_next_timer_scanline = ((-1) | 0);
    (runtime.overrides["update_timers"] ? runtime.overrides["update_timers"](scanline) : method_update_timers(runtime, scanline));
  }

  function method_int3off_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    members.m_scanline_int_state = ((0) ? 1 : 0);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(3, 0);
  }

  function method_reset_yscroll_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_playfield_tilemap.set_scrolly"];

    (__L0 ?? runtime.memberCall(members.m_playfield_tilemap, "set_scrolly", 0, undefined))(0, param);
  }

  function method_get_playfield_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_playfield_tilemap.basemem_read"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];

    const h_m_playfield_lookup = members.m_playfield_lookup ?? runtime.member("m_playfield_lookup");
    let data: any = (((__L0 ?? runtime.memberCall(members.m_playfield_tilemap, "basemem_read", 0, undefined))(tile_index)) & 0xffff);
    let lookup: any = ((runtime.readIndex(h_m_playfield_lookup, ((((((data) >>> (8))) & (127))) | ((((members.m_playfield_tile_bank ?? runtime.member("m_playfield_tile_bank"))) << (7)))))) & 0xffff);
    let gfxindex: any = ((((((lookup) >>> (8))) & (15))) | 0);
    let code: any = ((((((((lookup) & (255))) << (8))) | (((data) & (255))))) | 0);
    let color: any = ((__add_get_playfield_tile_info(runtime, 32, ((((((lookup) >>> (12))) & (15))) << (runtime.readIndex((members.m_bank_color_shift ?? runtime.member("m_bank_color_shift")), gfxindex))))) | 0);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(gfxindex, code, color, ((((data) >>> (15))) & (1)));
  }
  function __add_get_playfield_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_get_alpha_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_alpha_tilemap.basemem_read"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];

    let data: any = (((__L0 ?? runtime.memberCall(members.m_alpha_tilemap, "basemem_read", 0, undefined))(tile_index)) & 0xffff);
    let code: any = ((((data) & (1023))) | 0);
    let color: any = ((((((data) >>> (10))) & (7))) | 0);
    let opaque: any = ((((data) & (8192))) | 0);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, code, color, ((opaque) ? (16) : (0)));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mob.draw_async"], __L1: any = __l["m_playfield_tilemap.draw"], __L2: any = __l["m_mob.bitmap"], __L3: any = __l["m_mob.iterate_dirty_rects"], __L4: any = __l["m_alpha_tilemap.draw"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    (__L0 ?? runtime.memberCall(members.m_mob, "draw_async", 0, undefined))(cliprect);
    (__L1 ?? runtime.memberCall(members.m_playfield_tilemap, "draw", 0, undefined))(screen, bitmap, cliprect, 0, 0);
    let mobitmap: any = (__L2 ?? runtime.memberCall(members.m_mob, "bitmap", 0, undefined))();
    (__L3 ?? runtime.memberCall(members.m_mob, "iterate_dirty_rects", 0, undefined))(cliprect, ((rect: any) => {
      for (let y: any = (((__l["rect.top"] ?? runtime.memberCall(rect, "top", 0, __l["top"]))()) | 0); ((Number(y) <= Number((__l["rect.bottom"] ?? runtime.memberCall(rect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let mo: any = mobitmap["pix&"](y);
        let pf: any = bitmap["pix&"](y);
        for (let x: any = (((__l["rect.left"] ?? runtime.memberCall(rect, "left", 0, __l["left"]))()) | 0); ((Number(x) <= Number((__l["rect.right"] ?? runtime.memberCall(rect, "right", 0, __l["right"]))())) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          if (((Number(runtime.readIndex(mo, x)) !== Number(65535)) ? 1 : 0)) {
            if (((runtime.readIndex(mo, x)) & (61440))) {
              if (((Number(((runtime.readIndex(mo, x)) & (15))) !== Number(1)) ? 1 : 0)) {
                runtime.writeIndex(pf, x, __add_screen_update(runtime, __add_screen_update(runtime, 768, ((((runtime.readIndex(pf, x)) & (15))) << (4))), ((runtime.readIndex(mo, x)) & (15))));
              }
            } else {
              if ((((((Number(((runtime.readIndex(pf, x)) & (248))) !== Number(0)) ? 1 : 0)) || ((((((members.m_playfield_priority_pens ?? runtime.member("m_playfield_priority_pens"))) & (((1) << (((runtime.readIndex(pf, x)) & (7))))))) ? 0 : 1))) ? 1 : 0)) {
                runtime.writeIndex(pf, x, runtime.readIndex(mo, x));
              }
            }
          }
        }
      }
    }));
    (__L4 ?? runtime.memberCall(members.m_alpha_tilemap, "draw", 0, undefined))(screen, bitmap, cliprect, 0, 0);
    return 0;
  }
  function __add_screen_update(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_compute_log(runtime: any, value: any): any {
    const members = runtime.members;

    let log: any = ((0) | 0);
    if ((((value) === (0)) ? 1 : 0)) {
      return -1;
    }
    while (((((value) & (1))) ? 0 : 1)) {
      log = ((((log) + (1))) | 0);
      value = ((((value) >> (1))) | 0);
    }
    if ((((value) !== (1)) ? 1 : 0)) {
      return -1;
    }
    return log;
  }

  function method_round_to_powerof2(runtime: any, value: any): any {
    const members = runtime.members;

    let log: any = ((0) | 0);
    if ((((value) === (0)) ? 1 : 0)) {
      return 1;
    }
    while (((Number((value = ((((value) >> (1))) | 0))) !== Number(0)) ? 1 : 0)) {
      log = ((((log) + (1))) | 0);
    }
    return ((1) << (((log) + (1))));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "int3state_r": method_int3state_r,
    "xscroll_w": method_xscroll_w,
    "yscroll_w": method_yscroll_w,
    "priority_w": method_priority_w,
    "update_timers": method_update_timers,
    "video_int_ack_w": method_video_int_ack_w,
    "spriteram_w": method_spriteram_w,
    "trakball_r": method_trakball_r,
    "switch_6502_r": method_switch_6502_r,
    "video_start": method_video_start,
    "decode_gfx": method_decode_gfx,
    "get_bank": method_get_bank,
    "int3_callback": method_int3_callback,
    "int3off_callback": method_int3off_callback,
    "reset_yscroll_callback": method_reset_yscroll_callback,
    "get_playfield_tile_info": method_get_playfield_tile_info,
    "get_alpha_tile_info": method_get_alpha_tile_info,
    "screen_update": method_screen_update,
    "compute_log": method_compute_log,
    "round_to_powerof2": method_round_to_powerof2
  };
  return __methodTable;
})();
    return {
      "atarisy1_state.int3state_r": methods["int3state_r"],
      "atarisy1_state.xscroll_w": methods["xscroll_w"],
      "atarisy1_state.yscroll_w": methods["yscroll_w"],
      "atarisy1_state.priority_w": methods["priority_w"],
      "atarisy1_state.update_timers": methods["update_timers"],
      "atarisy1_state.video_int_ack_w": methods["video_int_ack_w"],
      "atarisy1_state.spriteram_w": methods["spriteram_w"],
      "atarisy1_state.trakball_r": methods["trakball_r"],
      "atarisy1_state.switch_6502_r": methods["switch_6502_r"],
      "atarisy1_state.video_start": methods["video_start"],
      "atarisy1_state.get_bank": methods["get_bank"],
      "atarisy1_state.int3_callback": methods["int3_callback"],
      "atarisy1_state.int3off_callback": methods["int3off_callback"],
      "atarisy1_state.reset_yscroll_callback": methods["reset_yscroll_callback"],
      "atarisy1_state.get_playfield_tile_info": methods["get_playfield_tile_info"],
      "atarisy1_state.get_alpha_tile_info": methods["get_alpha_tile_info"],
      "atarisy1_state.screen_update": methods["screen_update"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["NAME","bottom","fatalerror","ioport","left","m_alpha_tilemap.basemem_read","m_alpha_tilemap.draw","m_gfxdecode.gfx","m_gfxdecode.set_gfx","m_int3off_timer.adjust","m_maincpu.set_input_line","m_mob.bank","m_mob.bitmap","m_mob.code_lookup","m_mob.color_lookup","m_mob.draw_async","m_mob.gfx_lookup","m_mob.iterate_dirty_rects","m_mob.set_yscroll","m_mob.spriteram","m_playfield_tilemap.basemem_read","m_playfield_tilemap.draw","m_playfield_tilemap.set_scrollx","m_playfield_tilemap.set_scrolly","m_screen.scan_period","m_screen.time_until_pos","m_screen.update_partial","m_screen.visible_area","m_screen.vpos","m_yscroll_reset_timer.adjust","memregion","rect.bottom","rect.left","rect.right","rect.top","right","save_item","set","std::make_unique<gfx_element>","tileinfo.set","top"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
