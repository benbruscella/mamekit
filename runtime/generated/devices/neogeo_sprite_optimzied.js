import deviceData from './neogeo_sprite_optimzied.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const __mame_table_0 = [128, 2176, 2184, 10376, 10378, 10890, 10922, 43690, 43754, 47850, 47851, 48107, 48111, 64495, 64511, 65535];
    function method_get_videoram_data(runtime) {
        const members = runtime.members;
        return (((members.m_vram_read_buffer ?? 0)) & 0xffff);
    }
    function method_set_videoram_modulo(runtime, data) {
        const members = runtime.members;
        members.m_vram_modulo = ((data) & 0xffff);
    }
    function method_get_videoram_modulo(runtime) {
        const members = runtime.members;
        return (((members.m_vram_modulo ?? 0)) & 0xffff);
    }
    function method_set_auto_animation_speed(runtime, data) {
        const members = runtime.members;
        members.m_auto_animation_speed = ((data) & 0xff);
    }
    function method_set_auto_animation_disabled(runtime, data) {
        const members = runtime.members;
        members.m_auto_animation_disabled = ((data) & 0xff);
    }
    function method_get_auto_animation_counter(runtime) {
        const members = runtime.members;
        return (((members.m_auto_animation_counter ?? 0)) & 0xff);
    }
    function method_set_fixed_layer_source(runtime, data) {
        const members = runtime.members;
        members.m_fixed_layer_source = ((data) & 0xff);
    }
    function method_set_fixed_layer_bank_type(runtime, data) {
        const members = runtime.members;
        members.m_fixed_layer_bank_type = ((data) & 0xff);
    }
    function method_draw_fixed_layer(runtime, bitmap, scanline) {
        const members = runtime.members;
        const h_m_bppshift = members.m_bppshift ?? 0;
        let gfx_base = (((members.m_fixed_layer_source ?? 0)) ? ((members.m_region_fixed ?? 0)) : ((typeof (runtime.dereference(members.m_region_fixedbios)).base === 'function' ? (runtime.dereference(members.m_region_fixedbios)).base() : typeof (runtime.dereference(members.m_region_fixedbios)).base === 'number' || typeof (runtime.dereference(members.m_region_fixedbios)).base === 'boolean' ? (runtime.dereference(members.m_region_fixedbios)).base : runtime.container(members.m_region_fixedbios, "base"))));
        let addr_mask = (((((((members.m_fixed_layer_source ?? 0)) ? ((members.m_region_fixed_size ?? 0)) : (runtime.container(members.m_region_fixedbios, "bytes")))) - (1))) >>> 0);
        let video_data = runtime.packedView(runtime.addressOf((members.m_videoram_drawsource ?? 0), ((28672) | (runtime.shiftRight(scanline, 3)))), false);
        let pixel_addr = bitmap["pix&"](scanline, 28);
        for (let x = ((0) | 0); ((Number(x) < Number(40)) ? 1 : 0); x = ((((x) + (1))) | 0)) {
            let code_and_palette = ((runtime.dereference(video_data)) & 0xffff);
            let code = ((((code_and_palette) & (4095))) & 0xffff);
            let gfx_offset = ((((((((code) << (5))) | (((scanline) & (7))))) & (addr_mask))) | 0);
            let char_pens = runtime.addressOf((members.m_pens ?? 0), ((((code_and_palette) >>> (12))) << (h_m_bppshift)));
            (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (16)), gfx_base, char_pens));
            (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (24)), gfx_base, char_pens));
            (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (0)), gfx_base, char_pens));
            (pixel_addr = method_draw_fixed_layer_2pixels(runtime, pixel_addr, ((gfx_offset) + (8)), gfx_base, char_pens));
            video_data = runtime.packedView(runtime.addressOf(video_data, 32), false);
        }
    }
    function method_draw_fixed_layer_2pixels(runtime, pixel_addr, offset, gfx_base, char_pens) {
        const members = runtime.members;
        let data = ((runtime.readIndex(gfx_base, offset)) & 0xff);
        if (((data) & (15))) {
            runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, ((data) & (15))));
        }
        pixel_addr.offset += 1;
        if (((data) & (240))) {
            runtime.pointerStore(pixel_addr, runtime.readIndex(char_pens, runtime.shiftRight(((data) & (240)), 4)));
        }
        pixel_addr.offset += 1;
        return pixel_addr;
    }
    function method_draw_sprites(runtime, bitmap, scanline) {
        const members = runtime.members;
        const h_m_region_zoomy = members.m_region_zoomy ?? 0;
        const h_m_bppshift = members.m_bppshift ?? 0;
        let max_sprite_index = ((0) | 0);
        let y = ((0) | 0);
        let x = ((0) | 0);
        let rows = ((0) | 0);
        let zoom_y = ((0) | 0);
        let zoom_x = ((0) | 0);
        let sprite_list = runtime.packedView(0, false);
        if ((((scanline) >>> (0)) & 1)) {
            sprite_list = runtime.packedView(runtime.addressOf((members.m_videoram_drawsource ?? 0), 34432), false);
        }
        else {
            sprite_list = runtime.packedView(runtime.addressOf((members.m_videoram_drawsource ?? 0), 34304), false);
        }
        for (max_sprite_index = ((95) | 0); ((Number(max_sprite_index) >= Number(0)) ? 1 : 0); max_sprite_index = ((((max_sprite_index) - (1))) | 0)) {
            if (((Number(runtime.readIndex(sprite_list, max_sprite_index)) !== Number(0)) ? 1 : 0)) {
                break;
            }
        }
        if (((Number(max_sprite_index) !== Number(95)) ? 1 : 0)) {
            max_sprite_index = ((((max_sprite_index) + (1))) | 0);
        }
        for (let sprite_index = ((0) | 0); ((Number(sprite_index) <= Number(max_sprite_index)) ? 1 : 0); sprite_index = ((((sprite_index) + (1))) | 0)) {
            let sprite_number = ((((runtime.readIndex(sprite_list, sprite_index)) & (511))) & 0xffff);
            let y_control = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((33280) | (sprite_number)))) & 0xffff);
            let zoom_control = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((32768) | (sprite_number)))) & 0xffff);
            if ((((y_control) >>> (6)) & 1)) {
                x = ((((runtime.add(((x) + (zoom_x)), 1)) & (511))) | 0);
                zoom_x = ((((((zoom_control) >>> (8))) & (15))) | 0);
            }
            else {
                y = ((((512) - (((y_control) >>> (7))))) | 0);
                x = ((runtime.shiftRight(runtime.readIndex((members.m_videoram_drawsource ?? 0), ((33792) | (sprite_number))), 7)) | 0);
                zoom_y = ((((zoom_control) & (255))) | 0);
                zoom_x = ((((((zoom_control) >>> (8))) & (15))) | 0);
                rows = ((((y_control) & (63))) | 0);
            }
            if ((((((Number(x) >= Number(320)) ? 1 : 0)) && (((Number(x) <= Number(496)) ? 1 : 0))) ? 1 : 0)) {
                continue;
            }
            if (method_sprite_on_scanline(runtime, scanline, y, rows)) {
                let sprite_line = ((((((scanline) - (y))) & (511))) | 0);
                let zoom_line = ((((sprite_line) & (255))) | 0);
                let invert = (((((sprite_line) >>> (8)) & 1)) ? 1 : 0);
                if (invert) {
                    zoom_line = ((((zoom_line) ^ (255))) | 0);
                }
                if (((Number(rows) > Number(32)) ? 1 : 0)) {
                    zoom_line = ((((zoom_line) % (((((zoom_y) + (1))) << (1))))) | 0);
                    if (((Number(zoom_line) > Number(zoom_y)) ? 1 : 0)) {
                        zoom_line = ((((((((((zoom_y) + (1))) << (1))) - (1))) - (zoom_line))) | 0);
                        invert = ((((invert) ? 0 : 1)) ? 1 : 0);
                    }
                }
                let sprite_y_and_tile = ((runtime.readIndex(h_m_region_zoomy, ((((zoom_y) << (8))) | (zoom_line)))) & 0xff);
                let sprite_y = ((((sprite_y_and_tile) & (15))) | 0);
                let tile = ((((sprite_y_and_tile) >>> (4))) | 0);
                if (invert) {
                    sprite_y = ((((sprite_y) ^ (15))) | 0);
                    tile = ((((tile) ^ (31))) | 0);
                }
                let attr_and_code_offs = ((((sprite_number) << (6))) | (((tile) << (1))));
                let attr = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((attr_and_code_offs) + (1)))) & 0xffff);
                let code = ((((((((attr) << (12))) & (983040))) | (runtime.readIndex((members.m_videoram_drawsource ?? 0), attr_and_code_offs)))) >>> 0);
                if ((((members.m_auto_animation_disabled ?? 0)) ? 0 : 1)) {
                    if ((((attr) >>> (3)) & 1)) {
                        code = ((((((code) & (-8))) | ((((members.m_auto_animation_counter ?? 0)) & (7))))) >>> 0);
                    }
                    else {
                        if ((((attr) >>> (2)) & 1)) {
                            code = ((((((code) & (-4))) | ((((members.m_auto_animation_counter ?? 0)) & (3))))) >>> 0);
                        }
                    }
                }
                if ((((attr) >>> (1)) & 1)) {
                    sprite_y = ((((sprite_y) ^ (15))) | 0);
                }
                let zoom_x_table = (((__mame_table_0[((zoom_x) & 15)] ?? 0)) & 0xffff);
                let gfx_base = ((((((((code) << (8))) | (((sprite_y) << (4))))) & ((members.m_sprite_gfx_address_mask ?? 0)))) | 0);
                let line_pens = runtime.addressOf((members.m_pens ?? 0), ((((attr) >>> (8))) << (h_m_bppshift)));
                let x_inc = ((0) | 0);
                if ((((attr) >>> (0)) & 1)) {
                    gfx_base = ((((gfx_base) + (15))) | 0);
                    x_inc = ((-1) | 0);
                }
                else {
                    x_inc = ((1) | 0);
                }
                if (((Number(x) <= Number(496)) ? 1 : 0)) {
                    let pixel_addr = bitmap["pix&"](scanline, ((x) + (28)));
                    for (let i = ((0) | 0); ((Number(i) < Number(16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if ((((zoom_x_table) >>> (15)) & 1)) {
                            method_draw_pixel(runtime, gfx_base, pixel_addr, line_pens);
                            pixel_addr = runtime.add(pixel_addr, 1);
                        }
                        zoom_x_table = ((((zoom_x_table) << (1))) & 0xffff);
                        if (((Number(zoom_x_table) === Number(0)) ? 1 : 0)) {
                            break;
                        }
                        gfx_base = ((((gfx_base) + (x_inc))) | 0);
                    }
                }
                else {
                    let x_save = ((x) | 0);
                    let pixel_addr = bitmap["pix&"](scanline, 28);
                    for (let i = ((0) | 0); ((Number(i) < Number(16)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                        if ((((zoom_x_table) >>> (15)) & 1)) {
                            if (((Number(x) >= Number(512)) ? 1 : 0)) {
                                method_draw_pixel(runtime, gfx_base, pixel_addr, line_pens);
                                pixel_addr = runtime.add(pixel_addr, 1);
                            }
                            x = ((((x) + (1))) | 0);
                        }
                        zoom_x_table = ((((zoom_x_table) << (1))) & 0xffff);
                        if (((Number(zoom_x_table) === Number(0)) ? 1 : 0)) {
                            break;
                        }
                        gfx_base = ((((gfx_base) + (x_inc))) | 0);
                    }
                    x = ((x_save) | 0);
                }
            }
        }
    }
    function method_sprite_on_scanline(runtime, scanline, y, rows) {
        const members = runtime.members;
        return ((((((((Number(rows) === Number(0)) ? 1 : 0)) || (((Number(rows) >= Number(32)) ? 1 : 0))) ? 1 : 0)) || (((Number(((((scanline) - (y))) & (511))) < Number(((rows) * (16)))) ? 1 : 0))) ? 1 : 0);
    }
    function method_draw_pixel(runtime, romaddr, dst, line_pens) {
        const members = runtime.members;
        let src = runtime.addressOf((members.m_region_sprites ?? 0), ((((runtime.shiftRight(((romaddr) & (-256)), 1)) | (((((((romaddr) & (8))) ^ (8))) << (3))))) | (runtime.shiftRight(((romaddr) & (240)), 2))));
        let x = ((((romaddr) & (7))) | 0);
        let gfx = (((((((((((((runtime.readIndex(src, 3)) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, 1)) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, 2)) >>> (x)) & 1)) << (1))))) | ((((runtime.readIndex(src, 0)) >>> (x)) & 1)))) & 0xff);
        if (gfx) {
            runtime.pointerStore(dst, runtime.readIndex(line_pens, gfx));
        }
    }
    function method_set_pens(runtime, pens) {
        const members = runtime.members;
        members.m_pens = pens;
    }
    function method_auto_animation_timer_callback(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_auto_animation_frame_counter ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_auto_animation_frame_counter = (((members.m_auto_animation_speed ?? 0)) & 0xff);
            members.m_auto_animation_counter = ((((members.m_auto_animation_counter) + (1))) & 0xff);
        }
        else {
            members.m_auto_animation_frame_counter = (((((members.m_auto_animation_frame_counter ?? 0)) - (1))) & 0xff);
        }
        ((runtime.dereference(members.m_auto_animation_timer)).adjust?.(((__l["screen().time_until_pos"] ?? globalThis.mamekitMissingCall?.("screen().time_until_pos"))?.(256) ?? 0)) ?? 0);
    }
    function method_parse_sprites(runtime, scanline) {
        const members = runtime.members;
        let y = ((0) | 0);
        let rows = ((0) | 0);
        let sprite_list = runtime.packedView(0, false);
        let active_sprite_count = ((0) | 0);
        if ((((scanline) >>> (0)) & 1)) {
            sprite_list = runtime.packedView(runtime.addressOf((members.m_videoram_drawsource ?? 0), 34432), false);
        }
        else {
            sprite_list = runtime.packedView(runtime.addressOf((members.m_videoram_drawsource ?? 0), 34304), false);
        }
        for (let sprite_number = ((0) & 0xffff); ((Number(sprite_number) < Number(381)) ? 1 : 0); sprite_number = ((((sprite_number) + (1))) & 0xffff)) {
            let y_control = ((runtime.readIndex((members.m_videoram_drawsource ?? 0), ((33280) | (sprite_number)))) & 0xffff);
            if (((((~y_control)) >>> (6)) & 1)) {
                y = ((((512) - (((y_control) >>> (7))))) | 0);
                rows = ((((y_control) & (63))) | 0);
            }
            if (((Number(rows) === Number(0)) ? 1 : 0)) {
                continue;
            }
            if (((method_sprite_on_scanline(runtime, scanline, y, rows)) ? 0 : 1)) {
                continue;
            }
            runtime.pointerStore(sprite_list, sprite_number);
            sprite_list = runtime.packedView(runtime.add(sprite_list, 1), false);
            active_sprite_count = ((((active_sprite_count) + (1))) | 0);
            if (((Number(active_sprite_count) === Number(96)) ? 1 : 0)) {
                break;
            }
        }
        (() => { const target = sprite_list; const bytes = Number(((((runtime.readIndex(sprite_list, 0))?.byteLength ?? 1)) * (runtime.add(((96) - (active_sprite_count)), 1)))); if (Array.isArray(target) || Array.isArray(target?.source))
            return runtime.macro("memset", target, 0, bytes); if (target?.generatedPointer) {
            const width = target.source.BYTES_PER_ELEMENT ?? 1;
            target.source.fill(0, target.offset, target.offset + Math.ceil(bytes / width));
            return target;
        } target.fill(0, 0, bytes); return target; })();
    }
    function method_optimize_helper(runtime, spritegfx, region_sprites, region_sprites_size) {
        const members = runtime.members;
        let mask = ((method_get_region_mask(runtime, region_sprites, region_sprites_size)) >>> 0);
        (spritegfx = runtime.resize(spritegfx, ((mask) + (1))));
        let src = region_sprites;
        let dest = runtime.addressOf(spritegfx, 0);
        for (let i = 0; ((Number(i) < Number(region_sprites_size)) ? 1 : 0); i = ((i) + (128)), src = runtime.add(src, 128)) {
            for (let y = 0; ((Number(y) < Number(16)) ? 1 : 0); y = ((y) + (1))) {
                for (let x = 0; ((Number(x) < Number(8)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.pointerStore((() => { const previous = dest; dest = runtime.add(dest, 1); return previous; })(), (((((((((((runtime.readIndex(src, ((67) | (((y) << (2)))))) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, ((65) | (((y) << (2)))))) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, ((66) | (((y) << (2)))))) >>> (x)) & 1)) << (1))))) | ((((((runtime.readIndex(src, ((64) | (((y) << (2)))))) >>> (x)) & 1)) << (0)))));
                }
                for (let x = 0; ((Number(x) < Number(8)) ? 1 : 0); x = ((x) + (1))) {
                    runtime.pointerStore((() => { const previous = dest; dest = runtime.add(dest, 1); return previous; })(), (((((((((((runtime.readIndex(src, ((3) | (((y) << (2)))))) >>> (x)) & 1)) << (3))) | ((((((runtime.readIndex(src, ((1) | (((y) << (2)))))) >>> (x)) & 1)) << (2))))) | ((((((runtime.readIndex(src, ((2) | (((y) << (2)))))) >>> (x)) & 1)) << (1))))) | ((((((runtime.readIndex(src, ((0) | (((y) << (2)))))) >>> (x)) & 1)) << (0)))));
                }
            }
        }
        return mask;
    }
    function method_get_region_mask(runtime, rgn, rgn_size) {
        const members = runtime.members;
        let mask = ((4294967295) >>> 0);
        let len = ((rgn_size) >>> 0);
        for (let bit = ((2147483648) >>> 0); ((Number(bit) !== Number(0)) ? 1 : 0); bit = ((runtime.shiftRight(bit, 1)) >>> 0)) {
            if (((((((len) * (2))) - (1))) & (bit))) {
                break;
            }
            mask = ((runtime.shiftRight(mask, 1)) >>> 0);
        }
        return mask;
    }
    function method_neosprite_base_device__optimize_sprite_data(runtime) {
        const members = runtime.members;
        return;
    }
    return {
        "get_videoram_data": method_get_videoram_data,
        "set_videoram_modulo": method_set_videoram_modulo,
        "get_videoram_modulo": method_get_videoram_modulo,
        "set_auto_animation_speed": method_set_auto_animation_speed,
        "set_auto_animation_disabled": method_set_auto_animation_disabled,
        "get_auto_animation_counter": method_get_auto_animation_counter,
        "set_fixed_layer_source": method_set_fixed_layer_source,
        "set_fixed_layer_bank_type": method_set_fixed_layer_bank_type,
        "draw_fixed_layer": method_draw_fixed_layer,
        "draw_sprites": method_draw_sprites,
        "sprite_on_scanline": method_sprite_on_scanline,
        "draw_pixel": method_draw_pixel,
        "set_pens": method_set_pens,
        "auto_animation_timer_callback": method_auto_animation_timer_callback,
        "parse_sprites": method_parse_sprites,
        "optimize_helper": method_optimize_helper,
        "get_region_mask": method_get_region_mask,
        "neosprite_base_device::optimize_sprite_data": method_neosprite_base_device__optimize_sprite_data
    };
})();
definition.compiledMethodLinks = ["screen", "screen().time_until_pos"];
export const device = definition;
export default device;
