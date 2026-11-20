// GENERATED executable machine composition from src/mame/bally/mcr3.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'rampage');

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


  function method_rampage_ip4_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"], __L1: any = __l["m_sounds_good.read"];
    let __t0: any, __t1: any;

    return (((__t0 = __deref_rampage_ip4_r(runtime, (__L0 ? __L0("MONO.IP4") : runtime.macro("ioport", "MONO.IP4"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("MONO.IP4") : runtime.macro("ioport", "MONO.IP4")), "read"))) | ((((__L1 ?? runtime.memberCall(members.m_sounds_good, "read", 0, undefined))()) << (7))));
  }
  function __deref_rampage_ip4_r(runtime: any, p: any): any {
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

  function method_rampage_op6_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sounds_good.reset_write"], __L1: any = __l["m_sounds_good.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_sounds_good, "reset_write", 0, undefined))(((runtime.shiftRight((~data), 5)) & (1)));
    (__L1 ?? runtime.memberCall(members.m_sounds_good, "write", 0, undefined))(data);
  }

  function method_reset_write(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_cpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (1) : (0)));
  }

  function method_mcr_paletteram9_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
  }

  function method_mcr_set_color(runtime: any, index: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["pal3bit"], __L1: any = __l["m_palette.set_pen_color"];

    (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__L0 ? __L0(runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__L0 ? __L0(runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__L0 ? __L0(runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
  }

  function method_mcr3_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
  }

  function method_mcrmono_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["TILE_FLIPYX"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];

    let data: any = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((tile_index) * (2)))) | (((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), __add_mcrmono_get_bg_tile_info(runtime, ((tile_index) * (2)), 1))) << (8))))) | 0);
    let code: any = ((((((data) & (1023))) | (((runtime.shiftRight(data, 4)) & (1024))))) | 0);
    let color: any = ((((((runtime.shiftRight(data, 12)) & (3))) ^ (3))) | 0);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(0, code, color, (__L0 ? __L0(runtime.shiftRight(data, 10)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(data, 10))));
  }
  function __add_mcrmono_get_bg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_mcr_interrupt(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ctc.trg2"], __L1: any = __l["m_ctc.trg3"];

    let scanline: any = ((param) | 0);
    if (((((((scanline) === (0)) ? 1 : 0)) || ((((scanline) === (240)) ? 1 : 0))) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_ctc, "trg2", 0, undefined))(1);
      (__L0 ?? runtime.memberCall(members.m_ctc, "trg2", 0, undefined))(0);
    }
    if ((((scanline) === (0)) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_ctc, "trg3", 0, undefined))(1);
      (__L1 ?? runtime.memberCall(members.m_ctc, "trg3", 0, undefined))(0);
    }
  }

  function method_screen_update_mcr3(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_flip"], __L1: any = __l["set_flip"], __L2: any = __l["m_bg_tilemap.draw"], __L3: any = __l["draw"];

    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_flip", 0, __L1))((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? (3) : (0)));
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["mcr3_update_sprites"] ? runtime.overrides["mcr3_update_sprites"](screen, bitmap, cliprect, 3, 0, 0, 0, 1) : method_mcr3_update_sprites(runtime, screen, bitmap, cliprect, 3, 0, 0, 0, 1));
    return 0;
  }

  function method_mcr3_update_sprites(runtime: any, screen: any, bitmap: any, cliprect: any, color_mask: any, code_xor: any, dx: any, dy: any, interlaced: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.priority"], __L1: any = __l["screen.priority"], __L2: any = __l["priority"], __L3: any = __l["m_gfxdecode.gfx"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    runtime.memberCall((__L0 ?? runtime.memberCall(members.m_screen, "priority", 0, undefined))(), "fill", 0, undefined)(1, cliprect);
    for (let offs: any = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      if (((Number(runtime.readIndex(h_m_spriteram, offs)) === Number(0)) ? 1 : 0)) {
        continue;
      }
      let flags: any = ((runtime.readIndex(h_m_spriteram, ((offs) + (1)))) | 0);
      let code: any = ((__add_mcr3_update_sprites(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (2))), ((256) * (((runtime.shiftRight(flags, 3)) & (1)))))) | 0);
      let color: any = (((((~flags)) & (color_mask))) | 0);
      let flipx: any = ((((flags) & (16))) | 0);
      let flipy: any = ((((flags) & (32))) | 0);
      let sx: any = ((((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) - (3))) * (2))) | 0);
      let sy: any = ((((241) - (runtime.readIndex(h_m_spriteram, offs)))) | 0);
      if ((((interlaced) === (1)) ? 1 : 0)) {
        sy = ((((sy) * (2))) | 0);
      }
      code = ((((code) ^ (code_xor))) | 0);
      sx = ((((sx) + (dx))) | 0);
      sy = ((((sy) + (dy))) | 0);
      if ((((members.m_mcr_cocktail_flip ?? runtime.member("m_mcr_cocktail_flip"))) ? 0 : 1)) {
        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 0, 257);
        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 2, 65279);
      } else {
        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 0, 257);
        runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "prio_transmask", 0, undefined)(bitmap, cliprect, code, color, ((flipx) ? 0 : 1), ((flipy) ? 0 : 1), ((480) - (sx)), ((452) - (sy)), (__L1 ?? runtime.memberCall(screen, "priority", 0, __L2))(), 2, 65279);
      }
    }
  }
  function __add_mcr3_update_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_irq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_pia.irq_a_state"], __L1: any = __l["m_pia.irq_b_state"], __L2: any = __l["m_cpu.set_input_line"];
    let __t0: any, __t1: any;

    let combined_state: any = (((((__L0 ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__L1 ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
    (__L2 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "rampage_ip4_r": method_rampage_ip4_r,
    "rampage_op6_w": method_rampage_op6_w,
    "reset_write": method_reset_write,
    "mcr_paletteram9_w": method_mcr_paletteram9_w,
    "mcr_set_color": method_mcr_set_color,
    "mcr3_videoram_w": method_mcr3_videoram_w,
    "mcrmono_get_bg_tile_info": method_mcrmono_get_bg_tile_info,
    "mcr_interrupt": method_mcr_interrupt,
    "screen_update_mcr3": method_screen_update_mcr3,
    "mcr3_update_sprites": method_mcr3_update_sprites,
    "irq_w": method_irq_w
  };
  return __methodTable;
})();
    return {
      "mcr3_state.rampage_ip4_r": methods["rampage_ip4_r"],
      "mcr3_state.rampage_op6_w": methods["rampage_op6_w"],
      "mcr3_state.mcr_paletteram9_w": methods["mcr_paletteram9_w"],
      "mcr3_state.mcr3_videoram_w": methods["mcr3_videoram_w"],
      "mcr3_state.mcrmono_get_bg_tile_info": methods["mcrmono_get_bg_tile_info"],
      "mcr3_state.mcr_interrupt": methods["mcr_interrupt"],
      "mcr3_state.screen_update_mcr3": methods["screen_update_mcr3"],
      "mcr3_state.mcr3_update_sprites": methods["mcr3_update_sprites"],
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


  function method_rampage_ip4_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"], __L1: any = __l["m_sounds_good.read"];
    let __t0: any, __t1: any;

    return (((__t0 = __deref_rampage_ip4_r(runtime, (__L0 ? __L0("MONO.IP4") : runtime.macro("ioport", "MONO.IP4"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("MONO.IP4") : runtime.macro("ioport", "MONO.IP4")), "read"))) | ((((__L1 ?? runtime.memberCall(members.m_sounds_good, "read", 0, undefined))()) << (7))));
  }
  function __deref_rampage_ip4_r(runtime: any, p: any): any {
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

  function method_reset_write(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_cpu.set_input_line"];

    (__L0 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(-2, ((state) ? (1) : (0)));
  }

  function method_mcr_paletteram9_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
    (runtime.overrides["mcr_set_color"] ? runtime.overrides["mcr_set_color"](runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))) : method_mcr_set_color(runtime, runtime.divide(offset, 2), ((data) | (((((offset) & (1))) << (8))))));
  }

  function method_mcr_set_color(runtime: any, index: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["pal3bit"], __L1: any = __l["m_palette.set_pen_color"];

    (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__L0 ? __L0(runtime.shiftRight(data, 6)) : runtime.macro("pal3bit", runtime.shiftRight(data, 6))), (__L0 ? __L0(runtime.shiftRight(data, 0)) : runtime.macro("pal3bit", runtime.shiftRight(data, 0))), (__L0 ? __L0(runtime.shiftRight(data, 3)) : runtime.macro("pal3bit", runtime.shiftRight(data, 3))));
  }

  function method_mcr3_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(runtime.divide(offset, 2));
  }

  function method_irq_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_pia.irq_a_state"], __L1: any = __l["m_pia.irq_b_state"], __L2: any = __l["m_cpu.set_input_line"];
    let __t0: any, __t1: any;

    let combined_state: any = (((((__L0 ?? runtime.memberCall(members.m_pia, "irq_a_state", 0, undefined))()) | ((__L1 ?? runtime.memberCall(members.m_pia, "irq_b_state", 0, undefined))()))) | 0);
    (__L2 ?? runtime.memberCall(members.m_cpu, "set_input_line", 0, undefined))(4, ((combined_state) ? (1) : (0)));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "rampage_ip4_r": method_rampage_ip4_r,
    "reset_write": method_reset_write,
    "mcr_paletteram9_w": method_mcr_paletteram9_w,
    "mcr_set_color": method_mcr_set_color,
    "mcr3_videoram_w": method_mcr3_videoram_w,
    "irq_w": method_irq_w
  };
  return __methodTable;
})();
    return {
      "mcr_state.mcr_set_color": methods["mcr_set_color"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","draw","ioport","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_flip","m_cpu.set_input_line","m_ctc.trg2","m_ctc.trg3","m_gfxdecode.gfx","m_palette.set_pen_color","m_pia.irq_a_state","m_pia.irq_b_state","m_screen.priority","m_sounds_good.read","m_sounds_good.reset_write","m_sounds_good.write","mark_tile_dirty","pal3bit","priority","screen.priority","set","set_flip","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
