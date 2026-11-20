// GENERATED executable machine composition from src/mame/taito/taitosj.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'junglek');

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


  function method_characterram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"];

    data = ((data) & 0xff);
    if (((Number(runtime.readIndex((members.m_characterram ?? runtime.member("m_characterram")), offset)) !== Number(data)) ? 1 : 0)) {
      if ((((offset) < (6144)) ? 1 : 0)) {
        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "mark_dirty", 0, undefined)(((runtime.divide(offset, 8)) & (255)));
        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "mark_dirty", 0, undefined)(((runtime.divide(offset, 32)) & (63)));
      } else {
        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "mark_dirty", 0, undefined)(((runtime.divide(offset, 8)) & (255)));
        runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(3), "mark_dirty", 0, undefined)(((runtime.divide(offset, 32)) & (63)));
      }
      runtime.writeIndex(runtime.writableMember("m_characterram"), offset, data);
    }
  }

  function method_fake_data_r(runtime: any): any {
    const members = runtime.members;

    0;
    return 0;
  }

  function method_fake_data_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    0;
  }

  function method_fake_status_r(runtime: any): any {
    const members = runtime.members;

    0;
    return 255;
  }

  function method_gfxrom_r(runtime: any): any {
    const members = runtime.members;

    const h_m_gfx = members.m_gfx ?? runtime.member("m_gfx");
    let ret: any = ((0) & 0xff);
    let offs: any = ((runtime.readIndex((members.m_gfxpointer ?? runtime.member("m_gfxpointer")), 0)) | (((runtime.readIndex((members.m_gfxpointer ?? runtime.member("m_gfxpointer")), 1)) << (8))));
    if ((((offs) < (32768)) ? 1 : 0)) {
      ret = ((runtime.readIndex(h_m_gfx, offs)) & 0xff);
    } else {
      ret = ((0) & 0xff);
    }
    offs = ((offs) + (1));
    runtime.writeIndex(runtime.writableMember("m_gfxpointer"), 0, ((offs) & (255)));
    runtime.writeIndex(runtime.writableMember("m_gfxpointer"), 1, ((offs) >>> (8)));
    return ret;
  }

  function method_collision_reg_clear_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 0, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 1, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 2, 0);
    runtime.writeIndex(runtime.writableMember("m_collision_reg"), 3, 0);
  }

  function method_soundlatch_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("soundlatch_w_cb", data);
  }

  function method_sound_semaphore2_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("sound_semaphore2_w_cb", data);
  }

  function method_soundlatch_clear7_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("soundlatch_clear7_w_cb", data);
  }

  function method_soundlatch_flags_r(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_soundlatch_flag ?? runtime.member("m_soundlatch_flag"))) ? (8) : (0))) | ((((members.m_sound_semaphore2 ?? runtime.member("m_sound_semaphore2"))) ? (4) : (0))))) | (3));
  }

  function method_sound_semaphore2_clear_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    runtime.synchronize("sound_semaphore2_clear_w_cb", data);
  }

  function method_video_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_layer_collbitmap1.allocate"], __L1: any = __l["allocate"], __L2: any = __l["m_sprite_sprite_collbitmap1.allocate"], __L3: any = __l["m_sprite_sprite_collbitmap2.allocate"], __L4: any = __l["m_gfxdecode.gfx"];

    const h_m_layer_bitmap = members.m_layer_bitmap ?? runtime.member("m_layer_bitmap");
    const h_m_sprite_layer_collbitmap2 = members.m_sprite_layer_collbitmap2 ?? runtime.member("m_sprite_layer_collbitmap2");
    (__L0 ?? runtime.memberCall(members.m_sprite_layer_collbitmap1, "allocate", 0, __L1))(16, 16);
    for (let i: any = ((0) | 0); (((i) < (3)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, i), "allocate", 0, undefined)(256, 256);
      runtime.memberCall(runtime.readIndex(h_m_sprite_layer_collbitmap2, i), "allocate", 0, undefined)(256, 256);
    }
    (__L2 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap1, "allocate", 0, __L1))(32, 32);
    (__L3 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap2, "allocate", 0, __L1))(32, 32);
    runtime.memberCall((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "set_source", 0, undefined)((members.m_characterram ?? runtime.member("m_characterram")));
    runtime.memberCall((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "set_source", 0, undefined)((members.m_characterram ?? runtime.member("m_characterram")));
    runtime.memberCall((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(2), "set_source", 0, undefined)(__addr_video_start(runtime, (members.m_characterram ?? runtime.member("m_characterram")), 6144));
    runtime.memberCall((__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(3), "set_source", 0, undefined)(__addr_video_start(runtime, (members.m_characterram ?? runtime.member("m_characterram")), 6144));
    (runtime.overrides["compute_draw_order"] ? runtime.overrides["compute_draw_order"]() : method_compute_draw_order(runtime));
  }
  function __addr_video_start(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_compute_draw_order(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"];
    let __t0: any;

    let color_prom: any = (__t0 = __deref_compute_draw_order(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base")); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    for (let i: any = ((0) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let mask: any = ((0) | 0);
      for (let j: any = ((3) | 0); (((j) >= (0)) ? 1 : 0); j = ((((j) - (1))) | 0)) {
        let data: any = (((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (((((16) * (((i) & (15))))) + (mask)))] ?? 0) : runtime.readIndex(color_prom, ((((16) * (((i) & (15))))) + (mask))))) & (15))) | 0);
        if (((i) & (16))) {
          data = ((runtime.shiftRight(data, 2)) | 0);
        } else {
          data = ((((data) & (3))) | 0);
        }
        mask = ((((mask) | (((1) << (data))))) | 0);
        runtime.writeIndex(runtime.readIndex((members.m_draw_order ?? runtime.member("m_draw_order")), i), j, data);
      }
    }
  }
  function __deref_compute_draw_order(runtime: any, p: any): any {
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

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;

    return (runtime.overrides["video_update_common"] ? runtime.overrides["video_update_common"](bitmap, cliprect, "copy_layer") : method_video_update_common(runtime, bitmap, cliprect, "copy_layer"));
  }

  function method_video_update_common(runtime: any, bitmap: any, cliprect: any, copy_layer_func: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rectangle"];

    let sprites_on: any = new Int32Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32)))));
    let sprite_areas: any = typeof __L0 === 'function' ? Array.from({ length: Math.max(0, Math.trunc(Number(32))) }, () => __L0(0, 0, 0, 0)) : (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](32) : new Uint8Array(Math.max(0, Number(32))));
    (runtime.overrides["calculate_sprite_areas"] ? runtime.overrides["calculate_sprite_areas"](sprites_on, sprite_areas) : method_calculate_sprite_areas(runtime, sprites_on, sprite_areas));
    (runtime.overrides["set_pens"] ? runtime.overrides["set_pens"]() : method_set_pens(runtime));
    (runtime.overrides["draw_layers"] ? runtime.overrides["draw_layers"]() : method_draw_layers(runtime));
    (runtime.overrides["copy_layers"] ? runtime.overrides["copy_layers"](bitmap, cliprect, copy_layer_func, sprites_on, sprite_areas) : method_copy_layers(runtime, bitmap, cliprect, copy_layer_func, sprites_on, sprite_areas));
    (runtime.overrides["check_collision"] ? runtime.overrides["check_collision"](sprites_on, sprite_areas) : method_check_collision(runtime, sprites_on, sprite_areas));
    return 0;
  }

  function method_calculate_sprite_areas(runtime: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_layer_collbitmap2[0].cliprect"], __L1: any = __l["cliprect"];
    let __t0: any;

    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    const h_m_sprite_layer_collbitmap2 = members.m_sprite_layer_collbitmap2 ?? runtime.member("m_sprite_layer_collbitmap2");
    for (let which: any = ((0) | 0); (((which) < (32)) ? 1 : 0); which = ((((which) + (1))) | 0)) {
      let sx: any = ((0) & 0xff);
      let sy: any = ((0) & 0xff);
      if (((((((which) >= (16)) ? 1 : 0)) && ((((which) <= (23)) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      if ((runtime.overrides["get_sprite_xy"] ? runtime.overrides["get_sprite_xy"](which, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx, set: (value: any) => { sx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy, set: (value: any) => { sy = ((value) & 0xff); } }), offset: 0 })) : method_get_sprite_xy(runtime, which, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx, set: (value: any) => { sx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy, set: (value: any) => { sy = ((value) & 0xff); } }), offset: 0 })))) {
        let minx: any = ((0) | 0);
        let miny: any = ((0) | 0);
        let maxx: any = ((0) | 0);
        let maxy: any = ((0) | 0);
        if (((__deref_calculate_sprite_areas(runtime, h_m_video_mode)) & (1))) {
          sx = ((((238) - (sx))) & 0xff);
        }
        if (((__deref_calculate_sprite_areas(runtime, h_m_video_mode)) & (2))) {
          sy = ((((242) - (sy))) & 0xff);
        }
        minx = ((sx) | 0);
        miny = ((sy) | 0);
        maxx = ((((minx) + (15))) | 0);
        maxy = ((((miny) + (15))) | 0);
        runtime.readIndex(sprite_areas, which).min_x = minx;
        runtime.readIndex(sprite_areas, which).max_x = maxx;
        runtime.readIndex(sprite_areas, which).min_y = miny;
        runtime.readIndex(sprite_areas, which).max_y = maxy;
        runtime.writeIndex(sprites_on, which, 1);
      } else {
        runtime.writeIndex(sprites_on, which, 0);
      }
      runtime.writeIndex(sprite_areas, which, ((runtime.readIndex(sprite_areas, which)) & ((__L0 ?? runtime.memberCall(runtime.readIndex(h_m_sprite_layer_collbitmap2, 0), "cliprect", 0, __L1))())));
    }
  }
  function __deref_calculate_sprite_areas(runtime: any, p: any): any {
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

  function method_get_sprite_xy(runtime: any, which: any, sx: any, sy: any): any {
    const members = runtime.members;

    which = ((which) & 0xff);
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    let offs: any = ((which) * (4));
    runtime.pointerStore(sx, ((runtime.readIndex(h_m_spriteram, __add_get_sprite_xy(runtime, ((((((__deref_get_sprite_xy(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 0))) - (1)));
    runtime.pointerStore(sy, ((240) - (runtime.readIndex(h_m_spriteram, __add_get_sprite_xy(runtime, ((((((__deref_get_sprite_xy(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 1)))));
    return ((Number(__deref_get_sprite_xy(runtime, sy)) < Number(240)) ? 1 : 0);
  }
  function __add_get_sprite_xy(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_get_sprite_xy(runtime: any, p: any): any {
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

  function method_set_pens(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t"], __L1: any = __l["m_palette.set_pen_color"];

    const h_m_paletteram = members.m_paletteram ?? runtime.member("m_paletteram");
    let resistances: any = new Int32Array([1000, 470, 270]);
    let rweights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let gweights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    let bweights: any = new Float64Array((runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](3) : new Uint8Array(Math.max(0, Number(3)))));
    (runtime.overrides["compute_resistor_weights"] ? runtime.overrides["compute_resistor_weights"](0, 255, (-1), 3, resistances, rweights, 0, 0, 3, resistances, gweights, 0, 0, 3, resistances, bweights, 0, 0) : method_compute_resistor_weights(runtime, 0, 255, (-1), 3, resistances, rweights, 0, 0, 3, resistances, gweights, 0, 0, 3, resistances, bweights, 0, 0));
    for (let i: any = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let val: any = ((runtime.readIndex(h_m_paletteram, ((((i) << (1))) | (1)))) | 0);
      let bit0: any = ((((runtime.shiftRight((~val), 6)) & (1))) | 0);
      let bit1: any = ((((runtime.shiftRight((~val), 7)) & (1))) | 0);
      val = ((runtime.readIndex(h_m_paletteram, ((((i) << (1))) | (0)))) | 0);
      let bit2: any = ((((runtime.shiftRight((~val), 0)) & (1))) | 0);
      let r: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](rweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, rweights, bit0, bit1, bit2))) | 0);
      val = ((runtime.readIndex(h_m_paletteram, ((((i) << (1))) | (1)))) | 0);
      bit0 = ((((runtime.shiftRight((~val), 3)) & (1))) | 0);
      bit1 = ((((runtime.shiftRight((~val), 4)) & (1))) | 0);
      bit2 = ((((runtime.shiftRight((~val), 5)) & (1))) | 0);
      let g: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](gweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, gweights, bit0, bit1, bit2))) | 0);
      val = ((runtime.readIndex(h_m_paletteram, ((((i) << (1))) | (1)))) | 0);
      bit0 = ((((runtime.shiftRight((~val), 0)) & (1))) | 0);
      bit1 = ((((runtime.shiftRight((~val), 1)) & (1))) | 0);
      bit2 = ((((runtime.shiftRight((~val), 2)) & (1))) | 0);
      let b: any = (((runtime.overrides["combine_weights__int__3"] ? runtime.overrides["combine_weights__int__3"](bweights, bit0, bit1, bit2) : method_combine_weights__int__3(runtime, bweights, bit0, bit1, bit2))) | 0);
      (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(i, (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
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

  function method_draw_layers(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_layer_bitmap[0].fill"], __L1: any = __l["fill"], __L2: any = __l["m_layer_bitmap[1].fill"], __L3: any = __l["m_layer_bitmap[2].fill"], __L4: any = __l["m_layer_bitmap[0].cliprect"], __L5: any = __l["cliprect"], __L6: any = __l["m_gfxdecode.gfx"], __L7: any = __l["m_layer_bitmap[1].cliprect"], __L8: any = __l["m_layer_bitmap[2].cliprect"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_layer_bitmap = members.m_layer_bitmap ?? runtime.member("m_layer_bitmap");
    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    const h_m_colorbank = members.m_colorbank ?? runtime.member("m_colorbank");
    (__L0 ?? runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, 0), "fill", 0, __L1))(64);
    (__L2 ?? runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, 1), "fill", 0, __L1))(64);
    (__L3 ?? runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, 2), "fill", 0, __L1))(64);
    for (let offs: any = 0; (((offs) < (1024)) ? 1 : 0); offs = ((offs) + (1))) {
      let sx: any = ((((offs) % (32))) | 0);
      let sy: any = ((runtime.divide(offs, 32)) | 0);
      if (((__deref_draw_layers(runtime, h_m_video_mode)) & (1))) {
        sx = ((((31) - (sx))) | 0);
      }
      if (((__deref_draw_layers(runtime, h_m_video_mode)) & (2))) {
        sy = ((((31) - (sy))) | 0);
      }
      runtime.memberCall((__L6 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((((runtime.readIndex(h_m_colorbank, 0)) & (8))) ? (2) : (0))), "transpen", 0, undefined)(runtime.readIndex(h_m_layer_bitmap, 0), (__L4 ?? runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, 0), "cliprect", 0, __L5))(), runtime.readIndex(runtime.readIndex(h_m_videoram, 0), offs), ((runtime.readIndex(h_m_colorbank, 0)) & (7)), ((__deref_draw_layers(runtime, h_m_video_mode)) & (1)), ((__deref_draw_layers(runtime, h_m_video_mode)) & (2)), ((8) * (sx)), ((8) * (sy)), 0);
      runtime.memberCall((__L6 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((((runtime.readIndex(h_m_colorbank, 0)) & (128))) ? (2) : (0))), "transpen", 0, undefined)(runtime.readIndex(h_m_layer_bitmap, 1), (__L7 ?? runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, 1), "cliprect", 0, __L5))(), runtime.readIndex(runtime.readIndex(h_m_videoram, 1), offs), ((runtime.shiftRight(runtime.readIndex(h_m_colorbank, 0), 4)) & (7)), ((__deref_draw_layers(runtime, h_m_video_mode)) & (1)), ((__deref_draw_layers(runtime, h_m_video_mode)) & (2)), ((8) * (sx)), ((8) * (sy)), 0);
      runtime.memberCall((__L6 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((((runtime.readIndex(h_m_colorbank, 1)) & (8))) ? (2) : (0))), "transpen", 0, undefined)(runtime.readIndex(h_m_layer_bitmap, 2), (__L8 ?? runtime.memberCall(runtime.readIndex(h_m_layer_bitmap, 2), "cliprect", 0, __L5))(), runtime.readIndex(runtime.readIndex(h_m_videoram, 2), offs), ((runtime.readIndex(h_m_colorbank, 1)) & (7)), ((__deref_draw_layers(runtime, h_m_video_mode)) & (1)), ((__deref_draw_layers(runtime, h_m_video_mode)) & (2)), ((8) * (sx)), ((8) * (sy)), 0);
    }
  }
  function __deref_draw_layers(runtime: any, p: any): any {
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

  function method_copy_layers(runtime: any, bitmap: any, cliprect: any, copy_layer_func: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bitmap.fill"], __L1: any = __l["fill"];

    const h_m_colorbank = members.m_colorbank ?? runtime.member("m_colorbank");
    const h_m_video_priority = members.m_video_priority ?? runtime.member("m_video_priority");
    (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(((8) * (((runtime.readIndex(h_m_colorbank, 1)) & (7)))), cliprect);
    for (let i: any = ((0) | 0); (((i) < (4)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let which: any = ((runtime.readIndex(runtime.readIndex((members.m_draw_order ?? runtime.member("m_draw_order")), ((__deref_copy_layers(runtime, h_m_video_priority)) & (31))), i)) | 0);
      (runtime.overrides["copy_layer__a6"] ? runtime.overrides["copy_layer__a6"](bitmap, cliprect, copy_layer_func, which, sprites_on, sprite_areas) : method_copy_layer__a6(runtime, bitmap, cliprect, copy_layer_func, which, sprites_on, sprite_areas));
    }
  }
  function __deref_copy_layers(runtime: any, p: any): any {
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

  function method_copy_layer__a6(runtime: any, bitmap: any, cliprect: any, copy_layer_func: any, which: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["CALL_METHOD"];

    if ((((which) === (0)) ? 1 : 0)) {
      (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap) : method_draw_sprites(runtime, bitmap));
    } else {
      ((__method) => __method ? __method(runtime, bitmap, cliprect, ((which) - (1)), sprites_on, sprite_areas) : (__L0 ? __L0(copy_layer_func, bitmap, cliprect, ((which) - (1)), sprites_on, sprite_areas) : runtime.macro("CALL_METHOD", copy_layer_func, bitmap, cliprect, ((which) - (1)), sprites_on, sprite_areas)))(__methodTable[copy_layer_func]);
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rectangle"];

    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_colorbank = members.m_colorbank ?? runtime.member("m_colorbank");
    let spritevisiblearea: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0(3, 254, 16, 239) : runtime.macro("rectangle", 3, 254, 16, 239)));
    let spritevisibleareaflip: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0(1, 252, 16, 239) : runtime.macro("rectangle", 1, 252, 16, 239)));
    if (((__deref_draw_sprites(runtime, h_m_video_mode)) & (128))) {
      for (let sprite: any = ((31) | 0); (((sprite) >= (0)) ? 1 : 0); sprite = ((((sprite) - (1))) | 0)) {
        let sx: any = ((0) & 0xff);
        let sy: any = ((0) & 0xff);
        let which: any = ((((((sprite) - (1))) & (31))) | 0);
        let offs: any = ((which) * (4));
        if (((((((which) >= (16)) ? 1 : 0)) && ((((which) <= (23)) ? 1 : 0))) ? 1 : 0)) {
          continue;
        }
        if ((runtime.overrides["get_sprite_xy"] ? runtime.overrides["get_sprite_xy"](which, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx, set: (value: any) => { sx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy, set: (value: any) => { sy = ((value) & 0xff); } }), offset: 0 })) : method_get_sprite_xy(runtime, which, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx, set: (value: any) => { sx = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy, set: (value: any) => { sy = ((value) & 0xff); } }), offset: 0 })))) {
          let code: any = ((((runtime.readIndex(h_m_spriteram, __add_draw_sprites(runtime, ((((((__deref_draw_sprites(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 3))) & (63))) | 0);
          let color: any = ((__add_draw_sprites(runtime, ((2) * (((runtime.shiftRight(runtime.readIndex(h_m_colorbank, 1), 4)) & (3)))), ((runtime.shiftRight(runtime.readIndex(h_m_spriteram, __add_draw_sprites(runtime, ((((((__deref_draw_sprites(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 2)), 2)) & (1)))) | 0);
          let flip_x: any = ((((runtime.readIndex(h_m_spriteram, __add_draw_sprites(runtime, ((((((__deref_draw_sprites(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 2))) & (1))) | 0);
          let flip_y: any = ((((runtime.readIndex(h_m_spriteram, __add_draw_sprites(runtime, ((((((__deref_draw_sprites(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 2))) & (2))) | 0);
          if (((__deref_draw_sprites(runtime, h_m_video_mode)) & (1))) {
            sx = ((((238) - (sx))) & 0xff);
            flip_x = ((((flip_x) ? 0 : 1)) | 0);
          }
          if (((__deref_draw_sprites(runtime, h_m_video_mode)) & (2))) {
            sy = ((((242) - (sy))) & 0xff);
            flip_y = ((((flip_y) ? 0 : 1)) | 0);
          }
          runtime.memberCall((runtime.overrides["get_sprite_gfx_element"] ? runtime.overrides["get_sprite_gfx_element"](which) : method_get_sprite_gfx_element(runtime, which)), "transpen", 0, undefined)(bitmap, ((((__deref_draw_sprites(runtime, h_m_video_mode)) & (1))) ? (spritevisibleareaflip) : (spritevisiblearea)), code, color, flip_x, flip_y, sx, sy, 0);
          runtime.memberCall((runtime.overrides["get_sprite_gfx_element"] ? runtime.overrides["get_sprite_gfx_element"](which) : method_get_sprite_gfx_element(runtime, which)), "transpen", 0, undefined)(bitmap, ((((__deref_draw_sprites(runtime, h_m_video_mode)) & (1))) ? (spritevisibleareaflip) : (spritevisiblearea)), code, color, flip_x, flip_y, ((sx) - (256)), sy, 0);
        }
      }
    }
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_draw_sprites(runtime: any, p: any): any {
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

  function method_get_sprite_gfx_element(runtime: any, which: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"];

    which = ((which) & 0xff);
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    let offs: any = ((which) * (4));
    return (__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(((((runtime.readIndex(h_m_spriteram, __add_get_sprite_gfx_element(runtime, ((((((__deref_get_sprite_gfx_element(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 3))) & (64))) ? (3) : (1)));
  }
  function __add_get_sprite_gfx_element(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_get_sprite_gfx_element(runtime: any, p: any): any {
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

  function method_check_collision(runtime: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;

    (runtime.overrides["check_sprite_sprite_collision"] ? runtime.overrides["check_sprite_sprite_collision"]() : method_check_sprite_sprite_collision(runtime));
    (runtime.overrides["check_sprite_layer_collision"] ? runtime.overrides["check_sprite_layer_collision"](sprites_on, sprite_areas) : method_check_sprite_layer_collision(runtime, sprites_on, sprite_areas));
  }

  function method_check_sprite_sprite_collision(runtime: any): any {
    const members = runtime.members;

    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    if (((__deref_check_sprite_sprite_collision(runtime, h_m_video_mode)) & (128))) {
      for (let which1: any = ((0) | 0); (((which1) < (32)) ? 1 : 0); which1 = ((((which1) + (1))) | 0)) {
        let sx1: any = ((0) & 0xff);
        let sy1: any = ((0) & 0xff);
        if (((((((which1) >= (16)) ? 1 : 0)) && ((((which1) <= (23)) ? 1 : 0))) ? 1 : 0)) {
          continue;
        }
        if ((((runtime.overrides["get_sprite_xy"] ? runtime.overrides["get_sprite_xy"](which1, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx1, set: (value: any) => { sx1 = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy1, set: (value: any) => { sy1 = ((value) & 0xff); } }), offset: 0 })) : method_get_sprite_xy(runtime, which1, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx1, set: (value: any) => { sx1 = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy1, set: (value: any) => { sy1 = ((value) & 0xff); } }), offset: 0 })))) ? 0 : 1)) {
          continue;
        }
        for (let which2: any = ((((which1) + (1))) | 0); (((which2) < (32)) ? 1 : 0); which2 = ((((which2) + (1))) | 0)) {
          let sx2: any = ((0) & 0xff);
          let sy2: any = ((0) & 0xff);
          if (((((((which2) >= (16)) ? 1 : 0)) && ((((which2) <= (23)) ? 1 : 0))) ? 1 : 0)) {
            continue;
          }
          if ((((runtime.overrides["get_sprite_xy"] ? runtime.overrides["get_sprite_xy"](which2, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx2, set: (value: any) => { sx2 = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy2, set: (value: any) => { sy2 = ((value) & 0xff); } }), offset: 0 })) : method_get_sprite_xy(runtime, which2, ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sx2, set: (value: any) => { sx2 = ((value) & 0xff); } }), offset: 0 }), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => sy2, set: (value: any) => { sy2 = ((value) & 0xff); } }), offset: 0 })))) ? 0 : 1)) {
            continue;
          }
          if ((((((Number(Math.abs(Number(((((sx1) << 24 >> 24)) - (((sx2) << 24 >> 24)))))) < Number(16)) ? 1 : 0)) && (((Number(Math.abs(Number(((((sy1) << 24 >> 24)) - (((sy2) << 24 >> 24)))))) < Number(16)) ? 1 : 0))) ? 1 : 0)) {
            let reg: any = ((0) | 0);
            if ((((runtime.overrides["check_sprite_sprite_bitpattern"] ? runtime.overrides["check_sprite_sprite_bitpattern"](sx1, sy1, which1, sx2, sy2, which2) : method_check_sprite_sprite_bitpattern(runtime, sx1, sy1, which1, sx2, sy2, which2))) ? 0 : 1)) {
              continue;
            }
            if ((((which2) === (31)) ? 1 : 0)) {
              reg = ((runtime.shiftRight(which1, 3)) | 0);
              if ((((reg) === (3)) ? 1 : 0)) {
                reg = ((2) | 0);
              }
              runtime.writeIndex(runtime.writableMember("m_collision_reg"), reg, ((runtime.readIndex(runtime.writableMember("m_collision_reg"), reg)) | (((1) << (((which1) & (7)))))));
            } else {
              reg = ((runtime.shiftRight(which2, 3)) | 0);
              if ((((reg) === (3)) ? 1 : 0)) {
                reg = ((2) | 0);
              }
              runtime.writeIndex(runtime.writableMember("m_collision_reg"), reg, ((runtime.readIndex(runtime.writableMember("m_collision_reg"), reg)) | (((1) << (((which2) & (7)))))));
            }
          }
        }
      }
    }
  }
  function __deref_check_sprite_sprite_collision(runtime: any, p: any): any {
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

  function method_check_sprite_sprite_bitpattern(runtime: any, sx1: any, sy1: any, which1: any, sx2: any, sy2: any, which2: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_sprite_collbitmap1.fill"], __L1: any = __l["fill"], __L2: any = __l["m_sprite_sprite_collbitmap1.cliprect"], __L3: any = __l["cliprect"], __L4: any = __l["m_sprite_sprite_collbitmap2.fill"], __L5: any = __l["m_sprite_sprite_collbitmap2.cliprect"], __L6: any = __l["m_sprite_sprite_collbitmap1.pix"], __L7: any = __l["pix"], __L8: any = __l["m_sprite_sprite_collbitmap2.pix"];
    let __t0: any, __t1: any;

    const h_m_sprite_sprite_collbitmap1 = members.m_sprite_sprite_collbitmap1 ?? runtime.member("m_sprite_sprite_collbitmap1");
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    const h_m_sprite_sprite_collbitmap2 = members.m_sprite_sprite_collbitmap2 ?? runtime.member("m_sprite_sprite_collbitmap2");
    let minx: any = ((0) | 0);
    let miny: any = ((0) | 0);
    let maxx: any = ((16) | 0);
    let maxy: any = ((16) | 0);
    let offs1: any = ((which1) * (4));
    let offs2: any = ((which2) * (4));
    if ((((sx1) < (sx2)) ? 1 : 0)) {
      sx2 = ((((sx2) - (sx1))) | 0);
      sx1 = ((0) | 0);
      minx = ((sx2) | 0);
    } else {
      sx1 = ((((sx1) - (sx2))) | 0);
      sx2 = ((0) | 0);
      minx = ((sx1) | 0);
    }
    if ((((sy1) < (sy2)) ? 1 : 0)) {
      sy2 = ((((sy2) - (sy1))) | 0);
      sy1 = ((0) | 0);
      miny = ((sy2) | 0);
    } else {
      sy1 = ((((sy1) - (sy2))) | 0);
      sy2 = ((0) | 0);
      miny = ((sy1) | 0);
    }
    (__L0 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap1, "fill", 0, __L1))(64);
    runtime.memberCall((runtime.overrides["get_sprite_gfx_element"] ? runtime.overrides["get_sprite_gfx_element"](which1) : method_get_sprite_gfx_element(runtime, which1)), "transpen", 0, undefined)(h_m_sprite_sprite_collbitmap1, (__L2 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap1, "cliprect", 0, __L3))(), ((runtime.readIndex(h_m_spriteram, __add_check_sprite_sprite_bitpattern(runtime, ((((((__deref_check_sprite_sprite_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs1)), 3))) & (63)), 0, ((runtime.readIndex(h_m_spriteram, __add_check_sprite_sprite_bitpattern(runtime, ((((((__deref_check_sprite_sprite_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs1)), 2))) & (1)), ((runtime.readIndex(h_m_spriteram, __add_check_sprite_sprite_bitpattern(runtime, ((((((__deref_check_sprite_sprite_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs1)), 2))) & (2)), sx1, sy1, 0);
    (__L4 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap2, "fill", 0, __L1))(64);
    runtime.memberCall((runtime.overrides["get_sprite_gfx_element"] ? runtime.overrides["get_sprite_gfx_element"](which2) : method_get_sprite_gfx_element(runtime, which2)), "transpen", 0, undefined)(h_m_sprite_sprite_collbitmap2, (__L5 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap2, "cliprect", 0, __L3))(), ((runtime.readIndex(h_m_spriteram, __add_check_sprite_sprite_bitpattern(runtime, ((((((__deref_check_sprite_sprite_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs2)), 3))) & (63)), 0, ((runtime.readIndex(h_m_spriteram, __add_check_sprite_sprite_bitpattern(runtime, ((((((__deref_check_sprite_sprite_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs2)), 2))) & (1)), ((runtime.readIndex(h_m_spriteram, __add_check_sprite_sprite_bitpattern(runtime, ((((((__deref_check_sprite_sprite_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs2)), 2))) & (2)), sx2, sy2, 0);
    for (let y: any = ((miny) | 0); (((y) < (maxy)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      for (let x: any = ((minx) | 0); (((x) < (maxx)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        if ((((((Number((__L6 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap1, "pix", 0, __L7))(y, x)) !== Number(64)) ? 1 : 0)) && (((Number((__L8 ?? runtime.memberCall(members.m_sprite_sprite_collbitmap2, "pix", 0, __L7))(y, x)) !== Number(64)) ? 1 : 0))) ? 1 : 0)) {
          return 1;
        }
      }
    }
    return 0;
  }
  function __add_check_sprite_sprite_bitpattern(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_check_sprite_sprite_bitpattern(runtime: any, p: any): any {
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

  function method_check_sprite_layer_collision(runtime: any, sprites_on: any, sprite_areas: any): any {
    const members = runtime.members;

    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    if (((__deref_check_sprite_layer_collision(runtime, h_m_video_mode)) & (128))) {
      for (let which: any = ((0) | 0); (((which) < (32)) ? 1 : 0); which = ((((which) + (1))) | 0)) {
        if (((((((which) >= (16)) ? 1 : 0)) && ((((which) <= (23)) ? 1 : 0))) ? 1 : 0)) {
          continue;
        }
        if (runtime.readIndex(sprites_on, which)) {
          runtime.writeIndex(runtime.writableMember("m_collision_reg"), 3, ((runtime.readIndex(runtime.writableMember("m_collision_reg"), 3)) | ((runtime.overrides["check_sprite_layer_bitpattern"] ? runtime.overrides["check_sprite_layer_bitpattern"](which, sprite_areas) : method_check_sprite_layer_bitpattern(runtime, which, sprite_areas)))));
        }
      }
    }
  }
  function __deref_check_sprite_layer_collision(runtime: any, p: any): any {
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

  function method_check_sprite_layer_bitpattern(runtime: any, which: any, sprite_areas: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_layer_collbitmap1.fill"], __L1: any = __l["fill"], __L2: any = __l["m_sprite_layer_collbitmap1.cliprect"], __L3: any = __l["cliprect"], __L4: any = __l["m_sprite_layer_collbitmap1.pix"], __L5: any = __l["pix"], __L6: any = __l["m_sprite_layer_collbitmap2[0].pix"], __L7: any = __l["m_sprite_layer_collbitmap2[1].pix"], __L8: any = __l["m_sprite_layer_collbitmap2[2].pix"];
    let __t0: any;

    const h_m_video_mode = members.m_video_mode ?? runtime.member("m_video_mode");
    const h_layer_enable_mask = members.layer_enable_mask ?? runtime.member("layer_enable_mask");
    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_sprite_layer_collbitmap1 = members.m_sprite_layer_collbitmap1 ?? runtime.member("m_sprite_layer_collbitmap1");
    const h_m_sprite_layer_collbitmap2 = members.m_sprite_layer_collbitmap2 ?? runtime.member("m_sprite_layer_collbitmap2");
    let offs: any = ((which) * (4));
    let result: any = ((0) | 0);
    let check_layer_1: any = ((((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (runtime.readIndex(h_layer_enable_mask, 0)))) | 0);
    let check_layer_2: any = ((((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (runtime.readIndex(h_layer_enable_mask, 1)))) | 0);
    let check_layer_3: any = ((((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (runtime.readIndex(h_layer_enable_mask, 2)))) | 0);
    let minx: any = ((runtime.readIndex(sprite_areas, which).min_x) | 0);
    let miny: any = ((runtime.readIndex(sprite_areas, which).min_y) | 0);
    let maxx: any = ((__add_check_sprite_layer_bitpattern(runtime, runtime.readIndex(sprite_areas, which).max_x, 1)) | 0);
    let maxy: any = ((__add_check_sprite_layer_bitpattern(runtime, runtime.readIndex(sprite_areas, which).max_y, 1)) | 0);
    let flip_x: any = ((((((runtime.readIndex(h_m_spriteram, __add_check_sprite_layer_bitpattern(runtime, ((((((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 2))) & (1))) ^ (((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (1))))) | 0);
    let flip_y: any = ((((((runtime.readIndex(h_m_spriteram, __add_check_sprite_layer_bitpattern(runtime, ((((((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 2))) & (2))) ^ (((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (2))))) | 0);
    (__L0 ?? runtime.memberCall(members.m_sprite_layer_collbitmap1, "fill", 0, __L1))(64);
    runtime.memberCall((runtime.overrides["get_sprite_gfx_element"] ? runtime.overrides["get_sprite_gfx_element"](which) : method_get_sprite_gfx_element(runtime, which)), "transpen", 0, undefined)(h_m_sprite_layer_collbitmap1, (__L2 ?? runtime.memberCall(members.m_sprite_layer_collbitmap1, "cliprect", 0, __L3))(), ((runtime.readIndex(h_m_spriteram, __add_check_sprite_layer_bitpattern(runtime, ((((((__deref_check_sprite_layer_bitpattern(runtime, h_m_video_mode)) & (4))) ? (128) : (0))) + (offs)), 3))) & (63)), 0, flip_x, flip_y, 0, 0, 0);
    for (let y: any = ((miny) | 0); (((y) < (maxy)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      for (let x: any = ((minx) | 0); (((x) < (maxx)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        if (((Number((__L4 ?? runtime.memberCall(members.m_sprite_layer_collbitmap1, "pix", 0, __L5))(((y) - (miny)), ((x) - (minx)))) !== Number(64)) ? 1 : 0)) {
          if ((((check_layer_1) && (((Number((__L6 ?? runtime.memberCall(runtime.readIndex(h_m_sprite_layer_collbitmap2, 0), "pix", 0, __L5))(y, x)) !== Number(64)) ? 1 : 0))) ? 1 : 0)) {
            result = ((((result) | (1))) | 0);
          }
          if ((((check_layer_2) && (((Number((__L7 ?? runtime.memberCall(runtime.readIndex(h_m_sprite_layer_collbitmap2, 1), "pix", 0, __L5))(y, x)) !== Number(64)) ? 1 : 0))) ? 1 : 0)) {
            result = ((((result) | (2))) | 0);
          }
          if ((((check_layer_3) && (((Number((__L8 ?? runtime.memberCall(runtime.readIndex(h_m_sprite_layer_collbitmap2, 2), "pix", 0, __L5))(y, x)) !== Number(64)) ? 1 : 0))) ? 1 : 0)) {
            result = ((((result) | (4))) | 0);
          }
        }
      }
    }
    return result;
  }
  function __add_check_sprite_layer_bitpattern(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_check_sprite_layer_bitpattern(runtime: any, p: any): any {
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

  function method_dacvol_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dacvol.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_dacvol, "write", 0, undefined))(1073741832, ((data) ^ (255)));
  }

  function method_input_port_4_f0_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_input_port_4_f0 = ((((data) >>> (4))) & 0xff);
  }

  function method_input_port_4_f0_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_input_port_4_f0 ?? runtime.member("m_input_port_4_f0"));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "characterram_w": method_characterram_w,
    "fake_data_r": method_fake_data_r,
    "fake_data_w": method_fake_data_w,
    "fake_status_r": method_fake_status_r,
    "gfxrom_r": method_gfxrom_r,
    "collision_reg_clear_w": method_collision_reg_clear_w,
    "soundlatch_w": method_soundlatch_w,
    "sound_semaphore2_w": method_sound_semaphore2_w,
    "soundlatch_clear7_w": method_soundlatch_clear7_w,
    "soundlatch_flags_r": method_soundlatch_flags_r,
    "sound_semaphore2_clear_w": method_sound_semaphore2_clear_w,
    "video_start": method_video_start,
    "compute_draw_order": method_compute_draw_order,
    "screen_update": method_screen_update,
    "video_update_common": method_video_update_common,
    "calculate_sprite_areas": method_calculate_sprite_areas,
    "get_sprite_xy": method_get_sprite_xy,
    "set_pens": method_set_pens,
    "compute_resistor_weights": method_compute_resistor_weights,
    "combine_weights__int__3": method_combine_weights__int__3,
    "emu_detail__combine_weights__0__2": method_emu_detail__combine_weights__0__2,
    "emu_detail__combine_weights__1__1": method_emu_detail__combine_weights__1__1,
    "emu_detail__combine_weights__2__0": method_emu_detail__combine_weights__2__0,
    "draw_layers": method_draw_layers,
    "copy_layers": method_copy_layers,
    "copy_layer__a6": method_copy_layer__a6,
    "draw_sprites": method_draw_sprites,
    "get_sprite_gfx_element": method_get_sprite_gfx_element,
    "check_collision": method_check_collision,
    "check_sprite_sprite_collision": method_check_sprite_sprite_collision,
    "check_sprite_sprite_bitpattern": method_check_sprite_sprite_bitpattern,
    "check_sprite_layer_collision": method_check_sprite_layer_collision,
    "check_sprite_layer_bitpattern": method_check_sprite_layer_bitpattern,
    "dacvol_w": method_dacvol_w,
    "input_port_4_f0_w": method_input_port_4_f0_w,
    "input_port_4_f0_r": method_input_port_4_f0_r
  };
  return __methodTable;
})();
    return {
      "taitosj_state.characterram_w": methods["characterram_w"],
      "taitosj_state.fake_data_r": methods["fake_data_r"],
      "taitosj_state.fake_data_w": methods["fake_data_w"],
      "taitosj_state.fake_status_r": methods["fake_status_r"],
      "taitosj_state.gfxrom_r": methods["gfxrom_r"],
      "taitosj_state.collision_reg_clear_w": methods["collision_reg_clear_w"],
      "taitosj_state.soundlatch_w": methods["soundlatch_w"],
      "taitosj_state.sound_semaphore2_w": methods["sound_semaphore2_w"],
      "taitosj_state.soundlatch_clear7_w": methods["soundlatch_clear7_w"],
      "taitosj_state.soundlatch_flags_r": methods["soundlatch_flags_r"],
      "taitosj_state.sound_semaphore2_clear_w": methods["sound_semaphore2_clear_w"],
      "taitosj_state.video_start": methods["video_start"],
      "taitosj_state.compute_draw_order": methods["compute_draw_order"],
      "taitosj_state.screen_update": methods["screen_update"],
      "taitosj_state.video_update_common": methods["video_update_common"],
      "taitosj_state.set_pens": methods["set_pens"],
      "taitosj_state.compute_resistor_weights": methods["compute_resistor_weights"],
      "taitosj_state.combine_weights__int__3": methods["combine_weights__int__3"],
      "taitosj_state.emu_detail__combine_weights__0__2": methods["emu_detail__combine_weights__0__2"],
      "taitosj_state.emu_detail__combine_weights__1__1": methods["emu_detail__combine_weights__1__1"],
      "taitosj_state.emu_detail__combine_weights__2__0": methods["emu_detail__combine_weights__2__0"],
      "taitosj_state.draw_layers": methods["draw_layers"],
      "taitosj_state.copy_layers": methods["copy_layers"],
      "taitosj_state.copy_layer__a6": methods["copy_layer__a6"],
      "taitosj_state.draw_sprites": methods["draw_sprites"],
      "taitosj_state.get_sprite_gfx_element": methods["get_sprite_gfx_element"],
      "taitosj_state.check_collision": methods["check_collision"],
      "taitosj_state.check_sprite_sprite_collision": methods["check_sprite_sprite_collision"],
      "taitosj_state.check_sprite_sprite_bitpattern": methods["check_sprite_sprite_bitpattern"],
      "taitosj_state.check_sprite_layer_collision": methods["check_sprite_layer_collision"],
      "taitosj_state.check_sprite_layer_bitpattern": methods["check_sprite_layer_bitpattern"],
      "taitosj_state.dacvol_w": methods["dacvol_w"],
      "taitosj_state.input_port_4_f0_w": methods["input_port_4_f0_w"],
      "taitosj_state.input_port_4_f0_r": methods["input_port_4_f0_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["CALL_METHOD","allocate","bitmap.fill","cliprect","fatalerror","fill","m_dacvol.write","m_gfxdecode.gfx","m_layer_bitmap[0].cliprect","m_layer_bitmap[0].fill","m_layer_bitmap[1].cliprect","m_layer_bitmap[1].fill","m_layer_bitmap[2].cliprect","m_layer_bitmap[2].fill","m_palette.set_pen_color","m_sprite_layer_collbitmap1.allocate","m_sprite_layer_collbitmap1.cliprect","m_sprite_layer_collbitmap1.fill","m_sprite_layer_collbitmap1.pix","m_sprite_layer_collbitmap2[0].cliprect","m_sprite_layer_collbitmap2[0].pix","m_sprite_layer_collbitmap2[1].pix","m_sprite_layer_collbitmap2[2].pix","m_sprite_sprite_collbitmap1.allocate","m_sprite_sprite_collbitmap1.cliprect","m_sprite_sprite_collbitmap1.fill","m_sprite_sprite_collbitmap1.pix","m_sprite_sprite_collbitmap2.allocate","m_sprite_sprite_collbitmap2.cliprect","m_sprite_sprite_collbitmap2.fill","m_sprite_sprite_collbitmap2.pix","memregion","pix","rectangle","rgb_t","std::clamp"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
