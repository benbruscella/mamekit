// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './eeprom_er5911_8bit.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_base_cs_write(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    state = ((runtime.andAssign(state, 1)) | 0);
    if (((Number(state) === Number((members.m_cs_state ?? runtime.member("m_cs_state")))) ? 1 : 0)) {
      return;
    }
    do {
      if (0) {
        (__l["printf"] ? __l["printf"]("  cs_write(%d)\n", state) : runtime.macro("printf", "  cs_write(%d)\n", state));
      }
      if (0) {
        0;
      }
    } while (0);
    members.m_cs_state = ((state) & 0xff);
    if (((Number(state) === Number(1)) ? 1 : 0)) {
      members.m_last_cs_rising_edge_time = (__l["machine().time"]?.() ?? 0);
    }
    method_handle_event(runtime, ((((Number((members.m_cs_state ?? runtime.member("m_cs_state"))) === Number(1)) ? 1 : 0)) ? (1) : (2)));
  }

  function method_handle_event(runtime: any, event: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch ((members.m_state ?? runtime.member("m_state"))) {
      case 0:
      {
        if (((Number(event) === Number(1)) ? 1 : 0)) {
          method_set_state(runtime, 1);
        }
        break;
      }
      case 1:
      {
        if ((((((((((((Number(event) === Number(4)) ? 1 : 0)) && (((Number((members.m_di_state ?? runtime.member("m_di_state"))) === Number(1)) ? 1 : 0))) ? 1 : 0)) && (method_ready(runtime))) ? 1 : 0)) && (((Number((__l["machine().time"]?.() ?? 0)) > Number((members.m_last_cs_rising_edge_time ?? runtime.member("m_last_cs_rising_edge_time")))) ? 1 : 0))) ? 1 : 0)) {
          members.m_command_address_accum = (((members.m_bits_accum = ((0) >>> 0))) >>> 0);
          method_set_state(runtime, 2);
        } else {
          if (((Number(event) === Number(2)) ? 1 : 0)) {
            method_set_state(runtime, 0);
          }
        }
        break;
      }
      case 2:
      {
        if (((Number(event) === Number(4)) ? 1 : 0)) {
          members.m_command_address_accum = (((((((members.m_command_address_accum ?? runtime.member("m_command_address_accum"))) << (1))) | ((members.m_di_state ?? runtime.member("m_di_state"))))) >>> 0);
          if (((Number((members.m_bits_accum = ((((members.m_bits_accum) + (1))) >>> 0))) === Number(((2) + ((members.m_command_address_bits ?? runtime.member("m_command_address_bits")))))) ? 1 : 0)) {
            method_execute_command(runtime);
          }
        } else {
          if (((Number(event) === Number(2)) ? 1 : 0)) {
            method_set_state(runtime, 0);
          }
        }
        break;
      }
      case 3:
      {
        if (((Number(event) === Number((((members.m_output_on_falling_clock_enabled ?? runtime.member("m_output_on_falling_clock_enabled"))) ? (8) : (4)))) ? 1 : 0)) {
          let bit_index: any = (((() => { const previous = members.m_bits_accum; members.m_bits_accum = ((((members.m_bits_accum) + (1))) >>> 0); return previous; })()) | 0);
          if ((((((Number(((bit_index) % ((members.m_data_bits ?? runtime.member("m_data_bits"))))) === Number(0)) ? 1 : 0)) && ((((((Number(bit_index) === Number(0)) ? 1 : 0)) || ((members.m_streaming_enabled ?? runtime.member("m_streaming_enabled")))) ? 1 : 0))) ? 1 : 0)) {
            members.m_shift_register = ((((method_read(runtime, (((((members.m_address ?? runtime.member("m_address"))) + (runtime.divide((members.m_bits_accum ?? runtime.member("m_bits_accum")), (members.m_data_bits ?? runtime.member("m_data_bits")))))) & (((((1) << ((members.m_address_bits ?? runtime.member("m_address_bits"))))) - (1)))))) << (((32) - ((members.m_data_bits ?? runtime.member("m_data_bits"))))))) >>> 0);
          } else {
            members.m_shift_register = (((((((members.m_shift_register ?? runtime.member("m_shift_register"))) << (1))) | (1))) >>> 0);
          }
          (__l["m_do_cb"] ? __l["m_do_cb"](Number(((((members.m_shift_register ?? runtime.member("m_shift_register"))) >>> (31)) & 1))) : typeof members.m_do_cb === 'function' ? members.m_do_cb(((((members.m_shift_register ?? runtime.member("m_shift_register"))) >>> (31)) & 1)) : runtime.invoke("m_do_cb", ((((members.m_shift_register ?? runtime.member("m_shift_register"))) >>> (31)) & 1)));
        } else {
          if (((Number(event) === Number(2)) ? 1 : 0)) {
            method_set_state(runtime, 0);
            if ((members.m_streaming_enabled ?? runtime.member("m_streaming_enabled"))) {
              do {
                if (0) {
                  (__l["printf"] ? __l["printf"]("  (%d cells read)\n", runtime.divide((members.m_bits_accum ?? runtime.member("m_bits_accum")), (members.m_data_bits ?? runtime.member("m_data_bits")))) : runtime.macro("printf", "  (%d cells read)\n", runtime.divide((members.m_bits_accum ?? runtime.member("m_bits_accum")), (members.m_data_bits ?? runtime.member("m_data_bits")))));
                }
                if (0) {
                  0;
                }
              } while (0);
            }
            if (((((((members.m_streaming_enabled ?? runtime.member("m_streaming_enabled"))) ? 0 : 1)) && (((Number((members.m_bits_accum ?? runtime.member("m_bits_accum"))) > Number((((members.m_data_bits ?? runtime.member("m_data_bits"))) + (1)))) ? 1 : 0))) ? 1 : 0)) {
              do {
                if (0) {
                  (__l["printf"] ? __l["printf"]("EEPROM: Overclocked read by %d bits\n", (((members.m_bits_accum ?? runtime.member("m_bits_accum"))) - ((members.m_data_bits ?? runtime.member("m_data_bits"))))) : runtime.macro("printf", "EEPROM: Overclocked read by %d bits\n", (((members.m_bits_accum ?? runtime.member("m_bits_accum"))) - ((members.m_data_bits ?? runtime.member("m_data_bits"))))));
                }
                0;
              } while (0);
            } else {
              if ((((((((members.m_streaming_enabled ?? runtime.member("m_streaming_enabled"))) && (((Number((members.m_bits_accum ?? runtime.member("m_bits_accum"))) > Number((((members.m_data_bits ?? runtime.member("m_data_bits"))) + (1)))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_bits_accum ?? runtime.member("m_bits_accum"))) % ((members.m_data_bits ?? runtime.member("m_data_bits"))))) > Number(2)) ? 1 : 0))) ? 1 : 0)) {
                do {
                  if (0) {
                    (__l["printf"] ? __l["printf"]("EEPROM: Overclocked read by %d bits\n", (((members.m_bits_accum ?? runtime.member("m_bits_accum"))) % ((members.m_data_bits ?? runtime.member("m_data_bits"))))) : runtime.macro("printf", "EEPROM: Overclocked read by %d bits\n", (((members.m_bits_accum ?? runtime.member("m_bits_accum"))) % ((members.m_data_bits ?? runtime.member("m_data_bits"))))));
                  }
                  0;
                } while (0);
              } else {
                if (((Number((members.m_bits_accum ?? runtime.member("m_bits_accum"))) < Number((members.m_data_bits ?? runtime.member("m_data_bits")))) ? 1 : 0)) {
                  do {
                    if (0) {
                      (__l["printf"] ? __l["printf"]("EEPROM: CS deasserted in READING_DATA after %d bits\n", (members.m_bits_accum ?? runtime.member("m_bits_accum"))) : runtime.macro("printf", "EEPROM: CS deasserted in READING_DATA after %d bits\n", (members.m_bits_accum ?? runtime.member("m_bits_accum"))));
                    }
                    0;
                  } while (0);
                }
              }
            }
          }
        }
        break;
      }
      case 4:
      {
        if (((Number(event) === Number(4)) ? 1 : 0)) {
          members.m_shift_register = (((((((members.m_shift_register ?? runtime.member("m_shift_register"))) << (1))) | ((members.m_di_state ?? runtime.member("m_di_state"))))) >>> 0);
          if (((Number((members.m_bits_accum = ((((members.m_bits_accum) + (1))) >>> 0))) === Number((members.m_data_bits ?? runtime.member("m_data_bits")))) ? 1 : 0)) {
            method_execute_write_command(runtime);
          }
        } else {
          if (((Number(event) === Number(2)) ? 1 : 0)) {
            method_set_state(runtime, 0);
            do {
              if (0) {
                (__l["printf"] ? __l["printf"]("EEPROM: CS deasserted in STATE_WAIT_FOR_DATA after %d bits\n", (members.m_bits_accum ?? runtime.member("m_bits_accum"))) : runtime.macro("printf", "EEPROM: CS deasserted in STATE_WAIT_FOR_DATA after %d bits\n", (members.m_bits_accum ?? runtime.member("m_bits_accum"))));
              }
              0;
            } while (0);
          }
        }
        break;
      }
      case 5:
      {
        if (((Number(event) === Number(2)) ? 1 : 0)) {
          method_set_state(runtime, 0);
        }
        break;
      }
    }
  }

  function method_set_state(runtime: any, newstate: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_state = newstate;
    (__l["m_do_cb"] ? __l["m_do_cb"](Number(((Number((members.m_state ?? runtime.member("m_state"))) !== Number(3)) ? 1 : 0))) : typeof members.m_do_cb === 'function' ? members.m_do_cb(((Number((members.m_state ?? runtime.member("m_state"))) !== Number(3)) ? 1 : 0)) : runtime.invoke("m_do_cb", ((Number((members.m_state ?? runtime.member("m_state"))) !== Number(3)) ? 1 : 0)));
  }

  function method_ready(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((Number((__l["machine().time"]?.() ?? 0)) >= Number((members.m_completion_time ?? runtime.member("m_completion_time")))) ? 1 : 0);
  }

  function method_execute_command(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    method_parse_command_and_address(runtime);
    members.m_bits_accum = ((0) >>> 0);
    switch ((members.m_command ?? runtime.member("m_command"))) {
      case 1:
      {
        members.m_shift_register = ((0) >>> 0);
        method_set_state(runtime, 3);
        break;
      }
      case 2:
      case 6:
      {
        members.m_shift_register = ((0) >>> 0);
        method_set_state(runtime, 4);
        break;
      }
      case 3:
      {
        if ((members.m_locked ?? runtime.member("m_locked"))) {
          do {
            if (0) {
              (__l["printf"] ? __l["printf"]("EEPROM: Attempt to erase while locked\n") : runtime.macro("printf", "EEPROM: Attempt to erase while locked\n"));
            }
            0;
          } while (0);
          method_set_state(runtime, 0);
          break;
        }
        method_erase(runtime, (members.m_address ?? runtime.member("m_address")));
        method_set_state(runtime, 5);
        break;
      }
      case 4:
      {
        members.m_locked = ((1) ? 1 : 0);
        method_set_state(runtime, 0);
        break;
      }
      case 5:
      {
        members.m_locked = ((0) ? 1 : 0);
        method_set_state(runtime, 0);
        break;
      }
      case 7:
      {
        if ((members.m_locked ?? runtime.member("m_locked"))) {
          do {
            if (0) {
              (__l["printf"] ? __l["printf"]("EEPROM: Attempt to erase all while locked\n") : runtime.macro("printf", "EEPROM: Attempt to erase all while locked\n"));
            }
            0;
          } while (0);
          method_set_state(runtime, 0);
          break;
        }
        method_erase_all(runtime);
        method_set_state(runtime, 5);
        break;
      }
      default:
      {
        let emu_fatalerror: any = (__l["throw"] ? __l["throw"]("execute_command called with invalid command %d\n", (members.m_command ?? runtime.member("m_command"))) : runtime.macro("throw", "execute_command called with invalid command %d\n", (members.m_command ?? runtime.member("m_command"))));
      }
    }
  }

  function method_parse_command_and_address(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_command = 0;
    members.m_address = (((((members.m_command_address_accum ?? runtime.member("m_command_address_accum"))) & (((((1) << ((members.m_command_address_bits ?? runtime.member("m_command_address_bits"))))) - (1))))) >>> 0);
    switch (runtime.shiftRight((members.m_command_address_accum ?? runtime.member("m_command_address_accum")), (members.m_command_address_bits ?? runtime.member("m_command_address_bits")))) {
      case 0:
      {
        switch (runtime.shiftRight((members.m_address ?? runtime.member("m_address")), (((members.m_command_address_bits ?? runtime.member("m_command_address_bits"))) - (2)))) {
          case 0:
          {
            members.m_command = 4;
            break;
          }
          case 1:
          {
            members.m_command = 0;
            break;
          }
          case 2:
          {
            members.m_command = 7;
            break;
          }
          case 3:
          {
            members.m_command = 5;
            break;
          }
        }
        members.m_address = ((0) >>> 0);
        break;
      }
      case 1:
      {
        members.m_command = 2;
        break;
      }
      case 2:
      {
        members.m_command = 1;
        break;
      }
      case 3:
      {
        members.m_command = 2;
        break;
      }
    }
    if (((Number((members.m_address ?? runtime.member("m_address"))) >= Number(((1) << ((members.m_address_bits ?? runtime.member("m_address_bits")))))) ? 1 : 0)) {
      do {
        if (0) {
          (__l["printf"] ? __l["printf"]("EEPROM: out-of-range address 0x%X provided (maximum should be 0x%X)\n", (members.m_address ?? runtime.member("m_address")), ((((1) << ((members.m_address_bits ?? runtime.member("m_address_bits"))))) - (1))) : runtime.macro("printf", "EEPROM: out-of-range address 0x%X provided (maximum should be 0x%X)\n", (members.m_address ?? runtime.member("m_address")), ((((1) << ((members.m_address_bits ?? runtime.member("m_address_bits"))))) - (1))));
        }
        0;
      } while (0);
    }
  }

  function method_erase(runtime: any, address: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((method_ready(runtime)) ? 0 : 1)) {
      0;
    }
    method_internal_write(runtime, address, -1);
    members.m_completion_time = runtime.add((__l["machine().time"]?.() ?? 0), runtime.readIndex((members.m_operation_time ?? runtime.member("m_operation_time")), 2));
  }

  function method_internal_write(runtime: any, address: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_data_bits ?? runtime.member("m_data_bits"))) === Number(16)) ? 1 : 0)) {
      (__l["put_u16le"] ? __l["put_u16le"](runtime.addressOf((members.m_data ?? runtime.member("m_data")), ((address) * (2))), data) : runtime.macro("put_u16le", runtime.addressOf((members.m_data ?? runtime.member("m_data")), ((address) * (2))), data));
    } else {
      runtime.writeIndex(runtime.writableMember("m_data"), address, data);
    }
  }

  function method_erase_all(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((method_ready(runtime)) ? 0 : 1)) {
      0;
    }
    for (let address: any = 0; ((Number(address) < Number(((1) << ((members.m_address_bits ?? runtime.member("m_address_bits")))))) ? 1 : 0); address = ((address) + (1))) {
      method_internal_write(runtime, address, -1);
    }
    members.m_completion_time = runtime.add((__l["machine().time"]?.() ?? 0), runtime.readIndex((members.m_operation_time ?? runtime.member("m_operation_time")), 3));
  }

  function method_read(runtime: any, address: any): any {
    const members = runtime.members;

    if (((method_ready(runtime)) ? 0 : 1)) {
      0;
    }
    return method_internal_read(runtime, address);
  }

  function method_internal_read(runtime: any, address: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_data_bits ?? runtime.member("m_data_bits"))) === Number(16)) ? 1 : 0)) {
      return (__l["get_u16le"] ? __l["get_u16le"](runtime.addressOf((members.m_data ?? runtime.member("m_data")), ((address) * (2)))) : runtime.macro("get_u16le", runtime.addressOf((members.m_data ?? runtime.member("m_data")), ((address) * (2)))));
    } else {
      return runtime.readIndex((members.m_data ?? runtime.member("m_data")), address);
    }
  }

  function method_execute_write_command(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    switch ((members.m_command ?? runtime.member("m_command"))) {
      case 2:
      {
        if ((members.m_locked ?? runtime.member("m_locked"))) {
          do {
            if (0) {
              (__l["printf"] ? __l["printf"]("EEPROM: Attempt to write to address 0x%X while locked\n", (members.m_address ?? runtime.member("m_address"))) : runtime.macro("printf", "EEPROM: Attempt to write to address 0x%X while locked\n", (members.m_address ?? runtime.member("m_address"))));
            }
            0;
          } while (0);
          method_set_state(runtime, 0);
          break;
        }
        method_write(runtime, (members.m_address ?? runtime.member("m_address")), (members.m_shift_register ?? runtime.member("m_shift_register")));
        method_set_state(runtime, 5);
        break;
      }
      case 6:
      {
        if ((members.m_locked ?? runtime.member("m_locked"))) {
          do {
            if (0) {
              (__l["printf"] ? __l["printf"]("EEPROM: Attempt to write all while locked\n") : runtime.macro("printf", "EEPROM: Attempt to write all while locked\n"));
            }
            0;
          } while (0);
          method_set_state(runtime, 0);
          break;
        }
        method_write_all(runtime, (members.m_shift_register ?? runtime.member("m_shift_register")));
        method_set_state(runtime, 5);
        break;
      }
      default:
      {
        let emu_fatalerror: any = (__l["throw"] ? __l["throw"]("execute_write_command called with invalid command %d\n", (members.m_command ?? runtime.member("m_command"))) : runtime.macro("throw", "execute_write_command called with invalid command %d\n", (members.m_command ?? runtime.member("m_command"))));
      }
    }
  }

  function method_write(runtime: any, address: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((method_ready(runtime)) ? 0 : 1)) {
      0;
    }
    method_internal_write(runtime, address, data);
    members.m_completion_time = runtime.add((__l["machine().time"]?.() ?? 0), runtime.readIndex((members.m_operation_time ?? runtime.member("m_operation_time")), 0));
  }

  function method_write_all(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((method_ready(runtime)) ? 0 : 1)) {
      0;
    }
    for (let address: any = 0; ((Number(address) < Number(((1) << ((members.m_address_bits ?? runtime.member("m_address_bits")))))) ? 1 : 0); address = ((address) + (1))) {
      method_internal_write(runtime, address, ((method_internal_read(runtime, address)) & (data)));
    }
    members.m_completion_time = runtime.add((__l["machine().time"]?.() ?? 0), runtime.readIndex((members.m_operation_time ?? runtime.member("m_operation_time")), 1));
  }

  function method_base_clk_write(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    state = ((runtime.andAssign(state, 1)) | 0);
    if (((Number(state) === Number((members.m_clk_state ?? runtime.member("m_clk_state")))) ? 1 : 0)) {
      return;
    }
    do {
      if (0) {
        (__l["printf"] ? __l["printf"]("  clk_write(%d)\n", state) : runtime.macro("printf", "  clk_write(%d)\n", state));
      }
      if (0) {
        0;
      }
    } while (0);
    members.m_clk_state = ((state) & 0xff);
    method_handle_event(runtime, ((((Number((members.m_clk_state ?? runtime.member("m_clk_state"))) === Number(1)) ? 1 : 0)) ? (4) : (8)));
  }

  function method_do_read(runtime: any): any {
    const members = runtime.members;

    return method_base_do_read(runtime);
  }

  function method_base_do_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let result: any = (((members.m_do_tristate ?? runtime.member("m_do_tristate"))) | 0);
    if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(3)) ? 1 : 0)) {
      result = ((((((Number((((members.m_shift_register ?? runtime.member("m_shift_register"))) & (2147483648))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) | 0);
    }
    do {
      if (0) {
        (__l["printf"] ? __l["printf"]("  do_read(%d)\n", result) : runtime.macro("printf", "  do_read(%d)\n", result));
      }
      if (0) {
        0;
      }
    } while (0);
    return result;
  }

  function method_ready_read(runtime: any): any {
    const members = runtime.members;

    return method_base_ready_read(runtime);
  }

  function method_base_ready_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let result: any = ((((method_ready(runtime)) ? (1) : (0))) | 0);
    do {
      if (0) {
        (__l["printf"] ? __l["printf"]("  ready_read(%d)\n", result) : runtime.macro("printf", "  ready_read(%d)\n", result));
      }
      if (0) {
        0;
      }
    } while (0);
    return result;
  }

  function method_cs_write(runtime: any, state: any): any {
    const members = runtime.members;

    method_base_cs_write(runtime, state);
  }

  function method_clk_write(runtime: any, state: any): any {
    const members = runtime.members;

    method_base_clk_write(runtime, state);
  }

  function method_di_write(runtime: any, state: any): any {
    const members = runtime.members;

    method_base_di_write(runtime, state);
  }

  function method_base_di_write(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((((Number(state) !== Number(0)) ? 1 : 0)) && (((Number(state) !== Number(1)) ? 1 : 0))) ? 1 : 0)) {
      do {
        if (0) {
          (__l["printf"] ? __l["printf"]("EEPROM: Unexpected data at input 0x%X treated as %d\n", state, ((state) & (1))) : runtime.macro("printf", "EEPROM: Unexpected data at input 0x%X treated as %d\n", state, ((state) & (1))));
        }
        0;
      } while (0);
    }
    do {
      if (0) {
        (__l["printf"] ? __l["printf"]("  di_write(%d)\n", state) : runtime.macro("printf", "  di_write(%d)\n", state));
      }
      if (0) {
        0;
      }
    } while (0);
    members.m_di_state = ((((state) & (1))) & 0xff);
  }
  return {
    "base_cs_write": method_base_cs_write,
    "handle_event": method_handle_event,
    "set_state": method_set_state,
    "ready": method_ready,
    "execute_command": method_execute_command,
    "parse_command_and_address": method_parse_command_and_address,
    "erase": method_erase,
    "internal_write": method_internal_write,
    "erase_all": method_erase_all,
    "read": method_read,
    "internal_read": method_internal_read,
    "execute_write_command": method_execute_write_command,
    "write": method_write,
    "write_all": method_write_all,
    "base_clk_write": method_base_clk_write,
    "do_read": method_do_read,
    "base_do_read": method_base_do_read,
    "ready_read": method_ready_read,
    "base_ready_read": method_base_ready_read,
    "cs_write": method_cs_write,
    "clk_write": method_clk_write,
    "di_write": method_di_write,
    "base_di_write": method_base_di_write
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["get_u16le","m_do_cb","machine","machine().time","printf","put_u16le","throw"];

export const device = definition;
export default device;
