// GENERATED executable machine composition from src/mame/nintendo/popeye.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'popeye');

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


  function method_popeye_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_popeye_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_background_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (12)) & 1)) ? (4) : (0))) | 0);
    offset = (((offset) >>> (0)) & ((1 << (12)) - 1));
    runtime.writeIndex(runtime.writableMember("m_background_ram"), offset, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), offset)) & ((~((15) << (shift)))))) | (((((data) & (15))) << (shift)))));
  }

  function method_protection_r(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((((offset) === (0)) ? 1 : 0)) {
      return (((((((members.m_prot1 ?? runtime.member("m_prot1"))) << ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))) | (runtime.shiftRight((members.m_prot0 ?? runtime.member("m_prot0")), ((8) - ((members.m_prot_shift ?? runtime.member("m_prot_shift")))))))) & (255));
    } else {
      return 0;
    }
  }

  function method_protection_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if ((((offset) === (0)) ? 1 : 0)) {
      members.m_prot_shift = ((((data) & (7))) & 0xff);
    } else {
      members.m_prot0 = (((members.m_prot1 ?? runtime.member("m_prot1"))) & 0xff);
      members.m_prot1 = ((data) & 0xff);
    }
  }

  function method_get_fg_tile_info(runtime: any, tilemap: any, tileinfo: any, tile_index: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tileinfo.set"], __L1: any = __l["set"];

    let code: any = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | 0);
    let color: any = ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15))) | 0);
    (__L0 ?? runtime.memberCall(tileinfo, "set", 0, __L1))(0, code, color, 0);
  }

  function method_refresh_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tnx1_state::refresh_w__base"];

    data = ((data) & 0xff);
    (__L0 ? __L0(offset, data) : runtime.macro("tnx1_state::refresh_w__base", offset, data));
    members.m_watchdog_enabled = ((((Number(((((offset) >>> (9))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_io_mconf.read"], __L1: any = __l["read"], __L2: any = __l["m_fg_tilemap.draw"], __L3: any = __l["draw"], __L4: any = __l["bm.pix"], __L5: any = __l["pix"], __L6: any = __l["bm_last.pix"];
    let __t0: any;

    const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
    let ilmode: any = (__L0 ?? runtime.memberCall(members.m_io_mconf, "read", 0, __L1))();
    let bm: any = ((((Number(ilmode) === Number(0)) ? 1 : 0)) ? (bitmap) : (runtime.readIndex(h_m_bitmap, (members.m_field ?? runtime.member("m_field")))));
    (runtime.overrides["update_palette"] ? runtime.overrides["update_palette"]() : method_update_palette(runtime));
    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bm, cliprect) : method_draw_background(runtime, bm, cliprect));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bm, cliprect) : method_draw_sprites(runtime, bm, cliprect));
    (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L3))(screen, bm, cliprect, 0, 0);
    if (((Number(ilmode) === Number(1)) ? 1 : 0)) {
      for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        if (((Number(((y) & (1))) === Number((members.m_field ?? runtime.member("m_field")))) ? 1 : 0)) {
          for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            bitmap["pix="](y, x, 0);
          }
        } else {
          for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            bitmap["pix="](y, x, (__L4 ?? runtime.memberCall(bm, "pix", 0, __L5))(y, x));
          }
        }
      }
    } else {
      if (((Number(ilmode) === Number(2)) ? 1 : 0)) {
        for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
          let bm_last: any = runtime.readIndex(h_m_bitmap, (((members.m_field ?? runtime.member("m_field"))) ^ (1)));
          if (((Number(((y) & (1))) === Number((members.m_field ?? runtime.member("m_field")))) ? 1 : 0)) {
            for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
              bitmap["pix="](y, x, (__L6 ?? runtime.memberCall(bm_last, "pix", 0, __L5))(y, x));
            }
          } else {
            for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
              bitmap["pix="](y, x, (__L4 ?? runtime.memberCall(bm, "pix", 0, __L5))(y, x));
            }
          }
        }
      }
    }
    return 0;
  }

  function method_update_palette(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_colors"], __L1: any = __l["m_palette.set_pen_color"], __L2: any = __l["rgb_t"];

    const h_m_color_prom = members.m_color_prom ?? runtime.member("m_color_prom");
    const h_mb7051_decode_info = members.mb7051_decode_info ?? runtime.member("mb7051_decode_info");
    const h_txt_mb7051_net_info = members.txt_mb7051_net_info ?? runtime.member("txt_mb7051_net_info");
    const h_mb7052_decode_info = members.mb7052_decode_info ?? runtime.member("mb7052_decode_info");
    const h_obj_mb7052_net_info = members.obj_mb7052_net_info ?? runtime.member("obj_mb7052_net_info");
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (8))) {
      let color_prom: any = __addr_update_palette(runtime, h_m_color_prom, ((16) * (runtime.shiftRight((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (8)), 3))));
      let rgb: any = [];
      (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mb7051_decode_info, (runtime.overrides["bak_mb7051_net_info"] ? runtime.overrides["bak_mb7051_net_info"]() : method_bak_mb7051_net_info(runtime))) : method_compute_res_net_all(runtime, rgb, color_prom, h_mb7051_decode_info, (runtime.overrides["bak_mb7051_net_info"] ? runtime.overrides["bak_mb7051_net_info"]() : method_bak_mb7051_net_info(runtime))));
      (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(0, rgb);
    }
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (8))) {
      let color_prom: any = __addr_update_palette(runtime, __addr_update_palette(runtime, h_m_color_prom, 32), ((16) * (runtime.shiftRight((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (8)), 3))));
      for (let i: any = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let r: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 0)) & (7)), 0, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 0)) & (7)), 0, h_txt_mb7051_net_info))) | 0);
        let g: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 3)) & (7)), 1, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 3)) & (7)), 1, h_txt_mb7051_net_info))) | 0);
        let b: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 6)) & (3)), 2, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 6)) & (3)), 2, h_txt_mb7051_net_info))) | 0);
        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_update_palette(runtime, __add_update_palette(runtime, 16, ((2) * (i))), 0), 4278190080);
        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_update_palette(runtime, __add_update_palette(runtime, 16, ((2) * (i))), 1), (__L2 ? __L2(r, g, b) : runtime.macro("rgb_t", r, g, b)));
      }
    }
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (7))) {
      let color_prom: any = __addr_update_palette(runtime, (members.m_color_prom_spr ?? runtime.member("m_color_prom_spr")), ((32) * ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (7)))));
      let rgb: any = [];
      (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mb7052_decode_info, h_obj_mb7052_net_info) : method_compute_res_net_all(runtime, rgb, color_prom, h_mb7052_decode_info, h_obj_mb7052_net_info));
      (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(48, rgb);
    }
    members.m_palette_bank_cache = (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & 0xff);
  }
  function __add_update_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_update_palette(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
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

  function method_bak_mb7051_net_info(runtime: any): any {
    const members = runtime.members;

    const h_tnx1_bak_mb7051_net_info = members.tnx1_bak_mb7051_net_info ?? runtime.member("tnx1_bak_mb7051_net_info");
    return h_tnx1_bak_mb7051_net_info;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"];

    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let rovi: any = ((__add_draw_background(runtime, (((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (((runtime.divide(y, 2)) ^ (255))) : (runtime.divide(y, 2))), runtime.readIndex(h_m_background_scroll, 1))) & 0xffff);
      for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let roh: any = ((__add_draw_background(runtime, __add_draw_background(runtime, 56, runtime.divide(x, 2)), runtime.readIndex(h_m_background_scroll, 0))) & 0xff);
        let shift: any = (((((((rovi) >>> (7)) & 1)) ? (4) : (0))) | 0);
        bitmap["pix="](y, x, ((runtime.shiftRight(runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), (((((rovi) >>> (8)) & 1)) ? ((((((((rovi) >>> (1)) & ((1 << (6)) - 1))) << (6))) | ((((roh) >>> (2)) & ((1 << (6)) - 1))))) : (0))), shift)) & (15)));
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["STRUCT_ARRAY"], __L3: any = __l["flip_screen"], __L4: any = __l["m_gfxdecode.gfx"], __L5: any = __l["gfx.colorbase"], __L6: any = __l["colorbase"], __L7: any = __l["gfx.granularity"], __L8: any = __l["granularity"], __L9: any = __l["gfx.colors"], __L10: any = __l["colors"], __L11: any = __l["gfx.elements"], __L12: any = __l["elements"], __L13: any = __l["gfx.get_data"], __L14: any = __l["get_data"], __L15: any = __l["gfx.rowbytes"], __L16: any = __l["rowbytes"], __L17: any = __l["copybitmap_trans"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    const h_m_palette = members.m_palette ?? runtime.member("m_palette");
    (__L0 ?? runtime.memberCall(members.m_sprite_bitmap, "fill", 0, __L1))(0, cliprect);
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let attributes: any = (__L2 ? __L2(64, "row", 0, "sx", 0, "color", 0, "code", 0, "flipx", 0, "flipy", 0) : runtime.macro("STRUCT_ARRAY", 64, "row", 0, "sx", 0, "color", 0, "code", 0, "flipx", 0, "flipy", 0));
      for (let offs: any = ((4) | 0); ((Number(offs) < Number(runtime.container(members.m_dmasource, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
        let sy: any = ((((512) - (((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (1)))) * (2))))) | 0);
        let row: any = ((((y) - (sy))) | 0);
        if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
          sy = ((((sy) ^ (511))) | 0);
          row = ((((sy) - (y))) | 0);
        }
        if (((((((row) >= (0)) ? 1 : 0)) && ((((row) < (16)) ? 1 : 0))) ? 1 : 0)) {
          let a: any = __addr_draw_sprites(runtime, attributes, runtime.shiftRight(runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), offs), 2));
          __deref_draw_sprites(runtime, a).sx = ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), offs)) * (2));
          __deref_draw_sprites(runtime, a).row = row;
          __deref_draw_sprites(runtime, a).code = ((__add_draw_sprites(runtime, __add_draw_sprites(runtime, ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (2)))) & (127)), ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (16))) << (3))), ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (4))) << (6)))) ^ (511));
          __deref_draw_sprites(runtime, a).color = ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (7));
          __deref_draw_sprites(runtime, a).flipx = ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (2)))) & (128))) ? (15) : (0));
          __deref_draw_sprites(runtime, a).flipy = ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (8))) ? (15) : (0));
        }
      }
      let flipx: any = ((0) | 0);
      for (let i: any = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let a: any = __addr_draw_sprites(runtime, attributes, i);
        if (((Number(__deref_draw_sprites(runtime, a).color) !== Number(0)) ? 1 : 0)) {
          let gfx: any = (__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1); let gfx$s: any = undefined, gfx$o: any = 0; if (ArrayBuffer.isView(gfx) || Array.isArray(gfx)) gfx$s = gfx; else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) { gfx$s = gfx.source; gfx$o = gfx.offset; }
          let pal: any = h_m_palette["pen&"](__add_draw_sprites(runtime, (__L5 ?? runtime.memberCall(gfx, "colorbase", 0, __L6))(), (((__L7 ?? runtime.memberCall(gfx, "granularity", 0, __L8))()) * (((__deref_draw_sprites(runtime, a).color) % ((__L9 ?? runtime.memberCall(gfx, "colors", 0, __L10))())))))); let pal$s: any = undefined, pal$o: any = 0; if (ArrayBuffer.isView(pal) || Array.isArray(pal)) pal$s = pal; else if (pal !== null && typeof pal === 'object' && pal.generatedPointer === true && pal.path === undefined && pal.target === undefined && (ArrayBuffer.isView(pal.source) || Array.isArray(pal.source))) { pal$s = pal.source; pal$o = pal.offset; }
          let source_base: any = (__L13 ?? runtime.memberCall(gfx, "get_data", 0, __L14))(((__deref_draw_sprites(runtime, a).code) % ((__L11 ?? runtime.memberCall(gfx, "elements", 0, __L12))()))); let source_base$s: any = undefined, source_base$o: any = 0; if (ArrayBuffer.isView(source_base) || Array.isArray(source_base)) source_base$s = source_base; else if (source_base !== null && typeof source_base === 'object' && source_base.generatedPointer === true && source_base.path === undefined && source_base.target === undefined && (ArrayBuffer.isView(source_base.source) || Array.isArray(source_base.source))) { source_base$s = source_base.source; source_base$o = source_base.offset; }
          let source: any = __addr_draw_sprites(runtime, source_base, ((((__deref_draw_sprites(runtime, a).row) ^ (__deref_draw_sprites(runtime, a).flipy))) * ((__L15 ?? runtime.memberCall(gfx, "rowbytes", 0, __L16))()))); let source$s: any = undefined, source$o: any = 0; if (ArrayBuffer.isView(source) || Array.isArray(source)) source$s = source; else if (source !== null && typeof source === 'object' && source.generatedPointer === true && source.path === undefined && source.target === undefined && (ArrayBuffer.isView(source.source) || Array.isArray(source.source))) { source$s = source.source; source$o = source.offset; }
          if (((((runtime.overrides["bootleg_sprites"] ? runtime.overrides["bootleg_sprites"]() : method_bootleg_sprites(runtime))) && (((Number(flipx) !== Number(__deref_draw_sprites(runtime, a).flipx)) ? 1 : 0))) ? 1 : 0)) {
            let px: any = ((runtime.subtract(__deref_draw_sprites(runtime, a).sx, 7)) | 0);
            if (((((((px) >= (0)) ? 1 : 0)) && ((((px) < (512)) ? 1 : 0))) ? 1 : 0)) {
              if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                px = ((((px) ^ (511))) | 0);
              }
              (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))["pix="](y, px, 0);
            }
            flipx = ((__deref_draw_sprites(runtime, a).flipx) | 0);
          }
          for (let x: any = ((0) | 0); (((x) < (16)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            let px: any = ((((((__deref_draw_sprites(runtime, a).sx) + (x))) - (6))) | 0);
            if (((((((px) >= (0)) ? 1 : 0)) && ((((px) < (512)) ? 1 : 0))) ? 1 : 0)) {
              if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                px = ((((px) ^ (511))) | 0);
              }
              let p: any = (((source$s !== undefined ? (source$s[source$o + (((x) ^ (__deref_draw_sprites(runtime, a).flipx)))] ?? 0) : runtime.readIndex(source, ((x) ^ (__deref_draw_sprites(runtime, a).flipx))))) & 0xffff);
              if (p) {
                p = (((pal$s !== undefined ? (pal$s[pal$o + (p)] ?? 0) : runtime.readIndex(pal, p))) & 0xffff);
              }
              (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))["pix="](y, px, p);
            }
          }
        }
      }
    }
    (__L17 ? __L17(bitmap, __deref_draw_sprites(runtime, (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))), 0, 0, 0, 0, cliprect, 0) : runtime.macro("copybitmap_trans", bitmap, __deref_draw_sprites(runtime, (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))), 0, 0, 0, 0, cliprect, 0));
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_draw_sprites(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
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

  function method_bootleg_sprites(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_screen_vblank(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tnx1_state::screen_vblank__base"], __L1: any = __l["m_maincpu.set_input_line"], __L2: any = __l["m_aysnd.reset"];
    let __t0: any;

    (__L0 ? __L0(state) : runtime.macro("tnx1_state::screen_vblank__base", state));
    if (state) {
      let watchdog_counter: any = (((members.m_watchdog_counter ?? runtime.member("m_watchdog_counter"))) & 0xff);
      if (((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) || ((((members.m_watchdog_enabled ?? runtime.member("m_watchdog_enabled"))) ? 0 : 1))) ? 1 : 0)) {
        watchdog_counter = ((0) & 0xff);
      } else {
        watchdog_counter = ((((((watchdog_counter) + (1))) & (15))) & 0xff);
      }
      if (((((watchdog_counter) ^ ((members.m_watchdog_counter ?? runtime.member("m_watchdog_counter"))))) & (4))) {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-2, ((((watchdog_counter) & (4))) ? (1) : (0)));
        (__L2 ?? runtime.memberCall(members.m_aysnd, "reset", 0, undefined))();
      }
      members.m_watchdog_counter = ((watchdog_counter) & 0xff);
    }
  }

  function method_popeye_portB_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen_set"];

    data = ((data) & 0xff);
    (__L0 ? __L0(((data) & (1))) : runtime.macro("flip_screen_set", ((data) & (1))));
    members.m_dswbit = ((runtime.shiftRight(((data) & (14)), 1)) & 0xff);
  }

  function method_pop_field_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_field ?? runtime.member("m_field"))) ^ (1));
  }

  function method_tnx1_palette(runtime: any, palette: any): any {
    const members = runtime.members;

    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let color: any = ((((((i) & (63))) | (((((i) & (32))) << (1))))) | 0);
      runtime.writeIndex(runtime.writableMember("m_color_prom_spr"), i, runtime.readIndex((members.m_color_prom_spr ?? runtime.member("m_color_prom_spr")), color));
    }
    members.m_palette_bank_cache = ((-1) & 0xff);
    (runtime.overrides["update_palette"] ? runtime.overrides["update_palette"]() : method_update_palette(runtime));
  }

  function method_refresh_w__base(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    let nmi_enabled: any = ((((Number(((((offset) >>> (8))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
    if (((Number((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) !== Number(nmi_enabled)) ? 1 : 0)) {
      members.m_nmi_enabled = ((nmi_enabled) ? 1 : 0);
      if ((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) ? 0 : 1)) {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
      }
    }
  }

  function method_screen_vblank__base(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dmasource.target"], __L1: any = __l["target"], __L2: any = __l["m_sprite_ram.begin"], __L3: any = __l["begin"], __L4: any = __l["std::copy_n"], __L5: any = __l["m_maincpu.set_input_line"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    const h_m_dmasource = members.m_dmasource ?? runtime.member("m_dmasource");
    if (state) {
      (__L4 ? __L4((__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), runtime.container(members.m_dmasource, "bytes"), (__L2 ?? runtime.memberCall(members.m_sprite_ram, "begin", 0, __L3))()) : runtime.macro("std::copy_n", (__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), runtime.container(members.m_dmasource, "bytes"), (__L2 ?? runtime.memberCall(members.m_sprite_ram, "begin", 0, __L3))()));
      (__L4 ? __L4((__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), 3, h_m_background_scroll) : runtime.macro("std::copy_n", (__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), 3, h_m_background_scroll));
      members.m_palette_bank = ((runtime.readIndex(h_m_dmasource, 3)) & 0xff);
      members.m_field = ((((members.m_field) ^ (1))) | 0);
      if ((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) {
        (__L5 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "popeye_videoram_w": method_popeye_videoram_w,
    "popeye_colorram_w": method_popeye_colorram_w,
    "background_w": method_background_w,
    "protection_r": method_protection_r,
    "protection_w": method_protection_w,
    "get_fg_tile_info": method_get_fg_tile_info,
    "refresh_w": method_refresh_w,
    "screen_update": method_screen_update,
    "update_palette": method_update_palette,
    "compute_res_net_all": method_compute_res_net_all,
    "compute_res_net": method_compute_res_net,
    "bak_mb7051_net_info": method_bak_mb7051_net_info,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "bootleg_sprites": method_bootleg_sprites,
    "screen_vblank": method_screen_vblank,
    "popeye_portB_w": method_popeye_portB_w,
    "pop_field_r": method_pop_field_r,
    "tnx1_palette": method_tnx1_palette,
    "refresh_w__base": method_refresh_w__base,
    "screen_vblank__base": method_screen_vblank__base
  };
  return __methodTable;
})();
    return {
      "tnx1_state.popeye_videoram_w": methods["popeye_videoram_w"],
      "tnx1_state.popeye_colorram_w": methods["popeye_colorram_w"],
      "tnx1_state.background_w": methods["background_w"],
      "tnx1_state.protection_r": methods["protection_r"],
      "tnx1_state.protection_w": methods["protection_w"],
      "tnx1_state.get_fg_tile_info": methods["get_fg_tile_info"],
      "tnx1_state.refresh_w": methods["refresh_w"],
      "tnx1_state.screen_update": methods["screen_update"],
      "tnx1_state.update_palette": methods["update_palette"],
      "tnx1_state.bak_mb7051_net_info": methods["bak_mb7051_net_info"],
      "tnx1_state.draw_background": methods["draw_background"],
      "tnx1_state.draw_sprites": methods["draw_sprites"],
      "tnx1_state.bootleg_sprites": methods["bootleg_sprites"],
      "tnx1_state.screen_vblank": methods["screen_vblank"],
      "tnx1_state.popeye_portB_w": methods["popeye_portB_w"],
      "tnx1_state.tnx1_palette": methods["tnx1_palette"],
      "tnx1_state.refresh_w__base": methods["refresh_w__base"],
      "tnx1_state.screen_vblank__base": methods["screen_vblank__base"],
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


  function method_popeye_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_popeye_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_background_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (12)) & 1)) ? (4) : (0))) | 0);
    offset = (((offset) >>> (0)) & ((1 << (12)) - 1));
    runtime.writeIndex(runtime.writableMember("m_background_ram"), offset, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), offset)) & ((~((15) << (shift)))))) | (((((data) & (15))) << (shift)))));
  }

  function method_protection_r(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((((offset) === (0)) ? 1 : 0)) {
      return (((((((members.m_prot1 ?? runtime.member("m_prot1"))) << ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))) | (runtime.shiftRight((members.m_prot0 ?? runtime.member("m_prot0")), ((8) - ((members.m_prot_shift ?? runtime.member("m_prot_shift")))))))) & (255));
    } else {
      return 0;
    }
  }

  function method_protection_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if ((((offset) === (0)) ? 1 : 0)) {
      members.m_prot_shift = ((((data) & (7))) & 0xff);
    } else {
      members.m_prot0 = (((members.m_prot1 ?? runtime.member("m_prot1"))) & 0xff);
      members.m_prot1 = ((data) & 0xff);
    }
  }

  function method_refresh_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tnx1_state::refresh_w__base"];

    data = ((data) & 0xff);
    (__L0 ? __L0(offset, data) : runtime.macro("tnx1_state::refresh_w__base", offset, data));
    members.m_watchdog_enabled = ((((Number(((((offset) >>> (9))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_io_mconf.read"], __L1: any = __l["read"], __L2: any = __l["m_fg_tilemap.draw"], __L3: any = __l["draw"], __L4: any = __l["bm.pix"], __L5: any = __l["pix"], __L6: any = __l["bm_last.pix"];
    let __t0: any;

    const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
    let ilmode: any = (__L0 ?? runtime.memberCall(members.m_io_mconf, "read", 0, __L1))();
    let bm: any = ((((Number(ilmode) === Number(0)) ? 1 : 0)) ? (bitmap) : (runtime.readIndex(h_m_bitmap, (members.m_field ?? runtime.member("m_field")))));
    (runtime.overrides["update_palette"] ? runtime.overrides["update_palette"]() : method_update_palette(runtime));
    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bm, cliprect) : method_draw_background(runtime, bm, cliprect));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bm, cliprect) : method_draw_sprites(runtime, bm, cliprect));
    (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L3))(screen, bm, cliprect, 0, 0);
    if (((Number(ilmode) === Number(1)) ? 1 : 0)) {
      for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        if (((Number(((y) & (1))) === Number((members.m_field ?? runtime.member("m_field")))) ? 1 : 0)) {
          for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            bitmap["pix="](y, x, 0);
          }
        } else {
          for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            bitmap["pix="](y, x, (__L4 ?? runtime.memberCall(bm, "pix", 0, __L5))(y, x));
          }
        }
      }
    } else {
      if (((Number(ilmode) === Number(2)) ? 1 : 0)) {
        for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
          let bm_last: any = runtime.readIndex(h_m_bitmap, (((members.m_field ?? runtime.member("m_field"))) ^ (1)));
          if (((Number(((y) & (1))) === Number((members.m_field ?? runtime.member("m_field")))) ? 1 : 0)) {
            for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
              bitmap["pix="](y, x, (__L6 ?? runtime.memberCall(bm_last, "pix", 0, __L5))(y, x));
            }
          } else {
            for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
              bitmap["pix="](y, x, (__L4 ?? runtime.memberCall(bm, "pix", 0, __L5))(y, x));
            }
          }
        }
      }
    }
    return 0;
  }

  function method_update_palette(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_colors"], __L1: any = __l["m_palette.set_pen_color"], __L2: any = __l["rgb_t"];

    const h_m_color_prom = members.m_color_prom ?? runtime.member("m_color_prom");
    const h_mb7051_decode_info = members.mb7051_decode_info ?? runtime.member("mb7051_decode_info");
    const h_txt_mb7051_net_info = members.txt_mb7051_net_info ?? runtime.member("txt_mb7051_net_info");
    const h_mb7052_decode_info = members.mb7052_decode_info ?? runtime.member("mb7052_decode_info");
    const h_obj_mb7052_net_info = members.obj_mb7052_net_info ?? runtime.member("obj_mb7052_net_info");
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (8))) {
      let color_prom: any = __addr_update_palette(runtime, h_m_color_prom, ((16) * (runtime.shiftRight((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (8)), 3))));
      let rgb: any = [];
      (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mb7051_decode_info, (runtime.overrides["bak_mb7051_net_info"] ? runtime.overrides["bak_mb7051_net_info"]() : method_bak_mb7051_net_info(runtime))) : method_compute_res_net_all(runtime, rgb, color_prom, h_mb7051_decode_info, (runtime.overrides["bak_mb7051_net_info"] ? runtime.overrides["bak_mb7051_net_info"]() : method_bak_mb7051_net_info(runtime))));
      (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(0, rgb);
    }
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (8))) {
      let color_prom: any = __addr_update_palette(runtime, __addr_update_palette(runtime, h_m_color_prom, 32), ((16) * (runtime.shiftRight((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (8)), 3))));
      for (let i: any = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let r: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 0)) & (7)), 0, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 0)) & (7)), 0, h_txt_mb7051_net_info))) | 0);
        let g: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 3)) & (7)), 1, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 3)) & (7)), 1, h_txt_mb7051_net_info))) | 0);
        let b: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 6)) & (3)), 2, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 6)) & (3)), 2, h_txt_mb7051_net_info))) | 0);
        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_update_palette(runtime, __add_update_palette(runtime, 16, ((2) * (i))), 0), 4278190080);
        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_update_palette(runtime, __add_update_palette(runtime, 16, ((2) * (i))), 1), (__L2 ? __L2(r, g, b) : runtime.macro("rgb_t", r, g, b)));
      }
    }
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (7))) {
      let color_prom: any = __addr_update_palette(runtime, (members.m_color_prom_spr ?? runtime.member("m_color_prom_spr")), ((32) * ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (7)))));
      let rgb: any = [];
      (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mb7052_decode_info, h_obj_mb7052_net_info) : method_compute_res_net_all(runtime, rgb, color_prom, h_mb7052_decode_info, h_obj_mb7052_net_info));
      (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(48, rgb);
    }
    members.m_palette_bank_cache = (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & 0xff);
  }
  function __add_update_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_update_palette(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
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

  function method_bak_mb7051_net_info(runtime: any): any {
    const members = runtime.members;

    const h_tnx1_bak_mb7051_net_info = members.tnx1_bak_mb7051_net_info ?? runtime.member("tnx1_bak_mb7051_net_info");
    return h_tnx1_bak_mb7051_net_info;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"];

    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let rovi: any = ((__add_draw_background(runtime, (((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (((runtime.divide(y, 2)) ^ (255))) : (runtime.divide(y, 2))), runtime.readIndex(h_m_background_scroll, 1))) & 0xffff);
      for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let roh: any = ((__add_draw_background(runtime, __add_draw_background(runtime, 56, runtime.divide(x, 2)), runtime.readIndex(h_m_background_scroll, 0))) & 0xff);
        let shift: any = (((((((rovi) >>> (7)) & 1)) ? (4) : (0))) | 0);
        bitmap["pix="](y, x, ((runtime.shiftRight(runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), (((((rovi) >>> (8)) & 1)) ? ((((((((rovi) >>> (1)) & ((1 << (6)) - 1))) << (6))) | ((((roh) >>> (2)) & ((1 << (6)) - 1))))) : (0))), shift)) & (15)));
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["STRUCT_ARRAY"], __L3: any = __l["flip_screen"], __L4: any = __l["m_gfxdecode.gfx"], __L5: any = __l["gfx.colorbase"], __L6: any = __l["colorbase"], __L7: any = __l["gfx.granularity"], __L8: any = __l["granularity"], __L9: any = __l["gfx.colors"], __L10: any = __l["colors"], __L11: any = __l["gfx.elements"], __L12: any = __l["elements"], __L13: any = __l["gfx.get_data"], __L14: any = __l["get_data"], __L15: any = __l["gfx.rowbytes"], __L16: any = __l["rowbytes"], __L17: any = __l["copybitmap_trans"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    const h_m_palette = members.m_palette ?? runtime.member("m_palette");
    (__L0 ?? runtime.memberCall(members.m_sprite_bitmap, "fill", 0, __L1))(0, cliprect);
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let attributes: any = (__L2 ? __L2(64, "row", 0, "sx", 0, "color", 0, "code", 0, "flipx", 0, "flipy", 0) : runtime.macro("STRUCT_ARRAY", 64, "row", 0, "sx", 0, "color", 0, "code", 0, "flipx", 0, "flipy", 0));
      for (let offs: any = ((4) | 0); ((Number(offs) < Number(runtime.container(members.m_dmasource, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
        let sy: any = ((((512) - (((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (1)))) * (2))))) | 0);
        let row: any = ((((y) - (sy))) | 0);
        if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
          sy = ((((sy) ^ (511))) | 0);
          row = ((((sy) - (y))) | 0);
        }
        if (((((((row) >= (0)) ? 1 : 0)) && ((((row) < (16)) ? 1 : 0))) ? 1 : 0)) {
          let a: any = __addr_draw_sprites(runtime, attributes, runtime.shiftRight(runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), offs), 2));
          __deref_draw_sprites(runtime, a).sx = ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), offs)) * (2));
          __deref_draw_sprites(runtime, a).row = row;
          __deref_draw_sprites(runtime, a).code = ((__add_draw_sprites(runtime, __add_draw_sprites(runtime, ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (2)))) & (127)), ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (16))) << (3))), ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (4))) << (6)))) ^ (511));
          __deref_draw_sprites(runtime, a).color = ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (7));
          __deref_draw_sprites(runtime, a).flipx = ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (2)))) & (128))) ? (15) : (0));
          __deref_draw_sprites(runtime, a).flipy = ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (8))) ? (15) : (0));
        }
      }
      let flipx: any = ((0) | 0);
      for (let i: any = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let a: any = __addr_draw_sprites(runtime, attributes, i);
        if (((Number(__deref_draw_sprites(runtime, a).color) !== Number(0)) ? 1 : 0)) {
          let gfx: any = (__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1); let gfx$s: any = undefined, gfx$o: any = 0; if (ArrayBuffer.isView(gfx) || Array.isArray(gfx)) gfx$s = gfx; else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) { gfx$s = gfx.source; gfx$o = gfx.offset; }
          let pal: any = h_m_palette["pen&"](__add_draw_sprites(runtime, (__L5 ?? runtime.memberCall(gfx, "colorbase", 0, __L6))(), (((__L7 ?? runtime.memberCall(gfx, "granularity", 0, __L8))()) * (((__deref_draw_sprites(runtime, a).color) % ((__L9 ?? runtime.memberCall(gfx, "colors", 0, __L10))())))))); let pal$s: any = undefined, pal$o: any = 0; if (ArrayBuffer.isView(pal) || Array.isArray(pal)) pal$s = pal; else if (pal !== null && typeof pal === 'object' && pal.generatedPointer === true && pal.path === undefined && pal.target === undefined && (ArrayBuffer.isView(pal.source) || Array.isArray(pal.source))) { pal$s = pal.source; pal$o = pal.offset; }
          let source_base: any = (__L13 ?? runtime.memberCall(gfx, "get_data", 0, __L14))(((__deref_draw_sprites(runtime, a).code) % ((__L11 ?? runtime.memberCall(gfx, "elements", 0, __L12))()))); let source_base$s: any = undefined, source_base$o: any = 0; if (ArrayBuffer.isView(source_base) || Array.isArray(source_base)) source_base$s = source_base; else if (source_base !== null && typeof source_base === 'object' && source_base.generatedPointer === true && source_base.path === undefined && source_base.target === undefined && (ArrayBuffer.isView(source_base.source) || Array.isArray(source_base.source))) { source_base$s = source_base.source; source_base$o = source_base.offset; }
          let source: any = __addr_draw_sprites(runtime, source_base, ((((__deref_draw_sprites(runtime, a).row) ^ (__deref_draw_sprites(runtime, a).flipy))) * ((__L15 ?? runtime.memberCall(gfx, "rowbytes", 0, __L16))()))); let source$s: any = undefined, source$o: any = 0; if (ArrayBuffer.isView(source) || Array.isArray(source)) source$s = source; else if (source !== null && typeof source === 'object' && source.generatedPointer === true && source.path === undefined && source.target === undefined && (ArrayBuffer.isView(source.source) || Array.isArray(source.source))) { source$s = source.source; source$o = source.offset; }
          if (((((runtime.overrides["bootleg_sprites"] ? runtime.overrides["bootleg_sprites"]() : method_bootleg_sprites(runtime))) && (((Number(flipx) !== Number(__deref_draw_sprites(runtime, a).flipx)) ? 1 : 0))) ? 1 : 0)) {
            let px: any = ((runtime.subtract(__deref_draw_sprites(runtime, a).sx, 7)) | 0);
            if (((((((px) >= (0)) ? 1 : 0)) && ((((px) < (512)) ? 1 : 0))) ? 1 : 0)) {
              if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                px = ((((px) ^ (511))) | 0);
              }
              (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))["pix="](y, px, 0);
            }
            flipx = ((__deref_draw_sprites(runtime, a).flipx) | 0);
          }
          for (let x: any = ((0) | 0); (((x) < (16)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            let px: any = ((((((__deref_draw_sprites(runtime, a).sx) + (x))) - (6))) | 0);
            if (((((((px) >= (0)) ? 1 : 0)) && ((((px) < (512)) ? 1 : 0))) ? 1 : 0)) {
              if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                px = ((((px) ^ (511))) | 0);
              }
              let p: any = (((source$s !== undefined ? (source$s[source$o + (((x) ^ (__deref_draw_sprites(runtime, a).flipx)))] ?? 0) : runtime.readIndex(source, ((x) ^ (__deref_draw_sprites(runtime, a).flipx))))) & 0xffff);
              if (p) {
                p = (((pal$s !== undefined ? (pal$s[pal$o + (p)] ?? 0) : runtime.readIndex(pal, p))) & 0xffff);
              }
              (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))["pix="](y, px, p);
            }
          }
        }
      }
    }
    (__L17 ? __L17(bitmap, __deref_draw_sprites(runtime, (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))), 0, 0, 0, 0, cliprect, 0) : runtime.macro("copybitmap_trans", bitmap, __deref_draw_sprites(runtime, (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))), 0, 0, 0, 0, cliprect, 0));
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_draw_sprites(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
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

  function method_bootleg_sprites(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_screen_vblank(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tnx1_state::screen_vblank__base"], __L1: any = __l["m_maincpu.set_input_line"], __L2: any = __l["m_aysnd.reset"];
    let __t0: any;

    (__L0 ? __L0(state) : runtime.macro("tnx1_state::screen_vblank__base", state));
    if (state) {
      let watchdog_counter: any = (((members.m_watchdog_counter ?? runtime.member("m_watchdog_counter"))) & 0xff);
      if (((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) || ((((members.m_watchdog_enabled ?? runtime.member("m_watchdog_enabled"))) ? 0 : 1))) ? 1 : 0)) {
        watchdog_counter = ((0) & 0xff);
      } else {
        watchdog_counter = ((((((watchdog_counter) + (1))) & (15))) & 0xff);
      }
      if (((((watchdog_counter) ^ ((members.m_watchdog_counter ?? runtime.member("m_watchdog_counter"))))) & (4))) {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-2, ((((watchdog_counter) & (4))) ? (1) : (0)));
        (__L2 ?? runtime.memberCall(members.m_aysnd, "reset", 0, undefined))();
      }
      members.m_watchdog_counter = ((watchdog_counter) & 0xff);
    }
  }

  function method_pop_field_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_field ?? runtime.member("m_field"))) ^ (1));
  }

  function method_tnx1_palette(runtime: any, palette: any): any {
    const members = runtime.members;

    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let color: any = ((((((i) & (63))) | (((((i) & (32))) << (1))))) | 0);
      runtime.writeIndex(runtime.writableMember("m_color_prom_spr"), i, runtime.readIndex((members.m_color_prom_spr ?? runtime.member("m_color_prom_spr")), color));
    }
    members.m_palette_bank_cache = ((-1) & 0xff);
    (runtime.overrides["update_palette"] ? runtime.overrides["update_palette"]() : method_update_palette(runtime));
  }

  function method_refresh_w__base(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    let nmi_enabled: any = ((((Number(((((offset) >>> (8))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
    if (((Number((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) !== Number(nmi_enabled)) ? 1 : 0)) {
      members.m_nmi_enabled = ((nmi_enabled) ? 1 : 0);
      if ((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) ? 0 : 1)) {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
      }
    }
  }

  function method_screen_vblank__base(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dmasource.target"], __L1: any = __l["target"], __L2: any = __l["m_sprite_ram.begin"], __L3: any = __l["begin"], __L4: any = __l["std::copy_n"], __L5: any = __l["m_maincpu.set_input_line"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    const h_m_dmasource = members.m_dmasource ?? runtime.member("m_dmasource");
    if (state) {
      (__L4 ? __L4((__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), runtime.container(members.m_dmasource, "bytes"), (__L2 ?? runtime.memberCall(members.m_sprite_ram, "begin", 0, __L3))()) : runtime.macro("std::copy_n", (__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), runtime.container(members.m_dmasource, "bytes"), (__L2 ?? runtime.memberCall(members.m_sprite_ram, "begin", 0, __L3))()));
      (__L4 ? __L4((__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), 3, h_m_background_scroll) : runtime.macro("std::copy_n", (__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), 3, h_m_background_scroll));
      members.m_palette_bank = ((runtime.readIndex(h_m_dmasource, 3)) & 0xff);
      members.m_field = ((((members.m_field) ^ (1))) | 0);
      if ((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) {
        (__L5 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "popeye_videoram_w": method_popeye_videoram_w,
    "popeye_colorram_w": method_popeye_colorram_w,
    "background_w": method_background_w,
    "protection_r": method_protection_r,
    "protection_w": method_protection_w,
    "refresh_w": method_refresh_w,
    "screen_update": method_screen_update,
    "update_palette": method_update_palette,
    "compute_res_net_all": method_compute_res_net_all,
    "compute_res_net": method_compute_res_net,
    "bak_mb7051_net_info": method_bak_mb7051_net_info,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "bootleg_sprites": method_bootleg_sprites,
    "screen_vblank": method_screen_vblank,
    "pop_field_r": method_pop_field_r,
    "tnx1_palette": method_tnx1_palette,
    "refresh_w__base": method_refresh_w__base,
    "screen_vblank__base": method_screen_vblank__base
  };
  return __methodTable;
})();
    return {
      "tpp2_state.background_w": methods["background_w"],
      "tpp2_state.compute_res_net_all": methods["compute_res_net_all"],
      "tpp2_state.compute_res_net": methods["compute_res_net"],
      "tpp2_state.draw_background": methods["draw_background"],
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


  function method_popeye_videoram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_popeye_colorram_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_fg_tilemap.mark_tile_dirty"], __L1: any = __l["mark_tile_dirty"];

    data = ((data) & 0xff);
    runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
    (__L0 ?? runtime.memberCall(members.m_fg_tilemap, "mark_tile_dirty", 0, __L1))(offset);
  }

  function method_background_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    let shift: any = (((((((offset) >>> (12)) & 1)) ? (4) : (0))) | 0);
    offset = (((offset) >>> (0)) & ((1 << (12)) - 1));
    runtime.writeIndex(runtime.writableMember("m_background_ram"), offset, ((((runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), offset)) & ((~((15) << (shift)))))) | (((((data) & (15))) << (shift)))));
  }

  function method_protection_r(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((((offset) === (0)) ? 1 : 0)) {
      return (((((((members.m_prot1 ?? runtime.member("m_prot1"))) << ((members.m_prot_shift ?? runtime.member("m_prot_shift"))))) | (runtime.shiftRight((members.m_prot0 ?? runtime.member("m_prot0")), ((8) - ((members.m_prot_shift ?? runtime.member("m_prot_shift")))))))) & (255));
    } else {
      return 0;
    }
  }

  function method_protection_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((data) & 0xff);
    if ((((offset) === (0)) ? 1 : 0)) {
      members.m_prot_shift = ((((data) & (7))) & 0xff);
    } else {
      members.m_prot0 = (((members.m_prot1 ?? runtime.member("m_prot1"))) & 0xff);
      members.m_prot1 = ((data) & 0xff);
    }
  }

  function method_refresh_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tnx1_state::refresh_w__base"];

    data = ((data) & 0xff);
    (__L0 ? __L0(offset, data) : runtime.macro("tnx1_state::refresh_w__base", offset, data));
    members.m_watchdog_enabled = ((((Number(((((offset) >>> (9))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_io_mconf.read"], __L1: any = __l["read"], __L2: any = __l["m_fg_tilemap.draw"], __L3: any = __l["draw"], __L4: any = __l["bm.pix"], __L5: any = __l["pix"], __L6: any = __l["bm_last.pix"];
    let __t0: any;

    const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
    let ilmode: any = (__L0 ?? runtime.memberCall(members.m_io_mconf, "read", 0, __L1))();
    let bm: any = ((((Number(ilmode) === Number(0)) ? 1 : 0)) ? (bitmap) : (runtime.readIndex(h_m_bitmap, (members.m_field ?? runtime.member("m_field")))));
    (runtime.overrides["update_palette"] ? runtime.overrides["update_palette"]() : method_update_palette(runtime));
    (runtime.overrides["draw_background"] ? runtime.overrides["draw_background"](bm, cliprect) : method_draw_background(runtime, bm, cliprect));
    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bm, cliprect) : method_draw_sprites(runtime, bm, cliprect));
    (__L2 ?? runtime.memberCall(members.m_fg_tilemap, "draw", 0, __L3))(screen, bm, cliprect, 0, 0);
    if (((Number(ilmode) === Number(1)) ? 1 : 0)) {
      for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
        if (((Number(((y) & (1))) === Number((members.m_field ?? runtime.member("m_field")))) ? 1 : 0)) {
          for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            bitmap["pix="](y, x, 0);
          }
        } else {
          for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            bitmap["pix="](y, x, (__L4 ?? runtime.memberCall(bm, "pix", 0, __L5))(y, x));
          }
        }
      }
    } else {
      if (((Number(ilmode) === Number(2)) ? 1 : 0)) {
        for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
          let bm_last: any = runtime.readIndex(h_m_bitmap, (((members.m_field ?? runtime.member("m_field"))) ^ (1)));
          if (((Number(((y) & (1))) === Number((members.m_field ?? runtime.member("m_field")))) ? 1 : 0)) {
            for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
              bitmap["pix="](y, x, (__L6 ?? runtime.memberCall(bm_last, "pix", 0, __L5))(y, x));
            }
          } else {
            for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
              bitmap["pix="](y, x, (__L4 ?? runtime.memberCall(bm, "pix", 0, __L5))(y, x));
            }
          }
        }
      }
    }
    return 0;
  }

  function method_update_palette(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_palette.set_pen_colors"], __L1: any = __l["m_palette.set_pen_color"], __L2: any = __l["rgb_t"];

    const h_m_color_prom = members.m_color_prom ?? runtime.member("m_color_prom");
    const h_mb7051_decode_info = members.mb7051_decode_info ?? runtime.member("mb7051_decode_info");
    const h_txt_mb7051_net_info = members.txt_mb7051_net_info ?? runtime.member("txt_mb7051_net_info");
    const h_mb7052_decode_info = members.mb7052_decode_info ?? runtime.member("mb7052_decode_info");
    const h_obj_mb7052_net_info = members.obj_mb7052_net_info ?? runtime.member("obj_mb7052_net_info");
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (8))) {
      let color_prom: any = __addr_update_palette(runtime, h_m_color_prom, ((16) * (runtime.shiftRight((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (8)), 3))));
      let rgb: any = [];
      (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mb7051_decode_info, (runtime.overrides["bak_mb7051_net_info"] ? runtime.overrides["bak_mb7051_net_info"]() : method_bak_mb7051_net_info(runtime))) : method_compute_res_net_all(runtime, rgb, color_prom, h_mb7051_decode_info, (runtime.overrides["bak_mb7051_net_info"] ? runtime.overrides["bak_mb7051_net_info"]() : method_bak_mb7051_net_info(runtime))));
      (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(0, rgb);
    }
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (8))) {
      let color_prom: any = __addr_update_palette(runtime, __addr_update_palette(runtime, h_m_color_prom, 32), ((16) * (runtime.shiftRight((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (8)), 3))));
      for (let i: any = ((0) | 0); (((i) < (16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let r: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 0)) & (7)), 0, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 0)) & (7)), 0, h_txt_mb7051_net_info))) | 0);
        let g: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 3)) & (7)), 1, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 3)) & (7)), 1, h_txt_mb7051_net_info))) | 0);
        let b: any = (((runtime.overrides["compute_res_net"] ? runtime.overrides["compute_res_net"](((runtime.shiftRight(runtime.readIndex(color_prom, i), 6)) & (3)), 2, h_txt_mb7051_net_info) : method_compute_res_net(runtime, ((runtime.shiftRight(runtime.readIndex(color_prom, i), 6)) & (3)), 2, h_txt_mb7051_net_info))) | 0);
        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_update_palette(runtime, __add_update_palette(runtime, 16, ((2) * (i))), 0), 4278190080);
        (__L1 ?? runtime.memberCall(members.m_palette, "set_pen_color", 0, undefined))(__add_update_palette(runtime, __add_update_palette(runtime, 16, ((2) * (i))), 1), (__L2 ? __L2(r, g, b) : runtime.macro("rgb_t", r, g, b)));
      }
    }
    if ((((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) ^ ((members.m_palette_bank_cache ?? runtime.member("m_palette_bank_cache"))))) & (7))) {
      let color_prom: any = __addr_update_palette(runtime, (members.m_color_prom_spr ?? runtime.member("m_color_prom_spr")), ((32) * ((((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & (7)))));
      let rgb: any = [];
      (runtime.overrides["compute_res_net_all"] ? runtime.overrides["compute_res_net_all"](rgb, color_prom, h_mb7052_decode_info, h_obj_mb7052_net_info) : method_compute_res_net_all(runtime, rgb, color_prom, h_mb7052_decode_info, h_obj_mb7052_net_info));
      (__L0 ?? runtime.memberCall(members.m_palette, "set_pen_colors", 0, undefined))(48, rgb);
    }
    members.m_palette_bank_cache = (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) & 0xff);
  }
  function __add_update_palette(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_update_palette(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
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

  function method_bak_mb7051_net_info(runtime: any): any {
    const members = runtime.members;

    const h_tpp1_bak_mb7051_net_info = members.tpp1_bak_mb7051_net_info ?? runtime.member("tpp1_bak_mb7051_net_info");
    return h_tpp1_bak_mb7051_net_info;
  }

  function method_draw_background(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["flip_screen"];

    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let rovi: any = ((__add_draw_background(runtime, (((__L0 ? __L0() : runtime.macro("flip_screen"))) ? (((runtime.divide(y, 2)) ^ (255))) : (runtime.divide(y, 2))), runtime.readIndex(h_m_background_scroll, 1))) & 0xffff);
      for (let x: any = ((cliprect.min_x) | 0); ((Number(x) <= Number(cliprect.max_x)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
        let roh: any = ((__add_draw_background(runtime, __add_draw_background(runtime, 56, runtime.divide(x, 2)), runtime.readIndex(h_m_background_scroll, 0))) & 0xff);
        let shift: any = (((((((rovi) >>> (7)) & 1)) ? (4) : (0))) | 0);
        bitmap["pix="](y, x, ((runtime.shiftRight(runtime.readIndex((members.m_background_ram ?? runtime.member("m_background_ram")), (((((rovi) >>> (8)) & 1)) ? ((((((((rovi) >>> (1)) & ((1 << (6)) - 1))) << (6))) | ((((roh) >>> (2)) & ((1 << (6)) - 1))))) : (0))), shift)) & (15)));
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

  function method_draw_sprites(runtime: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_sprite_bitmap.fill"], __L1: any = __l["fill"], __L2: any = __l["STRUCT_ARRAY"], __L3: any = __l["flip_screen"], __L4: any = __l["m_gfxdecode.gfx"], __L5: any = __l["gfx.colorbase"], __L6: any = __l["colorbase"], __L7: any = __l["gfx.granularity"], __L8: any = __l["granularity"], __L9: any = __l["gfx.colors"], __L10: any = __l["colors"], __L11: any = __l["gfx.elements"], __L12: any = __l["elements"], __L13: any = __l["gfx.get_data"], __L14: any = __l["get_data"], __L15: any = __l["gfx.rowbytes"], __L16: any = __l["rowbytes"], __L17: any = __l["copybitmap_trans"];
    let __t0: any, __t1: any, __t2: any, __t3: any, __t4: any;

    const h_m_palette = members.m_palette ?? runtime.member("m_palette");
    (__L0 ?? runtime.memberCall(members.m_sprite_bitmap, "fill", 0, __L1))(0, cliprect);
    for (let y: any = ((cliprect.min_y) | 0); ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((((y) + (1))) | 0)) {
      let attributes: any = (__L2 ? __L2(64, "row", 0, "sx", 0, "color", 0, "code", 0, "flipx", 0, "flipy", 0) : runtime.macro("STRUCT_ARRAY", 64, "row", 0, "sx", 0, "color", 0, "code", 0, "flipx", 0, "flipy", 0));
      for (let offs: any = ((4) | 0); ((Number(offs) < Number(runtime.container(members.m_dmasource, "bytes"))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
        let sy: any = ((((512) - (((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (1)))) * (2))))) | 0);
        let row: any = ((((y) - (sy))) | 0);
        if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
          sy = ((((sy) ^ (511))) | 0);
          row = ((((sy) - (y))) | 0);
        }
        if (((((((row) >= (0)) ? 1 : 0)) && ((((row) < (16)) ? 1 : 0))) ? 1 : 0)) {
          let a: any = __addr_draw_sprites(runtime, attributes, runtime.shiftRight(runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), offs), 2));
          __deref_draw_sprites(runtime, a).sx = ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), offs)) * (2));
          __deref_draw_sprites(runtime, a).row = row;
          __deref_draw_sprites(runtime, a).code = ((__add_draw_sprites(runtime, __add_draw_sprites(runtime, ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (2)))) & (127)), ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (16))) << (3))), ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (4))) << (6)))) ^ (511));
          __deref_draw_sprites(runtime, a).color = ((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (7));
          __deref_draw_sprites(runtime, a).flipx = ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (2)))) & (128))) ? (15) : (0));
          __deref_draw_sprites(runtime, a).flipy = ((((runtime.readIndex((members.m_sprite_ram ?? runtime.member("m_sprite_ram")), ((offs) + (3)))) & (8))) ? (15) : (0));
        }
      }
      let flipx: any = ((0) | 0);
      for (let i: any = ((0) | 0); (((i) < (64)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let a: any = __addr_draw_sprites(runtime, attributes, i);
        if (((Number(__deref_draw_sprites(runtime, a).color) !== Number(0)) ? 1 : 0)) {
          let gfx: any = (__L4 ?? runtime.memberCall(members.m_gfxdecode, "gfx", 0, undefined))(1); let gfx$s: any = undefined, gfx$o: any = 0; if (ArrayBuffer.isView(gfx) || Array.isArray(gfx)) gfx$s = gfx; else if (gfx !== null && typeof gfx === 'object' && gfx.generatedPointer === true && gfx.path === undefined && gfx.target === undefined && (ArrayBuffer.isView(gfx.source) || Array.isArray(gfx.source))) { gfx$s = gfx.source; gfx$o = gfx.offset; }
          let pal: any = h_m_palette["pen&"](__add_draw_sprites(runtime, (__L5 ?? runtime.memberCall(gfx, "colorbase", 0, __L6))(), (((__L7 ?? runtime.memberCall(gfx, "granularity", 0, __L8))()) * (((__deref_draw_sprites(runtime, a).color) % ((__L9 ?? runtime.memberCall(gfx, "colors", 0, __L10))())))))); let pal$s: any = undefined, pal$o: any = 0; if (ArrayBuffer.isView(pal) || Array.isArray(pal)) pal$s = pal; else if (pal !== null && typeof pal === 'object' && pal.generatedPointer === true && pal.path === undefined && pal.target === undefined && (ArrayBuffer.isView(pal.source) || Array.isArray(pal.source))) { pal$s = pal.source; pal$o = pal.offset; }
          let source_base: any = (__L13 ?? runtime.memberCall(gfx, "get_data", 0, __L14))(((__deref_draw_sprites(runtime, a).code) % ((__L11 ?? runtime.memberCall(gfx, "elements", 0, __L12))()))); let source_base$s: any = undefined, source_base$o: any = 0; if (ArrayBuffer.isView(source_base) || Array.isArray(source_base)) source_base$s = source_base; else if (source_base !== null && typeof source_base === 'object' && source_base.generatedPointer === true && source_base.path === undefined && source_base.target === undefined && (ArrayBuffer.isView(source_base.source) || Array.isArray(source_base.source))) { source_base$s = source_base.source; source_base$o = source_base.offset; }
          let source: any = __addr_draw_sprites(runtime, source_base, ((((__deref_draw_sprites(runtime, a).row) ^ (__deref_draw_sprites(runtime, a).flipy))) * ((__L15 ?? runtime.memberCall(gfx, "rowbytes", 0, __L16))()))); let source$s: any = undefined, source$o: any = 0; if (ArrayBuffer.isView(source) || Array.isArray(source)) source$s = source; else if (source !== null && typeof source === 'object' && source.generatedPointer === true && source.path === undefined && source.target === undefined && (ArrayBuffer.isView(source.source) || Array.isArray(source.source))) { source$s = source.source; source$o = source.offset; }
          if (((((runtime.overrides["bootleg_sprites"] ? runtime.overrides["bootleg_sprites"]() : method_bootleg_sprites(runtime))) && (((Number(flipx) !== Number(__deref_draw_sprites(runtime, a).flipx)) ? 1 : 0))) ? 1 : 0)) {
            let px: any = ((runtime.subtract(__deref_draw_sprites(runtime, a).sx, 7)) | 0);
            if (((((((px) >= (0)) ? 1 : 0)) && ((((px) < (512)) ? 1 : 0))) ? 1 : 0)) {
              if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                px = ((((px) ^ (511))) | 0);
              }
              (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))["pix="](y, px, 0);
            }
            flipx = ((__deref_draw_sprites(runtime, a).flipx) | 0);
          }
          for (let x: any = ((0) | 0); (((x) < (16)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            let px: any = ((((((__deref_draw_sprites(runtime, a).sx) + (x))) - (6))) | 0);
            if (((((((px) >= (0)) ? 1 : 0)) && ((((px) < (512)) ? 1 : 0))) ? 1 : 0)) {
              if ((__L3 ? __L3() : runtime.macro("flip_screen"))) {
                px = ((((px) ^ (511))) | 0);
              }
              let p: any = (((source$s !== undefined ? (source$s[source$o + (((x) ^ (__deref_draw_sprites(runtime, a).flipx)))] ?? 0) : runtime.readIndex(source, ((x) ^ (__deref_draw_sprites(runtime, a).flipx))))) & 0xffff);
              if (p) {
                p = (((pal$s !== undefined ? (pal$s[pal$o + (p)] ?? 0) : runtime.readIndex(pal, p))) & 0xffff);
              }
              (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))["pix="](y, px, p);
            }
          }
        }
      }
    }
    (__L17 ? __L17(bitmap, __deref_draw_sprites(runtime, (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))), 0, 0, 0, 0, cliprect, 0) : runtime.macro("copybitmap_trans", bitmap, __deref_draw_sprites(runtime, (members.m_sprite_bitmap ?? runtime.member("m_sprite_bitmap"))), 0, 0, 0, 0, cliprect, 0));
  }
  function __add_draw_sprites(runtime: any, a: any, b: any): any {
    if (typeof a === 'number' && typeof b === 'number') return a + b;
    if (a !== null && typeof a === 'object' && a.generatedPointer === true && a.target === undefined && typeof b === 'number') {
      return { generatedPointer: true, source: a.source, offset: a.offset + b };
    }
    return runtime.add(a, b);
  }
  function __addr_draw_sprites(runtime: any, v: any, i: any): any {
    if (Array.isArray(v) || ArrayBuffer.isView(v)) return { generatedPointer: true, source: v, offset: i };
    return runtime.addressOf(v, i);
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

  function method_bootleg_sprites(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_screen_vblank(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["tnx1_state::screen_vblank__base"], __L1: any = __l["m_maincpu.set_input_line"], __L2: any = __l["m_aysnd.reset"];
    let __t0: any;

    (__L0 ? __L0(state) : runtime.macro("tnx1_state::screen_vblank__base", state));
    if (state) {
      let watchdog_counter: any = (((members.m_watchdog_counter ?? runtime.member("m_watchdog_counter"))) & 0xff);
      if (((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) || ((((members.m_watchdog_enabled ?? runtime.member("m_watchdog_enabled"))) ? 0 : 1))) ? 1 : 0)) {
        watchdog_counter = ((0) & 0xff);
      } else {
        watchdog_counter = ((((((watchdog_counter) + (1))) & (15))) & 0xff);
      }
      if (((((watchdog_counter) ^ ((members.m_watchdog_counter ?? runtime.member("m_watchdog_counter"))))) & (4))) {
        (__L1 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-2, ((((watchdog_counter) & (4))) ? (1) : (0)));
        (__L2 ?? runtime.memberCall(members.m_aysnd, "reset", 0, undefined))();
      }
      members.m_watchdog_counter = ((watchdog_counter) & 0xff);
    }
  }

  function method_pop_field_r(runtime: any): any {
    const members = runtime.members;

    return (((members.m_field ?? runtime.member("m_field"))) ^ (1));
  }

  function method_tnx1_palette(runtime: any, palette: any): any {
    const members = runtime.members;

    for (let i: any = ((0) | 0); (((i) < (256)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let color: any = ((((((i) & (63))) | (((((i) & (32))) << (1))))) | 0);
      runtime.writeIndex(runtime.writableMember("m_color_prom_spr"), i, runtime.readIndex((members.m_color_prom_spr ?? runtime.member("m_color_prom_spr")), color));
    }
    members.m_palette_bank_cache = ((-1) & 0xff);
    (runtime.overrides["update_palette"] ? runtime.overrides["update_palette"]() : method_update_palette(runtime));
  }

  function method_refresh_w__base(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_maincpu.set_input_line"];

    data = ((data) & 0xff);
    let nmi_enabled: any = ((((Number(((((offset) >>> (8))) & (1))) !== Number(0)) ? 1 : 0)) ? 1 : 0);
    if (((Number((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) !== Number(nmi_enabled)) ? 1 : 0)) {
      members.m_nmi_enabled = ((nmi_enabled) ? 1 : 0);
      if ((((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) ? 0 : 1)) {
        (__L0 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 0);
      }
    }
  }

  function method_screen_vblank__base(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;
    const __L0: any = __l["m_dmasource.target"], __L1: any = __l["target"], __L2: any = __l["m_sprite_ram.begin"], __L3: any = __l["begin"], __L4: any = __l["std::copy_n"], __L5: any = __l["m_maincpu.set_input_line"];
    let __t0: any, __t1: any, __t2: any;

    const h_m_background_scroll = members.m_background_scroll ?? runtime.member("m_background_scroll");
    const h_m_dmasource = members.m_dmasource ?? runtime.member("m_dmasource");
    if (state) {
      (__L4 ? __L4((__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), runtime.container(members.m_dmasource, "bytes"), (__L2 ?? runtime.memberCall(members.m_sprite_ram, "begin", 0, __L3))()) : runtime.macro("std::copy_n", (__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), runtime.container(members.m_dmasource, "bytes"), (__L2 ?? runtime.memberCall(members.m_sprite_ram, "begin", 0, __L3))()));
      (__L4 ? __L4((__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), 3, h_m_background_scroll) : runtime.macro("std::copy_n", (__L0 ?? runtime.memberCall(members.m_dmasource, "target", 0, __L1))(), 3, h_m_background_scroll));
      members.m_palette_bank = ((runtime.readIndex(h_m_dmasource, 3)) & 0xff);
      members.m_field = ((((members.m_field) ^ (1))) | 0);
      if ((members.m_nmi_enabled ?? runtime.member("m_nmi_enabled"))) {
        (__L5 ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-1, 1);
      }
    }
  }
  // CALL_METHOD's direct targets: each emitted method by its name.
  const __methodTable: Record<string, any> = {
    "popeye_videoram_w": method_popeye_videoram_w,
    "popeye_colorram_w": method_popeye_colorram_w,
    "background_w": method_background_w,
    "protection_r": method_protection_r,
    "protection_w": method_protection_w,
    "refresh_w": method_refresh_w,
    "screen_update": method_screen_update,
    "update_palette": method_update_palette,
    "compute_res_net_all": method_compute_res_net_all,
    "compute_res_net": method_compute_res_net,
    "bak_mb7051_net_info": method_bak_mb7051_net_info,
    "draw_background": method_draw_background,
    "draw_sprites": method_draw_sprites,
    "bootleg_sprites": method_bootleg_sprites,
    "screen_vblank": method_screen_vblank,
    "pop_field_r": method_pop_field_r,
    "tnx1_palette": method_tnx1_palette,
    "refresh_w__base": method_refresh_w__base,
    "screen_vblank__base": method_screen_vblank__base
  };
  return __methodTable;
})();
    return {
      "tpp1_state.bak_mb7051_net_info": methods["bak_mb7051_net_info"],
      "tpp1_state.pop_field_r": methods["pop_field_r"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["STRUCT_ARRAY","begin","bm.pix","bm_last.pix","colorbase","colors","copybitmap_trans","draw","elements","fatalerror","fill","flip_screen","flip_screen_set","get_data","gfx.colorbase","gfx.colors","gfx.elements","gfx.get_data","gfx.granularity","gfx.rowbytes","granularity","m_aysnd.reset","m_dmasource.target","m_fg_tilemap.draw","m_fg_tilemap.mark_tile_dirty","m_gfxdecode.gfx","m_io_mconf.read","m_maincpu.set_input_line","m_palette.set_pen_color","m_palette.set_pen_colors","m_sprite_bitmap.fill","m_sprite_ram.begin","mark_tile_dirty","pix","read","rgb_t","rowbytes","set","std::copy_n","target","tileinfo.set","tnx1_state::refresh_w__base","tnx1_state::screen_vblank__base"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
