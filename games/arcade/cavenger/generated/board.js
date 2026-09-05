// GENERATED executable machine composition from src/mame/universal/ladybug.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'cavenger');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_spr_w(runtime, offset, data) {
                const members = runtime.members;
                runtime.writeIndex(runtime.writableMember("m_spr_ram"), ((offset) & (1023)), data);
            }
            function method_bg_r(runtime, offset) {
                const members = runtime.members;
                return runtime.readIndex((members.m_bg_ram ?? runtime.member("m_bg_ram")), ((offset) & (2047)));
            }
            function method_screen_update_ladybug(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"](0, cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.(0, cliprect) ?? 0) : (runtime.calls["fill"]?.(0, cliprect) ?? 0));
                (runtime.calls["m_video.draw"] ? runtime.calls["m_video.draw"](screen, bitmap, cliprect, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) : (members.m_video) != null ? ((runtime.dereference(members.m_video)).draw?.(screen, bitmap, cliprect, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ?? 0) : (runtime.calls["draw"]?.(screen, bitmap, cliprect, (runtime.calls["flip_screen"] ? runtime.calls["flip_screen"]() : runtime.macro("flip_screen"))) ?? 0));
                return 0;
            }
            return {
                "spr_w": method_spr_w,
                "bg_r": method_bg_r,
                "screen_update_ladybug": method_screen_update_ladybug
            };
        })();
        return {
            "ladybug_state.screen_update_ladybug": methods["screen_update_ladybug"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
