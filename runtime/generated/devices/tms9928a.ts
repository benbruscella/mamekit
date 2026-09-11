// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './tms9928a.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  const __mame_table_0 = [3, 251, 15, 255, 7, 127, 7, 255];
  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;

    let value: any = ((0) & 0xff);
    if (((Number(((offset) & (1))) === Number(0)) ? 1 : 0)) {
      value = ((method_vram_read(runtime)) & 0xff);
    } else {
      value = ((method_register_read(runtime)) & 0xff);
    }
    return value;
  }

  function method_vram_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((members.m_ReadAhead ?? runtime.member("m_ReadAhead"))) & 0xff);
    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
      return data;
    }
    members.m_ReadAhead = ((((runtime.dereference(members.m_vram_space)).read_byte?.((members.m_Addr ?? runtime.member("m_Addr"))) ?? 0)) & 0xff);
    members.m_Addr = (((((((members.m_Addr ?? runtime.member("m_Addr"))) + (1))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
    members.m_latch = ((0) & 0xff);
    return data;
  }

  function method_register_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((members.m_StatusReg ?? runtime.member("m_StatusReg"))) & 0xff);
    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
      return data;
    }
    members.m_StatusReg = (((members.m_FifthSprite ?? runtime.member("m_FifthSprite"))) & 0xff);
    method_check_interrupt(runtime);
    members.m_latch = ((0) & 0xff);
    return data;
  }

  function method_check_interrupt(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let b: any = ((((((((((members.m_StatusReg ?? runtime.member("m_StatusReg"))) & (128))) && ((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (32)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    if (((Number(b) !== Number((members.m_INT ?? runtime.member("m_INT")))) ? 1 : 0)) {
      members.m_INT = ((b) & 0xff);
      (__l["m_out_int_line_cb"] ? __l["m_out_int_line_cb"](Number((members.m_INT ?? runtime.member("m_INT")))) : typeof members.m_out_int_line_cb === 'function' ? members.m_out_int_line_cb((members.m_INT ?? runtime.member("m_INT"))) : runtime.invoke("m_out_int_line_cb", (members.m_INT ?? runtime.member("m_INT"))));
    }
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    if (((Number(((offset) & (1))) === Number(0)) ? 1 : 0)) {
      method_vram_write(runtime, data);
    } else {
      method_register_write(runtime, data);
    }
  }

  function method_vram_write(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((runtime.dereference(members.m_vram_space)).write_byte?.((members.m_Addr ?? runtime.member("m_Addr")), data) ?? 0);
    if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      members.m_Addr = (((((((members.m_Addr ?? runtime.member("m_Addr"))) + (1))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
      members.m_ReadAhead = ((data) & 0xff);
      members.m_latch = ((0) & 0xff);
    }
  }

  function method_register_write(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((__l["machine().side_effects_disabled"]?.() ?? 0)) {
      return;
    }
    if ((members.m_latch ?? runtime.member("m_latch"))) {
      members.m_Addr = ((((((((data) << (8))) | ((((members.m_Addr ?? runtime.member("m_Addr"))) & (255))))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
      if (((data) & (128))) {
        method_change_register(runtime, ((data) & (7)), (((members.m_Addr ?? runtime.member("m_Addr"))) & (255)));
      } else {
        if (((((data) & (64))) ? 0 : 1)) {
          method_vram_read(runtime);
        }
      }
      members.m_latch = ((0) & 0xff);
    } else {
      members.m_Addr = (((((((((members.m_Addr ?? runtime.member("m_Addr"))) & (65280))) | (data))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
      members.m_latch = ((1) & 0xff);
    }
  }

  function method_change_register(runtime: any, reg: any, val: any): any {
    const members = runtime.members;

    let modes: any = ["Mode 0 (GRAPHIC 1)", "Mode 1 (TEXT 1)", "Mode 2 (GRAPHIC 2)", "Mode 1+2 (TEXT 1 variation)", "Mode 3 (MULTICOLOR)", "Mode 1+3 (BOGUS)", "Mode 2+3 (MULTICOLOR variation)", "Mode 1+2+3 (BOGUS)"];
    let prev: any = (((members.m_Regs ?? runtime.member("m_Regs"))[reg]) & 0xff);
    val = ((runtime.andAssign(val, (__mame_table_0[((reg) & 7)] ?? 0))) & 0xff);
    (members.m_Regs ?? runtime.member("m_Regs"))[reg] = val;
    if (0) {
      0;
    }
    switch (reg) {
      case 0:
      {
        if (((val) & (2))) {
          members.m_colour = (((((((((members.m_Regs ?? runtime.member("m_Regs"))[3]) & (128))) * (64))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
          members.m_pattern = (((((((((members.m_Regs ?? runtime.member("m_Regs"))[4]) & (4))) * (2048))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
          method_update_table_masks(runtime);
        } else {
          members.m_colour = (((((((members.m_Regs ?? runtime.member("m_Regs"))[3]) * (64))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
          members.m_pattern = (((((((members.m_Regs ?? runtime.member("m_Regs"))[4]) * (2048))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
        }
        members.m_mode = ((((((((1) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[0]) & (2))) : (0))) | ((((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (16))) >>> (4))))) | ((((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (8))) >>> (1))))) & 0xff);
        if (((((val) ^ (prev))) & (1))) {
          method_update_backdrop(runtime);
        }
        if (0) {
          0;
        }
        break;
      }
      case 1:
      {
        method_check_interrupt(runtime);
        members.m_mode = ((((((((1) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[0]) & (2))) : (0))) | ((((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (16))) >>> (4))))) | ((((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (8))) >>> (1))))) & 0xff);
        if (0) {
          0;
        }
        break;
      }
      case 2:
      {
        members.m_nametbl = ((((((val) * (1024))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
        break;
      }
      case 3:
      {
        if ((((members.m_Regs ?? runtime.member("m_Regs"))[0]) & (2))) {
          members.m_colour = ((((((((val) & (128))) * (64))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
          method_update_table_masks(runtime);
        } else {
          members.m_colour = ((((((val) * (64))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
        }
        break;
      }
      case 4:
      {
        if ((((members.m_Regs ?? runtime.member("m_Regs"))[0]) & (2))) {
          members.m_pattern = ((((((((val) & (4))) * (2048))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
          method_update_table_masks(runtime);
        } else {
          members.m_pattern = ((((((val) * (2048))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
        }
        break;
      }
      case 5:
      {
        members.m_spriteattribute = ((((((val) * (128))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
        break;
      }
      case 6:
      {
        members.m_spritepattern = ((((((val) * (2048))) & ((((members.m_vram_size ?? runtime.member("m_vram_size"))) - (1))))) & 0xffff);
        break;
      }
      case 7:
      {
        if (((((val) ^ (prev))) & (15))) {
          method_update_backdrop(runtime);
        }
        break;
      }
    }
  }

  function method_update_table_masks(runtime: any): any {
    const members = runtime.members;

    members.m_colourmask = (((((((((members.m_Regs ?? runtime.member("m_Regs"))[3]) & (127))) << (3))) | (7))) | 0);
    members.m_patternmask = (((((((((members.m_Regs ?? runtime.member("m_Regs"))[4]) & (3))) << (8))) | (((1) ? ((((members.m_colourmask ?? runtime.member("m_colourmask"))) & (255))) : (255))))) | 0);
  }

  function method_update_backdrop(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((Number((((members.m_Regs ?? runtime.member("m_Regs"))[7]) & (15))) === Number(0)) ? 1 : 0)) {
      (runtime.palette[0] = (__l["rgb_t"] ? __l["rgb_t"]((((((members.m_Regs ?? runtime.member("m_Regs"))[0]) & (1))) ? (0) : (255)), 0, 0, 0) : runtime.macro("rgb_t", (((((members.m_Regs ?? runtime.member("m_Regs"))[0]) & (1))) ? (0) : (255)), 0, 0, 0)));
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_tmpbmp = members.m_tmpbmp ?? runtime.member("m_tmpbmp");
    (__l["copybitmap"] ? __l["copybitmap"](bitmap, h_m_tmpbmp, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_m_tmpbmp, 0, 0, 0, 0, cliprect));
    return 0;
  }

  function method_clock_grom(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_out_gromclk_cb"] ? __l["m_out_gromclk_cb"](Number(1)) : typeof members.m_out_gromclk_cb === 'function' ? members.m_out_gromclk_cb(1) : runtime.invoke("m_out_gromclk_cb", 1));
    (__l["m_out_gromclk_cb"] ? __l["m_out_gromclk_cb"](Number(0)) : typeof members.m_out_gromclk_cb === 'function' ? members.m_out_gromclk_cb(0) : runtime.invoke("m_out_gromclk_cb", 0));
  }

  function method_update_line(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_tmpbmp = members.m_tmpbmp ?? runtime.member("m_tmpbmp");
    let raw_vpos: any = (((__l["screen().vpos"]?.() ?? 0)) | 0);
    let vpos: any = ((runtime.divide(((raw_vpos) * ((members.m_vertical_size ?? runtime.member("m_vertical_size")))), (__l["screen().height"]?.() ?? 0))) | 0);
    let BackColour: any = (((((members.m_Regs ?? runtime.member("m_Regs"))[7]) & (15))) & 0xffff);
    let p: any = h_m_tmpbmp["pix&"](vpos);
    let y: any = ((((vpos) - ((members.m_top_border ?? runtime.member("m_top_border"))))) | 0);
    if (((((((((Number(y) < Number(0)) ? 1 : 0)) || (((Number(y) >= Number(192)) ? 1 : 0))) ? 1 : 0)) || ((((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (64))) ? 0 : 1))) ? 1 : 0)) {
      for (let i: any = ((0) | 0); ((Number(i) < Number(342)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        runtime.writeIndex(p, i, (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour)));
      }
      if (((Number(y) === Number(193)) ? 1 : 0)) {
        members.m_StatusReg = ((((members.m_StatusReg) | (128))) & 0xff);
        method_check_interrupt(runtime);
      }
    } else {
      for (let i: any = ((0) | 0); ((Number(i) < Number(37)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        runtime.writeIndex(p, i, (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour)));
      }
      switch ((members.m_mode ?? runtime.member("m_mode"))) {
        case 0:
        {
          let addr: any = (((((members.m_nametbl ?? runtime.member("m_nametbl"))) + (((((y) & (248))) << (2))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (8))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0)) & 0xff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? runtime.member("m_pattern"))) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.((((members.m_colour ?? runtime.member("m_colour"))) + (((charcode) >>> (3))))) ?? 0)) & 0xff);
            let fg: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
            }
          }
          break;
        }
        case 1:
        {
          let addr: any = (((((members.m_nametbl ?? runtime.member("m_nametbl"))) + (((((y) >>> (3))) * (40))))) & 0xffff);
          let fg: any = (__l["pen"] ? __l["pen"]((((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", (((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) : (BackColour))));
          let bg: any = (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour));
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 6))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          for (let x: any = ((runtime.add(37, 6)) | 0); ((Number(x) < Number(runtime.add(37, 246))) ? 1 : 0); x = ((((x) + (6))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0)) & 0xffff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? runtime.member("m_pattern"))) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            for (let i: any = ((0) | 0); ((Number(i) < Number(6)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
            }
          }
          for (let x: any = ((runtime.add(37, 246)) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          break;
        }
        case 2:
        {
          let addr: any = (((((members.m_nametbl ?? runtime.member("m_nametbl"))) + (((((y) >>> (3))) * (32))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (8))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((runtime.add(((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0), ((((y) >>> (6))) << (8)))) & 0xffff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? runtime.member("m_pattern"))) + (((((charcode) & ((members.m_patternmask ?? runtime.member("m_patternmask"))))) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_colour ?? runtime.member("m_colour"))) + (((((charcode) & ((members.m_colourmask ?? runtime.member("m_colourmask"))))) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            let fg: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
            }
          }
          break;
        }
        case 3:
        {
          let addr: any = (((((members.m_nametbl ?? runtime.member("m_nametbl"))) + (((((y) >>> (3))) * (40))))) & 0xffff);
          let fg: any = (__l["pen"] ? __l["pen"]((((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", (((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) : (BackColour))));
          let bg: any = (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour));
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 6))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          for (let x: any = ((runtime.add(37, 6)) | 0); ((Number(x) < Number(runtime.add(37, 246))) ? 1 : 0); x = ((((x) + (6))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.add(((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0), ((((y) >>> (6))) << (8)))) & ((members.m_patternmask ?? runtime.member("m_patternmask"))))) & 0xffff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? runtime.member("m_pattern"))) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            for (let i: any = ((0) | 0); ((Number(i) < Number(6)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
            }
          }
          for (let x: any = ((runtime.add(37, 246)) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          break;
        }
        case 4:
        {
          let addr: any = (((((members.m_nametbl ?? runtime.member("m_nametbl"))) + (((((y) >>> (3))) * (32))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (8))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? runtime.member("m_pattern"))) + (((charcode) << (3)))), ((((y) >>> (2))) & (7)))) ?? 0)) & 0xff);
            let fg: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg)))))));
            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), (runtime.writeIndex(p, ((x) + (6)), (runtime.writeIndex(p, ((x) + (7)), bg)))))));
          }
          break;
        }
        case 5:
        case 7:
        {
          let fg: any = (__l["pen"] ? __l["pen"]((((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", (((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) ? ((((members.m_Regs ?? runtime.member("m_Regs"))[7]) >>> (4))) : (BackColour))));
          let bg: any = (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour));
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 6))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          for (let x: any = ((runtime.add(37, 6)) | 0); ((Number(x) < Number(runtime.add(37, 246))) ? 1 : 0); x = ((((x) + (6))) | 0)) {
            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg)))))));
            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), bg)));
          }
          for (let x: any = ((runtime.add(37, 246)) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          break;
        }
        case 6:
        {
          let addr: any = (((((members.m_nametbl ?? runtime.member("m_nametbl"))) + (((((y) >>> (3))) * (32))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(runtime.add(37, 256))) ? 1 : 0); x = ((((x) + (8))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.((((members.m_pattern ?? runtime.member("m_pattern"))) + (((((runtime.add(((charcode) + (((((y) >>> (2))) & (7)))), ((((y) >>> (6))) << (8)))) & ((members.m_patternmask ?? runtime.member("m_patternmask"))))) << (3))))) ?? 0)) & 0xff);
            let fg: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg)))))));
            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), (runtime.writeIndex(p, ((x) + (6)), (runtime.writeIndex(p, ((x) + (7)), bg)))))));
          }
          break;
        }
      }
      if (((Number((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (80))) !== Number(64)) ? 1 : 0)) {
        members.m_FifthSprite = ((31) & 0xff);
      } else {
        let sprite_size: any = (((((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (2))) ? (16) : (8))) & 0xff);
        let sprite_mag: any = (((((members.m_Regs ?? runtime.member("m_Regs"))[1]) & (1))) & 0xff);
        let sprite_height: any = ((((sprite_size) * (((sprite_mag) + (1))))) & 0xff);
        let spr_drawn: any = [0];
        let num_sprites: any = ((0) & 0xff);
        let fifth_encountered: any = ((0) ? 1 : 0);
        for (let sprattr: any = ((0) & 0xffff); ((Number(sprattr) < Number(128)) ? 1 : 0); sprattr = ((((sprattr) + (4))) & 0xffff)) {
          let spr_y: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? runtime.member("m_spriteattribute"))) + (sprattr)), 0)) ?? 0)) | 0);
          members.m_FifthSprite = ((runtime.divide(sprattr, 4)) & 0xff);
          if (((Number(spr_y) === Number(208)) ? 1 : 0)) {
            break;
          }
          if (((Number(spr_y) > Number(224)) ? 1 : 0)) {
            spr_y = ((((spr_y) - (256))) | 0);
          }
          spr_y = ((((spr_y) + (1))) | 0);
          if ((((((Number(spr_y) <= Number(y)) ? 1 : 0)) && (((Number(y) < Number(((spr_y) + (sprite_height)))) ? 1 : 0))) ? 1 : 0)) {
            let spr_x: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? runtime.member("m_spriteattribute"))) + (sprattr)), 1)) ?? 0)) | 0);
            let sprcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? runtime.member("m_spriteattribute"))) + (sprattr)), 2)) ?? 0)) & 0xff);
            let sprcol: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? runtime.member("m_spriteattribute"))) + (sprattr)), 3)) ?? 0)) & 0xff);
            let pataddr: any = (((((members.m_spritepattern ?? runtime.member("m_spritepattern"))) + (((((((Number(sprite_size) === Number(16)) ? 1 : 0)) ? (((sprcode) & (-4))) : (sprcode))) * (8))))) & 0xffff);
            num_sprites = ((((num_sprites) + (1))) & 0xff);
            if (((Number(num_sprites) === Number(5)) ? 1 : 0)) {
              fifth_encountered = ((1) ? 1 : 0);
              break;
            }
            if (sprite_mag) {
              pataddr = ((((pataddr) + (((((((y) - (spr_y))) & (31))) >>> (1))))) & 0xffff);
            } else {
              pataddr = ((((pataddr) + (((((y) - (spr_y))) & (15))))) & 0xffff);
            }
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(pataddr) ?? 0)) & 0xff);
            if (((sprcol) & (128))) {
              spr_x = ((((spr_x) - (32))) | 0);
            }
            sprcol = ((runtime.andAssign(sprcol, 15)) & 0xff);
            for (let s: any = ((0) | 0); ((Number(s) < Number(sprite_size)) ? 1 : 0); s = ((((s) + (8))) | 0)) {
              for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
                let colission_index: any = ((runtime.add(((spr_x) + (((sprite_mag) ? (((i) * (2))) : (i)))), 32)) | 0);
                for (let z: any = ((0) | 0); ((Number(z) <= Number(sprite_mag)) ? 1 : 0); colission_index = ((((colission_index) + (1))) | 0), z = ((((z) + (1))) | 0)) {
                  if (((pattern) & (128))) {
                    if ((((((Number(colission_index) >= Number(32)) ? 1 : 0)) && (((Number(colission_index) < Number(288)) ? 1 : 0))) ? 1 : 0)) {
                      if (runtime.readIndex(spr_drawn, colission_index)) {
                        members.m_StatusReg = ((((members.m_StatusReg) | (32))) & 0xff);
                      }
                      runtime.writeIndex(spr_drawn, colission_index, ((runtime.readIndex(spr_drawn, colission_index)) | (1)));
                      if (sprcol) {
                        if (((((runtime.readIndex(spr_drawn, colission_index)) & (2))) ? 0 : 1)) {
                          runtime.writeIndex(spr_drawn, colission_index, ((runtime.readIndex(spr_drawn, colission_index)) | (2)));
                          runtime.writeIndex(p, ((((37) + (colission_index))) - (32)), (__l["pen"] ? __l["pen"](sprcol) : runtime.macro("pen", sprcol)));
                        }
                      }
                    }
                  }
                }
              }
              pattern = ((((runtime.dereference(members.m_vram_space)).read_byte?.(((pataddr) + (16))) ?? 0)) & 0xff);
              spr_x = ((((spr_x) + (((sprite_mag) ? (16) : (8))))) | 0);
            }
          }
        }
        if ((((~(members.m_StatusReg ?? runtime.member("m_StatusReg")))) & (64))) {
          members.m_StatusReg = (((((((members.m_StatusReg ?? runtime.member("m_StatusReg"))) & (224))) | ((members.m_FifthSprite ?? runtime.member("m_FifthSprite"))))) & 0xff);
          if ((((fifth_encountered) && ((((~(members.m_StatusReg ?? runtime.member("m_StatusReg")))) & (128)))) ? 1 : 0)) {
            members.m_StatusReg = ((((members.m_StatusReg) | (64))) & 0xff);
          }
        }
      }
      for (let i: any = ((runtime.add(37, 256)) | 0); ((Number(i) < Number(342)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        runtime.writeIndex(p, i, (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour)));
      }
    }
    ((runtime.dereference(members.m_line_timer)).adjust?.((__l["screen().time_until_pos"]?.(((((raw_vpos) + (1))) % ((__l["screen().height"]?.() ?? 0))), 37) ?? 0)) ?? 0);
  }
  return {
    "read": method_read,
    "vram_read": method_vram_read,
    "register_read": method_register_read,
    "check_interrupt": method_check_interrupt,
    "write": method_write,
    "vram_write": method_vram_write,
    "register_write": method_register_write,
    "change_register": method_change_register,
    "update_table_masks": method_update_table_masks,
    "update_backdrop": method_update_backdrop,
    "screen_update": method_screen_update,
    "clock_grom": method_clock_grom,
    "update_line": method_update_line
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["copybitmap","m_out_gromclk_cb","m_out_int_line_cb","machine","machine().side_effects_disabled","pen","rgb_t","screen","screen().height","screen().time_until_pos","screen().vpos"];

export const device = definition;
export default device;
