// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './pet_user_port.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {

  function method_device_config_complete(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    members.m_card = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
  }

  function method_device_start(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_3_handler"] ? __l["m_3_handler"](Number(1)) : typeof members.m_3_handler === 'function' ? members.m_3_handler(1) : runtime.invoke("m_3_handler", 1));
    (__l["m_4_handler"] ? __l["m_4_handler"](Number(1)) : typeof members.m_4_handler === 'function' ? members.m_4_handler(1) : runtime.invoke("m_4_handler", 1));
    (__l["m_5_handler"] ? __l["m_5_handler"](Number(1)) : typeof members.m_5_handler === 'function' ? members.m_5_handler(1) : runtime.invoke("m_5_handler", 1));
    (__l["m_6_handler"] ? __l["m_6_handler"](Number(1)) : typeof members.m_6_handler === 'function' ? members.m_6_handler(1) : runtime.invoke("m_6_handler", 1));
    (__l["m_7_handler"] ? __l["m_7_handler"](Number(1)) : typeof members.m_7_handler === 'function' ? members.m_7_handler(1) : runtime.invoke("m_7_handler", 1));
    (__l["m_8_handler"] ? __l["m_8_handler"](Number(1)) : typeof members.m_8_handler === 'function' ? members.m_8_handler(1) : runtime.invoke("m_8_handler", 1));
    (__l["m_9_handler"] ? __l["m_9_handler"](Number(1)) : typeof members.m_9_handler === 'function' ? members.m_9_handler(1) : runtime.invoke("m_9_handler", 1));
    (__l["m_b_handler"] ? __l["m_b_handler"](Number(1)) : typeof members.m_b_handler === 'function' ? members.m_b_handler(1) : runtime.invoke("m_b_handler", 1));
    (__l["m_c_handler"] ? __l["m_c_handler"](Number(1)) : typeof members.m_c_handler === 'function' ? members.m_c_handler(1) : runtime.invoke("m_c_handler", 1));
    (__l["m_d_handler"] ? __l["m_d_handler"](Number(1)) : typeof members.m_d_handler === 'function' ? members.m_d_handler(1) : runtime.invoke("m_d_handler", 1));
    (__l["m_e_handler"] ? __l["m_e_handler"](Number(1)) : typeof members.m_e_handler === 'function' ? members.m_e_handler(1) : runtime.invoke("m_e_handler", 1));
    (__l["m_f_handler"] ? __l["m_f_handler"](Number(1)) : typeof members.m_f_handler === 'function' ? members.m_f_handler(1) : runtime.invoke("m_f_handler", 1));
    (__l["m_h_handler"] ? __l["m_h_handler"](Number(1)) : typeof members.m_h_handler === 'function' ? members.m_h_handler(1) : runtime.invoke("m_h_handler", 1));
    (__l["m_j_handler"] ? __l["m_j_handler"](Number(1)) : typeof members.m_j_handler === 'function' ? members.m_j_handler(1) : runtime.invoke("m_j_handler", 1));
    (__l["m_k_handler"] ? __l["m_k_handler"](Number(1)) : typeof members.m_k_handler === 'function' ? members.m_k_handler(1) : runtime.invoke("m_k_handler", 1));
    (__l["m_l_handler"] ? __l["m_l_handler"](Number(1)) : typeof members.m_l_handler === 'function' ? members.m_l_handler(1) : runtime.invoke("m_l_handler", 1));
    (__l["m_m_handler"] ? __l["m_m_handler"](Number(1)) : typeof members.m_m_handler === 'function' ? members.m_m_handler(1) : runtime.invoke("m_m_handler", 1));
  }

  function method_write_2(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_2?.(state) ?? 0);
    }
  }

  function method_write_3(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_3?.(state) ?? 0);
    }
  }

  function method_write_4(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_4?.(state) ?? 0);
    }
  }

  function method_write_5(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_5?.(state) ?? 0);
    }
  }

  function method_write_6(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_6?.(state) ?? 0);
    }
  }

  function method_write_7(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_7?.(state) ?? 0);
    }
  }

  function method_write_8(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_8?.(state) ?? 0);
    }
  }

  function method_write_9(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_9?.(state) ?? 0);
    }
  }

  function method_write_10(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_10?.(state) ?? 0);
    }
  }

  function method_write_b(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_b?.(state) ?? 0);
    }
  }

  function method_write_c(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_c?.(state) ?? 0);
    }
  }

  function method_write_d(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_d?.(state) ?? 0);
    }
  }

  function method_write_e(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_e?.(state) ?? 0);
    }
  }

  function method_write_f(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_f?.(state) ?? 0);
    }
  }

  function method_write_h(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_h?.(state) ?? 0);
    }
  }

  function method_write_j(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_j?.(state) ?? 0);
    }
  }

  function method_write_k(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_k?.(state) ?? 0);
    }
  }

  function method_write_l(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_l?.(state) ?? 0);
    }
  }

  function method_write_m(runtime: any, state: any): any {
    const members = runtime.members;

    if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
      ((runtime.dereference(members.m_card)).input_m?.(state) ?? 0);
    }
  }

  function method_pet_user_port_device(runtime: any, mconfig: any, tag: any, owner: any, opts: any, dflt: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
  }

  function method_p2_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_2_handler)).bind === 'function' ? (runtime.dereference(members.m_2_handler)).bind() : typeof (runtime.dereference(members.m_2_handler)).bind === 'number' || typeof (runtime.dereference(members.m_2_handler)).bind === 'boolean' ? (runtime.dereference(members.m_2_handler)).bind : runtime.container(members.m_2_handler, "bind"));
  }

  function method_p3_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_3_handler)).bind === 'function' ? (runtime.dereference(members.m_3_handler)).bind() : typeof (runtime.dereference(members.m_3_handler)).bind === 'number' || typeof (runtime.dereference(members.m_3_handler)).bind === 'boolean' ? (runtime.dereference(members.m_3_handler)).bind : runtime.container(members.m_3_handler, "bind"));
  }

  function method_p4_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_4_handler)).bind === 'function' ? (runtime.dereference(members.m_4_handler)).bind() : typeof (runtime.dereference(members.m_4_handler)).bind === 'number' || typeof (runtime.dereference(members.m_4_handler)).bind === 'boolean' ? (runtime.dereference(members.m_4_handler)).bind : runtime.container(members.m_4_handler, "bind"));
  }

  function method_p5_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_5_handler)).bind === 'function' ? (runtime.dereference(members.m_5_handler)).bind() : typeof (runtime.dereference(members.m_5_handler)).bind === 'number' || typeof (runtime.dereference(members.m_5_handler)).bind === 'boolean' ? (runtime.dereference(members.m_5_handler)).bind : runtime.container(members.m_5_handler, "bind"));
  }

  function method_p6_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_6_handler)).bind === 'function' ? (runtime.dereference(members.m_6_handler)).bind() : typeof (runtime.dereference(members.m_6_handler)).bind === 'number' || typeof (runtime.dereference(members.m_6_handler)).bind === 'boolean' ? (runtime.dereference(members.m_6_handler)).bind : runtime.container(members.m_6_handler, "bind"));
  }

  function method_p7_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_7_handler)).bind === 'function' ? (runtime.dereference(members.m_7_handler)).bind() : typeof (runtime.dereference(members.m_7_handler)).bind === 'number' || typeof (runtime.dereference(members.m_7_handler)).bind === 'boolean' ? (runtime.dereference(members.m_7_handler)).bind : runtime.container(members.m_7_handler, "bind"));
  }

  function method_p8_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_8_handler)).bind === 'function' ? (runtime.dereference(members.m_8_handler)).bind() : typeof (runtime.dereference(members.m_8_handler)).bind === 'number' || typeof (runtime.dereference(members.m_8_handler)).bind === 'boolean' ? (runtime.dereference(members.m_8_handler)).bind : runtime.container(members.m_8_handler, "bind"));
  }

  function method_p9_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_9_handler)).bind === 'function' ? (runtime.dereference(members.m_9_handler)).bind() : typeof (runtime.dereference(members.m_9_handler)).bind === 'number' || typeof (runtime.dereference(members.m_9_handler)).bind === 'boolean' ? (runtime.dereference(members.m_9_handler)).bind : runtime.container(members.m_9_handler, "bind"));
  }

  function method_p10_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_10_handler)).bind === 'function' ? (runtime.dereference(members.m_10_handler)).bind() : typeof (runtime.dereference(members.m_10_handler)).bind === 'number' || typeof (runtime.dereference(members.m_10_handler)).bind === 'boolean' ? (runtime.dereference(members.m_10_handler)).bind : runtime.container(members.m_10_handler, "bind"));
  }

  function method_pb_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_b_handler)).bind === 'function' ? (runtime.dereference(members.m_b_handler)).bind() : typeof (runtime.dereference(members.m_b_handler)).bind === 'number' || typeof (runtime.dereference(members.m_b_handler)).bind === 'boolean' ? (runtime.dereference(members.m_b_handler)).bind : runtime.container(members.m_b_handler, "bind"));
  }

  function method_pc_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_c_handler)).bind === 'function' ? (runtime.dereference(members.m_c_handler)).bind() : typeof (runtime.dereference(members.m_c_handler)).bind === 'number' || typeof (runtime.dereference(members.m_c_handler)).bind === 'boolean' ? (runtime.dereference(members.m_c_handler)).bind : runtime.container(members.m_c_handler, "bind"));
  }

  function method_pd_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_d_handler)).bind === 'function' ? (runtime.dereference(members.m_d_handler)).bind() : typeof (runtime.dereference(members.m_d_handler)).bind === 'number' || typeof (runtime.dereference(members.m_d_handler)).bind === 'boolean' ? (runtime.dereference(members.m_d_handler)).bind : runtime.container(members.m_d_handler, "bind"));
  }

  function method_pe_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_e_handler)).bind === 'function' ? (runtime.dereference(members.m_e_handler)).bind() : typeof (runtime.dereference(members.m_e_handler)).bind === 'number' || typeof (runtime.dereference(members.m_e_handler)).bind === 'boolean' ? (runtime.dereference(members.m_e_handler)).bind : runtime.container(members.m_e_handler, "bind"));
  }

  function method_pf_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_f_handler)).bind === 'function' ? (runtime.dereference(members.m_f_handler)).bind() : typeof (runtime.dereference(members.m_f_handler)).bind === 'number' || typeof (runtime.dereference(members.m_f_handler)).bind === 'boolean' ? (runtime.dereference(members.m_f_handler)).bind : runtime.container(members.m_f_handler, "bind"));
  }

  function method_ph_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_h_handler)).bind === 'function' ? (runtime.dereference(members.m_h_handler)).bind() : typeof (runtime.dereference(members.m_h_handler)).bind === 'number' || typeof (runtime.dereference(members.m_h_handler)).bind === 'boolean' ? (runtime.dereference(members.m_h_handler)).bind : runtime.container(members.m_h_handler, "bind"));
  }

  function method_pj_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_j_handler)).bind === 'function' ? (runtime.dereference(members.m_j_handler)).bind() : typeof (runtime.dereference(members.m_j_handler)).bind === 'number' || typeof (runtime.dereference(members.m_j_handler)).bind === 'boolean' ? (runtime.dereference(members.m_j_handler)).bind : runtime.container(members.m_j_handler, "bind"));
  }

  function method_pk_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_k_handler)).bind === 'function' ? (runtime.dereference(members.m_k_handler)).bind() : typeof (runtime.dereference(members.m_k_handler)).bind === 'number' || typeof (runtime.dereference(members.m_k_handler)).bind === 'boolean' ? (runtime.dereference(members.m_k_handler)).bind : runtime.container(members.m_k_handler, "bind"));
  }

  function method_pl_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_l_handler)).bind === 'function' ? (runtime.dereference(members.m_l_handler)).bind() : typeof (runtime.dereference(members.m_l_handler)).bind === 'number' || typeof (runtime.dereference(members.m_l_handler)).bind === 'boolean' ? (runtime.dereference(members.m_l_handler)).bind : runtime.container(members.m_l_handler, "bind"));
  }

  function method_pm_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_m_handler)).bind === 'function' ? (runtime.dereference(members.m_m_handler)).bind() : typeof (runtime.dereference(members.m_m_handler)).bind === 'number' || typeof (runtime.dereference(members.m_m_handler)).bind === 'boolean' ? (runtime.dereference(members.m_m_handler)).bind : runtime.container(members.m_m_handler, "bind"));
  }

  function method_pet_user_port_device__pet_user_port_device(runtime: any, mconfig: any, tag: any, owner: any, opts: any, dflt: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
  }

  function method_pet_user_port_device__p2_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_2_handler)).bind === 'function' ? (runtime.dereference(members.m_2_handler)).bind() : typeof (runtime.dereference(members.m_2_handler)).bind === 'number' || typeof (runtime.dereference(members.m_2_handler)).bind === 'boolean' ? (runtime.dereference(members.m_2_handler)).bind : runtime.container(members.m_2_handler, "bind"));
  }

  function method_pet_user_port_device__p3_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_3_handler)).bind === 'function' ? (runtime.dereference(members.m_3_handler)).bind() : typeof (runtime.dereference(members.m_3_handler)).bind === 'number' || typeof (runtime.dereference(members.m_3_handler)).bind === 'boolean' ? (runtime.dereference(members.m_3_handler)).bind : runtime.container(members.m_3_handler, "bind"));
  }

  function method_pet_user_port_device__p4_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_4_handler)).bind === 'function' ? (runtime.dereference(members.m_4_handler)).bind() : typeof (runtime.dereference(members.m_4_handler)).bind === 'number' || typeof (runtime.dereference(members.m_4_handler)).bind === 'boolean' ? (runtime.dereference(members.m_4_handler)).bind : runtime.container(members.m_4_handler, "bind"));
  }

  function method_pet_user_port_device__p5_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_5_handler)).bind === 'function' ? (runtime.dereference(members.m_5_handler)).bind() : typeof (runtime.dereference(members.m_5_handler)).bind === 'number' || typeof (runtime.dereference(members.m_5_handler)).bind === 'boolean' ? (runtime.dereference(members.m_5_handler)).bind : runtime.container(members.m_5_handler, "bind"));
  }

  function method_pet_user_port_device__p6_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_6_handler)).bind === 'function' ? (runtime.dereference(members.m_6_handler)).bind() : typeof (runtime.dereference(members.m_6_handler)).bind === 'number' || typeof (runtime.dereference(members.m_6_handler)).bind === 'boolean' ? (runtime.dereference(members.m_6_handler)).bind : runtime.container(members.m_6_handler, "bind"));
  }

  function method_pet_user_port_device__p7_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_7_handler)).bind === 'function' ? (runtime.dereference(members.m_7_handler)).bind() : typeof (runtime.dereference(members.m_7_handler)).bind === 'number' || typeof (runtime.dereference(members.m_7_handler)).bind === 'boolean' ? (runtime.dereference(members.m_7_handler)).bind : runtime.container(members.m_7_handler, "bind"));
  }

  function method_pet_user_port_device__p8_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_8_handler)).bind === 'function' ? (runtime.dereference(members.m_8_handler)).bind() : typeof (runtime.dereference(members.m_8_handler)).bind === 'number' || typeof (runtime.dereference(members.m_8_handler)).bind === 'boolean' ? (runtime.dereference(members.m_8_handler)).bind : runtime.container(members.m_8_handler, "bind"));
  }

  function method_pet_user_port_device__p9_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_9_handler)).bind === 'function' ? (runtime.dereference(members.m_9_handler)).bind() : typeof (runtime.dereference(members.m_9_handler)).bind === 'number' || typeof (runtime.dereference(members.m_9_handler)).bind === 'boolean' ? (runtime.dereference(members.m_9_handler)).bind : runtime.container(members.m_9_handler, "bind"));
  }

  function method_pet_user_port_device__p10_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_10_handler)).bind === 'function' ? (runtime.dereference(members.m_10_handler)).bind() : typeof (runtime.dereference(members.m_10_handler)).bind === 'number' || typeof (runtime.dereference(members.m_10_handler)).bind === 'boolean' ? (runtime.dereference(members.m_10_handler)).bind : runtime.container(members.m_10_handler, "bind"));
  }

  function method_pet_user_port_device__pb_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_b_handler)).bind === 'function' ? (runtime.dereference(members.m_b_handler)).bind() : typeof (runtime.dereference(members.m_b_handler)).bind === 'number' || typeof (runtime.dereference(members.m_b_handler)).bind === 'boolean' ? (runtime.dereference(members.m_b_handler)).bind : runtime.container(members.m_b_handler, "bind"));
  }

  function method_pet_user_port_device__pc_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_c_handler)).bind === 'function' ? (runtime.dereference(members.m_c_handler)).bind() : typeof (runtime.dereference(members.m_c_handler)).bind === 'number' || typeof (runtime.dereference(members.m_c_handler)).bind === 'boolean' ? (runtime.dereference(members.m_c_handler)).bind : runtime.container(members.m_c_handler, "bind"));
  }

  function method_pet_user_port_device__pd_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_d_handler)).bind === 'function' ? (runtime.dereference(members.m_d_handler)).bind() : typeof (runtime.dereference(members.m_d_handler)).bind === 'number' || typeof (runtime.dereference(members.m_d_handler)).bind === 'boolean' ? (runtime.dereference(members.m_d_handler)).bind : runtime.container(members.m_d_handler, "bind"));
  }

  function method_pet_user_port_device__pe_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_e_handler)).bind === 'function' ? (runtime.dereference(members.m_e_handler)).bind() : typeof (runtime.dereference(members.m_e_handler)).bind === 'number' || typeof (runtime.dereference(members.m_e_handler)).bind === 'boolean' ? (runtime.dereference(members.m_e_handler)).bind : runtime.container(members.m_e_handler, "bind"));
  }

  function method_pet_user_port_device__pf_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_f_handler)).bind === 'function' ? (runtime.dereference(members.m_f_handler)).bind() : typeof (runtime.dereference(members.m_f_handler)).bind === 'number' || typeof (runtime.dereference(members.m_f_handler)).bind === 'boolean' ? (runtime.dereference(members.m_f_handler)).bind : runtime.container(members.m_f_handler, "bind"));
  }

  function method_pet_user_port_device__ph_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_h_handler)).bind === 'function' ? (runtime.dereference(members.m_h_handler)).bind() : typeof (runtime.dereference(members.m_h_handler)).bind === 'number' || typeof (runtime.dereference(members.m_h_handler)).bind === 'boolean' ? (runtime.dereference(members.m_h_handler)).bind : runtime.container(members.m_h_handler, "bind"));
  }

  function method_pet_user_port_device__pj_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_j_handler)).bind === 'function' ? (runtime.dereference(members.m_j_handler)).bind() : typeof (runtime.dereference(members.m_j_handler)).bind === 'number' || typeof (runtime.dereference(members.m_j_handler)).bind === 'boolean' ? (runtime.dereference(members.m_j_handler)).bind : runtime.container(members.m_j_handler, "bind"));
  }

  function method_pet_user_port_device__pk_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_k_handler)).bind === 'function' ? (runtime.dereference(members.m_k_handler)).bind() : typeof (runtime.dereference(members.m_k_handler)).bind === 'number' || typeof (runtime.dereference(members.m_k_handler)).bind === 'boolean' ? (runtime.dereference(members.m_k_handler)).bind : runtime.container(members.m_k_handler, "bind"));
  }

  function method_pet_user_port_device__pl_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_l_handler)).bind === 'function' ? (runtime.dereference(members.m_l_handler)).bind() : typeof (runtime.dereference(members.m_l_handler)).bind === 'number' || typeof (runtime.dereference(members.m_l_handler)).bind === 'boolean' ? (runtime.dereference(members.m_l_handler)).bind : runtime.container(members.m_l_handler, "bind"));
  }

  function method_pet_user_port_device__pm_handler(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_m_handler)).bind === 'function' ? (runtime.dereference(members.m_m_handler)).bind() : typeof (runtime.dereference(members.m_m_handler)).bind === 'number' || typeof (runtime.dereference(members.m_m_handler)).bind === 'boolean' ? (runtime.dereference(members.m_m_handler)).bind : runtime.container(members.m_m_handler, "bind"));
  }
  return {
    "device_config_complete": method_device_config_complete,
    "device_start": method_device_start,
    "write_2": method_write_2,
    "write_3": method_write_3,
    "write_4": method_write_4,
    "write_5": method_write_5,
    "write_6": method_write_6,
    "write_7": method_write_7,
    "write_8": method_write_8,
    "write_9": method_write_9,
    "write_10": method_write_10,
    "write_b": method_write_b,
    "write_c": method_write_c,
    "write_d": method_write_d,
    "write_e": method_write_e,
    "write_f": method_write_f,
    "write_h": method_write_h,
    "write_j": method_write_j,
    "write_k": method_write_k,
    "write_l": method_write_l,
    "write_m": method_write_m,
    "pet_user_port_device": method_pet_user_port_device,
    "p2_handler": method_p2_handler,
    "p3_handler": method_p3_handler,
    "p4_handler": method_p4_handler,
    "p5_handler": method_p5_handler,
    "p6_handler": method_p6_handler,
    "p7_handler": method_p7_handler,
    "p8_handler": method_p8_handler,
    "p9_handler": method_p9_handler,
    "p10_handler": method_p10_handler,
    "pb_handler": method_pb_handler,
    "pc_handler": method_pc_handler,
    "pd_handler": method_pd_handler,
    "pe_handler": method_pe_handler,
    "pf_handler": method_pf_handler,
    "ph_handler": method_ph_handler,
    "pj_handler": method_pj_handler,
    "pk_handler": method_pk_handler,
    "pl_handler": method_pl_handler,
    "pm_handler": method_pm_handler,
    "pet_user_port_device::pet_user_port_device": method_pet_user_port_device__pet_user_port_device,
    "pet_user_port_device::p2_handler": method_pet_user_port_device__p2_handler,
    "pet_user_port_device::p3_handler": method_pet_user_port_device__p3_handler,
    "pet_user_port_device::p4_handler": method_pet_user_port_device__p4_handler,
    "pet_user_port_device::p5_handler": method_pet_user_port_device__p5_handler,
    "pet_user_port_device::p6_handler": method_pet_user_port_device__p6_handler,
    "pet_user_port_device::p7_handler": method_pet_user_port_device__p7_handler,
    "pet_user_port_device::p8_handler": method_pet_user_port_device__p8_handler,
    "pet_user_port_device::p9_handler": method_pet_user_port_device__p9_handler,
    "pet_user_port_device::p10_handler": method_pet_user_port_device__p10_handler,
    "pet_user_port_device::pb_handler": method_pet_user_port_device__pb_handler,
    "pet_user_port_device::pc_handler": method_pet_user_port_device__pc_handler,
    "pet_user_port_device::pd_handler": method_pet_user_port_device__pd_handler,
    "pet_user_port_device::pe_handler": method_pet_user_port_device__pe_handler,
    "pet_user_port_device::pf_handler": method_pet_user_port_device__pf_handler,
    "pet_user_port_device::ph_handler": method_pet_user_port_device__ph_handler,
    "pet_user_port_device::pj_handler": method_pet_user_port_device__pj_handler,
    "pet_user_port_device::pk_handler": method_pet_user_port_device__pk_handler,
    "pet_user_port_device::pl_handler": method_pet_user_port_device__pl_handler,
    "pet_user_port_device::pm_handler": method_pet_user_port_device__pm_handler
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["get_card_device","m_3_handler","m_4_handler","m_5_handler","m_6_handler","m_7_handler","m_8_handler","m_9_handler","m_b_handler","m_c_handler","m_d_handler","m_e_handler","m_f_handler","m_h_handler","m_j_handler","m_k_handler","m_l_handler","m_m_handler","set_options","std::forward"];

export const device = definition;
export default device;
