import deviceData from './nes_ss88006.device.ir.json' with { type: 'json' };
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
        return ((method_get_open_bus(runtime)) & 0xff);
    }
    function method_get_open_bus(runtime) {
        const members = runtime.members;
        return (((members.m_open_bus ?? 0)) & 0xff);
    }
    function method_read_m(runtime, offset) {
        const members = runtime.members;
        0;
        if ((((members.m_wram_protect ?? 0)) & (1))) {
            return ((method_device_nes_cart_interface__read_m(runtime, offset)) & 0xff);
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
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_irq_enable ?? 0)) {
            let mask = ((65535) & 0xffff);
            if (((((members.m_irq_mode ?? 0)) >>> (3)) & 1)) {
                mask = ((15) & 0xffff);
            }
            else {
                if (((((members.m_irq_mode ?? 0)) >>> (2)) & 1)) {
                    mask = ((255) & 0xffff);
                }
                else {
                    if (((((members.m_irq_mode ?? 0)) >>> (1)) & 1)) {
                        mask = ((4095) & 0xffff);
                    }
                }
            }
            members.m_irq_count = (((((((members.m_irq_count ?? 0)) & ((~mask)))) | ((((((members.m_irq_count ?? 0)) - (1))) & (mask))))) & 0xffff);
            if (((Number((((members.m_irq_count ?? 0)) & (mask))) === Number(mask)) ? 1 : 0)) {
                method_set_irq_line(runtime, 1);
            }
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
        "irq_timer_tick": method_irq_timer_tick
    };
})();
definition.compiledMethodLinks = ["m_maincpu.set_input_line"];
export const device = definition;
export default device;
