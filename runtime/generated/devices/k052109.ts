// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './k052109.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  const __mame_table_0 = [1, 1, 32, 256];
  function method_vblank_callback(runtime: any, screen: any, state: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if ((((state) && (((((members.m_irq_control ?? runtime.member("m_irq_control"))) >>> (2)) & 1))) ? 1 : 0)) {
      (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(1)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(1) : runtime.invoke("m_irq_handler", 1));
    }
    if (((state) ? 0 : 1)) {
      method_update_scroll(runtime);
    }
  }

  function method_update_scroll(runtime: any): any {
    const members = runtime.members;

    for (let tmap: any = ((0) | 0); ((Number(tmap) < Number(2)) ? 1 : 0); tmap = ((((tmap) + (1))) | 0)) {
      let scrollctrl: any = (((((((members.m_scrollctrl ?? runtime.member("m_scrollctrl"))) >>> (((tmap) * (3))))) & (7))) & 0xff);
      let rows: any = (((__mame_table_0[(((((scrollctrl) & (3))) % 4) + 4) % 4] ?? 0)) | 0);
      let cols: any = (((((((scrollctrl) >>> (2)) & 1)) ? (64) : (1))) | 0);
      let tmap_mask: any = ((((tmap) ? (8192) : (0))) | 0);
      let scrollram_y: any = runtime.addressOf((members.m_ram ?? runtime.member("m_ram")), ((6144) | (tmap_mask)));
      let scrollram_x: any = runtime.addressOf((members.m_ram ?? runtime.member("m_ram")), ((6656) | (tmap_mask)));
      let t: any = ((((tmap) + (1))) | 0);
      if ((((((Number(rows) === Number(1)) ? 1 : 0)) && (((Number(cols) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
        ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_rows?.(1) ?? 0);
        ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_cols?.(1) ?? 0);
        let xscroll: any = ((runtime.add(runtime.readIndex(scrollram_x, 0), ((256) * (runtime.readIndex(scrollram_x, 1))))) | 0);
        let yscroll: any = ((runtime.readIndex(scrollram_y, 12)) | 0);
        ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrollx?.(0, xscroll) ?? 0);
        ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrolly?.(0, yscroll) ?? 0);
      } else {
        if (((Number(cols) === Number(1)) ? 1 : 0)) {
          ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_rows?.(256) ?? 0);
          ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_cols?.(1) ?? 0);
          let yscroll: any = ((runtime.readIndex(scrollram_y, 12)) | 0);
          ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrolly?.(0, yscroll) ?? 0);
          let offs_mask: any = ((((((Number(rows) === Number(256)) ? 1 : 0)) ? (255) : (248))) | 0);
          for (let offs: any = ((0) | 0); ((Number(offs) < Number(256)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
            let xscroll: any = ((runtime.add(runtime.readIndex(scrollram_x, ((2) * (((offs) & (offs_mask))))), ((256) * (runtime.readIndex(scrollram_x, runtime.add(((2) * (((offs) & (offs_mask)))), 1)))))) | 0);
            ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrollx?.(((((offs) + (yscroll))) & (255)), xscroll) ?? 0);
          }
        } else {
          if (((Number(rows) === Number(1)) ? 1 : 0)) {
            ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_rows?.(1) ?? 0);
            ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_cols?.(64) ?? 0);
            let xscroll: any = ((runtime.add(runtime.readIndex(scrollram_x, 0), ((256) * (runtime.readIndex(scrollram_x, 1))))) | 0);
            ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrollx?.(0, xscroll) ?? 0);
            xscroll = ((((xscroll) / (8))) | 0);
            for (let offs: any = ((0) | 0); ((Number(offs) < Number(64)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
              let yscroll: any = ((runtime.readIndex(scrollram_y, offs)) | 0);
              ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrolly?.(((((offs) + (xscroll))) & (63)), yscroll) ?? 0);
            }
          } else {
            ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_rows?.(rows) ?? 0);
            ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scroll_cols?.(64) ?? 0);
            let offs_step: any = ((((((Number(rows) === Number(256)) ? 1 : 0)) ? (2) : (16))) | 0);
            for (let offs: any = ((0) | 0); ((Number(offs) < Number(rows)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
              let xscroll: any = ((runtime.add(runtime.readIndex(scrollram_x, ((offs_step) * (offs))), ((256) * (runtime.readIndex(scrollram_x, runtime.add(((offs_step) * (offs)), 1)))))) | 0);
              ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrollx?.(offs, xscroll) ?? 0);
            }
            for (let offs: any = ((0) | 0); ((Number(offs) < Number(64)) ? 1 : 0); offs = ((((offs) + (1))) | 0)) {
              let yscroll: any = ((runtime.readIndex(scrollram_y, offs)) | 0);
              ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[t])).set_scrolly?.(offs, yscroll) ?? 0);
            }
          }
        }
      }
    }
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_char_rom = members.m_char_rom ?? runtime.member("m_char_rom");
    if (((Number((members.m_rmrd_line ?? runtime.member("m_rmrd_line"))) === Number(0)) ? 1 : 0)) {
      if (((Number(((offset) & (8191))) >= Number(6144)) ? 1 : 0)) {
        if ((((((Number(offset) >= Number(6156)) ? 1 : 0)) && (((Number(offset) < Number(6196)) ? 1 : 0))) ? 1 : 0)) {
        } else {
          if ((((((Number(offset) >= Number(6656)) ? 1 : 0)) && (((Number(offset) < Number(7168)) ? 1 : 0))) ? 1 : 0)) {
          } else {
            if (((Number(offset) === Number(7424)) ? 1 : 0)) {
            } else {
              if ((((((Number(offset) >= Number(14348)) ? 1 : 0)) && (((Number(offset) < Number(14388)) ? 1 : 0))) ? 1 : 0)) {
              } else {
                if ((((((Number(offset) >= Number(14848)) ? 1 : 0)) && (((Number(offset) < Number(15360)) ? 1 : 0))) ? 1 : 0)) {
                } else {
                }
              }
            }
          }
        }
      }
      return (members.m_ram ?? runtime.member("m_ram"))[offset];
    } else {
      (__l["assert"] ? __l["assert"]((typeof (runtime.dereference(members.m_char_rom)).found === 'function' ? (runtime.dereference(members.m_char_rom)).found() : typeof (runtime.dereference(members.m_char_rom)).found === 'number' || typeof (runtime.dereference(members.m_char_rom)).found === 'boolean' ? (runtime.dereference(members.m_char_rom)).found : runtime.container(members.m_char_rom, "found"))) : runtime.macro("assert", (typeof (runtime.dereference(members.m_char_rom)).found === 'function' ? (runtime.dereference(members.m_char_rom)).found() : typeof (runtime.dereference(members.m_char_rom)).found === 'number' || typeof (runtime.dereference(members.m_char_rom)).found === 'boolean' ? (runtime.dereference(members.m_char_rom)).found : runtime.container(members.m_char_rom, "found"))));
      let code: any = ((((((offset) & (8191))) >>> (5))) | 0);
      let color: any = (((members.m_romsubbank ?? runtime.member("m_romsubbank"))) | 0);
      let flags: any = ((0) | 0);
      let priority: any = ((0) | 0);
      let bank: any = (((((members.m_charrombank ?? runtime.member("m_charrombank"))[((((color) & (12))) >>> (2))]) >>> (2))) | 0);
      let addr: any = ((0) | 0);
      bank = ((((bank) | ((((members.m_charrombank_2 ?? runtime.member("m_charrombank_2"))[((((color) & (12))) >>> (2))]) >>> (2))))) | 0);
      if ((members.m_has_extra_video_ram ?? runtime.member("m_has_extra_video_ram"))) {
        code = ((((code) | (((color) << (8))))) | 0);
      } else {
        (__l["m_k052109_cb"] ? __l["m_k052109_cb"](0, ({ generatedLValue: true, get: () => bank, set: (value: any) => { bank = ((value) | 0); } }), ({ generatedLValue: true, get: () => code, set: (value: any) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => flags, set: (value: any) => { flags = ((value) | 0); } }), ({ generatedLValue: true, get: () => priority, set: (value: any) => { priority = ((value) | 0); } })) : runtime.macro("m_k052109_cb", 0, ({ generatedLValue: true, get: () => bank, set: (value: any) => { bank = ((value) | 0); } }), ({ generatedLValue: true, get: () => code, set: (value: any) => { code = ((value) | 0); } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = ((value) | 0); } }), ({ generatedLValue: true, get: () => flags, set: (value: any) => { flags = ((value) | 0); } }), ({ generatedLValue: true, get: () => priority, set: (value: any) => { priority = ((value) | 0); } })));
      }
      addr = ((runtime.add(((code) << (5)), ((offset) & (31)))) | 0);
      addr = ((runtime.andAssign(addr, (((members.m_char_rom).length) - (1)))) | 0);
      return runtime.readIndex(h_m_char_rom, addr);
    }
  }

  function method_tilemap_draw(runtime: any, screen: any, bitmap: any, cliprect: any, tmap_num: any, flags: any, priority: any, priority_mask: any): any {
    const members = runtime.members;

    ((runtime.dereference((members.m_tilemap ?? runtime.member("m_tilemap"))[tmap_num])).draw?.(screen, bitmap, cliprect, flags, priority, priority_mask) ?? 0);
  }

  function method_firq_scanline(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((members.m_irq_control ?? runtime.member("m_irq_control"))) >>> (1)) & 1)) {
      (__l["m_firq_handler"] ? __l["m_firq_handler"](Number(1)) : typeof members.m_firq_handler === 'function' ? members.m_firq_handler(1) : runtime.invoke("m_firq_handler", 1));
    }
    ((runtime.dereference(members.m_firq_scanline)).adjust?.((__l["screen().time_until_pos"]?.(runtime.add((__l["screen().vpos"]?.() ?? 0), 2)) ?? 0)) ?? 0);
  }

  function method_nmi_scanline(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (((((members.m_irq_control ?? runtime.member("m_irq_control"))) >>> (0)) & 1)) {
      (__l["m_nmi_handler"] ? __l["m_nmi_handler"](Number(1)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(1) : runtime.invoke("m_nmi_handler", 1));
    }
    ((runtime.dereference(members.m_nmi_scanline)).adjust?.((__l["screen().time_until_pos"]?.(runtime.add((__l["screen().vpos"]?.() ?? 0), 32)) ?? 0)) ?? 0);
  }
  return {
    "vblank_callback": method_vblank_callback,
    "update_scroll": method_update_scroll,
    "read": method_read,
    "tilemap_draw": method_tilemap_draw,
    "firq_scanline": method_firq_scanline,
    "nmi_scanline": method_nmi_scanline
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["assert","m_firq_handler","m_irq_handler","m_k052109_cb","m_nmi_handler","screen","screen().time_until_pos","screen().vpos"];

export const device = definition;
export default device;
