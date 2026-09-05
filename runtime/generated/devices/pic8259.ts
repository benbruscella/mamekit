// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './pic8259.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    switch (offset) {
      case 0:
      {
        if ((((members.m_ocw3 ?? runtime.member("m_ocw3"))) & (4))) {
          if (((Number((members.m_current_level ?? runtime.member("m_current_level"))) !== Number((-1))) ? 1 : 0)) {
            data = ((((128) | ((members.m_current_level ?? runtime.member("m_current_level"))))) & 0xff);
            if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
              if (((((((members.m_level_trig_mode ?? runtime.member("m_level_trig_mode"))) ? 0 : 1)) && (((((((members.m_master ?? runtime.member("m_master"))) ? 0 : 1)) || (((((((members.m_slave ?? runtime.member("m_slave"))) >>> ((members.m_current_level ?? runtime.member("m_current_level")))) & 1)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
                members.m_irr = ((runtime.andAssign(members.m_irr, (~((1) << ((members.m_current_level ?? runtime.member("m_current_level"))))))) & 0xff);
              }
              if ((((members.m_auto_eoi ?? runtime.member("m_auto_eoi"))) ? 0 : 1)) {
                members.m_isr = ((((members.m_isr) | (((1) << ((members.m_current_level ?? runtime.member("m_current_level"))))))) & 0xff);
              }
              ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
            }
          }
          if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            members.m_ocw3 = ((runtime.andAssign(members.m_ocw3, 251)) & 0xff);
          }
        } else {
          switch ((((members.m_ocw3 ?? runtime.member("m_ocw3"))) & (1))) {
            case 0:
            {
              data = (((members.m_irr ?? runtime.member("m_irr"))) & 0xff);
              break;
            }
            case 1:
            {
              data = (((((members.m_isr ?? runtime.member("m_isr"))) & ((~(members.m_imr ?? runtime.member("m_imr")))))) & 0xff);
              break;
            }
          }
        }
        break;
      }
      case 1:
      {
        data = (((members.m_imr ?? runtime.member("m_imr"))) & 0xff);
        break;
      }
    }
    return data;
  }

  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    switch (offset) {
      case 0:
      {
        if (((data) & (16))) {
          0;
          members.m_imr = ((0) & 0xff);
          members.m_isr = ((0) & 0xff);
          members.m_slave = ((0) & 0xff);
          members.m_level_trig_mode = ((((((data) & (8))) ? (1) : (0))) & 0xff);
          members.m_vector_size = ((((((data) & (4))) ? (1) : (0))) & 0xff);
          members.m_cascade = ((((((data) & (2))) ? (0) : (1))) & 0xff);
          members.m_icw4_needed = ((((((data) & (1))) ? (1) : (0))) & 0xff);
          members.m_vector_addr_low = ((((data) & (224))) >>> 0);
          members.m_state = 1;
          members.m_current_level = (((-1)) << 24 >> 24);
          members.m_inta_sequence = ((0) & 0xff);
          members.m_irr = (((((members.m_level_trig_mode ?? runtime.member("m_level_trig_mode"))) ? ((members.m_irq_lines ?? runtime.member("m_irq_lines"))) : (0))) & 0xff);
          runtime.invoke("m_out_int_func", 0);
        } else {
          if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0)) {
            if (((Number(((data) & (152))) === Number(8)) ? 1 : 0)) {
              0;
              if ((((data) >>> (1)) & 1)) {
                members.m_ocw3 = (((((((members.m_ocw3 ?? runtime.member("m_ocw3"))) & (254))) | (((data) & (1))))) & 0xff);
              }
              if ((((data) >>> (2)) & 1)) {
                members.m_ocw3 = ((((members.m_ocw3) | (4))) & 0xff);
              }
              if ((((data) >>> (6)) & 1)) {
                members.m_ocw3 = (((((((members.m_ocw3 ?? runtime.member("m_ocw3"))) & (223))) | (((data) & (32))))) & 0xff);
              }
            } else {
              if (((Number(((data) & (24))) === Number(0)) ? 1 : 0)) {
                let n: any = ((data) & (7));
                let mask: any = ((((1) << (n))) & 0xff);
                0;
                switch (((data) & (224))) {
                  case 0:
                  {
                    members.m_prio = ((0) & 0xff);
                    break;
                  }
                  case 32:
                  {
                    for (n = 0, mask = ((((1) << ((members.m_prio ?? runtime.member("m_prio"))))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((n) + (1)), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                      if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                        members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                        break;
                      }
                    }
                    break;
                  }
                  case 64:
                  {
                    break;
                  }
                  case 96:
                  {
                    if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                      members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                    }
                    break;
                  }
                  case 128:
                  {
                    members.m_prio = (((((((members.m_prio ?? runtime.member("m_prio"))) + (1))) & (7))) & 0xff);
                    break;
                  }
                  case 160:
                  {
                    for (n = 0, mask = ((((1) << ((members.m_prio ?? runtime.member("m_prio"))))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((n) + (1)), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                      if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                        members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                        members.m_prio = (((((((members.m_prio ?? runtime.member("m_prio"))) + (1))) & (7))) & 0xff);
                        break;
                      }
                    }
                    break;
                  }
                  case 192:
                  {
                    members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                    break;
                  }
                  case 224:
                  {
                    if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                      members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                      members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                    }
                    break;
                  }
                }
              }
            }
          }
        }
        break;
      }
      case 1:
      {
        switch ((members.m_state ?? runtime.member("m_state"))) {
          case 0:
          {
            break;
          }
          case 1:
          {
            0;
            members.m_base = ((((data) & (248))) & 0xff);
            members.m_vector_addr_high = ((data) & 0xff);
            if ((members.m_cascade ?? runtime.member("m_cascade"))) {
              members.m_state = 2;
            } else {
              members.m_state = (((members.m_icw4_needed ?? runtime.member("m_icw4_needed"))) ? (3) : (4));
            }
            break;
          }
          case 2:
          {
            0;
            members.m_slave = ((data) & 0xff);
            members.m_state = (((members.m_icw4_needed ?? runtime.member("m_icw4_needed"))) ? (3) : (4));
            break;
          }
          case 3:
          {
            0;
            members.m_nested = ((((((data) & (16))) ? (1) : (0))) & 0xff);
            members.m_mode = ((((((data) >>> (2))) & (3))) & 0xff);
            members.m_auto_eoi = ((((((data) & (2))) ? (1) : (0))) & 0xff);
            members.m_is_x86 = ((((((data) & (1))) ? (1) : (0))) & 0xff);
            members.m_state = 4;
            break;
          }
          case 4:
          {
            0;
            members.m_imr = ((data) & 0xff);
            break;
          }
        }
        break;
      }
    }
    ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
  }

  function method_pic8259_device__write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    switch (offset) {
      case 0:
      {
        if (((data) & (16))) {
          0;
          members.m_imr = ((0) & 0xff);
          members.m_isr = ((0) & 0xff);
          members.m_slave = ((0) & 0xff);
          members.m_level_trig_mode = ((((((data) & (8))) ? (1) : (0))) & 0xff);
          members.m_vector_size = ((((((data) & (4))) ? (1) : (0))) & 0xff);
          members.m_cascade = ((((((data) & (2))) ? (0) : (1))) & 0xff);
          members.m_icw4_needed = ((((((data) & (1))) ? (1) : (0))) & 0xff);
          members.m_vector_addr_low = ((((data) & (224))) >>> 0);
          members.m_state = 1;
          members.m_current_level = (((-1)) << 24 >> 24);
          members.m_inta_sequence = ((0) & 0xff);
          members.m_irr = (((((members.m_level_trig_mode ?? runtime.member("m_level_trig_mode"))) ? ((members.m_irq_lines ?? runtime.member("m_irq_lines"))) : (0))) & 0xff);
          runtime.invoke("m_out_int_func", 0);
        } else {
          if (((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0)) {
            if (((Number(((data) & (152))) === Number(8)) ? 1 : 0)) {
              0;
              if ((((data) >>> (1)) & 1)) {
                members.m_ocw3 = (((((((members.m_ocw3 ?? runtime.member("m_ocw3"))) & (254))) | (((data) & (1))))) & 0xff);
              }
              if ((((data) >>> (2)) & 1)) {
                members.m_ocw3 = ((((members.m_ocw3) | (4))) & 0xff);
              }
              if ((((data) >>> (6)) & 1)) {
                members.m_ocw3 = (((((((members.m_ocw3 ?? runtime.member("m_ocw3"))) & (223))) | (((data) & (32))))) & 0xff);
              }
            } else {
              if (((Number(((data) & (24))) === Number(0)) ? 1 : 0)) {
                let n: any = ((data) & (7));
                let mask: any = ((((1) << (n))) & 0xff);
                0;
                switch (((data) & (224))) {
                  case 0:
                  {
                    members.m_prio = ((0) & 0xff);
                    break;
                  }
                  case 32:
                  {
                    for (n = 0, mask = ((((1) << ((members.m_prio ?? runtime.member("m_prio"))))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((n) + (1)), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                      if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                        members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                        break;
                      }
                    }
                    break;
                  }
                  case 64:
                  {
                    break;
                  }
                  case 96:
                  {
                    if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                      members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                    }
                    break;
                  }
                  case 128:
                  {
                    members.m_prio = (((((((members.m_prio ?? runtime.member("m_prio"))) + (1))) & (7))) & 0xff);
                    break;
                  }
                  case 160:
                  {
                    for (n = 0, mask = ((((1) << ((members.m_prio ?? runtime.member("m_prio"))))) & 0xff); ((Number(n) < Number(8)) ? 1 : 0); n = ((n) + (1)), mask = ((((((mask) << (1))) | (((mask) >>> (7))))) & 0xff)) {
                      if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                        members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                        members.m_prio = (((((((members.m_prio ?? runtime.member("m_prio"))) + (1))) & (7))) & 0xff);
                        break;
                      }
                    }
                    break;
                  }
                  case 192:
                  {
                    members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                    break;
                  }
                  case 224:
                  {
                    if ((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) {
                      members.m_isr = ((runtime.andAssign(members.m_isr, (~mask))) & 0xff);
                      members.m_prio = ((((((n) + (1))) & (7))) & 0xff);
                    }
                    break;
                  }
                }
              }
            }
          }
        }
        break;
      }
      case 1:
      {
        switch ((members.m_state ?? runtime.member("m_state"))) {
          case 0:
          {
            break;
          }
          case 1:
          {
            0;
            members.m_base = ((((data) & (248))) & 0xff);
            members.m_vector_addr_high = ((data) & 0xff);
            if ((members.m_cascade ?? runtime.member("m_cascade"))) {
              members.m_state = 2;
            } else {
              members.m_state = (((members.m_icw4_needed ?? runtime.member("m_icw4_needed"))) ? (3) : (4));
            }
            break;
          }
          case 2:
          {
            0;
            members.m_slave = ((data) & 0xff);
            members.m_state = (((members.m_icw4_needed ?? runtime.member("m_icw4_needed"))) ? (3) : (4));
            break;
          }
          case 3:
          {
            0;
            members.m_nested = ((((((data) & (16))) ? (1) : (0))) & 0xff);
            members.m_mode = ((((((data) >>> (2))) & (3))) & 0xff);
            members.m_auto_eoi = ((((((data) & (2))) ? (1) : (0))) & 0xff);
            members.m_is_x86 = ((((((data) & (1))) ? (1) : (0))) & 0xff);
            members.m_state = 4;
            break;
          }
          case 4:
          {
            0;
            members.m_imr = ((data) & 0xff);
            break;
          }
        }
        break;
      }
    }
    ((runtime.dereference(members.m_irq_timer)).adjust?.(0) ?? 0);
  }

  function method_irq_timer_tick(runtime: any, param: any) {
    const members = runtime.members;
    for (let n: any = 0, irq: any = (members.m_prio ?? runtime.member("m_prio")); ((Number(n) < Number(8)) ? 1 : 0); n = ((n) + (1)), irq = ((((irq) + (1))) & (7))) {
      let mask: any = ((((1) << (irq))) & 0xff);
      if (((((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) && (((((((((((((members.m_master ?? runtime.member("m_master"))) && ((members.m_cascade ?? runtime.member("m_cascade")))) ? 1 : 0)) && ((members.m_nested ?? runtime.member("m_nested")))) ? 1 : 0)) && ((((members.m_slave ?? runtime.member("m_slave"))) & (mask)))) ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
        0;
        break;
      }
      if (((((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0)) && ((((members.m_irr ?? runtime.member("m_irr"))) & (mask)))) ? 1 : 0)) && ((((((members.m_imr ?? runtime.member("m_imr"))) & (mask))) ? 0 : 1))) ? 1 : 0)) {
        0;
        members.m_current_level = ((irq) << 24 >> 24);
        runtime.invoke("m_out_int_func", 1);
        return;
      }
      if ((((((((((((((((members.m_isr ?? runtime.member("m_isr"))) & (mask))) && ((members.m_master ?? runtime.member("m_master")))) ? 1 : 0)) && ((members.m_cascade ?? runtime.member("m_cascade")))) ? 1 : 0)) && ((members.m_nested ?? runtime.member("m_nested")))) ? 1 : 0)) && ((((members.m_slave ?? runtime.member("m_slave"))) & (mask)))) ? 1 : 0)) {
        break;
      }
    }
    members.m_current_level = (((-1)) << 24 >> 24);
    runtime.invoke("m_out_int_func", 0);
  }
  return {
    "read": method_read,
    "write": method_write,
    "pic8259_device::write": method_pic8259_device__write,
    "irq_timer_tick": method_irq_timer_tick
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
