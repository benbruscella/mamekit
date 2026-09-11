// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './adc0804.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_conversion_done(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_result = (((__l["m_vin_callback"] ? __l["m_vin_callback"]() : typeof members.m_vin_callback === 'function' ? members.m_vin_callback() : runtime.invoke("m_vin_callback"))) & 0xff);
    if (((((((members.m_rd_active ?? runtime.member("m_rd_active"))) ? 0 : 1)) && ((((members.m_wr_active ?? runtime.member("m_wr_active"))) ? 0 : 1))) ? 1 : 0)) {
      method_set_interrupt(runtime, 1);
    }
  }

  function method_set_interrupt(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_intr_active ?? runtime.member("m_intr_active"))) !== Number(state)) ? 1 : 0)) {
      members.m_intr_active = ((state) ? 1 : 0);
      (__l["m_intr_callback"] ? __l["m_intr_callback"](Number(((state) ? (1) : (0)))) : typeof members.m_intr_callback === 'function' ? members.m_intr_callback(((state) ? (1) : (0))) : runtime.invoke("m_intr_callback", ((state) ? (1) : (0))));
    }
  }
  return {
    "conversion_done": method_conversion_done,
    "set_interrupt": method_set_interrupt
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_intr_callback","m_vin_callback"];

export const device = definition;
export default device;
