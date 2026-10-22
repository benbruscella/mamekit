import deviceData from './cd4099.device.ir.json' with { type: 'json' };
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
        if ((members.m_enable ?? 0)) {
            if ((members.m_clear ?? 0)) {
                method_clear_outputs(runtime, (((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0))));
            }
            else {
                method_update_bit(runtime);
            }
        }
    }
    function method_clear_outputs(runtime, new_q) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let bits_changed = (((((members.m_q ?? 0)) ^ (new_q))) & 0xff);
        if (((Number(bits_changed) === Number(0)) ? 1 : 0)) {
            return;
        }
        members.m_q = ((new_q) & 0xff);
        for (let bit = ((0) | 0); ((Number(bit) < Number(8)) ? 1 : 0); bit = ((((bit) + (1))) | 0)) {
            if ((((bits_changed) >>> (bit)) & 1)) {
                (members.m_q_out_cb ?? 0)[bit]((((new_q) >>> (bit)) & 1));
            }
        }
        (__l["m_parallel_out_cb"] ? __l["m_parallel_out_cb"](Number(0), Number(new_q), Number(bits_changed)) : typeof members.m_parallel_out_cb === 'function' ? members.m_parallel_out_cb(0, new_q, bits_changed) : runtime.invoke("m_parallel_out_cb", 0, new_q, bits_changed));
    }
    function method_update_bit(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number(((((members.m_q ?? 0)) >>> ((members.m_address ?? 0))) & 1)) === Number((members.m_data ?? 0))) ? 1 : 0)) {
            return;
        }
        if ((((members.m_clear ?? 0)) ? 0 : 1)) {
            members.m_q = (((((((members.m_q ?? 0)) & ((~((1) << ((members.m_address ?? 0))))))) | ((((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0)))))) & 0xff);
        }
        else {
            method_clear_outputs(runtime, 0);
            members.m_q = (((((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0)))) & 0xff);
        }
        (members.m_q_out_cb ?? 0)[(members.m_address ?? 0)]((members.m_data ?? 0));
        (__l["m_parallel_out_cb"] ? __l["m_parallel_out_cb"](Number(0), Number((members.m_q ?? 0)), Number(((1) << ((members.m_address ?? 0))))) : typeof members.m_parallel_out_cb === 'function' ? members.m_parallel_out_cb(0, (members.m_q ?? 0), ((1) << ((members.m_address ?? 0)))) : runtime.invoke("m_parallel_out_cb", 0, (members.m_q ?? 0), ((1) << ((members.m_address ?? 0)))));
        if ((((0) || (((((((0) && (((runtime.dereference((members.m_q_out_cb ?? 0)[(members.m_address ?? 0)])).isunset?.() ?? runtime.container((members.m_q_out_cb ?? 0)[(members.m_address ?? 0)], "isunset")))) ? 1 : 0)) && ((typeof (runtime.dereference(members.m_parallel_out_cb)).isunset === 'function' ? (runtime.dereference(members.m_parallel_out_cb)).isunset() : typeof (runtime.dereference(members.m_parallel_out_cb)).isunset === 'number' || typeof (runtime.dereference(members.m_parallel_out_cb)).isunset === 'boolean' ? (runtime.dereference(members.m_parallel_out_cb)).isunset : runtime.container(members.m_parallel_out_cb, "isunset")))) ? 1 : 0))) ? 1 : 0)) {
            0;
        }
    }
    function method_enable_w(runtime, state) {
        const members = runtime.members;
        members.m_enable = ((((state) ? 0 : 1)) ? 1 : 0);
        if ((members.m_enable ?? 0)) {
            method_update_bit(runtime);
        }
        else {
            if ((members.m_clear ?? 0)) {
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
    function method_write_a0(runtime, offset, data = 0) {
        const members = runtime.members;
        method_write_bit(runtime, runtime.shiftRight(offset, 1), ((offset) & (1)));
    }
    function method_write_a3(runtime, offset, data = 0) {
        const members = runtime.members;
        method_write_bit(runtime, ((offset) & (7)), runtime.shiftRight(((offset) & (8)), 3));
    }
    function method_clear_w(runtime, state) {
        const members = runtime.members;
        members.m_clear = ((((Number(((state) ? 1 : 0)) === Number(1)) ? 1 : 0)) ? 1 : 0);
        if ((members.m_clear ?? 0)) {
            method_clear_outputs(runtime, (((members.m_enable ?? 0)) ? ((((((members.m_data ?? 0)) & 0xff)) << ((members.m_address ?? 0)))) : (0)));
        }
    }
    function method_q0_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (0)) & 1);
    }
    function method_q1_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (1)) & 1);
    }
    function method_q2_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (2)) & 1);
    }
    function method_q3_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (3)) & 1);
    }
    function method_q4_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (4)) & 1);
    }
    function method_q5_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (5)) & 1);
    }
    function method_q6_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (6)) & 1);
    }
    function method_q7_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (7)) & 1);
    }
    function method_addressable_latch_device__q0_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (0)) & 1);
    }
    function method_addressable_latch_device__q1_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (1)) & 1);
    }
    function method_addressable_latch_device__q2_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (2)) & 1);
    }
    function method_addressable_latch_device__q3_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (3)) & 1);
    }
    function method_addressable_latch_device__q4_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (4)) & 1);
    }
    function method_addressable_latch_device__q5_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (5)) & 1);
    }
    function method_addressable_latch_device__q6_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (6)) & 1);
    }
    function method_addressable_latch_device__q7_r(runtime) {
        const members = runtime.members;
        return ((((members.m_q ?? 0)) >>> (7)) & 1);
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
        "write_a3": method_write_a3,
        "clear_w": method_clear_w,
        "q0_r": method_q0_r,
        "q1_r": method_q1_r,
        "q2_r": method_q2_r,
        "q3_r": method_q3_r,
        "q4_r": method_q4_r,
        "q5_r": method_q5_r,
        "q6_r": method_q6_r,
        "q7_r": method_q7_r,
        "addressable_latch_device::q0_r": method_addressable_latch_device__q0_r,
        "addressable_latch_device::q1_r": method_addressable_latch_device__q1_r,
        "addressable_latch_device::q2_r": method_addressable_latch_device__q2_r,
        "addressable_latch_device::q3_r": method_addressable_latch_device__q3_r,
        "addressable_latch_device::q4_r": method_addressable_latch_device__q4_r,
        "addressable_latch_device::q5_r": method_addressable_latch_device__q5_r,
        "addressable_latch_device::q6_r": method_addressable_latch_device__q6_r,
        "addressable_latch_device::q7_r": method_addressable_latch_device__q7_r
    };
})();
definition.compiledMethodLinks = ["m_parallel_out_cb"];
export const device = definition;
export default device;
