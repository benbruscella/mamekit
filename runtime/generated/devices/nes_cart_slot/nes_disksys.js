import deviceData from './nes_disksys.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read_h(runtime, offset) {
        const members = runtime.members;
        const h_m_2c33_rom = members.m_2c33_rom ?? 0;
        0;
        if (((Number(offset) < Number(24576)) ? 1 : 0)) {
            return ((runtime.readIndex((members.m_prgram ?? 0), ((offset) + (8192)))) & 0xff);
        }
        else {
            return ((runtime.readIndex(h_m_2c33_rom, ((offset) & (8191)))) & 0xff);
        }
    }
    function method_read_ex(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        let ret = ((0) & 0xff);
        if ((((((Number(offset) >= Number(32)) ? 1 : 0)) && (((Number(offset) < Number(96)) ? 1 : 0))) ? 1 : 0)) {
            if ((members.m_sound_en ?? 0)) {
                ret = (((__l["m_sound.wave_r"] ? __l["m_sound.wave_r"](((offset) - (32))) : ((members.m_sound)?.wave_r?.(((offset) - (32))) ?? 0))) & 0xff);
            }
        }
        switch (offset) {
            case 16:
                {
                    ret = (((((members.m_fds_status0 ?? 0)) | (128))) & 0xff);
                    if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_fds_status0 = ((((members.m_fds_status0) & (-4))) & 0xff);
                        method_set_irq_line(runtime, 0);
                    }
                    break;
                }
            case 17:
                {
                    if ((((members.m_fds_data ?? 0)) ? 0 : 1)) {
                        ret = ((0) & 0xff);
                    }
                    else {
                        if (((((members.m_fds_current_side ?? 0)) && ((members.m_read_mode ?? 0))) ? 1 : 0)) {
                            ret = ((runtime.readIndex((members.m_fds_data ?? 0), (((((((members.m_fds_current_side ?? 0)) - (1))) * (65500))) + ((members.m_fds_head_position ?? 0))))) & 0xff);
                            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                members.m_fds_head_position = ((((members.m_fds_head_position) + (1))) >>> 0);
                                if (((Number((members.m_fds_head_position ?? 0)) === Number(65500)) ? 1 : 0)) {
                                    0;
                                    members.m_fds_status0 = ((((members.m_fds_status0) | (64))) & 0xff);
                                    members.m_fds_head_position = ((((members.m_fds_head_position) - (2))) >>> 0);
                                }
                            }
                        }
                        else {
                            ret = ((0) & 0xff);
                        }
                    }
                    if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                        members.m_fds_status0 = ((((members.m_fds_status0) & (-3))) & 0xff);
                        method_set_irq_line(runtime, 0);
                    }
                    break;
                }
            case 18:
                {
                    if ((((members.m_fds_data ?? 0)) ? 0 : 1)) {
                        ret = ((1) & 0xff);
                    }
                    else {
                        if (((Number((members.m_fds_last_side ?? 0)) !== Number((members.m_fds_current_side ?? 0))) ? 1 : 0)) {
                            ret = ((1) & 0xff);
                            if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
                                members.m_fds_count = ((((members.m_fds_count) + (1))) | 0);
                                if (((Number((members.m_fds_count ?? 0)) === Number(50)) ? 1 : 0)) {
                                    members.m_fds_last_side = (((members.m_fds_current_side ?? 0)) | 0);
                                    members.m_fds_count = ((0) | 0);
                                }
                            }
                        }
                        else {
                            ret = ((((((Number((members.m_fds_current_side ?? 0)) === Number(0)) ? 1 : 0)) ? (1) : (0))) & 0xff);
                        }
                    }
                    break;
                }
            case 19:
                {
                    ret = ((128) & 0xff);
                    break;
                }
            case 112:
            case 114:
                {
                    if ((members.m_sound_en ?? 0)) {
                        ret = (((__l["m_sound.read"] ? __l["m_sound.read"](((offset) - (96))) : ((members.m_sound)?.read?.(((offset) - (96))) ?? 0))) & 0xff);
                    }
                    break;
                }
            default:
                {
                    ret = ((0) & 0xff);
                    break;
                }
        }
        return ((ret) & 0xff);
    }
    function method_set_irq_line(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        (__l["m_maincpu.set_input_line"] ? __l["m_maincpu.set_input_line"](0, state) : ((members.m_maincpu)?.set_input_line?.(0, state) ?? 0));
    }
    function method_write_ex(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        if ((((((Number(offset) >= Number(32)) ? 1 : 0)) && (((Number(offset) < Number(96)) ? 1 : 0))) ? 1 : 0)) {
            if ((members.m_sound_en ?? 0)) {
                (__l["m_sound.wave_w"] ? __l["m_sound.wave_w"](((offset) - (32)), data) : ((members.m_sound)?.wave_w?.(((offset) - (32)), data) ?? 0));
            }
        }
        switch (offset) {
            case 0:
                {
                    members.m_irq_count_latch = (((((((members.m_irq_count_latch ?? 0)) & (65280))) | (data))) & 0xffff);
                    break;
                }
            case 1:
                {
                    members.m_irq_count_latch = (((((((members.m_irq_count_latch ?? 0)) & (255))) | (((data) << (8))))) & 0xffff);
                    break;
                }
            case 2:
                {
                    if ((members.m_disk_reg_enable ?? 0)) {
                        members.m_irq_repeat = (((((data) >>> (0)) & 1)) ? 1 : 0);
                        members.m_irq_enable = (((((data) >>> (1)) & 1)) ? 1 : 0);
                        if ((members.m_irq_enable ?? 0)) {
                            members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
                        }
                        else {
                            method_set_irq_line(runtime, 0);
                        }
                    }
                    break;
                }
            case 3:
                {
                    members.m_disk_reg_enable = (((((data) >>> (0)) & 1)) ? 1 : 0);
                    if ((((members.m_disk_reg_enable ?? 0)) ? 0 : 1)) {
                        members.m_irq_enable = ((0) ? 1 : 0);
                        method_set_irq_line(runtime, 0);
                    }
                    members.m_sound_en = (((((data) >>> (1)) & 1)) ? 1 : 0);
                    break;
                }
            case 4:
                {
                    if ((((((((members.m_fds_data ?? 0)) && ((members.m_fds_current_side ?? 0))) ? 1 : 0)) && ((((members.m_read_mode ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                        runtime.writeIndex(runtime.writableMember("m_fds_data"), runtime.add((((((members.m_fds_current_side ?? 0)) - (1))) * (65500)), (() => { const previous = (members.m_fds_head_position ?? 0); members.m_fds_head_position = ((((members.m_fds_head_position) + (1))) >>> 0); return previous; })()), data);
                    }
                    members.m_fds_status0 = ((((members.m_fds_status0) & (-3))) & 0xff);
                    method_set_irq_line(runtime, 0);
                    break;
                }
            case 5:
                {
                    members.m_fds_motor_on = (((((data) >>> (0)) & 1)) & 0xff);
                    if ((((data) >>> (1)) & 1)) {
                        members.m_fds_head_position = ((0) >>> 0);
                    }
                    if (((((((((((data) & (64))) ? 0 : 1)) && ((members.m_drive_ready ?? 0))) ? 1 : 0)) && (((Number((members.m_fds_head_position ?? 0)) > Number(2)) ? 1 : 0))) ? 1 : 0)) {
                        members.m_fds_head_position = ((((members.m_fds_head_position) - (2))) >>> 0);
                    }
                    members.m_read_mode = (((((data) >>> (2)) & 1)) & 0xff);
                    if ((((data) >>> (3)) & 1)) {
                        members.m_fds_status0 = ((((members.m_fds_status0) | (8))) & 0xff);
                    }
                    else {
                        members.m_fds_status0 = ((((members.m_fds_status0) & (-9))) & 0xff);
                    }
                    method_set_nt_mirroring(runtime, ((((((members.m_fds_status0 ?? 0)) >>> (3)) & 1)) ? (2) : (1)));
                    members.m_drive_ready = ((((data) & (64))) & 0xff);
                    members.m_irq_transfer = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    break;
                }
            case 6:
                {
                    break;
                }
            case 96:
            case 98:
            case 99:
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
            case 106:
                {
                    if ((members.m_sound_en ?? 0)) {
                        (__l["m_sound.write"] ? __l["m_sound.write"](((offset) - (96)), data) : ((members.m_sound)?.write?.(((offset) - (96)), data) ?? 0));
                    }
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
        if ((members.m_irq_transfer ?? 0)) {
            method_set_irq_line(runtime, 1);
            members.m_fds_status0 = ((((members.m_fds_status0) | (2))) & 0xff);
        }
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
        0;
        return ((runtime.readIndex((members.m_prgram ?? 0), offset)) & 0xff);
    }
    function method_write_l(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_write_m(runtime, offset, data) {
        const members = runtime.members;
        0;
        runtime.writeIndex(runtime.writableMember("m_prgram"), offset, data);
    }
    function method_write_h(runtime, offset, data) {
        const members = runtime.members;
        0;
        if (((Number(offset) < Number(24576)) ? 1 : 0)) {
            runtime.writeIndex(runtime.writableMember("m_prgram"), ((offset) + (8192)), data);
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
    function method_irq_timer_tick(runtime, param) {
        const members = runtime.members;
        if ((members.m_irq_enable ?? 0)) {
            if ((members.m_irq_count ?? 0)) {
                members.m_irq_count = ((((members.m_irq_count) - (1))) & 0xffff);
            }
            else {
                method_set_irq_line(runtime, 1);
                members.m_irq_count = (((members.m_irq_count_latch ?? 0)) & 0xffff);
                if ((((members.m_irq_repeat ?? 0)) ? 0 : 1)) {
                    members.m_irq_enable = ((0) ? 1 : 0);
                }
                members.m_fds_status0 = ((((members.m_fds_status0) | (1))) & 0xff);
            }
        }
    }
    return {
        "read_h": method_read_h,
        "read_ex": method_read_ex,
        "set_irq_line": method_set_irq_line,
        "write_ex": method_write_ex,
        "set_nt_mirroring": method_set_nt_mirroring,
        "set_nt_page": method_set_nt_page,
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
        "chr_w": method_chr_w,
        "chr_r": method_chr_r,
        "device_nes_cart_interface::chr_r": method_device_nes_cart_interface__chr_r,
        "nt_w": method_nt_w,
        "nt_r": method_nt_r,
        "read_l": method_read_l,
        "read_m": method_read_m,
        "write_l": method_write_l,
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
        "device_nes_cart_interface::write_h": method_device_nes_cart_interface__write_h,
        "device_nes_cart_interface::write_m": method_device_nes_cart_interface__write_m,
        "device_nes_cart_interface::read_m": method_device_nes_cart_interface__read_m,
        "irq_timer_tick": method_irq_timer_tick
    };
})();
definition.compiledMethodLinks = ["fatalerror", "m_maincpu.set_input_line", "m_sound.read", "m_sound.wave_r", "m_sound.wave_w", "m_sound.write", "machine", "machine().side_effects_disabled"];
definition.children[0].definition.compiledMethods = (() => {
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_mod_inc = members.mod_inc ?? 0;
        const h_m_mod_table = members.m_mod_table ?? 0;
        const h_m_wave = members.m_wave ?? 0;
        (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
        offset = ((offset) + (16512));
        let ret = ((0) & 0xff);
        switch (offset) {
            case 16528:
                {
                    ret = (((((((members.m_vol_env_out ?? 0)) & (63))) | (64))) & 0xff);
                    break;
                }
            case 16529:
                {
                    ret = ((runtime.add((((members.m_wave_addr ?? 0)) << (4)), (((members.m_wave_acc ?? 0)) >>> (12)))) & 0xff);
                    break;
                }
            case 16530:
                {
                    ret = (((((((members.m_mod_env_out ?? 0)) & (63))) | (64))) & 0xff);
                    break;
                }
            case 16531:
                {
                    ret = (((((((members.m_mod_addr ?? 0)) >>> (5))) & (127))) & 0xff);
                    break;
                }
            case 16532:
                {
                    break;
                }
            case 16533:
                {
                    ret = ((((h_mod_inc[h_m_mod_table[(((((members.m_mod_addr ?? 0)) >>> (1))) & (31))]]) & (15))) & 0xff);
                    break;
                }
            case 16534:
                {
                    ret = ((((((h_m_wave[(((members.m_wave_addr ?? 0)) & (63))]) & (63))) | (64))) & 0xff);
                    break;
                }
            case 16535:
                {
                    ret = (((((members.m_mod_pos ?? 0)) & (127))) & 0xff);
                    break;
                }
        }
        return ((ret) & 0xff);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_regs = members.m_regs ?? 0;
        const h_m_mod_table = members.m_mod_table ?? 0;
        h_m_regs[((offset) & (15))] = data;
        (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
        offset = ((offset) + (16512));
        switch (offset) {
            case 16512:
                {
                    members.m_vol_env_disable = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    members.m_vol_env_mode = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    members.m_vol_env_spd = ((((data) & (63))) | 0);
                    members.m_vol_env_clk = ((0) >>> 0);
                    if ((members.m_vol_env_disable ?? 0)) {
                        members.m_vol_env_out = (((members.m_vol_env_spd ?? 0)) | 0);
                    }
                    break;
                }
            case 16514:
                {
                    members.m_wave_freq = (((((((members.m_wave_freq ?? 0)) & (3840))) | (((data) & (255))))) | 0);
                    break;
                }
            case 16515:
                {
                    members.m_wave_halt = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    members.m_env_halt = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    members.m_wave_freq = (((((((members.m_wave_freq ?? 0)) & (255))) | (((((data) & (15))) << (8))))) | 0);
                    if ((members.m_wave_halt ?? 0)) {
                        members.m_wave_acc = ((0) >>> 0);
                    }
                    if ((members.m_env_halt ?? 0)) {
                        members.m_vol_env_clk = (((members.m_mod_env_clk = ((0) >>> 0))) >>> 0);
                    }
                    break;
                }
            case 16516:
                {
                    members.m_mod_env_disable = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    members.m_mod_env_mode = (((((data) >>> (6)) & 1)) ? 1 : 0);
                    members.m_mod_env_spd = ((((data) & (63))) | 0);
                    members.m_mod_env_clk = ((0) >>> 0);
                    if ((members.m_mod_env_disable ?? 0)) {
                        members.m_mod_env_out = (((members.m_mod_env_spd ?? 0)) | 0);
                    }
                    break;
                }
            case 16517:
                {
                    members.m_mod_pos = ((((data) & (127))) | 0);
                    break;
                }
            case 16518:
                {
                    members.m_mod_freq = (((((((members.m_mod_freq ?? 0)) & (3840))) | (((data) & (255))))) | 0);
                    break;
                }
            case 16519:
                {
                    members.m_mod_halt = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    members.m_mod_freq = (((((((members.m_mod_freq ?? 0)) & (255))) | (((((data) & (15))) << (8))))) | 0);
                    if ((members.m_mod_halt ?? 0)) {
                        members.m_mod_acc = ((0) >>> 0);
                    }
                    break;
                }
            case 16520:
                {
                    if ((members.m_mod_halt ?? 0)) {
                        h_m_mod_table[(((((members.m_mod_addr ?? 0)) >>> (1))) & (31))] = ((data) & (7));
                        members.m_mod_addr = ((((members.m_mod_addr) + (2))) & 0xff);
                    }
                    break;
                }
            case 16521:
                {
                    members.m_wave_write = (((((data) >>> (7)) & 1)) ? 1 : 0);
                    members.m_mvol = ((((data) & (3))) | 0);
                    break;
                }
            case 16522:
                {
                    members.m_env_spd = ((data) | 0);
                    break;
                }
        }
    }
    function method_sound_stream_update(runtime, stream) {
        const members = runtime.members;
        const h_m_mvol_table = members.m_mvol_table ?? 0;
        for (let i = ((0) | 0); ((Number(i) < Number((typeof (runtime.dereference(stream)).samples === 'function' ? (runtime.dereference(stream)).samples() : typeof (runtime.dereference(stream)).samples === 'number' || typeof (runtime.dereference(stream)).samples === 'boolean' ? (runtime.dereference(stream)).samples : runtime.container(stream, "samples")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            members.m_output = ((0) | 0);
            if (((((((members.m_env_halt ?? 0)) ? 0 : 1)) && ((((members.m_wave_halt ?? 0)) ? 0 : 1))) ? 1 : 0)) {
                method_exec_vol_env(runtime);
                method_exec_mod_env(runtime);
            }
            method_exec_mod(runtime);
            method_exec_wave(runtime);
            ((runtime.dereference(stream)).put_int?.(0, i, (((members.m_output ?? 0)) * (h_m_mvol_table[(members.m_mvol ?? 0)])), 32768) ?? 0);
        }
    }
    function method_exec_vol_env(runtime) {
        const members = runtime.members;
        if ((((members.m_vol_env_disable ?? 0)) ? 0 : 1)) {
            let period = (((((((((members.m_vol_env_spd ?? 0)) + (1))) * ((((members.m_env_spd ?? 0)) + (1))))) << (3))) >>> 0);
            if (((Number((members.m_vol_env_clk = ((((members.m_vol_env_clk) + (1))) >>> 0))) > Number(period)) ? 1 : 0)) {
                if ((members.m_vol_env_mode ?? 0)) {
                    if (((Number((members.m_vol_env_out ?? 0)) < Number(32)) ? 1 : 0)) {
                        members.m_vol_env_out = ((((members.m_vol_env_out) + (1))) | 0);
                    }
                }
                else {
                    if (((Number((members.m_vol_env_out ?? 0)) > Number(0)) ? 1 : 0)) {
                        members.m_vol_env_out = ((((members.m_vol_env_out) - (1))) | 0);
                    }
                }
                members.m_vol_env_clk = ((0) >>> 0);
            }
        }
    }
    function method_exec_mod_env(runtime) {
        const members = runtime.members;
        if ((((members.m_mod_env_disable ?? 0)) ? 0 : 1)) {
            let period = (((((((((members.m_mod_env_spd ?? 0)) + (1))) * ((((members.m_env_spd ?? 0)) + (1))))) << (3))) >>> 0);
            if (((Number((members.m_mod_env_clk = ((((members.m_mod_env_clk) + (1))) >>> 0))) > Number(period)) ? 1 : 0)) {
                if ((members.m_mod_env_mode ?? 0)) {
                    if (((Number((members.m_mod_env_out ?? 0)) < Number(32)) ? 1 : 0)) {
                        members.m_mod_env_out = ((((members.m_mod_env_out) + (1))) | 0);
                    }
                }
                else {
                    if (((Number((members.m_mod_env_out ?? 0)) > Number(0)) ? 1 : 0)) {
                        members.m_mod_env_out = ((((members.m_mod_env_out) - (1))) | 0);
                    }
                }
                members.m_mod_env_clk = ((0) >>> 0);
            }
        }
    }
    function method_exec_mod(runtime) {
        const members = runtime.members;
        const h_m_mod_table = members.m_mod_table ?? 0;
        const h_mod_inc = members.mod_inc ?? 0;
        if ((((members.m_mod_halt ?? 0)) ? 0 : 1)) {
            members.m_mod_acc = ((((members.m_mod_acc) + ((members.m_mod_freq ?? 0)))) >>> 0);
            while (((Number((members.m_mod_acc ?? 0)) > Number(65535)) ? 1 : 0)) {
                let val = ((((h_m_mod_table[((runtime.shiftRight((() => { const previous = (members.m_mod_addr ?? 0); members.m_mod_addr = ((((members.m_mod_addr) + (1))) & 0xff); return previous; })(), 1)) & (31))]) & (7))) | 0);
                members.m_mod_acc = ((((members.m_mod_acc) - (65536))) >>> 0);
                if (((Number(val) === Number(4)) ? 1 : 0)) {
                    members.m_mod_pos = ((0) | 0);
                }
                else {
                    members.m_mod_pos = (((((((members.m_mod_pos ?? 0)) + (h_mod_inc[val]))) & (127))) | 0);
                }
            }
        }
    }
    function method_exec_wave(runtime) {
        const members = runtime.members;
        const h_m_wave = members.m_wave ?? 0;
        if ((((members.m_wave_halt ?? 0)) ? 0 : 1)) {
            let mod = ((0) | 0);
            if (((Number((members.m_mod_env_out ?? 0)) !== Number(0)) ? 1 : 0)) {
                let pos = (((((((members.m_mod_pos ?? 0)) & (63))) - ((((members.m_mod_pos ?? 0)) & (64))))) | 0);
                let temp = ((((pos) * ((members.m_mod_env_out ?? 0)))) | 0);
                let rem = ((((temp) & (15))) | 0);
                temp = ((runtime.shiftRight(temp, 4)) | 0);
                if ((((((Number(rem) > Number(0)) ? 1 : 0)) && (((Number(((temp) & (128))) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                    if (((Number(pos) < Number(0)) ? 1 : 0)) {
                        temp = ((((temp) - (1))) | 0);
                    }
                    else {
                        temp = ((((temp) + (2))) | 0);
                    }
                }
                while (((Number(temp) >= Number(192)) ? 1 : 0)) {
                    temp = ((((temp) - (256))) | 0);
                }
                while (((Number(temp) < Number(-64)) ? 1 : 0)) {
                    temp = ((((temp) + (256))) | 0);
                }
                temp = (((((members.m_wave_freq ?? 0)) * (temp))) | 0);
                rem = ((((temp) & (63))) | 0);
                temp = ((runtime.shiftRight(temp, 6)) | 0);
                if (((Number(rem) >= Number(32)) ? 1 : 0)) {
                    temp = ((((temp) + (1))) | 0);
                }
                mod = ((temp) | 0);
            }
            members.m_wave_acc = ((((members.m_wave_acc) + (Math.max(+(0), +((((members.m_wave_freq ?? 0)) + (mod))))))) >>> 0);
            members.m_wave_addr = ((((members.m_wave_addr) + ((((members.m_wave_acc ?? 0)) >>> (16))))) & 0xff);
            members.m_wave_acc = ((((members.m_wave_acc) & (65535))) >>> 0);
        }
        if ((((members.m_wave_write ?? 0)) ? 0 : 1)) {
            members.m_output = ((((((h_m_wave[(((members.m_wave_addr ?? 0)) & (63))]) - (32))) * (Math.min(+(32), +((members.m_vol_env_out ?? 0)))))) | 0);
        }
    }
    function method_wave_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_wave = members.m_wave ?? 0;
        if ((members.m_wave_write ?? 0)) {
            (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
            h_m_wave[((offset) & (63))] = ((data) & (63));
        }
    }
    function method_wave_r(runtime, offset) {
        const members = runtime.members;
        const h_m_wave = members.m_wave ?? 0;
        return ((((((h_m_wave[((offset) & (63))]) & (63))) | (64))) & 0xff);
    }
    function method_rp2c33_sound_device__wave_w(runtime, offset, data) {
        const members = runtime.members;
        const h_m_wave = members.m_wave ?? 0;
        if ((members.m_wave_write ?? 0)) {
            (typeof (runtime.dereference(members.m_stream)).update === 'function' ? (runtime.dereference(members.m_stream)).update() : typeof (runtime.dereference(members.m_stream)).update === 'number' || typeof (runtime.dereference(members.m_stream)).update === 'boolean' ? (runtime.dereference(members.m_stream)).update : runtime.container(members.m_stream, "update"));
            h_m_wave[((offset) & (63))] = ((data) & (63));
        }
    }
    function method_rp2c33_sound_device__wave_r(runtime, offset) {
        const members = runtime.members;
        const h_m_wave = members.m_wave ?? 0;
        return ((((((h_m_wave[((offset) & (63))]) & (63))) | (64))) & 0xff);
    }
    return {
        "read": method_read,
        "write": method_write,
        "sound_stream_update": method_sound_stream_update,
        "exec_vol_env": method_exec_vol_env,
        "exec_mod_env": method_exec_mod_env,
        "exec_mod": method_exec_mod,
        "exec_wave": method_exec_wave,
        "wave_w": method_wave_w,
        "wave_r": method_wave_r,
        "rp2c33_sound_device::wave_w": method_rp2c33_sound_device__wave_w,
        "rp2c33_sound_device::wave_r": method_rp2c33_sound_device__wave_r
    };
})();
export const device = definition;
export default device;
