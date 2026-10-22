// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './buffered_spriteram8.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_vblank_copy_rising(runtime: any, state: any): any {
    const members = runtime.members;

    if (state) {
      runtime.invoke("copy");
    }
  }

  function method_bytes(runtime: any): any {
    const members = runtime.members;

    return runtime.container(members.m_spriteram, "bytes");
  }

  function method_vblank_copy_falling(runtime: any, state: any): any {
    const members = runtime.members;

    if (((state) ? 0 : 1)) {
      runtime.invoke("copy");
    }
  }

  function method_buffered_spriteram_device__vblank_copy_rising(runtime: any, state: any): any {
    const members = runtime.members;

    if (state) {
      runtime.invoke("copy");
    }
  }

  function method_buffered_spriteram_device__vblank_copy_falling(runtime: any, state: any): any {
    const members = runtime.members;

    if (((state) ? 0 : 1)) {
      runtime.invoke("copy");
    }
  }
  return {
    "vblank_copy_rising": method_vblank_copy_rising,
    "bytes": method_bytes,
    "vblank_copy_falling": method_vblank_copy_falling,
    "buffered_spriteram_device::vblank_copy_rising": method_buffered_spriteram_device__vblank_copy_rising,
    "buffered_spriteram_device::vblank_copy_falling": method_buffered_spriteram_device__vblank_copy_falling
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
