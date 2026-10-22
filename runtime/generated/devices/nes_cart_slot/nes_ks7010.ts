// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_ks7010.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    if ((((((((((((((((((Number(offset) >= Number(19126)) ? 1 : 0)) && (((Number(offset) <= Number(19158)) ? 1 : 0))) ? 1 : 0)) || (((Number(offset) === Number(27618)) ? 1 : 0))) ? 1 : 0)) || (((Number(offset) === Number(27619)) ? 1 : 0))) ? 1 : 0)) || (((Number(offset) === Number(28210)) ? 1 : 0))) ? 1 : 0)) || (((Number(offset) === Number(32764)) ? 1 : 0))) ? 1 : 0)) {
      members.m_latch = (((((offset) >>> (2)) & ((1 << (4)) - 1))) & 0xff);
      method_chr8(runtime, (members.m_latch ?? 0), 0);
    }
    let data: any = ((method_hi_access_rom(runtime, offset)) & 0xff);
    0;
    return ((data) & 0xff);
  }

  function method_chr8(runtime: any, bank: any, source: any): any {
    const members = runtime.members;

    method_bank_chr(runtime, 3, 0, bank, source);
  }

  function method_bank_chr(runtime: any, shift: any, start: any, bank: any, source: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_chr_src = members.m_chr_src ?? 0;
    const h_m_chr_orig = members.m_chr_orig ?? 0;
    const h_m_chr_access = members.m_chr_access ?? 0;
    let base_ptr: any = 0;
    let chr_chunks: any = ((0) >>> 0);
    if (((Number(source) === Number(1)) ? 1 : 0)) {
      (__l["assert"] ? __l["assert"](((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)) : runtime.macro("assert", ((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)));
      base_ptr = runtime.addressOf((members.m_vram ?? 0), 0);
      chr_chunks = (((members.m_vram_chunks ?? 0)) >>> 0);
    } else {
      0;
      base_ptr = (members.m_vrom ?? 0);
      chr_chunks = (((members.m_vrom_chunks ?? 0)) >>> 0);
    }
    bank = ((((bank) & (((((chr_chunks) << (((3) - (shift))))) - (1))))) | 0);
    let size: any = ((((1024) << (shift))) | 0);
    let bank_start: any = ((((bank) * (size))) | 0);
    let kbyte: any = ((((1) << (shift))) | 0);
    for (let i: any = ((0) | 0); ((Number(i) < Number(kbyte)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      h_m_chr_src[((i) + (start))] = source;
      h_m_chr_orig[((i) + (start))] = ((bank_start) + (((i) * (1024))));
      h_m_chr_access[((i) + (start))] = runtime.addressOf(base_ptr, h_m_chr_orig[((i) + (start))]);
    }
  }

  function method_hi_access_rom(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    let bank: any = (((((offset) >>> (13)) & ((1 << (2)) - 1))) | 0);
    return ((runtime.readIndex((members.m_prg ?? 0), runtime.add(((h_m_prg_bank[bank]) * (8192)), ((offset) & (8191))))) & 0xff);
  }

  function method_read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;


  }

  function method_ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_hblank_irq(runtime: any, scanline: any, vblank: any, blanked: any): any {
    const members = runtime.members;


  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any): any {
    const members = runtime.members;


  }

  function method_set_irq_line(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    0;
    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
  }

  function method_chr_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_chr_src = members.m_chr_src ?? 0;
    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
    if (((Number(h_m_chr_src[bank]) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(h_m_chr_access[bank], ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
    return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
    return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
  }

  function method_nt_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_nt_writable = members.m_nt_writable ?? 0;
    const h_m_nt_access = members.m_nt_access ?? 0;
    let page: any = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
    if (h_m_nt_writable[page]) {
      runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_nt_access = members.m_nt_access ?? 0;
    let page: any = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
    return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
  }

  function method_read_l(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_get_open_bus(runtime)) & 0xff);
  }

  function method_get_open_bus(runtime: any): any {
    const members = runtime.members;

    return (((members.m_open_bus ?? 0)) & 0xff);
  }

  function method_read_m(runtime: any, offset: any): any {
    const members = runtime.members;

    let data: any = ((runtime.readIndex((members.m_prg ?? 0), (((((((members.m_latch ?? 0)) * (8192))) + (offset))) & ((((members.m_prg_size ?? 0)) - (1)))))) & 0xff);
    0;
    return ((data) & 0xff);
  }

  function method_device_nes_cart_interface__read_m(runtime: any, offset: any): any {
    const members = runtime.members;

    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return ((runtime.readIndex((members.m_battery ?? 0), ((offset) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
    }
    return ((method_get_open_bus(runtime)) & 0xff);
  }

  function method_write_l(runtime: any, offset: any, data: any): any {
    const members = runtime.members;


  }

  function method_write_m(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
    }
  }

  function method_write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;


  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any): any {
    const members = runtime.members;


  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }
  return {
    "read_h": method_read_h,
    "chr8": method_chr8,
    "bank_chr": method_bank_chr,
    "hi_access_rom": method_hi_access_rom,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
    "scanline_irq": method_scanline_irq,
    "set_irq_line": method_set_irq_line,
    "chr_w": method_chr_w,
    "chr_r": method_chr_r,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "get_open_bus": method_get_open_bus,
    "read_m": method_read_m,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "write_h": method_write_h,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["assert","m_maincpu.set_input_line"];

export const device = definition;
export default device;
