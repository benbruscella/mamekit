import deviceData from './pls100.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_set_num_inputs(runtime, i) {
        const members = runtime.members;
        members.m_inputs = ((i) >>> 0);
    }
    function method_set_num_outputs(runtime, o) {
        const members = runtime.members;
        members.m_outputs = ((o) >>> 0);
    }
    function method_set_num_terms(runtime, t) {
        const members = runtime.members;
        members.m_terms = ((t) >>> 0);
    }
    function method_read(runtime, input) {
        const members = runtime.members;
        const h_m_term = members.m_term ?? runtime.member("m_term");
        if (((Number(input) < Number((members.m_cache_size ?? runtime.member("m_cache_size")))) ? 1 : 0)) {
            return runtime.readIndex((members.m_cache ?? runtime.member("m_cache")), input);
        }
        for (let __range0 = (members.m_cache2 ?? runtime.member("m_cache2")), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            if (((Number(((runtime.readIndex(__range0, __range0_index)) >>> 0)) === Number(input)) ? 1 : 0)) {
                return runtime.wide(">>", runtime.readIndex(__range0, __range0_index), 32);
            }
        }
        let inputs = runtime.wide("&", runtime.wide("|", runtime.wide("<<", runtime.wide("^", input, 18446744073709551615n), 32), input), (members.m_input_mask ?? runtime.member("m_input_mask")));
        let s = 0;
        for (let i = ((0) | 0); ((Number(i) < Number((members.m_terms ?? runtime.member("m_terms")))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let term = runtime.addressOf(h_m_term, i);
            if (runtime.wide("==", runtime.wide("|", runtime.dereference(term).and_mask, inputs), (members.m_input_mask ?? runtime.member("m_input_mask")))) {
                s = runtime.wide("|", s, runtime.dereference(term).or_mask);
            }
        }
        s = runtime.wide("^", s, (members.m_xor ?? runtime.member("m_xor")));
        runtime.writeIndex(runtime.writableMember("m_cache2"), (members.m_cache2_ptr ?? runtime.member("m_cache2_ptr")), runtime.wide("|", s, input));
        let __mame_assignment_128 = ((8) - (1));
        members.m_cache2_ptr = ((((members.m_cache2_ptr) + (1))) & 0xff);
        members.m_cache2_ptr = ((runtime.andAssign(members.m_cache2_ptr, __mame_assignment_128)) & 0xff);
        return runtime.wide(">>", s, 32);
    }
    function method_set_inputmask(runtime, mask) {
        const members = runtime.members;
        members.m_input_mask = mask;
    }
    function method_set_format(runtime, format) {
        const members = runtime.members;
        members.m_format = format;
    }
    function method_inputs(runtime) {
        const members = runtime.members;
        return (members.m_inputs ?? runtime.member("m_inputs"));
    }
    function method_outputs(runtime) {
        const members = runtime.members;
        return (members.m_outputs ?? runtime.member("m_outputs"));
    }
    function method_pla_device__set_num_inputs(runtime, i) {
        const members = runtime.members;
        members.m_inputs = ((i) >>> 0);
    }
    function method_pla_device__set_num_outputs(runtime, o) {
        const members = runtime.members;
        members.m_outputs = ((o) >>> 0);
    }
    function method_pla_device__set_num_terms(runtime, t) {
        const members = runtime.members;
        members.m_terms = ((t) >>> 0);
    }
    function method_pla_device__set_inputmask(runtime, mask) {
        const members = runtime.members;
        members.m_input_mask = mask;
    }
    function method_pla_device__set_format(runtime, format) {
        const members = runtime.members;
        members.m_format = format;
    }
    function method_pla_device__inputs(runtime) {
        const members = runtime.members;
        return (members.m_inputs ?? runtime.member("m_inputs"));
    }
    function method_pla_device__outputs(runtime) {
        const members = runtime.members;
        return (members.m_outputs ?? runtime.member("m_outputs"));
    }
    return {
        "set_num_inputs": method_set_num_inputs,
        "set_num_outputs": method_set_num_outputs,
        "set_num_terms": method_set_num_terms,
        "read": method_read,
        "set_inputmask": method_set_inputmask,
        "set_format": method_set_format,
        "inputs": method_inputs,
        "outputs": method_outputs,
        "pla_device::set_num_inputs": method_pla_device__set_num_inputs,
        "pla_device::set_num_outputs": method_pla_device__set_num_outputs,
        "pla_device::set_num_terms": method_pla_device__set_num_terms,
        "pla_device::set_inputmask": method_pla_device__set_inputmask,
        "pla_device::set_format": method_pla_device__set_format,
        "pla_device::inputs": method_pla_device__inputs,
        "pla_device::outputs": method_pla_device__outputs
    };
})();
export const device = definition;
export default device;
