import deviceData from './pls100.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_device_start(runtime) {
        const members = runtime.members;
        method_set_num_inputs(runtime, 16);
        method_set_num_outputs(runtime, 8);
        method_set_num_terms(runtime, 48);
        0;
        0;
        if (runtime.wide("==", (members.m_input_mask ?? 0), 0)) {
            members.m_input_mask = runtime.wide("-", runtime.wide("<<", 1, (members.m_inputs ?? 0)), 1);
        }
        members.m_input_mask = runtime.wide("|", runtime.wide("<<", (members.m_input_mask ?? 0), 32), (members.m_input_mask ?? 0));
        members.m_cache_size = ((((1) << (((((Number((members.m_inputs ?? 0)) > Number(20)) ? 1 : 0)) ? (20) : ((members.m_inputs ?? 0)))))) | 0);
        (members.m_cache = runtime.resize(members.m_cache, (members.m_cache_size ?? 0)));
        method_reinit(runtime);
    }
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
    function method_reinit(runtime) {
        const members = runtime.members;
        let result = ((method_parse_fusemap(runtime)) | 0);
        members.m_cache2_ptr = ((0) & 0xff);
        for (let __range0 = (members.m_cache2 ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            runtime.writeIndex(__range0, __range0_index, 2147483648);
        }
        let csize = (((members.m_cache_size ?? 0)) | 0);
        members.m_cache_size = ((0) | 0);
        for (let i = ((0) | 0); ((Number(i) < Number(csize)) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            runtime.writeIndex(runtime.writableMember("m_cache"), i, method_read(runtime, i));
        }
        members.m_cache_size = ((csize) | 0);
        return ((Number(result) === Number(0)) ? 1 : 0);
    }
    function method_parse_fusemap(runtime) {
        const members = runtime.members;
        let result = ((0) | 0);
        let fusenum = ((0) >>> 0);
        for (let p = ((0) | 0); ((Number(p) < Number((members.m_terms ?? 0))) ? 1 : 0); p = ((((p) + (1))) | 0)) {
            let term = runtime.addressOf((members.m_term ?? 0), p);
            runtime.dereference(term).and_mask = 0;
            for (let i = ((0) | 0); ((Number(i) < Number((members.m_inputs ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
                runtime.dereference(term).and_mask = runtime.wide("|", runtime.dereference(term).and_mask, runtime.wide("<<", runtime.invoke("jed_get_fuse", (() => { const previous = fusenum; fusenum = ((((fusenum) + (1))) >>> 0); return previous; })()), ((i) + (32))));
                runtime.dereference(term).and_mask = runtime.wide("|", runtime.dereference(term).and_mask, runtime.wide("<<", runtime.invoke("jed_get_fuse", (() => { const previous = fusenum; fusenum = ((((fusenum) + (1))) >>> 0); return previous; })()), i));
            }
            runtime.dereference(term).or_mask = 0;
            for (let f = ((0) | 0); ((Number(f) < Number((members.m_outputs ?? 0))) ? 1 : 0); f = ((((f) + (1))) | 0)) {
                runtime.dereference(term).or_mask = runtime.wide("|", runtime.dereference(term).or_mask, ((((runtime.invoke("jed_get_fuse", (() => { const previous = fusenum; fusenum = ((((fusenum) + (1))) >>> 0); return previous; })())) ? 0 : 1)) << (f)));
            }
            runtime.dereference(term).or_mask = runtime.wide("<<", runtime.dereference(term).or_mask, 32);
            0;
        }
        members.m_xor = 0;
        for (let f = ((0) | 0); ((Number(f) < Number((members.m_outputs ?? 0))) ? 1 : 0); f = ((((f) + (1))) | 0)) {
            members.m_xor = runtime.wide("|", (members.m_xor ?? 0), ((runtime.invoke("jed_get_fuse", (() => { const previous = fusenum; fusenum = ((((fusenum) + (1))) >>> 0); return previous; })())) << (f)));
        }
        members.m_xor = runtime.wide("<<", (members.m_xor ?? 0), 32);
        0;
        return result;
    }
    function method_read(runtime, input) {
        const members = runtime.members;
        if (((Number(input) < Number((members.m_cache_size ?? 0))) ? 1 : 0)) {
            return runtime.readIndex((members.m_cache ?? 0), input);
        }
        for (let __range0 = (members.m_cache2 ?? 0), __range0_index = 0; ((Number(__range0_index) < Number(__range0.length)) ? 1 : 0); __range0_index = ((__range0_index) + (1))) {
            if (((Number(((runtime.readIndex(__range0, __range0_index)) >>> 0)) === Number(input)) ? 1 : 0)) {
                return runtime.wide(">>", runtime.readIndex(__range0, __range0_index), 32);
            }
        }
        let inputs = runtime.wide("&", runtime.wide("|", runtime.wide("<<", runtime.wide("^", input, 18446744073709551615n), 32), input), (members.m_input_mask ?? 0));
        let s = 0;
        for (let i = ((0) | 0); ((Number(i) < Number((members.m_terms ?? 0))) ? 1 : 0); i = ((((i) + (1))) | 0)) {
            let term = runtime.addressOf((members.m_term ?? 0), i);
            if (runtime.wide("==", runtime.wide("|", runtime.dereference(term).and_mask, inputs), (members.m_input_mask ?? 0))) {
                s = runtime.wide("|", s, runtime.dereference(term).or_mask);
            }
        }
        s = runtime.wide("^", s, (members.m_xor ?? 0));
        runtime.writeIndex(runtime.writableMember("m_cache2"), (members.m_cache2_ptr ?? 0), runtime.wide("|", s, input));
        let __mame_assignment_128 = 7;
        members.m_cache2_ptr = ((((members.m_cache2_ptr) + (1))) & 0xff);
        members.m_cache2_ptr = ((((members.m_cache2_ptr) & (__mame_assignment_128))) & 0xff);
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
        return (members.m_inputs ?? 0);
    }
    function method_outputs(runtime) {
        const members = runtime.members;
        return (members.m_outputs ?? 0);
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
        return (members.m_inputs ?? 0);
    }
    function method_pla_device__outputs(runtime) {
        const members = runtime.members;
        return (members.m_outputs ?? 0);
    }
    return {
        "device_start": method_device_start,
        "set_num_inputs": method_set_num_inputs,
        "set_num_outputs": method_set_num_outputs,
        "set_num_terms": method_set_num_terms,
        "reinit": method_reinit,
        "parse_fusemap": method_parse_fusemap,
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
