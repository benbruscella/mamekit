// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './ram.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_size(runtime: any): any {
    const members = runtime.members;

    const h_m_size = members.m_size ?? runtime.member("m_size");
    return h_m_size;
  }

  function method_mask(runtime: any): any {
    const members = runtime.members;

    const h_m_size = members.m_size ?? runtime.member("m_size");
    return ((h_m_size) - (1));
  }

  function method_pointer(runtime: any): any {
    const members = runtime.members;

    return members.m_pointer;
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_size = members.m_size ?? runtime.member("m_size");
    return runtime.readIndex(method_pointer(runtime), ((offset) % (h_m_size)));
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_size = members.m_size ?? runtime.member("m_size");
    runtime.writeIndex(method_pointer(runtime), ((offset) % (h_m_size)), data);
  }
  return {
    "size": method_size,
    "mask": method_mask,
    "pointer": method_pointer,
    "read": method_read,
    "write": method_write
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
