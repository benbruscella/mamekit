// GENERATED executable machine composition from src/mame/nichibutsu/seicross.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'friskyt');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
            }
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                offset = ((offset) & (65503));
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                runtime.writeIndex(runtime.writableMember("m_colorram"), ((offset) + (32)), data);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(offset);
                (__l["m_bg_tilemap.mark_tile_dirty"] ?? runtime.memberCall(members.m_bg_tilemap, "mark_tile_dirty", 0, __l["mark_tile_dirty"]))(((offset) + (32)));
            }
            function method_dac_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_dac.write"] ?? runtime.memberCall(members.m_dac, "write", 0, undefined))(runtime.shiftRight(data, 4));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let code = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (16))) << (4)))) | 0);
                let color = ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15))) | 0);
                let flags = ((((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (64))) ? (1) : (0))) | (((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (128))) ? (2) : (0))))) | 0);
                (__l["tileinfo.set"] ?? runtime.memberCall(tileinfo, "set", 0, __l["set"]))(0, code, color, flags);
            }
            function method_vblank_irq(runtime, device) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((members.m_irq_mask ?? runtime.member("m_irq_mask"))) {
                    ((runtime.dereference((__l["device.execute"] ?? runtime.memberCall(device, "execute", 0, __l["execute"]))())).set_input_line?.(0, 2) ?? 0);
                }
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_row_scroll = members.m_row_scroll ?? runtime.member("m_row_scroll");
                (__l["bitmap.fill"] ?? runtime.memberCall(bitmap, "fill", 0, __l["fill"]))(0, cliprect);
                for (let col = ((0) | 0); ((Number(col) < Number(32)) ? 1 : 0); col = ((((col) + (1))) | 0)) {
                    (__l["m_bg_tilemap.set_scrolly"] ?? runtime.memberCall(members.m_bg_tilemap, "set_scrolly", 0, __l["set_scrolly"]))(col, runtime.readIndex(h_m_row_scroll, col));
                }
                (__l["m_bg_tilemap.draw"] ?? runtime.memberCall(members.m_bg_tilemap, "draw", 0, __l["draw"]))(screen, bitmap, cliprect, 0, 0);
                runtime.invoke("draw_sprites", bitmap, cliprect);
                return 0;
            }
            function method_portb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (((((members.m_portb ?? runtime.member("m_portb"))) & (15))) | ((((__l["m_debug_port.read_safe"] ?? runtime.memberCall(members.m_debug_port, "read_safe", 0, __l["read_safe"]))(0)) & (240))));
            }
            function method_portb_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number(mem_mask) === Number(0)) ? 1 : 0)) {
                    return;
                }
                members.m_irq_mask = ((((data) & (1))) & 0xff);
                (__l["flip_screen_set"] ? __l["flip_screen_set"](((data) & (2))) : runtime.macro("flip_screen_set", ((data) & (2))));
                if ((((((Number((((members.m_portb ?? runtime.member("m_portb"))) & (4))) === Number(0)) ? 1 : 0)) && (((data) & (4)))) ? 1 : 0)) {
                    (__l["m_mcu.pulse_input_line"] ?? runtime.memberCall(members.m_mcu, "pulse_input_line", 0, undefined))(-2, 0);
                    (__l["m_mcu.set_input_line"] ?? runtime.memberCall(members.m_mcu, "set_input_line", 0, undefined))(-3, 0);
                }
                members.m_portb = ((data) & 0xff);
            }
            return {
                "videoram_w": method_videoram_w,
                "colorram_w": method_colorram_w,
                "dac_w": method_dac_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "vblank_irq": method_vblank_irq,
                "screen_update": method_screen_update,
                "portb_r": method_portb_r,
                "portb_w": method_portb_w
            };
        })();
        return {
            "seicross_state.videoram_w": methods["videoram_w"],
            "seicross_state.colorram_w": methods["colorram_w"],
            "seicross_state.dac_w": methods["dac_w"],
            "seicross_state.get_bg_tile_info": methods["get_bg_tile_info"],
            "seicross_state.vblank_irq": methods["vblank_irq"],
            "seicross_state.screen_update": methods["screen_update"],
            "seicross_state.portb_r": methods["portb_r"],
            "seicross_state.portb_w": methods["portb_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["bitmap.fill", "device.execute", "draw", "execute", "fill", "flip_screen_set", "m_bg_tilemap.draw", "m_bg_tilemap.mark_tile_dirty", "m_bg_tilemap.set_scrolly", "m_dac.write", "m_debug_port.read_safe", "m_mcu.pulse_input_line", "m_mcu.set_input_line", "mark_tile_dirty", "read_safe", "set", "set_scrolly", "tileinfo.set"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
