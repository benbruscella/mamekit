// GENERATED executable machine composition from src/mame/atari/asteroid.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'asteroid');

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


  function method_asteroid_IN0_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    let res: any = (((__t0 = __deref_asteroid_IN0_r(runtime, (__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0")), "read"))) | 0);
    let bitmask: any = ((((1) << (offset))) | 0);
    if (((res) & (bitmask))) {
      res = ((128) | 0);
    } else {
      res = ((-129) | 0);
    }
    return res;
  }
  function __deref_asteroid_IN0_r(runtime: any, p: any): any {
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

  function method_asteroid_IN1_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    let res: any = (((__t0 = __deref_asteroid_IN1_r(runtime, (__L0 ? __L0("IN1") : runtime.macro("ioport", "IN1"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("IN1") : runtime.macro("ioport", "IN1")), "read"))) | 0);
    let bitmask: any = ((((1) << (((offset) & (7))))) | 0);
    if (((res) & (bitmask))) {
      res = ((128) | 0);
    } else {
      res = ((-129) | 0);
    }
    return res;
  }
  function __deref_asteroid_IN1_r(runtime: any, p: any): any {
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

  function method_asteroid_DSW1_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dsw1.read"], __L1: any = __l["read"], __L2: any = __l["m_dsw_sel.i3a_w"], __L3: any = __l["m_dsw_sel.i3b_w"], __L4: any = __l["m_dsw_sel.i2a_w"], __L5: any = __l["m_dsw_sel.i2b_w"], __L6: any = __l["m_dsw_sel.i1a_w"], __L7: any = __l["m_dsw_sel.i1b_w"], __L8: any = __l["m_dsw_sel.i0a_w"], __L9: any = __l["m_dsw_sel.i0b_w"], __L10: any = __l["m_dsw_sel.s_w"], __L11: any = __l["m_dsw_sel.zb_r"], __L12: any = __l["m_dsw_sel.za_r"];
    let __t0: any, __t1: any, __t2: any;

    let val: any = (((__L0 ?? runtime.memberCall(members.m_dsw1, "read", 0, __L1))()) & 0xff);
    (__L2 ?? runtime.memberCall(members.m_dsw_sel, "i3a_w", 0, undefined))((((val) >>> (0)) & 1));
    (__L3 ?? runtime.memberCall(members.m_dsw_sel, "i3b_w", 0, undefined))((((val) >>> (1)) & 1));
    (__L4 ?? runtime.memberCall(members.m_dsw_sel, "i2a_w", 0, undefined))((((val) >>> (2)) & 1));
    (__L5 ?? runtime.memberCall(members.m_dsw_sel, "i2b_w", 0, undefined))((((val) >>> (3)) & 1));
    (__L6 ?? runtime.memberCall(members.m_dsw_sel, "i1a_w", 0, undefined))((((val) >>> (4)) & 1));
    (__L7 ?? runtime.memberCall(members.m_dsw_sel, "i1b_w", 0, undefined))((((val) >>> (5)) & 1));
    (__L8 ?? runtime.memberCall(members.m_dsw_sel, "i0a_w", 0, undefined))((((val) >>> (6)) & 1));
    (__L9 ?? runtime.memberCall(members.m_dsw_sel, "i0b_w", 0, undefined))((((val) >>> (7)) & 1));
    (__L10 ?? runtime.memberCall(members.m_dsw_sel, "s_w", 0, undefined))(((offset) & (3)));
    return ((((252) | ((((__L11 ?? runtime.memberCall(members.m_dsw_sel, "zb_r", 0, undefined))()) << (1))))) | ((__L12 ?? runtime.memberCall(members.m_dsw_sel, "za_r", 0, undefined))()));
  }

  function method_asteroid_explode_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_discrete.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741904, runtime.shiftRight(((data) & (60)), 2));
    switch ((((data) & (192)) as number)) {
      case 0:
      {
        data = ((12) & 0xff);
        break;
      }
      case 64:
      {
        data = ((6) & 0xff);
        break;
      }
      case 128:
      {
        data = ((3) & 0xff);
        break;
      }
      case 192:
      {
        data = ((5) & 0xff);
        break;
      }
    }
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741912, data);
  }

  function method_asteroid_thump_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_discrete.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741888, ((data) & (16)));
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741896, ((data) & (15)));
  }

  function method_asteroid_noise_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_discrete.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_discrete, "write", 0, undefined))(1073741880, 0);
  }

  function method_asteroid_interrupt(runtime: any, device: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"], __L1: any = __l["device.execute"], __L2: any = __l["execute"];
    let __t0: any, __t1: any;

    if ((((((__t0 = __deref_asteroid_interrupt(runtime, (__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("IN0") : runtime.macro("ioport", "IN0")), "read"))) & (128))) ? 0 : 1)) {
      runtime.memberCall((__L1 ?? runtime.memberCall(device, "execute", 0, __L2))(), "pulse_input_line", 0, undefined)(-1, 0);
    }
  }
  function __deref_asteroid_interrupt(runtime: any, p: any): any {
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

  function method_cocktail_inv_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_cocktail.read"], __L1: any = __l["read"], __L2: any = __l["m_dvg.set_flip_x"], __L3: any = __l["m_dvg.set_flip_y"];
    let __t0: any;

    let flip: any = (((((state) && ((__L0 ?? runtime.memberCall(members.m_cocktail, "read", 0, __L1))())) ? 1 : 0)) | 0);
    (__L2 ?? runtime.memberCall(members.m_dvg, "set_flip_x", 0, undefined))(flip);
    (__L3 ?? runtime.memberCall(members.m_dvg, "set_flip_y", 0, undefined))(flip);
  }

  function method_clock_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.total_cycles"];
    let __t0: any;

    return (((((__L0 ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))()) & (256))) ? (1) : (0));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "asteroid_IN0_r": method_asteroid_IN0_r,
    "asteroid_IN1_r": method_asteroid_IN1_r,
    "asteroid_DSW1_r": method_asteroid_DSW1_r,
    "asteroid_explode_w": method_asteroid_explode_w,
    "asteroid_thump_w": method_asteroid_thump_w,
    "asteroid_noise_reset_w": method_asteroid_noise_reset_w,
    "asteroid_interrupt": method_asteroid_interrupt,
    "cocktail_inv_w": method_cocktail_inv_w,
    "clock_r": method_clock_r
  };
  return __methodTable;
})();
    return {
      "asteroid_state.asteroid_IN0_r": methods["asteroid_IN0_r"],
      "asteroid_state.asteroid_IN1_r": methods["asteroid_IN1_r"],
      "asteroid_state.asteroid_DSW1_r": methods["asteroid_DSW1_r"],
      "asteroid_state.asteroid_explode_w": methods["asteroid_explode_w"],
      "asteroid_state.asteroid_thump_w": methods["asteroid_thump_w"],
      "asteroid_state.asteroid_noise_reset_w": methods["asteroid_noise_reset_w"],
      "asteroid_state.asteroid_interrupt": methods["asteroid_interrupt"],
      "asteroid_state.cocktail_inv_w": methods["cocktail_inv_w"],
      "asteroid_state.clock_r": methods["clock_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["device.execute","execute","ioport","m_cocktail.read","m_discrete.write","m_dsw1.read","m_dsw_sel.i0a_w","m_dsw_sel.i0b_w","m_dsw_sel.i1a_w","m_dsw_sel.i1b_w","m_dsw_sel.i2a_w","m_dsw_sel.i2b_w","m_dsw_sel.i3a_w","m_dsw_sel.i3b_w","m_dsw_sel.s_w","m_dsw_sel.za_r","m_dsw_sel.zb_r","m_dvg.set_flip_x","m_dvg.set_flip_y","m_maincpu.total_cycles","read"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
