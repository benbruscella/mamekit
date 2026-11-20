// GENERATED executable machine composition from src/mame/nintendo/gb.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gameboy');

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
  const __mame_table_0 = [10, 4, 6, 8];
  const __mame_table_1 = [4287101951, 4283346609, 4283334788, 4283321934, 4288794564, 4285371787, 4283659115, 4282466625];

  function method_gb_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ppu.update_state"], __L1: any = __l["m_maincpu.get_if"];
    let __t0: any, __t1: any;

    switch ((offset as number)) {
      case 4:
      {
        0;
        return ((runtime.shiftRight((members.m_divcount ?? runtime.member("m_divcount")), 8)) & (255));
      }
      case 0:
      case 1:
      case 2:
      case 3:
      case 5:
      case 6:
      case 7:
      {
        return runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), offset);
      }
      case 15:
      {
        (__L0 ?? runtime.memberCall(members.m_ppu, "update_state", 0, undefined))();
        0;
        0;
        return ((224) | ((__L1 ?? runtime.memberCall(members.m_maincpu, "get_if", 0, undefined))()));
      }
      default:
      {
        return 255;
      }
    }
  }

  function method_gb_io_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_inputs.read"], __L1: any = __l["read"], __L2: any = __l["m_ppu.update_state"], __L3: any = __l["m_maincpu.set_if"];
    let __t0: any, __t1: any, __t2: any;

    data = ((data) & 0xff);
    switch ((offset as number)) {
      case 0:
      {
        runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((207) | (data)));
        if (((((data) & (32))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & (((runtime.shiftRight((__L0 ?? runtime.memberCall(members.m_inputs, "read", 0, __L1))(), 4)) | (240)))));
        }
        if (((((data) & (16))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & ((((__L0 ?? runtime.memberCall(members.m_inputs, "read", 0, __L1))()) | (240)))));
        }
        return;
      }
      case 1:
      {
        break;
      }
      case 2:
      {
        switch ((((data) & (129)) as number)) {
          case 0:
          case 1:
          {
            members.m_sio_count = ((0) >>> 0);
            break;
          }
          case 128:
          {
            members.m_sio_count = ((16) >>> 0);
            break;
          }
          case 129:
          {
            members.m_sio_count = ((16) >>> 0);
            break;
          }
        }
        0;
        data = ((((data) | (126))) & 0xff);
        break;
      }
      case 3:
      {
        return;
      }
      case 4:
      {
        if (((runtime.shiftRight((members.m_divcount ?? runtime.member("m_divcount")), (((members.m_shift ?? runtime.member("m_shift"))) - (1)))) & (1))) {
          (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
        }
        0;
        members.m_divcount = ((0) & 0xffff);
        return;
      }
      case 5:
      {
        if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          data = ((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6)) & 0xff);
        }
        break;
      }
      case 6:
      {
        if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, data);
        }
        break;
      }
      case 7:
      {
        data = ((((data) | (248))) & 0xff);
        if (((((((((((data) & (4))) ? 0 : 1)) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) || (((((((((data) & (4))) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) && (((Number(((data) & (3))) !== Number(((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (3)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          if (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) >= Number(runtime.shiftRight((members.m_shift_cycles ?? runtime.member("m_shift_cycles")), 1))) ? 1 : 0)) {
            (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
          }
        }
        members.m_shift = (((__mame_table_0[(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
        members.m_shift_cycles = ((((1) << ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
        break;
      }
      case 15:
      {
        (__L2 ?? runtime.memberCall(members.m_ppu, "update_state", 0, undefined))();
        0;
        data = ((((data) & (31))) & 0xff);
        (__L3 ?? runtime.memberCall(members.m_maincpu, "set_if", 0, undefined))(data);
        break;
      }
    }
    runtime.writeIndex(runtime.writableMember("m_gb_io"), offset, data);
  }

  function method_gb_timer_increment(runtime: any): any {
    const members = runtime.members;

    (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
    0;
    runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 5)) + (1)));
    if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
      members.m_triggering_irq = ((1) & 0xff);
    }
  }

  function method_gb_timer_check_irq(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"], __L1: any = __l["m_maincpu.execute_set_input"];

    members.m_reloading = ((0) & 0xff);
    if ((members.m_triggering_irq ?? runtime.member("m_triggering_irq"))) {
      members.m_triggering_irq = ((0) & 0xff);
      if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
        runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6));
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(2, 1);
        (__L1 ?? runtime.memberCall(members.m_maincpu, "execute_set_input", 0, undefined))(2, 1);
        members.m_reloading = ((1) & 0xff);
      }
    }
  }

  function method_gb_io2_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ppu.video_w"];

    data = ((data) & 0xff);
    if ((((offset) === (16)) ? 1 : 0)) {
      (runtime.overrides["disable_boot"] ? runtime.overrides["disable_boot"]() : method_disable_boot(runtime));
    } else {
      (__L0 ?? runtime.memberCall(members.m_ppu, "video_w", 0, undefined))(offset, data);
    }
  }

  function method_disable_boot(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_boot_view.disable"], __L1: any = __l["disable"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_boot_view, "disable", 0, __L1))();
  }

  function method_gb_ie_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.get_ie"];
    let __t0: any;

    return (__L0 ?? runtime.memberCall(members.m_maincpu, "get_ie", 0, undefined))();
  }

  function method_gb_ie_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_ie"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_ie", 0, undefined))(data);
  }

  function method_boot_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bios_hack.read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_region_boot = members.m_region_boot ?? runtime.member("m_region_boot");
    if ((__L0 ?? runtime.memberCall(members.m_bios_hack, "read", 0, __L1))()) {
      if (((((((offset) === (233)) ? 1 : 0)) || ((((offset) === (234)) ? 1 : 0))) ? 1 : 0)) {
        return 0;
      }
      if (((((((offset) === (250)) ? 1 : 0)) || ((((offset) === (251)) ? 1 : 0))) ? 1 : 0)) {
        return 0;
      }
    }
    return runtime.readIndex(h_m_region_boot, offset);
  }

  function method_gb_timer_callback(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let old_gb_divcount: any = (((members.m_divcount ?? runtime.member("m_divcount"))) & 0xffff);
    let old_internal_serial_clock: any = (((members.m_internal_serial_clock ?? runtime.member("m_internal_serial_clock"))) & 0xffff);
    members.m_divcount = ((((members.m_divcount) + (data))) & 0xffff);
    members.m_internal_serial_clock = ((((members.m_internal_serial_clock) + (data))) & 0xffff);
    if (((Number(((old_gb_divcount) >>> (8))) !== Number(runtime.shiftRight((members.m_divcount ?? runtime.member("m_divcount")), 8))) ? 1 : 0)) {
    }
    (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
    if (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) {
      let old_count: any = ((((old_gb_divcount) >>> ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
      let new_count: any = ((runtime.shiftRight((members.m_divcount ?? runtime.member("m_divcount")), (members.m_shift ?? runtime.member("m_shift")))) & 0xffff);
      if (((Number(data) > Number((members.m_shift_cycles ?? runtime.member("m_shift_cycles")))) ? 1 : 0)) {
        (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
        old_count = ((((old_count) + (1))) & 0xffff);
      }
      if ((((new_count) !== (old_count)) ? 1 : 0)) {
        (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
        if (((Number(((new_count) << ((members.m_shift ?? runtime.member("m_shift"))))) < Number((members.m_divcount ?? runtime.member("m_divcount")))) ? 1 : 0)) {
          (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
        }
      }
    }
    if (((((((((members.m_internal_serial_clock ?? runtime.member("m_internal_serial_clock"))) ^ (old_internal_serial_clock))) & ((members.m_internal_serial_frequency ?? runtime.member("m_internal_serial_frequency"))))) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 2)) & (1)))) ? 1 : 0)) {
      (runtime.overrides["gb_serial_timer_tick"] ? runtime.overrides["gb_serial_timer_tick"]() : method_gb_serial_timer_tick(runtime));
    }
  }

  function method_gb_serial_timer_tick(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"], __L1: any = __l["m_maincpu.execute_set_input"];

    if (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 2)) & (128))) {
      if ((((members.m_sio_count ?? runtime.member("m_sio_count"))) & (1))) {
        runtime.writeIndex(runtime.writableMember("m_gb_io"), 1, ((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 1)) << (1))) | (1)));
      }
      members.m_sio_count = ((((members.m_sio_count) - (1))) >>> 0);
      0;
      if (((Number((members.m_sio_count ?? runtime.member("m_sio_count"))) === Number(0)) ? 1 : 0)) {
        runtime.writeIndex(runtime.writableMember("m_gb_io"), 2, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 2)) & (-129)));
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(3, 1);
        (__L1 ?? runtime.memberCall(members.m_maincpu, "execute_set_input", 0, undefined))(3, 1);
      }
    }
  }

  function method_gb_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["palette.set_pen_color"], __L1: any = __l["set_pen_color"];

    for (let i: any = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L0 ?? runtime.memberCall(palette, "set_pen_color", 0, __L1))(i, (__mame_table_1[((i) & 7)] ?? 0));
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "gb_io_r": method_gb_io_r,
    "gb_io_w": method_gb_io_w,
    "gb_timer_increment": method_gb_timer_increment,
    "gb_timer_check_irq": method_gb_timer_check_irq,
    "gb_io2_w": method_gb_io2_w,
    "disable_boot": method_disable_boot,
    "gb_ie_r": method_gb_ie_r,
    "gb_ie_w": method_gb_ie_w,
    "boot_r": method_boot_r,
    "gb_timer_callback": method_gb_timer_callback,
    "gb_serial_timer_tick": method_gb_serial_timer_tick,
    "gb_palette": method_gb_palette
  };
  return __methodTable;
})();
    return {
      "gb_state.gb_io_r": methods["gb_io_r"],
      "gb_state.gb_io_w": methods["gb_io_w"],
      "gb_state.gb_io2_w": methods["gb_io2_w"],
      "gb_state.disable_boot": methods["disable_boot"],
      "gb_state.gb_ie_r": methods["gb_ie_r"],
      "gb_state.gb_ie_w": methods["gb_ie_w"],
      "gb_state.boot_r": methods["boot_r"],
      "gb_state.gb_timer_callback": methods["gb_timer_callback"],
      "gb_state.gb_palette": methods["gb_palette"],
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
  const __mame_table_0 = [10, 4, 6, 8];

  function method_gb_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ppu.update_state"], __L1: any = __l["m_maincpu.get_if"];
    let __t0: any, __t1: any;

    switch ((offset as number)) {
      case 4:
      {
        0;
        return ((runtime.shiftRight((members.m_divcount ?? runtime.member("m_divcount")), 8)) & (255));
      }
      case 0:
      case 1:
      case 2:
      case 3:
      case 5:
      case 6:
      case 7:
      {
        return runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), offset);
      }
      case 15:
      {
        (__L0 ?? runtime.memberCall(members.m_ppu, "update_state", 0, undefined))();
        0;
        0;
        return ((224) | ((__L1 ?? runtime.memberCall(members.m_maincpu, "get_if", 0, undefined))()));
      }
      default:
      {
        return 255;
      }
    }
  }

  function method_gb_io_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_inputs.read"], __L1: any = __l["read"], __L2: any = __l["m_ppu.update_state"], __L3: any = __l["m_maincpu.set_if"];
    let __t0: any, __t1: any, __t2: any;

    data = ((data) & 0xff);
    switch ((offset as number)) {
      case 0:
      {
        runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((207) | (data)));
        if (((((data) & (32))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & (((runtime.shiftRight((__L0 ?? runtime.memberCall(members.m_inputs, "read", 0, __L1))(), 4)) | (240)))));
        }
        if (((((data) & (16))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & ((((__L0 ?? runtime.memberCall(members.m_inputs, "read", 0, __L1))()) | (240)))));
        }
        return;
      }
      case 1:
      {
        break;
      }
      case 2:
      {
        switch ((((data) & (129)) as number)) {
          case 0:
          case 1:
          {
            members.m_sio_count = ((0) >>> 0);
            break;
          }
          case 128:
          {
            members.m_sio_count = ((16) >>> 0);
            break;
          }
          case 129:
          {
            members.m_sio_count = ((16) >>> 0);
            break;
          }
        }
        0;
        data = ((((data) | (126))) & 0xff);
        break;
      }
      case 3:
      {
        return;
      }
      case 4:
      {
        if (((runtime.shiftRight((members.m_divcount ?? runtime.member("m_divcount")), (((members.m_shift ?? runtime.member("m_shift"))) - (1)))) & (1))) {
          (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
        }
        0;
        members.m_divcount = ((0) & 0xffff);
        return;
      }
      case 5:
      {
        if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          data = ((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6)) & 0xff);
        }
        break;
      }
      case 6:
      {
        if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, data);
        }
        break;
      }
      case 7:
      {
        data = ((((data) | (248))) & 0xff);
        if (((((((((((data) & (4))) ? 0 : 1)) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) || (((((((((data) & (4))) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) && (((Number(((data) & (3))) !== Number(((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (3)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          if (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) >= Number(runtime.shiftRight((members.m_shift_cycles ?? runtime.member("m_shift_cycles")), 1))) ? 1 : 0)) {
            (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
          }
        }
        members.m_shift = (((__mame_table_0[(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
        members.m_shift_cycles = ((((1) << ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
        break;
      }
      case 15:
      {
        (__L2 ?? runtime.memberCall(members.m_ppu, "update_state", 0, undefined))();
        0;
        data = ((((data) & (31))) & 0xff);
        (__L3 ?? runtime.memberCall(members.m_maincpu, "set_if", 0, undefined))(data);
        break;
      }
    }
    runtime.writeIndex(runtime.writableMember("m_gb_io"), offset, data);
  }

  function method_gb_timer_increment(runtime: any): any {
    const members = runtime.members;

    (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
    0;
    runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 5)) + (1)));
    if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
      members.m_triggering_irq = ((1) & 0xff);
    }
  }

  function method_gb_timer_check_irq(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"], __L1: any = __l["m_maincpu.execute_set_input"];

    members.m_reloading = ((0) & 0xff);
    if ((members.m_triggering_irq ?? runtime.member("m_triggering_irq"))) {
      members.m_triggering_irq = ((0) & 0xff);
      if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
        runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6));
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(2, 1);
        (__L1 ?? runtime.memberCall(members.m_maincpu, "execute_set_input", 0, undefined))(2, 1);
        members.m_reloading = ((1) & 0xff);
      }
    }
  }

  function method_gb_io2_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ppu.video_w"];

    data = ((data) & 0xff);
    if ((((offset) === (16)) ? 1 : 0)) {
      (runtime.overrides["disable_boot"] ? runtime.overrides["disable_boot"]() : method_disable_boot(runtime));
    } else {
      (__L0 ?? runtime.memberCall(members.m_ppu, "video_w", 0, undefined))(offset, data);
    }
  }

  function method_disable_boot(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_boot_view.disable"], __L1: any = __l["disable"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_boot_view, "disable", 0, __L1))();
  }

  function method_gb_ie_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.get_ie"];
    let __t0: any;

    return (__L0 ?? runtime.memberCall(members.m_maincpu, "get_ie", 0, undefined))();
  }

  function method_boot_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bios_hack.read"], __L1: any = __l["read"];
    let __t0: any;

    const h_m_region_boot = members.m_region_boot ?? runtime.member("m_region_boot");
    if ((__L0 ?? runtime.memberCall(members.m_bios_hack, "read", 0, __L1))()) {
      if (((((((offset) === (233)) ? 1 : 0)) || ((((offset) === (234)) ? 1 : 0))) ? 1 : 0)) {
        return 0;
      }
      if (((((((offset) === (250)) ? 1 : 0)) || ((((offset) === (251)) ? 1 : 0))) ? 1 : 0)) {
        return 0;
      }
    }
    return runtime.readIndex(h_m_region_boot, offset);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "gb_io_r": method_gb_io_r,
    "gb_io_w": method_gb_io_w,
    "gb_timer_increment": method_gb_timer_increment,
    "gb_timer_check_irq": method_gb_timer_check_irq,
    "gb_io2_w": method_gb_io2_w,
    "disable_boot": method_disable_boot,
    "gb_ie_r": method_gb_ie_r,
    "boot_r": method_boot_r
  };
  return __methodTable;
})();
    return {
      "base_state.gb_timer_increment": methods["gb_timer_increment"],
      "base_state.gb_timer_check_irq": methods["gb_timer_check_irq"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["disable","m_bios_hack.read","m_boot_view.disable","m_inputs.read","m_maincpu.execute_set_input","m_maincpu.get_ie","m_maincpu.get_if","m_maincpu.set_ie","m_maincpu.set_if","m_maincpu.set_input_line","m_ppu.update_state","m_ppu.video_w","palette.set_pen_color","read","set_pen_color"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
