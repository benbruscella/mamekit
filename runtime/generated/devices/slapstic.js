import deviceData from './slapstic.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_set_bank(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        ((runtime.dereference(members.m_bank)).set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) ?? 0);
    }
    function method_set_view(runtime, view) {
        const members = runtime.members;
        members.m_view = ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => view, set: (value) => { view = value; } }), offset: 0 });
    }
    function method_set_chipnum(runtime, chipnum) {
        const members = runtime.members;
        members.m_chipnum = ((chipnum) | 0);
    }
    function method_atari_slapstic_device__set_bank(runtime, tag) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        ((runtime.dereference(members.m_bank)).set_tag?.((__l["std::forward"] ? __l["std::forward"](tag) : runtime.macro("std::forward", tag))) ?? 0);
    }
    function method_atari_slapstic_device__set_view(runtime, view) {
        const members = runtime.members;
        members.m_view = ({ generatedPointer: true, target: ({ generatedLValue: true, get: () => view, set: (value) => { view = value; } }), offset: 0 });
    }
    function method_atari_slapstic_device__set_chipnum(runtime, chipnum) {
        const members = runtime.members;
        members.m_chipnum = ((chipnum) | 0);
    }
    function method_tmatch(runtime, slot, addr) {
        const members = runtime.members;
        return ((Number(((addr) & (runtime.readIndex((members.m_t_m ?? 0), slot)))) === Number(runtime.readIndex((members.m_t_v ?? 0), slot))) ? 1 : 0);
    }
    function method_test(runtime, addr) {
        const members = runtime.members;
        if (((Number((members.m_state ?? 0)) === Number(0)) ? 1 : 0)) {
            if (method_tmatch(runtime, 0, addr)) {
                members.m_state = 1;
            }
        }
        else {
            if (((Number((members.m_state ?? 0)) === Number(1)) ? 1 : 0)) {
                if (method_tmatch(runtime, 2, addr)) {
                    method_change_bank(runtime, 0);
                    members.m_state = 0;
                }
                else {
                    if (method_tmatch(runtime, 3, addr)) {
                        method_change_bank(runtime, 1);
                        members.m_state = 0;
                    }
                    else {
                        if (method_tmatch(runtime, 4, addr)) {
                            method_change_bank(runtime, 2);
                            members.m_state = 0;
                        }
                        else {
                            if (method_tmatch(runtime, 5, addr)) {
                                method_change_bank(runtime, 3);
                                members.m_state = 0;
                            }
                            else {
                                if (method_tmatch(runtime, 6, addr)) {
                                    members.m_state = 2;
                                }
                                else {
                                    if (((((members.m_has_bit ?? 0)) && (method_tmatch(runtime, 7, addr))) ? 1 : 0)) {
                                        members.m_state = 5;
                                    }
                                    else {
                                        if (((((members.m_has_add ?? 0)) && (method_tmatch(runtime, 8, addr))) ? 1 : 0)) {
                                            members.m_state = 8;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                if (((Number((members.m_state ?? 0)) === Number(2)) ? 1 : 0)) {
                    if (method_tmatch(runtime, 0, addr)) {
                        members.m_state = 1;
                    }
                    else {
                        if (((((members.m_alt_valid_outside ?? 0)) && (method_tmatch(runtime, 1, addr))) ? 1 : 0)) {
                            members.m_state = 1;
                        }
                        else {
                            if (method_tmatch(runtime, 9, addr)) {
                                members.m_state = 3;
                            }
                            else {
                                if (((((members.m_has_add ?? 0)) && (method_tmatch(runtime, 10, addr))) ? 1 : 0)) {
                                    members.m_state = 8;
                                }
                                else {
                                    members.m_state = 1;
                                }
                            }
                        }
                    }
                }
                else {
                    if (((Number((members.m_state ?? 0)) === Number(3)) ? 1 : 0)) {
                        if (method_tmatch(runtime, 0, addr)) {
                            members.m_state = 1;
                        }
                        else {
                            if (method_tmatch(runtime, 11, addr)) {
                                members.m_loaded_bank = ((((((addr) >>> ((members.m_alt_shift ?? 0)))) & (3))) & 0xff);
                                members.m_state = 4;
                            }
                            else {
                                members.m_state = 1;
                            }
                        }
                    }
                    else {
                        if (((Number((members.m_state ?? 0)) === Number(4)) ? 1 : 0)) {
                            if (method_tmatch(runtime, 0, addr)) {
                                members.m_state = 1;
                            }
                            else {
                                if (method_tmatch(runtime, 12, addr)) {
                                    method_commit_bank(runtime);
                                    members.m_state = 0;
                                }
                            }
                        }
                        else {
                            if (((Number((members.m_state ?? 0)) === Number(5)) ? 1 : 0)) {
                                if (method_tmatch(runtime, 0, addr)) {
                                    members.m_state = 1;
                                }
                                else {
                                    if (method_tmatch(runtime, 13, addr)) {
                                        members.m_loaded_bank = (((members.m_current_bank ?? 0)) & 0xff);
                                        members.m_state = 6;
                                    }
                                }
                            }
                            else {
                                if (((Number((members.m_state ?? 0)) === Number(6)) ? 1 : 0)) {
                                    if (method_tmatch(runtime, 0, addr)) {
                                        members.m_state = 1;
                                    }
                                    else {
                                        if (method_tmatch(runtime, 14, addr)) {
                                            members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) & (-2))) & 0xff);
                                            members.m_state = 7;
                                        }
                                        else {
                                            if (method_tmatch(runtime, 15, addr)) {
                                                members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) | (1))) & 0xff);
                                                members.m_state = 7;
                                            }
                                            else {
                                                if (method_tmatch(runtime, 16, addr)) {
                                                    members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) & (-3))) & 0xff);
                                                    members.m_state = 7;
                                                }
                                                else {
                                                    if (method_tmatch(runtime, 17, addr)) {
                                                        members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) | (2))) & 0xff);
                                                        members.m_state = 7;
                                                    }
                                                    else {
                                                        if (method_tmatch(runtime, 22, addr)) {
                                                            method_commit_bank(runtime);
                                                            members.m_state = 0;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    if (((Number((members.m_state ?? 0)) === Number(7)) ? 1 : 0)) {
                                        if (method_tmatch(runtime, 0, addr)) {
                                            members.m_state = 1;
                                        }
                                        else {
                                            if (method_tmatch(runtime, 18, addr)) {
                                                members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) & (-2))) & 0xff);
                                                members.m_state = 6;
                                            }
                                            else {
                                                if (method_tmatch(runtime, 19, addr)) {
                                                    members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) | (1))) & 0xff);
                                                    members.m_state = 6;
                                                }
                                                else {
                                                    if (method_tmatch(runtime, 20, addr)) {
                                                        members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) & (-3))) & 0xff);
                                                        members.m_state = 6;
                                                    }
                                                    else {
                                                        if (method_tmatch(runtime, 21, addr)) {
                                                            members.m_loaded_bank = (((((members.m_loaded_bank ?? 0)) | (2))) & 0xff);
                                                            members.m_state = 6;
                                                        }
                                                        else {
                                                            if (method_tmatch(runtime, 22, addr)) {
                                                                method_commit_bank(runtime);
                                                                members.m_state = 0;
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        if (((Number((members.m_state ?? 0)) === Number(8)) ? 1 : 0)) {
                                            if (method_tmatch(runtime, 0, addr)) {
                                                members.m_state = 1;
                                            }
                                            else {
                                                if (method_tmatch(runtime, 23, addr)) {
                                                    members.m_loaded_bank = (((members.m_current_bank ?? 0)) & 0xff);
                                                    members.m_state = 9;
                                                }
                                                else {
                                                    members.m_state = 1;
                                                }
                                            }
                                        }
                                        else {
                                            if (((Number((members.m_state ?? 0)) === Number(9)) ? 1 : 0)) {
                                                if (method_tmatch(runtime, 0, addr)) {
                                                    members.m_state = 1;
                                                }
                                                else {
                                                    if (method_tmatch(runtime, 24, addr)) {
                                                        members.m_loaded_bank = (((((((members.m_loaded_bank ?? 0)) + (1))) & (3))) & 0xff);
                                                    }
                                                    else {
                                                        if (method_tmatch(runtime, 25, addr)) {
                                                            members.m_loaded_bank = (((((((members.m_loaded_bank ?? 0)) + (2))) & (3))) & 0xff);
                                                        }
                                                        else {
                                                            if (method_tmatch(runtime, 26, addr)) {
                                                                members.m_state = 4;
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
            }
        }
    }
    function method_change_bank(runtime, bank) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_current_bank = ((bank) & 0xff);
        (__l["set_bank_entry"] ? __l["set_bank_entry"]((members.m_current_bank ?? 0)) : runtime.macro("set_bank_entry", (members.m_current_bank ?? 0)));
    }
    function method_commit_bank(runtime) {
        const members = runtime.members;
        method_change_bank(runtime, (members.m_loaded_bank ?? 0));
    }
    return {
        "set_bank": method_set_bank,
        "set_view": method_set_view,
        "set_chipnum": method_set_chipnum,
        "atari_slapstic_device::set_bank": method_atari_slapstic_device__set_bank,
        "atari_slapstic_device::set_view": method_atari_slapstic_device__set_view,
        "atari_slapstic_device::set_chipnum": method_atari_slapstic_device__set_chipnum,
        "tmatch": method_tmatch,
        "test": method_test,
        "change_bank": method_change_bank,
        "commit_bank": method_commit_bank
    };
})();
definition.compiledMethodLinks = ["set_bank_entry", "std::forward"];
export const device = definition;
export default device;
