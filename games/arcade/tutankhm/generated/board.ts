// GENERATED executable machine composition from src/mame/konami/tutankhm.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'tutankhm');

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
  const __mame_table_0 = [0, 16, 32, 48, 64, 144, 160, 176, 160, 208];

  function method_bankselect_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mainbank.set_entry"], __L1: any = __l["set_entry"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L1))(((data) & (15)));
  }

  function method_sound_on_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_timeplt_audio.sh_irqtrigger_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_timeplt_audio, "sh_irqtrigger_w", 0, undefined))(0);
    (__L0 ?? runtime.memberCall(members.m_timeplt_audio, "sh_irqtrigger_w", 0, undefined))(1);
  }

  function method_sh_irqtrigger_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_soundcpu.set_input_line"];

    if ((((((Number((members.m_last_irq_state ?? runtime.member("m_last_irq_state"))) === Number(0)) ? 1 : 0)) && (state)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(0, 2);
    }
    members.m_last_irq_state = state;
  }

  function method_filter_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("set_filter", 1, 0, ((((offset) >>> (0))) & (3)));
    runtime.invoke("set_filter", 1, 1, ((((offset) >>> (2))) & (3)));
    runtime.invoke("set_filter", 1, 2, ((((offset) >>> (4))) & (3)));
    runtime.invoke("set_filter", 0, 0, ((((offset) >>> (6))) & (3)));
    runtime.invoke("set_filter", 0, 1, ((((offset) >>> (8))) & (3)));
    runtime.invoke("set_filter", 0, 2, ((((offset) >>> (10))) & (3)));
  }

  function method_irq_enable_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    members.m_irq_enable = ((state) & 0xff);
    if ((((members.m_irq_enable ?? runtime.member("m_irq_enable"))) ? 0 : 1)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
  }

  function method_stars_enable_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"];
    let __t0: any;

    data = ((data) & 0xff);
    if (((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) ^ (data))) >>> (0)) & 1)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    members.m_stars_enabled = (((((data) >>> (0)) & 1)) & 0xff);
  }

  function method_flip_screen_x_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_flipscreen_x = ((state) & 0xff);
  }

  function method_flip_screen_y_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_flipscreen_y = ((state) & 0xff);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_stars_config.read_safe"], __L1: any = __l["read_safe"];

    let mode: any = (((__L0 ?? runtime.memberCall(members.m_stars_config, "read_safe", 0, __L1))((members.m_star_mode ?? runtime.member("m_star_mode")))) & 0xff);
    if (((Number(mode) !== Number((members.m_star_mode ?? runtime.member("m_star_mode")))) ? 1 : 0)) {
      members.m_star_mode = ((mode) & 0xff);
      (runtime.overrides["stars_init"] ? runtime.overrides["stars_init"]() : method_stars_init(runtime));
    }
    if ((members.m_star_mode ?? runtime.member("m_star_mode"))) {
      return (runtime.overrides["screen_update_scramble"] ? runtime.overrides["screen_update_scramble"](screen, bitmap, cliprect) : method_screen_update_scramble(runtime, screen, bitmap, cliprect));
    } else {
      return (runtime.overrides["screen_update_bootleg"] ? runtime.overrides["screen_update_bootleg"](screen, bitmap, cliprect) : method_screen_update_bootleg(runtime, screen, bitmap, cliprect));
    }
  }

  function method_stars_init(runtime: any): any {
    const members = runtime.members;

    if ((members.m_star_mode ?? runtime.member("m_star_mode"))) {
      (runtime.overrides["stars_init_scramble"] ? runtime.overrides["stars_init_scramble"]() : method_stars_init_scramble(runtime));
    } else {
      (runtime.overrides["stars_init_bootleg"] ? runtime.overrides["stars_init_bootleg"]() : method_stars_init_bootleg(runtime));
    }
  }

  function method_stars_init_scramble(runtime: any): any {
    const members = runtime.members;

    members.m_stars = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](131071) : new Uint8Array(Math.max(0, Number(131071))));
    let shiftreg: any = ((0) >>> 0);
    for (let i: any = ((0) | 0); ((Number(i) < Number(131071)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let shift: any = ((12) & 0xff);
      let enabled: any = ((((Number(((shiftreg) & (130561))) === Number(130560)) ? 1 : 0)) | 0);
      let color: any = ((runtime.shiftRight((((~shiftreg)) & (504)), 3)) | 0);
      runtime.writeIndex(runtime.writableMember("m_stars"), i, ((color) | (((enabled) << (7)))));
      shiftreg = ((((((shiftreg) >>> (1))) | (((((((((shiftreg) >>> (shift))) ^ ((~shiftreg)))) & (1))) << (16))))) >>> 0);
    }
  }

  function method_stars_init_bootleg(runtime: any): any {
    const members = runtime.members;

    members.m_stars_enabled = ((0) & 0xff);
    members.m_stars_blink_state = ((0) & 0xff);
    members.m_stars = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](131071) : new Uint8Array(Math.max(0, Number(131071))));
    let shiftreg: any = ((0) >>> 0);
    for (let i: any = ((0) | 0); ((Number(i) < Number(131071)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let newbit: any = ((((((((shiftreg) >>> (12))) ^ ((~shiftreg)))) & (1))) | 0);
      let enabled: any = (((((((Number(((shiftreg) & (130560))) === Number(130560)) ? 1 : 0)) && ((((newbit) === (0)) ? 1 : 0))) ? 1 : 0)) | 0);
      let color: any = ((runtime.shiftRight((((~shiftreg)) & (504)), 3)) | 0);
      runtime.writeIndex(runtime.writableMember("m_stars"), i, ((color) | (((enabled) << (7)))));
      shiftreg = ((((((shiftreg) >>> (1))) | (((newbit) << (16))))) >>> 0);
    }
  }

  function method_screen_update_scramble(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_scroll.found"], __L1: any = __l["found"], __L2: any = __l["m_palette.pen_color"];
    let __t0: any;

    const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    (runtime.overrides["scramble_draw_background"] ? runtime.overrides["scramble_draw_background"](bitmap, cliprect) : method_scramble_draw_background(runtime, bitmap, cliprect));
    let xorx: any = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (255) : (0))) | 0);
    let xory: any = (((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (255) : (0))) | 0);
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let dst: any = bitmap["pix&"](y); let dst$s: any = undefined, dst$o: any = 0; if (ArrayBuffer.isView(dst) || Array.isArray(dst)) dst$s = dst; else if (dst !== null && typeof dst === 'object' && dst.generatedPointer === true && dst.path === undefined && dst.target === undefined && (ArrayBuffer.isView(dst.source) || Array.isArray(dst.source))) { dst$s = dst.source; dst$o = dst.offset; }
      for (let x: any = ((runtime.divide(cliprect.min_x, 3)) | 0); ((Number(x) <= Number(runtime.divide(cliprect.max_x, 3))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let effx: any = ((((x) ^ (xorx))) & 0xff);
        let yscroll: any = ((((((((((effx) < (192)) ? 1 : 0)) && ((__L0 ?? runtime.memberCall(members.m_scroll, "found", 0, __L1))())) ? 1 : 0)) ? (__deref_screen_update_scramble(runtime, h_m_scroll)) : (0))) & 0xff);
        let effy: any = ((((((y) ^ (xory))) + (yscroll))) & 0xff);
        let vrambyte: any = ((runtime.readIndex(h_m_videoram, __add_screen_update_scramble(runtime, ((effy) * (128)), runtime.divide(effx, 2)))) & 0xff);
        let shifted: any = ((((vrambyte) >>> (((4) * (((effx) & (1))))))) & 0xff);
        let color: any = (__L2 ?? runtime.memberCall(members.m_palette, "pen_color", 0, undefined))(((shifted) & (15)));
        let dbase: any = __addr_screen_update_scramble(runtime, dst, ((x) * (3))); let dbase$s: any = undefined, dbase$o: any = 0; if (ArrayBuffer.isView(dbase) || Array.isArray(dbase)) dbase$s = dbase; else if (dbase !== null && typeof dbase === 'object' && dbase.generatedPointer === true && dbase.path === undefined && dbase.target === undefined && (ArrayBuffer.isView(dbase.source) || Array.isArray(dbase.source))) { dbase$s = dbase.source; dbase$o = dbase.offset; }
        if ((((shifted) || (((Number((dbase$s !== undefined ? (dbase$s[dbase$o + (0)] ?? 0) : runtime.readIndex(dbase, 0))) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(dbase, 0, color);
        }
        if ((((shifted) || (((Number((dbase$s !== undefined ? (dbase$s[dbase$o + (1)] ?? 0) : runtime.readIndex(dbase, 1))) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(dbase, 1, color);
        }
        if ((((shifted) || (((Number((dbase$s !== undefined ? (dbase$s[dbase$o + (2)] ?? 0) : runtime.readIndex(dbase, 2))) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(dbase, 2, color);
        }
      }
    }
    return 0;
  }
  function __add_screen_update_scramble(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_screen_update_scramble(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_screen_update_scramble(runtime: any, p: any): any {
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

  function method_scramble_draw_background(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t::black"], __L1: any = __l["bitmap.fill"], __L2: any = __l["fill"];

    (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ? __L0() : runtime.macro("rgb_t::black")), cliprect);
    (runtime.overrides["scramble_draw_stars"] ? runtime.overrides["scramble_draw_stars"](bitmap, cliprect, 256) : method_scramble_draw_stars(runtime, bitmap, cliprect, 256));
  }

  function method_scramble_draw_stars(runtime: any, bitmap: any, cliprect: any, maxx: any): any {
    const members = runtime.members;

    if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
      for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, maxx, y, ((y) * (512))) : method_stars_draw_row(runtime, bitmap, maxx, y, ((y) * (512))));
      }
    }
  }

  function method_stars_draw_row(runtime: any, bitmap: any, maxx: any, y: any, star_offs: any): any {
    const members = runtime.members;
    let __t0: any, __t1: any;

    let flipxor: any = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (192) : (0))) & 0xff);
    star_offs = ((((star_offs) % (131071))) >>> 0);
    for (let x: any = ((0) | 0); (((x) < (maxx)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
      let h8q: any = ((((((~x)) >>> (3)) & 1)) & 0xff);
      let enable_star: any = (((((((y) ^ (h8q))) >>> (0)) & 1)) ? 1 : 0);
      let blink_state: any = (((((members.m_stars_blink_state ?? runtime.member("m_stars_blink_state"))) & (3))) & 0xff);
      let enab: any = ((0) ? 1 : 0);
      switch ((blink_state as number)) {
        case 0:
        {
          enab = ((1) ? 1 : 0);
          break;
        }
        case 1:
        {
          enab = (((((y) >>> (0)) & 1)) ? 1 : 0);
          break;
        }
        case 2:
        {
          enab = (((((y) >>> (1)) & 1)) ? 1 : 0);
          break;
        }
        case 3:
        {
          enab = ((h8q) ? 1 : 0);
          break;
        }
      }
      enable_star = ((((enable_star) & ((((enab) && (((Number(((((x) & (192))) ^ (flipxor))) !== Number(192)) ? 1 : 0))) ? 1 : 0)))) ? 1 : 0);
      let star: any = ((0) & 0xff);
      star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t0 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t0))) & 0xff);
      if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
        star_offs = ((0) >>> 0);
      }
      if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
      }
      star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (__t1 = star_offs, star_offs = ((((star_offs) + (1))) >>> 0), __t1))) & 0xff);
      if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
        star_offs = ((0) >>> 0);
      }
      if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
        bitmap["pix="](y, __add_stars_draw_row(runtime, ((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
      }
    }
  }
  function __add_stars_draw_row(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_screen_update_bootleg(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t::black"], __L1: any = __l["bitmap.fill"], __L2: any = __l["fill"], __L3: any = __l["m_scroll.found"], __L4: any = __l["found"], __L5: any = __l["m_palette.pen_color"];
    let __t0: any;

    const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ? __L0() : runtime.macro("rgb_t::black")), cliprect);
    let xorx: any = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (255) : (0))) | 0);
    let xory: any = (((((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (255) : (0))) | 0);
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let dst: any = bitmap["pix&"](y); let dst$s: any = undefined, dst$o: any = 0; if (ArrayBuffer.isView(dst) || Array.isArray(dst)) dst$s = dst; else if (dst !== null && typeof dst === 'object' && dst.generatedPointer === true && dst.path === undefined && dst.target === undefined && (ArrayBuffer.isView(dst.source) || Array.isArray(dst.source))) { dst$s = dst.source; dst$o = dst.offset; }
      for (let x: any = ((runtime.divide(cliprect.min_x, 3)) | 0); ((Number(x) <= Number(runtime.divide(cliprect.max_x, 3))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let effx: any = ((((x) ^ (xorx))) & 0xff);
        let yscroll: any = ((((((((((effx) < (192)) ? 1 : 0)) && ((__L3 ?? runtime.memberCall(members.m_scroll, "found", 0, __L4))())) ? 1 : 0)) ? (__deref_screen_update_bootleg(runtime, h_m_scroll)) : (0))) & 0xff);
        let effy: any = ((((((y) ^ (xory))) + (yscroll))) & 0xff);
        let vrambyte: any = ((runtime.readIndex(h_m_videoram, __add_screen_update_bootleg(runtime, ((effy) * (128)), runtime.divide(effx, 2)))) & 0xff);
        let shifted: any = ((((vrambyte) >>> (((4) * (((effx) & (1))))))) & 0xff);
        let blink_state: any = (((((members.m_stars_blink_state ?? runtime.member("m_stars_blink_state"))) & (3))) & 0xff);
        let enab: any = ((0) ? 1 : 0);
        switch ((blink_state as number)) {
          case 0:
          {
            enab = ((1) ? 1 : 0);
            break;
          }
          case 1:
          {
            enab = (((((y) >>> (0)) & 1)) ? 1 : 0);
            break;
          }
          case 2:
          {
            enab = (((((y) >>> (1)) & 1)) ? 1 : 0);
            break;
          }
          case 3:
          {
            enab = ((((((~x)) >>> (3)) & 1)) ? 1 : 0);
            break;
          }
        }
        let offset: any = ((__add_screen_update_bootleg(runtime, ((((y) * (384))) + (x)), 84)) | 0);
        let star: any = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), ((offset) % (131071)))) & 0xff);
        if ((((((((((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) && (enab)) ? 1 : 0)) && (((((~shifted)) >>> (1)) & 1))) ? 1 : 0)) && ((((star) >>> (7)) & 1))) ? 1 : 0)) && ((((x) > (63)) ? 1 : 0))) ? 1 : 0)) {
          bitmap["pix="](y, __add_screen_update_bootleg(runtime, ((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
          bitmap["pix="](y, __add_screen_update_bootleg(runtime, ((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
          bitmap["pix="](y, __add_screen_update_bootleg(runtime, ((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
        } else {
          let color: any = (__L5 ?? runtime.memberCall(members.m_palette, "pen_color", 0, undefined))(((shifted) & (15)));
          let dbase: any = __addr_screen_update_bootleg(runtime, dst, ((x) * (3))); let dbase$s: any = undefined, dbase$o: any = 0; if (ArrayBuffer.isView(dbase) || Array.isArray(dbase)) dbase$s = dbase; else if (dbase !== null && typeof dbase === 'object' && dbase.generatedPointer === true && dbase.path === undefined && dbase.target === undefined && (ArrayBuffer.isView(dbase.source) || Array.isArray(dbase.source))) { dbase$s = dbase.source; dbase$o = dbase.offset; }
          if ((((shifted) || (((Number((dbase$s !== undefined ? (dbase$s[dbase$o + (0)] ?? 0) : runtime.readIndex(dbase, 0))) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(dbase, 0, color);
          }
          if ((((shifted) || (((Number((dbase$s !== undefined ? (dbase$s[dbase$o + (1)] ?? 0) : runtime.readIndex(dbase, 1))) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(dbase, 1, color);
          }
          if ((((shifted) || (((Number((dbase$s !== undefined ? (dbase$s[dbase$o + (2)] ?? 0) : runtime.readIndex(dbase, 2))) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(dbase, 2, color);
          }
        }
      }
    }
    return 0;
  }
  function __add_screen_update_bootleg(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_screen_update_bootleg(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_screen_update_bootleg(runtime: any, p: any): any {
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

  function method_vblank_irq(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    if (state) {
      members.m_irq_toggle = ((((members.m_irq_toggle) ^ (1))) & 0xff);
      if (((((members.m_irq_toggle ?? runtime.member("m_irq_toggle"))) && ((members.m_irq_enable ?? runtime.member("m_irq_enable")))) ? 1 : 0)) {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
      }
    }
  }

  function method_portB_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_soundcpu.total_cycles"];
    let __t0: any;

    return (__mame_table_0[(((((runtime.divide((__L0 ?? runtime.memberCall(members.m_soundcpu, "total_cycles", 0, undefined))(), 512)) % (10))) % 10) + 10) % 10] ?? 0);
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
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "bankselect_w": method_bankselect_w,
    "sound_on_w": method_sound_on_w,
    "sh_irqtrigger_w": method_sh_irqtrigger_w,
    "filter_w": method_filter_w,
    "irq_enable_w": method_irq_enable_w,
    "stars_enable_w": method_stars_enable_w,
    "flip_screen_x_w": method_flip_screen_x_w,
    "flip_screen_y_w": method_flip_screen_y_w,
    "screen_update": method_screen_update,
    "stars_init": method_stars_init,
    "stars_init_scramble": method_stars_init_scramble,
    "stars_init_bootleg": method_stars_init_bootleg,
    "screen_update_scramble": method_screen_update_scramble,
    "scramble_draw_background": method_scramble_draw_background,
    "scramble_draw_stars": method_scramble_draw_stars,
    "stars_draw_row": method_stars_draw_row,
    "screen_update_bootleg": method_screen_update_bootleg,
    "vblank_irq": method_vblank_irq,
    "portB_r": method_portB_r,
    "compute_resistor_weights": method_compute_resistor_weights
  };
  return __methodTable;
})();
    return {
      "tutankhm_state.bankselect_w": methods["bankselect_w"],
      "tutankhm_state.sound_on_w": methods["sound_on_w"],
      "tutankhm_state.irq_enable_w": methods["irq_enable_w"],
      "tutankhm_state.stars_enable_w": methods["stars_enable_w"],
      "tutankhm_state.flip_screen_x_w": methods["flip_screen_x_w"],
      "tutankhm_state.flip_screen_y_w": methods["flip_screen_y_w"],
      "tutankhm_state.screen_update": methods["screen_update"],
      "tutankhm_state.stars_init": methods["stars_init"],
      "tutankhm_state.stars_init_scramble": methods["stars_init_scramble"],
      "tutankhm_state.stars_init_bootleg": methods["stars_init_bootleg"],
      "tutankhm_state.screen_update_scramble": methods["screen_update_scramble"],
      "tutankhm_state.scramble_draw_background": methods["scramble_draw_background"],
      "tutankhm_state.scramble_draw_stars": methods["scramble_draw_stars"],
      "tutankhm_state.stars_draw_row": methods["stars_draw_row"],
      "tutankhm_state.screen_update_bootleg": methods["screen_update_bootleg"],
      "tutankhm_state.vblank_irq": methods["vblank_irq"],
      "tutankhm_state.compute_resistor_weights": methods["compute_resistor_weights"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","fatalerror","fill","found","m_mainbank.set_entry","m_maincpu.set_input_line","m_palette.pen_color","m_screen.update_partial","m_screen.vpos","m_scroll.found","m_soundcpu.set_input_line","m_soundcpu.total_cycles","m_stars_config.read_safe","m_timeplt_audio.sh_irqtrigger_w","read_safe","rgb_t::black","set_entry","std::clamp"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
