// GENERATED executable machine composition from src/mame/sega/segas16a.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'shinobi');

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


  function method_standard_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_i8255.read"], __L1: any = __l["ioport"];
    let __t0: any, __t1: any;

    offset = ((offset) & (runtime.divide(16383, 2)));
    switch ((((offset) & (runtime.divide(12288, 2))) as number)) {
      case runtime.divide(0, 2):
      {
        return (__L0 ?? runtime.memberCall(members.m_i8255, "read", 0, undefined))(((offset) & (3)));
      }
      case runtime.divide(4096, 2):
      {
        let sysports: any = ["SERVICE", "P1", "UNUSED", "P2"];
        return (__t0 = __deref_standard_io_r(runtime, (__L1 ? __L1((sysports[((offset) & (3))] ?? 0)) : runtime.macro("ioport", (sysports[((offset) & (3))] ?? 0)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L1 ? __L1((sysports[((offset) & (3))] ?? 0)) : runtime.macro("ioport", (sysports[((offset) & (3))] ?? 0))), "read"));
      }
      case runtime.divide(8192, 2):
      {
        return (__t1 = __deref_standard_io_r(runtime, (__L1 ? __L1(((((offset) & (1))) ? ("DSW2") : ("DSW1"))) : runtime.macro("ioport", ((((offset) & (1))) ? ("DSW2") : ("DSW1"))))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L1 ? __L1(((((offset) & (1))) ? ("DSW2") : ("DSW1"))) : runtime.macro("ioport", ((((offset) & (1))) ? ("DSW2") : ("DSW1")))), "read"));
      }
    }
    return 65535;
  }
  function __deref_standard_io_r(runtime: any, p: any): any {
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

  function method_standard_io_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    offset = ((offset) & (runtime.divide(16383, 2)));
    switch ((((offset) & (runtime.divide(12288, 2))) as number)) {
      case runtime.divide(0, 2):
      {
        if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
          runtime.synchronize("ppi_sync", ((((((offset) & (3))) << (8))) | (((data) & (255)))));
        }
        return;
      }
    }
  }

  function method_tileram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_tileram ?? runtime.member("m_tileram")), offset);
  }

  function method_textram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_textram ?? runtime.member("m_textram")), offset);
  }

  function method_misc_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_custom_io_r"];

    return (__L0 ? __L0(offset) : runtime.macro("m_custom_io_r", offset));
  }

  function method_misc_io_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_custom_io_w"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    (__L0 ? __L0(offset, data, mem_mask) : runtime.macro("m_custom_io_w", offset, data, mem_mask));
  }

  function method_sound_data_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_i8255.pc6_w"], __L1: any = __l["m_soundlatch.read"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_i8255, "pc6_w", 0, undefined))(0);
    return (__L1 ?? runtime.memberCall(members.m_soundlatch, "read", 0, undefined))();
  }

  function method_upd7751_command_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"];

    data = ((data) & 0xff);
    let numroms: any = ((runtime.divide(runtime.container((__L0 ? __L0("upd7751data") : runtime.macro("memregion", "upd7751data")), "bytes"), 32768)) | 0);
    members.m_upd7751_rom_address = ((((members.m_upd7751_rom_address) & (16383))) >>> 0);
    members.m_upd7751_rom_address = ((((members.m_upd7751_rom_address) | (((((data) & (1))) << (14))))) >>> 0);
    if ((((((((data) & (2))) ? 0 : 1)) && ((((numroms) >= (1)) ? 1 : 0))) ? 1 : 0)) {
      members.m_upd7751_rom_address = ((((members.m_upd7751_rom_address) | (0))) >>> 0);
    }
    if ((((((((data) & (4))) ? 0 : 1)) && ((((numroms) >= (2)) ? 1 : 0))) ? 1 : 0)) {
      members.m_upd7751_rom_address = ((((members.m_upd7751_rom_address) | (32768))) >>> 0);
    }
    if ((((((((data) & (8))) ? 0 : 1)) && ((((numroms) >= (3)) ? 1 : 0))) ? 1 : 0)) {
      members.m_upd7751_rom_address = ((((members.m_upd7751_rom_address) | (65536))) >>> 0);
    }
    if ((((((((data) & (16))) ? 0 : 1)) && ((((numroms) >= (4)) ? 1 : 0))) ? 1 : 0)) {
      members.m_upd7751_rom_address = ((((members.m_upd7751_rom_address) | (98304))) >>> 0);
    }
    members.m_upd7751_command = ((((data) >>> (5))) & 0xff);
  }

  function method_palette_init(runtime: any): any {
    const members = runtime.members;

    let resistances_normal: any = new Int32Array([3900, 2000, 1000, runtime.divide(1000, 2), runtime.divide(1000, 4), 0]);
    let weights_normal: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](6) : new Uint8Array(Math.max(0, Number(6)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 6, resistances_normal, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 6, resistances_normal, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let resistances_sh: any = new Int32Array([3900, 2000, 1000, runtime.divide(1000, 2), runtime.divide(1000, 4), 470]);
    let weights_sh: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](6) : new Uint8Array(Math.max(0, Number(6)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 6, resistances_sh, weights_sh, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 6, resistances_sh, weights_sh, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    for (let value: any = ((0) | 0); (((value) < (32)) ? 1 : 0); value = ((((value) + (1))) | 0)) {
      let i4: any = ((((runtime.shiftRight(value, 4)) & (1))) & 0xff);
      let i3: any = ((((runtime.shiftRight(value, 3)) & (1))) & 0xff);
      let i2: any = ((((runtime.shiftRight(value, 2)) & (1))) & 0xff);
      let i1: any = ((((runtime.shiftRight(value, 1)) & (1))) & 0xff);
      let i0: any = ((((runtime.shiftRight(value, 0)) & (1))) & 0xff);
      runtime.writeIndex(runtime.writableMember("m_palette_normal"), value, (runtime.overrides["combine_weights__int__6"] ? runtime.overrides["combine_weights__int__6"](weights_normal, i0, i1, i2, i3, i4, 0) : method_combine_weights__int__6(runtime, weights_normal, i0, i1, i2, i3, i4, 0)));
      runtime.writeIndex(runtime.writableMember("m_palette_shadow"), value, (runtime.overrides["combine_weights__int__6"] ? runtime.overrides["combine_weights__int__6"](weights_sh, i0, i1, i2, i3, i4, 0) : method_combine_weights__int__6(runtime, weights_sh, i0, i1, i2, i3, i4, 0)));
      runtime.writeIndex(runtime.writableMember("m_palette_hilight"), value, (runtime.overrides["combine_weights__int__6"] ? runtime.overrides["combine_weights__int__6"](weights_sh, i0, i1, i2, i3, i4, 1) : method_combine_weights__int__6(runtime, weights_sh, i0, i1, i2, i3, i4, 1)));
    }
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

  function method_combine_weights__int__6(runtime: any, tab: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any, w_5: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__6(runtime, (runtime.overrides["emu_detail__combine_weights__0__5"] ? runtime.overrides["emu_detail__combine_weights__0__5"](tab, w_0, w_1, w_2, w_3, w_4, w_5) : method_emu_detail__combine_weights__0__5(runtime, tab, w_0, w_1, w_2, w_3, w_4, w_5)), 0.5)) | 0);
  }
  function __add_combine_weights__int__6(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__5(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__5(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__4"] ? runtime.overrides["emu_detail__combine_weights__1__4"](tab, w_0, w_1, w_2, w_3, w_4) : method_emu_detail__combine_weights__1__4(runtime, tab, w_0, w_1, w_2, w_3, w_4)));
  }
  function __add_emu_detail__combine_weights__0__5(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__4(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__4(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__3"] ? runtime.overrides["emu_detail__combine_weights__2__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__2__3(runtime, tab, w_0, w_1, w_2, w_3)));
  }
  function __add_emu_detail__combine_weights__1__4(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__3(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__2__3(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__2"] ? runtime.overrides["emu_detail__combine_weights__3__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__3__2(runtime, tab, w_0, w_1, w_2)));
  }
  function __add_emu_detail__combine_weights__2__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__3__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__3__2(runtime, ((runtime.readIndex(tab, 3)) * (w0)), (runtime.overrides["emu_detail__combine_weights__4__1"] ? runtime.overrides["emu_detail__combine_weights__4__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__4__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__3__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__4__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__4__1(runtime, ((runtime.readIndex(tab, 4)) * (w0)), (runtime.overrides["emu_detail__combine_weights__5__0"] ? runtime.overrides["emu_detail__combine_weights__5__0"](tab, w_0) : method_emu_detail__combine_weights__5__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__4__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__5__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 5)) * (w));
  }

  function method_upd7751_rom_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"];
    let __t0: any;

    return runtime.readIndex((__t0 = __deref_upd7751_rom_r(runtime, (__L0 ? __L0("upd7751data") : runtime.macro("memregion", "upd7751data"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("upd7751data") : runtime.macro("memregion", "upd7751data")), "base")), (members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address")));
  }
  function __deref_upd7751_rom_r(runtime: any, p: any): any {
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

  function method_upd7751_p2_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7751_i8243.p2_r"];
    let __t0: any;

    return ((((128) | ((((((members.m_upd7751_command ?? runtime.member("m_upd7751_command"))) & (7))) << (4))))) | ((((__L0 ?? runtime.memberCall(members.m_upd7751_i8243, "p2_r", 0, undefined))()) & (15))));
  }

  function method_upd7751_p2_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7751_i8243.p2_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_upd7751_i8243, "p2_w", 0, undefined))(((data) & (15)));
  }

  function method_upd7751_rom_offset_w_0(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let mask: any = ((15) | 0);
    let newdata: any = ((((((data) << (0))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_4(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let mask: any = ((240) | 0);
    let newdata: any = ((((((data) << (4))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_8(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let mask: any = ((3840) | 0);
    let newdata: any = ((((((data) << (8))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_upd7751_rom_offset_w_12(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let mask: any = ((12288) | 0);
    let newdata: any = ((((((data) << (12))) & (mask))) | 0);
    members.m_upd7751_rom_address = (((((((members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address"))) & ((~mask)))) | (newdata))) >>> 0);
  }

  function method_tilemap_sound_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_soundcpu.set_input_line"], __L1: any = __l["m_segaic16vid.tilemap_set_colscroll"], __L2: any = __l["m_segaic16vid.tilemap_set_rowscroll"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_soundcpu, "set_input_line", 0, undefined))(-1, ((((data) & (128))) ? (0) : (1)));
    (__L1 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_set_colscroll", 0, undefined))(0, (((~data)) & (4)));
    (__L2 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_set_rowscroll", 0, undefined))(0, (((~data)) & (2)));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.black_pen"], __L1: any = __l["bitmap.fill"], __L2: any = __l["fill"], __L3: any = __l["m_sprites.draw_async"], __L4: any = __l["screen.priority"], __L5: any = __l["priority"], __L6: any = __l["m_segaic16vid.tilemap_draw"], __L7: any = __l["m_sprites.bitmap"], __L8: any = __l["m_sprites.iterate_dirty_rects"];
    let __t0: any, __t1: any, __t2: any, __t3: any;

    const h_m_segaic16vid = members.m_segaic16vid ?? runtime.member("m_segaic16vid");
    if (((__deref_screen_update(runtime, h_m_segaic16vid).m_display_enable) ? 0 : 1)) {
      (__L1 ?? runtime.memberCall(bitmap, "fill", 0, __L2))((__L0 ?? runtime.memberCall(members.m_palette, "black_pen", 0, undefined))(), cliprect);
      return 0;
    }
    (__L3 ?? runtime.memberCall(members.m_sprites, "draw_async", 0, undefined))(cliprect);
    runtime.memberCall((__L4 ?? runtime.memberCall(screen, "priority", 0, __L5))(), "fill", 0, undefined)(0, cliprect);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 128, 0);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 129, 0);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 0, 1);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 1, 1, 2);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 0, 0, 2);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 0, 1, 4);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 2, 0, 4);
    (__L6 ?? runtime.memberCall(members.m_segaic16vid, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 2, 1, 8);
    let sprites: any = (__L7 ?? runtime.memberCall(members.m_sprites, "bitmap", 0, undefined))();
    (__L8 ?? runtime.memberCall(members.m_sprites, "iterate_dirty_rects", 0, undefined))(cliprect, ((rect: any) => {
      for (let y: any = ((rect.min_y) | 0); ((Number(y) <= Number(rect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        let dest: any = bitmap["pix&"](y);
        let src: any = sprites["pix&"](y);
        let pri: any = (__l["screen.priority"] ?? runtime.memberCall(screen, "priority", 0, __l["priority"]))()["pix&"](y);
        for (let x: any = ((rect.min_x) | 0); ((Number(x) <= Number(rect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
          let pix: any = ((runtime.readIndex(src, x)) & 0xffff);
          if ((((pix) !== (65535)) ? 1 : 0)) {
            let priority: any = ((((pix) >>> (10))) | 0);
            if (((Number(((1) << (priority))) > Number(runtime.readIndex(pri, x))) ? 1 : 0)) {
              if (((Number(((pix) & (1008))) === Number(1008)) ? 1 : 0)) {
                runtime.writeIndex(dest, x, ((runtime.readIndex(dest, x)) + ((members.m_palette_entries ?? runtime.member("m_palette_entries")))));
              } else {
                runtime.writeIndex(dest, x, ((1024) | (((pix) & (1023)))));
              }
            }
          }
        }
      }
    }));
    return 0;
  }
  function __deref_screen_update(runtime: any, p: any): any {
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

  function method_upd7751_control_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7751.set_input_line"], __L1: any = __l["attotime::from_usec"], __L2: any = __l["machine().scheduler().perfect_quantum"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_upd7751, "set_input_line", 0, undefined))(-2, ((((data) & (1))) ? (0) : (1)));
    (__L0 ?? runtime.memberCall(members.m_upd7751, "set_input_line", 0, undefined))(0, ((((data) & (2))) ? (0) : (1)));
    ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().scheduler().perfect_quantum"))?.((__L1 ? __L1(100) : runtime.macro("attotime::from_usec", 100))) ?? 0);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "standard_io_r": method_standard_io_r,
    "standard_io_w": method_standard_io_w,
    "tileram_r": method_tileram_r,
    "textram_r": method_textram_r,
    "misc_io_r": method_misc_io_r,
    "misc_io_w": method_misc_io_w,
    "sound_data_r": method_sound_data_r,
    "upd7751_command_w": method_upd7751_command_w,
    "palette_init": method_palette_init,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__6": method_combine_weights__int__6,
    "emu_detail__combine_weights__0__5": method_emu_detail__combine_weights__0__5,
    "emu_detail__combine_weights__1__4": method_emu_detail__combine_weights__1__4,
    "emu_detail__combine_weights__2__3": method_emu_detail__combine_weights__2__3,
    "emu_detail__combine_weights__3__2": method_emu_detail__combine_weights__3__2,
    "emu_detail__combine_weights__4__1": method_emu_detail__combine_weights__4__1,
    "emu_detail__combine_weights__5__0": method_emu_detail__combine_weights__5__0,
    "upd7751_rom_r": method_upd7751_rom_r,
    "upd7751_p2_r": method_upd7751_p2_r,
    "upd7751_p2_w": method_upd7751_p2_w,
    "upd7751_rom_offset_w_0": method_upd7751_rom_offset_w_0,
    "upd7751_rom_offset_w_4": method_upd7751_rom_offset_w_4,
    "upd7751_rom_offset_w_8": method_upd7751_rom_offset_w_8,
    "upd7751_rom_offset_w_12": method_upd7751_rom_offset_w_12,
    "tilemap_sound_w": method_tilemap_sound_w,
    "screen_update": method_screen_update,
    "upd7751_control_w": method_upd7751_control_w
  };
  return __methodTable;
})();
    return {
      "segas16a_state.standard_io_r": methods["standard_io_r"],
      "segas16a_state.standard_io_w": methods["standard_io_w"],
      "segas16a_state.misc_io_r": methods["misc_io_r"],
      "segas16a_state.misc_io_w": methods["misc_io_w"],
      "segas16a_state.sound_data_r": methods["sound_data_r"],
      "segas16a_state.upd7751_command_w": methods["upd7751_command_w"],
      "segas16a_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "segas16a_state.combine_weights__int__6": methods["combine_weights__int__6"],
      "segas16a_state.emu_detail__combine_weights__0__5": methods["emu_detail__combine_weights__0__5"],
      "segas16a_state.emu_detail__combine_weights__1__4": methods["emu_detail__combine_weights__1__4"],
      "segas16a_state.emu_detail__combine_weights__2__3": methods["emu_detail__combine_weights__2__3"],
      "segas16a_state.emu_detail__combine_weights__3__2": methods["emu_detail__combine_weights__3__2"],
      "segas16a_state.emu_detail__combine_weights__4__1": methods["emu_detail__combine_weights__4__1"],
      "segas16a_state.emu_detail__combine_weights__5__0": methods["emu_detail__combine_weights__5__0"],
      "segas16a_state.upd7751_rom_r": methods["upd7751_rom_r"],
      "segas16a_state.upd7751_p2_r": methods["upd7751_p2_r"],
      "segas16a_state.upd7751_p2_w": methods["upd7751_p2_w"],
      "segas16a_state.upd7751_rom_offset_w_0": methods["upd7751_rom_offset_w_0"],
      "segas16a_state.upd7751_rom_offset_w_4": methods["upd7751_rom_offset_w_4"],
      "segas16a_state.upd7751_rom_offset_w_8": methods["upd7751_rom_offset_w_8"],
      "segas16a_state.upd7751_rom_offset_w_12": methods["upd7751_rom_offset_w_12"],
      "segas16a_state.tilemap_sound_w": methods["tilemap_sound_w"],
      "segas16a_state.screen_update": methods["screen_update"],
      "segas16a_state.upd7751_control_w": methods["upd7751_control_w"],
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


  function method_standard_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_i8255.read"], __L1: any = __l["ioport"];
    let __t0: any, __t1: any;

    offset = ((offset) & (runtime.divide(16383, 2)));
    switch ((((offset) & (runtime.divide(12288, 2))) as number)) {
      case runtime.divide(0, 2):
      {
        return (__L0 ?? runtime.memberCall(members.m_i8255, "read", 0, undefined))(((offset) & (3)));
      }
      case runtime.divide(4096, 2):
      {
        let sysports: any = ["SERVICE", "P1", "UNUSED", "P2"];
        return (__t0 = __deref_standard_io_r(runtime, (__L1 ? __L1((sysports[((offset) & (3))] ?? 0)) : runtime.macro("ioport", (sysports[((offset) & (3))] ?? 0)))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L1 ? __L1((sysports[((offset) & (3))] ?? 0)) : runtime.macro("ioport", (sysports[((offset) & (3))] ?? 0))), "read"));
      }
      case runtime.divide(8192, 2):
      {
        return (__t1 = __deref_standard_io_r(runtime, (__L1 ? __L1(((((offset) & (1))) ? ("DSW2") : ("DSW1"))) : runtime.macro("ioport", ((((offset) & (1))) ? ("DSW2") : ("DSW1"))))), typeof __t1.read === 'function' ? (__t1.read() ?? 0) : runtime.container((__L1 ? __L1(((((offset) & (1))) ? ("DSW2") : ("DSW1"))) : runtime.macro("ioport", ((((offset) & (1))) ? ("DSW2") : ("DSW1")))), "read"));
      }
    }
    return 65535;
  }
  function __deref_standard_io_r(runtime: any, p: any): any {
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

  function method_standard_io_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    offset = ((offset) & (runtime.divide(16383, 2)));
    switch ((((offset) & (runtime.divide(12288, 2))) as number)) {
      case runtime.divide(0, 2):
      {
        if ((((mem_mask) & 0x00ff) ? 1 : 0)) {
          runtime.synchronize("ppi_sync", ((((((offset) & (3))) << (8))) | (((data) & (255)))));
        }
        return;
      }
    }
  }

  function method_tileram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_tileram ?? runtime.member("m_tileram")), offset);
  }

  function method_textram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_textram ?? runtime.member("m_textram")), offset);
  }

  function method_misc_io_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_custom_io_r"];

    return (__L0 ? __L0(offset) : runtime.macro("m_custom_io_r", offset));
  }

  function method_misc_io_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_custom_io_w"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    (__L0 ? __L0(offset, data, mem_mask) : runtime.macro("m_custom_io_w", offset, data, mem_mask));
  }

  function method_sound_data_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_i8255.pc6_w"], __L1: any = __l["m_soundlatch.read"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_i8255, "pc6_w", 0, undefined))(0);
    return (__L1 ?? runtime.memberCall(members.m_soundlatch, "read", 0, undefined))();
  }

  function method_palette_init(runtime: any): any {
    const members = runtime.members;

    let resistances_normal: any = new Int32Array([3900, 2000, 1000, runtime.divide(1000, 2), runtime.divide(1000, 4), 0]);
    let weights_normal: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](6) : new Uint8Array(Math.max(0, Number(6)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 6, resistances_normal, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 6, resistances_normal, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let resistances_sh: any = new Int32Array([3900, 2000, 1000, runtime.divide(1000, 2), runtime.divide(1000, 4), 470]);
    let weights_sh: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](6) : new Uint8Array(Math.max(0, Number(6)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 6, resistances_sh, weights_sh, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 6, resistances_sh, weights_sh, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    for (let value: any = ((0) | 0); (((value) < (32)) ? 1 : 0); value = ((((value) + (1))) | 0)) {
      let i4: any = ((((runtime.shiftRight(value, 4)) & (1))) & 0xff);
      let i3: any = ((((runtime.shiftRight(value, 3)) & (1))) & 0xff);
      let i2: any = ((((runtime.shiftRight(value, 2)) & (1))) & 0xff);
      let i1: any = ((((runtime.shiftRight(value, 1)) & (1))) & 0xff);
      let i0: any = ((((runtime.shiftRight(value, 0)) & (1))) & 0xff);
      runtime.writeIndex(runtime.writableMember("m_palette_normal"), value, (runtime.overrides["combine_weights__int__6"] ? runtime.overrides["combine_weights__int__6"](weights_normal, i0, i1, i2, i3, i4, 0) : method_combine_weights__int__6(runtime, weights_normal, i0, i1, i2, i3, i4, 0)));
      runtime.writeIndex(runtime.writableMember("m_palette_shadow"), value, (runtime.overrides["combine_weights__int__6"] ? runtime.overrides["combine_weights__int__6"](weights_sh, i0, i1, i2, i3, i4, 0) : method_combine_weights__int__6(runtime, weights_sh, i0, i1, i2, i3, i4, 0)));
      runtime.writeIndex(runtime.writableMember("m_palette_hilight"), value, (runtime.overrides["combine_weights__int__6"] ? runtime.overrides["combine_weights__int__6"](weights_sh, i0, i1, i2, i3, i4, 1) : method_combine_weights__int__6(runtime, weights_sh, i0, i1, i2, i3, i4, 1)));
    }
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

  function method_combine_weights__int__6(runtime: any, tab: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any, w_5: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__6(runtime, (runtime.overrides["emu_detail__combine_weights__0__5"] ? runtime.overrides["emu_detail__combine_weights__0__5"](tab, w_0, w_1, w_2, w_3, w_4, w_5) : method_emu_detail__combine_weights__0__5(runtime, tab, w_0, w_1, w_2, w_3, w_4, w_5)), 0.5)) | 0);
  }
  function __add_combine_weights__int__6(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__5(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__5(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__4"] ? runtime.overrides["emu_detail__combine_weights__1__4"](tab, w_0, w_1, w_2, w_3, w_4) : method_emu_detail__combine_weights__1__4(runtime, tab, w_0, w_1, w_2, w_3, w_4)));
  }
  function __add_emu_detail__combine_weights__0__5(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__4(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__4(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__3"] ? runtime.overrides["emu_detail__combine_weights__2__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__2__3(runtime, tab, w_0, w_1, w_2, w_3)));
  }
  function __add_emu_detail__combine_weights__1__4(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__3(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__2__3(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__2"] ? runtime.overrides["emu_detail__combine_weights__3__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__3__2(runtime, tab, w_0, w_1, w_2)));
  }
  function __add_emu_detail__combine_weights__2__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__3__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__3__2(runtime, ((runtime.readIndex(tab, 3)) * (w0)), (runtime.overrides["emu_detail__combine_weights__4__1"] ? runtime.overrides["emu_detail__combine_weights__4__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__4__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__3__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__4__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__4__1(runtime, ((runtime.readIndex(tab, 4)) * (w0)), (runtime.overrides["emu_detail__combine_weights__5__0"] ? runtime.overrides["emu_detail__combine_weights__5__0"](tab, w_0) : method_emu_detail__combine_weights__5__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__4__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__5__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 5)) * (w));
  }

  function method_upd7751_rom_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"];
    let __t0: any;

    return runtime.readIndex((__t0 = __deref_upd7751_rom_r(runtime, (__L0 ? __L0("upd7751data") : runtime.macro("memregion", "upd7751data"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("upd7751data") : runtime.macro("memregion", "upd7751data")), "base")), (members.m_upd7751_rom_address ?? runtime.member("m_upd7751_rom_address")));
  }
  function __deref_upd7751_rom_r(runtime: any, p: any): any {
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

  function method_upd7751_p2_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7751_i8243.p2_r"];
    let __t0: any;

    return ((((128) | ((((((members.m_upd7751_command ?? runtime.member("m_upd7751_command"))) & (7))) << (4))))) | ((((__L0 ?? runtime.memberCall(members.m_upd7751_i8243, "p2_r", 0, undefined))()) & (15))));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "standard_io_r": method_standard_io_r,
    "standard_io_w": method_standard_io_w,
    "tileram_r": method_tileram_r,
    "textram_r": method_textram_r,
    "misc_io_r": method_misc_io_r,
    "misc_io_w": method_misc_io_w,
    "sound_data_r": method_sound_data_r,
    "palette_init": method_palette_init,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__6": method_combine_weights__int__6,
    "emu_detail__combine_weights__0__5": method_emu_detail__combine_weights__0__5,
    "emu_detail__combine_weights__1__4": method_emu_detail__combine_weights__1__4,
    "emu_detail__combine_weights__2__3": method_emu_detail__combine_weights__2__3,
    "emu_detail__combine_weights__3__2": method_emu_detail__combine_weights__3__2,
    "emu_detail__combine_weights__4__1": method_emu_detail__combine_weights__4__1,
    "emu_detail__combine_weights__5__0": method_emu_detail__combine_weights__5__0,
    "upd7751_rom_r": method_upd7751_rom_r,
    "upd7751_p2_r": method_upd7751_p2_r
  };
  return __methodTable;
})();
    return {
      "sega_16bit_common_base.palette_init": methods["palette_init"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["attotime::from_usec","bitmap.fill","fatalerror","fill","ioport","m_custom_io_r","m_custom_io_w","m_i8255.pc6_w","m_i8255.read","m_palette.black_pen","m_segaic16vid.tilemap_draw","m_segaic16vid.tilemap_set_colscroll","m_segaic16vid.tilemap_set_rowscroll","m_soundcpu.set_input_line","m_soundlatch.read","m_sprites.bitmap","m_sprites.draw_async","m_sprites.iterate_dirty_rects","m_upd7751.set_input_line","m_upd7751_i8243.p2_r","m_upd7751_i8243.p2_w","machine().scheduler().perfect_quantum","memregion","priority","screen.priority","std::clamp"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
