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
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
            }
            function method_colorram_w(runtime, offset, data) {
                const members = runtime.members;
                offset = runtime.andAssign(offset, 65503);
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
                runtime.writeIndex(runtime.writableMember("m_colorram"), ((offset) + (32)), data);
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](offset) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(offset) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(offset) ?? 0));
                (runtime.calls["m_bg_tilemap.mark_tile_dirty"] ? runtime.calls["m_bg_tilemap.mark_tile_dirty"](((offset) + (32))) : (members.m_bg_tilemap) != null ? ((runtime.dereference(members.m_bg_tilemap)).mark_tile_dirty?.(((offset) + (32))) ?? 0) : (runtime.calls["mark_tile_dirty"]?.(((offset) + (32))) ?? 0));
            }
            function method_dac_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_dac.write"] ? runtime.calls["m_dac.write"](((data) >>> (4))) : (members.m_dac) != null ? ((runtime.dereference(members.m_dac)).write?.(((data) >>> (4))) ?? 0) : (runtime.calls["write"]?.(((data) >>> (4))) ?? 0));
            }
            function method_get_bg_tile_info(runtime, tilemap, tileinfo, tile_index) {
                const members = runtime.members;
                let code = runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), tile_index), ((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (16))) << (4)));
                let color = ((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (15));
                let flags = ((((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (64))) ? (1) : (0))) | (((((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), tile_index)) & (128))) ? (2) : (0))));
                (runtime.calls["tileinfo.set"] ? runtime.calls["tileinfo.set"](0, code, color, flags) : (tileinfo) != null ? ((runtime.dereference(tileinfo)).set?.(0, code, color, flags) ?? 0) : (runtime.calls["set"]?.(0, code, color, flags) ?? 0));
            }
            function method_vblank_irq(runtime, device) {
                const members = runtime.members;
                if ((members.m_irq_mask ?? runtime.member("m_irq_mask"))) {
                    ((runtime.dereference((runtime.calls["device.execute"] ? runtime.calls["device.execute"]() : (device) != null ? (typeof (runtime.dereference(device)).execute === 'function' ? (runtime.dereference(device)).execute() : typeof (runtime.dereference(device)).execute === 'number' || typeof (runtime.dereference(device)).execute === 'boolean' ? (runtime.dereference(device)).execute : runtime.container(device, "execute")) : (runtime.calls["execute"]?.() ?? 0)))).set_input_line?.(0, 2) ?? 0);
                }
            }
            function method_portb_r(runtime) {
                const members = runtime.members;
                return (((((members.m_portb ?? runtime.member("m_portb"))) & (15))) | ((((runtime.calls["m_debug_port.read_safe"] ? runtime.calls["m_debug_port.read_safe"](0) : (members.m_debug_port) != null ? ((runtime.dereference(members.m_debug_port)).read_safe?.(0) ?? 0) : (runtime.calls["read_safe"]?.(0) ?? 0))) & (240))));
            }
            function method_portb_w(runtime, offset, data, mem_mask) {
                const members = runtime.members;
                if (((Number(mem_mask) === Number(0)) ? 1 : 0)) {
                    return;
                }
                members.m_irq_mask = ((((data) & (1))) & 0xff);
                (runtime.calls["flip_screen_set"] ? runtime.calls["flip_screen_set"](((data) & (2))) : runtime.macro("flip_screen_set", ((data) & (2))));
                if ((((((Number((((members.m_portb ?? runtime.member("m_portb"))) & (4))) === Number(0)) ? 1 : 0)) && (((data) & (4)))) ? 1 : 0)) {
                    (runtime.calls["m_mcu.pulse_input_line"] ? runtime.calls["m_mcu.pulse_input_line"](-2, 0) : (members.m_mcu) != null ? ((runtime.dereference(members.m_mcu)).pulse_input_line?.(-2, 0) ?? 0) : (runtime.calls["pulse_input_line"]?.(-2, 0) ?? 0));
                    (runtime.calls["m_mcu.set_input_line"] ? runtime.calls["m_mcu.set_input_line"](-3, 0) : (members.m_mcu) != null ? ((runtime.dereference(members.m_mcu)).set_input_line?.(-3, 0) ?? 0) : (runtime.calls["set_input_line"]?.(-3, 0) ?? 0));
                }
                members.m_portb = ((data) & 0xff);
            }
            return {
                "videoram_w": method_videoram_w,
                "colorram_w": method_colorram_w,
                "dac_w": method_dac_w,
                "get_bg_tile_info": method_get_bg_tile_info,
                "vblank_irq": method_vblank_irq,
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
            "seicross_state.portb_r": methods["portb_r"],
            "seicross_state.portb_w": methods["portb_w"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
