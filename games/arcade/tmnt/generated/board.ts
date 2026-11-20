// GENERATED executable machine composition from src/mame/konami/tmnt.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'tmnt');

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


  function method_set_rmrd_line(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_rmrd_line = state;
  }

  function method_k052109_word_noA12_r(runtime: any, offset: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k052109.read"];

    mem_mask = ((mem_mask) & 0xffff);
    offset = ((runtime.shiftRight(((offset) & (12288)), 1)) | (((offset) & (2047))));
    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
      return (((__L0 ?? runtime.memberCall(members.m_k052109, "read", 0, undefined))(offset)) << (8));
    } else {
      return (__L0 ?? runtime.memberCall(members.m_k052109, "read", 0, undefined))(((offset) + (8192)));
    }
  }

  function method_k052109_word_noA12_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k052109.write"];

    data = ((data) & 0xffff);
    mem_mask = ((mem_mask) & 0xffff);
    offset = ((runtime.shiftRight(((offset) & (12288)), 1)) | (((offset) & (2047))));
    if ((((mem_mask) & 0xff00) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_k052109, "write", 0, undefined))(offset, ((((data) >>> (8))) & (255)));
    } else {
      (__L0 ?? runtime.memberCall(members.m_k052109, "write", 0, undefined))(((offset) + (8192)), ((data) & (255)));
    }
  }

  function method_k051937_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprites_busy.enabled"], __L1: any = __l["enabled"];
    let __t0: any;

    offset = ((offset) & (7));
    if ((((((((members.m_control ?? runtime.member("m_control"))) >>> (5)) & 1)) && (((offset) & (4)))) ? 1 : 0)) {
      return runtime.invoke("k051960_fetchromdata", ((offset) & (3)));
    } else {
      if ((((offset) === (0)) ? 1 : 0)) {
        return (((__L0 ?? runtime.memberCall(members.m_sprites_busy, "enabled", 0, __L1))()) ? (1) : (0));
      }
    }
    return 0;
  }

  function method_k051937_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_irq_handler"], __L1: any = __l["m_firq_handler"], __L2: any = __l["m_nmi_handler"], __L3: any = __l["m_shadow_config_cb"];

    data = ((data) & 0xff);
    offset = ((offset) & (7));
    if ((((offset) === (0)) ? 1 : 0)) {
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (0)) & 1)) {
        (__L0 ? __L0(0) : runtime.macro("m_irq_handler", 0));
      }
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (1)) & 1)) {
        (__L1 ? __L1(0) : runtime.macro("m_firq_handler", 0));
      }
      if (((((((~data)) & ((members.m_control ?? runtime.member("m_control"))))) >>> (2)) & 1)) {
        (__L2 ? __L2(0) : runtime.macro("m_nmi_handler", 0));
      }
      members.m_control = data;
    } else {
      if ((((offset) === (1)) ? 1 : 0)) {
        if ((((((data) ^ ((members.m_shadow_config ?? runtime.member("m_shadow_config"))))) >>> (0)) & 1)) {
          (__L3 ? __L3(((data) & (1))) : runtime.macro("m_shadow_config_cb", ((data) & (1))));
        }
        members.m_shadow_config = ((data) & (7));
      } else {
        if (((((((offset) >= (2)) ? 1 : 0)) && ((((offset) < (5)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(runtime.writableMember("m_spriterombank"), ((offset) - (2)), data);
        } else {
        }
      }
    }
  }

  function method_k051960_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"];

    if (((((members.m_control ?? runtime.member("m_control"))) >>> (5)) & 1)) {
      if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
        members.m_romoffset = runtime.shiftRight(((offset) & (1020)), 2);
      }
      return runtime.invoke("k051960_fetchromdata", ((offset) & (3)));
    } else {
      return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
  }

  function method_k051960_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
  }

  function method_priority_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xffff);
    members.m_priority = ((runtime.shiftRight(((data) & (12)), 2)) & 0xffff);
  }

  function method_sres_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_tmnt_soundlatch ?? runtime.member("m_tmnt_soundlatch"));
  }

  function method_sres_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7759.reset_w"], __L1: any = __l["m_samples.playing"], __L2: any = __l["m_samples.start_raw"], __L3: any = __l["m_samples.stop"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_upd7759, "reset_w", 0, undefined))((((data) >>> (1)) & 1));
    if ((((data) >>> (2)) & 1)) {
      if ((((__L1 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(0)) ? 0 : 1)) {
        (__L2 ?? runtime.memberCall(members.m_samples, "start_raw", 0, undefined))(0, (members.m_sampledata ?? runtime.member("m_sampledata")), 262144, runtime.divide(640000, 32));
      }
    } else {
      (__L3 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(0);
    }
    members.m_tmnt_soundlatch = ((data) & 0xff);
  }

  function method_tmnt_upd_start_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7759.start_w"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_upd7759, "start_w", 0, undefined))((((((data) >>> (0)) & 1)) ? 0 : 1));
  }

  function method_tmnt_upd_busy_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_upd7759.busy_r"];
    let __t0: any;

    return (((__L0 ?? runtime.memberCall(members.m_upd7759, "busy_r", 0, undefined))()) ? (1) : (0));
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k052109.tilemap_draw"], __L1: any = __l["screen.priority"], __L2: any = __l["priority"], __L3: any = __l["m_k051960.k051960_sprites_draw"];
    let __t0: any, __t1: any;

    (__L0 ?? runtime.memberCall(members.m_k052109, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 2, 128, 0);
    if (((Number((((members.m_priority ?? runtime.member("m_priority"))) & (1))) === Number(1)) ? 1 : 0)) {
      (__L3 ?? runtime.memberCall(members.m_k051960, "k051960_sprites_draw", 0, undefined))(bitmap, cliprect, (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 0, 0);
    }
    (__L0 ?? runtime.memberCall(members.m_k052109, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 1, 0, 0);
    if (((Number((((members.m_priority ?? runtime.member("m_priority"))) & (1))) === Number(0)) ? 1 : 0)) {
      (__L3 ?? runtime.memberCall(members.m_k051960, "k051960_sprites_draw", 0, undefined))(bitmap, cliprect, (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 0, 0);
    }
    (__L0 ?? runtime.memberCall(members.m_k052109, "tilemap_draw", 0, undefined))(screen, bitmap, cliprect, 0, 0, 0);
    return 0;
  }

  function method_vblank_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    if ((((state) && ((members.m_irq5_mask ?? runtime.member("m_irq5_mask")))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(5, 1);
    }
  }

  function method_volume_callback(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_k007232.set_volume"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_k007232, "set_volume", 0, undefined))(0, ((((data) >>> (4))) * (17)), 0);
    (__L0 ?? runtime.memberCall(members.m_k007232, "set_volume", 0, undefined))(1, 0, ((((data) & (15))) * (17)));
  }

  function method_tmnt_tile_callback(runtime: any, layer: any, bank: any, code: any, color: any, flags: any, priority: any): any {
    const members = runtime.members;

    code.set(((((code.get()) | (((((((((((color.get()) & (3))) << (8))) | (((((color.get()) & (16))) << (6))))) | (((((color.get()) & (12))) << (9))))) | (((bank) << (13))))))) | 0));
    color.set(((__add_tmnt_tile_callback(runtime, runtime.readIndex((members.m_layer_colorbase ?? runtime.member("m_layer_colorbase")), layer), runtime.shiftRight(((color.get()) & (224)), 5))) | 0));
  }
  function __add_tmnt_tile_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_tmnt_sprite_callback(runtime: any, code: any, color: any, priority: any, shadow: any): any {
    const members = runtime.members;

    code.set(((((code.get()) | (((((color.get()) & (16))) << (9))))) | 0));
    color.set(((__add_tmnt_sprite_callback(runtime, (members.m_sprite_colorbase ?? runtime.member("m_sprite_colorbase")), ((color.get()) & (15)))) | 0));
  }
  function __add_tmnt_sprite_callback(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "set_rmrd_line": method_set_rmrd_line,
    "k052109_word_noA12_r": method_k052109_word_noA12_r,
    "k052109_word_noA12_w": method_k052109_word_noA12_w,
    "k051937_r": method_k051937_r,
    "k051937_w": method_k051937_w,
    "k051960_r": method_k051960_r,
    "k051960_w": method_k051960_w,
    "priority_w": method_priority_w,
    "sres_r": method_sres_r,
    "sres_w": method_sres_w,
    "tmnt_upd_start_w": method_tmnt_upd_start_w,
    "tmnt_upd_busy_r": method_tmnt_upd_busy_r,
    "screen_update": method_screen_update,
    "vblank_w": method_vblank_w,
    "volume_callback": method_volume_callback
  };
  return __methodTable;
})();
    return {
      "tmnt_state.k052109_word_noA12_r": methods["k052109_word_noA12_r"],
      "tmnt_state.k052109_word_noA12_w": methods["k052109_word_noA12_w"],
      "tmnt_state.priority_w": methods["priority_w"],
      "tmnt_state.sres_r": methods["sres_r"],
      "tmnt_state.sres_w": methods["sres_w"],
      "tmnt_state.tmnt_upd_start_w": methods["tmnt_upd_start_w"],
      "tmnt_state.tmnt_upd_busy_r": methods["tmnt_upd_busy_r"],
      "tmnt_state.screen_update": methods["screen_update"],
      "tmnt_state.vblank_w": methods["vblank_w"],
      "tmnt_state.volume_callback": methods["volume_callback"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["enabled","m_firq_handler","m_irq_handler","m_k007232.set_volume","m_k051960.k051960_sprites_draw","m_k052109.read","m_k052109.tilemap_draw","m_k052109.write","m_maincpu.set_input_line","m_nmi_handler","m_samples.playing","m_samples.start_raw","m_samples.stop","m_shadow_config_cb","m_sprites_busy.enabled","m_upd7759.busy_r","m_upd7759.reset_w","m_upd7759.start_w","machine","machine().side_effects_disabled","priority","screen.priority"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
