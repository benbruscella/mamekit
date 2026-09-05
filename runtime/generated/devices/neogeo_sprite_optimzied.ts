// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './neogeo_sprite_optimzied.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_draw_fixed_layer(runtime: any, bitmap: any, scanline: any) {
    const members = runtime.members;
    const h_m_bppshift = members.m_bppshift ?? runtime.member("m_bppshift");
    let gfx_base: any = (((members.m_fixed_layer_source ?? runtime.member("m_fixed_layer_source"))) ? ((members.m_region_fixed ?? runtime.member("m_region_fixed"))) : ((typeof (runtime.dereference(members.m_region_fixedbios)).base === 'function' ? (runtime.dereference(members.m_region_fixedbios)).base() : typeof (runtime.dereference(members.m_region_fixedbios)).base === 'number' || typeof (runtime.dereference(members.m_region_fixedbios)).base === 'boolean' ? (runtime.dereference(members.m_region_fixedbios)).base : runtime.container(members.m_region_fixedbios, "base"))));
    let addr_mask: any = (((((((members.m_fixed_layer_source ?? runtime.member("m_fixed_layer_source"))) ? ((members.m_region_fixed_size ?? runtime.member("m_region_fixed_size"))) : ((members.m_region_fixedbios).length))) - (1))) >>> 0);
    let video_data: any = runtime.addressOf((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), ((28672) | (((scanline) >>> (3)))));
    let pixel_addr: any = bitmap["pix&"](scanline, 28);
    for (let x: any = 0; ((Number(x) < Number(40)) ? 1 : 0); x = ((x) + (1))) {
      let code_and_palette: any = (((video_data).source[(video_data).offset]) & 0xffff);
      let code: any = ((((code_and_palette) & (4095))) & 0xffff);
      let gfx_offset: any = ((((((code) << (5))) | (((scanline) & (7))))) & (addr_mask));
      let char_pens: any = runtime.addressOf((members.m_pens ?? runtime.member("m_pens")), ((((code_and_palette) >>> (12))) << (h_m_bppshift)));
      (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (16)), gfx_base, char_pens));
      (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (24)), gfx_base, char_pens));
      (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (0)), gfx_base, char_pens));
      (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (8)), gfx_base, char_pens));
      video_data = runtime.addressOf(video_data, 32);
    }
  }

  function method_draw_fixed_layer_2pixels(runtime: any, pixel_addr: any, offset: any, gfx_base: any, char_pens: any) {
    const members = runtime.members;
    let data: any = ((runtime.readIndex(gfx_base, offset)) & 0xff);
    if (((data) & (15))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
    }
    pixel_addr.offset += 1;
    if (((data) & (240))) {
      runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((((data) & (240))) >>> (4))));
    }
    pixel_addr.offset += 1;
    return pixel_addr;
  }

  function method_draw_sprites(runtime: any, bitmap: any, scanline: any) {
    const members = runtime.members;
    const h_m_region_zoomy = members.m_region_zoomy ?? runtime.member("m_region_zoomy");
    const h_m_bppshift = members.m_bppshift ?? runtime.member("m_bppshift");
    let max_sprite_index: any = 0;
    let y: any = 0;
    let x: any = 0;
    let rows: any = 0;
    let zoom_y: any = 0;
    let zoom_x: any = 0;
    let sprite_list: any = 0;
    if ((((scanline) >>> (0)) & 1)) {
      sprite_list = runtime.addressOf((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), 34432);
    } else {
      sprite_list = runtime.addressOf((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), 34304);
    }
    for (max_sprite_index = ((96) - (1)); ((Number(max_sprite_index) >= Number(0)) ? 1 : 0); max_sprite_index = ((max_sprite_index) - (1))) {
      if (((Number(runtime.readIndex(sprite_list, max_sprite_index)) !== Number(0)) ? 1 : 0)) {
        break;
      }
    }
    if (((Number(max_sprite_index) !== Number(((96) - (1)))) ? 1 : 0)) {
      max_sprite_index = ((max_sprite_index) + (1));
    }
    for (let sprite_index: any = 0; ((Number(sprite_index) <= Number(max_sprite_index)) ? 1 : 0); sprite_index = ((sprite_index) + (1))) {
      let sprite_number: any = ((((runtime.readIndex(sprite_list, sprite_index)) & (511))) & 0xffff);
      let y_control: any = ((runtime.readIndex((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), ((33280) | (sprite_number)))) & 0xffff);
      let zoom_control: any = ((runtime.readIndex((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), ((32768) | (sprite_number)))) & 0xffff);
      if ((((y_control) >>> (6)) & 1)) {
        x = ((runtime.add(((x) + (zoom_x)), 1)) & (511));
        zoom_x = ((((zoom_control) >>> (8))) & (15));
      } else {
        y = ((512) - (((y_control) >>> (7))));
        x = ((runtime.readIndex((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), ((33792) | (sprite_number)))) >>> (7));
        zoom_y = ((zoom_control) & (255));
        zoom_x = ((((zoom_control) >>> (8))) & (15));
        rows = ((y_control) & (63));
      }
      if ((((((Number(x) >= Number(320)) ? 1 : 0)) && (((Number(x) <= Number(496)) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      if (method_sprite_on_scanline(runtime, scanline, y, rows)) {
        let sprite_line: any = ((((scanline) - (y))) & (511));
        let zoom_line: any = ((sprite_line) & (255));
        let invert: any = (((((sprite_line) >>> (8)) & 1)) ? 1 : 0);
        if (invert) {
          zoom_line = ((zoom_line) ^ (255));
        }
        if (((Number(rows) > Number(32)) ? 1 : 0)) {
          zoom_line = ((zoom_line) % (((((zoom_y) + (1))) << (1))));
          if (((Number(zoom_line) > Number(zoom_y)) ? 1 : 0)) {
            zoom_line = ((((((((zoom_y) + (1))) << (1))) - (1))) - (zoom_line));
            invert = ((((invert) ? 0 : 1)) ? 1 : 0);
          }
        }
        let sprite_y_and_tile: any = ((runtime.readIndex(h_m_region_zoomy, ((((zoom_y) << (8))) | (zoom_line)))) & 0xff);
        let sprite_y: any = ((sprite_y_and_tile) & (15));
        let tile: any = ((sprite_y_and_tile) >>> (4));
        if (invert) {
          sprite_y = ((sprite_y) ^ (15));
          tile = ((tile) ^ (31));
        }
        let attr_and_code_offs: any = ((((sprite_number) << (6))) | (((tile) << (1))));
        let attr: any = ((runtime.readIndex((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), ((attr_and_code_offs) + (1)))) & 0xffff);
        let code: any = ((((((((attr) << (12))) & (983040))) | (runtime.readIndex((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), attr_and_code_offs)))) >>> 0);
        if ((((members.m_auto_animation_disabled ?? runtime.member("m_auto_animation_disabled"))) ? 0 : 1)) {
          if ((((attr) >>> (3)) & 1)) {
            code = ((((((code) & ((~7)))) | ((((members.m_auto_animation_counter ?? runtime.member("m_auto_animation_counter"))) & (7))))) >>> 0);
          } else {
            if ((((attr) >>> (2)) & 1)) {
              code = ((((((code) & ((~3)))) | ((((members.m_auto_animation_counter ?? runtime.member("m_auto_animation_counter"))) & (3))))) >>> 0);
            }
          }
        }
        if ((((attr) >>> (1)) & 1)) {
          sprite_y = ((sprite_y) ^ (15));
        }
        let zoom_x_table: any = ((([128, 2176, 2184, 10376, 10378, 10890, 10922, 43690, 43754, 47850, 47851, 48107, 48111, 64495, 64511, 65535][(((zoom_x) % 16) + 16) % 16] ?? 0)) & 0xffff);
        let gfx_base: any = ((((((code) << (8))) | (((sprite_y) << (4))))) & ((members.m_sprite_gfx_address_mask ?? runtime.member("m_sprite_gfx_address_mask"))));
        let line_pens: any = runtime.addressOf((members.m_pens ?? runtime.member("m_pens")), ((((attr) >>> (8))) << (h_m_bppshift)));
        let x_inc: any = 0;
        if ((((attr) >>> (0)) & 1)) {
          gfx_base = ((gfx_base) + (15));
          x_inc = (-1);
        } else {
          x_inc = 1;
        }
        if (((Number(x) <= Number(496)) ? 1 : 0)) {
          let pixel_addr: any = bitmap["pix&"](scanline, ((x) + (28)));
          for (let i: any = 0; ((Number(i) < Number(16)) ? 1 : 0); i = ((i) + (1))) {
            if ((((zoom_x_table) >>> (15)) & 1)) {
              method_draw_pixel(runtime, gfx_base, pixel_addr, line_pens);
              pixel_addr = ({ ...(pixel_addr), offset: ((pixel_addr).offset + (1)) });
            }
            zoom_x_table = ((((zoom_x_table) << (1))) & 0xffff);
            if (((Number(zoom_x_table) === Number(0)) ? 1 : 0)) {
              break;
            }
            gfx_base = ((gfx_base) + (x_inc));
          }
        } else {
          let x_save: any = x;
          let pixel_addr: any = bitmap["pix&"](scanline, 28);
          for (let i: any = 0; ((Number(i) < Number(16)) ? 1 : 0); i = ((i) + (1))) {
            if ((((zoom_x_table) >>> (15)) & 1)) {
              if (((Number(x) >= Number(512)) ? 1 : 0)) {
                method_draw_pixel(runtime, gfx_base, pixel_addr, line_pens);
                pixel_addr = ({ ...(pixel_addr), offset: ((pixel_addr).offset + (1)) });
              }
              x = ((x) + (1));
            }
            zoom_x_table = ((((zoom_x_table) << (1))) & 0xffff);
            if (((Number(zoom_x_table) === Number(0)) ? 1 : 0)) {
              break;
            }
            gfx_base = ((gfx_base) + (x_inc));
          }
          x = x_save;
        }
      }
    }
  }

  function method_sprite_on_scanline(runtime: any, scanline: any, y: any, rows: any) {
    const members = runtime.members;
    return ((((((((Number(rows) === Number(0)) ? 1 : 0)) || (((Number(rows) >= Number(32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
  }

  function method_draw_pixel(runtime: any, romaddr: any, dst: any, line_pens: any) {
    const members = runtime.members;
    let src: any = runtime.addressOf((members.m_region_sprites ?? runtime.member("m_region_sprites")), ((((((((romaddr) & ((~255)))) >>> (1))) | (((((((romaddr) & (8))) ^ (8))) << (3))))) | (((((romaddr) & (240))) >>> (2)))));
    let x: any = ((romaddr) & (7));
    let gfx: any = (((((((((((((runtime.readIndex(src, 3)) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, 1)) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, 2)) >>> (x)) & 1)) << (1))))) | ((((runtime.readIndex(src, 0)) >>> (x)) & 1)))) & 0xff);
    if (gfx) {
      runtime.pointerStore(dst, runtime.readIndex(line_pens, gfx));
    }
  }

  function method_auto_animation_timer_callback(runtime: any, param: any) {
    const members = runtime.members;
    if (((Number((members.m_auto_animation_frame_counter ?? runtime.member("m_auto_animation_frame_counter"))) === Number(0)) ? 1 : 0)) {
      members.m_auto_animation_frame_counter = (((members.m_auto_animation_speed ?? runtime.member("m_auto_animation_speed"))) & 0xff);
      members.m_auto_animation_counter = ((((members.m_auto_animation_counter) + (1))) & 0xff);
    } else {
      members.m_auto_animation_frame_counter = (((((members.m_auto_animation_frame_counter ?? runtime.member("m_auto_animation_frame_counter"))) - (1))) & 0xff);
    }
    ((runtime.dereference(members.m_auto_animation_timer)).adjust?.((runtime.calls["screen().time_until_pos"]?.(256) ?? 0)) ?? 0);
  }

  function method_parse_sprites(runtime: any, scanline: any) {
    const members = runtime.members;
    let y: any = 0;
    let rows: any = 0;
    let sprite_list: any = 0;
    let active_sprite_count: any = 0;
    if ((((scanline) >>> (0)) & 1)) {
      sprite_list = runtime.addressOf((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), 34432);
    } else {
      sprite_list = runtime.addressOf((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), 34304);
    }
    for (let sprite_number: any = ((0) & 0xffff); ((Number(sprite_number) < Number(381)) ? 1 : 0); sprite_number = ((((sprite_number) + (1))) & 0xffff)) {
      let y_control: any = ((runtime.readIndex((members.m_videoram_drawsource ?? runtime.member("m_videoram_drawsource")), ((33280) | (sprite_number)))) & 0xffff);
      if (((((~y_control)) >>> (6)) & 1)) {
        y = ((512) - (((y_control) >>> (7))));
        rows = ((y_control) & (63));
      }
      if (((Number(rows) === Number(0)) ? 1 : 0)) {
        continue;
      }
      if (((method_sprite_on_scanline(runtime, scanline, y, rows)) ? 0 : 1)) {
        continue;
      }
      runtime.pointerStore(sprite_list, sprite_number);
      sprite_list = ({ ...(sprite_list), offset: ((sprite_list).offset + (1)) });
      active_sprite_count = ((active_sprite_count) + (1));
      if (((Number(active_sprite_count) === Number(96)) ? 1 : 0)) {
        break;
      }
    }
    (() => { const target = sprite_list; const bytes = Number(((((runtime.readIndex(sprite_list, 0))?.byteLength ?? 1)) * (runtime.add(((96) - (active_sprite_count)), 1)))); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
  }

  function method_optimize_helper(runtime: any, spritegfx: any, region_sprites: any, region_sprites_size: any) {
    const members = runtime.members;
    let mask: any = ((method_get_region_mask(runtime, region_sprites, region_sprites_size)) >>> 0);
    ((runtime.dereference(spritegfx)).resize?.(((mask) + (1))) ?? 0);
    let src: any = region_sprites;
    let dest: any = runtime.addressOf(spritegfx, 0);
    for (let i: any = 0; ((Number(i) < Number(region_sprites_size)) ? 1 : 0); i = ((i) + (128)), src = ({ ...(src), offset: ((src).offset + (128)) })) {
      for (let y: any = 0; ((Number(y) < Number(16)) ? 1 : 0); y = ((y) + (1))) {
        for (let x: any = 0; ((Number(x) < Number(8)) ? 1 : 0); x = ((x) + (1))) {
          runtime.pointerStore((() => { const previous = dest; dest = ({ ...(dest), offset: ((dest).offset + (1)) }); return previous; })(), (((((((((((runtime.readIndex(src, ((67) | (((y) << (2)))))) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, ((65) | (((y) << (2)))))) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, ((66) | (((y) << (2)))))) >>> (x)) & 1)) << (1))))) | ((((((runtime.readIndex(src, ((64) | (((y) << (2)))))) >>> (x)) & 1)) << (0)))));
        }
        for (let x: any = 0; ((Number(x) < Number(8)) ? 1 : 0); x = ((x) + (1))) {
          runtime.pointerStore((() => { const previous = dest; dest = ({ ...(dest), offset: ((dest).offset + (1)) }); return previous; })(), (((((((((((runtime.readIndex(src, ((3) | (((y) << (2)))))) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, ((1) | (((y) << (2)))))) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, ((2) | (((y) << (2)))))) >>> (x)) & 1)) << (1))))) | ((((((runtime.readIndex(src, ((0) | (((y) << (2)))))) >>> (x)) & 1)) << (0)))));
        }
      }
    }
    return mask;
  }

  function method_get_region_mask(runtime: any, rgn: any, rgn_size: any) {
    const members = runtime.members;
    let mask: any = ((4294967295) >>> 0);
    let len: any = ((rgn_size) >>> 0);
    for (let bit: any = ((2147483648) >>> 0); ((Number(bit) !== Number(0)) ? 1 : 0); bit = ((((bit) >>> (1))) >>> 0)) {
      if (((((((len) * (2))) - (1))) & (bit))) {
        break;
      }
      mask = ((((mask) >>> (1))) >>> 0);
    }
    return mask;
  }
  return {
    "draw_fixed_layer": method_draw_fixed_layer,
    "draw_sprites": method_draw_sprites,
    "sprite_on_scanline": method_sprite_on_scanline,
    "draw_pixel": method_draw_pixel,
    "auto_animation_timer_callback": method_auto_animation_timer_callback,
    "parse_sprites": method_parse_sprites,
    "optimize_helper": method_optimize_helper,
    "get_region_mask": method_get_region_mask
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
