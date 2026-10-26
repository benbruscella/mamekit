// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './gb_cart_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_is_readable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_is_writeable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_is_creatable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_image_type_name(runtime: any): any {
    const members = runtime.members;

    return "cartridge";
  }

  function method_image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "cart";
  }

  function method_get_software_list_loader(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["rom_software_list_loader::instance"] ? __l["rom_software_list_loader::instance"]() : runtime.macro("rom_software_list_loader::instance"));
  }

  function method_device_rom_image_interface__is_readable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_device_rom_image_interface__is_writeable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_device_rom_image_interface__is_creatable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_device_rom_image_interface__image_type_name(runtime: any): any {
    const members = runtime.members;

    return "romimage";
  }

  function method_device_rom_image_interface__image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "rom";
  }

  function method_device_cartrom_image_interface__image_type_name(runtime: any): any {
    const members = runtime.members;

    return "cartridge";
  }

  function method_device_cartrom_image_interface__image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "cart";
  }

  function method_cart_space(runtime: any): any {
    const members = runtime.members;

    const h_m_space = members.m_space ?? 0;
    return runtime.dereference(h_m_space);
  }

  function method_gb_cart_slot_device_base__is_reset_on_load(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_gb_cart_slot_device_base__cart_space(runtime: any): any {
    const members = runtime.members;

    const h_m_space = members.m_space ?? 0;
    return runtime.dereference(h_m_space);
  }

  function method_gb_cart_slot_device__image_interface(runtime: any): any {
    const members = runtime.members;

    return "gameboy_cart";
  }

  function method_gb_cart_slot_device__file_extensions(runtime: any): any {
    const members = runtime.members;

    return "bin,gb,gbc,gbx";
  }

  function method_cart_cgb_support_description(runtime: any, flags: any): any {
    const members = runtime.members;

    if ((((((flags) >>> (7)) & 1)) ? 0 : 1)) {
      return "unsupported";
    } else {
      if ((((flags) >>> (2)) & ((1 << (2)) - 1))) {
        return "PGB mode";
      } else {
        if ((((flags) >>> (6)) & 1)) {
          return "required";
        } else {
          return "enhanced";
        }
      }
    }
  }

  function method_cart_type_description(runtime: any, type: any): any {
    const members = runtime.members;

    switch ((type as number)) {
      case (members["cartheader::TYPE_ROM"] ?? 0):
      {
        return "flat ROM";
      }
      case (members["cartheader::TYPE_MBC1"] ?? 0):
      {
        return "Nintendo MBC1";
      }
      case (members["cartheader::TYPE_MBC1_RAM"] ?? 0):
      {
        return "Nintendo MBC1 with RAM";
      }
      case (members["cartheader::TYPE_MBC1_RAM_BATT"] ?? 0):
      {
        return "Nintendo MBC1 with battery-backed RAM";
      }
      case (members["cartheader::TYPE_MBC2"] ?? 0):
      {
        return "Nintendo MBC2";
      }
      case (members["cartheader::TYPE_MBC2_BATT"] ?? 0):
      {
        return "Nintendo MBC2 with backup battery";
      }
      case (members["cartheader::TYPE_ROM_RAM"] ?? 0):
      {
        return "flat ROM with RAM";
      }
      case (members["cartheader::TYPE_ROM_RAM_BATT"] ?? 0):
      {
        return "flat ROM with battery-backed RAM";
      }
      case (members["cartheader::TYPE_MMM01"] ?? 0):
      {
        return "Nintendo MMM01";
      }
      case (members["cartheader::TYPE_MMM01_RAM"] ?? 0):
      {
        return "Nintendo MMM01 with RAM";
      }
      case (members["cartheader::TYPE_MMM01_RAM_BATT"] ?? 0):
      {
        return "Nintendo MMM01 with battery-backed RAM";
      }
      case (members["cartheader::TYPE_MBC3_RTC_BATT"] ?? 0):
      {
        return "Nintendo MBC3 with backup battery and real-time clock crystal";
      }
      case (members["cartheader::TYPE_MBC3_RTC_RAM_BATT"] ?? 0):
      {
        return "Nintendo MBC3 with battery-backed RAM and real-time clock crystal";
      }
      case (members["cartheader::TYPE_MBC3"] ?? 0):
      {
        return "Nintendo MBC3";
      }
      case (members["cartheader::TYPE_MBC3_RAM"] ?? 0):
      {
        return "Nintendo MBC3 with RAM";
      }
      case (members["cartheader::TYPE_MBC3_RAM_BATT"] ?? 0):
      {
        return "Nintendo MBC3 with battery-backed RAM";
      }
      case (members["cartheader::TYPE_MBC5"] ?? 0):
      {
        return "Nintendo MBC5";
      }
      case (members["cartheader::TYPE_MBC5_RAM"] ?? 0):
      {
        return "Nintendo MBC5 with RAM";
      }
      case (members["cartheader::TYPE_MBC5_RAM_BATT"] ?? 0):
      {
        return "Nintendo MBC5 with battery-backed RAM";
      }
      case (members["cartheader::TYPE_MBC5_RUMBLE"] ?? 0):
      {
        return "Nintendo MBC5 with vibration motor";
      }
      case (members["cartheader::TYPE_MBC5_RUMBLE_RAM"] ?? 0):
      {
        return "Nintendo MBC5 with RAM and vibration motor";
      }
      case (members["cartheader::TYPE_MBC5_RUMBLE_RAM_BATT"] ?? 0):
      {
        return "Nintendo MBC5 with battery-backed RAM and vibration motor";
      }
      case (members["cartheader::TYPE_MBC6"] ?? 0):
      {
        return "Nintendo MBC6 with Flash memory and battery-backed RAM";
      }
      case (members["cartheader::TYPE_MBC7_ACCEL_EEPROM"] ?? 0):
      {
        return "Nintendo MBC7 with EEPROM and two-axis accelerometer";
      }
      case (members["cartheader::TYPE_UNLICENSED_YONGYONG"] ?? 0):
      {
        return "Yong Yong pirate";
      }
      case (members["cartheader::TYPE_CAMERA"] ?? 0):
      {
        return "Nintendo Game Boy Camera with battery-backed RAM";
      }
      case (members["cartheader::TYPE_TAMA5"] ?? 0):
      {
        return "Bandai TAMA5 with battery-backed TAMA6 and real-time clock";
      }
      case (members["cartheader::TYPE_HUC3"] ?? 0):
      {
        return "Hudson Soft HuC-3 with battery-baked RAM";
      }
      case (members["cartheader::TYPE_HUC1_RAM_BATT"] ?? 0):
      {
        return "Hudson Soft HuC-1 with battery-baked RAM";
      }
      default:
      {
        return "unknown";
      }
    }
  }

  function method_cart_region_description(runtime: any, region: any): any {
    const members = runtime.members;

    switch ((region as number)) {
      case 0:
      {
        return "Japan";
      }
      case 1:
      {
        return "export";
      }
      default:
      {
        return "unknown";
      }
    }
  }
  return {
    "is_readable": method_is_readable,
    "is_writeable": method_is_writeable,
    "is_creatable": method_is_creatable,
    "image_type_name": method_image_type_name,
    "image_brief_type_name": method_image_brief_type_name,
    "get_software_list_loader": method_get_software_list_loader,
    "device_rom_image_interface::is_readable": method_device_rom_image_interface__is_readable,
    "device_rom_image_interface::is_writeable": method_device_rom_image_interface__is_writeable,
    "device_rom_image_interface::is_creatable": method_device_rom_image_interface__is_creatable,
    "device_rom_image_interface::image_type_name": method_device_rom_image_interface__image_type_name,
    "device_rom_image_interface::image_brief_type_name": method_device_rom_image_interface__image_brief_type_name,
    "device_cartrom_image_interface::image_type_name": method_device_cartrom_image_interface__image_type_name,
    "device_cartrom_image_interface::image_brief_type_name": method_device_cartrom_image_interface__image_brief_type_name,
    "cart_space": method_cart_space,
    "gb_cart_slot_device_base::is_reset_on_load": method_gb_cart_slot_device_base__is_reset_on_load,
    "gb_cart_slot_device_base::cart_space": method_gb_cart_slot_device_base__cart_space,
    "gb_cart_slot_device::image_interface": method_gb_cart_slot_device__image_interface,
    "gb_cart_slot_device::file_extensions": method_gb_cart_slot_device__file_extensions,
    "cart_cgb_support_description": method_cart_cgb_support_description,
    "cart_type_description": method_cart_type_description,
    "cart_region_description": method_cart_region_description
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["rom_software_list_loader::instance"];
definition.slot!.options["rom"]!.compiledMethods = (() => {


  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_wisdom"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_banked_32k_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_bank_rom_switch(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom(runtime, offset);
  }

  function method_set_bank_rom(runtime: any, entry: any): any {
    const members = runtime.members;

    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_wisdom_device__bank_rom_switch(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom(runtime, offset);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "banked_32k_device_base::set_bank_bits_rom": method_banked_32k_device_base__set_bank_bits_rom,
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom,
    "wisdom_device::bank_rom_switch": method_wisdom_device__bank_rom_switch,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_wisdom"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_yong"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_mbc_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_bank_rom_switch(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom(runtime, data);
  }

  function method_set_bank_rom(runtime: any, entry: any): any {
    const members = runtime.members;

    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "mbc_device_base::set_bank_bits_rom": method_mbc_device_base__set_bank_bits_rom,
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_yong"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_rock8"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_mbc_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_bank_rom_switch(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((((data) & (31))) & 0xff);
    method_set_bank_rom(runtime, ((((data) ? 0 : 1)) ? (1) : (((((Number(15) < Number(data)) ? 1 : 0)) ? (((data) - (8))) : (data)))));
  }

  function method_set_bank_rom(runtime: any, entry: any): any {
    const members = runtime.members;

    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "mbc_device_base::set_bank_bits_rom": method_mbc_device_base__set_bank_bits_rom,
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_rock8"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_sachen1"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_uniform_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_mbc_dual_uniform_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_uniform_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_rom_read(runtime: any, offset: any, spoof: any): any {
    const members = runtime.members;

    if (spoof) {
      offset = ((offset) | (128));
    }
    if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
      offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
    }
    return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
  }

  function method_bank_rom_switch_outer(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    if (((Number(48) === Number(((h_m_bank_sel_rom[1]) & (48)))) ? 1 : 0)) {
      h_m_bank_sel_rom[0] = data;
      method_update_banks(runtime);
    }
  }

  function method_update_banks(runtime: any): any {
    const members = runtime.members;

    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    method_set_bank_rom_low(runtime, lo);
    method_set_bank_rom_high(runtime, hi);
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) & 0xff);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) | (((h_m_bank_sel_rom[1]) & ((~(members.m_bank_mux_rom ?? 0))))))) & 0xff);
  }

  function method_set_bank_rom_low(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(entry) ?? 0);
  }

  function method_set_bank_rom_high(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(entry) ?? 0);
  }

  function method_bank_rom_switch_inner(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    h_m_bank_sel_rom[1] = ((data) ? (data) : (1));
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    method_set_bank_rom_high(runtime, hi);
  }

  function method_bank_rom_mux(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    if (((Number(48) === Number(((h_m_bank_sel_rom[1]) & (48)))) ? 1 : 0)) {
      members.m_bank_mux_rom = ((data) & 0xff);
      method_update_banks(runtime);
    }
  }

  function method_sachen_mmc_device_base__rom_read(runtime: any, offset: any, spoof: any): any {
    const members = runtime.members;

    if (spoof) {
      offset = ((offset) | (128));
    }
    if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
      offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
    }
    return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
  }

  function method_sachen_mmc_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) & 0xff);
  }

  function method_sachen_mmc_device_base__bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) | (((h_m_bank_sel_rom[1]) & ((~(members.m_bank_mux_rom ?? 0))))))) & 0xff);
  }

  function method_read_rom(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      if (((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0)) {
        members.m_counter = ((((members.m_counter) + (1))) & 0xff);
      }
    }
    return ((method_rom_read(runtime, offset, ((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0))) & 0xff);
  }

  function method_sachen_mmc1_device__read_rom(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      if (((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0)) {
        members.m_counter = ((((members.m_counter) + (1))) & 0xff);
      }
    }
    return ((method_rom_read(runtime, offset, ((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0))) & 0xff);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "mbc_dual_uniform_device_base::set_bank_bits_rom": method_mbc_dual_uniform_device_base__set_bank_bits_rom,
    "mbc_dual_uniform_device_base::bank_rom_low_base": method_mbc_dual_uniform_device_base__bank_rom_low_base,
    "mbc_dual_uniform_device_base::bank_rom_high_base": method_mbc_dual_uniform_device_base__bank_rom_high_base,
    "rom_read": method_rom_read,
    "bank_rom_switch_outer": method_bank_rom_switch_outer,
    "update_banks": method_update_banks,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "set_bank_rom_low": method_set_bank_rom_low,
    "set_bank_rom_high": method_set_bank_rom_high,
    "bank_rom_switch_inner": method_bank_rom_switch_inner,
    "bank_rom_mux": method_bank_rom_mux,
    "sachen_mmc_device_base::rom_read": method_sachen_mmc_device_base__rom_read,
    "sachen_mmc_device_base::bank_rom_entry_low": method_sachen_mmc_device_base__bank_rom_entry_low,
    "sachen_mmc_device_base::bank_rom_entry_high": method_sachen_mmc_device_base__bank_rom_entry_high,
    "read_rom": method_read_rom,
    "sachen_mmc1_device::read_rom": method_sachen_mmc1_device__read_rom,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_sachen1"]!.compiledMethodLinks = ["machine","machine().side_effects_disabled","std::bit_width","std::forward"];
definition.slot!.options["rom_lasama"]!.compiledMethods = (() => {


  function method_bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_ctrl_2080_w(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_fine(runtime, ((data) & (3)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[1] = entry;
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    let coarse: any = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
    return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
  }

  function method_ctrl_6000_w(runtime: any, data: any): any {
    const members = runtime.members;

    if ((((((data) >>> (7)) & 1)) ? 0 : 1)) {
      method_set_bank_rom_coarse(runtime, (((data) >>> (1)) & 1));
    }
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[0] = entry;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "bank_rom_coarse": method_bank_rom_coarse,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
    "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
    "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
    "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
    "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
    "ctrl_2080_w": method_ctrl_2080_w,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "ctrl_6000_w": method_ctrl_6000_w,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_lasama"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_mbc1"]!.compiledMethods = (() => {


  function method_bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_bank_switch_coarse(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_lines = members.m_bank_lines ?? 0;
    method_set_bank_rom_coarse(runtime, ((data) & (h_m_bank_lines[1])));
    method_set_bank_ram(runtime, ((data) & (h_m_bank_lines[1])));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[0] = entry;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    let coarse: any = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
    return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_enable_ram(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_ram_enable(runtime, ((Number(10) === Number(((data) & (15)))) ? 1 : 0));
  }

  function method_set_ram_enable(runtime: any, enable: any): any {
    const members = runtime.members;

    0;
    if (enable) {
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
  }

  function method_bank_switch_fine(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((((data) & (31))) & 0xff);
    method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_lines = members.m_bank_lines ?? 0;
    method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (h_m_bank_lines[0])));
  }

  function method_mbc_dual_device_base__set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[1] = entry;
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_low_mask(runtime: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((((data) ? (3) : (0))) & 0xff)) & 0xff);
    0;
    method_set_bank_rom_low_coarse_mask(runtime, mask);
    method_set_bank_ram_mask(runtime, mask);
  }

  function method_set_bank_rom_low_coarse_mask(runtime: any, mask: any): any {
    const members = runtime.members;

    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_rom_coarse_mask[0] = mask;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
  }

  function method_set_bank_ram_mask(runtime: any, mask: any): any {
    const members = runtime.members;

    members.m_bank_ram_mask = ((mask) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      let entry: any = ((((method_bank_ram_entry(runtime)) & 0xff)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "bank_rom_coarse": method_bank_rom_coarse,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
    "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
    "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
    "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
    "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "bank_switch_coarse": method_bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "set_bank_ram": method_set_bank_ram,
    "enable_ram": method_enable_ram,
    "set_ram_enable": method_set_ram_enable,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
    "bank_low_mask": method_bank_low_mask,
    "set_bank_rom_low_coarse_mask": method_set_bank_rom_low_coarse_mask,
    "set_bank_ram_mask": method_set_bank_ram_mask,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc1"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_mbc2"]!.compiledMethods = (() => {


  function method_ram_mbc_read(runtime: any, space: any, offset: any): any {
    const members = runtime.members;

    if ((members.m_ram_mbc_enable ?? 0)) {
      return ((((((runtime.readIndex((members.m_ram_mbc ?? 0), offset)) & (15))) | ((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (240))))) & 0xff);
    } else {
      return (((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & 0xff);
    }
  }

  function method_ram_mbc_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if ((members.m_ram_mbc_enable ?? 0)) {
      runtime.writeIndex(runtime.writableMember("m_ram_mbc"), offset, ((data) & (15)));
    }
  }

  function method_ram_mbc_enable(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_ram_mbc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    0;
  }

  function method_bank_rom_switch(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    data = ((((data) & (15))) & 0xff);
    (__l["set_bank_rom"] ? __l["set_bank_rom"](((data) ? (data) : (1))) : runtime.macro("set_bank_rom", ((data) ? (data) : (1))));
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "ram_mbc_read": method_ram_mbc_read,
    "ram_mbc_write": method_ram_mbc_write,
    "ram_mbc_enable": method_ram_mbc_enable,
    "bank_rom_switch": method_bank_rom_switch,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc2"]!.compiledMethodLinks = ["set_bank_rom","std::bit_width","std::forward"];
definition.slot!.options["rom_mbc3"]!.compiledMethods = (() => {


  function method_bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_nvram_can_write(runtime: any): any {
    const members = runtime.members;

    return (members.m_has_battery ?? 0);
  }

  function method_enable_ram_rtc(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_rtc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    if ((((members.m_rtc_enable ?? 0)) ? 0 : 1)) {
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

  function method_rtc_select(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_rtc_select ?? 0)) >>> (3)) & 1);
  }

  function method_bank_switch_fine(runtime: any, data: any): any {
    const members = runtime.members;

    data = ((((data) & (127))) & 0xff);
    method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[1] = entry;
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    let coarse: any = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
    return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
  }

  function method_select_ram_rtc(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_coarse(runtime, ((data) & (7)));
    method_set_bank_ram(runtime, ((data) & (7)));
    members.m_rtc_select = ((data) & 0xff);
    if ((members.m_rtc_enable ?? 0)) {
      if ((((data) >>> (3)) & 1)) {
        0;
        ((runtime.dereference(members.m_view_ram)).select?.(1) ?? 0);
      } else {
        0;
        ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
      }
    }
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[0] = entry;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_latch_rtc(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_rtc_regs = members.m_rtc_regs ?? 0;
    0;
    if ((((((((((members.m_rtc_latch ?? 0)) >>> (0)) & 1)) ? 0 : 1)) && ((((data) >>> (0)) & 1))) ? 1 : 0)) {
      0;
      (__l["std::copy"] ? __l["std::copy"]((__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[0]) : runtime.macro("std::begin", h_m_rtc_regs[0])), (__l["std::end"] ? __l["std::end"](h_m_rtc_regs[0]) : runtime.macro("std::end", h_m_rtc_regs[0])), (__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[1]) : runtime.macro("std::begin", h_m_rtc_regs[1]))) : runtime.macro("std::copy", (__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[0]) : runtime.macro("std::begin", h_m_rtc_regs[0])), (__l["std::end"] ? __l["std::end"](h_m_rtc_regs[0]) : runtime.macro("std::end", h_m_rtc_regs[0])), (__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[1]) : runtime.macro("std::begin", h_m_rtc_regs[1]))));
    }
    members.m_rtc_latch = ((data) & 0xff);
  }

  function method_read_rtc(runtime: any, space: any): any {
    const members = runtime.members;

    const h_m_rtc_regs = members.m_rtc_regs ?? 0;
    let reg: any = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
    if (((Number(((h_m_rtc_regs[1])?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
      0;
      return ((runtime.readIndex(h_m_rtc_regs[1], reg)) & 0xff);
    } else {
      0;
      return (((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & 0xff);
    }
  }

  function method_rtc_register(runtime: any): any {
    const members = runtime.members;

    return (((members.m_rtc_select ?? 0)) & (7));
  }

  function method_write_rtc(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_rtc_regs = members.m_rtc_regs ?? 0;
    let reg: any = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
    if (((Number(((h_m_rtc_regs[0])?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
      0;
      if (((Number(4) === Number(reg)) ? 1 : 0)) {
        data = ((((data) & (193))) & 0xff);
        runtime.writeIndex(h_m_rtc_regs[0], reg, data);
      } else {
        runtime.writeIndex(h_m_rtc_regs[0], reg, data);
      }
    } else {
      0;
    }
  }

  function method_rtc_advance_seconds(runtime: any, param: any): any {
    const members = runtime.members;

    const h_m_rtc_regs = members.m_rtc_regs ?? 0;
    if ((((runtime.readIndex(h_m_rtc_regs[0], 4)) >>> (6)) & 1)) {
      return;
    }
    if (runtime.invoke("rtc_increment", 0)) {
      return;
    }
    if (runtime.invoke("rtc_increment", 1)) {
      return;
    }
    if (runtime.invoke("rtc_increment", 2)) {
      return;
    }
    if ((runtime.writeIndex(h_m_rtc_regs[0], 3, ((runtime.readIndex(h_m_rtc_regs[0], 3)) + (1))))) {
      return;
    }
    if ((((runtime.readIndex(h_m_rtc_regs[0], 4)) >>> (0)) & 1)) {
      0;
      runtime.writeIndex(h_m_rtc_regs[0], 4, ((runtime.readIndex(h_m_rtc_regs[0], 4)) | (128)));
    }
    runtime.writeIndex(h_m_rtc_regs[0], 4, ((runtime.readIndex(h_m_rtc_regs[0], 4)) ^ (1)));
  }

  function method_mbc3_device_base__rtc_select(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_rtc_select ?? 0)) >>> (3)) & 1);
  }

  function method_mbc3_device_base__rtc_register(runtime: any): any {
    const members = runtime.members;

    return (((members.m_rtc_select ?? 0)) & (7));
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "bank_rom_coarse": method_bank_rom_coarse,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
    "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
    "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
    "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
    "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "nvram_can_write": method_nvram_can_write,
    "enable_ram_rtc": method_enable_ram_rtc,
    "rtc_select": method_rtc_select,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "select_ram_rtc": method_select_ram_rtc,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "set_bank_ram": method_set_bank_ram,
    "latch_rtc": method_latch_rtc,
    "read_rtc": method_read_rtc,
    "rtc_register": method_rtc_register,
    "write_rtc": method_write_rtc,
    "rtc_advance_seconds": method_rtc_advance_seconds,
    "mbc3_device_base::rtc_select": method_mbc3_device_base__rtc_select,
    "mbc3_device_base::rtc_register": method_mbc3_device_base__rtc_register,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc3"]!.compiledMethodLinks = ["std::begin","std::bit_width","std::copy","std::end","std::forward"];
definition.slot!.options["rom_mbc5"]!.compiledMethods = (() => {


  function method_bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_rom_mbc_device_base__bank_switch_coarse(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_lines = members.m_bank_lines ?? 0;
    method_set_bank_rom_coarse(runtime, ((data) & (h_m_bank_lines[1])));
    method_set_bank_ram(runtime, ((data) & (h_m_bank_lines[1])));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[0] = entry;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    let coarse: any = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
    return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_enable_ram(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_ram_enable(runtime, ((Number(10) === Number(data)) ? 1 : 0));
  }

  function method_set_ram_enable(runtime: any, enable: any): any {
    const members = runtime.members;

    0;
    if (enable) {
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
  }

  function method_bank_switch_fine_low(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (256))) | (((data) & 0xffff))));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_lines = members.m_bank_lines ?? 0;
    method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (h_m_bank_lines[0])));
  }

  function method_mbc_dual_device_base__set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[1] = entry;
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_switch_fine_high(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (255))) | (((((((data) & (1))) & 0xffff)) << (8)))));
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "bank_rom_coarse": method_bank_rom_coarse,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
    "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
    "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
    "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
    "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "rom_mbc_device_base::bank_switch_coarse": method_rom_mbc_device_base__bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "set_bank_ram": method_set_bank_ram,
    "enable_ram": method_enable_ram,
    "set_ram_enable": method_set_ram_enable,
    "bank_switch_fine_low": method_bank_switch_fine_low,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
    "bank_switch_fine_high": method_bank_switch_fine_high,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mbc5"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_m161"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_banked_32k_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_bank_rom_switch(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if ((((members.m_bank_lock ?? 0)) ? 0 : 1)) {
      members.m_bank_lock = ((1) & 0xff);
      method_set_bank_rom(runtime, ((data) & (7)));
    }
  }

  function method_set_bank_rom(runtime: any, entry: any): any {
    const members = runtime.members;

    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_m161_device__bank_rom_switch(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if ((((members.m_bank_lock ?? 0)) ? 0 : 1)) {
      members.m_bank_lock = ((1) & 0xff);
      method_set_bank_rom(runtime, ((data) & (7)));
    }
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "banked_32k_device_base::set_bank_bits_rom": method_banked_32k_device_base__set_bank_bits_rom,
    "bank_rom_switch": method_bank_rom_switch,
    "set_bank_rom": method_set_bank_rom,
    "m161_device::bank_rom_switch": method_m161_device__bank_rom_switch,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_m161"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_mmm01"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_uniform_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_mbc_dual_uniform_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_uniform_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_enable_ram(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
    if (((Number(10) === Number(((data) & (15)))) ? 1 : 0)) {
      0;
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      0;
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
    if ((members.m_config ?? 0)) {
      h_m_bank_prot_sel[0] = (((data) >>> (4)) & ((1 << (2)) - 1));
      0;
      if ((((data) >>> (6)) & 1)) {
        0;
        members.m_config = ((0) & 0xff);
        method_update_bank_rom_low(runtime);
        method_update_bank_rom_high(runtime);
      }
    }
  }

  function method_update_bank_rom_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
    const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
    let entry: any = ((0) & 0xffff);
    if ((((members.m_config ?? 0)) ? 0 : 1)) {
      entry = (((((((((members.m_bank_sel_rom_coarse ?? 0)) & 0xffff)) << (7))) | ((((members.m_bank_sel_rom_fine ?? 0)) & (h_m_bank_prot_sel[1]))))) & 0xffff);
      if ((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) {
        entry = ((((entry) | (((h_m_bank_sel_mid[1]) << (5))))) & 0xffff);
      } else {
        if ((members.m_bank_low_mid ?? 0)) {
          entry = ((((entry) | (((h_m_bank_sel_mid[0]) << (5))))) & 0xffff);
        }
      }
    } else {
      entry = ((510) & 0xffff);
    }
    method_set_bank_rom_low(runtime, entry);
  }

  function method_set_bank_rom_low(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(entry) ?? 0);
  }

  function method_update_bank_rom_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
    const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
    let entry: any = ((0) & 0xffff);
    if ((((members.m_config ?? 0)) ? 0 : 1)) {
      entry = (((((((((members.m_bank_sel_rom_coarse ?? 0)) & 0xffff)) << (7))) | ((members.m_bank_sel_rom_fine ?? 0)))) & 0xffff);
      if ((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) {
        entry = ((((entry) | (((h_m_bank_sel_mid[1]) << (5))))) & 0xffff);
      } else {
        entry = ((((entry) | (((h_m_bank_sel_mid[0]) << (5))))) & 0xffff);
      }
    } else {
      entry = ((((510) | ((members.m_bank_sel_rom_fine ?? 0)))) & 0xffff);
    }
    if ((((((members.m_bank_sel_rom_fine ?? 0)) & ((~h_m_bank_prot_sel[1])))) ? 0 : 1)) {
      entry = ((((entry) | (1))) & 0xffff);
    }
    method_set_bank_rom_high(runtime, entry);
  }

  function method_set_bank_rom_high(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(entry) ?? 0);
  }

  function method_bank_switch_fine(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
    const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
    members.m_bank_sel_rom_fine = (((((((members.m_bank_sel_rom_fine ?? 0)) & (h_m_bank_prot_sel[1]))) | ((((((data) >>> (0)) & ((1 << (5)) - 1))) & ((~h_m_bank_prot_sel[1])))))) & 0xff);
    0;
    if ((members.m_config ?? 0)) {
      h_m_bank_sel_mid[1] = (((data) >>> (5)) & ((1 << (2)) - 1));
      0;
    }
    method_update_bank_rom_high(runtime);
    if (((((members.m_config ?? 0)) && ((members.m_mode_large_prg ?? 0))) ? 1 : 0)) {
      method_update_bank_ram(runtime);
    }
  }

  function method_update_bank_ram(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
    let entry: any = (((((((members.m_bank_sel_ram_coarse ?? 0)) << (2))) & 0xff)) & 0xff);
    if ((members.m_mode_large_prg ?? 0)) {
      entry = ((((entry) | (h_m_bank_sel_mid[1]))) & 0xff);
    } else {
      if ((members.m_bank_low_mid ?? 0)) {
        entry = ((((entry) | (h_m_bank_sel_mid[0]))) & 0xff);
      }
    }
    method_set_bank_ram(runtime, entry);
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_switch_coarse(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
    const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
    h_m_bank_sel_mid[0] = ((((h_m_bank_sel_mid[0]) & (h_m_bank_prot_sel[0]))) | ((((((data) >>> (0)) & ((1 << (2)) - 1))) & ((~h_m_bank_prot_sel[0])))));
    0;
    if ((members.m_config ?? 0)) {
      members.m_bank_sel_ram_coarse = (((((data) >>> (2)) & ((1 << (2)) - 1))) & 0xff);
      members.m_bank_sel_rom_coarse = (((((data) >>> (4)) & ((1 << (2)) - 1))) & 0xff);
      members.m_bank_prot_low_mid = (((((data) >>> (6)) & 1)) & 0xff);
      0;
    }
    if (((((members.m_config ?? 0)) || (((((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) && ((members.m_bank_low_mid ?? 0))) ? 1 : 0))) ? 1 : 0)) {
      method_update_bank_ram(runtime);
    }
  }

  function method_enable_bank_low_mid(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
    if ((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) {
      members.m_bank_low_mid = (((((data) >>> (0)) & 1)) & 0xff);
      0;
    }
    if ((members.m_config ?? 0)) {
      h_m_bank_prot_sel[1] = (((((data) >>> (2)) & ((1 << (4)) - 1))) << (1));
      members.m_mode_large_prg = (((((data) >>> (6)) & 1)) & 0xff);
      0;
    }
    if (((((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) && ((((members.m_config ?? 0)) ? 0 : 1))) ? 1 : 0)) {
      method_update_bank_rom_low(runtime);
    }
    if ((members.m_config ?? 0)) {
      method_update_bank_rom_high(runtime);
    }
    if (((((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) || ((members.m_config ?? 0))) ? 1 : 0)) {
      method_update_bank_ram(runtime);
    }
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "mbc_dual_uniform_device_base::set_bank_bits_rom": method_mbc_dual_uniform_device_base__set_bank_bits_rom,
    "mbc_dual_uniform_device_base::bank_rom_low_base": method_mbc_dual_uniform_device_base__bank_rom_low_base,
    "mbc_dual_uniform_device_base::bank_rom_high_base": method_mbc_dual_uniform_device_base__bank_rom_high_base,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "enable_ram": method_enable_ram,
    "update_bank_rom_low": method_update_bank_rom_low,
    "set_bank_rom_low": method_set_bank_rom_low,
    "update_bank_rom_high": method_update_bank_rom_high,
    "set_bank_rom_high": method_set_bank_rom_high,
    "bank_switch_fine": method_bank_switch_fine,
    "update_bank_ram": method_update_bank_ram,
    "set_bank_ram": method_set_bank_ram,
    "bank_switch_coarse": method_bank_switch_coarse,
    "enable_bank_low_mid": method_enable_bank_low_mid,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_mmm01"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_camera"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_n = members.m_n ?? 0;
    const h_m_vh = members.m_vh ?? 0;
    const h_m_e = members.m_e ?? 0;
    const h_m_z = members.m_z ?? 0;
    const h_m_i = members.m_i ?? 0;
    const h_m_c = members.m_c ?? 0;
    const h_m_o = members.m_o ?? 0;
    const h_m_v = members.m_v ?? 0;
    const h_m_g = members.m_g ?? 0;
    method_mbc_ram_device_base__device_start(runtime);
    for (let __range0: any = (members.m_threshold ?? 0), __range0_index: any = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
      for (let __range1: any = runtime.readIndex(__range0, __range0_index), __range1_index: any = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
        (__l["std::fill"] ? __l["std::fill"]((__l["std::begin"] ? __l["std::begin"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::begin", runtime.readIndex(__range1, __range1_index))), (__l["std::end"] ? __l["std::end"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::end", runtime.readIndex(__range1, __range1_index))), 0) : runtime.macro("std::fill", (__l["std::begin"] ? __l["std::begin"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::begin", runtime.readIndex(__range1, __range1_index))), (__l["std::end"] ? __l["std::end"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::end", runtime.readIndex(__range1, __range1_index))), 0));
      }
    }
    h_m_n[0] = 0;
    h_m_vh[0] = 0;
    h_m_e[0] = 0;
    h_m_z[0] = 0;
    h_m_i[0] = 0;
    h_m_c[0] = 0;
    h_m_o[0] = 0;
    h_m_v[0] = 0;
    h_m_g[0] = 0;
    members.m_p = ((0) & 0xff);
    members.m_m = ((0) & 0xff);
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_busy ?? 0)) : runtime.macro("NAME", (members.m_busy ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_busy ?? 0)) : runtime.macro("NAME", (members.m_busy ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_ram_writable ?? 0)) : runtime.macro("NAME", (members.m_ram_writable ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_ram_writable ?? 0)) : runtime.macro("NAME", (members.m_ram_writable ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_threshold ?? 0)) : runtime.macro("NAME", (members.m_threshold ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_threshold ?? 0)) : runtime.macro("NAME", (members.m_threshold ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_sel_pm ?? 0)) : runtime.macro("NAME", (members.m_sel_pm ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_sel_pm ?? 0)) : runtime.macro("NAME", (members.m_sel_pm ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_n) : runtime.macro("NAME", h_m_n))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_n) : runtime.macro("NAME", h_m_n))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_vh) : runtime.macro("NAME", h_m_vh))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_vh) : runtime.macro("NAME", h_m_vh))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_e) : runtime.macro("NAME", h_m_e))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_e) : runtime.macro("NAME", h_m_e))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_z) : runtime.macro("NAME", h_m_z))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_z) : runtime.macro("NAME", h_m_z))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_i) : runtime.macro("NAME", h_m_i))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_i) : runtime.macro("NAME", h_m_i))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_c) : runtime.macro("NAME", h_m_c))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_c) : runtime.macro("NAME", h_m_c))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_o) : runtime.macro("NAME", h_m_o))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_o) : runtime.macro("NAME", h_m_o))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_v) : runtime.macro("NAME", h_m_v))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_v) : runtime.macro("NAME", h_m_v))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_g) : runtime.macro("NAME", h_m_g))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_g) : runtime.macro("NAME", h_m_g))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_p ?? 0)) : runtime.macro("NAME", (members.m_p ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_p ?? 0)) : runtime.macro("NAME", (members.m_p ?? 0)))));
    (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_m ?? 0)) : runtime.macro("NAME", (members.m_m ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_m ?? 0)) : runtime.macro("NAME", (members.m_m ?? 0)))));
  }

  function method_mbc_ram_device_base__device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    method_mbc_device_base__device_start(runtime);
    ((runtime.dereference((members.this ?? 0))).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_bank_sel_ram ?? 0)) : runtime.macro("NAME", (members.m_bank_sel_ram ?? 0)))) ?? 0);
    ((runtime.dereference((members.this ?? 0))).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_bank_mask_ram ?? 0)) : runtime.macro("NAME", (members.m_bank_mask_ram ?? 0)))) ?? 0);
  }

  function method_mbc_device_base__device_start(runtime: any): any {
    const members = runtime.members;


  }

  function method_mbc_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_enable_ram(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_ram_writable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    0;
  }

  function method_bank_switch_rom(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom(runtime, ((data) & (63)));
  }

  function method_set_bank_rom(runtime: any, entry: any): any {
    const members = runtime.members;

    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
  }

  function method_bank_switch_ram(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_ram(runtime, ((data) & (15)));
    0;
    if ((((data) >>> (4)) & 1)) {
      ((runtime.dereference(members.m_view_cam)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_cam)).disable === 'function' ? (runtime.dereference(members.m_view_cam)).disable() : typeof (runtime.dereference(members.m_view_cam)).disable === 'number' || typeof (runtime.dereference(members.m_view_cam)).disable === 'boolean' ? (runtime.dereference(members.m_view_cam)).disable : runtime.container(members.m_view_cam, "disable"));
    }
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_read_ram(runtime: any, offset: any): any {
    const members = runtime.members;

    return (((((((members.m_busy ?? 0)) ? 0 : 1)) ? (runtime.readIndex(method_bank_ram_base(runtime), offset)) : (0))) & 0xff);
  }

  function method_write_ram(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((((((members.m_busy ?? 0)) ? 0 : 1)) && ((members.m_ram_writable ?? 0))) ? 1 : 0)) {
      runtime.writeIndex(method_bank_ram_base(runtime), offset, data);
    }
  }

  function method_read_camera(runtime: any, offset: any): any {
    const members = runtime.members;

    switch ((offset as number)) {
      case 0:
      {
        return (((((((members.m_sel_pm ?? 0)) << (1))) | ((members.m_busy ?? 0)))) & 0xff);
      }
      default:
      {
        return ((0) & 0xff);
      }
    }
  }

  function method_write_camera(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_n = members.m_n ?? 0;
    const h_m_vh = members.m_vh ?? 0;
    const h_m_g = members.m_g ?? 0;
    const h_m_c = members.m_c ?? 0;
    const h_m_e = members.m_e ?? 0;
    const h_m_i = members.m_i ?? 0;
    const h_m_v = members.m_v ?? 0;
    const h_m_z = members.m_z ?? 0;
    const h_m_o = members.m_o ?? 0;
    switch ((offset as number)) {
      case 0:
      {
        members.m_sel_pm = (((((data) >>> (1)) & ((1 << (2)) - 1))) & 0xff);
        0;
        if ((((data) >>> (0)) & 1)) {
          if ((((members.m_busy ?? 0)) ? 0 : 1)) {
            (__l["start_capture"] ? __l["start_capture"]() : runtime.macro("start_capture"));
          } else {
            0;
          }
        }
        break;
      }
      case 1:
      {
        h_m_n[0] = (((data) >>> (7)) & 1);
        h_m_vh[0] = (((data) >>> (5)) & ((1 << (2)) - 1));
        h_m_g[0] = (((data) >>> (0)) & ((1 << (5)) - 1));
        0;
        break;
      }
      case 2:
      {
        h_m_c[0] = ((((h_m_c[0]) & (255))) | (((((data) & 0xffff)) << (8))));
        0;
        break;
      }
      case 3:
      {
        h_m_c[0] = ((((h_m_c[0]) & (65280))) | (data));
        0;
        break;
      }
      case 4:
      {
        h_m_e[0] = (((data) >>> (4)) & ((1 << (4)) - 1));
        h_m_i[0] = (((data) >>> (3)) & 1);
        h_m_v[0] = (((data) >>> (0)) & ((1 << (3)) - 1));
        0;
        break;
      }
      case 5:
      {
        h_m_z[0] = (((data) >>> (6)) & ((1 << (2)) - 1));
        h_m_o[0] = (((data) >>> (0)) & ((1 << (6)) - 1));
        0;
        break;
      }
    }
  }

  function method_output_ref_volts(runtime: any, value: any): any {
    const members = runtime.members;

    return (((((value) >>> (0)) & ((1 << (5)) - 1))) / ((((((value) >>> (5)) & 1)) ? (31) : (-31))));
  }

  function method_output_node_bias_volts(runtime: any, value: any): any {
    const members = runtime.members;

    return ((0.5) * (value));
  }

  function method_output_gain_db(runtime: any, value: any): any {
    const members = runtime.members;

    return ((runtime.add(runtime.add(28, (((((value) >>> (0)) & ((1 << (4)) - 1))) * (3))), (((((((value) >>> (4)) & 1)) * (6))) * (2)))) * (0.5));
  }

  function method_camera_device__output_ref_volts(runtime: any, value: any): any {
    const members = runtime.members;

    return (((((value) >>> (0)) & ((1 << (5)) - 1))) / ((((((value) >>> (5)) & 1)) ? (31) : (-31))));
  }

  function method_camera_device__output_node_bias_volts(runtime: any, value: any): any {
    const members = runtime.members;

    return ((0.5) * (value));
  }

  function method_camera_device__output_gain_db(runtime: any, value: any): any {
    const members = runtime.members;

    return ((runtime.add(runtime.add(28, (((((value) >>> (0)) & ((1 << (4)) - 1))) * (3))), (((((((value) >>> (4)) & 1)) * (6))) * (2)))) * (0.5));
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "device_start": method_device_start,
    "mbc_ram_device_base::device_start": method_mbc_ram_device_base__device_start,
    "mbc_device_base::device_start": method_mbc_device_base__device_start,
    "mbc_device_base::set_bank_bits_rom": method_mbc_device_base__set_bank_bits_rom,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "enable_ram": method_enable_ram,
    "bank_switch_rom": method_bank_switch_rom,
    "set_bank_rom": method_set_bank_rom,
    "bank_switch_ram": method_bank_switch_ram,
    "set_bank_ram": method_set_bank_ram,
    "read_ram": method_read_ram,
    "write_ram": method_write_ram,
    "read_camera": method_read_camera,
    "write_camera": method_write_camera,
    "output_ref_volts": method_output_ref_volts,
    "output_node_bias_volts": method_output_node_bias_volts,
    "output_gain_db": method_output_gain_db,
    "camera_device::output_ref_volts": method_camera_device__output_ref_volts,
    "camera_device::output_node_bias_volts": method_camera_device__output_node_bias_volts,
    "camera_device::output_gain_db": method_camera_device__output_gain_db,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_camera"]!.compiledMethodLinks = ["NAME","save_item","start_capture","std::begin","std::bit_width","std::end","std::fill","std::forward"];
definition.slot!.options["rom_camera"]!.children![0]!.definition.compiledMethods = (() => {


  function method_is_readable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_is_writeable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_is_creatable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_is_reset_on_load(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_file_extensions(runtime: any): any {
    const members = runtime.members;

    return "png,jpg,jpeg,jfif,bmp,dib";
  }

  function method_image_type_name(runtime: any): any {
    const members = runtime.members;

    return "picture";
  }

  function method_image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "pic";
  }

  function method_get_bitmap(runtime: any): any {
    const members = runtime.members;

    const h_m_picture = members.m_picture ?? 0;
    return h_m_picture;
  }

  function method_picture_image_device__is_readable(runtime: any): any {
    const members = runtime.members;

    return 1;
  }

  function method_picture_image_device__is_writeable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_picture_image_device__is_creatable(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_picture_image_device__is_reset_on_load(runtime: any): any {
    const members = runtime.members;

    return 0;
  }

  function method_picture_image_device__file_extensions(runtime: any): any {
    const members = runtime.members;

    return "png,jpg,jpeg,jfif,bmp,dib";
  }

  function method_picture_image_device__image_type_name(runtime: any): any {
    const members = runtime.members;

    return "picture";
  }

  function method_picture_image_device__image_brief_type_name(runtime: any): any {
    const members = runtime.members;

    return "pic";
  }

  function method_picture_image_device__get_bitmap(runtime: any): any {
    const members = runtime.members;

    const h_m_picture = members.m_picture ?? 0;
    return h_m_picture;
  }
  return {
    "is_readable": method_is_readable,
    "is_writeable": method_is_writeable,
    "is_creatable": method_is_creatable,
    "is_reset_on_load": method_is_reset_on_load,
    "file_extensions": method_file_extensions,
    "image_type_name": method_image_type_name,
    "image_brief_type_name": method_image_brief_type_name,
    "get_bitmap": method_get_bitmap,
    "picture_image_device::is_readable": method_picture_image_device__is_readable,
    "picture_image_device::is_writeable": method_picture_image_device__is_writeable,
    "picture_image_device::is_creatable": method_picture_image_device__is_creatable,
    "picture_image_device::is_reset_on_load": method_picture_image_device__is_reset_on_load,
    "picture_image_device::file_extensions": method_picture_image_device__file_extensions,
    "picture_image_device::image_type_name": method_picture_image_device__image_type_name,
    "picture_image_device::image_brief_type_name": method_picture_image_device__image_brief_type_name,
    "picture_image_device::get_bitmap": method_picture_image_device__get_bitmap
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_huc1"]!.compiledMethods = (() => {


  function method_bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_infrared_select(runtime: any, data: any): any {
    const members = runtime.members;

    if (((Number(14) === Number(((data) & (14)))) ? 1 : 0)) {
      0;
      ((runtime.dereference(members.m_view_ir)).select?.(0) ?? 0);
    } else {
      0;
      (typeof (runtime.dereference(members.m_view_ir)).disable === 'function' ? (runtime.dereference(members.m_view_ir)).disable() : typeof (runtime.dereference(members.m_view_ir)).disable === 'number' || typeof (runtime.dereference(members.m_view_ir)).disable === 'boolean' ? (runtime.dereference(members.m_view_ir)).disable : runtime.container(members.m_view_ir, "disable"));
    }
  }

  function method_bank_switch_fine(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_fine(runtime, ((data) & (63)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[1] = entry;
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    let coarse: any = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
    return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
  }

  function method_bank_switch_coarse(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_coarse(runtime, ((data) & (3)));
    method_set_bank_ram(runtime, ((data) & (3)));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[0] = entry;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_read_ir(runtime: any, space: any): any {
    const members = runtime.members;

    0;
    return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (192))) | (0))) & 0xff);
  }

  function method_write_ir(runtime: any, data: any): any {
    const members = runtime.members;

    0;
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "bank_rom_coarse": method_bank_rom_coarse,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
    "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
    "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
    "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
    "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "infrared_select": method_infrared_select,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "bank_switch_coarse": method_bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "set_bank_ram": method_set_bank_ram,
    "read_ir": method_read_ir,
    "write_ir": method_write_ir,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_huc1"]!.compiledMethodLinks = ["std::bit_width","std::forward"];
definition.slot!.options["rom_huc3"]!.compiledMethods = (() => {


  function method_bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_coarse(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[0]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_fine(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    return ((h_m_bank_sel_rom[1]) & 0xffff);
  }

  function method_mbc_dual_device_base__bank_rom_low_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_high_base(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
  }

  function method_mbc_dual_device_base__bank_rom_entry_low(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_nvram_can_write(runtime: any): any {
    const members = runtime.members;

    return (members.m_has_battery ?? 0);
  }

  function method_io_select(runtime: any, data: any): any {
    const members = runtime.members;

    switch ((((data) & (15)) as number)) {
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

  function method_bank_switch_fine(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_fine(runtime, ((data) & (127)));
  }

  function method_set_bank_rom_fine(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[1] = entry;
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_bank_rom_entry_high(runtime: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
    const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
    const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
    let coarse: any = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
    return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
  }

  function method_bank_switch_coarse(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_coarse(runtime, ((data) & (3)));
    method_set_bank_ram(runtime, ((data) & (3)));
  }

  function method_set_bank_rom_coarse(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
    const h_m_bank_rom = members.m_bank_rom ?? 0;
    h_m_bank_sel_rom[0] = entry;
    let lo: any = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
    let hi: any = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_write_command(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_ctrl_cmd = (((((data) >>> (4)) & ((1 << (3)) - 1))) & 0xff);
    members.m_ctrl_data = (((((data) >>> (0)) & ((1 << (4)) - 1))) & 0xff);
    0;
  }

  function method_read_command(runtime: any, space: any): any {
    const members = runtime.members;

    0;
    return (((((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (128))) | ((((members.m_ctrl_cmd ?? 0)) << (4))))) | ((members.m_ctrl_data ?? 0)))) & 0xff);
  }

  function method_read_status(runtime: any, space: any): any {
    const members = runtime.members;

    0;
    return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (128))) | (127))) & 0xff);
  }

  function method_write_control(runtime: any, data: any): any {
    const members = runtime.members;

    0;
    if ((((((data) >>> (0)) & 1)) ? 0 : 1)) {
      switch (((members.m_ctrl_cmd ?? 0) as number)) {
        case 1:
        {
          0;
          members.m_ctrl_data = (((((members.m_registers ?? 0)[(() => { const previous = (members.m_ctrl_addr ?? 0); members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff); return previous; })()]) & (15))) & 0xff);
          break;
        }
        case 3:
        {
          0;
          (members.m_registers ?? 0)[(() => { const previous = (members.m_ctrl_addr ?? 0); members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff); return previous; })()] = (((members.m_ctrl_data ?? 0)) & (15));
          break;
        }
        case 4:
        {
          members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? 0)) & (240))) | ((((members.m_ctrl_data ?? 0)) & (15))))) & 0xff);
          0;
          break;
        }
        case 5:
        {
          members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? 0)) & (15))) | ((((members.m_ctrl_data ?? 0)) << (4))))) & 0xff);
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

  function method_execute_instruction(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch (((((members.m_ctrl_data ?? 0)) & (15)) as number)) {
      case 0:
      {
        0;
        (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)));
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
        while (((Number(1440) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) - (1440))) << 16 >> 16);
          daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
        }
        while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) + (1440))) << 16 >> 16);
          daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
        }
        0;
        0;
        (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)));
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

  function method_read_12bit(runtime: any, offset: any): any {
    const members = runtime.members;

    return (((((((((((((members.m_registers ?? 0)[((((offset) + (0))) & (255))]) & (15))) & 0xffff)) << (0))) | ((((((((members.m_registers ?? 0)[((((offset) + (1))) & (255))]) & (15))) & 0xffff)) << (4))))) | ((((((((members.m_registers ?? 0)[((((offset) + (2))) & (255))]) & (15))) & 0xffff)) << (8))))) & 0xffff);
  }

  function method_write_12bit(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    (members.m_registers ?? 0)[((((offset) + (0))) & (255))] = ((((data) >>> (0))) & (15));
    (members.m_registers ?? 0)[((((offset) + (1))) & (255))] = ((((data) >>> (4))) & (15));
    (members.m_registers ?? 0)[((((offset) + (2))) & (255))] = ((((data) >>> (8))) & (15));
  }

  function method_read_ir(runtime: any, space: any): any {
    const members = runtime.members;

    0;
    return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (192))) | (0))) & 0xff);
  }

  function method_write_ir(runtime: any, data: any): any {
    const members = runtime.members;

    0;
  }

  function method_rtc_advance_seconds(runtime: any, param: any): any {
    const members = runtime.members;

    if (((Number(59) > Number((members.m_seconds ?? 0))) ? 1 : 0)) {
      members.m_seconds = ((((members.m_seconds) + (1))) & 0xff);
      return;
    }
    members.m_seconds = ((0) & 0xff);
    let minutes: any = ((((method_read_12bit(runtime, 16)) & 0xffff)) & 0xffff);
    if (((Number(1439) > Number(minutes)) ? 1 : 0)) {
      method_write_12bit(runtime, 16, ((minutes) + (1)));
      return;
    }
    method_write_12bit(runtime, 16, 0);
    method_write_12bit(runtime, 19, runtime.add(method_read_12bit(runtime, 19), 1));
  }

  function method_huc3_device__execute_instruction(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch (((((members.m_ctrl_data ?? 0)) & (15)) as number)) {
      case 0:
      {
        0;
        (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)));
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
        while (((Number(1440) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) - (1440))) << 16 >> 16);
          daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
        }
        while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
          minutesdelta = ((((minutesdelta) + (1440))) << 16 >> 16);
          daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
        }
        0;
        0;
        (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)));
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

  function method_huc3_device__read_12bit(runtime: any, offset: any): any {
    const members = runtime.members;

    return (((((((((((((members.m_registers ?? 0)[((((offset) + (0))) & (255))]) & (15))) & 0xffff)) << (0))) | ((((((((members.m_registers ?? 0)[((((offset) + (1))) & (255))]) & (15))) & 0xffff)) << (4))))) | ((((((((members.m_registers ?? 0)[((((offset) + (2))) & (255))]) & (15))) & 0xffff)) << (8))))) & 0xffff);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "bank_rom_coarse": method_bank_rom_coarse,
    "bank_rom_fine": method_bank_rom_fine,
    "bank_rom_low_base": method_bank_rom_low_base,
    "bank_rom_high_base": method_bank_rom_high_base,
    "bank_rom_entry_low": method_bank_rom_entry_low,
    "mbc_dual_device_base::bank_rom_coarse": method_mbc_dual_device_base__bank_rom_coarse,
    "mbc_dual_device_base::bank_rom_fine": method_mbc_dual_device_base__bank_rom_fine,
    "mbc_dual_device_base::bank_rom_low_base": method_mbc_dual_device_base__bank_rom_low_base,
    "mbc_dual_device_base::bank_rom_high_base": method_mbc_dual_device_base__bank_rom_high_base,
    "mbc_dual_device_base::bank_rom_entry_low": method_mbc_dual_device_base__bank_rom_entry_low,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "nvram_can_write": method_nvram_can_write,
    "io_select": method_io_select,
    "bank_switch_fine": method_bank_switch_fine,
    "set_bank_rom_fine": method_set_bank_rom_fine,
    "bank_rom_entry_high": method_bank_rom_entry_high,
    "bank_switch_coarse": method_bank_switch_coarse,
    "set_bank_rom_coarse": method_set_bank_rom_coarse,
    "set_bank_ram": method_set_bank_ram,
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
    "huc3_device::execute_instruction": method_huc3_device__execute_instruction,
    "huc3_device::read_12bit": method_huc3_device__read_12bit,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_huc3"]!.compiledMethodLinks = ["std::bit_width","std::copy_n","std::forward"];
definition.slot!.options["rom_tama5"]!.compiledMethods = (() => {


  function method_data_r(runtime: any, space: any): any {
    const members = runtime.members;

    return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (240))) | ((((members.m_response ?? 0)) & (15))))) & 0xff);
  }

  function method_data_w(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_registers = members.m_registers ?? 0;
    switch (((members.m_command ?? 0) as number)) {
      case 0:
      {
        members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? 0)) & (16))) | (((data) & (15))))) & 0xff);
        (__l["set_bank_rom"] ? __l["set_bank_rom"]((members.m_bank_sel_rom ?? 0)) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? 0)));
        break;
      }
      case 1:
      {
        members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? 0)) & (15))) | (((((data) & (1))) << (4))))) & 0xff);
        (__l["set_bank_rom"] ? __l["set_bank_rom"]((members.m_bank_sel_rom ?? 0)) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? 0)));
        break;
      }
      case 4:
      {
        members.m_data = (((((((members.m_data ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
        break;
      }
      case 5:
      {
        members.m_data = (((((((members.m_data ?? 0)) & (15))) | (((data) << (4))))) & 0xff);
        break;
      }
      case 6:
      {
        members.m_address = (((((((members.m_address ?? 0)) & (15))) | (((data) << (4))))) & 0xff);
        break;
      }
      case 7:
      {
        members.m_address = (((((((members.m_address ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
        switch (((((members.m_address ?? 0)) & (224)) as number)) {
          case 0:
          {
            0;
            h_m_registers[(((members.m_address ?? 0)) & (31))] = (members.m_data ?? 0);
            break;
          }
          case 32:
          {
            0;
            members.m_data = ((h_m_registers[(((members.m_address ?? 0)) & (31))]) & 0xff);
            break;
          }
          case 64:
          {
            if (((Number((((members.m_address ?? 0)) & (31))) === Number(18)) ? 1 : 0)) {
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

  function method_command_w(runtime: any, data: any): any {
    const members = runtime.members;

    switch ((data as number)) {
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
        members.m_response = (((((members.m_data ?? 0)) & (15))) & 0xff);
        break;
      }
      case 13:
      {
        members.m_response = (((((members.m_data ?? 0)) >>> (4))) & 0xff);
        break;
      }
      default:
      {
        0;
      }
    }
    members.m_command = ((data) & 0xff);
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "data_r": method_data_r,
    "data_w": method_data_w,
    "command_w": method_command_w,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_tama5"]!.compiledMethodLinks = ["set_bank_rom","std::bit_width","std::forward"];
definition.slot!.options["rom_liebao"]!.compiledMethods = (() => {


  function method_set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_mbc_8k_device_base__set_bank_bits_rom(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_rom = ((bits) >>> 0);
  }

  function method_set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_mbc_ram_device_base__set_bank_bits_ram(runtime: any, bits: any): any {
    const members = runtime.members;

    members.m_bank_bits_ram = ((bits) >>> 0);
  }

  function method_mbc_ram_device_base__bank_ram(runtime: any): any {
    const members = runtime.members;

    return (((members.m_bank_sel_ram ?? 0)) & 0xff);
  }

  function method_mbc_ram_device_base__bank_ram_base(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
  }

  function method_mbc_ram_device_base__bank_ram_entry(runtime: any): any {
    const members = runtime.members;

    return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
  }

  function method_enable_ram(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let enable: any = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? 1 : 0)) ? 1 : 0);
    0;
    if (enable) {
      ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
    } else {
      (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
    }
  }

  function method_bank_switch_rom(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_set_bank_rom_low(runtime, ((((data) & 0xffff)) << (1)));
    if (((((members.m_bank_high_set ?? 0)) || (((Number(((offset) & (255))) === Number(210)) ? 1 : 0))) ? 1 : 0)) {
      members.m_bank_high_set = ((0) & 0xff);
    } else {
      method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
    }
  }

  function method_set_bank_rom_low(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(entry) ?? 0);
  }

  function method_set_bank_rom_high(runtime: any, entry: any): any {
    const members = runtime.members;

    const h_m_bank_rom = members.m_bank_rom ?? 0;
    entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
    0;
    ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(entry) ?? 0);
  }

  function method_bank_switch_ram(runtime: any, data: any): any {
    const members = runtime.members;

    method_set_bank_ram(runtime, ((data) & (15)));
  }

  function method_set_bank_ram(runtime: any, entry: any): any {
    const members = runtime.members;

    members.m_bank_sel_ram = ((entry) & 0xff);
    if ((members.m_bank_mask_ram ?? 0)) {
      entry = ((method_bank_ram_entry(runtime)) & 0xff);
      ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
    }
  }

  function method_bank_switch_rom_high(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((Number(((offset) & (255))) === Number(210)) ? 1 : 0)) {
      members.m_bank_high_set = ((1) & 0xff);
      method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
    }
  }

  function method_install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }

  function method_device_generic_cart_interface__install_non_power_of_two__5(runtime: any, length: any, decode_limit: any, decode_offset: any, base: any, install: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let decode_mask: any = ((length) - (1));
    for (let i: any = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
      if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
        decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
        break;
      }
    }
    runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
  }
  return {
    "set_bank_bits_rom": method_set_bank_bits_rom,
    "mbc_8k_device_base::set_bank_bits_rom": method_mbc_8k_device_base__set_bank_bits_rom,
    "set_bank_bits_ram": method_set_bank_bits_ram,
    "bank_ram": method_bank_ram,
    "bank_ram_base": method_bank_ram_base,
    "bank_ram_entry": method_bank_ram_entry,
    "mbc_ram_device_base::set_bank_bits_ram": method_mbc_ram_device_base__set_bank_bits_ram,
    "mbc_ram_device_base::bank_ram": method_mbc_ram_device_base__bank_ram,
    "mbc_ram_device_base::bank_ram_base": method_mbc_ram_device_base__bank_ram_base,
    "mbc_ram_device_base::bank_ram_entry": method_mbc_ram_device_base__bank_ram_entry,
    "enable_ram": method_enable_ram,
    "bank_switch_rom": method_bank_switch_rom,
    "set_bank_rom_low": method_set_bank_rom_low,
    "set_bank_rom_high": method_set_bank_rom_high,
    "bank_switch_ram": method_bank_switch_ram,
    "set_bank_ram": method_set_bank_ram,
    "bank_switch_rom_high": method_bank_switch_rom_high,
    "install_non_power_of_two__5": method_install_non_power_of_two__5,
    "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["rom_liebao"]!.compiledMethodLinks = ["std::bit_width","std::forward"];

export const device = definition;
export default device;
