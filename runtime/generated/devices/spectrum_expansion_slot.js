import deviceData from './spectrum_expansion_slot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_card = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
    }
    function method_romcs(runtime) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            return (typeof (runtime.dereference(members.m_card)).romcs === 'function' ? (runtime.dereference(members.m_card)).romcs() : typeof (runtime.dereference(members.m_card)).romcs === 'number' || typeof (runtime.dereference(members.m_card)).romcs === 'boolean' ? (runtime.dereference(members.m_card)).romcs : runtime.container(members.m_card, "romcs"));
        }
        else {
            return 0;
        }
    }
    function method_pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            ((runtime.dereference(members.m_card)).pre_opcode_fetch?.(offset) ?? 0);
        }
    }
    function method_post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            ((runtime.dereference(members.m_card)).post_opcode_fetch?.(offset) ?? 0);
        }
    }
    function method_pre_data_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            ((runtime.dereference(members.m_card)).pre_data_fetch?.(offset) ?? 0);
        }
    }
    function method_post_data_fetch(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            ((runtime.dereference(members.m_card)).post_data_fetch?.(offset) ?? 0);
        }
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            return ((((runtime.dereference(members.m_card)).iorq_r?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((((((offset) & (1))) ? (method_fb_r(runtime)) : (255))) & 0xff);
        }
    }
    function method_fb_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (((__l["m_fb_r_handler"] ? __l["m_fb_r_handler"]() : typeof members.m_fb_r_handler === 'function' ? members.m_fb_r_handler() : runtime.invoke("m_fb_r_handler"))) & 0xff);
    }
    function method_iorq_w(runtime, offset, data) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            ((runtime.dereference(members.m_card)).iorq_w?.(offset, data) ?? 0);
        }
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            return ((((runtime.dereference(members.m_card)).mreq_r?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_mreq_w(runtime, offset, data) {
        const members = runtime.members;
        if ((members.m_card ?? 0)) {
            ((runtime.dereference(members.m_card)).mreq_w?.(offset, data) ?? 0);
        }
    }
    function method_spectrum_expansion_slot_device(runtime, mconfig, tag, owner, slot_options, default_option) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0));
    }
    function method_irq_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_irq_handler)).bind === 'function' ? (runtime.dereference(members.m_irq_handler)).bind() : typeof (runtime.dereference(members.m_irq_handler)).bind === 'number' || typeof (runtime.dereference(members.m_irq_handler)).bind === 'boolean' ? (runtime.dereference(members.m_irq_handler)).bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function method_nmi_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_nmi_handler)).bind === 'function' ? (runtime.dereference(members.m_nmi_handler)).bind() : typeof (runtime.dereference(members.m_nmi_handler)).bind === 'number' || typeof (runtime.dereference(members.m_nmi_handler)).bind === 'boolean' ? (runtime.dereference(members.m_nmi_handler)).bind : runtime.container(members.m_nmi_handler, "bind"));
    }
    function method_fb_r_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_fb_r_handler)).bind === 'function' ? (runtime.dereference(members.m_fb_r_handler)).bind() : typeof (runtime.dereference(members.m_fb_r_handler)).bind === 'number' || typeof (runtime.dereference(members.m_fb_r_handler)).bind === 'boolean' ? (runtime.dereference(members.m_fb_r_handler)).bind : runtime.container(members.m_fb_r_handler, "bind"));
    }
    function method_irq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(state)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(state) : runtime.invoke("m_irq_handler", state));
    }
    function method_nmi_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_nmi_handler"] ? __l["m_nmi_handler"](Number(state)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(state) : runtime.invoke("m_nmi_handler", state));
    }
    function method_spectrum_expansion_slot_device__spectrum_expansion_slot_device(runtime, mconfig, tag, owner, slot_options, default_option) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](slot_options) : runtime.macro("std::forward", slot_options)), default_option, 0));
    }
    function method_spectrum_expansion_slot_device__irq_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_irq_handler)).bind === 'function' ? (runtime.dereference(members.m_irq_handler)).bind() : typeof (runtime.dereference(members.m_irq_handler)).bind === 'number' || typeof (runtime.dereference(members.m_irq_handler)).bind === 'boolean' ? (runtime.dereference(members.m_irq_handler)).bind : runtime.container(members.m_irq_handler, "bind"));
    }
    function method_spectrum_expansion_slot_device__nmi_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_nmi_handler)).bind === 'function' ? (runtime.dereference(members.m_nmi_handler)).bind() : typeof (runtime.dereference(members.m_nmi_handler)).bind === 'number' || typeof (runtime.dereference(members.m_nmi_handler)).bind === 'boolean' ? (runtime.dereference(members.m_nmi_handler)).bind : runtime.container(members.m_nmi_handler, "bind"));
    }
    function method_spectrum_expansion_slot_device__fb_r_handler(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_fb_r_handler)).bind === 'function' ? (runtime.dereference(members.m_fb_r_handler)).bind() : typeof (runtime.dereference(members.m_fb_r_handler)).bind === 'number' || typeof (runtime.dereference(members.m_fb_r_handler)).bind === 'boolean' ? (runtime.dereference(members.m_fb_r_handler)).bind : runtime.container(members.m_fb_r_handler, "bind"));
    }
    function method_spectrum_expansion_slot_device__irq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_irq_handler"] ? __l["m_irq_handler"](Number(state)) : typeof members.m_irq_handler === 'function' ? members.m_irq_handler(state) : runtime.invoke("m_irq_handler", state));
    }
    function method_spectrum_expansion_slot_device__nmi_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_nmi_handler"] ? __l["m_nmi_handler"](Number(state)) : typeof members.m_nmi_handler === 'function' ? members.m_nmi_handler(state) : runtime.invoke("m_nmi_handler", state));
    }
    function method_spectrum_expansion_slot_device__fb_r(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (((__l["m_fb_r_handler"] ? __l["m_fb_r_handler"]() : typeof members.m_fb_r_handler === 'function' ? members.m_fb_r_handler() : runtime.invoke("m_fb_r_handler"))) & 0xff);
    }
    return {
        "device_start": method_device_start,
        "romcs": method_romcs,
        "pre_opcode_fetch": method_pre_opcode_fetch,
        "post_opcode_fetch": method_post_opcode_fetch,
        "pre_data_fetch": method_pre_data_fetch,
        "post_data_fetch": method_post_data_fetch,
        "iorq_r": method_iorq_r,
        "fb_r": method_fb_r,
        "iorq_w": method_iorq_w,
        "mreq_r": method_mreq_r,
        "mreq_w": method_mreq_w,
        "spectrum_expansion_slot_device": method_spectrum_expansion_slot_device,
        "irq_handler": method_irq_handler,
        "nmi_handler": method_nmi_handler,
        "fb_r_handler": method_fb_r_handler,
        "irq_w": method_irq_w,
        "nmi_w": method_nmi_w,
        "spectrum_expansion_slot_device::spectrum_expansion_slot_device": method_spectrum_expansion_slot_device__spectrum_expansion_slot_device,
        "spectrum_expansion_slot_device::irq_handler": method_spectrum_expansion_slot_device__irq_handler,
        "spectrum_expansion_slot_device::nmi_handler": method_spectrum_expansion_slot_device__nmi_handler,
        "spectrum_expansion_slot_device::fb_r_handler": method_spectrum_expansion_slot_device__fb_r_handler,
        "spectrum_expansion_slot_device::irq_w": method_spectrum_expansion_slot_device__irq_w,
        "spectrum_expansion_slot_device::nmi_w": method_spectrum_expansion_slot_device__nmi_w,
        "spectrum_expansion_slot_device::fb_r": method_spectrum_expansion_slot_device__fb_r
    };
})();
definition.compiledMethodLinks = ["get_card_device", "m_fb_r_handler", "m_irq_handler", "m_nmi_handler", "set_options", "std::forward"];
definition.slot.options["intf2"].compiledMethods = (() => {
    function method_pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_cart = members.m_cart ?? 0;
        if ((((h_m_cart) && ((__l["m_cart.exists"] ? __l["m_cart.exists"]() : ((members.m_cart)?.exists?.() ?? 0)))) ? 1 : 0)) {
            return ((runtime.readIndex((__l["m_cart.get_rom_base"] ? __l["m_cart.get_rom_base"]() : ((members.m_cart)?.get_rom_base?.() ?? 0)), ((offset) & (16383)))) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_mreq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        let data = ((((((offset) & (1))) ? ((typeof (runtime.dereference(members.m_slot)).fb_r === 'function' ? (runtime.dereference(members.m_slot)).fb_r() : typeof (runtime.dereference(members.m_slot)).fb_r === 'number' || typeof (runtime.dereference(members.m_slot)).fb_r === 'boolean' ? (runtime.dereference(members.m_slot)).fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
        switch (((offset) & (255))) {
            case 254:
                {
                    if (((Number(((runtime.shiftRight(offset, 8)) & (8))) === Number(0)) ? 1 : 0)) {
                        data = (((((typeof (runtime.dereference(members.m_exp_line3)).read === 'function' ? (runtime.dereference(members.m_exp_line3)).read() : typeof (runtime.dereference(members.m_exp_line3)).read === 'number' || typeof (runtime.dereference(members.m_exp_line3)).read === 'boolean' ? (runtime.dereference(members.m_exp_line3)).read : runtime.container(members.m_exp_line3, "read"))) | (224))) & 0xff);
                    }
                    if (((Number(((runtime.shiftRight(offset, 8)) & (16))) === Number(0)) ? 1 : 0)) {
                        data = (((((typeof (runtime.dereference(members.m_exp_line4)).read === 'function' ? (runtime.dereference(members.m_exp_line4)).read() : typeof (runtime.dereference(members.m_exp_line4)).read === 'number' || typeof (runtime.dereference(members.m_exp_line4)).read === 'boolean' ? (runtime.dereference(members.m_exp_line4)).read : runtime.container(members.m_exp_line4, "read"))) | (224))) & 0xff);
                    }
                    break;
                }
        }
        return ((data) & 0xff);
    }
    function method_iorq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_romcs(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        const h_m_cart = members.m_cart ?? 0;
        if ((((h_m_cart) && ((__l["m_cart.exists"] ? __l["m_cart.exists"]() : ((members.m_cart)?.exists?.() ?? 0)))) ? 1 : 0)) {
            return 1;
        }
        else {
            return 0;
        }
    }
    function method_device_spectrum_expansion_interface__pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__mreq_r(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_spectrum_expansion_interface__mreq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__iorq_r(runtime, offset) {
        const members = runtime.members;
        return ((((((offset) & (1))) ? ((typeof (runtime.dereference(members.m_slot)).fb_r === 'function' ? (runtime.dereference(members.m_slot)).fb_r() : typeof (runtime.dereference(members.m_slot)).fb_r === 'number' || typeof (runtime.dereference(members.m_slot)).fb_r === 'boolean' ? (runtime.dereference(members.m_slot)).fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
    }
    function method_device_spectrum_expansion_interface__iorq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__romcs(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    return {
        "pre_opcode_fetch": method_pre_opcode_fetch,
        "post_opcode_fetch": method_post_opcode_fetch,
        "pre_data_fetch": method_pre_data_fetch,
        "post_data_fetch": method_post_data_fetch,
        "mreq_r": method_mreq_r,
        "mreq_w": method_mreq_w,
        "iorq_r": method_iorq_r,
        "iorq_w": method_iorq_w,
        "romcs": method_romcs,
        "device_spectrum_expansion_interface::pre_opcode_fetch": method_device_spectrum_expansion_interface__pre_opcode_fetch,
        "device_spectrum_expansion_interface::post_opcode_fetch": method_device_spectrum_expansion_interface__post_opcode_fetch,
        "device_spectrum_expansion_interface::pre_data_fetch": method_device_spectrum_expansion_interface__pre_data_fetch,
        "device_spectrum_expansion_interface::post_data_fetch": method_device_spectrum_expansion_interface__post_data_fetch,
        "device_spectrum_expansion_interface::mreq_r": method_device_spectrum_expansion_interface__mreq_r,
        "device_spectrum_expansion_interface::mreq_w": method_device_spectrum_expansion_interface__mreq_w,
        "device_spectrum_expansion_interface::iorq_r": method_device_spectrum_expansion_interface__iorq_r,
        "device_spectrum_expansion_interface::iorq_w": method_device_spectrum_expansion_interface__iorq_w,
        "device_spectrum_expansion_interface::romcs": method_device_spectrum_expansion_interface__romcs,
        "device_start": method_device_start
    };
})();
definition.slot.options["intf2"].compiledMethodLinks = ["m_cart.exists", "m_cart.get_rom_base"];
definition.slot.options["intf2"].children[0].definition.compiledMethods = (() => {
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_cart = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
        (typeof (runtime.dereference(members.m_device_image_load)).resolve === 'function' ? (runtime.dereference(members.m_device_image_load)).resolve() : typeof (runtime.dereference(members.m_device_image_load)).resolve === 'number' || typeof (runtime.dereference(members.m_device_image_load)).resolve === 'boolean' ? (runtime.dereference(members.m_device_image_load)).resolve : runtime.container(members.m_device_image_load, "resolve"));
        (typeof (runtime.dereference(members.m_device_image_unload)).resolve === 'function' ? (runtime.dereference(members.m_device_image_unload)).resolve() : typeof (runtime.dereference(members.m_device_image_unload)).resolve === 'number' || typeof (runtime.dereference(members.m_device_image_unload)).resolve === 'boolean' ? (runtime.dereference(members.m_device_image_unload)).resolve : runtime.container(members.m_device_image_unload, "resolve"));
    }
    function method_call_load(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return (__l["std::make_pair"] ? __l["std::make_pair"]((__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))));
        }
        else {
            if ((((__l["m_device_image_load.isnull"]?.() ?? 0)) ? 0 : 1)) {
                return (__l["m_device_image_load"] ? __l["m_device_image_load"](runtime.dereference((members.this ?? 0))) : runtime.macro("m_device_image_load", runtime.dereference((members.this ?? 0))));
            }
            else {
                let len = ((method_common_get_size(runtime, "rom")) >>> 0);
                method_rom_alloc(runtime, len, (members.m_width ?? 0), (members.m_endianness ?? 0));
                method_common_load_rom(runtime, method_get_rom_base(runtime), len, "rom");
                return (__l["std::make_pair"] ? __l["std::make_pair"]((__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))) : runtime.macro("std::make_pair", (__l["std::error_condition"] ? __l["std::error_condition"]() : runtime.macro("std::error_condition")), (__l["std::string"] ? __l["std::string"]() : runtime.macro("std::string"))));
            }
        }
    }
    function method_common_get_size(runtime, region) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["assert"] ? __l["assert"](((((((__l["loaded_through_softlist"] ? __l["loaded_through_softlist"]() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) || (((region) ? 1 : 0))) ? 1 : 0)) : runtime.macro("assert", ((((((__l["loaded_through_softlist"] ? __l["loaded_through_softlist"]() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) || (((region) ? 1 : 0))) ? 1 : 0)));
        return (((((__l["loaded_through_softlist"] ? __l["loaded_through_softlist"]() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) ? ((__l["length"] ? __l["length"]() : runtime.macro("length"))) : ((__l["get_software_region_length"] ? __l["get_software_region_length"](region) : runtime.macro("get_software_region_length", region))));
    }
    function method_rom_alloc(runtime, size, width, end) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((members.m_cart ?? 0)) {
            ((runtime.dereference(members.m_cart)).rom_alloc?.(size, width, end, (__l["tag"] ? __l["tag"]() : runtime.macro("tag"))) ?? 0);
        }
    }
    function method_common_load_rom(runtime, ROM, len, region) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        0;
        (__l["assert"] ? __l["assert"](((((((__l["loaded_through_softlist"] ? __l["loaded_through_softlist"]() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) || (((region) ? 1 : 0))) ? 1 : 0)) : runtime.macro("assert", ((((((__l["loaded_through_softlist"] ? __l["loaded_through_softlist"]() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) || (((region) ? 1 : 0))) ? 1 : 0)));
        if ((((__l["loaded_through_softlist"] ? __l["loaded_through_softlist"]() : runtime.macro("loaded_through_softlist"))) ? 0 : 1)) {
            (__l["fread"] ? __l["fread"](ROM, len) : runtime.macro("fread", ROM, len));
        }
        else {
            (__l["memcpy"] ? __l["memcpy"](ROM, (__l["get_software_region"] ? __l["get_software_region"](region) : runtime.macro("get_software_region", region)), len) : runtime.macro("memcpy", ROM, (__l["get_software_region"] ? __l["get_software_region"](region) : runtime.macro("get_software_region", region)), len));
        }
    }
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return 0;
        }
        else {
            if ((((__l["user_loadable"] ? __l["user_loadable"]() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (typeof (runtime.dereference(members.m_cart)).get_region_base === 'function' ? (runtime.dereference(members.m_cart)).get_region_base() : typeof (runtime.dereference(members.m_cart)).get_region_base === 'number' || typeof (runtime.dereference(members.m_cart)).get_region_base === 'boolean' ? (runtime.dereference(members.m_cart)).get_region_base : runtime.container(members.m_cart, "get_region_base"));
            }
            else {
                return (typeof (runtime.dereference(members.m_cart)).get_rom_base === 'function' ? (runtime.dereference(members.m_cart)).get_rom_base() : typeof (runtime.dereference(members.m_cart)).get_rom_base === 'number' || typeof (runtime.dereference(members.m_cart)).get_rom_base === 'boolean' ? (runtime.dereference(members.m_cart)).get_rom_base : runtime.container(members.m_cart, "get_rom_base"));
            }
        }
    }
    function method_call_unload(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((__l["m_device_image_unload.isnull"]?.() ?? 0)) ? 0 : 1)) {
            return (__l["m_device_image_unload"] ? __l["m_device_image_unload"](runtime.dereference((members.this ?? 0))) : runtime.macro("m_device_image_unload", runtime.dereference((members.this ?? 0))));
        }
    }
    function method_get_default_card_software(runtime, hook) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["software_get_default_slot"] ? __l["software_get_default_slot"]((members.m_default_card ?? 0)) : runtime.macro("software_get_default_slot", (members.m_default_card ?? 0)));
    }
    function method_read_rom(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return ((((runtime.dereference(members.m_cart)).read_rom?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read16_rom(runtime, offset, mem_mask = 65535) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return ((((runtime.dereference(members.m_cart)).read16_rom?.(offset, mem_mask) ?? 0)) & 0xffff);
        }
        else {
            return ((65535) & 0xffff);
        }
    }
    function method_read32_rom(runtime, offset, mem_mask = 4294967295) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return ((runtime.dereference(members.m_cart)).read32_rom?.(offset, mem_mask) ?? 0);
        }
        else {
            return 4294967295;
        }
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            return ((((runtime.dereference(members.m_cart)).read_ram?.(offset) ?? 0)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            ((runtime.dereference(members.m_cart)).write_ram?.(offset, data) ?? 0);
        }
    }
    function method_set_interface(runtime, $interface) {
        const members = runtime.members;
        members.m_interface = $interface;
    }
    function method_set_default_card(runtime, def) {
        const members = runtime.members;
        members.m_default_card = def;
    }
    function method_set_extensions(runtime, exts) {
        const members = runtime.members;
        members.m_extensions = exts;
    }
    function method_set_width(runtime, width) {
        const members = runtime.members;
        members.m_width = ((width) | 0);
    }
    function method_set_endian(runtime, end) {
        const members = runtime.members;
        members.m_endianness = end;
    }
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_image_interface(runtime) {
        const members = runtime.members;
        return (members.m_interface ?? 0);
    }
    function method_file_extensions(runtime) {
        const members = runtime.members;
        return (members.m_extensions ?? 0);
    }
    function method_ram_alloc(runtime, size) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            ((runtime.dereference(members.m_cart)).ram_alloc?.(size) ?? 0);
        }
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return 0;
        }
        else {
            if ((((__l["user_loadable"] ? __l["user_loadable"]() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (typeof (runtime.dereference(members.m_cart)).get_region_size === 'function' ? (runtime.dereference(members.m_cart)).get_region_size() : typeof (runtime.dereference(members.m_cart)).get_region_size === 'number' || typeof (runtime.dereference(members.m_cart)).get_region_size === 'boolean' ? (runtime.dereference(members.m_cart)).get_region_size : runtime.container(members.m_cart, "get_region_size"));
            }
            else {
                return (typeof (runtime.dereference(members.m_cart)).get_rom_size === 'function' ? (runtime.dereference(members.m_cart)).get_rom_size() : typeof (runtime.dereference(members.m_cart)).get_rom_size === 'number' || typeof (runtime.dereference(members.m_cart)).get_rom_size === 'boolean' ? (runtime.dereference(members.m_cart)).get_rom_size : runtime.container(members.m_cart, "get_rom_size"));
            }
        }
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return (((members.m_cart ?? 0)) ? ((typeof (runtime.dereference(members.m_cart)).get_ram_base === 'function' ? (runtime.dereference(members.m_cart)).get_ram_base() : typeof (runtime.dereference(members.m_cart)).get_ram_base === 'number' || typeof (runtime.dereference(members.m_cart)).get_ram_base === 'boolean' ? (runtime.dereference(members.m_cart)).get_ram_base : runtime.container(members.m_cart, "get_ram_base"))) : (0));
    }
    function method_save_ram(runtime) {
        const members = runtime.members;
        if (((((members.m_cart ?? 0)) && ((typeof (runtime.dereference(members.m_cart)).get_ram_size === 'function' ? (runtime.dereference(members.m_cart)).get_ram_size() : typeof (runtime.dereference(members.m_cart)).get_ram_size === 'number' || typeof (runtime.dereference(members.m_cart)).get_ram_size === 'boolean' ? (runtime.dereference(members.m_cart)).get_ram_size : runtime.container(members.m_cart, "get_ram_size")))) ? 1 : 0)) {
            (typeof (runtime.dereference(members.m_cart)).save_ram === 'function' ? (runtime.dereference(members.m_cart)).save_ram() : typeof (runtime.dereference(members.m_cart)).save_ram === 'number' || typeof (runtime.dereference(members.m_cart)).save_ram === 'boolean' ? (runtime.dereference(members.m_cart)).save_ram : runtime.container(members.m_cart, "save_ram"));
        }
    }
    function method_generic_slot_device__set_interface(runtime, $interface) {
        const members = runtime.members;
        members.m_interface = $interface;
    }
    function method_generic_slot_device__set_default_card(runtime, def) {
        const members = runtime.members;
        members.m_default_card = def;
    }
    function method_generic_slot_device__set_extensions(runtime, exts) {
        const members = runtime.members;
        members.m_extensions = exts;
    }
    function method_generic_slot_device__set_width(runtime, width) {
        const members = runtime.members;
        members.m_width = ((width) | 0);
    }
    function method_generic_slot_device__set_endian(runtime, end) {
        const members = runtime.members;
        members.m_endianness = end;
    }
    function method_generic_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_generic_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return (members.m_interface ?? 0);
    }
    function method_generic_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return (members.m_extensions ?? 0);
    }
    function method_generic_slot_device__rom_alloc(runtime, size, width, end) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((members.m_cart ?? 0)) {
            ((runtime.dereference(members.m_cart)).rom_alloc?.(size, width, end, (__l["tag"] ? __l["tag"]() : runtime.macro("tag"))) ?? 0);
        }
    }
    function method_generic_slot_device__ram_alloc(runtime, size) {
        const members = runtime.members;
        if ((members.m_cart ?? 0)) {
            ((runtime.dereference(members.m_cart)).ram_alloc?.(size) ?? 0);
        }
    }
    function method_generic_slot_device__get_rom_base(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return 0;
        }
        else {
            if ((((__l["user_loadable"] ? __l["user_loadable"]() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (typeof (runtime.dereference(members.m_cart)).get_region_base === 'function' ? (runtime.dereference(members.m_cart)).get_region_base() : typeof (runtime.dereference(members.m_cart)).get_region_base === 'number' || typeof (runtime.dereference(members.m_cart)).get_region_base === 'boolean' ? (runtime.dereference(members.m_cart)).get_region_base : runtime.container(members.m_cart, "get_region_base"));
            }
            else {
                return (typeof (runtime.dereference(members.m_cart)).get_rom_base === 'function' ? (runtime.dereference(members.m_cart)).get_rom_base() : typeof (runtime.dereference(members.m_cart)).get_rom_base === 'number' || typeof (runtime.dereference(members.m_cart)).get_rom_base === 'boolean' ? (runtime.dereference(members.m_cart)).get_rom_base : runtime.container(members.m_cart, "get_rom_base"));
            }
        }
    }
    function method_generic_slot_device__get_rom_size(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if ((((members.m_cart ?? 0)) ? 0 : 1)) {
            return 0;
        }
        else {
            if ((((__l["user_loadable"] ? __l["user_loadable"]() : runtime.macro("user_loadable"))) ? 0 : 1)) {
                return (typeof (runtime.dereference(members.m_cart)).get_region_size === 'function' ? (runtime.dereference(members.m_cart)).get_region_size() : typeof (runtime.dereference(members.m_cart)).get_region_size === 'number' || typeof (runtime.dereference(members.m_cart)).get_region_size === 'boolean' ? (runtime.dereference(members.m_cart)).get_region_size : runtime.container(members.m_cart, "get_region_size"));
            }
            else {
                return (typeof (runtime.dereference(members.m_cart)).get_rom_size === 'function' ? (runtime.dereference(members.m_cart)).get_rom_size() : typeof (runtime.dereference(members.m_cart)).get_rom_size === 'number' || typeof (runtime.dereference(members.m_cart)).get_rom_size === 'boolean' ? (runtime.dereference(members.m_cart)).get_rom_size : runtime.container(members.m_cart, "get_rom_size"));
            }
        }
    }
    function method_generic_slot_device__get_ram_base(runtime) {
        const members = runtime.members;
        return (((members.m_cart ?? 0)) ? ((typeof (runtime.dereference(members.m_cart)).get_ram_base === 'function' ? (runtime.dereference(members.m_cart)).get_ram_base() : typeof (runtime.dereference(members.m_cart)).get_ram_base === 'number' || typeof (runtime.dereference(members.m_cart)).get_ram_base === 'boolean' ? (runtime.dereference(members.m_cart)).get_ram_base : runtime.container(members.m_cart, "get_ram_base"))) : (0));
    }
    function method_generic_slot_device__save_ram(runtime) {
        const members = runtime.members;
        if (((((members.m_cart ?? 0)) && ((typeof (runtime.dereference(members.m_cart)).get_ram_size === 'function' ? (runtime.dereference(members.m_cart)).get_ram_size() : typeof (runtime.dereference(members.m_cart)).get_ram_size === 'number' || typeof (runtime.dereference(members.m_cart)).get_ram_size === 'boolean' ? (runtime.dereference(members.m_cart)).get_ram_size : runtime.container(members.m_cart, "get_ram_size")))) ? 1 : 0)) {
            (typeof (runtime.dereference(members.m_cart)).save_ram === 'function' ? (runtime.dereference(members.m_cart)).save_ram() : typeof (runtime.dereference(members.m_cart)).save_ram === 'number' || typeof (runtime.dereference(members.m_cart)).save_ram === 'boolean' ? (runtime.dereference(members.m_cart)).save_ram : runtime.container(members.m_cart, "save_ram"));
        }
    }
    function method_generic_cartslot_device(runtime, mconfig, tag, owner, opts, intf, exts = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["opts"] ? __l["opts"](runtime.dereference((members.this ?? 0))) : runtime.macro("opts", runtime.dereference((members.this ?? 0))));
        (__l["set_fixed"] ? __l["set_fixed"](0) : runtime.macro("set_fixed", 0));
        method_set_interface(runtime, intf);
        if (exts) {
            method_set_extensions(runtime, exts);
        }
    }
    function method_generic_cartslot_device__generic_cartslot_device(runtime, mconfig, tag, owner, opts, intf, exts = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["opts"] ? __l["opts"](runtime.dereference((members.this ?? 0))) : runtime.macro("opts", runtime.dereference((members.this ?? 0))));
        (__l["set_fixed"] ? __l["set_fixed"](0) : runtime.macro("set_fixed", 0));
        method_set_interface(runtime, intf);
        if (exts) {
            method_set_extensions(runtime, exts);
        }
    }
    function method_generic_cartslot_device__image_type_name(runtime) {
        const members = runtime.members;
        return "cartridge";
    }
    function method_generic_cartslot_device__image_brief_type_name(runtime) {
        const members = runtime.members;
        return "cart";
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
        "device_start": method_device_start,
        "call_load": method_call_load,
        "common_get_size": method_common_get_size,
        "rom_alloc": method_rom_alloc,
        "common_load_rom": method_common_load_rom,
        "get_rom_base": method_get_rom_base,
        "call_unload": method_call_unload,
        "get_default_card_software": method_get_default_card_software,
        "read_rom": method_read_rom,
        "read16_rom": method_read16_rom,
        "read32_rom": method_read32_rom,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "set_interface": method_set_interface,
        "set_default_card": method_set_default_card,
        "set_extensions": method_set_extensions,
        "set_width": method_set_width,
        "set_endian": method_set_endian,
        "is_reset_on_load": method_is_reset_on_load,
        "image_interface": method_image_interface,
        "file_extensions": method_file_extensions,
        "ram_alloc": method_ram_alloc,
        "get_rom_size": method_get_rom_size,
        "get_ram_base": method_get_ram_base,
        "save_ram": method_save_ram,
        "generic_slot_device::set_interface": method_generic_slot_device__set_interface,
        "generic_slot_device::set_default_card": method_generic_slot_device__set_default_card,
        "generic_slot_device::set_extensions": method_generic_slot_device__set_extensions,
        "generic_slot_device::set_width": method_generic_slot_device__set_width,
        "generic_slot_device::set_endian": method_generic_slot_device__set_endian,
        "generic_slot_device::is_reset_on_load": method_generic_slot_device__is_reset_on_load,
        "generic_slot_device::image_interface": method_generic_slot_device__image_interface,
        "generic_slot_device::file_extensions": method_generic_slot_device__file_extensions,
        "generic_slot_device::rom_alloc": method_generic_slot_device__rom_alloc,
        "generic_slot_device::ram_alloc": method_generic_slot_device__ram_alloc,
        "generic_slot_device::get_rom_base": method_generic_slot_device__get_rom_base,
        "generic_slot_device::get_rom_size": method_generic_slot_device__get_rom_size,
        "generic_slot_device::get_ram_base": method_generic_slot_device__get_ram_base,
        "generic_slot_device::save_ram": method_generic_slot_device__save_ram,
        "generic_cartslot_device": method_generic_cartslot_device,
        "generic_cartslot_device::generic_cartslot_device": method_generic_cartslot_device__generic_cartslot_device,
        "generic_cartslot_device::image_type_name": method_generic_cartslot_device__image_type_name,
        "generic_cartslot_device::image_brief_type_name": method_generic_cartslot_device__image_brief_type_name
    };
})();
definition.slot.options["intf2"].children[0].definition.compiledMethodLinks = ["assert", "fread", "get_card_device", "get_software_region", "get_software_region_length", "length", "loaded_through_softlist", "m_device_image_load", "m_device_image_load.isnull", "m_device_image_unload", "m_device_image_unload.isnull", "memcpy", "opts", "rom_software_list_loader::instance", "set_fixed", "software_get_default_slot", "std::error_condition", "std::make_pair", "std::string", "tag", "user_loadable"];
definition.slot.options["intf2"].children[0].definition.slot.options["rom"].compiledMethods = (() => {
    function method_get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_get_region_base(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_region)).found === 'function' ? (runtime.dereference(members.m_region)).found() : typeof (runtime.dereference(members.m_region)).found === 'number' || typeof (runtime.dereference(members.m_region)).found === 'boolean' ? (runtime.dereference(members.m_region)).found : runtime.container(members.m_region, "found"))) ? ((typeof (runtime.dereference(members.m_region)).base === 'function' ? (runtime.dereference(members.m_region)).base() : typeof (runtime.dereference(members.m_region)).base === 'number' || typeof (runtime.dereference(members.m_region)).base === 'boolean' ? (runtime.dereference(members.m_region)).base : runtime.container(members.m_region, "base"))) : (0));
    }
    function method_get_region_size(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_region)).found === 'function' ? (runtime.dereference(members.m_region)).found() : typeof (runtime.dereference(members.m_region)).found === 'number' || typeof (runtime.dereference(members.m_region)).found === 'boolean' ? (runtime.dereference(members.m_region)).found : runtime.container(members.m_region, "found"))) ? (runtime.container(members.m_region, "bytes")) : (0));
    }
    function method_get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_read_rom(runtime, offset) {
        const members = runtime.members;
        if (((Number(offset) < Number((members.m_rom_size ?? 0))) ? 1 : 0)) {
            return ((runtime.readIndex((members.m_rom ?? 0), offset)) & 0xff);
        }
        else {
            return ((255) & 0xff);
        }
    }
    function method_read_ram(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_write_ram(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_generic_cart_interface__get_rom_base(runtime) {
        const members = runtime.members;
        return (members.m_rom ?? 0);
    }
    function method_device_generic_cart_interface__get_rom_size(runtime) {
        const members = runtime.members;
        return (members.m_rom_size ?? 0);
    }
    function method_device_generic_cart_interface__get_region_base(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_region)).found === 'function' ? (runtime.dereference(members.m_region)).found() : typeof (runtime.dereference(members.m_region)).found === 'number' || typeof (runtime.dereference(members.m_region)).found === 'boolean' ? (runtime.dereference(members.m_region)).found : runtime.container(members.m_region, "found"))) ? ((typeof (runtime.dereference(members.m_region)).base === 'function' ? (runtime.dereference(members.m_region)).base() : typeof (runtime.dereference(members.m_region)).base === 'number' || typeof (runtime.dereference(members.m_region)).base === 'boolean' ? (runtime.dereference(members.m_region)).base : runtime.container(members.m_region, "base"))) : (0));
    }
    function method_device_generic_cart_interface__get_region_size(runtime) {
        const members = runtime.members;
        return (((typeof (runtime.dereference(members.m_region)).found === 'function' ? (runtime.dereference(members.m_region)).found() : typeof (runtime.dereference(members.m_region)).found === 'number' || typeof (runtime.dereference(members.m_region)).found === 'boolean' ? (runtime.dereference(members.m_region)).found : runtime.container(members.m_region, "found"))) ? (runtime.container(members.m_region, "bytes")) : (0));
    }
    function method_device_generic_cart_interface__get_ram_base(runtime) {
        const members = runtime.members;
        return runtime.addressOf((members.m_ram ?? 0), 0);
    }
    function method_device_generic_cart_interface__get_ram_size(runtime) {
        const members = runtime.members;
        return (members.m_ram).length;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    function method_generic_rom_device__device_start(runtime) {
        const members = runtime.members;
    }
    function method_device_generic_cart_interface__read_rom(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_install_non_power_of_two__5(runtime, length, decode_limit, decode_offset, base, install) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let decode_mask = ((length) - (1));
        for (let i = runtime.subtract((__l["std::bit_width"] ? __l["std::bit_width"](decode_mask) : runtime.macro("std::bit_width", decode_mask)), 1); ((Number(0) < Number(i)) ? 1 : 0); i = ((i) - (1))) {
            if ((((((decode_mask) >>> (((i) - (1)))) & 1)) ? 0 : 1)) {
                decode_mask = ((decode_mask) & ((~((((1) << (i))) - (1)))));
                break;
            }
        }
        runtime.invoke("install_non_power_of_two__6", length, decode_limit, decode_mask, decode_offset, base, (__l["std::forward"] ? __l["std::forward"](install) : runtime.macro("std::forward", install)));
    }
    return {
        "get_rom_base": method_get_rom_base,
        "get_rom_size": method_get_rom_size,
        "get_region_base": method_get_region_base,
        "get_region_size": method_get_region_size,
        "get_ram_base": method_get_ram_base,
        "get_ram_size": method_get_ram_size,
        "read_rom": method_read_rom,
        "read_ram": method_read_ram,
        "write_ram": method_write_ram,
        "device_generic_cart_interface::get_rom_base": method_device_generic_cart_interface__get_rom_base,
        "device_generic_cart_interface::get_rom_size": method_device_generic_cart_interface__get_rom_size,
        "device_generic_cart_interface::get_region_base": method_device_generic_cart_interface__get_region_base,
        "device_generic_cart_interface::get_region_size": method_device_generic_cart_interface__get_region_size,
        "device_generic_cart_interface::get_ram_base": method_device_generic_cart_interface__get_ram_base,
        "device_generic_cart_interface::get_ram_size": method_device_generic_cart_interface__get_ram_size,
        "device_start": method_device_start,
        "generic_rom_device::device_start": method_generic_rom_device__device_start,
        "device_generic_cart_interface::read_rom": method_device_generic_cart_interface__read_rom,
        "install_non_power_of_two__5": method_install_non_power_of_two__5
    };
})();
definition.slot.options["intf2"].children[0].definition.slot.options["rom"].compiledMethodLinks = ["std::bit_width", "std::forward"];
definition.slot.options["kempjoy"].compiledMethods = (() => {
    function method_pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_mreq_r(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_mreq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_iorq_r(runtime, offset) {
        const members = runtime.members;
        let data = ((((((offset) & (1))) ? ((typeof (runtime.dereference(members.m_slot)).fb_r === 'function' ? (runtime.dereference(members.m_slot)).fb_r() : typeof (runtime.dereference(members.m_slot)).fb_r === 'number' || typeof (runtime.dereference(members.m_slot)).fb_r === 'boolean' ? (runtime.dereference(members.m_slot)).fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
        if (((Number(((offset) & (224))) === Number(0)) ? 1 : 0)) {
            data = (((((typeof (runtime.dereference(members.m_joy)).read === 'function' ? (runtime.dereference(members.m_joy)).read() : typeof (runtime.dereference(members.m_joy)).read === 'number' || typeof (runtime.dereference(members.m_joy)).read === 'boolean' ? (runtime.dereference(members.m_joy)).read : runtime.container(members.m_joy, "read"))) & (31))) & 0xff);
        }
        return ((data) & 0xff);
    }
    function method_iorq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_romcs(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_spectrum_expansion_interface__pre_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_opcode_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__pre_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__post_data_fetch(runtime, offset) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__mreq_r(runtime, offset) {
        const members = runtime.members;
        return ((255) & 0xff);
    }
    function method_device_spectrum_expansion_interface__mreq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__iorq_r(runtime, offset) {
        const members = runtime.members;
        return ((((((offset) & (1))) ? ((typeof (runtime.dereference(members.m_slot)).fb_r === 'function' ? (runtime.dereference(members.m_slot)).fb_r() : typeof (runtime.dereference(members.m_slot)).fb_r === 'number' || typeof (runtime.dereference(members.m_slot)).fb_r === 'boolean' ? (runtime.dereference(members.m_slot)).fb_r : runtime.container(members.m_slot, "fb_r"))) : (255))) & 0xff);
    }
    function method_device_spectrum_expansion_interface__iorq_w(runtime, offset, data) {
        const members = runtime.members;
    }
    function method_device_spectrum_expansion_interface__romcs(runtime) {
        const members = runtime.members;
        return 0;
    }
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    return {
        "pre_opcode_fetch": method_pre_opcode_fetch,
        "post_opcode_fetch": method_post_opcode_fetch,
        "pre_data_fetch": method_pre_data_fetch,
        "post_data_fetch": method_post_data_fetch,
        "mreq_r": method_mreq_r,
        "mreq_w": method_mreq_w,
        "iorq_r": method_iorq_r,
        "iorq_w": method_iorq_w,
        "romcs": method_romcs,
        "device_spectrum_expansion_interface::pre_opcode_fetch": method_device_spectrum_expansion_interface__pre_opcode_fetch,
        "device_spectrum_expansion_interface::post_opcode_fetch": method_device_spectrum_expansion_interface__post_opcode_fetch,
        "device_spectrum_expansion_interface::pre_data_fetch": method_device_spectrum_expansion_interface__pre_data_fetch,
        "device_spectrum_expansion_interface::post_data_fetch": method_device_spectrum_expansion_interface__post_data_fetch,
        "device_spectrum_expansion_interface::mreq_r": method_device_spectrum_expansion_interface__mreq_r,
        "device_spectrum_expansion_interface::mreq_w": method_device_spectrum_expansion_interface__mreq_w,
        "device_spectrum_expansion_interface::iorq_r": method_device_spectrum_expansion_interface__iorq_r,
        "device_spectrum_expansion_interface::iorq_w": method_device_spectrum_expansion_interface__iorq_w,
        "device_spectrum_expansion_interface::romcs": method_device_spectrum_expansion_interface__romcs,
        "device_start": method_device_start
    };
})();
export const device = definition;
export default device;
