// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './trackfld_audio.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_trackfld_sound_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    ((runtime.dereference(members.m_vlm)).st_w?.((((offset) >>> (8)) & 1)) ?? 0);
    ((runtime.dereference(members.m_vlm)).rst_w?.((((offset) >>> (9)) & 1)) ?? 0);
  }

  function method_hyperspt_sound_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    ((runtime.dereference(members.m_vlm)).st_w?.((((offset) >>> (4)) & 1)) ?? 0);
    ((runtime.dereference(members.m_vlm)).rst_w?.((((offset) >>> (5)) & 1)) ?? 0);
  }
  return {
    "trackfld_sound_w": method_trackfld_sound_w,
    "hyperspt_sound_w": method_hyperspt_sound_w
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
