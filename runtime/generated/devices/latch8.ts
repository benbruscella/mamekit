// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './latch8.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_timerproc(runtime: any, param: any) {
    const members = runtime.members;
    let new_val: any = ((((param) & (255))) & 0xff);
    let mask: any = ((((param) >>> (8))) & 0xff);
    method_update(runtime, new_val, mask);
  }

  function method_update(runtime: any, new_val: any, mask: any) {
    const members = runtime.members;
    let old_val: any = ((members.m_value) & 0xff);
    members.m_value = ((((((members.m_value) & ((~mask)))) | (((new_val) & (mask))))) & 0xff);
    if (members.m_has_write) {
      let changed: any = ((((old_val) ^ (members.m_value))) & 0xff);
      for (let i: any = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
        if ((((changed) >>> (i)) & 1)) {
          runtime.readIndex(members.m_write_cb, i)((((members.m_value) >>> (i)) & 1));
        }
      }
    }
  }
  return {
    "timerproc": method_timerproc,
    "update": method_update
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
