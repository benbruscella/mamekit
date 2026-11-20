// GENERATED executable machine composition from src/mame/williams/williams.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'robotron');

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


  function method_vram_select_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_rom_view.select"], __L1: any = __l["select"], __L2: any = __l["m_rom_view.disable"], __L3: any = __l["disable"];
    let __t0: any;

    data = ((data) & 0xff);
    if ((((data) >>> (0)) & 1)) {
      (__L0 ?? runtime.memberCall(members.m_rom_view, "select", 0, __L1))(0);
    } else {
      (__L2 ?? runtime.memberCall(members.m_rom_view, "disable", 0, __L3))();
    }
    members.m_cocktail = (((((data) >>> (1)) & 1)) & 0xff);
  }

  function method_video_counter_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"];
    let __t0: any, __t1: any;

    if (((Number((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) < Number(256)) ? 1 : 0)) {
      return (((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))()) & (252));
    } else {
      return 252;
    }
  }

  function method_watchdog_reset_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_watchdog.watchdog_reset"];
    let __t0: any;

    data = ((data) & 0xff);
    if ((((data) === (57)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_watchdog, "watchdog_reset", 0, undefined))();
    }
  }

  function method_cmos_4bit_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_nvram"), offset, ((data) | (240)));
  }

  function method_blit_core(runtime: any, space: any, w: any, h: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["space.read_byte"], __L1: any = __l["read_byte"];

    let dst_stride_256: any = ((((((members.m_control ?? runtime.member("m_control"))) >>> (1)) & 1)) ? 1 : 0);
    let src_stride_256: any = ((((((members.m_control ?? runtime.member("m_control"))) >>> (0)) & 1)) ? 1 : 0);
    let sxadv: any = ((((src_stride_256) ? (256) : (1))) | 0);
    let syadv: any = ((((src_stride_256) ? (1) : (w))) | 0);
    let dxadv: any = ((((dst_stride_256) ? (256) : (1))) | 0);
    let dyadv: any = ((((dst_stride_256) ? (1) : (w))) | 0);
    let accesses: any = ((0) | 0);
    let pixdata: any = ((0) | 0);
    let shift: any = ((((((members.m_control ?? runtime.member("m_control"))) >>> (5)) & 1)) ? 1 : 0);
    let sstart: any = (((members.m_sstart ?? runtime.member("m_sstart"))) & 0xffff);
    let dstart: any = (((members.m_dstart ?? runtime.member("m_dstart"))) & 0xffff);
    for (let y: any = ((0) | 0); (((y) < (h)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let source: any = ((sstart) & 0xffff);
      let dest: any = ((dstart) & 0xffff);
      for (let x: any = ((0) | 0); (((x) < (w)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let rawval: any = ((runtime.readIndex((members.m_remap ?? runtime.member("m_remap")), (__L0 ?? runtime.memberCall(space, "read_byte", 0, __L1))(source))) & 0xff);
        if (shift) {
          pixdata = ((((((pixdata) << (8))) | (rawval))) | 0);
          runtime.invoke("blit_pixel", space, dest, ((runtime.shiftRight(pixdata, 4)) & (255)));
        } else {
          runtime.invoke("blit_pixel", space, dest, rawval);
        }
        accesses = ((((accesses) + (2))) | 0);
        source = ((((source) + (sxadv))) & 0xffff);
        dest = ((((dest) + (dxadv))) & 0xffff);
      }
      if (dst_stride_256) {
        dstart = ((((((dstart) & (65280))) | (((((dstart) + (dyadv))) & (255))))) & 0xffff);
      } else {
        dstart = ((((dstart) + (dyadv))) & 0xffff);
      }
      if (src_stride_256) {
        sstart = ((((((sstart) & (65280))) | (((((sstart) + (syadv))) & (255))))) & 0xffff);
      } else {
        sstart = ((((sstart) + (syadv))) & 0xffff);
      }
    }
    return accesses;
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.pen_color"];

    const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
    let pens: any = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
    for (let x: any = ((0) | 0); (((x) < (16)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
      pens[x] = (__L0 ?? runtime.memberCall(members.m_palette, "pen_color", 0, undefined))(runtime.readIndex(h_m_paletteram, x));
    }
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let source: any = __addr_screen_update(runtime, (members.m_videoram ?? runtime.member("m_videoram")), y); let source$s: any = undefined, source$o: any = 0; if (ArrayBuffer.isView(source) || Array.isArray(source)) source$s = source; else if (source !== null && typeof source === 'object' && source.generatedPointer === true && source.path === undefined && source.target === undefined && (ArrayBuffer.isView(source.source) || Array.isArray(source.source))) { source$s = source.source; source$o = source.offset; }
      let dest: any = bitmap["pix&"](y); let dest$s: any = undefined, dest$o: any = 0; if (ArrayBuffer.isView(dest) || Array.isArray(dest)) dest$s = dest; else if (dest !== null && typeof dest === 'object' && dest.generatedPointer === true && dest.path === undefined && dest.target === undefined && (ArrayBuffer.isView(dest.source) || Array.isArray(dest.source))) { dest$s = dest.source; dest$o = dest.offset; }
      for (let x: any = ((((cliprect.min_x) & (-2))) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (2))) | 0)) {
        let pix: any = (((source$s !== undefined ? (source$s[source$o + (((runtime.divide(x, 2)) * (256)))] ?? 0) : runtime.readIndex(source, ((runtime.divide(x, 2)) * (256))))) & 0xff);
        runtime.writeIndex(dest, ((x) + (0)), (pens[((pix) >>> (4))] ?? 0));
        runtime.writeIndex(dest, ((x) + (1)), (pens[((pix) & (15))] ?? 0));
      }
    }
    return 0;
  }
  function __addr_screen_update(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_snd_cmd_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("deferred_snd_cmd_w_2", ((data) | (192)));
  }

  function method_palette_init(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t"], __L1: any = __l["palette.set_pen_color"], __L2: any = __l["set_pen_color"];

    let resistances_rg: any = new Int32Array([1200, 560, 330]);
    let resistances_b: any = new Int32Array([560, 330]);
    let weights_r: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let weights_g: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let weights_b: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, resistances_rg, weights_r, 0, 0, 3, resistances_rg, weights_g, 0, 0, 2, resistances_b, weights_b, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, resistances_rg, weights_r, 0, 0, 3, resistances_rg, weights_g, 0, 0, 2, resistances_b, weights_b, 0, 0));
    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let r: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](weights_r, (((i) >>> (0)) & 1), (((i) >>> (1)) & 1), (((i) >>> (2)) & 1)) : method_combine_weights__int__3(runtime, weights_r, (((i) >>> (0)) & 1), (((i) >>> (1)) & 1), (((i) >>> (2)) & 1)))) | 0);
      let g: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](weights_g, (((i) >>> (3)) & 1), (((i) >>> (4)) & 1), (((i) >>> (5)) & 1)) : method_combine_weights__int__3(runtime, weights_g, (((i) >>> (3)) & 1), (((i) >>> (4)) & 1), (((i) >>> (5)) & 1)))) | 0);
      let b: any = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](weights_b, (((i) >>> (6)) & 1), (((i) >>> (7)) & 1)) : method_combine_weights__int__2(runtime, weights_b, (((i) >>> (6)) & 1), (((i) >>> (7)) & 1)))) | 0);
      (__L1 ?? runtime.memberCall(palette, "set_pen_color", 0, __L2))(i, (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
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
    "vram_select_w": method_vram_select_w,
    "video_counter_r": method_video_counter_r,
    "watchdog_reset_w": method_watchdog_reset_w,
    "cmos_4bit_w": method_cmos_4bit_w,
    "blit_core": method_blit_core,
    "screen_update": method_screen_update,
    "snd_cmd_w": method_snd_cmd_w,
    "palette_init": method_palette_init,
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
      "williams_state.vram_select_w": methods["vram_select_w"],
      "williams_state.video_counter_r": methods["video_counter_r"],
      "williams_state.watchdog_reset_w": methods["watchdog_reset_w"],
      "williams_state.cmos_4bit_w": methods["cmos_4bit_w"],
      "williams_state.screen_update": methods["screen_update"],
      "williams_state.snd_cmd_w": methods["snd_cmd_w"],
      "williams_state.palette_init": methods["palette_init"],
      "williams_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "williams_state.combine_weights__int__3": methods["combine_weights__int__3"],
      "williams_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
      "williams_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
      "williams_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
      "williams_state.combine_weights__int__2": methods["combine_weights__int__2"],
      "williams_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
      "williams_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["disable","fatalerror","m_palette.pen_color","m_rom_view.disable","m_rom_view.select","m_screen.vpos","m_watchdog.watchdog_reset","palette.set_pen_color","read_byte","rgb_t","select","set_pen_color","space.read_byte","std::clamp"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
