// GENERATED from MAME device source; do not edit.
import type {
  GeneratedDeviceDefinition,
  GeneratedDeviceMethodMap,
} from '../../core/generated-device.js';
import deviceData from './dmg_ppu.device.ir.json' with { type: 'json' };

const definition = deviceData as unknown as GeneratedDeviceDefinition;
definition.compiledMethods = (() => {
  function method_videoptr_restore(runtime: any) {
    const members = runtime.members;
    const h_m_layer = members.m_layer ?? runtime.member("m_layer");
    runtime.readIndex(h_m_layer, 0).bg_map = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_bgdtab_offs ?? runtime.member("m_gb_bgdtab_offs"))));
    runtime.readIndex(h_m_layer, 0).bg_tiles = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_chrgen_offs ?? runtime.member("m_gb_chrgen_offs"))));
    runtime.readIndex(h_m_layer, 1).bg_map = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_wndtab_offs ?? runtime.member("m_gb_wndtab_offs"))));
    runtime.readIndex(h_m_layer, 1).bg_tiles = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_chrgen_offs ?? runtime.member("m_gb_chrgen_offs"))));
  }

  function method_update_line_state(runtime: any, cycles: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    while ((((((Number(cycles) > Number(0)) ? 1 : 0)) && (((Number(h_m_line.pixels_drawn) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
      if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
        h_m_line.scrollx_delay = ((((h_m_line.scrollx_delay) - (1))) & 0xff);
        h_m_line.scrollx_to_apply = ((((h_m_line.scrollx_to_apply) + (1))) & 0xff);
      }
      if (h_m_line.drawing) {
        if (((Number(h_m_line.scrollx_to_apply) > Number(0)) ? 1 : 0)) {
          0;
          if (((h_m_line.window_active) ? 0 : 1)) {
            h_m_line.shift_register = ((((h_m_line.shift_register) << (2))) & 0xffff);
          }
          h_m_line.window_compare_position = ((((h_m_line.window_compare_position) - (1))) & 0xffff);
          h_m_line.scrollx_to_apply = ((((h_m_line.scrollx_to_apply) - (1))) & 0xff);
          members.m_cycles_left = ((members.m_cycles_left) + (1));
          members.m_scrollx_adjust = ((((members.m_scrollx_adjust) + (1))) | 0);
        } else {
          if ((((((h_m_line.starting) ? 0 : 1)) && (((Number(h_m_line.tile_cycle) < Number(8)) ? 1 : 0))) ? 1 : 0)) {
            if (((Number(h_m_line.pixels_drawn) < Number(8)) ? 1 : 0)) {
              0;
            }
            method_plot_pixel(runtime, h_m_line.pixels_drawn, (members.m_current_line ?? runtime.member("m_current_line")), runtime.readIndex((members.m_gb_bpal ?? runtime.member("m_gb_bpal")), ((h_m_line.shift_register) >>> (14))));
            runtime.writeIndex(runtime.writableMember("m_bg_zbuf"), h_m_line.pixels_drawn, ((h_m_line.shift_register) >>> (14)));
            h_m_line.shift_register = ((((h_m_line.shift_register) << (2))) & 0xffff);
            h_m_line.pixels_drawn = ((((h_m_line.pixels_drawn) + (1))) & 0xff);
            if ((((((Number(h_m_line.pixels_drawn) === Number(160)) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (2)))) ? 1 : 0)) {
              method_update_sprites(runtime);
            }
          }
        }
      }
      let next_tile_cycle: any = ((((h_m_line.tile_cycle) + (1))) & 0xff);
      switch (h_m_line.tile_cycle) {
        case 0:
        {
          if ((((((h_m_line.window_active) ? 0 : 1)) && (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (1))) ? 0 : 1))) ? 1 : 0)) {
            h_m_line.shift_register = ((0) & 0xffff);
          } else {
            h_m_line.shift_register = ((runtime.wide("|", runtime.wide("&", runtime.wide(">>", runtime.wide("*", runtime.wide("&", runtime.wide("*", h_m_line.plane0, 72340172838076673n), 9241421688590303745n), 72624976668147841n), 49), 21845), runtime.wide("&", runtime.wide(">>", runtime.wide("*", runtime.wide("&", runtime.wide("*", h_m_line.plane1, 72340172838076673n), 9241421688590303745n), 72624976668147841n), 48), 43690))) & 0xffff);
          }
          if (((Number(h_m_line.pixels_drawn) < Number(8)) ? 1 : 0)) {
            0;
          }
          if (((Number(h_m_line.sequence_counter) >= Number(2)) ? 1 : 0)) {
            if (((h_m_line.starting) ? 0 : 1)) {
              h_m_line.drawing = ((1) & 0xff);
            }
          } else {
            if (((Number(h_m_line.sequence_counter) === Number(1)) ? 1 : 0)) {
              h_m_line.window_compare_position = ((0) & 0xffff);
            }
          }
          h_m_line.sequence_counter = ((((h_m_line.sequence_counter) + (1))) & 0xff);
          if (h_m_line.window_active) {
            h_m_line.y = (((members.m_window_lines_drawn ?? runtime.member("m_window_lines_drawn"))) & 0xff);
            h_m_line.pattern_address = (((((((members.m_gb_wndtab_offs ?? runtime.member("m_gb_wndtab_offs"))) | (((((h_m_line.y) & (248))) << (2))))) | (((h_m_line.tile_count) & (31))))) & 0xffff);
          } else {
            h_m_line.y = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 2)) + ((members.m_current_line ?? runtime.member("m_current_line"))))) & 0xff);
            h_m_line.pattern_address = (((((((members.m_gb_bgdtab_offs ?? runtime.member("m_gb_bgdtab_offs"))) | (((((h_m_line.y) & (248))) << (2))))) | (((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) >>> (3))) + (h_m_line.tile_count))) & (31))))) & 0xffff);
          }
          h_m_line.tile_count = ((((h_m_line.tile_count) + (1))) & 0xff);
          break;
        }
        case 1:
        {
          h_m_line.pattern = ((((runtime.readIndex((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get")), h_m_line.pattern_address)) ^ ((members.m_gb_tile_no_mod ?? runtime.member("m_gb_tile_no_mod"))))) & 0xff);
          if (((Number(h_m_line.tile_count) < Number(8)) ? 1 : 0)) {
            0;
          }
          break;
        }
        case 2:
        {
          h_m_line.tile_address = (((((members.m_gb_chrgen_offs ?? runtime.member("m_gb_chrgen_offs"))) + (((((h_m_line.pattern) << (4))) | (((((h_m_line.y) & (7))) << (1))))))) & 0xffff);
          if (((Number(h_m_line.tile_count) < Number(8)) ? 1 : 0)) {
            0;
          }
          break;
        }
        case 3:
        {
          h_m_line.plane0 = ((runtime.readIndex((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get")), h_m_line.tile_address)) & 0xff);
          if ((((h_m_line.starting) && (((h_m_line.window_active) ? 0 : 1))) ? 1 : 0)) {
            h_m_line.scrollx = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) & 0xff);
          }
          break;
        }
        case 4:
        {
          h_m_line.tile_address = ((((h_m_line.tile_address) + (1))) & 0xffff);
          break;
        }
        case 5:
        {
          h_m_line.plane1 = ((runtime.readIndex((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get")), h_m_line.tile_address)) & 0xff);
          if (h_m_line.starting) {
            if (h_m_line.window_active) {
              h_m_line.sequence_counter = ((2) & 0xff);
              if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
              }
            } else {
              h_m_line.tile_count = ((0) & 0xff);
              h_m_line.scrollx_delay = ((((h_m_line.scrollx) & (7))) & 0xff);
            }
            h_m_line.starting = ((0) & 0xff);
            next_tile_cycle = ((0) & 0xff);
          }
          break;
        }
        case 6:
        {
          break;
        }
        case 7:
        {
          if (((Number(h_m_line.sprite_delay_cycles) === Number(0)) ? 1 : 0)) {
            next_tile_cycle = ((runtime.andAssign(next_tile_cycle, 7)) & 0xff);
          }
          break;
        }
        case 8:
        {
          h_m_line.sprite_delay_cycles = ((((h_m_line.sprite_delay_cycles) - (1))) & 0xff);
          members.m_cycles_left = ((members.m_cycles_left) + (1));
          members.m_sprite_cycles = ((((members.m_sprite_cycles) + (1))) | 0);
          next_tile_cycle = ((((((Number(h_m_line.sprite_delay_cycles) === Number(0)) ? 1 : 0)) ? (0) : (8))) & 0xff);
          break;
        }
        case 9:
        {
          0;
          h_m_line.window_compare_position = ((((h_m_line.window_compare_position) - (1))) & 0xffff);
          h_m_line.scrollx_to_apply = ((((h_m_line.scrollx_to_apply) - (1))) & 0xff);
          members.m_cycles_left = ((members.m_cycles_left) + (1));
          members.m_scrollx_adjust = ((((members.m_scrollx_adjust) + (1))) | 0);
          next_tile_cycle = ((((((Number(h_m_line.scrollx_to_apply) === Number(0)) ? 1 : 0)) ? (0) : (9))) & 0xff);
          break;
        }
        default:
        {
          next_tile_cycle = ((runtime.andAssign(next_tile_cycle, 7)) & 0xff);
          break;
        }
      }
      h_m_line.tile_cycle = ((next_tile_cycle) & 0xff);
      cycles = ((cycles) - (1));
      method_check_start_of_window(runtime);
    }
    if ((((((Number(h_m_line.pixels_drawn) === Number(160)) ? 1 : 0)) && (h_m_line.window_active)) ? 1 : 0)) {
      members.m_window_lines_drawn = ((((members.m_window_lines_drawn) + (1))) | 0);
      h_m_line.pixels_drawn = ((((h_m_line.pixels_drawn) + (1))) & 0xff);
      h_m_line.window_active = ((0) & 0xff);
    }
  }

  function method_plot_pixel(runtime: any, x: any, y: any, color: any) {
    const members = runtime.members;
    const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
    h_m_bitmap["pix="](y, x, color);
  }

  function method_update_sprites(runtime: any) {
    const members = runtime.members;
    let height: any = ((0) & 0xff);
    let tilemask: any = ((0) & 0xff);
    let line: any = ((0) & 0xff);
    let vram: any = 0;
    let yindex: any = 0;
    if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (4))) {
      height = ((16) & 0xff);
      tilemask = ((254) & 0xff);
    } else {
      height = ((8) & 0xff);
      tilemask = ((255) & 0xff);
    }
    yindex = (members.m_current_line ?? runtime.member("m_current_line"));
    line = (((((members.m_current_line ?? runtime.member("m_current_line"))) + (16))) & 0xff);
    vram = (typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"));
    for (let i: any = (((members.m_sprCount ?? runtime.member("m_sprCount"))) - (1)); ((Number(i) >= Number(0)) ? 1 : 0); i = ((i) - (1))) {
      let oam_address: any = ((runtime.readIndex((members.m_sprite ?? runtime.member("m_sprite")), i)) * (4));
      let spal: any = ((((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((oam_address) + (3)))) & (16))) ? ((members.m_gb_spal1 ?? runtime.member("m_gb_spal1"))) : ((members.m_gb_spal0 ?? runtime.member("m_gb_spal0"))));
      let xindex: any = ((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((oam_address) + (1)))) - (8));
      let adr: any = ((((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((oam_address) + (2)))) & (tilemask))) * (16));
      if ((((((Number(xindex) < Number((-7))) ? 1 : 0)) || (((Number(xindex) > Number(160)) ? 1 : 0))) ? 1 : 0)) {
        continue;
      }
      if (((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((oam_address) + (3)))) & (64))) {
        adr = ((adr) + (((runtime.add(((((height) - (1))) - (line)), runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), oam_address))) * (2))));
      } else {
        adr = ((adr) + (((((line) - (runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), oam_address)))) * (2))));
      }
      let data: any = ((((((runtime.readIndex(vram, ((adr) + (1)))) << (8))) | (runtime.readIndex(vram, adr)))) & 0xffff);
      switch (((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((oam_address) + (3)))) & (160))) {
        case 160:
        {
          for (let bit: any = 0; ((Number(bit) < Number(8)) ? 1 : 0); bit = ((bit) + (1)), xindex = ((xindex) + (1))) {
            let colour: any = ((((((data) & (256))) ? (2) : (0))) | (((((data) & (1))) ? (1) : (0))));
            if ((((((((((colour) && (((runtime.readIndex((members.m_bg_zbuf ?? runtime.member("m_bg_zbuf")), xindex)) ? 0 : 1))) ? 1 : 0)) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
              method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
            }
            data = ((((data) >>> (1))) & 0xffff);
          }
          break;
        }
        case 32:
        {
          for (let bit: any = 0; ((Number(bit) < Number(8)) ? 1 : 0); bit = ((bit) + (1)), xindex = ((xindex) + (1))) {
            let colour: any = ((((((data) & (256))) ? (2) : (0))) | (((((data) & (1))) ? (1) : (0))));
            if (((((((colour) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
              method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
            }
            data = ((((data) >>> (1))) & 0xffff);
          }
          break;
        }
        case 128:
        {
          for (let bit: any = 0; (((((Number(bit) < Number(8)) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0); bit = ((bit) + (1)), xindex = ((xindex) + (1))) {
            let colour: any = ((((((data) & (32768))) ? (2) : (0))) | (((((data) & (128))) ? (1) : (0))));
            if ((((((((((colour) && (((runtime.readIndex((members.m_bg_zbuf ?? runtime.member("m_bg_zbuf")), xindex)) ? 0 : 1))) ? 1 : 0)) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
              method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
            }
            data = ((((data) << (1))) & 0xffff);
          }
          break;
        }
        case 0:
        {
          for (let bit: any = 0; (((((Number(bit) < Number(8)) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0); bit = ((bit) + (1)), xindex = ((xindex) + (1))) {
            let colour: any = ((((((data) & (32768))) ? (2) : (0))) | (((((data) & (128))) ? (1) : (0))));
            if (((((((colour) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
              method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
            }
            data = ((((data) << (1))) & 0xffff);
          }
          break;
        }
      }
    }
  }

  function method_check_start_of_window(runtime: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    if (((Number(h_m_line.window_compare_position) < Number(16)) ? 1 : 0)) {
      0;
    }
    if (((((((((((((((h_m_line.window_enable[h_m_line.window_enable_index]) & (32))) && (((h_m_line.window_active) ? 0 : 1))) ? 1 : 0)) && ((((((((members.m_frame_window_active ?? runtime.member("m_frame_window_active"))) || (h_m_line.window_should_trigger)) ? 1 : 0)) || (((Number((members.m_current_line ?? runtime.member("m_current_line"))) === Number(h_m_line.window_start_y[h_m_line.window_start_y_index])) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_line.window_compare_position) === Number(h_m_line.window_start_x[h_m_line.window_start_y_index])) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_line.window_compare_position) < Number(166)) ? 1 : 0))) ? 1 : 0)) {
      0;
      h_m_line.starting = ((1) & 0xff);
      h_m_line.window_active = ((1) & 0xff);
      members.m_frame_window_active = ((1) ? 1 : 0);
      h_m_line.tile_cycle = (((((((((h_m_line.drawing) ? 0 : 1)) && (((Number(h_m_line.scrollx_to_apply) > Number(0)) ? 1 : 0))) ? 1 : 0)) ? (9) : (0))) & 0xff);
      h_m_line.tile_count = ((0) & 0xff);
      members.m_window_cycles = ((6) | 0);
      members.m_cycles_left = ((members.m_cycles_left) + (6));
      if (((Number(h_m_line.window_start_x[h_m_line.window_start_y_index]) === Number(0)) ? 1 : 0)) {
        h_m_line.sprite_delay_cycles = ((((h_m_line.sprite_delay_cycles) + (1))) & 0xff);
      }
    }
    h_m_line.window_start_y[((((h_m_line.window_start_y_index) + (4))) % (((h_m_line.window_start_y)?.length ?? 0)))] = runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10);
    h_m_line.window_start_x[((((h_m_line.window_start_y_index) + (4))) % (((h_m_line.window_start_x)?.length ?? 0)))] = runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 11);
    h_m_line.window_start_y_index = ((((((h_m_line.window_start_y_index) + (1))) % (((h_m_line.window_start_y)?.length ?? 0)))) | 0);
    h_m_line.window_enable[((((h_m_line.window_enable_index) + (3))) % (((h_m_line.window_enable)?.length ?? 0)))] = runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0);
    h_m_line.window_enable_index = ((((((h_m_line.window_enable_index) + (1))) % (((h_m_line.window_enable)?.length ?? 0)))) | 0);
    if ((((((h_m_line.starting) ? 0 : 1)) && (((Number(h_m_line.tile_cycle) < Number(8)) ? 1 : 0))) ? 1 : 0)) {
      h_m_line.window_compare_position = ((((h_m_line.window_compare_position) + (1))) & 0xffff);
    }
  }

  function method_update_scanline(runtime: any, cycles_to_go: any) {
    const members = runtime.members;
    const h_m_enable_experimental_engine = members.m_enable_experimental_engine ?? runtime.member("m_enable_experimental_engine");
    const h_m_layer = members.m_layer ?? runtime.member("m_layer");
    if (h_m_enable_experimental_engine) {
      return;
    }
    let profile: any = 0;
    if (((Number(((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (3))) === Number(3)) ? 1 : 0)) {
      let l: any = 0;
      if (((Number((members.m_start_x ?? runtime.member("m_start_x"))) < Number(0)) ? 1 : 0)) {
        runtime.readIndex(h_m_layer, 1).enabled = ((((((((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (32))) && (((Number((members.m_current_line ?? runtime.member("m_current_line"))) >= Number((members.m_window_y ?? runtime.member("m_window_y")))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_window_x ?? runtime.member("m_window_x"))) <= Number(166)) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        runtime.readIndex(h_m_layer, 0).enabled = (((((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (1))) && ((((((runtime.readIndex(h_m_layer, 1).enabled) ? 0 : 1)) || ((((runtime.readIndex(h_m_layer, 1).enabled) && (((Number((members.m_window_x ?? runtime.member("m_window_x"))) >= Number(7)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        if (runtime.readIndex(h_m_layer, 0).enabled) {
          runtime.readIndex(h_m_layer, 0).bgline = ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 2)) + ((members.m_current_line ?? runtime.member("m_current_line"))))) & (255))) << 16 >> 16);
          runtime.readIndex(h_m_layer, 0).bg_map = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_bgdtab_offs ?? runtime.member("m_gb_bgdtab_offs"))));
          runtime.readIndex(h_m_layer, 0).bg_tiles = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_chrgen_offs ?? runtime.member("m_gb_chrgen_offs"))));
          runtime.readIndex(h_m_layer, 0).xindex = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) >>> (3))) & 0xff);
          runtime.readIndex(h_m_layer, 0).xshift = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) & (7))) & 0xff);
          runtime.readIndex(h_m_layer, 0).xstart = ((0) & 0xff);
          runtime.readIndex(h_m_layer, 0).xend = ((160) & 0xff);
        }
        if (runtime.readIndex(h_m_layer, 1).enabled) {
          let xpos: any = (((members.m_window_x ?? runtime.member("m_window_x"))) - (7));
          if (((Number(xpos) < Number(0)) ? 1 : 0)) {
            xpos = 0;
          }
          runtime.readIndex(h_m_layer, 1).bgline = (((members.m_window_lines_drawn ?? runtime.member("m_window_lines_drawn"))) << 16 >> 16);
          runtime.readIndex(h_m_layer, 1).bg_map = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_wndtab_offs ?? runtime.member("m_gb_wndtab_offs"))));
          runtime.readIndex(h_m_layer, 1).bg_tiles = (((typeof (runtime.dereference(members.m_vram)).get === 'function' ? (runtime.dereference(members.m_vram)).get() : typeof (runtime.dereference(members.m_vram)).get === 'number' || typeof (runtime.dereference(members.m_vram)).get === 'boolean' ? (runtime.dereference(members.m_vram)).get : runtime.container(members.m_vram, "get"))) + ((members.m_gb_chrgen_offs ?? runtime.member("m_gb_chrgen_offs"))));
          runtime.readIndex(h_m_layer, 1).xindex = ((0) & 0xff);
          runtime.readIndex(h_m_layer, 1).xshift = ((0) & 0xff);
          runtime.readIndex(h_m_layer, 1).xstart = ((xpos) & 0xff);
          runtime.readIndex(h_m_layer, 1).xend = ((160) & 0xff);
          runtime.readIndex(h_m_layer, 0).xend = ((xpos) & 0xff);
        }
        members.m_start_x = ((0) | 0);
      }
      if (((Number(cycles_to_go) < Number(160)) ? 1 : 0)) {
        members.m_end_x = (((runtime.calls["std::min"] ? runtime.calls["std::min"](((160) - (cycles_to_go)), 160) : runtime.macro("std::min", ((160) - (cycles_to_go)), 160))) | 0);
        if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (1))) ? 0 : 1)) {
          let r: any = (runtime.calls["rectangle"] ? runtime.calls["rectangle"]((members.m_start_x ?? runtime.member("m_start_x")), (((members.m_end_x ?? runtime.member("m_end_x"))) - (1)), (members.m_current_line ?? runtime.member("m_current_line")), (members.m_current_line ?? runtime.member("m_current_line"))) : runtime.macro("rectangle", (members.m_start_x ?? runtime.member("m_start_x")), (((members.m_end_x ?? runtime.member("m_end_x"))) - (1)), (members.m_current_line ?? runtime.member("m_current_line")), (members.m_current_line ?? runtime.member("m_current_line"))));
          ((runtime.dereference(members.m_bitmap)).fill?.(runtime.readIndex((members.m_gb_bpal ?? runtime.member("m_gb_bpal")), 0), r) ?? 0);
        }
        while (((Number(l) < Number(2)) ? 1 : 0)) {
          let xindex: any = ((0) & 0xff);
          let map: any = 0;
          let tiles: any = 0;
          let data: any = ((0) & 0xffff);
          let i: any = 0;
          let tile_index: any = 0;
          if (((runtime.readIndex(h_m_layer, l).enabled) ? 0 : 1)) {
            l = ((l) + (1));
            continue;
          }
          map = runtime.add(runtime.readIndex(h_m_layer, l).bg_map, ((((runtime.readIndex(h_m_layer, l).bgline) << (2))) & (992)));
          tiles = runtime.add(runtime.readIndex(h_m_layer, l).bg_tiles, ((((runtime.readIndex(h_m_layer, l).bgline) & (7))) << (1)));
          xindex = (((members.m_start_x ?? runtime.member("m_start_x"))) & 0xff);
          if (((Number(xindex) < Number(runtime.readIndex(h_m_layer, l).xstart)) ? 1 : 0)) {
            xindex = ((runtime.readIndex(h_m_layer, l).xstart) & 0xff);
          }
          i = (members.m_end_x ?? runtime.member("m_end_x"));
          if (((Number(i) > Number(runtime.readIndex(h_m_layer, l).xend)) ? 1 : 0)) {
            i = runtime.readIndex(h_m_layer, l).xend;
          }
          i = ((i) - (xindex));
          tile_index = ((((runtime.readIndex(map, runtime.readIndex(h_m_layer, l).xindex)) ^ ((members.m_gb_tile_no_mod ?? runtime.member("m_gb_tile_no_mod"))))) * (16));
          data = ((((runtime.readIndex(tiles, tile_index)) | (((runtime.readIndex(tiles, ((tile_index) + (1)))) << (8))))) & 0xffff);
          data = ((((data) << (runtime.readIndex(h_m_layer, l).xshift))) & 0xffff);
          while (((Number(i) > Number(0)) ? 1 : 0)) {
            while ((((((Number(runtime.readIndex(h_m_layer, l).xshift) < Number(8)) ? 1 : 0)) && (i)) ? 1 : 0)) {
              let colour: any = ((((((data) & (32768))) ? (2) : (0))) | (((((data) & (128))) ? (1) : (0))));
              method_plot_pixel(runtime, xindex, (members.m_current_line ?? runtime.member("m_current_line")), runtime.readIndex((members.m_gb_bpal ?? runtime.member("m_gb_bpal")), colour));
              runtime.writeIndex(runtime.writableMember("m_bg_zbuf"), xindex, colour);
              xindex = ((((xindex) + (1))) & 0xff);
              data = ((((data) << (1))) & 0xffff);
              runtime.readIndex(h_m_layer, l).xshift = ((((runtime.readIndex(h_m_layer, l).xshift) + (1))) & 0xff);
              i = ((i) - (1));
            }
            if (((Number(runtime.readIndex(h_m_layer, l).xshift) === Number(8)) ? 1 : 0)) {
              if (((Number(l) === Number(0)) ? 1 : 0)) {
                runtime.readIndex(h_m_layer, 0).bgline = ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 2)) + ((members.m_current_line ?? runtime.member("m_current_line"))))) & (255))) << 16 >> 16);
                map = runtime.add(runtime.readIndex(h_m_layer, l).bg_map, ((((runtime.readIndex(h_m_layer, l).bgline) << (2))) & (992)));
                tiles = runtime.add(runtime.readIndex(h_m_layer, l).bg_tiles, ((((runtime.readIndex(h_m_layer, l).bgline) & (7))) << (1)));
              }
              runtime.readIndex(h_m_layer, l).xindex = ((((((runtime.readIndex(h_m_layer, l).xindex) + (1))) & (31))) & 0xff);
              runtime.readIndex(h_m_layer, l).xshift = ((0) & 0xff);
              tile_index = ((((runtime.readIndex(map, runtime.readIndex(h_m_layer, l).xindex)) ^ ((members.m_gb_tile_no_mod ?? runtime.member("m_gb_tile_no_mod"))))) * (16));
              data = ((((runtime.readIndex(tiles, tile_index)) | (((runtime.readIndex(tiles, ((tile_index) + (1)))) << (8))))) & 0xffff);
            }
          }
          l = ((l) + (1));
        }
        if ((((((Number((members.m_end_x ?? runtime.member("m_end_x"))) === Number(160)) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (2)))) ? 1 : 0)) {
          method_update_sprites(runtime);
        }
        members.m_start_x = (((members.m_end_x ?? runtime.member("m_end_x"))) | 0);
      }
    } else {
      if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) ? 0 : 1)) {
        if (((Number((members.m_previous_line ?? runtime.member("m_previous_line"))) !== Number((members.m_current_line ?? runtime.member("m_current_line")))) ? 1 : 0)) {
          if (((Number((members.m_current_line ?? runtime.member("m_current_line"))) < Number(144)) ? 1 : 0)) {
            let r: any = (runtime.calls["screen().visible_area"]?.() ?? 0);
            let r1: any = (runtime.calls["rectangle"] ? runtime.calls["rectangle"](r.min_x, r.max_x, (members.m_current_line ?? runtime.member("m_current_line")), (members.m_current_line ?? runtime.member("m_current_line"))) : runtime.macro("rectangle", r.min_x, r.max_x, (members.m_current_line ?? runtime.member("m_current_line")), (members.m_current_line ?? runtime.member("m_current_line"))));
            ((runtime.dereference(members.m_bitmap)).fill?.(0, r1) ?? 0);
          }
          members.m_previous_line = (((members.m_current_line ?? runtime.member("m_current_line"))) | 0);
        }
      }
    }
  }

  function method_screen_update(runtime: any, screen: any, bitmap: any, cliprect: any) {
    const members = runtime.members;
    const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
    (runtime.calls["copybitmap"] ? runtime.calls["copybitmap"](bitmap, h_m_bitmap, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_m_bitmap, 0, 0, 0, 0, cliprect));
    return 0;
  }

  function method_update_state(runtime: any) {
    const members = runtime.members;
    const h_m_enable_experimental_engine = members.m_enable_experimental_engine ?? runtime.member("m_enable_experimental_engine");
    const h_m_layer = members.m_layer ?? runtime.member("m_layer");
    const h_m_line = members.m_line ?? runtime.member("m_line");
    if ((members.m_updating_state ?? runtime.member("m_updating_state"))) {
      return;
    }
    members.m_updating_state = ((1) ? 1 : 0);
    let now: any = (runtime.calls["machine().time"]?.() ?? 0);
    0;
    let cycles: any = ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.(((now) - ((members.m_last_updated ?? runtime.member("m_last_updated"))))) ?? 0);
    method_update_oam_dma_state(runtime, cycles);
    if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) {
      0;
      if (((Number((members.m_cycles_left ?? runtime.member("m_cycles_left"))) > Number(0)) ? 1 : 0)) {
        if ((((((((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(1)) ? 1 : 0)) || (((Number((members.m_state ?? runtime.member("m_state"))) === Number(2)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? runtime.member("m_state"))) === Number(5)) ? 1 : 0))) ? 1 : 0)) {
          if (h_m_enable_experimental_engine) {
            method_update_line_state(runtime, cycles);
          }
        }
        if (((Number(cycles) >= Number((members.m_cycles_left ?? runtime.member("m_cycles_left")))) ? 1 : 0)) {
          cycles = ((cycles) - ((members.m_cycles_left ?? runtime.member("m_cycles_left"))));
          members.m_cycles_left = 0;
        } else {
          members.m_cycles_left = ((members.m_cycles_left) - (cycles));
          cycles = 0;
        }
      }
      while (((Number((members.m_cycles_left ?? runtime.member("m_cycles_left"))) === Number(0)) ? 1 : 0)) {
        let state_cycles: any = ((0) & 0xffff);
        members.m_state = (((members.m_next_state ?? runtime.member("m_next_state"))) | 0);
        switch ((members.m_state ?? runtime.member("m_state"))) {
          case 3:
          {
            members.m_next_state = ((4) | 0);
            state_cycles = ((4) & 0xffff);
            break;
          }
          case 4:
          {
            method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
            if (runtime.readIndex(h_m_layer, 1).enabled) {
              if (((h_m_enable_experimental_engine) ? 0 : 1)) {
                members.m_window_lines_drawn = ((((members.m_window_lines_drawn) + (1))) | 0);
              }
            }
            members.m_previous_line = (((members.m_current_line ?? runtime.member("m_current_line"))) | 0);
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (252)));
            members.m_oam_locked = ((0) | 0);
            members.m_oam_locked_reading = ((0) | 0);
            members.m_vram_locked = ((0) | 0);
            members.m_next_state = ((5) | 0);
            state_cycles = ((1) & 0xffff);
            break;
          }
          case 5:
          {
            members.m_stat_mode0_int = ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (8))) ? (1) : (0))) ? 1 : 0);
            method_check_stat_irq(runtime);
            members.m_mode = ((0) | 0);
            members.m_next_state = ((8) | 0);
            state_cycles = ((((((((runtime.add(((200) - (1)), 3)) - ((members.m_scrollx_adjust ?? runtime.member("m_scrollx_adjust"))))) - ((members.m_sprite_cycles ?? runtime.member("m_sprite_cycles"))))) - ((members.m_window_cycles ?? runtime.member("m_window_cycles"))))) & 0xffff);
            break;
          }
          case 8:
          {
            method_increment_scanline(runtime);
            members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10)) & 0xff);
            members.m_stat_lyc_int_prev = (((members.m_stat_lyc_int ?? runtime.member("m_stat_lyc_int"))) ? 1 : 0);
            members.m_stat_lyc_int = ((0) ? 1 : 0);
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) < Number(144)) ? 1 : 0)) {
              members.m_stat_mode0_int = ((0) ? 1 : 0);
            }
            members.m_stat_mode2_int = ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (32))) ? (1) : (0))) ? 1 : 0);
            method_check_stat_irq(runtime);
            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
            0;
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(144)) ? 1 : 0)) {
              members.m_next_state = ((13) | 0);
              state_cycles = ((4) & 0xffff);
            } else {
              members.m_next_state = ((11) | 0);
              members.m_oam_locked_reading = ((1) | 0);
              state_cycles = ((4) & 0xffff);
            }
            break;
          }
          case 9:
          {
            members.m_mode = ((2) | 0);
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (252))) | (2)));
            members.m_oam_locked = ((1) | 0);
            members.m_stat_mode1_int = ((0) ? 1 : 0);
            members.m_stat_mode2_int = ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (32))) ? (1) : (0))) ? 1 : 0);
            method_check_stat_irq(runtime);
            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
              members.m_scrollx_adjust = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) & (7))) | 0);
            }
            members.m_next_state = ((1) | 0);
            method_clear_line_state(runtime);
            method_select_sprites(runtime);
            members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10)) & 0xff);
            state_cycles = ((80) & 0xffff);
            state_cycles = ((8) & 0xffff);
            members.m_next_state = ((10) | 0);
            break;
          }
          case 10:
          {
            if ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (32))) && (((Number((members.m_current_line ?? runtime.member("m_current_line"))) === Number((members.m_window_y ?? runtime.member("m_window_y")))) ? 1 : 0))) ? 1 : 0)) {
              h_m_line.window_should_trigger = ((1) & 0xff);
            }
            0;
            state_cycles = ((((80) - (8))) & 0xffff);
            members.m_next_state = ((1) | 0);
            break;
          }
          case 11:
          {
            members.m_stat_mode0_int = ((0) ? 1 : 0);
            method_check_stat_irq(runtime);
            members.m_mode = ((2) | 0);
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (252))) | (2)));
            members.m_oam_locked = ((1) | 0);
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5))) ? 1 : 0)) {
              runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            }
            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
              members.m_scrollx_adjust = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) & (7))) | 0);
            }
            members.m_next_state = ((1) | 0);
            method_clear_line_state(runtime);
            method_select_sprites(runtime);
            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
              members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10)) & 0xff);
            }
            state_cycles = ((80) & 0xffff);
            members.m_next_state = ((12) | 0);
            state_cycles = ((8) & 0xffff);
            break;
          }
          case 12:
          {
            if ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (32))) && (((Number((members.m_current_line ?? runtime.member("m_current_line"))) === Number((((members.m_window_y ?? runtime.member("m_window_y"))) + (1)))) ? 1 : 0))) ? 1 : 0)) {
              h_m_line.window_should_trigger = ((1) & 0xff);
            }
            0;
            members.m_next_state = ((1) | 0);
            state_cycles = ((((80) - (8))) & 0xffff);
            break;
          }
          case 1:
          {
            for (let i: any = 0; ((Number(i) < Number(((h_m_line.window_start_y)?.length ?? 0))) ? 1 : 0); i = ((i) + (1))) {
              h_m_line.window_start_y[i] = runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10);
              h_m_line.window_start_x[i] = runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 11);
            }
            h_m_line.window_start_y_index = ((0) | 0);
            for (let i: any = 0; ((Number(i) < Number(((h_m_line.window_enable)?.length ?? 0))) ? 1 : 0); i = ((i) + (1))) {
              h_m_line.window_enable[i] = runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0);
            }
            h_m_line.window_enable_index = ((0) | 0);
            members.m_stat_mode2_int = ((0) ? 1 : 0);
            method_check_stat_irq(runtime);
            members.m_mode = ((3) | 0);
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (252))) | (3)));
            members.m_oam_locked = ((1) | 0);
            members.m_vram_locked = ((1) | 0);
            if (h_m_enable_experimental_engine) {
              members.m_next_state = ((4) | 0);
              state_cycles = ((((runtime.add(((4) - (3)), 168)) + ((members.m_sprite_cycles ?? runtime.member("m_sprite_cycles"))))) & 0xffff);
            } else {
              members.m_next_state = ((3) | 0);
              state_cycles = ((((((168) + ((members.m_scrollx_adjust ?? runtime.member("m_scrollx_adjust"))))) + ((members.m_sprite_cycles ?? runtime.member("m_sprite_cycles"))))) & 0xffff);
              members.m_next_state = ((2) | 0);
              state_cycles = ((12) & 0xffff);
              members.m_start_x = (((-1)) | 0);
            }
            break;
          }
          case 2:
          {
            members.m_window_x = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 11)) & 0xff);
            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
              method_calculate_window_cycles(runtime);
            }
            members.m_next_state = ((4) | 0);
            state_cycles = ((((((((((runtime.add(((4) - (3)), 168)) - (12))) + ((members.m_scrollx_adjust ?? runtime.member("m_scrollx_adjust"))))) + ((members.m_sprite_cycles ?? runtime.member("m_sprite_cycles"))))) + ((members.m_window_cycles ?? runtime.member("m_window_cycles"))))) & 0xffff);
            break;
          }
          case 13:
          {
            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
            members.m_stat_mode2_int = ((0) ? 1 : 0);
            members.m_stat_mode0_int = ((0) ? 1 : 0);
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(144)) ? 1 : 0)) {
              ((runtime.dereference(members.m_lr35902)).set_input_line?.(0, 1) ?? 0);
              ((runtime.dereference(members.m_lr35902)).execute_set_input?.(0, 1) ?? 0);
              members.m_mode = ((1) | 0);
              runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (252))) | (1)));
              members.m_stat_mode1_int = ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (16))) ? (1) : (0))) ? 1 : 0);
            }
            method_check_stat_irq(runtime);
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5))) ? 1 : 0)) {
              runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            }
            members.m_next_state = ((14) | 0);
            state_cycles = ((452) & 0xffff);
            break;
          }
          case 14:
          {
            method_increment_scanline(runtime);
            0;
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
            if (((Number((members.m_current_line ?? runtime.member("m_current_line"))) === Number(153)) ? 1 : 0)) {
              members.m_next_state = ((15) | 0);
              state_cycles = ((4) & 0xffff);
            } else {
              members.m_next_state = ((13) | 0);
              state_cycles = ((4) & 0xffff);
            }
            break;
          }
          case 15:
          {
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5))) ? 1 : 0)) {
              runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            } else {
              runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
            }
            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
            method_check_stat_irq(runtime);
            method_increment_scanline(runtime);
            members.m_next_state = ((16) | 0);
            state_cycles = ((4) & 0xffff);
            break;
          }
          case 16:
          {
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
            members.m_next_state = ((17) | 0);
            state_cycles = ((4) & 0xffff);
            break;
          }
          case 17:
          {
            members.m_frame_window_active = ((0) ? 1 : 0);
            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
            method_check_stat_irq(runtime);
            if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5))) ? 1 : 0)) {
              runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            }
            members.m_next_state = ((18) | 0);
            state_cycles = ((444) & 0xffff);
            break;
          }
          case 18:
          {
            members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10)) & 0xff);
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (252)));
            members.m_next_state = ((9) | 0);
            state_cycles = ((4) & 0xffff);
            break;
          }
        }
        0;
        if ((((((((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(1)) ? 1 : 0)) || (((Number((members.m_state ?? runtime.member("m_state"))) === Number(2)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? runtime.member("m_state"))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
          if (h_m_enable_experimental_engine) {
            method_update_line_state(runtime, cycles);
          }
        }
        if (((Number(cycles) >= Number(state_cycles)) ? 1 : 0)) {
          cycles = ((cycles) - (state_cycles));
          members.m_cycles_left = 0;
        } else {
          members.m_cycles_left = ((state_cycles) - (cycles));
        }
      }
    } else {
      method_increment_scanline(runtime);
      if (((Number((members.m_current_line ?? runtime.member("m_current_line"))) < Number(144)) ? 1 : 0)) {
        method_update_scanline(runtime, 0);
      }
      members.m_cycles_left = 456;
    }
    0;
    members.m_last_updated = (runtime.calls["machine().time"]?.() ?? 0);
    let next_cycles: any = (members.m_cycles_left ?? runtime.member("m_cycles_left"));
    if ((((((Number((members.m_oam_dma_start_cycles ?? runtime.member("m_oam_dma_start_cycles"))) > Number(0)) ? 1 : 0)) && (((Number((members.m_oam_dma_start_cycles ?? runtime.member("m_oam_dma_start_cycles"))) < Number(next_cycles)) ? 1 : 0))) ? 1 : 0)) {
      next_cycles = (members.m_oam_dma_start_cycles ?? runtime.member("m_oam_dma_start_cycles"));
    }
    if ((((((Number((members.m_oam_dma_cycles_left ?? runtime.member("m_oam_dma_cycles_left"))) > Number(0)) ? 1 : 0)) && (((Number((members.m_oam_dma_cycles_left ?? runtime.member("m_oam_dma_cycles_left"))) < Number(next_cycles)) ? 1 : 0))) ? 1 : 0)) {
      next_cycles = (members.m_oam_dma_cycles_left ?? runtime.member("m_oam_dma_cycles_left"));
    }
    ((runtime.dereference(members.m_lcd_timer)).adjust?.(((runtime.dereference(members.m_lr35902)).cycles_to_attotime?.(next_cycles) ?? 0)) ?? 0);
    members.m_updating_state = ((0) ? 1 : 0);
  }

  function method_update_oam_dma_state(runtime: any, cycles: any) {
    const members = runtime.members;
    if (((Number((members.m_oam_dma_cycles_left ?? runtime.member("m_oam_dma_cycles_left"))) > Number(0)) ? 1 : 0)) {
      if (((Number(cycles) >= Number((members.m_oam_dma_cycles_left ?? runtime.member("m_oam_dma_cycles_left")))) ? 1 : 0)) {
        members.m_oam_dma_cycles_left = ((0) | 0);
        members.m_oam_dma_processing = ((0) ? 1 : 0);
      } else {
        members.m_oam_dma_cycles_left = ((((members.m_oam_dma_cycles_left) - (cycles))) | 0);
      }
    }
    if (((Number((members.m_oam_dma_start_cycles ?? runtime.member("m_oam_dma_start_cycles"))) > Number(0)) ? 1 : 0)) {
      if (((Number(cycles) >= Number((members.m_oam_dma_start_cycles ?? runtime.member("m_oam_dma_start_cycles")))) ? 1 : 0)) {
        for (let i: any = 0; ((Number(i) < Number(160)) ? 1 : 0); i = ((i) + (1))) {
          runtime.writeIndex(runtime.writableMember("m_oam"), i, ((runtime.dereference(members.m_program_space)).read_byte?.((((members.m_oam_dma_source_address ?? runtime.member("m_oam_dma_source_address"))) + (i))) ?? 0));
        }
        members.m_oam_dma_start_cycles = ((0) | 0);
        members.m_oam_dma_cycles_left = ((((160) * (4))) | 0);
        members.m_oam_dma_processing = ((1) ? 1 : 0);
      } else {
        members.m_oam_dma_start_cycles = ((((members.m_oam_dma_start_cycles) - (cycles))) | 0);
      }
    }
  }

  function method_check_stat_irq(runtime: any) {
    const members = runtime.members;
    let new_stat_int: any = (((((((((((((((members.m_stat_mode0_int ?? runtime.member("m_stat_mode0_int"))) || ((members.m_stat_mode1_int ?? runtime.member("m_stat_mode1_int")))) ? 1 : 0)) || ((members.m_stat_mode2_int ?? runtime.member("m_stat_mode2_int")))) ? 1 : 0)) || ((members.m_stat_lyc_int ?? runtime.member("m_stat_lyc_int")))) ? 1 : 0)) || ((members.m_stat_write_int ?? runtime.member("m_stat_write_int")))) ? 1 : 0)) ? 1 : 0);
    0;
    if ((((new_stat_int) && ((((members.m_stat_int ?? runtime.member("m_stat_int"))) ? 0 : 1))) ? 1 : 0)) {
      0;
      ((runtime.dereference(members.m_lr35902)).set_input_line?.(1, 1) ?? 0);
      ((runtime.dereference(members.m_lr35902)).execute_set_input?.(1, 1) ?? 0);
    }
    members.m_stat_int = ((new_stat_int) ? 1 : 0);
    members.m_stat_write_int = ((0) ? 1 : 0);
  }

  function method_increment_scanline(runtime: any) {
    const members = runtime.members;
    members.m_current_line = (((((((members.m_current_line ?? runtime.member("m_current_line"))) + (1))) % (154))) | 0);
    if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) {
      runtime.writeIndex(runtime.writableMember("m_vid_regs"), 4, (members.m_current_line ?? runtime.member("m_current_line")));
    }
    if (((Number((members.m_current_line ?? runtime.member("m_current_line"))) === Number(0)) ? 1 : 0)) {
      members.m_window_lines_drawn = ((0) | 0);
    }
  }

  function method_clear_line_state(runtime: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    const h_m_enable_experimental_engine = members.m_enable_experimental_engine ?? runtime.member("m_enable_experimental_engine");
    for (let i: any = 0; ((Number(i) < Number(10)) ? 1 : 0); i = ((i) + (1))) {
      runtime.readIndex(h_m_line.sprite, i).enabled = ((0) & 0xff);
    }
    h_m_line.sprite_delay_cycles = ((0) & 0xff);
    h_m_line.starting = ((1) & 0xff);
    h_m_line.sequence_counter = ((0) & 0xff);
    h_m_line.start_drawing = ((0) & 0xff);
    h_m_line.drawing = ((0) & 0xff);
    h_m_line.scrollx_delay = ((0) & 0xff);
    h_m_line.scrollx_to_apply = ((0) & 0xff);
    h_m_line.pixels_drawn = ((0) & 0xff);
    h_m_line.tile_count = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) >>> (3))) & 0xff);
    h_m_line.tile_cycle = ((0) & 0xff);
    h_m_line.window_compare_position = ((256) & 0xffff);
    h_m_line.window_active = ((0) & 0xff);
    h_m_line.window_should_trigger = ((0) & 0xff);
    if (h_m_enable_experimental_engine) {
      members.m_scrollx_adjust = ((0) | 0);
    }
  }

  function method_select_sprites(runtime: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    members.m_sprCount = ((0) | 0);
    members.m_sprite_cycles = ((0) | 0);
    if ((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) && (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (2)))) ? 1 : 0)) {
      let sprite_occurs: any = new Uint8Array(Math.max(0, Number(32)));
      (() => { const target = sprite_occurs; const bytes = Number(((sprite_occurs)?.byteLength ?? 1)); if (target?.generatedPointer) { const width = target.source.BYTES_PER_ELEMENT ?? 1; target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width)); return target; } target.fill(0, 0, bytes); return target; })();
      let height: any = ((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (4))) ? (16) : (8));
      let line: any = (((members.m_current_line ?? runtime.member("m_current_line"))) + (16));
      for (let i: any = 0; ((Number(i) < Number(160)) ? 1 : 0); i = ((i) + (4))) {
        if ((((((Number(line) >= Number(runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), i))) ? 1 : 0)) && (((Number(line) < Number(((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), i)) + (height)))) ? 1 : 0))) ? 1 : 0)) {
          if (((Number((members.m_sprCount ?? runtime.member("m_sprCount"))) < Number(10)) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_sprite"), (members.m_sprCount ?? runtime.member("m_sprCount")), runtime.divide(i, 4));
            if (((Number(runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((i) + (1)))) < Number(168)) ? 1 : 0)) {
              runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? runtime.member("m_sprCount"))).enabled = ((1) & 0xff);
              runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? runtime.member("m_sprCount"))).y = ((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), i)) & 0xff);
              runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? runtime.member("m_sprCount"))).x = ((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((i) + (1)))) & 0xff);
              runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? runtime.member("m_sprCount"))).pattern = ((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((i) + (2)))) & 0xff);
              runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? runtime.member("m_sprCount"))).flags = ((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((i) + (3)))) & 0xff);
              let spr_x: any = ((runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((i) + (1)))) ? (runtime.add(runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), ((i) + (1))), ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 3)) & (7)))) : (0));
              if (runtime.readIndex(sprite_occurs, ((spr_x) >>> (3)))) {
                members.m_sprite_cycles = ((((members.m_sprite_cycles) + (3))) | 0);
              }
              members.m_sprite_cycles = ((((members.m_sprite_cycles) + (3))) | 0);
              runtime.writeIndex(sprite_occurs, ((spr_x) >>> (3)), ((runtime.readIndex(sprite_occurs, ((spr_x) >>> (3)))) | (((1) << (((spr_x) & (7)))))));
            }
            members.m_sprCount = ((((members.m_sprCount) + (1))) | 0);
          }
        }
      }
      if (((Number((members.m_sprCount ?? runtime.member("m_sprCount"))) > Number(0)) ? 1 : 0)) {
        for (let i: any = 0; ((Number(i) < Number(22)) ? 1 : 0); i = ((i) + (1))) {
          if (runtime.readIndex(sprite_occurs, i)) {
            0;
          }
          if (runtime.readIndex(sprite_occurs, i)) {
            let cycles: any = new Int32Array([3, 8, 7, 8, 6, 8, 7, 8, 5, 8, 7, 8, 6, 8, 7, 8, 4, 8, 7, 8, 6, 8, 7, 8, 5, 8, 7, 8, 6, 8, 7, 8]);
            members.m_sprite_cycles = ((((members.m_sprite_cycles) + (runtime.readIndex(cycles, ((runtime.readIndex(sprite_occurs, i)) & (31)))))) | 0);
          }
        }
        0;
      }
    }
  }

  function method_calculate_window_cycles(runtime: any) {
    const members = runtime.members;
    members.m_window_cycles = ((0) | 0);
    0;
    if (((((((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (32))) && (((Number((members.m_window_x ?? runtime.member("m_window_x"))) < Number(167)) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_window_y ?? runtime.member("m_window_y"))) < Number(144)) ? 1 : 0))) ? 1 : 0)) {
      members.m_window_cycles = ((4) | 0);
      if (((Number((members.m_window_x ?? runtime.member("m_window_x"))) === Number(15)) ? 1 : 0)) {
        members.m_window_cycles = ((12) | 0);
      }
    }
  }

  function method_vram_r(runtime: any, offset: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      method_update_state(runtime);
      0;
    }
    return ((((Number((members.m_vram_locked ?? runtime.member("m_vram_locked"))) === Number(1)) ? 1 : 0)) ? (255) : (runtime.readIndex((members.m_vram ?? runtime.member("m_vram")), ((offset) + ((((members.m_vram_bank ?? runtime.member("m_vram_bank"))) * (8192)))))));
  }

  function method_vram_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_update_state(runtime);
    if (((Number((members.m_vram_locked ?? runtime.member("m_vram_locked"))) === Number(1)) ? 1 : 0)) {
      return;
    }
    runtime.writeIndex(runtime.writableMember("m_vram"), ((offset) + ((((members.m_vram_bank ?? runtime.member("m_vram_bank"))) * (8192)))), data);
  }

  function method_oam_r(runtime: any, offset: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      method_update_state(runtime);
      0;
    }
    return ((((((((((Number((members.m_oam_locked ?? runtime.member("m_oam_locked"))) === Number(1)) ? 1 : 0)) || (((Number((members.m_oam_locked_reading ?? runtime.member("m_oam_locked_reading"))) === Number(1)) ? 1 : 0))) ? 1 : 0)) || ((members.m_oam_dma_processing ?? runtime.member("m_oam_dma_processing")))) ? 1 : 0)) ? (255) : (runtime.readIndex((members.m_oam ?? runtime.member("m_oam")), offset)));
  }

  function method_oam_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    method_update_state(runtime);
    if (((((((((Number((members.m_oam_locked ?? runtime.member("m_oam_locked"))) === Number(1)) ? 1 : 0)) || (((Number(offset) >= Number(160)) ? 1 : 0))) ? 1 : 0)) || ((members.m_oam_dma_processing ?? runtime.member("m_oam_dma_processing")))) ? 1 : 0)) {
      return;
    }
    runtime.writeIndex(runtime.writableMember("m_oam"), offset, data);
  }

  function method_video_r(runtime: any, offset: any) {
    const members = runtime.members;
    if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
      method_update_state(runtime);
      if (((Number(offset) === Number(1)) ? 1 : 0)) {
        0;
      }
      if (((Number(offset) === Number(40)) ? 1 : 0)) {
        0;
      }
      if (((Number(offset) === Number(41)) ? 1 : 0)) {
        0;
      }
    }
    return runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), offset);
  }

  function method_video_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    method_update_state(runtime);
    0;
    switch (offset) {
      case 0:
      {
        members.m_gb_chrgen_offs = ((((((data) & (16))) ? (0) : (2048))) >>> 0);
        members.m_gb_tile_no_mod = ((((((data) & (16))) ? (0) : (128))) & 0xff);
        members.m_gb_bgdtab_offs = ((((((data) & (8))) ? (7168) : (6144))) >>> 0);
        members.m_gb_wndtab_offs = ((((((data) & (64))) ? (7168) : (6144))) >>> 0);
        if (((((data) & (128))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~3))));
          members.m_old_curline = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) & 0xff);
          runtime.writeIndex(runtime.writableMember("m_vid_regs"), 4, 0);
          members.m_oam_locked = ((0) | 0);
          members.m_vram_locked = ((0) | 0);
        } else {
          if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) ? 0 : 1)) {
            method_lcd_switch_on(runtime, data);
          } else {
            if ((((h_m_line.window_active) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) {
              members.m_window_lines_drawn = ((((members.m_window_lines_drawn) + (1))) | 0);
              h_m_line.window_active = ((0) & 0xff);
            }
          }
        }
        break;
      }
      case 1:
      {
        data = ((((((128) | (((data) & (120))))) | (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (7))))) & 0xff);
        if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) {
          method_stat_write(runtime, data);
        }
        break;
      }
      case 4:
      {
        return;
      }
      case 5:
      {
        if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5)) !== Number(data)) ? 1 : 0)) {
          if ((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(data)) ? 1 : 0)) || (((((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(15)) ? 1 : 0)) && (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) === Number(153)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            0;
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64))) {
              if ((((((Number((members.m_state ?? runtime.member("m_state"))) !== Number(8)) ? 1 : 0)) || ((((members.m_stat_lyc_int_prev ?? runtime.member("m_stat_lyc_int_prev"))) ? 0 : 1))) ? 1 : 0)) {
                members.m_stat_lyc_int = ((1) ? 1 : 0);
                if ((members.m_stat_mode2_int ?? runtime.member("m_stat_mode2_int"))) {
                  members.m_stat_int = ((0) ? 1 : 0);
                }
                method_check_stat_irq(runtime);
              }
            }
          } else {
            0;
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
            members.m_stat_lyc_int = ((0) ? 1 : 0);
            method_check_stat_irq(runtime);
          }
        }
        break;
      }
      case 6:
      {
        members.m_oam_dma_source_address = ((((data) << (8))) & 0xffff);
        members.m_oam_dma_start_cycles = ((8) | 0);
        method_update_state(runtime);
        return;
      }
      case 7:
      {
        method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 0, ((data) & (3)));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 1, ((((data) & (12))) >>> (2)));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 2, ((((data) & (48))) >>> (4)));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 3, ((((data) & (192))) >>> (6)));
        break;
      }
      case 8:
      {
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 0, ((data) & (3)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 1, ((((data) & (12))) >>> (2)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 2, ((((data) & (48))) >>> (4)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 3, ((((data) & (192))) >>> (6)));
        break;
      }
      case 9:
      {
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 0, ((data) & (3)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 1, ((((data) & (12))) >>> (2)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 2, ((((data) & (48))) >>> (4)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 3, ((((data) & (192))) >>> (6)));
        break;
      }
      case 2:
      {
        method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
        break;
      }
      case 3:
      {
        method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
        0;
        if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
          let adjust: any = ((data) & (7));
          h_m_line.scrollx_delay = ((((h_m_line.scrollx_delay) + (adjust))) & 0xff);
        }
        break;
      }
      case 10:
      {
        0;
        break;
      }
      case 11:
      {
        0;
        break;
      }
      default:
      {
        return;
      }
    }
    runtime.writeIndex(runtime.writableMember("m_vid_regs"), offset, data);
  }

  function method_lcd_switch_on(runtime: any, new_data: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    members.m_current_line = ((0) | 0);
    members.m_previous_line = ((153) | 0);
    members.m_window_lines_drawn = ((0) | 0);
    members.m_window_cycles = ((0) | 0);
    members.m_mode = ((4) | 0);
    members.m_sprCount = ((0) | 0);
    members.m_sprite_cycles = ((0) | 0);
    members.m_oam_locked = ((0) | 0);
    members.m_oam_locked_reading = ((0) | 0);
    members.m_window_y = ((255) & 0xff);
    members.m_stat_mode0_int = ((0) ? 1 : 0);
    members.m_stat_mode1_int = ((0) ? 1 : 0);
    members.m_stat_mode2_int = ((0) ? 1 : 0);
    members.m_stat_lyc_int = ((0) ? 1 : 0);
    members.m_stat_lyc_int_prev = ((0) ? 1 : 0);
    members.m_stat_write_int = ((0) ? 1 : 0);
    members.m_stat_int = ((0) ? 1 : 0);
    members.m_hdma_cycles_to_start = ((0) | 0);
    members.m_frame_window_active = ((0) ? 1 : 0);
    if ((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5))) ? 1 : 0)) && (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) !== Number((members.m_old_curline ?? runtime.member("m_old_curline")))) ? 1 : 0))) ? 1 : 0)) {
      runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
      if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64))) {
        members.m_stat_lyc_int = ((1) ? 1 : 0);
        method_check_stat_irq(runtime);
      }
    } else {
      runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
    }
    method_clear_line_state(runtime);
    members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 10)) & 0xff);
    if ((((((new_data) & (32))) && (((Number((members.m_current_line ?? runtime.member("m_current_line"))) === Number((members.m_window_y ?? runtime.member("m_window_y")))) ? 1 : 0))) ? 1 : 0)) {
      h_m_line.window_should_trigger = ((1) & 0xff);
    }
    members.m_state = ((9) | 0);
    members.m_next_state = ((1) | 0);
    members.m_cycles_left = 80;
    ((runtime.dereference(members.m_lcd_timer)).adjust?.(((runtime.dereference(members.m_lr35902)).cycles_to_attotime?.((members.m_cycles_left ?? runtime.member("m_cycles_left"))) ?? 0)) ?? 0);
  }

  function method_stat_write(runtime: any, new_data: any) {
    const members = runtime.members;
    0;
    let new_lyc_int: any = (((members.m_stat_lyc_int ?? runtime.member("m_stat_lyc_int"))) ? 1 : 0);
    if (((new_data) & (64))) {
      if (((Number(((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (((64) | (4))))) === Number(4)) ? 1 : 0)) {
        new_lyc_int = ((1) ? 1 : 0);
      }
    } else {
      new_lyc_int = ((0) ? 1 : 0);
    }
    switch ((members.m_mode ?? runtime.member("m_mode"))) {
      case 0:
      {
        members.m_stat_mode0_int = ((((((new_data) & (8))) ? (1) : (0))) ? 1 : 0);
        if ((((members.m_stat_int ?? runtime.member("m_stat_int"))) ? 0 : 1)) {
          if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (8))) ? 0 : 1)) {
            members.m_stat_write_int = ((1) ? 1 : 0);
          }
        } else {
          if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (8))) ? 0 : 1)) {
            if (((((((members.m_stat_lyc_int ?? runtime.member("m_stat_lyc_int"))) ? 0 : 1)) && (((new_lyc_int) ? 0 : 1))) ? 1 : 0)) {
              members.m_stat_int = ((0) ? 1 : 0);
              members.m_stat_write_int = ((1) ? 1 : 0);
            }
          }
        }
        break;
      }
      case 1:
      {
        members.m_stat_mode1_int = ((((((new_data) & (16))) ? (1) : (0))) ? 1 : 0);
        if ((((members.m_stat_int ?? runtime.member("m_stat_int"))) ? 0 : 1)) {
          members.m_stat_write_int = ((1) ? 1 : 0);
        } else {
          if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (16))) ? 0 : 1)) {
            if (((((((members.m_stat_lyc_int ?? runtime.member("m_stat_lyc_int"))) ? 0 : 1)) && (((new_lyc_int) ? 0 : 1))) ? 1 : 0)) {
              members.m_stat_int = ((0) ? 1 : 0);
              members.m_stat_write_int = ((1) ? 1 : 0);
            }
          }
        }
        break;
      }
      case 2:
      {
        if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (32))) {
          if (((((((members.m_stat_lyc_int ?? runtime.member("m_stat_lyc_int"))) ? 0 : 1)) && (new_lyc_int)) ? 1 : 0)) {
            members.m_stat_int = ((0) ? 1 : 0);
          }
        }
        if (((Number(((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (((64) | (4))))) === Number(4)) ? 1 : 0)) {
          members.m_stat_write_int = ((1) ? 1 : 0);
          members.m_stat_int = ((0) ? 1 : 0);
        }
        break;
      }
      default:
      {
        break;
      }
    }
    members.m_stat_lyc_int = ((new_lyc_int) ? 1 : 0);
    method_check_stat_irq(runtime);
    return 0;
  }

  function method_dmg_ppu_device__video_w(runtime: any, offset: any, data: any) {
    const members = runtime.members;
    const h_m_line = members.m_line ?? runtime.member("m_line");
    method_update_state(runtime);
    0;
    switch (offset) {
      case 0:
      {
        members.m_gb_chrgen_offs = ((((((data) & (16))) ? (0) : (2048))) >>> 0);
        members.m_gb_tile_no_mod = ((((((data) & (16))) ? (0) : (128))) & 0xff);
        members.m_gb_bgdtab_offs = ((((((data) & (8))) ? (7168) : (6144))) >>> 0);
        members.m_gb_wndtab_offs = ((((((data) & (64))) ? (7168) : (6144))) >>> 0);
        if (((((data) & (128))) ? 0 : 1)) {
          runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~3))));
          members.m_old_curline = ((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) & 0xff);
          runtime.writeIndex(runtime.writableMember("m_vid_regs"), 4, 0);
          members.m_oam_locked = ((0) | 0);
          members.m_vram_locked = ((0) | 0);
        } else {
          if (((((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) ? 0 : 1)) {
            method_lcd_switch_on(runtime, data);
          } else {
            if ((((h_m_line.window_active) && (((((data) & (32))) ? 0 : 1))) ? 1 : 0)) {
              members.m_window_lines_drawn = ((((members.m_window_lines_drawn) + (1))) | 0);
              h_m_line.window_active = ((0) & 0xff);
            }
          }
        }
        break;
      }
      case 1:
      {
        data = ((((((128) | (((data) & (120))))) | (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (7))))) & 0xff);
        if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 0)) & (128))) {
          method_stat_write(runtime, data);
        }
        break;
      }
      case 4:
      {
        return;
      }
      case 5:
      {
        if (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 5)) !== Number(data)) ? 1 : 0)) {
          if ((((((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(data)) ? 1 : 0)) || (((((((((Number((members.m_state ?? runtime.member("m_state"))) === Number(15)) ? 1 : 0)) && (((Number(runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 4)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) === Number(153)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
            0;
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            if (((runtime.readIndex((members.m_vid_regs ?? runtime.member("m_vid_regs")), 1)) & (64))) {
              if ((((((Number((members.m_state ?? runtime.member("m_state"))) !== Number(8)) ? 1 : 0)) || ((((members.m_stat_lyc_int_prev ?? runtime.member("m_stat_lyc_int_prev"))) ? 0 : 1))) ? 1 : 0)) {
                members.m_stat_lyc_int = ((1) ? 1 : 0);
                if ((members.m_stat_mode2_int ?? runtime.member("m_stat_mode2_int"))) {
                  members.m_stat_int = ((0) ? 1 : 0);
                }
                method_check_stat_irq(runtime);
              }
            }
          } else {
            0;
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & ((~4))));
            members.m_stat_lyc_int = ((0) ? 1 : 0);
            method_check_stat_irq(runtime);
          }
        }
        break;
      }
      case 6:
      {
        members.m_oam_dma_source_address = ((((data) << (8))) & 0xffff);
        members.m_oam_dma_start_cycles = ((8) | 0);
        method_update_state(runtime);
        return;
      }
      case 7:
      {
        method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 0, ((data) & (3)));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 1, ((((data) & (12))) >>> (2)));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 2, ((((data) & (48))) >>> (4)));
        runtime.writeIndex(runtime.writableMember("m_gb_bpal"), 3, ((((data) & (192))) >>> (6)));
        break;
      }
      case 8:
      {
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 0, ((data) & (3)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 1, ((((data) & (12))) >>> (2)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 2, ((((data) & (48))) >>> (4)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal0"), 3, ((((data) & (192))) >>> (6)));
        break;
      }
      case 9:
      {
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 0, ((data) & (3)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 1, ((((data) & (12))) >>> (2)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 2, ((((data) & (48))) >>> (4)));
        runtime.writeIndex(runtime.writableMember("m_gb_spal1"), 3, ((((data) & (192))) >>> (6)));
        break;
      }
      case 2:
      {
        method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
        break;
      }
      case 3:
      {
        method_update_scanline(runtime, ((runtime.dereference(members.m_lr35902)).attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0));
        0;
        if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
          let adjust: any = ((data) & (7));
          h_m_line.scrollx_delay = ((((h_m_line.scrollx_delay) + (adjust))) & 0xff);
        }
        break;
      }
      case 10:
      {
        0;
        break;
      }
      case 11:
      {
        0;
        break;
      }
      default:
      {
        return;
      }
    }
    runtime.writeIndex(runtime.writableMember("m_vid_regs"), offset, data);
  }

  function method_update_tick(runtime: any, param: any) {
    const members = runtime.members;
    method_update_state(runtime);
  }
  return {
    "videoptr_restore": method_videoptr_restore,
    "update_line_state": method_update_line_state,
    "plot_pixel": method_plot_pixel,
    "update_sprites": method_update_sprites,
    "check_start_of_window": method_check_start_of_window,
    "update_scanline": method_update_scanline,
    "screen_update": method_screen_update,
    "update_state": method_update_state,
    "update_oam_dma_state": method_update_oam_dma_state,
    "check_stat_irq": method_check_stat_irq,
    "increment_scanline": method_increment_scanline,
    "clear_line_state": method_clear_line_state,
    "select_sprites": method_select_sprites,
    "calculate_window_cycles": method_calculate_window_cycles,
    "vram_r": method_vram_r,
    "vram_w": method_vram_w,
    "oam_r": method_oam_r,
    "oam_w": method_oam_w,
    "video_r": method_video_r,
    "video_w": method_video_w,
    "lcd_switch_on": method_lcd_switch_on,
    "stat_write": method_stat_write,
    "dmg_ppu_device::video_w": method_dmg_ppu_device__video_w,
    "update_tick": method_update_tick
  };
})() as GeneratedDeviceMethodMap;

export const device = definition;
export default device;
