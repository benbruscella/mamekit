// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_ks7032.device.ir.json' with { type: 'json' };

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

    const h_m_reg = members.m_reg ?? 0;
    0;
    return ((runtime.readIndex((members.m_prg ?? 0), ((((((h_m_reg[4]) * (8192))) + (offset))) & ((((members.m_prg_size ?? 0)) - (1)))))) & 0xff);
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

  function method_nes_ks7032_device__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    0;
    switch (((offset) & (28672))) {
      case 0:
      case 4096:
      case 8192:
      case 12288:
      {
        let shift: any = ((((4) * ((((offset) >>> (12)) & ((1 << (2)) - 1))))) | 0);
        members.m_irq_count_latch = ((((members.m_irq_count_latch) & ((~((15) << (shift)))))) & 0xffff);
        members.m_irq_count_latch = ((((members.m_irq_count_latch) | (((((data) & (15))) << (shift))))) & 0xffff);
        break;
      }
      case 16384:
      {
        members.m_irq_enable = (((((data) >>> (1)) & 1)) & 0xff);
        if ((members.m_irq_enable ?? 0)) {
          members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
        }
        method_set_irq_line(runtime, 0);
        break;
      }
      case 20480:
      {
        method_set_irq_line(runtime, 0);
        break;
      }
      case 24576:
      {
        members.m_latch = ((((data) & (7))) & 0xff);
        break;
      }
      case 28672:
      {
        h_m_reg[(members.m_latch ?? 0)] = ((((h_m_reg[(members.m_latch ?? 0)]) & (240))) | (((data) & (15))));
        method_prg_update(runtime);
        break;
      }
    }
  }

  function method_prg_update(runtime: any): any {
    const members = runtime.members;

    const h_m_reg = members.m_reg ?? 0;
    method_prg8_89(runtime, h_m_reg[1]);
    method_prg8_ab(runtime, h_m_reg[2]);
    method_prg8_cd(runtime, h_m_reg[3]);
  }

  function method_prg8_89(runtime: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, 0, bank);
  }

  function method_prg8_x(runtime: any, start: any, bank: any): any {
    const members = runtime.members;

    const h_m_prg_bank = members.m_prg_bank ?? 0;
    0;
    bank = ((method_prg_8k_bank_num(runtime, bank)) | 0);
    h_m_prg_bank[start] = bank;
    method_update_prg_banks(runtime, start, start);
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

  function method_prg8_ab(runtime: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, 1, bank);
  }

  function method_prg8_cd(runtime: any, bank: any): any {
    const members = runtime.members;

    method_prg8_x(runtime, 2, bank);
  }

  function method_irq_timer_tick(runtime: any, param: any): any {
    const members = runtime.members;

    if ((members.m_irq_enable ?? 0)) {
      if (((Number((members.m_irq_count = ((((members.m_irq_count) + (1))) & 0xffff))) === Number(0)) ? 1 : 0)) {
        method_set_irq_line(runtime, 1);
        members.m_irq_enable = ((0) & 0xff);
        members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
      }
    }
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
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "nes_ks7032_device::write_h": method_nes_ks7032_device__write_h,
    "prg_update": method_prg_update,
    "prg8_89": method_prg8_89,
    "prg8_x": method_prg8_x,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
    "prg8_ab": method_prg8_ab,
    "prg8_cd": method_prg8_cd,
    "irq_timer_tick": method_irq_timer_tick
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["assert","m_maincpu.set_input_line"];

export const device = definition;
export default device;
