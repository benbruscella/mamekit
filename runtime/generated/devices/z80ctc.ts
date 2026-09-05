// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './z80ctc.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_channel = members.m_channel ?? runtime.member("m_channel");
    let ch: any = ((offset) & (3));
    return h_m_channel[ch].m_down;
  }

  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_channel = members.m_channel ?? runtime.member("m_channel");
    let ch: any = ((offset) & (3));
    if (((Number(((h_m_channel[ch].m_mode) & (4))) === Number(4)) ? 1 : 0)) {
      h_m_channel[ch].m_tconst = ((data) ? (data) : (256));
      h_m_channel[ch].m_mode = runtime.andAssign(h_m_channel[ch].m_mode, (~4));
      h_m_channel[ch].m_mode = runtime.andAssign(h_m_channel[ch].m_mode, (~2));
      h_m_channel[ch].m_down = h_m_channel[ch].m_tconst;
    } else {
      if ((((((Number(((data) & (1))) === Number(0)) ? 1 : 0)) && (((Number(ch) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
        members.m_vector = ((((data) & (248))) & 0xff);
      } else {
        if (((Number(((data) & (1))) === Number(1)) ? 1 : 0)) {
          h_m_channel[ch].m_mode = data;
          if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
            h_m_channel[ch].m_int_state = runtime.andAssign(h_m_channel[ch].m_int_state, (~1));
          }
          method_interrupt_check(runtime);
        }
      }
    }
  }

  function method_interrupt_check(runtime: any) {
    const members = runtime.members;
    let state: any = method_z80daisy_irq_state(runtime);
    runtime.invoke("m_intr_cb", ((((state) & (1))) ? (1) : (0)));
  }

  function method_z80daisy_irq_state(runtime: any) {
    const members = runtime.members;
    const h_m_channel = members.m_channel ?? runtime.member("m_channel");
    let state: any = 0;
    for (let ch: any = 0; ((Number(ch) < Number(4)) ? 1 : 0); ch = ((ch) + (1))) {
      if (((h_m_channel[ch].m_int_state) & (2))) {
        state = ((state) | (2));
        break;
      }
      state = ((state) | (h_m_channel[ch].m_int_state));
    }
    return state;
  }
  return {
    "read": method_read,
    "write": method_write,
    "interrupt_check": method_interrupt_check,
    "z80daisy_irq_state": method_z80daisy_irq_state
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
