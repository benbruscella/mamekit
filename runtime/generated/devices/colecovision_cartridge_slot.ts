// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './colecovision_cartridge_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    let data: any = ((255) & 0xff);
    if ((members.m_card ?? 0)) {
      data = ((((runtime.dereference(members.m_card)).read?.(offset, _8000, _a000, _c000, _e000) ?? 0)) & 0xff);
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    if ((members.m_card ?? 0)) {
      ((runtime.dereference(members.m_card)).write?.(offset, data, _8000, _a000, _c000, _e000) ?? 0);
    }
  }
  return {
    "read": method_read,
    "write": method_write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number(16384)) ? 1 : 0)) {
        data = (((members.m_rom ?? 0)[offset]) & 0xff);
      } else {
        if (((Number(offset) === Number(32640)) ? 1 : 0)) {
          if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
            data = (((__l["m_eeprom.read_sda"] ? __l["m_eeprom.read_sda"]() : ((members.m_eeprom)?.read_sda?.() ?? 0))) & 0xff);
          } else {
            data = ((255) & 0xff);
          }
        } else {
          if (((Number(offset) > Number(32640)) ? 1 : 0)) {
            data = ((255) & 0xff);
          } else {
            data = (((members.m_rom ?? 0)[(((((members.m_active_bank ?? 0)) << (14))) | (((offset) & (16383))))]) & 0xff);
          }
        }
      }
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch (offset) {
      case 32656:
      case 32672:
      case 32688:
      {
        members.m_active_bank = ((((runtime.shiftRight(offset, 4)) & (3))) & 0xff);
        break;
      }
      case 32704:
      case 32720:
      {
        if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
          (__l["m_eeprom.write_scl"] ? __l["m_eeprom.write_scl"]((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_scl?.((((offset) >>> (4)) & 1)) ?? 0));
        }
        break;
      }
      case 32736:
      case 32752:
      {
        if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
          (__l["m_eeprom.write_sda"] ? __l["m_eeprom.write_sda"]((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_sda?.((((offset) >>> (4)) & 1)) ?? 0));
        }
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision"]!.compiledMethodLinks = ["m_eeprom.found","m_eeprom.read_sda","m_eeprom.write_scl","m_eeprom.write_sda"];
definition.slot!.options["activision_256b"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number(16384)) ? 1 : 0)) {
        data = (((members.m_rom ?? 0)[offset]) & 0xff);
      } else {
        if (((Number(offset) === Number(32640)) ? 1 : 0)) {
          if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
            data = (((__l["m_eeprom.read_sda"] ? __l["m_eeprom.read_sda"]() : ((members.m_eeprom)?.read_sda?.() ?? 0))) & 0xff);
          } else {
            data = ((255) & 0xff);
          }
        } else {
          if (((Number(offset) > Number(32640)) ? 1 : 0)) {
            data = ((255) & 0xff);
          } else {
            data = (((members.m_rom ?? 0)[(((((members.m_active_bank ?? 0)) << (14))) | (((offset) & (16383))))]) & 0xff);
          }
        }
      }
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch (offset) {
      case 32656:
      case 32672:
      case 32688:
      {
        members.m_active_bank = ((((runtime.shiftRight(offset, 4)) & (3))) & 0xff);
        break;
      }
      case 32704:
      case 32720:
      {
        if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
          (__l["m_eeprom.write_scl"] ? __l["m_eeprom.write_scl"]((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_scl?.((((offset) >>> (4)) & 1)) ?? 0));
        }
        break;
      }
      case 32736:
      case 32752:
      {
        if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
          (__l["m_eeprom.write_sda"] ? __l["m_eeprom.write_sda"]((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_sda?.((((offset) >>> (4)) & 1)) ?? 0));
        }
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision_256b"]!.compiledMethodLinks = ["m_eeprom.found","m_eeprom.read_sda","m_eeprom.write_scl","m_eeprom.write_sda"];
definition.slot!.options["activision_256b"]!.children![0]!.definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["activision_32k"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number(16384)) ? 1 : 0)) {
        data = (((members.m_rom ?? 0)[offset]) & 0xff);
      } else {
        if (((Number(offset) === Number(32640)) ? 1 : 0)) {
          if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
            data = (((__l["m_eeprom.read_sda"] ? __l["m_eeprom.read_sda"]() : ((members.m_eeprom)?.read_sda?.() ?? 0))) & 0xff);
          } else {
            data = ((255) & 0xff);
          }
        } else {
          if (((Number(offset) > Number(32640)) ? 1 : 0)) {
            data = ((255) & 0xff);
          } else {
            data = (((members.m_rom ?? 0)[(((((members.m_active_bank ?? 0)) << (14))) | (((offset) & (16383))))]) & 0xff);
          }
        }
      }
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch (offset) {
      case 32656:
      case 32672:
      case 32688:
      {
        members.m_active_bank = ((((runtime.shiftRight(offset, 4)) & (3))) & 0xff);
        break;
      }
      case 32704:
      case 32720:
      {
        if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
          (__l["m_eeprom.write_scl"] ? __l["m_eeprom.write_scl"]((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_scl?.((((offset) >>> (4)) & 1)) ?? 0));
        }
        break;
      }
      case 32736:
      case 32752:
      {
        if ((__l["m_eeprom.found"] ? __l["m_eeprom.found"]() : ((members.m_eeprom)?.found?.() ?? 0))) {
          (__l["m_eeprom.write_sda"] ? __l["m_eeprom.write_sda"]((((offset) >>> (4)) & 1)) : ((members.m_eeprom)?.write_sda?.((((offset) >>> (4)) & 1)) ?? 0));
        }
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision_32k"]!.compiledMethodLinks = ["m_eeprom.found","m_eeprom.read_sda","m_eeprom.write_scl","m_eeprom.write_sda"];
definition.slot!.options["activision_32k"]!.children![0]!.definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["megacart"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number((members.m_bankcount ?? 0)) > Number(2)) ? 1 : 0)) {
        if (((Number(offset) >= Number(32704)) ? 1 : 0)) {
          members.m_activebank = ((((offset) & ((((members.m_bankcount ?? 0)) - (1))))) >>> 0);
        }
        if (((Number(offset) >= Number(16384)) ? 1 : 0)) {
          offset = runtime.add((((members.m_activebank ?? 0)) << (14)), ((offset) - (16384)));
        } else {
          offset = runtime.add((((members.m_bankcount ?? 0)) << (14)), ((offset) - (16384)));
        }
      }
      data = (((members.m_rom ?? 0)[offset]) & 0xff);
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_1mbit"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((__l["m_flash.read"] ? __l["m_flash.read"](method_banked_address(runtime, ((32768) | (offset)))) : ((members.m_flash)?.read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0))) & 0xff);
  }

  function method_banked_address(runtime: any, offset: any): any {
    const members = runtime.members;

    if (((Number(offset) < Number(40960)) ? 1 : 0)) {
      return (((((members.m_slot0_bank ?? 0)) << (13))) | (((offset) & (8191))));
    } else {
      if (((Number(offset) < Number(49152)) ? 1 : 0)) {
        return (((((members.m_slot1_bank ?? 0)) << (13))) | (((offset) & (8191))));
      } else {
        if (((Number(offset) < Number(57344)) ? 1 : 0)) {
          return (((((members.m_slot2_bank ?? 0)) << (13))) | (((offset) & (8191))));
        } else {
          return (((((members.m_slot3_bank ?? 0)) << (13))) | (((offset) & (8191))));
        }
      }
    }
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    offset = ((offset) | (32768));
    let max_banks: any = ((runtime.divide((members.m_rom_size ?? 0), 8192)) & 0xff);
    0;
    switch (offset) {
      case 65532:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot1_bank = ((data) & 0xff);
        }
        break;
      }
      case 65533:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot2_bank = ((data) & 0xff);
        }
        break;
      }
      case 65534:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot3_bank = ((data) & 0xff);
        }
        break;
      }
      case 65535:
      {
        members.m_flash_a16 = ((data) & 0xff);
        break;
      }
      default:
      {
        let addr: any = ((((((((members.m_flash_a16 ?? 0)) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
        0;
        (__l["m_flash.write"] ? __l["m_flash.write"](addr, data) : ((members.m_flash)?.write?.(addr, data) ?? 0));
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "banked_address": method_banked_address,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_1mbit"]!.compiledMethodLinks = ["m_flash.read","m_flash.write"];
definition.slot!.options["sgc_1mbit"]!.children![0]!.definition.compiledMethods = (() => {


  function method_write_full(runtime: any, address: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_maker_id = members.m_maker_id ?? 0;
    const h_m_device_id = members.m_device_id ?? 0;
    const h_m_addrmask = members.m_addrmask ?? 0;
    const h_m_size = members.m_size ?? 0;
    const h_m_sector_is_4k = members.m_sector_is_4k ?? 0;
    const h_m_sector_is_16k = members.m_sector_is_16k ?? 0;
    const h_m_bits = members.m_bits ?? 0;
    const h_m_top_boot_sector = members.m_top_boot_sector ?? 0;
    const h_m_bot_boot_sector = members.m_bot_boot_sector ?? 0;
    const h_m_page_size = members.m_page_size ?? 0;
    const h_m_write_buffer = members.m_write_buffer ?? 0;
    address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? 0)) {
      case 0:
      case 2:
      case 1:
      case 8:
      {
        switch (((data) & (255))) {
          case 240:
          case 255:
          {
            members.m_flash_mode = ((0) | 0);
            break;
          }
          case 144:
          {
            if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((20) | 0);
            } else {
              members.m_flash_mode = ((1) | 0);
            }
            break;
          }
          case 64:
          case 16:
          {
            members.m_flash_mode = ((3) | 0);
            break;
          }
          case 80:
          {
            if ((((((((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(97)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(32)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_flash_mode ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
              0;
            } else {
              if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((14) | 0);
              } else {
                members.m_status = ((128) & 0xff);
                members.m_flash_mode = ((2) | 0);
              }
            }
            break;
          }
          case 32:
          {
            if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(97)) ? 1 : 0))) ? 1 : 0)) {
              0;
            } else {
              if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((0) | 0);
                members.m_fast_mode = ((1) ? 1 : 0);
              } else {
                members.m_flash_mode = ((4) | 0);
              }
            }
            break;
          }
          case 96:
          {
            members.m_flash_mode = ((5) | 0);
            break;
          }
          case 112:
          {
            members.m_flash_mode = ((2) | 0);
            break;
          }
          case 160:
          {
            if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((13) | 0);
            } else {
              0;
            }
            break;
          }
          case 170:
          {
            if (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) {
              members.m_flash_mode = ((6) | 0);
            } else {
              if (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) {
                members.m_flash_mode = ((6) | 0);
              }
            }
            break;
          }
          case 232:
          {
            if (((((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) >= Number(20)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_device_id) <= Number(22)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((18) | 0);
            } else {
              0;
            }
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        break;
      }
      case 6:
      {
        if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((7) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((7) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((7) | 0);
            } else {
              if (((((((((Number(((address) & (h_m_addrmask))) === Number(((43690) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                members.m_flash_mode = ((7) | 0);
              } else {
                0;
                members.m_flash_mode = ((0) | 0);
              }
            }
          }
        }
        break;
      }
      case 7:
      {
        if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((8) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((8) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((8) | 0);
            } else {
              if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((9) | 0);
              } else {
                if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                  members.m_flash_mode = ((9) | 0);
                } else {
                  if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_flash_mode = ((9) | 0);
                  } else {
                    if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                      members.m_flash_mode = ((13) | 0);
                    } else {
                      if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(31)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(213)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                          members.m_sdp = ((1) ? 1 : 0);
                          members.m_flash_mode = ((17) | 0);
                          members.m_byte_count = ((0) & 0xffff);
                        } else {
                          if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                            0;
                            members.m_byte_count = ((0) & 0xffff);
                            members.m_flash_mode = ((21) | 0);
                          } else {
                            members.m_flash_mode = ((13) | 0);
                          }
                        }
                      } else {
                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                          members.m_flash_mode = ((13) | 0);
                        } else {
                          if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((0) | 0);
                          } else {
                            if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                              members.m_flash_mode = ((0) | 0);
                            } else {
                              if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((0) | 0);
                              } else {
                                if ((((((((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(176)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(98)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_device_id) === Number(19)) ? 1 : 0))) ? 1 : 0)) {
                                  members.m_flash_mode = ((16) | 0);
                                } else {
                                  if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((9) | 0);
                                  } else {
                                    if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                      members.m_flash_mode = ((8) | 0);
                                    } else {
                                      if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                        members.m_flash_mode = ((13) | 0);
                                      } else {
                                        if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                          members.m_flash_mode = ((0) | 0);
                                        } else {
                                          if (((((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) || (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                                            members.m_flash_mode = ((0) | 0);
                                            members.m_fast_mode = ((1) ? 1 : 0);
                                          } else {
                                            0;
                                            members.m_flash_mode = ((0) | 0);
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        break;
      }
      case 9:
      {
        if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((10) | 0);
        } else {
          if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((10) | 0);
          } else {
            0;
          }
        }
        break;
      }
      case 10:
      {
        if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((11) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((11) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((11) | 0);
            } else {
              if (((((((((Number(((address) & (h_m_addrmask))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                members.m_flash_mode = ((11) | 0);
              } else {
                0;
              }
            }
          }
        }
        break;
      }
      case 11:
      {
        if (((((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 0); const bytes = Number(237568); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 245760); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
          } else {
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 0); const bytes = Number(h_m_size); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
          }
          members.m_status = ((8) & 0xff);
          members.m_flash_mode = ((12) | 0);
          if (h_m_sector_is_4k) {
            ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
          } else {
            if (h_m_sector_is_16k) {
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](4) : runtime.macro("attotime::from_seconds", 4))) ?? 0);
            } else {
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](16) : runtime.macro("attotime::from_seconds", 16))) ?? 0);
            }
          }
        } else {
          if (((Number(((data) & (255))) === Number(48)) ? 1 : 0)) {
            let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            if (h_m_sector_is_4k) {
              (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-4096))); const bytes = Number(4096); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-2048) : (-4096))))) | 0);
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](125) : runtime.macro("attotime::from_msec", 125))) ?? 0);
            } else {
              if (h_m_sector_is_16k) {
                (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
              } else {
                if ((((h_m_top_boot_sector) && (((Number(address) >= Number(((h_m_size) - (65536)))) ? 1 : 0))) ? 1 : 0)) {
                  if (((Number(address) >= Number(((h_m_size) - (16384)))) ? 1 : 0)) {
                    (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                    members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                    ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                  } else {
                    if (((Number(address) >= Number(((h_m_size) - (32768)))) ? 1 : 0)) {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                    } else {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-32768))); const bytes = Number(32768); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                    }
                  }
                } else {
                  if ((((h_m_bot_boot_sector) && (((Number(address) < Number(65536)) ? 1 : 0))) ? 1 : 0)) {
                    if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                    } else {
                      if (((Number(address) < Number(16384)) ? 1 : 0)) {
                        (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                        members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                        ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                      } else {
                        if (((Number(address) < Number(32768)) ? 1 : 0)) {
                          (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                          members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                          ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                        } else {
                          (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-32768))); const bytes = Number(32768); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                          members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                          ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                        }
                      }
                    }
                  } else {
                    if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
                      let sectors: any = new Uint32Array([65536, 65536, 65536, 32768, 8192, 8192, 16384]);
                      let sec_num: any = ((0) >>> 0);
                      let toffset: any = ((base) >>> 0);
                      while (((Number(toffset) >= Number(runtime.readIndex(sectors, sec_num))) ? 1 : 0)) {
                        toffset = ((((toffset) - (runtime.readIndex(sectors, (() => { const previous = sec_num; sec_num = ((((sec_num) + (1))) >>> 0); return previous; })())))) >>> 0);
                      }
                      let sec_len: any = ((runtime.readIndex(sectors, sec_num)) >>> 0);
                      if (((Number(sec_num) !== Number(5)) ? 1 : 0)) {
                        (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & ((~((sec_len) - (1)))))); const bytes = Number(sec_len); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      }
                      members.m_erase_sector = ((((address) & ((~((sec_len) - (1)))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                    } else {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-65536))); const bytes = Number(65536); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-32768) : (-65536))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                    }
                  }
                }
              }
            }
            members.m_status = ((8) & 0xff);
            members.m_flash_mode = ((12) | 0);
          } else {
            if (((((((((Number(((data) & (255))) === Number(32)) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(31)) ? 1 : 0))) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(213)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_sdp = ((0) ? 1 : 0);
              members.m_flash_mode = ((17) | 0);
              members.m_byte_count = ((0) & 0xffff);
            } else {
              if (((((((((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(96)) ? 1 : 0))) ? 1 : 0)) && (((Number(((address) & (65535))) === Number(21845)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((8) | 0);
                0;
              } else {
                0;
              }
            }
          }
        }
        break;
      }
      case 13:
      {
        switch (h_m_bits) {
          case 8:
          {
            if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
              if ((((((Number(address) < Number(237568)) ? 1 : 0)) || (((Number(address) >= Number(245760)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(runtime.writableMember("m_data"), address, ((runtime.readIndex(runtime.writableMember("m_data"), address)) & (data)));
              }
            } else {
              runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            }
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 14:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((15) | 0);
        break;
      }
      case 15:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 3:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_status = ((128) & 0xff);
        if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((0) | 0);
        } else {
          members.m_flash_mode = ((2) | 0);
        }
        break;
      }
      case 17:
      {
        if ((((((((((((Number((members.m_byte_count ?? 0)) === Number(0)) ? 1 : 0)) && ((((members.m_sdp ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((6) | 0);
        } else {
          switch (h_m_bits) {
            case 8:
            {
              runtime.writeIndex(runtime.writableMember("m_data"), address, data);
              break;
            }
            case 16:
            {
              runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
              runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
              break;
            }
            default:
            {
              0;
              break;
            }
          }
          members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          if (((Number((members.m_byte_count ?? 0)) === Number(h_m_page_size)) ? 1 : 0)) {
            if ((members.m_sdp ?? 0)) {
              members.m_flash_mode = ((0) | 0);
            }
            members.m_byte_count = ((0) & 0xffff);
          }
        }
        break;
      }
      case 21:
      {
        if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((0) | 0);
        } else {
          runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
          runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
          members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          if (((Number((members.m_byte_count ?? 0)) === Number(h_m_page_size)) ? 1 : 0)) {
            members.m_flash_mode = ((0) | 0);
            members.m_sdp = ((0) ? 1 : 0);
            members.m_byte_count = ((0) & 0xffff);
          }
        }
        break;
      }
      case 4:
      {
        if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
          if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
            let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-256))); const bytes = Number(256); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](4) : runtime.macro("attotime::from_msec", 4))) ?? 0);
          } else {
            if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(17521)) ? 1 : 0))) ? 1 : 0)) {
              let base: any = ((((((address) & (262143))) * (2))) >>> 0);
              let size: any = ((0) | 0);
              let duration: any = ((0) | 0);
              if (((Number(base) < Number(16384)) ? 1 : 0)) {
                base = ((0) >>> 0);
                size = ((16384) | 0);
                duration = ((300) | 0);
              } else {
                if (((Number(base) < Number(32768)) ? 1 : 0)) {
                  base = ((((base) & (24576))) >>> 0);
                  size = ((8192) | 0);
                  duration = ((300) | 0);
                } else {
                  if (((Number(base) < Number(131072)) ? 1 : 0)) {
                    base = ((32768) >>> 0);
                    size = ((98304) | 0);
                    duration = ((600) | 0);
                  } else {
                    base = ((((base) & (393216))) >>> 0);
                    size = ((131072) | 0);
                    duration = ((600) | 0);
                  }
                }
              }
              (() => { const target = runtime.addressOf((members.m_data ?? 0), base); const bytes = Number(size); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](duration) : runtime.macro("attotime::from_msec", duration))) ?? 0);
            } else {
              let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
              (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-65536))); const bytes = Number(65536); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
            }
          }
          members.m_status = ((0) & 0xff);
          members.m_flash_mode = ((2) | 0);
          break;
        } else {
          0;
        }
        break;
      }
      case 5:
      {
        switch (((data) & (255))) {
          case 241:
          {
            members.m_flash_master_lock = ((1) ? 1 : 0);
            break;
          }
          case 208:
          {
            members.m_flash_master_lock = ((0) ? 1 : 0);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((2) | 0);
        break;
      }
      case 18:
      {
        if (((Number(h_m_bits) === Number(16)) ? 1 : 0)) {
          members.m_write_buffer_count = ((runtime.add((__l["std::min"] ? __l["std::min"](data, 15) : runtime.macro("std::min", data, 15)), 1)) >>> 0);
        } else {
          members.m_write_buffer_count = ((runtime.add((__l["std::min"] ? __l["std::min"](data, 31) : runtime.macro("std::min", data, 31)), 1)) >>> 0);
        }
        members.m_status = ((128) & 0xff);
        members.m_flash_mode = ((19) | 0);
        members.m_byte_count = ((0) & 0xffff);
        break;
      }
      case 19:
      {
        if (((Number((members.m_byte_count ?? 0)) < Number((members.m_write_buffer_count ?? 0))) ? 1 : 0)) {
          if (((Number((members.m_byte_count ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_write_buffer_start_address = ((address) >>> 0);
          }
          if (((Number(address) >= Number((((members.m_write_buffer_start_address ?? 0)) + ((members.m_write_buffer_count ?? 0))))) ? 1 : 0)) {
            members.m_status = ((48) & 0xff);
            members.m_flash_mode = ((2) | 0);
          } else {
            if (((Number(h_m_bits) === Number(8)) ? 1 : 0)) {
              h_m_write_buffer[(members.m_byte_count ?? 0)] = data;
            } else {
              h_m_write_buffer[(((members.m_byte_count ?? 0)) * (2))] = runtime.shiftRight(data, 8);
              h_m_write_buffer[runtime.add((((members.m_byte_count ?? 0)) * (2)), 1)] = data;
            }
            members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          }
        } else {
          if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
            let base: any = (((((members.m_write_buffer_start_address ?? 0)) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            let len: any = (((((members.m_write_buffer_count ?? 0)) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            (__l["memcpy"] ? __l["memcpy"](runtime.addressOf((members.m_data ?? 0), base), h_m_write_buffer, len) : runtime.macro("memcpy", runtime.addressOf((members.m_data ?? 0), base), h_m_write_buffer, len));
            members.m_status = ((128) & 0xff);
          } else {
            members.m_status = ((48) & 0xff);
          }
          members.m_flash_mode = ((2) | 0);
        }
        break;
      }
      case 16:
      {
        members.m_bank = ((((data) & (255))) | 0);
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 20:
      {
        if ((((((Number(((data) & (255))) === Number(240)) ? 1 : 0)) || (((Number(((data) & (255))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
          members.m_fast_mode = ((0) ? 1 : 0);
          members.m_flash_mode = ((0) | 0);
        } else {
          0;
        }
        break;
      }
    }
  }

  function method_delay_tick(runtime: any, param: any): any {
    const members = runtime.members;

    switch ((members.m_flash_mode ?? 0)) {
      case 2:
      {
        members.m_status = ((128) & 0xff);
        break;
      }
      case 12:
      {
        members.m_flash_mode = ((0) | 0);
        members.m_status = ((128) & 0xff);
        break;
      }
    }
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_read_full(runtime, offset)) & 0xff);
  }

  function method_read_full(runtime: any, address: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bits = members.m_bits ?? 0;
    const h_m_maker_id = members.m_maker_id ?? 0;
    const h_m_device_id = members.m_device_id ?? 0;
    const h_m_device_id2 = members.m_device_id2 ?? 0;
    const h_m_device_id3 = members.m_device_id3 ?? 0;
    let data: any = ((0) >>> 0);
    address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? 0)) {
      default:
      {
        switch (h_m_bits) {
          case 8:
          {
            data = ((runtime.readIndex((members.m_data ?? 0), address)) >>> 0);
            break;
          }
          case 16:
          {
            data = ((((((runtime.readIndex((members.m_data ?? 0), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? 0), runtime.add(((address) * (2)), 1))))) >>> 0);
            break;
          }
        }
        break;
      }
      case 2:
      case 19:
      {
        data = (((members.m_status ?? 0)) >>> 0);
        break;
      }
      case 18:
      {
        data = ((128) >>> 0);
        break;
      }
      case 8:
      {
        if (((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(53)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(59)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 4:
            {
              data = ((0) >>> 0);
              break;
            }
          }
        } else {
          if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
            switch (((address) & (255))) {
              case 0:
              {
                data = ((h_m_maker_id) >>> 0);
                break;
              }
              case 2:
              {
                data = ((h_m_device_id) >>> 0);
                break;
              }
              case 4:
              {
                0;
                break;
              }
              case 6:
              {
                0;
                break;
              }
              case 28:
              {
                data = ((h_m_device_id2) >>> 0);
                break;
              }
              case 30:
              {
                data = ((h_m_device_id3) >>> 0);
                break;
              }
            }
          } else {
            if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
              switch (address) {
                case 0:
                {
                  data = ((((h_m_maker_id) << (8))) >>> 0);
                  break;
                }
                case 1:
                {
                  data = ((((h_m_device_id) << (8))) >>> 0);
                  break;
                }
                case 2:
                {
                  data = ((65024) >>> 0);
                  break;
                }
                default:
                {
                  if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                  }
                  data = ((65024) >>> 0);
                  break;
                }
              }
            } else {
              switch (((address) & (255))) {
                case 0:
                {
                  data = ((h_m_maker_id) >>> 0);
                  break;
                }
                case 1:
                {
                  data = ((h_m_device_id) >>> 0);
                  break;
                }
                case 2:
                {
                  data = ((0) >>> 0);
                  break;
                }
              }
            }
          }
        }
        break;
      }
      case 1:
      {
        if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(22)) ? 1 : 0))) ? 1 : 0)) {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 4:
            {
              data = ((0) >>> 0);
              break;
            }
          }
        } else {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 1:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((0) >>> 0);
              break;
            }
            case 3:
            {
              if ((members.m_flash_master_lock ?? 0)) {
                data = ((1) >>> 0);
              } else {
                data = ((0) >>> 0);
              }
              break;
            }
          }
        }
        break;
      }
      case 12:
      {
        if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && ((((((Number(address) < Number((members.m_erase_sector ?? 0))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? 0)) + (65536)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (h_m_bits) {
            case 8:
            {
              data = ((runtime.readIndex((members.m_data ?? 0), address)) >>> 0);
              break;
            }
            case 16:
            {
              data = ((((((runtime.readIndex((members.m_data ?? 0), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? 0), runtime.add(((address) * (2)), 1))))) >>> 0);
              break;
            }
          }
        } else {
          members.m_status = ((((members.m_status) ^ (68))) & 0xff);
          data = (((members.m_status ?? 0)) >>> 0);
        }
        break;
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_write_full(runtime, offset, data);
  }

  function method_read_raw(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.readIndex((members.m_data ?? 0), offset)) & 0xff);
  }

  function method_write_raw(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }

  function method_intelfsh8_device__read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_read_full(runtime, offset)) & 0xff);
  }

  function method_intelfsh8_device__write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_write_full(runtime, offset, data);
  }

  function method_intelfsh8_device__read_raw(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.readIndex((members.m_data ?? 0), offset)) & 0xff);
  }

  function method_intelfsh8_device__write_raw(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }
  return {
    "write_full": method_write_full,
    "delay_tick": method_delay_tick,
    "read": method_read,
    "read_full": method_read_full,
    "write": method_write,
    "read_raw": method_read_raw,
    "write_raw": method_write_raw,
    "intelfsh8_device::read": method_intelfsh8_device__read,
    "intelfsh8_device::write": method_intelfsh8_device__write,
    "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
    "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_1mbit"]!.children![0]!.definition.compiledMethodLinks = ["attotime::from_msec","attotime::from_seconds","machine","machine().side_effects_disabled","memcpy","std::min"];
definition.slot!.options["sgc_2mbit"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((__l["m_flash.read"] ? __l["m_flash.read"](method_banked_address(runtime, ((32768) | (offset)))) : ((members.m_flash)?.read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0))) & 0xff);
  }

  function method_banked_address(runtime: any, offset: any): any {
    const members = runtime.members;

    if (((Number(offset) < Number(40960)) ? 1 : 0)) {
      return (((((members.m_slot0_bank ?? 0)) << (13))) | (((offset) & (8191))));
    } else {
      if (((Number(offset) < Number(49152)) ? 1 : 0)) {
        return (((((members.m_slot1_bank ?? 0)) << (13))) | (((offset) & (8191))));
      } else {
        if (((Number(offset) < Number(57344)) ? 1 : 0)) {
          return (((((members.m_slot2_bank ?? 0)) << (13))) | (((offset) & (8191))));
        } else {
          return (((((members.m_slot3_bank ?? 0)) << (13))) | (((offset) & (8191))));
        }
      }
    }
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    offset = ((offset) | (32768));
    let max_banks: any = ((runtime.divide((members.m_rom_size ?? 0), 8192)) & 0xff);
    0;
    switch (offset) {
      case 65532:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot1_bank = ((data) & 0xff);
        }
        break;
      }
      case 65533:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot2_bank = ((data) & 0xff);
        }
        break;
      }
      case 65534:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot3_bank = ((data) & 0xff);
        }
        break;
      }
      case 65535:
      {
        members.m_flash_a16 = ((data) & 0xff);
        break;
      }
      default:
      {
        let addr: any = ((((((((members.m_flash_a16 ?? 0)) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
        0;
        (__l["m_flash.write"] ? __l["m_flash.write"](addr, data) : ((members.m_flash)?.write?.(addr, data) ?? 0));
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "banked_address": method_banked_address,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_2mbit"]!.compiledMethodLinks = ["m_flash.read","m_flash.write"];
definition.slot!.options["sgc_2mbit"]!.children![0]!.definition.compiledMethods = (() => {


  function method_write_full(runtime: any, address: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_maker_id = members.m_maker_id ?? 0;
    const h_m_device_id = members.m_device_id ?? 0;
    const h_m_addrmask = members.m_addrmask ?? 0;
    const h_m_size = members.m_size ?? 0;
    const h_m_sector_is_4k = members.m_sector_is_4k ?? 0;
    const h_m_sector_is_16k = members.m_sector_is_16k ?? 0;
    const h_m_bits = members.m_bits ?? 0;
    const h_m_top_boot_sector = members.m_top_boot_sector ?? 0;
    const h_m_bot_boot_sector = members.m_bot_boot_sector ?? 0;
    const h_m_page_size = members.m_page_size ?? 0;
    const h_m_write_buffer = members.m_write_buffer ?? 0;
    address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? 0)) {
      case 0:
      case 2:
      case 1:
      case 8:
      {
        switch (((data) & (255))) {
          case 240:
          case 255:
          {
            members.m_flash_mode = ((0) | 0);
            break;
          }
          case 144:
          {
            if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((20) | 0);
            } else {
              members.m_flash_mode = ((1) | 0);
            }
            break;
          }
          case 64:
          case 16:
          {
            members.m_flash_mode = ((3) | 0);
            break;
          }
          case 80:
          {
            if ((((((((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(97)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(32)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_flash_mode ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
              0;
            } else {
              if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((14) | 0);
              } else {
                members.m_status = ((128) & 0xff);
                members.m_flash_mode = ((2) | 0);
              }
            }
            break;
          }
          case 32:
          {
            if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(97)) ? 1 : 0))) ? 1 : 0)) {
              0;
            } else {
              if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((0) | 0);
                members.m_fast_mode = ((1) ? 1 : 0);
              } else {
                members.m_flash_mode = ((4) | 0);
              }
            }
            break;
          }
          case 96:
          {
            members.m_flash_mode = ((5) | 0);
            break;
          }
          case 112:
          {
            members.m_flash_mode = ((2) | 0);
            break;
          }
          case 160:
          {
            if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((13) | 0);
            } else {
              0;
            }
            break;
          }
          case 170:
          {
            if (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) {
              members.m_flash_mode = ((6) | 0);
            } else {
              if (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) {
                members.m_flash_mode = ((6) | 0);
              }
            }
            break;
          }
          case 232:
          {
            if (((((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) >= Number(20)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_device_id) <= Number(22)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((18) | 0);
            } else {
              0;
            }
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        break;
      }
      case 6:
      {
        if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((7) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((7) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((7) | 0);
            } else {
              if (((((((((Number(((address) & (h_m_addrmask))) === Number(((43690) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                members.m_flash_mode = ((7) | 0);
              } else {
                0;
                members.m_flash_mode = ((0) | 0);
              }
            }
          }
        }
        break;
      }
      case 7:
      {
        if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((8) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((8) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((8) | 0);
            } else {
              if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((9) | 0);
              } else {
                if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                  members.m_flash_mode = ((9) | 0);
                } else {
                  if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_flash_mode = ((9) | 0);
                  } else {
                    if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                      members.m_flash_mode = ((13) | 0);
                    } else {
                      if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(31)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(213)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                          members.m_sdp = ((1) ? 1 : 0);
                          members.m_flash_mode = ((17) | 0);
                          members.m_byte_count = ((0) & 0xffff);
                        } else {
                          if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                            0;
                            members.m_byte_count = ((0) & 0xffff);
                            members.m_flash_mode = ((21) | 0);
                          } else {
                            members.m_flash_mode = ((13) | 0);
                          }
                        }
                      } else {
                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                          members.m_flash_mode = ((13) | 0);
                        } else {
                          if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((0) | 0);
                          } else {
                            if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                              members.m_flash_mode = ((0) | 0);
                            } else {
                              if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((0) | 0);
                              } else {
                                if ((((((((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(176)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(98)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_device_id) === Number(19)) ? 1 : 0))) ? 1 : 0)) {
                                  members.m_flash_mode = ((16) | 0);
                                } else {
                                  if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((9) | 0);
                                  } else {
                                    if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                      members.m_flash_mode = ((8) | 0);
                                    } else {
                                      if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                        members.m_flash_mode = ((13) | 0);
                                      } else {
                                        if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                          members.m_flash_mode = ((0) | 0);
                                        } else {
                                          if (((((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) || (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                                            members.m_flash_mode = ((0) | 0);
                                            members.m_fast_mode = ((1) ? 1 : 0);
                                          } else {
                                            0;
                                            members.m_flash_mode = ((0) | 0);
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        break;
      }
      case 9:
      {
        if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((10) | 0);
        } else {
          if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((10) | 0);
          } else {
            0;
          }
        }
        break;
      }
      case 10:
      {
        if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((11) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((11) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((11) | 0);
            } else {
              if (((((((((Number(((address) & (h_m_addrmask))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                members.m_flash_mode = ((11) | 0);
              } else {
                0;
              }
            }
          }
        }
        break;
      }
      case 11:
      {
        if (((((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 0); const bytes = Number(237568); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 245760); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
          } else {
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 0); const bytes = Number(h_m_size); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
          }
          members.m_status = ((8) & 0xff);
          members.m_flash_mode = ((12) | 0);
          if (h_m_sector_is_4k) {
            ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
          } else {
            if (h_m_sector_is_16k) {
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](4) : runtime.macro("attotime::from_seconds", 4))) ?? 0);
            } else {
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](16) : runtime.macro("attotime::from_seconds", 16))) ?? 0);
            }
          }
        } else {
          if (((Number(((data) & (255))) === Number(48)) ? 1 : 0)) {
            let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            if (h_m_sector_is_4k) {
              (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-4096))); const bytes = Number(4096); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-2048) : (-4096))))) | 0);
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](125) : runtime.macro("attotime::from_msec", 125))) ?? 0);
            } else {
              if (h_m_sector_is_16k) {
                (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
              } else {
                if ((((h_m_top_boot_sector) && (((Number(address) >= Number(((h_m_size) - (65536)))) ? 1 : 0))) ? 1 : 0)) {
                  if (((Number(address) >= Number(((h_m_size) - (16384)))) ? 1 : 0)) {
                    (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                    members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                    ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                  } else {
                    if (((Number(address) >= Number(((h_m_size) - (32768)))) ? 1 : 0)) {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                    } else {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-32768))); const bytes = Number(32768); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                    }
                  }
                } else {
                  if ((((h_m_bot_boot_sector) && (((Number(address) < Number(65536)) ? 1 : 0))) ? 1 : 0)) {
                    if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                    } else {
                      if (((Number(address) < Number(16384)) ? 1 : 0)) {
                        (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                        members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                        ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                      } else {
                        if (((Number(address) < Number(32768)) ? 1 : 0)) {
                          (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                          members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                          ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                        } else {
                          (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-32768))); const bytes = Number(32768); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                          members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                          ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                        }
                      }
                    }
                  } else {
                    if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
                      let sectors: any = new Uint32Array([65536, 65536, 65536, 32768, 8192, 8192, 16384]);
                      let sec_num: any = ((0) >>> 0);
                      let toffset: any = ((base) >>> 0);
                      while (((Number(toffset) >= Number(runtime.readIndex(sectors, sec_num))) ? 1 : 0)) {
                        toffset = ((((toffset) - (runtime.readIndex(sectors, (() => { const previous = sec_num; sec_num = ((((sec_num) + (1))) >>> 0); return previous; })())))) >>> 0);
                      }
                      let sec_len: any = ((runtime.readIndex(sectors, sec_num)) >>> 0);
                      if (((Number(sec_num) !== Number(5)) ? 1 : 0)) {
                        (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & ((~((sec_len) - (1)))))); const bytes = Number(sec_len); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      }
                      members.m_erase_sector = ((((address) & ((~((sec_len) - (1)))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                    } else {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-65536))); const bytes = Number(65536); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-32768) : (-65536))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                    }
                  }
                }
              }
            }
            members.m_status = ((8) & 0xff);
            members.m_flash_mode = ((12) | 0);
          } else {
            if (((((((((Number(((data) & (255))) === Number(32)) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(31)) ? 1 : 0))) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(213)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_sdp = ((0) ? 1 : 0);
              members.m_flash_mode = ((17) | 0);
              members.m_byte_count = ((0) & 0xffff);
            } else {
              if (((((((((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(96)) ? 1 : 0))) ? 1 : 0)) && (((Number(((address) & (65535))) === Number(21845)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((8) | 0);
                0;
              } else {
                0;
              }
            }
          }
        }
        break;
      }
      case 13:
      {
        switch (h_m_bits) {
          case 8:
          {
            if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
              if ((((((Number(address) < Number(237568)) ? 1 : 0)) || (((Number(address) >= Number(245760)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(runtime.writableMember("m_data"), address, ((runtime.readIndex(runtime.writableMember("m_data"), address)) & (data)));
              }
            } else {
              runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            }
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 14:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((15) | 0);
        break;
      }
      case 15:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 3:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_status = ((128) & 0xff);
        if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((0) | 0);
        } else {
          members.m_flash_mode = ((2) | 0);
        }
        break;
      }
      case 17:
      {
        if ((((((((((((Number((members.m_byte_count ?? 0)) === Number(0)) ? 1 : 0)) && ((((members.m_sdp ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((6) | 0);
        } else {
          switch (h_m_bits) {
            case 8:
            {
              runtime.writeIndex(runtime.writableMember("m_data"), address, data);
              break;
            }
            case 16:
            {
              runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
              runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
              break;
            }
            default:
            {
              0;
              break;
            }
          }
          members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          if (((Number((members.m_byte_count ?? 0)) === Number(h_m_page_size)) ? 1 : 0)) {
            if ((members.m_sdp ?? 0)) {
              members.m_flash_mode = ((0) | 0);
            }
            members.m_byte_count = ((0) & 0xffff);
          }
        }
        break;
      }
      case 21:
      {
        if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((0) | 0);
        } else {
          runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
          runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
          members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          if (((Number((members.m_byte_count ?? 0)) === Number(h_m_page_size)) ? 1 : 0)) {
            members.m_flash_mode = ((0) | 0);
            members.m_sdp = ((0) ? 1 : 0);
            members.m_byte_count = ((0) & 0xffff);
          }
        }
        break;
      }
      case 4:
      {
        if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
          if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
            let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-256))); const bytes = Number(256); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](4) : runtime.macro("attotime::from_msec", 4))) ?? 0);
          } else {
            if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(17521)) ? 1 : 0))) ? 1 : 0)) {
              let base: any = ((((((address) & (262143))) * (2))) >>> 0);
              let size: any = ((0) | 0);
              let duration: any = ((0) | 0);
              if (((Number(base) < Number(16384)) ? 1 : 0)) {
                base = ((0) >>> 0);
                size = ((16384) | 0);
                duration = ((300) | 0);
              } else {
                if (((Number(base) < Number(32768)) ? 1 : 0)) {
                  base = ((((base) & (24576))) >>> 0);
                  size = ((8192) | 0);
                  duration = ((300) | 0);
                } else {
                  if (((Number(base) < Number(131072)) ? 1 : 0)) {
                    base = ((32768) >>> 0);
                    size = ((98304) | 0);
                    duration = ((600) | 0);
                  } else {
                    base = ((((base) & (393216))) >>> 0);
                    size = ((131072) | 0);
                    duration = ((600) | 0);
                  }
                }
              }
              (() => { const target = runtime.addressOf((members.m_data ?? 0), base); const bytes = Number(size); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](duration) : runtime.macro("attotime::from_msec", duration))) ?? 0);
            } else {
              let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
              (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-65536))); const bytes = Number(65536); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
            }
          }
          members.m_status = ((0) & 0xff);
          members.m_flash_mode = ((2) | 0);
          break;
        } else {
          0;
        }
        break;
      }
      case 5:
      {
        switch (((data) & (255))) {
          case 241:
          {
            members.m_flash_master_lock = ((1) ? 1 : 0);
            break;
          }
          case 208:
          {
            members.m_flash_master_lock = ((0) ? 1 : 0);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((2) | 0);
        break;
      }
      case 18:
      {
        if (((Number(h_m_bits) === Number(16)) ? 1 : 0)) {
          members.m_write_buffer_count = ((runtime.add((__l["std::min"] ? __l["std::min"](data, 15) : runtime.macro("std::min", data, 15)), 1)) >>> 0);
        } else {
          members.m_write_buffer_count = ((runtime.add((__l["std::min"] ? __l["std::min"](data, 31) : runtime.macro("std::min", data, 31)), 1)) >>> 0);
        }
        members.m_status = ((128) & 0xff);
        members.m_flash_mode = ((19) | 0);
        members.m_byte_count = ((0) & 0xffff);
        break;
      }
      case 19:
      {
        if (((Number((members.m_byte_count ?? 0)) < Number((members.m_write_buffer_count ?? 0))) ? 1 : 0)) {
          if (((Number((members.m_byte_count ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_write_buffer_start_address = ((address) >>> 0);
          }
          if (((Number(address) >= Number((((members.m_write_buffer_start_address ?? 0)) + ((members.m_write_buffer_count ?? 0))))) ? 1 : 0)) {
            members.m_status = ((48) & 0xff);
            members.m_flash_mode = ((2) | 0);
          } else {
            if (((Number(h_m_bits) === Number(8)) ? 1 : 0)) {
              h_m_write_buffer[(members.m_byte_count ?? 0)] = data;
            } else {
              h_m_write_buffer[(((members.m_byte_count ?? 0)) * (2))] = runtime.shiftRight(data, 8);
              h_m_write_buffer[runtime.add((((members.m_byte_count ?? 0)) * (2)), 1)] = data;
            }
            members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          }
        } else {
          if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
            let base: any = (((((members.m_write_buffer_start_address ?? 0)) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            let len: any = (((((members.m_write_buffer_count ?? 0)) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            (__l["memcpy"] ? __l["memcpy"](runtime.addressOf((members.m_data ?? 0), base), h_m_write_buffer, len) : runtime.macro("memcpy", runtime.addressOf((members.m_data ?? 0), base), h_m_write_buffer, len));
            members.m_status = ((128) & 0xff);
          } else {
            members.m_status = ((48) & 0xff);
          }
          members.m_flash_mode = ((2) | 0);
        }
        break;
      }
      case 16:
      {
        members.m_bank = ((((data) & (255))) | 0);
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 20:
      {
        if ((((((Number(((data) & (255))) === Number(240)) ? 1 : 0)) || (((Number(((data) & (255))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
          members.m_fast_mode = ((0) ? 1 : 0);
          members.m_flash_mode = ((0) | 0);
        } else {
          0;
        }
        break;
      }
    }
  }

  function method_delay_tick(runtime: any, param: any): any {
    const members = runtime.members;

    switch ((members.m_flash_mode ?? 0)) {
      case 2:
      {
        members.m_status = ((128) & 0xff);
        break;
      }
      case 12:
      {
        members.m_flash_mode = ((0) | 0);
        members.m_status = ((128) & 0xff);
        break;
      }
    }
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_read_full(runtime, offset)) & 0xff);
  }

  function method_read_full(runtime: any, address: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bits = members.m_bits ?? 0;
    const h_m_maker_id = members.m_maker_id ?? 0;
    const h_m_device_id = members.m_device_id ?? 0;
    const h_m_device_id2 = members.m_device_id2 ?? 0;
    const h_m_device_id3 = members.m_device_id3 ?? 0;
    let data: any = ((0) >>> 0);
    address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? 0)) {
      default:
      {
        switch (h_m_bits) {
          case 8:
          {
            data = ((runtime.readIndex((members.m_data ?? 0), address)) >>> 0);
            break;
          }
          case 16:
          {
            data = ((((((runtime.readIndex((members.m_data ?? 0), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? 0), runtime.add(((address) * (2)), 1))))) >>> 0);
            break;
          }
        }
        break;
      }
      case 2:
      case 19:
      {
        data = (((members.m_status ?? 0)) >>> 0);
        break;
      }
      case 18:
      {
        data = ((128) >>> 0);
        break;
      }
      case 8:
      {
        if (((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(53)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(59)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 4:
            {
              data = ((0) >>> 0);
              break;
            }
          }
        } else {
          if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
            switch (((address) & (255))) {
              case 0:
              {
                data = ((h_m_maker_id) >>> 0);
                break;
              }
              case 2:
              {
                data = ((h_m_device_id) >>> 0);
                break;
              }
              case 4:
              {
                0;
                break;
              }
              case 6:
              {
                0;
                break;
              }
              case 28:
              {
                data = ((h_m_device_id2) >>> 0);
                break;
              }
              case 30:
              {
                data = ((h_m_device_id3) >>> 0);
                break;
              }
            }
          } else {
            if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
              switch (address) {
                case 0:
                {
                  data = ((((h_m_maker_id) << (8))) >>> 0);
                  break;
                }
                case 1:
                {
                  data = ((((h_m_device_id) << (8))) >>> 0);
                  break;
                }
                case 2:
                {
                  data = ((65024) >>> 0);
                  break;
                }
                default:
                {
                  if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                  }
                  data = ((65024) >>> 0);
                  break;
                }
              }
            } else {
              switch (((address) & (255))) {
                case 0:
                {
                  data = ((h_m_maker_id) >>> 0);
                  break;
                }
                case 1:
                {
                  data = ((h_m_device_id) >>> 0);
                  break;
                }
                case 2:
                {
                  data = ((0) >>> 0);
                  break;
                }
              }
            }
          }
        }
        break;
      }
      case 1:
      {
        if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(22)) ? 1 : 0))) ? 1 : 0)) {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 4:
            {
              data = ((0) >>> 0);
              break;
            }
          }
        } else {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 1:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((0) >>> 0);
              break;
            }
            case 3:
            {
              if ((members.m_flash_master_lock ?? 0)) {
                data = ((1) >>> 0);
              } else {
                data = ((0) >>> 0);
              }
              break;
            }
          }
        }
        break;
      }
      case 12:
      {
        if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && ((((((Number(address) < Number((members.m_erase_sector ?? 0))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? 0)) + (65536)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (h_m_bits) {
            case 8:
            {
              data = ((runtime.readIndex((members.m_data ?? 0), address)) >>> 0);
              break;
            }
            case 16:
            {
              data = ((((((runtime.readIndex((members.m_data ?? 0), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? 0), runtime.add(((address) * (2)), 1))))) >>> 0);
              break;
            }
          }
        } else {
          members.m_status = ((((members.m_status) ^ (68))) & 0xff);
          data = (((members.m_status ?? 0)) >>> 0);
        }
        break;
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_write_full(runtime, offset, data);
  }

  function method_read_raw(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.readIndex((members.m_data ?? 0), offset)) & 0xff);
  }

  function method_write_raw(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }

  function method_intelfsh8_device__read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_read_full(runtime, offset)) & 0xff);
  }

  function method_intelfsh8_device__write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_write_full(runtime, offset, data);
  }

  function method_intelfsh8_device__read_raw(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.readIndex((members.m_data ?? 0), offset)) & 0xff);
  }

  function method_intelfsh8_device__write_raw(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }
  return {
    "write_full": method_write_full,
    "delay_tick": method_delay_tick,
    "read": method_read,
    "read_full": method_read_full,
    "write": method_write,
    "read_raw": method_read_raw,
    "write_raw": method_write_raw,
    "intelfsh8_device::read": method_intelfsh8_device__read,
    "intelfsh8_device::write": method_intelfsh8_device__write,
    "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
    "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_2mbit"]!.children![0]!.definition.compiledMethodLinks = ["attotime::from_msec","attotime::from_seconds","machine","machine().side_effects_disabled","memcpy","std::min"];
definition.slot!.options["sgc_4mbit"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((__l["m_flash.read"] ? __l["m_flash.read"](method_banked_address(runtime, ((32768) | (offset)))) : ((members.m_flash)?.read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0))) & 0xff);
  }

  function method_banked_address(runtime: any, offset: any): any {
    const members = runtime.members;

    if (((Number(offset) < Number(40960)) ? 1 : 0)) {
      return (((((members.m_slot0_bank ?? 0)) << (13))) | (((offset) & (8191))));
    } else {
      if (((Number(offset) < Number(49152)) ? 1 : 0)) {
        return (((((members.m_slot1_bank ?? 0)) << (13))) | (((offset) & (8191))));
      } else {
        if (((Number(offset) < Number(57344)) ? 1 : 0)) {
          return (((((members.m_slot2_bank ?? 0)) << (13))) | (((offset) & (8191))));
        } else {
          return (((((members.m_slot3_bank ?? 0)) << (13))) | (((offset) & (8191))));
        }
      }
    }
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    offset = ((offset) | (32768));
    let max_banks: any = ((runtime.divide((members.m_rom_size ?? 0), 8192)) & 0xff);
    0;
    switch (offset) {
      case 65532:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot1_bank = ((data) & 0xff);
        }
        break;
      }
      case 65533:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot2_bank = ((data) & 0xff);
        }
        break;
      }
      case 65534:
      {
        if (((Number(data) < Number(max_banks)) ? 1 : 0)) {
          members.m_slot3_bank = ((data) & 0xff);
        }
        break;
      }
      case 65535:
      {
        members.m_flash_a16 = ((data) & 0xff);
        break;
      }
      default:
      {
        let addr: any = ((((((((members.m_flash_a16 ?? 0)) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
        0;
        (__l["m_flash.write"] ? __l["m_flash.write"](addr, data) : ((members.m_flash)?.write?.(addr, data) ?? 0));
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "banked_address": method_banked_address,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_4mbit"]!.compiledMethodLinks = ["m_flash.read","m_flash.write"];
definition.slot!.options["sgc_4mbit"]!.children![0]!.definition.compiledMethods = (() => {


  function method_write_full(runtime: any, address: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_maker_id = members.m_maker_id ?? 0;
    const h_m_device_id = members.m_device_id ?? 0;
    const h_m_addrmask = members.m_addrmask ?? 0;
    const h_m_size = members.m_size ?? 0;
    const h_m_sector_is_4k = members.m_sector_is_4k ?? 0;
    const h_m_sector_is_16k = members.m_sector_is_16k ?? 0;
    const h_m_bits = members.m_bits ?? 0;
    const h_m_top_boot_sector = members.m_top_boot_sector ?? 0;
    const h_m_bot_boot_sector = members.m_bot_boot_sector ?? 0;
    const h_m_page_size = members.m_page_size ?? 0;
    const h_m_write_buffer = members.m_write_buffer ?? 0;
    address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? 0)) {
      case 0:
      case 2:
      case 1:
      case 8:
      {
        switch (((data) & (255))) {
          case 240:
          case 255:
          {
            members.m_flash_mode = ((0) | 0);
            break;
          }
          case 144:
          {
            if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((20) | 0);
            } else {
              members.m_flash_mode = ((1) | 0);
            }
            break;
          }
          case 64:
          case 16:
          {
            members.m_flash_mode = ((3) | 0);
            break;
          }
          case 80:
          {
            if ((((((((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(97)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(32)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_flash_mode ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
              0;
            } else {
              if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((14) | 0);
              } else {
                members.m_status = ((128) & 0xff);
                members.m_flash_mode = ((2) | 0);
              }
            }
            break;
          }
          case 32:
          {
            if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(97)) ? 1 : 0))) ? 1 : 0)) {
              0;
            } else {
              if ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((0) | 0);
                members.m_fast_mode = ((1) ? 1 : 0);
              } else {
                members.m_flash_mode = ((4) | 0);
              }
            }
            break;
          }
          case 96:
          {
            members.m_flash_mode = ((5) | 0);
            break;
          }
          case 112:
          {
            members.m_flash_mode = ((2) | 0);
            break;
          }
          case 160:
          {
            if (((((members.m_fast_mode ?? 0)) && ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(8941)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(8830)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((13) | 0);
            } else {
              0;
            }
            break;
          }
          case 170:
          {
            if (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) {
              members.m_flash_mode = ((6) | 0);
            } else {
              if (((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) {
                members.m_flash_mode = ((6) | 0);
              }
            }
            break;
          }
          case 232:
          {
            if (((((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) >= Number(20)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_device_id) <= Number(22)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((18) | 0);
            } else {
              0;
            }
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        break;
      }
      case 6:
      {
        if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((7) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((7) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((7) | 0);
            } else {
              if (((((((((Number(((address) & (h_m_addrmask))) === Number(((43690) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                members.m_flash_mode = ((7) | 0);
              } else {
                0;
                members.m_flash_mode = ((0) | 0);
              }
            }
          }
        }
        break;
      }
      case 7:
      {
        if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((8) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((8) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((8) | 0);
            } else {
              if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((9) | 0);
              } else {
                if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                  members.m_flash_mode = ((9) | 0);
                } else {
                  if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) {
                    members.m_flash_mode = ((9) | 0);
                  } else {
                    if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                      members.m_flash_mode = ((13) | 0);
                    } else {
                      if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                        if ((((((Number(h_m_maker_id) === Number(31)) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(213)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                          members.m_sdp = ((1) ? 1 : 0);
                          members.m_flash_mode = ((17) | 0);
                          members.m_byte_count = ((0) & 0xffff);
                        } else {
                          if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
                            0;
                            members.m_byte_count = ((0) & 0xffff);
                            members.m_flash_mode = ((21) | 0);
                          } else {
                            members.m_flash_mode = ((13) | 0);
                          }
                        }
                      } else {
                        if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) {
                          members.m_flash_mode = ((13) | 0);
                        } else {
                          if ((((((Number(((address) & (65535))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                            members.m_flash_mode = ((0) | 0);
                          } else {
                            if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                              members.m_flash_mode = ((0) | 0);
                            } else {
                              if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) {
                                members.m_flash_mode = ((0) | 0);
                              } else {
                                if ((((((((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(176)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(98)) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_device_id) === Number(19)) ? 1 : 0))) ? 1 : 0)) {
                                  members.m_flash_mode = ((16) | 0);
                                } else {
                                  if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(128)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                    members.m_flash_mode = ((9) | 0);
                                  } else {
                                    if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(144)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                      members.m_flash_mode = ((8) | 0);
                                    } else {
                                      if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(160)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                        members.m_flash_mode = ((13) | 0);
                                      } else {
                                        if (((((((((Number(((address) & (h_m_addrmask))) === Number(((21845) & (h_m_addrmask)))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(240)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                                          members.m_flash_mode = ((0) | 0);
                                        } else {
                                          if (((((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) || (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
                                            members.m_flash_mode = ((0) | 0);
                                            members.m_fast_mode = ((1) ? 1 : 0);
                                          } else {
                                            0;
                                            members.m_flash_mode = ((0) | 0);
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        break;
      }
      case 9:
      {
        if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((10) | 0);
        } else {
          if ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((10) | 0);
          } else {
            0;
          }
        }
        break;
      }
      case 10:
      {
        if ((((((Number(((address) & (65535))) === Number(682)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((11) | 0);
        } else {
          if ((((((Number(((address) & (65535))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
            members.m_flash_mode = ((11) | 0);
          } else {
            if ((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) {
              members.m_flash_mode = ((11) | 0);
            } else {
              if (((((((((Number(((address) & (h_m_addrmask))) === Number(10922)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(85)) ? 1 : 0))) ? 1 : 0)) && (h_m_addrmask)) ? 1 : 0)) {
                members.m_flash_mode = ((11) | 0);
              } else {
                0;
              }
            }
          }
        }
        break;
      }
      case 11:
      {
        if (((((((((Number(((address) & (4095))) === Number(1365)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(((address) & (4095))) === Number(2730)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(16)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 0); const bytes = Number(237568); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 245760); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
          } else {
            (() => { const target = runtime.addressOf((members.m_data ?? 0), 0); const bytes = Number(h_m_size); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
          }
          members.m_status = ((8) & 0xff);
          members.m_flash_mode = ((12) | 0);
          if (h_m_sector_is_4k) {
            ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
          } else {
            if (h_m_sector_is_16k) {
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](4) : runtime.macro("attotime::from_seconds", 4))) ?? 0);
            } else {
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](16) : runtime.macro("attotime::from_seconds", 16))) ?? 0);
            }
          }
        } else {
          if (((Number(((data) & (255))) === Number(48)) ? 1 : 0)) {
            let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            if (h_m_sector_is_4k) {
              (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-4096))); const bytes = Number(4096); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-2048) : (-4096))))) | 0);
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](125) : runtime.macro("attotime::from_msec", 125))) ?? 0);
            } else {
              if (h_m_sector_is_16k) {
                (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
              } else {
                if ((((h_m_top_boot_sector) && (((Number(address) >= Number(((h_m_size) - (65536)))) ? 1 : 0))) ? 1 : 0)) {
                  if (((Number(address) >= Number(((h_m_size) - (16384)))) ? 1 : 0)) {
                    (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                    members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                    ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                  } else {
                    if (((Number(address) >= Number(((h_m_size) - (32768)))) ? 1 : 0)) {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                    } else {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-32768))); const bytes = Number(32768); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                    }
                  }
                } else {
                  if ((((h_m_bot_boot_sector) && (((Number(address) < Number(65536)) ? 1 : 0))) ? 1 : 0)) {
                    if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                    } else {
                      if (((Number(address) < Number(16384)) ? 1 : 0)) {
                        (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-16384))); const bytes = Number(16384); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                        members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-8192) : (-16384))))) | 0);
                        ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                      } else {
                        if (((Number(address) < Number(32768)) ? 1 : 0)) {
                          (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-8192))); const bytes = Number(8192); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                          members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-4096) : (-8192))))) | 0);
                          ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](250) : runtime.macro("attotime::from_msec", 250))) ?? 0);
                        } else {
                          (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-32768))); const bytes = Number(32768); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                          members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-16384) : (-32768))))) | 0);
                          ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](500) : runtime.macro("attotime::from_msec", 500))) ?? 0);
                        }
                      }
                    }
                  } else {
                    if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
                      let sectors: any = new Uint32Array([65536, 65536, 65536, 32768, 8192, 8192, 16384]);
                      let sec_num: any = ((0) >>> 0);
                      let toffset: any = ((base) >>> 0);
                      while (((Number(toffset) >= Number(runtime.readIndex(sectors, sec_num))) ? 1 : 0)) {
                        toffset = ((((toffset) - (runtime.readIndex(sectors, (() => { const previous = sec_num; sec_num = ((((sec_num) + (1))) >>> 0); return previous; })())))) >>> 0);
                      }
                      let sec_len: any = ((runtime.readIndex(sectors, sec_num)) >>> 0);
                      if (((Number(sec_num) !== Number(5)) ? 1 : 0)) {
                        (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & ((~((sec_len) - (1)))))); const bytes = Number(sec_len); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      }
                      members.m_erase_sector = ((((address) & ((~((sec_len) - (1)))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                    } else {
                      (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-65536))); const bytes = Number(65536); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
                      members.m_erase_sector = ((((address) & (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (-32768) : (-65536))))) | 0);
                      ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
                    }
                  }
                }
              }
            }
            members.m_status = ((8) & 0xff);
            members.m_flash_mode = ((12) | 0);
          } else {
            if (((((((((Number(((data) & (255))) === Number(32)) ? 1 : 0)) && (((Number(h_m_maker_id) === Number(31)) ? 1 : 0))) ? 1 : 0)) && ((((((Number(h_m_device_id) === Number(213)) ? 1 : 0)) || (((Number(h_m_device_id) === Number(218)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
              members.m_sdp = ((0) ? 1 : 0);
              members.m_flash_mode = ((17) | 0);
              members.m_byte_count = ((0) & 0xffff);
            } else {
              if (((((((((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(96)) ? 1 : 0))) ? 1 : 0)) && (((Number(((address) & (65535))) === Number(21845)) ? 1 : 0))) ? 1 : 0)) {
                members.m_flash_mode = ((8) | 0);
                0;
              } else {
                0;
              }
            }
          }
        }
        break;
      }
      case 13:
      {
        switch (h_m_bits) {
          case 8:
          {
            if ((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(64)) ? 1 : 0))) ? 1 : 0)) {
              if ((((((Number(address) < Number(237568)) ? 1 : 0)) || (((Number(address) >= Number(245760)) ? 1 : 0))) ? 1 : 0)) {
                runtime.writeIndex(runtime.writableMember("m_data"), address, ((runtime.readIndex(runtime.writableMember("m_data"), address)) & (data)));
              }
            } else {
              runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            }
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 14:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((15) | 0);
        break;
      }
      case 15:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            0;
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 3:
      {
        switch (h_m_bits) {
          case 8:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), address, data);
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
            runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_status = ((128) & 0xff);
        if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((0) | 0);
        } else {
          members.m_flash_mode = ((2) | 0);
        }
        break;
      }
      case 17:
      {
        if ((((((((((((Number((members.m_byte_count ?? 0)) === Number(0)) ? 1 : 0)) && ((((members.m_sdp ?? 0)) ? 0 : 1))) ? 1 : 0)) && (((Number(((address) & (4095))) === Number(1365)) ? 1 : 0))) ? 1 : 0)) && (((Number(((data) & (255))) === Number(170)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((6) | 0);
        } else {
          switch (h_m_bits) {
            case 8:
            {
              runtime.writeIndex(runtime.writableMember("m_data"), address, data);
              break;
            }
            case 16:
            {
              runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
              runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
              break;
            }
            default:
            {
              0;
              break;
            }
          }
          members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          if (((Number((members.m_byte_count ?? 0)) === Number(h_m_page_size)) ? 1 : 0)) {
            if ((members.m_sdp ?? 0)) {
              members.m_flash_mode = ((0) | 0);
            }
            members.m_byte_count = ((0) & 0xffff);
          }
        }
        break;
      }
      case 21:
      {
        if ((((((Number(((address) & (65535))) === Number(21845)) ? 1 : 0)) && (((Number(((data) & (255))) === Number(32)) ? 1 : 0))) ? 1 : 0)) {
          members.m_flash_mode = ((0) | 0);
        } else {
          runtime.writeIndex(runtime.writableMember("m_data"), ((address) * (2)), runtime.shiftRight(data, 8));
          runtime.writeIndex(runtime.writableMember("m_data"), runtime.add(((address) * (2)), 1), data);
          members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          if (((Number((members.m_byte_count ?? 0)) === Number(h_m_page_size)) ? 1 : 0)) {
            members.m_flash_mode = ((0) | 0);
            members.m_sdp = ((0) ? 1 : 0);
            members.m_byte_count = ((0) & 0xffff);
          }
        }
        break;
      }
      case 4:
      {
        if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
          if ((((((Number(h_m_maker_id) === Number(191)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
            let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-256))); const bytes = Number(256); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
            ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](4) : runtime.macro("attotime::from_msec", 4))) ?? 0);
          } else {
            if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(17521)) ? 1 : 0))) ? 1 : 0)) {
              let base: any = ((((((address) & (262143))) * (2))) >>> 0);
              let size: any = ((0) | 0);
              let duration: any = ((0) | 0);
              if (((Number(base) < Number(16384)) ? 1 : 0)) {
                base = ((0) >>> 0);
                size = ((16384) | 0);
                duration = ((300) | 0);
              } else {
                if (((Number(base) < Number(32768)) ? 1 : 0)) {
                  base = ((((base) & (24576))) >>> 0);
                  size = ((8192) | 0);
                  duration = ((300) | 0);
                } else {
                  if (((Number(base) < Number(131072)) ? 1 : 0)) {
                    base = ((32768) >>> 0);
                    size = ((98304) | 0);
                    duration = ((600) | 0);
                  } else {
                    base = ((((base) & (393216))) >>> 0);
                    size = ((131072) | 0);
                    duration = ((600) | 0);
                  }
                }
              }
              (() => { const target = runtime.addressOf((members.m_data ?? 0), base); const bytes = Number(size); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_msec"] ? __l["attotime::from_msec"](duration) : runtime.macro("attotime::from_msec", duration))) ?? 0);
            } else {
              let base: any = ((((address) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
              (() => { const target = runtime.addressOf((members.m_data ?? 0), ((base) & (-65536))); const bytes = Number(65536); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 255, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(255, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(255, 0, bytes); return target; })();
              ((runtime.dereference(members.m_timer)).adjust?.((__l["attotime::from_seconds"] ? __l["attotime::from_seconds"](1) : runtime.macro("attotime::from_seconds", 1))) ?? 0);
            }
          }
          members.m_status = ((0) & 0xff);
          members.m_flash_mode = ((2) | 0);
          break;
        } else {
          0;
        }
        break;
      }
      case 5:
      {
        switch (((data) & (255))) {
          case 241:
          {
            members.m_flash_master_lock = ((1) ? 1 : 0);
            break;
          }
          case 208:
          {
            members.m_flash_master_lock = ((0) ? 1 : 0);
            break;
          }
          default:
          {
            0;
            break;
          }
        }
        members.m_flash_mode = ((2) | 0);
        break;
      }
      case 18:
      {
        if (((Number(h_m_bits) === Number(16)) ? 1 : 0)) {
          members.m_write_buffer_count = ((runtime.add((__l["std::min"] ? __l["std::min"](data, 15) : runtime.macro("std::min", data, 15)), 1)) >>> 0);
        } else {
          members.m_write_buffer_count = ((runtime.add((__l["std::min"] ? __l["std::min"](data, 31) : runtime.macro("std::min", data, 31)), 1)) >>> 0);
        }
        members.m_status = ((128) & 0xff);
        members.m_flash_mode = ((19) | 0);
        members.m_byte_count = ((0) & 0xffff);
        break;
      }
      case 19:
      {
        if (((Number((members.m_byte_count ?? 0)) < Number((members.m_write_buffer_count ?? 0))) ? 1 : 0)) {
          if (((Number((members.m_byte_count ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_write_buffer_start_address = ((address) >>> 0);
          }
          if (((Number(address) >= Number((((members.m_write_buffer_start_address ?? 0)) + ((members.m_write_buffer_count ?? 0))))) ? 1 : 0)) {
            members.m_status = ((48) & 0xff);
            members.m_flash_mode = ((2) | 0);
          } else {
            if (((Number(h_m_bits) === Number(8)) ? 1 : 0)) {
              h_m_write_buffer[(members.m_byte_count ?? 0)] = data;
            } else {
              h_m_write_buffer[(((members.m_byte_count ?? 0)) * (2))] = runtime.shiftRight(data, 8);
              h_m_write_buffer[runtime.add((((members.m_byte_count ?? 0)) * (2)), 1)] = data;
            }
            members.m_byte_count = ((((members.m_byte_count) + (1))) & 0xffff);
          }
        } else {
          if (((Number(((data) & (255))) === Number(208)) ? 1 : 0)) {
            let base: any = (((((members.m_write_buffer_start_address ?? 0)) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            let len: any = (((((members.m_write_buffer_count ?? 0)) * (((((Number(h_m_bits) === Number(16)) ? 1 : 0)) ? (2) : (1))))) >>> 0);
            (__l["memcpy"] ? __l["memcpy"](runtime.addressOf((members.m_data ?? 0), base), h_m_write_buffer, len) : runtime.macro("memcpy", runtime.addressOf((members.m_data ?? 0), base), h_m_write_buffer, len));
            members.m_status = ((128) & 0xff);
          } else {
            members.m_status = ((48) & 0xff);
          }
          members.m_flash_mode = ((2) | 0);
        }
        break;
      }
      case 16:
      {
        members.m_bank = ((((data) & (255))) | 0);
        members.m_flash_mode = ((0) | 0);
        break;
      }
      case 20:
      {
        if ((((((Number(((data) & (255))) === Number(240)) ? 1 : 0)) || (((Number(((data) & (255))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
          members.m_fast_mode = ((0) ? 1 : 0);
          members.m_flash_mode = ((0) | 0);
        } else {
          0;
        }
        break;
      }
    }
  }

  function method_delay_tick(runtime: any, param: any): any {
    const members = runtime.members;

    switch ((members.m_flash_mode ?? 0)) {
      case 2:
      {
        members.m_status = ((128) & 0xff);
        break;
      }
      case 12:
      {
        members.m_flash_mode = ((0) | 0);
        members.m_status = ((128) & 0xff);
        break;
      }
    }
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_read_full(runtime, offset)) & 0xff);
  }

  function method_read_full(runtime: any, address: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bits = members.m_bits ?? 0;
    const h_m_maker_id = members.m_maker_id ?? 0;
    const h_m_device_id = members.m_device_id ?? 0;
    const h_m_device_id2 = members.m_device_id2 ?? 0;
    const h_m_device_id3 = members.m_device_id3 ?? 0;
    let data: any = ((0) >>> 0);
    address = ((((address) + ((((members.m_bank ?? 0)) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? 0)) {
      default:
      {
        switch (h_m_bits) {
          case 8:
          {
            data = ((runtime.readIndex((members.m_data ?? 0), address)) >>> 0);
            break;
          }
          case 16:
          {
            data = ((((((runtime.readIndex((members.m_data ?? 0), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? 0), runtime.add(((address) * (2)), 1))))) >>> 0);
            break;
          }
        }
        break;
      }
      case 2:
      case 19:
      {
        data = (((members.m_status ?? 0)) >>> 0);
        break;
      }
      case 18:
      {
        data = ((128) >>> 0);
        break;
      }
      case 8:
      {
        if (((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(53)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(h_m_maker_id) === Number(1)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(59)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 4:
            {
              data = ((0) >>> 0);
              break;
            }
          }
        } else {
          if (((Number(h_m_maker_id) === Number(32)) ? 1 : 0)) {
            switch (((address) & (255))) {
              case 0:
              {
                data = ((h_m_maker_id) >>> 0);
                break;
              }
              case 2:
              {
                data = ((h_m_device_id) >>> 0);
                break;
              }
              case 4:
              {
                0;
                break;
              }
              case 6:
              {
                0;
                break;
              }
              case 28:
              {
                data = ((h_m_device_id2) >>> 0);
                break;
              }
              case 30:
              {
                data = ((h_m_device_id3) >>> 0);
                break;
              }
            }
          } else {
            if (((Number(h_m_maker_id) === Number(218)) ? 1 : 0)) {
              switch (address) {
                case 0:
                {
                  data = ((((h_m_maker_id) << (8))) >>> 0);
                  break;
                }
                case 1:
                {
                  data = ((((h_m_device_id) << (8))) >>> 0);
                  break;
                }
                case 2:
                {
                  data = ((65024) >>> 0);
                  break;
                }
                default:
                {
                  if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                  }
                  data = ((65024) >>> 0);
                  break;
                }
              }
            } else {
              switch (((address) & (255))) {
                case 0:
                {
                  data = ((h_m_maker_id) >>> 0);
                  break;
                }
                case 1:
                {
                  data = ((h_m_device_id) >>> 0);
                  break;
                }
                case 2:
                {
                  data = ((0) >>> 0);
                  break;
                }
              }
            }
          }
        }
        break;
      }
      case 1:
      {
        if ((((((Number(h_m_maker_id) === Number(137)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(22)) ? 1 : 0))) ? 1 : 0)) {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 4:
            {
              data = ((0) >>> 0);
              break;
            }
          }
        } else {
          switch (((address) & (255))) {
            case 0:
            {
              data = ((h_m_maker_id) >>> 0);
              break;
            }
            case 1:
            {
              data = ((h_m_device_id) >>> 0);
              break;
            }
            case 2:
            {
              data = ((0) >>> 0);
              break;
            }
            case 3:
            {
              if ((members.m_flash_master_lock ?? 0)) {
                data = ((1) >>> 0);
              } else {
                data = ((0) >>> 0);
              }
              break;
            }
          }
        }
        break;
      }
      case 12:
      {
        if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && ((((((Number(address) < Number((members.m_erase_sector ?? 0))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? 0)) + (65536)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (h_m_bits) {
            case 8:
            {
              data = ((runtime.readIndex((members.m_data ?? 0), address)) >>> 0);
              break;
            }
            case 16:
            {
              data = ((((((runtime.readIndex((members.m_data ?? 0), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? 0), runtime.add(((address) * (2)), 1))))) >>> 0);
              break;
            }
          }
        } else {
          members.m_status = ((((members.m_status) ^ (68))) & 0xff);
          data = (((members.m_status ?? 0)) >>> 0);
        }
        break;
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_write_full(runtime, offset, data);
  }

  function method_read_raw(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.readIndex((members.m_data ?? 0), offset)) & 0xff);
  }

  function method_write_raw(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }

  function method_intelfsh8_device__read(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((method_read_full(runtime, offset)) & 0xff);
  }

  function method_intelfsh8_device__write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    method_write_full(runtime, offset, data);
  }

  function method_intelfsh8_device__read_raw(runtime: any, offset: any): any {
    const members = runtime.members;

    return ((runtime.readIndex((members.m_data ?? 0), offset)) & 0xff);
  }

  function method_intelfsh8_device__write_raw(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }
  return {
    "write_full": method_write_full,
    "delay_tick": method_delay_tick,
    "read": method_read,
    "read_full": method_read_full,
    "write": method_write,
    "read_raw": method_read_raw,
    "write_raw": method_write_raw,
    "intelfsh8_device::read": method_intelfsh8_device__read,
    "intelfsh8_device::write": method_intelfsh8_device__write,
    "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
    "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_4mbit"]!.children![0]!.definition.compiledMethodLinks = ["attotime::from_msec","attotime::from_seconds","machine","machine().side_effects_disabled","memcpy","std::min"];
definition.slot!.options["standard"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number((members.m_rom_size ?? 0))) ? 1 : 0)) {
        data = (((members.m_rom ?? 0)[offset]) & 0xff);
      }
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["xin1"]!.compiledMethods = (() => {


  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      data = (((members.m_rom ?? 0)[(((members.m_current_offset ?? 0)) + (offset))]) & 0xff);
      if ((((((_e000) ? 0 : 1)) && (((Number(offset) >= Number(32704)) ? 1 : 0))) ? 1 : 0)) {
        members.m_current_offset = ((((((32768) * (((offset) - (32704))))) % ((members.m_rom_size ?? 0)))) >>> 0);
      }
    }
    return ((data) & 0xff);
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;

    return ((255) & 0xff);
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any): any {
    const members = runtime.members;


  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
