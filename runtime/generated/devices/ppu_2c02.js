import deviceData from './ppu_2c02.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_init_palette_tables(runtime) {
        const members = runtime.members;
        let is_pal = ((((Number(members.m_scanlines_per_frame) !== Number(262)) ? 1 : 0)) ? 1 : 0);
        let entry = 0;
        for (let color_emphasis = 0; ((Number(color_emphasis) < Number(8)) ? 1 : 0); color_emphasis = ((color_emphasis) + (1))) {
            for (let color_intensity = 0; ((Number(color_intensity) < Number(4)) ? 1 : 0); color_intensity = ((color_intensity) + (1))) {
                for (let color_num = 0; ((Number(color_num) < Number(16)) ? 1 : 0); color_num = ((color_num) + (1))) {
                    let col = method_nespal_to_RGB(runtime, color_intensity, color_num, color_emphasis, is_pal);
                    (runtime.palette[entry] = col);
                    entry = ((entry) + (1));
                }
            }
        }
    }
    function method_nespal_to_RGB(runtime, color_intensity, color_num, color_emphasis, is_pal_or_dendy) {
        const members = runtime.members;
        let tint = 0.22;
        let hue = 287;
        let Kr = 0.2989;
        let Kb = 0.1145;
        let Ku = 2.029;
        let Kv = 1.14;
        let sat = 0;
        let y = 0;
        let u = 0;
        let v = 0;
        let rad = 0;
        switch (color_num) {
            case 0:
                sat = 0;
                rad = 0;
                y = ([0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77][(((((((0) * (4))) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                break;
            case 13:
                sat = 0;
                rad = 0;
                y = ([0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77][(((((((2) * (4))) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                break;
            case 14:
            case 15:
                sat = 0;
                rad = 0;
                y = 0;
                break;
            default:
                sat = tint;
                rad = (runtime.calls["DEGREE_TO_RADIAN"]?.(((((color_num) * (30))) + (hue))) ?? 0);
                y = ([0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77][(((((((1) * (4))) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                break;
        }
        u = ((sat) * ((runtime.calls["cos"]?.(rad) ?? 0)));
        v = ((sat) * ((runtime.calls["sin"]?.(rad) ?? 0)));
        let R = ((((y) + (((Kv) * (v))))) * (255));
        let G = ((((y) - (((((((((Kb) * (Ku))) * (u))) + (((((Kr) * (Kv))) * (v))))) / (((((1) - (Kb))) - (Kr))))))) * (255));
        let B = ((((y) + (((Ku) * (u))))) * (255));
        method_apply_color_emphasis_and_clamp(runtime, is_pal_or_dendy, color_emphasis, ({ get: () => R, set: (value) => { R = value; } }), ({ get: () => G, set: (value) => { G = value; } }), ({ get: () => B, set: (value) => { B = value; } }));
        return (runtime.calls["rgb_t"]?.((runtime.calls["floor"]?.(((R) + (0.5))) ?? 0), (runtime.calls["floor"]?.(((G) + (0.5))) ?? 0), (runtime.calls["floor"]?.(((B) + (0.5))) ?? 0)) ?? 0);
    }
    function method_apply_color_emphasis_and_clamp(runtime, is_pal_or_dendy, color_emphasis, R, G, B) {
        const members = runtime.members;
        if (is_pal_or_dendy) {
            color_emphasis = ((((color_emphasis) >>> (2)) & 1) << 2 | (((color_emphasis) >>> (0)) & 1) << 1 | (((color_emphasis) >>> (1)) & 1) << 0);
        }
        R.set((runtime.calls["std::clamp"]?.(((R.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((((((color_emphasis) * (3))) + (0))) % 24) + 24) % 24] ?? 0))), 0, 255) ?? 0));
        G.set((runtime.calls["std::clamp"]?.(((G.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((((((color_emphasis) * (3))) + (1))) % 24) + 24) % 24] ?? 0))), 0, 255) ?? 0));
        B.set((runtime.calls["std::clamp"]?.(((B.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((((((color_emphasis) * (3))) + (2))) % 24) + 24) % 24] ?? 0))), 0, 255) ?? 0));
    }
    function method_draw_background(runtime, line_priority) {
        const members = runtime.members;
        let scroll_x_coarse = ((((members.m_refresh_data) & (31))) & 0xff);
        let scroll_y_coarse = ((((((members.m_refresh_data) & (992))) >>> (5))) & 0xff);
        let nametable = ((((members.m_refresh_data) & (3072))) & 0xffff);
        let scroll_y_fine = ((((((members.m_refresh_data) & (28672))) >>> (12))) & 0xff);
        let x = scroll_x_coarse;
        let tile_index = ((((nametable) | (8192))) + (((scroll_y_coarse) * (32))));
        let start_x = ((((members.m_x_fine) ^ (7))) - (7));
        let dest = members.m_bitmap["pix&"](members.m_scanline, start_x);
        members.m_tilecount = ((0) | 0);
        while (((Number(members.m_tilecount) < Number(34)) ? 1 : 0)) {
            let index1 = ((tile_index) + (x));
            let page2 = method_readbyte(runtime, index1);
            let pos = ((((((index1) & (896))) >>> (4))) | (((((index1) & (31))) >>> (2))));
            let page = ((((index1) & (3072))) >>> (10));
            let address = ((960) + (pos));
            let color_byte = method_readbyte(runtime, ((((((((page) * (1024))) + (address))) & (4095))) + (8192)));
            let color_bits = ((((((index1) & (64))) >>> (4))) + (((index1) & (2))));
            if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                (runtime.calls["m_latch"]?.(((((members.m_tile_page) << (10))) | (((page2) << (4))))) ?? 0);
            }
            if (((Number(start_x) < Number(256)) ? 1 : 0)) {
                address = ((((members.m_tile_page) ? (4096) : (0))) + (((page2) * (16))));
                address = ((address) + (scroll_y_fine));
                (dest = method_draw_tile(runtime, line_priority, color_byte, color_bits, address, start_x, members.m_back_color, dest));
                start_x = ((start_x) + (8));
                x = ((x) + (1));
                if (((Number(x) > Number(31)) ? 1 : 0)) {
                    x = 0;
                    tile_index = ((tile_index) ^ (1024));
                }
            }
            members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
        }
        if (((((members.m_regs[1]) & (2))) ? 0 : 1)) {
            dest = members.m_bitmap["pix&"](members.m_scanline);
            for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
                method_draw_back_pen(runtime, dest, members.m_back_color);
                dest = ({ ...(dest), offset: ((dest).offset + (1)) });
                line_priority[i] = ((line_priority[i]) ^ (2));
            }
        }
    }
    function method_readbyte(runtime, address) {
        const members = runtime.members;
        return (runtime.calls["space().read_byte"]?.(address) ?? 0);
    }
    function method_draw_tile(runtime, line_priority, color_byte, color_bits, address, start_x, back_pen, dest) {
        const members = runtime.members;
        let color = ((((color_byte) >>> (color_bits))) & (3));
        method_read_tile_plane_data(runtime, address, color);
        for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
            let pix = ((0) & 0xff);
            (pix = ((method_shift_tile_plane_data(runtime, pix)) & 0xff));
            if ((((((Number(((start_x) + (i))) >= Number(0)) ? 1 : 0)) && (((Number(((start_x) + (i))) < Number(256)) ? 1 : 0))) ? 1 : 0)) {
                method_draw_tile_pixel(runtime, pix, color, back_pen, dest);
                if (pix) {
                    line_priority[((start_x) + (i))] = ((line_priority[((start_x) + (i))]) | (2));
                }
            }
            dest.offset += 1;
        }
        return dest;
    }
    function method_read_tile_plane_data(runtime, address, color) {
        const members = runtime.members;
        members.m_planebuf[0] = method_readbyte(runtime, ((address) & (8191)));
        members.m_planebuf[1] = method_readbyte(runtime, ((((address) + (8))) & (8191)));
    }
    function method_shift_tile_plane_data(runtime, pix) {
        const members = runtime.members;
        pix = (((((((members.m_planebuf[0]) >>> (7)) & 1)) | ((((((members.m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
        members.m_planebuf[0] = ((members.m_planebuf[0]) << (1));
        members.m_planebuf[1] = ((members.m_planebuf[1]) << (1));
        return pix;
    }
    function method_draw_tile_pixel(runtime, pix, color, back_pen, dest) {
        const members = runtime.members;
        let palval = ((((pix) ? (members.m_palette_ram[((((((4) * (color))) + (pix))) & (31))]) : (back_pen))) & 0xffff);
        (dest).source[(dest).offset] = (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000);
    }
    function method_apply_grayscale_and_emphasis(runtime, color) {
        const members = runtime.members;
        let palval = ((color) & 0xffff);
        palval = ((((palval) & (((((members.m_regs[1]) & (1))) ? (48) : (63))))) & 0xffff);
        palval = ((((palval) | (((((members.m_regs[1]) & (224))) << (1))))) & 0xffff);
        return palval;
    }
    function method_draw_back_pen(runtime, dest, back_pen) {
        const members = runtime.members;
        (dest).source[(dest).offset] = (runtime.palette[method_apply_grayscale_and_emphasis(runtime, back_pen)] ?? 0xff000000);
    }
    function method_draw_sprites(runtime, line_priority) {
        const members = runtime.members;
        let sprite_count = 0;
        let size = ((((members.m_regs[0]) & (32))) ? (16) : (8));
        let first_pixel = ((((members.m_regs[1]) & (4))) ? (0) : (8));
        for (let sprite_index = 0; ((Number(sprite_index) < Number(256)) ? 1 : 0); sprite_index = ((sprite_index) + (4))) {
            let sprite_ypos = ((members.m_spriteram[sprite_index]) + (1));
            let sprite_xpos = members.m_spriteram[((sprite_index) + (3))];
            if ((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((Number(sprite_xpos) === Number(254)) ? 1 : 0))) ? 1 : 0)) {
                sprite_ypos = ((sprite_ypos) - (1));
                if (((line_priority[sprite_xpos]) & (2))) {
                    members.m_regs[2] = ((members.m_regs[2]) | (64));
                }
            }
            if ((((((Number(((sprite_ypos) + (size))) <= Number(members.m_scanline)) ? 1 : 0)) || (((Number(sprite_ypos) > Number(members.m_scanline)) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            let tile = members.m_spriteram[((sprite_index) + (1))];
            let color = ((((members.m_spriteram[((sprite_index) + (2))]) & (3))) + (4));
            let pri = (((((members.m_spriteram[((sprite_index) + (2))]) >>> (5)) & 1)) ? 1 : 0);
            let flipx = (((((members.m_spriteram[((sprite_index) + (2))]) >>> (6)) & 1)) ? 1 : 0);
            let flipy = (((((members.m_spriteram[((sprite_index) + (2))]) >>> (7)) & 1)) ? 1 : 0);
            method_read_extra_sprite_bits(runtime, sprite_index);
            if (((Number(size) === Number(16)) ? 1 : 0)) {
                if ((((tile) >>> (0)) & 1)) {
                    tile = ((tile) & ((~1)));
                    tile = ((tile) | (256));
                }
            }
            if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                (runtime.calls["m_latch"]?.(((((members.m_sprite_page) << (10))) | (((((tile) & (255))) << (4))))) ?? 0);
            }
            let sprite_line = ((members.m_scanline) - (sprite_ypos));
            if (flipy) {
                sprite_line = ((((size) - (1))) - (sprite_line));
            }
            if ((((((Number(size) === Number(16)) ? 1 : 0)) && (((Number(sprite_line) > Number(7)) ? 1 : 0))) ? 1 : 0)) {
                tile = ((tile) + (1));
                sprite_line = ((sprite_line) - (8));
            }
            let index1 = ((tile) * (16));
            index1 = method_apply_sprite_pattern_page(runtime, index1, size);
            method_read_sprite_plane_data(runtime, ((index1) + (sprite_line)));
            if (((Number(sprite_count) === Number(8)) ? 1 : 0)) {
                members.m_regs[2] = ((members.m_regs[2]) | (32));
                break;
            }
            sprite_count = ((sprite_count) + (1));
            if (((((members.m_regs[1]) & (16))) ? 0 : 1)) {
                continue;
            }
            if (pri) {
                for (let pixel = 0; ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((pixel) + (1))) {
                    let pixel_data = ((0) & 0xff);
                    (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_low(runtime, members.m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
            else {
                for (let pixel = 0; ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((pixel) + (1))) {
                    let pixel_data = ((0) & 0xff);
                    (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_high(runtime, members.m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
        }
    }
    function method_read_extra_sprite_bits(runtime, sprite_index) {
        const members = runtime.members;
    }
    function method_apply_sprite_pattern_page(runtime, index1, size) {
        const members = runtime.members;
        if (((Number(size) === Number(8)) ? 1 : 0)) {
            index1 = ((index1) + (((((Number(members.m_sprite_page) === Number(0)) ? 1 : 0)) ? (0) : (4096))));
        }
        return index1;
    }
    function method_read_sprite_plane_data(runtime, address) {
        const members = runtime.members;
        members.m_planebuf[0] = method_readbyte(runtime, ((address) & (8191)));
        members.m_planebuf[1] = method_readbyte(runtime, ((((address) + (8))) & (8191)));
    }
    function method_make_sprite_pixel_data(runtime, pixel_data, flipx) {
        const members = runtime.members;
        if (flipx) {
            pixel_data = ((((((members.m_planebuf[0]) & (1))) | (((((members.m_planebuf[1]) & (1))) << (1))))) & 0xff);
            members.m_planebuf[0] = ((members.m_planebuf[0]) >> (1));
            members.m_planebuf[1] = ((members.m_planebuf[1]) >> (1));
        }
        else {
            pixel_data = (((((((members.m_planebuf[0]) >>> (7)) & 1)) | ((((((members.m_planebuf[1]) >>> (7)) & 1)) << (1))))) & 0xff);
            members.m_planebuf[0] = ((members.m_planebuf[0]) << (1));
            members.m_planebuf[1] = ((members.m_planebuf[1]) << (1));
        }
        return pixel_data;
    }
    function method_draw_sprite_pixel_low(runtime, bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority) {
        const members = runtime.members;
        if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
            if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
                if (((line_priority[((sprite_xpos) + (pixel))]) ? 0 : 1)) {
                    method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
                }
                line_priority[((sprite_xpos) + (pixel))] = ((line_priority[((sprite_xpos) + (pixel))]) | (1));
            }
        }
        if ((((((((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((line_priority[((sprite_xpos) + (pixel))]) & (2)))) ? 1 : 0)) {
            members.m_regs[2] = ((members.m_regs[2]) | (64));
        }
    }
    function method_is_spritepixel_opaque(runtime, pixel_data, color) {
        const members = runtime.members;
        if (pixel_data) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap) {
        const members = runtime.members;
        let palval = ((members.m_palette_ram[((((((4) * (color))) | (pixel_data))) & (31))]) & 0xffff);
        bitmap["pix="](members.m_scanline, ((sprite_xpos) + (pixel)), (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
    }
    function method_draw_sprite_pixel_high(runtime, bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority) {
        const members = runtime.members;
        if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
            if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
                if (((((~line_priority[((sprite_xpos) + (pixel))])) >>> (0)) & 1)) {
                    method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
                    line_priority[((sprite_xpos) + (pixel))] = ((line_priority[((sprite_xpos) + (pixel))]) | (1));
                }
            }
        }
        if ((((((((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((line_priority[((sprite_xpos) + (pixel))]) & (2)))) ? 1 : 0)) {
            members.m_regs[2] = ((members.m_regs[2]) | (64));
        }
    }
    function method_hblank_tick(runtime, param) {
        const members = runtime.members;
        let blanked = ((((Number(((members.m_regs[1]) & (((8) | (16))))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        let vblank = (((((((Number(members.m_scanline) >= Number(((members.m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number(members.m_scanline) < Number(((members.m_scanlines_per_frame) - (1)))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if ((((runtime.calls["m_hblank_callback_proc.isnull"]?.() ?? 0)) ? 0 : 1)) {
            (runtime.calls["m_hblank_callback_proc"]?.(members.m_scanline, vblank, blanked) ?? 0);
        }
        members.m_hblank_timer.adjust(Infinity);
    }
    function method_scanline_tick(runtime, param) {
        const members = runtime.members;
        let blanked = ((((Number(((members.m_regs[1]) & (((8) | (16))))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        let vblank = (((((((((Number(members.m_scanline) >= Number(((members.m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number(members.m_scanline) < Number(((members.m_scanlines_per_frame) - (1)))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
        if ((((runtime.calls["m_scanline_callback_proc.isnull"]?.() ?? 0)) ? 0 : 1)) {
            (runtime.calls["m_scanline_callback_proc"]?.(members.m_scanline, vblank, blanked) ?? 0);
        }
        method_update_scanline(runtime);
        members.m_scanline = ((((members.m_scanline) + (1))) | 0);
        if (((Number(members.m_scanline) === Number(members.m_vblank_first_scanline)) ? 1 : 0)) {
            members.m_regs[2] = ((members.m_regs[2]) | (128));
            if (((members.m_regs[0]) & (128))) {
                members.m_nmi_timer.adjust(members.m_cpu.cycles_to_attotime(4));
            }
        }
        if (((Number(members.m_scanline) === Number(((members.m_scanlines_per_frame) - (1)))) ? 1 : 0)) {
            members.m_regs[2] = ((members.m_regs[2]) & ((~((((128) | (64))) | (32)))));
        }
        else {
            if (((Number(members.m_scanline) === Number(members.m_scanlines_per_frame)) ? 1 : 0)) {
                if (((blanked) ? 0 : 1)) {
                    members.m_refresh_data = ((members.m_refresh_latch) | 0);
                }
                members.m_scanline = ((0) | 0);
            }
        }
        let next_scanline = ((members.m_scanline) + (1));
        if (((Number(next_scanline) === Number(members.m_scanlines_per_frame)) ? 1 : 0)) {
            next_scanline = 0;
        }
        members.m_hblank_timer.adjust(((members.m_cpu.cycles_to_attotime(260)) / (3)));
        members.m_scanline_timer.adjust((runtime.calls["screen"]?.() ?? 0).time_until_pos(((next_scanline) * (members.m_scan_scale))));
    }
    function method_update_scanline(runtime) {
        const members = runtime.members;
        if (((Number(members.m_scanline) <= Number(239)) ? 1 : 0)) {
            method_update_visible_scanline(runtime);
        }
    }
    function method_update_visible_scanline(runtime) {
        const members = runtime.members;
        if (((members.m_regs[1]) & (((8) | (16))))) {
            method_update_visible_enabled_scanline(runtime);
        }
        else {
            method_update_visible_disabled_scanline(runtime);
        }
        if (((Number(members.m_scanline_timer.remaining()) === Number(0)) ? 1 : 0)) {
            method_scanline_increment_fine_ycounter(runtime);
        }
    }
    function method_update_visible_enabled_scanline(runtime) {
        const members = runtime.members;
        if (((Number(members.m_scanline_timer.remaining()) === Number(0)) ? 1 : 0)) {
            members.m_refresh_data = ((((members.m_refresh_data) & ((~1055)))) | 0);
            members.m_refresh_data = ((((members.m_refresh_data) | (((members.m_refresh_latch) & (1055))))) | 0);
        }
        method_render_scanline(runtime);
    }
    function method_render_scanline(runtime) {
        const members = runtime.members;
        let line_priority = new Uint8Array(Math.max(0, Number(256)));
        let profile = 0;
        ((line_priority).fill(0, 0, 256), line_priority);
        members.m_draw_phase = ((0) | 0);
        if (((members.m_regs[1]) & (8))) {
            method_draw_background(runtime, line_priority);
        }
        else {
            method_draw_background_pen(runtime);
        }
        members.m_draw_phase = ((1) | 0);
        method_draw_sprites(runtime, line_priority);
        members.m_draw_phase = ((0) | 0);
    }
    function method_draw_background_pen(runtime) {
        const members = runtime.members;
        for (let i = 0; ((Number(i) < Number(members.m_bitmap.width())) ? 1 : 0); i = ((i) + (1))) {
            method_draw_back_pen(runtime, members.m_bitmap["pix&"](members.m_scanline, i), members.m_back_color);
        }
    }
    function method_update_visible_disabled_scanline(runtime) {
        const members = runtime.members;
        let back_pen = ((members.m_back_color) >>> 0);
        if (members.m_paletteram_in_ppuspace) {
            if (((Number(members.m_videomem_addr) >= Number(16128)) ? 1 : 0)) {
                back_pen = ((members.m_palette_ram[((members.m_videomem_addr) & (31))]) >>> 0);
            }
        }
        for (let i = 0; ((Number(i) < Number(members.m_bitmap.width())) ? 1 : 0); i = ((i) + (1))) {
            method_draw_back_pen(runtime, members.m_bitmap["pix&"](members.m_scanline, i), back_pen);
        }
    }
    function method_scanline_increment_fine_ycounter(runtime) {
        const members = runtime.members;
        members.m_refresh_data = ((((members.m_refresh_data) + (4096))) | 0);
        if (((members.m_refresh_data) & (32768))) {
            let tmp = ((((((members.m_refresh_data) & (992))) + (32))) & 0xffff);
            members.m_refresh_data = ((((members.m_refresh_data) & (31775))) | 0);
            if (((Number(tmp) === Number(960)) ? 1 : 0)) {
                members.m_refresh_data = ((((members.m_refresh_data) ^ (2048))) | 0);
            }
            else {
                members.m_refresh_data = ((((members.m_refresh_data) | (((tmp) & (992))))) | 0);
            }
        }
    }
    return {
        "init_palette_tables": method_init_palette_tables,
        "nespal_to_RGB": method_nespal_to_RGB,
        "apply_color_emphasis_and_clamp": method_apply_color_emphasis_and_clamp,
        "draw_background": method_draw_background,
        "readbyte": method_readbyte,
        "draw_tile": method_draw_tile,
        "read_tile_plane_data": method_read_tile_plane_data,
        "shift_tile_plane_data": method_shift_tile_plane_data,
        "draw_tile_pixel": method_draw_tile_pixel,
        "apply_grayscale_and_emphasis": method_apply_grayscale_and_emphasis,
        "draw_back_pen": method_draw_back_pen,
        "draw_sprites": method_draw_sprites,
        "read_extra_sprite_bits": method_read_extra_sprite_bits,
        "apply_sprite_pattern_page": method_apply_sprite_pattern_page,
        "read_sprite_plane_data": method_read_sprite_plane_data,
        "make_sprite_pixel_data": method_make_sprite_pixel_data,
        "draw_sprite_pixel_low": method_draw_sprite_pixel_low,
        "is_spritepixel_opaque": method_is_spritepixel_opaque,
        "draw_sprite_pixel": method_draw_sprite_pixel,
        "draw_sprite_pixel_high": method_draw_sprite_pixel_high,
        "hblank_tick": method_hblank_tick,
        "scanline_tick": method_scanline_tick,
        "update_scanline": method_update_scanline,
        "update_visible_scanline": method_update_visible_scanline,
        "update_visible_enabled_scanline": method_update_visible_enabled_scanline,
        "render_scanline": method_render_scanline,
        "draw_background_pen": method_draw_background_pen,
        "update_visible_disabled_scanline": method_update_visible_disabled_scanline,
        "scanline_increment_fine_ycounter": method_scanline_increment_fine_ycounter
    };
})();
export const device = definition;
export default device;
