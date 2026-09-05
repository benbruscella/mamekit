// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './nes_cart_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read_l(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      let val: any = ((((runtime.dereference(members.m_cart)).read_l?.(offset) ?? 0)) & 0xff);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (16640))) & (65280))) >>> (8))) ?? 0);
      return val;
    } else {
      return 255;
    }
  }

  function method_read_m(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      let val: any = ((((runtime.dereference(members.m_cart)).read_m?.(offset) ?? 0)) & 0xff);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (24576))) & (65280))) >>> (8))) ?? 0);
      return val;
    } else {
      return 255;
    }
  }

  function method_read_h(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      let val: any = ((((runtime.dereference(members.m_cart)).read_h?.(offset) ?? 0)) & 0xff);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (32768))) & (65280))) >>> (8))) ?? 0);
      return val;
    } else {
      return 255;
    }
  }

  function method_read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      let val: any = ((((runtime.dereference(members.m_cart)).read_ex?.(offset) ?? 0)) & 0xff);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (16416))) & (65280))) >>> (8))) ?? 0);
      return val;
    } else {
      return 255;
    }
  }

  function method_write_l(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      ((runtime.dereference(members.m_cart)).write_l?.(offset, data) ?? 0);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (16640))) & (65280))) >>> (8))) ?? 0);
    }
  }

  function method_write_m(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      ((runtime.dereference(members.m_cart)).write_m?.(offset, data) ?? 0);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (24576))) & (65280))) >>> (8))) ?? 0);
    }
  }

  function method_write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      ((runtime.dereference(members.m_cart)).write_h?.(offset, data) ?? 0);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (32768))) & (65280))) >>> (8))) ?? 0);
    }
  }

  function method_write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_cart ?? runtime.member("m_cart"))) {
      ((runtime.dereference(members.m_cart)).write_ex?.(offset, data) ?? 0);
      ((runtime.dereference(members.m_cart)).set_open_bus?.(((((((offset) + (16416))) & (65280))) >>> (8))) ?? 0);
    }
  }
  return {
    "read_l": method_read_l,
    "read_m": method_read_m,
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "write_h": method_write_h,
    "write_ex": method_write_ex
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["0"]!.compiledMethods = (() => {
  function method_read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_hblank_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_chr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    if (((Number(runtime.readIndex((members.m_chr_src ?? runtime.member("m_chr_src")), bank)) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_nt_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    if (runtime.readIndex((members.m_nt_writable ?? runtime.member("m_nt_writable")), page)) {
      runtime.writeIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)));
  }

  function method_read_l(runtime: any, offset: any) {
    const members = runtime.members;
    return method_get_open_bus(runtime);
  }

  function method_get_open_bus(runtime: any) {
    const members = runtime.members;
    return (members.m_open_bus ?? runtime.member("m_open_bus"));
  }

  function method_read_m(runtime: any, offset: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((offset) & ((((members.m_battery).length) - (1)))));
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((offset) & ((((members.m_prgram).length) - (1)))));
    }
    return method_get_open_bus(runtime);
  }

  function method_write_l(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_write_m(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & ((((members.m_battery).length) - (1)))), data);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & ((((members.m_prgram).length) - (1)))), data);
    }
  }

  function method_write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
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
    "write_h": method_write_h,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["1"]!.compiledMethods = (() => {
  function method_read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_hblank_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_chr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    if (((Number(runtime.readIndex((members.m_chr_src ?? runtime.member("m_chr_src")), bank)) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_nt_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    if (runtime.readIndex((members.m_nt_writable ?? runtime.member("m_nt_writable")), page)) {
      runtime.writeIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)));
  }

  function method_read_l(runtime: any, offset: any) {
    const members = runtime.members;
    return method_get_open_bus(runtime);
  }

  function method_get_open_bus(runtime: any) {
    const members = runtime.members;
    return (members.m_open_bus ?? runtime.member("m_open_bus"));
  }

  function method_read_m(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((((runtime.readIndex((members.m_reg ?? runtime.member("m_reg")), 1)) >>> (2)) & ((1 << (2)) - 1))) & 0xff);
    0;
    if (((((((((runtime.readIndex((members.m_reg ?? runtime.member("m_reg")), 3)) >>> (4)) & 1)) ? 0 : 1)) || (((Number((members.m_mmc1_type ?? runtime.member("m_mmc1_type"))) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
      if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
        return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((((((bank) * (8192))) + (offset))) & ((((members.m_battery).length) - (1)))));
      }
      if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
        return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((((((bank) * (8192))) + (offset))) & ((((members.m_prgram).length) - (1)))));
      }
    }
    return method_get_open_bus(runtime);
  }

  function method_write_l(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__read_m(runtime: any, offset: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((offset) & ((((members.m_battery).length) - (1)))));
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((offset) & ((((members.m_prgram).length) - (1)))));
    }
    return method_get_open_bus(runtime);
  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
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
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["2"]!.compiledMethods = (() => {
  function method_read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_hblank_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_chr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    if (((Number(runtime.readIndex((members.m_chr_src ?? runtime.member("m_chr_src")), bank)) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_nt_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    if (runtime.readIndex((members.m_nt_writable ?? runtime.member("m_nt_writable")), page)) {
      runtime.writeIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)));
  }

  function method_read_l(runtime: any, offset: any) {
    const members = runtime.members;
    return method_get_open_bus(runtime);
  }

  function method_get_open_bus(runtime: any) {
    const members = runtime.members;
    return (members.m_open_bus ?? runtime.member("m_open_bus"));
  }

  function method_read_m(runtime: any, offset: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((offset) & ((((members.m_battery).length) - (1)))));
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((offset) & ((((members.m_prgram).length) - (1)))));
    }
    return method_get_open_bus(runtime);
  }

  function method_write_l(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_write_m(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & ((((members.m_battery).length) - (1)))), data);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & ((((members.m_prgram).length) - (1)))), data);
    }
  }

  function method_write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    0;
    data = ((method_account_bus_conflict(runtime, offset, data)) & 0xff);
    method_prg16_89ab(runtime, data);
  }

  function method_account_bus_conflict(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_bus_conflict ?? runtime.member("m_bus_conflict"))) {
      return ((data) & (method_hi_access_rom(runtime, offset)));
    } else {
      return data;
    }
  }

  function method_hi_access_rom(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (13)) & ((1 << (2)) - 1));
    return runtime.readIndex((members.m_prg ?? runtime.member("m_prg")), runtime.add(((runtime.readIndex((members.m_prg_bank ?? runtime.member("m_prg_bank")), bank)) * (8192)), ((offset) & (8191))));
  }

  function method_prg16_89ab(runtime: any, bank: any) {
    const members = runtime.members;
    bank = method_prg_8k_bank_num(runtime, ((bank) * (2)));
    runtime.writeIndex(runtime.writableMember("m_prg_bank"), 0, ((bank) + (0)));
    runtime.writeIndex(runtime.writableMember("m_prg_bank"), 1, ((bank) + (1)));
    method_update_prg_banks(runtime, 0, 1);
  }

  function method_prg_8k_bank_num(runtime: any, bank_8k: any) {
    const members = runtime.members;
    if (((Number((members.m_prg_mask ?? runtime.member("m_prg_mask"))) === Number((((((members.m_prg_chunks ?? runtime.member("m_prg_chunks"))) << (1))) - (1)))) ? 1 : 0)) {
      return ((bank_8k) & ((members.m_prg_mask ?? runtime.member("m_prg_mask"))));
    }
    if (((Number(bank_8k) < Number((((((members.m_prg_chunks ?? runtime.member("m_prg_chunks"))) << (1))) - (1)))) ? 1 : 0)) {
      return bank_8k;
    }
    bank_8k = runtime.andAssign(bank_8k, (members.m_prg_mask ?? runtime.member("m_prg_mask")));
    bank_8k = ((bank_8k) - (runtime.add(runtime.divide((members.m_prg_mask ?? runtime.member("m_prg_mask")), 2), 1)));
    return runtime.readIndex((members.m_prg_bank_map ?? runtime.member("m_prg_bank_map")), bank_8k);
  }

  function method_update_prg_banks(runtime: any, prg_bank_start: any, prg_bank_end: any) {
    const members = runtime.members;
    for (let prg_bank: any = prg_bank_start; ((Number(prg_bank) <= Number(prg_bank_end)) ? 1 : 0); prg_bank = ((prg_bank) + (1))) {
      0;
      (runtime.calls["assert"] ? runtime.calls["assert"](((Number(prg_bank) < Number((((members.m_prg_bank ?? runtime.member("m_prg_bank")))?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number((((members.m_prg_bank ?? runtime.member("m_prg_bank")))?.length ?? 0))) ? 1 : 0)));
      (runtime.calls["assert"] ? runtime.calls["assert"](((Number(prg_bank) < Number((((members.m_prg_bank_mem ?? runtime.member("m_prg_bank_mem")))?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number((((members.m_prg_bank_mem ?? runtime.member("m_prg_bank_mem")))?.length ?? 0))) ? 1 : 0)));
      ((runtime.dereference(runtime.readIndex((members.m_prg_bank_mem ?? runtime.member("m_prg_bank_mem")), prg_bank))).set_entry?.(runtime.readIndex((members.m_prg_bank ?? runtime.member("m_prg_bank")), prg_bank)) ?? 0);
    }
  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
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
    "write_h": method_write_h,
    "account_bus_conflict": method_account_bus_conflict,
    "hi_access_rom": method_hi_access_rom,
    "prg16_89ab": method_prg16_89ab,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["3"]!.compiledMethods = (() => {
  function method_read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_hblank_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_chr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    if (((Number(runtime.readIndex((members.m_chr_src ?? runtime.member("m_chr_src")), bank)) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    if ((members.m_chr_open_bus ?? runtime.member("m_chr_open_bus"))) {
      return method_get_open_bus(runtime);
    }
    return method_device_nes_cart_interface__chr_r(runtime, offset);
  }

  function method_get_open_bus(runtime: any) {
    const members = runtime.members;
    return (members.m_open_bus ?? runtime.member("m_open_bus"));
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_nt_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    if (runtime.readIndex((members.m_nt_writable ?? runtime.member("m_nt_writable")), page)) {
      runtime.writeIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)));
  }

  function method_read_l(runtime: any, offset: any) {
    const members = runtime.members;
    return method_get_open_bus(runtime);
  }

  function method_read_m(runtime: any, offset: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((offset) & ((((members.m_battery).length) - (1)))));
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((offset) & ((((members.m_prgram).length) - (1)))));
    }
    return method_get_open_bus(runtime);
  }

  function method_write_l(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_write_m(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & ((((members.m_battery).length) - (1)))), data);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & ((((members.m_prgram).length) - (1)))), data);
    }
  }

  function method_write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    0;
    data = ((method_account_bus_conflict(runtime, offset, data)) & 0xff);
    if ((members.m_ce_mask ?? runtime.member("m_ce_mask"))) {
      method_chr8(runtime, ((data) & ((~(members.m_ce_mask ?? runtime.member("m_ce_mask"))))), 0);
      if (((Number(((data) & ((members.m_ce_mask ?? runtime.member("m_ce_mask"))))) === Number((members.m_ce_state ?? runtime.member("m_ce_state")))) ? 1 : 0)) {
        members.m_chr_open_bus = ((0) & 0xff);
      } else {
        members.m_chr_open_bus = ((1) & 0xff);
      }
    } else {
      method_chr8(runtime, data, 0);
    }
  }

  function method_account_bus_conflict(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_bus_conflict ?? runtime.member("m_bus_conflict"))) {
      return ((data) & (method_hi_access_rom(runtime, offset)));
    } else {
      return data;
    }
  }

  function method_hi_access_rom(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (13)) & ((1 << (2)) - 1));
    return runtime.readIndex((members.m_prg ?? runtime.member("m_prg")), runtime.add(((runtime.readIndex((members.m_prg_bank ?? runtime.member("m_prg_bank")), bank)) * (8192)), ((offset) & (8191))));
  }

  function method_chr8(runtime: any, bank: any, source: any) {
    const members = runtime.members;
    method_bank_chr(runtime, 3, 0, bank, source);
  }

  function method_bank_chr(runtime: any, shift: any, start: any, bank: any, source: any) {
    const members = runtime.members;
    const h_m_vram = members.m_vram ?? runtime.member("m_vram");
    let base_ptr: any = 0;
    let chr_chunks: any = ((0) >>> 0);
    if (((Number(source) === Number(1)) ? 1 : 0)) {
      (runtime.calls["assert"] ? runtime.calls["assert"](((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)) : runtime.macro("assert", ((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)));
      base_ptr = runtime.addressOf(h_m_vram, 0);
      chr_chunks = (((members.m_vram_chunks ?? runtime.member("m_vram_chunks"))) >>> 0);
    } else {
      0;
      base_ptr = (members.m_vrom ?? runtime.member("m_vrom"));
      chr_chunks = (((members.m_vrom_chunks ?? runtime.member("m_vrom_chunks"))) >>> 0);
    }
    bank = runtime.andAssign(bank, ((((chr_chunks) << (((3) - (shift))))) - (1)));
    let size: any = ((1024) << (shift));
    let bank_start: any = ((bank) * (size));
    let kbyte: any = ((1) << (shift));
    for (let i: any = 0; ((Number(i) < Number(kbyte)) ? 1 : 0); i = ((i) + (1))) {
      runtime.writeIndex(runtime.writableMember("m_chr_src"), ((i) + (start)), source);
      runtime.writeIndex(runtime.writableMember("m_chr_orig"), ((i) + (start)), ((bank_start) + (((i) * (1024)))));
      runtime.writeIndex(runtime.writableMember("m_chr_access"), ((i) + (start)), runtime.addressOf(base_ptr, runtime.readIndex((members.m_chr_orig ?? runtime.member("m_chr_orig")), ((i) + (start)))));
    }
  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
    "hblank_irq": method_hblank_irq,
    "scanline_irq": method_scanline_irq,
    "chr_w": method_chr_w,
    "chr_r": method_chr_r,
    "get_open_bus": method_get_open_bus,
    "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
    "nt_w": method_nt_w,
    "nt_r": method_nt_r,
    "read_l": method_read_l,
    "read_m": method_read_m,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "write_h": method_write_h,
    "account_bus_conflict": method_account_bus_conflict,
    "hi_access_rom": method_hi_access_rom,
    "chr8": method_chr8,
    "bank_chr": method_bank_chr,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["4"]!.compiledMethods = (() => {
  function method_read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_scanline_irq(runtime: any, scanline: any, vblank: any, blanked: any) {
    const members = runtime.members;

  }

  function method_chr_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    if (((Number(runtime.readIndex((members.m_chr_src ?? runtime.member("m_chr_src")), bank)) === Number(1)) ? 1 : 0)) {
      runtime.writeIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)), data);
    }
  }

  function method_chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_device_nes_cart_interface__chr_r(runtime: any, offset: any) {
    const members = runtime.members;
    let bank: any = (((offset) >>> (10)) & ((1 << (3)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_chr_access ?? runtime.member("m_chr_access")), bank), ((offset) & (1023)));
  }

  function method_nt_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    if (runtime.readIndex((members.m_nt_writable ?? runtime.member("m_nt_writable")), page)) {
      runtime.writeIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)), data);
    }
  }

  function method_nt_r(runtime: any, offset: any) {
    const members = runtime.members;
    let page: any = (((offset) >>> (10)) & ((1 << (2)) - 1));
    return runtime.readIndex(runtime.readIndex((members.m_nt_access ?? runtime.member("m_nt_access")), page), ((offset) & (1023)));
  }

  function method_read_l(runtime: any, offset: any) {
    const members = runtime.members;
    return method_get_open_bus(runtime);
  }

  function method_get_open_bus(runtime: any) {
    const members = runtime.members;
    return (members.m_open_bus ?? runtime.member("m_open_bus"));
  }

  function method_read_m(runtime: any, offset: any) {
    const members = runtime.members;
    0;
    if (((((members.m_wram_protect ?? runtime.member("m_wram_protect"))) >>> (7)) & 1)) {
      if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
        return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((offset) & ((((members.m_battery).length) - (1)))));
      }
      if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
        return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((offset) & ((((members.m_prgram).length) - (1)))));
      }
    }
    return method_get_open_bus(runtime);
  }

  function method_write_l(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_write_m(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    0;
    if ((((((((members.m_wram_protect ?? runtime.member("m_wram_protect"))) >>> (7)) & 1)) && (((((((members.m_wram_protect ?? runtime.member("m_wram_protect"))) >>> (6)) & 1)) ? 0 : 1))) ? 1 : 0)) {
      if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
        runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & ((((members.m_battery).length) - (1)))), data);
      } else {
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & ((((members.m_prgram).length) - (1)))), data);
        }
      }
    }
  }

  function method_set_prg(runtime: any, prg_base: any, prg_mask: any) {
    const members = runtime.members;
    let prg_flip: any = (((((((members.m_latch ?? runtime.member("m_latch"))) & (64))) ? (2) : (0))) & 0xff);
    method_prg_cb(runtime, 0, ((prg_base) | (((runtime.readIndex((members.m_mmc_prg_bank ?? runtime.member("m_mmc_prg_bank")), ((0) ^ (prg_flip)))) & (prg_mask)))));
    method_prg_cb(runtime, 1, ((prg_base) | (((runtime.readIndex((members.m_mmc_prg_bank ?? runtime.member("m_mmc_prg_bank")), 1)) & (prg_mask)))));
    method_prg_cb(runtime, 2, ((prg_base) | (((runtime.readIndex((members.m_mmc_prg_bank ?? runtime.member("m_mmc_prg_bank")), ((2) ^ (prg_flip)))) & (prg_mask)))));
    method_prg_cb(runtime, 3, ((prg_base) | (((runtime.readIndex((members.m_mmc_prg_bank ?? runtime.member("m_mmc_prg_bank")), 3)) & (prg_mask)))));
  }

  function method_prg_cb(runtime: any, start: any, bank: any) {
    const members = runtime.members;
    method_prg8_x(runtime, start, bank);
  }

  function method_prg8_x(runtime: any, start: any, bank: any) {
    const members = runtime.members;
    0;
    bank = method_prg_8k_bank_num(runtime, bank);
    runtime.writeIndex(runtime.writableMember("m_prg_bank"), start, bank);
    method_update_prg_banks(runtime, start, start);
  }

  function method_prg_8k_bank_num(runtime: any, bank_8k: any) {
    const members = runtime.members;
    if (((Number((members.m_prg_mask ?? runtime.member("m_prg_mask"))) === Number((((((members.m_prg_chunks ?? runtime.member("m_prg_chunks"))) << (1))) - (1)))) ? 1 : 0)) {
      return ((bank_8k) & ((members.m_prg_mask ?? runtime.member("m_prg_mask"))));
    }
    if (((Number(bank_8k) < Number((((((members.m_prg_chunks ?? runtime.member("m_prg_chunks"))) << (1))) - (1)))) ? 1 : 0)) {
      return bank_8k;
    }
    bank_8k = runtime.andAssign(bank_8k, (members.m_prg_mask ?? runtime.member("m_prg_mask")));
    bank_8k = ((bank_8k) - (runtime.add(runtime.divide((members.m_prg_mask ?? runtime.member("m_prg_mask")), 2), 1)));
    return runtime.readIndex((members.m_prg_bank_map ?? runtime.member("m_prg_bank_map")), bank_8k);
  }

  function method_update_prg_banks(runtime: any, prg_bank_start: any, prg_bank_end: any) {
    const members = runtime.members;
    for (let prg_bank: any = prg_bank_start; ((Number(prg_bank) <= Number(prg_bank_end)) ? 1 : 0); prg_bank = ((prg_bank) + (1))) {
      0;
      (runtime.calls["assert"] ? runtime.calls["assert"](((Number(prg_bank) < Number((((members.m_prg_bank ?? runtime.member("m_prg_bank")))?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number((((members.m_prg_bank ?? runtime.member("m_prg_bank")))?.length ?? 0))) ? 1 : 0)));
      (runtime.calls["assert"] ? runtime.calls["assert"](((Number(prg_bank) < Number((((members.m_prg_bank_mem ?? runtime.member("m_prg_bank_mem")))?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number((((members.m_prg_bank_mem ?? runtime.member("m_prg_bank_mem")))?.length ?? 0))) ? 1 : 0)));
      ((runtime.dereference(runtime.readIndex((members.m_prg_bank_mem ?? runtime.member("m_prg_bank_mem")), prg_bank))).set_entry?.(runtime.readIndex((members.m_prg_bank ?? runtime.member("m_prg_bank")), prg_bank)) ?? 0);
    }
  }

  function method_set_chr(runtime: any, chr: any, chr_base: any, chr_mask: any) {
    const members = runtime.members;
    let chr_page: any = (((((((members.m_latch ?? runtime.member("m_latch"))) & (128))) >>> (5))) & 0xff);
    method_chr_cb(runtime, ((chr_page) ^ (0)), ((chr_base) | (((((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 0)) & ((~1)))) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (1)), ((chr_base) | (((((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 0)) | (1))) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (2)), ((chr_base) | (((((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 1)) & ((~1)))) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (3)), ((chr_base) | (((((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 1)) | (1))) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (4)), ((chr_base) | (((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 2)) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (5)), ((chr_base) | (((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 3)) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (6)), ((chr_base) | (((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 4)) & (chr_mask)))), chr);
    method_chr_cb(runtime, ((chr_page) ^ (7)), ((chr_base) | (((runtime.readIndex((members.m_mmc_vrom_bank ?? runtime.member("m_mmc_vrom_bank")), 5)) & (chr_mask)))), chr);
  }

  function method_chr_cb(runtime: any, start: any, bank: any, source: any) {
    const members = runtime.members;
    method_chr1_x(runtime, start, bank, source);
  }

  function method_chr1_x(runtime: any, start: any, bank: any, source: any) {
    const members = runtime.members;
    method_bank_chr(runtime, 0, start, bank, source);
  }

  function method_bank_chr(runtime: any, shift: any, start: any, bank: any, source: any) {
    const members = runtime.members;
    const h_m_vram = members.m_vram ?? runtime.member("m_vram");
    let base_ptr: any = 0;
    let chr_chunks: any = ((0) >>> 0);
    if (((Number(source) === Number(1)) ? 1 : 0)) {
      (runtime.calls["assert"] ? runtime.calls["assert"](((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)) : runtime.macro("assert", ((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)));
      base_ptr = runtime.addressOf(h_m_vram, 0);
      chr_chunks = (((members.m_vram_chunks ?? runtime.member("m_vram_chunks"))) >>> 0);
    } else {
      0;
      base_ptr = (members.m_vrom ?? runtime.member("m_vrom"));
      chr_chunks = (((members.m_vrom_chunks ?? runtime.member("m_vrom_chunks"))) >>> 0);
    }
    bank = runtime.andAssign(bank, ((((chr_chunks) << (((3) - (shift))))) - (1)));
    let size: any = ((1024) << (shift));
    let bank_start: any = ((bank) * (size));
    let kbyte: any = ((1) << (shift));
    for (let i: any = 0; ((Number(i) < Number(kbyte)) ? 1 : 0); i = ((i) + (1))) {
      runtime.writeIndex(runtime.writableMember("m_chr_src"), ((i) + (start)), source);
      runtime.writeIndex(runtime.writableMember("m_chr_orig"), ((i) + (start)), ((bank_start) + (((i) * (1024)))));
      runtime.writeIndex(runtime.writableMember("m_chr_access"), ((i) + (start)), runtime.addressOf(base_ptr, runtime.readIndex((members.m_chr_orig ?? runtime.member("m_chr_orig")), ((i) + (start)))));
    }
  }

  function method_set_nt_mirroring(runtime: any, mirroring: any) {
    const members = runtime.members;
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
          (runtime.calls["fatalerror"] ? runtime.calls["fatalerror"]("4-screen mirroring without on-cart NTRAM!\n") : runtime.macro("fatalerror", "4-screen mirroring without on-cart NTRAM!\n"));
        }
        method_set_nt_page(runtime, 0, 4, 0, 1);
        method_set_nt_page(runtime, 1, 4, 1, 1);
        method_set_nt_page(runtime, 2, 4, 2, 1);
        method_set_nt_page(runtime, 3, 4, 3, 1);
        break;
      }
    }
  }

  function method_set_nt_page(runtime: any, page: any, source: any, bank: any, writable: any) {
    const members = runtime.members;
    const h_m_ext_ntram = members.m_ext_ntram ?? runtime.member("m_ext_ntram");
    let base_ptr: any = 0;
    switch (source) {
      case 4:
      {
        base_ptr = runtime.addressOf(h_m_ext_ntram, 0);
        break;
      }
      case 1:
      {
        bank = runtime.andAssign(bank, (((((members.m_vrom_chunks ?? runtime.member("m_vrom_chunks"))) << (3))) - (1)));
        base_ptr = (members.m_vrom ?? runtime.member("m_vrom"));
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
        base_ptr = (members.m_ciram ?? runtime.member("m_ciram"));
        break;
      }
    }
    page = runtime.andAssign(page, 3);
    runtime.writeIndex(runtime.writableMember("m_nt_src"), page, source);
    if (base_ptr) {
      runtime.writeIndex(runtime.writableMember("m_nt_orig"), page, ((bank) * (1024)));
      runtime.writeIndex(runtime.writableMember("m_nt_access"), page, runtime.addressOf(base_ptr, runtime.readIndex((members.m_nt_orig ?? runtime.member("m_nt_orig")), page)));
    }
    runtime.writeIndex(runtime.writableMember("m_nt_writable"), page, writable);
  }

  function method_device_nes_cart_interface__read_h(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__read_ex(runtime: any, offset: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_nes_cart_interface__write_ex(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__ppu_latch(runtime: any, offset: any) {
    const members = runtime.members;

  }

  function method_device_nes_cart_interface__write_m(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & ((((members.m_battery).length) - (1)))), data);
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & ((((members.m_prgram).length) - (1)))), data);
    }
  }

  function method_device_nes_cart_interface__read_m(runtime: any, offset: any) {
    const members = runtime.members;
    if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_battery ?? runtime.member("m_battery")), ((offset) & ((((members.m_battery).length) - (1)))));
    }
    if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
      return runtime.readIndex((members.m_prgram ?? runtime.member("m_prgram")), ((offset) & ((((members.m_prgram).length) - (1)))));
    }
    return method_get_open_bus(runtime);
  }

  function method_device_nes_cart_interface__write_h(runtime: any, offset: any, data: any) {
    const members = runtime.members;

  }
  return {
    "read_h": method_read_h,
    "read_ex": method_read_ex,
    "write_ex": method_write_ex,
    "ppu_latch": method_ppu_latch,
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
    "set_prg": method_set_prg,
    "prg_cb": method_prg_cb,
    "prg8_x": method_prg8_x,
    "prg_8k_bank_num": method_prg_8k_bank_num,
    "update_prg_banks": method_update_prg_banks,
    "set_chr": method_set_chr,
    "chr_cb": method_chr_cb,
    "chr1_x": method_chr1_x,
    "bank_chr": method_bank_chr,
    "set_nt_mirroring": method_set_nt_mirroring,
    "set_nt_page": method_set_nt_page,
    "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
    "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
    "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
    "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
    "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
    "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
    "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
