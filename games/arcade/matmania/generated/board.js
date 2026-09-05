// GENERATED executable machine composition from src/mame/technos/matmania.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'matmania');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_paletteram_w(runtime, offset, data) {
                const members = runtime.members;
                let bit0 = 0;
                let bit1 = 0;
                let bit2 = 0;
                let bit3 = 0;
                let val = 0;
                runtime.writeIndex(runtime.writableMember("m_paletteram"), offset, data);
                offset = runtime.andAssign(offset, 15);
                val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), offset);
                bit0 = (((val) >>> (0)) & 1);
                bit1 = (((val) >>> (1)) & 1);
                bit2 = (((val) >>> (2)) & 1);
                bit3 = (((val) >>> (3)) & 1);
                let r = runtime.add(runtime.add(runtime.add(((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)));
                val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (16)));
                bit0 = (((val) >>> (0)) & 1);
                bit1 = (((val) >>> (1)) & 1);
                bit2 = (((val) >>> (2)) & 1);
                bit3 = (((val) >>> (3)) & 1);
                let g = runtime.add(runtime.add(runtime.add(((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)));
                val = runtime.readIndex((members.m_paletteram ?? runtime.member("m_paletteram")), ((offset) | (32)));
                bit0 = (((val) >>> (0)) & 1);
                bit1 = (((val) >>> (1)) & 1);
                bit2 = (((val) >>> (2)) & 1);
                bit3 = (((val) >>> (3)) & 1);
                let b = runtime.add(runtime.add(runtime.add(((14) * (bit0)), ((31) * (bit1))), ((67) * (bit2))), ((143) * (bit3)));
                (runtime.calls["m_palette.set_pen_color"] ? runtime.calls["m_palette.set_pen_color"](((offset) + (64)), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).set_pen_color?.(((offset) + (64)), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) ?? 0) : (runtime.calls["set_pen_color"]?.(((offset) + (64)), (runtime.calls["rgb_t"] ? runtime.calls["rgb_t"](r, g, b) : runtime.macro("rgb_t", r, g, b))) ?? 0));
            }
            function method_sound_nmi_enable_w(runtime, data) {
                const members = runtime.members;
                members.m_sound_nmi_enable = (((((((data) >>> (0)) & 1)) ? 1 : 0)) ? 1 : 0);
            }
            function method_scanline(runtime, param) {
                const members = runtime.members;
                let scanline = param;
                if (((((members.m_sound_nmi_enable ?? runtime.member("m_sound_nmi_enable"))) && (((Number(scanline) < Number(256)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.calls["m_audiocpu.pulse_input_line"] ? runtime.calls["m_audiocpu.pulse_input_line"](-1, 0) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).pulse_input_line?.(-1, 0) ?? 0) : (runtime.calls["pulse_input_line"]?.(-1, 0) ?? 0));
                }
            }
            return {
                "paletteram_w": method_paletteram_w,
                "sound_nmi_enable_w": method_sound_nmi_enable_w,
                "scanline": method_scanline
            };
        })();
        return {
            "matmania_state.paletteram_w": methods["paletteram_w"],
            "matmania_state.sound_nmi_enable_w": methods["sound_nmi_enable_w"],
            "matmania_state.scanline": methods["scanline"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
