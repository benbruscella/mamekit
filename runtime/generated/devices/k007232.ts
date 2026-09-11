// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './k007232.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_read_sample(runtime: any, channel: any, addr: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? runtime.member("m_channel");
    members.m_bank = ((h_m_channel[channel].bank) >>> 0);
    return ((runtime.dereference(members.m_cache)).read_byte?.(((addr) & (131071))) ?? 0);
  }

  function method_sound_stream_update(runtime: any, stream: any): any {
    const members = runtime.members;

    const h_m_channel = members.m_channel ?? runtime.member("m_channel");
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
            if ((((((Number(addr) >= Number((members.m_pcmlimit ?? runtime.member("m_pcmlimit")))) ? 1 : 0)) || ((((method_read_sample(runtime, i, (() => { const previous = addr; addr = ((((addr) + (1))) >>> 0); return previous; })())) >>> (7)) & 1))) ? 1 : 0)) {
              if (((((members.m_wreg ?? runtime.member("m_wreg"))[13]) >>> (i)) & 1)) {
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

    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return runtime.readIndex(h_m_rom, (((((members.m_bank ?? runtime.member("m_bank"))) + (((offset) & (131071))))) & ((((members.m_rom).length) - (1)))));
  }

  function method_k007232_device__read_rom_default(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_rom = members.m_rom ?? runtime.member("m_rom");
    return runtime.readIndex(h_m_rom, (((((members.m_bank ?? runtime.member("m_bank"))) + (((offset) & (131071))))) & ((((members.m_rom).length) - (1)))));
  }
  return {
    "read_sample": method_read_sample,
    "sound_stream_update": method_sound_stream_update,
    "read_rom_default": method_read_rom_default,
    "k007232_device::read_rom_default": method_k007232_device__read_rom_default
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
