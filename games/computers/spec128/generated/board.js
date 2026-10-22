// GENERATED executable machine composition from src/mame/sinclair/spec128.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'spec128');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_spectrum_ula_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_exp = members.m_exp ?? runtime.member("m_exp");
                (__l["m_ula.ula_r"] ?? runtime.memberCall(members.m_ula, "ula_r", 0, undefined))(offset);
                let lines = ((runtime.shiftRight(offset, 8)) | 0);
                let data = ((255) | 0);
                let cs_extra1 = (((((__l["m_io_plus0.read_safe"] ?? runtime.memberCall(members.m_io_plus0, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let cs_extra2 = (((((__l["m_io_plus1.read_safe"] ?? runtime.memberCall(members.m_io_plus1, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let cs_extra3 = (((((__l["m_io_plus2.read_safe"] ?? runtime.memberCall(members.m_io_plus2, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let ss_extra1 = (((((__l["m_io_plus3.read_safe"] ?? runtime.memberCall(members.m_io_plus3, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let ss_extra2 = (((((__l["m_io_plus4.read_safe"] ?? runtime.memberCall(members.m_io_plus4, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let joy1 = (((((__l["m_io_joy1.read_safe"] ?? runtime.memberCall(members.m_io_joy1, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let joy2 = (((((__l["m_io_joy2.read_safe"] ?? runtime.memberCall(members.m_io_joy2, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                if (h_m_exp) {
                    data = (((__l["m_exp.iorq_r"] ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(offset)) | 0);
                }
                if (((Number(((lines) & (1))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line0.read"] ?? runtime.memberCall(members.m_io_line0, "read", 0, __l["read"]))()))) | 0);
                    if (((((((((Number(cs_extra1) !== Number(31)) ? 1 : 0)) || (((Number(cs_extra2) !== Number(31)) ? 1 : 0))) ? 1 : 0)) || (((Number(cs_extra3) !== Number(31)) ? 1 : 0))) ? 1 : 0)) {
                        data = ((((data) & (-2))) | 0);
                    }
                }
                if (((Number(((lines) & (2))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line1.read"] ?? runtime.memberCall(members.m_io_line1, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (4))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line2.read"] ?? runtime.memberCall(members.m_io_line2, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (8))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line3.read"] ?? runtime.memberCall(members.m_io_line3, "read", 0, __l["read"]))()) & (cs_extra1))) & (joy2))))) | 0);
                }
                if (((Number(((lines) & (16))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line4.read"] ?? runtime.memberCall(members.m_io_line4, "read", 0, __l["read"]))()) & (cs_extra2))) & (joy1))))) | 0);
                }
                if (((Number(((lines) & (32))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((__l["m_io_line5.read"] ?? runtime.memberCall(members.m_io_line5, "read", 0, __l["read"]))()) & (ss_extra1))))) | 0);
                }
                if (((Number(((lines) & (64))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line6.read"] ?? runtime.memberCall(members.m_io_line6, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (128))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line7.read"] ?? runtime.memberCall(members.m_io_line7, "read", 0, __l["read"]))()) & (cs_extra3))) & (ss_extra2))))) | 0);
                    if ((((((Number(ss_extra1) !== Number(31)) ? 1 : 0)) || (((Number(ss_extra2) !== Number(31)) ? 1 : 0))) ? 1 : 0)) {
                        data = ((((data) & (-3))) | 0);
                    }
                }
                data = ((((data) | (224))) | 0);
                if (((Number((__l["m_cassette.input"] ?? runtime.memberCall(members.m_cassette, "input", 0, undefined))()) > Number(0.0038)) ? 1 : 0)) {
                    data = ((((data) & (-65))) | 0);
                }
                if (((Number((((__l["m_io_config.read"] ?? runtime.memberCall(members.m_io_config, "read", 0, __l["read"]))()) & (128))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) ^ (64))) | 0);
                }
                return data;
            }
            function method_spectrum_ula_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_exp = members.m_exp ?? runtime.member("m_exp");
                (__l["m_ula.ula_w"] ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
                let changed = (((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) ^ (data))) & 0xff);
                if (((changed) & (7))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                if (((changed) & (24))) {
                    if ((((changed) >>> (3)) & 1)) {
                        (__l["m_cassette.output"] ?? runtime.memberCall(members.m_cassette, "output", 0, undefined))((((((data) >>> (3)) & 1)) ? ((-1)) : ((+1))));
                    }
                    (__l["m_speaker.level_w"] ?? runtime.memberCall(members.m_speaker, "level_w", 0, undefined))((((data) >>> (3)) & ((1 << (2)) - 1)));
                }
                if (h_m_exp) {
                    (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(offset, data);
                }
                members.m_port_fe_data = ((data) | 0);
            }
            function method_spectrum_port_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.io_r"] ?? runtime.memberCall(members.m_ula, "io_r", 0, undefined))(offset);
                if ((__l["m_exp.get_card_device"] ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
                    return (__l["m_exp.iorq_r"] ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(((offset) | (1)));
                }
                return (runtime.overrides["floating_bus_r"] ? runtime.overrides["floating_bus_r"]() : method_floating_bus_r(runtime));
            }
            function method_floating_bus_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((255) & 0xff);
                if ((__l["m_ula.is_in_contended_area"] ?? runtime.memberCall(members.m_ula, "is_in_contended_area", 0, undefined))()) {
                    let vpos = (__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
                    let now = runtime.subtract((__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (__l["m_ula.get_irq_at"] ?? runtime.memberCall(members.m_ula, "get_irq_at", 0, undefined))());
                    let cf = runtime.add(((vpos) * ((__l["m_ula.get_video_line_clocks"] ?? runtime.memberCall(members.m_ula, "get_video_line_clocks", 0, undefined))())), (__l["m_ula.get_raster_contention_offset"] ?? runtime.memberCall(members.m_ula, "get_raster_contention_offset", 0, undefined))());
                    let ct = ((cf) + ((__l["m_ula.get_raster_line_clocks"] ?? runtime.memberCall(members.m_ula, "get_raster_line_clocks", 0, undefined))()));
                    if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
                        let clocks = ((now) - (cf));
                        if ((((((clocks) >>> (2)) & 1)) ? 0 : 1)) {
                            let y = ((((vpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).top?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
                            let x = ((runtime.add(runtime.shiftRight(clocks, 2), (((clocks) >>> (1)) & 1))) & 0xffff);
                            data = ((((((clocks) & (1))) ? (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), runtime.add(6144, ((((((y) & (248))) << (2))) | (x))))) : (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (7))) << (8))) | (((((y) & (56))) << (2))))) | (((((y) & (192))) << (5))))) | (x)))))) & 0xff);
                        }
                    }
                }
                return data;
            }
            function method_get_screen_area(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["rectangle"] ? __l["rectangle"](48, 303, 63, 254) : runtime.macro("rectangle", 48, 303, 63, 254));
            }
            function method_spectrum_port_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.io_w"] ?? runtime.memberCall(members.m_ula, "io_w", 0, undefined))(offset);
                if ((__l["m_exp.get_card_device"] ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
                    (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
                }
            }
            function method_spectrum_128_port_7ffd_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.ula_w"] ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
                if ((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (32))) {
                    return;
                }
                members.m_port_7ffd_data = ((data) | 0);
                (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
                (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
            }
            function method_spectrum_128_update_memory(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                (__l["m_bank_rom[0].set_entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "set_entry", 0, __l["set_entry"]))(((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1));
                (__l["m_bank_ram[3].set_entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "set_entry", 0, __l["set_entry"]))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
                (__l["m_ula.bank3_pg_w"] ?? runtime.memberCall(members.m_ula, "bank3_pg_w", 0, undefined))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
                (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) {
                    members.m_screen_location = runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 114688);
                }
                else {
                    members.m_screen_location = runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 81920);
                }
            }
            function method_spectrum_128_rom_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
                return (((__l["m_exp.romcs"] ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))()) ? ((__l["m_exp.mreq_r"] ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex((__l["m_bank_rom[0].base"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "base", 0, __l["base"]))(), offset)));
            }
            function method_spectrum_128_rom_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_exp.mreq_w"] ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
            }
            function method_spectrum_128_ram_r_1(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((16384) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[1].base"] ? __l["m_bank_ram[1].base"]() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 1))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_1(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((16384) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[1].base"] ? __l["m_bank_ram[1].base"]() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 1))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_is_vram_write(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                return (((((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) && (((Number((__l["m_bank_ram[3].entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __l["entry"]))()) === Number(7)) ? 1 : 0))) ? 1 : 0)) ? ((((((Number(offset) >= Number(49152)) ? 1 : 0)) && (((Number(offset) < Number(56064)) ? 1 : 0))) ? 1 : 0)) : ((__l["spectrum_state::is_vram_write"] ? __l["spectrum_state::is_vram_write"](offset) : runtime.macro("spectrum_state::is_vram_write", offset))));
            }
            function method_spectrum_128_ram_r_2(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((32768) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[2].base"] ? __l["m_bank_ram[2].base"]() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 2))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_2(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((32768) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[2].base"] ? __l["m_bank_ram[2].base"]() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 2))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_spectrum_128_ram_r_3(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((49152) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[3].base"] ? __l["m_bank_ram[3].base"]() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 3))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_3(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((49152) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[3].base"] ? __l["m_bank_ram[3].base"]() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 3))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_spectrum_128_pre_opcode_fetch_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.m1"] ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
                (__l["m_exp.pre_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
                let retval = (((__l["m_program.read_byte"] ?? runtime.memberCall(members.m_program, "read_byte", 0, __l["read_byte"]))(offset)) & 0xff);
                (__l["m_exp.post_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_rom_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_exp.mreq_w"] ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
            }
            function method_pre_opcode_fetch_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.m1"] ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
                (__l["m_exp.pre_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
                let retval = (((__l["m_specmem.read8"] ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
                (__l["m_exp.post_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_data_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(offset);
                (__l["m_exp.pre_data_fetch"] ?? runtime.memberCall(members.m_exp, "pre_data_fetch", 0, undefined))(offset);
                let retval = (((__l["m_specmem.read8"] ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
                (__l["m_exp.post_data_fetch"] ?? runtime.memberCall(members.m_exp, "post_data_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_data_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(offset);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](offset) : method_is_vram_write(runtime, offset))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                (__l["m_specmem.write8"] ?? runtime.memberCall(members.m_specmem, "write8", 0, undefined))(offset, data);
            }
            function method_spec_interrupt(runtime, device) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_irq_on_timer.adjust"] ?? runtime.memberCall(members.m_irq_on_timer, "adjust", 0, __l["adjust"]))((__l["m_screen.time_until_pos"] ?? runtime.memberCall(members.m_screen, "time_until_pos", 0, undefined))(0, ((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).left?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))));
            }
            function method_spectrum_refresh_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["m_ula.is_snow_possible"] ?? runtime.memberCall(members.m_ula, "is_snow_possible", 0, undefined))(offset)) ? 0 : 1)) {
                    return;
                }
                let screen = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
                let x = ((runtime.subtract((__l["m_screen.hpos"] ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))(), (__l["screen.left"] ?? runtime.memberCall(screen, "left", 0, __l["left"]))())) & 0xff);
                let y = ((runtime.subtract((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), (__l["screen.top"] ?? runtime.memberCall(screen, "top", 0, __l["top"]))())) & 0xffff);
                let snow_pattern = ((0) & 0xff);
                let t_to_chunk_end = ((0) & 0xff);
                if (((Number(((x) % (16))) === Number(0)) ? 1 : 0)) {
                    snow_pattern = ((1) & 0xff);
                    t_to_chunk_end = ((4) & 0xff);
                }
                else {
                    if (((Number(((x) % (16))) === Number(4)) ? 1 : 0)) {
                        snow_pattern = ((2) & 0xff);
                        x = ((((x) + (8))) & 0xff);
                        t_to_chunk_end = ((6) & 0xff);
                    }
                    else {
                        return;
                    }
                }
                let px_addr_hi = ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (32))) << (2))))) & 0xffff);
                let attr_addr_hi = ((((6144) | (((((y) & (224))) << (2))))) & 0xffff);
                let addr_lo = ((((((((y) & (24))) << (2))) | (runtime.shiftRight(x, 3)))) & 0xff);
                let px_tmp = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((px_addr_hi) | (addr_lo)))) & 0xff);
                let attr_tmp = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((attr_addr_hi) | (addr_lo)))) & 0xff);
                if (((Number(snow_pattern) === Number(1)) ? 1 : 0)) {
                    let i = ((runtime.shiftRight(offset, 8)) & 0xff);
                    let r = ((((((offset) + (1))) & (127))) & 0xff);
                    let base = (runtime.overrides["snow_pattern1_base"] ? runtime.overrides["snow_pattern1_base"](i) : method_snow_pattern1_base(runtime, i));
                    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex(base, ((px_addr_hi) | (r))));
                    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex(base, ((attr_addr_hi) | (r))));
                }
                else {
                    if (((Number(snow_pattern) === Number(2)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((px_addr_hi) | (addr_lo))) - (1))));
                        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((attr_addr_hi) | (addr_lo))) - (1))));
                    }
                }
                (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))((-t_to_chunk_end));
                (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(t_to_chunk_end);
                runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), px_tmp);
                runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), attr_tmp);
            }
            function method_snow_pattern1_base(runtime, i_reg) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let is_alt_scr_selected = ((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) ? 1 : 0);
                let is_alt_scr = ((((i_reg) & (128))) ? 1 : 0);
                let i_pg = ((((is_alt_scr) ? ((((__l["m_bank_ram[3].entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __l["entry"]))()) & (5))) : (5))) & 0xff);
                return runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), ((((i_pg) | (((is_alt_scr_selected) << (1))))) << (14)));
            }
            function method_nomem_rq(runtime, offset, data) {
                const members = runtime.members;
            }
            function method_screen_update_spectrum(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scr = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
                let vis = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__l["screen.visible_area"] ?? runtime.memberCall(screen, "visible_area", 0, __l["visible_area"]))());
                if ((runtime.same(vis, scr) ? 0 : 1)) {
                    let bsides = [(__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["vis.top"] ?? runtime.memberCall(vis, "top", 0, __l["top"]))(), runtime.subtract((__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), 1)) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["vis.top"] ?? runtime.memberCall(vis, "top", 0, __l["top"]))(), runtime.subtract((__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), 1))), (__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), runtime.subtract((__l["scr.left"] ?? runtime.memberCall(scr, "left", 0, __l["left"]))(), 1), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), runtime.subtract((__l["scr.left"] ?? runtime.memberCall(scr, "left", 0, __l["left"]))(), 1), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))())), (__l["rectangle"] ? __l["rectangle"](runtime.add((__l["scr.right"] ?? runtime.memberCall(scr, "right", 0, __l["right"]))(), 1), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", runtime.add((__l["scr.right"] ?? runtime.memberCall(scr, "right", 0, __l["right"]))(), 1), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))())), (__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), runtime.add((__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))(), 1), (__l["vis.bottom"] ?? runtime.memberCall(vis, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), runtime.add((__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))(), 1), (__l["vis.bottom"] ?? runtime.memberCall(vis, "bottom", 0, __l["bottom"]))()))];
                    for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                        let border = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(runtime.and(runtime.readIndex(bsides, i), cliprect));
                        if ((((border).empty()) ? 0 : 1)) {
                            (runtime.overrides["spectrum_update_border"] ? runtime.overrides["spectrum_update_border"](screen, bitmap, border) : method_spectrum_update_border(runtime, screen, bitmap, border));
                        }
                    }
                }
                scr = runtime.andAssign(scr, cliprect);
                if ((((scr).empty()) ? 0 : 1)) {
                    (runtime.overrides["spectrum_update_screen"] ? runtime.overrides["spectrum_update_screen"](screen, bitmap, scr) : method_spectrum_update_screen(runtime, screen, bitmap, scr));
                }
                return 0;
            }
            function method_spectrum_update_border(runtime, screen, bitmap, border) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let mod = (((__l["m_ula.get_border_chunk_size"] ?? runtime.memberCall(members.m_ula, "get_border_chunk_size", 0, undefined))()) & 0xff);
                let btime = (((__l["m_ula.get_btime"] ?? runtime.memberCall(members.m_ula, "get_btime", 0, undefined))()) & 0xff);
                for (let y = (__l["border.top"] ?? runtime.memberCall(border, "top", 0, __l["top"]))(); ((Number(y) <= Number((__l["border.bottom"] ?? runtime.memberCall(border, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((y) + (1))) {
                    let pix = bitmap["pix&"](y, (__l["border.left"] ?? runtime.memberCall(border, "left", 0, __l["left"]))());
                    for (let x = (__l["border.left"] ?? runtime.memberCall(border, "left", 0, __l["left"]))(); ((Number(x) <= Number((__l["border.right"] ?? runtime.memberCall(border, "right", 0, __l["right"]))())) ? 1 : 0);) {
                        if (((Number(((x) % (mod))) === Number(btime)) ? 1 : 0)) {
                            pix = ({ ...(pix), offset: ((pix).offset - (btime)) });
                            x = ((x) - (btime));
                            for (let m = 0; ((Number(m) < Number(mod)) ? 1 : 0); m = ((m) + (1)), x = ((x) + (1))) {
                                runtime.pointerStore((() => { const previous = pix; pix = ({ ...(pix), offset: ((pix).offset + (1)) }); return previous; })(), (runtime.overrides["get_border_color"] ? runtime.overrides["get_border_color"](y, x) : method_get_border_color(runtime, y, x)));
                            }
                        }
                        else {
                            pix = ({ ...(pix), offset: ((pix).offset + (1)) });
                            x = ((x) + (1));
                        }
                    }
                }
            }
            function method_get_border_color(runtime, hpos, vpos) {
                const members = runtime.members;
                return (((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (7));
            }
            function method_spectrum_update_screen(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_frame_invert_count = members.m_frame_invert_count ?? runtime.member("m_frame_invert_count");
                let invert_attrs = ((((runtime.divide((__l["screen.frame_number"] ?? runtime.memberCall(screen, "frame_number", 0, __l["frame_number"]))(), h_m_frame_invert_count)) & (1))) ? 1 : 0);
                for (let vpos = (((__l["cliprect.top"] ?? runtime.memberCall(cliprect, "top", 0, __l["top"]))()) & 0xffff); ((Number(vpos) <= Number((__l["cliprect.bottom"] ?? runtime.memberCall(cliprect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); vpos = ((((vpos) + (1))) & 0xffff)) {
                    let hpos = (((__l["cliprect.left"] ?? runtime.memberCall(cliprect, "left", 0, __l["left"]))()) & 0xffff);
                    let x = ((((hpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).left?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))))) & 0xffff);
                    let chunk_right = ((((x) & (8))) ? 1 : 0);
                    if (((Number(((x) % (8))) <= Number(((chunk_right) ? ((__l["m_ula.get_atime_right"] ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__l["m_ula.get_atime_left"] ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))())))) ? 1 : 0)) {
                        let shift = ((((x) % (8))) & 0xff);
                        x = ((((x) - (shift))) & 0xffff);
                        hpos = ((((hpos) - (shift))) & 0xffff);
                    }
                    else {
                        let shift = ((((8) - (((x) % (8))))) & 0xff);
                        x = ((((x) + (shift))) & 0xffff);
                        hpos = ((((hpos) + (shift))) & 0xffff);
                        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
                    }
                    let y = ((((vpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).top?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
                    let scr = runtime.addressOf((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (56))) << (2))))) | (runtime.shiftRight(x, 3))));
                    let attr = runtime.addressOf((members.m_screen_location ?? runtime.member("m_screen_location")), ((6144) | (((((((y) & (248))) << (2))) | (runtime.shiftRight(x, 3))))));
                    let pix = bitmap["pix&"](vpos, hpos);
                    while (((Number(((hpos) + (((chunk_right) ? ((__l["m_ula.get_atime_right"] ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__l["m_ula.get_atime_left"] ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))()))))) <= Number((__l["cliprect.right"] ?? runtime.memberCall(cliprect, "right", 0, __l["right"]))())) ? 1 : 0)) {
                        let ink = ((((((runtime.shiftRight(runtime.dereference(attr), 3)) & (8))) | (((runtime.dereference(attr)) & (7))))) & 0xffff);
                        let pap = ((((runtime.shiftRight(runtime.dereference(attr), 3)) & (15))) & 0xffff);
                        let pix8 = (((((((invert_attrs) && (((runtime.dereference(attr)) & (128)))) ? 1 : 0)) ? ((~runtime.dereference(scr))) : (runtime.dereference(scr)))) & 0xff);
                        for (let b = ((128) & 0xff); b; b = ((runtime.shiftRight(b, 1)) & 0xff), x = ((((x) + (1))) & 0xffff), hpos = ((((hpos) + (1))) & 0xffff)) {
                            runtime.pointerStore((() => { const previous = pix; pix = ({ ...(pix), offset: ((pix).offset + (1)) }); return previous; })(), ((((pix8) & (b))) ? (ink) : (pap)));
                        }
                        scr = ({ ...(scr), offset: ((scr).offset + (1)) });
                        attr = ({ ...(attr), offset: ((attr).offset + (1)) });
                        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
                    }
                }
            }
            function method_snx_decompress_block(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let counthi = ((0) & 0xff);
                let countlo = ((0) & 0xff);
                let compress = ((0) & 0xff);
                let fill = ((0) & 0xff);
                let block = ((0) & 0xffff);
                let count = ((0) & 0xffff);
                let i = ((0) & 0xffff);
                let j = ((0) & 0xffff);
                let numbytes = ((0) & 0xffff);
                i = ((42) & 0xffff);
                numbytes = ((0) & 0xffff);
                while (((Number(numbytes) < Number(size)) ? 1 : 0)) {
                    counthi = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                    if (((Number(counthi) >= Number(224)) ? 1 : 0)) {
                        count = ((runtime.add(((counthi) & (15)), 1)) & 0xffff);
                        if (((Number(((counthi) & (240))) === Number(240)) ? 1 : 0)) {
                            compress = ((255) & 0xff);
                        }
                        else {
                            compress = ((0) & 0xff);
                        }
                        0;
                    }
                    else {
                        countlo = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        count = ((((((counthi) << (8))) | (countlo))) & 0xffff);
                        compress = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        0;
                    }
                    if (((Number(compress) === Number(255)) ? 1 : 0)) {
                        fill = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        0;
                        for (j = ((0) & 0xffff); ((Number(j) < Number(count)) ? 1 : 0); j = ((((j) + (1))) & 0xffff)) {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(((((16384) + (numbytes))) + (j)), fill);
                        }
                        numbytes = ((((numbytes) + (count))) & 0xffff);
                    }
                    else {
                        0;
                        j = ((0) & 0xffff);
                        while (((Number(j) < Number(count)) ? 1 : 0)) {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(runtime.add(((16384) + (numbytes)), (() => { const previous = j; j = ((((j) + (1))) & 0xffff); return previous; })()), runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff))));
                        }
                        numbytes = ((((numbytes) + (count))) & 0xffff);
                    }
                }
            }
            function method_page_basicrom(runtime) {
                const members = runtime.members;
                if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    return;
                }
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (16))) | 0);
                (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
            }
            function method_update_paging(runtime) {
                const members = runtime.members;
                if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    return;
                }
                if (((Number((members.m_port_1ffd_data ?? runtime.member("m_port_1ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
                }
                else {
                    if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1)) {
                        members.m_port_1ffd_data = ((4) | 0);
                    }
                    else {
                        members.m_port_1ffd_data = ((0) | 0);
                    }
                    (runtime.overrides["plus3_update_memory"] ? runtime.overrides["plus3_update_memory"]() : method_plus3_update_memory(runtime));
                }
            }
            function method_plus3_update_memory(runtime) {
                const members = runtime.members;
            }
            function method_border_update(runtime, data) {
                const members = runtime.members;
            }
            function method_bank3_set_page(runtime, page) {
                const members = runtime.members;
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (((page) & (7))))) | 0);
                (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
            }
            function method_decode(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let mask = [0, 0, 252, 248, 240, 224, 192, 128, 0];
                let no_bits = ((2) & 0xff);
                let bitbuf = (__l["bb_stream"] ? __l["bb_stream"](source, size) : runtime.macro("bb_stream", source, size));
                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                while ((((__l["bitbuf.overflow"] ?? runtime.memberCall(bitbuf, "overflow", 0, __l["overflow"]))()) ? 0 : 1)) {
                    while ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                    }
                    let len = ((0) & 0xffff);
                    let bb = ((0) & 0xff);
                    do {
                        bb = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                        len = ((((len) + (bb))) & 0xffff);
                    } while ((((((Number(bb) === Number(3)) ? 1 : 0)) && (((Number(len) !== Number(15)) ? 1 : 0))) ? 1 : 0));
                    let offset = ((0) << 16 >> 16);
                    if (((Number(len) === Number(0)) ? 1 : 0)) {
                        offset = ((runtime.add(65528, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(3))) << 16 >> 16);
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                        dest = ((((dest) + (1))) & 0xffff);
                        continue;
                    }
                    else {
                        if (((Number(len) === Number(1)) ? 1 : 0)) {
                            let code = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                            if ((((((Number(code) === Number(0)) ? 1 : 0)) || (((Number(code) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                offset = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) << 16 >> 16);
                                offset = ((((offset) + (((((code) ? (254) : (253))) << (8))))) << 16 >> 16);
                            }
                            else {
                                if (((Number(code) === Number(2)) ? 1 : 0)) {
                                    let b = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) & 0xff);
                                    if (((Number(b) >= Number(224)) ? 1 : 0)) {
                                        b = ((((b) << (1))) & 0xff);
                                        b = ((((b) + (1))) & 0xff);
                                        b = ((((b) ^ (2))) & 0xff);
                                        if (((Number(b) === Number(255)) ? 1 : 0)) {
                                            no_bits = ((((no_bits) + (1))) & 0xff);
                                            continue;
                                        }
                                        offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                        dest = ((((dest) + (1))) & 0xffff);
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                        dest = ((((dest) + (1))) & 0xffff);
                                        continue;
                                    }
                                    offset = ((((65280) + (b))) << 16 >> 16);
                                }
                                else {
                                    if (((Number(code) === Number(3)) ? 1 : 0)) {
                                        offset = ((runtime.add(65504, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(5))) << 16 >> 16);
                                    }
                                }
                            }
                            for (let i = 0; ((Number(i) < Number(2)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                            }
                            continue;
                        }
                        else {
                            if (((Number(len) === Number(3)) ? 1 : 0)) {
                                if ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                                    offset = ((runtime.add(65520, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(4))) << 16 >> 16);
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                    dest = ((((dest) + (1))) & 0xffff);
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                    dest = ((((dest) + (1))) & 0xffff);
                                    continue;
                                }
                                if ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                                    let bytes_no = ((runtime.add(6, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(4))) & 0xff);
                                    for (let i = ((0) & 0xff); ((Number(i) < Number(((bytes_no) << (1)))) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                    }
                                    continue;
                                }
                                len = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(7)) & 0xffff);
                                if (((Number(len) === Number(15)) ? 1 : 0)) {
                                    break;
                                }
                                if (((Number(len) < Number(15)) ? 1 : 0)) {
                                    len = ((runtime.add(((len) << (8)), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))())) & 0xffff);
                                }
                            }
                        }
                    }
                    if (((Number(len) === Number(2)) ? 1 : 0)) {
                        len = ((((len) + (1))) & 0xffff);
                    }
                    let code = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                    if (((Number(code) === Number(0)) ? 1 : 0)) {
                        offset = ((runtime.add(65024, (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))())) << 16 >> 16);
                    }
                    else {
                        if (((Number(code) === Number(1)) ? 1 : 0)) {
                            let b = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) & 0xff);
                            if (((Number(b) >= Number(224)) ? 1 : 0)) {
                                if (((Number(len) > Number(3)) ? 1 : 0)) {
                                    break;
                                }
                                b = ((((b) << (1))) & 0xff);
                                b = ((((b) + (1))) & 0xff);
                                b = ((((b) ^ (3))) & 0xff);
                                offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                                continue;
                            }
                            offset = ((((65280) + (b))) << 16 >> 16);
                        }
                        else {
                            if (((Number(code) === Number(2)) ? 1 : 0)) {
                                offset = ((runtime.add(65504, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(5))) << 16 >> 16);
                            }
                            else {
                                if (((Number(code) === Number(3)) ? 1 : 0)) {
                                    offset = ((((runtime.add(runtime.readIndex(mask, no_bits), (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(no_bits))) << (8))) << 16 >> 16);
                                    offset = ((((offset) + ((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()))) << 16 >> 16);
                                }
                            }
                        }
                    }
                    for (let i = ((0) & 0xffff); ((Number(i) < Number(len)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                        dest = ((((dest) + (1))) & 0xffff);
                    }
                }
            }
            function method_spectrum_identify_z80(runtime, snapdata, snapsize) {
                const members = runtime.members;
                let lo = ((0) & 0xff);
                let hi = ((0) & 0xff);
                let data = ((0) & 0xff);
                if (((Number(snapsize) < Number(30)) ? 1 : 0)) {
                    return 0;
                }
                lo = ((((runtime.readIndex(snapdata, 6)) & (255))) & 0xff);
                hi = ((((runtime.readIndex(snapdata, 7)) & (255))) & 0xff);
                if ((((hi) || (lo)) ? 1 : 0)) {
                    return 1;
                }
                lo = ((((runtime.readIndex(snapdata, 30)) & (255))) & 0xff);
                hi = ((((runtime.readIndex(snapdata, 31)) & (255))) & 0xff);
                data = ((((runtime.readIndex(snapdata, 34)) & (255))) & 0xff);
                if ((((((Number(hi) === Number(0)) ? 1 : 0)) && (((Number(lo) === Number(23)) ? 1 : 0))) ? 1 : 0)) {
                    switch (data) {
                        case 0:
                        case 1:
                            {
                                return 2;
                            }
                        case 2:
                            {
                                return 3;
                            }
                        case 3:
                        case 4:
                            {
                                return 4;
                            }
                        case 128:
                            {
                                return 5;
                            }
                    }
                }
                if ((((((Number(hi) === Number(0)) ? 1 : 0)) && (((Number(lo) === Number(54)) ? 1 : 0))) ? 1 : 0)) {
                    switch (data) {
                        case 0:
                        case 1:
                        case 3:
                            {
                                return 2;
                            }
                        case 2:
                            {
                                return 3;
                            }
                        case 4:
                        case 5:
                        case 6:
                            {
                                return 4;
                            }
                        case 128:
                            {
                                return 5;
                            }
                    }
                }
                return 0;
            }
            function method_z80_decompress_block(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ch = ((0) & 0xff);
                let i = ((0) | 0);
                do {
                    ch = ((runtime.readIndex(source, 0)) & 0xff);
                    if (((Number(ch) === Number(237)) ? 1 : 0)) {
                        if (((Number(runtime.readIndex(source, 1)) === Number(237)) ? 1 : 0)) {
                            let count = ((0) & 0xff);
                            let data = ((0) & 0xff);
                            count = ((runtime.readIndex(source, 2)) & 0xff);
                            if (((Number(count) === Number(0)) ? 1 : 0)) {
                                return;
                            }
                            data = ((runtime.readIndex(source, 3)) & 0xff);
                            source = ({ ...(source), offset: ((source).offset + (4)) });
                            if (((Number(count) > Number(size)) ? 1 : 0)) {
                                count = ((size) & 0xff);
                            }
                            size = ((((size) - (count))) & 0xffff);
                            for (i = ((0) | 0); ((Number(i) < Number(count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, data);
                                dest = ((((dest) + (1))) & 0xffff);
                            }
                        }
                        else {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, ch);
                            dest = ((((dest) + (1))) & 0xffff);
                            source = ({ ...(source), offset: ((source).offset + (1)) });
                            size = ((((size) - (1))) & 0xffff);
                        }
                    }
                    else {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, ch);
                        dest = ((((dest) + (1))) & 0xffff);
                        source = ({ ...(source), offset: ((source).offset + (1)) });
                        size = ((((size) - (1))) & 0xffff);
                    }
                } while (((Number(size) > Number(0)) ? 1 : 0));
            }
            function method_ts2068_update_memory(runtime) {
                const members = runtime.members;
            }
            return {
                "spectrum_ula_r": method_spectrum_ula_r,
                "spectrum_ula_w": method_spectrum_ula_w,
                "spectrum_port_r": method_spectrum_port_r,
                "floating_bus_r": method_floating_bus_r,
                "get_screen_area": method_get_screen_area,
                "spectrum_port_w": method_spectrum_port_w,
                "spectrum_128_port_7ffd_w": method_spectrum_128_port_7ffd_w,
                "spectrum_128_update_memory": method_spectrum_128_update_memory,
                "spectrum_128_rom_r": method_spectrum_128_rom_r,
                "spectrum_128_rom_w": method_spectrum_128_rom_w,
                "spectrum_128_ram_r_1": method_spectrum_128_ram_r_1,
                "spectrum_128_ram_w_1": method_spectrum_128_ram_w_1,
                "is_vram_write": method_is_vram_write,
                "spectrum_128_ram_r_2": method_spectrum_128_ram_r_2,
                "spectrum_128_ram_w_2": method_spectrum_128_ram_w_2,
                "spectrum_128_ram_r_3": method_spectrum_128_ram_r_3,
                "spectrum_128_ram_w_3": method_spectrum_128_ram_w_3,
                "spectrum_128_pre_opcode_fetch_r": method_spectrum_128_pre_opcode_fetch_r,
                "spectrum_rom_w": method_spectrum_rom_w,
                "pre_opcode_fetch_r": method_pre_opcode_fetch_r,
                "spectrum_data_r": method_spectrum_data_r,
                "spectrum_data_w": method_spectrum_data_w,
                "spec_interrupt": method_spec_interrupt,
                "spectrum_refresh_w": method_spectrum_refresh_w,
                "snow_pattern1_base": method_snow_pattern1_base,
                "nomem_rq": method_nomem_rq,
                "screen_update_spectrum": method_screen_update_spectrum,
                "spectrum_update_border": method_spectrum_update_border,
                "get_border_color": method_get_border_color,
                "spectrum_update_screen": method_spectrum_update_screen,
                "snx_decompress_block": method_snx_decompress_block,
                "page_basicrom": method_page_basicrom,
                "update_paging": method_update_paging,
                "plus3_update_memory": method_plus3_update_memory,
                "border_update": method_border_update,
                "bank3_set_page": method_bank3_set_page,
                "decode": method_decode,
                "spectrum_identify_z80": method_spectrum_identify_z80,
                "z80_decompress_block": method_z80_decompress_block,
                "ts2068_update_memory": method_ts2068_update_memory
            };
        })();
        return {
            "spectrum_128_state.spectrum_ula_r": methods["spectrum_ula_r"],
            "spectrum_128_state.spectrum_ula_w": methods["spectrum_ula_w"],
            "spectrum_128_state.spectrum_port_r": methods["spectrum_port_r"],
            "spectrum_128_state.floating_bus_r": methods["floating_bus_r"],
            "spectrum_128_state.get_screen_area": methods["get_screen_area"],
            "spectrum_128_state.spectrum_port_w": methods["spectrum_port_w"],
            "spectrum_128_state.spectrum_128_port_7ffd_w": methods["spectrum_128_port_7ffd_w"],
            "spectrum_128_state.spectrum_128_update_memory": methods["spectrum_128_update_memory"],
            "spectrum_128_state.spectrum_128_rom_r": methods["spectrum_128_rom_r"],
            "spectrum_128_state.spectrum_128_rom_w": methods["spectrum_128_rom_w"],
            "spectrum_128_state.spectrum_128_ram_r_1": methods["spectrum_128_ram_r_1"],
            "spectrum_128_state.spectrum_128_ram_w_1": methods["spectrum_128_ram_w_1"],
            "spectrum_128_state.is_vram_write": methods["is_vram_write"],
            "spectrum_128_state.spectrum_128_ram_r_2": methods["spectrum_128_ram_r_2"],
            "spectrum_128_state.spectrum_128_ram_w_2": methods["spectrum_128_ram_w_2"],
            "spectrum_128_state.spectrum_128_ram_r_3": methods["spectrum_128_ram_r_3"],
            "spectrum_128_state.spectrum_128_ram_w_3": methods["spectrum_128_ram_w_3"],
            "spectrum_128_state.spectrum_128_pre_opcode_fetch_r": methods["spectrum_128_pre_opcode_fetch_r"],
            "spectrum_128_state.spec_interrupt": methods["spec_interrupt"],
            "spectrum_128_state.spectrum_refresh_w": methods["spectrum_refresh_w"],
            "spectrum_128_state.spectrum_identify_z80": methods["spectrum_identify_z80"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_spectrum_ula_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_exp = members.m_exp ?? runtime.member("m_exp");
                (__l["m_ula.ula_r"] ?? runtime.memberCall(members.m_ula, "ula_r", 0, undefined))(offset);
                let lines = ((runtime.shiftRight(offset, 8)) | 0);
                let data = ((255) | 0);
                let cs_extra1 = (((((__l["m_io_plus0.read_safe"] ?? runtime.memberCall(members.m_io_plus0, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let cs_extra2 = (((((__l["m_io_plus1.read_safe"] ?? runtime.memberCall(members.m_io_plus1, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let cs_extra3 = (((((__l["m_io_plus2.read_safe"] ?? runtime.memberCall(members.m_io_plus2, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let ss_extra1 = (((((__l["m_io_plus3.read_safe"] ?? runtime.memberCall(members.m_io_plus3, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let ss_extra2 = (((((__l["m_io_plus4.read_safe"] ?? runtime.memberCall(members.m_io_plus4, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let joy1 = (((((__l["m_io_joy1.read_safe"] ?? runtime.memberCall(members.m_io_joy1, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let joy2 = (((((__l["m_io_joy2.read_safe"] ?? runtime.memberCall(members.m_io_joy2, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                if (h_m_exp) {
                    data = (((__l["m_exp.iorq_r"] ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(offset)) | 0);
                }
                if (((Number(((lines) & (1))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line0.read"] ?? runtime.memberCall(members.m_io_line0, "read", 0, __l["read"]))()))) | 0);
                    if (((((((((Number(cs_extra1) !== Number(31)) ? 1 : 0)) || (((Number(cs_extra2) !== Number(31)) ? 1 : 0))) ? 1 : 0)) || (((Number(cs_extra3) !== Number(31)) ? 1 : 0))) ? 1 : 0)) {
                        data = ((((data) & (-2))) | 0);
                    }
                }
                if (((Number(((lines) & (2))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line1.read"] ?? runtime.memberCall(members.m_io_line1, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (4))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line2.read"] ?? runtime.memberCall(members.m_io_line2, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (8))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line3.read"] ?? runtime.memberCall(members.m_io_line3, "read", 0, __l["read"]))()) & (cs_extra1))) & (joy2))))) | 0);
                }
                if (((Number(((lines) & (16))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line4.read"] ?? runtime.memberCall(members.m_io_line4, "read", 0, __l["read"]))()) & (cs_extra2))) & (joy1))))) | 0);
                }
                if (((Number(((lines) & (32))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((__l["m_io_line5.read"] ?? runtime.memberCall(members.m_io_line5, "read", 0, __l["read"]))()) & (ss_extra1))))) | 0);
                }
                if (((Number(((lines) & (64))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line6.read"] ?? runtime.memberCall(members.m_io_line6, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (128))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line7.read"] ?? runtime.memberCall(members.m_io_line7, "read", 0, __l["read"]))()) & (cs_extra3))) & (ss_extra2))))) | 0);
                    if ((((((Number(ss_extra1) !== Number(31)) ? 1 : 0)) || (((Number(ss_extra2) !== Number(31)) ? 1 : 0))) ? 1 : 0)) {
                        data = ((((data) & (-3))) | 0);
                    }
                }
                data = ((((data) | (224))) | 0);
                if (((Number((__l["m_cassette.input"] ?? runtime.memberCall(members.m_cassette, "input", 0, undefined))()) > Number(0.0038)) ? 1 : 0)) {
                    data = ((((data) & (-65))) | 0);
                }
                if (((Number((((__l["m_io_config.read"] ?? runtime.memberCall(members.m_io_config, "read", 0, __l["read"]))()) & (128))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) ^ (64))) | 0);
                }
                return data;
            }
            function method_spectrum_ula_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_exp = members.m_exp ?? runtime.member("m_exp");
                (__l["m_ula.ula_w"] ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
                let changed = (((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) ^ (data))) & 0xff);
                if (((changed) & (7))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                if (((changed) & (24))) {
                    if ((((changed) >>> (3)) & 1)) {
                        (__l["m_cassette.output"] ?? runtime.memberCall(members.m_cassette, "output", 0, undefined))((((((data) >>> (3)) & 1)) ? ((-1)) : ((+1))));
                    }
                    (__l["m_speaker.level_w"] ?? runtime.memberCall(members.m_speaker, "level_w", 0, undefined))((((data) >>> (3)) & ((1 << (2)) - 1)));
                }
                if (h_m_exp) {
                    (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(offset, data);
                }
                members.m_port_fe_data = ((data) | 0);
            }
            function method_spectrum_port_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.io_r"] ?? runtime.memberCall(members.m_ula, "io_r", 0, undefined))(offset);
                if ((__l["m_exp.get_card_device"] ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
                    return (__l["m_exp.iorq_r"] ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(((offset) | (1)));
                }
                return (runtime.overrides["floating_bus_r"] ? runtime.overrides["floating_bus_r"]() : method_floating_bus_r(runtime));
            }
            function method_floating_bus_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((255) & 0xff);
                if ((__l["m_ula.is_in_contended_area"] ?? runtime.memberCall(members.m_ula, "is_in_contended_area", 0, undefined))()) {
                    let vpos = (__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
                    let now = runtime.subtract((__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (__l["m_ula.get_irq_at"] ?? runtime.memberCall(members.m_ula, "get_irq_at", 0, undefined))());
                    let cf = runtime.add(((vpos) * ((__l["m_ula.get_video_line_clocks"] ?? runtime.memberCall(members.m_ula, "get_video_line_clocks", 0, undefined))())), (__l["m_ula.get_raster_contention_offset"] ?? runtime.memberCall(members.m_ula, "get_raster_contention_offset", 0, undefined))());
                    let ct = ((cf) + ((__l["m_ula.get_raster_line_clocks"] ?? runtime.memberCall(members.m_ula, "get_raster_line_clocks", 0, undefined))()));
                    if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
                        let clocks = ((now) - (cf));
                        if ((((((clocks) >>> (2)) & 1)) ? 0 : 1)) {
                            let y = ((((vpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).top?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
                            let x = ((runtime.add(runtime.shiftRight(clocks, 2), (((clocks) >>> (1)) & 1))) & 0xffff);
                            data = ((((((clocks) & (1))) ? (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), runtime.add(6144, ((((((y) & (248))) << (2))) | (x))))) : (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (7))) << (8))) | (((((y) & (56))) << (2))))) | (((((y) & (192))) << (5))))) | (x)))))) & 0xff);
                        }
                    }
                }
                return data;
            }
            function method_get_screen_area(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["rectangle"] ? __l["rectangle"](48, 303, 63, 254) : runtime.macro("rectangle", 48, 303, 63, 254));
            }
            function method_spectrum_port_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.io_w"] ?? runtime.memberCall(members.m_ula, "io_w", 0, undefined))(offset);
                if ((__l["m_exp.get_card_device"] ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
                    (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
                }
            }
            function method_spectrum_128_port_7ffd_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.ula_w"] ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
                if ((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (32))) {
                    return;
                }
                members.m_port_7ffd_data = ((data) | 0);
                (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
                (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
            }
            function method_spectrum_128_update_memory(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                (__l["m_bank_rom[0].set_entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "set_entry", 0, __l["set_entry"]))(((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1));
                (__l["m_bank_ram[3].set_entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "set_entry", 0, __l["set_entry"]))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
                (__l["m_ula.bank3_pg_w"] ?? runtime.memberCall(members.m_ula, "bank3_pg_w", 0, undefined))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
                (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) {
                    members.m_screen_location = runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 114688);
                }
                else {
                    members.m_screen_location = runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 81920);
                }
            }
            function method_spectrum_128_rom_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
                return (((__l["m_exp.romcs"] ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))()) ? ((__l["m_exp.mreq_r"] ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex((__l["m_bank_rom[0].base"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "base", 0, __l["base"]))(), offset)));
            }
            function method_spectrum_128_rom_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_exp.mreq_w"] ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
            }
            function method_spectrum_128_ram_r_1(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((16384) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[1].base"] ? __l["m_bank_ram[1].base"]() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 1))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_1(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((16384) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[1].base"] ? __l["m_bank_ram[1].base"]() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 1))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_is_vram_write(runtime, offset) {
                const members = runtime.members;
                return (((((Number(offset) >= Number(16384)) ? 1 : 0)) && (((Number(offset) < Number(23296)) ? 1 : 0))) ? 1 : 0);
            }
            function method_spectrum_128_ram_r_2(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((32768) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[2].base"] ? __l["m_bank_ram[2].base"]() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 2))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_2(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((32768) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[2].base"] ? __l["m_bank_ram[2].base"]() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 2))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_spectrum_128_ram_r_3(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((49152) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[3].base"] ? __l["m_bank_ram[3].base"]() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 3))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_3(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((49152) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[3].base"] ? __l["m_bank_ram[3].base"]() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 3))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_spectrum_128_pre_opcode_fetch_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.m1"] ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
                (__l["m_exp.pre_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
                let retval = (((__l["m_program.read_byte"] ?? runtime.memberCall(members.m_program, "read_byte", 0, __l["read_byte"]))(offset)) & 0xff);
                (__l["m_exp.post_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_rom_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_exp.mreq_w"] ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
            }
            function method_pre_opcode_fetch_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.m1"] ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
                (__l["m_exp.pre_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
                let retval = (((__l["m_specmem.read8"] ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
                (__l["m_exp.post_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_data_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(offset);
                (__l["m_exp.pre_data_fetch"] ?? runtime.memberCall(members.m_exp, "pre_data_fetch", 0, undefined))(offset);
                let retval = (((__l["m_specmem.read8"] ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
                (__l["m_exp.post_data_fetch"] ?? runtime.memberCall(members.m_exp, "post_data_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_data_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(offset);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](offset) : method_is_vram_write(runtime, offset))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                (__l["m_specmem.write8"] ?? runtime.memberCall(members.m_specmem, "write8", 0, undefined))(offset, data);
            }
            function method_spectrum_refresh_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["m_ula.is_snow_possible"] ?? runtime.memberCall(members.m_ula, "is_snow_possible", 0, undefined))(offset)) ? 0 : 1)) {
                    return;
                }
                let screen = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
                let x = ((runtime.subtract((__l["m_screen.hpos"] ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))(), (__l["screen.left"] ?? runtime.memberCall(screen, "left", 0, __l["left"]))())) & 0xff);
                let y = ((runtime.subtract((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), (__l["screen.top"] ?? runtime.memberCall(screen, "top", 0, __l["top"]))())) & 0xffff);
                let snow_pattern = ((0) & 0xff);
                let t_to_chunk_end = ((0) & 0xff);
                if (((Number(((x) % (16))) === Number(0)) ? 1 : 0)) {
                    snow_pattern = ((1) & 0xff);
                    t_to_chunk_end = ((4) & 0xff);
                }
                else {
                    if (((Number(((x) % (16))) === Number(4)) ? 1 : 0)) {
                        snow_pattern = ((2) & 0xff);
                        x = ((((x) + (8))) & 0xff);
                        t_to_chunk_end = ((6) & 0xff);
                    }
                    else {
                        return;
                    }
                }
                let px_addr_hi = ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (32))) << (2))))) & 0xffff);
                let attr_addr_hi = ((((6144) | (((((y) & (224))) << (2))))) & 0xffff);
                let addr_lo = ((((((((y) & (24))) << (2))) | (runtime.shiftRight(x, 3)))) & 0xff);
                let px_tmp = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((px_addr_hi) | (addr_lo)))) & 0xff);
                let attr_tmp = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((attr_addr_hi) | (addr_lo)))) & 0xff);
                if (((Number(snow_pattern) === Number(1)) ? 1 : 0)) {
                    let i = ((runtime.shiftRight(offset, 8)) & 0xff);
                    let r = ((((((offset) + (1))) & (127))) & 0xff);
                    let base = (runtime.overrides["snow_pattern1_base"] ? runtime.overrides["snow_pattern1_base"](i) : method_snow_pattern1_base(runtime, i));
                    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex(base, ((px_addr_hi) | (r))));
                    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex(base, ((attr_addr_hi) | (r))));
                }
                else {
                    if (((Number(snow_pattern) === Number(2)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((px_addr_hi) | (addr_lo))) - (1))));
                        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((attr_addr_hi) | (addr_lo))) - (1))));
                    }
                }
                (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))((-t_to_chunk_end));
                (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(t_to_chunk_end);
                runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), px_tmp);
                runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), attr_tmp);
            }
            function method_snow_pattern1_base(runtime, i_reg) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let is_alt_scr_selected = ((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) ? 1 : 0);
                let is_alt_scr = ((((i_reg) & (128))) ? 1 : 0);
                let i_pg = ((((is_alt_scr) ? ((((__l["m_bank_ram[3].entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __l["entry"]))()) & (5))) : (5))) & 0xff);
                return runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), ((((i_pg) | (((is_alt_scr_selected) << (1))))) << (14)));
            }
            function method_nomem_rq(runtime, offset, data) {
                const members = runtime.members;
            }
            function method_screen_update_spectrum(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scr = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
                let vis = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__l["screen.visible_area"] ?? runtime.memberCall(screen, "visible_area", 0, __l["visible_area"]))());
                if ((runtime.same(vis, scr) ? 0 : 1)) {
                    let bsides = [(__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["vis.top"] ?? runtime.memberCall(vis, "top", 0, __l["top"]))(), runtime.subtract((__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), 1)) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["vis.top"] ?? runtime.memberCall(vis, "top", 0, __l["top"]))(), runtime.subtract((__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), 1))), (__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), runtime.subtract((__l["scr.left"] ?? runtime.memberCall(scr, "left", 0, __l["left"]))(), 1), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), runtime.subtract((__l["scr.left"] ?? runtime.memberCall(scr, "left", 0, __l["left"]))(), 1), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))())), (__l["rectangle"] ? __l["rectangle"](runtime.add((__l["scr.right"] ?? runtime.memberCall(scr, "right", 0, __l["right"]))(), 1), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", runtime.add((__l["scr.right"] ?? runtime.memberCall(scr, "right", 0, __l["right"]))(), 1), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))())), (__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), runtime.add((__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))(), 1), (__l["vis.bottom"] ?? runtime.memberCall(vis, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), runtime.add((__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))(), 1), (__l["vis.bottom"] ?? runtime.memberCall(vis, "bottom", 0, __l["bottom"]))()))];
                    for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                        let border = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(runtime.and(runtime.readIndex(bsides, i), cliprect));
                        if ((((border).empty()) ? 0 : 1)) {
                            (runtime.overrides["spectrum_update_border"] ? runtime.overrides["spectrum_update_border"](screen, bitmap, border) : method_spectrum_update_border(runtime, screen, bitmap, border));
                        }
                    }
                }
                scr = runtime.andAssign(scr, cliprect);
                if ((((scr).empty()) ? 0 : 1)) {
                    (runtime.overrides["spectrum_update_screen"] ? runtime.overrides["spectrum_update_screen"](screen, bitmap, scr) : method_spectrum_update_screen(runtime, screen, bitmap, scr));
                }
                return 0;
            }
            function method_spectrum_update_border(runtime, screen, bitmap, border) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let mod = (((__l["m_ula.get_border_chunk_size"] ?? runtime.memberCall(members.m_ula, "get_border_chunk_size", 0, undefined))()) & 0xff);
                let btime = (((__l["m_ula.get_btime"] ?? runtime.memberCall(members.m_ula, "get_btime", 0, undefined))()) & 0xff);
                for (let y = (__l["border.top"] ?? runtime.memberCall(border, "top", 0, __l["top"]))(); ((Number(y) <= Number((__l["border.bottom"] ?? runtime.memberCall(border, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((y) + (1))) {
                    let pix = bitmap["pix&"](y, (__l["border.left"] ?? runtime.memberCall(border, "left", 0, __l["left"]))());
                    for (let x = (__l["border.left"] ?? runtime.memberCall(border, "left", 0, __l["left"]))(); ((Number(x) <= Number((__l["border.right"] ?? runtime.memberCall(border, "right", 0, __l["right"]))())) ? 1 : 0);) {
                        if (((Number(((x) % (mod))) === Number(btime)) ? 1 : 0)) {
                            pix = ({ ...(pix), offset: ((pix).offset - (btime)) });
                            x = ((x) - (btime));
                            for (let m = 0; ((Number(m) < Number(mod)) ? 1 : 0); m = ((m) + (1)), x = ((x) + (1))) {
                                runtime.pointerStore((() => { const previous = pix; pix = ({ ...(pix), offset: ((pix).offset + (1)) }); return previous; })(), (runtime.overrides["get_border_color"] ? runtime.overrides["get_border_color"](y, x) : method_get_border_color(runtime, y, x)));
                            }
                        }
                        else {
                            pix = ({ ...(pix), offset: ((pix).offset + (1)) });
                            x = ((x) + (1));
                        }
                    }
                }
            }
            function method_get_border_color(runtime, hpos, vpos) {
                const members = runtime.members;
                return (((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (7));
            }
            function method_spectrum_update_screen(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let invert_attrs = ((((runtime.divide((__l["screen.frame_number"] ?? runtime.memberCall(screen, "frame_number", 0, __l["frame_number"]))(), (members.m_frame_invert_count ?? runtime.member("m_frame_invert_count")))) & (1))) ? 1 : 0);
                for (let vpos = (((__l["cliprect.top"] ?? runtime.memberCall(cliprect, "top", 0, __l["top"]))()) & 0xffff); ((Number(vpos) <= Number((__l["cliprect.bottom"] ?? runtime.memberCall(cliprect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); vpos = ((((vpos) + (1))) & 0xffff)) {
                    let hpos = (((__l["cliprect.left"] ?? runtime.memberCall(cliprect, "left", 0, __l["left"]))()) & 0xffff);
                    let x = ((((hpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).left?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))))) & 0xffff);
                    let chunk_right = ((((x) & (8))) ? 1 : 0);
                    if (((Number(((x) % (8))) <= Number(((chunk_right) ? ((__l["m_ula.get_atime_right"] ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__l["m_ula.get_atime_left"] ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))())))) ? 1 : 0)) {
                        let shift = ((((x) % (8))) & 0xff);
                        x = ((((x) - (shift))) & 0xffff);
                        hpos = ((((hpos) - (shift))) & 0xffff);
                    }
                    else {
                        let shift = ((((8) - (((x) % (8))))) & 0xff);
                        x = ((((x) + (shift))) & 0xffff);
                        hpos = ((((hpos) + (shift))) & 0xffff);
                        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
                    }
                    let y = ((((vpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).top?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
                    let scr = runtime.addressOf((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (56))) << (2))))) | (runtime.shiftRight(x, 3))));
                    let attr = runtime.addressOf((members.m_screen_location ?? runtime.member("m_screen_location")), ((6144) | (((((((y) & (248))) << (2))) | (runtime.shiftRight(x, 3))))));
                    let pix = bitmap["pix&"](vpos, hpos);
                    while (((Number(((hpos) + (((chunk_right) ? ((__l["m_ula.get_atime_right"] ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__l["m_ula.get_atime_left"] ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))()))))) <= Number((__l["cliprect.right"] ?? runtime.memberCall(cliprect, "right", 0, __l["right"]))())) ? 1 : 0)) {
                        let ink = ((((((runtime.shiftRight(runtime.dereference(attr), 3)) & (8))) | (((runtime.dereference(attr)) & (7))))) & 0xffff);
                        let pap = ((((runtime.shiftRight(runtime.dereference(attr), 3)) & (15))) & 0xffff);
                        let pix8 = (((((((invert_attrs) && (((runtime.dereference(attr)) & (128)))) ? 1 : 0)) ? ((~runtime.dereference(scr))) : (runtime.dereference(scr)))) & 0xff);
                        for (let b = ((128) & 0xff); b; b = ((runtime.shiftRight(b, 1)) & 0xff), x = ((((x) + (1))) & 0xffff), hpos = ((((hpos) + (1))) & 0xffff)) {
                            runtime.pointerStore((() => { const previous = pix; pix = ({ ...(pix), offset: ((pix).offset + (1)) }); return previous; })(), ((((pix8) & (b))) ? (ink) : (pap)));
                        }
                        scr = ({ ...(scr), offset: ((scr).offset + (1)) });
                        attr = ({ ...(attr), offset: ((attr).offset + (1)) });
                        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
                    }
                }
            }
            function method_snapshot_cb(runtime, image) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let snapshot_size = (image).length();
                let snapshot_data = (__l["VECTOR_OF"] ? __l["VECTOR_OF"]("uint8_t", snapshot_size) : runtime.macro("VECTOR_OF", "uint8_t", snapshot_size));
                (__l["image.fread"] ?? runtime.memberCall(image, "fread", 0, __l["fread"]))(runtime.addressOf(snapshot_data, 0), snapshot_size);
                if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("snx")) {
                    if ((((((((((((Number(runtime.readIndex(snapshot_data, 0)) === Number(88)) ? 1 : 0)) && (((Number(runtime.readIndex(snapshot_data, 1)) === Number(83)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(snapshot_data, 2)) === Number(78)) ? 1 : 0))) ? 1 : 0)) && (((Number(runtime.readIndex(snapshot_data, 3)) === Number(65)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.invoke("setup_snx", runtime.addressOf(snapshot_data, 0), snapshot_size);
                    }
                    else {
                        if (((((((((Number(snapshot_size) === Number(49179)) ? 1 : 0)) || (((Number(snapshot_size) === Number(131103)) ? 1 : 0))) ? 1 : 0)) || (((Number(snapshot_size) === Number(147487)) ? 1 : 0))) ? 1 : 0)) {
                            runtime.invoke("setup_sna", runtime.addressOf(snapshot_data, 0), snapshot_size);
                        }
                        else {
                            return (__l["std::make_pair"] ? __l["std::make_pair"](3, "Invalid .SNX file header") : runtime.macro("std::make_pair", 3, "Invalid .SNX file header"));
                        }
                    }
                }
                else {
                    if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("sna")) {
                        if (((((((((Number(snapshot_size) !== Number(49179)) ? 1 : 0)) && (((Number(snapshot_size) !== Number(131103)) ? 1 : 0))) ? 1 : 0)) && (((Number(snapshot_size) !== Number(147487)) ? 1 : 0))) ? 1 : 0)) {
                            return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .SNA file size") : runtime.macro("std::make_pair", 4, "Invalid .SNA file size"));
                        }
                        runtime.invoke("setup_sna", runtime.addressOf(snapshot_data, 0), snapshot_size);
                    }
                    else {
                        if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("sp")) {
                            if (((((((((Number(runtime.readIndex(snapshot_data, 0)) !== Number(83)) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 1)) !== Number(80)) ? 1 : 0))) ? 1 : 0)) || ((((((Number(snapshot_size) !== Number(16422)) ? 1 : 0)) && (((Number(snapshot_size) !== Number(49190)) ? 1 : 0))) ? 1 : 0))) ? 1 : 0)) {
                                if (((Number(snapshot_size) !== Number(49184)) ? 1 : 0)) {
                                    return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .SP file size") : runtime.macro("std::make_pair", 4, "Invalid .SP file size"));
                                }
                            }
                            runtime.invoke("setup_sp", runtime.addressOf(snapshot_data, 0), snapshot_size);
                        }
                        else {
                            if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("ach")) {
                                if (((Number(snapshot_size) !== Number(65792)) ? 1 : 0)) {
                                    return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .ACH file size") : runtime.macro("std::make_pair", 4, "Invalid .ACH file size"));
                                }
                                runtime.invoke("setup_ach", runtime.addressOf(snapshot_data, 0), snapshot_size);
                            }
                            else {
                                if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("prg")) {
                                    if (((Number(snapshot_size) !== Number(49408)) ? 1 : 0)) {
                                        return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .PRG file size") : runtime.macro("std::make_pair", 4, "Invalid .PRG file size"));
                                    }
                                    runtime.invoke("setup_prg", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                }
                                else {
                                    if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("plusd")) {
                                        if ((((((Number(snapshot_size) !== Number(49174)) ? 1 : 0)) && (((Number(snapshot_size) !== Number(131095)) ? 1 : 0))) ? 1 : 0)) {
                                            return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .PLUSD file size") : runtime.macro("std::make_pair", 4, "Invalid .PLUSD file size"));
                                        }
                                        runtime.invoke("setup_plusd", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                    }
                                    else {
                                        if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("sem")) {
                                            if ((((((((((((((((((Number(runtime.readIndex(snapshot_data, 0)) !== Number(5)) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 1)) !== Number(83)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 2)) !== Number(80)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 3)) !== Number(69)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 4)) !== Number(67)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 5)) !== Number(49)) ? 1 : 0))) ? 1 : 0)) {
                                                if (((Number(snapshot_size) !== Number(49192)) ? 1 : 0)) {
                                                    return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .SEM file size") : runtime.macro("std::make_pair", 4, "Invalid .SEM file size"));
                                                }
                                            }
                                            runtime.invoke("setup_sem", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                        }
                                        else {
                                            if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("sit")) {
                                                if (((Number(snapshot_size) !== Number(65564)) ? 1 : 0)) {
                                                    return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .SIT file size") : runtime.macro("std::make_pair", 4, "Invalid .SIT file size"));
                                                }
                                                runtime.invoke("setup_sit", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                            }
                                            else {
                                                if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("zx")) {
                                                    if (((Number(snapshot_size) !== Number(49486)) ? 1 : 0)) {
                                                        return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .ZX file size") : runtime.macro("std::make_pair", 4, "Invalid .ZX file size"));
                                                    }
                                                    runtime.invoke("setup_zx", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                                }
                                                else {
                                                    if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("snp")) {
                                                        if (((Number(snapshot_size) !== Number(49183)) ? 1 : 0)) {
                                                            return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .SNP file size") : runtime.macro("std::make_pair", 4, "Invalid .SNP file size"));
                                                        }
                                                        runtime.invoke("setup_snp", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                                    }
                                                    else {
                                                        if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("frz")) {
                                                            if (((Number(snapshot_size) !== Number(131114)) ? 1 : 0)) {
                                                                return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .FRZ file size") : runtime.macro("std::make_pair", 4, "Invalid .FRZ file size"));
                                                            }
                                                            runtime.invoke("setup_frz", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                                        }
                                                        else {
                                                            if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("spg")) {
                                                                if ((((((((((((((((((((((((((((((((((((Number(runtime.readIndex(snapshot_data, 32)) !== Number(83)) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 33)) !== Number(112)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 34)) !== Number(101)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 35)) !== Number(99)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 36)) !== Number(116)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 37)) !== Number(114)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 38)) !== Number(117)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 39)) !== Number(109)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 40)) !== Number(80)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 41)) !== Number(114)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 42)) !== Number(111)) ? 1 : 0))) ? 1 : 0)) || (((Number(runtime.readIndex(snapshot_data, 43)) !== Number(103)) ? 1 : 0))) ? 1 : 0)) {
                                                                    return (__l["std::make_pair"] ? __l["std::make_pair"](3, "Invalid .SPG file header.") : runtime.macro("std::make_pair", 3, "Invalid .SPG file header."));
                                                                }
                                                                runtime.invoke("setup_spg", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                                            }
                                                            else {
                                                                runtime.invoke("setup_z80", runtime.addressOf(snapshot_data, 0), snapshot_size);
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                return (__l["std::make_pair"] ? __l["std::make_pair"]((__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))));
            }
            function method_snx_decompress_block(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let counthi = ((0) & 0xff);
                let countlo = ((0) & 0xff);
                let compress = ((0) & 0xff);
                let fill = ((0) & 0xff);
                let block = ((0) & 0xffff);
                let count = ((0) & 0xffff);
                let i = ((0) & 0xffff);
                let j = ((0) & 0xffff);
                let numbytes = ((0) & 0xffff);
                i = ((42) & 0xffff);
                numbytes = ((0) & 0xffff);
                while (((Number(numbytes) < Number(size)) ? 1 : 0)) {
                    counthi = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                    if (((Number(counthi) >= Number(224)) ? 1 : 0)) {
                        count = ((runtime.add(((counthi) & (15)), 1)) & 0xffff);
                        if (((Number(((counthi) & (240))) === Number(240)) ? 1 : 0)) {
                            compress = ((255) & 0xff);
                        }
                        else {
                            compress = ((0) & 0xff);
                        }
                        0;
                    }
                    else {
                        countlo = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        count = ((((((counthi) << (8))) | (countlo))) & 0xffff);
                        compress = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        0;
                    }
                    if (((Number(compress) === Number(255)) ? 1 : 0)) {
                        fill = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        0;
                        for (j = ((0) & 0xffff); ((Number(j) < Number(count)) ? 1 : 0); j = ((((j) + (1))) & 0xffff)) {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(((((16384) + (numbytes))) + (j)), fill);
                        }
                        numbytes = ((((numbytes) + (count))) & 0xffff);
                    }
                    else {
                        0;
                        j = ((0) & 0xffff);
                        while (((Number(j) < Number(count)) ? 1 : 0)) {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(runtime.add(((16384) + (numbytes)), (() => { const previous = j; j = ((((j) + (1))) & 0xffff); return previous; })()), runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff))));
                        }
                        numbytes = ((((numbytes) + (count))) & 0xffff);
                    }
                }
            }
            function method_border_update(runtime, data) {
                const members = runtime.members;
            }
            function method_page_basicrom(runtime) {
                const members = runtime.members;
                if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    return;
                }
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (16))) | 0);
                (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
            }
            function method_update_paging(runtime) {
                const members = runtime.members;
                if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    return;
                }
                if (((Number((members.m_port_1ffd_data ?? runtime.member("m_port_1ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
                }
                else {
                    if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1)) {
                        members.m_port_1ffd_data = ((4) | 0);
                    }
                    else {
                        members.m_port_1ffd_data = ((0) | 0);
                    }
                    (runtime.overrides["plus3_update_memory"] ? runtime.overrides["plus3_update_memory"]() : method_plus3_update_memory(runtime));
                }
            }
            function method_plus3_update_memory(runtime) {
                const members = runtime.members;
            }
            function method_bank3_set_page(runtime, page) {
                const members = runtime.members;
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (((page) & (7))))) | 0);
                (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
            }
            function method_spectrum_identify_z80(runtime, snapdata, snapsize) {
                const members = runtime.members;
                let lo = ((0) & 0xff);
                let hi = ((0) & 0xff);
                let data = ((0) & 0xff);
                if (((Number(snapsize) < Number(30)) ? 1 : 0)) {
                    return 0;
                }
                lo = ((((runtime.readIndex(snapdata, 6)) & (255))) & 0xff);
                hi = ((((runtime.readIndex(snapdata, 7)) & (255))) & 0xff);
                if ((((hi) || (lo)) ? 1 : 0)) {
                    return 1;
                }
                lo = ((((runtime.readIndex(snapdata, 30)) & (255))) & 0xff);
                hi = ((((runtime.readIndex(snapdata, 31)) & (255))) & 0xff);
                data = ((((runtime.readIndex(snapdata, 34)) & (255))) & 0xff);
                if ((((((Number(hi) === Number(0)) ? 1 : 0)) && (((Number(lo) === Number(23)) ? 1 : 0))) ? 1 : 0)) {
                    switch (data) {
                        case 0:
                        case 1:
                            {
                                return 2;
                            }
                        case 2:
                            {
                                return 3;
                            }
                        case 3:
                        case 4:
                            {
                                return 4;
                            }
                        case 128:
                            {
                                return 5;
                            }
                    }
                }
                if ((((((Number(hi) === Number(0)) ? 1 : 0)) && (((Number(lo) === Number(54)) ? 1 : 0))) ? 1 : 0)) {
                    switch (data) {
                        case 0:
                        case 1:
                        case 3:
                            {
                                return 2;
                            }
                        case 2:
                            {
                                return 3;
                            }
                        case 4:
                        case 5:
                        case 6:
                            {
                                return 4;
                            }
                        case 128:
                            {
                                return 5;
                            }
                    }
                }
                return 0;
            }
            function method_z80_decompress_block(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ch = ((0) & 0xff);
                let i = ((0) | 0);
                do {
                    ch = ((runtime.readIndex(source, 0)) & 0xff);
                    if (((Number(ch) === Number(237)) ? 1 : 0)) {
                        if (((Number(runtime.readIndex(source, 1)) === Number(237)) ? 1 : 0)) {
                            let count = ((0) & 0xff);
                            let data = ((0) & 0xff);
                            count = ((runtime.readIndex(source, 2)) & 0xff);
                            if (((Number(count) === Number(0)) ? 1 : 0)) {
                                return;
                            }
                            data = ((runtime.readIndex(source, 3)) & 0xff);
                            source = ({ ...(source), offset: ((source).offset + (4)) });
                            if (((Number(count) > Number(size)) ? 1 : 0)) {
                                count = ((size) & 0xff);
                            }
                            size = ((((size) - (count))) & 0xffff);
                            for (i = ((0) | 0); ((Number(i) < Number(count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, data);
                                dest = ((((dest) + (1))) & 0xffff);
                            }
                        }
                        else {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, ch);
                            dest = ((((dest) + (1))) & 0xffff);
                            source = ({ ...(source), offset: ((source).offset + (1)) });
                            size = ((((size) - (1))) & 0xffff);
                        }
                    }
                    else {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, ch);
                        dest = ((((dest) + (1))) & 0xffff);
                        source = ({ ...(source), offset: ((source).offset + (1)) });
                        size = ((((size) - (1))) & 0xffff);
                    }
                } while (((Number(size) > Number(0)) ? 1 : 0));
            }
            function method_ts2068_update_memory(runtime) {
                const members = runtime.members;
            }
            function method_decode(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let mask = [0, 0, 252, 248, 240, 224, 192, 128, 0];
                let no_bits = ((2) & 0xff);
                let bitbuf = (__l["bb_stream"] ? __l["bb_stream"](source, size) : runtime.macro("bb_stream", source, size));
                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                while ((((__l["bitbuf.overflow"] ?? runtime.memberCall(bitbuf, "overflow", 0, __l["overflow"]))()) ? 0 : 1)) {
                    while ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                    }
                    let len = ((0) & 0xffff);
                    let bb = ((0) & 0xff);
                    do {
                        bb = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                        len = ((((len) + (bb))) & 0xffff);
                    } while ((((((Number(bb) === Number(3)) ? 1 : 0)) && (((Number(len) !== Number(15)) ? 1 : 0))) ? 1 : 0));
                    let offset = ((0) << 16 >> 16);
                    if (((Number(len) === Number(0)) ? 1 : 0)) {
                        offset = ((runtime.add(65528, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(3))) << 16 >> 16);
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                        dest = ((((dest) + (1))) & 0xffff);
                        continue;
                    }
                    else {
                        if (((Number(len) === Number(1)) ? 1 : 0)) {
                            let code = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                            if ((((((Number(code) === Number(0)) ? 1 : 0)) || (((Number(code) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                offset = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) << 16 >> 16);
                                offset = ((((offset) + (((((code) ? (254) : (253))) << (8))))) << 16 >> 16);
                            }
                            else {
                                if (((Number(code) === Number(2)) ? 1 : 0)) {
                                    let b = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) & 0xff);
                                    if (((Number(b) >= Number(224)) ? 1 : 0)) {
                                        b = ((((b) << (1))) & 0xff);
                                        b = ((((b) + (1))) & 0xff);
                                        b = ((((b) ^ (2))) & 0xff);
                                        if (((Number(b) === Number(255)) ? 1 : 0)) {
                                            no_bits = ((((no_bits) + (1))) & 0xff);
                                            continue;
                                        }
                                        offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                        dest = ((((dest) + (1))) & 0xffff);
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                        dest = ((((dest) + (1))) & 0xffff);
                                        continue;
                                    }
                                    offset = ((((65280) + (b))) << 16 >> 16);
                                }
                                else {
                                    if (((Number(code) === Number(3)) ? 1 : 0)) {
                                        offset = ((runtime.add(65504, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(5))) << 16 >> 16);
                                    }
                                }
                            }
                            for (let i = 0; ((Number(i) < Number(2)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                            }
                            continue;
                        }
                        else {
                            if (((Number(len) === Number(3)) ? 1 : 0)) {
                                if ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                                    offset = ((runtime.add(65520, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(4))) << 16 >> 16);
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                    dest = ((((dest) + (1))) & 0xffff);
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                    dest = ((((dest) + (1))) & 0xffff);
                                    continue;
                                }
                                if ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                                    let bytes_no = ((runtime.add(6, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(4))) & 0xff);
                                    for (let i = ((0) & 0xff); ((Number(i) < Number(((bytes_no) << (1)))) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                    }
                                    continue;
                                }
                                len = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(7)) & 0xffff);
                                if (((Number(len) === Number(15)) ? 1 : 0)) {
                                    break;
                                }
                                if (((Number(len) < Number(15)) ? 1 : 0)) {
                                    len = ((runtime.add(((len) << (8)), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))())) & 0xffff);
                                }
                            }
                        }
                    }
                    if (((Number(len) === Number(2)) ? 1 : 0)) {
                        len = ((((len) + (1))) & 0xffff);
                    }
                    let code = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                    if (((Number(code) === Number(0)) ? 1 : 0)) {
                        offset = ((runtime.add(65024, (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))())) << 16 >> 16);
                    }
                    else {
                        if (((Number(code) === Number(1)) ? 1 : 0)) {
                            let b = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) & 0xff);
                            if (((Number(b) >= Number(224)) ? 1 : 0)) {
                                if (((Number(len) > Number(3)) ? 1 : 0)) {
                                    break;
                                }
                                b = ((((b) << (1))) & 0xff);
                                b = ((((b) + (1))) & 0xff);
                                b = ((((b) ^ (3))) & 0xff);
                                offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                                continue;
                            }
                            offset = ((((65280) + (b))) << 16 >> 16);
                        }
                        else {
                            if (((Number(code) === Number(2)) ? 1 : 0)) {
                                offset = ((runtime.add(65504, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(5))) << 16 >> 16);
                            }
                            else {
                                if (((Number(code) === Number(3)) ? 1 : 0)) {
                                    offset = ((((runtime.add(runtime.readIndex(mask, no_bits), (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(no_bits))) << (8))) << 16 >> 16);
                                    offset = ((((offset) + ((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()))) << 16 >> 16);
                                }
                            }
                        }
                    }
                    for (let i = ((0) & 0xffff); ((Number(i) < Number(len)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                        dest = ((((dest) + (1))) & 0xffff);
                    }
                }
            }
            function method_quickload_cb(runtime, image) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let quickload_size = (image).length();
                let quickload_data = (__l["VECTOR_OF"] ? __l["VECTOR_OF"]("uint8_t", quickload_size) : runtime.macro("VECTOR_OF", "uint8_t", quickload_size));
                (__l["image.fread"] ?? runtime.memberCall(image, "fread", 0, __l["fread"]))(runtime.addressOf(quickload_data, 0), quickload_size);
                if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("scr")) {
                    if ((((((Number(quickload_size) !== Number(6912)) ? 1 : 0)) && (((Number(quickload_size) !== Number(6144)) ? 1 : 0))) ? 1 : 0)) {
                        return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .SCR file size.") : runtime.macro("std::make_pair", 4, "Invalid .SCR file size."));
                    }
                    runtime.invoke("setup_scr", runtime.addressOf(quickload_data, 0), quickload_size);
                }
                else {
                    if ((__l["image.is_filetype"] ?? runtime.memberCall(image, "is_filetype", 0, __l["is_filetype"]))("raw")) {
                        if (((Number(quickload_size) !== Number(49161)) ? 1 : 0)) {
                            return (__l["std::make_pair"] ? __l["std::make_pair"](4, "Invalid .RAW file size.") : runtime.macro("std::make_pair", 4, "Invalid .RAW file size."));
                        }
                        runtime.invoke("setup_raw", runtime.addressOf(quickload_data, 0), quickload_size);
                    }
                }
                return (__l["std::make_pair"] ? __l["std::make_pair"]((__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))));
            }
            return {
                "spectrum_ula_r": method_spectrum_ula_r,
                "spectrum_ula_w": method_spectrum_ula_w,
                "spectrum_port_r": method_spectrum_port_r,
                "floating_bus_r": method_floating_bus_r,
                "get_screen_area": method_get_screen_area,
                "spectrum_port_w": method_spectrum_port_w,
                "spectrum_128_port_7ffd_w": method_spectrum_128_port_7ffd_w,
                "spectrum_128_update_memory": method_spectrum_128_update_memory,
                "spectrum_128_rom_r": method_spectrum_128_rom_r,
                "spectrum_128_rom_w": method_spectrum_128_rom_w,
                "spectrum_128_ram_r_1": method_spectrum_128_ram_r_1,
                "spectrum_128_ram_w_1": method_spectrum_128_ram_w_1,
                "is_vram_write": method_is_vram_write,
                "spectrum_128_ram_r_2": method_spectrum_128_ram_r_2,
                "spectrum_128_ram_w_2": method_spectrum_128_ram_w_2,
                "spectrum_128_ram_r_3": method_spectrum_128_ram_r_3,
                "spectrum_128_ram_w_3": method_spectrum_128_ram_w_3,
                "spectrum_128_pre_opcode_fetch_r": method_spectrum_128_pre_opcode_fetch_r,
                "spectrum_rom_w": method_spectrum_rom_w,
                "pre_opcode_fetch_r": method_pre_opcode_fetch_r,
                "spectrum_data_r": method_spectrum_data_r,
                "spectrum_data_w": method_spectrum_data_w,
                "spectrum_refresh_w": method_spectrum_refresh_w,
                "snow_pattern1_base": method_snow_pattern1_base,
                "nomem_rq": method_nomem_rq,
                "screen_update_spectrum": method_screen_update_spectrum,
                "spectrum_update_border": method_spectrum_update_border,
                "get_border_color": method_get_border_color,
                "spectrum_update_screen": method_spectrum_update_screen,
                "snapshot_cb": method_snapshot_cb,
                "snx_decompress_block": method_snx_decompress_block,
                "border_update": method_border_update,
                "page_basicrom": method_page_basicrom,
                "update_paging": method_update_paging,
                "plus3_update_memory": method_plus3_update_memory,
                "bank3_set_page": method_bank3_set_page,
                "spectrum_identify_z80": method_spectrum_identify_z80,
                "z80_decompress_block": method_z80_decompress_block,
                "ts2068_update_memory": method_ts2068_update_memory,
                "decode": method_decode,
                "quickload_cb": method_quickload_cb
            };
        })();
        return {
            "spectrum_state.spectrum_ula_r": methods["spectrum_ula_r"],
            "spectrum_state.spectrum_ula_w": methods["spectrum_ula_w"],
            "spectrum_state.spectrum_port_r": methods["spectrum_port_r"],
            "spectrum_state.floating_bus_r": methods["floating_bus_r"],
            "spectrum_state.get_screen_area": methods["get_screen_area"],
            "spectrum_state.spectrum_port_w": methods["spectrum_port_w"],
            "spectrum_state.spectrum_128_update_memory": methods["spectrum_128_update_memory"],
            "spectrum_state.is_vram_write": methods["is_vram_write"],
            "spectrum_state.spectrum_rom_w": methods["spectrum_rom_w"],
            "spectrum_state.pre_opcode_fetch_r": methods["pre_opcode_fetch_r"],
            "spectrum_state.spectrum_data_r": methods["spectrum_data_r"],
            "spectrum_state.spectrum_data_w": methods["spectrum_data_w"],
            "spectrum_state.snow_pattern1_base": methods["snow_pattern1_base"],
            "spectrum_state.screen_update_spectrum": methods["screen_update_spectrum"],
            "spectrum_state.spectrum_update_border": methods["spectrum_update_border"],
            "spectrum_state.get_border_color": methods["get_border_color"],
            "spectrum_state.spectrum_update_screen": methods["spectrum_update_screen"],
            "spectrum_state.snapshot_cb": methods["snapshot_cb"],
            "spectrum_state.snx_decompress_block": methods["snx_decompress_block"],
            "spectrum_state.border_update": methods["border_update"],
            "spectrum_state.page_basicrom": methods["page_basicrom"],
            "spectrum_state.update_paging": methods["update_paging"],
            "spectrum_state.plus3_update_memory": methods["plus3_update_memory"],
            "spectrum_state.bank3_set_page": methods["bank3_set_page"],
            "spectrum_state.ts2068_update_memory": methods["ts2068_update_memory"],
            "spectrum_state.quickload_cb": methods["quickload_cb"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_spectrum_ula_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_exp = members.m_exp ?? runtime.member("m_exp");
                (__l["m_ula.ula_r"] ?? runtime.memberCall(members.m_ula, "ula_r", 0, undefined))(offset);
                let lines = ((runtime.shiftRight(offset, 8)) | 0);
                let data = ((255) | 0);
                let cs_extra1 = (((((__l["m_io_plus0.read_safe"] ?? runtime.memberCall(members.m_io_plus0, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let cs_extra2 = (((((__l["m_io_plus1.read_safe"] ?? runtime.memberCall(members.m_io_plus1, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let cs_extra3 = (((((__l["m_io_plus2.read_safe"] ?? runtime.memberCall(members.m_io_plus2, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let ss_extra1 = (((((__l["m_io_plus3.read_safe"] ?? runtime.memberCall(members.m_io_plus3, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let ss_extra2 = (((((__l["m_io_plus4.read_safe"] ?? runtime.memberCall(members.m_io_plus4, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let joy1 = (((((__l["m_io_joy1.read_safe"] ?? runtime.memberCall(members.m_io_joy1, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                let joy2 = (((((__l["m_io_joy2.read_safe"] ?? runtime.memberCall(members.m_io_joy2, "read_safe", 0, __l["read_safe"]))(31)) & (31))) | 0);
                if (h_m_exp) {
                    data = (((__l["m_exp.iorq_r"] ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(offset)) | 0);
                }
                if (((Number(((lines) & (1))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line0.read"] ?? runtime.memberCall(members.m_io_line0, "read", 0, __l["read"]))()))) | 0);
                    if (((((((((Number(cs_extra1) !== Number(31)) ? 1 : 0)) || (((Number(cs_extra2) !== Number(31)) ? 1 : 0))) ? 1 : 0)) || (((Number(cs_extra3) !== Number(31)) ? 1 : 0))) ? 1 : 0)) {
                        data = ((((data) & (-2))) | 0);
                    }
                }
                if (((Number(((lines) & (2))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line1.read"] ?? runtime.memberCall(members.m_io_line1, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (4))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line2.read"] ?? runtime.memberCall(members.m_io_line2, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (8))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line3.read"] ?? runtime.memberCall(members.m_io_line3, "read", 0, __l["read"]))()) & (cs_extra1))) & (joy2))))) | 0);
                }
                if (((Number(((lines) & (16))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line4.read"] ?? runtime.memberCall(members.m_io_line4, "read", 0, __l["read"]))()) & (cs_extra2))) & (joy1))))) | 0);
                }
                if (((Number(((lines) & (32))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((__l["m_io_line5.read"] ?? runtime.memberCall(members.m_io_line5, "read", 0, __l["read"]))()) & (ss_extra1))))) | 0);
                }
                if (((Number(((lines) & (64))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((__l["m_io_line6.read"] ?? runtime.memberCall(members.m_io_line6, "read", 0, __l["read"]))()))) | 0);
                }
                if (((Number(((lines) & (128))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) & ((((((__l["m_io_line7.read"] ?? runtime.memberCall(members.m_io_line7, "read", 0, __l["read"]))()) & (cs_extra3))) & (ss_extra2))))) | 0);
                    if ((((((Number(ss_extra1) !== Number(31)) ? 1 : 0)) || (((Number(ss_extra2) !== Number(31)) ? 1 : 0))) ? 1 : 0)) {
                        data = ((((data) & (-3))) | 0);
                    }
                }
                data = ((((data) | (224))) | 0);
                if (((Number((__l["m_cassette.input"] ?? runtime.memberCall(members.m_cassette, "input", 0, undefined))()) > Number(0.0038)) ? 1 : 0)) {
                    data = ((((data) & (-65))) | 0);
                }
                if (((Number((((__l["m_io_config.read"] ?? runtime.memberCall(members.m_io_config, "read", 0, __l["read"]))()) & (128))) === Number(0)) ? 1 : 0)) {
                    data = ((((data) ^ (64))) | 0);
                }
                return data;
            }
            function method_spectrum_ula_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_exp = members.m_exp ?? runtime.member("m_exp");
                (__l["m_ula.ula_w"] ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
                let changed = (((((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) ^ (data))) & 0xff);
                if (((changed) & (7))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                if (((changed) & (24))) {
                    if ((((changed) >>> (3)) & 1)) {
                        (__l["m_cassette.output"] ?? runtime.memberCall(members.m_cassette, "output", 0, undefined))((((((data) >>> (3)) & 1)) ? ((-1)) : ((+1))));
                    }
                    (__l["m_speaker.level_w"] ?? runtime.memberCall(members.m_speaker, "level_w", 0, undefined))((((data) >>> (3)) & ((1 << (2)) - 1)));
                }
                if (h_m_exp) {
                    (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(offset, data);
                }
                members.m_port_fe_data = ((data) | 0);
            }
            function method_spectrum_port_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.io_r"] ?? runtime.memberCall(members.m_ula, "io_r", 0, undefined))(offset);
                if ((__l["m_exp.get_card_device"] ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
                    return (__l["m_exp.iorq_r"] ?? runtime.memberCall(members.m_exp, "iorq_r", 0, undefined))(((offset) | (1)));
                }
                return (runtime.overrides["floating_bus_r"] ? runtime.overrides["floating_bus_r"]() : method_floating_bus_r(runtime));
            }
            function method_floating_bus_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((255) & 0xff);
                if ((__l["m_ula.is_in_contended_area"] ?? runtime.memberCall(members.m_ula, "is_in_contended_area", 0, undefined))()) {
                    let vpos = (__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))();
                    let now = runtime.subtract((__l["m_maincpu.total_cycles"] ?? runtime.memberCall(members.m_maincpu, "total_cycles", 0, undefined))(), (__l["m_ula.get_irq_at"] ?? runtime.memberCall(members.m_ula, "get_irq_at", 0, undefined))());
                    let cf = runtime.add(((vpos) * ((__l["m_ula.get_video_line_clocks"] ?? runtime.memberCall(members.m_ula, "get_video_line_clocks", 0, undefined))())), (__l["m_ula.get_raster_contention_offset"] ?? runtime.memberCall(members.m_ula, "get_raster_contention_offset", 0, undefined))());
                    let ct = ((cf) + ((__l["m_ula.get_raster_line_clocks"] ?? runtime.memberCall(members.m_ula, "get_raster_line_clocks", 0, undefined))()));
                    if ((((((Number(cf) <= Number(now)) ? 1 : 0)) && (((Number(now) < Number(ct)) ? 1 : 0))) ? 1 : 0)) {
                        let clocks = ((now) - (cf));
                        if ((((((clocks) >>> (2)) & 1)) ? 0 : 1)) {
                            let y = ((((vpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).top?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
                            let x = ((runtime.add(runtime.shiftRight(clocks, 2), (((clocks) >>> (1)) & 1))) & 0xffff);
                            data = ((((((clocks) & (1))) ? (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), runtime.add(6144, ((((((y) & (248))) << (2))) | (x))))) : (runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (7))) << (8))) | (((((y) & (56))) << (2))))) | (((((y) & (192))) << (5))))) | (x)))))) & 0xff);
                        }
                    }
                }
                return data;
            }
            function method_get_screen_area(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                return (__l["rectangle"] ? __l["rectangle"](48, 303, 63, 254) : runtime.macro("rectangle", 48, 303, 63, 254));
            }
            function method_spectrum_port_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.io_w"] ?? runtime.memberCall(members.m_ula, "io_w", 0, undefined))(offset);
                if ((__l["m_exp.get_card_device"] ?? runtime.memberCall(members.m_exp, "get_card_device", 0, undefined))()) {
                    (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
                }
            }
            function method_spectrum_128_port_7ffd_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.ula_w"] ?? runtime.memberCall(members.m_ula, "ula_w", 0, undefined))(offset);
                if ((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (32))) {
                    return;
                }
                members.m_port_7ffd_data = ((data) | 0);
                (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
                (__l["m_exp.iorq_w"] ?? runtime.memberCall(members.m_exp, "iorq_w", 0, undefined))(((offset) | (1)), data);
            }
            function method_spectrum_128_update_memory(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                (__l["m_bank_rom[0].set_entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "set_entry", 0, __l["set_entry"]))(((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1));
                (__l["m_bank_ram[3].set_entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "set_entry", 0, __l["set_entry"]))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
                (__l["m_ula.bank3_pg_w"] ?? runtime.memberCall(members.m_ula, "bank3_pg_w", 0, undefined))((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) & (7)));
                (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) {
                    members.m_screen_location = runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 114688);
                }
                else {
                    members.m_screen_location = runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), 81920);
                }
            }
            function method_spectrum_128_rom_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_rom = members.m_bank_rom ?? runtime.member("m_bank_rom");
                return (((__l["m_exp.romcs"] ?? runtime.memberCall(members.m_exp, "romcs", 0, undefined))()) ? ((__l["m_exp.mreq_r"] ?? runtime.memberCall(members.m_exp, "mreq_r", 0, undefined))(offset)) : (runtime.readIndex((__l["m_bank_rom[0].base"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_rom, 0), "base", 0, __l["base"]))(), offset)));
            }
            function method_spectrum_128_rom_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_exp.mreq_w"] ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
            }
            function method_spectrum_128_ram_r_1(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((16384) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[1].base"] ? __l["m_bank_ram[1].base"]() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 1))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_1(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((16384) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[1].base"] ? __l["m_bank_ram[1].base"]() : (runtime.readIndex(h_m_bank_ram, 1)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 1))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 1), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_is_vram_write(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                return (((((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) && (((Number((__l["m_bank_ram[3].entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __l["entry"]))()) === Number(7)) ? 1 : 0))) ? 1 : 0)) ? ((((((Number(offset) >= Number(49152)) ? 1 : 0)) && (((Number(offset) < Number(56064)) ? 1 : 0))) ? 1 : 0)) : ((__l["spectrum_state::is_vram_write"] ? __l["spectrum_state::is_vram_write"](offset) : runtime.macro("spectrum_state::is_vram_write", offset))));
            }
            function method_spectrum_128_ram_r_2(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((32768) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[2].base"] ? __l["m_bank_ram[2].base"]() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 2))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_2(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((32768) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[2].base"] ? __l["m_bank_ram[2].base"]() : (runtime.readIndex(h_m_bank_ram, 2)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 2))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 2), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_spectrum_128_ram_r_3(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((49152) + (offset))) & 0xffff);
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(addr);
                return runtime.readIndex((__l["m_bank_ram[3].base"] ? __l["m_bank_ram[3].base"]() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 3))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : (__l["base"]?.() ?? 0)), offset);
            }
            function method_spectrum_128_ram_w_3(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let addr = ((((49152) + (offset))) & 0xffff);
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(addr);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](addr) : method_is_vram_write(runtime, addr))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                runtime.writeIndex((__l["m_bank_ram[3].base"] ? __l["m_bank_ram[3].base"]() : (runtime.readIndex(h_m_bank_ram, 3)) != null ? ((runtime.dereference(runtime.readIndex(h_m_bank_ram, 3))).base?.() ?? runtime.container(runtime.readIndex(h_m_bank_ram, 3), "base")) : (__l["base"]?.() ?? 0)), offset, data);
            }
            function method_spectrum_128_pre_opcode_fetch_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.m1"] ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
                (__l["m_exp.pre_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
                let retval = (((__l["m_program.read_byte"] ?? runtime.memberCall(members.m_program, "read_byte", 0, __l["read_byte"]))(offset)) & 0xff);
                (__l["m_exp.post_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_rom_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_exp.mreq_w"] ?? runtime.memberCall(members.m_exp, "mreq_w", 0, undefined))(offset, data);
            }
            function method_pre_opcode_fetch_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.m1"] ?? runtime.memberCall(members.m_ula, "m1", 0, undefined))(offset);
                (__l["m_exp.pre_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "pre_opcode_fetch", 0, undefined))(offset);
                let retval = (((__l["m_specmem.read8"] ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
                (__l["m_exp.post_opcode_fetch"] ?? runtime.memberCall(members.m_exp, "post_opcode_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_data_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.data_r"] ?? runtime.memberCall(members.m_ula, "data_r", 0, undefined))(offset);
                (__l["m_exp.pre_data_fetch"] ?? runtime.memberCall(members.m_exp, "pre_data_fetch", 0, undefined))(offset);
                let retval = (((__l["m_specmem.read8"] ?? runtime.memberCall(members.m_specmem, "read8", 0, undefined))(offset)) & 0xff);
                (__l["m_exp.post_data_fetch"] ?? runtime.memberCall(members.m_exp, "post_data_fetch", 0, undefined))(offset);
                return retval;
            }
            function method_spectrum_data_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_ula.data_w"] ?? runtime.memberCall(members.m_ula, "data_w", 0, undefined))(offset);
                if ((runtime.overrides["is_vram_write"] ? runtime.overrides["is_vram_write"](offset) : method_is_vram_write(runtime, offset))) {
                    (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                }
                (__l["m_specmem.write8"] ?? runtime.memberCall(members.m_specmem, "write8", 0, undefined))(offset, data);
            }
            function method_spectrum_refresh_w(runtime, offset, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if ((((__l["m_ula.is_snow_possible"] ?? runtime.memberCall(members.m_ula, "is_snow_possible", 0, undefined))(offset)) ? 0 : 1)) {
                    return;
                }
                let screen = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
                let x = ((runtime.subtract((__l["m_screen.hpos"] ?? runtime.memberCall(members.m_screen, "hpos", 0, undefined))(), (__l["screen.left"] ?? runtime.memberCall(screen, "left", 0, __l["left"]))())) & 0xff);
                let y = ((runtime.subtract((__l["m_screen.vpos"] ?? runtime.memberCall(members.m_screen, "vpos", 0, undefined))(), (__l["screen.top"] ?? runtime.memberCall(screen, "top", 0, __l["top"]))())) & 0xffff);
                let snow_pattern = ((0) & 0xff);
                let t_to_chunk_end = ((0) & 0xff);
                if (((Number(((x) % (16))) === Number(0)) ? 1 : 0)) {
                    snow_pattern = ((1) & 0xff);
                    t_to_chunk_end = ((4) & 0xff);
                }
                else {
                    if (((Number(((x) % (16))) === Number(4)) ? 1 : 0)) {
                        snow_pattern = ((2) & 0xff);
                        x = ((((x) + (8))) & 0xff);
                        t_to_chunk_end = ((6) & 0xff);
                    }
                    else {
                        return;
                    }
                }
                let px_addr_hi = ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (32))) << (2))))) & 0xffff);
                let attr_addr_hi = ((((6144) | (((((y) & (224))) << (2))))) & 0xffff);
                let addr_lo = ((((((((y) & (24))) << (2))) | (runtime.shiftRight(x, 3)))) & 0xff);
                let px_tmp = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((px_addr_hi) | (addr_lo)))) & 0xff);
                let attr_tmp = ((runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((attr_addr_hi) | (addr_lo)))) & 0xff);
                if (((Number(snow_pattern) === Number(1)) ? 1 : 0)) {
                    let i = ((runtime.shiftRight(offset, 8)) & 0xff);
                    let r = ((((((offset) + (1))) & (127))) & 0xff);
                    let base = (runtime.overrides["snow_pattern1_base"] ? runtime.overrides["snow_pattern1_base"](i) : method_snow_pattern1_base(runtime, i));
                    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex(base, ((px_addr_hi) | (r))));
                    runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex(base, ((attr_addr_hi) | (r))));
                }
                else {
                    if (((Number(snow_pattern) === Number(2)) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((px_addr_hi) | (addr_lo))) - (1))));
                        runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), runtime.readIndex((members.m_screen_location ?? runtime.member("m_screen_location")), ((((attr_addr_hi) | (addr_lo))) - (1))));
                    }
                }
                (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))((-t_to_chunk_end));
                (__l["m_screen.update_now"] ?? runtime.memberCall(members.m_screen, "update_now", 0, undefined))();
                (__l["m_maincpu.adjust_icount"] ?? runtime.memberCall(members.m_maincpu, "adjust_icount", 0, undefined))(t_to_chunk_end);
                runtime.writeIndex(runtime.writableMember("m_screen_location"), ((px_addr_hi) | (addr_lo)), px_tmp);
                runtime.writeIndex(runtime.writableMember("m_screen_location"), ((attr_addr_hi) | (addr_lo)), attr_tmp);
            }
            function method_snow_pattern1_base(runtime, i_reg) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_bank_ram = members.m_bank_ram ?? runtime.member("m_bank_ram");
                let is_alt_scr_selected = ((((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (3)) & 1)) ? 1 : 0);
                let is_alt_scr = ((((i_reg) & (128))) ? 1 : 0);
                let i_pg = ((((is_alt_scr) ? ((((__l["m_bank_ram[3].entry"] ?? runtime.memberCall(runtime.readIndex(h_m_bank_ram, 3), "entry", 0, __l["entry"]))()) & (5))) : (5))) & 0xff);
                return runtime.add((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), ((((i_pg) | (((is_alt_scr_selected) << (1))))) << (14)));
            }
            function method_nomem_rq(runtime, offset, data) {
                const members = runtime.members;
            }
            function method_screen_update_spectrum(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let scr = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)));
                let vis = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))((__l["screen.visible_area"] ?? runtime.memberCall(screen, "visible_area", 0, __l["visible_area"]))());
                if ((runtime.same(vis, scr) ? 0 : 1)) {
                    let bsides = [(__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["vis.top"] ?? runtime.memberCall(vis, "top", 0, __l["top"]))(), runtime.subtract((__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), 1)) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["vis.top"] ?? runtime.memberCall(vis, "top", 0, __l["top"]))(), runtime.subtract((__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), 1))), (__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), runtime.subtract((__l["scr.left"] ?? runtime.memberCall(scr, "left", 0, __l["left"]))(), 1), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), runtime.subtract((__l["scr.left"] ?? runtime.memberCall(scr, "left", 0, __l["left"]))(), 1), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))())), (__l["rectangle"] ? __l["rectangle"](runtime.add((__l["scr.right"] ?? runtime.memberCall(scr, "right", 0, __l["right"]))(), 1), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", runtime.add((__l["scr.right"] ?? runtime.memberCall(scr, "right", 0, __l["right"]))(), 1), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), (__l["scr.top"] ?? runtime.memberCall(scr, "top", 0, __l["top"]))(), (__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))())), (__l["rectangle"] ? __l["rectangle"]((__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), runtime.add((__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))(), 1), (__l["vis.bottom"] ?? runtime.memberCall(vis, "bottom", 0, __l["bottom"]))()) : runtime.macro("rectangle", (__l["vis.left"] ?? runtime.memberCall(vis, "left", 0, __l["left"]))(), (__l["vis.right"] ?? runtime.memberCall(vis, "right", 0, __l["right"]))(), runtime.add((__l["scr.bottom"] ?? runtime.memberCall(scr, "bottom", 0, __l["bottom"]))(), 1), (__l["vis.bottom"] ?? runtime.memberCall(vis, "bottom", 0, __l["bottom"]))()))];
                    for (let i = 0; ((Number(i) < Number(4)) ? 1 : 0); i = ((i) + (1))) {
                        let border = ((value) => Object.assign(Object.create(Object.getPrototypeOf(value)), value))(runtime.and(runtime.readIndex(bsides, i), cliprect));
                        if ((((border).empty()) ? 0 : 1)) {
                            (runtime.overrides["spectrum_update_border"] ? runtime.overrides["spectrum_update_border"](screen, bitmap, border) : method_spectrum_update_border(runtime, screen, bitmap, border));
                        }
                    }
                }
                scr = runtime.andAssign(scr, cliprect);
                if ((((scr).empty()) ? 0 : 1)) {
                    (runtime.overrides["spectrum_update_screen"] ? runtime.overrides["spectrum_update_screen"](screen, bitmap, scr) : method_spectrum_update_screen(runtime, screen, bitmap, scr));
                }
                return 0;
            }
            function method_spectrum_update_border(runtime, screen, bitmap, border) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let mod = (((__l["m_ula.get_border_chunk_size"] ?? runtime.memberCall(members.m_ula, "get_border_chunk_size", 0, undefined))()) & 0xff);
                let btime = (((__l["m_ula.get_btime"] ?? runtime.memberCall(members.m_ula, "get_btime", 0, undefined))()) & 0xff);
                for (let y = (__l["border.top"] ?? runtime.memberCall(border, "top", 0, __l["top"]))(); ((Number(y) <= Number((__l["border.bottom"] ?? runtime.memberCall(border, "bottom", 0, __l["bottom"]))())) ? 1 : 0); y = ((y) + (1))) {
                    let pix = bitmap["pix&"](y, (__l["border.left"] ?? runtime.memberCall(border, "left", 0, __l["left"]))());
                    for (let x = (__l["border.left"] ?? runtime.memberCall(border, "left", 0, __l["left"]))(); ((Number(x) <= Number((__l["border.right"] ?? runtime.memberCall(border, "right", 0, __l["right"]))())) ? 1 : 0);) {
                        if (((Number(((x) % (mod))) === Number(btime)) ? 1 : 0)) {
                            pix = ({ ...(pix), offset: ((pix).offset - (btime)) });
                            x = ((x) - (btime));
                            for (let m = 0; ((Number(m) < Number(mod)) ? 1 : 0); m = ((m) + (1)), x = ((x) + (1))) {
                                runtime.pointerStore((() => { const previous = pix; pix = ({ ...(pix), offset: ((pix).offset + (1)) }); return previous; })(), (runtime.overrides["get_border_color"] ? runtime.overrides["get_border_color"](y, x) : method_get_border_color(runtime, y, x)));
                            }
                        }
                        else {
                            pix = ({ ...(pix), offset: ((pix).offset + (1)) });
                            x = ((x) + (1));
                        }
                    }
                }
            }
            function method_get_border_color(runtime, hpos, vpos) {
                const members = runtime.members;
                return (((members.m_port_fe_data ?? runtime.member("m_port_fe_data"))) & (7));
            }
            function method_spectrum_update_screen(runtime, screen, bitmap, cliprect) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let invert_attrs = ((((runtime.divide((__l["screen.frame_number"] ?? runtime.memberCall(screen, "frame_number", 0, __l["frame_number"]))(), (members.m_frame_invert_count ?? runtime.member("m_frame_invert_count")))) & (1))) ? 1 : 0);
                for (let vpos = (((__l["cliprect.top"] ?? runtime.memberCall(cliprect, "top", 0, __l["top"]))()) & 0xffff); ((Number(vpos) <= Number((__l["cliprect.bottom"] ?? runtime.memberCall(cliprect, "bottom", 0, __l["bottom"]))())) ? 1 : 0); vpos = ((((vpos) + (1))) & 0xffff)) {
                    let hpos = (((__l["cliprect.left"] ?? runtime.memberCall(cliprect, "left", 0, __l["left"]))()) & 0xffff);
                    let x = ((((hpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).left?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "left"))))) & 0xffff);
                    let chunk_right = ((((x) & (8))) ? 1 : 0);
                    if (((Number(((x) % (8))) <= Number(((chunk_right) ? ((__l["m_ula.get_atime_right"] ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__l["m_ula.get_atime_left"] ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))())))) ? 1 : 0)) {
                        let shift = ((((x) % (8))) & 0xff);
                        x = ((((x) - (shift))) & 0xffff);
                        hpos = ((((hpos) - (shift))) & 0xffff);
                    }
                    else {
                        let shift = ((((8) - (((x) % (8))))) & 0xff);
                        x = ((((x) + (shift))) & 0xffff);
                        hpos = ((((hpos) + (shift))) & 0xffff);
                        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
                    }
                    let y = ((((vpos) - (((runtime.dereference((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)))).top?.() ?? runtime.container((runtime.overrides["get_screen_area"] ? runtime.overrides["get_screen_area"]() : method_get_screen_area(runtime)), "top"))))) & 0xffff);
                    let scr = runtime.addressOf((members.m_screen_location ?? runtime.member("m_screen_location")), ((((((((((y) & (192))) << (5))) | (((((y) & (7))) << (8))))) | (((((y) & (56))) << (2))))) | (runtime.shiftRight(x, 3))));
                    let attr = runtime.addressOf((members.m_screen_location ?? runtime.member("m_screen_location")), ((6144) | (((((((y) & (248))) << (2))) | (runtime.shiftRight(x, 3))))));
                    let pix = bitmap["pix&"](vpos, hpos);
                    while (((Number(((hpos) + (((chunk_right) ? ((__l["m_ula.get_atime_right"] ?? runtime.memberCall(members.m_ula, "get_atime_right", 0, undefined))()) : ((__l["m_ula.get_atime_left"] ?? runtime.memberCall(members.m_ula, "get_atime_left", 0, undefined))()))))) <= Number((__l["cliprect.right"] ?? runtime.memberCall(cliprect, "right", 0, __l["right"]))())) ? 1 : 0)) {
                        let ink = ((((((runtime.shiftRight(runtime.dereference(attr), 3)) & (8))) | (((runtime.dereference(attr)) & (7))))) & 0xffff);
                        let pap = ((((runtime.shiftRight(runtime.dereference(attr), 3)) & (15))) & 0xffff);
                        let pix8 = (((((((invert_attrs) && (((runtime.dereference(attr)) & (128)))) ? 1 : 0)) ? ((~runtime.dereference(scr))) : (runtime.dereference(scr)))) & 0xff);
                        for (let b = ((128) & 0xff); b; b = ((runtime.shiftRight(b, 1)) & 0xff), x = ((((x) + (1))) & 0xffff), hpos = ((((hpos) + (1))) & 0xffff)) {
                            runtime.pointerStore((() => { const previous = pix; pix = ({ ...(pix), offset: ((pix).offset + (1)) }); return previous; })(), ((((pix8) & (b))) ? (ink) : (pap)));
                        }
                        scr = ({ ...(scr), offset: ((scr).offset + (1)) });
                        attr = ({ ...(attr), offset: ((attr).offset + (1)) });
                        chunk_right = ((((chunk_right) ? 0 : 1)) ? 1 : 0);
                    }
                }
            }
            function method_snx_decompress_block(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let counthi = ((0) & 0xff);
                let countlo = ((0) & 0xff);
                let compress = ((0) & 0xff);
                let fill = ((0) & 0xff);
                let block = ((0) & 0xffff);
                let count = ((0) & 0xffff);
                let i = ((0) & 0xffff);
                let j = ((0) & 0xffff);
                let numbytes = ((0) & 0xffff);
                i = ((42) & 0xffff);
                numbytes = ((0) & 0xffff);
                while (((Number(numbytes) < Number(size)) ? 1 : 0)) {
                    counthi = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                    if (((Number(counthi) >= Number(224)) ? 1 : 0)) {
                        count = ((runtime.add(((counthi) & (15)), 1)) & 0xffff);
                        if (((Number(((counthi) & (240))) === Number(240)) ? 1 : 0)) {
                            compress = ((255) & 0xff);
                        }
                        else {
                            compress = ((0) & 0xff);
                        }
                        0;
                    }
                    else {
                        countlo = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        count = ((((((counthi) << (8))) | (countlo))) & 0xffff);
                        compress = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        0;
                    }
                    if (((Number(compress) === Number(255)) ? 1 : 0)) {
                        fill = ((runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff)))) & 0xff);
                        0;
                        for (j = ((0) & 0xffff); ((Number(j) < Number(count)) ? 1 : 0); j = ((((j) + (1))) & 0xffff)) {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(((((16384) + (numbytes))) + (j)), fill);
                        }
                        numbytes = ((((numbytes) + (count))) & 0xffff);
                    }
                    else {
                        0;
                        j = ((0) & 0xffff);
                        while (((Number(j) < Number(count)) ? 1 : 0)) {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(runtime.add(((16384) + (numbytes)), (() => { const previous = j; j = ((((j) + (1))) & 0xffff); return previous; })()), runtime.readIndex(source, (i = ((((i) + (1))) & 0xffff))));
                        }
                        numbytes = ((((numbytes) + (count))) & 0xffff);
                    }
                }
            }
            function method_page_basicrom(runtime) {
                const members = runtime.members;
                if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    return;
                }
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (16))) | 0);
                (runtime.overrides["update_paging"] ? runtime.overrides["update_paging"]() : method_update_paging(runtime));
            }
            function method_update_paging(runtime) {
                const members = runtime.members;
                if (((Number((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    return;
                }
                if (((Number((members.m_port_1ffd_data ?? runtime.member("m_port_1ffd_data"))) === Number(-1)) ? 1 : 0)) {
                    (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
                }
                else {
                    if (((((members.m_port_7ffd_data ?? runtime.member("m_port_7ffd_data"))) >>> (4)) & 1)) {
                        members.m_port_1ffd_data = ((4) | 0);
                    }
                    else {
                        members.m_port_1ffd_data = ((0) | 0);
                    }
                    (runtime.overrides["plus3_update_memory"] ? runtime.overrides["plus3_update_memory"]() : method_plus3_update_memory(runtime));
                }
            }
            function method_plus3_update_memory(runtime) {
                const members = runtime.members;
            }
            function method_border_update(runtime, data) {
                const members = runtime.members;
            }
            function method_bank3_set_page(runtime, page) {
                const members = runtime.members;
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) & (248))) | 0);
                members.m_port_7ffd_data = ((((members.m_port_7ffd_data) | (((page) & (7))))) | 0);
                (runtime.overrides["spectrum_128_update_memory"] ? runtime.overrides["spectrum_128_update_memory"]() : method_spectrum_128_update_memory(runtime));
            }
            function method_decode(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let mask = [0, 0, 252, 248, 240, 224, 192, 128, 0];
                let no_bits = ((2) & 0xff);
                let bitbuf = (__l["bb_stream"] ? __l["bb_stream"](source, size) : runtime.macro("bb_stream", source, size));
                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                while ((((__l["bitbuf.overflow"] ?? runtime.memberCall(bitbuf, "overflow", 0, __l["overflow"]))()) ? 0 : 1)) {
                    while ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                    }
                    let len = ((0) & 0xffff);
                    let bb = ((0) & 0xff);
                    do {
                        bb = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                        len = ((((len) + (bb))) & 0xffff);
                    } while ((((((Number(bb) === Number(3)) ? 1 : 0)) && (((Number(len) !== Number(15)) ? 1 : 0))) ? 1 : 0));
                    let offset = ((0) << 16 >> 16);
                    if (((Number(len) === Number(0)) ? 1 : 0)) {
                        offset = ((runtime.add(65528, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(3))) << 16 >> 16);
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                        dest = ((((dest) + (1))) & 0xffff);
                        continue;
                    }
                    else {
                        if (((Number(len) === Number(1)) ? 1 : 0)) {
                            let code = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                            if ((((((Number(code) === Number(0)) ? 1 : 0)) || (((Number(code) === Number(1)) ? 1 : 0))) ? 1 : 0)) {
                                offset = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) << 16 >> 16);
                                offset = ((((offset) + (((((code) ? (254) : (253))) << (8))))) << 16 >> 16);
                            }
                            else {
                                if (((Number(code) === Number(2)) ? 1 : 0)) {
                                    let b = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) & 0xff);
                                    if (((Number(b) >= Number(224)) ? 1 : 0)) {
                                        b = ((((b) << (1))) & 0xff);
                                        b = ((((b) + (1))) & 0xff);
                                        b = ((((b) ^ (2))) & 0xff);
                                        if (((Number(b) === Number(255)) ? 1 : 0)) {
                                            no_bits = ((((no_bits) + (1))) & 0xff);
                                            continue;
                                        }
                                        offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                        dest = ((((dest) + (1))) & 0xffff);
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                        dest = ((((dest) + (1))) & 0xffff);
                                        continue;
                                    }
                                    offset = ((((65280) + (b))) << 16 >> 16);
                                }
                                else {
                                    if (((Number(code) === Number(3)) ? 1 : 0)) {
                                        offset = ((runtime.add(65504, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(5))) << 16 >> 16);
                                    }
                                }
                            }
                            for (let i = 0; ((Number(i) < Number(2)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                            }
                            continue;
                        }
                        else {
                            if (((Number(len) === Number(3)) ? 1 : 0)) {
                                if ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                                    offset = ((runtime.add(65520, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(4))) << 16 >> 16);
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                    dest = ((((dest) + (1))) & 0xffff);
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                    (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                    dest = ((((dest) + (1))) & 0xffff);
                                    continue;
                                }
                                if ((__l["bitbuf.get_bit"] ?? runtime.memberCall(bitbuf, "get_bit", 0, __l["get_bit"]))()) {
                                    let bytes_no = ((runtime.add(6, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(4))) & 0xff);
                                    for (let i = ((0) & 0xff); ((Number(i) < Number(((bytes_no) << (1)))) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                    }
                                    continue;
                                }
                                len = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(7)) & 0xffff);
                                if (((Number(len) === Number(15)) ? 1 : 0)) {
                                    break;
                                }
                                if (((Number(len) < Number(15)) ? 1 : 0)) {
                                    len = ((runtime.add(((len) << (8)), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))())) & 0xffff);
                                }
                            }
                        }
                    }
                    if (((Number(len) === Number(2)) ? 1 : 0)) {
                        len = ((((len) + (1))) & 0xffff);
                    }
                    let code = (((__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(2)) & 0xff);
                    if (((Number(code) === Number(0)) ? 1 : 0)) {
                        offset = ((runtime.add(65024, (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))())) << 16 >> 16);
                    }
                    else {
                        if (((Number(code) === Number(1)) ? 1 : 0)) {
                            let b = (((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()) & 0xff);
                            if (((Number(b) >= Number(224)) ? 1 : 0)) {
                                if (((Number(len) > Number(3)) ? 1 : 0)) {
                                    break;
                                }
                                b = ((((b) << (1))) & 0xff);
                                b = ((((b) + (1))) & 0xff);
                                b = ((((b) ^ (3))) & 0xff);
                                offset = ((((((65280) + (b))) - (15))) << 16 >> 16);
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))((() => { const previous = dest; dest = ((((dest) + (1))) & 0xffff); return previous; })(), (__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))());
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                                dest = ((((dest) + (1))) & 0xffff);
                                continue;
                            }
                            offset = ((((65280) + (b))) << 16 >> 16);
                        }
                        else {
                            if (((Number(code) === Number(2)) ? 1 : 0)) {
                                offset = ((runtime.add(65504, (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(5))) << 16 >> 16);
                            }
                            else {
                                if (((Number(code) === Number(3)) ? 1 : 0)) {
                                    offset = ((((runtime.add(runtime.readIndex(mask, no_bits), (__l["bitbuf.get_bits"] ?? runtime.memberCall(bitbuf, "get_bits", 0, __l["get_bits"]))(no_bits))) << (8))) << 16 >> 16);
                                    offset = ((((offset) + ((__l["bitbuf.get_byte"] ?? runtime.memberCall(bitbuf, "get_byte", 0, __l["get_byte"]))()))) << 16 >> 16);
                                }
                            }
                        }
                    }
                    for (let i = ((0) & 0xffff); ((Number(i) < Number(len)) ? 1 : 0); i = ((((i) + (1))) & 0xffff)) {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, (__l["space.read_byte"] ?? runtime.memberCall(space, "read_byte", 0, __l["read_byte"]))(((dest) + (offset))));
                        dest = ((((dest) + (1))) & 0xffff);
                    }
                }
            }
            function method_spectrum_identify_z80(runtime, snapdata, snapsize) {
                const members = runtime.members;
                let lo = ((0) & 0xff);
                let hi = ((0) & 0xff);
                let data = ((0) & 0xff);
                if (((Number(snapsize) < Number(30)) ? 1 : 0)) {
                    return 0;
                }
                lo = ((((runtime.readIndex(snapdata, 6)) & (255))) & 0xff);
                hi = ((((runtime.readIndex(snapdata, 7)) & (255))) & 0xff);
                if ((((hi) || (lo)) ? 1 : 0)) {
                    return 1;
                }
                lo = ((((runtime.readIndex(snapdata, 30)) & (255))) & 0xff);
                hi = ((((runtime.readIndex(snapdata, 31)) & (255))) & 0xff);
                data = ((((runtime.readIndex(snapdata, 34)) & (255))) & 0xff);
                if ((((((Number(hi) === Number(0)) ? 1 : 0)) && (((Number(lo) === Number(23)) ? 1 : 0))) ? 1 : 0)) {
                    switch (data) {
                        case 0:
                        case 1:
                            {
                                return 2;
                            }
                        case 2:
                            {
                                return 3;
                            }
                        case 3:
                        case 4:
                            {
                                return 4;
                            }
                        case 128:
                            {
                                return 5;
                            }
                    }
                }
                if ((((((Number(hi) === Number(0)) ? 1 : 0)) && (((Number(lo) === Number(54)) ? 1 : 0))) ? 1 : 0)) {
                    switch (data) {
                        case 0:
                        case 1:
                        case 3:
                            {
                                return 2;
                            }
                        case 2:
                            {
                                return 3;
                            }
                        case 4:
                        case 5:
                        case 6:
                            {
                                return 4;
                            }
                        case 128:
                            {
                                return 5;
                            }
                    }
                }
                return 0;
            }
            function method_z80_decompress_block(runtime, space, source, dest, size) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let ch = ((0) & 0xff);
                let i = ((0) | 0);
                do {
                    ch = ((runtime.readIndex(source, 0)) & 0xff);
                    if (((Number(ch) === Number(237)) ? 1 : 0)) {
                        if (((Number(runtime.readIndex(source, 1)) === Number(237)) ? 1 : 0)) {
                            let count = ((0) & 0xff);
                            let data = ((0) & 0xff);
                            count = ((runtime.readIndex(source, 2)) & 0xff);
                            if (((Number(count) === Number(0)) ? 1 : 0)) {
                                return;
                            }
                            data = ((runtime.readIndex(source, 3)) & 0xff);
                            source = ({ ...(source), offset: ((source).offset + (4)) });
                            if (((Number(count) > Number(size)) ? 1 : 0)) {
                                count = ((size) & 0xff);
                            }
                            size = ((((size) - (count))) & 0xffff);
                            for (i = ((0) | 0); ((Number(i) < Number(count)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, data);
                                dest = ((((dest) + (1))) & 0xffff);
                            }
                        }
                        else {
                            (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, ch);
                            dest = ((((dest) + (1))) & 0xffff);
                            source = ({ ...(source), offset: ((source).offset + (1)) });
                            size = ((((size) - (1))) & 0xffff);
                        }
                    }
                    else {
                        (__l["space.write_byte"] ?? runtime.memberCall(space, "write_byte", 0, __l["write_byte"]))(dest, ch);
                        dest = ((((dest) + (1))) & 0xffff);
                        source = ({ ...(source), offset: ((source).offset + (1)) });
                        size = ((((size) - (1))) & 0xffff);
                    }
                } while (((Number(size) > Number(0)) ? 1 : 0));
            }
            function method_ts2068_update_memory(runtime) {
                const members = runtime.members;
            }
            return {
                "spectrum_ula_r": method_spectrum_ula_r,
                "spectrum_ula_w": method_spectrum_ula_w,
                "spectrum_port_r": method_spectrum_port_r,
                "floating_bus_r": method_floating_bus_r,
                "get_screen_area": method_get_screen_area,
                "spectrum_port_w": method_spectrum_port_w,
                "spectrum_128_port_7ffd_w": method_spectrum_128_port_7ffd_w,
                "spectrum_128_update_memory": method_spectrum_128_update_memory,
                "spectrum_128_rom_r": method_spectrum_128_rom_r,
                "spectrum_128_rom_w": method_spectrum_128_rom_w,
                "spectrum_128_ram_r_1": method_spectrum_128_ram_r_1,
                "spectrum_128_ram_w_1": method_spectrum_128_ram_w_1,
                "is_vram_write": method_is_vram_write,
                "spectrum_128_ram_r_2": method_spectrum_128_ram_r_2,
                "spectrum_128_ram_w_2": method_spectrum_128_ram_w_2,
                "spectrum_128_ram_r_3": method_spectrum_128_ram_r_3,
                "spectrum_128_ram_w_3": method_spectrum_128_ram_w_3,
                "spectrum_128_pre_opcode_fetch_r": method_spectrum_128_pre_opcode_fetch_r,
                "spectrum_rom_w": method_spectrum_rom_w,
                "pre_opcode_fetch_r": method_pre_opcode_fetch_r,
                "spectrum_data_r": method_spectrum_data_r,
                "spectrum_data_w": method_spectrum_data_w,
                "spectrum_refresh_w": method_spectrum_refresh_w,
                "snow_pattern1_base": method_snow_pattern1_base,
                "nomem_rq": method_nomem_rq,
                "screen_update_spectrum": method_screen_update_spectrum,
                "spectrum_update_border": method_spectrum_update_border,
                "get_border_color": method_get_border_color,
                "spectrum_update_screen": method_spectrum_update_screen,
                "snx_decompress_block": method_snx_decompress_block,
                "page_basicrom": method_page_basicrom,
                "update_paging": method_update_paging,
                "plus3_update_memory": method_plus3_update_memory,
                "border_update": method_border_update,
                "bank3_set_page": method_bank3_set_page,
                "decode": method_decode,
                "spectrum_identify_z80": method_spectrum_identify_z80,
                "z80_decompress_block": method_z80_decompress_block,
                "ts2068_update_memory": method_ts2068_update_memory
            };
        })();
        return {
            "hrust_decoder.decode": methods["decode"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["VECTOR_OF", "adjust", "base", "bb_stream", "bitbuf.get_bit", "bitbuf.get_bits", "bitbuf.get_byte", "bitbuf.overflow", "border.bottom", "border.left", "border.right", "border.top", "bottom", "cliprect.bottom", "cliprect.left", "cliprect.right", "cliprect.top", "entry", "frame_number", "fread", "get_bit", "get_bits", "get_byte", "image.fread", "image.is_filetype", "is_filetype", "left", "m_bank_ram[1].base", "m_bank_ram[2].base", "m_bank_ram[3].base", "m_bank_ram[3].entry", "m_bank_ram[3].set_entry", "m_bank_rom[0].base", "m_bank_rom[0].set_entry", "m_cassette.input", "m_cassette.output", "m_exp.get_card_device", "m_exp.iorq_r", "m_exp.iorq_w", "m_exp.mreq_r", "m_exp.mreq_w", "m_exp.post_data_fetch", "m_exp.post_opcode_fetch", "m_exp.pre_data_fetch", "m_exp.pre_opcode_fetch", "m_exp.romcs", "m_io_config.read", "m_io_joy1.read_safe", "m_io_joy2.read_safe", "m_io_line0.read", "m_io_line1.read", "m_io_line2.read", "m_io_line3.read", "m_io_line4.read", "m_io_line5.read", "m_io_line6.read", "m_io_line7.read", "m_io_plus0.read_safe", "m_io_plus1.read_safe", "m_io_plus2.read_safe", "m_io_plus3.read_safe", "m_io_plus4.read_safe", "m_irq_on_timer.adjust", "m_maincpu.adjust_icount", "m_maincpu.total_cycles", "m_program.read_byte", "m_ram.pointer", "m_screen.hpos", "m_screen.time_until_pos", "m_screen.update_now", "m_screen.vpos", "m_speaker.level_w", "m_specmem.read8", "m_specmem.write8", "m_ula.bank3_pg_w", "m_ula.data_r", "m_ula.data_w", "m_ula.get_atime_left", "m_ula.get_atime_right", "m_ula.get_border_chunk_size", "m_ula.get_btime", "m_ula.get_irq_at", "m_ula.get_raster_contention_offset", "m_ula.get_raster_line_clocks", "m_ula.get_video_line_clocks", "m_ula.io_r", "m_ula.io_w", "m_ula.is_in_contended_area", "m_ula.is_snow_possible", "m_ula.m1", "m_ula.ula_r", "m_ula.ula_w", "overflow", "read", "read_byte", "read_safe", "rectangle", "right", "scr.bottom", "scr.left", "scr.right", "scr.top", "screen.frame_number", "screen.left", "screen.top", "screen.visible_area", "set_entry", "space.read_byte", "space.write_byte", "spectrum_state::is_vram_write", "std::error_condition", "std::make_pair", "std::string", "top", "vis.bottom", "vis.left", "vis.right", "vis.top", "visible_area", "write_byte"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
