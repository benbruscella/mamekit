import deviceData from './ppu_2c02.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_init_palette_tables(runtime) {
        const members = runtime.members;
        let is_pal = ((((Number((members.m_scanlines_per_frame ?? runtime.member("m_scanlines_per_frame"))) !== Number(262)) ? 1 : 0)) ? 1 : 0);
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
                {
                    sat = 0;
                    rad = 0;
                    y = ([0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77][(((((((0) * (4))) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                    break;
                }
            case 13:
                {
                    sat = 0;
                    rad = 0;
                    y = ([0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77][(((((((2) * (4))) + (color_intensity))) % 12) + 12) % 12] ?? 0);
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
                    rad = (runtime.calls["DEGREE_TO_RADIAN"] ? runtime.calls["DEGREE_TO_RADIAN"](((((color_num) * (30))) + (hue))) : runtime.macro("DEGREE_TO_RADIAN", ((((color_num) * (30))) + (hue))));
                    y = ([0.5, 0.75, 1, 1, 0.29, 0.45, 0.73, 0.9, 0, 0.24, 0.47, 0.77][(((((((1) * (4))) + (color_intensity))) % 12) + 12) % 12] ?? 0);
                    break;
                }
        }
        u = ((sat) * ((runtime.calls["cos"] ? runtime.calls["cos"](rad) : runtime.macro("cos", rad))));
        v = ((sat) * ((runtime.calls["sin"] ? runtime.calls["sin"](rad) : runtime.macro("sin", rad))));
        let R = ((((y) + (((Kv) * (v))))) * (255));
        let G = ((((y) - (((runtime.add(((((Kb) * (Ku))) * (u)), ((((Kr) * (Kv))) * (v)))) / (((((1) - (Kb))) - (Kr))))))) * (255));
        let B = ((((y) + (((Ku) * (u))))) * (255));
        method_apply_color_emphasis_and_clamp(runtime, is_pal_or_dendy, color_emphasis, ({ generatedLValue: true, get: () => R, set: (value) => { R = value; } }), ({ generatedLValue: true, get: () => G, set: (value) => { G = value; } }), ({ generatedLValue: true, get: () => B, set: (value) => { B = value; } }));
        return (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"]((runtime.calls["floor"] ? runtime.calls["floor"](((R) + (0.5))) : runtime.macro("floor", ((R) + (0.5)))), (runtime.calls["floor"] ? runtime.calls["floor"](((G) + (0.5))) : runtime.macro("floor", ((G) + (0.5)))), (runtime.calls["floor"] ? runtime.calls["floor"](((B) + (0.5))) : runtime.macro("floor", ((B) + (0.5))))) : runtime.macro("rgb_t", (runtime.calls["floor"] ? runtime.calls["floor"](((R) + (0.5))) : runtime.macro("floor", ((R) + (0.5)))), (runtime.calls["floor"] ? runtime.calls["floor"](((G) + (0.5))) : runtime.macro("floor", ((G) + (0.5)))), (runtime.calls["floor"] ? runtime.calls["floor"](((B) + (0.5))) : runtime.macro("floor", ((B) + (0.5))))));
    }
    function method_apply_color_emphasis_and_clamp(runtime, is_pal_or_dendy, color_emphasis, R, G, B) {
        const members = runtime.members;
        if (is_pal_or_dendy) {
            color_emphasis = ((((color_emphasis) >>> (2)) & 1) << 2 | (((color_emphasis) >>> (0)) & 1) << 1 | (((color_emphasis) >>> (1)) & 1) << 0);
        }
        R.set((runtime.calls["std::clamp"] ? runtime.calls["std::clamp"](((R.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((runtime.add(((color_emphasis) * (3)), 0)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((R.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((runtime.add(((color_emphasis) * (3)), 0)) % 24) + 24) % 24] ?? 0))), 0, 255)));
        G.set((runtime.calls["std::clamp"] ? runtime.calls["std::clamp"](((G.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((runtime.add(((color_emphasis) * (3)), 1)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((G.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((runtime.add(((color_emphasis) * (3)), 1)) % 24) + 24) % 24] ?? 0))), 0, 255)));
        B.set((runtime.calls["std::clamp"] ? runtime.calls["std::clamp"](((B.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((runtime.add(((color_emphasis) * (3)), 2)) % 24) + 24) % 24] ?? 0))), 0, 255) : runtime.macro("std::clamp", ((B.get()) * (([1, 1, 1, 1.24, 0.915, 0.743, 0.794, 1.09, 0.882, 0.905, 1.03, 1.28, 0.741, 0.987, 1, 1.02, 0.908, 0.979, 1.02, 0.98, 0.653, 0.75, 0.75, 0.75][(((runtime.add(((color_emphasis) * (3)), 2)) % 24) + 24) % 24] ?? 0))), 0, 255)));
    }
    function method_draw_background(runtime, line_priority) {
        const members = runtime.members;
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        let scroll_x_coarse = (((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (31))) & 0xff);
        let scroll_y_coarse = (((((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (992))) >>> (5))) & 0xff);
        let nametable = (((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (3072))) & 0xffff);
        let scroll_y_fine = (((((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (28672))) >>> (12))) & 0xff);
        let x = scroll_x_coarse;
        let tile_index = runtime.add(((nametable) | (8192)), ((scroll_y_coarse) * (32)));
        let start_x = (((((members.m_x_fine ?? runtime.member("m_x_fine"))) ^ (7))) - (7));
        let dest = h_m_bitmap["pix&"]((members.m_scanline ?? runtime.member("m_scanline")), start_x);
        members.m_tilecount = ((0) | 0);
        while (((Number((members.m_tilecount ?? runtime.member("m_tilecount"))) < Number(34)) ? 1 : 0)) {
            let index1 = ((tile_index) + (x));
            let page2 = method_readbyte(runtime, index1);
            let pos = ((((((index1) & (896))) >>> (4))) | (((((index1) & (31))) >>> (2))));
            let page = ((((index1) & (3072))) >>> (10));
            let address = ((960) + (pos));
            let color_byte = method_readbyte(runtime, runtime.add(((((((page) * (1024))) + (address))) & (4095)), 8192));
            let color_bits = runtime.add(((((index1) & (64))) >>> (4)), ((index1) & (2)));
            if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                (runtime.calls["m_latch"] ? runtime.calls["m_latch"]((((((members.m_tile_page ?? runtime.member("m_tile_page"))) << (10))) | (((page2) << (4))))) : runtime.macro("m_latch", (((((members.m_tile_page ?? runtime.member("m_tile_page"))) << (10))) | (((page2) << (4))))));
            }
            if (((Number(start_x) < Number(256)) ? 1 : 0)) {
                address = runtime.add((((members.m_tile_page ?? runtime.member("m_tile_page"))) ? (4096) : (0)), ((page2) * (16)));
                address = ((address) + (scroll_y_fine));
                (dest = method_draw_tile(runtime, line_priority, color_byte, color_bits, address, start_x, (members.m_back_color ?? runtime.member("m_back_color")), dest));
                start_x = ((start_x) + (8));
                x = ((x) + (1));
                if (((Number(x) > Number(31)) ? 1 : 0)) {
                    x = 0;
                    tile_index = ((tile_index) ^ (1024));
                }
            }
            members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
        }
        if (((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (2))) ? 0 : 1)) {
            dest = h_m_bitmap["pix&"]((members.m_scanline ?? runtime.member("m_scanline")));
            for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
                method_draw_back_pen(runtime, dest, (members.m_back_color ?? runtime.member("m_back_color")));
                dest = ({ ...(dest), offset: ((dest).offset + (1)) });
                runtime.writeIndex(line_priority, i, ((runtime.readIndex(line_priority, i)) ^ (2)));
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
                    runtime.writeIndex(line_priority, ((start_x) + (i)), ((runtime.readIndex(line_priority, ((start_x) + (i)))) | (2)));
                }
            }
            dest.offset += 1;
        }
        return dest;
    }
    function method_read_tile_plane_data(runtime, address, color) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_planebuf"), 0, method_readbyte(runtime, ((address) & (8191))));
        runtime.writeIndex(runtime.writableMember("m_planebuf"), 1, method_readbyte(runtime, ((((address) + (8))) & (8191))));
    }
    function method_shift_tile_plane_data(runtime, pix) {
        const members = runtime.members;
        pix = (((((((runtime.readIndex((members.m_planebuf ?? runtime.member("m_planebuf")), 0)) >>> (7)) & 1)) | ((((((runtime.readIndex((members.m_planebuf ?? runtime.member("m_planebuf")), 1)) >>> (7)) & 1)) << (1))))) & 0xff);
        runtime.writeIndex(runtime.writableMember("m_planebuf"), 0, ((runtime.readIndex(runtime.writableMember("m_planebuf"), 0)) << (1)));
        runtime.writeIndex(runtime.writableMember("m_planebuf"), 1, ((runtime.readIndex(runtime.writableMember("m_planebuf"), 1)) << (1)));
        return pix;
    }
    function method_draw_tile_pixel(runtime, pix, color, back_pen, dest) {
        const members = runtime.members;
        let palval = ((((pix) ? (runtime.readIndex((members.m_palette_ram ?? runtime.member("m_palette_ram")), ((((((4) * (color))) + (pix))) & (31)))) : (back_pen))) & 0xffff);
        runtime.pointerStore(dest, (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
    }
    function method_apply_grayscale_and_emphasis(runtime, color) {
        const members = runtime.members;
        let palval = ((color) & 0xffff);
        palval = ((runtime.andAssign(palval, ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (1))) ? (48) : (63)))) & 0xffff);
        palval = ((((palval) | (((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (224))) << (1))))) & 0xffff);
        return palval;
    }
    function method_draw_back_pen(runtime, dest, back_pen) {
        const members = runtime.members;
        runtime.pointerStore(dest, (runtime.palette[method_apply_grayscale_and_emphasis(runtime, back_pen)] ?? 0xff000000));
    }
    function method_ppu2c0x_device__draw_background(runtime, line_priority) {
        const members = runtime.members;
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        let scroll_x_coarse = (((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (31))) & 0xff);
        let scroll_y_coarse = (((((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (992))) >>> (5))) & 0xff);
        let nametable = (((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (3072))) & 0xffff);
        let scroll_y_fine = (((((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (28672))) >>> (12))) & 0xff);
        let x = scroll_x_coarse;
        let tile_index = runtime.add(((nametable) | (8192)), ((scroll_y_coarse) * (32)));
        let start_x = (((((members.m_x_fine ?? runtime.member("m_x_fine"))) ^ (7))) - (7));
        let dest = h_m_bitmap["pix&"]((members.m_scanline ?? runtime.member("m_scanline")), start_x);
        members.m_tilecount = ((0) | 0);
        while (((Number((members.m_tilecount ?? runtime.member("m_tilecount"))) < Number(34)) ? 1 : 0)) {
            let index1 = ((tile_index) + (x));
            let page2 = method_readbyte(runtime, index1);
            let pos = ((((((index1) & (896))) >>> (4))) | (((((index1) & (31))) >>> (2))));
            let page = ((((index1) & (3072))) >>> (10));
            let address = ((960) + (pos));
            let color_byte = method_readbyte(runtime, runtime.add(((((((page) * (1024))) + (address))) & (4095)), 8192));
            let color_bits = runtime.add(((((index1) & (64))) >>> (4)), ((index1) & (2)));
            if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                (runtime.calls["m_latch"] ? runtime.calls["m_latch"]((((((members.m_tile_page ?? runtime.member("m_tile_page"))) << (10))) | (((page2) << (4))))) : runtime.macro("m_latch", (((((members.m_tile_page ?? runtime.member("m_tile_page"))) << (10))) | (((page2) << (4))))));
            }
            if (((Number(start_x) < Number(256)) ? 1 : 0)) {
                address = runtime.add((((members.m_tile_page ?? runtime.member("m_tile_page"))) ? (4096) : (0)), ((page2) * (16)));
                address = ((address) + (scroll_y_fine));
                (dest = method_draw_tile(runtime, line_priority, color_byte, color_bits, address, start_x, (members.m_back_color ?? runtime.member("m_back_color")), dest));
                start_x = ((start_x) + (8));
                x = ((x) + (1));
                if (((Number(x) > Number(31)) ? 1 : 0)) {
                    x = 0;
                    tile_index = ((tile_index) ^ (1024));
                }
            }
            members.m_tilecount = ((((members.m_tilecount) + (1))) | 0);
        }
        if (((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (2))) ? 0 : 1)) {
            dest = h_m_bitmap["pix&"]((members.m_scanline ?? runtime.member("m_scanline")));
            for (let i = 0; ((Number(i) < Number(8)) ? 1 : 0); i = ((i) + (1))) {
                method_draw_back_pen(runtime, dest, (members.m_back_color ?? runtime.member("m_back_color")));
                dest = ({ ...(dest), offset: ((dest).offset + (1)) });
                runtime.writeIndex(line_priority, i, ((runtime.readIndex(line_priority, i)) ^ (2)));
            }
        }
    }
    function method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap) {
        const members = runtime.members;
        let palval = ((runtime.readIndex((members.m_palette_ram ?? runtime.member("m_palette_ram")), ((((((4) * (color))) | (pixel_data))) & (31)))) & 0xffff);
        bitmap["pix="]((members.m_scanline ?? runtime.member("m_scanline")), ((sprite_xpos) + (pixel)), (runtime.palette[method_apply_grayscale_and_emphasis(runtime, palval)] ?? 0xff000000));
    }
    function method_draw_sprite_pixel_low(runtime, bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority) {
        const members = runtime.members;
        if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
            if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
                if (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) ? 0 : 1)) {
                    method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
                }
                runtime.writeIndex(line_priority, ((sprite_xpos) + (pixel)), ((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) | (1)));
            }
        }
        if ((((((((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) & (2)))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (64)));
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
    function method_draw_sprite_pixel_high(runtime, bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority) {
        const members = runtime.members;
        if (method_is_spritepixel_opaque(runtime, pixel_data, color)) {
            if (((Number(((sprite_xpos) + (pixel))) < Number(256)) ? 1 : 0)) {
                if (((((~runtime.readIndex(line_priority, ((sprite_xpos) + (pixel))))) >>> (0)) & 1)) {
                    method_draw_sprite_pixel(runtime, sprite_xpos, color, pixel, pixel_data, bitmap);
                    runtime.writeIndex(line_priority, ((sprite_xpos) + (pixel)), ((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) | (1)));
                }
            }
        }
        if ((((((((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((pixel_data) & (3)))) ? 1 : 0)) && (((Number(((sprite_xpos) + (pixel))) < Number(255)) ? 1 : 0))) ? 1 : 0)) && (((runtime.readIndex(line_priority, ((sprite_xpos) + (pixel)))) & (2)))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (64)));
        }
    }
    function method_draw_sprites(runtime, line_priority) {
        const members = runtime.members;
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        let sprite_count = 0;
        let size = ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 0)) & (32))) ? (16) : (8));
        let first_pixel = ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (4))) ? (0) : (8));
        for (let sprite_index = 0; ((Number(sprite_index) < Number(256)) ? 1 : 0); sprite_index = ((sprite_index) + (4))) {
            let sprite_ypos = runtime.add(runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), sprite_index), 1);
            let sprite_xpos = runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (3)));
            if ((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((Number(sprite_xpos) === Number(254)) ? 1 : 0))) ? 1 : 0)) {
                sprite_ypos = ((sprite_ypos) - (1));
                if (((runtime.readIndex(line_priority, sprite_xpos)) & (2))) {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (64)));
                }
            }
            if ((((((Number(((sprite_ypos) + (size))) <= Number((members.m_scanline ?? runtime.member("m_scanline")))) ? 1 : 0)) || (((Number(sprite_ypos) > Number((members.m_scanline ?? runtime.member("m_scanline")))) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            let tile = runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (1)));
            let color = runtime.add(((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) & (3)), 4);
            let pri = (((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) >>> (5)) & 1)) ? 1 : 0);
            let flipx = (((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) >>> (6)) & 1)) ? 1 : 0);
            let flipy = (((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) >>> (7)) & 1)) ? 1 : 0);
            method_read_extra_sprite_bits(runtime, sprite_index);
            if (((Number(size) === Number(16)) ? 1 : 0)) {
                if ((((tile) >>> (0)) & 1)) {
                    tile = runtime.andAssign(tile, (~1));
                    tile = ((tile) | (256));
                }
            }
            if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                (runtime.calls["m_latch"] ? runtime.calls["m_latch"]((((((members.m_sprite_page ?? runtime.member("m_sprite_page"))) << (10))) | (((((tile) & (255))) << (4))))) : runtime.macro("m_latch", (((((members.m_sprite_page ?? runtime.member("m_sprite_page"))) << (10))) | (((((tile) & (255))) << (4))))));
            }
            let sprite_line = (((members.m_scanline ?? runtime.member("m_scanline"))) - (sprite_ypos));
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
                runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (32)));
                break;
            }
            sprite_count = ((sprite_count) + (1));
            if (((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (16))) ? 0 : 1)) {
                continue;
            }
            if (pri) {
                for (let pixel = 0; ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((pixel) + (1))) {
                    let pixel_data = ((0) & 0xff);
                    (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_low(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
            else {
                for (let pixel = 0; ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((pixel) + (1))) {
                    let pixel_data = ((0) & 0xff);
                    (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_high(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
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
            index1 = ((index1) + (((((Number((members.m_sprite_page ?? runtime.member("m_sprite_page"))) === Number(0)) ? 1 : 0)) ? (0) : (4096))));
        }
        return index1;
    }
    function method_read_sprite_plane_data(runtime, address) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_planebuf"), 0, method_readbyte(runtime, ((address) & (8191))));
        runtime.writeIndex(runtime.writableMember("m_planebuf"), 1, method_readbyte(runtime, ((((address) + (8))) & (8191))));
    }
    function method_make_sprite_pixel_data(runtime, pixel_data, flipx) {
        const members = runtime.members;
        if (flipx) {
            pixel_data = ((((((runtime.readIndex((members.m_planebuf ?? runtime.member("m_planebuf")), 0)) & (1))) | (((((runtime.readIndex((members.m_planebuf ?? runtime.member("m_planebuf")), 1)) & (1))) << (1))))) & 0xff);
            runtime.writeIndex(runtime.writableMember("m_planebuf"), 0, ((runtime.readIndex(runtime.writableMember("m_planebuf"), 0)) >>> (1)));
            runtime.writeIndex(runtime.writableMember("m_planebuf"), 1, ((runtime.readIndex(runtime.writableMember("m_planebuf"), 1)) >>> (1)));
        }
        else {
            pixel_data = (((((((runtime.readIndex((members.m_planebuf ?? runtime.member("m_planebuf")), 0)) >>> (7)) & 1)) | ((((((runtime.readIndex((members.m_planebuf ?? runtime.member("m_planebuf")), 1)) >>> (7)) & 1)) << (1))))) & 0xff);
            runtime.writeIndex(runtime.writableMember("m_planebuf"), 0, ((runtime.readIndex(runtime.writableMember("m_planebuf"), 0)) << (1)));
            runtime.writeIndex(runtime.writableMember("m_planebuf"), 1, ((runtime.readIndex(runtime.writableMember("m_planebuf"), 1)) << (1)));
        }
        return pixel_data;
    }
    function method_ppu2c0x_device__draw_sprites(runtime, line_priority) {
        const members = runtime.members;
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        let sprite_count = 0;
        let size = ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 0)) & (32))) ? (16) : (8));
        let first_pixel = ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (4))) ? (0) : (8));
        for (let sprite_index = 0; ((Number(sprite_index) < Number(256)) ? 1 : 0); sprite_index = ((sprite_index) + (4))) {
            let sprite_ypos = runtime.add(runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), sprite_index), 1);
            let sprite_xpos = runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (3)));
            if ((((((Number(sprite_index) === Number(0)) ? 1 : 0)) && (((Number(sprite_xpos) === Number(254)) ? 1 : 0))) ? 1 : 0)) {
                sprite_ypos = ((sprite_ypos) - (1));
                if (((runtime.readIndex(line_priority, sprite_xpos)) & (2))) {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (64)));
                }
            }
            if ((((((Number(((sprite_ypos) + (size))) <= Number((members.m_scanline ?? runtime.member("m_scanline")))) ? 1 : 0)) || (((Number(sprite_ypos) > Number((members.m_scanline ?? runtime.member("m_scanline")))) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            let tile = runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (1)));
            let color = runtime.add(((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) & (3)), 4);
            let pri = (((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) >>> (5)) & 1)) ? 1 : 0);
            let flipx = (((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) >>> (6)) & 1)) ? 1 : 0);
            let flipy = (((((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), ((sprite_index) + (2)))) >>> (7)) & 1)) ? 1 : 0);
            method_read_extra_sprite_bits(runtime, sprite_index);
            if (((Number(size) === Number(16)) ? 1 : 0)) {
                if ((((tile) >>> (0)) & 1)) {
                    tile = runtime.andAssign(tile, (~1));
                    tile = ((tile) | (256));
                }
            }
            if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                (runtime.calls["m_latch"] ? runtime.calls["m_latch"]((((((members.m_sprite_page ?? runtime.member("m_sprite_page"))) << (10))) | (((((tile) & (255))) << (4))))) : runtime.macro("m_latch", (((((members.m_sprite_page ?? runtime.member("m_sprite_page"))) << (10))) | (((((tile) & (255))) << (4))))));
            }
            let sprite_line = (((members.m_scanline ?? runtime.member("m_scanline"))) - (sprite_ypos));
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
                runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (32)));
                break;
            }
            sprite_count = ((sprite_count) + (1));
            if (((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (16))) ? 0 : 1)) {
                continue;
            }
            if (pri) {
                for (let pixel = 0; ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((pixel) + (1))) {
                    let pixel_data = ((0) & 0xff);
                    (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_low(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
            else {
                for (let pixel = 0; ((Number(pixel) < Number(8)) ? 1 : 0); pixel = ((pixel) + (1))) {
                    let pixel_data = ((0) & 0xff);
                    (pixel_data = ((method_make_sprite_pixel_data(runtime, pixel_data, flipx)) & 0xff));
                    if (((Number(((sprite_xpos) + (pixel))) >= Number(first_pixel)) ? 1 : 0)) {
                        method_draw_sprite_pixel_high(runtime, h_m_bitmap, pixel_data, pixel, sprite_xpos, color, sprite_index, line_priority);
                    }
                }
            }
        }
    }
    function method_palette_write(runtime, offset, data) {
        const members = runtime.members;
        data = ((runtime.andAssign(data, 63)) & 0xff);
        if (((offset) & (3))) {
            runtime.writeIndex(runtime.writableMember("m_palette_ram"), ((offset) & (31)), data);
        }
        else {
            if (((Number(0) === Number(((offset) & (15)))) ? 1 : 0)) {
                members.m_back_color = ((data) & 0xff);
            }
            runtime.writeIndex(runtime.writableMember("m_palette_ram"), ((offset) & (15)), (runtime.writeIndex(runtime.writableMember("m_palette_ram"), runtime.add(((offset) & (15)), 16), data)));
        }
    }
    function method_palette_read(runtime, offset) {
        const members = runtime.members;
        if (((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (1))) {
            return ((runtime.readIndex((members.m_palette_ram ?? runtime.member("m_palette_ram")), ((offset) & (31)))) & (48));
        }
        else {
            return runtime.readIndex((members.m_palette_ram ?? runtime.member("m_palette_ram")), ((offset) & (31)));
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_m_security_value = members.m_security_value ?? runtime.member("m_security_value");
        const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? runtime.member("m_paletteram_in_ppuspace");
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = runtime.andAssign(offset, ((8) - (1)));
        }
        switch (((offset) & (7))) {
            case 2:
                {
                    if (h_m_security_value) {
                        members.m_data_latch = ((((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 2)) & (192))) | (h_m_security_value))) & 0xff);
                    }
                    else {
                        members.m_data_latch = ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 2)) | ((((members.m_data_latch ?? runtime.member("m_data_latch"))) & (31))))) & 0xff);
                    }
                    members.m_toggle = ((0) ? 1 : 0);
                    if ((((members.m_data_latch ?? runtime.member("m_data_latch"))) & (128))) {
                        runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) & (96)));
                    }
                    break;
                }
            case 4:
                {
                    members.m_data_latch = ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 3))) & 0xff);
                    break;
                }
            case 7:
                {
                    if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                        (runtime.calls["m_latch"] ? runtime.calls["m_latch"]((((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (16383))) : runtime.macro("m_latch", (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (16383))));
                    }
                    if ((((((Number((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) >= Number(16128)) ? 1 : 0)) && (h_m_paletteram_in_ppuspace)) ? 1 : 0)) {
                        members.m_data_latch = ((method_readbyte(runtime, (members.m_videomem_addr ?? runtime.member("m_videomem_addr")))) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (12287)))) & 0xff);
                    }
                    else {
                        members.m_data_latch = (((members.m_buffered_data ?? runtime.member("m_buffered_data"))) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (members.m_videomem_addr ?? runtime.member("m_videomem_addr")))) & 0xff);
                    }
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? runtime.member("m_add"))))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        return (members.m_data_latch ?? runtime.member("m_data_latch"));
    }
    function method_ppu2c0x_device__read(runtime, offset) {
        const members = runtime.members;
        const h_m_security_value = members.m_security_value ?? runtime.member("m_security_value");
        const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? runtime.member("m_paletteram_in_ppuspace");
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = runtime.andAssign(offset, ((8) - (1)));
        }
        switch (((offset) & (7))) {
            case 2:
                {
                    if (h_m_security_value) {
                        members.m_data_latch = ((((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 2)) & (192))) | (h_m_security_value))) & 0xff);
                    }
                    else {
                        members.m_data_latch = ((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 2)) | ((((members.m_data_latch ?? runtime.member("m_data_latch"))) & (31))))) & 0xff);
                    }
                    members.m_toggle = ((0) ? 1 : 0);
                    if ((((members.m_data_latch ?? runtime.member("m_data_latch"))) & (128))) {
                        runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) & (96)));
                    }
                    break;
                }
            case 4:
                {
                    members.m_data_latch = ((runtime.readIndex((members.m_spriteram ?? runtime.member("m_spriteram")), runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 3))) & 0xff);
                    break;
                }
            case 7:
                {
                    if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                        (runtime.calls["m_latch"] ? runtime.calls["m_latch"]((((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (16383))) : runtime.macro("m_latch", (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (16383))));
                    }
                    if ((((((Number((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) >= Number(16128)) ? 1 : 0)) && (h_m_paletteram_in_ppuspace)) ? 1 : 0)) {
                        members.m_data_latch = ((method_readbyte(runtime, (members.m_videomem_addr ?? runtime.member("m_videomem_addr")))) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (12287)))) & 0xff);
                    }
                    else {
                        members.m_data_latch = (((members.m_buffered_data ?? runtime.member("m_buffered_data"))) & 0xff);
                        members.m_buffered_data = ((method_readbyte(runtime, (members.m_videomem_addr ?? runtime.member("m_videomem_addr")))) & 0xff);
                    }
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? runtime.member("m_add"))))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        return (members.m_data_latch ?? runtime.member("m_data_latch"));
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_security_value = members.m_security_value ?? runtime.member("m_security_value");
        const h_m_line_write_increment_large = members.m_line_write_increment_large ?? runtime.member("m_line_write_increment_large");
        const h_m_global_refresh_mask = members.m_global_refresh_mask ?? runtime.member("m_global_refresh_mask");
        const h_m_videoram_addr_mask = members.m_videoram_addr_mask ?? runtime.member("m_videoram_addr_mask");
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = runtime.andAssign(offset, ((8) - (1)));
        }
        if ((((h_m_security_value) && (((((offset) & (6))) ? 0 : 1))) ? 1 : 0)) {
            offset = ((offset) ^ (1));
        }
        switch (((offset) & (7))) {
            case 0:
                {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 0, data);
                    members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, 29695)) | 0);
                    members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (3))) << (10))))) | 0);
                    members.m_tile_page = ((((((data) & (16))) >>> (2))) >>> 0);
                    members.m_sprite_page = ((((((data) & (8))) >>> (1))) >>> 0);
                    members.m_add = ((((((data) & (4))) ? (h_m_line_write_increment_large) : (1))) | 0);
                    break;
                }
            case 1:
                {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 1, data);
                    break;
                }
            case 3:
                {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 3, data);
                    break;
                }
            case 4:
                {
                    method_write_to_spriteram_with_increment(runtime, data);
                    break;
                }
            case 5:
                {
                    if ((members.m_toggle ?? runtime.member("m_toggle"))) {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, 3103)) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) << (2))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (7))) << (12))))) | 0);
                    }
                    else {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, ((65504) & (h_m_global_refresh_mask)))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) >>> (3))))) | 0);
                        members.m_x_fine = ((((data) & (7))) & 0xff);
                    }
                    members.m_toggle = (((((members.m_toggle ?? runtime.member("m_toggle"))) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 6:
                {
                    if ((members.m_toggle ?? runtime.member("m_toggle"))) {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, ((65280) & (h_m_global_refresh_mask)))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (data))) | 0);
                        members.m_refresh_data = (((members.m_refresh_latch ?? runtime.member("m_refresh_latch"))) | 0);
                        members.m_videomem_addr = (((members.m_refresh_latch ?? runtime.member("m_refresh_latch"))) >>> 0);
                    }
                    else {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, 255)) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (((h_m_videoram_addr_mask) >>> (8))))) << (8))))) | 0);
                    }
                    members.m_toggle = (((((members.m_toggle ?? runtime.member("m_toggle"))) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 7:
                {
                    let tempAddr = (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (h_m_videoram_addr_mask));
                    if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                        (runtime.calls["m_latch"] ? runtime.calls["m_latch"](({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = value; } })) : runtime.macro("m_latch", ({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = value; } })));
                    }
                    method_writebyte(runtime, tempAddr, data);
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? runtime.member("m_add"))))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        members.m_data_latch = ((data) & 0xff);
    }
    function method_write_to_spriteram_with_increment(runtime, data) {
        const members = runtime.members;
        if ((((((Number((members.m_scanline ?? runtime.member("m_scanline"))) > Number(239)) ? 1 : 0)) || (((((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (((8) | (16))))) ? 0 : 1))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_spriteram"), runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 3), data);
            runtime.writeIndex(runtime.writableMember("m_regs"), 3, ((runtime.add(runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 3), 1)) & (255)));
        }
    }
    function method_writebyte(runtime, address, data) {
        const members = runtime.members;
        (runtime.calls["space().write_byte"]?.(address, data) ?? 0);
    }
    function method_ppu2c0x_device__write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_security_value = members.m_security_value ?? runtime.member("m_security_value");
        const h_m_line_write_increment_large = members.m_line_write_increment_large ?? runtime.member("m_line_write_increment_large");
        const h_m_global_refresh_mask = members.m_global_refresh_mask ?? runtime.member("m_global_refresh_mask");
        const h_m_videoram_addr_mask = members.m_videoram_addr_mask ?? runtime.member("m_videoram_addr_mask");
        if (((Number(offset) >= Number(8)) ? 1 : 0)) {
            0;
            offset = runtime.andAssign(offset, ((8) - (1)));
        }
        if ((((h_m_security_value) && (((((offset) & (6))) ? 0 : 1))) ? 1 : 0)) {
            offset = ((offset) ^ (1));
        }
        switch (((offset) & (7))) {
            case 0:
                {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 0, data);
                    members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, 29695)) | 0);
                    members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (3))) << (10))))) | 0);
                    members.m_tile_page = ((((((data) & (16))) >>> (2))) >>> 0);
                    members.m_sprite_page = ((((((data) & (8))) >>> (1))) >>> 0);
                    members.m_add = ((((((data) & (4))) ? (h_m_line_write_increment_large) : (1))) | 0);
                    break;
                }
            case 1:
                {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 1, data);
                    break;
                }
            case 3:
                {
                    runtime.writeIndex(runtime.writableMember("m_regs"), 3, data);
                    break;
                }
            case 4:
                {
                    method_write_to_spriteram_with_increment(runtime, data);
                    break;
                }
            case 5:
                {
                    if ((members.m_toggle ?? runtime.member("m_toggle"))) {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, 3103)) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) << (2))))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (7))) << (12))))) | 0);
                    }
                    else {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, ((65504) & (h_m_global_refresh_mask)))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (248))) >>> (3))))) | 0);
                        members.m_x_fine = ((((data) & (7))) & 0xff);
                    }
                    members.m_toggle = (((((members.m_toggle ?? runtime.member("m_toggle"))) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 6:
                {
                    if ((members.m_toggle ?? runtime.member("m_toggle"))) {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, ((65280) & (h_m_global_refresh_mask)))) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (data))) | 0);
                        members.m_refresh_data = (((members.m_refresh_latch ?? runtime.member("m_refresh_latch"))) | 0);
                        members.m_videomem_addr = (((members.m_refresh_latch ?? runtime.member("m_refresh_latch"))) >>> 0);
                    }
                    else {
                        members.m_refresh_latch = ((runtime.andAssign(members.m_refresh_latch, 255)) | 0);
                        members.m_refresh_latch = ((((members.m_refresh_latch) | (((((data) & (((h_m_videoram_addr_mask) >>> (8))))) << (8))))) | 0);
                    }
                    members.m_toggle = (((((members.m_toggle ?? runtime.member("m_toggle"))) ? 0 : 1)) ? 1 : 0);
                    break;
                }
            case 7:
                {
                    let tempAddr = (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (h_m_videoram_addr_mask));
                    if ((((runtime.calls["m_latch.isnull"]?.() ?? 0)) ? 0 : 1)) {
                        (runtime.calls["m_latch"] ? runtime.calls["m_latch"](({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = value; } })) : runtime.macro("m_latch", ({ generatedLValue: true, get: () => tempAddr, set: (value) => { tempAddr = value; } })));
                    }
                    method_writebyte(runtime, tempAddr, data);
                    members.m_videomem_addr = ((((members.m_videomem_addr) + ((members.m_add ?? runtime.member("m_add"))))) >>> 0);
                    break;
                }
            default:
                {
                    break;
                }
        }
        members.m_data_latch = ((data) & 0xff);
    }
    function method_render(runtime, bitmap, flipx, flipy, sx, sy, cliprect) {
        const members = runtime.members;
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        if (((Number((typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'function' ? (runtime.dereference(members.m_scanline_timer)).remaining() : typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_scanline_timer)).remaining : runtime.container(members.m_scanline_timer, "remaining"))) !== Number(0)) ? 1 : 0)) {
            method_update_scanline(runtime);
        }
        (runtime.calls["copybitmap"] ? runtime.calls["copybitmap"](bitmap, h_m_bitmap, flipx, flipy, sx, sy, cliprect) : runtime.macro("copybitmap", bitmap, h_m_bitmap, flipx, flipy, sx, sy, cliprect));
    }
    function method_update_scanline(runtime) {
        const members = runtime.members;
        if (((Number((members.m_scanline ?? runtime.member("m_scanline"))) <= Number(239)) ? 1 : 0)) {
            method_update_visible_scanline(runtime);
        }
    }
    function method_update_visible_scanline(runtime) {
        const members = runtime.members;
        if (((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (((8) | (16))))) {
            method_update_visible_enabled_scanline(runtime);
        }
        else {
            method_update_visible_disabled_scanline(runtime);
        }
        if (((Number((typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'function' ? (runtime.dereference(members.m_scanline_timer)).remaining() : typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_scanline_timer)).remaining : runtime.container(members.m_scanline_timer, "remaining"))) === Number(0)) ? 1 : 0)) {
            method_scanline_increment_fine_ycounter(runtime);
        }
    }
    function method_update_visible_enabled_scanline(runtime) {
        const members = runtime.members;
        if (((Number((typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'function' ? (runtime.dereference(members.m_scanline_timer)).remaining() : typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'number' || typeof (runtime.dereference(members.m_scanline_timer)).remaining === 'boolean' ? (runtime.dereference(members.m_scanline_timer)).remaining : runtime.container(members.m_scanline_timer, "remaining"))) === Number(0)) ? 1 : 0)) {
            members.m_refresh_data = ((runtime.andAssign(members.m_refresh_data, (~1055))) | 0);
            members.m_refresh_data = ((((members.m_refresh_data) | ((((members.m_refresh_latch ?? runtime.member("m_refresh_latch"))) & (1055))))) | 0);
        }
        method_render_scanline(runtime);
    }
    function method_render_scanline(runtime) {
        const members = runtime.members;
        let line_priority = new Uint8Array(Math.max(0, Number(256)));
        let profile = 0;
        (() => { const target = line_priority; const bytes = Number(256); if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        } target.fill(0, 0, bytes); return target; })();
        members.m_draw_phase = ((0) | 0);
        if (((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (8))) {
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
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        for (let i = 0; ((Number(i) < Number((typeof (runtime.dereference(members.m_bitmap)).width === 'function' ? (runtime.dereference(members.m_bitmap)).width() : typeof (runtime.dereference(members.m_bitmap)).width === 'number' || typeof (runtime.dereference(members.m_bitmap)).width === 'boolean' ? (runtime.dereference(members.m_bitmap)).width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0); i = ((i) + (1))) {
            method_draw_back_pen(runtime, h_m_bitmap["pix&"]((members.m_scanline ?? runtime.member("m_scanline")), i), (members.m_back_color ?? runtime.member("m_back_color")));
        }
    }
    function method_update_visible_disabled_scanline(runtime) {
        const members = runtime.members;
        const h_m_paletteram_in_ppuspace = members.m_paletteram_in_ppuspace ?? runtime.member("m_paletteram_in_ppuspace");
        const h_m_bitmap = members.m_bitmap ?? runtime.member("m_bitmap");
        let back_pen = (((members.m_back_color ?? runtime.member("m_back_color"))) >>> 0);
        if (h_m_paletteram_in_ppuspace) {
            if (((Number((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) >= Number(16128)) ? 1 : 0)) {
                back_pen = ((runtime.readIndex((members.m_palette_ram ?? runtime.member("m_palette_ram")), (((members.m_videomem_addr ?? runtime.member("m_videomem_addr"))) & (31)))) >>> 0);
            }
        }
        for (let i = 0; ((Number(i) < Number((typeof (runtime.dereference(members.m_bitmap)).width === 'function' ? (runtime.dereference(members.m_bitmap)).width() : typeof (runtime.dereference(members.m_bitmap)).width === 'number' || typeof (runtime.dereference(members.m_bitmap)).width === 'boolean' ? (runtime.dereference(members.m_bitmap)).width : runtime.container(members.m_bitmap, "width")))) ? 1 : 0); i = ((i) + (1))) {
            method_draw_back_pen(runtime, h_m_bitmap["pix&"]((members.m_scanline ?? runtime.member("m_scanline")), i), back_pen);
        }
    }
    function method_scanline_increment_fine_ycounter(runtime) {
        const members = runtime.members;
        members.m_refresh_data = ((((members.m_refresh_data) + (4096))) | 0);
        if ((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (32768))) {
            let tmp = ((runtime.add((((members.m_refresh_data ?? runtime.member("m_refresh_data"))) & (992)), 32)) & 0xffff);
            members.m_refresh_data = ((runtime.andAssign(members.m_refresh_data, 31775)) | 0);
            if (((Number(tmp) === Number(960)) ? 1 : 0)) {
                members.m_refresh_data = ((((members.m_refresh_data) ^ (2048))) | 0);
            }
            else {
                members.m_refresh_data = ((((members.m_refresh_data) | (((tmp) & (992))))) | 0);
            }
        }
    }
    function method_screen_update(runtime, screen, bitmap, cliprect) {
        const members = runtime.members;
        method_render(runtime, bitmap, 0, 0, 0, 0, cliprect);
        return 0;
    }
    function method_hblank_tick(runtime, param) {
        const members = runtime.members;
        const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? runtime.member("m_vblank_first_scanline");
        let blanked = ((((Number(((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (((8) | (16))))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        let vblank = (((((((Number((members.m_scanline ?? runtime.member("m_scanline"))) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number((members.m_scanline ?? runtime.member("m_scanline"))) < Number((((members.m_scanlines_per_frame ?? runtime.member("m_scanlines_per_frame"))) - (1)))) ? 1 : 0))) ? 1 : 0)) ? 1 : 0);
        if ((((runtime.calls["m_hblank_callback_proc.isnull"]?.() ?? 0)) ? 0 : 1)) {
            (runtime.calls["m_hblank_callback_proc"] ? runtime.calls["m_hblank_callback_proc"](({ generatedLValue: true, get: () => (members.m_scanline ?? runtime.member("m_scanline")), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })) : runtime.macro("m_hblank_callback_proc", ({ generatedLValue: true, get: () => (members.m_scanline ?? runtime.member("m_scanline")), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })));
        }
        ((runtime.dereference(members.m_hblank_timer)).adjust?.(Infinity) ?? 0);
    }
    function method_nmi_tick(runtime, param) {
        const members = runtime.members;
        runtime.invoke("m_int_callback", 1);
        runtime.invoke("m_int_callback", 0);
        ((runtime.dereference(members.m_nmi_timer)).adjust?.(Infinity) ?? 0);
    }
    function method_scanline_tick(runtime, param) {
        const members = runtime.members;
        const h_m_vblank_first_scanline = members.m_vblank_first_scanline ?? runtime.member("m_vblank_first_scanline");
        const h_m_scan_scale = members.m_scan_scale ?? runtime.member("m_scan_scale");
        let blanked = ((((Number(((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 1)) & (((8) | (16))))) === Number(0)) ? 1 : 0)) ? 1 : 0);
        let vblank = (((((((((Number((members.m_scanline ?? runtime.member("m_scanline"))) >= Number(((h_m_vblank_first_scanline) - (1)))) ? 1 : 0)) && (((Number((members.m_scanline ?? runtime.member("m_scanline"))) < Number((((members.m_scanlines_per_frame ?? runtime.member("m_scanlines_per_frame"))) - (1)))) ? 1 : 0))) ? 1 : 0)) ? (1) : (0))) ? 1 : 0);
        if ((((runtime.calls["m_scanline_callback_proc.isnull"]?.() ?? 0)) ? 0 : 1)) {
            (runtime.calls["m_scanline_callback_proc"] ? runtime.calls["m_scanline_callback_proc"](({ generatedLValue: true, get: () => (members.m_scanline ?? runtime.member("m_scanline")), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })) : runtime.macro("m_scanline_callback_proc", ({ generatedLValue: true, get: () => (members.m_scanline ?? runtime.member("m_scanline")), set: (value) => { members.m_scanline = ((value) | 0); } }), ({ generatedLValue: true, get: () => vblank, set: (value) => { vblank = ((value) ? 1 : 0); } }), ({ generatedLValue: true, get: () => blanked, set: (value) => { blanked = ((value) ? 1 : 0); } })));
        }
        method_update_scanline(runtime);
        members.m_scanline = ((((members.m_scanline) + (1))) | 0);
        if (((Number((members.m_scanline ?? runtime.member("m_scanline"))) === Number(h_m_vblank_first_scanline)) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) | (128)));
            if (((runtime.readIndex((members.m_regs ?? runtime.member("m_regs")), 0)) & (128))) {
                ((runtime.dereference(members.m_nmi_timer)).adjust?.(((runtime.dereference(members.m_cpu)).cycles_to_attotime?.(4) ?? 0)) ?? 0);
            }
        }
        if (((Number((members.m_scanline ?? runtime.member("m_scanline"))) === Number((((members.m_scanlines_per_frame ?? runtime.member("m_scanlines_per_frame"))) - (1)))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_regs"), 2, ((runtime.readIndex(runtime.writableMember("m_regs"), 2)) & ((~((((128) | (64))) | (32))))));
        }
        else {
            if (((Number((members.m_scanline ?? runtime.member("m_scanline"))) === Number((members.m_scanlines_per_frame ?? runtime.member("m_scanlines_per_frame")))) ? 1 : 0)) {
                if (((blanked) ? 0 : 1)) {
                    members.m_refresh_data = (((members.m_refresh_latch ?? runtime.member("m_refresh_latch"))) | 0);
                }
                members.m_scanline = ((0) | 0);
            }
        }
        let next_scanline = (((members.m_scanline ?? runtime.member("m_scanline"))) + (1));
        if (((Number(next_scanline) === Number((members.m_scanlines_per_frame ?? runtime.member("m_scanlines_per_frame")))) ? 1 : 0)) {
            next_scanline = 0;
        }
        ((runtime.dereference(members.m_hblank_timer)).adjust?.(runtime.divide(((runtime.dereference(members.m_cpu)).cycles_to_attotime?.(260) ?? 0), 3)) ?? 0);
        ((runtime.dereference(members.m_scanline_timer)).adjust?.((runtime.calls["screen().time_until_pos"]?.(((next_scanline) * (h_m_scan_scale))) ?? 0)) ?? 0);
    }
    function method_set_spriteram_value(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
    }
    function method_ppu2c0x_device__set_spriteram_value(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_spriteram"), offset, data);
    }
    return {
        "init_palette_tables": method_init_palette_tables,
        "nespal_to_RGB": method_nespal_to_RGB,
        "draw_background": method_draw_background,
        "readbyte": method_readbyte,
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
        "write": method_write,
        "write_to_spriteram_with_increment": method_write_to_spriteram_with_increment,
        "writebyte": method_writebyte,
        "ppu2c0x_device::write": method_ppu2c0x_device__write,
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
        "set_spriteram_value": method_set_spriteram_value,
        "ppu2c0x_device::set_spriteram_value": method_ppu2c0x_device__set_spriteram_value
    };
})();
export const device = definition;
export default device;
