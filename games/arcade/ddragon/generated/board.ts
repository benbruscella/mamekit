// GENERATED executable machine composition from src/mame/technos/ddragon.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'ddragon');

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


  function method_fgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) >>> (1)));
  }

  function method_bgvideoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) >>> (1)));
  }

  function method_interrupt_r(runtime: any, offset: any): any {
    const members = runtime.members;

    (runtime.overrides["interrupt_ack"] ? runtime.overrides["interrupt_ack"](offset, 255) : method_interrupt_ack(runtime, offset, 255));
    return 255;
  }

  function method_interrupt_ack(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"], __L1: any = __l["m_soundlatch.write"], __L2: any = __l["m_subcpu.set_input_line"];

    data = ((data) & 0xff);
    const h_m_subcpu = members.m_subcpu ?? runtime.member("m_subcpu");
    const h_m_sprite_irq = members.m_sprite_irq ?? runtime.member("m_sprite_irq");
    switch ((offset as number)) {
      case 0:
      {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
        break;
      }
      case 1:
      {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 0);
        break;
      }
      case 2:
      {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 0);
        break;
      }
      case 3:
      {
        (__L1 ?? runtime.memberCall(members.m_soundlatch, "write", 0, undefined))(data);
        break;
      }
      case 4:
      {
        if (h_m_subcpu) {
          (__L2 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(h_m_sprite_irq, 1);
        }
        break;
      }
    }
  }

  function method_interrupt_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    (runtime.overrides["interrupt_ack"] ? runtime.overrides["interrupt_ack"](offset, data) : method_interrupt_ack(runtime, offset, data));
  }

  function method_bankswitch_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"], __L1: any = __l["m_subcpu.set_input_line"], __L2: any = __l["m_mainbank.set_entry"], __L3: any = __l["set_entry"];

    data = ((data) & 0xff);
    members.m_scrollx_hi = ((((data) & (1))) & 0xff);
    members.m_scrolly_hi = ((runtime.shiftRight(((data) & (2)), 1)) & 0xff);
    (__L0 ? __L0((((~data)) & (4))) : runtime.macro("flip_screen_set", (((~data)) & (4))));
    (__L1 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(-2, ((((data) & (8))) ? (0) : (1)));
    (__L1 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(-3, ((((data) & (16))) ? (1) : (0)));
    (__L2 ?? runtime.memberCall(members.m_mainbank, "set_entry", 0, __L3))(runtime.shiftRight(((data) & (224)), 5));
  }

  function method_sub_port6_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_subcpu.set_input_line"], __L1: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    const h_m_sprite_irq = members.m_sprite_irq ?? runtime.member("m_sprite_irq");
    if (((Number(((data) & (1))) === Number(0)) ? 1 : 0)) {
      (__L0 ?? runtime.memberCall(members.m_subcpu, "set_input_line", 0, undefined))(h_m_sprite_irq, 0);
    }
    if (((((((((members.m_ddragon_sub_port ?? runtime.member("m_ddragon_sub_port"))) & (2))) ? 0 : 1)) && (((data) & (2)))) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, 1);
    }
    members.m_ddragon_sub_port = ((data) & 0xff);
  }

  function method_ddragon_adpcm_status_r(runtime: any): any {
    const members = runtime.members;

    return ((((runtime.readIndex((members.m_adpcm_idle ?? runtime.member("m_adpcm_idle")), 0)) ? (1) : (0))) | (((runtime.readIndex((members.m_adpcm_idle ?? runtime.member("m_adpcm_idle")), 1)) ? (2) : (0))));
  }

  function method_get_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["TILE_FLIPYX"], __L1: any = __l["tileinfo.set"], __L2: any = __l["set"];

    tile_index = ((tile_index) << (1));
    let attr: any = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index)) & 0xff);
    (__L1 ?? runtime.memberCall(tileinfo, "set", 0, __L2))(2, ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((((attr) >>> (3))) & (7)), (__L0 ? __L0(runtime.shiftRight(((attr) & (192)), 6)) : runtime.macro("TILE_FLIPYX", runtime.shiftRight(((attr) & (192)), 6))));
  }

  function method_background_scan(runtime: any, col: any, row: any, num_cols: any, num_rows: any): any {
    const members = runtime.members;

    return ((((((((col) & (15))) | (((((row) & (15))) << (4))))) | (((((col) & (16))) << (4))))) | (((((row) & (16))) << (5))));
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    tile_index = ((tile_index) << (1));
    let attr: any = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index)) & 0xff);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((attr) >>> (5)), 0);
  }

  function method_scanline(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_screen.height"], __L1: any = __l["m_screen.update_partial"], __L2: any = __l["m_maincpu.set_input_line"];
    let __t0: any;

    let scanline: any = ((param) | 0);
    let screen_height: any = (((__L0 ?? runtime.memberCall(members.m_screen, "height", 0, undefined))()) | 0);
    let vcount_old: any = (((runtime.overrides["scanline_to_vcount"] ? runtime.overrides["scanline_to_vcount"]((((((scanline) === (0)) ? 1 : 0)) ? (((screen_height) - (1))) : (((scanline) - (1))))) : method_scanline_to_vcount(runtime, (((((scanline) === (0)) ? 1 : 0)) ? (((screen_height) - (1))) : (((scanline) - (1))))))) | 0);
    let vcount: any = (((runtime.overrides["scanline_to_vcount"] ? runtime.overrides["scanline_to_vcount"](scanline) : method_scanline_to_vcount(runtime, scanline))) | 0);
    if ((((scanline) > (0)) ? 1 : 0)) {
      (__L1 ?? runtime.memberCall(members.m_screen, "update_partial", 0, undefined))(((scanline) - (1)));
    }
    if ((((vcount) === (248)) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
    }
    if ((((((((vcount_old) & (8))) ? 0 : 1)) && (((vcount) & (8)))) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(1, 1);
    }
  }

  function method_scanline_to_vcount(runtime: any, scanline: any): any {
    const members = runtime.members;

    let vcount: any = ((((scanline) + (8))) | 0);
    if ((((vcount) < (256)) ? 1 : 0)) {
      return vcount;
    } else {
      return ((((vcount) - (24))) | (256));
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_bg_tilemap.set_scrolly"], __L3: any = __l["set_scrolly"], __L4: any = __l["m_bg_tilemap.draw"], __L5: any = __l["draw"], __L6: any = __l["m_fg_tilemap.draw"];

    const h_m_scrollx_lo = members.m_scrollx_lo ?? runtime.member("m_scrollx_lo");
    const h_m_scrolly_lo = members.m_scrolly_lo ?? runtime.member("m_scrolly_lo");
    let scrollx: any = (((((((members.m_scrollx_hi ?? runtime.member("m_scrollx_hi"))) << (8))) | (__deref_screen_update(runtime, h_m_scrollx_lo)))) | 0);
    let scrolly: any = (((((((members.m_scrolly_hi ?? runtime.member("m_scrolly_hi"))) << (8))) | (__deref_screen_update(runtime, h_m_scrolly_lo)))) | 0);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(0, scrollx);
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __L3))(0, scrolly);
    (__L4 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
    (__L6 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L5))(screen, bitmap, cliprect, 0, 0);
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_gfxdecode.gfx"], __L1: any = __l["flip_screen"], __L2: any = __l["gfx.transpen"], __L3: any = __l["transpen"];

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_technos_video_hw = members.m_technos_video_hw ?? runtime.member("m_technos_video_hw");
    let gfx: any = (__L0 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1); let gfx$s: any = undefined, gfx$o: any = 0; if (ArrayBuffer.isView(gfx) || Array.isArray(gfx)) gfx$s = gfx; else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) { gfx$s = gfx.source; gfx$o = gfx.offset; }
    let src: any = h_m_spriteram; let src$s: any = undefined, src$o: any = 0; if (ArrayBuffer.isView(src) || Array.isArray(src)) src$s = src; else if (src !== null && typeof src === 'object' && src.generatedPointer === true && src.path === undefined && src.target === undefined && (ArrayBuffer.isView(src.source) || Array.isArray(src.source))) { src$s = src.source; src$o = src.offset; }
    let bytes: any = ((runtime.container(members.m_spriteram, "bytes")) >>> 0);
    for (let i: any = ((0) >>> 0); (((i) < (bytes)) ? 1 : 0); i = ((((i) + (5))) >>> 0)) {
      let attr: any = (((src$s !== undefined ? (src$s[src$o + (((i) + (1)))] ?? 0) : runtime.readIndex(src, ((i) + (1))))) | 0);
      if (((attr) & (128))) {
        let sx: any = ((__add_draw_sprites(runtime, ((240) - ((src$s !== undefined ? (src$s[src$o + (((i) + (4)))] ?? 0) : runtime.readIndex(src, ((i) + (4)))))), ((((attr) & (2))) << (7)))) | 0);
        let sy: any = ((__add_draw_sprites(runtime, ((232) - ((src$s !== undefined ? (src$s[src$o + (((i) + (0)))] ?? 0) : runtime.readIndex(src, ((i) + (0)))))), ((((attr) & (1))) << (8)))) | 0);
        let size: any = ((runtime.shiftRight(((attr) & (48)), 4)) | 0);
        let flipx: any = ((((attr) & (8))) | 0);
        let flipy: any = ((((attr) & (4))) | 0);
        let dx: any = ((-16) | 0);
        let dy: any = ((-16) | 0);
        let which: any = ((0) | 0);
        let color: any = ((0) | 0);
        if (((Number(h_m_technos_video_hw) === Number(2)) ? 1 : 0)) {
          color = ((runtime.shiftRight((src$s !== undefined ? (src$s[src$o + (((i) + (2)))] ?? 0) : runtime.readIndex(src, ((i) + (2)))), 5)) | 0);
          which = (((((src$s !== undefined ? (src$s[src$o + (((i) + (3)))] ?? 0) : runtime.readIndex(src, ((i) + (3))))) | ((((((src$s !== undefined ? (src$s[src$o + (((i) + (2)))] ?? 0) : runtime.readIndex(src, ((i) + (2))))) & (31))) << (8))))) | 0);
        } else {
          if (((Number(h_m_technos_video_hw) === Number(1)) ? 1 : 0)) {
            if ((((((Number(sx) < Number(-7)) ? 1 : 0)) && (((Number(sx) > Number(-16)) ? 1 : 0))) ? 1 : 0)) {
              sx = ((((sx) + (256))) | 0);
            }
            if ((((((Number(sy) < Number(-7)) ? 1 : 0)) && (((Number(sy) > Number(-16)) ? 1 : 0))) ? 1 : 0)) {
              sy = ((((sy) + (256))) | 0);
            }
          }
          color = ((runtime.shiftRight((src$s !== undefined ? (src$s[src$o + (((i) + (2)))] ?? 0) : runtime.readIndex(src, ((i) + (2)))), 4)) | 0);
          which = (((((src$s !== undefined ? (src$s[src$o + (((i) + (3)))] ?? 0) : runtime.readIndex(src, ((i) + (3))))) | ((((((src$s !== undefined ? (src$s[src$o + (((i) + (2)))] ?? 0) : runtime.readIndex(src, ((i) + (2))))) & (15))) << (8))))) | 0);
        }
        if ((__L1 ? __L1() : runtime.macro("flip_screen"))) {
          sx = ((((240) - (sx))) | 0);
          sy = ((((224) - (sy))) | 0);
          flipx = ((((flipx) ? 0 : 1)) | 0);
          flipy = ((((flipy) ? 0 : 1)) | 0);
          dx = (((-dx)) | 0);
          dy = (((-dy)) | 0);
        }
        which = ((((which) & ((~size)))) | 0);
        switch ((size as number)) {
          case 0:
          {
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (0)), color, flipx, flipy, sx, sy, 0);
            break;
          }
          case 1:
          {
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (0)), color, flipx, flipy, sx, ((sy) + (dy)), 0);
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (1)), color, flipx, flipy, sx, sy, 0);
            break;
          }
          case 2:
          {
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (0)), color, flipx, flipy, ((sx) + (dx)), sy, 0);
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (2)), color, flipx, flipy, sx, sy, 0);
            break;
          }
          case 3:
          {
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (0)), color, flipx, flipy, ((sx) + (dx)), ((sy) + (dy)), 0);
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (1)), color, flipx, flipy, ((sx) + (dx)), sy, 0);
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (2)), color, flipx, flipy, sx, ((sy) + (dy)), 0);
            (__L2 ?? runtime.memberCall(gfx, "transpen", 0, __L3))(bitmap, cliprect, ((which) + (3)), color, flipx, flipy, sx, sy, 0);
            break;
          }
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
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "fgvideoram_w": method_fgvideoram_w,
    "bgvideoram_w": method_bgvideoram_w,
    "interrupt_r": method_interrupt_r,
    "interrupt_ack": method_interrupt_ack,
    "interrupt_w": method_interrupt_w,
    "bankswitch_w": method_bankswitch_w,
    "sub_port6_w": method_sub_port6_w,
    "ddragon_adpcm_status_r": method_ddragon_adpcm_status_r,
    "get_bg_tile_info": method_get_bg_tile_info,
    "background_scan": method_background_scan,
    "get_fg_tile_info": method_get_fg_tile_info,
    "scanline": method_scanline,
    "scanline_to_vcount": method_scanline_to_vcount,
    "screen_update": method_screen_update,
    "draw_sprites": method_draw_sprites
  };
  return __methodTable;
})();
    return {
      "ddragon_state.fgvideoram_w": methods["fgvideoram_w"],
      "ddragon_state.bgvideoram_w": methods["bgvideoram_w"],
      "ddragon_state.interrupt_r": methods["interrupt_r"],
      "ddragon_state.interrupt_ack": methods["interrupt_ack"],
      "ddragon_state.interrupt_w": methods["interrupt_w"],
      "ddragon_state.bankswitch_w": methods["bankswitch_w"],
      "ddragon_state.sub_port6_w": methods["sub_port6_w"],
      "ddragon_state.ddragon_adpcm_status_r": methods["ddragon_adpcm_status_r"],
      "ddragon_state.get_bg_tile_info": methods["get_bg_tile_info"],
      "ddragon_state.background_scan": methods["background_scan"],
      "ddragon_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "ddragon_state.scanline": methods["scanline"],
      "ddragon_state.scanline_to_vcount": methods["scanline_to_vcount"],
      "ddragon_state.screen_update": methods["screen_update"],
      "ddragon_state.draw_sprites": methods["draw_sprites"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX","draw","flip_screen","flip_screen_set","gfx.transpen","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_bg_tilemap.set_scrolly","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_mainbank.set_entry","m_maincpu.set_input_line","m_screen.height","m_screen.update_partial","m_soundlatch.write","m_subcpu.set_input_line","mark_tile_dirty","set","set_entry","set_scrollx","set_scrolly","tileinfo.set","transpen"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
