// GENERATED executable machine composition from src/mame/atari/a2600.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'a2600');

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
  const __mame_table_0 = [262, 312, 328, 342];

  function method_draw_sprite_helper(runtime: any, p: any, col: any, gfx: any, GRP: any, COLUP: any, REFP: any): any {
    const members = runtime.members;

    GRP = ((GRP) & 0xff);
    COLUP = ((COLUP) & 0xff);
    REFP = ((REFP) & 0xff);
    let i: any = ((0) | 0);
    let j: any = ((0) | 0);
    let k: any = ((0) | 0);
    if (((REFP) & (8))) {
      GRP = ((((((GRP) >>> (0)) & 1) << 7 | (((GRP) >>> (1)) & 1) << 6 | (((GRP) >>> (2)) & 1) << 5 | (((GRP) >>> (3)) & 1) << 4 | (((GRP) >>> (4)) & 1) << 3 | (((GRP) >>> (5)) & 1) << 2 | (((GRP) >>> (6)) & 1) << 1 | (((GRP) >>> (7)) & 1) << 0)) & 0xff);
    }
    for (i = ((0) | 0); ((Number(i) < Number(4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let start_pos: any = ((runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).start_drawing, i)) | 0);
      for (j = ((runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).start_pixel, i)) | 0); (((j) < (8)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        for (k = ((0) | 0); ((Number(k) < Number(runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).size, i))) ? 1 : 0); k = ((((k) + (1))) | 0)) {
          if (((GRP) & (runtime.shiftRight(128, j)))) {
            if (((((((start_pos) < (160)) ? 1 : 0)) || (((runtime.readIndex(__deref_draw_sprite_helper(runtime, gfx).skipclip, i)) ? 0 : 1))) ? 1 : 0)) {
              runtime.writeIndex(p, ((start_pos) % (160)), ((COLUP) >>> (1)));
              runtime.writeIndex(col, ((start_pos) % (160)), ((COLUP) >>> (1)));
            }
          }
          start_pos = ((((start_pos) + (1))) | 0);
        }
      }
    }
  }
  function __deref_draw_sprite_helper(runtime: any, p: any): any {
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

  function method_collision_check(runtime: any, p1: any, p2: any, x1: any, x2: any): any {
    const members = runtime.members;

    let i: any = ((0) | 0);
    for (i = ((x1) | 0); (((i) < (x2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      if ((((((Number(runtime.readIndex(p1, i)) !== Number(255)) ? 1 : 0)) && (((Number(runtime.readIndex(p2, i)) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
        return 1;
      }
    }
    return 0;
  }

  function method_RSYNC_w(runtime: any): any {
    const members = runtime.members;


  }

  function method_HMCLR_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.invoke("HMP0_w", 0);
    runtime.invoke("HMP1_w", 0);
    runtime.invoke("HMM0_w", 0);
    runtime.invoke("HMM1_w", 0);
    runtime.invoke("HMBL_w", 0);
  }

  function method_a2600_read_input_port(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_joy1.read_pot_x"], __L1: any = __l["m_joy1.read_pot_y"], __L2: any = __l["m_joy2.read_pot_x"], __L3: any = __l["m_joy2.read_pot_y"], __L4: any = __l["m_joy1.read_joy"], __L5: any = __l["m_joy2.read_joy"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any, __t5: any;

    switch ((offset as number)) {
      case 0:
      {
        return (__L0 ?? runtime.memberCall(members.m_joy1, "read_pot_x", 0, undefined))();
      }
      case 1:
      {
        return (__L1 ?? runtime.memberCall(members.m_joy1, "read_pot_y", 0, undefined))();
      }
      case 2:
      {
        return (__L2 ?? runtime.memberCall(members.m_joy2, "read_pot_x", 0, undefined))();
      }
      case 3:
      {
        return (__L3 ?? runtime.memberCall(members.m_joy2, "read_pot_y", 0, undefined))();
      }
      case 4:
      {
        return (((((__L4 ?? runtime.memberCall(members.m_joy1, "read_joy", 0, undefined))()) & (32))) ? (255) : (127));
      }
      case 5:
      {
        return (((((__L5 ?? runtime.memberCall(members.m_joy2, "read_joy", 0, undefined))()) & (32))) ? (255) : (127));
      }
    }
    return 255;
  }

  function method_a2600_get_databus_contents(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.space"], __L1: any = __l["m_maincpu.pc"], __L2: any = __l["prog_space.read_byte"], __L3: any = __l["read_byte"];
    let __t0: any;

    let last_address: any = ((0) & 0xffff);
    let prev_address: any = ((0) & 0xffff);
    let last_byte: any = ((0) & 0xff);
    let prev_byte: any = ((0) & 0xff);
    let prog_space: any = (__L0 ?? runtime.memberCall(members.m_maincpu, "space", 0, undefined))(0);
    last_address = ((__add_a2600_get_databus_contents(runtime, (__L1 ?? runtime.memberCall(members.m_maincpu, "pc", 0, undefined))(), 1)) & 0xffff);
    if (((((last_address) & (4224))) ? 0 : 1)) {
      return offset;
    }
    last_byte = (((__L2 ?? runtime.memberCall(prog_space, "read_byte", 0, __L3))(last_address)) & 0xff);
    if (((((((last_byte) < (128)) ? 1 : 0)) || ((((last_byte) === (255)) ? 1 : 0))) ? 1 : 0)) {
      return last_byte;
    }
    prev_address = ((((last_address) - (1))) & 0xffff);
    if (((((prev_address) & (4224))) ? 0 : 1)) {
      return last_byte;
    }
    prev_byte = (((__L2 ?? runtime.memberCall(prog_space, "read_byte", 0, __L3))(prev_address)) & 0xff);
    if ((((prev_byte) === (177)) ? 1 : 0)) {
      return (__L2 ?? runtime.memberCall(prog_space, "read_byte", 0, __L3))(((last_byte) + (1)));
    }
    return last_byte;
  }
  function __add_a2600_get_databus_contents(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_a2600_tia_vsync_callback(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    const h_supported_screen_heights = members.supported_screen_heights ?? runtime.member("supported_screen_heights");
    for (let i: any = ((0) | 0); ((Number(i) < Number(((h_supported_screen_heights)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      if ((((((Number(data) >= Number(runtime.subtract((__mame_table_0[((i) & 3)] ?? 0), 3))) ? 1 : 0)) && (((Number(data) <= Number(__add_a2600_tia_vsync_callback(runtime, (__mame_table_0[((i) & 3)] ?? 0), 3))) ? 1 : 0))) ? 1 : 0)) {
        if (((Number((__mame_table_0[((i) & 3)] ?? 0)) !== Number((members.m_current_screen_height ?? runtime.member("m_current_screen_height")))) ? 1 : 0)) {
          members.m_current_screen_height = (((__mame_table_0[((i) & 3)] ?? 0)) & 0xffff);
        }
      }
    }
  }
  function __add_a2600_tia_vsync_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_switch_A_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_joy1.read_joy"], __L1: any = __l["m_joy2.read_joy"];
    let __t0: any, __t1: any;

    let val: any = ((0) & 0xff);
    val = ((((val) | ((((((__L0 ?? runtime.memberCall(members.m_joy1, "read_joy", 0, undefined))()) & (15))) << (4))))) & 0xff);
    val = ((((val) | ((((__L1 ?? runtime.memberCall(members.m_joy2, "read_joy", 0, undefined))()) & (15))))) & 0xff);
    return val;
  }

  function method_switch_A_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_joy1.joy_w"], __L1: any = __l["m_joy2.joy_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_joy1, "joy_w", 0, undefined))(((data) >>> (4)));
    (__L1 ?? runtime.memberCall(members.m_joy2, "joy_w", 0, undefined))(((data) & (15)));
  }

  function method_switch_B_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);

  }

  function method_irq_callback(runtime: any, state: any): any {
    const members = runtime.members;


  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "draw_sprite_helper": method_draw_sprite_helper,
    "collision_check": method_collision_check,
    "RSYNC_w": method_RSYNC_w,
    "HMCLR_w": method_HMCLR_w,
    "a2600_read_input_port": method_a2600_read_input_port,
    "a2600_get_databus_contents": method_a2600_get_databus_contents,
    "a2600_tia_vsync_callback": method_a2600_tia_vsync_callback,
    "switch_A_r": method_switch_A_r,
    "switch_A_w": method_switch_A_w,
    "switch_B_w": method_switch_B_w,
    "irq_callback": method_irq_callback
  };
  return __methodTable;
})();
    return {
      "a2600_state.a2600_read_input_port": methods["a2600_read_input_port"],
      "a2600_state.a2600_get_databus_contents": methods["a2600_get_databus_contents"],
      "a2600_state.a2600_tia_vsync_callback": methods["a2600_tia_vsync_callback"],
      "a2600_state.switch_A_r": methods["switch_A_r"],
      "a2600_state.switch_A_w": methods["switch_A_w"],
      "a2600_state.switch_B_w": methods["switch_B_w"],
      "a2600_state.irq_callback": methods["irq_callback"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_joy1.joy_w","m_joy1.read_joy","m_joy1.read_pot_x","m_joy1.read_pot_y","m_joy2.joy_w","m_joy2.read_joy","m_joy2.read_pot_x","m_joy2.read_pot_y","m_maincpu.pc","m_maincpu.space","prog_space.read_byte","read_byte"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
