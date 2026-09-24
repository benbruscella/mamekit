import deviceData from './c64_expansion_slot.device.ir.json' with { type: 'json' };
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
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_card = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
    }
    function method_device_reset(runtime) {
        const members = runtime.members;
    }
    function method_cd_r(runtime, offset, data, sphi2, ba, roml, romh, io1, io2) {
        const members = runtime.members;
        if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
            data = ((((runtime.dereference(members.m_card)).c64_cd_r?.(offset, data, sphi2, ba, roml, romh, io1, io2) ?? 0)) & 0xff);
        }
        return data;
    }
    function method_cd_w(runtime, offset, data, sphi2, ba, roml, romh, io1, io2) {
        const members = runtime.members;
        if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
            ((runtime.dereference(members.m_card)).c64_cd_w?.(offset, data, sphi2, ba, roml, romh, io1, io2) ?? 0);
        }
    }
    function method_game_r(runtime, offset, sphi2, ba, rw, loram, hiram) {
        const members = runtime.members;
        let state = ((1) | 0);
        members.m_hiram = ((hiram) | 0);
        members.m_loram = ((loram) | 0);
        if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
            state = ((((runtime.dereference(members.m_card)).c64_game_r?.(offset, sphi2, ba, rw) ?? 0)) | 0);
        }
        return state;
    }
    function method_exrom_r(runtime, offset, sphi2, ba, rw, loram, hiram) {
        const members = runtime.members;
        let state = ((1) | 0);
        members.m_hiram = ((hiram) | 0);
        members.m_loram = ((loram) | 0);
        if ((((members.m_card ?? runtime.member("m_card"))) ? 1 : 0)) {
            state = ((((runtime.dereference(members.m_card)).c64_exrom_r?.(offset, sphi2, ba, rw) ?? 0)) | 0);
        }
        return state;
    }
    function method_irq_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_irq)).bind === 'function' ? (runtime.dereference(members.m_write_irq)).bind() : typeof (runtime.dereference(members.m_write_irq)).bind === 'number' || typeof (runtime.dereference(members.m_write_irq)).bind === 'boolean' ? (runtime.dereference(members.m_write_irq)).bind : runtime.container(members.m_write_irq, "bind"));
    }
    function method_nmi_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_nmi)).bind === 'function' ? (runtime.dereference(members.m_write_nmi)).bind() : typeof (runtime.dereference(members.m_write_nmi)).bind === 'number' || typeof (runtime.dereference(members.m_write_nmi)).bind === 'boolean' ? (runtime.dereference(members.m_write_nmi)).bind : runtime.container(members.m_write_nmi, "bind"));
    }
    function method_reset_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_reset)).bind === 'function' ? (runtime.dereference(members.m_write_reset)).bind() : typeof (runtime.dereference(members.m_write_reset)).bind === 'number' || typeof (runtime.dereference(members.m_write_reset)).bind === 'boolean' ? (runtime.dereference(members.m_write_reset)).bind : runtime.container(members.m_write_reset, "bind"));
    }
    function method_cd_input_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_dma_cd)).bind === 'function' ? (runtime.dereference(members.m_read_dma_cd)).bind() : typeof (runtime.dereference(members.m_read_dma_cd)).bind === 'number' || typeof (runtime.dereference(members.m_read_dma_cd)).bind === 'boolean' ? (runtime.dereference(members.m_read_dma_cd)).bind : runtime.container(members.m_read_dma_cd, "bind"));
    }
    function method_cd_output_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_dma_cd)).bind === 'function' ? (runtime.dereference(members.m_write_dma_cd)).bind() : typeof (runtime.dereference(members.m_write_dma_cd)).bind === 'number' || typeof (runtime.dereference(members.m_write_dma_cd)).bind === 'boolean' ? (runtime.dereference(members.m_write_dma_cd)).bind : runtime.container(members.m_write_dma_cd, "bind"));
    }
    function method_dma_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_dma)).bind === 'function' ? (runtime.dereference(members.m_write_dma)).bind() : typeof (runtime.dereference(members.m_write_dma)).bind === 'number' || typeof (runtime.dereference(members.m_write_dma)).bind === 'boolean' ? (runtime.dereference(members.m_write_dma)).bind : runtime.container(members.m_write_dma, "bind"));
    }
    function method_c64_expansion_slot_device(runtime, mconfig, tag, owner, clock, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_dma_cd_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["m_read_dma_cd"] ? __l["m_read_dma_cd"](Number(offset)) : typeof members.m_read_dma_cd === 'function' ? members.m_read_dma_cd(offset) : runtime.invoke("m_read_dma_cd", offset));
    }
    function method_dma_cd_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_dma_cd"] ? __l["m_write_dma_cd"](Number(offset), Number(data)) : typeof members.m_write_dma_cd === 'function' ? members.m_write_dma_cd(offset, data) : runtime.invoke("m_write_dma_cd", offset, data));
    }
    function method_irq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_irq"] ? __l["m_write_irq"](Number(state)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(state) : runtime.invoke("m_write_irq", state));
    }
    function method_nmi_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_nmi"] ? __l["m_write_nmi"](Number(state)) : typeof members.m_write_nmi === 'function' ? members.m_write_nmi(state) : runtime.invoke("m_write_nmi", state));
    }
    function method_dma_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_dma"] ? __l["m_write_dma"](Number(state)) : typeof members.m_write_dma === 'function' ? members.m_write_dma(state) : runtime.invoke("m_write_dma", state));
    }
    function method_reset_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_reset"] ? __l["m_write_reset"](Number(state)) : typeof members.m_write_reset === 'function' ? members.m_write_reset(state) : runtime.invoke("m_write_reset", state));
    }
    function method_phi2(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["clock"] ? __l["clock"]() : runtime.macro("clock"));
    }
    function method_dotclock(runtime) {
        const members = runtime.members;
        return ((method_phi2(runtime)) * (8));
    }
    function method_hiram(runtime) {
        const members = runtime.members;
        return (members.m_hiram ?? runtime.member("m_hiram"));
    }
    function method_loram(runtime) {
        const members = runtime.members;
        return (members.m_loram ?? runtime.member("m_loram"));
    }
    function method_is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_c64_expansion_slot_device__c64_expansion_slot_device(runtime, mconfig, tag, owner, clock, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_c64_expansion_slot_device__irq_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_irq)).bind === 'function' ? (runtime.dereference(members.m_write_irq)).bind() : typeof (runtime.dereference(members.m_write_irq)).bind === 'number' || typeof (runtime.dereference(members.m_write_irq)).bind === 'boolean' ? (runtime.dereference(members.m_write_irq)).bind : runtime.container(members.m_write_irq, "bind"));
    }
    function method_c64_expansion_slot_device__nmi_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_nmi)).bind === 'function' ? (runtime.dereference(members.m_write_nmi)).bind() : typeof (runtime.dereference(members.m_write_nmi)).bind === 'number' || typeof (runtime.dereference(members.m_write_nmi)).bind === 'boolean' ? (runtime.dereference(members.m_write_nmi)).bind : runtime.container(members.m_write_nmi, "bind"));
    }
    function method_c64_expansion_slot_device__reset_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_reset)).bind === 'function' ? (runtime.dereference(members.m_write_reset)).bind() : typeof (runtime.dereference(members.m_write_reset)).bind === 'number' || typeof (runtime.dereference(members.m_write_reset)).bind === 'boolean' ? (runtime.dereference(members.m_write_reset)).bind : runtime.container(members.m_write_reset, "bind"));
    }
    function method_c64_expansion_slot_device__cd_input_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_read_dma_cd)).bind === 'function' ? (runtime.dereference(members.m_read_dma_cd)).bind() : typeof (runtime.dereference(members.m_read_dma_cd)).bind === 'number' || typeof (runtime.dereference(members.m_read_dma_cd)).bind === 'boolean' ? (runtime.dereference(members.m_read_dma_cd)).bind : runtime.container(members.m_read_dma_cd, "bind"));
    }
    function method_c64_expansion_slot_device__cd_output_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_dma_cd)).bind === 'function' ? (runtime.dereference(members.m_write_dma_cd)).bind() : typeof (runtime.dereference(members.m_write_dma_cd)).bind === 'number' || typeof (runtime.dereference(members.m_write_dma_cd)).bind === 'boolean' ? (runtime.dereference(members.m_write_dma_cd)).bind : runtime.container(members.m_write_dma_cd, "bind"));
    }
    function method_c64_expansion_slot_device__dma_callback(runtime) {
        const members = runtime.members;
        return (typeof (runtime.dereference(members.m_write_dma)).bind === 'function' ? (runtime.dereference(members.m_write_dma)).bind() : typeof (runtime.dereference(members.m_write_dma)).bind === 'number' || typeof (runtime.dereference(members.m_write_dma)).bind === 'boolean' ? (runtime.dereference(members.m_write_dma)).bind : runtime.container(members.m_write_dma, "bind"));
    }
    function method_c64_expansion_slot_device__dma_cd_r(runtime, offset) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["m_read_dma_cd"] ? __l["m_read_dma_cd"](Number(offset)) : typeof members.m_read_dma_cd === 'function' ? members.m_read_dma_cd(offset) : runtime.invoke("m_read_dma_cd", offset));
    }
    function method_c64_expansion_slot_device__dma_cd_w(runtime, offset, data) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_dma_cd"] ? __l["m_write_dma_cd"](Number(offset), Number(data)) : typeof members.m_write_dma_cd === 'function' ? members.m_write_dma_cd(offset, data) : runtime.invoke("m_write_dma_cd", offset, data));
    }
    function method_c64_expansion_slot_device__irq_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_irq"] ? __l["m_write_irq"](Number(state)) : typeof members.m_write_irq === 'function' ? members.m_write_irq(state) : runtime.invoke("m_write_irq", state));
    }
    function method_c64_expansion_slot_device__nmi_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_nmi"] ? __l["m_write_nmi"](Number(state)) : typeof members.m_write_nmi === 'function' ? members.m_write_nmi(state) : runtime.invoke("m_write_nmi", state));
    }
    function method_c64_expansion_slot_device__dma_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_dma"] ? __l["m_write_dma"](Number(state)) : typeof members.m_write_dma === 'function' ? members.m_write_dma(state) : runtime.invoke("m_write_dma", state));
    }
    function method_c64_expansion_slot_device__reset_w(runtime, state) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["m_write_reset"] ? __l["m_write_reset"](Number(state)) : typeof members.m_write_reset === 'function' ? members.m_write_reset(state) : runtime.invoke("m_write_reset", state));
    }
    function method_c64_expansion_slot_device__phi2(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["clock"] ? __l["clock"]() : runtime.macro("clock"));
    }
    function method_c64_expansion_slot_device__dotclock(runtime) {
        const members = runtime.members;
        return ((method_phi2(runtime)) * (8));
    }
    function method_c64_expansion_slot_device__hiram(runtime) {
        const members = runtime.members;
        return (members.m_hiram ?? runtime.member("m_hiram"));
    }
    function method_c64_expansion_slot_device__loram(runtime) {
        const members = runtime.members;
        return (members.m_loram ?? runtime.member("m_loram"));
    }
    function method_c64_expansion_slot_device__is_reset_on_load(runtime) {
        const members = runtime.members;
        return 1;
    }
    function method_c64_expansion_slot_device__image_interface(runtime) {
        const members = runtime.members;
        return "c64_cart,vic10_cart";
    }
    function method_c64_expansion_slot_device__file_extensions(runtime) {
        const members = runtime.members;
        return "80,a0,e0,crt";
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
        "device_start": method_device_start,
        "device_reset": method_device_reset,
        "cd_r": method_cd_r,
        "cd_w": method_cd_w,
        "game_r": method_game_r,
        "exrom_r": method_exrom_r,
        "irq_callback": method_irq_callback,
        "nmi_callback": method_nmi_callback,
        "reset_callback": method_reset_callback,
        "cd_input_callback": method_cd_input_callback,
        "cd_output_callback": method_cd_output_callback,
        "dma_callback": method_dma_callback,
        "c64_expansion_slot_device": method_c64_expansion_slot_device,
        "dma_cd_r": method_dma_cd_r,
        "dma_cd_w": method_dma_cd_w,
        "irq_w": method_irq_w,
        "nmi_w": method_nmi_w,
        "dma_w": method_dma_w,
        "reset_w": method_reset_w,
        "phi2": method_phi2,
        "dotclock": method_dotclock,
        "hiram": method_hiram,
        "loram": method_loram,
        "is_reset_on_load": method_is_reset_on_load,
        "c64_expansion_slot_device::c64_expansion_slot_device": method_c64_expansion_slot_device__c64_expansion_slot_device,
        "c64_expansion_slot_device::irq_callback": method_c64_expansion_slot_device__irq_callback,
        "c64_expansion_slot_device::nmi_callback": method_c64_expansion_slot_device__nmi_callback,
        "c64_expansion_slot_device::reset_callback": method_c64_expansion_slot_device__reset_callback,
        "c64_expansion_slot_device::cd_input_callback": method_c64_expansion_slot_device__cd_input_callback,
        "c64_expansion_slot_device::cd_output_callback": method_c64_expansion_slot_device__cd_output_callback,
        "c64_expansion_slot_device::dma_callback": method_c64_expansion_slot_device__dma_callback,
        "c64_expansion_slot_device::dma_cd_r": method_c64_expansion_slot_device__dma_cd_r,
        "c64_expansion_slot_device::dma_cd_w": method_c64_expansion_slot_device__dma_cd_w,
        "c64_expansion_slot_device::irq_w": method_c64_expansion_slot_device__irq_w,
        "c64_expansion_slot_device::nmi_w": method_c64_expansion_slot_device__nmi_w,
        "c64_expansion_slot_device::dma_w": method_c64_expansion_slot_device__dma_w,
        "c64_expansion_slot_device::reset_w": method_c64_expansion_slot_device__reset_w,
        "c64_expansion_slot_device::phi2": method_c64_expansion_slot_device__phi2,
        "c64_expansion_slot_device::dotclock": method_c64_expansion_slot_device__dotclock,
        "c64_expansion_slot_device::hiram": method_c64_expansion_slot_device__hiram,
        "c64_expansion_slot_device::loram": method_c64_expansion_slot_device__loram,
        "c64_expansion_slot_device::is_reset_on_load": method_c64_expansion_slot_device__is_reset_on_load,
        "c64_expansion_slot_device::image_interface": method_c64_expansion_slot_device__image_interface,
        "c64_expansion_slot_device::file_extensions": method_c64_expansion_slot_device__file_extensions
    };
})();
definition.compiledMethodLinks = ["clock", "get_card_device", "m_read_dma_cd", "m_write_dma", "m_write_dma_cd", "m_write_irq", "m_write_nmi", "m_write_reset", "rom_software_list_loader::instance", "set_options", "std::forward"];
export const device = definition;
export default device;
