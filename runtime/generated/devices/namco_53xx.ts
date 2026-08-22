// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './namco_53xx.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_K_r(runtime: any) {
    const members = runtime.members;
    return runtime.invoke("m_k");
  }

  function method_R_r_0(runtime: any) {
    const members = runtime.members;
    return runtime.readIndex(members.m_in, 0)();
  }

  function method_R_r_1(runtime: any) {
    const members = runtime.members;
    return runtime.readIndex(members.m_in, 1)();
  }

  function method_R_r_2(runtime: any) {
    const members = runtime.members;
    return runtime.readIndex(members.m_in, 2)();
  }

  function method_R_r_3(runtime: any) {
    const members = runtime.members;
    return runtime.readIndex(members.m_in, 3)();
  }

  function method_O_w(runtime: any, data: any) {
    const members = runtime.members;
    members.m_portO = ((data) & 0xff);
  }

  function method_P_w(runtime: any, data: any) {
    const members = runtime.members;
    runtime.invoke("m_p", data);
  }
  return {
    "K_r": method_K_r,
    "R_r_0": method_R_r_0,
    "R_r_1": method_R_r_1,
    "R_r_2": method_R_r_2,
    "R_r_3": method_R_r_3,
    "O_w": method_O_w,
    "P_w": method_P_w
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
