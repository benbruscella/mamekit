// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './ppu_2c02.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  const __mame_table_0 = [0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77];
  const __mame_table_1 = [1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75];

  function method_readbyte(runtime: any, address: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    return ((((__l["space().read_byte"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("space().read_byte"))?.(address) ?? 0)) & 0xff);
  }

  function method_init_palette_tables(runtime: any): any {
    const members = runtime.members;

    let is_pal: any = ((((Number((members.m_scanlines_per_frame ?? 0)) !== Number(262)) ? 1 : 0)) ? 1 : 0);
    let entry: any = ((0) | 0);
    for (let color_emphasis: any = ((0) | 0); ((Number(color_emphasis) < Number(8)) ? 1 : 0); color_emphasis = ((((color_emphasis) + (1))) | 0)) {
      for (let color_intensity: any = ((0) | 0); ((Number(color_intensity) < Number(4)) ? 1 : 0); color_intensity = ((((color_intensity) + (1))) | 0)) {
        for (let color_num: any = ((0) | 0); ((Number(color_num) < Number(16)) ? 1 : 0); color_num = ((((color_num) + (1))) | 0)) {
          let col: any = method_nespal_to_RGB(runtime, color_intensity, color_num, color_emphasis, is_pal);
          (runtime.palette[entry] = col);
          entry = ((((entry) + (1))) | 0);
        }
      }
    }
  }

  function method_nespal_to_RGB(runtime: any, color_intensity: any, color_num: any, color_emphasis: any, is_pal_or_dendy: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    let tint: any = 0.22;
    let hue: any = 287;
    let Kr: any = 0.2989;
    let Kb: any = 0.1145;
    let Ku: any = 2.029;
    let Kv: any = 1.14;
    let sat: any = 0;
    let y: any = 0;
    let u: any = 0;
    let v: any = 0;
    let rad: any = 0;
    switch ((color_num as number)) {
      case 0:
      {
        sat = 0;
        rad = 0;
        y = (__mame_table_0[(((((0) + (color_intensity))) % 12) + 12) % 12] ?? 0);
        break;
      }
      case 13:
      {
        sat = 0;
        rad = 0;
        y = (__mame_table_0[(((((8) + (color_intensity))) % 12) + 12) % 12] ?? 0);
        break;
      }
      case 14:
      case 15:
      {
        sat = 0;
        rad = 0;
        y = 0;
        break;
      }
      default:
      {
        sat = tint;
        rad = (__l["DEGREE_TO_RADIAN"] ? __l["DEGREE_TO_RADIAN"](((((color_num) * (30))) + (hue))) : runtime.macro("DEGREE_TO_RADIAN", ((((color_num) * (30))) + (hue))));
        y = (__mame_table_0[(((((4) + (color_intensity))) % 12) + 12) % 12] ?? 0);
        break;
      }
    }
    u = ((sat) * (Math.cos(Number(rad))));
    v = ((sat) * (Math.sin(Number(rad))));
    let R: any = ((((y) + (((Kv) * (v))))) * (255));
    let G: any = ((((y) - (((runtime.add(((((Kb) * (Ku))) * (u)), ((((Kr) * (Kv))) * (v)))) / (((((1) - (Kb))) - (Kr))))))) * (255));
    let B: any = ((((y) + (((Ku) * (u))))) * (255));
    method_apply_color_emphasis_and_clamp(runtime, is_pal_or_dendy, color_emphasis, ({ generatedLValue: true, get: () => R, set: (value: any) => { R = value; } }), ({ generatedLValue: true, get: () => G, set: (value: any) => { G = value; } }), ({ generatedLValue: true, get: () => B, set: (value: any) => { B = value; } }));
    return (__l["rgb_t"] ? __l["rgb_t"](Math.floor(Number(((R) + (0.5)))), Math.floor(Number(((G) + (0.5)))), Math.floor(Number(((B) + (0.5))))) : runtime.macro("rgb_t", Math.floor(Number(((R) + (0.5)))), Math.floor(Number(((G) + (0.5)))), Math.floor(Number(((B) + (0.5))))));
  }

  function method_apply_color_emphasis_and_clamp(runtime: any, is_pal_or_dendy: any, color_emphasis: any, R: any, G: any, B: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    if (is_pal_or_dendy) {
      color_emphasis = ((((((color_emphasis) >>> (2)) & 1) << 2 | (((color_emphasis) >>> (0)) & 1) << 1 | (((color_emphasis) >>> (1)) & 1) << 0)) | 0);
    }
    R.set((__l["std::clamp"] ? __l["std::clamp"](((R.get()) * ((__mame_table_1[(((runtime.add(((color_emphasis) * (3)), 0)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((R.get()) * ((__mame_table_1[(((runtime.add(((color_emphasis) * (3)), 0)) % 24) + 24) % 24] ?? 0))), 0, 255)));
    G.set((__l["std::clamp"] ? __l["std::clamp"](((G.get()) * ((__mame_table_1[(((runtime.add(((color_emphasis) * (3)), 1)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((G.get()) * ((__mame_table_1[(((runtime.add(((color_emphasis) * (3)), 1)) % 24) + 24) % 24] ?? 0))), 0, 255)));
    B.set((__l["std::clamp"] ? __l["std::clamp"](((B.get()) * ((__mame_table_1[(((runtime.add(((color_emphasis) * (3)), 2)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((B.get()) * ((__mame_table_1[(((runtime.add(((color_emphasis) * (3)), 2)) % 24) + 24) % 24] ?? 0))), 0, 255)));
  }

  function method_draw_background(runtime: any, line_priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bitmap = members.m_bitmap ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    const h_m_regs = members.m_regs ?? 0;
    let scroll_x_coarse: any = (((((members.m_refresh_data ?? 0)) & (31))) & 0xff);
    let scroll_y_coarse: any = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (992)), 5)) & 0xff);
    let nametable: any = (((((members.m_refresh_data ?? 0)) & (3072))) & 0xffff);
    let scroll_y_fine: any = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (28672)), 12)) & 0xff);
    let x: any = ((scroll_x_coarse) | 0);
    let tile_index: any = ((runtime.add(((nametable) | (8192)), ((scroll_y_coarse) * (32)))) | 0);
    let start_x: any = (((((((members.m_x_fine ?? 0)) ^ (7))) - (7))) | 0);
    let dest: any = h_m_bitmap["pix&"]((members.m_scanline ?? 0), start_x);
    members.m_tilecount = ((0) | 0);
    while (((Number((members.m_tilecount ?? 0)) < Number(34)) ? 1 : 0)) {
      let index1: any = ((((tile_index) + (x))) | 0);
      let page2: any = ((method_readbyte(runtime, index1)) | 0);
      let pos: any = ((((runtime.shiftRight(((index1) & (896)), 4)) | (runtime.shiftRight(((index1) & (31)), 2)))) | 0);
      let page: any = ((runtime.shiftRight(((index1) & (3072)), 10)) | 0);
      let address: any = ((((960) + (pos))) | 0);
      let color_byte: any = ((method_readbyte(runtime, runtime.add(((((((page) * (1024))) + (address))) & (4095)), 8192))) | 0);
      let color_bits: any = ((runtime.add(runtime.shiftRight(((index1) & (64)), 4), ((index1) & (2)))) | 0);
      if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
        (__l["m_latch"] ? __l["m_latch"]((((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))) : runtime.macro("m_latch", (((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))));
      }
      if (((Number(start_x) < Number(256)) ? 1 : 0)) {
        address = ((runtime.add((((members.m_tile_page ?? 0)) ? (4096) : (0)), ((page2) * (16)))) | 0);
        address = ((((address) + (scroll_y_fine))) | 0);
        (dest = method_draw_tile(runtime, line_priority, color_byte, color_bits, address, start_x, (members.m_back_color ?? 0), dest));
        start_x = ((((start_x) + (8))) | 0);
        x = ((((x) + (1))) | 0);
        if (((Number(x) > Number(31)) ? 1 : 0)) {
          x = ((0) | 0);
          tile_index = ((((tile_index) ^ (1024))) | 0);
        }
      }
      members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
    }
    if (((((h_m_regs[1]) & (2))) ? 0 : 1)) {
      dest = h_m_bitmap["pix&"]((members.m_scanline ?? 0));
      for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        method_draw_back_pen(runtime, dest, (members.m_back_color ?? 0));
        dest = runtime.add(dest, 1);
        runtime.writeIndex(line_priority, i, ((runtime.readIndex(line_priority, i)) ^ (2)));
      }
    }
  }

  function method_draw_tile(runtime: any, line_priority: any, color_byte: any, color_bits: any, address: any, start_x: any, back_pen: any, dest: any): any {
    const members = runtime.members;

    let color: any = ((((runtime.shiftRight(color_byte, color_bits)) & (3))) | 0);
    method_read_tile_plane_data(runtime, address, color);
    for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      let pix: any = ((0) & 0xff);
      (pix = ((method_shift_tile_plane_data(runtime, pix)) & 0xff));
      if ((((((Number(((start_x) + (i))) >= Number(0)) ? 1 : 0)) && (((Number(((start_x) + (i))) < Number(256)) ? 1 : 0))) ? 1 : 0)) {
        method_draw_tile_pixel(runtime, pix, color, back_pen, dest);
        if (pix) {
          runtime.writeIndex(line_priority, ((start_x) + (i)), ((runtime.readIndex(line_priority, ((start_x) + (i)))) | (2)));
        }
      }
      dest.offset += 1;
    }
    return dest;
  }

  function method_read_tile_plane_data(runtime: any, address: any, color: any): any {
    const members = runtime.members;

    const h_m_planebuf = members.m_planebuf ?? 0;
    h_m_planebuf[0] = method_readbyte(runtime, ((address) & (8191)));
    h_m_planebuf[1] = method_readbyte(runtime, ((((address) + (8))) & (8191)));
  }

  function method_shift_tile_plane_data(runtime: any, pix: any): any {
    const members = runtime.members;

    const h_m_planebuf = members.m_planebuf ?? 0;
    pix = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
    h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
    h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
    return pix;
  }

  function method_draw_tile_pixel(runtime: any, pix: any, color: any, back_pen: any, dest: any): any {
    const members = runtime.members;

    let palval: any = ((((pix) ? (runtime.readIndex((members.m_palette_ram ?? 0), ((((((4) * (color))) + (pix))) & (31)))) : (back_pen))) & 0xffff);
    runtime.pointerStore(dest, (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
  }

  function method_apply_grayscale_and_emphasis(runtime: any, color: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    let palval: any = ((color) & 0xffff);
    palval = ((((palval) & (((((h_m_regs[1]) & (1))) ? (48) : (63))))) & 0xffff);
    palval = ((((palval) | (((((h_m_regs[1]) & (224))) << (1))))) & 0xffff);
    return ((palval) & 0xffff);
  }

  function method_draw_back_pen(runtime: any, dest: any, back_pen: any): any {
    const members = runtime.members;

    runtime.pointerStore(dest, (runtime.palette[method_apply_grayscale_and_emphasis(runtime, back_pen)] ?? 0xff000000));
  }

  function method_ppu2c0x_device__draw_background(runtime: any, line_priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bitmap = members.m_bitmap ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    const h_m_regs = members.m_regs ?? 0;
    let scroll_x_coarse: any = (((((members.m_refresh_data ?? 0)) & (31))) & 0xff);
    let scroll_y_coarse: any = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (992)), 5)) & 0xff);
    let nametable: any = (((((members.m_refresh_data ?? 0)) & (3072))) & 0xffff);
    let scroll_y_fine: any = ((runtime.shiftRight((((members.m_refresh_data ?? 0)) & (28672)), 12)) & 0xff);
    let x: any = ((scroll_x_coarse) | 0);
    let tile_index: any = ((runtime.add(((nametable) | (8192)), ((scroll_y_coarse) * (32)))) | 0);
    let start_x: any = (((((((members.m_x_fine ?? 0)) ^ (7))) - (7))) | 0);
    let dest: any = h_m_bitmap["pix&"]((members.m_scanline ?? 0), start_x);
    members.m_tilecount = ((0) | 0);
    while (((Number((members.m_tilecount ?? 0)) < Number(34)) ? 1 : 0)) {
      let index1: any = ((((tile_index) + (x))) | 0);
      let page2: any = ((method_readbyte(runtime, index1)) | 0);
      let pos: any = ((((runtime.shiftRight(((index1) & (896)), 4)) | (runtime.shiftRight(((index1) & (31)), 2)))) | 0);
      let page: any = ((runtime.shiftRight(((index1) & (3072)), 10)) | 0);
      let address: any = ((((960) + (pos))) | 0);
      let color_byte: any = ((method_readbyte(runtime, runtime.add(((((((page) * (1024))) + (address))) & (4095)), 8192))) | 0);
      let color_bits: any = ((runtime.add(runtime.shiftRight(((index1) & (64)), 4), ((index1) & (2)))) | 0);
      if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
        (__l["m_latch"] ? __l["m_latch"]((((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))) : runtime.macro("m_latch", (((((members.m_tile_page ?? 0)) << (10))) | (((page2) << (4))))));
      }
      if (((Number(start_x) < Number(256)) ? 1 : 0)) {
        address = ((runtime.add((((members.m_tile_page ?? 0)) ? (4096) : (0)), ((page2) * (16)))) | 0);
        address = ((((address) + (scroll_y_fine))) | 0);
        (dest = method_draw_tile(runtime, line_priority, color_byte, color_bits, address, start_x, (members.m_back_color ?? 0), dest));
        start_x = ((((start_x) + (8))) | 0);
        x = ((((x) + (1))) | 0);
        if (((Number(x) > Number(31)) ? 1 : 0)) {
          x = ((0) | 0);
          tile_index = ((((tile_index) ^ (1024))) | 0);
        }
      }
      members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
    }
    if (((((h_m_regs[1]) & (2))) ? 0 : 1)) {
      dest = h_m_bitmap["pix&"]((members.m_scanline ?? 0));
      for (let i: any = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
        method_draw_back_pen(runtime, dest, (members.m_back_color ?? 0));
        dest = runtime.add(dest, 1);
        runtime.writeIndex(line_priority, i, ((runtime.readIndex(line_priority, i)) ^ (2)));
      }
    }
  }

  function method_draw_sprite_pixel(runtime: any, sprite_xpos: any, color: any, pixel: any, pixel_data: any, bitmap: any): any {
    const members = runtime.members;

    let palval: any = ((runtime.readIndex((members.m_palette_ram ?? 0), ((((((4) * (color))) | (pixel_data))) & (31)))) & 0xffff);
    bitmap["pix="]((members.m_scanline ?? 0), ((sprite_xpos) + (pixel)), (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
  }

  function method_draw_sprite_pixel_low(runtime: any, bitmap: any, pixel_data: any, pixel: any, sprite_xpos: any, color: any, sprite_index: any, line_priority: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
      if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
        if (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) ? 0 : 1)) {
          method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
        }
        runtime.writeIndex(line_priority, ((sprite_xpos) + (pixel)), ((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) | (1)));
      }
    }
    if ((((((((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) & (2)))) ? 1 : 0)) {
      h_m_regs[2] = ((h_m_regs[2]) | (64));
    }
  }

  function method_is_spritepixel_opaque(runtime: any, pixel_data: any, color: any): any {
    const members = runtime.members;

    if (pixel_data) {
      return 1;
    } else {
      return 0;
    }
  }

  function method_draw_sprite_pixel_high(runtime: any, bitmap: any, pixel_data: any, pixel: any, sprite_xpos: any, color: any, sprite_index: any, line_priority: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
      if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
        if (((((~runtime.readIndex(line_priority, ((sprite_xpos) + (pixel))))) >>> (0)) & 1)) {
          method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
          runtime.writeIndex(line_priority, ((sprite_xpos) + (pixel)), ((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) | (1)));
        }
      }
    }
    if ((((((((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) & (2)))) ? 1 : 0)) {
      h_m_regs[2] = ((h_m_regs[2]) | (64));
    }
  }

  function method_draw_sprites(runtime: any, line_priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_regs = members.m_regs ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    const h_m_bitmap = members.m_bitmap ?? 0;
    let sprite_count: any = ((0) | 0);
    let size: any = ((((((h_m_regs[0]) & (32))) ? (16) : (8))) | 0);
    let first_pixel: any = ((((((h_m_regs[1]) & (4))) ? (0) : (8))) | 0);
    for (let sprite_index: any = ((0) | 0); ((Number(sprite_index) < Number(256)) ? 1 : 0); sprite_index = ((((sprite_index) + (4))) | 0)) {
      let sprite_ypos: any = ((runtime.add(runtime.readIndex((members.m_spriteram ?? 0), sprite_index), 1)) | 0);
      let sprite_xpos: any = ((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (3)))) | 0);
      if ((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((Number(sprite_xpos) === Number(254)) ? 1 : 0))) ? 1 : 0)) {
        sprite_ypos = ((((sprite_ypos) - (1))) | 0);
        if (((runtime.readIndex(line_priority, sprite_xpos)) & (2))) {
          h_m_regs[2] = ((h_m_regs[2]) | (64));
        }
      }
      if ((((((Number(((sprite_ypos) + (size))) <= Number((members.m_scanline ?? 0))) ? 1 : 0)) || (((Number(sprite_ypos) > Number((members.m_scanline ?? 0))) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      let tile: any = ((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (1)))) | 0);
      let color: any = ((runtime.add(((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) & (3)), 4)) | 0);
      let pri: any = (((((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) >>> (5)) & 1)) ? 1 : 0);
      let flipx: any = (((((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) >>> (6)) & 1)) ? 1 : 0);
      let flipy: any = (((((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) >>> (7)) & 1)) ? 1 : 0);
      method_read_extra_sprite_bits(runtime, sprite_index);
      if (((Number(size) === Number(16)) ? 1 : 0)) {
        if ((((tile) >>> (0)) & 1)) {
          tile = ((((tile) & (-2))) | 0);
          tile = ((((tile) | (256))) | 0);
        }
      }
      if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
        (__l["m_latch"] ? __l["m_latch"]((((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))) : runtime.macro("m_latch", (((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))));
      }
      let sprite_line: any = (((((members.m_scanline ?? 0)) - (sprite_ypos))) | 0);
      if (flipy) {
        sprite_line = ((((((size) - (1))) - (sprite_line))) | 0);
      }
      if ((((((Number(size) === Number(16)) ? 1 : 0)) && (((Number(sprite_line) > Number(7)) ? 1 : 0))) ? 1 : 0)) {
        tile = ((((tile) + (1))) | 0);
        sprite_line = ((((sprite_line) - (8))) | 0);
      }
      let index1: any = ((((tile) * (16))) | 0);
      index1 = ((method_apply_sprite_pattern_page(runtime, index1, size)) | 0);
      method_read_sprite_plane_data(runtime, ((index1) + (sprite_line)));
      if (((Number(sprite_count) === Number(8)) ? 1 : 0)) {
        h_m_regs[2] = ((h_m_regs[2]) | (32));
        break;
      }
      sprite_count = ((((sprite_count) + (1))) | 0);
      if (((((h_m_regs[1]) & (16))) ? 0 : 1)) {
        continue;
      }
      if (pri) {
        for (let pixel: any = ((0) | 0); ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
          let pixel_data: any = ((0) & 0xff);
          (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
          if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
            method_draw_sprite_pixel_low(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
          }
        }
      } else {
        for (let pixel: any = ((0) | 0); ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
          let pixel_data: any = ((0) & 0xff);
          (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
          if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
            method_draw_sprite_pixel_high(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
          }
        }
      }
    }
  }

  function method_read_extra_sprite_bits(runtime: any, sprite_index: any): any {
    const members = runtime.members;


  }

  function method_apply_sprite_pattern_page(runtime: any, index1: any, size: any): any {
    const members = runtime.members;

    if (((Number(size) === Number(8)) ? 1 : 0)) {
      index1 = ((((index1) + (((((Number((members.m_sprite_page ?? 0)) === Number(0)) ? 1 : 0)) ? (0) : (4096))))) | 0);
    }
    return index1;
  }

  function method_read_sprite_plane_data(runtime: any, address: any): any {
    const members = runtime.members;

    const h_m_planebuf = members.m_planebuf ?? 0;
    h_m_planebuf[0] = method_readbyte(runtime, ((address) & (8191)));
    h_m_planebuf[1] = method_readbyte(runtime, ((((address) + (8))) & (8191)));
  }

  function method_make_sprite_pixel_data(runtime: any, pixel_data: any, flipx: any): any {
    const members = runtime.members;

    const h_m_planebuf = members.m_planebuf ?? 0;
    if (flipx) {
      pixel_data = ((((((h_m_planebuf[0]) & (1))) | (((((h_m_planebuf[1]) & (1))) << (1))))) & 0xff);
      h_m_planebuf[0] = runtime.shiftRight(h_m_planebuf[0], 1);
      h_m_planebuf[1] = runtime.shiftRight(h_m_planebuf[1], 1);
    } else {
      pixel_data = (((((((h_m_planebuf[0]) >>> (7)) & 1)) | ((((((h_m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
      h_m_planebuf[0] = ((h_m_planebuf[0]) << (1));
      h_m_planebuf[1] = ((h_m_planebuf[1]) << (1));
    }
    return pixel_data;
  }

  function method_ppu2c0x_device__draw_sprites(runtime: any, line_priority: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_regs = members.m_regs ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    const h_m_bitmap = members.m_bitmap ?? 0;
    let sprite_count: any = ((0) | 0);
    let size: any = ((((((h_m_regs[0]) & (32))) ? (16) : (8))) | 0);
    let first_pixel: any = ((((((h_m_regs[1]) & (4))) ? (0) : (8))) | 0);
    for (let sprite_index: any = ((0) | 0); ((Number(sprite_index) < Number(256)) ? 1 : 0); sprite_index = ((((sprite_index) + (4))) | 0)) {
      let sprite_ypos: any = ((runtime.add(runtime.readIndex((members.m_spriteram ?? 0), sprite_index), 1)) | 0);
      let sprite_xpos: any = ((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (3)))) | 0);
      if ((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((Number(sprite_xpos) === Number(254)) ? 1 : 0))) ? 1 : 0)) {
        sprite_ypos = ((((sprite_ypos) - (1))) | 0);
        if (((runtime.readIndex(line_priority, sprite_xpos)) & (2))) {
          h_m_regs[2] = ((h_m_regs[2]) | (64));
        }
      }
      if ((((((Number(((sprite_ypos) + (size))) <= Number((members.m_scanline ?? 0))) ? 1 : 0)) || (((Number(sprite_ypos) > Number((members.m_scanline ?? 0))) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      let tile: any = ((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (1)))) | 0);
      let color: any = ((runtime.add(((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) & (3)), 4)) | 0);
      let pri: any = (((((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) >>> (5)) & 1)) ? 1 : 0);
      let flipx: any = (((((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) >>> (6)) & 1)) ? 1 : 0);
      let flipy: any = (((((runtime.readIndex((members.m_spriteram ?? 0), ((sprite_index) + (2)))) >>> (7)) & 1)) ? 1 : 0);
      method_read_extra_sprite_bits(runtime, sprite_index);
      if (((Number(size) === Number(16)) ? 1 : 0)) {
        if ((((tile) >>> (0)) & 1)) {
          tile = ((((tile) & (-2))) | 0);
          tile = ((((tile) | (256))) | 0);
        }
      }
      if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
        (__l["m_latch"] ? __l["m_latch"]((((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))) : runtime.macro("m_latch", (((((members.m_sprite_page ?? 0)) << (10))) | (((((tile) & (255))) << (4))))));
      }
      let sprite_line: any = (((((members.m_scanline ?? 0)) - (sprite_ypos))) | 0);
      if (flipy) {
        sprite_line = ((((((size) - (1))) - (sprite_line))) | 0);
      }
      if ((((((Number(size) === Number(16)) ? 1 : 0)) && (((Number(sprite_line) > Number(7)) ? 1 : 0))) ? 1 : 0)) {
        tile = ((((tile) + (1))) | 0);
        sprite_line = ((((sprite_line) - (8))) | 0);
      }
      let index1: any = ((((tile) * (16))) | 0);
      index1 = ((method_apply_sprite_pattern_page(runtime, index1, size)) | 0);
      method_read_sprite_plane_data(runtime, ((index1) + (sprite_line)));
      if (((Number(sprite_count) === Number(8)) ? 1 : 0)) {
        h_m_regs[2] = ((h_m_regs[2]) | (32));
        break;
      }
      sprite_count = ((((sprite_count) + (1))) | 0);
      if (((((h_m_regs[1]) & (16))) ? 0 : 1)) {
        continue;
      }
      if (pri) {
        for (let pixel: any = ((0) | 0); ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
          let pixel_data: any = ((0) & 0xff);
          (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
          if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
            method_draw_sprite_pixel_low(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
          }
        }
      } else {
        for (let pixel: any = ((0) | 0); ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((((pixel) + (1))) | 0)) {
          let pixel_data: any = ((0) & 0xff);
          (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
          if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
            method_draw_sprite_pixel_high(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
          }
        }
      }
    }
  }

  function method_palette_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    data = ((((data) & (63))) & 0xff);
    if (((offset) & (3))) {
      runtime.writeIndex(runtime.writableMember("m_palette_ram"), ((offset) & (31)), data);
    } else {
      if (((Number(0) === Number(((offset) & (15)))) ? 1 : 0)) {
        members.m_back_color = ((data) & 0xff);
      }
      runtime.writeIndex(runtime.writableMember("m_palette_ram"), ((offset) & (15)), (runtime.writeIndex(runtime.writableMember("m_palette_ram"), runtime.add(((offset) & (15)), 16), data)));
    }
  }

  function method_palette_read(runtime: any, offset: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    if (((h_m_regs[1]) & (1))) {
      return ((((runtime.readIndex((members.m_palette_ram ?? 0), ((offset) & (31)))) & (48))) & 0xff);
    } else {
      return ((runtime.readIndex((members.m_palette_ram ?? 0), ((offset) & (31)))) & 0xff);
    }
  }

  function method_read(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_security_value = members.m_security_value ?? 0;
    const h_m_regs = members.m_regs ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? 0;
    if (((Number(offset) >= Number(8)) ? 1 : 0)) {
      0;
      offset = ((offset) & (7));
    }
    switch ((((offset) & (7)) as number)) {
      case 2:
      {
        if (h_m_security_value) {
          members.m_data_latch = ((((((h_m_regs[2]) & (192))) | (h_m_security_value))) & 0xff);
        } else {
          members.m_data_latch = ((((h_m_regs[2]) | ((((members.m_data_latch ?? 0)) & (31))))) & 0xff);
        }
        members.m_toggle = ((0) ? 1 : 0);
        if ((((members.m_data_latch ?? 0)) & (128))) {
          h_m_regs[2] = ((h_m_regs[2]) & (96));
        }
        break;
      }
      case 4:
      {
        members.m_data_latch = ((runtime.readIndex((members.m_spriteram ?? 0), h_m_regs[3])) & 0xff);
        break;
      }
      case 7:
      {
        if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
          (__l["m_latch"] ? __l["m_latch"]((((members.m_videomem_addr ?? 0)) & (16383))) : runtime.macro("m_latch", (((members.m_videomem_addr ?? 0)) & (16383))));
        }
        if ((((((Number((members.m_videomem_addr ?? 0)) >= Number(16128)) ? 1 : 0)) && (h_m_paletteram_in_ppuspace)) ? 1 : 0)) {
          members.m_data_latch = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
          members.m_buffered_data = ((method_readbyte(runtime, (((members.m_videomem_addr ?? 0)) & (12287)))) & 0xff);
        } else {
          members.m_data_latch = (((members.m_buffered_data ?? 0)) & 0xff);
          members.m_buffered_data = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
        }
        members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
        break;
      }
      default:
      {
        break;
      }
    }
    return (((members.m_data_latch ?? 0)) & 0xff);
  }

  function method_ppu2c0x_device__read(runtime: any, offset: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_security_value = members.m_security_value ?? 0;
    const h_m_regs = members.m_regs ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? 0;
    if (((Number(offset) >= Number(8)) ? 1 : 0)) {
      0;
      offset = ((offset) & (7));
    }
    switch ((((offset) & (7)) as number)) {
      case 2:
      {
        if (h_m_security_value) {
          members.m_data_latch = ((((((h_m_regs[2]) & (192))) | (h_m_security_value))) & 0xff);
        } else {
          members.m_data_latch = ((((h_m_regs[2]) | ((((members.m_data_latch ?? 0)) & (31))))) & 0xff);
        }
        members.m_toggle = ((0) ? 1 : 0);
        if ((((members.m_data_latch ?? 0)) & (128))) {
          h_m_regs[2] = ((h_m_regs[2]) & (96));
        }
        break;
      }
      case 4:
      {
        members.m_data_latch = ((runtime.readIndex((members.m_spriteram ?? 0), h_m_regs[3])) & 0xff);
        break;
      }
      case 7:
      {
        if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
          (__l["m_latch"] ? __l["m_latch"]((((members.m_videomem_addr ?? 0)) & (16383))) : runtime.macro("m_latch", (((members.m_videomem_addr ?? 0)) & (16383))));
        }
        if ((((((Number((members.m_videomem_addr ?? 0)) >= Number(16128)) ? 1 : 0)) && (h_m_paletteram_in_ppuspace)) ? 1 : 0)) {
          members.m_data_latch = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
          members.m_buffered_data = ((method_readbyte(runtime, (((members.m_videomem_addr ?? 0)) & (12287)))) & 0xff);
        } else {
          members.m_data_latch = (((members.m_buffered_data ?? 0)) & 0xff);
          members.m_buffered_data = ((method_readbyte(runtime, (members.m_videomem_addr ?? 0))) & 0xff);
        }
        members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
        break;
      }
      default:
      {
        break;
      }
    }
    return (((members.m_data_latch ?? 0)) & 0xff);
  }

  function method_write_to_spriteram_with_increment(runtime: any, data: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    if ((((((Number((members.m_scanline ?? 0)) > Number(239)) ? 1 : 0)) || (((((h_m_regs[1]) & (24))) ? 0 : 1))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_spriteram"), h_m_regs[3], data);
      h_m_regs[3] = ((((h_m_regs[3]) + (1))) & (255));
    }
  }

  function method_write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_security_value = members.m_security_value ?? 0;
    const h_m_regs = members.m_regs ?? 0;
    const h_m_line_write_increment_large = members.m_line_write_increment_large ?? 0;
    const h_m_global_refresh_mask = members.m_global_refresh_mask ?? 0;
    const h_m_videoram_addr_mask = members.m_videoram_addr_mask ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    if (((Number(offset) >= Number(8)) ? 1 : 0)) {
      0;
      offset = ((offset) & (7));
    }
    if ((((h_m_security_value) && (((((offset) & (6))) ? 0 : 1))) ? 1 : 0)) {
      offset = ((offset) ^ (1));
    }
    switch ((((offset) & (7)) as number)) {
      case 0:
      {
        h_m_regs[0] = data;
        members.m_refresh_latch = ((((members.m_refresh_latch) & (29695))) | 0);
        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (3))) << (10))))) | 0);
        members.m_tile_page = ((runtime.shiftRight(((data) & (16)), 2)) >>> 0);
        members.m_sprite_page = ((runtime.shiftRight(((data) & (8)), 1)) >>> 0);
        members.m_add = ((((((data) & (4))) ? (h_m_line_write_increment_large) : (1))) | 0);
        break;
      }
      case 1:
      {
        h_m_regs[1] = data;
        break;
      }
      case 3:
      {
        h_m_regs[3] = data;
        break;
      }
      case 4:
      {
        method_write_to_spriteram_with_increment(runtime, data);
        break;
      }
      case 5:
      {
        if ((members.m_toggle ?? 0)) {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (3103))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) << (2))))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (7))) << (12))))) | 0);
        } else {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (((65504) & (h_m_global_refresh_mask))))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (runtime.shiftRight(((data) & (248)), 3)))) | 0);
          members.m_x_fine = ((((data) & (7))) & 0xff);
        }
        members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
        break;
      }
      case 6:
      {
        if ((members.m_toggle ?? 0)) {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (((65280) & (h_m_global_refresh_mask))))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (data))) | 0);
          members.m_refresh_data = (((members.m_refresh_latch ?? 0)) | 0);
          members.m_videomem_addr = (((members.m_refresh_latch ?? 0)) >>> 0);
        } else {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (255))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (runtime.shiftRight(h_m_videoram_addr_mask, 8)))) << (8))))) | 0);
        }
        members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
        break;
      }
      case 7:
      {
        let tempAddr: any = (((((members.m_videomem_addr ?? 0)) & (h_m_videoram_addr_mask))) | 0);
        if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
          (__l["m_latch"] ? __l["m_latch"](({ generatedLValue: true, get: () => tempAddr, set: (value: any) => { tempAddr = ((value) | 0); } })) : runtime.macro("m_latch", ({ generatedLValue: true, get: () => tempAddr, set: (value: any) => { tempAddr = ((value) | 0); } })));
        }
        method_writebyte(runtime, tempAddr, data);
        members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
        break;
      }
      default:
      {
        break;
      }
    }
    members.m_data_latch = ((data) & 0xff);
  }

  function method_writebyte(runtime: any, address: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    ((__l["space().write_byte"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("space().write_byte"))?.(address, data) ?? 0);
  }

  function method_ppu2c0x_device__write(runtime: any, offset: any, data: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_security_value = members.m_security_value ?? 0;
    const h_m_regs = members.m_regs ?? 0;
    const h_m_line_write_increment_large = members.m_line_write_increment_large ?? 0;
    const h_m_global_refresh_mask = members.m_global_refresh_mask ?? 0;
    const h_m_videoram_addr_mask = members.m_videoram_addr_mask ?? 0;
    const h_m_latch = members.m_latch ?? 0;
    if (((Number(offset) >= Number(8)) ? 1 : 0)) {
      0;
      offset = ((offset) & (7));
    }
    if ((((h_m_security_value) && (((((offset) & (6))) ? 0 : 1))) ? 1 : 0)) {
      offset = ((offset) ^ (1));
    }
    switch ((((offset) & (7)) as number)) {
      case 0:
      {
        h_m_regs[0] = data;
        members.m_refresh_latch = ((((members.m_refresh_latch) & (29695))) | 0);
        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (3))) << (10))))) | 0);
        members.m_tile_page = ((runtime.shiftRight(((data) & (16)), 2)) >>> 0);
        members.m_sprite_page = ((runtime.shiftRight(((data) & (8)), 1)) >>> 0);
        members.m_add = ((((((data) & (4))) ? (h_m_line_write_increment_large) : (1))) | 0);
        break;
      }
      case 1:
      {
        h_m_regs[1] = data;
        break;
      }
      case 3:
      {
        h_m_regs[3] = data;
        break;
      }
      case 4:
      {
        method_write_to_spriteram_with_increment(runtime, data);
        break;
      }
      case 5:
      {
        if ((members.m_toggle ?? 0)) {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (3103))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) << (2))))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (7))) << (12))))) | 0);
        } else {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (((65504) & (h_m_global_refresh_mask))))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (runtime.shiftRight(((data) & (248)), 3)))) | 0);
          members.m_x_fine = ((((data) & (7))) & 0xff);
        }
        members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
        break;
      }
      case 6:
      {
        if ((members.m_toggle ?? 0)) {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (((65280) & (h_m_global_refresh_mask))))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (data))) | 0);
          members.m_refresh_data = (((members.m_refresh_latch ?? 0)) | 0);
          members.m_videomem_addr = (((members.m_refresh_latch ?? 0)) >>> 0);
        } else {
          members.m_refresh_latch = ((((members.m_refresh_latch) & (255))) | 0);
          members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (runtime.shiftRight(h_m_videoram_addr_mask, 8)))) << (8))))) | 0);
        }
        members.m_toggle = (((((members.m_toggle ?? 0)) ? 0 : 1)) ? 1 : 0);
        break;
      }
      case 7:
      {
        let tempAddr: any = (((((members.m_videomem_addr ?? 0)) & (h_m_videoram_addr_mask))) | 0);
        if ((((__l["m_latch.isnull"] ? __l["m_latch.isnull"]() : typeof (h_m_latch)?.isnull === 'function' ? (h_m_latch).isnull() : ((__l["m_latch.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_latch.isnull"))?.() ?? 0))) ? 0 : 1)) {
          (__l["m_latch"] ? __l["m_latch"](({ generatedLValue: true, get: () => tempAddr, set: (value: any) => { tempAddr = ((value) | 0); } })) : runtime.macro("m_latch", ({ generatedLValue: true, get: () => tempAddr, set: (value: any) => { tempAddr = ((value) | 0); } })));
        }
        method_writebyte(runtime, tempAddr, data);
        members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? 0)))) >>> 0);
        break;
      }
      default:
      {
        break;
      }
    }
    members.m_data_latch = ((data) & 0xff);
  }

  function method_get_vram_dest(runtime: any): any {
    const members = runtime.members;

    return (((members.m_videomem_addr ?? 0)) & 0xffff);
  }

  function method_set_vram_dest(runtime: any, dest: any): any {
    const members = runtime.members;

    members.m_videomem_addr = ((dest) >>> 0);
  }

  function method_render(runtime: any, bitmap: any, flipx: any, flipy: any, sx: any, sy: any, cliprect: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_bitmap = members.m_bitmap ?? 0;
    if (((Number((typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'function' ? (runtime.dereference(members.m_scanline_timer)).remaining() : typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_scanline_timer)).remaining : runtime.container(members.m_scanline_timer, "remaining"))) !== Number(0)) ? 1 : 0)) {
      method_update_scanline(runtime);
    }
    (__l["copybitmap"] ? __l["copybitmap"](bitmap, h_m_bitmap, flipx, flipy, sx, sy, cliprect) : runtime.macro("copybitmap", bitmap, h_m_bitmap, flipx, flipy, sx, sy, cliprect));
  }

  function method_update_scanline(runtime: any): any {
    const members = runtime.members;

    if (((Number((members.m_scanline ?? 0)) <= Number(239)) ? 1 : 0)) {
      method_update_visible_scanline(runtime);
    }
  }

  function method_update_visible_scanline(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    if (((h_m_regs[1]) & (24))) {
      method_update_visible_enabled_scanline(runtime);
    } else {
      method_update_visible_disabled_scanline(runtime);
    }
    if (((Number((typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'function' ? (runtime.dereference(members.m_scanline_timer)).remaining() : typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_scanline_timer)).remaining : runtime.container(members.m_scanline_timer, "remaining"))) === Number(0)) ? 1 : 0)) {
      method_scanline_increment_fine_ycounter(runtime);
    }
  }

  function method_update_visible_enabled_scanline(runtime: any): any {
    const members = runtime.members;

    if (((Number((typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'function' ? (runtime.dereference(members.m_scanline_timer)).remaining() : typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_scanline_timer)).remaining : runtime.container(members.m_scanline_timer, "remaining"))) === Number(0)) ? 1 : 0)) {
      members.m_refresh_data = ((((members.m_refresh_data) & (-1056))) | 0);
      members.m_refresh_data = ((((members.m_refresh_data) | ((((members.m_refresh_latch ?? 0)) & (1055))))) | 0);
    }
    method_render_scanline(runtime);
  }

  function method_render_scanline(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    let line_priority: any = new Uint8Array(Math.max(0, Number(256)));
    let profile: any = 0;
    (() => { const target = line_priority; const bytes = Number(256); if (Array.isArray(target) || Array.isArray(target?.source)) return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
    members.m_draw_phase = ((0) | 0);
    if (((h_m_regs[1]) & (8))) {
      method_draw_background(runtime, line_priority);
    } else {
      method_draw_background_pen(runtime);
    }
    members.m_draw_phase = ((1) | 0);
    method_draw_sprites(runtime, line_priority);
    members.m_draw_phase = ((0) | 0);
  }

  function method_draw_background_pen(runtime: any): any {
    const members = runtime.members;

    const h_m_bitmap = members.m_bitmap ?? 0;
    for (let i: any = ((0) | 0); ((Number(i) < Number((typeof (members.m_bitmap).width === 'function' ? (members.m_bitmap).width() : typeof (members.m_bitmap).width === 'number' || typeof (members.m_bitmap).width === 'boolean' ? (members.m_bitmap).width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      method_draw_back_pen(runtime, h_m_bitmap["pix&"]((members.m_scanline ?? 0), i), (members.m_back_color ?? 0));
    }
  }

  function method_update_visible_disabled_scanline(runtime: any): any {
    const members = runtime.members;

    const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? 0;
    const h_m_bitmap = members.m_bitmap ?? 0;
    let back_pen: any = (((members.m_back_color ?? 0)) >>> 0);
    if (h_m_paletteram_in_ppuspace) {
      if (((Number((members.m_videomem_addr ?? 0)) >= Number(16128)) ? 1 : 0)) {
        back_pen = ((runtime.readIndex((members.m_palette_ram ?? 0), (((members.m_videomem_addr ?? 0)) & (31)))) >>> 0);
      }
    }
    for (let i: any = ((0) | 0); ((Number(i) < Number((typeof (members.m_bitmap).width === 'function' ? (members.m_bitmap).width() : typeof (members.m_bitmap).width === 'number' || typeof (members.m_bitmap).width === 'boolean' ? (members.m_bitmap).width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
      method_draw_back_pen(runtime, h_m_bitmap["pix&"]((members.m_scanline ?? 0), i), back_pen);
    }
  }

  function method_scanline_increment_fine_ycounter(runtime: any): any {
    const members = runtime.members;

    members.m_refresh_data = ((((members.m_refresh_data) + (4096))) | 0);
    if ((((members.m_refresh_data ?? 0)) & (32768))) {
      let tmp: any = ((runtime.add((((members.m_refresh_data ?? 0)) & (992)), 32)) & 0xffff);
      members.m_refresh_data = ((((members.m_refresh_data) & (31775))) | 0);
      if (((Number(tmp) === Number(960)) ? 1 : 0)) {
        members.m_refresh_data = ((((members.m_refresh_data) ^ (2048))) | 0);
      } else {
        members.m_refresh_data = ((((members.m_refresh_data) | (((tmp) & (992))))) | 0);
      }
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any): any {
    const members = runtime.members;

    method_render(runtime, bitmap, 0, 0, 0, 0, cliprect);
    return 0;
  }

  function method_hblank_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_regs = members.m_regs ?? 0;
    const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
    const h_m_hblank_callback_proc = members.m_hblank_callback_proc ?? 0;
    let blanked: any = ((((Number(((h_m_regs[1]) & (24))) === Number(0)) ? 1 : 0)) ? 1 : 0);
    let vblank: any = (((((((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number((members.m_scanline ?? 0)) < Number((((members.m_scanlines_per_frame ?? 0)) - (1)))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
    if ((((__l["m_hblank_callback_proc.isnull"] ? __l["m_hblank_callback_proc.isnull"]() : typeof (h_m_hblank_callback_proc)?.isnull === 'function' ? (h_m_hblank_callback_proc).isnull() : ((__l["m_hblank_callback_proc.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_hblank_callback_proc.isnull"))?.() ?? 0))) ? 0 : 1)) {
      (__l["m_hblank_callback_proc"] ? __l["m_hblank_callback_proc"](({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value: any) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value: any) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value: any) => { blanked = ((value) ? 1 : 0); } })) : runtime.macro("m_hblank_callback_proc", ({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value: any) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value: any) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value: any) => { blanked = ((value) ? 1 : 0); } })));
    }
    ((runtime.dereference(members.m_hblank_timer)).adjust?.(Infinity) ?? 0);
  }

  function method_nmi_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_int_callback"] ? __l["m_int_callback"](Number(1)) : typeof members.m_int_callback === 'function' ? members.m_int_callback(1) : runtime.invoke("m_int_callback", 1));
    (__l["m_int_callback"] ? __l["m_int_callback"](Number(0)) : typeof members.m_int_callback === 'function' ? members.m_int_callback(0) : runtime.invoke("m_int_callback", 0));
    ((runtime.dereference(members.m_nmi_timer)).adjust?.(Infinity) ?? 0);
  }

  function method_scanline_tick(runtime: any, param: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    const h_m_regs = members.m_regs ?? 0;
    const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
    const h_m_scanline_callback_proc = members.m_scanline_callback_proc ?? 0;
    const h_m_scan_scale = members.m_scan_scale ?? 0;
    let blanked: any = ((((Number(((h_m_regs[1]) & (24))) === Number(0)) ? 1 : 0)) ? 1 : 0);
    let vblank: any = (((((((((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number((members.m_scanline ?? 0)) < Number((((members.m_scanlines_per_frame ?? 0)) - (1)))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
    if ((((__l["m_scanline_callback_proc.isnull"] ? __l["m_scanline_callback_proc.isnull"]() : typeof (h_m_scanline_callback_proc)?.isnull === 'function' ? (h_m_scanline_callback_proc).isnull() : ((__l["m_scanline_callback_proc.isnull"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("m_scanline_callback_proc.isnull"))?.() ?? 0))) ? 0 : 1)) {
      (__l["m_scanline_callback_proc"] ? __l["m_scanline_callback_proc"](({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value: any) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value: any) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value: any) => { blanked = ((value) ? 1 : 0); } })) : runtime.macro("m_scanline_callback_proc", ({ generatedLValue: true, get: () => (members.m_scanline ?? 0), set: (value: any) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value: any) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value: any) => { blanked = ((value) ? 1 : 0); } })));
    }
    method_update_scanline(runtime);
    members.m_scanline = ((((members.m_scanline) + (1))) | 0);
    if (((Number((members.m_scanline ?? 0)) === Number(h_m_vblank_first_scanline)) ? 1 : 0)) {
      h_m_regs[2] = ((h_m_regs[2]) | (128));
      if (((h_m_regs[0]) & (128))) {
        ((runtime.dereference(members.m_nmi_timer)).adjust?.((__l["m_cpu.cycles_to_attotime"] ? __l["m_cpu.cycles_to_attotime"](4) : ((members.m_cpu)?.cycles_to_attotime?.(4) ?? 0))) ?? 0);
      }
    }
    if (((Number((members.m_scanline ?? 0)) === Number((((members.m_scanlines_per_frame ?? 0)) - (1)))) ? 1 : 0)) {
      h_m_regs[2] = ((h_m_regs[2]) & (-225));
    } else {
      if (((Number((members.m_scanline ?? 0)) === Number((members.m_scanlines_per_frame ?? 0))) ? 1 : 0)) {
        if (((blanked) ? 0 : 1)) {
          members.m_refresh_data = (((members.m_refresh_latch ?? 0)) | 0);
        }
        members.m_scanline = ((0) | 0);
      }
    }
    let next_scanline: any = (((((members.m_scanline ?? 0)) + (1))) | 0);
    if (((Number(next_scanline) === Number((members.m_scanlines_per_frame ?? 0))) ? 1 : 0)) {
      next_scanline = ((0) | 0);
    }
    ((runtime.dereference(members.m_hblank_timer)).adjust?.(runtime.divide((__l["m_cpu.cycles_to_attotime"] ? __l["m_cpu.cycles_to_attotime"](260) : ((members.m_cpu)?.cycles_to_attotime?.(260) ?? 0)), 3)) ?? 0);
    ((runtime.dereference(members.m_scanline_timer)).adjust?.(((__l["screen().time_until_pos"] ?? (globalThis as { mamekitMissingCall?: (name: string) => undefined }).mamekitMissingCall?.("screen().time_until_pos"))?.(((next_scanline) * (h_m_scan_scale))) ?? 0)) ?? 0);
  }

  function method_set_cpu_tag(runtime: any, tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cpu.set_tag"] ? __l["m_cpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) : ((members.m_cpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) ?? 0));
  }

  function method_int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_int_callback)).bind === 'function' ? (runtime.dereference(members.m_int_callback)).bind() : typeof (runtime.dereference(members.m_int_callback)).bind === 'number' || typeof (runtime.dereference(members.m_int_callback)).bind === 'boolean' ? (runtime.dereference(members.m_int_callback)).bind : runtime.container(members.m_int_callback, "bind"));
  }

  function method_set_spriteram_value(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
  }

  function method_get_current_scanline(runtime: any): any {
    const members = runtime.members;

    return (members.m_scanline ?? 0);
  }

  function method_set_scanlines_per_frame(runtime: any, scanlines: any): any {
    const members = runtime.members;

    members.m_scanlines_per_frame = ((scanlines) | 0);
  }

  function method_is_sprite_8x16(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((h_m_regs[0]) & (32));
  }

  function method_get_draw_phase(runtime: any): any {
    const members = runtime.members;

    return (members.m_draw_phase ?? 0);
  }

  function method_get_tilenum(runtime: any): any {
    const members = runtime.members;

    return (members.m_tilecount ?? 0);
  }

  function method_in_vblanking(runtime: any): any {
    const members = runtime.members;

    const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
    return ((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0);
  }

  function method_palette_entries(runtime: any): any {
    const members = runtime.members;

    return 512;
  }

  function method_ppu2c0x_device__set_cpu_tag(runtime: any, tag: any): any {
    const members = runtime.members;
    const __l = runtime.links ?? runtime.calls;

    (__l["m_cpu.set_tag"] ? __l["m_cpu.set_tag"]((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) : ((members.m_cpu)?.set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) ?? 0));
  }

  function method_ppu2c0x_device__int_callback(runtime: any): any {
    const members = runtime.members;

    return (typeof (runtime.dereference(members.m_int_callback)).bind === 'function' ? (runtime.dereference(members.m_int_callback)).bind() : typeof (runtime.dereference(members.m_int_callback)).bind === 'number' || typeof (runtime.dereference(members.m_int_callback)).bind === 'boolean' ? (runtime.dereference(members.m_int_callback)).bind : runtime.container(members.m_int_callback, "bind"));
  }

  function method_ppu2c0x_device__set_spriteram_value(runtime: any, offset: any, data: any): any {
    const members = runtime.members;

    runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
  }

  function method_ppu2c0x_device__get_current_scanline(runtime: any): any {
    const members = runtime.members;

    return (members.m_scanline ?? 0);
  }

  function method_ppu2c0x_device__set_scanlines_per_frame(runtime: any, scanlines: any): any {
    const members = runtime.members;

    members.m_scanlines_per_frame = ((scanlines) | 0);
  }

  function method_ppu2c0x_device__is_sprite_8x16(runtime: any): any {
    const members = runtime.members;

    const h_m_regs = members.m_regs ?? 0;
    return ((h_m_regs[0]) & (32));
  }

  function method_ppu2c0x_device__get_draw_phase(runtime: any): any {
    const members = runtime.members;

    return (members.m_draw_phase ?? 0);
  }

  function method_ppu2c0x_device__get_tilenum(runtime: any): any {
    const members = runtime.members;

    return (members.m_tilecount ?? 0);
  }

  function method_ppu2c0x_device__in_vblanking(runtime: any): any {
    const members = runtime.members;

    const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? 0;
    return ((Number((members.m_scanline ?? 0)) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0);
  }

  function method_ppu2c0x_device__palette_entries(runtime: any): any {
    const members = runtime.members;

    return 512;
  }
  return {
    "readbyte": method_readbyte,
    "init_palette_tables": method_init_palette_tables,
    "nespal_to_RGB": method_nespal_to_RGB,
    "draw_background": method_draw_background,
    "read_tile_plane_data": method_read_tile_plane_data,
    "draw_tile_pixel": method_draw_tile_pixel,
    "apply_grayscale_and_emphasis": method_apply_grayscale_and_emphasis,
    "draw_back_pen": method_draw_back_pen,
    "ppu2c0x_device::draw_background": method_ppu2c0x_device__draw_background,
    "draw_sprite_pixel": method_draw_sprite_pixel,
    "draw_sprite_pixel_low": method_draw_sprite_pixel_low,
    "is_spritepixel_opaque": method_is_spritepixel_opaque,
    "draw_sprite_pixel_high": method_draw_sprite_pixel_high,
    "draw_sprites": method_draw_sprites,
    "read_extra_sprite_bits": method_read_extra_sprite_bits,
    "apply_sprite_pattern_page": method_apply_sprite_pattern_page,
    "read_sprite_plane_data": method_read_sprite_plane_data,
    "ppu2c0x_device::draw_sprites": method_ppu2c0x_device__draw_sprites,
    "palette_write": method_palette_write,
    "palette_read": method_palette_read,
    "read": method_read,
    "ppu2c0x_device::read": method_ppu2c0x_device__read,
    "write_to_spriteram_with_increment": method_write_to_spriteram_with_increment,
    "write": method_write,
    "writebyte": method_writebyte,
    "ppu2c0x_device::write": method_ppu2c0x_device__write,
    "get_vram_dest": method_get_vram_dest,
    "set_vram_dest": method_set_vram_dest,
    "render": method_render,
    "update_scanline": method_update_scanline,
    "update_visible_scanline": method_update_visible_scanline,
    "update_visible_enabled_scanline": method_update_visible_enabled_scanline,
    "render_scanline": method_render_scanline,
    "draw_background_pen": method_draw_background_pen,
    "update_visible_disabled_scanline": method_update_visible_disabled_scanline,
    "scanline_increment_fine_ycounter": method_scanline_increment_fine_ycounter,
    "screen_update": method_screen_update,
    "hblank_tick": method_hblank_tick,
    "nmi_tick": method_nmi_tick,
    "scanline_tick": method_scanline_tick,
    "set_cpu_tag": method_set_cpu_tag,
    "int_callback": method_int_callback,
    "set_spriteram_value": method_set_spriteram_value,
    "get_current_scanline": method_get_current_scanline,
    "set_scanlines_per_frame": method_set_scanlines_per_frame,
    "is_sprite_8x16": method_is_sprite_8x16,
    "get_draw_phase": method_get_draw_phase,
    "get_tilenum": method_get_tilenum,
    "in_vblanking": method_in_vblanking,
    "palette_entries": method_palette_entries,
    "ppu2c0x_device::set_cpu_tag": method_ppu2c0x_device__set_cpu_tag,
    "ppu2c0x_device::int_callback": method_ppu2c0x_device__int_callback,
    "ppu2c0x_device::set_spriteram_value": method_ppu2c0x_device__set_spriteram_value,
    "ppu2c0x_device::get_current_scanline": method_ppu2c0x_device__get_current_scanline,
    "ppu2c0x_device::set_scanlines_per_frame": method_ppu2c0x_device__set_scanlines_per_frame,
    "ppu2c0x_device::is_sprite_8x16": method_ppu2c0x_device__is_sprite_8x16,
    "ppu2c0x_device::get_draw_phase": method_ppu2c0x_device__get_draw_phase,
    "ppu2c0x_device::get_tilenum": method_ppu2c0x_device__get_tilenum,
    "ppu2c0x_device::in_vblanking": method_ppu2c0x_device__in_vblanking,
    "ppu2c0x_device::palette_entries": method_ppu2c0x_device__palette_entries
  };
})() as GeneratedDeviceMethodMap;
definition.compiledMethodLinks = ["DEGREE_TO_RADIAN","copybitmap","m_cpu.cycles_to_attotime","m_cpu.set_tag","m_hblank_callback_proc","m_hblank_callback_proc.isnull","m_int_callback","m_latch","m_latch.isnull","m_scanline_callback_proc","m_scanline_callback_proc.isnull","rgb_t","screen","screen().time_until_pos","space","space().read_byte","space().write_byte","std::clamp","std::forward"];

export const device = definition;
export default device;
