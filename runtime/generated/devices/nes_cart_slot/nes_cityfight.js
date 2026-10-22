import deviceData from './nes_cityfight.device.ir.json' with { type: 'json' };
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
    function method_device_nes_cart_interface__chr_w(runtime, offset, data) {
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
    function method_get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        0;
        if ((members.m_wram_enable ?? 0)) {
            return ((method_device_nes_cart_interface__read_m(runtime, offset)) & 0xff);
        }
        else {
            return ((method_get_open_bus(runtime)) & 0xff);
        }
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
    function method_device_nes_cart_interface__write_m(runtime, offset, data) {
        const members = runtime.members;
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
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
    function method_nes_konami_vrc4_device__write_m(runtime, offset, data) {
        const members = runtime.members;
        0;
        if ((members.m_wram_enable ?? 0)) {
            method_device_nes_cart_interface__write_m(runtime, offset, data);
        }
    }
    function method_nes_konami_vrc4_device__write_h(runtime, offset, data) {
        const members = runtime.members;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        0;
        let addr_lines = ((((((offset) >>> ((members.m_vrc_ls_prg_a ?? 0))) & 1) << 1 | (((offset) >>> ((members.m_vrc_ls_prg_b ?? 0))) & 1) << 0)) & 0xff);
        switch (((offset) & (28672))) {
            case 0:
            case 8192:
                {
                    h_m_mmc_prg_bank[(((offset) >>> (13)) & 1)] = data;
                    method_set_prg__0(runtime);
                    break;
                }
            case 4096:
                {
                    if ((((addr_lines) >>> (1)) & 1)) {
                        members.m_wram_enable = ((((data) & (1))) & 0xff);
                        members.m_prg_flip = ((((data) & (2))) & 0xff);
                        method_set_prg__0(runtime);
                    }
                    else {
                        method_set_mirror(runtime, data);
                    }
                    break;
                }
            case 12288:
            case 16384:
            case 20480:
            case 24576:
                {
                    let bank = ((runtime.add(((2) * (runtime.subtract((((offset) >>> (12)) & ((1 << (3)) - 1)), 3))), (((addr_lines) >>> (1)) & 1))) | 0);
                    let shift = (((((((addr_lines) >>> (0)) & 1)) * (4))) | 0);
                    let mask = ((((shift) ? (496) : (15))) | 0);
                    h_m_mmc_vrom_bank[bank] = ((((h_m_mmc_vrom_bank[bank]) & ((~mask)))) | (((((data) << (shift))) & (mask))));
                    method_set_chr__0(runtime);
                    break;
                }
            case 28672:
                {
                    switch (addr_lines) {
                        case 0:
                            {
                                members.m_irq_count_latch = (((((((members.m_irq_count_latch ?? 0)) & (240))) | (((data) & (15))))) & 0xff);
                                break;
                            }
                        case 1:
                            {
                                members.m_irq_count_latch = (((((((members.m_irq_count_latch ?? 0)) & (15))) | (((((data) & (15))) << (4))))) & 0xff);
                                break;
                            }
                        case 2:
                            {
                                method_irq_ctrl_w(runtime, data);
                                break;
                            }
                        case 3:
                            {
                                method_irq_ack_w(runtime);
                                break;
                            }
                    }
                    break;
                }
        }
    }
    function method_set_prg__0(runtime) {
        const members = runtime.members;
        method_set_prg__2(runtime, 0, 31);
    }
    function method_set_prg__2(runtime, prg_base, prg_mask) {
        const members = runtime.members;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        method_prg8_x(runtime, ((0) ^ ((members.m_prg_flip ?? 0))), ((prg_base) | (((h_m_mmc_prg_bank[0]) & (prg_mask)))));
        method_prg8_x(runtime, 1, ((prg_base) | (((h_m_mmc_prg_bank[1]) & (prg_mask)))));
        method_prg8_x(runtime, ((2) ^ ((members.m_prg_flip ?? 0))), ((prg_base) | (((prg_mask) & (-2)))));
        method_prg8_x(runtime, 3, ((prg_base) | (prg_mask)));
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
    function method_set_mirror(runtime, data) {
        const members = runtime.members;
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
    function method_set_chr__0(runtime) {
        const members = runtime.members;
        method_set_chr__2(runtime, 0, 511);
    }
    function method_set_chr__2(runtime, chr_base, chr_mask) {
        const members = runtime.members;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        for (let i = ((0) | 0); ((Number(i) < Number(8)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            method_chr1_x(runtime, i, ((chr_base) | (((h_m_mmc_vrom_bank[i]) & (chr_mask)))), (members.m_chr_source ?? 0));
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
    function method_irq_ctrl_w(runtime, data) {
        const members = runtime.members;
        members.m_irq_mode = ((((data) & (4))) | 0);
        members.m_irq_enable = ((((data) & (2))) | 0);
        members.m_irq_enable_latch = ((((data) & (1))) | 0);
        if ((members.m_irq_enable ?? 0)) {
            members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xff);
            members.m_irq_prescale = ((341) | 0);
        }
        method_set_irq_line(runtime, 0);
    }
    function method_irq_ack_w(runtime) {
        const members = runtime.members;
        members.m_irq_enable = (((members.m_irq_enable_latch ?? 0)) | 0);
        method_set_irq_line(runtime, 0);
    }
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_irq_enable ?? 0)) {
            if ((members.m_irq_mode ?? 0)) {
                method_irq_tick(runtime);
            }
            else {
                members.m_irq_prescale = ((((members.m_irq_prescale) - (3))) | 0);
                if (((Number((members.m_irq_prescale ?? 0)) <= Number(0)) ? 1 : 0)) {
                    members.m_irq_prescale = ((((members.m_irq_prescale) + (341))) | 0);
                    method_irq_tick(runtime);
                }
            }
        }
    }
    function method_irq_tick(runtime) {
        const members = runtime.members;
        if (((Number((members.m_irq_count ?? 0)) === Number(255)) ? 1 : 0)) {
            members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xff);
            method_set_irq_line(runtime, 1);
        }
        else {
            members.m_irq_count = ((((members.m_irq_count) + (1))) & 0xff);
        }
    }
    return {
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "write_ex": method_write_ex,
        "ppu_latch": method_ppu_latch,
        "hblank_irq": method_hblank_irq,
        "scanline_irq": method_scanline_irq,
        "set_irq_line": method_set_irq_line,
        "chr_w": method_chr_w,
        "device_nes_cart_interface::chr_w": method_device_nes_cart_interface__chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "get_open_bus": method_get_open_bus,
        "read_m": method_read_m,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "write_l": method_write_l,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "nes_konami_vrc4_device::write_m": method_nes_konami_vrc4_device__write_m,
        "nes_konami_vrc4_device::write_h": method_nes_konami_vrc4_device__write_h,
        "set_prg__0": method_set_prg__0,
        "set_prg__2": method_set_prg__2,
        "prg8_x": method_prg8_x,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "set_mirror": method_set_mirror,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
        "set_chr__0": method_set_chr__0,
        "set_chr__2": method_set_chr__2,
        "chr1_x": method_chr1_x,
        "bank_chr": method_bank_chr,
        "irq_ctrl_w": method_irq_ctrl_w,
        "irq_ack_w": method_irq_ack_w,
        "irq_timer_tick": method_irq_timer_tick,
        "irq_tick": method_irq_tick
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_maincpu.set_input_line"];
export const device = definition;
export default device;
