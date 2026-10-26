import deviceData from './ay_slot.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.m_dev = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
    }
    function method_data_r(runtime) {
        const members = runtime.members;
        return (((((members.m_dev ?? 0)) ? ((members.m_dev.data_r?.() ?? 0)) : (255))) & 0xff);
    }
    function method_data_w(runtime, data) {
        const members = runtime.members;
        if ((members.m_dev ?? 0)) {
            (members.m_dev.data_w?.(data) ?? 0);
        }
    }
    function method_address_w(runtime, data) {
        const members = runtime.members;
        if ((members.m_dev ?? 0)) {
            (members.m_dev.address_w?.(data) ?? 0);
        }
    }
    function method_ay_slot_device(runtime, mconfig, tag, owner, clock, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    function method_ay_slot_device__ay_slot_device(runtime, mconfig, tag, owner, clock, opts, dflt) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, 0));
    }
    return {
        "device_start": method_device_start,
        "data_r": method_data_r,
        "data_w": method_data_w,
        "address_w": method_address_w,
        "ay_slot_device": method_ay_slot_device,
        "ay_slot_device::ay_slot_device": method_ay_slot_device__ay_slot_device
    };
})();
definition.compiledMethodLinks = ["get_card_device", "set_options", "std::forward"];
export const device = definition;
export default device;
