// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_batmap_srrx.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    0;
    if (((Number(((offset) & (28672))) === Number(16384)) ? 1 : 0)) {
      return ((method_read_dpcm(runtime)) & 0xff);
    } else {
      return ((method_hi_access_rom(runtime, offset)) & 0xff);
    }
  }

  function method_read_dpcm(runtime: any): any {
    const members = runtime.members;

    members.m_dpcm_addr = ((((members.m_dpcm_addr) & ((((members.m_misc_rom_size ?? 0)) - (1))))) >>> 0);
    return ((runtime.readIndex((members.m_misc_rom ?? 0), (() => { const previous = members.m_dpcm_addr; members.m_dpcm_addr = ((((members.m_dpcm_addr) + (1))) >>> 0); return previous; })())) & 0xff);
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

    if (((Number(scanline) < Number(239)) ? 1 : 0)) {
      if ((((members.m_irq_count ?? 0)) ? 0 : 1)) {
        members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
      } else {
        members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff);
      }
      if ((((((((members.m_irq_enable ?? 0)) && (((blanked) ? 0 : 1))) ? 1 : 0)) && ((((members.m_irq_count ?? 0)) ? 0 : 1))) ? 1 : 0)) {
        0;
        method_set_irq_line(runtime, 1);
      }
    }
  }

  function method_set_irq_line(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    0;
    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any): any {
    const members = runtime.members;


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

    0;
    offset = ((offset) + (256));
    switch (((offset) & (6144))) {
      case 0:
      {
        return ((method_get_open_bus(runtime)) & 0xff);
      }
      case 2048:
      {
        return ((method_read_dpcm(runtime)) & 0xff);
      }
      default:
      {
        return ((runtime.readIndex((members.m_prg ?? 0), offset)) & 0xff);
      }
    }
  }

  function method_get_open_bus(runtime: any): any {
    const members = runtime.members;

    return (((members.m_open_bus ?? 0)) & 0xff);
  }

  function method_read_m(runtime: any, offset: any): any {
    const members = runtime.members;

    0;
    return ((runtime.readIndex((members.m_prg ?? 0), (((((((members.m_reg ?? 0)) * (8192))) + (offset))) & ((((members.m_prg_size ?? 0)) - (1)))))) & 0xff);
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

  function method_device_nes_cart_interface__read_l(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_get_open_bus(runtime)) & 0xff);
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
  return {
    "read_h": method_read_h,
    "read_dpcm": method_read_dpcm,
    "hi_access_rom": method_hi_access_rom,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
    "set_irq_line": method_set_irq_line,
    "scanline_irq": method_scanline_irq,
    "chr_w": method_chr_w,
    "chr_r": method_chr_r,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "get_open_bus": method_get_open_bus,
    "read_m": method_read_m,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_maincpu.set_input_line"];

export const device = definition;
export default device;
