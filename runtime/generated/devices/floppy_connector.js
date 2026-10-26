import deviceData from './floppy_connector.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
    }
    function method_device_config_complete(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let dev = (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
        if (dev) {
            ((runtime.dereference(dev)).set_formats?.((members.formats ?? 0)) ?? 0);
            ((runtime.dereference(dev)).set_sectoring_type?.((members.m_sectoring_type ?? 0)) ?? 0);
        }
    }
    function method_get_device(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        return (__l["get_card_device"] ? __l["get_card_device"]() : runtime.macro("get_card_device"));
    }
    function method_set_formats(runtime, _formats) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.formats = (__l["std::forward"] ? __l["std::forward"](_formats) : runtime.macro("std::forward", _formats));
    }
    function method_set_sectoring_type(runtime, sectoring_type) {
        const members = runtime.members;
        members.m_sectoring_type = ((sectoring_type) >>> 0);
    }
    function method_use_sound(runtime) {
        const members = runtime.members;
        return (members.m_use_sound ?? 0);
    }
    function method_get_samples(runtime) {
        const members = runtime.members;
        return (members.m_samples ?? 0);
    }
    function method_floppy_connector__floppy_connector(runtime, mconfig, tag, owner, opts, dflt, formats, fixed = 0) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        (__l["set_options"] ? __l["set_options"]((__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, fixed) : runtime.macro("set_options", (__l["std::forward"] ? __l["std::forward"](opts) : runtime.macro("std::forward", opts)), dflt, fixed));
        method_set_formats(runtime, (__l["std::forward"] ? __l["std::forward"](formats) : runtime.macro("std::forward", formats)));
    }
    function method_floppy_connector__set_formats(runtime, _formats) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        members.formats = (__l["std::forward"] ? __l["std::forward"](_formats) : runtime.macro("std::forward", _formats));
    }
    function method_floppy_connector__set_sectoring_type(runtime, sectoring_type) {
        const members = runtime.members;
        members.m_sectoring_type = ((sectoring_type) >>> 0);
    }
    function method_floppy_connector__use_sound(runtime) {
        const members = runtime.members;
        return (members.m_use_sound ?? 0);
    }
    function method_floppy_connector__get_samples(runtime) {
        const members = runtime.members;
        return (members.m_samples ?? 0);
    }
    return {
        "device_start": method_device_start,
        "device_config_complete": method_device_config_complete,
        "get_device": method_get_device,
        "set_formats": method_set_formats,
        "set_sectoring_type": method_set_sectoring_type,
        "use_sound": method_use_sound,
        "get_samples": method_get_samples,
        "floppy_connector::floppy_connector": method_floppy_connector__floppy_connector,
        "floppy_connector::set_formats": method_floppy_connector__set_formats,
        "floppy_connector::set_sectoring_type": method_floppy_connector__set_sectoring_type,
        "floppy_connector::use_sound": method_floppy_connector__use_sound,
        "floppy_connector::get_samples": method_floppy_connector__get_samples
    };
})();
definition.compiledMethodLinks = ["get_card_device", "set_options", "std::forward"];
export const device = definition;
export default device;
