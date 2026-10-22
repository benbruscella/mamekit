// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './mb14241.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_shift_result_r(runtime: any): any {
    const members = runtime.members;

    return ((((((runtime.shiftRight((members.m_shift_data ?? 0), (members.m_shift_count ?? 0))) & (255))) & 0xff)) & 0xff);
  }
  return {
    "shift_result_r": method_shift_result_r
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
