// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './pit8253.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    offset = ((offset) & (3));
    0;
    if (((Number(offset) === Number(3)) ? 1 : 0)) {
      return ((0) & 0xff);
    } else {
      return ((((runtime.dereference(h_m_counter[offset])).read?.() ?? runtime.container(h_m_counter[offset], "read"))) & 0xff);
    }
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    offset = ((offset) & (3));
    0;
    if (((Number(offset) === Number(3)) ? 1 : 0)) {
      let timer: any = ((((runtime.shiftRight(data, 6)) & (3))) | 0);
      if (((Number(timer) === Number(3)) ? 1 : 0)) {
        method_readback_command(runtime, data);
      } else {
        ((runtime.dereference(h_m_counter[timer])).control_w?.(data) ?? 0);
      }
    } else {
      ((runtime.dereference(h_m_counter[offset])).count_w?.(data) ?? 0);
    }
  }

  function method_readback_command(runtime: any, data: any): any {
    const members = runtime.members;


  }

  function method_write_gate0(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[0])).gate_w?.(state) ?? 0);
  }

  function method_write_gate1(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[1])).gate_w?.(state) ?? 0);
  }

  function method_write_gate2(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[2])).gate_w?.(state) ?? 0);
  }

  function method_write_clk0(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[0])).set_clock_signal?.(state) ?? 0);
  }

  function method_write_clk1(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[1])).set_clock_signal?.(state) ?? 0);
  }

  function method_write_clk2(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[2])).set_clock_signal?.(state) ?? 0);
  }

  function method_pit8253_device__write_gate0(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[0])).gate_w?.(state) ?? 0);
  }

  function method_pit8253_device__write_gate1(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[1])).gate_w?.(state) ?? 0);
  }

  function method_pit8253_device__write_gate2(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[2])).gate_w?.(state) ?? 0);
  }

  function method_pit8253_device__write_clk0(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[0])).set_clock_signal?.(state) ?? 0);
  }

  function method_pit8253_device__write_clk1(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[1])).set_clock_signal?.(state) ?? 0);
  }

  function method_pit8253_device__write_clk2(runtime: any, state: any): any {
    const members = runtime.members;

    const h_m_counter = members.m_counter ?? 0;
    ((runtime.dereference(h_m_counter[2])).set_clock_signal?.(state) ?? 0);
  }
  return {
    "read": method_read,
    "write": method_write,
    "readback_command": method_readback_command,
    "write_gate0": method_write_gate0,
    "write_gate1": method_write_gate1,
    "write_gate2": method_write_gate2,
    "write_clk0": method_write_clk0,
    "write_clk1": method_write_clk1,
    "write_clk2": method_write_clk2,
    "pit8253_device::write_gate0": method_pit8253_device__write_gate0,
    "pit8253_device::write_gate1": method_pit8253_device__write_gate1,
    "pit8253_device::write_gate2": method_pit8253_device__write_gate2,
    "pit8253_device::write_clk0": method_pit8253_device__write_clk0,
    "pit8253_device::write_clk1": method_pit8253_device__write_clk1,
    "pit8253_device::write_clk2": method_pit8253_device__write_clk2
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
