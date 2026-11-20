// GENERATED executable machine composition from src/mame/sinclair/spec128.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'spec128');

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
  const __mame_table_0 = [5, 2, 0, 1, 3, 4, 6, 7];

  function method_spectrum_ula_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_r"], __L1: any = __l["m_io_plus0.read_safe"], __L2: any = __l["read_safe"], __L3: any = __l["m_io_plus1.read_safe"], __L4: any = __l["m_io_plus2.read_safe"], __L5: any = __l["m_io_plus3.read_safe"], __L6: any = __l["m_io_plus4.read_safe"], __L7: any = __l["m_io_joy1.read_safe"], __L8: any = __l["m_io_joy2.read_safe"], __L9: any = __l["m_exp.iorq_r"], __L10: any = __l["m_io_line0.read"], __L11: any = __l["read"], __L12: any = __l["m_io_line1.read"], __L13: any = __l["m_io_line2.read"], __L14: any = __l["m_io_line3.read"], __L15: any = __l["m_io_line4.read"], __L16: any = __l["m_io_line5.read"], __L17: any = __l["m_io_line6.read"], __L18: any = __l["m_io_line7.read"], __L19: any = __l["m_cassette.input"], __L20: any = __l["m_io_config.read"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any;

    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_r", 0, undefined))(offset);
    let lines: any = ((((offset) >>> (8))) | 0);
    let data: any = ((255) | 0);
    let cs_extra1: any = (((((__L1 ?? runtime.memberCall(members.m_io_plus0, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let cs_extra2: any = (((((__L3 ?? runtime.memberCall(members.m_io_plus1, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let cs_extra3: any = (((((__L4 ?? runtime.memberCall(members.m_io_plus2, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let ss_extra1: any = (((((__L5 ?? runtime.memberCall(members.m_io_plus3, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let ss_extra2: any = (((((__L6 ?? runtime.memberCall(members.m_io_plus4, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let joy1: any = (((((__L7 ?? runtime.memberCall(members.m_io_joy1, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let joy2: any = (((((__L8 ?? runtime.memberCall(members.m_io_joy2, "read_safe", 0, __L2))(31)) & (31))) | 0);
    if (h_m_exp) {
      data = (((__L9 ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(offset)) | 0);
    }
    if (((Number(((lines) & (1))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L10 ?? runtime.memberCall(members.m_io_line0, "read", 0, __L11))()))) | 0);
      if ((((((((((cs_extra1) !== (31)) ? 1 : 0)) || ((((cs_extra2) !== (31)) ? 1 : 0))) ? 1 : 0)) || ((((cs_extra3) !== (31)) ? 1 : 0))) ? 1 : 0)) {
        data = ((((data) & (-2))) | 0);
      }
    }
    if (((Number(((lines) & (2))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L12 ?? runtime.memberCall(members.m_io_line1, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (4))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L13 ?? runtime.memberCall(members.m_io_line2, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (8))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L14 ?? runtime.memberCall(members.m_io_line3, "read", 0, __L11))()) & (cs_extra1))) & (joy2))))) | 0);
    }
    if (((Number(((lines) & (16))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L15 ?? runtime.memberCall(members.m_io_line4, "read", 0, __L11))()) & (cs_extra2))) & (joy1))))) | 0);
    }
    if (((Number(((lines) & (32))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((__L16 ?? runtime.memberCall(members.m_io_line5, "read", 0, __L11))()) & (ss_extra1))))) | 0);
    }
    if (((Number(((lines) & (64))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L17 ?? runtime.memberCall(members.m_io_line6, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (128))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L18 ?? runtime.memberCall(members.m_io_line7, "read", 0, __L11))()) & (cs_extra3))) & (ss_extra2))))) | 0);
      if (((((((ss_extra1) !== (31)) ? 1 : 0)) || ((((ss_extra2) !== (31)) ? 1 : 0))) ? 1 : 0)) {
        data = ((((data) & (-3))) | 0);
      }
    }
    data = ((((data) | (224))) | 0);
    if (((Number((__L19 ?? runtime.memberCall(members.m_cassette, "input", 0, undefined))()) > Number(0.0038)) ? 1 : 0)) {
      data = ((((data) & (-65))) | 0);
    }
    if (((Number((((__L20 ?? runtime.memberCall(members.m_io_config, "read", 0, __L11))()) & (128))) === Number(0)) ? 1 : 0)) {
      data = ((((data) ^ (64))) | 0);
    }
    return data;
  }

  function method_spectrum_ula_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_cassette.output"], __L3: any = __l["m_speaker.level_w"], __L4: any = __l["m_exp.iorq_w"];
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
    let changed: any = (((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) ^ (data))) & 0xff);
    if (((changed) & (7))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    if (((changed) & (24))) {
      if ((((changed) >>> (3)) & 1)) {
        (__L2 ?? runtime.memberCall(members.m_cassette, "output", 0, undefined))((((((data) >>> (3)) & 1)) ? ((-1)) : ((+1))));
      }
      (__L3 ?? runtime.memberCall(members.m_speaker, "level_w", 0, undefined))((((data) >>> (3)) & ((1 << (2)) - 1)));
    }
    if (h_m_exp) {
      (__L4 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(offset, data);
    }
    members.m_port_fe_data = ((data) | 0);
  }

  function method_spectrum_port_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.io_r"], __L1: any = __l["m_exp.get_card_device"], __L2: any = __l["m_exp.iorq_r"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_ula, "io_r", 0, undefined))(offset);
    if ((__L1 ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
      return (__L2 ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(((offset) | (1)));
    }
    return (runtime.overrides["floating_bus_r"] ? runtime.overrides["floating_bus_r"]() : method_floating_bus_r(runtime));
  }

  function method_floating_bus_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.is_in_contended_area"], __L1: any = __l["m_screen.vpos"], __L2: any = __l["m_maincpu.total_cycles"], __L3: any = __l["m_ula.get_irq_at"], __L4: any = __l["m_ula.get_video_line_clocks"], __L5: any = __l["m_ula.get_raster_contention_offset"], __L6: any = __l["m_ula.get_raster_line_clocks"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any;

    let data: any = ((255) & 0xff);
    if ((__L0 ?? runtime.memberCall(members.m_ula, "is_in_contended_area", 0, undefined))()) {
      let vpos: any = (__L1 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
      let now: any = runtime.subtract((__L2 ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (__L3 ?? runtime.memberCall(members.m_ula, "get_irq_at", 0, undefined))());
      let cf: any = __add_floating_bus_r(runtime, ((vpos) * ((__L4 ?? runtime.memberCall(members.m_ula, "get_video_line_clocks", 0, undefined))())), (__L5 ?? runtime.memberCall(members.m_ula, "get_raster_contention_offset", 0, undefined))());
      let ct: any = ((cf) + ((__L6 ?? runtime.memberCall(members.m_ula, "get_raster_line_clocks", 0, undefined))()));
      if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
        let clocks: any = ((now) - (cf));
        if ((((((clocks) >>> (2)) & 1)) ? 0 : 1)) {
          let y: any = ((((vpos) - ((__t7 = __deref_floating_bus_r(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t7.top === 'function' ? (__t7.top() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
          let x: any = ((__add_floating_bus_r(runtime, runtime.shiftRight(clocks, 2), (((clocks) >>> (1)) & 1))) & 0xffff);
          data = ((((((clocks) & (1))) ? (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), __add_floating_bus_r(runtime, 6144, ((((((y) & (248))) << (2))) | (x))))) : (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (7))) << (8))) | (((((y) & (56))) << (2))))) | (((((y) & (192))) << (5))))) | (x)))))) & 0xff);
        }
      }
    }
    return data;
  }
  function __add_floating_bus_r(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_floating_bus_r(runtime: any, p: any): any {
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

  function method_get_screen_area(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rectangle"];

    return (__L0 ? __L0(48, 303, 63, 254) : runtime.macro("rectangle", 48, 303, 63, 254));
  }

  function method_spectrum_port_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.io_w"], __L1: any = __l["m_exp.get_card_device"], __L2: any = __l["m_exp.iorq_w"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "io_w", 0, undefined))(offset);
    if ((__L1 ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
      (__L2 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
    }
  }

  function method_spectrum_128_port_7ffd_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_w"], __L1: any = __l["m_exp.iorq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
    if ((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (32))) {
      return;
    }
    members.m_port_7ffd_data = ((data) | 0);
    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
    (__L1 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
  }

  function method_spectrum_128_update_memory(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_rom[0].set_entry"], __L1: any = __l["set_entry"], __L2: any = __l["m_bank_ram[3].set_entry"], __L3: any = __l["m_ula.bank3_pg_w"], __L4: any = __l["m_screen.update_now"], __L5: any = __l["m_ram.pointer"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "set_entry", 0, __L1))(((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1));
    (__L2 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "set_entry", 0, __L1))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
    (__L3 ?? runtime.memberCall(members.m_ula, "bank3_pg_w", 0, undefined))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
    (__L4 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) {
      members.m_screen_location = __add_spectrum_128_update_memory(runtime, (__L5 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 114688);
    } else {
      members.m_screen_location = __add_spectrum_128_update_memory(runtime, (__L5 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 81920);
    }
  }
  function __add_spectrum_128_update_memory(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_128_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.romcs"], __L1: any = __l["m_exp.mreq_r"], __L2: any = __l["m_bank_rom[0].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    return (((__L0 ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))()) ? ((__L1 ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex(runtime.byteView((__L2 ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "base", 0, __L3))()), offset)));
  }

  function method_spectrum_128_rom_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.mreq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
  }

  function method_spectrum_128_ram_r_1(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[1].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((16384) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? (__t0 = __deref_spectrum_128_ram_r_1(runtime, runtime.readIndex(h_m_bank_ram, 1)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_1(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_1(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[1].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((16384) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? (__t1 = __deref_spectrum_128_ram_w_1(runtime, runtime.readIndex(h_m_bank_ram, 1)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_1(runtime: any, p: any): any {
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

  function method_is_vram_write(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_ram[3].entry"], __L1: any = __l["entry"], __L2: any = __l["spectrum_state::is_vram_write"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    return (((((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) && (((Number((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __L1))()) === Number(7)) ? 1 : 0))) ? 1 : 0)) ? (((((((offset) >= (49152)) ? 1 : 0)) && ((((offset) < (56064)) ? 1 : 0))) ? 1 : 0)) : ((__L2 ? __L2(offset) : runtime.macro("spectrum_state::is_vram_write", offset))));
  }

  function method_spectrum_128_ram_r_2(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[2].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((32768) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? (__t0 = __deref_spectrum_128_ram_r_2(runtime, runtime.readIndex(h_m_bank_ram, 2)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_2(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[2].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((32768) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? (__t1 = __deref_spectrum_128_ram_w_2(runtime, runtime.readIndex(h_m_bank_ram, 2)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_2(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_r_3(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[3].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((49152) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? (__t0 = __deref_spectrum_128_ram_r_3(runtime, runtime.readIndex(h_m_bank_ram, 3)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_3(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_3(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[3].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((49152) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? (__t1 = __deref_spectrum_128_ram_w_3(runtime, runtime.readIndex(h_m_bank_ram, 3)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_3(runtime: any, p: any): any {
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

  function method_spectrum_128_pre_opcode_fetch_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.m1"], __L1: any = __l["m_exp.pre_opcode_fetch"], __L2: any = __l["m_program.read_byte"], __L3: any = __l["read_byte"], __L4: any = __l["m_exp.post_opcode_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_program, "read_byte", 0, __L3))(offset)) & 0xff);
    (__L4 ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.romcs"], __L1: any = __l["m_exp.mreq_r"];
    let __t0: any;

    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return (((((h_m_exp) && ((__L0 ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))())) ? 1 : 0)) ? ((__L1 ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex(h_m_rom, offset)));
  }

  function method_spectrum_rom_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.mreq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
  }

  function method_pre_opcode_fetch_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.m1"], __L1: any = __l["m_exp.pre_opcode_fetch"], __L2: any = __l["m_specmem.read8"], __L3: any = __l["m_exp.post_opcode_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_data_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_exp.pre_data_fetch"], __L2: any = __l["m_specmem.read8"], __L3: any = __l["m_exp.post_data_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_data_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_exp, "post_data_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_specmem.write8"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(offset);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](offset) : method_is_vram_write(runtime, offset))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    (__L2 ?? runtime.memberCall(members.m_specmem, "write8", 0, undefined))(offset, data);
  }

  function method_spec_interrupt(runtime: any, device: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.time_until_pos"], __L1: any = __l["m_irq_on_timer.adjust"], __L2: any = __l["adjust"];
    let __t0: any;

    (__L1 ?? runtime.memberCall(members.m_irq_on_timer, "adjust", 0, __L2))((__L0 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(0, (__t0 = __deref_spec_interrupt(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t0.left === 'function' ? (__t0.left() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))));
  }
  function __deref_spec_interrupt(runtime: any, p: any): any {
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

  function method_spectrum_refresh_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.is_snow_possible"], __L1: any = __l["m_screen.hpos"], __L2: any = __l["screen.left"], __L3: any = __l["left"], __L4: any = __l["m_screen.vpos"], __L5: any = __l["screen.top"], __L6: any = __l["top"], __L7: any = __l["m_maincpu.adjust_icount"], __L8: any = __l["m_screen.update_now"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    data = ((data) & 0xff);
    if ((((__L0 ?? runtime.memberCall(members.m_ula, "is_snow_possible", 0, undefined))(offset)) ? 0 : 1)) {
      return;
    }
    let screen: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
    let x: any = ((runtime.subtract((__L1 ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))(), (__L2 ?? runtime.memberCall(screen, "left", 0, __L3))())) & 0xff);
    let y: any = ((runtime.subtract((__L4 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), (__L5 ?? runtime.memberCall(screen, "top", 0, __L6))())) & 0xffff);
    let snow_pattern: any = ((0) & 0xff);
    let t_to_chunk_end: any = ((0) & 0xff);
    if (((Number(((x) % (16))) === Number(0)) ? 1 : 0)) {
      snow_pattern = ((1) & 0xff);
      t_to_chunk_end = ((4) & 0xff);
    } else {
      if (((Number(((x) % (16))) === Number(4)) ? 1 : 0)) {
        snow_pattern = ((2) & 0xff);
        x = ((((x) + (8))) & 0xff);
        t_to_chunk_end = ((6) & 0xff);
      } else {
        return;
      }
    }
    let px_addr_hi: any = ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (32))) << (2))))) & 0xffff);
    let attr_addr_hi: any = ((((6144) | (((((y) & (224))) << (2))))) & 0xffff);
    let addr_lo: any = ((((((((y) & (24))) << (2))) | (((x) >>> (3))))) & 0xff);
    let px_tmp: any = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((px_addr_hi) | (addr_lo)))) & 0xff);
    let attr_tmp: any = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((attr_addr_hi) | (addr_lo)))) & 0xff);
    if ((((snow_pattern) === (1)) ? 1 : 0)) {
      let i: any = ((((offset) >>> (8))) & 0xff);
      let r: any = ((((((offset) + (1))) & (127))) & 0xff);
      let base: any = (runtime.overrides["snow_pattern1_base"] ? runtime.overrides["snow_pattern1_base"](i) : method_snow_pattern1_base(runtime, i)); let base$s: any = undefined, base$o: any = 0; if (ArrayBuffer.isView(base) || Array.isArray(base)) base$s = base; else if (base !== null && typeof base === 'object' && base.generatedPointer === true && base.path === undefined && base.target === undefined && (ArrayBuffer.isView(base.source) || Array.isArray(base.source))) { base$s = base.source; base$o = base.offset; }
      runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), (base$s !== undefined ? (base$s[base$o + (((px_addr_hi) | (r)))] ?? 0) : runtime.readIndex(base, ((px_addr_hi) | (r)))));
      runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), (base$s !== undefined ? (base$s[base$o + (((attr_addr_hi) | (r)))] ?? 0) : runtime.readIndex(base, ((attr_addr_hi) | (r)))));
    } else {
      if ((((snow_pattern) === (2)) ? 1 : 0)) {
        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((px_addr_hi) | (addr_lo))) - (1))));
        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((attr_addr_hi) | (addr_lo))) - (1))));
      }
    }
    (__L7 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))((-t_to_chunk_end));
    (__L8 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    (__L7 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(t_to_chunk_end);
    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), px_tmp);
    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), attr_tmp);
  }

  function method_snow_pattern1_base(runtime: any, i_reg: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_ram[3].entry"], __L1: any = __l["entry"], __L2: any = __l["m_ram.pointer"];
    let __t0: any, __t1: any;

    i_reg = ((i_reg) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let is_alt_scr_selected: any = ((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) ? 1 : 0);
    let is_alt_scr: any = ((((i_reg) & (128))) ? 1 : 0);
    let i_pg: any = ((((is_alt_scr) ? ((((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __L1))()) & (5))) : (5))) & 0xff);
    return __add_snow_pattern1_base(runtime, (__L2 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), ((((i_pg) | (((is_alt_scr_selected) << (1))))) << (14)));
  }
  function __add_snow_pattern1_base(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_nomem_rq(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_screen_update_spectrum(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.visible_area"], __L1: any = __l["visible_area"], __L2: any = __l["vis.left"], __L3: any = __l["left"], __L4: any = __l["vis.right"], __L5: any = __l["right"], __L6: any = __l["vis.top"], __L7: any = __l["top"], __L8: any = __l["scr.top"], __L9: any = __l["rectangle"], __L10: any = __l["scr.left"], __L11: any = __l["scr.bottom"], __L12: any = __l["bottom"], __L13: any = __l["scr.right"], __L14: any = __l["vis.bottom"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any, __t12: any, __t13: any, __t14: any, __t15: any, __t16: any;

    let scr: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
    let vis: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ?? runtime.memberCall(screen, "visible_area", 0, __L1))());
    if ((runtime.same(vis, scr) ? 0 : 1)) {
      let bsides: any = [(__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L6 ?? runtime.memberCall(vis, "top", 0, __L7))(), runtime.subtract((__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), 1)) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L6 ?? runtime.memberCall(vis, "top", 0, __L7))(), runtime.subtract((__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), 1))), (__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), runtime.subtract((__L10 ?? runtime.memberCall(scr, "left", 0, __L3))(), 1), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))()) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), runtime.subtract((__L10 ?? runtime.memberCall(scr, "left", 0, __L3))(), 1), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))())), (__L9 ? __L9(__add_screen_update_spectrum(runtime, (__L13 ?? runtime.memberCall(scr, "right", 0, __L5))(), 1), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))()) : runtime.macro("rectangle", __add_screen_update_spectrum(runtime, (__L13 ?? runtime.memberCall(scr, "right", 0, __L5))(), 1), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))())), (__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), __add_screen_update_spectrum(runtime, (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))(), 1), (__L14 ?? runtime.memberCall(vis, "bottom", 0, __L12))()) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), __add_screen_update_spectrum(runtime, (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))(), 1), (__L14 ?? runtime.memberCall(vis, "bottom", 0, __L12))()))];
      for (let i: any = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        let border: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(runtime.and((bsides[i] ?? 0), cliprect));
        if ((((border).empty()) ? 0 : 1)) {
          (runtime.overrides["spectrum_update_border"] ? runtime.overrides["spectrum_update_border"](screen, bitmap, border) : method_spectrum_update_border(runtime, screen, bitmap, border));
        }
      }
    }
    scr = runtime.andAssign(scr, cliprect);
    if ((((scr).empty()) ? 0 : 1)) {
      (runtime.overrides["spectrum_update_screen"] ? runtime.overrides["spectrum_update_screen"](screen, bitmap, scr) : method_spectrum_update_screen(runtime, screen, bitmap, scr));
    }
    return 0;
  }
  function __add_screen_update_spectrum(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_update_border(runtime: any, screen: any, bitmap: any, border: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.get_border_chunk_size"], __L1: any = __l["m_ula.get_btime"], __L2: any = __l["border.top"], __L3: any = __l["top"], __L4: any = __l["border.bottom"], __L5: any = __l["bottom"], __L6: any = __l["border.left"], __L7: any = __l["left"], __L8: any = __l["border.right"], __L9: any = __l["right"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any;

    let mod: any = (((__L0 ?? runtime.memberCall(members.m_ula, "get_border_chunk_size", 0, undefined))()) & 0xff);
    let btime: any = (((__L1 ?? runtime.memberCall(members.m_ula, "get_btime", 0, undefined))()) & 0xff);
    for (let y: any = (__L2 ?? runtime.memberCall(border, "top", 0, __L3))(); ((Number(y) <= Number((__L4 ?? runtime.memberCall(border, "bottom", 0, __L5))())) ? 1 : 0); y = ((y) + (1))) {
      let pix: any = bitmap["pix&"](y, (__L6 ?? runtime.memberCall(border, "left", 0, __L7))());
      for (let x: any = (__L6 ?? runtime.memberCall(border, "left", 0, __L7))(); ((Number(x) <= Number((__L8 ?? runtime.memberCall(border, "right", 0, __L9))())) ? 1 : 0); ) {
        if (((Number(((x) % (mod))) === Number(btime)) ? 1 : 0)) {
          pix = runtime.subtract(pix, btime);
          x = ((x) - (btime));
          for (let m: any = 0; ((Number(m) < Number(mod)) ? 1 : 0); m = ((m) + (1)), x = ((x) + (1))) {
            runtime.pointerStore((__t7 = pix, pix = __add_spectrum_update_border(runtime, pix, 1), __t7), (runtime.overrides["get_border_color"] ? runtime.overrides["get_border_color"](y, x) : method_get_border_color(runtime, y, x)));
          }
        } else {
          pix = __add_spectrum_update_border(runtime, pix, 1);
          x = ((x) + (1));
        }
      }
    }
  }
  function __add_spectrum_update_border(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_get_border_color(runtime: any, hpos: any, vpos: any): any {
    const members = runtime.members;

    hpos = ((hpos) & 0xffff);
    vpos = ((vpos) & 0xffff);
    return (((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (7));
  }

  function method_spectrum_update_screen(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.frame_number"], __L1: any = __l["frame_number"], __L2: any = __l["cliprect.top"], __L3: any = __l["top"], __L4: any = __l["cliprect.bottom"], __L5: any = __l["bottom"], __L6: any = __l["cliprect.left"], __L7: any = __l["left"], __L8: any = __l["m_ula.get_atime_right"], __L9: any = __l["m_ula.get_atime_left"], __L10: any = __l["cliprect.right"], __L11: any = __l["right"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any;

    let invert_attrs: any = ((((runtime.divide((__L0 ?? runtime.memberCall(screen, "frame_number", 0, __L1))(), (members.m_frame_invert_count ?? runtime.member("m_frame_invert_count")))) & (1))) ? 1 : 0);
    for (let vpos: any = (((__L2 ?? runtime.memberCall(cliprect, "top", 0, __L3))()) & 0xffff); ((Number(vpos) <= Number((__L4 ?? runtime.memberCall(cliprect, "bottom", 0, __L5))())) ? 1 : 0); vpos = ((((vpos) + (1))) & 0xffff)) {
      let hpos: any = (((__L6 ?? runtime.memberCall(cliprect, "left", 0, __L7))()) & 0xffff);
      let x: any = ((((hpos) - ((__t4 = __deref_spectrum_update_screen(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t4.left === 'function' ? (__t4.left() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))))) & 0xffff);
      let chunk_right: any = ((((x) & (8))) ? 1 : 0);
      if (((Number(((x) % (8))) <= Number(((chunk_right) ? ((__L8 ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__L9 ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))())))) ? 1 : 0)) {
        let shift: any = ((((x) % (8))) & 0xff);
        x = ((((x) - (shift))) & 0xffff);
        hpos = ((((hpos) - (shift))) & 0xffff);
      } else {
        let shift: any = ((((8) - (((x) % (8))))) & 0xff);
        x = ((((x) + (shift))) & 0xffff);
        hpos = ((((hpos) + (shift))) & 0xffff);
        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
      }
      let y: any = ((((vpos) - ((__t7 = __deref_spectrum_update_screen(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t7.top === 'function' ? (__t7.top() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
      let scr: any = __addr_spectrum_update_screen(runtime, (members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (56))) << (2))))) | (((x) >>> (3)))));
      let attr: any = __addr_spectrum_update_screen(runtime, (members.m_screen_location ?? runtime.member("m_screen_location")), ((6144) | (((((((y) & (248))) << (2))) | (((x) >>> (3)))))));
      let pix: any = bitmap["pix&"](vpos, hpos);
      while (((Number(((hpos) + (((chunk_right) ? ((__L8 ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__L9 ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))()))))) <= Number((__L10 ?? runtime.memberCall(cliprect, "right", 0, __L11))())) ? 1 : 0)) {
        let ink: any = ((((((runtime.shiftRight(__deref_spectrum_update_screen(runtime, attr), 3)) & (8))) | (((__deref_spectrum_update_screen(runtime, attr)) & (7))))) & 0xffff);
        let pap: any = ((((runtime.shiftRight(__deref_spectrum_update_screen(runtime, attr), 3)) & (15))) & 0xffff);
        let pix8: any = (((((((invert_attrs) && (((__deref_spectrum_update_screen(runtime, attr)) & (128)))) ? 1 : 0)) ? ((~__deref_spectrum_update_screen(runtime, scr))) : (__deref_spectrum_update_screen(runtime, scr)))) & 0xff);
        for (let b: any = ((128) & 0xff); b; b = ((((b) >>> (1))) & 0xff), x = ((((x) + (1))) & 0xffff), hpos = ((((hpos) + (1))) & 0xffff)) {
          runtime.pointerStore((__t11 = pix, pix = __add_spectrum_update_screen(runtime, pix, 1), __t11), ((((pix8) & (b))) ? (ink) : (pap)));
        }
        scr = __add_spectrum_update_screen(runtime, scr, 1);
        attr = __add_spectrum_update_screen(runtime, attr, 1);
        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
      }
    }
  }
  function __add_spectrum_update_screen(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_spectrum_update_screen(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_spectrum_update_screen(runtime: any, p: any): any {
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

  function method_snx_decompress_block(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.write_byte"], __L1: any = __l["write_byte"];
    let __t0: any;

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let counthi: any = ((0) & 0xff);
    let countlo: any = ((0) & 0xff);
    let compress: any = ((0) & 0xff);
    let fill: any = ((0) & 0xff);
    let block: any = ((0) & 0xffff);
    let count: any = ((0) & 0xffff);
    let i: any = ((0) & 0xffff);
    let j: any = ((0) & 0xffff);
    let numbytes: any = ((0) & 0xffff);
    i = ((42) & 0xffff);
    numbytes = ((0) & 0xffff);
    while ((((numbytes) < (size)) ? 1 : 0)) {
      counthi = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
      if ((((counthi) >= (224)) ? 1 : 0)) {
        count = ((__add_snx_decompress_block(runtime, ((counthi) & (15)), 1)) & 0xffff);
        if (((Number(((counthi) & (240))) === Number(240)) ? 1 : 0)) {
          compress = ((255) & 0xff);
        } else {
          compress = ((0) & 0xff);
        }
        0;
      } else {
        countlo = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        count = ((((((counthi) << (8))) | (countlo))) & 0xffff);
        compress = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        0;
      }
      if (((Number(compress) === Number(255)) ? 1 : 0)) {
        fill = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        0;
        for (j = ((0) & 0xffff); (((j) < (count)) ? 1 : 0); j = ((((j) + (1))) & 0xffff)) {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(((((16384) + (numbytes))) + (j)), fill);
        }
        numbytes = ((((numbytes) + (count))) & 0xffff);
      } else {
        0;
        j = ((0) & 0xffff);
        while ((((j) < (count)) ? 1 : 0)) {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(__add_snx_decompress_block(runtime, ((16384) + (numbytes)), (__t0 = j, j = ((((j) + (1))) & 0xffff), __t0)), runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff))));
        }
        numbytes = ((((numbytes) + (count))) & 0xffff);
      }
    }
  }
  function __add_snx_decompress_block(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_setup_sna(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["m_maincpu.state_int"], __L6: any = __l["space.read_byte"], __L7: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let usedbanks: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](8) : new Uint8Array(Math.max(0, Number(8)))));
    let bank_offset: any = 0;
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let addr: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if ((((((Number(snapsize) !== Number(49179)) ? 1 : 0)) && (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0))) ? 1 : 0)) {
      0;
      return;
    }
    data = ((((((runtime.readIndex(snapdata, 22)) << (8))) | (runtime.readIndex(snapdata, 21)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 6)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 3)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 2)) << (8))) | (runtime.readIndex(snapdata, 1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 18)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 20)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 0)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 24)) << (8))) | (runtime.readIndex(snapdata, 23)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((runtime.readIndex(snapdata, 25)) & (3))) & 0xffff);
    if ((((data) === (3)) ? 1 : 0)) {
      data = ((2) & 0xffff);
    }
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 19)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (0)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    if (((Number(snapsize) === Number(49179)) ? 1 : 0)) {
      (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
    } else {
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 49181)) | 0);
      0;
      if (runtime.readIndex(snapdata, 49182)) {
      }
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
    if (((Number(snapsize) === Number(49179)) ? 1 : 0)) {
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((27) + (i))));
      }
      addr = (((__L5 ?? runtime.memberCall(members.m_maincpu, "state_int", 0, undefined))(1)) & 0xffff);
      if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65534)) ? 1 : 0))) ? 1 : 0)) {
        0;
      } else {
        0;
      }
      data = (((((((__L6 ?? runtime.memberCall(space, "read_byte", 0, __L7))(((addr) + (1)))) << (8))) | ((__L6 ?? runtime.memberCall(space, "read_byte", 0, __L7))(((addr) + (0)))))) & 0xffff);
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
      addr = ((((addr) + (2))) & 0xffff);
      0;
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
      data = ((((runtime.readIndex(snapdata, 26)) & (7))) & 0xffff);
      members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
      (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
      0;
    } else {
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        usedbanks[i] = 0;
      }
      usedbanks[5] = 1;
      usedbanks[2] = 1;
      usedbanks[(((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7))] = 1;
      0;
      0;
      0;
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((27) + (i))));
      }
      bank_offset = 49183;
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        if ((((usedbanks[i] ?? 0)) ? 0 : 1)) {
          0;
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + (i))) | 0);
          (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
          for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((j) + (49152)), runtime.readIndex(snapdata, ((bank_offset) + (j))));
          }
          bank_offset = ((bank_offset) + (16384));
        }
      }
      data = ((((((runtime.readIndex(snapdata, 49180)) << (8))) | (runtime.readIndex(snapdata, 49179)))) & 0xffff);
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
      data = ((((runtime.readIndex(snapdata, 26)) & (7))) & 0xffff);
      members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
      (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
      0;
      data = (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7))) & 0xffff);
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 49181)) | 0);
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
  }

  function method_page_basicrom(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      return;
    }
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (16))) | 0);
    (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
  }

  function method_update_paging(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      return;
    }
    if (((Number((members.m_port_1ffd_data ?? runtime.member("m_port_1ffd_data"))) === Number(-1)) ? 1 : 0)) {
      (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
    } else {
      if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1)) {
        members.m_port_1ffd_data = ((4) | 0);
      } else {
        members.m_port_1ffd_data = ((0) | 0);
      }
      (runtime.overrides["plus3_update_memory"] ? runtime.overrides["plus3_update_memory"]() : method_plus3_update_memory(runtime));
    }
  }

  function method_plus3_update_memory(runtime: any): any {
    const members = runtime.members;


  }

  function method_border_update(runtime: any, data: any): any {
    const members = runtime.members;


  }

  function method_setup_sp(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"];

    let i: any = ((0) | 0);
    let SP_OFFSET: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let start: any = ((0) & 0xffff);
    let size: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let status: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if ((((((Number(snapsize) === Number(16422)) ? 1 : 0)) || (((Number(snapsize) === Number(49190)) ? 1 : 0))) ? 1 : 0)) {
      SP_OFFSET = ((0) | 0);
      start = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (5)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (4)))))) & 0xffff);
      size = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (3)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (2)))))) & 0xffff);
    } else {
      SP_OFFSET = ((-6) | 0);
      start = ((16384) & 0xffff);
      size = ((49152) & 0xffff);
    }
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (13)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (12)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (7)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (6)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (9)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (8)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (11)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (10)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (25)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (24)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (19)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (18)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (21)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (20)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (23)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (22)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (15)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (14)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (17)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (16)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, ((SP_OFFSET) + (26)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, ((SP_OFFSET) + (27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (29)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (28)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (31)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (30)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    status = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (37)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (36)))))) & 0xffff);
    data = (((((((((status) >>> (3)) & 1)) << (1))) | ((((status) >>> (1)) & 1)))) & 0xffff);
    switch ((data as number)) {
      case 0:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 1);
        break;
      }
      case 1:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 2);
        break;
      }
      case 2:
      case 3:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 0);
      }
    }
    data = (((((status) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    data = (((((status) >>> (2)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((status) >>> (4)) & 1)) ? (1) : (0))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((start) + (i)), runtime.readIndex(snapdata, ((((SP_OFFSET) + (38))) + (i))));
    }
    data = ((((runtime.readIndex(snapdata, ((SP_OFFSET) + (34)))) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_plusd(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["space.write_byte"], __L3: any = __l["write_byte"], __L4: any = __l["space.read_byte"], __L5: any = __l["read_byte"], __L6: any = __l["m_maincpu.set_input_line"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 15)) << (8))) | (runtime.readIndex(snapdata, 14)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 13)) << (8))) | (runtime.readIndex(snapdata, 12)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 17)) << (8))) | (runtime.readIndex(snapdata, 16)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 11)) << (8))) | (runtime.readIndex(snapdata, 10)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 7)) << (8))) | (runtime.readIndex(snapdata, 6)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 5)) << (8))) | (runtime.readIndex(snapdata, 4)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 9)) << (8))) | (runtime.readIndex(snapdata, 8)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 3)) << (8))) | (runtime.readIndex(snapdata, 2)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 1)) << (8))) | (runtime.readIndex(snapdata, 0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 19)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, ((((((((data) === (0)) ? 1 : 0)) || ((((data) === (63)) ? 1 : 0))) ? 1 : 0)) ? (1) : (2)));
    if (((Number(snapsize) === Number(49174)) ? 1 : 0)) {
      (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((16384) + (i)), runtime.readIndex(snapdata, ((22) + (i))));
      }
    } else {
      0;
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        switch ((i as number)) {
          case 5:
          {
            addr = ((16384) & 0xffff);
            break;
          }
          case 2:
          {
            addr = ((32768) & 0xffff);
            break;
          }
          case 0:
          case 1:
          case 3:
          case 4:
          case 6:
          case 7:
          {
            addr = ((49152) & 0xffff);
            members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
            members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + (i))) | 0);
            (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
            break;
          }
        }
        0;
        for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
          (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((j) + (addr)), runtime.readIndex(snapdata, __add_setup_plusd(runtime, ((j) + (23)), ((i) * (16384)))));
        }
      }
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 22)) | 0);
      0;
      0;
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
    addr = ((((((runtime.readIndex(snapdata, 21)) << (8))) | (runtime.readIndex(snapdata, 20)))) & 0xffff);
    if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65530)) ? 1 : 0))) ? 1 : 0)) {
      0;
    } else {
      0;
    }
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (3)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (2)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (5)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (4)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    addr = ((((addr) + (6))) & 0xffff);
    0;
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
    data = ((((runtime.shiftRight((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
  }
  function __add_setup_plusd(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_setup_zx(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let mode: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    0;
    data = ((((((runtime.readIndex(snapdata, 49457)) << (8))) | (runtime.readIndex(snapdata, 49461)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 49434)) << (8))) | (runtime.readIndex(snapdata, 49435)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 49438)) << (8))) | (runtime.readIndex(snapdata, 49439)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 49442)) << (8))) | (runtime.readIndex(snapdata, 49443)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 49455)) << (8))) | (runtime.readIndex(snapdata, 49459)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 49436)) << (8))) | (runtime.readIndex(snapdata, 49437)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 49440)) << (8))) | (runtime.readIndex(snapdata, 49441)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 49444)) << (8))) | (runtime.readIndex(snapdata, 49445)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 49446)) << (8))) | (runtime.readIndex(snapdata, 49447)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 49448)) << (8))) | (runtime.readIndex(snapdata, 49449)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 49451)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 49450)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 49468)) << (8))) | (runtime.readIndex(snapdata, 49469)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 49464)) << (8))) | (runtime.readIndex(snapdata, 49465)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    mode = ((((((runtime.readIndex(snapdata, 49474)) << (8))) | (runtime.readIndex(snapdata, 49475)))) & 0xffff);
    switch ((mode as number)) {
      case 65535:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 0);
        break;
      }
      case 0:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 1);
        break;
      }
      case 1:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 2);
        break;
      }
      default:
      {
        0;
      }
    }
    data = (((((runtime.readIndex(snapdata, 49426)) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((runtime.readIndex(snapdata, 49426)) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((132) + (i))));
    }
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_frz(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      0;
      return;
    }
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 6)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 2)) << (8))) | (runtime.readIndex(snapdata, 3)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 40)) << (8))) | (runtime.readIndex(snapdata, 41)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 38)) << (8))) | (runtime.readIndex(snapdata, 39)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 25)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 30)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 28)) << (8))) | (runtime.readIndex(snapdata, 29)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 26)) << (8))) | (runtime.readIndex(snapdata, 27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((runtime.readIndex(snapdata, 33)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 37)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    addr = ((0) & 0xffff);
    0;
    for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      switch (((__mame_table_0[((i) & 7)] ?? 0) as number)) {
        case 5:
        {
          addr = ((16384) & 0xffff);
          break;
        }
        case 2:
        {
          addr = ((32768) & 0xffff);
          break;
        }
        case 0:
        case 1:
        case 3:
        case 4:
        case 6:
        case 7:
        {
          addr = ((49152) & 0xffff);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + ((__mame_table_0[((i) & 7)] ?? 0)))) | 0);
          (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
          break;
        }
      }
      0;
      for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((j) + (addr)), runtime.readIndex(snapdata, __add_setup_frz(runtime, ((j) + (42)), ((i) * (16384)))));
      }
    }
    members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 1)) | 0);
    0;
    0;
    (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
  }
  function __add_setup_frz(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_bank3_set_page(runtime: any, page: any): any {
    const members = runtime.members;

    page = ((page) & 0xff);
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (((page) & (7))))) | 0);
    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
  }

  function method_decode(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bb_stream"], __L1: any = __l["bitbuf.get_byte"], __L2: any = __l["get_byte"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["bitbuf.overflow"], __L6: any = __l["overflow"], __L7: any = __l["bitbuf.get_bit"], __L8: any = __l["get_bit"], __L9: any = __l["bitbuf.get_bits"], __L10: any = __l["get_bits"], __L11: any = __l["space.read_byte"], __L12: any = __l["read_byte"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any, __t12: any, __t13: any, __t14: any, __t15: any, __t16: any, __t17: any, __t18: any, __t19: any, __t20: any, __t21: any;

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let mask: any = [0, 0, 252, 248, 240, 224, 192, 128, 0];
    let no_bits: any = ((2) & 0xff);
    let bitbuf: any = (__L0 ? __L0(source, size) : runtime.macro("bb_stream", source, size));
    (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t0 = dest, dest = ((((dest) + (1))) & 0xffff), __t0), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
    while ((((__L5 ?? runtime.memberCall(bitbuf, "overflow", 0, __L6))()) ? 0 : 1)) {
      while ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t4 = dest, dest = ((((dest) + (1))) & 0xffff), __t4), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
      }
      let len: any = ((0) & 0xffff);
      let bb: any = ((0) & 0xff);
      do {
        bb = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
        len = ((((len) + (bb))) & 0xffff);
      } while (((((((bb) === (3)) ? 1 : 0)) && ((((len) !== (15)) ? 1 : 0))) ? 1 : 0));
      let offset: any = ((0) << 16 >> 16);
      if ((((len) === (0)) ? 1 : 0)) {
        offset = ((__add_decode(runtime, 65528, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(3))) << 16 >> 16);
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
        dest = ((((dest) + (1))) & 0xffff);
        continue;
      } else {
        if ((((len) === (1)) ? 1 : 0)) {
          let code: any = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
          if (((((((code) === (0)) ? 1 : 0)) || ((((code) === (1)) ? 1 : 0))) ? 1 : 0)) {
            offset = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) << 16 >> 16);
            offset = ((((offset) + (((((code) ? (254) : (253))) << (8))))) << 16 >> 16);
          } else {
            if ((((code) === (2)) ? 1 : 0)) {
              let b: any = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) & 0xff);
              if ((((b) >= (224)) ? 1 : 0)) {
                b = ((((b) << (1))) & 0xff);
                b = ((((b) + (1))) & 0xff);
                b = ((((b) ^ (2))) & 0xff);
                if ((((b) === (255)) ? 1 : 0)) {
                  no_bits = ((((no_bits) + (1))) & 0xff);
                  continue;
                }
                offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
                dest = ((((dest) + (1))) & 0xffff);
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t8 = dest, dest = ((((dest) + (1))) & 0xffff), __t8), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
                dest = ((((dest) + (1))) & 0xffff);
                continue;
              }
              offset = ((((65280) + (b))) << 16 >> 16);
            } else {
              if ((((code) === (3)) ? 1 : 0)) {
                offset = ((__add_decode(runtime, 65504, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(5))) << 16 >> 16);
              }
            }
          }
          for (let i: any = 0; (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
          }
          continue;
        } else {
          if ((((len) === (3)) ? 1 : 0)) {
            if ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
              offset = ((__add_decode(runtime, 65520, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(4))) << 16 >> 16);
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
              dest = ((((dest) + (1))) & 0xffff);
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t11 = dest, dest = ((((dest) + (1))) & 0xffff), __t11), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
              dest = ((((dest) + (1))) & 0xffff);
              continue;
            }
            if ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
              let bytes_no: any = ((__add_decode(runtime, 6, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(4))) & 0xff);
              for (let i: any = ((0) & 0xff); ((Number(i) < Number(((bytes_no) << (1)))) ? 1 : 0); i = ((((i) + (1))) & 0xff)) {
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t14 = dest, dest = ((((dest) + (1))) & 0xffff), __t14), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
              }
              continue;
            }
            len = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(7)) & 0xffff);
            if ((((len) === (15)) ? 1 : 0)) {
              break;
            }
            if ((((len) < (15)) ? 1 : 0)) {
              len = ((__add_decode(runtime, ((len) << (8)), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))())) & 0xffff);
            }
          }
        }
      }
      if ((((len) === (2)) ? 1 : 0)) {
        len = ((((len) + (1))) & 0xffff);
      }
      let code: any = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
      if ((((code) === (0)) ? 1 : 0)) {
        offset = ((__add_decode(runtime, 65024, (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))())) << 16 >> 16);
      } else {
        if ((((code) === (1)) ? 1 : 0)) {
          let b: any = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) & 0xff);
          if ((((b) >= (224)) ? 1 : 0)) {
            if ((((len) > (3)) ? 1 : 0)) {
              break;
            }
            b = ((((b) << (1))) & 0xff);
            b = ((((b) + (1))) & 0xff);
            b = ((((b) ^ (3))) & 0xff);
            offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t19 = dest, dest = ((((dest) + (1))) & 0xffff), __t19), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
            continue;
          }
          offset = ((((65280) + (b))) << 16 >> 16);
        } else {
          if ((((code) === (2)) ? 1 : 0)) {
            offset = ((__add_decode(runtime, 65504, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(5))) << 16 >> 16);
          } else {
            if ((((code) === (3)) ? 1 : 0)) {
              offset = ((((__add_decode(runtime, (mask[no_bits] ?? 0), (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(no_bits))) << (8))) << 16 >> 16);
              offset = ((((offset) + ((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()))) << 16 >> 16);
            }
          }
        }
      }
      for (let i: any = ((0) & 0xffff); (((i) < (len)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
        dest = ((((dest) + (1))) & 0xffff);
      }
    }
  }
  function __add_decode(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_identify_z80(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;

    let lo: any = ((0) & 0xff);
    let hi: any = ((0) & 0xff);
    let data: any = ((0) & 0xff);
    if ((((snapsize) < (30)) ? 1 : 0)) {
      return 0;
    }
    lo = ((((runtime.readIndex(snapdata, 6)) & (255))) & 0xff);
    hi = ((((runtime.readIndex(snapdata, 7)) & (255))) & 0xff);
    if ((((hi) || (lo)) ? 1 : 0)) {
      return 1;
    }
    lo = ((((runtime.readIndex(snapdata, 30)) & (255))) & 0xff);
    hi = ((((runtime.readIndex(snapdata, 31)) & (255))) & 0xff);
    data = ((((runtime.readIndex(snapdata, 34)) & (255))) & 0xff);
    if (((((((hi) === (0)) ? 1 : 0)) && ((((lo) === (23)) ? 1 : 0))) ? 1 : 0)) {
      switch ((data as number)) {
        case 0:
        case 1:
        {
          return 2;
        }
        case 2:
        {
          return 3;
        }
        case 3:
        case 4:
        {
          return 4;
        }
        case 128:
        {
          return 5;
        }
      }
    }
    if (((((((hi) === (0)) ? 1 : 0)) && ((((lo) === (54)) ? 1 : 0))) ? 1 : 0)) {
      switch ((data as number)) {
        case 0:
        case 1:
        case 3:
        {
          return 2;
        }
        case 2:
        {
          return 3;
        }
        case 4:
        case 5:
        case 6:
        {
          return 4;
        }
        case 128:
        {
          return 5;
        }
      }
    }
    return 0;
  }

  function method_z80_decompress_block(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.write_byte"], __L1: any = __l["write_byte"];

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let ch: any = ((0) & 0xff);
    let i: any = ((0) | 0);
    do {
      ch = ((runtime.readIndex(source, 0)) & 0xff);
      if ((((ch) === (237)) ? 1 : 0)) {
        if (((Number(runtime.readIndex(source, 1)) === Number(237)) ? 1 : 0)) {
          let count: any = ((0) & 0xff);
          let data: any = ((0) & 0xff);
          count = ((runtime.readIndex(source, 2)) & 0xff);
          if ((((count) === (0)) ? 1 : 0)) {
            return;
          }
          data = ((runtime.readIndex(source, 3)) & 0xff);
          source = __add_z80_decompress_block(runtime, source, 4);
          if ((((count) > (size)) ? 1 : 0)) {
            count = ((size) & 0xff);
          }
          size = ((((size) - (count))) & 0xffff);
          for (i = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, data);
            dest = ((((dest) + (1))) & 0xffff);
          }
        } else {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, ch);
          dest = ((((dest) + (1))) & 0xffff);
          source = __add_z80_decompress_block(runtime, source, 1);
          size = ((((size) - (1))) & 0xffff);
        }
      } else {
        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, ch);
        dest = ((((dest) + (1))) & 0xffff);
        source = __add_z80_decompress_block(runtime, source, 1);
        size = ((((size) - (1))) & 0xffff);
      }
    } while ((((size) > (0)) ? 1 : 0));
  }
  function __add_z80_decompress_block(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_ts2068_update_memory(runtime: any): any {
    const members = runtime.members;


  }

  function method_is_vram_write__base(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((((((offset) >= (16384)) ? 1 : 0)) && ((((offset) < (23296)) ? 1 : 0))) ? 1 : 0);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "spectrum_ula_r": method_spectrum_ula_r,
    "spectrum_ula_w": method_spectrum_ula_w,
    "spectrum_port_r": method_spectrum_port_r,
    "floating_bus_r": method_floating_bus_r,
    "get_screen_area": method_get_screen_area,
    "spectrum_port_w": method_spectrum_port_w,
    "spectrum_128_port_7ffd_w": method_spectrum_128_port_7ffd_w,
    "spectrum_128_update_memory": method_spectrum_128_update_memory,
    "spectrum_128_rom_r": method_spectrum_128_rom_r,
    "spectrum_128_rom_w": method_spectrum_128_rom_w,
    "spectrum_128_ram_r_1": method_spectrum_128_ram_r_1,
    "spectrum_128_ram_w_1": method_spectrum_128_ram_w_1,
    "is_vram_write": method_is_vram_write,
    "spectrum_128_ram_r_2": method_spectrum_128_ram_r_2,
    "spectrum_128_ram_w_2": method_spectrum_128_ram_w_2,
    "spectrum_128_ram_r_3": method_spectrum_128_ram_r_3,
    "spectrum_128_ram_w_3": method_spectrum_128_ram_w_3,
    "spectrum_128_pre_opcode_fetch_r": method_spectrum_128_pre_opcode_fetch_r,
    "spectrum_rom_r": method_spectrum_rom_r,
    "spectrum_rom_w": method_spectrum_rom_w,
    "pre_opcode_fetch_r": method_pre_opcode_fetch_r,
    "spectrum_data_r": method_spectrum_data_r,
    "spectrum_data_w": method_spectrum_data_w,
    "spec_interrupt": method_spec_interrupt,
    "spectrum_refresh_w": method_spectrum_refresh_w,
    "snow_pattern1_base": method_snow_pattern1_base,
    "nomem_rq": method_nomem_rq,
    "screen_update_spectrum": method_screen_update_spectrum,
    "spectrum_update_border": method_spectrum_update_border,
    "get_border_color": method_get_border_color,
    "spectrum_update_screen": method_spectrum_update_screen,
    "snx_decompress_block": method_snx_decompress_block,
    "setup_sna": method_setup_sna,
    "page_basicrom": method_page_basicrom,
    "update_paging": method_update_paging,
    "plus3_update_memory": method_plus3_update_memory,
    "border_update": method_border_update,
    "setup_sp": method_setup_sp,
    "setup_plusd": method_setup_plusd,
    "setup_zx": method_setup_zx,
    "setup_frz": method_setup_frz,
    "bank3_set_page": method_bank3_set_page,
    "decode": method_decode,
    "spectrum_identify_z80": method_spectrum_identify_z80,
    "z80_decompress_block": method_z80_decompress_block,
    "ts2068_update_memory": method_ts2068_update_memory,
    "is_vram_write__base": method_is_vram_write__base
  };
  return __methodTable;
})();
    return {
      "spectrum_128_state.spectrum_ula_r": methods["spectrum_ula_r"],
      "spectrum_128_state.spectrum_ula_w": methods["spectrum_ula_w"],
      "spectrum_128_state.spectrum_port_r": methods["spectrum_port_r"],
      "spectrum_128_state.floating_bus_r": methods["floating_bus_r"],
      "spectrum_128_state.get_screen_area": methods["get_screen_area"],
      "spectrum_128_state.spectrum_port_w": methods["spectrum_port_w"],
      "spectrum_128_state.spectrum_128_port_7ffd_w": methods["spectrum_128_port_7ffd_w"],
      "spectrum_128_state.spectrum_128_update_memory": methods["spectrum_128_update_memory"],
      "spectrum_128_state.spectrum_128_rom_r": methods["spectrum_128_rom_r"],
      "spectrum_128_state.spectrum_128_rom_w": methods["spectrum_128_rom_w"],
      "spectrum_128_state.spectrum_128_ram_r_1": methods["spectrum_128_ram_r_1"],
      "spectrum_128_state.spectrum_128_ram_w_1": methods["spectrum_128_ram_w_1"],
      "spectrum_128_state.is_vram_write": methods["is_vram_write"],
      "spectrum_128_state.spectrum_128_ram_r_2": methods["spectrum_128_ram_r_2"],
      "spectrum_128_state.spectrum_128_ram_w_2": methods["spectrum_128_ram_w_2"],
      "spectrum_128_state.spectrum_128_ram_r_3": methods["spectrum_128_ram_r_3"],
      "spectrum_128_state.spectrum_128_ram_w_3": methods["spectrum_128_ram_w_3"],
      "spectrum_128_state.spectrum_128_pre_opcode_fetch_r": methods["spectrum_128_pre_opcode_fetch_r"],
      "spectrum_128_state.spec_interrupt": methods["spec_interrupt"],
      "spectrum_128_state.spectrum_refresh_w": methods["spectrum_refresh_w"],
      "spectrum_128_state.spectrum_identify_z80": methods["spectrum_identify_z80"],
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
  const __mame_table_0 = [5, 2, 0, 1, 3, 4, 6, 7];

  function method_spectrum_ula_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_r"], __L1: any = __l["m_io_plus0.read_safe"], __L2: any = __l["read_safe"], __L3: any = __l["m_io_plus1.read_safe"], __L4: any = __l["m_io_plus2.read_safe"], __L5: any = __l["m_io_plus3.read_safe"], __L6: any = __l["m_io_plus4.read_safe"], __L7: any = __l["m_io_joy1.read_safe"], __L8: any = __l["m_io_joy2.read_safe"], __L9: any = __l["m_exp.iorq_r"], __L10: any = __l["m_io_line0.read"], __L11: any = __l["read"], __L12: any = __l["m_io_line1.read"], __L13: any = __l["m_io_line2.read"], __L14: any = __l["m_io_line3.read"], __L15: any = __l["m_io_line4.read"], __L16: any = __l["m_io_line5.read"], __L17: any = __l["m_io_line6.read"], __L18: any = __l["m_io_line7.read"], __L19: any = __l["m_cassette.input"], __L20: any = __l["m_io_config.read"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any;

    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_r", 0, undefined))(offset);
    let lines: any = ((((offset) >>> (8))) | 0);
    let data: any = ((255) | 0);
    let cs_extra1: any = (((((__L1 ?? runtime.memberCall(members.m_io_plus0, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let cs_extra2: any = (((((__L3 ?? runtime.memberCall(members.m_io_plus1, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let cs_extra3: any = (((((__L4 ?? runtime.memberCall(members.m_io_plus2, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let ss_extra1: any = (((((__L5 ?? runtime.memberCall(members.m_io_plus3, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let ss_extra2: any = (((((__L6 ?? runtime.memberCall(members.m_io_plus4, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let joy1: any = (((((__L7 ?? runtime.memberCall(members.m_io_joy1, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let joy2: any = (((((__L8 ?? runtime.memberCall(members.m_io_joy2, "read_safe", 0, __L2))(31)) & (31))) | 0);
    if (h_m_exp) {
      data = (((__L9 ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(offset)) | 0);
    }
    if (((Number(((lines) & (1))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L10 ?? runtime.memberCall(members.m_io_line0, "read", 0, __L11))()))) | 0);
      if ((((((((((cs_extra1) !== (31)) ? 1 : 0)) || ((((cs_extra2) !== (31)) ? 1 : 0))) ? 1 : 0)) || ((((cs_extra3) !== (31)) ? 1 : 0))) ? 1 : 0)) {
        data = ((((data) & (-2))) | 0);
      }
    }
    if (((Number(((lines) & (2))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L12 ?? runtime.memberCall(members.m_io_line1, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (4))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L13 ?? runtime.memberCall(members.m_io_line2, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (8))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L14 ?? runtime.memberCall(members.m_io_line3, "read", 0, __L11))()) & (cs_extra1))) & (joy2))))) | 0);
    }
    if (((Number(((lines) & (16))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L15 ?? runtime.memberCall(members.m_io_line4, "read", 0, __L11))()) & (cs_extra2))) & (joy1))))) | 0);
    }
    if (((Number(((lines) & (32))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((__L16 ?? runtime.memberCall(members.m_io_line5, "read", 0, __L11))()) & (ss_extra1))))) | 0);
    }
    if (((Number(((lines) & (64))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L17 ?? runtime.memberCall(members.m_io_line6, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (128))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L18 ?? runtime.memberCall(members.m_io_line7, "read", 0, __L11))()) & (cs_extra3))) & (ss_extra2))))) | 0);
      if (((((((ss_extra1) !== (31)) ? 1 : 0)) || ((((ss_extra2) !== (31)) ? 1 : 0))) ? 1 : 0)) {
        data = ((((data) & (-3))) | 0);
      }
    }
    data = ((((data) | (224))) | 0);
    if (((Number((__L19 ?? runtime.memberCall(members.m_cassette, "input", 0, undefined))()) > Number(0.0038)) ? 1 : 0)) {
      data = ((((data) & (-65))) | 0);
    }
    if (((Number((((__L20 ?? runtime.memberCall(members.m_io_config, "read", 0, __L11))()) & (128))) === Number(0)) ? 1 : 0)) {
      data = ((((data) ^ (64))) | 0);
    }
    return data;
  }

  function method_spectrum_ula_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_cassette.output"], __L3: any = __l["m_speaker.level_w"], __L4: any = __l["m_exp.iorq_w"];
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
    let changed: any = (((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) ^ (data))) & 0xff);
    if (((changed) & (7))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    if (((changed) & (24))) {
      if ((((changed) >>> (3)) & 1)) {
        (__L2 ?? runtime.memberCall(members.m_cassette, "output", 0, undefined))((((((data) >>> (3)) & 1)) ? ((-1)) : ((+1))));
      }
      (__L3 ?? runtime.memberCall(members.m_speaker, "level_w", 0, undefined))((((data) >>> (3)) & ((1 << (2)) - 1)));
    }
    if (h_m_exp) {
      (__L4 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(offset, data);
    }
    members.m_port_fe_data = ((data) | 0);
  }

  function method_spectrum_port_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.io_r"], __L1: any = __l["m_exp.get_card_device"], __L2: any = __l["m_exp.iorq_r"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_ula, "io_r", 0, undefined))(offset);
    if ((__L1 ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
      return (__L2 ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(((offset) | (1)));
    }
    return (runtime.overrides["floating_bus_r"] ? runtime.overrides["floating_bus_r"]() : method_floating_bus_r(runtime));
  }

  function method_floating_bus_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.is_in_contended_area"], __L1: any = __l["m_screen.vpos"], __L2: any = __l["m_maincpu.total_cycles"], __L3: any = __l["m_ula.get_irq_at"], __L4: any = __l["m_ula.get_video_line_clocks"], __L5: any = __l["m_ula.get_raster_contention_offset"], __L6: any = __l["m_ula.get_raster_line_clocks"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any;

    let data: any = ((255) & 0xff);
    if ((__L0 ?? runtime.memberCall(members.m_ula, "is_in_contended_area", 0, undefined))()) {
      let vpos: any = (__L1 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
      let now: any = runtime.subtract((__L2 ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (__L3 ?? runtime.memberCall(members.m_ula, "get_irq_at", 0, undefined))());
      let cf: any = __add_floating_bus_r(runtime, ((vpos) * ((__L4 ?? runtime.memberCall(members.m_ula, "get_video_line_clocks", 0, undefined))())), (__L5 ?? runtime.memberCall(members.m_ula, "get_raster_contention_offset", 0, undefined))());
      let ct: any = ((cf) + ((__L6 ?? runtime.memberCall(members.m_ula, "get_raster_line_clocks", 0, undefined))()));
      if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
        let clocks: any = ((now) - (cf));
        if ((((((clocks) >>> (2)) & 1)) ? 0 : 1)) {
          let y: any = ((((vpos) - ((__t7 = __deref_floating_bus_r(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t7.top === 'function' ? (__t7.top() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
          let x: any = ((__add_floating_bus_r(runtime, runtime.shiftRight(clocks, 2), (((clocks) >>> (1)) & 1))) & 0xffff);
          data = ((((((clocks) & (1))) ? (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), __add_floating_bus_r(runtime, 6144, ((((((y) & (248))) << (2))) | (x))))) : (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (7))) << (8))) | (((((y) & (56))) << (2))))) | (((((y) & (192))) << (5))))) | (x)))))) & 0xff);
        }
      }
    }
    return data;
  }
  function __add_floating_bus_r(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_floating_bus_r(runtime: any, p: any): any {
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

  function method_get_screen_area(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rectangle"];

    return (__L0 ? __L0(48, 303, 63, 254) : runtime.macro("rectangle", 48, 303, 63, 254));
  }

  function method_spectrum_port_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.io_w"], __L1: any = __l["m_exp.get_card_device"], __L2: any = __l["m_exp.iorq_w"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "io_w", 0, undefined))(offset);
    if ((__L1 ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
      (__L2 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
    }
  }

  function method_spectrum_128_port_7ffd_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_w"], __L1: any = __l["m_exp.iorq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
    if ((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (32))) {
      return;
    }
    members.m_port_7ffd_data = ((data) | 0);
    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
    (__L1 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
  }

  function method_spectrum_128_update_memory(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_rom[0].set_entry"], __L1: any = __l["set_entry"], __L2: any = __l["m_bank_ram[3].set_entry"], __L3: any = __l["m_ula.bank3_pg_w"], __L4: any = __l["m_screen.update_now"], __L5: any = __l["m_ram.pointer"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "set_entry", 0, __L1))(((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1));
    (__L2 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "set_entry", 0, __L1))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
    (__L3 ?? runtime.memberCall(members.m_ula, "bank3_pg_w", 0, undefined))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
    (__L4 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) {
      members.m_screen_location = __add_spectrum_128_update_memory(runtime, (__L5 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 114688);
    } else {
      members.m_screen_location = __add_spectrum_128_update_memory(runtime, (__L5 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 81920);
    }
  }
  function __add_spectrum_128_update_memory(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_128_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.romcs"], __L1: any = __l["m_exp.mreq_r"], __L2: any = __l["m_bank_rom[0].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    return (((__L0 ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))()) ? ((__L1 ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex(runtime.byteView((__L2 ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "base", 0, __L3))()), offset)));
  }

  function method_spectrum_128_rom_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.mreq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
  }

  function method_spectrum_128_ram_r_1(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[1].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((16384) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? (__t0 = __deref_spectrum_128_ram_r_1(runtime, runtime.readIndex(h_m_bank_ram, 1)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_1(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_1(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[1].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((16384) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? (__t1 = __deref_spectrum_128_ram_w_1(runtime, runtime.readIndex(h_m_bank_ram, 1)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_1(runtime: any, p: any): any {
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

  function method_is_vram_write(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_ram[3].entry"], __L1: any = __l["entry"], __L2: any = __l["spectrum_state::is_vram_write__base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    return (((((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) && (((Number((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __L1))()) === Number(7)) ? 1 : 0))) ? 1 : 0)) ? (((((((offset) >= (49152)) ? 1 : 0)) && ((((offset) < (56064)) ? 1 : 0))) ? 1 : 0)) : ((__L2 ? __L2(offset) : runtime.macro("spectrum_state::is_vram_write__base", offset))));
  }

  function method_spectrum_128_ram_r_2(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[2].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((32768) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? (__t0 = __deref_spectrum_128_ram_r_2(runtime, runtime.readIndex(h_m_bank_ram, 2)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_2(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[2].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((32768) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? (__t1 = __deref_spectrum_128_ram_w_2(runtime, runtime.readIndex(h_m_bank_ram, 2)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_2(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_r_3(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[3].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((49152) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? (__t0 = __deref_spectrum_128_ram_r_3(runtime, runtime.readIndex(h_m_bank_ram, 3)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_3(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_3(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[3].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((49152) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? (__t1 = __deref_spectrum_128_ram_w_3(runtime, runtime.readIndex(h_m_bank_ram, 3)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_3(runtime: any, p: any): any {
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

  function method_spectrum_128_pre_opcode_fetch_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.m1"], __L1: any = __l["m_exp.pre_opcode_fetch"], __L2: any = __l["m_program.read_byte"], __L3: any = __l["read_byte"], __L4: any = __l["m_exp.post_opcode_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_program, "read_byte", 0, __L3))(offset)) & 0xff);
    (__L4 ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.romcs"], __L1: any = __l["m_exp.mreq_r"];
    let __t0: any;

    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return (((((h_m_exp) && ((__L0 ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))())) ? 1 : 0)) ? ((__L1 ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex(h_m_rom, offset)));
  }

  function method_spectrum_rom_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.mreq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
  }

  function method_pre_opcode_fetch_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.m1"], __L1: any = __l["m_exp.pre_opcode_fetch"], __L2: any = __l["m_specmem.read8"], __L3: any = __l["m_exp.post_opcode_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_data_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_exp.pre_data_fetch"], __L2: any = __l["m_specmem.read8"], __L3: any = __l["m_exp.post_data_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_data_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_exp, "post_data_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_specmem.write8"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(offset);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](offset) : method_is_vram_write(runtime, offset))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    (__L2 ?? runtime.memberCall(members.m_specmem, "write8", 0, undefined))(offset, data);
  }

  function method_irq_on(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.on_irq"], __L1: any = __l["m_maincpu.set_input_line"], __L2: any = __l["m_ula.get_irq_ext_length"], __L3: any = __l["m_maincpu.clocks_to_attotime"], __L4: any = __l["m_irq_off_timer.adjust"], __L5: any = __l["adjust"];
    let __t0: any, __t1: any;

    (__L0 ?? runtime.memberCall(members.m_ula, "on_irq", 0, undefined))();
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    (__L4 ?? runtime.memberCall(members.m_irq_off_timer, "adjust", 0, __L5))((__L3 ?? runtime.memberCall(members.m_maincpu, "clocks_to_attotime", 0, undefined))(__add_irq_on(runtime, 32, (__L2 ?? runtime.memberCall(members.m_ula, "get_irq_ext_length", 0, undefined))())));
  }
  function __add_irq_on(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_irq_off(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
  }

  function method_finish_screen_update(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["started"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_screen.visible_area"], __L3: any = __l["m_screen.time_until_pos"], __L4: any = __l["m_finish_screen_update_timer.adjust"], __L5: any = __l["adjust"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    if ((__L0 ? __L0() : runtime.macro("started"))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    (__L4 ?? runtime.memberCall(members.m_finish_screen_update_timer, "adjust", 0, __L5))((__L3 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))((__t2 = __deref_finish_screen_update(runtime, (__L2 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))()), typeof __t2.bottom === 'function' ? (__t2.bottom() ?? 0) : runtime.container((__L2 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))(), "bottom")), __add_finish_screen_update(runtime, (__t4 = __deref_finish_screen_update(runtime, (__L2 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))()), typeof __t4.right === 'function' ? (__t4.right() ?? 0) : runtime.container((__L2 ?? runtime.memberCall(members.m_screen, "visible_area", 0, undefined))(), "right")), 1)));
  }
  function __add_finish_screen_update(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_finish_screen_update(runtime: any, p: any): any {
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

  function method_spectrum_refresh_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.is_snow_possible"], __L1: any = __l["m_screen.hpos"], __L2: any = __l["screen.left"], __L3: any = __l["left"], __L4: any = __l["m_screen.vpos"], __L5: any = __l["screen.top"], __L6: any = __l["top"], __L7: any = __l["m_maincpu.adjust_icount"], __L8: any = __l["m_screen.update_now"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    data = ((data) & 0xff);
    if ((((__L0 ?? runtime.memberCall(members.m_ula, "is_snow_possible", 0, undefined))(offset)) ? 0 : 1)) {
      return;
    }
    let screen: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
    let x: any = ((runtime.subtract((__L1 ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))(), (__L2 ?? runtime.memberCall(screen, "left", 0, __L3))())) & 0xff);
    let y: any = ((runtime.subtract((__L4 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), (__L5 ?? runtime.memberCall(screen, "top", 0, __L6))())) & 0xffff);
    let snow_pattern: any = ((0) & 0xff);
    let t_to_chunk_end: any = ((0) & 0xff);
    if (((Number(((x) % (16))) === Number(0)) ? 1 : 0)) {
      snow_pattern = ((1) & 0xff);
      t_to_chunk_end = ((4) & 0xff);
    } else {
      if (((Number(((x) % (16))) === Number(4)) ? 1 : 0)) {
        snow_pattern = ((2) & 0xff);
        x = ((((x) + (8))) & 0xff);
        t_to_chunk_end = ((6) & 0xff);
      } else {
        return;
      }
    }
    let px_addr_hi: any = ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (32))) << (2))))) & 0xffff);
    let attr_addr_hi: any = ((((6144) | (((((y) & (224))) << (2))))) & 0xffff);
    let addr_lo: any = ((((((((y) & (24))) << (2))) | (((x) >>> (3))))) & 0xff);
    let px_tmp: any = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((px_addr_hi) | (addr_lo)))) & 0xff);
    let attr_tmp: any = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((attr_addr_hi) | (addr_lo)))) & 0xff);
    if ((((snow_pattern) === (1)) ? 1 : 0)) {
      let i: any = ((((offset) >>> (8))) & 0xff);
      let r: any = ((((((offset) + (1))) & (127))) & 0xff);
      let base: any = (runtime.overrides["snow_pattern1_base"] ? runtime.overrides["snow_pattern1_base"](i) : method_snow_pattern1_base(runtime, i)); let base$s: any = undefined, base$o: any = 0; if (ArrayBuffer.isView(base) || Array.isArray(base)) base$s = base; else if (base !== null && typeof base === 'object' && base.generatedPointer === true && base.path === undefined && base.target === undefined && (ArrayBuffer.isView(base.source) || Array.isArray(base.source))) { base$s = base.source; base$o = base.offset; }
      runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), (base$s !== undefined ? (base$s[base$o + (((px_addr_hi) | (r)))] ?? 0) : runtime.readIndex(base, ((px_addr_hi) | (r)))));
      runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), (base$s !== undefined ? (base$s[base$o + (((attr_addr_hi) | (r)))] ?? 0) : runtime.readIndex(base, ((attr_addr_hi) | (r)))));
    } else {
      if ((((snow_pattern) === (2)) ? 1 : 0)) {
        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((px_addr_hi) | (addr_lo))) - (1))));
        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((attr_addr_hi) | (addr_lo))) - (1))));
      }
    }
    (__L7 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))((-t_to_chunk_end));
    (__L8 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    (__L7 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(t_to_chunk_end);
    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), px_tmp);
    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), attr_tmp);
  }

  function method_snow_pattern1_base(runtime: any, i_reg: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_ram[3].entry"], __L1: any = __l["entry"], __L2: any = __l["m_ram.pointer"];
    let __t0: any, __t1: any;

    i_reg = ((i_reg) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let is_alt_scr_selected: any = ((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) ? 1 : 0);
    let is_alt_scr: any = ((((i_reg) & (128))) ? 1 : 0);
    let i_pg: any = ((((is_alt_scr) ? ((((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __L1))()) & (5))) : (5))) & 0xff);
    return __add_snow_pattern1_base(runtime, (__L2 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), ((((i_pg) | (((is_alt_scr_selected) << (1))))) << (14)));
  }
  function __add_snow_pattern1_base(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_nomem_rq(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_screen_update_spectrum(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.visible_area"], __L1: any = __l["visible_area"], __L2: any = __l["vis.left"], __L3: any = __l["left"], __L4: any = __l["vis.right"], __L5: any = __l["right"], __L6: any = __l["vis.top"], __L7: any = __l["top"], __L8: any = __l["scr.top"], __L9: any = __l["rectangle"], __L10: any = __l["scr.left"], __L11: any = __l["scr.bottom"], __L12: any = __l["bottom"], __L13: any = __l["scr.right"], __L14: any = __l["vis.bottom"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any, __t12: any, __t13: any, __t14: any, __t15: any, __t16: any;

    let scr: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
    let vis: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ?? runtime.memberCall(screen, "visible_area", 0, __L1))());
    if ((runtime.same(vis, scr) ? 0 : 1)) {
      let bsides: any = [(__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L6 ?? runtime.memberCall(vis, "top", 0, __L7))(), runtime.subtract((__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), 1)) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L6 ?? runtime.memberCall(vis, "top", 0, __L7))(), runtime.subtract((__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), 1))), (__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), runtime.subtract((__L10 ?? runtime.memberCall(scr, "left", 0, __L3))(), 1), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))()) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), runtime.subtract((__L10 ?? runtime.memberCall(scr, "left", 0, __L3))(), 1), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))())), (__L9 ? __L9(__add_screen_update_spectrum(runtime, (__L13 ?? runtime.memberCall(scr, "right", 0, __L5))(), 1), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))()) : runtime.macro("rectangle", __add_screen_update_spectrum(runtime, (__L13 ?? runtime.memberCall(scr, "right", 0, __L5))(), 1), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))())), (__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), __add_screen_update_spectrum(runtime, (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))(), 1), (__L14 ?? runtime.memberCall(vis, "bottom", 0, __L12))()) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), __add_screen_update_spectrum(runtime, (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))(), 1), (__L14 ?? runtime.memberCall(vis, "bottom", 0, __L12))()))];
      for (let i: any = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        let border: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(runtime.and((bsides[i] ?? 0), cliprect));
        if ((((border).empty()) ? 0 : 1)) {
          (runtime.overrides["spectrum_update_border"] ? runtime.overrides["spectrum_update_border"](screen, bitmap, border) : method_spectrum_update_border(runtime, screen, bitmap, border));
        }
      }
    }
    scr = runtime.andAssign(scr, cliprect);
    if ((((scr).empty()) ? 0 : 1)) {
      (runtime.overrides["spectrum_update_screen"] ? runtime.overrides["spectrum_update_screen"](screen, bitmap, scr) : method_spectrum_update_screen(runtime, screen, bitmap, scr));
    }
    return 0;
  }
  function __add_screen_update_spectrum(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_update_border(runtime: any, screen: any, bitmap: any, border: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.get_border_chunk_size"], __L1: any = __l["m_ula.get_btime"], __L2: any = __l["border.top"], __L3: any = __l["top"], __L4: any = __l["border.bottom"], __L5: any = __l["bottom"], __L6: any = __l["border.left"], __L7: any = __l["left"], __L8: any = __l["border.right"], __L9: any = __l["right"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any;

    let mod: any = (((__L0 ?? runtime.memberCall(members.m_ula, "get_border_chunk_size", 0, undefined))()) & 0xff);
    let btime: any = (((__L1 ?? runtime.memberCall(members.m_ula, "get_btime", 0, undefined))()) & 0xff);
    for (let y: any = (__L2 ?? runtime.memberCall(border, "top", 0, __L3))(); ((Number(y) <= Number((__L4 ?? runtime.memberCall(border, "bottom", 0, __L5))())) ? 1 : 0); y = ((y) + (1))) {
      let pix: any = bitmap["pix&"](y, (__L6 ?? runtime.memberCall(border, "left", 0, __L7))());
      for (let x: any = (__L6 ?? runtime.memberCall(border, "left", 0, __L7))(); ((Number(x) <= Number((__L8 ?? runtime.memberCall(border, "right", 0, __L9))())) ? 1 : 0); ) {
        if (((Number(((x) % (mod))) === Number(btime)) ? 1 : 0)) {
          pix = runtime.subtract(pix, btime);
          x = ((x) - (btime));
          for (let m: any = 0; ((Number(m) < Number(mod)) ? 1 : 0); m = ((m) + (1)), x = ((x) + (1))) {
            runtime.pointerStore((__t7 = pix, pix = __add_spectrum_update_border(runtime, pix, 1), __t7), (runtime.overrides["get_border_color"] ? runtime.overrides["get_border_color"](y, x) : method_get_border_color(runtime, y, x)));
          }
        } else {
          pix = __add_spectrum_update_border(runtime, pix, 1);
          x = ((x) + (1));
        }
      }
    }
  }
  function __add_spectrum_update_border(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_get_border_color(runtime: any, hpos: any, vpos: any): any {
    const members = runtime.members;

    hpos = ((hpos) & 0xffff);
    vpos = ((vpos) & 0xffff);
    return (((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (7));
  }

  function method_spectrum_update_screen(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.frame_number"], __L1: any = __l["frame_number"], __L2: any = __l["cliprect.top"], __L3: any = __l["top"], __L4: any = __l["cliprect.bottom"], __L5: any = __l["bottom"], __L6: any = __l["cliprect.left"], __L7: any = __l["left"], __L8: any = __l["m_ula.get_atime_right"], __L9: any = __l["m_ula.get_atime_left"], __L10: any = __l["cliprect.right"], __L11: any = __l["right"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any;

    let invert_attrs: any = ((((runtime.divide((__L0 ?? runtime.memberCall(screen, "frame_number", 0, __L1))(), (members.m_frame_invert_count ?? runtime.member("m_frame_invert_count")))) & (1))) ? 1 : 0);
    for (let vpos: any = (((__L2 ?? runtime.memberCall(cliprect, "top", 0, __L3))()) & 0xffff); ((Number(vpos) <= Number((__L4 ?? runtime.memberCall(cliprect, "bottom", 0, __L5))())) ? 1 : 0); vpos = ((((vpos) + (1))) & 0xffff)) {
      let hpos: any = (((__L6 ?? runtime.memberCall(cliprect, "left", 0, __L7))()) & 0xffff);
      let x: any = ((((hpos) - ((__t4 = __deref_spectrum_update_screen(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t4.left === 'function' ? (__t4.left() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))))) & 0xffff);
      let chunk_right: any = ((((x) & (8))) ? 1 : 0);
      if (((Number(((x) % (8))) <= Number(((chunk_right) ? ((__L8 ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__L9 ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))())))) ? 1 : 0)) {
        let shift: any = ((((x) % (8))) & 0xff);
        x = ((((x) - (shift))) & 0xffff);
        hpos = ((((hpos) - (shift))) & 0xffff);
      } else {
        let shift: any = ((((8) - (((x) % (8))))) & 0xff);
        x = ((((x) + (shift))) & 0xffff);
        hpos = ((((hpos) + (shift))) & 0xffff);
        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
      }
      let y: any = ((((vpos) - ((__t7 = __deref_spectrum_update_screen(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t7.top === 'function' ? (__t7.top() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
      let scr: any = __addr_spectrum_update_screen(runtime, (members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (56))) << (2))))) | (((x) >>> (3)))));
      let attr: any = __addr_spectrum_update_screen(runtime, (members.m_screen_location ?? runtime.member("m_screen_location")), ((6144) | (((((((y) & (248))) << (2))) | (((x) >>> (3)))))));
      let pix: any = bitmap["pix&"](vpos, hpos);
      while (((Number(((hpos) + (((chunk_right) ? ((__L8 ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__L9 ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))()))))) <= Number((__L10 ?? runtime.memberCall(cliprect, "right", 0, __L11))())) ? 1 : 0)) {
        let ink: any = ((((((runtime.shiftRight(__deref_spectrum_update_screen(runtime, attr), 3)) & (8))) | (((__deref_spectrum_update_screen(runtime, attr)) & (7))))) & 0xffff);
        let pap: any = ((((runtime.shiftRight(__deref_spectrum_update_screen(runtime, attr), 3)) & (15))) & 0xffff);
        let pix8: any = (((((((invert_attrs) && (((__deref_spectrum_update_screen(runtime, attr)) & (128)))) ? 1 : 0)) ? ((~__deref_spectrum_update_screen(runtime, scr))) : (__deref_spectrum_update_screen(runtime, scr)))) & 0xff);
        for (let b: any = ((128) & 0xff); b; b = ((((b) >>> (1))) & 0xff), x = ((((x) + (1))) & 0xffff), hpos = ((((hpos) + (1))) & 0xffff)) {
          runtime.pointerStore((__t11 = pix, pix = __add_spectrum_update_screen(runtime, pix, 1), __t11), ((((pix8) & (b))) ? (ink) : (pap)));
        }
        scr = __add_spectrum_update_screen(runtime, scr, 1);
        attr = __add_spectrum_update_screen(runtime, attr, 1);
        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
      }
    }
  }
  function __add_spectrum_update_screen(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_spectrum_update_screen(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_spectrum_update_screen(runtime: any, p: any): any {
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

  function method_snapshot_cb(runtime: any, image: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["image.length"], __L1: any = __l["length"], __L2: any = __l["VECTOR_OF"], __L3: any = __l["image.fread"], __L4: any = __l["fread"], __L5: any = __l["image.is_filetype"], __L6: any = __l["is_filetype"], __L7: any = __l["std::make_pair"], __L8: any = __l["std::error_condition"], __L9: any = __l["std::string"];
    let __t0: any;

    let snapshot_size: any = (__L0 ?? runtime.memberCall(image, "length", 0, __L1))();
    let snapshot_data: any = (__L2 ? __L2("uint8_t", snapshot_size) : runtime.macro("VECTOR_OF", "uint8_t", snapshot_size));
    (__L3 ?? runtime.memberCall(image, "fread", 0, __L4))(__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size);
    if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("snx")) {
      if ((((((((((((Number(runtime.readIndex(snapshot_data, 0)) === Number(88)) ? 1 : 0)) && (((Number(runtime.readIndex(snapshot_data, 1)) === Number(83)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(snapshot_data, 2)) === Number(78)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(snapshot_data, 3)) === Number(65)) ? 1 : 0))) ? 1 : 0)) {
        (runtime.overrides["setup_snx"] ? runtime.overrides["setup_snx"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_snx(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
      } else {
        if (((((((((Number(snapshot_size) === Number(49179)) ? 1 : 0)) || (((Number(snapshot_size) === Number(131103)) ? 1 : 0))) ? 1 : 0)) || (((Number(snapshot_size) === Number(147487)) ? 1 : 0))) ? 1 : 0)) {
          (runtime.overrides["setup_sna"] ? runtime.overrides["setup_sna"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_sna(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
        } else {
          return (__L7 ? __L7(3, "Invalid .SNX file header") : runtime.macro("std::make_pair", 3, "Invalid .SNX file header"));
        }
      }
    } else {
      if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("sna")) {
        if (((((((((Number(snapshot_size) !== Number(49179)) ? 1 : 0)) && (((Number(snapshot_size) !== Number(131103)) ? 1 : 0))) ? 1 : 0)) && (((Number(snapshot_size) !== Number(147487)) ? 1 : 0))) ? 1 : 0)) {
          return (__L7 ? __L7(4, "Invalid .SNA file size") : runtime.macro("std::make_pair", 4, "Invalid .SNA file size"));
        }
        (runtime.overrides["setup_sna"] ? runtime.overrides["setup_sna"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_sna(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
      } else {
        if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("sp")) {
          if (((((((((Number(runtime.readIndex(snapshot_data, 0)) !== Number(83)) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 1)) !== Number(80)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(snapshot_size) !== Number(16422)) ? 1 : 0)) && (((Number(snapshot_size) !== Number(49190)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            if (((Number(snapshot_size) !== Number(49184)) ? 1 : 0)) {
              return (__L7 ? __L7(4, "Invalid .SP file size") : runtime.macro("std::make_pair", 4, "Invalid .SP file size"));
            }
          }
          (runtime.overrides["setup_sp"] ? runtime.overrides["setup_sp"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_sp(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
        } else {
          if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("ach")) {
            if (((Number(snapshot_size) !== Number(65792)) ? 1 : 0)) {
              return (__L7 ? __L7(4, "Invalid .ACH file size") : runtime.macro("std::make_pair", 4, "Invalid .ACH file size"));
            }
            (runtime.overrides["setup_ach"] ? runtime.overrides["setup_ach"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_ach(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
          } else {
            if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("prg")) {
              if (((Number(snapshot_size) !== Number(49408)) ? 1 : 0)) {
                return (__L7 ? __L7(4, "Invalid .PRG file size") : runtime.macro("std::make_pair", 4, "Invalid .PRG file size"));
              }
              (runtime.overrides["setup_prg"] ? runtime.overrides["setup_prg"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_prg(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
            } else {
              if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("plusd")) {
                if ((((((Number(snapshot_size) !== Number(49174)) ? 1 : 0)) && (((Number(snapshot_size) !== Number(131095)) ? 1 : 0))) ? 1 : 0)) {
                  return (__L7 ? __L7(4, "Invalid .PLUSD file size") : runtime.macro("std::make_pair", 4, "Invalid .PLUSD file size"));
                }
                (runtime.overrides["setup_plusd"] ? runtime.overrides["setup_plusd"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_plusd(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
              } else {
                if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("sem")) {
                  if ((((((((((((((((((Number(runtime.readIndex(snapshot_data, 0)) !== Number(5)) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 1)) !== Number(83)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 2)) !== Number(80)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 3)) !== Number(69)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 4)) !== Number(67)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 5)) !== Number(49)) ? 1 : 0))) ? 1 : 0)) {
                    if (((Number(snapshot_size) !== Number(49192)) ? 1 : 0)) {
                      return (__L7 ? __L7(4, "Invalid .SEM file size") : runtime.macro("std::make_pair", 4, "Invalid .SEM file size"));
                    }
                  }
                  (runtime.overrides["setup_sem"] ? runtime.overrides["setup_sem"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_sem(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
                } else {
                  if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("sit")) {
                    if (((Number(snapshot_size) !== Number(65564)) ? 1 : 0)) {
                      return (__L7 ? __L7(4, "Invalid .SIT file size") : runtime.macro("std::make_pair", 4, "Invalid .SIT file size"));
                    }
                    (runtime.overrides["setup_sit"] ? runtime.overrides["setup_sit"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_sit(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
                  } else {
                    if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("zx")) {
                      if (((Number(snapshot_size) !== Number(49486)) ? 1 : 0)) {
                        return (__L7 ? __L7(4, "Invalid .ZX file size") : runtime.macro("std::make_pair", 4, "Invalid .ZX file size"));
                      }
                      (runtime.overrides["setup_zx"] ? runtime.overrides["setup_zx"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_zx(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
                    } else {
                      if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("snp")) {
                        if (((Number(snapshot_size) !== Number(49183)) ? 1 : 0)) {
                          return (__L7 ? __L7(4, "Invalid .SNP file size") : runtime.macro("std::make_pair", 4, "Invalid .SNP file size"));
                        }
                        (runtime.overrides["setup_snp"] ? runtime.overrides["setup_snp"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_snp(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
                      } else {
                        if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("frz")) {
                          if (((Number(snapshot_size) !== Number(131114)) ? 1 : 0)) {
                            return (__L7 ? __L7(4, "Invalid .FRZ file size") : runtime.macro("std::make_pair", 4, "Invalid .FRZ file size"));
                          }
                          (runtime.overrides["setup_frz"] ? runtime.overrides["setup_frz"](__addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size) : method_setup_frz(runtime, __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size));
                        } else {
                          if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("spg")) {
                            if ((((((((((((((((((((((((((((((((((((Number(runtime.readIndex(snapshot_data, 32)) !== Number(83)) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 33)) !== Number(112)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 34)) !== Number(101)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 35)) !== Number(99)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 36)) !== Number(116)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 37)) !== Number(114)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 38)) !== Number(117)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 39)) !== Number(109)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 40)) !== Number(80)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 41)) !== Number(114)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 42)) !== Number(111)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 43)) !== Number(103)) ? 1 : 0))) ? 1 : 0)) {
                              return (__L7 ? __L7(3, "Invalid .SPG file header.") : runtime.macro("std::make_pair", 3, "Invalid .SPG file header."));
                            }
                            runtime.invoke("setup_spg", __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size);
                          } else {
                            runtime.invoke("setup_z80", __addr_snapshot_cb(runtime, snapshot_data, 0), snapshot_size);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    return (__L7 ? __L7((__L8 ? __L8() : runtime.macro("std::error_condition")), (__L9 ? __L9() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__L8 ? __L8() : runtime.macro("std::error_condition")), (__L9 ? __L9() : runtime.macro("std::string"))));
  }
  function __addr_snapshot_cb(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_setup_snx(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["m_maincpu.state_int"], __L4: any = __l["space.read_byte"], __L5: any = __l["read_byte"];

    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let addr: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    if ((((data) !== (37)) ? 1 : 0)) {
      0;
    }
    data = ((((((runtime.readIndex(snapdata, 28)) << (8))) | (runtime.readIndex(snapdata, 27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 20)) << (8))) | (runtime.readIndex(snapdata, 19)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 18)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 24)) << (8))) | (runtime.readIndex(snapdata, 23)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 22)) << (8))) | (runtime.readIndex(snapdata, 21)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 26)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 6)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 30)) << (8))) | (runtime.readIndex(snapdata, 29)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((runtime.readIndex(snapdata, 31)) & (3))) & 0xffff);
    if ((((data) === (3)) ? 1 : 0)) {
      data = ((2) & 0xffff);
    }
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 25)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (0)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    (runtime.overrides["snx_decompress_block"] ? runtime.overrides["snx_decompress_block"](space, snapdata, 16384, 49152) : method_snx_decompress_block(runtime, space, snapdata, 16384, 49152));
    addr = (((__L3 ?? runtime.memberCall(members.m_maincpu, "state_int", 0, undefined))(1)) & 0xffff);
    if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65534)) ? 1 : 0))) ? 1 : 0)) {
      0;
    } else {
      0;
    }
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, (((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (1)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (0))))));
    addr = ((((addr) + (2))) & 0xffff);
    0;
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
    data = ((((runtime.readIndex(snapdata, 32)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_snx_decompress_block(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.write_byte"], __L1: any = __l["write_byte"];
    let __t0: any;

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let counthi: any = ((0) & 0xff);
    let countlo: any = ((0) & 0xff);
    let compress: any = ((0) & 0xff);
    let fill: any = ((0) & 0xff);
    let block: any = ((0) & 0xffff);
    let count: any = ((0) & 0xffff);
    let i: any = ((0) & 0xffff);
    let j: any = ((0) & 0xffff);
    let numbytes: any = ((0) & 0xffff);
    i = ((42) & 0xffff);
    numbytes = ((0) & 0xffff);
    while ((((numbytes) < (size)) ? 1 : 0)) {
      counthi = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
      if ((((counthi) >= (224)) ? 1 : 0)) {
        count = ((__add_snx_decompress_block(runtime, ((counthi) & (15)), 1)) & 0xffff);
        if (((Number(((counthi) & (240))) === Number(240)) ? 1 : 0)) {
          compress = ((255) & 0xff);
        } else {
          compress = ((0) & 0xff);
        }
        0;
      } else {
        countlo = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        count = ((((((counthi) << (8))) | (countlo))) & 0xffff);
        compress = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        0;
      }
      if (((Number(compress) === Number(255)) ? 1 : 0)) {
        fill = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        0;
        for (j = ((0) & 0xffff); (((j) < (count)) ? 1 : 0); j = ((((j) + (1))) & 0xffff)) {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(((((16384) + (numbytes))) + (j)), fill);
        }
        numbytes = ((((numbytes) + (count))) & 0xffff);
      } else {
        0;
        j = ((0) & 0xffff);
        while ((((j) < (count)) ? 1 : 0)) {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(__add_snx_decompress_block(runtime, ((16384) + (numbytes)), (__t0 = j, j = ((((j) + (1))) & 0xffff), __t0)), runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff))));
        }
        numbytes = ((((numbytes) + (count))) & 0xffff);
      }
    }
  }
  function __add_snx_decompress_block(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_border_update(runtime: any, data: any): any {
    const members = runtime.members;


  }

  function method_page_basicrom(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      return;
    }
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (16))) | 0);
    (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
  }

  function method_update_paging(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      return;
    }
    if (((Number((members.m_port_1ffd_data ?? runtime.member("m_port_1ffd_data"))) === Number(-1)) ? 1 : 0)) {
      (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
    } else {
      if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1)) {
        members.m_port_1ffd_data = ((4) | 0);
      } else {
        members.m_port_1ffd_data = ((0) | 0);
      }
      (runtime.overrides["plus3_update_memory"] ? runtime.overrides["plus3_update_memory"]() : method_plus3_update_memory(runtime));
    }
  }

  function method_plus3_update_memory(runtime: any): any {
    const members = runtime.members;


  }

  function method_setup_sna(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["m_maincpu.state_int"], __L6: any = __l["space.read_byte"], __L7: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let usedbanks: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](8) : new Uint8Array(Math.max(0, Number(8)))));
    let bank_offset: any = 0;
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let addr: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if ((((((Number(snapsize) !== Number(49179)) ? 1 : 0)) && (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0))) ? 1 : 0)) {
      0;
      return;
    }
    data = ((((((runtime.readIndex(snapdata, 22)) << (8))) | (runtime.readIndex(snapdata, 21)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 6)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 3)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 2)) << (8))) | (runtime.readIndex(snapdata, 1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 18)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 20)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 0)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 24)) << (8))) | (runtime.readIndex(snapdata, 23)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((runtime.readIndex(snapdata, 25)) & (3))) & 0xffff);
    if ((((data) === (3)) ? 1 : 0)) {
      data = ((2) & 0xffff);
    }
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 19)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (0)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    if (((Number(snapsize) === Number(49179)) ? 1 : 0)) {
      (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
    } else {
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 49181)) | 0);
      0;
      if (runtime.readIndex(snapdata, 49182)) {
      }
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
    if (((Number(snapsize) === Number(49179)) ? 1 : 0)) {
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((27) + (i))));
      }
      addr = (((__L5 ?? runtime.memberCall(members.m_maincpu, "state_int", 0, undefined))(1)) & 0xffff);
      if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65534)) ? 1 : 0))) ? 1 : 0)) {
        0;
      } else {
        0;
      }
      data = (((((((__L6 ?? runtime.memberCall(space, "read_byte", 0, __L7))(((addr) + (1)))) << (8))) | ((__L6 ?? runtime.memberCall(space, "read_byte", 0, __L7))(((addr) + (0)))))) & 0xffff);
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
      addr = ((((addr) + (2))) & 0xffff);
      0;
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
      data = ((((runtime.readIndex(snapdata, 26)) & (7))) & 0xffff);
      members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
      (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
      0;
    } else {
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        usedbanks[i] = 0;
      }
      usedbanks[5] = 1;
      usedbanks[2] = 1;
      usedbanks[(((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7))] = 1;
      0;
      0;
      0;
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((27) + (i))));
      }
      bank_offset = 49183;
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        if ((((usedbanks[i] ?? 0)) ? 0 : 1)) {
          0;
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + (i))) | 0);
          (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
          for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((j) + (49152)), runtime.readIndex(snapdata, ((bank_offset) + (j))));
          }
          bank_offset = ((bank_offset) + (16384));
        }
      }
      data = ((((((runtime.readIndex(snapdata, 49180)) << (8))) | (runtime.readIndex(snapdata, 49179)))) & 0xffff);
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
      data = ((((runtime.readIndex(snapdata, 26)) & (7))) & 0xffff);
      members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
      (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
      0;
      data = (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7))) & 0xffff);
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 49181)) | 0);
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
  }

  function method_setup_sp(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"];

    let i: any = ((0) | 0);
    let SP_OFFSET: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let start: any = ((0) & 0xffff);
    let size: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let status: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if ((((((Number(snapsize) === Number(16422)) ? 1 : 0)) || (((Number(snapsize) === Number(49190)) ? 1 : 0))) ? 1 : 0)) {
      SP_OFFSET = ((0) | 0);
      start = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (5)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (4)))))) & 0xffff);
      size = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (3)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (2)))))) & 0xffff);
    } else {
      SP_OFFSET = ((-6) | 0);
      start = ((16384) & 0xffff);
      size = ((49152) & 0xffff);
    }
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (13)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (12)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (7)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (6)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (9)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (8)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (11)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (10)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (25)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (24)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (19)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (18)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (21)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (20)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (23)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (22)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (15)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (14)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (17)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (16)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, ((SP_OFFSET) + (26)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, ((SP_OFFSET) + (27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (29)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (28)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (31)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (30)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    status = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (37)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (36)))))) & 0xffff);
    data = (((((((((status) >>> (3)) & 1)) << (1))) | ((((status) >>> (1)) & 1)))) & 0xffff);
    switch ((data as number)) {
      case 0:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 1);
        break;
      }
      case 1:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 2);
        break;
      }
      case 2:
      case 3:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 0);
      }
    }
    data = (((((status) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    data = (((((status) >>> (2)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((status) >>> (4)) & 1)) ? (1) : (0))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((start) + (i)), runtime.readIndex(snapdata, ((((SP_OFFSET) + (38))) + (i))));
    }
    data = ((((runtime.readIndex(snapdata, ((SP_OFFSET) + (34)))) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_ach(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 0)) << (8))) | (runtime.readIndex(snapdata, 4)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 12)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 20)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 24)) << (8))) | (runtime.readIndex(snapdata, 28)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 236)) << (8))) | (runtime.readIndex(snapdata, 237)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 240)) << (8))) | (runtime.readIndex(snapdata, 241)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 244)) << (8))) | (runtime.readIndex(snapdata, 245)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 246)) << (8))) | (runtime.readIndex(snapdata, 247)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 249)) << (8))) | (runtime.readIndex(snapdata, 248)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 253)) << (8))) | (runtime.readIndex(snapdata, 252)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 148)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 190)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 41)) << (8))) | (runtime.readIndex(snapdata, 40)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 33)) << (8))) | (runtime.readIndex(snapdata, 32)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((((runtime.readIndex(snapdata, 164)) & (3))) & 0xffff);
    if ((((data) === (3)) ? 1 : 0)) {
      data = ((0) & 0xffff);
    }
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((((runtime.readIndex(snapdata, 191)) ? (1) : (0))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = ((((runtime.readIndex(snapdata, 191)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((16640) + (i))));
    }
    data = ((((runtime.readIndex(snapdata, 156)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_prg(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["space.write_byte"], __L3: any = __l["write_byte"], __L4: any = __l["space.read_byte"], __L5: any = __l["read_byte"], __L6: any = __l["m_maincpu.set_input_line"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((runtime.readIndex(snapdata, 0)) & 0xffff);
    if ((((data) !== (5)) ? 1 : 0)) {
      0;
    }
    data = ((((((runtime.readIndex(snapdata, 235)) << (8))) | (runtime.readIndex(snapdata, 234)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 233)) << (8))) | (runtime.readIndex(snapdata, 232)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 237)) << (8))) | (runtime.readIndex(snapdata, 236)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 231)) << (8))) | (runtime.readIndex(snapdata, 230)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 227)) << (8))) | (runtime.readIndex(snapdata, 226)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 225)) << (8))) | (runtime.readIndex(snapdata, 224)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 229)) << (8))) | (runtime.readIndex(snapdata, 228)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 223)) << (8))) | (runtime.readIndex(snapdata, 222)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 221)) << (8))) | (runtime.readIndex(snapdata, 220)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 239)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, ((((((((data) === (0)) ? 1 : 0)) || ((((data) === (63)) ? 1 : 0))) ? 1 : 0)) ? (1) : (2)));
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((16384) + (i)), runtime.readIndex(snapdata, ((256) + (i))));
    }
    addr = ((((((runtime.readIndex(snapdata, 241)) << (8))) | (runtime.readIndex(snapdata, 240)))) & 0xffff);
    if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65530)) ? 1 : 0))) ? 1 : 0)) {
      0;
    } else {
      0;
    }
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (3)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (2)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (5)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (4)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    addr = ((((addr) + (6))) & 0xffff);
    0;
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
    data = ((((runtime.shiftRight((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_plusd(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["space.write_byte"], __L3: any = __l["write_byte"], __L4: any = __l["space.read_byte"], __L5: any = __l["read_byte"], __L6: any = __l["m_maincpu.set_input_line"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 15)) << (8))) | (runtime.readIndex(snapdata, 14)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 13)) << (8))) | (runtime.readIndex(snapdata, 12)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 17)) << (8))) | (runtime.readIndex(snapdata, 16)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 11)) << (8))) | (runtime.readIndex(snapdata, 10)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 7)) << (8))) | (runtime.readIndex(snapdata, 6)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 5)) << (8))) | (runtime.readIndex(snapdata, 4)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 9)) << (8))) | (runtime.readIndex(snapdata, 8)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 3)) << (8))) | (runtime.readIndex(snapdata, 2)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 1)) << (8))) | (runtime.readIndex(snapdata, 0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 19)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, ((((((((data) === (0)) ? 1 : 0)) || ((((data) === (63)) ? 1 : 0))) ? 1 : 0)) ? (1) : (2)));
    if (((Number(snapsize) === Number(49174)) ? 1 : 0)) {
      (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((16384) + (i)), runtime.readIndex(snapdata, ((22) + (i))));
      }
    } else {
      0;
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        switch ((i as number)) {
          case 5:
          {
            addr = ((16384) & 0xffff);
            break;
          }
          case 2:
          {
            addr = ((32768) & 0xffff);
            break;
          }
          case 0:
          case 1:
          case 3:
          case 4:
          case 6:
          case 7:
          {
            addr = ((49152) & 0xffff);
            members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
            members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + (i))) | 0);
            (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
            break;
          }
        }
        0;
        for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
          (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((j) + (addr)), runtime.readIndex(snapdata, __add_setup_plusd(runtime, ((j) + (23)), ((i) * (16384)))));
        }
      }
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 22)) | 0);
      0;
      0;
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
    addr = ((((((runtime.readIndex(snapdata, 21)) << (8))) | (runtime.readIndex(snapdata, 20)))) & 0xffff);
    if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65530)) ? 1 : 0))) ? 1 : 0)) {
      0;
    } else {
      0;
    }
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (3)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (2)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (5)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (4)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    addr = ((((addr) + (6))) & 0xffff);
    0;
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
    data = ((((runtime.shiftRight((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
  }
  function __add_setup_plusd(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_setup_sem(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 49159)) << (8))) | (runtime.readIndex(snapdata, 49158)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 49161)) << (8))) | (runtime.readIndex(snapdata, 49160)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 49163)) << (8))) | (runtime.readIndex(snapdata, 49162)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 49165)) << (8))) | (runtime.readIndex(snapdata, 49164)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 49167)) << (8))) | (runtime.readIndex(snapdata, 49166)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 49169)) << (8))) | (runtime.readIndex(snapdata, 49168)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 49171)) << (8))) | (runtime.readIndex(snapdata, 49170)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 49173)) << (8))) | (runtime.readIndex(snapdata, 49172)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 49179)) << (8))) | (runtime.readIndex(snapdata, 49178)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 49181)) << (8))) | (runtime.readIndex(snapdata, 49180)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 49184)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 49182)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 49177)) << (8))) | (runtime.readIndex(snapdata, 49176)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 49175)) << (8))) | (runtime.readIndex(snapdata, 49174)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((runtime.readIndex(snapdata, 49190)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 49186)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (0)) & 1));
    data = ((runtime.readIndex(snapdata, 49188)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (0)) & 1));
    intr = (((((((runtime.readIndex(snapdata, 49188)) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((6) + (i))));
    }
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_sit(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 7)) << (8))) | (runtime.readIndex(snapdata, 6)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 1)) << (8))) | (runtime.readIndex(snapdata, 0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 3)) << (8))) | (runtime.readIndex(snapdata, 2)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 5)) << (8))) | (runtime.readIndex(snapdata, 4)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 25)) << (8))) | (runtime.readIndex(snapdata, 24)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 19)) << (8))) | (runtime.readIndex(snapdata, 18)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 21)) << (8))) | (runtime.readIndex(snapdata, 20)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 23)) << (8))) | (runtime.readIndex(snapdata, 22)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 9)) << (8))) | (runtime.readIndex(snapdata, 8)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 11)) << (8))) | (runtime.readIndex(snapdata, 10)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 16)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 17)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 13)) << (8))) | (runtime.readIndex(snapdata, 12)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 15)) << (8))) | (runtime.readIndex(snapdata, 14)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((runtime.readIndex(snapdata, 26)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((1) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = ((((data) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((16412) + (i))));
    }
    data = ((((runtime.readIndex(snapdata, 27)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_zx(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let mode: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    0;
    data = ((((((runtime.readIndex(snapdata, 49457)) << (8))) | (runtime.readIndex(snapdata, 49461)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 49434)) << (8))) | (runtime.readIndex(snapdata, 49435)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 49438)) << (8))) | (runtime.readIndex(snapdata, 49439)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 49442)) << (8))) | (runtime.readIndex(snapdata, 49443)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 49455)) << (8))) | (runtime.readIndex(snapdata, 49459)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 49436)) << (8))) | (runtime.readIndex(snapdata, 49437)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 49440)) << (8))) | (runtime.readIndex(snapdata, 49441)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 49444)) << (8))) | (runtime.readIndex(snapdata, 49445)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 49446)) << (8))) | (runtime.readIndex(snapdata, 49447)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 49448)) << (8))) | (runtime.readIndex(snapdata, 49449)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 49451)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 49450)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 49468)) << (8))) | (runtime.readIndex(snapdata, 49469)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 49464)) << (8))) | (runtime.readIndex(snapdata, 49465)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    mode = ((((((runtime.readIndex(snapdata, 49474)) << (8))) | (runtime.readIndex(snapdata, 49475)))) & 0xffff);
    switch ((mode as number)) {
      case 65535:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 0);
        break;
      }
      case 0:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 1);
        break;
      }
      case 1:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 2);
        break;
      }
      default:
      {
        0;
      }
    }
    data = (((((runtime.readIndex(snapdata, 49426)) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((runtime.readIndex(snapdata, 49426)) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((132) + (i))));
    }
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_snp(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 49153)) << (8))) | (runtime.readIndex(snapdata, 49152)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 49157)) << (8))) | (runtime.readIndex(snapdata, 49156)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 49159)) << (8))) | (runtime.readIndex(snapdata, 49158)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 49161)) << (8))) | (runtime.readIndex(snapdata, 49160)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 49176)) << (8))) | (runtime.readIndex(snapdata, 49175)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 49178)) << (8))) | (runtime.readIndex(snapdata, 49177)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 49180)) << (8))) | (runtime.readIndex(snapdata, 49179)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 49182)) << (8))) | (runtime.readIndex(snapdata, 49181)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 49167)) << (8))) | (runtime.readIndex(snapdata, 49166)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 49169)) << (8))) | (runtime.readIndex(snapdata, 49168)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 49173)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 49174)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 49165)) << (8))) | (runtime.readIndex(snapdata, 49164)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 49163)) << (8))) | (runtime.readIndex(snapdata, 49162)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((((runtime.readIndex(snapdata, 49172)) & (3))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = (((((runtime.readIndex(snapdata, 49171)) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((runtime.readIndex(snapdata, 49171)) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, i));
    }
    data = ((((runtime.readIndex(snapdata, 49154)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_frz(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      0;
      return;
    }
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 6)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 2)) << (8))) | (runtime.readIndex(snapdata, 3)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 40)) << (8))) | (runtime.readIndex(snapdata, 41)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 38)) << (8))) | (runtime.readIndex(snapdata, 39)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 25)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 30)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 28)) << (8))) | (runtime.readIndex(snapdata, 29)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 26)) << (8))) | (runtime.readIndex(snapdata, 27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((runtime.readIndex(snapdata, 33)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 37)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    addr = ((0) & 0xffff);
    0;
    for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      switch (((__mame_table_0[((i) & 7)] ?? 0) as number)) {
        case 5:
        {
          addr = ((16384) & 0xffff);
          break;
        }
        case 2:
        {
          addr = ((32768) & 0xffff);
          break;
        }
        case 0:
        case 1:
        case 3:
        case 4:
        case 6:
        case 7:
        {
          addr = ((49152) & 0xffff);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + ((__mame_table_0[((i) & 7)] ?? 0)))) | 0);
          (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
          break;
        }
      }
      0;
      for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((j) + (addr)), runtime.readIndex(snapdata, __add_setup_frz(runtime, ((j) + (42)), ((i) * (16384)))));
      }
    }
    members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 1)) | 0);
    0;
    0;
    (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
  }
  function __add_setup_frz(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_bank3_set_page(runtime: any, page: any): any {
    const members = runtime.members;

    page = ((page) & 0xff);
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (((page) & (7))))) | 0);
    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
  }

  function method_spectrum_identify_z80(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;

    let lo: any = ((0) & 0xff);
    let hi: any = ((0) & 0xff);
    let data: any = ((0) & 0xff);
    if ((((snapsize) < (30)) ? 1 : 0)) {
      return 0;
    }
    lo = ((((runtime.readIndex(snapdata, 6)) & (255))) & 0xff);
    hi = ((((runtime.readIndex(snapdata, 7)) & (255))) & 0xff);
    if ((((hi) || (lo)) ? 1 : 0)) {
      return 1;
    }
    lo = ((((runtime.readIndex(snapdata, 30)) & (255))) & 0xff);
    hi = ((((runtime.readIndex(snapdata, 31)) & (255))) & 0xff);
    data = ((((runtime.readIndex(snapdata, 34)) & (255))) & 0xff);
    if (((((((hi) === (0)) ? 1 : 0)) && ((((lo) === (23)) ? 1 : 0))) ? 1 : 0)) {
      switch ((data as number)) {
        case 0:
        case 1:
        {
          return 2;
        }
        case 2:
        {
          return 3;
        }
        case 3:
        case 4:
        {
          return 4;
        }
        case 128:
        {
          return 5;
        }
      }
    }
    if (((((((hi) === (0)) ? 1 : 0)) && ((((lo) === (54)) ? 1 : 0))) ? 1 : 0)) {
      switch ((data as number)) {
        case 0:
        case 1:
        case 3:
        {
          return 2;
        }
        case 2:
        {
          return 3;
        }
        case 4:
        case 5:
        case 6:
        {
          return 4;
        }
        case 128:
        {
          return 5;
        }
      }
    }
    return 0;
  }

  function method_z80_decompress_block(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.write_byte"], __L1: any = __l["write_byte"];

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let ch: any = ((0) & 0xff);
    let i: any = ((0) | 0);
    do {
      ch = ((runtime.readIndex(source, 0)) & 0xff);
      if ((((ch) === (237)) ? 1 : 0)) {
        if (((Number(runtime.readIndex(source, 1)) === Number(237)) ? 1 : 0)) {
          let count: any = ((0) & 0xff);
          let data: any = ((0) & 0xff);
          count = ((runtime.readIndex(source, 2)) & 0xff);
          if ((((count) === (0)) ? 1 : 0)) {
            return;
          }
          data = ((runtime.readIndex(source, 3)) & 0xff);
          source = __add_z80_decompress_block(runtime, source, 4);
          if ((((count) > (size)) ? 1 : 0)) {
            count = ((size) & 0xff);
          }
          size = ((((size) - (count))) & 0xffff);
          for (i = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, data);
            dest = ((((dest) + (1))) & 0xffff);
          }
        } else {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, ch);
          dest = ((((dest) + (1))) & 0xffff);
          source = __add_z80_decompress_block(runtime, source, 1);
          size = ((((size) - (1))) & 0xffff);
        }
      } else {
        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, ch);
        dest = ((((dest) + (1))) & 0xffff);
        source = __add_z80_decompress_block(runtime, source, 1);
        size = ((((size) - (1))) & 0xffff);
      }
    } while ((((size) > (0)) ? 1 : 0));
  }
  function __add_z80_decompress_block(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_ts2068_update_memory(runtime: any): any {
    const members = runtime.members;


  }

  function method_decode(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bb_stream"], __L1: any = __l["bitbuf.get_byte"], __L2: any = __l["get_byte"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["bitbuf.overflow"], __L6: any = __l["overflow"], __L7: any = __l["bitbuf.get_bit"], __L8: any = __l["get_bit"], __L9: any = __l["bitbuf.get_bits"], __L10: any = __l["get_bits"], __L11: any = __l["space.read_byte"], __L12: any = __l["read_byte"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any, __t12: any, __t13: any, __t14: any, __t15: any, __t16: any, __t17: any, __t18: any, __t19: any, __t20: any, __t21: any;

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let mask: any = [0, 0, 252, 248, 240, 224, 192, 128, 0];
    let no_bits: any = ((2) & 0xff);
    let bitbuf: any = (__L0 ? __L0(source, size) : runtime.macro("bb_stream", source, size));
    (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t0 = dest, dest = ((((dest) + (1))) & 0xffff), __t0), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
    while ((((__L5 ?? runtime.memberCall(bitbuf, "overflow", 0, __L6))()) ? 0 : 1)) {
      while ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t4 = dest, dest = ((((dest) + (1))) & 0xffff), __t4), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
      }
      let len: any = ((0) & 0xffff);
      let bb: any = ((0) & 0xff);
      do {
        bb = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
        len = ((((len) + (bb))) & 0xffff);
      } while (((((((bb) === (3)) ? 1 : 0)) && ((((len) !== (15)) ? 1 : 0))) ? 1 : 0));
      let offset: any = ((0) << 16 >> 16);
      if ((((len) === (0)) ? 1 : 0)) {
        offset = ((__add_decode(runtime, 65528, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(3))) << 16 >> 16);
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
        dest = ((((dest) + (1))) & 0xffff);
        continue;
      } else {
        if ((((len) === (1)) ? 1 : 0)) {
          let code: any = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
          if (((((((code) === (0)) ? 1 : 0)) || ((((code) === (1)) ? 1 : 0))) ? 1 : 0)) {
            offset = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) << 16 >> 16);
            offset = ((((offset) + (((((code) ? (254) : (253))) << (8))))) << 16 >> 16);
          } else {
            if ((((code) === (2)) ? 1 : 0)) {
              let b: any = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) & 0xff);
              if ((((b) >= (224)) ? 1 : 0)) {
                b = ((((b) << (1))) & 0xff);
                b = ((((b) + (1))) & 0xff);
                b = ((((b) ^ (2))) & 0xff);
                if ((((b) === (255)) ? 1 : 0)) {
                  no_bits = ((((no_bits) + (1))) & 0xff);
                  continue;
                }
                offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
                dest = ((((dest) + (1))) & 0xffff);
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t8 = dest, dest = ((((dest) + (1))) & 0xffff), __t8), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
                dest = ((((dest) + (1))) & 0xffff);
                continue;
              }
              offset = ((((65280) + (b))) << 16 >> 16);
            } else {
              if ((((code) === (3)) ? 1 : 0)) {
                offset = ((__add_decode(runtime, 65504, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(5))) << 16 >> 16);
              }
            }
          }
          for (let i: any = 0; (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
          }
          continue;
        } else {
          if ((((len) === (3)) ? 1 : 0)) {
            if ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
              offset = ((__add_decode(runtime, 65520, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(4))) << 16 >> 16);
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
              dest = ((((dest) + (1))) & 0xffff);
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t11 = dest, dest = ((((dest) + (1))) & 0xffff), __t11), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
              dest = ((((dest) + (1))) & 0xffff);
              continue;
            }
            if ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
              let bytes_no: any = ((__add_decode(runtime, 6, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(4))) & 0xff);
              for (let i: any = ((0) & 0xff); ((Number(i) < Number(((bytes_no) << (1)))) ? 1 : 0); i = ((((i) + (1))) & 0xff)) {
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t14 = dest, dest = ((((dest) + (1))) & 0xffff), __t14), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
              }
              continue;
            }
            len = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(7)) & 0xffff);
            if ((((len) === (15)) ? 1 : 0)) {
              break;
            }
            if ((((len) < (15)) ? 1 : 0)) {
              len = ((__add_decode(runtime, ((len) << (8)), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))())) & 0xffff);
            }
          }
        }
      }
      if ((((len) === (2)) ? 1 : 0)) {
        len = ((((len) + (1))) & 0xffff);
      }
      let code: any = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
      if ((((code) === (0)) ? 1 : 0)) {
        offset = ((__add_decode(runtime, 65024, (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))())) << 16 >> 16);
      } else {
        if ((((code) === (1)) ? 1 : 0)) {
          let b: any = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) & 0xff);
          if ((((b) >= (224)) ? 1 : 0)) {
            if ((((len) > (3)) ? 1 : 0)) {
              break;
            }
            b = ((((b) << (1))) & 0xff);
            b = ((((b) + (1))) & 0xff);
            b = ((((b) ^ (3))) & 0xff);
            offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t19 = dest, dest = ((((dest) + (1))) & 0xffff), __t19), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
            continue;
          }
          offset = ((((65280) + (b))) << 16 >> 16);
        } else {
          if ((((code) === (2)) ? 1 : 0)) {
            offset = ((__add_decode(runtime, 65504, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(5))) << 16 >> 16);
          } else {
            if ((((code) === (3)) ? 1 : 0)) {
              offset = ((((__add_decode(runtime, (mask[no_bits] ?? 0), (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(no_bits))) << (8))) << 16 >> 16);
              offset = ((((offset) + ((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()))) << 16 >> 16);
            }
          }
        }
      }
      for (let i: any = ((0) & 0xffff); (((i) < (len)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
        dest = ((((dest) + (1))) & 0xffff);
      }
    }
  }
  function __add_decode(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_quickload_cb(runtime: any, image: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["image.length"], __L1: any = __l["length"], __L2: any = __l["VECTOR_OF"], __L3: any = __l["image.fread"], __L4: any = __l["fread"], __L5: any = __l["image.is_filetype"], __L6: any = __l["is_filetype"], __L7: any = __l["std::make_pair"], __L8: any = __l["std::error_condition"], __L9: any = __l["std::string"];
    let __t0: any;

    let quickload_size: any = (__L0 ?? runtime.memberCall(image, "length", 0, __L1))();
    let quickload_data: any = (__L2 ? __L2("uint8_t", quickload_size) : runtime.macro("VECTOR_OF", "uint8_t", quickload_size));
    (__L3 ?? runtime.memberCall(image, "fread", 0, __L4))(__addr_quickload_cb(runtime, quickload_data, 0), quickload_size);
    if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("scr")) {
      if ((((((Number(quickload_size) !== Number(6912)) ? 1 : 0)) && (((Number(quickload_size) !== Number(6144)) ? 1 : 0))) ? 1 : 0)) {
        return (__L7 ? __L7(4, "Invalid .SCR file size.") : runtime.macro("std::make_pair", 4, "Invalid .SCR file size."));
      }
      (runtime.overrides["setup_scr"] ? runtime.overrides["setup_scr"](__addr_quickload_cb(runtime, quickload_data, 0), quickload_size) : method_setup_scr(runtime, __addr_quickload_cb(runtime, quickload_data, 0), quickload_size));
    } else {
      if ((__L5 ?? runtime.memberCall(image, "is_filetype", 0, __L6))("raw")) {
        if (((Number(quickload_size) !== Number(49161)) ? 1 : 0)) {
          return (__L7 ? __L7(4, "Invalid .RAW file size.") : runtime.macro("std::make_pair", 4, "Invalid .RAW file size."));
        }
        (runtime.overrides["setup_raw"] ? runtime.overrides["setup_raw"](__addr_quickload_cb(runtime, quickload_data, 0), quickload_size) : method_setup_raw(runtime, __addr_quickload_cb(runtime, quickload_data, 0), quickload_size));
      }
    }
    return (__L7 ? __L7((__L8 ? __L8() : runtime.macro("std::error_condition")), (__L9 ? __L9() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__L8 ? __L8() : runtime.macro("std::error_condition")), (__L9 ? __L9() : runtime.macro("std::string"))));
  }
  function __addr_quickload_cb(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_setup_scr(runtime: any, quickdata: any, quicksize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["space.write_byte"], __L2: any = __l["write_byte"];

    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    for (let i: any = ((0) | 0); (((i) < (quicksize)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L1 ?? runtime.memberCall(space, "write_byte", 0, __L2))(((i) + (16384)), runtime.readIndex(quickdata, i));
    }
    runtime.invoke("log_quickload", ((((Number(quicksize) === Number(6912)) ? 1 : 0)) ? ("SCREEN$") : ("SCREEN$ (Mono)")), 16384, quicksize, 0, "N/A");
  }

  function method_setup_raw(runtime: any, quickdata: any, quicksize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["space.write_byte"], __L2: any = __l["write_byte"], __L3: any = __l["space.read_byte"], __L4: any = __l["read_byte"];

    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    let start: any = ((((((runtime.readIndex(quickdata, 4)) << (8))) | (runtime.readIndex(quickdata, 3)))) & 0xffff);
    let len: any = ((((((runtime.readIndex(quickdata, 2)) << (8))) | (runtime.readIndex(quickdata, 1)))) & 0xffff);
    for (let i: any = ((0) | 0); (((i) < (len)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L1 ?? runtime.memberCall(space, "write_byte", 0, __L2))(((i) + (start)), runtime.readIndex(quickdata, ((i) + (9))));
    }
    let data: any = ((((runtime.shiftRight((__L3 ?? runtime.memberCall(space, "read_byte", 0, __L4))(23624), 3)) & (7))) & 0xff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    runtime.invoke("log_quickload", "BYTES", start, len, 0, "N/A");
  }

  function method_spectrum_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["palette.set_pen_colors"], __L1: any = __l["set_pen_colors"];

    const h_spectrum_pens = members.spectrum_pens ?? runtime.member("spectrum_pens");
    (__L0 ?? runtime.memberCall(palette, "set_pen_colors", 0, __L1))(0, h_spectrum_pens);
  }

  function method_is_vram_write__base(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((((((offset) >= (16384)) ? 1 : 0)) && ((((offset) < (23296)) ? 1 : 0))) ? 1 : 0);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "spectrum_ula_r": method_spectrum_ula_r,
    "spectrum_ula_w": method_spectrum_ula_w,
    "spectrum_port_r": method_spectrum_port_r,
    "floating_bus_r": method_floating_bus_r,
    "get_screen_area": method_get_screen_area,
    "spectrum_port_w": method_spectrum_port_w,
    "spectrum_128_port_7ffd_w": method_spectrum_128_port_7ffd_w,
    "spectrum_128_update_memory": method_spectrum_128_update_memory,
    "spectrum_128_rom_r": method_spectrum_128_rom_r,
    "spectrum_128_rom_w": method_spectrum_128_rom_w,
    "spectrum_128_ram_r_1": method_spectrum_128_ram_r_1,
    "spectrum_128_ram_w_1": method_spectrum_128_ram_w_1,
    "is_vram_write": method_is_vram_write,
    "spectrum_128_ram_r_2": method_spectrum_128_ram_r_2,
    "spectrum_128_ram_w_2": method_spectrum_128_ram_w_2,
    "spectrum_128_ram_r_3": method_spectrum_128_ram_r_3,
    "spectrum_128_ram_w_3": method_spectrum_128_ram_w_3,
    "spectrum_128_pre_opcode_fetch_r": method_spectrum_128_pre_opcode_fetch_r,
    "spectrum_rom_r": method_spectrum_rom_r,
    "spectrum_rom_w": method_spectrum_rom_w,
    "pre_opcode_fetch_r": method_pre_opcode_fetch_r,
    "spectrum_data_r": method_spectrum_data_r,
    "spectrum_data_w": method_spectrum_data_w,
    "irq_on": method_irq_on,
    "irq_off": method_irq_off,
    "finish_screen_update": method_finish_screen_update,
    "spectrum_refresh_w": method_spectrum_refresh_w,
    "snow_pattern1_base": method_snow_pattern1_base,
    "nomem_rq": method_nomem_rq,
    "screen_update_spectrum": method_screen_update_spectrum,
    "spectrum_update_border": method_spectrum_update_border,
    "get_border_color": method_get_border_color,
    "spectrum_update_screen": method_spectrum_update_screen,
    "snapshot_cb": method_snapshot_cb,
    "setup_snx": method_setup_snx,
    "snx_decompress_block": method_snx_decompress_block,
    "border_update": method_border_update,
    "page_basicrom": method_page_basicrom,
    "update_paging": method_update_paging,
    "plus3_update_memory": method_plus3_update_memory,
    "setup_sna": method_setup_sna,
    "setup_sp": method_setup_sp,
    "setup_ach": method_setup_ach,
    "setup_prg": method_setup_prg,
    "setup_plusd": method_setup_plusd,
    "setup_sem": method_setup_sem,
    "setup_sit": method_setup_sit,
    "setup_zx": method_setup_zx,
    "setup_snp": method_setup_snp,
    "setup_frz": method_setup_frz,
    "bank3_set_page": method_bank3_set_page,
    "spectrum_identify_z80": method_spectrum_identify_z80,
    "z80_decompress_block": method_z80_decompress_block,
    "ts2068_update_memory": method_ts2068_update_memory,
    "decode": method_decode,
    "quickload_cb": method_quickload_cb,
    "setup_scr": method_setup_scr,
    "setup_raw": method_setup_raw,
    "spectrum_palette": method_spectrum_palette,
    "is_vram_write__base": method_is_vram_write__base
  };
  return __methodTable;
})();
    return {
      "spectrum_state.spectrum_ula_r": methods["spectrum_ula_r"],
      "spectrum_state.spectrum_ula_w": methods["spectrum_ula_w"],
      "spectrum_state.spectrum_port_r": methods["spectrum_port_r"],
      "spectrum_state.floating_bus_r": methods["floating_bus_r"],
      "spectrum_state.get_screen_area": methods["get_screen_area"],
      "spectrum_state.spectrum_port_w": methods["spectrum_port_w"],
      "spectrum_state.spectrum_128_update_memory": methods["spectrum_128_update_memory"],
      "spectrum_state.is_vram_write": methods["is_vram_write"],
      "spectrum_state.spectrum_rom_r": methods["spectrum_rom_r"],
      "spectrum_state.spectrum_rom_w": methods["spectrum_rom_w"],
      "spectrum_state.pre_opcode_fetch_r": methods["pre_opcode_fetch_r"],
      "spectrum_state.spectrum_data_r": methods["spectrum_data_r"],
      "spectrum_state.spectrum_data_w": methods["spectrum_data_w"],
      "spectrum_state.irq_on": methods["irq_on"],
      "spectrum_state.irq_off": methods["irq_off"],
      "spectrum_state.finish_screen_update": methods["finish_screen_update"],
      "spectrum_state.snow_pattern1_base": methods["snow_pattern1_base"],
      "spectrum_state.screen_update_spectrum": methods["screen_update_spectrum"],
      "spectrum_state.spectrum_update_border": methods["spectrum_update_border"],
      "spectrum_state.get_border_color": methods["get_border_color"],
      "spectrum_state.spectrum_update_screen": methods["spectrum_update_screen"],
      "spectrum_state.snapshot_cb": methods["snapshot_cb"],
      "spectrum_state.setup_snx": methods["setup_snx"],
      "spectrum_state.snx_decompress_block": methods["snx_decompress_block"],
      "spectrum_state.border_update": methods["border_update"],
      "spectrum_state.page_basicrom": methods["page_basicrom"],
      "spectrum_state.update_paging": methods["update_paging"],
      "spectrum_state.plus3_update_memory": methods["plus3_update_memory"],
      "spectrum_state.setup_sna": methods["setup_sna"],
      "spectrum_state.setup_sp": methods["setup_sp"],
      "spectrum_state.setup_ach": methods["setup_ach"],
      "spectrum_state.setup_prg": methods["setup_prg"],
      "spectrum_state.setup_plusd": methods["setup_plusd"],
      "spectrum_state.setup_sem": methods["setup_sem"],
      "spectrum_state.setup_sit": methods["setup_sit"],
      "spectrum_state.setup_zx": methods["setup_zx"],
      "spectrum_state.setup_snp": methods["setup_snp"],
      "spectrum_state.setup_frz": methods["setup_frz"],
      "spectrum_state.bank3_set_page": methods["bank3_set_page"],
      "spectrum_state.ts2068_update_memory": methods["ts2068_update_memory"],
      "spectrum_state.quickload_cb": methods["quickload_cb"],
      "spectrum_state.setup_scr": methods["setup_scr"],
      "spectrum_state.setup_raw": methods["setup_raw"],
      "spectrum_state.spectrum_palette": methods["spectrum_palette"],
      "spectrum_state.is_vram_write__base": methods["is_vram_write__base"],
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
  const __mame_table_0 = [5, 2, 0, 1, 3, 4, 6, 7];

  function method_spectrum_ula_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_r"], __L1: any = __l["m_io_plus0.read_safe"], __L2: any = __l["read_safe"], __L3: any = __l["m_io_plus1.read_safe"], __L4: any = __l["m_io_plus2.read_safe"], __L5: any = __l["m_io_plus3.read_safe"], __L6: any = __l["m_io_plus4.read_safe"], __L7: any = __l["m_io_joy1.read_safe"], __L8: any = __l["m_io_joy2.read_safe"], __L9: any = __l["m_exp.iorq_r"], __L10: any = __l["m_io_line0.read"], __L11: any = __l["read"], __L12: any = __l["m_io_line1.read"], __L13: any = __l["m_io_line2.read"], __L14: any = __l["m_io_line3.read"], __L15: any = __l["m_io_line4.read"], __L16: any = __l["m_io_line5.read"], __L17: any = __l["m_io_line6.read"], __L18: any = __l["m_io_line7.read"], __L19: any = __l["m_cassette.input"], __L20: any = __l["m_io_config.read"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any;

    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_r", 0, undefined))(offset);
    let lines: any = ((((offset) >>> (8))) | 0);
    let data: any = ((255) | 0);
    let cs_extra1: any = (((((__L1 ?? runtime.memberCall(members.m_io_plus0, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let cs_extra2: any = (((((__L3 ?? runtime.memberCall(members.m_io_plus1, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let cs_extra3: any = (((((__L4 ?? runtime.memberCall(members.m_io_plus2, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let ss_extra1: any = (((((__L5 ?? runtime.memberCall(members.m_io_plus3, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let ss_extra2: any = (((((__L6 ?? runtime.memberCall(members.m_io_plus4, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let joy1: any = (((((__L7 ?? runtime.memberCall(members.m_io_joy1, "read_safe", 0, __L2))(31)) & (31))) | 0);
    let joy2: any = (((((__L8 ?? runtime.memberCall(members.m_io_joy2, "read_safe", 0, __L2))(31)) & (31))) | 0);
    if (h_m_exp) {
      data = (((__L9 ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(offset)) | 0);
    }
    if (((Number(((lines) & (1))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L10 ?? runtime.memberCall(members.m_io_line0, "read", 0, __L11))()))) | 0);
      if ((((((((((cs_extra1) !== (31)) ? 1 : 0)) || ((((cs_extra2) !== (31)) ? 1 : 0))) ? 1 : 0)) || ((((cs_extra3) !== (31)) ? 1 : 0))) ? 1 : 0)) {
        data = ((((data) & (-2))) | 0);
      }
    }
    if (((Number(((lines) & (2))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L12 ?? runtime.memberCall(members.m_io_line1, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (4))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L13 ?? runtime.memberCall(members.m_io_line2, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (8))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L14 ?? runtime.memberCall(members.m_io_line3, "read", 0, __L11))()) & (cs_extra1))) & (joy2))))) | 0);
    }
    if (((Number(((lines) & (16))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L15 ?? runtime.memberCall(members.m_io_line4, "read", 0, __L11))()) & (cs_extra2))) & (joy1))))) | 0);
    }
    if (((Number(((lines) & (32))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((__L16 ?? runtime.memberCall(members.m_io_line5, "read", 0, __L11))()) & (ss_extra1))))) | 0);
    }
    if (((Number(((lines) & (64))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((__L17 ?? runtime.memberCall(members.m_io_line6, "read", 0, __L11))()))) | 0);
    }
    if (((Number(((lines) & (128))) === Number(0)) ? 1 : 0)) {
      data = ((((data) & ((((((__L18 ?? runtime.memberCall(members.m_io_line7, "read", 0, __L11))()) & (cs_extra3))) & (ss_extra2))))) | 0);
      if (((((((ss_extra1) !== (31)) ? 1 : 0)) || ((((ss_extra2) !== (31)) ? 1 : 0))) ? 1 : 0)) {
        data = ((((data) & (-3))) | 0);
      }
    }
    data = ((((data) | (224))) | 0);
    if (((Number((__L19 ?? runtime.memberCall(members.m_cassette, "input", 0, undefined))()) > Number(0.0038)) ? 1 : 0)) {
      data = ((((data) & (-65))) | 0);
    }
    if (((Number((((__L20 ?? runtime.memberCall(members.m_io_config, "read", 0, __L11))()) & (128))) === Number(0)) ? 1 : 0)) {
      data = ((((data) ^ (64))) | 0);
    }
    return data;
  }

  function method_spectrum_ula_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_cassette.output"], __L3: any = __l["m_speaker.level_w"], __L4: any = __l["m_exp.iorq_w"];
    let __t0: any;

    data = ((data) & 0xff);
    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
    let changed: any = (((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) ^ (data))) & 0xff);
    if (((changed) & (7))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    if (((changed) & (24))) {
      if ((((changed) >>> (3)) & 1)) {
        (__L2 ?? runtime.memberCall(members.m_cassette, "output", 0, undefined))((((((data) >>> (3)) & 1)) ? ((-1)) : ((+1))));
      }
      (__L3 ?? runtime.memberCall(members.m_speaker, "level_w", 0, undefined))((((data) >>> (3)) & ((1 << (2)) - 1)));
    }
    if (h_m_exp) {
      (__L4 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(offset, data);
    }
    members.m_port_fe_data = ((data) | 0);
  }

  function method_spectrum_port_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.io_r"], __L1: any = __l["m_exp.get_card_device"], __L2: any = __l["m_exp.iorq_r"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_ula, "io_r", 0, undefined))(offset);
    if ((__L1 ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
      return (__L2 ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(((offset) | (1)));
    }
    return (runtime.overrides["floating_bus_r"] ? runtime.overrides["floating_bus_r"]() : method_floating_bus_r(runtime));
  }

  function method_floating_bus_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.is_in_contended_area"], __L1: any = __l["m_screen.vpos"], __L2: any = __l["m_maincpu.total_cycles"], __L3: any = __l["m_ula.get_irq_at"], __L4: any = __l["m_ula.get_video_line_clocks"], __L5: any = __l["m_ula.get_raster_contention_offset"], __L6: any = __l["m_ula.get_raster_line_clocks"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any;

    let data: any = ((255) & 0xff);
    if ((__L0 ?? runtime.memberCall(members.m_ula, "is_in_contended_area", 0, undefined))()) {
      let vpos: any = (__L1 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
      let now: any = runtime.subtract((__L2 ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (__L3 ?? runtime.memberCall(members.m_ula, "get_irq_at", 0, undefined))());
      let cf: any = __add_floating_bus_r(runtime, ((vpos) * ((__L4 ?? runtime.memberCall(members.m_ula, "get_video_line_clocks", 0, undefined))())), (__L5 ?? runtime.memberCall(members.m_ula, "get_raster_contention_offset", 0, undefined))());
      let ct: any = ((cf) + ((__L6 ?? runtime.memberCall(members.m_ula, "get_raster_line_clocks", 0, undefined))()));
      if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
        let clocks: any = ((now) - (cf));
        if ((((((clocks) >>> (2)) & 1)) ? 0 : 1)) {
          let y: any = ((((vpos) - ((__t7 = __deref_floating_bus_r(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t7.top === 'function' ? (__t7.top() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
          let x: any = ((__add_floating_bus_r(runtime, runtime.shiftRight(clocks, 2), (((clocks) >>> (1)) & 1))) & 0xffff);
          data = ((((((clocks) & (1))) ? (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), __add_floating_bus_r(runtime, 6144, ((((((y) & (248))) << (2))) | (x))))) : (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (7))) << (8))) | (((((y) & (56))) << (2))))) | (((((y) & (192))) << (5))))) | (x)))))) & 0xff);
        }
      }
    }
    return data;
  }
  function __add_floating_bus_r(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_floating_bus_r(runtime: any, p: any): any {
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

  function method_get_screen_area(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rectangle"];

    return (__L0 ? __L0(48, 303, 63, 254) : runtime.macro("rectangle", 48, 303, 63, 254));
  }

  function method_spectrum_port_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.io_w"], __L1: any = __l["m_exp.get_card_device"], __L2: any = __l["m_exp.iorq_w"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "io_w", 0, undefined))(offset);
    if ((__L1 ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
      (__L2 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
    }
  }

  function method_spectrum_128_port_7ffd_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.ula_w"], __L1: any = __l["m_exp.iorq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
    if ((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (32))) {
      return;
    }
    members.m_port_7ffd_data = ((data) | 0);
    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
    (__L1 ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
  }

  function method_spectrum_128_update_memory(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_rom[0].set_entry"], __L1: any = __l["set_entry"], __L2: any = __l["m_bank_ram[3].set_entry"], __L3: any = __l["m_ula.bank3_pg_w"], __L4: any = __l["m_screen.update_now"], __L5: any = __l["m_ram.pointer"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "set_entry", 0, __L1))(((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1));
    (__L2 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "set_entry", 0, __L1))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
    (__L3 ?? runtime.memberCall(members.m_ula, "bank3_pg_w", 0, undefined))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
    (__L4 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) {
      members.m_screen_location = __add_spectrum_128_update_memory(runtime, (__L5 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 114688);
    } else {
      members.m_screen_location = __add_spectrum_128_update_memory(runtime, (__L5 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 81920);
    }
  }
  function __add_spectrum_128_update_memory(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_128_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.romcs"], __L1: any = __l["m_exp.mreq_r"], __L2: any = __l["m_bank_rom[0].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    return (((__L0 ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))()) ? ((__L1 ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex(runtime.byteView((__L2 ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "base", 0, __L3))()), offset)));
  }

  function method_spectrum_128_rom_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.mreq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
  }

  function method_spectrum_128_ram_r_1(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[1].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((16384) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? (__t0 = __deref_spectrum_128_ram_r_1(runtime, runtime.readIndex(h_m_bank_ram, 1)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_1(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_1(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[1].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((16384) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? (__t1 = __deref_spectrum_128_ram_w_1(runtime, runtime.readIndex(h_m_bank_ram, 1)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_1(runtime: any, p: any): any {
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

  function method_is_vram_write(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_ram[3].entry"], __L1: any = __l["entry"], __L2: any = __l["spectrum_state::is_vram_write"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    return (((((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) && (((Number((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __L1))()) === Number(7)) ? 1 : 0))) ? 1 : 0)) ? (((((((offset) >= (49152)) ? 1 : 0)) && ((((offset) < (56064)) ? 1 : 0))) ? 1 : 0)) : ((__L2 ? __L2(offset) : runtime.macro("spectrum_state::is_vram_write", offset))));
  }

  function method_spectrum_128_ram_r_2(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[2].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((32768) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? (__t0 = __deref_spectrum_128_ram_r_2(runtime, runtime.readIndex(h_m_bank_ram, 2)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_2(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_2(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[2].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((32768) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? (__t1 = __deref_spectrum_128_ram_w_2(runtime, runtime.readIndex(h_m_bank_ram, 2)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_2(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_r_3(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_bank_ram[3].base"], __L2: any = __l["base"];
    let __t0: any;

    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((49152) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
    return runtime.readIndex(runtime.byteView((__L1 ? __L1() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? (__t0 = __deref_spectrum_128_ram_r_3(runtime, runtime.readIndex(h_m_bank_ram, 3)), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset);
  }
  function __deref_spectrum_128_ram_r_3(runtime: any, p: any): any {
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

  function method_spectrum_128_ram_w_3(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_bank_ram[3].base"], __L3: any = __l["base"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let addr: any = ((((49152) + (offset))) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    runtime.writeIndex(runtime.byteView((__L2 ? __L2() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? (__t1 = __deref_spectrum_128_ram_w_3(runtime, runtime.readIndex(h_m_bank_ram, 3)), typeof __t1.base === 'function' ? (__t1.base() ?? 0) : runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : ((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("base"))?.() ?? 0))), offset, data);
  }
  function __deref_spectrum_128_ram_w_3(runtime: any, p: any): any {
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

  function method_spectrum_128_pre_opcode_fetch_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.m1"], __L1: any = __l["m_exp.pre_opcode_fetch"], __L2: any = __l["m_program.read_byte"], __L3: any = __l["read_byte"], __L4: any = __l["m_exp.post_opcode_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_program, "read_byte", 0, __L3))(offset)) & 0xff);
    (__L4 ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_rom_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.romcs"], __L1: any = __l["m_exp.mreq_r"];
    let __t0: any;

    const h_m_exp = members.m_exp ?? runtime.member("m_exp");
    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return (((((h_m_exp) && ((__L0 ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))())) ? 1 : 0)) ? ((__L1 ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex(h_m_rom, offset)));
  }

  function method_spectrum_rom_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_exp.mreq_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
  }

  function method_pre_opcode_fetch_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.m1"], __L1: any = __l["m_exp.pre_opcode_fetch"], __L2: any = __l["m_specmem.read8"], __L3: any = __l["m_exp.post_opcode_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_data_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_r"], __L1: any = __l["m_exp.pre_data_fetch"], __L2: any = __l["m_specmem.read8"], __L3: any = __l["m_exp.post_data_fetch"];

    (__L0 ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(offset);
    (__L1 ?? runtime.memberCall(members.m_exp, "pre_data_fetch", 0, undefined))(offset);
    let retval: any = (((__L2 ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
    (__L3 ?? runtime.memberCall(members.m_exp, "post_data_fetch", 0, undefined))(offset);
    return retval;
  }

  function method_spectrum_data_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.data_w"], __L1: any = __l["m_screen.update_now"], __L2: any = __l["m_specmem.write8"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(offset);
    if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](offset) : method_is_vram_write(runtime, offset))) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    }
    (__L2 ?? runtime.memberCall(members.m_specmem, "write8", 0, undefined))(offset, data);
  }

  function method_spectrum_refresh_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.is_snow_possible"], __L1: any = __l["m_screen.hpos"], __L2: any = __l["screen.left"], __L3: any = __l["left"], __L4: any = __l["m_screen.vpos"], __L5: any = __l["screen.top"], __L6: any = __l["top"], __L7: any = __l["m_maincpu.adjust_icount"], __L8: any = __l["m_screen.update_now"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    data = ((data) & 0xff);
    if ((((__L0 ?? runtime.memberCall(members.m_ula, "is_snow_possible", 0, undefined))(offset)) ? 0 : 1)) {
      return;
    }
    let screen: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
    let x: any = ((runtime.subtract((__L1 ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))(), (__L2 ?? runtime.memberCall(screen, "left", 0, __L3))())) & 0xff);
    let y: any = ((runtime.subtract((__L4 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), (__L5 ?? runtime.memberCall(screen, "top", 0, __L6))())) & 0xffff);
    let snow_pattern: any = ((0) & 0xff);
    let t_to_chunk_end: any = ((0) & 0xff);
    if (((Number(((x) % (16))) === Number(0)) ? 1 : 0)) {
      snow_pattern = ((1) & 0xff);
      t_to_chunk_end = ((4) & 0xff);
    } else {
      if (((Number(((x) % (16))) === Number(4)) ? 1 : 0)) {
        snow_pattern = ((2) & 0xff);
        x = ((((x) + (8))) & 0xff);
        t_to_chunk_end = ((6) & 0xff);
      } else {
        return;
      }
    }
    let px_addr_hi: any = ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (32))) << (2))))) & 0xffff);
    let attr_addr_hi: any = ((((6144) | (((((y) & (224))) << (2))))) & 0xffff);
    let addr_lo: any = ((((((((y) & (24))) << (2))) | (((x) >>> (3))))) & 0xff);
    let px_tmp: any = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((px_addr_hi) | (addr_lo)))) & 0xff);
    let attr_tmp: any = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((attr_addr_hi) | (addr_lo)))) & 0xff);
    if ((((snow_pattern) === (1)) ? 1 : 0)) {
      let i: any = ((((offset) >>> (8))) & 0xff);
      let r: any = ((((((offset) + (1))) & (127))) & 0xff);
      let base: any = (runtime.overrides["snow_pattern1_base"] ? runtime.overrides["snow_pattern1_base"](i) : method_snow_pattern1_base(runtime, i)); let base$s: any = undefined, base$o: any = 0; if (ArrayBuffer.isView(base) || Array.isArray(base)) base$s = base; else if (base !== null && typeof base === 'object' && base.generatedPointer === true && base.path === undefined && base.target === undefined && (ArrayBuffer.isView(base.source) || Array.isArray(base.source))) { base$s = base.source; base$o = base.offset; }
      runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), (base$s !== undefined ? (base$s[base$o + (((px_addr_hi) | (r)))] ?? 0) : runtime.readIndex(base, ((px_addr_hi) | (r)))));
      runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), (base$s !== undefined ? (base$s[base$o + (((attr_addr_hi) | (r)))] ?? 0) : runtime.readIndex(base, ((attr_addr_hi) | (r)))));
    } else {
      if ((((snow_pattern) === (2)) ? 1 : 0)) {
        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((px_addr_hi) | (addr_lo))) - (1))));
        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((attr_addr_hi) | (addr_lo))) - (1))));
      }
    }
    (__L7 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))((-t_to_chunk_end));
    (__L8 ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
    (__L7 ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(t_to_chunk_end);
    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), px_tmp);
    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), attr_tmp);
  }

  function method_snow_pattern1_base(runtime: any, i_reg: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bank_ram[3].entry"], __L1: any = __l["entry"], __L2: any = __l["m_ram.pointer"];
    let __t0: any, __t1: any;

    i_reg = ((i_reg) & 0xff);
    const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
    let is_alt_scr_selected: any = ((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) ? 1 : 0);
    let is_alt_scr: any = ((((i_reg) & (128))) ? 1 : 0);
    let i_pg: any = ((((is_alt_scr) ? ((((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __L1))()) & (5))) : (5))) & 0xff);
    return __add_snow_pattern1_base(runtime, (__L2 ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), ((((i_pg) | (((is_alt_scr_selected) << (1))))) << (14)));
  }
  function __add_snow_pattern1_base(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_nomem_rq(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_screen_update_spectrum(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.visible_area"], __L1: any = __l["visible_area"], __L2: any = __l["vis.left"], __L3: any = __l["left"], __L4: any = __l["vis.right"], __L5: any = __l["right"], __L6: any = __l["vis.top"], __L7: any = __l["top"], __L8: any = __l["scr.top"], __L9: any = __l["rectangle"], __L10: any = __l["scr.left"], __L11: any = __l["scr.bottom"], __L12: any = __l["bottom"], __L13: any = __l["scr.right"], __L14: any = __l["vis.bottom"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any, __t12: any, __t13: any, __t14: any, __t15: any, __t16: any;

    let scr: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
    let vis: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ?? runtime.memberCall(screen, "visible_area", 0, __L1))());
    if ((runtime.same(vis, scr) ? 0 : 1)) {
      let bsides: any = [(__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L6 ?? runtime.memberCall(vis, "top", 0, __L7))(), runtime.subtract((__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), 1)) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L6 ?? runtime.memberCall(vis, "top", 0, __L7))(), runtime.subtract((__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), 1))), (__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), runtime.subtract((__L10 ?? runtime.memberCall(scr, "left", 0, __L3))(), 1), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))()) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), runtime.subtract((__L10 ?? runtime.memberCall(scr, "left", 0, __L3))(), 1), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))())), (__L9 ? __L9(__add_screen_update_spectrum(runtime, (__L13 ?? runtime.memberCall(scr, "right", 0, __L5))(), 1), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))()) : runtime.macro("rectangle", __add_screen_update_spectrum(runtime, (__L13 ?? runtime.memberCall(scr, "right", 0, __L5))(), 1), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), (__L8 ?? runtime.memberCall(scr, "top", 0, __L7))(), (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))())), (__L9 ? __L9((__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), __add_screen_update_spectrum(runtime, (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))(), 1), (__L14 ?? runtime.memberCall(vis, "bottom", 0, __L12))()) : runtime.macro("rectangle", (__L2 ?? runtime.memberCall(vis, "left", 0, __L3))(), (__L4 ?? runtime.memberCall(vis, "right", 0, __L5))(), __add_screen_update_spectrum(runtime, (__L11 ?? runtime.memberCall(scr, "bottom", 0, __L12))(), 1), (__L14 ?? runtime.memberCall(vis, "bottom", 0, __L12))()))];
      for (let i: any = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
        let border: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(runtime.and((bsides[i] ?? 0), cliprect));
        if ((((border).empty()) ? 0 : 1)) {
          (runtime.overrides["spectrum_update_border"] ? runtime.overrides["spectrum_update_border"](screen, bitmap, border) : method_spectrum_update_border(runtime, screen, bitmap, border));
        }
      }
    }
    scr = runtime.andAssign(scr, cliprect);
    if ((((scr).empty()) ? 0 : 1)) {
      (runtime.overrides["spectrum_update_screen"] ? runtime.overrides["spectrum_update_screen"](screen, bitmap, scr) : method_spectrum_update_screen(runtime, screen, bitmap, scr));
    }
    return 0;
  }
  function __add_screen_update_spectrum(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_update_border(runtime: any, screen: any, bitmap: any, border: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ula.get_border_chunk_size"], __L1: any = __l["m_ula.get_btime"], __L2: any = __l["border.top"], __L3: any = __l["top"], __L4: any = __l["border.bottom"], __L5: any = __l["bottom"], __L6: any = __l["border.left"], __L7: any = __l["left"], __L8: any = __l["border.right"], __L9: any = __l["right"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any;

    let mod: any = (((__L0 ?? runtime.memberCall(members.m_ula, "get_border_chunk_size", 0, undefined))()) & 0xff);
    let btime: any = (((__L1 ?? runtime.memberCall(members.m_ula, "get_btime", 0, undefined))()) & 0xff);
    for (let y: any = (__L2 ?? runtime.memberCall(border, "top", 0, __L3))(); ((Number(y) <= Number((__L4 ?? runtime.memberCall(border, "bottom", 0, __L5))())) ? 1 : 0); y = ((y) + (1))) {
      let pix: any = bitmap["pix&"](y, (__L6 ?? runtime.memberCall(border, "left", 0, __L7))());
      for (let x: any = (__L6 ?? runtime.memberCall(border, "left", 0, __L7))(); ((Number(x) <= Number((__L8 ?? runtime.memberCall(border, "right", 0, __L9))())) ? 1 : 0); ) {
        if (((Number(((x) % (mod))) === Number(btime)) ? 1 : 0)) {
          pix = runtime.subtract(pix, btime);
          x = ((x) - (btime));
          for (let m: any = 0; ((Number(m) < Number(mod)) ? 1 : 0); m = ((m) + (1)), x = ((x) + (1))) {
            runtime.pointerStore((__t7 = pix, pix = __add_spectrum_update_border(runtime, pix, 1), __t7), (runtime.overrides["get_border_color"] ? runtime.overrides["get_border_color"](y, x) : method_get_border_color(runtime, y, x)));
          }
        } else {
          pix = __add_spectrum_update_border(runtime, pix, 1);
          x = ((x) + (1));
        }
      }
    }
  }
  function __add_spectrum_update_border(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_get_border_color(runtime: any, hpos: any, vpos: any): any {
    const members = runtime.members;

    hpos = ((hpos) & 0xffff);
    vpos = ((vpos) & 0xffff);
    return (((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (7));
  }

  function method_spectrum_update_screen(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["screen.frame_number"], __L1: any = __l["frame_number"], __L2: any = __l["cliprect.top"], __L3: any = __l["top"], __L4: any = __l["cliprect.bottom"], __L5: any = __l["bottom"], __L6: any = __l["cliprect.left"], __L7: any = __l["left"], __L8: any = __l["m_ula.get_atime_right"], __L9: any = __l["m_ula.get_atime_left"], __L10: any = __l["cliprect.right"], __L11: any = __l["right"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any;

    let invert_attrs: any = ((((runtime.divide((__L0 ?? runtime.memberCall(screen, "frame_number", 0, __L1))(), (members.m_frame_invert_count ?? runtime.member("m_frame_invert_count")))) & (1))) ? 1 : 0);
    for (let vpos: any = (((__L2 ?? runtime.memberCall(cliprect, "top", 0, __L3))()) & 0xffff); ((Number(vpos) <= Number((__L4 ?? runtime.memberCall(cliprect, "bottom", 0, __L5))())) ? 1 : 0); vpos = ((((vpos) + (1))) & 0xffff)) {
      let hpos: any = (((__L6 ?? runtime.memberCall(cliprect, "left", 0, __L7))()) & 0xffff);
      let x: any = ((((hpos) - ((__t4 = __deref_spectrum_update_screen(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t4.left === 'function' ? (__t4.left() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))))) & 0xffff);
      let chunk_right: any = ((((x) & (8))) ? 1 : 0);
      if (((Number(((x) % (8))) <= Number(((chunk_right) ? ((__L8 ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__L9 ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))())))) ? 1 : 0)) {
        let shift: any = ((((x) % (8))) & 0xff);
        x = ((((x) - (shift))) & 0xffff);
        hpos = ((((hpos) - (shift))) & 0xffff);
      } else {
        let shift: any = ((((8) - (((x) % (8))))) & 0xff);
        x = ((((x) + (shift))) & 0xffff);
        hpos = ((((hpos) + (shift))) & 0xffff);
        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
      }
      let y: any = ((((vpos) - ((__t7 = __deref_spectrum_update_screen(runtime, (runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime))), typeof __t7.top === 'function' ? (__t7.top() ?? 0) : runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
      let scr: any = __addr_spectrum_update_screen(runtime, (members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (56))) << (2))))) | (((x) >>> (3)))));
      let attr: any = __addr_spectrum_update_screen(runtime, (members.m_screen_location ?? runtime.member("m_screen_location")), ((6144) | (((((((y) & (248))) << (2))) | (((x) >>> (3)))))));
      let pix: any = bitmap["pix&"](vpos, hpos);
      while (((Number(((hpos) + (((chunk_right) ? ((__L8 ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__L9 ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))()))))) <= Number((__L10 ?? runtime.memberCall(cliprect, "right", 0, __L11))())) ? 1 : 0)) {
        let ink: any = ((((((runtime.shiftRight(__deref_spectrum_update_screen(runtime, attr), 3)) & (8))) | (((__deref_spectrum_update_screen(runtime, attr)) & (7))))) & 0xffff);
        let pap: any = ((((runtime.shiftRight(__deref_spectrum_update_screen(runtime, attr), 3)) & (15))) & 0xffff);
        let pix8: any = (((((((invert_attrs) && (((__deref_spectrum_update_screen(runtime, attr)) & (128)))) ? 1 : 0)) ? ((~__deref_spectrum_update_screen(runtime, scr))) : (__deref_spectrum_update_screen(runtime, scr)))) & 0xff);
        for (let b: any = ((128) & 0xff); b; b = ((((b) >>> (1))) & 0xff), x = ((((x) + (1))) & 0xffff), hpos = ((((hpos) + (1))) & 0xffff)) {
          runtime.pointerStore((__t11 = pix, pix = __add_spectrum_update_screen(runtime, pix, 1), __t11), ((((pix8) & (b))) ? (ink) : (pap)));
        }
        scr = __add_spectrum_update_screen(runtime, scr, 1);
        attr = __add_spectrum_update_screen(runtime, attr, 1);
        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
      }
    }
  }
  function __add_spectrum_update_screen(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_spectrum_update_screen(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_spectrum_update_screen(runtime: any, p: any): any {
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

  function method_snx_decompress_block(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.write_byte"], __L1: any = __l["write_byte"];
    let __t0: any;

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let counthi: any = ((0) & 0xff);
    let countlo: any = ((0) & 0xff);
    let compress: any = ((0) & 0xff);
    let fill: any = ((0) & 0xff);
    let block: any = ((0) & 0xffff);
    let count: any = ((0) & 0xffff);
    let i: any = ((0) & 0xffff);
    let j: any = ((0) & 0xffff);
    let numbytes: any = ((0) & 0xffff);
    i = ((42) & 0xffff);
    numbytes = ((0) & 0xffff);
    while ((((numbytes) < (size)) ? 1 : 0)) {
      counthi = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
      if ((((counthi) >= (224)) ? 1 : 0)) {
        count = ((__add_snx_decompress_block(runtime, ((counthi) & (15)), 1)) & 0xffff);
        if (((Number(((counthi) & (240))) === Number(240)) ? 1 : 0)) {
          compress = ((255) & 0xff);
        } else {
          compress = ((0) & 0xff);
        }
        0;
      } else {
        countlo = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        count = ((((((counthi) << (8))) | (countlo))) & 0xffff);
        compress = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        0;
      }
      if (((Number(compress) === Number(255)) ? 1 : 0)) {
        fill = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
        0;
        for (j = ((0) & 0xffff); (((j) < (count)) ? 1 : 0); j = ((((j) + (1))) & 0xffff)) {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(((((16384) + (numbytes))) + (j)), fill);
        }
        numbytes = ((((numbytes) + (count))) & 0xffff);
      } else {
        0;
        j = ((0) & 0xffff);
        while ((((j) < (count)) ? 1 : 0)) {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(__add_snx_decompress_block(runtime, ((16384) + (numbytes)), (__t0 = j, j = ((((j) + (1))) & 0xffff), __t0)), runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff))));
        }
        numbytes = ((((numbytes) + (count))) & 0xffff);
      }
    }
  }
  function __add_snx_decompress_block(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_setup_sna(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["m_maincpu.state_int"], __L6: any = __l["space.read_byte"], __L7: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let usedbanks: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](8) : new Uint8Array(Math.max(0, Number(8)))));
    let bank_offset: any = 0;
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let addr: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if ((((((Number(snapsize) !== Number(49179)) ? 1 : 0)) && (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0))) ? 1 : 0)) {
      0;
      return;
    }
    data = ((((((runtime.readIndex(snapdata, 22)) << (8))) | (runtime.readIndex(snapdata, 21)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 6)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 3)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 2)) << (8))) | (runtime.readIndex(snapdata, 1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 18)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 20)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 0)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 24)) << (8))) | (runtime.readIndex(snapdata, 23)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((runtime.readIndex(snapdata, 25)) & (3))) & 0xffff);
    if ((((data) === (3)) ? 1 : 0)) {
      data = ((2) & 0xffff);
    }
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 19)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (0)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    if (((Number(snapsize) === Number(49179)) ? 1 : 0)) {
      (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
    } else {
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 49181)) | 0);
      0;
      if (runtime.readIndex(snapdata, 49182)) {
      }
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
    if (((Number(snapsize) === Number(49179)) ? 1 : 0)) {
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((27) + (i))));
      }
      addr = (((__L5 ?? runtime.memberCall(members.m_maincpu, "state_int", 0, undefined))(1)) & 0xffff);
      if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65534)) ? 1 : 0))) ? 1 : 0)) {
        0;
      } else {
        0;
      }
      data = (((((((__L6 ?? runtime.memberCall(space, "read_byte", 0, __L7))(((addr) + (1)))) << (8))) | ((__L6 ?? runtime.memberCall(space, "read_byte", 0, __L7))(((addr) + (0)))))) & 0xffff);
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
      addr = ((((addr) + (2))) & 0xffff);
      0;
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
      data = ((((runtime.readIndex(snapdata, 26)) & (7))) & 0xffff);
      members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
      (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
      0;
    } else {
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        usedbanks[i] = 0;
      }
      usedbanks[5] = 1;
      usedbanks[2] = 1;
      usedbanks[(((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7))] = 1;
      0;
      0;
      0;
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((27) + (i))));
      }
      bank_offset = 49183;
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        if ((((usedbanks[i] ?? 0)) ? 0 : 1)) {
          0;
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + (i))) | 0);
          (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
          for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((j) + (49152)), runtime.readIndex(snapdata, ((bank_offset) + (j))));
          }
          bank_offset = ((bank_offset) + (16384));
        }
      }
      data = ((((((runtime.readIndex(snapdata, 49180)) << (8))) | (runtime.readIndex(snapdata, 49179)))) & 0xffff);
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
      data = ((((runtime.readIndex(snapdata, 26)) & (7))) & 0xffff);
      members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
      (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
      0;
      data = (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7))) & 0xffff);
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 49181)) | 0);
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
  }

  function method_page_basicrom(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      return;
    }
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (16))) | 0);
    (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
  }

  function method_update_paging(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      return;
    }
    if (((Number((members.m_port_1ffd_data ?? runtime.member("m_port_1ffd_data"))) === Number(-1)) ? 1 : 0)) {
      (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
    } else {
      if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1)) {
        members.m_port_1ffd_data = ((4) | 0);
      } else {
        members.m_port_1ffd_data = ((0) | 0);
      }
      (runtime.overrides["plus3_update_memory"] ? runtime.overrides["plus3_update_memory"]() : method_plus3_update_memory(runtime));
    }
  }

  function method_plus3_update_memory(runtime: any): any {
    const members = runtime.members;


  }

  function method_border_update(runtime: any, data: any): any {
    const members = runtime.members;


  }

  function method_setup_sp(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"];

    let i: any = ((0) | 0);
    let SP_OFFSET: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let start: any = ((0) & 0xffff);
    let size: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let status: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if ((((((Number(snapsize) === Number(16422)) ? 1 : 0)) || (((Number(snapsize) === Number(49190)) ? 1 : 0))) ? 1 : 0)) {
      SP_OFFSET = ((0) | 0);
      start = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (5)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (4)))))) & 0xffff);
      size = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (3)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (2)))))) & 0xffff);
    } else {
      SP_OFFSET = ((-6) | 0);
      start = ((16384) & 0xffff);
      size = ((49152) & 0xffff);
    }
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (13)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (12)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (7)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (6)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (9)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (8)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (11)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (10)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (25)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (24)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (19)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (18)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (21)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (20)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (23)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (22)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (15)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (14)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (17)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (16)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, ((SP_OFFSET) + (26)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, ((SP_OFFSET) + (27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (29)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (28)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (31)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (30)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    status = ((((((runtime.readIndex(snapdata, ((SP_OFFSET) + (37)))) << (8))) | (runtime.readIndex(snapdata, ((SP_OFFSET) + (36)))))) & 0xffff);
    data = (((((((((status) >>> (3)) & 1)) << (1))) | ((((status) >>> (1)) & 1)))) & 0xffff);
    switch ((data as number)) {
      case 0:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 1);
        break;
      }
      case 1:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 2);
        break;
      }
      case 2:
      case 3:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 0);
      }
    }
    data = (((((status) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    data = (((((status) >>> (2)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((status) >>> (4)) & 1)) ? (1) : (0))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); (((i) < (size)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((start) + (i)), runtime.readIndex(snapdata, ((((SP_OFFSET) + (38))) + (i))));
    }
    data = ((((runtime.readIndex(snapdata, ((SP_OFFSET) + (34)))) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_plusd(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["space.write_byte"], __L3: any = __l["write_byte"], __L4: any = __l["space.read_byte"], __L5: any = __l["read_byte"], __L6: any = __l["m_maincpu.set_input_line"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    data = ((((((runtime.readIndex(snapdata, 15)) << (8))) | (runtime.readIndex(snapdata, 14)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 13)) << (8))) | (runtime.readIndex(snapdata, 12)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 17)) << (8))) | (runtime.readIndex(snapdata, 16)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 11)) << (8))) | (runtime.readIndex(snapdata, 10)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 7)) << (8))) | (runtime.readIndex(snapdata, 6)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 5)) << (8))) | (runtime.readIndex(snapdata, 4)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 9)) << (8))) | (runtime.readIndex(snapdata, 8)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 3)) << (8))) | (runtime.readIndex(snapdata, 2)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 1)) << (8))) | (runtime.readIndex(snapdata, 0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 19)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, ((((((((data) === (0)) ? 1 : 0)) || ((((data) === (63)) ? 1 : 0))) ? 1 : 0)) ? (1) : (2)));
    if (((Number(snapsize) === Number(49174)) ? 1 : 0)) {
      (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
      0;
      for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((16384) + (i)), runtime.readIndex(snapdata, ((22) + (i))));
      }
    } else {
      0;
      for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        switch ((i as number)) {
          case 5:
          {
            addr = ((16384) & 0xffff);
            break;
          }
          case 2:
          {
            addr = ((32768) & 0xffff);
            break;
          }
          case 0:
          case 1:
          case 3:
          case 4:
          case 6:
          case 7:
          {
            addr = ((49152) & 0xffff);
            members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
            members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + (i))) | 0);
            (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
            break;
          }
        }
        0;
        for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
          (__L2 ?? runtime.memberCall(space, "write_byte", 0, __L3))(((j) + (addr)), runtime.readIndex(snapdata, __add_setup_plusd(runtime, ((j) + (23)), ((i) * (16384)))));
        }
      }
      members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 22)) | 0);
      0;
      0;
      (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    }
    addr = ((((((runtime.readIndex(snapdata, 21)) << (8))) | (runtime.readIndex(snapdata, 20)))) & 0xffff);
    if ((((((Number(addr) < Number(16384)) ? 1 : 0)) || (((Number(addr) > Number(65530)) ? 1 : 0))) ? 1 : 0)) {
      0;
    } else {
      0;
    }
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (0)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L6 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    data = (((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (1)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (3)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (2)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = (((((((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (5)))) << (8))) | ((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(((addr) + (4)))))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    addr = ((((addr) + (6))) & 0xffff);
    0;
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, addr);
    data = ((((runtime.shiftRight((__L4 ?? runtime.memberCall(space, "read_byte", 0, __L5))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
  }
  function __add_setup_plusd(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_setup_zx(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let data: any = ((0) & 0xffff);
    let mode: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    0;
    data = ((((((runtime.readIndex(snapdata, 49457)) << (8))) | (runtime.readIndex(snapdata, 49461)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 49434)) << (8))) | (runtime.readIndex(snapdata, 49435)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 49438)) << (8))) | (runtime.readIndex(snapdata, 49439)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 49442)) << (8))) | (runtime.readIndex(snapdata, 49443)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 49455)) << (8))) | (runtime.readIndex(snapdata, 49459)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 49436)) << (8))) | (runtime.readIndex(snapdata, 49437)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 49440)) << (8))) | (runtime.readIndex(snapdata, 49441)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 49444)) << (8))) | (runtime.readIndex(snapdata, 49445)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 49446)) << (8))) | (runtime.readIndex(snapdata, 49447)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 49448)) << (8))) | (runtime.readIndex(snapdata, 49449)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 49451)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 49450)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 49468)) << (8))) | (runtime.readIndex(snapdata, 49469)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 49464)) << (8))) | (runtime.readIndex(snapdata, 49465)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    mode = ((((((runtime.readIndex(snapdata, 49474)) << (8))) | (runtime.readIndex(snapdata, 49475)))) & 0xffff);
    switch ((mode as number)) {
      case 65535:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 0);
        break;
      }
      case 0:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 1);
        break;
      }
      case 1:
      {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, 2);
        break;
      }
      default:
      {
        0;
      }
    }
    data = (((((runtime.readIndex(snapdata, 49426)) >>> (0)) & 1)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, data);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, data);
    intr = (((((((runtime.readIndex(snapdata, 49426)) >>> (0)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    0;
    for (i = ((0) | 0); ((Number(i) < Number(49152)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((16384) + (i)), runtime.readIndex(snapdata, ((132) + (i))));
    }
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
    (runtime.overrides["page_basicrom"] ? runtime.overrides["page_basicrom"]() : method_page_basicrom(runtime));
  }

  function method_setup_frz(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.set_state_int"], __L2: any = __l["m_maincpu.set_input_line"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["space.read_byte"], __L6: any = __l["read_byte"];

    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let intr: any = ((0) & 0xff);
    let addr: any = ((0) & 0xffff);
    let data: any = ((0) & 0xffff);
    let space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
      0;
      return;
    }
    data = ((((((runtime.readIndex(snapdata, 16)) << (8))) | (runtime.readIndex(snapdata, 17)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(10, data);
    data = ((((((runtime.readIndex(snapdata, 12)) << (8))) | (runtime.readIndex(snapdata, 13)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(11, data);
    data = ((((((runtime.readIndex(snapdata, 8)) << (8))) | (runtime.readIndex(snapdata, 9)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(12, data);
    data = ((((((runtime.readIndex(snapdata, 4)) << (8))) | (runtime.readIndex(snapdata, 5)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(13, data);
    data = ((((((runtime.readIndex(snapdata, 14)) << (8))) | (runtime.readIndex(snapdata, 15)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(16, data);
    data = ((((((runtime.readIndex(snapdata, 10)) << (8))) | (runtime.readIndex(snapdata, 11)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(17, data);
    data = ((((((runtime.readIndex(snapdata, 6)) << (8))) | (runtime.readIndex(snapdata, 7)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(18, data);
    data = ((((((runtime.readIndex(snapdata, 2)) << (8))) | (runtime.readIndex(snapdata, 3)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(19, data);
    data = ((((((runtime.readIndex(snapdata, 40)) << (8))) | (runtime.readIndex(snapdata, 41)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(14, data);
    data = ((((((runtime.readIndex(snapdata, 38)) << (8))) | (runtime.readIndex(snapdata, 39)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(15, data);
    data = ((runtime.readIndex(snapdata, 25)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(20, data);
    data = ((runtime.readIndex(snapdata, 30)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(21, data);
    data = ((((((runtime.readIndex(snapdata, 28)) << (8))) | (runtime.readIndex(snapdata, 29)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(1, data);
    data = ((((((runtime.readIndex(snapdata, 26)) << (8))) | (runtime.readIndex(snapdata, 27)))) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(-1, data);
    data = ((runtime.readIndex(snapdata, 33)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(22, data);
    data = ((runtime.readIndex(snapdata, 37)) & 0xffff);
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(23, (((data) >>> (2)) & 1));
    (__L1 ?? runtime.memberCall(members.m_maincpu, "set_state_int", 0, undefined))(24, (((data) >>> (2)) & 1));
    intr = (((((((data) >>> (2)) & 1)) ? (0) : (1))) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, intr);
    (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, 0);
    addr = ((0) & 0xffff);
    0;
    for (i = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      switch (((__mame_table_0[((i) & 7)] ?? 0) as number)) {
        case 5:
        {
          addr = ((16384) & 0xffff);
          break;
        }
        case 2:
        {
          addr = ((32768) & 0xffff);
          break;
        }
        case 0:
        case 1:
        case 3:
        case 4:
        case 6:
        case 7:
        {
          addr = ((49152) & 0xffff);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
          members.m_port_7ffd_data = ((((members.m_port_7ffd_data) + ((__mame_table_0[((i) & 7)] ?? 0)))) | 0);
          (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
          break;
        }
      }
      0;
      for (j = ((0) | 0); ((Number(j) < Number(16384)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(((j) + (addr)), runtime.readIndex(snapdata, __add_setup_frz(runtime, ((j) + (42)), ((i) * (16384)))));
      }
    }
    members.m_port_7ffd_data = ((runtime.readIndex(snapdata, 1)) | 0);
    0;
    0;
    (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
    data = ((((runtime.shiftRight((__L5 ?? runtime.memberCall(space, "read_byte", 0, __L6))(23624), 3)) & (7))) & 0xffff);
    members.m_port_fe_data = (((((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (248))) | (data))) | 0);
    (runtime.overrides["border_update"] ? runtime.overrides["border_update"](data) : method_border_update(runtime, data));
    0;
  }
  function __add_setup_frz(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_bank3_set_page(runtime: any, page: any): any {
    const members = runtime.members;

    page = ((page) & 0xff);
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
    members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (((page) & (7))))) | 0);
    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
  }

  function method_decode(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bb_stream"], __L1: any = __l["bitbuf.get_byte"], __L2: any = __l["get_byte"], __L3: any = __l["space.write_byte"], __L4: any = __l["write_byte"], __L5: any = __l["bitbuf.overflow"], __L6: any = __l["overflow"], __L7: any = __l["bitbuf.get_bit"], __L8: any = __l["get_bit"], __L9: any = __l["bitbuf.get_bits"], __L10: any = __l["get_bits"], __L11: any = __l["space.read_byte"], __L12: any = __l["read_byte"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any, __t6: any, __t7: any, __t8: any, __t9: any, __t10: any, __t11: any, __t12: any, __t13: any, __t14: any, __t15: any, __t16: any, __t17: any, __t18: any, __t19: any, __t20: any, __t21: any;

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let mask: any = [0, 0, 252, 248, 240, 224, 192, 128, 0];
    let no_bits: any = ((2) & 0xff);
    let bitbuf: any = (__L0 ? __L0(source, size) : runtime.macro("bb_stream", source, size));
    (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t0 = dest, dest = ((((dest) + (1))) & 0xffff), __t0), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
    while ((((__L5 ?? runtime.memberCall(bitbuf, "overflow", 0, __L6))()) ? 0 : 1)) {
      while ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t4 = dest, dest = ((((dest) + (1))) & 0xffff), __t4), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
      }
      let len: any = ((0) & 0xffff);
      let bb: any = ((0) & 0xff);
      do {
        bb = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
        len = ((((len) + (bb))) & 0xffff);
      } while (((((((bb) === (3)) ? 1 : 0)) && ((((len) !== (15)) ? 1 : 0))) ? 1 : 0));
      let offset: any = ((0) << 16 >> 16);
      if ((((len) === (0)) ? 1 : 0)) {
        offset = ((__add_decode(runtime, 65528, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(3))) << 16 >> 16);
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
        dest = ((((dest) + (1))) & 0xffff);
        continue;
      } else {
        if ((((len) === (1)) ? 1 : 0)) {
          let code: any = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
          if (((((((code) === (0)) ? 1 : 0)) || ((((code) === (1)) ? 1 : 0))) ? 1 : 0)) {
            offset = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) << 16 >> 16);
            offset = ((((offset) + (((((code) ? (254) : (253))) << (8))))) << 16 >> 16);
          } else {
            if ((((code) === (2)) ? 1 : 0)) {
              let b: any = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) & 0xff);
              if ((((b) >= (224)) ? 1 : 0)) {
                b = ((((b) << (1))) & 0xff);
                b = ((((b) + (1))) & 0xff);
                b = ((((b) ^ (2))) & 0xff);
                if ((((b) === (255)) ? 1 : 0)) {
                  no_bits = ((((no_bits) + (1))) & 0xff);
                  continue;
                }
                offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
                dest = ((((dest) + (1))) & 0xffff);
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t8 = dest, dest = ((((dest) + (1))) & 0xffff), __t8), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
                dest = ((((dest) + (1))) & 0xffff);
                continue;
              }
              offset = ((((65280) + (b))) << 16 >> 16);
            } else {
              if ((((code) === (3)) ? 1 : 0)) {
                offset = ((__add_decode(runtime, 65504, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(5))) << 16 >> 16);
              }
            }
          }
          for (let i: any = 0; (((i) < (2)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
          }
          continue;
        } else {
          if ((((len) === (3)) ? 1 : 0)) {
            if ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
              offset = ((__add_decode(runtime, 65520, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(4))) << 16 >> 16);
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
              dest = ((((dest) + (1))) & 0xffff);
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t11 = dest, dest = ((((dest) + (1))) & 0xffff), __t11), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
              (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
              dest = ((((dest) + (1))) & 0xffff);
              continue;
            }
            if ((__L7 ?? runtime.memberCall(bitbuf, "get_bit", 0, __L8))()) {
              let bytes_no: any = ((__add_decode(runtime, 6, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(4))) & 0xff);
              for (let i: any = ((0) & 0xff); ((Number(i) < Number(((bytes_no) << (1)))) ? 1 : 0); i = ((((i) + (1))) & 0xff)) {
                (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t14 = dest, dest = ((((dest) + (1))) & 0xffff), __t14), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
              }
              continue;
            }
            len = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(7)) & 0xffff);
            if ((((len) === (15)) ? 1 : 0)) {
              break;
            }
            if ((((len) < (15)) ? 1 : 0)) {
              len = ((__add_decode(runtime, ((len) << (8)), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))())) & 0xffff);
            }
          }
        }
      }
      if ((((len) === (2)) ? 1 : 0)) {
        len = ((((len) + (1))) & 0xffff);
      }
      let code: any = (((__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(2)) & 0xff);
      if ((((code) === (0)) ? 1 : 0)) {
        offset = ((__add_decode(runtime, 65024, (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))())) << 16 >> 16);
      } else {
        if ((((code) === (1)) ? 1 : 0)) {
          let b: any = (((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()) & 0xff);
          if ((((b) >= (224)) ? 1 : 0)) {
            if ((((len) > (3)) ? 1 : 0)) {
              break;
            }
            b = ((((b) << (1))) & 0xff);
            b = ((((b) + (1))) & 0xff);
            b = ((((b) ^ (3))) & 0xff);
            offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))((__t19 = dest, dest = ((((dest) + (1))) & 0xffff), __t19), (__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))());
            (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
            dest = ((((dest) + (1))) & 0xffff);
            continue;
          }
          offset = ((((65280) + (b))) << 16 >> 16);
        } else {
          if ((((code) === (2)) ? 1 : 0)) {
            offset = ((__add_decode(runtime, 65504, (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(5))) << 16 >> 16);
          } else {
            if ((((code) === (3)) ? 1 : 0)) {
              offset = ((((__add_decode(runtime, (mask[no_bits] ?? 0), (__L9 ?? runtime.memberCall(bitbuf, "get_bits", 0, __L10))(no_bits))) << (8))) << 16 >> 16);
              offset = ((((offset) + ((__L1 ?? runtime.memberCall(bitbuf, "get_byte", 0, __L2))()))) << 16 >> 16);
            }
          }
        }
      }
      for (let i: any = ((0) & 0xffff); (((i) < (len)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
        (__L3 ?? runtime.memberCall(space, "write_byte", 0, __L4))(dest, (__L11 ?? runtime.memberCall(space, "read_byte", 0, __L12))(((dest) + (offset))));
        dest = ((((dest) + (1))) & 0xffff);
      }
    }
  }
  function __add_decode(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_spectrum_identify_z80(runtime: any, snapdata: any, snapsize: any): any {
    const members = runtime.members;

    let lo: any = ((0) & 0xff);
    let hi: any = ((0) & 0xff);
    let data: any = ((0) & 0xff);
    if ((((snapsize) < (30)) ? 1 : 0)) {
      return 0;
    }
    lo = ((((runtime.readIndex(snapdata, 6)) & (255))) & 0xff);
    hi = ((((runtime.readIndex(snapdata, 7)) & (255))) & 0xff);
    if ((((hi) || (lo)) ? 1 : 0)) {
      return 1;
    }
    lo = ((((runtime.readIndex(snapdata, 30)) & (255))) & 0xff);
    hi = ((((runtime.readIndex(snapdata, 31)) & (255))) & 0xff);
    data = ((((runtime.readIndex(snapdata, 34)) & (255))) & 0xff);
    if (((((((hi) === (0)) ? 1 : 0)) && ((((lo) === (23)) ? 1 : 0))) ? 1 : 0)) {
      switch ((data as number)) {
        case 0:
        case 1:
        {
          return 2;
        }
        case 2:
        {
          return 3;
        }
        case 3:
        case 4:
        {
          return 4;
        }
        case 128:
        {
          return 5;
        }
      }
    }
    if (((((((hi) === (0)) ? 1 : 0)) && ((((lo) === (54)) ? 1 : 0))) ? 1 : 0)) {
      switch ((data as number)) {
        case 0:
        case 1:
        case 3:
        {
          return 2;
        }
        case 2:
        {
          return 3;
        }
        case 4:
        case 5:
        case 6:
        {
          return 4;
        }
        case 128:
        {
          return 5;
        }
      }
    }
    return 0;
  }

  function method_z80_decompress_block(runtime: any, space: any, source: any, dest: any, size: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.write_byte"], __L1: any = __l["write_byte"];

    dest = ((dest) & 0xffff);
    size = ((size) & 0xffff);
    let ch: any = ((0) & 0xff);
    let i: any = ((0) | 0);
    do {
      ch = ((runtime.readIndex(source, 0)) & 0xff);
      if ((((ch) === (237)) ? 1 : 0)) {
        if (((Number(runtime.readIndex(source, 1)) === Number(237)) ? 1 : 0)) {
          let count: any = ((0) & 0xff);
          let data: any = ((0) & 0xff);
          count = ((runtime.readIndex(source, 2)) & 0xff);
          if ((((count) === (0)) ? 1 : 0)) {
            return;
          }
          data = ((runtime.readIndex(source, 3)) & 0xff);
          source = __add_z80_decompress_block(runtime, source, 4);
          if ((((count) > (size)) ? 1 : 0)) {
            count = ((size) & 0xff);
          }
          size = ((((size) - (count))) & 0xffff);
          for (i = ((0) | 0); (((i) < (count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, data);
            dest = ((((dest) + (1))) & 0xffff);
          }
        } else {
          (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, ch);
          dest = ((((dest) + (1))) & 0xffff);
          source = __add_z80_decompress_block(runtime, source, 1);
          size = ((((size) - (1))) & 0xffff);
        }
      } else {
        (__L0 ?? runtime.memberCall(space, "write_byte", 0, __L1))(dest, ch);
        dest = ((((dest) + (1))) & 0xffff);
        source = __add_z80_decompress_block(runtime, source, 1);
        size = ((((size) - (1))) & 0xffff);
      }
    } while ((((size) > (0)) ? 1 : 0));
  }
  function __add_z80_decompress_block(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_ts2068_update_memory(runtime: any): any {
    const members = runtime.members;


  }

  function method_is_vram_write__base(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((((((offset) >= (16384)) ? 1 : 0)) && ((((offset) < (23296)) ? 1 : 0))) ? 1 : 0);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "spectrum_ula_r": method_spectrum_ula_r,
    "spectrum_ula_w": method_spectrum_ula_w,
    "spectrum_port_r": method_spectrum_port_r,
    "floating_bus_r": method_floating_bus_r,
    "get_screen_area": method_get_screen_area,
    "spectrum_port_w": method_spectrum_port_w,
    "spectrum_128_port_7ffd_w": method_spectrum_128_port_7ffd_w,
    "spectrum_128_update_memory": method_spectrum_128_update_memory,
    "spectrum_128_rom_r": method_spectrum_128_rom_r,
    "spectrum_128_rom_w": method_spectrum_128_rom_w,
    "spectrum_128_ram_r_1": method_spectrum_128_ram_r_1,
    "spectrum_128_ram_w_1": method_spectrum_128_ram_w_1,
    "is_vram_write": method_is_vram_write,
    "spectrum_128_ram_r_2": method_spectrum_128_ram_r_2,
    "spectrum_128_ram_w_2": method_spectrum_128_ram_w_2,
    "spectrum_128_ram_r_3": method_spectrum_128_ram_r_3,
    "spectrum_128_ram_w_3": method_spectrum_128_ram_w_3,
    "spectrum_128_pre_opcode_fetch_r": method_spectrum_128_pre_opcode_fetch_r,
    "spectrum_rom_r": method_spectrum_rom_r,
    "spectrum_rom_w": method_spectrum_rom_w,
    "pre_opcode_fetch_r": method_pre_opcode_fetch_r,
    "spectrum_data_r": method_spectrum_data_r,
    "spectrum_data_w": method_spectrum_data_w,
    "spectrum_refresh_w": method_spectrum_refresh_w,
    "snow_pattern1_base": method_snow_pattern1_base,
    "nomem_rq": method_nomem_rq,
    "screen_update_spectrum": method_screen_update_spectrum,
    "spectrum_update_border": method_spectrum_update_border,
    "get_border_color": method_get_border_color,
    "spectrum_update_screen": method_spectrum_update_screen,
    "snx_decompress_block": method_snx_decompress_block,
    "setup_sna": method_setup_sna,
    "page_basicrom": method_page_basicrom,
    "update_paging": method_update_paging,
    "plus3_update_memory": method_plus3_update_memory,
    "border_update": method_border_update,
    "setup_sp": method_setup_sp,
    "setup_plusd": method_setup_plusd,
    "setup_zx": method_setup_zx,
    "setup_frz": method_setup_frz,
    "bank3_set_page": method_bank3_set_page,
    "decode": method_decode,
    "spectrum_identify_z80": method_spectrum_identify_z80,
    "z80_decompress_block": method_z80_decompress_block,
    "ts2068_update_memory": method_ts2068_update_memory,
    "is_vram_write__base": method_is_vram_write__base
  };
  return __methodTable;
})();
    return {
      "hrust_decoder.decode": methods["decode"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["VECTOR_OF","adjust","base","bb_stream","bitbuf.get_bit","bitbuf.get_bits","bitbuf.get_byte","bitbuf.overflow","border.bottom","border.left","border.right","border.top","bottom","cliprect.bottom","cliprect.left","cliprect.right","cliprect.top","entry","frame_number","fread","get_bit","get_bits","get_byte","image.fread","image.is_filetype","image.length","is_filetype","left","length","m_bank_ram[1].base","m_bank_ram[2].base","m_bank_ram[3].base","m_bank_ram[3].entry","m_bank_ram[3].set_entry","m_bank_rom[0].base","m_bank_rom[0].set_entry","m_cassette.input","m_cassette.output","m_exp.get_card_device","m_exp.iorq_r","m_exp.iorq_w","m_exp.mreq_r","m_exp.mreq_w","m_exp.post_data_fetch","m_exp.post_opcode_fetch","m_exp.pre_data_fetch","m_exp.pre_opcode_fetch","m_exp.romcs","m_finish_screen_update_timer.adjust","m_io_config.read","m_io_joy1.read_safe","m_io_joy2.read_safe","m_io_line0.read","m_io_line1.read","m_io_line2.read","m_io_line3.read","m_io_line4.read","m_io_line5.read","m_io_line6.read","m_io_line7.read","m_io_plus0.read_safe","m_io_plus1.read_safe","m_io_plus2.read_safe","m_io_plus3.read_safe","m_io_plus4.read_safe","m_irq_off_timer.adjust","m_irq_on_timer.adjust","m_maincpu.adjust_icount","m_maincpu.clocks_to_attotime","m_maincpu.set_input_line","m_maincpu.set_state_int","m_maincpu.space","m_maincpu.state_int","m_maincpu.total_cycles","m_program.read_byte","m_ram.pointer","m_screen.hpos","m_screen.time_until_pos","m_screen.update_now","m_screen.visible_area","m_screen.vpos","m_speaker.level_w","m_specmem.read8","m_specmem.write8","m_ula.bank3_pg_w","m_ula.data_r","m_ula.data_w","m_ula.get_atime_left","m_ula.get_atime_right","m_ula.get_border_chunk_size","m_ula.get_btime","m_ula.get_irq_at","m_ula.get_irq_ext_length","m_ula.get_raster_contention_offset","m_ula.get_raster_line_clocks","m_ula.get_video_line_clocks","m_ula.io_r","m_ula.io_w","m_ula.is_in_contended_area","m_ula.is_snow_possible","m_ula.m1","m_ula.on_irq","m_ula.ula_r","m_ula.ula_w","overflow","palette.set_pen_colors","read","read_byte","read_safe","rectangle","right","scr.bottom","scr.left","scr.right","scr.top","screen.frame_number","screen.left","screen.top","screen.visible_area","set_entry","set_pen_colors","space.read_byte","space.write_byte","spectrum_state::is_vram_write","spectrum_state::is_vram_write__base","started","std::error_condition","std::make_pair","std::string","top","vis.bottom","vis.left","vis.right","vis.top","visible_area","write_byte"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
