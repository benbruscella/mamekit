// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './k053246.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_k053246_read_register(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), offset);
  }

  function method_k053247_read_register(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_kx47_regs = members.m_kx47_regs ?? runtime.member("m_kx47_regs");
    return runtime.readIndex(h_m_kx47_regs, offset);
  }

  function method_k055673_reg_word_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    const h_m_kx47_regs = members.m_kx47_regs ?? runtime.member("m_kx47_regs");
    runtime.combineData(((h_m_kx47_regs) + (offset)), data, mem_mask);
  }

  function method_k053247_word_r(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
  }

  function method_k053247_word_w(runtime: any, offset: any, data: any, mem_mask: any) {
    const members = runtime.members;
    runtime.combineData((((typeof (runtime.dereference(members.m_ram)).get === 'function' ? (runtime.dereference(members.m_ram)).get() : typeof (runtime.dereference(members.m_ram)).get === 'number' || typeof (runtime.dereference(members.m_ram)).get === 'boolean' ? (runtime.dereference(members.m_ram)).get : runtime.container(members.m_ram, "get"))) + (offset)), data, mem_mask);
  }

  function method_k053247_r(runtime: any, offset: any) {
    const members = runtime.members;
    let offs: any = ((offset) >>> (1));
    if (((offset) & (1))) {
      return ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255));
    } else {
      return ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) >>> (8));
    }
  }

  function method_k053247_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let offs: any = ((offset) >>> (1));
    if (((offset) & (1))) {
      runtime.writeIndex(runtime.writableMember("m_ram"), offs, ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (65280))) | (data)));
    } else {
      runtime.writeIndex(runtime.writableMember("m_ram"), offs, ((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255))) | (((data) << (8)))));
    }
  }

  function method_k055673_5bpp_rom_word_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
    let ROM8: any = runtime.addressOf(h_m_gfxrom, 0);
    let ROM: any = runtime.addressOf(h_m_gfxrom, 0);
    let size4: any = runtime.divide(runtime.divide((members.m_gfxrom).length, ((1024) * (1024))), 5);
    let romofs: any = 0;
    size4 = ((size4) * (((((4) * (1024))) * (1024))));
    ROM8 = ({ ...(ROM8), offset: ((ROM8).offset + (size4)) });
    romofs = ((((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 6)) << (16))) | (((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 7)) << (8))))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 4)));
    switch (offset) {
      case 0:
      {
        return runtime.readIndex(ROM, ((romofs) + (2)));
      }
      case 1:
      {
        return runtime.readIndex(ROM, ((romofs) + (3)));
      }
      case 2:
      case 3:
      {
        romofs = ((romofs) / (2));
        return runtime.readIndex(ROM8, ((romofs) + (1)));
      }
      case 4:
      {
        return runtime.readIndex(ROM, romofs);
      }
      case 5:
      {
        return runtime.readIndex(ROM, ((romofs) + (1)));
      }
      case 6:
      case 7:
      {
        romofs = ((romofs) / (2));
        return runtime.readIndex(ROM8, romofs);
      }
      default:
      {
        0;
        break;
      }
    }
    return 0;
  }

  function method_k055673_rom_word_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
    if (((Number((members.m_bpp ?? runtime.member("m_bpp"))) === Number(5)) ? 1 : 0)) {
      return method_k055673_5bpp_rom_word_r(runtime, offset);
    }
    let ROM: any = runtime.addressOf(h_m_gfxrom, 0);
    let romofs: any = 0;
    romofs = ((((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 6)) << (16))) | (((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 7)) << (8))))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 4)));
    romofs = ((((romofs) >>> (2))) * ((members.m_bpp ?? runtime.member("m_bpp"))));
    if (((Number(((offset) & (4))) === Number(0)) ? 1 : 0)) {
      romofs = ((romofs) + ((((members.m_bpp ?? runtime.member("m_bpp"))) >>> (1))));
    }
    return runtime.readIndex(ROM, ((romofs) + (((offset) & (3)))));
  }

  function method_k055673_ps_rom_word_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
    let ROM: any = runtime.addressOf(h_m_gfxrom, 0);
    let romofs: any = 0;
    let magic: any = ((offset) & (1));
    romofs = ((((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 6)) << (16))) | (((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 7)) << (8))))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 4)));
    offset = ((((offset) & (4))) >>> (1));
    let finoffs: any = ((runtime.add(((romofs) * (2)), ((offset) * (2)))) + (magic));
    return ((runtime.readIndex(ROM, ((finoffs) + (2)))) | (((runtime.readIndex(ROM, finoffs)) << (8))));
  }

  function method_k055673_gr_rom_word_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
    let ROM: any = runtime.addressOf(h_m_gfxrom, 0);
    let romofs: any = ((((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 6)) << (16))) | (((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 7)) << (8))))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 4)));
    offset = ((((offset) & (4))) >>> (1));
    let finoffs: any = runtime.add(((romofs) * (2)), ((offset) * (2)));
    return ((runtime.readIndex(ROM, ((finoffs) + (1)))) | (((runtime.readIndex(ROM, finoffs)) << (8))));
  }

  function method_k053246_r(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_gfxrom = members.m_gfxrom ?? runtime.member("m_gfxrom");
    if (((Number((members.m_objcha_line ?? runtime.member("m_objcha_line"))) === Number(1)) ? 1 : 0)) {
      let addr: any = ((((((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 6)) << (17))) | (((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 7)) << (9))))) | (((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 4)) << (1))))) | (((((offset) & (1))) ^ (1))));
      (runtime.calls["assert"] ? runtime.calls["assert"]((((((members.m_gfxrom).length) & ((((members.m_gfxrom).length) - (1))))) ? 0 : 1)) : runtime.macro("assert", (((((members.m_gfxrom).length) & ((((members.m_gfxrom).length) - (1))))) ? 0 : 1)));
      addr = runtime.andAssign(addr, (((members.m_gfxrom).length) - (1)));
      return runtime.readIndex(h_m_gfxrom, addr);
    } else {
      return 0;
    }
  }

  function method_k053246_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_kx46_regs"), offset, data);
  }

  function method_k053247_sprites_draw_common(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_kx47_regs = members.m_kx47_regs ?? runtime.member("m_kx47_regs");
    let NUM_SPRITES: any = 256;
    let code: any = 0;
    let color: any = 0;
    let x: any = 0;
    let y: any = 0;
    let shadow: any = 0;
    let shdmask: any = 0;
    let count: any = 0;
    let temp: any = 0;
    let primask: any = 0;
    let sortedlist: any = new Int32Array(new Uint8Array(Math.max(0, Number(NUM_SPRITES))));
    let offs: any = 0;
    let zcode: any = 0;
    let drawmode_table: any = new Uint8Array(Math.max(0, Number(256)));
    let shadowmode_table: any = new Uint8Array(Math.max(0, Number(256)));
    (() => { const target = drawmode_table; const bytes = Number(((drawmode_table)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(1, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(1, 0, bytes); return target; })();
    runtime.writeIndex(drawmode_table, 0, 0);
    (() => { const target = shadowmode_table; const bytes = Number(((shadowmode_table)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(2, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(2, 0, bytes); return target; })();
    runtime.writeIndex(shadowmode_table, 0, 0);
    shdmask = (-1);
    zcode = (members.m_z_rejection ?? runtime.member("m_z_rejection"));
    offs = (count = 0);
    if (((Number(zcode) === Number((-1))) ? 1 : 0)) {
      for (; ((Number(offs) < Number(2048)) ? 1 : 0); offs = ((offs) + (8))) {
        if (((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (32768))) {
          runtime.writeIndex(sortedlist, (() => { const previous = count; count = ((count) + (1)); return previous; })(), offs);
        }
      }
    } else {
      for (; ((Number(offs) < Number(2048)) ? 1 : 0); offs = ((offs) + (8))) {
        if ((((((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (32768))) && (((Number(((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255))) !== Number(zcode)) ? 1 : 0))) ? 1 : 0)) {
          runtime.writeIndex(sortedlist, (() => { const previous = count; count = ((count) + (1)); return previous; })(), offs);
        }
      }
    }
    let w: any = count;
    count = ((count) - (1));
    let h: any = count;
    if (((((runtime.readIndex(h_m_kx47_regs, runtime.divide(12, 2))) & (16))) ? 0 : 1)) {
      for (y = 0; ((Number(y) < Number(h)) ? 1 : 0); y = ((y) + (1))) {
        offs = runtime.readIndex(sortedlist, y);
        zcode = ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255));
        for (x = ((y) + (1)); ((Number(x) < Number(w)) ? 1 : 0); x = ((x) + (1))) {
          temp = runtime.readIndex(sortedlist, x);
          code = ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), temp)) & (255));
          if (((Number(zcode) <= Number(code)) ? 1 : 0)) {
            zcode = code;
            runtime.writeIndex(sortedlist, x, offs);
            runtime.writeIndex(sortedlist, y, (offs = temp));
          }
        }
      }
    } else {
      for (y = 0; ((Number(y) < Number(h)) ? 1 : 0); y = ((y) + (1))) {
        offs = runtime.readIndex(sortedlist, y);
        zcode = ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offs)) & (255));
        for (x = ((y) + (1)); ((Number(x) < Number(w)) ? 1 : 0); x = ((x) + (1))) {
          temp = runtime.readIndex(sortedlist, x);
          code = ((runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), temp)) & (255));
          if (((Number(zcode) >= Number(code)) ? 1 : 0)) {
            zcode = code;
            runtime.writeIndex(sortedlist, x, offs);
            runtime.writeIndex(sortedlist, y, (offs = temp));
          }
        }
      }
    }
    for (; ((Number(count) >= Number(0)) ? 1 : 0); count = ((count) - (1))) {
      offs = runtime.readIndex(sortedlist, count);
      code = runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), ((offs) + (1)));
      shadow = (color = runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), ((offs) + (6))));
      primask = 0;
      (runtime.calls["m_k053247_cb"] ? runtime.calls["m_k053247_cb"](({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => primask, set: (value: any) => { primask = value; } })) : runtime.macro("m_k053247_cb", ({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => primask, set: (value: any) => { primask = value; } })));
      method_k053247_draw_single_sprite_gxcore(runtime, bitmap, cliprect, 0, 0, code, (typeof (runtime.dereference(members.m_ram)).get === 'function' ? (runtime.dereference(members.m_ram)).get() : typeof (runtime.dereference(members.m_ram)).get === 'number' || typeof (runtime.dereference(members.m_ram)).get === 'boolean' ? (runtime.dereference(members.m_ram)).get : runtime.container(members.m_ram, "get")), offs, color, 0, 0, 0, 0, primask, shadow, drawmode_table, shadowmode_table, shdmask);
    }
  }

  function method_k053247_draw_single_sprite_gxcore(runtime: any, bitmap: any, cliprect: any, gx_objzbuf: any, gx_shdzbuf: any, code: any, gx_spriteram: any, offs: any, color: any, alpha: any, drawmode: any, zcode: any, pri: any, primask: any, shadow: any, drawmode_table: any, shadowmode_table: any, shdmask: any) {
    const members = runtime.members;
    let xa: any = 0;
    let ya: any = 0;
    let ox: any = 0;
    let oy: any = 0;
    let flipx: any = 0;
    let flipy: any = 0;
    let mirrorx: any = 0;
    let mirrory: any = 0;
    let zoomx: any = 0;
    let zoomy: any = 0;
    let scalex: any = 0;
    let scaley: any = 0;
    let nozoom: any = 0;
    let temp: any = 0;
    let temp4: any = 0;
    let flipscreenx: any = ((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 5)) & (1));
    let flipscreeny: any = ((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 5)) & (2));
    xa = (ya = 0);
    if (((code) & (1))) {
      xa = ((xa) + (1));
    }
    if (((code) & (2))) {
      ya = ((ya) + (1));
    }
    if (((code) & (4))) {
      xa = ((xa) + (2));
    }
    if (((code) & (8))) {
      ya = ((ya) + (2));
    }
    if (((code) & (16))) {
      xa = ((xa) + (4));
    }
    if (((code) & (32))) {
      ya = ((ya) + (4));
    }
    code = runtime.andAssign(code, (~63));
    temp4 = runtime.readIndex(gx_spriteram, offs);
    oy = ((runtime.readIndex(gx_spriteram, ((offs) + (2)))) & (1023));
    ox = ((runtime.readIndex(gx_spriteram, ((offs) + (3)))) & (1023));
    scaley = (zoomy = ((runtime.readIndex(gx_spriteram, ((offs) + (4)))) & (1023)));
    if (zoomy) {
      zoomy = runtime.divide(runtime.add(4194304, ((zoomy) >>> (1))), zoomy);
    } else {
      zoomy = 8388608;
    }
    if (((((temp4) & (16384))) ? 0 : 1)) {
      scalex = (zoomx = ((runtime.readIndex(gx_spriteram, ((offs) + (5)))) & (1023)));
      if (zoomx) {
        zoomx = runtime.divide(runtime.add(4194304, ((zoomx) >>> (1))), zoomx);
      } else {
        zoomx = 8388608;
      }
    } else {
      zoomx = zoomy;
      scalex = scaley;
    }
    nozoom = (((((Number(scalex) === Number(64)) ? 1 : 0)) && (((Number(scaley) === Number(64)) ? 1 : 0))) ? 1 : 0);
    flipx = ((temp4) & (4096));
    flipy = ((temp4) & (8192));
    temp = runtime.readIndex(gx_spriteram, ((offs) + (6)));
    mirrorx = ((temp) & (16384));
    if (mirrorx) {
      flipx = 0;
    }
    mirrory = ((temp) & (32768));
    let objset1: any = method_k053246_read_register(runtime, 5);
    if (((objset1) & (8))) {
      let screenwidth: any = (runtime.calls["screen().width"]?.() ?? 0);
      zoomx = ((zoomx) >>> (1));
      ox = runtime.add(((ox) >>> (1)), 1);
      if (flipscreenx) {
        ox = ((ox) + (screenwidth));
      }
      nozoom = 0;
    }
    if (flipscreenx) {
      ox = (-ox);
      if (((mirrorx) ? 0 : 1)) {
        flipx = ((flipx) ? 0 : 1);
      }
    }
    if (flipscreeny) {
      oy = (-oy);
      if (((mirrory) ? 0 : 1)) {
        flipy = ((flipy) ? 0 : 1);
      }
    }
    let k053247_opset: any = method_k053247_read_register(runtime, runtime.divide(12, 2));
    let wrapsize: any = 0;
    let xwraplim: any = 0;
    let ywraplim: any = 0;
    if (((k053247_opset) & (64))) {
      wrapsize = 512;
      xwraplim = ((512) - (64));
      ywraplim = ((512) - (128));
    } else {
      wrapsize = 1024;
      xwraplim = ((1024) - (384));
      ywraplim = ((1024) - (512));
    }
    let offx: any = (runtime.calls["short"] ? runtime.calls["short"](((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 0)) << (8))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 1)))) : runtime.macro("short", ((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 0)) << (8))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 1)))));
    let offy: any = (runtime.calls["short"] ? runtime.calls["short"](((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 2)) << (8))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 3)))) : runtime.macro("short", ((((runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 2)) << (8))) | (runtime.readIndex((members.m_kx46_regs ?? runtime.member("m_kx46_regs")), 3)))));
    temp = ((wrapsize) - (1));
    if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
      ox = ((ox) + ((members.m_dx ?? runtime.member("m_dx"))));
      oy = ((oy) - ((members.m_dy ?? runtime.member("m_dy"))));
    }
    ox = ((((ox) - (offx))) & (temp));
    oy = (((((-oy)) - (offy))) & (temp));
    if (((Number(ox) >= Number(xwraplim)) ? 1 : 0)) {
      ox = ((ox) - (wrapsize));
    }
    if (((Number(oy) >= Number(ywraplim)) ? 1 : 0)) {
      oy = ((oy) - (wrapsize));
    }
    temp = ((((temp4) >>> (8))) & (15));
    let width: any = ((1) << (((temp) & (3))));
    let height: any = ((1) << (((((temp) >>> (2))) & (3))));
    if ((((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) ? 0 : 1)) {
      ox = ((ox) + ((members.m_dx ?? runtime.member("m_dx"))));
      oy = ((oy) - ((members.m_dy ?? runtime.member("m_dy"))));
    }
    ox = ((ox) - (((((zoomx) * (width))) >>> (13))));
    oy = ((oy) - (((((zoomy) * (height))) >>> (13))));
    if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
      method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, pri, zcode, alpha, drawmode, gx_objzbuf, gx_shdzbuf, 0, 0);
    } else {
      let whichtable: any = drawmode_table;
      if (((Number(color) === Number((-1))) ? 1 : 0)) {
        if (((Number(shdmask) < Number(0)) ? 1 : 0)) {
          return;
        }
        color = 0;
        shadow = (-1);
        whichtable = shadowmode_table;
        (runtime.calls["palette().set_shadow_mode"]?.(0) ?? 0);
      } else {
        if (((Number(shdmask) >= Number(0)) ? 1 : 0)) {
          shadow = ((((color) & (536870912))) ? (((color) >>> (20))) : (((shadow) >>> (10))));
          if ((shadow = runtime.andAssign(shadow, 3))) {
            (runtime.calls["palette().set_shadow_mode"]?.(((((shadow) - (1))) & (shdmask))) ?? 0);
          }
        } else {
          shadow = 0;
        }
      }
      color = runtime.andAssign(color, 65535);
      runtime.writeIndex(drawmode_table, (((typeof (runtime.dereference(members.m_gfx)).granularity === 'function' ? (runtime.dereference(members.m_gfx)).granularity() : typeof (runtime.dereference(members.m_gfx)).granularity === 'number' || typeof (runtime.dereference(members.m_gfx)).granularity === 'boolean' ? (runtime.dereference(members.m_gfx)).granularity : runtime.container(members.m_gfx, "granularity"))) - (1)), ((shadow) ? (2) : (1)));
      method_k053247_draw_yxloop_gx(runtime, bitmap, cliprect, code, color, height, width, zoomx, zoomy, flipx, flipy, ox, oy, xa, ya, mirrorx, mirrory, nozoom, 0, 0, 0, 0, 0, 0, primask, whichtable);
    }
  }

  function method_k053247_draw_yxloop_gx(runtime: any, bitmap: any, cliprect: any, code: any, color: any, height: any, width: any, zoomx: any, zoomy: any, flipx: any, flipy: any, ox: any, oy: any, xa: any, ya: any, mirrorx: any, mirrory: any, nozoom: any, pri: any, zcode: any, alpha: any, drawmode: any, gx_objzbuf: any, gx_shdzbuf: any, primask: any, whichtable: any) {
    const members = runtime.members;
    let zw: any = 0;
    let zh: any = 0;
    let fx: any = 0;
    let fy: any = 0;
    let sx: any = 0;
    let sy: any = 0;
    let tempcode: any = 0;
    for (let y: any = 0; ((Number(y) < Number(height)) ? 1 : 0); y = ((y) + (1))) {
      sy = ((oy) + (((runtime.add(((zoomy) * (y)), ((1) << (11)))) >>> (12))));
      zh = ((((oy) + (((runtime.add(((zoomy) * (((y) + (1)))), ((1) << (11)))) >>> (12))))) - (sy));
      for (let x: any = 0; ((Number(x) < Number(width)) ? 1 : 0); x = ((x) + (1))) {
        sx = ((ox) + (((runtime.add(((zoomx) * (x)), ((1) << (11)))) >>> (12))));
        zw = ((((ox) + (((runtime.add(((zoomx) * (((x) + (1)))), ((1) << (11)))) >>> (12))))) - (sx));
        tempcode = code;
        if (mirrorx) {
          if (((((flipx) ? 0 : 1)) ^ (((Number(((x) << (1))) < Number(width)) ? 1 : 0)))) {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
            fx = 1;
          } else {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
            fx = 0;
          }
        } else {
          if (flipx) {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
          } else {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
          }
          fx = flipx;
        }
        if (mirrory) {
          if (((((flipy) ? 0 : 1)) ^ (((Number(((y) << (1))) >= Number(height)) ? 1 : 0)))) {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
            fy = 1;
          } else {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
            fy = 0;
          }
        } else {
          if (flipy) {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
          } else {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
          }
          fy = flipy;
        }
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
          if (nozoom) {
            zw = (zh = 16);
          }
          method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
        } else {
          if (nozoom) {
            ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
          } else {
            ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
          }
          if ((((mirrory) && (((Number(height) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            if (nozoom) {
              ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
            } else {
              ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((zw) << (12)), ((zh) << (12)), (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
            }
          }
        }
      }
    }
  }

  function method_zdrawgfxzoom32GP(runtime: any, bitmap: any, cliprect: any, code: any, color: any, flipx: any, flipy: any, sx: any, sy: any, scalex: any, scaley: any, alpha: any, drawmode: any, zcode: any, pri: any, gx_objzbuf: any, gx_shdzbuf: any) {
    const members = runtime.members;
    (runtime.calls["fatalerror"] ? runtime.calls["fatalerror"]("no zdrawgfxzoom32GP for bitmap_ind16\n") : runtime.macro("fatalerror", "no zdrawgfxzoom32GP for bitmap_ind16\n"));
  }

  function method_k053247_sprites_draw(runtime: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    method_k053247_sprites_draw_common(runtime, bitmap, cliprect);
  }

  function method_k053247_device__k053247_draw_yxloop_gx(runtime: any, bitmap: any, cliprect: any, code: any, color: any, height: any, width: any, zoomx: any, zoomy: any, flipx: any, flipy: any, ox: any, oy: any, xa: any, ya: any, mirrorx: any, mirrory: any, nozoom: any, pri: any, zcode: any, alpha: any, drawmode: any, gx_objzbuf: any, gx_shdzbuf: any, primask: any, whichtable: any) {
    const members = runtime.members;
    let zw: any = 0;
    let zh: any = 0;
    let fx: any = 0;
    let fy: any = 0;
    let sx: any = 0;
    let sy: any = 0;
    let tempcode: any = 0;
    for (let y: any = 0; ((Number(y) < Number(height)) ? 1 : 0); y = ((y) + (1))) {
      sy = ((oy) + (((runtime.add(((zoomy) * (y)), ((1) << (11)))) >>> (12))));
      zh = ((((oy) + (((runtime.add(((zoomy) * (((y) + (1)))), ((1) << (11)))) >>> (12))))) - (sy));
      for (let x: any = 0; ((Number(x) < Number(width)) ? 1 : 0); x = ((x) + (1))) {
        sx = ((ox) + (((runtime.add(((zoomx) * (x)), ((1) << (11)))) >>> (12))));
        zw = ((((ox) + (((runtime.add(((zoomx) * (((x) + (1)))), ((1) << (11)))) >>> (12))))) - (sx));
        tempcode = code;
        if (mirrorx) {
          if (((((flipx) ? 0 : 1)) ^ (((Number(((x) << (1))) < Number(width)) ? 1 : 0)))) {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
            fx = 1;
          } else {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
            fx = 0;
          }
        } else {
          if (flipx) {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((((((width) - (1))) - (x))) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
          } else {
            tempcode = ((tempcode) + (([0, 1, 4, 5, 16, 17, 20, 21][(((((((x) + (xa))) & (7))) % 8) + 8) % 8] ?? 0)));
          }
          fx = flipx;
        }
        if (mirrory) {
          if (((((flipy) ? 0 : 1)) ^ (((Number(((y) << (1))) >= Number(height)) ? 1 : 0)))) {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
            fy = 1;
          } else {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
            fy = 0;
          }
        } else {
          if (flipy) {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((((((height) - (1))) - (y))) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
          } else {
            tempcode = ((tempcode) + (([0, 2, 8, 10, 32, 34, 40, 42][(((((((y) + (ya))) & (7))) % 8) + 8) % 8] ?? 0)));
          }
          fy = flipy;
        }
        if ((((gx_objzbuf) && (gx_shdzbuf)) ? 1 : 0)) {
          if (nozoom) {
            zw = (zh = 16);
          }
          method_zdrawgfxzoom32GP(runtime, bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), alpha, drawmode, zcode, pri, gx_objzbuf, gx_shdzbuf);
        } else {
          if (nozoom) {
            ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
          } else {
            ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, fy, sx, sy, ((zw) << (12)), ((zh) << (12)), (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
          }
          if ((((mirrory) && (((Number(height) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
            if (nozoom) {
              ((runtime.dereference(members.m_gfx)).prio_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
            } else {
              ((runtime.dereference(members.m_gfx)).prio_zoom_transtable?.(bitmap, cliprect, tempcode, color, fx, ((fy) ? 0 : 1), sx, sy, ((zw) << (12)), ((zh) << (12)), (runtime.calls["screen().priority"]?.() ?? 0), primask, whichtable) ?? 0);
            }
          }
        }
      }
    }
  }
  return {
    "k053246_read_register": method_k053246_read_register,
    "k053247_read_register": method_k053247_read_register,
    "k055673_reg_word_w": method_k055673_reg_word_w,
    "k053247_word_r": method_k053247_word_r,
    "k053247_word_w": method_k053247_word_w,
    "k053247_r": method_k053247_r,
    "k053247_w": method_k053247_w,
    "k055673_5bpp_rom_word_r": method_k055673_5bpp_rom_word_r,
    "k055673_rom_word_r": method_k055673_rom_word_r,
    "k055673_ps_rom_word_r": method_k055673_ps_rom_word_r,
    "k055673_gr_rom_word_r": method_k055673_gr_rom_word_r,
    "k053246_r": method_k053246_r,
    "k053246_w": method_k053246_w,
    "k053247_sprites_draw_common": method_k053247_sprites_draw_common,
    "k053247_draw_single_sprite_gxcore": method_k053247_draw_single_sprite_gxcore,
    "k053247_draw_yxloop_gx": method_k053247_draw_yxloop_gx,
    "zdrawgfxzoom32GP": method_zdrawgfxzoom32GP,
    "k053247_sprites_draw": method_k053247_sprites_draw,
    "k053247_device::k053247_draw_yxloop_gx": method_k053247_device__k053247_draw_yxloop_gx
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
