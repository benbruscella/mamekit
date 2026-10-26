// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './ls157.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_a0_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_a_bit(runtime, 0, state);
  }

  function method_write_a_bit(runtime: any, bit: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((((members.m_a ?? 0)) >>> (bit)) & 1)) !== Number(state)) ? 1 : 0)) {
      if (state) {
        members.m_a = ((((members.m_a) | (((1) << (bit))))) & 0xff);
      } else {
        members.m_a = ((((members.m_a) & ((~((1) << (bit)))))) & 0xff);
      }
      if ((((((((((members.m_strobe ?? 0)) ? 0 : 1)) && ((((members.m_select ?? 0)) ? 0 : 1))) ? 1 : 0)) && ((((typeof (runtime.dereference(members.m_out_cb)).isunset === 'function' ? (runtime.dereference(members.m_out_cb)).isunset() : typeof (runtime.dereference(members.m_out_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out_cb)).isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
        (__l["m_out_cb"] ? __l["m_out_cb"](Number((members.m_a ?? 0))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((members.m_a ?? 0)) : runtime.invoke("m_out_cb", (members.m_a ?? 0)));
      }
    }
  }

  function method_a1_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_a_bit(runtime, 1, state);
  }

  function method_a2_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_a_bit(runtime, 2, state);
  }

  function method_a3_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_a_bit(runtime, 3, state);
  }

  function method_b0_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_b_bit(runtime, 0, state);
  }

  function method_write_b_bit(runtime: any, bit: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((((members.m_b ?? 0)) >>> (bit)) & 1)) !== Number(state)) ? 1 : 0)) {
      if (state) {
        members.m_b = ((((members.m_b) | (((1) << (bit))))) & 0xff);
      } else {
        members.m_b = ((((members.m_b) & ((~((1) << (bit)))))) & 0xff);
      }
      if ((((((((((members.m_strobe ?? 0)) ? 0 : 1)) && ((members.m_select ?? 0))) ? 1 : 0)) && ((((typeof (runtime.dereference(members.m_out_cb)).isunset === 'function' ? (runtime.dereference(members.m_out_cb)).isunset() : typeof (runtime.dereference(members.m_out_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out_cb)).isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
        (__l["m_out_cb"] ? __l["m_out_cb"](Number((members.m_b ?? 0))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((members.m_b ?? 0)) : runtime.invoke("m_out_cb", (members.m_b ?? 0)));
      }
    }
  }

  function method_b1_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_b_bit(runtime, 1, state);
  }

  function method_b2_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_b_bit(runtime, 2, state);
  }

  function method_b3_w(runtime: any, state: any): any {
    const members = runtime.members;

    method_write_b_bit(runtime, 3, state);
  }

  function method_select_w(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number((members.m_select ?? 0)) !== Number(((state) ? 1 : 0))) ? 1 : 0)) {
      members.m_select = ((((state) ? 1 : 0)) ? 1 : 0);
      method_update_output(runtime);
    }
  }

  function method_update_output(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_data_mask = members.m_data_mask ?? 0;
    if (((((((members.m_strobe ?? 0)) ? 0 : 1)) && ((((typeof (runtime.dereference(members.m_out_cb)).isunset === 'function' ? (runtime.dereference(members.m_out_cb)).isunset() : typeof (runtime.dereference(members.m_out_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out_cb)).isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
      if ((members.m_select ?? 0)) {
        (__l["m_out_cb"] ? __l["m_out_cb"](Number((((typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_b_in_cb)).isunset() : typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_b_in_cb)).isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__l["m_b_in_cb"] ? __l["m_b_in_cb"]() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask)))))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((((typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_b_in_cb)).isunset() : typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_b_in_cb)).isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__l["m_b_in_cb"] ? __l["m_b_in_cb"]() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask))))) : runtime.invoke("m_out_cb", (((typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_b_in_cb)).isunset() : typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_b_in_cb)).isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__l["m_b_in_cb"] ? __l["m_b_in_cb"]() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask))))));
      } else {
        (__l["m_out_cb"] ? __l["m_out_cb"](Number((((typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_a_in_cb)).isunset() : typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_a_in_cb)).isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__l["m_a_in_cb"] ? __l["m_a_in_cb"]() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask)))))) : typeof members.m_out_cb === 'function' ? members.m_out_cb((((typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_a_in_cb)).isunset() : typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_a_in_cb)).isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__l["m_a_in_cb"] ? __l["m_a_in_cb"]() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask))))) : runtime.invoke("m_out_cb", (((typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_a_in_cb)).isunset() : typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_a_in_cb)).isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__l["m_a_in_cb"] ? __l["m_a_in_cb"]() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask))))));
      }
    }
  }

  function method_strobe_w(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((members.m_strobe ?? 0)) !== Number(((state) ? 1 : 0))) ? 1 : 0)) {
      members.m_strobe = ((((state) ? 1 : 0)) ? 1 : 0);
      if (((((members.m_strobe ?? 0)) && ((((typeof (runtime.dereference(members.m_out_cb)).isunset === 'function' ? (runtime.dereference(members.m_out_cb)).isunset() : typeof (runtime.dereference(members.m_out_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out_cb)).isunset : runtime.container(members.m_out_cb, "isunset"))) ? 0 : 1))) ? 1 : 0)) {
        (__l["m_out_cb"] ? __l["m_out_cb"](Number(0)) : typeof members.m_out_cb === 'function' ? members.m_out_cb(0) : runtime.invoke("m_out_cb", 0));
      } else {
        method_update_output(runtime);
      }
    }
  }

  function method_output_r(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_data_mask = members.m_data_mask ?? 0;
    if ((members.m_strobe ?? 0)) {
      return ((0) & 0xff);
    } else {
      if ((members.m_select ?? 0)) {
        return (((((typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_b_in_cb)).isunset() : typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_b_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_b_in_cb)).isunset : runtime.container(members.m_b_in_cb, "isunset"))) ? ((members.m_b ?? 0)) : ((((__l["m_b_in_cb"] ? __l["m_b_in_cb"]() : typeof members.m_b_in_cb === 'function' ? members.m_b_in_cb() : runtime.invoke("m_b_in_cb"))) & (h_m_data_mask))))) & 0xff);
      } else {
        return (((((typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'function' ? (runtime.dereference(members.m_a_in_cb)).isunset() : typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_a_in_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_a_in_cb)).isunset : runtime.container(members.m_a_in_cb, "isunset"))) ? ((members.m_a ?? 0)) : ((((__l["m_a_in_cb"] ? __l["m_a_in_cb"]() : typeof members.m_a_in_cb === 'function' ? members.m_a_in_cb() : runtime.invoke("m_a_in_cb"))) & (h_m_data_mask))))) & 0xff);
      }
    }
  }

  function method_a_in_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_a_in_cb)).bind === 'function' ? (runtime.dereference(members.m_a_in_cb)).bind() : typeof (runtime.dereference(members.m_a_in_cb)).bind === 'number' || typeof (runtime.dereference(members.m_a_in_cb)).bind === 'boolean' ? (runtime.dereference(members.m_a_in_cb)).bind : runtime.container(members.m_a_in_cb, "bind"));
  }

  function method_b_in_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_b_in_cb)).bind === 'function' ? (runtime.dereference(members.m_b_in_cb)).bind() : typeof (runtime.dereference(members.m_b_in_cb)).bind === 'number' || typeof (runtime.dereference(members.m_b_in_cb)).bind === 'boolean' ? (runtime.dereference(members.m_b_in_cb)).bind : runtime.container(members.m_b_in_cb, "bind"));
  }

  function method_out_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_cb)).bind === 'function' ? (runtime.dereference(members.m_out_cb)).bind() : typeof (runtime.dereference(members.m_out_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_cb)).bind : runtime.container(members.m_out_cb, "bind"));
  }

  function method_ls157_device__a_in_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_a_in_cb)).bind === 'function' ? (runtime.dereference(members.m_a_in_cb)).bind() : typeof (runtime.dereference(members.m_a_in_cb)).bind === 'number' || typeof (runtime.dereference(members.m_a_in_cb)).bind === 'boolean' ? (runtime.dereference(members.m_a_in_cb)).bind : runtime.container(members.m_a_in_cb, "bind"));
  }

  function method_ls157_device__b_in_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_b_in_cb)).bind === 'function' ? (runtime.dereference(members.m_b_in_cb)).bind() : typeof (runtime.dereference(members.m_b_in_cb)).bind === 'number' || typeof (runtime.dereference(members.m_b_in_cb)).bind === 'boolean' ? (runtime.dereference(members.m_b_in_cb)).bind : runtime.container(members.m_b_in_cb, "bind"));
  }

  function method_ls157_device__out_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_cb)).bind === 'function' ? (runtime.dereference(members.m_out_cb)).bind() : typeof (runtime.dereference(members.m_out_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_cb)).bind : runtime.container(members.m_out_cb, "bind"));
  }
  return {
    "a0_w": method_a0_w,
    "write_a_bit": method_write_a_bit,
    "a1_w": method_a1_w,
    "a2_w": method_a2_w,
    "a3_w": method_a3_w,
    "b0_w": method_b0_w,
    "write_b_bit": method_write_b_bit,
    "b1_w": method_b1_w,
    "b2_w": method_b2_w,
    "b3_w": method_b3_w,
    "select_w": method_select_w,
    "update_output": method_update_output,
    "strobe_w": method_strobe_w,
    "output_r": method_output_r,
    "a_in_callback": method_a_in_callback,
    "b_in_callback": method_b_in_callback,
    "out_callback": method_out_callback,
    "ls157_device::a_in_callback": method_ls157_device__a_in_callback,
    "ls157_device::b_in_callback": method_ls157_device__b_in_callback,
    "ls157_device::out_callback": method_ls157_device__out_callback
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_a_in_cb","m_b_in_cb","m_out_cb"];

export const device = definition;
export default device;
