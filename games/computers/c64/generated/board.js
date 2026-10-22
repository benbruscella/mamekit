// GENERATED executable machine composition from src/mame/commodore/c64.cpp; do not edit.
import { decodeBoardIr } from '../../../../runtime/ir/decode.js';
import { createGeneratedBoard } from '../../../../runtime/core/generated-board.js';
import boardData from './board.json' with { type: 'json' };
// Decoded, not asserted: a stale or hand-edited artifact fails here, naming the
// field and its MAME source line, instead of crashing deep inside execution.
const defined = decodeBoardIr(boardData, 'c64');
// Direct JavaScript for handlers whose IR shape shows nested hot loops. The
// interpreter remains the semantic reference; these are checked against it by
// src/gen/emit-handler-codegen.spec.ts.
defined.compiledHandlers = {
    ...(() => {
        const methods = (() => {
            function method_read(runtime, offset) {
                const members = runtime.members;
                let aec = ((1) | 0);
                let ba = ((1) | 0);
                let va = 16383;
                return (runtime.overrides["read_memory"] ? runtime.overrides["read_memory"](offset, va, aec, ba) : method_read_memory(runtime, offset, va, aec, ba));
            }
            function method_read_memory(runtime, offset, va, aec, ba) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_basic = members.m_basic ?? runtime.member("m_basic");
                const h_m_kernal = members.m_kernal ?? runtime.member("m_kernal");
                const h_m_charom = members.m_charom ?? runtime.member("m_charom");
                let rw = ((1) | 0);
                let io1 = ((1) | 0);
                let io2 = ((1) | 0);
                let sphi2 = (((__l["m_vic.phi0_r"] ?? runtime.memberCall(members.m_vic, "phi0_r", 0, undefined))()) | 0);
                let plaout = (((runtime.overrides["read_pla"] ? runtime.overrides["read_pla"](offset, va, rw, ((aec) ? 0 : 1), ba) : method_read_pla(runtime, offset, va, rw, ((aec) ? 0 : 1), ba))) | 0);
                let data = ((255) & 0xff);
                if (((aec) ? 0 : 1)) {
                    data = (((__l["m_vic.bus_r"] ?? runtime.memberCall(members.m_vic, "bus_r", 0, undefined))()) & 0xff);
                }
                if ((((((plaout) >>> (0)) & 1)) ? 0 : 1)) {
                    if (aec) {
                        data = ((runtime.readIndex((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), offset)) & 0xff);
                    }
                    else {
                        data = ((runtime.readIndex((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), (((((((((members.m_va15 ?? runtime.member("m_va15"))) ? 0 : 1)) << (15))) | ((((((members.m_va14 ?? runtime.member("m_va14"))) ? 0 : 1)) << (14))))) | (va)))) & 0xff);
                    }
                }
                if ((((((plaout) >>> (1)) & 1)) ? 0 : 1)) {
                    data = ((runtime.readIndex(h_m_basic, ((offset) & (8191)))) & 0xff);
                }
                if ((((((plaout) >>> (2)) & 1)) ? 0 : 1)) {
                    data = ((runtime.readIndex(h_m_kernal, ((offset) & (8191)))) & 0xff);
                }
                if ((((((plaout) >>> (3)) & 1)) ? 0 : 1)) {
                    data = ((runtime.readIndex(h_m_charom, ((offset) & (4095)))) & 0xff);
                }
                if ((((((plaout) >>> (5)) & 1)) ? 0 : 1)) {
                    switch (((runtime.shiftRight(offset, 8)) & (15))) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            {
                                data = (((__l["m_vic.read"] ?? runtime.memberCall(members.m_vic, "read", 0, undefined))(((offset) & (63)))) & 0xff);
                                break;
                            }
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            {
                                data = (((__l["m_sid.read"] ?? runtime.memberCall(members.m_sid, "read", 0, undefined))(((offset) & (31)))) & 0xff);
                                break;
                            }
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            {
                                data = ((((runtime.readIndex((members.m_color_ram ?? runtime.member("m_color_ram")), ((offset) & (1023)))) & (15))) & 0xff);
                                break;
                            }
                        case 12:
                            {
                                data = (((__l["m_cia1.read"] ?? runtime.memberCall(members.m_cia1, "read", 0, undefined))(((offset) & (15)))) & 0xff);
                                break;
                            }
                        case 13:
                            {
                                data = (((__l["m_cia2.read"] ?? runtime.memberCall(members.m_cia2, "read", 0, undefined))(((offset) & (15)))) & 0xff);
                                break;
                            }
                        case 14:
                            {
                                io1 = ((0) | 0);
                                break;
                            }
                        case 15:
                            {
                                io2 = ((0) | 0);
                                break;
                            }
                    }
                }
                let roml = (((((plaout) >>> (6)) & 1)) | 0);
                let romh = (((((plaout) >>> (7)) & 1)) | 0);
                return (__l["m_exp.cd_r"] ?? runtime.memberCall(members.m_exp, "cd_r", 0, undefined))(offset, data, sphi2, ba, roml, romh, io1, io2);
            }
            function method_read_pla(runtime, offset, va, rw, aec, ba) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let sphi2 = (((__l["m_vic.phi0_r"] ?? runtime.memberCall(members.m_vic, "phi0_r", 0, undefined))()) | 0);
                let game = (((__l["m_exp.game_r"] ?? runtime.memberCall(members.m_exp, "game_r", 0, undefined))(offset, sphi2, ba, rw, (members.m_loram ?? runtime.member("m_loram")), (members.m_hiram ?? runtime.member("m_hiram")))) | 0);
                let exrom = (((__l["m_exp.exrom_r"] ?? runtime.memberCall(members.m_exp, "exrom_r", 0, undefined))(offset, sphi2, ba, rw, (members.m_loram ?? runtime.member("m_loram")), (members.m_hiram ?? runtime.member("m_hiram")))) | 0);
                let cas = ((0) | 0);
                let input = (((((((((((((((((((((((((((((((((((((va) >>> (12)) & 1)) << (15))) | ((((((va) >>> (13)) & 1)) << (14))))) | (((game) << (13))))) | (((exrom) << (12))))) | (((rw) << (11))))) | (((aec) << (10))))) | (((ba) << (9))))) | ((((((offset) >>> (12)) & 1)) << (8))))) | ((((((offset) >>> (13)) & 1)) << (7))))) | ((((((offset) >>> (14)) & 1)) << (6))))) | ((((((offset) >>> (15)) & 1)) << (5))))) | ((((members.m_va14 ?? runtime.member("m_va14"))) << (4))))) | ((((members.m_charen ?? runtime.member("m_charen"))) << (3))))) | ((((members.m_hiram ?? runtime.member("m_hiram"))) << (2))))) | ((((members.m_loram ?? runtime.member("m_loram"))) << (1))))) | (cas))) >>> 0);
                return (__l["m_pla.read"] ?? runtime.memberCall(members.m_pla, "read", 0, undefined))(input);
            }
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                let aec = ((1) | 0);
                let ba = ((1) | 0);
                (runtime.overrides["write_memory"] ? runtime.overrides["write_memory"](offset, data, aec, ba) : method_write_memory(runtime, offset, data, aec, ba));
            }
            function method_write_memory(runtime, offset, data, aec, ba) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let rw = ((0) | 0);
                let va = 0;
                let io1 = ((1) | 0);
                let io2 = ((1) | 0);
                let sphi2 = (((__l["m_vic.phi0_r"] ?? runtime.memberCall(members.m_vic, "phi0_r", 0, undefined))()) | 0);
                let plaout = (((runtime.overrides["read_pla"] ? runtime.overrides["read_pla"](offset, va, rw, ((aec) ? 0 : 1), ba) : method_read_pla(runtime, offset, va, rw, ((aec) ? 0 : 1), ba))) | 0);
                if (((Number(offset) < Number(2)) ? 1 : 0)) {
                    data = (((__l["m_vic.bus_r"] ?? runtime.memberCall(members.m_vic, "bus_r", 0, undefined))()) & 0xff);
                }
                if ((((((plaout) >>> (0)) & 1)) ? 0 : 1)) {
                    runtime.writeIndex((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), offset, data);
                }
                if ((((((plaout) >>> (5)) & 1)) ? 0 : 1)) {
                    switch (((runtime.shiftRight(offset, 8)) & (15))) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            {
                                (__l["m_vic.write"] ?? runtime.memberCall(members.m_vic, "write", 0, undefined))(((offset) & (63)), data);
                                break;
                            }
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            {
                                (__l["m_sid.write"] ?? runtime.memberCall(members.m_sid, "write", 0, undefined))(((offset) & (31)), data);
                                break;
                            }
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            {
                                if ((((((plaout) >>> (4)) & 1)) ? 0 : 1)) {
                                    runtime.writeIndex(runtime.writableMember("m_color_ram"), ((offset) & (1023)), ((data) & (15)));
                                }
                                break;
                            }
                        case 12:
                            {
                                (__l["m_cia1.write"] ?? runtime.memberCall(members.m_cia1, "write", 0, undefined))(((offset) & (15)), data);
                                break;
                            }
                        case 13:
                            {
                                (__l["m_cia2.write"] ?? runtime.memberCall(members.m_cia2, "write", 0, undefined))(((offset) & (15)), data);
                                break;
                            }
                        case 14:
                            {
                                io1 = ((0) | 0);
                                break;
                            }
                        case 15:
                            {
                                io2 = ((0) | 0);
                                break;
                            }
                    }
                }
                let roml = (((((plaout) >>> (6)) & 1)) | 0);
                let romh = (((((plaout) >>> (7)) & 1)) | 0);
                (__l["m_exp.cd_w"] ?? runtime.memberCall(members.m_exp, "cd_w", 0, undefined))(offset, data, sphi2, ba, roml, romh, io1, io2);
            }
            function method_vic_videoram_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let aec = (((__l["m_vic.aec_r"] ?? runtime.memberCall(members.m_vic, "aec_r", 0, undefined))()) | 0);
                let ba = (((__l["m_vic.ba_r"] ?? runtime.memberCall(members.m_vic, "ba_r", 0, undefined))()) | 0);
                let va = offset;
                return (runtime.overrides["read_memory"] ? runtime.overrides["read_memory"](offset, va, aec, ba) : method_read_memory(runtime, offset, va, aec, ba));
            }
            function method_vic_colorram_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                if ((__l["m_vic.aec_r"] ?? runtime.memberCall(members.m_vic, "aec_r", 0, undefined))()) {
                    data = ((15) & 0xff);
                }
                else {
                    data = ((((runtime.readIndex((members.m_color_ram ?? runtime.member("m_color_ram")), offset)) & (15))) & 0xff);
                }
                return data;
            }
            function method_cpu_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((7) & 0xff);
                data = ((((data) | ((((__l["m_cassette.sense_r"] ?? runtime.memberCall(members.m_cassette, "sense_r", 0, undefined))()) << (4))))) & 0xff);
                return data;
            }
            function method_cpu_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_loram = (((((data) >>> (0)) & 1)) | 0);
                members.m_hiram = (((((data) >>> (1)) & 1)) | 0);
                members.m_charen = (((((data) >>> (2)) & 1)) | 0);
                (__l["m_cassette.write"] ?? runtime.memberCall(members.m_cassette, "write", 0, undefined))((((data) >>> (3)) & 1));
                (__l["m_cassette.motor_w"] ?? runtime.memberCall(members.m_cassette, "motor_w", 0, undefined))((((data) >>> (5)) & 1));
            }
            function method_sid_potx_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                let data = ((255) & 0xff);
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                let cur2 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy1) : (h_m_joy2));
                switch (runtime.shiftRight((__l["m_cia1.pa_r"] ?? runtime.memberCall(members.m_cia1, "pa_r", 0, undefined))(), 6)) {
                    case 1:
                        {
                            data = (((__l["cur1.read_pot_x"] ?? runtime.memberCall(cur1, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                            break;
                        }
                    case 2:
                        {
                            data = (((__l["cur2.read_pot_x"] ?? runtime.memberCall(cur2, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                            break;
                        }
                    case 3:
                        {
                            if (((((__l["cur1.has_pot_x"] ?? runtime.memberCall(cur1, "has_pot_x", 0, __l["has_pot_x"]))()) && ((__l["cur2.has_pot_x"] ?? runtime.memberCall(cur2, "has_pot_x", 0, __l["has_pot_x"]))())) ? 1 : 0)) {
                                data = ((runtime.divide(1, runtime.add(runtime.divide(1, (__l["cur1.read_pot_x"] ?? runtime.memberCall(cur1, "read_pot_x", 0, __l["read_pot_x"]))()), runtime.divide(1, (__l["cur2.read_pot_x"] ?? runtime.memberCall(cur2, "read_pot_x", 0, __l["read_pot_x"]))())))) & 0xff);
                            }
                            else {
                                if ((__l["cur1.has_pot_x"] ?? runtime.memberCall(cur1, "has_pot_x", 0, __l["has_pot_x"]))()) {
                                    data = (((__l["cur1.read_pot_x"] ?? runtime.memberCall(cur1, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                                }
                                else {
                                    if ((__l["cur2.has_pot_x"] ?? runtime.memberCall(cur2, "has_pot_x", 0, __l["has_pot_x"]))()) {
                                        data = (((__l["cur2.read_pot_x"] ?? runtime.memberCall(cur2, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                                    }
                                }
                            }
                            break;
                        }
                }
                return data;
            }
            function method_sid_poty_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                let data = ((255) & 0xff);
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                let cur2 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy1) : (h_m_joy2));
                switch (runtime.shiftRight((__l["m_cia1.pa_r"] ?? runtime.memberCall(members.m_cia1, "pa_r", 0, undefined))(), 6)) {
                    case 1:
                        {
                            data = (((__l["cur1.read_pot_y"] ?? runtime.memberCall(cur1, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                            break;
                        }
                    case 2:
                        {
                            data = (((__l["cur2.read_pot_y"] ?? runtime.memberCall(cur2, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                            break;
                        }
                    case 3:
                        {
                            if (((((__l["cur1.has_pot_y"] ?? runtime.memberCall(cur1, "has_pot_y", 0, __l["has_pot_y"]))()) && ((__l["cur2.has_pot_y"] ?? runtime.memberCall(cur2, "has_pot_y", 0, __l["has_pot_y"]))())) ? 1 : 0)) {
                                data = ((runtime.divide(1, runtime.add(runtime.divide(1, (__l["cur1.read_pot_y"] ?? runtime.memberCall(cur1, "read_pot_y", 0, __l["read_pot_y"]))()), runtime.divide(1, (__l["cur2.read_pot_y"] ?? runtime.memberCall(cur2, "read_pot_y", 0, __l["read_pot_y"]))())))) & 0xff);
                            }
                            else {
                                if ((__l["cur1.has_pot_y"] ?? runtime.memberCall(cur1, "has_pot_y", 0, __l["has_pot_y"]))()) {
                                    data = (((__l["cur1.read_pot_y"] ?? runtime.memberCall(cur1, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                                }
                                else {
                                    if ((__l["cur2.has_pot_y"] ?? runtime.memberCall(cur2, "has_pot_y", 0, __l["has_pot_y"]))()) {
                                        data = (((__l["cur2.read_pot_y"] ?? runtime.memberCall(cur2, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                                    }
                                }
                            }
                            break;
                        }
                }
                return data;
            }
            function method_cia1_pa_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_row = members.m_row ?? runtime.member("m_row");
                let data = ((255) & 0xff);
                let cur2 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy1) : (h_m_joy2));
                let joy_b = (((__l["cur2.read_joy"] ?? runtime.memberCall(cur2, "read_joy", 0, __l["read_joy"]))()) & 0xff);
                data = ((((data) & (((240) | (((joy_b) & (15))))))) & 0xff);
                data = ((((data) & ((~(((((((joy_b) >>> (5)) & 1)) ? 0 : 1)) << (4)))))) & 0xff);
                let cia1_pb = (((__l["m_cia1.pb_r"] ?? runtime.memberCall(members.m_cia1, "pb_r", 0, undefined))()) & 0xff);
                let row = new Uint32Array([(__l["m_row[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 0), "read", 0, __l["read"]))(), (((__l["m_row[1].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 1), "read", 0, __l["read"]))()) & ((__l["m_lock.read"] ?? runtime.memberCall(members.m_lock, "read", 0, __l["read"]))())), (__l["m_row[2].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 2), "read", 0, __l["read"]))(), (__l["m_row[3].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 3), "read", 0, __l["read"]))(), (__l["m_row[4].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 4), "read", 0, __l["read"]))(), (__l["m_row[5].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 5), "read", 0, __l["read"]))(), (__l["m_row[6].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 6), "read", 0, __l["read"]))(), (__l["m_row[7].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 7), "read", 0, __l["read"]))()]);
                for (let i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((((cia1_pb) >>> (i)) & 1)) ? 0 : 1)) {
                        if ((((((runtime.readIndex(row, 7)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-129))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 6)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-65))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 5)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-33))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 4)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-17))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 3)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-9))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 2)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-5))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 1)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-3))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 0)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-2))) & 0xff);
                        }
                    }
                }
                return data;
            }
            function method_cia1_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                const h_m_row = members.m_row ?? runtime.member("m_row");
                let data = ((255) & 0xff);
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                let joy_a = (((__l["cur1.read_joy"] ?? runtime.memberCall(cur1, "read_joy", 0, __l["read_joy"]))()) & 0xff);
                data = ((((data) & (((240) | (((joy_a) & (15))))))) & 0xff);
                data = ((((data) & ((~(((((((joy_a) >>> (5)) & 1)) ? 0 : 1)) << (4)))))) & 0xff);
                let cia1_pa = (((__l["m_cia1.pa_r"] ?? runtime.memberCall(members.m_cia1, "pa_r", 0, undefined))()) & 0xff);
                if ((((((cia1_pa) >>> (7)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[7].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 7), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (6)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[6].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 6), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (5)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[5].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 5), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (4)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[4].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 4), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (3)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[3].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 3), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (2)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[2].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 2), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (1)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((((__l["m_row[1].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 1), "read", 0, __l["read"]))()) & ((__l["m_lock.read"] ?? runtime.memberCall(members.m_lock, "read", 0, __l["read"]))()))))) & 0xff);
                }
                if ((((((cia1_pa) >>> (0)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 0), "read", 0, __l["read"]))()))) & 0xff);
                }
                return data;
            }
            function method_cia1_pb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                (__l["cur1.joy_w"] ?? runtime.memberCall(cur1, "joy_w", 0, __l["joy_w"]))(((data) & (31)));
                (__l["m_vic.lp_w"] ?? runtime.memberCall(members.m_vic, "lp_w", 0, undefined))((((data) >>> (4)) & 1));
            }
            function method_cia2_pa_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                data = ((((data) | ((((members.m_user_pa2 ?? runtime.member("m_user_pa2"))) << (2))))) & 0xff);
                data = ((((data) | ((((__l["m_iec.clk_r"] ?? runtime.memberCall(members.m_iec, "clk_r", 0, undefined))()) << (6))))) & 0xff);
                data = ((((data) | ((((__l["m_iec.data_r"] ?? runtime.memberCall(members.m_iec, "data_r", 0, undefined))()) << (7))))) & 0xff);
                return data;
            }
            function method_cia2_pa_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_va14 = (((((data) >>> (0)) & 1)) | 0);
                members.m_va15 = (((((data) >>> (1)) & 1)) | 0);
                (__l["m_user.write_m"] ?? runtime.memberCall(members.m_user, "write_m", 0, undefined))((((data) >>> (2)) & 1));
                (__l["m_iec.host_atn_w"] ?? runtime.memberCall(members.m_iec, "host_atn_w", 0, undefined))((((((data) >>> (3)) & 1)) ? 0 : 1));
                (__l["m_iec.host_clk_w"] ?? runtime.memberCall(members.m_iec, "host_clk_w", 0, undefined))((((((data) >>> (4)) & 1)) ? 0 : 1));
                (__l["m_iec.host_data_w"] ?? runtime.memberCall(members.m_iec, "host_data_w", 0, undefined))((((((data) >>> (5)) & 1)) ? 0 : 1));
            }
            function method_cia2_pb_r(runtime) {
                const members = runtime.members;
                return (members.m_user_pb ?? runtime.member("m_user_pb"));
            }
            function method_cia2_pb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_user.write_c"] ?? runtime.memberCall(members.m_user, "write_c", 0, undefined))(((runtime.shiftRight(data, 0)) & (1)));
                (__l["m_user.write_d"] ?? runtime.memberCall(members.m_user, "write_d", 0, undefined))(((runtime.shiftRight(data, 1)) & (1)));
                (__l["m_user.write_e"] ?? runtime.memberCall(members.m_user, "write_e", 0, undefined))(((runtime.shiftRight(data, 2)) & (1)));
                (__l["m_user.write_f"] ?? runtime.memberCall(members.m_user, "write_f", 0, undefined))(((runtime.shiftRight(data, 3)) & (1)));
                (__l["m_user.write_h"] ?? runtime.memberCall(members.m_user, "write_h", 0, undefined))(((runtime.shiftRight(data, 4)) & (1)));
                (__l["m_user.write_j"] ?? runtime.memberCall(members.m_user, "write_j", 0, undefined))(((runtime.shiftRight(data, 5)) & (1)));
                (__l["m_user.write_k"] ?? runtime.memberCall(members.m_user, "write_k", 0, undefined))(((runtime.shiftRight(data, 6)) & (1)));
                (__l["m_user.write_l"] ?? runtime.memberCall(members.m_user, "write_l", 0, undefined))(((runtime.shiftRight(data, 7)) & (1)));
            }
            function method_cass_rd_w(runtime, state) {
                const members = runtime.members;
                members.m_cass_rd = ((state) | 0);
                (runtime.overrides["update_cia1_flag"] ? runtime.overrides["update_cia1_flag"]() : method_update_cia1_flag(runtime));
            }
            function method_update_cia1_flag(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_cia1.flag_w"] ?? runtime.memberCall(members.m_cia1, "flag_w", 0, undefined))((((members.m_cass_rd ?? runtime.member("m_cass_rd"))) & ((members.m_iec_srq ?? runtime.member("m_iec_srq")))));
            }
            function method_iec_srq_w(runtime, state) {
                const members = runtime.members;
                members.m_iec_srq = ((state) | 0);
                (runtime.overrides["update_cia1_flag"] ? runtime.overrides["update_cia1_flag"]() : method_update_cia1_flag(runtime));
            }
            function method_exp_reset_w(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    (runtime.overrides["machine_reset"] ? runtime.overrides["machine_reset"]() : method_machine_reset(runtime));
                }
            }
            function method_machine_reset(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.reset"] ?? runtime.memberCall(members.m_maincpu, "reset", 0, undefined))();
                (__l["m_vic.reset"] ?? runtime.memberCall(members.m_vic, "reset", 0, undefined))();
                (__l["m_sid.reset"] ?? runtime.memberCall(members.m_sid, "reset", 0, undefined))();
                (__l["m_cia1.reset"] ?? runtime.memberCall(members.m_cia1, "reset", 0, undefined))();
                (__l["m_cia2.reset"] ?? runtime.memberCall(members.m_cia2, "reset", 0, undefined))();
                (__l["m_iec.reset"] ?? runtime.memberCall(members.m_iec, "reset", 0, undefined))();
                (__l["m_exp.reset"] ?? runtime.memberCall(members.m_exp, "reset", 0, undefined))();
                (__l["m_user.write_3"] ?? runtime.memberCall(members.m_user, "write_3", 0, undefined))(0);
                (__l["m_user.write_3"] ?? runtime.memberCall(members.m_user, "write_3", 0, undefined))(1);
            }
            function method_exp_dma_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number((members.m_exp_dma ?? runtime.member("m_exp_dma"))) !== Number(state)) ? 1 : 0)) {
                    members.m_exp_dma = ((state) | 0);
                    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, (members.m_exp_dma ?? runtime.member("m_exp_dma")));
                }
            }
            function method_write_user_pb0(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (1))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-2))) | 0);
                }
            }
            function method_write_user_pb1(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (2))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-3))) | 0);
                }
            }
            function method_write_user_pb2(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (4))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-5))) | 0);
                }
            }
            function method_write_user_pb3(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (8))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-9))) | 0);
                }
            }
            function method_write_user_pb4(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (16))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-17))) | 0);
                }
            }
            function method_write_user_pb5(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (32))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-33))) | 0);
                }
            }
            function method_write_user_pb6(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (64))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-65))) | 0);
                }
            }
            function method_write_user_pb7(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (128))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-129))) | 0);
                }
            }
            function method_write_user_pa2(runtime, state) {
                const members = runtime.members;
                members.m_user_pa2 = ((state) | 0);
            }
            function method_via0_pa_r(runtime) {
                const members = runtime.members;
                return (members.m_parallel_data ?? runtime.member("m_parallel_data"));
            }
            function method_via0_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_via0_irq = state;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((((members.m_via0_irq ?? runtime.member("m_via0_irq"))) || ((members.m_via1_irq ?? runtime.member("m_via1_irq")))) ? 1 : 0)) ? (1) : (0)));
            }
            function method_via1_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                data = ((((data) | ((((((__l["m_floppy.wpt_r"] ?? runtime.memberCall(members.m_floppy, "wpt_r", 0, undefined))()) ? 0 : 1)) << (4))))) & 0xff);
                data = ((((data) | ((((__l["m_ga.sync_r"] ?? runtime.memberCall(members.m_ga, "sync_r", 0, undefined))()) << (7))))) & 0xff);
                return data;
            }
            function method_via1_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_via1_irq = state;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((((members.m_via0_irq ?? runtime.member("m_via0_irq"))) || ((members.m_via1_irq ?? runtime.member("m_via1_irq")))) ? 1 : 0)) ? (1) : (0)));
            }
            function method_atn_w(runtime, state) {
                const members = runtime.members;
                runtime.invoke("set_iec_data");
            }
            function method_byte_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(16, state);
                (__l["m_via1.write_ca1"] ?? runtime.memberCall(members.m_via1, "write_ca1", 0, undefined))(state);
            }
            function method_cbm_iec_atn(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_via0.write_ca1"] ?? runtime.memberCall(members.m_via0, "write_ca1", 0, undefined))(((state) ? 0 : 1));
                (__l["m_ga.atni_w"] ?? runtime.memberCall(members.m_ga, "atni_w", 0, undefined))(((state) ? 0 : 1));
                runtime.invoke("set_iec_data");
            }
            function method_cbm_iec_reset(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    (runtime.overrides["device_reset"] ? runtime.overrides["device_reset"]() : method_device_reset(runtime));
                }
            }
            function method_device_reset(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.reset"] ?? runtime.memberCall(members.m_maincpu, "reset", 0, undefined))();
                (__l["m_via0.reset"] ?? runtime.memberCall(members.m_via0, "reset", 0, undefined))();
                (__l["m_via1.reset"] ?? runtime.memberCall(members.m_via1, "reset", 0, undefined))();
                (__l["m_ga.accl_w"] ?? runtime.memberCall(members.m_ga, "accl_w", 0, undefined))(0);
                (__l["m_ga.ted_w"] ?? runtime.memberCall(members.m_ga, "ted_w", 0, undefined))(1);
            }
            function method_parallel_strobe_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_via0.write_cb1"] ?? runtime.memberCall(members.m_via0, "write_cb1", 0, undefined))(state);
            }
            function method_dasm_override(runtime, stream, pc, opcodes, params) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                switch ((__l["opcodes.r8"] ?? runtime.memberCall(opcodes, "r8", 0, __l["r8"]))(pc)) {
                    case 32:
                        {
                            return (__l["dasm_vector"] ? __l["dasm_vector"](stream, pc, opcodes, "jsr %s") : runtime.macro("dasm_vector", stream, pc, opcodes, "jsr %s"));
                        }
                    case 76:
                        {
                            return (__l["dasm_vector"] ? __l["dasm_vector"](stream, pc, opcodes, "jmp %s") : runtime.macro("dasm_vector", stream, pc, opcodes, "jmp %s"));
                        }
                    case 108:
                        {
                            return (__l["dasm_zeropage_vector"] ? __l["dasm_zeropage_vector"](stream, pc, opcodes, "jmp (%s)") : runtime.macro("dasm_zeropage_vector", stream, pc, opcodes, "jmp (%s)"));
                        }
                    case 101:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "adc %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "adc %s"));
                        }
                    case 117:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "adc %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "adc %s, x"));
                        }
                    case 97:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "adc (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "adc (%s, x)"));
                        }
                    case 113:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "adc (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "adc (%s), y"));
                        }
                    case 37:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "and %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "and %s"));
                        }
                    case 53:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "and %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "and %s, x"));
                        }
                    case 33:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "and (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "and (%s, x)"));
                        }
                    case 49:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "and (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "and (%s), y"));
                        }
                    case 6:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "asl %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "asl %s"));
                        }
                    case 22:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "asl %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "asl %s, x"));
                        }
                    case 36:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "bit %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "bit %s"));
                        }
                    case 197:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "cmp %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "cmp %s"));
                        }
                    case 213:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "cmp %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "cmp %s, x"));
                        }
                    case 193:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "cmp (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "cmp (%s, x)"));
                        }
                    case 209:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "cmp (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "cmp (%s), y"));
                        }
                    case 228:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "cpx %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "cpx %s"));
                        }
                    case 196:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "cpy %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "cpy %s"));
                        }
                    case 198:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "dec %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "dec %s"));
                        }
                    case 214:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "dec %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "dec %s, x"));
                        }
                    case 69:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "eor %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "eor %s"));
                        }
                    case 85:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "eor %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "eor %s, x"));
                        }
                    case 65:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "eor (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "eor (%s, x)"));
                        }
                    case 81:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "eor (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "eor (%s), y"));
                        }
                    case 230:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "inc %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "inc %s"));
                        }
                    case 246:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "inc %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "inc %s, x"));
                        }
                    case 165:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "lda %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "lda %s"));
                        }
                    case 181:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "lda %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "lda %s, x"));
                        }
                    case 161:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "lda (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "lda (%s, x)"));
                        }
                    case 177:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "lda (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "lda (%s), y"));
                        }
                    case 166:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ldx %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ldx %s"));
                        }
                    case 182:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ldx %s, y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ldx %s, y"));
                        }
                    case 164:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ldy %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ldy %s"));
                        }
                    case 180:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ldy %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ldy %s, x"));
                        }
                    case 70:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "lsr %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "lsr %s"));
                        }
                    case 86:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "lsr %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "lsr %s, x"));
                        }
                    case 5:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ora %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ora %s"));
                        }
                    case 21:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ora %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ora %s, x"));
                        }
                    case 1:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ora (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ora (%s, x)"));
                        }
                    case 17:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ora (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ora (%s), y"));
                        }
                    case 38:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "rol %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "rol %s"));
                        }
                    case 54:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "rol %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "rol %s, x"));
                        }
                    case 102:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ror %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ror %s"));
                        }
                    case 118:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "ror %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "ror %s, x"));
                        }
                    case 229:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sbc %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sbc %s"));
                        }
                    case 245:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sbc %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sbc %s, x"));
                        }
                    case 225:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sbc (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sbc (%s, x)"));
                        }
                    case 241:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sbc (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sbc (%s), y"));
                        }
                    case 133:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sta %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sta %s"));
                        }
                    case 149:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sta %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sta %s, x"));
                        }
                    case 129:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sta (%s, x)") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sta (%s, x)"));
                        }
                    case 145:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sta (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sta (%s), y"));
                        }
                    case 134:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "stx %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "stx %s"));
                        }
                    case 150:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "stx (%s), y") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "stx (%s), y"));
                        }
                    case 132:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sty %s") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sty %s"));
                        }
                    case 148:
                        {
                            return (__l["dasm_zeropage"] ? __l["dasm_zeropage"](stream, pc, opcodes, "sty %s, x") : runtime.macro("dasm_zeropage", stream, pc, opcodes, "sty %s, x"));
                        }
                }
                return 0;
            }
            return {
                "read": method_read,
                "read_memory": method_read_memory,
                "read_pla": method_read_pla,
                "write": method_write,
                "write_memory": method_write_memory,
                "vic_videoram_r": method_vic_videoram_r,
                "vic_colorram_r": method_vic_colorram_r,
                "cpu_r": method_cpu_r,
                "cpu_w": method_cpu_w,
                "sid_potx_r": method_sid_potx_r,
                "sid_poty_r": method_sid_poty_r,
                "cia1_pa_r": method_cia1_pa_r,
                "cia1_pb_r": method_cia1_pb_r,
                "cia1_pb_w": method_cia1_pb_w,
                "cia2_pa_r": method_cia2_pa_r,
                "cia2_pa_w": method_cia2_pa_w,
                "cia2_pb_r": method_cia2_pb_r,
                "cia2_pb_w": method_cia2_pb_w,
                "cass_rd_w": method_cass_rd_w,
                "update_cia1_flag": method_update_cia1_flag,
                "iec_srq_w": method_iec_srq_w,
                "exp_reset_w": method_exp_reset_w,
                "machine_reset": method_machine_reset,
                "exp_dma_w": method_exp_dma_w,
                "write_user_pb0": method_write_user_pb0,
                "write_user_pb1": method_write_user_pb1,
                "write_user_pb2": method_write_user_pb2,
                "write_user_pb3": method_write_user_pb3,
                "write_user_pb4": method_write_user_pb4,
                "write_user_pb5": method_write_user_pb5,
                "write_user_pb6": method_write_user_pb6,
                "write_user_pb7": method_write_user_pb7,
                "write_user_pa2": method_write_user_pa2,
                "via0_pa_r": method_via0_pa_r,
                "via0_irq_w": method_via0_irq_w,
                "via1_pb_r": method_via1_pb_r,
                "via1_irq_w": method_via1_irq_w,
                "atn_w": method_atn_w,
                "byte_w": method_byte_w,
                "cbm_iec_atn": method_cbm_iec_atn,
                "cbm_iec_reset": method_cbm_iec_reset,
                "device_reset": method_device_reset,
                "parallel_strobe_w": method_parallel_strobe_w,
                "dasm_override": method_dasm_override
            };
        })();
        return {
            "c64_state.read": methods["read"],
            "c64_state.read_memory": methods["read_memory"],
            "c64_state.read_pla": methods["read_pla"],
            "c64_state.write": methods["write"],
            "c64_state.write_memory": methods["write_memory"],
            "c64_state.vic_videoram_r": methods["vic_videoram_r"],
            "c64_state.vic_colorram_r": methods["vic_colorram_r"],
            "c64_state.cpu_r": methods["cpu_r"],
            "c64_state.cpu_w": methods["cpu_w"],
            "c64_state.sid_potx_r": methods["sid_potx_r"],
            "c64_state.sid_poty_r": methods["sid_poty_r"],
            "c64_state.cia1_pa_r": methods["cia1_pa_r"],
            "c64_state.cia1_pb_r": methods["cia1_pb_r"],
            "c64_state.cia1_pb_w": methods["cia1_pb_w"],
            "c64_state.cia2_pa_r": methods["cia2_pa_r"],
            "c64_state.cia2_pa_w": methods["cia2_pa_w"],
            "c64_state.cia2_pb_r": methods["cia2_pb_r"],
            "c64_state.cia2_pb_w": methods["cia2_pb_w"],
            "c64_state.cass_rd_w": methods["cass_rd_w"],
            "c64_state.update_cia1_flag": methods["update_cia1_flag"],
            "c64_state.iec_srq_w": methods["iec_srq_w"],
            "c64_state.exp_reset_w": methods["exp_reset_w"],
            "c64_state.machine_reset": methods["machine_reset"],
            "c64_state.exp_dma_w": methods["exp_dma_w"],
            "c64_state.write_user_pb0": methods["write_user_pb0"],
            "c64_state.write_user_pb1": methods["write_user_pb1"],
            "c64_state.write_user_pb2": methods["write_user_pb2"],
            "c64_state.write_user_pb3": methods["write_user_pb3"],
            "c64_state.write_user_pb4": methods["write_user_pb4"],
            "c64_state.write_user_pb5": methods["write_user_pb5"],
            "c64_state.write_user_pb6": methods["write_user_pb6"],
            "c64_state.write_user_pb7": methods["write_user_pb7"],
            "c64_state.write_user_pa2": methods["write_user_pa2"],
            "c64_state.dasm_override": methods["dasm_override"],
        };
    })(),
    ...(() => {
        const methods = (() => {
            function method_read(runtime, offset) {
                const members = runtime.members;
                let aec = ((1) | 0);
                let ba = ((1) | 0);
                let va = 16383;
                return (runtime.overrides["read_memory"] ? runtime.overrides["read_memory"](offset, va, aec, ba) : method_read_memory(runtime, offset, va, aec, ba));
            }
            function method_read_memory(runtime, offset, va, aec, ba) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_basic = members.m_basic ?? runtime.member("m_basic");
                const h_m_kernal = members.m_kernal ?? runtime.member("m_kernal");
                const h_m_charom = members.m_charom ?? runtime.member("m_charom");
                let rw = ((1) | 0);
                let io1 = ((1) | 0);
                let io2 = ((1) | 0);
                let sphi2 = (((__l["m_vic.phi0_r"] ?? runtime.memberCall(members.m_vic, "phi0_r", 0, undefined))()) | 0);
                let plaout = (((runtime.overrides["read_pla"] ? runtime.overrides["read_pla"](offset, va, rw, ((aec) ? 0 : 1), ba) : method_read_pla(runtime, offset, va, rw, ((aec) ? 0 : 1), ba))) | 0);
                let data = ((255) & 0xff);
                if (((aec) ? 0 : 1)) {
                    data = (((__l["m_vic.bus_r"] ?? runtime.memberCall(members.m_vic, "bus_r", 0, undefined))()) & 0xff);
                }
                if ((((((plaout) >>> (0)) & 1)) ? 0 : 1)) {
                    if (aec) {
                        data = ((runtime.readIndex((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), offset)) & 0xff);
                    }
                    else {
                        data = ((runtime.readIndex((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), (((((((((members.m_va15 ?? runtime.member("m_va15"))) ? 0 : 1)) << (15))) | ((((((members.m_va14 ?? runtime.member("m_va14"))) ? 0 : 1)) << (14))))) | (va)))) & 0xff);
                    }
                }
                if ((((((plaout) >>> (1)) & 1)) ? 0 : 1)) {
                    data = ((runtime.readIndex(h_m_basic, ((offset) & (8191)))) & 0xff);
                }
                if ((((((plaout) >>> (2)) & 1)) ? 0 : 1)) {
                    data = ((runtime.readIndex(h_m_kernal, ((offset) & (8191)))) & 0xff);
                }
                if ((((((plaout) >>> (3)) & 1)) ? 0 : 1)) {
                    data = ((runtime.readIndex(h_m_charom, ((offset) & (4095)))) & 0xff);
                }
                if ((((((plaout) >>> (5)) & 1)) ? 0 : 1)) {
                    switch (((runtime.shiftRight(offset, 8)) & (15))) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            {
                                data = (((__l["m_vic.read"] ?? runtime.memberCall(members.m_vic, "read", 0, undefined))(((offset) & (63)))) & 0xff);
                                break;
                            }
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            {
                                data = (((__l["m_sid.read"] ?? runtime.memberCall(members.m_sid, "read", 0, undefined))(((offset) & (31)))) & 0xff);
                                break;
                            }
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            {
                                data = ((((runtime.readIndex((members.m_color_ram ?? runtime.member("m_color_ram")), ((offset) & (1023)))) & (15))) & 0xff);
                                break;
                            }
                        case 12:
                            {
                                data = (((__l["m_cia1.read"] ?? runtime.memberCall(members.m_cia1, "read", 0, undefined))(((offset) & (15)))) & 0xff);
                                break;
                            }
                        case 13:
                            {
                                data = (((__l["m_cia2.read"] ?? runtime.memberCall(members.m_cia2, "read", 0, undefined))(((offset) & (15)))) & 0xff);
                                break;
                            }
                        case 14:
                            {
                                io1 = ((0) | 0);
                                break;
                            }
                        case 15:
                            {
                                io2 = ((0) | 0);
                                break;
                            }
                    }
                }
                let roml = (((((plaout) >>> (6)) & 1)) | 0);
                let romh = (((((plaout) >>> (7)) & 1)) | 0);
                return (__l["m_exp.cd_r"] ?? runtime.memberCall(members.m_exp, "cd_r", 0, undefined))(offset, data, sphi2, ba, roml, romh, io1, io2);
            }
            function method_read_pla(runtime, offset, va, rw, aec, ba) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let sphi2 = (((__l["m_vic.phi0_r"] ?? runtime.memberCall(members.m_vic, "phi0_r", 0, undefined))()) | 0);
                let game = (((__l["m_exp.game_r"] ?? runtime.memberCall(members.m_exp, "game_r", 0, undefined))(offset, sphi2, ba, rw, (members.m_loram ?? runtime.member("m_loram")), (members.m_hiram ?? runtime.member("m_hiram")))) | 0);
                let exrom = (((__l["m_exp.exrom_r"] ?? runtime.memberCall(members.m_exp, "exrom_r", 0, undefined))(offset, sphi2, ba, rw, (members.m_loram ?? runtime.member("m_loram")), (members.m_hiram ?? runtime.member("m_hiram")))) | 0);
                let cas = ((0) | 0);
                let input = (((((((((((((((((((((((((((((((((((((va) >>> (12)) & 1)) << (15))) | ((((((va) >>> (13)) & 1)) << (14))))) | (((game) << (13))))) | (((exrom) << (12))))) | (((rw) << (11))))) | (((aec) << (10))))) | (((ba) << (9))))) | ((((((offset) >>> (12)) & 1)) << (8))))) | ((((((offset) >>> (13)) & 1)) << (7))))) | ((((((offset) >>> (14)) & 1)) << (6))))) | ((((((offset) >>> (15)) & 1)) << (5))))) | ((((members.m_va14 ?? runtime.member("m_va14"))) << (4))))) | ((((members.m_charen ?? runtime.member("m_charen"))) << (3))))) | ((((members.m_hiram ?? runtime.member("m_hiram"))) << (2))))) | ((((members.m_loram ?? runtime.member("m_loram"))) << (1))))) | (cas))) >>> 0);
                return (__l["m_pla.read"] ?? runtime.memberCall(members.m_pla, "read", 0, undefined))(input);
            }
            function method_write(runtime, offset, data) {
                const members = runtime.members;
                let aec = ((1) | 0);
                let ba = ((1) | 0);
                (runtime.overrides["write_memory"] ? runtime.overrides["write_memory"](offset, data, aec, ba) : method_write_memory(runtime, offset, data, aec, ba));
            }
            function method_write_memory(runtime, offset, data, aec, ba) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let rw = ((0) | 0);
                let va = 0;
                let io1 = ((1) | 0);
                let io2 = ((1) | 0);
                let sphi2 = (((__l["m_vic.phi0_r"] ?? runtime.memberCall(members.m_vic, "phi0_r", 0, undefined))()) | 0);
                let plaout = (((runtime.overrides["read_pla"] ? runtime.overrides["read_pla"](offset, va, rw, ((aec) ? 0 : 1), ba) : method_read_pla(runtime, offset, va, rw, ((aec) ? 0 : 1), ba))) | 0);
                if (((Number(offset) < Number(2)) ? 1 : 0)) {
                    data = (((__l["m_vic.bus_r"] ?? runtime.memberCall(members.m_vic, "bus_r", 0, undefined))()) & 0xff);
                }
                if ((((((plaout) >>> (0)) & 1)) ? 0 : 1)) {
                    runtime.writeIndex((__l["m_ram.pointer"] ?? runtime.memberCall(members.m_ram, "pointer", 0, undefined))(), offset, data);
                }
                if ((((((plaout) >>> (5)) & 1)) ? 0 : 1)) {
                    switch (((runtime.shiftRight(offset, 8)) & (15))) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                            {
                                (__l["m_vic.write"] ?? runtime.memberCall(members.m_vic, "write", 0, undefined))(((offset) & (63)), data);
                                break;
                            }
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            {
                                (__l["m_sid.write"] ?? runtime.memberCall(members.m_sid, "write", 0, undefined))(((offset) & (31)), data);
                                break;
                            }
                        case 8:
                        case 9:
                        case 10:
                        case 11:
                            {
                                if ((((((plaout) >>> (4)) & 1)) ? 0 : 1)) {
                                    runtime.writeIndex(runtime.writableMember("m_color_ram"), ((offset) & (1023)), ((data) & (15)));
                                }
                                break;
                            }
                        case 12:
                            {
                                (__l["m_cia1.write"] ?? runtime.memberCall(members.m_cia1, "write", 0, undefined))(((offset) & (15)), data);
                                break;
                            }
                        case 13:
                            {
                                (__l["m_cia2.write"] ?? runtime.memberCall(members.m_cia2, "write", 0, undefined))(((offset) & (15)), data);
                                break;
                            }
                        case 14:
                            {
                                io1 = ((0) | 0);
                                break;
                            }
                        case 15:
                            {
                                io2 = ((0) | 0);
                                break;
                            }
                    }
                }
                let roml = (((((plaout) >>> (6)) & 1)) | 0);
                let romh = (((((plaout) >>> (7)) & 1)) | 0);
                (__l["m_exp.cd_w"] ?? runtime.memberCall(members.m_exp, "cd_w", 0, undefined))(offset, data, sphi2, ba, roml, romh, io1, io2);
            }
            function method_vic_videoram_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let aec = (((__l["m_vic.aec_r"] ?? runtime.memberCall(members.m_vic, "aec_r", 0, undefined))()) | 0);
                let ba = (((__l["m_vic.ba_r"] ?? runtime.memberCall(members.m_vic, "ba_r", 0, undefined))()) | 0);
                let va = offset;
                return (runtime.overrides["read_memory"] ? runtime.overrides["read_memory"](offset, va, aec, ba) : method_read_memory(runtime, offset, va, aec, ba));
            }
            function method_vic_colorram_r(runtime, offset) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                if ((__l["m_vic.aec_r"] ?? runtime.memberCall(members.m_vic, "aec_r", 0, undefined))()) {
                    data = ((15) & 0xff);
                }
                else {
                    data = ((((runtime.readIndex((members.m_color_ram ?? runtime.member("m_color_ram")), offset)) & (15))) & 0xff);
                }
                return data;
            }
            function method_cpu_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((7) & 0xff);
                data = ((((data) | ((((__l["m_cassette.sense_r"] ?? runtime.memberCall(members.m_cassette, "sense_r", 0, undefined))()) << (4))))) & 0xff);
                return data;
            }
            function method_sid_potx_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                let data = ((255) & 0xff);
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                let cur2 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy1) : (h_m_joy2));
                switch (runtime.shiftRight((__l["m_cia1.pa_r"] ?? runtime.memberCall(members.m_cia1, "pa_r", 0, undefined))(), 6)) {
                    case 1:
                        {
                            data = (((__l["cur1.read_pot_x"] ?? runtime.memberCall(cur1, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                            break;
                        }
                    case 2:
                        {
                            data = (((__l["cur2.read_pot_x"] ?? runtime.memberCall(cur2, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                            break;
                        }
                    case 3:
                        {
                            if (((((__l["cur1.has_pot_x"] ?? runtime.memberCall(cur1, "has_pot_x", 0, __l["has_pot_x"]))()) && ((__l["cur2.has_pot_x"] ?? runtime.memberCall(cur2, "has_pot_x", 0, __l["has_pot_x"]))())) ? 1 : 0)) {
                                data = ((runtime.divide(1, runtime.add(runtime.divide(1, (__l["cur1.read_pot_x"] ?? runtime.memberCall(cur1, "read_pot_x", 0, __l["read_pot_x"]))()), runtime.divide(1, (__l["cur2.read_pot_x"] ?? runtime.memberCall(cur2, "read_pot_x", 0, __l["read_pot_x"]))())))) & 0xff);
                            }
                            else {
                                if ((__l["cur1.has_pot_x"] ?? runtime.memberCall(cur1, "has_pot_x", 0, __l["has_pot_x"]))()) {
                                    data = (((__l["cur1.read_pot_x"] ?? runtime.memberCall(cur1, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                                }
                                else {
                                    if ((__l["cur2.has_pot_x"] ?? runtime.memberCall(cur2, "has_pot_x", 0, __l["has_pot_x"]))()) {
                                        data = (((__l["cur2.read_pot_x"] ?? runtime.memberCall(cur2, "read_pot_x", 0, __l["read_pot_x"]))()) & 0xff);
                                    }
                                }
                            }
                            break;
                        }
                }
                return data;
            }
            function method_sid_poty_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                let data = ((255) & 0xff);
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                let cur2 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy1) : (h_m_joy2));
                switch (runtime.shiftRight((__l["m_cia1.pa_r"] ?? runtime.memberCall(members.m_cia1, "pa_r", 0, undefined))(), 6)) {
                    case 1:
                        {
                            data = (((__l["cur1.read_pot_y"] ?? runtime.memberCall(cur1, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                            break;
                        }
                    case 2:
                        {
                            data = (((__l["cur2.read_pot_y"] ?? runtime.memberCall(cur2, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                            break;
                        }
                    case 3:
                        {
                            if (((((__l["cur1.has_pot_y"] ?? runtime.memberCall(cur1, "has_pot_y", 0, __l["has_pot_y"]))()) && ((__l["cur2.has_pot_y"] ?? runtime.memberCall(cur2, "has_pot_y", 0, __l["has_pot_y"]))())) ? 1 : 0)) {
                                data = ((runtime.divide(1, runtime.add(runtime.divide(1, (__l["cur1.read_pot_y"] ?? runtime.memberCall(cur1, "read_pot_y", 0, __l["read_pot_y"]))()), runtime.divide(1, (__l["cur2.read_pot_y"] ?? runtime.memberCall(cur2, "read_pot_y", 0, __l["read_pot_y"]))())))) & 0xff);
                            }
                            else {
                                if ((__l["cur1.has_pot_y"] ?? runtime.memberCall(cur1, "has_pot_y", 0, __l["has_pot_y"]))()) {
                                    data = (((__l["cur1.read_pot_y"] ?? runtime.memberCall(cur1, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                                }
                                else {
                                    if ((__l["cur2.has_pot_y"] ?? runtime.memberCall(cur2, "has_pot_y", 0, __l["has_pot_y"]))()) {
                                        data = (((__l["cur2.read_pot_y"] ?? runtime.memberCall(cur2, "read_pot_y", 0, __l["read_pot_y"]))()) & 0xff);
                                    }
                                }
                            }
                            break;
                        }
                }
                return data;
            }
            function method_cia1_pa_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_row = members.m_row ?? runtime.member("m_row");
                let data = ((255) & 0xff);
                let cur2 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy1) : (h_m_joy2));
                let joy_b = (((__l["cur2.read_joy"] ?? runtime.memberCall(cur2, "read_joy", 0, __l["read_joy"]))()) & 0xff);
                data = ((((data) & (((240) | (((joy_b) & (15))))))) & 0xff);
                data = ((((data) & ((~(((((((joy_b) >>> (5)) & 1)) ? 0 : 1)) << (4)))))) & 0xff);
                let cia1_pb = (((__l["m_cia1.pb_r"] ?? runtime.memberCall(members.m_cia1, "pb_r", 0, undefined))()) & 0xff);
                let row = new Uint32Array([(__l["m_row[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 0), "read", 0, __l["read"]))(), (((__l["m_row[1].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 1), "read", 0, __l["read"]))()) & ((__l["m_lock.read"] ?? runtime.memberCall(members.m_lock, "read", 0, __l["read"]))())), (__l["m_row[2].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 2), "read", 0, __l["read"]))(), (__l["m_row[3].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 3), "read", 0, __l["read"]))(), (__l["m_row[4].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 4), "read", 0, __l["read"]))(), (__l["m_row[5].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 5), "read", 0, __l["read"]))(), (__l["m_row[6].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 6), "read", 0, __l["read"]))(), (__l["m_row[7].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 7), "read", 0, __l["read"]))()]);
                for (let i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                    if ((((((cia1_pb) >>> (i)) & 1)) ? 0 : 1)) {
                        if ((((((runtime.readIndex(row, 7)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-129))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 6)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-65))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 5)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-33))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 4)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-17))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 3)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-9))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 2)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-5))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 1)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-3))) & 0xff);
                        }
                        if ((((((runtime.readIndex(row, 0)) >>> (i)) & 1)) ? 0 : 1)) {
                            data = ((((data) & (-2))) & 0xff);
                        }
                    }
                }
                return data;
            }
            function method_cia1_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_joy2 = members.m_joy2 ?? runtime.member("m_joy2");
                const h_m_joy1 = members.m_joy1 ?? runtime.member("m_joy1");
                const h_m_row = members.m_row ?? runtime.member("m_row");
                let data = ((255) & 0xff);
                let cur1 = (((__l["m_portswap.read"] ?? runtime.memberCall(members.m_portswap, "read", 0, __l["read"]))()) ? (h_m_joy2) : (h_m_joy1));
                let joy_a = (((__l["cur1.read_joy"] ?? runtime.memberCall(cur1, "read_joy", 0, __l["read_joy"]))()) & 0xff);
                data = ((((data) & (((240) | (((joy_a) & (15))))))) & 0xff);
                data = ((((data) & ((~(((((((joy_a) >>> (5)) & 1)) ? 0 : 1)) << (4)))))) & 0xff);
                let cia1_pa = (((__l["m_cia1.pa_r"] ?? runtime.memberCall(members.m_cia1, "pa_r", 0, undefined))()) & 0xff);
                if ((((((cia1_pa) >>> (7)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[7].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 7), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (6)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[6].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 6), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (5)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[5].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 5), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (4)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[4].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 4), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (3)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[3].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 3), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (2)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[2].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 2), "read", 0, __l["read"]))()))) & 0xff);
                }
                if ((((((cia1_pa) >>> (1)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((((__l["m_row[1].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 1), "read", 0, __l["read"]))()) & ((__l["m_lock.read"] ?? runtime.memberCall(members.m_lock, "read", 0, __l["read"]))()))))) & 0xff);
                }
                if ((((((cia1_pa) >>> (0)) & 1)) ? 0 : 1)) {
                    data = ((((data) & ((__l["m_row[0].read"] ?? runtime.memberCall(runtime.readIndex(h_m_row, 0), "read", 0, __l["read"]))()))) & 0xff);
                }
                return data;
            }
            function method_cia2_pa_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                data = ((((data) | ((((members.m_user_pa2 ?? runtime.member("m_user_pa2"))) << (2))))) & 0xff);
                data = ((((data) | ((((__l["m_iec.clk_r"] ?? runtime.memberCall(members.m_iec, "clk_r", 0, undefined))()) << (6))))) & 0xff);
                data = ((((data) | ((((__l["m_iec.data_r"] ?? runtime.memberCall(members.m_iec, "data_r", 0, undefined))()) << (7))))) & 0xff);
                return data;
            }
            function method_cia2_pb_r(runtime) {
                const members = runtime.members;
                return (members.m_user_pb ?? runtime.member("m_user_pb"));
            }
            function method_cass_rd_w(runtime, state) {
                const members = runtime.members;
                members.m_cass_rd = ((state) | 0);
                (runtime.overrides["update_cia1_flag"] ? runtime.overrides["update_cia1_flag"]() : method_update_cia1_flag(runtime));
            }
            function method_update_cia1_flag(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_cia1.flag_w"] ?? runtime.memberCall(members.m_cia1, "flag_w", 0, undefined))((((members.m_cass_rd ?? runtime.member("m_cass_rd"))) & ((members.m_iec_srq ?? runtime.member("m_iec_srq")))));
            }
            function method_iec_srq_w(runtime, state) {
                const members = runtime.members;
                members.m_iec_srq = ((state) | 0);
                (runtime.overrides["update_cia1_flag"] ? runtime.overrides["update_cia1_flag"]() : method_update_cia1_flag(runtime));
            }
            function method_exp_reset_w(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    (runtime.overrides["machine_reset"] ? runtime.overrides["machine_reset"]() : method_machine_reset(runtime));
                }
            }
            function method_machine_reset(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.reset"] ?? runtime.memberCall(members.m_maincpu, "reset", 0, undefined))();
                (__l["m_vic.reset"] ?? runtime.memberCall(members.m_vic, "reset", 0, undefined))();
                (__l["m_sid.reset"] ?? runtime.memberCall(members.m_sid, "reset", 0, undefined))();
                (__l["m_cia1.reset"] ?? runtime.memberCall(members.m_cia1, "reset", 0, undefined))();
                (__l["m_cia2.reset"] ?? runtime.memberCall(members.m_cia2, "reset", 0, undefined))();
                (__l["m_iec.reset"] ?? runtime.memberCall(members.m_iec, "reset", 0, undefined))();
                (__l["m_exp.reset"] ?? runtime.memberCall(members.m_exp, "reset", 0, undefined))();
                (__l["m_user.write_3"] ?? runtime.memberCall(members.m_user, "write_3", 0, undefined))(0);
                (__l["m_user.write_3"] ?? runtime.memberCall(members.m_user, "write_3", 0, undefined))(1);
            }
            function method_exp_dma_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number((members.m_exp_dma ?? runtime.member("m_exp_dma"))) !== Number(state)) ? 1 : 0)) {
                    members.m_exp_dma = ((state) | 0);
                    (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(-3, (members.m_exp_dma ?? runtime.member("m_exp_dma")));
                }
            }
            function method_write_user_pb0(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (1))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-2))) | 0);
                }
            }
            function method_write_user_pb1(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (2))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-3))) | 0);
                }
            }
            function method_write_user_pb2(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (4))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-5))) | 0);
                }
            }
            function method_write_user_pb3(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (8))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-9))) | 0);
                }
            }
            function method_write_user_pb4(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (16))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-17))) | 0);
                }
            }
            function method_write_user_pb5(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (32))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-33))) | 0);
                }
            }
            function method_write_user_pb6(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (64))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-65))) | 0);
                }
            }
            function method_write_user_pb7(runtime, state) {
                const members = runtime.members;
                if (state) {
                    members.m_user_pb = ((((members.m_user_pb) | (128))) | 0);
                }
                else {
                    members.m_user_pb = ((((members.m_user_pb) & (-129))) | 0);
                }
            }
            function method_write_user_pa2(runtime, state) {
                const members = runtime.members;
                members.m_user_pa2 = ((state) | 0);
            }
            function method_via0_pa_r(runtime) {
                const members = runtime.members;
                return (members.m_parallel_data ?? runtime.member("m_parallel_data"));
            }
            function method_via0_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                data = ((((((((__l["m_bus.data_r"] ?? runtime.memberCall(members.m_bus, "data_r", 0, __l["data_r"]))()) ? 0 : 1)) && ((((__l["m_ga.atn_r"] ?? runtime.memberCall(members.m_ga, "atn_r", 0, undefined))()) ? 0 : 1))) ? 1 : 0)) & 0xff);
                data = ((((data) | ((((((__l["m_bus.clk_r"] ?? runtime.memberCall(members.m_bus, "clk_r", 0, __l["clk_r"]))()) ? 0 : 1)) << (2))))) & 0xff);
                data = ((((data) | (((((runtime.subtract((__l["m_slot.get_address"] ?? runtime.memberCall(members.m_slot, "get_address", 0, __l["get_address"]))(), 8)) & (3))) << (5))))) & 0xff);
                data = ((((data) | ((((((__l["m_bus.atn_r"] ?? runtime.memberCall(members.m_bus, "atn_r", 0, __l["atn_r"]))()) ? 0 : 1)) << (7))))) & 0xff);
                return data;
            }
            function method_via0_pa_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_other = members.m_other ?? runtime.member("m_other");
                if (((Number(h_m_other) !== Number(0)) ? 1 : 0)) {
                    (__l["m_other.parallel_data_w"] ?? runtime.memberCall(members.m_other, "parallel_data_w", 0, __l["parallel_data_w"]))(data);
                }
            }
            function method_via0_pb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_data_out = (((data) >>> (1)) & 1);
                (__l["m_ga.atna_w"] ?? runtime.memberCall(members.m_ga, "atna_w", 0, undefined))((((data) >>> (4)) & 1));
                (__l["m_bus.clk_w"] ?? runtime.memberCall(members.m_bus, "clk_w", 0, __l["clk_w"]))((members.this ?? runtime.member("this")), (((((data) >>> (3)) & 1)) ? 0 : 1));
            }
            function method_via0_ca2_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                const h_m_other = members.m_other ?? runtime.member("m_other");
                if (((Number(h_m_other) !== Number(0)) ? 1 : 0)) {
                    (__l["m_other.parallel_strobe_w"] ?? runtime.memberCall(members.m_other, "parallel_strobe_w", 0, __l["parallel_strobe_w"]))(state);
                }
            }
            function method_via0_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_via0_irq = state;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((((members.m_via0_irq ?? runtime.member("m_via0_irq"))) || ((members.m_via1_irq ?? runtime.member("m_via1_irq")))) ? 1 : 0)) ? (1) : (0)));
            }
            function method_via1_pb_r(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((0) & 0xff);
                data = ((((data) | ((((((__l["m_floppy.wpt_r"] ?? runtime.memberCall(members.m_floppy, "wpt_r", 0, undefined))()) ? 0 : 1)) << (4))))) & 0xff);
                data = ((((data) | ((((__l["m_ga.sync_r"] ?? runtime.memberCall(members.m_ga, "sync_r", 0, undefined))()) << (7))))) & 0xff);
                return data;
            }
            function method_via1_pb_w(runtime, data) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                if (((Number((__l["machine().phase"]?.() ?? 0)) !== Number(3)) ? 1 : 0)) {
                    return;
                }
                (__l["m_ga.mtr_w"] ?? runtime.memberCall(members.m_ga, "mtr_w", 0, undefined))((((data) >>> (2)) & 1));
                (__l["m_ga.stp_w"] ?? runtime.memberCall(members.m_ga, "stp_w", 0, undefined))(((data) & (3)));
                runtime.writeIndex(runtime.writableMember("m_leds"), 1, (((data) >>> (3)) & 1));
                (__l["m_ga.ds_w"] ?? runtime.memberCall(members.m_ga, "ds_w", 0, undefined))(((runtime.shiftRight(data, 5)) & (3)));
            }
            function method_via1_irq_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                members.m_via1_irq = state;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(0, ((((((members.m_via0_irq ?? runtime.member("m_via0_irq"))) || ((members.m_via1_irq ?? runtime.member("m_via1_irq")))) ? 1 : 0)) ? (1) : (0)));
            }
            function method_atn_w(runtime, state) {
                const members = runtime.members;
                (runtime.overrides["set_iec_data"] ? runtime.overrides["set_iec_data"]() : method_set_iec_data(runtime));
            }
            function method_set_iec_data(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                let data = ((((((((members.m_data_out ?? runtime.member("m_data_out"))) ? 0 : 1)) && ((((__l["m_ga.atn_r"] ?? runtime.memberCall(members.m_ga, "atn_r", 0, undefined))()) ? 0 : 1))) ? 1 : 0)) | 0);
                (__l["m_bus.data_w"] ?? runtime.memberCall(members.m_bus, "data_w", 0, __l["data_w"]))((members.this ?? runtime.member("this")), data);
            }
            function method_byte_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.set_input_line"] ?? runtime.memberCall(members.m_maincpu, "set_input_line", 0, undefined))(16, state);
                (__l["m_via1.write_ca1"] ?? runtime.memberCall(members.m_via1, "write_ca1", 0, undefined))(state);
            }
            function method_cbm_iec_atn(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_via0.write_ca1"] ?? runtime.memberCall(members.m_via0, "write_ca1", 0, undefined))(((state) ? 0 : 1));
                (__l["m_ga.atni_w"] ?? runtime.memberCall(members.m_ga, "atni_w", 0, undefined))(((state) ? 0 : 1));
                (runtime.overrides["set_iec_data"] ? runtime.overrides["set_iec_data"]() : method_set_iec_data(runtime));
            }
            function method_cbm_iec_reset(runtime, state) {
                const members = runtime.members;
                if (((state) ? 0 : 1)) {
                    (runtime.overrides["device_reset"] ? runtime.overrides["device_reset"]() : method_device_reset(runtime));
                }
            }
            function method_device_reset(runtime) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_maincpu.reset"] ?? runtime.memberCall(members.m_maincpu, "reset", 0, undefined))();
                (__l["m_via0.reset"] ?? runtime.memberCall(members.m_via0, "reset", 0, undefined))();
                (__l["m_via1.reset"] ?? runtime.memberCall(members.m_via1, "reset", 0, undefined))();
                (__l["m_ga.accl_w"] ?? runtime.memberCall(members.m_ga, "accl_w", 0, undefined))(0);
                (__l["m_ga.ted_w"] ?? runtime.memberCall(members.m_ga, "ted_w", 0, undefined))(1);
            }
            function method_parallel_strobe_w(runtime, state) {
                const members = runtime.members;
                const __l = runtime.links ?? runtime.calls;
                (__l["m_via0.write_cb1"] ?? runtime.memberCall(members.m_via0, "write_cb1", 0, undefined))(state);
            }
            return {
                "read": method_read,
                "read_memory": method_read_memory,
                "read_pla": method_read_pla,
                "write": method_write,
                "write_memory": method_write_memory,
                "vic_videoram_r": method_vic_videoram_r,
                "vic_colorram_r": method_vic_colorram_r,
                "cpu_r": method_cpu_r,
                "sid_potx_r": method_sid_potx_r,
                "sid_poty_r": method_sid_poty_r,
                "cia1_pa_r": method_cia1_pa_r,
                "cia1_pb_r": method_cia1_pb_r,
                "cia2_pa_r": method_cia2_pa_r,
                "cia2_pb_r": method_cia2_pb_r,
                "cass_rd_w": method_cass_rd_w,
                "update_cia1_flag": method_update_cia1_flag,
                "iec_srq_w": method_iec_srq_w,
                "exp_reset_w": method_exp_reset_w,
                "machine_reset": method_machine_reset,
                "exp_dma_w": method_exp_dma_w,
                "write_user_pb0": method_write_user_pb0,
                "write_user_pb1": method_write_user_pb1,
                "write_user_pb2": method_write_user_pb2,
                "write_user_pb3": method_write_user_pb3,
                "write_user_pb4": method_write_user_pb4,
                "write_user_pb5": method_write_user_pb5,
                "write_user_pb6": method_write_user_pb6,
                "write_user_pb7": method_write_user_pb7,
                "write_user_pa2": method_write_user_pa2,
                "via0_pa_r": method_via0_pa_r,
                "via0_pb_r": method_via0_pb_r,
                "via0_pa_w": method_via0_pa_w,
                "via0_pb_w": method_via0_pb_w,
                "via0_ca2_w": method_via0_ca2_w,
                "via0_irq_w": method_via0_irq_w,
                "via1_pb_r": method_via1_pb_r,
                "via1_pb_w": method_via1_pb_w,
                "via1_irq_w": method_via1_irq_w,
                "atn_w": method_atn_w,
                "set_iec_data": method_set_iec_data,
                "byte_w": method_byte_w,
                "cbm_iec_atn": method_cbm_iec_atn,
                "cbm_iec_reset": method_cbm_iec_reset,
                "device_reset": method_device_reset,
                "parallel_strobe_w": method_parallel_strobe_w
            };
        })();
        return {
            "c1541_device_base.via0_pa_r": methods["via0_pa_r"],
            "c1541_device_base.via0_pb_r": methods["via0_pb_r"],
            "c1541_device_base.via0_pa_w": methods["via0_pa_w"],
            "c1541_device_base.via0_pb_w": methods["via0_pb_w"],
            "c1541_device_base.via0_ca2_w": methods["via0_ca2_w"],
            "c1541_device_base.via0_irq_w": methods["via0_irq_w"],
            "c1541_device_base.via1_pb_r": methods["via1_pb_r"],
            "c1541_device_base.via1_pb_w": methods["via1_pb_w"],
            "c1541_device_base.via1_irq_w": methods["via1_irq_w"],
            "c1541_device_base.atn_w": methods["atn_w"],
            "c1541_device_base.set_iec_data": methods["set_iec_data"],
            "c1541_device_base.byte_w": methods["byte_w"],
            "c1541_device_base.cbm_iec_atn": methods["cbm_iec_atn"],
            "c1541_device_base.cbm_iec_reset": methods["cbm_iec_reset"],
            "c1541_device_base.device_reset": methods["device_reset"],
            "c1541_device_base.parallel_strobe_w": methods["parallel_strobe_w"],
        };
    })(),
};
// The host call names those handlers reach, resolved once into a fast table.
defined.compiledHandlerLinks = ["atn_r", "clk_r", "clk_w", "cur1.has_pot_x", "cur1.has_pot_y", "cur1.joy_w", "cur1.read_joy", "cur1.read_pot_x", "cur1.read_pot_y", "cur2.has_pot_x", "cur2.has_pot_y", "cur2.read_joy", "cur2.read_pot_x", "cur2.read_pot_y", "dasm_vector", "dasm_zeropage", "dasm_zeropage_vector", "data_r", "data_w", "get_address", "has_pot_x", "has_pot_y", "joy_w", "m_bus.atn_r", "m_bus.clk_r", "m_bus.clk_w", "m_bus.data_r", "m_bus.data_w", "m_cassette.motor_w", "m_cassette.sense_r", "m_cassette.write", "m_cia1.flag_w", "m_cia1.pa_r", "m_cia1.pb_r", "m_cia1.read", "m_cia1.reset", "m_cia1.write", "m_cia2.read", "m_cia2.reset", "m_cia2.write", "m_exp.cd_r", "m_exp.cd_w", "m_exp.exrom_r", "m_exp.game_r", "m_exp.reset", "m_floppy.wpt_r", "m_ga.accl_w", "m_ga.atn_r", "m_ga.atna_w", "m_ga.atni_w", "m_ga.ds_w", "m_ga.mtr_w", "m_ga.stp_w", "m_ga.sync_r", "m_ga.ted_w", "m_iec.clk_r", "m_iec.data_r", "m_iec.host_atn_w", "m_iec.host_clk_w", "m_iec.host_data_w", "m_iec.reset", "m_lock.read", "m_maincpu.reset", "m_maincpu.set_input_line", "m_other.parallel_data_w", "m_other.parallel_strobe_w", "m_pla.read", "m_portswap.read", "m_ram.pointer", "m_row[0].read", "m_row[1].read", "m_row[2].read", "m_row[3].read", "m_row[4].read", "m_row[5].read", "m_row[6].read", "m_row[7].read", "m_sid.read", "m_sid.reset", "m_sid.write", "m_slot.get_address", "m_user.write_3", "m_user.write_c", "m_user.write_d", "m_user.write_e", "m_user.write_f", "m_user.write_h", "m_user.write_j", "m_user.write_k", "m_user.write_l", "m_user.write_m", "m_via0.reset", "m_via0.write_ca1", "m_via0.write_cb1", "m_via1.reset", "m_via1.write_ca1", "m_vic.aec_r", "m_vic.ba_r", "m_vic.bus_r", "m_vic.lp_w", "m_vic.phi0_r", "m_vic.read", "m_vic.reset", "m_vic.write", "machine", "machine().phase", "opcodes.r8", "parallel_data_w", "parallel_strobe_w", "r8", "read", "read_joy", "read_pot_x", "read_pot_y"];
export default {
    machine: defined,
    createBoard: (config, regions, inputs, sinks) => createGeneratedBoard(defined, config, regions, inputs, sinks),
};
