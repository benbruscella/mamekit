import deviceData from './dmg_ppu.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_videoptr_restore(runtime) {
        const members = runtime.members;
        (members.m_layer ?? 0)[0].bg_map = ((members.m_vram) + ((members.m_gb_bgdtab_offs ?? 0)));
        (members.m_layer ?? 0)[0].bg_tiles = ((members.m_vram) + ((members.m_gb_chrgen_offs ?? 0)));
        (members.m_layer ?? 0)[1].bg_map = ((members.m_vram) + ((members.m_gb_wndtab_offs ?? 0)));
        (members.m_layer ?? 0)[1].bg_tiles = ((members.m_vram) + ((members.m_gb_chrgen_offs ?? 0)));
    }
    function method_update_line_state(runtime, cycles) {
        const members = runtime.members;
        const h_m_line = members.m_line ?? 0;
        const h_m_gb_bpal = members.m_gb_bpal ?? 0;
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
                }
                else {
                    if ((((((h_m_line.starting) ? 0 : 1)) && (((Number(h_m_line.tile_cycle) < Number(8)) ? 1 : 0))) ? 1 : 0)) {
                        if (((Number(h_m_line.pixels_drawn) < Number(8)) ? 1 : 0)) {
                            0;
                        }
                        method_plot_pixel(runtime, h_m_line.pixels_drawn, (members.m_current_line ?? 0), h_m_gb_bpal[runtime.shiftRight(h_m_line.shift_register, 14)]);
                        (members.m_bg_zbuf ?? 0)[h_m_line.pixels_drawn] = runtime.shiftRight(h_m_line.shift_register, 14);
                        h_m_line.shift_register = ((((h_m_line.shift_register) << (2))) & 0xffff);
                        h_m_line.pixels_drawn = ((((h_m_line.pixels_drawn) + (1))) & 0xff);
                        if ((((((Number(h_m_line.pixels_drawn) === Number(160)) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (2)))) ? 1 : 0)) {
                            method_update_sprites(runtime);
                        }
                    }
                }
            }
            let next_tile_cycle = ((((h_m_line.tile_cycle) + (1))) & 0xff);
            switch (h_m_line.tile_cycle) {
                case 0:
                    {
                        if ((((((h_m_line.window_active) ? 0 : 1)) && (((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (1))) ? 0 : 1))) ? 1 : 0)) {
                            h_m_line.shift_register = ((0) & 0xffff);
                        }
                        else {
                            h_m_line.shift_register = ((runtime.wide("|", runtime.wide("&", runtime.wide(">>", runtime.wide("*", runtime.wide("&", runtime.wide("*", h_m_line.plane0, 72340172838076673n), 9241421688590303745n), 72624976668147841n), 49), 21845), runtime.wide("&", runtime.wide(">>", runtime.wide("*", runtime.wide("&", runtime.wide("*", h_m_line.plane1, 72340172838076673n), 9241421688590303745n), 72624976668147841n), 48), 43690))) & 0xffff);
                        }
                        if (((Number(h_m_line.pixels_drawn) < Number(8)) ? 1 : 0)) {
                            0;
                        }
                        if (((Number(h_m_line.sequence_counter) >= Number(2)) ? 1 : 0)) {
                            if (((h_m_line.starting) ? 0 : 1)) {
                                h_m_line.drawing = ((1) & 0xff);
                            }
                        }
                        else {
                            if (((Number(h_m_line.sequence_counter) === Number(1)) ? 1 : 0)) {
                                h_m_line.window_compare_position = ((0) & 0xffff);
                            }
                        }
                        h_m_line.sequence_counter = ((((h_m_line.sequence_counter) + (1))) & 0xff);
                        if (h_m_line.window_active) {
                            h_m_line.y = (((members.m_window_lines_drawn ?? 0)) & 0xff);
                            h_m_line.pattern_address = (((((((members.m_gb_wndtab_offs ?? 0)) | (((((h_m_line.y) & (248))) << (2))))) | (((h_m_line.tile_count) & (31))))) & 0xffff);
                        }
                        else {
                            h_m_line.y = ((((runtime.readIndex((members.m_vid_regs ?? 0), 2)) + ((members.m_current_line ?? 0)))) & 0xff);
                            h_m_line.pattern_address = (((((((members.m_gb_bgdtab_offs ?? 0)) | (((((h_m_line.y) & (248))) << (2))))) | (((((runtime.shiftRight(runtime.readIndex((members.m_vid_regs ?? 0), 3), 3)) + (h_m_line.tile_count))) & (31))))) & 0xffff);
                        }
                        h_m_line.tile_count = ((((h_m_line.tile_count) + (1))) & 0xff);
                        break;
                    }
                case 1:
                    {
                        h_m_line.pattern = ((((runtime.readIndex(members.m_vram, h_m_line.pattern_address)) ^ ((members.m_gb_tile_no_mod ?? 0)))) & 0xff);
                        if (((Number(h_m_line.tile_count) < Number(8)) ? 1 : 0)) {
                            0;
                        }
                        break;
                    }
                case 2:
                    {
                        h_m_line.tile_address = (((((members.m_gb_chrgen_offs ?? 0)) + (((((h_m_line.pattern) << (4))) | (((((h_m_line.y) & (7))) << (1))))))) & 0xffff);
                        if (((Number(h_m_line.tile_count) < Number(8)) ? 1 : 0)) {
                            0;
                        }
                        break;
                    }
                case 3:
                    {
                        h_m_line.plane0 = ((runtime.readIndex(members.m_vram, h_m_line.tile_address)) & 0xff);
                        if ((((h_m_line.starting) && (((h_m_line.window_active) ? 0 : 1))) ? 1 : 0)) {
                            h_m_line.scrollx = ((runtime.readIndex((members.m_vid_regs ?? 0), 3)) & 0xff);
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
                        h_m_line.plane1 = ((runtime.readIndex(members.m_vram, h_m_line.tile_address)) & 0xff);
                        if (h_m_line.starting) {
                            if (h_m_line.window_active) {
                                h_m_line.sequence_counter = ((2) & 0xff);
                                if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
                                }
                            }
                            else {
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
                            next_tile_cycle = ((((next_tile_cycle) & (7))) & 0xff);
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
                        next_tile_cycle = ((((next_tile_cycle) & (7))) & 0xff);
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
    function method_plot_pixel(runtime, x, y, color) {
        const members = runtime.members;
        const h_m_bitmap = members.m_bitmap ?? 0;
        h_m_bitmap["pix="](y, x, color);
    }
    function method_update_sprites(runtime) {
        const members = runtime.members;
        const h_m_gb_spal1 = members.m_gb_spal1 ?? 0;
        const h_m_gb_spal0 = members.m_gb_spal0 ?? 0;
        let height = ((0) & 0xff);
        let tilemask = ((0) & 0xff);
        let line = ((0) & 0xff);
        let vram = 0;
        let yindex = ((0) | 0);
        if (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (4))) {
            height = ((16) & 0xff);
            tilemask = ((254) & 0xff);
        }
        else {
            height = ((8) & 0xff);
            tilemask = ((255) & 0xff);
        }
        yindex = (((members.m_current_line ?? 0)) | 0);
        line = (((((members.m_current_line ?? 0)) + (16))) & 0xff);
        vram = members.m_vram;
        for (let i = (((((members.m_sprCount ?? 0)) - (1))) | 0); ((Number(i) >= Number(0)) ? 1 : 0); i = ((((i) - (1))) | 0)) {
            let oam_address = (((((members.m_sprite ?? 0)[i]) * (4))) | 0);
            let spal = ((((runtime.readIndex((members.m_oam ?? 0), ((oam_address) + (3)))) & (16))) ? (h_m_gb_spal1) : (h_m_gb_spal0));
            let xindex = ((((runtime.readIndex((members.m_oam ?? 0), ((oam_address) + (1)))) - (8))) | 0);
            let adr = ((((((runtime.readIndex((members.m_oam ?? 0), ((oam_address) + (2)))) & (tilemask))) * (16))) | 0);
            if ((((((Number(xindex) < Number(-7)) ? 1 : 0)) || (((Number(xindex) > Number(160)) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            if (((runtime.readIndex((members.m_oam ?? 0), ((oam_address) + (3)))) & (64))) {
                adr = ((((adr) + (((runtime.add(((((height) - (1))) - (line)), runtime.readIndex((members.m_oam ?? 0), oam_address))) * (2))))) | 0);
            }
            else {
                adr = ((((adr) + (((((line) - (runtime.readIndex((members.m_oam ?? 0), oam_address)))) * (2))))) | 0);
            }
            let data = ((((((runtime.readIndex(vram, ((adr) + (1)))) << (8))) | (runtime.readIndex(vram, adr)))) & 0xffff);
            switch (((runtime.readIndex((members.m_oam ?? 0), ((oam_address) + (3)))) & (160))) {
                case 160:
                    {
                        for (let bit = ((0) | 0); ((Number(bit) < Number(8)) ? 1 : 0); bit = ((((bit) + (1))) | 0), xindex = ((((xindex) + (1))) | 0)) {
                            let colour = ((((((((data) & (256))) ? (2) : (0))) | (((((data) & (1))) ? (1) : (0))))) | 0);
                            if ((((((((((colour) && ((((members.m_bg_zbuf ?? 0)[xindex]) ? 0 : 1))) ? 1 : 0)) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
                            }
                            data = ((runtime.shiftRight(data, 1)) & 0xffff);
                        }
                        break;
                    }
                case 32:
                    {
                        for (let bit = ((0) | 0); ((Number(bit) < Number(8)) ? 1 : 0); bit = ((((bit) + (1))) | 0), xindex = ((((xindex) + (1))) | 0)) {
                            let colour = ((((((((data) & (256))) ? (2) : (0))) | (((((data) & (1))) ? (1) : (0))))) | 0);
                            if (((((((colour) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
                            }
                            data = ((runtime.shiftRight(data, 1)) & 0xffff);
                        }
                        break;
                    }
                case 128:
                    {
                        for (let bit = ((0) | 0); (((((Number(bit) < Number(8)) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0); bit = ((((bit) + (1))) | 0), xindex = ((((xindex) + (1))) | 0)) {
                            let colour = ((((((((data) & (32768))) ? (2) : (0))) | (((((data) & (128))) ? (1) : (0))))) | 0);
                            if ((((((((((colour) && ((((members.m_bg_zbuf ?? 0)[xindex]) ? 0 : 1))) ? 1 : 0)) && (((Number(xindex) >= Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0)) {
                                method_plot_pixel(runtime, xindex, yindex, runtime.readIndex(spal, colour));
                            }
                            data = ((((data) << (1))) & 0xffff);
                        }
                        break;
                    }
                case 0:
                    {
                        for (let bit = ((0) | 0); (((((Number(bit) < Number(8)) ? 1 : 0)) && (((Number(xindex) < Number(160)) ? 1 : 0))) ? 1 : 0); bit = ((((bit) + (1))) | 0), xindex = ((((xindex) + (1))) | 0)) {
                            let colour = ((((((((data) & (32768))) ? (2) : (0))) | (((((data) & (128))) ? (1) : (0))))) | 0);
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
    function method_check_start_of_window(runtime) {
        const members = runtime.members;
        const h_m_line = members.m_line ?? 0;
        if (((Number(h_m_line.window_compare_position) < Number(16)) ? 1 : 0)) {
            0;
        }
        if (((((((((((((((h_m_line.window_enable[h_m_line.window_enable_index]) & (32))) && (((h_m_line.window_active) ? 0 : 1))) ? 1 : 0)) && ((((((((members.m_frame_window_active ?? 0)) || (h_m_line.window_should_trigger)) ? 1 : 0)) || (((Number((members.m_current_line ?? 0)) === Number(h_m_line.window_start_y[h_m_line.window_start_y_index])) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_line.window_compare_position) === Number(h_m_line.window_start_x[h_m_line.window_start_y_index])) ? 1 : 0))) ? 1 : 0)) && (((Number(h_m_line.window_compare_position) < Number(166)) ? 1 : 0))) ? 1 : 0)) {
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
        h_m_line.window_start_y[((((h_m_line.window_start_y_index) + (4))) % (((h_m_line.window_start_y)?.length ?? 0)))] = runtime.readIndex((members.m_vid_regs ?? 0), 10);
        h_m_line.window_start_x[((((h_m_line.window_start_y_index) + (4))) % (((h_m_line.window_start_x)?.length ?? 0)))] = runtime.readIndex((members.m_vid_regs ?? 0), 11);
        h_m_line.window_start_y_index = ((((((h_m_line.window_start_y_index) + (1))) % (((h_m_line.window_start_y)?.length ?? 0)))) | 0);
        h_m_line.window_enable[((((h_m_line.window_enable_index) + (3))) % (((h_m_line.window_enable)?.length ?? 0)))] = runtime.readIndex((members.m_vid_regs ?? 0), 0);
        h_m_line.window_enable_index = ((((((h_m_line.window_enable_index) + (1))) % (((h_m_line.window_enable)?.length ?? 0)))) | 0);
        if ((((((h_m_line.starting) ? 0 : 1)) && (((Number(h_m_line.tile_cycle) < Number(8)) ? 1 : 0))) ? 1 : 0)) {
            h_m_line.window_compare_position = ((((h_m_line.window_compare_position) + (1))) & 0xffff);
        }
    }
    function method_update_scanline(runtime, cycles_to_go) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_enable_experimental_engine = members.m_enable_experimental_engine ?? 0;
        const h_m_gb_bpal = members.m_gb_bpal ?? 0;
        if (h_m_enable_experimental_engine) {
            return;
        }
        let profile = 0;
        if (((Number(((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (3))) === Number(3)) ? 1 : 0)) {
            let l = ((0) | 0);
            if (((Number((members.m_start_x ?? 0)) < Number(0)) ? 1 : 0)) {
                (members.m_layer ?? 0)[1].enabled = ((((((((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (32))) && (((Number((members.m_current_line ?? 0)) >= Number((members.m_window_y ?? 0))) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_window_x ?? 0)) <= Number(166)) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) & 0xff);
                (members.m_layer ?? 0)[0].enabled = (((((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (1))) && (((((((members.m_layer ?? 0)[1].enabled) ? 0 : 1)) || (((((members.m_layer ?? 0)[1].enabled) && (((Number((members.m_window_x ?? 0)) >= Number(7)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) & 0xff);
                if ((members.m_layer ?? 0)[0].enabled) {
                    (members.m_layer ?? 0)[0].bgline = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 2)) + ((members.m_current_line ?? 0)))) & (255))) << 16 >> 16);
                    (members.m_layer ?? 0)[0].bg_map = ((members.m_vram) + ((members.m_gb_bgdtab_offs ?? 0)));
                    (members.m_layer ?? 0)[0].bg_tiles = ((members.m_vram) + ((members.m_gb_chrgen_offs ?? 0)));
                    (members.m_layer ?? 0)[0].xindex = ((runtime.shiftRight(runtime.readIndex((members.m_vid_regs ?? 0), 3), 3)) & 0xff);
                    (members.m_layer ?? 0)[0].xshift = ((((runtime.readIndex((members.m_vid_regs ?? 0), 3)) & (7))) & 0xff);
                    (members.m_layer ?? 0)[0].xstart = ((0) & 0xff);
                    (members.m_layer ?? 0)[0].xend = ((160) & 0xff);
                }
                if ((members.m_layer ?? 0)[1].enabled) {
                    let xpos = (((((members.m_window_x ?? 0)) - (7))) | 0);
                    if (((Number(xpos) < Number(0)) ? 1 : 0)) {
                        xpos = ((0) | 0);
                    }
                    (members.m_layer ?? 0)[1].bgline = (((members.m_window_lines_drawn ?? 0)) << 16 >> 16);
                    (members.m_layer ?? 0)[1].bg_map = ((members.m_vram) + ((members.m_gb_wndtab_offs ?? 0)));
                    (members.m_layer ?? 0)[1].bg_tiles = ((members.m_vram) + ((members.m_gb_chrgen_offs ?? 0)));
                    (members.m_layer ?? 0)[1].xindex = ((0) & 0xff);
                    (members.m_layer ?? 0)[1].xshift = ((0) & 0xff);
                    (members.m_layer ?? 0)[1].xstart = ((xpos) & 0xff);
                    (members.m_layer ?? 0)[1].xend = ((160) & 0xff);
                    (members.m_layer ?? 0)[0].xend = ((xpos) & 0xff);
                }
                members.m_start_x = ((0) | 0);
            }
            if (((Number(cycles_to_go) < Number(160)) ? 1 : 0)) {
                members.m_end_x = (((__l["std::min"] ? __l["std::min"](((((160) - (cycles_to_go))) | 0), 160) : runtime.macro("std::min", ((((160) - (cycles_to_go))) | 0), 160))) | 0);
                if (((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (1))) ? 0 : 1)) {
                    let r = (__l["rectangle"] ? __l["rectangle"]((members.m_start_x ?? 0), (((members.m_end_x ?? 0)) - (1)), (members.m_current_line ?? 0), (members.m_current_line ?? 0)) : runtime.macro("rectangle", (members.m_start_x ?? 0), (((members.m_end_x ?? 0)) - (1)), (members.m_current_line ?? 0), (members.m_current_line ?? 0)));
                    ((members.m_bitmap).fill?.(h_m_gb_bpal[0], r) ?? 0);
                }
                while (((Number(l) < Number(2)) ? 1 : 0)) {
                    let xindex = ((0) & 0xff);
                    let map = 0;
                    let tiles = 0;
                    let data = ((0) & 0xffff);
                    let i = ((0) | 0);
                    let tile_index = ((0) | 0);
                    if ((((members.m_layer ?? 0)[l].enabled) ? 0 : 1)) {
                        l = ((((l) + (1))) | 0);
                        continue;
                    }
                    map = runtime.addressOf((members.m_layer ?? 0)[l].bg_map, (((((members.m_layer ?? 0)[l].bgline) << (2))) & (992)));
                    tiles = runtime.addressOf((members.m_layer ?? 0)[l].bg_tiles, (((((members.m_layer ?? 0)[l].bgline) & (7))) << (1)));
                    xindex = (((members.m_start_x ?? 0)) & 0xff);
                    if (((Number(xindex) < Number((members.m_layer ?? 0)[l].xstart)) ? 1 : 0)) {
                        xindex = (((members.m_layer ?? 0)[l].xstart) & 0xff);
                    }
                    i = (((members.m_end_x ?? 0)) | 0);
                    if (((Number(i) > Number((members.m_layer ?? 0)[l].xend)) ? 1 : 0)) {
                        i = (((members.m_layer ?? 0)[l].xend) | 0);
                    }
                    i = ((((i) - (xindex))) | 0);
                    tile_index = ((((((runtime.readIndex(map, (members.m_layer ?? 0)[l].xindex)) ^ ((members.m_gb_tile_no_mod ?? 0)))) * (16))) | 0);
                    data = ((((runtime.readIndex(tiles, tile_index)) | (((runtime.readIndex(tiles, ((tile_index) + (1)))) << (8))))) & 0xffff);
                    data = ((((data) << ((members.m_layer ?? 0)[l].xshift))) & 0xffff);
                    while (((Number(i) > Number(0)) ? 1 : 0)) {
                        while ((((((Number((members.m_layer ?? 0)[l].xshift) < Number(8)) ? 1 : 0)) && (i)) ? 1 : 0)) {
                            let colour = ((((((((data) & (32768))) ? (2) : (0))) | (((((data) & (128))) ? (1) : (0))))) | 0);
                            method_plot_pixel(runtime, xindex, (members.m_current_line ?? 0), h_m_gb_bpal[colour]);
                            (members.m_bg_zbuf ?? 0)[xindex] = colour;
                            xindex = ((((xindex) + (1))) & 0xff);
                            data = ((((data) << (1))) & 0xffff);
                            (members.m_layer ?? 0)[l].xshift = (((((members.m_layer ?? 0)[l].xshift) + (1))) & 0xff);
                            i = ((((i) - (1))) | 0);
                        }
                        if (((Number((members.m_layer ?? 0)[l].xshift) === Number(8)) ? 1 : 0)) {
                            if (((Number(l) === Number(0)) ? 1 : 0)) {
                                (members.m_layer ?? 0)[0].bgline = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 2)) + ((members.m_current_line ?? 0)))) & (255))) << 16 >> 16);
                                map = runtime.addressOf((members.m_layer ?? 0)[l].bg_map, (((((members.m_layer ?? 0)[l].bgline) << (2))) & (992)));
                                tiles = runtime.addressOf((members.m_layer ?? 0)[l].bg_tiles, (((((members.m_layer ?? 0)[l].bgline) & (7))) << (1)));
                            }
                            (members.m_layer ?? 0)[l].xindex = (((((((members.m_layer ?? 0)[l].xindex) + (1))) & (31))) & 0xff);
                            (members.m_layer ?? 0)[l].xshift = ((0) & 0xff);
                            tile_index = ((((((runtime.readIndex(map, (members.m_layer ?? 0)[l].xindex)) ^ ((members.m_gb_tile_no_mod ?? 0)))) * (16))) | 0);
                            data = ((((runtime.readIndex(tiles, tile_index)) | (((runtime.readIndex(tiles, ((tile_index) + (1)))) << (8))))) & 0xffff);
                        }
                    }
                    l = ((((l) + (1))) | 0);
                }
                if ((((((Number((members.m_end_x ?? 0)) === Number(160)) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (2)))) ? 1 : 0)) {
                    method_update_sprites(runtime);
                }
                members.m_start_x = (((members.m_end_x ?? 0)) | 0);
            }
        }
        else {
            if (((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) ? 0 : 1)) {
                if (((Number((members.m_previous_line ?? 0)) !== Number((members.m_current_line ?? 0))) ? 1 : 0)) {
                    if (((Number((members.m_current_line ?? 0)) < Number(144)) ? 1 : 0)) {
                        let r = (__l["screen().visible_area"]?.() ?? 0);
                        let r1 = (__l["rectangle"] ? __l["rectangle"](r.min_x, r.max_x, (members.m_current_line ?? 0), (members.m_current_line ?? 0)) : runtime.macro("rectangle", r.min_x, r.max_x, (members.m_current_line ?? 0), (members.m_current_line ?? 0)));
                        ((members.m_bitmap).fill?.(0, r1) ?? 0);
                    }
                    members.m_previous_line = (((members.m_current_line ?? 0)) | 0);
                }
            }
        }
    }
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_bitmap = members.m_bitmap ?? 0;
        (__l["copybitmap"] ? __l["copybitmap"](bitmap, h_m_bitmap, 0, 0, 0, 0, cliprect) : runtime.macro("copybitmap", bitmap, h_m_bitmap, 0, 0, 0, 0, cliprect));
        return 0;
    }
    function method_update_state(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_enable_experimental_engine = members.m_enable_experimental_engine ?? 0;
        const h_m_line = members.m_line ?? 0;
        if ((members.m_updating_state ?? 0)) {
            return;
        }
        members.m_updating_state = ((1) ? 1 : 0);
        let now = (__l["machine().time"]?.() ?? 0);
        0;
        let cycles = (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"](((now) - ((members.m_last_updated ?? 0)))) : ((members.m_lr35902)?.attotime_to_cycles?.(((now) - ((members.m_last_updated ?? 0)))) ?? 0));
        method_update_oam_dma_state(runtime, cycles);
        if (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) {
            0;
            if (((Number((members.m_cycles_left ?? 0)) > Number(0)) ? 1 : 0)) {
                if ((((((((((((Number((members.m_state ?? 0)) === Number(1)) ? 1 : 0)) || (((Number((members.m_state ?? 0)) === Number(2)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? 0)) === Number(5)) ? 1 : 0))) ? 1 : 0)) {
                    if (h_m_enable_experimental_engine) {
                        method_update_line_state(runtime, cycles);
                    }
                }
                if (((Number(cycles) >= Number((members.m_cycles_left ?? 0))) ? 1 : 0)) {
                    cycles = ((cycles) - ((members.m_cycles_left ?? 0)));
                    members.m_cycles_left = 0;
                }
                else {
                    members.m_cycles_left = ((members.m_cycles_left) - (cycles));
                    cycles = 0;
                }
            }
            while (((Number((members.m_cycles_left ?? 0)) === Number(0)) ? 1 : 0)) {
                let state_cycles = ((0) & 0xffff);
                members.m_state = (((members.m_next_state ?? 0)) | 0);
                switch ((members.m_state ?? 0)) {
                    case 3:
                        {
                            members.m_next_state = ((4) | 0);
                            state_cycles = ((4) & 0xffff);
                            break;
                        }
                    case 4:
                        {
                            method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                            if ((members.m_layer ?? 0)[1].enabled) {
                                if (((h_m_enable_experimental_engine) ? 0 : 1)) {
                                    members.m_window_lines_drawn = ((((members.m_window_lines_drawn) + (1))) | 0);
                                }
                            }
                            members.m_previous_line = (((members.m_current_line ?? 0)) | 0);
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
                            members.m_stat_mode0_int = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (8))) ? (1) : (0))) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            members.m_mode = ((0) | 0);
                            members.m_next_state = ((8) | 0);
                            state_cycles = ((((((((202) - ((members.m_scrollx_adjust ?? 0)))) - ((members.m_sprite_cycles ?? 0)))) - ((members.m_window_cycles ?? 0)))) & 0xffff);
                            break;
                        }
                    case 8:
                        {
                            method_increment_scanline(runtime);
                            members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? 0), 10)) & 0xff);
                            members.m_stat_lyc_int_prev = (((members.m_stat_lyc_int ?? 0)) ? 1 : 0);
                            members.m_stat_lyc_int = ((0) ? 1 : 0);
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) < Number(144)) ? 1 : 0)) {
                                members.m_stat_mode0_int = ((0) ? 1 : 0);
                            }
                            members.m_stat_mode2_int = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (32))) ? (1) : (0))) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
                            0;
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(144)) ? 1 : 0)) {
                                members.m_next_state = ((13) | 0);
                                state_cycles = ((4) & 0xffff);
                            }
                            else {
                                members.m_next_state = ((11) | 0);
                                members.m_oam_locked_reading = ((1) | 0);
                                state_cycles = ((4) & 0xffff);
                            }
                            break;
                        }
                    case 9:
                        {
                            members.m_mode = ((2) | 0);
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (252))) | (2)));
                            members.m_oam_locked = ((1) | 0);
                            members.m_stat_mode1_int = ((0) ? 1 : 0);
                            members.m_stat_mode2_int = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (32))) ? (1) : (0))) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
                                members.m_scrollx_adjust = ((((runtime.readIndex((members.m_vid_regs ?? 0), 3)) & (7))) | 0);
                            }
                            members.m_next_state = ((1) | 0);
                            method_clear_line_state(runtime);
                            method_select_sprites(runtime);
                            members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? 0), 10)) & 0xff);
                            state_cycles = ((80) & 0xffff);
                            state_cycles = ((8) & 0xffff);
                            members.m_next_state = ((10) | 0);
                            break;
                        }
                    case 10:
                        {
                            if ((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (32))) && (((Number((members.m_current_line ?? 0)) === Number((members.m_window_y ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                                h_m_line.window_should_trigger = ((1) & 0xff);
                            }
                            0;
                            state_cycles = ((72) & 0xffff);
                            members.m_next_state = ((1) | 0);
                            break;
                        }
                    case 11:
                        {
                            members.m_stat_mode0_int = ((0) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            members.m_mode = ((2) | 0);
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (252))) | (2)));
                            members.m_oam_locked = ((1) | 0);
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 5))) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
                            }
                            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
                                members.m_scrollx_adjust = ((((runtime.readIndex((members.m_vid_regs ?? 0), 3)) & (7))) | 0);
                            }
                            members.m_next_state = ((1) | 0);
                            method_clear_line_state(runtime);
                            method_select_sprites(runtime);
                            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
                                members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? 0), 10)) & 0xff);
                            }
                            state_cycles = ((80) & 0xffff);
                            members.m_next_state = ((12) | 0);
                            state_cycles = ((8) & 0xffff);
                            break;
                        }
                    case 12:
                        {
                            if ((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (32))) && (((Number((members.m_current_line ?? 0)) === Number((((members.m_window_y ?? 0)) + (1)))) ? 1 : 0))) ? 1 : 0)) {
                                h_m_line.window_should_trigger = ((1) & 0xff);
                            }
                            0;
                            members.m_next_state = ((1) | 0);
                            state_cycles = ((72) & 0xffff);
                            break;
                        }
                    case 1:
                        {
                            for (let i = ((0) | 0); ((Number(i) < Number(((h_m_line.window_start_y)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                h_m_line.window_start_y[i] = runtime.readIndex((members.m_vid_regs ?? 0), 10);
                                h_m_line.window_start_x[i] = runtime.readIndex((members.m_vid_regs ?? 0), 11);
                            }
                            h_m_line.window_start_y_index = ((0) | 0);
                            for (let i = ((0) | 0); ((Number(i) < Number(((h_m_line.window_enable)?.length ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                h_m_line.window_enable[i] = runtime.readIndex((members.m_vid_regs ?? 0), 0);
                            }
                            h_m_line.window_enable_index = ((0) | 0);
                            members.m_stat_mode2_int = ((0) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            members.m_mode = ((3) | 0);
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (252))) | (3)));
                            members.m_oam_locked = ((1) | 0);
                            members.m_vram_locked = ((1) | 0);
                            if (h_m_enable_experimental_engine) {
                                members.m_next_state = ((4) | 0);
                                state_cycles = ((((169) + ((members.m_sprite_cycles ?? 0)))) & 0xffff);
                            }
                            else {
                                members.m_next_state = ((3) | 0);
                                state_cycles = ((((((168) + ((members.m_scrollx_adjust ?? 0)))) + ((members.m_sprite_cycles ?? 0)))) & 0xffff);
                                members.m_next_state = ((2) | 0);
                                state_cycles = ((12) & 0xffff);
                                members.m_start_x = ((-1) | 0);
                            }
                            break;
                        }
                    case 2:
                        {
                            members.m_window_x = ((runtime.readIndex((members.m_vid_regs ?? 0), 11)) & 0xff);
                            if (((h_m_enable_experimental_engine) ? 0 : 1)) {
                                method_calculate_window_cycles(runtime);
                            }
                            members.m_next_state = ((4) | 0);
                            state_cycles = ((((((((157) + ((members.m_scrollx_adjust ?? 0)))) + ((members.m_sprite_cycles ?? 0)))) + ((members.m_window_cycles ?? 0)))) & 0xffff);
                            break;
                        }
                    case 13:
                        {
                            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
                            members.m_stat_mode2_int = ((0) ? 1 : 0);
                            members.m_stat_mode0_int = ((0) ? 1 : 0);
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(144)) ? 1 : 0)) {
                                (__l["m_lr35902.set_input_line"] ? __l["m_lr35902.set_input_line"](0, 1) : ((members.m_lr35902)?.set_input_line?.(0, 1) ?? 0));
                                (__l["m_lr35902.execute_set_input"] ? __l["m_lr35902.execute_set_input"](0, 1) : ((members.m_lr35902)?.execute_set_input?.(0, 1) ?? 0));
                                members.m_mode = ((1) | 0);
                                runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (252))) | (1)));
                                members.m_stat_mode1_int = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (16))) ? (1) : (0))) ? 1 : 0);
                            }
                            method_check_stat_irq(runtime);
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 5))) ? 1 : 0)) {
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
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
                            if (((Number((members.m_current_line ?? 0)) === Number(153)) ? 1 : 0)) {
                                members.m_next_state = ((15) | 0);
                                state_cycles = ((4) & 0xffff);
                            }
                            else {
                                members.m_next_state = ((13) | 0);
                                state_cycles = ((4) & 0xffff);
                            }
                            break;
                        }
                    case 15:
                        {
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 5))) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
                            }
                            else {
                                runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
                            }
                            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            method_increment_scanline(runtime);
                            members.m_next_state = ((16) | 0);
                            state_cycles = ((4) & 0xffff);
                            break;
                        }
                    case 16:
                        {
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
                            members.m_next_state = ((17) | 0);
                            state_cycles = ((4) & 0xffff);
                            break;
                        }
                    case 17:
                        {
                            members.m_frame_window_active = ((0) ? 1 : 0);
                            members.m_stat_lyc_int = (((((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 5)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 4))) ? 1 : 0)) && (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64)))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
                            method_check_stat_irq(runtime);
                            if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 5))) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
                            }
                            members.m_next_state = ((18) | 0);
                            state_cycles = ((444) & 0xffff);
                            break;
                        }
                    case 18:
                        {
                            members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? 0), 10)) & 0xff);
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (252)));
                            members.m_next_state = ((9) | 0);
                            state_cycles = ((4) & 0xffff);
                            break;
                        }
                }
                0;
                if ((((((((((((Number((members.m_state ?? 0)) === Number(1)) ? 1 : 0)) || (((Number((members.m_state ?? 0)) === Number(2)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0))) ? 1 : 0)) || (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
                    if (h_m_enable_experimental_engine) {
                        method_update_line_state(runtime, cycles);
                    }
                }
                if (((Number(cycles) >= Number(state_cycles)) ? 1 : 0)) {
                    cycles = ((cycles) - (state_cycles));
                    members.m_cycles_left = 0;
                }
                else {
                    members.m_cycles_left = ((state_cycles) - (cycles));
                }
            }
        }
        else {
            method_increment_scanline(runtime);
            if (((Number((members.m_current_line ?? 0)) < Number(144)) ? 1 : 0)) {
                method_update_scanline(runtime, 0);
            }
            members.m_cycles_left = 456;
        }
        0;
        members.m_last_updated = (__l["machine().time"]?.() ?? 0);
        let next_cycles = (((members.m_cycles_left ?? 0)) | 0);
        if ((((((Number((members.m_oam_dma_start_cycles ?? 0)) > Number(0)) ? 1 : 0)) && (((Number((members.m_oam_dma_start_cycles ?? 0)) < Number(next_cycles)) ? 1 : 0))) ? 1 : 0)) {
            next_cycles = (((members.m_oam_dma_start_cycles ?? 0)) | 0);
        }
        if ((((((Number((members.m_oam_dma_cycles_left ?? 0)) > Number(0)) ? 1 : 0)) && (((Number((members.m_oam_dma_cycles_left ?? 0)) < Number(next_cycles)) ? 1 : 0))) ? 1 : 0)) {
            next_cycles = (((members.m_oam_dma_cycles_left ?? 0)) | 0);
        }
        ((runtime.dereference(members.m_lcd_timer)).adjust?.((__l["m_lr35902.cycles_to_attotime"] ? __l["m_lr35902.cycles_to_attotime"](next_cycles) : ((members.m_lr35902)?.cycles_to_attotime?.(next_cycles) ?? 0))) ?? 0);
        members.m_updating_state = ((0) ? 1 : 0);
    }
    function method_update_oam_dma_state(runtime, cycles) {
        const members = runtime.members;
        if (((Number((members.m_oam_dma_cycles_left ?? 0)) > Number(0)) ? 1 : 0)) {
            if (((Number(cycles) >= Number((members.m_oam_dma_cycles_left ?? 0))) ? 1 : 0)) {
                members.m_oam_dma_cycles_left = ((0) | 0);
                members.m_oam_dma_processing = ((0) ? 1 : 0);
            }
            else {
                members.m_oam_dma_cycles_left = ((((members.m_oam_dma_cycles_left) - (cycles))) | 0);
            }
        }
        if (((Number((members.m_oam_dma_start_cycles ?? 0)) > Number(0)) ? 1 : 0)) {
            if (((Number(cycles) >= Number((members.m_oam_dma_start_cycles ?? 0))) ? 1 : 0)) {
                for (let i = ((0) | 0); ((Number(i) < Number(160)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    runtime.writeIndex(runtime.writableMember("m_oam"), i, ((runtime.dereference(members.m_program_space)).read_byte?.((((members.m_oam_dma_source_address ?? 0)) + (i))) ?? 0));
                }
                members.m_oam_dma_start_cycles = ((0) | 0);
                members.m_oam_dma_cycles_left = ((640) | 0);
                members.m_oam_dma_processing = ((1) ? 1 : 0);
            }
            else {
                members.m_oam_dma_start_cycles = ((((members.m_oam_dma_start_cycles) - (cycles))) | 0);
            }
        }
    }
    function method_check_stat_irq(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let new_stat_int = (((((((((((((((members.m_stat_mode0_int ?? 0)) || ((members.m_stat_mode1_int ?? 0))) ? 1 : 0)) || ((members.m_stat_mode2_int ?? 0))) ? 1 : 0)) || ((members.m_stat_lyc_int ?? 0))) ? 1 : 0)) || ((members.m_stat_write_int ?? 0))) ? 1 : 0)) ? 1 : 0);
        0;
        if ((((new_stat_int) && ((((members.m_stat_int ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            0;
            (__l["m_lr35902.set_input_line"] ? __l["m_lr35902.set_input_line"](1, 1) : ((members.m_lr35902)?.set_input_line?.(1, 1) ?? 0));
            (__l["m_lr35902.execute_set_input"] ? __l["m_lr35902.execute_set_input"](1, 1) : ((members.m_lr35902)?.execute_set_input?.(1, 1) ?? 0));
        }
        members.m_stat_int = ((new_stat_int) ? 1 : 0);
        members.m_stat_write_int = ((0) ? 1 : 0);
    }
    function method_increment_scanline(runtime) {
        const members = runtime.members;
        members.m_current_line = (((((((members.m_current_line ?? 0)) + (1))) % (154))) | 0);
        if (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) {
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 4, (members.m_current_line ?? 0));
        }
        if (((Number((members.m_current_line ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_window_lines_drawn = ((0) | 0);
        }
    }
    function method_clear_line_state(runtime) {
        const members = runtime.members;
        const h_m_line = members.m_line ?? 0;
        const h_m_enable_experimental_engine = members.m_enable_experimental_engine ?? 0;
        for (let i = ((0) | 0); ((Number(i) < Number(10)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
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
        h_m_line.tile_count = ((runtime.shiftRight(runtime.readIndex((members.m_vid_regs ?? 0), 3), 3)) & 0xff);
        h_m_line.tile_cycle = ((0) & 0xff);
        h_m_line.window_compare_position = ((256) & 0xffff);
        h_m_line.window_active = ((0) & 0xff);
        h_m_line.window_should_trigger = ((0) & 0xff);
        if (h_m_enable_experimental_engine) {
            members.m_scrollx_adjust = ((0) | 0);
        }
    }
    function method_select_sprites(runtime) {
        const members = runtime.members;
        const h_m_line = members.m_line ?? 0;
        members.m_sprCount = ((0) | 0);
        members.m_sprite_cycles = ((0) | 0);
        if ((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) && (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (2)))) ? 1 : 0)) {
            let sprite_occurs = new Uint8Array(Math.max(0, Number(32)));
            (() => { const target = sprite_occurs; const bytes = Number(((sprite_occurs)?.byteLength ?? 1)); if (Array.isArray(target) || Array.isArray(target?.source))
                return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) {
                const width = target.source.BYTES_PER_ELEMENT ?? 1;
                target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width));
                return target;
            } target.fill(0, 0, bytes); return target; })();
            let height = ((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (4))) ? (16) : (8))) | 0);
            let line = (((((members.m_current_line ?? 0)) + (16))) | 0);
            for (let i = ((0) | 0); ((Number(i) < Number(160)) ? 1 : 0); i = ((((i) + (4))) | 0)) {
                if ((((((Number(line) >= Number(runtime.readIndex((members.m_oam ?? 0), i))) ? 1 : 0)) && (((Number(line) < Number(((runtime.readIndex((members.m_oam ?? 0), i)) + (height)))) ? 1 : 0))) ? 1 : 0)) {
                    if (((Number((members.m_sprCount ?? 0)) < Number(10)) ? 1 : 0)) {
                        (members.m_sprite ?? 0)[(members.m_sprCount ?? 0)] = runtime.divide(i, 4);
                        if (((Number(runtime.readIndex((members.m_oam ?? 0), ((i) + (1)))) < Number(168)) ? 1 : 0)) {
                            runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? 0)).enabled = ((1) & 0xff);
                            runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? 0)).y = ((runtime.readIndex((members.m_oam ?? 0), i)) & 0xff);
                            runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? 0)).x = ((runtime.readIndex((members.m_oam ?? 0), ((i) + (1)))) & 0xff);
                            runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? 0)).pattern = ((runtime.readIndex((members.m_oam ?? 0), ((i) + (2)))) & 0xff);
                            runtime.readIndex(h_m_line.sprite, (members.m_sprCount ?? 0)).flags = ((runtime.readIndex((members.m_oam ?? 0), ((i) + (3)))) & 0xff);
                            let spr_x = ((((runtime.readIndex((members.m_oam ?? 0), ((i) + (1)))) ? (runtime.add(runtime.readIndex((members.m_oam ?? 0), ((i) + (1))), ((runtime.readIndex((members.m_vid_regs ?? 0), 3)) & (7)))) : (0))) | 0);
                            if (runtime.readIndex(sprite_occurs, runtime.shiftRight(spr_x, 3))) {
                                members.m_sprite_cycles = ((((members.m_sprite_cycles) + (3))) | 0);
                            }
                            members.m_sprite_cycles = ((((members.m_sprite_cycles) + (3))) | 0);
                            runtime.writeIndex(sprite_occurs, runtime.shiftRight(spr_x, 3), ((runtime.readIndex(sprite_occurs, runtime.shiftRight(spr_x, 3))) | (((1) << (((spr_x) & (7)))))));
                        }
                        members.m_sprCount = ((((members.m_sprCount) + (1))) | 0);
                    }
                }
            }
            if (((Number((members.m_sprCount ?? 0)) > Number(0)) ? 1 : 0)) {
                for (let i = ((0) | 0); ((Number(i) < Number(22)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if (runtime.readIndex(sprite_occurs, i)) {
                        0;
                    }
                    if (runtime.readIndex(sprite_occurs, i)) {
                        if ((((members.__static_select_sprites_cycles__initialised ?? 0)) ? 0 : 1)) {
                            members.__static_select_sprites_cycles = [3, 8, 7, 8, 6, 8, 7, 8, 5, 8, 7, 8, 6, 8, 7, 8, 4, 8, 7, 8, 6, 8, 7, 8, 5, 8, 7, 8, 6, 8, 7, 8];
                            members.__static_select_sprites_cycles__initialised = 1;
                        }
                        let cycles = (members.__static_select_sprites_cycles ?? 0);
                        members.m_sprite_cycles = ((((members.m_sprite_cycles) + (runtime.readIndex(cycles, ((runtime.readIndex(sprite_occurs, i)) & (31)))))) | 0);
                    }
                }
                0;
            }
        }
    }
    function method_calculate_window_cycles(runtime) {
        const members = runtime.members;
        members.m_window_cycles = ((0) | 0);
        0;
        if (((((((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (32))) && (((Number((members.m_window_x ?? 0)) < Number(167)) ? 1 : 0))) ? 1 : 0)) && (((Number((members.m_window_y ?? 0)) < Number(144)) ? 1 : 0))) ? 1 : 0)) {
            members.m_window_cycles = ((4) | 0);
            if (((Number((members.m_window_x ?? 0)) === Number(15)) ? 1 : 0)) {
                members.m_window_cycles = ((12) | 0);
            }
        }
    }
    function method_vram_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            method_update_state(runtime);
            0;
        }
        return ((((((Number((members.m_vram_locked ?? 0)) === Number(1)) ? 1 : 0)) ? (255) : (runtime.readIndex((members.m_vram ?? 0), ((offset) + ((((members.m_vram_bank ?? 0)) * (8192)))))))) & 0xff);
    }
    function method_vram_w(runtime, offset, data) {
        const members = runtime.members;
        method_update_state(runtime);
        if (((Number((members.m_vram_locked ?? 0)) === Number(1)) ? 1 : 0)) {
            return;
        }
        runtime.writeIndex(runtime.writableMember("m_vram"), ((offset) + ((((members.m_vram_bank ?? 0)) * (8192)))), data);
    }
    function method_oam_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            method_update_state(runtime);
            0;
        }
        return ((((((((((((Number((members.m_oam_locked ?? 0)) === Number(1)) ? 1 : 0)) || (((Number((members.m_oam_locked_reading ?? 0)) === Number(1)) ? 1 : 0))) ? 1 : 0)) || ((members.m_oam_dma_processing ?? 0))) ? 1 : 0)) ? (255) : (runtime.readIndex((members.m_oam ?? 0), offset)))) & 0xff);
    }
    function method_oam_w(runtime, offset, data) {
        const members = runtime.members;
        method_update_state(runtime);
        if (((((((((Number((members.m_oam_locked ?? 0)) === Number(1)) ? 1 : 0)) || (((Number(offset) >= Number(160)) ? 1 : 0))) ? 1 : 0)) || ((members.m_oam_dma_processing ?? 0))) ? 1 : 0)) {
            return;
        }
        runtime.writeIndex(runtime.writableMember("m_oam"), offset, data);
    }
    function method_video_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
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
        return ((runtime.readIndex((members.m_vid_regs ?? 0), offset)) & 0xff);
    }
    function method_video_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_line = members.m_line ?? 0;
        const h_m_gb_bpal = members.m_gb_bpal ?? 0;
        const h_m_gb_spal0 = members.m_gb_spal0 ?? 0;
        const h_m_gb_spal1 = members.m_gb_spal1 ?? 0;
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
                        runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-4)));
                        members.m_old_curline = ((runtime.readIndex((members.m_vid_regs ?? 0), 4)) & 0xff);
                        runtime.writeIndex(runtime.writableMember("m_vid_regs"), 4, 0);
                        members.m_oam_locked = ((0) | 0);
                        members.m_vram_locked = ((0) | 0);
                    }
                    else {
                        if (((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) ? 0 : 1)) {
                            method_lcd_switch_on(runtime, data);
                        }
                        else {
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
                    data = ((((((128) | (((data) & (120))))) | (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (7))))) & 0xff);
                    if (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) {
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
                    if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 5)) !== Number(data)) ? 1 : 0)) {
                        if ((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(data)) ? 1 : 0)) || (((((((((Number((members.m_state ?? 0)) === Number(15)) ? 1 : 0)) && (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) === Number(153)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                            0;
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
                            if (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64))) {
                                if ((((((Number((members.m_state ?? 0)) !== Number(8)) ? 1 : 0)) || ((((members.m_stat_lyc_int_prev ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                                    members.m_stat_lyc_int = ((1) ? 1 : 0);
                                    if ((members.m_stat_mode2_int ?? 0)) {
                                        members.m_stat_int = ((0) ? 1 : 0);
                                    }
                                    method_check_stat_irq(runtime);
                                }
                            }
                        }
                        else {
                            0;
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
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
                    method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                    h_m_gb_bpal[0] = ((data) & (3));
                    h_m_gb_bpal[1] = runtime.shiftRight(((data) & (12)), 2);
                    h_m_gb_bpal[2] = runtime.shiftRight(((data) & (48)), 4);
                    h_m_gb_bpal[3] = runtime.shiftRight(((data) & (192)), 6);
                    break;
                }
            case 8:
                {
                    h_m_gb_spal0[0] = ((data) & (3));
                    h_m_gb_spal0[1] = runtime.shiftRight(((data) & (12)), 2);
                    h_m_gb_spal0[2] = runtime.shiftRight(((data) & (48)), 4);
                    h_m_gb_spal0[3] = runtime.shiftRight(((data) & (192)), 6);
                    break;
                }
            case 9:
                {
                    h_m_gb_spal1[0] = ((data) & (3));
                    h_m_gb_spal1[1] = runtime.shiftRight(((data) & (12)), 2);
                    h_m_gb_spal1[2] = runtime.shiftRight(((data) & (48)), 4);
                    h_m_gb_spal1[3] = runtime.shiftRight(((data) & (192)), 6);
                    break;
                }
            case 2:
                {
                    method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                    break;
                }
            case 3:
                {
                    method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                    0;
                    if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
                        let adjust = ((((data) & (7))) | 0);
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
    function method_lcd_switch_on(runtime, new_data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_line = members.m_line ?? 0;
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
        if ((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(runtime.readIndex((members.m_vid_regs ?? 0), 5))) ? 1 : 0)) && (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) !== Number((members.m_old_curline ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
            if (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64))) {
                members.m_stat_lyc_int = ((1) ? 1 : 0);
                method_check_stat_irq(runtime);
            }
        }
        else {
            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
        }
        method_clear_line_state(runtime);
        members.m_window_y = ((runtime.readIndex((members.m_vid_regs ?? 0), 10)) & 0xff);
        if ((((((new_data) & (32))) && (((Number((members.m_current_line ?? 0)) === Number((members.m_window_y ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            h_m_line.window_should_trigger = ((1) & 0xff);
        }
        members.m_state = ((9) | 0);
        members.m_next_state = ((1) | 0);
        members.m_cycles_left = 80;
        ((runtime.dereference(members.m_lcd_timer)).adjust?.((__l["m_lr35902.cycles_to_attotime"] ? __l["m_lr35902.cycles_to_attotime"]((members.m_cycles_left ?? 0)) : ((members.m_lr35902)?.cycles_to_attotime?.((members.m_cycles_left ?? 0)) ?? 0))) ?? 0);
    }
    function method_stat_write(runtime, new_data) {
        const members = runtime.members;
        0;
        let new_lyc_int = (((members.m_stat_lyc_int ?? 0)) ? 1 : 0);
        if (((new_data) & (64))) {
            if (((Number(((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (68))) === Number(4)) ? 1 : 0)) {
                new_lyc_int = ((1) ? 1 : 0);
            }
        }
        else {
            new_lyc_int = ((0) ? 1 : 0);
        }
        switch ((members.m_mode ?? 0)) {
            case 0:
                {
                    members.m_stat_mode0_int = ((((((new_data) & (8))) ? (1) : (0))) ? 1 : 0);
                    if ((((members.m_stat_int ?? 0)) ? 0 : 1)) {
                        if (((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (8))) ? 0 : 1)) {
                            members.m_stat_write_int = ((1) ? 1 : 0);
                        }
                    }
                    else {
                        if (((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (8))) ? 0 : 1)) {
                            if (((((((members.m_stat_lyc_int ?? 0)) ? 0 : 1)) && (((new_lyc_int) ? 0 : 1))) ? 1 : 0)) {
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
                    if ((((members.m_stat_int ?? 0)) ? 0 : 1)) {
                        members.m_stat_write_int = ((1) ? 1 : 0);
                    }
                    else {
                        if (((((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (16))) ? 0 : 1)) {
                            if (((((((members.m_stat_lyc_int ?? 0)) ? 0 : 1)) && (((new_lyc_int) ? 0 : 1))) ? 1 : 0)) {
                                members.m_stat_int = ((0) ? 1 : 0);
                                members.m_stat_write_int = ((1) ? 1 : 0);
                            }
                        }
                    }
                    break;
                }
            case 2:
                {
                    if (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (32))) {
                        if (((((((members.m_stat_lyc_int ?? 0)) ? 0 : 1)) && (new_lyc_int)) ? 1 : 0)) {
                            members.m_stat_int = ((0) ? 1 : 0);
                        }
                    }
                    if (((Number(((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (68))) === Number(4)) ? 1 : 0)) {
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
    function method_dmg_ppu_device__video_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_line = members.m_line ?? 0;
        const h_m_gb_bpal = members.m_gb_bpal ?? 0;
        const h_m_gb_spal0 = members.m_gb_spal0 ?? 0;
        const h_m_gb_spal1 = members.m_gb_spal1 ?? 0;
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
                        runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-4)));
                        members.m_old_curline = ((runtime.readIndex((members.m_vid_regs ?? 0), 4)) & 0xff);
                        runtime.writeIndex(runtime.writableMember("m_vid_regs"), 4, 0);
                        members.m_oam_locked = ((0) | 0);
                        members.m_vram_locked = ((0) | 0);
                    }
                    else {
                        if (((((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) ? 0 : 1)) {
                            method_lcd_switch_on(runtime, data);
                        }
                        else {
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
                    data = ((((((128) | (((data) & (120))))) | (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (7))))) & 0xff);
                    if (((runtime.readIndex((members.m_vid_regs ?? 0), 0)) & (128))) {
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
                    if (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 5)) !== Number(data)) ? 1 : 0)) {
                        if ((((((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(data)) ? 1 : 0)) || (((((((((Number((members.m_state ?? 0)) === Number(15)) ? 1 : 0)) && (((Number(runtime.readIndex((members.m_vid_regs ?? 0), 4)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) === Number(153)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                            0;
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) | (4)));
                            if (((runtime.readIndex((members.m_vid_regs ?? 0), 1)) & (64))) {
                                if ((((((Number((members.m_state ?? 0)) !== Number(8)) ? 1 : 0)) || ((((members.m_stat_lyc_int_prev ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                                    members.m_stat_lyc_int = ((1) ? 1 : 0);
                                    if ((members.m_stat_mode2_int ?? 0)) {
                                        members.m_stat_int = ((0) ? 1 : 0);
                                    }
                                    method_check_stat_irq(runtime);
                                }
                            }
                        }
                        else {
                            0;
                            runtime.writeIndex(runtime.writableMember("m_vid_regs"), 1, ((runtime.readIndex(runtime.writableMember("m_vid_regs"), 1)) & (-5)));
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
                    method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                    h_m_gb_bpal[0] = ((data) & (3));
                    h_m_gb_bpal[1] = runtime.shiftRight(((data) & (12)), 2);
                    h_m_gb_bpal[2] = runtime.shiftRight(((data) & (48)), 4);
                    h_m_gb_bpal[3] = runtime.shiftRight(((data) & (192)), 6);
                    break;
                }
            case 8:
                {
                    h_m_gb_spal0[0] = ((data) & (3));
                    h_m_gb_spal0[1] = runtime.shiftRight(((data) & (12)), 2);
                    h_m_gb_spal0[2] = runtime.shiftRight(((data) & (48)), 4);
                    h_m_gb_spal0[3] = runtime.shiftRight(((data) & (192)), 6);
                    break;
                }
            case 9:
                {
                    h_m_gb_spal1[0] = ((data) & (3));
                    h_m_gb_spal1[1] = runtime.shiftRight(((data) & (12)), 2);
                    h_m_gb_spal1[2] = runtime.shiftRight(((data) & (48)), 4);
                    h_m_gb_spal1[3] = runtime.shiftRight(((data) & (192)), 6);
                    break;
                }
            case 2:
                {
                    method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                    break;
                }
            case 3:
                {
                    method_update_scanline(runtime, (__l["m_lr35902.attotime_to_cycles"] ? __l["m_lr35902.attotime_to_cycles"]((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) : ((members.m_lr35902)?.attotime_to_cycles?.((typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'function' ? (runtime.dereference(members.m_lcd_timer)).remaining() : typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_lcd_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_lcd_timer)).remaining : runtime.container(members.m_lcd_timer, "remaining"))) ?? 0)));
                    0;
                    if (((Number(h_m_line.scrollx_delay) > Number(0)) ? 1 : 0)) {
                        let adjust = ((((data) & (7))) | 0);
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
    function method_update_tick(runtime, param) {
        const members = runtime.members;
        method_update_state(runtime);
    }
    function method_state_to_string(runtime, state) {
        const members = runtime.members;
        switch (state) {
            case 1:
                {
                    return "GB_LCD_STATE_LYXX_M3";
                }
            case 2:
                {
                    return "GB_LCD_STATE_LYXX_M3_2";
                }
            case 3:
                {
                    return "GB_LCD_STATE_LYXX_PRE_M0";
                }
            case 4:
                {
                    return "GB_LCD_STATE_LYXX_M0";
                }
            case 5:
                {
                    return "GB_LCD_STATE_LYXX_M0_2";
                }
            case 6:
                {
                    return "GB_LCD_STATE_LYXX_M0_GBC_PAL";
                }
            case 7:
                {
                    return "GB_LCD_STATE_LYXX_M0_PRE_INC";
                }
            case 8:
                {
                    return "GB_LCD_STATE_LYXX_M0_INC";
                }
            case 9:
                {
                    return "GB_LCD_STATE_LY00_M2";
                }
            case 10:
                {
                    return "GB_LCD_STATE_LY00_M2_WND";
                }
            case 12:
                {
                    return "GB_LCD_STATE_LYXX_M2_WND";
                }
            case 11:
                {
                    return "GB_LCD_STATE_LYXX_M2";
                }
            case 13:
                {
                    return "GB_LCD_STATE_LY9X_M1";
                }
            case 14:
                {
                    return "GB_LCD_STATE_LY9X_M1_INC";
                }
            case 15:
                {
                    return "GB_LCD_STATE_LY00_M1";
                }
            case 16:
                {
                    return "GB_LCD_STATE_LY00_M1_1";
                }
            case 17:
                {
                    return "GB_LCD_STATE_LY00_M1_2";
                }
            case 18:
                {
                    return "GB_LCD_STATE_LY00_M0";
                }
            default:
                {
                    return "unknown state";
                }
        }
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
        "update_tick": method_update_tick,
        "state_to_string": method_state_to_string
    };
})();
definition.compiledMethodLinks = ["copybitmap", "m_lr35902.attotime_to_cycles", "m_lr35902.cycles_to_attotime", "m_lr35902.execute_set_input", "m_lr35902.set_input_line", "machine", "machine().side_effects_disabled", "machine().time", "rectangle", "screen", "screen().visible_area", "std::min"];
export const device = definition;
export default device;
