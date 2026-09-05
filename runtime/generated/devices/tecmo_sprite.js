import deviceData from './tecmo_sprite.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_gaiden_draw_sprites(runtime, screen, bitmap, cliprect, spriteram, sprite_sizey, spr_offset_y, flip_screen) {
        const members = runtime.members;
        let SOURCE_INC = 8;
        let ATTRIBUTES_WORD = 0;
        let TILE_NUMBER_WORD = 1;
        let COLOUR_WORD = 2;
        let Y_POSITION_WORD = 3;
        let X_POSITION_WORD = 4;
        let screenwidth = ((runtime.dereference((typeof (runtime.dereference(screen)).visible_area === 'function' ? (runtime.dereference(screen)).visible_area() : typeof (runtime.dereference(screen)).visible_area === 'number' || typeof (runtime.dereference(screen)).visible_area === 'boolean' ? (runtime.dereference(screen)).visible_area : runtime.container(screen, "visible_area")))).width?.() ?? runtime.container((typeof (runtime.dereference(screen)).visible_area === 'function' ? (runtime.dereference(screen)).visible_area() : typeof (runtime.dereference(screen)).visible_area === 'number' || typeof (runtime.dereference(screen)).visible_area === 'boolean' ? (runtime.dereference(screen)).visible_area : runtime.container(screen, "visible_area")), "width"));
        let xmask = ((((Number(screenwidth) >= Number(512)) ? 1 : 0)) ? (512) : (256));
        let source = spriteram;
        let count = 256;
        while ((() => { const previous = count; count = ((count) - (1)); return previous; })()) {
            let attributes = ((runtime.readIndex(source, ATTRIBUTES_WORD)) & 0xffff);
            let enabled = (((((attributes) >>> (2)) & 1)) ? 1 : 0);
            if (enabled) {
                if ((members.m_bootleg ?? runtime.member("m_bootleg"))) {
                    if ((((attributes) >>> (6)) & 1)) {
                        let frame = (((((typeof (runtime.dereference(screen)).frame_number === 'function' ? (runtime.dereference(screen)).frame_number() : typeof (runtime.dereference(screen)).frame_number === 'number' || typeof (runtime.dereference(screen)).frame_number === 'boolean' ? (runtime.dereference(screen)).frame_number : runtime.container(screen, "frame_number"))) & (1))) & 0xff);
                        if (((Number(frame) === Number(1)) ? 1 : 0)) {
                            enabled = ((0) ? 1 : 0);
                        }
                    }
                }
            }
            if (enabled) {
                let flipx = (((((attributes) >>> (0)) & 1)) ? 1 : 0);
                let flipy = (((((attributes) >>> (1)) & 1)) ? 1 : 0);
                let color = ((runtime.readIndex(source, COLOUR_WORD)) >>> 0);
                let sizex = ((((1) << (((((color) >>> (0))) & (3))))) & 0xff);
                let sizey = ((((1) << (((((color) >>> (sprite_sizey))) & (3))))) & 0xff);
                let number = ((runtime.readIndex(source, TILE_NUMBER_WORD)) >>> 0);
                if (((Number(sizex) >= Number(2)) ? 1 : 0)) {
                    number = ((runtime.andAssign(number, (~1))) >>> 0);
                }
                if (((Number(sizey) >= Number(2)) ? 1 : 0)) {
                    number = ((runtime.andAssign(number, (~2))) >>> 0);
                }
                if (((Number(sizex) >= Number(4)) ? 1 : 0)) {
                    number = ((runtime.andAssign(number, (~4))) >>> 0);
                }
                if (((Number(sizey) >= Number(4)) ? 1 : 0)) {
                    number = ((runtime.andAssign(number, (~8))) >>> 0);
                }
                if (((Number(sizex) >= Number(8)) ? 1 : 0)) {
                    number = ((runtime.andAssign(number, (~16))) >>> 0);
                }
                if (((Number(sizey) >= Number(8)) ? 1 : 0)) {
                    number = ((runtime.andAssign(number, (~32))) >>> 0);
                }
                let ypos = ((((runtime.readIndex(source, Y_POSITION_WORD)) + (spr_offset_y))) & (511));
                let xpos = ((runtime.readIndex(source, X_POSITION_WORD)) & (((((xmask) * (2))) - (1))));
                color = ((((((color) >>> (4))) & (15))) >>> 0);
                if (((Number(xpos) >= Number(xmask)) ? 1 : 0)) {
                    xpos = ((xpos) - (((xmask) * (2))));
                }
                if (((Number(ypos) >= Number(256)) ? 1 : 0)) {
                    ypos = ((ypos) - (512));
                }
                if (flip_screen) {
                    flipx = ((((flipx) ? 0 : 1)) ? 1 : 0);
                    flipy = ((((flipy) ? 0 : 1)) ? 1 : 0);
                    xpos = ((((256) - (((8) * (sizex))))) - (xpos));
                    ypos = ((((256) - (((8) * (sizey))))) - (ypos));
                    if (((Number(xpos) <= Number((-256))) ? 1 : 0)) {
                        xpos = ((xpos) + (512));
                    }
                    if (((Number(ypos) <= Number((-256))) ? 1 : 0)) {
                        ypos = ((ypos) + (512));
                    }
                }
                color = ((((color) | (((runtime.readIndex(source, ATTRIBUTES_WORD)) & (1008))))) >>> 0);
                for (let row = 0; ((Number(row) < Number(sizey)) ? 1 : 0); row = ((row) + (1))) {
                    for (let col = 0; ((Number(col) < Number(sizex)) ? 1 : 0); col = ((col) + (1))) {
                        let sx = ((xpos) + (((8) * (((flipx) ? (((((sizex) - (1))) - (col))) : (col))))));
                        let sy = ((ypos) + (((8) * (((flipy) ? (((((sizey) - (1))) - (row))) : (row))))));
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).transpen_raw?.(bitmap, cliprect, ((number) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((row) * (8))) + (col))) % 64) + 64) % 64] ?? 0))), runtime.add(((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).colorbase?.() ?? runtime.container((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)), "colorbase")), ((color) * (((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).granularity?.() ?? runtime.container((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)), "granularity"))))), flipx, flipy, sx, sy, 0) ?? 0);
                    }
                }
            }
            source = ({ ...(source), offset: ((source).offset + (SOURCE_INC)) });
        }
    }
    function method_draw_sprites_8bit(runtime, screen, bitmap, cliprect, spriteram, size, video_type, flip_screen) {
        const members = runtime.members;
        for (let offs = ((size) - (8)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (8))) {
            let bank = ((runtime.readIndex(spriteram, ((offs) + (0)))) & 0xff);
            if ((((bank) >>> (2)) & 1)) {
                let flags = ((runtime.readIndex(spriteram, ((offs) + (3)))) & 0xff);
                let priority_mask = (((runtime.calls["m_pri_cb"] ? runtime.calls["m_pri_cb"](((flags) >>> (6))) : runtime.macro("m_pri_cb", ((flags) >>> (6))))) >>> 0);
                let which = ((runtime.readIndex(spriteram, ((offs) + (1)))) & 0xff);
                let code = ((0) >>> 0);
                let size = ((((runtime.readIndex(spriteram, ((offs) + (2)))) & (3))) & 0xff);
                if (((Number(video_type) !== Number(0)) ? 1 : 0)) {
                    code = ((((which) + (((((bank) & (248))) << (5))))) >>> 0);
                }
                else {
                    code = ((((which) + (((((bank) & (240))) << (4))))) >>> 0);
                }
                code = ((runtime.andAssign(code, (~((((1) << (((size) * (2))))) - (1))))) >>> 0);
                size = ((((1) << (size))) & 0xff);
                let xpos = ((runtime.readIndex(spriteram, ((offs) + (5)))) - (((((flags) & (16))) << (4))));
                let ypos = ((runtime.readIndex(spriteram, ((offs) + (4)))) - (((((flags) & (32))) << (3))));
                let flipx = (((((bank) >>> (0)) & 1)) ? 1 : 0);
                let flipy = (((((bank) >>> (1)) & 1)) ? 1 : 0);
                if (flip_screen) {
                    xpos = ((((256) - (((8) * (size))))) - (xpos));
                    ypos = ((((256) - (((8) * (size))))) - (ypos));
                    flipx = ((((flipx) ? 0 : 1)) ? 1 : 0);
                    flipy = ((((flipy) ? 0 : 1)) ? 1 : 0);
                }
                for (let y = 0; ((Number(y) < Number(size)) ? 1 : 0); y = ((y) + (1))) {
                    for (let x = 0; ((Number(x) < Number(size)) ? 1 : 0); x = ((x) + (1))) {
                        let sx = ((xpos) + (((8) * (((flipx) ? (((((size) - (1))) - (x))) : (x))))));
                        let sy = ((ypos) + (((8) * (((flipy) ? (((((size) - (1))) - (y))) : (y))))));
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).prio_transpen?.(bitmap, cliprect, ((code) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), ((flags) & (15)), flipx, flipy, sx, sy, (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")), priority_mask, 0) ?? 0);
                    }
                }
            }
        }
    }
    function method_draw_wc90_sprites(runtime, screen, bitmap, cliprect, spriteram, size) {
        const members = runtime.members;
        for (let offs = ((size) - (16)); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((offs) - (16))) {
            let bank = ((runtime.readIndex(spriteram, ((offs) + (0)))) & 0xff);
            if ((((bank) >>> (2)) & 1)) {
                let priority_mask = (((runtime.calls["m_pri_cb"] ? runtime.calls["m_pri_cb"](((bank) >>> (4))) : runtime.macro("m_pri_cb", ((bank) >>> (4))))) >>> 0);
                let code = ((runtime.add(runtime.readIndex(spriteram, ((offs) + (2))), ((runtime.readIndex(spriteram, ((offs) + (3)))) << (8)))) >>> 0);
                let xpos = runtime.add(runtime.readIndex(spriteram, ((offs) + (8))), ((((runtime.readIndex(spriteram, ((offs) + (9)))) & (3))) << (8)));
                let ypos = ((runtime.readIndex(spriteram, ((offs) + (6)))) + ((members.m_yoffset ?? runtime.member("m_yoffset"))));
                ypos = runtime.andAssign(ypos, 255);
                ypos = ((ypos) - (((((runtime.readIndex(spriteram, ((offs) + (7)))) & (1))) << (8))));
                if (((Number(xpos) >= Number(768)) ? 1 : 0)) {
                    xpos = ((xpos) - (1024));
                }
                let flags = ((runtime.readIndex(spriteram, ((offs) + (4)))) & 0xff);
                let sizex = ((((1) << (((((flags) >>> (0))) & (3))))) & 0xff);
                let sizey = ((((1) << (((((flags) >>> (2))) & (3))))) & 0xff);
                let flipx = (((((bank) >>> (0)) & 1)) ? 1 : 0);
                let flipy = (((((bank) >>> (1)) & 1)) ? 1 : 0);
                for (let y = 0; ((Number(y) < Number(sizey)) ? 1 : 0); y = ((y) + (1))) {
                    for (let x = 0; ((Number(x) < Number(sizex)) ? 1 : 0); x = ((x) + (1))) {
                        let sx = ((xpos) + (((8) * (((flipx) ? (((((sizex) - (1))) - (x))) : (x))))));
                        let sy = ((ypos) + (((8) * (((flipy) ? (((((sizey) - (1))) - (y))) : (y))))));
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).prio_transpen?.(bitmap, cliprect, ((code) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), ((((flags) >>> (4))) & (15)), flipx, flipy, sx, sy, (typeof (runtime.dereference(screen)).priority === 'function' ? (runtime.dereference(screen)).priority() : typeof (runtime.dereference(screen)).priority === 'number' || typeof (runtime.dereference(screen)).priority === 'boolean' ? (runtime.dereference(screen)).priority : runtime.container(screen, "priority")), priority_mask, 0) ?? 0);
                    }
                }
            }
        }
    }
    function method_tbowl_draw_sprites(runtime, bitmap, cliprect, xscroll, spriteram) {
        const members = runtime.members;
        for (let offs = 0; ((Number(offs) < Number(2048)) ? 1 : 0); offs = ((offs) + (8))) {
            if ((((runtime.readIndex(spriteram, ((offs) + (0)))) >>> (7)) & 1)) {
                let code = ((runtime.add(runtime.readIndex(spriteram, ((offs) + (2))), ((runtime.readIndex(spriteram, ((offs) + (1)))) << (8)))) >>> 0);
                let color = ((((runtime.readIndex(spriteram, ((offs) + (3)))) & (31))) >>> 0);
                let sizex = ((((1) << (((((runtime.readIndex(spriteram, ((offs) + (0)))) & (3))) >>> (0))))) & 0xff);
                let sizey = ((((1) << (((((runtime.readIndex(spriteram, ((offs) + (0)))) & (12))) >>> (2))))) & 0xff);
                let flipx = (((((runtime.readIndex(spriteram, ((offs) + (0)))) >>> (5)) & 1)) ? 1 : 0);
                let flipy = ((0) ? 1 : 0);
                let xpos = runtime.add(runtime.readIndex(spriteram, ((offs) + (6))), ((((runtime.readIndex(spriteram, ((offs) + (4)))) & (3))) << (8)));
                let ypos = runtime.add(runtime.readIndex(spriteram, ((offs) + (5))), ((((runtime.readIndex(spriteram, ((offs) + (4)))) & (16))) << (4)));
                for (let y = 0; ((Number(y) < Number(sizey)) ? 1 : 0); y = ((y) + (1))) {
                    for (let x = 0; ((Number(x) < Number(sizex)) ? 1 : 0); x = ((x) + (1))) {
                        let sx = ((xpos) + (((8) * (((flipx) ? (((((sizex) - (1))) - (x))) : (x))))));
                        let sy = ((ypos) + (((8) * (((flipy) ? (((((sizey) - (1))) - (y))) : (y))))));
                        sx = ((sx) - (xscroll));
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).transpen?.(bitmap, cliprect, ((code) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, sx, sy, 0) ?? 0);
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).transpen?.(bitmap, cliprect, ((code) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, sx, ((sy) - (512)), 0) ?? 0);
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).transpen?.(bitmap, cliprect, ((code) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, ((sx) - (1024)), sy, 0) ?? 0);
                        ((runtime.dereference((runtime.calls["gfx"] ? runtime.calls["gfx"](0) : runtime.macro("gfx", 0)))).transpen?.(bitmap, cliprect, ((code) + (([0, 1, 4, 5, 16, 17, 20, 21, 2, 3, 6, 7, 18, 19, 22, 23, 8, 9, 12, 13, 24, 25, 28, 29, 10, 11, 14, 15, 26, 27, 30, 31, 32, 33, 36, 37, 48, 49, 52, 53, 34, 35, 38, 39, 50, 51, 54, 55, 40, 41, 44, 45, 56, 57, 60, 61, 42, 43, 46, 47, 58, 59, 62, 63][(((((((y) * (8))) + (x))) % 64) + 64) % 64] ?? 0))), color, flipx, flipy, ((sx) - (1024)), ((sy) - (512)), 0) ?? 0);
                    }
                }
            }
        }
    }
    return {
        "gaiden_draw_sprites": method_gaiden_draw_sprites,
        "draw_sprites_8bit": method_draw_sprites_8bit,
        "draw_wc90_sprites": method_draw_wc90_sprites,
        "tbowl_draw_sprites": method_tbowl_draw_sprites
    };
})();
export const device = definition;
export default device;
