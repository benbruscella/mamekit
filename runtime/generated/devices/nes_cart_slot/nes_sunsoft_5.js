import deviceData from './nes_sunsoft_5.device.ir.json' with { type: 'json' };
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
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        let bank = (((((members.m_wram_bank ?? 0)) & (63))) & 0xff);
        0;
        if ((((((members.m_wram_bank ?? 0)) & (64))) ? 0 : 1)) {
            return ((runtime.readIndex((members.m_prg ?? 0), ((((((bank) * (8192))) + (offset))) & ((((members.m_prg_size ?? 0)) - (1)))))) & 0xff);
        }
        else {
            if ((((members.m_wram_bank ?? 0)) & (128))) {
                if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    return ((runtime.readIndex((members.m_battery ?? 0), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
                }
                if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    return ((runtime.readIndex((members.m_prgram ?? 0), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
                }
            }
        }
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
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        let bank = (((((members.m_wram_bank ?? 0)) & (63))) & 0xff);
        0;
        if ((((((members.m_wram_bank ?? 0)) & (64))) ? 0 : 1)) {
            return;
        }
        else {
            if ((((members.m_wram_bank ?? 0)) & (128))) {
                if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    runtime.writeIndex(runtime.writableMember("m_battery"), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_battery).length, 1))), data);
                }
                if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    runtime.writeIndex(runtime.writableMember("m_prgram"), ((((((bank) * (8192))) + (offset))) & (runtime.subtract((members.m_prgram).length, 1))), data);
                }
            }
        }
    }
    function method_device_nes_cart_interface__write_m(runtime, offset, data) {
        const members = runtime.members;
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
        }
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        switch (((offset) & (24576))) {
            case 16384:
                {
                    (__l["m_ym2149.address_w"] ? __l["m_ym2149.address_w"](((data) & (15))) : ((members.m_ym2149)?.address_w?.(((data) & (15))) ?? 0));
                    break;
                }
            case 24576:
                {
                    (__l["m_ym2149.data_w"] ? __l["m_ym2149.data_w"](data) : ((members.m_ym2149)?.data_w?.(data) ?? 0));
                    break;
                }
            default:
                {
                    method_fme7_write(runtime, offset, data);
                    break;
                }
        }
    }
    function method_fme7_write(runtime, offset, data) {
        const members = runtime.members;
        0;
        switch (((offset) & (24576))) {
            case 0:
                {
                    members.m_latch = ((((data) & (15))) & 0xff);
                    break;
                }
            case 8192:
                {
                    switch ((members.m_latch ?? 0)) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                        case 6:
                        case 7:
                            {
                                method_chr1_x(runtime, (members.m_latch ?? 0), data, 0);
                                break;
                            }
                        case 8:
                            {
                                members.m_wram_bank = ((data) & 0xff);
                                break;
                            }
                        case 9:
                            {
                                method_prg8_89(runtime, data);
                                break;
                            }
                        case 10:
                            {
                                method_prg8_ab(runtime, data);
                                break;
                            }
                        case 11:
                            {
                                method_prg8_cd(runtime, data);
                                break;
                            }
                        case 12:
                            {
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
                        case 13:
                            {
                                members.m_irq_enable = ((data) | 0);
                                method_set_irq_line(runtime, 0);
                                break;
                            }
                        case 14:
                            {
                                members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (65280))) | (data))) & 0xffff);
                                break;
                            }
                        case 15:
                            {
                                members.m_irq_count = (((((((members.m_irq_count ?? 0)) & (255))) | (((data) << (8))))) & 0xffff);
                                break;
                            }
                    }
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_chr1_x(runtime, start, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, start, bank, source);
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
    function method_prg8_ab(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 1, bank);
    }
    function method_prg8_cd(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 2, bank);
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
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if (((((members.m_irq_enable ?? 0)) >>> (7)) & 1)) {
            if (((Number((members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff))) === Number(65535)) ? 1 : 0)) {
                if (((((members.m_irq_enable ?? 0)) >>> (0)) & 1)) {
                    method_set_irq_line(runtime, 1);
                }
            }
        }
    }
    function method_device_nes_cart_interface__write_h(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_nes_sunsoft_fme7_device__write_h(runtime, offset, data) {
        const members = runtime.members;
        method_fme7_write(runtime, offset, data);
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
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "write_l": method_write_l,
        "write_m": method_write_m,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "write_h": method_write_h,
        "fme7_write": method_fme7_write,
        "chr1_x": method_chr1_x,
        "bank_chr": method_bank_chr,
        "prg8_89": method_prg8_89,
        "prg8_x": method_prg8_x,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "prg8_ab": method_prg8_ab,
        "prg8_cd": method_prg8_cd,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
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
        "irq_timer_tick": method_irq_timer_tick,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
        "nes_sunsoft_fme7_device::write_h": method_nes_sunsoft_fme7_device__write_h
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_maincpu.set_input_line", "m_ym2149.address_w", "m_ym2149.data_w"];
definition.children[0].definition.compiledMethods = (() => {
    const __mame_table_0 = [2147483648, 3221225472, 4026531840, 4278190080, 4294901760, 4294967040, 4294967280, 4294967292, 4294967294];
    function method_ay8910_write_reg(runtime, r, v) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_feature = members.m_feature ?? 0;
        if (((Number(((r) & (15))) === Number(13)) ? 1 : 0)) {
            r = ((((r) & (15))) | 0);
        }
        h_m_regs[r] = v;
        let coarse = ((0) & 0xff);
        switch (r) {
            case 0:
            case 1:
                {
                    coarse = ((((h_m_regs[1]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
                    ((runtime.dereference((members.m_tone ?? 0)[0])).set_period?.(h_m_regs[0], coarse) ?? 0);
                    break;
                }
            case 2:
            case 3:
                {
                    coarse = ((((h_m_regs[3]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
                    ((runtime.dereference((members.m_tone ?? 0)[1])).set_period?.(h_m_regs[2], coarse) ?? 0);
                    break;
                }
            case 4:
            case 5:
                {
                    coarse = ((((h_m_regs[5]) & (((method_is_expanded_mode(runtime)) ? (255) : (15))))) & 0xff);
                    ((runtime.dereference((members.m_tone ?? 0)[2])).set_period?.(h_m_regs[4], coarse) ?? 0);
                    break;
                }
            case 6:
                {
                    break;
                }
            case 8:
                {
                    ((runtime.dereference((members.m_tone ?? 0)[0])).set_volume?.(h_m_regs[8]) ?? 0);
                    break;
                }
            case 9:
                {
                    ((runtime.dereference((members.m_tone ?? 0)[1])).set_volume?.(h_m_regs[9]) ?? 0);
                    break;
                }
            case 10:
                {
                    ((runtime.dereference((members.m_tone ?? 0)[2])).set_volume?.(h_m_regs[10]) ?? 0);
                    break;
                }
            case 12:
            case 11:
                {
                    ((runtime.dereference((members.m_envelope ?? 0)[0])).set_period?.(h_m_regs[11], h_m_regs[12]) ?? 0);
                    break;
                }
            case 7:
                {
                    if (1) {
                        let enable = ((((h_m_regs[7]) & (64))) & 0xff);
                        if (((Number(enable) !== Number((((members.m_last_enable ?? 0)) & (64)))) ? 1 : 0)) {
                            if ((((typeof (runtime.dereference(members.m_port_a_write_cb)).isunset === 'function' ? (runtime.dereference(members.m_port_a_write_cb)).isunset() : typeof (runtime.dereference(members.m_port_a_write_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_port_a_write_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_port_a_write_cb)).isunset : runtime.container(members.m_port_a_write_cb, "isunset"))) ? 0 : 1)) {
                                (__l["m_port_a_write_cb"] ? __l["m_port_a_write_cb"](Number(0), Number(((enable) ? (h_m_regs[14]) : (255))), Number(((enable) ? (255) : (0)))) : typeof members.m_port_a_write_cb === 'function' ? members.m_port_a_write_cb(0, ((enable) ? (h_m_regs[14]) : (255)), ((enable) ? (255) : (0))) : runtime.invoke("m_port_a_write_cb", 0, ((enable) ? (h_m_regs[14]) : (255)), ((enable) ? (255) : (0))));
                            }
                        }
                    }
                    if (1) {
                        let enable = ((((h_m_regs[7]) & (128))) & 0xff);
                        if (((Number(enable) !== Number((((members.m_last_enable ?? 0)) & (128)))) ? 1 : 0)) {
                            if ((((typeof (runtime.dereference(members.m_port_b_write_cb)).isunset === 'function' ? (runtime.dereference(members.m_port_b_write_cb)).isunset() : typeof (runtime.dereference(members.m_port_b_write_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_port_b_write_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_port_b_write_cb)).isunset : runtime.container(members.m_port_b_write_cb, "isunset"))) ? 0 : 1)) {
                                (__l["m_port_b_write_cb"] ? __l["m_port_b_write_cb"](Number(0), Number(((enable) ? (h_m_regs[15]) : (255))), Number(((enable) ? (255) : (0)))) : typeof members.m_port_b_write_cb === 'function' ? members.m_port_b_write_cb(0, ((enable) ? (h_m_regs[15]) : (255)), ((enable) ? (255) : (0))) : runtime.invoke("m_port_b_write_cb", 0, ((enable) ? (h_m_regs[15]) : (255)), ((enable) ? (255) : (0))));
                            }
                        }
                    }
                    members.m_last_enable = ((h_m_regs[7]) & 0xff);
                    break;
                }
            case 13:
                {
                    if (((h_m_feature) & (8))) {
                        let old_mode = (((members.m_mode ?? 0)) & 0xff);
                        members.m_mode = ((((runtime.shiftRight(v, 4)) & (15))) & 0xff);
                        if (((Number(old_mode) !== Number((members.m_mode ?? 0))) ? 1 : 0)) {
                            if (((((Number(((old_mode) & (14))) === Number(10)) ? 1 : 0)) ^ (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0)))) {
                                for (let i = ((0) | 0); ((Number(i) < Number(13)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                                    method_ay8910_write_reg(runtime, i, 0);
                                    method_ay8910_write_reg(runtime, ((i) + (16)), 0);
                                }
                            }
                            else {
                                if ((((members.m_mode ?? 0)) & (15))) {
                                    0;
                                }
                            }
                        }
                    }
                    ((runtime.dereference((members.m_envelope ?? 0)[0])).set_shape?.(h_m_regs[13], (members.m_env_step_mask ?? 0)) ?? 0);
                    break;
                }
            case 14:
                {
                    if (((h_m_regs[7]) & (64))) {
                        if ((((typeof (runtime.dereference(members.m_port_a_write_cb)).isunset === 'function' ? (runtime.dereference(members.m_port_a_write_cb)).isunset() : typeof (runtime.dereference(members.m_port_a_write_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_port_a_write_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_port_a_write_cb)).isunset : runtime.container(members.m_port_a_write_cb, "isunset"))) ? 0 : 1)) {
                            (__l["m_port_a_write_cb"] ? __l["m_port_a_write_cb"](Number(h_m_regs[14])) : typeof members.m_port_a_write_cb === 'function' ? members.m_port_a_write_cb(h_m_regs[14]) : runtime.invoke("m_port_a_write_cb", h_m_regs[14]));
                        }
                        else {
                            0;
                        }
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 15:
                {
                    if (((h_m_regs[7]) & (128))) {
                        if ((((typeof (runtime.dereference(members.m_port_b_write_cb)).isunset === 'function' ? (runtime.dereference(members.m_port_b_write_cb)).isunset() : typeof (runtime.dereference(members.m_port_b_write_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_port_b_write_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_port_b_write_cb)).isunset : runtime.container(members.m_port_b_write_cb, "isunset"))) ? 0 : 1)) {
                            (__l["m_port_b_write_cb"] ? __l["m_port_b_write_cb"](Number(h_m_regs[15])) : typeof members.m_port_b_write_cb === 'function' ? members.m_port_b_write_cb(h_m_regs[15]) : runtime.invoke("m_port_b_write_cb", h_m_regs[15]));
                        }
                        else {
                            0;
                        }
                    }
                    else {
                        0;
                    }
                    break;
                }
            case 16:
            case 17:
                {
                    ((runtime.dereference((members.m_envelope ?? 0)[1])).set_period?.(h_m_regs[16], h_m_regs[17]) ?? 0);
                    break;
                }
            case 18:
            case 19:
                {
                    ((runtime.dereference((members.m_envelope ?? 0)[2])).set_period?.(h_m_regs[18], h_m_regs[19]) ?? 0);
                    break;
                }
            case 20:
                {
                    ((runtime.dereference((members.m_envelope ?? 0)[1])).set_shape?.(h_m_regs[20], (members.m_env_step_mask ?? 0)) ?? 0);
                    break;
                }
            case 21:
                {
                    ((runtime.dereference((members.m_envelope ?? 0)[2])).set_shape?.(h_m_regs[21], (members.m_env_step_mask ?? 0)) ?? 0);
                    break;
                }
            case 22:
                {
                    ((runtime.dereference((members.m_tone ?? 0)[0])).set_duty?.(h_m_regs[22]) ?? 0);
                    break;
                }
            case 23:
                {
                    ((runtime.dereference((members.m_tone ?? 0)[1])).set_duty?.(h_m_regs[23]) ?? 0);
                    break;
                }
            case 24:
                {
                    ((runtime.dereference((members.m_tone ?? 0)[2])).set_duty?.(h_m_regs[24]) ?? 0);
                    break;
                }
            case 25:
            case 26:
                {
                    break;
                }
            default:
                {
                    h_m_regs[r] = 0;
                    break;
                }
        }
    }
    function method_is_expanded_mode(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        return (((((h_m_feature) & (8))) && (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0))) ? 1 : 0);
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_vol_enabled = members.m_vol_enabled ?? 0;
        const h_m_feature = members.m_feature ?? 0;
        const h_m_vol_table = members.m_vol_table ?? 0;
        const h_m_env_table = members.m_env_table ?? 0;
        let tone = 0;
        let envelope = 0;
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                tone = ({ generatedPointer: true, source: (members.m_tone ?? 0), offset: chan });
                let period = ((Math.max(+(1), +(runtime.dereference(tone).period))) | 0);
                runtime.dereference(tone).count = ((((runtime.dereference(tone).count) + (((method_is_expanded_mode(runtime)) ? (16) : (1))))) | 0);
                while (((Number(runtime.dereference(tone).count) >= Number(period)) ? 1 : 0)) {
                    runtime.dereference(tone).duty_cycle = ((((((runtime.dereference(tone).duty_cycle) - (1))) & (31))) & 0xff);
                    runtime.dereference(tone).output = ((((method_is_expanded_mode(runtime)) ? (((((__mame_table_0[(((method_tone_duty(runtime, tone)) % 9) + 9) % 9] ?? 0)) >>> (runtime.dereference(tone).duty_cycle)) & 1)) : ((((runtime.dereference(tone).duty_cycle) >>> (0)) & 1)))) & 0xff);
                    runtime.dereference(tone).count = ((((runtime.dereference(tone).count) - (period))) | 0);
                }
            }
            if (((Number((members.m_count_noise = ((((members.m_count_noise) + (1))) << 16 >> 16))) >= Number(method_noise_period(runtime))) ? 1 : 0)) {
                members.m_count_noise = ((0) << 16 >> 16);
                members.m_prescale_noise = ((((members.m_prescale_noise) ^ (1))) & 0xff);
                if (method_is_expanded_mode(runtime)) {
                    if (((Number((members.m_noise_value = ((((members.m_noise_value) + (1))) << 16 >> 16))) >= Number((((((((members.m_rng ?? 0)) & 0xff)) & (method_noise_and(runtime)))) | (method_noise_or(runtime))))) ? 1 : 0)) {
                        members.m_noise_value = ((0) << 16 >> 16);
                        members.m_noise_out = ((((members.m_noise_out) ^ (1))) & 0xff);
                        method_noise_rng_tick(runtime);
                    }
                }
                else {
                    if ((((members.m_prescale_noise ?? 0)) ? 0 : 1)) {
                        method_noise_rng_tick(runtime);
                    }
                }
            }
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                tone = ({ generatedPointer: true, source: (members.m_tone ?? 0), offset: chan });
                h_m_vol_enabled[chan] = ((((runtime.dereference(tone).output) | (method_tone_enable(runtime, chan)))) & (((method_noise_output(runtime)) | (method_noise_enable(runtime, chan)))));
            }
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                envelope = ({ generatedPointer: true, source: (members.m_envelope ?? 0), offset: chan });
                if (((Number(runtime.dereference(envelope).holding) === Number(0)) ? 1 : 0)) {
                    let period = ((((runtime.dereference(envelope).period) * ((members.m_step ?? 0)))) >>> 0);
                    if (((Number((runtime.dereference(envelope).count = ((((runtime.dereference(envelope).count) + (1))) | 0))) >= Number(period)) ? 1 : 0)) {
                        runtime.dereference(envelope).count = ((0) | 0);
                        runtime.dereference(envelope).step = ((((runtime.dereference(envelope).step) - (1))) << 24 >> 24);
                        if (((Number(runtime.dereference(envelope).step) < Number(0)) ? 1 : 0)) {
                            if (runtime.dereference(envelope).hold) {
                                if (runtime.dereference(envelope).alternate) {
                                    runtime.dereference(envelope).attack = ((((runtime.dereference(envelope).attack) ^ ((members.m_env_step_mask ?? 0)))) & 0xff);
                                }
                                runtime.dereference(envelope).holding = ((1) & 0xff);
                                runtime.dereference(envelope).step = ((0) << 24 >> 24);
                            }
                            else {
                                if ((((runtime.dereference(envelope).alternate) && (((runtime.dereference(envelope).step) & ((((members.m_env_step_mask ?? 0)) + (1)))))) ? 1 : 0)) {
                                    runtime.dereference(envelope).attack = ((((runtime.dereference(envelope).attack) ^ ((members.m_env_step_mask ?? 0)))) & 0xff);
                                }
                                runtime.dereference(envelope).step = ((((runtime.dereference(envelope).step) & ((members.m_env_step_mask ?? 0)))) << 24 >> 24);
                            }
                        }
                    }
                }
                runtime.dereference(envelope).volume = ((((runtime.dereference(envelope).step) ^ (runtime.dereference(envelope).attack))) >>> 0);
            }
            if (((Number((members.m_streams ?? 0)) === Number(3)) ? 1 : 0)) {
                for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                    tone = ({ generatedPointer: true, source: (members.m_tone ?? 0), offset: chan });
                    if (((Number(method_tone_envelope(runtime, tone)) !== Number(0)) ? 1 : 0)) {
                        envelope = ({ generatedPointer: true, source: (members.m_envelope ?? 0), offset: method_get_envelope_chan(runtime, chan) });
                        let env_volume = ((runtime.dereference(envelope).volume) >>> 0);
                        if (((h_m_feature) & (8))) {
                            if (((method_is_expanded_mode(runtime)) ? 0 : 1)) {
                                env_volume = ((runtime.shiftRight(env_volume, 1)) >>> 0);
                                if (((h_m_feature) & (4))) {
                                    ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_vol_table[chan][((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0))]) ?? 0);
                                }
                                else {
                                    ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_vol_table[chan][((h_m_vol_enabled[chan]) ? (env_volume) : (0))]) ?? 0);
                                }
                            }
                            else {
                                if (((h_m_feature) & (4))) {
                                    ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_env_table[chan][((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0))]) ?? 0);
                                }
                                else {
                                    ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_env_table[chan][((h_m_vol_enabled[chan]) ? (env_volume) : (0))]) ?? 0);
                                }
                            }
                        }
                        else {
                            if (((h_m_feature) & (4))) {
                                ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_env_table[chan][((h_m_vol_enabled[chan]) ? (((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) : (0))]) ?? 0);
                            }
                            else {
                                ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_env_table[chan][((h_m_vol_enabled[chan]) ? (env_volume) : (0))]) ?? 0);
                            }
                        }
                    }
                    else {
                        if (method_is_expanded_mode(runtime)) {
                            ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_env_table[chan][((h_m_vol_enabled[chan]) ? (method_tone_volume(runtime, tone)) : (0))]) ?? 0);
                        }
                        else {
                            ((runtime.dereference(stream)).put?.(chan, sampindex, h_m_vol_table[chan][((h_m_vol_enabled[chan]) ? (method_tone_volume(runtime, tone)) : (0))]) ?? 0);
                        }
                    }
                }
            }
            else {
                ((runtime.dereference(stream)).put?.(0, sampindex, method_mix_3D(runtime)) ?? 0);
            }
        }
    }
    function method_tone_duty(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = runtime.dereference(tone);
        return ((((method_is_expanded_mode(runtime)) ? (((((__pointee_tone.duty) & (8))) ? (8) : (((__pointee_tone.duty) & (15))))) : (4))) & 0xff);
    }
    function method_noise_period(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((method_is_expanded_mode(runtime)) ? (((h_m_regs[6]) & (255))) : (((h_m_regs[6]) & (31))))) & 0xff);
    }
    function method_noise_and(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[25]) & (255))) & 0xff);
    }
    function method_noise_or(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[26]) & (255))) & 0xff);
    }
    function method_noise_rng_tick(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((h_m_feature) & (8))) {
            members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (2)) & 1)))) << (16))))) >>> 0);
        }
        else {
            members.m_rng = (((((((members.m_rng ?? 0)) >>> (1))) | (((((((((members.m_rng ?? 0)) >>> (0)) & 1)) ^ (((((members.m_rng ?? 0)) >>> (3)) & 1)))) << (16))))) >>> 0);
        }
    }
    function method_tone_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (chan)) & 1);
    }
    function method_noise_output(runtime) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? ((((members.m_noise_out ?? 0)) & (1))) : ((((members.m_rng ?? 0)) & (1))))) & 0xff);
    }
    function method_noise_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (((3) + (chan)))) & 1);
    }
    function method_tone_envelope(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = runtime.dereference(tone);
        const h_m_feature = members.m_feature ?? 0;
        return ((((((__pointee_tone.volume) >>> (((method_is_expanded_mode(runtime)) ? (5) : (4))))) & (((((h_m_feature) & (4))) ? (3) : (1))))) & 0xff);
    }
    function method_get_envelope_chan(runtime, chan) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? (chan) : (0))) & 0xff);
    }
    function method_tone_volume(runtime, tone) {
        const members = runtime.members;
        const __pointee_tone = runtime.dereference(tone);
        return ((((__pointee_tone.volume) & (((method_is_expanded_mode(runtime)) ? (31) : (15))))) & 0xff);
    }
    function method_mix_3D(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        const h_m_vol_enabled = members.m_vol_enabled ?? 0;
        let indx = ((0) | 0);
        for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            let tone = ({ generatedPointer: true, source: (members.m_tone ?? 0), offset: chan });
            if (((Number(method_tone_envelope(runtime, tone)) !== Number(0)) ? 1 : 0)) {
                let envelope = ({ generatedPointer: true, source: (members.m_envelope ?? 0), offset: method_get_envelope_chan(runtime, chan) });
                let env_volume = ((runtime.dereference(envelope).volume) >>> 0);
                let env_mask = ((((1) << (((chan) + (15))))) >>> 0);
                if (((h_m_feature) & (8))) {
                    if (((method_is_expanded_mode(runtime)) ? 0 : 1)) {
                        env_volume = ((runtime.shiftRight(env_volume, 1)) >>> 0);
                        env_mask = ((0) >>> 0);
                    }
                }
                if (((h_m_feature) & (4))) {
                    indx = ((((indx) | (((env_mask) | (((h_m_vol_enabled[chan]) ? (((((env_volume) >>> (runtime.subtract(3, method_tone_envelope(runtime, tone))))) << (((chan) * (5))))) : (0))))))) | 0);
                }
                else {
                    indx = ((((indx) | (((env_mask) | (((h_m_vol_enabled[chan]) ? (((env_volume) << (((chan) * (5))))) : (0))))))) | 0);
                }
            }
            else {
                let tone_mask = ((((method_is_expanded_mode(runtime)) ? (((1) << (((chan) + (15))))) : (0))) >>> 0);
                indx = ((((indx) | (((tone_mask) | (((h_m_vol_enabled[chan]) ? (((method_tone_volume(runtime, tone)) << (((chan) * (5))))) : (0))))))) | 0);
            }
        }
        return (members.m_vol3d_table ?? 0)[indx];
    }
    function method_build_mixer_table(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_ay8910_mosfet_param = members.ay8910_mosfet_param ?? 0;
        const h_m_res_load = members.m_res_load ?? 0;
        const h_m_vol_table = members.m_vol_table ?? 0;
        const h_m_env_table = members.m_env_table ?? 0;
        let normalize = ((0) | 0);
        if (((Number((((members.m_flags ?? 0)) & (1))) !== Number(0)) ? 1 : 0)) {
            0;
            normalize = ((1) | 0);
        }
        if (((Number((((members.m_flags ?? 0)) & (8))) !== Number(0)) ? 1 : 0)) {
            if (((Number((members.m_type ?? 0)) !== Number(0)) ? 1 : 0)) {
                (__l["fatalerror"] ? __l["fatalerror"]("AY8910_RESISTOR_OUTPUT currently only supported for AY8910 devices.") : runtime.macro("fatalerror", "AY8910_RESISTOR_OUTPUT currently only supported for AY8910 devices."));
            }
            for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                method_build_mosfet_resistor_table(runtime, h_ay8910_mosfet_param, h_m_res_load[chan], h_m_vol_table[chan]);
                method_build_mosfet_resistor_table(runtime, h_ay8910_mosfet_param, h_m_res_load[chan], h_m_env_table[chan]);
            }
        }
        else {
            if (((Number((members.m_streams ?? 0)) === Number(3)) ? 1 : 0)) {
                for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
                    method_build_single_table(runtime, h_m_res_load[chan], (members.m_par ?? 0), normalize, h_m_vol_table[chan], (members.m_zero_is_off ?? 0));
                    method_build_single_table(runtime, h_m_res_load[chan], (members.m_par_env ?? 0), normalize, h_m_env_table[chan], 0);
                }
            }
            else {
                method_build_3D_table(runtime, h_m_res_load[0], (members.m_par ?? 0), (members.m_par_env ?? 0), normalize, 3, (members.m_zero_is_off ?? 0), (members.m_vol3d_table ?? 0));
            }
        }
    }
    function method_build_mosfet_resistor_table(runtime, par, rd, tab) {
        const members = runtime.members;
        for (let j = ((0) | 0); ((Number(j) < Number(par.m_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            let Vd = 5;
            let Vg = ((par.m_Vg) - (par.m_Vth));
            let kn = ((par.m_Kn[j]) / (1000000));
            let p2 = ((((1) / (((((2) * (kn))) * (rd))))) + (Vg));
            let Vs = ((p2) - (Math.sqrt(Number(((((p2) * (p2))) - (((Vg) * (Vg))))))));
            let res = ((rd) * (((((Vd) / (Vs))) - (1))));
            tab[j] = res;
        }
    }
    function method_build_single_table(runtime, rl, par, normalize, tab, zero_is_off) {
        const members = runtime.members;
        let rt = 0;
        let rw = 0;
        let temp = new Float64Array(new Uint8Array(Math.max(0, Number(32))));
        let min = 10;
        let max = 0;
        for (let j = ((0) | 0); ((Number(j) < Number(runtime.dereference(par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
            rt = runtime.add(((1) / (runtime.dereference(par).r_down)), ((1) / (rl)));
            rw = ((1) / (runtime.dereference(par).res[j]));
            rt = ((rt) + (((1) / (runtime.dereference(par).res[j]))));
            if ((((((zero_is_off) && (((Number(j) === Number(0)) ? 1 : 0))) ? 1 : 0)) ? 0 : 1)) {
                rw = ((rw) + (((1) / (runtime.dereference(par).r_up))));
                rt = ((rt) + (((1) / (runtime.dereference(par).r_up))));
            }
            temp[j] = ((rw) / (rt));
            if (((Number(temp[j]) < Number(min)) ? 1 : 0)) {
                min = temp[j];
            }
            if (((Number(temp[j]) > Number(max)) ? 1 : 0)) {
                max = temp[j];
            }
        }
        if (normalize) {
            for (let j = ((0) | 0); ((Number(j) < Number(runtime.dereference(par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                tab[j] = ((((1) * (((((((temp[j]) - (min))) / (((max) - (min))))) - (0.25))))) * (0.5));
            }
        }
        else {
            for (let j = ((0) | 0); ((Number(j) < Number(runtime.dereference(par).res_count)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                tab[j] = ((1) * (temp[j]));
            }
        }
    }
    function method_build_3D_table(runtime, rl, par, par_env, normalize, factor, zero_is_off, tab) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let min = 10;
        let max = 0;
        let temp = (__l["VECTOR_OF"] ? __l["VECTOR_OF"]("double", 262144, 0) : runtime.macro("VECTOR_OF", "double", 262144, 0));
        for (let e = ((0) | 0); ((Number(e) < Number(8)) ? 1 : 0); e = ((((e) + (1))) | 0)) {
            let par_ch1 = ((((e) & (1))) ? (par_env) : (par));
            let par_ch2 = ((((e) & (2))) ? (par_env) : (par));
            let par_ch3 = ((((e) & (4))) ? (par_env) : (par));
            for (let j1 = ((0) | 0); ((Number(j1) < Number(runtime.dereference(par_ch1).res_count)) ? 1 : 0); j1 = ((((j1) + (1))) | 0)) {
                for (let j2 = ((0) | 0); ((Number(j2) < Number(runtime.dereference(par_ch2).res_count)) ? 1 : 0); j2 = ((((j2) + (1))) | 0)) {
                    for (let j3 = ((0) | 0); ((Number(j3) < Number(runtime.dereference(par_ch3).res_count)) ? 1 : 0); j3 = ((((j3) + (1))) | 0)) {
                        let n = 0;
                        if (zero_is_off) {
                            n = (((((((Number(j1) !== Number(0)) ? 1 : 0)) || (((e) & (1)))) ? 1 : 0)) ? (1) : (0));
                            n = ((n) + ((((((((Number(j2) !== Number(0)) ? 1 : 0)) || (((e) & (2)))) ? 1 : 0)) ? (1) : (0))));
                            n = ((n) + ((((((((Number(j3) !== Number(0)) ? 1 : 0)) || (((e) & (4)))) ? 1 : 0)) ? (1) : (0))));
                        }
                        else {
                            n = 3;
                        }
                        let rt = runtime.add(runtime.add(((n) / (runtime.dereference(par).r_up)), ((3) / (runtime.dereference(par).r_down))), ((1) / (rl)));
                        let rw = ((n) / (runtime.dereference(par).r_up));
                        rw = ((rw) + (((1) / (runtime.dereference(par_ch1).res[j1]))));
                        rt = ((rt) + (((1) / (runtime.dereference(par_ch1).res[j1]))));
                        rw = ((rw) + (((1) / (runtime.dereference(par_ch2).res[j2]))));
                        rt = ((rt) + (((1) / (runtime.dereference(par_ch2).res[j2]))));
                        rw = ((rw) + (((1) / (runtime.dereference(par_ch3).res[j3]))));
                        rt = ((rt) + (((1) / (runtime.dereference(par_ch3).res[j3]))));
                        let indx = ((((((((((e) << (15))) | (((j3) << (10))))) | (((j2) << (5))))) | (j1))) | 0);
                        temp[indx] = ((rw) / (rt));
                        if (((Number(temp[indx]) < Number(min)) ? 1 : 0)) {
                            min = temp[indx];
                        }
                        if (((Number(temp[indx]) > Number(max)) ? 1 : 0)) {
                            max = temp[indx];
                        }
                    }
                }
            }
        }
        if (normalize) {
            for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                tab[j] = ((((1) * (((((temp[j]) - (min))) / (((max) - (min))))))) * (factor));
            }
        }
        else {
            for (let j = ((0) | 0); ((Number(j) < Number(262144)) ? 1 : 0); j = ((((j) + (1))) | 0)) {
                tab[j] = ((1) * (temp[j]));
            }
        }
    }
    function method_ay8910_reset_ym(runtime) {
        const members = runtime.members;
        members.m_active = ((0) ? 1 : 0);
        members.m_register_latch = ((0) & 0xff);
        members.m_rng = ((1) >>> 0);
        members.m_noise_out = ((0) & 0xff);
        members.m_mode = ((0) & 0xff);
        for (let chan = ((0) | 0); ((Number(chan) < Number(3)) ? 1 : 0); chan = ((((chan) + (1))) | 0)) {
            ((runtime.dereference((members.m_tone ?? 0)[chan])).reset?.() ?? runtime.container((members.m_tone ?? 0)[chan], "reset"));
            ((runtime.dereference((members.m_envelope ?? 0)[chan])).reset?.() ?? runtime.container((members.m_envelope ?? 0)[chan], "reset"));
        }
        members.m_noise_value = ((0) << 16 >> 16);
        members.m_count_noise = ((0) << 16 >> 16);
        members.m_prescale_noise = ((0) & 0xff);
        members.m_last_enable = ((192) & 0xff);
        for (let i = ((0) | 0); ((Number(i) < Number(14)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_ay8910_write_reg(runtime, i, 0);
        }
        members.m_ready = ((1) | 0);
    }
    function method_ay_set_clock(runtime, clock) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        if (((((((((h_m_feature) & (1))) && ((((members.m_flags ?? 0)) & (16)))) ? 1 : 0)) || (((h_m_feature) & (2)))) ? 1 : 0)) {
            ((runtime.dereference(members.m_channel)).set_sample_rate?.(runtime.divide(clock, 16)) ?? 0);
        }
        else {
            ((runtime.dereference(members.m_channel)).set_sample_rate?.(runtime.divide(clock, 8)) ?? 0);
        }
    }
    function method_write_bc1_bc2(runtime, offset, data) {
        const members = runtime.members;
        switch (((offset) & (3))) {
            case 0:
                {
                    method_address_w(runtime, data);
                    break;
                }
            case 1:
                {
                    break;
                }
            case 2:
                {
                    method_data_w(runtime, data);
                    break;
                }
            case 3:
                {
                    method_address_w(runtime, data);
                    break;
                }
        }
    }
    function method_address_w(runtime, data) {
        const members = runtime.members;
        method_ay8910_write_ym(runtime, 0, data);
    }
    function method_ay8910_write_ym(runtime, addr, data) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        if (((addr) & (1))) {
            if ((members.m_active ?? 0)) {
                let register_latch = (((((members.m_register_latch ?? 0)) + (method_get_register_bank(runtime)))) & 0xff);
                if ((((((Number((members.m_register_latch ?? 0)) === Number(13)) ? 1 : 0)) || (((Number(h_m_regs[register_latch]) !== Number(data)) ? 1 : 0))) ? 1 : 0)) {
                    (typeof (runtime.dereference(members.m_channel)).update === 'function' ? (runtime.dereference(members.m_channel)).update() : typeof (runtime.dereference(members.m_channel)).update === 'number' || typeof (runtime.dereference(members.m_channel)).update === 'boolean' ? (runtime.dereference(members.m_channel)).update : runtime.container(members.m_channel, "update"));
                }
                method_ay8910_write_reg(runtime, register_latch, data);
            }
        }
        else {
            members.m_active = ((((Number(((data) >>> (4))) === Number(0)) ? 1 : 0)) ? 1 : 0);
            if ((members.m_active ?? 0)) {
                members.m_register_latch = ((((data) & (15))) & 0xff);
            }
            else {
                0;
            }
        }
    }
    function method_get_register_bank(runtime) {
        const members = runtime.members;
        return ((((method_is_expanded_mode(runtime)) ? ((((((members.m_mode ?? 0)) & (1))) << (4))) : (0))) & 0xff);
    }
    function method_data_w(runtime, data) {
        const members = runtime.members;
        method_ay8910_write_ym(runtime, 1, data);
    }
    function method_set_flags(runtime, flags) {
        const members = runtime.members;
        members.m_flags = ((flags) | 0);
    }
    function method_port_a_read_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_a_read_cb)).bind === 'function' ? (runtime.dereference(members.m_port_a_read_cb)).bind() : typeof (runtime.dereference(members.m_port_a_read_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_a_read_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_a_read_cb)).bind : runtime.container(members.m_port_a_read_cb, "bind"));
    }
    function method_port_b_read_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_b_read_cb)).bind === 'function' ? (runtime.dereference(members.m_port_b_read_cb)).bind() : typeof (runtime.dereference(members.m_port_b_read_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_b_read_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_b_read_cb)).bind : runtime.container(members.m_port_b_read_cb, "bind"));
    }
    function method_port_a_write_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_a_write_cb)).bind === 'function' ? (runtime.dereference(members.m_port_a_write_cb)).bind() : typeof (runtime.dereference(members.m_port_a_write_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_a_write_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_a_write_cb)).bind : runtime.container(members.m_port_a_write_cb, "bind"));
    }
    function method_port_b_write_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_b_write_cb)).bind === 'function' ? (runtime.dereference(members.m_port_b_write_cb)).bind() : typeof (runtime.dereference(members.m_port_b_write_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_b_write_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_b_write_cb)).bind : runtime.container(members.m_port_b_write_cb, "bind"));
    }
    function method_data_r(runtime) {
        const members = runtime.members;
        return ((runtime.invoke("ay8910_read_ym")) & 0xff);
    }
    function method_data_address_w(runtime, offset, data) {
        const members = runtime.members;
        method_ay8910_write_ym(runtime, (((~offset)) & (1)), data);
    }
    function method_address_data_w(runtime, offset, data) {
        const members = runtime.members;
        method_ay8910_write_ym(runtime, ((offset) & (1)), data);
    }
    function method_ay8910_device__set_flags(runtime, flags) {
        const members = runtime.members;
        members.m_flags = ((flags) | 0);
    }
    function method_ay8910_device__port_a_read_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_a_read_cb)).bind === 'function' ? (runtime.dereference(members.m_port_a_read_cb)).bind() : typeof (runtime.dereference(members.m_port_a_read_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_a_read_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_a_read_cb)).bind : runtime.container(members.m_port_a_read_cb, "bind"));
    }
    function method_ay8910_device__port_b_read_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_b_read_cb)).bind === 'function' ? (runtime.dereference(members.m_port_b_read_cb)).bind() : typeof (runtime.dereference(members.m_port_b_read_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_b_read_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_b_read_cb)).bind : runtime.container(members.m_port_b_read_cb, "bind"));
    }
    function method_ay8910_device__port_a_write_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_a_write_cb)).bind === 'function' ? (runtime.dereference(members.m_port_a_write_cb)).bind() : typeof (runtime.dereference(members.m_port_a_write_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_a_write_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_a_write_cb)).bind : runtime.container(members.m_port_a_write_cb, "bind"));
    }
    function method_ay8910_device__port_b_write_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_port_b_write_cb)).bind === 'function' ? (runtime.dereference(members.m_port_b_write_cb)).bind() : typeof (runtime.dereference(members.m_port_b_write_cb)).bind === 'number' || typeof (runtime.dereference(members.m_port_b_write_cb)).bind === 'boolean' ? (runtime.dereference(members.m_port_b_write_cb)).bind : runtime.container(members.m_port_b_write_cb, "bind"));
    }
    function method_ay8910_device__data_r(runtime) {
        const members = runtime.members;
        return ((runtime.invoke("ay8910_read_ym")) & 0xff);
    }
    function method_ay8910_device__data_address_w(runtime, offset, data) {
        const members = runtime.members;
        method_ay8910_write_ym(runtime, (((~offset)) & (1)), data);
    }
    function method_ay8910_device__address_data_w(runtime, offset, data) {
        const members = runtime.members;
        method_ay8910_write_ym(runtime, ((offset) & (1)), data);
    }
    function method_set_volume(runtime, val) {
        const members = runtime.members;
        members.volume = ((val) & 0xff);
    }
    function method_set_duty(runtime, val) {
        const members = runtime.members;
        members.duty = ((val) & 0xff);
    }
    function method_ay8910_device__tone_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (chan)) & 1);
    }
    function method_ay8910_device__noise_enable(runtime, chan) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return (((h_m_regs[7]) >>> (((3) + (chan)))) & 1);
    }
    function method_ay8910_device__is_expanded_mode(runtime) {
        const members = runtime.members;
        const h_m_feature = members.m_feature ?? 0;
        return (((((h_m_feature) & (8))) && (((Number((((members.m_mode ?? 0)) & (14))) === Number(10)) ? 1 : 0))) ? 1 : 0);
    }
    function method_ay8910_device__noise_and(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[25]) & (255))) & 0xff);
    }
    function method_ay8910_device__noise_or(runtime) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        return ((((h_m_regs[26]) & (255))) & 0xff);
    }
    return {
        "ay8910_write_reg": method_ay8910_write_reg,
        "is_expanded_mode": method_is_expanded_mode,
        "sound_stream_update": method_sound_stream_update,
        "tone_duty": method_tone_duty,
        "noise_period": method_noise_period,
        "noise_and": method_noise_and,
        "noise_or": method_noise_or,
        "noise_rng_tick": method_noise_rng_tick,
        "tone_enable": method_tone_enable,
        "noise_output": method_noise_output,
        "noise_enable": method_noise_enable,
        "tone_envelope": method_tone_envelope,
        "get_envelope_chan": method_get_envelope_chan,
        "tone_volume": method_tone_volume,
        "mix_3D": method_mix_3D,
        "build_mixer_table": method_build_mixer_table,
        "build_mosfet_resistor_table": method_build_mosfet_resistor_table,
        "build_single_table": method_build_single_table,
        "build_3D_table": method_build_3D_table,
        "ay8910_reset_ym": method_ay8910_reset_ym,
        "ay_set_clock": method_ay_set_clock,
        "write_bc1_bc2": method_write_bc1_bc2,
        "address_w": method_address_w,
        "ay8910_write_ym": method_ay8910_write_ym,
        "get_register_bank": method_get_register_bank,
        "data_w": method_data_w,
        "set_flags": method_set_flags,
        "port_a_read_callback": method_port_a_read_callback,
        "port_b_read_callback": method_port_b_read_callback,
        "port_a_write_callback": method_port_a_write_callback,
        "port_b_write_callback": method_port_b_write_callback,
        "data_r": method_data_r,
        "data_address_w": method_data_address_w,
        "address_data_w": method_address_data_w,
        "ay8910_device::set_flags": method_ay8910_device__set_flags,
        "ay8910_device::port_a_read_callback": method_ay8910_device__port_a_read_callback,
        "ay8910_device::port_b_read_callback": method_ay8910_device__port_b_read_callback,
        "ay8910_device::port_a_write_callback": method_ay8910_device__port_a_write_callback,
        "ay8910_device::port_b_write_callback": method_ay8910_device__port_b_write_callback,
        "ay8910_device::data_r": method_ay8910_device__data_r,
        "ay8910_device::data_address_w": method_ay8910_device__data_address_w,
        "ay8910_device::address_data_w": method_ay8910_device__address_data_w,
        "set_volume": method_set_volume,
        "set_duty": method_set_duty,
        "ay8910_device::tone_enable": method_ay8910_device__tone_enable,
        "ay8910_device::noise_enable": method_ay8910_device__noise_enable,
        "ay8910_device::is_expanded_mode": method_ay8910_device__is_expanded_mode,
        "ay8910_device::noise_and": method_ay8910_device__noise_and,
        "ay8910_device::noise_or": method_ay8910_device__noise_or
    };
})();
definition.children[0].definition.compiledMethodLinks = ["VECTOR_OF", "fatalerror", "m_port_a_write_cb", "m_port_b_write_cb"];
export const device = definition;
export default device;
