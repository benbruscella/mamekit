// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_vrc7.device.ir.json' with { type: 'json' };

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

  function method_get_mirroring(runtime: any): any {
    const members = runtime.members;

    return (members.m_mirroring ?? 0);
  }

  function method_set_mirroring(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mirroring = ((val) | 0);
  }

  function method_get_pcb_ctrl_mirror(runtime: any): any {
    const members = runtime.members;

    return (members.m_pcb_ctrl_mirror ?? 0);
  }

  function method_set_pcb_ctrl_mirror(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
  }

  function method_get_four_screen_vram(runtime: any): any {
    const members = runtime.members;

    return (members.m_four_screen_vram ?? 0);
  }

  function method_set_four_screen_vram(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_four_screen_vram = ((val) ? 1 : 0);
  }

  function method_get_trainer(runtime: any): any {
    const members = runtime.members;

    return (members.m_has_trainer ?? 0);
  }

  function method_set_trainer(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_has_trainer = ((val) ? 1 : 0);
  }

  function method_set_mmc1_type(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mmc1_type = val;
  }

  function method_set_n163_vol(runtime: any, vol: any): any {
    const members = runtime.members;

    members.m_n163_vol = ((vol) | 0);
  }

  function method_set_outer_prg_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_prg_size = ((val) >>> 0);
  }

  function method_set_outer_chr_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_chr_size = ((val) >>> 0);
  }

  function method_set_smd133_addr(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_smd133_addr = ((val) | 0);
  }

  function method_set_x1_005_alt(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
  }

  function method_set_bus_conflict(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_bus_conflict = ((val) ? 1 : 0);
  }

  function method_get_open_bus(runtime: any): any {
    const members = runtime.members;

    return (((members.m_open_bus ?? 0)) & 0xff);
  }

  function method_set_open_bus(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_open_bus = ((val) & 0xff);
  }

  function method_get_prg_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_prg ?? 0);
  }

  function method_get_prgram_base(runtime: any): any {
    const members = runtime.members;

    return runtime.addressOf((members.m_prgram ?? 0), 0);
  }

  function method_get_vrom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_vrom ?? 0);
  }

  function method_get_vram_base(runtime: any): any {
    const members = runtime.members;

    return runtime.addressOf((members.m_vram ?? 0), 0);
  }

  function method_get_ciram_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_ciram ?? 0);
  }

  function method_get_battery_base(runtime: any): any {
    const members = runtime.members;

    return runtime.addressOf((members.m_battery ?? 0), 0);
  }

  function method_get_mapper_sram_base(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram = members.m_mapper_sram ?? 0;
    return h_m_mapper_sram;
  }

  function method_get_misc_rom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_misc_rom ?? 0);
  }

  function method_get_prg_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_prg_size ?? 0);
  }

  function method_get_prgram_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_prgram).length;
  }

  function method_get_vrom_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_vrom_size ?? 0);
  }

  function method_get_vram_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_vram).length;
  }

  function method_get_battery_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_battery).length;
  }

  function method_get_mapper_sram_size(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
    return h_m_mapper_sram_size;
  }

  function method_get_misc_rom_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_misc_rom_size ?? 0);
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

  function method_prgram_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_prgram = runtime.resize(members.m_prgram, size));
  }

  function method_battery_alloc(runtime: any, size: any): any {
    const members = runtime.members;

    (members.m_battery = runtime.resize(members.m_battery, size));
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

  function method_read_m(runtime: any, offset: any): any {
    const members = runtime.members;

    0;
    if ((members.m_wram_enable ?? 0)) {
      return ((method_device_nes_cart_interface__read_m(runtime, offset)) & 0xff);
    } else {
      return ((method_get_open_bus(runtime)) & 0xff);
    }
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

  function method_device_nes_cart_interface__write_m(runtime: any, offset: any, data: any): any {
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

  function method_device_nes_cart_interface__get_mirroring(runtime: any): any {
    const members = runtime.members;

    return (members.m_mirroring ?? 0);
  }

  function method_device_nes_cart_interface__set_mirroring(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mirroring = ((val) | 0);
  }

  function method_device_nes_cart_interface__get_pcb_ctrl_mirror(runtime: any): any {
    const members = runtime.members;

    return (members.m_pcb_ctrl_mirror ?? 0);
  }

  function method_device_nes_cart_interface__set_pcb_ctrl_mirror(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__get_four_screen_vram(runtime: any): any {
    const members = runtime.members;

    return (members.m_four_screen_vram ?? 0);
  }

  function method_device_nes_cart_interface__set_four_screen_vram(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_four_screen_vram = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__get_trainer(runtime: any): any {
    const members = runtime.members;

    return (members.m_has_trainer ?? 0);
  }

  function method_device_nes_cart_interface__set_trainer(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_has_trainer = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__set_mmc1_type(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_mmc1_type = val;
  }

  function method_device_nes_cart_interface__set_n163_vol(runtime: any, vol: any): any {
    const members = runtime.members;

    members.m_n163_vol = ((vol) | 0);
  }

  function method_device_nes_cart_interface__set_outer_prg_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_prg_size = ((val) >>> 0);
  }

  function method_device_nes_cart_interface__set_outer_chr_size(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_outer_chr_size = ((val) >>> 0);
  }

  function method_device_nes_cart_interface__set_smd133_addr(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_smd133_addr = ((val) | 0);
  }

  function method_device_nes_cart_interface__set_x1_005_alt(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__set_bus_conflict(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_bus_conflict = ((val) ? 1 : 0);
  }

  function method_device_nes_cart_interface__get_open_bus(runtime: any): any {
    const members = runtime.members;

    return (((members.m_open_bus ?? 0)) & 0xff);
  }

  function method_device_nes_cart_interface__set_open_bus(runtime: any, val: any): any {
    const members = runtime.members;

    members.m_open_bus = ((val) & 0xff);
  }

  function method_device_nes_cart_interface__get_prg_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_prg ?? 0);
  }

  function method_device_nes_cart_interface__get_prgram_base(runtime: any): any {
    const members = runtime.members;

    return runtime.addressOf((members.m_prgram ?? 0), 0);
  }

  function method_device_nes_cart_interface__get_vrom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_vrom ?? 0);
  }

  function method_device_nes_cart_interface__get_vram_base(runtime: any): any {
    const members = runtime.members;

    return runtime.addressOf((members.m_vram ?? 0), 0);
  }

  function method_device_nes_cart_interface__get_ciram_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_ciram ?? 0);
  }

  function method_device_nes_cart_interface__get_battery_base(runtime: any): any {
    const members = runtime.members;

    return runtime.addressOf((members.m_battery ?? 0), 0);
  }

  function method_device_nes_cart_interface__get_mapper_sram_base(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram = members.m_mapper_sram ?? 0;
    return h_m_mapper_sram;
  }

  function method_device_nes_cart_interface__get_misc_rom_base(runtime: any): any {
    const members = runtime.members;

    return (members.m_misc_rom ?? 0);
  }

  function method_device_nes_cart_interface__get_prg_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_prg_size ?? 0);
  }

  function method_device_nes_cart_interface__get_prgram_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_prgram).length;
  }

  function method_device_nes_cart_interface__get_vrom_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_vrom_size ?? 0);
  }

  function method_device_nes_cart_interface__get_vram_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_vram).length;
  }

  function method_device_nes_cart_interface__get_battery_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_battery).length;
  }

  function method_device_nes_cart_interface__get_mapper_sram_size(runtime: any): any {
    const members = runtime.members;

    const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
    return h_m_mapper_sram_size;
  }

  function method_device_nes_cart_interface__get_misc_rom_size(runtime: any): any {
    const members = runtime.members;

    return (members.m_misc_rom_size ?? 0);
  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any): any {
    const members = runtime.members;


  }

  function method_irq_timer_tick(runtime: any, param: any): any {
    const members = runtime.members;

    if ((members.m_irq_enable ?? 0)) {
      if ((members.m_irq_mode ?? 0)) {
        method_irq_tick(runtime);
      } else {
        members.m_irq_prescale = ((((members.m_irq_prescale) - (3))) | 0);
        if (((Number((members.m_irq_prescale ?? 0)) <= Number(0)) ? 1 : 0)) {
          members.m_irq_prescale = ((((members.m_irq_prescale) + (341))) | 0);
          method_irq_tick(runtime);
        }
      }
    }
  }

  function method_irq_tick(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_irq_count ?? 0)) === Number(255)) ? 1 : 0)) {
      members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xff);
      method_set_irq_line(runtime, 1);
    } else {
      members.m_irq_count = ((((members.m_irq_count) + (1))) & 0xff);
    }
  }

  function method_nes_konami_vrc4_device__write_h(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
    const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
    0;
    let addr_lines: any = ((((((offset) >>> ((members.m_vrc_ls_prg_a ?? 0))) & 1) << 1 | (((offset) >>> ((members.m_vrc_ls_prg_b ?? 0))) & 1) << 0)) & 0xff);
    switch ((((offset) & (28672)) as number)) {
      case 0:
      case 8192:
      {
        h_m_mmc_prg_bank[(((offset) >>> (13)) & 1)] = data;
        method_set_prg__0(runtime);
        break;
      }
      case 4096:
      {
        if ((((addr_lines) >>> (1)) & 1)) {
          members.m_wram_enable = ((((data) & (1))) & 0xff);
          members.m_prg_flip = ((((data) & (2))) & 0xff);
          method_set_prg__0(runtime);
        } else {
          method_set_mirror(runtime, data);
        }
        break;
      }
      case 12288:
      case 16384:
      case 20480:
      case 24576:
      {
        let bank: any = ((runtime.add(((2) * (runtime.subtract((((offset) >>> (12)) & ((1 << (3)) - 1)), 3))), (((addr_lines) >>> (1)) & 1))) | 0);
        let shift: any = (((((((addr_lines) >>> (0)) & 1)) * (4))) | 0);
        let mask: any = ((((shift) ? (496) : (15))) | 0);
        h_m_mmc_vrom_bank[bank] = ((((h_m_mmc_vrom_bank[bank]) & ((~mask)))) | (((((data) << (shift))) & (mask))));
        method_set_chr__0(runtime);
        break;
      }
      case 28672:
      {
        switch ((addr_lines as number)) {
          case 0:
          {
            members.m_irq_count_latch = (((((((members.m_irq_count_latch ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
            break;
          }
          case 1:
          {
            members.m_irq_count_latch = (((((((members.m_irq_count_latch ?? 0)) & (15))) | (((((data) & (15))) << (4))))) & 0xff);
            break;
          }
          case 2:
          {
            method_irq_ctrl_w(runtime, data);
            break;
          }
          case 3:
          {
            method_irq_ack_w(runtime);
            break;
          }
        }
        break;
      }
    }
  }

  function method_set_prg__0(runtime: any): any {
    const members = runtime.members;

    method_set_prg__2(runtime, 0, 31);
  }

  function method_set_prg__2(runtime: any, prg_base: any, prg_mask: any): any {
    const members = runtime.members;

    const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
    method_prg8_x(runtime, ((0) ^ ((members.m_prg_flip ?? 0))), ((prg_base) | (((h_m_mmc_prg_bank[0]) & (prg_mask)))));
    method_prg8_x(runtime, 1, ((prg_base) | (((h_m_mmc_prg_bank[1]) & (prg_mask)))));
    method_prg8_x(runtime, ((2) ^ ((members.m_prg_flip ?? 0))), ((prg_base) | (((prg_mask) & (-2)))));
    method_prg8_x(runtime, 3, ((prg_base) | (prg_mask)));
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

  function method_set_mirror(runtime: any, data: any): any {
    const members = runtime.members;

    switch ((((data) & (3)) as number)) {
      case 0:
      {
        method_set_nt_mirroring(runtime, 1);
        break;
      }
      case 1:
      {
        method_set_nt_mirroring(runtime, 2);
        break;
      }
      case 2:
      {
        method_set_nt_mirroring(runtime, 4);
        break;
      }
      case 3:
      {
        method_set_nt_mirroring(runtime, 3);
        break;
      }
    }
  }

  function method_set_nt_mirroring(runtime: any, mirroring: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch ((mirroring as number)) {
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
    switch ((source as number)) {
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

  function method_set_chr__0(runtime: any): any {
    const members = runtime.members;

    method_set_chr__2(runtime, 0, 511);
  }

  function method_set_chr__2(runtime: any, chr_base: any, chr_mask: any): any {
    const members = runtime.members;

    const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
    for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      method_chr1_x(runtime, i, ((chr_base) | (((h_m_mmc_vrom_bank[i]) & (chr_mask)))), (members.m_chr_source ?? 0));
    }
  }

  function method_chr1_x(runtime: any, start: any, bank: any, source: any): any {
    const members = runtime.members;

    method_bank_chr(runtime, 0, start, bank, source);
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

  function method_irq_ctrl_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_irq_mode = ((((data) & (4))) | 0);
    members.m_irq_enable = ((((data) & (2))) | 0);
    members.m_irq_enable_latch = ((((data) & (1))) | 0);
    if ((members.m_irq_enable ?? 0)) {
      members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xff);
      members.m_irq_prescale = ((341) | 0);
    }
    method_set_irq_line(runtime, 0);
  }

  function method_irq_ack_w(runtime: any): any {
    const members = runtime.members;

    members.m_irq_enable = (((members.m_irq_enable_latch ?? 0)) | 0);
    method_set_irq_line(runtime, 0);
  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "get_mirroring": method_get_mirroring,
    "set_mirroring": method_set_mirroring,
    "get_pcb_ctrl_mirror": method_get_pcb_ctrl_mirror,
    "set_pcb_ctrl_mirror": method_set_pcb_ctrl_mirror,
    "get_four_screen_vram": method_get_four_screen_vram,
    "set_four_screen_vram": method_set_four_screen_vram,
    "get_trainer": method_get_trainer,
    "set_trainer": method_set_trainer,
    "set_mmc1_type": method_set_mmc1_type,
    "set_n163_vol": method_set_n163_vol,
    "set_outer_prg_size": method_set_outer_prg_size,
    "set_outer_chr_size": method_set_outer_chr_size,
    "set_smd133_addr": method_set_smd133_addr,
    "set_x1_005_alt": method_set_x1_005_alt,
    "set_bus_conflict": method_set_bus_conflict,
    "get_open_bus": method_get_open_bus,
    "set_open_bus": method_set_open_bus,
    "get_prg_base": method_get_prg_base,
    "get_prgram_base": method_get_prgram_base,
    "get_vrom_base": method_get_vrom_base,
    "get_vram_base": method_get_vram_base,
    "get_ciram_base": method_get_ciram_base,
    "get_battery_base": method_get_battery_base,
    "get_mapper_sram_base": method_get_mapper_sram_base,
    "get_misc_rom_base": method_get_misc_rom_base,
    "get_prg_size": method_get_prg_size,
    "get_prgram_size": method_get_prgram_size,
    "get_vrom_size": method_get_vrom_size,
    "get_vram_size": method_get_vram_size,
    "get_battery_size": method_get_battery_size,
    "get_mapper_sram_size": method_get_mapper_sram_size,
    "get_misc_rom_size": method_get_misc_rom_size,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
    "scanline_irq": method_scanline_irq,
    "prgram_alloc": method_prgram_alloc,
    "battery_alloc": method_battery_alloc,
    "set_irq_line": method_set_irq_line,
    "chr_w": method_chr_w,
    "chr_r": method_chr_r,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "read_m": method_read_m,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
    "write_l": method_write_l,
    "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::get_mirroring": method_device_nes_cart_interface__get_mirroring,
    "device_nes_cart_interface::set_mirroring": method_device_nes_cart_interface__set_mirroring,
    "device_nes_cart_interface::get_pcb_ctrl_mirror": method_device_nes_cart_interface__get_pcb_ctrl_mirror,
    "device_nes_cart_interface::set_pcb_ctrl_mirror": method_device_nes_cart_interface__set_pcb_ctrl_mirror,
    "device_nes_cart_interface::get_four_screen_vram": method_device_nes_cart_interface__get_four_screen_vram,
    "device_nes_cart_interface::set_four_screen_vram": method_device_nes_cart_interface__set_four_screen_vram,
    "device_nes_cart_interface::get_trainer": method_device_nes_cart_interface__get_trainer,
    "device_nes_cart_interface::set_trainer": method_device_nes_cart_interface__set_trainer,
    "device_nes_cart_interface::set_mmc1_type": method_device_nes_cart_interface__set_mmc1_type,
    "device_nes_cart_interface::set_n163_vol": method_device_nes_cart_interface__set_n163_vol,
    "device_nes_cart_interface::set_outer_prg_size": method_device_nes_cart_interface__set_outer_prg_size,
    "device_nes_cart_interface::set_outer_chr_size": method_device_nes_cart_interface__set_outer_chr_size,
    "device_nes_cart_interface::set_smd133_addr": method_device_nes_cart_interface__set_smd133_addr,
    "device_nes_cart_interface::set_x1_005_alt": method_device_nes_cart_interface__set_x1_005_alt,
    "device_nes_cart_interface::set_bus_conflict": method_device_nes_cart_interface__set_bus_conflict,
    "device_nes_cart_interface::get_open_bus": method_device_nes_cart_interface__get_open_bus,
    "device_nes_cart_interface::set_open_bus": method_device_nes_cart_interface__set_open_bus,
    "device_nes_cart_interface::get_prg_base": method_device_nes_cart_interface__get_prg_base,
    "device_nes_cart_interface::get_prgram_base": method_device_nes_cart_interface__get_prgram_base,
    "device_nes_cart_interface::get_vrom_base": method_device_nes_cart_interface__get_vrom_base,
    "device_nes_cart_interface::get_vram_base": method_device_nes_cart_interface__get_vram_base,
    "device_nes_cart_interface::get_ciram_base": method_device_nes_cart_interface__get_ciram_base,
    "device_nes_cart_interface::get_battery_base": method_device_nes_cart_interface__get_battery_base,
    "device_nes_cart_interface::get_mapper_sram_base": method_device_nes_cart_interface__get_mapper_sram_base,
    "device_nes_cart_interface::get_misc_rom_base": method_device_nes_cart_interface__get_misc_rom_base,
    "device_nes_cart_interface::get_prg_size": method_device_nes_cart_interface__get_prg_size,
    "device_nes_cart_interface::get_prgram_size": method_device_nes_cart_interface__get_prgram_size,
    "device_nes_cart_interface::get_vrom_size": method_device_nes_cart_interface__get_vrom_size,
    "device_nes_cart_interface::get_vram_size": method_device_nes_cart_interface__get_vram_size,
    "device_nes_cart_interface::get_battery_size": method_device_nes_cart_interface__get_battery_size,
    "device_nes_cart_interface::get_mapper_sram_size": method_device_nes_cart_interface__get_mapper_sram_size,
    "device_nes_cart_interface::get_misc_rom_size": method_device_nes_cart_interface__get_misc_rom_size,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "irq_timer_tick": method_irq_timer_tick,
    "irq_tick": method_irq_tick,
    "nes_konami_vrc4_device::write_h": method_nes_konami_vrc4_device__write_h,
    "set_prg__0": method_set_prg__0,
    "set_prg__2": method_set_prg__2,
    "prg8_x": method_prg8_x,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
    "set_mirror": method_set_mirror,
    "set_nt_mirroring": method_set_nt_mirroring,
    "set_nt_page": method_set_nt_page,
    "set_chr__0": method_set_chr__0,
    "set_chr__2": method_set_chr__2,
    "chr1_x": method_chr1_x,
    "bank_chr": method_bank_chr,
    "irq_ctrl_w": method_irq_ctrl_w,
    "irq_ack_w": method_irq_ack_w
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["assert","fatalerror","m_maincpu.set_input_line"];
definition.children![0]!.definition.compiledMethods = (() => {


  function method_ymfm_set_busy_end(runtime: any, clocks: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_busy_end = runtime.add(((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0), (__l["attotime::from_ticks"] ? __l["attotime::from_ticks"](clocks, (__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", clocks, (__l["clock"] ? __l["clock"]() : runtime.macro("clock")))));
  }

  function method_ymfm_is_busy(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((Number(((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) < Number((members.m_busy_end ?? 0))) ? 1 : 0);
  }

  function method_ymfm_update_irq(runtime: any, asserted: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_update_irq"] ? __l["m_update_irq"](Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
  }

  function method_ymfm_interface__ymfm_sync_mode_write(runtime: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference(members.m_engine)).engine_mode_write?.(data) ?? 0);
  }

  function method_ymfm_interface__ymfm_is_busy(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_irq_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_update_irq)).bind === 'function' ? (runtime.dereference(members.m_update_irq)).bind() : typeof (runtime.dereference(members.m_update_irq)).bind === 'number' || typeof (runtime.dereference(members.m_update_irq)).bind === 'boolean' ? (runtime.dereference(members.m_update_irq)).bind : runtime.container(members.m_update_irq, "bind"));
  }

  function method_io_read_handler(runtime: any, index: any = 0): any {
    const members = runtime.members;

    return ((runtime.dereference(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))))).bind?.() ?? runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
  }

  function method_io_write_handler(runtime: any, index: any = 0): any {
    const members = runtime.members;

    return ((runtime.dereference(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))))).bind?.() ?? runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
  }

  function method_fm_mode_write(runtime: any, param: any): any {
    const members = runtime.members;

    ((runtime.dereference(members.m_engine)).engine_mode_write?.(param) ?? 0);
  }

  function method_fm_check_interrupts(runtime: any, param: any): any {
    const members = runtime.members;

    (typeof (runtime.dereference(members.m_engine)).engine_check_interrupts === 'function' ? (runtime.dereference(members.m_engine)).engine_check_interrupts() : typeof (runtime.dereference(members.m_engine)).engine_check_interrupts === 'number' || typeof (runtime.dereference(members.m_engine)).engine_check_interrupts === 'boolean' ? (runtime.dereference(members.m_engine)).engine_check_interrupts : runtime.container(members.m_engine, "engine_check_interrupts"));
  }

  function method_fm_timer_handler(runtime: any, param: any): any {
    const members = runtime.members;

    ((runtime.dereference(members.m_engine)).engine_timer_expired?.(param) ?? 0);
  }

  function method_ym_generic_device__irq_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_update_irq)).bind === 'function' ? (runtime.dereference(members.m_update_irq)).bind() : typeof (runtime.dereference(members.m_update_irq)).bind === 'number' || typeof (runtime.dereference(members.m_update_irq)).bind === 'boolean' ? (runtime.dereference(members.m_update_irq)).bind : runtime.container(members.m_update_irq, "bind"));
  }

  function method_ym_generic_device__io_read_handler(runtime: any, index: any = 0): any {
    const members = runtime.members;

    return ((runtime.dereference(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))))).bind?.() ?? runtime.container(runtime.readIndex((members.m_io_read ?? 0), ((index) & (1))), "bind"));
  }

  function method_ym_generic_device__io_write_handler(runtime: any, index: any = 0): any {
    const members = runtime.members;

    return ((runtime.dereference(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))))).bind?.() ?? runtime.container(runtime.readIndex((members.m_io_write ?? 0), ((index) & (1))), "bind"));
  }

  function method_ym_generic_device__ymfm_update_irq(runtime: any, asserted: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_update_irq"] ? __l["m_update_irq"](Number(((asserted) ? (1) : (0)))) : typeof members.m_update_irq === 'function' ? members.m_update_irq(((asserted) ? (1) : (0))) : runtime.invoke("m_update_irq", ((asserted) ? (1) : (0))));
  }

  function method_ym_generic_device__ymfm_set_busy_end(runtime: any, clocks: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_busy_end = runtime.add(((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0), (__l["attotime::from_ticks"] ? __l["attotime::from_ticks"](clocks, (__l["clock"] ? __l["clock"]() : runtime.macro("clock"))) : runtime.macro("attotime::from_ticks", clocks, (__l["clock"] ? __l["clock"]() : runtime.macro("clock")))));
  }

  function method_ym_generic_device__ymfm_is_busy(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((Number(((__l["machine().time"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().time"))?.() ?? 0)) < Number((members.m_busy_end ?? 0))) ? 1 : 0);
  }

  function method_ym_generic_device__fm_mode_write(runtime: any, param: any): any {
    const members = runtime.members;

    ((runtime.dereference(members.m_engine)).engine_mode_write?.(param) ?? 0);
  }

  function method_ym_generic_device__fm_timer_handler(runtime: any, param: any): any {
    const members = runtime.members;

    ((runtime.dereference(members.m_engine)).engine_timer_expired?.(param) ?? 0);
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((((runtime.dereference(method_update_streams(runtime))).read?.(offset) ?? 0)) & 0xff);
  }

  function method_update_streams(runtime: any): any {
    const members = runtime.members;

    const h_m_chip = members.m_chip ?? 0;
    (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
    return h_m_chip;
  }

  function method_status_r(runtime: any): any {
    const members = runtime.members;

    return ((((runtime.dereference(method_update_streams(runtime))).read_status?.() ?? runtime.container(method_update_streams(runtime), "read_status"))) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference(method_update_streams(runtime))).write?.(offset, data) ?? 0);
  }

  function method_sound_stream_update(runtime: any, stream: any): any {
    const members = runtime.members;

    method_update_internal(runtime, stream);
  }

  function method_update_internal(runtime: any, stream: any, output_shift: any = 0): any {
    const members = runtime.members;

    const h___local_update_internal_output = members.__local_update_internal_output ?? 0;
    let MAX_SAMPLES: any = ((256) | 0);
    let output: any = h___local_update_internal_output;
    let outcount: any = ((Math.min(+((typeof (runtime.dereference(stream)).output_count === 'function' ? (runtime.dereference(stream)).output_count() : typeof (runtime.dereference(stream)).output_count === 'number' || typeof (runtime.dereference(stream)).output_count === 'boolean' ? (runtime.dereference(stream)).output_count : runtime.container(stream, "output_count"))), +(((((runtime.readIndex(output, 0).data)?.length ?? 0)) >>> 0)))) | 0);
    let numsamples: any = (((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))) | 0);
    for (let sampindex: any = ((0) | 0); ((Number(sampindex) < Number(numsamples)) ? 1 : 0); sampindex = ((((sampindex) + (MAX_SAMPLES))) | 0)) {
      let cursamples: any = ((Math.min(+(((numsamples) - (sampindex))), +(MAX_SAMPLES))) | 0);
      (members.m_chip.generate?.(output, cursamples) ?? 0);
      for (let outnum: any = ((0) | 0); ((Number(outnum) < Number(outcount)) ? 1 : 0); outnum = ((((outnum) + (1))) | 0)) {
        let eff_outnum: any = ((((((outnum) + (output_shift))) % (2))) | 0);
        for (let index: any = ((0) | 0); ((Number(index) < Number(cursamples)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
          ((runtime.dereference(stream)).put_int?.(eff_outnum, ((sampindex) + (index)), runtime.readIndex(runtime.readIndex(output, index).data, outnum), 32768) ?? 0);
        }
      }
    }
  }

  function method_ymfm_device_base__read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((((runtime.dereference(method_update_streams(runtime))).read?.(offset) ?? 0)) & 0xff);
  }

  function method_ymfm_device_base__status_r(runtime: any): any {
    const members = runtime.members;

    return ((((runtime.dereference(method_update_streams(runtime))).read_status?.() ?? runtime.container(method_update_streams(runtime), "read_status"))) & 0xff);
  }

  function method_ymfm_device_base__write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference(method_update_streams(runtime))).write?.(offset, data) ?? 0);
  }

  function method_ymfm_device_base__update_internal(runtime: any, stream: any, output_shift: any = 0): any {
    const members = runtime.members;

    const h___local_ymfm_device_base_update_internal_output = members.__local_ymfm_device_base_update_internal_output ?? 0;
    let MAX_SAMPLES: any = ((256) | 0);
    let output: any = h___local_ymfm_device_base_update_internal_output;
    let outcount: any = ((Math.min(+((typeof (runtime.dereference(stream)).output_count === 'function' ? (runtime.dereference(stream)).output_count() : typeof (runtime.dereference(stream)).output_count === 'number' || typeof (runtime.dereference(stream)).output_count === 'boolean' ? (runtime.dereference(stream)).output_count : runtime.container(stream, "output_count"))), +(((((runtime.readIndex(output, 0).data)?.length ?? 0)) >>> 0)))) | 0);
    let numsamples: any = (((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))) | 0);
    for (let sampindex: any = ((0) | 0); ((Number(sampindex) < Number(numsamples)) ? 1 : 0); sampindex = ((((sampindex) + (MAX_SAMPLES))) | 0)) {
      let cursamples: any = ((Math.min(+(((numsamples) - (sampindex))), +(MAX_SAMPLES))) | 0);
      (members.m_chip.generate?.(output, cursamples) ?? 0);
      for (let outnum: any = ((0) | 0); ((Number(outnum) < Number(outcount)) ? 1 : 0); outnum = ((((outnum) + (1))) | 0)) {
        let eff_outnum: any = ((((((outnum) + (output_shift))) % (2))) | 0);
        for (let index: any = ((0) | 0); ((Number(index) < Number(cursamples)) ? 1 : 0); index = ((((index) + (1))) | 0)) {
          ((runtime.dereference(stream)).put_int?.(eff_outnum, ((sampindex) + (index)), runtime.readIndex(runtime.readIndex(output, index).data, outnum), 32768) ?? 0);
        }
      }
    }
  }
  return {
    "ymfm_set_busy_end": method_ymfm_set_busy_end,
    "ymfm_is_busy": method_ymfm_is_busy,
    "ymfm_update_irq": method_ymfm_update_irq,
    "ymfm_interface::ymfm_sync_mode_write": method_ymfm_interface__ymfm_sync_mode_write,
    "ymfm_interface::ymfm_is_busy": method_ymfm_interface__ymfm_is_busy,
    "irq_handler": method_irq_handler,
    "io_read_handler": method_io_read_handler,
    "io_write_handler": method_io_write_handler,
    "fm_mode_write": method_fm_mode_write,
    "fm_check_interrupts": method_fm_check_interrupts,
    "fm_timer_handler": method_fm_timer_handler,
    "ym_generic_device::irq_handler": method_ym_generic_device__irq_handler,
    "ym_generic_device::io_read_handler": method_ym_generic_device__io_read_handler,
    "ym_generic_device::io_write_handler": method_ym_generic_device__io_write_handler,
    "ym_generic_device::ymfm_update_irq": method_ym_generic_device__ymfm_update_irq,
    "ym_generic_device::ymfm_set_busy_end": method_ym_generic_device__ymfm_set_busy_end,
    "ym_generic_device::ymfm_is_busy": method_ym_generic_device__ymfm_is_busy,
    "ym_generic_device::fm_mode_write": method_ym_generic_device__fm_mode_write,
    "ym_generic_device::fm_timer_handler": method_ym_generic_device__fm_timer_handler,
    "read": method_read,
    "update_streams": method_update_streams,
    "status_r": method_status_r,
    "write": method_write,
    "sound_stream_update": method_sound_stream_update,
    "update_internal": method_update_internal,
    "ymfm_device_base::read": method_ymfm_device_base__read,
    "ymfm_device_base::status_r": method_ymfm_device_base__status_r,
    "ymfm_device_base::write": method_ymfm_device_base__write,
    "ymfm_device_base::update_internal": method_ymfm_device_base__update_internal
  };
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.compiledMethodLinks = ["attotime::from_ticks","clock","m_update_irq","machine","machine().time"];
definition.children![0]!.definition.allocations!["ds1001"]!.compiledMethods = (() => {


  function method_set_instrument_data(runtime: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference((members.m_fm.regs?.() ?? 0))).set_instrument_data?.(data) ?? 0);
  }

  function method_sample_rate(runtime: any, input_clock: any): any {
    const members = runtime.members;

    return (members.m_fm.sample_rate?.(input_clock) ?? 0);
  }

  function method_invalidate_caches(runtime: any): any {
    const members = runtime.members;

    (members.m_fm.invalidate_caches?.() ?? 0);
  }

  function method_read_status(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_reset(runtime: any): any {
    const members = runtime.members;

    (members.m_fm.reset?.() ?? 0);
  }

  function method_save_restore(runtime: any, state: any): any {
    const members = runtime.members;

    ((runtime.dereference(state)).save_restore?.((members.m_address ?? 0)) ?? 0);
    (members.m_fm.save_restore?.(state) ?? 0);
  }

  function method_write_address(runtime: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference((members.m_fm.intf?.() ?? 0))).ymfm_set_busy_end?.(12) ?? 0);
    members.m_address = ((data) & 0xff);
  }

  function method_write_data(runtime: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference((members.m_fm.intf?.() ?? 0))).ymfm_set_busy_end?.(84) ?? 0);
    (members.m_fm.write?.((members.m_address ?? 0), data) ?? 0);
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    switch ((((offset) & (1)) as number)) {
      case 0:
      {
        method_write_address(runtime, data);
        break;
      }
      case 1:
      {
        method_write_data(runtime, data);
        break;
      }
    }
  }

  function method_generate(runtime: any, output: any, numsamples: any = 1): any {
    const members = runtime.members;

    for (let samp: any = ((0) >>> 0); ((Number(samp) < Number(numsamples)) ? 1 : 0); samp = ((((samp) + (1))) >>> 0), output = runtime.add(output, 1)) {
      (members.m_fm.clock?.(511) ?? 0);
      (members.m_fm.output?.((typeof (runtime.dereference(output)).clear === 'function' ? (runtime.dereference(output)).clear() : typeof (runtime.dereference(output)).clear === 'number' || typeof (runtime.dereference(output)).clear === 'boolean' ? (runtime.dereference(output)).clear : runtime.container(output, "clear")), 5, 256, 511) ?? 0);
      runtime.dereference(output).data[0] = runtime.divide(((runtime.dereference(output).data[0]) * (128)), 9);
      runtime.dereference(output).data[1] = runtime.divide(((runtime.dereference(output).data[1]) * (128)), 9);
    }
  }

  function method_opll_base__set_instrument_data(runtime: any, data: any): any {
    const members = runtime.members;

    ((runtime.dereference((members.m_fm.regs?.() ?? 0))).set_instrument_data?.(data) ?? 0);
  }

  function method_opll_base__sample_rate(runtime: any, input_clock: any): any {
    const members = runtime.members;

    return (members.m_fm.sample_rate?.(input_clock) ?? 0);
  }

  function method_opll_base__invalidate_caches(runtime: any): any {
    const members = runtime.members;

    (members.m_fm.invalidate_caches?.() ?? 0);
  }

  function method_opll_base__read_status(runtime: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_opll_base__read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((0) & 0xff);
  }

  function method_opll_base____construct(runtime: any, intf: any, instrument_data: any): any {
    const members = runtime.members;

    members.m_address = ((0) & 0xff);
    members.m_fm = runtime.invoke("new::fm_engine_base__opll_registers", intf);
    ((runtime.dereference((members.m_fm.regs?.() ?? 0))).set_instrument_data?.(instrument_data) ?? 0);
  }

  function method___construct(runtime: any, intf: any, instrument_data: any): any {
    const members = runtime.members;

    const h_s_default_instruments = members.s_default_instruments ?? 0;
    method_opll_base____construct(runtime, intf, ((((instrument_data) ? 1 : 0)) ? (instrument_data) : (h_s_default_instruments)));
  }
  return {
    "set_instrument_data": method_set_instrument_data,
    "sample_rate": method_sample_rate,
    "invalidate_caches": method_invalidate_caches,
    "read_status": method_read_status,
    "read": method_read,
    "reset": method_reset,
    "save_restore": method_save_restore,
    "write_address": method_write_address,
    "write_data": method_write_data,
    "write": method_write,
    "generate": method_generate,
    "opll_base::set_instrument_data": method_opll_base__set_instrument_data,
    "opll_base::sample_rate": method_opll_base__sample_rate,
    "opll_base::invalidate_caches": method_opll_base__invalidate_caches,
    "opll_base::read_status": method_opll_base__read_status,
    "opll_base::read": method_opll_base__read,
    "opll_base::__construct": method_opll_base____construct,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.compiledMethods = (() => {


  function method_set_reset_status(runtime: any, set: any, reset: any): any {
    const members = runtime.members;

    members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (0)))))) & 0xff);
    (typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'function' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts() : typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'number' || typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'boolean' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts : runtime.container(members.m_intf, "ymfm_sync_check_interrupts"));
    return (((((members.m_status ?? 0)) & ((~(members.m_regs.status_mask?.() ?? 0))))) & 0xff);
  }

  function method_set_irq_mask(runtime: any, mask: any): any {
    const members = runtime.members;

    members.m_irq_mask = ((mask) & 0xff);
    (typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'function' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts() : typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'number' || typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'boolean' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts : runtime.container(members.m_intf, "ymfm_sync_check_interrupts"));
  }

  function method_clock_prescale(runtime: any): any {
    const members = runtime.members;

    return (members.m_clock_prescale ?? 0);
  }

  function method_set_clock_prescale(runtime: any, prescale: any): any {
    const members = runtime.members;

    members.m_clock_prescale = ((prescale) & 0xff);
  }

  function method_sample_rate(runtime: any, baseclock: any): any {
    const members = runtime.members;

    return runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (18)));
  }

  function method_intf(runtime: any): any {
    const members = runtime.members;

    return (members.m_intf ?? 0);
  }

  function method_regs(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return h_m_regs;
  }

  function method_invalidate_caches(runtime: any): any {
    const members = runtime.members;

    members.m_modified_channels = ((511) >>> 0);
  }

  function method_debug_channel(runtime: any, index: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return h_m_channel[index];
  }

  function method_debug_operator(runtime: any, index: any): any {
    const members = runtime.members;

    const h_m_operator = members.m_operator ?? 0;
    return h_m_operator[index];
  }

  function method_reset(runtime: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    const h_m_operator = members.m_operator ?? 0;
    method_set_reset_status(runtime, 0, 255);
    (members.m_regs.reset?.() ?? 0);
    method_write(runtime, 63, 0);
    for (let __range0: any = h_m_channel, __range0_index: any = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
      ((runtime.dereference(runtime.readIndex(__range0, __range0_index))).reset?.() ?? runtime.container(runtime.readIndex(__range0, __range0_index), "reset"));
    }
    for (let __range0: any = h_m_operator, __range0_index: any = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
      ((runtime.dereference(runtime.readIndex(__range0, __range0_index))).reset?.() ?? runtime.container(runtime.readIndex(__range0, __range0_index), "reset"));
    }
  }

  function method_write(runtime: any, regnum: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_channel = members.m_channel ?? 0;
    (__l["debug::log_fm_write"] ? __l["debug::log_fm_write"]("%03X = %02X\n", regnum, data) : runtime.macro("debug::log_fm_write", "%03X = %02X\n", regnum, data));
    if (((Number(regnum) === Number(63)) ? 1 : 0)) {
      ((runtime.dereference(members.m_intf)).ymfm_sync_mode_write?.(data) ?? 0);
      return;
    }
    members.m_modified_channels = ((511) >>> 0);
    let keyon_channel: any = ((0) >>> 0);
    let keyon_opmask: any = ((0) >>> 0);
    if ((members.m_regs.write?.(regnum, data, ({ generatedLValue: true, get: () => keyon_channel, set: (value: any) => { keyon_channel = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => keyon_opmask, set: (value: any) => { keyon_opmask = ((value) >>> 0); } })) ?? 0)) {
      if (((Number(keyon_channel) < Number(9)) ? 1 : 0)) {
        (h_m_channel[keyon_channel].keyonoff?.(keyon_opmask, 0, keyon_channel) ?? 0);
      } else {
        if ((((1) && (((Number(keyon_channel) === Number(255)) ? 1 : 0))) ? 1 : 0)) {
          (h_m_channel[6].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 4)) ? (3) : (0)), 1, 6) ?? 0);
          (h_m_channel[7].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 0)) | (((method_bitfield(runtime, keyon_opmask, 3)) << (1)))), 1, 7) ?? 0);
          (h_m_channel[8].keyonoff?.(((method_bitfield(runtime, keyon_opmask, 2)) | (((method_bitfield(runtime, keyon_opmask, 1)) << (1)))), 1, 8) ?? 0);
        }
      }
    }
  }

  function method_bitfield(runtime: any, value: any, start: any, length: any = 1): any {
    const members = runtime.members;

    return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
  }

  function method_save_restore(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_timer_running = members.m_timer_running ?? 0;
    const h_m_channel = members.m_channel ?? 0;
    const h_m_operator = members.m_operator ?? 0;
    ((runtime.dereference(state)).save_restore?.((members.m_env_counter ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_status ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_clock_prescale ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_irq_mask ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_irq_state ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.(h_m_timer_running[0]) ?? 0);
    ((runtime.dereference(state)).save_restore?.(h_m_timer_running[1]) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_total_clocks ?? 0)) ?? 0);
    (members.m_regs.save_restore?.(state) ?? 0);
    for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
      (h_m_channel[chnum].save_restore?.(state) ?? 0);
    }
    for (let opnum: any = ((0) >>> 0); ((Number(opnum) < Number(18)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
      (h_m_operator[opnum].save_restore?.(state) ?? 0);
    }
    method_invalidate_caches(runtime);
  }

  function method_clock(runtime: any, chanmask: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    members.m_total_clocks = ((((members.m_total_clocks) + (1))) & 0xff);
    if ((((((Number((members.m_modified_channels ?? 0)) !== Number(0)) ? 1 : 0)) || (((Number((() => { const previous = (members.m_prepare_count ?? 0); members.m_prepare_count = ((((members.m_prepare_count) + (1))) >>> 0); return previous; })()) >= Number(4096)) ? 1 : 0))) ? 1 : 0)) {
      if (0) {
        method_assign_operators(runtime);
      }
      members.m_active_channels = ((0) >>> 0);
      for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
        if (method_bitfield(runtime, chanmask, chnum)) {
          if ((h_m_channel[chnum].prepare?.() ?? 0)) {
            members.m_active_channels = ((((members.m_active_channels) | (((1) << (chnum))))) >>> 0);
          }
        }
      }
      members.m_modified_channels = (((members.m_prepare_count = ((0) >>> 0))) >>> 0);
    }
    if (1) {
      members.m_env_counter = ((((members.m_env_counter) + (4))) >>> 0);
    } else {
      if (((Number(method_bitfield(runtime, (members.m_env_counter = ((((members.m_env_counter) + (1))) >>> 0)), 0, 2)) === Number(1)) ? 1 : 0)) {
        members.m_env_counter = ((((members.m_env_counter) + (3))) >>> 0);
      }
    }
    let lfo_raw_pm: any = (((members.m_regs.clock_noise_and_lfo?.() ?? 0)) | 0);
    for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
      if (method_bitfield(runtime, chanmask, chnum)) {
        (h_m_channel[chnum].clock?.((members.m_env_counter ?? 0), lfo_raw_pm) ?? 0);
      }
    }
    return (members.m_env_counter ?? 0);
  }

  function method_assign_operators(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_operator = members.m_operator ?? 0;
    const h_m_channel = members.m_channel ?? 0;
    let map: any = (__l["STRUCT_OF"] ? __l["STRUCT_OF"]("operator_mapping") : runtime.macro("STRUCT_OF", "operator_mapping"));
    (members.m_regs.operator_map?.(({ generatedLValue: true, get: () => map, set: (value: any) => { map = value; } })) ?? 0);
    for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
      for (let index: any = ((0) >>> 0); ((Number(index) < Number(4)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
        let opnum: any = ((method_bitfield(runtime, runtime.readIndex(map.chan, chnum), ((8) * (index)), 8)) >>> 0);
        (h_m_channel[chnum].assign?.(index, ((((Number(opnum) === Number(255)) ? 1 : 0)) ? (0) : (h_m_operator[opnum]))) ?? 0);
      }
    }
  }

  function method_output(runtime: any, output: any, rshift: any, clipmax: any, chanmask: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_operator = members.m_operator ?? 0;
    const h_m_channel = members.m_channel ?? 0;
    chanmask = ((((chanmask) & (4294967295))) >>> 0);
    if (1) {
      chanmask = ((((chanmask) & ((members.m_active_channels ?? 0)))) >>> 0);
    }
    if ((members.m_regs.rhythm_enable?.() ?? 0)) {
      (__l["assert"] ? __l["assert"](((Number((members.m_regs.noise_enable?.() ?? 0)) === Number(0)) ? 1 : 0)) : runtime.macro("assert", ((Number((members.m_regs.noise_enable?.() ?? 0)) === Number(0)) ? 1 : 0)));
      let op13phase: any = (((h_m_operator[13].phase?.() ?? 0)) >>> 0);
      let op17phase: any = (((h_m_operator[17].phase?.() ?? 0)) >>> 0);
      let phase_select: any = ((((((((method_bitfield(runtime, op13phase, 2)) ^ (method_bitfield(runtime, op13phase, 7)))) | (method_bitfield(runtime, op13phase, 3)))) | (((method_bitfield(runtime, op17phase, 5)) ^ (method_bitfield(runtime, op17phase, 3)))))) >>> 0);
      for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
        if (method_bitfield(runtime, chanmask, chnum)) {
          if (((Number(chnum) === Number(6)) ? 1 : 0)) {
            (h_m_channel[chnum].output_rhythm_ch6?.(output, rshift, clipmax) ?? 0);
          } else {
            if (((Number(chnum) === Number(7)) ? 1 : 0)) {
              (h_m_channel[chnum].output_rhythm_ch7?.(phase_select, output, rshift, clipmax) ?? 0);
            } else {
              if (((Number(chnum) === Number(8)) ? 1 : 0)) {
                (h_m_channel[chnum].output_rhythm_ch8?.(phase_select, output, rshift, clipmax) ?? 0);
              } else {
                if ((h_m_channel[chnum].is4op?.() ?? 0)) {
                  (h_m_channel[chnum].output_4op?.(output, rshift, clipmax) ?? 0);
                } else {
                  (h_m_channel[chnum].output_2op?.(output, rshift, clipmax) ?? 0);
                }
              }
            }
          }
        }
      }
    } else {
      for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
        if (method_bitfield(runtime, chanmask, chnum)) {
          if ((h_m_channel[chnum].is4op?.() ?? 0)) {
            (h_m_channel[chnum].output_4op?.(output, rshift, clipmax) ?? 0);
          } else {
            (h_m_channel[chnum].output_2op?.(output, rshift, clipmax) ?? 0);
          }
        }
      }
    }
  }

  function method_status(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_status ?? 0)) & (-1))) & ((~(members.m_regs.status_mask?.() ?? 0))))) & 0xff);
  }

  function method_update_timer(runtime: any, tnum: any, enable: any, delta_clocks: any): any {
    const members = runtime.members;

    const h_m_timer_running = members.m_timer_running ?? 0;
    if ((((enable) && (((h_m_timer_running[tnum]) ? 0 : 1))) ? 1 : 0)) {
      let period: any = ((((((Number(tnum) === Number(0)) ? 1 : 0)) ? (runtime.subtract(1024, (members.m_regs.timer_a_value?.() ?? 0))) : (((16) * (runtime.subtract(256, (members.m_regs.timer_b_value?.() ?? 0))))))) >>> 0);
      period = ((((period) + (delta_clocks))) >>> 0);
      ((runtime.dereference(members.m_intf)).ymfm_set_timer?.(tnum, ((((period) * (18))) * ((members.m_clock_prescale ?? 0)))) ?? 0);
      h_m_timer_running[tnum] = 1;
    } else {
      if (((enable) ? 0 : 1)) {
        ((runtime.dereference(members.m_intf)).ymfm_set_timer?.(tnum, -1) ?? 0);
        h_m_timer_running[tnum] = 0;
      }
    }
  }

  function method_engine_timer_expired(runtime: any, tnum: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    const h_m_timer_running = members.m_timer_running ?? 0;
    0;
    if ((((((Number(tnum) === Number(0)) ? 1 : 0)) && ((members.m_regs.enable_timer_a?.() ?? 0))) ? 1 : 0)) {
      method_set_reset_status(runtime, 0, 0);
    } else {
      if ((((((Number(tnum) === Number(1)) ? 1 : 0)) && ((members.m_regs.enable_timer_b?.() ?? 0))) ? 1 : 0)) {
        method_set_reset_status(runtime, 0, 0);
      }
    }
    if ((((((Number(tnum) === Number(0)) ? 1 : 0)) && ((members.m_regs.csm?.() ?? 0))) ? 1 : 0)) {
      for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
        if (method_bitfield(runtime, 0, chnum)) {
          (h_m_channel[chnum].keyonoff?.(15, 2, chnum) ?? 0);
          members.m_modified_channels = ((((members.m_modified_channels) | (((1) << (chnum))))) >>> 0);
        }
      }
    }
    h_m_timer_running[tnum] = 0;
    method_update_timer(runtime, tnum, 1, 0);
  }

  function method_engine_check_interrupts(runtime: any): any {
    const members = runtime.members;

    let old_state: any = (((members.m_irq_state ?? 0)) & 0xff);
    members.m_irq_state = ((((Number((((((members.m_status ?? 0)) & ((members.m_irq_mask ?? 0)))) & ((~(members.m_regs.status_mask?.() ?? 0))))) !== Number(0)) ? 1 : 0)) & 0xff);
    if ((members.m_irq_state ?? 0)) {
      members.m_status = ((((members.m_status) | (0))) & 0xff);
    } else {
      members.m_status = ((((members.m_status) & (-1))) & 0xff);
    }
    if (((Number(old_state) !== Number((members.m_irq_state ?? 0))) ? 1 : 0)) {
      ((runtime.dereference(members.m_intf)).ymfm_update_irq?.((((members.m_irq_state ?? 0)) ? (1) : (0))) ?? 0);
    }
  }

  function method_engine_mode_write(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_modified_channels = ((511) >>> 0);
    let dummy1: any = ((0) >>> 0);
    let dummy2: any = ((0) >>> 0);
    (members.m_regs.write?.(63, data, ({ generatedLValue: true, get: () => dummy1, set: (value: any) => { dummy1 = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => dummy2, set: (value: any) => { dummy2 = ((value) >>> 0); } })) ?? 0);
    if ((members.m_regs.irq_reset?.() ?? 0)) {
      method_set_reset_status(runtime, 0, 120);
    } else {
      let reset_mask: any = ((0) & 0xff);
      if ((members.m_regs.reset_timer_b?.() ?? 0)) {
        reset_mask = ((((reset_mask) | (0))) & 0xff);
      }
      if ((members.m_regs.reset_timer_a?.() ?? 0)) {
        reset_mask = ((((reset_mask) | (0))) & 0xff);
      }
      method_set_reset_status(runtime, 0, reset_mask);
      method_update_timer(runtime, 1, (members.m_regs.load_timer_b?.() ?? 0), (-(((members.m_total_clocks ?? 0)) & (15))));
      method_update_timer(runtime, 0, (members.m_regs.load_timer_a?.() ?? 0), 0);
    }
  }

  function method_fm_engine_base__set_reset_status(runtime: any, set: any, reset: any): any {
    const members = runtime.members;

    members.m_status = (((((((members.m_status ?? 0)) | (set))) & ((~((reset) | (0)))))) & 0xff);
    (typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'function' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts() : typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'number' || typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'boolean' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts : runtime.container(members.m_intf, "ymfm_sync_check_interrupts"));
    return (((((members.m_status ?? 0)) & ((~(members.m_regs.status_mask?.() ?? 0))))) & 0xff);
  }

  function method_fm_engine_base__set_irq_mask(runtime: any, mask: any): any {
    const members = runtime.members;

    members.m_irq_mask = ((mask) & 0xff);
    (typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'function' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts() : typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'number' || typeof (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts === 'boolean' ? (runtime.dereference(members.m_intf)).ymfm_sync_check_interrupts : runtime.container(members.m_intf, "ymfm_sync_check_interrupts"));
  }

  function method_fm_engine_base__clock_prescale(runtime: any): any {
    const members = runtime.members;

    return (members.m_clock_prescale ?? 0);
  }

  function method_fm_engine_base__set_clock_prescale(runtime: any, prescale: any): any {
    const members = runtime.members;

    members.m_clock_prescale = ((prescale) & 0xff);
  }

  function method_fm_engine_base__sample_rate(runtime: any, baseclock: any): any {
    const members = runtime.members;

    return runtime.divide(baseclock, (((members.m_clock_prescale ?? 0)) * (18)));
  }

  function method_fm_engine_base__intf(runtime: any): any {
    const members = runtime.members;

    return (members.m_intf ?? 0);
  }

  function method_fm_engine_base__regs(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return h_m_regs;
  }

  function method_fm_engine_base__invalidate_caches(runtime: any): any {
    const members = runtime.members;

    members.m_modified_channels = ((511) >>> 0);
  }

  function method_fm_engine_base__debug_channel(runtime: any, index: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    return h_m_channel[index];
  }

  function method_fm_engine_base__debug_operator(runtime: any, index: any): any {
    const members = runtime.members;

    const h_m_operator = members.m_operator ?? 0;
    return h_m_operator[index];
  }

  function method_opll_registers__channel_offset(runtime: any, chnum: any): any {
    const members = runtime.members;

    0;
    return chnum;
  }

  function method_opll_registers__operator_offset(runtime: any, opnum: any): any {
    const members = runtime.members;

    0;
    return opnum;
  }

  function method___construct(runtime: any, intf: any): any {
    const members = runtime.members;

    const h_m_timer_running = members.m_timer_running ?? 0;
    const h_m_channel = members.m_channel ?? 0;
    const h_m_operator = members.m_operator ?? 0;
    members.m_intf = intf;
    members.m_env_counter = ((0) >>> 0);
    members.m_status = ((0) & 0xff);
    members.m_clock_prescale = ((4) & 0xff);
    members.m_irq_mask = ((0) & 0xff);
    members.m_irq_state = ((0) & 0xff);
    h_m_timer_running[0] = 0;
    h_m_timer_running[1] = 0;
    members.m_total_clocks = ((0) & 0xff);
    members.m_active_channels = ((511) >>> 0);
    members.m_modified_channels = ((511) >>> 0);
    members.m_prepare_count = ((0) >>> 0);
    (members.m_intf ?? 0).m_engine = (members.this ?? 0);
    for (let chnum: any = ((0) >>> 0); ((Number(chnum) < Number(9)) ? 1 : 0); chnum = ((((chnum) + (1))) >>> 0)) {
      h_m_channel[chnum] = runtime.invoke("new::fm_channel__opll_registers", runtime.dereference((members.this ?? 0)), method_opll_registers__channel_offset(runtime, chnum));
    }
    for (let opnum: any = ((0) >>> 0); ((Number(opnum) < Number(18)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
      h_m_operator[opnum] = runtime.invoke("new::fm_operator__opll_registers", runtime.dereference((members.this ?? 0)), method_opll_registers__operator_offset(runtime, opnum));
    }
    method_assign_operators(runtime);
  }
  return {
    "set_reset_status": method_set_reset_status,
    "set_irq_mask": method_set_irq_mask,
    "clock_prescale": method_clock_prescale,
    "set_clock_prescale": method_set_clock_prescale,
    "sample_rate": method_sample_rate,
    "intf": method_intf,
    "regs": method_regs,
    "invalidate_caches": method_invalidate_caches,
    "debug_channel": method_debug_channel,
    "debug_operator": method_debug_operator,
    "reset": method_reset,
    "write": method_write,
    "bitfield": method_bitfield,
    "save_restore": method_save_restore,
    "clock": method_clock,
    "assign_operators": method_assign_operators,
    "output": method_output,
    "status": method_status,
    "update_timer": method_update_timer,
    "engine_timer_expired": method_engine_timer_expired,
    "engine_check_interrupts": method_engine_check_interrupts,
    "engine_mode_write": method_engine_mode_write,
    "fm_engine_base::set_reset_status": method_fm_engine_base__set_reset_status,
    "fm_engine_base::set_irq_mask": method_fm_engine_base__set_irq_mask,
    "fm_engine_base::clock_prescale": method_fm_engine_base__clock_prescale,
    "fm_engine_base::set_clock_prescale": method_fm_engine_base__set_clock_prescale,
    "fm_engine_base::sample_rate": method_fm_engine_base__sample_rate,
    "fm_engine_base::intf": method_fm_engine_base__intf,
    "fm_engine_base::regs": method_fm_engine_base__regs,
    "fm_engine_base::invalidate_caches": method_fm_engine_base__invalidate_caches,
    "fm_engine_base::debug_channel": method_fm_engine_base__debug_channel,
    "fm_engine_base::debug_operator": method_fm_engine_base__debug_operator,
    "opll_registers::channel_offset": method_opll_registers__channel_offset,
    "opll_registers::operator_offset": method_opll_registers__operator_offset,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.compiledMethodLinks = ["STRUCT_OF","assert","debug::log_fm_write"];
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.allocations!["opll_registers"]!.compiledMethods = (() => {


  function method_status_mask(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_irq_reset(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_noise_enable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_rhythm_enable(runtime: any): any {
    const members = runtime.members;

    return method_byte(runtime, 14, 5, 1);
  }

  function method_byte(runtime: any, offset: any, start: any, count: any, extra_offset: any = 0): any {
    const members = runtime.members;

    return method_bitfield(runtime, (members.m_regdata ?? 0)[((offset) + (extra_offset))], start, count);
  }

  function method_bitfield(runtime: any, value: any, start: any, length: any = 1): any {
    const members = runtime.members;

    return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
  }

  function method_op_ssg_eg_enable(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_op_ssg_eg_mode(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_operator_list(runtime: any, o1: any = 255, o2: any = 255, o3: any = 255, o4: any = 255): any {
    const members = runtime.members;

    return ((((((o1) | (((o2) << (8))))) | (((o3) << (16))))) | (((o4) << (24))));
  }

  function method_effective_rate(runtime: any, rawrate: any, ksr: any): any {
    const members = runtime.members;

    return ((((Number(rawrate) === Number(0)) ? 1 : 0)) ? (0) : (Math.min(+(((rawrate) + (ksr))), +(63))));
  }

  function method_fm_registers_base__status_mask(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_fm_registers_base__irq_reset(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_fm_registers_base__noise_enable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_fm_registers_base__rhythm_enable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_fm_registers_base__op_ssg_eg_enable(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_fm_registers_base__op_ssg_eg_mode(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_fm_registers_base__operator_list(runtime: any, o1: any = 255, o2: any = 255, o3: any = 255, o4: any = 255): any {
    const members = runtime.members;

    return ((((((o1) | (((o2) << (8))))) | (((o3) << (16))))) | (((o4) << (24))));
  }

  function method_fm_registers_base__effective_rate(runtime: any, rawrate: any, ksr: any): any {
    const members = runtime.members;

    return ((((Number(rawrate) === Number(0)) ? 1 : 0)) ? (0) : (Math.min(+(((rawrate) + (ksr))), +(63))));
  }

  function method_channel_offset(runtime: any, chnum: any): any {
    const members = runtime.members;

    0;
    return chnum;
  }

  function method_operator_offset(runtime: any, opnum: any): any {
    const members = runtime.members;

    0;
    return opnum;
  }

  function method_read(runtime: any, index: any): any {
    const members = runtime.members;

    return (((members.m_regdata ?? 0)[index]) & 0xff);
  }

  function method_reset_lfo(runtime: any): any {
    const members = runtime.members;

    members.m_lfo_am_counter = (((members.m_lfo_pm_counter = ((0) & 0xffff))) & 0xffff);
  }

  function method_lfo_am_offset(runtime: any, choffs: any): any {
    const members = runtime.members;

    return (members.m_lfo_am ?? 0);
  }

  function method_noise_state(runtime: any): any {
    const members = runtime.members;

    return (((members.m_noise_lfsr ?? 0)) >>> (23));
  }

  function method_set_instrument_data(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["std::copy_n"] ? __l["std::copy_n"](data, 144, runtime.addressOf((members.m_instdata ?? 0), 0)) : runtime.macro("std::copy_n", data, 144, runtime.addressOf((members.m_instdata ?? 0), 0)));
  }

  function method_rhythm_keyon(runtime: any): any {
    const members = runtime.members;

    return method_byte(runtime, 14, 4, 0);
  }

  function method_test(runtime: any): any {
    const members = runtime.members;

    return method_byte(runtime, 15, 0, 8);
  }

  function method_waveform_enable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_timer_a_value(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_timer_b_value(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_reset_timer_b(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_reset_timer_a(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_enable_timer_b(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_enable_timer_a(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_load_timer_b(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_load_timer_a(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_csm(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_ch_block_freq(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_word(runtime, 32, 0, 4, 16, 0, 8, choffs);
  }

  function method_word(runtime: any, offset1: any, start1: any, count1: any, offset2: any, start2: any, count2: any, extra_offset: any = 0): any {
    const members = runtime.members;

    return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
  }

  function method_ch_sustain(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_byte(runtime, 32, 5, 1, choffs);
  }

  function method_ch_total_level(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_instchbyte(runtime, 2, 0, 6, choffs);
  }

  function method_instchbyte(runtime: any, offset: any, start: any, count: any, choffs: any): any {
    const members = runtime.members;

    const h_m_chinst = members.m_chinst ?? 0;
    return method_bitfield(runtime, runtime.readIndex(h_m_chinst[choffs], offset), start, count);
  }

  function method_ch_feedback(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_instchbyte(runtime, 3, 0, 3, choffs);
  }

  function method_ch_algorithm(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_ch_instrument(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_byte(runtime, 48, 4, 4, choffs);
  }

  function method_ch_output_any(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_ch_output_0(runtime: any, choffs: any): any {
    const members = runtime.members;

    return ((method_is_rhythm(runtime, choffs)) ? 0 : 1);
  }

  function method_is_rhythm(runtime: any, choffs: any): any {
    const members = runtime.members;

    return (((method_rhythm_enable(runtime)) && (((Number(choffs) >= Number(6)) ? 1 : 0))) ? 1 : 0);
  }

  function method_ch_output_1(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_is_rhythm(runtime, choffs);
  }

  function method_ch_output_2(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_ch_output_3(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_op_lfo_am_enable(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 7, 1, opoffs);
  }

  function method_instopbyte(runtime: any, offset: any, start: any, count: any, opoffs: any): any {
    const members = runtime.members;

    const h_m_opinst = members.m_opinst ?? 0;
    return method_bitfield(runtime, runtime.readIndex(h_m_opinst[opoffs], offset), start, count);
  }

  function method_op_lfo_pm_enable(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 6, 1, opoffs);
  }

  function method_op_eg_sustain(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 5, 1, opoffs);
  }

  function method_op_ksr(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 4, 1, opoffs);
  }

  function method_op_multiple(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 0, 4, opoffs);
  }

  function method_op_ksl(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 2, 6, 2, opoffs);
  }

  function method_op_waveform(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instchbyte(runtime, 3, runtime.add(3, method_bitfield(runtime, opoffs, 0)), 1, ((opoffs) >>> (1)));
  }

  function method_op_attack_rate(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 4, 4, 4, opoffs);
  }

  function method_op_decay_rate(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 4, 0, 4, opoffs);
  }

  function method_op_sustain_level(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 6, 4, 4, opoffs);
  }

  function method_op_release_rate(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 6, 0, 4, opoffs);
  }

  function method_op_volume(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_byte(runtime, 48, ((4) * (method_bitfield(runtime, (~opoffs), 0))), 4, ((opoffs) >>> (1)));
  }

  function method_reset(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["std::fill_n"] ? __l["std::fill_n"](runtime.addressOf((members.m_regdata ?? 0), 0), 64, 0) : runtime.macro("std::fill_n", runtime.addressOf((members.m_regdata ?? 0), 0), 64, 0));
  }

  function method_save_restore(runtime: any, state: any): any {
    const members = runtime.members;

    ((runtime.dereference(state)).save_restore?.((members.m_lfo_am_counter ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_lfo_pm_counter ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_lfo_am ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_noise_lfsr ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_regdata ?? 0)) ?? 0);
  }

  function method_operator_map(runtime: any, dest: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h___static_operator_map_s_fixed_map = members.__static_operator_map_s_fixed_map ?? 0;
    if ((((members.__static_operator_map_s_fixed_map__initialised ?? 0)) ? 0 : 1)) {
      runtime.copyStruct(members.__static_operator_map_s_fixed_map, (__l["STRUCT"] ? __l["STRUCT"]("chan", [method_operator_list(runtime, 0, 1), method_operator_list(runtime, 2, 3), method_operator_list(runtime, 4, 5), method_operator_list(runtime, 6, 7), method_operator_list(runtime, 8, 9), method_operator_list(runtime, 10, 11), method_operator_list(runtime, 12, 13), method_operator_list(runtime, 14, 15), method_operator_list(runtime, 16, 17)]) : runtime.macro("STRUCT", "chan", [method_operator_list(runtime, 0, 1), method_operator_list(runtime, 2, 3), method_operator_list(runtime, 4, 5), method_operator_list(runtime, 6, 7), method_operator_list(runtime, 8, 9), method_operator_list(runtime, 10, 11), method_operator_list(runtime, 12, 13), method_operator_list(runtime, 14, 15), method_operator_list(runtime, 16, 17)])));
      members.__static_operator_map_s_fixed_map__initialised = 1;
    }
    let s_fixed_map: any = h___static_operator_map_s_fixed_map;
    dest = s_fixed_map;
    return dest;
  }

  function method_write(runtime: any, index: any, data: any, channel: any, opmask: any): any {
    const members = runtime.members;

    if (((Number(index) >= Number(64)) ? 1 : 0)) {
      return 0;
    }
    (members.m_regdata ?? 0)[index] = data;
    if (((Number(index) === Number(14)) ? 1 : 0)) {
      channel.set(((255) >>> 0));
      opmask.set(((((method_bitfield(runtime, data, 5)) ? (method_bitfield(runtime, data, 0, 5)) : (0))) >>> 0));
      return 1;
    }
    if (((Number(((index) & (240))) === Number(32)) ? 1 : 0)) {
      channel.set(((((index) & (15))) >>> 0));
      if (((Number(channel.get()) < Number(9)) ? 1 : 0)) {
        opmask.set(((((method_bitfield(runtime, data, 4)) ? (3) : (0))) >>> 0));
        return 1;
      }
    }
    return 0;
  }

  function method_clock_noise_and_lfo(runtime: any): any {
    const members = runtime.members;

    return method_opl_clock_noise_and_lfo(runtime, ({ generatedLValue: true, get: () => (members.m_noise_lfsr ?? 0), set: (value: any) => { members.m_noise_lfsr = ((value) >>> 0); } }), ({ generatedLValue: true, get: () => (members.m_lfo_am_counter ?? 0), set: (value: any) => { members.m_lfo_am_counter = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => (members.m_lfo_pm_counter ?? 0), set: (value: any) => { members.m_lfo_pm_counter = ((value) & 0xffff); } }), ({ generatedLValue: true, get: () => (members.m_lfo_am ?? 0), set: (value: any) => { members.m_lfo_am = ((value) & 0xff); } }), 1, 1);
  }

  function method_opl_clock_noise_and_lfo(runtime: any, noise_lfsr: any, lfo_am_counter: any, lfo_pm_counter: any, lfo_am: any, am_depth: any, pm_depth: any): any {
    const members = runtime.members;

    noise_lfsr.set(((((noise_lfsr.get()) << (1))) >>> 0));
    noise_lfsr.set(((((noise_lfsr.get()) | (((((((method_bitfield(runtime, noise_lfsr.get(), 23)) ^ (method_bitfield(runtime, noise_lfsr.get(), 9)))) ^ (method_bitfield(runtime, noise_lfsr.get(), 8)))) ^ (method_bitfield(runtime, noise_lfsr.get(), 1)))))) >>> 0));
    let am_counter: any = (((() => { const previous = lfo_am_counter.get(); lfo_am_counter.set(((((lfo_am_counter.get()) + (1))) & 0xffff)); return previous; })()) >>> 0);
    if (((Number(am_counter) >= Number(13439)) ? 1 : 0)) {
      lfo_am_counter.set(((0) & 0xffff));
    }
    let shift: any = ((((9) - (((2) * (am_depth))))) | 0);
    lfo_am.set(((runtime.shiftRight(((((Number(am_counter) < Number(6720)) ? 1 : 0)) ? (am_counter) : (((13503) - (am_counter)))), shift)) & 0xff));
    let pm_counter: any = (((() => { const previous = lfo_pm_counter.get(); lfo_pm_counter.set(((((lfo_pm_counter.get()) + (1))) & 0xffff)); return previous; })()) >>> 0);
    if ((((members.__static_opl_clock_noise_and_lfo_pm_scale__initialised ?? 0)) ? 0 : 1)) {
      members.__static_opl_clock_noise_and_lfo_pm_scale = [8, 4, 0, -4, -8, -4, 0, 4];
      members.__static_opl_clock_noise_and_lfo_pm_scale__initialised = 1;
    }
    let pm_scale: any = (members.__static_opl_clock_noise_and_lfo_pm_scale ?? 0);
    return runtime.shiftRight(runtime.readIndex(pm_scale, method_bitfield(runtime, pm_counter, 10, 3)), ((pm_depth) ^ (1)));
  }

  function method_cache_operator_data(runtime: any, choffs: any, opoffs: any, cache: any): any {
    const members = runtime.members;

    const h_m_chinst = members.m_chinst ?? 0;
    const h_m_opinst = members.m_opinst ?? 0;
    let instrument: any = ((method_ch_instrument(runtime, choffs)) >>> 0);
    if ((((method_rhythm_enable(runtime)) && (((Number(choffs) >= Number(6)) ? 1 : 0))) ? 1 : 0)) {
      h_m_chinst[choffs] = runtime.addressOf((members.m_instdata ?? 0), ((8) * (runtime.add(15, ((choffs) - (6))))));
    } else {
      h_m_chinst[choffs] = ((((Number(instrument) === Number(0)) ? 1 : 0)) ? (runtime.addressOf((members.m_regdata ?? 0), 0)) : (runtime.addressOf((members.m_instdata ?? 0), ((8) * (((instrument) - (1)))))));
    }
    h_m_opinst[opoffs] = runtime.add(h_m_chinst[choffs], method_bitfield(runtime, opoffs, 0));
    cache.waveform = runtime.addressOf((members.m_waveform ?? 0)[((method_op_waveform(runtime, opoffs)) % (2))], 0);
    let block_freq: any = (((cache.block_freq = ((method_ch_block_freq(runtime, choffs)) >>> 0))) >>> 0);
    let keycode: any = ((method_bitfield(runtime, block_freq, 8, 4)) >>> 0);
    cache.detune = ((0) | 0);
    let multiple: any = ((method_op_multiple(runtime, opoffs)) >>> 0);
    cache.multiple = ((((((((multiple) & (14))) | (method_bitfield(runtime, 49834, multiple)))) * (2))) >>> 0);
    if (((Number(cache.multiple) === Number(0)) ? 1 : 0)) {
      cache.multiple = ((1) >>> 0);
    }
    if (((Number(method_op_lfo_pm_enable(runtime, opoffs)) === Number(0)) ? 1 : 0)) {
      cache.phase_step = ((method_compute_phase_step(runtime, choffs, opoffs, cache, 0)) >>> 0);
    } else {
      cache.phase_step = ((1) >>> 0);
    }
    if ((((((Number(method_bitfield(runtime, opoffs, 0)) === Number(1)) ? 1 : 0)) || ((((method_rhythm_enable(runtime)) && (((Number(choffs) >= Number(7)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
      cache.total_level = ((((method_op_volume(runtime, opoffs)) * (4))) >>> 0);
    } else {
      cache.total_level = ((method_ch_total_level(runtime, choffs)) >>> 0);
    }
    cache.total_level = ((((cache.total_level) << (3))) >>> 0);
    let ksl: any = ((method_op_ksl(runtime, opoffs)) >>> 0);
    if (((Number(ksl) !== Number(0)) ? 1 : 0)) {
      cache.total_level = ((((cache.total_level) + (((method_opl_key_scale_atten(runtime, method_bitfield(runtime, block_freq, 9, 3), method_bitfield(runtime, block_freq, 5, 4))) << (ksl))))) >>> 0);
    }
    cache.eg_sustain = ((method_op_sustain_level(runtime, opoffs)) >>> 0);
    cache.eg_sustain = ((((cache.eg_sustain) | (((((cache.eg_sustain) + (1))) & (16))))) >>> 0);
    cache.eg_sustain = ((((cache.eg_sustain) << (5))) >>> 0);
    let DP: any = ((48) & 0xff);
    let RR: any = ((28) & 0xff);
    let RS: any = ((20) & 0xff);
    let ksrval: any = ((((keycode) >>> (((2) * (((method_op_ksr(runtime, opoffs)) ^ (1))))))) >>> 0);
    cache.eg_rate[0] = DP;
    cache.eg_rate[1] = method_effective_rate(runtime, ((method_op_attack_rate(runtime, opoffs)) * (4)), ksrval);
    cache.eg_rate[2] = method_effective_rate(runtime, ((method_op_decay_rate(runtime, opoffs)) * (4)), ksrval);
    if (method_op_eg_sustain(runtime, opoffs)) {
      cache.eg_rate[3] = 0;
      cache.eg_rate[4] = ((method_ch_sustain(runtime, choffs)) ? (RS) : (method_effective_rate(runtime, ((method_op_release_rate(runtime, opoffs)) * (4)), ksrval)));
    } else {
      cache.eg_rate[3] = method_effective_rate(runtime, ((method_op_release_rate(runtime, opoffs)) * (4)), ksrval);
      cache.eg_rate[4] = ((method_ch_sustain(runtime, choffs)) ? (RS) : (RR));
    }
  }

  function method_compute_phase_step(runtime: any, choffs: any, opoffs: any, cache: any, lfo_raw_pm: any): any {
    const members = runtime.members;

    return method_opl_compute_phase_step(runtime, ((cache.block_freq) << (1)), cache.multiple, ((method_op_lfo_pm_enable(runtime, opoffs)) ? (lfo_raw_pm) : (0)));
  }

  function method_opl_compute_phase_step(runtime: any, block_freq: any, multiple: any, lfo_raw_pm: any): any {
    const members = runtime.members;

    let fnum: any = ((((method_bitfield(runtime, block_freq, 0, 10)) << (2))) >>> 0);
    fnum = ((((fnum) + (runtime.shiftRight(((lfo_raw_pm) * (method_bitfield(runtime, block_freq, 7, 3))), 1)))) >>> 0);
    fnum = ((((fnum) & (4095))) >>> 0);
    let block: any = ((method_bitfield(runtime, block_freq, 10, 3)) >>> 0);
    let phase_step: any = ((runtime.shiftRight(((fnum) << (block)), 2)) >>> 0);
    return runtime.shiftRight(((phase_step) * (multiple)), 1);
  }

  function method_opl_key_scale_atten(runtime: any, block: any, fnum_4msb: any): any {
    const members = runtime.members;

    if ((((members.__static_opl_key_scale_atten_fnum_to_atten__initialised ?? 0)) ? 0 : 1)) {
      members.__static_opl_key_scale_atten_fnum_to_atten = [0, 24, 32, 37, 40, 43, 45, 47, 48, 50, 51, 52, 53, 54, 55, 56];
      members.__static_opl_key_scale_atten_fnum_to_atten__initialised = 1;
    }
    let fnum_to_atten: any = (members.__static_opl_key_scale_atten_fnum_to_atten ?? 0);
    let result: any = ((((runtime.readIndex(fnum_to_atten, fnum_4msb)) - (((8) * (((block) ^ (7))))))) | 0);
    return Math.max(+(0), +(result));
  }

  function method_log_keyon(runtime: any, choffs: any, opoffs: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let chnum: any = ((choffs) >>> 0);
    let opnum: any = ((opoffs) >>> 0);
    let buffer: any = new Uint8Array(Math.max(0, Number(256)));
    let end: any = ((0) | 0);
    end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%u.%02u freq=%04X inst=%X fb=%u mul=%X", chnum, opnum, method_ch_block_freq(runtime, choffs), method_ch_instrument(runtime, choffs), method_ch_feedback(runtime, choffs), method_op_multiple(runtime, opoffs)) : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), "%u.%02u freq=%04X inst=%X fb=%u mul=%X", chnum, opnum, method_ch_block_freq(runtime, choffs), method_ch_instrument(runtime, choffs), method_ch_feedback(runtime, choffs), method_op_multiple(runtime, opoffs)))))) | 0);
    if ((((((Number(method_bitfield(runtime, opoffs, 0)) === Number(1)) ? 1 : 0)) || ((((method_is_rhythm(runtime, choffs)) && (((Number(choffs) >= Number(6)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
      end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " vol=%X", method_op_volume(runtime, opoffs)) : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " vol=%X", method_op_volume(runtime, opoffs)))))) | 0);
    } else {
      end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " tl=%02X", method_ch_total_level(runtime, choffs)) : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " tl=%02X", method_ch_total_level(runtime, choffs)))))) | 0);
    }
    end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " ksr=%u ksl=%u adr=%X/%X/%X sl=%X sus=%u/%u", method_op_ksr(runtime, opoffs), method_op_ksl(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs), method_op_eg_sustain(runtime, opoffs), method_ch_sustain(runtime, choffs)) : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " ksr=%u ksl=%u adr=%X/%X/%X sl=%X sus=%u/%u", method_op_ksr(runtime, opoffs), method_op_ksl(runtime, opoffs), method_op_attack_rate(runtime, opoffs), method_op_decay_rate(runtime, opoffs), method_op_release_rate(runtime, opoffs), method_op_sustain_level(runtime, opoffs), method_op_eg_sustain(runtime, opoffs), method_ch_sustain(runtime, choffs)))))) | 0);
    if (method_op_lfo_am_enable(runtime, opoffs)) {
      end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=1") : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " am=1"))))) | 0);
    }
    if (method_op_lfo_pm_enable(runtime, opoffs)) {
      end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=1") : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " pm=1"))))) | 0);
    }
    if (((Number(method_op_waveform(runtime, opoffs)) !== Number(0)) ? 1 : 0)) {
      end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " wf=1") : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " wf=1"))))) | 0);
    }
    if (method_is_rhythm(runtime, choffs)) {
      end = ((((end) + ((__l["snprintf"] ? __l["snprintf"](runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " rhy=1") : runtime.macro("snprintf", runtime.addressOf(buffer, end), ((((buffer)?.byteLength ?? 1)) - (end)), " rhy=1"))))) | 0);
    }
    return buffer;
  }

  function method_opll_registers__channel_offset(runtime: any, chnum: any): any {
    const members = runtime.members;

    0;
    return chnum;
  }

  function method_opll_registers__operator_offset(runtime: any, opnum: any): any {
    const members = runtime.members;

    0;
    return opnum;
  }

  function method_opll_registers__read(runtime: any, index: any): any {
    const members = runtime.members;

    return (((members.m_regdata ?? 0)[index]) & 0xff);
  }

  function method_opll_registers__reset_lfo(runtime: any): any {
    const members = runtime.members;

    members.m_lfo_am_counter = (((members.m_lfo_pm_counter = ((0) & 0xffff))) & 0xffff);
  }

  function method_opll_registers__lfo_am_offset(runtime: any, choffs: any): any {
    const members = runtime.members;

    return (members.m_lfo_am ?? 0);
  }

  function method_opll_registers__noise_state(runtime: any): any {
    const members = runtime.members;

    return (((members.m_noise_lfsr ?? 0)) >>> (23));
  }

  function method_opll_registers__set_instrument_data(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["std::copy_n"] ? __l["std::copy_n"](data, 144, runtime.addressOf((members.m_instdata ?? 0), 0)) : runtime.macro("std::copy_n", data, 144, runtime.addressOf((members.m_instdata ?? 0), 0)));
  }

  function method_opll_registers__rhythm_enable(runtime: any): any {
    const members = runtime.members;

    return method_byte(runtime, 14, 5, 1);
  }

  function method_opll_registers__rhythm_keyon(runtime: any): any {
    const members = runtime.members;

    return method_byte(runtime, 14, 4, 0);
  }

  function method_opll_registers__test(runtime: any): any {
    const members = runtime.members;

    return method_byte(runtime, 15, 0, 8);
  }

  function method_opll_registers__waveform_enable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_opll_registers__timer_a_value(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__timer_b_value(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__status_mask(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__irq_reset(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__reset_timer_b(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__reset_timer_a(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__enable_timer_b(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__enable_timer_a(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__load_timer_b(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__load_timer_a(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__csm(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__ch_block_freq(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_word(runtime, 32, 0, 4, 16, 0, 8, choffs);
  }

  function method_opll_registers__ch_sustain(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_byte(runtime, 32, 5, 1, choffs);
  }

  function method_opll_registers__ch_total_level(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_instchbyte(runtime, 2, 0, 6, choffs);
  }

  function method_opll_registers__ch_feedback(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_instchbyte(runtime, 3, 0, 3, choffs);
  }

  function method_opll_registers__ch_algorithm(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__ch_instrument(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_byte(runtime, 48, 4, 4, choffs);
  }

  function method_opll_registers__ch_output_any(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_opll_registers__ch_output_0(runtime: any, choffs: any): any {
    const members = runtime.members;

    return ((method_is_rhythm(runtime, choffs)) ? 0 : 1);
  }

  function method_opll_registers__ch_output_1(runtime: any, choffs: any): any {
    const members = runtime.members;

    return method_is_rhythm(runtime, choffs);
  }

  function method_opll_registers__ch_output_2(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__ch_output_3(runtime: any, choffs: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_opll_registers__op_lfo_am_enable(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 7, 1, opoffs);
  }

  function method_opll_registers__op_lfo_pm_enable(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 6, 1, opoffs);
  }

  function method_opll_registers__op_eg_sustain(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 5, 1, opoffs);
  }

  function method_opll_registers__op_ksr(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 4, 1, opoffs);
  }

  function method_opll_registers__op_multiple(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 0, 0, 4, opoffs);
  }

  function method_opll_registers__op_ksl(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 2, 6, 2, opoffs);
  }

  function method_opll_registers__op_waveform(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instchbyte(runtime, 3, runtime.add(3, method_bitfield(runtime, opoffs, 0)), 1, ((opoffs) >>> (1)));
  }

  function method_opll_registers__op_attack_rate(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 4, 4, 4, opoffs);
  }

  function method_opll_registers__op_decay_rate(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 4, 0, 4, opoffs);
  }

  function method_opll_registers__op_sustain_level(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 6, 4, 4, opoffs);
  }

  function method_opll_registers__op_release_rate(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_instopbyte(runtime, 6, 0, 4, opoffs);
  }

  function method_opll_registers__op_volume(runtime: any, opoffs: any): any {
    const members = runtime.members;

    return method_byte(runtime, 48, ((4) * (method_bitfield(runtime, (~opoffs), 0))), 4, ((opoffs) >>> (1)));
  }

  function method_opll_registers__byte(runtime: any, offset: any, start: any, count: any, extra_offset: any = 0): any {
    const members = runtime.members;

    return method_bitfield(runtime, (members.m_regdata ?? 0)[((offset) + (extra_offset))], start, count);
  }

  function method_opll_registers__word(runtime: any, offset1: any, start1: any, count1: any, offset2: any, start2: any, count2: any, extra_offset: any = 0): any {
    const members = runtime.members;

    return ((((method_byte(runtime, offset1, start1, count1, extra_offset)) << (count2))) | (method_byte(runtime, offset2, start2, count2, extra_offset)));
  }

  function method_opll_registers__instchbyte(runtime: any, offset: any, start: any, count: any, choffs: any): any {
    const members = runtime.members;

    const h_m_chinst = members.m_chinst ?? 0;
    return method_bitfield(runtime, runtime.readIndex(h_m_chinst[choffs], offset), start, count);
  }

  function method_opll_registers__instopbyte(runtime: any, offset: any, start: any, count: any, opoffs: any): any {
    const members = runtime.members;

    const h_m_opinst = members.m_opinst ?? 0;
    return method_bitfield(runtime, runtime.readIndex(h_m_opinst[opoffs], offset), start, count);
  }

  function method_opll_registers__is_rhythm(runtime: any, choffs: any): any {
    const members = runtime.members;

    return (((method_rhythm_enable(runtime)) && (((Number(choffs) >= Number(6)) ? 1 : 0))) ? 1 : 0);
  }

  function method_abs_sin_attenuation(runtime: any, input: any): any {
    const members = runtime.members;

    if ((((members.__static_abs_sin_attenuation_s_sin_table__initialised ?? 0)) ? 0 : 1)) {
      members.__static_abs_sin_attenuation_s_sin_table = [2137, 1731, 1543, 1419, 1326, 1252, 1190, 1137, 1091, 1050, 1013, 979, 949, 920, 894, 869, 846, 825, 804, 785, 767, 749, 732, 717, 701, 687, 672, 659, 646, 633, 621, 609, 598, 587, 576, 566, 556, 546, 536, 527, 518, 509, 501, 492, 484, 476, 468, 461, 453, 446, 439, 432, 425, 418, 411, 405, 399, 392, 386, 380, 375, 369, 363, 358, 352, 347, 341, 336, 331, 326, 321, 316, 311, 307, 302, 297, 293, 289, 284, 280, 276, 271, 267, 263, 259, 255, 251, 248, 244, 240, 236, 233, 229, 226, 222, 219, 215, 212, 209, 205, 202, 199, 196, 193, 190, 187, 184, 181, 178, 175, 172, 169, 167, 164, 161, 159, 156, 153, 151, 148, 146, 143, 141, 138, 136, 134, 131, 129, 127, 125, 122, 120, 118, 116, 114, 112, 110, 108, 106, 104, 102, 100, 98, 96, 94, 92, 91, 89, 87, 85, 83, 82, 80, 78, 77, 75, 74, 72, 70, 69, 67, 66, 64, 63, 62, 60, 59, 57, 56, 55, 53, 52, 51, 49, 48, 47, 46, 45, 43, 42, 41, 40, 39, 38, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 23, 22, 21, 20, 20, 19, 18, 17, 17, 16, 15, 15, 14, 13, 13, 12, 12, 11, 10, 10, 9, 9, 8, 8, 7, 7, 7, 6, 6, 5, 5, 5, 4, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
      members.__static_abs_sin_attenuation_s_sin_table__initialised = 1;
    }
    let s_sin_table: any = (members.__static_abs_sin_attenuation_s_sin_table ?? 0);
    if (method_bitfield(runtime, input, 8)) {
      input = (((~input)) >>> 0);
    }
    return runtime.readIndex(s_sin_table, ((input) & (255)));
  }

  function method___construct(runtime: any): any {
    const members = runtime.members;

    const h_m_chinst = members.m_chinst ?? 0;
    const h_m_opinst = members.m_opinst ?? 0;
    members.m_lfo_am_counter = ((0) & 0xffff);
    members.m_lfo_pm_counter = ((0) & 0xffff);
    members.m_noise_lfsr = ((1) >>> 0);
    members.m_lfo_am = ((0) & 0xff);
    for (let index: any = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
      runtime.writeIndex((members.m_waveform ?? 0)[0], index, ((method_abs_sin_attenuation(runtime, index)) | (((method_bitfield(runtime, index, 9)) << (15)))));
    }
    let zeroval: any = ((runtime.readIndex((members.m_waveform ?? 0)[0], 0)) & 0xffff);
    for (let index: any = ((0) >>> 0); ((Number(index) < Number(1024)) ? 1 : 0); index = ((((index) + (1))) >>> 0)) {
      runtime.writeIndex((members.m_waveform ?? 0)[1], index, ((method_bitfield(runtime, index, 9)) ? (zeroval) : (runtime.readIndex((members.m_waveform ?? 0)[0], index))));
    }
    for (let choffs: any = ((0) >>> 0); ((Number(choffs) < Number(9)) ? 1 : 0); choffs = ((((choffs) + (1))) >>> 0)) {
      h_m_chinst[choffs] = runtime.addressOf((members.m_regdata ?? 0), 0);
    }
    for (let opoffs: any = ((0) >>> 0); ((Number(opoffs) < Number(18)) ? 1 : 0); opoffs = ((((opoffs) + (1))) >>> 0)) {
      h_m_opinst[opoffs] = runtime.addressOf((members.m_regdata ?? 0), method_bitfield(runtime, opoffs, 0));
    }
  }
  return {
    "status_mask": method_status_mask,
    "irq_reset": method_irq_reset,
    "noise_enable": method_noise_enable,
    "rhythm_enable": method_rhythm_enable,
    "byte": method_byte,
    "bitfield": method_bitfield,
    "op_ssg_eg_enable": method_op_ssg_eg_enable,
    "op_ssg_eg_mode": method_op_ssg_eg_mode,
    "operator_list": method_operator_list,
    "effective_rate": method_effective_rate,
    "fm_registers_base::status_mask": method_fm_registers_base__status_mask,
    "fm_registers_base::irq_reset": method_fm_registers_base__irq_reset,
    "fm_registers_base::noise_enable": method_fm_registers_base__noise_enable,
    "fm_registers_base::rhythm_enable": method_fm_registers_base__rhythm_enable,
    "fm_registers_base::op_ssg_eg_enable": method_fm_registers_base__op_ssg_eg_enable,
    "fm_registers_base::op_ssg_eg_mode": method_fm_registers_base__op_ssg_eg_mode,
    "fm_registers_base::operator_list": method_fm_registers_base__operator_list,
    "fm_registers_base::effective_rate": method_fm_registers_base__effective_rate,
    "channel_offset": method_channel_offset,
    "operator_offset": method_operator_offset,
    "read": method_read,
    "reset_lfo": method_reset_lfo,
    "lfo_am_offset": method_lfo_am_offset,
    "noise_state": method_noise_state,
    "set_instrument_data": method_set_instrument_data,
    "rhythm_keyon": method_rhythm_keyon,
    "test": method_test,
    "waveform_enable": method_waveform_enable,
    "timer_a_value": method_timer_a_value,
    "timer_b_value": method_timer_b_value,
    "reset_timer_b": method_reset_timer_b,
    "reset_timer_a": method_reset_timer_a,
    "enable_timer_b": method_enable_timer_b,
    "enable_timer_a": method_enable_timer_a,
    "load_timer_b": method_load_timer_b,
    "load_timer_a": method_load_timer_a,
    "csm": method_csm,
    "ch_block_freq": method_ch_block_freq,
    "word": method_word,
    "ch_sustain": method_ch_sustain,
    "ch_total_level": method_ch_total_level,
    "instchbyte": method_instchbyte,
    "ch_feedback": method_ch_feedback,
    "ch_algorithm": method_ch_algorithm,
    "ch_instrument": method_ch_instrument,
    "ch_output_any": method_ch_output_any,
    "ch_output_0": method_ch_output_0,
    "is_rhythm": method_is_rhythm,
    "ch_output_1": method_ch_output_1,
    "ch_output_2": method_ch_output_2,
    "ch_output_3": method_ch_output_3,
    "op_lfo_am_enable": method_op_lfo_am_enable,
    "instopbyte": method_instopbyte,
    "op_lfo_pm_enable": method_op_lfo_pm_enable,
    "op_eg_sustain": method_op_eg_sustain,
    "op_ksr": method_op_ksr,
    "op_multiple": method_op_multiple,
    "op_ksl": method_op_ksl,
    "op_waveform": method_op_waveform,
    "op_attack_rate": method_op_attack_rate,
    "op_decay_rate": method_op_decay_rate,
    "op_sustain_level": method_op_sustain_level,
    "op_release_rate": method_op_release_rate,
    "op_volume": method_op_volume,
    "reset": method_reset,
    "save_restore": method_save_restore,
    "clock_noise_and_lfo": method_clock_noise_and_lfo,
    "cache_operator_data": method_cache_operator_data,
    "compute_phase_step": method_compute_phase_step,
    "opl_compute_phase_step": method_opl_compute_phase_step,
    "opl_key_scale_atten": method_opl_key_scale_atten,
    "log_keyon": method_log_keyon,
    "opll_registers::channel_offset": method_opll_registers__channel_offset,
    "opll_registers::operator_offset": method_opll_registers__operator_offset,
    "opll_registers::read": method_opll_registers__read,
    "opll_registers::reset_lfo": method_opll_registers__reset_lfo,
    "opll_registers::lfo_am_offset": method_opll_registers__lfo_am_offset,
    "opll_registers::noise_state": method_opll_registers__noise_state,
    "opll_registers::set_instrument_data": method_opll_registers__set_instrument_data,
    "opll_registers::rhythm_enable": method_opll_registers__rhythm_enable,
    "opll_registers::rhythm_keyon": method_opll_registers__rhythm_keyon,
    "opll_registers::test": method_opll_registers__test,
    "opll_registers::waveform_enable": method_opll_registers__waveform_enable,
    "opll_registers::timer_a_value": method_opll_registers__timer_a_value,
    "opll_registers::timer_b_value": method_opll_registers__timer_b_value,
    "opll_registers::status_mask": method_opll_registers__status_mask,
    "opll_registers::irq_reset": method_opll_registers__irq_reset,
    "opll_registers::reset_timer_b": method_opll_registers__reset_timer_b,
    "opll_registers::reset_timer_a": method_opll_registers__reset_timer_a,
    "opll_registers::enable_timer_b": method_opll_registers__enable_timer_b,
    "opll_registers::enable_timer_a": method_opll_registers__enable_timer_a,
    "opll_registers::load_timer_b": method_opll_registers__load_timer_b,
    "opll_registers::load_timer_a": method_opll_registers__load_timer_a,
    "opll_registers::csm": method_opll_registers__csm,
    "opll_registers::ch_block_freq": method_opll_registers__ch_block_freq,
    "opll_registers::ch_sustain": method_opll_registers__ch_sustain,
    "opll_registers::ch_total_level": method_opll_registers__ch_total_level,
    "opll_registers::ch_feedback": method_opll_registers__ch_feedback,
    "opll_registers::ch_algorithm": method_opll_registers__ch_algorithm,
    "opll_registers::ch_instrument": method_opll_registers__ch_instrument,
    "opll_registers::ch_output_any": method_opll_registers__ch_output_any,
    "opll_registers::ch_output_0": method_opll_registers__ch_output_0,
    "opll_registers::ch_output_1": method_opll_registers__ch_output_1,
    "opll_registers::ch_output_2": method_opll_registers__ch_output_2,
    "opll_registers::ch_output_3": method_opll_registers__ch_output_3,
    "opll_registers::op_lfo_am_enable": method_opll_registers__op_lfo_am_enable,
    "opll_registers::op_lfo_pm_enable": method_opll_registers__op_lfo_pm_enable,
    "opll_registers::op_eg_sustain": method_opll_registers__op_eg_sustain,
    "opll_registers::op_ksr": method_opll_registers__op_ksr,
    "opll_registers::op_multiple": method_opll_registers__op_multiple,
    "opll_registers::op_ksl": method_opll_registers__op_ksl,
    "opll_registers::op_waveform": method_opll_registers__op_waveform,
    "opll_registers::op_attack_rate": method_opll_registers__op_attack_rate,
    "opll_registers::op_decay_rate": method_opll_registers__op_decay_rate,
    "opll_registers::op_sustain_level": method_opll_registers__op_sustain_level,
    "opll_registers::op_release_rate": method_opll_registers__op_release_rate,
    "opll_registers::op_volume": method_opll_registers__op_volume,
    "opll_registers::byte": method_opll_registers__byte,
    "opll_registers::word": method_opll_registers__word,
    "opll_registers::instchbyte": method_opll_registers__instchbyte,
    "opll_registers::instopbyte": method_opll_registers__instopbyte,
    "opll_registers::is_rhythm": method_opll_registers__is_rhythm,
    "abs_sin_attenuation": method_abs_sin_attenuation,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.allocations!["opll_registers"]!.compiledMethodLinks = ["STRUCT","snprintf","std::copy_n","std::fill_n"];
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.allocations!["fm_channel__opll_registers"]!.compiledMethods = (() => {


  function method_choffs(runtime: any): any {
    const members = runtime.members;

    return (members.m_choffs ?? 0);
  }

  function method_assign(runtime: any, index: any, op: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_op = members.m_op ?? 0;
    (__l["assert"] ? __l["assert"](((Number(index) < Number((members.m_op).length)) ? 1 : 0)) : runtime.macro("assert", ((Number(index) < Number((members.m_op).length)) ? 1 : 0)));
    h_m_op[index] = op;
    if (((op) ? 1 : 0)) {
      ((runtime.dereference(op)).set_choffs?.((members.m_choffs ?? 0)) ?? 0);
    }
  }

  function method_is4op(runtime: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    if (0) {
      return ((Number(h_m_op[2]) !== Number(0)) ? 1 : 0);
    }
    return ((Number(runtime.divide(18, 9)) === Number(4)) ? 1 : 0);
  }

  function method_regs(runtime: any): any {
    const members = runtime.members;

    return (members.m_regs ?? 0);
  }

  function method_debug_operator(runtime: any, index: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    return h_m_op[index];
  }

  function method_add_to_output(runtime: any, choffs: any, output: any, value: any): any {
    const members = runtime.members;

    let out0_index: any = ((0) | 0);
    let out1_index: any = ((((1) % (2))) | 0);
    let out2_index: any = ((((2) % (2))) | 0);
    let out3_index: any = ((((3) % (2))) | 0);
    if ((((0) || ((members.m_regs.ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out0_index] = ((output.data[out0_index]) + (value));
    }
    if ((((1) && ((members.m_regs.ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out1_index] = ((output.data[out1_index]) + (value));
    }
    if ((((0) && ((members.m_regs.ch_output_2?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out2_index] = ((output.data[out2_index]) + (value));
    }
    if ((((0) && ((members.m_regs.ch_output_3?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out3_index] = ((output.data[out3_index]) + (value));
    }
  }

  function method_reset(runtime: any): any {
    const members = runtime.members;

    const h_m_feedback = members.m_feedback ?? 0;
    h_m_feedback[0] = (h_m_feedback[1] = 0);
    members.m_feedback_in = ((0) << 16 >> 16);
  }

  function method_save_restore(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_feedback = members.m_feedback ?? 0;
    ((runtime.dereference(state)).save_restore?.(h_m_feedback[0]) ?? 0);
    ((runtime.dereference(state)).save_restore?.(h_m_feedback[1]) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_feedback_in ?? 0)) ?? 0);
  }

  function method_keyonoff(runtime: any, states: any, type: any, chnum: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_op = members.m_op ?? 0;
    for (let opnum: any = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
      if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
        (h_m_op[opnum].keyonoff?.(method_bitfield(runtime, states, opnum), type) ?? 0);
      }
    }
    if ((((0) && (((Number(((runtime.shiftRight(4294967295, chnum)) & (1))) !== Number(0)) ? 1 : 0))) ? 1 : 0)) {
      for (let opnum: any = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
        if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
          (__l["debug::log_keyon"] ? __l["debug::log_keyon"]("%c%s\n", ((method_bitfield(runtime, states, opnum)) ? (43) : (45)), ((runtime.dereference((members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0))).c_str?.() ?? runtime.container((members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0), "c_str"))) : runtime.macro("debug::log_keyon", "%c%s\n", ((method_bitfield(runtime, states, opnum)) ? (43) : (45)), ((runtime.dereference((members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0))).c_str?.() ?? runtime.container((members.m_regs.log_keyon?.((members.m_choffs ?? 0), (h_m_op[opnum].opoffs?.() ?? 0)) ?? 0), "c_str"))));
        }
      }
    }
  }

  function method_bitfield(runtime: any, value: any, start: any, length: any = 1): any {
    const members = runtime.members;

    return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
  }

  function method_prepare(runtime: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    let active_mask: any = ((0) >>> 0);
    for (let opnum: any = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
      if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
        if ((h_m_op[opnum].prepare?.() ?? 0)) {
          active_mask = ((((active_mask) | (((1) << (opnum))))) >>> 0);
        }
      }
    }
    return ((Number(active_mask) !== Number(0)) ? 1 : 0);
  }

  function method_clock(runtime: any, env_counter: any, lfo_raw_pm: any): any {
    const members = runtime.members;

    const h_m_feedback = members.m_feedback ?? 0;
    const h_m_op = members.m_op ?? 0;
    h_m_feedback[0] = h_m_feedback[1];
    h_m_feedback[1] = (members.m_feedback_in ?? 0);
    for (let opnum: any = ((0) >>> 0); ((Number(opnum) < Number((members.m_op).length)) ? 1 : 0); opnum = ((((opnum) + (1))) >>> 0)) {
      if (((Number(h_m_op[opnum]) !== Number(0)) ? 1 : 0)) {
        (h_m_op[opnum].clock?.(env_counter, lfo_raw_pm) ?? 0);
      }
    }
  }

  function method_output_2op(runtime: any, output: any, rshift: any, clipmax: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    const h_m_feedback = members.m_feedback ?? 0;
    0;
    0;
    let am_offset: any = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    let opmod: any = ((0) | 0);
    let feedback: any = (((members.m_regs.ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    if (((Number(feedback) !== Number(0)) ? 1 : 0)) {
      opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
    }
    let op1value: any = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
    if (((Number((members.m_regs.ch_output_any?.((members.m_choffs ?? 0)) ?? 0)) === Number(0)) ? 1 : 0)) {
      return;
    }
    let result: any = ((0) | 0);
    if (((Number(method_bitfield(runtime, (members.m_regs.ch_algorithm?.((members.m_choffs ?? 0)) ?? 0), 0)) === Number(0)) ? 1 : 0)) {
      opmod = ((runtime.shiftRight(((1) ? (h_m_feedback[1]) : (op1value)), 1)) | 0);
      result = ((runtime.shiftRight((h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0), rshift)) | 0);
    } else {
      result = ((runtime.shiftRight(((1) ? (h_m_feedback[1]) : (op1value)), rshift)) | 0);
      result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.((h_m_op[1].phase?.() ?? 0), am_offset) ?? 0), rshift)))) | 0);
      let clipmin: any = (((((-clipmax)) - (1))) | 0);
      result = ((method_clamp(runtime, result, clipmin, clipmax)) | 0);
    }
    method_add_to_output(runtime, (members.m_choffs ?? 0), output, result);
  }

  function method_clamp(runtime: any, value: any, minval: any, maxval: any): any {
    const members = runtime.members;

    if (((Number(value) < Number(minval)) ? 1 : 0)) {
      return minval;
    }
    if (((Number(value) > Number(maxval)) ? 1 : 0)) {
      return maxval;
    }
    return value;
  }

  function method_output_4op(runtime: any, output: any, rshift: any, clipmax: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    const h_m_feedback = members.m_feedback ?? 0;
    0;
    0;
    0;
    0;
    let am_offset: any = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    let opmod: any = ((0) | 0);
    let feedback: any = (((members.m_regs.ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    if (((Number(feedback) !== Number(0)) ? 1 : 0)) {
      opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
    }
    let op1value: any = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
    if (((Number((members.m_regs.ch_output_any?.((members.m_choffs ?? 0)) ?? 0)) === Number(0)) ? 1 : 0)) {
      return;
    }
    if ((((members.__static_output_4op_s_algorithm_ops__initialised ?? 0)) ? 0 : 1)) {
      members.__static_output_4op_s_algorithm_ops = [53, 58, 100, 113, 305, 787, 769, 896, 53, 180, 305, 644];
      members.__static_output_4op_s_algorithm_ops__initialised = 1;
    }
    let s_algorithm_ops: any = (members.__static_output_4op_s_algorithm_ops ?? 0);
    let algorithm_ops: any = ((runtime.readIndex(s_algorithm_ops, (members.m_regs.ch_algorithm?.((members.m_choffs ?? 0)) ?? 0))) >>> 0);
    let opout: any = new Int16Array(new Uint8Array(Math.max(0, Number(8))));
    runtime.writeIndex(opout, 0, 0);
    runtime.writeIndex(opout, 1, op1value);
    opmod = ((runtime.shiftRight(runtime.readIndex(opout, method_bitfield(runtime, algorithm_ops, 0, 1)), 1)) | 0);
    runtime.writeIndex(opout, 2, (h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0));
    runtime.writeIndex(opout, 5, runtime.add(runtime.readIndex(opout, 1), runtime.readIndex(opout, 2)));
    opmod = ((runtime.shiftRight(runtime.readIndex(opout, method_bitfield(runtime, algorithm_ops, 1, 3)), 1)) | 0);
    runtime.writeIndex(opout, 3, (h_m_op[2].compute_volume?.((((h_m_op[2].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0));
    runtime.writeIndex(opout, 6, runtime.add(runtime.readIndex(opout, 1), runtime.readIndex(opout, 3)));
    runtime.writeIndex(opout, 7, runtime.add(runtime.readIndex(opout, 2), runtime.readIndex(opout, 3)));
    let result: any = ((0) | 0);
    if (((((members.m_regs.noise_enable?.() ?? 0)) && (((Number((members.m_choffs ?? 0)) === Number(7)) ? 1 : 0))) ? 1 : 0)) {
      result = (((h_m_op[3].compute_noise_volume?.(am_offset) ?? 0)) | 0);
    } else {
      opmod = ((runtime.shiftRight(runtime.readIndex(opout, method_bitfield(runtime, algorithm_ops, 4, 3)), 1)) | 0);
      result = (((h_m_op[3].compute_volume?.((((h_m_op[3].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) | 0);
    }
    result = ((runtime.shiftRight(result, rshift)) | 0);
    let clipmin: any = (((((-clipmax)) - (1))) | 0);
    if (((Number(method_bitfield(runtime, algorithm_ops, 7)) !== Number(0)) ? 1 : 0)) {
      result = ((method_clamp(runtime, ((result) + (runtime.shiftRight(runtime.readIndex(opout, 1), rshift))), clipmin, clipmax)) | 0);
    }
    if (((Number(method_bitfield(runtime, algorithm_ops, 8)) !== Number(0)) ? 1 : 0)) {
      result = ((method_clamp(runtime, ((result) + (runtime.shiftRight(runtime.readIndex(opout, 2), rshift))), clipmin, clipmax)) | 0);
    }
    if (((Number(method_bitfield(runtime, algorithm_ops, 9)) !== Number(0)) ? 1 : 0)) {
      result = ((method_clamp(runtime, ((result) + (runtime.shiftRight(runtime.readIndex(opout, 3), rshift))), clipmin, clipmax)) | 0);
    }
    method_add_to_output(runtime, (members.m_choffs ?? 0), output, result);
  }

  function method_output_rhythm_ch6(runtime: any, output: any, rshift: any, clipmax: any): any {
    const members = runtime.members;

    const h_m_feedback = members.m_feedback ?? 0;
    const h_m_op = members.m_op ?? 0;
    let am_offset: any = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    let opmod: any = ((0) | 0);
    let feedback: any = (((members.m_regs.ch_feedback?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    if (((Number(feedback) !== Number(0)) ? 1 : 0)) {
      opmod = ((runtime.shiftRight(((h_m_feedback[0]) + (h_m_feedback[1])), ((10) - (feedback)))) | 0);
    }
    let opout1: any = (((members.m_feedback_in = (((h_m_op[0].compute_volume?.((((h_m_op[0].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0)) << 16 >> 16))) | 0);
    opmod = ((((method_bitfield(runtime, (members.m_regs.ch_algorithm?.((members.m_choffs ?? 0)) ?? 0), 0)) ? (0) : (runtime.shiftRight(opout1, 1)))) | 0);
    let result: any = ((runtime.shiftRight((h_m_op[1].compute_volume?.((((h_m_op[1].phase?.() ?? 0)) + (opmod)), am_offset) ?? 0), rshift)) | 0);
    method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
  }

  function method_output_rhythm_ch7(runtime: any, phase_select: any, output: any, rshift: any, clipmax: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    let am_offset: any = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    let noise_state: any = ((method_bitfield(runtime, (members.m_regs.noise_state?.() ?? 0), 0)) >>> 0);
    let phase: any = ((((((phase_select) << (9))) | (runtime.shiftRight(208, ((2) * (((noise_state) ^ (phase_select)))))))) >>> 0);
    let result: any = ((runtime.shiftRight((h_m_op[0].compute_volume?.(phase, am_offset) ?? 0), rshift)) | 0);
    let op13phase: any = (((h_m_op[0].phase?.() ?? 0)) >>> 0);
    phase = ((((((256) << (method_bitfield(runtime, op13phase, 8)))) ^ (((noise_state) << (8))))) >>> 0);
    result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.(phase, am_offset) ?? 0), rshift)))) | 0);
    result = ((method_clamp(runtime, result, (((-clipmax)) - (1)), clipmax)) | 0);
    method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
  }

  function method_output_rhythm_ch8(runtime: any, phase_select: any, output: any, rshift: any, clipmax: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    let am_offset: any = (((members.m_regs.lfo_am_offset?.((members.m_choffs ?? 0)) ?? 0)) >>> 0);
    let result: any = ((runtime.shiftRight((h_m_op[0].compute_volume?.((h_m_op[0].phase?.() ?? 0), am_offset) ?? 0), rshift)) | 0);
    let phase: any = ((((256) | (((phase_select) << (9))))) >>> 0);
    result = ((((result) + (runtime.shiftRight((h_m_op[1].compute_volume?.(phase, am_offset) ?? 0), rshift)))) | 0);
    result = ((method_clamp(runtime, result, (((-clipmax)) - (1)), clipmax)) | 0);
    method_add_to_output(runtime, (members.m_choffs ?? 0), output, ((result) * (2)));
  }

  function method_fm_channel__choffs(runtime: any): any {
    const members = runtime.members;

    return (members.m_choffs ?? 0);
  }

  function method_fm_channel__assign(runtime: any, index: any, op: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_op = members.m_op ?? 0;
    (__l["assert"] ? __l["assert"](((Number(index) < Number((members.m_op).length)) ? 1 : 0)) : runtime.macro("assert", ((Number(index) < Number((members.m_op).length)) ? 1 : 0)));
    h_m_op[index] = op;
    if (((op) ? 1 : 0)) {
      ((runtime.dereference(op)).set_choffs?.((members.m_choffs ?? 0)) ?? 0);
    }
  }

  function method_fm_channel__is4op(runtime: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    if (0) {
      return ((Number(h_m_op[2]) !== Number(0)) ? 1 : 0);
    }
    return ((Number(runtime.divide(18, 9)) === Number(4)) ? 1 : 0);
  }

  function method_fm_channel__regs(runtime: any): any {
    const members = runtime.members;

    return (members.m_regs ?? 0);
  }

  function method_fm_channel__debug_operator(runtime: any, index: any): any {
    const members = runtime.members;

    const h_m_op = members.m_op ?? 0;
    return h_m_op[index];
  }

  function method_fm_channel__add_to_output(runtime: any, choffs: any, output: any, value: any): any {
    const members = runtime.members;

    let out0_index: any = ((0) | 0);
    let out1_index: any = ((((1) % (2))) | 0);
    let out2_index: any = ((((2) % (2))) | 0);
    let out3_index: any = ((((3) % (2))) | 0);
    if ((((0) || ((members.m_regs.ch_output_0?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out0_index] = ((output.data[out0_index]) + (value));
    }
    if ((((1) && ((members.m_regs.ch_output_1?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out1_index] = ((output.data[out1_index]) + (value));
    }
    if ((((0) && ((members.m_regs.ch_output_2?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out2_index] = ((output.data[out2_index]) + (value));
    }
    if ((((0) && ((members.m_regs.ch_output_3?.(choffs) ?? 0))) ? 1 : 0)) {
      output.data[out3_index] = ((output.data[out3_index]) + (value));
    }
  }

  function method___construct(runtime: any, owner: any, choffs: any): any {
    const members = runtime.members;

    const h_m_feedback = members.m_feedback ?? 0;
    const h_m_op = members.m_op ?? 0;
    members.m_choffs = ((choffs) >>> 0);
    h_m_feedback[0] = 0;
    h_m_feedback[1] = 0;
    members.m_feedback_in = ((0) << 16 >> 16);
    h_m_op[0] = 0;
    h_m_op[1] = 0;
    h_m_op[2] = 0;
    h_m_op[3] = 0;
    members.m_regs = (typeof (runtime.dereference(owner)).regs === 'function' ? (runtime.dereference(owner)).regs() : typeof (runtime.dereference(owner)).regs === 'number' || typeof (runtime.dereference(owner)).regs === 'boolean' ? (runtime.dereference(owner)).regs : runtime.container(owner, "regs"));
    members.m_owner = owner;
  }
  return {
    "choffs": method_choffs,
    "assign": method_assign,
    "is4op": method_is4op,
    "regs": method_regs,
    "debug_operator": method_debug_operator,
    "add_to_output": method_add_to_output,
    "reset": method_reset,
    "save_restore": method_save_restore,
    "keyonoff": method_keyonoff,
    "bitfield": method_bitfield,
    "prepare": method_prepare,
    "clock": method_clock,
    "output_2op": method_output_2op,
    "clamp": method_clamp,
    "output_4op": method_output_4op,
    "output_rhythm_ch6": method_output_rhythm_ch6,
    "output_rhythm_ch7": method_output_rhythm_ch7,
    "output_rhythm_ch8": method_output_rhythm_ch8,
    "fm_channel::choffs": method_fm_channel__choffs,
    "fm_channel::assign": method_fm_channel__assign,
    "fm_channel::is4op": method_fm_channel__is4op,
    "fm_channel::regs": method_fm_channel__regs,
    "fm_channel::debug_operator": method_fm_channel__debug_operator,
    "fm_channel::add_to_output": method_fm_channel__add_to_output,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.allocations!["fm_channel__opll_registers"]!.compiledMethodLinks = ["assert","debug::log_keyon"];
definition.children![0]!.definition.allocations!["ds1001"]!.allocations!["fm_engine_base__opll_registers"]!.allocations!["fm_operator__opll_registers"]!.compiledMethods = (() => {


  function method_opoffs(runtime: any): any {
    const members = runtime.members;

    return (members.m_opoffs ?? 0);
  }

  function method_choffs(runtime: any): any {
    const members = runtime.members;

    return (members.m_choffs ?? 0);
  }

  function method_set_choffs(runtime: any, choffs: any): any {
    const members = runtime.members;

    members.m_choffs = ((choffs) >>> 0);
  }

  function method_phase(runtime: any): any {
    const members = runtime.members;

    return (((members.m_phase ?? 0)) >>> (10));
  }

  function method_regs(runtime: any): any {
    const members = runtime.members;

    return (members.m_regs ?? 0);
  }

  function method_debug_eg_state(runtime: any): any {
    const members = runtime.members;

    return (members.m_env_state ?? 0);
  }

  function method_debug_eg_attenuation(runtime: any): any {
    const members = runtime.members;

    return (((members.m_env_attenuation ?? 0)) & 0xffff);
  }

  function method_debug_ssg_inverted(runtime: any): any {
    const members = runtime.members;

    return (((members.m_ssg_inverted ?? 0)) & 0xff);
  }

  function method_debug_cache(runtime: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    return h_m_cache;
  }

  function method_fm_operator(runtime: any, owner: any, opoffs: any): any {
    const members = runtime.members;


  }

  function method_reset(runtime: any): any {
    const members = runtime.members;

    members.m_phase = ((0) >>> 0);
    members.m_env_attenuation = ((1023) & 0xffff);
    members.m_env_state = 4;
    members.m_ssg_inverted = ((0) & 0xff);
    members.m_key_state = ((0) & 0xff);
    members.m_keyon_live = ((0) & 0xff);
  }

  function method_save_restore(runtime: any, state: any): any {
    const members = runtime.members;

    ((runtime.dereference(state)).save_restore?.((members.m_phase ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_env_attenuation ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_env_state ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_ssg_inverted ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_key_state ?? 0)) ?? 0);
    ((runtime.dereference(state)).save_restore?.((members.m_keyon_live ?? 0)) ?? 0);
  }

  function method_prepare(runtime: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    (members.m_regs.cache_operator_data?.((members.m_choffs ?? 0), (members.m_opoffs ?? 0), h_m_cache) ?? 0);
    method_clock_keystate(runtime, ((((Number((members.m_keyon_live ?? 0)) !== Number(0)) ? 1 : 0)) >>> 0));
    members.m_keyon_live = ((((members.m_keyon_live) & (-5))) & 0xff);
    return (((((Number((members.m_env_state ?? 0)) !== Number(4)) ? 1 : 0)) || (((Number((members.m_env_attenuation ?? 0)) < Number(896)) ? 1 : 0))) ? 1 : 0);
  }

  function method_clock_keystate(runtime: any, keystate: any): any {
    const members = runtime.members;

    0;
    if (((Number(((keystate) ^ ((members.m_key_state ?? 0)))) !== Number(0)) ? 1 : 0)) {
      members.m_key_state = ((keystate) & 0xff);
      if (((Number(keystate) !== Number(0)) ? 1 : 0)) {
        if ((((1) && (((Number((members.m_env_attenuation ?? 0)) < Number(512)) ? 1 : 0))) ? 1 : 0)) {
          members.m_env_state = 0;
        } else {
          method_start_attack(runtime);
        }
      } else {
        method_start_release(runtime);
      }
    }
  }

  function method_start_attack(runtime: any, is_restart: any = 0): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    if (((Number((members.m_env_state ?? 0)) === Number(1)) ? 1 : 0)) {
      return;
    }
    members.m_env_state = 1;
    if ((((0) && (((is_restart) ? 0 : 1))) ? 1 : 0)) {
      members.m_ssg_inverted = (((((members.m_regs.op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) & (method_bitfield(runtime, (members.m_regs.op_ssg_eg_mode?.((members.m_opoffs ?? 0)) ?? 0), 2)))) & 0xff);
    }
    if (((is_restart) ? 0 : 1)) {
      members.m_phase = ((0) >>> 0);
    }
    if (((Number(h_m_cache.eg_rate[1]) >= Number(62)) ? 1 : 0)) {
      members.m_env_attenuation = ((0) & 0xffff);
    }
  }

  function method_bitfield(runtime: any, value: any, start: any, length: any = 1): any {
    const members = runtime.members;

    return ((((value) >>> (start))) & (((((1) << (length))) - (1))));
  }

  function method_start_release(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_env_state ?? 0)) >= Number(4)) ? 1 : 0)) {
      return;
    }
    members.m_env_state = 4;
    if ((((0) && ((members.m_ssg_inverted ?? 0))) ? 1 : 0)) {
      members.m_env_attenuation = ((((((512) - ((members.m_env_attenuation ?? 0)))) & (1023))) & 0xffff);
      members.m_ssg_inverted = ((0) & 0xff);
    }
  }

  function method_clock(runtime: any, env_counter: any, lfo_raw_pm: any): any {
    const members = runtime.members;

    if ((members.m_regs.op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) {
      method_clock_ssg_eg_state(runtime);
    } else {
      members.m_ssg_inverted = ((0) & 0xff);
    }
    if (((Number(method_bitfield(runtime, env_counter, 0, 2)) === Number(0)) ? 1 : 0)) {
      method_clock_envelope(runtime, ((env_counter) >>> (2)));
    }
    method_clock_phase(runtime, lfo_raw_pm);
  }

  function method_clock_ssg_eg_state(runtime: any): any {
    const members = runtime.members;

    if (((method_bitfield(runtime, (members.m_env_attenuation ?? 0), 9)) ? 0 : 1)) {
      return;
    }
    let mode: any = (((members.m_regs.op_ssg_eg_mode?.((members.m_opoffs ?? 0)) ?? 0)) >>> 0);
    if (method_bitfield(runtime, mode, 0)) {
      members.m_ssg_inverted = ((((method_bitfield(runtime, mode, 2)) ^ (method_bitfield(runtime, mode, 1)))) & 0xff);
      if (((Number((members.m_env_state ?? 0)) !== Number(1)) ? 1 : 0)) {
        members.m_env_attenuation = (((((members.m_ssg_inverted ?? 0)) ? (512) : (1023))) & 0xffff);
      }
    } else {
      members.m_ssg_inverted = ((((members.m_ssg_inverted) ^ (method_bitfield(runtime, mode, 1)))) & 0xff);
      if ((((((Number((members.m_env_state ?? 0)) === Number(2)) ? 1 : 0)) || (((Number((members.m_env_state ?? 0)) === Number(3)) ? 1 : 0))) ? 1 : 0)) {
        method_start_attack(runtime, 1);
      }
      if (((Number(method_bitfield(runtime, mode, 1)) === Number(0)) ? 1 : 0)) {
        members.m_phase = ((0) >>> 0);
      }
    }
    if (((Number((members.m_env_state ?? 0)) === Number(4)) ? 1 : 0)) {
      members.m_env_attenuation = ((1023) & 0xffff);
    }
  }

  function method_clock_envelope(runtime: any, env_counter: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    if ((((((Number((members.m_env_state ?? 0)) === Number(1)) ? 1 : 0)) && (((Number((members.m_env_attenuation ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
      members.m_env_state = 2;
    }
    if ((((((Number((members.m_env_state ?? 0)) === Number(2)) ? 1 : 0)) && (((Number((members.m_env_attenuation ?? 0)) >= Number(h_m_cache.eg_sustain)) ? 1 : 0))) ? 1 : 0)) {
      members.m_env_state = 3;
    }
    let rate: any = ((h_m_cache.eg_rate[(members.m_env_state ?? 0)]) >>> 0);
    let rate_shift: any = ((((rate) >>> (2))) >>> 0);
    env_counter = ((((env_counter) << (rate_shift))) >>> 0);
    if (((Number(method_bitfield(runtime, env_counter, 0, 11)) !== Number(0)) ? 1 : 0)) {
      return;
    }
    let relevant_bits: any = ((method_bitfield(runtime, env_counter, ((((Number(rate_shift) <= Number(11)) ? 1 : 0)) ? (11) : (rate_shift)), 3)) >>> 0);
    let increment: any = ((method_attenuation_increment(runtime, rate, relevant_bits)) >>> 0);
    if (((Number((members.m_env_state ?? 0)) === Number(1)) ? 1 : 0)) {
      if (((Number(rate) < Number(62)) ? 1 : 0)) {
        members.m_env_attenuation = ((((members.m_env_attenuation) + (runtime.shiftRight((((~(members.m_env_attenuation ?? 0))) * (increment)), 4)))) & 0xffff);
      }
    } else {
      if ((((members.m_regs.op_ssg_eg_enable?.((members.m_opoffs ?? 0)) ?? 0)) ? 0 : 1)) {
        members.m_env_attenuation = ((((members.m_env_attenuation) + (increment))) & 0xffff);
      } else {
        if (((Number((members.m_env_attenuation ?? 0)) < Number(512)) ? 1 : 0)) {
          members.m_env_attenuation = ((((members.m_env_attenuation) + (((4) * (increment))))) & 0xffff);
        }
      }
      if (((Number((members.m_env_attenuation ?? 0)) >= Number(1024)) ? 1 : 0)) {
        members.m_env_attenuation = ((1023) & 0xffff);
      }
      if (((((((1) && (((Number((members.m_env_state ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_env_attenuation ?? 0)) >= Number(512)) ? 1 : 0))) ? 1 : 0)) {
        method_start_attack(runtime);
      }
      if (((((((0) && (((Number((members.m_env_state ?? 0)) === Number(4)) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_env_attenuation ?? 0)) >= Number(192)) ? 1 : 0))) ? 1 : 0)) {
        members.m_env_state = 5;
      }
    }
  }

  function method_attenuation_increment(runtime: any, rate: any, index: any): any {
    const members = runtime.members;

    if ((((members.__static_attenuation_increment_s_increment_table__initialised ?? 0)) ? 0 : 1)) {
      members.__static_attenuation_increment_s_increment_table = [0, 0, 269488144, 269488144, 269488144, 269488144, 286265616, 286265616, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 269488144, 269553680, 286265616, 286331152, 286331153, 554770705, 555819297, 572596769, 572662306, 1109541410, 1111638594, 1145193538, 1145324612, 2219082820, 2223277188, 2290387076, 2290649224, 2290649224, 2290649224, 2290649224];
      members.__static_attenuation_increment_s_increment_table__initialised = 1;
    }
    let s_increment_table: any = (members.__static_attenuation_increment_s_increment_table ?? 0);
    return method_bitfield(runtime, runtime.readIndex(s_increment_table, rate), ((4) * (index)), 4);
  }

  function method_clock_phase(runtime: any, lfo_raw_pm: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    let phase_step: any = ((h_m_cache.phase_step) >>> 0);
    if (((Number(phase_step) === Number(1)) ? 1 : 0)) {
      phase_step = (((members.m_regs.compute_phase_step?.((members.m_choffs ?? 0), (members.m_opoffs ?? 0), h_m_cache, lfo_raw_pm) ?? 0)) >>> 0);
    }
    members.m_phase = ((((members.m_phase) + (phase_step))) >>> 0);
  }

  function method_compute_volume(runtime: any, phase: any, am_offset: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    if (((Number((members.m_env_attenuation ?? 0)) > Number(896)) ? 1 : 0)) {
      return 0;
    }
    let sin_attenuation: any = ((runtime.readIndex(h_m_cache.waveform, ((phase) & (1023)))) >>> 0);
    let env_attenuation: any = ((((method_envelope_attenuation(runtime, am_offset)) << (2))) >>> 0);
    let result: any = ((method_attenuation_to_volume(runtime, ((((sin_attenuation) & (32767))) + (env_attenuation)))) | 0);
    return ((method_bitfield(runtime, sin_attenuation, 15)) ? ((-result)) : (result));
  }

  function method_envelope_attenuation(runtime: any, am_offset: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    let result: any = (((((members.m_env_attenuation ?? 0)) >>> (h_m_cache.eg_shift))) >>> 0);
    if ((((0) && ((members.m_ssg_inverted ?? 0))) ? 1 : 0)) {
      result = ((((((512) - (result))) & (1023))) >>> 0);
    }
    if ((members.m_regs.op_lfo_am_enable?.((members.m_opoffs ?? 0)) ?? 0)) {
      result = ((((result) + (am_offset))) >>> 0);
    }
    result = ((((result) + (h_m_cache.total_level))) >>> 0);
    return Math.min(+(result), +(1023));
  }

  function method_attenuation_to_volume(runtime: any, input: any): any {
    const members = runtime.members;

    if ((((members.__static_attenuation_to_volume_s_power_table__initialised ?? 0)) ? 0 : 1)) {
      members.__static_attenuation_to_volume_s_power_table = [8168, 8148, 8124, 8104, 8080, 8060, 8040, 8016, 7996, 7972, 7952, 7932, 7908, 7888, 7864, 7844, 7824, 7804, 7780, 7760, 7740, 7720, 7696, 7676, 7656, 7636, 7616, 7592, 7572, 7552, 7532, 7512, 7492, 7472, 7452, 7432, 7412, 7392, 7372, 7352, 7332, 7312, 7292, 7272, 7252, 7232, 7212, 7192, 7176, 7156, 7136, 7116, 7096, 7076, 7060, 7040, 7020, 7000, 6984, 6964, 6944, 6928, 6908, 6888, 6868, 6852, 6832, 6816, 6796, 6776, 6760, 6740, 6724, 6704, 6688, 6668, 6652, 6632, 6616, 6596, 6580, 6560, 6544, 6524, 6508, 6492, 6472, 6456, 6436, 6420, 6404, 6384, 6368, 6352, 6336, 6316, 6300, 6284, 6264, 6248, 6232, 6216, 6200, 6180, 6164, 6148, 6132, 6116, 6100, 6080, 6064, 6048, 6032, 6016, 6000, 5984, 5968, 5952, 5936, 5920, 5904, 5888, 5872, 5856, 5840, 5824, 5808, 5792, 5776, 5760, 5744, 5732, 5716, 5700, 5684, 5668, 5652, 5636, 5624, 5608, 5592, 5576, 5564, 5548, 5532, 5516, 5504, 5488, 5472, 5456, 5444, 5428, 5412, 5400, 5384, 5368, 5356, 5340, 5328, 5312, 5296, 5284, 5268, 5256, 5240, 5228, 5212, 5200, 5184, 5168, 5156, 5144, 5128, 5116, 5100, 5088, 5072, 5060, 5044, 5032, 5020, 5004, 4992, 4976, 4964, 4952, 4936, 4924, 4912, 4896, 4884, 4872, 4856, 4844, 4832, 4820, 4804, 4792, 4780, 4768, 4752, 4740, 4728, 4716, 4704, 4688, 4676, 4664, 4652, 4640, 4628, 4616, 4600, 4588, 4576, 4564, 4552, 4540, 4528, 4516, 4504, 4492, 4480, 4468, 4456, 4444, 4432, 4420, 4408, 4396, 4384, 4372, 4360, 4348, 4336, 4324, 4312, 4300, 4288, 4276, 4264, 4256, 4244, 4232, 4220, 4208, 4196, 4184, 4176, 4164, 4152, 4140, 4128, 4120, 4108, 4096];
      members.__static_attenuation_to_volume_s_power_table__initialised = 1;
    }
    let s_power_table: any = (members.__static_attenuation_to_volume_s_power_table ?? 0);
    return runtime.shiftRight(runtime.readIndex(s_power_table, ((input) & (255))), ((input) >>> (8)));
  }

  function method_compute_noise_volume(runtime: any, am_offset: any): any {
    const members = runtime.members;

    let result: any = ((((((method_envelope_attenuation(runtime, am_offset)) ^ (1023))) << (1))) | 0);
    return ((method_bitfield(runtime, (members.m_regs.noise_state?.() ?? 0), 0)) ? ((-result)) : (result));
  }

  function method_keyonoff(runtime: any, on: any, type: any): any {
    const members = runtime.members;

    members.m_keyon_live = (((((((members.m_keyon_live ?? 0)) & ((~((1) << (((type) | 0))))))) | (((method_bitfield(runtime, on, 0)) << (((type) | 0)))))) & 0xff);
  }

  function method_fm_operator__opoffs(runtime: any): any {
    const members = runtime.members;

    return (members.m_opoffs ?? 0);
  }

  function method_fm_operator__choffs(runtime: any): any {
    const members = runtime.members;

    return (members.m_choffs ?? 0);
  }

  function method_fm_operator__set_choffs(runtime: any, choffs: any): any {
    const members = runtime.members;

    members.m_choffs = ((choffs) >>> 0);
  }

  function method_fm_operator__phase(runtime: any): any {
    const members = runtime.members;

    return (((members.m_phase ?? 0)) >>> (10));
  }

  function method_fm_operator__regs(runtime: any): any {
    const members = runtime.members;

    return (members.m_regs ?? 0);
  }

  function method_fm_operator__debug_eg_state(runtime: any): any {
    const members = runtime.members;

    return (members.m_env_state ?? 0);
  }

  function method_fm_operator__debug_eg_attenuation(runtime: any): any {
    const members = runtime.members;

    return (((members.m_env_attenuation ?? 0)) & 0xffff);
  }

  function method_fm_operator__debug_ssg_inverted(runtime: any): any {
    const members = runtime.members;

    return (((members.m_ssg_inverted ?? 0)) & 0xff);
  }

  function method_fm_operator__debug_cache(runtime: any): any {
    const members = runtime.members;

    const h_m_cache = members.m_cache ?? 0;
    return h_m_cache;
  }

  function method___construct(runtime: any, owner: any, opoffs: any): any {
    const members = runtime.members;

    members.m_choffs = ((0) >>> 0);
    members.m_opoffs = ((opoffs) >>> 0);
    members.m_phase = ((0) >>> 0);
    members.m_env_attenuation = ((1023) & 0xffff);
    members.m_env_state = 4;
    members.m_ssg_inverted = ((0) & 0xff);
    members.m_key_state = ((0) & 0xff);
    members.m_keyon_live = ((0) & 0xff);
    members.m_regs = (typeof (runtime.dereference(owner)).regs === 'function' ? (runtime.dereference(owner)).regs() : typeof (runtime.dereference(owner)).regs === 'number' || typeof (runtime.dereference(owner)).regs === 'boolean' ? (runtime.dereference(owner)).regs : runtime.container(owner, "regs"));
    members.m_owner = owner;
  }
  return {
    "opoffs": method_opoffs,
    "choffs": method_choffs,
    "set_choffs": method_set_choffs,
    "phase": method_phase,
    "regs": method_regs,
    "debug_eg_state": method_debug_eg_state,
    "debug_eg_attenuation": method_debug_eg_attenuation,
    "debug_ssg_inverted": method_debug_ssg_inverted,
    "debug_cache": method_debug_cache,
    "fm_operator": method_fm_operator,
    "reset": method_reset,
    "save_restore": method_save_restore,
    "prepare": method_prepare,
    "clock_keystate": method_clock_keystate,
    "start_attack": method_start_attack,
    "bitfield": method_bitfield,
    "start_release": method_start_release,
    "clock": method_clock,
    "clock_ssg_eg_state": method_clock_ssg_eg_state,
    "clock_envelope": method_clock_envelope,
    "attenuation_increment": method_attenuation_increment,
    "clock_phase": method_clock_phase,
    "compute_volume": method_compute_volume,
    "envelope_attenuation": method_envelope_attenuation,
    "attenuation_to_volume": method_attenuation_to_volume,
    "compute_noise_volume": method_compute_noise_volume,
    "keyonoff": method_keyonoff,
    "fm_operator::opoffs": method_fm_operator__opoffs,
    "fm_operator::choffs": method_fm_operator__choffs,
    "fm_operator::set_choffs": method_fm_operator__set_choffs,
    "fm_operator::phase": method_fm_operator__phase,
    "fm_operator::regs": method_fm_operator__regs,
    "fm_operator::debug_eg_state": method_fm_operator__debug_eg_state,
    "fm_operator::debug_eg_attenuation": method_fm_operator__debug_eg_attenuation,
    "fm_operator::debug_ssg_inverted": method_fm_operator__debug_ssg_inverted,
    "fm_operator::debug_cache": method_fm_operator__debug_cache,
    "__construct": method___construct
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
