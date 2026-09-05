// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './namco_06xx.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_data_r(runtime: any, offset: any) {
    const members = runtime.members;
    let result: any = ((255) & 0xff);
    if (((((((members.m_control ?? runtime.member("m_control"))) >>> (4)) & 1)) ? 0 : 1)) {
      0;
      return 0;
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (0)) & 1)) {
      result = ((runtime.andAssign(result, runtime.readIndex((members.m_read ?? runtime.member("m_read")), 0)(0))) & 0xff);
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (1)) & 1)) {
      result = ((runtime.andAssign(result, runtime.readIndex((members.m_read ?? runtime.member("m_read")), 1)(0))) & 0xff);
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (2)) & 1)) {
      result = ((runtime.andAssign(result, runtime.readIndex((members.m_read ?? runtime.member("m_read")), 2)(0))) & 0xff);
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (3)) & 1)) {
      result = ((runtime.andAssign(result, runtime.readIndex((members.m_read ?? runtime.member("m_read")), 3)(0))) & 0xff);
    }
    return result;
  }

  function method_write_sync(runtime: any, param: any) {
    const members = runtime.members;
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (4)) & 1)) {
      0;
      return;
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (0)) & 1)) {
      runtime.readIndex((members.m_write ?? runtime.member("m_write")), 0)(0, param);
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (1)) & 1)) {
      runtime.readIndex((members.m_write ?? runtime.member("m_write")), 1)(0, param);
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (2)) & 1)) {
      runtime.readIndex((members.m_write ?? runtime.member("m_write")), 2)(0, param);
    }
    if (((((members.m_control ?? runtime.member("m_control"))) >>> (3)) & 1)) {
      runtime.readIndex((members.m_write ?? runtime.member("m_write")), 3)(0, param);
    }
  }
  return {
    "data_r": method_data_r,
    "write_sync": method_write_sync
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
