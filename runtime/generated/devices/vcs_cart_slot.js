import deviceData from './vcs_cart_slot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = {};
definition.slot.options["a26_2k_4k"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_f4"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_f6"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_f8"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_f8sw"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_fa"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_fe"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, data) {
        const members = runtime.members;
        if ((members.m_trigger_on_next_access ?? runtime.member("m_trigger_on_next_access"))) {
            ((runtime.dereference(members.m_bank)).set_entry?.((((((data) >>> (5)) & 1)) ? (0) : (1))) ?? 0);
            members.m_trigger_on_next_access = ((0) ? 1 : 0);
        }
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_3e"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_3f"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_select_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((data) & ((members.m_bank_mask ?? runtime.member("m_bank_mask"))))) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "select_bank": method_select_bank
    };
})();
definition.slot.options["a26_e0"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank_0(runtime, offset, data) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? runtime.member("m_bank");
        ((runtime.dereference(runtime.readIndex(h_m_bank, 0))).set_entry?.(((offset) & (7))) ?? 0);
    }
    function method_switch_bank_1(runtime, offset, data) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? runtime.member("m_bank");
        ((runtime.dereference(runtime.readIndex(h_m_bank, 1))).set_entry?.(((offset) & (7))) ?? 0);
    }
    function method_switch_bank_2(runtime, offset, data) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? runtime.member("m_bank");
        ((runtime.dereference(runtime.readIndex(h_m_bank, 2))).set_entry?.(((offset) & (7))) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank_0": method_switch_bank_0,
        "switch_bank_1": method_switch_bank_1,
        "switch_bank_2": method_switch_bank_2
    };
})();
definition.slot.options["a26_e7"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_rom_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_view)).select?.(((((Number(offset) === Number(7)) ? 1 : 0)) ? (1) : (0))) ?? 0);
        ((runtime.dereference(members.m_rom_bank)).set_entry?.(offset) ?? 0);
    }
    function method_switch_ram_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_hi_ram_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_rom_bank": method_switch_rom_bank,
        "switch_ram_bank": method_switch_ram_bank
    };
})();
definition.slot.options["a26_ua"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_change_bank(runtime, offset) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((((offset) >>> (6))) & (1))) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "change_bank": method_change_bank
    };
})();
definition.slot.options["a26_cv"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_dc"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read_current_bank(runtime, offset) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_bank)).entry === 'function' ? (runtime.dereference(members.m_bank)).entry() : typeof (runtime.dereference(members.m_bank)).entry === 'number' || typeof (runtime.dereference(members.m_bank)).entry === 'boolean' ? (runtime.dereference(members.m_bank)).entry : runtime.container(members.m_bank, "entry"));
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((runtime.add((typeof (runtime.dereference(members.m_bank)).entry === 'function' ? (runtime.dereference(members.m_bank)).entry() : typeof (runtime.dereference(members.m_bank)).entry === 'number' || typeof (runtime.dereference(members.m_bank)).entry === 'boolean' ? (runtime.dereference(members.m_bank)).entry : runtime.container(members.m_bank, "entry")), 1)) & (15))) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_current_bank": method_read_current_bank,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_fv"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(1) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_jvp"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_cm"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_ss"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read_lo(runtime, offset) {
        const members = runtime.members;
        if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if ((members.m_ram_write_enabled ?? runtime.member("m_ram_write_enabled"))) {
                if (((Number((members.m_address_bus_changes ?? runtime.member("m_address_bus_changes"))) === Number(5)) ? 1 : 0)) {
                    0;
                    runtime.writeIndex(runtime.writableMember("m_ram"), ((offset) + (((runtime.readIndex((members.m_base_banks ?? runtime.member("m_base_banks")), 0)) * (2048)))), (members.m_data ?? runtime.member("m_data")));
                }
                else {
                    if (((Number(offset) < Number(256)) ? 1 : 0)) {
                        members.m_data = ((offset) & 0xff);
                        members.m_address_bus_changes = ((0) >>> 0);
                    }
                }
            }
            else {
                if (((Number(offset) < Number(256)) ? 1 : 0)) {
                    members.m_data = ((offset) & 0xff);
                    members.m_address_bus_changes = ((0) >>> 0);
                }
            }
        }
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), ((offset) + (((runtime.readIndex((members.m_base_banks ?? runtime.member("m_base_banks")), 0)) * (2048)))));
    }
    function method_read_hi(runtime, offset) {
        const members = runtime.members;
        if ((((runtime.calls["machine().side_effects_disabled"]?.() ?? 0)) ? 0 : 1)) {
            if ((members.m_ram_write_enabled ?? runtime.member("m_ram_write_enabled"))) {
                if (((Number((members.m_address_bus_changes ?? runtime.member("m_address_bus_changes"))) === Number(5)) ? 1 : 0)) {
                    if (((Number(runtime.readIndex((members.m_base_banks ?? runtime.member("m_base_banks")), 1)) !== Number(3)) ? 1 : 0)) {
                        0;
                        runtime.writeIndex(runtime.writableMember("m_ram"), ((offset) + (((runtime.readIndex((members.m_base_banks ?? runtime.member("m_base_banks")), 1)) * (2048)))), (members.m_data ?? runtime.member("m_data")));
                    }
                }
            }
        }
        if (((Number(runtime.readIndex((members.m_base_banks ?? runtime.member("m_base_banks")), 1)) !== Number(3)) ? 1 : 0)) {
            return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), ((offset) + (((runtime.readIndex((members.m_base_banks ?? runtime.member("m_base_banks")), 1)) * (2048)))));
        }
        else {
            if ((members.m_rom_enabled ?? runtime.member("m_rom_enabled"))) {
                return runtime.readIndex((members.m_rom ?? runtime.member("m_rom")), offset);
            }
            else {
                return 255;
            }
        }
    }
    function method_read_cass(runtime, offset) {
        const members = runtime.members;
        members.m_address_bus_changes = ((runtime.add(5, 1)) >>> 0);
        if (((Number((typeof (runtime.dereference(members.m_cassette)).input === 'function' ? (runtime.dereference(members.m_cassette)).input() : typeof (runtime.dereference(members.m_cassette)).input === 'number' || typeof (runtime.dereference(members.m_cassette)).input === 'boolean' ? (runtime.dereference(members.m_cassette)).input : runtime.container(members.m_cassette, "input"))) < Number(0)) ? 1 : 0)) {
            return 0;
        }
        else {
            return 1;
        }
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_lo": method_read_lo,
        "read_hi": method_read_hi,
        "read_cass": method_read_cass
    };
})();
definition.slot.options["a26_dpc"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_dpc"].children[0].definition.compiledMethods = (() => {
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? runtime.member("m_df");
        let data_fetcher = ((((offset) & (7))) & 0xff);
        let data = ((255) & 0xff);
        if (((Number(offset) < Number(8)) ? 1 : 0)) {
            switch (((offset) & (6))) {
                case 0:
                case 2:
                    {
                        members.m_shift_reg = (((((((members.m_shift_reg ?? runtime.member("m_shift_reg"))) << (1))) | ((((~(((((((members.m_shift_reg ?? runtime.member("m_shift_reg"))) >>> (7))) ^ ((((members.m_shift_reg ?? runtime.member("m_shift_reg"))) >>> (5))))) ^ ((((((members.m_shift_reg ?? runtime.member("m_shift_reg"))) >>> (4))) ^ ((((members.m_shift_reg ?? runtime.member("m_shift_reg"))) >>> (3)))))))) & (1))))) & 0xff);
                        return (members.m_shift_reg ?? runtime.member("m_shift_reg"));
                    }
                case 4:
                    {
                        members.m_latch_62 = (((members.m_latch_64 ?? runtime.member("m_latch_64"))) & 0xff);
                    }
                case 6:
                    {
                        members.m_latch_64 = (((((members.m_latch_62 ?? runtime.member("m_latch_62"))) + (runtime.readIndex(h_m_df, 4).top))) & 0xff);
                        members.m_dlc = ((((((Number((((members.m_latch_62 ?? runtime.member("m_latch_62"))) + (runtime.readIndex(h_m_df, 4).top))) > Number(255)) ? 1 : 0)) ? (1) : (0))) & 0xff);
                        data = ((0) & 0xff);
                        if ((((runtime.readIndex(h_m_df, 5).music_mode) && (runtime.readIndex(h_m_df, 5).flag)) ? 1 : 0)) {
                            data = ((((data) | (1))) & 0xff);
                        }
                        if ((((runtime.readIndex(h_m_df, 6).music_mode) && (runtime.readIndex(h_m_df, 6).flag)) ? 1 : 0)) {
                            data = ((((data) | (2))) & 0xff);
                        }
                        if ((((runtime.readIndex(h_m_df, 7).music_mode) && (runtime.readIndex(h_m_df, 7).flag)) ? 1 : 0)) {
                            data = ((((data) | (4))) & 0xff);
                        }
                        return (((((members.m_dlc ?? runtime.member("m_dlc"))) ? ((((members.m_movamt ?? runtime.member("m_movamt"))) & (240))) : (0))) | (([0, 4, 5, 9, 6, 10, 11, 15][(((data) % 8) + 8) % 8] ?? 0)));
                    }
            }
        }
        else {
            let display_data = ((runtime.readIndex((members.m_displaydata ?? runtime.member("m_displaydata")), (((~((runtime.readIndex(h_m_df, data_fetcher).low) | (((runtime.readIndex(h_m_df, data_fetcher).high) << (8)))))) & (2047)))) & 0xff);
            switch (((offset) & (56))) {
                case 8:
                    {
                        data = ((display_data) & 0xff);
                        break;
                    }
                case 16:
                    {
                        data = ((((runtime.readIndex(h_m_df, data_fetcher).flag) ? (display_data) : (0))) & 0xff);
                        break;
                    }
                case 24:
                    {
                        data = ((((runtime.readIndex(h_m_df, data_fetcher).flag) ? (((((display_data) >>> (3)) & 1) << 7 | (((display_data) >>> (2)) & 1) << 6 | (((display_data) >>> (1)) & 1) << 5 | (((display_data) >>> (0)) & 1) << 4 | (((display_data) >>> (7)) & 1) << 3 | (((display_data) >>> (6)) & 1) << 2 | (((display_data) >>> (5)) & 1) << 1 | (((display_data) >>> (4)) & 1) << 0)) : (0))) & 0xff);
                        break;
                    }
                case 32:
                    {
                        data = ((((runtime.readIndex(h_m_df, data_fetcher).flag) ? (((((display_data) >>> (0)) & 1) << 7 | (((display_data) >>> (1)) & 1) << 6 | (((display_data) >>> (2)) & 1) << 5 | (((display_data) >>> (3)) & 1) << 4 | (((display_data) >>> (4)) & 1) << 3 | (((display_data) >>> (5)) & 1) << 2 | (((display_data) >>> (6)) & 1) << 1 | (((display_data) >>> (7)) & 1) << 0)) : (0))) & 0xff);
                        break;
                    }
                case 40:
                    {
                        data = ((((runtime.readIndex(h_m_df, data_fetcher).flag) ? (((display_data) >>> (1))) : (0))) & 0xff);
                        break;
                    }
                case 48:
                    {
                        data = ((((runtime.readIndex(h_m_df, data_fetcher).flag) ? (((display_data) << (1))) : (0))) & 0xff);
                        break;
                    }
                case 56:
                    {
                        data = ((((runtime.readIndex(h_m_df, data_fetcher).flag) ? (255) : (0))) & 0xff);
                        break;
                    }
            }
            if ((((((Number(data_fetcher) < Number(5)) ? 1 : 0)) || (((runtime.readIndex(h_m_df, data_fetcher).osc_clk) ? 0 : 1))) ? 1 : 0)) {
                method_decrement_counter(runtime, data_fetcher);
            }
        }
        return data;
    }
    function method_decrement_counter(runtime, data_fetcher) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? runtime.member("m_df");
        runtime.readIndex(h_m_df, data_fetcher).low = ((((runtime.readIndex(h_m_df, data_fetcher).low) - (1))) & 0xff);
        if (((Number(runtime.readIndex(h_m_df, data_fetcher).low) === Number(255)) ? 1 : 0)) {
            runtime.readIndex(h_m_df, data_fetcher).high = ((((runtime.readIndex(h_m_df, data_fetcher).high) - (1))) & 0xff);
            if ((((((Number(data_fetcher) > Number(4)) ? 1 : 0)) && (runtime.readIndex(h_m_df, data_fetcher).music_mode)) ? 1 : 0)) {
                runtime.readIndex(h_m_df, data_fetcher).low = ((runtime.readIndex(h_m_df, data_fetcher).top) & 0xff);
            }
        }
        method_check_flag(runtime, data_fetcher);
    }
    function method_check_flag(runtime, data_fetcher) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? runtime.member("m_df");
        if (((Number(runtime.readIndex(h_m_df, data_fetcher).low) === Number(runtime.readIndex(h_m_df, data_fetcher).top)) ? 1 : 0)) {
            runtime.readIndex(h_m_df, data_fetcher).flag = ((1) & 0xff);
        }
        if (((Number(runtime.readIndex(h_m_df, data_fetcher).low) === Number(runtime.readIndex(h_m_df, data_fetcher).bottom)) ? 1 : 0)) {
            runtime.readIndex(h_m_df, data_fetcher).flag = ((0) & 0xff);
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? runtime.member("m_df");
        let data_fetcher = ((((offset) & (7))) & 0xff);
        switch (((offset) & (56))) {
            case 0:
                {
                    runtime.readIndex(h_m_df, data_fetcher).top = ((data) & 0xff);
                    runtime.readIndex(h_m_df, data_fetcher).flag = ((0) & 0xff);
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 8:
                {
                    runtime.readIndex(h_m_df, data_fetcher).bottom = ((data) & 0xff);
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 16:
                {
                    runtime.readIndex(h_m_df, data_fetcher).low = ((data) & 0xff);
                    if (((Number(data_fetcher) === Number(4)) ? 1 : 0)) {
                        members.m_latch_64 = ((data) & 0xff);
                    }
                    if ((((((Number(data_fetcher) > Number(4)) ? 1 : 0)) && (runtime.readIndex(h_m_df, data_fetcher).music_mode)) ? 1 : 0)) {
                        runtime.readIndex(h_m_df, data_fetcher).low = ((runtime.readIndex(h_m_df, data_fetcher).top) & 0xff);
                    }
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 24:
                {
                    runtime.readIndex(h_m_df, data_fetcher).high = ((data) & 0xff);
                    runtime.readIndex(h_m_df, data_fetcher).music_mode = ((((data) & (16))) & 0xff);
                    runtime.readIndex(h_m_df, data_fetcher).osc_clk = ((((data) & (32))) & 0xff);
                    if (((((((((Number(data_fetcher) > Number(4)) ? 1 : 0)) && (runtime.readIndex(h_m_df, data_fetcher).music_mode)) ? 1 : 0)) && (((Number(runtime.readIndex(h_m_df, data_fetcher).low) === Number(255)) ? 1 : 0))) ? 1 : 0)) {
                        runtime.readIndex(h_m_df, data_fetcher).low = ((runtime.readIndex(h_m_df, data_fetcher).top) & 0xff);
                        method_check_flag(runtime, data_fetcher);
                    }
                    break;
                }
            case 32:
                {
                    members.m_movamt = ((data) & 0xff);
                    break;
                }
            case 40:
                {
                    0;
                    break;
                }
            case 48:
                {
                    members.m_shift_reg = ((0) & 0xff);
                    break;
                }
            case 56:
                {
                    0;
                    break;
                }
        }
    }
    function method_oscillator_tick(runtime, param) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? runtime.member("m_df");
        for (let data_fetcher = 5; ((Number(data_fetcher) < Number(8)) ? 1 : 0); data_fetcher = ((data_fetcher) + (1))) {
            if (runtime.readIndex(h_m_df, data_fetcher).osc_clk) {
                method_decrement_counter(runtime, data_fetcher);
            }
        }
    }
    return {
        "read": method_read,
        "decrement_counter": method_decrement_counter,
        "check_flag": method_check_flag,
        "write": method_write,
        "oscillator_tick": method_oscillator_tick
    };
})();
definition.slot.options["a26_4in1"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_8in1"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.((((members.m_game_bank ?? runtime.member("m_game_bank"))) + (offset))) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_32in1"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_x07"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_harmony"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read8_r(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_rom ?? runtime.member("m_rom")), ((offset) + ((((members.m_base_bank ?? runtime.member("m_base_bank"))) * (4096)))));
    }
    function method_check_bankswitch(runtime, offset) {
        const members = runtime.members;
        switch (offset) {
            case 4086:
                {
                    members.m_base_bank = ((0) & 0xff);
                    break;
                }
            case 4087:
                {
                    members.m_base_bank = ((1) & 0xff);
                    break;
                }
            case 4088:
                {
                    members.m_base_bank = ((2) & 0xff);
                    break;
                }
            case 4089:
                {
                    members.m_base_bank = ((3) & 0xff);
                    break;
                }
            case 4090:
                {
                    members.m_base_bank = ((4) & 0xff);
                    break;
                }
            case 4091:
                {
                    members.m_base_bank = ((5) & 0xff);
                    break;
                }
            default:
                {
                    break;
                }
        }
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        let retvalue = ((method_read8_r(runtime, ((offset) + (3072)))) & 0xff);
        method_check_bankswitch(runtime, offset);
        return retvalue;
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        method_check_bankswitch(runtime, offset);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read8_r": method_read8_r,
        "check_bankswitch": method_check_bankswitch,
        "read": method_read,
        "write": method_write
    };
})();
definition.slot.options["a26_f0"].compiledMethods = (() => {
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return runtime.readIndex((members.m_ram ?? runtime.member("m_ram")), offset);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
export const device = definition;
export default device;
