// GENERATED executable machine composition from src/mame/coleco/coleco.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import type { BoardConfig, BoardSinks, InputPorts, Regions } from '../../../../runtime/core/types.js';
import type { GeneratedCompiledHandler } from '../../../../runtime/ir/board.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };

// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'coleco');

// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
  ...(() => {
    const methods = (() => {


  function method_cart_r(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return (__l["m_cart.read"] ?? runtime.memberCall(members.m_cart, "read", 0, undefined))(offset, 0, 0, 0, 0);
  }

  function method_cart_w(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cart.write"] ?? runtime.memberCall(members.m_cart, "write", 0, undefined))(offset, data, 0, 0, 0, 0);
  }

  function method_paddle_off_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_joy_mode = ((0) | 0);
  }

  function method_paddle_on_w(runtime: any, data: any): any {
    const members = runtime.members;

    members.m_joy_mode = ((1) | 0);
  }

  function method_coleco_paddle_read(runtime: any, port: any, joy_mode: any, joy_status: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let ctrl_sel: any = (((__l["m_ctrlsel.read_safe"] ?? runtime.memberCall(members.m_ctrlsel, "read_safe", 0, __l["read_safe"]))(0)) & 0xff);
    let ctrl_extra: any = ((((ctrl_sel) & (128))) & 0xff);
    ctrl_sel = ((((runtime.shiftRight(ctrl_sel, ((port) * (4)))) & (7))) & 0xff);
    if (((Number(joy_mode) === Number(0)) ? 1 : 0)) {
      let data: any = ((15) & 0xff);
      let ipt: any = ((65535) & 0xffff);
      if (((Number(ctrl_sel) === Number(0)) ? 1 : 0)) {
        ipt = ((((port) ? ((__l["m_std_keypad2.read"] ?? runtime.memberCall(members.m_std_keypad2, "read", 0, __l["read"]))()) : ((__l["m_std_keypad1.read"] ?? runtime.memberCall(members.m_std_keypad1, "read", 0, __l["read"]))()))) & 0xffff);
      } else {
        if (((Number(ctrl_sel) === Number(2)) ? 1 : 0)) {
          ipt = ((((port) ? ((__l["m_sac_keypad2.read"] ?? runtime.memberCall(members.m_sac_keypad2, "read", 0, __l["read"]))()) : ((__l["m_sac_keypad1.read"] ?? runtime.memberCall(members.m_sac_keypad1, "read", 0, __l["read"]))()))) & 0xffff);
        }
      }
      if (((((ipt) & (1))) ? 0 : 1)) {
        data = ((((data) & (10))) & 0xff);
      }
      if (((((ipt) & (2))) ? 0 : 1)) {
        data = ((((data) & (13))) & 0xff);
      }
      if (((((ipt) & (4))) ? 0 : 1)) {
        data = ((((data) & (7))) & 0xff);
      }
      if (((((ipt) & (8))) ? 0 : 1)) {
        data = ((((data) & (12))) & 0xff);
      }
      if (((((ipt) & (16))) ? 0 : 1)) {
        data = ((((data) & (2))) & 0xff);
      }
      if (((((ipt) & (32))) ? 0 : 1)) {
        data = ((((data) & (3))) & 0xff);
      }
      if (((((ipt) & (64))) ? 0 : 1)) {
        data = ((((data) & (14))) & 0xff);
      }
      if (((((ipt) & (128))) ? 0 : 1)) {
        data = ((((data) & (5))) & 0xff);
      }
      if (((((ipt) & (256))) ? 0 : 1)) {
        data = ((((data) & (1))) & 0xff);
      }
      if (((((ipt) & (512))) ? 0 : 1)) {
        data = ((((data) & (11))) & 0xff);
      }
      if (((((ipt) & (1024))) ? 0 : 1)) {
        data = ((((data) & (6))) & 0xff);
      }
      if (((((ipt) & (2048))) ? 0 : 1)) {
        data = ((((data) & (9))) & 0xff);
      }
      if (((((ipt) & (4096))) ? 0 : 1)) {
        data = ((((data) & (4))) & 0xff);
      }
      if (((((ipt) & (8192))) ? 0 : 1)) {
        data = ((((data) & (8))) & 0xff);
      }
      return ((((runtime.shiftRight(((ipt) & (16384)), 8)) | (48))) | (data));
    } else {
      let data: any = ((127) & 0xff);
      if (((Number(ctrl_sel) === Number(0)) ? 1 : 0)) {
        data = ((((port) ? ((__l["m_std_joy2.read"] ?? runtime.memberCall(members.m_std_joy2, "read", 0, __l["read"]))()) : ((__l["m_std_joy1.read"] ?? runtime.memberCall(members.m_std_joy1, "read", 0, __l["read"]))()))) & 0xff);
      } else {
        if (((Number(ctrl_sel) === Number(2)) ? 1 : 0)) {
          data = ((((port) ? ((__l["m_sac_joy2.read"] ?? runtime.memberCall(members.m_sac_joy2, "read", 0, __l["read"]))()) : ((__l["m_sac_joy1.read"] ?? runtime.memberCall(members.m_sac_joy1, "read", 0, __l["read"]))()))) & 0xff);
        } else {
          if (((Number(ctrl_sel) === Number(3)) ? 1 : 0)) {
            data = ((((port) ? ((__l["m_driv_pedal2.read"] ?? runtime.memberCall(members.m_driv_pedal2, "read", 0, __l["read"]))()) : ((__l["m_driv_pedal1.read"] ?? runtime.memberCall(members.m_driv_pedal1, "read", 0, __l["read"]))()))) & 0xff);
          }
        }
      }
      if (((((((ctrl_extra) || (((Number(ctrl_sel) === Number(2)) ? 1 : 0))) ? 1 : 0)) || (((Number(ctrl_sel) === Number(3)) ? 1 : 0))) ? 1 : 0)) {
        if (((joy_status) & (128))) {
          data = ((((data) ^ (48))) & 0xff);
        } else {
          if (joy_status) {
            data = ((((data) ^ (16))) & 0xff);
          }
        }
      }
      return ((data) & (127));
    }
  }
  return {
    "cart_r": method_cart_r,
    "cart_w": method_cart_w,
    "paddle_off_w": method_paddle_off_w,
    "paddle_on_w": method_paddle_on_w,
    "coleco_paddle_read": method_coleco_paddle_read
  };
})();
    return {
      "coleco_state.cart_r": methods["cart_r"],
      "coleco_state.cart_w": methods["cart_w"],
      "coleco_state.paddle_off_w": methods["paddle_off_w"],
      "coleco_state.paddle_on_w": methods["paddle_on_w"],
      "coleco_state.coleco_paddle_read": methods["coleco_paddle_read"],
    };
  })(),
} as Record<string, GeneratedCompiledHandler>;
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_cart.read","m_cart.write","m_ctrlsel.read_safe","m_driv_pedal1.read","m_driv_pedal2.read","m_sac_joy1.read","m_sac_joy2.read","m_sac_keypad1.read","m_sac_keypad2.read","m_std_joy1.read","m_std_joy2.read","m_std_keypad1.read","m_std_keypad2.read","read","read_safe"];
export default {
  machine: defined,
  createBoard: (
    config: BoardConfig,
    regions: Regions,
    inputs: InputPorts,
    sinks: BoardSinks,
  ) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
