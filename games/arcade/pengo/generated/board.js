// GENERATED executable machine composition from src/mame/pacman/pengo.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'pengo');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_pacman_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_pacman_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_pengo_palettebank_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_palettebank = ((state) & 0xff);
                (__l["m_bg_tilemap.mark_all_dirty"] ? __l["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
            }
            function method_pengo_colortablebank_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_colortablebank = ((state) & 0xff);
                (__l["m_bg_tilemap.mark_all_dirty"] ? __l["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
            }
            function method_pengo_gfxbank_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_spritebank = ((state) & 0xff);
                members.m_charbank = ((state) & 0xff);
                (__l["m_bg_tilemap.mark_all_dirty"] ? __l["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
            }
            return {
                "pacman_videoram_w": method_pacman_videoram_w,
                "pacman_colorram_w": method_pacman_colorram_w,
                "pengo_palettebank_w": method_pengo_palettebank_w,
                "pengo_colortablebank_w": method_pengo_colortablebank_w,
                "pengo_gfxbank_w": method_pengo_gfxbank_w
            };
        })();
        return {
            "pengo_state.pacman_videoram_w": methods["pacman_videoram_w"],
            "pengo_state.pacman_colorram_w": methods["pacman_colorram_w"],
            "pengo_state.pengo_palettebank_w": methods["pengo_palettebank_w"],
            "pengo_state.pengo_colortablebank_w": methods["pengo_colortablebank_w"],
            "pengo_state.pengo_gfxbank_w": methods["pengo_gfxbank_w"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_pacman_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_pacman_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_pacman_read_nop(runtime) {
                const members = runtime.members;
                return 191;
            }
            function method_pacman_interrupt_vector_w(runtime, data) {
                const members = runtime.members;
                members.m_interrupt_vector = ((data) & 0xff);
            }
            function method_pacman_get_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let code = ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index)) | ((((members.m_charbank ?? runtime.member("m_charbank"))) << (8))))) | 0);
                let attr = ((((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (31))) | ((((members.m_colortablebank ?? runtime.member("m_colortablebank"))) << (5))))) | ((((members.m_palettebank ?? runtime.member("m_palettebank"))) << (6))))) | 0);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, attr, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, attr, 0) ?? 0) : (__l["set"]?.(0, code, attr, 0) ?? 0));
            }
            function method_pacman_scan_rows(runtime, col, row, num_cols, num_rows) {
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
            function method_interrupt_vector_r(runtime, irqline) {
                const members = runtime.members;
                return (members.m_interrupt_vector ?? runtime.member("m_interrupt_vector"));
            }
            function method_irq_mask_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_irq_mask = ((state) ? 1 : 0);
                if (((state) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
                }
            }
            function method_flipscreen_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_flipscreen = ((state) & 0xff);
                (__l["m_bg_tilemap.set_flip"] ? __l["m_bg_tilemap.set_flip"]((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) * (runtime.add(1, 2)))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_flip?.((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) * (runtime.add(1, 2)))) ?? 0) : (__l["set_flip"]?.((((members.m_flipscreen ?? runtime.member("m_flipscreen"))) * (runtime.add(1, 2)))) ?? 0));
            }
            function method_screen_update_pacman(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                if (((Number((members.m_bgpriority ?? runtime.member("m_bgpriority"))) !== Number(0)) ? 1 : 0)) {
                    (__l["bitmap.fill"] ? __l["bitmap.fill"](0, cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(0, cliprect) ?? 0) : (__l["fill"]?.(0, cliprect) ?? 0));
                }
                else {
                    (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 128, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 128, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 128, 0) ?? 0));
                }
                if (((h_m_spriteram) ? 1 : 0)) {
                    (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](screen, bitmap, cliprect) : method_draw_sprites(runtime, screen, bitmap, cliprect));
                }
                if (((Number((members.m_bgpriority ?? runtime.member("m_bgpriority"))) !== Number(0)) ? 1 : 0)) {
                    (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                }
                return 0;
            }
            function method_draw_sprites(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                const h_m_spriteram2 = members.m_spriteram2 ?? runtime.member("m_spriteram2");
                let spriteram = h_m_spriteram;
                let spriteram_2 = h_m_spriteram2;
                let spriteclip = Object.assign(Object.create(Object.getPrototypeOf((__l["rectangle"] ? __l["rectangle"](16, 271, 0, 223) : runtime.macro("rectangle", 16, 271, 0, 223)))), (__l["rectangle"] ? __l["rectangle"](16, 271, 0, 223) : runtime.macro("rectangle", 16, 271, 0, 223)));
                spriteclip = runtime.andAssign(spriteclip, cliprect);
                for (let offs = (((((members.m_spriteram).length) - (2))) | 0); ((Number(offs) > Number(4)) ? 1 : 0); offs = ((((offs) - (2))) | 0)) {
                    let color = ((0) | 0);
                    let sx = ((0) | 0);
                    let sy = ((0) | 0);
                    let fx = ((0) & 0xff);
                    let fy = ((0) & 0xff);
                    if ((members.m_inv_spr ?? runtime.member("m_inv_spr"))) {
                        sx = ((runtime.readIndex(spriteram_2, ((offs) + (1)))) | 0);
                        sy = ((((240) - (runtime.readIndex(spriteram_2, offs)))) | 0);
                    }
                    else {
                        sx = ((((272) - (runtime.readIndex(spriteram_2, ((offs) + (1)))))) | 0);
                        sy = ((((runtime.readIndex(spriteram_2, offs)) - (31))) | 0);
                    }
                    fx = ((((((runtime.readIndex(spriteram, offs)) & (1))) ^ ((members.m_inv_spr ?? runtime.member("m_inv_spr"))))) & 0xff);
                    fy = ((((((runtime.readIndex(spriteram, offs)) & (2))) ^ ((((members.m_inv_spr ?? runtime.member("m_inv_spr"))) << (1))))) & 0xff);
                    color = ((((((((runtime.readIndex(spriteram, ((offs) + (1)))) & (31))) | ((((members.m_colortablebank ?? runtime.member("m_colortablebank"))) << (5))))) | ((((members.m_palettebank ?? runtime.member("m_palettebank"))) << (6))))) | 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, sx, sy, (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) ?? 0) : 0)) ?? 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, ((sx) - (256)), sy, (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) ?? 0) : 0)) ?? 0);
                }
                for (let offs = ((4) | 0); ((Number(offs) >= Number(0)) ? 1 : 0); offs = ((((offs) - (2))) | 0)) {
                    let color = ((0) | 0);
                    let sx = ((0) | 0);
                    let sy = ((0) | 0);
                    let fx = ((0) & 0xff);
                    let fy = ((0) & 0xff);
                    if ((members.m_inv_spr ?? runtime.member("m_inv_spr"))) {
                        sx = ((runtime.readIndex(spriteram_2, ((offs) + (1)))) | 0);
                        sy = ((((240) - (runtime.readIndex(spriteram_2, offs)))) | 0);
                    }
                    else {
                        sx = ((((272) - (runtime.readIndex(spriteram_2, ((offs) + (1)))))) | 0);
                        sy = ((((runtime.readIndex(spriteram_2, offs)) - (31))) | 0);
                    }
                    color = ((((((((runtime.readIndex(spriteram, ((offs) + (1)))) & (31))) | ((((members.m_colortablebank ?? runtime.member("m_colortablebank"))) << (5))))) | ((((members.m_palettebank ?? runtime.member("m_palettebank"))) << (6))))) | 0);
                    fx = ((((((runtime.readIndex(spriteram, offs)) & (1))) ^ ((members.m_inv_spr ?? runtime.member("m_inv_spr"))))) & 0xff);
                    fy = ((((((runtime.readIndex(spriteram, offs)) & (2))) ^ ((((members.m_inv_spr ?? runtime.member("m_inv_spr"))) << (1))))) & 0xff);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, sx, ((sy) + ((members.m_xoffsethack ?? runtime.member("m_xoffsethack")))), (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) ?? 0) : 0)) ?? 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transmask?.(bitmap, spriteclip, ((((runtime.readIndex(spriteram, offs)) >>> (2))) | ((((members.m_spritebank ?? runtime.member("m_spritebank"))) << (6)))), color, fx, fy, ((sx) - (256)), ((sy) + ((members.m_xoffsethack ?? runtime.member("m_xoffsethack")))), (__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0)), ((color) & (63)), 0) ?? 0) : 0)) ?? 0);
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && ((members.m_irq_mask ?? runtime.member("m_irq_mask")))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
                }
            }
            return {
                "pacman_videoram_w": method_pacman_videoram_w,
                "pacman_colorram_w": method_pacman_colorram_w,
                "pacman_read_nop": method_pacman_read_nop,
                "pacman_interrupt_vector_w": method_pacman_interrupt_vector_w,
                "pacman_get_tile_info": method_pacman_get_tile_info,
                "pacman_scan_rows": method_pacman_scan_rows,
                "interrupt_vector_r": method_interrupt_vector_r,
                "irq_mask_w": method_irq_mask_w,
                "flipscreen_w": method_flipscreen_w,
                "screen_update_pacman": method_screen_update_pacman,
                "draw_sprites": method_draw_sprites,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "pacman_state.pacman_videoram_w": methods["pacman_videoram_w"],
            "pacman_state.pacman_colorram_w": methods["pacman_colorram_w"],
            "pacman_state.pacman_read_nop": methods["pacman_read_nop"],
            "pacman_state.pacman_interrupt_vector_w": methods["pacman_interrupt_vector_w"],
            "pacman_state.pacman_get_tile_info": methods["pacman_get_tile_info"],
            "pacman_state.pacman_scan_rows": methods["pacman_scan_rows"],
            "pacman_state.interrupt_vector_r": methods["interrupt_vector_r"],
            "pacman_state.irq_mask_w": methods["irq_mask_w"],
            "pacman_state.flipscreen_w": methods["flipscreen_w"],
            "pacman_state.screen_update_pacman": methods["screen_update_pacman"],
            "pacman_state.draw_sprites": methods["draw_sprites"],
            "pacman_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "draw", "fill", "m_bg_tilemap.draw", "m_bg_tilemap.mark_all_dirty", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_flip", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.transpen_mask", "mark_all_dirty", "mark_tile_dirty", "rectangle", "set", "set_flip", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
