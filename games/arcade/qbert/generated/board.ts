// GENERATED executable machine composition from src/mame/gottlieb/gottlieb.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'qbert');

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


  function method_qbert_output_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("general_output_w", ((data) & (-33)));
    (runtime.overrides["qbert_knocker"] ? runtime.overrides["qbert_knocker"]((((data) >>> (5)) & 1)) : method_qbert_knocker(runtime, (((data) >>> (5)) & 1)));
  }

  function method_video_control_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["flip_screen_x_set"], __L3: any = __l["flip_screen_y_set"];
    let __t0: any;

    data = ((data) & 0xff);
    if (((Number((members.m_background_priority ?? runtime.member("m_background_priority"))) !== Number((((data) >>> (0)) & 1))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))());
    }
    members.m_background_priority = (((((data) >>> (0)) & 1)) & 0xff);
    (__L2 ? __L2((((data) >>> (1)) & 1)) : runtime.macro("flip_screen_x_set", (((data) >>> (1)) & 1)));
    (__L3 ? __L3((((data) >>> (2)) & 1)) : runtime.macro("flip_screen_y_set", (((data) >>> (2)) & 1)));
  }

  function method_qbert_knocker(runtime: any, knock: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_knocker_sample.start"];

    knock = ((knock) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_knockers"), 0, ((knock) ? (1) : (0)));
    if (((knock) & ((~(members.m_knocker_prev ?? runtime.member("m_knocker_prev")))))) {
      (__L0 ?? runtime.memberCall(members.m_knocker_sample, "start", 0, undefined))(0, 0);
    }
    members.m_knocker_prev = ((knock) & 0xff);
  }

  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_charram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"];

    data = ((data) & 0xff);
    if (((Number(runtime.readIndex((members.m_charram ?? runtime.member("m_charram")), offset)) !== Number(data)) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_charram"), offset, data);
      runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "mark_dirty", 0, undefined)(runtime.divide(offset, 32));
    }
  }

  function method_palette_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t"], __L1: any = __l["m_palette.set_pen_color"];

    data = ((data) & 0xff);
    const h_m_weights = members.m_weights ?? runtime.member("m_weights");
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let val: any = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) & (-2)))) | 0);
    let g: any = (((runtime.overrides["combine_weights__int__4"] ? runtime.overrides["combine_weights__int__4"](h_m_weights, (((val) >>> (4)) & 1), (((val) >>> (5)) & 1), (((val) >>> (6)) & 1), (((val) >>> (7)) & 1)) : method_combine_weights__int__4(runtime, h_m_weights, (((val) >>> (4)) & 1), (((val) >>> (5)) & 1), (((val) >>> (6)) & 1), (((val) >>> (7)) & 1)))) | 0);
    let b: any = (((runtime.overrides["combine_weights__int__4"] ? runtime.overrides["combine_weights__int__4"](h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)) : method_combine_weights__int__4(runtime, h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)))) | 0);
    val = ((runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (1)))) | 0);
    let r: any = (((runtime.overrides["combine_weights__int__4"] ? runtime.overrides["combine_weights__int__4"](h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)) : method_combine_weights__int__4(runtime, h_m_weights, (((val) >>> (0)) & 1), (((val) >>> (1)) & 1), (((val) >>> (2)) & 1), (((val) >>> (3)) & 1)))) | 0);
    let a: any = ((((((((members.m_transparent0 ?? runtime.member("m_transparent0"))) && (((Number(runtime.divide(offset, 2)) === Number(0)) ? 1 : 0))) ? 1 : 0)) ? (0) : (255))) | 0);
    (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(runtime.divide(offset, 2), (__L0 ? __L0(a, r, g, b) : runtime.macro("rgb_t", a, r, g, b)));
  }

  function method_combine_weights__int__4(runtime: any, tab: any, w_0: any, w_1: any, w_2: any, w_3: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__4(runtime, (runtime.overrides["emu_detail__combine_weights__0__3"] ? runtime.overrides["emu_detail__combine_weights__0__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__0__3(runtime, tab, w_0, w_1, w_2, w_3)), 0.5)) | 0);
  }
  function __add_combine_weights__int__4(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__3(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__3(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__2"] ? runtime.overrides["emu_detail__combine_weights__1__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__1__2(runtime, tab, w_0, w_1, w_2)));
  }
  function __add_emu_detail__combine_weights__0__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__2(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__1"] ? runtime.overrides["emu_detail__combine_weights__2__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__2__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__1__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__2__1(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__0"] ? runtime.overrides["emu_detail__combine_weights__3__0"](tab, w_0) : method_emu_detail__combine_weights__3__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__2__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__3__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 3)) * (w));
  }

  function method_analog_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_track_x.read_safe"], __L1: any = __l["read_safe"], __L2: any = __l["m_track_y.read_safe"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_track"), 0, (__L0 ?? runtime.memberCall(members.m_track_x, "read_safe", 0, __L1))(0));
    runtime.writeIndex(runtime.writableMember("m_track"), 1, (__L2 ?? runtime.memberCall(members.m_track_y, "read_safe", 0, __L1))(0));
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

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    const h_m_gfxcharlo = members.m_gfxcharlo ?? runtime.member("m_gfxcharlo");
    const h_m_gfxcharhi = members.m_gfxcharhi ?? runtime.member("m_gfxcharhi");
    let code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
    if (((Number(((code) & (128))) === Number(0)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(h_m_gfxcharlo, code, 0, 0);
    } else {
      (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(h_m_gfxcharhi, code, 0, 0);
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.draw"], __L1: any = __l["draw"], __L2: any = __l["m_palette.pen"], __L3: any = __l["bitmap.fill"], __L4: any = __l["fill"];

    if ((((members.m_background_priority ?? runtime.member("m_background_priority"))) ? 0 : 1)) {
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 128, 0);
    } else {
      (__L3 ?? runtime.memberCall(bitmap, "fill", 0, __L4))((__L2 ?? runtime.memberCall(members.m_palette, "pen", 0, undefined))(0), cliprect);
    }
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    if ((members.m_background_priority ?? runtime.member("m_background_priority"))) {
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L1))(screen, bitmap, cliprect, 0, 0);
    }
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_x"], __L1: any = __l["flip_screen_y"], __L2: any = __l["m_gfxdecode.gfx"];

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_spritebank = members.m_spritebank ?? runtime.member("m_spritebank");
    let clip: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(cliprect);
    clip.min_x = 8;
    for (let offs: any = ((0) | 0); (((offs) < (256)) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
      let sx: any = ((((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) - (4))) | 0);
      let sy: any = ((((runtime.readIndex(h_m_spriteram, offs)) - (13))) | 0);
      let code: any = ((__add_draw_sprites(runtime, ((255) ^ (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), ((256) * (h_m_spritebank)))) | 0);
      if ((__L0 ? __L0() : runtime.macro("flip_screen_x"))) {
        sx = ((((233) - (sx))) | 0);
      }
      if ((__L1 ? __L1() : runtime.macro("flip_screen_y"))) {
        sy = ((((228) - (sy))) | 0);
      }
      runtime.memberCall((__L2 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "transpen", 0, undefined)(bitmap, clip, code, 0, (__L0 ? __L0() : runtime.macro("flip_screen_x")), (__L1 ? __L1() : runtime.macro("flip_screen_y")), sx, sy, 0);
    }
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "qbert_output_w": method_qbert_output_w,
    "video_control_w": method_video_control_w,
    "qbert_knocker": method_qbert_knocker,
    "videoram_w": method_videoram_w,
    "charram_w": method_charram_w,
    "palette_w": method_palette_w,
    "combine_weights__int__4": method_combine_weights__int__4,
    "emu_detail__combine_weights__0__3": method_emu_detail__combine_weights__0__3,
    "emu_detail__combine_weights__1__2": method_emu_detail__combine_weights__1__2,
    "emu_detail__combine_weights__2__1": method_emu_detail__combine_weights__2__1,
    "emu_detail__combine_weights__3__0": method_emu_detail__combine_weights__3__0,
    "analog_reset_w": method_analog_reset_w,
    "compute_resistor_weights": method_compute_resistor_weights,
    "get_bg_tile_info": method_get_bg_tile_info,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites
  };
  return __methodTable;
})();
    return {
      "gottlieb_state.qbert_output_w": methods["qbert_output_w"],
      "gottlieb_state.video_control_w": methods["video_control_w"],
      "gottlieb_state.qbert_knocker": methods["qbert_knocker"],
      "gottlieb_state.videoram_w": methods["videoram_w"],
      "gottlieb_state.charram_w": methods["charram_w"],
      "gottlieb_state.palette_w": methods["palette_w"],
      "gottlieb_state.combine_weights__int__4": methods["combine_weights__int__4"],
      "gottlieb_state.emu_detail__combine_weights__0__3": methods["emu_detail__combine_weights__0__3"],
      "gottlieb_state.emu_detail__combine_weights__1__2": methods["emu_detail__combine_weights__1__2"],
      "gottlieb_state.emu_detail__combine_weights__2__1": methods["emu_detail__combine_weights__2__1"],
      "gottlieb_state.emu_detail__combine_weights__3__0": methods["emu_detail__combine_weights__3__0"],
      "gottlieb_state.analog_reset_w": methods["analog_reset_w"],
      "gottlieb_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "gottlieb_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "gottlieb_state.screen_update": methods["screen_update"],
      "gottlieb_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill","draw","fatalerror","fill","flip_screen_x","flip_screen_x_set","flip_screen_y","flip_screen_y_set","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_knocker_sample.start","m_palette.pen","m_palette.set_pen_color","m_screen.update_partial","m_screen.vpos","m_track_x.read_safe","m_track_y.read_safe","mark_tile_dirty","read_safe","rgb_t","set","std::clamp","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
