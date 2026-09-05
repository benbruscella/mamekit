// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './pit8253.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
    const h_m_counter = members.m_counter ?? runtime.member("m_counter");
    offset = runtime.andAssign(offset, 3);
    0;
    if (((Number(offset) === Number(3)) ? 1 : 0)) {
      return 0;
    } else {
      return ((runtime.dereference(h_m_counter[offset])).read?.() ?? runtime.container(h_m_counter[offset], "read"));
    }
  }

  function method_write(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_counter = members.m_counter ?? runtime.member("m_counter");
    offset = runtime.andAssign(offset, 3);
    0;
    if (((Number(offset) === Number(3)) ? 1 : 0)) {
      let timer: any = ((((data) >>> (6))) & (3));
      if (((Number(timer) === Number(3)) ? 1 : 0)) {
        method_readback_command(runtime, data);
      } else {
        ((runtime.dereference(h_m_counter[timer])).control_w?.(data) ?? 0);
      }
    } else {
      ((runtime.dereference(h_m_counter[offset])).count_w?.(data) ?? 0);
    }
  }

  function method_readback_command(runtime: any, data: any) {
    const members = runtime.members;

  }
  return {
    "read": method_read,
    "write": method_write,
    "readback_command": method_readback_command
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
