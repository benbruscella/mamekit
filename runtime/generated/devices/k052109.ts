// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './k052109.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_vblank_callback(runtime: any, screen: any, state: any) {
    const members = runtime.members;
    if ((((state) && (((((members.m_irq_control ?? runtime.member("m_irq_control"))) >>> (2)) & 1))) ? 1 : 0)) {
      runtime.invoke("m_irq_handler", 1);
    }
    if (((state) ? 0 : 1)) {
      method_update_scroll(runtime);
    }
  }

  function method_update_scroll(runtime: any) {
    const members = runtime.members;
    for (let tmap: any = 0; ((Number(tmap) < Number(2)) ? 1 : 0); tmap = ((tmap) + (1))) {
      let scrollctrl: any = (((((((members.m_scrollctrl ?? runtime.member("m_scrollctrl"))) >>> (((tmap) * (3))))) & (7))) & 0xff);
      let rows: any = ([1, 1, 32, 256][(((((scrollctrl) & (3))) % 4) + 4) % 4] ?? 0);
      let cols: any = (((((scrollctrl) >>> (2)) & 1)) ? (64) : (1));
      let tmap_mask: any = ((tmap) ? (8192) : (0));
      let scrollram_y: any = runtime.addressOf((members.m_ram ?? runtime.member("m_ram")), ((6144) | (tmap_mask)));
      let scrollram_x: any = runtime.addressOf((members.m_ram ?? runtime.member("m_ram")), ((6656) | (tmap_mask)));
      let t: any = ((tmap) + (1));
      if ((((((Number(rows) === Number(1)) ? 1 : 0)) && (((Number(cols) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
        ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_rows?.(1) ?? 0);
        ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_cols?.(1) ?? 0);
        let xscroll: any = runtime.add(runtime.readIndex(scrollram_x, 0), ((256) * (runtime.readIndex(scrollram_x, 1))));
        let yscroll: any = runtime.readIndex(scrollram_y, 12);
        ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrollx?.(0, xscroll) ?? 0);
        ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrolly?.(0, yscroll) ?? 0);
      } else {
        if (((Number(cols) === Number(1)) ? 1 : 0)) {
          ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_rows?.(256) ?? 0);
          ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_cols?.(1) ?? 0);
          let yscroll: any = runtime.readIndex(scrollram_y, 12);
          ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrolly?.(0, yscroll) ?? 0);
          let offs_mask: any = ((((Number(rows) === Number(256)) ? 1 : 0)) ? (255) : (248));
          for (let offs: any = 0; ((Number(offs) < Number(256)) ? 1 : 0); offs = ((offs) + (1))) {
            let xscroll: any = runtime.add(runtime.readIndex(scrollram_x, ((2) * (((offs) & (offs_mask))))), ((256) * (runtime.readIndex(scrollram_x, runtime.add(((2) * (((offs) & (offs_mask)))), 1)))));
            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrollx?.(((((offs) + (yscroll))) & (255)), xscroll) ?? 0);
          }
        } else {
          if (((Number(rows) === Number(1)) ? 1 : 0)) {
            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_rows?.(1) ?? 0);
            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_cols?.(64) ?? 0);
            let xscroll: any = runtime.add(runtime.readIndex(scrollram_x, 0), ((256) * (runtime.readIndex(scrollram_x, 1))));
            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrollx?.(0, xscroll) ?? 0);
            xscroll = ((xscroll) / (8));
            for (let offs: any = 0; ((Number(offs) < Number(64)) ? 1 : 0); offs = ((offs) + (1))) {
              let yscroll: any = runtime.readIndex(scrollram_y, offs);
              ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrolly?.(((((offs) + (xscroll))) & (63)), yscroll) ?? 0);
            }
          } else {
            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_rows?.(rows) ?? 0);
            ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scroll_cols?.(64) ?? 0);
            let offs_step: any = ((((Number(rows) === Number(256)) ? 1 : 0)) ? (2) : (16));
            for (let offs: any = 0; ((Number(offs) < Number(rows)) ? 1 : 0); offs = ((offs) + (1))) {
              let xscroll: any = runtime.add(runtime.readIndex(scrollram_x, ((offs_step) * (offs))), ((256) * (runtime.readIndex(scrollram_x, runtime.add(((offs_step) * (offs)), 1)))));
              ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrollx?.(offs, xscroll) ?? 0);
            }
            for (let offs: any = 0; ((Number(offs) < Number(64)) ? 1 : 0); offs = ((offs) + (1))) {
              let yscroll: any = runtime.readIndex(scrollram_y, offs);
              ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), t))).set_scrolly?.(offs, yscroll) ?? 0);
            }
          }
        }
      }
    }
  }

  function method_read(runtime: any, offset: any) {
    const members = runtime.members;
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
      return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    } else {
      (runtime.calls["assert"] ? runtime.calls["assert"]((typeof (runtime.dereference(members.m_char_rom)).found === 'function' ? (runtime.dereference(members.m_char_rom)).found() : typeof (runtime.dereference(members.m_char_rom)).found === 'number' || typeof (runtime.dereference(members.m_char_rom)).found === 'boolean' ? (runtime.dereference(members.m_char_rom)).found : runtime.container(members.m_char_rom, "found"))) : runtime.macro("assert", (typeof (runtime.dereference(members.m_char_rom)).found === 'function' ? (runtime.dereference(members.m_char_rom)).found() : typeof (runtime.dereference(members.m_char_rom)).found === 'number' || typeof (runtime.dereference(members.m_char_rom)).found === 'boolean' ? (runtime.dereference(members.m_char_rom)).found : runtime.container(members.m_char_rom, "found"))));
      let code: any = ((((offset) & (8191))) >>> (5));
      let color: any = (members.m_romsubbank ?? runtime.member("m_romsubbank"));
      let flags: any = 0;
      let priority: any = 0;
      let bank: any = ((runtime.readIndex((members.m_charrombank ?? runtime.member("m_charrombank")), ((((color) & (12))) >>> (2)))) >>> (2));
      let addr: any = 0;
      bank = ((bank) | (((runtime.readIndex((members.m_charrombank_2 ?? runtime.member("m_charrombank_2")), ((((color) & (12))) >>> (2)))) >>> (2))));
      if ((members.m_has_extra_video_ram ?? runtime.member("m_has_extra_video_ram"))) {
        code = ((code) | (((color) << (8))));
      } else {
        (runtime.calls["m_k052109_cb"] ? runtime.calls["m_k052109_cb"](0, ({ generatedLValue: true, get: () => bank, set: (value: any) => { bank = value; } }), ({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => flags, set: (value: any) => { flags = value; } }), ({ generatedLValue: true, get: () => priority, set: (value: any) => { priority = value; } })) : runtime.macro("m_k052109_cb", 0, ({ generatedLValue: true, get: () => bank, set: (value: any) => { bank = value; } }), ({ generatedLValue: true, get: () => code, set: (value: any) => { code = value; } }), ({ generatedLValue: true, get: () => color, set: (value: any) => { color = value; } }), ({ generatedLValue: true, get: () => flags, set: (value: any) => { flags = value; } }), ({ generatedLValue: true, get: () => priority, set: (value: any) => { priority = value; } })));
      }
      addr = runtime.add(((code) << (5)), ((offset) & (31)));
      addr = runtime.andAssign(addr, (((members.m_char_rom).length) - (1)));
      return runtime.readIndex(h_m_char_rom, addr);
    }
  }

  function method_tilemap_draw(runtime: any, screen: any, bitmap: any, cliprect: any, tmap_num: any, flags: any, priority: any, priority_mask: any) {
    const members = runtime.members;
    ((runtime.dereference(runtime.readIndex((members.m_tilemap ?? runtime.member("m_tilemap")), tmap_num))).draw?.(screen, bitmap, cliprect, flags, priority, priority_mask) ?? 0);
  }

  function method_firq_scanline(runtime: any, param: any) {
    const members = runtime.members;
    if (((((members.m_irq_control ?? runtime.member("m_irq_control"))) >>> (1)) & 1)) {
      runtime.invoke("m_firq_handler", 1);
    }
    ((runtime.dereference(members.m_firq_scanline)).adjust?.((runtime.calls["screen().time_until_pos"]?.(runtime.add((runtime.calls["screen().vpos"]?.() ?? 0), 2)) ?? 0)) ?? 0);
  }

  function method_nmi_scanline(runtime: any, param: any) {
    const members = runtime.members;
    if (((((members.m_irq_control ?? runtime.member("m_irq_control"))) >>> (0)) & 1)) {
      runtime.invoke("m_nmi_handler", 1);
    }
    ((runtime.dereference(members.m_nmi_scanline)).adjust?.((runtime.calls["screen().time_until_pos"]?.(runtime.add((runtime.calls["screen().vpos"]?.() ?? 0), 32)) ?? 0)) ?? 0);
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

export const device = definition;
export default device;
