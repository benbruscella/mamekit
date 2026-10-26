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
    return ((value) & 0xff);
  }

  function method_vram_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((members.m_ReadAhead ?? 0)) & 0xff);
    if (((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
      return ((data) & 0xff);
    }
    members.m_ReadAhead = ((((runtime.dereference(members.m_vram_space)).read_byte?.((members.m_Addr ?? 0)) ?? 0)) & 0xff);
    members.m_Addr = (((((((members.m_Addr ?? 0)) + (1))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
    members.m_latch = ((0) & 0xff);
    return ((data) & 0xff);
  }

  function method_register_read(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let data: any = (((members.m_StatusReg ?? 0)) & 0xff);
    if (((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
      return ((data) & 0xff);
    }
    members.m_StatusReg = (((members.m_FifthSprite ?? 0)) & 0xff);
    method_check_interrupt(runtime);
    members.m_latch = ((0) & 0xff);
    return ((data) & 0xff);
  }

  function method_check_interrupt(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_Regs = members.m_Regs ?? 0;
    let b: any = ((((((((((members.m_StatusReg ?? 0)) & (128))) && (((h_m_Regs[1]) & (32)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
    if (((Number(b) !== Number((members.m_INT ?? 0))) ? 1 : 0)) {
      members.m_INT = ((b) & 0xff);
      (__l["m_out_int_line_cb"] ? __l["m_out_int_line_cb"](Number((members.m_INT ?? 0))) : typeof members.m_out_int_line_cb === 'function' ? members.m_out_int_line_cb((members.m_INT ?? 0)) : runtime.invoke("m_out_int_line_cb", (members.m_INT ?? 0)));
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

    ((runtime.dereference(members.m_vram_space)).write_byte?.((members.m_Addr ?? 0), data) ?? 0);
    if (((((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
      members.m_Addr = (((((((members.m_Addr ?? 0)) + (1))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
      members.m_ReadAhead = ((data) & 0xff);
      members.m_latch = ((0) & 0xff);
    }
  }

  function method_register_write(runtime: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((__l["machine().side_effects_disabled"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) {
      return;
    }
    if ((members.m_latch ?? 0)) {
      members.m_Addr = ((((((((data) << (8))) | ((((members.m_Addr ?? 0)) & (255))))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
      if (((data) & (128))) {
        method_change_register(runtime, ((data) & (7)), (((members.m_Addr ?? 0)) & (255)));
      } else {
        if (((((data) & (64))) ? 0 : 1)) {
          method_vram_read(runtime);
        }
      }
      members.m_latch = ((0) & 0xff);
    } else {
      members.m_Addr = (((((((((members.m_Addr ?? 0)) & (65280))) | (data))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
      members.m_latch = ((1) & 0xff);
    }
  }

  function method_change_register(runtime: any, reg: any, val: any): any {
    const members = runtime.members;

    const h_m_Regs = members.m_Regs ?? 0;
    if ((((members.__static_change_register_modes__initialised ?? 0)) ? 0 : 1)) {
      members.__static_change_register_modes = ["Mode 0 (GRAPHIC 1)", "Mode 1 (TEXT 1)", "Mode 2 (GRAPHIC 2)", "Mode 1+2 (TEXT 1 variation)", "Mode 3 (MULTICOLOR)", "Mode 1+3 (BOGUS)", "Mode 2+3 (MULTICOLOR variation)", "Mode 1+2+3 (BOGUS)"];
      members.__static_change_register_modes__initialised = 1;
    }
    let modes: any = (members.__static_change_register_modes ?? 0);
    let prev: any = ((h_m_Regs[reg]) & 0xff);
    val = ((((val) & ((__mame_table_0[((reg) & 7)] ?? 0)))) & 0xff);
    h_m_Regs[reg] = val;
    if (0) {
      0;
    }
    switch ((reg as number)) {
      case 0:
      {
        if (((val) & (2))) {
          members.m_colour = ((((((((h_m_Regs[3]) & (128))) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
          members.m_pattern = ((((((((h_m_Regs[4]) & (4))) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
          method_update_table_masks(runtime);
        } else {
          members.m_colour = ((((((h_m_Regs[3]) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
          members.m_pattern = ((((((h_m_Regs[4]) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
        }
        members.m_mode = ((((((((1) ? (((h_m_Regs[0]) & (2))) : (0))) | (runtime.shiftRight(((h_m_Regs[1]) & (16)), 4)))) | (runtime.shiftRight(((h_m_Regs[1]) & (8)), 1)))) & 0xff);
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
        members.m_mode = ((((((((1) ? (((h_m_Regs[0]) & (2))) : (0))) | (runtime.shiftRight(((h_m_Regs[1]) & (16)), 4)))) | (runtime.shiftRight(((h_m_Regs[1]) & (8)), 1)))) & 0xff);
        if (0) {
          0;
        }
        break;
      }
      case 2:
      {
        members.m_nametbl = ((((((val) * (1024))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
        break;
      }
      case 3:
      {
        if (((h_m_Regs[0]) & (2))) {
          members.m_colour = ((((((((val) & (128))) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
          method_update_table_masks(runtime);
        } else {
          members.m_colour = ((((((val) * (64))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
        }
        break;
      }
      case 4:
      {
        if (((h_m_Regs[0]) & (2))) {
          members.m_pattern = ((((((((val) & (4))) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
          method_update_table_masks(runtime);
        } else {
          members.m_pattern = ((((((val) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
        }
        break;
      }
      case 5:
      {
        members.m_spriteattribute = ((((((val) * (128))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
        break;
      }
      case 6:
      {
        members.m_spritepattern = ((((((val) * (2048))) & ((((members.m_vram_size ?? 0)) - (1))))) & 0xffff);
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

    const h_m_Regs = members.m_Regs ?? 0;
    members.m_colourmask = ((((((((h_m_Regs[3]) & (127))) << (3))) | (7))) | 0);
    members.m_patternmask = ((((((((h_m_Regs[4]) & (3))) << (8))) | (((1) ? ((((members.m_colourmask ?? 0)) & (255))) : (255))))) | 0);
  }

  function method_update_backdrop(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_Regs = members.m_Regs ?? 0;
    if (((Number(((h_m_Regs[7]) & (15))) === Number(0)) ? 1 : 0)) {
      (runtime.palette[0] = (__l["rgb_t"] ? __l["rgb_t"](((((h_m_Regs[0]) & (1))) ? (0) : (255)), 0, 0, 0) : runtime.macro("rgb_t", ((((h_m_Regs[0]) & (1))) ? (0) : (255)), 0, 0, 0)));
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_tmpbmp = members.m_tmpbmp ?? 0;
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

    const h_m_Regs = members.m_Regs ?? 0;
    const h_m_tmpbmp = members.m_tmpbmp ?? 0;
    let raw_vpos: any = ((((__l["screen().vpos"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("screen().vpos"))?.() ?? 0)) | 0);
    let vpos: any = ((runtime.divide(((raw_vpos) * ((members.m_vertical_size ?? 0))), ((__l["screen().height"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("screen().height"))?.() ?? 0))) | 0);
    let BackColour: any = ((((h_m_Regs[7]) & (15))) & 0xffff);
    let p: any = h_m_tmpbmp["pix&"](vpos);
    let y: any = ((((vpos) - ((members.m_top_border ?? 0)))) | 0);
    if (((((((((Number(y) < Number(0)) ? 1 : 0)) || (((Number(y) >= Number(192)) ? 1 : 0))) ? 1 : 0)) || (((((h_m_Regs[1]) & (64))) ? 0 : 1))) ? 1 : 0)) {
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
      switch (((members.m_mode ?? 0) as number)) {
        case 0:
        {
          let addr: any = (((((members.m_nametbl ?? 0)) + (((((y) & (248))) << (2))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr = ((((addr) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr) ?? 0)) & 0xff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.((((members.m_colour ?? 0)) + (((charcode) >>> (3))))) ?? 0)) & 0xff);
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
          let addr__1: any = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (40))))) & 0xffff);
          let fg: any = (__l["pen"] ? __l["pen"](((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))));
          let bg: any = (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour));
          for (let x: any = ((37) | 0); ((Number(x) < Number(43)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          for (let x: any = ((43) | 0); ((Number(x) < Number(283)) ? 1 : 0); x = ((((x) + (6))) | 0), addr__1 = ((((addr__1) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr__1) ?? 0)) & 0xffff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            for (let i: any = ((0) | 0); ((Number(i) < Number(6)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg) : (bg)));
            }
          }
          for (let x: any = ((283) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg);
          }
          break;
        }
        case 2:
        {
          let addr__2: any = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (32))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr__2 = ((((addr__2) + (1))) & 0xffff)) {
            let charcode: any = ((runtime.add(((runtime.dereference(members.m_vram_space)).read_byte?.(addr__2) ?? 0), ((runtime.shiftRight(y, 6)) << (8)))) & 0xffff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? 0)) + (((((charcode) & ((members.m_patternmask ?? 0)))) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_colour ?? 0)) + (((((charcode) & ((members.m_colourmask ?? 0)))) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            let fg__1: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg__1: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg__1) : (bg__1)));
            }
          }
          break;
        }
        case 3:
        {
          let addr__3: any = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (40))))) & 0xffff);
          let fg__2: any = (__l["pen"] ? __l["pen"](((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))));
          let bg__2: any = (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour));
          for (let x: any = ((37) | 0); ((Number(x) < Number(43)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg__2);
          }
          for (let x: any = ((43) | 0); ((Number(x) < Number(283)) ? 1 : 0); x = ((((x) + (6))) | 0), addr__3 = ((((addr__3) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.add(((runtime.dereference(members.m_vram_space)).read_byte?.(addr__3) ?? 0), ((runtime.shiftRight(y, 6)) << (8)))) & ((members.m_patternmask ?? 0)))) & 0xffff);
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((y) & (7)))) ?? 0)) & 0xff);
            for (let i: any = ((0) | 0); ((Number(i) < Number(6)) ? 1 : 0); pattern = ((((pattern) << (1))) & 0xff), i = ((((i) + (1))) | 0)) {
              runtime.writeIndex(p, ((x) + (i)), ((((pattern) & (128))) ? (fg__2) : (bg__2)));
            }
          }
          for (let x: any = ((283) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg__2);
          }
          break;
        }
        case 4:
        {
          let addr__4: any = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (32))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr__4 = ((((addr__4) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr__4) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_pattern ?? 0)) + (((charcode) << (3)))), ((runtime.shiftRight(y, 2)) & (7)))) ?? 0)) & 0xff);
            let fg__3: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg__3: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg__3)))))));
            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), (runtime.writeIndex(p, ((x) + (6)), (runtime.writeIndex(p, ((x) + (7)), bg__3)))))));
          }
          break;
        }
        case 5:
        case 7:
        {
          let fg__4: any = (__l["pen"] ? __l["pen"](((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((h_m_Regs[7]) >>> (4))) ? (((h_m_Regs[7]) >>> (4))) : (BackColour))));
          let bg__4: any = (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour));
          for (let x: any = ((37) | 0); ((Number(x) < Number(43)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg__4);
          }
          for (let x: any = ((43) | 0); ((Number(x) < Number(283)) ? 1 : 0); x = ((((x) + (6))) | 0)) {
            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg__4)))))));
            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), bg__4)));
          }
          for (let x: any = ((283) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            runtime.writeIndex(p, x, bg__4);
          }
          break;
        }
        case 6:
        {
          let addr__5: any = (((((members.m_nametbl ?? 0)) + (((runtime.shiftRight(y, 3)) * (32))))) & 0xffff);
          for (let x: any = ((37) | 0); ((Number(x) < Number(293)) ? 1 : 0); x = ((((x) + (8))) | 0), addr__5 = ((((addr__5) + (1))) & 0xffff)) {
            let charcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(addr__5) ?? 0)) & 0xff);
            let colour: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.((((members.m_pattern ?? 0)) + (((((runtime.add(((charcode) + (((runtime.shiftRight(y, 2)) & (7)))), ((runtime.shiftRight(y, 6)) << (8)))) & ((members.m_patternmask ?? 0)))) << (3))))) ?? 0)) & 0xff);
            let fg__5: any = (__l["pen"] ? __l["pen"](((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))) : runtime.macro("pen", ((((colour) >>> (4))) ? (((colour) >>> (4))) : (BackColour))));
            let bg__5: any = (__l["pen"] ? __l["pen"](((((colour) & (15))) ? (((colour) & (15))) : (BackColour))) : runtime.macro("pen", ((((colour) & (15))) ? (((colour) & (15))) : (BackColour))));
            runtime.writeIndex(p, ((x) + (0)), (runtime.writeIndex(p, ((x) + (1)), (runtime.writeIndex(p, ((x) + (2)), (runtime.writeIndex(p, ((x) + (3)), fg__5)))))));
            runtime.writeIndex(p, ((x) + (4)), (runtime.writeIndex(p, ((x) + (5)), (runtime.writeIndex(p, ((x) + (6)), (runtime.writeIndex(p, ((x) + (7)), bg__5)))))));
          }
          break;
        }
      }
      if (((Number(((h_m_Regs[1]) & (80))) !== Number(64)) ? 1 : 0)) {
        members.m_FifthSprite = ((31) & 0xff);
      } else {
        let sprite_size: any = ((((((h_m_Regs[1]) & (2))) ? (16) : (8))) & 0xff);
        let sprite_mag: any = ((((h_m_Regs[1]) & (1))) & 0xff);
        let sprite_height: any = ((((sprite_size) * (((sprite_mag) + (1))))) & 0xff);
        let spr_drawn: any = [0];
        let num_sprites: any = ((0) & 0xff);
        let fifth_encountered: any = ((0) ? 1 : 0);
        for (let sprattr: any = ((0) & 0xffff); ((Number(sprattr) < Number(128)) ? 1 : 0); sprattr = ((((sprattr) + (4))) & 0xffff)) {
          let spr_y: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? 0)) + (sprattr)), 0)) ?? 0)) | 0);
          members.m_FifthSprite = ((runtime.divide(sprattr, 4)) & 0xff);
          if (((Number(spr_y) === Number(208)) ? 1 : 0)) {
            break;
          }
          if (((Number(spr_y) > Number(224)) ? 1 : 0)) {
            spr_y = ((((spr_y) - (256))) | 0);
          }
          spr_y = ((((spr_y) + (1))) | 0);
          if ((((((Number(spr_y) <= Number(y)) ? 1 : 0)) && (((Number(y) < Number(((spr_y) + (sprite_height)))) ? 1 : 0))) ? 1 : 0)) {
            let spr_x: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? 0)) + (sprattr)), 1)) ?? 0)) | 0);
            let sprcode: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? 0)) + (sprattr)), 2)) ?? 0)) & 0xff);
            let sprcol: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(runtime.add((((members.m_spriteattribute ?? 0)) + (sprattr)), 3)) ?? 0)) & 0xff);
            let pataddr: any = (((((members.m_spritepattern ?? 0)) + (((((((Number(sprite_size) === Number(16)) ? 1 : 0)) ? (((sprcode) & (-4))) : (sprcode))) * (8))))) & 0xffff);
            num_sprites = ((((num_sprites) + (1))) & 0xff);
            if (((Number(num_sprites) === Number(5)) ? 1 : 0)) {
              fifth_encountered = ((1) ? 1 : 0);
              break;
            }
            if (sprite_mag) {
              pataddr = ((((pataddr) + (runtime.shiftRight(((((y) - (spr_y))) & (31)), 1)))) & 0xffff);
            } else {
              pataddr = ((((pataddr) + (((((y) - (spr_y))) & (15))))) & 0xffff);
            }
            let pattern: any = ((((runtime.dereference(members.m_vram_space)).read_byte?.(pataddr) ?? 0)) & 0xff);
            if (((sprcol) & (128))) {
              spr_x = ((((spr_x) - (32))) | 0);
            }
            sprcol = ((((sprcol) & (15))) & 0xff);
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
        if ((((~(members.m_StatusReg ?? 0))) & (64))) {
          members.m_StatusReg = (((((((members.m_StatusReg ?? 0)) & (224))) | ((members.m_FifthSprite ?? 0)))) & 0xff);
          if ((((fifth_encountered) && ((((~(members.m_StatusReg ?? 0))) & (128)))) ? 1 : 0)) {
            members.m_StatusReg = ((((members.m_StatusReg) | (64))) & 0xff);
          }
        }
      }
      for (let i: any = ((293) | 0); ((Number(i) < Number(342)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        runtime.writeIndex(p, i, (__l["pen"] ? __l["pen"](BackColour) : runtime.macro("pen", BackColour)));
      }
    }
    ((runtime.dereference(members.m_line_timer)).adjust?.(((__l["screen().time_until_pos"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("screen().time_until_pos"))?.(((((raw_vpos) + (1))) % (((__l["screen().height"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("screen().height"))?.() ?? 0))), 37) ?? 0)) ?? 0);
  }

  function method_set_vram_size(runtime: any, vram_size: any): any {
    const members = runtime.members;

    members.m_vram_size = ((vram_size) | 0);
  }

  function method_int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_int_line_cb)).bind === 'function' ? (runtime.dereference(members.m_out_int_line_cb)).bind() : typeof (runtime.dereference(members.m_out_int_line_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_int_line_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_int_line_cb)).bind : runtime.container(members.m_out_int_line_cb, "bind"));
  }

  function method_gromclk_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_gromclk_cb)).bind === 'function' ? (runtime.dereference(members.m_out_gromclk_cb)).bind() : typeof (runtime.dereference(members.m_out_gromclk_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_gromclk_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_gromclk_cb)).bind : runtime.container(members.m_out_gromclk_cb, "bind"));
  }

  function method_get_bitmap(runtime: any): any {
    const members = runtime.members;

    const h_m_tmpbmp = members.m_tmpbmp ?? 0;
    return h_m_tmpbmp;
  }

  function method_reset_line(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number(state) === Number(1)) ? 1 : 0)) {
      method_device_reset(runtime);
    }
  }

  function method_device_reset(runtime: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_Regs = members.m_Regs ?? 0;
    for (let __range0: any = h_m_Regs, __range0_index: any = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
      runtime.writeIndex(__range0, __range0_index, 0);
    }
    members.m_StatusReg = ((0) & 0xff);
    members.m_FifthSprite = ((31) & 0xff);
    members.m_nametbl = ((0) & 0xffff);
    members.m_pattern = ((0) & 0xffff);
    members.m_colour = ((0) & 0xffff);
    members.m_spritepattern = ((0) & 0xffff);
    members.m_spriteattribute = ((0) & 0xffff);
    members.m_colourmask = ((16383) | 0);
    members.m_patternmask = ((16383) | 0);
    members.m_Addr = ((0) & 0xffff);
    members.m_ReadAhead = ((0) & 0xff);
    members.m_latch = ((0) & 0xff);
    members.m_mode = ((0) & 0xff);
    method_check_interrupt(runtime);
    ((runtime.dereference(members.m_line_timer)).adjust?.(((__l["screen().time_until_pos"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("screen().time_until_pos"))?.(0, 37) ?? 0)) ?? 0);
    if (((((((typeof (runtime.dereference(members.m_out_gromclk_cb)).isunset === 'function' ? (runtime.dereference(members.m_out_gromclk_cb)).isunset() : typeof (runtime.dereference(members.m_out_gromclk_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_out_gromclk_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_out_gromclk_cb)).isunset : runtime.container(members.m_out_gromclk_cb, "isunset"))) ? 0 : 1)) && (1)) ? 1 : 0)) {
      ((runtime.dereference(members.m_gromclk_timer)).adjust?.(0, 0, (__l["clocks_to_attotime"] ? __l["clocks_to_attotime"](24) : runtime.macro("clocks_to_attotime", 24))) ?? 0);
    }
  }

  function method_palette_entries(runtime: any): any {
    const members = runtime.members;

    return 16;
  }

  function method_tms9928a_device__set_vram_size(runtime: any, vram_size: any): any {
    const members = runtime.members;

    members.m_vram_size = ((vram_size) | 0);
  }

  function method_tms9928a_device__int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_int_line_cb)).bind === 'function' ? (runtime.dereference(members.m_out_int_line_cb)).bind() : typeof (runtime.dereference(members.m_out_int_line_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_int_line_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_int_line_cb)).bind : runtime.container(members.m_out_int_line_cb, "bind"));
  }

  function method_tms9928a_device__gromclk_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_out_gromclk_cb)).bind === 'function' ? (runtime.dereference(members.m_out_gromclk_cb)).bind() : typeof (runtime.dereference(members.m_out_gromclk_cb)).bind === 'number' || typeof (runtime.dereference(members.m_out_gromclk_cb)).bind === 'boolean' ? (runtime.dereference(members.m_out_gromclk_cb)).bind : runtime.container(members.m_out_gromclk_cb, "bind"));
  }

  function method_tms9928a_device__get_bitmap(runtime: any): any {
    const members = runtime.members;

    const h_m_tmpbmp = members.m_tmpbmp ?? 0;
    return h_m_tmpbmp;
  }

  function method_tms9928a_device__reset_line(runtime: any, state: any): any {
    const members = runtime.members;

    if (((Number(state) === Number(1)) ? 1 : 0)) {
      method_device_reset(runtime);
    }
  }

  function method_tms9928a_device__palette_entries(runtime: any): any {
    const members = runtime.members;

    return 16;
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
    "update_line": method_update_line,
    "set_vram_size": method_set_vram_size,
    "int_callback": method_int_callback,
    "gromclk_callback": method_gromclk_callback,
    "get_bitmap": method_get_bitmap,
    "reset_line": method_reset_line,
    "device_reset": method_device_reset,
    "palette_entries": method_palette_entries,
    "tms9928a_device::set_vram_size": method_tms9928a_device__set_vram_size,
    "tms9928a_device::int_callback": method_tms9928a_device__int_callback,
    "tms9928a_device::gromclk_callback": method_tms9928a_device__gromclk_callback,
    "tms9928a_device::get_bitmap": method_tms9928a_device__get_bitmap,
    "tms9928a_device::reset_line": method_tms9928a_device__reset_line,
    "tms9928a_device::palette_entries": method_tms9928a_device__palette_entries
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["clocks_to_attotime","copybitmap","m_out_gromclk_cb","m_out_int_line_cb","machine","machine().side_effects_disabled","pen","rgb_t","screen","screen().height","screen().time_until_pos","screen().vpos"];

export const device = definition;
export default device;
