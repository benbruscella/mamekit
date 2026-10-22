// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './trackfld_audio.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_trackfld_sh_timer_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let clock: any = ((runtime.divide((__l["m_audiocpu.total_cycles"] ? __l["m_audiocpu.total_cycles"]() : ((members.m_audiocpu)?.total_cycles?.() ?? 0)), 1024)) >>> 0);
    return ((((clock) & (15))) & 0xff);
  }

  function method_trackfld_speech_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (((((__l["m_vlm.bsy_r"] ? __l["m_vlm.bsy_r"]() : ((members.m_vlm)?.bsy_r?.() ?? 0))) ? (16) : (0))) & 0xff);
  }

  function method_trackfld_sound_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_vlm.st_w"] ? __l["m_vlm.st_w"]((((offset) >>> (8)) & 1)) : ((members.m_vlm)?.st_w?.((((offset) >>> (8)) & 1)) ?? 0));
    (__l["m_vlm.rst_w"] ? __l["m_vlm.rst_w"]((((offset) >>> (9)) & 1)) : ((members.m_vlm)?.rst_w?.((((offset) >>> (9)) & 1)) ?? 0));
  }

  function method_hyperspt_sh_timer_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_vlm = members.m_vlm ?? 0;
    let clock: any = ((runtime.divide((__l["m_audiocpu.total_cycles"] ? __l["m_audiocpu.total_cycles"]() : ((members.m_audiocpu)?.total_cycles?.() ?? 0)), 1024)) >>> 0);
    if (((Number(h_m_vlm) !== Number(0)) ? 1 : 0)) {
      return ((((((clock) & (3))) | ((((__l["m_vlm.bsy_r"] ? __l["m_vlm.bsy_r"]() : ((members.m_vlm)?.bsy_r?.() ?? 0))) ? (4) : (0))))) & 0xff);
    } else {
      return ((((clock) & (3))) & 0xff);
    }
  }

  function method_hyperspt_sound_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_vlm.st_w"] ? __l["m_vlm.st_w"]((((offset) >>> (4)) & 1)) : ((members.m_vlm)?.st_w?.((((offset) >>> (4)) & 1)) ?? 0));
    (__l["m_vlm.rst_w"] ? __l["m_vlm.rst_w"]((((offset) >>> (5)) & 1)) : ((members.m_vlm)?.rst_w?.((((offset) >>> (5)) & 1)) ?? 0));
  }

  function method_sh_irqtrigger_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((((members.m_last_irq ?? 0)) ? 0 : 1)) && (state)) ? 1 : 0)) {
      (__l["m_audiocpu.set_input_line"] ? __l["m_audiocpu.set_input_line"](0, 2) : ((members.m_audiocpu)?.set_input_line?.(0, 2) ?? 0));
    }
    members.m_last_irq = ((state) & 0xff);
  }
  return {
    "trackfld_sh_timer_r": method_trackfld_sh_timer_r,
    "trackfld_speech_r": method_trackfld_speech_r,
    "trackfld_sound_w": method_trackfld_sound_w,
    "hyperspt_sh_timer_r": method_hyperspt_sh_timer_r,
    "hyperspt_sound_w": method_hyperspt_sound_w,
    "sh_irqtrigger_w": method_sh_irqtrigger_w
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_audiocpu.set_input_line","m_audiocpu.total_cycles","m_vlm.bsy_r","m_vlm.rst_w","m_vlm.st_w"];

export const device = definition;
export default device;
