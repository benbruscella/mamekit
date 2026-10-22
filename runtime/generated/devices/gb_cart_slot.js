import deviceData from './gb_cart_slot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = {};
definition.slot.options["rom"].compiledMethods = (() => {
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_wisdom"].compiledMethods = (() => {
    function method_bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        method_set_bank_rom(runtime, offset);
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
    }
    function method_wisdom_device__bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        method_set_bank_rom(runtime, offset);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "wisdom_device::bank_rom_switch": method_wisdom_device__bank_rom_switch,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_wisdom"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_yong"].compiledMethods = (() => {
    function method_bank_rom_switch(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom(runtime, data);
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_yong"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_rock8"].compiledMethods = (() => {
    function method_bank_rom_switch(runtime, data) {
        const members = runtime.members;
        data = ((((data) & (31))) & 0xff);
        method_set_bank_rom(runtime, ((((data) ? 0 : 1)) ? (1) : (((((Number(15) < Number(data)) ? 1 : 0)) ? (((data) - (8))) : (data)))));
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_rock8"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_sachen1"].compiledMethods = (() => {
    function method_rom_read(runtime, offset, spoof) {
        const members = runtime.members;
        if (spoof) {
            offset = ((offset) | (128));
        }
        if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
            offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
        }
        return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
    }
    function method_bank_rom_high_base(runtime) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return (typeof (runtime.dereference(h_m_bank_rom[1])).base === 'function' ? (runtime.dereference(h_m_bank_rom[1])).base() : typeof (runtime.dereference(h_m_bank_rom[1])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[1])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[1])).base : runtime.container(h_m_bank_rom[1], "base"));
    }
    function method_bank_rom_low_base(runtime) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        return (typeof (runtime.dereference(h_m_bank_rom[0])).base === 'function' ? (runtime.dereference(h_m_bank_rom[0])).base() : typeof (runtime.dereference(h_m_bank_rom[0])).base === 'number' || typeof (runtime.dereference(h_m_bank_rom[0])).base === 'boolean' ? (runtime.dereference(h_m_bank_rom[0])).base : runtime.container(h_m_bank_rom[0], "base"));
    }
    function method_bank_rom_switch_outer(runtime, data) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        if (((Number(48) === Number(((h_m_bank_sel_rom[1]) & (48)))) ? 1 : 0)) {
            h_m_bank_sel_rom[0] = data;
            method_update_banks(runtime);
        }
    }
    function method_update_banks(runtime) {
        const members = runtime.members;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        method_set_bank_rom_low(runtime, lo);
        method_set_bank_rom_high(runtime, hi);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) & 0xff);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & ((members.m_bank_mux_rom ?? 0)))) | (((h_m_bank_sel_rom[1]) & ((~(members.m_bank_mux_rom ?? 0))))))) & 0xff);
    }
    function method_set_bank_rom_low(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(entry) ?? 0);
    }
    function method_set_bank_rom_high(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(entry) ?? 0);
    }
    function method_bank_rom_switch_inner(runtime, data) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        h_m_bank_sel_rom[1] = ((data) ? (data) : (1));
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        method_set_bank_rom_high(runtime, hi);
    }
    function method_bank_rom_mux(runtime, data) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        if (((Number(48) === Number(((h_m_bank_sel_rom[1]) & (48)))) ? 1 : 0)) {
            members.m_bank_mux_rom = ((data) & 0xff);
            method_update_banks(runtime);
        }
    }
    function method_sachen_mmc_device_base__rom_read(runtime, offset, spoof) {
        const members = runtime.members;
        if (spoof) {
            offset = ((offset) | (128));
        }
        if (((Number(256) === Number(((offset) & (65280)))) ? 1 : 0)) {
            offset = ((((offset) & (65408))) | (((((offset) >>> (0)) & 1) << 6 | (((offset) >>> (5)) & 1) << 5 | (((offset) >>> (1)) & 1) << 4 | (((offset) >>> (3)) & 1) << 3 | (((offset) >>> (2)) & 1) << 2 | (((offset) >>> (4)) & 1) << 1 | (((offset) >>> (6)) & 1) << 0)));
        }
        return runtime.readIndex((((((offset) >>> (14)) & 1)) ? (method_bank_rom_high_base(runtime)) : (method_bank_rom_low_base(runtime))), ((offset) & (16383)));
    }
    function method_read_rom(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if (((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0)) {
                members.m_counter = ((((members.m_counter) + (1))) & 0xff);
            }
        }
        return ((method_rom_read(runtime, offset, ((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0))) & 0xff);
    }
    function method_sachen_mmc1_device__read_rom(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if (((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0)) {
                members.m_counter = ((((members.m_counter) + (1))) & 0xff);
            }
        }
        return ((method_rom_read(runtime, offset, ((Number(49) !== Number((members.m_counter ?? 0))) ? 1 : 0))) & 0xff);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "rom_read": method_rom_read,
        "bank_rom_high_base": method_bank_rom_high_base,
        "bank_rom_low_base": method_bank_rom_low_base,
        "bank_rom_switch_outer": method_bank_rom_switch_outer,
        "update_banks": method_update_banks,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "set_bank_rom_low": method_set_bank_rom_low,
        "set_bank_rom_high": method_set_bank_rom_high,
        "bank_rom_switch_inner": method_bank_rom_switch_inner,
        "bank_rom_mux": method_bank_rom_mux,
        "sachen_mmc_device_base::rom_read": method_sachen_mmc_device_base__rom_read,
        "read_rom": method_read_rom,
        "sachen_mmc1_device::read_rom": method_sachen_mmc1_device__read_rom,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_sachen1"].compiledMethodLinks = ["machine", "machine().side_effects_disabled", "std::bit_width", "std::forward"];
definition.slot.options["rom_lasama"].compiledMethods = (() => {
    function method_ctrl_2080_w(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_fine(runtime, ((data) & (3)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_ctrl_6000_w(runtime, data) {
        const members = runtime.members;
        if ((((((data) >>> (7)) & 1)) ? 0 : 1)) {
            method_set_bank_rom_coarse(runtime, (((data) >>> (1)) & 1));
        }
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "ctrl_2080_w": method_ctrl_2080_w,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "ctrl_6000_w": method_ctrl_6000_w,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_lasama"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_mbc1"].compiledMethods = (() => {
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_set_bank_rom_coarse(runtime, ((data) & (h_m_bank_lines[1])));
        method_set_bank_ram(runtime, ((data) & (h_m_bank_lines[1])));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        method_set_ram_enable(runtime, ((Number(10) === Number(((data) & (15)))) ? 1 : 0));
    }
    function method_set_ram_enable(runtime, enable) {
        const members = runtime.members;
        0;
        if (enable) {
            ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
        }
        else {
            (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
        }
    }
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((((data) & (31))) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (h_m_bank_lines[0])));
    }
    function method_mbc_dual_device_base__set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_low_mask(runtime, data) {
        const members = runtime.members;
        let mask = ((((((data) ? (3) : (0))) & 0xff)) & 0xff);
        0;
        method_set_bank_rom_low_coarse_mask(runtime, mask);
        method_set_bank_ram_mask(runtime, mask);
    }
    function method_set_bank_rom_low_coarse_mask(runtime, mask) {
        const members = runtime.members;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_rom_coarse_mask[0] = mask;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
    }
    function method_set_bank_ram_mask(runtime, mask) {
        const members = runtime.members;
        members.m_bank_ram_mask = ((mask) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            let entry = ((((method_bank_ram_entry(runtime)) & 0xff)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "bank_switch_coarse": method_bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "enable_ram": method_enable_ram,
        "set_ram_enable": method_set_ram_enable,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
        "bank_low_mask": method_bank_low_mask,
        "set_bank_rom_low_coarse_mask": method_set_bank_rom_low_coarse_mask,
        "set_bank_ram_mask": method_set_bank_ram_mask,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_mbc1"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_mbc2"].compiledMethods = (() => {
    function method_ram_mbc_read(runtime, space, offset) {
        const members = runtime.members;
        if ((members.m_ram_mbc_enable ?? 0)) {
            return ((((((runtime.readIndex((members.m_ram_mbc ?? 0), offset)) & (15))) | ((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (240))))) & 0xff);
        }
        else {
            return (((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & 0xff);
        }
    }
    function method_ram_mbc_write(runtime, offset, data) {
        const members = runtime.members;
        if ((members.m_ram_mbc_enable ?? 0)) {
            runtime.writeIndex(runtime.writableMember("m_ram_mbc"), offset, ((data) & (15)));
        }
    }
    function method_ram_mbc_enable(runtime, data) {
        const members = runtime.members;
        members.m_ram_mbc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        0;
    }
    function method_bank_rom_switch(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        data = ((((data) & (15))) & 0xff);
        (__l["set_bank_rom"] ? __l["set_bank_rom"](((data) ? (data) : (1))) : runtime.macro("set_bank_rom", ((data) ? (data) : (1))));
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "ram_mbc_read": method_ram_mbc_read,
        "ram_mbc_write": method_ram_mbc_write,
        "ram_mbc_enable": method_ram_mbc_enable,
        "bank_rom_switch": method_bank_rom_switch,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_mbc2"].compiledMethodLinks = ["set_bank_rom", "std::bit_width", "std::forward"];
definition.slot.options["rom_mbc3"].compiledMethods = (() => {
    function method_enable_ram_rtc(runtime, data) {
        const members = runtime.members;
        members.m_rtc_enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        if ((((members.m_rtc_enable ?? 0)) ? 0 : 1)) {
            0;
            (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
        }
        else {
            if (method_rtc_select(runtime)) {
                0;
                ((runtime.dereference(members.m_view_ram)).select?.(1) ?? 0);
            }
            else {
                0;
                ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
            }
        }
    }
    function method_rtc_select(runtime) {
        const members = runtime.members;
        return ((((members.m_rtc_select ?? 0)) >>> (3)) & 1);
    }
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        data = ((((data) & (127))) & 0xff);
        method_set_bank_rom_fine(runtime, ((data) ? (data) : (1)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_select_ram_rtc(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_coarse(runtime, ((data) & (7)));
        method_set_bank_ram(runtime, ((data) & (7)));
        members.m_rtc_select = ((data) & 0xff);
        if ((members.m_rtc_enable ?? 0)) {
            if ((((data) >>> (3)) & 1)) {
                0;
                ((runtime.dereference(members.m_view_ram)).select?.(1) ?? 0);
            }
            else {
                0;
                ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
            }
        }
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_latch_rtc(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        0;
        if ((((((((((members.m_rtc_latch ?? 0)) >>> (0)) & 1)) ? 0 : 1)) && ((((data) >>> (0)) & 1))) ? 1 : 0)) {
            0;
            (__l["std::copy"] ? __l["std::copy"]((__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[0]) : runtime.macro("std::begin", h_m_rtc_regs[0])), (__l["std::end"] ? __l["std::end"](h_m_rtc_regs[0]) : runtime.macro("std::end", h_m_rtc_regs[0])), (__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[1]) : runtime.macro("std::begin", h_m_rtc_regs[1]))) : runtime.macro("std::copy", (__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[0]) : runtime.macro("std::begin", h_m_rtc_regs[0])), (__l["std::end"] ? __l["std::end"](h_m_rtc_regs[0]) : runtime.macro("std::end", h_m_rtc_regs[0])), (__l["std::begin"] ? __l["std::begin"](h_m_rtc_regs[1]) : runtime.macro("std::begin", h_m_rtc_regs[1]))));
        }
        members.m_rtc_latch = ((data) & 0xff);
    }
    function method_read_rtc(runtime, space) {
        const members = runtime.members;
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        let reg = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
        if (((Number(((h_m_rtc_regs[1])?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
            0;
            return ((runtime.readIndex(h_m_rtc_regs[1], reg)) & 0xff);
        }
        else {
            0;
            return (((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & 0xff);
        }
    }
    function method_rtc_register(runtime) {
        const members = runtime.members;
        return (((members.m_rtc_select ?? 0)) & (7));
    }
    function method_write_rtc(runtime, data) {
        const members = runtime.members;
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        let reg = ((((method_rtc_register(runtime)) & 0xff)) & 0xff);
        if (((Number(((h_m_rtc_regs[0])?.length ?? 0)) > Number(reg)) ? 1 : 0)) {
            0;
            if (((Number(4) === Number(reg)) ? 1 : 0)) {
                data = ((((data) & (193))) & 0xff);
                runtime.writeIndex(h_m_rtc_regs[0], reg, data);
            }
            else {
                runtime.writeIndex(h_m_rtc_regs[0], reg, data);
            }
        }
        else {
            0;
        }
    }
    function method_rtc_advance_seconds(runtime, param) {
        const members = runtime.members;
        const h_m_rtc_regs = members.m_rtc_regs ?? 0;
        if ((((runtime.readIndex(h_m_rtc_regs[0], 4)) >>> (6)) & 1)) {
            return;
        }
        if (runtime.invoke("rtc_increment", 0)) {
            return;
        }
        if (runtime.invoke("rtc_increment", 1)) {
            return;
        }
        if (runtime.invoke("rtc_increment", 2)) {
            return;
        }
        if ((runtime.writeIndex(h_m_rtc_regs[0], 3, ((runtime.readIndex(h_m_rtc_regs[0], 3)) + (1))))) {
            return;
        }
        if ((((runtime.readIndex(h_m_rtc_regs[0], 4)) >>> (0)) & 1)) {
            0;
            runtime.writeIndex(h_m_rtc_regs[0], 4, ((runtime.readIndex(h_m_rtc_regs[0], 4)) | (128)));
        }
        runtime.writeIndex(h_m_rtc_regs[0], 4, ((runtime.readIndex(h_m_rtc_regs[0], 4)) ^ (1)));
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "enable_ram_rtc": method_enable_ram_rtc,
        "rtc_select": method_rtc_select,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "select_ram_rtc": method_select_ram_rtc,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "latch_rtc": method_latch_rtc,
        "read_rtc": method_read_rtc,
        "rtc_register": method_rtc_register,
        "write_rtc": method_write_rtc,
        "rtc_advance_seconds": method_rtc_advance_seconds,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_mbc3"].compiledMethodLinks = ["std::begin", "std::bit_width", "std::copy", "std::end", "std::forward"];
definition.slot.options["rom_mbc5"].compiledMethods = (() => {
    function method_rom_mbc_device_base__bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_set_bank_rom_coarse(runtime, ((data) & (h_m_bank_lines[1])));
        method_set_bank_ram(runtime, ((data) & (h_m_bank_lines[1])));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        method_set_ram_enable(runtime, ((Number(10) === Number(data)) ? 1 : 0));
    }
    function method_set_ram_enable(runtime, enable) {
        const members = runtime.members;
        0;
        if (enable) {
            ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
        }
        else {
            (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
        }
    }
    function method_bank_switch_fine_low(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (256))) | (((data) & 0xffff))));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_lines = members.m_bank_lines ?? 0;
        method_mbc_dual_device_base__set_bank_rom_fine(runtime, ((entry) & (h_m_bank_lines[0])));
    }
    function method_mbc_dual_device_base__set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_fine(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        return ((h_m_bank_sel_rom[1]) & 0xffff);
    }
    function method_bank_switch_fine_high(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_fine(runtime, ((((method_bank_rom_fine(runtime)) & (255))) | (((((((data) & (1))) & 0xffff)) << (8)))));
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "rom_mbc_device_base::bank_switch_coarse": method_rom_mbc_device_base__bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "enable_ram": method_enable_ram,
        "set_ram_enable": method_set_ram_enable,
        "bank_switch_fine_low": method_bank_switch_fine_low,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "mbc_dual_device_base::set_bank_rom_fine": method_mbc_dual_device_base__set_bank_rom_fine,
        "bank_rom_fine": method_bank_rom_fine,
        "bank_switch_fine_high": method_bank_switch_fine_high,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_mbc5"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_m161"].compiledMethods = (() => {
    function method_bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        if ((((members.m_bank_lock ?? 0)) ? 0 : 1)) {
            members.m_bank_lock = ((1) & 0xff);
            method_set_bank_rom(runtime, ((data) & (7)));
        }
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
    }
    function method_m161_device__bank_rom_switch(runtime, offset, data) {
        const members = runtime.members;
        if ((((members.m_bank_lock ?? 0)) ? 0 : 1)) {
            members.m_bank_lock = ((1) & 0xff);
            method_set_bank_rom(runtime, ((data) & (7)));
        }
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "bank_rom_switch": method_bank_rom_switch,
        "set_bank_rom": method_set_bank_rom,
        "m161_device::bank_rom_switch": method_m161_device__bank_rom_switch,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_m161"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_mmm01"].compiledMethods = (() => {
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        if (((Number(10) === Number(((data) & (15)))) ? 1 : 0)) {
            0;
            ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
        }
        else {
            0;
            (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
        }
        if ((members.m_config ?? 0)) {
            h_m_bank_prot_sel[0] = (((data) >>> (4)) & ((1 << (2)) - 1));
            0;
            if ((((data) >>> (6)) & 1)) {
                0;
                members.m_config = ((0) & 0xff);
                method_update_bank_rom_low(runtime);
                method_update_bank_rom_high(runtime);
            }
        }
    }
    function method_update_bank_rom_low(runtime) {
        const members = runtime.members;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        let entry = ((0) & 0xffff);
        if ((((members.m_config ?? 0)) ? 0 : 1)) {
            entry = (((((((((members.m_bank_sel_rom_coarse ?? 0)) & 0xffff)) << (7))) | ((((members.m_bank_sel_rom_fine ?? 0)) & (h_m_bank_prot_sel[1]))))) & 0xffff);
            if ((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) {
                entry = ((((entry) | (((h_m_bank_sel_mid[1]) << (5))))) & 0xffff);
            }
            else {
                if ((members.m_bank_low_mid ?? 0)) {
                    entry = ((((entry) | (((h_m_bank_sel_mid[0]) << (5))))) & 0xffff);
                }
            }
        }
        else {
            entry = ((510) & 0xffff);
        }
        method_set_bank_rom_low(runtime, entry);
    }
    function method_set_bank_rom_low(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(entry) ?? 0);
    }
    function method_update_bank_rom_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        let entry = ((0) & 0xffff);
        if ((((members.m_config ?? 0)) ? 0 : 1)) {
            entry = (((((((((members.m_bank_sel_rom_coarse ?? 0)) & 0xffff)) << (7))) | ((members.m_bank_sel_rom_fine ?? 0)))) & 0xffff);
            if ((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) {
                entry = ((((entry) | (((h_m_bank_sel_mid[1]) << (5))))) & 0xffff);
            }
            else {
                entry = ((((entry) | (((h_m_bank_sel_mid[0]) << (5))))) & 0xffff);
            }
        }
        else {
            entry = ((((510) | ((members.m_bank_sel_rom_fine ?? 0)))) & 0xffff);
        }
        if ((((((members.m_bank_sel_rom_fine ?? 0)) & ((~h_m_bank_prot_sel[1])))) ? 0 : 1)) {
            entry = ((((entry) | (1))) & 0xffff);
        }
        method_set_bank_rom_high(runtime, entry);
    }
    function method_set_bank_rom_high(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(entry) ?? 0);
    }
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        members.m_bank_sel_rom_fine = (((((((members.m_bank_sel_rom_fine ?? 0)) & (h_m_bank_prot_sel[1]))) | ((((((data) >>> (0)) & ((1 << (5)) - 1))) & ((~h_m_bank_prot_sel[1])))))) & 0xff);
        0;
        if ((members.m_config ?? 0)) {
            h_m_bank_sel_mid[1] = (((data) >>> (5)) & ((1 << (2)) - 1));
            0;
        }
        method_update_bank_rom_high(runtime);
        if (((((members.m_config ?? 0)) && ((members.m_mode_large_prg ?? 0))) ? 1 : 0)) {
            method_update_bank_ram(runtime);
        }
    }
    function method_update_bank_ram(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        let entry = (((((((members.m_bank_sel_ram_coarse ?? 0)) << (2))) & 0xff)) & 0xff);
        if ((members.m_mode_large_prg ?? 0)) {
            entry = ((((entry) | (h_m_bank_sel_mid[1]))) & 0xff);
        }
        else {
            if ((members.m_bank_low_mid ?? 0)) {
                entry = ((((entry) | (h_m_bank_sel_mid[0]))) & 0xff);
            }
        }
        method_set_bank_ram(runtime, entry);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        const h_m_bank_sel_mid = members.m_bank_sel_mid ?? 0;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        h_m_bank_sel_mid[0] = ((((h_m_bank_sel_mid[0]) & (h_m_bank_prot_sel[0]))) | ((((((data) >>> (0)) & ((1 << (2)) - 1))) & ((~h_m_bank_prot_sel[0])))));
        0;
        if ((members.m_config ?? 0)) {
            members.m_bank_sel_ram_coarse = (((((data) >>> (2)) & ((1 << (2)) - 1))) & 0xff);
            members.m_bank_sel_rom_coarse = (((((data) >>> (4)) & ((1 << (2)) - 1))) & 0xff);
            members.m_bank_prot_low_mid = (((((data) >>> (6)) & 1)) & 0xff);
            0;
        }
        if (((((members.m_config ?? 0)) || (((((((members.m_mode_large_prg ?? 0)) ? 0 : 1)) && ((members.m_bank_low_mid ?? 0))) ? 1 : 0))) ? 1 : 0)) {
            method_update_bank_ram(runtime);
        }
    }
    function method_enable_bank_low_mid(runtime, data) {
        const members = runtime.members;
        const h_m_bank_prot_sel = members.m_bank_prot_sel ?? 0;
        if ((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) {
            members.m_bank_low_mid = (((((data) >>> (0)) & 1)) & 0xff);
            0;
        }
        if ((members.m_config ?? 0)) {
            h_m_bank_prot_sel[1] = (((((data) >>> (2)) & ((1 << (4)) - 1))) << (1));
            members.m_mode_large_prg = (((((data) >>> (6)) & 1)) & 0xff);
            0;
        }
        if (((((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) && ((((members.m_config ?? 0)) ? 0 : 1))) ? 1 : 0)) {
            method_update_bank_rom_low(runtime);
        }
        if ((members.m_config ?? 0)) {
            method_update_bank_rom_high(runtime);
        }
        if (((((((members.m_bank_prot_low_mid ?? 0)) ? 0 : 1)) || ((members.m_config ?? 0))) ? 1 : 0)) {
            method_update_bank_ram(runtime);
        }
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "enable_ram": method_enable_ram,
        "update_bank_rom_low": method_update_bank_rom_low,
        "set_bank_rom_low": method_set_bank_rom_low,
        "update_bank_rom_high": method_update_bank_rom_high,
        "set_bank_rom_high": method_set_bank_rom_high,
        "bank_switch_fine": method_bank_switch_fine,
        "update_bank_ram": method_update_bank_ram,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "bank_switch_coarse": method_bank_switch_coarse,
        "enable_bank_low_mid": method_enable_bank_low_mid,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_mmm01"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_camera"].compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_n = members.m_n ?? 0;
        const h_m_vh = members.m_vh ?? 0;
        const h_m_e = members.m_e ?? 0;
        const h_m_z = members.m_z ?? 0;
        const h_m_i = members.m_i ?? 0;
        const h_m_c = members.m_c ?? 0;
        const h_m_o = members.m_o ?? 0;
        const h_m_v = members.m_v ?? 0;
        const h_m_g = members.m_g ?? 0;
        method_mbc_ram_device_base__device_start(runtime);
        for (let __range0 = (members.m_threshold ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            for (let __range1 = runtime.readIndex(__range0, __range0_index), __range1_index = 0; ((Number(__range1_index) < Number(__range1.length)) ? 1 : 0); __range1_index = ((__range1_index) + (1))) {
                (__l["std::fill"] ? __l["std::fill"]((__l["std::begin"] ? __l["std::begin"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::begin", runtime.readIndex(__range1, __range1_index))), (__l["std::end"] ? __l["std::end"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::end", runtime.readIndex(__range1, __range1_index))), 0) : runtime.macro("std::fill", (__l["std::begin"] ? __l["std::begin"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::begin", runtime.readIndex(__range1, __range1_index))), (__l["std::end"] ? __l["std::end"](runtime.readIndex(__range1, __range1_index)) : runtime.macro("std::end", runtime.readIndex(__range1, __range1_index))), 0));
            }
        }
        h_m_n[0] = 0;
        h_m_vh[0] = 0;
        h_m_e[0] = 0;
        h_m_z[0] = 0;
        h_m_i[0] = 0;
        h_m_c[0] = 0;
        h_m_o[0] = 0;
        h_m_v[0] = 0;
        h_m_g[0] = 0;
        members.m_p = ((0) & 0xff);
        members.m_m = ((0) & 0xff);
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_busy ?? 0)) : runtime.macro("NAME", (members.m_busy ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_busy ?? 0)) : runtime.macro("NAME", (members.m_busy ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_ram_writable ?? 0)) : runtime.macro("NAME", (members.m_ram_writable ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_ram_writable ?? 0)) : runtime.macro("NAME", (members.m_ram_writable ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_threshold ?? 0)) : runtime.macro("NAME", (members.m_threshold ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_threshold ?? 0)) : runtime.macro("NAME", (members.m_threshold ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_sel_pm ?? 0)) : runtime.macro("NAME", (members.m_sel_pm ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_sel_pm ?? 0)) : runtime.macro("NAME", (members.m_sel_pm ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_n) : runtime.macro("NAME", h_m_n))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_n) : runtime.macro("NAME", h_m_n))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_vh) : runtime.macro("NAME", h_m_vh))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_vh) : runtime.macro("NAME", h_m_vh))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_e) : runtime.macro("NAME", h_m_e))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_e) : runtime.macro("NAME", h_m_e))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_z) : runtime.macro("NAME", h_m_z))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_z) : runtime.macro("NAME", h_m_z))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_i) : runtime.macro("NAME", h_m_i))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_i) : runtime.macro("NAME", h_m_i))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_c) : runtime.macro("NAME", h_m_c))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_c) : runtime.macro("NAME", h_m_c))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_o) : runtime.macro("NAME", h_m_o))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_o) : runtime.macro("NAME", h_m_o))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_v) : runtime.macro("NAME", h_m_v))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_v) : runtime.macro("NAME", h_m_v))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_g) : runtime.macro("NAME", h_m_g))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_g) : runtime.macro("NAME", h_m_g))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_p ?? 0)) : runtime.macro("NAME", (members.m_p ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_p ?? 0)) : runtime.macro("NAME", (members.m_p ?? 0)))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"]((members.m_m ?? 0)) : runtime.macro("NAME", (members.m_m ?? 0)))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"]((members.m_m ?? 0)) : runtime.macro("NAME", (members.m_m ?? 0)))));
    }
    function method_mbc_ram_device_base__device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        method_mbc_device_base__device_start(runtime);
        ((runtime.dereference((members.this ?? 0))).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_bank_sel_ram ?? 0)) : runtime.macro("NAME", (members.m_bank_sel_ram ?? 0)))) ?? 0);
        ((runtime.dereference((members.this ?? 0))).save_item?.((__l["NAME"] ? __l["NAME"]((members.m_bank_mask_ram ?? 0)) : runtime.macro("NAME", (members.m_bank_mask_ram ?? 0)))) ?? 0);
    }
    function method_mbc_device_base__device_start(runtime) {
        const members = runtime.members;
    }
    function method_enable_ram(runtime, data) {
        const members = runtime.members;
        members.m_ram_writable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? (1) : (0))) & 0xff);
        0;
    }
    function method_bank_switch_rom(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom(runtime, ((data) & (63)));
    }
    function method_set_bank_rom(runtime, entry) {
        const members = runtime.members;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(members.m_bank_rom)).set_entry?.(entry) ?? 0);
    }
    function method_bank_switch_ram(runtime, data) {
        const members = runtime.members;
        method_set_bank_ram(runtime, ((data) & (15)));
        0;
        if ((((data) >>> (4)) & 1)) {
            ((runtime.dereference(members.m_view_cam)).select?.(0) ?? 0);
        }
        else {
            (typeof (runtime.dereference(members.m_view_cam)).disable === 'function' ? (runtime.dereference(members.m_view_cam)).disable() : typeof (runtime.dereference(members.m_view_cam)).disable === 'number' || typeof (runtime.dereference(members.m_view_cam)).disable === 'boolean' ? (runtime.dereference(members.m_view_cam)).disable : runtime.container(members.m_view_cam, "disable"));
        }
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return (((((((members.m_busy ?? 0)) ? 0 : 1)) ? (runtime.readIndex(method_bank_ram_base(runtime), offset)) : (0))) & 0xff);
    }
    function method_bank_ram_base(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_bank_ram)).base === 'function' ? (runtime.dereference(members.m_bank_ram)).base() : typeof (runtime.dereference(members.m_bank_ram)).base === 'number' || typeof (runtime.dereference(members.m_bank_ram)).base === 'boolean' ? (runtime.dereference(members.m_bank_ram)).base : runtime.container(members.m_bank_ram, "base"));
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        if (((((((members.m_busy ?? 0)) ? 0 : 1)) && ((members.m_ram_writable ?? 0))) ? 1 : 0)) {
            runtime.writeIndex(method_bank_ram_base(runtime), offset, data);
        }
    }
    function method_read_camera(runtime, offset) {
        const members = runtime.members;
        switch (offset) {
            case 0:
                {
                    return (((((((members.m_sel_pm ?? 0)) << (1))) | ((members.m_busy ?? 0)))) & 0xff);
                }
            default:
                {
                    return ((0) & 0xff);
                }
        }
    }
    function method_write_camera(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_n = members.m_n ?? 0;
        const h_m_vh = members.m_vh ?? 0;
        const h_m_g = members.m_g ?? 0;
        const h_m_c = members.m_c ?? 0;
        const h_m_e = members.m_e ?? 0;
        const h_m_i = members.m_i ?? 0;
        const h_m_v = members.m_v ?? 0;
        const h_m_z = members.m_z ?? 0;
        const h_m_o = members.m_o ?? 0;
        switch (offset) {
            case 0:
                {
                    members.m_sel_pm = (((((data) >>> (1)) & ((1 << (2)) - 1))) & 0xff);
                    0;
                    if ((((data) >>> (0)) & 1)) {
                        if ((((members.m_busy ?? 0)) ? 0 : 1)) {
                            (__l["start_capture"] ? __l["start_capture"]() : runtime.macro("start_capture"));
                        }
                        else {
                            0;
                        }
                    }
                    break;
                }
            case 1:
                {
                    h_m_n[0] = (((data) >>> (7)) & 1);
                    h_m_vh[0] = (((data) >>> (5)) & ((1 << (2)) - 1));
                    h_m_g[0] = (((data) >>> (0)) & ((1 << (5)) - 1));
                    0;
                    break;
                }
            case 2:
                {
                    h_m_c[0] = ((((h_m_c[0]) & (255))) | (((((data) & 0xffff)) << (8))));
                    0;
                    break;
                }
            case 3:
                {
                    h_m_c[0] = ((((h_m_c[0]) & (65280))) | (data));
                    0;
                    break;
                }
            case 4:
                {
                    h_m_e[0] = (((data) >>> (4)) & ((1 << (4)) - 1));
                    h_m_i[0] = (((data) >>> (3)) & 1);
                    h_m_v[0] = (((data) >>> (0)) & ((1 << (3)) - 1));
                    0;
                    break;
                }
            case 5:
                {
                    h_m_z[0] = (((data) >>> (6)) & ((1 << (2)) - 1));
                    h_m_o[0] = (((data) >>> (0)) & ((1 << (6)) - 1));
                    0;
                    break;
                }
        }
    }
    function method_bank_ram(runtime) {
        const members = runtime.members;
        return (((members.m_bank_sel_ram ?? 0)) & 0xff);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "device_start": method_device_start,
        "mbc_ram_device_base::device_start": method_mbc_ram_device_base__device_start,
        "mbc_device_base::device_start": method_mbc_device_base__device_start,
        "enable_ram": method_enable_ram,
        "bank_switch_rom": method_bank_switch_rom,
        "set_bank_rom": method_set_bank_rom,
        "bank_switch_ram": method_bank_switch_ram,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "read_ram": method_read_ram,
        "bank_ram_base": method_bank_ram_base,
        "write_ram": method_write_ram,
        "read_camera": method_read_camera,
        "write_camera": method_write_camera,
        "bank_ram": method_bank_ram,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_camera"].compiledMethodLinks = ["NAME", "save_item", "start_capture", "std::begin", "std::bit_width", "std::end", "std::fill", "std::forward"];
definition.slot.options["rom_camera"].children[0].definition.compiledMethods = {};
definition.slot.options["rom_huc1"].compiledMethods = (() => {
    function method_infrared_select(runtime, data) {
        const members = runtime.members;
        if (((Number(14) === Number(((data) & (14)))) ? 1 : 0)) {
            0;
            ((runtime.dereference(members.m_view_ir)).select?.(0) ?? 0);
        }
        else {
            0;
            (typeof (runtime.dereference(members.m_view_ir)).disable === 'function' ? (runtime.dereference(members.m_view_ir)).disable() : typeof (runtime.dereference(members.m_view_ir)).disable === 'number' || typeof (runtime.dereference(members.m_view_ir)).disable === 'boolean' ? (runtime.dereference(members.m_view_ir)).disable : runtime.container(members.m_view_ir, "disable"));
        }
    }
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_fine(runtime, ((data) & (63)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_coarse(runtime, ((data) & (3)));
        method_set_bank_ram(runtime, ((data) & (3)));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_read_ir(runtime, space) {
        const members = runtime.members;
        0;
        return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (192))) | (0))) & 0xff);
    }
    function method_write_ir(runtime, data) {
        const members = runtime.members;
        0;
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "infrared_select": method_infrared_select,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "bank_switch_coarse": method_bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "read_ir": method_read_ir,
        "write_ir": method_write_ir,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_huc1"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["rom_huc3"].compiledMethods = (() => {
    function method_io_select(runtime, data) {
        const members = runtime.members;
        switch (((data) & (15))) {
            case 0:
                {
                    0;
                    ((runtime.dereference(members.m_view_io)).select?.(0) ?? 0);
                    break;
                }
            case 10:
                {
                    0;
                    ((runtime.dereference(members.m_view_io)).select?.(1) ?? 0);
                    break;
                }
            case 11:
                {
                    0;
                    ((runtime.dereference(members.m_view_io)).select?.(2) ?? 0);
                    break;
                }
            case 12:
                {
                    0;
                    ((runtime.dereference(members.m_view_io)).select?.(3) ?? 0);
                    break;
                }
            case 13:
                {
                    0;
                    ((runtime.dereference(members.m_view_io)).select?.(4) ?? 0);
                    break;
                }
            case 14:
                {
                    0;
                    ((runtime.dereference(members.m_view_io)).select?.(5) ?? 0);
                    break;
                }
            default:
                {
                    0;
                    (typeof (runtime.dereference(members.m_view_io)).disable === 'function' ? (runtime.dereference(members.m_view_io)).disable() : typeof (runtime.dereference(members.m_view_io)).disable === 'number' || typeof (runtime.dereference(members.m_view_io)).disable === 'boolean' ? (runtime.dereference(members.m_view_io)).disable : runtime.container(members.m_view_io, "disable"));
                }
        }
    }
    function method_bank_switch_fine(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_fine(runtime, ((data) & (127)));
    }
    function method_set_bank_rom_fine(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[1] = entry;
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_high(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_bits_rom = members.m_bank_bits_rom ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        let coarse = ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[1]))) & 0xffff)) & 0xffff);
        return ((((((h_m_bank_sel_rom[1]) | (((coarse) << (h_m_bank_bits_rom[1]))))) & (h_m_bank_mask_rom[1]))) & 0xffff);
    }
    function method_bank_switch_coarse(runtime, data) {
        const members = runtime.members;
        method_set_bank_rom_coarse(runtime, ((data) & (3)));
        method_set_bank_ram(runtime, ((data) & (3)));
    }
    function method_set_bank_rom_coarse(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        h_m_bank_sel_rom[0] = entry;
        let lo = ((((method_bank_rom_entry_low(runtime)) & 0xffff)) & 0xffff);
        let hi = ((((method_bank_rom_entry_high(runtime)) & 0xffff)) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(lo) ?? 0);
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(hi) ?? 0);
    }
    function method_bank_rom_entry_low(runtime) {
        const members = runtime.members;
        const h_m_bank_sel_rom = members.m_bank_sel_rom ?? 0;
        const h_m_bank_rom_coarse_mask = members.m_bank_rom_coarse_mask ?? 0;
        const h_m_bank_mask_rom = members.m_bank_mask_rom ?? 0;
        return ((((((h_m_bank_sel_rom[0]) & (h_m_bank_rom_coarse_mask[0]))) & (h_m_bank_mask_rom[0]))) & 0xffff);
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_write_command(runtime, data) {
        const members = runtime.members;
        members.m_ctrl_cmd = (((((data) >>> (4)) & ((1 << (3)) - 1))) & 0xff);
        members.m_ctrl_data = (((((data) >>> (0)) & ((1 << (4)) - 1))) & 0xff);
        0;
    }
    function method_read_command(runtime, space) {
        const members = runtime.members;
        0;
        return (((((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (128))) | ((((members.m_ctrl_cmd ?? 0)) << (4))))) | ((members.m_ctrl_data ?? 0)))) & 0xff);
    }
    function method_read_status(runtime, space) {
        const members = runtime.members;
        0;
        return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (128))) | (127))) & 0xff);
    }
    function method_write_control(runtime, data) {
        const members = runtime.members;
        0;
        if ((((((data) >>> (0)) & 1)) ? 0 : 1)) {
            switch ((members.m_ctrl_cmd ?? 0)) {
                case 1:
                    {
                        0;
                        members.m_ctrl_data = (((((members.m_registers ?? 0)[(() => { const previous = members.m_ctrl_addr; members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff); return previous; })()]) & (15))) & 0xff);
                        break;
                    }
                case 3:
                    {
                        0;
                        (members.m_registers ?? 0)[(() => { const previous = members.m_ctrl_addr; members.m_ctrl_addr = ((((members.m_ctrl_addr) + (1))) & 0xff); return previous; })()] = (((members.m_ctrl_data ?? 0)) & (15));
                        break;
                    }
                case 4:
                    {
                        members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? 0)) & (240))) | ((((members.m_ctrl_data ?? 0)) & (15))))) & 0xff);
                        0;
                        break;
                    }
                case 5:
                    {
                        members.m_ctrl_addr = (((((((members.m_ctrl_addr ?? 0)) & (15))) | ((((members.m_ctrl_data ?? 0)) << (4))))) & 0xff);
                        0;
                        break;
                    }
                case 6:
                    {
                        0;
                        method_execute_instruction(runtime);
                        break;
                    }
                default:
                    {
                        0;
                    }
            }
        }
    }
    function method_execute_instruction(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch ((((members.m_ctrl_data ?? 0)) & (15))) {
            case 0:
                {
                    0;
                    (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)));
                    break;
                }
            case 1:
                {
                    0;
                    let newminutes = ((((method_read_12bit(runtime, 0)) << 16 >> 16)) << 16 >> 16);
                    let newdays = ((((method_read_12bit(runtime, 3)) << 16 >> 16)) << 16 >> 16);
                    let oldminutes = ((((method_read_12bit(runtime, 16)) << 16 >> 16)) << 16 >> 16);
                    let olddays = ((((method_read_12bit(runtime, 19)) << 16 >> 16)) << 16 >> 16);
                    let eventminutes = ((((method_read_12bit(runtime, 88)) << 16 >> 16)) << 16 >> 16);
                    let eventdays = ((((method_read_12bit(runtime, 91)) << 16 >> 16)) << 16 >> 16);
                    let minutesdelta = ((((((newminutes) - (oldminutes))) << 16 >> 16)) << 16 >> 16);
                    let daysdelta = ((((((newdays) - (olddays))) << 16 >> 16)) << 16 >> 16);
                    while (((Number(1440) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) - (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
                    }
                    while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) + (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
                    }
                    0;
                    0;
                    (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)));
                    method_write_12bit(runtime, 88, ((((eventminutes) + (minutesdelta))) << 16 >> 16));
                    method_write_12bit(runtime, 91, ((((eventdays) + (daysdelta))) << 16 >> 16));
                    break;
                }
            case 2:
                {
                    0;
                    members.m_ctrl_data = ((1) & 0xff);
                    break;
                }
            case 14:
                {
                    0;
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function method_read_12bit(runtime, offset) {
        const members = runtime.members;
        return (((((((((((((members.m_registers ?? 0)[((((offset) + (0))) & (255))]) & (15))) & 0xffff)) << (0))) | ((((((((members.m_registers ?? 0)[((((offset) + (1))) & (255))]) & (15))) & 0xffff)) << (4))))) | ((((((((members.m_registers ?? 0)[((((offset) + (2))) & (255))]) & (15))) & 0xffff)) << (8))))) & 0xffff);
    }
    function method_write_12bit(runtime, offset, data) {
        const members = runtime.members;
        (members.m_registers ?? 0)[((((offset) + (0))) & (255))] = ((runtime.shiftRight(data, 0)) & (15));
        (members.m_registers ?? 0)[((((offset) + (1))) & (255))] = ((runtime.shiftRight(data, 4)) & (15));
        (members.m_registers ?? 0)[((((offset) + (2))) & (255))] = ((runtime.shiftRight(data, 8)) & (15));
    }
    function method_read_ir(runtime, space) {
        const members = runtime.members;
        0;
        return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (192))) | (0))) & 0xff);
    }
    function method_write_ir(runtime, data) {
        const members = runtime.members;
        0;
    }
    function method_rtc_advance_seconds(runtime, param) {
        const members = runtime.members;
        if (((Number(59) > Number((members.m_seconds ?? 0))) ? 1 : 0)) {
            members.m_seconds = ((((members.m_seconds) + (1))) & 0xff);
            return;
        }
        members.m_seconds = ((0) & 0xff);
        let minutes = ((((method_read_12bit(runtime, 16)) & 0xffff)) & 0xffff);
        if (((Number(1439) > Number(minutes)) ? 1 : 0)) {
            method_write_12bit(runtime, 16, ((minutes) + (1)));
            return;
        }
        method_write_12bit(runtime, 16, 0);
        method_write_12bit(runtime, 19, runtime.add(method_read_12bit(runtime, 19), 1));
    }
    function method_huc3_device__execute_instruction(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch ((((members.m_ctrl_data ?? 0)) & (15))) {
            case 0:
                {
                    0;
                    (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 16), 7, runtime.addressOf((members.m_registers ?? 0), 0)));
                    break;
                }
            case 1:
                {
                    0;
                    let newminutes = ((((method_read_12bit(runtime, 0)) << 16 >> 16)) << 16 >> 16);
                    let newdays = ((((method_read_12bit(runtime, 3)) << 16 >> 16)) << 16 >> 16);
                    let oldminutes = ((((method_read_12bit(runtime, 16)) << 16 >> 16)) << 16 >> 16);
                    let olddays = ((((method_read_12bit(runtime, 19)) << 16 >> 16)) << 16 >> 16);
                    let eventminutes = ((((method_read_12bit(runtime, 88)) << 16 >> 16)) << 16 >> 16);
                    let eventdays = ((((method_read_12bit(runtime, 91)) << 16 >> 16)) << 16 >> 16);
                    let minutesdelta = ((((((newminutes) - (oldminutes))) << 16 >> 16)) << 16 >> 16);
                    let daysdelta = ((((((newdays) - (olddays))) << 16 >> 16)) << 16 >> 16);
                    while (((Number(1440) <= Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) - (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) + (1))) << 16 >> 16);
                    }
                    while (((Number(0) > Number(((eventminutes) + (minutesdelta)))) ? 1 : 0)) {
                        minutesdelta = ((((minutesdelta) + (1440))) << 16 >> 16);
                        daysdelta = ((((daysdelta) - (1))) << 16 >> 16);
                    }
                    0;
                    0;
                    (__l["std::copy_n"] ? __l["std::copy_n"](runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)) : runtime.macro("std::copy_n", runtime.addressOf((members.m_registers ?? 0), 0), 7, runtime.addressOf((members.m_registers ?? 0), 16)));
                    method_write_12bit(runtime, 88, ((((eventminutes) + (minutesdelta))) << 16 >> 16));
                    method_write_12bit(runtime, 91, ((((eventdays) + (daysdelta))) << 16 >> 16));
                    break;
                }
            case 2:
                {
                    0;
                    members.m_ctrl_data = ((1) & 0xff);
                    break;
                }
            case 14:
                {
                    0;
                    break;
                }
            default:
                {
                    0;
                }
        }
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "io_select": method_io_select,
        "bank_switch_fine": method_bank_switch_fine,
        "set_bank_rom_fine": method_set_bank_rom_fine,
        "bank_rom_entry_high": method_bank_rom_entry_high,
        "bank_switch_coarse": method_bank_switch_coarse,
        "set_bank_rom_coarse": method_set_bank_rom_coarse,
        "bank_rom_entry_low": method_bank_rom_entry_low,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "write_command": method_write_command,
        "read_command": method_read_command,
        "read_status": method_read_status,
        "write_control": method_write_control,
        "execute_instruction": method_execute_instruction,
        "read_12bit": method_read_12bit,
        "write_12bit": method_write_12bit,
        "read_ir": method_read_ir,
        "write_ir": method_write_ir,
        "rtc_advance_seconds": method_rtc_advance_seconds,
        "huc3_device::execute_instruction": method_huc3_device__execute_instruction,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_huc3"].compiledMethodLinks = ["std::bit_width", "std::copy_n", "std::forward"];
