// GENERATED executable machine composition from src/mame/sanritsu/bankp.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bankp');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_videoram_w_0(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), offset, data);
                if (0) {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_colorram_w_0(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 0), offset, data);
                if (0) {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_videoram_w_1(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), offset, data);
                if (1) {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_colorram_w_1(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 1), offset, data);
                if (1) {
                    (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
                else {
                    (runtime.calls["m_fg_tilemap.mark_tile_dirty"] ? runtime.calls["m_fg_tilemap.mark_tile_dirty"](offset) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                }
            }
            function method_scroll_w(runtime, data) {
                const members = runtime.members;
                members.m_scroll_x = ((data) & 0xff);
            }
            function method_get_fg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let code = runtime.add(runtime.readIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 0), tile_index), ((256) * (((runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 0), tile_index)) & (3)))));
                let color = ((((runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 0), tile_index)) >>> (3))) | ((((members.m_color_hi ?? runtime.member("m_color_hi"))) << (5))));
                let flags = ((((runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 0), tile_index)) & (4))) ? (1) : (0));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (runtime.calls["set"]?.(0, code, color, flags) ?? 0));
                tileinfo.group = ((color) & (31));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let code = runtime.add(runtime.readIndex(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), 1), tile_index), ((256) * (((runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 1), tile_index)) & (7)))));
                let color = ((((runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 1), tile_index)) >>> (4))) | ((((members.m_color_hi ?? runtime.member("m_color_hi"))) << (4))));
                let flags = ((((runtime.readIndex(runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), 1), tile_index)) & (8))) ? (1) : (0));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](1, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(1, code, color, flags) ?? 0) : (runtime.calls["set"]?.(1, code, color, flags) ?? 0));
                tileinfo.group = ((color) & (15));
            }
            function method_vblank_interrupt(runtime, device) {
                const members = runtime.members;
                if ((members.m_nmi_mask ?? runtime.member("m_nmi_mask"))) {
                    ((runtime.dereference((runtime.calls["device.execute"] ? runtime.calls["device.execute"]() : (device) != null ? (typeof (runtime.dereference(device)).execute === 'function' ? (runtime.dereference(device)).execute() : typeof (runtime.dereference(device)).execute === 'number' || typeof (runtime.dereference(device)).execute === 'boolean' ? (runtime.dereference(device)).execute : runtime.container(device, "execute")) : (runtime.calls["execute"]?.() ?? 0)))).pulse_input_line?.(-1, 0) ?? 0);
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                if ((((members.m_display_on ?? runtime.member("m_display_on"))) ? 0 : 1)) {
                    (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["m_palette.black_pen"] ? runtime.calls["m_palette.black_pen"]() : (members.m_palette) != null ? (typeof (runtime.dereference(members.m_palette)).black_pen === 'function' ? (runtime.dereference(members.m_palette)).black_pen() : typeof (runtime.dereference(members.m_palette)).black_pen === 'number' || typeof (runtime.dereference(members.m_palette)).black_pen === 'boolean' ? (runtime.dereference(members.m_palette)).black_pen : runtime.container(members.m_palette, "black_pen")) : (runtime.calls["black_pen"]?.() ?? 0)), cliprect) ?? 0));
                    return 0;
                }
                if ((runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) {
                    (runtime.calls["m_fg_tilemap.set_scrollx"] ? runtime.calls["m_fg_tilemap.set_scrollx"](0, ((240) - ((members.m_scroll_x ?? runtime.member("m_scroll_x"))))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, ((240) - ((members.m_scroll_x ?? runtime.member("m_scroll_x"))))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, ((240) - ((members.m_scroll_x ?? runtime.member("m_scroll_x"))))) ?? 0));
                    (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, 240) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, 240) ?? 0) : (runtime.calls["set_scrollx"]?.(0, 240) ?? 0));
                }
                else {
                    (runtime.calls["m_fg_tilemap.set_scrollx"] ? runtime.calls["m_fg_tilemap.set_scrollx"](0, (members.m_scroll_x ?? runtime.member("m_scroll_x"))) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).set_scrollx?.(0, (members.m_scroll_x ?? runtime.member("m_scroll_x"))) ?? 0) : (runtime.calls["set_scrollx"]?.(0, (members.m_scroll_x ?? runtime.member("m_scroll_x"))) ?? 0));
                    (runtime.calls["m_bg_tilemap.set_scrollx"] ? runtime.calls["m_bg_tilemap.set_scrollx"](0, 0) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).set_scrollx?.(0, 0) ?? 0) : (runtime.calls["set_scrollx"]?.(0, 0) ?? 0));
                }
                switch ((members.m_priority ?? runtime.member("m_priority"))) {
                    case 0:
                        {
                            (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 128) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 128) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 128) ?? 0));
                            (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect) ?? 0));
                            break;
                        }
                    case 1:
                        {
                            (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect, 128) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect, 128) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 128) ?? 0));
                            (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect) ?? 0));
                            break;
                        }
                    case 2:
                        {
                            (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 128) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 128) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 128) ?? 0));
                            (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect) ?? 0));
                            break;
                        }
                    case 3:
                        {
                            (runtime.calls["m_fg_tilemap.draw"] ? runtime.calls["m_fg_tilemap.draw"](screen, bitmap, cliprect, 128) : (members.m_fg_tilemap) != null ? ((runtime.dereference(members.m_fg_tilemap)).draw?.(screen, bitmap, cliprect, 128) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, 128) ?? 0));
                            (runtime.calls["m_bg_tilemap.draw"] ? runtime.calls["m_bg_tilemap.draw"](screen, bitmap, cliprect) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).draw?.(screen, bitmap, cliprect) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect) ?? 0));
                            break;
                        }
                }
                return 0;
            }
            return {
                "videoram_w_0": method_videoram_w_0,
                "colorram_w_0": method_colorram_w_0,
                "videoram_w_1": method_videoram_w_1,
                "colorram_w_1": method_colorram_w_1,
                "scroll_w": method_scroll_w,
                "get_fg_tile_info": method_get_fg_tile_info,
                "get_bg_tile_info": method_get_bg_tile_info,
                "vblank_interrupt": method_vblank_interrupt,
                "screen_update": method_screen_update
            };
        })();
        return {
            "bankp_state.videoram_w_0": methods["videoram_w_0"],
            "bankp_state.colorram_w_0": methods["colorram_w_0"],
            "bankp_state.videoram_w_1": methods["videoram_w_1"],
            "bankp_state.colorram_w_1": methods["colorram_w_1"],
            "bankp_state.scroll_w": methods["scroll_w"],
            "bankp_state.get_fg_tile_info": methods["get_fg_tile_info"],
            "bankp_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "bankp_state.vblank_interrupt": methods["vblank_interrupt"],
            "bankp_state.screen_update": methods["screen_update"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
