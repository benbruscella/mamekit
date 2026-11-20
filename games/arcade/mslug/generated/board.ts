// GENERATED executable machine composition from src/mame/snk/neogeo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'mslug');

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


  function method_audio_command_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_soundlatch.write"], __L1: any = __l["attotime::from_usec"], __L2: any = __l["machine().scheduler().perfect_quantum"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_soundlatch, "write", 0, undefined))(data);
    ((__L2 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().scheduler().perfect_quantum"))?.((__L1 ? __L1(50) : runtime.macro("attotime::from_usec", 50))) ?? 0);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
    }
  }

  function method_unmapped_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.pc"], __L1: any = __l["space.read_word"], __L2: any = __l["read_word"];
    let __t0: any;

    let ret: any = ((0) & 0xffff);
    if ((members.m_recurse ?? runtime.member("m_recurse"))) {
      ret = ((65535) & 0xffff);
    } else {
      members.m_recurse = ((1) ? 1 : 0);
      ret = (((__L1 ?? runtime.memberCall(space, "read_word", 0, __L2))((__L0 ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))())) & 0xffff);
      members.m_recurse = ((0) ? 1 : 0);
    }
    return ret;
  }

  function method_video_register_r(runtime: any, space: any, offset: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.get_videoram_data"], __L1: any = __l["m_sprgen.get_videoram_modulo"];
    let __t0: any, __t1: any;

    mem_mask = ((mem_mask) & 0xffff);
    let ret: any = ((0) & 0xffff);
    if ((((mem_mask) === (255)) ? 1 : 0)) {
      ret = (((((runtime.overrides["unmapped_r"] ? runtime.overrides["unmapped_r"](space) : method_unmapped_r(runtime, space))) & (255))) & 0xffff);
    } else {
      switch ((offset as number)) {
        default:
        {
          ret = (((__L0 ?? runtime.memberCall(members.m_sprgen, "get_videoram_data", 0, undefined))()) & 0xffff);
          break;
        }
        case 2:
        {
          ret = (((__L1 ?? runtime.memberCall(members.m_sprgen, "get_videoram_modulo", 0, undefined))()) & 0xffff);
          break;
        }
        case 3:
        {
          ret = (((runtime.overrides["get_video_control"] ? runtime.overrides["get_video_control"]() : method_get_video_control(runtime))) & 0xffff);
          break;
        }
      }
    }
    return ret;
  }

  function method_get_video_control(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.vpos"], __L1: any = __l["m_sprgen.get_auto_animation_counter"], __L2: any = __l["machine"], __L3: any = __l["machine().side_effects_disabled"];
    let __t0: any, __t1: any;

    let v_counter: any = ((__add_get_video_control(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), 256)) & 0xffff);
    if ((((v_counter) >= (512)) ? 1 : 0)) {
      v_counter = ((((v_counter) - (264))) & 0xffff);
    }
    let ret: any = ((((((v_counter) << (7))) | ((((__L1 ?? runtime.memberCall(members.m_sprgen, "get_auto_animation_counter", 0, undefined))()) & (7))))) & 0xffff);
    if (((((__L3 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      if (0) {
        0;
      }
    }
    return ret;
  }
  function __add_get_video_control(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((members.m_regsel ?? runtime.member("m_regsel"))) {
      return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
    } else {
      return 65535;
    }
  }

  function method_video_register_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_videoram_offset"], __L1: any = __l["m_sprgen.set_videoram_data"], __L2: any = __l["m_sprgen.set_videoram_modulo"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((mem_mask) !== (255)) ? 1 : 0)) {
      if ((((mem_mask) === (65280)) ? 1 : 0)) {
        data = ((((((data) & (65280))) | (((data) >>> (8))))) & 0xffff);
      }
      switch ((offset as number)) {
        case 0:
        {
          (__L0 ?? runtime.memberCall(members.m_sprgen, "set_videoram_offset", 0, undefined))(data);
          break;
        }
        case 1:
        {
          (__L1 ?? runtime.memberCall(members.m_sprgen, "set_videoram_data", 0, undefined))(data);
          break;
        }
        case 2:
        {
          (__L2 ?? runtime.memberCall(members.m_sprgen, "set_videoram_modulo", 0, undefined))(data);
          break;
        }
        case 3:
        {
          (runtime.overrides["set_video_control"] ? runtime.overrides["set_video_control"](data) : method_set_video_control(runtime, data));
          break;
        }
        case 4:
        {
          (runtime.overrides["set_display_counter_msb"] ? runtime.overrides["set_display_counter_msb"](data) : method_set_display_counter_msb(runtime, data));
          break;
        }
        case 5:
        {
          (runtime.overrides["set_display_counter_lsb"] ? runtime.overrides["set_display_counter_lsb"](data) : method_set_display_counter_lsb(runtime, data));
          break;
        }
        case 6:
        {
          (runtime.overrides["acknowledge_interrupt"] ? runtime.overrides["acknowledge_interrupt"](data) : method_acknowledge_interrupt(runtime, data));
          break;
        }
        case 7:
        {
          break;
        }
      }
    }
  }

  function method_set_video_control(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_auto_animation_speed"], __L1: any = __l["m_sprgen.set_auto_animation_disabled"];

    data = ((data) & 0xffff);
    if (0) {
      0;
    }
    (__L0 ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_speed", 0, undefined))(((data) >>> (8)));
    (__L1 ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_disabled", 0, undefined))((((data) >>> (3)) & 1));
    (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
  }

  function method_set_display_position_interrupt_control(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_position_interrupt_control = ((data) & 0xff);
  }

  function method_set_display_counter_msb(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
    0;
  }

  function method_set_display_counter_lsb(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (4294901760))) | (data))) >>> 0);
    0;
    if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (5)) & 1)) {
      0;
      (runtime.overrides["adjust_display_position_interrupt_timer"] ? runtime.overrides["adjust_display_position_interrupt_timer"]() : method_adjust_display_position_interrupt_timer(runtime));
    }
  }

  function method_adjust_display_position_interrupt_timer(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["attotime::from_ticks"], __L1: any = __l["m_display_position_interrupt_timer.adjust"], __L2: any = __l["adjust"];

    let period: any = (__L0 ? __L0((((members.m_display_counter ?? runtime.member("m_display_counter"))) + (1)), 6000000) : runtime.macro("attotime::from_ticks", (((members.m_display_counter ?? runtime.member("m_display_counter"))) + (1)), 6000000));
    0;
    (__L1 ?? runtime.memberCall(members.m_display_position_interrupt_timer, "adjust", 0, __L2))(period);
  }

  function method_acknowledge_interrupt(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    if ((((data) >>> (0)) & 1)) {
      members.m_irq3_pending = ((0) & 0xff);
    }
    if ((((data) >>> (1)) & 1)) {
      members.m_display_position_interrupt_pending = ((0) & 0xff);
    }
    if ((((data) >>> (2)) & 1)) {
      members.m_vblank_interrupt_pending = ((0) & 0xff);
    }
    (runtime.overrides["update_interrupts"] ? runtime.overrides["update_interrupts"]() : method_update_interrupts(runtime));
  }

  function method_update_interrupts(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(3, (((members.m_irq3_pending ?? runtime.member("m_irq3_pending"))) ? (1) : (0)));
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))((members.m_raster_level ?? runtime.member("m_raster_level")), (((members.m_display_position_interrupt_pending ?? runtime.member("m_display_position_interrupt_pending"))) ? (1) : (0)));
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))((members.m_vblank_level ?? runtime.member("m_vblank_level")), (((members.m_vblank_interrupt_pending ?? runtime.member("m_vblank_interrupt_pending"))) ? (1) : (0)));
  }

  function method_paletteram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
  }

  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_color"];

    data = ((data) & 0xffff);
    offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let dark: any = ((((data) >>> (15))) & 0xff);
    let r: any = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
    let g: any = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
    let b: any = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark));
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2))));
  }

  function method_save_ram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
      runtime.combineData(__addr_save_ram_w(runtime, (members.m_save_ram ?? runtime.member("m_save_ram")), offset), data, mem_mask);
    }
  }
  function __addr_save_ram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_audio_cpu_enable_nmi_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audionmi.in_w_1"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_audionmi, "in_w_1", 0, undefined))(((((~offset)) >>> (4)) & 1));
  }

  function method_audio_cpu_bank_select_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      runtime.memberCall(runtime.readIndex((members.m_bank_audio_cart ?? runtime.member("m_bank_audio_cart")), ((offset) & (3))), "set_entry", 0, undefined)(((offset) >>> (8)));
    }
    return 0;
  }

  function method_display_position_interrupt_callback(runtime: any, param: any): any {
    const members = runtime.members;

    0;
    if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (4)) & 1)) {
      0;
      members.m_display_position_interrupt_pending = ((1) & 0xff);
      (runtime.overrides["update_interrupts"] ? runtime.overrides["update_interrupts"]() : method_update_interrupts(runtime));
    }
    if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (7)) & 1)) {
      0;
      (runtime.overrides["adjust_display_position_interrupt_timer"] ? runtime.overrides["adjust_display_position_interrupt_timer"]() : method_adjust_display_position_interrupt_timer(runtime));
    }
  }

  function method_display_position_vblank_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.time_until_pos"], __L1: any = __l["attotime::from_ticks"], __L2: any = __l["m_display_position_vblank_timer.adjust"], __L3: any = __l["adjust"];

    if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (6)) & 1)) {
      0;
      (runtime.overrides["adjust_display_position_interrupt_timer"] ? runtime.overrides["adjust_display_position_interrupt_timer"]() : method_adjust_display_position_interrupt_timer(runtime));
    }
    (__L2 ?? runtime.memberCall(members.m_display_position_vblank_timer, "adjust", 0, __L3))(__add_display_position_vblank_callback(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(240), (__L1 ? __L1(1146, 24000000) : runtime.macro("attotime::from_ticks", 1146, 24000000))));
  }
  function __add_display_position_vblank_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_vblank_interrupt_callback(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.time_until_pos"], __L1: any = __l["attotime::from_ticks"], __L2: any = __l["m_vblank_interrupt_timer.adjust"], __L3: any = __l["adjust"];

    0;
    members.m_vblank_interrupt_pending = ((1) & 0xff);
    (runtime.overrides["update_interrupts"] ? runtime.overrides["update_interrupts"]() : method_update_interrupts(runtime));
    (__L2 ?? runtime.memberCall(members.m_vblank_interrupt_timer, "adjust", 0, __L3))(__add_vblank_interrupt_callback(runtime, (__L0 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(240), (__L1 ? __L1(58, 24000000) : runtime.macro("attotime::from_ticks", 58, 24000000))));
  }
  function __add_vblank_interrupt_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_in0_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in0_r"], __L1: any = __l["m_ctrl1.read_ctrl"], __L2: any = __l["m_dsw.read"], __L3: any = __l["read"];
    let __t0: any, __t1: any, __t2: any;

    return (((((((__L0 ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) & ((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_ctrl", 0, undefined))()))) << (8))) | ((__L2 ?? runtime.memberCall(members.m_dsw, "read", 0, __L3))()));
  }

  function method_in0_edge_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in0_r"], __L1: any = __l["m_dsw.read"], __L2: any = __l["read"];
    let __t0: any, __t1: any;

    return (((((__L0 ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) << (8))) | ((__L1 ?? runtime.memberCall(members.m_dsw, "read", 0, __L2))()));
  }

  function method_in1_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in1_r"], __L1: any = __l["m_ctrl2.read_ctrl"];
    let __t0: any, __t1: any;

    return (((((((__L0 ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) & ((__L1 ?? runtime.memberCall(members.m_ctrl2, "read_ctrl", 0, undefined))()))) << (8))) | (255));
  }

  function method_in1_edge_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in1_r"];
    let __t0: any;

    return (((((__L0 ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) << (8))) | (255));
  }

  function method_memcard_r(runtime: any, offset: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_maincpu.eat_cycles"], __L3: any = __l["m_memcard.present"], __L4: any = __l["m_memcard.read"];
    let __t0: any;

    mem_mask = ((mem_mask) & 0xffff);
    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
    }
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__L3 ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
      return (__L4 ?? runtime.memberCall(members.m_memcard, "read", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)));
    } else {
      return 65535;
    }
  }

  function method_memcard_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.eat_cycles"], __L1: any = __l["m_memcard.present"], __L2: any = __l["m_memcard.write"];
    let __t0: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_memcard, "write", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data);
    }
  }

  function method_create_rgb_lookups(runtime: any): any {
    const members = runtime.members;

    let resistances: any = new Int32Array([3900, 2200, 1000, 470, 220]);
    let weights_normal: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    let scaler: any = (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, -1, 5, resistances, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, -1, 5, resistances, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_dark: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_dark, 8200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_dark, 8200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_shadow: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_shadow, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_shadow, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_dark_shadow: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_dark_shadow, ((1) / (__add_create_rgb_lookups(runtime, ((1) / (8200)), ((1) / (150))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_dark_shadow, ((1) / (__add_create_rgb_lookups(runtime, ((1) / (8200)), ((1) / (150))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let i4: any = (((((i) >>> (4)) & 1)) | 0);
      let i3: any = (((((i) >>> (3)) & 1)) | 0);
      let i2: any = (((((i) >>> (2)) & 1)) | 0);
      let i1: any = (((((i) >>> (1)) & 1)) | 0);
      let i0: any = (((((i) >>> (0)) & 1)) | 0);
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 0, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_normal, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_normal, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 1, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_dark, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_dark, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 2, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_shadow, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_shadow, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 3, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_dark_shadow, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_dark_shadow, i0, i1, i2, i3, i4)));
    }
  }
  function __add_create_rgb_lookups(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
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

  function method_combine_weights__int__5(runtime: any, tab: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__5(runtime, (runtime.overrides["emu_detail__combine_weights__0__4"] ? runtime.overrides["emu_detail__combine_weights__0__4"](tab, w_0, w_1, w_2, w_3, w_4) : method_emu_detail__combine_weights__0__4(runtime, tab, w_0, w_1, w_2, w_3, w_4)), 0.5)) | 0);
  }
  function __add_combine_weights__int__5(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__4(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__4(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__3"] ? runtime.overrides["emu_detail__combine_weights__1__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__1__3(runtime, tab, w_0, w_1, w_2, w_3)));
  }
  function __add_emu_detail__combine_weights__0__4(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__3(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__3(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__2"] ? runtime.overrides["emu_detail__combine_weights__2__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__2__2(runtime, tab, w_0, w_1, w_2)));
  }
  function __add_emu_detail__combine_weights__1__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__2__2(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__1"] ? runtime.overrides["emu_detail__combine_weights__3__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__3__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__2__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__3__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__3__1(runtime, ((runtime.readIndex(tab, 3)) * (w0)), (runtime.overrides["emu_detail__combine_weights__4__0"] ? runtime.overrides["emu_detail__combine_weights__4__0"](tab, w_0) : method_emu_detail__combine_weights__4__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__3__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__4__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 4)) * (w));
  }

  function method_set_screen_shadow(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_screen_shadow = ((state) ? 1 : 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_set_pens(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.pens"], __L1: any = __l["m_sprgen.set_pens"];
    let __t0: any;

    let pen_base: any = __add_set_pens(runtime, __add_set_pens(runtime, (__L0 ?? runtime.memberCall(members.m_palette, "pens", 0, undefined))(), (members.m_palette_bank ?? runtime.member("m_palette_bank"))), (((members.m_screen_shadow ?? runtime.member("m_screen_shadow"))) ? (8192) : (0))); let pen_base$s: any = undefined, pen_base$o: any = 0; if (ArrayBuffer.isView(pen_base) || Array.isArray(pen_base)) pen_base$s = pen_base; else if (pen_base !== null && typeof pen_base === 'object' && pen_base.generatedPointer === true && pen_base.path === undefined && pen_base.target === undefined && (ArrayBuffer.isView(pen_base.source) || Array.isArray(pen_base.source))) { pen_base$s = pen_base.source; pen_base$o = pen_base.offset; }
    (__L1 ?? runtime.memberCall(members.m_sprgen, "set_pens", 0, undefined))(pen_base);
    members.m_bg_pen = __addr_set_pens(runtime, pen_base, 4095);
  }
  function __add_set_pens(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_set_pens(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_set_use_cart_vectors(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_use_cart_vectors = ((state) & 0xff);
  }

  function method_set_palette_bank(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_palette_bank = ((((state) ? (4096) : (0))) >>> 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["m_sprgen.draw_sprites"], __L3: any = __l["m_sprgen.draw_fixed_layer"];

    (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(__deref_screen_update(runtime, (members.m_bg_pen ?? runtime.member("m_bg_pen"))), cliprect);
    (__L2 ?? runtime.memberCall(members.m_sprgen, "draw_sprites", 0, undefined))(bitmap, cliprect.min_y);
    (__L3 ?? runtime.memberCall(members.m_sprgen, "draw_fixed_layer", 0, undefined))(bitmap, cliprect.min_y);
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

  function method_sprite_on_scanline(runtime: any, scanline: any, y: any, rows: any): any {
    const members = runtime.members;

    return (((((((((rows) === (0)) ? 1 : 0)) || ((((rows) >= (32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_draw_fixed_layer_2pixels(runtime: any, pixel_addr: any, offset: any, gfx_base: any, char_pens: any): any {
    const members = runtime.members;

    let data: any = ((runtime.readIndex(gfx_base, offset)) & 0xff);
    if (((data) & (15))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
    }
    pixel_addr.offset += 1;
    if (((data) & (240))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, runtime.shiftRight(((data) & (240)), 4)));
    }
    pixel_addr.offset += 1;
    return pixel_addr;
  }

  function method_lock1_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_lock1 = state;
  }

  function method_unlock2_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_unlock2 = state;
  }

  function method_regsel_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_regsel = state;
  }

  function method_set_use_cart_audio(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_fixed_layer_source"], __L1: any = __l["m_bank_audio_main.set_entry"], __L2: any = __l["set_entry"];

    members.m_use_cart_audio = ((state) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_sprgen, "set_fixed_layer_source", 0, undefined))(state);
    (__L1 ?? runtime.memberCall(members.m_bank_audio_main, "set_entry", 0, __L2))((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio")));
  }

  function method_set_save_ram_unlock(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_save_ram_unlocked = ((state) & 0xff);
  }

  function method_startsel_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.read_start_sel"], __L1: any = __l["m_ctrl1.read_start_sel"], __L2: any = __l["m_ctrl2.read_start_sel"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    let ret: any = (((((__L0 ?? runtime.memberCall(members.m_edge, "read_start_sel", 0, undefined))()) | (-6))) >>> 0);
    if (h_m_ctrl1) {
      ret = ((((ret) & ((((((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_start_sel", 0, undefined))()) << (0))) | (-4))))) >>> 0);
    }
    if (h_m_ctrl2) {
      ret = ((((ret) & ((((((__L2 ?? runtime.memberCall(members.m_ctrl2, "read_start_sel", 0, undefined))()) << (2))) | (-13))))) >>> 0);
    }
    return ret;
  }

  function method_io_control_w__base(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ctrl1.write_ctrlsel"], __L1: any = __l["m_ctrl2.write_ctrlsel"], __L2: any = __l["m_edge.write_ctrlsel"];

    data = ((data) & 0xff);
    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    const h_m_edge = members.m_edge ?? runtime.member("m_edge");
    switch ((((offset) & (56)) as number)) {
      case 0:
      {
        if (h_m_ctrl1) {
          (__L0 ?? runtime.memberCall(members.m_ctrl1, "write_ctrlsel", 0, undefined))(((data) & (7)));
        }
        if (h_m_ctrl2) {
          (__L1 ?? runtime.memberCall(members.m_ctrl2, "write_ctrlsel", 0, undefined))(((((data) >>> (3))) & (7)));
        }
        if (h_m_edge) {
          (__L2 ?? runtime.memberCall(members.m_edge, "write_ctrlsel", 0, undefined))(((data) & (63)));
        }
        break;
      }
      case 8:
      {
        members.m_card_bank = ((((data) & (7))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "audio_command_w": method_audio_command_w,
    "write": method_write,
    "unmapped_r": method_unmapped_r,
    "video_register_r": method_video_register_r,
    "get_video_control": method_get_video_control,
    "read": method_read,
    "video_register_w": method_video_register_w,
    "set_video_control": method_set_video_control,
    "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
    "set_display_counter_msb": method_set_display_counter_msb,
    "set_display_counter_lsb": method_set_display_counter_lsb,
    "adjust_display_position_interrupt_timer": method_adjust_display_position_interrupt_timer,
    "acknowledge_interrupt": method_acknowledge_interrupt,
    "update_interrupts": method_update_interrupts,
    "paletteram_r": method_paletteram_r,
    "paletteram_w": method_paletteram_w,
    "save_ram_w": method_save_ram_w,
    "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
    "audio_cpu_bank_select_r": method_audio_cpu_bank_select_r,
    "display_position_interrupt_callback": method_display_position_interrupt_callback,
    "display_position_vblank_callback": method_display_position_vblank_callback,
    "vblank_interrupt_callback": method_vblank_interrupt_callback,
    "in0_edge_joy_r": method_in0_edge_joy_r,
    "in0_edge_r": method_in0_edge_r,
    "in1_edge_joy_r": method_in1_edge_joy_r,
    "in1_edge_r": method_in1_edge_r,
    "memcard_r": method_memcard_r,
    "memcard_w": method_memcard_w,
    "create_rgb_lookups": method_create_rgb_lookups,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__5": method_combine_weights__int__5,
    "emu_detail__combine_weights__0__4": method_emu_detail__combine_weights__0__4,
    "emu_detail__combine_weights__1__3": method_emu_detail__combine_weights__1__3,
    "emu_detail__combine_weights__2__2": method_emu_detail__combine_weights__2__2,
    "emu_detail__combine_weights__3__1": method_emu_detail__combine_weights__3__1,
    "emu_detail__combine_weights__4__0": method_emu_detail__combine_weights__4__0,
    "set_screen_shadow": method_set_screen_shadow,
    "set_pens": method_set_pens,
    "set_use_cart_vectors": method_set_use_cart_vectors,
    "set_palette_bank": method_set_palette_bank,
    "screen_update": method_screen_update,
    "sprite_on_scanline": method_sprite_on_scanline,
    "lock1_w": method_lock1_w,
    "unlock2_w": method_unlock2_w,
    "regsel_w": method_regsel_w,
    "set_use_cart_audio": method_set_use_cart_audio,
    "set_save_ram_unlock": method_set_save_ram_unlock,
    "startsel_edge_joy_r": method_startsel_edge_joy_r,
    "io_control_w__base": method_io_control_w__base
  };
  return __methodTable;
})();
    return {
      "neogeo_base_state.audio_command_w": methods["audio_command_w"],
      "neogeo_base_state.unmapped_r": methods["unmapped_r"],
      "neogeo_base_state.video_register_r": methods["video_register_r"],
      "neogeo_base_state.get_video_control": methods["get_video_control"],
      "neogeo_base_state.video_register_w": methods["video_register_w"],
      "neogeo_base_state.set_video_control": methods["set_video_control"],
      "neogeo_base_state.set_display_position_interrupt_control": methods["set_display_position_interrupt_control"],
      "neogeo_base_state.set_display_counter_msb": methods["set_display_counter_msb"],
      "neogeo_base_state.set_display_counter_lsb": methods["set_display_counter_lsb"],
      "neogeo_base_state.adjust_display_position_interrupt_timer": methods["adjust_display_position_interrupt_timer"],
      "neogeo_base_state.acknowledge_interrupt": methods["acknowledge_interrupt"],
      "neogeo_base_state.update_interrupts": methods["update_interrupts"],
      "neogeo_base_state.paletteram_r": methods["paletteram_r"],
      "neogeo_base_state.paletteram_w": methods["paletteram_w"],
      "neogeo_base_state.audio_cpu_enable_nmi_w": methods["audio_cpu_enable_nmi_w"],
      "neogeo_base_state.audio_cpu_bank_select_r": methods["audio_cpu_bank_select_r"],
      "neogeo_base_state.display_position_interrupt_callback": methods["display_position_interrupt_callback"],
      "neogeo_base_state.display_position_vblank_callback": methods["display_position_vblank_callback"],
      "neogeo_base_state.vblank_interrupt_callback": methods["vblank_interrupt_callback"],
      "neogeo_base_state.memcard_r": methods["memcard_r"],
      "neogeo_base_state.memcard_w": methods["memcard_w"],
      "neogeo_base_state.create_rgb_lookups": methods["create_rgb_lookups"],
      "neogeo_base_state.set_screen_shadow": methods["set_screen_shadow"],
      "neogeo_base_state.set_pens": methods["set_pens"],
      "neogeo_base_state.set_use_cart_vectors": methods["set_use_cart_vectors"],
      "neogeo_base_state.set_palette_bank": methods["set_palette_bank"],
      "neogeo_base_state.screen_update": methods["screen_update"],
      "neogeo_base_state.io_control_w__base": methods["io_control_w__base"],
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


  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
    }
  }

  function method_unmapped_r(runtime: any, space: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.pc"], __L1: any = __l["space.read_word"], __L2: any = __l["read_word"];
    let __t0: any;

    let ret: any = ((0) & 0xffff);
    if ((members.m_recurse ?? runtime.member("m_recurse"))) {
      ret = ((65535) & 0xffff);
    } else {
      members.m_recurse = ((1) ? 1 : 0);
      ret = (((__L1 ?? runtime.memberCall(space, "read_word", 0, __L2))((__L0 ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))())) & 0xffff);
      members.m_recurse = ((0) ? 1 : 0);
    }
    return ret;
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((members.m_regsel ?? runtime.member("m_regsel"))) {
      return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
    } else {
      return 65535;
    }
  }

  function method_video_register_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_videoram_offset"], __L1: any = __l["m_sprgen.set_videoram_data"], __L2: any = __l["m_sprgen.set_videoram_modulo"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((mem_mask) !== (255)) ? 1 : 0)) {
      if ((((mem_mask) === (65280)) ? 1 : 0)) {
        data = ((((((data) & (65280))) | (((data) >>> (8))))) & 0xffff);
      }
      switch ((offset as number)) {
        case 0:
        {
          (__L0 ?? runtime.memberCall(members.m_sprgen, "set_videoram_offset", 0, undefined))(data);
          break;
        }
        case 1:
        {
          (__L1 ?? runtime.memberCall(members.m_sprgen, "set_videoram_data", 0, undefined))(data);
          break;
        }
        case 2:
        {
          (__L2 ?? runtime.memberCall(members.m_sprgen, "set_videoram_modulo", 0, undefined))(data);
          break;
        }
        case 3:
        {
          (runtime.overrides["set_video_control"] ? runtime.overrides["set_video_control"](data) : method_set_video_control(runtime, data));
          break;
        }
        case 4:
        {
          (runtime.overrides["set_display_counter_msb"] ? runtime.overrides["set_display_counter_msb"](data) : method_set_display_counter_msb(runtime, data));
          break;
        }
        case 5:
        {
          (runtime.overrides["set_display_counter_lsb"] ? runtime.overrides["set_display_counter_lsb"](data) : method_set_display_counter_lsb(runtime, data));
          break;
        }
        case 6:
        {
          (runtime.overrides["acknowledge_interrupt"] ? runtime.overrides["acknowledge_interrupt"](data) : method_acknowledge_interrupt(runtime, data));
          break;
        }
        case 7:
        {
          break;
        }
      }
    }
  }

  function method_set_video_control(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_auto_animation_speed"], __L1: any = __l["m_sprgen.set_auto_animation_disabled"];

    data = ((data) & 0xffff);
    if (0) {
      0;
    }
    (__L0 ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_speed", 0, undefined))(((data) >>> (8)));
    (__L1 ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_disabled", 0, undefined))((((data) >>> (3)) & 1));
    (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
  }

  function method_set_display_position_interrupt_control(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_position_interrupt_control = ((data) & 0xff);
  }

  function method_set_display_counter_msb(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
    0;
  }

  function method_set_display_counter_lsb(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (4294901760))) | (data))) >>> 0);
    0;
    if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (5)) & 1)) {
      0;
      (runtime.overrides["adjust_display_position_interrupt_timer"] ? runtime.overrides["adjust_display_position_interrupt_timer"]() : method_adjust_display_position_interrupt_timer(runtime));
    }
  }

  function method_adjust_display_position_interrupt_timer(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["attotime::from_ticks"], __L1: any = __l["m_display_position_interrupt_timer.adjust"], __L2: any = __l["adjust"];

    let period: any = (__L0 ? __L0((((members.m_display_counter ?? runtime.member("m_display_counter"))) + (1)), 6000000) : runtime.macro("attotime::from_ticks", (((members.m_display_counter ?? runtime.member("m_display_counter"))) + (1)), 6000000));
    0;
    (__L1 ?? runtime.memberCall(members.m_display_position_interrupt_timer, "adjust", 0, __L2))(period);
  }

  function method_acknowledge_interrupt(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    if ((((data) >>> (0)) & 1)) {
      members.m_irq3_pending = ((0) & 0xff);
    }
    if ((((data) >>> (1)) & 1)) {
      members.m_display_position_interrupt_pending = ((0) & 0xff);
    }
    if ((((data) >>> (2)) & 1)) {
      members.m_vblank_interrupt_pending = ((0) & 0xff);
    }
    (runtime.overrides["update_interrupts"] ? runtime.overrides["update_interrupts"]() : method_update_interrupts(runtime));
  }

  function method_update_interrupts(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(3, (((members.m_irq3_pending ?? runtime.member("m_irq3_pending"))) ? (1) : (0)));
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))((members.m_raster_level ?? runtime.member("m_raster_level")), (((members.m_display_position_interrupt_pending ?? runtime.member("m_display_position_interrupt_pending"))) ? (1) : (0)));
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))((members.m_vblank_level ?? runtime.member("m_vblank_level")), (((members.m_vblank_interrupt_pending ?? runtime.member("m_vblank_interrupt_pending"))) ? (1) : (0)));
  }

  function method_paletteram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
  }

  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_color"];

    data = ((data) & 0xffff);
    offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let dark: any = ((((data) >>> (15))) & 0xff);
    let r: any = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
    let g: any = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
    let b: any = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark));
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2))));
  }

  function method_save_ram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
      runtime.combineData(__addr_save_ram_w(runtime, (members.m_save_ram ?? runtime.member("m_save_ram")), offset), data, mem_mask);
    }
  }
  function __addr_save_ram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_audio_cpu_enable_nmi_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audionmi.in_w_1"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_audionmi, "in_w_1", 0, undefined))(((((~offset)) >>> (4)) & 1));
  }

  function method_audio_cpu_bank_select_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      runtime.memberCall(runtime.readIndex((members.m_bank_audio_cart ?? runtime.member("m_bank_audio_cart")), ((offset) & (3))), "set_entry", 0, undefined)(((offset) >>> (8)));
    }
    return 0;
  }

  function method_in0_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in0_r"], __L1: any = __l["m_ctrl1.read_ctrl"], __L2: any = __l["m_dsw.read"], __L3: any = __l["read"];
    let __t0: any, __t1: any, __t2: any;

    return (((((((__L0 ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) & ((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_ctrl", 0, undefined))()))) << (8))) | ((__L2 ?? runtime.memberCall(members.m_dsw, "read", 0, __L3))()));
  }

  function method_in0_edge_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in0_r"], __L1: any = __l["m_dsw.read"], __L2: any = __l["read"];
    let __t0: any, __t1: any;

    return (((((__L0 ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) << (8))) | ((__L1 ?? runtime.memberCall(members.m_dsw, "read", 0, __L2))()));
  }

  function method_in1_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in1_r"], __L1: any = __l["m_ctrl2.read_ctrl"];
    let __t0: any, __t1: any;

    return (((((((__L0 ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) & ((__L1 ?? runtime.memberCall(members.m_ctrl2, "read_ctrl", 0, undefined))()))) << (8))) | (255));
  }

  function method_in1_edge_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in1_r"];
    let __t0: any;

    return (((((__L0 ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) << (8))) | (255));
  }

  function method_memcard_r(runtime: any, offset: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_maincpu.eat_cycles"], __L3: any = __l["m_memcard.present"], __L4: any = __l["m_memcard.read"];
    let __t0: any;

    mem_mask = ((mem_mask) & 0xffff);
    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
    }
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__L3 ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
      return (__L4 ?? runtime.memberCall(members.m_memcard, "read", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)));
    } else {
      return 65535;
    }
  }

  function method_memcard_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.eat_cycles"], __L1: any = __l["m_memcard.present"], __L2: any = __l["m_memcard.write"];
    let __t0: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_memcard, "write", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data);
    }
  }

  function method_create_rgb_lookups(runtime: any): any {
    const members = runtime.members;

    let resistances: any = new Int32Array([3900, 2200, 1000, 470, 220]);
    let weights_normal: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    let scaler: any = (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, -1, 5, resistances, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, -1, 5, resistances, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_dark: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_dark, 8200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_dark, 8200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_shadow: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_shadow, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_shadow, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_dark_shadow: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_dark_shadow, ((1) / (__add_create_rgb_lookups(runtime, ((1) / (8200)), ((1) / (150))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_dark_shadow, ((1) / (__add_create_rgb_lookups(runtime, ((1) / (8200)), ((1) / (150))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let i4: any = (((((i) >>> (4)) & 1)) | 0);
      let i3: any = (((((i) >>> (3)) & 1)) | 0);
      let i2: any = (((((i) >>> (2)) & 1)) | 0);
      let i1: any = (((((i) >>> (1)) & 1)) | 0);
      let i0: any = (((((i) >>> (0)) & 1)) | 0);
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 0, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_normal, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_normal, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 1, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_dark, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_dark, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 2, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_shadow, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_shadow, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 3, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_dark_shadow, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_dark_shadow, i0, i1, i2, i3, i4)));
    }
  }
  function __add_create_rgb_lookups(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
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

  function method_combine_weights__int__5(runtime: any, tab: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__5(runtime, (runtime.overrides["emu_detail__combine_weights__0__4"] ? runtime.overrides["emu_detail__combine_weights__0__4"](tab, w_0, w_1, w_2, w_3, w_4) : method_emu_detail__combine_weights__0__4(runtime, tab, w_0, w_1, w_2, w_3, w_4)), 0.5)) | 0);
  }
  function __add_combine_weights__int__5(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__4(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__4(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__3"] ? runtime.overrides["emu_detail__combine_weights__1__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__1__3(runtime, tab, w_0, w_1, w_2, w_3)));
  }
  function __add_emu_detail__combine_weights__0__4(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__3(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__3(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__2"] ? runtime.overrides["emu_detail__combine_weights__2__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__2__2(runtime, tab, w_0, w_1, w_2)));
  }
  function __add_emu_detail__combine_weights__1__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__2__2(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__1"] ? runtime.overrides["emu_detail__combine_weights__3__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__3__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__2__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__3__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__3__1(runtime, ((runtime.readIndex(tab, 3)) * (w0)), (runtime.overrides["emu_detail__combine_weights__4__0"] ? runtime.overrides["emu_detail__combine_weights__4__0"](tab, w_0) : method_emu_detail__combine_weights__4__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__3__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__4__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 4)) * (w));
  }

  function method_set_screen_shadow(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_screen_shadow = ((state) ? 1 : 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_set_pens(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.pens"], __L1: any = __l["m_sprgen.set_pens"];
    let __t0: any;

    let pen_base: any = __add_set_pens(runtime, __add_set_pens(runtime, (__L0 ?? runtime.memberCall(members.m_palette, "pens", 0, undefined))(), (members.m_palette_bank ?? runtime.member("m_palette_bank"))), (((members.m_screen_shadow ?? runtime.member("m_screen_shadow"))) ? (8192) : (0))); let pen_base$s: any = undefined, pen_base$o: any = 0; if (ArrayBuffer.isView(pen_base) || Array.isArray(pen_base)) pen_base$s = pen_base; else if (pen_base !== null && typeof pen_base === 'object' && pen_base.generatedPointer === true && pen_base.path === undefined && pen_base.target === undefined && (ArrayBuffer.isView(pen_base.source) || Array.isArray(pen_base.source))) { pen_base$s = pen_base.source; pen_base$o = pen_base.offset; }
    (__L1 ?? runtime.memberCall(members.m_sprgen, "set_pens", 0, undefined))(pen_base);
    members.m_bg_pen = __addr_set_pens(runtime, pen_base, 4095);
  }
  function __add_set_pens(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_set_pens(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_set_use_cart_vectors(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_use_cart_vectors = ((state) & 0xff);
  }

  function method_set_palette_bank(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_palette_bank = ((((state) ? (4096) : (0))) >>> 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_sprite_on_scanline(runtime: any, scanline: any, y: any, rows: any): any {
    const members = runtime.members;

    return (((((((((rows) === (0)) ? 1 : 0)) || ((((rows) >= (32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_draw_fixed_layer_2pixels(runtime: any, pixel_addr: any, offset: any, gfx_base: any, char_pens: any): any {
    const members = runtime.members;

    let data: any = ((runtime.readIndex(gfx_base, offset)) & 0xff);
    if (((data) & (15))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
    }
    pixel_addr.offset += 1;
    if (((data) & (240))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, runtime.shiftRight(((data) & (240)), 4)));
    }
    pixel_addr.offset += 1;
    return pixel_addr;
  }

  function method_lock1_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_lock1 = state;
  }

  function method_unlock2_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_unlock2 = state;
  }

  function method_regsel_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_regsel = state;
  }

  function method_set_use_cart_audio(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_fixed_layer_source"], __L1: any = __l["m_bank_audio_main.set_entry"], __L2: any = __l["set_entry"];

    members.m_use_cart_audio = ((state) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_sprgen, "set_fixed_layer_source", 0, undefined))(state);
    (__L1 ?? runtime.memberCall(members.m_bank_audio_main, "set_entry", 0, __L2))((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio")));
  }

  function method_set_save_ram_unlock(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_save_ram_unlocked = ((state) & 0xff);
  }

  function method_startsel_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.read_start_sel"], __L1: any = __l["m_ctrl1.read_start_sel"], __L2: any = __l["m_ctrl2.read_start_sel"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    let ret: any = (((((__L0 ?? runtime.memberCall(members.m_edge, "read_start_sel", 0, undefined))()) | (-6))) >>> 0);
    if (h_m_ctrl1) {
      ret = ((((ret) & ((((((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_start_sel", 0, undefined))()) << (0))) | (-4))))) >>> 0);
    }
    if (h_m_ctrl2) {
      ret = ((((ret) & ((((((__L2 ?? runtime.memberCall(members.m_ctrl2, "read_start_sel", 0, undefined))()) << (2))) | (-13))))) >>> 0);
    }
    return ret;
  }

  function method_io_control_w__base(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ctrl1.write_ctrlsel"], __L1: any = __l["m_ctrl2.write_ctrlsel"], __L2: any = __l["m_edge.write_ctrlsel"];

    data = ((data) & 0xff);
    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    const h_m_edge = members.m_edge ?? runtime.member("m_edge");
    switch ((((offset) & (56)) as number)) {
      case 0:
      {
        if (h_m_ctrl1) {
          (__L0 ?? runtime.memberCall(members.m_ctrl1, "write_ctrlsel", 0, undefined))(((data) & (7)));
        }
        if (h_m_ctrl2) {
          (__L1 ?? runtime.memberCall(members.m_ctrl2, "write_ctrlsel", 0, undefined))(((((data) >>> (3))) & (7)));
        }
        if (h_m_edge) {
          (__L2 ?? runtime.memberCall(members.m_edge, "write_ctrlsel", 0, undefined))(((data) & (63)));
        }
        break;
      }
      case 8:
      {
        members.m_card_bank = ((((data) & (7))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "write": method_write,
    "unmapped_r": method_unmapped_r,
    "read": method_read,
    "video_register_w": method_video_register_w,
    "set_video_control": method_set_video_control,
    "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
    "set_display_counter_msb": method_set_display_counter_msb,
    "set_display_counter_lsb": method_set_display_counter_lsb,
    "adjust_display_position_interrupt_timer": method_adjust_display_position_interrupt_timer,
    "acknowledge_interrupt": method_acknowledge_interrupt,
    "update_interrupts": method_update_interrupts,
    "paletteram_r": method_paletteram_r,
    "paletteram_w": method_paletteram_w,
    "save_ram_w": method_save_ram_w,
    "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
    "audio_cpu_bank_select_r": method_audio_cpu_bank_select_r,
    "in0_edge_joy_r": method_in0_edge_joy_r,
    "in0_edge_r": method_in0_edge_r,
    "in1_edge_joy_r": method_in1_edge_joy_r,
    "in1_edge_r": method_in1_edge_r,
    "memcard_r": method_memcard_r,
    "memcard_w": method_memcard_w,
    "create_rgb_lookups": method_create_rgb_lookups,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__5": method_combine_weights__int__5,
    "emu_detail__combine_weights__0__4": method_emu_detail__combine_weights__0__4,
    "emu_detail__combine_weights__1__3": method_emu_detail__combine_weights__1__3,
    "emu_detail__combine_weights__2__2": method_emu_detail__combine_weights__2__2,
    "emu_detail__combine_weights__3__1": method_emu_detail__combine_weights__3__1,
    "emu_detail__combine_weights__4__0": method_emu_detail__combine_weights__4__0,
    "set_screen_shadow": method_set_screen_shadow,
    "set_pens": method_set_pens,
    "set_use_cart_vectors": method_set_use_cart_vectors,
    "set_palette_bank": method_set_palette_bank,
    "sprite_on_scanline": method_sprite_on_scanline,
    "lock1_w": method_lock1_w,
    "unlock2_w": method_unlock2_w,
    "regsel_w": method_regsel_w,
    "set_use_cart_audio": method_set_use_cart_audio,
    "set_save_ram_unlock": method_set_save_ram_unlock,
    "startsel_edge_joy_r": method_startsel_edge_joy_r,
    "io_control_w__base": method_io_control_w__base
  };
  return __methodTable;
})();
    return {
      "ngarcade_base_state.unmapped_r": methods["unmapped_r"],
      "ngarcade_base_state.save_ram_w": methods["save_ram_w"],
      "ngarcade_base_state.in0_edge_joy_r": methods["in0_edge_joy_r"],
      "ngarcade_base_state.in0_edge_r": methods["in0_edge_r"],
      "ngarcade_base_state.in1_edge_joy_r": methods["in1_edge_joy_r"],
      "ngarcade_base_state.in1_edge_r": methods["in1_edge_r"],
      "ngarcade_base_state.memcard_r": methods["memcard_r"],
      "ngarcade_base_state.memcard_w": methods["memcard_w"],
      "ngarcade_base_state.set_use_cart_audio": methods["set_use_cart_audio"],
      "ngarcade_base_state.set_save_ram_unlock": methods["set_save_ram_unlock"],
      "ngarcade_base_state.startsel_edge_joy_r": methods["startsel_edge_joy_r"],
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


  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    if (((((((members.m_lock1 ?? runtime.member("m_lock1"))) ? 0 : 1)) && ((members.m_unlock2 ?? runtime.member("m_unlock2")))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_memcard_data"), ((offset) & (2047)), ((((data) & (255))) & 0xff));
    }
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((members.m_regsel ?? runtime.member("m_regsel"))) {
      return ((65280) | (runtime.readIndex((members.m_memcard_data ?? runtime.member("m_memcard_data")), ((offset) & (2047)))));
    } else {
      return 65535;
    }
  }

  function method_video_register_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_videoram_offset"], __L1: any = __l["m_sprgen.set_videoram_data"], __L2: any = __l["m_sprgen.set_videoram_modulo"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((((mem_mask) !== (255)) ? 1 : 0)) {
      if ((((mem_mask) === (65280)) ? 1 : 0)) {
        data = ((((((data) & (65280))) | (((data) >>> (8))))) & 0xffff);
      }
      switch ((offset as number)) {
        case 0:
        {
          (__L0 ?? runtime.memberCall(members.m_sprgen, "set_videoram_offset", 0, undefined))(data);
          break;
        }
        case 1:
        {
          (__L1 ?? runtime.memberCall(members.m_sprgen, "set_videoram_data", 0, undefined))(data);
          break;
        }
        case 2:
        {
          (__L2 ?? runtime.memberCall(members.m_sprgen, "set_videoram_modulo", 0, undefined))(data);
          break;
        }
        case 3:
        {
          (runtime.overrides["set_video_control"] ? runtime.overrides["set_video_control"](data) : method_set_video_control(runtime, data));
          break;
        }
        case 4:
        {
          (runtime.overrides["set_display_counter_msb"] ? runtime.overrides["set_display_counter_msb"](data) : method_set_display_counter_msb(runtime, data));
          break;
        }
        case 5:
        {
          (runtime.overrides["set_display_counter_lsb"] ? runtime.overrides["set_display_counter_lsb"](data) : method_set_display_counter_lsb(runtime, data));
          break;
        }
        case 6:
        {
          (runtime.overrides["acknowledge_interrupt"] ? runtime.overrides["acknowledge_interrupt"](data) : method_acknowledge_interrupt(runtime, data));
          break;
        }
        case 7:
        {
          break;
        }
      }
    }
  }

  function method_set_video_control(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_auto_animation_speed"], __L1: any = __l["m_sprgen.set_auto_animation_disabled"];

    data = ((data) & 0xffff);
    if (0) {
      0;
    }
    (__L0 ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_speed", 0, undefined))(((data) >>> (8)));
    (__L1 ?? runtime.memberCall(members.m_sprgen, "set_auto_animation_disabled", 0, undefined))((((data) >>> (3)) & 1));
    (runtime.overrides["set_display_position_interrupt_control"] ? runtime.overrides["set_display_position_interrupt_control"](((data) & (240))) : method_set_display_position_interrupt_control(runtime, ((data) & (240))));
  }

  function method_set_display_position_interrupt_control(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_position_interrupt_control = ((data) & 0xff);
  }

  function method_set_display_counter_msb(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (65535))) | (((((data) >>> 0)) << (16))))) >>> 0);
    0;
  }

  function method_set_display_counter_lsb(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_display_counter = (((((((members.m_display_counter ?? runtime.member("m_display_counter"))) & (4294901760))) | (data))) >>> 0);
    0;
    if (((((members.m_display_position_interrupt_control ?? runtime.member("m_display_position_interrupt_control"))) >>> (5)) & 1)) {
      0;
      (runtime.overrides["adjust_display_position_interrupt_timer"] ? runtime.overrides["adjust_display_position_interrupt_timer"]() : method_adjust_display_position_interrupt_timer(runtime));
    }
  }

  function method_adjust_display_position_interrupt_timer(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["attotime::from_ticks"], __L1: any = __l["m_display_position_interrupt_timer.adjust"], __L2: any = __l["adjust"];

    let period: any = (__L0 ? __L0((((members.m_display_counter ?? runtime.member("m_display_counter"))) + (1)), 6000000) : runtime.macro("attotime::from_ticks", (((members.m_display_counter ?? runtime.member("m_display_counter"))) + (1)), 6000000));
    0;
    (__L1 ?? runtime.memberCall(members.m_display_position_interrupt_timer, "adjust", 0, __L2))(period);
  }

  function method_acknowledge_interrupt(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    if ((((data) >>> (0)) & 1)) {
      members.m_irq3_pending = ((0) & 0xff);
    }
    if ((((data) >>> (1)) & 1)) {
      members.m_display_position_interrupt_pending = ((0) & 0xff);
    }
    if ((((data) >>> (2)) & 1)) {
      members.m_vblank_interrupt_pending = ((0) & 0xff);
    }
    (runtime.overrides["update_interrupts"] ? runtime.overrides["update_interrupts"]() : method_update_interrupts(runtime));
  }

  function method_update_interrupts(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(3, (((members.m_irq3_pending ?? runtime.member("m_irq3_pending"))) ? (1) : (0)));
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))((members.m_raster_level ?? runtime.member("m_raster_level")), (((members.m_display_position_interrupt_pending ?? runtime.member("m_display_position_interrupt_pending"))) ? (1) : (0)));
    (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))((members.m_vblank_level ?? runtime.member("m_vblank_level")), (((members.m_vblank_interrupt_pending ?? runtime.member("m_vblank_interrupt_pending"))) ? (1) : (0)));
  }

  function method_paletteram_r(runtime: any, offset: any): any {
    const members = runtime.members;

    return runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) + (offset)));
  }

  function method_paletteram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_color"];

    data = ((data) & 0xffff);
    offset = ((offset) + ((members.m_palette_bank ?? runtime.member("m_palette_bank"))));
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    let dark: any = ((((data) >>> (15))) & 0xff);
    let r: any = ((((((((data) >>> (14))) & (1))) | (((((data) >>> (7))) & (30))))) & 0xff);
    let g: any = ((((((((data) >>> (13))) & (1))) | (((((data) >>> (3))) & (30))))) & 0xff);
    let b: any = ((((((((data) >>> (12))) & (1))) | (((((data) << (1))) & (30))))) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(offset, runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), dark), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), dark));
    (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(((offset) + (8192)), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), r), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), g), ((dark) + (2))), runtime.readIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), b), ((dark) + (2))));
  }

  function method_save_ram_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    if ((members.m_save_ram_unlocked ?? runtime.member("m_save_ram_unlocked"))) {
      runtime.combineData(__addr_save_ram_w(runtime, (members.m_save_ram ?? runtime.member("m_save_ram")), offset), data, mem_mask);
    }
  }
  function __addr_save_ram_w(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_audio_cpu_enable_nmi_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_audionmi.in_w_1"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_audionmi, "in_w_1", 0, undefined))(((((~offset)) >>> (4)) & 1));
  }

  function method_audio_cpu_bank_select_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      runtime.memberCall(runtime.readIndex((members.m_bank_audio_cart ?? runtime.member("m_bank_audio_cart")), ((offset) & (3))), "set_entry", 0, undefined)(((offset) >>> (8)));
    }
    return 0;
  }

  function method_in0_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in0_r"], __L1: any = __l["m_ctrl1.read_ctrl"], __L2: any = __l["m_dsw.read"], __L3: any = __l["read"];
    let __t0: any, __t1: any, __t2: any;

    return (((((((__L0 ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) & ((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_ctrl", 0, undefined))()))) << (8))) | ((__L2 ?? runtime.memberCall(members.m_dsw, "read", 0, __L3))()));
  }

  function method_in0_edge_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in0_r"], __L1: any = __l["m_dsw.read"], __L2: any = __l["read"];
    let __t0: any, __t1: any;

    return (((((__L0 ?? runtime.memberCall(members.m_edge, "in0_r", 0, undefined))()) << (8))) | ((__L1 ?? runtime.memberCall(members.m_dsw, "read", 0, __L2))()));
  }

  function method_in1_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in1_r"], __L1: any = __l["m_ctrl2.read_ctrl"];
    let __t0: any, __t1: any;

    return (((((((__L0 ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) & ((__L1 ?? runtime.memberCall(members.m_ctrl2, "read_ctrl", 0, undefined))()))) << (8))) | (255));
  }

  function method_in1_edge_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.in1_r"];
    let __t0: any;

    return (((((__L0 ?? runtime.memberCall(members.m_edge, "in1_r", 0, undefined))()) << (8))) | (255));
  }

  function method_memcard_r(runtime: any, offset: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_maincpu.eat_cycles"], __L3: any = __l["m_memcard.present"], __L4: any = __l["m_memcard.read"];
    let __t0: any;

    mem_mask = ((mem_mask) & 0xffff);
    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
    }
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__L3 ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
      return (__L4 ?? runtime.memberCall(members.m_memcard, "read", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)));
    } else {
      return 65535;
    }
  }

  function method_memcard_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.eat_cycles"], __L1: any = __l["m_memcard.present"], __L2: any = __l["m_memcard.write"];
    let __t0: any;

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    (__L0 ?? runtime.memberCall(members.m_maincpu, "eat_cycles", 0, undefined))(2);
    if (((((((mem_mask) & 0xff00) ? 1 : 0)) && ((__L1 ?? runtime.memberCall(members.m_memcard, "present", 0, undefined))())) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_memcard, "write", 0, undefined))((((((members.m_card_bank ?? runtime.member("m_card_bank"))) << (21))) | (offset)), data);
    }
  }

  function method_create_rgb_lookups(runtime: any): any {
    const members = runtime.members;

    let resistances: any = new Int32Array([3900, 2200, 1000, 470, 220]);
    let weights_normal: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    let scaler: any = (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, -1, 5, resistances, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, -1, 5, resistances, weights_normal, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_dark: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_dark, 8200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_dark, 8200, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_shadow: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_shadow, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_shadow, 150, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    let weights_dark_shadow: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](5) : new Uint8Array(Math.max(0, Number(5)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, scaler, 5, resistances, weights_dark_shadow, ((1) / (__add_create_rgb_lookups(runtime, ((1) / (8200)), ((1) / (150))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, scaler, 5, resistances, weights_dark_shadow, ((1) / (__add_create_rgb_lookups(runtime, ((1) / (8200)), ((1) / (150))))), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0));
    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let i4: any = (((((i) >>> (4)) & 1)) | 0);
      let i3: any = (((((i) >>> (3)) & 1)) | 0);
      let i2: any = (((((i) >>> (2)) & 1)) | 0);
      let i1: any = (((((i) >>> (1)) & 1)) | 0);
      let i0: any = (((((i) >>> (0)) & 1)) | 0);
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 0, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_normal, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_normal, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 1, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_dark, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_dark, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 2, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_shadow, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_shadow, i0, i1, i2, i3, i4)));
      runtime.writeIndex(runtime.readIndex((members.m_palette_lookup ?? runtime.member("m_palette_lookup")), i), 3, (runtime.overrides["combine_weights__int__5"] ? runtime.overrides["combine_weights__int__5"](weights_dark_shadow, i0, i1, i2, i3, i4) : method_combine_weights__int__5(runtime, weights_dark_shadow, i0, i1, i2, i3, i4)));
    }
  }
  function __add_create_rgb_lookups(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
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

  function method_combine_weights__int__5(runtime: any, tab: any, w_0: any, w_1: any, w_2: any, w_3: any, w_4: any): any {
    const members = runtime.members;

    return ((__add_combine_weights__int__5(runtime, (runtime.overrides["emu_detail__combine_weights__0__4"] ? runtime.overrides["emu_detail__combine_weights__0__4"](tab, w_0, w_1, w_2, w_3, w_4) : method_emu_detail__combine_weights__0__4(runtime, tab, w_0, w_1, w_2, w_3, w_4)), 0.5)) | 0);
  }
  function __add_combine_weights__int__5(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__0__4(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any, w_3: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__0__4(runtime, ((runtime.readIndex(tab, 0)) * (w0)), (runtime.overrides["emu_detail__combine_weights__1__3"] ? runtime.overrides["emu_detail__combine_weights__1__3"](tab, w_0, w_1, w_2, w_3) : method_emu_detail__combine_weights__1__3(runtime, tab, w_0, w_1, w_2, w_3)));
  }
  function __add_emu_detail__combine_weights__0__4(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__1__3(runtime: any, tab: any, w0: any, w_0: any, w_1: any, w_2: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__1__3(runtime, ((runtime.readIndex(tab, 1)) * (w0)), (runtime.overrides["emu_detail__combine_weights__2__2"] ? runtime.overrides["emu_detail__combine_weights__2__2"](tab, w_0, w_1, w_2) : method_emu_detail__combine_weights__2__2(runtime, tab, w_0, w_1, w_2)));
  }
  function __add_emu_detail__combine_weights__1__3(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__2__2(runtime: any, tab: any, w0: any, w_0: any, w_1: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__2__2(runtime, ((runtime.readIndex(tab, 2)) * (w0)), (runtime.overrides["emu_detail__combine_weights__3__1"] ? runtime.overrides["emu_detail__combine_weights__3__1"](tab, w_0, w_1) : method_emu_detail__combine_weights__3__1(runtime, tab, w_0, w_1)));
  }
  function __add_emu_detail__combine_weights__2__2(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__3__1(runtime: any, tab: any, w0: any, w_0: any): any {
    const members = runtime.members;

    return __add_emu_detail__combine_weights__3__1(runtime, ((runtime.readIndex(tab, 3)) * (w0)), (runtime.overrides["emu_detail__combine_weights__4__0"] ? runtime.overrides["emu_detail__combine_weights__4__0"](tab, w_0) : method_emu_detail__combine_weights__4__0(runtime, tab, w_0)));
  }
  function __add_emu_detail__combine_weights__3__1(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_emu_detail__combine_weights__4__0(runtime: any, tab: any, w: any): any {
    const members = runtime.members;

    return ((runtime.readIndex(tab, 4)) * (w));
  }

  function method_set_screen_shadow(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_screen_shadow = ((state) ? 1 : 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_set_pens(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.pens"], __L1: any = __l["m_sprgen.set_pens"];
    let __t0: any;

    let pen_base: any = __add_set_pens(runtime, __add_set_pens(runtime, (__L0 ?? runtime.memberCall(members.m_palette, "pens", 0, undefined))(), (members.m_palette_bank ?? runtime.member("m_palette_bank"))), (((members.m_screen_shadow ?? runtime.member("m_screen_shadow"))) ? (8192) : (0))); let pen_base$s: any = undefined, pen_base$o: any = 0; if (ArrayBuffer.isView(pen_base) || Array.isArray(pen_base)) pen_base$s = pen_base; else if (pen_base !== null && typeof pen_base === 'object' && pen_base.generatedPointer === true && pen_base.path === undefined && pen_base.target === undefined && (ArrayBuffer.isView(pen_base.source) || Array.isArray(pen_base.source))) { pen_base$s = pen_base.source; pen_base$o = pen_base.offset; }
    (__L1 ?? runtime.memberCall(members.m_sprgen, "set_pens", 0, undefined))(pen_base);
    members.m_bg_pen = __addr_set_pens(runtime, pen_base, 4095);
  }
  function __add_set_pens(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_set_pens(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_set_use_cart_vectors(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_use_cart_vectors = ((state) & 0xff);
  }

  function method_set_palette_bank(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_palette_bank = ((((state) ? (4096) : (0))) >>> 0);
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
  }

  function method_sprite_on_scanline(runtime: any, scanline: any, y: any, rows: any): any {
    const members = runtime.members;

    return (((((((((rows) === (0)) ? 1 : 0)) || ((((rows) >= (32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_draw_fixed_layer_2pixels(runtime: any, pixel_addr: any, offset: any, gfx_base: any, char_pens: any): any {
    const members = runtime.members;

    let data: any = ((runtime.readIndex(gfx_base, offset)) & 0xff);
    if (((data) & (15))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
    }
    pixel_addr.offset += 1;
    if (((data) & (240))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, runtime.shiftRight(((data) & (240)), 4)));
    }
    pixel_addr.offset += 1;
    return pixel_addr;
  }

  function method_lock1_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_lock1 = state;
  }

  function method_unlock2_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_unlock2 = state;
  }

  function method_regsel_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_regsel = state;
  }

  function method_set_use_cart_audio(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprgen.set_fixed_layer_source"], __L1: any = __l["m_bank_audio_main.set_entry"], __L2: any = __l["set_entry"];

    members.m_use_cart_audio = ((state) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_sprgen, "set_fixed_layer_source", 0, undefined))(state);
    (__L1 ?? runtime.memberCall(members.m_bank_audio_main, "set_entry", 0, __L2))((members.m_use_cart_audio ?? runtime.member("m_use_cart_audio")));
  }

  function method_set_save_ram_unlock(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_save_ram_unlocked = ((state) & 0xff);
  }

  function method_startsel_edge_joy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_edge.read_start_sel"], __L1: any = __l["m_ctrl1.read_start_sel"], __L2: any = __l["m_ctrl2.read_start_sel"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    let ret: any = (((((__L0 ?? runtime.memberCall(members.m_edge, "read_start_sel", 0, undefined))()) | (-6))) >>> 0);
    if (h_m_ctrl1) {
      ret = ((((ret) & ((((((__L1 ?? runtime.memberCall(members.m_ctrl1, "read_start_sel", 0, undefined))()) << (0))) | (-4))))) >>> 0);
    }
    if (h_m_ctrl2) {
      ret = ((((ret) & ((((((__L2 ?? runtime.memberCall(members.m_ctrl2, "read_start_sel", 0, undefined))()) << (2))) | (-13))))) >>> 0);
    }
    return ret;
  }

  function method_io_control_w__base(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ctrl1.write_ctrlsel"], __L1: any = __l["m_ctrl2.write_ctrlsel"], __L2: any = __l["m_edge.write_ctrlsel"];

    data = ((data) & 0xff);
    const h_m_ctrl1 = members.m_ctrl1 ?? runtime.member("m_ctrl1");
    const h_m_ctrl2 = members.m_ctrl2 ?? runtime.member("m_ctrl2");
    const h_m_edge = members.m_edge ?? runtime.member("m_edge");
    switch ((((offset) & (56)) as number)) {
      case 0:
      {
        if (h_m_ctrl1) {
          (__L0 ?? runtime.memberCall(members.m_ctrl1, "write_ctrlsel", 0, undefined))(((data) & (7)));
        }
        if (h_m_ctrl2) {
          (__L1 ?? runtime.memberCall(members.m_ctrl2, "write_ctrlsel", 0, undefined))(((((data) >>> (3))) & (7)));
        }
        if (h_m_edge) {
          (__L2 ?? runtime.memberCall(members.m_edge, "write_ctrlsel", 0, undefined))(((data) & (63)));
        }
        break;
      }
      case 8:
      {
        members.m_card_bank = ((((data) & (7))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "write": method_write,
    "read": method_read,
    "video_register_w": method_video_register_w,
    "set_video_control": method_set_video_control,
    "set_display_position_interrupt_control": method_set_display_position_interrupt_control,
    "set_display_counter_msb": method_set_display_counter_msb,
    "set_display_counter_lsb": method_set_display_counter_lsb,
    "adjust_display_position_interrupt_timer": method_adjust_display_position_interrupt_timer,
    "acknowledge_interrupt": method_acknowledge_interrupt,
    "update_interrupts": method_update_interrupts,
    "paletteram_r": method_paletteram_r,
    "paletteram_w": method_paletteram_w,
    "save_ram_w": method_save_ram_w,
    "audio_cpu_enable_nmi_w": method_audio_cpu_enable_nmi_w,
    "audio_cpu_bank_select_r": method_audio_cpu_bank_select_r,
    "in0_edge_joy_r": method_in0_edge_joy_r,
    "in0_edge_r": method_in0_edge_r,
    "in1_edge_joy_r": method_in1_edge_joy_r,
    "in1_edge_r": method_in1_edge_r,
    "memcard_r": method_memcard_r,
    "memcard_w": method_memcard_w,
    "create_rgb_lookups": method_create_rgb_lookups,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__5": method_combine_weights__int__5,
    "emu_detail__combine_weights__0__4": method_emu_detail__combine_weights__0__4,
    "emu_detail__combine_weights__1__3": method_emu_detail__combine_weights__1__3,
    "emu_detail__combine_weights__2__2": method_emu_detail__combine_weights__2__2,
    "emu_detail__combine_weights__3__1": method_emu_detail__combine_weights__3__1,
    "emu_detail__combine_weights__4__0": method_emu_detail__combine_weights__4__0,
    "set_screen_shadow": method_set_screen_shadow,
    "set_pens": method_set_pens,
    "set_use_cart_vectors": method_set_use_cart_vectors,
    "set_palette_bank": method_set_palette_bank,
    "sprite_on_scanline": method_sprite_on_scanline,
    "lock1_w": method_lock1_w,
    "unlock2_w": method_unlock2_w,
    "regsel_w": method_regsel_w,
    "set_use_cart_audio": method_set_use_cart_audio,
    "set_save_ram_unlock": method_set_save_ram_unlock,
    "startsel_edge_joy_r": method_startsel_edge_joy_r,
    "io_control_w__base": method_io_control_w__base
  };
  return __methodTable;
})();
    return {
      "mvs_led_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "mvs_led_state.combine_weights__int__5": methods["combine_weights__int__5"],
      "mvs_led_state.emu_detail__combine_weights__0__4": methods["emu_detail__combine_weights__0__4"],
      "mvs_led_state.emu_detail__combine_weights__1__3": methods["emu_detail__combine_weights__1__3"],
      "mvs_led_state.emu_detail__combine_weights__2__2": methods["emu_detail__combine_weights__2__2"],
      "mvs_led_state.emu_detail__combine_weights__3__1": methods["emu_detail__combine_weights__3__1"],
      "mvs_led_state.emu_detail__combine_weights__4__0": methods["emu_detail__combine_weights__4__0"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adjust","attotime::from_ticks","attotime::from_usec","bitmap.fill","fatalerror","fill","m_audionmi.in_w_1","m_bank_audio_main.set_entry","m_ctrl1.read_ctrl","m_ctrl1.read_start_sel","m_ctrl1.write_ctrlsel","m_ctrl2.read_ctrl","m_ctrl2.read_start_sel","m_ctrl2.write_ctrlsel","m_display_position_interrupt_timer.adjust","m_display_position_vblank_timer.adjust","m_dsw.read","m_edge.in0_r","m_edge.in1_r","m_edge.read_start_sel","m_edge.write_ctrlsel","m_maincpu.eat_cycles","m_maincpu.pc","m_maincpu.set_input_line","m_memcard.present","m_memcard.read","m_memcard.write","m_palette.pens","m_palette.set_pen_color","m_screen.time_until_pos","m_screen.vpos","m_soundlatch.write","m_sprgen.draw_fixed_layer","m_sprgen.draw_sprites","m_sprgen.get_auto_animation_counter","m_sprgen.get_videoram_data","m_sprgen.get_videoram_modulo","m_sprgen.set_auto_animation_disabled","m_sprgen.set_auto_animation_speed","m_sprgen.set_fixed_layer_source","m_sprgen.set_pens","m_sprgen.set_videoram_data","m_sprgen.set_videoram_modulo","m_sprgen.set_videoram_offset","m_vblank_interrupt_timer.adjust","machine","machine().scheduler().perfect_quantum","machine().side_effects_disabled","read","read_word","set_entry","space.read_word","std::clamp"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
