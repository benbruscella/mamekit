// GENERATED executable machine composition from src/mame/nintendo/dkong.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'dkong');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_dkong_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                if (((Number(runtime.readIndex((members.m_video_ram ?? runtime.member("m_video_ram")), offset)) !== Number(data)) ? 1 : 0)) {
                    runtime.writeIndex(runtime.writableMember("m_video_ram"), offset, data);
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_radarscp_grid_color_w(runtime, data) {
                const members = runtime.members;
                members.m_grid_col = ((((((data) & (7))) ^ (7))) & 0xffff);
            }
            function method_dkong_audio_irq_w(runtime, data) {
                const members = runtime.members;
                if (data) {
                    (runtime.calls["m_soundcpu.set_input_line"] ? runtime.calls["m_soundcpu.set_input_line"](0, 1) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                }
                else {
                    (runtime.calls["m_soundcpu.set_input_line"] ? runtime.calls["m_soundcpu.set_input_line"](0, 0) : (members.m_soundcpu) != null ? ((runtime.dereference(members.m_soundcpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
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
                members.m_nmi_mask = ((((data) & (1))) & 0xff);
                if ((((members.m_nmi_mask ?? runtime.member("m_nmi_mask"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 0) ?? 0));
                }
            }
            function method_dkong_palettebank_w(runtime, offset, data) {
                const members = runtime.members;
                let newbank = 0;
                newbank = (members.m_palette_bank ?? runtime.member("m_palette_bank"));
                if (((data) & (1))) {
                    newbank = ((newbank) | (((1) << (offset))));
                }
                else {
                    newbank = runtime.andAssign(newbank, (~((1) << (offset))));
                }
                if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(newbank)) ? 1 : 0)) {
                    members.m_palette_bank = ((newbank) & 0xff);
                    (runtime.calls["m_bg_tilemap.mark_all_dirty"] ? runtime.calls["m_bg_tilemap.mark_all_dirty"]() : (members.m_bg_tilemap) != null ? (typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'function' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty() : typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'number' || typeof (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty === 'boolean' ? (runtime.dereference(members.m_bg_tilemap)).mark_all_dirty : runtime.container(members.m_bg_tilemap, "mark_all_dirty")) : (runtime.calls["mark_all_dirty"]?.() ?? 0));
                }
            }
            function method_dkong_voice_status_r(runtime) {
                const members = runtime.members;
                return 0;
            }
            function method_dkong_voice_w(runtime, data) {
                const members = runtime.members;
                0;
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
                const h_m_sprite_ram = members.m_sprite_ram ?? runtime.member("m_sprite_ram");
                let offs = 0;
                let scanline_vf = 0;
                let scanline_vfc = 0;
                let scanline = 0;
                let add_y = 0;
                let add_x = 0;
                let num_sprt = 0;
                scanline_vf = ((((cliprect.max_y) - (1))) & (255));
                scanline_vfc = ((((cliprect.max_y) - (1))) & (255));
                scanline = ((cliprect.max_y) & (255));
                if ((members.m_flip ?? runtime.member("m_flip"))) {
                    scanline_vf = ((scanline_vf) ^ (255));
                    scanline_vfc = ((scanline_vfc) ^ (255));
                    add_y = 247;
                    add_x = 247;
                }
                else {
                    add_y = 249;
                    add_x = 247;
                }
                for (offs = (((members.m_sprite_bank ?? runtime.member("m_sprite_bank"))) << (9)), num_sprt = 0; (((((Number(num_sprt) < Number(16)) ? 1 : 0)) && (((Number(offs) < Number(runtime.add((((members.m_sprite_bank ?? runtime.member("m_sprite_bank"))) << (9)), 512))) ? 1 : 0))) ? 1 : 0); offs = ((offs) + (4))) {
                    let y = runtime.readIndex(h_m_sprite_ram, offs);
                    let do_draw = ((((Number(((((runtime.add(((y) + (add_y)), 1)) + (scanline_vf))) & (240))) === Number(240)) ? 1 : 0)) ? (1) : (0));
                    if (do_draw) {
                        let code = runtime.add(((runtime.readIndex(h_m_sprite_ram, ((offs) + (1)))) & (127)), ((((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (mask_bank))) << (shift_bits)));
                        let color = runtime.add(((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (15)), ((16) * ((members.m_palette_bank ?? runtime.member("m_palette_bank")))));
                        let flipx = ((runtime.readIndex(h_m_sprite_ram, ((offs) + (2)))) & (128));
                        let flipy = ((runtime.readIndex(h_m_sprite_ram, ((offs) + (1)))) & (128));
                        let x = ((runtime.add(((runtime.readIndex(h_m_sprite_ram, ((offs) + (3)))) + (add_x)), 1)) & (255));
                        if ((members.m_flip ?? runtime.member("m_flip"))) {
                            x = ((((x) ^ (255))) - (15));
                            flipx = ((flipx) ? 0 : 1);
                        }
                        y = ((scanline) - (((((runtime.add(((y) + (add_y)), 1)) + (scanline_vfc))) & (15))));
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, x, y, 0) ?? 0);
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, (((members.m_flip ?? runtime.member("m_flip"))) ? (((x) + (256))) : (((x) - (256)))), y, 0) ?? 0);
                        ((runtime.dereference((runtime.calls["m_gfxdecode.gfx"] ? runtime.calls["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : (runtime.calls["gfx"]?.(1) ?? 0)))).transpen?.(bitmap, cliprect, code, color, flipx, flipy, x, ((y) - (256)), 0) ?? 0);
                        num_sprt = ((num_sprt) + (1));
                    }
                }
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                if ((((state) && ((members.m_nmi_mask ?? runtime.member("m_nmi_mask")))) ? 1 : 0)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(-1, 1) ?? 0));
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
                "dkong_voice_status_r": method_dkong_voice_status_r,
                "dkong_voice_w": method_dkong_voice_w,
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
            "dkong_state.dkong_voice_status_r": methods["dkong_voice_status_r"],
            "dkong_state.dkong_voice_w": methods["dkong_voice_w"],
            "dkong_state.p8257_ctl_r": methods["p8257_ctl_r"],
            "dkong_state.p8257_ctl_w": methods["p8257_ctl_w"],
            "dkong_state.draw_sprites": methods["draw_sprites"],
            "dkong_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
