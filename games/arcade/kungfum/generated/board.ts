// GENERATED executable machine composition from src/mame/irem/m62.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'kungfum');

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


  function method_m62_hscroll_low_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_m62_background_hscroll = (((((((members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll"))) & (65280))) | (data))) | 0);
  }

  function method_m62_hscroll_high_w(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    members.m_m62_background_hscroll = (((((((members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll"))) & (255))) | (((data) << (8))))) | 0);
  }

  function method_kungfum_tileram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) & (2047)));
  }

  function method_m62_tileram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_m62_tileram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __L1))(((offset) >>> (1)));
  }

  function method_m62_adpcm_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_adpcm2.target"], __L1: any = __l["m_adpcm1.target"], __L2: any = __l["adpcm.data_w"], __L3: any = __l["data_w"];
    let __t0: any, __t1: any;

    data = ((data) & 0xff);
    let adpcm: any = ((((offset) & (1))) ? ((__L0 ?? runtime.memberCall(members.m_adpcm2, "target", 0, undefined))()) : ((__L1 ?? runtime.memberCall(members.m_adpcm1, "target", 0, undefined))())); let adpcm$s: any = undefined, adpcm$o: any = 0; if (ArrayBuffer.isView(adpcm) || Array.isArray(adpcm)) adpcm$s = adpcm; else if (adpcm !== null && typeof adpcm === 'object' && adpcm.generatedPointer === true && adpcm.path === undefined && adpcm.target === undefined && (ArrayBuffer.isView(adpcm.source) || Array.isArray(adpcm.source))) { adpcm$s = adpcm.source; adpcm$o = adpcm.offset; }
    if (((adpcm) ? 1 : 0)) {
      (__L2 ?? runtime.memberCall(adpcm, "data_w", 0, __L3))(data);
    }
  }

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any, colormask: any, prioritymask: any, priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_spr_decode.gfx"];

    const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
    const h_m_sprite_height_prom = members.m_sprite_height_prom ?? runtime.member("m_sprite_height_prom");
    let offs: any = ((0) | 0);
    for (offs = ((0) | 0); ((Number(offs) < Number(runtime.container(members.m_spriteram, "bytes"))) ? 1 : 0); offs = ((((offs) + (8))) | 0)) {
      let i: any = ((0) | 0);
      let incr: any = ((0) | 0);
      let code: any = ((0) | 0);
      let col: any = ((0) | 0);
      let flipx: any = ((0) | 0);
      let flipy: any = ((0) | 0);
      let sx: any = ((0) | 0);
      let sy: any = ((0) | 0);
      if (((Number(((runtime.readIndex(h_m_spriteram, offs)) & (prioritymask))) === Number(priority)) ? 1 : 0)) {
        code = ((__add_draw_sprites(runtime, runtime.readIndex(h_m_spriteram, ((offs) + (4))), ((((runtime.readIndex(h_m_spriteram, ((offs) + (5)))) & (7))) << (8)))) | 0);
        col = ((((runtime.readIndex(h_m_spriteram, ((offs) + (0)))) & (colormask))) | 0);
        sx = ((__add_draw_sprites(runtime, ((256) * (((runtime.readIndex(h_m_spriteram, ((offs) + (7)))) & (1)))), runtime.readIndex(h_m_spriteram, ((offs) + (6))))) | 0);
        sy = ((((369) - (__add_draw_sprites(runtime, ((256) * (((runtime.readIndex(h_m_spriteram, ((offs) + (3)))) & (1)))), runtime.readIndex(h_m_spriteram, ((offs) + (2))))))) | 0);
        flipx = ((((runtime.readIndex(h_m_spriteram, ((offs) + (5)))) & (64))) | 0);
        flipy = ((((runtime.readIndex(h_m_spriteram, ((offs) + (5)))) & (128))) | 0);
        i = ((runtime.readIndex(h_m_sprite_height_prom, ((runtime.shiftRight(code, 5)) & (31)))) | 0);
        if ((((i) === (1)) ? 1 : 0)) {
          code = ((((code) & (-2))) | 0);
          sy = ((((sy) - (16))) | 0);
        } else {
          if ((((i) === (2)) ? 1 : 0)) {
            i = ((3) | 0);
            code = ((((code) & (-4))) | 0);
            sy = ((((sy) - (48))) | 0);
          }
        }
        if ((members.m_flipscreen ?? runtime.member("m_flipscreen"))) {
          sx = ((((496) - (sx))) | 0);
          sy = ((((((242) - (((i) * (16))))) - (sy))) | 0);
          flipx = ((((flipx) ? 0 : 1)) | 0);
          flipy = ((((flipy) ? 0 : 1)) | 0);
        }
        if (flipy) {
          incr = ((-1) | 0);
          code = ((((code) + (i))) | 0);
        } else {
          incr = ((1) | 0);
        }
        do {
          runtime.memberCall((__L0 ?? runtime.memberCall(members.m_spr_decode, "gfx", 0, undefined))(0), "transpen", 0, undefined)(bitmap, cliprect, ((code) + (((i) * (incr)))), col, flipx, flipy, sx, ((sy) + (((16) * (i)))), 0);
          i = ((((i) - (1))) | 0);
        } while ((((i) >= (0)) ? 1 : 0));
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

  function method_get_kungfum_bg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((0) | 0);
    let color: any = ((0) | 0);
    let flags: any = ((0) | 0);
    code = ((runtime.readIndex((members.m_m62_tileram ?? runtime.member("m_m62_tileram")), tile_index)) | 0);
    color = ((runtime.readIndex((members.m_m62_tileram ?? runtime.member("m_m62_tileram")), ((tile_index) + (2048)))) | 0);
    flags = ((0) | 0);
    if (((color) & (32))) {
      flags = ((((flags) | (1))) | 0);
    }
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, ((code) | (((((color) & (192))) << (2)))), ((color) & (31)), flags);
    if ((((((Number(runtime.divide(tile_index, 64)) < Number(6)) ? 1 : 0)) || (((Number(runtime.shiftRight(((color) & (31)), 1)) > Number(12)) ? 1 : 0))) ? 1 : 0)) {
      tileinfo.category = 1;
    } else {
      tileinfo.category = 0;
    }
  }

  function method_screen_update_kungfum(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_bg_tilemap.set_scrollx"], __L1: any = __l["set_scrollx"], __L2: any = __l["m_bg_tilemap.draw"], __L3: any = __l["draw"];

    let i: any = ((0) | 0);
    for (i = ((0) | 0); (((i) < (6)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(i, 0);
    }
    for (i = ((6) | 0); (((i) < (32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (__L0 ?? runtime.memberCall(members.m_bg_tilemap, "set_scrollx", 0, __L1))(i, (members.m_m62_background_hscroll ?? runtime.member("m_m62_background_hscroll")));
    }
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 0, 0);
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect, 31, 0, 0) : method_draw_sprites(runtime, bitmap, cliprect, 31, 0, 0));
    (__L2 ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __L3))(screen, bitmap, cliprect, 1, 0);
    return 0;
  }

  function method_m6803_port1_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_ay_45M.data_r"], __L1: any = __l["m_ay_45L.data_r"];
    let __t0: any, __t1: any;

    if ((((members.m_port2 ?? runtime.member("m_port2"))) & (8))) {
      return (__L0 ?? runtime.memberCall(members.m_ay_45M, "data_r", 0, undefined))();
    }
    if ((((members.m_port2 ?? runtime.member("m_port2"))) & (16))) {
      return (__L1 ?? runtime.memberCall(members.m_ay_45L, "data_r", 0, undefined))();
    }
    return 255;
  }

  function method_m6803_port2_r(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_soundlatch_r(runtime: any): any {
    const members = runtime.members;

    return (members.m_soundlatch ?? runtime.member("m_soundlatch"));
  }

  function method_m62_chr(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["palette.set_pen_colors"], __L1: any = __l["set_pen_colors"];

    const h_m_chr_color_proms = members.m_chr_color_proms ?? runtime.member("m_chr_color_proms");
    const h_m62_decode_info = members.m62_decode_info ?? runtime.member("m62_decode_info");
    const h_m62_tile_net_info = members.m62_tile_net_info ?? runtime.member("m62_tile_net_info");
    let rgb: any = [];
    (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, h_m_chr_color_proms, h_m62_decode_info, h_m62_tile_net_info) : method_compute_res_net_all(runtime, rgb, h_m_chr_color_proms, h_m62_decode_info, h_m62_tile_net_info));
    (__L0 ?? runtime.memberCall(palette, "set_pen_colors", 0, __L1))(0, rgb);
  }

  function method_compute_res_net_all(runtime: any, rgb: any, prom: any, rdi: any, di: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["rgb_t"];

    (rgb = runtime.resize(rgb, __add_compute_res_net_all(runtime, runtime.subtract(rdi.end, rdi.start), 1)));
    for (let i: any = ((rdi.start) | 0); ((Number(i) <= Number(rdi.end)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let t: any = [0, 0, 0];
      for (let j: any = ((0) | 0); ((Number(j) < Number(rdi.numcomp)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
        for (let k: any = ((0) | 0); (((k) < (3)) ? 1 : 0); k = ((((k) + (1))) | 0)) {
          let s: any = ((runtime.readIndex(rdi.shift, ((((3) * (j))) + (k)))) | 0);
          if ((((s) > (0)) ? 1 : 0)) {
            t[k] = (((t[k] ?? 0)) | (((runtime.shiftRight(runtime.readIndex(prom, ((i) + (runtime.readIndex(rdi.offset, ((((3) * (j))) + (k)))))), s)) & (runtime.readIndex(rdi.mask, ((((3) * (j))) + (k)))))));
          } else {
            t[k] = (((t[k] ?? 0)) | (((((runtime.readIndex(prom, ((i) + (runtime.readIndex(rdi.offset, ((((3) * (j))) + (k))))))) << (((0) - (s))))) & (runtime.readIndex(rdi.mask, ((((3) * (j))) + (k)))))));
          }
        }
      }
      let r: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[0] ?? 0), 0, di) : method_compute_res_net(runtime, (t[0] ?? 0), 0, di))) & 0xff);
      let g: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[1] ?? 0), 1, di) : method_compute_res_net(runtime, (t[1] ?? 0), 1, di))) & 0xff);
      let b: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"]((t[2] ?? 0), 2, di) : method_compute_res_net(runtime, (t[2] ?? 0), 2, di))) & 0xff);
      runtime.writeIndex(rgb, ((i) - (rdi.start)), (__L0 ? __L0(r, g, b) : runtime.macro("rgb_t", r, g, b)));
    }
  }
  function __add_compute_res_net_all(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_compute_res_net(runtime: any, inputs: any, channel: any, di: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["fatalerror"];

    let rTotal: any = 0;
    let v: any = 0;
    let vBias: any = runtime.readIndex(di.rgb, channel).vBias;
    let vOH: any = di.vOH;
    let vOL: any = di.vOL;
    let minout: any = runtime.readIndex(di.rgb, channel).minout;
    let cut: any = runtime.readIndex(di.rgb, channel).cut;
    let vcc: any = di.vcc;
    let ttlHRes: any = 0;
    let rGnd: any = runtime.readIndex(di.rgb, channel).rGnd;
    let OpenCol: any = ((di.OpenCol) & 0xff);
    switch ((((di.options) & (7)) as number)) {
      case 0:
      {
        break;
      }
      case 1:
      {
        minout = 0;
        cut = 0;
        break;
      }
      case 2:
      {
        minout = 0.9;
        cut = 0;
        break;
      }
      case 3:
      {
        minout = 0;
        cut = 0.7;
        break;
      }
      case 4:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown amplifier type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown amplifier type\n"));
      }
    }
    switch ((((di.options) & (8)) as number)) {
      case 0:
      {
        vcc = 5;
        break;
      }
      case 8:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
      }
    }
    switch ((((di.options) & (48)) as number)) {
      case 0:
      {
        break;
      }
      case 16:
      {
        vBias = 5;
        break;
      }
      case 32:
      {
        vBias = 4;
        break;
      }
      case 48:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
      }
    }
    switch ((((di.options) & (768)) as number)) {
      case 0:
      {
        OpenCol = ((1) & 0xff);
        vOL = 0.05;
        break;
      }
      case 256:
      {
        vOL = 0;
        vOH = vcc;
        OpenCol = ((0) & 0xff);
        break;
      }
      case 512:
      {
        vOL = 0.05;
        vOH = 4;
        ttlHRes = 50;
        OpenCol = ((0) & 0xff);
        break;
      }
      case 768:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vin type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vin type\n"));
      }
    }
    switch ((((runtime.readIndex(di.rgb, channel).options) & (7)) as number)) {
      case 0:
      {
        break;
      }
      case 1:
      {
        minout = 0;
        cut = 0;
        break;
      }
      case 2:
      {
        minout = 0.7;
        cut = 0;
        break;
      }
      case 3:
      {
        minout = 0;
        cut = 0.7;
        break;
      }
      case 4:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown amplifier type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown amplifier type\n"));
      }
    }
    switch ((((runtime.readIndex(di.rgb, channel).options) & (48)) as number)) {
      case 0:
      {
        break;
      }
      case 16:
      {
        vBias = 5;
        break;
      }
      case 32:
      {
        vBias = 4;
        break;
      }
      case 48:
      {
        break;
      }
      default:
      {
        (__L0 ? __L0("compute_res_net: Unknown vcc type\n") : runtime.macro("fatalerror", "compute_res_net: Unknown vcc type\n"));
      }
    }
    switch ((((di.options) & (12288)) as number)) {
      case 4096:
      case 8192:
      {
        break;
      }
      case 12288:
      {
        if ((((rGnd) !== (0)) ? 1 : 0)) {
          rGnd = ((((rGnd) * (5600))) / (((rGnd) + (5600))));
        } else {
          rGnd = 5600;
        }
        break;
      }
    }
    for (let i: any = ((0) | 0); ((Number(i) < Number(runtime.readIndex(di.rgb, channel).num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let level: any = ((((runtime.shiftRight(inputs, i)) & (1))) | 0);
      if ((((((Number(runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) !== Number(0)) ? 1 : 0)) && (((level) ? 0 : 1))) ? 1 : 0)) {
        if (OpenCol) {
          rTotal = ((rTotal) + (((1) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
          v = ((v) + (((vOL) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
        } else {
          rTotal = ((rTotal) + (((1) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
          v = ((v) + (((vOL) / (runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)))));
        }
      }
    }
    if (((Number(runtime.readIndex(di.rgb, channel).rBias) !== Number(0)) ? 1 : 0)) {
      rTotal = ((rTotal) + (((1) / (runtime.readIndex(di.rgb, channel).rBias))));
      v = ((v) + (((vBias) / (runtime.readIndex(di.rgb, channel).rBias))));
    }
    if ((((rGnd) !== (0)) ? 1 : 0)) {
      rTotal = ((rTotal) + (((1) / (rGnd))));
    }
    if (((Number(((di.options) & (768))) === Number(512)) ? 1 : 0)) {
      if (((Number(((v) / (rTotal))) > Number(vOH)) ? 1 : 0)) {
        OpenCol = ((1) & 0xff);
      }
    }
    for (let i: any = ((0) | 0); ((Number(i) < Number(runtime.readIndex(di.rgb, channel).num)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let level: any = ((((runtime.shiftRight(inputs, i)) & (1))) | 0);
      if ((((((Number(runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) !== Number(0)) ? 1 : 0)) && (level)) ? 1 : 0)) {
        if (OpenCol) {
          rTotal = ((rTotal) + (0));
          v = ((v) + (0));
        } else {
          rTotal = ((rTotal) + (((1) / (((runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) + (ttlHRes))))));
          v = ((v) + (((vOH) / (((runtime.readIndex(runtime.readIndex(di.rgb, channel).R, i)) + (ttlHRes))))));
        }
      }
    }
    rTotal = ((1) / (rTotal));
    v = ((v) * (rTotal));
    v = cppMax(+(minout), +(((v) - (cut))));
    switch ((((di.options) & (12288)) as number)) {
      case 4096:
      {
        v = ((vcc) - (v));
        break;
      }
      case 8192:
      {
        v = ((vcc) - (v));
        v = cppMax(+(0), +(((v) - (0.7))));
        v = cppMin(+(v), +(((vcc) - (((2) * (0.7))))));
        v = ((v) / (((vcc) - (1.4))));
        v = ((v) * (vcc));
        break;
      }
      case 12288:
      {
        break;
      }
    }
    return ((__add_compute_res_net(runtime, ((((v) * (255))) / (vcc)), 0.4)) | 0);
  }
  function __add_compute_res_net(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }

  function method_m62_spr(runtime: any, palette: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["palette.set_pen_colors"], __L1: any = __l["set_pen_colors"];

    const h_m_sprite_color_proms = members.m_sprite_color_proms ?? runtime.member("m_sprite_color_proms");
    const h_m62_decode_info = members.m62_decode_info ?? runtime.member("m62_decode_info");
    const h_m62_sprite_net_info = members.m62_sprite_net_info ?? runtime.member("m62_sprite_net_info");
    let rgb: any = [];
    (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, h_m_sprite_color_proms, h_m62_decode_info, h_m62_sprite_net_info) : method_compute_res_net_all(runtime, rgb, h_m_sprite_color_proms, h_m62_decode_info, h_m62_sprite_net_info));
    (__L0 ?? runtime.memberCall(palette, "set_pen_colors", 0, __L1))(0, rgb);
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "m62_hscroll_low_w": method_m62_hscroll_low_w,
    "m62_hscroll_high_w": method_m62_hscroll_high_w,
    "kungfum_tileram_w": method_kungfum_tileram_w,
    "m62_tileram_w": method_m62_tileram_w,
    "m62_adpcm_w": method_m62_adpcm_w,
    "draw_sprites": method_draw_sprites,
    "get_kungfum_bg_tile_info": method_get_kungfum_bg_tile_info,
    "screen_update_kungfum": method_screen_update_kungfum,
    "m6803_port1_r": method_m6803_port1_r,
    "m6803_port2_r": method_m6803_port2_r,
    "soundlatch_r": method_soundlatch_r,
    "m62_chr": method_m62_chr,
    "compute_res_net_all": method_compute_res_net_all,
    "compute_res_net": method_compute_res_net,
    "m62_spr": method_m62_spr
  };
  return __methodTable;
})();
    return {
      "m62_state.m62_hscroll_low_w": methods["m62_hscroll_low_w"],
      "m62_state.m62_hscroll_high_w": methods["m62_hscroll_high_w"],
      "m62_state.kungfum_tileram_w": methods["kungfum_tileram_w"],
      "m62_state.m62_tileram_w": methods["m62_tileram_w"],
      "m62_state.draw_sprites": methods["draw_sprites"],
      "m62_state.get_kungfum_bg_tile_info": methods["get_kungfum_bg_tile_info"],
      "m62_state.screen_update_kungfum": methods["screen_update_kungfum"],
      "m62_state.m62_chr": methods["m62_chr"],
      "m62_state.compute_res_net_all": methods["compute_res_net_all"],
      "m62_state.compute_res_net": methods["compute_res_net"],
      "m62_state.m62_spr": methods["m62_spr"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["adpcm.data_w","data_w","draw","fatalerror","m_adpcm1.target","m_adpcm2.target","m_ay_45L.data_r","m_ay_45M.data_r","m_bg_tilemap.draw","m_bg_tilemap.mark_tile_dirty","m_bg_tilemap.set_scrollx","m_spr_decode.gfx","mark_tile_dirty","palette.set_pen_colors","rgb_t","set","set_pen_colors","set_scrollx","tileinfo.set"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
