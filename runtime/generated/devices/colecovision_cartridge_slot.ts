// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './colecovision_cartridge_slot.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((members.m_card ?? runtime.member("m_card"))) {
      data = ((((runtime.dereference(members.m_card)).read?.(offset, _8000, _a000, _c000, _e000) ?? 0)) & 0xff);
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    if ((members.m_card ?? runtime.member("m_card"))) {
      ((runtime.dereference(members.m_card)).write?.(offset, data, _8000, _a000, _c000, _e000) ?? 0);
    }
  }
  return {
    "read": method_read,
    "write": method_write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number(16384)) ? 1 : 0)) {
        data = (((members.m_rom ?? runtime.member("m_rom"))[offset]) & 0xff);
      } else {
        if (((Number(offset) === Number(32640)) ? 1 : 0)) {
          if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
            data = (((typeof (runtime.dereference(members.m_eeprom)).read_sda === 'function' ? (runtime.dereference(members.m_eeprom)).read_sda() : typeof (runtime.dereference(members.m_eeprom)).read_sda === 'number' || typeof (runtime.dereference(members.m_eeprom)).read_sda === 'boolean' ? (runtime.dereference(members.m_eeprom)).read_sda : runtime.container(members.m_eeprom, "read_sda"))) & 0xff);
          } else {
            data = ((255) & 0xff);
          }
        } else {
          if (((Number(offset) > Number(32640)) ? 1 : 0)) {
            data = ((255) & 0xff);
          } else {
            data = (((members.m_rom ?? runtime.member("m_rom"))[(((((members.m_active_bank ?? runtime.member("m_active_bank"))) << (14))) | (((offset) & (16383))))]) & 0xff);
          }
        }
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    switch (offset) {
      case 32656:
      case 32672:
      case 32688:
      {
        members.m_active_bank = ((((((offset) >>> (4))) & (3))) & 0xff);
        break;
      }
      case 32704:
      case 32720:
      {
        if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
          ((runtime.dereference(members.m_eeprom)).write_scl?.((((offset) >>> (4)) & 1)) ?? 0);
        }
        break;
      }
      case 32736:
      case 32752:
      {
        if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
          ((runtime.dereference(members.m_eeprom)).write_sda?.((((offset) >>> (4)) & 1)) ?? 0);
        }
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;

  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision_256b"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number(16384)) ? 1 : 0)) {
        data = (((members.m_rom ?? runtime.member("m_rom"))[offset]) & 0xff);
      } else {
        if (((Number(offset) === Number(32640)) ? 1 : 0)) {
          if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
            data = (((typeof (runtime.dereference(members.m_eeprom)).read_sda === 'function' ? (runtime.dereference(members.m_eeprom)).read_sda() : typeof (runtime.dereference(members.m_eeprom)).read_sda === 'number' || typeof (runtime.dereference(members.m_eeprom)).read_sda === 'boolean' ? (runtime.dereference(members.m_eeprom)).read_sda : runtime.container(members.m_eeprom, "read_sda"))) & 0xff);
          } else {
            data = ((255) & 0xff);
          }
        } else {
          if (((Number(offset) > Number(32640)) ? 1 : 0)) {
            data = ((255) & 0xff);
          } else {
            data = (((members.m_rom ?? runtime.member("m_rom"))[(((((members.m_active_bank ?? runtime.member("m_active_bank"))) << (14))) | (((offset) & (16383))))]) & 0xff);
          }
        }
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    switch (offset) {
      case 32656:
      case 32672:
      case 32688:
      {
        members.m_active_bank = ((((((offset) >>> (4))) & (3))) & 0xff);
        break;
      }
      case 32704:
      case 32720:
      {
        if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
          ((runtime.dereference(members.m_eeprom)).write_scl?.((((offset) >>> (4)) & 1)) ?? 0);
        }
        break;
      }
      case 32736:
      case 32752:
      {
        if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
          ((runtime.dereference(members.m_eeprom)).write_sda?.((((offset) >>> (4)) & 1)) ?? 0);
        }
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;

  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision_256b"]!.children![0]!.definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["activision_32k"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number(16384)) ? 1 : 0)) {
        data = (((members.m_rom ?? runtime.member("m_rom"))[offset]) & 0xff);
      } else {
        if (((Number(offset) === Number(32640)) ? 1 : 0)) {
          if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
            data = (((typeof (runtime.dereference(members.m_eeprom)).read_sda === 'function' ? (runtime.dereference(members.m_eeprom)).read_sda() : typeof (runtime.dereference(members.m_eeprom)).read_sda === 'number' || typeof (runtime.dereference(members.m_eeprom)).read_sda === 'boolean' ? (runtime.dereference(members.m_eeprom)).read_sda : runtime.container(members.m_eeprom, "read_sda"))) & 0xff);
          } else {
            data = ((255) & 0xff);
          }
        } else {
          if (((Number(offset) > Number(32640)) ? 1 : 0)) {
            data = ((255) & 0xff);
          } else {
            data = (((members.m_rom ?? runtime.member("m_rom"))[(((((members.m_active_bank ?? runtime.member("m_active_bank"))) << (14))) | (((offset) & (16383))))]) & 0xff);
          }
        }
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    switch (offset) {
      case 32656:
      case 32672:
      case 32688:
      {
        members.m_active_bank = ((((((offset) >>> (4))) & (3))) & 0xff);
        break;
      }
      case 32704:
      case 32720:
      {
        if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
          ((runtime.dereference(members.m_eeprom)).write_scl?.((((offset) >>> (4)) & 1)) ?? 0);
        }
        break;
      }
      case 32736:
      case 32752:
      {
        if ((typeof (runtime.dereference(members.m_eeprom)).found === 'function' ? (runtime.dereference(members.m_eeprom)).found() : typeof (runtime.dereference(members.m_eeprom)).found === 'number' || typeof (runtime.dereference(members.m_eeprom)).found === 'boolean' ? (runtime.dereference(members.m_eeprom)).found : runtime.container(members.m_eeprom, "found"))) {
          ((runtime.dereference(members.m_eeprom)).write_sda?.((((offset) >>> (4)) & 1)) ?? 0);
        }
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;

  }
  return {
    "read": method_read,
    "write": method_write,
    "device_colecovision_cartridge_interface::read": method_device_colecovision_cartridge_interface__read,
    "device_colecovision_cartridge_interface::write": method_device_colecovision_cartridge_interface__write
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["activision_32k"]!.children![0]!.definition.compiledMethods = {} as GeneratedDeviceMethodMap;
definition.slot!.options["megacart"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number((members.m_bankcount ?? runtime.member("m_bankcount"))) > Number(2)) ? 1 : 0)) {
        if (((Number(offset) >= Number(32704)) ? 1 : 0)) {
          members.m_activebank = ((((offset) & ((((members.m_bankcount ?? runtime.member("m_bankcount"))) - (1))))) >>> 0);
        }
        if (((Number(offset) >= Number(16384)) ? 1 : 0)) {
          offset = runtime.add((((members.m_activebank ?? runtime.member("m_activebank"))) << (14)), ((offset) - (16384)));
        } else {
          offset = runtime.add((((members.m_bankcount ?? runtime.member("m_bankcount"))) << (14)), ((offset) - (16384)));
        }
      }
      data = (((members.m_rom ?? runtime.member("m_rom"))[offset]) & 0xff);
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;

  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
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
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return ((runtime.dereference(members.m_flash)).read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0);
  }

  function method_banked_address(runtime: any, offset: any) {
    const members = runtime.members;
    if (((Number(offset) < Number(40960)) ? 1 : 0)) {
      return (((((members.m_slot0_bank ?? runtime.member("m_slot0_bank"))) << (13))) | (((offset) & (8191))));
    } else {
      if (((Number(offset) < Number(49152)) ? 1 : 0)) {
        return (((((members.m_slot1_bank ?? runtime.member("m_slot1_bank"))) << (13))) | (((offset) & (8191))));
      } else {
        if (((Number(offset) < Number(57344)) ? 1 : 0)) {
          return (((((members.m_slot2_bank ?? runtime.member("m_slot2_bank"))) << (13))) | (((offset) & (8191))));
        } else {
          return (((((members.m_slot3_bank ?? runtime.member("m_slot3_bank"))) << (13))) | (((offset) & (8191))));
        }
      }
    }
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    offset = ((offset) | (32768));
    let max_banks: any = ((runtime.divide((members.m_rom_size ?? runtime.member("m_rom_size")), 8192)) & 0xff);
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
        let addr: any = ((((((((members.m_flash_a16 ?? runtime.member("m_flash_a16"))) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
        0;
        ((runtime.dereference(members.m_flash)).write?.(addr, data) ?? 0);
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
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
definition.slot!.options["sgc_1mbit"]!.children![0]!.definition.compiledMethods = (() => {
  function method_delay_tick(runtime: any, param: any) {
    const members = runtime.members;
    switch ((members.m_flash_mode ?? runtime.member("m_flash_mode"))) {
      case 2:
      {
        members.m_status = ((128) & 0xff);
        break;
      }
      case 9:
      {
        members.m_flash_mode = ((0) | 0);
        members.m_status = ((128) & 0xff);
        break;
      }
    }
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    return method_read_full(runtime, offset);
  }

  function method_read_full(runtime: any, address: any) {
    const members = runtime.members;
    const h_m_bits = members.m_bits ?? runtime.member("m_bits");
    const h_m_maker_id = members.m_maker_id ?? runtime.member("m_maker_id");
    const h_m_device_id = members.m_device_id ?? runtime.member("m_device_id");
    const h_m_device_id2 = members.m_device_id2 ?? runtime.member("m_device_id2");
    const h_m_device_id3 = members.m_device_id3 ?? runtime.member("m_device_id3");
    let data: any = ((0) >>> 0);
    address = ((((address) + ((((members.m_bank ?? runtime.member("m_bank"))) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? runtime.member("m_flash_mode"))) {
      default:
      {
        switch (h_m_bits) {
          case 8:
          {
            data = ((runtime.readIndex((members.m_data ?? runtime.member("m_data")), address)) >>> 0);
            break;
          }
          case 16:
          {
            data = ((((((runtime.readIndex((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? runtime.member("m_data")), runtime.add(((address) * (2)), 1))))) >>> 0);
            break;
          }
        }
        break;
      }
      case 2:
      case 16:
      {
        data = (((members.m_status ?? runtime.member("m_status"))) >>> 0);
        break;
      }
      case 15:
      {
        data = ((128) >>> 0);
        break;
      }
      case 5:
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
                  data = ((((254) << (8))) >>> 0);
                  break;
                }
                default:
                {
                  if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                  }
                  data = ((((254) << (8))) >>> 0);
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
              if ((members.m_flash_master_lock ?? runtime.member("m_flash_master_lock"))) {
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
      case 9:
      {
        if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && ((((((Number(address) < Number((members.m_erase_sector ?? runtime.member("m_erase_sector")))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? runtime.member("m_erase_sector"))) + (((64) * (1024)))))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (h_m_bits) {
            case 8:
            {
              data = ((runtime.readIndex((members.m_data ?? runtime.member("m_data")), address)) >>> 0);
              break;
            }
            case 16:
            {
              data = ((((((runtime.readIndex((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? runtime.member("m_data")), runtime.add(((address) * (2)), 1))))) >>> 0);
              break;
            }
          }
        } else {
          members.m_status = ((((members.m_status) ^ (((((1) << (6))) | (((1) << (2))))))) & 0xff);
          data = (((members.m_status ?? runtime.member("m_status"))) >>> 0);
        }
        break;
      }
    }
    return data;
  }

  function method_read_raw(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_write_raw(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }

  function method_intelfsh8_device__read(runtime: any, offset: any) {
    const members = runtime.members;
    return method_read_full(runtime, offset);
  }

  function method_intelfsh8_device__read_raw(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_intelfsh8_device__write_raw(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }
  return {
    "delay_tick": method_delay_tick,
    "read": method_read,
    "read_full": method_read_full,
    "read_raw": method_read_raw,
    "write_raw": method_write_raw,
    "intelfsh8_device::read": method_intelfsh8_device__read,
    "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
    "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_2mbit"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return ((runtime.dereference(members.m_flash)).read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0);
  }

  function method_banked_address(runtime: any, offset: any) {
    const members = runtime.members;
    if (((Number(offset) < Number(40960)) ? 1 : 0)) {
      return (((((members.m_slot0_bank ?? runtime.member("m_slot0_bank"))) << (13))) | (((offset) & (8191))));
    } else {
      if (((Number(offset) < Number(49152)) ? 1 : 0)) {
        return (((((members.m_slot1_bank ?? runtime.member("m_slot1_bank"))) << (13))) | (((offset) & (8191))));
      } else {
        if (((Number(offset) < Number(57344)) ? 1 : 0)) {
          return (((((members.m_slot2_bank ?? runtime.member("m_slot2_bank"))) << (13))) | (((offset) & (8191))));
        } else {
          return (((((members.m_slot3_bank ?? runtime.member("m_slot3_bank"))) << (13))) | (((offset) & (8191))));
        }
      }
    }
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    offset = ((offset) | (32768));
    let max_banks: any = ((runtime.divide((members.m_rom_size ?? runtime.member("m_rom_size")), 8192)) & 0xff);
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
        let addr: any = ((((((((members.m_flash_a16 ?? runtime.member("m_flash_a16"))) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
        0;
        ((runtime.dereference(members.m_flash)).write?.(addr, data) ?? 0);
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
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
definition.slot!.options["sgc_2mbit"]!.children![0]!.definition.compiledMethods = (() => {
  function method_delay_tick(runtime: any, param: any) {
    const members = runtime.members;
    switch ((members.m_flash_mode ?? runtime.member("m_flash_mode"))) {
      case 2:
      {
        members.m_status = ((128) & 0xff);
        break;
      }
      case 9:
      {
        members.m_flash_mode = ((0) | 0);
        members.m_status = ((128) & 0xff);
        break;
      }
    }
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    return method_read_full(runtime, offset);
  }

  function method_read_full(runtime: any, address: any) {
    const members = runtime.members;
    const h_m_bits = members.m_bits ?? runtime.member("m_bits");
    const h_m_maker_id = members.m_maker_id ?? runtime.member("m_maker_id");
    const h_m_device_id = members.m_device_id ?? runtime.member("m_device_id");
    const h_m_device_id2 = members.m_device_id2 ?? runtime.member("m_device_id2");
    const h_m_device_id3 = members.m_device_id3 ?? runtime.member("m_device_id3");
    let data: any = ((0) >>> 0);
    address = ((((address) + ((((members.m_bank ?? runtime.member("m_bank"))) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? runtime.member("m_flash_mode"))) {
      default:
      {
        switch (h_m_bits) {
          case 8:
          {
            data = ((runtime.readIndex((members.m_data ?? runtime.member("m_data")), address)) >>> 0);
            break;
          }
          case 16:
          {
            data = ((((((runtime.readIndex((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? runtime.member("m_data")), runtime.add(((address) * (2)), 1))))) >>> 0);
            break;
          }
        }
        break;
      }
      case 2:
      case 16:
      {
        data = (((members.m_status ?? runtime.member("m_status"))) >>> 0);
        break;
      }
      case 15:
      {
        data = ((128) >>> 0);
        break;
      }
      case 5:
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
                  data = ((((254) << (8))) >>> 0);
                  break;
                }
                default:
                {
                  if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                  }
                  data = ((((254) << (8))) >>> 0);
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
              if ((members.m_flash_master_lock ?? runtime.member("m_flash_master_lock"))) {
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
      case 9:
      {
        if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && ((((((Number(address) < Number((members.m_erase_sector ?? runtime.member("m_erase_sector")))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? runtime.member("m_erase_sector"))) + (((64) * (1024)))))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (h_m_bits) {
            case 8:
            {
              data = ((runtime.readIndex((members.m_data ?? runtime.member("m_data")), address)) >>> 0);
              break;
            }
            case 16:
            {
              data = ((((((runtime.readIndex((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? runtime.member("m_data")), runtime.add(((address) * (2)), 1))))) >>> 0);
              break;
            }
          }
        } else {
          members.m_status = ((((members.m_status) ^ (((((1) << (6))) | (((1) << (2))))))) & 0xff);
          data = (((members.m_status ?? runtime.member("m_status"))) >>> 0);
        }
        break;
      }
    }
    return data;
  }

  function method_read_raw(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_write_raw(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }

  function method_intelfsh8_device__read(runtime: any, offset: any) {
    const members = runtime.members;
    return method_read_full(runtime, offset);
  }

  function method_intelfsh8_device__read_raw(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_intelfsh8_device__write_raw(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }
  return {
    "delay_tick": method_delay_tick,
    "read": method_read,
    "read_full": method_read_full,
    "read_raw": method_read_raw,
    "write_raw": method_write_raw,
    "intelfsh8_device::read": method_intelfsh8_device__read,
    "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
    "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["sgc_4mbit"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return ((runtime.dereference(members.m_flash)).read?.(method_banked_address(runtime, ((32768) | (offset)))) ?? 0);
  }

  function method_banked_address(runtime: any, offset: any) {
    const members = runtime.members;
    if (((Number(offset) < Number(40960)) ? 1 : 0)) {
      return (((((members.m_slot0_bank ?? runtime.member("m_slot0_bank"))) << (13))) | (((offset) & (8191))));
    } else {
      if (((Number(offset) < Number(49152)) ? 1 : 0)) {
        return (((((members.m_slot1_bank ?? runtime.member("m_slot1_bank"))) << (13))) | (((offset) & (8191))));
      } else {
        if (((Number(offset) < Number(57344)) ? 1 : 0)) {
          return (((((members.m_slot2_bank ?? runtime.member("m_slot2_bank"))) << (13))) | (((offset) & (8191))));
        } else {
          return (((((members.m_slot3_bank ?? runtime.member("m_slot3_bank"))) << (13))) | (((offset) & (8191))));
        }
      }
    }
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    offset = ((offset) | (32768));
    let max_banks: any = ((runtime.divide((members.m_rom_size ?? runtime.member("m_rom_size")), 8192)) & 0xff);
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
        let addr: any = ((((((((members.m_flash_a16 ?? runtime.member("m_flash_a16"))) >>> (0)) & 1)) << (16))) | (method_banked_address(runtime, offset)));
        0;
        ((runtime.dereference(members.m_flash)).write?.(addr, data) ?? 0);
        break;
      }
    }
  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
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
definition.slot!.options["sgc_4mbit"]!.children![0]!.definition.compiledMethods = (() => {
  function method_delay_tick(runtime: any, param: any) {
    const members = runtime.members;
    switch ((members.m_flash_mode ?? runtime.member("m_flash_mode"))) {
      case 2:
      {
        members.m_status = ((128) & 0xff);
        break;
      }
      case 9:
      {
        members.m_flash_mode = ((0) | 0);
        members.m_status = ((128) & 0xff);
        break;
      }
    }
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    return method_read_full(runtime, offset);
  }

  function method_read_full(runtime: any, address: any) {
    const members = runtime.members;
    const h_m_bits = members.m_bits ?? runtime.member("m_bits");
    const h_m_maker_id = members.m_maker_id ?? runtime.member("m_maker_id");
    const h_m_device_id = members.m_device_id ?? runtime.member("m_device_id");
    const h_m_device_id2 = members.m_device_id2 ?? runtime.member("m_device_id2");
    const h_m_device_id3 = members.m_device_id3 ?? runtime.member("m_device_id3");
    let data: any = ((0) >>> 0);
    address = ((((address) + ((((members.m_bank ?? runtime.member("m_bank"))) << (16))))) >>> 0);
    switch ((members.m_flash_mode ?? runtime.member("m_flash_mode"))) {
      default:
      {
        switch (h_m_bits) {
          case 8:
          {
            data = ((runtime.readIndex((members.m_data ?? runtime.member("m_data")), address)) >>> 0);
            break;
          }
          case 16:
          {
            data = ((((((runtime.readIndex((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? runtime.member("m_data")), runtime.add(((address) * (2)), 1))))) >>> 0);
            break;
          }
        }
        break;
      }
      case 2:
      case 16:
      {
        data = (((members.m_status ?? runtime.member("m_status"))) >>> 0);
        break;
      }
      case 15:
      {
        data = ((128) >>> 0);
        break;
      }
      case 5:
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
                  data = ((((254) << (8))) >>> 0);
                  break;
                }
                default:
                {
                  if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    0;
                  }
                  data = ((((254) << (8))) >>> 0);
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
              if ((members.m_flash_master_lock ?? runtime.member("m_flash_master_lock"))) {
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
      case 9:
      {
        if (((((((((((Number(h_m_maker_id) === Number(4)) ? 1 : 0)) && (((Number(h_m_device_id) === Number(173)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) && ((((((Number(address) < Number((members.m_erase_sector ?? runtime.member("m_erase_sector")))) ? 1 : 0)) || (((Number(address) >= Number((((members.m_erase_sector ?? runtime.member("m_erase_sector"))) + (((64) * (1024)))))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
          switch (h_m_bits) {
            case 8:
            {
              data = ((runtime.readIndex((members.m_data ?? runtime.member("m_data")), address)) >>> 0);
              break;
            }
            case 16:
            {
              data = ((((((runtime.readIndex((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) << (8))) | (runtime.readIndex((members.m_data ?? runtime.member("m_data")), runtime.add(((address) * (2)), 1))))) >>> 0);
              break;
            }
          }
        } else {
          members.m_status = ((((members.m_status) ^ (((((1) << (6))) | (((1) << (2))))))) & 0xff);
          data = (((members.m_status ?? runtime.member("m_status"))) >>> 0);
        }
        break;
      }
    }
    return data;
  }

  function method_read_raw(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_write_raw(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }

  function method_intelfsh8_device__read(runtime: any, offset: any) {
    const members = runtime.members;
    return method_read_full(runtime, offset);
  }

  function method_intelfsh8_device__read_raw(runtime: any, offset: any) {
    const members = runtime.members;
    return runtime.readIndex((members.m_data ?? runtime.member("m_data")), offset);
  }

  function method_intelfsh8_device__write_raw(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    runtime.writeIndex(runtime.writableMember("m_data"), offset, data);
  }
  return {
    "delay_tick": method_delay_tick,
    "read": method_read,
    "read_full": method_read_full,
    "read_raw": method_read_raw,
    "write_raw": method_write_raw,
    "intelfsh8_device::read": method_intelfsh8_device__read,
    "intelfsh8_device::read_raw": method_intelfsh8_device__read_raw,
    "intelfsh8_device::write_raw": method_intelfsh8_device__write_raw
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["standard"]!.compiledMethods = (() => {
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      if (((Number(offset) < Number((members.m_rom_size ?? runtime.member("m_rom_size")))) ? 1 : 0)) {
        data = (((members.m_rom ?? runtime.member("m_rom"))[offset]) & 0xff);
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;

  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
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
  function method_read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    let data: any = ((255) & 0xff);
    if ((((((((((((_8000) ? 0 : 1)) || (((_a000) ? 0 : 1))) ? 1 : 0)) || (((_c000) ? 0 : 1))) ? 1 : 0)) || (((_e000) ? 0 : 1))) ? 1 : 0)) {
      data = (((members.m_rom ?? runtime.member("m_rom"))[(((members.m_current_offset ?? runtime.member("m_current_offset"))) + (offset))]) & 0xff);
      if ((((((_e000) ? 0 : 1)) && (((Number(offset) >= Number(32704)) ? 1 : 0))) ? 1 : 0)) {
        members.m_current_offset = ((((((32768) * (((offset) - (32704))))) % ((members.m_rom_size ?? runtime.member("m_rom_size"))))) >>> 0);
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;

  }

  function method_device_colecovision_cartridge_interface__read(runtime: any, offset: any, _8000: any, _a000: any, _c000: any, _e000: any) {
    const members = runtime.members;
    return 255;
  }

  function method_device_colecovision_cartridge_interface__write(runtime: any, offset: any, data: any, _8000: any, _a000: any, _c000: any, _e000: any) {
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
