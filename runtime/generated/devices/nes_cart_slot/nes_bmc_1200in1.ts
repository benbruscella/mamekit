// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_bmc_1200in1.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read_h(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
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

    const h_m_chr_access = members.m_chr_access ?? 0;
    let bank: any = ((runtime.shiftRight(offset, 10)) | 0);
    if ((((members.m_vram_protect ?? 0)) ? 0 : 1)) {
      runtime.writeIndex(h_m_chr_access[bank], ((offset) & (1023)), data);
    }
  }

  function method_device_nes_cart_interface__chr_w(runtime: any, offset: any, data: any): any {
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

    let bank: any = ((((((runtime.shiftRight(offset, 2)) & (31))) | (runtime.shiftRight(((offset) & (256)), 3)))) | 0);
    0;
    if (((offset) & (128))) {
      method_prg16_89ab(runtime, bank);
      method_prg16_cdef(runtime, ((bank) + (((offset) & (1)))));
    } else {
      let low_mask: any = ((((((offset) & (1))) ? (62) : (255))) | 0);
      if ((((((offset) >>> (9)) & 1)) ? 0 : 1)) {
        method_prg16_89ab(runtime, ((bank) & (low_mask)));
        method_prg16_cdef(runtime, ((bank) & (56)));
      } else {
        method_prg16_89ab(runtime, ((bank) & (low_mask)));
        method_prg16_cdef(runtime, ((bank) | (7)));
      }
    }
    method_set_nt_mirroring(runtime, (((((offset) >>> (1)) & 1)) ? (2) : (1)));
  }

  function method_prg16_89ab(runtime: any, bank: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
    h_m_prg_bank[0] = ((bank) + (0));
    h_m_prg_bank[1] = ((bank) + (1));
    method_update_prg_banks(runtime, 0, 1);
  }

  function method_prg_8k_bank_num(runtime: any, bank_8k: any): any {
    const members = runtime.members;

    if (((Number((members.m_prg_mask ?? 0)) === Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
      return ((bank_8k) & ((members.m_prg_mask ?? 0)));
    }
    if (((Number(bank_8k) < Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
      return bank_8k;
    }
    bank_8k = ((((bank_8k) & ((members.m_prg_mask ?? 0)))) | 0);
    bank_8k = ((((bank_8k) - (runtime.add(runtime.divide((members.m_prg_mask ?? 0), 2), 1)))) | 0);
    return runtime.readIndex((members.m_prg_bank_map ?? 0), bank_8k);
  }

  function method_update_prg_banks(runtime: any, prg_bank_start: any, prg_bank_end: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    const h_m_prg_bank_mem = members.m_prg_bank_mem ?? 0;
    for (let prg_bank: any = ((prg_bank_start) | 0); ((Number(prg_bank) <= Number(prg_bank_end)) ? 1 : 0); prg_bank = ((((prg_bank) + (1))) | 0)) {
      0;
      (__l["assert"] ? __l["assert"](((Number(prg_bank) < Number(((h_m_prg_bank)?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number(((h_m_prg_bank)?.length ?? 0))) ? 1 : 0)));
      (__l["assert"] ? __l["assert"](((Number(prg_bank) < Number(((h_m_prg_bank_mem)?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number(((h_m_prg_bank_mem)?.length ?? 0))) ? 1 : 0)));
      ((runtime.dereference(h_m_prg_bank_mem[prg_bank])).set_entry?.(h_m_prg_bank[prg_bank]) ?? 0);
    }
  }

  function method_prg16_cdef(runtime: any, bank: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
    h_m_prg_bank[2] = ((bank) + (0));
    h_m_prg_bank[3] = ((bank) + (1));
    method_update_prg_banks(runtime, 2, 3);
  }

  function method_set_nt_mirroring(runtime: any, mirroring: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch (mirroring) {
      default:
      {
        method_set_nt_page(runtime, 0, 0, 0, 1);
        method_set_nt_page(runtime, 1, 0, 0, 1);
        method_set_nt_page(runtime, 2, 0, 1, 1);
        method_set_nt_page(runtime, 3, 0, 1, 1);
        break;
      }
      case 1:
      {
        method_set_nt_page(runtime, 0, 0, 0, 1);
        method_set_nt_page(runtime, 1, 0, 1, 1);
        method_set_nt_page(runtime, 2, 0, 0, 1);
        method_set_nt_page(runtime, 3, 0, 1, 1);
        break;
      }
      case 3:
      {
        method_set_nt_page(runtime, 0, 0, 1, 1);
        method_set_nt_page(runtime, 1, 0, 1, 1);
        method_set_nt_page(runtime, 2, 0, 1, 1);
        method_set_nt_page(runtime, 3, 0, 1, 1);
        break;
      }
      case 4:
      {
        method_set_nt_page(runtime, 0, 0, 0, 1);
        method_set_nt_page(runtime, 1, 0, 0, 1);
        method_set_nt_page(runtime, 2, 0, 0, 1);
        method_set_nt_page(runtime, 3, 0, 0, 1);
        break;
      }
      case 5:
      {
        if (((members.m_ext_ntram).length === 0 ? 1 : 0)) {
          (__l["fatalerror"] ? __l["fatalerror"]("4-screen mirroring without on-cart NTRAM!\n") : runtime.macro("fatalerror", "4-screen mirroring without on-cart NTRAM!\n"));
        }
        method_set_nt_page(runtime, 0, 4, 0, 1);
        method_set_nt_page(runtime, 1, 4, 1, 1);
        method_set_nt_page(runtime, 2, 4, 2, 1);
        method_set_nt_page(runtime, 3, 4, 3, 1);
        break;
      }
    }
  }

  function method_set_nt_page(runtime: any, page: any, source: any, bank: any, writable: any): any {
    const members = runtime.members;

    const h_m_nt_src = members.m_nt_src ?? 0;
    const h_m_nt_orig = members.m_nt_orig ?? 0;
    const h_m_nt_access = members.m_nt_access ?? 0;
    const h_m_nt_writable = members.m_nt_writable ?? 0;
    let base_ptr: any = 0;
    switch (source) {
      case 4:
      {
        base_ptr = runtime.addressOf((members.m_ext_ntram ?? 0), 0);
        break;
      }
      case 1:
      {
        bank = ((((bank) & ((((((members.m_vrom_chunks ?? 0)) << (3))) - (1))))) | 0);
        base_ptr = (members.m_vrom ?? 0);
        break;
      }
      case 2:
      case 3:
      {
        base_ptr = 0;
        break;
      }
      default:
      {
        base_ptr = (members.m_ciram ?? 0);
        break;
      }
    }
    page = ((((page) & (3))) | 0);
    h_m_nt_src[page] = source;
    if (base_ptr) {
      h_m_nt_orig[page] = ((bank) * (1024));
      h_m_nt_access[page] = runtime.addressOf(base_ptr, h_m_nt_orig[page]);
    }
    h_m_nt_writable[page] = writable;
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

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;


  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
    "scanline_irq": method_scanline_irq,
    "set_irq_line": method_set_irq_line,
    "chr_w": method_chr_w,
    "device_nes_cart_interface::chr_w": method_device_nes_cart_interface__chr_w,
    "chr_r": method_chr_r,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "get_open_bus": method_get_open_bus,
    "read_m": method_read_m,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "write_h": method_write_h,
    "prg16_89ab": method_prg16_89ab,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
    "prg16_cdef": method_prg16_cdef,
    "set_nt_mirroring": method_set_nt_mirroring,
    "set_nt_page": method_set_nt_page,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["assert","fatalerror","m_maincpu.set_input_line"];

export const device = definition;
export default device;
