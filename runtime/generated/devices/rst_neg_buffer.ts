// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './rst_neg_buffer.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_sync_set_input(runtime: any, param: any) {
    const members = runtime.members;
    if (((Number((members.m_input_buffer ?? runtime.member("m_input_buffer"))) === Number(0)) ? 1 : 0)) {
      members.m_input_buffer = ((param) & 0xff);
      runtime.invoke("m_int_cb", 1);
    } else {
      members.m_input_buffer = ((((members.m_input_buffer) | (param))) & 0xff);
    }
  }

  function method_sync_clear_input(runtime: any, param: any) {
    const members = runtime.members;
    if (((Number((members.m_input_buffer ?? runtime.member("m_input_buffer"))) === Number(param)) ? 1 : 0)) {
      members.m_input_buffer = ((0) & 0xff);
      runtime.invoke("m_int_cb", 0);
    } else {
      members.m_input_buffer = ((runtime.andAssign(members.m_input_buffer, (~param))) & 0xff);
    }
  }
  return {
    "sync_set_input": method_sync_set_input,
    "sync_clear_input": method_sync_clear_input
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
