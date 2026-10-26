// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './er2055.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_set_clk(runtime: any, state: any): any {
    const members = runtime.members;

    let oldstate: any = (((members.m_control_state ?? 0)) & 0xff);
    if (state) {
      members.m_control_state = ((((members.m_control_state) | (1))) & 0xff);
    } else {
      members.m_control_state = ((((members.m_control_state) & (-2))) & 0xff);
    }
    if (((((((((Number((((members.m_control_state ?? 0)) & (24))) === Number(24)) ? 1 : 0)) && (((Number((members.m_control_state ?? 0)) !== Number(oldstate)) ? 1 : 0))) ? 1 : 0)) && (((state) ? 0 : 1))) ? 1 : 0)) {
      if (((Number((((members.m_control_state ?? 0)) & (2))) === Number(2)) ? 1 : 0)) {
        members.m_data = (((members.m_rom_data ?? 0)[(members.m_address ?? 0)]) & 0xff);
        0;
      }
      method_update_state(runtime);
    }
  }

  function method_update_state(runtime: any): any {
    const members = runtime.members;

    switch (((((members.m_control_state ?? 0)) & (6)) as number)) {
      case 0:
      {
        (members.m_rom_data ?? 0)[(members.m_address ?? 0)] = runtime.andAssign((members.m_rom_data ?? 0)[(members.m_address ?? 0)], (members.m_data ?? 0));
        0;
        break;
      }
      case 4:
      {
        (members.m_rom_data ?? 0)[(members.m_address ?? 0)] = 255;
        0;
        break;
      }
    }
  }

  function method_data(runtime: any): any {
    const members = runtime.members;

    return (((members.m_data ?? 0)) & 0xff);
  }

  function method_set_address(runtime: any, address: any): any {
    const members = runtime.members;

    members.m_address = ((((address) & (63))) & 0xff);
  }

  function method_set_data(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_data = ((data) & 0xff);
  }

  function method_er2055_device__data(runtime: any): any {
    const members = runtime.members;

    return (((members.m_data ?? 0)) & 0xff);
  }

  function method_er2055_device__set_address(runtime: any, address: any): any {
    const members = runtime.members;

    members.m_address = ((((address) & (63))) & 0xff);
  }

  function method_er2055_device__set_data(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_data = ((data) & 0xff);
  }
  return {
    "set_clk": method_set_clk,
    "update_state": method_update_state,
    "data": method_data,
    "set_address": method_set_address,
    "set_data": method_set_data,
    "er2055_device::data": method_er2055_device__data,
    "er2055_device::set_address": method_er2055_device__set_address,
    "er2055_device::set_data": method_er2055_device__set_data
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
