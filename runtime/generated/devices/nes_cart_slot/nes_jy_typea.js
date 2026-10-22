import deviceData from './nes_jy_typea.device.ir.json' with { type: 'json' };
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
    function method_ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_hblank_irq(runtime, scanline, vblank, blanked) {
        const members = runtime.members;
    }
    function method_scanline_irq(runtime, scanline, vblank, blanked) {
        const members = runtime.members;
        if (((Number(scanline) < Number(239)) ? 1 : 0)) {
            method_irq_clock(runtime, blanked, 1);
        }
    }
    function method_irq_clock(runtime, blanked, mode) {
        const members = runtime.members;
        let clock = ((0) ? 1 : 0);
        let fire = ((0) ? 1 : 0);
        if (((Number((members.m_irq_mode ?? 0)) !== Number(mode)) ? 1 : 0)) {
            return;
        }
        if ((((((((members.m_irq_down ?? 0)) && ((members.m_irq_up ?? 0))) ? 1 : 0)) || (((((((members.m_irq_down ?? 0)) ? 0 : 1)) && ((((members.m_irq_up ?? 0)) ? 0 : 1))) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        if ((members.m_irq_down ?? 0)) {
            if (((Number((((members.m_irq_prescale ?? 0)) & ((members.m_irq_prescale_mask ?? 0)))) === Number(0)) ? 1 : 0)) {
                clock = ((1) ? 1 : 0);
                members.m_irq_prescale = ((((((Number((members.m_irq_prescale_mask ?? 0)) === Number(7)) ? 1 : 0)) ? ((((((members.m_irq_prescale ?? 0)) & (248))) | (7))) : (255))) & 0xff);
            }
            else {
                members.m_irq_prescale = ((((((Number((members.m_irq_prescale_mask ?? 0)) === Number(7)) ? 1 : 0)) ? ((((((members.m_irq_prescale ?? 0)) & (248))) | ((((((members.m_irq_prescale ?? 0)) - (1))) & ((members.m_irq_prescale_mask ?? 0)))))) : ((((members.m_irq_prescale ?? 0)) - (1))))) & 0xff);
            }
        }
        if ((members.m_irq_up ?? 0)) {
            if (((Number((((members.m_irq_prescale ?? 0)) & ((members.m_irq_prescale_mask ?? 0)))) === Number((members.m_irq_prescale_mask ?? 0))) ? 1 : 0)) {
                clock = ((1) ? 1 : 0);
                members.m_irq_prescale = ((((((Number((members.m_irq_prescale_mask ?? 0)) === Number(7)) ? 1 : 0)) ? ((((members.m_irq_prescale ?? 0)) & (248))) : (0))) & 0xff);
            }
            else {
                members.m_irq_prescale = ((((((Number((members.m_irq_prescale_mask ?? 0)) === Number(7)) ? 1 : 0)) ? ((((((members.m_irq_prescale ?? 0)) & (248))) | ((((((members.m_irq_prescale ?? 0)) + (1))) & ((members.m_irq_prescale_mask ?? 0)))))) : ((((members.m_irq_prescale ?? 0)) + (1))))) & 0xff);
            }
        }
        if (clock) {
            if ((members.m_irq_down ?? 0)) {
                if (((Number((members.m_irq_count ?? 0)) === Number(0)) ? 1 : 0)) {
                    fire = ((1) ? 1 : 0);
                    members.m_irq_count = ((255) & 0xff);
                }
                else {
                    members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xff);
                }
            }
            if ((members.m_irq_up ?? 0)) {
                if (((Number((members.m_irq_count ?? 0)) === Number(255)) ? 1 : 0)) {
                    fire = ((1) ? 1 : 0);
                    members.m_irq_count = ((0) & 0xff);
                }
                else {
                    members.m_irq_count = ((((members.m_irq_count) + (1))) & 0xff);
                }
            }
            if (((((((fire) && ((members.m_irq_enable ?? 0))) ? 1 : 0)) && (((blanked) ? 0 : 1))) ? 1 : 0)) {
                method_set_irq_line(runtime, 1);
            }
        }
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
        let bank = ((runtime.shiftRight(offset, 10)) | 0);
        method_irq_clock(runtime, 0, 2);
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
        let page = ((runtime.shiftRight(((offset) & (3072)), 10)) | 0);
        method_irq_clock(runtime, 0, 2);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
    }
    function method_read_l(runtime, offset) {
        const members = runtime.members;
        const h_m_mul = members.m_mul ?? 0;
        0;
        offset = ((offset) + (256));
        if ((((((Number(offset) >= Number(4096)) ? 1 : 0)) && (((Number(offset) < Number(6144)) ? 1 : 0))) ? 1 : 0)) {
            return ((((method_get_open_bus(runtime)) & (63))) & 0xff);
        }
        if (((Number(offset) >= Number(6144)) ? 1 : 0)) {
            if (((Number(((offset) & (7))) === Number(0)) ? 1 : 0)) {
                return ((((((h_m_mul[0]) * (h_m_mul[1]))) & (255))) & 0xff);
            }
            if (((Number(((offset) & (7))) === Number(1)) ? 1 : 0)) {
                return ((((runtime.shiftRight(((h_m_mul[0]) * (h_m_mul[1])), 8)) & (255))) & 0xff);
            }
            if (((Number(((offset) & (7))) === Number(3)) ? 1 : 0)) {
                return (((members.m_latch ?? 0)) & 0xff);
            }
        }
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        const h_m_reg = members.m_reg ?? 0;
        0;
        if (((h_m_reg[0]) & (128))) {
            return ((runtime.readIndex((members.m_prg ?? 0), runtime.add((((((members.m_bank_6000 ?? 0)) & ((members.m_prg_mask ?? 0)))) * (8192)), ((offset) & (8191))))) & 0xff);
        }
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        const h_m_mul = members.m_mul ?? 0;
        0;
        offset = ((offset) + (256));
        if (((Number(offset) >= Number(6144)) ? 1 : 0)) {
            if (((Number(((offset) & (7))) === Number(0)) ? 1 : 0)) {
                h_m_mul[0] = data;
            }
            if (((Number(((offset) & (7))) === Number(1)) ? 1 : 0)) {
                h_m_mul[1] = data;
            }
            if (((Number(((offset) & (7))) === Number(3)) ? 1 : 0)) {
                members.m_latch = ((data) & 0xff);
            }
        }
    }
    function method_write_m(runtime, offset, data) {
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
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        const h_m_mmc_nt_bank = members.m_mmc_nt_bank ?? 0;
        const h_irq_timer = members.irq_timer ?? 0;
        const h_m_reg = members.m_reg ?? 0;
        0;
        switch (((offset) & (28672))) {
            case 0:
                {
                    offset = ((offset) & (3));
                    data = ((((data) & (63))) & 0xff);
                    if (((Number(h_m_mmc_prg_bank[offset]) !== Number(data)) ? 1 : 0)) {
                        h_m_mmc_prg_bank[offset] = data;
                        method_update_prg(runtime);
                    }
                    break;
                }
            case 4096:
                {
                    offset = ((offset) & (7));
                    if (((Number(((h_m_mmc_vrom_bank[offset]) & (255))) !== Number(data)) ? 1 : 0)) {
                        h_m_mmc_vrom_bank[offset] = ((((h_m_mmc_vrom_bank[offset]) & (65280))) | (data));
                        method_update_chr(runtime);
                    }
                    break;
                }
            case 8192:
                {
                    offset = ((offset) & (7));
                    if (((Number(((h_m_mmc_vrom_bank[offset]) & (65280))) !== Number(((data) << (8)))) ? 1 : 0)) {
                        h_m_mmc_vrom_bank[offset] = ((((h_m_mmc_vrom_bank[offset]) & (255))) | (((data) << (8))));
                        method_update_chr(runtime);
                    }
                    break;
                }
            case 12288:
                {
                    if (((((offset) & (4))) ? 0 : 1)) {
                        offset = ((offset) & (3));
                        h_m_mmc_nt_bank[offset] = ((((h_m_mmc_nt_bank[offset]) & (65280))) | (data));
                    }
                    else {
                        offset = ((offset) & (3));
                        h_m_mmc_nt_bank[offset] = ((((h_m_mmc_nt_bank[offset]) & (255))) | (((data) << (8))));
                    }
                    method_update_mirror(runtime);
                    break;
                }
            case 16384:
                {
                    switch (((offset) & (7))) {
                        case 0:
                            {
                                if ((((data) >>> (0)) & 1)) {
                                    members.m_irq_enable = ((1) | 0);
                                }
                                else {
                                    method_set_irq_line(runtime, 0);
                                    members.m_irq_enable = ((0) | 0);
                                }
                                break;
                            }
                        case 1:
                            {
                                members.m_irq_mode = ((((data) & (3))) & 0xff);
                                members.m_irq_prescale_mask = ((((((data) & (4))) ? (7) : (255))) & 0xff);
                                members.m_irq_down = ((((data) & (128))) | 0);
                                members.m_irq_up = ((((data) & (64))) | 0);
                                if (((Number((members.m_irq_mode ?? 0)) === Number(0)) ? 1 : 0)) {
                                    ((runtime.dereference(h_irq_timer)).adjust?.(0, 0, (members.timer_freq ?? 0)) ?? 0);
                                }
                                else {
                                    ((runtime.dereference(h_irq_timer)).adjust?.(Infinity) ?? 0);
                                }
                                break;
                            }
                        case 2:
                            {
                                method_set_irq_line(runtime, 0);
                                members.m_irq_enable = ((0) | 0);
                                break;
                            }
                        case 3:
                            {
                                members.m_irq_enable = ((1) | 0);
                                break;
                            }
                        case 4:
                            {
                                members.m_irq_prescale = ((((data) ^ ((members.m_irq_flip ?? 0)))) & 0xff);
                                break;
                            }
                        case 5:
                            {
                                members.m_irq_count = ((((data) ^ ((members.m_irq_flip ?? 0)))) & 0xff);
                                break;
                            }
                        case 6:
                            {
                                members.m_irq_flip = ((data) & 0xff);
                                break;
                            }
                        case 7:
                            {
                                break;
                            }
                    }
                    break;
                }
            case 20480:
                {
                    if (((Number(h_m_reg[((offset) & (3))]) !== Number(data)) ? 1 : 0)) {
                        h_m_reg[((offset) & (3))] = data;
                        method_update_banks(runtime, ((offset) & (3)));
                    }
                    break;
                }
        }
    }
    function method_update_prg(runtime) {
        const members = runtime.members;
        const h_m_reg = members.m_reg ?? 0;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        let exPrg = ((((((h_m_reg[3]) & (6))) << (5))) & 0xff);
        let last = ((((((h_m_reg[0]) & (4))) ? (h_m_mmc_prg_bank[3]) : (63))) & 0xff);
        switch (((h_m_reg[0]) & (3))) {
            case 0:
                {
                    method_prg32(runtime, ((((last) & (15))) | (runtime.shiftRight(exPrg, 2))));
                    members.m_bank_6000 = ((((((runtime.add(((h_m_mmc_prg_bank[3]) * (4)), 3)) & (63))) | (runtime.shiftRight(exPrg, 2)))) | 0);
                    break;
                }
            case 1:
                {
                    method_prg16_89ab(runtime, ((((h_m_mmc_prg_bank[1]) & (31))) | (runtime.shiftRight(exPrg, 1))));
                    method_prg16_cdef(runtime, ((((last) & (31))) | (runtime.shiftRight(exPrg, 1))));
                    members.m_bank_6000 = ((((((runtime.add(((h_m_mmc_prg_bank[3]) * (2)), 1)) & (31))) | (runtime.shiftRight(exPrg, 1)))) | 0);
                    break;
                }
            case 2:
                {
                    method_prg8_89(runtime, ((h_m_mmc_prg_bank[0]) | (exPrg)));
                    method_prg8_ab(runtime, ((h_m_mmc_prg_bank[1]) | (exPrg)));
                    method_prg8_cd(runtime, ((h_m_mmc_prg_bank[2]) | (exPrg)));
                    method_prg8_ef(runtime, ((last) | (exPrg)));
                    members.m_bank_6000 = ((((h_m_mmc_prg_bank[3]) | (exPrg))) | 0);
                    break;
                }
            case 3:
                {
                    method_prg8_89(runtime, ((((method_unscramble(runtime, h_m_mmc_prg_bank[0])) & (63))) | (exPrg)));
                    method_prg8_ab(runtime, ((((method_unscramble(runtime, h_m_mmc_prg_bank[1])) & (63))) | (exPrg)));
                    method_prg8_cd(runtime, ((((method_unscramble(runtime, h_m_mmc_prg_bank[2])) & (63))) | (exPrg)));
                    if (((h_m_reg[0]) & (4))) {
                        method_prg8_ef(runtime, ((((method_unscramble(runtime, h_m_mmc_prg_bank[3])) & (63))) | (exPrg)));
                    }
                    else {
                        method_prg8_ef(runtime, ((((method_unscramble(runtime, last)) & (63))) | (exPrg)));
                    }
                    members.m_bank_6000 = ((((((method_unscramble(runtime, h_m_mmc_prg_bank[3])) & (63))) | (exPrg))) | 0);
                    break;
                }
        }
    }
    function method_prg32(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        if (((runtime.shiftRight((members.m_prg_chunks ?? 0), 1)) ? 0 : 1)) {
            return;
        }
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (4)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        h_m_prg_bank[2] = ((bank) + (2));
        h_m_prg_bank[3] = ((bank) + (3));
        method_update_prg_banks(runtime, 0, 3);
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
    function method_prg16_89ab(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[0] = ((bank) + (0));
        h_m_prg_bank[1] = ((bank) + (1));
        method_update_prg_banks(runtime, 0, 1);
    }
    function method_prg16_cdef(runtime, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        bank = ((method_prg_8k_bank_num(runtime, ((bank) * (2)))) | 0);
        h_m_prg_bank[2] = ((bank) + (0));
        h_m_prg_bank[3] = ((bank) + (1));
        method_update_prg_banks(runtime, 2, 3);
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
    function method_unscramble(runtime, bank) {
        const members = runtime.members;
        return ((((((((bank) & (127))) >>> (7)) & 1) << 7 | (((((bank) & (127))) >>> (0)) & 1) << 6 | (((((bank) & (127))) >>> (1)) & 1) << 5 | (((((bank) & (127))) >>> (2)) & 1) << 4 | (((((bank) & (127))) >>> (3)) & 1) << 3 | (((((bank) & (127))) >>> (4)) & 1) << 2 | (((((bank) & (127))) >>> (5)) & 1) << 1 | (((((bank) & (127))) >>> (6)) & 1) << 0)) & 0xff);
    }
    function method_update_chr(runtime) {
        const members = runtime.members;
        const h_m_reg = members.m_reg ?? 0;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        const h_m_chr_latch = members.m_chr_latch ?? 0;
        let chr_mirror_mode = (((((((h_m_reg[3]) >>> (7)) & 1)) << (1))) | 0);
        let chr_page = ((((((h_m_reg[3]) & (1))) | (runtime.shiftRight(((h_m_reg[3]) & (24)), 2)))) & 0xff);
        let extra_chr_base = (((((((h_m_reg[3]) >>> (5)) & 1)) ? (0) : (((chr_page) * (256))))) >>> 0);
        let extra_chr_mask = (((((((h_m_reg[3]) >>> (5)) & 1)) ? (16777215) : (255))) >>> 0);
        switch (((h_m_reg[0]) & (24))) {
            case 0:
                {
                    extra_chr_base = ((runtime.shiftRight(extra_chr_base, 3)) >>> 0);
                    extra_chr_mask = ((runtime.shiftRight(extra_chr_mask, 3)) >>> 0);
                    method_chr8(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[0]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    break;
                }
            case 8:
                {
                    extra_chr_base = ((runtime.shiftRight(extra_chr_base, 2)) >>> 0);
                    extra_chr_mask = ((runtime.shiftRight(extra_chr_mask, 2)) >>> 0);
                    method_chr4_0(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[h_m_chr_latch[0]]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr4_4(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[h_m_chr_latch[1]]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    break;
                }
            case 16:
                {
                    extra_chr_base = ((runtime.shiftRight(extra_chr_base, 1)) >>> 0);
                    extra_chr_mask = ((runtime.shiftRight(extra_chr_mask, 1)) >>> 0);
                    method_chr2_0(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[0]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr2_2(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[((2) ^ (chr_mirror_mode))]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr2_4(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[4]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr2_6(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[6]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    break;
                }
            case 24:
                {
                    method_chr1_0(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[0]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_1(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[1]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_2(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[((2) ^ (chr_mirror_mode))]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_3(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[((3) ^ (chr_mirror_mode))]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_4(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[4]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_5(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[5]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_6(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[6]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    method_chr1_7(runtime, ((extra_chr_base) | (((h_m_mmc_vrom_bank[7]) & (extra_chr_mask)))), (members.m_chr_source ?? 0));
                    break;
                }
        }
    }
    function method_chr8(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 3, 0, bank, source);
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
    function method_chr4_0(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 2, 0, bank, source);
    }
    function method_chr4_4(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 2, 4, bank, source);
    }
    function method_chr2_0(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 1, 0, bank, source);
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
    function method_chr1_0(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 0, bank, source);
    }
    function method_chr1_1(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 1, bank, source);
    }
    function method_chr1_2(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 2, bank, source);
    }
    function method_chr1_3(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 3, bank, source);
    }
    function method_chr1_4(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 4, bank, source);
    }
    function method_chr1_5(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 5, bank, source);
    }
    function method_chr1_6(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 6, bank, source);
    }
    function method_chr1_7(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 0, 7, bank, source);
    }
    function method_update_mirror(runtime) {
        const members = runtime.members;
        method_update_mirror_typea(runtime);
    }
    function method_update_mirror_typea(runtime) {
        const members = runtime.members;
        const h_m_reg = members.m_reg ?? 0;
        switch (((h_m_reg[1]) & (3))) {
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
    function method_update_banks(runtime, reg) {
        const members = runtime.members;
        switch (((reg) & (3))) {
            case 0:
                {
                    method_update_prg(runtime);
                    method_update_chr(runtime);
                    method_update_mirror(runtime);
                    break;
                }
            case 1:
                {
                    method_update_mirror(runtime);
                    break;
                }
            case 2:
                {
                    method_update_mirror(runtime);
                    break;
                }
            case 3:
                {
                    method_update_prg(runtime);
                    method_update_chr(runtime);
                    break;
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
    function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_nes_cart_interface__nt_r(runtime, offset) {
        const members = runtime.members;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
    }
    function method_device_nes_cart_interface__read_l(runtime, offset) {
        const members = runtime.members;
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_device_nes_cart_interface__write_l(runtime, offset, data) {
        const members = runtime.members;
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
    function method_device_nes_cart_interface__write_h(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        method_irq_clock(runtime, 0, 0);
    }
    return {
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "write_ex": method_write_ex,
        "ppu_latch": method_ppu_latch,
        "hblank_irq": method_hblank_irq,
        "scanline_irq": method_scanline_irq,
        "irq_clock": method_irq_clock,
        "set_irq_line": method_set_irq_line,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "get_open_bus": method_get_open_bus,
        "read_m": method_read_m,
        "write_l": method_write_l,
        "write_m": method_write_m,
        "write_h": method_write_h,
        "update_prg": method_update_prg,
        "prg32": method_prg32,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "prg16_89ab": method_prg16_89ab,
        "prg16_cdef": method_prg16_cdef,
        "prg8_89": method_prg8_89,
        "prg8_x": method_prg8_x,
        "prg8_ab": method_prg8_ab,
        "prg8_cd": method_prg8_cd,
        "prg8_ef": method_prg8_ef,
        "unscramble": method_unscramble,
        "update_chr": method_update_chr,
        "chr8": method_chr8,
        "bank_chr": method_bank_chr,
        "chr4_0": method_chr4_0,
        "chr4_4": method_chr4_4,
        "chr2_0": method_chr2_0,
        "chr2_2": method_chr2_2,
        "chr2_4": method_chr2_4,
        "chr2_6": method_chr2_6,
        "chr1_0": method_chr1_0,
        "chr1_1": method_chr1_1,
        "chr1_2": method_chr1_2,
        "chr1_3": method_chr1_3,
        "chr1_4": method_chr1_4,
        "chr1_5": method_chr1_5,
        "chr1_6": method_chr1_6,
        "chr1_7": method_chr1_7,
        "update_mirror": method_update_mirror,
        "update_mirror_typea": method_update_mirror_typea,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
        "update_banks": method_update_banks,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "device_nes_cart_interface::nt_r": method_device_nes_cart_interface__nt_r,
        "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
        "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
        "irq_timer_tick": method_irq_timer_tick
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_maincpu.set_input_line"];
export const device = definition;
export default device;
