import deviceData from './vcs_cart_slot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
    }
    function method_get_software_list_loader(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["rom_software_list_loader::instance"] ? __l["rom_software_list_loader::instance"]() : runtime.macro("rom_software_list_loader::instance"));
    }
    function method_device_rom_image_interface__is_readable(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_device_rom_image_interface__is_writeable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rom_image_interface__is_creatable(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_rom_image_interface__image_type_name(runtime) {
        const members = runtime.members;
        return "romimage";
    }
    function method_device_rom_image_interface__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "rom";
    }
    function method_device_cartrom_image_interface__image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_device_cartrom_image_interface__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
    }
    function method_get_cart_type(runtime) {
        const members = runtime.members;
        const h_m_type = members.m_type ?? 0;
        return h_m_type;
    }
    function method_vcs_cart_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_vcs_cart_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "a2600_cart";
    }
    function method_vcs_cart_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "bin,a26";
    }
    function method_vcs_cart_slot_device__get_cart_type(runtime) {
        const members = runtime.members;
        const h_m_type = members.m_type ?? 0;
        return h_m_type;
    }
    return {
        "is_readable": method_is_readable,
        "is_writeable": method_is_writeable,
        "is_creatable": method_is_creatable,
        "image_type_name": method_image_type_name,
        "image_brief_type_name": method_image_brief_type_name,
        "get_software_list_loader": method_get_software_list_loader,
        "device_rom_image_interface::is_readable": method_device_rom_image_interface__is_readable,
        "device_rom_image_interface::is_writeable": method_device_rom_image_interface__is_writeable,
        "device_rom_image_interface::is_creatable": method_device_rom_image_interface__is_creatable,
        "device_rom_image_interface::image_type_name": method_device_rom_image_interface__image_type_name,
        "device_rom_image_interface::image_brief_type_name": method_device_rom_image_interface__image_brief_type_name,
        "device_cartrom_image_interface::image_type_name": method_device_cartrom_image_interface__image_type_name,
        "device_cartrom_image_interface::image_brief_type_name": method_device_cartrom_image_interface__image_brief_type_name,
        "get_cart_type": method_get_cart_type,
        "vcs_cart_slot_device::is_reset_on_load": method_vcs_cart_slot_device__is_reset_on_load,
        "vcs_cart_slot_device::image_interface": method_vcs_cart_slot_device__image_interface,
        "vcs_cart_slot_device::file_extensions": method_vcs_cart_slot_device__file_extensions,
        "vcs_cart_slot_device::get_cart_type": method_vcs_cart_slot_device__get_cart_type
    };
})();
definition.compiledMethodLinks = ["rom_software_list_loader::instance"];
definition.slot.options["a26_2k_4k"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_f4"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((7) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f4_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((7) & 0xff);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "a26_rom_f4_device::get_start_bank": method_a26_rom_f4_device__get_start_bank
    };
})();
definition.slot.options["a26_f6"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank
    };
})();
definition.slot.options["a26_f8"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank
    };
})();
definition.slot.options["a26_f8sw"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((1) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f8_sw_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((1) & 0xff);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "a26_rom_f8_sw_device::get_start_bank": method_a26_rom_f8_sw_device__get_start_bank
    };
})();
definition.slot.options["a26_fa"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank
    };
})();
definition.slot.options["a26_fe"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, data) {
        const members = runtime.members;
        if ((members.m_trigger_on_next_access ?? 0)) {
            ((runtime.dereference(members.m_bank)).set_entry?.((((((data) >>> (5)) & 1)) ? (0) : (1))) ?? 0);
            members.m_trigger_on_next_access = ((0) ? 1 : 0);
        }
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_3e"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_3f"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_select_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((data) & ((members.m_bank_mask ?? 0)))) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "select_bank": method_select_bank
    };
})();
definition.slot.options["a26_e0"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank_0(runtime, offset, data) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? 0;
        ((runtime.dereference(h_m_bank[0])).set_entry?.(((offset) & (7))) ?? 0);
    }
    function method_switch_bank_1(runtime, offset, data) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? 0;
        ((runtime.dereference(h_m_bank[1])).set_entry?.(((offset) & (7))) ?? 0);
    }
    function method_switch_bank_2(runtime, offset, data) {
        const members = runtime.members;
        const h_m_bank = members.m_bank ?? 0;
        ((runtime.dereference(h_m_bank[2])).set_entry?.(((offset) & (7))) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank_0": method_switch_bank_0,
        "switch_bank_1": method_switch_bank_1,
        "switch_bank_2": method_switch_bank_2
    };
})();
definition.slot.options["a26_e7"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_rom_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_view)).select?.(((((Number(offset) === Number(7)) ? 1 : 0)) ? (1) : (0))) ?? 0);
        ((runtime.dereference(members.m_rom_bank)).set_entry?.(offset) ?? 0);
    }
    function method_switch_ram_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_hi_ram_bank)).set_entry?.(offset) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_rom_bank": method_switch_rom_bank,
        "switch_ram_bank": method_switch_ram_bank
    };
})();
definition.slot.options["a26_ua"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_change_bank(runtime, offset) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((((offset) >>> (6))) & (1))) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "change_bank": method_change_bank
    };
})();
definition.slot.options["a26_cv"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_dc"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read_current_bank(runtime, offset) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_bank)).entry === 'function' ? (runtime.dereference(members.m_bank)).entry() : typeof (runtime.dereference(members.m_bank)).entry === 'number' || typeof (runtime.dereference(members.m_bank)).entry === 'boolean' ? (runtime.dereference(members.m_bank)).entry : runtime.container(members.m_bank, "entry"))) & 0xff);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((runtime.add((typeof (runtime.dereference(members.m_bank)).entry === 'function' ? (runtime.dereference(members.m_bank)).entry() : typeof (runtime.dereference(members.m_bank)).entry === 'number' || typeof (runtime.dereference(members.m_bank)).entry === 'boolean' ? (runtime.dereference(members.m_bank)).entry : runtime.container(members.m_bank, "entry")), 1)) & (15))) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_current_bank": method_read_current_bank,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_fv"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(1) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_jvp"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_cm"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_ss"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read_lo(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_base_banks = members.m_base_banks ?? 0;
        if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if ((members.m_ram_write_enabled ?? 0)) {
                if (((Number((members.m_address_bus_changes ?? 0)) === Number(5)) ? 1 : 0)) {
                    0;
                    runtime.writeIndex(runtime.writableMember("m_ram"), ((offset) + (((h_m_base_banks[0]) * (2048)))), (members.m_data ?? 0));
                }
                else {
                    if (((Number(offset) < Number(256)) ? 1 : 0)) {
                        members.m_data = ((offset) & 0xff);
                        members.m_address_bus_changes = ((0) >>> 0);
                    }
                }
            }
            else {
                if (((Number(offset) < Number(256)) ? 1 : 0)) {
                    members.m_data = ((offset) & 0xff);
                    members.m_address_bus_changes = ((0) >>> 0);
                }
            }
        }
        return ((runtime.readIndex((members.m_ram ?? 0), ((offset) + (((h_m_base_banks[0]) * (2048)))))) & 0xff);
    }
    function method_read_hi(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_base_banks = members.m_base_banks ?? 0;
        if (((((__l["machine().side_effects_disabled"] ?? globalThis.mamekitMissingCall?.("machine().side_effects_disabled"))?.() ?? 0)) ? 0 : 1)) {
            if ((members.m_ram_write_enabled ?? 0)) {
                if (((Number((members.m_address_bus_changes ?? 0)) === Number(5)) ? 1 : 0)) {
                    if (((Number(h_m_base_banks[1]) !== Number(3)) ? 1 : 0)) {
                        0;
                        runtime.writeIndex(runtime.writableMember("m_ram"), ((offset) + (((h_m_base_banks[1]) * (2048)))), (members.m_data ?? 0));
                    }
                }
            }
        }
        if (((Number(h_m_base_banks[1]) !== Number(3)) ? 1 : 0)) {
            return ((runtime.readIndex((members.m_ram ?? 0), ((offset) + (((h_m_base_banks[1]) * (2048)))))) & 0xff);
        }
        else {
            if ((members.m_rom_enabled ?? 0)) {
                return ((runtime.readIndex((members.m_rom ?? 0), offset)) & 0xff);
            }
            else {
                return ((255) & 0xff);
            }
        }
    }
    function method_read_cass(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_address_bus_changes = ((6) >>> 0);
        if (((Number((__l["m_cassette.input"] ? __l["m_cassette.input"]() : ((members.m_cassette)?.input?.() ?? 0))) < Number(0)) ? 1 : 0)) {
            return ((0) & 0xff);
        }
        else {
            return ((1) & 0xff);
        }
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read_lo": method_read_lo,
        "read_hi": method_read_hi,
        "read_cass": method_read_cass
    };
})();
definition.slot.options["a26_ss"].compiledMethodLinks = ["m_cassette.input", "machine", "machine().side_effects_disabled"];
definition.slot.options["a26_dpc"].compiledMethods = (() => {
    function method_setup_addon_ptr(runtime, ptr) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_dpc.set_display_data"] ? __l["m_dpc.set_display_data"](ptr) : ((members.m_dpc)?.set_display_data?.(ptr) ?? 0));
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_dpc_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    return {
        "setup_addon_ptr": method_setup_addon_ptr,
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "get_start_bank": method_get_start_bank,
        "switch_bank": method_switch_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank,
        "a26_rom_dpc_device::get_start_bank": method_a26_rom_dpc_device__get_start_bank
    };
})();
definition.slot.options["a26_dpc"].compiledMethodLinks = ["m_dpc.set_display_data"];
definition.slot.options["a26_dpc"].children[0].definition.compiledMethods = (() => {
    const __mame_table_0 = [0, 4, 5, 9, 6, 10, 11, 15];
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        let data_fetcher = ((((offset) & (7))) & 0xff);
        let data = ((255) & 0xff);
        if (((Number(offset) < Number(8)) ? 1 : 0)) {
            switch (((offset) & (6))) {
                case 0:
                case 2:
                    {
                        members.m_shift_reg = (((((((members.m_shift_reg ?? 0)) << (1))) | ((((~(((((((members.m_shift_reg ?? 0)) >>> (7))) ^ ((((members.m_shift_reg ?? 0)) >>> (5))))) ^ ((((((members.m_shift_reg ?? 0)) >>> (4))) ^ ((((members.m_shift_reg ?? 0)) >>> (3)))))))) & (1))))) & 0xff);
                        return (((members.m_shift_reg ?? 0)) & 0xff);
                    }
                case 4:
                    {
                        members.m_latch_62 = (((members.m_latch_64 ?? 0)) & 0xff);
                    }
                case 6:
                    {
                        members.m_latch_64 = (((((members.m_latch_62 ?? 0)) + (h_m_df[4].top))) & 0xff);
                        members.m_dlc = ((((((Number((((members.m_latch_62 ?? 0)) + (h_m_df[4].top))) > Number(255)) ? 1 : 0)) ? (1) : (0))) & 0xff);
                        data = ((0) & 0xff);
                        if ((((h_m_df[5].music_mode) && (h_m_df[5].flag)) ? 1 : 0)) {
                            data = ((((data) | (1))) & 0xff);
                        }
                        if ((((h_m_df[6].music_mode) && (h_m_df[6].flag)) ? 1 : 0)) {
                            data = ((((data) | (2))) & 0xff);
                        }
                        if ((((h_m_df[7].music_mode) && (h_m_df[7].flag)) ? 1 : 0)) {
                            data = ((((data) | (4))) & 0xff);
                        }
                        return (((((((members.m_dlc ?? 0)) ? ((((members.m_movamt ?? 0)) & (240))) : (0))) | ((__mame_table_0[((data) & 7)] ?? 0)))) & 0xff);
                    }
            }
        }
        else {
            let display_data = ((runtime.readIndex((members.m_displaydata ?? 0), (((~((h_m_df[data_fetcher].low) | (((h_m_df[data_fetcher].high) << (8)))))) & (2047)))) & 0xff);
            switch (((offset) & (56))) {
                case 8:
                    {
                        data = ((display_data) & 0xff);
                        break;
                    }
                case 16:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (display_data) : (0))) & 0xff);
                        break;
                    }
                case 24:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((((display_data) >>> (3)) & 1) << 7 | (((display_data) >>> (2)) & 1) << 6 | (((display_data) >>> (1)) & 1) << 5 | (((display_data) >>> (0)) & 1) << 4 | (((display_data) >>> (7)) & 1) << 3 | (((display_data) >>> (6)) & 1) << 2 | (((display_data) >>> (5)) & 1) << 1 | (((display_data) >>> (4)) & 1) << 0)) : (0))) & 0xff);
                        break;
                    }
                case 32:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((((display_data) >>> (0)) & 1) << 7 | (((display_data) >>> (1)) & 1) << 6 | (((display_data) >>> (2)) & 1) << 5 | (((display_data) >>> (3)) & 1) << 4 | (((display_data) >>> (4)) & 1) << 3 | (((display_data) >>> (5)) & 1) << 2 | (((display_data) >>> (6)) & 1) << 1 | (((display_data) >>> (7)) & 1) << 0)) : (0))) & 0xff);
                        break;
                    }
                case 40:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((display_data) >>> (1))) : (0))) & 0xff);
                        break;
                    }
                case 48:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (((display_data) << (1))) : (0))) & 0xff);
                        break;
                    }
                case 56:
                    {
                        data = ((((h_m_df[data_fetcher].flag) ? (255) : (0))) & 0xff);
                        break;
                    }
            }
            if ((((((Number(data_fetcher) < Number(5)) ? 1 : 0)) || (((h_m_df[data_fetcher].osc_clk) ? 0 : 1))) ? 1 : 0)) {
                method_decrement_counter(runtime, data_fetcher);
            }
        }
        return ((data) & 0xff);
    }
    function method_decrement_counter(runtime, data_fetcher) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        h_m_df[data_fetcher].low = ((((h_m_df[data_fetcher].low) - (1))) & 0xff);
        if (((Number(h_m_df[data_fetcher].low) === Number(255)) ? 1 : 0)) {
            h_m_df[data_fetcher].high = ((((h_m_df[data_fetcher].high) - (1))) & 0xff);
            if ((((((Number(data_fetcher) > Number(4)) ? 1 : 0)) && (h_m_df[data_fetcher].music_mode)) ? 1 : 0)) {
                h_m_df[data_fetcher].low = ((h_m_df[data_fetcher].top) & 0xff);
            }
        }
        method_check_flag(runtime, data_fetcher);
    }
    function method_check_flag(runtime, data_fetcher) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        if (((Number(h_m_df[data_fetcher].low) === Number(h_m_df[data_fetcher].top)) ? 1 : 0)) {
            h_m_df[data_fetcher].flag = ((1) & 0xff);
        }
        if (((Number(h_m_df[data_fetcher].low) === Number(h_m_df[data_fetcher].bottom)) ? 1 : 0)) {
            h_m_df[data_fetcher].flag = ((0) & 0xff);
        }
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        let data_fetcher = ((((offset) & (7))) & 0xff);
        switch (((offset) & (56))) {
            case 0:
                {
                    h_m_df[data_fetcher].top = ((data) & 0xff);
                    h_m_df[data_fetcher].flag = ((0) & 0xff);
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 8:
                {
                    h_m_df[data_fetcher].bottom = ((data) & 0xff);
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 16:
                {
                    h_m_df[data_fetcher].low = ((data) & 0xff);
                    if (((Number(data_fetcher) === Number(4)) ? 1 : 0)) {
                        members.m_latch_64 = ((data) & 0xff);
                    }
                    if ((((((Number(data_fetcher) > Number(4)) ? 1 : 0)) && (h_m_df[data_fetcher].music_mode)) ? 1 : 0)) {
                        h_m_df[data_fetcher].low = ((h_m_df[data_fetcher].top) & 0xff);
                    }
                    method_check_flag(runtime, data_fetcher);
                    break;
                }
            case 24:
                {
                    h_m_df[data_fetcher].high = ((data) & 0xff);
                    h_m_df[data_fetcher].music_mode = ((((data) & (16))) & 0xff);
                    h_m_df[data_fetcher].osc_clk = ((((data) & (32))) & 0xff);
                    if (((((((((Number(data_fetcher) > Number(4)) ? 1 : 0)) && (h_m_df[data_fetcher].music_mode)) ? 1 : 0)) && (((Number(h_m_df[data_fetcher].low) === Number(255)) ? 1 : 0))) ? 1 : 0)) {
                        h_m_df[data_fetcher].low = ((h_m_df[data_fetcher].top) & 0xff);
                        method_check_flag(runtime, data_fetcher);
                    }
                    break;
                }
            case 32:
                {
                    members.m_movamt = ((data) & 0xff);
                    break;
                }
            case 40:
                {
                    0;
                    break;
                }
            case 48:
                {
                    members.m_shift_reg = ((0) & 0xff);
                    break;
                }
            case 56:
                {
                    0;
                    break;
                }
        }
    }
    function method_oscillator_tick(runtime, param) {
        const members = runtime.members;
        const h_m_df = members.m_df ?? 0;
        for (let data_fetcher = ((5) | 0); ((Number(data_fetcher) < Number(8)) ? 1 : 0); data_fetcher = ((((data_fetcher) + (1))) | 0)) {
            if (h_m_df[data_fetcher].osc_clk) {
                method_decrement_counter(runtime, data_fetcher);
            }
        }
    }
    function method_set_display_data(runtime, data) {
        const members = runtime.members;
        members.m_displaydata = data;
    }
    function method_dpc_device__set_display_data(runtime, data) {
        const members = runtime.members;
        members.m_displaydata = data;
    }
    return {
        "read": method_read,
        "decrement_counter": method_decrement_counter,
        "check_flag": method_check_flag,
        "write": method_write,
        "oscillator_tick": method_oscillator_tick,
        "set_display_data": method_set_display_data,
        "dpc_device::set_display_data": method_dpc_device__set_display_data
    };
})();
definition.slot.options["a26_4in1"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_8in1"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.((((members.m_game_bank ?? 0)) + (offset))) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank
    };
})();
definition.slot.options["a26_32in1"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram
    };
})();
definition.slot.options["a26_x07"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_change_bank1(runtime, address) {
        const members = runtime.members;
        if (((Number((typeof (runtime.dereference(members.m_bank)).entry === 'function' ? (runtime.dereference(members.m_bank)).entry() : typeof (runtime.dereference(members.m_bank)).entry === 'number' || typeof (runtime.dereference(members.m_bank)).entry === 'boolean' ? (runtime.dereference(members.m_bank)).entry : runtime.container(members.m_bank, "entry"))) >= Number(14)) ? 1 : 0)) {
            if (((address) & (64))) {
                ((runtime.dereference(members.m_bank)).set_entry?.(15) ?? 0);
            }
            else {
                ((runtime.dereference(members.m_bank)).set_entry?.(14) ?? 0);
            }
        }
    }
    function method_change_bank2(runtime, address) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(((((address) >>> (4))) & (15))) ?? 0);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "change_bank1": method_change_bank1,
        "change_bank2": method_change_bank2
    };
})();
definition.slot.options["a26_harmony"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_read8_r(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_rom ?? 0), ((offset) + ((((members.m_base_bank ?? 0)) * (4096)))))) & 0xff);
    }
    function method_check_bankswitch(runtime, offset) {
        const members = runtime.members;
        switch (offset) {
            case 4086:
                {
                    members.m_base_bank = ((0) & 0xff);
                    break;
                }
            case 4087:
                {
                    members.m_base_bank = ((1) & 0xff);
                    break;
                }
            case 4088:
                {
                    members.m_base_bank = ((2) & 0xff);
                    break;
                }
            case 4089:
                {
                    members.m_base_bank = ((3) & 0xff);
                    break;
                }
            case 4090:
                {
                    members.m_base_bank = ((4) & 0xff);
                    break;
                }
            case 4091:
                {
                    members.m_base_bank = ((5) & 0xff);
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
        let retvalue = ((method_read8_r(runtime, ((offset) + (3072)))) & 0xff);
        method_check_bankswitch(runtime, offset);
        return ((retvalue) & 0xff);
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        method_check_bankswitch(runtime, offset);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "read8_r": method_read8_r,
        "check_bankswitch": method_check_bankswitch,
        "read": method_read,
        "write": method_write
    };
})();
definition.slot.options["a26_f0"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_vcs_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_vcs_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_vcs_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_is_ram_present(runtime, minimum_size) {
        const members = runtime.members;
        return ((Number((members.m_ram).length) >= Number(minimum_size)) ? 1 : 0);
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((runtime.readIndex((members.m_ram ?? 0), offset)) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        runtime.writeIndex(runtime.writableMember("m_ram"), offset, data);
    }
    function method_switch_bank(runtime, offset, data) {
        const members = runtime.members;
        ((runtime.dereference(members.m_bank)).set_entry?.(offset) ?? 0);
    }
    function method_get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    function method_a26_rom_f6_device__get_start_bank(runtime) {
        const members = runtime.members;
        return ((0) & 0xff);
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_ram_base": method_get_ram_base,
        "get_rom_size": method_get_rom_size,
        "get_ram_size": method_get_ram_size,
        "device_vcs_cart_interface::get_rom_base": method_device_vcs_cart_interface__get_rom_base,
        "device_vcs_cart_interface::get_ram_base": method_device_vcs_cart_interface__get_ram_base,
        "device_vcs_cart_interface::get_rom_size": method_device_vcs_cart_interface__get_rom_size,
        "device_vcs_cart_interface::get_ram_size": method_device_vcs_cart_interface__get_ram_size,
        "is_ram_present": method_is_ram_present,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "switch_bank": method_switch_bank,
        "get_start_bank": method_get_start_bank,
        "a26_rom_f6_device::get_start_bank": method_a26_rom_f6_device__get_start_bank
    };
})();
export const device = definition;
export default device;
