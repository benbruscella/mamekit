// GENERATED executable machine composition from src/mame/dataeast/btime.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'bnj');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_btime_mirrorvideoram_r(runtime, offset) {
                const members = runtime.members;
                let x = ((runtime.divide(offset, 32)) | 0);
                let y = ((((offset) % (32))) | 0);
                offset = ((((32) * (y))) + (x));
                return runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offset);
            }
            function method_btime_mirrorvideoram_w(runtime, offset, data) {
                const members = runtime.members;
                let x = ((runtime.divide(offset, 32)) | 0);
                let y = ((((offset) % (32))) | 0);
                offset = ((((32) * (y))) + (x));
                runtime.writeIndex(runtime.writableMember("m_videoram"), offset, data);
            }
            function method_btime_mirrorcolorram_r(runtime, offset) {
                const members = runtime.members;
                let x = ((runtime.divide(offset, 32)) | 0);
                let y = ((((offset) % (32))) | 0);
                offset = ((((32) * (y))) + (x));
                return runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offset);
            }
            function method_btime_mirrorcolorram_w(runtime, offset, data) {
                const members = runtime.members;
                let x = ((runtime.divide(offset, 32)) | 0);
                let y = ((((offset) % (32))) | 0);
                offset = ((((32) * (y))) + (x));
                runtime.writeIndex(runtime.writableMember("m_colorram"), offset, data);
            }
            function method_btime_video_control_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["flip_screen_set"] ? __l["flip_screen_set"](((data) & (1))) : runtime.macro("flip_screen_set", ((data) & (1))));
            }
            function method_bnj_scroll_w_0(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bnj_scroll"), 0, data);
            }
            function method_bnj_video_control_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["m_dsw1.read"] ? __l["m_dsw1.read"]() : (members.m_dsw1) != null ? (typeof (runtime.dereference(members.m_dsw1)).read === 'function' ? (runtime.dereference(members.m_dsw1)).read() : typeof (runtime.dereference(members.m_dsw1)).read === 'number' || typeof (runtime.dereference(members.m_dsw1)).read === 'boolean' ? (runtime.dereference(members.m_dsw1)).read : runtime.container(members.m_dsw1, "read")) : (__l["read"]?.() ?? 0))) & (64))) {
                    (runtime.overrides["btime_video_control_w"] ? runtime.overrides["btime_video_control_w"](data) : method_btime_video_control_w(runtime, data));
                }
            }
            function method_bnj_scroll_w_1(runtime, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_bnj_scroll"), 1, data);
            }
            function method_audio_nmi_gen(runtime, param) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scanline = ((param) | 0);
                (__l["m_audionmi.in_w_1"] ? __l["m_audionmi.in_w_1"](runtime.shiftRight(((scanline) & (8)), 3)) : (members.m_audionmi) != null ? ((runtime.dereference(members.m_audionmi)).in_w_1?.(runtime.shiftRight(((scanline) & (8)), 3)) ?? 0) : 0);
            }
            function method_draw_chars(runtime, bitmap, cliprect, transparency, color, priority) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                for (let offs = 0; ((Number(offs) < Number((members.m_videoram).length)) ? 1 : 0); offs = ((offs) + (1))) {
                    let x = ((((31) - (runtime.divide(offs, 32)))) & 0xff);
                    let y = ((((offs) % (32))) & 0xff);
                    let code = ((runtime.add(runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), offs), ((256) * (((runtime.readIndex((members.m_colorram ?? runtime.member("m_colorram")), offs)) & (3)))))) & 0xffff);
                    if ((((((Number(priority) !== Number(-1)) ? 1 : 0)) && (((Number(priority) !== Number(((runtime.shiftRight(code, 7)) & (1)))) ? 1 : 0))) ? 1 : 0)) {
                        continue;
                    }
                    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                        x = ((((31) - (x))) & 0xff);
                        y = ((((31) - (y))) & 0xff);
                    }
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](0) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(0) ?? 0) : 0))).transpen?.(bitmap, cliprect, code, color, (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), (__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen")), ((8) * (x)), ((8) * (y)), ((transparency) ? (0) : (-1))) ?? 0);
                }
            }
            function method_draw_sprites(runtime, bitmap, cliprect, color, sprite_y_adjust, sprite_y_adjust_flip_screen, sprite_ram, interleave) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                for (let i = ((0) | 0), offs = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0), offs = ((((offs) + (((4) * (interleave))))) | 0)) {
                    if (((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (1))) ? 0 : 1)) {
                        continue;
                    }
                    let x = ((((240) - (runtime.readIndex(sprite_ram, ((offs) + (((3) * (interleave)))))))) | 0);
                    let y = ((((240) - (runtime.readIndex(sprite_ram, ((offs) + (((2) * (interleave)))))))) | 0);
                    let flipx = ((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (4))) & 0xff);
                    let flipy = ((((runtime.readIndex(sprite_ram, ((offs) + (0)))) & (2))) & 0xff);
                    if ((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) {
                        x = ((((240) - (x))) | 0);
                        y = ((((((240) - (y))) + (sprite_y_adjust_flip_screen))) | 0);
                        flipx = ((((flipx) ? 0 : 1)) & 0xff);
                        flipy = ((((flipy) ? 0 : 1)) & 0xff);
                    }
                    y = ((((y) - (sprite_y_adjust))) | 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, runtime.readIndex(sprite_ram, ((offs) + (interleave))), color, flipx, flipy, x, y, 0) ?? 0);
                    y = ((((y) + ((((__l["flip_screen"] ? __l["flip_screen"]() : runtime.macro("flip_screen"))) ? (-256) : (256))))) | 0);
                    ((runtime.dereference((__l["m_gfxdecode.gfx"] ? __l["m_gfxdecode.gfx"](1) : (members.m_gfxdecode) != null ? ((runtime.dereference(members.m_gfxdecode)).gfx?.(1) ?? 0) : 0))).transpen?.(bitmap, cliprect, runtime.readIndex(sprite_ram, ((offs) + (interleave))), color, flipx, flipy, x, y, 0) ?? 0);
                }
            }
            return {
                "btime_mirrorvideoram_r": method_btime_mirrorvideoram_r,
                "btime_mirrorvideoram_w": method_btime_mirrorvideoram_w,
                "btime_mirrorcolorram_r": method_btime_mirrorcolorram_r,
                "btime_mirrorcolorram_w": method_btime_mirrorcolorram_w,
                "btime_video_control_w": method_btime_video_control_w,
                "bnj_scroll_w_0": method_bnj_scroll_w_0,
                "bnj_video_control_w": method_bnj_video_control_w,
                "bnj_scroll_w_1": method_bnj_scroll_w_1,
                "audio_nmi_gen": method_audio_nmi_gen,
                "draw_chars": method_draw_chars,
                "draw_sprites": method_draw_sprites
            };
        })();
        return {
            "btime_state.btime_mirrorvideoram_r": methods["btime_mirrorvideoram_r"],
            "btime_state.btime_mirrorvideoram_w": methods["btime_mirrorvideoram_w"],
            "btime_state.btime_mirrorcolorram_r": methods["btime_mirrorcolorram_r"],
            "btime_state.btime_mirrorcolorram_w": methods["btime_mirrorcolorram_w"],
            "btime_state.btime_video_control_w": methods["btime_video_control_w"],
            "btime_state.bnj_scroll_w_0": methods["bnj_scroll_w_0"],
            "btime_state.bnj_video_control_w": methods["bnj_video_control_w"],
            "btime_state.bnj_scroll_w_1": methods["bnj_scroll_w_1"],
            "btime_state.audio_nmi_gen": methods["audio_nmi_gen"],
            "btime_state.draw_chars": methods["draw_chars"],
            "btime_state.draw_sprites": methods["draw_sprites"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["flip_screen", "flip_screen_set", "m_audionmi.in_w_1", "m_dsw1.read", "m_gfxdecode.gfx", "read"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
