// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './vlm5030.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  const __mame_table_0 = [40, 30, 20, 20, 40, 60, 50, 50];

  function method_bsy_r(runtime: any): any {
    const members = runtime.members;

    (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
    return (members.m_pin_BSY ?? 0);
  }

  function method_data_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_latch_data = ((data) & 0xff);
  }

  function method_rst_w(runtime: any, state: any): any {
    const members = runtime.members;

    state = ((((state) ? (1) : (0))) | 0);
    if (((Number((members.m_pin_RST ?? 0)) !== Number(state)) ? 1 : 0)) {
      (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
      members.m_pin_RST = ((state) & 0xff);
      if (((state) ? 0 : 1)) {
        method_setup_parameter(runtime, (members.m_latch_data ?? 0));
      } else {
        if ((members.m_pin_BSY ?? 0)) {
          method_device_reset(runtime);
        }
      }
    }
  }

  function method_setup_parameter(runtime: any, param: any): any {
    const members = runtime.members;

    members.m_parameter = ((param) & 0xff);
    if (((param) & (2))) {
      members.m_interp_step = ((4) & 0xff);
    } else {
      if (((param) & (1))) {
        members.m_interp_step = ((2) & 0xff);
      } else {
        members.m_interp_step = ((1) & 0xff);
      }
    }
    members.m_frame_size = (((__mame_table_0[(((((((param) >>> (3))) & (7))) % 8) + 8) % 8] ?? 0)) | 0);
    if (((param) & (128))) {
      members.m_pitch_offset = ((-8) | 0);
    } else {
      if (((param) & (64))) {
        members.m_pitch_offset = ((8) | 0);
      } else {
        members.m_pitch_offset = ((0) | 0);
      }
    }
  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;

    const h_m_old_k = members.m_old_k ?? 0;
    const h_m_new_k = members.m_new_k ?? 0;
    const h_m_current_k = members.m_current_k ?? 0;
    const h_m_target_k = members.m_target_k ?? 0;
    const h_m_x = members.m_x ?? 0;
    members.m_phase = ((0) & 0xff);
    members.m_address = ((0) & 0xffff);
    members.m_vcu_addr_h = ((0) & 0xffff);
    members.m_pin_BSY = ((0) & 0xff);
    members.m_old_energy = (((members.m_old_pitch = ((0) & 0xff))) & 0xffff);
    members.m_new_energy = (((members.m_new_pitch = ((0) & 0xff))) & 0xffff);
    members.m_current_energy = (((members.m_current_pitch = ((0) >>> 0))) >>> 0);
    members.m_target_energy = (((members.m_target_pitch = ((0) & 0xff))) & 0xffff);
    (() => { const target = h_m_old_k; const bytes = Number(20); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_new_k; const bytes = Number(20); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_current_k; const bytes = Number(10); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    (() => { const target = h_m_target_k; const bytes = Number(20); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    members.m_interp_count = (((members.m_sample_count = (((members.m_pitch_count = ((0) & 0xff))) & 0xff))) & 0xff);
    (() => { const target = h_m_x; const bytes = Number(40); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    method_setup_parameter(runtime, 0);
  }

  function method_vcu_w(runtime: any, state: any): any {
    const members = runtime.members;

    members.m_pin_VCU = ((((state) ? (1) : (0))) & 0xff);
  }

  function method_st_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    state = ((((state) ? (1) : (0))) | 0);
    if (((Number((members.m_pin_ST ?? 0)) !== Number(state)) ? 1 : 0)) {
      (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
      members.m_pin_ST = ((state) & 0xff);
      if (((state) ? 0 : 1)) {
        if ((members.m_pin_VCU ?? 0)) {
          members.m_vcu_addr_h = ((runtime.add((((((members.m_latch_data ?? 0)) | 0)) << (8)), 1)) & 0xffff);
        } else {
          if ((members.m_vcu_addr_h ?? 0)) {
            members.m_address = (((((((members.m_vcu_addr_h ?? 0)) & (65280))) + ((members.m_latch_data ?? 0)))) & 0xffff);
            members.m_vcu_addr_h = ((0) & 0xffff);
          } else {
            let table: any = ((runtime.add((((members.m_latch_data ?? 0)) & (254)), (((((((members.m_latch_data ?? 0)) | 0)) & (1))) << (8)))) | 0);
            members.m_address = (((((((__l["read_byte"] ? __l["read_byte"](table) : runtime.macro("read_byte", table))) << (8))) | ((__l["read_byte"] ? __l["read_byte"](((table) + (1))) : runtime.macro("read_byte", ((table) + (1))))))) & 0xffff);
          }
          members.m_sample_count = (((members.m_frame_size ?? 0)) & 0xff);
          members.m_interp_count = ((4) & 0xff);
          members.m_phase = ((4) & 0xff);
        }
      } else {
        members.m_phase = ((2) & 0xff);
        members.m_sample_count = ((1) & 0xff);
        members.m_pin_BSY = ((1) & 0xff);
      }
    }
  }

  function method_sound_stream_update(runtime: any, stream: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_old_k = members.m_old_k ?? 0;
    const h_m_current_k = members.m_current_k ?? 0;
    const h_m_target_k = members.m_target_k ?? 0;
    const h_m_new_k = members.m_new_k ?? 0;
    const h_m_x = members.m_x ?? 0;
    let __goto_phase_stop: any = ((0) | 0);
    while (1) {
      if ((((((Number((members.m_phase ?? 0)) === Number(4)) ? 1 : 0)) || (((Number((members.m_phase ?? 0)) === Number(5)) ? 1 : 0))) ? 1 : 0)) {
        let u: any = new Int32Array(new Uint8Array(Math.max(0, Number(11))));
        for (let sampindex: any = ((0) | 0); ((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
          let current_val: any = ((0) | 0);
          if (((Number((members.m_sample_count ?? 0)) === Number(0)) ? 1 : 0)) {
            if (((Number((members.m_phase ?? 0)) === Number(5)) ? 1 : 0)) {
              members.m_phase = ((6) & 0xff);
              members.m_sample_count = ((1) & 0xff);
              __goto_phase_stop = ((1) | 0);
              break;
            }
            members.m_sample_count = (((members.m_frame_size ?? 0)) & 0xff);
            if (((Number((members.m_interp_count ?? 0)) === Number(0)) ? 1 : 0)) {
              members.m_interp_count = ((method_parse_frame(runtime)) & 0xff);
              if (((Number((members.m_interp_count ?? 0)) === Number(0)) ? 1 : 0)) {
                members.m_interp_count = ((4) & 0xff);
                members.m_sample_count = (((members.m_frame_size ?? 0)) & 0xff);
                members.m_phase = ((5) & 0xff);
              }
              members.m_current_energy = (((members.m_old_energy ?? 0)) >>> 0);
              members.m_current_pitch = (((members.m_old_pitch ?? 0)) >>> 0);
              for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                h_m_current_k[i] = h_m_old_k[i];
              }
              if (((Number((members.m_current_energy ?? 0)) === Number(0)) ? 1 : 0)) {
                members.m_target_energy = ((0) & 0xffff);
                members.m_target_pitch = (((members.m_current_pitch ?? 0)) & 0xff);
                for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                  h_m_target_k[i] = h_m_current_k[i];
                }
              } else {
                members.m_target_energy = (((members.m_new_energy ?? 0)) & 0xffff);
                members.m_target_pitch = (((members.m_new_pitch ?? 0)) & 0xff);
                for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                  h_m_target_k[i] = h_m_new_k[i];
                }
              }
            }
            members.m_interp_count = ((((members.m_interp_count) - ((members.m_interp_step ?? 0)))) & 0xff);
            let interp_effect: any = ((((4) - ((((members.m_interp_count ?? 0)) % (4))))) | 0);
            members.m_current_energy = (((((members.m_old_energy ?? 0)) + (runtime.divide((((((members.m_target_energy ?? 0)) - ((members.m_old_energy ?? 0)))) * (interp_effect)), 4)))) >>> 0);
            if (((Number((members.m_old_pitch ?? 0)) > Number(1)) ? 1 : 0)) {
              members.m_current_pitch = (((((members.m_old_pitch ?? 0)) + (runtime.divide((((((members.m_target_pitch ?? 0)) - ((members.m_old_pitch ?? 0)))) * (interp_effect)), 4)))) >>> 0);
            }
            for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
              h_m_current_k[i] = ((h_m_old_k[i]) + (runtime.divide(((((h_m_target_k[i]) - (h_m_old_k[i]))) * (interp_effect)), 4)));
            }
          }
          if (((Number((members.m_old_energy ?? 0)) === Number(0)) ? 1 : 0)) {
            current_val = ((0) | 0);
          } else {
            if (((Number((members.m_old_pitch ?? 0)) <= Number(1)) ? 1 : 0)) {
              current_val = ((((((((__l["machine().rand"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().rand"))?.() ?? 0)) & (1))) ? ((members.m_current_energy ?? 0)) : ((-(members.m_current_energy ?? 0))))) | 0);
            } else {
              current_val = ((((((Number((members.m_pitch_count ?? 0)) === Number(0)) ? 1 : 0)) ? ((members.m_current_energy ?? 0)) : (0))) | 0);
            }
          }
          u[10] = current_val;
          for (let i: any = ((9) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            u[i] = ((u[((i) + (1))]) - (runtime.divide((((-h_m_current_k[i])) * (h_m_x[i])), 512)));
          }
          for (let i: any = ((9) | 0); ((Number(i) >= Number(1)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            h_m_x[i] = ((h_m_x[((i) - (1))]) + (runtime.divide((((-h_m_current_k[((i) - (1))])) * (u[((i) - (1))])), 512)));
          }
          h_m_x[0] = u[0];
          ((runtime.dereference(stream)).put_int_clamp?.(0, sampindex, u[0], 512) ?? 0);
          members.m_sample_count = ((((members.m_sample_count) - (1))) & 0xff);
          members.m_pitch_count = ((((members.m_pitch_count) + (1))) & 0xff);
          if (((Number((members.m_pitch_count ?? 0)) >= Number((members.m_current_pitch ?? 0))) ? 1 : 0)) {
            members.m_pitch_count = ((0) & 0xff);
          }
        }
        if (__goto_phase_stop) {
          break;
        }
      }
      break;
    }
    switch (((members.m_phase ?? 0) as number)) {
      case 2:
      {
        if (((Number((members.m_sample_count ?? 0)) <= Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0)) {
          members.m_sample_count = ((0) & 0xff);
          members.m_phase = ((3) & 0xff);
        } else {
          members.m_sample_count = ((((members.m_sample_count) - ((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))))) & 0xff);
        }
        break;
      }
      case 6:
      {
        if (((Number((members.m_sample_count ?? 0)) <= Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0)) {
          members.m_sample_count = ((0) & 0xff);
          members.m_pin_BSY = ((0) & 0xff);
          members.m_phase = ((1) & 0xff);
        } else {
          members.m_sample_count = ((((members.m_sample_count) - ((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples"))))) & 0xff);
        }
      }
    }
  }

  function method_parse_frame(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_new_k = members.m_new_k ?? 0;
    const h_m_old_k = members.m_old_k ?? 0;
    members.m_old_energy = (((members.m_new_energy ?? 0)) & 0xffff);
    members.m_old_pitch = (((members.m_new_pitch ?? 0)) & 0xff);
    for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      h_m_old_k[i] = h_m_new_k[i];
    }
    let cmd: any = (((__l["read_byte"] ? __l["read_byte"]((members.m_address ?? 0)) : runtime.macro("read_byte", (members.m_address ?? 0)))) & 0xff);
    if (((cmd) & (1))) {
      members.m_new_energy = (((members.m_new_pitch = ((0) & 0xff))) & 0xffff);
      for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        h_m_new_k[i] = 0;
      }
      members.m_address = ((((members.m_address) + (1))) & 0xffff);
      if (((cmd) & (2))) {
        return 0;
      } else {
        let nums: any = ((((runtime.add(((cmd) >>> (2)), 1)) * (2))) | 0);
        return ((nums) * (4));
      }
    }
    members.m_new_pitch = ((runtime.dereference((members.m_coeff ?? 0)).pitchtable[method_get_bits(runtime, 1, runtime.dereference((members.m_coeff ?? 0)).pitch_bits)]) & 0xff);
    if (((Number((members.m_new_pitch ?? 0)) > Number(0)) ? 1 : 0)) {
      members.m_new_pitch = ((((members.m_new_pitch) + ((members.m_pitch_offset ?? 0)))) & 0xff);
    }
    members.m_new_energy = ((runtime.dereference((members.m_coeff ?? 0)).energytable[method_get_bits(runtime, 6, runtime.dereference((members.m_coeff ?? 0)).energy_bits)]) & 0xffff);
    h_m_new_k[9] = runtime.dereference((members.m_coeff ?? 0)).ktable[9][method_get_bits(runtime, 11, runtime.dereference((members.m_coeff ?? 0)).kbits[9])];
    h_m_new_k[8] = runtime.dereference((members.m_coeff ?? 0)).ktable[8][method_get_bits(runtime, 14, runtime.dereference((members.m_coeff ?? 0)).kbits[8])];
    h_m_new_k[7] = runtime.dereference((members.m_coeff ?? 0)).ktable[7][method_get_bits(runtime, 17, runtime.dereference((members.m_coeff ?? 0)).kbits[7])];
    h_m_new_k[6] = runtime.dereference((members.m_coeff ?? 0)).ktable[6][method_get_bits(runtime, 20, runtime.dereference((members.m_coeff ?? 0)).kbits[6])];
    h_m_new_k[5] = runtime.dereference((members.m_coeff ?? 0)).ktable[5][method_get_bits(runtime, 23, runtime.dereference((members.m_coeff ?? 0)).kbits[5])];
    h_m_new_k[4] = runtime.dereference((members.m_coeff ?? 0)).ktable[4][method_get_bits(runtime, 26, runtime.dereference((members.m_coeff ?? 0)).kbits[4])];
    h_m_new_k[3] = runtime.dereference((members.m_coeff ?? 0)).ktable[3][method_get_bits(runtime, 29, runtime.dereference((members.m_coeff ?? 0)).kbits[3])];
    h_m_new_k[2] = runtime.dereference((members.m_coeff ?? 0)).ktable[2][method_get_bits(runtime, 33, runtime.dereference((members.m_coeff ?? 0)).kbits[2])];
    h_m_new_k[1] = runtime.dereference((members.m_coeff ?? 0)).ktable[1][method_get_bits(runtime, 37, runtime.dereference((members.m_coeff ?? 0)).kbits[1])];
    h_m_new_k[0] = runtime.dereference((members.m_coeff ?? 0)).ktable[0][method_get_bits(runtime, 42, runtime.dereference((members.m_coeff ?? 0)).kbits[0])];
    members.m_address = ((((members.m_address) + (6))) & 0xffff);
    0;
    return 4;
  }

  function method_get_bits(runtime: any, sbit: any, bits: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let offset: any = (((((members.m_address ?? 0)) + (runtime.shiftRight(sbit, 3)))) | 0);
    let data: any = (((((__l["read_byte"] ? __l["read_byte"](offset) : runtime.macro("read_byte", offset))) | ((((__l["read_byte"] ? __l["read_byte"](((offset) + (1))) : runtime.macro("read_byte", ((offset) + (1))))) << (8))))) | 0);
    data = ((runtime.shiftRight(data, ((sbit) & (7)))) | 0);
    data = ((((data) & (runtime.shiftRight(255, ((8) - (bits)))))) | 0);
    return data;
  }
  return {
    "bsy_r": method_bsy_r,
    "data_w": method_data_w,
    "rst_w": method_rst_w,
    "setup_parameter": method_setup_parameter,
    "device_reset": method_device_reset,
    "vcu_w": method_vcu_w,
    "st_w": method_st_w,
    "sound_stream_update": method_sound_stream_update,
    "parse_frame": method_parse_frame,
    "get_bits": method_get_bits
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["machine","machine().rand","read_byte"];

export const device = definition;
export default device;
