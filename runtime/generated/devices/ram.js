import deviceData from './ram.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_size(runtime) {
        const members = runtime.members;
        const h_m_size = members.m_size ?? runtime.member("m_size");
        return h_m_size;
    }
    function method_mask(runtime) {
        const members = runtime.members;
        const h_m_size = members.m_size ?? runtime.member("m_size");
        return ((h_m_size) - (1));
    }
    function method_pointer(runtime) {
        const members = runtime.members;
        return members.m_pointer;
    }
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_m_size = members.m_size ?? runtime.member("m_size");
        return runtime.readIndex(method_pointer(runtime), ((offset) % (h_m_size)));
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_size = members.m_size ?? runtime.member("m_size");
        runtime.writeIndex(method_pointer(runtime), ((offset) % (h_m_size)), data);
    }
    return {
        "size": method_size,
        "mask": method_mask,
        "pointer": method_pointer,
        "read": method_read,
        "write": method_write
    };
})();
export const device = definition;
export default device;
