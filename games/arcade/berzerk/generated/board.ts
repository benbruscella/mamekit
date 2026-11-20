// GENERATED executable machine composition from src/mame/stern/berzerk.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'berzerk');

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
  const __mame_table_0 = [128, 218];
  const __mame_table_1 = [0, 1];
  const __mame_table_2 = [48, 80, 112, 144, 176, 208, 240, 240];
  const __mame_table_3 = [0, 0, 0, 0, 0, 0, 0, 1];

  function method_irq_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"], __L1: any = __l["m_screen.time_until_pos"], __L2: any = __l["m_irq_timer.adjust"], __L3: any = __l["adjust"];

    let irq_number: any = ((param) | 0);
    let next_counter: any = ((0) & 0xff);
    let next_v256: any = ((0) & 0xff);
    let next_vpos: any = ((0) | 0);
    let next_irq_number: any = ((0) | 0);
    if ((members.m_irq_enabled ?? runtime.member("m_irq_enabled"))) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 2);
    }
    next_irq_number = ((((((irq_number) + (1))) % (2))) | 0);
    next_counter = (((__mame_table_0[((next_irq_number) & 1)] ?? 0)) & 0xff);
    next_v256 = (((__mame_table_1[((next_irq_number) & 1)] ?? 0)) & 0xff);
    next_vpos = (((runtime.overrides["vsync_chain_counter_to_vpos"] ? runtime.overrides["vsync_chain_counter_to_vpos"](next_counter, next_v256) : method_vsync_chain_counter_to_vpos(runtime, next_counter, next_v256))) | 0);
    (__L2 ?? runtime.memberCall(members.m_irq_timer, "adjust", 0, __L3))((__L1 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(next_vpos), next_irq_number);
  }

  function method_vsync_chain_counter_to_vpos(runtime: any, counter: any, v256: any): any {
    const members = runtime.members;

    counter = ((counter) & 0xff);
    v256 = ((v256) & 0xff);
    let vpos: any = ((0) | 0);
    if (v256) {
      vpos = ((__add_vsync_chain_counter_to_vpos(runtime, ((counter) - (218)), 256)) | 0);
      if (((Number(vpos) >= Number(262)) ? 1 : 0)) {
        vpos = ((((vpos) - (262))) | 0);
      }
    } else {
      vpos = ((counter) | 0);
    }
    return vpos;
  }
  function __add_vsync_chain_counter_to_vpos(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_nmi_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.pulse_input_line"], __L1: any = __l["m_screen.time_until_pos"], __L2: any = __l["m_nmi_timer.adjust"], __L3: any = __l["adjust"];

    let nmi_number: any = ((param) | 0);
    let next_counter: any = ((0) & 0xff);
    let next_v256: any = ((0) & 0xff);
    let next_vpos: any = ((0) | 0);
    let next_nmi_number: any = ((0) | 0);
    if ((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "pulse_input_line", 0, undefined))(-1, 0);
    }
    next_nmi_number = ((((((nmi_number) + (1))) % (8))) | 0);
    next_counter = (((__mame_table_2[((next_nmi_number) & 7)] ?? 0)) & 0xff);
    next_v256 = (((__mame_table_3[((next_nmi_number) & 7)] ?? 0)) & 0xff);
    next_vpos = (((runtime.overrides["vsync_chain_counter_to_vpos"] ? runtime.overrides["vsync_chain_counter_to_vpos"](next_counter, next_v256) : method_vsync_chain_counter_to_vpos(runtime, next_counter, next_v256))) | 0);
    (__L2 ?? runtime.memberCall(members.m_nmi_timer, "adjust", 0, __L3))((__L1 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(next_vpos), next_nmi_number);
  }

  function method_magicram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ls181_12c.input_a_w"], __L1: any = __l["m_ls181_10c.input_a_w"], __L2: any = __l["m_ls181_12c.input_b_w"], __L3: any = __l["m_ls181_10c.input_b_w"], __L4: any = __l["m_ls181_12c.select_w"], __L5: any = __l["m_ls181_10c.select_w"], __L6: any = __l["m_ls181_10c.function_r"], __L7: any = __l["m_ls181_12c.function_r"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    let alu_output: any = ((0) & 0xff);
    let current_video_data: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset)) & 0xff);
    let shift_flop_output: any = ((runtime.shiftRight((((((((members.m_last_shift_data ?? runtime.member("m_last_shift_data"))) & 0xffff)) << (8))) | (data)), (((members.m_magicram_control ?? runtime.member("m_magicram_control"))) & (7)))) & 0xff);
    if ((((members.m_magicram_control ?? runtime.member("m_magicram_control"))) & (8))) {
      shift_flop_output = ((((((shift_flop_output) >>> (0)) & 1) << 7 | (((shift_flop_output) >>> (1)) & 1) << 6 | (((shift_flop_output) >>> (2)) & 1) << 5 | (((shift_flop_output) >>> (3)) & 1) << 4 | (((shift_flop_output) >>> (4)) & 1) << 3 | (((shift_flop_output) >>> (5)) & 1) << 2 | (((shift_flop_output) >>> (6)) & 1) << 1 | (((shift_flop_output) >>> (7)) & 1) << 0)) & 0xff);
    }
    if (((shift_flop_output) & (current_video_data))) {
      members.m_intercept = ((0) & 0xff);
    }
    (__L0 ?? runtime.memberCall(members.m_ls181_12c, "input_a_w", 0, undefined))(((shift_flop_output) >>> (0)));
    (__L1 ?? runtime.memberCall(members.m_ls181_10c, "input_a_w", 0, undefined))(((shift_flop_output) >>> (4)));
    (__L2 ?? runtime.memberCall(members.m_ls181_12c, "input_b_w", 0, undefined))(((current_video_data) >>> (0)));
    (__L3 ?? runtime.memberCall(members.m_ls181_10c, "input_b_w", 0, undefined))(((current_video_data) >>> (4)));
    (__L4 ?? runtime.memberCall(members.m_ls181_12c, "select_w", 0, undefined))(runtime.shiftRight((members.m_magicram_control ?? runtime.member("m_magicram_control")), 4));
    (__L5 ?? runtime.memberCall(members.m_ls181_10c, "select_w", 0, undefined))(runtime.shiftRight((members.m_magicram_control ?? runtime.member("m_magicram_control")), 4));
    alu_output = (((((((__L6 ?? runtime.memberCall(members.m_ls181_10c, "function_r", 0, undefined))()) << (4))) | ((__L7 ?? runtime.memberCall(members.m_ls181_12c, "function_r", 0, undefined))()))) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, ((alu_output) ^ (255)));
    members.m_last_shift_data = ((((data) & (127))) & 0xff);
  }

  function method_audio_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_s14001a.busy_r"], __L1: any = __l["m_custom.sh6840_r"];
    let __t0: any;

    switch ((offset as number)) {
      case 4:
      {
        return (((__L0 ?? runtime.memberCall(members.m_s14001a, "busy_r", 0, undefined))()) ? (0) : (64));
      }
      case 6:
      {
        0;
        return 0;
      }
      default:
      {
        return (__L1 ?? runtime.memberCall(members.m_custom, "sh6840_r", 0, undefined))(offset);
      }
    }
  }

  function method_audio_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_s14001a.data_w"], __L1: any = __l["m_s14001a.start_w"], __L2: any = __l["m_s14001a_volume.set_gain"], __L3: any = __l["m_s14001a.set_unscaled_clock"], __L4: any = __l["m_custom.sfxctrl_w"], __L5: any = __l["m_custom.sh6840_w"];

    data = ((data) & 0xff);
    switch ((offset as number)) {
      case 4:
      {
        switch ((((data) >>> (6)) as number)) {
          case 0:
          {
            (__L0 ?? runtime.memberCall(members.m_s14001a, "data_w", 0, undefined))(((data) & (63)));
            (__L1 ?? runtime.memberCall(members.m_s14001a, "start_w", 0, undefined))(1);
            (__L1 ?? runtime.memberCall(members.m_s14001a, "start_w", 0, undefined))(0);
            break;
          }
          case 1:
          {
            (__L2 ?? runtime.memberCall(members.m_s14001a_volume, "set_gain", 0, undefined))(((((((data) >>> (3))) & (7))) / (7)));
            let clock_divisor: any = ((((16) - (((data) & (7))))) | 0);
            (__L3 ?? runtime.memberCall(members.m_s14001a, "set_unscaled_clock", 0, undefined))(runtime.divide(runtime.divide(2500000, clock_divisor), 8));
            break;
          }
          default:
          {
            break;
          }
        }
        break;
      }
      case 6:
      {
        (__L4 ?? runtime.memberCall(members.m_custom, "sfxctrl_w", 0, undefined))(((data) >>> (6)), data);
        break;
      }
      default:
      {
        (__L5 ?? runtime.memberCall(members.m_custom, "sh6840_w", 0, undefined))(offset, data);
        break;
      }
    }
  }

  function method_magicram_control_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_magicram_control = ((data) & 0xff);
    members.m_last_shift_data = ((0) & 0xff);
    members.m_intercept = ((1) & 0xff);
  }

  function method_nmi_enable_r(runtime: any): any {
    const members = runtime.members;

    members.m_nmi_enabled = ((1) & 0xff);
    return 0;
  }

  function method_nmi_enable_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_nmi_enabled = ((1) & 0xff);
  }

  function method_nmi_disable_r(runtime: any): any {
    const members = runtime.members;

    members.m_nmi_enabled = ((0) & 0xff);
    return 0;
  }

  function method_nmi_disable_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_nmi_enabled = ((0) & 0xff);
  }

  function method_intercept_v256_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"];
    let __t0: any;

    let counter: any = ((0) & 0xff);
    let v256: any = ((0) & 0xff);
    (runtime.overrides["vpos_to_vsync_chain_counter"] ? runtime.overrides["vpos_to_vsync_chain_counter"]((__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => counter, set: (value: any) => { counter = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => v256, set: (value: any) => { v256 = ((value) & 0xff); } }), offset: 0 })) : method_vpos_to_vsync_chain_counter(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => counter, set: (value: any) => { counter = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => v256, set: (value: any) => { v256 = ((value) & 0xff); } }), offset: 0 })));
    return (((((((members.m_intercept ?? runtime.member("m_intercept"))) ^ (1))) << (7))) | (v256));
  }

  function method_vpos_to_vsync_chain_counter(runtime: any, vpos: any, counter: any, v256: any): any {
    const members = runtime.members;

    runtime.pointerStore(v256, (((((Number(vpos) < Number(32)) ? 1 : 0)) || (((Number(vpos) >= Number(256)) ? 1 : 0))) ? 1 : 0));
    if (__deref_vpos_to_vsync_chain_counter(runtime, v256)) {
      let temp: any = ((__add_vpos_to_vsync_chain_counter(runtime, ((vpos) - (256)), 218)) | 0);
      if ((((temp) < (0)) ? 1 : 0)) {
        runtime.pointerStore(counter, ((temp) + (262)));
      } else {
        runtime.pointerStore(counter, temp);
      }
    } else {
      runtime.pointerStore(counter, vpos);
    }
  }
  function __add_vpos_to_vsync_chain_counter(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_vpos_to_vsync_chain_counter(runtime: any, p: any): any {
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

  function method_irq_enable_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_irq_enabled = ((((data) & (1))) & 0xff);
  }

  function method_led_off_r(runtime: any): any {
    const members = runtime.members;

    members.m_led = 0;
    return 0;
  }

  function method_led_off_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_led = 0;
  }

  function method_led_on_r(runtime: any): any {
    const members = runtime.members;

    members.m_led = 1;
    return 0;
  }

  function method_led_on_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_led = 1;
  }

  function method_vector_r(runtime: any, irqline: any): any {
    const members = runtime.members;

    return 252;
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t::black"];

    const h_m_colorram = members.m_colorram ?? runtime.member("m_colorram");
    let pens: any = new Uint32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](16) : new Uint8Array(Math.max(0, Number(16)))));
    (runtime.overrides["get_pens"] ? runtime.overrides["get_pens"](pens) : method_get_pens(runtime, pens));
    for (let offs: any = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_videoram, "bytes"))) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
      let data: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs)) & 0xff);
      let color: any = ((runtime.readIndex(h_m_colorram, ((((runtime.shiftRight(offs, 2)) & (2016))) | (((offs) & (31)))))) & 0xff);
      let y: any = ((runtime.shiftRight(offs, 5)) & 0xff);
      let x: any = ((((offs) << (3))) & 0xff);
      let i: any = ((0) | 0);
      for (i = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let pen: any = ((((data) & (128))) ? ((pens[((color) >>> (4))] ?? 0)) : ((__L0 ? __L0() : runtime.macro("rgb_t::black"))));
        bitmap["pix="](y, x, pen);
        x = ((((x) + (1))) & 0xff);
        data = ((((data) << (1))) & 0xff);
      }
      for (; (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let pen: any = ((((data) & (128))) ? ((pens[((color) & (15))] ?? 0)) : ((__L0 ? __L0() : runtime.macro("rgb_t::black"))));
        bitmap["pix="](y, x, pen);
        x = ((((x) + (1))) & 0xff);
        data = ((((data) << (1))) & 0xff);
      }
    }
    return 0;
  }

  function method_get_pens(runtime: any, pens: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"], __L1: any = __l["rgb_t"];
    let __t0: any;

    let resistances_wg: any = new Int32Array([750, 0]);
    let resistances_el: any = new Int32Array([((((1) / (__add_get_pens(runtime, ((1) / (750)), ((1) / (360)))))) | 0), 0]);
    let color_weights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](2) : new Uint8Array(Math.max(0, Number(2)))));
    if (((Number((__t0 = __deref_get_pens(runtime, (__L0 ? __L0("MONITOR_TYPE") : runtime.macro("ioport", "MONITOR_TYPE"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("MONITOR_TYPE") : runtime.macro("ioport", "MONITOR_TYPE")), "read"))) === Number(0)) ? 1 : 0)) {
      (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 2, resistances_wg, color_weights, 0, 270, 2, resistances_wg, color_weights, 0, 270, 2, resistances_wg, color_weights, 0, 270) : method_compute_resistor_weights(runtime, 0, 255, (-1), 2, resistances_wg, color_weights, 0, 270, 2, resistances_wg, color_weights, 0, 270, 2, resistances_wg, color_weights, 0, 270));
    } else {
      (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 2, resistances_el, color_weights, 0, 270, 2, resistances_el, color_weights, 0, 270, 2, resistances_el, color_weights, 0, 270) : method_compute_resistor_weights(runtime, 0, 255, (-1), 2, resistances_el, color_weights, 0, 270, 2, resistances_el, color_weights, 0, 270, 2, resistances_el, color_weights, 0, 270));
    }
    for (let color: any = ((0) | 0); (((color) < (16)) ? 1 : 0); color = ((((color) + (1))) | 0)) {
      let r_bit: any = ((((runtime.shiftRight(color, 0)) & (1))) & 0xff);
      let g_bit: any = ((((runtime.shiftRight(color, 1)) & (1))) & 0xff);
      let b_bit: any = ((((runtime.shiftRight(color, 2)) & (1))) & 0xff);
      let i_bit: any = ((((runtime.shiftRight(color, 3)) & (1))) & 0xff);
      let r: any = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](color_weights, ((r_bit) & (i_bit)), r_bit) : method_combine_weights__int__2(runtime, color_weights, ((r_bit) & (i_bit)), r_bit))) & 0xff);
      let g: any = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](color_weights, ((g_bit) & (i_bit)), g_bit) : method_combine_weights__int__2(runtime, color_weights, ((g_bit) & (i_bit)), g_bit))) & 0xff);
      let b: any = (((runtime.overrides["combine_weights__int__2"] ? runtime.overrides["combine_weights__int__2"](color_weights, ((b_bit) & (i_bit)), b_bit) : method_combine_weights__int__2(runtime, color_weights, ((b_bit) & (i_bit)), b_bit))) & 0xff);
      runtime.writeIndex(pens, color, (__L1 ? __L1(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
  }
  function __add_get_pens(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_get_pens(runtime: any, p: any): any {
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
    "irq_callback": method_irq_callback,
    "vsync_chain_counter_to_vpos": method_vsync_chain_counter_to_vpos,
    "nmi_callback": method_nmi_callback,
    "magicram_w": method_magicram_w,
    "audio_r": method_audio_r,
    "audio_w": method_audio_w,
    "magicram_control_w": method_magicram_control_w,
    "nmi_enable_r": method_nmi_enable_r,
    "nmi_enable_w": method_nmi_enable_w,
    "nmi_disable_r": method_nmi_disable_r,
    "nmi_disable_w": method_nmi_disable_w,
    "intercept_v256_r": method_intercept_v256_r,
    "vpos_to_vsync_chain_counter": method_vpos_to_vsync_chain_counter,
    "irq_enable_w": method_irq_enable_w,
    "led_off_r": method_led_off_r,
    "led_off_w": method_led_off_w,
    "led_on_r": method_led_on_r,
    "led_on_w": method_led_on_w,
    "vector_r": method_vector_r,
    "screen_update": method_screen_update,
    "get_pens": method_get_pens,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__2": method_combine_weights__int__2,
    "emu_detail__combine_weights__0__1": method_emu_detail__combine_weights__0__1,
    "emu_detail__combine_weights__1__0": method_emu_detail__combine_weights__1__0
  };
  return __methodTable;
})();
    return {
      "berzerk_state.irq_callback": methods["irq_callback"],
      "berzerk_state.vsync_chain_counter_to_vpos": methods["vsync_chain_counter_to_vpos"],
      "berzerk_state.nmi_callback": methods["nmi_callback"],
      "berzerk_state.magicram_w": methods["magicram_w"],
      "berzerk_state.audio_r": methods["audio_r"],
      "berzerk_state.audio_w": methods["audio_w"],
      "berzerk_state.magicram_control_w": methods["magicram_control_w"],
      "berzerk_state.nmi_enable_r": methods["nmi_enable_r"],
      "berzerk_state.nmi_enable_w": methods["nmi_enable_w"],
      "berzerk_state.nmi_disable_r": methods["nmi_disable_r"],
      "berzerk_state.nmi_disable_w": methods["nmi_disable_w"],
      "berzerk_state.intercept_v256_r": methods["intercept_v256_r"],
      "berzerk_state.irq_enable_w": methods["irq_enable_w"],
      "berzerk_state.led_off_r": methods["led_off_r"],
      "berzerk_state.led_off_w": methods["led_off_w"],
      "berzerk_state.led_on_r": methods["led_on_r"],
      "berzerk_state.led_on_w": methods["led_on_w"],
      "berzerk_state.vector_r": methods["vector_r"],
      "berzerk_state.screen_update": methods["screen_update"],
      "berzerk_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "berzerk_state.combine_weights__int__2": methods["combine_weights__int__2"],
      "berzerk_state.emu_detail__combine_weights__0__1": methods["emu_detail__combine_weights__0__1"],
      "berzerk_state.emu_detail__combine_weights__1__0": methods["emu_detail__combine_weights__1__0"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust","fatalerror","ioport","m_custom.sfxctrl_w","m_custom.sh6840_r","m_custom.sh6840_w","m_irq_timer.adjust","m_ls181_10c.function_r","m_ls181_10c.input_a_w","m_ls181_10c.input_b_w","m_ls181_10c.select_w","m_ls181_12c.function_r","m_ls181_12c.input_a_w","m_ls181_12c.input_b_w","m_ls181_12c.select_w","m_maincpu.pulse_input_line","m_maincpu.set_input_line","m_nmi_timer.adjust","m_s14001a.busy_r","m_s14001a.data_w","m_s14001a.set_unscaled_clock","m_s14001a.start_w","m_s14001a_volume.set_gain","m_screen.time_until_pos","m_screen.vpos","rgb_t","rgb_t::black","std::clamp"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
