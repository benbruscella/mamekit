import deviceData from './cbm_iec_slot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let bus = 0;
        for (let device = (__l["owner"] ? __l["owner"]() : runtime.macro("owner")); ((device) ? 1 : 0); device = (typeof (runtime.dereference(device)).owner === 'function' ? (runtime.dereference(device)).owner() : typeof (runtime.dereference(device)).owner === 'number' || typeof (runtime.dereference(device)).owner === 'boolean' ? (runtime.dereference(device)).owner : runtime.container(device, "owner"))) {
            bus = ((runtime.dereference(device)).subdevice?.("iec_bus") ?? 0);
            if (((bus) ? 1 : 0)) {
                break;
            }
        }
        0;
        let dev = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
        if (dev) {
            ((runtime.dereference(bus)).add_device?.((members.this ?? 0), (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"))) ?? 0);
        }
    }
    function method_cbm_iec_slot_device(runtime, mconfig, tag, owner, address, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
        method_set_address(runtime, address);
    }
    function method_set_address(runtime, address) {
        const members = runtime.members;
        members.m_address = ((address) | 0);
    }
    function method_get_address(runtime) {
        const members = runtime.members;
        return (members.m_address ?? 0);
    }
    function method_cbm_iec_slot_device__cbm_iec_slot_device(runtime, mconfig, tag, owner, address, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
        method_set_address(runtime, address);
    }
    function method_cbm_iec_slot_device__set_address(runtime, address) {
        const members = runtime.members;
        members.m_address = ((address) | 0);
    }
    function method_cbm_iec_slot_device__get_address(runtime) {
        const members = runtime.members;
        return (members.m_address ?? 0);
    }
    return {
        "device_start": method_device_start,
        "cbm_iec_slot_device": method_cbm_iec_slot_device,
        "set_address": method_set_address,
        "get_address": method_get_address,
        "cbm_iec_slot_device::cbm_iec_slot_device": method_cbm_iec_slot_device__cbm_iec_slot_device,
        "cbm_iec_slot_device::set_address": method_cbm_iec_slot_device__set_address,
        "cbm_iec_slot_device::get_address": method_cbm_iec_slot_device__get_address
    };
})();
definition.compiledMethodLinks = ["get_card_device", "owner", "set_options", "std::forward"];
export const device = definition;
export default device;
