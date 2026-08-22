// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './i8257.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_device_reset(runtime: any) {
    const members = runtime.members;
    members.m_state = ((0) | 0);
    members.m_transfer_mode = ((0) & 0xff);
    members.m_status = ((0) & 0xff);
    members.m_msb = ((0) | 0);
    members.m_current_channel = (((-1)) | 0);
    members.m_last_channel = ((3) | 0);
    members.m_hreq = (((-1)) | 0);
    members.m_tc = ((0) ? 1 : 0);
    for (let channel: any = 0; ((Number(channel) < Number(4)) ? 1 : 0); channel = ((channel) + (1))) {
      members.m_channel[channel].m_address = 0;
      members.m_channel[channel].m_count = 0;
      members.m_channel[channel].m_mode = 0;
    }
    method_set_hreq(runtime, 0);
    method_set_dack(runtime);
  }

  function method_set_hreq(runtime: any, state: any) {
    const members = runtime.members;
    (runtime.calls["TRACE_NOOP"]?.() ?? 0);
    if (((Number(members.m_hreq) !== Number(state)) ? 1 : 0)) {
      runtime.invoke("m_out_hrq_cb", state);
      members.m_hreq = ((state) | 0);
      (runtime.calls["abort_timeslice"]?.() ?? 0);
    }
  }

  function method_set_dack(runtime: any) {
    const members = runtime.members;
    (runtime.calls["TRACE_NOOP"]?.() ?? 0);
    for (let ch: any = 0; ((Number(ch) < Number(4)) ? 1 : 0); ch = ((ch) + (1))) {
      members.m_out_dack_cb[ch](((Number(members.m_current_channel) !== Number(ch)) ? 1 : 0));
    }
  }

  function method_execute_run(runtime: any) {
    const members = runtime.members;
    do {
      switch (members.m_state) {
        case 0:
          method_set_tc(runtime, 0);
          if (method_next_channel(runtime)) {
            members.m_state = ((1) | 0);
          } else {
            members.m_icount = ((0) | 0);
          }
          break;
        case 1:
          method_set_hreq(runtime, 1);
          if (members.m_hack) {
            members.m_state = ((2) | 0);
          } else {
            members.m_icount = ((0) | 0);
          }
          break;
        case 2:
          method_set_tc(runtime, 0);
          members.m_state = ((3) | 0);
          break;
        case 3:
          method_set_dack(runtime);
          members.m_state = ((4) | 0);
          break;
        case 4:
          method_dma_read(runtime);
          if ((((members.m_transfer_mode) >>> (5)) & 1)) {
            method_dma_write(runtime);
          }
          if (members.m_ready) {
            members.m_state = ((6) | 0);
            if ((((((Number(members.m_channel[members.m_current_channel].m_count) === Number(0)) ? 1 : 0)) && (((Number(members.m_channel[members.m_current_channel].m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
              method_set_tc(runtime, 1);
            }
          } else {
            members.m_state = ((5) | 0);
          }
          break;
        case 5:
          if (members.m_ready) {
            members.m_state = ((6) | 0);
            if ((((((Number(members.m_channel[members.m_current_channel].m_count) === Number(0)) ? 1 : 0)) && (((Number(members.m_channel[members.m_current_channel].m_mode) !== Number(2)) ? 1 : 0))) ? 1 : 0)) {
              method_set_tc(runtime, 1);
            }
          }
          break;
        case 6:
          if ((((((members.m_transfer_mode) >>> (5)) & 1)) ? 0 : 1)) {
            method_dma_write(runtime);
          }
          if ((((((Number(members.m_channel[members.m_current_channel].m_count) === Number(0)) ? 1 : 0)) && (((Number(members.m_channel[members.m_current_channel].m_mode) === Number(2)) ? 1 : 0))) ? 1 : 0)) {
            method_set_tc(runtime, 1);
          }
          method_advance(runtime);
          if ((((members.m_hack) && (method_next_channel(runtime))) ? 1 : 0)) {
            members.m_state = ((2) | 0);
          } else {
            method_set_hreq(runtime, 0);
            members.m_current_channel = (((-1)) | 0);
            members.m_state = ((0) | 0);
            method_set_dack(runtime);
          }
          break;
      }
      members.m_icount = ((((members.m_icount) - (1))) | 0);
    } while (((Number(members.m_icount) > Number(0)) ? 1 : 0));
  }

  function method_set_tc(runtime: any, state: any) {
    const members = runtime.members;
    (runtime.calls["TRACE_NOOP"]?.() ?? 0);
    if (((Number(members.m_tc) !== Number(state)) ? 1 : 0)) {
      runtime.invoke("m_out_tc_cb", state);
      members.m_tc = ((state) ? 1 : 0);
    }
  }

  function method_next_channel(runtime: any) {
    const members = runtime.members;
    for (let step: any = 0; ((Number(step) < Number(4)) ? 1 : 0); step = ((step) + (1))) {
      let channel: any = (((((members.m_transfer_mode) >>> (4)) & 1)) ? (((((((members.m_last_channel) + (step))) + (1))) & (3))) : (step));
      if (method_is_request_active(runtime, channel)) {
        members.m_current_channel = ((channel) | 0);
        members.m_last_channel = ((channel) | 0);
        return 1;
      }
    }
    return 0;
  }

  function method_is_request_active(runtime: any, channel: any) {
    const members = runtime.members;
    return ((((((members.m_request) >>> (channel)) & 1)) && ((((members.m_transfer_mode) >>> (channel)) & 1))) ? 1 : 0);
  }

  function method_dma_read(runtime: any) {
    const members = runtime.members;
    let offset: any = members.m_channel[members.m_current_channel].m_address;
    switch (members.m_channel[members.m_current_channel].m_mode) {
      case 0:
        break;
      case 1:
        members.m_temp = ((members.m_in_ior_cb[members.m_current_channel](offset)) & 0xff);
        break;
      case 2:
        members.m_temp = ((runtime.invoke("m_in_memr_cb", offset)) & 0xff);
        break;
    }
  }

  function method_dma_write(runtime: any) {
    const members = runtime.members;
    let offset: any = members.m_channel[members.m_current_channel].m_address;
    switch (members.m_channel[members.m_current_channel].m_mode) {
      case 0:
        members.m_verify_cb[members.m_current_channel](offset);
        break;
      case 1:
        runtime.invoke("m_out_memw_cb", offset, members.m_temp);
        break;
      case 2:
        members.m_out_iow_cb[members.m_current_channel](offset, members.m_temp);
        break;
    }
  }

  function method_advance(runtime: any) {
    const members = runtime.members;
    let tc: any = ((members.m_tc) ? 1 : 0);
    let al: any = ((((((((members.m_transfer_mode) >>> (7)) & 1)) && (((Number(members.m_current_channel) === Number(2)) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
    method_set_tc(runtime, 0);
    if (tc) {
      members.m_status = ((((members.m_status) | (((1) << (members.m_current_channel))))) & 0xff);
      if (al) {
        members.m_channel[2].m_address = members.m_channel[3].m_address;
        members.m_channel[2].m_count = members.m_channel[3].m_count;
        members.m_channel[2].m_mode = members.m_channel[3].m_mode;
      } else {
        if ((((members.m_transfer_mode) >>> (6)) & 1)) {
          members.m_transfer_mode = ((((members.m_transfer_mode) & ((~((1) << (members.m_current_channel)))))) & 0xff);
        }
      }
    }
    if ((((((al) && (tc)) ? 1 : 0)) ? 0 : 1)) {
      members.m_channel[members.m_current_channel].m_count = ((members.m_channel[members.m_current_channel].m_count) - (1));
      members.m_channel[members.m_current_channel].m_count = ((members.m_channel[members.m_current_channel].m_count) & (16383));
      members.m_channel[members.m_current_channel].m_address = ((members.m_channel[members.m_current_channel].m_address) + (1));
    }
  }
  return {
    "device_reset": method_device_reset,
    "set_hreq": method_set_hreq,
    "set_dack": method_set_dack,
    "execute_run": method_execute_run,
    "set_tc": method_set_tc,
    "next_channel": method_next_channel,
    "is_request_active": method_is_request_active,
    "dma_read": method_dma_read,
    "dma_write": method_dma_write,
    "advance": method_advance
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
