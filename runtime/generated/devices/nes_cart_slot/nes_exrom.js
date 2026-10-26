import deviceData from './nes_exrom.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    const __mame_table_0 = [0, 85, 170, 255];
    function method_read_h(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_ram_hi_banks = members.m_ram_hi_banks ?? 0;
        0;
        let bank = ((runtime.divide(offset, 8192)) | 0);
        let ret = ((0) & 0xff);
        if ((((((((((((Number(bank) < Number(3)) ? 1 : 0)) && (((Number(offset) >= Number(((bank) * (8192)))) ? 1 : 0))) ? 1 : 0)) && (((Number(offset) < Number(((((bank) + (1))) * (8192)))) ? 1 : 0))) ? 1 : 0)) && (h_m_prg_ram_mapped[bank])) ? 1 : 0)) {
            if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(h_m_ram_hi_banks[bank]) < Number(4)) ? 1 : 0))) ? 1 : 0)) {
                ret = ((runtime.readIndex((members.m_battery ?? 0), ((runtime.add(((h_m_ram_hi_banks[bank]) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
            }
            else {
                if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    ret = ((runtime.readIndex((members.m_prgram ?? 0), ((runtime.add(((((h_m_ram_hi_banks[bank]) & (3))) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
                }
            }
        }
        else {
            ret = ((method_hi_access_rom(runtime, offset)) & 0xff);
        }
        if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if (((((~offset)) >>> (14)) & 1)) {
                (__l["m_sound.pcm_w"] ? __l["m_sound.pcm_w"](ret) : ((members.m_sound)?.pcm_w?.(ret) ?? 0));
            }
        }
        return ((ret) & 0xff);
    }
    function method_hi_access_rom(runtime, offset) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        let bank = (((((offset) >>> (13)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex((members.m_prg ?? 0), runtime.add(((h_m_prg_bank[bank]) * (8192)), ((offset) & (8191))))) & 0xff);
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
        members.m_vcount = ((scanline) | 0);
        if (((Number(scanline) === Number((members.m_irq_count ?? 0))) ? 1 : 0)) {
            members.m_irq_status = ((255) & 0xff);
            method_update_irq(runtime);
        }
        if (((Number(scanline) === Number(0)) ? 1 : 0)) {
            members.m_irq_status = ((((members.m_irq_status) | (64))) & 0xff);
        }
        else {
            if (((Number(scanline) > Number(239)) ? 1 : 0)) {
                members.m_irq_status = ((((members.m_irq_status) & (-65))) & 0xff);
            }
        }
    }
    function method_update_irq(runtime) {
        const members = runtime.members;
        method_set_irq_line(runtime, ((((((((((((members.m_irq_status ?? 0)) >>> (7)) & 1)) && ((members.m_irq_enable ?? 0))) ? 1 : 0)) || ((members.m_pcm_irq ?? 0))) ? 1 : 0)) ? (1) : (0)));
    }
    function method_set_irq_line(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
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
        const __l = runtime.links ?? runtime.calls;
        let bank = ((((offset) >>> (10))) | 0);
        if (((((((((Number((members.m_exram_control ?? 0)) === Number(1)) ? 1 : 0)) && (((Number((__l["m_ppu.get_draw_phase"] ? __l["m_ppu.get_draw_phase"]() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) && ((members.m_ex1_chr ?? 0))) ? 1 : 0)) {
            return ((method_bg_ex1_chr_r(runtime, ((offset) & (4095)))) & 0xff);
        }
        if ((((((((((((((members.m_split_scr ?? 0)) && ((((((members.m_exram_control ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) && (method_in_split(runtime))) ? 1 : 0)) && (((Number((__l["m_ppu.get_draw_phase"] ? __l["m_ppu.get_draw_phase"]() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(0)) ? 1 : 0))) ? 1 : 0)) && ((members.m_split_chr ?? 0))) ? 1 : 0)) {
            return ((method_split_chr_r(runtime, ((offset) & (4095)))) & 0xff);
        }
        if ((__l["m_ppu.is_sprite_8x16"] ? __l["m_ppu.is_sprite_8x16"]() : ((members.m_ppu)?.is_sprite_8x16?.() ?? 0))) {
            if (((Number((__l["m_ppu.get_draw_phase"] ? __l["m_ppu.get_draw_phase"]() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(1)) ? 1 : 0)) {
                return ((method_base_chr_r(runtime, ((bank) & (7)), ((offset) & (8191)))) & 0xff);
            }
            if (((Number((__l["m_ppu.get_draw_phase"] ? __l["m_ppu.get_draw_phase"]() : ((members.m_ppu)?.get_draw_phase?.() ?? 0))) === Number(0)) ? 1 : 0)) {
                return ((method_base_chr_r(runtime, runtime.add(((bank) & (3)), 8), ((offset) & (8191)))) & 0xff);
            }
        }
        if (((Number((members.m_last_chr ?? 0)) === Number(0)) ? 1 : 0)) {
            return ((method_base_chr_r(runtime, ((bank) & (7)), ((offset) & (8191)))) & 0xff);
        }
        else {
            return ((method_base_chr_r(runtime, runtime.add(((bank) & (3)), 8), ((offset) & (8191)))) & 0xff);
        }
    }
    function method_bg_ex1_chr_r(runtime, offset) {
        const members = runtime.members;
        let helper = ((runtime.add((((members.m_ex1_bank ?? 0)) * (4096)), ((offset) & (4095)))) >>> 0);
        return ((runtime.readIndex((members.m_vrom ?? 0), ((helper) & ((((members.m_vrom_size ?? 0)) - (1)))))) & 0xff);
    }
    function method_in_split(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let tile = (((__l["m_ppu.get_tilenum"] ? __l["m_ppu.get_tilenum"]() : ((members.m_ppu)?.get_tilenum?.() ?? 0))) | 0);
        if (((Number(tile) < Number(34)) ? 1 : 0)) {
            if (((((((members.m_split_rev ?? 0)) ? 0 : 1)) && (((Number(tile) < Number((members.m_split_ctrl ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                return 1;
            }
            if (((((members.m_split_rev ?? 0)) && (((Number(tile) >= Number((members.m_split_ctrl ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                return 1;
            }
        }
        return 0;
    }
    function method_split_chr_r(runtime, offset) {
        const members = runtime.members;
        let helper = ((runtime.add(runtime.add((((members.m_split_bank ?? 0)) * (4096)), ((offset) & (1016))), (((members.m_split_yst ?? 0)) & (7)))) >>> 0);
        return ((runtime.readIndex((members.m_vrom ?? 0), ((helper) & ((((members.m_vrom_size ?? 0)) - (1)))))) & 0xff);
    }
    function method_base_chr_r(runtime, bank, offset) {
        const members = runtime.members;
        const h_m_vrom_bank = members.m_vrom_bank ?? 0;
        let helper = ((0) >>> 0);
        switch ((members.m_chr_mode ?? 0)) {
            case 0:
                {
                    if (((Number(bank) < Number(8)) ? 1 : 0)) {
                        helper = ((runtime.add(((((h_m_vrom_bank[((bank) | (7))]) & (255))) * (8192)), ((offset) & (8191)))) >>> 0);
                    }
                    else {
                        helper = ((runtime.add(((((h_m_vrom_bank[((bank) | (3))]) & (255))) * (8192)), ((offset) & (8191)))) >>> 0);
                    }
                    break;
                }
            case 1:
                {
                    helper = ((runtime.add(((((h_m_vrom_bank[((bank) | (3))]) & (255))) * (4096)), ((offset) & (4095)))) >>> 0);
                    break;
                }
            case 2:
                {
                    helper = ((runtime.add(((h_m_vrom_bank[((bank) | (1))]) * (2048)), ((offset) & (2047)))) >>> 0);
                    break;
                }
            case 3:
                {
                    helper = ((runtime.add(((h_m_vrom_bank[bank]) * (1024)), ((offset) & (1023)))) >>> 0);
                    break;
                }
        }
        return ((runtime.readIndex((members.m_vrom ?? 0), ((helper) & ((((members.m_vrom_size ?? 0)) - (1)))))) & 0xff);
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
        const h_m_nt_src = members.m_nt_src ?? 0;
        const h_m_exram = members.m_exram ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = ((runtime.shiftRight(((offset) & (3072)), 10)) | 0);
        if (((h_m_nt_writable[page]) ? 0 : 1)) {
            return;
        }
        switch (h_m_nt_src[page]) {
            case 2:
                {
                    h_m_exram[((offset) & (1023))] = data;
                    break;
                }
            default:
                {
                    runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
                    break;
                }
        }
    }
    function method_nt_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_nt_src = members.m_nt_src ?? 0;
        const h_m_exram = members.m_exram ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = ((runtime.shiftRight(((offset) & (3072)), 10)) | 0);
        switch (h_m_nt_src[page]) {
            case 3:
                {
                    if (((Number(((offset) & (1023))) >= Number(960)) ? 1 : 0)) {
                        return (((members.m_floodattr ?? 0)) & 0xff);
                    }
                    return (((members.m_floodtile ?? 0)) & 0xff);
                }
            case 2:
                {
                    if (((((((members.m_exram_control ?? 0)) >>> (1)) & 1)) ? 0 : 1)) {
                        return ((h_m_exram[((offset) & (1023))]) & 0xff);
                    }
                    else {
                        return ((0) & 0xff);
                    }
                }
            default:
                {
                    if ((((((((members.m_split_scr ?? 0)) && ((((((members.m_exram_control ?? 0)) & (2))) ? 0 : 1))) ? 1 : 0)) && (method_in_split(runtime))) ? 1 : 0)) {
                        let tile = (((__l["m_ppu.get_tilenum"] ? __l["m_ppu.get_tilenum"]() : ((members.m_ppu)?.get_tilenum?.() ?? 0))) | 0);
                        if (((Number(((offset) & (1023))) >= Number(960)) ? 1 : 0)) {
                            let pos = ((runtime.shiftRight((((((((members.m_split_yst ?? 0)) + ((members.m_vcount ?? 0)))) & (-32))) | (((tile) & (31)))), 2)) | 0);
                            return ((h_m_exram[((960) | (pos))]) & 0xff);
                        }
                        else {
                            let pos = (((((((((((members.m_split_yst ?? 0)) + ((members.m_vcount ?? 0)))) & (248))) << (2))) | (((tile) & (31))))) | 0);
                            return ((h_m_exram[pos]) & 0xff);
                        }
                    }
                    if (((Number((members.m_exram_control ?? 0)) === Number(1)) ? 1 : 0)) {
                        if (((Number(((offset) & (1023))) >= Number(960)) ? 1 : 0)) {
                            return (((members.m_ex1_attrib ?? 0)) & 0xff);
                        }
                        else {
                            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                members.m_ex1_chr = ((1) & 0xff);
                                members.m_ex1_bank = ((((((h_m_exram[((offset) & (1023))]) & (63))) | ((((members.m_high_chr ?? 0)) << (6))))) & 0xff);
                                members.m_ex1_attrib = (((__mame_table_0[(((((((h_m_exram[((offset) & (1023))]) >>> (6))) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                            }
                        }
                    }
                    return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
                }
        }
    }
    function method_read_l(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_exram = members.m_exram ?? 0;
        let value = ((0) | 0);
        0;
        offset = ((offset) + (256));
        if ((((((Number(offset) >= Number(4096)) ? 1 : 0)) && (((Number(offset) <= Number(4117)) ? 1 : 0))) ? 1 : 0)) {
            return (((__l["m_sound.read"] ? __l["m_sound.read"](((offset) & (31))) : ((members.m_sound)?.read?.(((offset) & (31))) ?? 0))) & 0xff);
        }
        if ((((((Number(offset) >= Number(7168)) ? 1 : 0)) && (((Number(offset) <= Number(8191)) ? 1 : 0))) ? 1 : 0)) {
            if (((((members.m_exram_control ?? 0)) >>> (1)) & 1)) {
                return ((h_m_exram[((offset) - (7168))]) & 0xff);
            }
            else {
                return ((method_get_open_bus(runtime)) & 0xff);
            }
        }
        switch (offset) {
            case 4612:
                {
                    value = (((members.m_irq_status ?? 0)) | 0);
                    if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_irq_status = ((((members.m_irq_status) & (-129))) & 0xff);
                        method_update_irq(runtime);
                    }
                    return ((value) & 0xff);
                }
            case 4613:
                {
                    return (((((((members.m_mult1 ?? 0)) * ((members.m_mult2 ?? 0)))) & (255))) & 0xff);
                }
            case 4614:
                {
                    return ((runtime.shiftRight((((((members.m_mult1 ?? 0)) * ((members.m_mult2 ?? 0)))) & (65280)), 8)) & 0xff);
                }
            default:
                {
                    if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        0;
                    }
                    return ((method_get_open_bus(runtime)) & 0xff);
                }
        }
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        0;
        if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1))) ? 1 : 0)) {
            if (((((members.m_wram_base ?? 0)) >>> (2)) & 1)) {
                return ((runtime.readIndex((members.m_prgram ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
            }
            else {
                return ((runtime.readIndex((members.m_battery ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
            }
        }
        else {
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                return ((runtime.readIndex((members.m_prgram ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
            }
            else {
                if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    return ((runtime.readIndex((members.m_battery ?? 0), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
                }
                else {
                    return ((method_get_open_bus(runtime)) & 0xff);
                }
            }
        }
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_exram = members.m_exram ?? 0;
        const h_m_prg_regs = members.m_prg_regs ?? 0;
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_vrom_bank = members.m_vrom_bank ?? 0;
        0;
        offset = ((offset) + (256));
        if ((((((Number(offset) >= Number(4096)) ? 1 : 0)) && (((Number(offset) <= Number(4117)) ? 1 : 0))) ? 1 : 0)) {
            (__l["m_sound.write"] ? __l["m_sound.write"](((offset) & (31)), data) : ((members.m_sound)?.write?.(((offset) & (31)), data) ?? 0));
            return;
        }
        if ((((((Number(offset) >= Number(7168)) ? 1 : 0)) && (((Number(offset) <= Number(8191)) ? 1 : 0))) ? 1 : 0)) {
            if (((Number((members.m_exram_control ?? 0)) === Number(2)) ? 1 : 0)) {
                h_m_exram[((offset) - (7168))] = data;
            }
            else {
                if (((Number((members.m_exram_control ?? 0)) !== Number(3)) ? 1 : 0)) {
                    if (((((members.m_irq_status ?? 0)) >>> (6)) & 1)) {
                        h_m_exram[((offset) - (7168))] = data;
                    }
                    else {
                        h_m_exram[((offset) - (7168))] = 0;
                    }
                }
            }
            return;
        }
        switch (offset) {
            case 4352:
                {
                    members.m_prg_mode = ((((data) & (3))) & 0xff);
                    method_update_prg(runtime);
                    0;
                    break;
                }
            case 4353:
                {
                    members.m_chr_mode = ((((data) & (3))) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    0;
                    break;
                }
            case 4354:
                {
                    members.m_wram_protect_1 = ((((data) & (3))) & 0xff);
                    0;
                    break;
                }
            case 4355:
                {
                    members.m_wram_protect_2 = ((((data) & (3))) & 0xff);
                    0;
                    break;
                }
            case 4356:
                {
                    members.m_exram_control = ((((data) & (3))) & 0xff);
                    0;
                    break;
                }
            case 4357:
                {
                    method_set_mirror(runtime, 0, runtime.shiftRight(((data) & (3)), 0));
                    method_set_mirror(runtime, 1, runtime.shiftRight(((data) & (12)), 2));
                    method_set_mirror(runtime, 2, runtime.shiftRight(((data) & (48)), 4));
                    method_set_mirror(runtime, 3, runtime.shiftRight(((data) & (192)), 6));
                    break;
                }
            case 4358:
                {
                    members.m_floodtile = ((data) & 0xff);
                    break;
                }
            case 4359:
                {
                    members.m_floodattr = (((__mame_table_0[(((((data) & (3))) % 4) + 4) % 4] ?? 0)) & 0xff);
                    break;
                }
            case 4371:
                {
                    0;
                    members.m_wram_base = ((((data) & (7))) & 0xff);
                    break;
                }
            case 4372:
            case 4373:
            case 4374:
            case 4375:
                {
                    h_m_prg_regs[((offset) & (3))] = ((data) & (127));
                    h_m_prg_ram_mapped[((offset) & (3))] = (((((data) >>> (7)) & 1)) ? 0 : 1);
                    method_update_prg(runtime);
                    break;
                }
            case 4384:
            case 4385:
            case 4386:
            case 4387:
            case 4388:
            case 4389:
            case 4390:
            case 4391:
                {
                    h_m_vrom_bank[((offset) & (7))] = ((data) | ((((members.m_high_chr ?? 0)) << (8))));
                    members.m_last_chr = ((0) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    break;
                }
            case 4392:
            case 4393:
            case 4394:
            case 4395:
                {
                    h_m_vrom_bank[((offset) & (15))] = ((data) | ((((members.m_high_chr ?? 0)) << (8))));
                    members.m_last_chr = ((1) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    break;
                }
            case 4400:
                {
                    members.m_high_chr = ((((data) & (3))) & 0xff);
                    members.m_ex1_chr = ((0) & 0xff);
                    members.m_split_chr = ((0) & 0xff);
                    break;
                }
            case 4608:
                {
                    members.m_split_scr = (((((data) >>> (7)) & 1)) & 0xff);
                    members.m_split_rev = (((((data) >>> (6)) & 1)) & 0xff);
                    members.m_split_ctrl = ((((data) & (31))) & 0xff);
                    break;
                }
            case 4609:
                {
                    members.m_split_yst = ((((((Number(data) >= Number(240)) ? 1 : 0)) ? (((data) - (16))) : (data))) & 0xff);
                    break;
                }
            case 4610:
                {
                    members.m_split_bank = ((data) & 0xff);
                    members.m_split_chr = ((1) & 0xff);
                    break;
                }
            case 4611:
                {
                    members.m_irq_count = ((data) & 0xffff);
                    0;
                    break;
                }
            case 4612:
                {
                    members.m_irq_enable = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    0;
                    break;
                }
            case 4613:
                {
                    members.m_mult1 = ((data) | 0);
                    break;
                }
            case 4614:
                {
                    members.m_mult2 = ((data) | 0);
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_update_prg(runtime) {
        const members = runtime.members;
        const h_m_prg_regs = members.m_prg_regs ?? 0;
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_ram_hi_banks = members.m_ram_hi_banks ?? 0;
        let bank0 = ((0) | 0);
        let bank1 = ((0) | 0);
        let bank2 = ((0) | 0);
        let bank3 = ((0) | 0);
        switch ((members.m_prg_mode ?? 0)) {
            case 0:
                {
                    bank3 = ((((h_m_prg_regs[3]) >>> (2))) | 0);
                    method_prg32(runtime, bank3);
                    break;
                }
            case 1:
                {
                    bank1 = ((((h_m_prg_regs[1]) >>> (1))) | 0);
                    bank3 = ((((h_m_prg_regs[3]) >>> (1))) | 0);
                    if (h_m_prg_ram_mapped[1]) {
                        h_m_ram_hi_banks[0] = ((((bank1) << (1))) & (7));
                        h_m_ram_hi_banks[1] = ((((((bank1) << (1))) & (7))) | (1));
                    }
                    else {
                        method_prg16_89ab(runtime, bank1);
                    }
                    method_prg16_cdef(runtime, bank3);
                    break;
                }
            case 2:
                {
                    bank1 = ((((h_m_prg_regs[1]) >>> (1))) | 0);
                    bank2 = ((h_m_prg_regs[2]) | 0);
                    bank3 = ((h_m_prg_regs[3]) | 0);
                    if (h_m_prg_ram_mapped[1]) {
                        h_m_ram_hi_banks[0] = ((((bank1) << (1))) & (7));
                        h_m_ram_hi_banks[1] = ((((((bank1) << (1))) & (7))) | (1));
                    }
                    else {
                        method_prg16_89ab(runtime, bank1);
                    }
                    if (h_m_prg_ram_mapped[2]) {
                        h_m_ram_hi_banks[2] = ((bank2) & (7));
                    }
                    else {
                        method_prg8_cd(runtime, bank2);
                    }
                    method_prg8_ef(runtime, bank3);
                    break;
                }
            case 3:
                {
                    bank0 = ((h_m_prg_regs[0]) | 0);
                    bank1 = ((h_m_prg_regs[1]) | 0);
                    bank2 = ((h_m_prg_regs[2]) | 0);
                    bank3 = ((h_m_prg_regs[3]) | 0);
                    if (h_m_prg_ram_mapped[0]) {
                        h_m_ram_hi_banks[0] = ((bank0) & (7));
                    }
                    else {
                        method_prg8_89(runtime, bank0);
                    }
                    if (h_m_prg_ram_mapped[1]) {
                        h_m_ram_hi_banks[1] = ((bank1) & (7));
                    }
                    else {
                        method_prg8_ab(runtime, bank1);
                    }
                    if (h_m_prg_ram_mapped[2]) {
                        h_m_ram_hi_banks[2] = ((bank2) & (7));
                    }
                    else {
                        method_prg8_cd(runtime, bank2);
                    }
                    method_prg8_ef(runtime, bank3);
                    break;
                }
        }
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
    function method_prg8_cd(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 2, bank);
    }
    function method_prg8_x(runtime, start, bank) {
        const members = runtime.members;
        const h_m_prg_bank = members.m_prg_bank ?? 0;
        0;
        bank = ((method_prg_8k_bank_num(runtime, bank)) | 0);
        h_m_prg_bank[start] = bank;
        method_update_prg_banks(runtime, start, start);
    }
    function method_prg8_ef(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 3, bank);
    }
    function method_prg8_89(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 0, bank);
    }
    function method_prg8_ab(runtime, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, 1, bank);
    }
    function method_set_mirror(runtime, page, src) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        switch (src) {
            case 0:
                {
                    method_set_nt_page(runtime, page, 0, 0, 1);
                    break;
                }
            case 1:
                {
                    method_set_nt_page(runtime, page, 0, 1, 1);
                    break;
                }
            case 2:
                {
                    method_set_nt_page(runtime, page, 2, 0, 1);
                    break;
                }
            case 3:
                {
                    method_set_nt_page(runtime, page, 3, 0, 0);
                    break;
                }
            default:
                {
                    (__l["fatalerror"] ? __l["fatalerror"]("This should never happen\n") : runtime.macro("fatalerror", "This should never happen\n"));
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
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        0;
        if ((((((Number((members.m_wram_protect_1 ?? 0)) !== Number(2)) ? 1 : 0)) || (((Number((members.m_wram_protect_2 ?? 0)) !== Number(1)) ? 1 : 0))) ? 1 : 0)) {
            return;
        }
        if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number((members.m_wram_base ?? 0)) < Number(4)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((((offset) + ((((members.m_wram_base ?? 0)) * (8192))))) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        else {
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                runtime.writeIndex(runtime.writableMember("m_prgram"), ((((offset) + ((((((members.m_wram_base ?? 0)) & (3))) * (8192))))) & (runtime.subtract((members.m_prgram).length, 1))), data);
            }
        }
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        const h_m_prg_ram_mapped = members.m_prg_ram_mapped ?? 0;
        const h_m_ram_hi_banks = members.m_ram_hi_banks ?? 0;
        0;
        let bank = ((runtime.divide(offset, 8192)) | 0);
        if ((((((((((((Number((members.m_wram_protect_1 ?? 0)) !== Number(2)) ? 1 : 0)) || (((Number((members.m_wram_protect_2 ?? 0)) !== Number(1)) ? 1 : 0))) ? 1 : 0)) || (((Number(bank) === Number(3)) ? 1 : 0))) ? 1 : 0)) || (((h_m_prg_ram_mapped[bank]) ? 0 : 1))) ? 1 : 0)) {
            return;
        }
        if ((((((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) && (((Number(h_m_ram_hi_banks[bank]) < Number(4)) ? 1 : 0))) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((runtime.add(((h_m_ram_hi_banks[bank]) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        else {
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                runtime.writeIndex(runtime.writableMember("m_prgram"), ((runtime.add(((((h_m_ram_hi_banks[bank]) & (3))) * (8192)), ((offset) & (8191)))) & (runtime.subtract((members.m_prgram).length, 1))), data);
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
    function method_pcm_irq(runtime, state) {
        const members = runtime.members;
        members.m_pcm_irq = ((state) ? 1 : 0);
        method_update_irq(runtime);
    }
    function method_device_nes_cart_interface__nt_r(runtime, offset) {
        const members = runtime.members;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        return ((runtime.readIndex(h_m_nt_access[page], ((offset) & (1023)))) & 0xff);
    }
    function method_device_nes_cart_interface__nt_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_nt_writable = members.m_nt_writable ?? 0;
        const h_m_nt_access = members.m_nt_access ?? 0;
        let page = (((((offset) >>> (10)) & ((1 << (2)) - 1))) | 0);
        if (h_m_nt_writable[page]) {
            runtime.writeIndex(h_m_nt_access[page], ((offset) & (1023)), data);
        }
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
    function method_device_nes_cart_interface__write_m(runtime, offset, data) {
        const members = runtime.members;
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
        }
    }
    function method_device_nes_cart_interface__write_h(runtime, offset, data) {
        const members = runtime.members;
    }
    return {
        "read_h": method_read_h,
        "hi_access_rom": method_hi_access_rom,
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
        "update_irq": method_update_irq,
        "set_irq_line": method_set_irq_line,
        "scanline_irq": method_scanline_irq,
        "prgram_alloc": method_prgram_alloc,
        "battery_alloc": method_battery_alloc,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "bg_ex1_chr_r": method_bg_ex1_chr_r,
        "in_split": method_in_split,
        "split_chr_r": method_split_chr_r,
        "base_chr_r": method_base_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "write_l": method_write_l,
        "update_prg": method_update_prg,
        "prg32": method_prg32,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "prg16_89ab": method_prg16_89ab,
        "prg16_cdef": method_prg16_cdef,
        "prg8_cd": method_prg8_cd,
        "prg8_x": method_prg8_x,
        "prg8_ef": method_prg8_ef,
        "prg8_89": method_prg8_89,
        "prg8_ab": method_prg8_ab,
        "set_mirror": method_set_mirror,
        "set_nt_page": method_set_nt_page,
        "write_m": method_write_m,
        "write_h": method_write_h,
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
        "pcm_irq": method_pcm_irq,
        "device_nes_cart_interface::nt_r": method_device_nes_cart_interface__nt_r,
        "device_nes_cart_interface::nt_w": method_device_nes_cart_interface__nt_w,
        "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l,
        "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_maincpu.set_input_line", "m_ppu.get_draw_phase", "m_ppu.get_tilenum", "m_ppu.is_sprite_8x16", "m_sound.pcm_w", "m_sound.read", "m_sound.write", "machine", "machine().side_effects_disabled"];
definition.children[0].definition.compiledMethods = (() => {
    const __mame_table_0 = [10, 254, 20, 2, 40, 4, 80, 6, 160, 8, 60, 10, 14, 12, 26, 14, 12, 16, 24, 18, 48, 20, 96, 22, 192, 24, 72, 26, 16, 28, 32, 30];
    const __mame_table_1 = [64, 96, 120, 159];
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_square_lut = members.m_square_lut ?? 0;
        const h_m_core = members.m_core ?? 0;
        members.m_frame_clocks = ((29830) & 0xffff);
        method_calculate_rates(runtime);
        for (let i = ((0) | 0); ((Number(i) < Number(31)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let pulse_out = ((((Number(i) === Number(0)) ? 1 : 0)) ? (0) : (((95.88) / (runtime.add(((8128) / (i)), 100)))));
            h_m_square_lut[i] = pulse_out;
        }
        for (let i = ((0) | 0); ((Number(i) < Number(2)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].regs) : runtime.macro("NAME", h_m_core.squ[i].regs)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].regs) : runtime.macro("NAME", h_m_core.squ[i].regs)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].vbl_length) : runtime.macro("NAME", h_m_core.squ[i].vbl_length)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].vbl_length) : runtime.macro("NAME", h_m_core.squ[i].vbl_length)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].freq) : runtime.macro("NAME", h_m_core.squ[i].freq)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].freq) : runtime.macro("NAME", h_m_core.squ[i].freq)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].phaseacc) : runtime.macro("NAME", h_m_core.squ[i].phaseacc)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].phaseacc) : runtime.macro("NAME", h_m_core.squ[i].phaseacc)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].env_phase) : runtime.macro("NAME", h_m_core.squ[i].env_phase)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].env_phase) : runtime.macro("NAME", h_m_core.squ[i].env_phase)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].adder) : runtime.macro("NAME", h_m_core.squ[i].adder)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].adder) : runtime.macro("NAME", h_m_core.squ[i].adder)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].env_vol) : runtime.macro("NAME", h_m_core.squ[i].env_vol)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].env_vol) : runtime.macro("NAME", h_m_core.squ[i].env_vol)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].enabled) : runtime.macro("NAME", h_m_core.squ[i].enabled)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].enabled) : runtime.macro("NAME", h_m_core.squ[i].enabled)), i));
            (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.squ[i].output) : runtime.macro("NAME", h_m_core.squ[i].output)), i) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.squ[i].output) : runtime.macro("NAME", h_m_core.squ[i].output)), i));
        }
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.pcm.regs) : runtime.macro("NAME", h_m_core.pcm.regs))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.pcm.regs) : runtime.macro("NAME", h_m_core.pcm.regs))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.pcm.irq_enabled) : runtime.macro("NAME", h_m_core.pcm.irq_enabled))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.pcm.irq_enabled) : runtime.macro("NAME", h_m_core.pcm.irq_enabled))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.pcm.irq_line) : runtime.macro("NAME", h_m_core.pcm.irq_line))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.pcm.irq_line) : runtime.macro("NAME", h_m_core.pcm.irq_line))));
        (__l["save_item"] ? __l["save_item"]((__l["NAME"] ? __l["NAME"](h_m_core.pcm.output) : runtime.macro("NAME", h_m_core.pcm.output))) : runtime.macro("save_item", (__l["NAME"] ? __l["NAME"](h_m_core.pcm.output) : runtime.macro("NAME", h_m_core.pcm.output))));
    }
    function method_calculate_rates(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_vbl_times = members.m_vbl_times ?? 0;
        const h_m_sync_times1 = members.m_sync_times1 ?? 0;
        members.m_samps_per_sync = ((runtime.divide((members.m_frame_clocks ?? 0), 4)) >>> 0);
        for (let i = ((0) | 0); ((Number(i) < Number(32)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            h_m_vbl_times[i] = runtime.divide((((__mame_table_0[((i) & 31)] ?? 0)) * ((members.m_samps_per_sync ?? 0))), 4);
            h_m_sync_times1[i] = (((members.m_samps_per_sync ?? 0)) * (((i) + (1))));
        }
        let rate = ((runtime.divide((__l["clock"] ? __l["clock"]() : runtime.macro("clock")), 4)) | 0);
        if ((((members.m_stream ?? 0)) ? 1 : 0)) {
            ((runtime.dereference(members.m_stream)).set_sample_rate?.(rate) ?? 0);
        }
        else {
            members.m_stream = (__l["stream_alloc"] ? __l["stream_alloc"](0, 1, rate) : runtime.macro("stream_alloc", 0, 1, rate));
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_core = members.m_core ?? 0;
        const h_m_vbl_times = members.m_vbl_times ?? 0;
        (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
        let chan = (((((offset) >>> (2)) & 1)) | 0);
        switch (offset) {
            case 0:
            case 4:
                {
                    h_m_core.squ[chan].regs[0] = data;
                    break;
                }
            case 2:
            case 6:
                {
                    h_m_core.squ[chan].regs[2] = data;
                    if (h_m_core.squ[chan].enabled) {
                        h_m_core.squ[chan].freq = ((((runtime.add(((((((h_m_core.squ[chan].regs[3]) & (7))) << (8))) + (data)), 1)) << (16))) | 0);
                    }
                    break;
                }
            case 3:
            case 7:
                {
                    h_m_core.squ[chan].regs[3] = data;
                    if (h_m_core.squ[chan].enabled) {
                        h_m_core.squ[chan].vbl_length = ((h_m_vbl_times[((data) >>> (3))]) | 0);
                        h_m_core.squ[chan].env_vol = ((0) & 0xff);
                        h_m_core.squ[chan].freq = ((((runtime.add(((((((data) & (7))) << (8))) + (h_m_core.squ[chan].regs[2])), 1)) << (16))) | 0);
                    }
                    break;
                }
            case 16:
                {
                    h_m_core.pcm.regs[0] = data;
                    h_m_core.pcm.irq_enabled = (((((data) >>> (7)) & 1)) & 0xff);
                    (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled)))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) : runtime.invoke("m_irq_handler", ((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))));
                    break;
                }
            case 17:
                {
                    h_m_core.pcm.regs[1] = data;
                    if (((((~h_m_core.pcm.regs[0])) >>> (0)) & 1)) {
                        if (((Number(data) === Number(0)) ? 1 : 0)) {
                            h_m_core.pcm.irq_line = ((1) & 0xff);
                            (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled)))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) : runtime.invoke("m_irq_handler", ((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))));
                        }
                        else {
                            h_m_core.pcm.output = ((data) & 0xff);
                        }
                    }
                    break;
                }
            case 21:
                {
                    if ((((data) >>> (0)) & 1)) {
                        h_m_core.squ[0].enabled = ((1) & 0xff);
                    }
                    else {
                        h_m_core.squ[0].enabled = ((0) & 0xff);
                        h_m_core.squ[0].vbl_length = ((0) | 0);
                    }
                    if ((((data) >>> (1)) & 1)) {
                        h_m_core.squ[1].enabled = ((1) & 0xff);
                    }
                    else {
                        h_m_core.squ[1].enabled = ((0) & 0xff);
                        h_m_core.squ[1].vbl_length = ((0) | 0);
                    }
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
        const __l = runtime.links ?? runtime.calls;
        const h_m_core = members.m_core ?? 0;
        (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
        let readval = ((0) & 0xff);
        switch (offset) {
            case 16:
                {
                    readval = ((((readval) | (((((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) ? (128) : (0))))) & 0xff);
                    if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        h_m_core.pcm.irq_line = ((0) & 0xff);
                        (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled)))) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))) : runtime.invoke("m_irq_handler", ((h_m_core.pcm.irq_line) & (h_m_core.pcm.irq_enabled))));
                    }
                    break;
                }
            case 21:
                {
                    if (((Number(h_m_core.squ[0].vbl_length) > Number(0)) ? 1 : 0)) {
                        readval = ((((readval) | (1))) & 0xff);
                    }
                    if (((Number(h_m_core.squ[1].vbl_length) > Number(0)) ? 1 : 0)) {
                        readval = ((((readval) | (2))) & 0xff);
                    }
                    break;
                }
            default:
                {
                    if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        0;
                    }
                    break;
                }
        }
        return ((readval) & 0xff);
    }
    function method_pcm_w(runtime, data) {
        const members = runtime.members;
        const h_m_core = members.m_core ?? 0;
        if ((((h_m_core.pcm.regs[0]) >>> (0)) & 1)) {
            h_m_core.pcm.output = ((data) & 0xff);
        }
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_core = members.m_core ?? 0;
        const h_m_square_lut = members.m_square_lut ?? 0;
        let accum = 0;
        for (let sampindex = ((0) | 0); ((Number(sampindex) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); sampindex = ((((sampindex) + (1))) | 0)) {
            method_tick_square(runtime, h_m_core.squ[0]);
            method_tick_square(runtime, h_m_core.squ[1]);
            accum = h_m_square_lut[((h_m_core.squ[0].output) + (h_m_core.squ[1].output))];
            accum = ((accum) + (((h_m_core.pcm.output) / (255))));
            ((runtime.dereference(stream)).put?.(0, sampindex, (-accum)) ?? 0);
        }
    }
    function method_tick_square(runtime, chan) {
        const members = runtime.members;
        const h_m_sync_times1 = members.m_sync_times1 ?? 0;
        if (((chan.enabled) ? 0 : 1)) {
            chan.output = ((0) & 0xff);
            return;
        }
        let env_delay = ((h_m_sync_times1[((chan.regs[0]) & (15))]) | 0);
        chan.env_phase = ((chan.env_phase) - (4));
        while (((Number(chan.env_phase) < Number(0)) ? 1 : 0)) {
            chan.env_phase = ((chan.env_phase) + (env_delay));
            if ((((chan.regs[0]) >>> (5)) & 1)) {
                chan.env_vol = ((((((chan.env_vol) + (1))) & (15))) & 0xff);
            }
            else {
                if (((Number(chan.env_vol) < Number(15)) ? 1 : 0)) {
                    chan.env_vol = ((((chan.env_vol) + (1))) & 0xff);
                }
            }
        }
        if ((((((Number(chan.vbl_length) > Number(0)) ? 1 : 0)) && (((((~chan.regs[0])) >>> (5)) & 1))) ? 1 : 0)) {
            chan.vbl_length = ((((chan.vbl_length) - (1))) | 0);
        }
        if (((chan.vbl_length) ? 0 : 1)) {
            chan.output = ((0) & 0xff);
            return;
        }
        chan.phaseacc = ((chan.phaseacc) - (4));
        while (((Number(chan.phaseacc) < Number(0)) ? 1 : 0)) {
            chan.phaseacc = ((chan.phaseacc) + (runtime.shiftRight(chan.freq, 16)));
            chan.adder = ((((((chan.adder) + (1))) & (15))) & 0xff);
        }
        if ((((chan.regs[0]) >>> (4)) & 1)) {
            chan.output = ((((chan.regs[0]) & (15))) & 0xff);
        }
        else {
            chan.output = ((((15) - (chan.env_vol))) & 0xff);
        }
        chan.output = ((((chan.output) * (((((__mame_table_1[(((((chan.regs[0]) >>> (6))) % 4) + 4) % 4] ?? 0)) >>> (runtime.subtract(7, (((chan.adder) >>> (1)) & ((1 << (3)) - 1))))) & 1)))) & 0xff);
    }
    function method_irq(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_irq_handler)).bind === 'function' ? (runtime.dereference(members.m_irq_handler)).bind() : typeof (runtime.dereference(members.m_irq_handler)).bind === 'number' || typeof (runtime.dereference(members.m_irq_handler)).bind === 'boolean' ? (runtime.dereference(members.m_irq_handler)).bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function method_mmc5_sound_device__irq(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_irq_handler)).bind === 'function' ? (runtime.dereference(members.m_irq_handler)).bind() : typeof (runtime.dereference(members.m_irq_handler)).bind === 'number' || typeof (runtime.dereference(members.m_irq_handler)).bind === 'boolean' ? (runtime.dereference(members.m_irq_handler)).bind : runtime.container(members.m_irq_handler, "bind"));
    }
    return {
        "device_start": method_device_start,
        "calculate_rates": method_calculate_rates,
        "write": method_write,
        "read": method_read,
        "pcm_w": method_pcm_w,
        "sound_stream_update": method_sound_stream_update,
        "tick_square": method_tick_square,
        "irq": method_irq,
        "mmc5_sound_device::irq": method_mmc5_sound_device__irq
    };
})();
definition.children[0].definition.compiledMethodLinks = ["NAME", "clock", "m_irq_handler", "machine", "machine().side_effects_disabled", "save_item", "stream_alloc"];
export const device = definition;
export default device;
