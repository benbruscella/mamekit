// GENERATED executable machine composition from src/mame/nintendo/gb.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'gameboy');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_gb_io_r(runtime, offset) {
                const members = runtime.members;
                switch (offset) {
                    case 4:
                        {
                            0;
                            return (((((members.m_divcount ?? runtime.member("m_divcount"))) >>> (8))) & (255));
                        }
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                        {
                            return runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), offset);
                        }
                    case 15:
                        {
                            (runtime.calls["m_ppu.update_state"] ? runtime.calls["m_ppu.update_state"]() : (members.m_ppu) != null ? (typeof (runtime.dereference(members.m_ppu)).update_state === 'function' ? (runtime.dereference(members.m_ppu)).update_state() : typeof (runtime.dereference(members.m_ppu)).update_state === 'number' || typeof (runtime.dereference(members.m_ppu)).update_state === 'boolean' ? (runtime.dereference(members.m_ppu)).update_state : runtime.container(members.m_ppu, "update_state")) : (runtime.calls["update_state"]?.() ?? 0));
                            0;
                            0;
                            return ((224) | ((runtime.calls["m_maincpu.get_if"] ? runtime.calls["m_maincpu.get_if"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).get_if === 'function' ? (runtime.dereference(members.m_maincpu)).get_if() : typeof (runtime.dereference(members.m_maincpu)).get_if === 'number' || typeof (runtime.dereference(members.m_maincpu)).get_if === 'boolean' ? (runtime.dereference(members.m_maincpu)).get_if : runtime.container(members.m_maincpu, "get_if")) : (runtime.calls["get_if"]?.() ?? 0))));
                        }
                    default:
                        {
                            return 255;
                        }
                }
            }
            function method_gb_io_w(runtime, offset, data) {
                const members = runtime.members;
                switch (offset) {
                    case 0:
                        {
                            runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((207) | (data)));
                            if (((((data) & (32))) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & ((((((runtime.calls["m_inputs.read"] ? runtime.calls["m_inputs.read"]() : (members.m_inputs) != null ? (typeof (runtime.dereference(members.m_inputs)).read === 'function' ? (runtime.dereference(members.m_inputs)).read() : typeof (runtime.dereference(members.m_inputs)).read === 'number' || typeof (runtime.dereference(members.m_inputs)).read === 'boolean' ? (runtime.dereference(members.m_inputs)).read : runtime.container(members.m_inputs, "read")) : (runtime.calls["read"]?.() ?? 0))) >>> (4))) | (240)))));
                            }
                            if (((((data) & (16))) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & ((((runtime.calls["m_inputs.read"] ? runtime.calls["m_inputs.read"]() : (members.m_inputs) != null ? (typeof (runtime.dereference(members.m_inputs)).read === 'function' ? (runtime.dereference(members.m_inputs)).read() : typeof (runtime.dereference(members.m_inputs)).read === 'number' || typeof (runtime.dereference(members.m_inputs)).read === 'boolean' ? (runtime.dereference(members.m_inputs)).read : runtime.container(members.m_inputs, "read")) : (runtime.calls["read"]?.() ?? 0))) | (240)))));
                            }
                            return;
                        }
                    case 1:
                        {
                            break;
                        }
                    case 2:
                        {
                            switch (((data) & (129))) {
                                case 0:
                                case 1:
                                    {
                                        members.m_sio_count = ((0) >>> 0);
                                        break;
                                    }
                                case 128:
                                    {
                                        members.m_sio_count = ((16) >>> 0);
                                        break;
                                    }
                                case 129:
                                    {
                                        members.m_sio_count = ((16) >>> 0);
                                        break;
                                    }
                            }
                            0;
                            data = ((((data) | (126))) & 0xff);
                            break;
                        }
                    case 3:
                        {
                            return;
                        }
                    case 4:
                        {
                            if ((((((members.m_divcount ?? runtime.member("m_divcount"))) >>> ((((members.m_shift ?? runtime.member("m_shift"))) - (1))))) & (1))) {
                                (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
                            }
                            0;
                            members.m_divcount = ((0) & 0xffff);
                            return;
                        }
                    case 5:
                        {
                            if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
                                data = ((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6)) & 0xff);
                            }
                            break;
                        }
                    case 6:
                        {
                            if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, data);
                            }
                            break;
                        }
                    case 7:
                        {
                            data = ((((data) | (248))) & 0xff);
                            if (((((((((((data) & (4))) ? 0 : 1)) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) || (((((((((data) & (4))) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) && (((Number(((data) & (3))) !== Number(((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (3)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                if (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) >= Number((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) >>> (1)))) ? 1 : 0)) {
                                    (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
                                }
                            }
                            members.m_shift = ((([10, 4, 6, 8][(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                            members.m_shift_cycles = ((((1) << ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
                            break;
                        }
                    case 15:
                        {
                            (runtime.calls["m_ppu.update_state"] ? runtime.calls["m_ppu.update_state"]() : (members.m_ppu) != null ? (typeof (runtime.dereference(members.m_ppu)).update_state === 'function' ? (runtime.dereference(members.m_ppu)).update_state() : typeof (runtime.dereference(members.m_ppu)).update_state === 'number' || typeof (runtime.dereference(members.m_ppu)).update_state === 'boolean' ? (runtime.dereference(members.m_ppu)).update_state : runtime.container(members.m_ppu, "update_state")) : (runtime.calls["update_state"]?.() ?? 0));
                            0;
                            data = ((runtime.andAssign(data, 31)) & 0xff);
                            (runtime.calls["m_maincpu.set_if"] ? runtime.calls["m_maincpu.set_if"](data) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_if?.(data) ?? 0) : (runtime.calls["set_if"]?.(data) ?? 0));
                            break;
                        }
                }
                runtime.writeIndex(runtime.writableMember("m_gb_io"), offset, data);
            }
            function method_gb_timer_increment(runtime) {
                const members = runtime.members;
                (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
                0;
                runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 5)) + (1)));
                if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
                    members.m_triggering_irq = ((1) & 0xff);
                }
            }
            function method_gb_timer_check_irq(runtime) {
                const members = runtime.members;
                members.m_reloading = ((0) & 0xff);
                if ((members.m_triggering_irq ?? runtime.member("m_triggering_irq"))) {
                    members.m_triggering_irq = ((0) & 0xff);
                    if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6));
                        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](2, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(2, 1) ?? 0) : (runtime.calls["set_input_line"]?.(2, 1) ?? 0));
                        (runtime.calls["m_maincpu.execute_set_input"] ? runtime.calls["m_maincpu.execute_set_input"](2, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).execute_set_input?.(2, 1) ?? 0) : (runtime.calls["execute_set_input"]?.(2, 1) ?? 0));
                        members.m_reloading = ((1) & 0xff);
                    }
                }
            }
            function method_gb_io2_w(runtime, offset, data) {
                const members = runtime.members;
                if (((Number(offset) === Number(16)) ? 1 : 0)) {
                    (runtime.overrides["disable_boot"] ? runtime.overrides["disable_boot"]() : method_disable_boot(runtime));
                }
                else {
                    (runtime.calls["m_ppu.video_w"] ? runtime.calls["m_ppu.video_w"](offset, data) : (members.m_ppu) != null ? ((runtime.dereference(members.m_ppu)).video_w?.(offset, data) ?? 0) : (runtime.calls["video_w"]?.(offset, data) ?? 0));
                }
            }
            function method_disable_boot(runtime) {
                const members = runtime.members;
                (runtime.calls["m_boot_view.disable"] ? runtime.calls["m_boot_view.disable"]() : (members.m_boot_view) != null ? (typeof (runtime.dereference(members.m_boot_view)).disable === 'function' ? (runtime.dereference(members.m_boot_view)).disable() : typeof (runtime.dereference(members.m_boot_view)).disable === 'number' || typeof (runtime.dereference(members.m_boot_view)).disable === 'boolean' ? (runtime.dereference(members.m_boot_view)).disable : runtime.container(members.m_boot_view, "disable")) : (runtime.calls["disable"]?.() ?? 0));
            }
            function method_gb_ie_r(runtime) {
                const members = runtime.members;
                return (runtime.calls["m_maincpu.get_ie"] ? runtime.calls["m_maincpu.get_ie"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).get_ie === 'function' ? (runtime.dereference(members.m_maincpu)).get_ie() : typeof (runtime.dereference(members.m_maincpu)).get_ie === 'number' || typeof (runtime.dereference(members.m_maincpu)).get_ie === 'boolean' ? (runtime.dereference(members.m_maincpu)).get_ie : runtime.container(members.m_maincpu, "get_ie")) : (runtime.calls["get_ie"]?.() ?? 0));
            }
            function method_gb_ie_w(runtime, data) {
                const members = runtime.members;
                (runtime.calls["m_maincpu.set_ie"] ? runtime.calls["m_maincpu.set_ie"](data) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_ie?.(data) ?? 0) : (runtime.calls["set_ie"]?.(data) ?? 0));
            }
            function method_boot_r(runtime, offset) {
                const members = runtime.members;
                const h_m_region_boot = members.m_region_boot ?? runtime.member("m_region_boot");
                if ((runtime.calls["m_bios_hack.read"] ? runtime.calls["m_bios_hack.read"]() : (members.m_bios_hack) != null ? (typeof (runtime.dereference(members.m_bios_hack)).read === 'function' ? (runtime.dereference(members.m_bios_hack)).read() : typeof (runtime.dereference(members.m_bios_hack)).read === 'number' || typeof (runtime.dereference(members.m_bios_hack)).read === 'boolean' ? (runtime.dereference(members.m_bios_hack)).read : runtime.container(members.m_bios_hack, "read")) : (runtime.calls["read"]?.() ?? 0))) {
                    if ((((((Number(offset) === Number(233)) ? 1 : 0)) || (((Number(offset) === Number(234)) ? 1 : 0))) ? 1 : 0)) {
                        return 0;
                    }
                    if ((((((Number(offset) === Number(250)) ? 1 : 0)) || (((Number(offset) === Number(251)) ? 1 : 0))) ? 1 : 0)) {
                        return 0;
                    }
                }
                return runtime.readIndex(h_m_region_boot, offset);
            }
            function method_gb_timer_callback(runtime, data) {
                const members = runtime.members;
                const h_m_internal_serial_frequency = members.m_internal_serial_frequency ?? runtime.member("m_internal_serial_frequency");
                let old_gb_divcount = (((members.m_divcount ?? runtime.member("m_divcount"))) & 0xffff);
                let old_internal_serial_clock = (((members.m_internal_serial_clock ?? runtime.member("m_internal_serial_clock"))) & 0xffff);
                members.m_divcount = ((((members.m_divcount) + (data))) & 0xffff);
                members.m_internal_serial_clock = ((((members.m_internal_serial_clock) + (data))) & 0xffff);
                if (((Number(((old_gb_divcount) >>> (8))) !== Number((((members.m_divcount ?? runtime.member("m_divcount"))) >>> (8)))) ? 1 : 0)) {
                }
                (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
                if (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) {
                    let old_count = ((((old_gb_divcount) >>> ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
                    let new_count = (((((members.m_divcount ?? runtime.member("m_divcount"))) >>> ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
                    if (((Number(data) > Number((members.m_shift_cycles ?? runtime.member("m_shift_cycles")))) ? 1 : 0)) {
                        (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
                        old_count = ((((old_count) + (1))) & 0xffff);
                    }
                    if (((Number(new_count) !== Number(old_count)) ? 1 : 0)) {
                        (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
                        if (((Number(((new_count) << ((members.m_shift ?? runtime.member("m_shift"))))) < Number((members.m_divcount ?? runtime.member("m_divcount")))) ? 1 : 0)) {
                            (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
                        }
                    }
                }
                if (((((((((members.m_internal_serial_clock ?? runtime.member("m_internal_serial_clock"))) ^ (old_internal_serial_clock))) & (h_m_internal_serial_frequency))) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 2)) & (1)))) ? 1 : 0)) {
                    (runtime.overrides["gb_serial_timer_tick"] ? runtime.overrides["gb_serial_timer_tick"]() : method_gb_serial_timer_tick(runtime));
                }
            }
            function method_gb_serial_timer_tick(runtime) {
                const members = runtime.members;
                if (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 2)) & (128))) {
                    if ((((members.m_sio_count ?? runtime.member("m_sio_count"))) & (1))) {
                        runtime.writeIndex(runtime.writableMember("m_gb_io"), 1, ((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 1)) << (1))) | (1)));
                    }
                    members.m_sio_count = ((((members.m_sio_count) - (1))) >>> 0);
                    0;
                    if (((Number((members.m_sio_count ?? runtime.member("m_sio_count"))) === Number(0)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_gb_io"), 2, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 2)) & ((~128))));
                        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](3, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(3, 1) ?? 0) : (runtime.calls["set_input_line"]?.(3, 1) ?? 0));
                        (runtime.calls["m_maincpu.execute_set_input"] ? runtime.calls["m_maincpu.execute_set_input"](3, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).execute_set_input?.(3, 1) ?? 0) : (runtime.calls["execute_set_input"]?.(3, 1) ?? 0));
                    }
                }
            }
            function method_gb_palette(runtime, palette) {
                const members = runtime.members;
                for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                    (runtime.calls["palette.set_pen_color"] ? runtime.calls["palette.set_pen_color"](i, ([4287101951, 4283346609, 4283334788, 4283321934, 4288794564, 4285371787, 4283659115, 4282466625][(((i) % 8) + 8) % 8] ?? 0)) : (palette) != null ? ((runtime.dereference(palette)).set_pen_color?.(i, ([4287101951, 4283346609, 4283334788, 4283321934, 4288794564, 4285371787, 4283659115, 4282466625][(((i) % 8) + 8) % 8] ?? 0)) ?? 0) : (runtime.calls["set_pen_color"]?.(i, ([4287101951, 4283346609, 4283334788, 4283321934, 4288794564, 4285371787, 4283659115, 4282466625][(((i) % 8) + 8) % 8] ?? 0)) ?? 0));
                }
            }
            return {
                "gb_io_r": method_gb_io_r,
                "gb_io_w": method_gb_io_w,
                "gb_timer_increment": method_gb_timer_increment,
                "gb_timer_check_irq": method_gb_timer_check_irq,
                "gb_io2_w": method_gb_io2_w,
                "disable_boot": method_disable_boot,
                "gb_ie_r": method_gb_ie_r,
                "gb_ie_w": method_gb_ie_w,
                "boot_r": method_boot_r,
                "gb_timer_callback": method_gb_timer_callback,
                "gb_serial_timer_tick": method_gb_serial_timer_tick,
                "gb_palette": method_gb_palette
            };
        })();
        return {
            "gb_state.gb_io_r": methods["gb_io_r"],
            "gb_state.gb_io_w": methods["gb_io_w"],
            "gb_state.gb_io2_w": methods["gb_io2_w"],
            "gb_state.disable_boot": methods["disable_boot"],
            "gb_state.gb_ie_r": methods["gb_ie_r"],
            "gb_state.gb_ie_w": methods["gb_ie_w"],
            "gb_state.boot_r": methods["boot_r"],
            "gb_state.gb_timer_callback": methods["gb_timer_callback"],
            "gb_state.gb_palette": methods["gb_palette"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_gb_io_r(runtime, offset) {
                const members = runtime.members;
                switch (offset) {
                    case 4:
                        {
                            0;
                            return (((((members.m_divcount ?? runtime.member("m_divcount"))) >>> (8))) & (255));
                        }
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 5:
                    case 6:
                    case 7:
                        {
                            return runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), offset);
                        }
                    case 15:
                        {
                            (runtime.calls["m_ppu.update_state"] ? runtime.calls["m_ppu.update_state"]() : (members.m_ppu) != null ? (typeof (runtime.dereference(members.m_ppu)).update_state === 'function' ? (runtime.dereference(members.m_ppu)).update_state() : typeof (runtime.dereference(members.m_ppu)).update_state === 'number' || typeof (runtime.dereference(members.m_ppu)).update_state === 'boolean' ? (runtime.dereference(members.m_ppu)).update_state : runtime.container(members.m_ppu, "update_state")) : (runtime.calls["update_state"]?.() ?? 0));
                            0;
                            0;
                            return ((224) | ((runtime.calls["m_maincpu.get_if"] ? runtime.calls["m_maincpu.get_if"]() : (members.m_maincpu) != null ? (typeof (runtime.dereference(members.m_maincpu)).get_if === 'function' ? (runtime.dereference(members.m_maincpu)).get_if() : typeof (runtime.dereference(members.m_maincpu)).get_if === 'number' || typeof (runtime.dereference(members.m_maincpu)).get_if === 'boolean' ? (runtime.dereference(members.m_maincpu)).get_if : runtime.container(members.m_maincpu, "get_if")) : (runtime.calls["get_if"]?.() ?? 0))));
                        }
                    default:
                        {
                            return 255;
                        }
                }
            }
            function method_gb_io_w(runtime, offset, data) {
                const members = runtime.members;
                switch (offset) {
                    case 0:
                        {
                            runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((207) | (data)));
                            if (((((data) & (32))) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & ((((((runtime.calls["m_inputs.read"] ? runtime.calls["m_inputs.read"]() : (members.m_inputs) != null ? (typeof (runtime.dereference(members.m_inputs)).read === 'function' ? (runtime.dereference(members.m_inputs)).read() : typeof (runtime.dereference(members.m_inputs)).read === 'number' || typeof (runtime.dereference(members.m_inputs)).read === 'boolean' ? (runtime.dereference(members.m_inputs)).read : runtime.container(members.m_inputs, "read")) : (runtime.calls["read"]?.() ?? 0))) >>> (4))) | (240)))));
                            }
                            if (((((data) & (16))) ? 0 : 1)) {
                                runtime.writeIndex(runtime.writableMember("m_gb_io"), 0, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 0)) & ((((runtime.calls["m_inputs.read"] ? runtime.calls["m_inputs.read"]() : (members.m_inputs) != null ? (typeof (runtime.dereference(members.m_inputs)).read === 'function' ? (runtime.dereference(members.m_inputs)).read() : typeof (runtime.dereference(members.m_inputs)).read === 'number' || typeof (runtime.dereference(members.m_inputs)).read === 'boolean' ? (runtime.dereference(members.m_inputs)).read : runtime.container(members.m_inputs, "read")) : (runtime.calls["read"]?.() ?? 0))) | (240)))));
                            }
                            return;
                        }
                    case 1:
                        {
                            break;
                        }
                    case 2:
                        {
                            switch (((data) & (129))) {
                                case 0:
                                case 1:
                                    {
                                        members.m_sio_count = ((0) >>> 0);
                                        break;
                                    }
                                case 128:
                                    {
                                        members.m_sio_count = ((16) >>> 0);
                                        break;
                                    }
                                case 129:
                                    {
                                        members.m_sio_count = ((16) >>> 0);
                                        break;
                                    }
                            }
                            0;
                            data = ((((data) | (126))) & 0xff);
                            break;
                        }
                    case 3:
                        {
                            return;
                        }
                    case 4:
                        {
                            if ((((((members.m_divcount ?? runtime.member("m_divcount"))) >>> ((((members.m_shift ?? runtime.member("m_shift"))) - (1))))) & (1))) {
                                (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
                            }
                            0;
                            members.m_divcount = ((0) & 0xffff);
                            return;
                        }
                    case 5:
                        {
                            if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
                                data = ((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6)) & 0xff);
                            }
                            break;
                        }
                    case 6:
                        {
                            if (((((((((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4))) && (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6))) ? 1 : 0))) ? 1 : 0)) && (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) === Number(4)) ? 1 : 0))) ? 1 : 0)) {
                                runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, data);
                            }
                            break;
                        }
                    case 7:
                        {
                            data = ((((data) | (248))) & 0xff);
                            if (((((((((((data) & (4))) ? 0 : 1)) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) || (((((((((data) & (4))) && (((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (4)))) ? 1 : 0)) && (((Number(((data) & (3))) !== Number(((runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 7)) & (3)))) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                if (((Number((((members.m_divcount ?? runtime.member("m_divcount"))) & ((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) - (1))))) >= Number((((members.m_shift_cycles ?? runtime.member("m_shift_cycles"))) >>> (1)))) ? 1 : 0)) {
                                    (runtime.overrides["gb_timer_increment"] ? runtime.overrides["gb_timer_increment"]() : method_gb_timer_increment(runtime));
                                }
                            }
                            members.m_shift = ((([10, 4, 6, 8][(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                            members.m_shift_cycles = ((((1) << ((members.m_shift ?? runtime.member("m_shift"))))) & 0xffff);
                            break;
                        }
                    case 15:
                        {
                            (runtime.calls["m_ppu.update_state"] ? runtime.calls["m_ppu.update_state"]() : (members.m_ppu) != null ? (typeof (runtime.dereference(members.m_ppu)).update_state === 'function' ? (runtime.dereference(members.m_ppu)).update_state() : typeof (runtime.dereference(members.m_ppu)).update_state === 'number' || typeof (runtime.dereference(members.m_ppu)).update_state === 'boolean' ? (runtime.dereference(members.m_ppu)).update_state : runtime.container(members.m_ppu, "update_state")) : (runtime.calls["update_state"]?.() ?? 0));
                            0;
                            data = ((runtime.andAssign(data, 31)) & 0xff);
                            (runtime.calls["m_maincpu.set_if"] ? runtime.calls["m_maincpu.set_if"](data) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_if?.(data) ?? 0) : (runtime.calls["set_if"]?.(data) ?? 0));
                            break;
                        }
                }
                runtime.writeIndex(runtime.writableMember("m_gb_io"), offset, data);
            }
            function method_gb_timer_increment(runtime) {
                const members = runtime.members;
                (runtime.overrides["gb_timer_check_irq"] ? runtime.overrides["gb_timer_check_irq"]() : method_gb_timer_check_irq(runtime));
                0;
                runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, ((runtime.readIndex(runtime.writableMember("m_gb_io"), 5)) + (1)));
                if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
                    members.m_triggering_irq = ((1) & 0xff);
                }
            }
            function method_gb_timer_check_irq(runtime) {
                const members = runtime.members;
                members.m_reloading = ((0) & 0xff);
                if ((members.m_triggering_irq ?? runtime.member("m_triggering_irq"))) {
                    members.m_triggering_irq = ((0) & 0xff);
                    if (((Number(runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 5)) === Number(0)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_gb_io"), 5, runtime.readIndex((members.m_gb_io ?? runtime.member("m_gb_io")), 6));
                        (runtime.calls["m_maincpu.set_input_line"] ? runtime.calls["m_maincpu.set_input_line"](2, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).set_input_line?.(2, 1) ?? 0) : (runtime.calls["set_input_line"]?.(2, 1) ?? 0));
                        (runtime.calls["m_maincpu.execute_set_input"] ? runtime.calls["m_maincpu.execute_set_input"](2, 1) : (members.m_maincpu) != null ? ((runtime.dereference(members.m_maincpu)).execute_set_input?.(2, 1) ?? 0) : (runtime.calls["execute_set_input"]?.(2, 1) ?? 0));
                        members.m_reloading = ((1) & 0xff);
                    }
                }
            }
            function method_gb_io2_w(runtime, offset, data) {
                const members = runtime.members;
                if (((Number(offset) === Number(16)) ? 1 : 0)) {
                    (runtime.overrides["disable_boot"] ? runtime.overrides["disable_boot"]() : method_disable_boot(runtime));
                }
                else {
                    (runtime.calls["m_ppu.video_w"] ? runtime.calls["m_ppu.video_w"](offset, data) : (members.m_ppu) != null ? ((runtime.dereference(members.m_ppu)).video_w?.(offset, data) ?? 0) : (runtime.calls["video_w"]?.(offset, data) ?? 0));
                }
            }
            function method_disable_boot(runtime) {
                const members = runtime.members;
                (runtime.calls["m_boot_view.disable"] ? runtime.calls["m_boot_view.disable"]() : (members.m_boot_view) != null ? (typeof (runtime.dereference(members.m_boot_view)).disable === 'function' ? (runtime.dereference(members.m_boot_view)).disable() : typeof (runtime.dereference(members.m_boot_view)).disable === 'number' || typeof (runtime.dereference(members.m_boot_view)).disable === 'boolean' ? (runtime.dereference(members.m_boot_view)).disable : runtime.container(members.m_boot_view, "disable")) : (runtime.calls["disable"]?.() ?? 0));
            }
            function method_boot_r(runtime, offset) {
                const members = runtime.members;
                const h_m_region_boot = members.m_region_boot ?? runtime.member("m_region_boot");
                if ((runtime.calls["m_bios_hack.read"] ? runtime.calls["m_bios_hack.read"]() : (members.m_bios_hack) != null ? (typeof (runtime.dereference(members.m_bios_hack)).read === 'function' ? (runtime.dereference(members.m_bios_hack)).read() : typeof (runtime.dereference(members.m_bios_hack)).read === 'number' || typeof (runtime.dereference(members.m_bios_hack)).read === 'boolean' ? (runtime.dereference(members.m_bios_hack)).read : runtime.container(members.m_bios_hack, "read")) : (runtime.calls["read"]?.() ?? 0))) {
                    if ((((((Number(offset) === Number(233)) ? 1 : 0)) || (((Number(offset) === Number(234)) ? 1 : 0))) ? 1 : 0)) {
                        return 0;
                    }
                    if ((((((Number(offset) === Number(250)) ? 1 : 0)) || (((Number(offset) === Number(251)) ? 1 : 0))) ? 1 : 0)) {
                        return 0;
                    }
                }
                return runtime.readIndex(h_m_region_boot, offset);
            }
            return {
                "gb_io_r": method_gb_io_r,
                "gb_io_w": method_gb_io_w,
                "gb_timer_increment": method_gb_timer_increment,
                "gb_timer_check_irq": method_gb_timer_check_irq,
                "gb_io2_w": method_gb_io2_w,
                "disable_boot": method_disable_boot,
                "boot_r": method_boot_r
            };
        })();
        return {
            "base_state.gb_timer_increment": methods["gb_timer_increment"],
            "base_state.gb_timer_check_irq": methods["gb_timer_check_irq"],
        };
    })(),
};
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
