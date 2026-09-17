import deviceData from './z80ctc.device.ir.json' with { type: 'json' };
const definition = deviceData;
definition.compiledMethods = (() => {
    function method_read(runtime, offset) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? runtime.member("m_channel");
        let ch = ((((offset) & (3))) | 0);
        return h_m_channel[ch].m_down;
    }
    function method_write(runtime, offset, data) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? runtime.member("m_channel");
        let ch = ((((offset) & (3))) | 0);
        if (((Number(((h_m_channel[ch].m_mode) & (4))) === Number(4)) ? 1 : 0)) {
            h_m_channel[ch].m_tconst = ((data) ? (data) : (256));
            h_m_channel[ch].m_mode = runtime.andAssign(h_m_channel[ch].m_mode, -5);
            h_m_channel[ch].m_mode = runtime.andAssign(h_m_channel[ch].m_mode, -3);
            h_m_channel[ch].m_down = h_m_channel[ch].m_tconst;
        }
        else {
            if ((((((Number(((data) & (1))) === Number(0)) ? 1 : 0)) && (((Number(ch) === Number(0)) ? 1 : 0))) ? 1 : 0)) {
                members.m_vector = ((((data) & (248))) & 0xff);
            }
            else {
                if (((Number(((data) & (1))) === Number(1)) ? 1 : 0)) {
                    h_m_channel[ch].m_mode = data;
                    if (((Number(((data) & (128))) === Number(0)) ? 1 : 0)) {
                        h_m_channel[ch].m_int_state = runtime.andAssign(h_m_channel[ch].m_int_state, -2);
                    }
                    method_interrupt_check(runtime);
                }
            }
        }
    }
    function method_interrupt_check(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        let state = ((method_z80daisy_irq_state(runtime)) | 0);
        (__l["m_intr_cb"] ? __l["m_intr_cb"](Number(((((state) & (1))) ? (1) : (0)))) : typeof members.m_intr_cb === 'function' ? members.m_intr_cb(((((state) & (1))) ? (1) : (0))) : runtime.invoke("m_intr_cb", ((((state) & (1))) ? (1) : (0))));
    }
    function method_z80daisy_irq_state(runtime) {
        const members = runtime.members;
        const h_m_channel = members.m_channel ?? runtime.member("m_channel");
        let state = ((0) | 0);
        for (let ch = ((0) | 0); ((Number(ch) < Number(4)) ? 1 : 0); ch = ((((ch) + (1))) | 0)) {
            if (((h_m_channel[ch].m_int_state) & (2))) {
                state = ((((state) | (2))) | 0);
                break;
            }
            state = ((((state) | (h_m_channel[ch].m_int_state))) | 0);
        }
        return state;
    }
    return {
        "read": method_read,
        "write": method_write,
        "interrupt_check": method_interrupt_check,
        "z80daisy_irq_state": method_z80daisy_irq_state
    };
})();
definition.compiledMethodLinks = ["m_intr_cb"];
definition.children[0].definition.compiledMethods = (() => {
    function method_period(runtime) {
        const members = runtime.members;
        const __l = runtime.links ?? runtime.calls;
        if (((Number((((members.m_mode ?? runtime.member("m_mode"))) & (2))) === Number(2)) ? 1 : 0)) {
            return Infinity;
        }
        if (((Number((((members.m_mode ?? runtime.member("m_mode"))) & (64))) === Number(64)) ? 1 : 0)) {
            return (__l["clocks_to_attotime"] ? __l["clocks_to_attotime"]((members.m_tconst ?? runtime.member("m_tconst"))) : runtime.macro("clocks_to_attotime", (members.m_tconst ?? runtime.member("m_tconst"))));
        }
        let period = ((members.m_device)?.clocks_to_attotime?.(((((Number((((members.m_mode ?? runtime.member("m_mode"))) & (32))) === Number(0)) ? 1 : 0)) ? (16) : (256))) ?? 0);
        return ((period) * ((members.m_tconst ?? runtime.member("m_tconst"))));
    }
    function method_zc_to_callback(runtime, param) {
        const members = runtime.members;
        const h_m_device = members.m_device ?? runtime.member("m_device");
        const h_m_index = members.m_index ?? runtime.member("m_index");
        runtime.readIndex(h_m_device.m_zc_cb, h_m_index)(0);
    }
    return {
        "period": method_period,
        "zc_to_callback": method_zc_to_callback
    };
})();
definition.children[0].definition.compiledMethodLinks = ["clocks_to_attotime"];
export const device = definition;
export default device;
