import deviceData from './nes_waixing_sh2.device.ir.json' with { type: 'json' };
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
        if (((Number(scanline) < Number(239)) ? 1 : 0)) {
            let prior_count = (((members.m_irq_count ?? 0)) | 0);
            if ((((((Number((members.m_irq_count ?? 0)) === Number(0)) ? 1 : 0)) || ((members.m_irq_clear ?? 0))) ? 1 : 0)) {
                members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
            }
            else {
                members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff);
            }
            if (((((((((((members.m_irq_enable ?? 0)) && (((blanked) ? 0 : 1))) ? 1 : 0)) && (((Number((members.m_irq_count ?? 0)) === Number(0)) ? 1 : 0))) ? 1 : 0)) && ((((prior_count) || ((members.m_irq_clear ?? 0))) ? 1 : 0))) ? 1 : 0)) {
                0;
                method_set_irq_line(runtime, 1);
            }
        }
        members.m_irq_clear = ((0) & 0xff);
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
        const h_m_reg = members.m_reg ?? 0;
        const h_m_chr_base = members.m_chr_base ?? 0;
        let val = ((method_device_nes_cart_interface__chr_r(runtime, offset)) | 0);
        switch (((offset) & (4088))) {
            case 4048:
            case 4072:
                {
                    h_m_reg[(((offset) >>> (12)) & 1)] = (((offset) >>> (3)) & 1);
                    runtime.invoke("set_chr", (members.m_chr_source ?? 0), h_m_chr_base, (members.m_chr_mask ?? 0));
                    break;
                }
        }
        return ((val) & 0xff);
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
        if (((((members.m_wram_protect ?? 0)) >>> (7)) & 1)) {
            if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                return ((runtime.readIndex((members.m_battery ?? 0), ((offset) & (runtime.subtract((members.m_battery).length, 1))))) & 0xff);
            }
            if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) & (runtime.subtract((members.m_prgram).length, 1))))) & 0xff);
            }
        }
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        0;
        if ((((((((members.m_wram_protect ?? 0)) >>> (7)) & 1)) && (((((((members.m_wram_protect ?? 0)) >>> (6)) & 1)) ? 0 : 1))) ? 1 : 0)) {
            if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
                runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
            }
            else {
                if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
                    runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
                }
            }
        }
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        method_txrom_write(runtime, offset, data);
    }
    function method_txrom_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_chr_base = members.m_chr_base ?? 0;
        const h_m_mmc_vrom_bank = members.m_mmc_vrom_bank ?? 0;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        let mmc_helper = ((0) & 0xff);
        let cmd = ((0) & 0xff);
        0;
        switch (((offset) & (24577))) {
            case 0:
                {
                    mmc_helper = (((((members.m_latch ?? 0)) ^ (data))) & 0xff);
                    members.m_latch = ((data) | 0);
                    if (((mmc_helper) & (64))) {
                        method_set_prg(runtime, (members.m_prg_base ?? 0), (members.m_prg_mask__nes_txrom_device ?? 0));
                    }
                    if (((mmc_helper) & (128))) {
                        runtime.invoke("set_chr", (members.m_chr_source ?? 0), h_m_chr_base, (members.m_chr_mask ?? 0));
                    }
                    break;
                }
            case 1:
                {
                    cmd = (((((members.m_latch ?? 0)) & (7))) & 0xff);
                    switch (cmd) {
                        case 0:
                        case 1:
                        case 2:
                        case 3:
                        case 4:
                        case 5:
                            {
                                h_m_mmc_vrom_bank[cmd] = data;
                                runtime.invoke("set_chr", (members.m_chr_source ?? 0), h_m_chr_base, (members.m_chr_mask ?? 0));
                                break;
                            }
                        case 6:
                        case 7:
                            {
                                h_m_mmc_prg_bank[((cmd) - (6))] = data;
                                method_set_prg(runtime, (members.m_prg_base ?? 0), (members.m_prg_mask__nes_txrom_device ?? 0));
                                break;
                            }
                    }
                    break;
                }
            case 8192:
                {
                    members.m_mmc_mirror = ((data) & 0xff);
                    if (((Number((members.m_mirroring ?? 0)) !== Number(5)) ? 1 : 0)) {
                        method_set_nt_mirroring(runtime, (((((data) >>> (0)) & 1)) ? (2) : (1)));
                    }
                    break;
                }
            case 8193:
                {
                    members.m_wram_protect = ((data) | 0);
                    break;
                }
            case 16384:
                {
                    members.m_irq_count_latch = ((data) & 0xffff);
                    break;
                }
            case 16385:
                {
                    members.m_irq_count = ((0) & 0xffff);
                    break;
                }
            case 24576:
                {
                    members.m_irq_enable = ((0) | 0);
                    method_set_irq_line(runtime, 0);
                    break;
                }
            case 24577:
                {
                    members.m_irq_enable = ((1) | 0);
                    break;
                }
            default:
                {
                    0;
                    break;
                }
        }
    }
    function method_set_prg(runtime, prg_base, prg_mask) {
        const members = runtime.members;
        const h_m_mmc_prg_bank = members.m_mmc_prg_bank ?? 0;
        let prg_flip = (((((((members.m_latch ?? 0)) & (64))) ? (2) : (0))) & 0xff);
        method_prg_cb(runtime, 0, ((prg_base) | (((h_m_mmc_prg_bank[((0) ^ (prg_flip))]) & (prg_mask)))));
        method_prg_cb(runtime, 1, ((prg_base) | (((h_m_mmc_prg_bank[1]) & (prg_mask)))));
        method_prg_cb(runtime, 2, ((prg_base) | (((h_m_mmc_prg_bank[((2) ^ (prg_flip))]) & (prg_mask)))));
        method_prg_cb(runtime, 3, ((prg_base) | (((h_m_mmc_prg_bank[3]) & (prg_mask)))));
    }
    function method_prg_cb(runtime, start, bank) {
        const members = runtime.members;
        method_prg8_x(runtime, start, bank);
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
    function method_device_nes_cart_interface__ppu_latch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_nes_cart_interface__write_h(runtime, offset, data) {
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
    function method_nes_txrom_device__write_h(runtime, offset, data) {
        const members = runtime.members;
        method_txrom_write(runtime, offset, data);
    }
    return {
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "write_ex": method_write_ex,
        "ppu_latch": method_ppu_latch,
        "hblank_irq": method_hblank_irq,
        "set_irq_line": method_set_irq_line,
        "scanline_irq": method_scanline_irq,
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
        "txrom_write": method_txrom_write,
        "set_prg": method_set_prg,
        "prg_cb": method_prg_cb,
        "prg8_x": method_prg8_x,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "nes_txrom_device::write_h": method_nes_txrom_device__write_h
    };
})();
definition.compiledMethodLinks = ["assert", "fatalerror", "m_maincpu.set_input_line"];
export const device = definition;
export default device;
