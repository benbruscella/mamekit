// GENERATED executable machine composition from src/mame/exidy/exidy.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'venture');

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


  function method_exidy_interrupt_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_maincpu.set_input_line"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
    }
    return (members.m_int_condition ?? runtime.member("m_int_condition"));
  }

  function method_sh8253_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_stream.update"], __L1: any = __l["update"], __L2: any = __l["m_pit.write"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
    (__L2 ?? runtime.memberCall(members.m_pit, "write", 0, undefined))(offset, data);
  }

  function method_sfxctrl_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_stream.update"], __L1: any = __l["update"];
    let __t0: any;

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
    switch ((offset as number)) {
      case 0:
      {
        members.m_sfxctrl = data;
        break;
      }
      case 1:
      case 2:
      case 3:
      {
        runtime.writeIndex(runtime.writableMember("m_sh6840_volume"), ((offset) - (1)), runtime.divide(((((data) & (7))) * (5461.166666666667)), 7));
        break;
      }
    }
  }

  function method_exidy_vblank_interrupt(runtime: any, device: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["device.execute"], __L1: any = __l["execute"];
    let __t0: any;

    (runtime.overrides["latch_condition"] ? runtime.overrides["latch_condition"](0) : method_latch_condition(runtime, 0));
    members.m_int_condition = ((((members.m_int_condition) & (-129))) & 0xff);
    runtime.memberCall((__L0 ?? runtime.memberCall(device, "execute", 0, __L1))(), "set_input_line", 0, undefined)(0, 1);
  }

  function method_latch_condition(runtime: any, collision: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["ioport"];
    let __t0: any;

    const h_m_collision_invert = members.m_collision_invert ?? runtime.member("m_collision_invert");
    const h_m_collision_mask = members.m_collision_mask ?? runtime.member("m_collision_mask");
    collision = ((((collision) ^ (h_m_collision_invert))) | 0);
    members.m_int_condition = (((((((__t0 = __deref_latch_condition(runtime, (__L0 ? __L0("INTSOURCE") : runtime.macro("ioport", "INTSOURCE"))), typeof __t0.read === 'function' ? (__t0.read() ?? 0) : runtime.container((__L0 ? __L0("INTSOURCE") : runtime.macro("ioport", "INTSOURCE")), "read"))) & (-29))) | (((collision) & (h_m_collision_mask))))) & 0xff);
  }
  function __deref_latch_condition(runtime: any, p: any): any {
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
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["copybitmap"];

    const h_m_background_bitmap = members.m_background_bitmap ?? runtime.member("m_background_bitmap");
    (runtime.overrides["set_colors"] ? runtime.overrides["set_colors"]() : method_set_colors(runtime));
    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"]() : method_draw_background(runtime));
    (__L0 ? __L0(bitmap, h_m_background_bitmap, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_m_background_bitmap, 0, 0, 0, 0, cliprect));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (runtime.overrides["check_collision"] ? runtime.overrides["check_collision"]() : method_check_collision(runtime));
    return 0;
  }

  function method_set_colors(runtime: any): any {
    const members = runtime.members;

    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](0, 0) : method_set_1_color(runtime, 0, 0));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](1, 7) : method_set_1_color(runtime, 1, 7));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](2, 0) : method_set_1_color(runtime, 2, 0));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](3, 6) : method_set_1_color(runtime, 3, 6));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](4, 4) : method_set_1_color(runtime, 4, 4));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](5, 3) : method_set_1_color(runtime, 5, 3));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](6, 2) : method_set_1_color(runtime, 6, 2));
    (runtime.overrides["set_1_color"] ? runtime.overrides["set_1_color"](7, 1) : method_set_1_color(runtime, 7, 1));
  }

  function method_set_1_color(runtime: any, index: any, which: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["pal1bit"], __L1: any = __l["m_palette.set_pen_color"];

    const h_m_color_latch = members.m_color_latch ?? runtime.member("m_color_latch");
    (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(index, (__L0 ? __L0(runtime.shiftRight(runtime.readIndex(h_m_color_latch, 2), which)) : runtime.macro("pal1bit", runtime.shiftRight(runtime.readIndex(h_m_color_latch, 2), which))), (__L0 ? __L0(runtime.shiftRight(runtime.readIndex(h_m_color_latch, 1), which)) : runtime.macro("pal1bit", runtime.shiftRight(runtime.readIndex(h_m_color_latch, 1), which))), (__L0 ? __L0(runtime.shiftRight(runtime.readIndex(h_m_color_latch, 0), which)) : runtime.macro("pal1bit", runtime.shiftRight(runtime.readIndex(h_m_color_latch, 0), which))));
  }

  function method_draw_background(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"];
    let __t0: any;

    const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
    const h_m_is_2bpp = members.m_is_2bpp ?? runtime.member("m_is_2bpp");
    const h_m_background_bitmap = members.m_background_bitmap ?? runtime.member("m_background_bitmap");
    let cram: any = (((members.m_characterram ?? runtime.member("m_characterram"))) ? (__addr_draw_background(runtime, (members.m_characterram ?? runtime.member("m_characterram")), 0)) : (__add_draw_background(runtime, (__t0 = __deref_draw_background(runtime, (__L0 ? __L0("maincpu") : runtime.macro("memregion", "maincpu"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("maincpu") : runtime.macro("memregion", "maincpu")), "base")), 18432))); let cram$s: any = undefined, cram$o: any = 0; if (ArrayBuffer.isView(cram) || Array.isArray(cram)) cram$s = cram; else if (cram !== null && typeof cram === 'object' && cram.generatedPointer === true && cram.path === undefined && cram.target === undefined && (ArrayBuffer.isView(cram.source) || Array.isArray(cram.source))) { cram$s = cram.source; cram$o = cram.offset; }
    let off_pen: any = 0;
    for (let offs: any = 0; (((offs) < (1024)) ? 1 : 0); offs = ((offs) + (1))) {
      let y: any = ((((((offs) >>> (5))) << (3))) & 0xff);
      let code: any = ((runtime.readIndex(h_m_videoram, offs)) & 0xff);
      let on_pen_1: any = 0;
      let on_pen_2: any = 0;
      if (h_m_is_2bpp) {
        on_pen_1 = __add_draw_background(runtime, 4, ((((code) >>> (6))) & (2)));
        on_pen_2 = __add_draw_background(runtime, 5, ((((code) >>> (6))) & (2)));
      } else {
        on_pen_1 = __add_draw_background(runtime, 4, ((((code) >>> (6))) & (3)));
        on_pen_2 = off_pen;
      }
      for (let cy: any = ((0) & 0xff); (((cy) < (8)) ? 1 : 0); cy = ((((cy) + (1))) & 0xff)) {
        let x: any = ((((offs) << (3))) & 0xff);
        if (h_m_is_2bpp) {
          let data1: any = (((cram$s !== undefined ? (cram$s[cram$o + (((((0) | (((code) << (3))))) | (cy)))] ?? 0) : runtime.readIndex(cram, ((((0) | (((code) << (3))))) | (cy))))) & 0xff);
          let data2: any = (((cram$s !== undefined ? (cram$s[cram$o + (((((2048) | (((code) << (3))))) | (cy)))] ?? 0) : runtime.readIndex(cram, ((((2048) | (((code) << (3))))) | (cy))))) & 0xff);
          for (let i: any = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            if (((data1) & (128))) {
              h_m_background_bitmap["pix="](y, x, ((((data2) & (128))) ? (on_pen_2) : (on_pen_1)));
            } else {
              h_m_background_bitmap["pix="](y, x, off_pen);
            }
            x = ((((x) + (1))) & 0xff);
            data1 = ((((data1) << (1))) & 0xff);
            data2 = ((((data2) << (1))) & 0xff);
          }
        } else {
          let data: any = (((cram$s !== undefined ? (cram$s[cram$o + (((((code) << (3))) | (cy)))] ?? 0) : runtime.readIndex(cram, ((((code) << (3))) | (cy))))) & 0xff);
          for (let i: any = ((0) | 0); (((i) < (8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_background_bitmap["pix="](y, x, ((((data) & (128))) ? (on_pen_1) : (off_pen)));
            x = ((((x) + (1))) & 0xff);
            data = ((((data) << (1))) & 0xff);
          }
        }
        y = ((((y) + (1))) & 0xff);
      }
    }
  }
  function __add_draw_background(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_draw_background(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }
  function __deref_draw_background(runtime: any, p: any): any {
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"];

    const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
    const h_m_sprite2_xpos = members.m_sprite2_xpos ?? runtime.member("m_sprite2_xpos");
    const h_m_sprite2_ypos = members.m_sprite2_ypos ?? runtime.member("m_sprite2_ypos");
    const h_m_spriteno = members.m_spriteno ?? runtime.member("m_spriteno");
    const h_m_sprite1_xpos = members.m_sprite1_xpos ?? runtime.member("m_sprite1_xpos");
    const h_m_sprite1_ypos = members.m_sprite1_ypos ?? runtime.member("m_sprite1_ypos");
    let sprite_set_2: any = ((((Number(((__deref_draw_sprites(runtime, h_m_sprite_enable)) & (64))) !== Number(0)) ? 1 : 0)) | 0);
    let sx: any = ((((((236) - (__deref_draw_sprites(runtime, h_m_sprite2_xpos)))) - (4))) | 0);
    let sy: any = ((((((244) - (__deref_draw_sprites(runtime, h_m_sprite2_ypos)))) - (4))) | 0);
    runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, __add_draw_sprites(runtime, __add_draw_sprites(runtime, ((runtime.shiftRight(__deref_draw_sprites(runtime, h_m_spriteno), 4)) & (15)), 32), ((16) * (sprite_set_2))), 1, 0, 0, sx, sy, 0);
    if ((runtime.overrides["sprite_1_enabled"] ? runtime.overrides["sprite_1_enabled"]() : method_sprite_1_enabled(runtime))) {
      let sprite_set_1: any = ((((Number(((__deref_draw_sprites(runtime, h_m_sprite_enable)) & (32))) !== Number(0)) ? 1 : 0)) | 0);
      sx = ((((((236) - (__deref_draw_sprites(runtime, h_m_sprite1_xpos)))) - (4))) | 0);
      sy = ((((((244) - (__deref_draw_sprites(runtime, h_m_sprite1_ypos)))) - (4))) | 0);
      if ((((sy) < (0)) ? 1 : 0)) {
        sy = ((0) | 0);
      }
      runtime.memberCall((__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, __add_draw_sprites(runtime, ((__deref_draw_sprites(runtime, h_m_spriteno)) & (15)), ((16) * (sprite_set_1))), 0, 0, 0, sx, sy, 0);
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

  function method_sprite_1_enabled(runtime: any): any {
    const members = runtime.members;

    const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
    const h_m_collision_mask = members.m_collision_mask ?? runtime.member("m_collision_mask");
    return ((((((((((__deref_sprite_1_enabled(runtime, h_m_sprite_enable)) & (128))) ? 0 : 1)) || (((__deref_sprite_1_enabled(runtime, h_m_sprite_enable)) & (16)))) ? 1 : 0)) || (((Number(h_m_collision_mask) === Number(0)) ? 1 : 0))) ? 1 : 0);
  }
  function __deref_sprite_1_enabled(runtime: any, p: any): any {
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

  function method_check_collision(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rectangle"], __L1: any = __l["m_motion_object_1_vid.fill"], __L2: any = __l["fill"], __L3: any = __l["m_gfxdecode.gfx"], __L4: any = __l["m_motion_object_2_vid.fill"], __L5: any = __l["m_motion_object_2_clip.fill"], __L6: any = __l["m_motion_object_1_vid.pix"], __L7: any = __l["pix"], __L8: any = __l["m_background_bitmap.pix"], __L9: any = __l["m_motion_object_2_clip.pix"], __L10: any = __l["m_screen.time_until_pos"], __L11: any = __l["m_motion_object_2_vid.pix"];

    const h_m_sprite_enable = members.m_sprite_enable ?? runtime.member("m_sprite_enable");
    const h_m_collision_mask = members.m_collision_mask ?? runtime.member("m_collision_mask");
    const h_m_sprite1_xpos = members.m_sprite1_xpos ?? runtime.member("m_sprite1_xpos");
    const h_m_sprite1_ypos = members.m_sprite1_ypos ?? runtime.member("m_sprite1_ypos");
    const h_m_motion_object_1_vid = members.m_motion_object_1_vid ?? runtime.member("m_motion_object_1_vid");
    const h_m_spriteno = members.m_spriteno ?? runtime.member("m_spriteno");
    const h_m_sprite2_xpos = members.m_sprite2_xpos ?? runtime.member("m_sprite2_xpos");
    const h_m_sprite2_ypos = members.m_sprite2_ypos ?? runtime.member("m_sprite2_ypos");
    const h_m_motion_object_2_vid = members.m_motion_object_2_vid ?? runtime.member("m_motion_object_2_vid");
    const h_m_motion_object_2_clip = members.m_motion_object_2_clip ?? runtime.member("m_motion_object_2_clip");
    let sprite_set_1: any = ((((Number(((__deref_check_collision(runtime, h_m_sprite_enable)) & (32))) !== Number(0)) ? 1 : 0)) & 0xff);
    let sprite_set_2: any = ((((Number(((__deref_check_collision(runtime, h_m_sprite_enable)) & (64))) !== Number(0)) ? 1 : 0)) & 0xff);
    let clip: any = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__L0 ? __L0(0, 15, 0, 15) : runtime.macro("rectangle", 0, 15, 0, 15)));
    let org_1_x: any = ((0) | 0);
    let org_1_y: any = ((0) | 0);
    let org_2_x: any = ((0) | 0);
    let org_2_y: any = ((0) | 0);
    let count: any = ((0) | 0);
    if (((Number(h_m_collision_mask) === Number(0)) ? 1 : 0)) {
      return;
    }
    (__L1 ?? runtime.memberCall(members.m_motion_object_1_vid, "fill", 0, __L2))(255, clip);
    if ((runtime.overrides["sprite_1_enabled"] ? runtime.overrides["sprite_1_enabled"]() : method_sprite_1_enabled(runtime))) {
      org_1_x = ((((((236) - (__deref_check_collision(runtime, h_m_sprite1_xpos)))) - (4))) | 0);
      org_1_y = ((((((244) - (__deref_check_collision(runtime, h_m_sprite1_ypos)))) - (4))) | 0);
      runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(h_m_motion_object_1_vid, clip, __add_check_collision(runtime, ((__deref_check_collision(runtime, h_m_spriteno)) & (15)), ((16) * (sprite_set_1))), 0, 0, 0, 0, 0, 0);
    }
    (__L4 ?? runtime.memberCall(members.m_motion_object_2_vid, "fill", 0, __L2))(255, clip);
    org_2_x = ((((((236) - (__deref_check_collision(runtime, h_m_sprite2_xpos)))) - (4))) | 0);
    org_2_y = ((((((244) - (__deref_check_collision(runtime, h_m_sprite2_ypos)))) - (4))) | 0);
    runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(h_m_motion_object_2_vid, clip, __add_check_collision(runtime, __add_check_collision(runtime, ((runtime.shiftRight(__deref_check_collision(runtime, h_m_spriteno), 4)) & (15)), 32), ((16) * (sprite_set_2))), 0, 0, 0, 0, 0, 0);
    (__L5 ?? runtime.memberCall(members.m_motion_object_2_clip, "fill", 0, __L2))(255, clip);
    if ((runtime.overrides["sprite_1_enabled"] ? runtime.overrides["sprite_1_enabled"]() : method_sprite_1_enabled(runtime))) {
      let sx: any = ((((org_2_x) - (org_1_x))) | 0);
      let sy: any = ((((org_2_y) - (org_1_y))) | 0);
      runtime.memberCall((__L3 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(h_m_motion_object_2_clip, clip, __add_check_collision(runtime, __add_check_collision(runtime, ((runtime.shiftRight(__deref_check_collision(runtime, h_m_spriteno), 4)) & (15)), 32), ((16) * (sprite_set_2))), 0, 0, 0, sx, sy, 0);
    }
    for (let sy: any = ((0) | 0); (((sy) < (16)) ? 1 : 0); sy = ((((sy) + (1))) | 0)) {
      for (let sx: any = ((0) | 0); (((sx) < (16)) ? 1 : 0); sx = ((((sx) + (1))) | 0)) {
        if (((Number((__L6 ?? runtime.memberCall(members.m_motion_object_1_vid, "pix", 0, __L7))(sy, sx)) !== Number(255)) ? 1 : 0)) {
          let current_collision_mask: any = ((0) & 0xff);
          if (((Number((__L8 ?? runtime.memberCall(members.m_background_bitmap, "pix", 0, __L7))(((org_1_y) + (sy)), ((org_1_x) + (sx)))) !== Number(0)) ? 1 : 0)) {
            current_collision_mask = ((((current_collision_mask) | (4))) & 0xff);
          }
          if (((Number((__L9 ?? runtime.memberCall(members.m_motion_object_2_clip, "pix", 0, __L7))(sy, sx)) !== Number(255)) ? 1 : 0)) {
            current_collision_mask = ((((current_collision_mask) | (16))) & 0xff);
          }
          if ((((((current_collision_mask) & (h_m_collision_mask))) && ((((count) < (128)) ? 1 : 0))) ? 1 : 0)) {
            runtime.memberCall(runtime.readIndex((members.m_collision_timer ?? runtime.member("m_collision_timer")), count), "adjust", 0, undefined)((__L10 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(((org_1_x) + (sx)), ((org_1_y) + (sy))), current_collision_mask);
            count = ((((count) + (1))) | 0);
          }
        }
        if (((Number((__L11 ?? runtime.memberCall(members.m_motion_object_2_vid, "pix", 0, __L7))(sy, sx)) !== Number(255)) ? 1 : 0)) {
          if (((Number((__L8 ?? runtime.memberCall(members.m_background_bitmap, "pix", 0, __L7))(((org_2_y) + (sy)), ((org_2_x) + (sx)))) !== Number(0)) ? 1 : 0)) {
            if ((((((h_m_collision_mask) & (8))) && ((((count) < (128)) ? 1 : 0))) ? 1 : 0)) {
              runtime.memberCall(runtime.readIndex((members.m_collision_timer ?? runtime.member("m_collision_timer")), count), "adjust", 0, undefined)((__L10 ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(((org_2_x) + (sx)), ((org_2_y) + (sy))), 8);
              count = ((((count) + (1))) | 0);
            }
          }
        }
      }
    }
  }
  function __add_check_collision(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_check_collision(runtime: any, p: any): any {
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

  function method_cb_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_pia.cb1_w"];

    (__L0 ?? runtime.memberCall(members.m_pia, "cb1_w", 0, undefined))(state);
  }

  function method_ca_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_pia.ca1_w"];

    (__L0 ?? runtime.memberCall(members.m_pia, "ca1_w", 0, undefined))(state);
  }

  function method_pit_out_0(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_stream.update"], __L1: any = __l["update"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
    if (state) {
      members.m_pit_out = ((members.m_pit_out) | (((((1) & 0xff)) << (0))));
    } else {
      members.m_pit_out = runtime.andAssign(members.m_pit_out, (~((((1) & 0xff)) << (0))));
    }
  }

  function method_pit_out_1(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_stream.update"], __L1: any = __l["update"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
    if (state) {
      members.m_pit_out = ((members.m_pit_out) | (((((1) & 0xff)) << (1))));
    } else {
      members.m_pit_out = runtime.andAssign(members.m_pit_out, (~((((1) & 0xff)) << (1))));
    }
  }

  function method_pit_out_2(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_stream.update"], __L1: any = __l["update"];
    let __t0: any;

    (__L0 ?? runtime.memberCall(members.m_stream, "update", 0, __L1))();
    if (state) {
      members.m_pit_out = ((members.m_pit_out) | (((((1) & 0xff)) << (2))));
    } else {
      members.m_pit_out = runtime.andAssign(members.m_pit_out, (~((((1) & 0xff)) << (2))));
    }
  }

  function method_pia_ca2_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ca2_callback"];

    (__L0 ? __L0(state) : runtime.macro("m_ca2_callback", state));
  }

  function method_pia_cb2_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_cb2_callback"];

    (__L0 ? __L0(state) : runtime.macro("m_cb2_callback", state));
  }

  function method_intsource_coins_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dsw.read"], __L1: any = __l["read"], __L2: any = __l["m_in0.read"];
    let __t0: any, __t1: any;

    let dsw: any = (((__L0 ?? runtime.memberCall(members.m_dsw, "read", 0, __L1))()) & 0xff);
    let in0: any = (((__L2 ?? runtime.memberCall(members.m_in0, "read", 0, __L1))()) & 0xff);
    return ((((((((~in0)) >>> (7)) & 1)) << (1))) | ((((dsw) >>> (0)) & 1)));
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "exidy_interrupt_r": method_exidy_interrupt_r,
    "sh8253_w": method_sh8253_w,
    "sfxctrl_w": method_sfxctrl_w,
    "exidy_vblank_interrupt": method_exidy_vblank_interrupt,
    "latch_condition": method_latch_condition,
    "screen_update": method_screen_update,
    "set_colors": method_set_colors,
    "set_1_color": method_set_1_color,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "sprite_1_enabled": method_sprite_1_enabled,
    "check_collision": method_check_collision,
    "cb_w": method_cb_w,
    "ca_w": method_ca_w,
    "pit_out_0": method_pit_out_0,
    "pit_out_1": method_pit_out_1,
    "pit_out_2": method_pit_out_2,
    "pia_ca2_w": method_pia_ca2_w,
    "pia_cb2_w": method_pia_cb2_w,
    "intsource_coins_r": method_intsource_coins_r
  };
  return __methodTable;
})();
    return {
      "exidy_state.exidy_interrupt_r": methods["exidy_interrupt_r"],
      "exidy_state.exidy_vblank_interrupt": methods["exidy_vblank_interrupt"],
      "exidy_state.latch_condition": methods["latch_condition"],
      "exidy_state.screen_update": methods["screen_update"],
      "exidy_state.set_colors": methods["set_colors"],
      "exidy_state.set_1_color": methods["set_1_color"],
      "exidy_state.draw_background": methods["draw_background"],
      "exidy_state.draw_sprites": methods["draw_sprites"],
      "exidy_state.sprite_1_enabled": methods["sprite_1_enabled"],
      "exidy_state.check_collision": methods["check_collision"],
      "exidy_state.intsource_coins_r": methods["intsource_coins_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["copybitmap","device.execute","execute","fill","ioport","m_background_bitmap.pix","m_ca2_callback","m_cb2_callback","m_dsw.read","m_gfxdecode.gfx","m_in0.read","m_maincpu.set_input_line","m_motion_object_1_vid.fill","m_motion_object_1_vid.pix","m_motion_object_2_clip.fill","m_motion_object_2_clip.pix","m_motion_object_2_vid.fill","m_motion_object_2_vid.pix","m_palette.set_pen_color","m_pia.ca1_w","m_pia.cb1_w","m_pit.write","m_screen.time_until_pos","m_stream.update","machine","machine().side_effects_disabled","memregion","pal1bit","pix","read","rectangle","update"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
