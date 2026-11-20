// GENERATED executable machine composition from src/mame/universal/cosmic.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'panic');

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


  function method_panic_sound_output_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.stop"], __L1: any = __l["m_samples.start"], __L2: any = __l["m_samples.playing"], __L3: any = __l["m_dac.write"];

    data = ((data) & 0xff);
    if ((((offset) === (11)) ? 1 : 0)) {
      let count: any = ((0) | 0);
      if ((((data) === (0)) ? 1 : 0)) {
        for (count = ((0) | 0); (((count) < (9)) ? 1 : 0); count = ((((count) + (1))) | 0)) {
          (__L0 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(count);
        }
      }
      members.m_sound_enabled = ((data) | 0);
    }
    if ((members.m_sound_enabled ?? runtime.member("m_sound_enabled"))) {
      switch ((offset as number)) {
        case 0:
        {
          if (data) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 0);
          }
          break;
        }
        case 1:
        {
          if (data) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 5);
          }
          break;
        }
        case 2:
        {
          if (data) {
            if ((((__L2 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(1)) ? 0 : 1)) {
              (__L0 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(2);
              (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(1, 3);
            }
          } else {
            (__L0 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(1);
          }
          break;
        }
        case 3:
        {
          if ((((data) && ((((__L2 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(6)) ? 0 : 1))) ? 1 : 0)) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(6, 9, 1);
          }
          break;
        }
        case 4:
        {
          break;
        }
        case 5:
        {
          if (data) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 5);
          }
          break;
        }
        case 6:
        {
          if (((((((data) && ((((__L2 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(1)) ? 0 : 1))) ? 1 : 0)) && ((((__L2 ?? runtime.memberCall(members.m_samples, "playing", 0, undefined))(3)) ? 0 : 1))) ? 1 : 0)) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(2, 2);
          }
          break;
        }
        case 7:
        {
          if (data) {
            (__L0 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(2);
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(3, 4);
          } else {
            (__L0 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(3);
          }
          break;
        }
        case 8:
        {
          if (data) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 1);
          }
          break;
        }
        case 9:
        {
          if (data) {
            (__L1 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(4, 8);
          } else {
            (__L0 ?? runtime.memberCall(members.m_samples, "stop", 0, undefined))(4);
          }
          break;
        }
        case 10:
        {
          (__L3 ?? runtime.memberCall(members.m_dac, "write", 0, undefined))((((data) >>> (7)) & 1));
          break;
        }
      }
    }
  }

  function method_cosmic_color_register_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_color_registers"), offset, ((data) ? (1) : (0)));
  }

  function method_flip_screen_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"];

    data = ((data) & 0xff);
    (__L0 ? __L0(((data) & (128))) : runtime.macro("flip_screen_set", ((data) & (128))));
  }

  function method_panic_sound_output2_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_samples.start"];

    data = ((data) & 0xff);
    if ((members.m_sound_enabled ?? runtime.member("m_sound_enabled"))) {
      switch ((offset as number)) {
        case 0:
        {
          if (data) {
            (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(0, 6);
          }
          break;
        }
        case 1:
        {
          if (data) {
            (__L0 ?? runtime.memberCall(members.m_samples, "start", 0, undefined))(5, 7);
          }
          break;
        }
      }
    }
  }

  function method_screen_update_panic(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bitmap.fill"], __L1: any = __l["fill"];

    (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(0, cliprect);
    (runtime.overrides["draw_bitmap"] ? runtime.overrides["draw_bitmap"](bitmap, cliprect) : method_draw_bitmap(runtime, bitmap, cliprect));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 7, 1) : method_draw_sprites(runtime, bitmap, cliprect, 7, 1));
    return 0;
  }

  function method_draw_bitmap(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["CALL_METHOD"], __L1: any = __l["flip_screen"];

    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    for (let offs: any = 0; ((Number(offs) < Number(runtime.container(members.m_videoram, "bytes"))) ? 1 : 0); offs = ((offs) + (1))) {
      let data: any = ((runtime.readIndex(h_m_videoram, offs)) & 0xff);
      let x: any = ((((offs) << (3))) & 0xff);
      let y: any = ((((offs) >>> (5))) & 0xff);
      let pen: any = ((__method) => __method ? __method(runtime, x, y) : (__L0 ? __L0((members.m_map_color ?? runtime.member("m_map_color")), x, y) : runtime.macro("CALL_METHOD", (members.m_map_color ?? runtime.member("m_map_color")), x, y)))(__methodTable[(members.m_map_color ?? runtime.member("m_map_color"))]);
      for (let i: any = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        if (((data) & (128))) {
          if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
            bitmap["pix="](((255) - (y)), ((255) - (x)), pen);
          } else {
            bitmap["pix="](y, x, pen);
          }
        }
        x = ((((x) + (1))) & 0xff);
        data = ((((data) << (1))) & 0xff);
      }
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, color_mask: any, extra_sprites: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"];

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    let offs: any = ((0) | 0);
    for (offs = ((runtime.subtract(runtime.container(members.m_spriteram, "bytes"), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
      if (((Number(runtime.readIndex(h_m_spriteram, offs)) !== Number(0)) ? 1 : 0)) {
        let code: any = ((0) | 0);
        let color: any = ((0) | 0);
        code = (((((~runtime.readIndex(h_m_spriteram, offs))) & (63))) | 0);
        color = (((((~runtime.readIndex(h_m_spriteram, ((offs) + (3))))) & (color_mask))) | 0);
        if (extra_sprites) {
          code = ((((code) | (((((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) & (8))) << (3))))) | 0);
        }
        if (((runtime.readIndex(h_m_spriteram, offs)) & (128))) {
          runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, code, color, 0, (((~runtime.readIndex(h_m_spriteram, offs))) & (64)), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), runtime.readIndex(h_m_spriteram, ((offs) + (1))), 0);
        } else {
          runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, runtime.shiftRight(code, 2), color, 0, (((~runtime.readIndex(h_m_spriteram, offs))) & (64)), ((256) - (runtime.readIndex(h_m_spriteram, ((offs) + (2))))), runtime.readIndex(h_m_spriteram, ((offs) + (1))), 0);
        }
      }
    }
  }

  function method_panic_scanline(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line_and_vector"];

    let scanline: any = ((param) | 0);
    if ((((scanline) === (224)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line_and_vector", 0, undefined))(0, 2, 215);
    }
    if ((((scanline) === (0)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line_and_vector", 0, undefined))(0, 2, 207);
    }
  }

  function method_panic_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["pal1bit"], __L2: any = __l["rgb_t"], __L3: any = __l["palette.set_indirect_color"], __L4: any = __l["set_indirect_color"], __L5: any = __l["palette.set_pen_indirect"], __L6: any = __l["set_pen_indirect"];
    let __t0: any;

    let color_prom: any = (__t0 = __deref_panic_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base")); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    for (let i: any = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let r: any = (((__L1 ? __L1(runtime.shiftRight(i, 0)) : runtime.macro("pal1bit", runtime.shiftRight(i, 0)))) | 0);
      let g: any = (((__L1 ? __L1(runtime.shiftRight(i, 1)) : runtime.macro("pal1bit", runtime.shiftRight(i, 1)))) | 0);
      let b: any = ((((((Number(((i) & (12))) === Number(8)) ? 1 : 0)) ? (170) : ((__L1 ? __L1(runtime.shiftRight(i, 2)) : runtime.macro("pal1bit", runtime.shiftRight(i, 2)))))) | 0);
      (__L3 ?? runtime.memberCall(palette, "set_indirect_color", 0, __L4))(i, (__L2 ? __L2(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
    for (let i: any = ((0) | 0); (((i) < (15)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))(i, i);
    }
    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L5 ?? runtime.memberCall(palette, "set_pen_indirect", 0, __L6))(((i) + (16)), (((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) & (7)));
    }
    members.m_map_color = "panic_map_color";
  }
  function __deref_panic_palette(runtime: any, p: any): any {
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
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "panic_sound_output_w": method_panic_sound_output_w,
    "cosmic_color_register_w": method_cosmic_color_register_w,
    "flip_screen_w": method_flip_screen_w,
    "panic_sound_output2_w": method_panic_sound_output2_w,
    "screen_update_panic": method_screen_update_panic,
    "draw_bitmap": method_draw_bitmap,
    "draw_sprites": method_draw_sprites,
    "panic_scanline": method_panic_scanline,
    "panic_palette": method_panic_palette
  };
  return __methodTable;
})();
    return {
      "cosmic_state.panic_sound_output_w": methods["panic_sound_output_w"],
      "cosmic_state.cosmic_color_register_w": methods["cosmic_color_register_w"],
      "cosmic_state.flip_screen_w": methods["flip_screen_w"],
      "cosmic_state.panic_sound_output2_w": methods["panic_sound_output2_w"],
      "cosmic_state.screen_update_panic": methods["screen_update_panic"],
      "cosmic_state.draw_bitmap": methods["draw_bitmap"],
      "cosmic_state.draw_sprites": methods["draw_sprites"],
      "cosmic_state.panic_scanline": methods["panic_scanline"],
      "cosmic_state.panic_palette": methods["panic_palette"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["CALL_METHOD","bitmap.fill","fill","flip_screen","flip_screen_set","m_dac.write","m_gfxdecode.gfx","m_maincpu.set_input_line_and_vector","m_samples.playing","m_samples.start","m_samples.stop","memregion","pal1bit","palette.set_indirect_color","palette.set_pen_indirect","rgb_t","set_indirect_color","set_pen_indirect"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
