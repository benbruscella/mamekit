// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './gb_cart_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["rom"]!.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["rom_wisdom"]!.compiledMethods = (() => {
  function method_bank_rom_switch(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom(runtime, offset);
  }

  function method_set_bank_rom(runtime: any, entry: any) {
    const members = runtime.members;
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_wisdom_device__bank_rom_switch(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom(runtime, offset);
  }
  return {
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom,
    "wisdom_device::bank_rom_switch": method_wisdom_device__bank_rom_switch
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_yong"]!.compiledMethods = (() => {
  function method_bank_rom_switch(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom(runtime, data);
  }

  function method_set_bank_rom(runtime: any, entry: any) {
    const members = runtime.members;
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }
  return {
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_rock8"]!.compiledMethods = (() => {
  function method_bank_rom_switch(runtime: any, data: any) {
    const members = runtime.members;
    data = ((runtime.andAssign(data, 31)) & 0xff);
    method_set_bank_rom(runtime, ((((data) ? 0 : 1)) ? (1) : (((((Number(15) < Number(data)) ? 1 : 0)) ? (((data) - (8))) : (data)))));
  }

  function method_set_bank_rom(runtime: any, entry: any) {
    const members = runtime.members;
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }
  return {
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_sachen1"]!.compiledMethods = (() => {
  function method_rom_read(runtime: any, offset: any, spoof: any) {
    const members = runtime.members;
    if (spoof) {
      offset = ((offset) | (128));
    }
    if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
      offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
    }
    return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
  }

  function method_bank_rom_high_base(runtime: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    return (typeof (runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).base === 'function' ? (runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).base() : typeof (runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).base === 'number' || typeof (runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).base === 'boolean' ? (runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).base : runtime.container(runtime.readIndex(h_m_bank_rom, 1), "base"));
  }

  function method_bank_rom_low_base(runtime: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    return (typeof (runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).base === 'function' ? (runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).base() : typeof (runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).base === 'number' || typeof (runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).base === 'boolean' ? (runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).base : runtime.container(runtime.readIndex(h_m_bank_rom, 0), "base"));
  }

  function method_bank_rom_switch_outer(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number(48) === Number(((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) & (48)))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, data);
      method_update_banks(runtime);
    }
  }

  function method_update_banks(runtime: any) {
    const members = runtime.members;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    method_set_bank_rom_low(runtime, lo);
    method_set_bank_rom_high(runtime, hi);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & ((members.m_bank_mux_rom ?? runtime.member("m_bank_mux_rom"))));
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & ((members.m_bank_mux_rom ?? runtime.member("m_bank_mux_rom"))))) | (((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) & ((~(members.m_bank_mux_rom ?? runtime.member("m_bank_mux_rom")))))));
  }

  function method_set_bank_rom_low(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(entry) ?? 0);
  }

  function method_set_bank_rom_high(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(entry) ?? 0);
  }

  function method_bank_rom_switch_inner(runtime: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, ((data) ? (data) : (1)));
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    method_set_bank_rom_high(runtime, hi);
  }

  function method_bank_rom_mux(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number(48) === Number(((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) & (48)))) ? 1 : 0)) {
      members.m_bank_mux_rom = ((data) & 0xff);
      method_update_banks(runtime);
    }
  }

  function method_sachen_mmc_device_base__rom_read(runtime: any, offset: any, spoof: any) {
    const members = runtime.members;
    if (spoof) {
      offset = ((offset) | (128));
    }
    if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
      offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
    }
    return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
  }

  function method_read_rom(runtime: any, offset: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      if (((Number(49) !== Number((members.m_counter ?? runtime.member("m_counter")))) ? 1 : 0)) {
        members.m_counter = ((((members.m_counter) + (1))) & 0xff);
      }
    }
    return method_rom_read(runtime, offset, ((Number(49) !== Number((members.m_counter ?? runtime.member("m_counter")))) ? 1 : 0));
  }

  function method_sachen_mmc1_device__read_rom(runtime: any, offset: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      if (((Number(49) !== Number((members.m_counter ?? runtime.member("m_counter")))) ? 1 : 0)) {
        members.m_counter = ((((members.m_counter) + (1))) & 0xff);
      }
    }
    return method_rom_read(runtime, offset, ((Number(49) !== Number((members.m_counter ?? runtime.member("m_counter")))) ? 1 : 0));
  }
  return {
    "rom_read": method_rom_read,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_switch_outer": method_bank_rom_switch_outer,
    "update_banks": method_update_banks,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "set_bank_rom_low": method_set_bank_rom_low,
    "set_bank_rom_high": method_set_bank_rom_high,
    "bank_rom_switch_inner": method_bank_rom_switch_inner,
    "bank_rom_mux": method_bank_rom_mux,
    "sachen_mmc_device_base::rom_read": method_sachen_mmc_device_base__rom_read,
    "read_rom": method_read_rom,
    "sachen_mmc1_device::read_rom": method_sachen_mmc1_device__read_rom
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_lasama"]!.compiledMethods = (() => {
  function method_ctrl_2080_w(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_fine(runtime, ((data) & (3)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, entry);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    let coarse: any = ((((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 1)))) & 0xffff)) & 0xffff);
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) | (((coarse) << (runtime.readIndex((members.m_bank_bits_rom ?? runtime.member("m_bank_bits_rom")), 1)))))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 1)));
  }

  function method_ctrl_6000_w(runtime: any, data: any) {
    const members = runtime.members;
    if ((((((data) >>> (7)) & 1)) ? 0 : 1)) {
      method_set_bank_rom_coarse(runtime, (((data) >>> (1)) & 1));
    }
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, entry);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 0)))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 0)));
  }
  return {
    "ctrl_2080_w": method_ctrl_2080_w,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "ctrl_6000_w": method_ctrl_6000_w,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_low": method_bank_rom_entry_low
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc1"]!.compiledMethods = (() => {
  function method_bank_switch_coarse(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_coarse(runtime, ((data) & (runtime.readIndex((members.m_bank_lines ?? runtime.member("m_bank_lines")), 1))));
    method_set_bank_ram(runtime, ((data) & (runtime.readIndex((members.m_bank_lines ?? runtime.member("m_bank_lines")), 1))));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, entry);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 0)))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 0)));
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    let coarse: any = ((((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 1)))) & 0xffff)) & 0xffff);
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) | (((coarse) << (runtime.readIndex((members.m_bank_bits_rom ?? runtime.member("m_bank_bits_rom")), 1)))))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 1)));
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_enable_ram(runtime: any, data: any) {
    const members = runtime.members;
    method_set_ram_enable(runtime, ((Number(10) === Number(((data) & (15)))) ? 1 : 0));
  }

  function method_set_ram_enable(runtime: any, enable: any) {
    const members = runtime.members;
    0;
    if (enable) {
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
  }

  function method_bank_switch_fine(runtime: any, data: any) {
    const members = runtime.members;
    data = ((runtime.andAssign(data, 31)) & 0xff);
    method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (runtime.readIndex((members.m_bank_lines ?? runtime.member("m_bank_lines")), 0))));
  }

  function method_mbc_dual_device_base__set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, entry);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_low_mask(runtime: any, data: any) {
    const members = runtime.members;
    let mask: any = ((((((data) ? (3) : (0))) & 0xff)) & 0xff);
    0;
    method_set_bank_rom_low_coarse_mask(runtime, mask);
    method_set_bank_ram_mask(runtime, mask);
  }

  function method_set_bank_rom_low_coarse_mask(runtime: any, mask: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_rom_coarse_mask"), 0, mask);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
  }

  function method_set_bank_ram_mask(runtime: any, mask: any) {
    const members = runtime.members;
    members.m_bank_ram_mask = ((mask) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      let entry: any = ((((method_bank_ram_entry(runtime)) & 0xff)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }
  return {
    "bank_switch_coarse": method_bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "enable_ram": method_enable_ram,
    "set_ram_enable": method_set_ram_enable,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
    "bank_low_mask": method_bank_low_mask,
    "set_bank_rom_low_coarse_mask": method_set_bank_rom_low_coarse_mask,
    "set_bank_ram_mask": method_set_bank_ram_mask
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc2"]!.compiledMethods = (() => {
  function method_ram_mbc_read(runtime: any, space: any, offset: any) {
    const members = runtime.members;
    if ((members.m_ram_mbc_enable ?? runtime.member("m_ram_mbc_enable"))) {
      return ((((runtime.readIndex((members.m_ram_mbc ?? runtime.member("m_ram_mbc")), offset)) & (15))) | ((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (240))));
    } else {
      return (typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"));
    }
  }

  function method_ram_mbc_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((members.m_ram_mbc_enable ?? runtime.member("m_ram_mbc_enable"))) {
      runtime.writeIndex(runtime.writableMember("m_ram_mbc"), offset, ((data) & (15)));
    }
  }

  function method_ram_mbc_enable(runtime: any, data: any) {
    const members = runtime.members;
    members.m_ram_mbc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    0;
  }

  function method_bank_rom_switch(runtime: any, data: any) {
    const members = runtime.members;
    data = ((runtime.andAssign(data, 15)) & 0xff);
    (runtime.calls["set_bank_rom"] ? runtime.calls["set_bank_rom"](((data) ? (data) : (1))) : runtime.macro("set_bank_rom", ((data) ? (data) : (1))));
  }
  return {
    "ram_mbc_read": method_ram_mbc_read,
    "ram_mbc_write": method_ram_mbc_write,
    "ram_mbc_enable": method_ram_mbc_enable,
    "bank_rom_switch": method_bank_rom_switch
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc3"]!.compiledMethods = (() => {
  function method_enable_ram_rtc(runtime: any, data: any) {
    const members = runtime.members;
    members.m_rtc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    if ((((members.m_rtc_enable ?? runtime.member("m_rtc_enable"))) ? 0 : 1)) {
      0;
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    } else {
      if (method_rtc_select(runtime)) {
        0;
        ((runtime.dereference(members.m_view_ram)).select?.(1) ?? 0);
      } else {
        0;
        ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
      }
    }
  }

  function method_rtc_select(runtime: any) {
    const members = runtime.members;
    return ((((members.m_rtc_select ?? runtime.member("m_rtc_select"))) >>> (3)) & 1);
  }

  function method_bank_switch_fine(runtime: any, data: any) {
    const members = runtime.members;
    data = ((runtime.andAssign(data, 127)) & 0xff);
    method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, entry);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    let coarse: any = ((((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 1)))) & 0xffff)) & 0xffff);
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) | (((coarse) << (runtime.readIndex((members.m_bank_bits_rom ?? runtime.member("m_bank_bits_rom")), 1)))))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 1)));
  }

  function method_select_ram_rtc(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_coarse(runtime, ((data) & (7)));
    method_set_bank_ram(runtime, ((data) & (7)));
    members.m_rtc_select = ((data) & 0xff);
    if ((members.m_rtc_enable ?? runtime.member("m_rtc_enable"))) {
      if ((((data) >>> (3)) & 1)) {
        0;
        ((runtime.dereference(members.m_view_ram)).select?.(1) ?? 0);
      } else {
        0;
        ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
      }
    }
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, entry);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 0)))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 0)));
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_latch_rtc(runtime: any, data: any) {
    const members = runtime.members;
    0;
    if ((((((((((members.m_rtc_latch ?? runtime.member("m_rtc_latch"))) >>> (0)) & 1)) ? 0 : 1)) && ((((data) >>> (0)) & 1))) ? 1 : 0)) {
      0;
      (runtime.calls["std::copy"] ? runtime.calls["std::copy"]((runtime.calls["std::begin"] ? runtime.calls["std::begin"](runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0)) : runtime.macro("std::begin", runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0))), (runtime.calls["std::end"] ? runtime.calls["std::end"](runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0)) : runtime.macro("std::end", runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0))), (runtime.calls["std::begin"] ? runtime.calls["std::begin"](runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 1)) : runtime.macro("std::begin", runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 1)))) : runtime.macro("std::copy", (runtime.calls["std::begin"] ? runtime.calls["std::begin"](runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0)) : runtime.macro("std::begin", runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0))), (runtime.calls["std::end"] ? runtime.calls["std::end"](runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0)) : runtime.macro("std::end", runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0))), (runtime.calls["std::begin"] ? runtime.calls["std::begin"](runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 1)) : runtime.macro("std::begin", runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 1)))));
    }
    members.m_rtc_latch = ((data) & 0xff);
  }

  function method_read_rtc(runtime: any, space: any) {
    const members = runtime.members;
    let reg: any = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
    if (((Number(((runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 1))?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
      0;
      return runtime.readIndex(runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 1), reg);
    } else {
      0;
      return (typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"));
    }
  }

  function method_rtc_register(runtime: any) {
    const members = runtime.members;
    return (((members.m_rtc_select ?? runtime.member("m_rtc_select"))) & (7));
  }

  function method_write_rtc(runtime: any, data: any) {
    const members = runtime.members;
    let reg: any = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
    if (((Number(((runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0))?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
      0;
      if (((Number(4) === Number(reg)) ? 1 : 0)) {
        data = ((runtime.andAssign(data, 193)) & 0xff);
        runtime.writeIndex(runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0), reg, data);
      } else {
        runtime.writeIndex(runtime.readIndex((members.m_rtc_regs ?? runtime.member("m_rtc_regs")), 0), reg, data);
      }
    } else {
      0;
    }
  }
  return {
    "enable_ram_rtc": method_enable_ram_rtc,
    "rtc_select": method_rtc_select,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "select_ram_rtc": method_select_ram_rtc,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "latch_rtc": method_latch_rtc,
    "read_rtc": method_read_rtc,
    "rtc_register": method_rtc_register,
    "write_rtc": method_write_rtc
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc5"]!.compiledMethods = (() => {
  function method_rom_mbc_device_base__bank_switch_coarse(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_coarse(runtime, ((data) & (runtime.readIndex((members.m_bank_lines ?? runtime.member("m_bank_lines")), 1))));
    method_set_bank_ram(runtime, ((data) & (runtime.readIndex((members.m_bank_lines ?? runtime.member("m_bank_lines")), 1))));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, entry);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 0)))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 0)));
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    let coarse: any = ((((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 1)))) & 0xffff)) & 0xffff);
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) | (((coarse) << (runtime.readIndex((members.m_bank_bits_rom ?? runtime.member("m_bank_bits_rom")), 1)))))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 1)));
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_enable_ram(runtime: any, data: any) {
    const members = runtime.members;
    method_set_ram_enable(runtime, ((Number(10) === Number(data)) ? 1 : 0));
  }

  function method_set_ram_enable(runtime: any, enable: any) {
    const members = runtime.members;
    0;
    if (enable) {
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
  }

  function method_bank_switch_fine_low(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (256))) | (((data) & 0xffff))));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (runtime.readIndex((members.m_bank_lines ?? runtime.member("m_bank_lines")), 0))));
  }

  function method_mbc_dual_device_base__set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, entry);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_fine(runtime: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1);
  }

  function method_bank_switch_fine_high(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (255))) | (((((((data) & (1))) & 0xffff)) << (8)))));
  }
  return {
    "rom_mbc_device_base::bank_switch_coarse": method_rom_mbc_device_base__bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "enable_ram": method_enable_ram,
    "set_ram_enable": method_set_ram_enable,
    "bank_switch_fine_low": method_bank_switch_fine_low,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_switch_fine_high": method_bank_switch_fine_high
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_m161"]!.compiledMethods = (() => {
  function method_bank_rom_switch(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((((members.m_bank_lock ?? runtime.member("m_bank_lock"))) ? 0 : 1)) {
      members.m_bank_lock = ((1) & 0xff);
      method_set_bank_rom(runtime, ((data) & (7)));
    }
  }

  function method_set_bank_rom(runtime: any, entry: any) {
    const members = runtime.members;
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_m161_device__bank_rom_switch(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if ((((members.m_bank_lock ?? runtime.member("m_bank_lock"))) ? 0 : 1)) {
      members.m_bank_lock = ((1) & 0xff);
      method_set_bank_rom(runtime, ((data) & (7)));
    }
  }
  return {
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom,
    "m161_device::bank_rom_switch": method_m161_device__bank_rom_switch
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mmm01"]!.compiledMethods = (() => {
  function method_enable_ram(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number(10) === Number(((data) & (15)))) ? 1 : 0)) {
      0;
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      0;
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
    if ((members.m_config ?? runtime.member("m_config"))) {
      runtime.writeIndex(runtime.writableMember("m_bank_prot_sel"), 0, (((data) >>> (4)) & ((1 << (2)) - 1)));
      0;
      if ((((data) >>> (6)) & 1)) {
        0;
        members.m_config = ((0) & 0xff);
        method_update_bank_rom_low(runtime);
        method_update_bank_rom_high(runtime);
      }
    }
  }

  function method_update_bank_rom_low(runtime: any) {
    const members = runtime.members;
    let entry: any = ((0) & 0xffff);
    if ((((members.m_config ?? runtime.member("m_config"))) ? 0 : 1)) {
      entry = (((((((((members.m_bank_sel_rom_coarse ?? runtime.member("m_bank_sel_rom_coarse"))) & 0xffff)) << (7))) | ((((members.m_bank_sel_rom_fine ?? runtime.member("m_bank_sel_rom_fine"))) & (runtime.readIndex((members.m_bank_prot_sel ?? runtime.member("m_bank_prot_sel")), 1)))))) & 0xffff);
      if ((((members.m_mode_large_prg ?? runtime.member("m_mode_large_prg"))) ? 0 : 1)) {
        entry = ((((entry) | (((runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 1)) << (5))))) & 0xffff);
      } else {
        if ((members.m_bank_low_mid ?? runtime.member("m_bank_low_mid"))) {
          entry = ((((entry) | (((runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 0)) << (5))))) & 0xffff);
        }
      }
    } else {
      entry = ((510) & 0xffff);
    }
    method_set_bank_rom_low(runtime, entry);
  }

  function method_set_bank_rom_low(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(entry) ?? 0);
  }

  function method_update_bank_rom_high(runtime: any) {
    const members = runtime.members;
    let entry: any = ((0) & 0xffff);
    if ((((members.m_config ?? runtime.member("m_config"))) ? 0 : 1)) {
      entry = (((((((((members.m_bank_sel_rom_coarse ?? runtime.member("m_bank_sel_rom_coarse"))) & 0xffff)) << (7))) | ((members.m_bank_sel_rom_fine ?? runtime.member("m_bank_sel_rom_fine"))))) & 0xffff);
      if ((((members.m_mode_large_prg ?? runtime.member("m_mode_large_prg"))) ? 0 : 1)) {
        entry = ((((entry) | (((runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 1)) << (5))))) & 0xffff);
      } else {
        entry = ((((entry) | (((runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 0)) << (5))))) & 0xffff);
      }
    } else {
      entry = ((((510) | ((members.m_bank_sel_rom_fine ?? runtime.member("m_bank_sel_rom_fine"))))) & 0xffff);
    }
    if ((((((members.m_bank_sel_rom_fine ?? runtime.member("m_bank_sel_rom_fine"))) & ((~runtime.readIndex((members.m_bank_prot_sel ?? runtime.member("m_bank_prot_sel")), 1))))) ? 0 : 1)) {
      entry = ((((entry) | (1))) & 0xffff);
    }
    method_set_bank_rom_high(runtime, entry);
  }

  function method_set_bank_rom_high(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(entry) ?? 0);
  }

  function method_bank_switch_fine(runtime: any, data: any) {
    const members = runtime.members;
    members.m_bank_sel_rom_fine = (((((((members.m_bank_sel_rom_fine ?? runtime.member("m_bank_sel_rom_fine"))) & (runtime.readIndex((members.m_bank_prot_sel ?? runtime.member("m_bank_prot_sel")), 1)))) | ((((((data) >>> (0)) & ((1 << (5)) - 1))) & ((~runtime.readIndex((members.m_bank_prot_sel ?? runtime.member("m_bank_prot_sel")), 1))))))) & 0xff);
    0;
    if ((members.m_config ?? runtime.member("m_config"))) {
      runtime.writeIndex(runtime.writableMember("m_bank_sel_mid"), 1, (((data) >>> (5)) & ((1 << (2)) - 1)));
      0;
    }
    method_update_bank_rom_high(runtime);
    if (((((members.m_config ?? runtime.member("m_config"))) && ((members.m_mode_large_prg ?? runtime.member("m_mode_large_prg")))) ? 1 : 0)) {
      method_update_bank_ram(runtime);
    }
  }

  function method_update_bank_ram(runtime: any) {
    const members = runtime.members;
    let entry: any = (((((((members.m_bank_sel_ram_coarse ?? runtime.member("m_bank_sel_ram_coarse"))) << (2))) & 0xff)) & 0xff);
    if ((members.m_mode_large_prg ?? runtime.member("m_mode_large_prg"))) {
      entry = ((((entry) | (runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 1)))) & 0xff);
    } else {
      if ((members.m_bank_low_mid ?? runtime.member("m_bank_low_mid"))) {
        entry = ((((entry) | (runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 0)))) & 0xff);
      }
    }
    method_set_bank_ram(runtime, entry);
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_bank_switch_coarse(runtime: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_bank_sel_mid"), 0, ((((runtime.readIndex((members.m_bank_sel_mid ?? runtime.member("m_bank_sel_mid")), 0)) & (runtime.readIndex((members.m_bank_prot_sel ?? runtime.member("m_bank_prot_sel")), 0)))) | ((((((data) >>> (0)) & ((1 << (2)) - 1))) & ((~runtime.readIndex((members.m_bank_prot_sel ?? runtime.member("m_bank_prot_sel")), 0)))))));
    0;
    if ((members.m_config ?? runtime.member("m_config"))) {
      members.m_bank_sel_ram_coarse = (((((data) >>> (2)) & ((1 << (2)) - 1))) & 0xff);
      members.m_bank_sel_rom_coarse = (((((data) >>> (4)) & ((1 << (2)) - 1))) & 0xff);
      members.m_bank_prot_low_mid = (((((data) >>> (6)) & 1)) & 0xff);
      0;
    }
    if (((((members.m_config ?? runtime.member("m_config"))) || (((((((members.m_mode_large_prg ?? runtime.member("m_mode_large_prg"))) ? 0 : 1)) && ((members.m_bank_low_mid ?? runtime.member("m_bank_low_mid")))) ? 1 : 0))) ? 1 : 0)) {
      method_update_bank_ram(runtime);
    }
  }

  function method_enable_bank_low_mid(runtime: any, data: any) {
    const members = runtime.members;
    if ((((members.m_bank_prot_low_mid ?? runtime.member("m_bank_prot_low_mid"))) ? 0 : 1)) {
      members.m_bank_low_mid = (((((data) >>> (0)) & 1)) & 0xff);
      0;
    }
    if ((members.m_config ?? runtime.member("m_config"))) {
      runtime.writeIndex(runtime.writableMember("m_bank_prot_sel"), 1, (((((data) >>> (2)) & ((1 << (4)) - 1))) << (1)));
      members.m_mode_large_prg = (((((data) >>> (6)) & 1)) & 0xff);
      0;
    }
    if (((((((members.m_bank_prot_low_mid ?? runtime.member("m_bank_prot_low_mid"))) ? 0 : 1)) && ((((members.m_config ?? runtime.member("m_config"))) ? 0 : 1))) ? 1 : 0)) {
      method_update_bank_rom_low(runtime);
    }
    if ((members.m_config ?? runtime.member("m_config"))) {
      method_update_bank_rom_high(runtime);
    }
    if (((((((members.m_bank_prot_low_mid ?? runtime.member("m_bank_prot_low_mid"))) ? 0 : 1)) || ((members.m_config ?? runtime.member("m_config")))) ? 1 : 0)) {
      method_update_bank_ram(runtime);
    }
  }
  return {
    "enable_ram": method_enable_ram,
    "update_bank_rom_low": method_update_bank_rom_low,
    "set_bank_rom_low": method_set_bank_rom_low,
    "update_bank_rom_high": method_update_bank_rom_high,
    "set_bank_rom_high": method_set_bank_rom_high,
    "bank_switch_fine": method_bank_switch_fine,
    "update_bank_ram": method_update_bank_ram,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "bank_switch_coarse": method_bank_switch_coarse,
    "enable_bank_low_mid": method_enable_bank_low_mid
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_camera"]!.compiledMethods = (() => {
  function method_mbc_device_base__device_start(runtime: any) {
    const members = runtime.members;

  }

  function method_enable_ram(runtime: any, data: any) {
    const members = runtime.members;
    members.m_ram_writable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    0;
  }

  function method_bank_switch_rom(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom(runtime, ((data) & (63)));
  }

  function method_set_bank_rom(runtime: any, entry: any) {
    const members = runtime.members;
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_bank_switch_ram(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_ram(runtime, ((data) & (15)));
    0;
    if ((((data) >>> (4)) & 1)) {
      ((runtime.dereference(members.m_view_cam)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_cam)).disable === 'function' ? (runtime.dereference(members.m_view_cam)).disable() : typeof (runtime.dereference(members.m_view_cam)).disable === 'number' || typeof (runtime.dereference(members.m_view_cam)).disable === 'boolean' ? (runtime.dereference(members.m_view_cam)).disable : runtime.container(members.m_view_cam, "disable"));
    }
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_read_ram(runtime: any, offset: any) {
    const members = runtime.members;
    return (((((members.m_busy ?? runtime.member("m_busy"))) ? 0 : 1)) ? (runtime.readIndex(method_bank_ram_base(runtime), offset)) : (0));
  }

  function method_bank_ram_base(runtime: any) {
    const members = runtime.members;
    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_write_ram(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((((((members.m_busy ?? runtime.member("m_busy"))) ? 0 : 1)) && ((members.m_ram_writable ?? runtime.member("m_ram_writable")))) ? 1 : 0)) {
      runtime.writeIndex(method_bank_ram_base(runtime), offset, data);
    }
  }

  function method_read_camera(runtime: any, offset: any) {
    const members = runtime.members;
    switch (offset) {
      case 0:
      {
        return (((((members.m_sel_pm ?? runtime.member("m_sel_pm"))) << (1))) | ((members.m_busy ?? runtime.member("m_busy"))));
      }
      default:
      {
        return 0;
      }
    }
  }

  function method_write_camera(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    switch (offset) {
      case 0:
      {
        members.m_sel_pm = (((((data) >>> (1)) & ((1 << (2)) - 1))) & 0xff);
        0;
        if ((((data) >>> (0)) & 1)) {
          if ((((members.m_busy ?? runtime.member("m_busy"))) ? 0 : 1)) {
            (runtime.calls["start_capture"] ? runtime.calls["start_capture"]() : runtime.macro("start_capture"));
          } else {
            0;
          }
        }
        break;
      }
      case 1:
      {
        runtime.writeIndex(runtime.writableMember("m_n"), 0, (((data) >>> (7)) & 1));
        runtime.writeIndex(runtime.writableMember("m_vh"), 0, (((data) >>> (5)) & ((1 << (2)) - 1)));
        runtime.writeIndex(runtime.writableMember("m_g"), 0, (((data) >>> (0)) & ((1 << (5)) - 1)));
        0;
        break;
      }
      case 2:
      {
        runtime.writeIndex(runtime.writableMember("m_c"), 0, ((((runtime.readIndex((members.m_c ?? runtime.member("m_c")), 0)) & (255))) | (((((data) & 0xffff)) << (8)))));
        0;
        break;
      }
      case 3:
      {
        runtime.writeIndex(runtime.writableMember("m_c"), 0, ((((runtime.readIndex((members.m_c ?? runtime.member("m_c")), 0)) & (65280))) | (data)));
        0;
        break;
      }
      case 4:
      {
        runtime.writeIndex(runtime.writableMember("m_e"), 0, (((data) >>> (4)) & ((1 << (4)) - 1)));
        runtime.writeIndex(runtime.writableMember("m_i"), 0, (((data) >>> (3)) & 1));
        runtime.writeIndex(runtime.writableMember("m_v"), 0, (((data) >>> (0)) & ((1 << (3)) - 1)));
        0;
        break;
      }
      case 5:
      {
        runtime.writeIndex(runtime.writableMember("m_z"), 0, (((data) >>> (6)) & ((1 << (2)) - 1)));
        runtime.writeIndex(runtime.writableMember("m_o"), 0, (((data) >>> (0)) & ((1 << (6)) - 1)));
        0;
        break;
      }
    }
  }

  function method_bank_ram(runtime: any) {
    const members = runtime.members;
    return (members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"));
  }
  return {
    "mbc_device_base::device_start": method_mbc_device_base__device_start,
    "enable_ram": method_enable_ram,
    "bank_switch_rom": method_bank_switch_rom,
    "set_bank_rom": method_set_bank_rom,
    "bank_switch_ram": method_bank_switch_ram,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "read_ram": method_read_ram,
    "bank_ram_base": method_bank_ram_base,
    "write_ram": method_write_ram,
    "read_camera": method_read_camera,
    "write_camera": method_write_camera,
    "bank_ram": method_bank_ram
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_camera"]!.children![0]!.definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["rom_huc1"]!.compiledMethods = (() => {
  function method_infrared_select(runtime: any, data: any) {
    const members = runtime.members;
    if (((Number(14) === Number(((data) & (14)))) ? 1 : 0)) {
      0;
      ((runtime.dereference(members.m_view_ir)).select?.(0) ?? 0);
    } else {
      0;
      (typeof (runtime.dereference(members.m_view_ir)).disable === 'function' ? (runtime.dereference(members.m_view_ir)).disable() : typeof (runtime.dereference(members.m_view_ir)).disable === 'number' || typeof (runtime.dereference(members.m_view_ir)).disable === 'boolean' ? (runtime.dereference(members.m_view_ir)).disable : runtime.container(members.m_view_ir, "disable"));
    }
  }

  function method_bank_switch_fine(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_fine(runtime, ((data) & (63)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, entry);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    let coarse: any = ((((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 1)))) & 0xffff)) & 0xffff);
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) | (((coarse) << (runtime.readIndex((members.m_bank_bits_rom ?? runtime.member("m_bank_bits_rom")), 1)))))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 1)));
  }

  function method_bank_switch_coarse(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_coarse(runtime, ((data) & (3)));
    method_set_bank_ram(runtime, ((data) & (3)));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, entry);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 0)))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 0)));
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_read_ir(runtime: any, space: any) {
    const members = runtime.members;
    0;
    return (((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (192))) | (0));
  }

  function method_write_ir(runtime: any, data: any) {
    const members = runtime.members;
    0;
  }
  return {
    "infrared_select": method_infrared_select,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "bank_switch_coarse": method_bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "read_ir": method_read_ir,
    "write_ir": method_write_ir
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_huc3"]!.compiledMethods = (() => {
  function method_io_select(runtime: any, data: any) {
    const members = runtime.members;
    switch (((data) & (15))) {
      case 0:
      {
        0;
        ((runtime.dereference(members.m_view_io)).select?.(0) ?? 0);
        break;
      }
      case 10:
      {
        0;
        ((runtime.dereference(members.m_view_io)).select?.(1) ?? 0);
        break;
      }
      case 11:
      {
        0;
        ((runtime.dereference(members.m_view_io)).select?.(2) ?? 0);
        break;
      }
      case 12:
      {
        0;
        ((runtime.dereference(members.m_view_io)).select?.(3) ?? 0);
        break;
      }
      case 13:
      {
        0;
        ((runtime.dereference(members.m_view_io)).select?.(4) ?? 0);
        break;
      }
      case 14:
      {
        0;
        ((runtime.dereference(members.m_view_io)).select?.(5) ?? 0);
        break;
      }
      default:
      {
        0;
        (typeof (runtime.dereference(members.m_view_io)).disable === 'function' ? (runtime.dereference(members.m_view_io)).disable() : typeof (runtime.dereference(members.m_view_io)).disable === 'number' || typeof (runtime.dereference(members.m_view_io)).disable === 'boolean' ? (runtime.dereference(members.m_view_io)).disable : runtime.container(members.m_view_io, "disable"));
      }
    }
  }

  function method_bank_switch_fine(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_fine(runtime, ((data) & (127)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 1, entry);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any) {
    const members = runtime.members;
    let coarse: any = ((((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 1)))) & 0xffff)) & 0xffff);
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 1)) | (((coarse) << (runtime.readIndex((members.m_bank_bits_rom ?? runtime.member("m_bank_bits_rom")), 1)))))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 1)));
  }

  function method_bank_switch_coarse(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_coarse(runtime, ((data) & (3)));
    method_set_bank_ram(runtime, ((data) & (3)));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    runtime.writeIndex(runtime.writableMember("m_bank_sel_rom"), 0, entry);
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(lo) ?? 0);
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_low(runtime: any) {
    const members = runtime.members;
    return ((((runtime.readIndex((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom")), 0)) & (runtime.readIndex((members.m_bank_rom_coarse_mask ?? runtime.member("m_bank_rom_coarse_mask")), 0)))) & (runtime.readIndex((members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")), 0)));
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_write_command(runtime: any, data: any) {
    const members = runtime.members;
    members.m_ctrl_cmd = (((((data) >>> (4)) & ((1 << (3)) - 1))) & 0xff);
    members.m_ctrl_data = (((((data) >>> (0)) & ((1 << (4)) - 1))) & 0xff);
    0;
  }

  function method_read_command(runtime: any, space: any) {
    const members = runtime.members;
    0;
    return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (128))) | ((((members.m_ctrl_cmd ?? runtime.member("m_ctrl_cmd"))) << (4))))) | ((members.m_ctrl_data ?? runtime.member("m_ctrl_data"))));
  }

  function method_read_status(runtime: any, space: any) {
    const members = runtime.members;
    0;
    return (((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (128))) | (127));
  }

  function method_write_control(runtime: any, data: any) {
    const members = runtime.members;
    0;
    if ((((((data) >>> (0)) & 1)) ? 0 : 1)) {
      switch ((members.m_ctrl_cmd ?? runtime.member("m_ctrl_cmd"))) {
        case 1:
        {
          0;
          members.m_ctrl_data = ((((runtime.readIndex((members.m_registers ?? runtime.member("m_registers")), (() => { const previous = members.m_ctrl_addr; members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff); return previous; })())) & (15))) & 0xff);
          break;
        }
        case 3:
        {
          0;
          runtime.writeIndex(runtime.writableMember("m_registers"), (() => { const previous = members.m_ctrl_addr; members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff); return previous; })(), (((members.m_ctrl_data ?? runtime.member("m_ctrl_data"))) & (15)));
          break;
        }
        case 4:
        {
          members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? runtime.member("m_ctrl_addr"))) & (240))) | ((((members.m_ctrl_data ?? runtime.member("m_ctrl_data"))) & (15))))) & 0xff);
          0;
          break;
        }
        case 5:
        {
          members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? runtime.member("m_ctrl_addr"))) & (15))) | ((((members.m_ctrl_data ?? runtime.member("m_ctrl_data"))) << (4))))) & 0xff);
          0;
          break;
        }
        case 6:
        {
          0;
          method_execute_instruction(runtime);
          break;
        }
        default:
        {
          0;
        }
      }
    }
  }

  function method_execute_instruction(runtime: any) {
    const members = runtime.members;
    switch ((((members.m_ctrl_data ?? runtime.member("m_ctrl_data"))) & (15))) {
      case 0:
      {
        0;
        (runtime.calls["std::copy_n"] ? runtime.calls["std::copy_n"](runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0)));
        break;
      }
      case 1:
      {
        0;
        let newminutes: any = ((((method_read_12bit(runtime, 0)) << 16 >> 16)) << 16 >> 16);
        let newdays: any = ((((method_read_12bit(runtime, 3)) << 16 >> 16)) << 16 >> 16);
        let oldminutes: any = ((((method_read_12bit(runtime, 16)) << 16 >> 16)) << 16 >> 16);
        let olddays: any = ((((method_read_12bit(runtime, 19)) << 16 >> 16)) << 16 >> 16);
        let eventminutes: any = ((((method_read_12bit(runtime, 88)) << 16 >> 16)) << 16 >> 16);
        let eventdays: any = ((((method_read_12bit(runtime, 91)) << 16 >> 16)) << 16 >> 16);
        let minutesdelta: any = ((((((newminutes) - (oldminutes))) << 16 >> 16)) << 16 >> 16);
        let daysdelta: any = ((((((newdays) - (olddays))) << 16 >> 16)) << 16 >> 16);
        while (((Number(((60) * (24))) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) - (((60) * (24))))) << 16 >> 16);
          daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
        }
        while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) + (((60) * (24))))) << 16 >> 16);
          daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
        }
        0;
        0;
        (runtime.calls["std::copy_n"] ? runtime.calls["std::copy_n"](runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16)));
        method_write_12bit(runtime, 88, ((((eventminutes) + (minutesdelta))) << 16 >> 16));
        method_write_12bit(runtime, 91, ((((eventdays) + (daysdelta))) << 16 >> 16));
        break;
      }
      case 2:
      {
        0;
        members.m_ctrl_data = ((1) & 0xff);
        break;
      }
      case 14:
      {
        0;
        break;
      }
      default:
      {
        0;
      }
    }
  }

  function method_read_12bit(runtime: any, offset: any) {
    const members = runtime.members;
    return ((((((((((runtime.readIndex((members.m_registers ?? runtime.member("m_registers")), ((((offset) + (0))) & (255)))) & (15))) & 0xffff)) << (0))) | (((((((runtime.readIndex((members.m_registers ?? runtime.member("m_registers")), ((((offset) + (1))) & (255)))) & (15))) & 0xffff)) << (4))))) | (((((((runtime.readIndex((members.m_registers ?? runtime.member("m_registers")), ((((offset) + (2))) & (255)))) & (15))) & 0xffff)) << (8))));
  }

  function method_write_12bit(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_registers"), ((((offset) + (0))) & (255)), ((((data) >>> (0))) & (15)));
    runtime.writeIndex(runtime.writableMember("m_registers"), ((((offset) + (1))) & (255)), ((((data) >>> (4))) & (15)));
    runtime.writeIndex(runtime.writableMember("m_registers"), ((((offset) + (2))) & (255)), ((((data) >>> (8))) & (15)));
  }

  function method_read_ir(runtime: any, space: any) {
    const members = runtime.members;
    0;
    return (((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (192))) | (0));
  }

  function method_write_ir(runtime: any, data: any) {
    const members = runtime.members;
    0;
  }

  function method_rtc_advance_seconds(runtime: any, param: any) {
    const members = runtime.members;
    if (((Number(((60) - (1))) > Number((members.m_seconds ?? runtime.member("m_seconds")))) ? 1 : 0)) {
      members.m_seconds = ((((members.m_seconds) + (1))) & 0xff);
      return;
    }
    members.m_seconds = ((0) & 0xff);
    let minutes: any = ((((method_read_12bit(runtime, 16)) & 0xffff)) & 0xffff);
    if (((Number(((((60) * (24))) - (1))) > Number(minutes)) ? 1 : 0)) {
      method_write_12bit(runtime, 16, ((minutes) + (1)));
      return;
    }
    method_write_12bit(runtime, 16, 0);
    method_write_12bit(runtime, 19, runtime.add(method_read_12bit(runtime, 19), 1));
  }

  function method_huc3_device__execute_instruction(runtime: any) {
    const members = runtime.members;
    switch ((((members.m_ctrl_data ?? runtime.member("m_ctrl_data"))) & (15))) {
      case 0:
      {
        0;
        (runtime.calls["std::copy_n"] ? runtime.calls["std::copy_n"](runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0)));
        break;
      }
      case 1:
      {
        0;
        let newminutes: any = ((((method_read_12bit(runtime, 0)) << 16 >> 16)) << 16 >> 16);
        let newdays: any = ((((method_read_12bit(runtime, 3)) << 16 >> 16)) << 16 >> 16);
        let oldminutes: any = ((((method_read_12bit(runtime, 16)) << 16 >> 16)) << 16 >> 16);
        let olddays: any = ((((method_read_12bit(runtime, 19)) << 16 >> 16)) << 16 >> 16);
        let eventminutes: any = ((((method_read_12bit(runtime, 88)) << 16 >> 16)) << 16 >> 16);
        let eventdays: any = ((((method_read_12bit(runtime, 91)) << 16 >> 16)) << 16 >> 16);
        let minutesdelta: any = ((((((newminutes) - (oldminutes))) << 16 >> 16)) << 16 >> 16);
        let daysdelta: any = ((((((newdays) - (olddays))) << 16 >> 16)) << 16 >> 16);
        while (((Number(((60) * (24))) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) - (((60) * (24))))) << 16 >> 16);
          daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
        }
        while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) + (((60) * (24))))) << 16 >> 16);
          daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
        }
        0;
        0;
        (runtime.calls["std::copy_n"] ? runtime.calls["std::copy_n"](runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 0), 7, runtime.addressOf((members.m_registers ?? runtime.member("m_registers")), 16)));
        method_write_12bit(runtime, 88, ((((eventminutes) + (minutesdelta))) << 16 >> 16));
        method_write_12bit(runtime, 91, ((((eventdays) + (daysdelta))) << 16 >> 16));
        break;
      }
      case 2:
      {
        0;
        members.m_ctrl_data = ((1) & 0xff);
        break;
      }
      case 14:
      {
        0;
        break;
      }
      default:
      {
        0;
      }
    }
  }
  return {
    "io_select": method_io_select,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "bank_switch_coarse": method_bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "write_command": method_write_command,
    "read_command": method_read_command,
    "read_status": method_read_status,
    "write_control": method_write_control,
    "execute_instruction": method_execute_instruction,
    "read_12bit": method_read_12bit,
    "write_12bit": method_write_12bit,
    "read_ir": method_read_ir,
    "write_ir": method_write_ir,
    "rtc_advance_seconds": method_rtc_advance_seconds,
    "huc3_device::execute_instruction": method_huc3_device__execute_instruction
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_tama5"]!.compiledMethods = (() => {
  function method_data_r(runtime: any, space: any) {
    const members = runtime.members;
    return (((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (240))) | ((((members.m_response ?? runtime.member("m_response"))) & (15))));
  }

  function method_data_w(runtime: any, data: any) {
    const members = runtime.members;
    switch ((members.m_command ?? runtime.member("m_command"))) {
      case 0:
      {
        members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom"))) & (16))) | (((data) & (15))))) & 0xff);
        (runtime.calls["set_bank_rom"] ? runtime.calls["set_bank_rom"]((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom"))) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom"))));
        break;
      }
      case 1:
      {
        members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom"))) & (15))) | (((((data) & (1))) << (4))))) & 0xff);
        (runtime.calls["set_bank_rom"] ? runtime.calls["set_bank_rom"]((members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom"))) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? runtime.member("m_bank_sel_rom"))));
        break;
      }
      case 4:
      {
        members.m_data = (((((((members.m_data ?? runtime.member("m_data"))) & (240))) | (((data) & (15))))) & 0xff);
        break;
      }
      case 5:
      {
        members.m_data = (((((((members.m_data ?? runtime.member("m_data"))) & (15))) | (((data) << (4))))) & 0xff);
        break;
      }
      case 6:
      {
        members.m_address = (((((((members.m_address ?? runtime.member("m_address"))) & (15))) | (((data) << (4))))) & 0xff);
        break;
      }
      case 7:
      {
        members.m_address = (((((((members.m_address ?? runtime.member("m_address"))) & (240))) | (((data) & (15))))) & 0xff);
        switch ((((members.m_address ?? runtime.member("m_address"))) & (224))) {
          case 0:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_registers"), (((members.m_address ?? runtime.member("m_address"))) & (31)), (members.m_data ?? runtime.member("m_data")));
            break;
          }
          case 32:
          {
            0;
            members.m_data = ((runtime.readIndex((members.m_registers ?? runtime.member("m_registers")), (((members.m_address ?? runtime.member("m_address"))) & (31)))) & 0xff);
            break;
          }
          case 64:
          {
            if (((Number((((members.m_address ?? runtime.member("m_address"))) & (31))) === Number(18)) ? 1 : 0)) {
              members.m_data = ((255) & 0xff);
            }
          }
          default:
          {
            0;
          }
        }
      }
    }
  }

  function method_command_w(runtime: any, data: any) {
    const members = runtime.members;
    switch (data) {
      case 0:
      case 1:
      case 4:
      case 5:
      case 6:
      case 7:
      {
        break;
      }
      case 10:
      {
        members.m_response = ((1) & 0xff);
        break;
      }
      case 12:
      {
        members.m_response = (((((members.m_data ?? runtime.member("m_data"))) & (15))) & 0xff);
        break;
      }
      case 13:
      {
        members.m_response = (((((members.m_data ?? runtime.member("m_data"))) >>> (4))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
    members.m_command = ((data) & 0xff);
  }
  return {
    "data_r": method_data_r,
    "data_w": method_data_w,
    "command_w": method_command_w
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_liebao"]!.compiledMethods = (() => {
  function method_enable_ram(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    let enable: any = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? 1 : 0)) ? 1 : 0);
    0;
    if (enable) {
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
  }

  function method_bank_switch_rom(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_set_bank_rom_low(runtime, ((((data) & 0xffff)) << (1)));
    if (((((members.m_bank_high_set ?? runtime.member("m_bank_high_set"))) || (((Number(((offset) & (255))) === Number(210)) ? 1 : 0))) ? 1 : 0)) {
      members.m_bank_high_set = ((0) & 0xff);
    } else {
      method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
    }
  }

  function method_set_bank_rom_low(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 0))).set_entry?.(entry) ?? 0);
  }

  function method_set_bank_rom_high(runtime: any, entry: any) {
    const members = runtime.members;
    const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
    entry = ((runtime.andAssign(entry, (members.m_bank_mask_rom ?? runtime.member("m_bank_mask_rom")))) & 0xffff);
    0;
    ((runtime.dereference(runtime.readIndex(h_m_bank_rom, 1))).set_entry?.(entry) ?? 0);
  }

  function method_bank_switch_ram(runtime: any, data: any) {
    const members = runtime.members;
    method_set_bank_ram(runtime, ((data) & (15)));
  }

  function method_set_bank_ram(runtime: any, entry: any) {
    const members = runtime.members;
    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_ram_entry(runtime: any) {
    const members = runtime.members;
    return (((((members.m_bank_sel_ram ?? runtime.member("m_bank_sel_ram"))) & ((members.m_bank_ram_mask ?? runtime.member("m_bank_ram_mask"))))) & ((members.m_bank_mask_ram ?? runtime.member("m_bank_mask_ram"))));
  }

  function method_bank_switch_rom_high(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    if (((Number(((offset) & (255))) === Number(210)) ? 1 : 0)) {
      members.m_bank_high_set = ((1) & 0xff);
      method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
    }
  }
  return {
    "enable_ram": method_enable_ram,
    "bank_switch_rom": method_bank_switch_rom,
    "set_bank_rom_low": method_set_bank_rom_low,
    "set_bank_rom_high": method_set_bank_rom_high,
    "bank_switch_ram": method_bank_switch_ram,
    "set_bank_ram": method_set_bank_ram,
    "bank_ram_entry": method_bank_ram_entry,
    "bank_switch_rom_high": method_bank_switch_rom_high
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
