import deviceData from './nes_oekakids.device.ir.json' with { type: 'json' };
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
        method_device_nes_cart_interface__nt_w(runtime, offset, data);
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
    function method_nt_r(runtime, offset) {
        const members = runtime.members;
        return ((method_device_nes_cart_interface__nt_r(runtime, offset)) & 0xff);
    }
    function method_device_nes_cart_interface__nt_r(runtime, offset) {
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
        if (((((members.m_battery).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_battery"), ((offset) & (runtime.subtract((members.m_battery).length, 1))), data);
        }
        if (((((members.m_prgram).length === 0 ? 1 : 0)) ? 0 : 1)) {
            runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) & (runtime.subtract((members.m_prgram).length, 1))), data);
        }
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        0;
        method_prg32(runtime, ((data) & (3)));
        members.m_reg = ((((data) & (4))) & 0xff);
        method_update_chr(runtime);
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
    function method_update_chr(runtime) {
        const members = runtime.members;
        method_chr4_0(runtime, (((members.m_reg ?? 0)) | ((members.m_latch ?? 0))), 1);
        method_chr4_4(runtime, (((members.m_reg ?? 0)) | (3)), 1);
    }
    function method_chr4_0(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 2, 0, bank, source);
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
    function method_chr4_4(runtime, bank, source) {
        const members = runtime.members;
        method_bank_chr(runtime, 2, 4, bank, source);
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
    return {
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "write_ex": method_write_ex,
        "ppu_latch": method_ppu_latch,
        "hblank_irq": method_hblank_irq,
        "scanline_irq": method_scanline_irq,
        "set_irq_line": method_set_irq_line,
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "device_nes_cart_interface::nt_w": method_device_nes_cart_interface__nt_w,
        "nt_r": method_nt_r,
        "device_nes_cart_interface::nt_r": method_device_nes_cart_interface__nt_r,
        "read_l": method_read_l,
        "get_open_bus": method_get_open_bus,
        "read_m": method_read_m,
        "write_l": method_write_l,
        "write_m": method_write_m,
        "write_h": method_write_h,
        "prg32": method_prg32,
        "prg_8k_bank_num": method_prg_8k_bank_num,
        "update_prg_banks": method_update_prg_banks,
        "update_chr": method_update_chr,
        "chr4_0": method_chr4_0,
        "bank_chr": method_bank_chr,
        "chr4_4": method_chr4_4,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h
    };
})();
definition.compiledMethodLinks = ["assert", "m_maincpu.set_input_line"];
export const device = definition;
export default device;
