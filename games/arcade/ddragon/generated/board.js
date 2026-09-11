// GENERATED executable machine composition from src/mame/technos/ddragon.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'ddragon');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_fgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_fgvideoram"), offset, data);
                (__l["m_fg_tilemap.mark_tile_dirty"] ? __l["m_fg_tilemap.mark_tile_dirty"](((offset) >>> (1))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(((offset) >>> (1))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) >>> (1))) ?? 0));
            }
            function method_bgvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_bgvideoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ? __l["m_bg_tilemap.mark_tile_dirty"](((offset) >>> (1))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) >>> (1))) ?? 0) : (__l["mark_tile_dirty"]?.(((offset) >>> (1))) ?? 0));
            }
            function method_interrupt_r(runtime, offset) {
                const members = runtime.members;
                (runtime.overrides["interrupt_ack"] ? runtime.overrides["interrupt_ack"](offset, 255) : method_interrupt_ack(runtime, offset, 255));
                return 255;
            }
            function method_interrupt_ack(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_subcpu = members.m_subcpu ?? runtime.member("m_subcpu");
                const h_m_sprite_irq = members.m_sprite_irq ?? runtime.member("m_sprite_irq");
                switch (offset) {
                    case 0:
                        {
                            (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](-1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 0) ?? 0) : 0);
                            break;
                        }
                    case 1:
                        {
                            (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 0) ?? 0) : 0);
                            break;
                        }
                    case 2:
                        {
                            (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : 0);
                            break;
                        }
                    case 3:
                        {
                            (__l["m_soundlatch.write"] ? __l["m_soundlatch.write"](data) : (members.m_soundlatch) != null ? ((runtime.dereference(members.m_soundlatch)).write?.(data) ?? 0) : 0);
                            break;
                        }
                    case 4:
                        {
                            if (h_m_subcpu) {
                                (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](h_m_sprite_irq, 1) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(h_m_sprite_irq, 1) ?? 0) : 0);
                            }
                            break;
                        }
                }
            }
            function method_interrupt_w(runtime, offset, data) {
                const members = runtime.members;
                (runtime.overrides["interrupt_ack"] ? runtime.overrides["interrupt_ack"](offset, data) : method_interrupt_ack(runtime, offset, data));
            }
            function method_bankswitch_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_scrollx_hi = ((((data) & (1))) & 0xff);
                members.m_scrolly_hi = ((((((data) & (2))) >>> (1))) & 0xff);
                (__l["flip_screen_set"] ? __l["flip_screen_set"]((((~data)) & (4))) : runtime.macro("flip_screen_set", (((~data)) & (4))));
                (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](-2, ((((data) & (8))) ? (0) : (1))) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(-2, ((((data) & (8))) ? (0) : (1))) ?? 0) : 0);
                (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](-3, ((((data) & (16))) ? (1) : (0))) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(-3, ((((data) & (16))) ? (1) : (0))) ?? 0) : 0);
                (__l["m_mainbank.set_entry"] ? __l["m_mainbank.set_entry"](((((data) & (224))) >>> (5))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((((data) & (224))) >>> (5))) ?? 0) : (__l["set_entry"]?.(((((data) & (224))) >>> (5))) ?? 0));
            }
            function method_sub_port6_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_sprite_irq = members.m_sprite_irq ?? runtime.member("m_sprite_irq");
                if (((Number(((data) & (1))) === Number(0)) ? 1 : 0)) {
                    (__l["m_subcpu.set_input_line"] ? __l["m_subcpu.set_input_line"](h_m_sprite_irq, 0) : (members.m_subcpu) != null ? ((runtime.dereference(members.m_subcpu)).set_input_line?.(h_m_sprite_irq, 0) ?? 0) : 0);
                }
                if (((((((((members.m_ddragon_sub_port ?? runtime.member("m_ddragon_sub_port"))) & (2))) ? 0 : 1)) && (((data) & (2)))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : 0);
                }
                members.m_ddragon_sub_port = ((data) & 0xff);
            }
            function method_ddragon_adpcm_status_r(runtime) {
                const members = runtime.members;
                return ((((runtime.readIndex((members.m_adpcm_idle ?? runtime.member("m_adpcm_idle")), 0)) ? (1) : (0))) | (((runtime.readIndex((members.m_adpcm_idle ?? runtime.member("m_adpcm_idle")), 1)) ? (2) : (0))));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                tile_index = ((tile_index) << (1));
                let attr = ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), tile_index)) & 0xff);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](2, ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((((attr) >>> (3))) & (7)), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(2, ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((((attr) >>> (3))) & (7)), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ?? 0) : (__l["set"]?.(2, ((runtime.readIndex((members.m_bgvideoram ?? runtime.member("m_bgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((((attr) >>> (3))) & (7)), (__l["TILE_FLIPYX"] ? __l["TILE_FLIPYX"](((((attr) & (192))) >>> (6))) : runtime.macro("TILE_FLIPYX", ((((attr) & (192))) >>> (6))))) ?? 0));
            }
            function method_background_scan(runtime, col, row, num_cols, num_rows) {
                const members = runtime.members;
                return ((((((((col) & (15))) | (((((row) & (15))) << (4))))) | (((((col) & (16))) << (4))))) | (((((row) & (16))) << (5))));
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                tile_index = ((tile_index) << (1));
                let attr = ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), tile_index)) & 0xff);
                (__l["tileinfo.set"] ? __l["tileinfo.set"](0, ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((attr) >>> (5)), 0) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((attr) >>> (5)), 0) ?? 0) : (__l["set"]?.(0, ((runtime.readIndex((members.m_fgvideoram ?? runtime.member("m_fgvideoram")), ((tile_index) | (1)))) | (((((attr) & (7))) << (8)))), ((attr) >>> (5)), 0) ?? 0));
            }
            function method_scanline(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scanline = ((param) | 0);
                let screen_height = (((__l["m_screen.height"] ? __l["m_screen.height"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).height === 'function' ? (runtime.dereference(members.m_screen)).height() : typeof (runtime.dereference(members.m_screen)).height === 'number' || typeof (runtime.dereference(members.m_screen)).height === 'boolean' ? (runtime.dereference(members.m_screen)).height : runtime.container(members.m_screen, "height")) : 0)) | 0);
                let vcount_old = (((runtime.overrides["scanline_to_vcount"] ? runtime.overrides["scanline_to_vcount"](((((Number(scanline) === Number(0)) ? 1 : 0)) ? (((screen_height) - (1))) : (((scanline) - (1))))) : method_scanline_to_vcount(runtime, ((((Number(scanline) === Number(0)) ? 1 : 0)) ? (((screen_height) - (1))) : (((scanline) - (1))))))) | 0);
                let vcount = (((runtime.overrides["scanline_to_vcount"] ? runtime.overrides["scanline_to_vcount"](scanline) : method_scanline_to_vcount(runtime, scanline))) | 0);
                if (((Number(scanline) > Number(0)) ? 1 : 0)) {
                    (__l["m_screen.update_partial"] ? __l["m_screen.update_partial"](((scanline) - (1))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.(((scanline) - (1))) ?? 0) : 0);
                }
                if (((Number(vcount) === Number(248)) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](-1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(-1, 1) ?? 0) : 0);
                }
                if ((((((((vcount_old) & (8))) ? 0 : 1)) && (((vcount) & (8)))) ? 1 : 0)) {
                    (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 1) ?? 0) : 0);
                }
            }
            function method_scanline_to_vcount(runtime, scanline) {
                const members = runtime.members;
                let vcount = ((((scanline) + (8))) | 0);
                if (((Number(vcount) < Number(256)) ? 1 : 0)) {
                    return vcount;
                }
                else {
                    return ((((vcount) - (24))) | (256));
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_scrollx_lo = members.m_scrollx_lo ?? runtime.member("m_scrollx_lo");
                const h_m_scrolly_lo = members.m_scrolly_lo ?? runtime.member("m_scrolly_lo");
                let scrollx = (((((((members.m_scrollx_hi ?? runtime.member("m_scrollx_hi"))) << (8))) | (runtime.dereference(h_m_scrollx_lo)))) | 0);
                let scrolly = (((((((members.m_scrolly_hi ?? runtime.member("m_scrolly_hi"))) << (8))) | (runtime.dereference(h_m_scrolly_lo)))) | 0);
                (__l["m_bg_tilemap.set_scrollx"] ? __l["m_bg_tilemap.set_scrollx"](0, scrollx) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, scrollx) ?? 0) : (__l["set_scrollx"]?.(0, scrollx) ?? 0));
                (__l["m_bg_tilemap.set_scrolly"] ? __l["m_bg_tilemap.set_scrolly"](0, scrolly) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrolly?.(0, scrolly) ?? 0) : (__l["set_scrolly"]?.(0, scrolly) ?? 0));
                (__l["m_bg_tilemap.draw"] ? __l["m_bg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                (runtime.overrides["draw_sprites"] ? runtime.overrides["draw_sprites"](bitmap, cliprect) : method_draw_sprites(runtime, bitmap, cliprect));
                (__l["m_fg_tilemap.draw"] ? __l["m_fg_tilemap.draw"](screen, bitmap, cliprect, 0, 0) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 0, 0) ?? 0) : (__l["draw"]?.(screen, bitmap, cliprect, 0, 0) ?? 0));
                return 0;
            }
            function method_draw_sprites(runtime, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_spriteram = members.m_spriteram ?? runtime.member("m_spriteram");
                const h_m_technos_video_hw = members.m_technos_video_hw ?? runtime.member("m_technos_video_hw");
                let gfx = (__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0);
                let src = h_m_spriteram;
                let bytes = (((members.m_spriteram).length) >>> 0);
                for (let i = ((0) >>> 0); ((Number(i) < Number(bytes)) ? 1 : 0); i = ((((i) + (5))) >>> 0)) {
                    let attr = ((runtime.readIndex(src, ((i) + (1)))) | 0);
                    if (((attr) & (128))) {
                        let sx = ((runtime.add(((240) - (runtime.readIndex(src, ((i) + (4))))), ((((attr) & (2))) << (7)))) | 0);
                        let sy = ((runtime.add(((232) - (runtime.readIndex(src, ((i) + (0))))), ((((attr) & (1))) << (8)))) | 0);
                        let size = ((((((attr) & (48))) >>> (4))) | 0);
                        let flipx = ((((attr) & (8))) | 0);
                        let flipy = ((((attr) & (4))) | 0);
                        let dx = ((-16) | 0);
                        let dy = ((-16) | 0);
                        let which = ((0) | 0);
                        let color = ((0) | 0);
                        if (((Number(h_m_technos_video_hw) === Number(2)) ? 1 : 0)) {
                            color = ((((runtime.readIndex(src, ((i) + (2)))) >>> (5))) | 0);
                            which = ((((runtime.readIndex(src, ((i) + (3)))) | (((((runtime.readIndex(src, ((i) + (2)))) & (31))) << (8))))) | 0);
                        }
                        else {
                            if (((Number(h_m_technos_video_hw) === Number(1)) ? 1 : 0)) {
                                if ((((((Number(sx) < Number(-7)) ? 1 : 0)) && (((Number(sx) > Number(-16)) ? 1 : 0))) ? 1 : 0)) {
                                    sx = ((((sx) + (256))) | 0);
                                }
                                if ((((((Number(sy) < Number(-7)) ? 1 : 0)) && (((Number(sy) > Number(-16)) ? 1 : 0))) ? 1 : 0)) {
                                    sy = ((((sy) + (256))) | 0);
                                }
                            }
                            color = ((((runtime.readIndex(src, ((i) + (2)))) >>> (4))) | 0);
                            which = ((((runtime.readIndex(src, ((i) + (3)))) | (((((runtime.readIndex(src, ((i) + (2)))) & (15))) << (8))))) | 0);
                        }
                        if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                            sx = ((((240) - (sx))) | 0);
                            sy = ((((224) - (sy))) | 0);
                            flipx = ((((flipx) ? 0 : 1)) | 0);
                            flipy = ((((flipy) ? 0 : 1)) | 0);
                            dx = (((-dx)) | 0);
                            dy = (((-dy)) | 0);
                        }
                        which = ((runtime.andAssign(which, (~size))) | 0);
                        switch (size) {
                            case 0:
                                {
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](0, sx, sy) : runtime.macro("DRAW_SPRITE", 0, sx, sy));
                                    break;
                                }
                            case 1:
                                {
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](0, sx, ((sy) + (dy))) : runtime.macro("DRAW_SPRITE", 0, sx, ((sy) + (dy))));
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](1, sx, sy) : runtime.macro("DRAW_SPRITE", 1, sx, sy));
                                    break;
                                }
                            case 2:
                                {
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](0, ((sx) + (dx)), sy) : runtime.macro("DRAW_SPRITE", 0, ((sx) + (dx)), sy));
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](2, sx, sy) : runtime.macro("DRAW_SPRITE", 2, sx, sy));
                                    break;
                                }
                            case 3:
                                {
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](0, ((sx) + (dx)), ((sy) + (dy))) : runtime.macro("DRAW_SPRITE", 0, ((sx) + (dx)), ((sy) + (dy))));
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](1, ((sx) + (dx)), sy) : runtime.macro("DRAW_SPRITE", 1, ((sx) + (dx)), sy));
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](2, sx, ((sy) + (dy))) : runtime.macro("DRAW_SPRITE", 2, sx, ((sy) + (dy))));
                                    (__l["DRAW_SPRITE"] ? __l["DRAW_SPRITE"](3, sx, sy) : runtime.macro("DRAW_SPRITE", 3, sx, sy));
                                    break;
                                }
                        }
                    }
                }
            }
            return {
                "fgvideoram_w": method_fgvideoram_w,
                "bgvideoram_w": method_bgvideoram_w,
                "interrupt_r": method_interrupt_r,
                "interrupt_ack": method_interrupt_ack,
                "interrupt_w": method_interrupt_w,
                "bankswitch_w": method_bankswitch_w,
                "sub_port6_w": method_sub_port6_w,
                "ddragon_adpcm_status_r": method_ddragon_adpcm_status_r,
                "get_bg_tile_info": method_get_bg_tile_info,
                "background_scan": method_background_scan,
                "get_fg_tile_info": method_get_fg_tile_info,
                "scanline": method_scanline,
                "scanline_to_vcount": method_scanline_to_vcount,
                "screen_update": method_screen_update,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "ddragon_state.fgvideoram_w": methods["fgvideoram_w"],
            "ddragon_state.bgvideoram_w": methods["bgvideoram_w"],
            "ddragon_state.interrupt_r": methods["interrupt_r"],
            "ddragon_state.interrupt_ack": methods["interrupt_ack"],
            "ddragon_state.interrupt_w": methods["interrupt_w"],
            "ddragon_state.bankswitch_w": methods["bankswitch_w"],
            "ddragon_state.sub_port6_w": methods["sub_port6_w"],
            "ddragon_state.ddragon_adpcm_status_r": methods["ddragon_adpcm_status_r"],
            "ddragon_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "ddragon_state.background_scan": methods["background_scan"],
            "ddragon_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "ddragon_state.scanline": methods["scanline"],
            "ddragon_state.scanline_to_vcount": methods["scanline_to_vcount"],
            "ddragon_state.screen_update": methods["screen_update"],
            "ddragon_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["DRAW_SPRITE", "TILE_FLIPYX", "draw", "flip_screen", "flip_screen_set", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrollx", "m_bg_tilemap.set_scrolly", "m_fg_tilemap.draw", "m_fg_tilemap.mark_tile_dirty", "m_gfxdecode.gfx", "m_mainbank.set_entry", "m_maincpu.set_input_line", "m_screen.height", "m_screen.update_partial", "m_soundlatch.write", "m_subcpu.set_input_line", "mark_tile_dirty", "set", "set_entry", "set_scrollx", "set_scrolly", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
