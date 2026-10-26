// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './latch8.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    0;
    let res: any = (((members.m_value ?? 0)) & 0xff);
    if ((members.m_has_read ?? 0)) {
      for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        if (((((runtime.dereference(runtime.readIndex((members.m_read_cb ?? 0), i))).isunset?.() ?? runtime.container(runtime.readIndex((members.m_read_cb ?? 0), i), "isunset"))) ? 0 : 1)) {
          res = ((((((res) & ((~((1) << (i)))))) | (((runtime.readIndex((members.m_read_cb ?? 0), i)()) << (i))))) & 0xff);
        }
      }
    }
    return ((((((res) & ((~(members.m_maskout ?? 0))))) ^ ((members.m_xorvalue ?? 0)))) & 0xff);
  }

  function method_update(runtime: any, new_val: any, mask: any): any {
    const members = runtime.members;

    let old_val: any = (((members.m_value ?? 0)) & 0xff);
    members.m_value = (((((((members.m_value ?? 0)) & ((~mask)))) | (((new_val) & (mask))))) & 0xff);
    if ((members.m_has_write ?? 0)) {
      let changed: any = ((((old_val) ^ ((members.m_value ?? 0)))) & 0xff);
      for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        if ((((changed) >>> (i)) & 1)) {
          runtime.readIndex((members.m_write_cb ?? 0), i)(((((members.m_value ?? 0)) >>> (i)) & 1));
        }
      }
    }
  }

  function method_reset_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    0;
    members.m_value = ((0) & 0xff);
  }

  function method_bit0_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (0)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit1_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (1)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit2_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (2)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit3_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (3)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit4_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (4)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit5_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (5)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit6_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (6)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_bit7_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    let mask: any = ((((1) << (offset))) & 0xff);
    let masked_data: any = (((((((data) >>> (7)) & 1)) << (offset))) & 0xff);
    method_update(runtime, masked_data, mask);
  }

  function method_timerproc(runtime: any, param: any): any {
    const members = runtime.members;

    let new_val: any = ((((param) & (255))) & 0xff);
    let mask: any = ((runtime.shiftRight(param, 8)) & 0xff);
    method_update(runtime, new_val, mask);
  }

  function method_set_maskout(runtime: any, maskout: any): any {
    const members = runtime.members;

    members.m_maskout = ((maskout) >>> 0);
  }

  function method_set_xorvalue(runtime: any, xorvalue: any): any {
    const members = runtime.members;

    members.m_xorvalue = ((xorvalue) >>> 0);
  }

  function method_set_nosync(runtime: any, nosync: any): any {
    const members = runtime.members;

    members.m_nosync = ((nosync) >>> 0);
  }

  function method_bit0_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (0)) & 1);
  }

  function method_bit1_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (1)) & 1);
  }

  function method_bit2_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (2)) & 1);
  }

  function method_bit3_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (3)) & 1);
  }

  function method_bit4_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (4)) & 1);
  }

  function method_bit5_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (5)) & 1);
  }

  function method_bit6_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (6)) & 1);
  }

  function method_bit7_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (7)) & 1);
  }

  function method_bit0_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (0)) & 1);
  }

  function method_bit1_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (1)) & 1);
  }

  function method_bit2_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (2)) & 1);
  }

  function method_bit3_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (3)) & 1);
  }

  function method_bit4_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (4)) & 1);
  }

  function method_bit5_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (5)) & 1);
  }

  function method_bit6_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (6)) & 1);
  }

  function method_bit7_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (7)) & 1);
  }

  function method_latch8_device__set_maskout(runtime: any, maskout: any): any {
    const members = runtime.members;

    members.m_maskout = ((maskout) >>> 0);
  }

  function method_latch8_device__set_xorvalue(runtime: any, xorvalue: any): any {
    const members = runtime.members;

    members.m_xorvalue = ((xorvalue) >>> 0);
  }

  function method_latch8_device__set_nosync(runtime: any, nosync: any): any {
    const members = runtime.members;

    members.m_nosync = ((nosync) >>> 0);
  }

  function method_latch8_device__bit0_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (0)) & 1);
  }

  function method_latch8_device__bit1_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (1)) & 1);
  }

  function method_latch8_device__bit2_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (2)) & 1);
  }

  function method_latch8_device__bit3_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (3)) & 1);
  }

  function method_latch8_device__bit4_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (4)) & 1);
  }

  function method_latch8_device__bit5_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (5)) & 1);
  }

  function method_latch8_device__bit6_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (6)) & 1);
  }

  function method_latch8_device__bit7_r(runtime: any): any {
    const members = runtime.members;

    return ((((members.m_value ?? 0)) >>> (7)) & 1);
  }

  function method_latch8_device__bit0_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (0)) & 1);
  }

  function method_latch8_device__bit1_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (1)) & 1);
  }

  function method_latch8_device__bit2_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (2)) & 1);
  }

  function method_latch8_device__bit3_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (3)) & 1);
  }

  function method_latch8_device__bit4_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (4)) & 1);
  }

  function method_latch8_device__bit5_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (5)) & 1);
  }

  function method_latch8_device__bit6_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (6)) & 1);
  }

  function method_latch8_device__bit7_q_r(runtime: any): any {
    const members = runtime.members;

    return ((((~(members.m_value ?? 0))) >>> (7)) & 1);
  }
  return {
    "read": method_read,
    "update": method_update,
    "reset_w": method_reset_w,
    "bit0_w": method_bit0_w,
    "bit1_w": method_bit1_w,
    "bit2_w": method_bit2_w,
    "bit3_w": method_bit3_w,
    "bit4_w": method_bit4_w,
    "bit5_w": method_bit5_w,
    "bit6_w": method_bit6_w,
    "bit7_w": method_bit7_w,
    "timerproc": method_timerproc,
    "set_maskout": method_set_maskout,
    "set_xorvalue": method_set_xorvalue,
    "set_nosync": method_set_nosync,
    "bit0_r": method_bit0_r,
    "bit1_r": method_bit1_r,
    "bit2_r": method_bit2_r,
    "bit3_r": method_bit3_r,
    "bit4_r": method_bit4_r,
    "bit5_r": method_bit5_r,
    "bit6_r": method_bit6_r,
    "bit7_r": method_bit7_r,
    "bit0_q_r": method_bit0_q_r,
    "bit1_q_r": method_bit1_q_r,
    "bit2_q_r": method_bit2_q_r,
    "bit3_q_r": method_bit3_q_r,
    "bit4_q_r": method_bit4_q_r,
    "bit5_q_r": method_bit5_q_r,
    "bit6_q_r": method_bit6_q_r,
    "bit7_q_r": method_bit7_q_r,
    "latch8_device::set_maskout": method_latch8_device__set_maskout,
    "latch8_device::set_xorvalue": method_latch8_device__set_xorvalue,
    "latch8_device::set_nosync": method_latch8_device__set_nosync,
    "latch8_device::bit0_r": method_latch8_device__bit0_r,
    "latch8_device::bit1_r": method_latch8_device__bit1_r,
    "latch8_device::bit2_r": method_latch8_device__bit2_r,
    "latch8_device::bit3_r": method_latch8_device__bit3_r,
    "latch8_device::bit4_r": method_latch8_device__bit4_r,
    "latch8_device::bit5_r": method_latch8_device__bit5_r,
    "latch8_device::bit6_r": method_latch8_device__bit6_r,
    "latch8_device::bit7_r": method_latch8_device__bit7_r,
    "latch8_device::bit0_q_r": method_latch8_device__bit0_q_r,
    "latch8_device::bit1_q_r": method_latch8_device__bit1_q_r,
    "latch8_device::bit2_q_r": method_latch8_device__bit2_q_r,
    "latch8_device::bit3_q_r": method_latch8_device__bit3_q_r,
    "latch8_device::bit4_q_r": method_latch8_device__bit4_q_r,
    "latch8_device::bit5_q_r": method_latch8_device__bit5_q_r,
    "latch8_device::bit6_q_r": method_latch8_device__bit6_q_r,
    "latch8_device::bit7_q_r": method_latch8_device__bit7_q_r
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
