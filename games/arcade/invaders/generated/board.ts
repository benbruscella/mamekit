// GENERATED executable machine composition from src/mame/midw8080/mw8080bw.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'invaders');

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


  function method_interrupt_trigger(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_maincpu.set_input_line"], __L2: any = __l["machine"], __L3: any = __l["machine().time"], __L4: any = __l["m_screen.time_until_pos"], __L5: any = __l["m_interrupt_timer.adjust"], __L6: any = __l["adjust"];
    let __t0: any;

    let vpos: any = (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    let counter: any = (((runtime.overrides["vpos_to_vysnc_chain_counter"] ? runtime.overrides["vpos_to_vysnc_chain_counter"](vpos) : method_vpos_to_vysnc_chain_counter(runtime, vpos))) & 0xff);
    if ((members.m_int_enable ?? runtime.member("m_int_enable"))) {
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
      members.m_interrupt_time = ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0);
    } else {
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
    let next_counter: any = ((0) & 0xff);
    let next_vblank: any = ((0) | 0);
    if (((Number(counter) === Number(128)) ? 1 : 0)) {
      next_counter = ((218) & 0xff);
      next_vblank = ((1) | 0);
    } else {
      next_counter = ((128) & 0xff);
      next_vblank = ((0) | 0);
    }
    let next_vpos: any = (((runtime.overrides["vysnc_chain_counter_to_vpos"] ? runtime.overrides["vysnc_chain_counter_to_vpos"](next_counter, next_vblank) : method_vysnc_chain_counter_to_vpos(runtime, next_counter, next_vblank))) | 0);
    (__L5 ?? runtime.memberCall(members.m_interrupt_timer, "adjust", 0, __L6))((__L4 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(next_vpos));
  }

  function method_vpos_to_vysnc_chain_counter(runtime: any, vpos: any): any {
    const members = runtime.members;

    let counter: any = ((0) & 0xff);
    let vblank: any = ((((Number(vpos) >= Number(224)) ? 1 : 0)) | 0);
    if (vblank) {
      counter = ((__add_vpos_to_vysnc_chain_counter(runtime, ((vpos) - (224)), 218)) & 0xff);
    } else {
      counter = ((((vpos) + (32))) & 0xff);
    }
    return counter;
  }
  function __add_vpos_to_vysnc_chain_counter(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_vysnc_chain_counter_to_vpos(runtime: any, counter: any, vblank: any): any {
    const members = runtime.members;

    counter = ((counter) & 0xff);
    let vpos: any = ((0) | 0);
    if (vblank) {
      vpos = ((__add_vysnc_chain_counter_to_vpos(runtime, ((counter) - (218)), 224)) | 0);
    } else {
      vpos = ((((counter) - (32))) | 0);
    }
    return vpos;
  }
  function __add_vysnc_chain_counter_to_vpos(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_interrupt_vector(runtime: any, irqline: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["machine"], __L2: any = __l["machine().time"], __L3: any = __l["m_maincpu.set_input_line"];
    let __t0: any;

    let vpos: any = (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) | 0);
    if (((Number(((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) < Number((members.m_interrupt_time ?? runtime.member("m_interrupt_time")))) ? 1 : 0)) {
      vpos = ((((vpos) + (1))) | 0);
    }
    let counter: any = (((runtime.overrides["vpos_to_vysnc_chain_counter"] ? runtime.overrides["vpos_to_vysnc_chain_counter"](vpos) : method_vpos_to_vysnc_chain_counter(runtime, vpos))) & 0xff);
    let vector: any = ((((((199) | (runtime.shiftRight(((counter) & (64)), 2)))) | (runtime.shiftRight((((~counter)) & (64)), 3)))) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    return vector;
  }

  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_int_enable = ((state) ? 1 : 0);
  }

  function method_screen_update_invaders(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t::white"], __L1: any = __l["rgb_t::black"];

    const h_m_main_ram = members.m_main_ram ?? runtime.member("m_main_ram");
    let x: any = ((0) & 0xff);
    let y: any = ((32) & 0xff);
    let video_data: any = ((0) & 0xff);
    while (1) {
      let pen: any = ((((video_data) & (1))) ? ((__L0 ? __L0() : runtime.macro("rgb_t::white"))) : ((__L1 ? __L1() : runtime.macro("rgb_t::black"))));
      if ((members.m_flip_screen ?? runtime.member("m_flip_screen"))) {
        bitmap["pix="](((223) - (((y) - (32)))), ((259) - (x)), pen);
      } else {
        bitmap["pix="](((y) - (32)), x, pen);
      }
      video_data = ((((video_data) >>> (1))) & 0xff);
      x = ((((x) + (1))) & 0xff);
      if ((((x) === (0)) ? 1 : 0)) {
        for (let i: any = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
          pen = ((((video_data) & (1))) ? ((__L0 ? __L0() : runtime.macro("rgb_t::white"))) : ((__L1 ? __L1() : runtime.macro("rgb_t::black"))));
          if ((members.m_flip_screen ?? runtime.member("m_flip_screen"))) {
            bitmap["pix="](((223) - (((y) - (32)))), ((259) - (((256) + (i)))), pen);
          } else {
            bitmap["pix="](((y) - (32)), ((256) + (i)), pen);
          }
          video_data = ((((video_data) >>> (1))) & 0xff);
        }
        y = ((((y) + (1))) & 0xff);
        if ((((y) === (0)) ? 1 : 0)) {
          break;
        }
      } else {
        if (((Number(((x) & (7))) === Number(4)) ? 1 : 0)) {
          let offs: any = ((((y) << (5))) | (((x) >>> (3))));
          video_data = ((runtime.readIndex(h_m_main_ram, offs)) & 0xff);
        }
      }
    }
    return 0;
  }

  function method_invaders_sw6_sw7_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 3;
    } else {
      return (__t0 = __deref_invaders_sw6_sw7_r(runtime, (__L0 ? __L0("SW6SW7") : runtime.macro("ioport", "SW6SW7"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("SW6SW7") : runtime.macro("ioport", "SW6SW7")), "read"));
    }
  }
  function __deref_invaders_sw6_sw7_r(runtime: any, p: any): any {
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

  function method_is_cabinet_cocktail(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_cabinet_type.read"], __L1: any = __l["read"];
    let __t0: any;

    return ((((__L0 ?? runtime.memberCall(members.m_cabinet_type, "read", 0, __L1))()) >>> (0)) & 1);
  }

  function method_invaders_in0_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_player_controls[0].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 7;
    } else {
      return (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __L1))();
    }
  }

  function method_invaders_sw5_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 1;
    } else {
      return (__t0 = __deref_invaders_sw5_r(runtime, (__L0 ? __L0("SW5") : runtime.macro("ioport", "SW5"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("SW5") : runtime.macro("ioport", "SW5")), "read"));
    }
  }
  function __deref_invaders_sw5_r(runtime: any, p: any): any {
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

  function method_invaders_in1_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_player_controls[0].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __L1))();
  }

  function method_invaders_in2_control_r(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return (__t0 = __deref_invaders_in2_control_r(runtime, runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0))), "read"));
  }
  function __deref_invaders_in2_control_r(runtime: any, p: any): any {
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
    "interrupt_trigger": method_interrupt_trigger,
    "vpos_to_vysnc_chain_counter": method_vpos_to_vysnc_chain_counter,
    "vysnc_chain_counter_to_vpos": method_vysnc_chain_counter_to_vpos,
    "interrupt_vector": method_interrupt_vector,
    "int_enable_w": method_int_enable_w,
    "screen_update_invaders": method_screen_update_invaders,
    "invaders_sw6_sw7_r": method_invaders_sw6_sw7_r,
    "is_cabinet_cocktail": method_is_cabinet_cocktail,
    "invaders_in0_control_r": method_invaders_in0_control_r,
    "invaders_sw5_r": method_invaders_sw5_r,
    "invaders_in1_control_r": method_invaders_in1_control_r,
    "invaders_in2_control_r": method_invaders_in2_control_r
  };
  return __methodTable;
})();
    return {
      "mw8080bw_state.interrupt_trigger": methods["interrupt_trigger"],
      "mw8080bw_state.vpos_to_vysnc_chain_counter": methods["vpos_to_vysnc_chain_counter"],
      "mw8080bw_state.vysnc_chain_counter_to_vpos": methods["vysnc_chain_counter_to_vpos"],
      "mw8080bw_state.interrupt_vector": methods["interrupt_vector"],
      "mw8080bw_state.int_enable_w": methods["int_enable_w"],
    };
  })(),
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


  function method_int_enable_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_int_enable = ((state) ? 1 : 0);
  }

  function method_screen_update_invaders(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t::white"], __L1: any = __l["rgb_t::black"];

    const h_m_main_ram = members.m_main_ram ?? runtime.member("m_main_ram");
    let x: any = ((0) & 0xff);
    let y: any = ((32) & 0xff);
    let video_data: any = ((0) & 0xff);
    while (1) {
      let pen: any = ((((video_data) & (1))) ? ((__L0 ? __L0() : runtime.macro("rgb_t::white"))) : ((__L1 ? __L1() : runtime.macro("rgb_t::black"))));
      if ((members.m_flip_screen ?? runtime.member("m_flip_screen"))) {
        bitmap["pix="](((223) - (((y) - (32)))), ((259) - (x)), pen);
      } else {
        bitmap["pix="](((y) - (32)), x, pen);
      }
      video_data = ((((video_data) >>> (1))) & 0xff);
      x = ((((x) + (1))) & 0xff);
      if ((((x) === (0)) ? 1 : 0)) {
        for (let i: any = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
          pen = ((((video_data) & (1))) ? ((__L0 ? __L0() : runtime.macro("rgb_t::white"))) : ((__L1 ? __L1() : runtime.macro("rgb_t::black"))));
          if ((members.m_flip_screen ?? runtime.member("m_flip_screen"))) {
            bitmap["pix="](((223) - (((y) - (32)))), ((259) - (((256) + (i)))), pen);
          } else {
            bitmap["pix="](((y) - (32)), ((256) + (i)), pen);
          }
          video_data = ((((video_data) >>> (1))) & 0xff);
        }
        y = ((((y) + (1))) & 0xff);
        if ((((y) === (0)) ? 1 : 0)) {
          break;
        }
      } else {
        if (((Number(((x) & (7))) === Number(4)) ? 1 : 0)) {
          let offs: any = ((((y) << (5))) | (((x) >>> (3))));
          video_data = ((runtime.readIndex(h_m_main_ram, offs)) & 0xff);
        }
      }
    }
    return 0;
  }

  function method_invaders_sw6_sw7_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 3;
    } else {
      return (__t0 = __deref_invaders_sw6_sw7_r(runtime, (__L0 ? __L0("SW6SW7") : runtime.macro("ioport", "SW6SW7"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("SW6SW7") : runtime.macro("ioport", "SW6SW7")), "read"));
    }
  }
  function __deref_invaders_sw6_sw7_r(runtime: any, p: any): any {
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

  function method_is_cabinet_cocktail(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_cabinet_type.read"], __L1: any = __l["read"];
    let __t0: any;

    return ((((__L0 ?? runtime.memberCall(members.m_cabinet_type, "read", 0, __L1))()) >>> (0)) & 1);
  }

  function method_invaders_in0_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_player_controls[0].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 7;
    } else {
      return (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __L1))();
    }
  }

  function method_invaders_sw5_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    if ((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) {
      return 1;
    } else {
      return (__t0 = __deref_invaders_sw5_r(runtime, (__L0 ? __L0("SW5") : runtime.macro("ioport", "SW5"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("SW5") : runtime.macro("ioport", "SW5")), "read"));
    }
  }
  function __deref_invaders_sw5_r(runtime: any, p: any): any {
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

  function method_invaders_in1_control_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_player_controls[0].read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_player_controls, 0), "read", 0, __L1))();
  }

  function method_invaders_in2_control_r(runtime: any): any {
    const members = runtime.members;
    let __t0: any;

    const h_m_player_controls = members.m_player_controls ?? runtime.member("m_player_controls");
    return (__t0 = __deref_invaders_in2_control_r(runtime, runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container(runtime.readIndex(h_m_player_controls, (((runtime.overrides["is_cabinet_cocktail"] ? runtime.overrides["is_cabinet_cocktail"]() : method_is_cabinet_cocktail(runtime))) ? (1) : (0))), "read"));
  }
  function __deref_invaders_in2_control_r(runtime: any, p: any): any {
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
    "int_enable_w": method_int_enable_w,
    "screen_update_invaders": method_screen_update_invaders,
    "invaders_sw6_sw7_r": method_invaders_sw6_sw7_r,
    "is_cabinet_cocktail": method_is_cabinet_cocktail,
    "invaders_in0_control_r": method_invaders_in0_control_r,
    "invaders_sw5_r": method_invaders_sw5_r,
    "invaders_in1_control_r": method_invaders_in1_control_r,
    "invaders_in2_control_r": method_invaders_in2_control_r
  };
  return __methodTable;
})();
    return {
      "invaders_state.screen_update_invaders": methods["screen_update_invaders"],
      "invaders_state.invaders_sw6_sw7_r": methods["invaders_sw6_sw7_r"],
      "invaders_state.is_cabinet_cocktail": methods["is_cabinet_cocktail"],
      "invaders_state.invaders_in0_control_r": methods["invaders_in0_control_r"],
      "invaders_state.invaders_sw5_r": methods["invaders_sw5_r"],
      "invaders_state.invaders_in1_control_r": methods["invaders_in1_control_r"],
      "invaders_state.invaders_in2_control_r": methods["invaders_in2_control_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust","ioport","m_cabinet_type.read","m_interrupt_timer.adjust","m_maincpu.set_input_line","m_player_controls[0].read","m_screen.time_until_pos","m_screen.vpos","machine","machine().time","read","rgb_t::black","rgb_t::white"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
