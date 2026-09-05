// GENERATED executable machine composition from src/mame/konami/tutankhm.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'tutankhm');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_bankselect_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_mainbank.set_entry"] ? runtime.calls["m_mainbank.set_entry"](((data) & (15))) : (members.m_mainbank) != null ? ((runtime.dereference(members.m_mainbank)).set_entry?.(((data) & (15))) ?? 0) : (runtime.calls["set_entry"]?.(((data) & (15))) ?? 0));
            }
            function method_sound_on_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_timeplt_audio.sh_irqtrigger_w"] ? runtime.calls["m_timeplt_audio.sh_irqtrigger_w"](0) : (members.m_timeplt_audio) != null ? ((runtime.dereference(members.m_timeplt_audio)).sh_irqtrigger_w?.(0) ?? 0) : (runtime.calls["sh_irqtrigger_w"]?.(0) ?? 0));
                (runtime.calls["m_timeplt_audio.sh_irqtrigger_w"] ? runtime.calls["m_timeplt_audio.sh_irqtrigger_w"](1) : (members.m_timeplt_audio) != null ? ((runtime.dereference(members.m_timeplt_audio)).sh_irqtrigger_w?.(1) ?? 0) : (runtime.calls["sh_irqtrigger_w"]?.(1) ?? 0));
            }
            function method_irq_enable_w(runtime, state) {
                const members = runtime.members;
                members.m_irq_enable = ((state) & 0xff);
                if ((((members.m_irq_enable ?? runtime.member("m_irq_enable"))) ? 0 : 1)) {
                    (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 0) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 0) ?? 0) : (runtime.calls["set_input_line"]?.(0, 0) ?? 0));
                }
            }
            function method_stars_enable_w(runtime, data) {
                const members = runtime.members;
                if (((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) ^ (data))) >>> (0)) & 1)) {
                    (runtime.calls["m_screen.update_partial"] ? runtime.calls["m_screen.update_partial"]((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) : (members.m_screen) != null ? ((runtime.dereference(members.m_screen)).update_partial?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0) : (runtime.calls["update_partial"]?.((runtime.calls["m_screen.vpos"] ? runtime.calls["m_screen.vpos"]() : (members.m_screen) != null ? (typeof (runtime.dereference(members.m_screen)).vpos === 'function' ? (runtime.dereference(members.m_screen)).vpos() : typeof (runtime.dereference(members.m_screen)).vpos === 'number' || typeof (runtime.dereference(members.m_screen)).vpos === 'boolean' ? (runtime.dereference(members.m_screen)).vpos : runtime.container(members.m_screen, "vpos")) : (runtime.calls["vpos"]?.() ?? 0))) ?? 0));
                }
                members.m_stars_enabled = (((((data) >>> (0)) & 1)) & 0xff);
            }
            function method_flip_screen_x_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_x = ((state) & 0xff);
            }
            function method_flip_screen_y_w(runtime, state) {
                const members = runtime.members;
                members.m_flipscreen_y = ((state) & 0xff);
            }
            function method_screen_update(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                let mode = (((runtime.calls["m_stars_config.read_safe"] ? runtime.calls["m_stars_config.read_safe"]((members.m_star_mode ?? runtime.member("m_star_mode"))) : (members.m_stars_config) != null ? ((runtime.dereference(members.m_stars_config)).read_safe?.((members.m_star_mode ?? runtime.member("m_star_mode"))) ?? 0) : (runtime.calls["read_safe"]?.((members.m_star_mode ?? runtime.member("m_star_mode"))) ?? 0))) & 0xff);
                if (((Number(mode) !== Number((members.m_star_mode ?? runtime.member("m_star_mode")))) ? 1 : 0)) {
                    members.m_star_mode = ((mode) & 0xff);
                    (runtime.overrides["stars_init"] ? runtime.overrides["stars_init"]() : method_stars_init(runtime));
                }
                if ((members.m_star_mode ?? runtime.member("m_star_mode"))) {
                    return (runtime.overrides["screen_update_scramble"] ? runtime.overrides["screen_update_scramble"](screen, bitmap, cliprect) : method_screen_update_scramble(runtime, screen, bitmap, cliprect));
                }
                else {
                    return (runtime.overrides["screen_update_bootleg"] ? runtime.overrides["screen_update_bootleg"](screen, bitmap, cliprect) : method_screen_update_bootleg(runtime, screen, bitmap, cliprect));
                }
            }
            function method_stars_init(runtime) {
                const members = runtime.members;
                if ((members.m_star_mode ?? runtime.member("m_star_mode"))) {
                    (runtime.overrides["stars_init_scramble"] ? runtime.overrides["stars_init_scramble"]() : method_stars_init_scramble(runtime));
                }
                else {
                    (runtime.overrides["stars_init_bootleg"] ? runtime.overrides["stars_init_bootleg"]() : method_stars_init_bootleg(runtime));
                }
            }
            function method_stars_init_scramble(runtime) {
                const members = runtime.members;
                members.m_stars = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](131071) : new Uint8Array(Math.max(0, Number(131071))));
                let shiftreg = ((0) >>> 0);
                for (let i = 0; ((Number(i) < Number(131071)) ? 1 : 0); i = ((i) + (1))) {
                    let shift = ((12) & 0xff);
                    let enabled = ((Number(((shiftreg) & (130561))) === Number(130560)) ? 1 : 0);
                    let color = (((((~shiftreg)) & (504))) >>> (3));
                    runtime.writeIndex(runtime.writableMember("m_stars"), i, ((color) | (((enabled) << (7)))));
                    shiftreg = ((((((shiftreg) >>> (1))) | (((((((((shiftreg) >>> (shift))) ^ ((~shiftreg)))) & (1))) << (16))))) >>> 0);
                }
            }
            function method_stars_init_bootleg(runtime) {
                const members = runtime.members;
                members.m_stars_enabled = ((0) & 0xff);
                members.m_stars_blink_state = ((0) & 0xff);
                members.m_stars = (runtime.overrides["ALLOC"] ? runtime.overrides["ALLOC"](131071) : new Uint8Array(Math.max(0, Number(131071))));
                let shiftreg = ((0) >>> 0);
                for (let i = 0; ((Number(i) < Number(131071)) ? 1 : 0); i = ((i) + (1))) {
                    let newbit = ((((((shiftreg) >>> (12))) ^ ((~shiftreg)))) & (1));
                    let enabled = (((((Number(((shiftreg) & (130560))) === Number(130560)) ? 1 : 0)) && (((Number(newbit) === Number(0)) ? 1 : 0))) ? 1 : 0);
                    let color = (((((~shiftreg)) & (504))) >>> (3));
                    runtime.writeIndex(runtime.writableMember("m_stars"), i, ((color) | (((enabled) << (7)))));
                    shiftreg = ((((((shiftreg) >>> (1))) | (((newbit) << (16))))) >>> 0);
                }
            }
            function method_screen_update_scramble(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                (runtime.overrides["scramble_draw_background"] ? runtime.overrides["scramble_draw_background"](bitmap, cliprect) : method_scramble_draw_background(runtime, bitmap, cliprect));
                let xorx = (((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (255) : (0));
                let xory = (((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (255) : (0));
                for (let y = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
                    let dst = bitmap["pix&"](y);
                    for (let x = runtime.divide(cliprect.min_x, 3); ((Number(x) <= Number(runtime.divide(cliprect.max_x, 3))) ? 1 : 0); x = ((x) + (1))) {
                        let effx = ((((x) ^ (xorx))) & 0xff);
                        let yscroll = (((((((((Number(effx) < Number(192)) ? 1 : 0)) && ((runtime.calls["m_scroll.found"] ? runtime.calls["m_scroll.found"]() : (members.m_scroll) != null ? (typeof (runtime.dereference(members.m_scroll)).found === 'function' ? (runtime.dereference(members.m_scroll)).found() : typeof (runtime.dereference(members.m_scroll)).found === 'number' || typeof (runtime.dereference(members.m_scroll)).found === 'boolean' ? (runtime.dereference(members.m_scroll)).found : runtime.container(members.m_scroll, "found")) : (runtime.calls["found"]?.() ?? 0)))) ? 1 : 0)) ? (runtime.dereference(h_m_scroll)) : (0))) & 0xff);
                        let effy = ((((((y) ^ (xory))) + (yscroll))) & 0xff);
                        let vrambyte = ((runtime.readIndex(h_m_videoram, runtime.add(((effy) * (128)), runtime.divide(effx, 2)))) & 0xff);
                        let shifted = ((((vrambyte) >>> (((4) * (((effx) & (1))))))) & 0xff);
                        let color = (runtime.calls["m_palette.pen_color"] ? runtime.calls["m_palette.pen_color"](((shifted) & (15))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).pen_color?.(((shifted) & (15))) ?? 0) : (runtime.calls["pen_color"]?.(((shifted) & (15))) ?? 0));
                        let dbase = runtime.addressOf(dst, ((x) * (3)));
                        if ((((shifted) || (((Number(runtime.readIndex(dbase, 0)) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.writeIndex(dbase, 0, color);
                        }
                        if ((((shifted) || (((Number(runtime.readIndex(dbase, 1)) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.writeIndex(dbase, 1, color);
                        }
                        if ((((shifted) || (((Number(runtime.readIndex(dbase, 2)) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.writeIndex(dbase, 2, color);
                        }
                    }
                }
                return 0;
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
            function method_screen_update_bootleg(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const h_m_scroll = members.m_scroll ?? runtime.member("m_scroll");
                const h_m_videoram = members.m_videoram ?? runtime.member("m_videoram");
                (runtime.calls["bitmap.fill"] ? runtime.calls["bitmap.fill"]((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) : (bitmap) != null ? ((runtime.dereference(bitmap)).fill?.((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) ?? 0) : (runtime.calls["fill"]?.((runtime.calls["rgb_t::black"] ? runtime.calls["rgb_t::black"]() : runtime.macro("rgb_t::black")), cliprect) ?? 0));
                let xorx = (((members.m_flipscreen_x ?? runtime.member("m_flipscreen_x"))) ? (255) : (0));
                let xory = (((members.m_flipscreen_y ?? runtime.member("m_flipscreen_y"))) ? (255) : (0));
                for (let y = cliprect.min_y; ((Number(y) <= Number(cliprect.max_y)) ? 1 : 0); y = ((y) + (1))) {
                    let dst = bitmap["pix&"](y);
                    for (let x = runtime.divide(cliprect.min_x, 3); ((Number(x) <= Number(runtime.divide(cliprect.max_x, 3))) ? 1 : 0); x = ((x) + (1))) {
                        let effx = ((((x) ^ (xorx))) & 0xff);
                        let yscroll = (((((((((Number(effx) < Number(192)) ? 1 : 0)) && ((runtime.calls["m_scroll.found"] ? runtime.calls["m_scroll.found"]() : (members.m_scroll) != null ? (typeof (runtime.dereference(members.m_scroll)).found === 'function' ? (runtime.dereference(members.m_scroll)).found() : typeof (runtime.dereference(members.m_scroll)).found === 'number' || typeof (runtime.dereference(members.m_scroll)).found === 'boolean' ? (runtime.dereference(members.m_scroll)).found : runtime.container(members.m_scroll, "found")) : (runtime.calls["found"]?.() ?? 0)))) ? 1 : 0)) ? (runtime.dereference(h_m_scroll)) : (0))) & 0xff);
                        let effy = ((((((y) ^ (xory))) + (yscroll))) & 0xff);
                        let vrambyte = ((runtime.readIndex(h_m_videoram, runtime.add(((effy) * (128)), runtime.divide(effx, 2)))) & 0xff);
                        let shifted = ((((vrambyte) >>> (((4) * (((effx) & (1))))))) & 0xff);
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
                                    enab = ((((((~x)) >>> (3)) & 1)) ? 1 : 0);
                                    break;
                                }
                        }
                        let offset = runtime.add(((((y) * (384))) + (x)), 84);
                        let star = ((runtime.readIndex((members.m_stars ?? runtime.member("m_stars")), ((offset) % (131071)))) & 0xff);
                        if ((((((((((((((members.m_stars_enabled ?? runtime.member("m_stars_enabled"))) && (enab)) ? 1 : 0)) && (((((~shifted)) >>> (1)) & 1))) ? 1 : 0)) && ((((star) >>> (7)) & 1))) ? 1 : 0)) && (((Number(x) > Number(63)) ? 1 : 0))) ? 1 : 0)) {
                            bitmap["pix="](y, runtime.add(((3) * (x)), 0), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                            bitmap["pix="](y, runtime.add(((3) * (x)), 1), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                            bitmap["pix="](y, runtime.add(((3) * (x)), 2), runtime.readIndex((members.m_star_color ?? runtime.member("m_star_color")), ((star) & (63))));
                        }
                        else {
                            let color = (runtime.calls["m_palette.pen_color"] ? runtime.calls["m_palette.pen_color"](((shifted) & (15))) : (members.m_palette) != null ? ((runtime.dereference(members.m_palette)).pen_color?.(((shifted) & (15))) ?? 0) : (runtime.calls["pen_color"]?.(((shifted) & (15))) ?? 0));
                            let dbase = runtime.addressOf(dst, ((x) * (3)));
                            if ((((shifted) || (((Number(runtime.readIndex(dbase, 0)) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dbase, 0, color);
                            }
                            if ((((shifted) || (((Number(runtime.readIndex(dbase, 1)) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dbase, 1, color);
                            }
                            if ((((shifted) || (((Number(runtime.readIndex(dbase, 2)) === Number(4278190080)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(dbase, 2, color);
                            }
                        }
                    }
                }
                return 0;
            }
            function method_vblank_irq(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_irq_toggle = ((((members.m_irq_toggle) ^ (1))) & 0xff);
                    if (((((members.m_irq_toggle ?? runtime.member("m_irq_toggle"))) && ((members.m_irq_enable ?? runtime.member("m_irq_enable")))) ? 1 : 0)) {
                        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](0, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(0, 1) ?? 0) : (runtime.calls["set_input_line"]?.(0, 1) ?? 0));
                    }
                }
            }
            return {
                "bankselect_w": method_bankselect_w,
                "sound_on_w": method_sound_on_w,
                "irq_enable_w": method_irq_enable_w,
                "stars_enable_w": method_stars_enable_w,
                "flip_screen_x_w": method_flip_screen_x_w,
                "flip_screen_y_w": method_flip_screen_y_w,
                "screen_update": method_screen_update,
                "stars_init": method_stars_init,
                "stars_init_scramble": method_stars_init_scramble,
                "stars_init_bootleg": method_stars_init_bootleg,
                "screen_update_scramble": method_screen_update_scramble,
                "scramble_draw_background": method_scramble_draw_background,
                "scramble_draw_stars": method_scramble_draw_stars,
                "stars_draw_row": method_stars_draw_row,
                "screen_update_bootleg": method_screen_update_bootleg,
                "vblank_irq": method_vblank_irq
            };
        })();
        return {
            "tutankhm_state.bankselect_w": methods["bankselect_w"],
            "tutankhm_state.sound_on_w": methods["sound_on_w"],
            "tutankhm_state.irq_enable_w": methods["irq_enable_w"],
            "tutankhm_state.stars_enable_w": methods["stars_enable_w"],
            "tutankhm_state.flip_screen_x_w": methods["flip_screen_x_w"],
            "tutankhm_state.flip_screen_y_w": methods["flip_screen_y_w"],
            "tutankhm_state.screen_update": methods["screen_update"],
            "tutankhm_state.stars_init": methods["stars_init"],
            "tutankhm_state.stars_init_scramble": methods["stars_init_scramble"],
            "tutankhm_state.stars_init_bootleg": methods["stars_init_bootleg"],
            "tutankhm_state.screen_update_scramble": methods["screen_update_scramble"],
            "tutankhm_state.scramble_draw_background": methods["scramble_draw_background"],
            "tutankhm_state.scramble_draw_stars": methods["scramble_draw_stars"],
            "tutankhm_state.stars_draw_row": methods["stars_draw_row"],
            "tutankhm_state.screen_update_bootleg": methods["screen_update_bootleg"],
            "tutankhm_state.vblank_irq": methods["vblank_irq"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
