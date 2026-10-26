import deviceData from './nes_yoko.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read_h(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_read_ex(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_write_ex(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_get_mirroring(runtime) {
        const members = runtime.members;
        return (members.m_mirroring ?? 0);
    }
    function method_set_mirroring(runtime, val) {
        const members = runtime.members;
        members.m_mirroring = ((val) | 0);
    }
    function method_get_pcb_ctrl_mirror(runtime) {
        const members = runtime.members;
        return (members.m_pcb_ctrl_mirror ?? 0);
    }
    function method_set_pcb_ctrl_mirror(runtime, val) {
        const members = runtime.members;
        members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
    }
    function method_get_four_screen_vram(runtime) {
        const members = runtime.members;
        return (members.m_four_screen_vram ?? 0);
    }
    function method_set_four_screen_vram(runtime, val) {
        const members = runtime.members;
        members.m_four_screen_vram = ((val) ? 1 : 0);
    }
    function method_get_trainer(runtime) {
        const members = runtime.members;
        return (members.m_has_trainer ?? 0);
    }
    function method_set_trainer(runtime, val) {
        const members = runtime.members;
        members.m_has_trainer = ((val) ? 1 : 0);
    }
    function method_set_mmc1_type(runtime, val) {
        const members = runtime.members;
        members.m_mmc1_type = val;
    }
    function method_set_n163_vol(runtime, vol) {
        const members = runtime.members;
        members.m_n163_vol = ((vol) | 0);
    }
    function method_set_outer_prg_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_prg_size = ((val) >>> 0);
    }
    function method_set_outer_chr_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_chr_size = ((val) >>> 0);
    }
    function method_set_smd133_addr(runtime, val) {
        const members = runtime.members;
        members.m_smd133_addr = ((val) | 0);
    }
    function method_set_x1_005_alt(runtime, val) {
        const members = runtime.members;
        members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
    }
    function method_set_bus_conflict(runtime, val) {
        const members = runtime.members;
        members.m_bus_conflict = ((val) ? 1 : 0);
    }
    function method_get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_set_open_bus(runtime, val) {
        const members = runtime.members;
        members.m_open_bus = ((val) & 0xff);
    }
    function method_get_prg_base(runtime) {
        const members = runtime.members;
        return (members.m_prg ?? 0);
    }
    function method_get_prgram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_prgram ?? 0), 0);
    }
    function method_get_vrom_base(runtime) {
        const members = runtime.members;
        return (members.m_vrom ?? 0);
    }
    function method_get_vram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_vram ?? 0), 0);
    }
    function method_get_ciram_base(runtime) {
        const members = runtime.members;
        return (members.m_ciram ?? 0);
    }
    function method_get_battery_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_battery ?? 0), 0);
    }
    function method_get_mapper_sram_base(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram = members.m_mapper_sram ?? 0;
        return h_m_mapper_sram;
    }
    function method_get_misc_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_misc_rom ?? 0);
    }
    function method_get_prg_size(runtime) {
        const members = runtime.members;
        return (members.m_prg_size ?? 0);
    }
    function method_get_prgram_size(runtime) {
        const members = runtime.members;
        return (members.m_prgram).length;
    }
    function method_get_vrom_size(runtime) {
        const members = runtime.members;
        return (members.m_vrom_size ?? 0);
    }
    function method_get_vram_size(runtime) {
        const members = runtime.members;
        return (members.m_vram).length;
    }
    function method_get_battery_size(runtime) {
        const members = runtime.members;
        return (members.m_battery).length;
    }
    function method_get_mapper_sram_size(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
        return h_m_mapper_sram_size;
    }
    function method_get_misc_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_misc_rom_size ?? 0);
    }
    function method_ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_hblank_irq(runtime, scanline, vblank, blanked) {
        const members = runtime.members;
    }
    function method_scanline_irq(runtime, scanline, vblank, blanked) {
        const members = runtime.members;
    }
    function method_prgram_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_prgram = runtime.resize(members.m_prgram, size));
    }
    function method_battery_alloc(runtime, size) {
        const members = runtime.members;
        (members.m_battery = runtime.resize(members.m_battery, size));
    }
    function method_set_irq_line(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
    }
    function method_chr_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_chr_src = members.m_chr_src ?? 0;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let bank = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
        if (((Number(h_m_chr_src[bank]) === Number(1)) ? 1 : 0)) {
            runtime.writeIndex(h_m_chr_access[bank], ((offset) & (1023)), data);
        }
    }
    function method_chr_r(runtime, offset) {
        const members = runtime.members;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let bank = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
        return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
    }
    function method_device_nes_cart_interface__chr_r(runtime, offset) {
        const members = runtime.members;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let bank = (((((offset) >>> (10)) & ((1 << (3)) - 1))) | 0);
        return ((runtime.readIndex(h_m_chr_access[bank], ((offset) & (1023)))) & 0xff);
    }
    function method_nt_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_nt_writable = members.m_nt_writable ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        if (h_m_nt_writable[page]) {
            runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
        }
    }
    function method_nt_r(runtime, offset) {
        const members = runtime.members;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
    }
    function method_read_l(runtime, offset) {
        const members = runtime.members;
        const h_m_extra_ram = members.m_extra_ram ?? 0;
        0;
        offset = ((offset) + (256));
        if (((Number(offset) >= Number(5120)) ? 1 : 0)) {
            return ((h_m_extra_ram[((offset) & (3))]) & 0xff);
        }
        else {
            if (((Number(offset) >= Number(4096)) ? 1 : 0)) {
                return ((5) & 0xff);
            }
            else {
                return ((method_get_open_bus(runtime)) & 0xff);
            }
        }
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        0;
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            return ((runtime.readIndex((members.m_battery ?? 0), (((((((((members.m_outer_reg ?? 0)) >>> (6))) * (8192))) + (offset))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
        }
        else {
            if (((((members.m_mode_reg ?? 0)) >>> (5)) & 1)) {
                return ((runtime.readIndex((members.m_prg ?? 0), ((((((h_m_mmc_prg_bank[3]) * (8192))) + (offset))) & ((((members.m_prg_size ?? 0)) - (1)))))) & 0xff);
            }
            else {
                return ((method_get_open_bus(runtime)) & 0xff);
            }
        }
    }
    function method_device_nes_cart_interface__read_h(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_nes_cart_interface__read_ex(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_nes_cart_interface__write_ex(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_nes_cart_interface__get_mirroring(runtime) {
        const members = runtime.members;
        return (members.m_mirroring ?? 0);
    }
    function method_device_nes_cart_interface__set_mirroring(runtime, val) {
        const members = runtime.members;
        members.m_mirroring = ((val) | 0);
    }
    function method_device_nes_cart_interface__get_pcb_ctrl_mirror(runtime) {
        const members = runtime.members;
        return (members.m_pcb_ctrl_mirror ?? 0);
    }
    function method_device_nes_cart_interface__set_pcb_ctrl_mirror(runtime, val) {
        const members = runtime.members;
        members.m_pcb_ctrl_mirror = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__get_four_screen_vram(runtime) {
        const members = runtime.members;
        return (members.m_four_screen_vram ?? 0);
    }
    function method_device_nes_cart_interface__set_four_screen_vram(runtime, val) {
        const members = runtime.members;
        members.m_four_screen_vram = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__get_trainer(runtime) {
        const members = runtime.members;
        return (members.m_has_trainer ?? 0);
    }
    function method_device_nes_cart_interface__set_trainer(runtime, val) {
        const members = runtime.members;
        members.m_has_trainer = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__set_mmc1_type(runtime, val) {
        const members = runtime.members;
        members.m_mmc1_type = val;
    }
    function method_device_nes_cart_interface__set_n163_vol(runtime, vol) {
        const members = runtime.members;
        members.m_n163_vol = ((vol) | 0);
    }
    function method_device_nes_cart_interface__set_outer_prg_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_prg_size = ((val) >>> 0);
    }
    function method_device_nes_cart_interface__set_outer_chr_size(runtime, val) {
        const members = runtime.members;
        members.m_outer_chr_size = ((val) >>> 0);
    }
    function method_device_nes_cart_interface__set_smd133_addr(runtime, val) {
        const members = runtime.members;
        members.m_smd133_addr = ((val) | 0);
    }
    function method_device_nes_cart_interface__set_x1_005_alt(runtime, val) {
        const members = runtime.members;
        members.m_x1_005_alt_mirroring = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__set_bus_conflict(runtime, val) {
        const members = runtime.members;
        members.m_bus_conflict = ((val) ? 1 : 0);
    }
    function method_device_nes_cart_interface__get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_device_nes_cart_interface__set_open_bus(runtime, val) {
        const members = runtime.members;
        members.m_open_bus = ((val) & 0xff);
    }
    function method_device_nes_cart_interface__get_prg_base(runtime) {
        const members = runtime.members;
        return (members.m_prg ?? 0);
    }
    function method_device_nes_cart_interface__get_prgram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_prgram ?? 0), 0);
    }
    function method_device_nes_cart_interface__get_vrom_base(runtime) {
        const members = runtime.members;
        return (members.m_vrom ?? 0);
    }
    function method_device_nes_cart_interface__get_vram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_vram ?? 0), 0);
    }
    function method_device_nes_cart_interface__get_ciram_base(runtime) {
        const members = runtime.members;
        return (members.m_ciram ?? 0);
    }
    function method_device_nes_cart_interface__get_battery_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_battery ?? 0), 0);
    }
    function method_device_nes_cart_interface__get_mapper_sram_base(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram = members.m_mapper_sram ?? 0;
        return h_m_mapper_sram;
    }
    function method_device_nes_cart_interface__get_misc_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_misc_rom ?? 0);
    }
    function method_device_nes_cart_interface__get_prg_size(runtime) {
        const members = runtime.members;
        return (members.m_prg_size ?? 0);
    }
    function method_device_nes_cart_interface__get_prgram_size(runtime) {
        const members = runtime.members;
        return (members.m_prgram).length;
    }
    function method_device_nes_cart_interface__get_vrom_size(runtime) {
        const members = runtime.members;
        return (members.m_vrom_size ?? 0);
    }
    function method_device_nes_cart_interface__get_vram_size(runtime) {
        const members = runtime.members;
        return (members.m_vram).length;
    }
    function method_device_nes_cart_interface__get_battery_size(runtime) {
        const members = runtime.members;
        return (members.m_battery).length;
    }
    function method_device_nes_cart_interface__get_mapper_sram_size(runtime) {
        const members = runtime.members;
        const h_m_mapper_sram_size = members.m_mapper_sram_size ?? 0;
        return h_m_mapper_sram_size;
    }
    function method_device_nes_cart_interface__get_misc_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_misc_rom_size ?? 0);
    }
    function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_nes_cart_interface__read_l(runtime, offset) {
        const members = runtime.members;
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_device_nes_cart_interface__read_m(runtime, offset) {
        const members = runtime.members;
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            return ((runtime.readIndex((members.m_battery ?? 0), ((offset) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
        }
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_nes_cony_device__write_h(runtime, offset, data) {
        const members = runtime.members;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        0;
        switch (((offset) & (768))) {
            case 0:
                {
                    members.m_outer_reg = ((data) & 0xff);
                    method_set_prg(runtime);
                    method_set_chr(runtime);
                    break;
                }
            case 256:
                {
                    members.m_mode_reg = ((data) & 0xff);
                    method_set_prg(runtime);
                    switch (((data) & (3))) {
                        case 0:
                            {
                                method_set_nt_mirroring(runtime, 1);
                                break;
                            }
                        case 1:
                            {
                                method_set_nt_mirroring(runtime, 2);
                                break;
                            }
                        case 2:
                            {
                                method_set_nt_mirroring(runtime, 4);
                                break;
                            }
                        case 3:
                            {
                                method_set_nt_mirroring(runtime, 3);
                                break;
                            }
                    }
                    break;
                }
            case 512:
                {
                    if (((offset) & (1))) {
                        members.m_irq_enable = ((((((members.m_mode_reg ?? 0)) >>> (7)) & 1)) | 0);
                        members.m_irq_count = ((((((data) << (8))) | ((((members.m_irq_count ?? 0)) & (255))))) & 0xffff);
                    }
                    else {
                        members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (65280))) | (data))) & 0xffff);
                        method_set_irq_line(runtime, 0);
                    }
                    break;
                }
            case 768:
                {
                    switch (((offset) & (24))) {
                        case 0:
                        case 8:
                            {
                                h_m_mmc_prg_bank[((offset) & (3))] = data;
                                method_set_prg(runtime);
                                break;
                            }
                        case 16:
                            {
                                h_m_mmc_vrom_bank[((offset) & (7))] = data;
                                method_set_chr(runtime);
                                break;
                            }
                    }
                    break;
                }
        }
    }
    function method_set_prg(runtime) {
        const members = runtime.members;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        switch ((((members.m_mode_reg ?? 0)) & (24))) {
            case 0:
                {
                    method_prg16_89ab(runtime, (members.m_outer_reg ?? 0));
                    method_prg16_cdef(runtime, (((members.m_outer_reg ?? 0)) | (7)));
                    break;
                }
            case 8:
                {
                    method_prg32(runtime, (((members.m_outer_reg ?? 0)) >>> (1)));
                    break;
                }
            case 16:
            case 24:
                {
                    let base = (((((((members.m_outer_reg ?? 0)) << (1))) & (-16))) | 0);
                    method_prg8_89(runtime, ((base) | (((h_m_mmc_prg_bank[0]) & (15)))));
                    method_prg8_ab(runtime, ((base) | (((h_m_mmc_prg_bank[1]) & (15)))));
                    method_prg8_cd(runtime, ((base) | (((h_m_mmc_prg_bank[2]) & (15)))));
                    method_prg8_ef(runtime, ((base) | (15)));
                    break;
                }
        }
    }
    function method_prg16_89ab(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        method_update_prg_banks(runtime, 0, 1);
    }
    function method_prg_8k_bank_num(runtime, bank_8k) {
        const members = runtime.members;
        if (((Number((members.m_prg_mask ?? 0)) === Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
            return ((bank_8k) & ((members.m_prg_mask ?? 0)));
        }
        if (((Number(bank_8k) < Number((((((members.m_prg_chunks ?? 0)) << (1))) - (1)))) ? 1 : 0)) {
            return bank_8k;
        }
        bank_8k = ((((bank_8k) & ((members.m_prg_mask ?? 0)))) | 0);
        bank_8k = ((((bank_8k) - (runtime.add(runtime.divide((members.m_prg_mask ?? 0), 2), 1)))) | 0);
        return runtime.readIndex((members.m_prg_bank_map ?? 0), bank_8k);
    }
    function method_update_prg_banks(runtime, prg_bank_start, prg_bank_end) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        const h_m_prg_bank_mem = members.m_prg_bank_mem ?? 0;
        for (let prg_bank = ((prg_bank_start) | 0); ((Number(prg_bank) <= Number(prg_bank_end)) ? 1 : 0); prg_bank = ((((prg_bank) + (1))) | 0)) {
            0;
            (__l["assert"] ? __l["assert"](((Number(prg_bank) < Number(((h_m_prg_bank)?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number(((h_m_prg_bank)?.length ?? 0))) ? 1 : 0)));
            (__l["assert"] ? __l["assert"](((Number(prg_bank) < Number(((h_m_prg_bank_mem)?.length ?? 0))) ? 1 : 0)) : runtime.macro("assert", ((Number(prg_bank) < Number(((h_m_prg_bank_mem)?.length ?? 0))) ? 1 : 0)));
            ((runtime.dereference(h_m_prg_bank_mem[prg_bank])).set_entry?.(h_m_prg_bank[prg_bank]) ?? 0);
        }
    }
    function method_prg16_cdef(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[2] = ((bank) + (0));
        h_m_prg_bank[3] = ((bank) + (1));
        method_update_prg_banks(runtime, 2, 3);
    }
    function method_prg32(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        if ((((((members.m_prg_chunks ?? 0)) >>> (1))) ? 0 : 1)) {
            return;
        }
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (4)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        h_m_prg_bank[2] = ((bank) + (2));
        h_m_prg_bank[3] = ((bank) + (3));
        method_update_prg_banks(runtime, 0, 3);
    }
    function method_prg8_89(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 0, bank);
    }
    function method_prg8_x(runtime, start, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        0;
        bank = ((method_prg_8k_bank_num(runtime, bank)) | 0);
        h_m_prg_bank[start] = bank;
        method_update_prg_banks(runtime, start, start);
    }
    function method_prg8_ab(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 1, bank);
    }
    function method_prg8_cd(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 2, bank);
    }
    function method_prg8_ef(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 3, bank);
    }
    function method_set_chr(runtime) {
        const members = runtime.members;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        method_chr2_0(runtime, h_m_mmc_vrom_bank[0], 0);
        method_chr2_2(runtime, h_m_mmc_vrom_bank[1], 0);
        method_chr2_4(runtime, h_m_mmc_vrom_bank[6], 0);
        method_chr2_6(runtime, h_m_mmc_vrom_bank[7], 0);
    }
    function method_chr2_0(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 1, 0, bank, source);
    }
    function method_bank_chr(runtime, shift, start, bank, source) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_chr_src = members.m_chr_src ?? 0;
        const h_m_chr_orig = members.m_chr_orig ?? 0;
        const h_m_chr_access = members.m_chr_access ?? 0;
        let base_ptr = 0;
        let chr_chunks = ((0) >>> 0);
        if (((Number(source) === Number(1)) ? 1 : 0)) {
            (__l["assert"] ? __l["assert"](((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)) : runtime.macro("assert", ((((members.m_vram).length === 0 ? 1 : 0)) ? 0 : 1)));
            base_ptr = runtime.addressOf((members.m_vram ?? 0), 0);
            chr_chunks = (((members.m_vram_chunks ?? 0)) >>> 0);
        }
        else {
            0;
            base_ptr = (members.m_vrom ?? 0);
            chr_chunks = (((members.m_vrom_chunks ?? 0)) >>> 0);
        }
        bank = ((((bank) & (((((chr_chunks) << (((3) - (shift))))) - (1))))) | 0);
        let size = ((((1024) << (shift))) | 0);
        let bank_start = ((((bank) * (size))) | 0);
        let kbyte = ((((1) << (shift))) | 0);
        for (let i = ((0) | 0); ((Number(i) < Number(kbyte)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_chr_src[((i) + (start))] = source;
            h_m_chr_orig[((i) + (start))] = ((bank_start) + (((i) * (1024))));
            h_m_chr_access[((i) + (start))] = runtime.addressOf(base_ptr, h_m_chr_orig[((i) + (start))]);
        }
    }
    function method_chr2_2(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 1, 2, bank, source);
    }
    function method_chr2_4(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 1, 4, bank, source);
    }
    function method_chr2_6(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 1, 6, bank, source);
    }
    function method_set_nt_mirroring(runtime, mirroring) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch (mirroring) {
            default:
                {
                    method_set_nt_page(runtime, 0, 0, 0, 1);
                    method_set_nt_page(runtime, 1, 0, 0, 1);
                    method_set_nt_page(runtime, 2, 0, 1, 1);
                    method_set_nt_page(runtime, 3, 0, 1, 1);
                    break;
                }
            case 1:
                {
                    method_set_nt_page(runtime, 0, 0, 0, 1);
                    method_set_nt_page(runtime, 1, 0, 1, 1);
                    method_set_nt_page(runtime, 2, 0, 0, 1);
                    method_set_nt_page(runtime, 3, 0, 1, 1);
                    break;
                }
            case 3:
                {
                    method_set_nt_page(runtime, 0, 0, 1, 1);
                    method_set_nt_page(runtime, 1, 0, 1, 1);
                    method_set_nt_page(runtime, 2, 0, 1, 1);
                    method_set_nt_page(runtime, 3, 0, 1, 1);
                    break;
                }
            case 4:
                {
                    method_set_nt_page(runtime, 0, 0, 0, 1);
                    method_set_nt_page(runtime, 1, 0, 0, 1);
                    method_set_nt_page(runtime, 2, 0, 0, 1);
                    method_set_nt_page(runtime, 3, 0, 0, 1);
                    break;
                }
            case 5:
                {
                    if (((members.m_ext_ntram).length === 0 ? 1 : 0)) {
                        (__l["fatalerror"] ? __l["fatalerror"]("4-screen mirroring without on-cart NTRAM!\n") : runtime.macro("fatalerror", "4-screen mirroring without on-cart NTRAM!\n"));
                    }
                    method_set_nt_page(runtime, 0, 4, 0, 1);
                    method_set_nt_page(runtime, 1, 4, 1, 1);
                    method_set_nt_page(runtime, 2, 4, 2, 1);
                    method_set_nt_page(runtime, 3, 4, 3, 1);
                    break;
                }
        }
    }
    function method_set_nt_page(runtime, page, source, bank, writable) {
        const members = runtime.members;
        const h_m_nt_src = members.m_nt_src ?? 0;
        const h_m_nt_orig = members.m_nt_orig ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        const h_m_nt_writable = members.m_nt_writable ?? 0;
        let base_ptr = 0;
        switch (source) {
            case 4:
                {
                    base_ptr = runtime.addressOf((members.m_ext_ntram ?? 0), 0);
                    break;
                }
            case 1:
                {
                    bank = ((((bank) & ((((((members.m_vrom_chunks ?? 0)) << (3))) - (1))))) | 0);
                    base_ptr = (members.m_vrom ?? 0);
                    break;
                }
            case 2:
            case 3:
                {
                    base_ptr = 0;
                    break;
                }
            default:
                {
                    base_ptr = (members.m_ciram ?? 0);
                    break;
                }
        }
        page = ((((page) & (3))) | 0);
        h_m_nt_src[page] = source;
        if (base_ptr) {
            h_m_nt_orig[page] = ((bank) * (1024));
            h_m_nt_access[page] = runtime.addressOf(base_ptr, h_m_nt_orig[page]);
        }
        h_m_nt_writable[page] = writable;
    }
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_irq_enable ?? 0)) {
            members.m_irq_count = ((((members.m_irq_count) + (((((((members.m_mode_reg ?? 0)) >>> (6)) & 1)) ? (-1) : (1))))) & 0xffff);
            if ((((members.m_irq_count ?? 0)) ? 0 : 1)) {
                method_set_irq_line(runtime, 1);
                members.m_irq_enable = ((0) | 0);
            }
        }
    }
    return {
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "write_ex": method_write_ex,
        "get_mirroring": method_get_mirroring,
        "set_mirroring": method_set_mirroring,
        "get_pcb_ctrl_mirror": method_get_pcb_ctrl_mirror,
        "set_pcb_ctrl_mirror": method_set_pcb_ctrl_mirror,
        "get_four_screen_vram": method_get_four_screen_vram,
        "set_four_screen_vram": method_set_four_screen_vram,
        "get_trainer": method_get_trainer,
        "set_trainer": method_set_trainer,
        "set_mmc1_type": method_set_mmc1_type,
        "set_n163_vol": method_set_n163_vol,
        "set_outer_prg_size": method_set_outer_prg_size,
        "set_outer_chr_size": method_set_outer_chr_size,
        "set_smd133_addr": method_set_smd133_addr,
        "set_x1_005_alt": method_set_x1_005_alt,
        "set_bus_conflict": method_set_bus_conflict,
        "get_open_bus": method_get_open_bus,
        "set_open_bus": method_set_open_bus,
        "get_prg_base": method_get_prg_base,
        "get_prgram_base": method_get_prgram_base,
        "get_vrom_base": method_get_vrom_base,
        "get_vram_base": method_get_vram_base,
        "get_ciram_base": method_get_ciram_base,
        "get_battery_base": method_get_battery_base,
        "get_mapper_sram_base": method_get_mapper_sram_base,
        "get_misc_rom_base": method_get_misc_rom_base,
        "get_prg_size": method_get_prg_size,
        "get_prgram_size": method_get_prgram_size,
        "get_vrom_size": method_get_vrom_size,
        "get_vram_size": method_get_vram_size,
        "get_battery_size": method_get_battery_size,
        "get_mapper_sram_size": method_get_mapper_sram_size,
        "get_misc_rom_size": method_get_misc_rom_size,
        "ppu_latch": method_ppu_latch,
        "hblank_irq": method_hblank_irq,
        "scanline_irq": method_scanline_irq,
        "prgram_alloc": method_prgram_alloc,
        "battery_alloc": method_battery_alloc,
        "set_irq_line": method_set_irq_line,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::get_mirroring": method_device_nes_cart_interface__get_mirroring,
        "device_nes_cart_interface::set_mirroring": method_device_nes_cart_interface__set_mirroring,
        "device_nes_cart_interface::get_pcb_ctrl_mirror": method_device_nes_cart_interface__get_pcb_ctrl_mirror,
        "device_nes_cart_interface::set_pcb_ctrl_mirror": method_device_nes_cart_interface__set_pcb_ctrl_mirror,
        "device_nes_cart_interface::get_four_screen_vram": method_device_nes_cart_interface__get_four_screen_vram,
        "device_nes_cart_interface::set_four_screen_vram": method_device_nes_cart_interface__set_four_screen_vram,
        "device_nes_cart_interface::get_trainer": method_device_nes_cart_interface__get_trainer,
        "device_nes_cart_interface::set_trainer": method_device_nes_cart_interface__set_trainer,
        "device_nes_cart_interface::set_mmc1_type": method_device_nes_cart_interface__set_mmc1_type,
        "device_nes_cart_interface::set_n163_vol": method_device_nes_cart_interface__set_n163_vol,
        "device_nes_cart_interface::set_outer_prg_size": method_device_nes_cart_interface__set_outer_prg_size,
        "device_nes_cart_interface::set_outer_chr_size": method_device_nes_cart_interface__set_outer_chr_size,
        "device_nes_cart_interface::set_smd133_addr": method_device_nes_cart_interface__set_smd133_addr,
        "device_nes_cart_interface::set_x1_005_alt": method_device_nes_cart_interface__set_x1_005_alt,
        "device_nes_cart_interface::set_bus_conflict": method_device_nes_cart_interface__set_bus_conflict,
        "device_nes_cart_interface::get_open_bus": method_device_nes_cart_interface__get_open_bus,
        "device_nes_cart_interface::set_open_bus": method_device_nes_cart_interface__set_open_bus,
        "device_nes_cart_interface::get_prg_base": method_device_nes_cart_interface__get_prg_base,
        "device_nes_cart_interface::get_prgram_base": method_device_nes_cart_interface__get_prgram_base,
        "device_nes_cart_interface::get_vrom_base": method_device_nes_cart_interface__get_vrom_base,
        "device_nes_cart_interface::get_vram_base": method_device_nes_cart_interface__get_vram_base,
        "device_nes_cart_interface::get_ciram_base": method_device_nes_cart_interface__get_ciram_base,
        "device_nes_cart_interface::get_battery_base": method_device_nes_cart_interface__get_battery_base,
        "device_nes_cart_interface::get_mapper_sram_base": method_device_nes_cart_interface__get_mapper_sram_base,
        "device_nes_cart_interface::get_misc_rom_base": method_device_nes_cart_interface__get_misc_rom_base,
        "device_nes_cart_interface::get_prg_size": method_device_nes_cart_interface__get_prg_size,
        "device_nes_cart_interface::get_prgram_size": method_device_nes_cart_interface__get_prgram_size,
        "device_nes_cart_interface::get_vrom_size": method_device_nes_cart_interface__get_vrom_size,
        "device_nes_cart_interface::get_vram_size": method_device_nes_cart_interface__get_vram_size,
        "device_nes_cart_interface::get_battery_size": method_device_nes_cart_interface__get_battery_size,
        "device_nes_cart_interface::get_mapper_sram_size": method_device_nes_cart_interface__get_mapper_sram_size,
        "device_nes_cart_interface::get_misc_rom_size": method_device_nes_cart_interface__get_misc_rom_size,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "nes_cony_device::write_h": method_nes_cony_device__write_h,
        "set_prg": method_set_prg,
        "prg16_89ab": method_prg16_89ab,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "prg16_cdef": method_prg16_cdef,
        "prg32": method_prg32,
        "prg8_89": method_prg8_89,
        "prg8_x": method_prg8_x,
        "prg8_ab": method_prg8_ab,
        "prg8_cd": method_prg8_cd,
        "prg8_ef": method_prg8_ef,
        "set_chr": method_set_chr,
        "chr2_0": method_chr2_0,
        "bank_chr": method_bank_chr,
        "chr2_2": method_chr2_2,
        "chr2_4": method_chr2_4,
        "chr2_6": method_chr2_6,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
        "irq_timer_tick": method_irq_timer_tick
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_maincpu.set_input_line"];
export const device = definition;
export default device;
