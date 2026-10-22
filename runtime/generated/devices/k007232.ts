// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './k007232.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_wreg = members.m_wreg ?? 0;
    const h_m_channel = members.m_channel ?? 0;
    (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
    h_m_wreg[offset] = data;
    if (((Number(offset) === Number(12)) ? 1 : 0)) {
      (__l["m_port_write_handler"] ? __l["m_port_write_handler"](Number(0), Number(data)) : typeof members.m_port_write_handler === 'function' ? members.m_port_write_handler(0, data) : runtime.invoke("m_port_write_handler", 0, data));
    } else {
      if (((Number(offset) === Number(13)) ? 1 : 0)) {
      } else {
        if (((Number(offset) < Number(12)) ? 1 : 0)) {
          let channel: any = h_m_channel[((((Number(offset) >= Number(6)) ? 1 : 0)) ? (1) : (0))];
          let reg_index: any = ((((((Number(offset) >= Number(6)) ? 1 : 0)) ? (6) : (0))) | 0);
          switch (((offset) - (reg_index))) {
            case 0:
            case 1:
            {
              channel.step = (((((((((h_m_wreg[((reg_index) + (1))]) >>> (0)) & ((1 << (4)) - 1))) << (8))) | (h_m_wreg[reg_index]))) & 0xffff);
              break;
            }
            case 2:
            case 3:
            case 4:
            {
              channel.start = (((((((((((h_m_wreg[((reg_index) + (4))]) >>> (0)) & 1)) << (16))) | (((h_m_wreg[((reg_index) + (3))]) << (8))))) | (h_m_wreg[((reg_index) + (2))]))) >>> 0);
              break;
            }
            case 5:
            {
              method_start(runtime, ((reg_index) ? (1) : (0)));
              break;
            }
          }
        }
      }
    }
  }

  function method_start(runtime: any, ch: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_channel = members.m_channel ?? 0;
    let channel: any = h_m_channel[ch];
    if (((Number(channel.start) < Number((members.m_pcmlimit ?? 0))) ? 1 : 0)) {
      channel.play = ((1) & 0xff);
      channel.addr = ((channel.start) >>> 0);
      channel.counter = ((4096) | 0);
      if (0) {
        let filebuf: any = new Uint8Array(Math.max(0, Number(256)));
        (__l["snprintf"] ? __l["snprintf"](filebuf, 256, "pcm%08x.wav", channel.start) : runtime.macro("snprintf", filebuf, 256, "pcm%08x.wav", channel.start));
        let file: any = (__l["util::wav_open"] ? __l["util::wav_open"](filebuf, (typeof (runtime.dereference(members.m_stream)).sample_rate === 'function' ? (runtime.dereference(members.m_stream)).sample_rate() : typeof (runtime.dereference(members.m_stream)).sample_rate === 'number' || typeof (runtime.dereference(members.m_stream)).sample_rate === 'boolean' ? (runtime.dereference(members.m_stream)).sample_rate : runtime.container(members.m_stream, "sample_rate")), 1) : runtime.macro("util::wav_open", filebuf, (typeof (runtime.dereference(members.m_stream)).sample_rate === 'function' ? (runtime.dereference(members.m_stream)).sample_rate() : typeof (runtime.dereference(members.m_stream)).sample_rate === 'number' || typeof (runtime.dereference(members.m_stream)).sample_rate === 'boolean' ? (runtime.dereference(members.m_stream)).sample_rate : runtime.container(members.m_stream, "sample_rate")), 1));
        if (file) {
          let addr: any = ((channel.start) >>> 0);
          while ((((((Number(addr) < Number((members.m_pcmlimit ?? 0))) ? 1 : 0)) && ((((((method_read_sample(runtime, ch, addr)) >>> (7)) & 1)) ? 0 : 1))) ? 1 : 0)) {
            let out: any = ((((((((method_read_sample(runtime, ch, addr)) & (127))) - (64))) << (7))) << 16 >> 16);
            (__l["util::wav_add_data_16"] ? __l["util::wav_add_data_16"](runtime.dereference(file), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => out, set: (value: any) => { out = ((value) << 16 >> 16); } }), offset: 0 }), 1) : runtime.macro("util::wav_add_data_16", runtime.dereference(file), ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => out, set: (value: any) => { out = ((value) << 16 >> 16); } }), offset: 0 }), 1));
            addr = ((((addr) + (1))) >>> 0);
          }
        }
      }
    }
  }

  function method_read_sample(runtime: any, channel: any, addr: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    members.m_bank = ((h_m_channel[channel].bank) >>> 0);
    return ((((runtime.dereference(members.m_cache)).read_byte?.(((addr) & (131071))) ?? 0)) & 0xff);
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      if ((((((Number(offset) === Number(5)) ? 1 : 0)) || (((Number(offset) === Number(11)) ? 1 : 0))) ? 1 : 0)) {
        (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
        method_start(runtime, ((((Number(offset) === Number(11)) ? 1 : 0)) ? (1) : (0)));
      }
    }
    return ((0) & 0xff);
  }

  function method_sound_stream_update(runtime: any, stream: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? 0;
    const h_m_wreg = members.m_wreg ?? 0;
    for (let j: any = ((0) | 0); ((Number(j) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); j = ((((j) + (1))) | 0)) {
      let lsum: any = ((0) | 0);
      let rsum: any = ((0) | 0);
      for (let i: any = ((0) | 0); ((Number(i) < Number(2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        let channel: any = h_m_channel[i];
        if (channel.play) {
          let vol_a: any = ((((channel.vol[0]) * (2))) | 0);
          let vol_b: any = ((((channel.vol[1]) * (2))) | 0);
          let addr: any = ((((channel.addr) & (131071))) >>> 0);
          while (((Number(channel.counter) <= Number(channel.step)) ? 1 : 0)) {
            if ((((((Number(addr) >= Number((members.m_pcmlimit ?? 0))) ? 1 : 0)) || ((((method_read_sample(runtime, i, (() => { const previous = addr; addr = ((((addr) + (1))) >>> 0); return previous; })())) >>> (7)) & 1))) ? 1 : 0)) {
              if ((((h_m_wreg[13]) >>> (i)) & 1)) {
                addr = ((channel.start) >>> 0);
              } else {
                channel.play = ((0) & 0xff);
                break;
              }
            }
            channel.counter = ((((channel.counter) + (((4096) - (channel.step))))) | 0);
          }
          channel.addr = ((addr) >>> 0);
          if (((channel.play) ? 0 : 1)) {
            break;
          }
          channel.counter = ((((channel.counter) - (32))) | 0);
          let out: any = ((((((method_read_sample(runtime, i, addr)) & (127))) - (64))) | 0);
          lsum = ((((lsum) + (((out) * (vol_a))))) | 0);
          rsum = ((((rsum) + (((out) * (vol_b))))) | 0);
        }
      }
      ((runtime.dereference(stream)).put_int?.(0, j, lsum, 32768) ?? 0);
      ((runtime.dereference(stream)).put_int?.(1, j, rsum, 32768) ?? 0);
    }
  }

  function method_read_rom_default(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_rom = members.m_rom ?? 0;
    return ((runtime.readIndex(h_m_rom, (((((members.m_bank ?? 0)) + (((offset) & (131071))))) & (runtime.subtract((members.m_rom).length, 1))))) & 0xff);
  }

  function method_k007232_device__read_rom_default(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_rom = members.m_rom ?? 0;
    return ((runtime.readIndex(h_m_rom, (((((members.m_bank ?? 0)) + (((offset) & (131071))))) & (runtime.subtract((members.m_rom).length, 1))))) & 0xff);
  }
  return {
    "write": method_write,
    "start": method_start,
    "read_sample": method_read_sample,
    "read": method_read,
    "sound_stream_update": method_sound_stream_update,
    "read_rom_default": method_read_rom_default,
    "k007232_device::read_rom_default": method_k007232_device__read_rom_default
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_port_write_handler","machine","machine().side_effects_disabled","snprintf","util::wav_add_data_16","util::wav_open"];

export const device = definition;
export default device;
