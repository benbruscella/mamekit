// GENERATED executable machine composition from src/mame/konami/junofrst.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'junofrst');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_sh_irqtrigger_w(runtime, data) {
                const members = runtime.members;
                if ((((((Number((members.m_last_irq ?? runtime.member("m_last_irq"))) === Number(0)) ? 1 : 0)) && (((Number(data) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                    (runtime.calls["m_audiocpu.set_input_line"] ? runtime.calls["m_audiocpu.set_input_line"](0, 2) : (members.m_audiocpu) != null ? ((runtime.dereference(members.m_audiocpu)).set_input_line?.(0, 2) ?? 0) : (runtime.calls["set_input_line"]?.(0, 2) ?? 0));
                }
                members.m_last_irq = ((data) & 0xff);
            }
            function method_bankselect_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_mainbank.set_entry"] ? runtime.calls["m_mainbank.set_entry"](((data) & (15))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) & (15))) ?? 0) : (runtime.calls["set_entry"]?.(((data) & (15))) ?? 0));
            }
            function method_blitter_w(runtime, offset, data) {
                const members = runtime.members;
                const h_m_blitrom = members.m_blitrom ?? runtime.member("m_blitrom");
                runtime.writeIndex(runtime.writableMember("m_blitterdata"), offset, data);
                if (((Number(offset) === Number(3)) ? 1 : 0)) {
                    let src = ((((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 2)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)))) & (65532));
                    let dest = ((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 0)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 1)));
                    let copy = (((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)) >>> (0)) & 1)) ? 1 : 0);
                    for (let i = 0; ((Number(i) < Number(16)) ? 1 : 0); i = ((i) + (1))) {
                        for (let j = 0; ((Number(j) < Number(16)) ? 1 : 0); j = ((j) + (1))) {
                            let data = ((0) & 0xff);
                            if ((((src) >>> (0)) & 1)) {
                                data = ((((runtime.readIndex(h_m_blitrom, ((src) >>> (1)))) & (15))) & 0xff);
                            }
                            else {
                                data = ((((runtime.readIndex(h_m_blitrom, ((src) >>> (1)))) >>> (4))) & 0xff);
                            }
                            src = ((src) + (1));
                            if (data) {
                                if (((copy) ? 0 : 1)) {
                                    data = ((0) & 0xff);
                                }
                                if ((((dest) >>> (0)) & 1)) {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (15))) | (((data) << (4)))));
                                }
                                else {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (240))) | (data)));
                                }
                            }
                            dest = ((dest) + (1));
                        }
                        dest = ((dest) + (240));
                    }
                }
            }
            function method_i8039_irq_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_i8039.set_input_line"] ? runtime.calls["m_i8039.set_input_line"](0, 1) : (members.m_i8039) != null ? ((runtime.dereference(members.m_i8039)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
            }
            function method_i8039_irqen_and_status_w(runtime, data) {
                const members = runtime.members;
                if (((((~data)) >>> (7)) & 1)) {
                    (runtime.calls["m_i8039.set_input_line"] ? runtime.calls["m_i8039.set_input_line"](0, 0) : (members.m_i8039) != null ? ((runtime.dereference(members.m_i8039)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
                members.m_i8039_status = ((((((data) & (112))) >>> (4))) & 0xff);
            }
            function method_irq_enable_w(runtime, state) {
                const members = runtime.members;
                members.m_irq_enable = ((state) & 0xff);
                if ((((members.m_irq_enable ?? runtime.member("m_irq_enable"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
            }
            function method_flip_screen_x_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_x = ((state) & 0xff);
            }
            function method_flip_screen_y_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_y = ((state) & 0xff);
            }
            function method_scramble_draw_background(runtime, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) ?? 0));
                (runtime.overrides["scramble_draw_stars"] ? runtime.overrides["scramble_draw_stars"](bitmap, cliprect, 256) : method_scramble_draw_stars(runtime, bitmap, cliprect, 256));
            }
            function method_scramble_draw_stars(runtime, bitmap, cliprect, maxx) {
                const members = runtime.members;
                if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
                    for (let y = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
                        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, maxx, y, ((y) * (512))) : method_stars_draw_row(runtime, bitmap, maxx, y, ((y) * (512))));
                    }
                }
            }
            function method_stars_draw_row(runtime, bitmap, maxx, y, star_offs) {
                const members = runtime.members;
                let flipxor = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (192) : (0))) & 0xff);
                star_offs = ((((star_offs) % (131071))) >>> 0);
                for (let x = 0; ((Number(x) < Number(maxx)) ? 1 : 0); x = ((x) + (1))) {
                    let h8q = ((((((~x)) >>> (3)) & 1)) & 0xff);
                    let enable_star = (((((((y) ^ (h8q))) >>> (0)) & 1)) ? 1 : 0);
                    let blink_state = (((((members.m_stars_blink_state ?? runtime.member("m_stars_blink_state"))) & (3))) & 0xff);
                    let enab = ((0) ? 1 : 0);
                    switch (blink_state) {
                        case 0:
                            {
                                enab = ((1) ? 1 : 0);
                                break;
                            }
                        case 1:
                            {
                                enab = (((((y) >>> (0)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 2:
                            {
                                enab = (((((y) >>> (1)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 3:
                            {
                                enab = ((h8q) ? 1 : 0);
                                break;
                            }
                    }
                    enable_star = ((runtime.andAssign(enable_star, (((enab) && (((Number(((((x) & (192))) ^ (flipxor))) !== Number(192)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
                    let star = ((0) & 0xff);
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (() => { const previous = star_offs; star_offs = ((((star_offs) + (1))) >>> 0); return previous; })())) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, runtime.add(((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (() => { const previous = star_offs; star_offs = ((((star_offs) + (1))) >>> 0); return previous; })())) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, runtime.add(((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                        bitmap["pix="](y, runtime.add(((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                }
            }
            function method__30hz_irq(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_irq_toggle = ((((members.m_irq_toggle) ^ (1))) & 0xff);
                    if (((((members.m_irq_toggle ?? runtime.member("m_irq_toggle"))) && ((members.m_irq_enable ?? runtime.member("m_irq_enable")))) ? 1 : 0)) {
                        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                    }
                }
            }
            function method_portA_r(runtime) {
                const members = runtime.members;
                let timer = ((runtime.divide((runtime.calls["m_audiocpu.total_cycles"] ? runtime.calls["m_audiocpu.total_cycles"]() : (members.m_audiocpu) != null ? (typeof (runtime.dereference(members.m_audiocpu)).total_cycles === 'function' ? (runtime.dereference(members.m_audiocpu)).total_cycles() : typeof (runtime.dereference(members.m_audiocpu)).total_cycles === 'number' || typeof (runtime.dereference(members.m_audiocpu)).total_cycles === 'boolean' ? (runtime.dereference(members.m_audiocpu)).total_cycles : runtime.container(members.m_audiocpu, "total_cycles")) : (runtime.calls["total_cycles"]?.() ?? 0)), runtime.divide(1024, 2))) & (15));
                return ((((timer) << (4))) | ((members.m_i8039_status ?? runtime.member("m_i8039_status"))));
            }
            return {
                "sh_irqtrigger_w": method_sh_irqtrigger_w,
                "bankselect_w": method_bankselect_w,
                "blitter_w": method_blitter_w,
                "i8039_irq_w": method_i8039_irq_w,
                "i8039_irqen_and_status_w": method_i8039_irqen_and_status_w,
                "irq_enable_w": method_irq_enable_w,
                "flip_screen_x_w": method_flip_screen_x_w,
                "flip_screen_y_w": method_flip_screen_y_w,
                "scramble_draw_background": method_scramble_draw_background,
                "scramble_draw_stars": method_scramble_draw_stars,
                "stars_draw_row": method_stars_draw_row,
                "_30hz_irq": method__30hz_irq,
                "portA_r": method_portA_r
            };
        })();
        return {
            "junofrst_state.sh_irqtrigger_w": methods["sh_irqtrigger_w"],
            "junofrst_state.bankselect_w": methods["bankselect_w"],
            "junofrst_state.blitter_w": methods["blitter_w"],
            "junofrst_state.i8039_irq_w": methods["i8039_irq_w"],
            "junofrst_state.i8039_irqen_and_status_w": methods["i8039_irqen_and_status_w"],
            "junofrst_state.irq_enable_w": methods["irq_enable_w"],
            "junofrst_state.flip_screen_x_w": methods["flip_screen_x_w"],
            "junofrst_state.flip_screen_y_w": methods["flip_screen_y_w"],
            "junofrst_state._30hz_irq": methods["_30hz_irq"],
            "junofrst_state.portA_r": methods["portA_r"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_blitter_w(runtime, offset, data) {
                const members = runtime.members;
                const h_m_blitrom = members.m_blitrom ?? runtime.member("m_blitrom");
                runtime.writeIndex(runtime.writableMember("m_blitterdata"), offset, data);
                if (((Number(offset) === Number(3)) ? 1 : 0)) {
                    let src = ((((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 2)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)))) & (65532));
                    let dest = ((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 0)) << (8))) | (runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 1)));
                    let copy = (((((runtime.readIndex((members.m_blitterdata ?? runtime.member("m_blitterdata")), 3)) >>> (0)) & 1)) ? 1 : 0);
                    for (let i = 0; ((Number(i) < Number(16)) ? 1 : 0); i = ((i) + (1))) {
                        for (let j = 0; ((Number(j) < Number(16)) ? 1 : 0); j = ((j) + (1))) {
                            let data = ((0) & 0xff);
                            if ((((src) >>> (0)) & 1)) {
                                data = ((((runtime.readIndex(h_m_blitrom, ((src) >>> (1)))) & (15))) & 0xff);
                            }
                            else {
                                data = ((((runtime.readIndex(h_m_blitrom, ((src) >>> (1)))) >>> (4))) & 0xff);
                            }
                            src = ((src) + (1));
                            if (data) {
                                if (((copy) ? 0 : 1)) {
                                    data = ((0) & 0xff);
                                }
                                if ((((dest) >>> (0)) & 1)) {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (15))) | (((data) << (4)))));
                                }
                                else {
                                    runtime.writeIndex(runtime.writableMember("m_videoram"), ((dest) >>> (1)), ((((runtime.readIndex((members.m_videoram ?? runtime.member("m_videoram")), ((dest) >>> (1)))) & (240))) | (data)));
                                }
                            }
                            dest = ((dest) + (1));
                        }
                        dest = ((dest) + (240));
                    }
                }
            }
            function method_scramble_draw_background(runtime, bitmap, cliprect) {
                const members = runtime.members;
                (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) ?? 0));
                (runtime.overrides["scramble_draw_stars"] ? runtime.overrides["scramble_draw_stars"](bitmap, cliprect, 256) : method_scramble_draw_stars(runtime, bitmap, cliprect, 256));
            }
            function method_scramble_draw_stars(runtime, bitmap, cliprect, maxx) {
                const members = runtime.members;
                if ((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) {
                    for (let y = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
                        (runtime.overrides["stars_draw_row"] ? runtime.overrides["stars_draw_row"](bitmap, maxx, y, ((y) * (512))) : method_stars_draw_row(runtime, bitmap, maxx, y, ((y) * (512))));
                    }
                }
            }
            function method_stars_draw_row(runtime, bitmap, maxx, y, star_offs) {
                const members = runtime.members;
                let flipxor = (((((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (192) : (0))) & 0xff);
                star_offs = ((((star_offs) % (131071))) >>> 0);
                for (let x = 0; ((Number(x) < Number(maxx)) ? 1 : 0); x = ((x) + (1))) {
                    let h8q = ((((((~x)) >>> (3)) & 1)) & 0xff);
                    let enable_star = (((((((y) ^ (h8q))) >>> (0)) & 1)) ? 1 : 0);
                    let blink_state = (((((members.m_stars_blink_state ?? runtime.member("m_stars_blink_state"))) & (3))) & 0xff);
                    let enab = ((0) ? 1 : 0);
                    switch (blink_state) {
                        case 0:
                            {
                                enab = ((1) ? 1 : 0);
                                break;
                            }
                        case 1:
                            {
                                enab = (((((y) >>> (0)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 2:
                            {
                                enab = (((((y) >>> (1)) & 1)) ? 1 : 0);
                                break;
                            }
                        case 3:
                            {
                                enab = ((h8q) ? 1 : 0);
                                break;
                            }
                    }
                    enable_star = ((runtime.andAssign(enable_star, (((enab) && (((Number(((((x) & (192))) ^ (flipxor))) !== Number(192)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0);
                    let star = ((0) & 0xff);
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (() => { const previous = star_offs; star_offs = ((((star_offs) + (1))) >>> 0); return previous; })())) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, runtime.add(((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                    star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), (() => { const previous = star_offs; star_offs = ((((star_offs) + (1))) >>> 0); return previous; })())) & 0xff);
                    if (((Number(star_offs) >= Number(131071)) ? 1 : 0)) {
                        star_offs = ((0) >>> 0);
                    }
                    if ((((enable_star) && ((((star) >>> (7)) & 1))) ? 1 : 0)) {
                        bitmap["pix="](y, runtime.add(((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                        bitmap["pix="](y, runtime.add(((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                    }
                }
            }
            return {
                "blitter_w": method_blitter_w,
                "scramble_draw_background": method_scramble_draw_background,
                "scramble_draw_stars": method_scramble_draw_stars,
                "stars_draw_row": method_stars_draw_row
            };
        })();
        return {
            "tutankhm_state.scramble_draw_background": methods["scramble_draw_background"],
            "tutankhm_state.scramble_draw_stars": methods["scramble_draw_stars"],
            "tutankhm_state.stars_draw_row": methods["stars_draw_row"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
