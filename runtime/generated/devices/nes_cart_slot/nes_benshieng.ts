// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../../core/generated-device.js';
import deviceData from './nes_benshieng.device.ir.json' with { type: 'json' };

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
    "write_l": method_write_l,
    "write_m": method_write_m,
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
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_maincpu.set_input_line"];

export const device = definition;
export default device;
