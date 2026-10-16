// GENERATED executable machine composition from src/mame/nintendo/dkong.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'dkongjr');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_dkong_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(runtime.readIndex((members.m_video_ram ?? runtime.member("m_video_ram")), offset)) !== Number(data)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_video_ram"), offset, data);
                    (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_radarscp_grid_color_w(runtime, data) {
                const members = runtime.members;
                members.m_grid_col = ((((((data) & (7))) ^ (7))) & 0xffff);
            }
            function method_dkong_audio_irq_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (data) {
                    (__l["m_soundcpu.set_input_line"] ? __l["m_soundcpu.set_input_line"](0, 1) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(0, 1) ?? 0) : 0);
                }
                else {
                    (__l["m_soundcpu.set_input_line"] ? __l["m_soundcpu.set_input_line"](0, 0) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(0, 0) ?? 0) : 0);
                }
            }
            function method_radarscp_grid_enable_w(runtime, data) {
                const members = runtime.members;
                members.m_grid_on = ((((data) & (1))) & 0xff);
            }
            function method_dkong_flipscreen_w(runtime, data) {
                const members = runtime.members;
                members.m_flip = ((((data) & (1))) & 0xff);
            }
            function method_dkong_spritebank_w(runtime, data) {
                const members = runtime.members;
                members.m_sprite_bank = ((((data) & (1))) & 0xff);
            }
            function method_nmi_mask_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_nmi_mask = ((((data) & (1))) & 0xff);
                if ((((members.m_nmi_mask ?? runtime.member("m_nmi_mask"))) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : 0);
                }
            }
            function method_dkong_palettebank_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let newbank = ((0) | 0);
                newbank = (((members.m_palette_bank ?? runtime.member("m_palette_bank"))) | 0);
                if (((data) & (1))) {
                    newbank = ((((newbank) | (((1) << (offset))))) | 0);
                }
                else {
                    newbank = ((runtime.andAssign(newbank, (~((1) << (offset))))) | 0);
                }
                if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(newbank)) ? 1 : 0)) {
                    members.m_palette_bank = ((newbank) & 0xff);
                    (__l["m_bg_tilemap.mark_all_dirty"] ? __l["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
                }
            }
            function method_dkongjr_gfxbank_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number((members.m_gfx_bank ?? runtime.member("m_gfx_bank"))) !== Number(((data) & (1)))) ? 1 : 0)) {
                    members.m_gfx_bank = ((((data) & (1))) & 0xff);
                    (__l["m_bg_tilemap.mark_all_dirty"] ? __l["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (__l["mark_all_dirty"]?.() ?? 0));
                }
            }
            function method_dkong_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let code = ((runtime.add(runtime.readIndex((members.m_video_ram ?? runtime.member("m_video_ram")), tile_index), ((256) * ((members.m_gfx_bank ?? runtime.member("m_gfx_bank")))))) | 0);
                let color = ((runtime.add(((runtime.readIndex((members.m_color_codes ?? runtime.member("m_color_codes")), runtime.add(((tile_index) % (32)), ((32) * (runtime.divide(runtime.divide(tile_index, 32), 4)))))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))))) | 0);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, code, color, 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, 0) ?? 0) : (__l["set"]?.(0, code, color, 0) ?? 0));
            }
            function method_p8257_ctl_r(runtime) {
                const members = runtime.members;
                return (members.m_dma_latch ?? runtime.member("m_dma_latch"));
            }
            function method_p8257_ctl_w(runtime, data) {
                const members = runtime.members;
                members.m_dma_latch = ((data) & 0xff);
            }
            function method_draw_sprites(runtime, bitmap, cliprect, mask_bank, shift_bits) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_sprite_ram = members.m_sprite_ram ?? runtime.member("m_sprite_ram");
                let offs = ((0) | 0);
                let scanline_vf = ((0) | 0);
                let scanline_vfc = ((0) | 0);
                let scanline = ((0) | 0);
                let add_y = ((0) | 0);
                let add_x = ((0) | 0);
                let num_sprt = ((0) | 0);
                scanline_vf = ((((((cliprect.max_y) - (1))) & (255))) | 0);
                scanline_vfc = ((((((cliprect.max_y) - (1))) & (255))) | 0);
                scanline = ((((cliprect.max_y) & (255))) | 0);
                if ((members.m_flip ?? runtime.member("m_flip"))) {
                    scanline_vf = ((((scanline_vf) ^ (255))) | 0);
                    scanline_vfc = ((((scanline_vfc) ^ (255))) | 0);
                    add_y = ((247) | 0);
                    add_x = ((247) | 0);
                }
                else {
                    add_y = ((249) | 0);
                    add_x = ((247) | 0);
                }
                for (offs = (((((members.m_sprite_bank ?? runtime.member("m_sprite_bank"))) << (9))) | 0), num_sprt = ((0) | 0); (((((Number(num_sprt) < Number(16)) ? 1 : 0)) && (((Number(offs) < Number(runtime.add((((members.m_sprite_bank ?? runtime.member("m_sprite_bank"))) << (9)), 512))) ? 1 : 0))) ? 1 : 0); offs = ((((offs) + (4))) | 0)) {
                    let y = ((runtime.readIndex(h_m_sprite_ram, offs)) | 0);
                    let do_draw = ((((((Number(((((runtime.add(((y) + (add_y)), 1)) + (scanline_vf))) & (240))) === Number(240)) ? 1 : 0)) ? (1) : (0))) | 0);
                    if (do_draw) {
                        let code = ((runtime.add(((runtime.readIndex(h_m_sprite_ram, ((offs) + (1)))) & (127)), ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (mask_bank))) << (shift_bits)))) | 0);
                        let color = ((runtime.add(((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))))) | 0);
                        let flipx = ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (128))) | 0);
                        let flipy = ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (1)))) & (128))) | 0);
                        let x = ((((runtime.add(((runtime.readIndex(h_m_sprite_ram, ((offs) + (3)))) + (add_x)), 1)) & (255))) | 0);
                        if ((members.m_flip ?? runtime.member("m_flip"))) {
                            x = ((((((x) ^ (255))) - (15))) | 0);
                            flipx = ((((flipx) ? 0 : 1)) | 0);
                        }
                        y = ((((scanline) - (((((runtime.add(((y) + (add_y)), 1)) + (scanline_vfc))) & (15))))) | 0);
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, x, y, 0) ?? 0);
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, (((members.m_flip ?? runtime.member("m_flip"))) ? (((x) + (256))) : (((x) - (256)))), y, 0) ?? 0);
                        ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, x, ((y) - (256)), 0) ?? 0);
                        num_sprt = ((((num_sprt) + (1))) | 0);
                    }
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && ((members.m_nmi_mask ?? runtime.member("m_nmi_mask")))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : 0);
                }
            }
            return {
                "dkong_videoram_w": method_dkong_videoram_w,
                "radarscp_grid_color_w": method_radarscp_grid_color_w,
                "dkong_audio_irq_w": method_dkong_audio_irq_w,
                "radarscp_grid_enable_w": method_radarscp_grid_enable_w,
                "dkong_flipscreen_w": method_dkong_flipscreen_w,
                "dkong_spritebank_w": method_dkong_spritebank_w,
                "nmi_mask_w": method_nmi_mask_w,
                "dkong_palettebank_w": method_dkong_palettebank_w,
                "dkongjr_gfxbank_w": method_dkongjr_gfxbank_w,
                "dkong_bg_tile_info": method_dkong_bg_tile_info,
                "p8257_ctl_r": method_p8257_ctl_r,
                "p8257_ctl_w": method_p8257_ctl_w,
                "draw_sprites": method_draw_sprites,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "dkong_state.dkong_videoram_w": methods["dkong_videoram_w"],
            "dkong_state.radarscp_grid_color_w": methods["radarscp_grid_color_w"],
            "dkong_state.dkong_audio_irq_w": methods["dkong_audio_irq_w"],
            "dkong_state.radarscp_grid_enable_w": methods["radarscp_grid_enable_w"],
            "dkong_state.dkong_flipscreen_w": methods["dkong_flipscreen_w"],
            "dkong_state.dkong_spritebank_w": methods["dkong_spritebank_w"],
            "dkong_state.nmi_mask_w": methods["nmi_mask_w"],
            "dkong_state.dkong_palettebank_w": methods["dkong_palettebank_w"],
            "dkong_state.dkongjr_gfxbank_w": methods["dkongjr_gfxbank_w"],
            "dkong_state.dkong_bg_tile_info": methods["dkong_bg_tile_info"],
            "dkong_state.p8257_ctl_r": methods["p8257_ctl_r"],
            "dkong_state.p8257_ctl_w": methods["p8257_ctl_w"],
            "dkong_state.draw_sprites": methods["draw_sprites"],
            "dkong_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["m_bg_tilemap.mark_all_dirty", "m_bg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_soundcpu.set_input_line", "mark_all_dirty", "mark_tile_dirty", "set", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
