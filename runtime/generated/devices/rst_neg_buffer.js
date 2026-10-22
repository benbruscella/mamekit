import deviceData from './rst_neg_buffer.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_sync_set_input(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_input_buffer ?? 0)) === Number(0)) ? 1 : 0)) {
            members.m_input_buffer = ((param) & 0xff);
            (__l["m_int_cb"] ? __l["m_int_cb"](Number(1)) : typeof members.m_int_cb === 'function' ? members.m_int_cb(1) : runtime.invoke("m_int_cb", 1));
        }
        else {
            members.m_input_buffer = ((((members.m_input_buffer) | (param))) & 0xff);
        }
    }
    function method_sync_clear_input(runtime, param) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((members.m_input_buffer ?? 0)) === Number(param)) ? 1 : 0)) {
            members.m_input_buffer = ((0) & 0xff);
            (__l["m_int_cb"] ? __l["m_int_cb"](Number(0)) : typeof members.m_int_cb === 'function' ? members.m_int_cb(0) : runtime.invoke("m_int_cb", 0));
        }
        else {
            members.m_input_buffer = ((((members.m_input_buffer) & ((~param)))) & 0xff);
        }
    }
    function method_rst30_w(runtime, state) {
        const members = runtime.members;
        runtime.invoke("sync_input", state, 8);
    }
    function method_rst28_w(runtime, state) {
        const members = runtime.members;
        runtime.invoke("sync_input", state, 16);
    }
    function method_rst18_w(runtime, state) {
        const members = runtime.members;
        runtime.invoke("sync_input", state, 32);
    }
    function method_rst_neg_buffer_device__rst30_w(runtime, state) {
        const members = runtime.members;
        runtime.invoke("sync_input", state, 8);
    }
    function method_rst_neg_buffer_device__rst28_w(runtime, state) {
        const members = runtime.members;
        runtime.invoke("sync_input", state, 16);
    }
    function method_rst_neg_buffer_device__rst18_w(runtime, state) {
        const members = runtime.members;
        runtime.invoke("sync_input", state, 32);
    }
    return {
        "sync_set_input": method_sync_set_input,
        "sync_clear_input": method_sync_clear_input,
        "rst30_w": method_rst30_w,
        "rst28_w": method_rst28_w,
        "rst18_w": method_rst18_w,
        "rst_neg_buffer_device::rst30_w": method_rst_neg_buffer_device__rst30_w,
        "rst_neg_buffer_device::rst28_w": method_rst_neg_buffer_device__rst28_w,
        "rst_neg_buffer_device::rst18_w": method_rst_neg_buffer_device__rst18_w
    };
})();
definition.compiledMethodLinks = ["m_int_cb"];
export const device = definition;
export default device;
