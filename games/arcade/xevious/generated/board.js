// GENERATED executable machine composition from src/mame/namco/galaga.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'xevious');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_xevious_fg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_colorram"), offset, data);
                (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_bg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_colorram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_fg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_videoram"), offset, data);
                (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_bg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_vh_latch_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let reg = ((0) | 0);
                let scroll = ((((data) + (((((offset) & (1))) << (8))))) | 0);
                reg = ((((((offset) & (240))) >>> (4))) | 0);
                switch (reg) {
                    case 0:
                        {
                            (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (__l["set_scrollx"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 1:
                        {
                            (__l["m_fg_tilemap.set_scrollx"] ? __l["m_fg_tilemap.set_scrollx"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (__l["set_scrollx"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 2:
                        {
                            (__l["m_bg_tilemap.set_scrolly"] ? __l["m_bg_tilemap.set_scrolly"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (__l["set_scrolly"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 3:
                        {
                            (__l["m_fg_tilemap.set_scrolly"] ? __l["m_fg_tilemap.set_scrolly"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (__l["set_scrolly"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 7:
                        {
                            (__l["flip_screen_set"] ? __l["flip_screen_set"](((scroll) & (1))) : runtime.macro("flip_screen_set", ((scroll) & (1))));
                            break;
                        }
                    default:
                        {
                            0;
                            break;
                        }
                }
            }
            function method_xevious_bs_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_xevious_bs"), ((offset) & (1)), data);
            }
            function method_irq1_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_main_irq_mask = ((state) & 0xff);
                if ((((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask"))) ? 0 : 1)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
                }
            }
            function method_irq2_clear_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_sub_irq_mask = ((state) & 0xff);
                if ((((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask"))) ? 0 : 1)) {
                    (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](0, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 0) ?? 0) : 0);
                }
            }
            function method_nmion_w(runtime, state) {
                const members = runtime.members;
                members.m_sub2_nmi_mask = ((((state) ? 0 : 1)) & 0xff);
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((state) && ((members.m_main_irq_mask ?? runtime.member("m_main_irq_mask")))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
                }
                if ((((state) && ((members.m_sub_irq_mask ?? runtime.member("m_sub_irq_mask")))) ? 1 : 0)) {
                    (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](0, 1) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(0, 1) ?? 0) : 0);
                }
            }
            return {
                "xevious_fg_colorram_w": method_xevious_fg_colorram_w,
                "xevious_bg_colorram_w": method_xevious_bg_colorram_w,
                "xevious_fg_videoram_w": method_xevious_fg_videoram_w,
                "xevious_bg_videoram_w": method_xevious_bg_videoram_w,
                "xevious_vh_latch_w": method_xevious_vh_latch_w,
                "xevious_bs_w": method_xevious_bs_w,
                "irq1_clear_w": method_irq1_clear_w,
                "irq2_clear_w": method_irq2_clear_w,
                "nmion_w": method_nmion_w,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "galaga_state.irq1_clear_w": methods["irq1_clear_w"],
            "galaga_state.irq2_clear_w": methods["irq2_clear_w"],
            "galaga_state.nmion_w": methods["nmion_w"],
            "galaga_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_xevious_fg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_colorram"), offset, data);
                (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_bg_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_colorram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_fg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_fg_videoram"), offset, data);
                (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_bg_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_xevious_bg_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (__l["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_xevious_vh_latch_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let reg = ((0) | 0);
                let scroll = ((((data) + (((((offset) & (1))) << (8))))) | 0);
                reg = ((((((offset) & (240))) >>> (4))) | 0);
                switch (reg) {
                    case 0:
                        {
                            (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (__l["set_scrollx"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 1:
                        {
                            (__l["m_fg_tilemap.set_scrollx"] ? __l["m_fg_tilemap.set_scrollx"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, scroll) ?? 0) : (__l["set_scrollx"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 2:
                        {
                            (__l["m_bg_tilemap.set_scrolly"] ? __l["m_bg_tilemap.set_scrolly"](0, scroll) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (__l["set_scrolly"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 3:
                        {
                            (__l["m_fg_tilemap.set_scrolly"] ? __l["m_fg_tilemap.set_scrolly"](0, scroll) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrolly?.(0, scroll) ?? 0) : (__l["set_scrolly"]?.(0, scroll) ?? 0));
                            break;
                        }
                    case 7:
                        {
                            (__l["flip_screen_set"] ? __l["flip_screen_set"](((scroll) & (1))) : runtime.macro("flip_screen_set", ((scroll) & (1))));
                            break;
                        }
                    default:
                        {
                            0;
                            break;
                        }
                }
            }
            function method_xevious_bs_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_xevious_bs"), ((offset) & (1)), data);
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let code = ((runtime.readIndex((members.m_xevious_bg_videoram ?? runtime.member("m_xevious_bg_videoram")), tile_index)) & 0xff);
                let attr = ((runtime.readIndex((members.m_xevious_bg_colorram ?? runtime.member("m_xevious_bg_colorram")), tile_index)) & 0xff);
                let color = ((((((((((attr) & (60))) >>> (2))) | (((((code) & (128))) >>> (3))))) | (((((attr) & (3))) << (5))))) & 0xff);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](1, ((code) + (((((attr) & (1))) << (8)))), color, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, ((code) + (((((attr) & (1))) << (8)))), color, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ?? 0) : (__l["set"]?.(1, ((code) + (((((attr) & (1))) << (8)))), color, (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ?? 0));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let attr = ((runtime.readIndex((members.m_xevious_fg_colorram ?? runtime.member("m_xevious_fg_colorram")), tile_index)) & 0xff);
                let color = ((((((((attr) & (3))) << (4))) | (((((attr) & (60))) >>> (2))))) & 0xff);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ^ ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ^ ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))))) ?? 0) : (__l["set"]?.(0, ((runtime.readIndex((members.m_xevious_fg_videoram ?? runtime.member("m_xevious_fg_videoram")), tile_index)) | ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (256) : (0)))), color, (((__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ^ ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (1) : (0))))) ?? 0));
            }
            function method_screen_update_xevious(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_xevious_sr3 = members.m_xevious_sr3 ?? runtime.member("m_xevious_sr3");
                const h_m_xevious_sr1 = members.m_xevious_sr1 ?? runtime.member("m_xevious_sr1");
                const h_m_xevious_sr2 = members.m_xevious_sr2 ?? runtime.member("m_xevious_sr2");
                let spriteram = runtime.addressOf(h_m_xevious_sr3, 1920);
                let spriteram_2 = runtime.addressOf(h_m_xevious_sr1, 1920);
                let spriteram_3 = runtime.addressOf(h_m_xevious_sr2, 1920);
                let offs = ((0) | 0);
                let sx = ((0) | 0);
                let sy = ((0) | 0);
                for (offs = ((0) | 0); ((Number(offs) < Number(128)) ? 1 : 0); offs = ((((offs) + (2))) | 0)) {
                    if (((Number(((runtime.readIndex(spriteram, ((offs) + (1)))) & (64))) === Number(0)) ? 1 : 0)) {
                        let bank = ((0) | 0);
                        let code = ((0) | 0);
                        let color = ((0) | 0);
                        let flipx = ((0) | 0);
                        let flipy = ((0) | 0);
                        let transmask = ((0) >>> 0);
                        if (((runtime.readIndex(spriteram_3, offs)) & (128))) {
                            bank = ((2) | 0);
                            code = ((runtime.add(((runtime.readIndex(spriteram, offs)) & (63)), 256)) | 0);
                        }
                        else {
                            bank = ((2) | 0);
                            code = ((runtime.readIndex(spriteram, offs)) | 0);
                        }
                        color = ((((runtime.readIndex(spriteram, ((offs) + (1)))) & (127))) | 0);
                        flipx = ((((runtime.readIndex(spriteram_3, offs)) & (4))) | 0);
                        flipy = ((((runtime.readIndex(spriteram_3, offs)) & (8))) | 0);
                        sx = ((runtime.add(((runtime.readIndex(spriteram_2, ((offs) + (1)))) - (40)), ((256) * (((runtime.readIndex(spriteram_3, ((offs) + (1)))) & (1)))))) | 0);
                        sy = ((((((224) - (runtime.readIndex(spriteram_2, offs)))) - (1))) | 0);
                        if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                            flipx = ((((flipx) ? 0 : 1)) | 0);
                            flipy = ((((flipy) ? 0 : 1)) | 0);
                        }
                        transmask = (((__l["m_palette.transpen_mask"] ? __l["m_palette.transpen_mask"](runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0)), color, 128) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).transpen_mask?.(runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0)), color, 128) ?? 0) : 0)) >>> 0);
                        if (((runtime.readIndex(spriteram_3, offs)) & (2))) {
                            if (((runtime.readIndex(spriteram_3, offs)) & (1))) {
                                code = ((runtime.andAssign(code, -4)) | 0);
                                ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, ((code) + (3)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
                                ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, ((code) + (1)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (sy) : (((sy) - (16)))), transmask) ?? 0);
                            }
                            code = ((runtime.andAssign(code, -3)) | 0);
                            ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, ((code) + (2)), color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
                            ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (sy) : (((sy) - (16)))), transmask) ?? 0);
                        }
                        else {
                            if (((runtime.readIndex(spriteram_3, offs)) & (1))) {
                                code = ((runtime.andAssign(code, -2)) | 0);
                                ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, ((flipx) ? (((sx) + (16))) : (sx)), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
                                ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, ((code) + (1)), color, flipx, flipy, ((flipx) ? (sx) : (((sx) + (16)))), ((flipy) ? (((sy) - (16))) : (sy)), transmask) ?? 0);
                            }
                            else {
                                ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](bank) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(bank) ?? 0) : 0))).transmask?.(bitmap, cliprect, code, color, flipx, flipy, sx, sy, transmask) ?? 0);
                            }
                        }
                    }
                }
            }
            return {
                "xevious_fg_colorram_w": method_xevious_fg_colorram_w,
                "xevious_bg_colorram_w": method_xevious_bg_colorram_w,
                "xevious_fg_videoram_w": method_xevious_fg_videoram_w,
                "xevious_bg_videoram_w": method_xevious_bg_videoram_w,
                "xevious_vh_latch_w": method_xevious_vh_latch_w,
                "xevious_bs_w": method_xevious_bs_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "get_fg_tile_info": method_get_fg_tile_info,
                "screen_update_xevious": method_screen_update_xevious,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "xevious_state.xevious_fg_colorram_w": methods["xevious_fg_colorram_w"],
            "xevious_state.xevious_bg_colorram_w": methods["xevious_bg_colorram_w"],
            "xevious_state.xevious_fg_videoram_w": methods["xevious_fg_videoram_w"],
            "xevious_state.xevious_bg_videoram_w": methods["xevious_bg_videoram_w"],
            "xevious_state.xevious_vh_latch_w": methods["xevious_vh_latch_w"],
            "xevious_state.xevious_bs_w": methods["xevious_bs_w"],
            "xevious_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "xevious_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "xevious_state.screen_update_xevious": methods["screen_update_xevious"],
            "xevious_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["TILE_FLIPYX", "draw", "flip_screen", "flip_screen_set", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_fg_tilemap.set_scrollx", "m_fg_tilemap.set_scrolly", "m_gfxdecode.gfx", "m_maincpu.set_input_line", "m_palette.transpen_mask", "m_subcpu.set_input_line", "mark_tile_dirty", "set", "set_scrollx", "set_scrolly", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
