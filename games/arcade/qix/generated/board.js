// GENERATED executable machine composition from src/mame/taito/qix.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'qix');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_video_firq_r(runtime, space) {
                const members = runtime.members;
                if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (runtime.calls["m_videocpu.set_input_line"] ? runtime.calls["m_videocpu.set_input_line"](1, 1) : (members.m_videocpu) != null ? ((runtime.dereference(members.m_videocpu)).set_input_line?.(1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(1, 1) ?? 0));
                }
                return (runtime.calls["space.unmap"] ? runtime.calls["space.unmap"]() : (space) != null ? (typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap")) : (runtime.calls["unmap"]?.() ?? 0));
            }
            function method_video_firq_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_videocpu.set_input_line"] ? runtime.calls["m_videocpu.set_input_line"](1, 1) : (members.m_videocpu) != null ? ((runtime.dereference(members.m_videocpu)).set_input_line?.(1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(1, 1) ?? 0));
            }
            function method_data_firq_ack_r(runtime, space) {
                const members = runtime.members;
                if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(1, 0) ?? 0));
                }
                return (runtime.calls["space.unmap"] ? runtime.calls["space.unmap"]() : (space) != null ? (typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap")) : (runtime.calls["unmap"]?.() ?? 0));
            }
            function method_data_firq_ack_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](1, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(1, 0) ?? 0));
            }
            function method_videoram_r(runtime, offset) {
                const members = runtime.members;
                const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
                offset = ((offset) + (((((runtime.readIndex(h_m_videoram_address, 0)) & (128))) << (8))));
                return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
            }
            function method_videoram_w(runtime, offset, data) {
                const members = runtime.members;
                const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                offset = ((offset) + (((((runtime.readIndex(h_m_videoram_address, 0)) & (128))) << (8))));
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
            }
            function method_palettebank_w(runtime, data) {
                const members = runtime.members;
                if (((Number((members.m_palette_bank ?? runtime.member("m_palette_bank"))) !== Number(((data) & (3)))) ? 1 : 0)) {
                    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                    members.m_palette_bank = ((((data) & (3))) & 0xff);
                }
                members.m_leds = (((((~data)) & (252))) & 0xff);
            }
            function method_data_firq_r(runtime, space) {
                const members = runtime.members;
                if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(1, 1) ?? 0));
                }
                return (runtime.calls["space.unmap"] ? runtime.calls["space.unmap"]() : (space) != null ? (typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap")) : (runtime.calls["unmap"]?.() ?? 0));
            }
            function method_data_firq_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](1, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(1, 1) ?? 0) : (runtime.calls["set_input_line"]?.(1, 1) ?? 0));
            }
            function method_video_firq_ack_r(runtime, space) {
                const members = runtime.members;
                if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
                    (runtime.calls["m_videocpu.set_input_line"] ? runtime.calls["m_videocpu.set_input_line"](1, 0) : (members.m_videocpu) != null ? ((runtime.dereference(members.m_videocpu)).set_input_line?.(1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(1, 0) ?? 0));
                }
                return (runtime.calls["space.unmap"] ? runtime.calls["space.unmap"]() : (space) != null ? (typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap")) : (runtime.calls["unmap"]?.() ?? 0));
            }
            function method_video_firq_ack_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_videocpu.set_input_line"] ? runtime.calls["m_videocpu.set_input_line"](1, 0) : (members.m_videocpu) != null ? ((runtime.dereference(members.m_videocpu)).set_input_line?.(1, 0) ?? 0) : (runtime.calls["set_input_line"]?.(1, 0) ?? 0));
            }
            function method_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                let old_data = (((runtime.calls["m_palette.read8"] ? runtime.calls["m_palette.read8"](offset) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).read8?.(offset) ?? 0) : (runtime.calls["read8"]?.(offset) ?? 0))) & 0xff);
                if ((((((Number(((offset) >>> (8))) === Number((members.m_palette_bank ?? runtime.member("m_palette_bank")))) ? 1 : 0)) && (((Number(old_data) !== Number(data)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                }
                (runtime.calls["m_palette.write8"] ? runtime.calls["m_palette.write8"](offset, data) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).write8?.(offset, data) ?? 0) : (runtime.calls["write8"]?.(offset, data) ?? 0));
            }
            function method_addresslatch_r(runtime) {
                const members = runtime.members;
                const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
                let offset = ((((runtime.readIndex(h_m_videoram_address, 0)) << (8))) | (runtime.readIndex(h_m_videoram_address, 1)));
                return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
            }
            function method_addresslatch_w(runtime, data) {
                const members = runtime.members;
                const h_m_videoram_address = members.m_videoram_address ?? runtime.member("m_videoram_address");
                (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                let offset = ((((runtime.readIndex(h_m_videoram_address, 0)) << (8))) | (runtime.readIndex(h_m_videoram_address, 1)));
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
            }
            function method_display_enable_changed(runtime, state) {
                const members = runtime.members;
                const h_m_scanline_latch = members.m_scanline_latch ?? runtime.member("m_scanline_latch");
                if (state) {
                    let ma = (((runtime.calls["m_crtc.get_ma"] ? runtime.calls["m_crtc.get_ma"]() : (members.m_crtc) != null ? (typeof (runtime.dereference(members.m_crtc)).get_ma === 'function' ? (runtime.dereference(members.m_crtc)).get_ma() : typeof (runtime.dereference(members.m_crtc)).get_ma === 'number' || typeof (runtime.dereference(members.m_crtc)).get_ma === 'boolean' ? (runtime.dereference(members.m_crtc)).get_ma : runtime.container(members.m_crtc, "get_ma")) : (runtime.calls["get_ma"]?.() ?? 0))) & 0xffff);
                    let ra = (((runtime.calls["m_crtc.get_ra"] ? runtime.calls["m_crtc.get_ra"]() : (members.m_crtc) != null ? (typeof (runtime.dereference(members.m_crtc)).get_ra === 'function' ? (runtime.dereference(members.m_crtc)).get_ra() : typeof (runtime.dereference(members.m_crtc)).get_ra === 'number' || typeof (runtime.dereference(members.m_crtc)).get_ra === 'boolean' ? (runtime.dereference(members.m_crtc)).get_ra : runtime.container(members.m_crtc, "get_ra")) : (runtime.calls["get_ra"]?.() ?? 0))) & 0xff);
                    runtime.pointerStore(h_m_scanline_latch, ((((((ma) >>> (2))) & (248))) | (((ra) & (7)))));
                }
            }
            function method_flip_screen_w(runtime, state) {
                const members = runtime.members;
                members.m_flip = ((state) ? 1 : 0);
            }
            return {
                "video_firq_r": method_video_firq_r,
                "video_firq_w": method_video_firq_w,
                "data_firq_ack_r": method_data_firq_ack_r,
                "data_firq_ack_w": method_data_firq_ack_w,
                "videoram_r": method_videoram_r,
                "videoram_w": method_videoram_w,
                "palettebank_w": method_palettebank_w,
                "data_firq_r": method_data_firq_r,
                "data_firq_w": method_data_firq_w,
                "video_firq_ack_r": method_video_firq_ack_r,
                "video_firq_ack_w": method_video_firq_ack_w,
                "paletteram_w": method_paletteram_w,
                "addresslatch_r": method_addresslatch_r,
                "addresslatch_w": method_addresslatch_w,
                "display_enable_changed": method_display_enable_changed,
                "flip_screen_w": method_flip_screen_w
            };
        })();
        return {
            "qix_state.video_firq_r": methods["video_firq_r"],
            "qix_state.video_firq_w": methods["video_firq_w"],
            "qix_state.data_firq_ack_r": methods["data_firq_ack_r"],
            "qix_state.data_firq_ack_w": methods["data_firq_ack_w"],
            "qix_state.videoram_r": methods["videoram_r"],
            "qix_state.videoram_w": methods["videoram_w"],
            "qix_state.palettebank_w": methods["palettebank_w"],
            "qix_state.data_firq_r": methods["data_firq_r"],
            "qix_state.data_firq_w": methods["data_firq_w"],
            "qix_state.video_firq_ack_r": methods["video_firq_ack_r"],
            "qix_state.video_firq_ack_w": methods["video_firq_ack_w"],
            "qix_state.paletteram_w": methods["paletteram_w"],
            "qix_state.addresslatch_r": methods["addresslatch_r"],
            "qix_state.addresslatch_w": methods["addresslatch_w"],
            "qix_state.display_enable_changed": methods["display_enable_changed"],
            "qix_state.flip_screen_w": methods["flip_screen_w"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
