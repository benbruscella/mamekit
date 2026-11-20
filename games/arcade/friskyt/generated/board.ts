// GENERATED executable machine composition from src/mame/nichibutsu/seicross.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'friskyt');

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


  function method_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    offset = ((offset) & (65503));
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    runtime.writeIndex(runtime.writableMember("m_colorram"), ((offset) + (32)), data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) + (32)));
  }

  function method_dac_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dac.write"];

    data = ((data) & 0xff);
    (__L0 ?? runtime.memberCall(members.m_dac, "write", 0, undefined))(((data) >>> (4)));
  }

  function method_machine_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_mcu.space"], __L1: any = __l["space.install_read_tap"], __L2: any = __l["install_read_tap"], __L3: any = __l["space.install_write_tap"], __L4: any = __l["install_write_tap"], __L5: any = __l["NAME"], __L6: any = __l["save_item"];

    let space: any = (__L0 ?? runtime.memberCall(members.m_mcu, "space", 0, undefined))(0);
    (__L1 ?? runtime.memberCall(space, "install_read_tap", 0, __L2))(32768, 65535, "mcu_mr_r", ((offset: any, data: any, mem_mask: any) => {
      if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
        (__l["m_mcu.adjust_icount"] ?? runtime.memberCall(members.m_mcu, "adjust_icount", 0, undefined))(-1);
      }
    }));
    (__L3 ?? runtime.memberCall(space, "install_write_tap", 0, __L4))(32768, 65535, "mcu_mr_w", ((offset: any, data: any, mem_mask: any) => {
      if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
        (__l["m_mcu.adjust_icount"] ?? runtime.memberCall(members.m_mcu, "adjust_icount", 0, undefined))(-1);
      }
    }));
    (__L6 ? __L6((__L5 ? __L5((members.m_portb ?? runtime.member("m_portb"))) : runtime.macro("NAME", (members.m_portb ?? runtime.member("m_portb"))))) : runtime.macro("save_item", (__L5 ? __L5((members.m_portb ?? runtime.member("m_portb"))) : runtime.macro("NAME", (members.m_portb ?? runtime.member("m_portb"))))));
    (__L6 ? __L6((__L5 ? __L5((members.m_irq_mask ?? runtime.member("m_irq_mask"))) : runtime.macro("NAME", (members.m_irq_mask ?? runtime.member("m_irq_mask"))))) : runtime.macro("save_item", (__L5 ? __L5((members.m_irq_mask ?? runtime.member("m_irq_mask"))) : runtime.macro("NAME", (members.m_irq_mask ?? runtime.member("m_irq_mask"))))));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((__add_get_bg_tile_info(runtime, runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (16))) << (4)))) | 0);
    let color: any = ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15))) | 0);
    let flags: any = ((((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (64))) ? (1) : (0))) | (((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (128))) ? (2) : (0))))) | 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, flags);
  }
  function __add_get_bg_tile_info(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_vblank_irq(runtime: any, device: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["device.execute"], __L1: any = __l["execute"];
    let __t0: any;

    if ((members.m_irq_mask ?? runtime.member("m_irq_mask"))) {
      runtime.memberCall((__L0 ?? runtime.memberCall(device, "execute", 0, __L1))(), "set_input_line", 0, undefined)(0, 2);
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["m_bg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"], __L4: any = __l["m_bg_tilemap.draw"], __L5: any = __l["draw"];

    const h_m_row_scroll = members.m_row_scroll ?? runtime.member("m_row_scroll");
    (__L0 ?? runtime.memberCall(bitmap, "fill", 0, __L1))(0, cliprect);
    for (let col: any = ((0) | 0); (((col) < (32)) ? 1 : 0); col = ((((col) + (1))) | 0)) {
      (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(col, runtime.readIndex(h_m_row_scroll, col));
    }
    (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    return 0;
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"], __L1: any = __l["m_gfxdecode.gfx"];

    for (let bank: any = ((0) | 0); (((bank) < (2)) ? 1 : 0); bank = ((((bank) + (1))) | 0)) {
      for (let offs: any = ((runtime.subtract(runtime.container(runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), bank), "bytes"), 4)) | 0); (((offs) >= (0)) ? 1 : 0); offs = ((((offs) - (4))) | 0)) {
        let data: any = __addr_draw_sprites(runtime, runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), bank), offs); let data$s: any = undefined, data$o: any = 0; if (ArrayBuffer.isView(data) || Array.isArray(data)) data$s = data; else if (data !== null && typeof data === 'object' && data.generatedPointer === true && data.path === undefined && data.target === undefined && (ArrayBuffer.isView(data.source) || Array.isArray(data.source))) { data$s = data.source; data$o = data.offset; }
        let code: any = (((((((((data$s !== undefined ? (data$s[data$o + (0)] ?? 0) : runtime.readIndex(data, 0))) & (63))) | ((((((data$s !== undefined ? (data$s[data$o + (1)] ?? 0) : runtime.readIndex(data, 1))) & (16))) << (2))))) | (((bank) ? (0) : (128))))) | 0);
        let color: any = (((((data$s !== undefined ? (data$s[data$o + (1)] ?? 0) : runtime.readIndex(data, 1))) & (15))) | 0);
        let flipx: any = ((((((data$s !== undefined ? (data$s[data$o + (0)] ?? 0) : runtime.readIndex(data, 0))) >>> (6)) & 1)) | 0);
        let flipy: any = ((((((data$s !== undefined ? (data$s[data$o + (0)] ?? 0) : runtime.readIndex(data, 0))) >>> (7)) & 1)) | 0);
        let sx: any = (((data$s !== undefined ? (data$s[data$o + (3)] ?? 0) : runtime.readIndex(data, 3))) | 0);
        let sy: any = ((((240) - ((data$s !== undefined ? (data$s[data$o + (2)] ?? 0) : runtime.readIndex(data, 2))))) | 0);
        if ((__L0 ? __L0() : runtime.macro("flip_screen"))) {
          sx = ((((240) - (sx))) | 0);
          sy = ((((240) - (sy))) | 0);
          flipx = ((((flipx) ? 0 : 1)) | 0);
          flipy = ((((flipy) ? 0 : 1)) | 0);
        }
        runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, sx, sy, 0);
        let dx: any = (((((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (256) : (-256))) | 0);
        runtime.memberCall((__L1 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1), "transpen", 0, undefined)(bitmap, cliprect, code, color, flipx, flipy, ((sx) + (dx)), sy, 0);
      }
    }
  }
  function __addr_draw_sprites(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
  }

  function method_portb_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_debug_port.read_safe"], __L1: any = __l["read_safe"];

    return (((((members.m_portb ?? runtime.member("m_portb"))) & (15))) | ((((__L0 ?? runtime.memberCall(members.m_debug_port, "read_safe", 0, __L1))(0)) & (240))));
  }

  function method_portb_w(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"], __L1: any = __l["m_mcu.pulse_input_line"], __L2: any = __l["m_mcu.set_input_line"];

    data = ((data) & 0xff);
    mem_mask = ((mem_mask) & 0xff);
    if ((((mem_mask) === (0)) ? 1 : 0)) {
      return;
    }
    members.m_irq_mask = ((((data) & (1))) & 0xff);
    (__L0 ? __L0(((data) & (2))) : runtime.macro("flip_screen_set", ((data) & (2))));
    if ((((((Number((((members.m_portb ?? runtime.member("m_portb"))) & (4))) === Number(0)) ? 1 : 0)) && (((data) & (4)))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_mcu, "pulse_input_line", 0, undefined))(-2, 0);
      (__L2 ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-3, 0);
    }
    members.m_portb = ((data) & 0xff);
  }

  function method_palette(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["memregion"], __L1: any = __l["palette.entries"], __L2: any = __l["entries"], __L3: any = __l["rgb_t"], __L4: any = __l["palette.set_pen_color"], __L5: any = __l["set_pen_color"];
    let __t0: any, __t1: any;

    let color_prom: any = (__t0 = __deref_palette(runtime, (__L0 ? __L0("proms") : runtime.macro("memregion", "proms"))), typeof __t0.base === 'function' ? (__t0.base() ?? 0) : runtime.container((__L0 ? __L0("proms") : runtime.macro("memregion", "proms")), "base")); let color_prom$s: any = undefined, color_prom$o: any = 0; if (ArrayBuffer.isView(color_prom) || Array.isArray(color_prom)) color_prom$s = color_prom; else if (color_prom !== null && typeof color_prom === 'object' && color_prom.generatedPointer === true && color_prom.path === undefined && color_prom.target === undefined && (ArrayBuffer.isView(color_prom.source) || Array.isArray(color_prom.source))) { color_prom$s = color_prom.source; color_prom$o = color_prom.offset; }
    for (let i: any = ((0) | 0); ((Number(i) < Number((__L1 ?? runtime.memberCall(palette, "entries", 0, __L2))())) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let bit0: any = ((0) | 0);
      let bit1: any = ((0) | 0);
      let bit2: any = ((0) | 0);
      bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (0)) & 1)) | 0);
      bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (1)) & 1)) | 0);
      bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (2)) & 1)) | 0);
      let r: any = ((__add_palette(runtime, __add_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
      bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (3)) & 1)) | 0);
      bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (4)) & 1)) | 0);
      bit2 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (5)) & 1)) | 0);
      let g: any = ((__add_palette(runtime, __add_palette(runtime, ((33) * (bit0)), ((71) * (bit1))), ((151) * (bit2)))) | 0);
      bit0 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (6)) & 1)) | 0);
      bit1 = ((((((color_prom$s !== undefined ? (color_prom$s[color_prom$o + (i)] ?? 0) : runtime.readIndex(color_prom, i))) >>> (7)) & 1)) | 0);
      let b: any = ((__add_palette(runtime, ((82) * (bit0)), ((173) * (bit1)))) | 0);
      (__L4 ?? runtime.memberCall(palette, "set_pen_color", 0, __L5))(i, (__L3 ? __L3(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
  }
  function __add_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __deref_palette(runtime: any, p: any): any {
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

  function method_machine_start__lambda0(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_mcu.adjust_icount"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_mcu, "adjust_icount", 0, undefined))(-1);
    }
  }

  function method_machine_start__lambda1(runtime: any, offset: any, data: any, mem_mask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["machine"], __L1: any = __l["machine().side_effects_disabled"], __L2: any = __l["m_mcu.adjust_icount"];

    if (((((__L1 ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      (__L2 ?? runtime.memberCall(members.m_mcu, "adjust_icount", 0, undefined))(-1);
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "videoram_w": method_videoram_w,
    "colorram_w": method_colorram_w,
    "dac_w": method_dac_w,
    "machine_start": method_machine_start,
    "get_bg_tile_info": method_get_bg_tile_info,
    "vblank_irq": method_vblank_irq,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites,
    "portb_r": method_portb_r,
    "portb_w": method_portb_w,
    "palette": method_palette,
    "machine_start__lambda0": method_machine_start__lambda0,
    "machine_start__lambda1": method_machine_start__lambda1
  };
  return __methodTable;
})();
    return {
      "seicross_state.videoram_w": methods["videoram_w"],
      "seicross_state.colorram_w": methods["colorram_w"],
      "seicross_state.dac_w": methods["dac_w"],
      "seicross_state.machine_start": methods["machine_start"],
      "seicross_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "seicross_state.vblank_irq": methods["vblank_irq"],
      "seicross_state.screen_update": methods["screen_update"],
      "seicross_state.draw_sprites": methods["draw_sprites"],
      "seicross_state.portb_r": methods["portb_r"],
      "seicross_state.portb_w": methods["portb_w"],
      "seicross_state.palette": methods["palette"],
      "seicross_state.machine_start__lambda0": methods["machine_start__lambda0"],
      "seicross_state.machine_start__lambda1": methods["machine_start__lambda1"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["NAME","bitmap.fill","device.execute","draw","entries","execute","fill","flip_screen","flip_screen_set","install_read_tap","install_write_tap","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrolly","m_dac.write","m_debug_port.read_safe","m_gfxdecode.gfx","m_mcu.adjust_icount","m_mcu.pulse_input_line","m_mcu.set_input_line","m_mcu.space","machine","machine().side_effects_disabled","mark_tile_dirty","memregion","palette.entries","palette.set_pen_color","read_safe","rgb_t","save_item","set","set_pen_color","set_scrolly","space.install_read_tap","space.install_write_tap","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
