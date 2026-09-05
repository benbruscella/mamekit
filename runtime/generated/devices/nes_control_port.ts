// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './nes_control_port.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read_exp(runtime: any, offset: any) {
    const members = runtime.members;
    let data: any = ((0) & 0xff);
    if ((members.m_device ?? runtime.member("m_device"))) {
      data = ((((runtime.dereference(members.m_device)).read_exp?.(offset) ?? 0)) & 0xff);
    }
    return data;
  }
  return {
    "read_exp": method_read_exp
  };
})() as GeneratedDeviceMethodMap;
definition.slot!.options["joypad"]!.compiledMethods = (() => {
  function method_read_exp(runtime: any, offset: any) {
    const members = runtime.members;
    return 0;
  }

  function method_device_nes_control_port_interface__read_exp(runtime: any, offset: any) {
    const members = runtime.members;
    return 0;
  }
  return {
    "read_exp": method_read_exp,
    "device_nes_control_port_interface::read_exp": method_device_nes_control_port_interface__read_exp
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
