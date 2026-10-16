// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './vlm5030.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_parse_frame(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_old_energy = (((members.m_new_energy ?? runtime.member("m_new_energy"))) & 0xffff);
    members.m_old_pitch = (((members.m_new_pitch ?? runtime.member("m_new_pitch"))) & 0xff);
    for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      (members.m_old_k ?? runtime.member("m_old_k"))[i] = (members.m_new_k ?? runtime.member("m_new_k"))[i];
    }
    let cmd: any = (((__l["read_byte"] ? __l["read_byte"]((members.m_address ?? runtime.member("m_address"))) : runtime.macro("read_byte", (members.m_address ?? runtime.member("m_address"))))) & 0xff);
    if (((cmd) & (1))) {
      members.m_new_energy = (((members.m_new_pitch = ((0) & 0xff))) & 0xffff);
      for (let i: any = ((0) | 0); ((Number(i) <= Number(9)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        (members.m_new_k ?? runtime.member("m_new_k"))[i] = 0;
      }
      members.m_address = ((((members.m_address) + (1))) & 0xffff);
      if (((cmd) & (2))) {
        return 0;
      } else {
        let nums: any = ((((runtime.add(runtime.shiftRight(cmd, 2), 1)) * (2))) | 0);
        return ((nums) * (4));
      }
    }
    members.m_new_pitch = ((runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).pitchtable[method_get_bits(runtime, 1, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).pitch_bits)]) & 0xff);
    if (((Number((members.m_new_pitch ?? runtime.member("m_new_pitch"))) > Number(0)) ? 1 : 0)) {
      members.m_new_pitch = ((((members.m_new_pitch) + ((members.m_pitch_offset ?? runtime.member("m_pitch_offset"))))) & 0xff);
    }
    members.m_new_energy = ((runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).energytable[method_get_bits(runtime, 6, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).energy_bits)]) & 0xffff);
    (members.m_new_k ?? runtime.member("m_new_k"))[9] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[9][method_get_bits(runtime, 11, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[9])];
    (members.m_new_k ?? runtime.member("m_new_k"))[8] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[8][method_get_bits(runtime, 14, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[8])];
    (members.m_new_k ?? runtime.member("m_new_k"))[7] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[7][method_get_bits(runtime, 17, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[7])];
    (members.m_new_k ?? runtime.member("m_new_k"))[6] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[6][method_get_bits(runtime, 20, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[6])];
    (members.m_new_k ?? runtime.member("m_new_k"))[5] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[5][method_get_bits(runtime, 23, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[5])];
    (members.m_new_k ?? runtime.member("m_new_k"))[4] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[4][method_get_bits(runtime, 26, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[4])];
    (members.m_new_k ?? runtime.member("m_new_k"))[3] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[3][method_get_bits(runtime, 29, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[3])];
    (members.m_new_k ?? runtime.member("m_new_k"))[2] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[2][method_get_bits(runtime, 33, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[2])];
    (members.m_new_k ?? runtime.member("m_new_k"))[1] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[1][method_get_bits(runtime, 37, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[1])];
    (members.m_new_k ?? runtime.member("m_new_k"))[0] = runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).ktable[0][method_get_bits(runtime, 42, runtime.dereference((members.m_coeff ?? runtime.member("m_coeff"))).kbits[0])];
    members.m_address = ((((members.m_address) + (6))) & 0xffff);
    0;
    return 4;
  }

  function method_get_bits(runtime: any, sbit: any, bits: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let offset: any = (((((members.m_address ?? runtime.member("m_address"))) + (runtime.shiftRight(sbit, 3)))) | 0);
    let data: any = (((((__l["read_byte"] ? __l["read_byte"](offset) : runtime.macro("read_byte", offset))) | ((((__l["read_byte"] ? __l["read_byte"](((offset) + (1))) : runtime.macro("read_byte", ((offset) + (1))))) << (8))))) | 0);
    data = ((runtime.shiftRight(data, ((sbit) & (7)))) | 0);
    data = ((runtime.andAssign(data, runtime.shiftRight(255, ((8) - (bits))))) | 0);
    return data;
  }
  return {
    "parse_frame": method_parse_frame,
    "get_bits": method_get_bits
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["read_byte"];

export const device = definition;
export default device;
