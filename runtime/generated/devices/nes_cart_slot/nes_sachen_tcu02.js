import deviceData from './nes_sachen_tcu02.device.ir.json' with { type: 'json' };
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
        0;
        if (((Number(((offset) & (259))) === Number(0)) ? 1 : 0)) {
            return (((((members.m_latch ?? 0)) | (64))) & 0xff);
        }
        else {
            return ((0) & 0xff);
        }
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
    function method_get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
        0;
        if (((Number(((offset) & (259))) === Number(2)) ? 1 : 0)) {
            members.m_latch = ((((((data) & (48))) | (((((data) + (3))) & (15))))) & 0xff);
            method_chr8(runtime, (members.m_latch ?? 0), 0);
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
    function method_device_nes_cart_interface__write_l(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_nes_cart_interface__read_l(runtime, offset) {
        const members = runtime.members;
        return ((method_get_open_bus(runtime)) & 0xff);
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
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "get_open_bus": method_get_open_bus,
        "write_l": method_write_l,
        "chr8": method_chr8,
        "bank_chr": method_bank_chr,
        "write_m": method_write_m,
        "write_h": method_write_h,
        "device_nes_cart_interface::read_h": method_device_nes_cart_interface__read_h,
        "device_nes_cart_interface::read_ex": method_device_nes_cart_interface__read_ex,
        "device_nes_cart_interface::write_ex": method_device_nes_cart_interface__write_ex,
        "device_nes_cart_interface::ppu_latch": method_device_nes_cart_interface__ppu_latch,
        "device_nes_cart_interface::write_l": method_device_nes_cart_interface__write_l,
        "device_nes_cart_interface::read_l": method_device_nes_cart_interface__read_l
    };
})();
definition.compiledMethodLinks = ["assert", "m_maincpu.set_input_line"];
export const device = definition;
export default device;
