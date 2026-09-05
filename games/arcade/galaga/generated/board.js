// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'galaga');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_galaga_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](((offset) & (1023))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) & (1023))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) & (1023))) ?? 0));
            }
            function method_irq1_clear_w(runtime, state) {
                const members = runtime.members;
                members.m_main_irq_mask = ((state) & 0xff);
                if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
            }
            function method_irq2_clear_w(runtime, state) {
                const members = runtime.members;
                members.m_sub_irq_mask = ((state) & 0xff);
                if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
                    (runtime.calls["m_subcpu.set_input_line"] ? runtime.calls["m_subcpu.set_input_line"](0, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
            }
            function method_nmion_w(runtime, state) {
                const members = runtime.members;
                members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
            }
            function method_get_next_lfsr_state(runtime, lfsr) {
                const members = runtime.members;
                let bit = ((0) & 0xffff);
                bit = ((((((((((lfsr) >>> (0))) ^ (((lfsr) >>> (3))))) ^ (((lfsr) >>> (5))))) ^ (((lfsr) >>> (10))))) & 0xffff);
                lfsr = ((((((lfsr) >>> (1))) | (((bit) << (15))))) & 0xffff);
                return lfsr;
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                }
                if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
                    (runtime.calls["m_subcpu.set_input_line"] ? runtime.calls["m_subcpu.set_input_line"](0, 1) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                }
            }
            function method_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let color = ((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((tile_index) + (1024)))) & (63));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) ?? 0) : (runtime.calls["set"]?.(0, ((((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) & (127))) | ((((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (128) : (0))))) | ((((members.m_galaga_gfxbank ?? runtime.member("m_galaga_gfxbank"))) << (8)))), color, (((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))) ?? 0));
                tileinfo.group = color;
            }
            function method_tilemap_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                row = ((((row) + (2))) >>> 0);
                col = ((((col) - (2))) >>> 0);
                if (((col) & (32))) {
                    return ((row) + (((((col) & (31))) << (5))));
                }
                else {
                    return ((col) + (((row) << (5))));
                }
            }
            function method_screen_update_galaga(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0));
                (runtime.calls["m_starfield.draw_starfield"] ? runtime.calls["m_starfield.draw_starfield"](bitmap, cliprect, 0) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).draw_starfield?.(bitmap, cliprect, 0) ?? 0) : (runtime.calls["draw_starfield"]?.(bitmap, cliprect, 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_galaga_ram1 = members.m_galaga_ram1 ?? runtime.member("m_galaga_ram1");
                const h_m_galaga_ram2 = members.m_galaga_ram2 ?? runtime.member("m_galaga_ram2");
                const h_m_galaga_ram3 = members.m_galaga_ram3 ?? runtime.member("m_galaga_ram3");
                let spriteram = runtime.addressOf(h_m_galaga_ram1, 896);
                let spriteram_2 = runtime.addressOf(h_m_galaga_ram2, 896);
                let spriteram_3 = runtime.addressOf(h_m_galaga_ram3, 896);
                for (let offs = 0; ((Number(offs) < Number(128)) ? 1 : 0); offs = ((offs) + (2))) {
                    let sprite = ((runtime.readIndex(spriteram, offs)) & (127));
                    let color = ((runtime.readIndex(spriteram, ((offs) + (1)))) & (63));
                    let sx = runtime.add(((runtime.readIndex(spriteram_2, ((offs) + (1)))) - (40)), ((256) * (((runtime.readIndex(spriteram_3, ((offs) + (1)))) & (3)))));
                    let sy = runtime.add(((256) - (runtime.readIndex(spriteram_2, offs))), 1);
                    let flipx = ((runtime.readIndex(spriteram_3, offs)) & (1));
                    let flipy = ((((runtime.readIndex(spriteram_3, offs)) & (2))) >>> (1));
                    let sizex = ((((runtime.readIndex(spriteram_3, offs)) & (4))) >>> (2));
                    let sizey = ((((runtime.readIndex(spriteram_3, offs)) & (8))) >>> (3));
                    sy = ((sy) - (((16) * (sizey))));
                    sy = ((((sy) & (255))) - (32));
                    if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                        flipx = ((flipx) ^ (1));
                        flipy = ((flipy) ^ (1));
                    }
                    for (let y = 0; ((Number(y) <= Number(sizey)) ? 1 : 0); y = ((y) + (1))) {
                        for (let x = 0; ((Number(x) <= Number(sizex)) ? 1 : 0); x = ((x) + (1))) {
                            ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transmask?.(bitmap, cliprect, ((sprite) + (([0, 1, 2, 3][(((runtime.add(((((y) ^ (((sizey) * (flipy))))) * (2)), ((x) ^ (((sizex) * (flipx)))))) % 4) + 4) % 4] ?? 0))), color, flipx, flipy, ((sx) + (((16) * (x)))), ((sy) + (((16) * (y)))), (runtime.calls["m_palette.transpen_mask"] ? runtime.calls["m_palette.transpen_mask"](runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 15) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 15) ?? 0) : (runtime.calls["transpen_mask"]?.(runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0))), color, 15) ?? 0))) ?? 0);
                        }
                    }
                }
            }
            function method_screen_vblank_galaga(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    let speed_index_X = (((((((((runtime.calls["m_videolatch.q2_r"] ? runtime.calls["m_videolatch.q2_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q2_r === 'function' ? (runtime.dereference(members.m_videolatch)).q2_r() : typeof (runtime.dereference(members.m_videolatch)).q2_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q2_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q2_r : runtime.container(members.m_videolatch, "q2_r")) : (runtime.calls["q2_r"]?.() ?? 0))) << (2))) | ((((runtime.calls["m_videolatch.q1_r"] ? runtime.calls["m_videolatch.q1_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q1_r === 'function' ? (runtime.dereference(members.m_videolatch)).q1_r() : typeof (runtime.dereference(members.m_videolatch)).q1_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q1_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q1_r : runtime.container(members.m_videolatch, "q1_r")) : (runtime.calls["q1_r"]?.() ?? 0))) << (1))))) | ((((runtime.calls["m_videolatch.q0_r"] ? runtime.calls["m_videolatch.q0_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q0_r === 'function' ? (runtime.dereference(members.m_videolatch)).q0_r() : typeof (runtime.dereference(members.m_videolatch)).q0_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q0_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q0_r : runtime.container(members.m_videolatch, "q0_r")) : (runtime.calls["q0_r"]?.() ?? 0))) << (0))))) & 0xff);
                    let speed_index_Y = ((0) & 0xff);
                    (runtime.calls["m_starfield.set_scroll_speed"] ? runtime.calls["m_starfield.set_scroll_speed"](speed_index_X, speed_index_Y) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).set_scroll_speed?.(speed_index_X, speed_index_Y) ?? 0) : (runtime.calls["set_scroll_speed"]?.(speed_index_X, speed_index_Y) ?? 0));
                    (runtime.calls["m_starfield.set_active_starfield_sets"] ? runtime.calls["m_starfield.set_active_starfield_sets"]((runtime.calls["m_videolatch.q3_r"] ? runtime.calls["m_videolatch.q3_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q3_r === 'function' ? (runtime.dereference(members.m_videolatch)).q3_r() : typeof (runtime.dereference(members.m_videolatch)).q3_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q3_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q3_r : runtime.container(members.m_videolatch, "q3_r")) : (runtime.calls["q3_r"]?.() ?? 0)), (((runtime.calls["m_videolatch.q4_r"] ? runtime.calls["m_videolatch.q4_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q4_r === 'function' ? (runtime.dereference(members.m_videolatch)).q4_r() : typeof (runtime.dereference(members.m_videolatch)).q4_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q4_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q4_r : runtime.container(members.m_videolatch, "q4_r")) : (runtime.calls["q4_r"]?.() ?? 0))) | (2))) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).set_active_starfield_sets?.((runtime.calls["m_videolatch.q3_r"] ? runtime.calls["m_videolatch.q3_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q3_r === 'function' ? (runtime.dereference(members.m_videolatch)).q3_r() : typeof (runtime.dereference(members.m_videolatch)).q3_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q3_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q3_r : runtime.container(members.m_videolatch, "q3_r")) : (runtime.calls["q3_r"]?.() ?? 0)), (((runtime.calls["m_videolatch.q4_r"] ? runtime.calls["m_videolatch.q4_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q4_r === 'function' ? (runtime.dereference(members.m_videolatch)).q4_r() : typeof (runtime.dereference(members.m_videolatch)).q4_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q4_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q4_r : runtime.container(members.m_videolatch, "q4_r")) : (runtime.calls["q4_r"]?.() ?? 0))) | (2))) ?? 0) : (runtime.calls["set_active_starfield_sets"]?.((runtime.calls["m_videolatch.q3_r"] ? runtime.calls["m_videolatch.q3_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q3_r === 'function' ? (runtime.dereference(members.m_videolatch)).q3_r() : typeof (runtime.dereference(members.m_videolatch)).q3_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q3_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q3_r : runtime.container(members.m_videolatch, "q3_r")) : (runtime.calls["q3_r"]?.() ?? 0)), (((runtime.calls["m_videolatch.q4_r"] ? runtime.calls["m_videolatch.q4_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q4_r === 'function' ? (runtime.dereference(members.m_videolatch)).q4_r() : typeof (runtime.dereference(members.m_videolatch)).q4_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q4_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q4_r : runtime.container(members.m_videolatch, "q4_r")) : (runtime.calls["q4_r"]?.() ?? 0))) | (2))) ?? 0));
                    (runtime.calls["m_starfield.enable_starfield"] ? runtime.calls["m_starfield.enable_starfield"]((runtime.calls["m_videolatch.q5_r"] ? runtime.calls["m_videolatch.q5_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q5_r === 'function' ? (runtime.dereference(members.m_videolatch)).q5_r() : typeof (runtime.dereference(members.m_videolatch)).q5_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q5_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q5_r : runtime.container(members.m_videolatch, "q5_r")) : (runtime.calls["q5_r"]?.() ?? 0))) : (members.m_starfield) != null ? ((runtime.dereference(members.m_starfield)).enable_starfield?.((runtime.calls["m_videolatch.q5_r"] ? runtime.calls["m_videolatch.q5_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q5_r === 'function' ? (runtime.dereference(members.m_videolatch)).q5_r() : typeof (runtime.dereference(members.m_videolatch)).q5_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q5_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q5_r : runtime.container(members.m_videolatch, "q5_r")) : (runtime.calls["q5_r"]?.() ?? 0))) ?? 0) : (runtime.calls["enable_starfield"]?.((runtime.calls["m_videolatch.q5_r"] ? runtime.calls["m_videolatch.q5_r"]() : (members.m_videolatch) != null ? (typeof (runtime.dereference(members.m_videolatch)).q5_r === 'function' ? (runtime.dereference(members.m_videolatch)).q5_r() : typeof (runtime.dereference(members.m_videolatch)).q5_r === 'number' || typeof (runtime.dereference(members.m_videolatch)).q5_r === 'boolean' ? (runtime.dereference(members.m_videolatch)).q5_r : runtime.container(members.m_videolatch, "q5_r")) : (runtime.calls["q5_r"]?.() ?? 0))) ?? 0));
                }
            }
            return {
                "galaga_videoram_w": method_galaga_videoram_w,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "get_next_lfsr_state": method_get_next_lfsr_state,
                "vblank_irq": method_vblank_irq,
                "get_tile_info": method_get_tile_info,
                "tilemap_scan": method_tilemap_scan,
                "screen_update_galaga": method_screen_update_galaga,
                "draw_sprites": method_draw_sprites,
                "screen_vblank_galaga": method_screen_vblank_galaga
            };
        })();
        return {
            "galaga_state.galaga_videoram_w": methods["galaga_videoram_w"],
            "galaga_state.irq1_clear_w": methods["irq1_clear_w"],
            "galaga_state.irq2_clear_w": methods["irq2_clear_w"],
            "galaga_state.nmion_w": methods["nmion_w"],
            "galaga_state.vblank_irq": methods["vblank_irq"],
            "galaga_state.get_tile_info": methods["get_tile_info"],
            "galaga_state.tilemap_scan": methods["tilemap_scan"],
            "galaga_state.screen_update_galaga": methods["screen_update_galaga"],
            "galaga_state.draw_sprites": methods["draw_sprites"],
            "galaga_state.screen_vblank_galaga": methods["screen_vblank_galaga"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
