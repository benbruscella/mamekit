import deviceData from './hc259.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_write_bit(runtime, offset, d) {
        const members = runtime.members;
        method_write_abcd(runtime, offset, d);
        method_enable_w(runtime, 0);
        method_enable_w(runtime, 1);
    }
    function method_write_abcd(runtime, a, d) {
        const members = runtime.members;
        members.m_address = ((((a) & (7))) & 0xff);
        members.m_data = ((d) ? 1 : 0);
        if ((members.m_enable ?? runtime.member("m_enable"))) {
            if ((members.m_clear ?? runtime.member("m_clear"))) {
                method_clear_outputs(runtime, (((((members.m_data ?? runtime.member("m_data"))) & 0xff)) << ((members.m_address ?? runtime.member("m_address")))));
            }
            else {
                method_update_bit(runtime);
            }
        }
    }
    function method_clear_outputs(runtime, new_q) {
        const members = runtime.members;
        let bits_changed = (((((members.m_q ?? runtime.member("m_q"))) ^ (new_q))) & 0xff);
        if (((Number(bits_changed) === Number(0)) ? 1 : 0)) {
            return;
        }
        members.m_q = ((new_q) & 0xff);
        for (let bit = 0; ((Number(bit) < Number(8)) ? 1 : 0); bit = ((bit) + (1))) {
            if ((((bits_changed) >>> (bit)) & 1)) {
                (members.m_q_out_cb ?? runtime.member("m_q_out_cb"))[bit]((((new_q) >>> (bit)) & 1));
            }
        }
        runtime.invoke("m_parallel_out_cb", 0, new_q, bits_changed);
    }
    function method_update_bit(runtime) {
        const members = runtime.members;
        if (((Number(((((members.m_q ?? runtime.member("m_q"))) >>> ((members.m_address ?? runtime.member("m_address")))) & 1)) === Number((members.m_data ?? runtime.member("m_data")))) ? 1 : 0)) {
            return;
        }
        if ((((members.m_clear ?? runtime.member("m_clear"))) ? 0 : 1)) {
            members.m_q = (((((((members.m_q ?? runtime.member("m_q"))) & ((~((1) << ((members.m_address ?? runtime.member("m_address")))))))) | ((((((members.m_data ?? runtime.member("m_data"))) & 0xff)) << ((members.m_address ?? runtime.member("m_address"))))))) & 0xff);
        }
        else {
            method_clear_outputs(runtime, 0);
            members.m_q = (((((((members.m_data ?? runtime.member("m_data"))) & 0xff)) << ((members.m_address ?? runtime.member("m_address"))))) & 0xff);
        }
        (members.m_q_out_cb ?? runtime.member("m_q_out_cb"))[(members.m_address ?? runtime.member("m_address"))]((members.m_data ?? runtime.member("m_data")));
        runtime.invoke("m_parallel_out_cb", 0, (members.m_q ?? runtime.member("m_q")), ((1) << ((members.m_address ?? runtime.member("m_address")))));
        if ((((0) || (((((((0) && (((runtime.dereference((members.m_q_out_cb ?? runtime.member("m_q_out_cb"))[(members.m_address ?? runtime.member("m_address"))])).isunset?.() ?? runtime.container((members.m_q_out_cb ?? runtime.member("m_q_out_cb"))[(members.m_address ?? runtime.member("m_address"))], "isunset")))) ? 1 : 0)) && ((typeof (runtime.dereference(members.m_parallel_out_cb)).isunset === 'function' ? (runtime.dereference(members.m_parallel_out_cb)).isunset() : typeof (runtime.dereference(members.m_parallel_out_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_parallel_out_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_parallel_out_cb)).isunset : runtime.container(members.m_parallel_out_cb, "isunset")))) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
    }
    function method_enable_w(runtime, state) {
        const members = runtime.members;
        members.m_enable = ((((state) ? 0 : 1)) ? 1 : 0);
        if ((members.m_enable ?? runtime.member("m_enable"))) {
            method_update_bit(runtime);
        }
        else {
            if ((members.m_clear ?? runtime.member("m_clear"))) {
                method_clear_outputs(runtime, 0);
            }
        }
    }
    function method_write_d0(runtime, offset, data) {
        const members = runtime.members;
        if ((((((((((0) && (((Number(data) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) !== Number(1)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        method_write_bit(runtime, offset, (((data) >>> (0)) & 1));
    }
    function method_write_d1(runtime, offset, data) {
        const members = runtime.members;
        if ((((((((((0) && (((Number(data) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) !== Number(2)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        method_write_bit(runtime, offset, (((data) >>> (1)) & 1));
    }
    function method_write_d7(runtime, offset, data) {
        const members = runtime.members;
        if ((((((((((0) && (((Number(data) !== Number(0)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) !== Number(128)) ? 1 : 0))) ? 1 : 0)) && (((Number(data) !== Number(255)) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
        method_write_bit(runtime, offset, (((data) >>> (7)) & 1));
    }
    function method_write_a0(runtime, offset, data) {
        const members = runtime.members;
        method_write_bit(runtime, ((offset) >>> (1)), ((offset) & (1)));
    }
    function method_write_a3(runtime, offset, data) {
        const members = runtime.members;
        method_write_bit(runtime, ((offset) & (7)), ((((offset) & (8))) >>> (3)));
    }
    return {
        "write_bit": method_write_bit,
        "write_abcd": method_write_abcd,
        "clear_outputs": method_clear_outputs,
        "update_bit": method_update_bit,
        "enable_w": method_enable_w,
        "write_d0": method_write_d0,
        "write_d1": method_write_d1,
        "write_d7": method_write_d7,
        "write_a0": method_write_a0,
        "write_a3": method_write_a3
    };
})();
export const device = definition;
export default device;