definition.slot.options["rom_tama5"].compiledMethods = (() => {
    function method_data_r(runtime, space) {
        const members = runtime.members;
        return (((((((typeof (runtime.dereference(space)).unmap === 'function' ? (runtime.dereference(space)).unmap() : typeof (runtime.dereference(space)).unmap === 'number' || typeof (runtime.dereference(space)).unmap === 'boolean' ? (runtime.dereference(space)).unmap : runtime.container(space, "unmap"))) & (240))) | ((((members.m_response ?? 0)) & (15))))) & 0xff);
    }
    function method_data_w(runtime, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_registers = members.m_registers ?? 0;
        switch ((members.m_command ?? 0)) {
            case 0:
                {
                    members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? 0)) & (16))) | (((data) & (15))))) & 0xff);
                    (__l["set_bank_rom"] ? __l["set_bank_rom"]((members.m_bank_sel_rom ?? 0)) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? 0)));
                    break;
                }
            case 1:
                {
                    members.m_bank_sel_rom = (((((((members.m_bank_sel_rom ?? 0)) & (15))) | (((((data) & (1))) << (4))))) & 0xff);
                    (__l["set_bank_rom"] ? __l["set_bank_rom"]((members.m_bank_sel_rom ?? 0)) : runtime.macro("set_bank_rom", (members.m_bank_sel_rom ?? 0)));
                    break;
                }
            case 4:
                {
                    members.m_data = (((((((members.m_data ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
                    break;
                }
            case 5:
                {
                    members.m_data = (((((((members.m_data ?? 0)) & (15))) | (((data) << (4))))) & 0xff);
                    break;
                }
            case 6:
                {
                    members.m_address = (((((((members.m_address ?? 0)) & (15))) | (((data) << (4))))) & 0xff);
                    break;
                }
            case 7:
                {
                    members.m_address = (((((((members.m_address ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
                    switch ((((members.m_address ?? 0)) & (224))) {
                        case 0:
                            {
                                0;
                                h_m_registers[(((members.m_address ?? 0)) & (31))] = (members.m_data ?? 0);
                                break;
                            }
                        case 32:
                            {
                                0;
                                members.m_data = ((h_m_registers[(((members.m_address ?? 0)) & (31))]) & 0xff);
                                break;
                            }
                        case 64:
                            {
                                if (((Number((((members.m_address ?? 0)) & (31))) === Number(18)) ? 1 : 0)) {
                                    members.m_data = ((255) & 0xff);
                                }
                            }
                        default:
                            {
                                0;
                            }
                    }
                }
        }
    }
    function method_command_w(runtime, data) {
        const members = runtime.members;
        switch (data) {
            case 0:
            case 1:
            case 4:
            case 5:
            case 6:
            case 7:
                {
                    break;
                }
            case 10:
                {
                    members.m_response = ((1) & 0xff);
                    break;
                }
            case 12:
                {
                    members.m_response = (((((members.m_data ?? 0)) & (15))) & 0xff);
                    break;
                }
            case 13:
                {
                    members.m_response = ((runtime.shiftRight((members.m_data ?? 0), 4)) & 0xff);
                    break;
                }
            default:
                {
                    0;
                }
        }
        members.m_command = ((data) & 0xff);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "data_r": method_data_r,
        "data_w": method_data_w,
        "command_w": method_command_w,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_tama5"].compiledMethodLinks = ["set_bank_rom", "std::bit_width", "std::forward"];
definition.slot.options["rom_liebao"].compiledMethods = (() => {
    function method_enable_ram(runtime, offset, data) {
        const members = runtime.members;
        let enable = ((((((Number(10) === Number(((data) & (15)))) ? 1 : 0)) ? 1 : 0)) ? 1 : 0);
        0;
        if (enable) {
            ((runtime.dereference(members.m_view_ram)).select?.(0) ?? 0);
        }
        else {
            (typeof (runtime.dereference(members.m_view_ram)).disable === 'function' ? (runtime.dereference(members.m_view_ram)).disable() : typeof (runtime.dereference(members.m_view_ram)).disable === 'number' || typeof (runtime.dereference(members.m_view_ram)).disable === 'boolean' ? (runtime.dereference(members.m_view_ram)).disable : runtime.container(members.m_view_ram, "disable"));
        }
    }
    function method_bank_switch_rom(runtime, offset, data) {
        const members = runtime.members;
        method_set_bank_rom_low(runtime, ((((data) & 0xffff)) << (1)));
        if (((((members.m_bank_high_set ?? 0)) || (((Number(((offset) & (255))) === Number(210)) ? 1 : 0))) ? 1 : 0)) {
            members.m_bank_high_set = ((0) & 0xff);
        }
        else {
            method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
        }
    }
    function method_set_bank_rom_low(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[0])).set_entry?.(entry) ?? 0);
    }
    function method_set_bank_rom_high(runtime, entry) {
        const members = runtime.members;
        const h_m_bank_rom = members.m_bank_rom ?? 0;
        entry = ((((entry) & ((members.m_bank_mask_rom ?? 0)))) & 0xffff);
        0;
        ((runtime.dereference(h_m_bank_rom[1])).set_entry?.(entry) ?? 0);
    }
    function method_bank_switch_ram(runtime, data) {
        const members = runtime.members;
        method_set_bank_ram(runtime, ((data) & (15)));
    }
    function method_set_bank_ram(runtime, entry) {
        const members = runtime.members;
        members.m_bank_sel_ram = ((entry) & 0xff);
        if ((members.m_bank_mask_ram ?? 0)) {
            entry = ((method_bank_ram_entry(runtime)) & 0xff);
            ((runtime.dereference(members.m_bank_ram)).set_entry?.(entry) ?? 0);
        }
    }
    function method_bank_ram_entry(runtime) {
        const members = runtime.members;
        return (((((((members.m_bank_sel_ram ?? 0)) & ((members.m_bank_ram_mask ?? 0)))) & ((members.m_bank_mask_ram ?? 0)))) & 0xff);
    }
    function method_bank_switch_rom_high(runtime, offset, data) {
        const members = runtime.members;
        if (((Number(((offset) & (255))) === Number(210)) ? 1 : 0)) {
            members.m_bank_high_set = ((1) & 0xff);
            method_set_bank_rom_high(runtime, ((((((data) & 0xffff)) << (1))) | (1)));
        }
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    function method_device_generic_cart_interface__install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "enable_ram": method_enable_ram,
        "bank_switch_rom": method_bank_switch_rom,
        "set_bank_rom_low": method_set_bank_rom_low,
        "set_bank_rom_high": method_set_bank_rom_high,
        "bank_switch_ram": method_bank_switch_ram,
        "set_bank_ram": method_set_bank_ram,
        "bank_ram_entry": method_bank_ram_entry,
        "bank_switch_rom_high": method_bank_switch_rom_high,
        "install_non_power_of_two__5": method_install_non_power_of_two__5,
        "device_generic_cart_interface::install_non_power_of_two__5": method_device_generic_cart_interface__install_non_power_of_two__5
    };
})();
definition.slot.options["rom_liebao"].compiledMethodLinks = ["std::bit_width", "std::forward"];
export const device = definition;
export default device;
