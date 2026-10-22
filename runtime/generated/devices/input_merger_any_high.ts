// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './input_merger_any_high.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {


  function method_in_w_0(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 0)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (1))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_1(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 1)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (2))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_2(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 2)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (4))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_3(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 3)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (8))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_4(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 4)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (16))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_5(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 5)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (32))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_6(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 6)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (64))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_7(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 7)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (128))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_8(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 8)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (256))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_9(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 9)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (512))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_10(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 10)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (1024))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_11(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 11)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (2048))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_12(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 12)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (4096))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_13(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 13)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (8192))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_14(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 14)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (16384))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_15(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 15)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (32768))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_16(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 16)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (65536))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_17(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 17)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (131072))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_18(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 18)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (262144))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_19(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 19)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (524288))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_20(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 20)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (1048576))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_21(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 21)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (2097152))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_22(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 22)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (4194304))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_23(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 23)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (8388608))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_24(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 24)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (16777216))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_25(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 25)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (33554432))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_26(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 26)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (67108864))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_27(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 27)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (134217728))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_28(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 28)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (268435456))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_29(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 29)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (536870912))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_30(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 30)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (1073741824))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }

  function method_in_w_31(runtime: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number(((runtime.shiftRight((members.m_state ?? 0), 31)) & (1))) !== Number(((state) ? (1) : (0)))) ? 1 : 0)) {
      members.m_state = ((((members.m_state) ^ (2147483648))) >>> 0);
      (__l["m_output_handler"] ? __l["m_output_handler"](Number(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0)))) : typeof members.m_output_handler === 'function' ? members.m_output_handler(((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))) : runtime.invoke("m_output_handler", ((((Number((((members.m_state ?? 0)) ^ (0))) !== Number(0)) ? 1 : 0)) ? (1) : (0))));
    }
  }
  return {
    "in_w_0": method_in_w_0,
    "in_w_1": method_in_w_1,
    "in_w_2": method_in_w_2,
    "in_w_3": method_in_w_3,
    "in_w_4": method_in_w_4,
    "in_w_5": method_in_w_5,
    "in_w_6": method_in_w_6,
    "in_w_7": method_in_w_7,
    "in_w_8": method_in_w_8,
    "in_w_9": method_in_w_9,
    "in_w_10": method_in_w_10,
    "in_w_11": method_in_w_11,
    "in_w_12": method_in_w_12,
    "in_w_13": method_in_w_13,
    "in_w_14": method_in_w_14,
    "in_w_15": method_in_w_15,
    "in_w_16": method_in_w_16,
    "in_w_17": method_in_w_17,
    "in_w_18": method_in_w_18,
    "in_w_19": method_in_w_19,
    "in_w_20": method_in_w_20,
    "in_w_21": method_in_w_21,
    "in_w_22": method_in_w_22,
    "in_w_23": method_in_w_23,
    "in_w_24": method_in_w_24,
    "in_w_25": method_in_w_25,
    "in_w_26": method_in_w_26,
    "in_w_27": method_in_w_27,
    "in_w_28": method_in_w_28,
    "in_w_29": method_in_w_29,
    "in_w_30": method_in_w_30,
    "in_w_31": method_in_w_31
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["m_output_handler"];

export const device = definition;
export default device;
